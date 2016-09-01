import { BrowserBridge } from '../core/bridge';
import { Query, QueryConfiguration } from '../core/query';
import { SelectedRangeRefinement, SelectedValueRefinement, Sort } from '../models/request';
import { Navigation, Results } from '../models/response';
import { Pager } from './pager';
import EventEmitter = require('eventemitter3');
import filterObject = require('filter-object');
import deepEqual = require('deep-equal');

export namespace Events {
  export const SEARCH = 'search';
  export const RESULTS = 'results';
  export const REFINEMENTS_CHANGED = 'refinements_changed';
  export const PAGE_CHANGED = 'page_changed';
  export const REQUEST_CHANGED = 'request_changed';
  export const RESET = 'reset';
  export const REWRITE_QUERY = 'rewrite_query';
  export const SORT = 'sort';
  export const DETAILS = 'details';
  export const REDIRECT = 'redirect';
}

export { Pager };
export type FluxRefinement = SelectedValueRefinement | SelectedRangeRefinement;

export interface FluxConfiguration extends QueryConfiguration {
  headers: any;
  https: boolean;
}

export class FluxCapacitor extends EventEmitter {

  query: Query;
  bridge: BrowserBridge;
  results: Results;
  private originalQuery: string = '';
  private originalRefinements: any[] = [];

  constructor(endpoint: string, config: FluxConfiguration & any = {}, mask?: string) {
    super();
    this.bridge = new BrowserBridge(endpoint, config.https);
    if (config.headers) this.bridge.headers = config.headers;
    this.query = new Query().withConfiguration(filterObject(config, ['*', '!{headers,https}']), mask);
  }

  get page() {
    return new Pager(this);
  }

  search(originalQuery: string = this.originalQuery): Promise<Results> {
    this.query.withQuery(originalQuery);
    this.emit(Events.SEARCH, this.query.raw);
    return this.bridge.search(this.query)
      .then((results) => {
        if (results.redirect) this.emit(Events.REDIRECT, results.redirect);
        const originalRefinements = this.query.raw.refinements;
        this.testForChange(originalQuery, originalRefinements);
        Object.assign(this, { results, originalQuery, originalRefinements });
        this.emit(Events.RESULTS, results);
        return results;
      });
  }

  rewrite(query: string, config: RewriteConfig = {}): Promise<string> {
    let search;
    if (config.skipSearch) {
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
    this.emit(Events.PAGE_CHANGED, { pageIndex: 0, finalPage: this.page.finalPage });
    return this.search(query)
      .then((res) => this.emit(Events.RESET, res))
      .then(() => query);
  }

  resize(pageSize: number, offset?: number): Promise<number> {
    this.query.withConfiguration({ pageSize });
    if (offset !== undefined) {
      this.query.skip(offset);
      this.emit(Events.PAGE_CHANGED, { pageIndex: this.page.pageFromOffset(offset), lastPage: this.page.finalPage });
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
      .withConfiguration(filterObject(this.query.raw, '{area,collection,language,fields}'))
      .withSelectedRefinements({ navigationName: 'id', type: 'Value', value: id }))
      .then((res) => {
        if (res.records.length) this.emit(Events.DETAILS, res.records[0]);
        return res;
      });
  }

  switchCollection(collection: string): Promise<Results> {
    this.query.withConfiguration({ collection });
    return this.search();
  }

  private testForChange(query: string, refinements: any[]) {
    if (query !== this.originalQuery || !deepEqual(refinements, this.originalRefinements)) {
      this.emit(Events.REQUEST_CHANGED);
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
