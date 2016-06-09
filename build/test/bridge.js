"use strict";
var chai = require('chai');
var nock = require('nock');
var bridge_1 = require('../src/core/bridge');
var bridge_2 = require('../src/core/bridge');
var query_1 = require('../src/core/query');
var CLIENT_KEY = 'XXX-XXX-XXX-XXX';
var CUSTOMER_ID = 'services';
var expect = chai.expect;
describe('Bridge', function () {
    var bridge, query;
    beforeEach(function () {
        bridge = new bridge_1.CloudBridge(CLIENT_KEY, CUSTOMER_ID);
        query = new query_1.Query('test');
    });
    afterEach(function () {
        bridge = null;
        query = null;
    });
    it('should be defined', function () {
        expect(bridge).to.be.ok;
    });
    it('should handle invalid query types', function (done) {
        bridge.search(12331)
            .catch(function (err) { return expect(err.message).to.equal('query was not of a recognised type'); })
            .then(function () { return bridge.search(true, function (err, res) {
            expect(err.message).to.equal('query was not of a recognised type');
            expect(res).to.not.be.ok;
            done();
        }); });
    });
    it('should be accept a direct query string', function (done) {
        var mock = nock("https://" + CUSTOMER_ID + ".groupbycloud.com")
            .post('/api/v1/search', {
            query: 'skirts',
            clientKey: CLIENT_KEY
        })
            .reply(200, 'success');
        bridge.search('skirts')
            .then(function (results) {
            expect(results).to.equal('success');
            mock.done();
            done();
        });
    });
    it('should be accept a raw request', function (done) {
        var mock = nock("https://" + CUSTOMER_ID + ".groupbycloud.com")
            .post('/api/v1/search', {
            query: 'skirts',
            fields: ['title', 'description'],
            clientKey: CLIENT_KEY
        })
            .twice()
            .reply(200, 'success');
        bridge.search(new query_1.Query('skirts').withFields('title', 'description').build())
            .then(function (results) { return expect(results).to.equal('success'); })
            .then(function () { return bridge.search({ query: 'skirts', fields: ['title', 'description'] }); })
            .then(function (results) {
            expect(results).to.equal('success');
            mock.done();
            done();
        });
    });
    it('should be reuseable', function (done) {
        var mock = nock("https://" + CUSTOMER_ID + ".groupbycloud.com")
            .post('/api/v1/search')
            .twice()
            .reply(200, 'success');
        query = new query_1.Query('skirts');
        bridge.search(query)
            .then(function (results) { return expect(results).to.equal('success'); })
            .then(function () { return bridge.search(query); })
            .then(function (results) {
            expect(results).to.equal('success');
            mock.done();
            done();
        });
    });
    it('should send a search query and return a promise', function (done) {
        var queryParams = {
            size: 20,
            syle: 'branded',
            other: ''
        };
        var mock = nock("https://" + CUSTOMER_ID + ".groupbycloud.com")
            .post('/api/v1/search', {
            query: 'skirts',
            clientKey: CLIENT_KEY
        })
            .query(queryParams)
            .reply(200, 'success');
        query = new query_1.Query('skirts')
            .withQueryParams(queryParams);
        bridge.search(query)
            .then(function (results) {
            expect(results).to.equal('success');
            mock.done();
            done();
        });
    });
    it('should send a search query and take a callback', function (done) {
        var mock = nock("https://" + CUSTOMER_ID + ".groupbycloud.com")
            .post('/api/v1/search', {
            query: 'shoes',
            clientKey: CLIENT_KEY
        })
            .query({
            size: 20,
            style: 'branded'
        })
            .reply(200, 'success');
        query = new query_1.Query('shoes')
            .withQueryParams('size=20&style=branded');
        bridge.search(query, function (err, results) {
            expect(results).to.equal('success');
            mock.done();
            done();
        });
    });
    it('should send requests to the CORS supported endpoint', function (done) {
        var mock = nock('http://ecomm.groupbycloud.com')
            .post("/semanticSearch/" + CUSTOMER_ID, { query: 'shoes' })
            .query({
            size: 20,
            style: 'branded'
        })
            .reply(200, 'success');
        query = new query_1.Query('shoes')
            .withQueryParams('size=20&style=branded');
        new bridge_2.BrowserBridge(CUSTOMER_ID)
            .search(query, function (err, results) {
            expect(results).to.equal('success');
            mock.done();
            done();
        });
    });
});
//# sourceMappingURL=bridge.js.map