import Actions from '../actions';
import Store from '../store';

export default function updateRecordCount(state: Store.Page, action) {
  switch (action) {
    case Actions.RECEIVE_PRODUCTS:
      return { ...state, recordCount: action.recordCount };
    default:
      return state;
  }
}
