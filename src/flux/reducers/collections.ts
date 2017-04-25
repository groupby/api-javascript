import Actions from '../actions';
import Store from '../store';

export default function updateCollections(state: Store.Indexed.Selectable<Store.Collection>, action) {
  switch (action) {
    case Actions.SELECT_COLLECTION:
      return { ...state, selected: action.id };
    case Actions.RECEIVE_COLLECTION_COUNT:
      const collection = action.collection;
      return {
        ...state,
        byId: {
          ...state.byId,
          [collection]: {
            ...state.byId[collection],
            total: action.count,
          },
        },
      };
    default:
      return state;
  }
}
