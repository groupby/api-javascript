import Actions from '../actions';
import Store from '../store';

export default function updateAutocomplete(state: Store.Autocomplete, action) {
  switch (action) {
    case Actions.UPDATE_AUTOCOMPLETE_QUERY:
      return { ...state, query: action.query };
    case Actions.RECEIVE_AUTOCOMPLETE_SUGGESTIONS:
      return {
        ...state,
        category: {
          ...state.category,
          values: action.categoryValues,
        },
        suggestions: action.suggestions,
      };
    default:
      return state;
  }
}
