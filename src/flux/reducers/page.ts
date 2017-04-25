import Actions from '../actions';
import Store from '../store';

export default function updatePage(state: Store.Page, action) {
  switch (action.type) {
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
    case Actions.RECEIVE_PAGE:
      return {
        ...state,
        from: action.from,
        last: action.last,
        next: action.next,
        previous: action.previous,
        range: action.range,
        to: action.to,
      };
    default:
      return state;
  }
}
