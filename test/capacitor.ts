/// <reference path="../typings/index.d.ts" />

import { expect } from 'chai';
import mock = require('xhr-mock');
import { FluxCapacitor, Results } from '../src/index';

const CUSTOMER_ID = 'services';

describe('FluxCapacitor', function() {
  let flux: FluxCapacitor;

  beforeEach(() => {
    mock.setup();
    flux = new FluxCapacitor(CUSTOMER_ID);
  });

  afterEach(() => {
    mock.teardown();
    flux = null;
  });

  it('should be defined', () => {
    expect(flux).to.be.ok;
    expect(flux.bridge).to.be.ok;
    expect(flux.query).to.be.ok;
    expect(flux.results).to.not.be.ok;
  });

  it('should make a search request', done => {
    mock.post(`http://ecomm.groupbycloud.com/semanticSearch/${CUSTOMER_ID}`, (req, res) => {
      expect(JSON.parse(req.body()).query).to.equal('testing');
      done();
    });
    flux.search('testing');
  });

  it('should make a request on refinement', done => {
    mock.post(`http://ecomm.groupbycloud.com/semanticSearch/${CUSTOMER_ID}`, (req, res) => {
      expect(JSON.parse(req.body()).refinements.length).to.equal(1);
      done();
    });
    flux.refine({ type: 'Value', navigationName: 'brand', value: 'DeWalt' });
  });

  it('should make a request on un-refinement', done => {
    flux.query.withSelectedRefinements({ type: 'Value', navigationName: 'brand', value: 'DeWalt' });
    mock.post(`http://ecomm.groupbycloud.com/semanticSearch/${CUSTOMER_ID}`, (req, res) => {
      expect(JSON.parse(req.body()).refinements).to.not.be.ok;
      done();
    });
    flux.unrefine({ type: 'Value', navigationName: 'brand', value: 'DeWalt' });
  });

  it('should page forward', done => {
    flux.results = <Results>{
      totalRecordCount: 300,
      records: Array(10).fill({}),
      pageInfo: {
        recordStart: 1,
        recordEnd: 11
      }
    };
    mock.post(`http://ecomm.groupbycloud.com/semanticSearch/${CUSTOMER_ID}`, (req, res) => {
      expect(JSON.parse(req.body()).skip).to.equal(10);
      done();
    });
    flux.nextPage();
  });

  it('should page backward', done => {
    flux.results = <Results>{
      totalRecordCount: 300,
      records: Array(10).fill({}),
      pageInfo: {
        recordStart: 21,
        recordEnd: 31
      }
    };
    mock.post(`http://ecomm.groupbycloud.com/semanticSearch/${CUSTOMER_ID}`, (req, res) => {
      expect(JSON.parse(req.body()).skip).to.equal(10);
      done();
    });
    flux.lastPage();
  });

  it('should reset the query', done => {
    flux.query
      .withQuery('alabama')
      .withPageSize(20)
      .withOrFields('boots', 'hats');
    mock.post(`http://ecomm.groupbycloud.com/semanticSearch/${CUSTOMER_ID}`, (req, res) => {
      expect(JSON.parse(req.body()).pageSize).to.not.be.ok;
      expect(JSON.parse(req.body()).orFields).to.not.be.ok;
      expect(JSON.parse(req.body()).query).to.equal('');
      done();
    });
    flux.reset();
  });

});
