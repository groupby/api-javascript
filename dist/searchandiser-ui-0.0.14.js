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
	__webpack_require__(96);
	if (!window['searchandiser']) {
	    window['searchandiser'] = searchandiser_1.initSearchandiser();
	}


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var groupby_api_1 = __webpack_require__(2);
	var utils_1 = __webpack_require__(93);
	var riot = __webpack_require__(94);
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
	/// <reference path="../custom_typings/filter-object.d.ts"/>
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

	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDZDQUE2QztBQUM3Qyw0REFBNEQ7Ozs7O0FBRTVELE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNsQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7QUFFbkMsaUJBQWMsY0FBYyxDQUFDLEVBQUE7QUFDN0IsaUJBQWMsZUFBZSxDQUFDLEVBQUE7QUFDOUIsaUJBQWMsbUJBQW1CLENBQUMsRUFBQTtBQUNsQyxpQkFBYyxtQkFBbUIsQ0FBQyxFQUFBO0FBQ2xDLGlCQUFjLGtCQUFrQixDQUFDLEVBQUE7QUFDQyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi90eXBpbmdzL2luZGV4LmQudHNcIi8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY3VzdG9tX3R5cGluZ3MvZmlsdGVyLW9iamVjdC5kLnRzXCIvPlxuXG5yZXF1aXJlKCdlczYtcHJvbWlzZScpLnBvbHlmaWxsKCk7XG5yZXF1aXJlKCcuL3BvbHlmaWxscycpLnBvbGx5ZmlsbCgpO1xuXG5leHBvcnQgKiBmcm9tICcuL2NvcmUvcXVlcnknO1xuZXhwb3J0ICogZnJvbSAnLi9jb3JlL2JyaWRnZSc7XG5leHBvcnQgKiBmcm9tICcuL2NhcGFjaXRvci9pbmRleCc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL2NvbnZlcnRlcic7XG5leHBvcnQgKiBmcm9tICcuL21vZGVscy9yZXF1ZXN0JztcbmV4cG9ydCAqIGZyb20gJy4vbW9kZWxzL3Jlc3BvbnNlJztcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==


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
	    Query.prototype.withoutSorts = function () {
	        var sorts = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            sorts[_i - 0] = arguments[_i];
	        }
	        this.request.sort = this.request.sort.filter(function (oldSort) { return sorts.findIndex(function (sort) { return sort.field === oldSort.field; }) === -1; });
	        return this;
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
	    Object.defineProperty(Query.prototype, "raw", {
	        get: function () {
	            return Object.assign(new request_1.Request(), this.request);
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
	        var builtRequest = this.raw;
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

	//# sourceMappingURL=data:application/json;base64,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QztJQUVPLGdDQUFnQixHQUF4QixVQUF5QixPQUFnQjtRQUN2QyxHQUFHLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxLQUFLLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QixDQUFDO1FBQ0gsQ0FBQztRQUNELE1BQU0sQ0FBQyxPQUFPLENBQUM7SUFDakIsQ0FBQztJQUVILFlBQUM7QUFBRCxDQTFNQSxBQTBNQyxJQUFBO0FBMU1ZLGFBQUssUUEwTWpCLENBQUEiLCJmaWxlIjoiY29yZS9xdWVyeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBxcyA9IHJlcXVpcmUoJ3FzJyk7XG5pbXBvcnQgZGVlcEVxbCA9IHJlcXVpcmUoJ2RlZXAtZXF1YWwnKTtcbmltcG9ydCB7XG4gIFJlcXVlc3QsXG4gIFNlbGVjdGVkVmFsdWVSZWZpbmVtZW50LFxuICBTZWxlY3RlZFJhbmdlUmVmaW5lbWVudCxcbiAgU2VsZWN0ZWRSZWZpbmVtZW50LFxuICBDdXN0b21VcmxQYXJhbSxcbiAgUmVzdHJpY3ROYXZpZ2F0aW9uLFxuICBTb3J0LFxuICBNYXRjaFN0cmF0ZWd5LFxuICBCaWFzaW5nLFxuICBCaWFzXG59IGZyb20gJy4uL21vZGVscy9yZXF1ZXN0JztcbmltcG9ydCB7XG4gIFJlc3VsdHMsXG4gIFJlY29yZCxcbiAgVmFsdWVSZWZpbmVtZW50LFxuICBSYW5nZVJlZmluZW1lbnQsXG4gIFJlZmluZW1lbnQsXG4gIFJlZmluZW1lbnRUeXBlLFxuICBOYXZpZ2F0aW9uXG59IGZyb20gJy4uL21vZGVscy9yZXNwb25zZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uQ29udmVydGVyIH0gZnJvbSAnLi4vdXRpbHMvY29udmVydGVyJztcblxuZXhwb3J0IGludGVyZmFjZSBRdWVyeUNvbmZpZ3VyYXRpb24ge1xuICB1c2VySWQ/OiBzdHJpbmc7XG4gIGxhbmd1YWdlPzogc3RyaW5nO1xuICBjb2xsZWN0aW9uPzogc3RyaW5nO1xuICBhcmVhPzogc3RyaW5nO1xuICBiaWFzaW5nUHJvZmlsZT86IHN0cmluZztcbiAgcGFnZVNpemU/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBjbGFzcyBRdWVyeSB7XG4gIHByaXZhdGUgcmVxdWVzdDogUmVxdWVzdDtcbiAgcHJpdmF0ZSB1bnByb2Nlc3NlZE5hdmlnYXRpb25zOiBOYXZpZ2F0aW9uW107XG4gIHF1ZXJ5UGFyYW1zOiBhbnk7XG5cbiAgY29uc3RydWN0b3IocXVlcnk6IHN0cmluZyA9ICcnKSB7XG4gICAgdGhpcy5yZXF1ZXN0ID0gPFJlcXVlc3Q+e307XG4gICAgdGhpcy51bnByb2Nlc3NlZE5hdmlnYXRpb25zID0gW107XG4gICAgdGhpcy5xdWVyeVBhcmFtcyA9IHt9O1xuXG4gICAgdGhpcy5yZXF1ZXN0LnF1ZXJ5ID0gcXVlcnk7XG4gICAgdGhpcy5yZXF1ZXN0LnNvcnQgPSBbXTtcbiAgICB0aGlzLnJlcXVlc3QuZmllbGRzID0gW107XG4gICAgdGhpcy5yZXF1ZXN0Lm9yRmllbGRzID0gW107XG4gICAgdGhpcy5yZXF1ZXN0LnJlZmluZW1lbnRzID0gW107XG4gICAgdGhpcy5yZXF1ZXN0LmN1c3RvbVVybFBhcmFtcyA9IFtdO1xuICAgIHRoaXMucmVxdWVzdC5pbmNsdWRlZE5hdmlnYXRpb25zID0gW107XG4gICAgdGhpcy5yZXF1ZXN0LmV4Y2x1ZGVkTmF2aWdhdGlvbnMgPSBbXTtcblxuICAgIHRoaXMucmVxdWVzdC53aWxkY2FyZFNlYXJjaEVuYWJsZWQgPSBmYWxzZTtcbiAgICB0aGlzLnJlcXVlc3QucHJ1bmVSZWZpbmVtZW50cyA9IHRydWU7XG4gIH1cblxuICB3aXRoUXVlcnkocXVlcnk6IHN0cmluZyk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QucXVlcnkgPSBxdWVyeTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhDb25maWd1cmF0aW9uKGNvbmZpZ3VyYXRpb246IFF1ZXJ5Q29uZmlndXJhdGlvbik6IFF1ZXJ5IHtcbiAgICBPYmplY3QuYXNzaWduKHRoaXMucmVxdWVzdCwgY29uZmlndXJhdGlvbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoU2VsZWN0ZWRSZWZpbmVtZW50cyguLi5yZWZpbmVtZW50czogQXJyYXk8U2VsZWN0ZWRWYWx1ZVJlZmluZW1lbnQgfCBTZWxlY3RlZFJhbmdlUmVmaW5lbWVudD4pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LnJlZmluZW1lbnRzLnB1c2goLi4ucmVmaW5lbWVudHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aG91dFNlbGVjdGVkUmVmaW5lbWVudHMoLi4ucmVmaW5lbWVudHM6IEFycmF5PFNlbGVjdGVkVmFsdWVSZWZpbmVtZW50IHwgU2VsZWN0ZWRSYW5nZVJlZmluZW1lbnQ+KTogUXVlcnkge1xuICAgIHJlZmluZW1lbnRzLmZvckVhY2gocmVmaW5lbWVudCA9PiB7XG4gICAgICBjb25zdCBpbmRleCA9IHRoaXMucmVxdWVzdC5yZWZpbmVtZW50cy5maW5kSW5kZXgocmVmID0+IGRlZXBFcWwocmVmLCByZWZpbmVtZW50KSk7XG4gICAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5yZXF1ZXN0LnJlZmluZW1lbnRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoUmVmaW5lbWVudHMobmF2aWdhdGlvbk5hbWU6IHN0cmluZywgLi4ucmVmaW5lbWVudHM6IEFycmF5PFZhbHVlUmVmaW5lbWVudCB8IFJhbmdlUmVmaW5lbWVudD4pOiBRdWVyeSB7XG4gICAgY29uc3QgY29udmVydCA9IChyZWZpbmVtZW50OiBSZWZpbmVtZW50KSA9PiA8U2VsZWN0ZWRSZWZpbmVtZW50Pk9iamVjdC5hc3NpZ24ocmVmaW5lbWVudCwgeyBuYXZpZ2F0aW9uTmFtZSB9KTtcbiAgICB0aGlzLnJlcXVlc3QucmVmaW5lbWVudHMucHVzaCguLi5yZWZpbmVtZW50cy5tYXAoY29udmVydCkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aE5hdmlnYXRpb25zKC4uLm5hdmlnYXRpb25zOiBOYXZpZ2F0aW9uW10pOiBRdWVyeSB7XG4gICAgdGhpcy51bnByb2Nlc3NlZE5hdmlnYXRpb25zLnB1c2goLi4ubmF2aWdhdGlvbnMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aEN1c3RvbVVybFBhcmFtcyhjdXN0b21VcmxQYXJhbXM6IEN1c3RvbVVybFBhcmFtW10gfCBzdHJpbmcpOiBRdWVyeSB7XG4gICAgaWYgKHR5cGVvZiBjdXN0b21VcmxQYXJhbXMgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnJlcXVlc3QuY3VzdG9tVXJsUGFyYW1zLnB1c2goLi4udGhpcy5jb252ZXJ0UGFyYW1TdHJpbmcoY3VzdG9tVXJsUGFyYW1zKSk7XG4gICAgfSBlbHNlIGlmIChjdXN0b21VcmxQYXJhbXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgdGhpcy5yZXF1ZXN0LmN1c3RvbVVybFBhcmFtcy5wdXNoKC4uLmN1c3RvbVVybFBhcmFtcyk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgcHJpdmF0ZSBjb252ZXJ0UGFyYW1TdHJpbmcoY3VzdG9tVXJsUGFyYW1zOiBzdHJpbmcpOiBDdXN0b21VcmxQYXJhbVtdIHtcbiAgICBjb25zdCBwYXJzZWQgPSBxcy5wYXJzZShjdXN0b21VcmxQYXJhbXMpO1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhwYXJzZWQpLnJlZHVjZSgoY29udmVydGVkLCBrZXkpID0+IGNvbnZlcnRlZC5jb25jYXQoeyBrZXksIHZhbHVlOiBwYXJzZWRba2V5XSB9KSwgW10pO1xuICB9XG5cbiAgd2l0aEZpZWxkcyguLi5maWVsZHM6IHN0cmluZ1tdKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5maWVsZHMucHVzaCguLi5maWVsZHMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aE9yRmllbGRzKC4uLm9yRmllbGRzOiBzdHJpbmdbXSk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3Qub3JGaWVsZHMucHVzaCguLi5vckZpZWxkcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoU29ydHMoLi4uc29ydHM6IFNvcnRbXSk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3Quc29ydC5wdXNoKC4uLnNvcnRzKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhvdXRTb3J0cyguLi5zb3J0czogU29ydFtdKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5zb3J0ID0gdGhpcy5yZXF1ZXN0LnNvcnQuZmlsdGVyKG9sZFNvcnQgPT4gc29ydHMuZmluZEluZGV4KHNvcnQgPT4gc29ydC5maWVsZCA9PT0gb2xkU29ydC5maWVsZCkgPT09IC0xKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhJbmNsdWRlZE5hdmlnYXRpb25zKC4uLm5hdmlnYXRpb25OYW1lczogc3RyaW5nW10pOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LmluY2x1ZGVkTmF2aWdhdGlvbnMucHVzaCguLi5uYXZpZ2F0aW9uTmFtZXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aEV4Y2x1ZGVkTmF2aWdhdGlvbnMoLi4ubmF2aWdhdGlvbk5hbWVzOiBzdHJpbmdbXSk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QuZXhjbHVkZWROYXZpZ2F0aW9ucy5wdXNoKC4uLm5hdmlnYXRpb25OYW1lcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoUXVlcnlQYXJhbXMocXVlcnlQYXJhbXM6IGFueSB8IHN0cmluZyk6IFF1ZXJ5IHtcbiAgICBzd2l0Y2ggKHR5cGVvZiBxdWVyeVBhcmFtcykge1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24odGhpcywgeyBxdWVyeVBhcmFtczogdGhpcy5jb252ZXJ0UXVlcnlTdHJpbmcoPHN0cmluZz5xdWVyeVBhcmFtcykgfSk7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih0aGlzLCB7IHF1ZXJ5UGFyYW1zIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY29udmVydFF1ZXJ5U3RyaW5nKHF1ZXJ5UGFyYW1zOiBzdHJpbmcpOiBhbnkge1xuICAgIHJldHVybiBxcy5wYXJzZShxdWVyeVBhcmFtcyk7XG4gIH1cblxuICByZWZpbmVCeVZhbHVlKG5hdmlnYXRpb25OYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGV4Y2x1ZGU6IGJvb2xlYW4gPSBmYWxzZSk6IFF1ZXJ5IHtcbiAgICByZXR1cm4gdGhpcy53aXRoU2VsZWN0ZWRSZWZpbmVtZW50cyg8U2VsZWN0ZWRWYWx1ZVJlZmluZW1lbnQ+e1xuICAgICAgbmF2aWdhdGlvbk5hbWUsXG4gICAgICB2YWx1ZSxcbiAgICAgIGV4Y2x1ZGUsXG4gICAgICB0eXBlOiAnVmFsdWUnXG4gICAgfSk7XG4gIH1cblxuICByZWZpbmVCeVJhbmdlKG5hdmlnYXRpb25OYW1lOiBzdHJpbmcsIGxvdzogbnVtYmVyLCBoaWdoOiBudW1iZXIsIGV4Y2x1ZGU6IGJvb2xlYW4gPSBmYWxzZSk6IFF1ZXJ5IHtcbiAgICByZXR1cm4gdGhpcy53aXRoU2VsZWN0ZWRSZWZpbmVtZW50cyg8U2VsZWN0ZWRSYW5nZVJlZmluZW1lbnQ+e1xuICAgICAgbmF2aWdhdGlvbk5hbWUsXG4gICAgICBsb3csXG4gICAgICBoaWdoLFxuICAgICAgZXhjbHVkZSxcbiAgICAgIHR5cGU6ICdSYW5nZSdcbiAgICB9KTtcbiAgfVxuXG4gIHJlc3RyaWN0TmF2aWdhdGlvbihyZXN0cmljdE5hdmlnYXRpb246IFJlc3RyaWN0TmF2aWdhdGlvbik6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QucmVzdHJpY3ROYXZpZ2F0aW9uID0gcmVzdHJpY3ROYXZpZ2F0aW9uO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2tpcChza2lwOiBudW1iZXIpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LnNraXAgPSBza2lwO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgd2l0aFBhZ2VTaXplKHBhZ2VTaXplOiBudW1iZXIpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LnBhZ2VTaXplID0gcGFnZVNpemU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICB3aXRoTWF0Y2hTdHJhdGVneShtYXRjaFN0cmF0ZWd5OiBNYXRjaFN0cmF0ZWd5KTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC5tYXRjaFN0cmF0ZWd5ID0gbWF0Y2hTdHJhdGVneTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHdpdGhCaWFzaW5nKGJpYXNpbmc6IEJpYXNpbmcpOiBRdWVyeSB7XG4gICAgdGhpcy5yZXF1ZXN0LmJpYXNpbmcgPSBiaWFzaW5nO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZW5hYmxlV2lsZGNhcmRTZWFyY2goKTogUXVlcnkge1xuICAgIHRoaXMucmVxdWVzdC53aWxkY2FyZFNlYXJjaEVuYWJsZWQgPSB0cnVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZGlzYWJsZUF1dG9jb3JyZWN0aW9uKCk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QuZGlzYWJsZUF1dG9jb3JyZWN0aW9uID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRpc2FibGVCaW5hcnlQYXlsb2FkKCk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QucmV0dXJuQmluYXJ5ID0gZmFsc2U7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBhbGxvd1BydW5lZFJlZmluZW1lbnRzKCk6IFF1ZXJ5IHtcbiAgICB0aGlzLnJlcXVlc3QucHJ1bmVSZWZpbmVtZW50cyA9IGZhbHNlO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZ2V0IHJhdygpOiBSZXF1ZXN0IHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihuZXcgUmVxdWVzdCgpLCB0aGlzLnJlcXVlc3QpO1xuICB9XG5cbiAgZ2V0IHJhd05hdmlnYXRpb25zKCk6IE5hdmlnYXRpb25bXSB7XG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUodGhpcy51bnByb2Nlc3NlZE5hdmlnYXRpb25zKTtcbiAgfVxuXG4gIGJ1aWxkKCk6IFJlcXVlc3Qge1xuICAgIGNvbnN0IGJ1aWx0UmVxdWVzdCA9IHRoaXMucmF3O1xuICAgIGJ1aWx0UmVxdWVzdC5yZWZpbmVtZW50cy5wdXNoKC4uLk5hdmlnYXRpb25Db252ZXJ0ZXIuY29udmVydCh0aGlzLnVucHJvY2Vzc2VkTmF2aWdhdGlvbnMpKTtcblxuICAgIHJldHVybiB0aGlzLmNsZWFyRW1wdHlBcnJheXMoYnVpbHRSZXF1ZXN0KTtcbiAgfVxuXG4gIHByaXZhdGUgY2xlYXJFbXB0eUFycmF5cyhyZXF1ZXN0OiBSZXF1ZXN0KTogUmVxdWVzdCB7XG4gICAgZm9yIChsZXQga2V5IGluIHJlcXVlc3QpIHtcbiAgICAgIGlmIChyZXF1ZXN0W2tleV0gaW5zdGFuY2VvZiBBcnJheSAmJiByZXF1ZXN0W2tleV0ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGRlbGV0ZSByZXF1ZXN0W2tleV07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXF1ZXN0O1xuICB9XG5cbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==


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

	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZGVscy9yZXF1ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQTtJQUFBO0lBZ0NBLENBQUM7SUFBRCxjQUFDO0FBQUQsQ0FoQ0EsQUFnQ0MsSUFBQTtBQWhDWSxlQUFPLFVBZ0NuQixDQUFBIiwiZmlsZSI6Im1vZGVscy9yZXF1ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVmaW5lbWVudCwgUmVmaW5lbWVudFR5cGUsIFZhbHVlUmVmaW5lbWVudCwgUmFuZ2VSZWZpbmVtZW50IH0gZnJvbSAnLi9yZXNwb25zZSc7XG5cbmV4cG9ydCBjbGFzcyBSZXF1ZXN0IHtcbiAgLy8gcXVlcnkgcGFyYW1ldGVyc1xuICBxdWVyeTogc3RyaW5nO1xuICByZWZpbmVtZW50czogU2VsZWN0ZWRSZWZpbmVtZW50W107XG5cbiAgLy8gcXVlcnkgY29uZmlndXJhdGlvblxuICBmaWVsZHM6IHN0cmluZ1tdO1xuICBvckZpZWxkczogc3RyaW5nW107XG4gIGluY2x1ZGVkTmF2aWdhdGlvbnM6IHN0cmluZ1tdO1xuICBleGNsdWRlZE5hdmlnYXRpb25zOiBzdHJpbmdbXTtcbiAgc29ydDogU29ydFtdO1xuICBjdXN0b21VcmxQYXJhbXM6IEN1c3RvbVVybFBhcmFtW107XG4gIHJlc3RyaWN0TmF2aWdhdGlvbjogUmVzdHJpY3ROYXZpZ2F0aW9uO1xuICBiaWFzaW5nOiBCaWFzaW5nO1xuICBtYXRjaFN0cmF0ZWd5OiBNYXRjaFN0cmF0ZWd5O1xuXG4gIC8vIGNvbmZpZ3VyYXRpb25cbiAgdXNlcklkOiBzdHJpbmc7XG4gIGxhbmd1YWdlOiBzdHJpbmc7XG4gIGNvbGxlY3Rpb246IHN0cmluZztcbiAgYXJlYTogc3RyaW5nO1xuICBiaWFzaW5nUHJvZmlsZTogc3RyaW5nO1xuXG4gIC8vIHBhZ2luZ1xuICBza2lwOiBudW1iZXI7XG4gIHBhZ2VTaXplOiBudW1iZXI7XG5cbiAgLy8gZm9ybWF0XG4gIHJldHVybkJpbmFyeTogYm9vbGVhbjtcbiAgcHJ1bmVSZWZpbmVtZW50czogYm9vbGVhbjtcbiAgZGlzYWJsZUF1dG9jb3JyZWN0aW9uOiBib29sZWFuO1xuICB3aWxkY2FyZFNlYXJjaEVuYWJsZWQ6IGJvb2xlYW47XG59XG5cbmV4cG9ydCB0eXBlIFNvcnRPcmRlciA9ICdBc2NlbmRpbmcnIHwgJ0Rlc2NlbmRpbmcnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNvcnQge1xuICBmaWVsZDogc3RyaW5nO1xuICBvcmRlcjogU29ydE9yZGVyO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbVVybFBhcmFtIHtcbiAga2V5OiBzdHJpbmc7XG4gIHZhbHVlOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0ZWRSZWZpbmVtZW50IGV4dGVuZHMgUmVmaW5lbWVudCB7XG4gIG5hdmlnYXRpb25OYW1lOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0ZWRSYW5nZVJlZmluZW1lbnQgZXh0ZW5kcyBTZWxlY3RlZFJlZmluZW1lbnQsIFJhbmdlUmVmaW5lbWVudCB7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VsZWN0ZWRWYWx1ZVJlZmluZW1lbnQgZXh0ZW5kcyBTZWxlY3RlZFJlZmluZW1lbnQsIFZhbHVlUmVmaW5lbWVudCB7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVzdHJpY3ROYXZpZ2F0aW9uIHtcbiAgbmFtZTogc3RyaW5nO1xuICBjb3VudDogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBCaWFzU3RyZW5ndGggPSAnQWJzb2x1dGVfSW5jcmVhc2UnIHwgJ1N0cm9uZ19JbmNyZWFzZScgfFxuICAnTWVkaXVtX0luY3JlYXNlJyB8ICdXZWFrX0luY3JlYXNlJyB8ICdMZWF2ZV9VbmNoYW5nZWQnIHwgJ1dlYWtfRGVjcmVhc2UnIHxcbiAgJ01lZGl1bV9EZWNyZWFzZScgfCAnU3Ryb25nX0RlY3JlYXNlJyB8ICdBYnNvbHV0ZV9EZWNyZWFzZSc7XG5cblxuZXhwb3J0IGludGVyZmFjZSBCaWFzIHtcbiAgbmFtZTogc3RyaW5nO1xuICBjb250ZW50Pzogc3RyaW5nO1xuICBzdHJlbmd0aDogQmlhc1N0cmVuZ3RoO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJpYXNpbmcge1xuICBicmluZ1RvVG9wPzogc3RyaW5nW107XG4gIGF1Z21lbnRCaWFzZXM6IGJvb2xlYW47XG4gIGJpYXNlczogQmlhc1tdO1xuICBpbmZsdWVuY2U/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFydGlhbE1hdGNoUnVsZSB7XG4gIHRlcm1zPzogbnVtYmVyO1xuICB0ZXJtc0dyZWF0ZXJUaGFuPzogbnVtYmVyO1xuICBtdXN0TWF0Y2g/OiBudW1iZXI7XG4gIHBlcmNlbnRhZ2U/OiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1hdGNoU3RyYXRlZ3kge1xuICBydWxlczogUGFydGlhbE1hdGNoUnVsZVtdO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9


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
	var filterObject = __webpack_require__(42);
	var query_1 = __webpack_require__(10);
	var bridge_1 = __webpack_require__(20);
	var pager_1 = __webpack_require__(92);
	exports.Pager = pager_1.Pager;
	var Events;
	(function (Events) {
	    Events.RESULTS = 'results';
	    Events.REFINEMENTS_CHANGED = 'refinements_changed';
	    Events.RESET = 'reset';
	    Events.REWRITE_QUERY = 'rewrite_query';
	    Events.SORT = 'sort';
	    Events.DETAILS = 'details';
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
	        this.query = new query_1.Query().withConfiguration(this.filteredRequest);
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
	    FluxCapacitor.prototype.sort = function (sort) {
	        this.query.withoutSorts(sort).withSorts(sort);
	        return this.search();
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
	    FluxCapacitor.prototype.details = function (id) {
	        var _this = this;
	        return this.bridge.search(new query_1.Query().withSelectedRefinements({ navigationName: 'id', type: 'Value', value: id }))
	            .then(function (res) {
	            if (res.records.length)
	                _this.emit(Events.DETAILS, res.records[0]);
	            return res;
	        });
	    };
	    Object.defineProperty(FluxCapacitor.prototype, "filteredRequest", {
	        get: function () {
	            return filterObject(this.query.raw, '!{query,refinements}');
	        },
	        enumerable: true,
	        configurable: true
	    });
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

	//# sourceMappingURL=data:application/json;base64,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QUFDLEtBQUssQ0FBQzthQUNsQyxJQUFJLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLEtBQUksQ0FBQyxjQUFjLENBQUMsRUFBMUQsQ0FBMEQsQ0FBQzthQUN0RSxJQUFJLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxjQUFjLEVBQW5CLENBQW1CLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsc0JBQVkseUNBQWM7YUFBMUI7WUFDRSxNQUFNLENBQUM7Z0JBQ0wsU0FBUyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsbUJBQW1CO2dCQUMzQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0I7YUFDMUMsQ0FBQztRQUNKLENBQUM7OztPQUFBO0lBQ0gsb0JBQUM7QUFBRCxDQTNGQSxBQTJGQyxDQTNGa0MsWUFBWSxHQTJGOUM7QUEzRlkscUJBQWEsZ0JBMkZ6QixDQUFBIiwiZmlsZSI6ImNhcGFjaXRvci9pbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIzJyk7XG5pbXBvcnQgZmlsdGVyT2JqZWN0ID0gcmVxdWlyZSgnZmlsdGVyLW9iamVjdCcpO1xuaW1wb3J0IHsgUXVlcnksIFF1ZXJ5Q29uZmlndXJhdGlvbiB9IGZyb20gJy4uL2NvcmUvcXVlcnknO1xuaW1wb3J0IHsgQnJvd3NlckJyaWRnZSB9IGZyb20gJy4uL2NvcmUvYnJpZGdlJztcbmltcG9ydCB7IFJlc3VsdHMsIE5hdmlnYXRpb24gfSBmcm9tICcuLi9tb2RlbHMvcmVzcG9uc2UnO1xuaW1wb3J0IHsgUGFnZXIgfSBmcm9tICcuL3BhZ2VyJztcbmltcG9ydCB7IFNlbGVjdGVkVmFsdWVSZWZpbmVtZW50LCBTZWxlY3RlZFJhbmdlUmVmaW5lbWVudCwgU29ydCB9IGZyb20gJy4uL21vZGVscy9yZXF1ZXN0JztcblxuZXhwb3J0IG5hbWVzcGFjZSBFdmVudHMge1xuICBleHBvcnQgY29uc3QgUkVTVUxUUyA9ICdyZXN1bHRzJztcbiAgZXhwb3J0IGNvbnN0IFJFRklORU1FTlRTX0NIQU5HRUQgPSAncmVmaW5lbWVudHNfY2hhbmdlZCc7XG4gIGV4cG9ydCBjb25zdCBSRVNFVCA9ICdyZXNldCc7XG4gIGV4cG9ydCBjb25zdCBSRVdSSVRFX1FVRVJZID0gJ3Jld3JpdGVfcXVlcnknO1xuICBleHBvcnQgY29uc3QgU09SVCA9ICdzb3J0JztcbiAgZXhwb3J0IGNvbnN0IERFVEFJTFMgPSAnZGV0YWlscyc7XG59XG5cbmV4cG9ydCB7IFBhZ2VyIH07XG5leHBvcnQgdHlwZSBGbHV4UmVmaW5lbWVudCA9IFNlbGVjdGVkVmFsdWVSZWZpbmVtZW50IHwgU2VsZWN0ZWRSYW5nZVJlZmluZW1lbnQ7XG5cbmV4cG9ydCBjbGFzcyBGbHV4Q2FwYWNpdG9yIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgcHJpdmF0ZSBvcmlnaW5hbFF1ZXJ5OiBzdHJpbmcgPSAnJztcbiAgcXVlcnk6IFF1ZXJ5O1xuICBicmlkZ2U6IEJyb3dzZXJCcmlkZ2U7XG4gIHJlc3VsdHM6IFJlc3VsdHM7XG5cbiAgY29uc3RydWN0b3IoZW5kcG9pbnQ6IHN0cmluZywgY29uZmlnOiBRdWVyeUNvbmZpZ3VyYXRpb24gJiBhbnkgPSB7fSkge1xuICAgIHN1cGVyKCk7XG4gICAgdGhpcy5icmlkZ2UgPSBuZXcgQnJvd3NlckJyaWRnZShlbmRwb2ludCk7XG4gICAgdGhpcy5xdWVyeSA9IG5ldyBRdWVyeSgpLndpdGhDb25maWd1cmF0aW9uKGNvbmZpZyk7XG4gIH1cblxuICBnZXQgcGFnZSgpIHtcbiAgICByZXR1cm4gbmV3IFBhZ2VyKHRoaXMpO1xuICB9XG5cbiAgc2VhcmNoKHF1ZXJ5OiBzdHJpbmcgPSB0aGlzLm9yaWdpbmFsUXVlcnkpOiBQcm9taXNlPFJlc3VsdHM+IHtcbiAgICByZXR1cm4gdGhpcy5icmlkZ2Uuc2VhcmNoKHRoaXMucXVlcnkud2l0aFF1ZXJ5KHF1ZXJ5KSlcbiAgICAgIC50aGVuKHJlcyA9PiB7XG4gICAgICAgIHRoaXMucmVzdWx0cyA9IHJlcztcbiAgICAgICAgdGhpcy5vcmlnaW5hbFF1ZXJ5ID0gcXVlcnk7XG4gICAgICAgIHRoaXMuZW1pdChFdmVudHMuUkVTVUxUUywgcmVzKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0pO1xuICB9XG5cbiAgcmV3cml0ZShxdWVyeTogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5zZWFyY2gocXVlcnkpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLmVtaXQoRXZlbnRzLlJFV1JJVEVfUVVFUlksIHF1ZXJ5KSlcbiAgICAgIC50aGVuKCgpID0+IHF1ZXJ5KTtcbiAgfVxuXG4gIHJlc2V0KHF1ZXJ5OiBzdHJpbmcgPSB0aGlzLm9yaWdpbmFsUXVlcnkpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHRoaXMucXVlcnkgPSBuZXcgUXVlcnkoKS53aXRoQ29uZmlndXJhdGlvbih0aGlzLmZpbHRlcmVkUmVxdWVzdCk7XG4gICAgcmV0dXJuIHRoaXMuc2VhcmNoKHF1ZXJ5KVxuICAgICAgLnRoZW4ocmVzID0+IHRoaXMuZW1pdChFdmVudHMuUkVTRVQsIHJlcykpXG4gICAgICAudGhlbigoKSA9PiBxdWVyeSk7XG4gIH1cblxuICByZXNpemUocGFnZVNpemU6IG51bWJlciwgb2Zmc2V0PzogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICB0aGlzLnF1ZXJ5LndpdGhDb25maWd1cmF0aW9uKHsgcGFnZVNpemUgfSk7XG4gICAgaWYgKG9mZnNldCAhPT0gdW5kZWZpbmVkKSB0aGlzLnF1ZXJ5LnNraXAob2Zmc2V0KTtcbiAgICByZXR1cm4gdGhpcy5zZWFyY2goKVxuICAgICAgLnRoZW4oKCkgPT4gcGFnZVNpemUpO1xuICB9XG5cbiAgc29ydChzb3J0OiBTb3J0KTogUHJvbWlzZTxSZXN1bHRzPiB7XG4gICAgdGhpcy5xdWVyeS53aXRob3V0U29ydHMoc29ydCkud2l0aFNvcnRzKHNvcnQpO1xuICAgIHJldHVybiB0aGlzLnNlYXJjaCgpO1xuICB9XG5cbiAgcmVmaW5lKHJlZmluZW1lbnQ6IEZsdXhSZWZpbmVtZW50LCBjb25maWc6IFJlZmluZW1lbnRDb25maWcgPSB7IHJlc2V0OiB0cnVlIH0pOiBQcm9taXNlPE5hdmlnYXRpb25JbmZvPiB7XG4gICAgdGhpcy5xdWVyeS53aXRoU2VsZWN0ZWRSZWZpbmVtZW50cyhyZWZpbmVtZW50KTtcbiAgICBpZiAoY29uZmlnLnNraXBTZWFyY2gpIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5uYXZpZ2F0aW9uSW5mbyk7XG4gICAgcmV0dXJuIHRoaXMuZG9SZWZpbmVtZW50KGNvbmZpZyk7XG4gIH1cblxuICB1bnJlZmluZShyZWZpbmVtZW50OiBGbHV4UmVmaW5lbWVudCwgY29uZmlnOiBSZWZpbmVtZW50Q29uZmlnID0geyByZXNldDogdHJ1ZSB9KTogUHJvbWlzZTxOYXZpZ2F0aW9uSW5mbz4ge1xuICAgIHRoaXMucXVlcnkud2l0aG91dFNlbGVjdGVkUmVmaW5lbWVudHMocmVmaW5lbWVudCk7XG4gICAgaWYgKGNvbmZpZy5za2lwU2VhcmNoKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMubmF2aWdhdGlvbkluZm8pO1xuICAgIHJldHVybiB0aGlzLmRvUmVmaW5lbWVudChjb25maWcpO1xuICB9XG5cbiAgZGV0YWlscyhpZDogc3RyaW5nKTogUHJvbWlzZTxSZXN1bHRzPiB7XG4gICAgcmV0dXJuIHRoaXMuYnJpZGdlLnNlYXJjaChuZXcgUXVlcnkoKS53aXRoU2VsZWN0ZWRSZWZpbmVtZW50cyh7IG5hdmlnYXRpb25OYW1lOiAnaWQnLCB0eXBlOiAnVmFsdWUnLCB2YWx1ZTogaWQgfSkpXG4gICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICBpZiAocmVzLnJlY29yZHMubGVuZ3RoKSB0aGlzLmVtaXQoRXZlbnRzLkRFVEFJTFMsIHJlcy5yZWNvcmRzWzBdKTtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgZmlsdGVyZWRSZXF1ZXN0KCkge1xuICAgIHJldHVybiBmaWx0ZXJPYmplY3QodGhpcy5xdWVyeS5yYXcsICche3F1ZXJ5LHJlZmluZW1lbnRzfScpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNldFBhZ2luZyhyZXNldDogYm9vbGVhbik6IFByb21pc2U8UmVzdWx0cz4ge1xuICAgIHJldHVybiByZXNldCA/IHRoaXMucGFnZS5yZXNldCgpIDogdGhpcy5zZWFyY2goKTtcbiAgfVxuXG4gIHByaXZhdGUgZG9SZWZpbmVtZW50KGNvbmZpZzogUmVmaW5lbWVudENvbmZpZyk6IFByb21pc2U8TmF2aWdhdGlvbkluZm8+IHtcbiAgICByZXR1cm4gdGhpcy5yZXNldFBhZ2luZyhjb25maWcucmVzZXQpXG4gICAgICAudGhlbigoKSA9PiB0aGlzLmVtaXQoRXZlbnRzLlJFRklORU1FTlRTX0NIQU5HRUQsIHRoaXMubmF2aWdhdGlvbkluZm8pKVxuICAgICAgLnRoZW4oKCkgPT4gdGhpcy5uYXZpZ2F0aW9uSW5mbyk7XG4gIH1cblxuICBwcml2YXRlIGdldCBuYXZpZ2F0aW9uSW5mbygpOiBOYXZpZ2F0aW9uSW5mbyB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGF2YWlsYWJsZTogdGhpcy5yZXN1bHRzLmF2YWlsYWJsZU5hdmlnYXRpb24sXG4gICAgICBzZWxlY3RlZDogdGhpcy5yZXN1bHRzLnNlbGVjdGVkTmF2aWdhdGlvblxuICAgIH07XG4gIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBOYXZpZ2F0aW9uSW5mbyB7XG4gIGF2YWlsYWJsZTogTmF2aWdhdGlvbltdLFxuICBzZWxlY3RlZDogTmF2aWdhdGlvbltdXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVmaW5lbWVudENvbmZpZyB7XG4gIHJlc2V0PzogYm9vbGVhbjtcbiAgc2tpcFNlYXJjaD86IGJvb2xlYW47XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=


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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var typeOf = __webpack_require__(43);
	var filterKeys = __webpack_require__(49);
	var filterValues = __webpack_require__(88);
	var pick = __webpack_require__(90);
	var extend = __webpack_require__(91);

	module.exports = function filterObject(val, patterns, options) {
	  if (!val || typeof val !== 'object') {
	    throw new Error('filter-object expects an object');
	  }

	  if (patterns == null) return val;

	  if (typeOf(patterns) === 'function') {
	    return filterValues(val, patterns, options);
	  }

	  var keys = filterKeys(val, patterns, options);
	  return pick(val, keys);
	};


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var isBuffer = __webpack_require__(48);
	var toString = Object.prototype.toString;

	/**
	 * Get the native `typeof` a value.
	 *
	 * @param  {*} `val`
	 * @return {*} Native javascript type
	 */

	module.exports = function kindOf(val) {
	  // primitivies
	  if (typeof val === 'undefined') {
	    return 'undefined';
	  }
	  if (val === null) {
	    return 'null';
	  }
	  if (val === true || val === false || val instanceof Boolean) {
	    return 'boolean';
	  }
	  if (typeof val === 'string' || val instanceof String) {
	    return 'string';
	  }
	  if (typeof val === 'number' || val instanceof Number) {
	    return 'number';
	  }

	  // functions
	  if (typeof val === 'function' || val instanceof Function) {
	    return 'function';
	  }

	  // array
	  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
	    return 'array';
	  }

	  // check for instances of RegExp and Date before calling `toString`
	  if (val instanceof RegExp) {
	    return 'regexp';
	  }
	  if (val instanceof Date) {
	    return 'date';
	  }

	  // other objects
	  var type = toString.call(val);

	  if (type === '[object RegExp]') {
	    return 'regexp';
	  }
	  if (type === '[object Date]') {
	    return 'date';
	  }
	  if (type === '[object Arguments]') {
	    return 'arguments';
	  }

	  // buffer
	  if (typeof Buffer !== 'undefined' && isBuffer(val)) {
	    return 'buffer';
	  }

	  // es6: Map, WeakMap, Set, WeakSet
	  if (type === '[object Set]') {
	    return 'set';
	  }
	  if (type === '[object WeakSet]') {
	    return 'weakset';
	  }
	  if (type === '[object Map]') {
	    return 'map';
	  }
	  if (type === '[object WeakMap]') {
	    return 'weakmap';
	  }
	  if (type === '[object Symbol]') {
	    return 'symbol';
	  }

	  // must be a plain object
	  return 'object';
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44).Buffer))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */

	'use strict'

	var base64 = __webpack_require__(45)
	var ieee754 = __webpack_require__(46)
	var isArray = __webpack_require__(47)

	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	Buffer.poolSize = 8192 // not used by this implementation

	var rootParent = {}

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Use Object implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * Due to various browser bugs, sometimes the Object implementation will be used even
	 * when the browser supports typed arrays.
	 *
	 * Note:
	 *
	 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
	 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
	 *
	 *   - Safari 5-7 lacks support for changing the `Object.prototype.constructor` property
	 *     on objects.
	 *
	 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
	 *
	 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
	 *     incorrect length in some situations.

	 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
	 * get the Object implementation, which is slower but behaves correctly.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
	  ? global.TYPED_ARRAY_SUPPORT
	  : typedArraySupport()

	function typedArraySupport () {
	  function Bar () {}
	  try {
	    var arr = new Uint8Array(1)
	    arr.foo = function () { return 42 }
	    arr.constructor = Bar
	    return arr.foo() === 42 && // typed array instances can be augmented
	        arr.constructor === Bar && // constructor can be set
	        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
	        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
	  } catch (e) {
	    return false
	  }
	}

	function kMaxLength () {
	  return Buffer.TYPED_ARRAY_SUPPORT
	    ? 0x7fffffff
	    : 0x3fffffff
	}

	/**
	 * Class: Buffer
	 * =============
	 *
	 * The Buffer constructor returns instances of `Uint8Array` that are augmented
	 * with function properties for all the node `Buffer` API functions. We use
	 * `Uint8Array` so that square bracket notation works as expected -- it returns
	 * a single octet.
	 *
	 * By augmenting the instances, we can avoid modifying the `Uint8Array`
	 * prototype.
	 */
	function Buffer (arg) {
	  if (!(this instanceof Buffer)) {
	    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
	    if (arguments.length > 1) return new Buffer(arg, arguments[1])
	    return new Buffer(arg)
	  }

	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    this.length = 0
	    this.parent = undefined
	  }

	  // Common case.
	  if (typeof arg === 'number') {
	    return fromNumber(this, arg)
	  }

	  // Slightly less common case.
	  if (typeof arg === 'string') {
	    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
	  }

	  // Unusual.
	  return fromObject(this, arg)
	}

	function fromNumber (that, length) {
	  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < length; i++) {
	      that[i] = 0
	    }
	  }
	  return that
	}

	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

	  // Assumption: byteLength() return value is always < kMaxLength.
	  var length = byteLength(string, encoding) | 0
	  that = allocate(that, length)

	  that.write(string, encoding)
	  return that
	}

	function fromObject (that, object) {
	  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

	  if (isArray(object)) return fromArray(that, object)

	  if (object == null) {
	    throw new TypeError('must start with number, buffer, array or string')
	  }

	  if (typeof ArrayBuffer !== 'undefined') {
	    if (object.buffer instanceof ArrayBuffer) {
	      return fromTypedArray(that, object)
	    }
	    if (object instanceof ArrayBuffer) {
	      return fromArrayBuffer(that, object)
	    }
	  }

	  if (object.length) return fromArrayLike(that, object)

	  return fromJsonObject(that, object)
	}

	function fromBuffer (that, buffer) {
	  var length = checked(buffer.length) | 0
	  that = allocate(that, length)
	  buffer.copy(that, 0, 0, length)
	  return that
	}

	function fromArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Duplicate of fromArray() to keep fromArray() monomorphic.
	function fromTypedArray (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  // Truncating the elements is probably not what people expect from typed
	  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
	  // of the old Buffer constructor.
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	function fromArrayBuffer (that, array) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    array.byteLength
	    that = Buffer._augment(new Uint8Array(array))
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromTypedArray(that, new Uint8Array(array))
	  }
	  return that
	}

	function fromArrayLike (that, array) {
	  var length = checked(array.length) | 0
	  that = allocate(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
	// Returns a zero-length buffer for inputs that don't conform to the spec.
	function fromJsonObject (that, object) {
	  var array
	  var length = 0

	  if (object.type === 'Buffer' && isArray(object.data)) {
	    array = object.data
	    length = checked(array.length) | 0
	  }
	  that = allocate(that, length)

	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}

	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	} else {
	  // pre-set for values that may exist in the future
	  Buffer.prototype.length = undefined
	  Buffer.prototype.parent = undefined
	}

	function allocate (that, length) {
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = Buffer._augment(new Uint8Array(length))
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that.length = length
	    that._isBuffer = true
	  }

	  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
	  if (fromPool) that.parent = rootParent

	  return that
	}

	function checked (length) {
	  // Note: cannot use `length < kMaxLength` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (subject, encoding) {
	  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

	  var buf = new Buffer(subject, encoding)
	  delete buf.parent
	  return buf
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return !!(b != null && b._isBuffer)
	}

	Buffer.compare = function compare (a, b) {
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError('Arguments must be Buffers')
	  }

	  if (a === b) return 0

	  var x = a.length
	  var y = b.length

	  var i = 0
	  var len = Math.min(x, y)
	  while (i < len) {
	    if (a[i] !== b[i]) break

	    ++i
	  }

	  if (i !== len) {
	    x = a[i]
	    y = b[i]
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'binary':
	    case 'base64':
	    case 'raw':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	}

	Buffer.concat = function concat (list, length) {
	  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

	  if (list.length === 0) {
	    return new Buffer(0)
	  }

	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; i++) {
	      length += list[i].length
	    }
	  }

	  var buf = new Buffer(length)
	  var pos = 0
	  for (i = 0; i < list.length; i++) {
	    var item = list[i]
	    item.copy(buf, pos)
	    pos += item.length
	  }
	  return buf
	}

	function byteLength (string, encoding) {
	  if (typeof string !== 'string') string = '' + string

	  var len = string.length
	  if (len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'binary':
	      // Deprecated
	      case 'raw':
	      case 'raws':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) return utf8ToBytes(string).length // assume utf8
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}
	Buffer.byteLength = byteLength

	function slowToString (encoding, start, end) {
	  var loweredCase = false

	  start = start | 0
	  end = end === undefined || end === Infinity ? this.length : end | 0

	  if (!encoding) encoding = 'utf8'
	  if (start < 0) start = 0
	  if (end > this.length) end = this.length
	  if (end <= start) return ''

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'binary':
	        return binarySlice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toString = function toString () {
	  var length = this.length | 0
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	}

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	}

	Buffer.prototype.inspect = function inspect () {
	  var str = ''
	  var max = exports.INSPECT_MAX_BYTES
	  if (this.length > 0) {
	    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
	    if (this.length > max) str += ' ... '
	  }
	  return '<Buffer ' + str + '>'
	}

	Buffer.prototype.compare = function compare (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return 0
	  return Buffer.compare(this, b)
	}

	Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
	  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
	  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
	  byteOffset >>= 0

	  if (this.length === 0) return -1
	  if (byteOffset >= this.length) return -1

	  // Negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

	  if (typeof val === 'string') {
	    if (val.length === 0) return -1 // special case: looking for empty string always fails
	    return String.prototype.indexOf.call(this, val, byteOffset)
	  }
	  if (Buffer.isBuffer(val)) {
	    return arrayIndexOf(this, val, byteOffset)
	  }
	  if (typeof val === 'number') {
	    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
	      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
	    }
	    return arrayIndexOf(this, [ val ], byteOffset)
	  }

	  function arrayIndexOf (arr, val, byteOffset) {
	    var foundIndex = -1
	    for (var i = 0; byteOffset + i < arr.length; i++) {
	      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
	      } else {
	        foundIndex = -1
	      }
	    }
	    return -1
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	// `get` is deprecated
	Buffer.prototype.get = function get (offset) {
	  console.log('.get() is deprecated. Access using array indexes instead.')
	  return this.readUInt8(offset)
	}

	// `set` is deprecated
	Buffer.prototype.set = function set (v, offset) {
	  console.log('.set() is deprecated. Access using array indexes instead.')
	  return this.writeUInt8(v, offset)
	}

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0
	  var remaining = buf.length - offset
	  if (!length) {
	    length = remaining
	  } else {
	    length = Number(length)
	    if (length > remaining) {
	      length = remaining
	    }
	  }

	  // must be an even number of digits
	  var strLen = string.length
	  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; i++) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) throw new Error('Invalid hex string')
	    buf[offset + i] = parsed
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function binaryWrite (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8'
	    length = this.length
	    offset = 0
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset
	    length = this.length
	    offset = 0
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset | 0
	    if (isFinite(length)) {
	      length = length | 0
	      if (encoding === undefined) encoding = 'utf8'
	    } else {
	      encoding = length
	      length = undefined
	    }
	  // legacy write(string, encoding, offset, length) - remove in v0.13
	  } else {
	    var swap = encoding
	    encoding = offset
	    offset = length | 0
	    length = swap
	  }

	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8'

	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'binary':
	        return binaryWrite(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase()
	        loweredCase = true
	    }
	  }
	}

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	}

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end)
	  var res = []

	  var i = start
	  while (i < end) {
	    var firstByte = buf[i]
	    var codePoint = null
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	      : (firstByte > 0xBF) ? 2
	      : 1

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1]
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1]
	          thirdByte = buf[i + 2]
	          fourthByte = buf[i + 3]
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD
	      bytesPerSequence = 1
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
	      codePoint = 0xDC00 | codePoint & 0x3FF
	    }

	    res.push(codePoint)
	    i += bytesPerSequence
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = ''
	  var i = 0
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    )
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}

	function binarySlice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)

	  for (var i = start; i < end; i++) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length

	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len

	  var out = ''
	  for (var i = start; i < end; i++) {
	    out += toHex(buf[i])
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end)
	  var res = ''
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length
	  start = ~~start
	  end = end === undefined ? len : ~~end

	  if (start < 0) {
	    start += len
	    if (start < 0) start = 0
	  } else if (start > len) {
	    start = len
	  }

	  if (end < 0) {
	    end += len
	    if (end < 0) end = 0
	  } else if (end > len) {
	    end = len
	  }

	  if (end < start) end = start

	  var newBuf
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    newBuf = Buffer._augment(this.subarray(start, end))
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; i++) {
	      newBuf[i] = this[i + start]
	    }
	  }

	  if (newBuf.length) newBuf.parent = this.parent || this

	  return newBuf
	}

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }

	  return val
	}

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length)
	  }

	  var val = this[offset + --byteLength]
	  var mul = 1
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul
	  }

	  return val
	}

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  return this[offset]
	}

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return this[offset] | (this[offset + 1] << 8)
	}

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  return (this[offset] << 8) | this[offset + 1]
	}

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	}

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	}

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var val = this[offset]
	  var mul = 1
	  var i = 0
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkOffset(offset, byteLength, this.length)

	  var i = byteLength
	  var mul = 1
	  var val = this[offset + --i]
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul
	  }
	  mul *= 0x80

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

	  return val
	}

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 1, this.length)
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	}

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset] | (this[offset + 1] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 2, this.length)
	  var val = this[offset + 1] | (this[offset] << 8)
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	}

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	}

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	}

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, true, 23, 4)
	}

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 4, this.length)
	  return ieee754.read(this, offset, false, 23, 4)
	}

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, true, 52, 8)
	}

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  if (!noAssert) checkOffset(offset, 8, this.length)
	  return ieee754.read(this, offset, false, 52, 8)
	}

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var mul = 1
	  var i = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

	  var i = byteLength - 1
	  var mul = 1
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	function objectWriteUInt16 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
	    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
	      (littleEndian ? i : 1 - i) * 8
	  }
	}

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	function objectWriteUInt32 (buf, value, offset, littleEndian) {
	  if (value < 0) value = 0xffffffff + value + 1
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
	    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
	  }
	}

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset + 3] = (value >>> 24)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 1] = (value >>> 8)
	    this[offset] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = 0
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) {
	    var limit = Math.pow(2, 8 * byteLength - 1)

	    checkInt(this, value, offset, byteLength, limit - 1, -limit)
	  }

	  var i = byteLength - 1
	  var mul = 1
	  var sub = value < 0 ? 1 : 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
	  }

	  return offset + byteLength
	}

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
	  if (value < 0) value = 0xff + value + 1
	  this[offset] = (value & 0xff)
	  return offset + 1
	}

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	  } else {
	    objectWriteUInt16(this, value, offset, true)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 8)
	    this[offset + 1] = (value & 0xff)
	  } else {
	    objectWriteUInt16(this, value, offset, false)
	  }
	  return offset + 2
	}

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value & 0xff)
	    this[offset + 1] = (value >>> 8)
	    this[offset + 2] = (value >>> 16)
	    this[offset + 3] = (value >>> 24)
	  } else {
	    objectWriteUInt32(this, value, offset, true)
	  }
	  return offset + 4
	}

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value
	  offset = offset | 0
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
	  if (value < 0) value = 0xffffffff + value + 1
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    this[offset] = (value >>> 24)
	    this[offset + 1] = (value >>> 16)
	    this[offset + 2] = (value >>> 8)
	    this[offset + 3] = (value & 0xff)
	  } else {
	    objectWriteUInt32(this, value, offset, false)
	  }
	  return offset + 4
	}

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (value > max || value < min) throw new RangeError('value is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('index out of range')
	  if (offset < 0) throw new RangeError('index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4)
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	}

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8)
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	}

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	}

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!start) start = 0
	  if (!end && end !== 0) end = this.length
	  if (targetStart >= target.length) targetStart = target.length
	  if (!targetStart) targetStart = 0
	  if (end > 0 && end < start) end = start

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start
	  }

	  var len = end - start
	  var i

	  if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (i = len - 1; i >= 0; i--) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; i++) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    target._set(this.subarray(start, start + len), targetStart)
	  }

	  return len
	}

	// fill(value, start=0, end=buffer.length)
	Buffer.prototype.fill = function fill (value, start, end) {
	  if (!value) value = 0
	  if (!start) start = 0
	  if (!end) end = this.length

	  if (end < start) throw new RangeError('end < start')

	  // Fill 0 bytes; we're done
	  if (end === start) return
	  if (this.length === 0) return

	  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
	  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

	  var i
	  if (typeof value === 'number') {
	    for (i = start; i < end; i++) {
	      this[i] = value
	    }
	  } else {
	    var bytes = utf8ToBytes(value.toString())
	    var len = bytes.length
	    for (i = start; i < end; i++) {
	      this[i] = bytes[i % len]
	    }
	  }

	  return this
	}

	/**
	 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
	 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
	 */
	Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
	  if (typeof Uint8Array !== 'undefined') {
	    if (Buffer.TYPED_ARRAY_SUPPORT) {
	      return (new Buffer(this)).buffer
	    } else {
	      var buf = new Uint8Array(this.length)
	      for (var i = 0, len = buf.length; i < len; i += 1) {
	        buf[i] = this[i]
	      }
	      return buf.buffer
	    }
	  } else {
	    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
	  }
	}

	// HELPER FUNCTIONS
	// ================

	var BP = Buffer.prototype

	/**
	 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
	 */
	Buffer._augment = function _augment (arr) {
	  arr.constructor = Buffer
	  arr._isBuffer = true

	  // save reference to original Uint8Array set method before overwriting
	  arr._set = arr.set

	  // deprecated
	  arr.get = BP.get
	  arr.set = BP.set

	  arr.write = BP.write
	  arr.toString = BP.toString
	  arr.toLocaleString = BP.toString
	  arr.toJSON = BP.toJSON
	  arr.equals = BP.equals
	  arr.compare = BP.compare
	  arr.indexOf = BP.indexOf
	  arr.copy = BP.copy
	  arr.slice = BP.slice
	  arr.readUIntLE = BP.readUIntLE
	  arr.readUIntBE = BP.readUIntBE
	  arr.readUInt8 = BP.readUInt8
	  arr.readUInt16LE = BP.readUInt16LE
	  arr.readUInt16BE = BP.readUInt16BE
	  arr.readUInt32LE = BP.readUInt32LE
	  arr.readUInt32BE = BP.readUInt32BE
	  arr.readIntLE = BP.readIntLE
	  arr.readIntBE = BP.readIntBE
	  arr.readInt8 = BP.readInt8
	  arr.readInt16LE = BP.readInt16LE
	  arr.readInt16BE = BP.readInt16BE
	  arr.readInt32LE = BP.readInt32LE
	  arr.readInt32BE = BP.readInt32BE
	  arr.readFloatLE = BP.readFloatLE
	  arr.readFloatBE = BP.readFloatBE
	  arr.readDoubleLE = BP.readDoubleLE
	  arr.readDoubleBE = BP.readDoubleBE
	  arr.writeUInt8 = BP.writeUInt8
	  arr.writeUIntLE = BP.writeUIntLE
	  arr.writeUIntBE = BP.writeUIntBE
	  arr.writeUInt16LE = BP.writeUInt16LE
	  arr.writeUInt16BE = BP.writeUInt16BE
	  arr.writeUInt32LE = BP.writeUInt32LE
	  arr.writeUInt32BE = BP.writeUInt32BE
	  arr.writeIntLE = BP.writeIntLE
	  arr.writeIntBE = BP.writeIntBE
	  arr.writeInt8 = BP.writeInt8
	  arr.writeInt16LE = BP.writeInt16LE
	  arr.writeInt16BE = BP.writeInt16BE
	  arr.writeInt32LE = BP.writeInt32LE
	  arr.writeInt32BE = BP.writeInt32BE
	  arr.writeFloatLE = BP.writeFloatLE
	  arr.writeFloatBE = BP.writeFloatBE
	  arr.writeDoubleLE = BP.writeDoubleLE
	  arr.writeDoubleBE = BP.writeDoubleBE
	  arr.fill = BP.fill
	  arr.inspect = BP.inspect
	  arr.toArrayBuffer = BP.toArrayBuffer

	  return arr
	}

	var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

	function base64clean (str) {
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '='
	  }
	  return str
	}

	function stringtrim (str) {
	  if (str.trim) return str.trim()
	  return str.replace(/^\s+|\s+$/g, '')
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity
	  var codePoint
	  var length = string.length
	  var leadSurrogate = null
	  var bytes = []

	  for (var i = 0; i < length; i++) {
	    codePoint = string.charCodeAt(i)

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	        leadSurrogate = codePoint
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
	    }

	    leadSurrogate = null

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint)
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      )
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; i++) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i)
	    hi = c >> 8
	    lo = c % 256
	    byteArray.push(lo)
	    byteArray.push(hi)
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; i++) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44).Buffer, (function() { return this; }())))

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

	;(function (exports) {
		'use strict';

	  var Arr = (typeof Uint8Array !== 'undefined')
	    ? Uint8Array
	    : Array

		var PLUS   = '+'.charCodeAt(0)
		var SLASH  = '/'.charCodeAt(0)
		var NUMBER = '0'.charCodeAt(0)
		var LOWER  = 'a'.charCodeAt(0)
		var UPPER  = 'A'.charCodeAt(0)
		var PLUS_URL_SAFE = '-'.charCodeAt(0)
		var SLASH_URL_SAFE = '_'.charCodeAt(0)

		function decode (elt) {
			var code = elt.charCodeAt(0)
			if (code === PLUS ||
			    code === PLUS_URL_SAFE)
				return 62 // '+'
			if (code === SLASH ||
			    code === SLASH_URL_SAFE)
				return 63 // '/'
			if (code < NUMBER)
				return -1 //no match
			if (code < NUMBER + 10)
				return code - NUMBER + 26 + 26
			if (code < UPPER + 26)
				return code - UPPER
			if (code < LOWER + 26)
				return code - LOWER + 26
		}

		function b64ToByteArray (b64) {
			var i, j, l, tmp, placeHolders, arr

			if (b64.length % 4 > 0) {
				throw new Error('Invalid string. Length must be a multiple of 4')
			}

			// the number of equal signs (place holders)
			// if there are two placeholders, than the two characters before it
			// represent one byte
			// if there is only one, then the three characters before it represent 2 bytes
			// this is just a cheap hack to not do indexOf twice
			var len = b64.length
			placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

			// base64 is 4/3 + up to two characters of the original data
			arr = new Arr(b64.length * 3 / 4 - placeHolders)

			// if there are placeholders, only get up to the last complete 4 chars
			l = placeHolders > 0 ? b64.length - 4 : b64.length

			var L = 0

			function push (v) {
				arr[L++] = v
			}

			for (i = 0, j = 0; i < l; i += 4, j += 3) {
				tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
				push((tmp & 0xFF0000) >> 16)
				push((tmp & 0xFF00) >> 8)
				push(tmp & 0xFF)
			}

			if (placeHolders === 2) {
				tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
				push(tmp & 0xFF)
			} else if (placeHolders === 1) {
				tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
				push((tmp >> 8) & 0xFF)
				push(tmp & 0xFF)
			}

			return arr
		}

		function uint8ToBase64 (uint8) {
			var i,
				extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
				output = "",
				temp, length

			function encode (num) {
				return lookup.charAt(num)
			}

			function tripletToBase64 (num) {
				return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
			}

			// go through the array every three bytes, we'll deal with trailing stuff later
			for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
				temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
				output += tripletToBase64(temp)
			}

			// pad the end with zeros, but make sure to not forget the extra bytes
			switch (extraBytes) {
				case 1:
					temp = uint8[uint8.length - 1]
					output += encode(temp >> 2)
					output += encode((temp << 4) & 0x3F)
					output += '=='
					break
				case 2:
					temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
					output += encode(temp >> 10)
					output += encode((temp >> 4) & 0x3F)
					output += encode((temp << 2) & 0x3F)
					output += '='
					break
			}

			return output
		}

		exports.toByteArray = b64ToByteArray
		exports.fromByteArray = uint8ToBase64
	}( false ? (this.base64js = {}) : exports))


/***/ },
/* 46 */
/***/ function(module, exports) {

	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var nBits = -7
	  var i = isLE ? (nBytes - 1) : 0
	  var d = isLE ? -1 : 1
	  var s = buffer[offset + i]

	  i += d

	  e = s & ((1 << (-nBits)) - 1)
	  s >>= (-nBits)
	  nBits += eLen
	  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1)
	  e >>= (-nBits)
	  nBits += mLen
	  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen)
	    e = e - eBias
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	}

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c
	  var eLen = nBytes * 8 - mLen - 1
	  var eMax = (1 << eLen) - 1
	  var eBias = eMax >> 1
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
	  var i = isLE ? 0 : (nBytes - 1)
	  var d = isLE ? 1 : -1
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

	  value = Math.abs(value)

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0
	    e = eMax
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2)
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--
	      c *= 2
	    }
	    if (e + eBias >= 1) {
	      value += rt / c
	    } else {
	      value += rt * Math.pow(2, 1 - eBias)
	    }
	    if (value * c >= 2) {
	      e++
	      c /= 2
	    }

	    if (e + eBias >= eMax) {
	      m = 0
	      e = eMax
	    } else if (e + eBias >= 1) {
	      m = (value * c - 1) * Math.pow(2, mLen)
	      e = e + eBias
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
	      e = 0
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m
	  eLen += mLen
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128
	}


/***/ },
/* 47 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 48 */
/***/ function(module, exports) {

	/**
	 * Determine if an object is Buffer
	 *
	 * Author:   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * License:  MIT
	 *
	 * `npm install is-buffer`
	 */

	module.exports = function (obj) {
	  return !!(obj != null &&
	    (obj._isBuffer || // For Safari 5-7 (missing Object.prototype.constructor)
	      (obj.constructor &&
	      typeof obj.constructor.isBuffer === 'function' &&
	      obj.constructor.isBuffer(obj))
	    ))
	}


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var mm = __webpack_require__(50);

	module.exports = function filterKeys(o, patterns, options) {
	  if (o == null) {
	    throw new Error('filter-keys expects an object');
	  }

	  var keys = Object.keys(o);
	  if (!patterns || arguments.length === 1) {
	    return keys;
	  }

	  return mm(keys, patterns, options);
	};


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * micromatch <https://github.com/jonschlinkert/micromatch>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	var expand = __webpack_require__(51);
	var utils = __webpack_require__(52);

	/**
	 * The main function. Pass an array of filepaths,
	 * and a string or array of glob patterns
	 *
	 * @param  {Array|String} `files`
	 * @param  {Array|String} `patterns`
	 * @param  {Object} `opts`
	 * @return {Array} Array of matches
	 */

	function micromatch(files, patterns, opts) {
	  if (!files || !patterns) return [];
	  opts = opts || {};

	  if (typeof opts.cache === 'undefined') {
	    opts.cache = true;
	  }

	  if (!Array.isArray(patterns)) {
	    return match(files, patterns, opts);
	  }

	  var len = patterns.length, i = 0;
	  var omit = [], keep = [];

	  while (len--) {
	    var glob = patterns[i++];
	    if (typeof glob === 'string' && glob.charCodeAt(0) === 33 /* ! */) {
	      omit.push.apply(omit, match(files, glob.slice(1), opts));
	    } else {
	      keep.push.apply(keep, match(files, glob, opts));
	    }
	  }
	  return utils.diff(keep, omit);
	}

	/**
	 * Return an array of files that match the given glob pattern.
	 *
	 * This function is called by the main `micromatch` function If you only
	 * need to pass a single pattern you might get very minor speed improvements
	 * using this function.
	 *
	 * @param  {Array} `files`
	 * @param  {String} `pattern`
	 * @param  {Object} `options`
	 * @return {Array}
	 */

	function match(files, pattern, opts) {
	  if (utils.typeOf(files) !== 'string' && !Array.isArray(files)) {
	    throw new Error(msg('match', 'files', 'a string or array'));
	  }

	  files = utils.arrayify(files);
	  opts = opts || {};

	  var negate = opts.negate || false;
	  var orig = pattern;

	  if (typeof pattern === 'string') {
	    negate = pattern.charAt(0) === '!';
	    if (negate) {
	      pattern = pattern.slice(1);
	    }

	    // we need to remove the character regardless,
	    // so the above logic is still needed
	    if (opts.nonegate === true) {
	      negate = false;
	    }
	  }

	  var _isMatch = matcher(pattern, opts);
	  var len = files.length, i = 0;
	  var res = [];

	  while (i < len) {
	    var file = files[i++];
	    var fp = utils.unixify(file, opts);

	    if (!_isMatch(fp)) { continue; }
	    res.push(fp);
	  }

	  if (res.length === 0) {
	    if (opts.failglob === true) {
	      throw new Error('micromatch.match() found no matches for: "' + orig + '".');
	    }

	    if (opts.nonull || opts.nullglob) {
	      res.push(utils.unescapeGlob(orig));
	    }
	  }

	  // if `negate` was defined, diff negated files
	  if (negate) { res = utils.diff(files, res); }

	  // if `ignore` was defined, diff ignored filed
	  if (opts.ignore && opts.ignore.length) {
	    pattern = opts.ignore;
	    opts = utils.omit(opts, ['ignore']);
	    res = utils.diff(res, micromatch(res, pattern, opts));
	  }

	  if (opts.nodupes) {
	    return utils.unique(res);
	  }
	  return res;
	}

	/**
	 * Returns a function that takes a glob pattern or array of glob patterns
	 * to be used with `Array#filter()`. (Internally this function generates
	 * the matching function using the [matcher] method).
	 *
	 * ```js
	 * var fn = mm.filter('[a-c]');
	 * ['a', 'b', 'c', 'd', 'e'].filter(fn);
	 * //=> ['a', 'b', 'c']
	 * ```
	 * @param  {String|Array} `patterns` Can be a glob or array of globs.
	 * @param  {Options} `opts` Options to pass to the [matcher] method.
	 * @return {Function} Filter function to be passed to `Array#filter()`.
	 */

	function filter(patterns, opts) {
	  if (!Array.isArray(patterns) && typeof patterns !== 'string') {
	    throw new TypeError(msg('filter', 'patterns', 'a string or array'));
	  }

	  patterns = utils.arrayify(patterns);
	  var len = patterns.length, i = 0;
	  var patternMatchers = Array(len);
	  while (i < len) {
	    patternMatchers[i] = matcher(patterns[i++], opts);
	  }

	  return function(fp) {
	    if (fp == null) return [];
	    var len = patternMatchers.length, i = 0;
	    var res = true;

	    fp = utils.unixify(fp, opts);
	    while (i < len) {
	      var fn = patternMatchers[i++];
	      if (!fn(fp)) {
	        res = false;
	        break;
	      }
	    }
	    return res;
	  };
	}

	/**
	 * Returns true if the filepath contains the given
	 * pattern. Can also return a function for matching.
	 *
	 * ```js
	 * isMatch('foo.md', '*.md', {});
	 * //=> true
	 *
	 * isMatch('*.md', {})('foo.md')
	 * //=> true
	 * ```
	 * @param  {String} `fp`
	 * @param  {String} `pattern`
	 * @param  {Object} `opts`
	 * @return {Boolean}
	 */

	function isMatch(fp, pattern, opts) {
	  if (typeof fp !== 'string') {
	    throw new TypeError(msg('isMatch', 'filepath', 'a string'));
	  }

	  fp = utils.unixify(fp, opts);
	  if (utils.typeOf(pattern) === 'object') {
	    return matcher(fp, pattern);
	  }
	  return matcher(pattern, opts)(fp);
	}

	/**
	 * Returns true if the filepath matches the
	 * given pattern.
	 */

	function contains(fp, pattern, opts) {
	  if (typeof fp !== 'string') {
	    throw new TypeError(msg('contains', 'pattern', 'a string'));
	  }

	  opts = opts || {};
	  opts.contains = (pattern !== '');
	  fp = utils.unixify(fp, opts);

	  if (opts.contains && !utils.isGlob(pattern)) {
	    return fp.indexOf(pattern) !== -1;
	  }
	  return matcher(pattern, opts)(fp);
	}

	/**
	 * Returns true if a file path matches any of the
	 * given patterns.
	 *
	 * @param  {String} `fp` The filepath to test.
	 * @param  {String|Array} `patterns` Glob patterns to use.
	 * @param  {Object} `opts` Options to pass to the `matcher()` function.
	 * @return {String}
	 */

	function any(fp, patterns, opts) {
	  if (!Array.isArray(patterns) && typeof patterns !== 'string') {
	    throw new TypeError(msg('any', 'patterns', 'a string or array'));
	  }

	  patterns = utils.arrayify(patterns);
	  var len = patterns.length;

	  fp = utils.unixify(fp, opts);
	  while (len--) {
	    var isMatch = matcher(patterns[len], opts);
	    if (isMatch(fp)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Filter the keys of an object with the given `glob` pattern
	 * and `options`
	 *
	 * @param  {Object} `object`
	 * @param  {Pattern} `object`
	 * @return {Array}
	 */

	function matchKeys(obj, glob, options) {
	  if (utils.typeOf(obj) !== 'object') {
	    throw new TypeError(msg('matchKeys', 'first argument', 'an object'));
	  }

	  var fn = matcher(glob, options);
	  var res = {};

	  for (var key in obj) {
	    if (obj.hasOwnProperty(key) && fn(key)) {
	      res[key] = obj[key];
	    }
	  }
	  return res;
	}

	/**
	 * Return a function for matching based on the
	 * given `pattern` and `options`.
	 *
	 * @param  {String} `pattern`
	 * @param  {Object} `options`
	 * @return {Function}
	 */

	function matcher(pattern, opts) {
	  // pattern is a function
	  if (typeof pattern === 'function') {
	    return pattern;
	  }
	  // pattern is a regex
	  if (pattern instanceof RegExp) {
	    return function(fp) {
	      return pattern.test(fp);
	    };
	  }

	  if (typeof pattern !== 'string') {
	    throw new TypeError(msg('matcher', 'pattern', 'a string, regex, or function'));
	  }

	  // strings, all the way down...
	  pattern = utils.unixify(pattern, opts);

	  // pattern is a non-glob string
	  if (!utils.isGlob(pattern)) {
	    return utils.matchPath(pattern, opts);
	  }
	  // pattern is a glob string
	  var re = makeRe(pattern, opts);

	  // `matchBase` is defined
	  if (opts && opts.matchBase) {
	    return utils.hasFilename(re, opts);
	  }
	  // `matchBase` is not defined
	  return function(fp) {
	    fp = utils.unixify(fp, opts);
	    return re.test(fp);
	  };
	}

	/**
	 * Create and cache a regular expression for matching
	 * file paths.
	 *
	 * If the leading character in the `glob` is `!`, a negation
	 * regex is returned.
	 *
	 * @param  {String} `glob`
	 * @param  {Object} `options`
	 * @return {RegExp}
	 */

	function toRegex(glob, options) {
	  // clone options to prevent  mutating the original object
	  var opts = Object.create(options || {});
	  var flags = opts.flags || '';
	  if (opts.nocase && flags.indexOf('i') === -1) {
	    flags += 'i';
	  }

	  var parsed = expand(glob, opts);

	  // pass in tokens to avoid parsing more than once
	  opts.negated = opts.negated || parsed.negated;
	  opts.negate = opts.negated;
	  glob = wrapGlob(parsed.pattern, opts);
	  var re;

	  try {
	    re = new RegExp(glob, flags);
	    return re;
	  } catch (err) {
	    err.reason = 'micromatch invalid regex: (' + re + ')';
	    if (opts.strict) throw new SyntaxError(err);
	  }

	  // we're only here if a bad pattern was used and the user
	  // passed `options.silent`, so match nothing
	  return /$^/;
	}

	/**
	 * Create the regex to do the matching. If the leading
	 * character in the `glob` is `!` a negation regex is returned.
	 *
	 * @param {String} `glob`
	 * @param {Boolean} `negate`
	 */

	function wrapGlob(glob, opts) {
	  var prefix = (opts && !opts.contains) ? '^' : '';
	  var after = (opts && !opts.contains) ? '$' : '';
	  glob = ('(?:' + glob + ')' + after);
	  if (opts && opts.negate) {
	    return prefix + ('(?!^' + glob + ').*$');
	  }
	  return prefix + glob;
	}

	/**
	 * Create and cache a regular expression for matching file paths.
	 * If the leading character in the `glob` is `!`, a negation
	 * regex is returned.
	 *
	 * @param  {String} `glob`
	 * @param  {Object} `options`
	 * @return {RegExp}
	 */

	function makeRe(glob, opts) {
	  if (utils.typeOf(glob) !== 'string') {
	    throw new Error(msg('makeRe', 'glob', 'a string'));
	  }
	  return utils.cache(toRegex, glob, opts);
	}

	/**
	 * Make error messages consistent. Follows this format:
	 *
	 * ```js
	 * msg(methodName, argNumber, nativeType);
	 * // example:
	 * msg('matchKeys', 'first', 'an object');
	 * ```
	 *
	 * @param  {String} `method`
	 * @param  {String} `num`
	 * @param  {String} `type`
	 * @return {String}
	 */

	function msg(method, what, type) {
	  return 'micromatch.' + method + '(): ' + what + ' should be ' + type + '.';
	}

	/**
	 * Public methods
	 */

	/* eslint no-multi-spaces: 0 */
	micromatch.any       = any;
	micromatch.braces    = micromatch.braceExpand = utils.braces;
	micromatch.contains  = contains;
	micromatch.expand    = expand;
	micromatch.filter    = filter;
	micromatch.isMatch   = isMatch;
	micromatch.makeRe    = makeRe;
	micromatch.match     = match;
	micromatch.matcher   = matcher;
	micromatch.matchKeys = matchKeys;

	/**
	 * Expose `micromatch`
	 */

	module.exports = micromatch;


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * micromatch <https://github.com/jonschlinkert/micromatch>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	var utils = __webpack_require__(52);
	var Glob = __webpack_require__(86);

	/**
	 * Expose `expand`
	 */

	module.exports = expand;

	/**
	 * Expand a glob pattern to resolve braces and
	 * similar patterns before converting to regex.
	 *
	 * @param  {String|Array} `pattern`
	 * @param  {Array} `files`
	 * @param  {Options} `opts`
	 * @return {Array}
	 */

	function expand(pattern, options) {
	  if (typeof pattern !== 'string') {
	    throw new TypeError('micromatch.expand(): argument should be a string.');
	  }

	  var glob = new Glob(pattern, options || {});
	  var opts = glob.options;

	  if (!utils.isGlob(pattern)) {
	    glob.pattern = glob.pattern.replace(/([\/.])/g, '\\$1');
	    return glob;
	  }

	  glob.pattern = glob.pattern.replace(/(\+)(?!\()/g, '\\$1');
	  glob.pattern = glob.pattern.split('$').join('\\$');

	  if (typeof opts.braces !== 'boolean' && typeof opts.nobraces !== 'boolean') {
	    opts.braces = true;
	  }

	  if (glob.pattern === '.*') {
	    return {
	      pattern: '\\.' + star,
	      tokens: tok,
	      options: opts
	    };
	  }

	  if (glob.pattern === '*') {
	    return {
	      pattern: oneStar(opts.dot),
	      tokens: tok,
	      options: opts
	    };
	  }

	  // parse the glob pattern into tokens
	  glob.parse();
	  var tok = glob.tokens;
	  tok.is.negated = opts.negated;

	  // dotfile handling
	  if ((opts.dotfiles === true || tok.is.dotfile) && opts.dot !== false) {
	    opts.dotfiles = true;
	    opts.dot = true;
	  }

	  if ((opts.dotdirs === true || tok.is.dotdir) && opts.dot !== false) {
	    opts.dotdirs = true;
	    opts.dot = true;
	  }

	  // check for braces with a dotfile pattern
	  if (/[{,]\./.test(glob.pattern)) {
	    opts.makeRe = false;
	    opts.dot = true;
	  }

	  if (opts.nonegate !== true) {
	    opts.negated = glob.negated;
	  }

	  // if the leading character is a dot or a slash, escape it
	  if (glob.pattern.charAt(0) === '.' && glob.pattern.charAt(1) !== '/') {
	    glob.pattern = '\\' + glob.pattern;
	  }

	  /**
	   * Extended globs
	   */

	  // expand braces, e.g `{1..5}`
	  glob.track('before braces');
	  if (tok.is.braces) {
	    glob.braces();
	  }
	  glob.track('after braces');

	  // expand extglobs, e.g `foo/!(a|b)`
	  glob.track('before extglob');
	  if (tok.is.extglob) {
	    glob.extglob();
	  }
	  glob.track('after extglob');

	  // expand brackets, e.g `[[:alpha:]]`
	  glob.track('before brackets');
	  if (tok.is.brackets) {
	    glob.brackets();
	  }
	  glob.track('after brackets');

	  // special patterns
	  glob._replace('[!', '[^');
	  glob._replace('(?', '(%~');
	  glob._replace(/\[\]/, '\\[\\]');
	  glob._replace('/[', '/' + (opts.dot ? dotfiles : nodot) + '[', true);
	  glob._replace('/?', '/' + (opts.dot ? dotfiles : nodot) + '[^/]', true);
	  glob._replace('/.', '/(?=.)\\.', true);

	  // windows drives
	  glob._replace(/^(\w):([\\\/]+?)/gi, '(?=.)$1:$2', true);

	  // negate slashes in exclusion ranges
	  if (glob.pattern.indexOf('[^') !== -1) {
	    glob.pattern = negateSlash(glob.pattern);
	  }

	  if (opts.globstar !== false && glob.pattern === '**') {
	    glob.pattern = globstar(opts.dot);

	  } else {
	    // '/*/*/*' => '(?:/*){3}'
	    glob._replace(/(\/\*)+/g, function(match) {
	      var len = match.length / 2;
	      if (len === 1) { return match; }
	      return '(?:\\/*){' + len + '}';
	    });

	    glob.pattern = balance(glob.pattern, '[', ']');
	    glob.escape(glob.pattern);

	    // if the pattern has `**`
	    if (tok.is.globstar) {
	      glob.pattern = collapse(glob.pattern, '/**');
	      glob.pattern = collapse(glob.pattern, '**/');
	      glob._replace('/**/', '(?:/' + globstar(opts.dot) + '/|/)', true);
	      glob._replace(/\*{2,}/g, '**');

	      // 'foo/*'
	      glob._replace(/(\w+)\*(?!\/)/g, '$1[^/]*?', true);
	      glob._replace(/\*\*\/\*(\w)/g, globstar(opts.dot) + '\\/' + (opts.dot ? dotfiles : nodot) + '[^/]*?$1', true);

	      if (opts.dot !== true) {
	        glob._replace(/\*\*\/(.)/g, '(?:**\\/|)$1');
	      }

	      // 'foo/**' or '{**,*}', but not 'foo**'
	      if (tok.path.dirname !== '' || /,\*\*|\*\*,/.test(glob.orig)) {
	        glob._replace('**', globstar(opts.dot), true);
	      }
	    }

	    // ends with /*
	    glob._replace(/\/\*$/, '\\/' + oneStar(opts.dot), true);
	    // ends with *, no slashes
	    glob._replace(/(?!\/)\*$/, star, true);
	    // has 'n*.' (partial wildcard w/ file extension)
	    glob._replace(/([^\/]+)\*/, '$1' + oneStar(true), true);
	    // has '*'
	    glob._replace('*', oneStar(opts.dot), true);
	    glob._replace('?.', '?\\.', true);
	    glob._replace('?:', '?:', true);

	    glob._replace(/\?+/g, function(match) {
	      var len = match.length;
	      if (len === 1) {
	        return qmark;
	      }
	      return qmark + '{' + len + '}';
	    });

	    // escape '.abc' => '\\.abc'
	    glob._replace(/\.([*\w]+)/g, '\\.$1');
	    // fix '[^\\\\/]'
	    glob._replace(/\[\^[\\\/]+\]/g, qmark);
	    // '///' => '\/'
	    glob._replace(/\/+/g, '\\/');
	    // '\\\\\\' => '\\'
	    glob._replace(/\\{2,}/g, '\\');
	  }

	  // unescape previously escaped patterns
	  glob.unescape(glob.pattern);
	  glob._replace('__UNESC_STAR__', '*');

	  // escape dots that follow qmarks
	  glob._replace('?.', '?\\.');

	  // remove unnecessary slashes in character classes
	  glob._replace('[^\\/]', qmark);

	  if (glob.pattern.length > 1) {
	    if (/^[\[?*]/.test(glob.pattern)) {
	      // only prepend the string if we don't want to match dotfiles
	      glob.pattern = (opts.dot ? dotfiles : nodot) + glob.pattern;
	    }
	  }

	  return glob;
	}

	/**
	 * Collapse repeated character sequences.
	 *
	 * ```js
	 * collapse('a/../../../b', '../');
	 * //=> 'a/../b'
	 * ```
	 *
	 * @param  {String} `str`
	 * @param  {String} `ch` Character sequence to collapse
	 * @return {String}
	 */

	function collapse(str, ch) {
	  var res = str.split(ch);
	  var isFirst = res[0] === '';
	  var isLast = res[res.length - 1] === '';
	  res = res.filter(Boolean);
	  if (isFirst) res.unshift('');
	  if (isLast) res.push('');
	  return res.join(ch);
	}

	/**
	 * Negate slashes in exclusion ranges, per glob spec:
	 *
	 * ```js
	 * negateSlash('[^foo]');
	 * //=> '[^\\/foo]'
	 * ```
	 *
	 * @param  {String} `str` glob pattern
	 * @return {String}
	 */

	function negateSlash(str) {
	  return str.replace(/\[\^([^\]]*?)\]/g, function(match, inner) {
	    if (inner.indexOf('/') === -1) {
	      inner = '\\/' + inner;
	    }
	    return '[^' + inner + ']';
	  });
	}

	/**
	 * Escape imbalanced braces/bracket. This is a very
	 * basic, naive implementation that only does enough
	 * to serve the purpose.
	 */

	function balance(str, a, b) {
	  var aarr = str.split(a);
	  var alen = aarr.join('').length;
	  var blen = str.split(b).join('').length;

	  if (alen !== blen) {
	    str = aarr.join('\\' + a);
	    return str.split(b).join('\\' + b);
	  }
	  return str;
	}

	/**
	 * Special patterns to be converted to regex.
	 * Heuristics are used to simplify patterns
	 * and speed up processing.
	 */

	/* eslint no-multi-spaces: 0 */
	var qmark       = '[^/]';
	var star        = qmark + '*?';
	var nodot       = '(?!\\.)(?=.)';
	var dotfileGlob = '(?:\\/|^)\\.{1,2}($|\\/)';
	var dotfiles    = '(?!' + dotfileGlob + ')(?=.)';
	var twoStarDot  = '(?:(?!' + dotfileGlob + ').)*?';

	/**
	 * Create a regex for `*`.
	 *
	 * If `dot` is true, or the pattern does not begin with
	 * a leading star, then return the simpler regex.
	 */

	function oneStar(dotfile) {
	  return dotfile ? '(?!' + dotfileGlob + ')(?=.)' + star : (nodot + star);
	}

	function globstar(dotfile) {
	  if (dotfile) { return twoStarDot; }
	  return '(?:(?!(?:\\/|^)\\.).)*?';
	}


/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var win32 = process && process.platform === 'win32';
	var path = __webpack_require__(53);
	var fileRe = __webpack_require__(54);
	var utils = module.exports;

	/**
	 * Module dependencies
	 */

	utils.diff = __webpack_require__(55);
	utils.unique = __webpack_require__(57);
	utils.braces = __webpack_require__(58);
	utils.brackets = __webpack_require__(69);
	utils.extglob = __webpack_require__(71);
	utils.isExtglob = __webpack_require__(72);
	utils.isGlob = __webpack_require__(73);
	utils.typeOf = __webpack_require__(64);
	utils.normalize = __webpack_require__(74);
	utils.omit = __webpack_require__(75);
	utils.parseGlob = __webpack_require__(79);
	utils.cache = __webpack_require__(83);

	/**
	 * Get the filename of a filepath
	 *
	 * @param {String} `string`
	 * @return {String}
	 */

	utils.filename = function filename(fp) {
	  var seg = fp.match(fileRe());
	  return seg && seg[0];
	};

	/**
	 * Returns a function that returns true if the given
	 * pattern is the same as a given `filepath`
	 *
	 * @param {String} `pattern`
	 * @return {Function}
	 */

	utils.isPath = function isPath(pattern, opts) {
	  opts = opts || {};
	  return function(fp) {
	    var unixified = utils.unixify(fp, opts);
	    if(opts.nocase){
	      return pattern.toLowerCase() === unixified.toLowerCase();
	    }
	    return pattern === unixified;
	  };
	};

	/**
	 * Returns a function that returns true if the given
	 * pattern contains a `filepath`
	 *
	 * @param {String} `pattern`
	 * @return {Function}
	 */

	utils.hasPath = function hasPath(pattern, opts) {
	  return function(fp) {
	    return utils.unixify(pattern, opts).indexOf(fp) !== -1;
	  };
	};

	/**
	 * Returns a function that returns true if the given
	 * pattern matches or contains a `filepath`
	 *
	 * @param {String} `pattern`
	 * @return {Function}
	 */

	utils.matchPath = function matchPath(pattern, opts) {
	  var fn = (opts && opts.contains)
	    ? utils.hasPath(pattern, opts)
	    : utils.isPath(pattern, opts);
	  return fn;
	};

	/**
	 * Returns a function that returns true if the given
	 * regex matches the `filename` of a file path.
	 *
	 * @param {RegExp} `re`
	 * @return {Boolean}
	 */

	utils.hasFilename = function hasFilename(re) {
	  return function(fp) {
	    var name = utils.filename(fp);
	    return name && re.test(name);
	  };
	};

	/**
	 * Coerce `val` to an array
	 *
	 * @param  {*} val
	 * @return {Array}
	 */

	utils.arrayify = function arrayify(val) {
	  return !Array.isArray(val)
	    ? [val]
	    : val;
	};

	/**
	 * Normalize all slashes in a file path or glob pattern to
	 * forward slashes.
	 */

	utils.unixify = function unixify(fp, opts) {
	  if (opts && opts.unixify === false) return fp;
	  if (opts && opts.unixify === true || win32 || path.sep === '\\') {
	    return utils.normalize(fp, false);
	  }
	  if (opts && opts.unescape === true) {
	    return fp ? fp.toString().replace(/\\(\w)/g, '$1') : '';
	  }
	  return fp;
	};

	/**
	 * Escape/unescape utils
	 */

	utils.escapePath = function escapePath(fp) {
	  return fp.replace(/[\\.]/g, '\\$&');
	};

	utils.unescapeGlob = function unescapeGlob(fp) {
	  return fp.replace(/[\\"']/g, '');
	};

	utils.escapeRe = function escapeRe(str) {
	  return str.replace(/[-[\\$*+?.#^\s{}(|)\]]/g, '\\$&');
	};

	/**
	 * Expose `utils`
	 */

	module.exports = utils;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	// resolves . and .. elements in a path array with directory names there
	// must be no slashes, empty elements, or device names (c:\) in the array
	// (so also no leading and trailing slashes - it does not distinguish
	// relative and absolute paths)
	function normalizeArray(parts, allowAboveRoot) {
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = parts.length - 1; i >= 0; i--) {
	    var last = parts[i];
	    if (last === '.') {
	      parts.splice(i, 1);
	    } else if (last === '..') {
	      parts.splice(i, 1);
	      up++;
	    } else if (up) {
	      parts.splice(i, 1);
	      up--;
	    }
	  }

	  // if the path is allowed to go above the root, restore leading ..s
	  if (allowAboveRoot) {
	    for (; up--; up) {
	      parts.unshift('..');
	    }
	  }

	  return parts;
	}

	// Split a filename into [root, dir, basename, ext], unix version
	// 'root' is just a slash, or nothing.
	var splitPathRe =
	    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
	var splitPath = function(filename) {
	  return splitPathRe.exec(filename).slice(1);
	};

	// path.resolve([from ...], to)
	// posix version
	exports.resolve = function() {
	  var resolvedPath = '',
	      resolvedAbsolute = false;

	  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
	    var path = (i >= 0) ? arguments[i] : process.cwd();

	    // Skip empty and invalid entries
	    if (typeof path !== 'string') {
	      throw new TypeError('Arguments to path.resolve must be strings');
	    } else if (!path) {
	      continue;
	    }

	    resolvedPath = path + '/' + resolvedPath;
	    resolvedAbsolute = path.charAt(0) === '/';
	  }

	  // At this point the path should be resolved to a full absolute path, but
	  // handle relative paths to be safe (might happen when process.cwd() fails)

	  // Normalize the path
	  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
	    return !!p;
	  }), !resolvedAbsolute).join('/');

	  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
	};

	// path.normalize(path)
	// posix version
	exports.normalize = function(path) {
	  var isAbsolute = exports.isAbsolute(path),
	      trailingSlash = substr(path, -1) === '/';

	  // Normalize the path
	  path = normalizeArray(filter(path.split('/'), function(p) {
	    return !!p;
	  }), !isAbsolute).join('/');

	  if (!path && !isAbsolute) {
	    path = '.';
	  }
	  if (path && trailingSlash) {
	    path += '/';
	  }

	  return (isAbsolute ? '/' : '') + path;
	};

	// posix version
	exports.isAbsolute = function(path) {
	  return path.charAt(0) === '/';
	};

	// posix version
	exports.join = function() {
	  var paths = Array.prototype.slice.call(arguments, 0);
	  return exports.normalize(filter(paths, function(p, index) {
	    if (typeof p !== 'string') {
	      throw new TypeError('Arguments to path.join must be strings');
	    }
	    return p;
	  }).join('/'));
	};


	// path.relative(from, to)
	// posix version
	exports.relative = function(from, to) {
	  from = exports.resolve(from).substr(1);
	  to = exports.resolve(to).substr(1);

	  function trim(arr) {
	    var start = 0;
	    for (; start < arr.length; start++) {
	      if (arr[start] !== '') break;
	    }

	    var end = arr.length - 1;
	    for (; end >= 0; end--) {
	      if (arr[end] !== '') break;
	    }

	    if (start > end) return [];
	    return arr.slice(start, end - start + 1);
	  }

	  var fromParts = trim(from.split('/'));
	  var toParts = trim(to.split('/'));

	  var length = Math.min(fromParts.length, toParts.length);
	  var samePartsLength = length;
	  for (var i = 0; i < length; i++) {
	    if (fromParts[i] !== toParts[i]) {
	      samePartsLength = i;
	      break;
	    }
	  }

	  var outputParts = [];
	  for (var i = samePartsLength; i < fromParts.length; i++) {
	    outputParts.push('..');
	  }

	  outputParts = outputParts.concat(toParts.slice(samePartsLength));

	  return outputParts.join('/');
	};

	exports.sep = '/';
	exports.delimiter = ':';

	exports.dirname = function(path) {
	  var result = splitPath(path),
	      root = result[0],
	      dir = result[1];

	  if (!root && !dir) {
	    // No dirname whatsoever
	    return '.';
	  }

	  if (dir) {
	    // It has a dirname, strip trailing slash
	    dir = dir.substr(0, dir.length - 1);
	  }

	  return root + dir;
	};


	exports.basename = function(path, ext) {
	  var f = splitPath(path)[2];
	  // TODO: make this comparison case-insensitive on windows?
	  if (ext && f.substr(-1 * ext.length) === ext) {
	    f = f.substr(0, f.length - ext.length);
	  }
	  return f;
	};


	exports.extname = function(path) {
	  return splitPath(path)[3];
	};

	function filter (xs, f) {
	    if (xs.filter) return xs.filter(f);
	    var res = [];
	    for (var i = 0; i < xs.length; i++) {
	        if (f(xs[i], i, xs)) res.push(xs[i]);
	    }
	    return res;
	}

	// String.prototype.substr - negative index don't work in IE8
	var substr = 'ab'.substr(-1) === 'b'
	    ? function (str, start, len) { return str.substr(start, len) }
	    : function (str, start, len) {
	        if (start < 0) start = str.length + start;
	        return str.substr(start, len);
	    }
	;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(5)))

/***/ },
/* 54 */
/***/ function(module, exports) {

	/*!
	 * filename-regex <https://github.com/regexps/filename-regex>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert
	 * Licensed under the MIT license.
	 */

	module.exports = function filenameRegex() {
	  return /([^\\\/]+)$/;
	};


/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * arr-diff <https://github.com/jonschlinkert/arr-diff>
	 *
	 * Copyright (c) 2014 Jon Schlinkert, contributors.
	 * Licensed under the MIT License
	 */

	'use strict';

	var flatten = __webpack_require__(56);
	var slice = [].slice;

	/**
	 * Return the difference between the first array and
	 * additional arrays.
	 *
	 * ```js
	 * var diff = require('{%= name %}');
	 *
	 * var a = ['a', 'b', 'c', 'd'];
	 * var b = ['b', 'c'];
	 *
	 * console.log(diff(a, b))
	 * //=> ['a', 'd']
	 * ```
	 *
	 * @param  {Array} `a`
	 * @param  {Array} `b`
	 * @return {Array}
	 * @api public
	 */

	function diff(arr, arrays) {
	  var argsLen = arguments.length;
	  var len = arr.length, i = -1;
	  var res = [], arrays;

	  if (argsLen === 1) {
	    return arr;
	  }

	  if (argsLen > 2) {
	    arrays = flatten(slice.call(arguments, 1));
	  }

	  while (++i < len) {
	    if (!~arrays.indexOf(arr[i])) {
	      res.push(arr[i]);
	    }
	  }
	  return res;
	}

	/**
	 * Expose `diff`
	 */

	module.exports = diff;


/***/ },
/* 56 */
/***/ function(module, exports) {

	/*!
	 * arr-flatten <https://github.com/jonschlinkert/arr-flatten>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	module.exports = function flatten(arr) {
	  return flat(arr, []);
	};

	function flat(arr, res) {
	  var len = arr.length;
	  var i = -1;

	  while (len--) {
	    var cur = arr[++i];
	    if (Array.isArray(cur)) {
	      flat(cur, res);
	    } else {
	      res.push(cur);
	    }
	  }
	  return res;
	}

/***/ },
/* 57 */
/***/ function(module, exports) {

	/*!
	 * array-unique <https://github.com/jonschlinkert/array-unique>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	module.exports = function unique(arr) {
	  if (!Array.isArray(arr)) {
	    throw new TypeError('array-unique expects an array.');
	  }

	  var len = arr.length;
	  var i = -1;

	  while (i++ < len) {
	    var j = i + 1;

	    for (; j < arr.length; ++j) {
	      if (arr[i] === arr[j]) {
	        arr.splice(j--, 1);
	      }
	    }
	  }
	  return arr;
	};


/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * braces <https://github.com/jonschlinkert/braces>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT license.
	 */

	'use strict';

	/**
	 * Module dependencies
	 */

	var expand = __webpack_require__(59);
	var repeat = __webpack_require__(67);
	var tokens = __webpack_require__(68);

	/**
	 * Expose `braces`
	 */

	module.exports = function(str, options) {
	  if (typeof str !== 'string') {
	    throw new Error('braces expects a string');
	  }
	  return braces(str, options);
	};

	/**
	 * Expand `{foo,bar}` or `{1..5}` braces in the
	 * given `string`.
	 *
	 * @param  {String} `str`
	 * @param  {Array} `arr`
	 * @param  {Object} `options`
	 * @return {Array}
	 */

	function braces(str, arr, options) {
	  if (str === '') {
	    return [];
	  }

	  if (!Array.isArray(arr)) {
	    options = arr;
	    arr = [];
	  }

	  var opts = options || {};
	  arr = arr || [];

	  if (typeof opts.nodupes === 'undefined') {
	    opts.nodupes = true;
	  }

	  var fn = opts.fn;
	  var es6;

	  if (typeof opts === 'function') {
	    fn = opts;
	    opts = {};
	  }

	  if (!(patternRe instanceof RegExp)) {
	    patternRe = patternRegex();
	  }

	  var matches = str.match(patternRe) || [];
	  var m = matches[0];

	  switch(m) {
	    case '\\,':
	      return escapeCommas(str, arr, opts);
	    case '\\.':
	      return escapeDots(str, arr, opts);
	    case '\/.':
	      return escapePaths(str, arr, opts);
	    case ' ':
	      return splitWhitespace(str);
	    case '{,}':
	      return exponential(str, opts, braces);
	    case '{}':
	      return emptyBraces(str, arr, opts);
	    case '\\{':
	    case '\\}':
	      return escapeBraces(str, arr, opts);
	    case '${':
	      if (!/\{[^{]+\{/.test(str)) {
	        return arr.concat(str);
	      } else {
	        es6 = true;
	        str = tokens.before(str, es6Regex());
	      }
	  }

	  if (!(braceRe instanceof RegExp)) {
	    braceRe = braceRegex();
	  }

	  var match = braceRe.exec(str);
	  if (match == null) {
	    return [str];
	  }

	  var outter = match[1];
	  var inner = match[2];
	  if (inner === '') { return [str]; }

	  var segs, segsLength;

	  if (inner.indexOf('..') !== -1) {
	    segs = expand(inner, opts, fn) || inner.split(',');
	    segsLength = segs.length;

	  } else if (inner[0] === '"' || inner[0] === '\'') {
	    return arr.concat(str.split(/['"]/).join(''));

	  } else {
	    segs = inner.split(',');
	    if (opts.makeRe) {
	      return braces(str.replace(outter, wrap(segs, '|')), opts);
	    }

	    segsLength = segs.length;
	    if (segsLength === 1 && opts.bash) {
	      segs[0] = wrap(segs[0], '\\');
	    }
	  }

	  var len = segs.length;
	  var i = 0, val;

	  while (len--) {
	    var path = segs[i++];

	    if (/(\.[^.\/])/.test(path)) {
	      if (segsLength > 1) {
	        return segs;
	      } else {
	        return [str];
	      }
	    }

	    val = splice(str, outter, path);

	    if (/\{[^{}]+?\}/.test(val)) {
	      arr = braces(val, arr, opts);
	    } else if (val !== '') {
	      if (opts.nodupes && arr.indexOf(val) !== -1) { continue; }
	      arr.push(es6 ? tokens.after(val) : val);
	    }
	  }

	  if (opts.strict) { return filter(arr, filterEmpty); }
	  return arr;
	}

	/**
	 * Expand exponential ranges
	 *
	 *   `a{,}{,}` => ['a', 'a', 'a', 'a']
	 */

	function exponential(str, options, fn) {
	  if (typeof options === 'function') {
	    fn = options;
	    options = null;
	  }

	  var opts = options || {};
	  var esc = '__ESC_EXP__';
	  var exp = 0;
	  var res;

	  var parts = str.split('{,}');
	  if (opts.nodupes) {
	    return fn(parts.join(''), opts);
	  }

	  exp = parts.length - 1;
	  res = fn(parts.join(esc), opts);
	  var len = res.length;
	  var arr = [];
	  var i = 0;

	  while (len--) {
	    var ele = res[i++];
	    var idx = ele.indexOf(esc);

	    if (idx === -1) {
	      arr.push(ele);

	    } else {
	      ele = ele.split('__ESC_EXP__').join('');
	      if (!!ele && opts.nodupes !== false) {
	        arr.push(ele);

	      } else {
	        var num = Math.pow(2, exp);
	        arr.push.apply(arr, repeat(ele, num));
	      }
	    }
	  }
	  return arr;
	}

	/**
	 * Wrap a value with parens, brackets or braces,
	 * based on the given character/separator.
	 *
	 * @param  {String|Array} `val`
	 * @param  {String} `ch`
	 * @return {String}
	 */

	function wrap(val, ch) {
	  if (ch === '|') {
	    return '(' + val.join(ch) + ')';
	  }
	  if (ch === ',') {
	    return '{' + val.join(ch) + '}';
	  }
	  if (ch === '-') {
	    return '[' + val.join(ch) + ']';
	  }
	  if (ch === '\\') {
	    return '\\{' + val + '\\}';
	  }
	}

	/**
	 * Handle empty braces: `{}`
	 */

	function emptyBraces(str, arr, opts) {
	  return braces(str.split('{}').join('\\{\\}'), arr, opts);
	}

	/**
	 * Filter out empty-ish values
	 */

	function filterEmpty(ele) {
	  return !!ele && ele !== '\\';
	}

	/**
	 * Handle patterns with whitespace
	 */

	function splitWhitespace(str) {
	  var segs = str.split(' ');
	  var len = segs.length;
	  var res = [];
	  var i = 0;

	  while (len--) {
	    res.push.apply(res, braces(segs[i++]));
	  }
	  return res;
	}

	/**
	 * Handle escaped braces: `\\{foo,bar}`
	 */

	function escapeBraces(str, arr, opts) {
	  if (!/\{[^{]+\{/.test(str)) {
	    return arr.concat(str.split('\\').join(''));
	  } else {
	    str = str.split('\\{').join('__LT_BRACE__');
	    str = str.split('\\}').join('__RT_BRACE__');
	    return map(braces(str, arr, opts), function(ele) {
	      ele = ele.split('__LT_BRACE__').join('{');
	      return ele.split('__RT_BRACE__').join('}');
	    });
	  }
	}

	/**
	 * Handle escaped dots: `{1\\.2}`
	 */

	function escapeDots(str, arr, opts) {
	  if (!/[^\\]\..+\\\./.test(str)) {
	    return arr.concat(str.split('\\').join(''));
	  } else {
	    str = str.split('\\.').join('__ESC_DOT__');
	    return map(braces(str, arr, opts), function(ele) {
	      return ele.split('__ESC_DOT__').join('.');
	    });
	  }
	}

	/**
	 * Handle escaped dots: `{1\\.2}`
	 */

	function escapePaths(str, arr, opts) {
	  str = str.split('\/.').join('__ESC_PATH__');
	  return map(braces(str, arr, opts), function(ele) {
	    return ele.split('__ESC_PATH__').join('\/.');
	  });
	}

	/**
	 * Handle escaped commas: `{a\\,b}`
	 */

	function escapeCommas(str, arr, opts) {
	  if (!/\w,/.test(str)) {
	    return arr.concat(str.split('\\').join(''));
	  } else {
	    str = str.split('\\,').join('__ESC_COMMA__');
	    return map(braces(str, arr, opts), function(ele) {
	      return ele.split('__ESC_COMMA__').join(',');
	    });
	  }
	}

	/**
	 * Regex for common patterns
	 */

	function patternRegex() {
	  return /\${|( (?=[{,}])|(?=[{,}]) )|{}|{,}|\\,(?=.*[{}])|\/\.(?=.*[{}])|\\\.(?={)|\\{|\\}/;
	}

	/**
	 * Braces regex.
	 */

	function braceRegex() {
	  return /.*(\\?\{([^}]+)\})/;
	}

	/**
	 * es6 delimiter regex.
	 */

	function es6Regex() {
	  return /\$\{([^}]+)\}/;
	}

	var braceRe;
	var patternRe;

	/**
	 * Faster alternative to `String.replace()` when the
	 * index of the token to be replaces can't be supplied
	 */

	function splice(str, token, replacement) {
	  var i = str.indexOf(token);
	  return str.substr(0, i) + replacement
	    + str.substr(i + token.length);
	}

	/**
	 * Fast array map
	 */

	function map(arr, fn) {
	  if (arr == null) {
	    return [];
	  }

	  var len = arr.length;
	  var res = new Array(len);
	  var i = -1;

	  while (++i < len) {
	    res[i] = fn(arr[i], i, arr);
	  }

	  return res;
	}

	/**
	 * Fast array filter
	 */

	function filter(arr, cb) {
	  if (arr == null) return [];
	  if (typeof cb !== 'function') {
	    throw new TypeError('braces: filter expects a callback function.');
	  }

	  var len = arr.length;
	  var res = arr.slice();
	  var i = 0;

	  while (len--) {
	    if (!cb(arr[len], i++)) {
	      res.splice(len, 1);
	    }
	  }
	  return res;
	}


/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * expand-range <https://github.com/jonschlinkert/expand-range>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT license.
	 */

	'use strict';

	var fill = __webpack_require__(60);

	module.exports = function expandRange(str, options, fn) {
	  if (typeof str !== 'string') {
	    throw new TypeError('expand-range expects a string.');
	  }

	  if (typeof options === 'function') {
	    fn = options;
	    options = {};
	  }

	  if (typeof options === 'boolean') {
	    options = {};
	    options.makeRe = true;
	  }

	  // create arguments to pass to fill-range
	  var opts = options || {};
	  var args = str.split('..');
	  var len = args.length;
	  if (len > 3) { return str; }

	  // if only one argument, it can't expand so return it
	  if (len === 1) { return args; }

	  // if `true`, tell fill-range to regexify the string
	  if (typeof fn === 'boolean' && fn === true) {
	    opts.makeRe = true;
	  }

	  args.push(opts);
	  return fill.apply(null, args.concat(fn));
	};


/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * fill-range <https://github.com/jonschlinkert/fill-range>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	var isObject = __webpack_require__(61);
	var isNumber = __webpack_require__(63);
	var randomize = __webpack_require__(65);
	var repeatStr = __webpack_require__(66);
	var repeat = __webpack_require__(67);

	/**
	 * Expose `fillRange`
	 */

	module.exports = fillRange;

	/**
	 * Return a range of numbers or letters.
	 *
	 * @param  {String} `a` Start of the range
	 * @param  {String} `b` End of the range
	 * @param  {String} `step` Increment or decrement to use.
	 * @param  {Function} `fn` Custom function to modify each element in the range.
	 * @return {Array}
	 */

	function fillRange(a, b, step, options, fn) {
	  if (a == null || b == null) {
	    throw new Error('fill-range expects the first and second args to be strings.');
	  }

	  if (typeof step === 'function') {
	    fn = step; options = {}; step = null;
	  }

	  if (typeof options === 'function') {
	    fn = options; options = {};
	  }

	  if (isObject(step)) {
	    options = step; step = '';
	  }

	  var expand, regex = false, sep = '';
	  var opts = options || {};

	  if (typeof opts.silent === 'undefined') {
	    opts.silent = true;
	  }

	  step = step || opts.step;

	  // store a ref to unmodified arg
	  var origA = a, origB = b;

	  b = (b.toString() === '-0') ? 0 : b;

	  if (opts.optimize || opts.makeRe) {
	    step = step ? (step += '~') : step;
	    expand = true;
	    regex = true;
	    sep = '~';
	  }

	  // handle special step characters
	  if (typeof step === 'string') {
	    var match = stepRe().exec(step);

	    if (match) {
	      var i = match.index;
	      var m = match[0];

	      // repeat string
	      if (m === '+') {
	        return repeat(a, b);

	      // randomize a, `b` times
	      } else if (m === '?') {
	        return [randomize(a, b)];

	      // expand right, no regex reduction
	      } else if (m === '>') {
	        step = step.substr(0, i) + step.substr(i + 1);
	        expand = true;

	      // expand to an array, or if valid create a reduced
	      // string for a regex logic `or`
	      } else if (m === '|') {
	        step = step.substr(0, i) + step.substr(i + 1);
	        expand = true;
	        regex = true;
	        sep = m;

	      // expand to an array, or if valid create a reduced
	      // string for a regex range
	      } else if (m === '~') {
	        step = step.substr(0, i) + step.substr(i + 1);
	        expand = true;
	        regex = true;
	        sep = m;
	      }
	    } else if (!isNumber(step)) {
	      if (!opts.silent) {
	        throw new TypeError('fill-range: invalid step.');
	      }
	      return null;
	    }
	  }

	  if (/[.&*()[\]^%$#@!]/.test(a) || /[.&*()[\]^%$#@!]/.test(b)) {
	    if (!opts.silent) {
	      throw new RangeError('fill-range: invalid range arguments.');
	    }
	    return null;
	  }

	  // has neither a letter nor number, or has both letters and numbers
	  // this needs to be after the step logic
	  if (!noAlphaNum(a) || !noAlphaNum(b) || hasBoth(a) || hasBoth(b)) {
	    if (!opts.silent) {
	      throw new RangeError('fill-range: invalid range arguments.');
	    }
	    return null;
	  }

	  // validate arguments
	  var isNumA = isNumber(zeros(a));
	  var isNumB = isNumber(zeros(b));

	  if ((!isNumA && isNumB) || (isNumA && !isNumB)) {
	    if (!opts.silent) {
	      throw new TypeError('fill-range: first range argument is incompatible with second.');
	    }
	    return null;
	  }

	  // by this point both are the same, so we
	  // can use A to check going forward.
	  var isNum = isNumA;
	  var num = formatStep(step);

	  // is the range alphabetical? or numeric?
	  if (isNum) {
	    // if numeric, coerce to an integer
	    a = +a; b = +b;
	  } else {
	    // otherwise, get the charCode to expand alpha ranges
	    a = a.charCodeAt(0);
	    b = b.charCodeAt(0);
	  }

	  // is the pattern descending?
	  var isDescending = a > b;

	  // don't create a character class if the args are < 0
	  if (a < 0 || b < 0) {
	    expand = false;
	    regex = false;
	  }

	  // detect padding
	  var padding = isPadded(origA, origB);
	  var res, pad, arr = [];
	  var ii = 0;

	  // character classes, ranges and logical `or`
	  if (regex) {
	    if (shouldExpand(a, b, num, isNum, padding, opts)) {
	      // make sure the correct separator is used
	      if (sep === '|' || sep === '~') {
	        sep = detectSeparator(a, b, num, isNum, isDescending);
	      }
	      return wrap([origA, origB], sep, opts);
	    }
	  }

	  while (isDescending ? (a >= b) : (a <= b)) {
	    if (padding && isNum) {
	      pad = padding(a);
	    }

	    // custom function
	    if (typeof fn === 'function') {
	      res = fn(a, isNum, pad, ii++);

	    // letters
	    } else if (!isNum) {
	      if (regex && isInvalidChar(a)) {
	        res = null;
	      } else {
	        res = String.fromCharCode(a);
	      }

	    // numbers
	    } else {
	      res = formatPadding(a, pad);
	    }

	    // add result to the array, filtering any nulled values
	    if (res !== null) arr.push(res);

	    // increment or decrement
	    if (isDescending) {
	      a -= num;
	    } else {
	      a += num;
	    }
	  }

	  // now that the array is expanded, we need to handle regex
	  // character classes, ranges or logical `or` that wasn't
	  // already handled before the loop
	  if ((regex || expand) && !opts.noexpand) {
	    // make sure the correct separator is used
	    if (sep === '|' || sep === '~') {
	      sep = detectSeparator(a, b, num, isNum, isDescending);
	    }
	    if (arr.length === 1 || a < 0 || b < 0) { return arr; }
	    return wrap(arr, sep, opts);
	  }

	  return arr;
	}

	/**
	 * Wrap the string with the correct regex
	 * syntax.
	 */

	function wrap(arr, sep, opts) {
	  if (sep === '~') { sep = '-'; }
	  var str = arr.join(sep);
	  var pre = opts && opts.regexPrefix;

	  // regex logical `or`
	  if (sep === '|') {
	    str = pre ? pre + str : str;
	    str = '(' + str + ')';
	  }

	  // regex character class
	  if (sep === '-') {
	    str = (pre && pre === '^')
	      ? pre + str
	      : str;
	    str = '[' + str + ']';
	  }
	  return [str];
	}

	/**
	 * Check for invalid characters
	 */

	function isCharClass(a, b, step, isNum, isDescending) {
	  if (isDescending) { return false; }
	  if (isNum) { return a <= 9 && b <= 9; }
	  if (a < b) { return step === 1; }
	  return false;
	}

	/**
	 * Detect the correct separator to use
	 */

	function shouldExpand(a, b, num, isNum, padding, opts) {
	  if (isNum && (a > 9 || b > 9)) { return false; }
	  return !padding && num === 1 && a < b;
	}

	/**
	 * Detect the correct separator to use
	 */

	function detectSeparator(a, b, step, isNum, isDescending) {
	  var isChar = isCharClass(a, b, step, isNum, isDescending);
	  if (!isChar) {
	    return '|';
	  }
	  return '~';
	}

	/**
	 * Correctly format the step based on type
	 */

	function formatStep(step) {
	  return Math.abs(step >> 0) || 1;
	}

	/**
	 * Format padding, taking leading `-` into account
	 */

	function formatPadding(ch, pad) {
	  var res = pad ? pad + ch : ch;
	  if (pad && ch.toString().charAt(0) === '-') {
	    res = '-' + pad + ch.toString().substr(1);
	  }
	  return res.toString();
	}

	/**
	 * Check for invalid characters
	 */

	function isInvalidChar(str) {
	  var ch = toStr(str);
	  return ch === '\\'
	    || ch === '['
	    || ch === ']'
	    || ch === '^'
	    || ch === '('
	    || ch === ')'
	    || ch === '`';
	}

	/**
	 * Convert to a string from a charCode
	 */

	function toStr(ch) {
	  return String.fromCharCode(ch);
	}


	/**
	 * Step regex
	 */

	function stepRe() {
	  return /\?|>|\||\+|\~/g;
	}

	/**
	 * Return true if `val` has either a letter
	 * or a number
	 */

	function noAlphaNum(val) {
	  return /[a-z0-9]/i.test(val);
	}

	/**
	 * Return true if `val` has both a letter and
	 * a number (invalid)
	 */

	function hasBoth(val) {
	  return /[a-z][0-9]|[0-9][a-z]/i.test(val);
	}

	/**
	 * Normalize zeros for checks
	 */

	function zeros(val) {
	  if (/^-*0+$/.test(val.toString())) {
	    return '0';
	  }
	  return val;
	}

	/**
	 * Return true if `val` has leading zeros,
	 * or a similar valid pattern.
	 */

	function hasZeros(val) {
	  return /[^.]\.|^-*0+[0-9]/.test(val);
	}

	/**
	 * If the string is padded, returns a curried function with
	 * the a cached padding string, or `false` if no padding.
	 *
	 * @param  {*} `origA` String or number.
	 * @return {String|Boolean}
	 */

	function isPadded(origA, origB) {
	  if (hasZeros(origA) || hasZeros(origB)) {
	    var alen = length(origA);
	    var blen = length(origB);

	    var len = alen >= blen
	      ? alen
	      : blen;

	    return function (a) {
	      return repeatStr('0', len - length(a));
	    };
	  }
	  return false;
	}

	/**
	 * Get the string length of `val`
	 */

	function length(val) {
	  return val.toString().length;
	}


/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * isobject <https://github.com/jonschlinkert/isobject>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	var isArray = __webpack_require__(62);

	module.exports = function isObject(val) {
	  return val != null && typeof val === 'object' && isArray(val) === false;
	};


/***/ },
/* 62 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * is-number <https://github.com/jonschlinkert/is-number>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	var typeOf = __webpack_require__(64);

	module.exports = function isNumber(num) {
	  var type = typeOf(num);
	  if (type !== 'number' && type !== 'string') {
	    return false;
	  }
	  var n = +num;
	  return (n - n + 1) >= 0 && num !== '';
	};


/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var isBuffer = __webpack_require__(48);
	var toString = Object.prototype.toString;

	/**
	 * Get the native `typeof` a value.
	 *
	 * @param  {*} `val`
	 * @return {*} Native javascript type
	 */

	module.exports = function kindOf(val) {
	  // primitivies
	  if (typeof val === 'undefined') {
	    return 'undefined';
	  }
	  if (val === null) {
	    return 'null';
	  }
	  if (val === true || val === false || val instanceof Boolean) {
	    return 'boolean';
	  }
	  if (typeof val === 'string' || val instanceof String) {
	    return 'string';
	  }
	  if (typeof val === 'number' || val instanceof Number) {
	    return 'number';
	  }

	  // functions
	  if (typeof val === 'function' || val instanceof Function) {
	    return 'function';
	  }

	  // array
	  if (typeof Array.isArray !== 'undefined' && Array.isArray(val)) {
	    return 'array';
	  }

	  // check for instances of RegExp and Date before calling `toString`
	  if (val instanceof RegExp) {
	    return 'regexp';
	  }
	  if (val instanceof Date) {
	    return 'date';
	  }

	  // other objects
	  var type = toString.call(val);

	  if (type === '[object RegExp]') {
	    return 'regexp';
	  }
	  if (type === '[object Date]') {
	    return 'date';
	  }
	  if (type === '[object Arguments]') {
	    return 'arguments';
	  }

	  // buffer
	  if (typeof Buffer !== 'undefined' && isBuffer(val)) {
	    return 'buffer';
	  }

	  // es6: Map, WeakMap, Set, WeakSet
	  if (type === '[object Set]') {
	    return 'set';
	  }
	  if (type === '[object WeakSet]') {
	    return 'weakset';
	  }
	  if (type === '[object Map]') {
	    return 'map';
	  }
	  if (type === '[object WeakMap]') {
	    return 'weakmap';
	  }
	  if (type === '[object Symbol]') {
	    return 'symbol';
	  }

	  // typed arrays
	  if (type === '[object Int8Array]') {
	    return 'int8array';
	  }
	  if (type === '[object Uint8Array]') {
	    return 'uint8array';
	  }
	  if (type === '[object Uint8ClampedArray]') {
	    return 'uint8clampedarray';
	  }
	  if (type === '[object Int16Array]') {
	    return 'int16array';
	  }
	  if (type === '[object Uint16Array]') {
	    return 'uint16array';
	  }
	  if (type === '[object Int32Array]') {
	    return 'int32array';
	  }
	  if (type === '[object Uint32Array]') {
	    return 'uint32array';
	  }
	  if (type === '[object Float32Array]') {
	    return 'float32array';
	  }
	  if (type === '[object Float64Array]') {
	    return 'float64array';
	  }

	  // must be a plain object
	  return 'object';
	};

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(44).Buffer))

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * randomatic <https://github.com/jonschlinkert/randomatic>
	 *
	 * This was originally inspired by <http://stackoverflow.com/a/10727155/1267639>
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License (MIT)
	 */

	'use strict';

	var isNumber = __webpack_require__(63);
	var typeOf = __webpack_require__(64);

	/**
	 * Expose `randomatic`
	 */

	module.exports = randomatic;

	/**
	 * Available mask characters
	 */

	var type = {
	  lower: 'abcdefghijklmnopqrstuvwxyz',
	  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	  number: '0123456789',
	  special: '~!@#$%^&()_+-={}[];\',.'
	};

	type.all = type.lower + type.upper + type.number;

	/**
	 * Generate random character sequences of a specified `length`,
	 * based on the given `pattern`.
	 *
	 * @param {String} `pattern` The pattern to use for generating the random string.
	 * @param {String} `length` The length of the string to generate.
	 * @param {String} `options`
	 * @return {String}
	 * @api public
	 */

	function randomatic(pattern, length, options) {
	  if (typeof pattern === 'undefined') {
	    throw new Error('randomatic expects a string or number.');
	  }

	  var custom = false;
	  if (arguments.length === 1) {
	    if (typeof pattern === 'string') {
	      length = pattern.length;

	    } else if (isNumber(pattern)) {
	      options = {}; length = pattern; pattern = '*';
	    }
	  }

	  if (typeOf(length) === 'object' && length.hasOwnProperty('chars')) {
	    options = length;
	    pattern = options.chars;
	    length = pattern.length;
	    custom = true;
	  }

	  var opts = options || {};
	  var mask = '';
	  var res = '';

	  // Characters to be used
	  if (pattern.indexOf('?') !== -1) mask += opts.chars;
	  if (pattern.indexOf('a') !== -1) mask += type.lower;
	  if (pattern.indexOf('A') !== -1) mask += type.upper;
	  if (pattern.indexOf('0') !== -1) mask += type.number;
	  if (pattern.indexOf('!') !== -1) mask += type.special;
	  if (pattern.indexOf('*') !== -1) mask += type.all;
	  if (custom) mask += pattern;

	  while (length--) {
	    res += mask.charAt(parseInt(Math.random() * mask.length, 10));
	  }
	  return res;
	};


/***/ },
/* 66 */
/***/ function(module, exports) {

	/*!
	 * repeat-string <https://github.com/jonschlinkert/repeat-string>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	/**
	 * Results cache
	 */

	var res = '';
	var cache;

	/**
	 * Expose `repeat`
	 */

	module.exports = repeat;

	/**
	 * Repeat the given `string` the specified `number`
	 * of times.
	 *
	 * **Example:**
	 *
	 * ```js
	 * var repeat = require('repeat-string');
	 * repeat('A', 5);
	 * //=> AAAAA
	 * ```
	 *
	 * @param {String} `string` The string to repeat
	 * @param {Number} `number` The number of times to repeat the string
	 * @return {String} Repeated string
	 * @api public
	 */

	function repeat(str, num) {
	  if (typeof str !== 'string') {
	    throw new TypeError('repeat-string expects a string.');
	  }

	  // cover common, quick use cases
	  if (num === 1) return str;
	  if (num === 2) return str + str;

	  var max = str.length * num;
	  if (cache !== str || typeof cache === 'undefined') {
	    cache = str;
	    res = '';
	  }

	  while (max > res.length && num > 0) {
	    if (num & 1) {
	      res += str;
	    }

	    num >>= 1;
	    if (!num) break;
	    str += str;
	  }

	  return res.substr(0, max);
	}



/***/ },
/* 67 */
/***/ function(module, exports) {

	/*!
	 * repeat-element <https://github.com/jonschlinkert/repeat-element>
	 *
	 * Copyright (c) 2015 Jon Schlinkert.
	 * Licensed under the MIT license.
	 */

	'use strict';

	module.exports = function repeat(ele, num) {
	  var arr = new Array(num);

	  for (var i = 0; i < num; i++) {
	    arr[i] = ele;
	  }

	  return arr;
	};


/***/ },
/* 68 */
/***/ function(module, exports) {

	/*!
	 * preserve <https://github.com/jonschlinkert/preserve>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT license.
	 */

	'use strict';

	/**
	 * Replace tokens in `str` with a temporary, heuristic placeholder.
	 *
	 * ```js
	 * tokens.before('{a\\,b}');
	 * //=> '{__ID1__}'
	 * ```
	 *
	 * @param  {String} `str`
	 * @return {String} String with placeholders.
	 * @api public
	 */

	exports.before = function before(str, re) {
	  return str.replace(re, function (match) {
	    var id = randomize();
	    cache[id] = match;
	    return '__ID' + id + '__';
	  });
	};

	/**
	 * Replace placeholders in `str` with original tokens.
	 *
	 * ```js
	 * tokens.after('{__ID1__}');
	 * //=> '{a\\,b}'
	 * ```
	 *
	 * @param  {String} `str` String with placeholders
	 * @return {String} `str` String with original tokens.
	 * @api public
	 */

	exports.after = function after(str) {
	  return str.replace(/__ID(.{5})__/g, function (_, id) {
	    return cache[id];
	  });
	};

	function randomize() {
	  return Math.random().toString().slice(2, 7);
	}

	var cache = {};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * expand-brackets <https://github.com/jonschlinkert/expand-brackets>
	 *
	 * Copyright (c) 2015 Jon Schlinkert.
	 * Licensed under the MIT license.
	 */

	'use strict';

	var isPosixBracket = __webpack_require__(70);

	/**
	 * POSIX character classes
	 */

	var POSIX = {
	  alnum: 'a-zA-Z0-9',
	  alpha: 'a-zA-Z',
	  blank: ' \\t',
	  cntrl: '\\x00-\\x1F\\x7F',
	  digit: '0-9',
	  graph: '\\x21-\\x7E',
	  lower: 'a-z',
	  print: '\\x20-\\x7E',
	  punct: '-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
	  space: ' \\t\\r\\n\\v\\f',
	  upper: 'A-Z',
	  word:  'A-Za-z0-9_',
	  xdigit: 'A-Fa-f0-9',
	};

	/**
	 * Expose `brackets`
	 */

	module.exports = brackets;

	function brackets(str) {
	  if (!isPosixBracket(str)) {
	    return str;
	  }

	  var negated = false;
	  if (str.indexOf('[^') !== -1) {
	    negated = true;
	    str = str.split('[^').join('[');
	  }
	  if (str.indexOf('[!') !== -1) {
	    negated = true;
	    str = str.split('[!').join('[');
	  }

	  var a = str.split('[');
	  var b = str.split(']');
	  var imbalanced = a.length !== b.length;

	  var parts = str.split(/(?::\]\[:|\[?\[:|:\]\]?)/);
	  var len = parts.length, i = 0;
	  var end = '', beg = '';
	  var res = [];

	  // start at the end (innermost) first
	  while (len--) {
	    var inner = parts[i++];
	    if (inner === '^[!' || inner === '[!') {
	      inner = '';
	      negated = true;
	    }

	    var prefix = negated ? '^' : '';
	    var ch = POSIX[inner];

	    if (ch) {
	      res.push('[' + prefix + ch + ']');
	    } else if (inner) {
	      if (/^\[?\w-\w\]?$/.test(inner)) {
	        if (i === parts.length) {
	          res.push('[' + prefix + inner);
	        } else if (i === 1) {
	          res.push(prefix + inner + ']');
	        } else {
	          res.push(prefix + inner);
	        }
	      } else {
	        if (i === 1) {
	          beg += inner;
	        } else if (i === parts.length) {
	          end += inner;
	        } else {
	          res.push('[' + prefix + inner + ']');
	        }
	      }
	    }
	  }

	  var result = res.join('|');
	  var rlen = res.length || 1;
	  if (rlen > 1) {
	    result = '(?:' + result + ')';
	    rlen = 1;
	  }
	  if (beg) {
	    rlen++;
	    if (beg.charAt(0) === '[') {
	      if (imbalanced) {
	        beg = '\\[' + beg.slice(1);
	      } else {
	        beg += ']';
	      }
	    }
	    result = beg + result;
	  }
	  if (end) {
	    rlen++;
	    if (end.slice(-1) === ']') {
	      if (imbalanced) {
	        end = end.slice(0, end.length - 1) + '\\]';
	      } else {
	        end = '[' + end;
	      }
	    }
	    result += end;
	  }

	  if (rlen > 1) {
	    result = result.split('][').join(']|[');
	    if (result.indexOf('|') !== -1 && !/\(\?/.test(result)) {
	      result = '(?:' + result + ')';
	    }
	  }

	  result = result.replace(/\[+=|=\]+/g, '\\b');
	  return result;
	}

	brackets.makeRe = function(pattern) {
	  try {
	    return new RegExp(brackets(pattern));
	  } catch (err) {}
	};

	brackets.isMatch = function(str, pattern) {
	  try {
	    return brackets.makeRe(pattern).test(str);
	  } catch (err) {
	    return false;
	  }
	};

	brackets.match = function(arr, pattern) {
	  var len = arr.length, i = 0;
	  var res = arr.slice();

	  var re = brackets.makeRe(pattern);
	  while (i < len) {
	    var ele = arr[i++];
	    if (!re.test(ele)) {
	      continue;
	    }
	    res.splice(i, 1);
	  }
	  return res;
	};


/***/ },
/* 70 */
/***/ function(module, exports) {

	/*!
	 * is-posix-bracket <https://github.com/jonschlinkert/is-posix-bracket>
	 *
	 * Copyright (c) 2015-2016, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	module.exports = function isPosixBracket(str) {
	  return typeof str === 'string' && /\[([:.=+])(?:[^\[\]]|)+\1\]/.test(str);
	};


/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * extglob <https://github.com/jonschlinkert/extglob>
	 *
	 * Copyright (c) 2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	/**
	 * Module dependencies
	 */

	var isExtglob = __webpack_require__(72);
	var re, cache = {};

	/**
	 * Expose `extglob`
	 */

	module.exports = extglob;

	/**
	 * Convert the given extglob `string` to a regex-compatible
	 * string.
	 *
	 * ```js
	 * var extglob = require('extglob');
	 * extglob('!(a?(b))');
	 * //=> '(?!a(?:b)?)[^/]*?'
	 * ```
	 *
	 * @param {String} `str` The string to convert.
	 * @param {Object} `options`
	 *   @option {Boolean} [options] `esc` If `false` special characters will not be escaped. Defaults to `true`.
	 *   @option {Boolean} [options] `regex` If `true` a regular expression is returned instead of a string.
	 * @return {String}
	 * @api public
	 */


	function extglob(str, opts) {
	  opts = opts || {};
	  var o = {}, i = 0;

	  // fix common character reversals
	  // '*!(.js)' => '*.!(js)'
	  str = str.replace(/!\(([^\w*()])/g, '$1!(');

	  // support file extension negation
	  str = str.replace(/([*\/])\.!\([*]\)/g, function (m, ch) {
	    if (ch === '/') {
	      return escape('\\/[^.]+');
	    }
	    return escape('[^.]+');
	  });

	  // create a unique key for caching by
	  // combining the string and options
	  var key = str
	    + String(!!opts.regex)
	    + String(!!opts.contains)
	    + String(!!opts.escape);

	  if (cache.hasOwnProperty(key)) {
	    return cache[key];
	  }

	  if (!(re instanceof RegExp)) {
	    re = regex();
	  }

	  opts.negate = false;
	  var m;

	  while (m = re.exec(str)) {
	    var prefix = m[1];
	    var inner = m[3];
	    if (prefix === '!') {
	      opts.negate = true;
	    }

	    var id = '__EXTGLOB_' + (i++) + '__';
	    // use the prefix of the _last_ (outtermost) pattern
	    o[id] = wrap(inner, prefix, opts.escape);
	    str = str.split(m[0]).join(id);
	  }

	  var keys = Object.keys(o);
	  var len = keys.length;

	  // we have to loop again to allow us to convert
	  // patterns in reverse order (starting with the
	  // innermost/last pattern first)
	  while (len--) {
	    var prop = keys[len];
	    str = str.split(prop).join(o[prop]);
	  }

	  var result = opts.regex
	    ? toRegex(str, opts.contains, opts.negate)
	    : str;

	  result = result.split('.').join('\\.');

	  // cache the result and return it
	  return (cache[key] = result);
	}

	/**
	 * Convert `string` to a regex string.
	 *
	 * @param  {String} `str`
	 * @param  {String} `prefix` Character that determines how to wrap the string.
	 * @param  {Boolean} `esc` If `false` special characters will not be escaped. Defaults to `true`.
	 * @return {String}
	 */

	function wrap(inner, prefix, esc) {
	  if (esc) inner = escape(inner);

	  switch (prefix) {
	    case '!':
	      return '(?!' + inner + ')[^/]' + (esc ? '%%%~' : '*?');
	    case '@':
	      return '(?:' + inner + ')';
	    case '+':
	      return '(?:' + inner + ')+';
	    case '*':
	      return '(?:' + inner + ')' + (esc ? '%%' : '*')
	    case '?':
	      return '(?:' + inner + '|)';
	    default:
	      return inner;
	  }
	}

	function escape(str) {
	  str = str.split('*').join('[^/]%%%~');
	  str = str.split('.').join('\\.');
	  return str;
	}

	/**
	 * extglob regex.
	 */

	function regex() {
	  return /(\\?[@?!+*$]\\?)(\(([^()]*?)\))/;
	}

	/**
	 * Negation regex
	 */

	function negate(str) {
	  return '(?!^' + str + ').*$';
	}

	/**
	 * Create the regex to do the matching. If
	 * the leading character in the `pattern` is `!`
	 * a negation regex is returned.
	 *
	 * @param {String} `pattern`
	 * @param {Boolean} `contains` Allow loose matching.
	 * @param {Boolean} `isNegated` True if the pattern is a negation pattern.
	 */

	function toRegex(pattern, contains, isNegated) {
	  var prefix = contains ? '^' : '';
	  var after = contains ? '$' : '';
	  pattern = ('(?:' + pattern + ')' + after);
	  if (isNegated) {
	    pattern = prefix + negate(pattern);
	  }
	  return new RegExp(prefix + pattern);
	}


/***/ },
/* 72 */
/***/ function(module, exports) {

	/*!
	 * is-extglob <https://github.com/jonschlinkert/is-extglob>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	module.exports = function isExtglob(str) {
	  return typeof str === 'string'
	    && /[@?!+*]\(/.test(str);
	};


/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * is-glob <https://github.com/jonschlinkert/is-glob>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	var isExtglob = __webpack_require__(72);

	module.exports = function isGlob(str) {
	  return typeof str === 'string'
	    && (/[*!?{}(|)[\]]/.test(str)
	     || isExtglob(str));
	};

/***/ },
/* 74 */
/***/ function(module, exports) {

	/*!
	 * normalize-path <https://github.com/jonschlinkert/normalize-path>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License
	 */

	module.exports = function normalizePath(str, stripTrailing) {
	  if (typeof str !== 'string') {
	    throw new TypeError('expected a string');
	  }
	  str = str.replace(/[\\\/]+/g, '/');
	  if (stripTrailing !== false) {
	    str = str.replace(/\/$/, '');
	  }
	  return str;
	};


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * object.omit <https://github.com/jonschlinkert/object.omit>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	var isObject = __webpack_require__(76);
	var forOwn = __webpack_require__(77);

	module.exports = function omit(obj, keys) {
	  if (!isObject(obj)) return {};

	  var keys = [].concat.apply([], [].slice.call(arguments, 1));
	  var last = keys[keys.length - 1];
	  var res = {}, fn;

	  if (typeof last === 'function') {
	    fn = keys.pop();
	  }

	  var isFunction = typeof fn === 'function';
	  if (!keys.length && !isFunction) {
	    return obj;
	  }

	  forOwn(obj, function (value, key) {
	    if (keys.indexOf(key) === -1) {

	      if (!isFunction) {
	        res[key] = value;
	      } else if (fn(value, key, obj)) {
	        res[key] = value;
	      }
	    }
	  });
	  return res;
	};


/***/ },
/* 76 */
/***/ function(module, exports) {

	/*!
	 * is-extendable <https://github.com/jonschlinkert/is-extendable>
	 *
	 * Copyright (c) 2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	module.exports = function isExtendable(val) {
	  return typeof val !== 'undefined' && val !== null
	    && (typeof val === 'object' || typeof val === 'function');
	};


/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * for-own <https://github.com/jonschlinkert/for-own>
	 *
	 * Copyright (c) 2014-2016, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	var forIn = __webpack_require__(78);
	var hasOwn = Object.prototype.hasOwnProperty;

	module.exports = function forOwn(o, fn, thisArg) {
	  forIn(o, function(val, key) {
	    if (hasOwn.call(o, key)) {
	      return fn.call(thisArg, o[key], key, o);
	    }
	  });
	};


/***/ },
/* 78 */
/***/ function(module, exports) {

	/*!
	 * for-in <https://github.com/jonschlinkert/for-in>
	 *
	 * Copyright (c) 2014-2016, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	module.exports = function forIn(o, fn, thisArg) {
	  for (var key in o) {
	    if (fn.call(thisArg, o[key], key, o) === false) {
	      break;
	    }
	  }
	};


/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * parse-glob <https://github.com/jonschlinkert/parse-glob>
	 *
	 * Copyright (c) 2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	var isGlob = __webpack_require__(73);
	var findBase = __webpack_require__(80);
	var extglob = __webpack_require__(72);
	var dotfile = __webpack_require__(82);

	/**
	 * Expose `cache`
	 */

	var cache = module.exports.cache = {};

	/**
	 * Parse a glob pattern into tokens.
	 *
	 * When no paths or '**' are in the glob, we use a
	 * different strategy for parsing the filename, since
	 * file names can contain braces and other difficult
	 * patterns. such as:
	 *
	 *  - `*.{a,b}`
	 *  - `(**|*.js)`
	 */

	module.exports = function parseGlob(glob) {
	  if (cache.hasOwnProperty(glob)) {
	    return cache[glob];
	  }

	  var tok = {};
	  tok.orig = glob;
	  tok.is = {};

	  // unescape dots and slashes in braces/brackets
	  glob = escape(glob);

	  var parsed = findBase(glob);
	  tok.is.glob = parsed.isGlob;

	  tok.glob = parsed.glob;
	  tok.base = parsed.base;
	  var segs = /([^\/]*)$/.exec(glob);

	  tok.path = {};
	  tok.path.dirname = '';
	  tok.path.basename = segs[1] || '';
	  tok.path.dirname = glob.split(tok.path.basename).join('') || '';
	  var basename = (tok.path.basename || '').split('.') || '';
	  tok.path.filename = basename[0] || '';
	  tok.path.extname = basename.slice(1).join('.') || '';
	  tok.path.ext = '';

	  if (isGlob(tok.path.dirname) && !tok.path.basename) {
	    if (!/\/$/.test(tok.glob)) {
	      tok.path.basename = tok.glob;
	    }
	    tok.path.dirname = tok.base;
	  }

	  if (glob.indexOf('/') === -1 && !tok.is.globstar) {
	    tok.path.dirname = '';
	    tok.path.basename = tok.orig;
	  }

	  var dot = tok.path.basename.indexOf('.');
	  if (dot !== -1) {
	    tok.path.filename = tok.path.basename.slice(0, dot);
	    tok.path.extname = tok.path.basename.slice(dot);
	  }

	  if (tok.path.extname.charAt(0) === '.') {
	    var exts = tok.path.extname.split('.');
	    tok.path.ext = exts[exts.length - 1];
	  }

	  // unescape dots and slashes in braces/brackets
	  tok.glob = unescape(tok.glob);
	  tok.path.dirname = unescape(tok.path.dirname);
	  tok.path.basename = unescape(tok.path.basename);
	  tok.path.filename = unescape(tok.path.filename);
	  tok.path.extname = unescape(tok.path.extname);

	  // Booleans
	  var is = (glob && tok.is.glob);
	  tok.is.negated  = glob && glob.charAt(0) === '!';
	  tok.is.extglob  = glob && extglob(glob);
	  tok.is.braces   = has(is, glob, '{');
	  tok.is.brackets = has(is, glob, '[:');
	  tok.is.globstar = has(is, glob, '**');
	  tok.is.dotfile  = dotfile(tok.path.basename) || dotfile(tok.path.filename);
	  tok.is.dotdir   = dotdir(tok.path.dirname);
	  return (cache[glob] = tok);
	}

	/**
	 * Returns true if the glob matches dot-directories.
	 *
	 * @param  {Object} `tok` The tokens object
	 * @param  {Object} `path` The path object
	 * @return {Object}
	 */

	function dotdir(base) {
	  if (base.indexOf('/.') !== -1) {
	    return true;
	  }
	  if (base.charAt(0) === '.' && base.charAt(1) !== '/') {
	    return true;
	  }
	  return false;
	}

	/**
	 * Returns true if the pattern has the given `ch`aracter(s)
	 *
	 * @param  {Object} `glob` The glob pattern.
	 * @param  {Object} `ch` The character to test for
	 * @return {Object}
	 */

	function has(is, glob, ch) {
	  return is && glob.indexOf(ch) !== -1;
	}

	/**
	 * Escape/unescape utils
	 */

	function escape(str) {
	  var re = /\{([^{}]*?)}|\(([^()]*?)\)|\[([^\[\]]*?)\]/g;
	  return str.replace(re, function (outter, braces, parens, brackets) {
	    var inner = braces || parens || brackets;
	    if (!inner) { return outter; }
	    return outter.split(inner).join(esc(inner));
	  });
	}

	function esc(str) {
	  str = str.split('/').join('__SLASH__');
	  str = str.split('.').join('__DOT__');
	  return str;
	}

	function unescape(str) {
	  str = str.split('__SLASH__').join('/');
	  str = str.split('__DOT__').join('.');
	  return str;
	}


/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * glob-base <https://github.com/jonschlinkert/glob-base>
	 *
	 * Copyright (c) 2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	var path = __webpack_require__(53);
	var parent = __webpack_require__(81);
	var isGlob = __webpack_require__(73);

	module.exports = function globBase(pattern) {
	  if (typeof pattern !== 'string') {
	    throw new TypeError('glob-base expects a string.');
	  }

	  var res = {};
	  res.base = parent(pattern);
	  res.isGlob = isGlob(pattern);

	  if (res.base !== '.') {
	    res.glob = pattern.substr(res.base.length);
	    if (res.glob.charAt(0) === '/') {
	      res.glob = res.glob.substr(1);
	    }
	  } else {
	    res.glob = pattern;
	  }

	  if (!res.isGlob) {
	    res.base = dirname(pattern);
	    res.glob = res.base !== '.'
	      ? pattern.substr(res.base.length)
	      : pattern;
	  }

	  if (res.glob.substr(0, 2) === './') {
	    res.glob = res.glob.substr(2);
	  }
	  if (res.glob.charAt(0) === '/') {
	    res.glob = res.glob.substr(1);
	  }
	  return res;
	};

	function dirname(glob) {
	  if (glob.slice(-1) === '/') return glob;
	  return path.dirname(glob);
	}


/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var path = __webpack_require__(53);
	var isglob = __webpack_require__(73);

	module.exports = function globParent(str) {
		str += 'a'; // preserves full path in case of trailing path separator
		do {str = path.dirname(str)} while (isglob(str));
		return str;
	};


/***/ },
/* 82 */
/***/ function(module, exports) {

	/*!
	 * is-dotfile <https://github.com/regexps/is-dotfile>
	 *
	 * Copyright (c) 2015 Jon Schlinkert, contributors.
	 * Licensed under the MIT license.
	 */

	module.exports = function(str) {
	  if (str.charCodeAt(0) === 46 /* . */ && str.indexOf('/', 1) === -1) {
	    return true;
	  }

	  var last = str.lastIndexOf('/');
	  return last !== -1 ? str.charCodeAt(last + 1) === 46  /* . */ : false;
	};


/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * regex-cache <https://github.com/jonschlinkert/regex-cache>
	 *
	 * Copyright (c) 2015 Jon Schlinkert.
	 * Licensed under the MIT license.
	 */

	'use strict';

	var isPrimitive = __webpack_require__(84);
	var equal = __webpack_require__(85);
	var basic = {};
	var cache = {};

	/**
	 * Expose `regexCache`
	 */

	module.exports = regexCache;

	/**
	 * Memoize the results of a call to the new RegExp constructor.
	 *
	 * @param  {Function} fn [description]
	 * @param  {String} str [description]
	 * @param  {Options} options [description]
	 * @param  {Boolean} nocompare [description]
	 * @return {RegExp}
	 */

	function regexCache(fn, str, opts) {
	  var key = '_default_', regex, cached;

	  if (!str && !opts) {
	    if (typeof fn !== 'function') {
	      return fn;
	    }
	    return basic[key] || (basic[key] = fn(str));
	  }

	  var isString = typeof str === 'string';
	  if (isString) {
	    if (!opts) {
	      return basic[str] || (basic[str] = fn(str));
	    }
	    key = str;
	  } else {
	    opts = str;
	  }

	  cached = cache[key];
	  if (cached && equal(cached.opts, opts)) {
	    return cached.regex;
	  }

	  memo(key, opts, (regex = fn(str, opts)));
	  return regex;
	}

	function memo(key, opts, regex) {
	  cache[key] = {regex: regex, opts: opts};
	}

	/**
	 * Expose `cache`
	 */

	module.exports.cache = cache;
	module.exports.basic = basic;


/***/ },
/* 84 */
/***/ function(module, exports) {

	/*!
	 * is-primitive <https://github.com/jonschlinkert/is-primitive>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	// see http://jsperf.com/testing-value-is-primitive/7
	module.exports = function isPrimitive(value) {
	  return value == null || (typeof value !== 'function' && typeof value !== 'object');
	};


/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * is-equal-shallow <https://github.com/jonschlinkert/is-equal-shallow>
	 *
	 * Copyright (c) 2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	'use strict';

	var isPrimitive = __webpack_require__(84);

	module.exports = function isEqual(a, b) {
	  if (!a && !b) { return true; }
	  if (!a && b || a && !b) { return false; }

	  var numKeysA = 0, numKeysB = 0, key;
	  for (key in b) {
	    numKeysB++;
	    if (!isPrimitive(b[key]) || !a.hasOwnProperty(key) || (a[key] !== b[key])) {
	      return false;
	    }
	  }
	  for (key in a) {
	    numKeysA++;
	  }
	  return numKeysA === numKeysB;
	};


/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var chars = __webpack_require__(87);
	var utils = __webpack_require__(52);

	/**
	 * Expose `Glob`
	 */

	var Glob = module.exports = function Glob(pattern, options) {
	  if (!(this instanceof Glob)) {
	    return new Glob(pattern, options);
	  }
	  this.options = options || {};
	  this.pattern = pattern;
	  this.history = [];
	  this.tokens = {};
	  this.init(pattern);
	};

	/**
	 * Initialize defaults
	 */

	Glob.prototype.init = function(pattern) {
	  this.orig = pattern;
	  this.negated = this.isNegated();
	  this.options.track = this.options.track || false;
	  this.options.makeRe = true;
	};

	/**
	 * Push a change into `glob.history`. Useful
	 * for debugging.
	 */

	Glob.prototype.track = function(msg) {
	  if (this.options.track) {
	    this.history.push({msg: msg, pattern: this.pattern});
	  }
	};

	/**
	 * Return true if `glob.pattern` was negated
	 * with `!`, also remove the `!` from the pattern.
	 *
	 * @return {Boolean}
	 */

	Glob.prototype.isNegated = function() {
	  if (this.pattern.charCodeAt(0) === 33 /* '!' */) {
	    this.pattern = this.pattern.slice(1);
	    return true;
	  }
	  return false;
	};

	/**
	 * Expand braces in the given glob pattern.
	 *
	 * We only need to use the [braces] lib when
	 * patterns are nested.
	 */

	Glob.prototype.braces = function() {
	  if (this.options.nobraces !== true && this.options.nobrace !== true) {
	    // naive/fast check for imbalanced characters
	    var a = this.pattern.match(/[\{\(\[]/g);
	    var b = this.pattern.match(/[\}\)\]]/g);

	    // if imbalanced, don't optimize the pattern
	    if (a && b && (a.length !== b.length)) {
	      this.options.makeRe = false;
	    }

	    // expand brace patterns and join the resulting array
	    var expanded = utils.braces(this.pattern, this.options);
	    this.pattern = expanded.join('|');
	  }
	};

	/**
	 * Expand bracket expressions in `glob.pattern`
	 */

	Glob.prototype.brackets = function() {
	  if (this.options.nobrackets !== true) {
	    this.pattern = utils.brackets(this.pattern);
	  }
	};

	/**
	 * Expand bracket expressions in `glob.pattern`
	 */

	Glob.prototype.extglob = function() {
	  if (this.options.noextglob === true) return;

	  if (utils.isExtglob(this.pattern)) {
	    this.pattern = utils.extglob(this.pattern, {escape: true});
	  }
	};

	/**
	 * Parse the given pattern
	 */

	Glob.prototype.parse = function(pattern) {
	  this.tokens = utils.parseGlob(pattern || this.pattern, true);
	  return this.tokens;
	};

	/**
	 * Replace `a` with `b`. Also tracks the change before and
	 * after each replacement. This is disabled by default, but
	 * can be enabled by setting `options.track` to true.
	 *
	 * Also, when the pattern is a string, `.split()` is used,
	 * because it's much faster than replace.
	 *
	 * @param  {RegExp|String} `a`
	 * @param  {String} `b`
	 * @param  {Boolean} `escape` When `true`, escapes `*` and `?` in the replacement.
	 * @return {String}
	 */

	Glob.prototype._replace = function(a, b, escape) {
	  this.track('before (find): "' + a + '" (replace with): "' + b + '"');
	  if (escape) b = esc(b);
	  if (a && b && typeof a === 'string') {
	    this.pattern = this.pattern.split(a).join(b);
	  } else {
	    this.pattern = this.pattern.replace(a, b);
	  }
	  this.track('after');
	};

	/**
	 * Escape special characters in the given string.
	 *
	 * @param  {String} `str` Glob pattern
	 * @return {String}
	 */

	Glob.prototype.escape = function(str) {
	  this.track('before escape: ');
	  var re = /["\\](['"]?[^"'\\]['"]?)/g;

	  this.pattern = str.replace(re, function($0, $1) {
	    var o = chars.ESC;
	    var ch = o && o[$1];
	    if (ch) {
	      return ch;
	    }
	    if (/[a-z]/i.test($0)) {
	      return $0.split('\\').join('');
	    }
	    return $0;
	  });

	  this.track('after escape: ');
	};

	/**
	 * Unescape special characters in the given string.
	 *
	 * @param  {String} `str`
	 * @return {String}
	 */

	Glob.prototype.unescape = function(str) {
	  var re = /__([A-Z]+)_([A-Z]+)__/g;
	  this.pattern = str.replace(re, function($0, $1) {
	    return chars[$1][$0];
	  });
	  this.pattern = unesc(this.pattern);
	};

	/**
	 * Escape/unescape utils
	 */

	function esc(str) {
	  str = str.split('?').join('%~');
	  str = str.split('*').join('%%');
	  return str;
	}

	function unesc(str) {
	  str = str.split('%~').join('?');
	  str = str.split('%%').join('*');
	  return str;
	}


/***/ },
/* 87 */
/***/ function(module, exports) {

	'use strict';

	var chars = {}, unesc, temp;

	function reverse(object, prepender) {
	  return Object.keys(object).reduce(function(reversed, key) {
	    var newKey = prepender ? prepender + key : key; // Optionally prepend a string to key.
	    reversed[object[key]] = newKey; // Swap key and value.
	    return reversed; // Return the result.
	  }, {});
	}

	/**
	 * Regex for common characters
	 */

	chars.escapeRegex = {
	  '?': /\?/g,
	  '@': /\@/g,
	  '!': /\!/g,
	  '+': /\+/g,
	  '*': /\*/g,
	  '(': /\(/g,
	  ')': /\)/g,
	  '[': /\[/g,
	  ']': /\]/g
	};

	/**
	 * Escape characters
	 */

	chars.ESC = {
	  '?': '__UNESC_QMRK__',
	  '@': '__UNESC_AMPE__',
	  '!': '__UNESC_EXCL__',
	  '+': '__UNESC_PLUS__',
	  '*': '__UNESC_STAR__',
	  ',': '__UNESC_COMMA__',
	  '(': '__UNESC_LTPAREN__',
	  ')': '__UNESC_RTPAREN__',
	  '[': '__UNESC_LTBRACK__',
	  ']': '__UNESC_RTBRACK__'
	};

	/**
	 * Unescape characters
	 */

	chars.UNESC = unesc || (unesc = reverse(chars.ESC, '\\'));

	chars.ESC_TEMP = {
	  '?': '__TEMP_QMRK__',
	  '@': '__TEMP_AMPE__',
	  '!': '__TEMP_EXCL__',
	  '*': '__TEMP_STAR__',
	  '+': '__TEMP_PLUS__',
	  ',': '__TEMP_COMMA__',
	  '(': '__TEMP_LTPAREN__',
	  ')': '__TEMP_RTPAREN__',
	  '[': '__TEMP_LTBRACK__',
	  ']': '__TEMP_RTBRACK__'
	};

	chars.TEMP = temp || (temp = reverse(chars.ESC_TEMP));

	module.exports = chars;


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * filter-values <https://github.com/jonschlinkert/filter-values>
	 *
	 * Copyright (c) 2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */

	var forOwn = __webpack_require__(77);
	var matcher = __webpack_require__(89);

	/**
	 * Filter an object values using glob patterns
	 * or with a `callback` function returns true.
	 *
	 * @param  {Object} `obj`
	 * @param  {Function|Array|String|RegExp} `filter`
	 * @param  {Object} `options` pass options to `micromatch`
	 * @return {Object}
	 */

	module.exports = function filterValues(obj, filter, options) {
	  var isMatch = matcher(filter, options);
	  var res = {};

	  forOwn(obj, function (val, key) {
	    if (isMatch(val)) {
	      res[key] = val;
	    }
	  });
	  return res;
	};


/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * is-match <https://github.com/jonschlinkert/is-match>
	 *
	 * Copyright (c) 2015-2016 Jon Schlinkert.
	 * Licensed under the MIT license.
	 */

	'use strict';

	var deepEqual = __webpack_require__(15);
	var isObject = __webpack_require__(76);
	var isGlob = __webpack_require__(73);
	var mm = __webpack_require__(50);

	function isMatch(pattern, options) {
	  options = options || {};

	  if (typeof pattern === 'function') {
	    return pattern;
	  }

	  if (pattern instanceof RegExp) {
	    return function(val) {
	      return pattern.test(val);
	    };
	  }

	  if (typeof pattern === 'string') {
	    if (isGlob(pattern)) {
	      return function(val) {
	        return mm(val, pattern, options).length !== 0;
	      };
	    }
	    return function(val) {
	      if (options.strict === true) {
	        return pattern === val;
	      }
	      return val.indexOf(pattern) > -1;
	    };
	  }

	  if (Array.isArray(pattern)) {
	    return function(val) {
	      return mm(val, pattern, options).length !== 0;
	    };
	  }

	  if (isObject(pattern)) {
	    return function(val) {
	      return deepEqual(val, pattern);
	    };
	  }

	  throw new TypeError('isMatch expects a string, array, regex, plain object or function:', arguments);
	}

	/**
	 * Expose `isMatch`
	 */

	module.exports = isMatch;


/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * object.pick <https://github.com/jonschlinkert/object.pick>
	 *
	 * Copyright (c) 2014-2015 Jon Schlinkert, contributors.
	 * Licensed under the MIT License
	 */

	'use strict';

	var isObject = __webpack_require__(61);

	module.exports = function pick(obj, keys) {
	  if (!isObject(obj) && typeof obj !== 'function') {
	    return {};
	  }

	  var res = {};
	  if (typeof keys === 'string') {
	    if (keys in obj) {
	      res[keys] = obj[keys];
	    }
	    return res;
	  }

	  var len = keys.length;
	  var idx = -1;

	  while (++idx < len) {
	    var key = keys[idx];
	    if (key in obj) {
	      res[key] = obj[key];
	    }
	  }
	  return res;
	};


/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isObject = __webpack_require__(76);

	module.exports = function extend(o/*, objects*/) {
	  if (!isObject(o)) { o = {}; }

	  var len = arguments.length;
	  for (var i = 1; i < len; i++) {
	    var obj = arguments[i];

	    if (isObject(obj)) {
	      assign(o, obj);
	    }
	  }
	  return o;
	};

	function assign(a, b) {
	  for (var key in b) {
	    if (hasOwn(b, key)) {
	      a[key] = b[key];
	    }
	  }
	}

	/**
	 * Returns true if the given `key` is an own property of `obj`.
	 */

	function hasOwn(obj, key) {
	  return Object.prototype.hasOwnProperty.call(obj, key);
	}


/***/ },
/* 92 */
/***/ function(module, exports) {

	"use strict";
	var Pager = (function () {
	    function Pager(flux) {
	        this.flux = flux;
	    }
	    Pager.prototype.next = function () {
	        return this.pageTo(this.step(true), this.hasNext, 'already on last page');
	    };
	    Pager.prototype.prev = function () {
	        return this.pageTo(this.step(false), this.hasPrevious, 'already on first page');
	    };
	    Pager.prototype.last = function () {
	        var remainder = this.totalRecords % this.pageSize;
	        this.flux.query.skip(remainder > 0 ? this.totalRecords - remainder : this.totalRecords - this.pageSize);
	        return this.flux.search();
	    };
	    Pager.prototype.reset = function () {
	        this.flux.query.skip(0);
	        return this.flux.search();
	    };
	    Object.defineProperty(Pager.prototype, "current", {
	        get: function () {
	            return Math.floor(this.lastStep / this.pageSize);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Pager.prototype.jump = function (page) {
	        var offset = this.pageSize * page;
	        return this.pageTo(offset, offset >= 0 && offset < this.totalRecords, "page " + page + " does not exist");
	    };
	    Object.defineProperty(Pager.prototype, "total", {
	        get: function () {
	            return this.totalRecords > 0 ? Math.floor(this.totalRecords / this.pageSize) : 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Pager.prototype, "hasNext", {
	        get: function () {
	            return this.step(true) < this.totalRecords;
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
	        return this.pageTo(this.step(forward), predicate, "already on " + (forward ? 'last' : 'first') + " page");
	    };
	    Pager.prototype.pageTo = function (offset, predicate, error) {
	        if (predicate) {
	            this.flux.query.skip(offset);
	            return this.flux.search();
	        }
	        return Promise.reject(new Error(error));
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
	    Object.defineProperty(Pager.prototype, "totalRecords", {
	        get: function () {
	            return this.flux.results.totalRecordCount || -1;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Pager;
	}());
	exports.Pager = Pager;

	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhcGFjaXRvci9wYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBR0E7SUFDRSxlQUFvQixJQUFtQjtRQUFuQixTQUFJLEdBQUosSUFBSSxDQUFlO0lBQUksQ0FBQztJQUU1QyxvQkFBSSxHQUFKO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLHNCQUFzQixDQUFDLENBQUM7SUFDNUUsQ0FBQztJQUVELG9CQUFJLEdBQUo7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztJQUNsRixDQUFDO0lBRUQsb0JBQUksR0FBSjtRQUNFLElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN4RyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQscUJBQUssR0FBTDtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsc0JBQUksMEJBQU87YUFBWDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELENBQUM7OztPQUFBO0lBRUQsb0JBQUksR0FBSixVQUFLLElBQVk7UUFDZixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNwQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsTUFBTSxJQUFJLENBQUMsSUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxVQUFRLElBQUksb0JBQWlCLENBQUMsQ0FBQztJQUN2RyxDQUFDO0lBRUQsc0JBQUksd0JBQUs7YUFBVDtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuRixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDBCQUFPO2FBQVg7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQzdDLENBQUM7OztPQUFBO0lBRUQsc0JBQUksOEJBQVc7YUFBZjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUVPLHdCQUFRLEdBQWhCLFVBQWlCLE9BQWdCLEVBQUUsU0FBa0I7UUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxTQUFTLEVBQUUsaUJBQWMsT0FBTyxHQUFHLE1BQU0sR0FBRyxPQUFPLFdBQU8sQ0FBQyxDQUFDO0lBQ3JHLENBQUM7SUFFTyxzQkFBTSxHQUFkLFVBQWUsTUFBYyxFQUFFLFNBQWtCLEVBQUUsS0FBYTtRQUM5RCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzVCLENBQUM7UUFDRCxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTyxvQkFBSSxHQUFaLFVBQWEsR0FBWTtRQUN2QixJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEUsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsc0JBQVksMkJBQVE7YUFBcEI7WUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztRQUMzQyxDQUFDOzs7T0FBQTtJQUVELHNCQUFZLDJCQUFRO2FBQXBCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUM7UUFDaEQsQ0FBQzs7O09BQUE7SUFFRCxzQkFBWSwrQkFBWTthQUF4QjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsRCxDQUFDOzs7T0FBQTtJQUNILFlBQUM7QUFBRCxDQXZFQSxBQXVFQyxJQUFBO0FBdkVZLGFBQUssUUF1RWpCLENBQUEiLCJmaWxlIjoiY2FwYWNpdG9yL3BhZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVzdWx0cyB9IGZyb20gJy4uL21vZGVscy9yZXNwb25zZSc7XG5pbXBvcnQgeyBGbHV4Q2FwYWNpdG9yLCBFdmVudHMgfSBmcm9tICcuL2luZGV4JztcblxuZXhwb3J0IGNsYXNzIFBhZ2VyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmbHV4OiBGbHV4Q2FwYWNpdG9yKSB7IH1cblxuICBuZXh0KCk6IFByb21pc2U8UmVzdWx0cz4ge1xuICAgIHJldHVybiB0aGlzLnBhZ2VUbyh0aGlzLnN0ZXAodHJ1ZSksIHRoaXMuaGFzTmV4dCwgJ2FscmVhZHkgb24gbGFzdCBwYWdlJyk7XG4gIH1cblxuICBwcmV2KCk6IFByb21pc2U8UmVzdWx0cz4ge1xuICAgIHJldHVybiB0aGlzLnBhZ2VUbyh0aGlzLnN0ZXAoZmFsc2UpLCB0aGlzLmhhc1ByZXZpb3VzLCAnYWxyZWFkeSBvbiBmaXJzdCBwYWdlJyk7XG4gIH1cblxuICBsYXN0KCk6IFByb21pc2U8UmVzdWx0cz4ge1xuICAgIGNvbnN0IHJlbWFpbmRlciA9IHRoaXMudG90YWxSZWNvcmRzICUgdGhpcy5wYWdlU2l6ZTtcbiAgICB0aGlzLmZsdXgucXVlcnkuc2tpcChyZW1haW5kZXIgPiAwID8gdGhpcy50b3RhbFJlY29yZHMgLSByZW1haW5kZXIgOiB0aGlzLnRvdGFsUmVjb3JkcyAtIHRoaXMucGFnZVNpemUpO1xuICAgIHJldHVybiB0aGlzLmZsdXguc2VhcmNoKCk7XG4gIH1cblxuICByZXNldCgpOiBQcm9taXNlPFJlc3VsdHM+IHtcbiAgICB0aGlzLmZsdXgucXVlcnkuc2tpcCgwKTtcbiAgICByZXR1cm4gdGhpcy5mbHV4LnNlYXJjaCgpO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcih0aGlzLmxhc3RTdGVwIC8gdGhpcy5wYWdlU2l6ZSk7XG4gIH1cblxuICBqdW1wKHBhZ2U6IG51bWJlcik6IFByb21pc2U8UmVzdWx0cz4ge1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMucGFnZVNpemUgKiBwYWdlO1xuICAgIHJldHVybiB0aGlzLnBhZ2VUbyhvZmZzZXQsIG9mZnNldCA+PSAwICYmIG9mZnNldCA8IHRoaXMudG90YWxSZWNvcmRzLCBgcGFnZSAke3BhZ2V9IGRvZXMgbm90IGV4aXN0YCk7XG4gIH1cblxuICBnZXQgdG90YWwoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy50b3RhbFJlY29yZHMgPiAwID8gTWF0aC5mbG9vcih0aGlzLnRvdGFsUmVjb3JkcyAvIHRoaXMucGFnZVNpemUpIDogMDtcbiAgfVxuXG4gIGdldCBoYXNOZXh0KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0ZXAodHJ1ZSkgPCB0aGlzLnRvdGFsUmVjb3JkcztcbiAgfVxuXG4gIGdldCBoYXNQcmV2aW91cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5sYXN0U3RlcCAhPT0gMDtcbiAgfVxuXG4gIHByaXZhdGUgcGFnaW5hdGUoZm9yd2FyZDogYm9vbGVhbiwgcHJlZGljYXRlOiBib29sZWFuKTogUHJvbWlzZTxSZXN1bHRzIHwgdm9pZD4ge1xuICAgIHJldHVybiB0aGlzLnBhZ2VUbyh0aGlzLnN0ZXAoZm9yd2FyZCksIHByZWRpY2F0ZSwgYGFscmVhZHkgb24gJHtmb3J3YXJkID8gJ2xhc3QnIDogJ2ZpcnN0J30gcGFnZWApO1xuICB9XG5cbiAgcHJpdmF0ZSBwYWdlVG8ob2Zmc2V0OiBudW1iZXIsIHByZWRpY2F0ZTogYm9vbGVhbiwgZXJyb3I6IHN0cmluZyk6IFByb21pc2U8UmVzdWx0cyB8IHZvaWQ+IHtcbiAgICBpZiAocHJlZGljYXRlKSB7XG4gICAgICB0aGlzLmZsdXgucXVlcnkuc2tpcChvZmZzZXQpO1xuICAgICAgcmV0dXJuIHRoaXMuZmx1eC5zZWFyY2goKTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihlcnJvcikpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGVwKGFkZDogYm9vbGVhbik6IG51bWJlciB7XG4gICAgY29uc3Qgc2tpcCA9IHRoaXMubGFzdFN0ZXAgKyAoYWRkID8gdGhpcy5wYWdlU2l6ZSA6IC10aGlzLnBhZ2VTaXplKTtcbiAgICByZXR1cm4gc2tpcCA+PSAwID8gc2tpcCA6IDA7XG4gIH1cblxuICBwcml2YXRlIGdldCBsYXN0U3RlcCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmZsdXgucXVlcnkuYnVpbGQoKS5za2lwIHx8IDA7XG4gIH1cblxuICBwcml2YXRlIGdldCBwYWdlU2l6ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmZsdXgucXVlcnkuYnVpbGQoKS5wYWdlU2l6ZSB8fCAxMDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IHRvdGFsUmVjb3JkcygpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmZsdXgucmVzdWx0cy50b3RhbFJlY29yZENvdW50IHx8IC0xO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=


/***/ },
/* 93 */
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
/* 94 */
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
	  else if ("function" === T_FUNCTION && typeof __webpack_require__(95) !== T_UNDEF)
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return riot }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  else
	    window.riot = riot

	})(typeof window != 'undefined' ? window : void 0);


/***/ },
/* 95 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(97);
	__webpack_require__(100);
	__webpack_require__(102);
	__webpack_require__(114);
	__webpack_require__(115);
	__webpack_require__(122);
	__webpack_require__(119);
	__webpack_require__(116);
	__webpack_require__(123);
	__webpack_require__(124);
	__webpack_require__(125);
	__webpack_require__(126);
	__webpack_require__(127);
	__webpack_require__(128);
	__webpack_require__(129);
	__webpack_require__(130);
	__webpack_require__(131);
	__webpack_require__(133);
	__webpack_require__(132);


/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	riot.tag2('gb-available-navigation', '<div class="gb-side-nav {opts.style()}"> <div class="gb-nav" each="{name, nav in processed}"> <h4 class="gb-nav__title">{nav.displayName}</h4> <ul class="gb-nav__list"> <gb-selected-refinement if="{showSelected}" each="{ref in nav.selected}"></gb-selected-refinement> <gb-available-refinement each="{ref in nav.available}"></gb-available-refinement> </ul> </div> </div>', 'gb-available-navigation .gb-stylish h4,[riot-tag="gb-available-navigation"] .gb-stylish h4,[data-is="gb-available-navigation"] .gb-stylish h4{ font-size: 18px; margin: 10px 0; } gb-available-navigation .gb-stylish.gb-side-nav,[riot-tag="gb-available-navigation"] .gb-stylish.gb-side-nav,[data-is="gb-available-navigation"] .gb-stylish.gb-side-nav{ padding: 12px; } gb-available-navigation .gb-stylish .gb-nav__list,[riot-tag="gb-available-navigation"] .gb-stylish .gb-nav__list,[data-is="gb-available-navigation"] .gb-stylish .gb-nav__list{ margin: 0; padding-left: 8px; }', '', function (opts) {
	    var _this = this;

	    __webpack_require__(98);
	    __webpack_require__(99);

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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-available-refinement', '<li class="gb-ref {parentOpts.style()}"> <a class="gb-ref__link" href="#" onclick="{send}"> <span class="gb-ref__title">{ref.type === \'Value\' ? ref.value : ref.low + \' - \' + ref.high}</span> <span class="gb-filler"></span> <span class="gb-ref__badge" if="{badge}">{ref.count}</span> </a> </li>', 'gb-available-refinement .gb-stylish,[riot-tag="gb-available-refinement"] .gb-stylish,[data-is="gb-available-refinement"] .gb-stylish{ list-style: none; } gb-available-refinement .gb-stylish .gb-filler,[riot-tag="gb-available-refinement"] .gb-stylish .gb-filler,[data-is="gb-available-refinement"] .gb-stylish .gb-filler{ flex-grow: 1; } gb-available-refinement .gb-stylish .gb-ref__link,[riot-tag="gb-available-refinement"] .gb-stylish .gb-ref__link,[data-is="gb-available-refinement"] .gb-stylish .gb-ref__link{ display: flex; padding: 4px 6px; border-radius: 4px; color: black; font-size: 14px; text-decoration: none; align-items: baseline; } gb-available-refinement .gb-stylish .gb-ref__link:hover,[riot-tag="gb-available-refinement"] .gb-stylish .gb-ref__link:hover,[data-is="gb-available-refinement"] .gb-stylish .gb-ref__link:hover{ background-color: #ddd; } gb-available-refinement .gb-stylish .gb-ref__badge,[riot-tag="gb-available-refinement"] .gb-stylish .gb-ref__badge,[data-is="gb-available-refinement"] .gb-stylish .gb-ref__badge{ display: inline-block; min-width: 10px; max-height: 20px; padding: 4px 7px; border-radius: 10px; font-size: 12px; font-weight: bold; line-height: 1; color: #fff; background-color: #ccc; text-align: center; white-space: nowrap; vertical-align: middle; }', '', function (opts) {
	    var _this = this;

	    var utils = __webpack_require__(93);
	    this.parentOpts = this.parent.parent.opts;
	    this.send = function () {
	        return _this.parentOpts.flux.refine(utils.toRefinement(_this.ref, _this.nav));
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-selected-refinement', '<li class="gb-ref {parentOpts.style()}"> <a class="gb-ref__link" href="#" onclick="{remove}">×</a> <span class="gb-ref__value">{ref.type === \'Value\' ? ref.value : ref.low + \' - \' + ref.high}</span> </li>', 'gb-selected-refinement .gb-stylish,[riot-tag="gb-selected-refinement"] .gb-stylish,[data-is="gb-selected-refinement"] .gb-stylish{ position: relative; list-style: none; padding: 4px 6px; font-size: 14px; } gb-selected-refinement .gb-stylish .gb-ref__link,[riot-tag="gb-selected-refinement"] .gb-stylish .gb-ref__link,[data-is="gb-selected-refinement"] .gb-stylish .gb-ref__link{ left: -8px; position: absolute; color: black; text-decoration: none; } gb-selected-refinement .gb-stylish .gb-ref__link:hover,[riot-tag="gb-selected-refinement"] .gb-stylish .gb-ref__link:hover,[data-is="gb-selected-refinement"] .gb-stylish .gb-ref__link:hover{ color: red; font-weight: bold; }', '', function (opts) {
	    var _this = this;

	    var utils = __webpack_require__(93);
	    this.parentOpts = this.parent.parent.opts;
	    this.remove = function () {
	        return _this.parentOpts.flux.unrefine(utils.toRefinement(_this.ref, _this.nav));
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-breadcrumbs', '<ul class="gb-breadcrumbs {opts.style()} "> <li if="{!hideQuery && query}">{query}</li> <li if="{!hideRefinements}" each="{nav in selected}"> <ul class="gb-nav-crumb"> <gb-refinement-crumb each="{ref in nav.refinements}"></gb-refinement-crumb> </ul> </li> </ul>', 'gb-breadcrumbs .gb-stylish.gb-breadcrumbs,[riot-tag="gb-breadcrumbs"] .gb-stylish.gb-breadcrumbs,[data-is="gb-breadcrumbs"] .gb-stylish.gb-breadcrumbs{ display: flex; list-style: none; justify-content: flex-start; }', '', function (opts) {
	    var _this = this;

	    __webpack_require__(101);
	    this.hideQuery = opts.hideQuery === undefined ? false : opts.hideQuery;
	    this.hideRefinements = opts.hideRefinements === undefined ? false : opts.hideRefinements;

	    opts.flux.on(opts.flux.REFINEMENTS_CHANGED, function (_ref) {
	        var selected = _ref.selected;
	        return _this.update({ selected: selected });
	    });
	    opts.flux.on(opts.flux.RESULTS, function (res) {
	        return _this.update({ query: res.originalQuery });
	    });
	    opts.flux.on(opts.flux.RESET, function (res) {
	        return _this.update({ selected: [] });
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-refinement-crumb', '<li class="gb-refinement-crumb {parentOpts.style()}"> <a href="#" onclick="{remove}">×</a> <b>{nav.displayName}: {ref.type === \'Value\' ? ref.value : ref.low + \' - \' + ref.high}</b> </li>', '.gb-stylish.gb-refinement-crumb { display: flex; }', '', function (opts) {
	    var _this = this;

	    var utils = __webpack_require__(93);
	    this.parentOpts = this.parent.parent.opts;
	    this.remove = function () {
	        return _this.parentOpts.flux.unrefine(utils.toRefinement(_this.ref, _this.nav));
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-category-menu', '<div class="gb-menu {opts.style()}"> <div class="gb-menu__item" each="{opts.sections}"> <gb-category-dropdown class="gb-category-dropdown"></gb-category-dropdown> </div> </div>', 'gb-category-menu .gb-stylish.gb-menu,[riot-tag="gb-category-menu"] .gb-stylish.gb-menu,[data-is="gb-category-menu"] .gb-stylish.gb-menu{ display: flex; flex-direction: row; justify-content: center; }', '', function (opts) {
	    __webpack_require__(103);
	    __webpack_require__(113);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-category-dropdown', '<div class="gb-dropdown {parentOpts.style()}"> <button type="button" class="gb-dropdown__button">{name}</button> <div class="gb-dropdown__content"> <gb-category-section if="{items}"></gb-category-section> <gb-category-section each="{subsections}" named="{true}"></gb-category-section> </div> <div class="gb-dropdown__images"> <img src="" each="{results.images}"> </div> </div>', 'gb-category-dropdown .gb-dropdown,[riot-tag="gb-category-dropdown"] .gb-dropdown,[data-is="gb-category-dropdown"] .gb-dropdown{ position: relative; display: inline-block; } gb-category-dropdown .gb-dropdown__content,[riot-tag="gb-category-dropdown"] .gb-dropdown__content,[data-is="gb-category-dropdown"] .gb-dropdown__content{ display: none; position: absolute; min-width: 160px; background-color: #fff; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); } gb-category-dropdown .gb-dropdown:hover .gb-dropdown__content,[riot-tag="gb-category-dropdown"] .gb-dropdown:hover .gb-dropdown__content,[data-is="gb-category-dropdown"] .gb-dropdown:hover .gb-dropdown__content{ display: block; } gb-category-dropdown .gb-stylish .gb-dropdown__button,[riot-tag="gb-category-dropdown"] .gb-stylish .gb-dropdown__button,[data-is="gb-category-dropdown"] .gb-stylish .gb-dropdown__button{ border: none; cursor: pointer; padding: 16px; width: 100%; } gb-category-dropdown .gb-stylish .gb-dropdown__content,[riot-tag="gb-category-dropdown"] .gb-stylish .gb-dropdown__content,[data-is="gb-category-dropdown"] .gb-stylish .gb-dropdown__content{ flex-wrap: wrap; background-color: #f9f9f9; min-width: 272px; } gb-category-dropdown .gb-stylish.gb-dropdown:hover .gb-dropdown__content,[riot-tag="gb-category-dropdown"] .gb-stylish.gb-dropdown:hover .gb-dropdown__content,[data-is="gb-category-dropdown"] .gb-stylish.gb-dropdown:hover .gb-dropdown__content{ display: flex; }', '', function (opts) {
	  var sayt = __webpack_require__(104);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(105);


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	/// <reference path="../typings/index.d.ts" />
	/// <reference path="../custom-typings/index.d.ts" />
	"use strict";
	__webpack_require__(4).polyfill();
	__webpack_require__(106).pollyfill();
	var sayt_1 = __webpack_require__(107);
	var sayt = new sayt_1.Sayt();
	if (window !== undefined) {
	    window['sayt'] = sayt;
	}
	module.exports = sayt;

	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhDQUE4QztBQUM5QyxxREFBcUQ7O0FBRXJELE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNsQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7QUFFbkMscUJBQXNCLGFBQWEsQ0FBQyxDQUFBO0FBRXBDLElBQU0sSUFBSSxHQUFHLElBQUksV0FBSSxFQUFFLENBQUM7QUFHeEIsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDekIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQztBQUN4QixDQUFDO0FBSkQsaUJBQVMsSUFBSSxDQUFDIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4uL3R5cGluZ3MvaW5kZXguZC50c1wiIC8+XG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi4vY3VzdG9tLXR5cGluZ3MvaW5kZXguZC50c1wiIC8+XG5cbnJlcXVpcmUoJ2VzNi1wcm9taXNlJykucG9seWZpbGwoKTtcbnJlcXVpcmUoJy4vcG9seWZpbGxzJykucG9sbHlmaWxsKCk7XG5cbmltcG9ydCB7IFNheXQgfSAgZnJvbSAnLi9jb3JlL3NheXQnO1xuXG5jb25zdCBzYXl0ID0gbmV3IFNheXQoKTtcbmV4cG9ydCA9IHNheXQ7XG5cbmlmICh3aW5kb3cgIT09IHVuZGVmaW5lZCkge1xuICB3aW5kb3dbJ3NheXQnXSA9IHNheXQ7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=


/***/ },
/* 106 */
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
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(108);
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
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var qs = __webpack_require__(11);
	var rawJsonp = __webpack_require__(109);
	function jsonp(url, body) {
	    return new Promise(function (resolve, reject) {
	        rawJsonp(url + "?" + qs.stringify(body), function (err, data) { return err ? reject(err) : resolve(data); });
	    });
	}
	exports.jsonp = jsonp;

	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFPLEVBQUUsV0FBVyxJQUFJLENBQUMsQ0FBQztBQUMxQixJQUFPLFFBQVEsV0FBVyxPQUFPLENBQUMsQ0FBQztBQUVuQyxlQUFzQixHQUFXLEVBQUUsSUFBUztJQUMxQyxNQUFNLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBQyxPQUFPLEVBQUUsTUFBTTtRQUNqQyxRQUFRLENBQUksR0FBRyxTQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFHLEVBQUUsVUFBQyxHQUFHLEVBQUUsSUFBSSxJQUFLLE9BQUEsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQWpDLENBQWlDLENBQUMsQ0FBQztJQUM3RixDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFKZSxhQUFLLFFBSXBCLENBQUEiLCJmaWxlIjoidXRpbHMvaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcXMgPSByZXF1aXJlKCdxcycpO1xuaW1wb3J0IHJhd0pzb25wID0gcmVxdWlyZSgnanNvbnAnKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGpzb25wKHVybDogc3RyaW5nLCBib2R5OiBhbnkpOiBQcm9taXNlPGFueT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHJhd0pzb25wKGAke3VybH0/JHtxcy5zdHJpbmdpZnkoYm9keSl9YCwgKGVyciwgZGF0YSkgPT4gZXJyID8gcmVqZWN0KGVycikgOiByZXNvbHZlKGRhdGEpKTtcbiAgfSk7XG59XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies
	 */

	var debug = __webpack_require__(110)('jsonp');

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
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(111);
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
/* 111 */
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
	exports.humanize = __webpack_require__(112);

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
/* 112 */
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
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-category-section', '<div class="gb-category-section {parentOpts.style()}"> <a if="{opts.named}" class="gb-category-section__header" href="#" onmouseover="{updateSectionImages}" data-try="{name}">{name}</a> <a each="{item in items}" class="gb-category-section__link" href="#" onmouseover="{updateCategoryImages}">{item}</a> </div>', 'gb-category-section .gb-stylish.gb-category-section,[riot-tag="gb-category-section"] .gb-stylish.gb-category-section,[data-is="gb-category-section"] .gb-stylish.gb-category-section{ min-width: 120px; flex-wrap: wrap; padding: 6px 8px; } gb-category-section .gb-stylish .gb-category-section__header,[riot-tag="gb-category-section"] .gb-stylish .gb-category-section__header,[data-is="gb-category-section"] .gb-stylish .gb-category-section__header{ padding: 6px 4px; margin: 0; font-size: 1.1em; font-weight: bold; } gb-category-section .gb-stylish a,[riot-tag="gb-category-section"] .gb-stylish a,[data-is="gb-category-section"] .gb-stylish a{ padding: 3px 4px; text-decoration: none; display: block; } gb-category-section .gb-stylish a:hover,[riot-tag="gb-category-section"] .gb-stylish a:hover,[data-is="gb-category-section"] .gb-stylish a:hover{ background-color: #f1f1f1; }', '', function (opts) {
	    this.parentOpts = this.parent.parent.opts;
	    this.updateSectionImages = this.parent.parent.updateSectionImages;
	    this.updateCategoryImages = this.parent.parent.updateCategoryImages;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	riot.tag2('gb-paging', '<div class="gb-paging {opts.style()}"> <a class="gb-paging__link first {isFirst() ? \'disabled\' : \'\'}" if="{showTerminals}" onclick="{firstPage}"><span class="gb-paging__icon">&larr;</span> First</a> <a class="gb-paging__link prev {isFirst() ? \'disabled\' : \'\'}" onclick="{prevPage}"><span class="gb-paging__icon">&lt;</span> Prev</a> <ul class="gb-paging__pages" if="{showPages}"> <span class="gb-paging__ellipsis" if="{!isFirst() && this.currentPage() > this.halfOffset}">&hellip;</span> <li each="{page in pages()}"> <a class="gb-paging__page {currentPage() + 1 === page ? \'selected\' : \'\'}" onclick="{jumpTo}">{page}</a> </li> <span class="gb-paging__ellipsis" if="{!isLast() && this.currentPage() < this.totalPages() - this.halfOffset}">&hellip;</span> </ul> <a class="gb-paging__link next {isLast() ? \'disabled\' : \'\'} {!showPages ? \'expand\' : \'\'}" onclick="{nextPage}">Next <span class="gb-paging__icon">&gt;</span></a> <a class="gb-paging__link last {isLast() ? \'disabled\' : \'\'}" if="{showTerminals}" onclick="{lastPage}">Last <span class="gb-paging__icon">&rarr;</span></a> </div>', 'gb-paging .gb-stylish a,[riot-tag="gb-paging"] .gb-stylish a,[data-is="gb-paging"] .gb-stylish a{ cursor: pointer; } gb-paging .gb-stylish.gb-paging,[riot-tag="gb-paging"] .gb-stylish.gb-paging,[data-is="gb-paging"] .gb-stylish.gb-paging{ display: flex; } gb-paging .gb-stylish .gb-paging__link,[riot-tag="gb-paging"] .gb-stylish .gb-paging__link,[data-is="gb-paging"] .gb-stylish .gb-paging__link,gb-paging .gb-stylish .gb-paging__page,[riot-tag="gb-paging"] .gb-stylish .gb-paging__page,[data-is="gb-paging"] .gb-stylish .gb-paging__page,gb-paging .gb-stylish .gb-paging__ellipsis,[riot-tag="gb-paging"] .gb-stylish .gb-paging__ellipsis,[data-is="gb-paging"] .gb-stylish .gb-paging__ellipsis{ text-decoration: none; color: #888; } gb-paging .gb-stylish .gb-paging__link,[riot-tag="gb-paging"] .gb-stylish .gb-paging__link,[data-is="gb-paging"] .gb-stylish .gb-paging__link{ padding: 5px 14px; } gb-paging .gb-stylish .gb-paging__link.next.expand,[riot-tag="gb-paging"] .gb-stylish .gb-paging__link.next.expand,[data-is="gb-paging"] .gb-stylish .gb-paging__link.next.expand{ margin-left: auto; } gb-paging .gb-stylish .gb-paging__pages,[riot-tag="gb-paging"] .gb-stylish .gb-paging__pages,[data-is="gb-paging"] .gb-stylish .gb-paging__pages{ margin: auto; list-style: none; } gb-paging .gb-stylish .gb-paging__pages li,[riot-tag="gb-paging"] .gb-stylish .gb-paging__pages li,[data-is="gb-paging"] .gb-stylish .gb-paging__pages li{ display: inline; } gb-paging .gb-stylish .gb-paging__page,[riot-tag="gb-paging"] .gb-stylish .gb-paging__page,[data-is="gb-paging"] .gb-stylish .gb-paging__page{ padding: 0 4px; } gb-paging .gb-stylish .gb-paging__link:hover,[riot-tag="gb-paging"] .gb-stylish .gb-paging__link:hover,[data-is="gb-paging"] .gb-stylish .gb-paging__link:hover,gb-paging .gb-stylish .gb-paging__page:hover,[riot-tag="gb-paging"] .gb-stylish .gb-paging__page:hover,[data-is="gb-paging"] .gb-stylish .gb-paging__page:hover,gb-paging .gb-stylish .gb-paging__page.selected,[riot-tag="gb-paging"] .gb-stylish .gb-paging__page.selected,[data-is="gb-paging"] .gb-stylish .gb-paging__page.selected{ color: black; } gb-paging .gb-stylish .gb-paging__link.disabled,[riot-tag="gb-paging"] .gb-stylish .gb-paging__link.disabled,[data-is="gb-paging"] .gb-stylish .gb-paging__link.disabled{ color: #ddd; cursor: not-allowed; }', '', function (opts) {
	  var _this = this;

	  opts.flux.on(opts.flux.RESULTS, function (res) {
	    return _this.update({ total: res.totalRecordCount });
	  });
	  var limit = opts.limit === undefined ? 5 : opts.limit;
	  this.showPages = opts.showPages === undefined ? false : opts.showPages;
	  this.showTerminals = opts.showTerminals === undefined ? true : opts.showTerminals;
	  this.currentPage = function () {
	    return opts.flux.page.current;
	  };
	  this.totalPages = function () {
	    return opts.flux.page.total;
	  };
	  this.halfOffset = Math.floor(limit / 2);

	  var offsetPages = function offsetPages(value) {
	    value++;
	    if (_this.currentPage() <= _this.halfOffset) {
	      return value;
	    } else if (_this.currentPage() > _this.totalPages() - _this.halfOffset) {
	      return ++value + _this.totalPages() - limit;
	    } else {
	      return value + _this.currentPage() - _this.halfOffset;
	    }
	  };
	  this.pages = function () {
	    return [].concat(_toConsumableArray(Array(limit).keys())).map(offsetPages);
	  };
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
	  this.jumpTo = function (event) {
	    return opts.flux.page.jump(new Number(event.target.text) - 1);
	  };
	  this.isFirst = function () {
	    return !opts.flux.page.hasPrevious;
	  };
	  this.isLast = function () {
	    return !opts.flux.page.hasNext;
	  };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-query', '<div class="gb-query {opts.style()}"> <input class="gb-query__box" name="searchBox" type="text" placeholder="Search..." autofocus> <a class="gb-query__reset" onclick="{clearQuery}">&times;</a> </div>', 'gb-query .gb-stylish.gb-query,[riot-tag="gb-query"] .gb-stylish.gb-query,[data-is="gb-query"] .gb-stylish.gb-query{ display: flex; align-items: baseline; } gb-query .gb-stylish .gb-query__box,[riot-tag="gb-query"] .gb-stylish .gb-query__box,[data-is="gb-query"] .gb-stylish .gb-query__box{ padding: 6px 12px; font-size: 14px; } gb-query .gb-stylish .gb-query__reset,[riot-tag="gb-query"] .gb-stylish .gb-query__reset,[data-is="gb-query"] .gb-stylish .gb-query__reset{ color: #888; padding: 4px; } gb-query .gb-stylish .gb-query__reset:hover,[riot-tag="gb-query"] .gb-stylish .gb-query__reset:hover,[data-is="gb-query"] .gb-stylish .gb-query__reset:hover{ color: black; cursor: pointer; }', '', function (opts) {
	    var _this = this;

	    __webpack_require__(116);
	    this.on('mount', function () {
	        return riot.mount('.gb-query__box', 'gb-raw-query', opts);
	    });
	    this.clearQuery = function () {
	        return opts.flux.reset(_this.searchBox.value = '');
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-raw-query', '', '.gb-query-wrapper { position: relative; display: inline-block; } .gb-sayt-target { z-index: 10; position: absolute; min-width: 175px; background-color: #fff; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); }', '', function (opts) {
	  var _this = this;

	  __webpack_require__(117);
	  var ENTER_KEY = 13;
	  var queryWrapper = __webpack_require__(121);
	  var autoSearch = opts.autoSearch === undefined ? true : opts.autoSearch;
	  var staticSearch = opts.staticSearch === undefined ? false : opts.staticSearch;
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
	  } else if (staticSearch) {
	    this.on('before-mount', function () {
	      return _this.root.addEventListener('keydown', function (event) {
	        switch (event.keyCode) {
	          case ENTER_KEY:
	            return window.location.replace('' + searchUrl + inputValue());
	        }
	      });
	    });
	  } else {
	    this.on('before-mount', function () {
	      return _this.root.addEventListener('keydown', function (event) {
	        switch (event.keyCode) {
	          case ENTER_KEY:
	            return opts.flux.reset(inputValue());
	        }
	      });
	    });
	  }
	  opts.flux.on(opts.flux.REWRITE_QUERY, function (query) {
	    return _this.root.value = query;
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-sayt', '<div class="gb-sayt {opts.style()}" name="saytNode" if="{queries}"> <ul class="gb-sayt__autocomplete" name="autocompleteList"> <li class="gb-autocomplete__item" each="{query in categoryResults}" data-value="{query.value}" data-refinement="{query.category}" data-field="{categoryField}"> <a class="gb-autocomplete__link" href="#" onclick="{searchCategory}"> <gb-raw content="{enhanceCategoryQuery(query)}"></gb-raw> </a> </li> <div if="{queries && categoryResults.length}" class="gb-autocomplete__divider"></div> <li class="gb-autocomplete__item" each="{queries}" data-value="{value}"> <a class="gb-autocomplete__link" href="#" onclick="{search}"> <gb-raw content="{enhanceQuery(value)}"></gb-raw> </a> </li> <div if="{queries && navigations}" class="gb-autocomplete__divider"></div> <virtual each="{navigations}"> <h4 class="gb-navigation__title">{displayName}</h4> <li class="gb-autocomplete__item" each="{value in values}" data-value="{displayName}: {value}" data-refinement="{value}" data-field="{name}"> <a class="gb-autocomplete__link" href="#" onclick="{searchRefinement}"> <gb-raw content="{enhanceQuery(value)}"></gb-raw> </a> </li> </virtual> </ul> <ul if="{products}" class="gb-sayt__products"> <li each="{products}"> <gb-product></gb-product> </li> </ul> </div>', 'gb-sayt .gb-stylish.gb-sayt,[riot-tag="gb-sayt"] .gb-stylish.gb-sayt,[data-is="gb-sayt"] .gb-stylish.gb-sayt{ display: flex; } gb-sayt .gb-stylish ul,[riot-tag="gb-sayt"] .gb-stylish ul,[data-is="gb-sayt"] .gb-stylish ul{ list-style: none; margin: 0; padding: 0; } gb-sayt .gb-stylish .gb-category-query,[riot-tag="gb-sayt"] .gb-stylish .gb-category-query,[data-is="gb-sayt"] .gb-stylish .gb-category-query{ font-weight: bold; color: darkorange; } gb-sayt .gb-stylish .gb-autocomplete__divider,[riot-tag="gb-sayt"] .gb-stylish .gb-autocomplete__divider,[data-is="gb-sayt"] .gb-stylish .gb-autocomplete__divider{ margin: 3px 10%; border-top: 1px solid #777; } gb-sayt .gb-stylish .gb-sayt__autocomplete,[riot-tag="gb-sayt"] .gb-stylish .gb-sayt__autocomplete,[data-is="gb-sayt"] .gb-stylish .gb-sayt__autocomplete{ min-width: 210px; } gb-sayt .gb-stylish .gb-autocomplete__link,[riot-tag="gb-sayt"] .gb-stylish .gb-autocomplete__link,[data-is="gb-sayt"] .gb-stylish .gb-autocomplete__link{ padding: 5px 15px; text-decoration: none; display: block; } gb-sayt .gb-stylish .gb-autocomplete__item:hover,[riot-tag="gb-sayt"] .gb-stylish .gb-autocomplete__item:hover,[data-is="gb-sayt"] .gb-stylish .gb-autocomplete__item:hover,gb-sayt .gb-stylish .gb-autocomplete__item.active,[riot-tag="gb-sayt"] .gb-stylish .gb-autocomplete__item.active,[data-is="gb-sayt"] .gb-stylish .gb-autocomplete__item.active{ background-color: #f1f1f1; } gb-sayt .gb-stylish .gb-navigation__title,[riot-tag="gb-sayt"] .gb-stylish .gb-navigation__title,[data-is="gb-sayt"] .gb-stylish .gb-navigation__title{ margin: 4px; } gb-sayt .gb-stylish .gb-sayt__products,[riot-tag="gb-sayt"] .gb-stylish .gb-sayt__products,[data-is="gb-sayt"] .gb-stylish .gb-sayt__products{ min-width: 300px; display: flex; flex-wrap: wrap; justify-content: space-around; align-items: center; } gb-sayt .gb-stylish .gb-sayt__products .gb-product__image,[riot-tag="gb-sayt"] .gb-stylish .gb-sayt__products .gb-product__image,[data-is="gb-sayt"] .gb-stylish .gb-sayt__products .gb-product__image{ vertical-align: bottom; width: 80px; } gb-sayt .gb-stylish .gb-sayt__products .gb-product__info-link,[riot-tag="gb-sayt"] .gb-stylish .gb-sayt__products .gb-product__info-link,[data-is="gb-sayt"] .gb-stylish .gb-sayt__products .gb-product__info-link{ display: none; } gb-sayt .gb-stylish .gb-sayt__products .gb-product:hover,[riot-tag="gb-sayt"] .gb-stylish .gb-sayt__products .gb-product:hover,[data-is="gb-sayt"] .gb-stylish .gb-sayt__products .gb-product:hover{ box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); }', '', function (opts) {
	  var _this = this;

	  __webpack_require__(118);
	  __webpack_require__(119);
	  var sayt = __webpack_require__(104);
	  var autocomplete = __webpack_require__(120);
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-product', '<div class="gb-product"> <a class="gb-product__image-link" href="{link(allMeta.id)}"> <img class="gb-product__image" riot-src="{isImageArray() ? allMeta[struct.image][0] : allMeta[struct.image]}" alt=""> </a> <a class="gb-product__info-link" href="{link(allMeta.id)}"> <p>{allMeta[struct.title]}</p> <p>{allMeta[struct.price]}</p> </a> </div>', '', '', function (opts) {
	    var _this = this;

	    this.struct = this.parent.struct;
	    this.link = function (id) {
	        return _this.struct.url || 'details.html?id=' + id;
	    };
	    this.isImageArray = function () {
	        return Array.isArray(_this.allMeta[_this.struct.image]);
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-raw', '<span></span>', '', '', function (opts) {
	    var _this = this;

	    this.updateContent = function () {
	        return _this.root.innerHTML = opts.content;
	    };
	    this.on('update', function () {
	        return _this.updateContent();
	    });
	    this.updateContent();
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 120 */
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
/* 121 */
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

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-details', '<div class="gb-details"> <yield></yield> </div>', '', '', function (opts) {
	  var _this = this;

	  var idParam = opts.idParam || 'id';
	  var queryParam = window.location.search.substring(1).split('&').find(function (value) {
	    return value.startsWith(idParam);
	  });

	  this.struct = opts.config.structure;
	  opts.flux.on(opts.flux.DETAILS, function (record) {
	    return _this.update({ record: record });
	  });
	  if (queryParam && queryParam.includes('=')) opts.flux.details(queryParam.split('=')[1]);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-raw-submit', '<yield></yield>', '', '', function (opts) {
	    var ENTER_KEY = 13;
	    this.root.addEventListener('click', function (event) {
	        return opts.flux.search(document.querySelector('[riot-tag="gb-raw-query"]').value);
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-results', '<gb-raw-results flux="{opts.flux}"> <gb-product></gb-product> </gb-raw-results>', '', '', function (opts) {
	    __webpack_require__(125);
	    __webpack_require__(118);

	    this.struct = opts.config.structure;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-raw-results', '<ul class="gb-results {this.parent.opts.style()} {userStyle(\'results\')}"> <li class="gb-results__item {userStyle(\'resultsItem\')}" each="{records}"> <div class="gb-product {userStyle(\'product\')}"> <yield></yield> </div> </li> </ul>', 'gb-raw-results .gb-stylish.gb-results,[riot-tag="gb-raw-results"] .gb-stylish.gb-results,[data-is="gb-raw-results"] .gb-stylish.gb-results{ padding: 0; list-style: none; display: flex; flex-wrap: wrap; justify-content: space-around; } gb-raw-results .gb-stylish .gb-product,[riot-tag="gb-raw-results"] .gb-stylish .gb-product,[data-is="gb-raw-results"] .gb-stylish .gb-product{ display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; } gb-raw-results .gb-stylish .gb-product .gb-product__image,[riot-tag="gb-raw-results"] .gb-stylish .gb-product .gb-product__image,[data-is="gb-raw-results"] .gb-stylish .gb-product .gb-product__image{ width: 380px; }', '', function (opts) {
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 126 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 127 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 128 */
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
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-template', '<div class="gb-template {opts.style()}" if="{isActive}"> <yield></yield> </div>', 'gb-template .gb-stylish.gb-template,[riot-tag="gb-template"] .gb-stylish.gb-template,[data-is="gb-template"] .gb-stylish.gb-template{ display: flex; align-items: center; justify-content: center; }', '', function (opts) {
	    var _this = this;

	    this.isActive = false;
	    opts.flux.on(opts.flux.RESULTS, function (res) {
	        return _this.update({ isActive: res.template.name === opts.templateName });
	    });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	riot.tag2('gb-page-size', '<gb-select class="gb-page-size" options="{pageSizes}" native="{opts.native}" default="true" update="{updatePageSize}" hover="{opts.onHover}"></gb-select>', '', '', function (opts) {
	    this.pageSizes = opts.config.pageSizes || [10, 25, 50, 100];
	    var resetOffset = opts.resetOffset;
	    this.updatePageSize = function (value) {
	        return opts.flux.resize(value, resetOffset ? 0 : undefined);
	    };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	riot.tag2('gb-filter', '<gb-select name="selectElement" update="{navigate}" native="{opts.native}" label="{label}" clear="{clear}" hover="{opts.onHover}"></gb-select>', '', '', function (opts) {
	  var _this = this;

	  __webpack_require__(132);
	  var utils = __webpack_require__(93);
	  var navField = opts.field;
	  var flux = opts.clone();
	  var isTargetNav = function isTargetNav(nav) {
	    return nav.name === navField;
	  };
	  var convertRefinements = function convertRefinements(navigations) {
	    return navigations.find(isTargetNav).refinements.map(function (ref) {
	      return { label: ref.value, value: ref };
	    });
	  };
	  var updateValues = function updateValues(res) {
	    return _this.selectElement._tag.update({ options: convertRefinements(res.availableNavigation) });
	  };

	  this.label = opts.label || 'Filter';
	  this.clear = opts.clear || 'Unfiltered';
	  this.navigate = function (value) {
	    if (_this.selected) opts.flux.unrefine(_this.selected, { skipSearch: true });
	    if (value === '*') {
	      opts.flux.reset();
	    } else {
	      opts.flux.refine(_this.selected = utils.toRefinement(value, { name: navField }));
	    }
	  };

	  opts.flux.on(opts.flux.RESULTS, function (res) {
	    var _flux$query;

	    var searchRequest = opts.flux.query.rawRequest;

	    flux.query.withConfiguration({ refinements: [] });
	    if (searchRequest.refinements) (_flux$query = flux.query).withSelectedRefinements.apply(_flux$query, _toConsumableArray(searchRequest.refinements.filter(function (ref) {
	      return ref.navigationName !== navField;
	    })));

	    flux.search(searchRequest.query).then(updateValues);
	  });
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	riot.tag2('gb-select', '<select if="{native}" name="nativeSelect" onchange="{selectNative}"> <option if="{!hasDefault}" value="" selected disabled>{selectLabel()}</option> <option each="{option in options}" value="{optionValue(option)}">{optionLabel(option)}</option> </select> <div if="{!native}" class="gb-select {hover ? \'hoverable\' : \'clickable\'}"> <button type="button" class="gb-select__button" name="selectButton" onfocus="{prepFocus}" onclick="{unFocus}"> <span>{selectLabel()}</span> <img class="gb-select__arrow" src="assets/arrow-down.svg" alt=""> </button> <div class="gb-select__content"> <a value="" if="{!hasDefault && selectedOption}" onclick="{clearSelection}">{clear}</a> <a each="{option in options}" onclick="{selectCustom}" value="{optionValue(option)}">{optionLabel(option)}</a> </div> </div>', 'gb-select .gb-select,[riot-tag="gb-select"] .gb-select,[data-is="gb-select"] .gb-select{ position: relative; display: inline-block; } gb-select .gb-select.hoverable:hover .gb-select__content,[riot-tag="gb-select"] .gb-select.hoverable:hover .gb-select__content,[data-is="gb-select"] .gb-select.hoverable:hover .gb-select__content,gb-select .gb-select.clickable .gb-select__button:focus + .gb-select__content,[riot-tag="gb-select"] .gb-select.clickable .gb-select__button:focus + .gb-select__content,[data-is="gb-select"] .gb-select.clickable .gb-select__button:focus + .gb-select__content,gb-select .gb-select__content:hover,[riot-tag="gb-select"] .gb-select__content:hover,[data-is="gb-select"] .gb-select__content:hover{ display: block; } gb-select .gb-select:hover .gb-select__button,[riot-tag="gb-select"] .gb-select:hover .gb-select__button,[data-is="gb-select"] .gb-select:hover .gb-select__button,gb-select .gb-select .gb-select__button:focus,[riot-tag="gb-select"] .gb-select .gb-select__button:focus,[data-is="gb-select"] .gb-select .gb-select__button:focus{ border-color: #aaa; } gb-select .gb-select__button,[riot-tag="gb-select"] .gb-select__button,[data-is="gb-select"] .gb-select__button{ overflow-x: hidden; display: flex; align-items: center; font-size: 14px; border: none; cursor: pointer; padding: 8px 16px; width: 100%; background-color: #eee; border: 2px solid #ddd; border-radius: 4px; white-space: nowrap; } gb-select .gb-select__button:focus,[riot-tag="gb-select"] .gb-select__button:focus,[data-is="gb-select"] .gb-select__button:focus{ outline: none; } gb-select .gb-select__arrow,[riot-tag="gb-select"] .gb-select__arrow,[data-is="gb-select"] .gb-select__arrow{ margin-left: 10px; height: 6px; } gb-select .gb-select__content,[riot-tag="gb-select"] .gb-select__content,[data-is="gb-select"] .gb-select__content{ display: none; position: absolute; min-width: 160px; background-color: #f6f6f6; box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2); z-index: 100; max-height: 300px; overflow-y: scroll; } gb-select .gb-select__content a,[riot-tag="gb-select"] .gb-select__content a,[data-is="gb-select"] .gb-select__content a{ cursor: pointer; display: block; text-decoration: none; color: black; padding: 10px 12px; } gb-select .gb-select__content a:hover,[riot-tag="gb-select"] .gb-select__content a:hover,[data-is="gb-select"] .gb-select__content a:hover{ background-color: #eee; }', '', function (opts) {
	  var _this = this;

	  var label = opts.label || 'Select';
	  var callback = opts.update;

	  this.hover = opts.hover === undefined ? true : opts.hover;
	  this.native = opts.native === undefined ? false : opts.native;
	  this.clear = opts.clear === undefined ? 'Unselect' : opts.clear;
	  this.hasDefault = opts.default === undefined ? false : opts.default;
	  this.options = opts.options || [];
	  if (this.hasDefault) this.selectedOption = this.options[0];

	  this.selectLabel = function () {
	    return _this.selectedOption ? _this.selectedOption : _this.selected ? _this.clear : label;
	  };
	  this.optionValue = function (option) {
	    return (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' ? JSON.stringify(option.value) : option;
	  };
	  this.optionLabel = function (option) {
	    return (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' ? option.label : option;
	  };
	  this.prepFocus = function () {
	    return _this.focused = false;
	  };
	  this.unFocus = function () {
	    _this.focused = _this.hover || !_this.focused;
	    if (!_this.focused) _this.selectButton.blur();
	  };

	  var selectOption = function selectOption(selectedOption, value) {
	    _this.update({ selectedOption: selectedOption });
	    if (callback) {
	      try {
	        callback(JSON.parse(value));
	      } catch (e) {
	        callback(value ? value : '*');
	      }
	    }
	  };
	  this.selectNative = function (event) {
	    var selected = event.target.value !== '';
	    _this.nativeSelect.options[0].disabled = !selected;
	    _this.update({ selected: selected });
	    selectOption(event.target.text, event.target.value);
	  };
	  this.selectCustom = function (event) {
	    _this.selectButton.blur();
	    selectOption(event.target.text, event.target.value);
	  };
	  this.clearSelection = function () {
	    return selectOption(undefined, '*');
	  };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(riot) {'use strict';

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	riot.tag2('gb-sort', '<gb-select class="gb-sort" options="{sorts}" native="{opts.native}" label="{label}" clear="{clear}" update="{updateSort}" hover="{opts.onHover}"></gb-select>', '', '', function (opts) {
	  var _this = this;

	  __webpack_require__(132);
	  this.label = opts.label || 'Sort';
	  this.clear = opts.clear || 'Unsorted';
	  this.sorts = opts.options || [{ label: 'Name Descending', value: { field: 'title', order: 'Descending' } }, { label: 'Name Ascending', value: { field: 'title', order: 'Ascending' } }];
	  this.updateSort = function (value) {
	    if (value !== '*') {
	      opts.flux.sort(value);
	    } else {
	      var _opts$flux$query;

	      (_opts$flux$query = opts.flux.query).withoutSorts.apply(_opts$flux$query, _toConsumableArray(_this.sorts.map(function (sort) {
	        return sort.value;
	      })));
	      opts.flux.search();
	    }
	  };
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(94)))

/***/ }
/******/ ]);