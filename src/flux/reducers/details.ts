import Actions from '../actions';
import Store from '../store';

export default function updateDetails(state: Store.Details, action) {
  switch (action) {
    case Actions.UPDATE_DETAILS_ID:
      return { ...state, id: action.id };
    default:
      return state;
  }
}
