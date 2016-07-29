/// <reference path="../typings/index.d.ts" />

import { expect } from 'chai';
import { Query } from '../src/core/query';
import { SelectedValueRefinement } from '../src/models/request';
import {
  ComplexRequest,
  CombinedRefinements,
  CustomParamsFromString
} from './fixtures';

const CLIENT_KEY = 'XXX-XXX-XXX-XXX';
const CUSTOMER_ID = 'services';

describe('Query', function() {
  let query;

  beforeEach(() => {
    query = new Query('test');
  });

  afterEach(() => {
    query = null;
  });

  it('should be defined', () => {
    expect(query).to.be.ok;
  });

  it('should build a simple request with defaults', () => {
    const request = query.build();
    expect(request).to.eql({
      query: 'test',
      wildcardSearchEnabled: false,
      pruneRefinements: true
    });
  });

  it('should build a complex request', () => {
    const request = new Query('complex')
      .withConfiguration({
        userId: '13afasd',
        language: 'en',
        collection: 'dev',
        area: 'Development',
        biasingProfile: 'boost top brands'
      })
      .withCustomUrlParams([{ key: 'banner', value: 'nike_landing' }, { key: 'style', value: 'branded' }])
      .withFields('title', 'description')
      .withOrFields('brand', 'colour')
      .withIncludedNavigations('brand', 'size')
      .withExcludedNavigations('_meta', 'originalPrice')
      .withQueryParams({
        attrs: 'size,brand',
        id: ''
      })
      .withSorts({ field: 'price', order: 'Ascending' }, { field: 'boost', order: 'Descending' })
      .withPageSize(300)
      .skip(40)
      .restrictNavigation({
        name: 'brand',
        count: 10
      })
      .withMatchStrategy({
        rules: [{ terms: 5, termsGreaterThan: 7 }]
      })
      .withBiasing({
        augmentBiases: true,
        biases: [{ name: 'popularity', strength: 'Strong_Decrease' }]
      })
      .enableWildcardSearch()
      .disableAutocorrection()
      .allowPrunedRefinements()
      .disableBinaryPayload()
      .build();

    expect(request).to.eql(ComplexRequest);
  });

  it('should allow multiple methods of setting refinements', () => {
    const request = new Query('refinements')
      .withSelectedRefinements(
      {
        navigationName: 'size',
        type: 'Range',
        low: 1,
        high: 13,
        exclude: false
      }, {
        navigationName: 'brand',
        type: 'Value',
        value: 'Nike',
        exclude: true
      })
      .withRefinements('material', {
        type: 'Value',
        value: 'wool'
      })
      .withRefinements('year', {
        type: 'Range',
        low: 2000,
        high: 2009,
        exclude: false
      }, {
        type: 'Range',
        low: 2010,
        high: 2011
      })
      .withNavigations(
      {
        name: 'rating',
        refinements: [{ type: 'Value', value: '***' }]
      }, {
        name: 'price',
        refinements: [
          { type: 'Range', low: 31, high: 44 },
          { type: 'Range', low: 89, high: 100 }
        ]
      })
      .refineByValue('rating', '****', true)
      .refineByRange('price', 122, 413)
      .build();

    expect(request.refinements).to.eql(CombinedRefinements);
  });

  it('should not allow setting the same refinement multiple times', () => {
    const refinement: SelectedValueRefinement = { type: 'Value', navigationName: 'brand', value: 'DeWalt' };
    const query = new Query('refinements')
      .withSelectedRefinements(refinement, refinement);
    expect(query.build().refinements.length).to.eq(1);
  });

  it('should allow unsetting refinement', () => {
    const query = new Query('refinements')
      .withSelectedRefinements({ type: 'Value', navigationName: 'brand', value: 'DeWalt' }, { type: 'Range', navigationName: 'price', low: 20, high: 40 });
    expect(query.build().refinements.length).to.eq(2);

    query.withoutSelectedRefinements({ type: 'Value', navigationName: 'brand', value: 'DeWalt' });
    const request = query.build();
    expect(request.refinements.length).to.eq(1);
    expect(request.refinements[0].type).to.eq('Range');
  });

  it('should convert custom URL params', () => {
    const request = new Query('parameters')
      .withCustomUrlParams('banner=nike_landing&style=branded')
      .withCustomUrlParams('defaults')
      .withCustomUrlParams('others=&something=as_well')
      .build();

    expect(request.customUrlParams).to.eql(CustomParamsFromString);
  });

  it('should expose a copy of the raw request', () => {
    const query = new Query('raw request')
      .skip(10)
      .withPageSize(300);
    const rawRequest = query.raw;
    expect(rawRequest.skip).to.eq(10);
    expect(rawRequest.pageSize).to.eq(300);
    rawRequest.skip = 20;
    rawRequest.pageSize = 47;
    expect(query.build().skip).to.eq(10);
    expect(query.build().pageSize).to.eq(300);
  });

  it('should expose a copy of the raw navigations', () => {
    const query = new Query('raw request')
      .skip(10)
      .withPageSize(300);
    const rawRequest = query.raw;
    expect(rawRequest.skip).to.eq(10);
    expect(rawRequest.pageSize).to.eq(300);
    rawRequest.skip = 20;
    rawRequest.pageSize = 47;
    expect(query.build().skip).to.eq(10);
    expect(query.build().pageSize).to.eq(300);
  });

  it('should allow sorts to be unselected', () => {
    const query = new Query('')
      .withSorts({ field: 'this', order: 'Ascending' }, { field: 'that', order: 'Descending' });
    expect(query.raw.sort.length).to.eq(2);
    query.withoutSorts({ field: 'that', order: 'Ascending' });
    expect(query.raw.sort.length).to.eq(1);
    expect(query.raw.sort[0].field).to.eq('this');
    query.withoutSorts({ field: 'this', order: 'Ascending' });
    expect(query.raw.sort.length).to.eq(0);
  });
});
