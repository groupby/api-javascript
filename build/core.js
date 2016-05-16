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
        var queryParams = {};
        var request = undefined;
        switch (typeof query) {
            case 'string': {
                request = new Query(query).build();
                break;
            }
            case 'object': {
                if (query instanceof Query) {
                    queryParams = query.queryParams;
                    request = query.build();
                }
                else {
                    request = query;
                }
                break;
            }
            default: return this.generateError('query was not of a recognised type', callback);
        }
        var response = this.fireRequest(this.bridgeUrl, request, queryParams);
        if (callback) {
            response.then(function (res) { return callback(undefined, res); })
                .catch(function (err) { return callback(err); });
        }
        else {
            return response;
        }
    };
    CloudBridge.prototype.generateError = function (error, callback) {
        var err = new Error(error);
        if (callback) {
            callback(err);
        }
        else {
            return Promise.reject(err);
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
        delete converted._id, converted._u, converted._t;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsbUNBQW1DOztBQUVuQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ3BCLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNwQyxDQUFDO0FBQ0QsSUFBTyxLQUFLLFdBQVcsT0FBTyxDQUFDLENBQUM7QUFDaEMsSUFBTyxNQUFNLFdBQVcsZUFBZSxDQUFDLENBQUM7QUFDekMsSUFBTyxFQUFFLFdBQVcsSUFBSSxDQUFDLENBQUM7QUFDMUIsK0JBV08sa0JBQWtCLENBQUMsQ0FBQTtBQVUxQixxQkFBb0MsUUFBUSxDQUFDLENBQUE7QUFFN0MsSUFBTSxNQUFNLEdBQUcsU0FBUyxDQUFDO0FBQ3pCLElBQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQztBQUNuQyxJQUFNLGlCQUFpQixHQUFHLGFBQWEsQ0FBQztBQUN4QyxJQUFNLE9BQU8sR0FBRyxVQUFVLENBQUM7QUFFM0IsSUFBTSxnQkFBZ0IsR0FBRztJQUN2QixNQUFNLEVBQUUsRUFBRTtJQUNWLFVBQVUsRUFBRSxFQUFFO0lBQ2QsYUFBYSxFQUFFLEtBQUs7Q0FDckIsQ0FBQztBQUVGO0lBT0UscUJBQW9CLFNBQWlCLEVBQVUsVUFBa0I7UUFBN0MsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDL0QsSUFBSSxPQUFPLEdBQUcsYUFBVyxVQUFVLGlDQUE4QixDQUFDO1FBQ2xFLElBQUksQ0FBQyxTQUFTLEdBQUcsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUNsQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsT0FBTyxHQUFHLFdBQVcsQ0FBQztRQUNsRCxJQUFJLENBQUMsMEJBQTBCLEdBQUcsT0FBTyxHQUFHLGlCQUFpQixDQUFDO1FBQzlELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQzVDLENBQUM7SUFFRCw0QkFBTSxHQUFOLFVBQU8sS0FBK0IsRUFBRSxRQUFnRDtRQUFoRCx3QkFBZ0QsR0FBaEQsb0JBQWdEO1FBQ3RGLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUNyQixJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUM7UUFDeEIsTUFBTSxDQUFDLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQ2QsT0FBTyxHQUFHLElBQUksS0FBSyxDQUFTLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUMzQyxLQUFLLENBQUM7WUFDUixDQUFDO1lBQ0QsS0FBSyxRQUFRLEVBQUUsQ0FBQztnQkFDZCxFQUFFLENBQUMsQ0FBQyxLQUFLLFlBQVksS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDM0IsV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUM7b0JBQ2hDLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzFCLENBQUM7Z0JBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ04sT0FBTyxHQUFHLEtBQUssQ0FBQztnQkFDbEIsQ0FBQztnQkFDRCxLQUFLLENBQUM7WUFDUixDQUFDO1lBQ0QsU0FBUyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxvQ0FBb0MsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNyRixDQUFDO1FBRUQsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUMsQ0FBQztRQUN0RSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2IsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxTQUFTLEVBQUUsR0FBRyxDQUFDLEVBQXhCLENBQXdCLENBQUM7aUJBQzNDLEtBQUssQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsRUFBYixDQUFhLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2xCLENBQUM7SUFDSCxDQUFDO0lBRU8sbUNBQWEsR0FBckIsVUFBc0IsS0FBYSxFQUFFLFFBQXlCO1FBQzVELElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDYixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDaEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0IsQ0FBQztJQUNILENBQUM7SUFFTyxpQ0FBVyxHQUFuQixVQUFvQixHQUFXLEVBQUUsSUFBYSxFQUFFLFdBQWdCO1FBQWhFLGlCQVlDO1FBWEMsSUFBSSxPQUFPLEdBQUc7WUFDWixHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDbkIsTUFBTSxFQUFFLE1BQU07WUFDZCxNQUFNLEVBQUUsV0FBVztZQUNuQixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakQsWUFBWSxFQUFFLE1BQU07WUFDcEIsT0FBTyxFQUFFLElBQUk7U0FDZCxDQUFDO1FBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7YUFDbEIsSUFBSSxDQUFDLFVBQUEsR0FBRyxJQUFJLE9BQVMsR0FBRyxDQUFDLElBQUksRUFBakIsQ0FBaUIsQ0FBQzthQUM5QixJQUFJLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBdkYsQ0FBdUYsQ0FBQyxDQUFDO0lBQzFHLENBQUM7SUFFTyx5Q0FBbUIsR0FBM0IsVUFBNEIsTUFBaUI7UUFDM0MsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyRixPQUFPLFNBQVMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDO1FBRWpELEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLFNBQVMsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNwQyxPQUFPLFNBQVMsQ0FBQyxRQUFRLENBQUM7UUFDNUIsQ0FBQztRQUVELE1BQU0sQ0FBQyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0E5RUEsQUE4RUMsSUFBQTtBQTlFWSxtQkFBVyxjQThFdkIsQ0FBQTtBQWlCRDtJQUtFLGVBQVksS0FBa0I7UUFBbEIscUJBQWtCLEdBQWxCLFVBQWtCO1FBQzVCLElBQUksQ0FBQyxPQUFPLEdBQVksRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFFdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsR0FBRyxFQUFFLENBQUM7UUFFdEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsR0FBRyxLQUFLLENBQUM7UUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7SUFDdkMsQ0FBQztJQUVELGlDQUFpQixHQUFqQixVQUFrQixhQUFpQztRQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELHVDQUF1QixHQUF2QjtRQUF3QixxQkFBd0U7YUFBeEUsV0FBd0UsQ0FBeEUsc0JBQXdFLENBQXhFLElBQXdFO1lBQXhFLG9DQUF3RTs7UUFDOUYsTUFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBQyxJQUFJLFdBQUksV0FBVyxDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQzs7SUFDZCxDQUFDO0lBRUQsK0JBQWUsR0FBZixVQUFnQixjQUFzQjtRQUFFLHFCQUF3RDthQUF4RCxXQUF3RCxDQUF4RCxzQkFBd0QsQ0FBeEQsSUFBd0Q7WUFBeEQsb0NBQXdEOztRQUM5RixJQUFJLE9BQU8sR0FBRyxVQUFDLFVBQXNCLElBQUssT0FBb0IsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLGdCQUFBLGNBQWMsRUFBRSxDQUFDLEVBQTFELENBQTBELENBQUM7UUFDckcsTUFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBQyxJQUFJLFdBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzNELE1BQU0sQ0FBQyxJQUFJLENBQUM7O0lBQ2QsQ0FBQztJQUVELCtCQUFlLEdBQWY7UUFBZ0IscUJBQTRCO2FBQTVCLFdBQTRCLENBQTVCLHNCQUE0QixDQUE1QixJQUE0QjtZQUE1QixvQ0FBNEI7O1FBQzFDLE1BQUEsSUFBSSxDQUFDLHNCQUFzQixFQUFDLElBQUksV0FBSSxXQUFXLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDOztJQUNkLENBQUM7SUFFRCxtQ0FBbUIsR0FBbkIsVUFBb0IsZUFBMEM7UUFDNUQsRUFBRSxDQUFDLENBQUMsT0FBTyxlQUFlLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFBLElBQUksQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFDLElBQUksV0FBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztRQUNqRixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLGVBQWUsWUFBWSxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUMsSUFBSSxXQUFJLGVBQWUsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDOztJQUNkLENBQUM7SUFFTyxrQ0FBa0IsR0FBMUIsVUFBMkIsZUFBdUI7UUFDaEQsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxTQUFTLEVBQUUsR0FBRyxJQUFLLE9BQUEsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUEsR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUE3QyxDQUE2QyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQzNHLENBQUM7SUFFRCwwQkFBVSxHQUFWO1FBQVcsZ0JBQW1CO2FBQW5CLFdBQW1CLENBQW5CLHNCQUFtQixDQUFuQixJQUFtQjtZQUFuQiwrQkFBbUI7O1FBQzVCLE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUMsSUFBSSxXQUFJLE1BQU0sQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUM7O0lBQ2QsQ0FBQztJQUVELDRCQUFZLEdBQVo7UUFBYSxrQkFBcUI7YUFBckIsV0FBcUIsQ0FBckIsc0JBQXFCLENBQXJCLElBQXFCO1lBQXJCLGlDQUFxQjs7UUFDaEMsTUFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBQyxJQUFJLFdBQUksUUFBUSxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLElBQUksQ0FBQzs7SUFDZCxDQUFDO0lBRUQseUJBQVMsR0FBVDtRQUFVLGVBQWdCO2FBQWhCLFdBQWdCLENBQWhCLHNCQUFnQixDQUFoQixJQUFnQjtZQUFoQiw4QkFBZ0I7O1FBQ3hCLE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUMsSUFBSSxXQUFJLEtBQUssQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUM7O0lBQ2QsQ0FBQztJQUVELHVDQUF1QixHQUF2QjtRQUF3Qix5QkFBNEI7YUFBNUIsV0FBNEIsQ0FBNUIsc0JBQTRCLENBQTVCLElBQTRCO1lBQTVCLHdDQUE0Qjs7UUFDbEQsTUFBQSxJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFDLElBQUksV0FBSSxlQUFlLENBQUMsQ0FBQztRQUMxRCxNQUFNLENBQUMsSUFBSSxDQUFDOztJQUNkLENBQUM7SUFFRCx1Q0FBdUIsR0FBdkI7UUFBd0IseUJBQTRCO2FBQTVCLFdBQTRCLENBQTVCLHNCQUE0QixDQUE1QixJQUE0QjtZQUE1Qix3Q0FBNEI7O1FBQ2xELE1BQUEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBQyxJQUFJLFdBQUksZUFBZSxDQUFDLENBQUM7UUFDMUQsTUFBTSxDQUFDLElBQUksQ0FBQzs7SUFDZCxDQUFDO0lBRUQsK0JBQWUsR0FBZixVQUFnQixXQUF5QjtRQUN2QyxNQUFNLENBQUMsQ0FBQyxPQUFPLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDM0IsS0FBSyxRQUFRO2dCQUNYLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsV0FBVyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBUyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDckYsS0FBSyxRQUFRO2dCQUNYLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsYUFBQSxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBQ3pDLENBQUM7SUFDSCxDQUFDO0lBRU8sa0NBQWtCLEdBQTFCLFVBQTJCLFdBQW1CO1FBQzVDLE1BQU0sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCw2QkFBYSxHQUFiLFVBQWMsY0FBc0IsRUFBRSxLQUFhLEVBQUUsT0FBd0I7UUFBeEIsdUJBQXdCLEdBQXhCLGVBQXdCO1FBQzNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQTBCO1lBQzNELGdCQUFBLGNBQWM7WUFDZCxPQUFBLEtBQUs7WUFDTCxTQUFBLE9BQU87WUFDUCxJQUFJLEVBQUUsT0FBTztTQUNkLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCw2QkFBYSxHQUFiLFVBQWMsY0FBc0IsRUFBRSxHQUFXLEVBQUUsSUFBWSxFQUFFLE9BQXdCO1FBQXhCLHVCQUF3QixHQUF4QixlQUF3QjtRQUN2RixNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUEwQjtZQUMzRCxnQkFBQSxjQUFjO1lBQ2QsS0FBQSxHQUFHO1lBQ0gsTUFBQSxJQUFJO1lBQ0osU0FBQSxPQUFPO1lBQ1AsSUFBSSxFQUFFLE9BQU87U0FDZCxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsa0NBQWtCLEdBQWxCLFVBQW1CLGtCQUFzQztRQUN2RCxJQUFJLENBQUMsT0FBTyxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO1FBQ3JELE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsb0JBQUksR0FBSixVQUFLLElBQVk7UUFDZixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCw0QkFBWSxHQUFaLFVBQWEsUUFBZ0I7UUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsaUNBQWlCLEdBQWpCLFVBQWtCLGFBQTRCO1FBQzVDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELDJCQUFXLEdBQVgsVUFBWSxPQUFnQjtRQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDL0IsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxvQ0FBb0IsR0FBcEI7UUFDRSxJQUFJLENBQUMsT0FBTyxDQUFDLHFCQUFxQixHQUFHLElBQUksQ0FBQztRQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELHFDQUFxQixHQUFyQjtRQUNFLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDO1FBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsb0NBQW9CLEdBQXBCO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsc0NBQXNCLEdBQXRCO1FBQ0UsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxxQkFBSyxHQUFMO1FBQ0UsSUFBSSxZQUFZLEdBQUcsTUFBTSxDQUFDLElBQUksd0JBQU8sRUFBRSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxNQUFBLFlBQVksQ0FBQyxXQUFXLEVBQUMsSUFBSSxXQUFJLDBCQUFtQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO1FBRTNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUM7O0lBQzdDLENBQUM7SUFFTyxnQ0FBZ0IsR0FBeEIsVUFBeUIsT0FBZ0I7UUFDdkMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN4QixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksS0FBSyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0QsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEIsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFSCxZQUFDO0FBQUQsQ0FoTEEsQUFnTEMsSUFBQTtBQWhMWSxhQUFLLFFBZ0xqQixDQUFBIiwiZmlsZSI6ImNvcmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9hbGwuZC50c1wiIC8+XG5cbmlmICghZ2xvYmFsLlByb21pc2UpIHtcbiAgcmVxdWlyZSgnZXM2LXByb21pc2UnKS5wb2x5ZmlsbCgpO1xufVxuaW1wb3J0IGF4aW9zID0gcmVxdWlyZSgnYXhpb3MnKTtcbmltcG9ydCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5pbXBvcnQgcXMgPSByZXF1aXJlKCdxcycpO1xuaW1wb3J0IHtcbiAgUmVxdWVzdCxcbiAgU2VsZWN0ZWRWYWx1ZVJlZmluZW1lbnQsXG4gIFNlbGVjdGVkUmFuZ2VSZWZpbmVtZW50LFxuICBTZWxlY3RlZFJlZmluZW1lbnQsXG4gIEN1c3RvbVVybFBhcmFtLFxuICBSZXN0cmljdE5hdmlnYXRpb24sXG4gIFNvcnQsXG4gIE1hdGNoU3RyYXRlZ3ksXG4gIEJpYXNpbmcsXG4gIEJpYXNcbn0gZnJvbSAnLi9yZXF1ZXN0LW1vZGVscyc7XG5pbXBvcnQge1xuICBSZXN1bHRzLFxuICBSZWNvcmQsXG4gIFZhbHVlUmVmaW5lbWVudCxcbiAgUmFuZ2VSZWZpbmVtZW50LFxuICBSZWZpbmVtZW50LFxuICBSZWZpbmVtZW50VHlwZSxcbiAgTmF2aWdhdGlvblxufSBmcm9tICcuL3Jlc3BvbnNlLW1vZGVscyc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uQ29udmVydGVyIH0gZnJvbSAnLi91dGlsJztcblxuY29uc3QgU0VBUkNIID0gJy9zZWFyY2gnO1xuY29uc3QgUkVGSU5FTUVOVFMgPSAnL3JlZmluZW1lbnRzJztcbmNvbnN0IFJFRklORU1FTlRfU0VBUkNIID0gJy9yZWZpbmVtZW50JztcbmNvbnN0IENMVVNURVIgPSAnL2NsdXN0ZXInO1xuXG5jb25zdCBCSUFTSU5HX0RFRkFVTFRTID0ge1xuICBiaWFzZXM6IFtdLFxuICBicmluZ1RvVG9wOiBbXSxcbiAgYXVnbWVudEJpYXNlczogZmFsc2Vcbn07XG5cbmV4cG9ydCBjbGFzcyBDbG91ZEJyaWRnZSB7XG5cbiAgcHJpdmF0ZSBicmlkZ2VVcmw6IHN0cmluZztcbiAgcHJpdmF0ZSBicmlkZ2VSZWZpbmVtZW50c1VybDogc3RyaW5nO1xuICBwcml2YXRlIGJyaWRnZVJlZmluZW1lbnRzU2VhcmNoVXJsOiBzdHJpbmc7XG4gIHByaXZhdGUgYnJpZGdlQ2x1c3RlclVybDogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY2xpZW50S2V5OiBzdHJpbmcsIHByaXZhdGUgY3VzdG9tZXJJZDogc3RyaW5nKSB7XG4gICAgbGV0IGJhc2VVcmwgPSBgaHR0cHM6Ly8ke2N1c3RvbWVySWR9Lmdyb3VwYnljbG91ZC5jb206NDQzL2FwaS92MWA7XG4gICAgdGhpcy5icmlkZ2VVcmwgPSBiYXNlVXJsICsgU0VBUkNIO1xuICAgIHRoaXMuYnJpZGdlUmVmaW5lbWVudHNVcmwgPSBiYXNlVXJsICsgUkVGSU5FTUVOVFM7XG4gICAgdGhpcy5icmlkZ2VSZWZpbmVtZW50c1NlYXJjaFVybCA9IGJhc2VVcmwgKyBSRUZJTkVNRU5UX1NFQVJDSDtcbiAgICB0aGlzLmJyaWRnZUNsdXN0ZXJVcmwgPSBiYXNlVXJsICsgQ0xVU1RFUjtcbiAgfVxuXG4gIHNlYXJjaChxdWVyeTogc3RyaW5nIHwgUXVlcnkgfCBSZXF1ZXN0LCBjYWxsYmFjazogKEVycm9yPywgUmVzdWx0cz8pID0+IHZvaWQgPSB1bmRlZmluZWQpOiBQcm9taXNlTGlrZTxSZXN1bHRzPiB8IHZvaWQge1xuICAgIGxldCBxdWVyeVBhcmFtcyA9IHt9O1xuICAgIGxldCByZXF1ZXN0ID0gdW5kZWZpbmVkO1xuICAgIHN3aXRjaCAodHlwZW9mIHF1ZXJ5KSB7XG4gICAgICBjYXNlICdzdHJpbmcnOiB7XG4gICAgICAgIHJlcXVlc3QgPSBuZXcgUXVlcnkoPHN0cmluZz5xdWVyeSkuYnVpbGQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlICdvYmplY3QnOiB7XG4gICAgICAgIGlmIChxdWVyeSBpbnN0YW5jZW9mIFF1ZXJ5KSB7XG4gICAgICAgICAgcXVlcnlQYXJhbXMgPSBxdWVyeS5xdWVyeVBhcmFtcztcbiAgICAgICAgICByZXF1ZXN0ID0gcXVlcnkuYnVpbGQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXF1ZXN0ID0gcXVlcnk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OiByZXR1cm4gdGhpcy5nZW5lcmF0ZUVycm9yKCdxdWVyeSB3YXMgbm90IG9mIGEgcmVjb2duaXNlZCB0eXBlJywgY2FsbGJhY2spO1xuICAgIH1cblxuICAgIGxldCByZXNwb25zZSA9IHRoaXMuZmlyZVJlcXVlc3QodGhpcy5icmlkZ2VVcmwsIHJlcXVlc3QsIHF1ZXJ5UGFyYW1zKTtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIHJlc3BvbnNlLnRoZW4ocmVzID0+IGNhbGxiYWNrKHVuZGVmaW5lZCwgcmVzKSlcbiAgICAgICAgLmNhdGNoKGVyciA9PiBjYWxsYmFjayhlcnIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2VuZXJhdGVFcnJvcihlcnJvcjogc3RyaW5nLCBjYWxsYmFjazogKEVycm9yKSA9PiB2b2lkKTogdm9pZCB8IFByb21pc2VMaWtlPGFueT4ge1xuICAgIGxldCBlcnIgPSBuZXcgRXJyb3IoZXJyb3IpO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBmaXJlUmVxdWVzdCh1cmw6IHN0cmluZywgYm9keTogUmVxdWVzdCwgcXVlcnlQYXJhbXM6IGFueSk6IEF4aW9zLklQcm9taXNlPFJlc3VsdHM+IHtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgIHVybDogdGhpcy5icmlkZ2VVcmwsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIHBhcmFtczogcXVlcnlQYXJhbXMsXG4gICAgICBkYXRhOiBhc3NpZ24oYm9keSwgeyBjbGllbnRLZXk6IHRoaXMuY2xpZW50S2V5IH0pLFxuICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICB0aW1lb3V0OiAxNTAwXG4gICAgfTtcbiAgICByZXR1cm4gYXhpb3Mob3B0aW9ucylcbiAgICAgIC50aGVuKHJlcyA9PiA8UmVzdWx0cz5yZXMuZGF0YSlcbiAgICAgIC50aGVuKHJlcyA9PiByZXMucmVjb3JkcyA/IGFzc2lnbihyZXMsIHsgcmVjb3JkczogcmVzLnJlY29yZHMubWFwKHRoaXMuY29udmVydFJlY29yZEZpZWxkcykgfSkgOiByZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0UmVjb3JkRmllbGRzKHJlY29yZDogUmF3UmVjb3JkKTogUmVjb3JkIHwgUmF3UmVjb3JkIHtcbiAgICBsZXQgY29udmVydGVkID0gYXNzaWduKHJlY29yZCwgeyBpZDogcmVjb3JkLl9pZCwgdXJsOiByZWNvcmQuX3UsIHRpdGxlOiByZWNvcmQuX3QgfSk7XG4gICAgZGVsZXRlIGNvbnZlcnRlZC5faWQsIGNvbnZlcnRlZC5fdSwgY29udmVydGVkLl90O1xuXG4gICAgaWYgKHJlY29yZC5fc25pcHBldCkge1xuICAgICAgY29udmVydGVkLnNuaXBwZXQgPSByZWNvcmQuX3NuaXBwZXQ7XG4gICAgICBkZWxldGUgY29udmVydGVkLl9zbmlwcGV0O1xuICAgIH1cblxuICAgIHJldHVybiBjb252ZXJ0ZWQ7XG4gIH1cbn1cblxuaW50ZXJmYWNlIFJhd1JlY29yZCBleHRlbmRzIFJlY29yZCB7XG4gIF9pZDogc3RyaW5nO1xuICBfdTogc3RyaW5nO1xuICBfdDogc3RyaW5nO1xuICBfc25pcHBldD86IHN0cmluZztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBRdWVyeUNvbmZpZ3VyYXRpb24ge1xuICB1c2VySWQ/OiBzdHJpbmc7XG4gIGxhbmd1YWdlPzogc3RyaW5nO1xuICBjb2xsZWN0aW9uPzogc3RyaW5nO1xuICBhcmVhPzogc3RyaW5nO1xuICBiaWFzaW5nUHJvZmlsZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFF1ZXJ5IHtcbiAgcHJpdmF0ZSByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwcml2YXRlIHVucHJvY2Vzc2VkTmF2aWdhdGlvbnM6IE5hdmlnYXRpb25bXTtcbiAgcXVlcnlQYXJhbXM6IGFueTtcblxuICBjb25zdHJ1Y3RvcihxdWVyeTogc3RyaW5nID0gJycpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSA8UmVxdWVzdD57fTtcbiAgICB0aGlzLnVucHJvY2Vzc2VkTmF2aWdhdGlvbnMgPSBbXTtcbiAgICB0aGlzLnF1ZXJ5UGFyYW1zID0ge307XG5cbiAgICB0aGlzLnJlcXVlc3QucXVlcnkgPSBxdWVyeTtcbiAgICB0aGlzLnJlcXVlc3Quc29ydCA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5maWVsZHMgPSBbXTtcbiAgICB0aGlzLnJlcXVlc3Qub3JGaWVsZHMgPSBbXTtcbiAgICB0aGlzLnJlcXVlc3QucmVmaW5lbWVudHMgPSBbXTtcbiAgICB0aGlzLnJlcXVlc3QuY3VzdG9tVXJsUGFyYW1zID0gW107XG4gICAgdGhpcy5yZXF1ZXN0LmluY2x1ZGVkTmF2aWdhdGlvbnMgPSBbXTtcbiAgICB0aGlzLnJlcXVlc3QuZXhjbHVkZWROYXZpZ2F0aW9ucyA9IFtdO1xuXG4gICAgdGhpcy5yZXF1ZXN0LndpbGRjYXJkU2VhcmNoRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMucmVxdWVzdC5wcnVuZVJlZmluZW1lbnRzID0gdHJ1ZTtcbiAgfVxuXG4gIHdpdGhDb25maWd1cmF0aW9uKGNvbmZpZ3VyYXRpb246IFF1ZXJ5Q29uZmlndXJhdGlvbik6IFF1ZXJ5IHtcbiAgICBhc3NpZ24odGhpcy5yZXF1ZXN0LCBjb25maWd1cmF0aW9uKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhTZWxlY3RlZFJlZmluZW1lbnRzKC4uLnJlZmluZW1lbnRzOiBBcnJheTxTZWxlY3RlZFZhbHVlUmVmaW5lbWVudCB8IFNlbGVjdGVkUmFuZ2VSZWZpbmVtZW50Pik6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QucmVmaW5lbWVudHMucHVzaCguLi5yZWZpbmVtZW50cyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoUmVmaW5lbWVudHMobmF2aWdhdGlvbk5hbWU6IHN0cmluZywgLi4ucmVmaW5lbWVudHM6IEFycmF5PFZhbHVlUmVmaW5lbWVudCB8IFJhbmdlUmVmaW5lbWVudD4pOiBRdWVyeSB7XG4gICAgbGV0IGNvbnZlcnQgPSAocmVmaW5lbWVudDogUmVmaW5lbWVudCkgPT4gPFNlbGVjdGVkUmVmaW5lbWVudD5hc3NpZ24ocmVmaW5lbWVudCwgeyBuYXZpZ2F0aW9uTmFtZSB9KTtcbiAgICB0aGlzLnJlcXVlc3QucmVmaW5lbWVudHMucHVzaCguLi5yZWZpbmVtZW50cy5tYXAoY29udmVydCkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aE5hdmlnYXRpb25zKC4uLm5hdmlnYXRpb25zOiBOYXZpZ2F0aW9uW10pOiBRdWVyeSB7XG4gICAgdGhpcy51bnByb2Nlc3NlZE5hdmlnYXRpb25zLnB1c2goLi4ubmF2aWdhdGlvbnMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aEN1c3RvbVVybFBhcmFtcyhjdXN0b21VcmxQYXJhbXM6IEN1c3RvbVVybFBhcmFtW10gfCBzdHJpbmcpOiBRdWVyeSB7XG4gICAgaWYgKHR5cGVvZiBjdXN0b21VcmxQYXJhbXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnJlcXVlc3QuY3VzdG9tVXJsUGFyYW1zLnB1c2goLi4udGhpcy5jb252ZXJ0UGFyYW1TdHJpbmcoY3VzdG9tVXJsUGFyYW1zKSk7XG4gICAgfSBlbHNlIGlmIChjdXN0b21VcmxQYXJhbXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5yZXF1ZXN0LmN1c3RvbVVybFBhcmFtcy5wdXNoKC4uLmN1c3RvbVVybFBhcmFtcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0UGFyYW1TdHJpbmcoY3VzdG9tVXJsUGFyYW1zOiBzdHJpbmcpOiBDdXN0b21VcmxQYXJhbVtdIHtcbiAgICBsZXQgcGFyc2VkID0gcXMucGFyc2UoY3VzdG9tVXJsUGFyYW1zKTtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocGFyc2VkKS5yZWR1Y2UoKGNvbnZlcnRlZCwga2V5KSA9PiBjb252ZXJ0ZWQuY29uY2F0KHsga2V5LCB2YWx1ZTogcGFyc2VkW2tleV0gfSksIFtdKTtcbiAgfVxuXG4gIHdpdGhGaWVsZHMoLi4uZmllbGRzOiBzdHJpbmdbXSk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QuZmllbGRzLnB1c2goLi4uZmllbGRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhPckZpZWxkcyguLi5vckZpZWxkczogc3RyaW5nW10pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0Lm9yRmllbGRzLnB1c2goLi4ub3JGaWVsZHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aFNvcnRzKC4uLnNvcnRzOiBTb3J0W10pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LnNvcnQucHVzaCguLi5zb3J0cyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoSW5jbHVkZWROYXZpZ2F0aW9ucyguLi5uYXZpZ2F0aW9uTmFtZXM6IHN0cmluZ1tdKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5pbmNsdWRlZE5hdmlnYXRpb25zLnB1c2goLi4ubmF2aWdhdGlvbk5hbWVzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhFeGNsdWRlZE5hdmlnYXRpb25zKC4uLm5hdmlnYXRpb25OYW1lczogc3RyaW5nW10pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LmV4Y2x1ZGVkTmF2aWdhdGlvbnMucHVzaCguLi5uYXZpZ2F0aW9uTmFtZXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aFF1ZXJ5UGFyYW1zKHF1ZXJ5UGFyYW1zOiBhbnkgfCBzdHJpbmcpOiBRdWVyeSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcXVlcnlQYXJhbXMpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIHJldHVybiBhc3NpZ24odGhpcywgeyBxdWVyeVBhcmFtczogdGhpcy5jb252ZXJ0UXVlcnlTdHJpbmcoPHN0cmluZz5xdWVyeVBhcmFtcykgfSk7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gYXNzaWduKHRoaXMsIHsgcXVlcnlQYXJhbXMgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0UXVlcnlTdHJpbmcocXVlcnlQYXJhbXM6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHFzLnBhcnNlKHF1ZXJ5UGFyYW1zKTtcbiAgfVxuXG4gIHJlZmluZUJ5VmFsdWUobmF2aWdhdGlvbk5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZXhjbHVkZTogYm9vbGVhbiA9IGZhbHNlKTogUXVlcnkge1xuICAgIHJldHVybiB0aGlzLndpdGhTZWxlY3RlZFJlZmluZW1lbnRzKDxTZWxlY3RlZFZhbHVlUmVmaW5lbWVudD57XG4gICAgICBuYXZpZ2F0aW9uTmFtZSxcbiAgICAgIHZhbHVlLFxuICAgICAgZXhjbHVkZSxcbiAgICAgIHR5cGU6ICdWYWx1ZSdcbiAgICB9KTtcbiAgfVxuXG4gIHJlZmluZUJ5UmFuZ2UobmF2aWdhdGlvbk5hbWU6IHN0cmluZywgbG93OiBudW1iZXIsIGhpZ2g6IG51bWJlciwgZXhjbHVkZTogYm9vbGVhbiA9IGZhbHNlKTogUXVlcnkge1xuICAgIHJldHVybiB0aGlzLndpdGhTZWxlY3RlZFJlZmluZW1lbnRzKDxTZWxlY3RlZFJhbmdlUmVmaW5lbWVudD57XG4gICAgICBuYXZpZ2F0aW9uTmFtZSxcbiAgICAgIGxvdyxcbiAgICAgIGhpZ2gsXG4gICAgICBleGNsdWRlLFxuICAgICAgdHlwZTogJ1JhbmdlJ1xuICAgIH0pO1xuICB9XG5cbiAgcmVzdHJpY3ROYXZpZ2F0aW9uKHJlc3RyaWN0TmF2aWdhdGlvbjogUmVzdHJpY3ROYXZpZ2F0aW9uKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5yZXN0cmljdE5hdmlnYXRpb24gPSByZXN0cmljdE5hdmlnYXRpb247XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBza2lwKHNraXA6IG51bWJlcik6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3Quc2tpcCA9IHNraXA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoUGFnZVNpemUocGFnZVNpemU6IG51bWJlcik6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QucGFnZVNpemUgPSBwYWdlU2l6ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhNYXRjaFN0cmF0ZWd5KG1hdGNoU3RyYXRlZ3k6IE1hdGNoU3RyYXRlZ3kpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0Lm1hdGNoU3RyYXRlZ3kgPSBtYXRjaFN0cmF0ZWd5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aEJpYXNpbmcoYmlhc2luZzogQmlhc2luZyk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QuYmlhc2luZyA9IGJpYXNpbmc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBlbmFibGVXaWxkY2FyZFNlYXJjaCgpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LndpbGRjYXJkU2VhcmNoRW5hYmxlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkaXNhYmxlQXV0b2NvcnJlY3Rpb24oKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5kaXNhYmxlQXV0b2NvcnJlY3Rpb24gPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGlzYWJsZUJpbmFyeVBheWxvYWQoKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5yZXR1cm5CaW5hcnkgPSBmYWxzZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFsbG93UHJ1bmVkUmVmaW5lbWVudHMoKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5wcnVuZVJlZmluZW1lbnRzID0gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBidWlsZCgpOiBSZXF1ZXN0IHtcbiAgICBsZXQgYnVpbHRSZXF1ZXN0ID0gYXNzaWduKG5ldyBSZXF1ZXN0KCksIHRoaXMucmVxdWVzdCk7XG4gICAgYnVpbHRSZXF1ZXN0LnJlZmluZW1lbnRzLnB1c2goLi4uTmF2aWdhdGlvbkNvbnZlcnRlci5jb252ZXJ0KHRoaXMudW5wcm9jZXNzZWROYXZpZ2F0aW9ucykpO1xuXG4gICAgcmV0dXJuIHRoaXMuY2xlYXJFbXB0eUFycmF5cyhidWlsdFJlcXVlc3QpO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhckVtcHR5QXJyYXlzKHJlcXVlc3Q6IFJlcXVlc3QpOiBSZXF1ZXN0IHtcbiAgICBmb3IgKGxldCBrZXkgaW4gcmVxdWVzdCkge1xuICAgICAgaWYgKHJlcXVlc3Rba2V5XSBpbnN0YW5jZW9mIEFycmF5ICYmIHJlcXVlc3Rba2V5XS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZGVsZXRlIHJlcXVlc3Rba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcXVlc3Q7XG4gIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
