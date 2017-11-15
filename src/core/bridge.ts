import * as axios from 'axios';
import * as fetchPonyfill from 'fetch-ponyfill';
import { Request } from '../models/request';
import { Navigation, RangeRefinement, Record, RefinementResults, Results } from '../models/response';
import { Query } from './query';

const SEARCH = '/search';
const REFINEMENTS = '/refinements';

const INVALID_QUERY_ERROR = 'query was not of a recognised type';

export interface RawRecord extends Record {
  _id: string;
  _u: string;
  _t: string;
  _snippet?: string;
}

export interface BridgeCallback {
  (err?: Error, res?: Results): void;
}

export type BridgeQuery = string | Query | Request;

export const DEFAULT_CONFIG: BridgeConfig = {
  timeout: 1500
};

export abstract class AbstractBridge {

  config: BridgeConfig;
  fetch: fetchPonyfill;
  headers: any = {};
  baseUrl: string;
  errorHandler: (error: Error) => void;
  protected bridgeUrl: string;
  protected refinementsUrl: string;

  constructor(config: BridgeConfig) {
    this.config = Object.assign({}, DEFAULT_CONFIG, config);
    this.fetch = fetchPonyfill().fetch;
  }

  search(query: BridgeQuery, callback?: BridgeCallback): Promise<Results> {
    let { request, queryParams } = this.extractRequest(query);
    if (request === null) return this.generateError(INVALID_QUERY_ERROR, callback);

    const response = this.fireRequest(this.bridgeUrl, request, queryParams)
      .then(AbstractBridge.transformRecords)
      .then(AbstractBridge.transformRefinements);
    return this.handleResponse(response, callback);
  }

  refinements(query: BridgeQuery, navigationName: string, callback?: BridgeCallback): Promise<RefinementResults> {
    let { request } = this.extractRequest(query);
    if (request === null) return this.generateError(INVALID_QUERY_ERROR, callback);

    const refinementsRequest = { originalQuery: request, navigationName };

    const response = this.fireRequest(this.refinementsUrl, refinementsRequest);
    return this.handleResponse(response, callback);
  }

  protected abstract augmentRequest(request: any): any;

  private handleResponse<T>(response: PromiseLike<T>, callback: Function) {
    if (callback) {
      response.then((res) => callback(undefined, res), (err) => callback(err));
    } else {
      return <Promise<T>>response;
    }
  }

  private extractRequest(query: any): { request: Request; queryParams: any; } {
    switch (typeof query) {
      case 'string': return { request: new Query(<string>query).build(), queryParams: {} };
      case 'object': return query instanceof Query
        ? { request: query.build(), queryParams: query.queryParams }
        : { request: query, queryParams: {} };
      default: return { request: null, queryParams: null };
    }
  }

  private generateError(error: string, callback: (err: Error) => void): Promise<any> {
    const err = new Error(error);
    if (callback) {
      callback(err);
    } else {
      return Promise.reject(err);
    }
  }

  // tslint:disable-next-line max-line-length
  private fireRequest(url: string, body: Request | any, queryParams: any = {}): fetchPonyfill.Promise<any> {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.headers
      },
      body: JSON.stringify(this.augmentRequest(body)),
    };
    const timeoutPromise = () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          reject(new Error('timeout'));
        }, this.config.timeout);
      });

    const response = Promise.race([this.fetch(url, options), timeoutPromise()])
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((err) => {
            throw {
              status: res.status,
              statusText: res.statusText,
              data: err,
            };
          });
        }
      })
      .catch((err) => {
        if (this.errorHandler) {
          this.errorHandler(err);
        }
        throw err;
      });

    return response;
  }

  static transform(response: any, key: string, callback: Function) {
    if (response[key]) {
      return Object.assign(response, { [key]: response[key].map(callback) });
    } else {
      return response;
    }
  }

  static transformRecords(response: any) {
    return AbstractBridge.transform(response, 'records', AbstractBridge.convertRecordFields);
  }

  static transformRefinements(response: any) {
    const transformed = AbstractBridge.transform(response, 'availableNavigation', AbstractBridge.convertRefinement);
    return AbstractBridge.transform(transformed, 'selectedNavigation', AbstractBridge.convertRefinement);
  }

  static convertRecordFields(record: RawRecord): Record | RawRecord {
    const converted = Object.assign(record, { id: record._id, url: record._u, title: record._t });
    delete converted._id;
    delete converted._u;
    delete converted._t;

    if (record._snippet) {
      converted.snippet = record._snippet;
      delete converted._snippet;
    }

    return converted;
  }

  static convertRefinement(navigation: Navigation): Navigation {
    if (navigation.range) {
      navigation.min = Number.MAX_SAFE_INTEGER;
      navigation.max = Number.MIN_SAFE_INTEGER;
      navigation.refinements = navigation.refinements
        .map((ref: RangeRefinement) => {
          navigation.min = Math.min(navigation.min, ref.low);
          navigation.max = Math.max(navigation.max, ref.high);
          return ({
            ...ref,
            high: parseFloat(<any>ref.high),
            low: parseFloat(<any>ref.low)
          });
        });
    }
    return navigation;
  }
}

export class CloudBridge extends AbstractBridge {

  constructor(private clientKey: string, customerId: string, config: BridgeConfig = {}) {
    super(config);
    this.baseUrl = `https://${customerId}.groupbycloud.com:443/api/v1`;
    this.bridgeUrl = this.baseUrl + SEARCH;
    this.refinementsUrl = this.bridgeUrl + REFINEMENTS;
  }

  protected augmentRequest(request: any): any {
    return Object.assign(request, { clientKey: this.clientKey });
  }
}

export class BrowserBridge extends AbstractBridge {
  constructor(customerId: string, https: boolean = false, config: BridgeConfig = {}) {
    super(config);
    const scheme = https ? 'https' : 'http';
    const port = https ? ':443' : '';
    this.baseUrl = `${scheme}://${customerId}-cors.groupbycloud.com${port}/api/v1`;
    this.bridgeUrl = this.baseUrl + SEARCH;
    this.refinementsUrl = this.bridgeUrl + REFINEMENTS;
  }

  protected augmentRequest(request: any): any {
    return request;
  }
}

export interface BridgeConfig {
  timeout?: number;
}
