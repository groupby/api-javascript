import { Dispatch } from 'redux';
import { BrowserBridge } from '../core/bridge';
import { Request } from '../models/request';
import { RefinementResults, Results } from '../models/response';
import ResponseAdapter from './adapters/response';
import Selectors from './selectors';
import Store from './store';
import { conditional, LinkMapper, rayify, thunk } from './utils';

class Actions {
  private linkMapper: (value: string) => Store.Linkable;

  constructor(private bridge: BrowserBridge, paths: Paths) {
    this.linkMapper = LinkMapper(paths.search);
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

  updateAutocompleteQuery = (query: string) =>
    conditional((state) => state.data.autocomplete.query !== query,
      Actions.UPDATE_AUTOCOMPLETE_QUERY, { query })

  updatePageSize = (size: number) =>
    conditional((state) => state.data.page.size !== size,
      Actions.UPDATE_PAGE_SIZE, { size })

  updateCurrentPage = (page: number) =>
    conditional((state) => state.data.page.current !== page,
      Actions.UPDATE_CURRENT_PAGE, { page })

  updateDetailsId = (id: string) =>
    thunk(Actions.UPDATE_DETAILS_ID, { id })

  fetchMoreRefinements = (navigationId: string) =>
    (dispatch: Dispatch<any>, getStore: () => Store.State) => {
      const state = getStore();
      if (Selectors.hasMoreRefinements(state, navigationId)) {
        this.bridge.refinements(Selectors.searchRequest(state), navigationId)
          .then(({ navigation: { name, refinements } }) =>
            dispatch(this.addMoreRefinements(name, refinements.map(ResponseAdapter.extractRefinement))));
      }
    }

  // response action creators
  addMoreRefinements = (navigationId: string, refinements: any) =>
    thunk(Actions.ADD_MORE_REFINEMENTS, { navigationId, refinements })

  updateSearchResponse = (results: Results) =>
    (dispatch: Dispatch<any>, getStore: () => Store.State) => {
      const state = getStore();
      dispatch(this.updateQuery(ResponseAdapter.extractQuery(results, this.linkMapper)));
      dispatch(this.updateProducts(results.records.map((product) => product.allMeta)));
      dispatch(this.updateCollectionCount(state.data.collections.selected, results.totalRecordCount));
      // tslint:disable-next-line max-line-length
      dispatch(this.updateNavigations(ResponseAdapter.combineNavigations(results.availableNavigation, results.selectedNavigation)));
      dispatch(this.updatePage(ResponseAdapter.extractPage(state, results)));
      dispatch(this.updateTemplate(ResponseAdapter.extractTemplate(results.template)));
      dispatch(this.updateRedirect(results.redirect));
    }

  updateQuery = (query: Query) =>
    thunk(Actions.UPDATE_QUERY, query)

  updateProducts = (products: Store.Product[]) =>
    thunk(Actions.UPDATE_PRODUCTS, { products })

  updateCollectionCount = (collection: string, count: number) =>
    thunk(Actions.UPDATE_COLLECTION_COUNT, { collection, count })

  updateNavigations = (navigations: Store.Navigation[]) =>
    thunk(Actions.UPDATE_NAVIGATIONS, { navigations })

  updatePage = (page: Page) =>
    thunk(Actions.UPDATE_PAGE, page)

  updateTemplate = (template: Store.Template) =>
    thunk(Actions.UPDATE_TEMPLATE, { template })

  updateRedirect = (redirect: string) =>
    thunk(Actions.UPDATE_REDIRECT, { redirect })

  updateAutocompleteSuggestions = (suggestions: string[], category: Store.Autocomplete.Category) =>
    thunk(Actions.UPDATE_AUTOCOMPLETE_SUGGESTIONS, { suggestions, category })

  updateDetailsProduct = (product: Store.Product) =>
    thunk(Actions.UPDATE_DETAILS_PRODUCT, { product })
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
  export const ADD_MORE_REFINEMENTS = 'ADD_MORE_REFINEMENTS';
  export const UPDATE_AUTOCOMPLETE_SUGGESTIONS = 'UPDATE_AUTOCOMPLETE_SUGGESTIONS';
  export const UPDATE_DETAILS_PRODUCT = 'UPDATE_DETAILS_PRODUCT';
  export const UPDATE_QUERY = 'UPDATE_AUTOCOMPLETE_SUGGESTIONS';
  export const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS';
  export const UPDATE_COLLECTION_COUNT = 'UPDATE_COLLECTION_COUNT';
  export const UPDATE_NAVIGATIONS = 'UPDATE_NAVIGATIONS';
  export const UPDATE_PAGE = 'UPDATE_PAGE';
  export const UPDATE_TEMPLATE = 'UPDATE_TEMPLATE';
  export const UPDATE_REDIRECT = 'UPDATE_TEMPLATE';
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
  total: number;
  range: number[];
}

export interface Paths {
  search: string;
  // details: string;
}
