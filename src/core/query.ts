import qs = require('qs');
import deepEql = require('deep-equal');
import {
  Request,
  SelectedValueRefinement,
  SelectedRangeRefinement,
  SelectedRefinement,
  CustomUrlParam,
  RestrictNavigation,
  Sort,
  MatchStrategy,
  Biasing,
  Bias
} from '../models/request';
import {
  Results,
  Record,
  ValueRefinement,
  RangeRefinement,
  Refinement,
  RefinementType,
  Navigation
} from '../models/response';
import { NavigationConverter } from '../utils/converter';

export interface QueryConfiguration {
  userId?: string;
  language?: string;
  collection?: string;
  area?: string;
  biasingProfile?: string;
  pageSize?: number;
}

export class Query {
  private request: Request;
  private unprocessedNavigations: Navigation[];
  queryParams: any;

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

  withConfiguration(configuration: QueryConfiguration): Query {
    Object.assign(this.request, configuration);
    return this;
  }

  withSelectedRefinements(...refinements: Array<SelectedValueRefinement | SelectedRangeRefinement>): Query {
    this.request.refinements.push(...refinements);
    return this;
  }

  withoutSelectedRefinements(...refinements: Array<SelectedValueRefinement | SelectedRangeRefinement>): Query {
    refinements.forEach(refinement => {
      const index = this.request.refinements.findIndex(ref => deepEql(ref, refinement));
      if (index > -1) this.request.refinements.splice(index, 1);
    });
    return this;
  }

  withRefinements(navigationName: string, ...refinements: Array<ValueRefinement | RangeRefinement>): Query {
    const convert = (refinement: Refinement) => <SelectedRefinement>Object.assign(refinement, { navigationName });
    this.request.refinements.push(...refinements.map(convert));
    return this;
  }

  withNavigations(...navigations: Navigation[]): Query {
    this.unprocessedNavigations.push(...navigations);
    return this;
  }

  withCustomUrlParams(customUrlParams: CustomUrlParam[] | string): Query {
    if (typeof customUrlParams === 'string') {
      this.request.customUrlParams.push(...this.convertParamString(customUrlParams));
    } else if (customUrlParams instanceof Array) {
      this.request.customUrlParams.push(...customUrlParams);
    }
    return this;
  }

  private convertParamString(customUrlParams: string): CustomUrlParam[] {
    const parsed = qs.parse(customUrlParams);
    return Object.keys(parsed).reduce((converted, key) => converted.concat({ key, value: parsed[key] }), []);
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
    sorts.forEach(oldSort => {
      const found = this.request.sort.findIndex(sort => sort.field === oldSort.field);
      if (found > -1) this.request.sort.splice(found, 1);
    });
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

  private convertQueryString(queryParams: string): any {
    return qs.parse(queryParams);
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

  get rawRequest(): Request {
    return Object.create(this.request);
  }

  get rawNavigations(): Navigation[] {
    return Object.create(this.unprocessedNavigations);
  }

  build(): Request {
    const builtRequest = Object.assign(new Request(), this.request);
    builtRequest.refinements.push(...NavigationConverter.convert(this.unprocessedNavigations));

    return this.clearEmptyArrays(builtRequest);
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
