import EventEmitter = require('eventemitter3');
import { Query } from '../core/query';
import { BrowserBridge } from '../core/bridge';
import { Results } from '../models/response';
import { Pager } from './pager';
import { SelectedValueRefinement, SelectedRangeRefinement } from '../models/request';

export namespace Events {
  export const RESULTS = 'results';
  export const REFINEMENTS_CHANGED = 'refinements_changed';
  export const RESET = 'reset';
}

export type FluxRefinement = SelectedValueRefinement | SelectedRangeRefinement;

export class FluxCapacitor extends EventEmitter {
  private originalQuery: string = '';
  query: Query;
  bridge: BrowserBridge;
  results: Results;

  constructor(endpoint: string, config: any = {}) {
    super();
    this.bridge = new BrowserBridge(endpoint);
    this.query = new Query().withConfiguration(config);
  }

  nextPage() {
    return new Pager(this).next();
  }

  lastPage() {
    return new Pager(this).last();
  }

  search(query: string = this.originalQuery) {
    return this.bridge.search(this.query.withQuery(query))
      .then(res => {
        this.results = res;
        this.originalQuery = query;
        this.emit(Events.RESULTS, res);
      });
  }

  reset(query: string = this.originalQuery) {
    this.query = new Query();
    return this.search(query)
      .then(() => this.emit(Events.RESET));
  }

  private resetPaging(reset: boolean): Promise<any> {
    return (reset ? new Pager(this).reset() : this.search());
  }

  refine(refinement: FluxRefinement, config: RefinementConfig = { reset: true }) {
    this.query.withSelectedRefinements(refinement);
    return this.doRefinement(config);
  }

  unrefine(refinement: FluxRefinement, config: RefinementConfig = { reset: true }) {
    this.query.withoutSelectedRefinements(refinement);
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
}
