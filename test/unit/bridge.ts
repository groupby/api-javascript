import { BrowserBridge, CloudBridge } from '../../src/core/bridge';
import { Query } from '../../src/core/query';
import { expect } from 'chai';
import * as mock from 'xhr-mock';

const CLIENT_KEY = 'XXX-XXX-XXX-XXX';
const CUSTOMER_ID = 'services';

describe('Bridge', () => {
  let bridge;
  let query;

  beforeEach(() => {
    mock.setup();
    bridge = new CloudBridge(CLIENT_KEY, CUSTOMER_ID);
    query = new Query('test');
  });

  afterEach(() => {
    mock.teardown();
    bridge = null;
    query = null;
  });

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

  it('should handle invalid query types', (done) => {
    bridge.search(12331)
      .catch((err) => expect(err.message).to.eq('query was not of a recognised type'))
      .then(() => bridge.search(true, (err, res) => {
        expect(err.message).to.eq('query was not of a recognised type');
        expect(res).to.not.be.ok;
        done();
      }));
  });

  it('should be accept a direct query string', (done) => {
    mock.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (req, res) => {
      const body = JSON.parse(req.body());
      expect(body.query).to.eq('skirts');
      expect(body.clientKey).to.eq(CLIENT_KEY);
      return res.status(200)
        .body('success');
    });

    bridge.search('skirts')
      .then(() => done());
  });

  it('should be accept a raw request', (done) => {
    mock.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (req, res) => {
      const body = JSON.parse(req.body());
      expect(body.fields).to.eql(['title', 'description']);
      return res.status(200)
        .body('success');
    });

    bridge.search(new Query('skirts').withFields('title', 'description').build())
      .then((results) => expect(results).to.eq('success'))
      .then(() => bridge.search({ query: 'skirts', fields: ['title', 'description'] }))
      .then((results) => {
        expect(results).to.eq('success');
        done();
      });
  });

  it('should be reuseable', (done) => {
    mock.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (req, res) => {
      return res.status(200).body('success');
    });

    bridge.search(query = new Query('skirts'))
      .then((results) => expect(results).to.eq('success'))
      .then(() => bridge.search(query))
      .then((results) => {
        expect(results).to.eq('success');
        done();
      });
  });

  it('should send a search query and return a promise', (done) => {
    mock.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search?size=20&syle=branded&other=`, (req, res) => {
      return res.status(200).body('success');
    });

    query = new Query('skirts')
      .withQueryParams({
        size: 20,
        syle: 'branded',
        other: ''
      });

    bridge.search(query)
      .then((results) => {
        expect(results).to.eq('success');
        done();
      });
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

  it('should be able to handle errors in promise chain', (done) => {
    mock.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (req, res) => {
      return res.status(400).body('error');
    });

    query = new Query('shoes');

    bridge.search(query)
      .catch((err) => {
        expect(err.data).to.eq('error');
        expect(err.status).to.eq(400);
        done();
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

  it('should invoke any configured errorHandler on error', (done) => {
    mock.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (req, res) => {
      return res.status(400).body('error');
    });
    query = new Query('shoes');
    bridge.errorHandler = (err) => {
      expect(err.data).to.eq('error');
      expect(err.status).to.eq(400);
      done();
    };

    bridge.search(query);
  });

  it('should invoke any configured errorHandler on error and allow downstream promise catching', (done) => {
    const errorHandler = bridge.errorHandler = sinon.spy();
    mock.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (req, res) => {
      return res.status(400).body('error');
    });
    query = new Query('shoes');

    bridge.search(query)
      .catch((err) => {
        expect(err.data).to.eq('error');
        expect(err.status).to.eq(400);
        expect(errorHandler.calledWith(err)).to.be.true;
        done();
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
});
