/// <reference path="./all.d.ts" />
"use strict";
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

//# sourceMappingURL=data:application/json;base64,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QUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7SUFDN0MsQ0FBQztJQUVPLGdDQUFnQixHQUF4QixVQUF5QixPQUFnQjtRQUN2QyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxLQUFLLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QixDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVILFlBQUM7QUFBRCxDQS9LQSxBQStLQyxJQUFBO0FBL0tZLGFBQUssUUErS2pCLENBQUEiLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2FsbC5kLnRzXCIgLz5cblxuaW1wb3J0ICogYXMgcmVxdWVzdCBmcm9tICdyZXF1ZXN0cmV0cnknO1xuaW1wb3J0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbmltcG9ydCAqIGFzIHFzIGZyb20gJ3FzJztcbmltcG9ydCB7XG4gIFJlcXVlc3QsXG4gIFNlbGVjdGVkVmFsdWVSZWZpbmVtZW50LFxuICBTZWxlY3RlZFJhbmdlUmVmaW5lbWVudCxcbiAgU2VsZWN0ZWRSZWZpbmVtZW50LFxuICBDdXN0b21VcmxQYXJhbSxcbiAgUmVzdHJpY3ROYXZpZ2F0aW9uLFxuICBTb3J0LFxuICBNYXRjaFN0cmF0ZWd5LFxuICBCaWFzaW5nLFxuICBCaWFzXG59IGZyb20gJy4vcmVxdWVzdC1tb2RlbHMnO1xuaW1wb3J0IHtcbiAgUmVzdWx0cyxcbiAgUmVjb3JkLFxuICBWYWx1ZVJlZmluZW1lbnQsXG4gIFJhbmdlUmVmaW5lbWVudCxcbiAgUmVmaW5lbWVudCxcbiAgUmVmaW5lbWVudFR5cGUsXG4gIE5hdmlnYXRpb25cbn0gZnJvbSAnLi9yZXNwb25zZS1tb2RlbHMnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkNvbnZlcnRlciB9IGZyb20gJy4vdXRpbCc7XG5cbmNvbnN0IFNFQVJDSCA9ICcvc2VhcmNoJztcbmNvbnN0IFJFRklORU1FTlRTID0gJy9yZWZpbmVtZW50cyc7XG5jb25zdCBSRUZJTkVNRU5UX1NFQVJDSCA9ICcvcmVmaW5lbWVudCc7XG5jb25zdCBDTFVTVEVSID0gJy9jbHVzdGVyJztcblxuY29uc3QgQklBU0lOR19ERUZBVUxUUyA9IHtcbiAgYmlhc2VzOiBbXSxcbiAgYnJpbmdUb1RvcDogW10sXG4gIGF1Z21lbnRCaWFzZXM6IGZhbHNlXG59O1xuXG5leHBvcnQgY2xhc3MgQ2xvdWRCcmlkZ2Uge1xuXG4gIHByaXZhdGUgYnJpZGdlVXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgYnJpZGdlUmVmaW5lbWVudHNVcmw6IHN0cmluZztcbiAgcHJpdmF0ZSBicmlkZ2VSZWZpbmVtZW50c1NlYXJjaFVybDogc3RyaW5nO1xuICBwcml2YXRlIGJyaWRnZUNsdXN0ZXJVcmw6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNsaWVudEtleTogc3RyaW5nLCBwcml2YXRlIGN1c3RvbWVySWQ6IHN0cmluZykge1xuICAgIGxldCBiYXNlVXJsID0gYGh0dHBzOi8vJHtjdXN0b21lcklkfS5ncm91cGJ5Y2xvdWQuY29tOjQ0My9hcGkvdjFgO1xuICAgIHRoaXMuYnJpZGdlVXJsID0gYmFzZVVybCArIFNFQVJDSDtcbiAgICB0aGlzLmJyaWRnZVJlZmluZW1lbnRzVXJsID0gYmFzZVVybCArIFJFRklORU1FTlRTO1xuICAgIHRoaXMuYnJpZGdlUmVmaW5lbWVudHNTZWFyY2hVcmwgPSBiYXNlVXJsICsgUkVGSU5FTUVOVF9TRUFSQ0g7XG4gICAgdGhpcy5icmlkZ2VDbHVzdGVyVXJsID0gYmFzZVVybCArIENMVVNURVI7XG4gIH1cblxuICBzZWFyY2gocXVlcnk6IFF1ZXJ5LCBjYWxsYmFjazogKEVycm9yPywgUmVzdWx0cz8pID0+IHZvaWQpOiBQcm9taXNlTGlrZTxSZXN1bHRzPiB8IHZvaWQge1xuICAgIGxldCByZXNwb25zZSA9IHRoaXMuZmlyZVJlcXVlc3QodGhpcy5icmlkZ2VVcmwsIHF1ZXJ5LmJ1aWxkKCksIHF1ZXJ5LnF1ZXJ5UGFyYW1zKTtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIHJlc3BvbnNlLnRoZW4ocmVzID0+IGNhbGxiYWNrKHVuZGVmaW5lZCwgcmVzKSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiBjYWxsYmFjayhlcnIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZmlyZVJlcXVlc3QodXJsOiBzdHJpbmcsIGJvZHk6IFJlcXVlc3QsIHF1ZXJ5UGFyYW1zOiBPYmplY3QpOiBQcm9taXNlTGlrZTxSZXN1bHRzPiB7XG4gICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIHVyaTogdGhpcy5icmlkZ2VVcmwsXG4gICAgICBxczogcXVlcnlQYXJhbXMsXG4gICAgICBib2R5OiBhc3NpZ24oYm9keSwgeyBjbGllbnRLZXk6IHRoaXMuY2xpZW50S2V5IH0pLFxuICAgICAganNvbjogdHJ1ZSxcblxuICAgICAgdGltZW91dDogMTUwMCxcbiAgICAgIG1heEF0dGVtcHRzOiAzLFxuICAgICAgcmV0cnlEZWxheTogODAsXG4gICAgICBmdWxsUmVzcG9uc2U6IGZhbHNlXG4gICAgfTtcbiAgICByZXR1cm4gcmVxdWVzdChvcHRpb25zKVxuICAgICAgLnRoZW4ocmVzID0+IHJlcy5yZWNvcmRzID8gYXNzaWduKHJlcywgeyByZWNvcmRzOiByZXMucmVjb3Jkcy5tYXAodGhpcy5jb252ZXJ0UmVjb3JkRmllbGRzKSB9KSA6IHJlcyk7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRSZWNvcmRGaWVsZHMocmVjb3JkOiBSYXdSZWNvcmQpOiBSZWNvcmQge1xuICAgIGxldCBjb252ZXJ0ZWQgPSBhc3NpZ24ocmVjb3JkLCB7IGlkOiByZWNvcmQuX2lkLCB1cmw6IHJlY29yZC5fdSwgdGl0bGU6IHJlY29yZC5fdCB9KTtcbiAgICBkZWxldGUgY29udmVydGVkLl9pZDtcbiAgICBkZWxldGUgY29udmVydGVkLl91O1xuICAgIGRlbGV0ZSBjb252ZXJ0ZWQuX3Q7XG4gICAgaWYgKHJlY29yZC5fc25pcHBldCkge1xuICAgICAgY29udmVydGVkLnNuaXBwZXQgPSByZWNvcmQuX3NuaXBwZXQ7XG4gICAgICBkZWxldGUgY29udmVydGVkLl9zbmlwcGV0O1xuICAgIH1cbiAgICByZXR1cm4gY29udmVydGVkO1xuICB9XG59XG5cbmludGVyZmFjZSBSYXdSZWNvcmQge1xuICBfaWQ6IHN0cmluZztcbiAgX3U6IHN0cmluZztcbiAgX3Q6IHN0cmluZztcbiAgX3NuaXBwZXQ/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUXVlcnlDb25maWd1cmF0aW9uIHtcbiAgdXNlcklkPzogc3RyaW5nO1xuICBsYW5ndWFnZT86IHN0cmluZztcbiAgY29sbGVjdGlvbj86IHN0cmluZztcbiAgYXJlYT86IHN0cmluZztcbiAgYmlhc2luZ1Byb2ZpbGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBRdWVyeSB7XG4gIHByaXZhdGUgcmVxdWVzdDogUmVxdWVzdDtcbiAgcHJpdmF0ZSB1bnByb2Nlc3NlZE5hdmlnYXRpb25zOiBBcnJheTxOYXZpZ2F0aW9uPjtcbiAgcXVlcnlQYXJhbXM6IE9iamVjdDtcblxuICBjb25zdHJ1Y3RvcihxdWVyeTogc3RyaW5nID0gJycpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSA8UmVxdWVzdD57fTtcbiAgICB0aGlzLnVucHJvY2Vzc2VkTmF2aWdhdGlvbnMgPSBbXTtcbiAgICB0aGlzLnF1ZXJ5UGFyYW1zID0ge307XG5cbiAgICB0aGlzLnJlcXVlc3QucXVlcnkgPSBxdWVyeTtcbiAgICB0aGlzLnJlcXVlc3Quc29ydCA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5maWVsZHMgPSBbXTtcbiAgICB0aGlzLnJlcXVlc3Qub3JGaWVsZHMgPSBbXTtcbiAgICB0aGlzLnJlcXVlc3QucmVmaW5lbWVudHMgPSBbXTtcbiAgICB0aGlzLnJlcXVlc3QuY3VzdG9tVXJsUGFyYW1zID0gW107XG4gICAgdGhpcy5yZXF1ZXN0LmluY2x1ZGVkTmF2aWdhdGlvbnMgPSBbXTtcbiAgICB0aGlzLnJlcXVlc3QuZXhjbHVkZWROYXZpZ2F0aW9ucyA9IFtdO1xuXG4gICAgdGhpcy5yZXF1ZXN0LndpbGRjYXJkU2VhcmNoRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMucmVxdWVzdC5wcnVuZVJlZmluZW1lbnRzID0gdHJ1ZTtcbiAgfVxuXG4gIHdpdGhDb25maWd1cmF0aW9uKGNvbmZpZ3VyYXRpb246IFF1ZXJ5Q29uZmlndXJhdGlvbik6IFF1ZXJ5IHtcbiAgICBhc3NpZ24odGhpcy5yZXF1ZXN0LCBjb25maWd1cmF0aW9uKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhTZWxlY3RlZFJlZmluZW1lbnRzKC4uLnJlZmluZW1lbnRzOiBBcnJheTxTZWxlY3RlZFZhbHVlUmVmaW5lbWVudCB8IFNlbGVjdGVkUmFuZ2VSZWZpbmVtZW50Pik6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QucmVmaW5lbWVudHMucHVzaCguLi5yZWZpbmVtZW50cyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoUmVmaW5lbWVudHMobmF2aWdhdGlvbk5hbWU6IHN0cmluZywgLi4ucmVmaW5lbWVudHM6IEFycmF5PFZhbHVlUmVmaW5lbWVudCB8IFJhbmdlUmVmaW5lbWVudD4pOiBRdWVyeSB7XG4gICAgbGV0IGNvbnZlcnQgPSAocmVmaW5lbWVudDogUmVmaW5lbWVudCkgPT4gPFNlbGVjdGVkUmVmaW5lbWVudD5hc3NpZ24ocmVmaW5lbWVudCwgeyBuYXZpZ2F0aW9uTmFtZSB9KTtcbiAgICB0aGlzLnJlcXVlc3QucmVmaW5lbWVudHMucHVzaCguLi5yZWZpbmVtZW50cy5tYXAoY29udmVydCkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aE5hdmlnYXRpb25zKC4uLm5hdmlnYXRpb25zOiBBcnJheTxOYXZpZ2F0aW9uPik6IFF1ZXJ5IHtcbiAgICB0aGlzLnVucHJvY2Vzc2VkTmF2aWdhdGlvbnMucHVzaCguLi5uYXZpZ2F0aW9ucyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoQ3VzdG9tVXJsUGFyYW1zKGN1c3RvbVVybFBhcmFtczogQXJyYXk8Q3VzdG9tVXJsUGFyYW0+IHwgc3RyaW5nKTogUXVlcnkge1xuICAgIGlmICh0eXBlb2YgY3VzdG9tVXJsUGFyYW1zID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5yZXF1ZXN0LmN1c3RvbVVybFBhcmFtcy5wdXNoKC4uLnRoaXMuY29udmVydFBhcmFtU3RyaW5nKGN1c3RvbVVybFBhcmFtcykpO1xuICAgIH0gZWxzZSBpZiAoY3VzdG9tVXJsUGFyYW1zIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMucmVxdWVzdC5jdXN0b21VcmxQYXJhbXMucHVzaCguLi5jdXN0b21VcmxQYXJhbXMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydFBhcmFtU3RyaW5nKGN1c3RvbVVybFBhcmFtczogc3RyaW5nKTogQXJyYXk8Q3VzdG9tVXJsUGFyYW0+IHtcbiAgICBsZXQgcGFyc2VkID0gcXMucGFyc2UoY3VzdG9tVXJsUGFyYW1zKTtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocGFyc2VkKS5yZWR1Y2UoKGNvbnZlcnRlZCwga2V5KSA9PiBjb252ZXJ0ZWQuY29uY2F0KHsga2V5LCB2YWx1ZTogcGFyc2VkW2tleV0gfSksIFtdKTtcbiAgfVxuXG4gIHdpdGhGaWVsZHMoLi4uZmllbGRzOiBBcnJheTxzdHJpbmc+KTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5maWVsZHMucHVzaCguLi5maWVsZHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aE9yRmllbGRzKC4uLm9yRmllbGRzOiBBcnJheTxzdHJpbmc+KTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5vckZpZWxkcy5wdXNoKC4uLm9yRmllbGRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhTb3J0cyguLi5zb3J0czogQXJyYXk8U29ydD4pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LnNvcnQucHVzaCguLi5zb3J0cyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoSW5jbHVkZWROYXZpZ2F0aW9ucyguLi5uYXZpZ2F0aW9uTmFtZXM6IEFycmF5PHN0cmluZz4pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LmluY2x1ZGVkTmF2aWdhdGlvbnMucHVzaCguLi5uYXZpZ2F0aW9uTmFtZXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aEV4Y2x1ZGVkTmF2aWdhdGlvbnMoLi4ubmF2aWdhdGlvbk5hbWVzOiBBcnJheTxzdHJpbmc+KTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5leGNsdWRlZE5hdmlnYXRpb25zLnB1c2goLi4ubmF2aWdhdGlvbk5hbWVzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhRdWVyeVBhcmFtcyhxdWVyeVBhcmFtczogT2JqZWN0IHwgc3RyaW5nKTogUXVlcnkge1xuICAgIHN3aXRjaCAodHlwZW9mIHF1ZXJ5UGFyYW1zKSB7XG4gICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICByZXR1cm4gYXNzaWduKHRoaXMsIHsgcXVlcnlQYXJhbXM6IHRoaXMuY29udmVydFF1ZXJ5U3RyaW5nKDxzdHJpbmc+cXVlcnlQYXJhbXMpIH0pO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgcmV0dXJuIGFzc2lnbih0aGlzLCB7IHF1ZXJ5UGFyYW1zIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY29udmVydFF1ZXJ5U3RyaW5nKHF1ZXJ5UGFyYW1zOiBzdHJpbmcpOiBPYmplY3Qge1xuICAgIHJldHVybiBxcy5wYXJzZShxdWVyeVBhcmFtcyk7XG4gIH1cblxuICByZWZpbmVCeVZhbHVlKG5hdmlnYXRpb25OYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGV4Y2x1ZGU6IGJvb2xlYW4gPSBmYWxzZSk6IFF1ZXJ5IHtcbiAgICByZXR1cm4gdGhpcy53aXRoU2VsZWN0ZWRSZWZpbmVtZW50cyg8U2VsZWN0ZWRWYWx1ZVJlZmluZW1lbnQ+e1xuICAgICAgbmF2aWdhdGlvbk5hbWUsXG4gICAgICB2YWx1ZSxcbiAgICAgIGV4Y2x1ZGUsXG4gICAgICB0eXBlOiAnVmFsdWUnXG4gICAgfSk7XG4gIH1cblxuICByZWZpbmVCeVJhbmdlKG5hdmlnYXRpb25OYW1lOiBzdHJpbmcsIGxvdzogbnVtYmVyLCBoaWdoOiBudW1iZXIsIGV4Y2x1ZGU6IGJvb2xlYW4gPSBmYWxzZSk6IFF1ZXJ5IHtcbiAgICByZXR1cm4gdGhpcy53aXRoU2VsZWN0ZWRSZWZpbmVtZW50cyg8U2VsZWN0ZWRSYW5nZVJlZmluZW1lbnQ+e1xuICAgICAgbmF2aWdhdGlvbk5hbWUsXG4gICAgICBsb3csXG4gICAgICBoaWdoLFxuICAgICAgZXhjbHVkZSxcbiAgICAgIHR5cGU6ICdSYW5nZSdcbiAgICB9KTtcbiAgfVxuXG4gIHJlc3RyaWN0TmF2aWdhdGlvbihyZXN0cmljdE5hdmlnYXRpb246IFJlc3RyaWN0TmF2aWdhdGlvbik6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QucmVzdHJpY3ROYXZpZ2F0aW9uID0gcmVzdHJpY3ROYXZpZ2F0aW9uO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2tpcChza2lwOiBudW1iZXIpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LnNraXAgPSBza2lwO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aFBhZ2VTaXplKHBhZ2VTaXplOiBudW1iZXIpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LnBhZ2VTaXplID0gcGFnZVNpemU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoTWF0Y2hTdHJhdGVneShtYXRjaFN0cmF0ZWd5OiBNYXRjaFN0cmF0ZWd5KTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5tYXRjaFN0cmF0ZWd5ID0gbWF0Y2hTdHJhdGVneTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhCaWFzaW5nKGJpYXNpbmc6IEJpYXNpbmcpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LmJpYXNpbmcgPSBiaWFzaW5nO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZW5hYmxlV2lsZGNhcmRTZWFyY2goKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC53aWxkY2FyZFNlYXJjaEVuYWJsZWQgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGlzYWJsZUF1dG9jb3JyZWN0aW9uKCk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QuZGlzYWJsZUF1dG9jb3JyZWN0aW9uID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRpc2FibGVCaW5hcnlQYXlsb2FkKCk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QucmV0dXJuQmluYXJ5ID0gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhbGxvd1BydW5lZFJlZmluZW1lbnRzKCk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QucHJ1bmVSZWZpbmVtZW50cyA9IGZhbHNlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYnVpbGQoKTogUmVxdWVzdCB7XG4gICAgdGhpcy5yZXF1ZXN0LnJlZmluZW1lbnRzLnB1c2goLi4uTmF2aWdhdGlvbkNvbnZlcnRlci5jb252ZXJ0KHRoaXMudW5wcm9jZXNzZWROYXZpZ2F0aW9ucykpO1xuXG4gICAgcmV0dXJuIHRoaXMuY2xlYXJFbXB0eUFycmF5cyh0aGlzLnJlcXVlc3QpO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhckVtcHR5QXJyYXlzKHJlcXVlc3Q6IFJlcXVlc3QpOiBSZXF1ZXN0IHtcbiAgICBmb3IgKGxldCBrZXkgaW4gcmVxdWVzdCkge1xuICAgICAgaWYgKHJlcXVlc3Rba2V5XSBpbnN0YW5jZW9mIEFycmF5ICYmIHJlcXVlc3Rba2V5XS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZGVsZXRlIHJlcXVlc3Rba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcXVlc3Q7XG4gIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
