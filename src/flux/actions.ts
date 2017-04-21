import { Dispatch } from 'redux';
import { Request } from '../models/request';
import Store from './store';

namespace Actions {
  export const UPDATE_SEARCH_REQUEST = 'UPDATE_SEARCH_REQUEST';
  export const UPDATE_QUERY = 'UPDATE_QUERY';
  export const SELECT_REFINEMENT = 'SELECT_REFINEMENT';
  export const DESELECT_REFINEMENT = 'DESELECT_REFINEMENT';
  export const SELECT_COLLECTION = 'SELECT_COLLECTION';
  export const DESELECT_COLLECTION = 'DESELECT_COLLECTION';

  export function search(request: Request) {
    return (dispatch: Dispatch<Store.State>, getState: () => Store.State) => {
      const data = getState().data;

      // conditional(data.query.original !== request.query, () => updateQuery(request.query))
      //   .then(() => conditional());

      return dispatch({
        type: UPDATE_SEARCH_REQUEST,
        request
      });
    };
  }

  export const updateQuery = (query: string) => Actions.thunk(UPDATE_QUERY, { query });

  export const selectRefinement = (data: { navigationId: string, refinementIndex: number }) =>
    Actions.thunk(SELECT_REFINEMENT, data);

  export const deselectRefinement = (data: { navigationId: string, refinementIndex: number }) =>
    Actions.thunk(DESELECT_REFINEMENT, data);

  export const selectCollection = (data: { collectionId: string }) => Actions.thunk(SELECT_COLLECTION, data);

  export const deselectCollection = (data: { collectionId: string }) => Actions.thunk(DESELECT_COLLECTION, data);

  // utilities

  export const conditional = (condition: boolean, action: Function) =>
    condition ? action() : Promise.resolve();

  export const thunk = (type: string, data: any) => (dispatch) => dispatch({ type, ...data });
}

export default Actions;
