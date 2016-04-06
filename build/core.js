/// <reference path="./all.d.ts" />
"use strict";
if (!global.Promise) {
    require('es6-promise').polyfill();
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

//# sourceMappingURL=data:application/json;base64,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LENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBQyxJQUFJLFdBQUksMEJBQW1CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7UUFFM0YsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7O0lBQzdDLENBQUM7SUFFTyxnQ0FBZ0IsR0FBeEIsVUFBeUIsT0FBZ0I7UUFDdkMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN4QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksS0FBSyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0QsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEIsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFSCxZQUFDO0FBQUQsQ0EvS0EsQUErS0MsSUFBQTtBQS9LWSxhQUFLLFFBK0tqQixDQUFBIiwiZmlsZSI6ImNvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9hbGwuZC50c1wiIC8+XG5cbmlmICghZ2xvYmFsLlByb21pc2UpIHtcbiAgcmVxdWlyZSgnZXM2LXByb21pc2UnKS5wb2x5ZmlsbCgpO1xufVxuaW1wb3J0IHJlcXVlc3QgPSByZXF1aXJlKCdyZXF1ZXN0cmV0cnknKTtcbmltcG9ydCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5pbXBvcnQgcXMgPSByZXF1aXJlKCdxcycpO1xuaW1wb3J0IHtcbiAgUmVxdWVzdCxcbiAgU2VsZWN0ZWRWYWx1ZVJlZmluZW1lbnQsXG4gIFNlbGVjdGVkUmFuZ2VSZWZpbmVtZW50LFxuICBTZWxlY3RlZFJlZmluZW1lbnQsXG4gIEN1c3RvbVVybFBhcmFtLFxuICBSZXN0cmljdE5hdmlnYXRpb24sXG4gIFNvcnQsXG4gIE1hdGNoU3RyYXRlZ3ksXG4gIEJpYXNpbmcsXG4gIEJpYXNcbn0gZnJvbSAnLi9yZXF1ZXN0LW1vZGVscyc7XG5pbXBvcnQge1xuICBSZXN1bHRzLFxuICBSZWNvcmQsXG4gIFZhbHVlUmVmaW5lbWVudCxcbiAgUmFuZ2VSZWZpbmVtZW50LFxuICBSZWZpbmVtZW50LFxuICBSZWZpbmVtZW50VHlwZSxcbiAgTmF2aWdhdGlvblxufSBmcm9tICcuL3Jlc3BvbnNlLW1vZGVscyc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uQ29udmVydGVyIH0gZnJvbSAnLi91dGlsJztcblxuY29uc3QgU0VBUkNIID0gJy9zZWFyY2gnO1xuY29uc3QgUkVGSU5FTUVOVFMgPSAnL3JlZmluZW1lbnRzJztcbmNvbnN0IFJFRklORU1FTlRfU0VBUkNIID0gJy9yZWZpbmVtZW50JztcbmNvbnN0IENMVVNURVIgPSAnL2NsdXN0ZXInO1xuXG5jb25zdCBCSUFTSU5HX0RFRkFVTFRTID0ge1xuICBiaWFzZXM6IFtdLFxuICBicmluZ1RvVG9wOiBbXSxcbiAgYXVnbWVudEJpYXNlczogZmFsc2Vcbn07XG5cbmV4cG9ydCBjbGFzcyBDbG91ZEJyaWRnZSB7XG5cbiAgcHJpdmF0ZSBicmlkZ2VVcmw6IHN0cmluZztcbiAgcHJpdmF0ZSBicmlkZ2VSZWZpbmVtZW50c1VybDogc3RyaW5nO1xuICBwcml2YXRlIGJyaWRnZVJlZmluZW1lbnRzU2VhcmNoVXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgYnJpZGdlQ2x1c3RlclVybDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpZW50S2V5OiBzdHJpbmcsIHByaXZhdGUgY3VzdG9tZXJJZDogc3RyaW5nKSB7XG4gICAgbGV0IGJhc2VVcmwgPSBgaHR0cHM6Ly8ke2N1c3RvbWVySWR9Lmdyb3VwYnljbG91ZC5jb206NDQzL2FwaS92MWA7XG4gICAgdGhpcy5icmlkZ2VVcmwgPSBiYXNlVXJsICsgU0VBUkNIO1xuICAgIHRoaXMuYnJpZGdlUmVmaW5lbWVudHNVcmwgPSBiYXNlVXJsICsgUkVGSU5FTUVOVFM7XG4gICAgdGhpcy5icmlkZ2VSZWZpbmVtZW50c1NlYXJjaFVybCA9IGJhc2VVcmwgKyBSRUZJTkVNRU5UX1NFQVJDSDtcbiAgICB0aGlzLmJyaWRnZUNsdXN0ZXJVcmwgPSBiYXNlVXJsICsgQ0xVU1RFUjtcbiAgfVxuXG4gIHNlYXJjaChxdWVyeTogUXVlcnksIGNhbGxiYWNrOiAoRXJyb3I/LCBSZXN1bHRzPykgPT4gdm9pZCk6IFByb21pc2VMaWtlPFJlc3VsdHM+IHwgdm9pZCB7XG4gICAgbGV0IHJlc3BvbnNlID0gdGhpcy5maXJlUmVxdWVzdCh0aGlzLmJyaWRnZVVybCwgcXVlcnkuYnVpbGQoKSwgcXVlcnkucXVlcnlQYXJhbXMpO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgcmVzcG9uc2UudGhlbihyZXMgPT4gY2FsbGJhY2sodW5kZWZpbmVkLCByZXMpKVxuICAgICAgICAuY2F0Y2goZXJyID0+IGNhbGxiYWNrKGVycikpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBmaXJlUmVxdWVzdCh1cmw6IHN0cmluZywgYm9keTogUmVxdWVzdCwgcXVlcnlQYXJhbXM6IE9iamVjdCk6IFByb21pc2VMaWtlPFJlc3VsdHM+IHtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgdXJpOiB0aGlzLmJyaWRnZVVybCxcbiAgICAgIHFzOiBxdWVyeVBhcmFtcyxcbiAgICAgIGJvZHk6IGFzc2lnbihib2R5LCB7IGNsaWVudEtleTogdGhpcy5jbGllbnRLZXkgfSksXG4gICAgICBqc29uOiB0cnVlLFxuXG4gICAgICB0aW1lb3V0OiAxNTAwLFxuICAgICAgbWF4QXR0ZW1wdHM6IDMsXG4gICAgICByZXRyeURlbGF5OiA4MCxcbiAgICAgIGZ1bGxSZXNwb25zZTogZmFsc2VcbiAgICB9O1xuICAgIHJldHVybiByZXF1ZXN0KG9wdGlvbnMpXG4gICAgICAudGhlbihyZXMgPT4gcmVzLnJlY29yZHMgPyBhc3NpZ24ocmVzLCB7IHJlY29yZHM6IHJlcy5yZWNvcmRzLm1hcCh0aGlzLmNvbnZlcnRSZWNvcmRGaWVsZHMpIH0pIDogcmVzKTtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydFJlY29yZEZpZWxkcyhyZWNvcmQ6IFJhd1JlY29yZCk6IFJlY29yZCB7XG4gICAgbGV0IGNvbnZlcnRlZCA9IGFzc2lnbihyZWNvcmQsIHsgaWQ6IHJlY29yZC5faWQsIHVybDogcmVjb3JkLl91LCB0aXRsZTogcmVjb3JkLl90IH0pO1xuICAgIGRlbGV0ZSBjb252ZXJ0ZWQuX2lkO1xuICAgIGRlbGV0ZSBjb252ZXJ0ZWQuX3U7XG4gICAgZGVsZXRlIGNvbnZlcnRlZC5fdDtcbiAgICBpZiAocmVjb3JkLl9zbmlwcGV0KSB7XG4gICAgICBjb252ZXJ0ZWQuc25pcHBldCA9IHJlY29yZC5fc25pcHBldDtcbiAgICAgIGRlbGV0ZSBjb252ZXJ0ZWQuX3NuaXBwZXQ7XG4gICAgfVxuICAgIHJldHVybiBjb252ZXJ0ZWQ7XG4gIH1cbn1cblxuaW50ZXJmYWNlIFJhd1JlY29yZCB7XG4gIF9pZDogc3RyaW5nO1xuICBfdTogc3RyaW5nO1xuICBfdDogc3RyaW5nO1xuICBfc25pcHBldD86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBRdWVyeUNvbmZpZ3VyYXRpb24ge1xuICB1c2VySWQ/OiBzdHJpbmc7XG4gIGxhbmd1YWdlPzogc3RyaW5nO1xuICBjb2xsZWN0aW9uPzogc3RyaW5nO1xuICBhcmVhPzogc3RyaW5nO1xuICBiaWFzaW5nUHJvZmlsZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFF1ZXJ5IHtcbiAgcHJpdmF0ZSByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwcml2YXRlIHVucHJvY2Vzc2VkTmF2aWdhdGlvbnM6IEFycmF5PE5hdmlnYXRpb24+O1xuICBxdWVyeVBhcmFtczogT2JqZWN0O1xuXG4gIGNvbnN0cnVjdG9yKHF1ZXJ5OiBzdHJpbmcgPSAnJykge1xuICAgIHRoaXMucmVxdWVzdCA9IDxSZXF1ZXN0Pnt9O1xuICAgIHRoaXMudW5wcm9jZXNzZWROYXZpZ2F0aW9ucyA9IFtdO1xuICAgIHRoaXMucXVlcnlQYXJhbXMgPSB7fTtcblxuICAgIHRoaXMucmVxdWVzdC5xdWVyeSA9IHF1ZXJ5O1xuICAgIHRoaXMucmVxdWVzdC5zb3J0ID0gW107XG4gICAgdGhpcy5yZXF1ZXN0LmZpZWxkcyA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5vckZpZWxkcyA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5yZWZpbmVtZW50cyA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5jdXN0b21VcmxQYXJhbXMgPSBbXTtcbiAgICB0aGlzLnJlcXVlc3QuaW5jbHVkZWROYXZpZ2F0aW9ucyA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5leGNsdWRlZE5hdmlnYXRpb25zID0gW107XG5cbiAgICB0aGlzLnJlcXVlc3Qud2lsZGNhcmRTZWFyY2hFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5yZXF1ZXN0LnBydW5lUmVmaW5lbWVudHMgPSB0cnVlO1xuICB9XG5cbiAgd2l0aENvbmZpZ3VyYXRpb24oY29uZmlndXJhdGlvbjogUXVlcnlDb25maWd1cmF0aW9uKTogUXVlcnkge1xuICAgIGFzc2lnbih0aGlzLnJlcXVlc3QsIGNvbmZpZ3VyYXRpb24pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aFNlbGVjdGVkUmVmaW5lbWVudHMoLi4ucmVmaW5lbWVudHM6IEFycmF5PFNlbGVjdGVkVmFsdWVSZWZpbmVtZW50IHwgU2VsZWN0ZWRSYW5nZVJlZmluZW1lbnQ+KTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5yZWZpbmVtZW50cy5wdXNoKC4uLnJlZmluZW1lbnRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhSZWZpbmVtZW50cyhuYXZpZ2F0aW9uTmFtZTogc3RyaW5nLCAuLi5yZWZpbmVtZW50czogQXJyYXk8VmFsdWVSZWZpbmVtZW50IHwgUmFuZ2VSZWZpbmVtZW50Pik6IFF1ZXJ5IHtcbiAgICBsZXQgY29udmVydCA9IChyZWZpbmVtZW50OiBSZWZpbmVtZW50KSA9PiA8U2VsZWN0ZWRSZWZpbmVtZW50PmFzc2lnbihyZWZpbmVtZW50LCB7IG5hdmlnYXRpb25OYW1lIH0pO1xuICAgIHRoaXMucmVxdWVzdC5yZWZpbmVtZW50cy5wdXNoKC4uLnJlZmluZW1lbnRzLm1hcChjb252ZXJ0KSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoTmF2aWdhdGlvbnMoLi4ubmF2aWdhdGlvbnM6IEFycmF5PE5hdmlnYXRpb24+KTogUXVlcnkge1xuICAgIHRoaXMudW5wcm9jZXNzZWROYXZpZ2F0aW9ucy5wdXNoKC4uLm5hdmlnYXRpb25zKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhDdXN0b21VcmxQYXJhbXMoY3VzdG9tVXJsUGFyYW1zOiBBcnJheTxDdXN0b21VcmxQYXJhbT4gfCBzdHJpbmcpOiBRdWVyeSB7XG4gICAgaWYgKHR5cGVvZiBjdXN0b21VcmxQYXJhbXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnJlcXVlc3QuY3VzdG9tVXJsUGFyYW1zLnB1c2goLi4udGhpcy5jb252ZXJ0UGFyYW1TdHJpbmcoY3VzdG9tVXJsUGFyYW1zKSk7XG4gICAgfSBlbHNlIGlmIChjdXN0b21VcmxQYXJhbXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5yZXF1ZXN0LmN1c3RvbVVybFBhcmFtcy5wdXNoKC4uLmN1c3RvbVVybFBhcmFtcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0UGFyYW1TdHJpbmcoY3VzdG9tVXJsUGFyYW1zOiBzdHJpbmcpOiBBcnJheTxDdXN0b21VcmxQYXJhbT4ge1xuICAgIGxldCBwYXJzZWQgPSBxcy5wYXJzZShjdXN0b21VcmxQYXJhbXMpO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhwYXJzZWQpLnJlZHVjZSgoY29udmVydGVkLCBrZXkpID0+IGNvbnZlcnRlZC5jb25jYXQoeyBrZXksIHZhbHVlOiBwYXJzZWRba2V5XSB9KSwgW10pO1xuICB9XG5cbiAgd2l0aEZpZWxkcyguLi5maWVsZHM6IEFycmF5PHN0cmluZz4pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LmZpZWxkcy5wdXNoKC4uLmZpZWxkcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoT3JGaWVsZHMoLi4ub3JGaWVsZHM6IEFycmF5PHN0cmluZz4pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0Lm9yRmllbGRzLnB1c2goLi4ub3JGaWVsZHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aFNvcnRzKC4uLnNvcnRzOiBBcnJheTxTb3J0Pik6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3Quc29ydC5wdXNoKC4uLnNvcnRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhJbmNsdWRlZE5hdmlnYXRpb25zKC4uLm5hdmlnYXRpb25OYW1lczogQXJyYXk8c3RyaW5nPik6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QuaW5jbHVkZWROYXZpZ2F0aW9ucy5wdXNoKC4uLm5hdmlnYXRpb25OYW1lcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoRXhjbHVkZWROYXZpZ2F0aW9ucyguLi5uYXZpZ2F0aW9uTmFtZXM6IEFycmF5PHN0cmluZz4pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LmV4Y2x1ZGVkTmF2aWdhdGlvbnMucHVzaCguLi5uYXZpZ2F0aW9uTmFtZXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aFF1ZXJ5UGFyYW1zKHF1ZXJ5UGFyYW1zOiBPYmplY3QgfCBzdHJpbmcpOiBRdWVyeSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcXVlcnlQYXJhbXMpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIHJldHVybiBhc3NpZ24odGhpcywgeyBxdWVyeVBhcmFtczogdGhpcy5jb252ZXJ0UXVlcnlTdHJpbmcoPHN0cmluZz5xdWVyeVBhcmFtcykgfSk7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gYXNzaWduKHRoaXMsIHsgcXVlcnlQYXJhbXMgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0UXVlcnlTdHJpbmcocXVlcnlQYXJhbXM6IHN0cmluZyk6IE9iamVjdCB7XG4gICAgcmV0dXJuIHFzLnBhcnNlKHF1ZXJ5UGFyYW1zKTtcbiAgfVxuXG4gIHJlZmluZUJ5VmFsdWUobmF2aWdhdGlvbk5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZXhjbHVkZTogYm9vbGVhbiA9IGZhbHNlKTogUXVlcnkge1xuICAgIHJldHVybiB0aGlzLndpdGhTZWxlY3RlZFJlZmluZW1lbnRzKDxTZWxlY3RlZFZhbHVlUmVmaW5lbWVudD57XG4gICAgICBuYXZpZ2F0aW9uTmFtZSxcbiAgICAgIHZhbHVlLFxuICAgICAgZXhjbHVkZSxcbiAgICAgIHR5cGU6ICdWYWx1ZSdcbiAgICB9KTtcbiAgfVxuXG4gIHJlZmluZUJ5UmFuZ2UobmF2aWdhdGlvbk5hbWU6IHN0cmluZywgbG93OiBudW1iZXIsIGhpZ2g6IG51bWJlciwgZXhjbHVkZTogYm9vbGVhbiA9IGZhbHNlKTogUXVlcnkge1xuICAgIHJldHVybiB0aGlzLndpdGhTZWxlY3RlZFJlZmluZW1lbnRzKDxTZWxlY3RlZFJhbmdlUmVmaW5lbWVudD57XG4gICAgICBuYXZpZ2F0aW9uTmFtZSxcbiAgICAgIGxvdyxcbiAgICAgIGhpZ2gsXG4gICAgICBleGNsdWRlLFxuICAgICAgdHlwZTogJ1JhbmdlJ1xuICAgIH0pO1xuICB9XG5cbiAgcmVzdHJpY3ROYXZpZ2F0aW9uKHJlc3RyaWN0TmF2aWdhdGlvbjogUmVzdHJpY3ROYXZpZ2F0aW9uKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5yZXN0cmljdE5hdmlnYXRpb24gPSByZXN0cmljdE5hdmlnYXRpb247XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBza2lwKHNraXA6IG51bWJlcik6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3Quc2tpcCA9IHNraXA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoUGFnZVNpemUocGFnZVNpemU6IG51bWJlcik6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QucGFnZVNpemUgPSBwYWdlU2l6ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhNYXRjaFN0cmF0ZWd5KG1hdGNoU3RyYXRlZ3k6IE1hdGNoU3RyYXRlZ3kpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0Lm1hdGNoU3RyYXRlZ3kgPSBtYXRjaFN0cmF0ZWd5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aEJpYXNpbmcoYmlhc2luZzogQmlhc2luZyk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QuYmlhc2luZyA9IGJpYXNpbmc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBlbmFibGVXaWxkY2FyZFNlYXJjaCgpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LndpbGRjYXJkU2VhcmNoRW5hYmxlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkaXNhYmxlQXV0b2NvcnJlY3Rpb24oKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5kaXNhYmxlQXV0b2NvcnJlY3Rpb24gPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGlzYWJsZUJpbmFyeVBheWxvYWQoKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5yZXR1cm5CaW5hcnkgPSBmYWxzZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFsbG93UHJ1bmVkUmVmaW5lbWVudHMoKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5wcnVuZVJlZmluZW1lbnRzID0gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBidWlsZCgpOiBSZXF1ZXN0IHtcbiAgICB0aGlzLnJlcXVlc3QucmVmaW5lbWVudHMucHVzaCguLi5OYXZpZ2F0aW9uQ29udmVydGVyLmNvbnZlcnQodGhpcy51bnByb2Nlc3NlZE5hdmlnYXRpb25zKSk7XG5cbiAgICByZXR1cm4gdGhpcy5jbGVhckVtcHR5QXJyYXlzKHRoaXMucmVxdWVzdCk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyRW1wdHlBcnJheXMocmVxdWVzdDogUmVxdWVzdCk6IFJlcXVlc3Qge1xuICAgIGZvciAobGV0IGtleSBpbiByZXF1ZXN0KSB7XG4gICAgICBpZiAocmVxdWVzdFtrZXldIGluc3RhbmNlb2YgQXJyYXkgJiYgcmVxdWVzdFtrZXldLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBkZWxldGUgcmVxdWVzdFtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
