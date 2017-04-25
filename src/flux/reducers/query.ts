import Actions from '../actions';
import Store from '../store';

export default function updateQuery(state: Store.Query, action) {
  switch (action.type) {
    case Actions.UPDATE_SEARCH:
      return { ...state, original: action.query };
    case Actions.RECEIVE_QUERY:
      return {
        ...state,
        corrected: action.corrected,
        didYouMean: action.didYouMean,
        related: action.related,
        rewrites: action.rewrites,
      };
    default:
      return state;
  }
}
