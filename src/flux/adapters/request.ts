import { Request as SearchRequest, Sort } from '../../models/request';
import { Store } from '../core';
import State = Store.State;

namespace Request {

  export const extractSearchRequest = (state: State): SearchRequest => ({
    collection: Request.extractCollection(state),
    pageSize: Request.extractPageSize(state),
    query: Request.extractQuery(state),
    refinements: Request.extractRefinements(state),
    skip: extractSkip(state),
    sort: Request.extractSorts(state),
  });

  export const extractCollection = (state: State) => state.data.collections.selected;

  export const extractQuery = (state: State) => state.data.query.original;

  export const extractSkip = (state: State) => state.data.page.from - 1;

  export const extractPageSize = (state: State) => state.data.page.size;

  export const extractSorts = (state: State) => state.data.sorts.allIds
    .map((id) => state.data.sorts.byId[id])
    .map(({ field, descending }) => {
      const sort: Sort = { field };
      if (descending) {
        sort.order = 'Descending';
      }
      return sort;
    });

  export const extractRefinements = (state: State) =>
    state.data.navigations.allIds.map((id) => state.data.navigations.byId[id])
      .reduce((allRefinements, navigation) =>
        [
          ...allRefinements,
          ...(<any[]>navigation.refinements).map(({ low, high, value }) =>
            navigation.range
              ? { navigationName: navigation.field, type: 'Range', high, low }
              : { navigationName: navigation.field, type: 'Value', value }),
        ], []);
}

export default Request;
