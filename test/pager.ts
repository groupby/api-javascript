/// <reference path="../typings/index.d.ts" />

import { expect } from 'chai';
import { FluxCapacitor, Query } from '../src/index';
import { Pager } from '../src/capacitor/pager';
import {
  ComplexRequest,
  CombinedRefinements,
  CustomParamsFromString
} from './fixtures';

const CLIENT_KEY = 'XXX-XXX-XXX-XXX';
const CUSTOMER_ID = 'services';

describe('Pager', function() {
  function flux(recordStart: number, search: Function): FluxCapacitor {
    return <FluxCapacitor>{
      query: new Query(),
      results: {
        totalRecordCount: 30,
        records: Array(10).fill({}),
        pageInfo: { recordStart }
      },
      search
    }
  };

  it('should be defined', () => {
    expect(new Pager(<FluxCapacitor>{})).to.be.ok;
  });

  it('should step forward', done => {
    new Pager(flux(11, function() {
      expect(this.query.build().skip).to.equal(20);
      done();
    })).next();
  });

  it('should step backward', done => {
    new Pager(flux(21, function() {
      expect(this.query.build().skip).to.equal(10);
      done();
    })).last();
  });

  it("should step to 0 at the lowest", done => {
    new Pager(flux(2, function() {
      expect(this.query.build().skip).to.equal(0);
      done();
    })).last();
  });

  describe('error states', () => {
    it("should throw error if paging too low", done => {
      new Pager(flux(1, () => { })).last()
        .catch(err => {
          expect(err.message).to.equal('already on first page');
          done();
        });
    });

    it("should throw error if paging too high", done => {
      new Pager(flux(24, () => { })).next()
        .catch(err => {
          expect(err.message).to.equal('already on last page');
          done();
        });
    });
  });

});
