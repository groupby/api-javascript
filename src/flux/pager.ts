import { Results } from '../models/response';
import { Page } from './actions';
import { Events, FluxCapacitor } from './capacitor';
import Store from './store';
import range = require('lodash.range');

const MAX_RECORDS = 10000;

export class Pager {

  constructor(private state: Store.State, private results: Results) { }

  previousPage(currentPage: number) {
    return currentPage > 1 ? currentPage - 1 : null;
  }

  nextPage(currentPage: number, finalPage: number) {
    return (currentPage + 1 <= finalPage) ? currentPage + 1 : null;
  }

  finalPage(pageSize: number, totalRecords: number) {
    return Math.max(this.getPage(this.restrictTotalRecords(totalRecords, pageSize), pageSize), 1);
  }

  fromResult(currentPage: number, pageSize: number) {
    return currentPage * pageSize + 1;
    // TODO move the default value into reducer setup
    // return this.flux.query.build().skip + 1 || 1;
  }

  toResult(currentPage: number, pageSize: number, totalRecords: number) {
    if ((currentPage * pageSize) > totalRecords) {
      return ((currentPage - 1) * pageSize) + (totalRecords % currentPage);
    } else {
      return currentPage * pageSize;
    }
  }

  get totalRecords(): number {
    return this.results.totalRecordCount;
  }

  get pageSize(): number {
    // TODO move this default into the reducer setup
    return this.state.data.page.size || 10;
  }

  get currentPage(): number {
    return this.state.data.page.current;
  }

  build(): Page {
    const pageSize = this.pageSize;
    const currentPage = this.state.data.page.current;
    const totalRecords = this.totalRecords;
    const finalPage = this.finalPage(pageSize, totalRecords);

    return {
      from: this.fromResult(currentPage, pageSize),
      last: finalPage,
      next: this.nextPage(currentPage, finalPage),
      previous: this.previousPage(currentPage),
      range: this.pageNumbers(currentPage, finalPage, this.state.data.page.limit),
      to: this.toResult(currentPage, pageSize, totalRecords),
      total: this.totalRecords,
    };
  }

  pageNumbers(currentPage: number, finalPage: number, limit: number): number[] {
    return range(1, Math.min(finalPage + 1, limit + 1))
      .map(this.transformPages(currentPage, finalPage, limit));
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

  getPage(record: number, pageSize: number): number {
    return Math.ceil(record / this.pageSize);
  }

  transformPages(currentPage: number, finalPage: number, limit: number): (value: number) => number {
    const border = Math.ceil(limit / 2);
    return (value: number): number => {
      // account for 0-indexed pages
      if (currentPage <= border || limit > finalPage) {
        // pages start at beginning
        return value;
      } else if (currentPage > finalPage - border) {
        // pages start and end in the middle
        return value + finalPage - limit;
      } else {
        // pages end at last page
        return value + currentPage - border;
      }
    };
  }
}
