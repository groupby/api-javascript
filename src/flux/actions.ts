import { Dispatch } from 'redux';
import { Request } from '../models/request';
import Store from './store';

namespace Actions {
  export const UPDATE_SEARCH_REQUEST = 'UPDATE_SEARCH_REQUEST';
  export const UPDATE_QUERY = 'UPDATE_QUERY';
  export const ADD_REFINEMENT = 'ADD_REFINEMENT';
  export const REMOVE_REFINEMENT = 'REMOVE_REFINEMENT';

  export function search(request: Request) {
    return (dispatch: Dispatch<Store.State>, getState: () => Store.State) => {
      const data = getState().data;

      conditional(data.query.original !== request.query, () => updateQuery(request.query))
        .then(() => conditional());

      return dispatch({
        type: UPDATE_SEARCH_REQUEST,
        request
      });
    };
  }

  export const updateQuery = (query: string) => Actions.thunk(UPDATE_QUERY, { query });

  export const addRefinement = (refinement: Store.Refinement) => Actions.thunk(ADD_REFINEMENT, { refinement });

  export const removeRefinement = (refinement: Store.Refinement) => Actions.thunk(REMOVE_REFINEMENT, { refinement });

  // utilities

  export const conditional = (condition: boolean, action: Function) =>
    condition ? action() : Promise.resolve();

  export const thunk = (type: string, data: any) => (dispatch) => dispatch({ type, ...data });
}

export default Actions;
