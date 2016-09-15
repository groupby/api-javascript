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

  it('should be defined with defaults', () => {
    const mockFlux = flux({ start: 0, total: 40, pageSize: 5 }, function() { });
    const pager = new Pager(mockFlux);

    expect(pager.currentPage).to.eq(1);
    expect(pager.previousPage).to.eq(null);
    expect(pager.nextPage).to.eq(2);
    expect(pager.firstPage).to.eq(1);
    expect(pager.finalPage).to.eq(8);
    expect(pager.fromResult).to.eq(1);
    expect(pager.toResult).to.eq(5);
    expect(pager.totalRecords).to.eq(40);
    expect(pager.pageNumbers()).to.eql([1, 2, 3, 4, 5]);
    expect(mockFlux.query.build().pageSize).to.eq(5);
  });

  it('first page change', (done) => {
    const mockFlux = flux(0, function() {
      expect(this.query.raw.skip).to.eq(10);
      done();
    });
    mockFlux.query = new Query();
    new Pager(mockFlux).next();
  });

  it('should move skip forward', () => {
    const pager = new Pager(flux(11, function() {
      expect(this.query.raw.skip).to.eq(20);
    }));
    pager.next();

    expect(pager.currentPage).to.eq(3);
    expect(pager.previousPage).to.eq(2);
    expect(pager.nextPage).to.eq(null);
    expect(pager.firstPage).to.eq(1);
    expect(pager.finalPage).to.eq(3);
    expect(pager.fromResult).to.eq(21);
    expect(pager.toResult).to.eq(30);
    expect(pager.totalRecords).to.eq(30);
    expect(pager.pageNumbers()).to.eql([1, 2, 3]);
  });

  it('should move skip backward', () => {
    const pager = new Pager(flux(11, function() {
      expect(this.query.raw.skip).to.eq(0);
    }));
    pager.prev();

    expect(pager.currentPage).to.eq(1);
    expect(pager.previousPage).to.eq(null);
    expect(pager.nextPage).to.eq(2);
    expect(pager.firstPage).to.eq(1);
    expect(pager.finalPage).to.eq(3);
    expect(pager.fromResult).to.eq(1);
    expect(pager.toResult).to.eq(10);
    expect(pager.totalRecords).to.eq(30);
    expect(pager.pageNumbers()).to.eql([1, 2, 3]);
  });

  it('should not change skip when cannot page backward', () => {
    const mockFlux = flux(2, function() { });
    const pager = new Pager(mockFlux);
    expect(mockFlux.query.raw.skip).to.eq(2);
    pager.prev();
    expect(mockFlux.query.raw.skip).to.eq(2);
  });

  it('should reset the skip to 0', (done) => {
    new Pager(flux(2, function() {
      expect(this.query.raw.skip).to.eq(0);
      done();
    })).reset();
  });

  it('should step to the last page', (done) => {
    new Pager(flux({ start: 31, total: 45 }, function() {
      expect(this.query.raw.skip).to.eq(40);
      done();
    })).next();
  });

  it('should step down from last page', (done) => {
    new Pager(flux({ start: 41, total: 45 }, function() {
      expect(this.query.raw.skip).to.eq(30);
      done();
    })).prev();
  });

  it('should skip to the last page', (done) => {
    new Pager(flux({ start: 1, total: 45 }, function() {
      expect(this.query.raw.skip).to.eq(40);
      done();
    })).last();
  });

  describe('realigned paging behaviour', () => {
    // it('should not realign the pages on page next', () => {
    //   new Pager(flux({ start: 13, total: 45 }, function() {
    //     expect(this.query.raw.skip).to.eq(23);
    //   })).next();
    // });
    //
    //   it('should realign the pages on page next', () => {
    //     new Pager(flux({ start: 13, total: 45 }, function() {
    //       expect(this.query.raw.skip).to.eq(20);
    //     })).next(true);
    //   });
    //
    //   it('should not skip past last page', () => {
    //     new Pager(flux({ start: 43, total: 45 }, function() {
    //       expect(this.query.raw.skip).to.eq(40);
    //     })).next(true);
    //   });
    //
    //   it('should not realign the pages on page previous', () => {
    //     new Pager(flux({ start: 23, total: 45 }, function() {
    //       expect(this.query.raw.skip).to.eq(13);
    //     })).prev();
    //   });
    //
    //   it('should realign the pages on page previous', () => {
    //     new Pager(flux({ start: 23, total: 45 }, function() {
    //       expect(this.query.raw.skip).to.eq(10);
    //     })).prev(true);
    //   });
    //
    //   it('should not realign to a negative value', () => {
    //     new Pager(flux({ start: 3, total: 45 }, function() {
    //       expect(this.query.raw.skip).to.eq(0);
    //     })).prev(true);
    //   });
  });

  describe('pageExists()', () => {
    it('should return true', () => {
      const pager = new Pager(flux({ start: 10, total: 200 }, function() { }));
      expect(pager.pageExists(20)).to.be.true;
    });

    it('should return false', () => {
      const pager = new Pager(flux({ start: 10, total: 200 }, function() { }));
      expect(pager.pageExists(21)).to.be.false;
    });
  });

  describe('switchPage behaviour', () => {
    it('should switchPage to the first page', () => {
      const pager = new Pager(flux({ start: 10, total: 200 }, function() {
        expect(this.query.raw.skip).to.eq(0);
      }));
      pager.switchPage(1);
      expect(pager.currentPage).to.eq(1);
      expect(pager.fromResult).to.eq(1);
      expect(pager.toResult).to.eq(10);
    });

    it('should switchPage to a page', () => {
      const pager = new Pager(flux({ start: 1, total: 200 }, function() {
        expect(this.query.raw.skip).to.eq(70);
      }));
      pager.switchPage(8);
      expect(pager.currentPage).to.eq(8);
      expect(pager.fromResult).to.eq(71);
      expect(pager.toResult).to.eq(80);
    });

    describe('error states', () => {
      it('should not switchPage past the results', (done) => {
        new Pager(flux({ start: 1, total: 30 }))
          .switchPage(8)
          .catch(() => done());
      });

      it('should not switchPage to lower than the first page', (done) => {
        new Pager(flux(1))
          .switchPage(-2)
          .catch(() => done());
      });
    });
  });

  describe('current page behaviour', () => {
    it('should return the current page', () => {
      expect(new Pager(flux(1)).currentPage).to.eq(1);
    });

    it('should return from the middle', () => {
      expect(new Pager(flux(45)).currentPage).to.eq(5);
    });

    it('should change based on pageSize', () => {
      expect(new Pager(flux({ start: 36, pageSize: 12 })).currentPage).to.eq(4);
    });
  });

  describe('total pages behaviour', () => {
    it('should return the total number of pages', () => {
      expect(new Pager(flux({ start: 1, total: 457 })).finalPage).to.eq(46);
    });

    it('should correctly cut off the last page', () => {
      expect(new Pager(flux({ start: 1, total: 300 })).finalPage).to.eq(30);
    });

    it('should return one page when no results', () => {
      expect(new Pager(flux({ start: 1, total: 0 })).finalPage).to.eq(1);
    });
  });

  describe('pages behaviour', () => {
    it('should return an array of beginning at 1', () => {
      expect(new Pager(flux({ start: 1, total: 100 })).pageNumbers()).to.eql([1, 2, 3, 4, 5]);
    });

    it('should still begin at 1', () => {
      expect(new Pager(flux({ start: 20, total: 100 })).pageNumbers()).to.eql([1, 2, 3, 4, 5]);
    });

    it('should start shifting the page range up', () => {
      expect(new Pager(flux({ start: 31, total: 100 })).pageNumbers()).to.eql([2, 3, 4, 5, 6]);
    });

    it('should return an array of pages', () => {
      expect(new Pager(flux({ start: 51, total: 100 })).pageNumbers()).to.eql([4, 5, 6, 7, 8]);
    });

    it('should return array ending at 10', () => {
      expect(new Pager(flux({ start: 100, total: 100 })).pageNumbers()).to.eql([6, 7, 8, 9, 10]);
    });

    it('should still end at 10', () => {
      expect(new Pager(flux({ start: 80, total: 100 })).pageNumbers()).to.eql([6, 7, 8, 9, 10]);
    });

    it('should start shifting the page range down', () => {
      expect(new Pager(flux({ start: 69, total: 100 })).pageNumbers()).to.eql([5, 6, 7, 8, 9]);
    });

    it('should handle limit higher than available pages', () => {
      expect(new Pager(flux({ start: 132, total: 144, pageSize: 12 }))
        .pageNumbers(13)).to.eql([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    });

    it('should show smaller ranges', () => {
      expect(new Pager(flux({ start: 1, total: 47 })).pageNumbers()).to.eql([1, 2, 3, 4, 5]);
      expect(new Pager(flux({ start: 1, total: 33 })).pageNumbers()).to.eql([1, 2, 3, 4]);
      expect(new Pager(flux({ start: 1, total: 25 })).pageNumbers()).to.eql([1, 2, 3]);
      expect(new Pager(flux({ start: 1, total: 18 })).pageNumbers()).to.eql([1, 2]);
      expect(new Pager(flux({ start: 1, total: 7 })).pageNumbers()).to.eql([1]);
    });
  });

  it('should allow next', () => {
    expect(new Pager(flux({ start: 1, total: 45 })).nextPage).to.not.be.null;
  });

  it('should not allow next', () => {
    expect(new Pager(flux({ start: 43, total: 45 })).nextPage).to.be.null;
  });

  it('should allow previous', () => {
    expect(new Pager(flux(12)).previousPage).to.not.be.null;
  });

  it('should not allow previous', () => {
    expect(new Pager(flux(1)).previousPage).to.be.null;
  });

  describe('event behaviour', () => {
    it('should emit page_changed event on next', (done) => {
      const mockflux = flux({ start: 1, total: 40 });
      mockflux.emit = (event, data) => {
        expect(event).to.eq(Events.PAGE_CHANGED);
        expect(data).to.eql({ pageNumber: 2 });
        return done();
      };
      new Pager(mockflux).next();
    });

    it('should emit page_changed event on prev', (done) => {
      const mockflux = flux({ start: 21, total: 40 });
      mockflux.emit = (event, data) => {
        expect(event).to.eq(Events.PAGE_CHANGED);
        expect(data).to.eql({ pageNumber: 2 });
        return done();
      };
      new Pager(mockflux).prev();
    });

    it('should emit page_changed event on reset', (done) => {
      const mockflux = flux({ start: 12, total: 40 });
      mockflux.emit = (event, data) => {
        expect(event).to.eq(Events.PAGE_CHANGED);
        expect(data).to.eql({ pageNumber: 1 });
        return done();
      };
      new Pager(mockflux).reset();
    });

    it('should emit page_changed event on last', (done) => {
      const mockflux = flux({ start: 1, total: 40 });
      mockflux.emit = (event, data) => {
        expect(event).to.eq(Events.PAGE_CHANGED);
        expect(data).to.eql({ pageNumber: 4 });
        return done();
      };
      new Pager(mockflux).last();
    });
  });

  describe('error states', () => {
    it('should throw error if paging too low', (done) => {
      new Pager(flux(1, function() { })).switchPage(0)
        .catch((err) => {
          expect(err.message).to.eq('page 0 does not exist');
          done();
        });
    });

    it('should throw error if paging too high', (done) => {
      new Pager(flux(1, function() { })).switchPage(100)
        .catch((err) => {
          expect(err.message).to.eq('page 100 does not exist');
          done();
        });
    });
  });
});
