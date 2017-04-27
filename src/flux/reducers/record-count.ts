import Actions from '../actions';
import Store from '../store';

export default function updateRecordCount(state, action) {
  switch (action.type) {
    case Actions.RECEIVE_PRODUCTS:
      return action.recordCount;
    default:
      return state;
  }
}
