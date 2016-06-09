"use strict";
var chai = require('chai');
var query_1 = require('../src/core/query');
var fixtures_1 = require('./fixtures');
var CLIENT_KEY = 'XXX-XXX-XXX-XXX';
var CUSTOMER_ID = 'services';
var expect = chai.expect;
describe('Query', function () {
    var query;
    beforeEach(function () {
        query = new query_1.Query('test');
    });
    afterEach(function () {
        query = null;
    });
    it('should be defined', function () {
        expect(query).to.be.ok;
    });
    it('should build a simple request with defaults', function () {
        var request = query.build();
        expect(request).to.eql({
            query: 'test',
            wildcardSearchEnabled: false,
            pruneRefinements: true
        });
    });
    it('should build a complex request', function () {
        var request = new query_1.Query('complex')
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
        expect(request).to.eql(fixtures_1.ComplexRequest);
    });
    it('should allow multiple methods of setting refinements', function () {
        var request = new query_1.Query('refinements')
            .withSelectedRefinements({
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
            .withNavigations({
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
        expect(request.refinements).to.eql(fixtures_1.CombinedRefinements);
    });
    it('should convert custom URL params', function () {
        var request = new query_1.Query('parameters')
            .withCustomUrlParams('banner=nike_landing&style=branded')
            .withCustomUrlParams('defaults')
            .withCustomUrlParams('others=&something=as_well')
            .build();
        expect(request.customUrlParams).to.eql(fixtures_1.CustomParamsFromString);
    });
});
//# sourceMappingURL=query.js.map