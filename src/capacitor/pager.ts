import { Results } from '../models/response';
import { Events, FluxCapacitor } from './index';
import range = require('lodash.range');

const MAX_RECORDS = 10000;

export class Pager {

  constructor(private flux: FluxCapacitor) { }

  next(): Promise<Results> {
    return this.switchPage(this.nextPage);
  }

  prev(): Promise<Results> {
    return this.switchPage(this.previousPage);
  }

  last(): Promise<Results> {
    return this.switchPage(this.finalPage);
  }

  reset(): Promise<Results> {
    return this.switchPage(this.firstPage);
  }

  get currentPage(): number {
    return this.getPage(this.fromResult);
  }

  get previousPage(): number | null {
    return (this.currentPage - 1 >= this.firstPage) ? this.currentPage - 1 : null;
  }

  get nextPage(): number | null {
    return (this.currentPage + 1 <= this.finalPage) ? this.currentPage + 1 : null;
  }

  get firstPage(): number {
    return 1;
  }

  get finalPage(): number {
    return Math.max(this.getPage(this.restrictTotalRecords(this.totalRecords, this.pageSize)), 1);
  }

  get fromResult(): number {
    return this.flux.query.build().skip + 1 || 1;
  }

  get toResult(): number {
    if ((this.currentPage * this.pageSize) > this.totalRecords) {
      return ((this.currentPage - 1) * this.pageSize) + (this.totalRecords % this.currentPage);
    } else {
      return this.currentPage * this.pageSize;
    }
  }

  get totalRecords(): number {
    return this.flux.results ? this.flux.results.totalRecordCount : 0;
  }

  pageExists(page: number): boolean {
    return page <= this.finalPage && page >= this.firstPage;
  }

  pageNumbers(limit: number = 5): number[] {
    return range(1, Math.min(this.finalPage + 1, limit + 1))
      .map(this.transformPages(limit));
  }

  switchPage(page: number): Promise<Results | void> {
    if (this.pageExists(page)) {
      const skip = (page - 1) * this.pageSize;
      this.flux.query.skip(skip);
      this.flux.emit(Events.PAGE_CHANGED, { pageNumber: page });
      return this.flux.search();
    } else {
      return Promise.reject(new Error(`page ${page} does not exist`));
    }
  }

  restrictTotalRecords(total: number, pageSize: number): number {
    if (total > MAX_RECORDS) {
      return MAX_RECORDS - (MAX_RECORDS % pageSize);
    } else if ((total + pageSize) > MAX_RECORDS) {
      if (MAX_RECORDS % pageSize === 0) {
        return MAX_RECORDS;
      } else {
        return total - (total % pageSize);
      }
    } else {
      return total;
    }
  }

  getPage(record: number): number {
    return Math.ceil(record / this.pageSize);
  }

  private transformPages(limit: number): (value: number) => number {
    const border = Math.ceil(limit / 2);
    return (value: number): number => {
      // account for 0-indexed pages
      if (this.currentPage <= border || limit > this.finalPage) {
        // pages start at beginning
        return value;
      } else if (this.currentPage > this.finalPage - border) {
        // pages start and end in the middle
        return value + this.finalPage - limit;
      } else {
        // pages end at last page
        return value + this.currentPage - border;
      }
    };
  }

  private get pageSize(): number {
    return this.flux.query.build().pageSize || 10;
  }
}
