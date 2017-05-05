import { Request } from '../models/request';
import Store from './store';

namespace Selectors {

  export const searchRequest = (store: Partial<Store.State>): Request => ({
    query: store.data.query.original,
    refinements: store.data.navigations.allIds.map((id) => store.data.navigations.byId[id])
      .reduce((allRefinements, navigation) =>
        (<any[]>navigation.refinements).reduce((refinements, { field, type, low, high, value }) =>
          refinements.concat(navigation.range
            ? { navigationName: field, high, low, type: 'Range' }
            : { navigationName: field, type: 'Value', value }), []), []),
    // sort: store.data.sorts.allIds.map((id) => store.data.sorts.byId[id]),
  });

  export const navigation = (state: Partial<Store.State>, navigationId: string) =>
    state.data.navigations.byId[navigationId];

  export const isRefinementDeselected = (state: Partial<Store.State>, navigationId: string, index: number) => {
    const nav = Selectors.navigation(state, navigationId);
    return nav && !nav.selected.includes(index);
  };

  export const isRefinementSelected = (state: Partial<Store.State>, navigationId: string, index: number) => {
    const nav = Selectors.navigation(state, navigationId);
    return nav && nav.selected.includes(index);
  };

  export const hasMoreRefinements = (state: Partial<Store.State>, navigationId: string) => {
    const nav = Selectors.navigation(state, navigationId);
    return nav && nav.more;
  };
}

export default Selectors;
