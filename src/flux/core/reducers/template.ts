import { Actions, Store } from '..';

export type State = Store.Template;

export default function updateTemplate(state: State = null, action): State {
  switch (action.type) {
    case Actions.RECEIVE_TEMPLATE: return action.template;
    default: return state;
  }
}
