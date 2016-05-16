/// <reference path="./all.d.ts" />

if (!global.Promise) {
  require('es6-promise').polyfill();
}
import axios = require('axios');
import assign = require('object-assign');
import qs = require('qs');
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

  search(query: string | Query | Request, callback: (Error?, Results?) => void = undefined): PromiseLike<Results> | void {
    let queryParams = {};
    let request = undefined;
    switch (typeof query) {
      case 'string': {
        request = new Query(<string>query).build();
        break;
      }
      case 'object': {
        if (query instanceof Query) {
          queryParams = query.queryParams;
          request = query.build();
        } else {
          request = query;
        }
        break;
      }
      default: return this.generateError('query was not of a recognised type', callback);
    }

    let response = this.fireRequest(this.bridgeUrl, request, queryParams);
    if (callback) {
      response.then(res => callback(undefined, res))
        .catch(err => callback(err));
    } else {
      return response;
    }
  }

  private generateError(error: string, callback: (Error) => void): void | PromiseLike<any> {
    let err = new Error(error);
    if (callback) {
      callback(err);
    } else {
      return Promise.reject(err);
    }
  }

  private fireRequest(url: string, body: Request, queryParams: any): Axios.IPromise<Results> {
    let options = {
      url: this.bridgeUrl,
      method: 'post',
      params: queryParams,
      data: assign(body, { clientKey: this.clientKey }),
      responseType: 'json',
      timeout: 1500
    };
    return axios(options)
      .then(res => <Results>res.data)
      .then(res => res.records ? assign(res, { records: res.records.map(this.convertRecordFields) }) : res);
  }

  private convertRecordFields(record: RawRecord): Record | RawRecord {
    let converted = assign(record, { id: record._id, url: record._u, title: record._t });
    delete converted._id, converted._u, converted._t;

    if (record._snippet) {
      converted.snippet = record._snippet;
      delete converted._snippet;
    }

    return converted;
  }
}

interface RawRecord extends Record {
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

  withConfiguration(configuration: QueryConfiguration): Query {
    assign(this.request, configuration);
    return this;
  }

  withSelectedRefinements(...refinements: Array<SelectedValueRefinement | SelectedRangeRefinement>): Query {
    this.request.refinements.push(...refinements);
    return this;
  }

  withRefinements(navigationName: string, ...refinements: Array<ValueRefinement | RangeRefinement>): Query {
    let convert = (refinement: Refinement) => <SelectedRefinement>assign(refinement, { navigationName });
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
    let parsed = qs.parse(customUrlParams);
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
        return assign(this, { queryParams: this.convertQueryString(<string>queryParams) });
      case 'object':
        return assign(this, { queryParams });
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

  build(): Request {
    let builtRequest = assign(new Request(), this.request);
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
