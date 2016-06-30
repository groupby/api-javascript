import EventEmitter = require('eventemitter3');
import { Query, QueryConfiguration } from '../core/query';
import { BrowserBridge } from '../core/bridge';
import { Results } from '../models/response';
import { Pager } from './pager';
import { SelectedValueRefinement, SelectedRangeRefinement } from '../models/request';

export namespace Events {
  export const RESULTS = 'results';
  export const REFINEMENTS_CHANGED = 'refinements_changed';
  export const RESET = 'reset';
  export const REWRITE_QUERY = 'rewrite_query';
}

export type FluxRefinement = SelectedValueRefinement | SelectedRangeRefinement;

export class FluxCapacitor extends EventEmitter {
  private originalQuery: string = '';
  query: Query;
  bridge: BrowserBridge;
  results: Results;

  constructor(endpoint: string, config: QueryConfiguration & any = {}) {
    super();
    this.bridge = new BrowserBridge(endpoint);
    this.query = new Query().withConfiguration(config);
  }

  get page() {
    return new Pager(this);
  }

  search(query: string = this.originalQuery) {
    return this.bridge.search(this.query.withQuery(query))
      .then(res => {
        this.results = res;
        this.originalQuery = query;
        this.emit(Events.RESULTS, res);
      });
  }

  rewrite(query: string) {
    return this.search(query)
      .then(() => this.emit(Events.REWRITE_QUERY, query));
  }

  reset(query: string = this.originalQuery) {
    this.query = new Query();
    return this.search(query)
      .then(() => this.emit(Events.RESET, this.results));
  }

  resize(pageSize: number, offset?: number) {
    this.query.withConfiguration({ pageSize });
    if (offset !== undefined) this.query.skip(offset);
    return this.search();
  }

  private resetPaging(reset: boolean): Promise<any> {
    return reset ? this.page.reset() : this.search();
  }

  refine(refinement: FluxRefinement, config: RefinementConfig = { reset: true }) {
    this.query.withSelectedRefinements(refinement);
    if (config.skipSearch) return Promise.resolve(true);
    return this.doRefinement(config);
  }

  unrefine(refinement: FluxRefinement, config: RefinementConfig = { reset: true }) {
    this.query.withoutSelectedRefinements(refinement);
    if (config.skipSearch) return Promise.resolve(true);
    return this.doRefinement(config);
  }

  private doRefinement(config: RefinementConfig) {
    return this.resetPaging(config.reset)
      .then(() => this.emit(Events.REFINEMENTS_CHANGED, this.navigationInfo));
  }

  private get navigationInfo() {
    return {
      available: this.results.availableNavigation,
      selected: this.results.selectedNavigation
    };
  }
}

export interface RefinementConfig {
  reset?: boolean;
  skipSearch?: boolean;
}
