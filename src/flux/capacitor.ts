
import { EventEmitter } from 'eventemitter3';
import * as redux from 'redux';
import { Sayt } from 'sayt';
import filterObject = require('filter-object');
import { BrowserBridge } from '../core/bridge';
import { Query, QueryConfiguration } from '../core/query';
import { Request, SelectedRangeRefinement, SelectedValueRefinement, Sort } from '../models/request';
import { Navigation, RefinementResults, Results } from '../models/response';
import { Actions } from './actions';
import Observer from './observer';
import Pager from './pager';
import Store from './store';

export namespace Events {
  // query events
  export const QUERY_UPDATED = 'query_updated'; // mixed
  export const ORIGINAL_QUERY_UPDATED = 'original_query_updated'; // pre
  export const CORRECTED_QUERY_UPDATED = 'corrected_query_updated'; // post
  export const RELATED_QUERIES_UPDATED = 'related_queries_updated'; // post
  export const DID_YOU_MEANS_UPDATED = 'did_you_means_updated'; // post
  export const QUERY_REWRITES_UPDATED = 'query_rewrites_updated'; // post

  // sort events
  export const SORTS_UPDATED = 'sorts_updated'; // mixed

  // product events
  export const PRODUCTS_UPDATED = 'products_updated'; // mixed

  // collection events
  export const COLLECTION_UPDATED = 'collection_updated'; // post
  export const SELECTED_COLLECTION_UPDATED = 'selected_collection_updated'; // post

  // navigation events
  export const NAVIGATIONS_UPDATED = 'navigations_updated'; // post
  export const SELECTED_REFINEMENTS_UPDATED = 'selected_refinements_updated'; // post

  // autocomplete events
  export const AUTOCOMPLETE_UPDATED = 'autocomplete_updated'; // post
  export const AUTOCOMPLETE_QUERY_UPDATED = 'autocomplete_query_updated'; // pre
  export const AUTOCOMPLETE_PRODUCTS_UPDATED = 'autocomplete_products_updated'; // post

  // template events
  export const TEMPLATE_UPDATED = 'template_updated'; // post

  // details events
  export const DETAILS_ID_UPDATED = 'details_id_updated'; // pre
  export const DETAILS_PRODUCT_UPDATED = 'details_product_updated'; // post

  // page events
  export const PAGE_UPDATED = 'page_updated'; // post
  export const PAGE_SIZE_UPDATED = 'page_size_updated'; // pre
  export const CURRENT_PAGE_UPDATED = 'current_page_updated'; // pre

  // record count event
  export const RECORD_COUNT_UPDATED = 'record_count_updated'; // post

  // recall event
  export const RECALL_CHANGED = 'recall_changed';

  // redirect event
  export const REDIRECT = 'redirect';

  // error events
  export const ERROR_BRIDGE = 'error:bridge';
}

export { Pager };
export type FluxRefinement = SelectedValueRefinement | SelectedRangeRefinement;

export interface FluxConfiguration {
  customerId: string;
  visitorId?: string;
  sessionId?: string;

  area?: string;
  language?: string;
  collection?: string | {
    options: string[];
    default: string;
  };

  autocomplete?: {
    area?: string;
    collection?: string;
    language?: string;
    category?: string;
    suggestionCount?: number;
    navigationCount?: number;
    productCount?: number;
    // map of field to label, also restricts displayed navigations
    navigations?: { [field: string]: string };
    defaults?: any;
    overrides?: any;
  };

  search?: {
    fields?: string[]; // should be auto-generated from structure
    pageSize?: number | {
      options: number[];
      default: number;
    };
    sort?: { field: string, descending?: boolean } | {
      options: Array<{
        label: string; // the problem with label being the key is multilingual
        field: string;
        descending?: boolean;
      }>;
      default: string; // label
    };
    defaults?: Request; // unhandled options
    overrides?: Request; // applied before request is sent
  };

  network?: FluxBridgeConfig;
}

export interface FluxBridgeConfig {
  headers?: { [key: string]: string };
  https?: boolean;
  timeout?: number;
  errorHandler?: (error: Error) => void;
  skipCache?: boolean;
  skipSemantish?: boolean;
}

export class FluxCapacitor extends EventEmitter {

  store: redux.Store<Store.State> = Store.create();
  actions: Actions;

  query: Query;
  bridge: BrowserBridge;
  sayt: Sayt;
  results: Results;
  originalQuery: string = '';

  constructor(config: FluxConfiguration) {
    super();

    this.store.subscribe(Observer.listen(this));

    const bridgeConfig: FluxBridgeConfig = config.network || {};
    this.bridge = new BrowserBridge(config.customerId, bridgeConfig.https, bridgeConfig);
    if (bridgeConfig.headers) {
      this.bridge.headers = bridgeConfig.headers;
    }
    this.bridge.errorHandler = (err) => {
      this.emit(Events.ERROR_BRIDGE, err);
      if (bridgeConfig.errorHandler) {
        bridgeConfig.errorHandler(err);
      }
    };

    this.sayt = new Sayt(<any>{
      autocomplete: { language: config.language },
      collection: config.collection,
      productSearch: { area: config.area },
      subdomain: config.customerId,
    });

    this.actions = new Actions(this, { search: '/search' });
  }

  search(query: string = this.originalQuery) {
    this.store.dispatch(this.actions.updateSearch({ query }));
  }

  refinements(navigationName: string) {
    this.store.dispatch(this.actions.fetchMoreRefinements(navigationName));
  }

  reset(query: string = null, { field: navigationId, index }: { field: string, index: number } = <any>{}) {
    this.store.dispatch(this.actions.updateSearch({ query, navigationId, index, clear: true }));
  }

  resize(pageSize: number) {
    this.store.dispatch(this.actions.updatePageSize(pageSize));
  }

  sort(label: string) {
    this.store.dispatch(this.actions.selectSort(label));
  }

  refine(navigationName: string, index: number) {
    this.store.dispatch(this.actions.selectRefinement(navigationName, index));
  }

  unrefine(navigationName: string, index: number) {
    this.store.dispatch(this.actions.deselectRefinement(navigationName, index));
  }

  details(id: string) {
    this.store.dispatch(this.actions.updateDetailsId(id));
  }

  switchCollection(collection: string) {
    this.store.dispatch(this.actions.selectCollection(collection));
  }

  countRecords(collection: string) {
    this.store.dispatch(this.actions.fetchCollectionCount(collection));
  }
}
