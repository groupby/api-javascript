import { EventEmitter } from 'eventemitter3';
import * as redux from 'redux';
import { Sayt } from 'sayt';
import filterObject = require('filter-object');
import { BrowserBridge } from '../core/bridge';
import { Query, QueryConfiguration } from '../core/query';
import { Request, SelectedRangeRefinement, SelectedValueRefinement, Sort } from '../models/request';
import { Navigation, RefinementResults, Results } from '../models/response';
import { ActionCreator, Store } from './core';
import * as Events from './events';
import Observer from './observer';
import Pager from './pager';

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
  actions: ActionCreator;

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

    this.actions = new ActionCreator(this, { search: '/search' });
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
