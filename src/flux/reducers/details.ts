import Actions from '../actions';
import Store from '../store';

export default function updateDetails(state: Store.Details, action) {
  switch (action.type) {
    case Actions.UPDATE_DETAILS_ID:
      return { ...state, id: action.id };
    case Actions.RECEIVE_DETAILS_PRODUCT:
      return { ...state, product: action.product };
    default:
      return state;
  }
}
