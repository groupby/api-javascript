import Actions from '../actions';
import Store from '../store';

export default function updatePage(state: Store.Page, action) {
  switch (action) {
    case Actions.UPDATE_SEARCH:
    case Actions.UPDATE_SORTS:
    case Actions.SELECT_COLLECTION:
    case Actions.SELECT_REFINEMENT:
    case Actions.DESELECT_REFINEMENT:
      return { ...state, current: 1 };
    case Actions.UPDATE_CURRENT_PAGE:
      return { ...state, current: action.page };
    case Actions.UPDATE_PAGE_SIZE:
      return { ...state, current: 1, size: action.size };
    default:
      return state;
  }
}
