import * as redux from 'redux';
import { UPDATE_SEARCH_REQUEST } from './actions';

export namespace Search {
  export const request = (state, action) => {

    switch (action.type) {
      case UPDATE_SEARCH_REQUEST:
        break;
      default: return state;
    }
  };
  export const response = (state, action) => state;
}

export default redux.combineReducers({
  data: redux.combineReducers({
    search: redux.combineReducers({
      req: Search.request,
      res: Search.response
    })
  })
});
