import Actions from '../actions';
import Store from '../store';
import Action = Actions.Collections;

export type State = Store.Indexed.Selectable<Store.Collection>;

export default function updateCollections(state: State, action): State {
  switch (action.type) {
    case Actions.SELECT_COLLECTION: return updateSelected(state, action);
    case Actions.RECEIVE_COLLECTION_COUNT: return receiveCount(state, action);
    default: return state;
  }
}

export const updateSelected = (state: State, { id: selected }: Action.SelectCollection) =>
  ({ ...state, selected });

export const receiveCount = (state: State, { collection, count: total }: Action.ReceiveCount) =>
  ({
    ...state,
    byId: {
      ...state.byId,
      [collection]: { ...state.byId[collection], total },
    },
  });
