/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/index.d.ts" />
	"use strict";
	var searchandiser_1 = __webpack_require__(1);
	__webpack_require__(46);
	if (!window['searchandiser']) {
	    window['searchandiser'] = searchandiser_1.initSearchandiser();
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var groupby_api_1 = __webpack_require__(2);
	var utils_1 = __webpack_require__(43);
	var riot = __webpack_require__(44);
	function initSearchandiser() {
	    return function configure(config) {
	        if (config === void 0) { config = {}; }
	        var flux = initCapacitor(config);
	        Object.assign(flux, groupby_api_1.Events);
	        Object.assign(configure, new Searchandiser(flux, config));
	    };
	}
	exports.initSearchandiser = initSearchandiser;
	function initCapacitor(config) {
	    return new groupby_api_1.FluxCapacitor(config.customerId, utils_1.pluck(config, 'collection', 'area', 'language', 'pageSize'));
	}
	var Searchandiser = (function () {
	    function Searchandiser(flux, config) {
	        var _this = this;
	        this.flux = flux;
	        this.config = config;
	        this.attach = function (tagName, cssSelector, options, handler) {
	            if (cssSelector === void 0) { cssSelector = "." + tagName; }
	            if (options === void 0) { options = {}; }
	            var tag = riot.mount(cssSelector, "gb-" + tagName, Object.assign(options, _this));
	            if (handler && tag.length)
	                handler(tag[0]);
	        };
	        this.template = function (templateName, cssSelector, options) {
	            if (options === void 0) { options = {}; }
	            _this.attach('template', cssSelector, Object.assign(options, { templateName: templateName }));
	        };
	        this.search = function (query) { return _this.flux.search(query); };
	        this.style = function () { return _this.config.stylish ? 'gb-stylish' : ''; };
	        this.clone = function () { return initCapacitor(_this.config); };
	    }
	    return Searchandiser;
	}());


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(3);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/index.d.ts"/>
	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__webpack_require__(4).polyfill();
	__webpack_require__(9).pollyfill();
	__export(__webpack_require__(10));
	__export(__webpack_require__(20));
	__export(__webpack_require__(40));
	__export(__webpack_require__(19));
	__export(__webpack_require__(18));

	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZDQUE2Qzs7Ozs7QUFFN0MsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2xDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUVuQyxpQkFBYyxjQUFjLENBQUMsRUFBQTtBQUM3QixpQkFBYyxlQUFlLENBQUMsRUFBQTtBQUM5QixpQkFBYyxtQkFBbUIsQ0FBQyxFQUFBO0FBQ2xDLGlCQUFjLG1CQUFtQixDQUFDLEVBQUE7QUFDbEMsaUJBQWMsa0JBQWtCLENBQUMsRUFBQTtBQUNDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvaW5kZXguZC50c1wiLz5cblxucmVxdWlyZSgnZXM2LXByb21pc2UnKS5wb2x5ZmlsbCgpO1xucmVxdWlyZSgnLi9wb2x5ZmlsbHMnKS5wb2xseWZpbGwoKTtcblxuZXhwb3J0ICogZnJvbSAnLi9jb3JlL3F1ZXJ5JztcbmV4cG9ydCAqIGZyb20gJy4vY29yZS9icmlkZ2UnO1xuZXhwb3J0ICogZnJvbSAnLi9jYXBhY2l0b3IvaW5kZXgnO1xuZXhwb3J0ICogZnJvbSAnLi91dGlscy9jb252ZXJ0ZXInO1xuZXhwb3J0ICogZnJvbSAnLi9tb2RlbHMvcmVxdWVzdCc7XG5leHBvcnQgKiBmcm9tICcuL21vZGVscy9yZXNwb25zZSc7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var require;var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process, global, module) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/jakearchibald/es6-promise/master/LICENSE
	 * @version   3.2.1
	 */

	(function() {
	    "use strict";
	    function lib$es6$promise$utils$$objectOrFunction(x) {
	      return typeof x === 'function' || (typeof x === 'object' && x !== null);
	    }

	    function lib$es6$promise$utils$$isFunction(x) {
	      return typeof x === 'function';
	    }

	    function lib$es6$promise$utils$$isMaybeThenable(x) {
	      return typeof x === 'object' && x !== null;
	    }

	    var lib$es6$promise$utils$$_isArray;
	    if (!Array.isArray) {
	      lib$es6$promise$utils$$_isArray = function (x) {
	        return Object.prototype.toString.call(x) === '[object Array]';
	      };
	    } else {
	      lib$es6$promise$utils$$_isArray = Array.isArray;
	    }

	    var lib$es6$promise$utils$$isArray = lib$es6$promise$utils$$_isArray;
	    var lib$es6$promise$asap$$len = 0;
	    var lib$es6$promise$asap$$vertxNext;
	    var lib$es6$promise$asap$$customSchedulerFn;

	    var lib$es6$promise$asap$$asap = function asap(callback, arg) {
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len] = callback;
	      lib$es6$promise$asap$$queue[lib$es6$promise$asap$$len + 1] = arg;
	      lib$es6$promise$asap$$len += 2;
	      if (lib$es6$promise$asap$$len === 2) {
	        // If len is 2, that means that we need to schedule an async flush.
	        // If additional callbacks are queued before the queue is flushed, they
	        // will be processed by this flush that we are scheduling.
	        if (lib$es6$promise$asap$$customSchedulerFn) {
	          lib$es6$promise$asap$$customSchedulerFn(lib$es6$promise$asap$$flush);
	        } else {
	          lib$es6$promise$asap$$scheduleFlush();
	        }
	      }
	    }

	    function lib$es6$promise$asap$$setScheduler(scheduleFn) {
	      lib$es6$promise$asap$$customSchedulerFn = scheduleFn;
	    }

	    function lib$es6$promise$asap$$setAsap(asapFn) {
	      lib$es6$promise$asap$$asap = asapFn;
	    }

	    var lib$es6$promise$asap$$browserWindow = (typeof window !== 'undefined') ? window : undefined;
	    var lib$es6$promise$asap$$browserGlobal = lib$es6$promise$asap$$browserWindow || {};
	    var lib$es6$promise$asap$$BrowserMutationObserver = lib$es6$promise$asap$$browserGlobal.MutationObserver || lib$es6$promise$asap$$browserGlobal.WebKitMutationObserver;
	    var lib$es6$promise$asap$$isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

	    // test for web worker but not in IE10
	    var lib$es6$promise$asap$$isWorker = typeof Uint8ClampedArray !== 'undefined' &&
	      typeof importScripts !== 'undefined' &&
	      typeof MessageChannel !== 'undefined';

	    // node
	    function lib$es6$promise$asap$$useNextTick() {
	      // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	      // see https://github.com/cujojs/when/issues/410 for details
	      return function() {
	        process.nextTick(lib$es6$promise$asap$$flush);
	      };
	    }

	    // vertx
	    function lib$es6$promise$asap$$useVertxTimer() {
	      return function() {
	        lib$es6$promise$asap$$vertxNext(lib$es6$promise$asap$$flush);
	      };
	    }

	    function lib$es6$promise$asap$$useMutationObserver() {
	      var iterations = 0;
	      var observer = new lib$es6$promise$asap$$BrowserMutationObserver(lib$es6$promise$asap$$flush);
	      var node = document.createTextNode('');
	      observer.observe(node, { characterData: true });

	      return function() {
	        node.data = (iterations = ++iterations % 2);
	      };
	    }

	    // web worker
	    function lib$es6$promise$asap$$useMessageChannel() {
	      var channel = new MessageChannel();
	      channel.port1.onmessage = lib$es6$promise$asap$$flush;
	      return function () {
	        channel.port2.postMessage(0);
	      };
	    }

	    function lib$es6$promise$asap$$useSetTimeout() {
	      return function() {
	        setTimeout(lib$es6$promise$asap$$flush, 1);
	      };
	    }

	    var lib$es6$promise$asap$$queue = new Array(1000);
	    function lib$es6$promise$asap$$flush() {
	      for (var i = 0; i < lib$es6$promise$asap$$len; i+=2) {
	        var callback = lib$es6$promise$asap$$queue[i];
	        var arg = lib$es6$promise$asap$$queue[i+1];

	        callback(arg);

	        lib$es6$promise$asap$$queue[i] = undefined;
	        lib$es6$promise$asap$$queue[i+1] = undefined;
	      }

	      lib$es6$promise$asap$$len = 0;
	    }

	    function lib$es6$promise$asap$$attemptVertx() {
	      try {
	        var r = require;
	        var vertx = __webpack_require__(7);
	        lib$es6$promise$asap$$vertxNext = vertx.runOnLoop || vertx.runOnContext;
	        return lib$es6$promise$asap$$useVertxTimer();
	      } catch(e) {
	        return lib$es6$promise$asap$$useSetTimeout();
	      }
	    }

	    var lib$es6$promise$asap$$scheduleFlush;
	    // Decide what async method to use to triggering processing of queued callbacks:
	    if (lib$es6$promise$asap$$isNode) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useNextTick();
	    } else if (lib$es6$promise$asap$$BrowserMutationObserver) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMutationObserver();
	    } else if (lib$es6$promise$asap$$isWorker) {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useMessageChannel();
	    } else if (lib$es6$promise$asap$$browserWindow === undefined && "function" === 'function') {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$attemptVertx();
	    } else {
	      lib$es6$promise$asap$$scheduleFlush = lib$es6$promise$asap$$useSetTimeout();
	    }
	    function lib$es6$promise$then$$then(onFulfillment, onRejection) {
	      var parent = this;

	      var child = new this.constructor(lib$es6$promise$$internal$$noop);

	      if (child[lib$es6$promise$$internal$$PROMISE_ID] === undefined) {
	        lib$es6$promise$$internal$$makePromise(child);
	      }

	      var state = parent._state;

	      if (state) {
	        var callback = arguments[state - 1];
	        lib$es6$promise$asap$$asap(function(){
	          lib$es6$promise$$internal$$invokeCallback(state, child, callback, parent._result);
	        });
	      } else {
	        lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection);
	      }

	      return child;
	    }
	    var lib$es6$promise$then$$default = lib$es6$promise$then$$then;
	    function lib$es6$promise$promise$resolve$$resolve(object) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (object && typeof object === 'object' && object.constructor === Constructor) {
	        return object;
	      }

	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$resolve(promise, object);
	      return promise;
	    }
	    var lib$es6$promise$promise$resolve$$default = lib$es6$promise$promise$resolve$$resolve;
	    var lib$es6$promise$$internal$$PROMISE_ID = Math.random().toString(36).substring(16);

	    function lib$es6$promise$$internal$$noop() {}

	    var lib$es6$promise$$internal$$PENDING   = void 0;
	    var lib$es6$promise$$internal$$FULFILLED = 1;
	    var lib$es6$promise$$internal$$REJECTED  = 2;

	    var lib$es6$promise$$internal$$GET_THEN_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$selfFulfillment() {
	      return new TypeError("You cannot resolve a promise with itself");
	    }

	    function lib$es6$promise$$internal$$cannotReturnOwn() {
	      return new TypeError('A promises callback cannot return that same promise.');
	    }

	    function lib$es6$promise$$internal$$getThen(promise) {
	      try {
	        return promise.then;
	      } catch(error) {
	        lib$es6$promise$$internal$$GET_THEN_ERROR.error = error;
	        return lib$es6$promise$$internal$$GET_THEN_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	      try {
	        then.call(value, fulfillmentHandler, rejectionHandler);
	      } catch(e) {
	        return e;
	      }
	    }

	    function lib$es6$promise$$internal$$handleForeignThenable(promise, thenable, then) {
	       lib$es6$promise$asap$$asap(function(promise) {
	        var sealed = false;
	        var error = lib$es6$promise$$internal$$tryThen(then, thenable, function(value) {
	          if (sealed) { return; }
	          sealed = true;
	          if (thenable !== value) {
	            lib$es6$promise$$internal$$resolve(promise, value);
	          } else {
	            lib$es6$promise$$internal$$fulfill(promise, value);
	          }
	        }, function(reason) {
	          if (sealed) { return; }
	          sealed = true;

	          lib$es6$promise$$internal$$reject(promise, reason);
	        }, 'Settle: ' + (promise._label || ' unknown promise'));

	        if (!sealed && error) {
	          sealed = true;
	          lib$es6$promise$$internal$$reject(promise, error);
	        }
	      }, promise);
	    }

	    function lib$es6$promise$$internal$$handleOwnThenable(promise, thenable) {
	      if (thenable._state === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, thenable._result);
	      } else if (thenable._state === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, thenable._result);
	      } else {
	        lib$es6$promise$$internal$$subscribe(thenable, undefined, function(value) {
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      }
	    }

	    function lib$es6$promise$$internal$$handleMaybeThenable(promise, maybeThenable, then) {
	      if (maybeThenable.constructor === promise.constructor &&
	          then === lib$es6$promise$then$$default &&
	          constructor.resolve === lib$es6$promise$promise$resolve$$default) {
	        lib$es6$promise$$internal$$handleOwnThenable(promise, maybeThenable);
	      } else {
	        if (then === lib$es6$promise$$internal$$GET_THEN_ERROR) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$GET_THEN_ERROR.error);
	        } else if (then === undefined) {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        } else if (lib$es6$promise$utils$$isFunction(then)) {
	          lib$es6$promise$$internal$$handleForeignThenable(promise, maybeThenable, then);
	        } else {
	          lib$es6$promise$$internal$$fulfill(promise, maybeThenable);
	        }
	      }
	    }

	    function lib$es6$promise$$internal$$resolve(promise, value) {
	      if (promise === value) {
	        lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$selfFulfillment());
	      } else if (lib$es6$promise$utils$$objectOrFunction(value)) {
	        lib$es6$promise$$internal$$handleMaybeThenable(promise, value, lib$es6$promise$$internal$$getThen(value));
	      } else {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$publishRejection(promise) {
	      if (promise._onerror) {
	        promise._onerror(promise._result);
	      }

	      lib$es6$promise$$internal$$publish(promise);
	    }

	    function lib$es6$promise$$internal$$fulfill(promise, value) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }

	      promise._result = value;
	      promise._state = lib$es6$promise$$internal$$FULFILLED;

	      if (promise._subscribers.length !== 0) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, promise);
	      }
	    }

	    function lib$es6$promise$$internal$$reject(promise, reason) {
	      if (promise._state !== lib$es6$promise$$internal$$PENDING) { return; }
	      promise._state = lib$es6$promise$$internal$$REJECTED;
	      promise._result = reason;

	      lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publishRejection, promise);
	    }

	    function lib$es6$promise$$internal$$subscribe(parent, child, onFulfillment, onRejection) {
	      var subscribers = parent._subscribers;
	      var length = subscribers.length;

	      parent._onerror = null;

	      subscribers[length] = child;
	      subscribers[length + lib$es6$promise$$internal$$FULFILLED] = onFulfillment;
	      subscribers[length + lib$es6$promise$$internal$$REJECTED]  = onRejection;

	      if (length === 0 && parent._state) {
	        lib$es6$promise$asap$$asap(lib$es6$promise$$internal$$publish, parent);
	      }
	    }

	    function lib$es6$promise$$internal$$publish(promise) {
	      var subscribers = promise._subscribers;
	      var settled = promise._state;

	      if (subscribers.length === 0) { return; }

	      var child, callback, detail = promise._result;

	      for (var i = 0; i < subscribers.length; i += 3) {
	        child = subscribers[i];
	        callback = subscribers[i + settled];

	        if (child) {
	          lib$es6$promise$$internal$$invokeCallback(settled, child, callback, detail);
	        } else {
	          callback(detail);
	        }
	      }

	      promise._subscribers.length = 0;
	    }

	    function lib$es6$promise$$internal$$ErrorObject() {
	      this.error = null;
	    }

	    var lib$es6$promise$$internal$$TRY_CATCH_ERROR = new lib$es6$promise$$internal$$ErrorObject();

	    function lib$es6$promise$$internal$$tryCatch(callback, detail) {
	      try {
	        return callback(detail);
	      } catch(e) {
	        lib$es6$promise$$internal$$TRY_CATCH_ERROR.error = e;
	        return lib$es6$promise$$internal$$TRY_CATCH_ERROR;
	      }
	    }

	    function lib$es6$promise$$internal$$invokeCallback(settled, promise, callback, detail) {
	      var hasCallback = lib$es6$promise$utils$$isFunction(callback),
	          value, error, succeeded, failed;

	      if (hasCallback) {
	        value = lib$es6$promise$$internal$$tryCatch(callback, detail);

	        if (value === lib$es6$promise$$internal$$TRY_CATCH_ERROR) {
	          failed = true;
	          error = value.error;
	          value = null;
	        } else {
	          succeeded = true;
	        }

	        if (promise === value) {
	          lib$es6$promise$$internal$$reject(promise, lib$es6$promise$$internal$$cannotReturnOwn());
	          return;
	        }

	      } else {
	        value = detail;
	        succeeded = true;
	      }

	      if (promise._state !== lib$es6$promise$$internal$$PENDING) {
	        // noop
	      } else if (hasCallback && succeeded) {
	        lib$es6$promise$$internal$$resolve(promise, value);
	      } else if (failed) {
	        lib$es6$promise$$internal$$reject(promise, error);
	      } else if (settled === lib$es6$promise$$internal$$FULFILLED) {
	        lib$es6$promise$$internal$$fulfill(promise, value);
	      } else if (settled === lib$es6$promise$$internal$$REJECTED) {
	        lib$es6$promise$$internal$$reject(promise, value);
	      }
	    }

	    function lib$es6$promise$$internal$$initializePromise(promise, resolver) {
	      try {
	        resolver(function resolvePromise(value){
	          lib$es6$promise$$internal$$resolve(promise, value);
	        }, function rejectPromise(reason) {
	          lib$es6$promise$$internal$$reject(promise, reason);
	        });
	      } catch(e) {
	        lib$es6$promise$$internal$$reject(promise, e);
	      }
	    }

	    var lib$es6$promise$$internal$$id = 0;
	    function lib$es6$promise$$internal$$nextId() {
	      return lib$es6$promise$$internal$$id++;
	    }

	    function lib$es6$promise$$internal$$makePromise(promise) {
	      promise[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$id++;
	      promise._state = undefined;
	      promise._result = undefined;
	      promise._subscribers = [];
	    }

	    function lib$es6$promise$promise$all$$all(entries) {
	      return new lib$es6$promise$enumerator$$default(this, entries).promise;
	    }
	    var lib$es6$promise$promise$all$$default = lib$es6$promise$promise$all$$all;
	    function lib$es6$promise$promise$race$$race(entries) {
	      /*jshint validthis:true */
	      var Constructor = this;

	      if (!lib$es6$promise$utils$$isArray(entries)) {
	        return new Constructor(function(resolve, reject) {
	          reject(new TypeError('You must pass an array to race.'));
	        });
	      } else {
	        return new Constructor(function(resolve, reject) {
	          var length = entries.length;
	          for (var i = 0; i < length; i++) {
	            Constructor.resolve(entries[i]).then(resolve, reject);
	          }
	        });
	      }
	    }
	    var lib$es6$promise$promise$race$$default = lib$es6$promise$promise$race$$race;
	    function lib$es6$promise$promise$reject$$reject(reason) {
	      /*jshint validthis:true */
	      var Constructor = this;
	      var promise = new Constructor(lib$es6$promise$$internal$$noop);
	      lib$es6$promise$$internal$$reject(promise, reason);
	      return promise;
	    }
	    var lib$es6$promise$promise$reject$$default = lib$es6$promise$promise$reject$$reject;


	    function lib$es6$promise$promise$$needsResolver() {
	      throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	    }

	    function lib$es6$promise$promise$$needsNew() {
	      throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	    }

	    var lib$es6$promise$promise$$default = lib$es6$promise$promise$$Promise;
	    /**
	      Promise objects represent the eventual result of an asynchronous operation. The
	      primary way of interacting with a promise is through its `then` method, which
	      registers callbacks to receive either a promise's eventual value or the reason
	      why the promise cannot be fulfilled.

	      Terminology
	      -----------

	      - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
	      - `thenable` is an object or function that defines a `then` method.
	      - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
	      - `exception` is a value that is thrown using the throw statement.
	      - `reason` is a value that indicates why a promise was rejected.
	      - `settled` the final resting state of a promise, fulfilled or rejected.

	      A promise can be in one of three states: pending, fulfilled, or rejected.

	      Promises that are fulfilled have a fulfillment value and are in the fulfilled
	      state.  Promises that are rejected have a rejection reason and are in the
	      rejected state.  A fulfillment value is never a thenable.

	      Promises can also be said to *resolve* a value.  If this value is also a
	      promise, then the original promise's settled state will match the value's
	      settled state.  So a promise that *resolves* a promise that rejects will
	      itself reject, and a promise that *resolves* a promise that fulfills will
	      itself fulfill.


	      Basic Usage:
	      ------------

	      ```js
	      var promise = new Promise(function(resolve, reject) {
	        // on success
	        resolve(value);

	        // on failure
	        reject(reason);
	      });

	      promise.then(function(value) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Advanced Usage:
	      ---------------

	      Promises shine when abstracting away asynchronous interactions such as
	      `XMLHttpRequest`s.

	      ```js
	      function getJSON(url) {
	        return new Promise(function(resolve, reject){
	          var xhr = new XMLHttpRequest();

	          xhr.open('GET', url);
	          xhr.onreadystatechange = handler;
	          xhr.responseType = 'json';
	          xhr.setRequestHeader('Accept', 'application/json');
	          xhr.send();

	          function handler() {
	            if (this.readyState === this.DONE) {
	              if (this.status === 200) {
	                resolve(this.response);
	              } else {
	                reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
	              }
	            }
	          };
	        });
	      }

	      getJSON('/posts.json').then(function(json) {
	        // on fulfillment
	      }, function(reason) {
	        // on rejection
	      });
	      ```

	      Unlike callbacks, promises are great composable primitives.

	      ```js
	      Promise.all([
	        getJSON('/posts'),
	        getJSON('/comments')
	      ]).then(function(values){
	        values[0] // => postsJSON
	        values[1] // => commentsJSON

	        return values;
	      });
	      ```

	      @class Promise
	      @param {function} resolver
	      Useful for tooling.
	      @constructor
	    */
	    function lib$es6$promise$promise$$Promise(resolver) {
	      this[lib$es6$promise$$internal$$PROMISE_ID] = lib$es6$promise$$internal$$nextId();
	      this._result = this._state = undefined;
	      this._subscribers = [];

	      if (lib$es6$promise$$internal$$noop !== resolver) {
	        typeof resolver !== 'function' && lib$es6$promise$promise$$needsResolver();
	        this instanceof lib$es6$promise$promise$$Promise ? lib$es6$promise$$internal$$initializePromise(this, resolver) : lib$es6$promise$promise$$needsNew();
	      }
	    }

	    lib$es6$promise$promise$$Promise.all = lib$es6$promise$promise$all$$default;
	    lib$es6$promise$promise$$Promise.race = lib$es6$promise$promise$race$$default;
	    lib$es6$promise$promise$$Promise.resolve = lib$es6$promise$promise$resolve$$default;
	    lib$es6$promise$promise$$Promise.reject = lib$es6$promise$promise$reject$$default;
	    lib$es6$promise$promise$$Promise._setScheduler = lib$es6$promise$asap$$setScheduler;
	    lib$es6$promise$promise$$Promise._setAsap = lib$es6$promise$asap$$setAsap;
	    lib$es6$promise$promise$$Promise._asap = lib$es6$promise$asap$$asap;

	    lib$es6$promise$promise$$Promise.prototype = {
	      constructor: lib$es6$promise$promise$$Promise,

	    /**
	      The primary way of interacting with a promise is through its `then` method,
	      which registers callbacks to receive either a promise's eventual value or the
	      reason why the promise cannot be fulfilled.

	      ```js
	      findUser().then(function(user){
	        // user is available
	      }, function(reason){
	        // user is unavailable, and you are given the reason why
	      });
	      ```

	      Chaining
	      --------

	      The return value of `then` is itself a promise.  This second, 'downstream'
	      promise is resolved with the return value of the first promise's fulfillment
	      or rejection handler, or rejected if the handler throws an exception.

	      ```js
	      findUser().then(function (user) {
	        return user.name;
	      }, function (reason) {
	        return 'default name';
	      }).then(function (userName) {
	        // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
	        // will be `'default name'`
	      });

	      findUser().then(function (user) {
	        throw new Error('Found user, but still unhappy');
	      }, function (reason) {
	        throw new Error('`findUser` rejected and we're unhappy');
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
	        // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
	      });
	      ```
	      If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.

	      ```js
	      findUser().then(function (user) {
	        throw new PedagogicalException('Upstream error');
	      }).then(function (value) {
	        // never reached
	      }).then(function (value) {
	        // never reached
	      }, function (reason) {
	        // The `PedgagocialException` is propagated all the way down to here
	      });
	      ```

	      Assimilation
	      ------------

	      Sometimes the value you want to propagate to a downstream promise can only be
	      retrieved asynchronously. This can be achieved by returning a promise in the
	      fulfillment or rejection handler. The downstream promise will then be pending
	      until the returned promise is settled. This is called *assimilation*.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // The user's comments are now available
	      });
	      ```

	      If the assimliated promise rejects, then the downstream promise will also reject.

	      ```js
	      findUser().then(function (user) {
	        return findCommentsByAuthor(user);
	      }).then(function (comments) {
	        // If `findCommentsByAuthor` fulfills, we'll have the value here
	      }, function (reason) {
	        // If `findCommentsByAuthor` rejects, we'll have the reason here
	      });
	      ```

	      Simple Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var result;

	      try {
	        result = findResult();
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js
	      findResult(function(result, err){
	        if (err) {
	          // failure
	        } else {
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findResult().then(function(result){
	        // success
	      }, function(reason){
	        // failure
	      });
	      ```

	      Advanced Example
	      --------------

	      Synchronous Example

	      ```javascript
	      var author, books;

	      try {
	        author = findAuthor();
	        books  = findBooksByAuthor(author);
	        // success
	      } catch(reason) {
	        // failure
	      }
	      ```

	      Errback Example

	      ```js

	      function foundBooks(books) {

	      }

	      function failure(reason) {

	      }

	      findAuthor(function(author, err){
	        if (err) {
	          failure(err);
	          // failure
	        } else {
	          try {
	            findBoooksByAuthor(author, function(books, err) {
	              if (err) {
	                failure(err);
	              } else {
	                try {
	                  foundBooks(books);
	                } catch(reason) {
	                  failure(reason);
	                }
	              }
	            });
	          } catch(error) {
	            failure(err);
	          }
	          // success
	        }
	      });
	      ```

	      Promise Example;

	      ```javascript
	      findAuthor().
	        then(findBooksByAuthor).
	        then(function(books){
	          // found books
	      }).catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method then
	      @param {Function} onFulfilled
	      @param {Function} onRejected
	      Useful for tooling.
	      @return {Promise}
	    */
	      then: lib$es6$promise$then$$default,

	    /**
	      `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
	      as the catch block of a try/catch statement.

	      ```js
	      function findAuthor(){
	        throw new Error('couldn't find that author');
	      }

	      // synchronous
	      try {
	        findAuthor();
	      } catch(reason) {
	        // something went wrong
	      }

	      // async with promises
	      findAuthor().catch(function(reason){
	        // something went wrong
	      });
	      ```

	      @method catch
	      @param {Function} onRejection
	      Useful for tooling.
	      @return {Promise}
	    */
	      'catch': function(onRejection) {
	        return this.then(null, onRejection);
	      }
	    };
	    var lib$es6$promise$enumerator$$default = lib$es6$promise$enumerator$$Enumerator;
	    function lib$es6$promise$enumerator$$Enumerator(Constructor, input) {
	      this._instanceConstructor = Constructor;
	      this.promise = new Constructor(lib$es6$promise$$internal$$noop);

	      if (!this.promise[lib$es6$promise$$internal$$PROMISE_ID]) {
	        lib$es6$promise$$internal$$makePromise(this.promise);
	      }

	      if (lib$es6$promise$utils$$isArray(input)) {
	        this._input     = input;
	        this.length     = input.length;
	        this._remaining = input.length;

	        this._result = new Array(this.length);

	        if (this.length === 0) {
	          lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	        } else {
	          this.length = this.length || 0;
	          this._enumerate();
	          if (this._remaining === 0) {
	            lib$es6$promise$$internal$$fulfill(this.promise, this._result);
	          }
	        }
	      } else {
	        lib$es6$promise$$internal$$reject(this.promise, lib$es6$promise$enumerator$$validationError());
	      }
	    }

	    function lib$es6$promise$enumerator$$validationError() {
	      return new Error('Array Methods must be provided an Array');
	    }

	    lib$es6$promise$enumerator$$Enumerator.prototype._enumerate = function() {
	      var length  = this.length;
	      var input   = this._input;

	      for (var i = 0; this._state === lib$es6$promise$$internal$$PENDING && i < length; i++) {
	        this._eachEntry(input[i], i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._eachEntry = function(entry, i) {
	      var c = this._instanceConstructor;
	      var resolve = c.resolve;

	      if (resolve === lib$es6$promise$promise$resolve$$default) {
	        var then = lib$es6$promise$$internal$$getThen(entry);

	        if (then === lib$es6$promise$then$$default &&
	            entry._state !== lib$es6$promise$$internal$$PENDING) {
	          this._settledAt(entry._state, i, entry._result);
	        } else if (typeof then !== 'function') {
	          this._remaining--;
	          this._result[i] = entry;
	        } else if (c === lib$es6$promise$promise$$default) {
	          var promise = new c(lib$es6$promise$$internal$$noop);
	          lib$es6$promise$$internal$$handleMaybeThenable(promise, entry, then);
	          this._willSettleAt(promise, i);
	        } else {
	          this._willSettleAt(new c(function(resolve) { resolve(entry); }), i);
	        }
	      } else {
	        this._willSettleAt(resolve(entry), i);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._settledAt = function(state, i, value) {
	      var promise = this.promise;

	      if (promise._state === lib$es6$promise$$internal$$PENDING) {
	        this._remaining--;

	        if (state === lib$es6$promise$$internal$$REJECTED) {
	          lib$es6$promise$$internal$$reject(promise, value);
	        } else {
	          this._result[i] = value;
	        }
	      }

	      if (this._remaining === 0) {
	        lib$es6$promise$$internal$$fulfill(promise, this._result);
	      }
	    };

	    lib$es6$promise$enumerator$$Enumerator.prototype._willSettleAt = function(promise, i) {
	      var enumerator = this;

	      lib$es6$promise$$internal$$subscribe(promise, undefined, function(value) {
	        enumerator._settledAt(lib$es6$promise$$internal$$FULFILLED, i, value);
	      }, function(reason) {
	        enumerator._settledAt(lib$es6$promise$$internal$$REJECTED, i, reason);
	      });
	    };
	    function lib$es6$promise$polyfill$$polyfill() {
	      var local;

	      if (typeof global !== 'undefined') {
	          local = global;
	      } else if (typeof self !== 'undefined') {
	          local = self;
	      } else {
	          try {
	              local = Function('return this')();
	          } catch (e) {
	              throw new Error('polyfill failed because global object is unavailable in this environment');
	          }
	      }

	      var P = local.Promise;

	      if (P && Object.prototype.toString.call(P.resolve()) === '[object Promise]' && !P.cast) {
	        return;
	      }

	      local.Promise = lib$es6$promise$promise$$default;
	    }
	    var lib$es6$promise$polyfill$$default = lib$es6$promise$polyfill$$polyfill;

	    var lib$es6$promise$umd$$ES6Promise = {
	      'Promise': lib$es6$promise$promise$$default,
	      'polyfill': lib$es6$promise$polyfill$$default
	    };

	    /* global define:true module:true window: true */
	    if ("function" === 'function' && __webpack_require__(8)['amd']) {
	      !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return lib$es6$promise$umd$$ES6Promise; }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if (typeof module !== 'undefined' && module['exports']) {
	      module['exports'] = lib$es6$promise$umd$$ES6Promise;
	    } else if (typeof this !== 'undefined') {
	      this['ES6Promise'] = lib$es6$promise$umd$$ES6Promise;
	    }

	    lib$es6$promise$polyfill$$default();
	}).call(this);


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5), (function() { return this; }()), __webpack_require__(6)(module)))

/***/ },
/* 5 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 7 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";
	function pollyfill() {
	    if (!Array.prototype.findIndex) {
	        Array.prototype.findIndex = function (predicate) {
	            if (this === null) {
	                throw new TypeError('Array.prototype.findIndex called on null or undefined');
	            }
	            if (typeof predicate !== 'function') {
	                throw new TypeError('predicate must be a function');
	            }
	            var list = Object(this);
	            var length = list.length >>> 0;
	            var thisArg = arguments[1];
	            var value;
	            for (var i = 0; i < length; i++) {
	                value = list[i];
	                if (predicate.call(thisArg, value, i, list)) {
	                    return i;
	                }
	            }
	            return -1;
	        };
	    }
	    if (!Array.prototype.fill) {
	        Array.prototype.fill = function (value) {
	            // Steps 1-2.
	            if (this == null) {
	                throw new TypeError('this is null or not defined');
	            }
	            var O = Object(this);
	            // Steps 3-5.
	            var len = O.length >>> 0;
	            // Steps 6-7.
	            var start = arguments[1];
	            var relativeStart = start >> 0;
	            // Step 8.
	            var k = relativeStart < 0 ?
	                Math.max(len + relativeStart, 0) :
	                Math.min(relativeStart, len);
	            // Steps 9-10.
	            var end = arguments[2];
	            var relativeEnd = end === undefined ?
	                len : end >> 0;
	            // Step 11.
	            var final = relativeEnd < 0 ?
	                Math.max(len + relativeEnd, 0) :
	                Math.min(relativeEnd, len);
	            // Step 12.
	            while (k < final) {
	                O[k] = value;
	                k++;
	            }
	            // Step 13.
	            return O;
	        };
	    }
	    if (typeof Object.assign != 'function') {
	        Object.assign = function (target) {
	            'use strict';
	            if (target == null) {
	                throw new TypeError('Cannot convert undefined or null to object');
	            }
	            target = Object(target);
	            for (var index = 1; index < arguments.length; index++) {
	                var source = arguments[index];
	                if (source != null) {
	                    for (var key in source) {
	                        if (Object.prototype.hasOwnProperty.call(source, key)) {
	                            target[key] = source[key];
	                        }
	                    }
	                }
	            }
	            return target;
	        };
	    }
	}
	exports.pollyfill = pollyfill;

	//# sourceMappingURL=data:application/json;base64,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QUM7QUFFSCxDQUFDO0FBekZlLGlCQUFTLFlBeUZ4QixDQUFBIiwiZmlsZSI6InBvbHlmaWxscy9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBwb2xseWZpbGwoKSB7XG4gIGlmICghQXJyYXkucHJvdG90eXBlLmZpbmRJbmRleCkge1xuICAgIEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXggPSBmdW5jdGlvbihwcmVkaWNhdGUpIHtcbiAgICAgIGlmICh0aGlzID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FycmF5LnByb3RvdHlwZS5maW5kSW5kZXggY2FsbGVkIG9uIG51bGwgb3IgdW5kZWZpbmVkJyk7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHByZWRpY2F0ZSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwcmVkaWNhdGUgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG4gICAgICB9XG4gICAgICB2YXIgbGlzdCA9IE9iamVjdCh0aGlzKTtcbiAgICAgIHZhciBsZW5ndGggPSBsaXN0Lmxlbmd0aCA+Pj4gMDtcbiAgICAgIHZhciB0aGlzQXJnID0gYXJndW1lbnRzWzFdO1xuICAgICAgdmFyIHZhbHVlO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlID0gbGlzdFtpXTtcbiAgICAgICAgaWYgKHByZWRpY2F0ZS5jYWxsKHRoaXNBcmcsIHZhbHVlLCBpLCBsaXN0KSkge1xuICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfTtcbiAgfVxuXG4gIGlmICghQXJyYXkucHJvdG90eXBlLmZpbGwpIHtcbiAgICBBcnJheS5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG5cbiAgICAgIC8vIFN0ZXBzIDEtMi5cbiAgICAgIGlmICh0aGlzID09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcigndGhpcyBpcyBudWxsIG9yIG5vdCBkZWZpbmVkJyk7XG4gICAgICB9XG5cbiAgICAgIHZhciBPID0gT2JqZWN0KHRoaXMpO1xuXG4gICAgICAvLyBTdGVwcyAzLTUuXG4gICAgICB2YXIgbGVuID0gTy5sZW5ndGggPj4+IDA7XG5cbiAgICAgIC8vIFN0ZXBzIDYtNy5cbiAgICAgIHZhciBzdGFydCA9IGFyZ3VtZW50c1sxXTtcbiAgICAgIHZhciByZWxhdGl2ZVN0YXJ0ID0gc3RhcnQgPj4gMDtcblxuICAgICAgLy8gU3RlcCA4LlxuICAgICAgdmFyIGsgPSByZWxhdGl2ZVN0YXJ0IDwgMCA/XG4gICAgICAgIE1hdGgubWF4KGxlbiArIHJlbGF0aXZlU3RhcnQsIDApIDpcbiAgICAgICAgTWF0aC5taW4ocmVsYXRpdmVTdGFydCwgbGVuKTtcblxuICAgICAgLy8gU3RlcHMgOS0xMC5cbiAgICAgIHZhciBlbmQgPSBhcmd1bWVudHNbMl07XG4gICAgICB2YXIgcmVsYXRpdmVFbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/XG4gICAgICAgIGxlbiA6IGVuZCA+PiAwO1xuXG4gICAgICAvLyBTdGVwIDExLlxuICAgICAgdmFyIGZpbmFsID0gcmVsYXRpdmVFbmQgPCAwID9cbiAgICAgICAgTWF0aC5tYXgobGVuICsgcmVsYXRpdmVFbmQsIDApIDpcbiAgICAgICAgTWF0aC5taW4ocmVsYXRpdmVFbmQsIGxlbik7XG5cbiAgICAgIC8vIFN0ZXAgMTIuXG4gICAgICB3aGlsZSAoayA8IGZpbmFsKSB7XG4gICAgICAgIE9ba10gPSB2YWx1ZTtcbiAgICAgICAgaysrO1xuICAgICAgfVxuXG4gICAgICAvLyBTdGVwIDEzLlxuICAgICAgcmV0dXJuIE87XG4gICAgfTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgT2JqZWN0LmFzc2lnbiAhPSAnZnVuY3Rpb24nKSB7XG4gICAgT2JqZWN0LmFzc2lnbiA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgaWYgKHRhcmdldCA9PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjb252ZXJ0IHVuZGVmaW5lZCBvciBudWxsIHRvIG9iamVjdCcpO1xuICAgICAgfVxuXG4gICAgICB0YXJnZXQgPSBPYmplY3QodGFyZ2V0KTtcbiAgICAgIGZvciAodmFyIGluZGV4ID0gMTsgaW5kZXggPCBhcmd1bWVudHMubGVuZ3RoOyBpbmRleCsrKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaW5kZXhdO1xuICAgICAgICBpZiAoc291cmNlICE9IG51bGwpIHtcbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9O1xuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var qs = __webpack_require__(11);
	var deepEql = __webpack_require__(15);
	var request_1 = __webpack_require__(18);
	var converter_1 = __webpack_require__(19);
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
	    Query.prototype.withQuery = function (query) {
	        this.request.query = query;
	        return this;
	    };
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
	    Query.prototype.withoutSelectedRefinements = function () {
	        var _this = this;
	        var refinements = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            refinements[_i - 0] = arguments[_i];
	        }
	        refinements.forEach(function (refinement) {
	            var index = _this.request.refinements.findIndex(function (ref) { return deepEql(ref, refinement); });
	            if (index > -1)
	                _this.request.refinements.splice(index, 1);
	        });
	        return this;
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
	    Object.defineProperty(Query.prototype, "rawRequest", {
	        get: function () {
	            return Object.create(this.request);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Query.prototype, "rawNavigations", {
	        get: function () {
	            return Object.create(this.unprocessedNavigations);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Query.prototype.build = function () {
	        var builtRequest = Object.assign(new request_1.Request(), this.request);
	        (_a = builtRequest.refinements).push.apply(_a, converter_1.NavigationConverter.convert(this.unprocessedNavigations));
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

	//# sourceMappingURL=data:application/json;base64,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QUFxTUMsSUFBQTtBQXJNWSxhQUFLLFFBcU1qQixDQUFBIiwiZmlsZSI6ImNvcmUvcXVlcnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcXMgPSByZXF1aXJlKCdxcycpO1xuaW1wb3J0IGRlZXBFcWwgPSByZXF1aXJlKCdkZWVwLWVxdWFsJyk7XG5pbXBvcnQge1xuICBSZXF1ZXN0LFxuICBTZWxlY3RlZFZhbHVlUmVmaW5lbWVudCxcbiAgU2VsZWN0ZWRSYW5nZVJlZmluZW1lbnQsXG4gIFNlbGVjdGVkUmVmaW5lbWVudCxcbiAgQ3VzdG9tVXJsUGFyYW0sXG4gIFJlc3RyaWN0TmF2aWdhdGlvbixcbiAgU29ydCxcbiAgTWF0Y2hTdHJhdGVneSxcbiAgQmlhc2luZyxcbiAgQmlhc1xufSBmcm9tICcuLi9tb2RlbHMvcmVxdWVzdCc7XG5pbXBvcnQge1xuICBSZXN1bHRzLFxuICBSZWNvcmQsXG4gIFZhbHVlUmVmaW5lbWVudCxcbiAgUmFuZ2VSZWZpbmVtZW50LFxuICBSZWZpbmVtZW50LFxuICBSZWZpbmVtZW50VHlwZSxcbiAgTmF2aWdhdGlvblxufSBmcm9tICcuLi9tb2RlbHMvcmVzcG9uc2UnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkNvbnZlcnRlciB9IGZyb20gJy4uL3V0aWxzL2NvbnZlcnRlcic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUXVlcnlDb25maWd1cmF0aW9uIHtcbiAgdXNlcklkPzogc3RyaW5nO1xuICBsYW5ndWFnZT86IHN0cmluZztcbiAgY29sbGVjdGlvbj86IHN0cmluZztcbiAgYXJlYT86IHN0cmluZztcbiAgYmlhc2luZ1Byb2ZpbGU/OiBzdHJpbmc7XG4gIHBhZ2VTaXplPzogbnVtYmVyO1xufVxuXG5leHBvcnQgY2xhc3MgUXVlcnkge1xuICBwcml2YXRlIHJlcXVlc3Q6IFJlcXVlc3Q7XG4gIHByaXZhdGUgdW5wcm9jZXNzZWROYXZpZ2F0aW9uczogTmF2aWdhdGlvbltdO1xuICBxdWVyeVBhcmFtczogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHF1ZXJ5OiBzdHJpbmcgPSAnJykge1xuICAgIHRoaXMucmVxdWVzdCA9IDxSZXF1ZXN0Pnt9O1xuICAgIHRoaXMudW5wcm9jZXNzZWROYXZpZ2F0aW9ucyA9IFtdO1xuICAgIHRoaXMucXVlcnlQYXJhbXMgPSB7fTtcblxuICAgIHRoaXMucmVxdWVzdC5xdWVyeSA9IHF1ZXJ5O1xuICAgIHRoaXMucmVxdWVzdC5zb3J0ID0gW107XG4gICAgdGhpcy5yZXF1ZXN0LmZpZWxkcyA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5vckZpZWxkcyA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5yZWZpbmVtZW50cyA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5jdXN0b21VcmxQYXJhbXMgPSBbXTtcbiAgICB0aGlzLnJlcXVlc3QuaW5jbHVkZWROYXZpZ2F0aW9ucyA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5leGNsdWRlZE5hdmlnYXRpb25zID0gW107XG5cbiAgICB0aGlzLnJlcXVlc3Qud2lsZGNhcmRTZWFyY2hFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5yZXF1ZXN0LnBydW5lUmVmaW5lbWVudHMgPSB0cnVlO1xuICB9XG5cbiAgd2l0aFF1ZXJ5KHF1ZXJ5OiBzdHJpbmcpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LnF1ZXJ5ID0gcXVlcnk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoQ29uZmlndXJhdGlvbihjb25maWd1cmF0aW9uOiBRdWVyeUNvbmZpZ3VyYXRpb24pOiBRdWVyeSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLnJlcXVlc3QsIGNvbmZpZ3VyYXRpb24pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aFNlbGVjdGVkUmVmaW5lbWVudHMoLi4ucmVmaW5lbWVudHM6IEFycmF5PFNlbGVjdGVkVmFsdWVSZWZpbmVtZW50IHwgU2VsZWN0ZWRSYW5nZVJlZmluZW1lbnQ+KTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5yZWZpbmVtZW50cy5wdXNoKC4uLnJlZmluZW1lbnRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhvdXRTZWxlY3RlZFJlZmluZW1lbnRzKC4uLnJlZmluZW1lbnRzOiBBcnJheTxTZWxlY3RlZFZhbHVlUmVmaW5lbWVudCB8IFNlbGVjdGVkUmFuZ2VSZWZpbmVtZW50Pik6IFF1ZXJ5IHtcbiAgICByZWZpbmVtZW50cy5mb3JFYWNoKHJlZmluZW1lbnQgPT4ge1xuICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnJlcXVlc3QucmVmaW5lbWVudHMuZmluZEluZGV4KHJlZiA9PiBkZWVwRXFsKHJlZiwgcmVmaW5lbWVudCkpO1xuICAgICAgaWYgKGluZGV4ID4gLTEpIHRoaXMucmVxdWVzdC5yZWZpbmVtZW50cy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aFJlZmluZW1lbnRzKG5hdmlnYXRpb25OYW1lOiBzdHJpbmcsIC4uLnJlZmluZW1lbnRzOiBBcnJheTxWYWx1ZVJlZmluZW1lbnQgfCBSYW5nZVJlZmluZW1lbnQ+KTogUXVlcnkge1xuICAgIGNvbnN0IGNvbnZlcnQgPSAocmVmaW5lbWVudDogUmVmaW5lbWVudCkgPT4gPFNlbGVjdGVkUmVmaW5lbWVudD5PYmplY3QuYXNzaWduKHJlZmluZW1lbnQsIHsgbmF2aWdhdGlvbk5hbWUgfSk7XG4gICAgdGhpcy5yZXF1ZXN0LnJlZmluZW1lbnRzLnB1c2goLi4ucmVmaW5lbWVudHMubWFwKGNvbnZlcnQpKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhOYXZpZ2F0aW9ucyguLi5uYXZpZ2F0aW9uczogTmF2aWdhdGlvbltdKTogUXVlcnkge1xuICAgIHRoaXMudW5wcm9jZXNzZWROYXZpZ2F0aW9ucy5wdXNoKC4uLm5hdmlnYXRpb25zKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhDdXN0b21VcmxQYXJhbXMoY3VzdG9tVXJsUGFyYW1zOiBDdXN0b21VcmxQYXJhbVtdIHwgc3RyaW5nKTogUXVlcnkge1xuICAgIGlmICh0eXBlb2YgY3VzdG9tVXJsUGFyYW1zID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5yZXF1ZXN0LmN1c3RvbVVybFBhcmFtcy5wdXNoKC4uLnRoaXMuY29udmVydFBhcmFtU3RyaW5nKGN1c3RvbVVybFBhcmFtcykpO1xuICAgIH0gZWxzZSBpZiAoY3VzdG9tVXJsUGFyYW1zIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgIHRoaXMucmVxdWVzdC5jdXN0b21VcmxQYXJhbXMucHVzaCguLi5jdXN0b21VcmxQYXJhbXMpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydFBhcmFtU3RyaW5nKGN1c3RvbVVybFBhcmFtczogc3RyaW5nKTogQ3VzdG9tVXJsUGFyYW1bXSB7XG4gICAgY29uc3QgcGFyc2VkID0gcXMucGFyc2UoY3VzdG9tVXJsUGFyYW1zKTtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocGFyc2VkKS5yZWR1Y2UoKGNvbnZlcnRlZCwga2V5KSA9PiBjb252ZXJ0ZWQuY29uY2F0KHsga2V5LCB2YWx1ZTogcGFyc2VkW2tleV0gfSksIFtdKTtcbiAgfVxuXG4gIHdpdGhGaWVsZHMoLi4uZmllbGRzOiBzdHJpbmdbXSk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QuZmllbGRzLnB1c2goLi4uZmllbGRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhPckZpZWxkcyguLi5vckZpZWxkczogc3RyaW5nW10pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0Lm9yRmllbGRzLnB1c2goLi4ub3JGaWVsZHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aFNvcnRzKC4uLnNvcnRzOiBTb3J0W10pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LnNvcnQucHVzaCguLi5zb3J0cyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoSW5jbHVkZWROYXZpZ2F0aW9ucyguLi5uYXZpZ2F0aW9uTmFtZXM6IHN0cmluZ1tdKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5pbmNsdWRlZE5hdmlnYXRpb25zLnB1c2goLi4ubmF2aWdhdGlvbk5hbWVzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhFeGNsdWRlZE5hdmlnYXRpb25zKC4uLm5hdmlnYXRpb25OYW1lczogc3RyaW5nW10pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LmV4Y2x1ZGVkTmF2aWdhdGlvbnMucHVzaCguLi5uYXZpZ2F0aW9uTmFtZXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aFF1ZXJ5UGFyYW1zKHF1ZXJ5UGFyYW1zOiBhbnkgfCBzdHJpbmcpOiBRdWVyeSB7XG4gICAgc3dpdGNoICh0eXBlb2YgcXVlcnlQYXJhbXMpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHRoaXMsIHsgcXVlcnlQYXJhbXM6IHRoaXMuY29udmVydFF1ZXJ5U3RyaW5nKDxzdHJpbmc+cXVlcnlQYXJhbXMpIH0pO1xuICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24odGhpcywgeyBxdWVyeVBhcmFtcyB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNvbnZlcnRRdWVyeVN0cmluZyhxdWVyeVBhcmFtczogc3RyaW5nKTogYW55IHtcbiAgICByZXR1cm4gcXMucGFyc2UocXVlcnlQYXJhbXMpO1xuICB9XG5cbiAgcmVmaW5lQnlWYWx1ZShuYXZpZ2F0aW9uTmFtZTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nLCBleGNsdWRlOiBib29sZWFuID0gZmFsc2UpOiBRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMud2l0aFNlbGVjdGVkUmVmaW5lbWVudHMoPFNlbGVjdGVkVmFsdWVSZWZpbmVtZW50PntcbiAgICAgIG5hdmlnYXRpb25OYW1lLFxuICAgICAgdmFsdWUsXG4gICAgICBleGNsdWRlLFxuICAgICAgdHlwZTogJ1ZhbHVlJ1xuICAgIH0pO1xuICB9XG5cbiAgcmVmaW5lQnlSYW5nZShuYXZpZ2F0aW9uTmFtZTogc3RyaW5nLCBsb3c6IG51bWJlciwgaGlnaDogbnVtYmVyLCBleGNsdWRlOiBib29sZWFuID0gZmFsc2UpOiBRdWVyeSB7XG4gICAgcmV0dXJuIHRoaXMud2l0aFNlbGVjdGVkUmVmaW5lbWVudHMoPFNlbGVjdGVkUmFuZ2VSZWZpbmVtZW50PntcbiAgICAgIG5hdmlnYXRpb25OYW1lLFxuICAgICAgbG93LFxuICAgICAgaGlnaCxcbiAgICAgIGV4Y2x1ZGUsXG4gICAgICB0eXBlOiAnUmFuZ2UnXG4gICAgfSk7XG4gIH1cblxuICByZXN0cmljdE5hdmlnYXRpb24ocmVzdHJpY3ROYXZpZ2F0aW9uOiBSZXN0cmljdE5hdmlnYXRpb24pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LnJlc3RyaWN0TmF2aWdhdGlvbiA9IHJlc3RyaWN0TmF2aWdhdGlvbjtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNraXAoc2tpcDogbnVtYmVyKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5za2lwID0gc2tpcDtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhQYWdlU2l6ZShwYWdlU2l6ZTogbnVtYmVyKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5wYWdlU2l6ZSA9IHBhZ2VTaXplO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aE1hdGNoU3RyYXRlZ3kobWF0Y2hTdHJhdGVneTogTWF0Y2hTdHJhdGVneSk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QubWF0Y2hTdHJhdGVneSA9IG1hdGNoU3RyYXRlZ3k7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoQmlhc2luZyhiaWFzaW5nOiBCaWFzaW5nKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5iaWFzaW5nID0gYmlhc2luZztcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGVuYWJsZVdpbGRjYXJkU2VhcmNoKCk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3Qud2lsZGNhcmRTZWFyY2hFbmFibGVkID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRpc2FibGVBdXRvY29ycmVjdGlvbigpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LmRpc2FibGVBdXRvY29ycmVjdGlvbiA9IHRydWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBkaXNhYmxlQmluYXJ5UGF5bG9hZCgpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LnJldHVybkJpbmFyeSA9IGZhbHNlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgYWxsb3dQcnVuZWRSZWZpbmVtZW50cygpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LnBydW5lUmVmaW5lbWVudHMgPSBmYWxzZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGdldCByYXdSZXF1ZXN0KCk6IFJlcXVlc3Qge1xuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKHRoaXMucmVxdWVzdCk7XG4gIH1cblxuICBnZXQgcmF3TmF2aWdhdGlvbnMoKTogTmF2aWdhdGlvbltdIHtcbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZSh0aGlzLnVucHJvY2Vzc2VkTmF2aWdhdGlvbnMpO1xuICB9XG5cbiAgYnVpbGQoKTogUmVxdWVzdCB7XG4gICAgY29uc3QgYnVpbHRSZXF1ZXN0ID0gT2JqZWN0LmFzc2lnbihuZXcgUmVxdWVzdCgpLCB0aGlzLnJlcXVlc3QpO1xuICAgIGJ1aWx0UmVxdWVzdC5yZWZpbmVtZW50cy5wdXNoKC4uLk5hdmlnYXRpb25Db252ZXJ0ZXIuY29udmVydCh0aGlzLnVucHJvY2Vzc2VkTmF2aWdhdGlvbnMpKTtcblxuICAgIHJldHVybiB0aGlzLmNsZWFyRW1wdHlBcnJheXMoYnVpbHRSZXF1ZXN0KTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJFbXB0eUFycmF5cyhyZXF1ZXN0OiBSZXF1ZXN0KTogUmVxdWVzdCB7XG4gICAgZm9yIChsZXQga2V5IGluIHJlcXVlc3QpIHtcbiAgICAgIGlmIChyZXF1ZXN0W2tleV0gaW5zdGFuY2VvZiBBcnJheSAmJiByZXF1ZXN0W2tleV0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGRlbGV0ZSByZXF1ZXN0W2tleV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Stringify = __webpack_require__(12);
	var Parse = __webpack_require__(14);

	module.exports = {
	    stringify: Stringify,
	    parse: Parse
	};


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Utils = __webpack_require__(13);

	var arrayPrefixGenerators = {
	    brackets: function brackets(prefix) {
	        return prefix + '[]';
	    },
	    indices: function indices(prefix, key) {
	        return prefix + '[' + key + ']';
	    },
	    repeat: function repeat(prefix) {
	        return prefix;
	    }
	};

	var defaults = {
	    delimiter: '&',
	    strictNullHandling: false,
	    skipNulls: false,
	    encode: true,
	    encoder: Utils.encode
	};

	var stringify = function stringify(object, prefix, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots) {
	    var obj = object;
	    if (typeof filter === 'function') {
	        obj = filter(prefix, obj);
	    } else if (obj instanceof Date) {
	        obj = obj.toISOString();
	    } else if (obj === null) {
	        if (strictNullHandling) {
	            return encoder ? encoder(prefix) : prefix;
	        }

	        obj = '';
	    }

	    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || Utils.isBuffer(obj)) {
	        if (encoder) {
	            return [encoder(prefix) + '=' + encoder(obj)];
	        }
	        return [prefix + '=' + String(obj)];
	    }

	    var values = [];

	    if (typeof obj === 'undefined') {
	        return values;
	    }

	    var objKeys;
	    if (Array.isArray(filter)) {
	        objKeys = filter;
	    } else {
	        var keys = Object.keys(obj);
	        objKeys = sort ? keys.sort(sort) : keys;
	    }

	    for (var i = 0; i < objKeys.length; ++i) {
	        var key = objKeys[i];

	        if (skipNulls && obj[key] === null) {
	            continue;
	        }

	        if (Array.isArray(obj)) {
	            values = values.concat(stringify(obj[key], generateArrayPrefix(prefix, key), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots));
	        } else {
	            values = values.concat(stringify(obj[key], prefix + (allowDots ? '.' + key : '[' + key + ']'), generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots));
	        }
	    }

	    return values;
	};

	module.exports = function (object, opts) {
	    var obj = object;
	    var options = opts || {};
	    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
	    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
	    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
	    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
	    var encoder = encode ? (typeof options.encoder === 'function' ? options.encoder : defaults.encoder) : null;
	    var sort = typeof options.sort === 'function' ? options.sort : null;
	    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
	    var objKeys;
	    var filter;

	    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
	        throw new TypeError('Encoder has to be a function.');
	    }

	    if (typeof options.filter === 'function') {
	        filter = options.filter;
	        obj = filter('', obj);
	    } else if (Array.isArray(options.filter)) {
	        objKeys = filter = options.filter;
	    }

	    var keys = [];

	    if (typeof obj !== 'object' || obj === null) {
	        return '';
	    }

	    var arrayFormat;
	    if (options.arrayFormat in arrayPrefixGenerators) {
	        arrayFormat = options.arrayFormat;
	    } else if ('indices' in options) {
	        arrayFormat = options.indices ? 'indices' : 'repeat';
	    } else {
	        arrayFormat = 'indices';
	    }

	    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

	    if (!objKeys) {
	        objKeys = Object.keys(obj);
	    }

	    if (sort) {
	        objKeys.sort(sort);
	    }

	    for (var i = 0; i < objKeys.length; ++i) {
	        var key = objKeys[i];

	        if (skipNulls && obj[key] === null) {
	            continue;
	        }

	        keys = keys.concat(stringify(obj[key], key, generateArrayPrefix, strictNullHandling, skipNulls, encoder, filter, sort, allowDots));
	    }

	    return keys.join(delimiter);
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	var hexTable = (function () {
	    var array = new Array(256);
	    for (var i = 0; i < 256; ++i) {
	        array[i] = '%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase();
	    }

	    return array;
	}());

	exports.arrayToObject = function (source, options) {
	    var obj = options.plainObjects ? Object.create(null) : {};
	    for (var i = 0; i < source.length; ++i) {
	        if (typeof source[i] !== 'undefined') {
	            obj[i] = source[i];
	        }
	    }

	    return obj;
	};

	exports.merge = function (target, source, options) {
	    if (!source) {
	        return target;
	    }

	    if (typeof source !== 'object') {
	        if (Array.isArray(target)) {
	            target.push(source);
	        } else if (typeof target === 'object') {
	            target[source] = true;
	        } else {
	            return [target, source];
	        }

	        return target;
	    }

	    if (typeof target !== 'object') {
	        return [target].concat(source);
	    }

	    var mergeTarget = target;
	    if (Array.isArray(target) && !Array.isArray(source)) {
	        mergeTarget = exports.arrayToObject(target, options);
	    }

	    return Object.keys(source).reduce(function (acc, key) {
	        var value = source[key];

	        if (Object.prototype.hasOwnProperty.call(acc, key)) {
	            acc[key] = exports.merge(acc[key], value, options);
	        } else {
	            acc[key] = value;
	        }
	        return acc;
	    }, mergeTarget);
	};

	exports.decode = function (str) {
	    try {
	        return decodeURIComponent(str.replace(/\+/g, ' '));
	    } catch (e) {
	        return str;
	    }
	};

	exports.encode = function (str) {
	    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
	    // It has been adapted here for stricter adherence to RFC 3986
	    if (str.length === 0) {
	        return str;
	    }

	    var string = typeof str === 'string' ? str : String(str);

	    var out = '';
	    for (var i = 0; i < string.length; ++i) {
	        var c = string.charCodeAt(i);

	        if (
	            c === 0x2D || // -
	            c === 0x2E || // .
	            c === 0x5F || // _
	            c === 0x7E || // ~
	            (c >= 0x30 && c <= 0x39) || // 0-9
	            (c >= 0x41 && c <= 0x5A) || // a-z
	            (c >= 0x61 && c <= 0x7A) // A-Z
	        ) {
	            out += string.charAt(i);
	            continue;
	        }

	        if (c < 0x80) {
	            out = out + hexTable[c];
	            continue;
	        }

	        if (c < 0x800) {
	            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
	            continue;
	        }

	        if (c < 0xD800 || c >= 0xE000) {
	            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
	            continue;
	        }

	        i += 1;
	        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
	        out += hexTable[0xF0 | (c >> 18)] + hexTable[0x80 | ((c >> 12) & 0x3F)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)];
	    }

	    return out;
	};

	exports.compact = function (obj, references) {
	    if (typeof obj !== 'object' || obj === null) {
	        return obj;
	    }

	    var refs = references || [];
	    var lookup = refs.indexOf(obj);
	    if (lookup !== -1) {
	        return refs[lookup];
	    }

	    refs.push(obj);

	    if (Array.isArray(obj)) {
	        var compacted = [];

	        for (var i = 0; i < obj.length; ++i) {
	            if (obj[i] && typeof obj[i] === 'object') {
	                compacted.push(exports.compact(obj[i], refs));
	            } else if (typeof obj[i] !== 'undefined') {
	                compacted.push(obj[i]);
	            }
	        }

	        return compacted;
	    }

	    var keys = Object.keys(obj);
	    for (var j = 0; j < keys.length; ++j) {
	        var key = keys[j];
	        obj[key] = exports.compact(obj[key], refs);
	    }

	    return obj;
	};

	exports.isRegExp = function (obj) {
	    return Object.prototype.toString.call(obj) === '[object RegExp]';
	};

	exports.isBuffer = function (obj) {
	    if (obj === null || typeof obj === 'undefined') {
	        return false;
	    }

	    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
	};


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Utils = __webpack_require__(13);

	var defaults = {
	    delimiter: '&',
	    depth: 5,
	    arrayLimit: 20,
	    parameterLimit: 1000,
	    strictNullHandling: false,
	    plainObjects: false,
	    allowPrototypes: false,
	    allowDots: false,
	    decoder: Utils.decode
	};

	var parseValues = function parseValues(str, options) {
	    var obj = {};
	    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

	    for (var i = 0; i < parts.length; ++i) {
	        var part = parts[i];
	        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

	        if (pos === -1) {
	            obj[options.decoder(part)] = '';

	            if (options.strictNullHandling) {
	                obj[options.decoder(part)] = null;
	            }
	        } else {
	            var key = options.decoder(part.slice(0, pos));
	            var val = options.decoder(part.slice(pos + 1));

	            if (Object.prototype.hasOwnProperty.call(obj, key)) {
	                obj[key] = [].concat(obj[key]).concat(val);
	            } else {
	                obj[key] = val;
	            }
	        }
	    }

	    return obj;
	};

	var parseObject = function parseObject(chain, val, options) {
	    if (!chain.length) {
	        return val;
	    }

	    var root = chain.shift();

	    var obj;
	    if (root === '[]') {
	        obj = [];
	        obj = obj.concat(parseObject(chain, val, options));
	    } else {
	        obj = options.plainObjects ? Object.create(null) : {};
	        var cleanRoot = root[0] === '[' && root[root.length - 1] === ']' ? root.slice(1, root.length - 1) : root;
	        var index = parseInt(cleanRoot, 10);
	        if (
	            !isNaN(index) &&
	            root !== cleanRoot &&
	            String(index) === cleanRoot &&
	            index >= 0 &&
	            (options.parseArrays && index <= options.arrayLimit)
	        ) {
	            obj = [];
	            obj[index] = parseObject(chain, val, options);
	        } else {
	            obj[cleanRoot] = parseObject(chain, val, options);
	        }
	    }

	    return obj;
	};

	var parseKeys = function parseKeys(givenKey, val, options) {
	    if (!givenKey) {
	        return;
	    }

	    // Transform dot notation to bracket notation
	    var key = options.allowDots ? givenKey.replace(/\.([^\.\[]+)/g, '[$1]') : givenKey;

	    // The regex chunks

	    var parent = /^([^\[\]]*)/;
	    var child = /(\[[^\[\]]*\])/g;

	    // Get the parent

	    var segment = parent.exec(key);

	    // Stash the parent if it exists

	    var keys = [];
	    if (segment[1]) {
	        // If we aren't using plain objects, optionally prefix keys
	        // that would overwrite object prototype properties
	        if (!options.plainObjects && Object.prototype.hasOwnProperty(segment[1])) {
	            if (!options.allowPrototypes) {
	                return;
	            }
	        }

	        keys.push(segment[1]);
	    }

	    // Loop through children appending to the array until we hit depth

	    var i = 0;
	    while ((segment = child.exec(key)) !== null && i < options.depth) {
	        i += 1;
	        if (!options.plainObjects && Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ''))) {
	            if (!options.allowPrototypes) {
	                continue;
	            }
	        }
	        keys.push(segment[1]);
	    }

	    // If there's a remainder, just add whatever is left

	    if (segment) {
	        keys.push('[' + key.slice(segment.index) + ']');
	    }

	    return parseObject(keys, val, options);
	};

	module.exports = function (str, opts) {
	    var options = opts || {};

	    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
	        throw new TypeError('Decoder has to be a function.');
	    }

	    options.delimiter = typeof options.delimiter === 'string' || Utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
	    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
	    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
	    options.parseArrays = options.parseArrays !== false;
	    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
	    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
	    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
	    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
	    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
	    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

	    if (str === '' || str === null || typeof str === 'undefined') {
	        return options.plainObjects ? Object.create(null) : {};
	    }

	    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
	    var obj = options.plainObjects ? Object.create(null) : {};

	    // Iterate over the keys and setup the new object

	    var keys = Object.keys(tempObj);
	    for (var i = 0; i < keys.length; ++i) {
	        var key = keys[i];
	        var newObj = parseKeys(key, tempObj[key], options);
	        obj = Utils.merge(obj, newObj, options);
	    }

	    return Utils.compact(obj);
	};


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(16);
	var isArguments = __webpack_require__(17);

	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ },
/* 16 */
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },
/* 17 */
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};

	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	var Request = (function () {
	    function Request() {
	    }
	    return Request;
	}());
	exports.Request = Request;

	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVscy9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQTtJQUFBO0lBZ0NBLENBQUM7SUFBRCxjQUFDO0FBQUQsQ0FoQ0EsQUFnQ0MsSUFBQTtBQWhDWSxlQUFPLFVBZ0NuQixDQUFBIiwiZmlsZSI6Im1vZGVscy9yZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVmaW5lbWVudCwgUmVmaW5lbWVudFR5cGUsIFZhbHVlUmVmaW5lbWVudCwgUmFuZ2VSZWZpbmVtZW50IH0gZnJvbSAnLi9yZXNwb25zZSc7XG5cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0IHtcblxuICAvLyBxdWVyeSBwYXJhbWV0ZXJzXG4gIHF1ZXJ5OiBzdHJpbmc7XG4gIGZpZWxkczogc3RyaW5nW107XG4gIG9yRmllbGRzOiBzdHJpbmdbXTtcbiAgaW5jbHVkZWROYXZpZ2F0aW9uczogc3RyaW5nW107XG4gIGV4Y2x1ZGVkTmF2aWdhdGlvbnM6IHN0cmluZ1tdO1xuICBzb3J0OiBTb3J0W107XG4gIGN1c3RvbVVybFBhcmFtczogQ3VzdG9tVXJsUGFyYW1bXTtcbiAgcmVmaW5lbWVudHM6IFNlbGVjdGVkUmVmaW5lbWVudFtdO1xuICByZXN0cmljdE5hdmlnYXRpb246IFJlc3RyaWN0TmF2aWdhdGlvbjtcbiAgYmlhc2luZzogQmlhc2luZztcbiAgbWF0Y2hTdHJhdGVneTogTWF0Y2hTdHJhdGVneTtcblxuICAvLyBjb25maWd1cmF0aW9uXG4gIHVzZXJJZDogc3RyaW5nO1xuICBsYW5ndWFnZTogc3RyaW5nO1xuICBjb2xsZWN0aW9uOiBzdHJpbmc7XG4gIGFyZWE6IHN0cmluZztcbiAgYmlhc2luZ1Byb2ZpbGU6IHN0cmluZztcblxuICAvLyBwYWdpbmdcbiAgc2tpcDogbnVtYmVyO1xuICBwYWdlU2l6ZTogbnVtYmVyO1xuXG4gIC8vIGZvcm1hdFxuICByZXR1cm5CaW5hcnk6IGJvb2xlYW47XG4gIHBydW5lUmVmaW5lbWVudHM6IGJvb2xlYW47XG4gIGRpc2FibGVBdXRvY29ycmVjdGlvbjogYm9vbGVhbjtcbiAgd2lsZGNhcmRTZWFyY2hFbmFibGVkOiBib29sZWFuO1xuXG59XG5cbmV4cG9ydCB0eXBlIFNvcnRPcmRlciA9ICdBc2NlbmRpbmcnIHwgJ0Rlc2NlbmRpbmcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNvcnQge1xuICBmaWVsZDogc3RyaW5nO1xuICBvcmRlcjogU29ydE9yZGVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbVVybFBhcmFtIHtcbiAga2V5OiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0ZWRSZWZpbmVtZW50IGV4dGVuZHMgUmVmaW5lbWVudCB7XG4gIG5hdmlnYXRpb25OYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0ZWRSYW5nZVJlZmluZW1lbnQgZXh0ZW5kcyBTZWxlY3RlZFJlZmluZW1lbnQsIFJhbmdlUmVmaW5lbWVudCB7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0ZWRWYWx1ZVJlZmluZW1lbnQgZXh0ZW5kcyBTZWxlY3RlZFJlZmluZW1lbnQsIFZhbHVlUmVmaW5lbWVudCB7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzdHJpY3ROYXZpZ2F0aW9uIHtcbiAgbmFtZTogc3RyaW5nO1xuICBjb3VudDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBCaWFzU3RyZW5ndGggPSAnQWJzb2x1dGVfSW5jcmVhc2UnIHwgJ1N0cm9uZ19JbmNyZWFzZScgfFxuICAnTWVkaXVtX0luY3JlYXNlJyB8ICdXZWFrX0luY3JlYXNlJyB8ICdMZWF2ZV9VbmNoYW5nZWQnIHwgJ1dlYWtfRGVjcmVhc2UnIHxcbiAgJ01lZGl1bV9EZWNyZWFzZScgfCAnU3Ryb25nX0RlY3JlYXNlJyB8ICdBYnNvbHV0ZV9EZWNyZWFzZSc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBCaWFzIHtcbiAgbmFtZTogc3RyaW5nO1xuICBjb250ZW50Pzogc3RyaW5nO1xuICBzdHJlbmd0aDogQmlhc1N0cmVuZ3RoO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJpYXNpbmcge1xuICBicmluZ1RvVG9wPzogc3RyaW5nW107XG4gIGF1Z21lbnRCaWFzZXM6IGJvb2xlYW47XG4gIGJpYXNlczogQmlhc1tdO1xuICBpbmZsdWVuY2U/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFydGlhbE1hdGNoUnVsZSB7XG4gIHRlcm1zPzogbnVtYmVyO1xuICB0ZXJtc0dyZWF0ZXJUaGFuPzogbnVtYmVyO1xuICBtdXN0TWF0Y2g/OiBudW1iZXI7XG4gIHBlcmNlbnRhZ2U/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1hdGNoU3RyYXRlZ3kge1xuICBydWxlczogUGFydGlhbE1hdGNoUnVsZVtdO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9


/***/ },
/* 19 */
/***/ function(module, exports) {

	"use strict";
	var NavigationConverter = (function () {
	    function NavigationConverter() {
	    }
	    NavigationConverter.convert = function (navigations) {
	        return navigations.reduce(function (refinements, navigation) {
	            navigation.refinements.forEach(function (refinement) { return refinements.push(Object.assign(refinement, { navigationName: navigation.name })); });
	            return refinements;
	        }, []);
	    };
	    return NavigationConverter;
	}());
	exports.NavigationConverter = NavigationConverter;

	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2NvbnZlcnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0E7SUFBQTtJQU9BLENBQUM7SUFOUSwyQkFBTyxHQUFkLFVBQWUsV0FBOEI7UUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBQyxXQUFzQyxFQUFFLFVBQXNCO1lBQ3ZGLFVBQVUsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFVBQUEsVUFBVSxJQUFJLE9BQUEsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUFoRixDQUFnRixDQUFDLENBQUM7WUFDL0gsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNyQixDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDVCxDQUFDO0lBQ0gsMEJBQUM7QUFBRCxDQVBBLEFBT0MsSUFBQTtBQVBZLDJCQUFtQixzQkFPL0IsQ0FBQSIsImZpbGUiOiJ1dGlscy9jb252ZXJ0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWxlY3RlZFJlZmluZW1lbnQgfSBmcm9tICcuLi9tb2RlbHMvcmVxdWVzdCc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uIH0gZnJvbSAnLi4vbW9kZWxzL3Jlc3BvbnNlJztcblxuZXhwb3J0IGNsYXNzIE5hdmlnYXRpb25Db252ZXJ0ZXIge1xuICBzdGF0aWMgY29udmVydChuYXZpZ2F0aW9uczogQXJyYXk8TmF2aWdhdGlvbj4pOiBBcnJheTxTZWxlY3RlZFJlZmluZW1lbnQ+IHtcbiAgICByZXR1cm4gbmF2aWdhdGlvbnMucmVkdWNlKChyZWZpbmVtZW50czogQXJyYXk8U2VsZWN0ZWRSZWZpbmVtZW50PiwgbmF2aWdhdGlvbjogTmF2aWdhdGlvbikgPT4ge1xuICAgICAgbmF2aWdhdGlvbi5yZWZpbmVtZW50cy5mb3JFYWNoKHJlZmluZW1lbnQgPT4gcmVmaW5lbWVudHMucHVzaChPYmplY3QuYXNzaWduKHJlZmluZW1lbnQsIHsgbmF2aWdhdGlvbk5hbWU6IG5hdmlnYXRpb24ubmFtZSB9KSkpO1xuICAgICAgcmV0dXJuIHJlZmluZW1lbnRzO1xuICAgIH0sIFtdKTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var axios = __webpack_require__(21);
	var query_1 = __webpack_require__(10);
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
	            .then(function (res) { return res.records ? Object.assign(res, { records: res.records.map(_this.convertRecordFields) }) : res; });
	    };
	    AbstractBridge.prototype.convertRecordFields = function (record) {
	        var converted = Object.assign(record, { id: record._id, url: record._u, title: record._t });
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
	        return Object.assign(request, { clientKey: this.clientKey });
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

	//# sourceMappingURL=data:application/json;base64,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QUFFLFVBQWtCO1FBQ3ZELGlCQUFPLENBQUM7UUFEVSxjQUFTLEdBQVQsU0FBUyxDQUFRO1FBSjdCLHlCQUFvQixHQUFXLElBQUksQ0FBQztRQUNwQywrQkFBMEIsR0FBVyxJQUFJLENBQUM7UUFDMUMscUJBQWdCLEdBQVcsSUFBSSxDQUFDO1FBSXRDLElBQU0sT0FBTyxHQUFHLGFBQVcsVUFBVSxpQ0FBOEIsQ0FBQztRQUNwRSxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDbEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLE9BQU8sR0FBRyxXQUFXLENBQUM7UUFDbEQsSUFBSSxDQUFDLDBCQUEwQixHQUFHLE9BQU8sR0FBRyxpQkFBaUIsQ0FBQztRQUM5RCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUM1QyxDQUFDO0lBRVMsb0NBQWMsR0FBeEIsVUFBeUIsT0FBWTtRQUNuQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUNILGtCQUFDO0FBQUQsQ0FsQkEsQUFrQkMsQ0FsQmdDLGNBQWMsR0FrQjlDO0FBbEJZLG1CQUFXLGNBa0J2QixDQUFBO0FBRUQ7SUFBbUMsaUNBQWM7SUFDL0MsdUJBQVksVUFBa0I7UUFDNUIsaUJBQU8sQ0FBQztRQUNSLElBQUksQ0FBQyxTQUFTLEdBQUcsa0RBQWdELFVBQVksQ0FBQztJQUNoRixDQUFDO0lBRVMsc0NBQWMsR0FBeEIsVUFBeUIsT0FBWTtRQUNuQyxNQUFNLENBQUMsT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFDSCxvQkFBQztBQUFELENBVEEsQUFTQyxDQVRrQyxjQUFjLEdBU2hEO0FBVFkscUJBQWEsZ0JBU3pCLENBQUEiLCJmaWxlIjoiY29yZS9icmlkZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgPSByZXF1aXJlKCdheGlvcycpO1xuaW1wb3J0IHsgUmVxdWVzdCB9IGZyb20gJy4uL21vZGVscy9yZXF1ZXN0JztcbmltcG9ydCB7IFJlc3VsdHMsIFJlY29yZCB9IGZyb20gJy4uL21vZGVscy9yZXNwb25zZSc7XG5pbXBvcnQgeyBRdWVyeSB9IGZyb20gJy4vcXVlcnknO1xuXG5jb25zdCBTRUFSQ0ggPSAnL3NlYXJjaCc7XG5jb25zdCBSRUZJTkVNRU5UUyA9ICcvcmVmaW5lbWVudHMnO1xuY29uc3QgUkVGSU5FTUVOVF9TRUFSQ0ggPSAnL3JlZmluZW1lbnQnO1xuY29uc3QgQ0xVU1RFUiA9ICcvY2x1c3Rlcic7XG5jb25zdCBCSUFTSU5HX0RFRkFVTFRTID0ge1xuICBiaWFzZXM6IFtdLFxuICBicmluZ1RvVG9wOiBbXSxcbiAgYXVnbWVudEJpYXNlczogZmFsc2Vcbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmF3UmVjb3JkIGV4dGVuZHMgUmVjb3JkIHtcbiAgX2lkOiBzdHJpbmc7XG4gIF91OiBzdHJpbmc7XG4gIF90OiBzdHJpbmc7XG4gIF9zbmlwcGV0Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RCcmlkZ2Uge1xuICBwcm90ZWN0ZWQgYnJpZGdlVXJsOiBzdHJpbmc7XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IGF1Z21lbnRSZXF1ZXN0KHJlcXVlc3Q6IGFueSk6IGFueTtcblxuICBzZWFyY2gocXVlcnk6IHN0cmluZyB8IFF1ZXJ5IHwgUmVxdWVzdCwgY2FsbGJhY2s6IChFcnJvcj8sIFJlc3VsdHM/KSA9PiB2b2lkID0gdW5kZWZpbmVkKTogUHJvbWlzZTxSZXN1bHRzPiB7XG4gICAgbGV0IFtyZXF1ZXN0LCBxdWVyeVBhcmFtc10gPSB0aGlzLmV4dHJhY3RSZXF1ZXN0KHF1ZXJ5KTtcbiAgICBpZiAocmVxdWVzdCA9PT0gbnVsbCkgcmV0dXJuIHRoaXMuZ2VuZXJhdGVFcnJvcigncXVlcnkgd2FzIG5vdCBvZiBhIHJlY29nbmlzZWQgdHlwZScsIGNhbGxiYWNrKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gdGhpcy5maXJlUmVxdWVzdCh0aGlzLmJyaWRnZVVybCwgcmVxdWVzdCwgcXVlcnlQYXJhbXMpO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgcmVzcG9uc2UudGhlbihyZXMgPT4gY2FsbGJhY2sodW5kZWZpbmVkLCByZXMpKVxuICAgICAgICAuY2F0Y2goZXJyID0+IGNhbGxiYWNrKGVycikpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBleHRyYWN0UmVxdWVzdChxdWVyeTogYW55KTogW1JlcXVlc3QsIGFueV0ge1xuICAgIHN3aXRjaCAodHlwZW9mIHF1ZXJ5KSB7XG4gICAgICBjYXNlICdzdHJpbmcnOiByZXR1cm4gW25ldyBRdWVyeSg8c3RyaW5nPnF1ZXJ5KS5idWlsZCgpLCB7fV07XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBpZiAocXVlcnkgaW5zdGFuY2VvZiBRdWVyeSkgcmV0dXJuIFtxdWVyeS5idWlsZCgpLCBxdWVyeS5xdWVyeVBhcmFtc107XG4gICAgICAgIGVsc2UgcmV0dXJuIFtxdWVyeSwge31dO1xuICAgICAgZGVmYXVsdDogcmV0dXJuIFtudWxsLCBudWxsXTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGdlbmVyYXRlRXJyb3IoZXJyb3I6IHN0cmluZywgY2FsbGJhY2s6IChFcnJvcikgPT4gdm9pZCk6IFByb21pc2U8YW55PiB7XG4gICAgY29uc3QgZXJyID0gbmV3IEVycm9yKGVycm9yKTtcbiAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGVycik7XG4gICAgZWxzZSByZXR1cm4gUHJvbWlzZS5yZWplY3QoZXJyKTtcbiAgfVxuXG4gIHByaXZhdGUgZmlyZVJlcXVlc3QodXJsOiBzdHJpbmcsIGJvZHk6IFJlcXVlc3QgfCBhbnksIHF1ZXJ5UGFyYW1zOiBhbnkpOiBBeGlvcy5JUHJvbWlzZTxSZXN1bHRzPiB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIHVybDogdGhpcy5icmlkZ2VVcmwsXG4gICAgICBtZXRob2Q6ICdwb3N0JyxcbiAgICAgIHBhcmFtczogcXVlcnlQYXJhbXMsXG4gICAgICBkYXRhOiB0aGlzLmF1Z21lbnRSZXF1ZXN0KGJvZHkpLFxuICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICB0aW1lb3V0OiAxNTAwXG4gICAgfTtcbiAgICByZXR1cm4gYXhpb3Mob3B0aW9ucylcbiAgICAgIC50aGVuKHJlcyA9PiByZXMuZGF0YSlcbiAgICAgIC50aGVuKHJlcyA9PiByZXMucmVjb3JkcyA/IE9iamVjdC5hc3NpZ24ocmVzLCB7IHJlY29yZHM6IHJlcy5yZWNvcmRzLm1hcCh0aGlzLmNvbnZlcnRSZWNvcmRGaWVsZHMpIH0pIDogcmVzKTtcbiAgfVxuXG4gIHByaXZhdGUgY29udmVydFJlY29yZEZpZWxkcyhyZWNvcmQ6IFJhd1JlY29yZCk6IFJlY29yZCB8IFJhd1JlY29yZCB7XG4gICAgY29uc3QgY29udmVydGVkID0gT2JqZWN0LmFzc2lnbihyZWNvcmQsIHsgaWQ6IHJlY29yZC5faWQsIHVybDogcmVjb3JkLl91LCB0aXRsZTogcmVjb3JkLl90IH0pO1xuICAgIGRlbGV0ZSBjb252ZXJ0ZWQuX2lkLCBjb252ZXJ0ZWQuX3UsIGNvbnZlcnRlZC5fdDtcblxuICAgIGlmIChyZWNvcmQuX3NuaXBwZXQpIHtcbiAgICAgIGNvbnZlcnRlZC5zbmlwcGV0ID0gcmVjb3JkLl9zbmlwcGV0O1xuICAgICAgZGVsZXRlIGNvbnZlcnRlZC5fc25pcHBldDtcbiAgICB9XG5cbiAgICByZXR1cm4gY29udmVydGVkO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDbG91ZEJyaWRnZSBleHRlbmRzIEFic3RyYWN0QnJpZGdlIHtcblxuICBwcml2YXRlIGJyaWRnZVJlZmluZW1lbnRzVXJsOiBzdHJpbmcgPSBudWxsO1xuICBwcml2YXRlIGJyaWRnZVJlZmluZW1lbnRzU2VhcmNoVXJsOiBzdHJpbmcgPSBudWxsO1xuICBwcml2YXRlIGJyaWRnZUNsdXN0ZXJVcmw6IHN0cmluZyA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBjbGllbnRLZXk6IHN0cmluZywgY3VzdG9tZXJJZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcbiAgICBjb25zdCBiYXNlVXJsID0gYGh0dHBzOi8vJHtjdXN0b21lcklkfS5ncm91cGJ5Y2xvdWQuY29tOjQ0My9hcGkvdjFgO1xuICAgIHRoaXMuYnJpZGdlVXJsID0gYmFzZVVybCArIFNFQVJDSDtcbiAgICB0aGlzLmJyaWRnZVJlZmluZW1lbnRzVXJsID0gYmFzZVVybCArIFJFRklORU1FTlRTO1xuICAgIHRoaXMuYnJpZGdlUmVmaW5lbWVudHNTZWFyY2hVcmwgPSBiYXNlVXJsICsgUkVGSU5FTUVOVF9TRUFSQ0g7XG4gICAgdGhpcy5icmlkZ2VDbHVzdGVyVXJsID0gYmFzZVVybCArIENMVVNURVI7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXVnbWVudFJlcXVlc3QocmVxdWVzdDogYW55KTogYW55IHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihyZXF1ZXN0LCB7IGNsaWVudEtleTogdGhpcy5jbGllbnRLZXkgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEJyb3dzZXJCcmlkZ2UgZXh0ZW5kcyBBYnN0cmFjdEJyaWRnZSB7XG4gIGNvbnN0cnVjdG9yKGN1c3RvbWVySWQ6IHN0cmluZykge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5icmlkZ2VVcmwgPSBgaHR0cDovL2Vjb21tLmdyb3VwYnljbG91ZC5jb20vc2VtYW50aWNTZWFyY2gvJHtjdXN0b21lcklkfWA7XG4gIH1cblxuICBwcm90ZWN0ZWQgYXVnbWVudFJlcXVlc3QocmVxdWVzdDogYW55KTogYW55IHtcbiAgICByZXR1cm4gcmVxdWVzdDtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(22);

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var defaults = __webpack_require__(23);
	var utils = __webpack_require__(24);
	var dispatchRequest = __webpack_require__(26);
	var InterceptorManager = __webpack_require__(35);
	var isAbsoluteURL = __webpack_require__(36);
	var combineURLs = __webpack_require__(37);
	var bind = __webpack_require__(38);
	var transformData = __webpack_require__(30);

	function Axios(defaultConfig) {
	  this.defaults = utils.merge({}, defaultConfig);
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}

	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);

	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }

	  // Don't allow overriding defaults.withCredentials
	  config.withCredentials = config.withCredentials || this.defaults.withCredentials;

	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );

	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	var defaultInstance = new Axios(defaults);
	var axios = module.exports = bind(Axios.prototype.request, defaultInstance);
	axios.request = bind(Axios.prototype.request, defaultInstance);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;

	// Expose properties from defaultInstance
	axios.defaults = defaultInstance.defaults;
	axios.interceptors = defaultInstance.interceptors;

	// Factory for creating new instances
	axios.create = function create(defaultConfig) {
	  return new Axios(defaultConfig);
	};

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(39);

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	  axios[method] = bind(Axios.prototype[method], defaultInstance);
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	  axios[method] = bind(Axios.prototype[method], defaultInstance);
	});


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(24);
	var normalizeHeaderName = __webpack_require__(25);

	var PROTECTION_PREFIX = /^\)\]\}',?\n/;
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	module.exports = {
	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      data = data.replace(PROTECTION_PREFIX, '');
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  headers: {
	    common: {
	      'Accept': 'application/json, text/plain, */*'
	    },
	    patch: utils.merge(DEFAULT_CONTENT_TYPE),
	    post: utils.merge(DEFAULT_CONTENT_TYPE),
	    put: utils.merge(DEFAULT_CONTENT_TYPE)
	  },

	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};


/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  typeof document.createElement -> undefined
	 */
	function isStandardBrowserEnv() {
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined' &&
	    typeof document.createElement === 'function'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (obj.hasOwnProperty(key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  trim: trim
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(24);

	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	/**
	 * Dispatch a request to the server using whichever adapter
	 * is supported by the current environment.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  return new Promise(function executor(resolve, reject) {
	    try {
	      var adapter;

	      if (typeof config.adapter === 'function') {
	        // For custom adapter support
	        adapter = config.adapter;
	      } else if (typeof XMLHttpRequest !== 'undefined') {
	        // For browsers use XHR adapter
	        adapter = __webpack_require__(27);
	      } else if (typeof process !== 'undefined') {
	        // For node use HTTP adapter
	        adapter = __webpack_require__(27);
	      }

	      if (typeof adapter === 'function') {
	        adapter(resolve, reject, config);
	      }
	    } catch (e) {
	      reject(e);
	    }
	  });
	};


	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var utils = __webpack_require__(24);
	var buildURL = __webpack_require__(28);
	var parseHeaders = __webpack_require__(29);
	var transformData = __webpack_require__(30);
	var isURLSameOrigin = __webpack_require__(31);
	var btoa = (typeof window !== 'undefined' && window.btoa) || __webpack_require__(32);
	var settle = __webpack_require__(33);

	module.exports = function xhrAdapter(resolve, reject, config) {
	  var requestData = config.data;
	  var requestHeaders = config.headers;

	  if (utils.isFormData(requestData)) {
	    delete requestHeaders['Content-Type']; // Let the browser set it
	  }

	  var request = new XMLHttpRequest();
	  var loadEvent = 'onreadystatechange';
	  var xDomain = false;

	  // For IE 8/9 CORS support
	  // Only supports POST and GET calls and doesn't returns the response headers.
	  // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	  if (process.env.NODE_ENV !== 'test' && typeof window !== 'undefined' && window.XDomainRequest && !('withCredentials' in request) && !isURLSameOrigin(config.url)) {
	    request = new window.XDomainRequest();
	    loadEvent = 'onload';
	    xDomain = true;
	    request.onprogress = function handleProgress() {};
	    request.ontimeout = function handleTimeout() {};
	  }

	  // HTTP basic authentication
	  if (config.auth) {
	    var username = config.auth.username || '';
	    var password = config.auth.password || '';
	    requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	  }

	  request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

	  // Set the request timeout in MS
	  request.timeout = config.timeout;

	  // Listen for ready state
	  request[loadEvent] = function handleLoad() {
	    if (!request || (request.readyState !== 4 && !xDomain)) {
	      return;
	    }

	    // The request errored out and we didn't get a response, this will be
	    // handled by onerror instead
	    if (request.status === 0) {
	      return;
	    }

	    // Prepare the response
	    var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	    var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	    var response = {
	      data: transformData(
	        responseData,
	        responseHeaders,
	        config.transformResponse
	      ),
	      // IE sends 1223 instead of 204 (https://github.com/mzabriskie/axios/issues/201)
	      status: request.status === 1223 ? 204 : request.status,
	      statusText: request.status === 1223 ? 'No Content' : request.statusText,
	      headers: responseHeaders,
	      config: config,
	      request: request
	    };

	    settle(resolve, reject, response);

	    // Clean up request
	    request = null;
	  };

	  // Handle low level network errors
	  request.onerror = function handleError() {
	    // Real errors are hidden from us by the browser
	    // onerror should only fire if it's a network error
	    reject(new Error('Network Error'));

	    // Clean up request
	    request = null;
	  };

	  // Handle timeout
	  request.ontimeout = function handleTimeout() {
	    var err = new Error('timeout of ' + config.timeout + 'ms exceeded');
	    err.timeout = config.timeout;
	    err.code = 'ECONNABORTED';
	    reject(err);

	    // Clean up request
	    request = null;
	  };

	  // Add xsrf header
	  // This is only done if running in a standard browser environment.
	  // Specifically not if we're in a web worker, or react-native.
	  if (utils.isStandardBrowserEnv()) {
	    var cookies = __webpack_require__(34);

	    // Add xsrf header
	    var xsrfValue = config.withCredentials || isURLSameOrigin(config.url) ?
	        cookies.read(config.xsrfCookieName) :
	        undefined;

	    if (xsrfValue) {
	      requestHeaders[config.xsrfHeaderName] = xsrfValue;
	    }
	  }

	  // Add headers to the request
	  if ('setRequestHeader' in request) {
	    utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	      if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	        // Remove Content-Type if data is undefined
	        delete requestHeaders[key];
	      } else {
	        // Otherwise add header to the request
	        request.setRequestHeader(key, val);
	      }
	    });
	  }

	  // Add withCredentials to request if needed
	  if (config.withCredentials) {
	    request.withCredentials = true;
	  }

	  // Add responseType to request if needed
	  if (config.responseType) {
	    try {
	      request.responseType = config.responseType;
	    } catch (e) {
	      if (request.responseType !== 'json') {
	        throw e;
	      }
	    }
	  }

	  // Handle progress if needed
	  if (config.progress) {
	    if (config.method === 'post' || config.method === 'put') {
	      request.upload.addEventListener('progress', config.progress);
	    } else if (config.method === 'get') {
	      request.addEventListener('progress', config.progress);
	    }
	  }

	  if (requestData === undefined) {
	    requestData = null;
	  }

	  // Send the request
	  request.send(requestData);
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(24);

	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }

	      if (!utils.isArray(val)) {
	        val = [val];
	      }

	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(24);

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	    }
	  });

	  return parsed;
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(24);

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(24);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;

	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;

	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }

	      urlParsingNode.setAttribute('href', href);

	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }

	    originURL = resolveURL(window.location.href);

	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';

	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';

	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}

	module.exports = btoa;


/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(response);
	  }
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(24);

	module.exports = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));

	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }

	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }

	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }

	        if (secure === true) {
	          cookie.push('secure');
	        }

	        document.cookie = cookie.join('; ');
	      },

	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },

	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var utils = __webpack_require__(24);

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	module.exports = InterceptorManager;


/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '');
	};


/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var EventEmitter = __webpack_require__(41);
	var query_1 = __webpack_require__(10);
	var bridge_1 = __webpack_require__(20);
	var pager_1 = __webpack_require__(42);
	exports.Pager = pager_1.Pager;
	var Events;
	(function (Events) {
	    Events.RESULTS = 'results';
	    Events.REFINEMENTS_CHANGED = 'refinements_changed';
	    Events.RESET = 'reset';
	    Events.REWRITE_QUERY = 'rewrite_query';
	})(Events = exports.Events || (exports.Events = {}));
	var FluxCapacitor = (function (_super) {
	    __extends(FluxCapacitor, _super);
	    function FluxCapacitor(endpoint, config) {
	        if (config === void 0) { config = {}; }
	        _super.call(this);
	        this.originalQuery = '';
	        this.bridge = new bridge_1.BrowserBridge(endpoint);
	        this.query = new query_1.Query().withConfiguration(config);
	    }
	    Object.defineProperty(FluxCapacitor.prototype, "page", {
	        get: function () {
	            return new pager_1.Pager(this);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    FluxCapacitor.prototype.search = function (query) {
	        var _this = this;
	        if (query === void 0) { query = this.originalQuery; }
	        return this.bridge.search(this.query.withQuery(query))
	            .then(function (res) {
	            _this.results = res;
	            _this.originalQuery = query;
	            _this.emit(Events.RESULTS, res);
	            return res;
	        });
	    };
	    FluxCapacitor.prototype.rewrite = function (query) {
	        var _this = this;
	        return this.search(query)
	            .then(function () { return _this.emit(Events.REWRITE_QUERY, query); })
	            .then(function () { return query; });
	    };
	    FluxCapacitor.prototype.reset = function (query) {
	        var _this = this;
	        if (query === void 0) { query = this.originalQuery; }
	        this.query = new query_1.Query();
	        return this.search(query)
	            .then(function (res) { return _this.emit(Events.RESET, res); })
	            .then(function () { return query; });
	    };
	    FluxCapacitor.prototype.resize = function (pageSize, offset) {
	        this.query.withConfiguration({ pageSize: pageSize });
	        if (offset !== undefined)
	            this.query.skip(offset);
	        return this.search()
	            .then(function () { return pageSize; });
	    };
	    FluxCapacitor.prototype.refine = function (refinement, config) {
	        if (config === void 0) { config = { reset: true }; }
	        this.query.withSelectedRefinements(refinement);
	        if (config.skipSearch)
	            return Promise.resolve(this.navigationInfo);
	        return this.doRefinement(config);
	    };
	    FluxCapacitor.prototype.unrefine = function (refinement, config) {
	        if (config === void 0) { config = { reset: true }; }
	        this.query.withoutSelectedRefinements(refinement);
	        if (config.skipSearch)
	            return Promise.resolve(this.navigationInfo);
	        return this.doRefinement(config);
	    };
	    FluxCapacitor.prototype.resetPaging = function (reset) {
	        return reset ? this.page.reset() : this.search();
	    };
	    FluxCapacitor.prototype.doRefinement = function (config) {
	        var _this = this;
	        return this.resetPaging(config.reset)
	            .then(function () { return _this.emit(Events.REFINEMENTS_CHANGED, _this.navigationInfo); })
	            .then(function () { return _this.navigationInfo; });
	    };
	    Object.defineProperty(FluxCapacitor.prototype, "navigationInfo", {
	        get: function () {
	            return {
	                available: this.results.availableNavigation,
	                selected: this.results.selectedNavigation
	            };
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return FluxCapacitor;
	}(EventEmitter));
	exports.FluxCapacitor = FluxCapacitor;

	//# sourceMappingURL=data:application/json;base64,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QUFFLENBQUM7SUFDbkQsQ0FBQztJQUVPLG9DQUFZLEdBQXBCLFVBQXFCLE1BQXdCO1FBQTdDLGlCQUlDO1FBSEMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUNsQyxJQUFJLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsRUFBMUQsQ0FBMEQsQ0FBQzthQUN0RSxJQUFJLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxjQUFjLEVBQW5CLENBQW1CLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsc0JBQVkseUNBQWM7YUFBMUI7WUFDRSxNQUFNLENBQUM7Z0JBQ0wsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CO2dCQUMzQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0I7YUFDMUMsQ0FBQztRQUNKLENBQUM7OztPQUFBO0lBQ0gsb0JBQUM7QUFBRCxDQTFFQSxBQTBFQyxDQTFFa0MsWUFBWSxHQTBFOUM7QUExRVkscUJBQWEsZ0JBMEV6QixDQUFBIiwiZmlsZSI6ImNhcGFjaXRvci9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIzJyk7XG5pbXBvcnQgeyBRdWVyeSwgUXVlcnlDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vY29yZS9xdWVyeSc7XG5pbXBvcnQgeyBCcm93c2VyQnJpZGdlIH0gZnJvbSAnLi4vY29yZS9icmlkZ2UnO1xuaW1wb3J0IHsgUmVzdWx0cywgTmF2aWdhdGlvbiB9IGZyb20gJy4uL21vZGVscy9yZXNwb25zZSc7XG5pbXBvcnQgeyBQYWdlciB9IGZyb20gJy4vcGFnZXInO1xuaW1wb3J0IHsgU2VsZWN0ZWRWYWx1ZVJlZmluZW1lbnQsIFNlbGVjdGVkUmFuZ2VSZWZpbmVtZW50IH0gZnJvbSAnLi4vbW9kZWxzL3JlcXVlc3QnO1xuXG5leHBvcnQgbmFtZXNwYWNlIEV2ZW50cyB7XG4gIGV4cG9ydCBjb25zdCBSRVNVTFRTID0gJ3Jlc3VsdHMnO1xuICBleHBvcnQgY29uc3QgUkVGSU5FTUVOVFNfQ0hBTkdFRCA9ICdyZWZpbmVtZW50c19jaGFuZ2VkJztcbiAgZXhwb3J0IGNvbnN0IFJFU0VUID0gJ3Jlc2V0JztcbiAgZXhwb3J0IGNvbnN0IFJFV1JJVEVfUVVFUlkgPSAncmV3cml0ZV9xdWVyeSc7XG59XG5cbmV4cG9ydCB7IFBhZ2VyIH07XG5leHBvcnQgdHlwZSBGbHV4UmVmaW5lbWVudCA9IFNlbGVjdGVkVmFsdWVSZWZpbmVtZW50IHwgU2VsZWN0ZWRSYW5nZVJlZmluZW1lbnQ7XG5cbmV4cG9ydCBjbGFzcyBGbHV4Q2FwYWNpdG9yIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgcHJpdmF0ZSBvcmlnaW5hbFF1ZXJ5OiBzdHJpbmcgPSAnJztcbiAgcXVlcnk6IFF1ZXJ5O1xuICBicmlkZ2U6IEJyb3dzZXJCcmlkZ2U7XG4gIHJlc3VsdHM6IFJlc3VsdHM7XG5cbiAgY29uc3RydWN0b3IoZW5kcG9pbnQ6IHN0cmluZywgY29uZmlnOiBRdWVyeUNvbmZpZ3VyYXRpb24gJiBhbnkgPSB7fSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5icmlkZ2UgPSBuZXcgQnJvd3NlckJyaWRnZShlbmRwb2ludCk7XG4gICAgdGhpcy5xdWVyeSA9IG5ldyBRdWVyeSgpLndpdGhDb25maWd1cmF0aW9uKGNvbmZpZyk7XG4gIH1cblxuICBnZXQgcGFnZSgpIHtcbiAgICByZXR1cm4gbmV3IFBhZ2VyKHRoaXMpO1xuICB9XG5cbiAgc2VhcmNoKHF1ZXJ5OiBzdHJpbmcgPSB0aGlzLm9yaWdpbmFsUXVlcnkpOiBQcm9taXNlPFJlc3VsdHM+IHtcbiAgICByZXR1cm4gdGhpcy5icmlkZ2Uuc2VhcmNoKHRoaXMucXVlcnkud2l0aFF1ZXJ5KHF1ZXJ5KSlcbiAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMucmVzdWx0cyA9IHJlcztcbiAgICAgICAgdGhpcy5vcmlnaW5hbFF1ZXJ5ID0gcXVlcnk7XG4gICAgICAgIHRoaXMuZW1pdChFdmVudHMuUkVTVUxUUywgcmVzKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0pO1xuICB9XG5cbiAgcmV3cml0ZShxdWVyeTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5zZWFyY2gocXVlcnkpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLmVtaXQoRXZlbnRzLlJFV1JJVEVfUVVFUlksIHF1ZXJ5KSlcbiAgICAgIC50aGVuKCgpID0+IHF1ZXJ5KTtcbiAgfVxuXG4gIHJlc2V0KHF1ZXJ5OiBzdHJpbmcgPSB0aGlzLm9yaWdpbmFsUXVlcnkpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHRoaXMucXVlcnkgPSBuZXcgUXVlcnkoKTtcbiAgICByZXR1cm4gdGhpcy5zZWFyY2gocXVlcnkpXG4gICAgICAudGhlbihyZXMgPT4gdGhpcy5lbWl0KEV2ZW50cy5SRVNFVCwgcmVzKSlcbiAgICAgIC50aGVuKCgpID0+IHF1ZXJ5KTtcbiAgfVxuXG4gIHJlc2l6ZShwYWdlU2l6ZTogbnVtYmVyLCBvZmZzZXQ/OiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIHRoaXMucXVlcnkud2l0aENvbmZpZ3VyYXRpb24oeyBwYWdlU2l6ZSB9KTtcbiAgICBpZiAob2Zmc2V0ICE9PSB1bmRlZmluZWQpIHRoaXMucXVlcnkuc2tpcChvZmZzZXQpO1xuICAgIHJldHVybiB0aGlzLnNlYXJjaCgpXG4gICAgICAudGhlbigoKSA9PiBwYWdlU2l6ZSk7XG4gIH1cblxuICByZWZpbmUocmVmaW5lbWVudDogRmx1eFJlZmluZW1lbnQsIGNvbmZpZzogUmVmaW5lbWVudENvbmZpZyA9IHsgcmVzZXQ6IHRydWUgfSk6IFByb21pc2U8TmF2aWdhdGlvbkluZm8+IHtcbiAgICB0aGlzLnF1ZXJ5LndpdGhTZWxlY3RlZFJlZmluZW1lbnRzKHJlZmluZW1lbnQpO1xuICAgIGlmIChjb25maWcuc2tpcFNlYXJjaCkgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLm5hdmlnYXRpb25JbmZvKTtcbiAgICByZXR1cm4gdGhpcy5kb1JlZmluZW1lbnQoY29uZmlnKTtcbiAgfVxuXG4gIHVucmVmaW5lKHJlZmluZW1lbnQ6IEZsdXhSZWZpbmVtZW50LCBjb25maWc6IFJlZmluZW1lbnRDb25maWcgPSB7IHJlc2V0OiB0cnVlIH0pOiBQcm9taXNlPE5hdmlnYXRpb25JbmZvPiB7XG4gICAgdGhpcy5xdWVyeS53aXRob3V0U2VsZWN0ZWRSZWZpbmVtZW50cyhyZWZpbmVtZW50KTtcbiAgICBpZiAoY29uZmlnLnNraXBTZWFyY2gpIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5uYXZpZ2F0aW9uSW5mbyk7XG4gICAgcmV0dXJuIHRoaXMuZG9SZWZpbmVtZW50KGNvbmZpZyk7XG4gIH1cblxuICBwcml2YXRlIHJlc2V0UGFnaW5nKHJlc2V0OiBib29sZWFuKTogUHJvbWlzZTxSZXN1bHRzPiB7XG4gICAgcmV0dXJuIHJlc2V0ID8gdGhpcy5wYWdlLnJlc2V0KCkgOiB0aGlzLnNlYXJjaCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkb1JlZmluZW1lbnQoY29uZmlnOiBSZWZpbmVtZW50Q29uZmlnKTogUHJvbWlzZTxOYXZpZ2F0aW9uSW5mbz4ge1xuICAgIHJldHVybiB0aGlzLnJlc2V0UGFnaW5nKGNvbmZpZy5yZXNldClcbiAgICAgIC50aGVuKCgpID0+IHRoaXMuZW1pdChFdmVudHMuUkVGSU5FTUVOVFNfQ0hBTkdFRCwgdGhpcy5uYXZpZ2F0aW9uSW5mbykpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLm5hdmlnYXRpb25JbmZvKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IG5hdmlnYXRpb25JbmZvKCk6IE5hdmlnYXRpb25JbmZvIHtcbiAgICByZXR1cm4ge1xuICAgICAgYXZhaWxhYmxlOiB0aGlzLnJlc3VsdHMuYXZhaWxhYmxlTmF2aWdhdGlvbixcbiAgICAgIHNlbGVjdGVkOiB0aGlzLnJlc3VsdHMuc2VsZWN0ZWROYXZpZ2F0aW9uXG4gICAgfTtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE5hdmlnYXRpb25JbmZvIHtcbiAgYXZhaWxhYmxlOiBOYXZpZ2F0aW9uW10sXG4gIHNlbGVjdGVkOiBOYXZpZ2F0aW9uW11cbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZWZpbmVtZW50Q29uZmlnIHtcbiAgcmVzZXQ/OiBib29sZWFuO1xuICBza2lwU2VhcmNoPzogYm9vbGVhbjtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var has = Object.prototype.hasOwnProperty;

	//
	// We store our EE objects in a plain object whose properties are event names.
	// If `Object.create(null)` is not supported we prefix the event names with a
	// `~` to make sure that the built-in object properties are not overridden or
	// used as an attack vector.
	// We also assume that `Object.create(null)` is available when the event name
	// is an ES6 Symbol.
	//
	var prefix = typeof Object.create !== 'function' ? '~' : false;

	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} [once=false] Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}

	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() { /* Nothing to set */ }

	/**
	 * Hold the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;

	/**
	 * Return an array listing the events for which the emitter has registered
	 * listeners.
	 *
	 * @returns {Array}
	 * @api public
	 */
	EventEmitter.prototype.eventNames = function eventNames() {
	  var events = this._events
	    , names = []
	    , name;

	  if (!events) return names;

	  for (name in events) {
	    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
	  }

	  if (Object.getOwnPropertySymbols) {
	    return names.concat(Object.getOwnPropertySymbols(events));
	  }

	  return names;
	};

	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @param {Boolean} exists We only need to know if there are listeners.
	 * @returns {Array|Boolean}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event, exists) {
	  var evt = prefix ? prefix + event : event
	    , available = this._events && this._events[evt];

	  if (exists) return !!available;
	  if (!available) return [];
	  if (available.fn) return [available.fn];

	  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
	    ee[i] = available[i].fn;
	  }

	  return ee;
	};

	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return false;

	  var listeners = this._events[evt]
	    , len = arguments.length
	    , args
	    , i;

	  if ('function' === typeof listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }

	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }

	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;

	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }

	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }

	  return true;
	};

	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} [context=this] The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true)
	    , evt = prefix ? prefix + event : event;

	  if (!this._events) this._events = prefix ? {} : Object.create(null);
	  if (!this._events[evt]) this._events[evt] = listener;
	  else {
	    if (!this._events[evt].fn) this._events[evt].push(listener);
	    else this._events[evt] = [
	      this._events[evt], listener
	    ];
	  }

	  return this;
	};

	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Mixed} context Only remove listeners matching this context.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
	  var evt = prefix ? prefix + event : event;

	  if (!this._events || !this._events[evt]) return this;

	  var listeners = this._events[evt]
	    , events = [];

	  if (fn) {
	    if (listeners.fn) {
	      if (
	           listeners.fn !== fn
	        || (once && !listeners.once)
	        || (context && listeners.context !== context)
	      ) {
	        events.push(listeners);
	      }
	    } else {
	      for (var i = 0, length = listeners.length; i < length; i++) {
	        if (
	             listeners[i].fn !== fn
	          || (once && !listeners[i].once)
	          || (context && listeners[i].context !== context)
	        ) {
	          events.push(listeners[i]);
	        }
	      }
	    }
	  }

	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[evt] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[evt];
	  }

	  return this;
	};

	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;

	  if (event) delete this._events[prefix ? prefix + event : event];
	  else this._events = prefix ? {} : Object.create(null);

	  return this;
	};

	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;

	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};

	//
	// Expose the prefix.
	//
	EventEmitter.prefixed = prefix;

	//
	// Expose the module.
	//
	if (true) {
	  module.exports = EventEmitter;
	}


/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";
	var Pager = (function () {
	    function Pager(flux) {
	        this.flux = flux;
	    }
	    Pager.prototype.next = function () {
	        return this.paginate(true, this.hasNext);
	    };
	    Pager.prototype.prev = function () {
	        return this.paginate(false, this.hasPrevious);
	    };
	    Pager.prototype.last = function () {
	        var remainder = this.total % this.pageSize;
	        this.flux.query.skip(remainder > 0 ? this.total - remainder : this.total - this.pageSize);
	        return this.flux.search();
	    };
	    Pager.prototype.reset = function () {
	        this.flux.query.skip(0);
	        return this.flux.search();
	    };
	    Object.defineProperty(Pager.prototype, "hasNext", {
	        get: function () {
	            return this.step(true) < this.total;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Pager.prototype, "hasPrevious", {
	        get: function () {
	            return this.lastStep !== 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Pager.prototype.paginate = function (forward, predicate) {
	        var step = this.step(forward);
	        if (predicate) {
	            this.flux.query.skip(step);
	            return this.flux.search();
	        }
	        return Promise.reject(new Error("already on " + (forward ? 'last' : 'first') + " page"));
	    };
	    Pager.prototype.step = function (add) {
	        var skip = this.lastStep + (add ? this.pageSize : -this.pageSize);
	        return skip >= 0 ? skip : 0;
	    };
	    Object.defineProperty(Pager.prototype, "lastStep", {
	        get: function () {
	            return this.flux.query.build().skip || 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Pager.prototype, "pageSize", {
	        get: function () {
	            return this.flux.query.build().pageSize || 10;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Pager.prototype, "total", {
	        get: function () {
	            return this.flux.results.totalRecordCount || -1;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Pager;
	}());
	exports.Pager = Pager;

	//# sourceMappingURL=data:application/json;base64,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Q0FBQyxPQUFPLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEQsQ0FBQzs7O09BQUE7SUFDSCxZQUFDO0FBQUQsQ0F2REEsQUF1REMsSUFBQTtBQXZEWSxhQUFLLFFBdURqQixDQUFBIiwiZmlsZSI6ImNhcGFjaXRvci9wYWdlci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlc3VsdHMgfSBmcm9tICcuLi9tb2RlbHMvcmVzcG9uc2UnO1xuaW1wb3J0IHsgRmx1eENhcGFjaXRvciwgRXZlbnRzIH0gZnJvbSAnLi9pbmRleCc7XG5cbmV4cG9ydCBjbGFzcyBQYWdlciB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZmx1eDogRmx1eENhcGFjaXRvcikgeyB9XG5cbiAgbmV4dCgpOiBQcm9taXNlPFJlc3VsdHM+IHtcbiAgICByZXR1cm4gdGhpcy5wYWdpbmF0ZSh0cnVlLCB0aGlzLmhhc05leHQpO1xuICB9XG5cbiAgcHJldigpOiBQcm9taXNlPFJlc3VsdHM+IHtcbiAgICByZXR1cm4gdGhpcy5wYWdpbmF0ZShmYWxzZSwgdGhpcy5oYXNQcmV2aW91cyk7XG4gIH1cblxuICBsYXN0KCk6IFByb21pc2U8UmVzdWx0cz4ge1xuICAgIGNvbnN0IHJlbWFpbmRlciA9IHRoaXMudG90YWwgJSB0aGlzLnBhZ2VTaXplO1xuICAgIHRoaXMuZmx1eC5xdWVyeS5za2lwKHJlbWFpbmRlciA+IDAgPyB0aGlzLnRvdGFsIC0gcmVtYWluZGVyIDogdGhpcy50b3RhbCAtIHRoaXMucGFnZVNpemUpO1xuICAgIHJldHVybiB0aGlzLmZsdXguc2VhcmNoKCk7XG4gIH1cblxuICByZXNldCgpOiBQcm9taXNlPFJlc3VsdHM+IHtcbiAgICB0aGlzLmZsdXgucXVlcnkuc2tpcCgwKTtcbiAgICByZXR1cm4gdGhpcy5mbHV4LnNlYXJjaCgpO1xuICB9XG5cbiAgZ2V0IGhhc05leHQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RlcCh0cnVlKSA8IHRoaXMudG90YWw7XG4gIH1cblxuICBnZXQgaGFzUHJldmlvdXMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubGFzdFN0ZXAgIT09IDA7XG4gIH1cblxuICBwcml2YXRlIHBhZ2luYXRlKGZvcndhcmQ6IGJvb2xlYW4sIHByZWRpY2F0ZTogYm9vbGVhbik6IFByb21pc2U8UmVzdWx0cyB8IHZvaWQ+IHtcbiAgICBjb25zdCBzdGVwID0gdGhpcy5zdGVwKGZvcndhcmQpO1xuICAgIGlmIChwcmVkaWNhdGUpIHtcbiAgICAgIHRoaXMuZmx1eC5xdWVyeS5za2lwKHN0ZXApO1xuICAgICAgcmV0dXJuIHRoaXMuZmx1eC5zZWFyY2goKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihgYWxyZWFkeSBvbiAke2ZvcndhcmQgPyAnbGFzdCcgOiAnZmlyc3QnfSBwYWdlYCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGVwKGFkZDogYm9vbGVhbik6IG51bWJlciB7XG4gICAgY29uc3Qgc2tpcCA9IHRoaXMubGFzdFN0ZXAgKyAoYWRkID8gdGhpcy5wYWdlU2l6ZSA6IC10aGlzLnBhZ2VTaXplKTtcbiAgICByZXR1cm4gc2tpcCA+PSAwID8gc2tpcCA6IDA7XG4gIH1cblxuICBwcml2YXRlIGdldCBsYXN0U3RlcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmZsdXgucXVlcnkuYnVpbGQoKS5za2lwIHx8IDA7XG4gIH1cblxuICBwcml2YXRlIGdldCBwYWdlU2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmZsdXgucXVlcnkuYnVpbGQoKS5wYWdlU2l6ZSB8fCAxMDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHRvdGFsKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZmx1eC5yZXN1bHRzLnRvdGFsUmVjb3JkQ291bnQgfHwgLTE7XG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==


/***/ },
/* 43 */
/***/ function(module, exports) {

	"use strict";
	function toRefinement(ref, nav) {
	    return Object.assign({}, pluck(ref, 'type', 'value', 'low', 'high'), { navigationName: nav.name });
	}
	exports.toRefinement = toRefinement;
	function pluck(obj) {
	    var keys = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        keys[_i - 1] = arguments[_i];
	    }
	    return keys.reduce(function (res, key) { return obj[key] ? Object.assign(res, (_a = {}, _a[key] = obj[key], _a)) : res; var _a; }, {});
	}
	exports.pluck = pluck;


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* Riot v2.4.1, @license MIT */

	;(function(window, undefined) {
	  'use strict';
	var riot = { version: 'v2.4.1', settings: {} },
	  // be aware, internal usage
	  // ATTENTION: prefix the global dynamic variables with `__`

	  // counter to give a unique id to all the Tag instances
	  __uid = 0,
	  // tags instances cache
	  __virtualDom = [],
	  // tags implementation cache
	  __tagImpl = {},

	  /**
	   * Const
	   */
	  GLOBAL_MIXIN = '__global_mixin',

	  // riot specific prefixes
	  RIOT_PREFIX = 'riot-',
	  RIOT_TAG = RIOT_PREFIX + 'tag',
	  RIOT_TAG_IS = 'data-is',

	  // for typeof == '' comparisons
	  T_STRING = 'string',
	  T_OBJECT = 'object',
	  T_UNDEF  = 'undefined',
	  T_FUNCTION = 'function',
	  // special native tags that cannot be treated like the others
	  SPECIAL_TAGS_REGEX = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/,
	  RESERVED_WORDS_BLACKLIST = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|parent|opts|trigger|o(?:n|ff|ne))$/,
	  // SVG tags list https://www.w3.org/TR/SVG/attindex.html#PresentationAttributes
	  SVG_TAGS_LIST = ['altGlyph', 'animate', 'animateColor', 'circle', 'clipPath', 'defs', 'ellipse', 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feFlood', 'feGaussianBlur', 'feImage', 'feMerge', 'feMorphology', 'feOffset', 'feSpecularLighting', 'feTile', 'feTurbulence', 'filter', 'font', 'foreignObject', 'g', 'glyph', 'glyphRef', 'image', 'line', 'linearGradient', 'marker', 'mask', 'missing-glyph', 'path', 'pattern', 'polygon', 'polyline', 'radialGradient', 'rect', 'stop', 'svg', 'switch', 'symbol', 'text', 'textPath', 'tref', 'tspan', 'use'],

	  // version# for IE 8-11, 0 for others
	  IE_VERSION = (window && window.document || {}).documentMode | 0,

	  // detect firefox to fix #1374
	  FIREFOX = window && !!window.InstallTrigger
	/* istanbul ignore next */
	riot.observable = function(el) {

	  /**
	   * Extend the original object or create a new empty one
	   * @type { Object }
	   */

	  el = el || {}

	  /**
	   * Private variables
	   */
	  var callbacks = {},
	    slice = Array.prototype.slice

	  /**
	   * Private Methods
	   */

	  /**
	   * Helper function needed to get and loop all the events in a string
	   * @param   { String }   e - event string
	   * @param   {Function}   fn - callback
	   */
	  function onEachEvent(e, fn) {
	    var es = e.split(' '), l = es.length, i = 0, name, indx
	    for (; i < l; i++) {
	      name = es[i]
	      indx = name.indexOf('.')
	      if (name) fn( ~indx ? name.substring(0, indx) : name, i, ~indx ? name.slice(indx + 1) : null)
	    }
	  }

	  /**
	   * Public Api
	   */

	  // extend the el object adding the observable methods
	  Object.defineProperties(el, {
	    /**
	     * Listen to the given space separated list of `events` and
	     * execute the `callback` each time an event is triggered.
	     * @param  { String } events - events ids
	     * @param  { Function } fn - callback function
	     * @returns { Object } el
	     */
	    on: {
	      value: function(events, fn) {
	        if (typeof fn != 'function')  return el

	        onEachEvent(events, function(name, pos, ns) {
	          (callbacks[name] = callbacks[name] || []).push(fn)
	          fn.typed = pos > 0
	          fn.ns = ns
	        })

	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Removes the given space separated list of `events` listeners
	     * @param   { String } events - events ids
	     * @param   { Function } fn - callback function
	     * @returns { Object } el
	     */
	    off: {
	      value: function(events, fn) {
	        if (events == '*' && !fn) callbacks = {}
	        else {
	          onEachEvent(events, function(name, pos, ns) {
	            if (fn || ns) {
	              var arr = callbacks[name]
	              for (var i = 0, cb; cb = arr && arr[i]; ++i) {
	                if (cb == fn || ns && cb.ns == ns) arr.splice(i--, 1)
	              }
	            } else delete callbacks[name]
	          })
	        }
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Listen to the given space separated list of `events` and
	     * execute the `callback` at most once
	     * @param   { String } events - events ids
	     * @param   { Function } fn - callback function
	     * @returns { Object } el
	     */
	    one: {
	      value: function(events, fn) {
	        function on() {
	          el.off(events, on)
	          fn.apply(el, arguments)
	        }
	        return el.on(events, on)
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Execute all callback functions that listen to
	     * the given space separated list of `events`
	     * @param   { String } events - events ids
	     * @returns { Object } el
	     */
	    trigger: {
	      value: function(events) {

	        // getting the arguments
	        var arglen = arguments.length - 1,
	          args = new Array(arglen),
	          fns

	        for (var i = 0; i < arglen; i++) {
	          args[i] = arguments[i + 1] // skip first argument
	        }

	        onEachEvent(events, function(name, pos, ns) {

	          fns = slice.call(callbacks[name] || [], 0)

	          for (var i = 0, fn; fn = fns[i]; ++i) {
	            if (fn.busy) continue
	            fn.busy = 1
	            if (!ns || fn.ns == ns) fn.apply(el, fn.typed ? [name].concat(args) : args)
	            if (fns[i] !== fn) { i-- }
	            fn.busy = 0
	          }

	          if (callbacks['*'] && name != '*')
	            el.trigger.apply(el, ['*', name].concat(args))

	        })

	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    }
	  })

	  return el

	}
	/* istanbul ignore next */
	;(function(riot) {

	/**
	 * Simple client-side router
	 * @module riot-route
	 */


	var RE_ORIGIN = /^.+?\/\/+[^\/]+/,
	  EVENT_LISTENER = 'EventListener',
	  REMOVE_EVENT_LISTENER = 'remove' + EVENT_LISTENER,
	  ADD_EVENT_LISTENER = 'add' + EVENT_LISTENER,
	  HAS_ATTRIBUTE = 'hasAttribute',
	  REPLACE = 'replace',
	  POPSTATE = 'popstate',
	  HASHCHANGE = 'hashchange',
	  TRIGGER = 'trigger',
	  MAX_EMIT_STACK_LEVEL = 3,
	  win = typeof window != 'undefined' && window,
	  doc = typeof document != 'undefined' && document,
	  hist = win && history,
	  loc = win && (hist.location || win.location), // see html5-history-api
	  prot = Router.prototype, // to minify more
	  clickEvent = doc && doc.ontouchstart ? 'touchstart' : 'click',
	  started = false,
	  central = riot.observable(),
	  routeFound = false,
	  debouncedEmit,
	  base, current, parser, secondParser, emitStack = [], emitStackLevel = 0

	/**
	 * Default parser. You can replace it via router.parser method.
	 * @param {string} path - current path (normalized)
	 * @returns {array} array
	 */
	function DEFAULT_PARSER(path) {
	  return path.split(/[/?#]/)
	}

	/**
	 * Default parser (second). You can replace it via router.parser method.
	 * @param {string} path - current path (normalized)
	 * @param {string} filter - filter string (normalized)
	 * @returns {array} array
	 */
	function DEFAULT_SECOND_PARSER(path, filter) {
	  var re = new RegExp('^' + filter[REPLACE](/\*/g, '([^/?#]+?)')[REPLACE](/\.\./, '.*') + '$'),
	    args = path.match(re)

	  if (args) return args.slice(1)
	}

	/**
	 * Simple/cheap debounce implementation
	 * @param   {function} fn - callback
	 * @param   {number} delay - delay in seconds
	 * @returns {function} debounced function
	 */
	function debounce(fn, delay) {
	  var t
	  return function () {
	    clearTimeout(t)
	    t = setTimeout(fn, delay)
	  }
	}

	/**
	 * Set the window listeners to trigger the routes
	 * @param {boolean} autoExec - see route.start
	 */
	function start(autoExec) {
	  debouncedEmit = debounce(emit, 1)
	  win[ADD_EVENT_LISTENER](POPSTATE, debouncedEmit)
	  win[ADD_EVENT_LISTENER](HASHCHANGE, debouncedEmit)
	  doc[ADD_EVENT_LISTENER](clickEvent, click)
	  if (autoExec) emit(true)
	}

	/**
	 * Router class
	 */
	function Router() {
	  this.$ = []
	  riot.observable(this) // make it observable
	  central.on('stop', this.s.bind(this))
	  central.on('emit', this.e.bind(this))
	}

	function normalize(path) {
	  return path[REPLACE](/^\/|\/$/, '')
	}

	function isString(str) {
	  return typeof str == 'string'
	}

	/**
	 * Get the part after domain name
	 * @param {string} href - fullpath
	 * @returns {string} path from root
	 */
	function getPathFromRoot(href) {
	  return (href || loc.href)[REPLACE](RE_ORIGIN, '')
	}

	/**
	 * Get the part after base
	 * @param {string} href - fullpath
	 * @returns {string} path from base
	 */
	function getPathFromBase(href) {
	  return base[0] == '#'
	    ? (href || loc.href || '').split(base)[1] || ''
	    : (loc ? getPathFromRoot(href) : href || '')[REPLACE](base, '')
	}

	function emit(force) {
	  // the stack is needed for redirections
	  var isRoot = emitStackLevel == 0
	  if (MAX_EMIT_STACK_LEVEL <= emitStackLevel) return

	  emitStackLevel++
	  emitStack.push(function() {
	    var path = getPathFromBase()
	    if (force || path != current) {
	      central[TRIGGER]('emit', path)
	      current = path
	    }
	  })
	  if (isRoot) {
	    while (emitStack.length) {
	      emitStack[0]()
	      emitStack.shift()
	    }
	    emitStackLevel = 0
	  }
	}

	function click(e) {
	  if (
	    e.which != 1 // not left click
	    || e.metaKey || e.ctrlKey || e.shiftKey // or meta keys
	    || e.defaultPrevented // or default prevented
	  ) return

	  var el = e.target
	  while (el && el.nodeName != 'A') el = el.parentNode

	  if (
	    !el || el.nodeName != 'A' // not A tag
	    || el[HAS_ATTRIBUTE]('download') // has download attr
	    || !el[HAS_ATTRIBUTE]('href') // has no href attr
	    || el.target && el.target != '_self' // another window or frame
	    || el.href.indexOf(loc.href.match(RE_ORIGIN)[0]) == -1 // cross origin
	  ) return

	  if (el.href != loc.href) {
	    if (
	      el.href.split('#')[0] == loc.href.split('#')[0] // internal jump
	      || base != '#' && getPathFromRoot(el.href).indexOf(base) !== 0 // outside of base
	      || !go(getPathFromBase(el.href), el.title || doc.title) // route not found
	    ) return
	  }

	  e.preventDefault()
	}

	/**
	 * Go to the path
	 * @param {string} path - destination path
	 * @param {string} title - page title
	 * @param {boolean} shouldReplace - use replaceState or pushState
	 * @returns {boolean} - route not found flag
	 */
	function go(path, title, shouldReplace) {
	  if (hist) { // if a browser
	    path = base + normalize(path)
	    title = title || doc.title
	    // browsers ignores the second parameter `title`
	    shouldReplace
	      ? hist.replaceState(null, title, path)
	      : hist.pushState(null, title, path)
	    // so we need to set it manually
	    doc.title = title
	    routeFound = false
	    emit()
	    return routeFound
	  }

	  // Server-side usage: directly execute handlers for the path
	  return central[TRIGGER]('emit', getPathFromBase(path))
	}

	/**
	 * Go to path or set action
	 * a single string:                go there
	 * two strings:                    go there with setting a title
	 * two strings and boolean:        replace history with setting a title
	 * a single function:              set an action on the default route
	 * a string/RegExp and a function: set an action on the route
	 * @param {(string|function)} first - path / action / filter
	 * @param {(string|RegExp|function)} second - title / action
	 * @param {boolean} third - replace flag
	 */
	prot.m = function(first, second, third) {
	  if (isString(first) && (!second || isString(second))) go(first, second, third || false)
	  else if (second) this.r(first, second)
	  else this.r('@', first)
	}

	/**
	 * Stop routing
	 */
	prot.s = function() {
	  this.off('*')
	  this.$ = []
	}

	/**
	 * Emit
	 * @param {string} path - path
	 */
	prot.e = function(path) {
	  this.$.concat('@').some(function(filter) {
	    var args = (filter == '@' ? parser : secondParser)(normalize(path), normalize(filter))
	    if (typeof args != 'undefined') {
	      this[TRIGGER].apply(null, [filter].concat(args))
	      return routeFound = true // exit from loop
	    }
	  }, this)
	}

	/**
	 * Register route
	 * @param {string} filter - filter for matching to url
	 * @param {function} action - action to register
	 */
	prot.r = function(filter, action) {
	  if (filter != '@') {
	    filter = '/' + normalize(filter)
	    this.$.push(filter)
	  }
	  this.on(filter, action)
	}

	var mainRouter = new Router()
	var route = mainRouter.m.bind(mainRouter)

	/**
	 * Create a sub router
	 * @returns {function} the method of a new Router object
	 */
	route.create = function() {
	  var newSubRouter = new Router()
	  // assign sub-router's main method
	  var router = newSubRouter.m.bind(newSubRouter)
	  // stop only this sub-router
	  router.stop = newSubRouter.s.bind(newSubRouter)
	  return router
	}

	/**
	 * Set the base of url
	 * @param {(str|RegExp)} arg - a new base or '#' or '#!'
	 */
	route.base = function(arg) {
	  base = arg || '#'
	  current = getPathFromBase() // recalculate current path
	}

	/** Exec routing right now **/
	route.exec = function() {
	  emit(true)
	}

	/**
	 * Replace the default router to yours
	 * @param {function} fn - your parser function
	 * @param {function} fn2 - your secondParser function
	 */
	route.parser = function(fn, fn2) {
	  if (!fn && !fn2) {
	    // reset parser for testing...
	    parser = DEFAULT_PARSER
	    secondParser = DEFAULT_SECOND_PARSER
	  }
	  if (fn) parser = fn
	  if (fn2) secondParser = fn2
	}

	/**
	 * Helper function to get url query as an object
	 * @returns {object} parsed query
	 */
	route.query = function() {
	  var q = {}
	  var href = loc.href || current
	  href[REPLACE](/[?&](.+?)=([^&]*)/g, function(_, k, v) { q[k] = v })
	  return q
	}

	/** Stop routing **/
	route.stop = function () {
	  if (started) {
	    if (win) {
	      win[REMOVE_EVENT_LISTENER](POPSTATE, debouncedEmit)
	      win[REMOVE_EVENT_LISTENER](HASHCHANGE, debouncedEmit)
	      doc[REMOVE_EVENT_LISTENER](clickEvent, click)
	    }
	    central[TRIGGER]('stop')
	    started = false
	  }
	}

	/**
	 * Start routing
	 * @param {boolean} autoExec - automatically exec after starting if true
	 */
	route.start = function (autoExec) {
	  if (!started) {
	    if (win) {
	      if (document.readyState == 'complete') start(autoExec)
	      // the timeout is needed to solve
	      // a weird safari bug https://github.com/riot/route/issues/33
	      else win[ADD_EVENT_LISTENER]('load', function() {
	        setTimeout(function() { start(autoExec) }, 1)
	      })
	    }
	    started = true
	  }
	}

	/** Prepare the router **/
	route.base()
	route.parser()

	riot.route = route
	})(riot)
	/* istanbul ignore next */

	/**
	 * The riot template engine
	 * @version v2.4.0
	 */
	/**
	 * riot.util.brackets
	 *
	 * - `brackets    ` - Returns a string or regex based on its parameter
	 * - `brackets.set` - Change the current riot brackets
	 *
	 * @module
	 */

	var brackets = (function (UNDEF) {

	  var
	    REGLOB = 'g',

	    R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,

	    R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'/g,

	    S_QBLOCKS = R_STRINGS.source + '|' +
	      /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' +
	      /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source,

	    FINDBRACES = {
	      '(': RegExp('([()])|'   + S_QBLOCKS, REGLOB),
	      '[': RegExp('([[\\]])|' + S_QBLOCKS, REGLOB),
	      '{': RegExp('([{}])|'   + S_QBLOCKS, REGLOB)
	    },

	    DEFAULT = '{ }'

	  var _pairs = [
	    '{', '}',
	    '{', '}',
	    /{[^}]*}/,
	    /\\([{}])/g,
	    /\\({)|{/g,
	    RegExp('\\\\(})|([[({])|(})|' + S_QBLOCKS, REGLOB),
	    DEFAULT,
	    /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,
	    /(^|[^\\]){=[\S\s]*?}/
	  ]

	  var
	    cachedBrackets = UNDEF,
	    _regex,
	    _cache = [],
	    _settings

	  function _loopback (re) { return re }

	  function _rewrite (re, bp) {
	    if (!bp) bp = _cache
	    return new RegExp(
	      re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : ''
	    )
	  }

	  function _create (pair) {
	    if (pair === DEFAULT) return _pairs

	    var arr = pair.split(' ')

	    if (arr.length !== 2 || /[\x00-\x1F<>a-zA-Z0-9'",;\\]/.test(pair)) { // eslint-disable-line
	      throw new Error('Unsupported brackets "' + pair + '"')
	    }
	    arr = arr.concat(pair.replace(/(?=[[\]()*+?.^$|])/g, '\\').split(' '))

	    arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr)
	    arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr)
	    arr[6] = _rewrite(_pairs[6], arr)
	    arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCKS, REGLOB)
	    arr[8] = pair
	    return arr
	  }

	  function _brackets (reOrIdx) {
	    return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx]
	  }

	  _brackets.split = function split (str, tmpl, _bp) {
	    // istanbul ignore next: _bp is for the compiler
	    if (!_bp) _bp = _cache

	    var
	      parts = [],
	      match,
	      isexpr,
	      start,
	      pos,
	      re = _bp[6]

	    isexpr = start = re.lastIndex = 0

	    while ((match = re.exec(str))) {

	      pos = match.index

	      if (isexpr) {

	        if (match[2]) {
	          re.lastIndex = skipBraces(str, match[2], re.lastIndex)
	          continue
	        }
	        if (!match[3]) {
	          continue
	        }
	      }

	      if (!match[1]) {
	        unescapeStr(str.slice(start, pos))
	        start = re.lastIndex
	        re = _bp[6 + (isexpr ^= 1)]
	        re.lastIndex = start
	      }
	    }

	    if (str && start < str.length) {
	      unescapeStr(str.slice(start))
	    }

	    return parts

	    function unescapeStr (s) {
	      if (tmpl || isexpr) {
	        parts.push(s && s.replace(_bp[5], '$1'))
	      } else {
	        parts.push(s)
	      }
	    }

	    function skipBraces (s, ch, ix) {
	      var
	        match,
	        recch = FINDBRACES[ch]

	      recch.lastIndex = ix
	      ix = 1
	      while ((match = recch.exec(s))) {
	        if (match[1] &&
	          !(match[1] === ch ? ++ix : --ix)) break
	      }
	      return ix ? s.length : recch.lastIndex
	    }
	  }

	  _brackets.hasExpr = function hasExpr (str) {
	    return _cache[4].test(str)
	  }

	  _brackets.loopKeys = function loopKeys (expr) {
	    var m = expr.match(_cache[9])

	    return m
	      ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] }
	      : { val: expr.trim() }
	  }

	  _brackets.array = function array (pair) {
	    return pair ? _create(pair) : _cache
	  }

	  function _reset (pair) {
	    if ((pair || (pair = DEFAULT)) !== _cache[8]) {
	      _cache = _create(pair)
	      _regex = pair === DEFAULT ? _loopback : _rewrite
	      _cache[9] = _regex(_pairs[9])
	    }
	    cachedBrackets = pair
	  }

	  function _setSettings (o) {
	    var b

	    o = o || {}
	    b = o.brackets
	    Object.defineProperty(o, 'brackets', {
	      set: _reset,
	      get: function () { return cachedBrackets },
	      enumerable: true
	    })
	    _settings = o
	    _reset(b)
	  }

	  Object.defineProperty(_brackets, 'settings', {
	    set: _setSettings,
	    get: function () { return _settings }
	  })

	  /* istanbul ignore next: in the browser riot is always in the scope */
	  _brackets.settings = typeof riot !== 'undefined' && riot.settings || {}
	  _brackets.set = _reset

	  _brackets.R_STRINGS = R_STRINGS
	  _brackets.R_MLCOMMS = R_MLCOMMS
	  _brackets.S_QBLOCKS = S_QBLOCKS

	  return _brackets

	})()

	/**
	 * @module tmpl
	 *
	 * tmpl          - Root function, returns the template value, render with data
	 * tmpl.hasExpr  - Test the existence of a expression inside a string
	 * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
	 */

	var tmpl = (function () {

	  var _cache = {}

	  function _tmpl (str, data) {
	    if (!str) return str

	    return (_cache[str] || (_cache[str] = _create(str))).call(data, _logErr)
	  }

	  _tmpl.haveRaw = brackets.hasRaw

	  _tmpl.hasExpr = brackets.hasExpr

	  _tmpl.loopKeys = brackets.loopKeys

	  _tmpl.errorHandler = null

	  function _logErr (err, ctx) {

	    if (_tmpl.errorHandler) {

	      err.riotData = {
	        tagName: ctx && ctx.root && ctx.root.tagName,
	        _riot_id: ctx && ctx._riot_id  //eslint-disable-line camelcase
	      }
	      _tmpl.errorHandler(err)
	    }
	  }

	  function _create (str) {
	    var expr = _getTmpl(str)

	    if (expr.slice(0, 11) !== 'try{return ') expr = 'return ' + expr

	/* eslint-disable */

	    return new Function('E', expr + ';')
	/* eslint-enable */
	  }

	  var
	    CH_IDEXPR = '\u2057',
	    RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,
	    RE_QBLOCK = RegExp(brackets.S_QBLOCKS, 'g'),
	    RE_DQUOTE = /\u2057/g,
	    RE_QBMARK = /\u2057(\d+)~/g

	  function _getTmpl (str) {
	    var
	      qstr = [],
	      expr,
	      parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1)

	    if (parts.length > 2 || parts[0]) {
	      var i, j, list = []

	      for (i = j = 0; i < parts.length; ++i) {

	        expr = parts[i]

	        if (expr && (expr = i & 1

	            ? _parseExpr(expr, 1, qstr)

	            : '"' + expr
	                .replace(/\\/g, '\\\\')
	                .replace(/\r\n?|\n/g, '\\n')
	                .replace(/"/g, '\\"') +
	              '"'

	          )) list[j++] = expr

	      }

	      expr = j < 2 ? list[0]
	           : '[' + list.join(',') + '].join("")'

	    } else {

	      expr = _parseExpr(parts[1], 0, qstr)
	    }

	    if (qstr[0]) {
	      expr = expr.replace(RE_QBMARK, function (_, pos) {
	        return qstr[pos]
	          .replace(/\r/g, '\\r')
	          .replace(/\n/g, '\\n')
	      })
	    }
	    return expr
	  }

	  var
	    RE_BREND = {
	      '(': /[()]/g,
	      '[': /[[\]]/g,
	      '{': /[{}]/g
	    }

	  function _parseExpr (expr, asText, qstr) {

	    expr = expr
	          .replace(RE_QBLOCK, function (s, div) {
	            return s.length > 2 && !div ? CH_IDEXPR + (qstr.push(s) - 1) + '~' : s
	          })
	          .replace(/\s+/g, ' ').trim()
	          .replace(/\ ?([[\({},?\.:])\ ?/g, '$1')

	    if (expr) {
	      var
	        list = [],
	        cnt = 0,
	        match

	      while (expr &&
	            (match = expr.match(RE_CSNAME)) &&
	            !match.index
	        ) {
	        var
	          key,
	          jsb,
	          re = /,|([[{(])|$/g

	        expr = RegExp.rightContext
	        key  = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1]

	        while (jsb = (match = re.exec(expr))[1]) skipBraces(jsb, re)

	        jsb  = expr.slice(0, match.index)
	        expr = RegExp.rightContext

	        list[cnt++] = _wrapExpr(jsb, 1, key)
	      }

	      expr = !cnt ? _wrapExpr(expr, asText)
	           : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0]
	    }
	    return expr

	    function skipBraces (ch, re) {
	      var
	        mm,
	        lv = 1,
	        ir = RE_BREND[ch]

	      ir.lastIndex = re.lastIndex
	      while (mm = ir.exec(expr)) {
	        if (mm[0] === ch) ++lv
	        else if (!--lv) break
	      }
	      re.lastIndex = lv ? expr.length : ir.lastIndex
	    }
	  }

	  // istanbul ignore next: not both
	  var // eslint-disable-next-line max-len
	    JS_CONTEXT = '"in this?this:' + (typeof window !== 'object' ? 'global' : 'window') + ').',
	    JS_VARNAME = /[,{][$\w]+:|(^ *|[^$\w\.])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
	    JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/

	  function _wrapExpr (expr, asText, key) {
	    var tb

	    expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
	      if (mvar) {
	        pos = tb ? 0 : pos + match.length

	        if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
	          match = p + '("' + mvar + JS_CONTEXT + mvar
	          if (pos) tb = (s = s[pos]) === '.' || s === '(' || s === '['
	        } else if (pos) {
	          tb = !JS_NOPROPS.test(s.slice(pos))
	        }
	      }
	      return match
	    })

	    if (tb) {
	      expr = 'try{return ' + expr + '}catch(e){E(e,this)}'
	    }

	    if (key) {

	      expr = (tb
	          ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')'
	        ) + '?"' + key + '":""'

	    } else if (asText) {

	      expr = 'function(v){' + (tb
	          ? expr.replace('return ', 'v=') : 'v=(' + expr + ')'
	        ) + ';return v||v===0?v:""}.call(this)'
	    }

	    return expr
	  }

	  // istanbul ignore next: compatibility fix for beta versions
	  _tmpl.parse = function (s) { return s }

	  _tmpl.version = brackets.version = 'v2.4.0'

	  return _tmpl

	})()

	/*
	  lib/browser/tag/mkdom.js

	  Includes hacks needed for the Internet Explorer version 9 and below
	  See: http://kangax.github.io/compat-table/es5/#ie8
	       http://codeplanet.io/dropping-ie8/
	*/
	var mkdom = (function _mkdom() {
	  var
	    reHasYield  = /<yield\b/i,
	    reYieldAll  = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig,
	    reYieldSrc  = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig,
	    reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig
	  var
	    rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' },
	    tblTags = IE_VERSION && IE_VERSION < 10
	      ? SPECIAL_TAGS_REGEX : /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/

	  /**
	   * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
	   * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
	   *
	   * @param   {string} templ  - The template coming from the custom tag definition
	   * @param   {string} [html] - HTML content that comes from the DOM element where you
	   *           will mount the tag, mostly the original tag in the page
	   * @returns {HTMLElement} DOM element with _templ_ merged through `YIELD` with the _html_.
	   */
	  function _mkdom(templ, html) {
	    var
	      match   = templ && templ.match(/^\s*<([-\w]+)/),
	      tagName = match && match[1].toLowerCase(),
	      el = mkEl('div', isSVGTag(tagName))

	    // replace all the yield tags with the tag inner html
	    templ = replaceYield(templ, html)

	    /* istanbul ignore next */
	    if (tblTags.test(tagName))
	      el = specialTags(el, templ, tagName)
	    else
	      setInnerHTML(el, templ)

	    el.stub = true

	    return el
	  }

	  /*
	    Creates the root element for table or select child elements:
	    tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
	  */
	  function specialTags(el, templ, tagName) {
	    var
	      select = tagName[0] === 'o',
	      parent = select ? 'select>' : 'table>'

	    // trim() is important here, this ensures we don't have artifacts,
	    // so we can check if we have only one element inside the parent
	    el.innerHTML = '<' + parent + templ.trim() + '</' + parent
	    parent = el.firstChild

	    // returns the immediate parent if tr/th/td/col is the only element, if not
	    // returns the whole tree, as this can include additional elements
	    if (select) {
	      parent.selectedIndex = -1  // for IE9, compatible w/current riot behavior
	    } else {
	      // avoids insertion of cointainer inside container (ex: tbody inside tbody)
	      var tname = rootEls[tagName]
	      if (tname && parent.childElementCount === 1) parent = $(tname, parent)
	    }
	    return parent
	  }

	  /*
	    Replace the yield tag from any tag template with the innerHTML of the
	    original tag in the page
	  */
	  function replaceYield(templ, html) {
	    // do nothing if no yield
	    if (!reHasYield.test(templ)) return templ

	    // be careful with #1343 - string on the source having `$1`
	    var src = {}

	    html = html && html.replace(reYieldSrc, function (_, ref, text) {
	      src[ref] = src[ref] || text   // preserve first definition
	      return ''
	    }).trim()

	    return templ
	      .replace(reYieldDest, function (_, ref, def) {  // yield with from - to attrs
	        return src[ref] || def || ''
	      })
	      .replace(reYieldAll, function (_, def) {        // yield without any "from"
	        return html || def || ''
	      })
	  }

	  return _mkdom

	})()

	/**
	 * Convert the item looped into an object used to extend the child tag properties
	 * @param   { Object } expr - object containing the keys used to extend the children tags
	 * @param   { * } key - value to assign to the new object returned
	 * @param   { * } val - value containing the position of the item in the array
	 * @returns { Object } - new object containing the values of the original item
	 *
	 * The variables 'key' and 'val' are arbitrary.
	 * They depend on the collection type looped (Array, Object)
	 * and on the expression used on the each tag
	 *
	 */
	function mkitem(expr, key, val) {
	  var item = {}
	  item[expr.key] = key
	  if (expr.pos) item[expr.pos] = val
	  return item
	}

	/**
	 * Unmount the redundant tags
	 * @param   { Array } items - array containing the current items to loop
	 * @param   { Array } tags - array containing all the children tags
	 */
	function unmountRedundant(items, tags) {

	  var i = tags.length,
	    j = items.length,
	    t

	  while (i > j) {
	    t = tags[--i]
	    tags.splice(i, 1)
	    t.unmount()
	  }
	}

	/**
	 * Move the nested custom tags in non custom loop tags
	 * @param   { Object } child - non custom loop tag
	 * @param   { Number } i - current position of the loop tag
	 */
	function moveNestedTags(child, i) {
	  Object.keys(child.tags).forEach(function(tagName) {
	    var tag = child.tags[tagName]
	    if (isArray(tag))
	      each(tag, function (t) {
	        moveChildTag(t, tagName, i)
	      })
	    else
	      moveChildTag(tag, tagName, i)
	  })
	}

	/**
	 * Adds the elements for a virtual tag
	 * @param { Tag } tag - the tag whose root's children will be inserted or appended
	 * @param { Node } src - the node that will do the inserting or appending
	 * @param { Tag } target - only if inserting, insert before this tag's first child
	 */
	function addVirtual(tag, src, target) {
	  var el = tag._root, sib
	  tag._virts = []
	  while (el) {
	    sib = el.nextSibling
	    if (target)
	      src.insertBefore(el, target._root)
	    else
	      src.appendChild(el)

	    tag._virts.push(el) // hold for unmounting
	    el = sib
	  }
	}

	/**
	 * Move virtual tag and all child nodes
	 * @param { Tag } tag - first child reference used to start move
	 * @param { Node } src  - the node that will do the inserting
	 * @param { Tag } target - insert before this tag's first child
	 * @param { Number } len - how many child nodes to move
	 */
	function moveVirtual(tag, src, target, len) {
	  var el = tag._root, sib, i = 0
	  for (; i < len; i++) {
	    sib = el.nextSibling
	    src.insertBefore(el, target._root)
	    el = sib
	  }
	}


	/**
	 * Manage tags having the 'each'
	 * @param   { Object } dom - DOM node we need to loop
	 * @param   { Tag } parent - parent tag instance where the dom node is contained
	 * @param   { String } expr - string contained in the 'each' attribute
	 */
	function _each(dom, parent, expr) {

	  // remove the each property from the original tag
	  remAttr(dom, 'each')

	  var mustReorder = typeof getAttr(dom, 'no-reorder') !== T_STRING || remAttr(dom, 'no-reorder'),
	    tagName = getTagName(dom),
	    impl = __tagImpl[tagName] || { tmpl: getOuterHTML(dom) },
	    useRoot = SPECIAL_TAGS_REGEX.test(tagName),
	    root = dom.parentNode,
	    ref = document.createTextNode(''),
	    child = getTag(dom),
	    isOption = tagName.toLowerCase() === 'option', // the option tags must be treated differently
	    tags = [],
	    oldItems = [],
	    hasKeys,
	    isVirtual = dom.tagName == 'VIRTUAL'

	  // parse the each expression
	  expr = tmpl.loopKeys(expr)

	  // insert a marked where the loop tags will be injected
	  root.insertBefore(ref, dom)

	  // clean template code
	  parent.one('before-mount', function () {

	    // remove the original DOM node
	    dom.parentNode.removeChild(dom)
	    if (root.stub) root = parent.root

	  }).on('update', function () {
	    // get the new items collection
	    var items = tmpl(expr.val, parent),
	      // create a fragment to hold the new DOM nodes to inject in the parent tag
	      frag = document.createDocumentFragment()

	    // object loop. any changes cause full redraw
	    if (!isArray(items)) {
	      hasKeys = items || false
	      items = hasKeys ?
	        Object.keys(items).map(function (key) {
	          return mkitem(expr, key, items[key])
	        }) : []
	    }

	    // loop all the new items
	    var i = 0,
	      itemsLength = items.length

	    for (; i < itemsLength; i++) {
	      // reorder only if the items are objects
	      var
	        item = items[i],
	        _mustReorder = mustReorder && typeof item == T_OBJECT && !hasKeys,
	        oldPos = oldItems.indexOf(item),
	        pos = ~oldPos && _mustReorder ? oldPos : i,
	        // does a tag exist in this position?
	        tag = tags[pos]

	      item = !hasKeys && expr.key ? mkitem(expr, item, i) : item

	      // new tag
	      if (
	        !_mustReorder && !tag // with no-reorder we just update the old tags
	        ||
	        _mustReorder && !~oldPos || !tag // by default we always try to reorder the DOM elements
	      ) {

	        tag = new Tag(impl, {
	          parent: parent,
	          isLoop: true,
	          hasImpl: !!__tagImpl[tagName],
	          root: useRoot ? root : dom.cloneNode(),
	          item: item
	        }, dom.innerHTML)

	        tag.mount()

	        if (isVirtual) tag._root = tag.root.firstChild // save reference for further moves or inserts
	        // this tag must be appended
	        if (i == tags.length || !tags[i]) { // fix 1581
	          if (isVirtual)
	            addVirtual(tag, frag)
	          else frag.appendChild(tag.root)
	        }
	        // this tag must be insert
	        else {
	          if (isVirtual)
	            addVirtual(tag, root, tags[i])
	          else root.insertBefore(tag.root, tags[i].root) // #1374 some browsers reset selected here
	          oldItems.splice(i, 0, item)
	        }

	        tags.splice(i, 0, tag)
	        pos = i // handled here so no move
	      } else tag.update(item, true)

	      // reorder the tag if it's not located in its previous position
	      if (
	        pos !== i && _mustReorder &&
	        tags[i] // fix 1581 unable to reproduce it in a test!
	      ) {
	        // update the DOM
	        if (isVirtual)
	          moveVirtual(tag, root, tags[i], dom.childNodes.length)
	        else root.insertBefore(tag.root, tags[i].root)
	        // update the position attribute if it exists
	        if (expr.pos)
	          tag[expr.pos] = i
	        // move the old tag instance
	        tags.splice(i, 0, tags.splice(pos, 1)[0])
	        // move the old item
	        oldItems.splice(i, 0, oldItems.splice(pos, 1)[0])
	        // if the loop tags are not custom
	        // we need to move all their custom tags into the right position
	        if (!child && tag.tags) moveNestedTags(tag, i)
	      }

	      // cache the original item to use it in the events bound to this node
	      // and its children
	      tag._item = item
	      // cache the real parent tag internally
	      defineProperty(tag, '_parent', parent)
	    }

	    // remove the redundant tags
	    unmountRedundant(items, tags)

	    // insert the new nodes
	    if (isOption) {
	      root.appendChild(frag)

	      // #1374 FireFox bug in <option selected={expression}>
	      if (FIREFOX && !root.multiple) {
	        for (var n = 0; n < root.length; n++) {
	          if (root[n].__riot1374) {
	            root.selectedIndex = n  // clear other options
	            delete root[n].__riot1374
	            break
	          }
	        }
	      }
	    }
	    else root.insertBefore(frag, ref)

	    // set the 'tags' property of the parent tag
	    // if child is 'undefined' it means that we don't need to set this property
	    // for example:
	    // we don't need store the `myTag.tags['div']` property if we are looping a div tag
	    // but we need to track the `myTag.tags['child']` property looping a custom child node named `child`
	    if (child) parent.tags[tagName] = tags

	    // clone the items array
	    oldItems = items.slice()

	  })

	}
	/**
	 * Object that will be used to inject and manage the css of every tag instance
	 */
	var styleManager = (function(_riot) {

	  if (!window) return { // skip injection on the server
	    add: function () {},
	    inject: function () {}
	  }

	  var styleNode = (function () {
	    // create a new style element with the correct type
	    var newNode = mkEl('style')
	    setAttr(newNode, 'type', 'text/css')

	    // replace any user node or insert the new one into the head
	    var userNode = $('style[type=riot]')
	    if (userNode) {
	      if (userNode.id) newNode.id = userNode.id
	      userNode.parentNode.replaceChild(newNode, userNode)
	    }
	    else document.getElementsByTagName('head')[0].appendChild(newNode)

	    return newNode
	  })()

	  // Create cache and shortcut to the correct property
	  var cssTextProp = styleNode.styleSheet,
	    stylesToInject = ''

	  // Expose the style node in a non-modificable property
	  Object.defineProperty(_riot, 'styleNode', {
	    value: styleNode,
	    writable: true
	  })

	  /**
	   * Public api
	   */
	  return {
	    /**
	     * Save a tag style to be later injected into DOM
	     * @param   { String } css [description]
	     */
	    add: function(css) {
	      stylesToInject += css
	    },
	    /**
	     * Inject all previously saved tag styles into DOM
	     * innerHTML seems slow: http://jsperf.com/riot-insert-style
	     */
	    inject: function() {
	      if (stylesToInject) {
	        if (cssTextProp) cssTextProp.cssText += stylesToInject
	        else styleNode.innerHTML += stylesToInject
	        stylesToInject = ''
	      }
	    }
	  }

	})(riot)


	function parseNamedElements(root, tag, childTags, forceParsingNamed) {

	  walk(root, function(dom) {
	    if (dom.nodeType == 1) {
	      dom.isLoop = dom.isLoop ||
	                  (dom.parentNode && dom.parentNode.isLoop || getAttr(dom, 'each'))
	                    ? 1 : 0

	      // custom child tag
	      if (childTags) {
	        var child = getTag(dom)

	        if (child && !dom.isLoop)
	          childTags.push(initChildTag(child, {root: dom, parent: tag}, dom.innerHTML, tag))
	      }

	      if (!dom.isLoop || forceParsingNamed)
	        setNamed(dom, tag, [])
	    }

	  })

	}

	function parseExpressions(root, tag, expressions) {

	  function addExpr(dom, val, extra) {
	    if (tmpl.hasExpr(val)) {
	      expressions.push(extend({ dom: dom, expr: val }, extra))
	    }
	  }

	  walk(root, function(dom) {
	    var type = dom.nodeType,
	      attr

	    // text node
	    if (type == 3 && dom.parentNode.tagName != 'STYLE') addExpr(dom, dom.nodeValue)
	    if (type != 1) return

	    /* element */

	    // loop
	    attr = getAttr(dom, 'each')

	    if (attr) { _each(dom, tag, attr); return false }

	    // attribute expressions
	    each(dom.attributes, function(attr) {
	      var name = attr.name,
	        bool = name.split('__')[1]

	      addExpr(dom, attr.value, { attr: bool || name, bool: bool })
	      if (bool) { remAttr(dom, name); return false }

	    })

	    // skip custom tags
	    if (getTag(dom)) return false

	  })

	}
	function Tag(impl, conf, innerHTML) {

	  var self = riot.observable(this),
	    opts = inherit(conf.opts) || {},
	    parent = conf.parent,
	    isLoop = conf.isLoop,
	    hasImpl = conf.hasImpl,
	    item = cleanUpData(conf.item),
	    expressions = [],
	    childTags = [],
	    root = conf.root,
	    tagName = root.tagName.toLowerCase(),
	    attr = {},
	    propsInSyncWithParent = [],
	    dom

	  // only call unmount if we have a valid __tagImpl (has name property)
	  if (impl.name && root._tag) root._tag.unmount(true)

	  // not yet mounted
	  this.isMounted = false
	  root.isLoop = isLoop

	  // keep a reference to the tag just created
	  // so we will be able to mount this tag multiple times
	  root._tag = this

	  // create a unique id to this tag
	  // it could be handy to use it also to improve the virtual dom rendering speed
	  defineProperty(this, '_riot_id', ++__uid) // base 1 allows test !t._riot_id

	  extend(this, { parent: parent, root: root, opts: opts}, item)
	  // protect the "tags" property from being overridden
	  defineProperty(this, 'tags', {})

	  // grab attributes
	  each(root.attributes, function(el) {
	    var val = el.value
	    // remember attributes with expressions only
	    if (tmpl.hasExpr(val)) attr[el.name] = val
	  })

	  dom = mkdom(impl.tmpl, innerHTML)

	  // options
	  function updateOpts() {
	    var ctx = hasImpl && isLoop ? self : parent || self

	    // update opts from current DOM attributes
	    each(root.attributes, function(el) {
	      var val = el.value
	      opts[toCamel(el.name)] = tmpl.hasExpr(val) ? tmpl(val, ctx) : val
	    })
	    // recover those with expressions
	    each(Object.keys(attr), function(name) {
	      opts[toCamel(name)] = tmpl(attr[name], ctx)
	    })
	  }

	  function normalizeData(data) {
	    for (var key in item) {
	      if (typeof self[key] !== T_UNDEF && isWritable(self, key))
	        self[key] = data[key]
	    }
	  }

	  function inheritFromParent () {
	    if (!self.parent || !isLoop) return
	    each(Object.keys(self.parent), function(k) {
	      // some properties must be always in sync with the parent tag
	      var mustSync = !RESERVED_WORDS_BLACKLIST.test(k) && contains(propsInSyncWithParent, k)
	      if (typeof self[k] === T_UNDEF || mustSync) {
	        // track the property to keep in sync
	        // so we can keep it updated
	        if (!mustSync) propsInSyncWithParent.push(k)
	        self[k] = self.parent[k]
	      }
	    })
	  }

	  /**
	   * Update the tag expressions and options
	   * @param   { * }  data - data we want to use to extend the tag properties
	   * @param   { Boolean } isInherited - is this update coming from a parent tag?
	   * @returns { self }
	   */
	  defineProperty(this, 'update', function(data, isInherited) {

	    // make sure the data passed will not override
	    // the component core methods
	    data = cleanUpData(data)
	    // inherit properties from the parent
	    inheritFromParent()
	    // normalize the tag properties in case an item object was initially passed
	    if (data && isObject(item)) {
	      normalizeData(data)
	      item = data
	    }
	    extend(self, data)
	    updateOpts()
	    self.trigger('update', data)
	    update(expressions, self)

	    // the updated event will be triggered
	    // once the DOM will be ready and all the re-flows are completed
	    // this is useful if you want to get the "real" root properties
	    // 4 ex: root.offsetWidth ...
	    if (isInherited && self.parent)
	      // closes #1599
	      self.parent.one('updated', function() { self.trigger('updated') })
	    else rAF(function() { self.trigger('updated') })

	    return this
	  })

	  defineProperty(this, 'mixin', function() {
	    each(arguments, function(mix) {
	      var instance

	      mix = typeof mix === T_STRING ? riot.mixin(mix) : mix

	      // check if the mixin is a function
	      if (isFunction(mix)) {
	        // create the new mixin instance
	        instance = new mix()
	        // save the prototype to loop it afterwards
	        mix = mix.prototype
	      } else instance = mix

	      // loop the keys in the function prototype or the all object keys
	      each(Object.getOwnPropertyNames(mix), function(key) {
	        // bind methods to self
	        if (key != 'init')
	          self[key] = isFunction(instance[key]) ?
	                        instance[key].bind(self) :
	                        instance[key]
	      })

	      // init method will be called automatically
	      if (instance.init) instance.init.bind(self)()
	    })
	    return this
	  })

	  defineProperty(this, 'mount', function() {

	    updateOpts()

	    // add global mixins
	    var globalMixin = riot.mixin(GLOBAL_MIXIN)
	    if (globalMixin)
	      for (var i in globalMixin)
	        if (globalMixin.hasOwnProperty(i))
	          self.mixin(globalMixin[i])

	    // initialiation
	    if (impl.fn) impl.fn.call(self, opts)

	    // parse layout after init. fn may calculate args for nested custom tags
	    parseExpressions(dom, self, expressions)

	    // mount the child tags
	    toggle(true)

	    // update the root adding custom attributes coming from the compiler
	    // it fixes also #1087
	    if (impl.attrs)
	      walkAttributes(impl.attrs, function (k, v) { setAttr(root, k, v) })
	    if (impl.attrs || hasImpl)
	      parseExpressions(self.root, self, expressions)

	    if (!self.parent || isLoop) self.update(item)

	    // internal use only, fixes #403
	    self.trigger('before-mount')

	    if (isLoop && !hasImpl) {
	      // update the root attribute for the looped elements
	      root = dom.firstChild
	    } else {
	      while (dom.firstChild) root.appendChild(dom.firstChild)
	      if (root.stub) root = parent.root
	    }

	    defineProperty(self, 'root', root)

	    // parse the named dom nodes in the looped child
	    // adding them to the parent as well
	    if (isLoop)
	      parseNamedElements(self.root, self.parent, null, true)

	    // if it's not a child tag we can trigger its mount event
	    if (!self.parent || self.parent.isMounted) {
	      self.isMounted = true
	      self.trigger('mount')
	    }
	    // otherwise we need to wait that the parent event gets triggered
	    else self.parent.one('mount', function() {
	      // avoid to trigger the `mount` event for the tags
	      // not visible included in an if statement
	      if (!isInStub(self.root)) {
	        self.parent.isMounted = self.isMounted = true
	        self.trigger('mount')
	      }
	    })
	  })


	  defineProperty(this, 'unmount', function(keepRootTag) {
	    var el = root,
	      p = el.parentNode,
	      ptag,
	      tagIndex = __virtualDom.indexOf(self)

	    self.trigger('before-unmount')

	    // remove this tag instance from the global virtualDom variable
	    if (~tagIndex)
	      __virtualDom.splice(tagIndex, 1)

	    if (p) {

	      if (parent) {
	        ptag = getImmediateCustomParentTag(parent)
	        // remove this tag from the parent tags object
	        // if there are multiple nested tags with same name..
	        // remove this element form the array
	        if (isArray(ptag.tags[tagName]))
	          each(ptag.tags[tagName], function(tag, i) {
	            if (tag._riot_id == self._riot_id)
	              ptag.tags[tagName].splice(i, 1)
	          })
	        else
	          // otherwise just delete the tag instance
	          ptag.tags[tagName] = undefined
	      }

	      else
	        while (el.firstChild) el.removeChild(el.firstChild)

	      if (!keepRootTag)
	        p.removeChild(el)
	      else {
	        // the riot-tag and the data-is attributes aren't needed anymore, remove them
	        remAttr(p, RIOT_TAG_IS)
	        remAttr(p, RIOT_TAG) // this will be removed in riot 3.0.0
	      }

	    }

	    if (this._virts) {
	      each(this._virts, function(v) {
	        if (v.parentNode) v.parentNode.removeChild(v)
	      })
	    }

	    self.trigger('unmount')
	    toggle()
	    self.off('*')
	    self.isMounted = false
	    delete root._tag

	  })

	  // proxy function to bind updates
	  // dispatched from a parent tag
	  function onChildUpdate(data) { self.update(data, true) }

	  function toggle(isMount) {

	    // mount/unmount children
	    each(childTags, function(child) { child[isMount ? 'mount' : 'unmount']() })

	    // listen/unlisten parent (events flow one way from parent to children)
	    if (!parent) return
	    var evt = isMount ? 'on' : 'off'

	    // the loop tags will be always in sync with the parent automatically
	    if (isLoop)
	      parent[evt]('unmount', self.unmount)
	    else {
	      parent[evt]('update', onChildUpdate)[evt]('unmount', self.unmount)
	    }
	  }


	  // named elements available for fn
	  parseNamedElements(dom, this, childTags)

	}
	/**
	 * Attach an event to a DOM node
	 * @param { String } name - event name
	 * @param { Function } handler - event callback
	 * @param { Object } dom - dom node
	 * @param { Tag } tag - tag instance
	 */
	function setEventHandler(name, handler, dom, tag) {

	  dom[name] = function(e) {

	    var ptag = tag._parent,
	      item = tag._item,
	      el

	    if (!item)
	      while (ptag && !item) {
	        item = ptag._item
	        ptag = ptag._parent
	      }

	    // cross browser event fix
	    e = e || window.event

	    // override the event properties
	    if (isWritable(e, 'currentTarget')) e.currentTarget = dom
	    if (isWritable(e, 'target')) e.target = e.srcElement
	    if (isWritable(e, 'which')) e.which = e.charCode || e.keyCode

	    e.item = item

	    // prevent default behaviour (by default)
	    if (handler.call(tag, e) !== true && !/radio|check/.test(dom.type)) {
	      if (e.preventDefault) e.preventDefault()
	      e.returnValue = false
	    }

	    if (!e.preventUpdate) {
	      el = item ? getImmediateCustomParentTag(ptag) : tag
	      el.update()
	    }

	  }

	}


	/**
	 * Insert a DOM node replacing another one (used by if- attribute)
	 * @param   { Object } root - parent node
	 * @param   { Object } node - node replaced
	 * @param   { Object } before - node added
	 */
	function insertTo(root, node, before) {
	  if (!root) return
	  root.insertBefore(before, node)
	  root.removeChild(node)
	}

	/**
	 * Update the expressions in a Tag instance
	 * @param   { Array } expressions - expression that must be re evaluated
	 * @param   { Tag } tag - tag instance
	 */
	function update(expressions, tag) {

	  each(expressions, function(expr, i) {

	    var dom = expr.dom,
	      attrName = expr.attr,
	      value = tmpl(expr.expr, tag),
	      parent = expr.dom.parentNode

	    if (expr.bool) {
	      value = !!value
	    } else if (value == null) {
	      value = ''
	    }

	    // #1638: regression of #1612, update the dom only if the value of the
	    // expression was changed
	    if (expr.value === value) {
	      return
	    }
	    expr.value = value

	    // textarea and text nodes has no attribute name
	    if (!attrName) {
	      // about #815 w/o replace: the browser converts the value to a string,
	      // the comparison by "==" does too, but not in the server
	      value += ''
	      // test for parent avoids error with invalid assignment to nodeValue
	      if (parent) {
	        if (parent.tagName === 'TEXTAREA') {
	          parent.value = value                    // #1113
	          if (!IE_VERSION) dom.nodeValue = value  // #1625 IE throws here, nodeValue
	        }                                         // will be available on 'updated'
	        else dom.nodeValue = value
	      }
	      return
	    }

	    // ~~#1612: look for changes in dom.value when updating the value~~
	    if (attrName === 'value') {
	      dom.value = value
	      return
	    }

	    // remove original attribute
	    remAttr(dom, attrName)

	    // event handler
	    if (isFunction(value)) {
	      setEventHandler(attrName, value, dom, tag)

	    // if- conditional
	    } else if (attrName == 'if') {
	      var stub = expr.stub,
	        add = function() { insertTo(stub.parentNode, stub, dom) },
	        remove = function() { insertTo(dom.parentNode, dom, stub) }

	      // add to DOM
	      if (value) {
	        if (stub) {
	          add()
	          dom.inStub = false
	          // avoid to trigger the mount event if the tags is not visible yet
	          // maybe we can optimize this avoiding to mount the tag at all
	          if (!isInStub(dom)) {
	            walk(dom, function(el) {
	              if (el._tag && !el._tag.isMounted)
	                el._tag.isMounted = !!el._tag.trigger('mount')
	            })
	          }
	        }
	      // remove from DOM
	      } else {
	        stub = expr.stub = stub || document.createTextNode('')
	        // if the parentNode is defined we can easily replace the tag
	        if (dom.parentNode)
	          remove()
	        // otherwise we need to wait the updated event
	        else (tag.parent || tag).one('updated', remove)

	        dom.inStub = true
	      }
	    // show / hide
	    } else if (attrName === 'show') {
	      dom.style.display = value ? '' : 'none'

	    } else if (attrName === 'hide') {
	      dom.style.display = value ? 'none' : ''

	    } else if (expr.bool) {
	      dom[attrName] = value
	      if (value) setAttr(dom, attrName, attrName)
	      if (FIREFOX && attrName === 'selected' && dom.tagName === 'OPTION') {
	        dom.__riot1374 = value   // #1374
	      }

	    } else if (value === 0 || value && typeof value !== T_OBJECT) {
	      // <img src="{ expr }">
	      if (startsWith(attrName, RIOT_PREFIX) && attrName != RIOT_TAG) {
	        attrName = attrName.slice(RIOT_PREFIX.length)
	      }
	      setAttr(dom, attrName, value)
	    }

	  })

	}
	/**
	 * Specialized function for looping an array-like collection with `each={}`
	 * @param   { Array } els - collection of items
	 * @param   {Function} fn - callback function
	 * @returns { Array } the array looped
	 */
	function each(els, fn) {
	  var len = els ? els.length : 0

	  for (var i = 0, el; i < len; i++) {
	    el = els[i]
	    // return false -> current item was removed by fn during the loop
	    if (el != null && fn(el, i) === false) i--
	  }
	  return els
	}

	/**
	 * Detect if the argument passed is a function
	 * @param   { * } v - whatever you want to pass to this function
	 * @returns { Boolean } -
	 */
	function isFunction(v) {
	  return typeof v === T_FUNCTION || false   // avoid IE problems
	}

	/**
	 * Get the outer html of any DOM node SVGs included
	 * @param   { Object } el - DOM node to parse
	 * @returns { String } el.outerHTML
	 */
	function getOuterHTML(el) {
	  if (el.outerHTML) return el.outerHTML
	  // some browsers do not support outerHTML on the SVGs tags
	  else {
	    var container = mkEl('div')
	    container.appendChild(el.cloneNode(true))
	    return container.innerHTML
	  }
	}

	/**
	 * Set the inner html of any DOM node SVGs included
	 * @param { Object } container - DOM node where we will inject the new html
	 * @param { String } html - html to inject
	 */
	function setInnerHTML(container, html) {
	  if (typeof container.innerHTML != T_UNDEF) container.innerHTML = html
	  // some browsers do not support innerHTML on the SVGs tags
	  else {
	    var doc = new DOMParser().parseFromString(html, 'application/xml')
	    container.appendChild(
	      container.ownerDocument.importNode(doc.documentElement, true)
	    )
	  }
	}

	/**
	 * Checks wether a DOM node must be considered part of an svg document
	 * @param   { String }  name - tag name
	 * @returns { Boolean } -
	 */
	function isSVGTag(name) {
	  return ~SVG_TAGS_LIST.indexOf(name)
	}

	/**
	 * Detect if the argument passed is an object, exclude null.
	 * NOTE: Use isObject(x) && !isArray(x) to excludes arrays.
	 * @param   { * } v - whatever you want to pass to this function
	 * @returns { Boolean } -
	 */
	function isObject(v) {
	  return v && typeof v === T_OBJECT         // typeof null is 'object'
	}

	/**
	 * Remove any DOM attribute from a node
	 * @param   { Object } dom - DOM node we want to update
	 * @param   { String } name - name of the property we want to remove
	 */
	function remAttr(dom, name) {
	  dom.removeAttribute(name)
	}

	/**
	 * Convert a string containing dashes to camel case
	 * @param   { String } string - input string
	 * @returns { String } my-string -> myString
	 */
	function toCamel(string) {
	  return string.replace(/-(\w)/g, function(_, c) {
	    return c.toUpperCase()
	  })
	}

	/**
	 * Get the value of any DOM attribute on a node
	 * @param   { Object } dom - DOM node we want to parse
	 * @param   { String } name - name of the attribute we want to get
	 * @returns { String | undefined } name of the node attribute whether it exists
	 */
	function getAttr(dom, name) {
	  return dom.getAttribute(name)
	}

	/**
	 * Set any DOM attribute
	 * @param { Object } dom - DOM node we want to update
	 * @param { String } name - name of the property we want to set
	 * @param { String } val - value of the property we want to set
	 */
	function setAttr(dom, name, val) {
	  dom.setAttribute(name, val)
	}

	/**
	 * Detect the tag implementation by a DOM node
	 * @param   { Object } dom - DOM node we need to parse to get its tag implementation
	 * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
	 */
	function getTag(dom) {
	  return dom.tagName && __tagImpl[getAttr(dom, RIOT_TAG_IS) ||
	    getAttr(dom, RIOT_TAG) || dom.tagName.toLowerCase()]
	}
	/**
	 * Add a child tag to its parent into the `tags` object
	 * @param   { Object } tag - child tag instance
	 * @param   { String } tagName - key where the new tag will be stored
	 * @param   { Object } parent - tag instance where the new child tag will be included
	 */
	function addChildTag(tag, tagName, parent) {
	  var cachedTag = parent.tags[tagName]

	  // if there are multiple children tags having the same name
	  if (cachedTag) {
	    // if the parent tags property is not yet an array
	    // create it adding the first cached tag
	    if (!isArray(cachedTag))
	      // don't add the same tag twice
	      if (cachedTag !== tag)
	        parent.tags[tagName] = [cachedTag]
	    // add the new nested tag to the array
	    if (!contains(parent.tags[tagName], tag))
	      parent.tags[tagName].push(tag)
	  } else {
	    parent.tags[tagName] = tag
	  }
	}

	/**
	 * Move the position of a custom tag in its parent tag
	 * @param   { Object } tag - child tag instance
	 * @param   { String } tagName - key where the tag was stored
	 * @param   { Number } newPos - index where the new tag will be stored
	 */
	function moveChildTag(tag, tagName, newPos) {
	  var parent = tag.parent,
	    tags
	  // no parent no move
	  if (!parent) return

	  tags = parent.tags[tagName]

	  if (isArray(tags))
	    tags.splice(newPos, 0, tags.splice(tags.indexOf(tag), 1)[0])
	  else addChildTag(tag, tagName, parent)
	}

	/**
	 * Create a new child tag including it correctly into its parent
	 * @param   { Object } child - child tag implementation
	 * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
	 * @param   { String } innerHTML - inner html of the child node
	 * @param   { Object } parent - instance of the parent tag including the child custom tag
	 * @returns { Object } instance of the new child tag just created
	 */
	function initChildTag(child, opts, innerHTML, parent) {
	  var tag = new Tag(child, opts, innerHTML),
	    tagName = getTagName(opts.root),
	    ptag = getImmediateCustomParentTag(parent)
	  // fix for the parent attribute in the looped elements
	  tag.parent = ptag
	  // store the real parent tag
	  // in some cases this could be different from the custom parent tag
	  // for example in nested loops
	  tag._parent = parent

	  // add this tag to the custom parent tag
	  addChildTag(tag, tagName, ptag)
	  // and also to the real parent tag
	  if (ptag !== parent)
	    addChildTag(tag, tagName, parent)
	  // empty the child node once we got its template
	  // to avoid that its children get compiled multiple times
	  opts.root.innerHTML = ''

	  return tag
	}

	/**
	 * Loop backward all the parents tree to detect the first custom parent tag
	 * @param   { Object } tag - a Tag instance
	 * @returns { Object } the instance of the first custom parent tag found
	 */
	function getImmediateCustomParentTag(tag) {
	  var ptag = tag
	  while (!getTag(ptag.root)) {
	    if (!ptag.parent) break
	    ptag = ptag.parent
	  }
	  return ptag
	}

	/**
	 * Helper function to set an immutable property
	 * @param   { Object } el - object where the new property will be set
	 * @param   { String } key - object key where the new property will be stored
	 * @param   { * } value - value of the new property
	* @param   { Object } options - set the propery overriding the default options
	 * @returns { Object } - the initial object
	 */
	function defineProperty(el, key, value, options) {
	  Object.defineProperty(el, key, extend({
	    value: value,
	    enumerable: false,
	    writable: false,
	    configurable: true
	  }, options))
	  return el
	}

	/**
	 * Get the tag name of any DOM node
	 * @param   { Object } dom - DOM node we want to parse
	 * @returns { String } name to identify this dom node in riot
	 */
	function getTagName(dom) {
	  var child = getTag(dom),
	    namedTag = getAttr(dom, 'name'),
	    tagName = namedTag && !tmpl.hasExpr(namedTag) ?
	                namedTag :
	              child ? child.name : dom.tagName.toLowerCase()

	  return tagName
	}

	/**
	 * Extend any object with other properties
	 * @param   { Object } src - source object
	 * @returns { Object } the resulting extended object
	 *
	 * var obj = { foo: 'baz' }
	 * extend(obj, {bar: 'bar', foo: 'bar'})
	 * console.log(obj) => {bar: 'bar', foo: 'bar'}
	 *
	 */
	function extend(src) {
	  var obj, args = arguments
	  for (var i = 1; i < args.length; ++i) {
	    if (obj = args[i]) {
	      for (var key in obj) {
	        // check if this property of the source object could be overridden
	        if (isWritable(src, key))
	          src[key] = obj[key]
	      }
	    }
	  }
	  return src
	}

	/**
	 * Check whether an array contains an item
	 * @param   { Array } arr - target array
	 * @param   { * } item - item to test
	 * @returns { Boolean } Does 'arr' contain 'item'?
	 */
	function contains(arr, item) {
	  return ~arr.indexOf(item)
	}

	/**
	 * Check whether an object is a kind of array
	 * @param   { * } a - anything
	 * @returns {Boolean} is 'a' an array?
	 */
	function isArray(a) { return Array.isArray(a) || a instanceof Array }

	/**
	 * Detect whether a property of an object could be overridden
	 * @param   { Object }  obj - source object
	 * @param   { String }  key - object property
	 * @returns { Boolean } is this property writable?
	 */
	function isWritable(obj, key) {
	  var props = Object.getOwnPropertyDescriptor(obj, key)
	  return typeof obj[key] === T_UNDEF || props && props.writable
	}


	/**
	 * With this function we avoid that the internal Tag methods get overridden
	 * @param   { Object } data - options we want to use to extend the tag instance
	 * @returns { Object } clean object without containing the riot internal reserved words
	 */
	function cleanUpData(data) {
	  if (!(data instanceof Tag) && !(data && typeof data.trigger == T_FUNCTION))
	    return data

	  var o = {}
	  for (var key in data) {
	    if (!RESERVED_WORDS_BLACKLIST.test(key)) o[key] = data[key]
	  }
	  return o
	}

	/**
	 * Walk down recursively all the children tags starting dom node
	 * @param   { Object }   dom - starting node where we will start the recursion
	 * @param   { Function } fn - callback to transform the child node just found
	 */
	function walk(dom, fn) {
	  if (dom) {
	    // stop the recursion
	    if (fn(dom) === false) return
	    else {
	      dom = dom.firstChild

	      while (dom) {
	        walk(dom, fn)
	        dom = dom.nextSibling
	      }
	    }
	  }
	}

	/**
	 * Minimize risk: only zero or one _space_ between attr & value
	 * @param   { String }   html - html string we want to parse
	 * @param   { Function } fn - callback function to apply on any attribute found
	 */
	function walkAttributes(html, fn) {
	  var m,
	    re = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g

	  while (m = re.exec(html)) {
	    fn(m[1].toLowerCase(), m[2] || m[3] || m[4])
	  }
	}

	/**
	 * Check whether a DOM node is in stub mode, useful for the riot 'if' directive
	 * @param   { Object }  dom - DOM node we want to parse
	 * @returns { Boolean } -
	 */
	function isInStub(dom) {
	  while (dom) {
	    if (dom.inStub) return true
	    dom = dom.parentNode
	  }
	  return false
	}

	/**
	 * Create a generic DOM node
	 * @param   { String } name - name of the DOM node we want to create
	 * @param   { Boolean } isSvg - should we use a SVG as parent node?
	 * @returns { Object } DOM node just created
	 */
	function mkEl(name, isSvg) {
	  return isSvg ?
	    document.createElementNS('http://www.w3.org/2000/svg', 'svg') :
	    document.createElement(name)
	}

	/**
	 * Shorter and fast way to select multiple nodes in the DOM
	 * @param   { String } selector - DOM selector
	 * @param   { Object } ctx - DOM node where the targets of our search will is located
	 * @returns { Object } dom nodes found
	 */
	function $$(selector, ctx) {
	  return (ctx || document).querySelectorAll(selector)
	}

	/**
	 * Shorter and fast way to select a single node in the DOM
	 * @param   { String } selector - unique dom selector
	 * @param   { Object } ctx - DOM node where the target of our search will is located
	 * @returns { Object } dom node found
	 */
	function $(selector, ctx) {
	  return (ctx || document).querySelector(selector)
	}

	/**
	 * Simple object prototypal inheritance
	 * @param   { Object } parent - parent object
	 * @returns { Object } child instance
	 */
	function inherit(parent) {
	  function Child() {}
	  Child.prototype = parent
	  return new Child()
	}

	/**
	 * Get the name property needed to identify a DOM node in riot
	 * @param   { Object } dom - DOM node we need to parse
	 * @returns { String | undefined } give us back a string to identify this dom node
	 */
	function getNamedKey(dom) {
	  return getAttr(dom, 'id') || getAttr(dom, 'name')
	}

	/**
	 * Set the named properties of a tag element
	 * @param { Object } dom - DOM node we need to parse
	 * @param { Object } parent - tag instance where the named dom element will be eventually added
	 * @param { Array } keys - list of all the tag instance properties
	 */
	function setNamed(dom, parent, keys) {
	  // get the key value we want to add to the tag instance
	  var key = getNamedKey(dom),
	    isArr,
	    // add the node detected to a tag instance using the named property
	    add = function(value) {
	      // avoid to override the tag properties already set
	      if (contains(keys, key)) return
	      // check whether this value is an array
	      isArr = isArray(value)
	      // if the key was never set
	      if (!value)
	        // set it once on the tag instance
	        parent[key] = dom
	      // if it was an array and not yet set
	      else if (!isArr || isArr && !contains(value, dom)) {
	        // add the dom node into the array
	        if (isArr)
	          value.push(dom)
	        else
	          parent[key] = [value, dom]
	      }
	    }

	  // skip the elements with no named properties
	  if (!key) return

	  // check whether this key has been already evaluated
	  if (tmpl.hasExpr(key))
	    // wait the first updated event only once
	    parent.one('mount', function() {
	      key = getNamedKey(dom)
	      add(parent[key])
	    })
	  else
	    add(parent[key])

	}

	/**
	 * Faster String startsWith alternative
	 * @param   { String } src - source string
	 * @param   { String } str - test string
	 * @returns { Boolean } -
	 */
	function startsWith(src, str) {
	  return src.slice(0, str.length) === str
	}

	/**
	 * requestAnimationFrame function
	 * Adapted from https://gist.github.com/paulirish/1579671, license MIT
	 */
	var rAF = (function (w) {
	  var raf = w.requestAnimationFrame    ||
	            w.mozRequestAnimationFrame || w.webkitRequestAnimationFrame

	  if (!raf || /iP(ad|hone|od).*OS 6/.test(w.navigator.userAgent)) {  // buggy iOS6
	    var lastTime = 0

	    raf = function (cb) {
	      var nowtime = Date.now(), timeout = Math.max(16 - (nowtime - lastTime), 0)
	      setTimeout(function () { cb(lastTime = nowtime + timeout) }, timeout)
	    }
	  }
	  return raf

	})(window || {})

	/**
	 * Mount a tag creating new Tag instance
	 * @param   { Object } root - dom node where the tag will be mounted
	 * @param   { String } tagName - name of the riot tag we want to mount
	 * @param   { Object } opts - options to pass to the Tag instance
	 * @returns { Tag } a new Tag instance
	 */
	function mountTo(root, tagName, opts) {
	  var tag = __tagImpl[tagName],
	    // cache the inner HTML to fix #855
	    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML

	  // clear the inner html
	  root.innerHTML = ''

	  if (tag && root) tag = new Tag(tag, { root: root, opts: opts }, innerHTML)

	  if (tag && tag.mount) {
	    tag.mount()
	    // add this tag to the virtualDom variable
	    if (!contains(__virtualDom, tag)) __virtualDom.push(tag)
	  }

	  return tag
	}
	/**
	 * Riot public api
	 */

	// share methods for other riot parts, e.g. compiler
	riot.util = { brackets: brackets, tmpl: tmpl }

	/**
	 * Create a mixin that could be globally shared across all the tags
	 */
	riot.mixin = (function() {
	  var mixins = {},
	    globals = mixins[GLOBAL_MIXIN] = {},
	    _id = 0

	  /**
	   * Create/Return a mixin by its name
	   * @param   { String }  name - mixin name (global mixin if object)
	   * @param   { Object }  mixin - mixin logic
	   * @param   { Boolean } g - is global?
	   * @returns { Object }  the mixin logic
	   */
	  return function(name, mixin, g) {
	    // Unnamed global
	    if (isObject(name)) {
	      riot.mixin('__unnamed_'+_id++, name, true)
	      return
	    }

	    var store = g ? globals : mixins

	    // Getter
	    if (!mixin) {
	      if (typeof store[name] === T_UNDEF) {
	        throw new Error('Unregistered mixin: ' + name)
	      }
	      return store[name]
	    }
	    // Setter
	    if (isFunction(mixin)) {
	      extend(mixin.prototype, store[name] || {})
	      store[name] = mixin
	    }
	    else {
	      store[name] = extend(store[name] || {}, mixin)
	    }
	  }

	})()

	/**
	 * Create a new riot tag implementation
	 * @param   { String }   name - name/id of the new riot tag
	 * @param   { String }   html - tag template
	 * @param   { String }   css - custom tag css
	 * @param   { String }   attrs - root tag attributes
	 * @param   { Function } fn - user function
	 * @returns { String } name/id of the tag just created
	 */
	riot.tag = function(name, html, css, attrs, fn) {
	  if (isFunction(attrs)) {
	    fn = attrs
	    if (/^[\w\-]+\s?=/.test(css)) {
	      attrs = css
	      css = ''
	    } else attrs = ''
	  }
	  if (css) {
	    if (isFunction(css)) fn = css
	    else styleManager.add(css)
	  }
	  name = name.toLowerCase()
	  __tagImpl[name] = { name: name, tmpl: html, attrs: attrs, fn: fn }
	  return name
	}

	/**
	 * Create a new riot tag implementation (for use by the compiler)
	 * @param   { String }   name - name/id of the new riot tag
	 * @param   { String }   html - tag template
	 * @param   { String }   css - custom tag css
	 * @param   { String }   attrs - root tag attributes
	 * @param   { Function } fn - user function
	 * @returns { String } name/id of the tag just created
	 */
	riot.tag2 = function(name, html, css, attrs, fn) {
	  if (css) styleManager.add(css)
	  //if (bpair) riot.settings.brackets = bpair
	  __tagImpl[name] = { name: name, tmpl: html, attrs: attrs, fn: fn }
	  return name
	}

	/**
	 * Mount a tag using a specific tag implementation
	 * @param   { String } selector - tag DOM selector
	 * @param   { String } tagName - tag implementation name
	 * @param   { Object } opts - tag logic
	 * @returns { Array } new tags instances
	 */
	riot.mount = function(selector, tagName, opts) {

	  var els,
	    allTags,
	    tags = []

	  // helper functions

	  function addRiotTags(arr) {
	    var list = ''
	    each(arr, function (e) {
	      if (!/[^-\w]/.test(e)) {
	        e = e.trim().toLowerCase()
	        list += ',[' + RIOT_TAG_IS + '="' + e + '"],[' + RIOT_TAG + '="' + e + '"]'
	      }
	    })
	    return list
	  }

	  function selectAllTags() {
	    var keys = Object.keys(__tagImpl)
	    return keys + addRiotTags(keys)
	  }

	  function pushTags(root) {
	    if (root.tagName) {
	      var riotTag = getAttr(root, RIOT_TAG_IS) || getAttr(root, RIOT_TAG)

	      // have tagName? force riot-tag to be the same
	      if (tagName && riotTag !== tagName) {
	        riotTag = tagName
	        setAttr(root, RIOT_TAG_IS, tagName)
	        setAttr(root, RIOT_TAG, tagName) // this will be removed in riot 3.0.0
	      }
	      var tag = mountTo(root, riotTag || root.tagName.toLowerCase(), opts)

	      if (tag) tags.push(tag)
	    } else if (root.length) {
	      each(root, pushTags)   // assume nodeList
	    }
	  }

	  // ----- mount code -----

	  // inject styles into DOM
	  styleManager.inject()

	  if (isObject(tagName)) {
	    opts = tagName
	    tagName = 0
	  }

	  // crawl the DOM to find the tag
	  if (typeof selector === T_STRING) {
	    if (selector === '*')
	      // select all the tags registered
	      // and also the tags found with the riot-tag attribute set
	      selector = allTags = selectAllTags()
	    else
	      // or just the ones named like the selector
	      selector += addRiotTags(selector.split(/, */))

	    // make sure to pass always a selector
	    // to the querySelectorAll function
	    els = selector ? $$(selector) : []
	  }
	  else
	    // probably you have passed already a tag or a NodeList
	    els = selector

	  // select all the registered and mount them inside their root elements
	  if (tagName === '*') {
	    // get all custom tags
	    tagName = allTags || selectAllTags()
	    // if the root els it's just a single tag
	    if (els.tagName)
	      els = $$(tagName, els)
	    else {
	      // select all the children for all the different root elements
	      var nodeList = []
	      each(els, function (_el) {
	        nodeList.push($$(tagName, _el))
	      })
	      els = nodeList
	    }
	    // get rid of the tagName
	    tagName = 0
	  }

	  pushTags(els)

	  return tags
	}

	/**
	 * Update all the tags instances created
	 * @returns { Array } all the tags instances
	 */
	riot.update = function() {
	  return each(__virtualDom, function(tag) {
	    tag.update()
	  })
	}

	/**
	 * Export the Virtual DOM
	 */
	riot.vdom = __virtualDom

	/**
	 * Export the Tag constructor
	 */
	riot.Tag = Tag
	  // support CommonJS, AMD & browser
	  /* istanbul ignore next */
	  if (typeof exports === T_OBJECT)
	    module.exports = riot
	  else if ("function" === T_FUNCTION && typeof __webpack_require__(45) !== T_UNDEF)
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return riot }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  else
	    window.riot = riot

	})(typeof window != 'undefined' ? window : void 0);


/***/ },
/* 45 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(47);
	__webpack_require__(48);
	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(65);
	__webpack_require__(66);
	__webpack_require__(67);
	__webpack_require__(68);
	__webpack_require__(69);
	__webpack_require__(72);
	__webpack_require__(74);
	__webpack_require__(75);
	__webpack_require__(78);
	__webpack_require__(85);


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-query', '<div class="gb-query {opts.style()}"> <input class="gb-query__box" name="searchBox" type="text" placeholder="Search..." autofocus> <a class="gb-query__reset" onclick="{clearQuery}">×</a> </div>', 'gb-query .gb-stylish.gb-query,[riot-tag="gb-query"] .gb-stylish.gb-query,[data-is="gb-query"] .gb-stylish.gb-query{ display: flex; align-items: baseline; } gb-query .gb-stylish .gb-query__box,[riot-tag="gb-query"] .gb-stylish .gb-query__box,[data-is="gb-query"] .gb-stylish .gb-query__box{ padding: 6px 12px; font-size: 14px; } gb-query .gb-stylish .gb-query__reset,[riot-tag="gb-query"] .gb-stylish .gb-query__reset,[data-is="gb-query"] .gb-stylish .gb-query__reset{ color: #888; padding: 4px; } gb-query .gb-stylish .gb-query__reset:hover,[riot-tag="gb-query"] .gb-stylish .gb-query__reset:hover,[data-is="gb-query"] .gb-stylish .gb-query__reset:hover{ color: black; cursor: pointer; }', '', function (opts) {
	    var _this = this;

	    __webpack_require__(48);
	    this.on('mount', function () {
	        return riot.mount('.gb-query__box', 'gb-raw-query', opts);
	    });
	    this.clearQuery = function () {
	        return opts.flux.reset(_this.searchBox.value = '');
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-raw-query', '', '.gb-query-wrapper { position: relative; display: inline-block; } .gb-sayt-target { z-index: 10; position: absolute; min-width: 175px; background-color: #fff; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); }', '', function (opts) {
	  var _this = this;

	  __webpack_require__(49);
	  var ENTER_KEY = 13;
	  var queryWrapper = __webpack_require__(62);
	  var autoSearch = opts.autoSearch === undefined ? true : opts.autoSearch;
	  var saytEnabled = opts.sayt === undefined ? true : opts.sayt;
	  var queryParam = opts.queryParam === undefined ? 'q' : opts.queryParam;
	  var searchUrl = (opts.searchUrl === undefined ? 'search' : opts.searchUrl) + '?' + queryParam + '=';

	  var inputValue = function inputValue() {
	    return _this.root.value;
	  };
	  if (saytEnabled) queryWrapper.mount(this, opts);
	  if (autoSearch) {
	    this.on('before-mount', function () {
	      return _this.root.addEventListener('input', function () {
	        return opts.flux.reset(inputValue());
	      });
	    });
	  } else {
	    this.on('before-mount', function () {
	      return _this.root.addEventListener('keydown', function (event) {
	        switch (event.keyCode) {
	          case ENTER_KEY:
	            return window.location.replace('' + searchUrl + inputValue());
	        }
	      });
	    });
	  }
	  opts.flux.on(opts.flux.REWRITE_QUERY, function (query) {
	    return _this.root.value = query;
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-sayt', '<div class="gb-sayt {opts.style()}" name="saytNode" if="{queries}"> <ul class="gb-sayt__autocomplete" name="autocompleteList"> <li class="gb-autocomplete__item" each="{query in categoryResults}" data-value="{query.value}" data-refinement="{query.category}" data-field="{categoryField}"> <a class="gb-autocomplete__link" href="#" onclick="{searchCategory}"> <raw content="{enhanceCategoryQuery(query)}"></raw> </a> </li> <div if="{queries && categoryResults.length}" class="gb-autocomplete__divider"></div> <li class="gb-autocomplete__item" each="{queries}" data-value="{value}"> <a class="gb-autocomplete__link" href="#" onclick="{search}"> <raw content="{enhanceQuery(value)}"></raw> </a> </li> <div if="{queries && navigations}" class="gb-autocomplete__divider"></div> <virtual each="{navigations}"> <h4 class="gb-navigation__title">{displayName}</h4> <li class="gb-autocomplete__item" each="{value in values}" data-value="{displayName}: {value}" data-refinement="{value}" data-field="{name}"> <a class="gb-autocomplete__link" href="#" onclick="{searchRefinement}"> <raw content="{enhanceQuery(value)}"></raw> </a> </li> </virtual> </ul> <ul if="{products}" class="gb-sayt__products"> <li each="{products}"> <gb-product></gb-product> </li> </ul> </div>', 'gb-sayt .gb-stylish.gb-sayt,[riot-tag="gb-sayt"] .gb-stylish.gb-sayt,[data-is="gb-sayt"] .gb-stylish.gb-sayt{ display: flex; } gb-sayt .gb-stylish ul,[riot-tag="gb-sayt"] .gb-stylish ul,[data-is="gb-sayt"] .gb-stylish ul{ list-style: none; margin: 0; padding: 0; } gb-sayt .gb-stylish .gb-category-query,[riot-tag="gb-sayt"] .gb-stylish .gb-category-query,[data-is="gb-sayt"] .gb-stylish .gb-category-query{ font-weight: bold; color: darkorange; } gb-sayt .gb-stylish .gb-autocomplete__divider,[riot-tag="gb-sayt"] .gb-stylish .gb-autocomplete__divider,[data-is="gb-sayt"] .gb-stylish .gb-autocomplete__divider{ margin: 3px 10%; border-top: 1px solid #777; } gb-sayt .gb-stylish .gb-sayt__autocomplete,[riot-tag="gb-sayt"] .gb-stylish .gb-sayt__autocomplete,[data-is="gb-sayt"] .gb-stylish .gb-sayt__autocomplete{ min-width: 210px; } gb-sayt .gb-stylish .gb-autocomplete__link,[riot-tag="gb-sayt"] .gb-stylish .gb-autocomplete__link,[data-is="gb-sayt"] .gb-stylish .gb-autocomplete__link{ padding: 5px 15px; text-decoration: none; display: block; } gb-sayt .gb-stylish .gb-autocomplete__item:hover,[riot-tag="gb-sayt"] .gb-stylish .gb-autocomplete__item:hover,[data-is="gb-sayt"] .gb-stylish .gb-autocomplete__item:hover,gb-sayt .gb-stylish .gb-autocomplete__item.active,[riot-tag="gb-sayt"] .gb-stylish .gb-autocomplete__item.active,[data-is="gb-sayt"] .gb-stylish .gb-autocomplete__item.active{ background-color: #f1f1f1; } gb-sayt .gb-stylish .gb-navigation__title,[riot-tag="gb-sayt"] .gb-stylish .gb-navigation__title,[data-is="gb-sayt"] .gb-stylish .gb-navigation__title{ margin: 4px; } gb-sayt .gb-stylish .gb-sayt__products,[riot-tag="gb-sayt"] .gb-stylish .gb-sayt__products,[data-is="gb-sayt"] .gb-stylish .gb-sayt__products{ min-width: 300px; display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center; } gb-sayt .gb-stylish .gb-sayt__products .gb-product__image,[riot-tag="gb-sayt"] .gb-stylish .gb-sayt__products .gb-product__image,[data-is="gb-sayt"] .gb-stylish .gb-sayt__products .gb-product__image{ vertical-align: bottom; width: 80px; } gb-sayt .gb-stylish .gb-sayt__products .gb-product__info-link,[riot-tag="gb-sayt"] .gb-stylish .gb-sayt__products .gb-product__info-link,[data-is="gb-sayt"] .gb-stylish .gb-sayt__products .gb-product__info-link{ display: none; } gb-sayt .gb-stylish .gb-sayt__products .gb-product:hover,[riot-tag="gb-sayt"] .gb-stylish .gb-sayt__products .gb-product:hover,[data-is="gb-sayt"] .gb-stylish .gb-sayt__products .gb-product:hover{ box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); }', '', function (opts) {
	  var _this = this;

	  __webpack_require__(50);
	  __webpack_require__(51);
	  var sayt = __webpack_require__(52);
	  var autocomplete = __webpack_require__(61);
	  var defaultConfig = {
	    products: 4,
	    queries: 5,
	    autoSearch: true,
	    highlight: true,
	    navigationNames: {},
	    allowedNavigations: []
	  };
	  var saytConfig = Object.assign(defaultConfig, opts.config.sayt);
	  this.categoryField = saytConfig.categoryField;
	  this.struct = Object.assign({}, opts.config.structure, { image: 'image_url' });

	  sayt.configure({
	    subdomain: opts.config.customerId,
	    collection: opts.config.collection,
	    autocomplete: { numSearchTerms: saytConfig.queries },
	    productSearch: { area: opts.config.area, numProducts: saytConfig.products }
	  });

	  this.search = function (event) {
	    var node = event.target;
	    while (node.tagName !== 'LI') {
	      node = node.parentNode;
	    }opts.flux.rewrite(node.getAttribute('data-value'));
	  };
	  var refine = function refine(node, query) {
	    while (node.tagName !== 'LI') {
	      node = node.parentNode;
	    }opts.flux.refine({ navigationName: node.getAttribute('data-field'), type: 'Value', value: node.getAttribute('data-refinement') }).then(function () {
	      return opts.flux.rewrite(query);
	    });
	  };
	  this.searchRefinement = function (event) {
	    return refine(event.target, '');
	  };
	  this.searchCategory = function (event) {
	    return refine(event.target, _this.originalQuery);
	  };
	  this.enhanceQuery = function (query) {
	    return saytConfig.highlight ? query.replace(_this.originalQuery, '<b>$&</b>') : query;
	  };
	  this.enhanceCategoryQuery = function (query) {
	    if (saytConfig.categoryField) {
	      return '<b>' + query.value + '</b> in <span class="gb-category-query">' + query.category + '</span>';
	    } else {
	      return query.value;
	    }
	  };

	  var searchProducts = function searchProducts(query) {
	    if (saytConfig.products) {
	      sayt.productSearch(query).then(function (res) {
	        return _this.update({ products: res.result.products });
	      });
	    }
	  };
	  var notifier = function notifier(query) {
	    if (saytConfig.autoSearch) searchProducts(query);
	    opts.flux.emit(opts.flux.REWRITE_QUERY, query);
	  };
	  this.on('before-mount', function () {
	    return autocomplete.init(_this.root, _this.autocompleteList, notifier);
	  });

	  var processResults = function processResults(result) {
	    var categories = [];
	    if (result.searchTerms && result.searchTerms[0].value === _this.originalQuery) {
	      (function () {
	        var categoryQuery = result.searchTerms[0];
	        result.searchTerms.splice(0, 1);

	        if (_this.categoryField && categoryQuery.additionalInfo[_this.categoryField]) {
	          categories = categoryQuery.additionalInfo[_this.categoryField].map(function (value) {
	            return { category: value, value: categoryQuery.value };
	          }).slice(0, 3);
	          categories.unshift({ category: 'All Departments', value: categoryQuery.value });
	        }
	      })();
	    }
	    var navigations = result.navigations ? result.navigations.map(function (nav) {
	      return Object.assign(nav, { displayName: saytConfig.navigationNames[nav.name] ? saytConfig.navigationNames[nav.name] : nav.name });
	    }).filter(function (nav) {
	      return saytConfig.allowedNavigations.includes(nav.name);
	    }) : [];
	    _this.update({ results: result, navigations: navigations, queries: result.searchTerms, categoryResults: categories });
	  };
	  opts.flux.on('autocomplete', function (query) {
	    return sayt.autocomplete(query).then(function (res) {
	      _this.update({ originalQuery: query });
	      processResults(res.result);
	      if (_this.queries) searchProducts(_this.queries[0].value);
	    }).catch(function (err) {
	      return console.error(err);
	    });
	  });
	  opts.flux.on('autocomplete:hide', function () {
	    autocomplete.reset();
	    _this.update({ queries: null });
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-product', '<div class="gb-product"> <a class="gb-product__image-link" href="#"> <img class="gb-product__image" riot-src="{isImageArray() ? allMeta[struct.image][0] : allMeta[struct.image]}" alt=""> </a> <a class="gb-product__info-link" href="#"> <p>{allMeta[struct.title]}</p> <p>{allMeta[struct.price]}</p> </a> </div>', '', '', function (opts) {
	    var _this = this;

	    this.struct = this.parent.struct;
	    this.isImageArray = function () {
	        return Array.isArray(_this.allMeta[_this.struct.image]);
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag('raw', '<span></span>', function (opts) {
	    this.updateContent = function () {
	        this.root.innerHTML = opts.content;
	    };

	    this.on('update', function () {
	        this.updateContent();
	    });

	    this.updateContent();
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(53);


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/index.d.ts" />
	/// <reference path="../custom-typings/index.d.ts" />
	"use strict";
	__webpack_require__(4).polyfill();
	__webpack_require__(54).pollyfill();
	var sayt_1 = __webpack_require__(55);
	var sayt = new sayt_1.Sayt();
	if (window !== undefined) {
	    window['sayt'] = sayt;
	}
	module.exports = sayt;

	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhDQUE4QztBQUM5QyxxREFBcUQ7O0FBRXJELE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNsQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7QUFFbkMscUJBQXNCLGFBQWEsQ0FBQyxDQUFBO0FBRXBDLElBQU0sSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7QUFHeEIsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDekIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQztBQUN4QixDQUFDO0FBSkQsaUJBQVMsSUFBSSxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvaW5kZXguZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY3VzdG9tLXR5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5cbnJlcXVpcmUoJ2VzNi1wcm9taXNlJykucG9seWZpbGwoKTtcbnJlcXVpcmUoJy4vcG9seWZpbGxzJykucG9sbHlmaWxsKCk7XG5cbmltcG9ydCB7IFNheXQgfSAgZnJvbSAnLi9jb3JlL3NheXQnO1xuXG5jb25zdCBzYXl0ID0gbmV3IFNheXQoKTtcbmV4cG9ydCA9IHNheXQ7XG5cbmlmICh3aW5kb3cgIT09IHVuZGVmaW5lZCkge1xuICB3aW5kb3dbJ3NheXQnXSA9IHNheXQ7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=


/***/ },
/* 54 */
/***/ function(module, exports) {

	"use strict";
	function pollyfill() {
	    if (typeof Object.assign != 'function') {
	        Object.assign = function (target) {
	            'use strict';
	            if (target == null) {
	                throw new TypeError('Cannot convert undefined or null to object');
	            }
	            target = Object(target);
	            for (var index = 1; index < arguments.length; index++) {
	                var source = arguments[index];
	                if (source != null) {
	                    for (var key in source) {
	                        if (Object.prototype.hasOwnProperty.call(source, key)) {
	                            target[key] = source[key];
	                        }
	                    }
	                }
	            }
	            return target;
	        };
	    }
	}
	exports.pollyfill = pollyfill;

	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvbHlmaWxscy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7SUFDRSxFQUFFLENBQUMsQ0FBQyxPQUFPLE1BQU0sQ0FBQyxNQUFNLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQztRQUN2QyxNQUFNLENBQUMsTUFBTSxHQUFHLFVBQVMsTUFBTTtZQUM3QixZQUFZLENBQUM7WUFDYixFQUFFLENBQUMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkIsTUFBTSxJQUFJLFNBQVMsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1lBQ3BFLENBQUM7WUFFRCxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3hCLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLENBQUMsRUFBRSxLQUFLLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO2dCQUN0RCxJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzlCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUNuQixHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUN2QixFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDdEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDNUIsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBQ0QsTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNoQixDQUFDLENBQUM7SUFDSixDQUFDO0FBQ0gsQ0FBQztBQXRCZSxpQkFBUyxZQXNCeEIsQ0FBQSIsImZpbGUiOiJwb2x5ZmlsbHMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gcG9sbHlmaWxsKCkge1xuICBpZiAodHlwZW9mIE9iamVjdC5hc3NpZ24gIT0gJ2Z1bmN0aW9uJykge1xuICAgIE9iamVjdC5hc3NpZ24gPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICAgICd1c2Ugc3RyaWN0JztcbiAgICAgIGlmICh0YXJnZXQgPT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcbiAgICAgIH1cblxuICAgICAgdGFyZ2V0ID0gT2JqZWN0KHRhcmdldCk7XG4gICAgICBmb3IgKHZhciBpbmRleCA9IDE7IGluZGV4IDwgYXJndW1lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2luZGV4XTtcbiAgICAgICAgaWYgKHNvdXJjZSAhPSBudWxsKSB7XG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(56);
	var SAYT_URL = '.groupbycloud.com/api/v1/sayt/search';
	var Sayt = (function () {
	    function Sayt() {
	        this.config = {
	            autocomplete: {
	                numSearchTerms: 5,
	                numNavigations: 5
	            },
	            productSearch: {
	                numProducts: 4
	            }
	        };
	    }
	    Sayt.prototype.configure = function (config) {
	        if (config === void 0) { config = this.config; }
	        var finalConfig = Object.assign({}, this.config, config);
	        finalConfig.autocomplete = Object.assign({}, this.config.autocomplete, config.autocomplete ? config.autocomplete : {});
	        finalConfig.productSearch = Object.assign({}, this.config.productSearch, config.productSearch ? config.productSearch : {});
	        this.config = finalConfig;
	    };
	    Sayt.prototype.autocomplete = function (query, config, cb) {
	        if (query === void 0) { query = ''; }
	        var finalConfig = Object.assign({ collection: this.config.collection }, this.config.autocomplete, config);
	        var response = index_1.jsonp(this.url, {
	            query: query,
	            collection: finalConfig.collection,
	            searchItems: finalConfig.numSearchTerms,
	            navigationItems: finalConfig.numNavigations,
	            alphabetize: finalConfig.sortAlphabetically,
	            fuzzy: finalConfig.fuzzyMatch,
	            productItems: 0
	        });
	        // const response = jsonp(`${this.url}?${qs.stringify({
	        //   query,
	        //   collection: finalConfig.collection,
	        //   searchItems: finalConfig.numSearchTerms,
	        //   navigationItems: finalConfig.numNavigations,
	        //   alphabetize: finalConfig.sortAlphabetically,
	        //   fuzzy: finalConfig.fuzzyMatch,
	        //
	        //   productItems: 0
	        // })}`, (err, data) => {
	        //
	        // });
	        // const response = axios({
	        //   url: this.url,
	        //   method: 'get',
	        //   data: {
	        //     query,
	        //     collection: finalConfig.collection,
	        //     searchItems: finalConfig.numSearchTerms,
	        //     navigationItems: finalConfig.numNavigations,
	        //     alphabetize: finalConfig.sortAlphabetically,
	        //     fuzzy: finalConfig.fuzzyMatch,
	        //
	        //     productItems: 0
	        //   }
	        // }).then(res => res.data);
	        return this.callbackOrPromise(response, cb);
	    };
	    Sayt.prototype.productSearch = function (query, config, cb) {
	        if (query === void 0) { query = ''; }
	        var finalConfig = Object.assign({ collection: this.config.collection }, this.config.productSearch, config);
	        var response = index_1.jsonp(this.url, {
	            query: query,
	            collection: finalConfig.collection,
	            area: finalConfig.area,
	            refinements: finalConfig.refinements,
	            productItems: finalConfig.numProducts,
	            searchItems: 0,
	            navigationItems: 0
	        });
	        // const response = axios({
	        //   url: this.url,
	        //   method: 'get',
	        //   data: {
	        //     query,
	        //     collection: finalConfig.collection,
	        //     area: finalConfig.area,
	        //     refinements: finalConfig.refinements,
	        //     productItems: finalConfig.numProducts,
	        //
	        //     searchItems: 0,
	        //     navigationItems: 0
	        //   }
	        // }).then(res => res.data);
	        return this.callbackOrPromise(response, cb);
	    };
	    Sayt.prototype.callbackOrPromise = function (promise, cb) {
	        var response = promise;
	        if (typeof cb == 'function') {
	            response = promise.then(function (res) { return cb(undefined, res); })
	                .catch(function (err) { return cb(err); });
	        }
	        return response;
	    };
	    Object.defineProperty(Sayt.prototype, "url", {
	        get: function () {
	            return (this.config.https ? 'https' : 'http') + "://" + this.config.subdomain + SAYT_URL;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Sayt;
	}());
	exports.Sayt = Sayt;

	//# sourceMappingURL=data:application/json;base64,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LENBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsT0FBTyxHQUFHLE1BQU0sWUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxRQUFVLENBQUM7UUFDekYsQ0FBQzs7O09BQUE7SUFDSCxXQUFDO0FBQUQsQ0F2R0EsQUF1R0MsSUFBQTtBQXZHWSxZQUFJLE9BdUdoQixDQUFBIiwiZmlsZSI6ImNvcmUvc2F5dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGpzb25wIH0gZnJvbSAnLi4vdXRpbHMvaW5kZXgnO1xuXG5jb25zdCBTQVlUX1VSTCA9ICcuZ3JvdXBieWNsb3VkLmNvbS9hcGkvdjEvc2F5dC9zZWFyY2gnO1xuXG5leHBvcnQgY2xhc3MgU2F5dCB7XG5cbiAgcHJpdmF0ZSBjb25maWc6IElTYXl0Q29uZmlnID0ge1xuICAgIGF1dG9jb21wbGV0ZToge1xuICAgICAgbnVtU2VhcmNoVGVybXM6IDUsXG4gICAgICBudW1OYXZpZ2F0aW9uczogNVxuICAgIH0sXG4gICAgcHJvZHVjdFNlYXJjaDoge1xuICAgICAgbnVtUHJvZHVjdHM6IDRcbiAgICB9XG4gIH07XG5cbiAgY29uZmlndXJlKGNvbmZpZzogSVNheXRDb25maWcgPSB0aGlzLmNvbmZpZykge1xuICAgIGNvbnN0IGZpbmFsQ29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb25maWcsIGNvbmZpZyk7XG4gICAgZmluYWxDb25maWcuYXV0b2NvbXBsZXRlID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb25maWcuYXV0b2NvbXBsZXRlLCBjb25maWcuYXV0b2NvbXBsZXRlID8gY29uZmlnLmF1dG9jb21wbGV0ZSA6IHt9KTtcbiAgICBmaW5hbENvbmZpZy5wcm9kdWN0U2VhcmNoID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5jb25maWcucHJvZHVjdFNlYXJjaCwgY29uZmlnLnByb2R1Y3RTZWFyY2ggPyBjb25maWcucHJvZHVjdFNlYXJjaCA6IHt9KTtcbiAgICB0aGlzLmNvbmZpZyA9IGZpbmFsQ29uZmlnO1xuICB9XG5cbiAgYXV0b2NvbXBsZXRlKHF1ZXJ5OiBzdHJpbmcgPSAnJywgY29uZmlnPzogSVF1ZXJ5VGltZUF1dG9jb21wbGV0ZUNvbmZpZywgY2I/OiBTZWFyY2hDYWxsYmFjayk6IEF4aW9zLklQcm9taXNlPEF4aW9zLkF4aW9zWEhSPGFueT4+IHtcbiAgICBjb25zdCBmaW5hbENvbmZpZyA9IE9iamVjdC5hc3NpZ24oeyBjb2xsZWN0aW9uOiB0aGlzLmNvbmZpZy5jb2xsZWN0aW9uIH0sIHRoaXMuY29uZmlnLmF1dG9jb21wbGV0ZSwgY29uZmlnKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGpzb25wKHRoaXMudXJsLCB7XG4gICAgICBxdWVyeSxcbiAgICAgIGNvbGxlY3Rpb246IGZpbmFsQ29uZmlnLmNvbGxlY3Rpb24sXG4gICAgICBzZWFyY2hJdGVtczogZmluYWxDb25maWcubnVtU2VhcmNoVGVybXMsXG4gICAgICBuYXZpZ2F0aW9uSXRlbXM6IGZpbmFsQ29uZmlnLm51bU5hdmlnYXRpb25zLFxuICAgICAgYWxwaGFiZXRpemU6IGZpbmFsQ29uZmlnLnNvcnRBbHBoYWJldGljYWxseSxcbiAgICAgIGZ1enp5OiBmaW5hbENvbmZpZy5mdXp6eU1hdGNoLFxuXG4gICAgICBwcm9kdWN0SXRlbXM6IDBcbiAgICB9KTtcbiAgICAvLyBjb25zdCByZXNwb25zZSA9IGpzb25wKGAke3RoaXMudXJsfT8ke3FzLnN0cmluZ2lmeSh7XG4gICAgLy8gICBxdWVyeSxcbiAgICAvLyAgIGNvbGxlY3Rpb246IGZpbmFsQ29uZmlnLmNvbGxlY3Rpb24sXG4gICAgLy8gICBzZWFyY2hJdGVtczogZmluYWxDb25maWcubnVtU2VhcmNoVGVybXMsXG4gICAgLy8gICBuYXZpZ2F0aW9uSXRlbXM6IGZpbmFsQ29uZmlnLm51bU5hdmlnYXRpb25zLFxuICAgIC8vICAgYWxwaGFiZXRpemU6IGZpbmFsQ29uZmlnLnNvcnRBbHBoYWJldGljYWxseSxcbiAgICAvLyAgIGZ1enp5OiBmaW5hbENvbmZpZy5mdXp6eU1hdGNoLFxuICAgIC8vXG4gICAgLy8gICBwcm9kdWN0SXRlbXM6IDBcbiAgICAvLyB9KX1gLCAoZXJyLCBkYXRhKSA9PiB7XG4gICAgLy9cbiAgICAvLyB9KTtcbiAgICAvLyBjb25zdCByZXNwb25zZSA9IGF4aW9zKHtcbiAgICAvLyAgIHVybDogdGhpcy51cmwsXG4gICAgLy8gICBtZXRob2Q6ICdnZXQnLFxuICAgIC8vICAgZGF0YToge1xuICAgIC8vICAgICBxdWVyeSxcbiAgICAvLyAgICAgY29sbGVjdGlvbjogZmluYWxDb25maWcuY29sbGVjdGlvbixcbiAgICAvLyAgICAgc2VhcmNoSXRlbXM6IGZpbmFsQ29uZmlnLm51bVNlYXJjaFRlcm1zLFxuICAgIC8vICAgICBuYXZpZ2F0aW9uSXRlbXM6IGZpbmFsQ29uZmlnLm51bU5hdmlnYXRpb25zLFxuICAgIC8vICAgICBhbHBoYWJldGl6ZTogZmluYWxDb25maWcuc29ydEFscGhhYmV0aWNhbGx5LFxuICAgIC8vICAgICBmdXp6eTogZmluYWxDb25maWcuZnV6enlNYXRjaCxcbiAgICAvL1xuICAgIC8vICAgICBwcm9kdWN0SXRlbXM6IDBcbiAgICAvLyAgIH1cbiAgICAvLyB9KS50aGVuKHJlcyA9PiByZXMuZGF0YSk7XG5cbiAgICByZXR1cm4gdGhpcy5jYWxsYmFja09yUHJvbWlzZShyZXNwb25zZSwgY2IpO1xuICB9XG5cbiAgcHJvZHVjdFNlYXJjaChxdWVyeTogc3RyaW5nID0gJycsIGNvbmZpZz86IElRdWVyeVRpbWVQcm9kdWN0U2VhcmNoQ29uZmlnLCBjYj86IFNlYXJjaENhbGxiYWNrKSB7XG4gICAgY29uc3QgZmluYWxDb25maWcgPSBPYmplY3QuYXNzaWduKHsgY29sbGVjdGlvbjogdGhpcy5jb25maWcuY29sbGVjdGlvbiB9LCB0aGlzLmNvbmZpZy5wcm9kdWN0U2VhcmNoLCBjb25maWcpO1xuICAgIGNvbnN0IHJlc3BvbnNlID0ganNvbnAodGhpcy51cmwsIHtcbiAgICAgIHF1ZXJ5LFxuICAgICAgY29sbGVjdGlvbjogZmluYWxDb25maWcuY29sbGVjdGlvbixcbiAgICAgIGFyZWE6IGZpbmFsQ29uZmlnLmFyZWEsXG4gICAgICByZWZpbmVtZW50czogZmluYWxDb25maWcucmVmaW5lbWVudHMsXG4gICAgICBwcm9kdWN0SXRlbXM6IGZpbmFsQ29uZmlnLm51bVByb2R1Y3RzLFxuXG4gICAgICBzZWFyY2hJdGVtczogMCxcbiAgICAgIG5hdmlnYXRpb25JdGVtczogMFxuICAgIH0pO1xuICAgIC8vIGNvbnN0IHJlc3BvbnNlID0gYXhpb3Moe1xuICAgIC8vICAgdXJsOiB0aGlzLnVybCxcbiAgICAvLyAgIG1ldGhvZDogJ2dldCcsXG4gICAgLy8gICBkYXRhOiB7XG4gICAgLy8gICAgIHF1ZXJ5LFxuICAgIC8vICAgICBjb2xsZWN0aW9uOiBmaW5hbENvbmZpZy5jb2xsZWN0aW9uLFxuICAgIC8vICAgICBhcmVhOiBmaW5hbENvbmZpZy5hcmVhLFxuICAgIC8vICAgICByZWZpbmVtZW50czogZmluYWxDb25maWcucmVmaW5lbWVudHMsXG4gICAgLy8gICAgIHByb2R1Y3RJdGVtczogZmluYWxDb25maWcubnVtUHJvZHVjdHMsXG4gICAgLy9cbiAgICAvLyAgICAgc2VhcmNoSXRlbXM6IDAsXG4gICAgLy8gICAgIG5hdmlnYXRpb25JdGVtczogMFxuICAgIC8vICAgfVxuICAgIC8vIH0pLnRoZW4ocmVzID0+IHJlcy5kYXRhKTtcblxuICAgIHJldHVybiB0aGlzLmNhbGxiYWNrT3JQcm9taXNlKHJlc3BvbnNlLCBjYik7XG4gIH1cblxuICBwcml2YXRlIGNhbGxiYWNrT3JQcm9taXNlKHByb21pc2U6IEF4aW9zLklQcm9taXNlPGFueT4sIGNiOiBGdW5jdGlvbikge1xuICAgIGxldCByZXNwb25zZSA9IHByb21pc2U7XG4gICAgaWYgKHR5cGVvZiBjYiA9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXNwb25zZSA9IHByb21pc2UudGhlbihyZXMgPT4gY2IodW5kZWZpbmVkLCByZXMpKVxuICAgICAgICAuY2F0Y2goZXJyID0+IGNiKGVycikpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzcG9uc2U7XG4gIH1cblxuICBwcml2YXRlIGdldCB1cmwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYCR7dGhpcy5jb25maWcuaHR0cHMgPyAnaHR0cHMnIDogJ2h0dHAnfTovLyR7dGhpcy5jb25maWcuc3ViZG9tYWlufSR7U0FZVF9VUkx9YDtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIElTYXl0Q29uZmlnIHtcbiAgc3ViZG9tYWluPzogc3RyaW5nO1xuICBjb2xsZWN0aW9uPzogc3RyaW5nO1xuICBodHRwcz86IGJvb2xlYW47XG5cbiAgYXV0b2NvbXBsZXRlPzogSUF1dG9jb21wbGV0ZUNvbmZpZztcbiAgcHJvZHVjdFNlYXJjaD86IElQcm9kdWN0U2VhcmNoQ29uZmlnO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElBdXRvY29tcGxldGVDb25maWcge1xuICBudW1TZWFyY2hUZXJtcz86IG51bWJlcjtcbiAgbnVtTmF2aWdhdGlvbnM/OiBudW1iZXI7XG4gIHNvcnRBbHBoYWJldGljYWxseT86IGJvb2xlYW47XG4gIGZ1enp5TWF0Y2g/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIElQcm9kdWN0U2VhcmNoQ29uZmlnIHtcbiAgYXJlYT86IHN0cmluZztcbiAgbnVtUHJvZHVjdHM/OiBudW1iZXI7XG4gIHByb2R1Y3RTb3J0PzogYW55O1xufVxuXG5leHBvcnQgdHlwZSBJUXVlcnlUaW1lQXV0b2NvbXBsZXRlQ29uZmlnID0gSUF1dG9jb21wbGV0ZUNvbmZpZyAmIHsgY29sbGVjdGlvbj86IHN0cmluZyB9O1xuZXhwb3J0IHR5cGUgSVF1ZXJ5VGltZVByb2R1Y3RTZWFyY2hDb25maWcgPSBJUHJvZHVjdFNlYXJjaENvbmZpZyAmIHsgY29sbGVjdGlvbj86IHN0cmluZywgcmVmaW5lbWVudHM/OiBzdHJpbmcgfTtcbmV4cG9ydCB0eXBlIFNlYXJjaENhbGxiYWNrID0gKGVycjogRXJyb3IsIHJlcz86IEF4aW9zLkF4aW9zWEhSPGFueT4pID0+IHZvaWQ7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=


/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var qs = __webpack_require__(11);
	var rawJsonp = __webpack_require__(57);
	function jsonp(url, body) {
	    return new Promise(function (resolve, reject) {
	        rawJsonp(url + "?" + qs.stringify(body), function (err, data) { return err ? reject(err) : resolve(data); });
	    });
	}
	exports.jsonp = jsonp;

	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFPLEVBQUUsV0FBVyxJQUFJLENBQUMsQ0FBQztBQUMxQixJQUFPLFFBQVEsV0FBVyxPQUFPLENBQUMsQ0FBQztBQUVuQyxlQUFzQixHQUFXLEVBQUUsSUFBUztJQUMxQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtRQUNqQyxRQUFRLENBQUksR0FBRyxTQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFHLEVBQUUsVUFBQyxHQUFHLEVBQUUsSUFBSSxJQUFLLE9BQUEsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztJQUM3RixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFKZSxhQUFLLFFBSXBCLENBQUEiLCJmaWxlIjoidXRpbHMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcXMgPSByZXF1aXJlKCdxcycpO1xuaW1wb3J0IHJhd0pzb25wID0gcmVxdWlyZSgnanNvbnAnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGpzb25wKHVybDogc3RyaW5nLCBib2R5OiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHJhd0pzb25wKGAke3VybH0/JHtxcy5zdHJpbmdpZnkoYm9keSl9YCwgKGVyciwgZGF0YSkgPT4gZXJyID8gcmVqZWN0KGVycikgOiByZXNvbHZlKGRhdGEpKTtcbiAgfSk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=


/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies
	 */

	var debug = __webpack_require__(58)('jsonp');

	/**
	 * Module exports.
	 */

	module.exports = jsonp;

	/**
	 * Callback index.
	 */

	var count = 0;

	/**
	 * Noop function.
	 */

	function noop(){}

	/**
	 * JSONP handler
	 *
	 * Options:
	 *  - param {String} qs parameter (`callback`)
	 *  - prefix {String} qs parameter (`__jp`)
	 *  - name {String} qs parameter (`prefix` + incr)
	 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
	 *
	 * @param {String} url
	 * @param {Object|Function} optional options / callback
	 * @param {Function} optional callback
	 */

	function jsonp(url, opts, fn){
	  if ('function' == typeof opts) {
	    fn = opts;
	    opts = {};
	  }
	  if (!opts) opts = {};

	  var prefix = opts.prefix || '__jp';

	  // use the callback name that was passed if one was provided.
	  // otherwise generate a unique name by incrementing our counter.
	  var id = opts.name || (prefix + (count++));

	  var param = opts.param || 'callback';
	  var timeout = null != opts.timeout ? opts.timeout : 60000;
	  var enc = encodeURIComponent;
	  var target = document.getElementsByTagName('script')[0] || document.head;
	  var script;
	  var timer;


	  if (timeout) {
	    timer = setTimeout(function(){
	      cleanup();
	      if (fn) fn(new Error('Timeout'));
	    }, timeout);
	  }

	  function cleanup(){
	    if (script.parentNode) script.parentNode.removeChild(script);
	    window[id] = noop;
	    if (timer) clearTimeout(timer);
	  }

	  function cancel(){
	    if (window[id]) {
	      cleanup();
	    }
	  }

	  window[id] = function(data){
	    debug('jsonp got', data);
	    cleanup();
	    if (fn) fn(null, data);
	  };

	  // add qs component
	  url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
	  url = url.replace('?&', '?');

	  debug('jsonp req "%s"', url);

	  // create script
	  script = document.createElement('script');
	  script.src = url;
	  target.parentNode.insertBefore(script, target);

	  return cancel;
	}


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(59);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;

	/**
	 * Use chrome.storage.local if we are in an app
	 */

	var storage;

	if (typeof chrome !== 'undefined' && typeof chrome.storage !== 'undefined')
	  storage = chrome.storage.local;
	else
	  storage = localstorage();

	/**
	 * Colors.
	 */

	exports.colors = [
	  'lightseagreen',
	  'forestgreen',
	  'goldenrod',
	  'dodgerblue',
	  'darkorchid',
	  'crimson'
	];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  return ('WebkitAppearance' in document.documentElement.style) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (window.console && (console.firebug || (console.exception && console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31);
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  return JSON.stringify(v);
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs() {
	  var args = arguments;
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return args;

	  var c = 'color: ' + this.color;
	  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	  return args;
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      storage.removeItem('debug');
	    } else {
	      storage.debug = namespaces;
	    }
	  } catch(e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    r = storage.debug;
	  } catch(e) {}
	  return r;
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage(){
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(60);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lowercased letter, i.e. "n".
	 */

	exports.formatters = {};

	/**
	 * Previously assigned color.
	 */

	var prevColor = 0;

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 *
	 * @return {Number}
	 * @api private
	 */

	function selectColor() {
	  return exports.colors[prevColor++ % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function debug(namespace) {

	  // define the `disabled` version
	  function disabled() {
	  }
	  disabled.enabled = false;

	  // define the `enabled` version
	  function enabled() {

	    var self = enabled;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // add the `color` if not set
	    if (null == self.useColors) self.useColors = exports.useColors();
	    if (null == self.color && self.useColors) self.color = selectColor();

	    var args = Array.prototype.slice.call(arguments);

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %o
	      args = ['%o'].concat(args);
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    if ('function' === typeof exports.formatArgs) {
	      args = exports.formatArgs.apply(self, args);
	    }
	    var logFn = enabled.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }
	  enabled.enabled = true;

	  var fn = exports.enabled(namespace) ? enabled : disabled;

	  fn.namespace = namespace;

	  return fn;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  var split = (namespaces || '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}


/***/ },
/* 60 */
/***/ function(module, exports) {

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} options
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function(val, options){
	  options = options || {};
	  if ('string' == typeof val) return parse(val);
	  return options.long
	    ? long(val)
	    : short(val);
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) return;
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function short(ms) {
	  if (ms >= d) return Math.round(ms / d) + 'd';
	  if (ms >= h) return Math.round(ms / h) + 'h';
	  if (ms >= m) return Math.round(ms / m) + 'm';
	  if (ms >= s) return Math.round(ms / s) + 's';
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function long(ms) {
	  return plural(ms, d, 'day')
	    || plural(ms, h, 'hour')
	    || plural(ms, m, 'minute')
	    || plural(ms, s, 'second')
	    || ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) return;
	  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}


/***/ },
/* 61 */
/***/ function(module, exports) {

	"use strict";
	var KEY_UP = 38;
	var KEY_DOWN = 40;
	var KEY_ENTER = 13;
	var KEY_BACKSPACE = 8;
	var KEY_DEL = 46;
	var DATA_VALUE = 'data-value';
	var ACTIVE = 'active';
	var ITEM_TAG = 'LI';
	var selectedNode, originalValue, searchInput, queryUpdateNotifier;
	function init(root, autocompleteList, notifier) {
	    selectedNode = searchInput = root.parentNode.firstChild;
	    queryUpdateNotifier = notifier;
	    searchInput.onkeydown = keyListener(autocompleteList);
	}
	exports.init = init;
	function reset() {
	    selectedNode = searchInput;
	}
	exports.reset = reset;
	function swap(selected, next) {
	    if (next) {
	        selected.classList.remove(ACTIVE);
	        next.classList.add(ACTIVE);
	        if (next.firstElementChild)
	            queryUpdateNotifier(next.getAttribute(DATA_VALUE));
	        return next;
	    }
	    return selected;
	}
	function keyListener(autocompleteList) {
	    return function (event) {
	        var firstLink = autocompleteList.firstElementChild;
	        switch (event.keyCode) {
	            case KEY_UP:
	                event.preventDefault();
	                if (selectedNode === firstLink) {
	                    searchInput.value = originalValue;
	                    selectedNode = swap(selectedNode, searchInput);
	                }
	                else {
	                    var nextNode = selectedNode.previousElementSibling;
	                    if (nextNode && nextNode.tagName) {
	                        while (nextNode.tagName !== ITEM_TAG) {
	                            nextNode = nextNode.previousElementSibling;
	                        }
	                    }
	                    selectedNode = swap(selectedNode, nextNode);
	                }
	                break;
	            case KEY_DOWN:
	                if (selectedNode === searchInput) {
	                    originalValue = searchInput.value;
	                    selectedNode = swap(selectedNode, firstLink);
	                }
	                else {
	                    var nextNode = selectedNode.nextElementSibling;
	                    if (nextNode && nextNode.tagName) {
	                        while (nextNode.tagName !== ITEM_TAG) {
	                            nextNode = nextNode.nextElementSibling;
	                        }
	                    }
	                    selectedNode = swap(selectedNode, nextNode);
	                }
	                break;
	            case KEY_ENTER:
	                if (selectedNode !== searchInput) {
	                    selectedNode.firstElementChild.click();
	                    reset();
	                }
	                break;
	            default:
	                reset();
	                break;
	        }
	    };
	}


/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {"use strict";
	function mount(tag, opts) {
	    tag.on('before-mount', initSayt(tag, opts));
	    tag.on('mount', wrapElement(tag.root, opts));
	}
	exports.mount = mount;
	function initSayt(tag, opts) {
	    var root = tag.root;
	    return function () {
	        root.autocomplete = 'off';
	        document.addEventListener('click', function () { return opts.flux.emit('autocomplete:hide'); });
	        root.addEventListener('input', function () {
	            if (root.value) {
	                opts.flux.emit('autocomplete', root.value);
	            }
	            else {
	                opts.flux.emit('autocomplete:hide');
	            }
	        });
	    };
	}
	function wrapElement(root, opts) {
	    return function () {
	        var queryWrapper = document.createElement('span');
	        queryWrapper.classList.add('gb-query-wrapper');
	        var saytNode = document.createElement('div');
	        saytNode.classList.add('gb-sayt-target');
	        root.parentNode.insertBefore(queryWrapper, root);
	        queryWrapper.appendChild(root);
	        queryWrapper.appendChild(saytNode);
	        riot.mount(saytNode, 'gb-sayt', opts);
	    };
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-results', '<gb-raw-results flux="{opts.flux}"> <gb-product></gb-product> </gb-raw-results>', '', '', function (opts) {
	    __webpack_require__(64);
	    __webpack_require__(50);

	    this.struct = opts.config.structure;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-raw-results', '<ul class="gb-results {this.parent.opts.style()} {userStyle(\'results\')}"> <li class="gb-results__item {userStyle(\'resultsItem\')}" each="{records}"> <div class="gb-product {userStyle(\'product\')}"> <yield></yield> </div> </li> </ul>', 'gb-raw-results .gb-stylish.gb-results,[riot-tag="gb-raw-results"] .gb-stylish.gb-results,[data-is="gb-raw-results"] .gb-stylish.gb-results{ list-style: none; display: flex; flex-wrap: wrap; justify-content: space-around; } gb-raw-results .gb-stylish .gb-product,[riot-tag="gb-raw-results"] .gb-stylish .gb-product,[data-is="gb-raw-results"] .gb-stylish .gb-product{ display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; } gb-raw-results .gb-stylish .gb-product .gb-product__image,[riot-tag="gb-raw-results"] .gb-stylish .gb-product .gb-product__image,[data-is="gb-raw-results"] .gb-stylish .gb-product .gb-product__image{ width: 380px; }', '', function (opts) {
	    var _this = this;

	    this.struct = this.parent ? this.parent.struct : opts.config.structure;
	    var css = opts.css;
	    opts.flux.on(opts.flux.RESULTS, function (res) {
	        return _this.update({ records: res.records });
	    });
	    this.userStyle = function (key) {
	        return css ? css[key] : '';
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-record-count', '<yield></yield>', '', '', function (opts) {
	  var _this = this;

	  opts.flux.on(opts.flux.RESULTS, function (res) {
	    return _this.update({
	      first: res.pageInfo.recordStart,
	      last: res.pageInfo.recordEnd,
	      total: res.totalRecordCount
	    });
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-paging', '<div class="gb-paging {opts.style()}"> <a class="gb-paging__link first {isFirst() ? \'disabled\' : \'\'}" href="#" onclick="{firstPage}"><span class="gb-paging__icon">←←</span> First</a> <a class="gb-paging__link prev {isFirst() ? \'disabled\' : \'\'}" href="#" onclick="{prevPage}"><span class="gb-paging__icon">←</span> Prev</a> <a class="gb-paging__link next {isLast() ? \'disabled\' : \'\'}" href="#" onclick="{nextPage}">Next <span class="gb-paging__icon">→</span></a> <a class="gb-paging__link last {isLast() ? \'disabled\' : \'\'}" href="#" onclick="{lastPage}">Last <span class="gb-paging__icon">→→</span></a> </div>', 'gb-paging .gb-stylish .gb-paging__link,[riot-tag="gb-paging"] .gb-stylish .gb-paging__link,[data-is="gb-paging"] .gb-stylish .gb-paging__link{ padding: 5px 14px; text-decoration: none; color: #888; } gb-paging .gb-stylish .gb-paging__link:hover,[riot-tag="gb-paging"] .gb-stylish .gb-paging__link:hover,[data-is="gb-paging"] .gb-stylish .gb-paging__link:hover{ color: black; } gb-paging .gb-stylish .gb-paging__link.disabled,[riot-tag="gb-paging"] .gb-stylish .gb-paging__link.disabled,[data-is="gb-paging"] .gb-stylish .gb-paging__link.disabled{ color: #ddd; cursor: not-allowed; }', '', function (opts) {
	    var _this = this;

	    opts.flux.on(opts.flux.RESULTS, function () {
	        return _this.update();
	    });

	    this.firstPage = function () {
	        return !_this.isFirst() && opts.flux.page.reset();
	    };
	    this.nextPage = function () {
	        return !_this.isLast() && opts.flux.page.next();
	    };
	    this.prevPage = function () {
	        return !_this.isFirst() && opts.flux.page.prev();
	    };
	    this.lastPage = function () {
	        return !_this.isLast() && opts.flux.page.last();
	    };
	    this.isFirst = function () {
	        return !opts.flux.page.hasPrevious;
	    };
	    this.isLast = function () {
	        return !opts.flux.page.hasNext;
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-related-searches', '<ul class="gb-list"> <li each="{related in relatedSearches}"> <a href="#" onclick="{send}">{related}</a> </li> </ul>', '', '', function (opts) {
	    var _this = this;

	    opts.flux.on(opts.flux.RESULTS, function (res) {
	        return _this.update({ relatedSearches: res.relatedQueries });
	    });
	    this.send = function (event) {
	        return opts.flux.rewrite(event.target.text);
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-did-you-mean', '<ul class="gb-did-you-mean {opts.style()}"> <li class="gb-did-you-mean__option" each="{dym in didYouMean}"> <a href="#" onclick="{send}">{dym}</a> </li> </ul>', 'gb-did-you-mean .gb-stylish.gb-did-you-mean,[riot-tag="gb-did-you-mean"] .gb-stylish.gb-did-you-mean,[data-is="gb-did-you-mean"] .gb-stylish.gb-did-you-mean{ display: flex; list-style: none; } gb-did-you-mean .gb-stylish .gb-did-you-mean__option,[riot-tag="gb-did-you-mean"] .gb-stylish .gb-did-you-mean__option,[data-is="gb-did-you-mean"] .gb-stylish .gb-did-you-mean__option{ flex: 1; }', '', function (opts) {
	    var _this = this;

	    opts.flux.on(opts.flux.RESULTS, function (res) {
	        return _this.update({ didYouMean: res.didYouMean });
	    });
	    this.send = function (event) {
	        return opts.flux.rewrite(event.target.text);
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	riot.tag2('gb-available-navigation', '<div class="gb-side-nav {opts.style()}"> <div class="gb-nav" each="{name, nav in processed}"> <h4 class="gb-nav__title">{nav.displayName}</h4> <ul class="gb-nav__list"> <gb-selected-refinement if="{showSelected}" each="{ref in nav.selected}"></gb-selected-refinement> <gb-available-refinement each="{ref in nav.available}"></gb-available-refinement> </ul> </div> </div>', 'gb-available-navigation .gb-stylish h4,[riot-tag="gb-available-navigation"] .gb-stylish h4,[data-is="gb-available-navigation"] .gb-stylish h4{ font-size: 18px; margin: 10px 0; } gb-available-navigation .gb-stylish.gb-side-nav,[riot-tag="gb-available-navigation"] .gb-stylish.gb-side-nav,[data-is="gb-available-navigation"] .gb-stylish.gb-side-nav{ padding: 12px; } gb-available-navigation .gb-stylish .gb-nav__list,[riot-tag="gb-available-navigation"] .gb-stylish .gb-nav__list,[data-is="gb-available-navigation"] .gb-stylish .gb-nav__list{ margin: 0; padding-left: 8px; }', '', function (opts) {
	    var _this = this;

	    __webpack_require__(70);
	    __webpack_require__(71);

	    this.badge = opts.badge === undefined ? true : opts.badge;
	    this.showSelected = opts.showSelected === undefined ? true : opts.showSelected;
	    this.processNavigations = function (res) {
	        return res.selectedNavigation.map(function (nav) {
	            return Object.assign(nav, { selected: true });
	        }).concat(res.availableNavigation).reduce(_this.combineNavigations, {});
	    };
	    this.combineNavigations = function (processed, nav) {
	        return Object.assign(processed, _defineProperty({}, nav.name, Object.assign(processed[nav.name] ? processed[nav.name] : nav, _defineProperty({}, nav.selected ? 'selected' : 'available', nav.refinements))));
	    };
	    opts.flux.on(opts.flux.RESULTS, function (res) {
	        return _this.update({ processed: _this.processNavigations(res) });
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-available-refinement', '<li class="gb-ref {parentOpts.style()}"> <a class="gb-ref__link" href="#" onclick="{send}"> <span class="gb-ref__title">{ref.type === \'Value\' ? ref.value : ref.low + \' - \' + ref.high}</span> <span class="gb-filler"></span> <span class="gb-ref__badge" if="{badge}">{ref.count}</span> </a> </li>', 'gb-available-refinement .gb-stylish,[riot-tag="gb-available-refinement"] .gb-stylish,[data-is="gb-available-refinement"] .gb-stylish{ list-style: none; } gb-available-refinement .gb-stylish .gb-filler,[riot-tag="gb-available-refinement"] .gb-stylish .gb-filler,[data-is="gb-available-refinement"] .gb-stylish .gb-filler{ flex-grow: 1; } gb-available-refinement .gb-stylish .gb-ref__link,[riot-tag="gb-available-refinement"] .gb-stylish .gb-ref__link,[data-is="gb-available-refinement"] .gb-stylish .gb-ref__link{ display: flex; padding: 4px 6px; border-radius: 4px; color: black; font-size: 14px; text-decoration: none; align-items: baseline; } gb-available-refinement .gb-stylish .gb-ref__link:hover,[riot-tag="gb-available-refinement"] .gb-stylish .gb-ref__link:hover,[data-is="gb-available-refinement"] .gb-stylish .gb-ref__link:hover{ background-color: #ddd; } gb-available-refinement .gb-stylish .gb-ref__badge,[riot-tag="gb-available-refinement"] .gb-stylish .gb-ref__badge,[data-is="gb-available-refinement"] .gb-stylish .gb-ref__badge{ display: inline-block; min-width: 10px; max-height: 20px; padding: 4px 7px; border-radius: 10px; font-size: 12px; font-weight: bold; line-height: 1; color: #fff; background-color: #ccc; text-align: center; white-space: nowrap; vertical-align: middle; }', '', function (opts) {
	    var _this = this;

	    var utils = __webpack_require__(43);
	    this.parentOpts = this.parent.parent.opts;
	    this.send = function () {
	        return _this.parentOpts.flux.refine(utils.toRefinement(_this.ref, _this.nav));
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-selected-refinement', '<li class="gb-ref {parentOpts.style()}"> <a class="gb-ref__link" href="#" onclick="{remove}">×</a> <span class="gb-ref__value">{ref.type === \'Value\' ? ref.value : ref.low + \' - \' + ref.high}</span> </li>', 'gb-selected-refinement .gb-stylish,[riot-tag="gb-selected-refinement"] .gb-stylish,[data-is="gb-selected-refinement"] .gb-stylish{ position: relative; list-style: none; padding: 4px 6px; font-size: 14px; } gb-selected-refinement .gb-stylish .gb-ref__link,[riot-tag="gb-selected-refinement"] .gb-stylish .gb-ref__link,[data-is="gb-selected-refinement"] .gb-stylish .gb-ref__link{ left: -8px; position: absolute; color: black; text-decoration: none; } gb-selected-refinement .gb-stylish .gb-ref__link:hover,[riot-tag="gb-selected-refinement"] .gb-stylish .gb-ref__link:hover,[data-is="gb-selected-refinement"] .gb-stylish .gb-ref__link:hover{ color: red; font-weight: bold; }', '', function (opts) {
	    var _this = this;

	    var utils = __webpack_require__(43);
	    this.parentOpts = this.parent.parent.opts;
	    this.remove = function () {
	        return _this.parentOpts.flux.unrefine(utils.toRefinement(_this.ref, _this.nav));
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-breadcrumbs', '<ul class="gb-breadcrumbs {opts.style()} "> <li each="{nav in selected}"> <ul class="gb-nav-crumb"> <gb-refinement-crumb each="{ref in nav.refinements}"></gb-refinement-crumb> </ul> </li> </ul>', 'gb-breadcrumbs .gb-stylish.gb-breadcrumbs,[riot-tag="gb-breadcrumbs"] .gb-stylish.gb-breadcrumbs,[data-is="gb-breadcrumbs"] .gb-stylish.gb-breadcrumbs{ display: flex; list-style: none; } gb-breadcrumbs .gb-stylish.gb-breadcrumbs > li,[riot-tag="gb-breadcrumbs"] .gb-stylish.gb-breadcrumbs > li,[data-is="gb-breadcrumbs"] .gb-stylish.gb-breadcrumbs > li{ flex: 1; }', '', function (opts) {
	    var _this = this;

	    __webpack_require__(73);

	    opts.flux.on(opts.flux.REFINEMENTS_CHANGED, function (_ref) {
	        var selected = _ref.selected;
	        return _this.update({ selected: selected });
	    });
	    opts.flux.on(opts.flux.RESET, function () {
	        return _this.update({ selected: [] });
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-refinement-crumb', '<li> <a href="#" onclick="{remove}">×</a> <b>{nav.displayName}: {ref.type === \'Value\' ? ref.value : ref.low + \' - \' + ref.high}</b> </li>', '', '', function (opts) {
	    var _this = this;

	    var utils = __webpack_require__(43);
	    this.parentOpts = this.parent.parent.opts;
	    this.remove = function () {
	        return _this.parentOpts.flux.unrefine(utils.toRefinement(_this.ref, _this.nav));
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-template', '<div class="gb-template {opts.style()}" if="{isActive}"> <yield></yield> </div>', 'gb-template .gb-stylish.gb-template,[riot-tag="gb-template"] .gb-stylish.gb-template,[data-is="gb-template"] .gb-stylish.gb-template{ display: flex; align-items: center; justify-content: center; }', '', function (opts) {
	    var _this = this;

	    this.isActive = false;
	    opts.flux.on(opts.flux.RESULTS, function (res) {
	        return _this.update({ isActive: res.template.name === opts.templateName });
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-category-menu', '<div class="gb-menu {opts.style()}"> <div class="gb-menu__item" each="{opts.sections}"> <gb-category-dropdown class="gb-category-dropdown"></gb-category-dropdown> </div> </div>', 'gb-category-menu .gb-stylish.gb-menu,[riot-tag="gb-category-menu"] .gb-stylish.gb-menu,[data-is="gb-category-menu"] .gb-stylish.gb-menu{ display: flex; flex-direction: row; justify-content: center; }', '', function (opts) {
	    __webpack_require__(76);
	    __webpack_require__(77);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-category-dropdown', '<div class="gb-dropdown {parentOpts.style()}"> <button type="button" class="gb-dropdown__button">{name}</button> <div class="gb-dropdown__content"> <gb-category-section if="{items}"></gb-category-section> <gb-category-section each="{subsections}" named="{true}"></gb-category-section> </div> <div class="gb-dropdown__images"> <img src="" each="{results.images}"> </div> </div>', 'gb-category-dropdown .gb-dropdown,[riot-tag="gb-category-dropdown"] .gb-dropdown,[data-is="gb-category-dropdown"] .gb-dropdown{ position: relative; display: inline-block; } gb-category-dropdown .gb-dropdown__content,[riot-tag="gb-category-dropdown"] .gb-dropdown__content,[data-is="gb-category-dropdown"] .gb-dropdown__content{ display: none; position: absolute; min-width: 160px; background-color: #fff; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); } gb-category-dropdown .gb-dropdown:hover .gb-dropdown__content,[riot-tag="gb-category-dropdown"] .gb-dropdown:hover .gb-dropdown__content,[data-is="gb-category-dropdown"] .gb-dropdown:hover .gb-dropdown__content{ display: block; } gb-category-dropdown .gb-stylish .gb-dropdown__button,[riot-tag="gb-category-dropdown"] .gb-stylish .gb-dropdown__button,[data-is="gb-category-dropdown"] .gb-stylish .gb-dropdown__button{ border: none; cursor: pointer; padding: 16px; width: 100%; } gb-category-dropdown .gb-stylish .gb-dropdown__content,[riot-tag="gb-category-dropdown"] .gb-stylish .gb-dropdown__content,[data-is="gb-category-dropdown"] .gb-stylish .gb-dropdown__content{ flex-wrap: wrap; background-color: #f9f9f9; min-width: 272px; } gb-category-dropdown .gb-stylish.gb-dropdown:hover .gb-dropdown__content,[riot-tag="gb-category-dropdown"] .gb-stylish.gb-dropdown:hover .gb-dropdown__content,[data-is="gb-category-dropdown"] .gb-stylish.gb-dropdown:hover .gb-dropdown__content{ display: flex; }', '', function (opts) {
	  var sayt = __webpack_require__(52);
	  this.parentOpts = this.parent.opts;
	  var saytConfig = Object.assign({ products: 4 }, this.parentOpts.config.sayt);

	  sayt.configure({
	    subdomain: this.parentOpts.config.customerId,
	    collection: this.parentOpts.config.collection,
	    autocomplete: {},
	    productSearch: { area: this.parentOpts.config.area, numProducts: saytConfig.products }
	  });

	  this.updateSectionImages = function (event) {
	    return console.dir(event.target);
	  };
	  this.updateCategoryImages = function (event) {
	    return console.dir(event.target);
	  };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-category-section', '<div class="gb-category-section {parentOpts.style()}"> <a if="{opts.named}" class="gb-category-section__header" href="#" onmouseover="{updateSectionImages}" data-try="{name}">{name}</a> <a each="{item in items}" class="gb-category-section__link" href="#" onmouseover="{updateCategoryImages}">{item}</a> </div>', 'gb-category-section .gb-stylish.gb-category-section,[riot-tag="gb-category-section"] .gb-stylish.gb-category-section,[data-is="gb-category-section"] .gb-stylish.gb-category-section{ min-width: 120px; flex-wrap: wrap; padding: 6px 8px; } gb-category-section .gb-stylish .gb-category-section__header,[riot-tag="gb-category-section"] .gb-stylish .gb-category-section__header,[data-is="gb-category-section"] .gb-stylish .gb-category-section__header{ padding: 6px 4px; margin: 0; font-size: 1.1em; font-weight: bold; } gb-category-section .gb-stylish a,[riot-tag="gb-category-section"] .gb-stylish a,[data-is="gb-category-section"] .gb-stylish a{ padding: 3px 4px; text-decoration: none; display: block; } gb-category-section .gb-stylish a:hover,[riot-tag="gb-category-section"] .gb-stylish a:hover,[data-is="gb-category-section"] .gb-stylish a:hover{ background-color: #f1f1f1; }', '', function (opts) {
	    this.parentOpts = this.parent.parent.opts;
	    this.updateSectionImages = this.parent.parent.updateSectionImages;
	    this.updateCategoryImages = this.parent.parent.updateCategoryImages;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-page-size', '<select class="gb-page-size" name="select" onchange="{updatePageSize}"> <option each="{size in pageSizes}" value="{size}">{size}</option> </select>', '', '', function (opts) {
	    var _this = this;

	    this.pageSizes = opts.config.pageSizes || [10, 25, 50, 100];
	    var resetOffset = opts.resetOffset;
	    this.updatePageSize = function (event) {
	        return opts.flux.resize(event.target.value, resetOffset ? 0 : undefined);
	    };

	    if (!opts.native) {
	        __webpack_require__(79);
	        this.on('mount', function () {
	            return new (__webpack_require__(83))({ el: _this.select });
	        });
	    }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(80);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(82)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../css-loader/index.js!./select-theme-default.css", function() {
				var newContent = require("!!./../../../css-loader/index.js!./select-theme-default.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(81)();
	// imports


	// module
	exports.push([module.id, ".select-select {\n  display: none;\n  /* For when we are on a small touch device and want to use native controls */\n  pointer-events: none;\n  position: absolute;\n  opacity: 0; }\n\n.select-element, .select-element:after, .select-element:before, .select-element *, .select-element *:after, .select-element *:before {\n  box-sizing: border-box; }\n\n.select-element {\n  position: absolute;\n  display: none; }\n  .select-element.select-open {\n    display: block; }\n\n.select-theme-default, .select-theme-default *, .select-theme-default *:after, .select-theme-default *:before {\n  box-sizing: border-box; }\n\n.select.select-theme-default {\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -o-user-select: none;\n  user-select: none; }\n  .select.select-theme-default .select-content {\n    border-radius: .25em;\n    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);\n    background: #fff;\n    font-family: inherit;\n    color: inherit;\n    overflow: auto;\n    max-width: 18rem;\n    max-height: 18rem;\n    -webkit-overflow-scrolling: touch; }\n    @media (max-width: 27rem), (max-height: 27rem) {\n      .select.select-theme-default .select-content {\n        max-width: 11.25rem;\n        max-height: 11.25rem; } }\n  .select.select-theme-default .select-options {\n    -webkit-tap-highlight-color: transparent;\n    -webkit-touch-callout: none;\n    margin: 0;\n    padding: 0; }\n    .select.select-theme-default .select-options .select-option {\n      -webkit-tap-highlight-color: transparent;\n      -webkit-touch-callout: none;\n      position: relative;\n      list-style: none;\n      margin: 0;\n      line-height: 1.25rem;\n      padding: 0.5rem 1em 0.5rem 2.5em;\n      display: block;\n      cursor: pointer;\n      white-space: nowrap;\n      overflow: hidden;\n      text-overflow: ellipsis; }\n      .select.select-theme-default .select-options .select-option.select-option-selected:before {\n        content: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='-0.5 0 20 15'><rect fill='#444' stroke='none' transform='rotate(45 4.0033 8.87436)' height='5' width='6.32304' y='6.37436' x='0.84178'></rect><rect fill='#444' stroke='none' transform='rotate(45 11.1776 7.7066)' width='5' height='16.79756' y='-0.69218' x='8.67764'></rect></svg>\");\n        position: absolute;\n        left: 1em;\n        top: 0;\n        bottom: .2em;\n        height: 1em;\n        width: 1em;\n        margin: auto; }\n      .select.select-theme-default .select-options .select-option:hover, .select.select-theme-default .select-options .select-option.select-option-highlight {\n        background: #63a2f1;\n        color: #fff; }\n        .select.select-theme-default .select-options .select-option:hover.select-option-selected:before, .select.select-theme-default .select-options .select-option.select-option-highlight.select-option-selected:before {\n          content: url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%' viewBox='-0.5 0 20 15'><rect fill='#fff' stroke='none' transform='rotate(45 4.0033 8.87436)' height='5' width='6.32304' y='6.37436' x='0.84178'></rect><rect fill='#fff' stroke='none' transform='rotate(45 11.1776 7.7066)' width='5' height='16.79756' y='-0.69218' x='8.67764'></rect></svg>\"); }\n      .select.select-theme-default .select-options .select-option:first-child {\n        border-radius: 0.25em 0.25em 0 0; }\n      .select.select-theme-default .select-options .select-option:last-child {\n        border-radius: 0 0 0.25em 0.25em; }\n\n.select-target.select-theme-default {\n  display: inline-block;\n  vertical-align: middle;\n  *vertical-align: auto;\n  *zoom: 1;\n  *display: inline;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  -o-user-select: none;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n  -webkit-touch-callout: none;\n  border-radius: .25em;\n  position: relative;\n  padding: 0.5rem 3em 0.5rem 1em;\n  background: #f6f6f6;\n  border: .18em solid #ddd;\n  cursor: pointer;\n  color: #444;\n  text-decoration: none;\n  white-space: nowrap;\n  max-width: 100%;\n  overflow: hidden;\n  text-overflow: ellipsis; }\n  .select-target.select-theme-default:hover {\n    border-color: #aaa;\n    color: #000; }\n  .select-target.select-theme-default.select-target-focused, .select-target.select-theme-default.select-target-focused:focus {\n    border-color: #63a2f1;\n    outline: none; }\n  .select-target.select-theme-default b {\n    position: absolute;\n    right: 1em;\n    top: 0;\n    bottom: 0;\n    margin: auto;\n    height: 1.25rem;\n    width: 2em; }\n    .select-target.select-theme-default b:before, .select-target.select-theme-default b:after {\n      content: \"\";\n      display: block;\n      position: absolute;\n      margin: auto;\n      right: 0;\n      height: 0;\n      width: 0;\n      border: .263em solid transparent; }\n    .select-target.select-theme-default b:before {\n      top: 0;\n      border-bottom-color: inherit; }\n    .select-target.select-theme-default b:after {\n      bottom: 0;\n      border-top-color: inherit; }\n", ""]);

	// exports


/***/ },
/* 81 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! tether-select 1.1.0 */

	(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(84)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory(require('tether'));
	  } else {
	    root.Select = factory(root.Tether);
	  }
	}(this, function(Tether) {

	/* global Tether */

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x3, _x4, _x5) { var _again = true; _function: while (_again) { var object = _x3, property = _x4, receiver = _x5; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent; _x4 = property; _x5 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

	var _Tether$Utils = Tether.Utils;
	var extend = _Tether$Utils.extend;
	var addClass = _Tether$Utils.addClass;
	var removeClass = _Tether$Utils.removeClass;
	var hasClass = _Tether$Utils.hasClass;
	var getBounds = _Tether$Utils.getBounds;
	var Evented = _Tether$Utils.Evented;

	var ENTER = 13;
	var ESCAPE = 27;
	var SPACE = 32;
	var UP = 38;
	var DOWN = 40;

	var touchDevice = ('ontouchstart' in document.documentElement);
	var clickEvent = touchDevice ? 'touchstart' : 'click';

	function _useNative() {
	  var innerWidth = window.innerWidth;
	  var innerHeight = window.innerHeight;

	  return touchDevice && (innerWidth <= 640 || innerHeight <= 640);
	}

	function isRepeatedChar(str) {
	  return Array.prototype.reduce.call(str, function (a, b) {
	    return a === b ? b : false;
	  });
	}

	function getFocusedSelect() {
	  var focusedTarget = document.querySelector('.select-target-focused');
	  return focusedTarget ? focusedTarget.selectInstance : null;
	}

	var searchText = '';
	var searchTextTimeout = undefined;

	document.addEventListener('keypress', function (e) {
	  var select = getFocusedSelect();
	  if (!select || e.charCode === 0) {
	    return;
	  }

	  if (e.keyCode === SPACE) {
	    e.preventDefault();
	  }

	  clearTimeout(searchTextTimeout);
	  searchTextTimeout = setTimeout(function () {
	    searchText = '';
	  }, 500);

	  searchText += String.fromCharCode(e.charCode);

	  var options = select.findOptionsByPrefix(searchText);

	  if (options.length === 1) {
	    // We have an exact match, choose it
	    select.selectOption(options[0]);
	  }

	  if (searchText.length > 1 && isRepeatedChar(searchText)) {
	    // They hit the same char over and over, maybe they want to cycle through
	    // the options that start with that char
	    var repeatedOptions = select.findOptionsByPrefix(searchText[0]);

	    if (repeatedOptions.length) {
	      var selected = repeatedOptions.indexOf(select.getChosen());

	      // Pick the next thing (if something with this prefix wasen't selected
	      // we'll end up with the first option)
	      selected += 1;
	      selected = selected % repeatedOptions.length;

	      select.selectOption(repeatedOptions[selected]);
	      return;
	    }
	  }

	  if (options.length) {
	    // We have multiple things that start with this prefix.  Based on the
	    // behavior of native select, this is considered after the repeated case.
	    select.selectOption(options[0]);
	    return;
	  }

	  // No match at all, do nothing
	});

	document.addEventListener('keydown', function (e) {
	  // We consider this independently of the keypress handler so we can intercept
	  // keys that have built-in functions.
	  var select = getFocusedSelect();
	  if (!select) {
	    return;
	  }

	  if ([UP, DOWN, ESCAPE].indexOf(e.keyCode) >= 0) {
	    e.preventDefault();
	  }

	  if (select.isOpen()) {
	    switch (e.keyCode) {
	      case UP:
	      case DOWN:
	        select.moveHighlight(e.keyCode);
	        break;
	      case ENTER:
	        select.selectHighlightedOption();
	        break;
	      case ESCAPE:
	        select.close();
	        select.target.focus();
	    }
	  } else {
	    if ([UP, DOWN, SPACE].indexOf(e.keyCode) >= 0) {
	      select.open();
	    }
	  }
	});

	var Select = (function (_Evented) {
	  function Select(options) {
	    _classCallCheck(this, Select);

	    _get(Object.getPrototypeOf(Select.prototype), 'constructor', this).call(this, options);
	    this.options = extend({}, Select.defaults, options);
	    this.select = this.options.el;

	    if (typeof this.select.selectInstance !== 'undefined') {
	      throw new Error('This element has already been turned into a Select');
	    }

	    this.update = this.update.bind(this);

	    this.setupTarget();
	    this.renderTarget();

	    this.setupDrop();
	    this.renderDrop();

	    this.setupSelect();

	    this.setupTether();
	    this.bindClick();

	    this.bindMutationEvents();

	    this.value = this.select.value;
	  }

	  _inherits(Select, _Evented);

	  _createClass(Select, [{
	    key: 'useNative',
	    value: function useNative() {
	      var native = this.options.useNative;
	      return native === true || _useNative() && native !== false;
	    }
	  }, {
	    key: 'setupTarget',
	    value: function setupTarget() {
	      var _this = this;

	      this.target = document.createElement('a');
	      this.target.href = 'javascript:;';

	      addClass(this.target, 'select-target');

	      var tabIndex = this.select.getAttribute('tabindex') || 0;
	      this.target.setAttribute('tabindex', tabIndex);

	      if (this.options.className) {
	        addClass(this.target, this.options.className);
	      }

	      this.target.selectInstance = this;

	      this.target.addEventListener('click', function () {
	        if (!_this.isOpen()) {
	          _this.target.focus();
	        } else {
	          _this.target.blur();
	        }
	      });

	      this.target.addEventListener('focus', function () {
	        addClass(_this.target, 'select-target-focused');
	      });

	      this.target.addEventListener('blur', function (_ref) {
	        var relatedTarget = _ref.relatedTarget;

	        if (_this.isOpen()) {
	          if (relatedTarget && !_this.drop.contains(relatedTarget)) {
	            _this.close();
	          }
	        }

	        removeClass(_this.target, 'select-target-focused');
	      });

	      this.select.parentNode.insertBefore(this.target, this.select.nextSibling);
	    }
	  }, {
	    key: 'setupDrop',
	    value: function setupDrop() {
	      var _this2 = this;

	      this.drop = document.createElement('div');
	      addClass(this.drop, 'select');

	      if (this.options.className) {
	        addClass(this.drop, this.options.className);
	      }

	      document.body.appendChild(this.drop);

	      this.drop.addEventListener('click', function (e) {
	        if (hasClass(e.target, 'select-option')) {
	          _this2.pickOption(e.target);
	        }

	        // Built-in selects don't propagate click events in their drop directly
	        // to the body, so we don't want to either.
	        e.stopPropagation();
	      });

	      this.drop.addEventListener('mousemove', function (e) {
	        if (hasClass(e.target, 'select-option')) {
	          _this2.highlightOption(e.target);
	        }
	      });

	      this.content = document.createElement('div');
	      addClass(this.content, 'select-content');
	      this.drop.appendChild(this.content);
	    }
	  }, {
	    key: 'open',
	    value: function open() {
	      var _this3 = this;

	      addClass(this.target, 'select-open');

	      if (this.useNative()) {
	        this.select.style.display = 'block';

	        setTimeout(function () {
	          var event = document.createEvent('MouseEvents');
	          event.initEvent('mousedown', true, true);
	          _this3.select.dispatchEvent(event);
	        });

	        return;
	      }

	      addClass(this.drop, 'select-open');

	      setTimeout(function () {
	        _this3.tether.enable();
	      });

	      var selectedOption = this.drop.querySelector('.select-option-selected');

	      if (!selectedOption) {
	        return;
	      }

	      this.highlightOption(selectedOption);
	      this.scrollDropContentToOption(selectedOption);

	      var positionSelectStyle = function positionSelectStyle() {
	        if (hasClass(_this3.drop, 'tether-abutted-left') || hasClass(_this3.drop, 'tether-abutted-bottom')) {
	          var dropBounds = getBounds(_this3.drop);
	          var optionBounds = getBounds(selectedOption);

	          var offset = dropBounds.top - (optionBounds.top + optionBounds.height);

	          _this3.drop.style.top = '' + ((parseFloat(_this3.drop.style.top) || 0) + offset) + 'px';
	        }
	      };

	      var alignToHighlighted = this.options.alignToHighlighted;
	      var _content = this.content;
	      var scrollHeight = _content.scrollHeight;
	      var clientHeight = _content.clientHeight;

	      if (alignToHighlighted === 'always' || alignToHighlighted === 'auto' && scrollHeight <= clientHeight) {
	        setTimeout(function () {
	          positionSelectStyle();
	        });
	      }

	      this.trigger('open');
	    }
	  }, {
	    key: 'close',
	    value: function close() {
	      removeClass(this.target, 'select-open');

	      if (this.useNative()) {
	        this.select.style.display = 'none';
	        return;
	      }

	      this.tether.disable();

	      removeClass(this.drop, 'select-open');

	      this.trigger('close');
	    }
	  }, {
	    key: 'toggle',
	    value: function toggle() {
	      if (this.isOpen()) {
	        this.close();
	      } else {
	        this.open();
	      }
	    }
	  }, {
	    key: 'isOpen',
	    value: function isOpen() {
	      return hasClass(this.drop, 'select-open');
	    }
	  }, {
	    key: 'bindClick',
	    value: function bindClick() {
	      var _this4 = this;

	      this.target.addEventListener(clickEvent, function (e) {
	        e.preventDefault();
	        _this4.toggle();
	      });

	      document.addEventListener(clickEvent, function (event) {
	        if (!_this4.isOpen()) {
	          return;
	        }

	        // Clicking inside dropdown
	        if (event.target === _this4.drop || _this4.drop.contains(event.target)) {
	          return;
	        }

	        // Clicking target
	        if (event.target === _this4.target || _this4.target.contains(event.target)) {
	          return;
	        }

	        _this4.close();
	      });
	    }
	  }, {
	    key: 'setupTether',
	    value: function setupTether() {
	      this.tether = new Tether(extend({
	        element: this.drop,
	        target: this.target,
	        attachment: 'top left',
	        targetAttachment: 'bottom left',
	        classPrefix: 'select',
	        constraints: [{
	          to: 'window',
	          attachment: 'together'
	        }]
	      }, this.options.tetherOptions));
	    }
	  }, {
	    key: 'renderTarget',
	    value: function renderTarget() {
	      this.target.innerHTML = '';

	      var options = this.select.querySelectorAll('option');
	      for (var i = 0; i < options.length; ++i) {
	        var option = options[i];
	        if (option.selected) {
	          this.target.innerHTML = option.innerHTML;
	          break;
	        }
	      }

	      this.target.appendChild(document.createElement('b'));
	    }
	  }, {
	    key: 'renderDrop',
	    value: function renderDrop() {
	      var optionList = document.createElement('ul');
	      addClass(optionList, 'select-options');

	      var options = this.select.querySelectorAll('option');
	      for (var i = 0; i < options.length; ++i) {
	        var el = options[i];
	        var option = document.createElement('li');
	        addClass(option, 'select-option');

	        option.setAttribute('data-value', el.value);
	        option.innerHTML = el.innerHTML;

	        if (el.selected) {
	          addClass(option, 'select-option-selected');
	        }

	        optionList.appendChild(option);
	      }

	      this.content.innerHTML = '';
	      this.content.appendChild(optionList);
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      this.renderDrop();
	      this.renderTarget();
	    }
	  }, {
	    key: 'setupSelect',
	    value: function setupSelect() {
	      this.select.selectInstance = this;

	      addClass(this.select, 'select-select');

	      this.select.addEventListener('change', this.update);
	    }
	  }, {
	    key: 'bindMutationEvents',
	    value: function bindMutationEvents() {
	      if (typeof window.MutationObserver !== 'undefined') {
	        this.observer = new MutationObserver(this.update);
	        this.observer.observe(this.select, {
	          childList: true,
	          attributes: true,
	          characterData: true,
	          subtree: true
	        });
	      } else {
	        this.select.addEventListener('DOMSubtreeModified', this.update);
	      }
	    }
	  }, {
	    key: 'findOptionsByPrefix',
	    value: function findOptionsByPrefix(text) {
	      var options = this.drop.querySelectorAll('.select-option');

	      text = text.toLowerCase();

	      return Array.prototype.filter.call(options, function (option) {
	        return option.innerHTML.toLowerCase().substr(0, text.length) === text;
	      });
	    }
	  }, {
	    key: 'findOptionsByValue',
	    value: function findOptionsByValue(val) {
	      var options = this.drop.querySelectorAll('.select-option');

	      return Array.prototype.filter.call(options, function (option) {
	        return option.getAttribute('data-value') === val;
	      });
	    }
	  }, {
	    key: 'getChosen',
	    value: function getChosen() {
	      if (this.isOpen()) {
	        return this.drop.querySelector('.select-option-highlight');
	      }
	      return this.drop.querySelector('.select-option-selected');
	    }
	  }, {
	    key: 'selectOption',
	    value: function selectOption(option) {
	      if (this.isOpen()) {
	        this.highlightOption(option);
	        this.scrollDropContentToOption(option);
	      } else {
	        this.pickOption(option, false);
	      }
	    }
	  }, {
	    key: 'resetSelection',
	    value: function resetSelection() {
	      this.selectOption(this.drop.querySelector('.select-option'));
	    }
	  }, {
	    key: 'highlightOption',
	    value: function highlightOption(option) {
	      var highlighted = this.drop.querySelector('.select-option-highlight');
	      if (highlighted) {
	        removeClass(highlighted, 'select-option-highlight');
	      }

	      addClass(option, 'select-option-highlight');

	      this.trigger('highlight', { option: option });
	    }
	  }, {
	    key: 'moveHighlight',
	    value: function moveHighlight(directionKeyCode) {
	      var highlighted = this.drop.querySelector('.select-option-highlight');
	      if (!highlighted) {
	        this.highlightOption(this.drop.querySelector('.select-option'));
	        return;
	      }

	      var options = this.drop.querySelectorAll('.select-option');

	      var highlightedIndex = Array.prototype.indexOf.call(options, highlighted);
	      if (!(highlightedIndex >= 0)) {
	        return;
	      }

	      if (directionKeyCode === UP) {
	        highlightedIndex -= 1;
	      } else {
	        highlightedIndex += 1;
	      }

	      if (highlightedIndex < 0 || highlightedIndex >= options.length) {
	        return;
	      }

	      var newHighlight = options[highlightedIndex];

	      this.highlightOption(newHighlight);
	      this.scrollDropContentToOption(newHighlight);
	    }
	  }, {
	    key: 'scrollDropContentToOption',
	    value: function scrollDropContentToOption(option) {
	      var _content2 = this.content;
	      var scrollHeight = _content2.scrollHeight;
	      var clientHeight = _content2.clientHeight;
	      var scrollTop = _content2.scrollTop;

	      if (scrollHeight > clientHeight) {
	        var contentBounds = getBounds(this.content);
	        var optionBounds = getBounds(option);

	        this.content.scrollTop = optionBounds.top - (contentBounds.top - scrollTop);
	      }
	    }
	  }, {
	    key: 'selectHighlightedOption',
	    value: function selectHighlightedOption() {
	      this.pickOption(this.drop.querySelector('.select-option-highlight'));
	    }
	  }, {
	    key: 'pickOption',
	    value: function pickOption(option) {
	      var _this5 = this;

	      var close = arguments[1] === undefined ? true : arguments[1];

	      this.value = this.select.value = option.getAttribute('data-value');
	      this.triggerChange();

	      if (close) {
	        setTimeout(function () {
	          _this5.close();
	          _this5.target.focus();
	        });
	      }
	    }
	  }, {
	    key: 'triggerChange',
	    value: function triggerChange() {
	      var event = document.createEvent('HTMLEvents');
	      event.initEvent('change', true, false);
	      this.select.dispatchEvent(event);

	      this.trigger('change', { value: this.select.value });
	    }
	  }, {
	    key: 'change',
	    value: function change(val) {
	      var options = this.findOptionsByValue(val);

	      if (!options.length) {
	        throw new Error('Select Error: An option with the value "' + val + '" doesn\'t exist');
	      }

	      this.pickOption(options[0], false);
	    }
	  }]);

	  return Select;
	})(Evented);

	Select.defaults = {
	  alignToHighlighed: 'auto',
	  className: 'select-theme-default'
	};

	Select.init = function () {
	  var options = arguments[0] === undefined ? {} : arguments[0];

	  if (document.readyState === 'loading') {
	    document.addEventListener('DOMContentLoaded', function () {
	      return Select.init(options);
	    });
	    return;
	  }

	  if (typeof options.selector === 'undefined') {
	    options.selector = 'select';
	  }

	  var selectors = document.querySelectorAll(options.selector);
	  for (var i = 0; i < selectors.length; ++i) {
	    var el = selectors[i];
	    if (!el.selectInstance) {
	      new Select(extend({ el: el }, options));
	    }
	  }
	};
	return Select;

	}));


/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! tether 1.0.3 */

	(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory(require, exports, module);
	  } else {
	    root.Tether = factory();
	  }
	}(this, function(require, exports, module) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var TetherBase = undefined;
	if (typeof TetherBase === 'undefined') {
	  TetherBase = { modules: [] };
	}

	function getScrollParent(el) {
	  var _getComputedStyle = getComputedStyle(el);

	  var position = _getComputedStyle.position;

	  if (position === 'fixed') {
	    return el;
	  }

	  var parent = el;
	  while (parent = parent.parentNode) {
	    var style = undefined;
	    try {
	      style = getComputedStyle(parent);
	    } catch (err) {}

	    if (typeof style === 'undefined' || style === null) {
	      return parent;
	    }

	    var overflow = style.overflow;
	    var overflowX = style.overflowX;
	    var overflowY = style.overflowY;

	    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
	      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
	        return parent;
	      }
	    }
	  }

	  return document.body;
	}

	var uniqueId = (function () {
	  var id = 0;
	  return function () {
	    return ++id;
	  };
	})();

	var zeroPosCache = {};
	var getOrigin = function getOrigin(doc) {
	  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
	  // jitter as the user scrolls that messes with our ability to detect if two positions
	  // are equivilant or not.  We place an element at the top left of the page that will
	  // get the same jitter, so we can cancel the two out.
	  var node = doc._tetherZeroElement;
	  if (typeof node === 'undefined') {
	    node = doc.createElement('div');
	    node.setAttribute('data-tether-id', uniqueId());
	    extend(node.style, {
	      top: 0,
	      left: 0,
	      position: 'absolute'
	    });

	    doc.body.appendChild(node);

	    doc._tetherZeroElement = node;
	  }

	  var id = node.getAttribute('data-tether-id');
	  if (typeof zeroPosCache[id] === 'undefined') {
	    zeroPosCache[id] = {};

	    var rect = node.getBoundingClientRect();
	    for (var k in rect) {
	      // Can't use extend, as on IE9, elements don't resolve to be hasOwnProperty
	      zeroPosCache[id][k] = rect[k];
	    }

	    // Clear the cache when this position call is done
	    defer(function () {
	      delete zeroPosCache[id];
	    });
	  }

	  return zeroPosCache[id];
	};

	function getBounds(el) {
	  var doc = undefined;
	  if (el === document) {
	    doc = document;
	    el = document.documentElement;
	  } else {
	    doc = el.ownerDocument;
	  }

	  var docEl = doc.documentElement;

	  var box = {};
	  // The original object returned by getBoundingClientRect is immutable, so we clone it
	  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
	  var rect = el.getBoundingClientRect();
	  for (var k in rect) {
	    box[k] = rect[k];
	  }

	  var origin = getOrigin(doc);

	  box.top -= origin.top;
	  box.left -= origin.left;

	  if (typeof box.width === 'undefined') {
	    box.width = document.body.scrollWidth - box.left - box.right;
	  }
	  if (typeof box.height === 'undefined') {
	    box.height = document.body.scrollHeight - box.top - box.bottom;
	  }

	  box.top = box.top - docEl.clientTop;
	  box.left = box.left - docEl.clientLeft;
	  box.right = doc.body.clientWidth - box.width - box.left;
	  box.bottom = doc.body.clientHeight - box.height - box.top;

	  return box;
	}

	function getOffsetParent(el) {
	  return el.offsetParent || document.documentElement;
	}

	function getScrollBarSize() {
	  var inner = document.createElement('div');
	  inner.style.width = '100%';
	  inner.style.height = '200px';

	  var outer = document.createElement('div');
	  extend(outer.style, {
	    position: 'absolute',
	    top: 0,
	    left: 0,
	    pointerEvents: 'none',
	    visibility: 'hidden',
	    width: '200px',
	    height: '150px',
	    overflow: 'hidden'
	  });

	  outer.appendChild(inner);

	  document.body.appendChild(outer);

	  var widthContained = inner.offsetWidth;
	  outer.style.overflow = 'scroll';
	  var widthScroll = inner.offsetWidth;

	  if (widthContained === widthScroll) {
	    widthScroll = outer.clientWidth;
	  }

	  document.body.removeChild(outer);

	  var width = widthContained - widthScroll;

	  return { width: width, height: width };
	}

	function extend() {
	  var out = arguments[0] === undefined ? {} : arguments[0];

	  var args = [];

	  Array.prototype.push.apply(args, arguments);

	  args.slice(1).forEach(function (obj) {
	    if (obj) {
	      for (var key in obj) {
	        if (({}).hasOwnProperty.call(obj, key)) {
	          out[key] = obj[key];
	        }
	      }
	    }
	  });

	  return out;
	}

	function removeClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    name.split(' ').forEach(function (cls) {
	      if (cls.trim()) {
	        el.classList.remove(cls);
	      }
	    });
	  } else {
	    var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
	    var className = getClassName(el).replace(regex, ' ');
	    setClassName(el, className);
	  }
	}

	function addClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    name.split(' ').forEach(function (cls) {
	      if (cls.trim()) {
	        el.classList.add(cls);
	      }
	    });
	  } else {
	    removeClass(el, name);
	    var cls = getClassName(el) + (' ' + name);
	    setClassName(el, cls);
	  }
	}

	function hasClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    return el.classList.contains(name);
	  }
	  var className = getClassName(el);
	  return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
	}

	function getClassName(el) {
	  if (el.className instanceof SVGAnimatedString) {
	    return el.className.baseVal;
	  }
	  return el.className;
	}

	function setClassName(el, className) {
	  el.setAttribute('class', className);
	}

	function updateClasses(el, add, all) {
	  // Of the set of 'all' classes, we need the 'add' classes, and only the
	  // 'add' classes to be set.
	  all.forEach(function (cls) {
	    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
	      removeClass(el, cls);
	    }
	  });

	  add.forEach(function (cls) {
	    if (!hasClass(el, cls)) {
	      addClass(el, cls);
	    }
	  });
	}

	var deferred = [];

	var defer = function defer(fn) {
	  deferred.push(fn);
	};

	var flush = function flush() {
	  var fn = undefined;
	  while (fn = deferred.pop()) {
	    fn();
	  }
	};

	var Evented = (function () {
	  function Evented() {
	    _classCallCheck(this, Evented);
	  }

	  _createClass(Evented, [{
	    key: 'on',
	    value: function on(event, handler, ctx) {
	      var once = arguments[3] === undefined ? false : arguments[3];

	      if (typeof this.bindings === 'undefined') {
	        this.bindings = {};
	      }
	      if (typeof this.bindings[event] === 'undefined') {
	        this.bindings[event] = [];
	      }
	      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
	    }
	  }, {
	    key: 'once',
	    value: function once(event, handler, ctx) {
	      this.on(event, handler, ctx, true);
	    }
	  }, {
	    key: 'off',
	    value: function off(event, handler) {
	      if (typeof this.bindings !== 'undefined' && typeof this.bindings[event] !== 'undefined') {
	        return;
	      }

	      if (typeof handler === 'undefined') {
	        delete this.bindings[event];
	      } else {
	        var i = 0;
	        while (i < this.bindings[event].length) {
	          if (this.bindings[event][i].handler === handler) {
	            this.bindings[event].splice(i, 1);
	          } else {
	            ++i;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'trigger',
	    value: function trigger(event) {
	      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
	        var i = 0;
	        while (i < this.bindings[event].length) {
	          var _bindings$event$i = this.bindings[event][i];
	          var handler = _bindings$event$i.handler;
	          var ctx = _bindings$event$i.ctx;
	          var once = _bindings$event$i.once;

	          var context = ctx;
	          if (typeof context === 'undefined') {
	            context = this;
	          }

	          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	            args[_key - 1] = arguments[_key];
	          }

	          handler.apply(context, args);

	          if (once) {
	            this.bindings[event].splice(i, 1);
	          } else {
	            ++i;
	          }
	        }
	      }
	    }
	  }]);

	  return Evented;
	})();

	TetherBase.Utils = {
	  getScrollParent: getScrollParent,
	  getBounds: getBounds,
	  getOffsetParent: getOffsetParent,
	  extend: extend,
	  addClass: addClass,
	  removeClass: removeClass,
	  hasClass: hasClass,
	  updateClasses: updateClasses,
	  defer: defer,
	  flush: flush,
	  uniqueId: uniqueId,
	  Evented: Evented,
	  getScrollBarSize: getScrollBarSize
	};
	/* globals TetherBase, performance */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	if (typeof TetherBase === 'undefined') {
	  throw new Error('You must include the utils.js file before tether.js');
	}

	var _TetherBase$Utils = TetherBase.Utils;
	var getScrollParent = _TetherBase$Utils.getScrollParent;
	var getBounds = _TetherBase$Utils.getBounds;
	var getOffsetParent = _TetherBase$Utils.getOffsetParent;
	var extend = _TetherBase$Utils.extend;
	var addClass = _TetherBase$Utils.addClass;
	var removeClass = _TetherBase$Utils.removeClass;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;
	var flush = _TetherBase$Utils.flush;
	var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;

	function within(a, b) {
	  var diff = arguments[2] === undefined ? 1 : arguments[2];

	  return a + diff >= b && b >= a - diff;
	}

	var transformKey = (function () {
	  var el = document.createElement('div');

	  var transforms = ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
	  for (var i = 0; i < transforms.length; ++i) {
	    var key = transforms[i];
	    if (el.style[key] !== undefined) {
	      return key;
	    }
	  }
	})();

	var tethers = [];

	var position = function position() {
	  tethers.forEach(function (tether) {
	    tether.position(false);
	  });
	  flush();
	};

	function now() {
	  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
	    return performance.now();
	  }
	  return +new Date();
	}

	(function () {
	  var lastCall = null;
	  var lastDuration = null;
	  var pendingTimeout = null;

	  var tick = function tick() {
	    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
	      // We voluntarily throttle ourselves if we can't manage 60fps
	      lastDuration = Math.min(lastDuration - 16, 250);

	      // Just in case this is the last event, remember to position just once more
	      pendingTimeout = setTimeout(tick, 250);
	      return;
	    }

	    if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
	      // Some browsers call events a little too frequently, refuse to run more than is reasonable
	      return;
	    }

	    if (typeof pendingTimeout !== 'undefined') {
	      clearTimeout(pendingTimeout);
	      pendingTimeout = null;
	    }

	    lastCall = now();
	    position();
	    lastDuration = now() - lastCall;
	  };

	  ['resize', 'scroll', 'touchmove'].forEach(function (event) {
	    window.addEventListener(event, tick);
	  });
	})();

	var MIRROR_LR = {
	  center: 'center',
	  left: 'right',
	  right: 'left'
	};

	var MIRROR_TB = {
	  middle: 'middle',
	  top: 'bottom',
	  bottom: 'top'
	};

	var OFFSET_MAP = {
	  top: 0,
	  left: 0,
	  middle: '50%',
	  center: '50%',
	  bottom: '100%',
	  right: '100%'
	};

	var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
	  var left = attachment.left;
	  var top = attachment.top;

	  if (left === 'auto') {
	    left = MIRROR_LR[relativeToAttachment.left];
	  }

	  if (top === 'auto') {
	    top = MIRROR_TB[relativeToAttachment.top];
	  }

	  return { left: left, top: top };
	};

	var attachmentToOffset = function attachmentToOffset(attachment) {
	  var left = attachment.left;
	  var top = attachment.top;

	  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
	    left = OFFSET_MAP[attachment.left];
	  }

	  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
	    top = OFFSET_MAP[attachment.top];
	  }

	  return { left: left, top: top };
	};

	function addOffset() {
	  var out = { top: 0, left: 0 };

	  for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
	    offsets[_key] = arguments[_key];
	  }

	  offsets.forEach(function (_ref) {
	    var top = _ref.top;
	    var left = _ref.left;

	    if (typeof top === 'string') {
	      top = parseFloat(top, 10);
	    }
	    if (typeof left === 'string') {
	      left = parseFloat(left, 10);
	    }

	    out.top += top;
	    out.left += left;
	  });

	  return out;
	}

	function offsetToPx(offset, size) {
	  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
	    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
	  }
	  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
	    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
	  }

	  return offset;
	}

	var parseOffset = function parseOffset(value) {
	  var _value$split = value.split(' ');

	  var _value$split2 = _slicedToArray(_value$split, 2);

	  var top = _value$split2[0];
	  var left = _value$split2[1];

	  return { top: top, left: left };
	};
	var parseAttachment = parseOffset;

	var TetherClass = (function () {
	  function TetherClass(options) {
	    var _this = this;

	    _classCallCheck(this, TetherClass);

	    this.position = this.position.bind(this);

	    tethers.push(this);

	    this.history = [];

	    this.setOptions(options, false);

	    TetherBase.modules.forEach(function (module) {
	      if (typeof module.initialize !== 'undefined') {
	        module.initialize.call(_this);
	      }
	    });

	    this.position();
	  }

	  _createClass(TetherClass, [{
	    key: 'getClass',
	    value: function getClass() {
	      var key = arguments[0] === undefined ? '' : arguments[0];
	      var classes = this.options.classes;

	      if (typeof classes !== 'undefined' && classes[key]) {
	        return this.options.classes[key];
	      } else if (this.options.classPrefix) {
	        return this.options.classPrefix + '-' + key;
	      } else {
	        return key;
	      }
	    }
	  }, {
	    key: 'setOptions',
	    value: function setOptions(options) {
	      var _this2 = this;

	      var pos = arguments[1] === undefined ? true : arguments[1];

	      var defaults = {
	        offset: '0 0',
	        targetOffset: '0 0',
	        targetAttachment: 'auto auto',
	        classPrefix: 'tether'
	      };

	      this.options = extend(defaults, options);

	      var _options = this.options;
	      var element = _options.element;
	      var target = _options.target;
	      var targetModifier = _options.targetModifier;

	      this.element = element;
	      this.target = target;
	      this.targetModifier = targetModifier;

	      if (this.target === 'viewport') {
	        this.target = document.body;
	        this.targetModifier = 'visible';
	      } else if (this.target === 'scroll-handle') {
	        this.target = document.body;
	        this.targetModifier = 'scroll-handle';
	      }

	      ['element', 'target'].forEach(function (key) {
	        if (typeof _this2[key] === 'undefined') {
	          throw new Error('Tether Error: Both element and target must be defined');
	        }

	        if (typeof _this2[key].jquery !== 'undefined') {
	          _this2[key] = _this2[key][0];
	        } else if (typeof _this2[key] === 'string') {
	          _this2[key] = document.querySelector(_this2[key]);
	        }
	      });

	      addClass(this.element, this.getClass('element'));
	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('target'));
	      }

	      if (!this.options.attachment) {
	        throw new Error('Tether Error: You must provide an attachment');
	      }

	      this.targetAttachment = parseAttachment(this.options.targetAttachment);
	      this.attachment = parseAttachment(this.options.attachment);
	      this.offset = parseOffset(this.options.offset);
	      this.targetOffset = parseOffset(this.options.targetOffset);

	      if (typeof this.scrollParent !== 'undefined') {
	        this.disable();
	      }

	      if (this.targetModifier === 'scroll-handle') {
	        this.scrollParent = this.target;
	      } else {
	        this.scrollParent = getScrollParent(this.target);
	      }

	      if (!(this.options.enabled === false)) {
	        this.enable(pos);
	      }
	    }
	  }, {
	    key: 'getTargetBounds',
	    value: function getTargetBounds() {
	      if (typeof this.targetModifier !== 'undefined') {
	        if (this.targetModifier === 'visible') {
	          if (this.target === document.body) {
	            return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
	          } else {
	            var bounds = getBounds(this.target);

	            var out = {
	              height: bounds.height,
	              width: bounds.width,
	              top: bounds.top,
	              left: bounds.left
	            };

	            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
	            out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
	            out.height = Math.min(innerHeight, out.height);
	            out.height -= 2;

	            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
	            out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
	            out.width = Math.min(innerWidth, out.width);
	            out.width -= 2;

	            if (out.top < pageYOffset) {
	              out.top = pageYOffset;
	            }
	            if (out.left < pageXOffset) {
	              out.left = pageXOffset;
	            }

	            return out;
	          }
	        } else if (this.targetModifier === 'scroll-handle') {
	          var bounds = undefined;
	          var target = this.target;
	          if (target === document.body) {
	            target = document.documentElement;

	            bounds = {
	              left: pageXOffset,
	              top: pageYOffset,
	              height: innerHeight,
	              width: innerWidth
	            };
	          } else {
	            bounds = getBounds(target);
	          }

	          var style = getComputedStyle(target);

	          var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;

	          var scrollBottom = 0;
	          if (hasBottomScroll) {
	            scrollBottom = 15;
	          }

	          var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

	          var out = {
	            width: 15,
	            height: height * 0.975 * (height / target.scrollHeight),
	            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
	          };

	          var fitAdj = 0;
	          if (height < 408 && this.target === document.body) {
	            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
	          }

	          if (this.target !== document.body) {
	            out.height = Math.max(out.height, 24);
	          }

	          var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
	          out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

	          if (this.target === document.body) {
	            out.height = Math.max(out.height, 24);
	          }

	          return out;
	        }
	      } else {
	        return getBounds(this.target);
	      }
	    }
	  }, {
	    key: 'clearCache',
	    value: function clearCache() {
	      this._cache = {};
	    }
	  }, {
	    key: 'cache',
	    value: function cache(k, getter) {
	      // More than one module will often need the same DOM info, so
	      // we keep a cache which is cleared on each position call
	      if (typeof this._cache === 'undefined') {
	        this._cache = {};
	      }

	      if (typeof this._cache[k] === 'undefined') {
	        this._cache[k] = getter.call(this);
	      }

	      return this._cache[k];
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      var pos = arguments[0] === undefined ? true : arguments[0];

	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('enabled'));
	      }
	      addClass(this.element, this.getClass('enabled'));
	      this.enabled = true;

	      if (this.scrollParent !== document) {
	        this.scrollParent.addEventListener('scroll', this.position);
	      }

	      if (pos) {
	        this.position();
	      }
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      removeClass(this.target, this.getClass('enabled'));
	      removeClass(this.element, this.getClass('enabled'));
	      this.enabled = false;

	      if (typeof this.scrollParent !== 'undefined') {
	        this.scrollParent.removeEventListener('scroll', this.position);
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this3 = this;

	      this.disable();

	      tethers.forEach(function (tether, i) {
	        if (tether === _this3) {
	          tethers.splice(i, 1);
	          return;
	        }
	      });
	    }
	  }, {
	    key: 'updateAttachClasses',
	    value: function updateAttachClasses(elementAttach, targetAttach) {
	      var _this4 = this;

	      elementAttach = elementAttach || this.attachment;
	      targetAttach = targetAttach || this.targetAttachment;
	      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

	      if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
	        // updateAttachClasses can be called more than once in a position call, so
	        // we need to clean up after ourselves such that when the last defer gets
	        // ran it doesn't add any extra classes from previous calls.
	        this._addAttachClasses.splice(0, this._addAttachClasses.length);
	      }

	      if (typeof this._addAttachClasses === 'undefined') {
	        this._addAttachClasses = [];
	      }
	      var add = this._addAttachClasses;

	      if (elementAttach.top) {
	        add.push(this.getClass('element-attached') + '-' + elementAttach.top);
	      }
	      if (elementAttach.left) {
	        add.push(this.getClass('element-attached') + '-' + elementAttach.left);
	      }
	      if (targetAttach.top) {
	        add.push(this.getClass('target-attached') + '-' + targetAttach.top);
	      }
	      if (targetAttach.left) {
	        add.push(this.getClass('target-attached') + '-' + targetAttach.left);
	      }

	      var all = [];
	      sides.forEach(function (side) {
	        all.push(_this4.getClass('element-attached') + '-' + side);
	        all.push(_this4.getClass('target-attached') + '-' + side);
	      });

	      defer(function () {
	        if (!(typeof _this4._addAttachClasses !== 'undefined')) {
	          return;
	        }

	        updateClasses(_this4.element, _this4._addAttachClasses, all);
	        if (!(_this4.options.addTargetClasses === false)) {
	          updateClasses(_this4.target, _this4._addAttachClasses, all);
	        }

	        delete _this4._addAttachClasses;
	      });
	    }
	  }, {
	    key: 'position',
	    value: function position() {
	      var _this5 = this;

	      var flushChanges = arguments[0] === undefined ? true : arguments[0];

	      // flushChanges commits the changes immediately, leave true unless you are positioning multiple
	      // tethers (in which case call Tether.Utils.flush yourself when you're done)

	      if (!this.enabled) {
	        return;
	      }

	      this.clearCache();

	      // Turn 'auto' attachments into the appropriate corner or edge
	      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

	      this.updateAttachClasses(this.attachment, targetAttachment);

	      var elementPos = this.cache('element-bounds', function () {
	        return getBounds(_this5.element);
	      });

	      var width = elementPos.width;
	      var height = elementPos.height;

	      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
	        var _lastSize = this.lastSize;

	        // We cache the height and width to make it possible to position elements that are
	        // getting hidden.
	        width = _lastSize.width;
	        height = _lastSize.height;
	      } else {
	        this.lastSize = { width: width, height: height };
	      }

	      var targetPos = this.cache('target-bounds', function () {
	        return _this5.getTargetBounds();
	      });
	      var targetSize = targetPos;

	      // Get an actual px offset from the attachment
	      var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
	      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

	      var manualOffset = offsetToPx(this.offset, { width: width, height: height });
	      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

	      // Add the manually provided offset
	      offset = addOffset(offset, manualOffset);
	      targetOffset = addOffset(targetOffset, manualTargetOffset);

	      // It's now our goal to make (element position + offset) == (target position + target offset)
	      var left = targetPos.left + targetOffset.left - offset.left;
	      var top = targetPos.top + targetOffset.top - offset.top;

	      for (var i = 0; i < TetherBase.modules.length; ++i) {
	        var _module2 = TetherBase.modules[i];
	        var ret = _module2.position.call(this, {
	          left: left,
	          top: top,
	          targetAttachment: targetAttachment,
	          targetPos: targetPos,
	          elementPos: elementPos,
	          offset: offset,
	          targetOffset: targetOffset,
	          manualOffset: manualOffset,
	          manualTargetOffset: manualTargetOffset,
	          scrollbarSize: scrollbarSize,
	          attachment: this.attachment
	        });

	        if (ret === false) {
	          return false;
	        } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
	          continue;
	        } else {
	          top = ret.top;
	          left = ret.left;
	        }
	      }

	      // We describe the position three different ways to give the optimizer
	      // a chance to decide the best possible way to position the element
	      // with the fewest repaints.
	      var next = {
	        // It's position relative to the page (absolute positioning when
	        // the element is a child of the body)
	        page: {
	          top: top,
	          left: left
	        },

	        // It's position relative to the viewport (fixed positioning)
	        viewport: {
	          top: top - pageYOffset,
	          bottom: pageYOffset - top - height + innerHeight,
	          left: left - pageXOffset,
	          right: pageXOffset - left - width + innerWidth
	        }
	      };

	      var scrollbarSize = undefined;
	      if (document.body.scrollWidth > window.innerWidth) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.bottom -= scrollbarSize.height;
	      }

	      if (document.body.scrollHeight > window.innerHeight) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.right -= scrollbarSize.width;
	      }

	      if (['', 'static'].indexOf(document.body.style.position) === -1 || ['', 'static'].indexOf(document.body.parentElement.style.position) === -1) {
	        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
	        next.page.bottom = document.body.scrollHeight - top - height;
	        next.page.right = document.body.scrollWidth - left - width;
	      }

	      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
	        (function () {
	          var offsetParent = _this5.cache('target-offsetparent', function () {
	            return getOffsetParent(_this5.target);
	          });
	          var offsetPosition = _this5.cache('target-offsetparent-bounds', function () {
	            return getBounds(offsetParent);
	          });
	          var offsetParentStyle = getComputedStyle(offsetParent);
	          var offsetParentSize = offsetPosition;

	          var offsetBorder = {};
	          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
	            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
	          });

	          offsetPosition.right = document.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
	          offsetPosition.bottom = document.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

	          if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
	            if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
	              // We're within the visible part of the target's scroll parent
	              var scrollTop = offsetParent.scrollTop;
	              var scrollLeft = offsetParent.scrollLeft;

	              // It's position relative to the target's offset parent (absolute positioning when
	              // the element is moved to be a child of the target's offset parent).
	              next.offset = {
	                top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
	                left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
	              };
	            }
	          }
	        })();
	      }

	      // We could also travel up the DOM and try each containing context, rather than only
	      // looking at the body, but we're gonna get diminishing returns.

	      this.move(next);

	      this.history.unshift(next);

	      if (this.history.length > 3) {
	        this.history.pop();
	      }

	      if (flushChanges) {
	        flush();
	      }

	      return true;
	    }
	  }, {
	    key: 'move',

	    // THE ISSUE
	    value: function move(pos) {
	      var _this6 = this;

	      if (!(typeof this.element.parentNode !== 'undefined')) {
	        return;
	      }

	      var same = {};

	      for (var type in pos) {
	        same[type] = {};

	        for (var key in pos[type]) {
	          var found = false;

	          for (var i = 0; i < this.history.length; ++i) {
	            var point = this.history[i];
	            if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
	              found = true;
	              break;
	            }
	          }

	          if (!found) {
	            same[type][key] = true;
	          }
	        }
	      }

	      var css = { top: '', left: '', right: '', bottom: '' };

	      var transcribe = function transcribe(_same, _pos) {
	        var hasOptimizations = typeof _this6.options.optimizations !== 'undefined';
	        var gpu = hasOptimizations ? _this6.options.optimizations.gpu : null;
	        if (gpu !== false) {
	          var yPos = undefined,
	              xPos = undefined;
	          if (_same.top) {
	            css.top = 0;
	            yPos = _pos.top;
	          } else {
	            css.bottom = 0;
	            yPos = -_pos.bottom;
	          }

	          if (_same.left) {
	            css.left = 0;
	            xPos = _pos.left;
	          } else {
	            css.right = 0;
	            xPos = -_pos.right;
	          }

	          css[transformKey] = 'translateX(' + Math.round(xPos) + 'px) translateY(' + Math.round(yPos) + 'px)';

	          if (transformKey !== 'msTransform') {
	            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
	            // but IE9 doesn't support 3d transforms and will choke.
	            css[transformKey] += ' translateZ(0)';
	          }
	        } else {
	          if (_same.top) {
	            css.top = _pos.top + 'px';
	          } else {
	            css.bottom = _pos.bottom + 'px';
	          }

	          if (_same.left) {
	            css.left = _pos.left + 'px';
	          } else {
	            css.right = _pos.right + 'px';
	          }
	        }
	      };

	      var moved = false;
	      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
	        css.position = 'absolute';
	        transcribe(same.page, pos.page);
	      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
	        css.position = 'fixed';
	        transcribe(same.viewport, pos.viewport);
	      } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
	        (function () {
	          css.position = 'absolute';
	          var offsetParent = _this6.cache('target-offsetparent', function () {
	            return getOffsetParent(_this6.target);
	          });

	          if (getOffsetParent(_this6.element) !== offsetParent) {
	            defer(function () {
	              _this6.element.parentNode.removeChild(_this6.element);
	              offsetParent.appendChild(_this6.element);
	            });
	          }

	          transcribe(same.offset, pos.offset);
	          moved = true;
	        })();
	      } else {
	        css.position = 'absolute';
	        transcribe({ top: true, left: true }, pos.page);
	      }

	      if (!moved && this.element.parentNode.tagName !== 'BODY') {
	        this.element.parentNode.removeChild(this.element);
	        document.body.appendChild(this.element);
	      }

	      // Any css change will trigger a repaint, so let's avoid one if nothing changed
	      var writeCSS = {};
	      var write = false;
	      for (var key in css) {
	        var val = css[key];
	        var elVal = this.element.style[key];

	        if (elVal !== '' && val !== '' && ['top', 'left', 'bottom', 'right'].indexOf(key) >= 0) {
	          elVal = parseFloat(elVal);
	          val = parseFloat(val);
	        }

	        if (elVal !== val) {
	          write = true;
	          writeCSS[key] = val;
	        }
	      }

	      if (write) {
	        defer(function () {
	          extend(_this6.element.style, writeCSS);
	        });
	      }
	    }
	  }]);

	  return TetherClass;
	})();

	TetherClass.modules = [];

	TetherBase.position = position;

	var Tether = extend(TetherClass, TetherBase);
	/* globals TetherBase */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _TetherBase$Utils = TetherBase.Utils;
	var getBounds = _TetherBase$Utils.getBounds;
	var extend = _TetherBase$Utils.extend;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;

	var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

	function getBoundingRect(tether, to) {
	  if (to === 'scrollParent') {
	    to = tether.scrollParent;
	  } else if (to === 'window') {
	    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
	  }

	  if (to === document) {
	    to = to.documentElement;
	  }

	  if (typeof to.nodeType !== 'undefined') {
	    (function () {
	      var size = getBounds(to);
	      var pos = size;
	      var style = getComputedStyle(to);

	      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

	      BOUNDS_FORMAT.forEach(function (side, i) {
	        side = side[0].toUpperCase() + side.substr(1);
	        if (side === 'Top' || side === 'Left') {
	          to[i] += parseFloat(style['border' + side + 'Width']);
	        } else {
	          to[i] -= parseFloat(style['border' + side + 'Width']);
	        }
	      });
	    })();
	  }

	  return to;
	}

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var _this = this;

	    var top = _ref.top;
	    var left = _ref.left;
	    var targetAttachment = _ref.targetAttachment;

	    if (!this.options.constraints) {
	      return true;
	    }

	    var _cache = this.cache('element-bounds', function () {
	      return getBounds(_this.element);
	    });

	    var height = _cache.height;
	    var width = _cache.width;

	    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
	      var _lastSize = this.lastSize;

	      // Handle the item getting hidden as a result of our positioning without glitching
	      // the classes in and out
	      width = _lastSize.width;
	      height = _lastSize.height;
	    }

	    var targetSize = this.cache('target-bounds', function () {
	      return _this.getTargetBounds();
	    });

	    var targetHeight = targetSize.height;
	    var targetWidth = targetSize.width;

	    var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

	    this.options.constraints.forEach(function (constraint) {
	      var outOfBoundsClass = constraint.outOfBoundsClass;
	      var pinnedClass = constraint.pinnedClass;

	      if (outOfBoundsClass) {
	        allClasses.push(outOfBoundsClass);
	      }
	      if (pinnedClass) {
	        allClasses.push(pinnedClass);
	      }
	    });

	    allClasses.forEach(function (cls) {
	      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
	        allClasses.push(cls + '-' + side);
	      });
	    });

	    var addClasses = [];

	    var tAttachment = extend({}, targetAttachment);
	    var eAttachment = extend({}, this.attachment);

	    this.options.constraints.forEach(function (constraint) {
	      var to = constraint.to;
	      var attachment = constraint.attachment;
	      var pin = constraint.pin;

	      if (typeof attachment === 'undefined') {
	        attachment = '';
	      }

	      var changeAttachX = undefined,
	          changeAttachY = undefined;
	      if (attachment.indexOf(' ') >= 0) {
	        var _attachment$split = attachment.split(' ');

	        var _attachment$split2 = _slicedToArray(_attachment$split, 2);

	        changeAttachY = _attachment$split2[0];
	        changeAttachX = _attachment$split2[1];
	      } else {
	        changeAttachX = changeAttachY = attachment;
	      }

	      var bounds = getBoundingRect(_this, to);

	      if (changeAttachY === 'target' || changeAttachY === 'both') {
	        if (top < bounds[1] && tAttachment.top === 'top') {
	          top += targetHeight;
	          tAttachment.top = 'bottom';
	        }

	        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
	          top -= targetHeight;
	          tAttachment.top = 'top';
	        }
	      }

	      if (changeAttachY === 'together') {
	        if (top < bounds[1] && tAttachment.top === 'top') {
	          if (eAttachment.top === 'bottom') {
	            top += targetHeight;
	            tAttachment.top = 'bottom';

	            top += height;
	            eAttachment.top = 'top';
	          } else if (eAttachment.top === 'top') {
	            top += targetHeight;
	            tAttachment.top = 'bottom';

	            top -= height;
	            eAttachment.top = 'bottom';
	          }
	        }

	        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
	          if (eAttachment.top === 'top') {
	            top -= targetHeight;
	            tAttachment.top = 'top';

	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (eAttachment.top === 'bottom') {
	            top -= targetHeight;
	            tAttachment.top = 'top';

	            top += height;
	            eAttachment.top = 'top';
	          }
	        }

	        if (tAttachment.top === 'middle') {
	          if (top + height > bounds[3] && eAttachment.top === 'top') {
	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
	            top += height;
	            eAttachment.top = 'top';
	          }
	        }
	      }

	      if (changeAttachX === 'target' || changeAttachX === 'both') {
	        if (left < bounds[0] && tAttachment.left === 'left') {
	          left += targetWidth;
	          tAttachment.left = 'right';
	        }

	        if (left + width > bounds[2] && tAttachment.left === 'right') {
	          left -= targetWidth;
	          tAttachment.left = 'left';
	        }
	      }

	      if (changeAttachX === 'together') {
	        if (left < bounds[0] && tAttachment.left === 'left') {
	          if (eAttachment.left === 'right') {
	            left += targetWidth;
	            tAttachment.left = 'right';

	            left += width;
	            eAttachment.left = 'left';
	          } else if (eAttachment.left === 'left') {
	            left += targetWidth;
	            tAttachment.left = 'right';

	            left -= width;
	            eAttachment.left = 'right';
	          }
	        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
	          if (eAttachment.left === 'left') {
	            left -= targetWidth;
	            tAttachment.left = 'left';

	            left -= width;
	            eAttachment.left = 'right';
	          } else if (eAttachment.left === 'right') {
	            left -= targetWidth;
	            tAttachment.left = 'left';

	            left += width;
	            eAttachment.left = 'left';
	          }
	        } else if (tAttachment.left === 'center') {
	          if (left + width > bounds[2] && eAttachment.left === 'left') {
	            left -= width;
	            eAttachment.left = 'right';
	          } else if (left < bounds[0] && eAttachment.left === 'right') {
	            left += width;
	            eAttachment.left = 'left';
	          }
	        }
	      }

	      if (changeAttachY === 'element' || changeAttachY === 'both') {
	        if (top < bounds[1] && eAttachment.top === 'bottom') {
	          top += height;
	          eAttachment.top = 'top';
	        }

	        if (top + height > bounds[3] && eAttachment.top === 'top') {
	          top -= height;
	          eAttachment.top = 'bottom';
	        }
	      }

	      if (changeAttachX === 'element' || changeAttachX === 'both') {
	        if (left < bounds[0] && eAttachment.left === 'right') {
	          left += width;
	          eAttachment.left = 'left';
	        }

	        if (left + width > bounds[2] && eAttachment.left === 'left') {
	          left -= width;
	          eAttachment.left = 'right';
	        }
	      }

	      if (typeof pin === 'string') {
	        pin = pin.split(',').map(function (p) {
	          return p.trim();
	        });
	      } else if (pin === true) {
	        pin = ['top', 'left', 'right', 'bottom'];
	      }

	      pin = pin || [];

	      var pinned = [];
	      var oob = [];

	      if (top < bounds[1]) {
	        if (pin.indexOf('top') >= 0) {
	          top = bounds[1];
	          pinned.push('top');
	        } else {
	          oob.push('top');
	        }
	      }

	      if (top + height > bounds[3]) {
	        if (pin.indexOf('bottom') >= 0) {
	          top = bounds[3] - height;
	          pinned.push('bottom');
	        } else {
	          oob.push('bottom');
	        }
	      }

	      if (left < bounds[0]) {
	        if (pin.indexOf('left') >= 0) {
	          left = bounds[0];
	          pinned.push('left');
	        } else {
	          oob.push('left');
	        }
	      }

	      if (left + width > bounds[2]) {
	        if (pin.indexOf('right') >= 0) {
	          left = bounds[2] - width;
	          pinned.push('right');
	        } else {
	          oob.push('right');
	        }
	      }

	      if (pinned.length) {
	        (function () {
	          var pinnedClass = undefined;
	          if (typeof _this.options.pinnedClass !== 'undefined') {
	            pinnedClass = _this.options.pinnedClass;
	          } else {
	            pinnedClass = _this.getClass('pinned');
	          }

	          addClasses.push(pinnedClass);
	          pinned.forEach(function (side) {
	            addClasses.push(pinnedClass + '-' + side);
	          });
	        })();
	      }

	      if (oob.length) {
	        (function () {
	          var oobClass = undefined;
	          if (typeof _this.options.outOfBoundsClass !== 'undefined') {
	            oobClass = _this.options.outOfBoundsClass;
	          } else {
	            oobClass = _this.getClass('out-of-bounds');
	          }

	          addClasses.push(oobClass);
	          oob.forEach(function (side) {
	            addClasses.push(oobClass + '-' + side);
	          });
	        })();
	      }

	      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
	        eAttachment.left = tAttachment.left = false;
	      }
	      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
	        eAttachment.top = tAttachment.top = false;
	      }

	      if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
	        _this.updateAttachClasses(eAttachment, tAttachment);
	      }
	    });

	    defer(function () {
	      if (!(_this.options.addTargetClasses === false)) {
	        updateClasses(_this.target, addClasses, allClasses);
	      }
	      updateClasses(_this.element, addClasses, allClasses);
	    });

	    return { top: top, left: left };
	  }
	});
	/* globals TetherBase */

	'use strict';

	var _TetherBase$Utils = TetherBase.Utils;
	var getBounds = _TetherBase$Utils.getBounds;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var _this = this;

	    var top = _ref.top;
	    var left = _ref.left;

	    var _cache = this.cache('element-bounds', function () {
	      return getBounds(_this.element);
	    });

	    var height = _cache.height;
	    var width = _cache.width;

	    var targetPos = this.getTargetBounds();

	    var bottom = top + height;
	    var right = left + width;

	    var abutted = [];
	    if (top <= targetPos.bottom && bottom >= targetPos.top) {
	      ['left', 'right'].forEach(function (side) {
	        var targetPosSide = targetPos[side];
	        if (targetPosSide === left || targetPosSide === right) {
	          abutted.push(side);
	        }
	      });
	    }

	    if (left <= targetPos.right && right >= targetPos.left) {
	      ['top', 'bottom'].forEach(function (side) {
	        var targetPosSide = targetPos[side];
	        if (targetPosSide === top || targetPosSide === bottom) {
	          abutted.push(side);
	        }
	      });
	    }

	    var allClasses = [];
	    var addClasses = [];

	    var sides = ['left', 'top', 'right', 'bottom'];
	    allClasses.push(this.getClass('abutted'));
	    sides.forEach(function (side) {
	      allClasses.push(_this.getClass('abutted') + '-' + side);
	    });

	    if (abutted.length) {
	      addClasses.push(this.getClass('abutted'));
	    }

	    abutted.forEach(function (side) {
	      addClasses.push(_this.getClass('abutted') + '-' + side);
	    });

	    defer(function () {
	      if (!(_this.options.addTargetClasses === false)) {
	        updateClasses(_this.target, addClasses, allClasses);
	      }
	      updateClasses(_this.element, addClasses, allClasses);
	    });

	    return true;
	  }
	});
	/* globals TetherBase */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var top = _ref.top;
	    var left = _ref.left;

	    if (!this.options.shift) {
	      return;
	    }

	    var shift = this.options.shift;
	    if (typeof this.options.shift === 'function') {
	      shift = this.options.shift.call(this, { top: top, left: left });
	    }

	    var shiftTop = undefined,
	        shiftLeft = undefined;
	    if (typeof shift === 'string') {
	      shift = shift.split(' ');
	      shift[1] = shift[1] || shift[0];

	      var _shift = _slicedToArray(shift, 2);

	      shiftTop = _shift[0];
	      shiftLeft = _shift[1];

	      shiftTop = parseFloat(shiftTop, 10);
	      shiftLeft = parseFloat(shiftLeft, 10);
	    } else {
	      shiftTop = shift.top;
	      shiftLeft = shift.left;
	    }

	    top += shiftTop;
	    left += shiftLeft;

	    return { top: top, left: left };
	  }
	});
	return Tether;

	}));


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	riot.tag2('gb-filter', '<select class="gb-navigation-dropdown {opts.style()}" name="navigationDropdown" onchange="{navigate}" placeholder="{title}"> <option if="{opts.matchAll}" value="*">{opts.matchAll}</option> <option each="{navigation.refinements}" value="{value}" data-count="{count}" __selected="{value === selectedRefinement().value}">{value}</option> </select>', 'gb-filter .gb-stylish .gb-ref__badge,[riot-tag="gb-filter"] .gb-stylish .gb-ref__badge,[data-is="gb-filter"] .gb-stylish .gb-ref__badge{ display: inline-block; min-width: 10px; max-height: 12px; padding: 3px 7px; border-radius: 10px; font-size: 12px; font-weight: bold; line-height: 1; color: #fff; background-color: #ccc; text-align: center; white-space: nowrap; vertical-align: middle; }', '', function (opts) {
	  var _this = this;

	  var navField = opts.field;
	  var utils = __webpack_require__(43);
	  var flux = opts.clone();
	  var isTargetNav = function isTargetNav(nav) {
	    return nav.name === navField;
	  };

	  this.selectedRefinement = function () {
	    return _this.selected ? _this.selected.refinements[0] : {};
	  };
	  this.navigate = function (event) {
	    if (_this.selected) opts.flux.unrefine(utils.toRefinement(_this.selectedRefinement(), _this.selected), { skipSearch: true });
	    if (event.target.value === '*') {
	      opts.flux.reset();
	    } else {
	      opts.flux.refine({ navigationName: navField, type: 'Value', value: event.target.value });
	    }
	  };

	  opts.flux.on(opts.flux.RESULTS, function (res) {
	    var _flux$query;

	    var searchRequest = opts.flux.query.build();
	    flux.query.withConfiguration({ refinements: [] });
	    if (searchRequest.refinements) (_flux$query = flux.query).withSelectedRefinements.apply(_flux$query, _toConsumableArray(searchRequest.refinements.filter(function (ref) {
	      return ref.navigationName !== navField;
	    })));
	    flux.search(searchRequest.query).then(function (res) {
	      return _this.update({ navigation: res.availableNavigation.find(isTargetNav) });
	    });
	    _this.update({ selected: res.selectedNavigation.find(isTargetNav) });
	  });

	  if (!opts.native) {
	    __webpack_require__(79);
	    this.on('mount', function () {
	      return new (__webpack_require__(83))({ el: _this.navigationDropdown });
	    });
	  }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44)))

/***/ }
/******/ ]);