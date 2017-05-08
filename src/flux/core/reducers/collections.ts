import { Actions, Store } from '..';
import Action = Actions.Collections;

export type State = Store.Indexed.Selectable<Store.Collection>;

export const DEFAULTS: State = {
  allIds: [],
  byId: {},
};

export default function updateCollections(state: State = DEFAULTS, action): State {
  switch (action.type) {
    case Actions.SELECT_COLLECTION: return updateSelected(state, action.payload);
    case Actions.RECEIVE_COLLECTION_COUNT: return receiveCount(state, action.payload);
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
