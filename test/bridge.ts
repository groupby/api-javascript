/// <reference path="../typings/index.d.ts" />

import { expect } from 'chai';
import mock = require('xhr-mock');

import { CloudBridge, BrowserBridge } from '../src/core/bridge';
import { Query } from '../src/core/query';

const CLIENT_KEY = 'XXX-XXX-XXX-XXX';
const CUSTOMER_ID = 'services';

describe('Bridge', () => {
  let bridge,
    query;

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

  it('should handle invalid query types', done => {
    bridge.search(12331)
      .catch(err => expect(err.message).to.eq('query was not of a recognised type'))
      .then(() => bridge.search(true, (err, res) => {
        expect(err.message).to.eq('query was not of a recognised type');
        expect(res).to.not.be.ok;
        done();
      }));
  });

  it('should be accept a direct query string', done => {
    mock.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (req, res) => {
      const body = JSON.parse(req.body())
      expect(body.query).to.eq('skirts');
      expect(body.clientKey).to.eq(CLIENT_KEY);
      return res.status(200)
        .body('success');
    });

    bridge.search('skirts')
      .then(() => done());
  });

  it('should be accept a raw request', done => {
    mock.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (req, res) => {
      const body = JSON.parse(req.body())
      expect(body.fields).to.eql(['title', 'description']);
      return res.status(200)
        .body('success');
    });

    bridge.search(new Query('skirts').withFields('title', 'description').build())
      .then(results => expect(results).to.eq('success'))
      .then(() => bridge.search({ query: 'skirts', fields: ['title', 'description'] }))
      .then(results => {
        expect(results).to.eq('success');
        done();
      });
  });

  it('should be reuseable', done => {
    mock.post(`https://${CUSTOMER_ID}.groupbycloud.com:443/api/v1/search`, (req, res) => {
      return res.status(200).body('success');
    });

    bridge.search(query = new Query('skirts'))
      .then(results => expect(results).to.eq('success'))
      .then(() => bridge.search(query))
      .then(results => {
        expect(results).to.eq('success');
        done();
      });
  });

  it('should send a search query and return a promise', done => {
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
      .then(results => {
        expect(results).to.eq('success');
        done();
      });
  });

  it('should send a search query and take a callback', done => {
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

  it('should send requests to the CORS supported endpoint', done => {
    mock.post(`http://ecomm.groupbycloud.com/semanticSearch/${CUSTOMER_ID}`, (req, res) => {
      return res.status(200).body('success');
    });

    query = new Query('shoes');

    new BrowserBridge(CUSTOMER_ID)
      .search(query, (err, results) => {
        expect(results).to.eq('success');
        done();
      });
  });

  it('should include headers', done => {
    const headers = { a: 'b' };
    mock.post(`http://ecomm.groupbycloud.com/semanticSearch/${CUSTOMER_ID}`, (req, res) => {
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
