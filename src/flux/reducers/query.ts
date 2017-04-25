import Actions from '../actions';
import Store from '../store';

export default function updateQuery(state: Store.Query, action) {
  switch (action) {
    case Actions.UPDATE_SEARCH:
      return { ...state, original: action.query };
    default:
      return state;
  }
}
