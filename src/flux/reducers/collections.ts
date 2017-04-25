import Actions from '../actions';
import Store from '../store';

export default function updateCollections(state: Store.Indexed.Selectable<Store.Collection>, action) {
  switch (action) {
    case Actions.SELECT_COLLECTION:
      return { ...state, selected: action.id };
    default:
      return state;
  }
}
