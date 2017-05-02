import Actions from '../actions';
import Store from '../store';
import Action = Actions.Autocomplete;

export type State = Store.Autocomplete;

export default function updateAutocomplete(state: State, action): State {
  switch (action.type) {
    case Actions.UPDATE_AUTOCOMPLETE_QUERY: return updateQuery(state, action);
    case Actions.RECEIVE_AUTOCOMPLETE_SUGGESTIONS: return receiveSuggestions(state, action);
    default: return state;
  }
}

export const updateQuery = (state: State, { query }: Action.UpdateQuery) =>
  ({ ...state, query });

export const receiveSuggestions = (state: State, { categoryValues, suggestions }: Action.ReceiveSuggestions) =>
  ({
    ...state,
    category: {
      ...state.category,
      values: categoryValues,
    },
    suggestions,
  });
