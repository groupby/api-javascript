import { EventEmitter } from 'eventemitter3';
import * as redux from 'redux';
import filterObject = require('filter-object');
import { BrowserBridge } from '../core/bridge';
import { Query, QueryConfiguration } from '../core/query';
import { SelectedRangeRefinement, SelectedValueRefinement, Sort } from '../models/request';
import { Navigation, RefinementResults, Results } from '../models/response';
import Actions from './actions';
import Observer from './observer';
import { Pager } from './pager';
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

  // redirect event
  export const REDIRECT = 'redirect';

  // error events
  export const ERROR_BRIDGE = 'error:bridge';
}

export { Pager };
export type FluxRefinement = SelectedValueRefinement | SelectedRangeRefinement;

export interface FluxConfiguration extends QueryConfiguration {
  bridge?: FluxBridgeConfig;
}

export interface FluxBridgeConfig {
  headers?: { [key: string]: string };
  https?: boolean;
  timeout?: number;
  errorHandler?: (error: Error) => void;
}

export class FluxCapacitor extends EventEmitter {

  store: redux.Store<Store.State> = Store.create();

  query: Query;
  bridge: BrowserBridge;
  results: Results;
  page: Pager;
  originalQuery: string = '';

  constructor(endpoint: string, config: FluxConfiguration = {}, mask?: string) {
    super();

    this.store.subscribe(Observer.listen(this));

    const bridgeConfig: FluxBridgeConfig = config.bridge || {};
    this.bridge = new BrowserBridge(endpoint, bridgeConfig.https, bridgeConfig);
    if (bridgeConfig.headers) {
      this.bridge.headers = bridgeConfig.headers;
    }
    this.bridge.errorHandler = (err) => {
      this.emit(Events.ERROR_BRIDGE, err);
      if (bridgeConfig.errorHandler) {
        bridgeConfig.errorHandler(err);
      }
    };

    this.query = new Query().withConfiguration(filterObject(config, ['*', '!{bridge}']), mask);
    this.page = new Pager(this);
  }

  // search(originalQuery: string = this.originalQuery): Promise<Results> {
  //   this.query.withQuery(originalQuery);
  //   this.emit(Events.SEARCH, this.query.raw);
  //   return this.bridge.search(this.query)
  //     .then((results) => {
  //       const oldQuery = this.originalQuery;
  //       Object.assign(this, { results, originalQuery });
  //
  //       if (results.redirect) {
  //         this.emit(Events.REDIRECT, results.redirect);
  //       }
  //       this.emit(Events.RESULTS, results);
  //       this.emitQueryChanged(oldQuery, originalQuery);
  //
  //       return results;
  //     });
  // }

  search(query: string = this.originalQuery) {
    this.store.dispatch(Actions.updateSearch({ query }));
  }

  // TODO: update to store implementation
  refinements(navigationName: string): Promise<RefinementResults> {
    return this.bridge.refinements(this.query, navigationName)
      .then((results) => {
        this.emit(Events.REFINEMENT_RESULTS, results);
        return results;
      });
  }

  // resetRecall() {
  //   this.query = new Query().withConfiguration(this.filteredRequest);
  // }

  // reset(query: string = this.originalQuery): Promise<string> {
  //   this.resetRecall();
  //   this.emit(Events.PAGE_CHANGED, { pageNumber: 1 });
  //   return this.search(query)
  //     .then((res) => this.emit(Events.RESET, res))
  //     .then(() => query);
  // }

  reset(query: string = null, refinements: any[] = []) {
    this.store.dispatch(Actions.updateSearch({ query, refinements, clear: true }));
  }

  // resize(pageSize: number, resetOffset?: boolean): Promise<Results> {
  //   this.query.withPageSize(pageSize);
  //   if (resetOffset) {
  //     return this.page.switchPage(1);
  //   } else {
  //     const total = this.page.restrictTotalRecords(this.page.fromResult, pageSize);
  //     const page = this.page.getPage(total);
  //     return this.page.switchPage(page);
  //   }
  // }

  resize(pageSize: number) {
    this.store.dispatch(Actions.updatePageSize(pageSize));
  }

  // sort(sort: Sort, clearSorts: Sort[] = [sort]): Promise<Results> {
  //   this.query.withoutSorts(...clearSorts).withSorts(sort);
  //   return this.page.reset()
  //     .then((res) => {
  //       this.emit(Events.SORT, this.query.raw.sort);
  //       return res;
  //     });
  // }

  sort(sort: Store.Sort | Store.Sort[]) {
    this.store.dispatch(Actions.updateSorts(sort));
  }

  // refine(refinement: FluxRefinement, config: RefinementConfig = { reset: true }): Promise<NavigationInfo> {
  //   this.query.withSelectedRefinements(refinement);
  //   if (config.skipSearch) {
  //     return Promise.resolve(this.navigationInfo);
  //   }
  //   return this.doRefinement(config);
  // }

  refine(navigationName: string, index: number) {
    this.store.dispatch(Actions.selectRefinement(navigationName, index));
  }

  // unrefine(refinement: FluxRefinement, config: RefinementConfig = { reset: true }): Promise<NavigationInfo> {
  //   this.query.withoutSelectedRefinements(refinement);
  //   if (config.skipSearch) {
  //     return Promise.resolve(this.navigationInfo);
  //   }
  //   return this.doRefinement(config);
  // }

  unrefine(navigationName: string, index: number) {
    this.store.dispatch(Actions.deselectRefinement(navigationName, index));
  }

  details(id: string) {
    this.store.dispatch(Actions.updateDetailsId(id));
  }

  // switchCollection(collection: string): Promise<Results> {
  //   this.query.withConfiguration(<any>{ collection, refinements: [], sort: [], skip: 0 });
  //   return this.search()
  //     .then((res) => {
  //       this.emit(Events.COLLECTION_CHANGED, collection);
  //       return res;
  //     });
  // }

  switchCollection(collection: string) {
    this.store.dispatch(Actions.selectCollection(collection));
  }

  // private emitQueryChanged(oldQuery: string, newQuery: string) {
  //   if (oldQuery.toLowerCase() !== newQuery.toLowerCase()) {
  //     this.emit(Events.QUERY_CHANGED, newQuery);
  //   }
  // }
  //
  // private get filteredRequest() {
  //   return filterObject(this.query.raw, '!{query,refinements,skip}');
  // }
  //
  // private resetPaging(reset: boolean): Promise<Results> {
  //   return reset ? this.page.reset() : this.search();
  // }
  //
  // private doRefinement({ reset }: RefinementConfig): Promise<NavigationInfo> {
  //   return this.resetPaging(reset)
  //     .then(() => this.emit(Events.REFINEMENTS_CHANGED, this.navigationInfo))
  //     .then(() => this.navigationInfo);
  // }
  //
  // private get navigationInfo(): NavigationInfo {
  //   return {
  //     available: this.results.availableNavigation,
  //     selected: this.results.selectedNavigation,
  //   };
  // }
}
