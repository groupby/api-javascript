import * as EventEmitter from 'eventemitter3';
import * as redux from 'redux';
import filterObject = require('filter-object');
import { BrowserBridge } from '../core/bridge';
import { Query, QueryConfiguration } from '../core/query';
import { SelectedRangeRefinement, SelectedValueRefinement, Sort } from '../models/request';
import { Navigation, RefinementResults, Results } from '../models/response';
import { Pager } from './pager';

export namespace Events {
  export const QUERY_UPDATED = 'query_updated'; // mixed
  export const ORIGINAL_QUERY_UPDATED = 'original_query_updated'; // pre
  export const CORRECTED_QUERY_UPDATED = 'corrected_query_updated'; // post
  export const RELATED_QUERIES_UPDATED = 'related_queries_updated'; // post
  export const DID_YOU_MEANS_UPDATED = 'did_you_means_updated'; // post
  export const QUERY_REWRITES_UPDATED = 'query_rewrites_updated'; // post

  export const SORT_UPDATED = 'sort_updated'; // mixed

  export const PRODUCTS_UPDATED = 'products_updated'; // mixed

  export const COLLECTIONS_UPDATED = 'collections_updated'; // mixed
  export const COLLECTION_UPDATED = 'collection_updated'; // post

  export const NAVIGATIONS_UPDATED = 'navigations_updated'; // post

  export const AUTOCOMPLETE_QUERIES_UPDATED = 'autocomplete_queries_updated';
  export const AUTOCOMPLETE_CATEGORIES_UPDATED = 'autocomplete_categories_updated';
  export const AUTOCOMPLETE_PRODUCTS_UPDATED = 'autocomplete_products_updated';

  export const REDIRECT = 'redirect';
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
