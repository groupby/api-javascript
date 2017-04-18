import * as redux from 'redux';
import { Request } from '../models/request';
import { Results } from '../models/response';
import reducer from './reducer';

namespace Store {

  export interface State {
    data?: {
      query: Query;
      filter: Filter;
      sort: Sort[];
      products: Product[];
      collection: Indexed<Collection>;
      navigation: Indexed<Navigation>;

      autocomplete: Autocomplete;

      redirect?: string;

      errors: string[]; // convert from single string?
      warnings: string[];
    };
    ui?: {
      [tagName: string]: {
        [tagId: number]: any;
      };
    };
  }

  export interface Query {
    original: string;
    corrected?: string;
    related: Query.Related[];
    didYouMean: Query.DidYouMean[];
    rewrites: string[];
  }

  export namespace Query {
    export interface Related {
      value: string;
      url: string;
    }

    export interface DidYouMean {
      value: string;
      url: string;
    }
  }

  export interface Collection {
    name: string;
    total: number;
    selected?: boolean;
  }

  export interface Sort {
    field: string;
    descending?: boolean;
  }

  export interface Product {
    id: string;
    [key: string]: any;
  }

  export type Filter = { field: string; } & (
    {
      range: false;
      refinements: ValueRefinement[];
    } | {
      range: true;
      refinements: RangeRefinement[];
    }
  );

  export type Navigation = {
    field: string;
    label: string;
    sort?: Sort;
    or?: boolean;
  } & (
      {
        range: false;
        refinements: ValueRefinement[];
      } | {
        range: true;
        refinements: RangeRefinement[];
      }
    );

  export interface BaseRefinement {
    total: number;
    selected?: boolean;
  }

  export interface ValueRefinement extends BaseRefinement {
    value: string;
  }

  export interface RangeRefinement extends BaseRefinement {
    low: number;
    high: number;
  }

  export interface Autocomplete {
    query: string[];
    categories: Autocomplete.Category[];
    products: any[];
  }

  export namespace Autocomplete {
    export interface Category {
      field: string[];
      values: string[];
    }
  }

  export interface Indexed<T> {
    byId: { [key: string]: T };
    allIds: string[];
  }

  export function create() {
    return redux.createStore<State>(reducer);
  }
}

export default Store;
