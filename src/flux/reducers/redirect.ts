import Actions from '../actions';
import Store from '../store';

export default function updateRedirect(state, action) {
  switch (action) {
    case Actions.RECEIVE_REDIRECT:
      return action.redirect;
    default:
      return state;
  }
}
