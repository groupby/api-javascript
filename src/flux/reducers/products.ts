import Actions from '../actions';
import Store from '../store';

export type State = Store.Product[];

export default function updateProducts(state: State, action) {
  switch (action.type) {
    case Actions.RECEIVE_PRODUCTS: return action.products;
    default: return state;
  }
}
