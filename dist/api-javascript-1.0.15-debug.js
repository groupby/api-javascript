/// <reference path="./all.d.ts" />
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
if (!global.Promise) {
    require('es6-promise').polyfill();
}
__export(require('./core/query'));
__export(require('./core/bridge'));
__export(require('./request-models'));
__export(require('./util'));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwaS1qYXZhc2NyaXB0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG1DQUFtQzs7Ozs7QUFFbkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNwQixPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDcEMsQ0FBQztBQUNELGlCQUFjLGNBQWMsQ0FBQyxFQUFBO0FBQzdCLGlCQUFjLGVBQWUsQ0FBQyxFQUFBO0FBQzlCLGlCQUFjLGtCQUFrQixDQUFDLEVBQUE7QUFFakMsaUJBQWMsUUFBUSxDQUFDLEVBQUEiLCJmaWxlIjoiYXBpLWphdmFzY3JpcHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9hbGwuZC50c1wiIC8+XG5cbmlmICghZ2xvYmFsLlByb21pc2UpIHtcbiAgcmVxdWlyZSgnZXM2LXByb21pc2UnKS5wb2x5ZmlsbCgpO1xufVxuZXhwb3J0ICogZnJvbSAnLi9jb3JlL3F1ZXJ5JztcbmV4cG9ydCAqIGZyb20gJy4vY29yZS9icmlkZ2UnO1xuZXhwb3J0ICogZnJvbSAnLi9yZXF1ZXN0LW1vZGVscyc7XG5leHBvcnQgKiBmcm9tICcuL3Jlc3BvbnNlLW1vZGVscyc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWwnO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

"use strict";
var Request = (function () {
    function Request() {
    }
    return Request;
}());
exports.Request = Request;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlcXVlc3QtbW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQTtJQUFBO0lBZ0NBLENBQUM7SUFBRCxjQUFDO0FBQUQsQ0FoQ0EsQUFnQ0MsSUFBQTtBQWhDWSxlQUFPLFVBZ0NuQixDQUFBIiwiZmlsZSI6InJlcXVlc3QtbW9kZWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVmaW5lbWVudCwgUmVmaW5lbWVudFR5cGUsIFZhbHVlUmVmaW5lbWVudCwgUmFuZ2VSZWZpbmVtZW50IH0gZnJvbSAnLi9yZXNwb25zZS1tb2RlbHMnO1xuXG5leHBvcnQgY2xhc3MgUmVxdWVzdCB7XG5cbiAgLy8gcXVlcnkgcGFyYW1ldGVyc1xuICBxdWVyeTogc3RyaW5nO1xuICBmaWVsZHM6IHN0cmluZ1tdO1xuICBvckZpZWxkczogc3RyaW5nW107XG4gIGluY2x1ZGVkTmF2aWdhdGlvbnM6IHN0cmluZ1tdO1xuICBleGNsdWRlZE5hdmlnYXRpb25zOiBzdHJpbmdbXTtcbiAgc29ydDogU29ydFtdO1xuICBjdXN0b21VcmxQYXJhbXM6IEN1c3RvbVVybFBhcmFtW107XG4gIHJlZmluZW1lbnRzOiBTZWxlY3RlZFJlZmluZW1lbnRbXTtcbiAgcmVzdHJpY3ROYXZpZ2F0aW9uOiBSZXN0cmljdE5hdmlnYXRpb247XG4gIGJpYXNpbmc6IEJpYXNpbmc7XG4gIG1hdGNoU3RyYXRlZ3k6IE1hdGNoU3RyYXRlZ3k7XG5cbiAgLy8gY29uZmlndXJhdGlvblxuICB1c2VySWQ6IHN0cmluZztcbiAgbGFuZ3VhZ2U6IHN0cmluZztcbiAgY29sbGVjdGlvbjogc3RyaW5nO1xuICBhcmVhOiBzdHJpbmc7XG4gIGJpYXNpbmdQcm9maWxlOiBzdHJpbmc7XG5cbiAgLy8gcGFnaW5nXG4gIHNraXA6IG51bWJlcjtcbiAgcGFnZVNpemU6IG51bWJlcjtcblxuICAvLyBmb3JtYXRcbiAgcmV0dXJuQmluYXJ5OiBib29sZWFuO1xuICBwcnVuZVJlZmluZW1lbnRzOiBib29sZWFuO1xuICBkaXNhYmxlQXV0b2NvcnJlY3Rpb246IGJvb2xlYW47XG4gIHdpbGRjYXJkU2VhcmNoRW5hYmxlZDogYm9vbGVhbjtcblxufVxuXG5leHBvcnQgdHlwZSBTb3J0T3JkZXIgPSAnQXNjZW5kaW5nJyB8ICdEZXNjZW5kaW5nJztcblxuZXhwb3J0IGludGVyZmFjZSBTb3J0IHtcbiAgZmllbGQ6IHN0cmluZztcbiAgb3JkZXI6IFNvcnRPcmRlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDdXN0b21VcmxQYXJhbSB7XG4gIGtleTogc3RyaW5nO1xuICB2YWx1ZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlbGVjdGVkUmVmaW5lbWVudCBleHRlbmRzIFJlZmluZW1lbnQge1xuICBuYXZpZ2F0aW9uTmFtZTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlbGVjdGVkUmFuZ2VSZWZpbmVtZW50IGV4dGVuZHMgU2VsZWN0ZWRSZWZpbmVtZW50LCBSYW5nZVJlZmluZW1lbnQge1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNlbGVjdGVkVmFsdWVSZWZpbmVtZW50IGV4dGVuZHMgU2VsZWN0ZWRSZWZpbmVtZW50LCBWYWx1ZVJlZmluZW1lbnQge1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlc3RyaWN0TmF2aWdhdGlvbiB7XG4gIG5hbWU6IHN0cmluZztcbiAgY291bnQ6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgQmlhc1N0cmVuZ3RoID0gJ0Fic29sdXRlX0luY3JlYXNlJyB8ICdTdHJvbmdfSW5jcmVhc2UnIHxcbiAgJ01lZGl1bV9JbmNyZWFzZScgfCAnV2Vha19JbmNyZWFzZScgfCAnTGVhdmVfVW5jaGFuZ2VkJyB8ICdXZWFrX0RlY3JlYXNlJyB8XG4gICdNZWRpdW1fRGVjcmVhc2UnIHwgJ1N0cm9uZ19EZWNyZWFzZScgfCAnQWJzb2x1dGVfRGVjcmVhc2UnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQmlhcyB7XG4gIG5hbWU6IHN0cmluZztcbiAgY29udGVudD86IHN0cmluZztcbiAgc3RyZW5ndGg6IEJpYXNTdHJlbmd0aDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCaWFzaW5nIHtcbiAgYnJpbmdUb1RvcD86IHN0cmluZ1tdO1xuICBhdWdtZW50Qmlhc2VzOiBib29sZWFuO1xuICBiaWFzZXM6IEJpYXNbXTtcbiAgaW5mbHVlbmNlPzogbnVtYmVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFBhcnRpYWxNYXRjaFJ1bGUge1xuICB0ZXJtcz86IG51bWJlcjtcbiAgdGVybXNHcmVhdGVyVGhhbj86IG51bWJlcjtcbiAgbXVzdE1hdGNoPzogbnVtYmVyO1xuICBwZXJjZW50YWdlPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNYXRjaFN0cmF0ZWd5IHtcbiAgcnVsZXM6IFBhcnRpYWxNYXRjaFJ1bGVbXTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==

"use strict";

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJyZXNwb25zZS1tb2RlbHMuanMiLCJzb3VyY2VzQ29udGVudCI6W10sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9

"use strict";
var assign = require('object-assign');
var NavigationConverter = (function () {
    function NavigationConverter() {
    }
    NavigationConverter.convert = function (navigations) {
        return navigations.reduce(function (refinements, navigation) {
            navigation.refinements.forEach(function (refinement) { return refinements.push(assign(refinement, { navigationName: navigation.name })); });
            return refinements;
        }, []);
    };
    return NavigationConverter;
}());
exports.NavigationConverter = NavigationConverter;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQU8sTUFBTSxXQUFXLGVBQWUsQ0FBQyxDQUFDO0FBSXpDO0lBQUE7SUFPQSxDQUFDO0lBTlEsMkJBQU8sR0FBZCxVQUFlLFdBQThCO1FBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFVBQUMsV0FBc0MsRUFBRSxVQUFzQjtZQUN2RixVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFVBQVUsSUFBSSxPQUFBLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUF6RSxDQUF5RSxDQUFDLENBQUM7WUFDeEgsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNyQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQVBBLEFBT0MsSUFBQTtBQVBZLDJCQUFtQixzQkFPL0IsQ0FBQSIsImZpbGUiOiJ1dGlsLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbmltcG9ydCB7IFNlbGVjdGVkUmVmaW5lbWVudCB9IGZyb20gJy4vcmVxdWVzdC1tb2RlbHMnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbiB9IGZyb20gJy4vcmVzcG9uc2UtbW9kZWxzJztcblxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25Db252ZXJ0ZXIge1xuICBzdGF0aWMgY29udmVydChuYXZpZ2F0aW9uczogQXJyYXk8TmF2aWdhdGlvbj4pOiBBcnJheTxTZWxlY3RlZFJlZmluZW1lbnQ+IHtcbiAgICByZXR1cm4gbmF2aWdhdGlvbnMucmVkdWNlKChyZWZpbmVtZW50czogQXJyYXk8U2VsZWN0ZWRSZWZpbmVtZW50PiwgbmF2aWdhdGlvbjogTmF2aWdhdGlvbikgPT4ge1xuICAgICAgbmF2aWdhdGlvbi5yZWZpbmVtZW50cy5mb3JFYWNoKHJlZmluZW1lbnQgPT4gcmVmaW5lbWVudHMucHVzaChhc3NpZ24ocmVmaW5lbWVudCwgeyBuYXZpZ2F0aW9uTmFtZTogbmF2aWdhdGlvbi5uYW1lIH0pKSk7XG4gICAgICByZXR1cm4gcmVmaW5lbWVudHM7XG4gICAgfSwgW10pO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var axios = require('axios');
var assign = require('object-assign');
var query_1 = require('./query');
var SEARCH = '/search';
var REFINEMENTS = '/refinements';
var REFINEMENT_SEARCH = '/refinement';
var CLUSTER = '/cluster';
var BIASING_DEFAULTS = {
    biases: [],
    bringToTop: [],
    augmentBiases: false
};
var AbstractBridge = (function () {
    function AbstractBridge() {
    }
    AbstractBridge.prototype.search = function (query, callback) {
        if (callback === void 0) { callback = undefined; }
        var _a = this.extractRequest(query), request = _a[0], queryParams = _a[1];
        if (request === null)
            return this.generateError('query was not of a recognised type', callback);
        var response = this.fireRequest(this.bridgeUrl, request, queryParams);
        if (callback) {
            response.then(function (res) { return callback(undefined, res); })
                .catch(function (err) { return callback(err); });
        }
        else {
            return response;
        }
    };
    AbstractBridge.prototype.extractRequest = function (query) {
        switch (typeof query) {
            case 'string': return [new query_1.Query(query).build(), {}];
            case 'object':
                if (query instanceof query_1.Query)
                    return [query.build(), query.queryParams];
                else
                    return [query, {}];
            default: return [null, null];
        }
    };
    AbstractBridge.prototype.generateError = function (error, callback) {
        var err = new Error(error);
        if (callback)
            callback(err);
        else
            return Promise.reject(err);
    };
    AbstractBridge.prototype.fireRequest = function (url, body, queryParams) {
        var _this = this;
        var options = {
            url: this.bridgeUrl,
            method: 'post',
            params: queryParams,
            data: this.augmentRequest(body),
            responseType: 'json',
            timeout: 1500
        };
        return axios(options)
            .then(function (res) { return res.data; })
            .then(function (res) { return res.records ? assign(res, { records: res.records.map(_this.convertRecordFields) }) : res; });
    };
    AbstractBridge.prototype.convertRecordFields = function (record) {
        var converted = assign(record, { id: record._id, url: record._u, title: record._t });
        delete converted._id, converted._u, converted._t;
        if (record._snippet) {
            converted.snippet = record._snippet;
            delete converted._snippet;
        }
        return converted;
    };
    return AbstractBridge;
}());
exports.AbstractBridge = AbstractBridge;
var CloudBridge = (function (_super) {
    __extends(CloudBridge, _super);
    function CloudBridge(clientKey, customerId) {
        _super.call(this);
        this.clientKey = clientKey;
        this.bridgeRefinementsUrl = null;
        this.bridgeRefinementsSearchUrl = null;
        this.bridgeClusterUrl = null;
        var baseUrl = "https://" + customerId + ".groupbycloud.com:443/api/v1";
        this.bridgeUrl = baseUrl + SEARCH;
        this.bridgeRefinementsUrl = baseUrl + REFINEMENTS;
        this.bridgeRefinementsSearchUrl = baseUrl + REFINEMENT_SEARCH;
        this.bridgeClusterUrl = baseUrl + CLUSTER;
    }
    CloudBridge.prototype.augmentRequest = function (request) {
        return assign(request, { clientKey: this.clientKey });
    };
    return CloudBridge;
}(AbstractBridge));
exports.CloudBridge = CloudBridge;
var BrowserBridge = (function (_super) {
    __extends(BrowserBridge, _super);
    function BrowserBridge(customerId) {
        _super.call(this);
        this.bridgeUrl = "http://ecomm.groupbycloud.com/semanticSearch/" + customerId;
    }
    BrowserBridge.prototype.augmentRequest = function (request) {
        return request;
    };
    return BrowserBridge;
}(AbstractBridge));
exports.BrowserBridge = BrowserBridge;

//# sourceMappingURL=data:application/json;base64,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QyxxQkFBb0IsU0FBaUIsRUFBRSxVQUFrQjtRQUN2RCxpQkFBTyxDQUFDO1FBRFUsY0FBUyxHQUFULFNBQVMsQ0FBUTtRQUo3Qix5QkFBb0IsR0FBVyxJQUFJLENBQUM7UUFDcEMsK0JBQTBCLEdBQVcsSUFBSSxDQUFDO1FBQzFDLHFCQUFnQixHQUFXLElBQUksQ0FBQztRQUl0QyxJQUFNLE9BQU8sR0FBRyxhQUFXLFVBQVUsaUNBQThCLENBQUM7UUFDcEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxPQUFPLEdBQUcsV0FBVyxDQUFDO1FBQ2xELElBQUksQ0FBQywwQkFBMEIsR0FBRyxPQUFPLEdBQUcsaUJBQWlCLENBQUM7UUFDOUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDNUMsQ0FBQztJQUVTLG9DQUFjLEdBQXhCLFVBQXlCLE9BQVk7UUFDbkMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FsQkEsQUFrQkMsQ0FsQmdDLGNBQWMsR0FrQjlDO0FBbEJZLG1CQUFXLGNBa0J2QixDQUFBO0FBRUQ7SUFBbUMsaUNBQWM7SUFDL0MsdUJBQVksVUFBa0I7UUFDNUIsaUJBQU8sQ0FBQztRQUNSLElBQUksQ0FBQyxTQUFTLEdBQUcsa0RBQWdELFVBQVksQ0FBQztJQUNoRixDQUFDO0lBRVMsc0NBQWMsR0FBeEIsVUFBeUIsT0FBWTtRQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFDSCxvQkFBQztBQUFELENBVEEsQUFTQyxDQVRrQyxjQUFjLEdBU2hEO0FBVFkscUJBQWEsZ0JBU3pCLENBQUEiLCJmaWxlIjoiY29yZS9icmlkZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xuaW1wb3J0IGFzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcbmltcG9ydCB7IFJlcXVlc3QgfSBmcm9tICcuLi9yZXF1ZXN0LW1vZGVscyc7XG5pbXBvcnQgeyBSZXN1bHRzLCBSZWNvcmQgfSBmcm9tICcuLi9yZXNwb25zZS1tb2RlbHMnO1xuaW1wb3J0IHsgUXVlcnkgfSBmcm9tICcuL3F1ZXJ5JztcblxuY29uc3QgU0VBUkNIID0gJy9zZWFyY2gnO1xuY29uc3QgUkVGSU5FTUVOVFMgPSAnL3JlZmluZW1lbnRzJztcbmNvbnN0IFJFRklORU1FTlRfU0VBUkNIID0gJy9yZWZpbmVtZW50JztcbmNvbnN0IENMVVNURVIgPSAnL2NsdXN0ZXInO1xuY29uc3QgQklBU0lOR19ERUZBVUxUUyA9IHtcbiAgYmlhc2VzOiBbXSxcbiAgYnJpbmdUb1RvcDogW10sXG4gIGF1Z21lbnRCaWFzZXM6IGZhbHNlXG59O1xuXG5leHBvcnQgaW50ZXJmYWNlIFJhd1JlY29yZCBleHRlbmRzIFJlY29yZCB7XG4gIF9pZDogc3RyaW5nO1xuICBfdTogc3RyaW5nO1xuICBfdDogc3RyaW5nO1xuICBfc25pcHBldD86IHN0cmluZztcbn1cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFic3RyYWN0QnJpZGdlIHtcbiAgcHJvdGVjdGVkIGJyaWRnZVVybDogc3RyaW5nO1xuXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBhdWdtZW50UmVxdWVzdChyZXF1ZXN0OiBhbnkpOiBhbnk7XG5cbiAgc2VhcmNoKHF1ZXJ5OiBzdHJpbmcgfCBRdWVyeSB8IFJlcXVlc3QsIGNhbGxiYWNrOiAoRXJyb3I/LCBSZXN1bHRzPykgPT4gdm9pZCA9IHVuZGVmaW5lZCk6IFByb21pc2VMaWtlPFJlc3VsdHM+IHwgdm9pZCB7XG4gICAgbGV0IFtyZXF1ZXN0LCBxdWVyeVBhcmFtc10gPSB0aGlzLmV4dHJhY3RSZXF1ZXN0KHF1ZXJ5KTtcbiAgICBpZiAocmVxdWVzdCA9PT0gbnVsbCkgcmV0dXJuIHRoaXMuZ2VuZXJhdGVFcnJvcigncXVlcnkgd2FzIG5vdCBvZiBhIHJlY29nbmlzZWQgdHlwZScsIGNhbGxiYWNrKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5maXJlUmVxdWVzdCh0aGlzLmJyaWRnZVVybCwgcmVxdWVzdCwgcXVlcnlQYXJhbXMpO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgcmVzcG9uc2UudGhlbihyZXMgPT4gY2FsbGJhY2sodW5kZWZpbmVkLCByZXMpKVxuICAgICAgICAuY2F0Y2goZXJyID0+IGNhbGxiYWNrKGVycikpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0UmVxdWVzdChxdWVyeTogYW55KTogW1JlcXVlc3QsIGFueV0ge1xuICAgIHN3aXRjaCAodHlwZW9mIHF1ZXJ5KSB7XG4gICAgICBjYXNlICdzdHJpbmcnOiByZXR1cm4gW25ldyBRdWVyeSg8c3RyaW5nPnF1ZXJ5KS5idWlsZCgpLCB7fV07XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAocXVlcnkgaW5zdGFuY2VvZiBRdWVyeSkgcmV0dXJuIFtxdWVyeS5idWlsZCgpLCBxdWVyeS5xdWVyeVBhcmFtc107XG4gICAgICAgIGVsc2UgcmV0dXJuIFtxdWVyeSwge31dO1xuICAgICAgZGVmYXVsdDogcmV0dXJuIFtudWxsLCBudWxsXTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlRXJyb3IoZXJyb3I6IHN0cmluZywgY2FsbGJhY2s6IChFcnJvcikgPT4gdm9pZCk6IHZvaWQgfCBQcm9taXNlTGlrZTxhbnk+IHtcbiAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoZXJyb3IpO1xuICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZXJyKTtcbiAgICBlbHNlIHJldHVybiBQcm9taXNlLnJlamVjdChlcnIpO1xuICB9XG5cbiAgcHJpdmF0ZSBmaXJlUmVxdWVzdCh1cmw6IHN0cmluZywgYm9keTogUmVxdWVzdCB8IGFueSwgcXVlcnlQYXJhbXM6IGFueSk6IEF4aW9zLklQcm9taXNlPFJlc3VsdHM+IHtcbiAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgdXJsOiB0aGlzLmJyaWRnZVVybCxcbiAgICAgIG1ldGhvZDogJ3Bvc3QnLFxuICAgICAgcGFyYW1zOiBxdWVyeVBhcmFtcyxcbiAgICAgIGRhdGE6IHRoaXMuYXVnbWVudFJlcXVlc3QoYm9keSksXG4gICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICAgIHRpbWVvdXQ6IDE1MDBcbiAgICB9O1xuICAgIHJldHVybiBheGlvcyhvcHRpb25zKVxuICAgICAgLnRoZW4ocmVzID0+IHJlcy5kYXRhKVxuICAgICAgLnRoZW4ocmVzID0+IHJlcy5yZWNvcmRzID8gYXNzaWduKHJlcywgeyByZWNvcmRzOiByZXMucmVjb3Jkcy5tYXAodGhpcy5jb252ZXJ0UmVjb3JkRmllbGRzKSB9KSA6IHJlcyk7XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRSZWNvcmRGaWVsZHMocmVjb3JkOiBSYXdSZWNvcmQpOiBSZWNvcmQgfCBSYXdSZWNvcmQge1xuICAgIGNvbnN0IGNvbnZlcnRlZCA9IGFzc2lnbihyZWNvcmQsIHsgaWQ6IHJlY29yZC5faWQsIHVybDogcmVjb3JkLl91LCB0aXRsZTogcmVjb3JkLl90IH0pO1xuICAgIGRlbGV0ZSBjb252ZXJ0ZWQuX2lkLCBjb252ZXJ0ZWQuX3UsIGNvbnZlcnRlZC5fdDtcblxuICAgIGlmIChyZWNvcmQuX3NuaXBwZXQpIHtcbiAgICAgIGNvbnZlcnRlZC5zbmlwcGV0ID0gcmVjb3JkLl9zbmlwcGV0O1xuICAgICAgZGVsZXRlIGNvbnZlcnRlZC5fc25pcHBldDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29udmVydGVkO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDbG91ZEJyaWRnZSBleHRlbmRzIEFic3RyYWN0QnJpZGdlIHtcblxuICBwcml2YXRlIGJyaWRnZVJlZmluZW1lbnRzVXJsOiBzdHJpbmcgPSBudWxsO1xuICBwcml2YXRlIGJyaWRnZVJlZmluZW1lbnRzU2VhcmNoVXJsOiBzdHJpbmcgPSBudWxsO1xuICBwcml2YXRlIGJyaWRnZUNsdXN0ZXJVcmw6IHN0cmluZyA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjbGllbnRLZXk6IHN0cmluZywgY3VzdG9tZXJJZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zdCBiYXNlVXJsID0gYGh0dHBzOi8vJHtjdXN0b21lcklkfS5ncm91cGJ5Y2xvdWQuY29tOjQ0My9hcGkvdjFgO1xuICAgIHRoaXMuYnJpZGdlVXJsID0gYmFzZVVybCArIFNFQVJDSDtcbiAgICB0aGlzLmJyaWRnZVJlZmluZW1lbnRzVXJsID0gYmFzZVVybCArIFJFRklORU1FTlRTO1xuICAgIHRoaXMuYnJpZGdlUmVmaW5lbWVudHNTZWFyY2hVcmwgPSBiYXNlVXJsICsgUkVGSU5FTUVOVF9TRUFSQ0g7XG4gICAgdGhpcy5icmlkZ2VDbHVzdGVyVXJsID0gYmFzZVVybCArIENMVVNURVI7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXVnbWVudFJlcXVlc3QocmVxdWVzdDogYW55KTogYW55IHtcbiAgICByZXR1cm4gYXNzaWduKHJlcXVlc3QsIHsgY2xpZW50S2V5OiB0aGlzLmNsaWVudEtleSB9KTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQnJvd3NlckJyaWRnZSBleHRlbmRzIEFic3RyYWN0QnJpZGdlIHtcbiAgY29uc3RydWN0b3IoY3VzdG9tZXJJZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcbiAgICB0aGlzLmJyaWRnZVVybCA9IGBodHRwOi8vZWNvbW0uZ3JvdXBieWNsb3VkLmNvbS9zZW1hbnRpY1NlYXJjaC8ke2N1c3RvbWVySWR9YDtcbiAgfVxuXG4gIHByb3RlY3RlZCBhdWdtZW50UmVxdWVzdChyZXF1ZXN0OiBhbnkpOiBhbnkge1xuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=

"use strict";
var assign = require('object-assign');
var qs = require('qs');
var request_models_1 = require('../request-models');
var util_1 = require('../util');
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

//# sourceMappingURL=data:application/json;base64,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QUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QixDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVILFlBQUM7QUFBRCxDQWhMQSxBQWdMQyxJQUFBO0FBaExZLGFBQUssUUFnTGpCLENBQUEiLCJmaWxlIjoiY29yZS9xdWVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBhc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5pbXBvcnQgcXMgPSByZXF1aXJlKCdxcycpO1xuaW1wb3J0IHtcbiAgUmVxdWVzdCxcbiAgU2VsZWN0ZWRWYWx1ZVJlZmluZW1lbnQsXG4gIFNlbGVjdGVkUmFuZ2VSZWZpbmVtZW50LFxuICBTZWxlY3RlZFJlZmluZW1lbnQsXG4gIEN1c3RvbVVybFBhcmFtLFxuICBSZXN0cmljdE5hdmlnYXRpb24sXG4gIFNvcnQsXG4gIE1hdGNoU3RyYXRlZ3ksXG4gIEJpYXNpbmcsXG4gIEJpYXNcbn0gZnJvbSAnLi4vcmVxdWVzdC1tb2RlbHMnO1xuaW1wb3J0IHtcbiAgUmVzdWx0cyxcbiAgUmVjb3JkLFxuICBWYWx1ZVJlZmluZW1lbnQsXG4gIFJhbmdlUmVmaW5lbWVudCxcbiAgUmVmaW5lbWVudCxcbiAgUmVmaW5lbWVudFR5cGUsXG4gIE5hdmlnYXRpb25cbn0gZnJvbSAnLi4vcmVzcG9uc2UtbW9kZWxzJztcbmltcG9ydCB7IE5hdmlnYXRpb25Db252ZXJ0ZXIgfSBmcm9tICcuLi91dGlsJztcblxuZXhwb3J0IGludGVyZmFjZSBRdWVyeUNvbmZpZ3VyYXRpb24ge1xuICB1c2VySWQ/OiBzdHJpbmc7XG4gIGxhbmd1YWdlPzogc3RyaW5nO1xuICBjb2xsZWN0aW9uPzogc3RyaW5nO1xuICBhcmVhPzogc3RyaW5nO1xuICBiaWFzaW5nUHJvZmlsZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGNsYXNzIFF1ZXJ5IHtcbiAgcHJpdmF0ZSByZXF1ZXN0OiBSZXF1ZXN0O1xuICBwcml2YXRlIHVucHJvY2Vzc2VkTmF2aWdhdGlvbnM6IE5hdmlnYXRpb25bXTtcbiAgcXVlcnlQYXJhbXM6IGFueTtcblxuICBjb25zdHJ1Y3RvcihxdWVyeTogc3RyaW5nID0gJycpIHtcbiAgICB0aGlzLnJlcXVlc3QgPSA8UmVxdWVzdD57fTtcbiAgICB0aGlzLnVucHJvY2Vzc2VkTmF2aWdhdGlvbnMgPSBbXTtcbiAgICB0aGlzLnF1ZXJ5UGFyYW1zID0ge307XG5cbiAgICB0aGlzLnJlcXVlc3QucXVlcnkgPSBxdWVyeTtcbiAgICB0aGlzLnJlcXVlc3Quc29ydCA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5maWVsZHMgPSBbXTtcbiAgICB0aGlzLnJlcXVlc3Qub3JGaWVsZHMgPSBbXTtcbiAgICB0aGlzLnJlcXVlc3QucmVmaW5lbWVudHMgPSBbXTtcbiAgICB0aGlzLnJlcXVlc3QuY3VzdG9tVXJsUGFyYW1zID0gW107XG4gICAgdGhpcy5yZXF1ZXN0LmluY2x1ZGVkTmF2aWdhdGlvbnMgPSBbXTtcbiAgICB0aGlzLnJlcXVlc3QuZXhjbHVkZWROYXZpZ2F0aW9ucyA9IFtdO1xuXG4gICAgdGhpcy5yZXF1ZXN0LndpbGRjYXJkU2VhcmNoRW5hYmxlZCA9IGZhbHNlO1xuICAgIHRoaXMucmVxdWVzdC5wcnVuZVJlZmluZW1lbnRzID0gdHJ1ZTtcbiAgfVxuXG4gIHdpdGhDb25maWd1cmF0aW9uKGNvbmZpZ3VyYXRpb246IFF1ZXJ5Q29uZmlndXJhdGlvbik6IFF1ZXJ5IHtcbiAgICBhc3NpZ24odGhpcy5yZXF1ZXN0LCBjb25maWd1cmF0aW9uKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhTZWxlY3RlZFJlZmluZW1lbnRzKC4uLnJlZmluZW1lbnRzOiBBcnJheTxTZWxlY3RlZFZhbHVlUmVmaW5lbWVudCB8IFNlbGVjdGVkUmFuZ2VSZWZpbmVtZW50Pik6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QucmVmaW5lbWVudHMucHVzaCguLi5yZWZpbmVtZW50cyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoUmVmaW5lbWVudHMobmF2aWdhdGlvbk5hbWU6IHN0cmluZywgLi4ucmVmaW5lbWVudHM6IEFycmF5PFZhbHVlUmVmaW5lbWVudCB8IFJhbmdlUmVmaW5lbWVudD4pOiBRdWVyeSB7XG4gICAgbGV0IGNvbnZlcnQgPSAocmVmaW5lbWVudDogUmVmaW5lbWVudCkgPT4gPFNlbGVjdGVkUmVmaW5lbWVudD5hc3NpZ24ocmVmaW5lbWVudCwgeyBuYXZpZ2F0aW9uTmFtZSB9KTtcbiAgICB0aGlzLnJlcXVlc3QucmVmaW5lbWVudHMucHVzaCguLi5yZWZpbmVtZW50cy5tYXAoY29udmVydCkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aE5hdmlnYXRpb25zKC4uLm5hdmlnYXRpb25zOiBOYXZpZ2F0aW9uW10pOiBRdWVyeSB7XG4gICAgdGhpcy51bnByb2Nlc3NlZE5hdmlnYXRpb25zLnB1c2goLi4ubmF2aWdhdGlvbnMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aEN1c3RvbVVybFBhcmFtcyhjdXN0b21VcmxQYXJhbXM6IEN1c3RvbVVybFBhcmFtW10gfCBzdHJpbmcpOiBRdWVyeSB7XG4gICAgaWYgKHR5cGVvZiBjdXN0b21VcmxQYXJhbXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnJlcXVlc3QuY3VzdG9tVXJsUGFyYW1zLnB1c2goLi4udGhpcy5jb252ZXJ0UGFyYW1TdHJpbmcoY3VzdG9tVXJsUGFyYW1zKSk7XG4gICAgfSBlbHNlIGlmIChjdXN0b21VcmxQYXJhbXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5yZXF1ZXN0LmN1c3RvbVVybFBhcmFtcy5wdXNoKC4uLmN1c3RvbVVybFBhcmFtcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0UGFyYW1TdHJpbmcoY3VzdG9tVXJsUGFyYW1zOiBzdHJpbmcpOiBDdXN0b21VcmxQYXJhbVtdIHtcbiAgICBsZXQgcGFyc2VkID0gcXMucGFyc2UoY3VzdG9tVXJsUGFyYW1zKTtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocGFyc2VkKS5yZWR1Y2UoKGNvbnZlcnRlZCwga2V5KSA9PiBjb252ZXJ0ZWQuY29uY2F0KHsga2V5LCB2YWx1ZTogcGFyc2VkW2tleV0gfSksIFtdKTtcbiAgfVxuXG4gIHdpdGhGaWVsZHMoLi4uZmllbGRzOiBzdHJpbmdbXSk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QuZmllbGRzLnB1c2goLi4uZmllbGRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhPckZpZWxkcyguLi5vckZpZWxkczogc3RyaW5nW10pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0Lm9yRmllbGRzLnB1c2goLi4ub3JGaWVsZHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aFNvcnRzKC4uLnNvcnRzOiBTb3J0W10pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LnNvcnQucHVzaCguLi5zb3J0cyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoSW5jbHVkZWROYXZpZ2F0aW9ucyguLi5uYXZpZ2F0aW9uTmFtZXM6IHN0cmluZ1tdKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5pbmNsdWRlZE5hdmlnYXRpb25zLnB1c2goLi4ubmF2aWdhdGlvbk5hbWVzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhFeGNsdWRlZE5hdmlnYXRpb25zKC4uLm5hdmlnYXRpb25OYW1lczogc3RyaW5nW10pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LmV4Y2x1ZGVkTmF2aWdhdGlvbnMucHVzaCguLi5uYXZpZ2F0aW9uTmFtZXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aFF1ZXJ5UGFyYW1zKHF1ZXJ5UGFyYW1zOiBhbnkgfCBzdHJpbmcpOiBRdWVyeSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcXVlcnlQYXJhbXMpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIHJldHVybiBhc3NpZ24odGhpcywgeyBxdWVyeVBhcmFtczogdGhpcy5jb252ZXJ0UXVlcnlTdHJpbmcoPHN0cmluZz5xdWVyeVBhcmFtcykgfSk7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gYXNzaWduKHRoaXMsIHsgcXVlcnlQYXJhbXMgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0UXVlcnlTdHJpbmcocXVlcnlQYXJhbXM6IHN0cmluZyk6IGFueSB7XG4gICAgcmV0dXJuIHFzLnBhcnNlKHF1ZXJ5UGFyYW1zKTtcbiAgfVxuXG4gIHJlZmluZUJ5VmFsdWUobmF2aWdhdGlvbk5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgZXhjbHVkZTogYm9vbGVhbiA9IGZhbHNlKTogUXVlcnkge1xuICAgIHJldHVybiB0aGlzLndpdGhTZWxlY3RlZFJlZmluZW1lbnRzKDxTZWxlY3RlZFZhbHVlUmVmaW5lbWVudD57XG4gICAgICBuYXZpZ2F0aW9uTmFtZSxcbiAgICAgIHZhbHVlLFxuICAgICAgZXhjbHVkZSxcbiAgICAgIHR5cGU6ICdWYWx1ZSdcbiAgICB9KTtcbiAgfVxuXG4gIHJlZmluZUJ5UmFuZ2UobmF2aWdhdGlvbk5hbWU6IHN0cmluZywgbG93OiBudW1iZXIsIGhpZ2g6IG51bWJlciwgZXhjbHVkZTogYm9vbGVhbiA9IGZhbHNlKTogUXVlcnkge1xuICAgIHJldHVybiB0aGlzLndpdGhTZWxlY3RlZFJlZmluZW1lbnRzKDxTZWxlY3RlZFJhbmdlUmVmaW5lbWVudD57XG4gICAgICBuYXZpZ2F0aW9uTmFtZSxcbiAgICAgIGxvdyxcbiAgICAgIGhpZ2gsXG4gICAgICBleGNsdWRlLFxuICAgICAgdHlwZTogJ1JhbmdlJ1xuICAgIH0pO1xuICB9XG5cbiAgcmVzdHJpY3ROYXZpZ2F0aW9uKHJlc3RyaWN0TmF2aWdhdGlvbjogUmVzdHJpY3ROYXZpZ2F0aW9uKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5yZXN0cmljdE5hdmlnYXRpb24gPSByZXN0cmljdE5hdmlnYXRpb247XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBza2lwKHNraXA6IG51bWJlcik6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3Quc2tpcCA9IHNraXA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoUGFnZVNpemUocGFnZVNpemU6IG51bWJlcik6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QucGFnZVNpemUgPSBwYWdlU2l6ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhNYXRjaFN0cmF0ZWd5KG1hdGNoU3RyYXRlZ3k6IE1hdGNoU3RyYXRlZ3kpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0Lm1hdGNoU3RyYXRlZ3kgPSBtYXRjaFN0cmF0ZWd5O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aEJpYXNpbmcoYmlhc2luZzogQmlhc2luZyk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QuYmlhc2luZyA9IGJpYXNpbmc7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBlbmFibGVXaWxkY2FyZFNlYXJjaCgpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LndpbGRjYXJkU2VhcmNoRW5hYmxlZCA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkaXNhYmxlQXV0b2NvcnJlY3Rpb24oKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5kaXNhYmxlQXV0b2NvcnJlY3Rpb24gPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGlzYWJsZUJpbmFyeVBheWxvYWQoKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5yZXR1cm5CaW5hcnkgPSBmYWxzZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGFsbG93UHJ1bmVkUmVmaW5lbWVudHMoKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5wcnVuZVJlZmluZW1lbnRzID0gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBidWlsZCgpOiBSZXF1ZXN0IHtcbiAgICBsZXQgYnVpbHRSZXF1ZXN0ID0gYXNzaWduKG5ldyBSZXF1ZXN0KCksIHRoaXMucmVxdWVzdCk7XG4gICAgYnVpbHRSZXF1ZXN0LnJlZmluZW1lbnRzLnB1c2goLi4uTmF2aWdhdGlvbkNvbnZlcnRlci5jb252ZXJ0KHRoaXMudW5wcm9jZXNzZWROYXZpZ2F0aW9ucykpO1xuXG4gICAgcmV0dXJuIHRoaXMuY2xlYXJFbXB0eUFycmF5cyhidWlsdFJlcXVlc3QpO1xuICB9XG5cbiAgcHJpdmF0ZSBjbGVhckVtcHR5QXJyYXlzKHJlcXVlc3Q6IFJlcXVlc3QpOiBSZXF1ZXN0IHtcbiAgICBmb3IgKGxldCBrZXkgaW4gcmVxdWVzdCkge1xuICAgICAgaWYgKHJlcXVlc3Rba2V5XSBpbnN0YW5jZW9mIEFycmF5ICYmIHJlcXVlc3Rba2V5XS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZGVsZXRlIHJlcXVlc3Rba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlcXVlc3Q7XG4gIH1cblxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
