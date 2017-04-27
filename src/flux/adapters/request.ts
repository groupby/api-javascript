import Store from '../../../src/flux/store';
import { Request as SearchRequest } from '../../../src/models/request';

namespace Request {

  export const extractSearchRequest = (state: Store.State): SearchRequest => ({
    query: Request.extractQuery(state),
    refinements: Request.extractRefinements(state),
    // sort: store.data.sorts.allIds.map((id) => store.data.sorts.byId[id]),
  });

  export const extractQuery = (state: Store.State) => state.data.query.original;

  export const extractRefinements = (state: Store.State) =>
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
