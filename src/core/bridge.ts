import { Request } from '../models/request';
import { Record, Results } from '../models/response';
import { Query } from './query';
import axios = require('axios');

const SEARCH = '/search';
const REFINEMENTS = '/refinements';
const REFINEMENT_SEARCH = '/refinement';
const CLUSTER = '/cluster';

export interface RawRecord extends Record {
  _id: string;
  _u: string;
  _t: string;
  _snippet?: string;
}

export abstract class AbstractBridge {

  headers: any = {};
  protected bridgeUrl: string;

  search(query: string | Query | Request, callback: (err?: Error, res?: Results) => void = undefined): Promise<Results> {
    let [request, queryParams] = this.extractRequest(query);
    if (request === null) return this.generateError('query was not of a recognised type', callback);

    const response = this.fireRequest(this.bridgeUrl, request, queryParams);
    if (callback) {
      response.then((res) => callback(undefined, res))
        .catch((err) => callback(err));
    } else {
      return response;
    }
  }

  protected abstract augmentRequest(request: any): any;

  private extractRequest(query: any): [Request, any] {
    switch (typeof query) {
      case 'string': return [new Query(<string>query).build(), {}];
      case 'object': return query instanceof Query ? [query.build(), query.queryParams] : [query, {}];
      default: return [null, null];
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

  private fireRequest(url: string, body: Request | any, queryParams: any): Axios.IPromise<Results> {
    const options = {
      url: this.bridgeUrl,
      method: 'post',
      params: queryParams,
      data: this.augmentRequest(body),
      headers: this.headers,
      responseType: 'json',
      timeout: 1500
    };
    return axios(options)
      .then((res) => res.data)
      .then((res) => res.records ? Object.assign(res, { records: res.records.map(this.convertRecordFields) }) : res);
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

  private bridgeRefinementsUrl: string = null;
  private bridgeRefinementsSearchUrl: string = null;
  private bridgeClusterUrl: string = null;

  constructor(private clientKey: string, customerId: string) {
    super();
    const baseUrl = `https://${customerId}.groupbycloud.com:443/api/v1`;
    this.bridgeUrl = baseUrl + SEARCH;
    this.bridgeRefinementsUrl = baseUrl + REFINEMENTS;
    this.bridgeRefinementsSearchUrl = baseUrl + REFINEMENT_SEARCH;
    this.bridgeClusterUrl = baseUrl + CLUSTER;
  }

  protected augmentRequest(request: any): any {
    return Object.assign(request, { clientKey: this.clientKey });
  }
}

export class BrowserBridge extends AbstractBridge {
  constructor(customerId: string) {
    super();
    const baseUrl = `http://${customerId}-cors.groupbycloud.com/api/v1`;
    this.bridgeUrl = baseUrl + SEARCH;
  }

  protected augmentRequest(request: any): any {
    return request;
  }
}
