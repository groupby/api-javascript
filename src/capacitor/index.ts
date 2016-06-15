import EventEmitter = require('eventemitter3');
import { Query } from '../core/query';
import { BrowserBridge } from '../core/bridge';
import { Results } from '../models/response';
import { Pager } from './pager';
import { SelectedValueRefinement, SelectedRangeRefinement } from '../models/request';

export namespace Events {
  export const RESULTS = 'results';
  export const REFINEMENTS_CHANGED = 'refinements_changed';
  export const PAGE_CHANGED = 'page_changed';
  export const RESET = 'reset';
}

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
    return new Pager(this).next()
      .then(() => this.emit(Events.PAGE_CHANGED));
  }

  lastPage() {
    return new Pager(this).last()
      .then(() => this.emit(Events.PAGE_CHANGED));
  }

  search(query: string = this.originalQuery) {
    return this.bridge.search(this.query.withQuery(query))
      .then(res => {
        this.results = res;
        this.originalQuery = query;
        this.emit(Events.RESULTS, res);
      });
  }

  reset() {
    this.query = new Query(this.originalQuery);
    return this.search()
      .then(() => this.emit(Events.RESET));
  }

  refine(refinement: SelectedValueRefinement | SelectedRangeRefinement) {
    this.query.withSelectedRefinements(refinement);
    return this.search()
      .then(() => this.emit(Events.REFINEMENTS_CHANGED, this.navigationInfo));
  }

  unrefine(refinement: SelectedValueRefinement | SelectedRangeRefinement) {
    this.query.withoutSelectedRefinements(refinement);
    return this.search()
      .then(() => this.emit(Events.REFINEMENTS_CHANGED, this.navigationInfo));
  }

  private get navigationInfo() {
    return {
      available: this.results.availableNavigation,
      selected: this.results.selectedNavigation
    };
  }
}
