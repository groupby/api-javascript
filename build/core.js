/// <reference path="./all.d.ts" />
"use strict";
if (!global.Promise) {
    require('es6-promise').polyfill();
}
var axios = require('axios');
var assign = require('object-assign');
var qs = require('qs');
var request_models_1 = require('./request-models');
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
        if (callback === void 0) { callback = undefined; }
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
            url: this.bridgeUrl,
            method: 'post',
            params: queryParams,
            data: assign(body, { clientKey: this.clientKey }),
            responseType: 'json',
            timeout: 1500
        };
        return axios(options)
            .then(function (res) { return res.data; })
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
        var builtRequest = assign(new request_models_1.Request(), this.request);
        (_a = builtRequest.refinements).push.apply(_a, util_1.NavigationConverter.convert(this.unprocessedNavigations));
        return this.clearEmptyArrays(builtRequest);
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

//# sourceMappingURL=data:application/json;base64,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dEMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxxQkFBSyxHQUFMO1FBQ0UsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksd0JBQU8sRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxNQUFBLFlBQVksQ0FBQyxXQUFXLEVBQUMsSUFBSSxXQUFJLDBCQUFtQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1FBRTNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7O0lBQzdDLENBQUM7SUFFTyxnQ0FBZ0IsR0FBeEIsVUFBeUIsT0FBZ0I7UUFDdkMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN4QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksS0FBSyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0QsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEIsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFSCxZQUFDO0FBQUQsQ0FoTEEsQUFnTEMsSUFBQTtBQWhMWSxhQUFLLFFBZ0xqQixDQUFBIiwiZmlsZSI6ImNvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9hbGwuZC50c1wiIC8+XG5cbmlmICghZ2xvYmFsLlByb21pc2UpIHtcbiAgcmVxdWlyZSgnZXM2LXByb21pc2UnKS5wb2x5ZmlsbCgpO1xufVxuaW1wb3J0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKTtcbmltcG9ydCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5pbXBvcnQgcXMgPSByZXF1aXJlKCdxcycpO1xuaW1wb3J0IHtcbiAgUmVxdWVzdCxcbiAgU2VsZWN0ZWRWYWx1ZVJlZmluZW1lbnQsXG4gIFNlbGVjdGVkUmFuZ2VSZWZpbmVtZW50LFxuICBTZWxlY3RlZFJlZmluZW1lbnQsXG4gIEN1c3RvbVVybFBhcmFtLFxuICBSZXN0cmljdE5hdmlnYXRpb24sXG4gIFNvcnQsXG4gIE1hdGNoU3RyYXRlZ3ksXG4gIEJpYXNpbmcsXG4gIEJpYXNcbn0gZnJvbSAnLi9yZXF1ZXN0LW1vZGVscyc7XG5pbXBvcnQge1xuICBSZXN1bHRzLFxuICBSZWNvcmQsXG4gIFZhbHVlUmVmaW5lbWVudCxcbiAgUmFuZ2VSZWZpbmVtZW50LFxuICBSZWZpbmVtZW50LFxuICBSZWZpbmVtZW50VHlwZSxcbiAgTmF2aWdhdGlvblxufSBmcm9tICcuL3Jlc3BvbnNlLW1vZGVscyc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uQ29udmVydGVyIH0gZnJvbSAnLi91dGlsJztcblxuY29uc3QgU0VBUkNIID0gJy9zZWFyY2gnO1xuY29uc3QgUkVGSU5FTUVOVFMgPSAnL3JlZmluZW1lbnRzJztcbmNvbnN0IFJFRklORU1FTlRfU0VBUkNIID0gJy9yZWZpbmVtZW50JztcbmNvbnN0IENMVVNURVIgPSAnL2NsdXN0ZXInO1xuXG5jb25zdCBCSUFTSU5HX0RFRkFVTFRTID0ge1xuICBiaWFzZXM6IFtdLFxuICBicmluZ1RvVG9wOiBbXSxcbiAgYXVnbWVudEJpYXNlczogZmFsc2Vcbn07XG5cbmV4cG9ydCBjbGFzcyBDbG91ZEJyaWRnZSB7XG5cbiAgcHJpdmF0ZSBicmlkZ2VVcmw6IHN0cmluZztcbiAgcHJpdmF0ZSBicmlkZ2VSZWZpbmVtZW50c1VybDogc3RyaW5nO1xuICBwcml2YXRlIGJyaWRnZVJlZmluZW1lbnRzU2VhcmNoVXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgYnJpZGdlQ2x1c3RlclVybDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpZW50S2V5OiBzdHJpbmcsIHByaXZhdGUgY3VzdG9tZXJJZDogc3RyaW5nKSB7XG4gICAgbGV0IGJhc2VVcmwgPSBgaHR0cHM6Ly8ke2N1c3RvbWVySWR9Lmdyb3VwYnljbG91ZC5jb206NDQzL2FwaS92MWA7XG4gICAgdGhpcy5icmlkZ2VVcmwgPSBiYXNlVXJsICsgU0VBUkNIO1xuICAgIHRoaXMuYnJpZGdlUmVmaW5lbWVudHNVcmwgPSBiYXNlVXJsICsgUkVGSU5FTUVOVFM7XG4gICAgdGhpcy5icmlkZ2VSZWZpbmVtZW50c1NlYXJjaFVybCA9IGJhc2VVcmwgKyBSRUZJTkVNRU5UX1NFQVJDSDtcbiAgICB0aGlzLmJyaWRnZUNsdXN0ZXJVcmwgPSBiYXNlVXJsICsgQ0xVU1RFUjtcbiAgfVxuXG4gIHNlYXJjaChxdWVyeTogUXVlcnksIGNhbGxiYWNrOiAoRXJyb3I/LCBSZXN1bHRzPykgPT4gdm9pZCA9IHVuZGVmaW5lZCk6IEF4aW9zLklQcm9taXNlPFJlc3VsdHM+IHwgdm9pZCB7XG4gICAgbGV0IHJlc3BvbnNlID0gdGhpcy5maXJlUmVxdWVzdCh0aGlzLmJyaWRnZVVybCwgcXVlcnkuYnVpbGQoKSwgcXVlcnkucXVlcnlQYXJhbXMpO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgcmVzcG9uc2UudGhlbihyZXMgPT4gY2FsbGJhY2sodW5kZWZpbmVkLCByZXMpKVxuICAgICAgICAuY2F0Y2goZXJyID0+IGNhbGxiYWNrKGVycikpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBmaXJlUmVxdWVzdCh1cmw6IHN0cmluZywgYm9keTogUmVxdWVzdCwgcXVlcnlQYXJhbXM6IE9iamVjdCk6IEF4aW9zLklQcm9taXNlPFJlc3VsdHM+IHtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgIHVybDogdGhpcy5icmlkZ2VVcmwsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIHBhcmFtczogcXVlcnlQYXJhbXMsXG4gICAgICBkYXRhOiBhc3NpZ24oYm9keSwgeyBjbGllbnRLZXk6IHRoaXMuY2xpZW50S2V5IH0pLFxuICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICB0aW1lb3V0OiAxNTAwXG4gICAgfTtcbiAgICByZXR1cm4gYXhpb3Mob3B0aW9ucylcbiAgICAgIC50aGVuKHJlcyA9PiA8UmVzdWx0cz5yZXMuZGF0YSlcbiAgICAgIC50aGVuKHJlcyA9PiByZXMucmVjb3JkcyA/IGFzc2lnbihyZXMsIHsgcmVjb3JkczogcmVzLnJlY29yZHMubWFwKHRoaXMuY29udmVydFJlY29yZEZpZWxkcykgfSkgOiByZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0UmVjb3JkRmllbGRzKHJlY29yZDogUmF3UmVjb3JkKTogUmVjb3JkIHwgUmF3UmVjb3JkIHtcbiAgICBsZXQgY29udmVydGVkID0gYXNzaWduKHJlY29yZCwgeyBpZDogcmVjb3JkLl9pZCwgdXJsOiByZWNvcmQuX3UsIHRpdGxlOiByZWNvcmQuX3QgfSk7XG4gICAgZGVsZXRlIGNvbnZlcnRlZC5faWQ7XG4gICAgZGVsZXRlIGNvbnZlcnRlZC5fdTtcbiAgICBkZWxldGUgY29udmVydGVkLl90O1xuICAgIGlmIChyZWNvcmQuX3NuaXBwZXQpIHtcbiAgICAgIGNvbnZlcnRlZC5zbmlwcGV0ID0gcmVjb3JkLl9zbmlwcGV0O1xuICAgICAgZGVsZXRlIGNvbnZlcnRlZC5fc25pcHBldDtcbiAgICB9XG4gICAgcmV0dXJuIGNvbnZlcnRlZDtcbiAgfVxufVxuXG5pbnRlcmZhY2UgUmF3UmVjb3JkIGV4dGVuZHMgUmVjb3JkIHtcbiAgX2lkOiBzdHJpbmc7XG4gIF91OiBzdHJpbmc7XG4gIF90OiBzdHJpbmc7XG4gIF9zbmlwcGV0Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFF1ZXJ5Q29uZmlndXJhdGlvbiB7XG4gIHVzZXJJZD86IHN0cmluZztcbiAgbGFuZ3VhZ2U/OiBzdHJpbmc7XG4gIGNvbGxlY3Rpb24/OiBzdHJpbmc7XG4gIGFyZWE/OiBzdHJpbmc7XG4gIGJpYXNpbmdQcm9maWxlPzogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgUXVlcnkge1xuICBwcml2YXRlIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHByaXZhdGUgdW5wcm9jZXNzZWROYXZpZ2F0aW9uczogTmF2aWdhdGlvbltdO1xuICBxdWVyeVBhcmFtczogT2JqZWN0O1xuXG4gIGNvbnN0cnVjdG9yKHF1ZXJ5OiBzdHJpbmcgPSAnJykge1xuICAgIHRoaXMucmVxdWVzdCA9IDxSZXF1ZXN0Pnt9O1xuICAgIHRoaXMudW5wcm9jZXNzZWROYXZpZ2F0aW9ucyA9IFtdO1xuICAgIHRoaXMucXVlcnlQYXJhbXMgPSB7fTtcblxuICAgIHRoaXMucmVxdWVzdC5xdWVyeSA9IHF1ZXJ5O1xuICAgIHRoaXMucmVxdWVzdC5zb3J0ID0gW107XG4gICAgdGhpcy5yZXF1ZXN0LmZpZWxkcyA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5vckZpZWxkcyA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5yZWZpbmVtZW50cyA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5jdXN0b21VcmxQYXJhbXMgPSBbXTtcbiAgICB0aGlzLnJlcXVlc3QuaW5jbHVkZWROYXZpZ2F0aW9ucyA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5leGNsdWRlZE5hdmlnYXRpb25zID0gW107XG5cbiAgICB0aGlzLnJlcXVlc3Qud2lsZGNhcmRTZWFyY2hFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5yZXF1ZXN0LnBydW5lUmVmaW5lbWVudHMgPSB0cnVlO1xuICB9XG5cbiAgd2l0aENvbmZpZ3VyYXRpb24oY29uZmlndXJhdGlvbjogUXVlcnlDb25maWd1cmF0aW9uKTogUXVlcnkge1xuICAgIGFzc2lnbih0aGlzLnJlcXVlc3QsIGNvbmZpZ3VyYXRpb24pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aFNlbGVjdGVkUmVmaW5lbWVudHMoLi4ucmVmaW5lbWVudHM6IEFycmF5PFNlbGVjdGVkVmFsdWVSZWZpbmVtZW50IHwgU2VsZWN0ZWRSYW5nZVJlZmluZW1lbnQ+KTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5yZWZpbmVtZW50cy5wdXNoKC4uLnJlZmluZW1lbnRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhSZWZpbmVtZW50cyhuYXZpZ2F0aW9uTmFtZTogc3RyaW5nLCAuLi5yZWZpbmVtZW50czogQXJyYXk8VmFsdWVSZWZpbmVtZW50IHwgUmFuZ2VSZWZpbmVtZW50Pik6IFF1ZXJ5IHtcbiAgICBsZXQgY29udmVydCA9IChyZWZpbmVtZW50OiBSZWZpbmVtZW50KSA9PiA8U2VsZWN0ZWRSZWZpbmVtZW50PmFzc2lnbihyZWZpbmVtZW50LCB7IG5hdmlnYXRpb25OYW1lIH0pO1xuICAgIHRoaXMucmVxdWVzdC5yZWZpbmVtZW50cy5wdXNoKC4uLnJlZmluZW1lbnRzLm1hcChjb252ZXJ0KSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoTmF2aWdhdGlvbnMoLi4ubmF2aWdhdGlvbnM6IE5hdmlnYXRpb25bXSk6IFF1ZXJ5IHtcbiAgICB0aGlzLnVucHJvY2Vzc2VkTmF2aWdhdGlvbnMucHVzaCguLi5uYXZpZ2F0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoQ3VzdG9tVXJsUGFyYW1zKGN1c3RvbVVybFBhcmFtczogQ3VzdG9tVXJsUGFyYW1bXSB8IHN0cmluZyk6IFF1ZXJ5IHtcbiAgICBpZiAodHlwZW9mIGN1c3RvbVVybFBhcmFtcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMucmVxdWVzdC5jdXN0b21VcmxQYXJhbXMucHVzaCguLi50aGlzLmNvbnZlcnRQYXJhbVN0cmluZyhjdXN0b21VcmxQYXJhbXMpKTtcbiAgICB9IGVsc2UgaWYgKGN1c3RvbVVybFBhcmFtcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICB0aGlzLnJlcXVlc3QuY3VzdG9tVXJsUGFyYW1zLnB1c2goLi4uY3VzdG9tVXJsUGFyYW1zKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRQYXJhbVN0cmluZyhjdXN0b21VcmxQYXJhbXM6IHN0cmluZyk6IEN1c3RvbVVybFBhcmFtW10ge1xuICAgIGxldCBwYXJzZWQgPSBxcy5wYXJzZShjdXN0b21VcmxQYXJhbXMpO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhwYXJzZWQpLnJlZHVjZSgoY29udmVydGVkLCBrZXkpID0+IGNvbnZlcnRlZC5jb25jYXQoeyBrZXksIHZhbHVlOiBwYXJzZWRba2V5XSB9KSwgW10pO1xuICB9XG5cbiAgd2l0aEZpZWxkcyguLi5maWVsZHM6IHN0cmluZ1tdKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5maWVsZHMucHVzaCguLi5maWVsZHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aE9yRmllbGRzKC4uLm9yRmllbGRzOiBzdHJpbmdbXSk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3Qub3JGaWVsZHMucHVzaCguLi5vckZpZWxkcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoU29ydHMoLi4uc29ydHM6IFNvcnRbXSk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3Quc29ydC5wdXNoKC4uLnNvcnRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhJbmNsdWRlZE5hdmlnYXRpb25zKC4uLm5hdmlnYXRpb25OYW1lczogc3RyaW5nW10pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LmluY2x1ZGVkTmF2aWdhdGlvbnMucHVzaCguLi5uYXZpZ2F0aW9uTmFtZXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aEV4Y2x1ZGVkTmF2aWdhdGlvbnMoLi4ubmF2aWdhdGlvbk5hbWVzOiBzdHJpbmdbXSk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QuZXhjbHVkZWROYXZpZ2F0aW9ucy5wdXNoKC4uLm5hdmlnYXRpb25OYW1lcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoUXVlcnlQYXJhbXMocXVlcnlQYXJhbXM6IGFueSB8IHN0cmluZyk6IFF1ZXJ5IHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBxdWVyeVBhcmFtcykge1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgcmV0dXJuIGFzc2lnbih0aGlzLCB7IHF1ZXJ5UGFyYW1zOiB0aGlzLmNvbnZlcnRRdWVyeVN0cmluZyg8c3RyaW5nPnF1ZXJ5UGFyYW1zKSB9KTtcbiAgICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICAgIHJldHVybiBhc3NpZ24odGhpcywgeyBxdWVyeVBhcmFtcyB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRRdWVyeVN0cmluZyhxdWVyeVBhcmFtczogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gcXMucGFyc2UocXVlcnlQYXJhbXMpO1xuICB9XG5cbiAgcmVmaW5lQnlWYWx1ZShuYXZpZ2F0aW9uTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBleGNsdWRlOiBib29sZWFuID0gZmFsc2UpOiBRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMud2l0aFNlbGVjdGVkUmVmaW5lbWVudHMoPFNlbGVjdGVkVmFsdWVSZWZpbmVtZW50PntcbiAgICAgIG5hdmlnYXRpb25OYW1lLFxuICAgICAgdmFsdWUsXG4gICAgICBleGNsdWRlLFxuICAgICAgdHlwZTogJ1ZhbHVlJ1xuICAgIH0pO1xuICB9XG5cbiAgcmVmaW5lQnlSYW5nZShuYXZpZ2F0aW9uTmFtZTogc3RyaW5nLCBsb3c6IG51bWJlciwgaGlnaDogbnVtYmVyLCBleGNsdWRlOiBib29sZWFuID0gZmFsc2UpOiBRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMud2l0aFNlbGVjdGVkUmVmaW5lbWVudHMoPFNlbGVjdGVkUmFuZ2VSZWZpbmVtZW50PntcbiAgICAgIG5hdmlnYXRpb25OYW1lLFxuICAgICAgbG93LFxuICAgICAgaGlnaCxcbiAgICAgIGV4Y2x1ZGUsXG4gICAgICB0eXBlOiAnUmFuZ2UnXG4gICAgfSk7XG4gIH1cblxuICByZXN0cmljdE5hdmlnYXRpb24ocmVzdHJpY3ROYXZpZ2F0aW9uOiBSZXN0cmljdE5hdmlnYXRpb24pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LnJlc3RyaWN0TmF2aWdhdGlvbiA9IHJlc3RyaWN0TmF2aWdhdGlvbjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNraXAoc2tpcDogbnVtYmVyKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5za2lwID0gc2tpcDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhQYWdlU2l6ZShwYWdlU2l6ZTogbnVtYmVyKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5wYWdlU2l6ZSA9IHBhZ2VTaXplO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aE1hdGNoU3RyYXRlZ3kobWF0Y2hTdHJhdGVneTogTWF0Y2hTdHJhdGVneSk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QubWF0Y2hTdHJhdGVneSA9IG1hdGNoU3RyYXRlZ3k7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoQmlhc2luZyhiaWFzaW5nOiBCaWFzaW5nKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5iaWFzaW5nID0gYmlhc2luZztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGVuYWJsZVdpbGRjYXJkU2VhcmNoKCk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3Qud2lsZGNhcmRTZWFyY2hFbmFibGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRpc2FibGVBdXRvY29ycmVjdGlvbigpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LmRpc2FibGVBdXRvY29ycmVjdGlvbiA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkaXNhYmxlQmluYXJ5UGF5bG9hZCgpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LnJldHVybkJpbmFyeSA9IGZhbHNlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWxsb3dQcnVuZWRSZWZpbmVtZW50cygpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LnBydW5lUmVmaW5lbWVudHMgPSBmYWxzZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGJ1aWxkKCk6IFJlcXVlc3Qge1xuICAgIGxldCBidWlsdFJlcXVlc3QgPSBhc3NpZ24obmV3IFJlcXVlc3QoKSwgdGhpcy5yZXF1ZXN0KTtcbiAgICBidWlsdFJlcXVlc3QucmVmaW5lbWVudHMucHVzaCguLi5OYXZpZ2F0aW9uQ29udmVydGVyLmNvbnZlcnQodGhpcy51bnByb2Nlc3NlZE5hdmlnYXRpb25zKSk7XG5cbiAgICByZXR1cm4gdGhpcy5jbGVhckVtcHR5QXJyYXlzKGJ1aWx0UmVxdWVzdCk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyRW1wdHlBcnJheXMocmVxdWVzdDogUmVxdWVzdCk6IFJlcXVlc3Qge1xuICAgIGZvciAobGV0IGtleSBpbiByZXF1ZXN0KSB7XG4gICAgICBpZiAocmVxdWVzdFtrZXldIGluc3RhbmNlb2YgQXJyYXkgJiYgcmVxdWVzdFtrZXldLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBkZWxldGUgcmVxdWVzdFtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfVxuXG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
