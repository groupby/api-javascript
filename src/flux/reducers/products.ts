import Actions from '../actions';
import Store from '../store';

export default function updateProducts(state: Store.Product, action) {
  switch (action) {
    // case Actions.UPDATE_PRODUCTS:
    //   return { ...state };
    default:
      return state;
  }
}
