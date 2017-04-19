import * as EventEmitter from 'eventemitter3';
import * as redux from 'redux';
import filterObject = require('filter-object');
import { BrowserBridge } from '../core/bridge';
import { Query, QueryConfiguration } from '../core/query';
import { SelectedRangeRefinement, SelectedValueRefinement, Sort } from '../models/request';
import { Navigation, RefinementResults, Results } from '../models/response';
import { Pager } from './pager';

export namespace Events {
  export const COLLECTION_CHANGED = 'collection_changed';
  export const DETAILS = 'details';
  export const ERROR_BRIDGE = 'error:bridge';
  export const PAGE_CHANGED = 'page_changed';
  export const QUERY_CHANGED = 'query_changed';
  export const REDIRECT = 'redirect';
  export const REFINEMENT_RESULTS = 'refinement_results';
  export const REFINEMENTS_CHANGED = 'refinements_changed';
  export const RESET = 'reset';
  export const RESULTS = 'results';
  export const REWRITE_QUERY = 'rewrite_query';
  export const SEARCH = 'search';
  export const SORT = 'sort';

  export const QUERY_UPDATED = 'query_updated'; // mixed
  export const ORIGINAL_QUERY_UPDATED = 'original_query_updated'; // pre
  export const CORRECTED_QUERY_UPDATED = 'corrected_query_updated'; // post
  export const RELATED_QUERIES_UPDATED = 'related_queries_updated'; // post
  export const DID_YOU_MEANS_UPDATED = 'did_you_means_updated'; // post
  export const QUERY_REWRITES_UPDATED = 'query_rewrites_updated'; // post

  export const FILTER_UPDATED = 'filter_updated'; // mixed

  export const SORT_UPDATED = 'sort_updated'; // mixed

  export const PRODUCTS_UPDATED = 'products_updated'; // mixed

  // post-request

  // request
  export const SEARCH_REQ_UPDATED = 'search:req_updated';
  export const SEARCH_COLLECTION_UPDATED = 'search:req:collection_updated';
  export const SEARCH_PAGE_UPDATED = 'search:req:page_updated';
  export const SEARCH_QUERY_UPDATED = 'search:req:query_updated';
  export const SEARCH_REFINEMENTS_UPDATED = 'search:req:refinements_updated';
  export const SEARCH_SORT_UPDATED = 'search:req:sort_updated';

  // response
  export const SEARCH_RES_UPDATED = 'search:res_updated';

  // "global"
  export const SEARCH_REDIRECT = 'search:res:redirect';
  export const SEARCH_DETAILS = 'search:res:details';
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

  store: redux.Store<any>;

  query: Query;
  bridge: BrowserBridge;
  results: Results;
  page: Pager;
  private originalQuery: string = '';

  constructor(endpoint: string, config: FluxConfiguration = {}, mask?: string) {
    super();

    const bridgeConfig: FluxBridgeConfig = config.bridge || {};
    this.bridge = new BrowserBridge(endpoint, bridgeConfig.https, bridgeConfig);
    if (bridgeConfig.headers) this.bridge.headers = bridgeConfig.headers;
    this.bridge.errorHandler = (err) => {
      this.emit(Events.ERROR_BRIDGE, err);
      if (bridgeConfig.errorHandler) bridgeConfig.errorHandler(err);
    };

    this.query = new Query().withConfiguration(filterObject(config, ['*', '!{bridge}']), mask);
    this.page = new Pager(this);
  }

  search(originalQuery: string = this.originalQuery): Promise<Results> {
    this.query.withQuery(originalQuery);
    this.emit(Events.SEARCH, this.query.raw);
    return this.bridge.search(this.query)
      .then((results) => {
        const oldQuery = this.originalQuery;
        Object.assign(this, { results, originalQuery });

        if (results.redirect) {
          this.emit(Events.REDIRECT, results.redirect);
        }
        this.emit(Events.RESULTS, results);
        this.emitQueryChanged(oldQuery, originalQuery);

        return results;
      });
  }

  refinements(navigationName: string): Promise<RefinementResults> {
    return this.bridge.refinements(this.query, navigationName)
      .then((results) => {
        this.emit(Events.REFINEMENT_RESULTS, results);
        return results;
      });
  }

  rewrite(query: string, config: RewriteConfig = {}): Promise<string> {
    let search: Promise<any>;
    if (config.skipSearch) {
      this.emitQueryChanged(this.originalQuery, query);
      search = Promise.resolve(this.query.withQuery(this.originalQuery = query));
    } else {
      search = this.search(query);
    }
    return search.then(() => this.emit(Events.REWRITE_QUERY, query))
      .then(() => query);
  }

  resetRecall() {
    this.query = new Query().withConfiguration(this.filteredRequest);
  }

  reset(query: string = this.originalQuery): Promise<string> {
    this.resetRecall();
    this.emit(Events.PAGE_CHANGED, { pageNumber: 1 });
    return this.search(query)
      .then((res) => this.emit(Events.RESET, res))
      .then(() => query);
  }

  resize(pageSize: number, resetOffset?: boolean): Promise<Results> {
    this.query.withPageSize(pageSize);
    if (resetOffset) {
      return this.page.switchPage(1);
    } else {
      const total = this.page.restrictTotalRecords(this.page.fromResult, pageSize);
      const page = this.page.getPage(total);
      return this.page.switchPage(page);
    }
  }

  sort(sort: Sort, clearSorts: Sort[] = [sort]): Promise<Results> {
    this.query.withoutSorts(...clearSorts).withSorts(sort);
    return this.page.reset()
      .then((res) => {
        this.emit(Events.SORT, this.query.raw.sort);
        return res;
      });
  }

  refine(refinement: FluxRefinement, config: RefinementConfig = { reset: true }): Promise<NavigationInfo> {
    this.query.withSelectedRefinements(refinement);
    if (config.skipSearch) return Promise.resolve(this.navigationInfo);
    return this.doRefinement(config);
  }

  unrefine(refinement: FluxRefinement, config: RefinementConfig = { reset: true }): Promise<NavigationInfo> {
    this.query.withoutSelectedRefinements(refinement);
    if (config.skipSearch) return Promise.resolve(this.navigationInfo);
    return this.doRefinement(config);
  }

  details(id: string, navigationName: string = 'id'): Promise<Results> {
    return this.bridge.search(new Query()
      .withConfiguration(this.query.raw, '{area,collection,language,fields}')
      .withSelectedRefinements({ type: 'Value', navigationName, value: id })
      .withPageSize(1))
      .then((res) => {
        if (res.records.length) this.emit(Events.DETAILS, res.records[0]);
        return res;
      });
  }

  switchCollection(collection: string): Promise<Results> {
    this.query.withConfiguration(<any>{ collection, refinements: [], sort: [], skip: 0 });
    return this.search()
      .then((res) => {
        this.emit(Events.COLLECTION_CHANGED, collection);
        return res;
      });
  }

  private emitQueryChanged(oldQuery: string, newQuery: string) {
    if (oldQuery.toLowerCase() !== newQuery.toLowerCase()) {
      this.emit(Events.QUERY_CHANGED, newQuery);
    }
  }

  private get filteredRequest() {
    return filterObject(this.query.raw, '!{query,refinements,skip}');
  }

  private resetPaging(reset: boolean): Promise<Results> {
    return reset ? this.page.reset() : this.search();
  }

  private doRefinement({ reset }: RefinementConfig): Promise<NavigationInfo> {
    return this.resetPaging(reset)
      .then(() => this.emit(Events.REFINEMENTS_CHANGED, this.navigationInfo))
      .then(() => this.navigationInfo);
  }

  private get navigationInfo(): NavigationInfo {
    return {
      available: this.results.availableNavigation,
      selected: this.results.selectedNavigation
    };
  }
}

export interface NavigationInfo {
  available: Navigation[];
  selected: Navigation[];
}

export interface RefinementConfig {
  reset?: boolean;
  skipSearch?: boolean;
}

export interface RewriteConfig {
  skipSearch?: boolean;
}
