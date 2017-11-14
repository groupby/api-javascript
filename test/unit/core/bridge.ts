import * as mock from 'xhr-mock';
import fetchMock from 'fetch-mock';
import { AbstractBridge, BrowserBridge, CloudBridge } from '../../../src/core/bridge';
import { Query } from '../../../src/core/query';
import suite from '../_suite';

const CLIENT_KEY = 'XXX-XXX-XXX-XXX';
const CUSTOMER_ID = 'services';

suite('Bridge', ({ expect, spy, stub }) => {
  let bridge;
  let query;
  let fetch;

  beforeEach(() => {
    fetch = fetchMock.sandbox();
    bridge = new CloudBridge(CLIENT_KEY, CUSTOMER_ID);
    query = new Query('test');
  });

  afterEach(fetchMock.reset);

  it('should be defined', () => {
    expect(bridge).to.be.ok;
  });

  it('should have default values', () => {
    expect(bridge.config).to.eql({
      timeout: 1500
    });
  });

  it('should accept configuration', () => {
    bridge = new CloudBridge(CLIENT_KEY, CUSTOMER_ID, { timeout: 4000 });

    expect(bridge.config).to.eql({
      timeout: 4000
    });
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
    mock.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (req, res) => {
      const body = JSON.parse(req.body());
      expect(body.query).to.eq('skirts');
      expect(body.clientKey).to.eq(CLIENT_KEY);
      return res.status(200)
        .body('success');
    });

    return bridge.search('skirts');
  });

  it('should accept a raw request', () => {
    mock.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (req, res) => {
      const body = JSON.parse(req.body());
      expect(body.fields).to.eql(['title', 'description']);
      return res.status(200)
        .body('success');
    });

    return bridge.search(new Query('skirts').withFields('title', 'description').build())
      .then((results) => expect(results).to.eq('success'))
      .then(() => bridge.search({ query: 'skirts', fields: ['title', 'description'] }))
      .then((results) => expect(results).to.eq('success'));
  });

  it('should be reuseable', () => {
    mock.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (req, res) => {
      return res.status(200).body('success');
    });

    return bridge.search(query = new Query('skirts'))
      .then((results) => expect(results).to.eq('success'))
      .then(() => bridge.search(query))
      .then((results) => expect(results).to.eq('success'));
  });

  it('should send a search query and return a promise', () => {
    mock.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search?size=20&syle=branded&other=`, (req, res) => {
      return res.status(200).body('success');
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
    mock.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search?size=20&style=branded`, (req, res) => {
      return res.status(200).body('success');
    });

    query = new Query('shoes')
      .withQueryParams('size=20&style=branded');

    bridge.search(query, (err, results) => {
      expect(results).to.eq('success');
      done();
    });
  });

  it('should be able to handle errors in promise chain', () => {
    mock.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (req, res) => {
      return res.status(400).body('error');
    });

    query = new Query('shoes');

    return bridge.search(query)
      .catch((err) => {
        expect(err.data).to.eq('error');
        expect(err.status).to.eq(400);
      });
  });

  it('should be able to handle errors in callback', (done) => {
    mock.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (req, res) => {
      return res.status(400).body('error');
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
    mock.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (req, res) => {
      return res.status(400).body('error');
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
    describe('search()', () => {
      it('should send requests to the CORS supported search endpoint', (done) => {
        mock.post(`http://${CUSTOMER_ID}-cors.groupbycloud.com/api/v1/search`, (req, res) => {
          return res.status(200).body('success');
        });

        query = new Query('shoes');

        new BrowserBridge(CUSTOMER_ID)
          .search(query, (err, results) => {
            expect(results).to.eq('success');
            done();
          });
      });

      it('should send HTTPS request', (done) => {
        mock.post(`https://${CUSTOMER_ID}-cors.groupbycloud.com:443/api/v1/search`, (req, res) => {
          return res.status(200).body('success');
        });

        query = new Query('shoes');

        new BrowserBridge(CUSTOMER_ID)
          .search(query, (err, results) => done());
      });

      it('should include headers', (done) => {
        const headers = { a: 'b' };
        mock.post(`http://${CUSTOMER_ID}-cors.groupbycloud.com/api/v1/search`, (req, res) => {
          expect(req['_headers']).to.include.keys('a');
          return res.status(200).body('success');
        });

        query = new Query('shoes');

        Object.assign(new BrowserBridge(CUSTOMER_ID), { headers })
          .search(query, (err, results) => {
            expect(results).to.eq('success');
            done();
          });
      });
    });

    describe('refinements()', () => {
      it('should send requests to the CORS supported refinements endpoint', (done) => {
        mock.post(`http://${CUSTOMER_ID}-cors.groupbycloud.com/api/v1/search/refinements`, (req, res) => {
          expect(JSON.parse(req['_body'])).to.contain.all.keys('originalQuery', 'navigationName');
          return res.status(200).body('success');
        });

        query = new Query('shoes');

        new BrowserBridge(CUSTOMER_ID)
          .refinements(query, 'brand', (err, results) => {
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
