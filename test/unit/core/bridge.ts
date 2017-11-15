import * as fetchMock from 'fetch-mock';
import * as sinon from 'sinon';
import { AbstractBridge, BrowserBridge, CloudBridge, BridgeTimeout } from '../../../src/core/bridge';
import { Query } from '../../../src/core/query';
import suite from '../_suite';

const CLIENT_KEY = 'XXX-XXX-XXX-XXX';
const CUSTOMER_ID = 'services';

suite('Bridge', ({ expect, spy, stub }) => {
  let bridge;
  let browserBridge;
  let query;
  let fetch;
  let browserFetch;

  beforeEach(() => {
    bridge = new CloudBridge(CLIENT_KEY, CUSTOMER_ID);
    browserBridge = new BrowserBridge(CUSTOMER_ID);
    fetch = bridge.fetch = fetchMock.sandbox();
    browserFetch = browserBridge.fetch = fetchMock.sandbox();
    query = new Query('test');
  });

  afterEach(fetchMock.reset);

  it('should be defined', () => {
    expect(bridge).to.be.ok;
  });

  it('should have default values', () => {
    expect(bridge.config).to.eql({ timeout: 1500 });
  });

  it('should accept configuration', () => {
    bridge = new CloudBridge(CLIENT_KEY, CUSTOMER_ID, { timeout: 4000 });

    expect(bridge.config).to.eql({ timeout: 4000 });
  });

  it('should handle timed out request', () => {
    this.clock = sinon.useFakeTimers();

    bridge.fetch = () => new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(3);
      }, 3000);
    });
    bridge.search(new Query('skirts')).catch((err) => {
      expect(err).to.be.an.instanceof(BridgeTimeout);
      expect(err.message).to.eql('Timed out in 1500 ms'); // default timeout
    });
    this.clock.tick(2000);

    this.clock.restore();
  });

  it('should handle invalid query types', () => {
    return bridge.search(12331)
      .catch((err) => expect(err.message).to.eq('query was not of a recognised type'))
      .then(() => bridge.search(true, (err, res) => {
        expect(err.message).to.eq('query was not of a recognised type');
        expect(res).to.not.be.ok;
      }));
  });

  it('should accept a direct query string', () => {
    fetch.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (url, req) => {
      const body = JSON.parse(req.body);
      expect(body.query).to.eq('skirts');
      expect(body.clientKey).to.eq(CLIENT_KEY);
      return JSON.stringify({});
    });

    return bridge.search('skirts');
  });

  it('should accept a raw request', () => {
    fetch.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (url, req) => {
      const body = JSON.parse(req.body);
      expect(body.fields).to.eql(['title', 'description']);
      return JSON.stringify('success');
    });

    return bridge.search(new Query('skirts').withFields('title', 'description').build())
      .then((results) => expect(results).to.eq('success'))
      .then(() => bridge.search({ query: 'skirts', fields: ['title', 'description'] }))
      .then((results) => expect(results).to.eq('success'));
  });

  it('should be reuseable', () => {
    fetch.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (url, req) => {
      return JSON.stringify('success');
    });

    return bridge.search(query = new Query('skirts'))
      .then((results) => expect(results).to.eq('success'))
      .then(() => bridge.search(query))
      .then((results) => expect(results).to.eq('success'));
  });

  it('should send a search query and return a promise', () => {
    fetch.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search?size=20&syle=branded&other=`, (url, req) => {
      return JSON.stringify('success');
    });

    query = new Query('skirts')
      .withQueryParams({
        size: 20,
        syle: 'branded',
        other: ''
      });

    return bridge.search(query)
      .then((results) => expect(results).to.eq('success'));
  });

  it('should send a search query and take a callback', (done) => {
    fetch.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search?size=20&style=branded`, (url, req) => {
      return JSON.stringify('success');
    });

    query = new Query('shoes')
      .withQueryParams('size=20&style=branded');

    bridge.search(query, (err, results) => {
      expect(results).to.eq('success');
      done();
    });
  });

  it('should be able to handle errors in promise chain, also check for status text', () => {
    fetch.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (url, req) => {
      return {
        status: 400,
        body: JSON.stringify('error'),
      };
    });

    query = new Query('shoes');

    return bridge.search(query)
      .catch((err) => {
        expect(err.data).to.eq('error');
        expect(err.statusText).to.eql('Bad Request');
        expect(err.status).to.eq(400);
      });
  });

  it('should be able to handle errors in callback', (done) => {
    fetch.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (url, req) => {
      return {
        status: 400,
        body: JSON.stringify('error'),
      };
    });

    query = new Query('shoes');

    bridge.search(query, (err) => {
      expect(err.data).to.eq('error');
      expect(err.status).to.eq(400);
      done();
    });
  });

  it('should invoke any configured errorHandler on error and allow downstream promise catching', () => {
    const errorHandler = bridge.errorHandler = spy();
    fetch.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (url, req) => {
      return {
        status: 400,
        body: JSON.stringify('error')
      };
    });
    query = new Query('shoes');

    return bridge.search(query)
      .catch((err) => {
        expect(err.data).to.eq('error');
        expect(err.status).to.eq(400);
        expect(errorHandler).to.be.calledWith(err);
      });
  });

  describe('BrowserBridge', () => {
    it('should accept configuration', () => {
      bridge = new BrowserBridge(CUSTOMER_ID, true, { timeout: 4000 });

      expect(bridge.config).to.eql({ timeout: 4000 });
    });

    describe('search()', () => {
      it('should send requests to the CORS supported search endpoint', (done) => {
        browserFetch.post(`http://${CUSTOMER_ID}-cors.groupbycloud.com/api/v1/search`, (url, req) => {
          return JSON.stringify('success');
        });

        query = new Query('shoes');

        browserBridge.search(query, (err, results) => {
            expect(results).to.eq('success');
            done();
          });
      });

      it('should send HTTPS request', (done) => {
        browserFetch.post(`https://${CUSTOMER_ID}-cors.groupbycloud.com:443/api/v1/search`, (url, req) => {
          return JSON.stringify('success');
        });

        query = new Query('shoes');

        const browser = new BrowserBridge(CUSTOMER_ID, true);
        browser.fetch = browserFetch;

        browser.search(query, (err, results) => done());
      });

      it('should include headers', (done) => {
        const headers = { a: 'b' };
        browserFetch.post(`http://${CUSTOMER_ID}-cors.groupbycloud.com/api/v1/search`, (url, req) => {
          expect(req.headers).to.include.keys('a');
          return JSON.stringify('success');
        });

        query = new Query('shoes');

        Object.assign(browserBridge, { headers })
          .search(query, (err, results) => {
            expect(results).to.eq('success');
            done();
          });
      });
    });

    describe('refinements()', () => {
      it('should generate error on invalid query', () => {
        const callback = 'call';
        const err = browserBridge.generateError = spy();

        browserBridge.refinements(undefined, 'brand', callback);

        expect(err).to.be.calledOnce.and.calledWithExactly('query was not of a recognised type', callback);
      });

      it('should send requests to the CORS supported refinements endpoint', (done) => {
        browserFetch.post(`http://${CUSTOMER_ID}-cors.groupbycloud.com/api/v1/search/refinements`, (url, req) => {
          expect(JSON.parse(req.body)).to.contain.all.keys('originalQuery', 'navigationName');
          return JSON.stringify('success');
        });

        query = new Query('shoes');

        browserBridge.refinements(query, 'brand', (err, results) => {
            expect(results).to.eq('success');
            done();
          });
      });
    });
  });

  describe('AbstractBridge', () => {
    describe('transform()', () => {
      it('should execute callback on properties of key', () => {
        const key = [{ c: 'd' }, { e: 'f' }, { g: 'h' }];
        const response = <any>{ key, a: 'b' };
        const callback = spy((obj) => ({ ...obj, value: 'test' }));
        const result = { ...response, key: [callback(key[0]), callback(key[1]), callback(key[2])] };

        expect(AbstractBridge.transform(response, 'key', callback)).to.eql(result);
      });
    });

    describe('transformRecords()', () => {
      it('should return transform() with response, records, and convertRecordFields', () => {
        const response = { a: 'b' };
        const returnValue = { c: 'd' };
        const transform = stub(AbstractBridge, 'transform')
          .withArgs(response, 'records', AbstractBridge.convertRecordFields).returns(returnValue);

        expect(AbstractBridge.transformRecords(response)).to.eq(returnValue);
      });
    });

    describe('transformRefinements()', () => {
      it('should return transform() with response, records, and convertRecordFields', () => {
        const response = { a: 'b' };
        const transformedValue = { c: 'd' };
        const returnValue = { e: 'f' };
        const transform = stub(AbstractBridge, 'transform');
        transform.withArgs(response, 'availableNavigation', AbstractBridge.convertRefinement).returns(transformedValue);
        // tslint:disable-next-line max-line-length
        transform.withArgs(transformedValue, 'selectedNavigation', AbstractBridge.convertRefinement).returns(returnValue);

        AbstractBridge.transformRefinements(response);
        expect(AbstractBridge.transformRefinements(response)).to.eq(returnValue);
      });
    });

    describe('convertRecordFields()', () => {
      it('should update properties', () => {
        const id = '1239';
        const url = 'www.whateva.ca';
        const title = 'my stuff';
        const snippet = 'my snippet';
        const record = <any>{
          a: 'b',
          _id: id,
          _u: url,
          _t: title,
          _snippet: snippet
        };
        const transformedRecord = { a: 'b', id, url, title, snippet };

        expect(BrowserBridge.convertRecordFields(record)).to.eql(transformedRecord);
      });

      it('should not delete snipped if not present', () => {
        const id = '1239';
        const url = 'www.whateva.ca';
        const title = 'my stuff';
        const record = <any>{
          a: 'b',
          _id: id,
          _u: url,
          _t: title,
        };
        const transformedRecord = { a: 'b', id, url, title };

        expect(BrowserBridge.convertRecordFields(record)).to.eql(transformedRecord);
      });
    });

    describe('convertRefinement()', () => {
      it ('should update max and min',() => {
        const max = 900;
        const min = 1;

        const refinements = [
          { type: 'Range', count: 49, high: '28.0', low: String(min) },
          { type: 'Range', count: 479, high: '56.0', low: '28.0' },
          { type: 'Range', count: 1348, high: String(max), low: '56.0' },
        ];
        const navigation = <any>{
          name: 'Department',
          displayName: 'All',
          type: 'Range',
          range: true,
          max: undefined,
          min: undefined,
          or: false,
          refinements,
          metadata: []
        };
        const convertedRefinements = [
          { type: 'Range', count: 49, high: 28.0, low: min },
          { type: 'Range', count: 479, high: 56.0, low: 28.0 },
          { type: 'Range', count: 1348, high: max, low: 56.0 },
        ];

        expect(BrowserBridge.convertRefinement(navigation)).to.eql({
          ...navigation,
          refinements: convertedRefinements,
          max,
          min
        });
      });

      it('should update value types', () => {
        const refinements = [
          { type: 'Range', count: 49, high: '28.0', low: '0.0' },
          { type: 'Range', count: 479, high: '56.0', low: '28.0' },
          { type: 'Range', count: 1348, high: '84.0', low: '56.0' },
        ];
        const navigation = <any>{
          name: 'Department',
          displayName: 'All',
          type: 'Range',
          range: true,
          or: false,
          refinements,
          metadata: []
        };
        const convertedRefinements = [
          { type: 'Range', count: 49, high: 28.0, low: 0.0 },
          { type: 'Range', count: 479, high: 56.0, low: 28.0 },
          { type: 'Range', count: 1348, high: 84.0, low: 56.0 },
        ];

        expect(BrowserBridge.convertRefinement(navigation)).to.eql({
          ...navigation,
          refinements: convertedRefinements
        });
      });

      it('should not update value types', () => {
        const refinements = [
          {type: 'Value', count: 975, value: 'Black'},
          {type: 'Value', count: 1064, value: 'Blue'},
          {type: 'Value', count: 81, value: 'Brown'}
        ];
        const navigation = <any>{
          name: 'Department',
          displayName: 'All',
          type: 'Value',
          range: false,
          or: false,
          refinements,
          metadata: []
        };

        expect(BrowserBridge.convertRefinement(navigation)).to.eq(navigation);
      });
    });
  });
});
