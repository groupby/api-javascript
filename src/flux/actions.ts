import { Dispatch } from 'redux';
import 'redux-thunk';
import { Request } from '../models/request';
import Store from './store';

export const UPDATE_SEARCH_REQUEST = 'UPDATE_SEARCH_REQUEST';
export const UPDATE_QUERY = 'UPDATE_QUERY';
export const ADD_REFINEMENT = 'ADD_REFINEMENT';
export const REMOVE_REFINEMENT = 'REMOVE_REFINEMENT';

export const conditional = (condition: boolean, action: () => Promise<any>) =>
  condition ? action() : Promise.resolve();

export function search(request: Request) {
  return (dispatch: Dispatch<Store.State>, getState: () => Store.State) => {
    const data = getState().data;

    // conditional(data.query.original !== request.query, () => updateQuery(request.query))
    //   .then(() => conditional())
    //
    // return dispatch({
    //   type: UPDATE_SEARCH_REQUEST,
    //   request
    // });
  };
}

export const updateQuery = (query: string) =>
  (dispatch: Dispatch<Store.State>) => dispatch({ type: UPDATE_QUERY, query });

export const addRefinement = (refinement: Store.Refinement) =>
  (dispatch: Dispatch<Store.State>) => dispatch<Promise<any>, any>(<any>{ type: ADD_REFINEMENT, refinement });

export const removeRefinement = (refinement: Store.Refinement) =>
  (dispatch: Dispatch<Store.State>) => dispatch({ type: REMOVE_REFINEMENT, refinement });
