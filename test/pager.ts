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
  function flux(opts: { start: number, total?: number } | number, search?: Function): FluxCapacitor {
    const recordStart = typeof opts === 'number' ? opts : opts.start;
    const totalRecordCount = (typeof opts === 'object' && opts.total) || 30;
    return <FluxCapacitor>{
      query: new Query().skip(recordStart),
      results: { totalRecordCount },
      search
    };
  };

  it('should be defined', () => {
    expect(new Pager(<FluxCapacitor>{})).to.be.ok;
  });

  it('first step', (done) => {
    const mockFlux = flux(0, function() {
      expect(this.query.raw.skip).to.eq(10);
      done();
    });
    mockFlux.query = new Query();
    new Pager(mockFlux).next();
  });

  it('should step forward', (done) => {
    new Pager(flux(10, function() {
      expect(this.query.raw.skip).to.eq(20);
      done();
    })).next();
  });

  it('should step backward', (done) => {
    new Pager(flux(20, function() {
      expect(this.query.raw.skip).to.eq(10);
      done();
    })).prev();
  });

  it('should step to 0 at the lowest', (done) => {
    new Pager(flux(2, function() {
      expect(this.query.raw.skip).to.eq(0);
      done();
    })).prev();
  });

  it('should reset the pagination to 0', (done) => {
    new Pager(flux(2, function() {
      expect(this.query.raw.skip).to.eq(0);
      done();
    })).reset();
  });

  it('should step to the last page', (done) => {
    new Pager(flux({ start: 30, total: 45 }, function() {
      expect(this.query.raw.skip).to.eq(40);
      done();
    })).next();
  });

  it('should step down from last page', (done) => {
    new Pager(flux({ start: 40, total: 45 }, function() {
      expect(this.query.raw.skip).to.eq(30);
      done();
    })).prev();
  });

  it('should skip to the last page', (done) => {
    new Pager(flux({ start: 0, total: 45 }, function() {
      expect(this.query.raw.skip).to.eq(40);
      done();
    })).last();
  });

  describe('jump behaviour', () => {
    it('should jump to the first page', (done) => {
      new Pager(flux({ start: 0, total: 200 }, function() {
        expect(this.query.raw.skip).to.eq(0);
        done();
      })).jump(0);
    });

    it('should jump to a page', (done) => {
      new Pager(flux({ start: 0, total: 200 }, function() {
        expect(this.query.raw.skip).to.eq(80);
        done();
      })).jump(8);
    });

    describe('error states', () => {
      it('should not jump past the results', (done) => {
        new Pager(flux({ start: 0, total: 30 }))
          .jump(8)
          .catch(() => done());
      });

      it('should not jump to lower than the first page', (done) => {
        new Pager(flux(0))
          .jump(-2)
          .catch(() => done());
      });
    });
  });

  it('should allow next', () => {
    expect(new Pager(flux({ start: 0, total: 45 })).hasNext).to.be.true;
  });

  it('should not allow next', () => {
    expect(new Pager(flux({ start: 43, total: 45 })).hasNext).to.be.false;
  });

  it('should allow previous', () => {
    expect(new Pager(flux(12)).hasPrevious).to.be.true;
  });

  it('should not allow previous', () => {
    expect(new Pager(flux(0)).hasPrevious).to.be.false;
  });

  describe('error states', () => {
    it('should throw error if paging too low', (done) => {
      new Pager(flux(0, () => { })).prev()
        .catch(err => {
          expect(err.message).to.eq('already on first page');
          done();
        });
    });

    it('should throw error if paging too high', (done) => {
      new Pager(flux(24, () => { })).next()
        .catch(err => {
          expect(err.message).to.eq('already on last page');
          done();
        });
    });
  });
});
