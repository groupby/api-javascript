import { Pager } from '../src/capacitor/pager';
import { Events, FluxCapacitor, Query } from '../src/index';
import { expect } from 'chai';

describe('Pager', function() {
  function flux(opts: { start: number, total?: number, pageSize?: number } | number, search?: Function): FluxCapacitor {
    const recordStart = typeof opts === 'number' ? opts : opts.start;
    const totalRecordCount = typeof opts === 'object' && Number(opts.total) >= 0 ? opts.total : 30;
    const pageSize = typeof opts === 'object' && Number(opts.pageSize) >= 0 ? opts.pageSize : 10;
    return <any>{
      query: new Query()
        .skip(recordStart)
        .withPageSize(pageSize),
      results: { totalRecordCount },
      emit: (event: string) => null,
      search
    };
  }

  it('should be defined', () => {
    expect(new Pager(<any>{})).to.be.ok;
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

  describe('realigned paging behaviour', () => {
    it('should not realign the pages on page next', () => {
      new Pager(flux({ start: 13, total: 45 }, function() {
        expect(this.query.raw.skip).to.eq(23);
      })).next();
    });

    it('should realign the pages on page next', () => {
      new Pager(flux({ start: 13, total: 45 }, function() {
        expect(this.query.raw.skip).to.eq(20);
      })).next(true);
    });

    it('should not skip past last page', () => {
      new Pager(flux({ start: 43, total: 45 }, function() {
        expect(this.query.raw.skip).to.eq(40);
      })).next(true);
    });

    it('should not realign the pages on page previous', () => {
      new Pager(flux({ start: 23, total: 45 }, function() {
        expect(this.query.raw.skip).to.eq(13);
      })).prev();
    });

    it('should realign the pages on page previous', () => {
      new Pager(flux({ start: 23, total: 45 }, function() {
        expect(this.query.raw.skip).to.eq(10);
      })).prev(true);
    });

    it('should not realign to a negative value', () => {
      new Pager(flux({ start: 3, total: 45 }, function() {
        expect(this.query.raw.skip).to.eq(0);
      })).prev(true);
    });
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

  describe('current page behaviour', () => {
    it('should return the current page', () => {
      expect(new Pager(flux(0)).currentPage).to.eq(0);
    });

    it('should return from the middle', () => {
      expect(new Pager(flux(45)).currentPage).to.eq(4);
    });

    it('should change based on pageSize', () => {
      expect(new Pager(flux({ start: 36, pageSize: 12 })).currentPage).to.eq(3);
    });
  });

  describe('total pages behaviour', () => {
    it('should return the total number of pages', () => {
      expect(new Pager(flux({ start: 0, total: 457 })).finalPage).to.eq(45);
    });

    it('should correctly cut off the last page', () => {
      expect(new Pager(flux({ start: 0, total: 300 })).finalPage).to.eq(29);
    });

    it('should return no pages', () => {
      expect(new Pager(flux({ start: 0, total: 0 })).finalPage).to.eq(0);
    });
  });

  describe('pages behaviour', () => {
    it('should return an array of beginning at 1', () => {
      expect(new Pager(flux({ start: 0, total: 100 })).pageNumbers()).to.eql([1, 2, 3, 4, 5]);
    });

    it('should still begin at 1', () => {
      expect(new Pager(flux({ start: 20, total: 100 })).pageNumbers()).to.eql([1, 2, 3, 4, 5]);
    });

    it('should start shifting the page range up', () => {
      expect(new Pager(flux({ start: 30, total: 100 })).pageNumbers()).to.eql([2, 3, 4, 5, 6]);
    });

    it('should return an array of pages', () => {
      expect(new Pager(flux({ start: 50, total: 100 })).pageNumbers()).to.eql([4, 5, 6, 7, 8]);
    });

    it('should return array ending at 10', () => {
      expect(new Pager(flux({ start: 100, total: 100 })).pageNumbers()).to.eql([6, 7, 8, 9, 10]);
    });

    it('should still end at 10', () => {
      expect(new Pager(flux({ start: 80, total: 100 })).pageNumbers()).to.eql([6, 7, 8, 9, 10]);
    });

    it('should start shifting the page range down', () => {
      expect(new Pager(flux({ start: 70, total: 100 })).pageNumbers()).to.eql([6, 7, 8, 9, 10]);
    });

    it('should handle limit higher than available pages', () => {
      const pager = new Pager(flux({ start: 132, total: 144, pageSize: 12 }));
      expect(pager.pageNumbers(13)).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    });

    it('should show smaller ranges', () => {
      expect(new Pager(flux({ start: 0, total: 47 })).pageNumbers()).to.eql([1, 2, 3, 4, 5]);
      expect(new Pager(flux({ start: 0, total: 33 })).pageNumbers()).to.eql([1, 2, 3, 4]);
      expect(new Pager(flux({ start: 0, total: 25 })).pageNumbers()).to.eql([1, 2, 3]);
      expect(new Pager(flux({ start: 0, total: 18 })).pageNumbers()).to.eql([1, 2]);
      expect(new Pager(flux({ start: 0, total: 7 })).pageNumbers()).to.eql([1]);
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

  describe('event behaviour', () => {
    it('should emit page_changed event on next', (done) => {
      const mockflux = flux({ start: 0, total: 40 });
      mockflux.emit = (event, data) => {
        expect(event).to.eq(Events.PAGE_CHANGED);
        expect(data).to.eql({ pageIndex: 1 });
        return done();
      };
      new Pager(mockflux).next();
    });

    it('should emit page_changed event on prev', (done) => {
      const mockflux = flux({ start: 20, total: 40 });
      mockflux.emit = (event, data) => {
        expect(event).to.eq(Events.PAGE_CHANGED);
        expect(data).to.eql({ pageIndex: 1 });
        return done();
      };
      new Pager(mockflux).prev();
    });

    it('should emit page_changed event on reset', (done) => {
      const mockflux = flux({ start: 12, total: 40 });
      mockflux.emit = (event, data) => {
        expect(event).to.eq(Events.PAGE_CHANGED);
        expect(data).to.eql({ pageIndex: 0 });
        return done();
      };
      new Pager(mockflux).reset();
    });

    it('should emit page_changed event on reset', (done) => {
      const mockflux = flux({ start: 0, total: 40 });
      mockflux.emit = (event, data) => {
        expect(event).to.eq(Events.PAGE_CHANGED);
        expect(data).to.eql({ pageIndex: 3 });
        return done();
      };
      new Pager(mockflux).last();
    });
  });

  describe('error states', () => {
    it('should throw error if paging too low', (done) => {
      new Pager(flux(0, () => null)).prev()
        .catch((err) => {
          expect(err.message).to.eq('already on first page');
          done();
        });
    });

    it('should throw error if paging too high', (done) => {
      new Pager(flux(24, () => null)).next()
        .catch((err) => {
          expect(err.message).to.eq('already on last page');
          done();
        });
    });
  });
});
