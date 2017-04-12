import { Request } from '../models/request';
import { Results } from '../models/response';
import reducer from './reducer';
import * as redux from 'redux';

namespace Store {

  export interface State {
    data?: {
      search?: {
        req?: Request;
        res?: Results;
      };
      // sayt?: {};
      // recommendations?: {};
      // shoppingCart?: {};
    };
    ui?: {
      [tagName: string]: {
        [tagId: number]: any;
      };
    };
  }

  export function create() {
    return redux.createStore<State>(reducer);
  }
}

export default Store;
