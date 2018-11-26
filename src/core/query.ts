import * as clone from 'clone';
import * as deepEqual from 'deep-equal';
import * as filterObject from 'filter-object';
import * as qs from 'qs';
import {
  Biasing,
  CustomUrlParam,
  FieldSort,
  MatchStrategy,
  Request,
  RestrictNavigation,
  SelectedRefinement,
  Sort,
} from '../models/request';
import {
  Navigation,
  Refinement,
} from '../models/response';
import { NavigationConverter } from '../utils/converter';

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
    this.request.customUrlParams = [];
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

  withSelectedRefinements(...refinements: SelectedRefinement[]): Query {
    refinements.forEach((ref) => this.addRefinement(ref, this.request.refinements));
    return this;
  }

  withoutSelectedRefinements(...refinements: SelectedRefinement[]): Query {
    refinements.forEach((refinement) => {
      const index = this.request.refinements.findIndex((ref) => deepEqual(ref, refinement));
      if (index > -1) this.request.refinements.splice(index, 1);
    });
    return this;
  }

  withRefinements(navigationName: string, ...refinements: Refinement[]): Query {
    const convert = (refinement: Refinement): any => Object.assign(refinement, { navigationName });
    refinements.map(convert).forEach((ref) => this.addRefinement(ref, this.request.refinements));
    return this;
  }

  withNavigations(...navigations: Navigation[]): Query {
    this.unprocessedNavigations.push(...navigations);
    return this;
  }

  withCustomUrlParams(customUrlParams: CustomUrlParam[] | string): Query {
    if (typeof customUrlParams === 'string') {
      this.request.customUrlParams.push(...this.convertParamString(customUrlParams));
    } else if (Array.isArray(customUrlParams)) {
      this.request.customUrlParams.push(...customUrlParams);
    }
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
    (<Sort[]>this.request.sort).push(...sorts);
    return this;
  }

  withoutSorts(...sorts: Sort[]): Query {
    this.request.sort = (<Sort[]>this.request.sort).filter((oldSort) => !sorts.find((sort) =>
      sort.type === 'ByIds'
        ? oldSort.type === 'ByIds' && sort.ids.toString() === oldSort.ids.toString()
        : sort.field === (<FieldSort>oldSort).field
    ));
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
    return this.withSelectedRefinements({
      navigationName,
      value,
      exclude,
      type: 'Value'
    });
  }

  refineByRange(navigationName: string, low: number, high: number, exclude: boolean = false): Query {
    return this.withSelectedRefinements({
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

  private convertParamString(customUrlParams: string): CustomUrlParam[] {
    const parsed = qs.parse(customUrlParams);
    return Object.keys(parsed).reduce((converted, key) => converted.concat({ key, value: parsed[key] }), []);
  }

  private convertQueryString(queryParams: string): any {
    return qs.parse(queryParams);
  }

  private clearEmptyArrays(request: Request): Request {
    for (let key in request) {
      if (Array.isArray(request[key]) && request[key].length === 0) {
        delete request[key];
      }
    }
    return request;
  }
}
