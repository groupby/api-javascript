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
  function flux(opts: { start: number, total?: number } | number, search: Function): FluxCapacitor {
    const recordStart = typeof opts === 'number' ? opts : opts.start;
    const totalRecordCount = (typeof opts === 'object' && opts.total) || 30;
    return <FluxCapacitor>{
      query: new Query().skip(recordStart),
      results: { totalRecordCount },
      search
    }
  };

  it('should be defined', () => {
    expect(new Pager(<FluxCapacitor>{})).to.be.ok;
  });

  it('should step forward', done => {
    new Pager(flux(10, function() {
      expect(this.query.build().skip).to.equal(20);
      done();
    })).next();
  });

  it('should step backward', done => {
    new Pager(flux(20, function() {
      expect(this.query.build().skip).to.equal(10);
      done();
    })).prev();
  });

  it('should step to 0 at the lowest', done => {
    new Pager(flux(2, function() {
      expect(this.query.build().skip).to.equal(0);
      done();
    })).prev();
  });

  it('should reset the pagination to 0', done => {
    new Pager(flux(2, function() {
      expect(this.query.build().skip).to.equal(0);
      done();
    })).reset();
  });

  it('should step to the last page', done => {
    new Pager(flux({ start: 30, total: 45 }, function() {
      expect(this.query.build().skip).to.equal(40);
      done();
    })).next();
  });

  it('should step down from last page', done => {
    new Pager(flux({ start: 40, total: 45 }, function() {
      expect(this.query.build().skip).to.equal(30);
      done();
    })).prev();
  });

  it('should skip to the last page', done => {
    new Pager(flux({ start: 0, total: 45 }, function() {
      expect(this.query.build().skip).to.equal(40);
      done();
    })).last();
  });

  describe('error states', () => {
    it('should throw error if paging too low', done => {
      new Pager(flux(0, () => { })).prev()
        .catch(err => {
          expect(err.message).to.equal('already on first page');
          done();
        });
    });

    it('should throw error if paging too high', done => {
      new Pager(flux(24, () => { })).next()
        .catch(err => {
          expect(err.message).to.equal('already on last page');
          done();
        });
    });
  });

});
