import { BrowserBridge } from '../core/bridge';
import { Query, QueryConfiguration } from '../core/query';
import { SelectedRangeRefinement, SelectedValueRefinement, Sort } from '../models/request';
import { Navigation, RefinementResults, Results } from '../models/response';
import { Pager } from './pager';
import EventEmitter = require('eventemitter3');
import filterObject = require('filter-object');

export namespace Events {
  export const SEARCH = 'search';
  export const RESULTS = 'results';
  export const REFINEMENT_RESULTS = 'refinement_results';
  export const REFINEMENTS_CHANGED = 'refinements_changed';
  export const PAGE_CHANGED = 'page_changed';
  export const QUERY_CHANGED = 'query_changed';
  export const RESET = 'reset';
  export const REWRITE_QUERY = 'rewrite_query';
  export const SORT = 'sort';
  export const DETAILS = 'details';
  export const REDIRECT = 'redirect';
}

export { Pager };
export type FluxRefinement = SelectedValueRefinement | SelectedRangeRefinement;

export interface FluxConfiguration extends QueryConfiguration {
  bridge?: {
    headers?: any;
    https?: boolean;
    timeout?: number;
  };
}

export class FluxCapacitor extends EventEmitter {

  query: Query;
  bridge: BrowserBridge;
  results: Results;
  page: Pager;
  private originalQuery: string = '';

  constructor(endpoint: string, config: FluxConfiguration = {}, mask?: string) {
    super();

    const bridgeConfig = config.bridge || {};
    this.bridge = new BrowserBridge(endpoint, bridgeConfig.https, bridgeConfig);
    if (bridgeConfig.headers) this.bridge.headers = bridgeConfig.headers;

    this.query = new Query().withConfiguration(filterObject(config, ['*', '!{bridge}']), mask);
    this.page = new Pager(this);
  }

  search(originalQuery: string = this.originalQuery): Promise<Results> {
    this.query.withQuery(originalQuery);
    this.emit(Events.SEARCH, this.query.raw);
    return this.bridge.search(this.query)
      .then((results) => {
        if (results.redirect) this.emit(Events.REDIRECT, results.redirect);
        this.emitQueryChanged(originalQuery);

        // must be in this order
        Object.assign(this, { results, originalQuery });
        this.emit(Events.RESULTS, results);

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
    let search;
    if (config.skipSearch) {
      this.emitQueryChanged(query);
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

  resize(pageSize: number, offset?: number): Promise<number> {
    this.query.withConfiguration({ pageSize });
    if (offset !== undefined) {
      this.query.skip(offset - 1);
      this.emit(Events.PAGE_CHANGED, { pageNumber: this.page.currentPage });
    }
    return this.search()
      .then(() => pageSize);
  }

  sort(sort: Sort, clearSorts: Sort[] = [sort]): Promise<Results> {
    this.query.withoutSorts(...clearSorts).withSorts(sort);
    return this.page.reset();
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

  details(id: string): Promise<Results> {
    return this.bridge.search(new Query()
      .withConfiguration(this.query.raw, '{area,collection,language,fields}')
      .withSelectedRefinements({ navigationName: 'id', type: 'Value', value: id }))
      .then((res) => {
        if (res.records.length) this.emit(Events.DETAILS, res.records[0]);
        return res;
      });
  }

  switchCollection(collection: string): Promise<Results> {
    this.query.withConfiguration(<any>{ collection, refinements: [], sort: [], skip: 0 });
    return this.search();
  }

  private emitQueryChanged(query: string) {
    if (query !== this.originalQuery) this.emit(Events.QUERY_CHANGED);
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
