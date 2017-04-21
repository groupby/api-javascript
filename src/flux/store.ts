import * as redux from 'redux';
import thunk from 'redux-thunk';
import { Request } from '../models/request';
import { Results } from '../models/response';
import reducer from './reducer';

namespace Store {

  export interface State {
    data?: {
      query: Query; // mixed

      sorts: Indexed<Sort>; // pre
      products: Indexed<Product>; // post
      collections: Indexed<Collection>; // mixed
      navigations: Indexed<Navigation>; // mixed

      autocomplete: Autocomplete; // mixed

      page: Page; // mixed

      template: Template; // post

      details: Details; // post

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
    label: string; // static
    total: number; // post
    selected?: boolean; // pre
  }

  export interface Sort {
    field: string;
    descending?: boolean;
  }

  export interface Page {
    /**
     * number of products per page
     */
    size: number; // pre

    /**
     * current page number
     */
    current: number; // post

    /**
     * number of next page
     */
    previous: number; // post
    /**
     * number of previous page
     */
    next: number; // post
    /**
     * number of first page
     */
    first: 1; // static
    /**
     * number of last page
     */
    last: number; // post

    /**
     * start of displayed products
     */
    fromResult: number; // post
    /**
     * end of displayed products
     */
    toResult: number; // post

    /**
     * displayed number range (in <gb-pages>)
     */
    range: number[]; // post
  }

  export interface Template {
    name: string;
    rule: string;
    zones: {
      [zoneName: string]: Zone;
    };
  }

  export type Zone = ContentZone | RichContentZone | RecordZone;

  export interface ContentZone {
    type: 'content';
    content: string;
  }

  export interface RichContentZone {
    type: 'rich_content';
    content: string;
  }

  export interface RecordZone {
    type: 'record';
    products: Product[];
  }

  export interface Details {
    product: Product;
  }

  export interface Product {
    id: string; // post
    [key: string]: any; // post
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

  export type Refinement = ValueRefinement | RangeRefinement;

  export interface ValueRefinement extends BaseRefinement {
    value: string; // post
  }

  export interface RangeRefinement extends BaseRefinement {
    low: number; // post
    high: number; // post
  }

  export interface Autocomplete {
    queries: string[]; // post
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
    return redux.createStore<State>(
      reducer,
      redux.applyMiddleware(thunk)
    );
  }
}

export default Store;
