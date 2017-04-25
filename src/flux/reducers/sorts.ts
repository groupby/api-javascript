import Actions from '../actions';
import Store from '../store';

export default function updateSorts(state: Store.Indexed.Selectable<Store.Sort.Labelled>, action) {
  switch (action.type) {
    case Actions.UPDATE_SORTS:
      return { ...state, selected: action.id };
    default:
      return state;
  }
}
