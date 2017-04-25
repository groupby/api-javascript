import Actions from '../actions';
import Store from '../store';

export default function updateTemplate(state: Store.Template, action) {
  switch (action) {
    case Actions.RECEIVE_TEMPLATE:
      return action.template;
    default:
      return state;
  }
}
