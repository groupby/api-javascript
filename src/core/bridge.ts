import axios, { AxiosResponse } from 'axios';
import { Request } from '../models/request';
import { Record, RefinementResults, Results } from '../models/response';
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

export type BridgeCallback = <T>(err?: Error, res?: T) => void;

export type BridgeQuery = string | Query | Request;

export const DEFAULT_CONFIG: BridgeConfig = {
  timeout: 1500,
};

export abstract class AbstractBridge {

  config: BridgeConfig;
  headers: any = {};
  baseUrl: string;
  errorHandler: (error: Error) => void;
  protected bridgeUrl: string;
  protected refinementsUrl: string;

  constructor(config: BridgeConfig) {
    this.config = Object.assign({}, DEFAULT_CONFIG, config);
  }

  search(query: BridgeQuery, callback?: BridgeCallback) {
    const { request, queryParams } = this.extractRequest(query);
    if (request === null) {
      return this.generateError(INVALID_QUERY_ERROR, callback);
    }

    const response = this.fireRequest<Results>(this.bridgeUrl, request, queryParams)
      .then((res) => res.records ? Object.assign(res, {
        records: res.records.map(this.convertRecordFields),
       }) : res);
    return this.handleResponse(response, callback);
  }

  refinements(query: BridgeQuery, navigationName: string, callback?: BridgeCallback) {
    const { request } = this.extractRequest(query);
    if (request === null) {
      return this.generateError(INVALID_QUERY_ERROR, callback);
    }

    const refinementsRequest = { originalQuery: request, navigationName };

    const response = this.fireRequest<RefinementResults>(this.refinementsUrl, refinementsRequest);
    return this.handleResponse(response, callback);
  }

  protected abstract augmentRequest(request: any): any;

  private handleResponse<T>(response: Promise<T>, callback: (error?: Error, results?: T) => void): Promise<T> {
    if (callback) {
      response.then((res) => callback(undefined, res), (err) => callback(err));
    } else {
      return response;
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

  private fireRequest<T>(url: string, body: Request | any, queryParams: any = {}): Promise<T> {
    const options = {
      data: this.augmentRequest(body),
      headers: this.headers,
      method: 'post',
      params: queryParams,
      responseType: 'json',
      timeout: this.config.timeout,
      url,
    };

    return axios(options)
      .then((res) => res.data)
      .catch((err) => {
        if (this.errorHandler) {
          this.errorHandler(err.response);
        }
        throw err;
      });
  }

  private convertRecordFields(record: RawRecord): Record | RawRecord {
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
