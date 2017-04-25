import * as redux from 'redux';
import thunk from 'redux-thunk';
import { Request } from '../models/request';
import { Results } from '../models/response';
import reducer from './reducer';

namespace Store {

  export interface State {
    data?: {
      query: Query; // mixed

      recordCount: number; // post
      sorts: Indexed.Selectable<Sort.Labelled>; // pre
      products: Product[]; // post
      collections: Indexed.Selectable<Collection>; // mixed
      navigations: Indexed<Navigation>; // mixed

      autocomplete: Autocomplete; // mixed

      page: Page; // mixed

      template: Template; // post

      details: Details; // mixed

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
    export type Related = Linkable;
    export type DidYouMean = Linkable;
  }

  export interface Collection {
    name: string; // static
    label: string; // static
    total: number; // post
  }

  export interface Sort {
    field: string;
    descending?: boolean;
  }

  export namespace Sort {
    export interface Labelled extends Sort {
      label: string;
    }
  }

  export interface Page {
    /**
     * number of products per page
     */
    size: number; // pre

    /**
     * current page number
     */
    current: number; // pre

    /**
     * number of first page
     */
    first: 1; // static
    /**
     * maximum number of page numbers to display
     */
    limit: number; // static

    /**
     * number of next page
     */
    previous: number; // post
    /**
     * number of previous page
     */
    next: number; // post
    /**
     * number of last page
     */
    last: number; // post

    /**
     * start of displayed products
     */
    from: number; // post
    /**
     * end of displayed products
     */
    to: number; // post

    /**
     * the total number of products returned by this search
     */
    total: number; // post

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

  export namespace Zone {
    export type Type = 'content' | 'rich_content' | 'record';

    export namespace Type {
      export const CONTENT = 'content';
      export const RICH_CONTENT = 'rich_content';
      export const RECORD = 'record';
    }
  }

  export interface BaseZone {
    name: string;
    type: Zone.Type;
  }

  export interface ContentZone extends BaseZone {
    type: 'content';
    content: string;
  }

  export interface RichContentZone extends BaseZone {
    type: 'rich_content';
    content: string;
  }

  export interface RecordZone extends BaseZone {
    type: 'record';
    products: Product[];
  }

  export interface Details {
    id: string; // pre
    product: Product; // post
  }

  export interface Product {
    id: string; // post
    [key: string]: any; // post
  }

  export interface Navigation {
    field: string; // post
    label: string; // post
    more?: boolean; // post
    range?: boolean; // post
    or?: boolean; // post
    selected: number[]; // pre
    refinements: Array<ValueRefinement | RangeRefinement>; // post
    sort?: Sort; // post
  }

  export interface BaseRefinement {
    total: number; // post
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
    query: string; // pre
    suggestions: string[]; // post
    category: Autocomplete.Category; // static & post
    products: Product[]; // post
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

  export namespace Indexed {
    export interface Selectable<T> extends Indexed<T> {
      selected: string;
    }
  }

  export interface Linkable {
    value: string; // post
    url: string; // post (generated)
  }

  export function create() {
    return redux.createStore<State>(
      reducer,
      {},
      redux.applyMiddleware(thunk),
    );
  }
}

export default Store;
