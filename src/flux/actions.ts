import { Dispatch } from 'redux';
import { Request } from '../models/request';
import Store from './store';
import { rayify, thunk } from './utils';

namespace Actions {
  export const UPDATE_SEARCH = 'UPDATE_SEARCH';
  export const SELECT_REFINEMENT = 'SELECT_REFINEMENT';
  export const DESELECT_REFINEMENT = 'DESELECT_REFINEMENT';
  export const SELECT_COLLECTION = 'SELECT_COLLECTION';
  export const UPDATE_SORTS = 'UPDATE_SORTS';
  export const UPDATE_AUTOCOMPLETE_QUERY = 'UPDATE_AUTOCOMPLETE_QUERY';
  export const UPDATE_PAGE_SIZE = 'UPDATE_PAGE_SIZE';
  export const UPDATE_CURRENT_PAGE = 'UPDATE_CURRENT_PAGE';
  export const UPDATE_DETAILS_ID = 'UPDATE_DETAILS_ID';

  export const updateSearch = (search: Actions.Search) =>
    thunk(UPDATE_SEARCH, search);

  export const selectRefinement = (navigationId: string, index: number) =>
    thunk(SELECT_REFINEMENT, { navigationId, index });

  export const deselectRefinement = (navigationId: string, index: number) =>
    thunk(DESELECT_REFINEMENT, { navigationId, index });

  export const selectCollection = (id: string) =>
    thunk(SELECT_COLLECTION, { id });

  export const updateSorts = (sorts: Store.Sort | Store.Sort[]) =>
    thunk(UPDATE_SORTS, { sorts: rayify(sorts) });

  export const updateAutocompleteQuery = (query: string) =>
    thunk(UPDATE_AUTOCOMPLETE_QUERY, { query });

  export const updatePageSize = (size: number) =>
    thunk(UPDATE_PAGE_SIZE, { size });

  export const updateCurrentPage = (page: number) =>
    thunk(UPDATE_CURRENT_PAGE, { page });

  export const updateDetailsId = (id: string) =>
    thunk(UPDATE_DETAILS_ID, { id });

  export interface Search {
    query?: string;
    // refinements?: Search.Refinement[];
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
}

export default Actions;
