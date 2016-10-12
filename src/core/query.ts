import {
  Biasing,
  MatchStrategy,
  Request,
  RestrictNavigation,
  SelectedRangeRefinement,
  SelectedRefinement,
  SelectedValueRefinement,
  Sort
} from '../models/request';
import {
  Navigation,
  RangeRefinement,
  Refinement,
  ValueRefinement
} from '../models/response';
import { NavigationConverter } from '../utils/converter';
import * as clone from 'clone';
import * as deepEqual from 'deep-equal';
import filterObject = require('filter-object');
import * as qs from 'qs';

const REFINEMENT_MASK = '{navigationName,value,low,high}';

export interface QueryConfiguration {
  userId?: string;
  language?: string;
  collection?: string;
  area?: string;
  biasingProfile?: string;
  pageSize?: number;
  fields?: string | string[];
}

export class Query {

  queryParams: any;
  private request: Request;
  private unprocessedNavigations: Navigation[];

  constructor(query: string = '') {
    this.request = <Request>{};
    this.unprocessedNavigations = [];
    this.queryParams = {};

    this.request.query = query;
    this.request.sort = [];
    this.request.fields = [];
    this.request.orFields = [];
    this.request.refinements = [];
    this.request.includedNavigations = [];
    this.request.excludedNavigations = [];

    this.request.wildcardSearchEnabled = false;
    this.request.pruneRefinements = true;
  }

  withQuery(query: string): Query {
    this.request.query = query;
    return this;
  }

  withConfiguration(configuration: QueryConfiguration, mask: string = '*'): Query {
    Object.assign(this.request, filterObject(configuration, mask));
    return this;
  }

  withSelectedRefinements(...refinements: Array<SelectedValueRefinement | SelectedRangeRefinement>): Query {
    refinements.forEach((ref) => this.addRefinement(ref, this.request.refinements));
    return this;
  }

  withoutSelectedRefinements(...refinements: Array<SelectedValueRefinement | SelectedRangeRefinement>): Query {
    refinements.forEach((refinement) => {
      const index = this.request.refinements.findIndex((ref) => deepEqual(ref, refinement));
      if (index > -1) this.request.refinements.splice(index, 1);
    });
    return this;
  }

  withRefinements(navigationName: string, ...refinements: Array<ValueRefinement | RangeRefinement>): Query {
    const convert = (refinement: Refinement) => Object.assign(refinement, { navigationName });
    refinements.map(convert).forEach((ref) => this.addRefinement(ref, this.request.refinements));
    return this;
  }

  withNavigations(...navigations: Navigation[]): Query {
    this.unprocessedNavigations.push(...navigations);
    return this;
  }

  withFields(...fields: string[]): Query {
    this.request.fields.push(...fields);
    return this;
  }

  withOrFields(...orFields: string[]): Query {
    this.request.orFields.push(...orFields);
    return this;
  }

  withSorts(...sorts: Sort[]): Query {
    this.request.sort.push(...sorts);
    return this;
  }

  withoutSorts(...sorts: Sort[]): Query {
    this.request.sort = this.request.sort.filter((oldSort) => !sorts.find((sort) => sort.field === oldSort.field));
    return this;
  }

  withIncludedNavigations(...navigationNames: string[]): Query {
    this.request.includedNavigations.push(...navigationNames);
    return this;
  }

  withExcludedNavigations(...navigationNames: string[]): Query {
    this.request.excludedNavigations.push(...navigationNames);
    return this;
  }

  withQueryParams(queryParams: any | string): Query {
    switch (typeof queryParams) {
      case 'string':
        return Object.assign(this, { queryParams: this.convertQueryString(<string>queryParams) });
      case 'object':
        return Object.assign(this, { queryParams });
    }
  }

  refineByValue(navigationName: string, value: string, exclude: boolean = false): Query {
    return this.withSelectedRefinements(<SelectedValueRefinement>{
      navigationName,
      value,
      exclude,
      type: 'Value'
    });
  }

  refineByRange(navigationName: string, low: number, high: number, exclude: boolean = false): Query {
    return this.withSelectedRefinements(<SelectedRangeRefinement>{
      navigationName,
      low,
      high,
      exclude,
      type: 'Range'
    });
  }

  restrictNavigation(restrictNavigation: RestrictNavigation): Query {
    this.request.restrictNavigation = restrictNavigation;
    return this;
  }

  skip(skip: number): Query {
    this.request.skip = skip;
    return this;
  }

  withPageSize(pageSize: number): Query {
    this.request.pageSize = pageSize;
    return this;
  }

  withMatchStrategy(matchStrategy: MatchStrategy): Query {
    this.request.matchStrategy = matchStrategy;
    return this;
  }

  withBiasing(biasing: Biasing): Query {
    this.request.biasing = biasing;
    return this;
  }

  enableWildcardSearch(): Query {
    this.request.wildcardSearchEnabled = true;
    return this;
  }

  disableAutocorrection(): Query {
    this.request.disableAutocorrection = true;
    return this;
  }

  disableBinaryPayload(): Query {
    this.request.returnBinary = false;
    return this;
  }

  allowPrunedRefinements(): Query {
    this.request.pruneRefinements = false;
    return this;
  }

  build(): Request {
    const builtRequest = this.raw;
    NavigationConverter.convert(this.unprocessedNavigations)
      .forEach((ref) => this.addRefinement(ref, builtRequest.refinements));

    return this.clearEmptyArrays(builtRequest);
  }

  get raw(): Request {
    return clone(this.request, false);
  }

  get rawNavigations(): Navigation[] {
    return Object.create(this.unprocessedNavigations);
  }

  private addRefinement(refinement: SelectedRefinement, refinements: SelectedRefinement[]): void {
    if (!refinements.find((ref) => this.refinementMatches(ref, refinement))) {
      refinements.push(refinement);
    }
  }

  private refinementMatches(target: SelectedRefinement, original: SelectedRefinement) {
    return deepEqual(filterObject(target, REFINEMENT_MASK), filterObject(original, REFINEMENT_MASK));
  }

  private convertQueryString(queryParams: string): any {
    return qs.parse(queryParams);
  }

  private clearEmptyArrays(request: Request): Request {
    for (let key in request) {
      if (request[key] instanceof Array && request[key].length === 0) {
        delete request[key];
      }
    }
    return request;
  }
}
