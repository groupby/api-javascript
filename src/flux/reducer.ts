import * as actions from './actions';
import * as redux from 'redux';

export function updateQuery(state, action) {
  switch (action) {
    case actions.UPDATE_QUERY:
      return { ...state, query: action.query }
      break;
    default:
      return state;
  }
}

export default redux.combineReducers({
  data: redux.combineReducers({
    query: updateQuery()
  })
});
