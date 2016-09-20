import { Request } from '../models/request';
import { Record, RefinementResults, Results } from '../models/response';
import { Query } from './query';
import axios = require('axios');

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

export abstract class AbstractBridge {

  headers: any = {};
  baseUrl: string;
  protected bridgeUrl: string;
  protected refinementsUrl: string;

  search(query: BridgeQuery, callback?: BridgeCallback): Promise<Results> {
    let { request, queryParams } = this.extractRequest(query);
    if (request === null) return this.generateError(INVALID_QUERY_ERROR, callback);

    const response = this.fireRequest(this.bridgeUrl, request, queryParams)
      .then((res) => res.records ? Object.assign(res, { records: res.records.map(this.convertRecordFields) }) : res);
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

  private handleResponse<T>(response: Promise<T>, callback: Function): Promise<T> {
    if (callback) {
      response.then((res) => callback(undefined, res))
        .catch((err) => callback(err));
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

  private fireRequest(url: string, body: Request | any, queryParams: any = {}): Axios.IPromise<any> {
    const options = {
      url,
      method: 'post',
      params: queryParams,
      data: this.augmentRequest(body),
      headers: this.headers,
      responseType: 'json',
      timeout: 1500
    };
    return axios(options)
      .then((res) => res.data);
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

  constructor(private clientKey: string, customerId: string) {
    super();
    this.baseUrl = `https://${customerId}.groupbycloud.com:443/api/v1`;
    this.bridgeUrl = this.baseUrl + SEARCH;
    this.refinementsUrl = this.bridgeUrl + REFINEMENTS;
  }

  protected augmentRequest(request: any): any {
    return Object.assign(request, { clientKey: this.clientKey });
  }
}

export class BrowserBridge extends AbstractBridge {
  constructor(customerId: string, https: boolean = false) {
    super();
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
