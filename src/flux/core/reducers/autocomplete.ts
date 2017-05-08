import { Actions, Store } from '..';
import Action = Actions.Autocomplete;

export type State = Store.Autocomplete;

export const DEFAULTS: State = {
  category: { values: [] },
  products: [],
  suggestions: [],
};

export default function updateAutocomplete(state: State = DEFAULTS, { type, payload }: Actions.Action<any>): State {
  switch (type) {
    case Actions.UPDATE_AUTOCOMPLETE_QUERY: return updateQuery(state, payload);
    case Actions.RECEIVE_AUTOCOMPLETE_SUGGESTIONS: return receiveSuggestions(state, payload);
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
