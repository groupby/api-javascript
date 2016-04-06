/// <reference path="./all.d.ts" />
"use strict";
if (!global.Promise) {
    require('any-promise/register')('bluebird');
}
var request = require('requestretry');
var assign = require('object-assign');
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
            body: assign(body, { clientKey: this.clientKey }),
            json: true,
            timeout: 1500,
            maxAttempts: 3,
            retryDelay: 80,
            fullResponse: false
        };
        return request(options)
            .then(function (res) { return res.records ? assign(res, { records: res.records.map(_this.convertRecordFields) }) : res; });
    };
    CloudBridge.prototype.convertRecordFields = function (record) {
        var converted = assign(record, { id: record._id, url: record._u, title: record._t });
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
        assign(this.request, configuration);
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
        var convert = function (refinement) { return assign(refinement, { navigationName: navigationName }); };
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
                return assign(this, { queryParams: this.convertQueryString(queryParams) });
            case 'object':
                return assign(this, { queryParams: queryParams });
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

//# sourceMappingURL=data:application/json;base64,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QUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFDLElBQUksV0FBSSwwQkFBbUIsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsQ0FBQztRQUUzRixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7SUFDN0MsQ0FBQztJQUVPLGdDQUFnQixHQUF4QixVQUF5QixPQUFnQjtRQUN2QyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxLQUFLLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QixDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVILFlBQUM7QUFBRCxDQS9LQSxBQStLQyxJQUFBO0FBL0tZLGFBQUssUUErS2pCLENBQUEiLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2FsbC5kLnRzXCIgLz5cblxuaWYgKCFnbG9iYWwuUHJvbWlzZSkge1xuICByZXF1aXJlKCdhbnktcHJvbWlzZS9yZWdpc3RlcicpKCdibHVlYmlyZCcpO1xufVxuaW1wb3J0IHJlcXVlc3QgPSByZXF1aXJlKCdyZXF1ZXN0cmV0cnknKTtcbmltcG9ydCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5pbXBvcnQgcXMgPSByZXF1aXJlKCdxcycpO1xuaW1wb3J0IHtcbiAgUmVxdWVzdCxcbiAgU2VsZWN0ZWRWYWx1ZVJlZmluZW1lbnQsXG4gIFNlbGVjdGVkUmFuZ2VSZWZpbmVtZW50LFxuICBTZWxlY3RlZFJlZmluZW1lbnQsXG4gIEN1c3RvbVVybFBhcmFtLFxuICBSZXN0cmljdE5hdmlnYXRpb24sXG4gIFNvcnQsXG4gIE1hdGNoU3RyYXRlZ3ksXG4gIEJpYXNpbmcsXG4gIEJpYXNcbn0gZnJvbSAnLi9yZXF1ZXN0LW1vZGVscyc7XG5pbXBvcnQge1xuICBSZXN1bHRzLFxuICBSZWNvcmQsXG4gIFZhbHVlUmVmaW5lbWVudCxcbiAgUmFuZ2VSZWZpbmVtZW50LFxuICBSZWZpbmVtZW50LFxuICBSZWZpbmVtZW50VHlwZSxcbiAgTmF2aWdhdGlvblxufSBmcm9tICcuL3Jlc3BvbnNlLW1vZGVscyc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uQ29udmVydGVyIH0gZnJvbSAnLi91dGlsJztcblxuY29uc3QgU0VBUkNIID0gJy9zZWFyY2gnO1xuY29uc3QgUkVGSU5FTUVOVFMgPSAnL3JlZmluZW1lbnRzJztcbmNvbnN0IFJFRklORU1FTlRfU0VBUkNIID0gJy9yZWZpbmVtZW50JztcbmNvbnN0IENMVVNURVIgPSAnL2NsdXN0ZXInO1xuXG5jb25zdCBCSUFTSU5HX0RFRkFVTFRTID0ge1xuICBiaWFzZXM6IFtdLFxuICBicmluZ1RvVG9wOiBbXSxcbiAgYXVnbWVudEJpYXNlczogZmFsc2Vcbn07XG5cbmV4cG9ydCBjbGFzcyBDbG91ZEJyaWRnZSB7XG5cbiAgcHJpdmF0ZSBicmlkZ2VVcmw6IHN0cmluZztcbiAgcHJpdmF0ZSBicmlkZ2VSZWZpbmVtZW50c1VybDogc3RyaW5nO1xuICBwcml2YXRlIGJyaWRnZVJlZmluZW1lbnRzU2VhcmNoVXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgYnJpZGdlQ2x1c3RlclVybDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpZW50S2V5OiBzdHJpbmcsIHByaXZhdGUgY3VzdG9tZXJJZDogc3RyaW5nKSB7XG4gICAgbGV0IGJhc2VVcmwgPSBgaHR0cHM6Ly8ke2N1c3RvbWVySWR9Lmdyb3VwYnljbG91ZC5jb206NDQzL2FwaS92MWA7XG4gICAgdGhpcy5icmlkZ2VVcmwgPSBiYXNlVXJsICsgU0VBUkNIO1xuICAgIHRoaXMuYnJpZGdlUmVmaW5lbWVudHNVcmwgPSBiYXNlVXJsICsgUkVGSU5FTUVOVFM7XG4gICAgdGhpcy5icmlkZ2VSZWZpbmVtZW50c1NlYXJjaFVybCA9IGJhc2VVcmwgKyBSRUZJTkVNRU5UX1NFQVJDSDtcbiAgICB0aGlzLmJyaWRnZUNsdXN0ZXJVcmwgPSBiYXNlVXJsICsgQ0xVU1RFUjtcbiAgfVxuXG4gIHNlYXJjaChxdWVyeTogUXVlcnksIGNhbGxiYWNrOiAoRXJyb3I/LCBSZXN1bHRzPykgPT4gdm9pZCk6IFByb21pc2VMaWtlPFJlc3VsdHM+IHwgdm9pZCB7XG4gICAgbGV0IHJlc3BvbnNlID0gdGhpcy5maXJlUmVxdWVzdCh0aGlzLmJyaWRnZVVybCwgcXVlcnkuYnVpbGQoKSwgcXVlcnkucXVlcnlQYXJhbXMpO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgcmVzcG9uc2UudGhlbihyZXMgPT4gY2FsbGJhY2sodW5kZWZpbmVkLCByZXMpKVxuICAgICAgICAuY2F0Y2goZXJyID0+IGNhbGxiYWNrKGVycikpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBmaXJlUmVxdWVzdCh1cmw6IHN0cmluZywgYm9keTogUmVxdWVzdCwgcXVlcnlQYXJhbXM6IE9iamVjdCk6IFByb21pc2VMaWtlPFJlc3VsdHM+IHtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJpOiB0aGlzLmJyaWRnZVVybCxcbiAgICAgIHFzOiBxdWVyeVBhcmFtcyxcbiAgICAgIGJvZHk6IGFzc2lnbihib2R5LCB7IGNsaWVudEtleTogdGhpcy5jbGllbnRLZXkgfSksXG4gICAgICBqc29uOiB0cnVlLFxuXG4gICAgICB0aW1lb3V0OiAxNTAwLFxuICAgICAgbWF4QXR0ZW1wdHM6IDMsXG4gICAgICByZXRyeURlbGF5OiA4MCxcbiAgICAgIGZ1bGxSZXNwb25zZTogZmFsc2VcbiAgICB9O1xuICAgIHJldHVybiByZXF1ZXN0KG9wdGlvbnMpXG4gICAgICAudGhlbihyZXMgPT4gcmVzLnJlY29yZHMgPyBhc3NpZ24ocmVzLCB7IHJlY29yZHM6IHJlcy5yZWNvcmRzLm1hcCh0aGlzLmNvbnZlcnRSZWNvcmRGaWVsZHMpIH0pIDogcmVzKTtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydFJlY29yZEZpZWxkcyhyZWNvcmQ6IFJhd1JlY29yZCk6IFJlY29yZCB7XG4gICAgbGV0IGNvbnZlcnRlZCA9IGFzc2lnbihyZWNvcmQsIHsgaWQ6IHJlY29yZC5faWQsIHVybDogcmVjb3JkLl91LCB0aXRsZTogcmVjb3JkLl90IH0pO1xuICAgIGRlbGV0ZSBjb252ZXJ0ZWQuX2lkO1xuICAgIGRlbGV0ZSBjb252ZXJ0ZWQuX3U7XG4gICAgZGVsZXRlIGNvbnZlcnRlZC5fdDtcbiAgICBpZiAocmVjb3JkLl9zbmlwcGV0KSB7XG4gICAgICBjb252ZXJ0ZWQuc25pcHBldCA9IHJlY29yZC5fc25pcHBldDtcbiAgICAgIGRlbGV0ZSBjb252ZXJ0ZWQuX3NuaXBwZXQ7XG4gICAgfVxuICAgIHJldHVybiBjb252ZXJ0ZWQ7XG4gIH1cbn1cblxuaW50ZXJmYWNlIFJhd1JlY29yZCB7XG4gIF9pZDogc3RyaW5nO1xuICBfdTogc3RyaW5nO1xuICBfdDogc3RyaW5nO1xuICBfc25pcHBldD86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBRdWVyeUNvbmZpZ3VyYXRpb24ge1xuICB1c2VySWQ/OiBzdHJpbmc7XG4gIGxhbmd1YWdlPzogc3RyaW5nO1xuICBjb2xsZWN0aW9uPzogc3RyaW5nO1xuICBhcmVhPzogc3RyaW5nO1xuICBiaWFzaW5nUHJvZmlsZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFF1ZXJ5IHtcbiAgcHJpdmF0ZSByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwcml2YXRlIHVucHJvY2Vzc2VkTmF2aWdhdGlvbnM6IEFycmF5PE5hdmlnYXRpb24+O1xuICBxdWVyeVBhcmFtczogT2JqZWN0O1xuXG4gIGNvbnN0cnVjdG9yKHF1ZXJ5OiBzdHJpbmcgPSAnJykge1xuICAgIHRoaXMucmVxdWVzdCA9IDxSZXF1ZXN0Pnt9O1xuICAgIHRoaXMudW5wcm9jZXNzZWROYXZpZ2F0aW9ucyA9IFtdO1xuICAgIHRoaXMucXVlcnlQYXJhbXMgPSB7fTtcblxuICAgIHRoaXMucmVxdWVzdC5xdWVyeSA9IHF1ZXJ5O1xuICAgIHRoaXMucmVxdWVzdC5zb3J0ID0gW107XG4gICAgdGhpcy5yZXF1ZXN0LmZpZWxkcyA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5vckZpZWxkcyA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5yZWZpbmVtZW50cyA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5jdXN0b21VcmxQYXJhbXMgPSBbXTtcbiAgICB0aGlzLnJlcXVlc3QuaW5jbHVkZWROYXZpZ2F0aW9ucyA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5leGNsdWRlZE5hdmlnYXRpb25zID0gW107XG5cbiAgICB0aGlzLnJlcXVlc3Qud2lsZGNhcmRTZWFyY2hFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5yZXF1ZXN0LnBydW5lUmVmaW5lbWVudHMgPSB0cnVlO1xuICB9XG5cbiAgd2l0aENvbmZpZ3VyYXRpb24oY29uZmlndXJhdGlvbjogUXVlcnlDb25maWd1cmF0aW9uKTogUXVlcnkge1xuICAgIGFzc2lnbih0aGlzLnJlcXVlc3QsIGNvbmZpZ3VyYXRpb24pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aFNlbGVjdGVkUmVmaW5lbWVudHMoLi4ucmVmaW5lbWVudHM6IEFycmF5PFNlbGVjdGVkVmFsdWVSZWZpbmVtZW50IHwgU2VsZWN0ZWRSYW5nZVJlZmluZW1lbnQ+KTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5yZWZpbmVtZW50cy5wdXNoKC4uLnJlZmluZW1lbnRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhSZWZpbmVtZW50cyhuYXZpZ2F0aW9uTmFtZTogc3RyaW5nLCAuLi5yZWZpbmVtZW50czogQXJyYXk8VmFsdWVSZWZpbmVtZW50IHwgUmFuZ2VSZWZpbmVtZW50Pik6IFF1ZXJ5IHtcbiAgICBsZXQgY29udmVydCA9IChyZWZpbmVtZW50OiBSZWZpbmVtZW50KSA9PiA8U2VsZWN0ZWRSZWZpbmVtZW50PmFzc2lnbihyZWZpbmVtZW50LCB7IG5hdmlnYXRpb25OYW1lIH0pO1xuICAgIHRoaXMucmVxdWVzdC5yZWZpbmVtZW50cy5wdXNoKC4uLnJlZmluZW1lbnRzLm1hcChjb252ZXJ0KSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoTmF2aWdhdGlvbnMoLi4ubmF2aWdhdGlvbnM6IEFycmF5PE5hdmlnYXRpb24+KTogUXVlcnkge1xuICAgIHRoaXMudW5wcm9jZXNzZWROYXZpZ2F0aW9ucy5wdXNoKC4uLm5hdmlnYXRpb25zKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhDdXN0b21VcmxQYXJhbXMoY3VzdG9tVXJsUGFyYW1zOiBBcnJheTxDdXN0b21VcmxQYXJhbT4gfCBzdHJpbmcpOiBRdWVyeSB7XG4gICAgaWYgKHR5cGVvZiBjdXN0b21VcmxQYXJhbXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnJlcXVlc3QuY3VzdG9tVXJsUGFyYW1zLnB1c2goLi4udGhpcy5jb252ZXJ0UGFyYW1TdHJpbmcoY3VzdG9tVXJsUGFyYW1zKSk7XG4gICAgfSBlbHNlIGlmIChjdXN0b21VcmxQYXJhbXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5yZXF1ZXN0LmN1c3RvbVVybFBhcmFtcy5wdXNoKC4uLmN1c3RvbVVybFBhcmFtcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0UGFyYW1TdHJpbmcoY3VzdG9tVXJsUGFyYW1zOiBzdHJpbmcpOiBBcnJheTxDdXN0b21VcmxQYXJhbT4ge1xuICAgIGxldCBwYXJzZWQgPSBxcy5wYXJzZShjdXN0b21VcmxQYXJhbXMpO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhwYXJzZWQpLnJlZHVjZSgoY29udmVydGVkLCBrZXkpID0+IGNvbnZlcnRlZC5jb25jYXQoeyBrZXksIHZhbHVlOiBwYXJzZWRba2V5XSB9KSwgW10pO1xuICB9XG5cbiAgd2l0aEZpZWxkcyguLi5maWVsZHM6IEFycmF5PHN0cmluZz4pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LmZpZWxkcy5wdXNoKC4uLmZpZWxkcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoT3JGaWVsZHMoLi4ub3JGaWVsZHM6IEFycmF5PHN0cmluZz4pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0Lm9yRmllbGRzLnB1c2goLi4ub3JGaWVsZHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aFNvcnRzKC4uLnNvcnRzOiBBcnJheTxTb3J0Pik6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3Quc29ydC5wdXNoKC4uLnNvcnRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhJbmNsdWRlZE5hdmlnYXRpb25zKC4uLm5hdmlnYXRpb25OYW1lczogQXJyYXk8c3RyaW5nPik6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QuaW5jbHVkZWROYXZpZ2F0aW9ucy5wdXNoKC4uLm5hdmlnYXRpb25OYW1lcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoRXhjbHVkZWROYXZpZ2F0aW9ucyguLi5uYXZpZ2F0aW9uTmFtZXM6IEFycmF5PHN0cmluZz4pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LmV4Y2x1ZGVkTmF2aWdhdGlvbnMucHVzaCguLi5uYXZpZ2F0aW9uTmFtZXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aFF1ZXJ5UGFyYW1zKHF1ZXJ5UGFyYW1zOiBPYmplY3QgfCBzdHJpbmcpOiBRdWVyeSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcXVlcnlQYXJhbXMpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIHJldHVybiBhc3NpZ24odGhpcywgeyBxdWVyeVBhcmFtczogdGhpcy5jb252ZXJ0UXVlcnlTdHJpbmcoPHN0cmluZz5xdWVyeVBhcmFtcykgfSk7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gYXNzaWduKHRoaXMsIHsgcXVlcnlQYXJhbXMgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0UXVlcnlTdHJpbmcocXVlcnlQYXJhbXM6IHN0cmluZyk6IE9iamVjdCB7XG4gICAgcmV0dXJuIHFzLnBhcnNlKHF1ZXJ5UGFyYW1zKTtcbiAgfVxuXG4gIHJlZmluZUJ5VmFsdWUobmF2aWdhdGlvbk5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZXhjbHVkZTogYm9vbGVhbiA9IGZhbHNlKTogUXVlcnkge1xuICAgIHJldHVybiB0aGlzLndpdGhTZWxlY3RlZFJlZmluZW1lbnRzKDxTZWxlY3RlZFZhbHVlUmVmaW5lbWVudD57XG4gICAgICBuYXZpZ2F0aW9uTmFtZSxcbiAgICAgIHZhbHVlLFxuICAgICAgZXhjbHVkZSxcbiAgICAgIHR5cGU6ICdWYWx1ZSdcbiAgICB9KTtcbiAgfVxuXG4gIHJlZmluZUJ5UmFuZ2UobmF2aWdhdGlvbk5hbWU6IHN0cmluZywgbG93OiBudW1iZXIsIGhpZ2g6IG51bWJlciwgZXhjbHVkZTogYm9vbGVhbiA9IGZhbHNlKTogUXVlcnkge1xuICAgIHJldHVybiB0aGlzLndpdGhTZWxlY3RlZFJlZmluZW1lbnRzKDxTZWxlY3RlZFJhbmdlUmVmaW5lbWVudD57XG4gICAgICBuYXZpZ2F0aW9uTmFtZSxcbiAgICAgIGxvdyxcbiAgICAgIGhpZ2gsXG4gICAgICBleGNsdWRlLFxuICAgICAgdHlwZTogJ1JhbmdlJ1xuICAgIH0pO1xuICB9XG5cbiAgcmVzdHJpY3ROYXZpZ2F0aW9uKHJlc3RyaWN0TmF2aWdhdGlvbjogUmVzdHJpY3ROYXZpZ2F0aW9uKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5yZXN0cmljdE5hdmlnYXRpb24gPSByZXN0cmljdE5hdmlnYXRpb247XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBza2lwKHNraXA6IG51bWJlcik6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3Quc2tpcCA9IHNraXA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoUGFnZVNpemUocGFnZVNpemU6IG51bWJlcik6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QucGFnZVNpemUgPSBwYWdlU2l6ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhNYXRjaFN0cmF0ZWd5KG1hdGNoU3RyYXRlZ3k6IE1hdGNoU3RyYXRlZ3kpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0Lm1hdGNoU3RyYXRlZ3kgPSBtYXRjaFN0cmF0ZWd5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aEJpYXNpbmcoYmlhc2luZzogQmlhc2luZyk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QuYmlhc2luZyA9IGJpYXNpbmc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBlbmFibGVXaWxkY2FyZFNlYXJjaCgpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LndpbGRjYXJkU2VhcmNoRW5hYmxlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkaXNhYmxlQXV0b2NvcnJlY3Rpb24oKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5kaXNhYmxlQXV0b2NvcnJlY3Rpb24gPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGlzYWJsZUJpbmFyeVBheWxvYWQoKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5yZXR1cm5CaW5hcnkgPSBmYWxzZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFsbG93UHJ1bmVkUmVmaW5lbWVudHMoKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5wcnVuZVJlZmluZW1lbnRzID0gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBidWlsZCgpOiBSZXF1ZXN0IHtcbiAgICB0aGlzLnJlcXVlc3QucmVmaW5lbWVudHMucHVzaCguLi5OYXZpZ2F0aW9uQ29udmVydGVyLmNvbnZlcnQodGhpcy51bnByb2Nlc3NlZE5hdmlnYXRpb25zKSk7XG5cbiAgICByZXR1cm4gdGhpcy5jbGVhckVtcHR5QXJyYXlzKHRoaXMucmVxdWVzdCk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyRW1wdHlBcnJheXMocmVxdWVzdDogUmVxdWVzdCk6IFJlcXVlc3Qge1xuICAgIGZvciAobGV0IGtleSBpbiByZXF1ZXN0KSB7XG4gICAgICBpZiAocmVxdWVzdFtrZXldIGluc3RhbmNlb2YgQXJyYXkgJiYgcmVxdWVzdFtrZXldLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBkZWxldGUgcmVxdWVzdFtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
