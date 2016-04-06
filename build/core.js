/// <reference path="./all.d.ts" />
"use strict";
require('object.assign');
var request = require('requestretry');
var qs = require('qs');
var util_1 = require('./util');
var SEARCH = '/search';
var REFINEMENTS = '/refinements';
var REFINEMENT_SEARCH = '/refinement';
var CLUSTER = '/cluster';
var BIASING_DEFAULTS = {
    biases: [],
    bringToTop: [],
    augmentBiases: false
};
var CloudBridge = (function () {
    function CloudBridge(clientKey, customerId) {
        this.clientKey = clientKey;
        this.customerId = customerId;
        var baseUrl = "https://" + customerId + ".groupbycloud.com:443/api/v1";
        this.bridgeUrl = baseUrl + SEARCH;
        this.bridgeRefinementsUrl = baseUrl + REFINEMENTS;
        this.bridgeRefinementsSearchUrl = baseUrl + REFINEMENT_SEARCH;
        this.bridgeClusterUrl = baseUrl + CLUSTER;
    }
    CloudBridge.prototype.search = function (query, callback) {
        var response = this.fireRequest(this.bridgeUrl, query.build(), query.queryParams);
        if (callback) {
            response.then(function (res) { return callback(undefined, res); })
                .catch(function (err) { return callback(err); });
        }
        else {
            return response;
        }
    };
    CloudBridge.prototype.fireRequest = function (url, body, queryParams) {
        var _this = this;
        var options = {
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
            .then(function (res) { return res.records ? Object.assign(res, { records: res.records.map(_this.convertRecordFields) }) : res; });
    };
    CloudBridge.prototype.convertRecordFields = function (record) {
        var converted = Object.assign(record, { id: record._id, url: record._u, title: record._t });
        delete converted._id;
        delete converted._u;
        delete converted._t;
        if (record._snippet) {
            converted.snippet = record._snippet;
            delete converted._snippet;
        }
        return converted;
    };
    return CloudBridge;
}());
exports.CloudBridge = CloudBridge;
var Query = (function () {
    function Query(query) {
        if (query === void 0) { query = ''; }
        this.request = {};
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
    Query.prototype.withConfiguration = function (configuration) {
        Object.assign(this.request, configuration);
        return this;
    };
    Query.prototype.withSelectedRefinements = function () {
        var refinements = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            refinements[_i - 0] = arguments[_i];
        }
        (_a = this.request.refinements).push.apply(_a, refinements);
        return this;
        var _a;
    };
    Query.prototype.withRefinements = function (navigationName) {
        var refinements = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            refinements[_i - 1] = arguments[_i];
        }
        var convert = function (refinement) { return Object.assign(refinement, { navigationName: navigationName }); };
        (_a = this.request.refinements).push.apply(_a, refinements.map(convert));
        return this;
        var _a;
    };
    Query.prototype.withNavigations = function () {
        var navigations = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            navigations[_i - 0] = arguments[_i];
        }
        (_a = this.unprocessedNavigations).push.apply(_a, navigations);
        return this;
        var _a;
    };
    Query.prototype.withCustomUrlParams = function (customUrlParams) {
        if (typeof customUrlParams === 'string') {
            (_a = this.request.customUrlParams).push.apply(_a, this.convertParamString(customUrlParams));
        }
        else if (customUrlParams instanceof Array) {
            (_b = this.request.customUrlParams).push.apply(_b, customUrlParams);
        }
        return this;
        var _a, _b;
    };
    Query.prototype.convertParamString = function (customUrlParams) {
        var parsed = qs.parse(customUrlParams);
        return Object.keys(parsed).reduce(function (converted, key) { return converted.concat({ key: key, value: parsed[key] }); }, []);
    };
    Query.prototype.withFields = function () {
        var fields = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fields[_i - 0] = arguments[_i];
        }
        (_a = this.request.fields).push.apply(_a, fields);
        return this;
        var _a;
    };
    Query.prototype.withOrFields = function () {
        var orFields = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            orFields[_i - 0] = arguments[_i];
        }
        (_a = this.request.orFields).push.apply(_a, orFields);
        return this;
        var _a;
    };
    Query.prototype.withSorts = function () {
        var sorts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sorts[_i - 0] = arguments[_i];
        }
        (_a = this.request.sort).push.apply(_a, sorts);
        return this;
        var _a;
    };
    Query.prototype.withIncludedNavigations = function () {
        var navigationNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            navigationNames[_i - 0] = arguments[_i];
        }
        (_a = this.request.includedNavigations).push.apply(_a, navigationNames);
        return this;
        var _a;
    };
    Query.prototype.withExcludedNavigations = function () {
        var navigationNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            navigationNames[_i - 0] = arguments[_i];
        }
        (_a = this.request.excludedNavigations).push.apply(_a, navigationNames);
        return this;
        var _a;
    };
    Query.prototype.withQueryParams = function (queryParams) {
        switch (typeof queryParams) {
            case 'string':
                return Object.assign(this, { queryParams: this.convertQueryString(queryParams) });
            case 'object':
                return Object.assign(this, { queryParams: queryParams });
        }
    };
    Query.prototype.convertQueryString = function (queryParams) {
        return qs.parse(queryParams);
    };
    Query.prototype.refineByValue = function (navigationName, value, exclude) {
        if (exclude === void 0) { exclude = false; }
        return this.withSelectedRefinements({
            navigationName: navigationName,
            value: value,
            exclude: exclude,
            type: 'Value'
        });
    };
    Query.prototype.refineByRange = function (navigationName, low, high, exclude) {
        if (exclude === void 0) { exclude = false; }
        return this.withSelectedRefinements({
            navigationName: navigationName,
            low: low,
            high: high,
            exclude: exclude,
            type: 'Range'
        });
    };
    Query.prototype.restrictNavigation = function (restrictNavigation) {
        this.request.restrictNavigation = restrictNavigation;
        return this;
    };
    Query.prototype.skip = function (skip) {
        this.request.skip = skip;
        return this;
    };
    Query.prototype.withPageSize = function (pageSize) {
        this.request.pageSize = pageSize;
        return this;
    };
    Query.prototype.withMatchStrategy = function (matchStrategy) {
        this.request.matchStrategy = matchStrategy;
        return this;
    };
    Query.prototype.withBiasing = function (biasing) {
        this.request.biasing = biasing;
        return this;
    };
    Query.prototype.enableWildcardSearch = function () {
        this.request.wildcardSearchEnabled = true;
        return this;
    };
    Query.prototype.disableAutocorrection = function () {
        this.request.disableAutocorrection = true;
        return this;
    };
    Query.prototype.disableBinaryPayload = function () {
        this.request.returnBinary = false;
        return this;
    };
    Query.prototype.allowPrunedRefinements = function () {
        this.request.pruneRefinements = false;
        return this;
    };
    Query.prototype.build = function () {
        (_a = this.request.refinements).push.apply(_a, util_1.NavigationConverter.convert(this.unprocessedNavigations));
        return this.clearEmptyArrays(this.request);
        var _a;
    };
    Query.prototype.clearEmptyArrays = function (request) {
        for (var key in request) {
            if (request[key] instanceof Array && request[key].length === 0) {
                delete request[key];
            }
        }
        return request;
    };
    return Query;
}());
exports.Query = Query;

//# sourceMappingURL=data:application/json;base64,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LE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1FBRTNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztJQUM3QyxDQUFDO0lBRU8sZ0NBQWdCLEdBQXhCLFVBQXlCLE9BQWdCO1FBQ3ZDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDeEIsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEtBQUssSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQy9ELE9BQU8sT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3RCLENBQUM7UUFDSCxDQUFDO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUgsWUFBQztBQUFELENBL0tBLEFBK0tDLElBQUE7QUEvS1ksYUFBSyxRQStLakIsQ0FBQSIsImZpbGUiOiJjb3JlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vYWxsLmQudHNcIiAvPlxuXG5yZXF1aXJlKCdvYmplY3QuYXNzaWduJyk7XG5pbXBvcnQgKiBhcyByZXF1ZXN0IGZyb20gJ3JlcXVlc3RyZXRyeSc7XG5pbXBvcnQgKiBhcyBxcyBmcm9tICdxcyc7XG5pbXBvcnQge1xuICBSZXF1ZXN0LFxuICBTZWxlY3RlZFZhbHVlUmVmaW5lbWVudCxcbiAgU2VsZWN0ZWRSYW5nZVJlZmluZW1lbnQsXG4gIFNlbGVjdGVkUmVmaW5lbWVudCxcbiAgQ3VzdG9tVXJsUGFyYW0sXG4gIFJlc3RyaWN0TmF2aWdhdGlvbixcbiAgU29ydCxcbiAgTWF0Y2hTdHJhdGVneSxcbiAgQmlhc2luZyxcbiAgQmlhc1xufSBmcm9tICcuL3JlcXVlc3QtbW9kZWxzJztcbmltcG9ydCB7XG4gIFJlc3VsdHMsXG4gIFJlY29yZCxcbiAgVmFsdWVSZWZpbmVtZW50LFxuICBSYW5nZVJlZmluZW1lbnQsXG4gIFJlZmluZW1lbnQsXG4gIFJlZmluZW1lbnRUeXBlLFxuICBOYXZpZ2F0aW9uXG59IGZyb20gJy4vcmVzcG9uc2UtbW9kZWxzJztcbmltcG9ydCB7IE5hdmlnYXRpb25Db252ZXJ0ZXIgfSBmcm9tICcuL3V0aWwnO1xuXG5jb25zdCBTRUFSQ0ggPSAnL3NlYXJjaCc7XG5jb25zdCBSRUZJTkVNRU5UUyA9ICcvcmVmaW5lbWVudHMnO1xuY29uc3QgUkVGSU5FTUVOVF9TRUFSQ0ggPSAnL3JlZmluZW1lbnQnO1xuY29uc3QgQ0xVU1RFUiA9ICcvY2x1c3Rlcic7XG5cbmNvbnN0IEJJQVNJTkdfREVGQVVMVFMgPSB7XG4gIGJpYXNlczogW10sXG4gIGJyaW5nVG9Ub3A6IFtdLFxuICBhdWdtZW50Qmlhc2VzOiBmYWxzZVxufTtcblxuZXhwb3J0IGNsYXNzIENsb3VkQnJpZGdlIHtcblxuICBwcml2YXRlIGJyaWRnZVVybDogc3RyaW5nO1xuICBwcml2YXRlIGJyaWRnZVJlZmluZW1lbnRzVXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgYnJpZGdlUmVmaW5lbWVudHNTZWFyY2hVcmw6IHN0cmluZztcbiAgcHJpdmF0ZSBicmlkZ2VDbHVzdGVyVXJsOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjbGllbnRLZXk6IHN0cmluZywgcHJpdmF0ZSBjdXN0b21lcklkOiBzdHJpbmcpIHtcbiAgICBsZXQgYmFzZVVybCA9IGBodHRwczovLyR7Y3VzdG9tZXJJZH0uZ3JvdXBieWNsb3VkLmNvbTo0NDMvYXBpL3YxYDtcbiAgICB0aGlzLmJyaWRnZVVybCA9IGJhc2VVcmwgKyBTRUFSQ0g7XG4gICAgdGhpcy5icmlkZ2VSZWZpbmVtZW50c1VybCA9IGJhc2VVcmwgKyBSRUZJTkVNRU5UUztcbiAgICB0aGlzLmJyaWRnZVJlZmluZW1lbnRzU2VhcmNoVXJsID0gYmFzZVVybCArIFJFRklORU1FTlRfU0VBUkNIO1xuICAgIHRoaXMuYnJpZGdlQ2x1c3RlclVybCA9IGJhc2VVcmwgKyBDTFVTVEVSO1xuICB9XG5cbiAgc2VhcmNoKHF1ZXJ5OiBRdWVyeSwgY2FsbGJhY2s6IChFcnJvcj8sIFJlc3VsdHM/KSA9PiB2b2lkKTogUHJvbWlzZUxpa2U8UmVzdWx0cz4gfCB2b2lkIHtcbiAgICBsZXQgcmVzcG9uc2UgPSB0aGlzLmZpcmVSZXF1ZXN0KHRoaXMuYnJpZGdlVXJsLCBxdWVyeS5idWlsZCgpLCBxdWVyeS5xdWVyeVBhcmFtcyk7XG4gICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICByZXNwb25zZS50aGVuKHJlcyA9PiBjYWxsYmFjayh1bmRlZmluZWQsIHJlcykpXG4gICAgICAgIC5jYXRjaChlcnIgPT4gY2FsbGJhY2soZXJyKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGZpcmVSZXF1ZXN0KHVybDogc3RyaW5nLCBib2R5OiBSZXF1ZXN0LCBxdWVyeVBhcmFtczogT2JqZWN0KTogUHJvbWlzZUxpa2U8UmVzdWx0cz4ge1xuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICB1cmk6IHRoaXMuYnJpZGdlVXJsLFxuICAgICAgcXM6IHF1ZXJ5UGFyYW1zLFxuICAgICAgYm9keTogT2JqZWN0LmFzc2lnbihib2R5LCB7IGNsaWVudEtleTogdGhpcy5jbGllbnRLZXkgfSksXG4gICAgICBqc29uOiB0cnVlLFxuXG4gICAgICB0aW1lb3V0OiAxNTAwLFxuICAgICAgbWF4QXR0ZW1wdHM6IDMsXG4gICAgICByZXRyeURlbGF5OiA4MCxcbiAgICAgIGZ1bGxSZXNwb25zZTogZmFsc2VcbiAgICB9O1xuICAgIHJldHVybiByZXF1ZXN0KG9wdGlvbnMpXG4gICAgICAudGhlbihyZXMgPT4gcmVzLnJlY29yZHMgPyBPYmplY3QuYXNzaWduKHJlcywgeyByZWNvcmRzOiByZXMucmVjb3Jkcy5tYXAodGhpcy5jb252ZXJ0UmVjb3JkRmllbGRzKSB9KSA6IHJlcyk7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRSZWNvcmRGaWVsZHMocmVjb3JkOiBSYXdSZWNvcmQpOiBSZWNvcmQge1xuICAgIGxldCBjb252ZXJ0ZWQgPSBPYmplY3QuYXNzaWduKHJlY29yZCwgeyBpZDogcmVjb3JkLl9pZCwgdXJsOiByZWNvcmQuX3UsIHRpdGxlOiByZWNvcmQuX3QgfSk7XG4gICAgZGVsZXRlIGNvbnZlcnRlZC5faWQ7XG4gICAgZGVsZXRlIGNvbnZlcnRlZC5fdTtcbiAgICBkZWxldGUgY29udmVydGVkLl90O1xuICAgIGlmIChyZWNvcmQuX3NuaXBwZXQpIHtcbiAgICAgIGNvbnZlcnRlZC5zbmlwcGV0ID0gcmVjb3JkLl9zbmlwcGV0O1xuICAgICAgZGVsZXRlIGNvbnZlcnRlZC5fc25pcHBldDtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnZlcnRlZDtcbiAgfVxufVxuXG5pbnRlcmZhY2UgUmF3UmVjb3JkIHtcbiAgX2lkOiBzdHJpbmc7XG4gIF91OiBzdHJpbmc7XG4gIF90OiBzdHJpbmc7XG4gIF9zbmlwcGV0Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5Q29uZmlndXJhdGlvbiB7XG4gIHVzZXJJZD86IHN0cmluZztcbiAgbGFuZ3VhZ2U/OiBzdHJpbmc7XG4gIGNvbGxlY3Rpb24/OiBzdHJpbmc7XG4gIGFyZWE/OiBzdHJpbmc7XG4gIGJpYXNpbmdQcm9maWxlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgUXVlcnkge1xuICBwcml2YXRlIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHByaXZhdGUgdW5wcm9jZXNzZWROYXZpZ2F0aW9uczogQXJyYXk8TmF2aWdhdGlvbj47XG4gIHF1ZXJ5UGFyYW1zOiBPYmplY3Q7XG5cbiAgY29uc3RydWN0b3IocXVlcnk6IHN0cmluZyA9ICcnKSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gPFJlcXVlc3Q+e307XG4gICAgdGhpcy51bnByb2Nlc3NlZE5hdmlnYXRpb25zID0gW107XG4gICAgdGhpcy5xdWVyeVBhcmFtcyA9IHt9O1xuXG4gICAgdGhpcy5yZXF1ZXN0LnF1ZXJ5ID0gcXVlcnk7XG4gICAgdGhpcy5yZXF1ZXN0LnNvcnQgPSBbXTtcbiAgICB0aGlzLnJlcXVlc3QuZmllbGRzID0gW107XG4gICAgdGhpcy5yZXF1ZXN0Lm9yRmllbGRzID0gW107XG4gICAgdGhpcy5yZXF1ZXN0LnJlZmluZW1lbnRzID0gW107XG4gICAgdGhpcy5yZXF1ZXN0LmN1c3RvbVVybFBhcmFtcyA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5pbmNsdWRlZE5hdmlnYXRpb25zID0gW107XG4gICAgdGhpcy5yZXF1ZXN0LmV4Y2x1ZGVkTmF2aWdhdGlvbnMgPSBbXTtcblxuICAgIHRoaXMucmVxdWVzdC53aWxkY2FyZFNlYXJjaEVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlcXVlc3QucHJ1bmVSZWZpbmVtZW50cyA9IHRydWU7XG4gIH1cblxuICB3aXRoQ29uZmlndXJhdGlvbihjb25maWd1cmF0aW9uOiBRdWVyeUNvbmZpZ3VyYXRpb24pOiBRdWVyeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLnJlcXVlc3QsIGNvbmZpZ3VyYXRpb24pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aFNlbGVjdGVkUmVmaW5lbWVudHMoLi4ucmVmaW5lbWVudHM6IEFycmF5PFNlbGVjdGVkVmFsdWVSZWZpbmVtZW50IHwgU2VsZWN0ZWRSYW5nZVJlZmluZW1lbnQ+KTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5yZWZpbmVtZW50cy5wdXNoKC4uLnJlZmluZW1lbnRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhSZWZpbmVtZW50cyhuYXZpZ2F0aW9uTmFtZTogc3RyaW5nLCAuLi5yZWZpbmVtZW50czogQXJyYXk8VmFsdWVSZWZpbmVtZW50IHwgUmFuZ2VSZWZpbmVtZW50Pik6IFF1ZXJ5IHtcbiAgICBsZXQgY29udmVydCA9IChyZWZpbmVtZW50OiBSZWZpbmVtZW50KSA9PiA8U2VsZWN0ZWRSZWZpbmVtZW50Pk9iamVjdC5hc3NpZ24ocmVmaW5lbWVudCwgeyBuYXZpZ2F0aW9uTmFtZSB9KTtcbiAgICB0aGlzLnJlcXVlc3QucmVmaW5lbWVudHMucHVzaCguLi5yZWZpbmVtZW50cy5tYXAoY29udmVydCkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aE5hdmlnYXRpb25zKC4uLm5hdmlnYXRpb25zOiBBcnJheTxOYXZpZ2F0aW9uPik6IFF1ZXJ5IHtcbiAgICB0aGlzLnVucHJvY2Vzc2VkTmF2aWdhdGlvbnMucHVzaCguLi5uYXZpZ2F0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoQ3VzdG9tVXJsUGFyYW1zKGN1c3RvbVVybFBhcmFtczogQXJyYXk8Q3VzdG9tVXJsUGFyYW0+IHwgc3RyaW5nKTogUXVlcnkge1xuICAgIGlmICh0eXBlb2YgY3VzdG9tVXJsUGFyYW1zID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5yZXF1ZXN0LmN1c3RvbVVybFBhcmFtcy5wdXNoKC4uLnRoaXMuY29udmVydFBhcmFtU3RyaW5nKGN1c3RvbVVybFBhcmFtcykpO1xuICAgIH0gZWxzZSBpZiAoY3VzdG9tVXJsUGFyYW1zIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMucmVxdWVzdC5jdXN0b21VcmxQYXJhbXMucHVzaCguLi5jdXN0b21VcmxQYXJhbXMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydFBhcmFtU3RyaW5nKGN1c3RvbVVybFBhcmFtczogc3RyaW5nKTogQXJyYXk8Q3VzdG9tVXJsUGFyYW0+IHtcbiAgICBsZXQgcGFyc2VkID0gcXMucGFyc2UoY3VzdG9tVXJsUGFyYW1zKTtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocGFyc2VkKS5yZWR1Y2UoKGNvbnZlcnRlZCwga2V5KSA9PiBjb252ZXJ0ZWQuY29uY2F0KHsga2V5LCB2YWx1ZTogcGFyc2VkW2tleV0gfSksIFtdKTtcbiAgfVxuXG4gIHdpdGhGaWVsZHMoLi4uZmllbGRzOiBBcnJheTxzdHJpbmc+KTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5maWVsZHMucHVzaCguLi5maWVsZHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aE9yRmllbGRzKC4uLm9yRmllbGRzOiBBcnJheTxzdHJpbmc+KTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5vckZpZWxkcy5wdXNoKC4uLm9yRmllbGRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhTb3J0cyguLi5zb3J0czogQXJyYXk8U29ydD4pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LnNvcnQucHVzaCguLi5zb3J0cyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoSW5jbHVkZWROYXZpZ2F0aW9ucyguLi5uYXZpZ2F0aW9uTmFtZXM6IEFycmF5PHN0cmluZz4pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LmluY2x1ZGVkTmF2aWdhdGlvbnMucHVzaCguLi5uYXZpZ2F0aW9uTmFtZXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aEV4Y2x1ZGVkTmF2aWdhdGlvbnMoLi4ubmF2aWdhdGlvbk5hbWVzOiBBcnJheTxzdHJpbmc+KTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5leGNsdWRlZE5hdmlnYXRpb25zLnB1c2goLi4ubmF2aWdhdGlvbk5hbWVzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhRdWVyeVBhcmFtcyhxdWVyeVBhcmFtczogT2JqZWN0IHwgc3RyaW5nKTogUXVlcnkge1xuICAgIHN3aXRjaCAodHlwZW9mIHF1ZXJ5UGFyYW1zKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0aGlzLCB7IHF1ZXJ5UGFyYW1zOiB0aGlzLmNvbnZlcnRRdWVyeVN0cmluZyg8c3RyaW5nPnF1ZXJ5UGFyYW1zKSB9KTtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRoaXMsIHsgcXVlcnlQYXJhbXMgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0UXVlcnlTdHJpbmcocXVlcnlQYXJhbXM6IHN0cmluZyk6IE9iamVjdCB7XG4gICAgcmV0dXJuIHFzLnBhcnNlKHF1ZXJ5UGFyYW1zKTtcbiAgfVxuXG4gIHJlZmluZUJ5VmFsdWUobmF2aWdhdGlvbk5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZXhjbHVkZTogYm9vbGVhbiA9IGZhbHNlKTogUXVlcnkge1xuICAgIHJldHVybiB0aGlzLndpdGhTZWxlY3RlZFJlZmluZW1lbnRzKDxTZWxlY3RlZFZhbHVlUmVmaW5lbWVudD57XG4gICAgICBuYXZpZ2F0aW9uTmFtZSxcbiAgICAgIHZhbHVlLFxuICAgICAgZXhjbHVkZSxcbiAgICAgIHR5cGU6ICdWYWx1ZSdcbiAgICB9KTtcbiAgfVxuXG4gIHJlZmluZUJ5UmFuZ2UobmF2aWdhdGlvbk5hbWU6IHN0cmluZywgbG93OiBudW1iZXIsIGhpZ2g6IG51bWJlciwgZXhjbHVkZTogYm9vbGVhbiA9IGZhbHNlKTogUXVlcnkge1xuICAgIHJldHVybiB0aGlzLndpdGhTZWxlY3RlZFJlZmluZW1lbnRzKDxTZWxlY3RlZFJhbmdlUmVmaW5lbWVudD57XG4gICAgICBuYXZpZ2F0aW9uTmFtZSxcbiAgICAgIGxvdyxcbiAgICAgIGhpZ2gsXG4gICAgICBleGNsdWRlLFxuICAgICAgdHlwZTogJ1JhbmdlJ1xuICAgIH0pO1xuICB9XG5cbiAgcmVzdHJpY3ROYXZpZ2F0aW9uKHJlc3RyaWN0TmF2aWdhdGlvbjogUmVzdHJpY3ROYXZpZ2F0aW9uKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5yZXN0cmljdE5hdmlnYXRpb24gPSByZXN0cmljdE5hdmlnYXRpb247XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBza2lwKHNraXA6IG51bWJlcik6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3Quc2tpcCA9IHNraXA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoUGFnZVNpemUocGFnZVNpemU6IG51bWJlcik6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QucGFnZVNpemUgPSBwYWdlU2l6ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhNYXRjaFN0cmF0ZWd5KG1hdGNoU3RyYXRlZ3k6IE1hdGNoU3RyYXRlZ3kpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0Lm1hdGNoU3RyYXRlZ3kgPSBtYXRjaFN0cmF0ZWd5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aEJpYXNpbmcoYmlhc2luZzogQmlhc2luZyk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QuYmlhc2luZyA9IGJpYXNpbmc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBlbmFibGVXaWxkY2FyZFNlYXJjaCgpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LndpbGRjYXJkU2VhcmNoRW5hYmxlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkaXNhYmxlQXV0b2NvcnJlY3Rpb24oKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5kaXNhYmxlQXV0b2NvcnJlY3Rpb24gPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGlzYWJsZUJpbmFyeVBheWxvYWQoKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5yZXR1cm5CaW5hcnkgPSBmYWxzZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFsbG93UHJ1bmVkUmVmaW5lbWVudHMoKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5wcnVuZVJlZmluZW1lbnRzID0gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBidWlsZCgpOiBSZXF1ZXN0IHtcbiAgICB0aGlzLnJlcXVlc3QucmVmaW5lbWVudHMucHVzaCguLi5OYXZpZ2F0aW9uQ29udmVydGVyLmNvbnZlcnQodGhpcy51bnByb2Nlc3NlZE5hdmlnYXRpb25zKSk7XG5cbiAgICByZXR1cm4gdGhpcy5jbGVhckVtcHR5QXJyYXlzKHRoaXMucmVxdWVzdCk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyRW1wdHlBcnJheXMocmVxdWVzdDogUmVxdWVzdCk6IFJlcXVlc3Qge1xuICAgIGZvciAobGV0IGtleSBpbiByZXF1ZXN0KSB7XG4gICAgICBpZiAocmVxdWVzdFtrZXldIGluc3RhbmNlb2YgQXJyYXkgJiYgcmVxdWVzdFtrZXldLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBkZWxldGUgcmVxdWVzdFtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
