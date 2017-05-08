import { Store } from '..';
import Creator from './creator';

export { Creator };

namespace Actions {

  // request actions
  export const UPDATE_AUTOCOMPLETE_QUERY = 'UPDATE_AUTOCOMPLETE_QUERY';
  export const UPDATE_DETAILS_ID = 'UPDATE_DETAILS_ID';
  export const UPDATE_SEARCH = 'UPDATE_SEARCH';
  export const SELECT_REFINEMENT = 'SELECT_REFINEMENT';
  export const DESELECT_REFINEMENT = 'DESELECT_REFINEMENT';
  export const SELECT_COLLECTION = 'SELECT_COLLECTION';
  export const SELECT_SORT = 'UPDATE_SORTS';
  export const UPDATE_PAGE_SIZE = 'UPDATE_PAGE_SIZE';
  export const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';

  // response actions
  export const RECEIVE_MORE_REFINEMENTS = 'RECEIVE_MORE_REFINEMENTS';
  export const RECEIVE_AUTOCOMPLETE_SUGGESTIONS = 'RECEIVE_AUTOCOMPLETE_SUGGESTIONS';
  export const RECEIVE_AUTOCOMPLETE_PRODUCTS = 'RECEIVE_AUTOCOMPLETE_PRODUCTS';
  export const RECEIVE_DETAILS_PRODUCT = 'RECEIVE_DETAILS_PRODUCT';
  export const RECEIVE_QUERY = 'RECEIVE_QUERY';
  export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
  export const RECEIVE_COLLECTION_COUNT = 'RECEIVE_COLLECTION_COUNT';
  export const RECEIVE_NAVIGATIONS = 'RECEIVE_NAVIGATIONS';
  export const RECEIVE_PAGE = 'RECEIVE_PAGE';
  export const RECEIVE_RECORD_COUNT = 'RECEIVE_RECORD_COUNT';
  export const RECEIVE_TEMPLATE = 'RECEIVE_TEMPLATE';
  export const RECEIVE_REDIRECT = 'RECEIVE_REDIRECT';

  export const SO_FETCHING = 'SO_FETCHING';

  export interface Action { type: string; }

  export namespace Autocomplete {
    export interface UpdateQuery extends Action {
      query: string;
    }
    export interface ReceiveSuggestions extends Action {
      suggestions: string[];
      categoryValues: string[];
    }
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

  export namespace Collections {
    export interface SelectCollection extends Action {
      id: string;
    }
    export interface ReceiveCount extends Action {
      collection: string;
      count: number;
    }
  }

  export namespace Details {
    export interface UpdateId extends Action {
      id: string;
    }
    export interface ReceiveProduct extends Action {
      product: Store.Product;
    }
  }

  export namespace Navigation {
    export interface RefinementAction extends Action {
      navigationId: string;
      index: number;
    }
    export type SelectRefinement = RefinementAction;
    export type DeselectRefinement = RefinementAction;
    export interface UpdateSearch extends Partial<RefinementAction> {
      clear?: boolean;
    }
    export interface ReceiveNavigations extends Action {
      navigations: Store.Navigation[];
    }
    export interface ReceiveMoreRefinements extends Action {
      navigationId: string;
      refinements: Store.Refinement[];
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
  export namespace Page {
    export interface UpdateCurrent extends Action {
      page: number;
    }
    export interface UpdateSize extends Action {
      size: number;
    }
    export interface ReceivePage extends Action {
      from: number;
      to: number;
      last: number;
      next: number;
      previous: number;
      range: number[];
    }
  }

  export interface Query {
    corrected?: string;
    related: Store.Query.Related[];
    didYouMean: Store.Query.DidYouMean[];
    rewrites: string[];
  }
  export namespace Query {
    export interface UpdateOriginal extends Action {
      query: string;
    }
    export interface ReceiveQuery extends Action {
      corrected?: string;
      rewrites: string[];
      didYouMean: Store.Linkable[];
      related: Store.Linkable[];
    }
  }

  export namespace Sort {
    export interface UpdateSelected extends Action {
      id: string;
    }
  }

  export interface Paths {
    search: string;
    // details: string;
  }
}

export default Actions;
