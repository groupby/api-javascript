/// <reference path="./all.d.ts" />

require('object.assign');
import * as request from 'requestretry';
import * as qs from 'qs';
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
} from './request-models';
import {
  Results,
  Record,
  ValueRefinement,
  RangeRefinement,
  Refinement,
  RefinementType,
  Navigation
} from './response-models';
import { NavigationConverter } from './util';

const SEARCH = '/search';
const REFINEMENTS = '/refinements';
const REFINEMENT_SEARCH = '/refinement';
const CLUSTER = '/cluster';

const BIASING_DEFAULTS = {
  biases: [],
  bringToTop: [],
  augmentBiases: false
};

export class CloudBridge {

  private bridgeUrl: string;
  private bridgeRefinementsUrl: string;
  private bridgeRefinementsSearchUrl: string;
  private bridgeClusterUrl: string;

  constructor(private clientKey: string, private customerId: string) {
    let baseUrl = `https://${customerId}.groupbycloud.com:443/api/v1`;
    this.bridgeUrl = baseUrl + SEARCH;
    this.bridgeRefinementsUrl = baseUrl + REFINEMENTS;
    this.bridgeRefinementsSearchUrl = baseUrl + REFINEMENT_SEARCH;
    this.bridgeClusterUrl = baseUrl + CLUSTER;
  }

  search(query: Query, callback: (Error?, Results?) => void): PromiseLike<Results> | void {
    let response = this.fireRequest(this.bridgeUrl, query.build(), query.queryParams);
    if (callback) {
      response.then(res => callback(undefined, res))
        .catch(err => callback(err));
    } else {
      return response;
    }
  }

  private fireRequest(url: string, body: Request, queryParams: Object): PromiseLike<Results> {
    let options = {
      method: 'POST',
      uri: this.bridgeUrl,
      qs: queryParams,
      body: Object.assign(body, { clientKey: this.clientKey }),
      json: true,

      timeout: 1500,
      maxAttempts: 3,
      retryDelay: 80,
      fullResponse: false
    };
    return request(options)
      .then(res => res.records ? Object.assign(res, { records: res.records.map(this.convertRecordFields) }) : res);
  }

  private convertRecordFields(record: RawRecord): Record {
    let converted = Object.assign(record, { id: record._id, url: record._u, title: record._t });
    delete converted._id;
    delete converted._u;
    delete converted._t;
    if (record._snippet) {
      converted.snippet = record._snippet;
      delete converted._snippet;
    }
    return converted;
  }
}

interface RawRecord {
  _id: string;
  _u: string;
  _t: string;
  _snippet?: string;
}

export interface QueryConfiguration {
  userId?: string;
  language?: string;
  collection?: string;
  area?: string;
  biasingProfile?: string;
}

export class Query {
  private request: Request;
  private unprocessedNavigations: Array<Navigation>;
  queryParams: Object;

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

  withConfiguration(configuration: QueryConfiguration): Query {
    Object.assign(this.request, configuration);
    return this;
  }

  withSelectedRefinements(...refinements: Array<SelectedValueRefinement | SelectedRangeRefinement>): Query {
    this.request.refinements.push(...refinements);
    return this;
  }

  withRefinements(navigationName: string, ...refinements: Array<ValueRefinement | RangeRefinement>): Query {
    let convert = (refinement: Refinement) => <SelectedRefinement>Object.assign(refinement, { navigationName });
    this.request.refinements.push(...refinements.map(convert));
    return this;
  }

  withNavigations(...navigations: Array<Navigation>): Query {
    this.unprocessedNavigations.push(...navigations);
    return this;
  }

  withCustomUrlParams(customUrlParams: Array<CustomUrlParam> | string): Query {
    if (typeof customUrlParams === 'string') {
      this.request.customUrlParams.push(...this.convertParamString(customUrlParams));
    } else if (customUrlParams instanceof Array) {
      this.request.customUrlParams.push(...customUrlParams);
    }
    return this;
  }

  private convertParamString(customUrlParams: string): Array<CustomUrlParam> {
    let parsed = qs.parse(customUrlParams);
    return Object.keys(parsed).reduce((converted, key) => converted.concat({ key, value: parsed[key] }), []);
  }

  withFields(...fields: Array<string>): Query {
    this.request.fields.push(...fields);
    return this;
  }

  withOrFields(...orFields: Array<string>): Query {
    this.request.orFields.push(...orFields);
    return this;
  }

  withSorts(...sorts: Array<Sort>): Query {
    this.request.sort.push(...sorts);
    return this;
  }

  withIncludedNavigations(...navigationNames: Array<string>): Query {
    this.request.includedNavigations.push(...navigationNames);
    return this;
  }

  withExcludedNavigations(...navigationNames: Array<string>): Query {
    this.request.excludedNavigations.push(...navigationNames);
    return this;
  }

  withQueryParams(queryParams: Object | string): Query {
    switch (typeof queryParams) {
      case 'string':
        return Object.assign(this, { queryParams: this.convertQueryString(<string>queryParams) });
      case 'object':
        return Object.assign(this, { queryParams });
    }
  }

  private convertQueryString(queryParams: string): Object {
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

  build(): Request {
    this.request.refinements.push(...NavigationConverter.convert(this.unprocessedNavigations));

    return this.clearEmptyArrays(this.request);
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
