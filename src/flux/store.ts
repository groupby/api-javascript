import * as redux from 'redux';
import { Request } from '../models/request';
import { Results } from '../models/response';
import reducer from './reducer';

namespace Store {

  export interface State {
    data?: {
      query: Query; // mixed
      filter: Filter; // mixed
      sort: Sort[]; // pre
      products: Product[]; // post
      collection: Indexed<Collection>; // mixed
      navigation: Indexed<Navigation>; // mixed

      autocomplete: Autocomplete; // mixed

      redirect?: string; // post

      errors: string[]; // post
      warnings: string[]; // post
    };
    ui?: {
      [tagName: string]: {
        [tagId: number]: any;
      };
    };
  }

  export interface Query {
    original: string; // pre
    corrected?: string; // post
    related: Query.Related[]; // post
    didYouMean: Query.DidYouMean[]; // post
    rewrites: string[]; // post
  }

  export namespace Query {
    export interface Related {
      value: string; // post
      url: string; // post (generated)
    }

    export interface DidYouMean {
      value: string; // post
      url: string; // post (generated)
    }
  }

  export interface Collection {
    name: string; // static
    total: number; // post
    selected?: boolean; // pre
  }

  export interface Sort {
    field: string;
    descending?: boolean;
  }

  export interface Product {
    id: string; // post
    [key: string]: any; // post
  }

  export type Filter = ValueFilter | RangeFilter;

  export interface BaseFilter {
    field: string; // static
  }

  export interface ValueFilter extends BaseFilter {
    range?: false; // post
    refinements: ValueRefinement[]; // post
  }

  export interface RangeFilter extends BaseFilter {
    range: true; // post
    refinements: RangeRefinement[]; // post
  }

  export type Navigation = ValueNavigation | RangeNavigation;

  export interface BaseNavigation {
    field: string; // post
    label: string; // post
    or?: boolean; // post
    sort?: Sort; // post
  }

  export interface ValueNavigation extends BaseNavigation {
    range?: false; // post
    refinements: ValueRefinement[]; // post
  }

  export interface RangeNavigation extends BaseNavigation {
    range: true; // post
    refinements: RangeRefinement[]; // post
  }

  export interface BaseRefinement {
    total: number; // post
    selected?: boolean; // pre
  }

  export interface ValueRefinement extends BaseRefinement {
    value: string; // post
  }

  export interface RangeRefinement extends BaseRefinement {
    low: number; // post
    high: number; // post
  }

  export interface Autocomplete {
    query: string[]; // post
    categories: Indexed<Autocomplete.Category>; // static & post
    products: any[]; // post
  }

  export namespace Autocomplete {
    export interface Category {
      field: string; // static
      values: string[]; // post
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
