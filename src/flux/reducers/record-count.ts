import { Actions } from '../others';
import Store from '../store';

export type State = number;

export default function updateRecordCount(state: State = 0, action): State {
  switch (action.type) {
    case Actions.RECEIVE_PRODUCTS: return action.recordCount;
    default: return state;
  }
}
