import Actions from '../actions';
import Store from '../store';

export default function updateProducts(state: Store.Product[], action) {
  switch (action.type) {
    case Actions.RECEIVE_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
