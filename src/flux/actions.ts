import { Dispatch } from 'redux';
import { BrowserBridge } from '../core/bridge';
import { Request } from '../models/request';
import { RefinementResults, Results } from '../models/response';
import { rayify } from '../utils';
import ResponseAdapter from './adapters/response';
import Selectors from './selectors';
import Store from './store';
import { conditional, LinkMapper, thunk } from './utils';

class Actions {
  private linkMapper: (value: string) => Store.Linkable;

  constructor(private bridge: BrowserBridge, paths: Paths) {
    this.linkMapper = LinkMapper(paths.search);
  }

  // fetch action creators
  fetchMoreRefinements = (navigationId: string) =>
    (dispatch: Dispatch<any>, getStore: () => Store.State) => {
      const state = getStore();
      if (Selectors.hasMoreRefinements(state, navigationId)) {
        return this.bridge.refinements(Selectors.searchRequest(state), navigationId)
          .then(({ navigation: { name, refinements } }) => {
            const remapped = refinements.map(ResponseAdapter.extractRefinement);
            return dispatch(this.receiveMoreRefinements(name, remapped));
          });
      }
    }

  // request action creators
  updateSearch = (search: Search) =>
    thunk(Actions.UPDATE_SEARCH, search)

  selectRefinement = (navigationId: string, index: number) =>
    conditional((state) => Selectors.isRefinementDeselected(state, navigationId, index),
      Actions.SELECT_REFINEMENT, { navigationId, index })

  deselectRefinement = (navigationId: string, index: number) =>
    conditional((state) => Selectors.isRefinementSelected(state, navigationId, index),
      Actions.DESELECT_REFINEMENT, { navigationId, index })

  selectCollection = (id: string) =>
    conditional((state) => state.data.collections.selected !== id,
      Actions.SELECT_COLLECTION, { id })

  updateSorts = (id: string) =>
    conditional((state) => state.data.sorts.selected !== id,
      Actions.UPDATE_SORTS, { id })

  updatePageSize = (size: number) =>
    conditional((state) => state.data.page.size !== size,
      Actions.UPDATE_PAGE_SIZE, { size })

  updateCurrentPage = (page: number) =>
    conditional((state) => state.data.page.current !== page,
      Actions.UPDATE_CURRENT_PAGE, { page })

  updateDetailsId = (id: string) =>
    thunk(Actions.UPDATE_DETAILS_ID, { id })

  updateAutocompleteQuery = (query: string) =>
    conditional((state) => state.data.autocomplete.query !== query,
      Actions.UPDATE_AUTOCOMPLETE_QUERY, { query })

  // response action creators
  receiveSearchResponse = (results: Results) =>
    (dispatch: Dispatch<any>, getStore: () => Store.State) => {
      const state = getStore();
      dispatch(this.receiveRedirect(results.redirect));
      dispatch(this.receiveQuery(ResponseAdapter.extractQuery(results, this.linkMapper)));
      dispatch(this.receiveProducts(results.records.map((product) => product.allMeta), results.totalRecordCount));
      // tslint:disable-next-line max-line-length
      dispatch(this.receiveNavigations(ResponseAdapter.combineNavigations(results.availableNavigation, results.selectedNavigation)));
      dispatch(this.receivePage(ResponseAdapter.extractPage(state)));
      dispatch(this.receiveTemplate(ResponseAdapter.extractTemplate(results.template)));
      dispatch(this.receiveCollectionCount(state.data.collections.selected, results.totalRecordCount));
    }

  receiveQuery = (query: Query) =>
    thunk(Actions.RECEIVE_QUERY, query)

  receiveProducts = (products: Store.Product[], recordCount: number) =>
    thunk(Actions.RECEIVE_PRODUCTS, { products, recordCount })

  receiveCollectionCount = (collection: string, count: number) =>
    thunk(Actions.RECEIVE_COLLECTION_COUNT, { collection, count })

  receiveNavigations = (navigations: Store.Navigation[]) =>
    thunk(Actions.RECEIVE_NAVIGATIONS, { navigations })

  receivePage = (page: Page) =>
    thunk(Actions.RECEIVE_PAGE, page)

  receiveTemplate = (template: Store.Template) =>
    thunk(Actions.RECEIVE_TEMPLATE, { template })

  receiveRedirect = (redirect: string) =>
    thunk(Actions.RECEIVE_REDIRECT, { redirect })

  receiveMoreRefinements = (navigationId: string, refinements: any) =>
    thunk(Actions.RECEIVE_MORE_REFINEMENTS, { navigationId, refinements })

  receiveAutocompleteSuggestions = (suggestions: string[], categoryValues: string[]) =>
    thunk(Actions.RECEIVE_AUTOCOMPLETE_SUGGESTIONS, { suggestions, categoryValues })

  receiveDetailsProduct = (product: Store.Product) =>
    thunk(Actions.RECEIVE_DETAILS_PRODUCT, { product })
}

namespace Actions {
  // request actions
  export const UPDATE_AUTOCOMPLETE_QUERY = 'UPDATE_AUTOCOMPLETE_QUERY';
  export const UPDATE_DETAILS_ID = 'UPDATE_DETAILS_ID';
  export const UPDATE_SEARCH = 'UPDATE_SEARCH';
  export const SELECT_REFINEMENT = 'SELECT_REFINEMENT';
  export const DESELECT_REFINEMENT = 'DESELECT_REFINEMENT';
  export const SELECT_COLLECTION = 'SELECT_COLLECTION';
  export const UPDATE_SORTS = 'UPDATE_SORTS';
  export const UPDATE_PAGE_SIZE = 'UPDATE_PAGE_SIZE';
  export const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';

  // response actions
  // TODO
  export const RECEIVE_MORE_REFINEMENTS = 'RECEIVE_MORE_REFINEMENTS';
  export const RECEIVE_AUTOCOMPLETE_SUGGESTIONS = 'RECEIVE_AUTOCOMPLETE_SUGGESTIONS';
  export const RECEIVE_DETAILS_PRODUCT = 'RECEIVE_DETAILS_PRODUCT';
  export const RECEIVE_QUERY = 'RECEIVE_QUERY';
  // TODO
  export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
  export const RECEIVE_COLLECTION_COUNT = 'RECEIVE_COLLECTION_COUNT';
  // TODO
  export const RECEIVE_NAVIGATIONS = 'RECEIVE_NAVIGATIONS';
  export const RECEIVE_PAGE = 'RECEIVE_PAGE';
  export const RECEIVE_TEMPLATE = 'RECEIVE_TEMPLATE';
  export const RECEIVE_REDIRECT = 'RECEIVE_REDIRECT';
}

export default Actions;

export interface Query {
  corrected?: string;
  related: Store.Query.Related[];
  didYouMean: Store.Query.DidYouMean[];
  rewrites: string[];
}

export interface Search {
  query?: string;
  navigationId?: string;
  index?: number;

  /**
   * only for refinements
   * if true, replace refinements with the provided ones
   * if false, add the provided refinements
   */
  clear?: boolean;
}

export namespace Search {
  export type Refinement = ValueRefinement | RangeRefinement;

  export interface BaseRefinement {
    field: string;
  }

  export interface ValueRefinement extends BaseRefinement {
    value: string;
  }

  export interface RangeRefinement extends BaseRefinement {
    low?: number;
    high?: number;
  }
}

export interface Page {
  previous: number;
  next: number;
  last: number;
  from: number;
  to: number;
  range: number[];
}

export interface Paths {
  search: string;
  // details: string;
}
