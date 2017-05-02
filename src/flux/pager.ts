import { Results } from '../models/response';
import { Page } from './actions';
import { Events, FluxCapacitor } from './capacitor';
import Store from './store';
import range = require('lodash.range');

const MAX_RECORDS = 10000;

namespace Pager {

  export function previousPage(currentPage: number) {
    return currentPage > 1 ? currentPage - 1 : null;
  }

  export function nextPage(currentPage: number, finalPage: number) {
    return (currentPage + 1 <= finalPage) ? currentPage + 1 : null;
  }

  export function finalPage(pageSize: number, totalRecords: number) {
    return Math.max(Pager.getPage(pageSize, Pager.restrictTotalRecords(pageSize, totalRecords)), 1);
  }

  export function fromResult(currentPage: number, pageSize: number) {
    return currentPage * pageSize + 1;
    // TODO move the default value into reducer setup
    // return this.flux.query.build().skip + 1 || 1;
  }

  export function toResult(currentPage: number, pageSize: number, totalRecords: number) {
    if ((currentPage * pageSize) > totalRecords) {
      return ((currentPage - 1) * pageSize) + (totalRecords % currentPage);
    } else {
      return currentPage * pageSize;
    }
  }

  export function build(state: Store.State): Page {
    // TODO move this default into the reducer setup
    const pageSize = state.data.page.size || 10;
    const currentPage = state.data.page.current;
    const totalRecords = state.data.recordCount;
    const last = Pager.finalPage(pageSize, totalRecords);

    return {
      from: Pager.fromResult(currentPage, pageSize),
      last,
      next: Pager.nextPage(currentPage, last),
      previous: Pager.previousPage(currentPage),
      range: Pager.pageNumbers(currentPage, last, state.data.page.limit),
      to: Pager.toResult(currentPage, pageSize, totalRecords),
    };
  }

  export function pageNumbers(currentPage: number, finalPage: number, limit: number) {
    return range(1, Math.min(finalPage + 1, limit + 1))
      .map(Pager.transformPages(currentPage, finalPage, limit));
  }

  export function restrictTotalRecords(pageSize: number, totalRecords: number) {
    if (totalRecords > MAX_RECORDS) {
      return MAX_RECORDS - (MAX_RECORDS % pageSize);
    } else if ((totalRecords + pageSize) > MAX_RECORDS) {
      if (MAX_RECORDS % pageSize === 0) {
        return MAX_RECORDS;
      } else {
        return totalRecords - (totalRecords % pageSize);
      }
    } else {
      return totalRecords;
    }
  }

  export function getPage(pageSize: number, totalRecords: number) {
    return Math.ceil(totalRecords / pageSize);
  }

  export function transformPages(currentPage: number, finalPage: number, limit: number) {
    const border = Math.ceil(limit / 2);
    return (value: number) => {
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

export default Pager;
