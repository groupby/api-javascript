import EventEmitter = require('eventemitter3');
import filterObject = require('filter-object');
import { Query, QueryConfiguration } from '../core/query';
import { BrowserBridge } from '../core/bridge';
import { Results, Navigation } from '../models/response';
import { Pager } from './pager';
import { SelectedValueRefinement, SelectedRangeRefinement, Sort } from '../models/request';

export namespace Events {
  export const RESULTS = 'results';
  export const REFINEMENTS_CHANGED = 'refinements_changed';
  export const PAGE_CHANGED = 'page_changed';
  export const RESET = 'reset';
  export const REWRITE_QUERY = 'rewrite_query';
  export const SORT = 'sort';
  export const DETAILS = 'details';
}

export { Pager };
export type FluxRefinement = SelectedValueRefinement | SelectedRangeRefinement;

export class FluxCapacitor extends EventEmitter {
  private originalQuery: string = '';
  query: Query;
  bridge: BrowserBridge;
  results: Results;

  constructor(endpoint: string, config: QueryConfiguration & any = {}, mask?: string) {
    super();
    this.bridge = new BrowserBridge(endpoint);
    this.query = new Query().withConfiguration(config, mask);
  }

  get page() {
    return new Pager(this);
  }

  search(query: string = this.originalQuery): Promise<Results> {
    return this.bridge.search(this.query.withQuery(query))
      .then(res => {
        this.results = res;
        this.originalQuery = query;
        this.emit(Events.RESULTS, res);
        return res;
      });
  }

  rewrite(query: string): Promise<string> {
    return this.search(query)
      .then(() => this.emit(Events.REWRITE_QUERY, query))
      .then(() => query);
  }

  reset(query: string = this.originalQuery): Promise<string> {
    this.query = new Query().withConfiguration(this.filteredRequest);
    this.emit(Events.PAGE_CHANGED, { pageIndex: 0, finalPage: this.page.finalPage })
    return this.search(query)
      .then(res => this.emit(Events.RESET, res))
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
      .then(res => {
        if (res.records.length) this.emit(Events.DETAILS, res.records[0]);
        return res;
      });
  }

  private get filteredRequest() {
    return filterObject(this.query.raw, '!{query,refinements,skip}');
  }

  private resetPaging(reset: boolean): Promise<Results> {
    return reset ? this.page.reset() : this.search();
  }

  private doRefinement(config: RefinementConfig): Promise<NavigationInfo> {
    return this.resetPaging(config.reset)
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
  available: Navigation[],
  selected: Navigation[]
}

export interface RefinementConfig {
  reset?: boolean;
  skipSearch?: boolean;
}
