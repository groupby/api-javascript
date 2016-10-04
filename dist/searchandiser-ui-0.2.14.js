/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ((function(modules) {
	// Check all modules for deduplicated modules
	for(var i in modules) {
		if(Object.prototype.hasOwnProperty.call(modules, i)) {
			switch(typeof modules[i]) {
			case "function": break;
			case "object":
				// Module can be created from a template
				modules[i] = (function(_m) {
					var args = _m.slice(1), fn = modules[_m[0]];
					return function (a,b,c) {
						fn.apply(this, [a,b,c].concat(args));
					};
				}(modules[i]));
				break;
			default:
				// Module is a copy of another module
				modules[i] = modules[modules[i]];
				break;
			}
		}
	}
	return modules;
}([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["searchandiser"] = __webpack_require__(1);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(2);
	var searchandiser_1 = __webpack_require__(37);
	__webpack_require__(167);
	module.exports = searchandiser_1.initSearchandiser();


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(3);
	__webpack_require__(5).shim();
	__webpack_require__(30).shim();
	__webpack_require__(34);
	__webpack_require__(35);
	__webpack_require__(36);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	if (!Array.of) {
	  __webpack_require__(4);
	}


/***/ },
/* 4 */
/***/ function(module, exports) {

	/*! https://mths.be/array-of v0.1.0 by @mathias */
	(function () {
		'use strict';
		var defineProperty = (function () {
			// IE 8 only supports `Object.defineProperty` on DOM elements
			try {
				var object = {};
				var $defineProperty = Object.defineProperty;
				var result = $defineProperty(object, object, object) && $defineProperty;
			} catch (error) { /**/ }
			return result;
		}());
		var isConstructor = function isConstructor(Constructor) {
			try {
				return !!new Constructor();
			} catch (_) {
				return false;
			}
		};
		var of = function of() {
			var items = arguments;
			var length = items.length;
			var Me = this;
			var result = isConstructor(Me) ? new Me(length) : new Array(length);
			var index = 0;
			var value;
			while (index < length) {
				value = items[index];
				if (defineProperty) {
					defineProperty(result, index, {
						'value': value,
						'writable': true,
						'enumerable': true,
						'configurable': true
					});
				} else {
					result[index] = value;
				}
				index += 1;
			}
			result.length = length;
			return result;
		};
		if (defineProperty) {
			defineProperty(Array, 'of', {
				'value': of,
				'configurable': true,
				'writable': true
			});
		} else {
			Array.of = of;
		}
	}());


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var define = __webpack_require__(6);
	
	var implementation = __webpack_require__(10);
	var getPolyfill = __webpack_require__(28);
	var shim = __webpack_require__(29);
	
	// eslint-disable-next-line no-unused-vars
	var boundFromShim = function from(array) {
	    // eslint-disable-next-line no-invalid-this
		return implementation.apply(this || Array, arguments);
	};
	
	define(boundFromShim, {
		'getPolyfill': getPolyfill,
		'implementation': implementation,
		'shim': shim
	});
	
	module.exports = boundFromShim;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var keys = __webpack_require__(7);
	var foreach = __webpack_require__(9);
	var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';
	
	var toStr = Object.prototype.toString;
	
	var isFunction = function (fn) {
		return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
	};
	
	var arePropertyDescriptorsSupported = function () {
		var obj = {};
		try {
			Object.defineProperty(obj, 'x', { enumerable: false, value: obj });
	        /* eslint-disable no-unused-vars, no-restricted-syntax */
	        for (var _ in obj) { return false; }
	        /* eslint-enable no-unused-vars, no-restricted-syntax */
			return obj.x === obj;
		} catch (e) { /* this is IE 8. */
			return false;
		}
	};
	var supportsDescriptors = Object.defineProperty && arePropertyDescriptorsSupported();
	
	var defineProperty = function (object, name, value, predicate) {
		if (name in object && (!isFunction(predicate) || !predicate())) {
			return;
		}
		if (supportsDescriptors) {
			Object.defineProperty(object, name, {
				configurable: true,
				enumerable: false,
				value: value,
				writable: true
			});
		} else {
			object[name] = value;
		}
	};
	
	var defineProperties = function (object, map) {
		var predicates = arguments.length > 2 ? arguments[2] : {};
		var props = keys(map);
		if (hasSymbols) {
			props = props.concat(Object.getOwnPropertySymbols(map));
		}
		foreach(props, function (name) {
			defineProperty(object, name, map[name], predicates[name]);
		});
	};
	
	defineProperties.supportsDescriptors = !!supportsDescriptors;
	
	module.exports = defineProperties;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var slice = Array.prototype.slice;
	var isArgs = __webpack_require__(8);
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};
	
	var keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];
	
		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}
	
		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}
	
		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}
	
		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);
	
			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
	
	keysShim.shim = function shimObjectKeys() {
		if (Object.keys) {
			var keysWorksWithArguments = (function () {
				// Safari 5.0 bug
				return (Object.keys(arguments) || '').length === 2;
			}(1, 2));
			if (!keysWorksWithArguments) {
				var originalKeys = Object.keys;
				Object.keys = function keys(object) {
					if (isArgs(object)) {
						return originalKeys(slice.call(object));
					} else {
						return originalKeys(object);
					}
				};
			}
		} else {
			Object.keys = keysShim;
		}
		return Object.keys || keysShim;
	};
	
	module.exports = keysShim;


/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	var toStr = Object.prototype.toString;
	
	module.exports = function isArguments(value) {
		var str = toStr.call(value);
		var isArgs = str === '[object Arguments]';
		if (!isArgs) {
			isArgs = str !== '[object Array]' &&
				value !== null &&
				typeof value === 'object' &&
				typeof value.length === 'number' &&
				value.length >= 0 &&
				toStr.call(value.callee) === '[object Function]';
		}
		return isArgs;
	};


/***/ },
/* 9 */
/***/ function(module, exports) {

	
	var hasOwn = Object.prototype.hasOwnProperty;
	var toString = Object.prototype.toString;
	
	module.exports = function forEach (obj, fn, ctx) {
	    if (toString.call(fn) !== '[object Function]') {
	        throw new TypeError('iterator must be a function');
	    }
	    var l = obj.length;
	    if (l === +l) {
	        for (var i = 0; i < l; i++) {
	            fn.call(ctx, obj[i], i, obj);
	        }
	    } else {
	        for (var k in obj) {
	            if (hasOwn.call(obj, k)) {
	                fn.call(ctx, obj[k], k, obj);
	            }
	        }
	    }
	};
	


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var ES = __webpack_require__(11);
	var supportsDescriptors = __webpack_require__(6).supportsDescriptors;
	
	/*! https://mths.be/array-from v0.2.0 by @mathias */
	module.exports = function from(arrayLike) {
		var defineProperty = supportsDescriptors ? Object.defineProperty : function put(object, key, descriptor) {
			object[key] = descriptor.value;
		};
		var C = this;
		if (arrayLike === null || typeof arrayLike === 'undefined') {
			throw new TypeError('`Array.from` requires an array-like object, not `null` or `undefined`');
		}
		var items = ES.ToObject(arrayLike);
	
		var mapFn, T;
		if (typeof arguments[1] !== 'undefined') {
			mapFn = arguments[1];
			if (!ES.IsCallable(mapFn)) {
				throw new TypeError('When provided, the second argument to `Array.from` must be a function');
			}
			if (arguments.length > 2) {
				T = arguments[2];
			}
		}
	
		var len = ES.ToLength(items.length);
		var A = ES.IsCallable(C) ? ES.ToObject(new C(len)) : new Array(len);
		var k = 0;
		var kValue, mappedValue;
		while (k < len) {
			kValue = items[k];
			if (mapFn) {
				mappedValue = typeof T === 'undefined' ? mapFn(kValue, k) : ES.Call(mapFn, T, [kValue, k]);
			} else {
				mappedValue = kValue;
			}
			defineProperty(A, k, {
				'configurable': true,
				'enumerable': true,
				'value': mappedValue,
				'writable': true
			});
			k += 1;
		}
		A.length = len;
		return A;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toStr = Object.prototype.toString;
	var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
	var symbolToStr = hasSymbols ? Symbol.prototype.toString : toStr;
	
	var $isNaN = __webpack_require__(12);
	var $isFinite = __webpack_require__(13);
	var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
	
	var assign = __webpack_require__(14);
	var sign = __webpack_require__(15);
	var mod = __webpack_require__(16);
	var isPrimitive = __webpack_require__(17);
	var toPrimitive = __webpack_require__(18);
	var parseInteger = parseInt;
	var bind = __webpack_require__(23);
	var strSlice = bind.call(Function.call, String.prototype.slice);
	var isBinary = bind.call(Function.call, RegExp.prototype.test, /^0b[01]+$/i);
	var isOctal = bind.call(Function.call, RegExp.prototype.test, /^0o[0-7]+$/i);
	var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
	var nonWSregex = new RegExp('[' + nonWS + ']', 'g');
	var hasNonWS = bind.call(Function.call, RegExp.prototype.test, nonWSregex);
	var invalidHexLiteral = /^[\-\+]0x[0-9a-f]+$/i;
	var isInvalidHexLiteral = bind.call(Function.call, RegExp.prototype.test, invalidHexLiteral);
	
	// whitespace from: http://es5.github.io/#x15.5.4.20
	// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
	var ws = [
		'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
		'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
		'\u2029\uFEFF'
	].join('');
	var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
	var replace = bind.call(Function.call, String.prototype.replace);
	var trim = function (value) {
		return replace(value, trimRegex, '');
	};
	
	var ES5 = __webpack_require__(25);
	
	var hasRegExpMatcher = __webpack_require__(27);
	
	// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-abstract-operations
	var ES6 = assign(assign({}, ES5), {
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-call-f-v-args
		Call: function Call(F, V) {
			var args = arguments.length > 2 ? arguments[2] : [];
			if (!this.IsCallable(F)) {
				throw new TypeError(F + ' is not a function');
			}
			return F.apply(V, args);
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toprimitive
		ToPrimitive: toPrimitive,
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toboolean
		// ToBoolean: ES5.ToBoolean,
	
		// http://www.ecma-international.org/ecma-262/6.0/#sec-tonumber
		ToNumber: function ToNumber(argument) {
			var value = isPrimitive(argument) ? argument : toPrimitive(argument, 'number');
			if (typeof value === 'symbol') {
				throw new TypeError('Cannot convert a Symbol value to a number');
			}
			if (typeof value === 'string') {
				if (isBinary(value)) {
					return this.ToNumber(parseInteger(strSlice(value, 2), 2));
				} else if (isOctal(value)) {
					return this.ToNumber(parseInteger(strSlice(value, 2), 8));
				} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
					return NaN;
				} else {
					var trimmed = trim(value);
					if (trimmed !== value) {
						return this.ToNumber(trimmed);
					}
				}
			}
			return Number(value);
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tointeger
		// ToInteger: ES5.ToNumber,
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint32
		// ToInt32: ES5.ToInt32,
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint32
		// ToUint32: ES5.ToUint32,
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint16
		ToInt16: function ToInt16(argument) {
			var int16bit = this.ToUint16(argument);
			return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint16
		// ToUint16: ES5.ToUint16,
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toint8
		ToInt8: function ToInt8(argument) {
			var int8bit = this.ToUint8(argument);
			return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8
		ToUint8: function ToUint8(argument) {
			var number = this.ToNumber(argument);
			if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
			var posInt = sign(number) * Math.floor(Math.abs(number));
			return mod(posInt, 0x100);
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-touint8clamp
		ToUint8Clamp: function ToUint8Clamp(argument) {
			var number = this.ToNumber(argument);
			if ($isNaN(number) || number <= 0) { return 0; }
			if (number >= 0xFF) { return 0xFF; }
			var f = Math.floor(argument);
			if (f + 0.5 < number) { return f + 1; }
			if (number < f + 0.5) { return f; }
			if (f % 2 !== 0) { return f + 1; }
			return f;
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tostring
		ToString: function ToString(argument) {
			if (typeof argument === 'symbol') {
				throw new TypeError('Cannot convert a Symbol value to a string');
			}
			return String(argument);
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-toobject
		ToObject: function ToObject(value) {
			this.RequireObjectCoercible(value);
			return Object(value);
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-topropertykey
		ToPropertyKey: function ToPropertyKey(argument) {
			var key = this.ToPrimitive(argument, String);
			return typeof key === 'symbol' ? symbolToStr.call(key) : this.ToString(key);
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength
		ToLength: function ToLength(argument) {
			var len = this.ToInteger(argument);
			if (len <= 0) { return 0; } // includes converting -0 to +0
			if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
			return len;
		},
	
		// http://www.ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring
		CanonicalNumericIndexString: function CanonicalNumericIndexString(argument) {
			if (toStr.call(argument) !== '[object String]') {
				throw new TypeError('must be a string');
			}
			if (argument === '-0') { return -0; }
			var n = this.ToNumber(argument);
			if (this.SameValue(this.ToString(n), argument)) { return n; }
			return void 0;
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-requireobjectcoercible
		RequireObjectCoercible: ES5.CheckObjectCoercible,
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isarray
		IsArray: Array.isArray || function IsArray(argument) {
			return toStr.call(argument) === '[object Array]';
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-iscallable
		// IsCallable: ES5.IsCallable,
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isconstructor
		IsConstructor: function IsConstructor(argument) {
			return typeof argument === 'function' && !!argument.prototype; // unfortunately there's no way to truly check this without try/catch `new argument`
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isextensible-o
		IsExtensible: function IsExtensible(obj) {
			if (!Object.preventExtensions) { return true; }
			if (isPrimitive(obj)) {
				return false;
			}
			return Object.isExtensible(obj);
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-isinteger
		IsInteger: function IsInteger(argument) {
			if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
				return false;
			}
			var abs = Math.abs(argument);
			return Math.floor(abs) === abs;
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ispropertykey
		IsPropertyKey: function IsPropertyKey(argument) {
			return typeof argument === 'string' || typeof argument === 'symbol';
		},
	
		// http://www.ecma-international.org/ecma-262/6.0/#sec-isregexp
		IsRegExp: function IsRegExp(argument) {
			if (!argument || typeof argument !== 'object') {
				return false;
			}
			if (hasSymbols) {
				var isRegExp = argument[Symbol.match];
				if (typeof isRegExp !== 'undefined') {
					return ES5.ToBoolean(isRegExp);
				}
			}
			return hasRegExpMatcher(argument);
		},
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevalue
		// SameValue: ES5.SameValue,
	
		// https://people.mozilla.org/~jorendorff/es6-draft.html#sec-samevaluezero
		SameValueZero: function SameValueZero(x, y) {
			return (x === y) || ($isNaN(x) && $isNaN(y));
		},
	
		Type: function Type(x) {
			if (typeof x === 'symbol') {
				return 'Symbol';
			}
			return ES5.Type(x);
		},
	
		// http://www.ecma-international.org/ecma-262/6.0/#sec-speciesconstructor
		SpeciesConstructor: function SpeciesConstructor(O, defaultConstructor) {
			if (this.Type(O) !== 'Object') {
				throw new TypeError('Assertion failed: Type(O) is not Object');
			}
			var C = O.constructor;
			if (typeof C === 'undefined') {
				return defaultConstructor;
			}
			if (this.Type(C) !== 'Object') {
				throw new TypeError('O.constructor is not an Object');
			}
			var S = hasSymbols && Symbol.species ? C[Symbol.species] : undefined;
			if (S == null) {
				return defaultConstructor;
			}
			if (this.IsConstructor(S)) {
				return S;
			}
			throw new TypeError('no constructor found');
		}
	});
	
	delete ES6.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible
	
	module.exports = ES6;


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = Number.isNaN || function isNaN(a) {
		return a !== a;
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	var $isNaN = Number.isNaN || function (a) { return a !== a; };
	
	module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };


/***/ },
/* 14 */
/***/ function(module, exports) {

	var has = Object.prototype.hasOwnProperty;
	module.exports = Object.assign || function assign(target, source) {
		for (var key in source) {
			if (has.call(source, key)) {
				target[key] = source[key];
			}
		}
		return target;
	};


/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function sign(number) {
		return number >= 0 ? 1 : -1;
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function mod(number, modulo) {
		var remain = number % modulo;
		return Math.floor(remain >= 0 ? remain : remain + modulo);
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function isPrimitive(value) {
		return value === null || (typeof value !== 'function' && typeof value !== 'object');
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var hasSymbols = typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol';
	
	var isPrimitive = __webpack_require__(19);
	var isCallable = __webpack_require__(20);
	var isDate = __webpack_require__(21);
	var isSymbol = __webpack_require__(22);
	
	var ordinaryToPrimitive = function OrdinaryToPrimitive(O, hint) {
		if (typeof O === 'undefined' || O === null) {
			throw new TypeError('Cannot call method on ' + O);
		}
		if (typeof hint !== 'string' || (hint !== 'number' && hint !== 'string')) {
			throw new TypeError('hint must be "string" or "number"');
		}
		var methodNames = hint === 'string' ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
		var method, result, i;
		for (i = 0; i < methodNames.length; ++i) {
			method = O[methodNames[i]];
			if (isCallable(method)) {
				result = method.call(O);
				if (isPrimitive(result)) {
					return result;
				}
			}
		}
		throw new TypeError('No default value');
	};
	
	var GetMethod = function GetMethod(O, P) {
		var func = O[P];
		if (func !== null && typeof func !== 'undefined') {
			if (!isCallable(func)) {
				throw new TypeError(func + ' returned for property ' + P + ' of object ' + O + ' is not a function');
			}
			return func;
		}
	};
	
	// http://www.ecma-international.org/ecma-262/6.0/#sec-toprimitive
	module.exports = function ToPrimitive(input, PreferredType) {
		if (isPrimitive(input)) {
			return input;
		}
		var hint = 'default';
		if (arguments.length > 1) {
			if (PreferredType === String) {
				hint = 'string';
			} else if (PreferredType === Number) {
				hint = 'number';
			}
		}
	
		var exoticToPrim;
		if (hasSymbols) {
			if (Symbol.toPrimitive) {
				exoticToPrim = GetMethod(input, Symbol.toPrimitive);
			} else if (isSymbol(input)) {
				exoticToPrim = Symbol.prototype.valueOf;
			}
		}
		if (typeof exoticToPrim !== 'undefined') {
			var result = exoticToPrim.call(input, hint);
			if (isPrimitive(result)) {
				return result;
			}
			throw new TypeError('unable to convert exotic object to primitive');
		}
		if (hint === 'default' && (isDate(input) || isSymbol(input))) {
			hint = 'string';
		}
		return ordinaryToPrimitive(input, hint === 'default' ? 'number' : hint);
	};


/***/ },
/* 19 */
17,
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	var fnToStr = Function.prototype.toString;
	
	var constructorRegex = /^\s*class /;
	var isES6ClassFn = function isES6ClassFn(value) {
		try {
			var fnStr = fnToStr.call(value);
			var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
			var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
			var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
			return constructorRegex.test(spaceStripped);
		} catch (e) {
			return false; // not a function
		}
	};
	
	var tryFunctionObject = function tryFunctionObject(value) {
		try {
			if (isES6ClassFn(value)) { return false; }
			fnToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var fnClass = '[object Function]';
	var genClass = '[object GeneratorFunction]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
	
	module.exports = function isCallable(value) {
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		return strClass === fnClass || strClass === genClass;
	};


/***/ },
/* 21 */
/***/ function(module, exports) {

	'use strict';
	
	var getDay = Date.prototype.getDay;
	var tryDateObject = function tryDateObject(value) {
		try {
			getDay.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	
	var toStr = Object.prototype.toString;
	var dateClass = '[object Date]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
	
	module.exports = function isDateObject(value) {
		if (typeof value !== 'object' || value === null) { return false; }
		return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	var toStr = Object.prototype.toString;
	var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';
	
	if (hasSymbols) {
		var symToStr = Symbol.prototype.toString;
		var symStringRegex = /^Symbol\(.*\)$/;
		var isSymbolObject = function isSymbolObject(value) {
			if (typeof value.valueOf() !== 'symbol') { return false; }
			return symStringRegex.test(symToStr.call(value));
		};
		module.exports = function isSymbol(value) {
			if (typeof value === 'symbol') { return true; }
			if (toStr.call(value) !== '[object Symbol]') { return false; }
			try {
				return isSymbolObject(value);
			} catch (e) {
				return false;
			}
		};
	} else {
		module.exports = function isSymbol(value) {
			// this environment does not support Symbols.
			return false;
		};
	}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var implementation = __webpack_require__(24);
	
	module.exports = Function.prototype.bind || implementation;


/***/ },
/* 24 */
/***/ function(module, exports) {

	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var slice = Array.prototype.slice;
	var toStr = Object.prototype.toString;
	var funcType = '[object Function]';
	
	module.exports = function bind(that) {
	    var target = this;
	    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
	        throw new TypeError(ERROR_MESSAGE + target);
	    }
	    var args = slice.call(arguments, 1);
	
	    var bound;
	    var binder = function () {
	        if (this instanceof bound) {
	            var result = target.apply(
	                this,
	                args.concat(slice.call(arguments))
	            );
	            if (Object(result) === result) {
	                return result;
	            }
	            return this;
	        } else {
	            return target.apply(
	                that,
	                args.concat(slice.call(arguments))
	            );
	        }
	    };
	
	    var boundLength = Math.max(0, target.length - args.length);
	    var boundArgs = [];
	    for (var i = 0; i < boundLength; i++) {
	        boundArgs.push('$' + i);
	    }
	
	    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);
	
	    if (target.prototype) {
	        var Empty = function Empty() {};
	        Empty.prototype = target.prototype;
	        bound.prototype = new Empty();
	        Empty.prototype = null;
	    }
	
	    return bound;
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var $isNaN = __webpack_require__(12);
	var $isFinite = __webpack_require__(13);
	
	var sign = __webpack_require__(15);
	var mod = __webpack_require__(16);
	
	var IsCallable = __webpack_require__(20);
	var toPrimitive = __webpack_require__(26);
	
	// https://es5.github.io/#x9
	var ES5 = {
		ToPrimitive: toPrimitive,
	
		ToBoolean: function ToBoolean(value) {
			return Boolean(value);
		},
		ToNumber: function ToNumber(value) {
			return Number(value);
		},
		ToInteger: function ToInteger(value) {
			var number = this.ToNumber(value);
			if ($isNaN(number)) { return 0; }
			if (number === 0 || !$isFinite(number)) { return number; }
			return sign(number) * Math.floor(Math.abs(number));
		},
		ToInt32: function ToInt32(x) {
			return this.ToNumber(x) >> 0;
		},
		ToUint32: function ToUint32(x) {
			return this.ToNumber(x) >>> 0;
		},
		ToUint16: function ToUint16(value) {
			var number = this.ToNumber(value);
			if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
			var posInt = sign(number) * Math.floor(Math.abs(number));
			return mod(posInt, 0x10000);
		},
		ToString: function ToString(value) {
			return String(value);
		},
		ToObject: function ToObject(value) {
			this.CheckObjectCoercible(value);
			return Object(value);
		},
		CheckObjectCoercible: function CheckObjectCoercible(value, optMessage) {
			/* jshint eqnull:true */
			if (value == null) {
				throw new TypeError(optMessage || 'Cannot call method on ' + value);
			}
			return value;
		},
		IsCallable: IsCallable,
		SameValue: function SameValue(x, y) {
			if (x === y) { // 0 === -0, but they are not identical.
				if (x === 0) { return 1 / x === 1 / y; }
				return true;
			}
			return $isNaN(x) && $isNaN(y);
		},
	
		// http://www.ecma-international.org/ecma-262/5.1/#sec-8
		Type: function Type(x) {
			if (x === null) {
				return 'Null';
			}
			if (typeof x === 'undefined') {
				return 'Undefined';
			}
			if (typeof x === 'function' || typeof x === 'object') {
				return 'Object';
			}
			if (typeof x === 'number') {
				return 'Number';
			}
			if (typeof x === 'boolean') {
				return 'Boolean';
			}
			if (typeof x === 'string') {
				return 'String';
			}
		}
	};
	
	module.exports = ES5;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var toStr = Object.prototype.toString;
	
	var isPrimitive = __webpack_require__(19);
	
	var isCallable = __webpack_require__(20);
	
	// https://es5.github.io/#x8.12
	var ES5internalSlots = {
		'[[DefaultValue]]': function (O, hint) {
			var actualHint = hint || (toStr.call(O) === '[object Date]' ? String : Number);
	
			if (actualHint === String || actualHint === Number) {
				var methods = actualHint === String ? ['toString', 'valueOf'] : ['valueOf', 'toString'];
				var value, i;
				for (i = 0; i < methods.length; ++i) {
					if (isCallable(O[methods[i]])) {
						value = O[methods[i]]();
						if (isPrimitive(value)) {
							return value;
						}
					}
				}
				throw new TypeError('No default value');
			}
			throw new TypeError('invalid [[DefaultValue]] hint supplied');
		}
	};
	
	// https://es5.github.io/#x9
	module.exports = function ToPrimitive(input, PreferredType) {
		if (isPrimitive(input)) {
			return input;
		}
		return ES5internalSlots['[[DefaultValue]]'](input, PreferredType);
	};


/***/ },
/* 27 */
/***/ function(module, exports) {

	'use strict';
	
	var regexExec = RegExp.prototype.exec;
	var tryRegexExec = function tryRegexExec(value) {
		try {
			regexExec.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var regexClass = '[object RegExp]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
	
	module.exports = function isRegex(value) {
		if (typeof value !== 'object') { return false; }
		return hasToStringTag ? tryRegexExec(value) : toStr.call(value) === regexClass;
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var ES = __webpack_require__(11);
	var implementation = __webpack_require__(10);
	
	var tryCall = function (fn) {
		try {
			fn();
			return true;
		} catch (e) {
			return false;
		}
	};
	
	module.exports = function getPolyfill() {
		var implemented = ES.IsCallable(Array.from)
			&& tryCall(function () { Array.from({ 'length': -Infinity }); })
			&& !tryCall(function () { Array.from([], undefined); });
	
		return implemented ? Array.from : implementation;
	};


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var define = __webpack_require__(6);
	var getPolyfill = __webpack_require__(28);
	
	module.exports = function shimArrayFrom() {
		var polyfill = getPolyfill();
	
		define(Array, { 'from': polyfill }, {
			'from': function () {
				return Array.from !== polyfill;
			}
		});
	
		return polyfill;
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var define = __webpack_require__(6);
	var ES = __webpack_require__(11);
	
	var implementation = __webpack_require__(31);
	var getPolyfill = __webpack_require__(32);
	var polyfill = getPolyfill();
	var shim = __webpack_require__(33);
	
	var slice = Array.prototype.slice;
	
	/* eslint-disable no-unused-vars */
	var boundIncludesShim = function includes(array, searchElement) {
	/* eslint-enable no-unused-vars */
		ES.RequireObjectCoercible(array);
		return polyfill.apply(array, slice.call(arguments, 1));
	};
	define(boundIncludesShim, {
		implementation: implementation,
		getPolyfill: getPolyfill,
		shim: shim
	});
	
	module.exports = boundIncludesShim;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';
	
	var ES = __webpack_require__(11);
	var $isNaN = Number.isNaN || function (a) { return a !== a; };
	var $isFinite = Number.isFinite || function (n) { return typeof n === 'number' && global.isFinite(n); };
	var indexOf = Array.prototype.indexOf;
	
	module.exports = function includes(searchElement) {
		var fromIndex = arguments.length > 1 ? ES.ToInteger(arguments[1]) : 0;
		if (indexOf && !$isNaN(searchElement) && $isFinite(fromIndex) && typeof searchElement !== 'undefined') {
			return indexOf.apply(this, arguments) > -1;
		}
	
		var O = ES.ToObject(this);
		var length = ES.ToLength(O.length);
		if (length === 0) {
			return false;
		}
		var k = fromIndex >= 0 ? fromIndex : Math.max(0, length + fromIndex);
		while (k < length) {
			if (ES.SameValueZero(searchElement, O[k])) {
				return true;
			}
			k += 1;
		}
		return false;
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var implementation = __webpack_require__(31);
	
	module.exports = function getPolyfill() {
		return Array.prototype.includes || implementation;
	};


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var define = __webpack_require__(6);
	var getPolyfill = __webpack_require__(32);
	
	module.exports = function shimArrayPrototypeIncludes() {
		var polyfill = getPolyfill();
		if (Array.prototype.includes !== polyfill) {
			define(Array.prototype, { includes: polyfill });
		}
		return polyfill;
	};


/***/ },
/* 34 */
/***/ function(module, exports) {

	/*! http://mths.be/repeat v0.2.0 by @mathias */
	if (!String.prototype.repeat) {
		(function() {
			'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
			var defineProperty = (function() {
				// IE 8 only supports `Object.defineProperty` on DOM elements
				try {
					var object = {};
					var $defineProperty = Object.defineProperty;
					var result = $defineProperty(object, object, object) && $defineProperty;
				} catch(error) {}
				return result;
			}());
			var repeat = function(count) {
				if (this == null) {
					throw TypeError();
				}
				var string = String(this);
				// `ToInteger`
				var n = count ? Number(count) : 0;
				if (n != n) { // better `isNaN`
					n = 0;
				}
				// Account for out-of-bounds indices
				if (n < 0 || n == Infinity) {
					throw RangeError();
				}
				var result = '';
				while (n) {
					if (n % 2 == 1) {
						result += string;
					}
					if (n > 1) {
						string += string;
					}
					n >>= 1;
				}
				return result;
			};
			if (defineProperty) {
				defineProperty(String.prototype, 'repeat', {
					'value': repeat,
					'configurable': true,
					'writable': true
				});
			} else {
				String.prototype.repeat = repeat;
			}
		}());
	}


/***/ },
/* 35 */
/***/ function(module, exports) {

	/*! http://mths.be/startswith v0.2.0 by @mathias */
	if (!String.prototype.startsWith) {
		(function() {
			'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
			var defineProperty = (function() {
				// IE 8 only supports `Object.defineProperty` on DOM elements
				try {
					var object = {};
					var $defineProperty = Object.defineProperty;
					var result = $defineProperty(object, object, object) && $defineProperty;
				} catch(error) {}
				return result;
			}());
			var toString = {}.toString;
			var startsWith = function(search) {
				if (this == null) {
					throw TypeError();
				}
				var string = String(this);
				if (search && toString.call(search) == '[object RegExp]') {
					throw TypeError();
				}
				var stringLength = string.length;
				var searchString = String(search);
				var searchLength = searchString.length;
				var position = arguments.length > 1 ? arguments[1] : undefined;
				// `ToInteger`
				var pos = position ? Number(position) : 0;
				if (pos != pos) { // better `isNaN`
					pos = 0;
				}
				var start = Math.min(Math.max(pos, 0), stringLength);
				// Avoid the `indexOf` call if no match is possible
				if (searchLength + start > stringLength) {
					return false;
				}
				var index = -1;
				while (++index < searchLength) {
					if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
						return false;
					}
				}
				return true;
			};
			if (defineProperty) {
				defineProperty(String.prototype, 'startsWith', {
					'value': startsWith,
					'configurable': true,
					'writable': true
				});
			} else {
				String.prototype.startsWith = startsWith;
			}
		}());
	}


/***/ },
/* 36 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {function __assignFn(t) {
	    for (var s, i = 1, n = arguments.length; i < n; i++) {
	        s = arguments[i];
	        for (var p in s)
	            if (Object.prototype.hasOwnProperty.call(s, p))
	                t[p] = s[p];
	    }
	    return t;
	}
	function __extendsFn(d, b) {
	    for (var p in b)
	        if (b.hasOwnProperty(p))
	            d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}
	function __decorateFn(decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
	        r = Reflect.decorate(decorators, target, key, desc);
	    else
	        for (var i = decorators.length - 1; i >= 0; i--)
	            if (d = decorators[i])
	                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	}
	function __metadataFn(k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
	        return Reflect.metadata(k, v);
	}
	function __paramFn(paramIndex, decorator) {
	    return function (target, key) { decorator(target, key, paramIndex); };
	}
	function __awaiterFn(thisArg, _arguments, P, generator) {
	    return new (P || (P = Promise))(function (resolve, reject) {
	        function fulfilled(value) { try {
	            step(generator.next(value));
	        }
	        catch (e) {
	            reject(e);
	        } }
	        function rejected(value) { try {
	            step(generator.throw(value));
	        }
	        catch (e) {
	            reject(e);
	        } }
	        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
	        step((generator = generator.apply(thisArg, _arguments)).next());
	    });
	}
	// hook global helpers
	(function (__global) {
	    __global.__assign = (__global && __global.__assign) || Object.assign || __assignFn;
	    __global.__extends = (__global && __global.__extends) || __extendsFn;
	    __global.__decorate = (__global && __global.__decorate) || __decorateFn;
	    __global.__metadata = (__global && __global.__metadata) || __metadataFn;
	    __global.__param = (__global && __global.__param) || __paramFn;
	    __global.__awaiter = (__global && __global.__awaiter) || __awaiterFn;
	})(typeof window !== "undefined" ? window :
	    typeof WorkerGlobalScope !== "undefined" ? self :
	        typeof global !== "undefined" ? global :
	            Function("return this;")());
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var init_1 = __webpack_require__(38);
	var tag_1 = __webpack_require__(154);
	var common_1 = __webpack_require__(40);
	var groupby_api_1 = __webpack_require__(102);
	var riot = __webpack_require__(164);
	exports.CONFIGURATION_MASK = '{collection,area,language,pageSize,sort,fields}';
	exports.DEFAULT_CONFIG = { initialSearch: true };
	exports.DEFAULT_URL_CONFIG = { queryParam: 'q', searchUrl: 'search' };
	function initSearchandiser() {
	    return function configure(rawConfig) {
	        if (rawConfig === void 0) { rawConfig = {}; }
	        var config = applyDefaultConfig(rawConfig);
	        var flux = Object.assign(initCapacitor(config), groupby_api_1.Events);
	        var services = init_1.initServices(flux, config);
	        riot.mixin(tag_1.MixinFlux(flux, config, services));
	        Object.assign(configure, { flux: flux, config: config }, new Searchandiser()['__proto__']);
	    };
	}
	exports.initSearchandiser = initSearchandiser;
	function initCapacitor(config) {
	    var finalConfig = transformConfig(config);
	    return new groupby_api_1.FluxCapacitor(finalConfig.customerId, finalConfig, exports.CONFIGURATION_MASK);
	}
	exports.initCapacitor = initCapacitor;
	function applyDefaultConfig(rawConfig) {
	    var config = Object.assign({}, exports.DEFAULT_CONFIG, rawConfig);
	    config.url = Object.assign(exports.DEFAULT_URL_CONFIG, config.url);
	    return config;
	}
	exports.applyDefaultConfig = applyDefaultConfig;
	function transformConfig(config) {
	    var finalConfig = config;
	    if (config.pageSizes)
	        finalConfig.pageSize = config.pageSizes[0];
	    if (config.bridge) {
	        var bridgeConfig = {};
	        var headers = config.bridge.headers || {};
	        if (config.bridge.skipCache)
	            headers['Skip-Caching'] = true;
	        if (config.bridge.skipSemantish)
	            headers['Skip-Semantish'] = true;
	        bridgeConfig.headers = headers;
	        if (config.bridge.https)
	            bridgeConfig.https = true;
	        Object.assign(finalConfig.bridge, bridgeConfig);
	    }
	    if (common_1.checkNested(config, 'tags', 'sort', 'options')) {
	        finalConfig.sort = [config.tags.sort.options.map(function (val) { return val.value; })[0]];
	    }
	    return finalConfig;
	}
	exports.transformConfig = transformConfig;
	var Searchandiser = (function () {
	    function Searchandiser() {
	    }
	    Searchandiser.prototype.init = function () {
	        if (this.config.initialSearch)
	            this.search();
	    };
	    Searchandiser.prototype.attach = function (tagName, selectorOrOpts, options) {
	        var tag;
	        if (typeof selectorOrOpts === 'string') {
	            tag = this.cssAttach(tagName, selectorOrOpts, options);
	        }
	        else {
	            tag = this.simpleAttach(tagName, selectorOrOpts);
	        }
	        if (tag) {
	            return tag.length === 1 ? tag[0] : tag;
	        }
	        else {
	            return null;
	        }
	    };
	    Searchandiser.prototype.compile = function () {
	        riot.compile(function () { return null; });
	    };
	    Searchandiser.prototype.search = function (query) {
	        var _this = this;
	        return this.flux.search(query)
	            .then(function () { return _this.flux.emit(groupby_api_1.Events.PAGE_CHANGED, { pageNumber: 1, finalPage: _this.flux.page.finalPage }); });
	    };
	    Searchandiser.prototype.simpleAttach = function (tagName, options) {
	        if (options === void 0) { options = {}; }
	        return riot.mount(this.riotTagName(tagName), options);
	    };
	    Searchandiser.prototype.cssAttach = function (tagName, cssSelector, options) {
	        if (cssSelector === void 0) { cssSelector = "." + tagName; }
	        if (options === void 0) { options = {}; }
	        return riot.mount(cssSelector, this.riotTagName(tagName), options);
	    };
	    Searchandiser.prototype.riotTagName = function (tagName) {
	        return tagName.startsWith('gb-') ? tagName : "gb-" + tagName;
	    };
	    return Searchandiser;
	}());
	exports.Searchandiser = Searchandiser;


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var collections_1 = __webpack_require__(39);
	var filter_1 = __webpack_require__(148);
	var redirect_1 = __webpack_require__(149);
	var url_1 = __webpack_require__(150);
	function initServices(flux, config) {
	    var services = {};
	    services.collections = new collections_1.Collections(flux, config);
	    services.filter = new filter_1.Filter(flux, config);
	    services.redirect = new redirect_1.Redirect(flux);
	    services.url = new url_1.Url(flux, config);
	    startServices(services);
	    return services;
	}
	exports.initServices = initServices;
	function startServices(services) {
	    for (var service in services) {
	        if (services.hasOwnProperty(service)) {
	            services[service].init();
	        }
	    }
	}
	exports.startServices = startServices;


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(40);
	var groupby_api_1 = __webpack_require__(102);
	exports.COLLECTIONS_UPDATED_EVENT = 'collections_updated';
	var Collections = (function () {
	    function Collections(flux, config) {
	        this.flux = flux;
	        this.config = config;
	        this.counts = {};
	        this.collectionsConfig = common_1.getPath(config, 'tags.collections') || {};
	        this.fetchCounts = common_1.unless(this.collectionsConfig.counts, true);
	        var options = this.collectionsConfig.options || [];
	        this.isLabeled = options.length !== 0
	            && typeof options[0] === 'object';
	        this.collections = this.isLabeled
	            ? options.map(function (collection) { return collection.value; })
	            : options;
	    }
	    Collections.prototype.init = function () {
	        var _this = this;
	        this.flux.on(groupby_api_1.Events.QUERY_CHANGED, function (query) { return _this.updateCollectionCounts(query); });
	        this.flux.on(groupby_api_1.Events.RESULTS, function (results) { return _this.updateSelectedCollectionCount(results); });
	        this.updateCollectionCounts();
	    };
	    Collections.prototype.updateCollectionCounts = function (query) {
	        var _this = this;
	        if (query === void 0) { query = ''; }
	        if (this.fetchCounts) {
	            if (this.inProgress) {
	                this.inProgress.cancelled = true;
	            }
	            var searches = this.collections
	                .filter(function (collection) { return !_this.isSelected(collection); })
	                .map(function (collection) { return _this.flux.bridge
	                .search(Object.assign(_this.flux.query.raw, { query: query, collection: collection, refinements: [], pageSize: 0, fields: '' }))
	                .then(function (results) { return ({ results: results, collection: collection }); }); });
	            var promises_1 = this.inProgress = Promise.all(searches);
	            promises_1
	                .then(function (res) { return res.reduce(_this.extractCounts, {}); })
	                .then(function (counts) {
	                if (!promises_1.cancelled) {
	                    Object.assign(_this.counts, counts);
	                    _this.flux.emit(exports.COLLECTIONS_UPDATED_EVENT, _this.counts);
	                }
	            });
	        }
	    };
	    Collections.prototype.updateSelectedCollectionCount = function (res) {
	        Object.assign(this.counts, (_a = {}, _a[this.selectedCollection] = res.totalRecordCount, _a));
	        this.flux.emit(exports.COLLECTIONS_UPDATED_EVENT, this.counts);
	        var _a;
	    };
	    Collections.prototype.isSelected = function (collection) {
	        return collection === this.selectedCollection;
	    };
	    Object.defineProperty(Collections.prototype, "selectedCollection", {
	        get: function () {
	            return common_1.getPath(this.flux, 'query.raw.collection') || this.config.collection;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Collections.prototype.extractCounts = function (counts, _a) {
	        var results = _a.results, collection = _a.collection;
	        return Object.assign(counts, (_b = {}, _b[collection] = results.totalRecordCount, _b));
	        var _b;
	    };
	    return Collections;
	}());
	exports.Collections = Collections;


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var debounce = __webpack_require__(41);
	exports.debounce = debounce;
	var oget = __webpack_require__(43);
	var queryString = __webpack_require__(44);
	var filterObject = __webpack_require__(47);
	exports.LOCATION = {
	    href: function () { return window.location.href; },
	    setSearch: function (search) { return window.location.search = search; },
	    getSearch: function () { return window.location.search; },
	    pathname: function () { return window.location.pathname; },
	    replace: function (url) { return window.location.replace(url); },
	    assign: function (url) { return window.location.assign(url); }
	};
	function findSearchBox() {
	    return oget(findTag('gb-query'), '_tag.searchBox');
	}
	exports.findSearchBox = findSearchBox;
	function findTag(tagName) {
	    return document.querySelector(tagName)
	        || document.querySelector("[data-is=\"" + tagName + "\"]")
	        || document.querySelector("[riot-tag=\"" + tagName + "\"]");
	}
	exports.findTag = findTag;
	function toRefinement(ref, nav) {
	    return Object.assign({}, filterObject(ref, '{type,value,low,high}'), { navigationName: nav.name });
	}
	exports.toRefinement = toRefinement;
	function displayRefinement(ref) {
	    return ref.type === 'Value' ? ref.value : ref.low + " - " + ref.high;
	}
	exports.displayRefinement = displayRefinement;
	function checkNested(obj) {
	    var keys = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        keys[_i - 1] = arguments[_i];
	    }
	    return Array.prototype.slice.call(arguments, 1)
	        .reduce(function (res, arg) {
	        if (!obj || !obj.hasOwnProperty(arg))
	            return false;
	        obj = obj[arg];
	        return res;
	    }, true);
	}
	exports.checkNested = checkNested;
	function getParam(param) {
	    return queryString.parse(exports.LOCATION.getSearch())[param] || null;
	}
	exports.getParam = getParam;
	function unless(obj) {
	    var defaultObjs = [];
	    for (var _i = 1; _i < arguments.length; _i++) {
	        defaultObjs[_i - 1] = arguments[_i];
	    }
	    return obj !== undefined ? obj : unless.apply(void 0, [defaultObjs.splice(0, 1)[0]].concat(defaultObjs));
	}
	exports.unless = unless;
	function getPath(obj, path) {
	    if (path === void 0) { path = ''; }
	    return oget(obj, path);
	}
	exports.getPath = getPath;
	/**
	 * Example:
	 * ({x: 3, y: 4, h: 8}, {z: 'x', i: 'h'}) -> {z: 3, i: 8}
	 *
	 * N.B. It removes keys that do not appear in the mapping
	 */
	function remap(x, mapping) {
	    if (mapping) {
	        return Object.keys(mapping).reduce(function (acc, key) {
	            var value = getPath(x, mapping[key]);
	            if (value) {
	                return Object.assign(acc, (_a = {}, _a[key] = value, _a));
	            }
	            else {
	                return acc;
	            }
	            var _a;
	        }, {});
	    }
	    else {
	        return x;
	    }
	}
	exports.remap = remap;
	function checkBooleanAttr(attribute, opts) {
	    return typeof opts === 'object'
	        && attribute in opts
	        && opts[attribute] != 'false' // tslint:disable-line:triple-equals
	        && opts[attribute] !== false;
	}
	exports.checkBooleanAttr = checkBooleanAttr;


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * Module dependencies.
	 */
	
	var now = __webpack_require__(42);
	
	/**
	 * Returns a function, that, as long as it continues to be invoked, will not
	 * be triggered. The function will be called after it stops being called for
	 * N milliseconds. If `immediate` is passed, trigger the function on the
	 * leading edge, instead of the trailing.
	 *
	 * @source underscore.js
	 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
	 * @param {Function} function to wrap
	 * @param {Number} timeout in ms (`100`)
	 * @param {Boolean} whether to execute at the beginning (`false`)
	 * @api public
	 */
	
	module.exports = function debounce(func, wait, immediate){
	  var timeout, args, context, timestamp, result;
	  if (null == wait) wait = 100;
	
	  function later() {
	    var last = now() - timestamp;
	
	    if (last < wait && last > 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      if (!immediate) {
	        result = func.apply(context, args);
	        if (!timeout) context = args = null;
	      }
	    }
	  };
	
	  return function debounced() {
	    context = this;
	    args = arguments;
	    timestamp = now();
	    var callNow = immediate && !timeout;
	    if (!timeout) timeout = setTimeout(later, wait);
	    if (callNow) {
	      result = func.apply(context, args);
	      context = args = null;
	    }
	
	    return result;
	  };
	};


/***/ },
/* 42 */
/***/ function(module, exports) {

	module.exports = Date.now || now
	
	function now() {
	    return new Date().getTime()
	}


/***/ },
/* 43 */
/***/ function(module, exports) {

	'use strict';
	
	function oget (obj, path, def) {
	    var res = path
	    .replace(/\[/g, '.')
	    .replace(/\]/g, '')
	    .replace(/^\./, '')
	    .split('.')
	    .reduce(function (prev, curr) {
	        return prev && prev[curr]
	    }, obj);
	
	    return (res === undefined)
	      ? def
	      : res;
	}
	
	module.exports = oget;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(45);
	var objectAssign = __webpack_require__(46);
	
	function encode(value, opts) {
		if (opts.encode) {
			return opts.strict ? strictUriEncode(value) : encodeURIComponent(value);
		}
	
		return value;
	}
	
	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};
	
	exports.parse = function (str) {
		// Create an object with no prototype
		// https://github.com/sindresorhus/query-string/issues/47
		var ret = Object.create(null);
	
		if (typeof str !== 'string') {
			return ret;
		}
	
		str = str.trim().replace(/^(\?|#|&)/, '');
	
		if (!str) {
			return ret;
		}
	
		str.split('&').forEach(function (param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;
	
			key = decodeURIComponent(key);
	
			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);
	
			if (ret[key] === undefined) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}
		});
	
		return ret;
	};
	
	exports.stringify = function (obj, opts) {
		var defaults = {
			encode: true,
			strict: true
		};
	
		opts = objectAssign(defaults, opts);
	
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];
	
			if (val === undefined) {
				return '';
			}
	
			if (val === null) {
				return encode(key, opts);
			}
	
			if (Array.isArray(val)) {
				var result = [];
	
				val.slice().forEach(function (val2) {
					if (val2 === undefined) {
						return;
					}
	
					if (val2 === null) {
						result.push(encode(key, opts));
					} else {
						result.push(encode(key, opts) + '=' + encode(val2, opts));
					}
				});
	
				return result.join('&');
			}
	
			return encode(key, opts) + '=' + encode(val, opts);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ },
/* 46 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}
	
			// Detect buggy property enumeration order in older V8 versions.
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}
	
			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}
	
	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var typeOf = __webpack_require__(48);
	var filterKeys = __webpack_require__(54);
	var filterValues = __webpack_require__(95);
	var pick = __webpack_require__(100);
	var extend = __webpack_require__(101);
	
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var isBuffer = __webpack_require__(53);
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(49).Buffer))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer, global) {/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	/* eslint-disable no-proto */
	
	'use strict'
	
	var base64 = __webpack_require__(50)
	var ieee754 = __webpack_require__(51)
	var isArray = __webpack_require__(52)
	
	exports.Buffer = Buffer
	exports.SlowBuffer = SlowBuffer
	exports.INSPECT_MAX_BYTES = 50
	
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
	
	/*
	 * Export kMaxLength after typed array support is determined.
	 */
	exports.kMaxLength = kMaxLength()
	
	function typedArraySupport () {
	  try {
	    var arr = new Uint8Array(1)
	    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
	    return arr.foo() === 42 && // typed array instances can be augmented
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
	
	function createBuffer (that, length) {
	  if (kMaxLength() < length) {
	    throw new RangeError('Invalid typed array length')
	  }
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = new Uint8Array(length)
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    if (that === null) {
	      that = new Buffer(length)
	    }
	    that.length = length
	  }
	
	  return that
	}
	
	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */
	
	function Buffer (arg, encodingOrOffset, length) {
	  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
	    return new Buffer(arg, encodingOrOffset, length)
	  }
	
	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new Error(
	        'If encoding is specified then the first argument must be a string'
	      )
	    }
	    return allocUnsafe(this, arg)
	  }
	  return from(this, arg, encodingOrOffset, length)
	}
	
	Buffer.poolSize = 8192 // not used by this implementation
	
	// TODO: Legacy, not needed anymore. Remove in next major version.
	Buffer._augment = function (arr) {
	  arr.__proto__ = Buffer.prototype
	  return arr
	}
	
	function from (that, value, encodingOrOffset, length) {
	  if (typeof value === 'number') {
	    throw new TypeError('"value" argument must not be a number')
	  }
	
	  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
	    return fromArrayBuffer(that, value, encodingOrOffset, length)
	  }
	
	  if (typeof value === 'string') {
	    return fromString(that, value, encodingOrOffset)
	  }
	
	  return fromObject(that, value)
	}
	
	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(null, value, encodingOrOffset, length)
	}
	
	if (Buffer.TYPED_ARRAY_SUPPORT) {
	  Buffer.prototype.__proto__ = Uint8Array.prototype
	  Buffer.__proto__ = Uint8Array
	  if (typeof Symbol !== 'undefined' && Symbol.species &&
	      Buffer[Symbol.species] === Buffer) {
	    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	    Object.defineProperty(Buffer, Symbol.species, {
	      value: null,
	      configurable: true
	    })
	  }
	}
	
	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be a number')
	  } else if (size < 0) {
	    throw new RangeError('"size" argument must not be negative')
	  }
	}
	
	function alloc (that, size, fill, encoding) {
	  assertSize(size)
	  if (size <= 0) {
	    return createBuffer(that, size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(that, size).fill(fill, encoding)
	      : createBuffer(that, size).fill(fill)
	  }
	  return createBuffer(that, size)
	}
	
	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(null, size, fill, encoding)
	}
	
	function allocUnsafe (that, size) {
	  assertSize(size)
	  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
	  if (!Buffer.TYPED_ARRAY_SUPPORT) {
	    for (var i = 0; i < size; ++i) {
	      that[i] = 0
	    }
	  }
	  return that
	}
	
	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(null, size)
	}
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(null, size)
	}
	
	function fromString (that, string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8'
	  }
	
	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('"encoding" must be a valid string encoding')
	  }
	
	  var length = byteLength(string, encoding) | 0
	  that = createBuffer(that, length)
	
	  var actual = that.write(string, encoding)
	
	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    that = that.slice(0, actual)
	  }
	
	  return that
	}
	
	function fromArrayLike (that, array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0
	  that = createBuffer(that, length)
	  for (var i = 0; i < length; i += 1) {
	    that[i] = array[i] & 255
	  }
	  return that
	}
	
	function fromArrayBuffer (that, array, byteOffset, length) {
	  array.byteLength // this throws if `array` is not a valid ArrayBuffer
	
	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('\'offset\' is out of bounds')
	  }
	
	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('\'length\' is out of bounds')
	  }
	
	  if (byteOffset === undefined && length === undefined) {
	    array = new Uint8Array(array)
	  } else if (length === undefined) {
	    array = new Uint8Array(array, byteOffset)
	  } else {
	    array = new Uint8Array(array, byteOffset, length)
	  }
	
	  if (Buffer.TYPED_ARRAY_SUPPORT) {
	    // Return an augmented `Uint8Array` instance, for best performance
	    that = array
	    that.__proto__ = Buffer.prototype
	  } else {
	    // Fallback: Return an object instance of the Buffer class
	    that = fromArrayLike(that, array)
	  }
	  return that
	}
	
	function fromObject (that, obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0
	    that = createBuffer(that, len)
	
	    if (that.length === 0) {
	      return that
	    }
	
	    obj.copy(that, 0, 0, len)
	    return that
	  }
	
	  if (obj) {
	    if ((typeof ArrayBuffer !== 'undefined' &&
	        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
	      if (typeof obj.length !== 'number' || isnan(obj.length)) {
	        return createBuffer(that, 0)
	      }
	      return fromArrayLike(that, obj)
	    }
	
	    if (obj.type === 'Buffer' && isArray(obj.data)) {
	      return fromArrayLike(that, obj.data)
	    }
	  }
	
	  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
	}
	
	function checked (length) {
	  // Note: cannot use `length < kMaxLength()` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= kMaxLength()) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
	  }
	  return length | 0
	}
	
	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0
	  }
	  return Buffer.alloc(+length)
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
	
	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i]
	      y = b[i]
	      break
	    }
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
	    case 'latin1':
	    case 'binary':
	    case 'base64':
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
	  if (!isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }
	
	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }
	
	  var i
	  if (length === undefined) {
	    length = 0
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length
	    }
	  }
	
	  var buffer = Buffer.allocUnsafe(length)
	  var pos = 0
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i]
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos)
	    pos += buf.length
	  }
	  return buffer
	}
	
	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
	      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    string = '' + string
	  }
	
	  var len = string.length
	  if (len === 0) return 0
	
	  // Use a for loop to avoid recursion
	  var loweredCase = false
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	      case undefined:
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
	
	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.
	
	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }
	
	  if (end === undefined || end > this.length) {
	    end = this.length
	  }
	
	  if (end <= 0) {
	    return ''
	  }
	
	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0
	  start >>>= 0
	
	  if (end <= start) {
	    return ''
	  }
	
	  if (!encoding) encoding = 'utf8'
	
	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)
	
	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)
	
	      case 'ascii':
	        return asciiSlice(this, start, end)
	
	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)
	
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
	
	// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
	// Buffer instances.
	Buffer.prototype._isBuffer = true
	
	function swap (b, n, m) {
	  var i = b[n]
	  b[n] = b[m]
	  b[m] = i
	}
	
	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1)
	  }
	  return this
	}
	
	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3)
	    swap(this, i + 1, i + 2)
	  }
	  return this
	}
	
	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7)
	    swap(this, i + 1, i + 6)
	    swap(this, i + 2, i + 5)
	    swap(this, i + 3, i + 4)
	  }
	  return this
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
	
	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError('Argument must be a Buffer')
	  }
	
	  if (start === undefined) {
	    start = 0
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0
	  }
	  if (thisStart === undefined) {
	    thisStart = 0
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length
	  }
	
	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }
	
	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }
	
	  start >>>= 0
	  end >>>= 0
	  thisStart >>>= 0
	  thisEnd >>>= 0
	
	  if (this === target) return 0
	
	  var x = thisEnd - thisStart
	  var y = end - start
	  var len = Math.min(x, y)
	
	  var thisCopy = this.slice(thisStart, thisEnd)
	  var targetCopy = target.slice(start, end)
	
	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i]
	      y = targetCopy[i]
	      break
	    }
	  }
	
	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	}
	
	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1
	
	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset
	    byteOffset = 0
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000
	  }
	  byteOffset = +byteOffset  // Coerce to Number.
	  if (isNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1)
	  }
	
	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0
	    else return -1
	  }
	
	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding)
	  }
	
	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF // Search for a byte value [0-255]
	    if (Buffer.TYPED_ARRAY_SUPPORT &&
	        typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }
	
	  throw new TypeError('val must be string, number or Buffer')
	}
	
	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1
	  var arrLength = arr.length
	  var valLength = val.length
	
	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase()
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2
	      arrLength /= 2
	      valLength /= 2
	      byteOffset /= 2
	    }
	  }
	
	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }
	
	  var i
	  if (dir) {
	    var foundIndex = -1
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex
	        foundIndex = -1
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false
	          break
	        }
	      }
	      if (found) return i
	    }
	  }
	
	  return -1
	}
	
	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	}
	
	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	}
	
	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
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
	  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')
	
	  if (length > strLen / 2) {
	    length = strLen / 2
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16)
	    if (isNaN(parsed)) return i
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
	
	function latin1Write (buf, string, offset, length) {
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
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }
	
	  var remaining = this.length - offset
	  if (length === undefined || length > remaining) length = remaining
	
	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
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
	
	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)
	
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
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F)
	  }
	  return ret
	}
	
	function latin1Slice (buf, start, end) {
	  var ret = ''
	  end = Math.min(buf.length, end)
	
	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i])
	  }
	  return ret
	}
	
	function hexSlice (buf, start, end) {
	  var len = buf.length
	
	  if (!start || start < 0) start = 0
	  if (!end || end < 0 || end > len) end = len
	
	  var out = ''
	  for (var i = start; i < end; ++i) {
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
	    newBuf = this.subarray(start, end)
	    newBuf.__proto__ = Buffer.prototype
	  } else {
	    var sliceLen = end - start
	    newBuf = new Buffer(sliceLen, undefined)
	    for (var i = 0; i < sliceLen; ++i) {
	      newBuf[i] = this[i + start]
	    }
	  }
	
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
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}
	
	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value
	  offset = offset | 0
	  byteLength = byteLength | 0
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
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
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1
	    checkInt(this, value, offset, byteLength, maxBytes, 0)
	  }
	
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
	  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
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
	  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
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
	  var sub = 0
	  this[offset] = value & 0xFF
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1
	    }
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
	  var sub = 0
	  this[offset + i] = value & 0xFF
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1
	    }
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
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
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
	    for (i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
	    // ascending copy from start
	    for (i = 0; i < len; ++i) {
	      target[i + targetStart] = this[i + start]
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, start + len),
	      targetStart
	    )
	  }
	
	  return len
	}
	
	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start
	      start = 0
	      end = this.length
	    } else if (typeof end === 'string') {
	      encoding = end
	      end = this.length
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0)
	      if (code < 256) {
	        val = code
	      }
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255
	  }
	
	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }
	
	  if (end <= start) {
	    return this
	  }
	
	  start = start >>> 0
	  end = end === undefined ? this.length : end >>> 0
	
	  if (!val) val = 0
	
	  var i
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : utf8ToBytes(new Buffer(val, encoding).toString())
	    var len = bytes.length
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len]
	    }
	  }
	
	  return this
	}
	
	// HELPER FUNCTIONS
	// ================
	
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
	
	  for (var i = 0; i < length; ++i) {
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
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF)
	  }
	  return byteArray
	}
	
	function utf16leToBytes (str, units) {
	  var c, hi, lo
	  var byteArray = []
	  for (var i = 0; i < str.length; ++i) {
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
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i]
	  }
	  return i
	}
	
	function isnan (val) {
	  return val !== val // eslint-disable-line no-self-compare
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(49).Buffer, (function() { return this; }())))

/***/ },
/* 50 */
/***/ function(module, exports) {

	'use strict'
	
	exports.toByteArray = toByteArray
	exports.fromByteArray = fromByteArray
	
	var lookup = []
	var revLookup = []
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
	
	function init () {
	  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
	  for (var i = 0, len = code.length; i < len; ++i) {
	    lookup[i] = code[i]
	    revLookup[code.charCodeAt(i)] = i
	  }
	
	  revLookup['-'.charCodeAt(0)] = 62
	  revLookup['_'.charCodeAt(0)] = 63
	}
	
	init()
	
	function toByteArray (b64) {
	  var i, j, l, tmp, placeHolders, arr
	  var len = b64.length
	
	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }
	
	  // the number of equal signs (place holders)
	  // if there are two placeholders, than the two characters before it
	  // represent one byte
	  // if there is only one, then the three characters before it represent 2 bytes
	  // this is just a cheap hack to not do indexOf twice
	  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
	
	  // base64 is 4/3 + up to two characters of the original data
	  arr = new Arr(len * 3 / 4 - placeHolders)
	
	  // if there are placeholders, only get up to the last complete 4 chars
	  l = placeHolders > 0 ? len - 4 : len
	
	  var L = 0
	
	  for (i = 0, j = 0; i < l; i += 4, j += 3) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
	    arr[L++] = (tmp >> 16) & 0xFF
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  if (placeHolders === 2) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
	    arr[L++] = tmp & 0xFF
	  } else if (placeHolders === 1) {
	    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
	    arr[L++] = (tmp >> 8) & 0xFF
	    arr[L++] = tmp & 0xFF
	  }
	
	  return arr
	}
	
	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
	}
	
	function encodeChunk (uint8, start, end) {
	  var tmp
	  var output = []
	  for (var i = start; i < end; i += 3) {
	    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
	    output.push(tripletToBase64(tmp))
	  }
	  return output.join('')
	}
	
	function fromByteArray (uint8) {
	  var tmp
	  var len = uint8.length
	  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
	  var output = ''
	  var parts = []
	  var maxChunkLength = 16383 // must be multiple of 3
	
	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
	  }
	
	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1]
	    output += lookup[tmp >> 2]
	    output += lookup[(tmp << 4) & 0x3F]
	    output += '=='
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
	    output += lookup[tmp >> 10]
	    output += lookup[(tmp >> 4) & 0x3F]
	    output += lookup[(tmp << 2) & 0x3F]
	    output += '='
	  }
	
	  parts.push(output)
	
	  return parts.join('')
	}


/***/ },
/* 51 */
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
/* 52 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};


/***/ },
/* 53 */
/***/ function(module, exports) {

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	
	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	module.exports = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	}
	
	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}
	
	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}


/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var mm = __webpack_require__(55);
	
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * micromatch <https://github.com/jonschlinkert/micromatch>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var expand = __webpack_require__(56);
	var utils = __webpack_require__(57);
	
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * micromatch <https://github.com/jonschlinkert/micromatch>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var utils = __webpack_require__(57);
	var Glob = __webpack_require__(93);
	
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
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var win32 = process && process.platform === 'win32';
	var path = __webpack_require__(59);
	var fileRe = __webpack_require__(60);
	var utils = module.exports;
	
	/**
	 * Module dependencies
	 */
	
	utils.diff = __webpack_require__(61);
	utils.unique = __webpack_require__(63);
	utils.braces = __webpack_require__(64);
	utils.brackets = __webpack_require__(75);
	utils.extglob = __webpack_require__(77);
	utils.isExtglob = __webpack_require__(78);
	utils.isGlob = __webpack_require__(79);
	utils.typeOf = __webpack_require__(80);
	utils.normalize = __webpack_require__(81);
	utils.omit = __webpack_require__(82);
	utils.parseGlob = __webpack_require__(86);
	utils.cache = __webpack_require__(90);
	
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 58 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
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
	    var timeout = runTimeout(cleanUpNextTick);
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
	    runClearTimeout(timeout);
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
	        runTimeout(drainQueue);
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
/* 59 */
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 60 */
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
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * arr-diff <https://github.com/jonschlinkert/arr-diff>
	 *
	 * Copyright (c) 2014 Jon Schlinkert, contributors.
	 * Licensed under the MIT License
	 */
	
	'use strict';
	
	var flatten = __webpack_require__(62);
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
/* 62 */
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
/* 63 */
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
/* 64 */
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
	
	var expand = __webpack_require__(65);
	var repeat = __webpack_require__(73);
	var tokens = __webpack_require__(74);
	
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * expand-range <https://github.com/jonschlinkert/expand-range>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT license.
	 */
	
	'use strict';
	
	var fill = __webpack_require__(66);
	
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
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * fill-range <https://github.com/jonschlinkert/fill-range>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var isObject = __webpack_require__(67);
	var isNumber = __webpack_require__(68);
	var randomize = __webpack_require__(70);
	var repeatStr = __webpack_require__(72);
	var repeat = __webpack_require__(73);
	
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
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * isobject <https://github.com/jonschlinkert/isobject>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var isArray = __webpack_require__(52);
	
	module.exports = function isObject(val) {
	  return val != null && typeof val === 'object' && isArray(val) === false;
	};


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * is-number <https://github.com/jonschlinkert/is-number>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var typeOf = __webpack_require__(69);
	
	module.exports = function isNumber(num) {
	  var type = typeOf(num);
	  if (type !== 'number' && type !== 'string') {
	    return false;
	  }
	  var n = +num;
	  return (n - n + 1) >= 0 && num !== '';
	};


/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var isBuffer = __webpack_require__(53);
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(49).Buffer))

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * randomatic <https://github.com/jonschlinkert/randomatic>
	 *
	 * This was originally inspired by <http://stackoverflow.com/a/10727155/1267639>
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License (MIT)
	 */
	
	'use strict';
	
	var isNumber = __webpack_require__(68);
	var typeOf = __webpack_require__(71);
	
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
/* 71 */
69,
/* 72 */
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
/* 73 */
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
/* 74 */
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
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * expand-brackets <https://github.com/jonschlinkert/expand-brackets>
	 *
	 * Copyright (c) 2015 Jon Schlinkert.
	 * Licensed under the MIT license.
	 */
	
	'use strict';
	
	var isPosixBracket = __webpack_require__(76);
	
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
/* 76 */
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
/* 77 */
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
	
	var isExtglob = __webpack_require__(78);
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
/* 78 */
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
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * is-glob <https://github.com/jonschlinkert/is-glob>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	var isExtglob = __webpack_require__(78);
	
	module.exports = function isGlob(str) {
	  return typeof str === 'string'
	    && (/[*!?{}(|)[\]]/.test(str)
	     || isExtglob(str));
	};

/***/ },
/* 80 */
69,
/* 81 */
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
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * object.omit <https://github.com/jonschlinkert/object.omit>
	 *
	 * Copyright (c) 2014-2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var isObject = __webpack_require__(83);
	var forOwn = __webpack_require__(84);
	
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
/* 83 */
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
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * for-own <https://github.com/jonschlinkert/for-own>
	 *
	 * Copyright (c) 2014-2016, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var forIn = __webpack_require__(85);
	var hasOwn = Object.prototype.hasOwnProperty;
	
	module.exports = function forOwn(o, fn, thisArg) {
	  forIn(o, function(val, key) {
	    if (hasOwn.call(o, key)) {
	      return fn.call(thisArg, o[key], key, o);
	    }
	  });
	};


/***/ },
/* 85 */
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
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * parse-glob <https://github.com/jonschlinkert/parse-glob>
	 *
	 * Copyright (c) 2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var isGlob = __webpack_require__(79);
	var findBase = __webpack_require__(87);
	var extglob = __webpack_require__(78);
	var dotfile = __webpack_require__(89);
	
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
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * glob-base <https://github.com/jonschlinkert/glob-base>
	 *
	 * Copyright (c) 2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var path = __webpack_require__(59);
	var parent = __webpack_require__(88);
	var isGlob = __webpack_require__(79);
	
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
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var path = __webpack_require__(59);
	var isglob = __webpack_require__(79);
	
	module.exports = function globParent(str) {
		str += 'a'; // preserves full path in case of trailing path separator
		do {str = path.dirname(str)} while (isglob(str));
		return str;
	};


/***/ },
/* 89 */
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
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * regex-cache <https://github.com/jonschlinkert/regex-cache>
	 *
	 * Copyright (c) 2015 Jon Schlinkert.
	 * Licensed under the MIT license.
	 */
	
	'use strict';
	
	var isPrimitive = __webpack_require__(91);
	var equal = __webpack_require__(92);
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
/* 91 */
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
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * is-equal-shallow <https://github.com/jonschlinkert/is-equal-shallow>
	 *
	 * Copyright (c) 2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	'use strict';
	
	var isPrimitive = __webpack_require__(91);
	
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
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var chars = __webpack_require__(94);
	var utils = __webpack_require__(57);
	
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
/* 94 */
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
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * filter-values <https://github.com/jonschlinkert/filter-values>
	 *
	 * Copyright (c) 2015, Jon Schlinkert.
	 * Licensed under the MIT License.
	 */
	
	var forOwn = __webpack_require__(84);
	var matcher = __webpack_require__(96);
	
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
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * is-match <https://github.com/jonschlinkert/is-match>
	 *
	 * Copyright (c) 2015-2016 Jon Schlinkert.
	 * Licensed under the MIT license.
	 */
	
	'use strict';
	
	var deepEqual = __webpack_require__(97);
	var isObject = __webpack_require__(83);
	var isGlob = __webpack_require__(79);
	var mm = __webpack_require__(55);
	
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
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(98);
	var isArguments = __webpack_require__(99);
	
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
/* 98 */
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
/* 99 */
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
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * object.pick <https://github.com/jonschlinkert/object.pick>
	 *
	 * Copyright (c) 2014-2015 Jon Schlinkert, contributors.
	 * Licensed under the MIT License
	 */
	
	'use strict';
	
	var isObject = __webpack_require__(67);
	
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
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var isObject = __webpack_require__(83);
	
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
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(103);


/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__webpack_require__(104);
	__export(__webpack_require__(116));
	__export(__webpack_require__(123));
	__export(__webpack_require__(143));
	__export(__webpack_require__(117));
	__export(__webpack_require__(147));


/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(105).shim();
	__webpack_require__(109).shim();
	__webpack_require__(113).polyfill();
	__webpack_require__(114).polyfill();


/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var define = __webpack_require__(6);
	var ES = __webpack_require__(11);
	
	var implementation = __webpack_require__(106);
	var getPolyfill = __webpack_require__(107);
	var shim = __webpack_require__(108);
	
	var slice = Array.prototype.slice;
	
	var boundFindShim = function find(array, predicate) {
		ES.RequireObjectCoercible(array);
		return implementation.apply(array, predicate);
	};
	
	define(boundFindShim, {
		implementation: implementation,
		getPolyfill: getPolyfill,
		shim: shim
	});
	
	module.exports = boundFindShim;


/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// Array.prototype.find - MIT License (c) 2013 Paul Miller <http://paulmillr.com>
	// For all details and docs: https://github.com/paulmillr/array.prototype.find
	'use strict';
	var ES = __webpack_require__(11);
	
	module.exports = function find(predicate) {
		var list = ES.ToObject(this);
		var length = ES.ToInteger(ES.ToLength(list.length));
		if (!ES.IsCallable(predicate)) {
			throw new TypeError('Array#find: predicate must be a function');
		}
		if (length === 0) return undefined;
		var thisArg = arguments[1];
		for (var i = 0, value; i < length; i++) {
			value = list[i];
			if (ES.Call(predicate, thisArg, [value, i, list])) return value;
		}
		return undefined;
	};


/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function getPolyfill() {
		// Detect if an implementation exists
		// Detect early implementations which skipped holes in sparse arrays
		var implemented = Array.prototype.find && [, 1].find(function (item, index) {
			return index === 0;
		});
	
		return implemented ? Array.prototype.find : __webpack_require__(106);
	};


/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var define = __webpack_require__(6);
	var getPolyfill = __webpack_require__(107);
	
	module.exports = function shimArrayPrototypeFind() {
		var polyfill = getPolyfill();
	
		define(Array.prototype, { find: polyfill }, {
			find: function () {
				return Array.prototype.find !== polyfill;
			}
		});
	
		return polyfill;
	};


/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var define = __webpack_require__(6);
	var ES = __webpack_require__(11);
	
	var implementation = __webpack_require__(110);
	var getPolyfill = __webpack_require__(111);
	var shim = __webpack_require__(112);
	
	var slice = Array.prototype.slice;
	
	var boundShim = function findIndex(array, predicate) {
		ES.RequireObjectCoercible(array);
		return implementation.apply(array, predicate);
	};
	
	define(boundShim, {
		implementation: implementation,
		getPolyfill: getPolyfill,
		shim: shim
	});
	
	module.exports = boundShim;


/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	// Array.prototype.findIndex - MIT License (c) 2013 Paul Miller <http://paulmillr.com>
	// For all details and docs: <https://github.com/paulmillr/Array.prototype.findIndex>
	'use strict';
	var ES = __webpack_require__(11);
	
	module.exports = function findIndex(predicate) {
		var list = ES.ToObject(this);
		var length = ES.ToLength(ES.ToLength(list.length));
		if (!ES.IsCallable(predicate)) {
			throw new TypeError('Array#findIndex: predicate must be a function');
		}
		if (length === 0) return -1;
		var thisArg = arguments[1];
		for (var i = 0, value; i < length; i++) {
			value = list[i];
			if (ES.Call(predicate, thisArg, [value, i, list])) return i;
		}
		return -1;
	};


/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function getPolyfill() {
		// Detect if an implementation exists
		// Detect early implementations which skipped holes in sparse arrays
		var implemented = Array.prototype.findIndex && ([, 1].findIndex(function (item, idx) {
			return idx === 0;
		}) === 0);
	
	
		return implemented ? Array.prototype.findIndex : __webpack_require__(110);
	};


/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var define = __webpack_require__(6);
	var getPolyfill = __webpack_require__(111);
	
	module.exports = function shimArrayPrototypeFindIndex() {
		var polyfill = getPolyfill();
	
		define(Array.prototype, { findIndex: polyfill }, {
			findIndex: function () {
				return Array.prototype.findIndex !== polyfill;
			}
		});
	
		return polyfill;
	};


/***/ },
/* 113 */
/***/ function(module, exports) {

	/**
	 * Code refactored from Mozilla Developer Network:
	 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
	 */
	
	'use strict';
	
	function assign(target, firstSource) {
	  if (target === undefined || target === null) {
	    throw new TypeError('Cannot convert first argument to object');
	  }
	
	  var to = Object(target);
	  for (var i = 1; i < arguments.length; i++) {
	    var nextSource = arguments[i];
	    if (nextSource === undefined || nextSource === null) {
	      continue;
	    }
	
	    var keysArray = Object.keys(Object(nextSource));
	    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
	      var nextKey = keysArray[nextIndex];
	      var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
	      if (desc !== undefined && desc.enumerable) {
	        to[nextKey] = nextSource[nextKey];
	      }
	    }
	  }
	  return to;
	}
	
	function polyfill() {
	  if (!Object.assign) {
	    Object.defineProperty(Object, 'assign', {
	      enumerable: false,
	      configurable: true,
	      writable: true,
	      value: assign
	    });
	  }
	}
	
	module.exports = {
	  assign: assign,
	  polyfill: polyfill
	};


/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	var require;/* WEBPACK VAR INJECTION */(function(process, global) {/*!
	 * @overview es6-promise - a tiny implementation of Promises/A+.
	 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
	 * @license   Licensed under MIT license
	 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
	 * @version   3.3.1
	 */
	
	(function (global, factory) {
	     true ? module.exports = factory() :
	    typeof define === 'function' && define.amd ? define(factory) :
	    (global.ES6Promise = factory());
	}(this, (function () { 'use strict';
	
	function objectOrFunction(x) {
	  return typeof x === 'function' || typeof x === 'object' && x !== null;
	}
	
	function isFunction(x) {
	  return typeof x === 'function';
	}
	
	var _isArray = undefined;
	if (!Array.isArray) {
	  _isArray = function (x) {
	    return Object.prototype.toString.call(x) === '[object Array]';
	  };
	} else {
	  _isArray = Array.isArray;
	}
	
	var isArray = _isArray;
	
	var len = 0;
	var vertxNext = undefined;
	var customSchedulerFn = undefined;
	
	var asap = function asap(callback, arg) {
	  queue[len] = callback;
	  queue[len + 1] = arg;
	  len += 2;
	  if (len === 2) {
	    // If len is 2, that means that we need to schedule an async flush.
	    // If additional callbacks are queued before the queue is flushed, they
	    // will be processed by this flush that we are scheduling.
	    if (customSchedulerFn) {
	      customSchedulerFn(flush);
	    } else {
	      scheduleFlush();
	    }
	  }
	};
	
	function setScheduler(scheduleFn) {
	  customSchedulerFn = scheduleFn;
	}
	
	function setAsap(asapFn) {
	  asap = asapFn;
	}
	
	var browserWindow = typeof window !== 'undefined' ? window : undefined;
	var browserGlobal = browserWindow || {};
	var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
	var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && ({}).toString.call(process) === '[object process]';
	
	// test for web worker but not in IE10
	var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';
	
	// node
	function useNextTick() {
	  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
	  // see https://github.com/cujojs/when/issues/410 for details
	  return function () {
	    return process.nextTick(flush);
	  };
	}
	
	// vertx
	function useVertxTimer() {
	  return function () {
	    vertxNext(flush);
	  };
	}
	
	function useMutationObserver() {
	  var iterations = 0;
	  var observer = new BrowserMutationObserver(flush);
	  var node = document.createTextNode('');
	  observer.observe(node, { characterData: true });
	
	  return function () {
	    node.data = iterations = ++iterations % 2;
	  };
	}
	
	// web worker
	function useMessageChannel() {
	  var channel = new MessageChannel();
	  channel.port1.onmessage = flush;
	  return function () {
	    return channel.port2.postMessage(0);
	  };
	}
	
	function useSetTimeout() {
	  // Store setTimeout reference so es6-promise will be unaffected by
	  // other code modifying setTimeout (like sinon.useFakeTimers())
	  var globalSetTimeout = setTimeout;
	  return function () {
	    return globalSetTimeout(flush, 1);
	  };
	}
	
	var queue = new Array(1000);
	function flush() {
	  for (var i = 0; i < len; i += 2) {
	    var callback = queue[i];
	    var arg = queue[i + 1];
	
	    callback(arg);
	
	    queue[i] = undefined;
	    queue[i + 1] = undefined;
	  }
	
	  len = 0;
	}
	
	function attemptVertx() {
	  try {
	    var r = require;
	    var vertx = __webpack_require__(115);
	    vertxNext = vertx.runOnLoop || vertx.runOnContext;
	    return useVertxTimer();
	  } catch (e) {
	    return useSetTimeout();
	  }
	}
	
	var scheduleFlush = undefined;
	// Decide what async method to use to triggering processing of queued callbacks:
	if (isNode) {
	  scheduleFlush = useNextTick();
	} else if (BrowserMutationObserver) {
	  scheduleFlush = useMutationObserver();
	} else if (isWorker) {
	  scheduleFlush = useMessageChannel();
	} else if (browserWindow === undefined && "function" === 'function') {
	  scheduleFlush = attemptVertx();
	} else {
	  scheduleFlush = useSetTimeout();
	}
	
	function then(onFulfillment, onRejection) {
	  var _arguments = arguments;
	
	  var parent = this;
	
	  var child = new this.constructor(noop);
	
	  if (child[PROMISE_ID] === undefined) {
	    makePromise(child);
	  }
	
	  var _state = parent._state;
	
	  if (_state) {
	    (function () {
	      var callback = _arguments[_state - 1];
	      asap(function () {
	        return invokeCallback(_state, child, callback, parent._result);
	      });
	    })();
	  } else {
	    subscribe(parent, child, onFulfillment, onRejection);
	  }
	
	  return child;
	}
	
	/**
	  `Promise.resolve` returns a promise that will become resolved with the
	  passed `value`. It is shorthand for the following:
	
	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    resolve(1);
	  });
	
	  promise.then(function(value){
	    // value === 1
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  let promise = Promise.resolve(1);
	
	  promise.then(function(value){
	    // value === 1
	  });
	  ```
	
	  @method resolve
	  @static
	  @param {Any} value value that the returned promise will be resolved with
	  Useful for tooling.
	  @return {Promise} a promise that will become fulfilled with the given
	  `value`
	*/
	function resolve(object) {
	  /*jshint validthis:true */
	  var Constructor = this;
	
	  if (object && typeof object === 'object' && object.constructor === Constructor) {
	    return object;
	  }
	
	  var promise = new Constructor(noop);
	  _resolve(promise, object);
	  return promise;
	}
	
	var PROMISE_ID = Math.random().toString(36).substring(16);
	
	function noop() {}
	
	var PENDING = void 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	
	var GET_THEN_ERROR = new ErrorObject();
	
	function selfFulfillment() {
	  return new TypeError("You cannot resolve a promise with itself");
	}
	
	function cannotReturnOwn() {
	  return new TypeError('A promises callback cannot return that same promise.');
	}
	
	function getThen(promise) {
	  try {
	    return promise.then;
	  } catch (error) {
	    GET_THEN_ERROR.error = error;
	    return GET_THEN_ERROR;
	  }
	}
	
	function tryThen(then, value, fulfillmentHandler, rejectionHandler) {
	  try {
	    then.call(value, fulfillmentHandler, rejectionHandler);
	  } catch (e) {
	    return e;
	  }
	}
	
	function handleForeignThenable(promise, thenable, then) {
	  asap(function (promise) {
	    var sealed = false;
	    var error = tryThen(then, thenable, function (value) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	      if (thenable !== value) {
	        _resolve(promise, value);
	      } else {
	        fulfill(promise, value);
	      }
	    }, function (reason) {
	      if (sealed) {
	        return;
	      }
	      sealed = true;
	
	      _reject(promise, reason);
	    }, 'Settle: ' + (promise._label || ' unknown promise'));
	
	    if (!sealed && error) {
	      sealed = true;
	      _reject(promise, error);
	    }
	  }, promise);
	}
	
	function handleOwnThenable(promise, thenable) {
	  if (thenable._state === FULFILLED) {
	    fulfill(promise, thenable._result);
	  } else if (thenable._state === REJECTED) {
	    _reject(promise, thenable._result);
	  } else {
	    subscribe(thenable, undefined, function (value) {
	      return _resolve(promise, value);
	    }, function (reason) {
	      return _reject(promise, reason);
	    });
	  }
	}
	
	function handleMaybeThenable(promise, maybeThenable, then$$) {
	  if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
	    handleOwnThenable(promise, maybeThenable);
	  } else {
	    if (then$$ === GET_THEN_ERROR) {
	      _reject(promise, GET_THEN_ERROR.error);
	    } else if (then$$ === undefined) {
	      fulfill(promise, maybeThenable);
	    } else if (isFunction(then$$)) {
	      handleForeignThenable(promise, maybeThenable, then$$);
	    } else {
	      fulfill(promise, maybeThenable);
	    }
	  }
	}
	
	function _resolve(promise, value) {
	  if (promise === value) {
	    _reject(promise, selfFulfillment());
	  } else if (objectOrFunction(value)) {
	    handleMaybeThenable(promise, value, getThen(value));
	  } else {
	    fulfill(promise, value);
	  }
	}
	
	function publishRejection(promise) {
	  if (promise._onerror) {
	    promise._onerror(promise._result);
	  }
	
	  publish(promise);
	}
	
	function fulfill(promise, value) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	
	  promise._result = value;
	  promise._state = FULFILLED;
	
	  if (promise._subscribers.length !== 0) {
	    asap(publish, promise);
	  }
	}
	
	function _reject(promise, reason) {
	  if (promise._state !== PENDING) {
	    return;
	  }
	  promise._state = REJECTED;
	  promise._result = reason;
	
	  asap(publishRejection, promise);
	}
	
	function subscribe(parent, child, onFulfillment, onRejection) {
	  var _subscribers = parent._subscribers;
	  var length = _subscribers.length;
	
	  parent._onerror = null;
	
	  _subscribers[length] = child;
	  _subscribers[length + FULFILLED] = onFulfillment;
	  _subscribers[length + REJECTED] = onRejection;
	
	  if (length === 0 && parent._state) {
	    asap(publish, parent);
	  }
	}
	
	function publish(promise) {
	  var subscribers = promise._subscribers;
	  var settled = promise._state;
	
	  if (subscribers.length === 0) {
	    return;
	  }
	
	  var child = undefined,
	      callback = undefined,
	      detail = promise._result;
	
	  for (var i = 0; i < subscribers.length; i += 3) {
	    child = subscribers[i];
	    callback = subscribers[i + settled];
	
	    if (child) {
	      invokeCallback(settled, child, callback, detail);
	    } else {
	      callback(detail);
	    }
	  }
	
	  promise._subscribers.length = 0;
	}
	
	function ErrorObject() {
	  this.error = null;
	}
	
	var TRY_CATCH_ERROR = new ErrorObject();
	
	function tryCatch(callback, detail) {
	  try {
	    return callback(detail);
	  } catch (e) {
	    TRY_CATCH_ERROR.error = e;
	    return TRY_CATCH_ERROR;
	  }
	}
	
	function invokeCallback(settled, promise, callback, detail) {
	  var hasCallback = isFunction(callback),
	      value = undefined,
	      error = undefined,
	      succeeded = undefined,
	      failed = undefined;
	
	  if (hasCallback) {
	    value = tryCatch(callback, detail);
	
	    if (value === TRY_CATCH_ERROR) {
	      failed = true;
	      error = value.error;
	      value = null;
	    } else {
	      succeeded = true;
	    }
	
	    if (promise === value) {
	      _reject(promise, cannotReturnOwn());
	      return;
	    }
	  } else {
	    value = detail;
	    succeeded = true;
	  }
	
	  if (promise._state !== PENDING) {
	    // noop
	  } else if (hasCallback && succeeded) {
	      _resolve(promise, value);
	    } else if (failed) {
	      _reject(promise, error);
	    } else if (settled === FULFILLED) {
	      fulfill(promise, value);
	    } else if (settled === REJECTED) {
	      _reject(promise, value);
	    }
	}
	
	function initializePromise(promise, resolver) {
	  try {
	    resolver(function resolvePromise(value) {
	      _resolve(promise, value);
	    }, function rejectPromise(reason) {
	      _reject(promise, reason);
	    });
	  } catch (e) {
	    _reject(promise, e);
	  }
	}
	
	var id = 0;
	function nextId() {
	  return id++;
	}
	
	function makePromise(promise) {
	  promise[PROMISE_ID] = id++;
	  promise._state = undefined;
	  promise._result = undefined;
	  promise._subscribers = [];
	}
	
	function Enumerator(Constructor, input) {
	  this._instanceConstructor = Constructor;
	  this.promise = new Constructor(noop);
	
	  if (!this.promise[PROMISE_ID]) {
	    makePromise(this.promise);
	  }
	
	  if (isArray(input)) {
	    this._input = input;
	    this.length = input.length;
	    this._remaining = input.length;
	
	    this._result = new Array(this.length);
	
	    if (this.length === 0) {
	      fulfill(this.promise, this._result);
	    } else {
	      this.length = this.length || 0;
	      this._enumerate();
	      if (this._remaining === 0) {
	        fulfill(this.promise, this._result);
	      }
	    }
	  } else {
	    _reject(this.promise, validationError());
	  }
	}
	
	function validationError() {
	  return new Error('Array Methods must be provided an Array');
	};
	
	Enumerator.prototype._enumerate = function () {
	  var length = this.length;
	  var _input = this._input;
	
	  for (var i = 0; this._state === PENDING && i < length; i++) {
	    this._eachEntry(_input[i], i);
	  }
	};
	
	Enumerator.prototype._eachEntry = function (entry, i) {
	  var c = this._instanceConstructor;
	  var resolve$$ = c.resolve;
	
	  if (resolve$$ === resolve) {
	    var _then = getThen(entry);
	
	    if (_then === then && entry._state !== PENDING) {
	      this._settledAt(entry._state, i, entry._result);
	    } else if (typeof _then !== 'function') {
	      this._remaining--;
	      this._result[i] = entry;
	    } else if (c === Promise) {
	      var promise = new c(noop);
	      handleMaybeThenable(promise, entry, _then);
	      this._willSettleAt(promise, i);
	    } else {
	      this._willSettleAt(new c(function (resolve$$) {
	        return resolve$$(entry);
	      }), i);
	    }
	  } else {
	    this._willSettleAt(resolve$$(entry), i);
	  }
	};
	
	Enumerator.prototype._settledAt = function (state, i, value) {
	  var promise = this.promise;
	
	  if (promise._state === PENDING) {
	    this._remaining--;
	
	    if (state === REJECTED) {
	      _reject(promise, value);
	    } else {
	      this._result[i] = value;
	    }
	  }
	
	  if (this._remaining === 0) {
	    fulfill(promise, this._result);
	  }
	};
	
	Enumerator.prototype._willSettleAt = function (promise, i) {
	  var enumerator = this;
	
	  subscribe(promise, undefined, function (value) {
	    return enumerator._settledAt(FULFILLED, i, value);
	  }, function (reason) {
	    return enumerator._settledAt(REJECTED, i, reason);
	  });
	};
	
	/**
	  `Promise.all` accepts an array of promises, and returns a new promise which
	  is fulfilled with an array of fulfillment values for the passed promises, or
	  rejected with the reason of the first passed promise to be rejected. It casts all
	  elements of the passed iterable to promises as it runs this algorithm.
	
	  Example:
	
	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = resolve(2);
	  let promise3 = resolve(3);
	  let promises = [ promise1, promise2, promise3 ];
	
	  Promise.all(promises).then(function(array){
	    // The array here would be [ 1, 2, 3 ];
	  });
	  ```
	
	  If any of the `promises` given to `all` are rejected, the first promise
	  that is rejected will be given as an argument to the returned promises's
	  rejection handler. For example:
	
	  Example:
	
	  ```javascript
	  let promise1 = resolve(1);
	  let promise2 = reject(new Error("2"));
	  let promise3 = reject(new Error("3"));
	  let promises = [ promise1, promise2, promise3 ];
	
	  Promise.all(promises).then(function(array){
	    // Code here never runs because there are rejected promises!
	  }, function(error) {
	    // error.message === "2"
	  });
	  ```
	
	  @method all
	  @static
	  @param {Array} entries array of promises
	  @param {String} label optional string for labeling the promise.
	  Useful for tooling.
	  @return {Promise} promise that is fulfilled when all `promises` have been
	  fulfilled, or rejected if any of them become rejected.
	  @static
	*/
	function all(entries) {
	  return new Enumerator(this, entries).promise;
	}
	
	/**
	  `Promise.race` returns a new promise which is settled in the same way as the
	  first passed promise to settle.
	
	  Example:
	
	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });
	
	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 2');
	    }, 100);
	  });
	
	  Promise.race([promise1, promise2]).then(function(result){
	    // result === 'promise 2' because it was resolved before promise1
	    // was resolved.
	  });
	  ```
	
	  `Promise.race` is deterministic in that only the state of the first
	  settled promise matters. For example, even if other promises given to the
	  `promises` array argument are resolved, but the first settled promise has
	  become rejected before the other promises became fulfilled, the returned
	  promise will become rejected:
	
	  ```javascript
	  let promise1 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      resolve('promise 1');
	    }, 200);
	  });
	
	  let promise2 = new Promise(function(resolve, reject){
	    setTimeout(function(){
	      reject(new Error('promise 2'));
	    }, 100);
	  });
	
	  Promise.race([promise1, promise2]).then(function(result){
	    // Code here never runs
	  }, function(reason){
	    // reason.message === 'promise 2' because promise 2 became rejected before
	    // promise 1 became fulfilled
	  });
	  ```
	
	  An example real-world use case is implementing timeouts:
	
	  ```javascript
	  Promise.race([ajax('foo.json'), timeout(5000)])
	  ```
	
	  @method race
	  @static
	  @param {Array} promises array of promises to observe
	  Useful for tooling.
	  @return {Promise} a promise which settles in the same way as the first passed
	  promise to settle.
	*/
	function race(entries) {
	  /*jshint validthis:true */
	  var Constructor = this;
	
	  if (!isArray(entries)) {
	    return new Constructor(function (_, reject) {
	      return reject(new TypeError('You must pass an array to race.'));
	    });
	  } else {
	    return new Constructor(function (resolve, reject) {
	      var length = entries.length;
	      for (var i = 0; i < length; i++) {
	        Constructor.resolve(entries[i]).then(resolve, reject);
	      }
	    });
	  }
	}
	
	/**
	  `Promise.reject` returns a promise rejected with the passed `reason`.
	  It is shorthand for the following:
	
	  ```javascript
	  let promise = new Promise(function(resolve, reject){
	    reject(new Error('WHOOPS'));
	  });
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  Instead of writing the above, your code now simply becomes the following:
	
	  ```javascript
	  let promise = Promise.reject(new Error('WHOOPS'));
	
	  promise.then(function(value){
	    // Code here doesn't run because the promise is rejected!
	  }, function(reason){
	    // reason.message === 'WHOOPS'
	  });
	  ```
	
	  @method reject
	  @static
	  @param {Any} reason value that the returned promise will be rejected with.
	  Useful for tooling.
	  @return {Promise} a promise rejected with the given `reason`.
	*/
	function reject(reason) {
	  /*jshint validthis:true */
	  var Constructor = this;
	  var promise = new Constructor(noop);
	  _reject(promise, reason);
	  return promise;
	}
	
	function needsResolver() {
	  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
	}
	
	function needsNew() {
	  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
	}
	
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
	  let promise = new Promise(function(resolve, reject) {
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
	      let xhr = new XMLHttpRequest();
	
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
	function Promise(resolver) {
	  this[PROMISE_ID] = nextId();
	  this._result = this._state = undefined;
	  this._subscribers = [];
	
	  if (noop !== resolver) {
	    typeof resolver !== 'function' && needsResolver();
	    this instanceof Promise ? initializePromise(this, resolver) : needsNew();
	  }
	}
	
	Promise.all = all;
	Promise.race = race;
	Promise.resolve = resolve;
	Promise.reject = reject;
	Promise._setScheduler = setScheduler;
	Promise._setAsap = setAsap;
	Promise._asap = asap;
	
	Promise.prototype = {
	  constructor: Promise,
	
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
	    let result;
	  
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
	    let author, books;
	  
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
	  then: then,
	
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
	  'catch': function _catch(onRejection) {
	    return this.then(null, onRejection);
	  }
	};
	
	function polyfill() {
	    var local = undefined;
	
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
	
	    if (P) {
	        var promiseToString = null;
	        try {
	            promiseToString = Object.prototype.toString.call(P.resolve());
	        } catch (e) {
	            // silently ignored
	        }
	
	        if (promiseToString === '[object Promise]' && !P.cast) {
	            return;
	        }
	    }
	
	    local.Promise = Promise;
	}
	
	polyfill();
	// Strange compat..
	Promise.polyfill = polyfill;
	Promise.Promise = Promise;
	
	return Promise;
	
	})));
	//# sourceMappingURL=es6-promise.map
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58), (function() { return this; }())))

/***/ },
/* 115 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var converter_1 = __webpack_require__(117);
	var clone = __webpack_require__(118);
	var deepEqual = __webpack_require__(97);
	var filterObject = __webpack_require__(47);
	var qs = __webpack_require__(119);
	var REFINEMENT_MASK = '{navigationName,value,low,high}';
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
	    Query.prototype.withConfiguration = function (configuration, mask) {
	        if (mask === void 0) { mask = '*'; }
	        Object.assign(this.request, filterObject(configuration, mask));
	        return this;
	    };
	    Query.prototype.withSelectedRefinements = function () {
	        var _this = this;
	        var refinements = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            refinements[_i - 0] = arguments[_i];
	        }
	        refinements.forEach(function (ref) { return _this.addRefinement(ref, _this.request.refinements); });
	        return this;
	    };
	    Query.prototype.withoutSelectedRefinements = function () {
	        var _this = this;
	        var refinements = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            refinements[_i - 0] = arguments[_i];
	        }
	        refinements.forEach(function (refinement) {
	            var index = _this.request.refinements.findIndex(function (ref) { return deepEqual(ref, refinement); });
	            if (index > -1)
	                _this.request.refinements.splice(index, 1);
	        });
	        return this;
	    };
	    Query.prototype.withRefinements = function (navigationName) {
	        var _this = this;
	        var refinements = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            refinements[_i - 1] = arguments[_i];
	        }
	        var convert = function (refinement) { return Object.assign(refinement, { navigationName: navigationName }); };
	        refinements.map(convert).forEach(function (ref) { return _this.addRefinement(ref, _this.request.refinements); });
	        return this;
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
	        this.request.sort = this.request.sort.filter(function (oldSort) { return !sorts.find(function (sort) { return sort.field === oldSort.field; }); });
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
	        var _this = this;
	        var builtRequest = this.raw;
	        converter_1.NavigationConverter.convert(this.unprocessedNavigations)
	            .forEach(function (ref) { return _this.addRefinement(ref, builtRequest.refinements); });
	        return this.clearEmptyArrays(builtRequest);
	    };
	    Object.defineProperty(Query.prototype, "raw", {
	        get: function () {
	            return clone(this.request, false);
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
	    Query.prototype.addRefinement = function (refinement, refinements) {
	        var _this = this;
	        if (!refinements.find(function (ref) { return _this.refinementMatches(ref, refinement); })) {
	            refinements.push(refinement);
	        }
	    };
	    Query.prototype.refinementMatches = function (target, original) {
	        return deepEqual(filterObject(target, REFINEMENT_MASK), filterObject(original, REFINEMENT_MASK));
	    };
	    Query.prototype.convertParamString = function (customUrlParams) {
	        var parsed = qs.parse(customUrlParams);
	        return Object.keys(parsed).reduce(function (converted, key) { return converted.concat({ key: key, value: parsed[key] }); }, []);
	    };
	    Query.prototype.convertQueryString = function (queryParams) {
	        return qs.parse(queryParams);
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


/***/ },
/* 117 */
/***/ function(module, exports) {

	"use strict";
	var NavigationConverter = (function () {
	    function NavigationConverter() {
	    }
	    NavigationConverter.convert = function (navigations) {
	        return navigations.reduce(function (refinements, navigation) {
	            navigation.refinements
	                .forEach(function (refinement) { return refinements.push(Object.assign(refinement, { navigationName: navigation.name })); });
	            return refinements;
	        }, []);
	    };
	    return NavigationConverter;
	}());
	exports.NavigationConverter = NavigationConverter;


/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(Buffer) {var clone = (function() {
	'use strict';
	
	/**
	 * Clones (copies) an Object using deep copying.
	 *
	 * This function supports circular references by default, but if you are certain
	 * there are no circular references in your object, you can save some CPU time
	 * by calling clone(obj, false).
	 *
	 * Caution: if `circular` is false and `parent` contains circular references,
	 * your program may enter an infinite loop and crash.
	 *
	 * @param `parent` - the object to be cloned
	 * @param `circular` - set to true if the object to be cloned may contain
	 *    circular references. (optional - true by default)
	 * @param `depth` - set to a number if the object is only to be cloned to
	 *    a particular depth. (optional - defaults to Infinity)
	 * @param `prototype` - sets the prototype to be used when cloning an object.
	 *    (optional - defaults to parent prototype).
	*/
	function clone(parent, circular, depth, prototype) {
	  var filter;
	  if (typeof circular === 'object') {
	    depth = circular.depth;
	    prototype = circular.prototype;
	    filter = circular.filter;
	    circular = circular.circular
	  }
	  // maintain two arrays for circular references, where corresponding parents
	  // and children have the same index
	  var allParents = [];
	  var allChildren = [];
	
	  var useBuffer = typeof Buffer != 'undefined';
	
	  if (typeof circular == 'undefined')
	    circular = true;
	
	  if (typeof depth == 'undefined')
	    depth = Infinity;
	
	  // recurse this function so we don't reset allParents and allChildren
	  function _clone(parent, depth) {
	    // cloning null always returns null
	    if (parent === null)
	      return null;
	
	    if (depth == 0)
	      return parent;
	
	    var child;
	    var proto;
	    if (typeof parent != 'object') {
	      return parent;
	    }
	
	    if (clone.__isArray(parent)) {
	      child = [];
	    } else if (clone.__isRegExp(parent)) {
	      child = new RegExp(parent.source, __getRegExpFlags(parent));
	      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
	    } else if (clone.__isDate(parent)) {
	      child = new Date(parent.getTime());
	    } else if (useBuffer && Buffer.isBuffer(parent)) {
	      child = new Buffer(parent.length);
	      parent.copy(child);
	      return child;
	    } else {
	      if (typeof prototype == 'undefined') {
	        proto = Object.getPrototypeOf(parent);
	        child = Object.create(proto);
	      }
	      else {
	        child = Object.create(prototype);
	        proto = prototype;
	      }
	    }
	
	    if (circular) {
	      var index = allParents.indexOf(parent);
	
	      if (index != -1) {
	        return allChildren[index];
	      }
	      allParents.push(parent);
	      allChildren.push(child);
	    }
	
	    for (var i in parent) {
	      var attrs;
	      if (proto) {
	        attrs = Object.getOwnPropertyDescriptor(proto, i);
	      }
	
	      if (attrs && attrs.set == null) {
	        continue;
	      }
	      child[i] = _clone(parent[i], depth - 1);
	    }
	
	    return child;
	  }
	
	  return _clone(parent, depth);
	}
	
	/**
	 * Simple flat clone using prototype, accepts only objects, usefull for property
	 * override on FLAT configuration object (no nested props).
	 *
	 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
	 * works.
	 */
	clone.clonePrototype = function clonePrototype(parent) {
	  if (parent === null)
	    return null;
	
	  var c = function () {};
	  c.prototype = parent;
	  return new c();
	};
	
	// private utility functions
	
	function __objToStr(o) {
	  return Object.prototype.toString.call(o);
	};
	clone.__objToStr = __objToStr;
	
	function __isDate(o) {
	  return typeof o === 'object' && __objToStr(o) === '[object Date]';
	};
	clone.__isDate = __isDate;
	
	function __isArray(o) {
	  return typeof o === 'object' && __objToStr(o) === '[object Array]';
	};
	clone.__isArray = __isArray;
	
	function __isRegExp(o) {
	  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
	};
	clone.__isRegExp = __isRegExp;
	
	function __getRegExpFlags(re) {
	  var flags = '';
	  if (re.global) flags += 'g';
	  if (re.ignoreCase) flags += 'i';
	  if (re.multiline) flags += 'm';
	  return flags;
	};
	clone.__getRegExpFlags = __getRegExpFlags;
	
	return clone;
	})();
	
	if (typeof module === 'object' && module.exports) {
	  module.exports = clone;
	}
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(49).Buffer))

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Stringify = __webpack_require__(120);
	var Parse = __webpack_require__(122);
	
	module.exports = {
	    stringify: Stringify,
	    parse: Parse
	};


/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Utils = __webpack_require__(121);
	
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
/* 121 */
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
/* 122 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Utils = __webpack_require__(121);
	
	var has = Object.prototype.hasOwnProperty;
	
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
	
	        var key, val;
	        if (pos === -1) {
	            key = options.decoder(part);
	            val = options.strictNullHandling ? null : '';
	        } else {
	            key = options.decoder(part.slice(0, pos));
	            val = options.decoder(part.slice(pos + 1));
	        }
	        if (has.call(obj, key)) {
	            obj[key] = [].concat(obj[key]).concat(val);
	        } else {
	            obj[key] = val;
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
	        if (!options.plainObjects && has.call(Object.prototype, segment[1])) {
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
	        if (!options.plainObjects && has.call(Object.prototype, segment[1].replace(/\[|\]/g, ''))) {
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
/* 123 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var query_1 = __webpack_require__(116);
	var axios = __webpack_require__(124);
	var SEARCH = '/search';
	var REFINEMENTS = '/refinements';
	var INVALID_QUERY_ERROR = 'query was not of a recognised type';
	exports.DEFAULT_CONFIG = {
	    timeout: 1500
	};
	var AbstractBridge = (function () {
	    function AbstractBridge(config) {
	        this.headers = {};
	        this.config = Object.assign({}, exports.DEFAULT_CONFIG, config);
	    }
	    AbstractBridge.prototype.search = function (query, callback) {
	        var _this = this;
	        var _a = this.extractRequest(query), request = _a.request, queryParams = _a.queryParams;
	        if (request === null)
	            return this.generateError(INVALID_QUERY_ERROR, callback);
	        var response = this.fireRequest(this.bridgeUrl, request, queryParams)
	            .then(function (res) { return res.records ? Object.assign(res, { records: res.records.map(_this.convertRecordFields) }) : res; });
	        return this.handleResponse(response, callback);
	    };
	    AbstractBridge.prototype.refinements = function (query, navigationName, callback) {
	        var request = this.extractRequest(query).request;
	        if (request === null)
	            return this.generateError(INVALID_QUERY_ERROR, callback);
	        var refinementsRequest = { originalQuery: request, navigationName: navigationName };
	        var response = this.fireRequest(this.refinementsUrl, refinementsRequest);
	        return this.handleResponse(response, callback);
	    };
	    AbstractBridge.prototype.handleResponse = function (response, callback) {
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
	            case 'string': return { request: new query_1.Query(query).build(), queryParams: {} };
	            case 'object': return query instanceof query_1.Query
	                ? { request: query.build(), queryParams: query.queryParams }
	                : { request: query, queryParams: {} };
	            default: return { request: null, queryParams: null };
	        }
	    };
	    AbstractBridge.prototype.generateError = function (error, callback) {
	        var err = new Error(error);
	        if (callback) {
	            callback(err);
	        }
	        else {
	            return Promise.reject(err);
	        }
	    };
	    AbstractBridge.prototype.fireRequest = function (url, body, queryParams) {
	        if (queryParams === void 0) { queryParams = {}; }
	        var options = {
	            url: url,
	            method: 'post',
	            params: queryParams,
	            data: this.augmentRequest(body),
	            headers: this.headers,
	            responseType: 'json',
	            timeout: this.config.timeout
	        };
	        return axios(options)
	            .then(function (res) { return res.data; });
	    };
	    AbstractBridge.prototype.convertRecordFields = function (record) {
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
	    return AbstractBridge;
	}());
	exports.AbstractBridge = AbstractBridge;
	var CloudBridge = (function (_super) {
	    __extends(CloudBridge, _super);
	    function CloudBridge(clientKey, customerId, config) {
	        if (config === void 0) { config = {}; }
	        _super.call(this, config);
	        this.clientKey = clientKey;
	        this.baseUrl = "https://" + customerId + ".groupbycloud.com:443/api/v1";
	        this.bridgeUrl = this.baseUrl + SEARCH;
	        this.refinementsUrl = this.bridgeUrl + REFINEMENTS;
	    }
	    CloudBridge.prototype.augmentRequest = function (request) {
	        return Object.assign(request, { clientKey: this.clientKey });
	    };
	    return CloudBridge;
	}(AbstractBridge));
	exports.CloudBridge = CloudBridge;
	var BrowserBridge = (function (_super) {
	    __extends(BrowserBridge, _super);
	    function BrowserBridge(customerId, https, config) {
	        if (https === void 0) { https = false; }
	        if (config === void 0) { config = {}; }
	        _super.call(this, config);
	        var scheme = https ? 'https' : 'http';
	        var port = https ? ':443' : '';
	        this.baseUrl = scheme + "://" + customerId + "-cors.groupbycloud.com" + port + "/api/v1";
	        this.bridgeUrl = this.baseUrl + SEARCH;
	        this.refinementsUrl = this.bridgeUrl + REFINEMENTS;
	    }
	    BrowserBridge.prototype.augmentRequest = function (request) {
	        return request;
	    };
	    return BrowserBridge;
	}(AbstractBridge));
	exports.BrowserBridge = BrowserBridge;


/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(125);

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaults = __webpack_require__(126);
	var utils = __webpack_require__(127);
	var dispatchRequest = __webpack_require__(129);
	var InterceptorManager = __webpack_require__(138);
	var isAbsoluteURL = __webpack_require__(139);
	var combineURLs = __webpack_require__(140);
	var bind = __webpack_require__(141);
	var transformData = __webpack_require__(133);
	
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
	axios.spread = __webpack_require__(142);
	
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
/* 126 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(127);
	var normalizeHeaderName = __webpack_require__(128);
	
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
/* 127 */
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
/* 128 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(127);
	
	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ },
/* 129 */
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
	        adapter = __webpack_require__(130);
	      } else if (typeof process !== 'undefined') {
	        // For node use HTTP adapter
	        adapter = __webpack_require__(130);
	      }
	
	      if (typeof adapter === 'function') {
	        adapter(resolve, reject, config);
	      }
	    } catch (e) {
	      reject(e);
	    }
	  });
	};
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var utils = __webpack_require__(127);
	var buildURL = __webpack_require__(131);
	var parseHeaders = __webpack_require__(132);
	var transformData = __webpack_require__(133);
	var isURLSameOrigin = __webpack_require__(134);
	var btoa = (typeof window !== 'undefined' && window.btoa) || __webpack_require__(135);
	var settle = __webpack_require__(136);
	
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
	    var cookies = __webpack_require__(137);
	
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(58)))

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(127);
	
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
/* 132 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(127);
	
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
/* 133 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(127);
	
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
/* 134 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(127);
	
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
/* 135 */
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
/* 136 */
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
/* 137 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(127);
	
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
/* 138 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(127);
	
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
/* 139 */
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
/* 140 */
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
/* 141 */
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
/* 142 */
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
/* 143 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var bridge_1 = __webpack_require__(123);
	var query_1 = __webpack_require__(116);
	var pager_1 = __webpack_require__(144);
	exports.Pager = pager_1.Pager;
	var EventEmitter = __webpack_require__(146);
	var filterObject = __webpack_require__(47);
	var Events;
	(function (Events) {
	    Events.SEARCH = 'search';
	    Events.RESULTS = 'results';
	    Events.REFINEMENT_RESULTS = 'refinement_results';
	    Events.REFINEMENTS_CHANGED = 'refinements_changed';
	    Events.PAGE_CHANGED = 'page_changed';
	    Events.QUERY_CHANGED = 'query_changed';
	    Events.RESET = 'reset';
	    Events.REWRITE_QUERY = 'rewrite_query';
	    Events.SORT = 'sort';
	    Events.DETAILS = 'details';
	    Events.REDIRECT = 'redirect';
	})(Events = exports.Events || (exports.Events = {}));
	var FluxCapacitor = (function (_super) {
	    __extends(FluxCapacitor, _super);
	    function FluxCapacitor(endpoint, config, mask) {
	        if (config === void 0) { config = {}; }
	        _super.call(this);
	        this.originalQuery = '';
	        var bridgeConfig = config.bridge || {};
	        this.bridge = new bridge_1.BrowserBridge(endpoint, bridgeConfig.https, bridgeConfig);
	        if (bridgeConfig.headers)
	            this.bridge.headers = bridgeConfig.headers;
	        this.query = new query_1.Query().withConfiguration(filterObject(config, ['*', '!{bridge}']), mask);
	        this.page = new pager_1.Pager(this);
	    }
	    FluxCapacitor.prototype.search = function (originalQuery) {
	        var _this = this;
	        if (originalQuery === void 0) { originalQuery = this.originalQuery; }
	        this.query.withQuery(originalQuery);
	        this.emit(Events.SEARCH, this.query.raw);
	        return this.bridge.search(this.query)
	            .then(function (results) {
	            var oldQuery = _this.originalQuery;
	            Object.assign(_this, { results: results, originalQuery: originalQuery });
	            if (results.redirect) {
	                _this.emit(Events.REDIRECT, results.redirect);
	            }
	            _this.emit(Events.RESULTS, results);
	            _this.emitQueryChanged(oldQuery, originalQuery);
	            return results;
	        });
	    };
	    FluxCapacitor.prototype.refinements = function (navigationName) {
	        var _this = this;
	        return this.bridge.refinements(this.query, navigationName)
	            .then(function (results) {
	            _this.emit(Events.REFINEMENT_RESULTS, results);
	            return results;
	        });
	    };
	    FluxCapacitor.prototype.rewrite = function (query, config) {
	        var _this = this;
	        if (config === void 0) { config = {}; }
	        var search;
	        if (config.skipSearch) {
	            this.emitQueryChanged(this.originalQuery, query);
	            search = Promise.resolve(this.query.withQuery(this.originalQuery = query));
	        }
	        else {
	            search = this.search(query);
	        }
	        return search.then(function () { return _this.emit(Events.REWRITE_QUERY, query); })
	            .then(function () { return query; });
	    };
	    FluxCapacitor.prototype.resetRecall = function () {
	        this.query = new query_1.Query().withConfiguration(this.filteredRequest);
	    };
	    FluxCapacitor.prototype.reset = function (query) {
	        var _this = this;
	        if (query === void 0) { query = this.originalQuery; }
	        this.resetRecall();
	        this.emit(Events.PAGE_CHANGED, { pageNumber: 1 });
	        return this.search(query)
	            .then(function (res) { return _this.emit(Events.RESET, res); })
	            .then(function () { return query; });
	    };
	    FluxCapacitor.prototype.resize = function (pageSize, resetOffset) {
	        this.query.withPageSize(pageSize);
	        if (resetOffset) {
	            return this.page.switchPage(1);
	        }
	        else {
	            var total = this.page.restrictTotalRecords(this.page.fromResult, pageSize);
	            var page = this.page.getPage(total);
	            return this.page.switchPage(page);
	        }
	    };
	    FluxCapacitor.prototype.sort = function (sort, clearSorts) {
	        if (clearSorts === void 0) { clearSorts = [sort]; }
	        (_a = this.query).withoutSorts.apply(_a, clearSorts).withSorts(sort);
	        return this.page.reset();
	        var _a;
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
	    FluxCapacitor.prototype.details = function (id, navigationName) {
	        var _this = this;
	        if (navigationName === void 0) { navigationName = 'id'; }
	        return this.bridge.search(new query_1.Query()
	            .withConfiguration(this.query.raw, '{area,collection,language,fields}')
	            .withSelectedRefinements({ type: 'Value', navigationName: navigationName, value: id })
	            .withPageSize(1))
	            .then(function (res) {
	            if (res.records.length)
	                _this.emit(Events.DETAILS, res.records[0]);
	            return res;
	        });
	    };
	    FluxCapacitor.prototype.switchCollection = function (collection) {
	        this.query.withConfiguration({ collection: collection, refinements: [], sort: [], skip: 0 });
	        return this.search();
	    };
	    FluxCapacitor.prototype.emitQueryChanged = function (oldQuery, newQuery) {
	        if (oldQuery.toLowerCase() !== newQuery.toLowerCase()) {
	            this.emit(Events.QUERY_CHANGED, newQuery);
	        }
	    };
	    Object.defineProperty(FluxCapacitor.prototype, "filteredRequest", {
	        get: function () {
	            return filterObject(this.query.raw, '!{query,refinements,skip}');
	        },
	        enumerable: true,
	        configurable: true
	    });
	    FluxCapacitor.prototype.resetPaging = function (reset) {
	        return reset ? this.page.reset() : this.search();
	    };
	    FluxCapacitor.prototype.doRefinement = function (_a) {
	        var _this = this;
	        var reset = _a.reset;
	        return this.resetPaging(reset)
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


/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(143);
	var range = __webpack_require__(145);
	var MAX_RECORDS = 10000;
	var Pager = (function () {
	    function Pager(flux) {
	        this.flux = flux;
	    }
	    Pager.prototype.next = function () {
	        return this.switchPage(this.nextPage);
	    };
	    Pager.prototype.prev = function () {
	        return this.switchPage(this.previousPage);
	    };
	    Pager.prototype.last = function () {
	        return this.switchPage(this.finalPage);
	    };
	    Pager.prototype.reset = function () {
	        return this.switchPage(this.firstPage);
	    };
	    Object.defineProperty(Pager.prototype, "currentPage", {
	        get: function () {
	            return this.getPage(this.fromResult);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Pager.prototype, "previousPage", {
	        get: function () {
	            return (this.currentPage - 1 >= this.firstPage) ? this.currentPage - 1 : null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Pager.prototype, "nextPage", {
	        get: function () {
	            return (this.currentPage + 1 <= this.finalPage) ? this.currentPage + 1 : null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Pager.prototype, "firstPage", {
	        get: function () {
	            return 1;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Pager.prototype, "finalPage", {
	        get: function () {
	            return Math.max(this.getPage(this.restrictTotalRecords(this.totalRecords, this.pageSize)), 1);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Pager.prototype, "fromResult", {
	        get: function () {
	            return this.flux.query.build().skip + 1 || 1;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Pager.prototype, "toResult", {
	        get: function () {
	            if ((this.currentPage * this.pageSize) > this.totalRecords) {
	                return ((this.currentPage - 1) * this.pageSize) + (this.totalRecords % this.currentPage);
	            }
	            else {
	                return this.currentPage * this.pageSize;
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Pager.prototype, "totalRecords", {
	        get: function () {
	            return this.flux.results ? this.flux.results.totalRecordCount : 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Pager.prototype.pageExists = function (page) {
	        return page <= this.finalPage && page >= this.firstPage;
	    };
	    Pager.prototype.pageNumbers = function (limit) {
	        if (limit === void 0) { limit = 5; }
	        return range(1, Math.min(this.finalPage + 1, limit + 1))
	            .map(this.transformPages(limit));
	    };
	    Pager.prototype.switchPage = function (page) {
	        if (this.pageExists(page)) {
	            var skip = (page - 1) * this.pageSize;
	            this.flux.query.skip(skip);
	            this.flux.emit(index_1.Events.PAGE_CHANGED, { pageNumber: page });
	            return this.flux.search();
	        }
	        else {
	            return Promise.reject(new Error("page " + page + " does not exist"));
	        }
	    };
	    Pager.prototype.restrictTotalRecords = function (total, pageSize) {
	        if (total > MAX_RECORDS) {
	            return MAX_RECORDS - (MAX_RECORDS % pageSize);
	        }
	        else if ((total + pageSize) > MAX_RECORDS) {
	            if (MAX_RECORDS % pageSize === 0) {
	                return MAX_RECORDS;
	            }
	            else {
	                return total - (total % pageSize);
	            }
	        }
	        else {
	            return total;
	        }
	    };
	    Pager.prototype.getPage = function (record) {
	        return Math.ceil(record / this.pageSize);
	    };
	    Pager.prototype.transformPages = function (limit) {
	        var _this = this;
	        var border = Math.ceil(limit / 2);
	        return function (value) {
	            // account for 0-indexed pages
	            if (_this.currentPage <= border || limit > _this.finalPage) {
	                // pages start at beginning
	                return value;
	            }
	            else if (_this.currentPage > _this.finalPage - border) {
	                // pages start and end in the middle
	                return value + _this.finalPage - limit;
	            }
	            else {
	                // pages end at last page
	                return value + _this.currentPage - border;
	            }
	        };
	    };
	    Object.defineProperty(Pager.prototype, "pageSize", {
	        get: function () {
	            return this.flux.query.build().pageSize || 10;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return Pager;
	}());
	exports.Pager = Pager;


/***/ },
/* 145 */
/***/ function(module, exports) {

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_SAFE_INTEGER = 9007199254740991,
	    MAX_INTEGER = 1.7976931348623157e+308,
	    NAN = 0 / 0;
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    symbolTag = '[object Symbol]';
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeCeil = Math.ceil,
	    nativeMax = Math.max;
	
	/**
	 * The base implementation of `_.range` and `_.rangeRight` which doesn't
	 * coerce arguments.
	 *
	 * @private
	 * @param {number} start The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} step The value to increment or decrement by.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Array} Returns the range of numbers.
	 */
	function baseRange(start, end, step, fromRight) {
	  var index = -1,
	      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
	      result = Array(length);
	
	  while (length--) {
	    result[fromRight ? length : ++index] = start;
	    start += step;
	  }
	  return result;
	}
	
	/**
	 * Creates a `_.range` or `_.rangeRight` function.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new range function.
	 */
	function createRange(fromRight) {
	  return function(start, end, step) {
	    if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
	      end = step = undefined;
	    }
	    // Ensure the sign of `-0` is preserved.
	    start = toFinite(start);
	    if (end === undefined) {
	      end = start;
	      start = 0;
	    } else {
	      end = toFinite(end);
	    }
	    step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
	    return baseRange(start, end, step, fromRight);
	  };
	}
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return !!length &&
	    (typeof value == 'number' || reIsUint.test(value)) &&
	    (value > -1 && value % 1 == 0 && value < length);
	}
	
	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	 *  else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	        ? (isArrayLike(object) && isIndex(index, object.length))
	        : (type == 'string' && index in object)
	      ) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	
	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8-9 which returns 'object' for typed array and other constructors.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}
	
	/**
	 * Converts `value` to a finite number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.12.0
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted number.
	 * @example
	 *
	 * _.toFinite(3.2);
	 * // => 3.2
	 *
	 * _.toFinite(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toFinite(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toFinite('3.2');
	 * // => 3.2
	 */
	function toFinite(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  return value === value ? value : 0;
	}
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	/**
	 * Creates an array of numbers (positive and/or negative) progressing from
	 * `start` up to, but not including, `end`. A step of `-1` is used if a negative
	 * `start` is specified without an `end` or `step`. If `end` is not specified,
	 * it's set to `start` with `start` then set to `0`.
	 *
	 * **Note:** JavaScript follows the IEEE-754 standard for resolving
	 * floating-point values which can produce unexpected results.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {number} [start=0] The start of the range.
	 * @param {number} end The end of the range.
	 * @param {number} [step=1] The value to increment or decrement by.
	 * @returns {Array} Returns the range of numbers.
	 * @see _.inRange, _.rangeRight
	 * @example
	 *
	 * _.range(4);
	 * // => [0, 1, 2, 3]
	 *
	 * _.range(-4);
	 * // => [0, -1, -2, -3]
	 *
	 * _.range(1, 5);
	 * // => [1, 2, 3, 4]
	 *
	 * _.range(0, 20, 5);
	 * // => [0, 5, 10, 15]
	 *
	 * _.range(0, -4, -1);
	 * // => [0, -1, -2, -3]
	 *
	 * _.range(1, 4, 0);
	 * // => [1, 1, 1]
	 *
	 * _.range(0);
	 * // => []
	 */
	var range = createRange();
	
	module.exports = range;


/***/ },
/* 146 */
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
/* 147 */
/***/ function(module, exports) {

	"use strict";
	var Request = (function () {
	    function Request() {
	    }
	    return Request;
	}());
	exports.Request = Request;


/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var searchandiser_1 = __webpack_require__(37);
	var common_1 = __webpack_require__(40);
	var groupby_api_1 = __webpack_require__(102);
	exports.FILTER_UPDATED_EVENT = 'filter_updated';
	var Filter = (function () {
	    function Filter(flux, config) {
	        this.flux = flux;
	        this.config = config;
	        this.fluxClone = this.clone();
	        this.filterConfig = common_1.getPath(config, 'tags.filter') || {};
	    }
	    Filter.prototype.init = function () {
	        var _this = this;
	        this.flux.on(groupby_api_1.Events.RESULTS, function () { return _this.updateFluxClone(); });
	    };
	    Filter.prototype.updateFluxClone = function () {
	        var _this = this;
	        var searchRequest = this.flux.query.raw;
	        // TODO this is probably broken in terms of state propagation
	        this.fluxClone.query.withConfiguration({ refinements: [] });
	        if (searchRequest.refinements) {
	            var filteredRefinements = searchRequest.refinements
	                .filter(function (_a) {
	                var navigationName = _a.navigationName;
	                return !_this.isTargetNav(navigationName);
	            });
	            (_a = this.fluxClone.query).withSelectedRefinements.apply(_a, filteredRefinements);
	        }
	        this.fluxClone.search(searchRequest.query)
	            .then(function (res) { return _this.flux.emit(exports.FILTER_UPDATED_EVENT, res); });
	        var _a;
	    };
	    Filter.prototype.isTargetNav = function (navName) {
	        return navName === this.filterConfig.field;
	    };
	    Filter.prototype.clone = function () {
	        return searchandiser_1.initCapacitor(this.config);
	    };
	    return Filter;
	}());
	exports.Filter = Filter;


/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(40);
	var groupby_api_1 = __webpack_require__(102);
	var Redirect = (function () {
	    function Redirect(flux) {
	        this.flux = flux;
	    }
	    Redirect.prototype.init = function () {
	        this.flux.on(groupby_api_1.Events.REDIRECT, function (redirect) { return common_1.LOCATION.assign(redirect); });
	    };
	    return Redirect;
	}());
	exports.Redirect = Redirect;


/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(40);
	var simple_beautifier_1 = __webpack_require__(151);
	var url_beautifier_1 = __webpack_require__(153);
	var groupby_api_1 = __webpack_require__(102);
	var parseUri = __webpack_require__(152);
	var Url = (function () {
	    function Url(flux, config) {
	        this.flux = flux;
	        this.config = config;
	        this.urlConfig = this.config.url || {};
	        this.beautify = !!this.urlConfig.beautifier;
	    }
	    Url.prototype.init = function () {
	        this.beautifier = new url_beautifier_1.UrlBeautifier(this.config);
	        this.simple = new simple_beautifier_1.SimpleBeautifier(this.config);
	        if (!this.config.initialSearch) {
	            var query = void 0;
	            if (this.beautify) {
	                query = Url.parseBeautifiedUrl(this.beautifier);
	            }
	            else {
	                query = Url.parseUrl(this.simple);
	            }
	            if (query) {
	                this.flux.query = query;
	                this.flux.search(query.raw.query);
	            }
	        }
	    };
	    Url.prototype.active = function () {
	        return common_1.LOCATION.pathname() !== this.urlConfig.searchUrl;
	    };
	    Url.prototype.update = function (query, refinements) {
	        if (refinements === void 0) { refinements = this.flux.query.raw.refinements; }
	        var queryObj = (_a = new groupby_api_1.Query(query)).withSelectedRefinements.apply(_a, refinements);
	        var url;
	        if (this.beautify) {
	            url = this.beautifier.build(queryObj);
	        }
	        else {
	            url = this.simple.build(queryObj);
	        }
	        Url.setLocation(url, this.urlConfig);
	        var _a;
	    };
	    Url.parseUrl = function (simple) {
	        return simple.parse(common_1.LOCATION.href());
	    };
	    Url.parseBeautifiedUrl = function (beautifier) {
	        return beautifier.parse(common_1.LOCATION.href());
	    };
	    Url.setLocation = function (url, config) {
	        if (common_1.LOCATION.pathname() === config.searchUrl) {
	            common_1.LOCATION.setSearch("?" + parseUri(url).query);
	        }
	        else {
	            common_1.LOCATION.replace(url);
	        }
	    };
	    return Url;
	}());
	exports.Url = Url;


/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var searchandiser_1 = __webpack_require__(37);
	var groupby_api_1 = __webpack_require__(102);
	var parseUri = __webpack_require__(152);
	var queryString = __webpack_require__(44);
	var SimpleBeautifier = (function () {
	    function SimpleBeautifier(config) {
	        this.config = config;
	        this.urlConfig = config.url || {};
	    }
	    SimpleBeautifier.prototype.parse = function (url) {
	        var queryParams = queryString.parse(parseUri(url).query);
	        var queryFromUrl = new groupby_api_1.Query(queryParams[this.urlConfig.queryParam] || '')
	            .withConfiguration(this.config, searchandiser_1.CONFIGURATION_MASK);
	        if (queryParams.refinements) {
	            var refinements = JSON.parse(queryParams.refinements);
	            if (refinements.length > 0) {
	                queryFromUrl.withSelectedRefinements.apply(queryFromUrl, refinements);
	            }
	        }
	        return queryFromUrl;
	    };
	    SimpleBeautifier.prototype.build = function (query) {
	        var request = query.build();
	        var queryObj = {};
	        if ('refinements' in request && request.refinements.length > 0) {
	            queryObj['refinements'] = JSON.stringify(request.refinements);
	        }
	        queryObj[this.urlConfig.queryParam] = request.query;
	        return this.urlConfig.searchUrl + "?" + queryString.stringify(queryObj);
	    };
	    return SimpleBeautifier;
	}());
	exports.SimpleBeautifier = SimpleBeautifier;


/***/ },
/* 152 */
/***/ function(module, exports) {

	/**
	 * Parses an URI
	 *
	 * @author Steven Levithan <stevenlevithan.com> (MIT license)
	 * @api private
	 */
	
	var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
	
	var parts = [
	    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
	];
	
	module.exports = function parseuri(str) {
	    var src = str,
	        b = str.indexOf('['),
	        e = str.indexOf(']');
	
	    if (b != -1 && e != -1) {
	        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
	    }
	
	    var m = re.exec(str || ''),
	        uri = {},
	        i = 14;
	
	    while (i--) {
	        uri[parts[i]] = m[i] || '';
	    }
	
	    if (b != -1 && e != -1) {
	        uri.source = src;
	        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
	        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
	        uri.ipv6uri = true;
	    }
	
	    return uri;
	};


/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var searchandiser_1 = __webpack_require__(37);
	var groupby_api_1 = __webpack_require__(102);
	var parseUri = __webpack_require__(152);
	var queryString = __webpack_require__(44);
	var UrlBeautifier = (function () {
	    function UrlBeautifier(searchandiserConfig) {
	        if (searchandiserConfig === void 0) { searchandiserConfig = {}; }
	        this.searchandiserConfig = searchandiserConfig;
	        this.config = {
	            refinementMapping: [],
	            extraRefinementsParam: 'refinements',
	            queryToken: 'q',
	            suffix: ''
	        };
	        this.generator = new UrlGenerator(this);
	        this.parser = new UrlParser(this);
	        var urlConfig = searchandiserConfig.url || {};
	        var config = typeof urlConfig.beautifier === 'object' ? urlConfig.beautifier : {};
	        Object.assign(this.config, config);
	        var keys = [];
	        for (var _i = 0, _a = this.config.refinementMapping; _i < _a.length; _i++) {
	            var mapping = _a[_i];
	            var key = Object.keys(mapping)[0];
	            if (key.length !== 1) {
	                throw new Error('refinement mapping token must be a single character');
	            }
	            if (key.match(/[aeiouy]/)) {
	                throw new Error('refinement mapping token must not be a vowel');
	            }
	            if (keys.indexOf(key) > -1) {
	                throw new Error('refinement mapping tokens must be unique');
	            }
	            keys.push(key);
	        }
	        if (this.config.queryToken.length !== 1) {
	            throw new Error('query token must be a single character');
	        }
	        if (this.config.queryToken.match(/[aeiouy]/)) {
	            throw new Error('query token must not be a vowel');
	        }
	        if (keys.indexOf(this.config.queryToken) > -1) {
	            throw new Error('query token must be unique from refinement tokens');
	        }
	    }
	    UrlBeautifier.prototype.parse = function (url) {
	        return this.parser.parse(url);
	    };
	    UrlBeautifier.prototype.build = function (query) {
	        return this.generator.build(query);
	    };
	    return UrlBeautifier;
	}());
	exports.UrlBeautifier = UrlBeautifier;
	var UrlGenerator = (function () {
	    function UrlGenerator(_a) {
	        var config = _a.config;
	        this.config = config;
	    }
	    UrlGenerator.prototype.build = function (query) {
	        var request = query.build();
	        var uri = {
	            path: [],
	            query: ''
	        };
	        // let url = '';
	        var origRefinements = Array.of.apply(Array, request.refinements);
	        var countMap = {};
	        var _a = this.generateRefinementMap(origRefinements), map = _a.map, keys = _a.keys;
	        // add query
	        if (request.query) {
	            uri.path.push(request.query);
	        }
	        // add refinements
	        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
	            var key = keys_1[_i];
	            var refinements = map[key];
	            countMap[key] = refinements.length;
	            (_b = uri.path).push.apply(_b, refinements.map(this.convertRefinement).sort());
	        }
	        // add reference key
	        if (keys.length || request.query) {
	            var referenceKey_1 = '';
	            if (request.query)
	                referenceKey_1 += this.config.queryToken;
	            keys.forEach(function (key) { return referenceKey_1 += key.repeat(countMap[key]); });
	            uri.path.push(referenceKey_1);
	        }
	        // add remaining refinements
	        if (origRefinements.length) {
	            uri.query = origRefinements
	                .sort(function (lhs, rhs) { return lhs.navigationName.localeCompare(rhs.navigationName); })
	                .map(this.stringifyRefinement)
	                .join('~');
	        }
	        var url = "/" + uri.path.map(function (path) { return encodeURIComponent(path); }).join('/');
	        if (this.config.suffix)
	            url += "/" + this.config.suffix.replace(/^\/+/, '');
	        if (uri.query)
	            url += "?" + this.config.extraRefinementsParam + "=" + encodeURIComponent(uri.query);
	        return url.replace(/\s|%20/g, '+');
	        var _b;
	    };
	    UrlGenerator.prototype.generateRefinementMap = function (refinements) {
	        var refinementMap = {};
	        var refinementKeys = [];
	        var _loop_1 = function(mapping) {
	            var key = Object.keys(mapping)[0];
	            var matchingRefinements = refinements.filter(function (refinement) { return refinement.navigationName === mapping[key]; });
	            if (matchingRefinements.length) {
	                refinementKeys.push(key);
	                refinementMap[key] = matchingRefinements;
	                matchingRefinements.forEach(function (ref) { return refinements.splice(refinements.indexOf(ref), 1); });
	            }
	        };
	        for (var _i = 0, _a = this.config.refinementMapping; _i < _a.length; _i++) {
	            var mapping = _a[_i];
	            _loop_1(mapping);
	        }
	        return { map: refinementMap, keys: refinementKeys };
	    };
	    UrlGenerator.prototype.convertRefinement = function (refinement) {
	        if (refinement.type === 'Value') {
	            return refinement.value;
	        }
	        else {
	            throw new Error('cannot map range refinements');
	        }
	    };
	    UrlGenerator.prototype.stringifyRefinement = function (refinement) {
	        var name = refinement.navigationName;
	        if (refinement.type === 'Value') {
	            return name + "=" + refinement.value;
	        }
	        else {
	            return name + ":" + refinement.low + ".." + refinement.high;
	        }
	    };
	    return UrlGenerator;
	}());
	exports.UrlGenerator = UrlGenerator;
	var UrlParser = (function () {
	    function UrlParser(_a) {
	        var config = _a.config, searchandiserConfig = _a.searchandiserConfig;
	        this.config = config;
	        this.searchandiserConfig = searchandiserConfig;
	        this.suffixRegex = new RegExp("^" + this.config.suffix);
	    }
	    UrlParser.prototype.parse = function (rawUrl) {
	        var url = parseUri(rawUrl);
	        var paths = url.path.split('/').filter(function (val) { return val; });
	        if (paths[paths.length - 1] === this.config.suffix)
	            paths.pop();
	        var keys = (paths.pop() || '').split('');
	        var map = this.generateRefinementMapping();
	        var query = new groupby_api_1.Query().withConfiguration(this.searchandiserConfig, searchandiser_1.CONFIGURATION_MASK);
	        for (var _i = 0, keys_2 = keys; _i < keys_2.length; _i++) {
	            var key = keys_2[_i];
	            if (!(key in map || key === this.config.queryToken)) {
	                throw new Error("unexpected token '" + key + "' found in reference");
	            }
	        }
	        if (paths.length < keys.length)
	            throw new Error('token reference is invalid');
	        // remove prefixed paths
	        paths.splice(0, paths.length - keys.length);
	        for (var i = 0; i < keys.length; i++) {
	            if (keys[i] === this.config.queryToken) {
	                query.withQuery(this.decode(paths[i]));
	            }
	            else {
	                query.withSelectedRefinements.apply(query, this.extractRefinements(paths[i], map[keys[i]]));
	            }
	        }
	        var unmappedRefinements = queryString.parse(url.query)[this.config.extraRefinementsParam];
	        if (unmappedRefinements)
	            query.withSelectedRefinements.apply(query, this.extractUnmapped(unmappedRefinements));
	        return query;
	    };
	    UrlParser.prototype.generateRefinementMapping = function () {
	        return this.config.refinementMapping.reduce(function (map, mapping) { return Object.assign(map, mapping); }, {});
	    };
	    UrlParser.prototype.extractRefinements = function (refinementString, navigationName) {
	        var _this = this;
	        var refinementStrings = refinementString.split('~');
	        return refinementStrings.map(function (value) { return ({ navigationName: navigationName, type: 'Value', value: _this.decode(value) }); });
	    };
	    UrlParser.prototype.extractUnmapped = function (refinementString) {
	        var refinementStrings = refinementString.split('~');
	        return refinementStrings
	            .map(this.decode)
	            .map(function (refinement) {
	            var _a = refinement.split(/=|:/), navigationName = _a[0], value = _a[1];
	            if (value.indexOf('..') >= 0) {
	                var _b = value.split('..'), low = _b[0], high = _b[1];
	                return { navigationName: navigationName, low: Number(low), high: Number(high), type: 'Range' };
	            }
	            else {
	                return { navigationName: navigationName, value: value, type: 'Value' };
	            }
	        });
	    };
	    UrlParser.prototype.decode = function (value) {
	        return decodeURIComponent(value.replace('+', ' '));
	    };
	    return UrlParser;
	}());
	exports.UrlParser = UrlParser;


/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var sayt_1 = __webpack_require__(155);
	var sayt = new sayt_1.Sayt();
	var FluxTag = (function () {
	    function FluxTag() {
	    }
	    FluxTag.prototype.init = function () {
	        this._style = this.config.stylish ? 'gb-stylish' : '';
	        setTagName(this);
	        setParents(this);
	        setScope(this);
	    };
	    FluxTag.prototype._mixin = function () {
	        var mixins = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            mixins[_i - 0] = arguments[_i];
	        }
	        this.mixin.apply(this, mixins.map(function (mixin) { return new mixin().__proto__; }));
	    };
	    FluxTag.prototype._scopeTo = function (scope) {
	        this._scope = this._parents[scope];
	    };
	    FluxTag.prototype.findParent = function (tag, name) {
	        var parentTag = tag;
	        while (parentTag.root.localName !== name && parentTag.parent)
	            parentTag = parentTag.parent;
	        return parentTag;
	    };
	    return FluxTag;
	}());
	exports.FluxTag = FluxTag;
	var SaytTag = (function () {
	    function SaytTag() {
	    }
	    SaytTag.prototype.init = function () {
	        this.sayt = sayt;
	    };
	    return SaytTag;
	}());
	exports.SaytTag = SaytTag;
	function setTagName(tag) {
	    var htmlTagName = tag.root.tagName.toLowerCase();
	    var tagName = htmlTagName.startsWith('gb-') ?
	        htmlTagName :
	        tag.root.dataset['is'] || tag.root.getAttribute('riot-tag');
	    if (tagName) {
	        tag._tagName = tagName;
	        tag._simpleTagName = tag._tagName.replace(/^gb-/, '');
	    }
	}
	function setParents(tag) {
	    tag._parents = tag.parent ? Object.assign({}, tag.parent['_parents']) : {};
	    if (tag._tagName) {
	        tag._parents[tag._tagName] = tag;
	    }
	    tag._parentsList = [];
	    var currTag = tag;
	    while (currTag = currTag.parent)
	        tag._parentsList.push(currTag);
	}
	// somehow this function isn't working for the gb-select inside gb-sort
	function setScope(tag) {
	    if (tag.opts.scope in tag._parents) {
	        tag._scope = tag._parents[tag.opts.scope];
	    }
	    else if (tag.parent && tag.parent._scope) {
	        tag._scope = tag.parent._scope;
	    }
	    else {
	        var parent_1 = tag;
	        while (parent_1.parent)
	            tag._scope = parent_1 = parent_1.parent;
	        tag._top = tag._scope;
	    }
	}
	function MixinFlux(flux, config, services) {
	    return Object.assign(new FluxTag()['__proto__'], { flux: flux, config: config, services: services });
	}
	exports.MixinFlux = MixinFlux;


/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(156);


/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	function __export(m) {
	    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
	}
	__webpack_require__(114).polyfill();
	__webpack_require__(157).pollyfill();
	__export(__webpack_require__(158));


/***/ },
/* 157 */
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


/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var index_1 = __webpack_require__(159);
	var filterObject = __webpack_require__(47);
	var SAYT_URL = '.groupbycloud.com/api/v1/sayt/search';
	var Sayt = (function () {
	    function Sayt(config) {
	        this.config = {
	            autocomplete: {
	                numSearchTerms: 5,
	                numNavigations: 5
	            },
	            productSearch: {
	                numProducts: 4
	            }
	        };
	        this.configure(config);
	    }
	    Sayt.prototype.configure = function (config) {
	        if (config === void 0) { config = {}; }
	        Object.assign(this.config, filterObject(config, '!{autocomplete,productSearch}'));
	        Object.assign(this.config.autocomplete, config.autocomplete || {});
	        Object.assign(this.config.productSearch, config.productSearch || {});
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
	        return this.callbackOrPromise(response, cb);
	    };
	    Sayt.prototype.callbackOrPromise = function (promise, cb) {
	        var response = promise;
	        if (typeof cb === 'function') {
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


/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var qs = __webpack_require__(119);
	var rawJsonp = __webpack_require__(160);
	function jsonp(url, body) {
	    return new Promise(function (resolve, reject) {
	        rawJsonp(url + "?" + qs.stringify(body), function (err, data) { return err ? reject(err) : resolve(data); });
	    });
	}
	exports.jsonp = jsonp;


/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Module dependencies
	 */
	
	var debug = __webpack_require__(161)('jsonp');
	
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
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */
	
	exports = module.exports = __webpack_require__(162);
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
/* 162 */
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
	exports.humanize = __webpack_require__(163);
	
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
/* 163 */
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
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["riot"] = __webpack_require__(165);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global) {/* Riot v2.6.2, @license MIT */
	
	;(function(window, undefined) {
	  'use strict';
	var riot = { version: 'v2.6.2', settings: {} },
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
	  XLINK_NS = 'http://www.w3.org/1999/xlink',
	  XLINK_REGEX = /^xlink:(\w+)/,
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
	    var es = e.split(' '), l = es.length, i = 0
	    for (; i < l; i++) {
	      var name = es[i]
	      if (name) fn(name, i)
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
	
	        onEachEvent(events, function(name, pos) {
	          (callbacks[name] = callbacks[name] || []).push(fn)
	          fn.typed = pos > 0
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
	          onEachEvent(events, function(name, pos) {
	            if (fn) {
	              var arr = callbacks[name]
	              for (var i = 0, cb; cb = arr && arr[i]; ++i) {
	                if (cb == fn) arr.splice(i--, 1)
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
	
	        onEachEvent(events, function(name, pos) {
	
	          fns = slice.call(callbacks[name] || [], 0)
	
	          for (var i = 0, fn; fn = fns[i]; ++i) {
	            if (fn.busy) continue
	            fn.busy = 1
	            fn.apply(el, fn.typed ? [name].concat(args) : args)
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
	  var isRoot = emitStackLevel == 0, first
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
	    while (first = emitStack.shift()) first() // stack increses within this call
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
	
	  if (el.href != loc.href
	    && (
	      el.href.split('#')[0] == loc.href.split('#')[0] // internal jump
	      || base[0] != '#' && getPathFromRoot(el.href).indexOf(base) !== 0 // outside of base
	      || base[0] == '#' && el.href.split(base)[0] != loc.href.split(base)[0] // outside of #base
	      || !go(getPathFromBase(el.href), el.title || doc.title) // route not found
	    )) return
	
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
	  // Server-side usage: directly execute handlers for the path
	  if (!hist) return central[TRIGGER]('emit', getPathFromBase(path))
	
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
	 * @version v2.4.1
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
	
	    UNSUPPORTED = RegExp('[\\' + 'x00-\\x1F<>a-zA-Z0-9\'",;\\\\]'),
	
	    NEED_ESCAPE = /(?=[[\]()*+?.^$|])/g,
	
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
	
	    if (arr.length !== 2 || UNSUPPORTED.test(pair)) {
	      throw new Error('Unsupported brackets "' + pair + '"')
	    }
	    arr = arr.concat(pair.replace(NEED_ESCAPE, '\\').split(' '))
	
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
	
	  // istanbul ignore next
	  _tmpl.clearCache = function () { _cache = {} }
	
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
	
	    return new Function('E', expr + ';')    // eslint-disable-line no-new-func
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
	    JS_VARNAME = /[,{][$\w]+(?=:)|(^ *|[^$\w\.])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
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
	
	  _tmpl.version = brackets.version = 'v2.4.1'
	
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
	        else if (tags[i].root.parentNode) root.insertBefore(tag.root, tags[i].root)
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
	    root.insertBefore(frag, ref)
	    if (isOption) {
	
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
	
	  function inheritFrom(target) {
	    each(Object.keys(target), function(k) {
	      // some properties must be always in sync with the parent tag
	      var mustSync = !RESERVED_WORDS_BLACKLIST.test(k) && contains(propsInSyncWithParent, k)
	
	      if (typeof self[k] === T_UNDEF || mustSync) {
	        // track the property to keep in sync
	        // so we can keep it updated
	        if (!mustSync) propsInSyncWithParent.push(k)
	        self[k] = target[k]
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
	    // inherit properties from the parent in loop
	    if (isLoop) {
	      inheritFrom(self.parent)
	    }
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
	      var instance,
	        props = [],
	        obj
	
	      mix = typeof mix === T_STRING ? riot.mixin(mix) : mix
	
	      // check if the mixin is a function
	      if (isFunction(mix)) {
	        // create the new mixin instance
	        instance = new mix()
	      } else instance = mix
	
	      var proto = Object.getPrototypeOf(instance)
	
	      // build multilevel prototype inheritance chain property list
	      do props = props.concat(Object.getOwnPropertyNames(obj || instance))
	      while (obj = Object.getPrototypeOf(obj || instance))
	
	      // loop the keys in the function prototype or the all object keys
	      each(props, function(key) {
	        // bind methods to self
	        // allow mixins to override other properties/parent mixins
	        if (key != 'init') {
	          // check for getters/setters
	          var descriptor = Object.getOwnPropertyDescriptor(instance, key) || Object.getOwnPropertyDescriptor(proto, key)
	          var hasGetterSetter = descriptor && (descriptor.get || descriptor.set)
	
	          // apply method only if it does not already exist on the instance
	          if (!self.hasOwnProperty(key) && hasGetterSetter) {
	            Object.defineProperty(self, key, descriptor)
	          } else {
	            self[key] = isFunction(instance[key]) ?
	              instance[key].bind(self) :
	              instance[key]
	          }
	        }
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
	
	    // children in loop should inherit from true parent
	    if (self._parent && self._parent.root.isLoop) {
	      inheritFrom(self._parent)
	    }
	
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
	      parent = expr.parent || expr.dom.parentNode
	
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
	        // cache the parent node because somehow it will become null on IE
	        // on the next iteration
	        expr.parent = parent
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
	      if (dom.value !== value) {
	        dom.value = value
	        setAttr(dom, attrName, value)
	      }
	      return
	    } else {
	      // remove original attribute
	      remAttr(dom, attrName)
	    }
	
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
	 * Set any DOM/SVG attribute
	 * @param { Object } dom - DOM node we want to update
	 * @param { String } name - name of the property we want to set
	 * @param { String } val - value of the property we want to set
	 */
	function setAttr(dom, name, val) {
	  var xlink = XLINK_REGEX.exec(name)
	  if (xlink && xlink[1])
	    dom.setAttributeNS(XLINK_NS, xlink[1], val)
	  else
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
	  return Object.create(parent || null)
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
	/* istanbul ignore next */
	
	// istanbul ignore next
	function safeRegex (re) {
	  var src = re.source
	  var opt = re.global ? 'g' : ''
	
	  if (re.ignoreCase) opt += 'i'
	  if (re.multiline)  opt += 'm'
	
	  for (var i = 1; i < arguments.length; i++) {
	    src = src.replace('@', '\\' + arguments[i])
	  }
	
	  return new RegExp(src, opt)
	}
	
	/**
	 * @module parsers
	 */
	var parsers = (function (win) {
	
	  var _p = {}
	
	  function _r (name) {
	    var parser = win[name]
	
	    if (parser) return parser
	
	    throw new Error('Parser "' + name + '" not loaded.')
	  }
	
	  function _req (name) {
	    var parts = name.split('.')
	
	    if (parts.length !== 2) throw new Error('Bad format for parsers._req')
	
	    var parser = _p[parts[0]][parts[1]]
	    if (parser) return parser
	
	    throw new Error('Parser "' + name + '" not found.')
	  }
	
	  function extend (obj, props) {
	    if (props) {
	      for (var prop in props) {
	        /* istanbul ignore next */
	        if (props.hasOwnProperty(prop)) {
	          obj[prop] = props[prop]
	        }
	      }
	    }
	    return obj
	  }
	
	  function renderPug (compilerName, html, opts, url) {
	    opts = extend({
	      pretty: true,
	      filename: url,
	      doctype: 'html'
	    }, opts)
	    return _r(compilerName).render(html, opts)
	  }
	
	  _p.html = {
	    jade: function (html, opts, url) {
	      /* eslint-disable */
	      console.log('DEPRECATION WARNING: jade was renamed "pug" - The jade parser will be removed in riot@3.0.0!')
	      /* eslint-enable */
	      return renderPug('jade', html, opts, url)
	    },
	    pug: function (html, opts, url) {
	      return renderPug('pug', html, opts, url)
	    }
	  }
	  _p.css = {
	    less: function (tag, css, opts, url) {
	      var ret
	
	      opts = extend({
	        sync: true,
	        syncImport: true,
	        filename: url
	      }, opts)
	      _r('less').render(css, opts, function (err, result) {
	        // istanbul ignore next
	        if (err) throw err
	        ret = result.css
	      })
	      return ret
	    }
	  }
	  _p.js = {
	    es6: function (js, opts) {
	      opts = extend({
	        blacklist: ['useStrict', 'strict', 'react'],
	        sourceMaps: false,
	        comments: false
	      }, opts)
	      return _r('babel').transform(js, opts).code
	    },
	    babel: function (js, opts, url) {
	      return _r('babel').transform(js, extend({ filename: url }, opts)).code
	    },
	    buble: function (js, opts, url) {
	      opts = extend({
	        source: url,
	        modules: false
	      }, opts)
	      return _r('buble').transform(js, opts).code
	    },
	    coffee: function (js, opts) {
	      return _r('CoffeeScript').compile(js, extend({ bare: true }, opts))
	    },
	    livescript: function (js, opts) {
	      return _r('livescript').compile(js, extend({ bare: true, header: false }, opts))
	    },
	    typescript: function (js, opts) {
	      return _r('typescript')(js, opts)
	    },
	    none: function (js) {
	      return js
	    }
	  }
	  _p.js.javascript   = _p.js.none
	  _p.js.coffeescript = _p.js.coffee
	  _p._req  = _req
	  _p.utils = {
	    extend: extend
	  }
	
	  return _p
	
	})(window || global)
	
	riot.parsers = parsers
	
	/**
	 * Compiler for riot custom tags
	 * @version v2.5.5
	 */
	var compile = (function () {
	
	  var extend = parsers.utils.extend
	  /* eslint-enable */
	
	  var S_LINESTR = /"[^"\n\\]*(?:\\[\S\s][^"\n\\]*)*"|'[^'\n\\]*(?:\\[\S\s][^'\n\\]*)*'/.source
	
	  var S_STRINGS = brackets.R_STRINGS.source
	
	  var HTML_ATTRS = / *([-\w:\xA0-\xFF]+) ?(?:= ?('[^']*'|"[^"]*"|\S+))?/g
	
	  var HTML_COMMS = RegExp(/<!--(?!>)[\S\s]*?-->/.source + '|' + S_LINESTR, 'g')
	
	  var HTML_TAGS = /<(-?[A-Za-z][-\w\xA0-\xFF]*)(?:\s+([^"'\/>]*(?:(?:"[^"]*"|'[^']*'|\/[^>])[^'"\/>]*)*)|\s*)(\/?)>/g
	
	  var HTML_PACK = />[ \t]+<(-?[A-Za-z]|\/[-A-Za-z])/g
	
	  var BOOL_ATTRS = RegExp(
	      '^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|' +
	      'compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|' +
	      'multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|' +
	      'selected|sortable|truespeed|typemustmatch)$')
	
	  var RIOT_ATTRS = ['style', 'src', 'd']
	
	  var VOID_TAGS = /^(?:input|img|br|wbr|hr|area|base|col|embed|keygen|link|meta|param|source|track)$/
	
	  var PRE_TAGS = /<pre(?:\s+(?:[^">]*|"[^"]*")*)?>([\S\s]+?)<\/pre\s*>/gi
	
	  var SPEC_TYPES = /^"(?:number|date(?:time)?|time|month|email|color)\b/i
	
	  var IMPORT_STATEMENT = /^\s*import(?:\s*[*{]|\s+[$_a-zA-Z'"]).*\n?/gm
	
	  var TRIM_TRAIL = /[ \t]+$/gm
	
	  var
	    RE_HASEXPR = safeRegex(/@#\d/, 'x01'),
	    RE_REPEXPR = safeRegex(/@#(\d+)/g, 'x01'),
	    CH_IDEXPR  = '\x01#',
	    CH_DQCODE  = '\u2057',
	    DQ = '"',
	    SQ = "'"
	
	  function cleanSource (src) {
	    var
	      mm,
	      re = HTML_COMMS
	
	    if (~src.indexOf('\r')) {
	      src = src.replace(/\r\n?/g, '\n')
	    }
	
	    re.lastIndex = 0
	    while ((mm = re.exec(src))) {
	      if (mm[0][0] === '<') {
	        src = RegExp.leftContext + RegExp.rightContext
	        re.lastIndex = mm[3] + 1
	      }
	    }
	    return src
	  }
	
	  function parseAttribs (str, pcex) {
	    var
	      list = [],
	      match,
	      type, vexp
	
	    HTML_ATTRS.lastIndex = 0
	
	    str = str.replace(/\s+/g, ' ')
	
	    while ((match = HTML_ATTRS.exec(str))) {
	      var
	        k = match[1].toLowerCase(),
	        v = match[2]
	
	      if (!v) {
	        list.push(k)
	      } else {
	
	        if (v[0] !== DQ) {
	          v = DQ + (v[0] === SQ ? v.slice(1, -1) : v) + DQ
	        }
	
	        if (k === 'type' && SPEC_TYPES.test(v)) {
	          type = v
	        } else {
	          if (RE_HASEXPR.test(v)) {
	
	            if (k === 'value') vexp = 1
	            else if (BOOL_ATTRS.test(k)) k = '__' + k
	            else if (~RIOT_ATTRS.indexOf(k)) k = 'riot-' + k
	          }
	
	          list.push(k + '=' + v)
	        }
	      }
	    }
	
	    if (type) {
	      if (vexp) type = DQ + pcex._bp[0] + SQ + type.slice(1, -1) + SQ + pcex._bp[1] + DQ
	      list.push('type=' + type)
	    }
	    return list.join(' ')
	  }
	
	  function splitHtml (html, opts, pcex) {
	    var _bp = pcex._bp
	
	    if (html && _bp[4].test(html)) {
	      var
	        jsfn = opts.expr && (opts.parser || opts.type) ? _compileJS : 0,
	        list = brackets.split(html, 0, _bp),
	        expr
	
	      for (var i = 1; i < list.length; i += 2) {
	        expr = list[i]
	        if (expr[0] === '^') {
	          expr = expr.slice(1)
	        } else if (jsfn) {
	          expr = jsfn(expr, opts).trim()
	          if (expr.slice(-1) === ';') expr = expr.slice(0, -1)
	        }
	        list[i] = CH_IDEXPR + (pcex.push(expr) - 1) + _bp[1]
	      }
	      html = list.join('')
	    }
	    return html
	  }
	
	  function restoreExpr (html, pcex) {
	    if (pcex.length) {
	      html = html.replace(RE_REPEXPR, function (_, d) {
	
	        return pcex._bp[0] + pcex[d].trim().replace(/[\r\n]+/g, ' ').replace(/"/g, CH_DQCODE)
	      })
	    }
	    return html
	  }
	
	  function _compileHTML (html, opts, pcex) {
	    if (!/\S/.test(html)) return ''
	
	    html = splitHtml(html, opts, pcex)
	      .replace(HTML_TAGS, function (_, name, attr, ends) {
	
	        name = name.toLowerCase()
	
	        ends = ends && !VOID_TAGS.test(name) ? '></' + name : ''
	
	        if (attr) name += ' ' + parseAttribs(attr, pcex)
	
	        return '<' + name + ends + '>'
	      })
	
	    if (!opts.whitespace) {
	      var p = []
	
	      if (/<pre[\s>]/.test(html)) {
	        html = html.replace(PRE_TAGS, function (q) {
	          p.push(q)
	          return '\u0002'
	        })
	      }
	
	      html = html.trim().replace(/\s+/g, ' ')
	
	      if (p.length) html = html.replace(/\u0002/g, function () { return p.shift() })
	    }
	
	    if (opts.compact) html = html.replace(HTML_PACK, '><$1')
	
	    return restoreExpr(html, pcex).replace(TRIM_TRAIL, '')
	  }
	
	  function compileHTML (html, opts, pcex) {
	
	    if (Array.isArray(opts)) {
	      pcex = opts
	      opts = {}
	    } else {
	      if (!pcex) pcex = []
	      if (!opts) opts = {}
	    }
	
	    pcex._bp = brackets.array(opts.brackets)
	
	    return _compileHTML(cleanSource(html), opts, pcex)
	  }
	
	  var JS_ES6SIGN = /^[ \t]*([$_A-Za-z][$\w]*)\s*\([^()]*\)\s*{/m
	
	  var JS_ES6END = RegExp('[{}]|' + brackets.S_QBLOCKS, 'g')
	
	  var JS_COMMS = RegExp(brackets.R_MLCOMMS.source + '|//[^\r\n]*|' + brackets.S_QBLOCKS, 'g')
	
	  function riotjs (js) {
	    var
	      parts = [],
	      match,
	      toes5,
	      pos,
	      name,
	      RE = RegExp
	
	    if (~js.indexOf('/')) js = rmComms(js, JS_COMMS)
	
	    while ((match = js.match(JS_ES6SIGN))) {
	
	      parts.push(RE.leftContext)
	      js  = RE.rightContext
	      pos = skipBody(js, JS_ES6END)
	
	      name  = match[1]
	      toes5 = !/^(?:if|while|for|switch|catch|function)$/.test(name)
	      name  = toes5 ? match[0].replace(name, 'this.' + name + ' = function') : match[0]
	      parts.push(name, js.slice(0, pos))
	      js = js.slice(pos)
	
	      if (toes5 && !/^\s*.\s*bind\b/.test(js)) parts.push('.bind(this)')
	    }
	
	    return parts.length ? parts.join('') + js : js
	
	    function rmComms (s, r, m) {
	      r.lastIndex = 0
	      while ((m = r.exec(s))) {
	        if (m[0][0] === '/' && !m[1] && !m[2]) {
	          s = RE.leftContext + ' ' + RE.rightContext
	          r.lastIndex = m[3] + 1
	        }
	      }
	      return s
	    }
	
	    function skipBody (s, r) {
	      var m, i = 1
	
	      r.lastIndex = 0
	      while (i && (m = r.exec(s))) {
	        if (m[0] === '{') ++i
	        else if (m[0] === '}') --i
	      }
	      return i ? s.length : r.lastIndex
	    }
	  }
	
	  function _compileJS (js, opts, type, parserOpts, url) {
	    if (!/\S/.test(js)) return ''
	    if (!type) type = opts.type
	
	    var parser = opts.parser || type && parsers._req('js.' + type, true) || riotjs
	
	    return parser(js, parserOpts, url).replace(/\r\n?/g, '\n').replace(TRIM_TRAIL, '')
	  }
	
	  function compileJS (js, opts, type, userOpts) {
	    if (typeof opts === 'string') {
	      userOpts = type
	      type = opts
	      opts = {}
	    }
	    if (type && typeof type === 'object') {
	      userOpts = type
	      type = ''
	    }
	    if (!userOpts) userOpts = {}
	
	    return _compileJS(js, opts || {}, type, userOpts.parserOptions, userOpts.url)
	  }
	
	  var CSS_SELECTOR = RegExp('([{}]|^)[ ;]*([^@ ;{}][^{}]*)(?={)|' + S_LINESTR, 'g')
	
	  function scopedCSS (tag, css) {
	    var scope = ':scope'
	
	    return css.replace(CSS_SELECTOR, function (m, p1, p2) {
	
	      if (!p2) return m
	
	      p2 = p2.replace(/[^,]+/g, function (sel) {
	        var s = sel.trim()
	
	        if (!s || s === 'from' || s === 'to' || s.slice(-1) === '%') {
	          return sel
	        }
	
	        if (s.indexOf(scope) < 0) {
	          s = tag + ' ' + s + ',[riot-tag="' + tag + '"] ' + s +
	                              ',[data-is="' + tag + '"] ' + s
	        } else {
	          s = s.replace(scope, tag) + ',' +
	              s.replace(scope, '[riot-tag="' + tag + '"]') + ',' +
	              s.replace(scope, '[data-is="' + tag + '"]')
	        }
	        return s
	      })
	
	      return p1 ? p1 + ' ' + p2 : p2
	    })
	  }
	
	  function _compileCSS (css, tag, type, opts) {
	    var scoped = (opts || (opts = {})).scoped
	
	    if (type) {
	      if (type === 'scoped-css') {
	        scoped = true
	      } else if (type !== 'css') {
	
	        var parser = parsers._req('css.' + type, true)
	        css = parser(tag, css, opts.parserOpts || {}, opts.url)
	      }
	    }
	
	    css = css.replace(brackets.R_MLCOMMS, '').replace(/\s+/g, ' ').trim()
	
	    if (scoped) {
	      if (!tag) {
	        throw new Error('Can not parse scoped CSS without a tagName')
	      }
	      css = scopedCSS(tag, css)
	    }
	    return css
	  }
	
	  function compileCSS (css, type, opts) {
	    if (type && typeof type === 'object') {
	      opts = type
	      type = ''
	    } else if (!opts) opts = {}
	
	    return _compileCSS(css, opts.tagName, type, opts)
	  }
	
	  var TYPE_ATTR = /\stype\s*=\s*(?:(['"])(.+?)\1|(\S+))/i
	
	  var MISC_ATTR = '\\s*=\\s*(' + S_STRINGS + '|{[^}]+}|\\S+)'
	
	  var END_TAGS = /\/>\n|^<(?:\/?-?[A-Za-z][-\w\xA0-\xFF]*\s*|-?[A-Za-z][-\w\xA0-\xFF]*\s+[-\w:\xA0-\xFF][\S\s]*?)>\n/
	
	  function _q (s, r) {
	    if (!s) return "''"
	    s = SQ + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + SQ
	    return r && ~s.indexOf('\n') ? s.replace(/\n/g, '\\n') : s
	  }
	
	  function mktag (name, html, css, attr, js, imports, opts) {
	    var
	      c = opts.debug ? ',\n  ' : ', ',
	      s = '});'
	
	    if (js && js.slice(-1) !== '\n') s = '\n' + s
	
	    return imports + 'riot.tag2(\'' + name + SQ +
	      c + _q(html, 1) +
	      c + _q(css) +
	      c + _q(attr) + ', function(opts) {\n' + js + s
	  }
	
	  function splitBlocks (str) {
	    if (/<[-\w]/.test(str)) {
	      var
	        m,
	        k = str.lastIndexOf('<'),
	        n = str.length
	
	      while (~k) {
	        m = str.slice(k, n).match(END_TAGS)
	        if (m) {
	          k += m.index + m[0].length
	          m = str.slice(0, k)
	          if (m.slice(-5) === '<-/>\n') m = m.slice(0, -5)
	          return [m, str.slice(k)]
	        }
	        n = k
	        k = str.lastIndexOf('<', k - 1)
	      }
	    }
	    return ['', str]
	  }
	
	  function getType (attribs) {
	    if (attribs) {
	      var match = attribs.match(TYPE_ATTR)
	
	      match = match && (match[2] || match[3])
	      if (match) {
	        return match.replace('text/', '')
	      }
	    }
	    return ''
	  }
	
	  function getAttrib (attribs, name) {
	    if (attribs) {
	      var match = attribs.match(RegExp('\\s' + name + MISC_ATTR, 'i'))
	
	      match = match && match[1]
	      if (match) {
	        return (/^['"]/).test(match) ? match.slice(1, -1) : match
	      }
	    }
	    return ''
	  }
	
	  function unescapeHTML (str) {
	    return str
	            .replace(/&amp;/g, '&')
	            .replace(/&lt;/g, '<')
	            .replace(/&gt;/g, '>')
	            .replace(/&quot;/g, '"')
	            .replace(/&#039;/g, '\'')
	  }
	
	  function getParserOptions (attribs) {
	    var opts = unescapeHTML(getAttrib(attribs, 'options'))
	
	    return opts ? JSON.parse(opts) : null
	  }
	
	  function getCode (code, opts, attribs, base) {
	    var
	      type = getType(attribs),
	      src  = getAttrib(attribs, 'src'),
	      jsParserOptions = extend({}, opts.parserOptions.js)
	
	    if (src) return false
	
	    return _compileJS(
	            code,
	            opts,
	            type,
	            extend(jsParserOptions, getParserOptions(attribs)),
	            base
	          )
	  }
	
	  function cssCode (code, opts, attribs, url, tag) {
	    var
	      parserStyleOptions = extend({}, opts.parserOptions.style),
	      extraOpts = {
	        parserOpts: extend(parserStyleOptions, getParserOptions(attribs)),
	        scoped: attribs && /\sscoped(\s|=|$)/i.test(attribs),
	        url: url
	      }
	
	    return _compileCSS(code, tag, getType(attribs) || opts.style, extraOpts)
	  }
	
	  function compileTemplate (html, url, lang, opts) {
	
	    var parser = parsers._req('html.' + lang, true)
	    return parser(html, opts, url)
	  }
	
	  var
	
	    CUST_TAG = RegExp(/^([ \t]*)<(-?[A-Za-z][-\w\xA0-\xFF]*)(?:\s+([^'"\/>]+(?:(?:@|\/[^>])[^'"\/>]*)*)|\s*)?(?:\/>|>[ \t]*\n?([\S\s]*)^\1<\/\2\s*>|>(.*)<\/\2\s*>)/
	      .source.replace('@', S_STRINGS), 'gim'),
	
	    SCRIPTS = /<script(\s+[^>]*)?>\n?([\S\s]*?)<\/script\s*>/gi,
	
	    STYLES = /<style(\s+[^>]*)?>\n?([\S\s]*?)<\/style\s*>/gi
	
	  function compile (src, opts, url) {
	    var
	      parts = [],
	      included,
	      defaultParserptions = {
	
	        template: {},
	        js: {},
	        style: {}
	      }
	
	    if (!opts) opts = {}
	
	    opts.parserOptions = extend(defaultParserptions, opts.parserOptions || {})
	
	    included = opts.exclude
	      ? function (s) { return opts.exclude.indexOf(s) < 0 } : function () { return 1 }
	
	    if (!url) url = ''
	
	    var _bp = brackets.array(opts.brackets)
	
	    if (opts.template) {
	      src = compileTemplate(src, url, opts.template, opts.parserOptions.template)
	    }
	
	    src = cleanSource(src)
	      .replace(CUST_TAG, function (_, indent, tagName, attribs, body, body2) {
	        var
	          jscode = '',
	          styles = '',
	          html = '',
	          imports = '',
	          pcex = []
	
	        pcex._bp = _bp
	
	        tagName = tagName.toLowerCase()
	
	        attribs = attribs && included('attribs')
	          ? restoreExpr(
	              parseAttribs(
	                splitHtml(attribs, opts, pcex),
	              pcex),
	            pcex) : ''
	
	        if ((body || (body = body2)) && /\S/.test(body)) {
	
	          if (body2) {
	
	            if (included('html')) html = _compileHTML(body2, opts, pcex)
	          } else {
	
	            body = body.replace(RegExp('^' + indent, 'gm'), '')
	
	            body = body.replace(STYLES, function (_m, _attrs, _style) {
	              if (included('css')) {
	                styles += (styles ? ' ' : '') + cssCode(_style, opts, _attrs, url, tagName)
	              }
	              return ''
	            })
	
	            body = body.replace(SCRIPTS, function (_m, _attrs, _script) {
	              if (included('js')) {
	                var code = getCode(_script, opts, _attrs, url)
	
	                if (code) jscode += (jscode ? '\n' : '') + code
	              }
	              return ''
	            })
	
	            var blocks = splitBlocks(body.replace(TRIM_TRAIL, ''))
	
	            if (included('html')) {
	              html = _compileHTML(blocks[0], opts, pcex)
	            }
	
	            if (included('js')) {
	              body = _compileJS(blocks[1], opts, null, null, url)
	              if (body) jscode += (jscode ? '\n' : '') + body
	              jscode = jscode.replace(IMPORT_STATEMENT, function (s) {
	                imports += s.trim() + '\n'
	                return ''
	              })
	            }
	          }
	        }
	
	        jscode = /\S/.test(jscode) ? jscode.replace(/\n{3,}/g, '\n\n') : ''
	
	        if (opts.entities) {
	          parts.push({
	            tagName: tagName,
	            html: html,
	            css: styles,
	            attribs: attribs,
	            js: jscode,
	            imports: imports
	          })
	          return ''
	        }
	
	        return mktag(tagName, html, styles, attribs, jscode, imports, opts)
	      })
	
	    if (opts.entities) return parts
	
	    return src
	  }
	
	  riot.util.compiler = {
	    compile: compile,
	    html: compileHTML,
	    css: compileCSS,
	    js: compileJS,
	    version: 'v2.5.5'
	  }
	  return compile
	
	})()
	
	/*
	  Compilation for the browser
	*/
	riot.compile = (function () {
	
	  var
	    promise,    // emits the 'ready' event and runs the first callback
	    ready       // all the scripts were compiled?
	
	  // gets the source of an external tag with an async call
	  function GET (url, fn, opts) {
	    var req = new XMLHttpRequest()
	
	    req.onreadystatechange = function () {
	      if (req.readyState === 4 &&
	         (req.status === 200 || !req.status && req.responseText.length)) {
	        fn(req.responseText, opts, url)
	      }
	    }
	    req.open('GET', url, true)
	    req.send('')
	  }
	
	  // evaluates a compiled tag within the global context
	  function globalEval (js, url) {
	    if (typeof js === T_STRING) {
	      var
	        node = mkEl('script'),
	        root = document.documentElement
	
	      // make the source available in the "(no domain)" tab
	      // of Chrome DevTools, with a .js extension
	      if (url) js += '\n//# sourceURL=' + url + '.js'
	
	      node.text = js
	      root.appendChild(node)
	      root.removeChild(node)
	    }
	  }
	
	  // compiles all the internal and external tags on the page
	  function compileScripts (fn, xopt) {
	    var
	      scripts = $$('script[type="riot/tag"]'),
	      scriptsAmount = scripts.length
	
	    function done() {
	      promise.trigger('ready')
	      ready = true
	      if (fn) fn()
	    }
	
	    function compileTag (src, opts, url) {
	      var code = compile(src, opts, url)
	
	      globalEval(code, url)
	      if (!--scriptsAmount) done()
	    }
	
	    if (!scriptsAmount) done()
	    else {
	      for (var i = 0; i < scripts.length; ++i) {
	        var
	          script = scripts[i],
	          opts = extend({template: getAttr(script, 'template')}, xopt),
	          url = getAttr(script, 'src')
	
	        url ? GET(url, compileTag, opts) : compileTag(script.innerHTML, opts)
	      }
	    }
	  }
	
	  //// Entry point -----
	
	  return function (arg, fn, opts) {
	
	    if (typeof arg === T_STRING) {
	
	      // 2nd parameter is optional, but can be null
	      if (isObject(fn)) {
	        opts = fn
	        fn = false
	      }
	
	      // `riot.compile(tag [, callback | true][, options])`
	      if (/^\s*</m.test(arg)) {
	        var js = compile(arg, opts)
	        if (fn !== true) globalEval(js)
	        if (isFunction(fn)) fn(js, arg, opts)
	        return js
	      }
	
	      // `riot.compile(url [, callback][, options])`
	      GET(arg, function (str, opts, url) {
	        var js = compile(str, opts, url)
	        globalEval(js, url)
	        if (fn) fn(js, str, opts)
	      }, opts)
	
	    }
	    else {
	
	      // `riot.compile([callback][, options])`
	      if (isFunction(arg)) {
	        opts = fn
	        fn = arg
	      } else {
	        opts = arg
	        fn = undefined
	      }
	
	      if (ready) {
	        return fn && fn()
	      }
	
	      if (promise) {
	        if (fn) promise.on('ready', fn)
	
	      } else {
	        promise = riot.observable()
	        compileScripts(fn, opts)
	      }
	    }
	  }
	
	})()
	
	// reassign mount methods -----
	var mount = riot.mount
	
	riot.mount = function (a, b, c) {
	  var ret
	  riot.compile(function () { ret = mount(a, b, c) })
	  return ret
	}
	  // support CommonJS, AMD & browser
	  /* istanbul ignore next */
	  if (typeof exports === T_OBJECT)
	    module.exports = riot
	  else if ("function" === T_FUNCTION && typeof __webpack_require__(166) !== T_UNDEF)
	    !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return riot }.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	  else
	    window.riot = riot
	
	})(typeof window != 'undefined' ? window : void 0);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 166 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(168);
	__webpack_require__(172);
	__webpack_require__(174);
	__webpack_require__(177);
	__webpack_require__(190);
	__webpack_require__(193);
	__webpack_require__(195);
	__webpack_require__(197);
	__webpack_require__(203);
	__webpack_require__(205);
	__webpack_require__(211);
	__webpack_require__(212);
	__webpack_require__(213);
	__webpack_require__(218);
	__webpack_require__(228);
	__webpack_require__(243);
	__webpack_require__(245);
	__webpack_require__(222);
	__webpack_require__(247);
	__webpack_require__(224);
	__webpack_require__(181);
	__webpack_require__(249);
	__webpack_require__(251);
	__webpack_require__(220);
	__webpack_require__(253);


/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(169);
	
	__webpack_require__(170);
	
	var _gbBreadcrumbs = __webpack_require__(171);
	
	riot.tag2('gb-breadcrumbs', '<yield> <div class="gb-breadcrumbs {_style}"> <div class="gb-query-crumb" if="{!hideQuery && originalQuery}">{originalQuery}</div> <gb-list items="{selected}" if="{!hideRefinements}" scope="gb-breadcrumbs"> <gb-list class="gb-navigation-crumb" items="{item.refinements}" inline> <gb-refinement-crumb nav="{parent.item}" ref="{item}"></gb-refinement-crumb> </gb-list> </gb-list> </div> </yield>', 'gb-breadcrumbs .gb-stylish.gb-breadcrumbs,[riot-tag="gb-breadcrumbs"] .gb-stylish.gb-breadcrumbs,[data-is="gb-breadcrumbs"] .gb-stylish.gb-breadcrumbs{ display: flex; justify-content: flex-start; align-items: baseline; }', '', function (opts) {
	    this._mixin(_gbBreadcrumbs.Breadcrumbs);
	});

/***/ },
/* 169 */
/***/ function(module, exports) {

	'use strict';
	
	riot.tag2('gb-list', '<ul class="{_style} {inline: \'inline\' in opts}"> <li each="{item, i in opts.items}" class="{active: isActive(i)}"> <yield></yield> </li> </ul>', 'gb-list > ul.gb-stylish { list-style: none; margin: 0; padding: 0; } gb-list > ul.gb-stylish > li { margin: 0 10px; } gb-list > ul.gb-stylish.inline > li { display: inline-block; } gb-list > ul.gb-stylish a { color: #888; cursor: pointer; } gb-list > ul.gb-stylish a:hover { color: black; }', '', function (opts) {
	    this.isActive = opts.activation;
	});

/***/ },
/* 170 */
/***/ function(module, exports) {

	'use strict';
	
	riot.tag2('gb-refinement-crumb', '<a onclick="{remove}">&times;</a> <b>{nav.displayName}: {_scope.toView(ref)}</b>', '', '', function (opts) {
	    var _this = this;
	
	    this.remove = function () {
	        return _this._scope.remove(opts.ref, opts.nav);
	    };
	    this.nav = opts.nav;
	    this.ref = opts.ref;
	});

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(40);
	var groupby_api_1 = __webpack_require__(102);
	var Breadcrumbs = (function () {
	    function Breadcrumbs() {
	    }
	    Breadcrumbs.prototype.init = function () {
	        var _this = this;
	        this.toView = common_1.displayRefinement;
	        this.hideQuery = common_1.checkBooleanAttr('hideQuery', this.opts);
	        this.hideRefinements = common_1.checkBooleanAttr('hideRefinements', this.opts);
	        this.flux.on(groupby_api_1.Events.RESULTS, function (_a) {
	            var originalQuery = _a.originalQuery, selectedNavigation = _a.selectedNavigation;
	            _this.updateQuery(originalQuery);
	            _this.updateRefinements(selectedNavigation);
	        });
	        this.flux.on(groupby_api_1.Events.RESET, function () { return _this.clearRefinements(); });
	    };
	    Breadcrumbs.prototype.clearRefinements = function () {
	        this.updateRefinements([]);
	    };
	    Breadcrumbs.prototype.updateRefinements = function (selected) {
	        this.update({ selected: selected });
	    };
	    Breadcrumbs.prototype.updateQuery = function (originalQuery) {
	        this.update({ originalQuery: originalQuery });
	    };
	    Breadcrumbs.prototype.remove = function (ref, nav) {
	        this.flux.unrefine(common_1.toRefinement(ref, nav));
	    };
	    return Breadcrumbs;
	}());
	exports.Breadcrumbs = Breadcrumbs;


/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(169);
	
	var _gbCarousel = __webpack_require__(173);
	
	riot.tag2('gb-carousel', '<a class="gb-carousel__previous-link" onclick="{prev}">Prev</a> <gb-list items="{options}" activation="{isSelected}"> <yield></yield> </gb-list> <a class="gb-carousel__next-link" onclick="{next}">Next</a>', 'gb-carousel gb-list > ul > li:not(.active),[riot-tag="gb-carousel"] gb-list > ul > li:not(.active),[data-is="gb-carousel"] gb-list > ul > li:not(.active){ display: none; }', '', function (opts) {
	    this._mixin(_gbCarousel.Carousel);
	});

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(40);
	var Carousel = (function () {
	    function Carousel() {
	    }
	    Carousel.prototype.init = function () {
	        this.currentIndex = 0;
	        this.options = common_1.unless(this.opts.options, this._scope.options, []);
	    };
	    Carousel.prototype.isSelected = function (index) {
	        return this.currentIndex === index;
	    };
	    Carousel.prototype.next = function () {
	        this.update({ currentIndex: Math.min(this.currentIndex + 1, this.options.length - 1) });
	    };
	    Carousel.prototype.prev = function () {
	        this.update({ currentIndex: Math.max(this.currentIndex - 1, 0) });
	    };
	    return Carousel;
	}());
	exports.Carousel = Carousel;


/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(175);
	
	__webpack_require__(176);
	
	riot.tag2('gb-category-menu', '<div class="gb-menu {_style}"> <div class="gb-menu__item" each="{opts.sections}"> <gb-category-dropdown class="gb-category-dropdown"></gb-category-dropdown> </div> </div>', 'gb-category-menu .gb-stylish.gb-menu,[riot-tag="gb-category-menu"] .gb-stylish.gb-menu,[data-is="gb-category-menu"] .gb-stylish.gb-menu{ display: flex; flex-direction: row; justify-content: center; }', '', function (opts) {});

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	riot.tag2('gb-category-dropdown', '<div class="gb-dropdown {_style}"> <button type="button" class="gb-dropdown__button">{name}</button> <div class="gb-dropdown__content"> <gb-category-section if="{items}"></gb-category-section> <gb-category-section each="{subsections}" named="{true}"></gb-category-section> </div> <div class="gb-dropdown__images"> <img src="" each="{results.images}"> </div> </div>', 'gb-category-dropdown .gb-dropdown,[riot-tag="gb-category-dropdown"] .gb-dropdown,[data-is="gb-category-dropdown"] .gb-dropdown{ position: relative; display: inline-block; } gb-category-dropdown .gb-dropdown__content,[riot-tag="gb-category-dropdown"] .gb-dropdown__content,[data-is="gb-category-dropdown"] .gb-dropdown__content{ display: none; position: absolute; min-width: 160px; background-color: #fff; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); } gb-category-dropdown .gb-dropdown:hover .gb-dropdown__content,[riot-tag="gb-category-dropdown"] .gb-dropdown:hover .gb-dropdown__content,[data-is="gb-category-dropdown"] .gb-dropdown:hover .gb-dropdown__content{ display: block; } gb-category-dropdown .gb-stylish .gb-dropdown__button,[riot-tag="gb-category-dropdown"] .gb-stylish .gb-dropdown__button,[data-is="gb-category-dropdown"] .gb-stylish .gb-dropdown__button{ border: none; cursor: pointer; padding: 16px; width: 100%; } gb-category-dropdown .gb-stylish .gb-dropdown__content,[riot-tag="gb-category-dropdown"] .gb-stylish .gb-dropdown__content,[data-is="gb-category-dropdown"] .gb-stylish .gb-dropdown__content{ flex-wrap: wrap; background-color: #f9f9f9; min-width: 272px; } gb-category-dropdown .gb-stylish.gb-dropdown:hover .gb-dropdown__content,[riot-tag="gb-category-dropdown"] .gb-stylish.gb-dropdown:hover .gb-dropdown__content,[data-is="gb-category-dropdown"] .gb-stylish.gb-dropdown:hover .gb-dropdown__content{ display: flex; }', '', function (opts) {
	  var sayt = __webpack_require__(155);
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

/***/ },
/* 176 */
/***/ function(module, exports) {

	'use strict';
	
	riot.tag2('gb-category-section', '<div class="gb-category-section {_style}"> <a if="{opts.named}" class="gb-category-section__header" onmouseover="{updateSectionImages}" data-try="{name}">{name}</a> <a each="{item in items}" class="gb-category-section__link" onmouseover="{updateCategoryImages}">{item}</a> </div>', 'gb-category-section .gb-stylish.gb-category-section,[riot-tag="gb-category-section"] .gb-stylish.gb-category-section,[data-is="gb-category-section"] .gb-stylish.gb-category-section{ min-width: 120px; flex-wrap: wrap; padding: 6px 8px; } gb-category-section .gb-stylish .gb-category-section__header,[riot-tag="gb-category-section"] .gb-stylish .gb-category-section__header,[data-is="gb-category-section"] .gb-stylish .gb-category-section__header{ padding: 6px 4px; margin: 0; font-size: 1.1em; font-weight: bold; } gb-category-section .gb-stylish a,[riot-tag="gb-category-section"] .gb-stylish a,[data-is="gb-category-section"] .gb-stylish a{ padding: 3px 4px; text-decoration: none; display: block; } gb-category-section .gb-stylish a:hover,[riot-tag="gb-category-section"] .gb-stylish a:hover,[data-is="gb-category-section"] .gb-stylish a:hover{ background-color: #f1f1f1; }', '', function (opts) {
	    this.parentOpts = this.parent.parent.opts;
	    this.updateSectionImages = this.parent.parent.updateSectionImages;
	    this.updateCategoryImages = this.parent.parent.updateCategoryImages;
	});

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(178);
	
	__webpack_require__(180);
	
	__webpack_require__(179);
	
	__webpack_require__(169);
	
	__webpack_require__(181);
	
	var _gbCollections = __webpack_require__(189);
	
	riot.tag2('gb-collections', '<yield> <gb-list class="gb-collections {_style}" items="{collections}" if="{!dropdown}" scope="gb-collections" inline> <gb-collection-item></gb-collection-item> </gb-list> <gb-select if="{dropdown}" scope="gb-collections"> <gb-custom-select> <gb-collection-dropdown-item></gb-collection-dropdown-item> </gb-custom-select> </gb-select> </yield>', '', '', function (opts) {
	    this._mixin(_gbCollections.Collections);
	});

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(179);
	
	riot.tag2('gb-collection-item', '<a class="gb-collection" data-collection="{item}" onclick="{_scope.switchCollection}"> <span class="gb-collection__name">{_scope.labels[item] || item}</span> <gb-badge if="{_scope.fetchCounts}">{_scope.counts[item]}</gb-badge> </a>', '', '', function (opts) {});

/***/ },
/* 179 */
/***/ function(module, exports) {

	'use strict';
	
	riot.tag2('gb-badge', '<span class="{_style}"><yield></yield></span>', 'gb-badge .gb-stylish,[riot-tag="gb-badge"] .gb-stylish,[data-is="gb-badge"] .gb-stylish{ display: inline-block; min-width: 10px; max-height: 20px; padding: 4px 7px; border-radius: 10px; font-size: 12px; font-weight: bold; line-height: 1; color: #fff; background-color: #ccc; text-align: center; white-space: nowrap; vertical-align: middle; }', '', function (opts) {});

/***/ },
/* 180 */
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	riot.tag2('gb-collection-dropdown-item', '<a class="gb-collection" onclick="{selectDropdown}"> <span class="gb-collection__name">{option.label || option}</span> <gb-badge>{_scope.counts[option.value || option]}</gb-badge> </a>', '', '', function (opts) {
	  var _this = this;
	
	  this.selectDropdown = function () {
	    if (_typeof(_this.option) === 'object') {
	      _this._scope.selectCustom(_this.option);
	    } else {
	      _this._scope.selectCustom({
	        label: _this.option,
	        value: _this.option
	      });
	    }
	  };
	});

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(182);
	
	__webpack_require__(185);
	
	var _gbSelect = __webpack_require__(183);
	
	riot.tag2('gb-select', '<yield> <gb-native-select if="{native}"></gb-native-select> <gb-custom-select if="{!native}"></gb-custom-select> </yield>', '', '', function (opts) {
	    this._mixin(_gbSelect.Select);
	});

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _gbSelect = __webpack_require__(183);
	
	riot.tag2('gb-native-select', '<select name="selector" onchange="{_scope.selectNative}"> <option if="{!_scope.default}" value="" selected disabled>{_scope.selectLabel()}</option> <option each="{option in _scope.options}" if="{!option.clear}" value="{optionValue(option)}">{optionLabel(option)}</option> </select>', '', '', function (opts) {
	    this.optionLabel = _gbSelect.Select.optionLabel;
	    this.optionValue = _gbSelect.Select.optionValue;
	    this._scopeTo('gb-select');
	});

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(40);
	var Select = (function () {
	    function Select() {
	    }
	    Select.prototype.init = function () {
	        this.iconUrl = __webpack_require__(184);
	        var _scope = this._scope;
	        this.clearOption = {
	            label: _scope.clear || 'Unselect',
	            clear: true
	        };
	        this.options = common_1.unless(_scope.options, []);
	        this.callback = _scope.onselect;
	        this.default = _scope.clear === undefined;
	        this.label = _scope.label || 'Select';
	        this.hover = common_1.checkBooleanAttr('hover', _scope._config);
	        this.native = common_1.checkBooleanAttr('native', _scope._config);
	        if (this.default) {
	            this.selectedOption = typeof this.options[0] === 'object' ? this.options[0].label : this.options[0];
	        }
	    };
	    Select.prototype.updateOptions = function (options) {
	        this.update({ options: this.default ? options : [this.clearOption].concat(options) });
	    };
	    Select.prototype.selectLabel = function () {
	        return this.selectedOption || (this.selected ? this.clearOption : this.label);
	    };
	    Select.prototype.prepFocus = function () {
	        return this.focused = false;
	    };
	    Select.prototype.selectButton = function () {
	        return this.tags['gb-custom-select'].tags['gb-select-button'].root;
	    };
	    Select.prototype.nativeSelect = function () {
	        if (this.tags['gb-native-select']) {
	            return this.tags['gb-native-select'].selector;
	        }
	        else {
	            return this.root.querySelector('select');
	        }
	    };
	    Select.prototype.unfocus = function () {
	        this.focused = this.hover || !this.focused;
	        if (!this.focused)
	            this.selectButton().blur();
	    };
	    Select.prototype.selectOption = function (selectedOption, value) {
	        this.update({ selectedOption: selectedOption });
	        if (this.callback) {
	            try {
	                this.callback(JSON.parse(value));
	            }
	            catch (e) {
	                this.callback(value || '*');
	            }
	        }
	    };
	    Select.prototype.selectNative = function (event) {
	        var option = Array.from(event.target.selectedOptions)[0];
	        var selected = option.value;
	        this.nativeSelect().options[0].disabled = !selected;
	        this.update({ selected: selected });
	        this.selectOption(option.text, selected);
	    };
	    Select.prototype.selectCustom = function (_a) {
	        var value = _a.value, label = _a.label;
	        this.selectButton().blur();
	        this.selectOption(label, value);
	    };
	    Select.prototype.clearSelection = function () {
	        return this.selectOption(undefined, '*');
	    };
	    Select.optionValue = function (option) {
	        return typeof option === 'object' ? JSON.stringify(option.value) : option;
	    };
	    Select.optionLabel = function (option) {
	        return typeof option === 'object' ? option.label : option;
	    };
	    return Select;
	}());
	exports.Select = Select;


/***/ },
/* 184 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAPFBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADQLyYwAAAAE3RSTlMADQ46Ozw9SElKS0y5x+zz9Pj5WslQRAAAAQdJREFUeJztzlcOwkAQBFFyxjbM/e9KFsbrNGK3V6Cq/1a/yYSIiIiIiIiIiIiIfqRp8kF/q2LtG+yLedT/yk4uwf5sZUTBsjJzCa7/FlFw//cI7v/xBMvSzCV4/scSLF7/ZueN6z+OoPY/TlD7jyI4mLkEH/9mh68Bs6NL0Pg/zr4G+AQJ/l2CJP8OQaL/ULAV/48UJPwfJUj6P0KQ+H9QkPx/QCD4DwU78X+PQPTfKZD9dwiE/60C6X+LQPwfCtT/gUD+3yfQ/HcLVP9dAt1/u0D53ybQ/ocC9X9ToP//FOT4rwvy/L8Fuf5fgnz/D0HO/5sg7/9VkPmfiIiIiIiIiIiIiP6gC0vzP5P1npi3AAAAAElFTkSuQmCC"

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(186);
	
	__webpack_require__(187);
	
	__webpack_require__(188);
	
	riot.tag2('gb-custom-select', '<div class="gb-select {_scope.hover ? \'hoverable\' : \'clickable\'} {_style}"> <button data-is="gb-select-button" type="button"></button> <gb-option-list> <yield> <gb-option option="{option}" send="{option.clear ? _scope.clearSelection : _scope.selectCustom}"></gb-option> </yield> </gb-option-list> </div>', 'gb-custom-select .gb-select,[riot-tag="gb-custom-select"] .gb-select,[data-is="gb-custom-select"] .gb-select{ position: relative; display: inline-block; } gb-custom-select gb-option-list,[riot-tag="gb-custom-select"] gb-option-list,[data-is="gb-custom-select"] gb-option-list{ display: none; z-index: 100; position: absolute; min-width: 160px; background-color: #f6f6f6; box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2); max-height: 300px; overflow-y: scroll; } gb-custom-select .gb-select.hoverable:hover gb-option-list,[riot-tag="gb-custom-select"] .gb-select.hoverable:hover gb-option-list,[data-is="gb-custom-select"] .gb-select.hoverable:hover gb-option-list,gb-custom-select .gb-select.clickable button:focus + gb-option-list,[riot-tag="gb-custom-select"] .gb-select.clickable button:focus + gb-option-list,[data-is="gb-custom-select"] .gb-select.clickable button:focus + gb-option-list,gb-custom-select gb-option-list:hover,[riot-tag="gb-custom-select"] gb-option-list:hover,[data-is="gb-custom-select"] gb-option-list:hover{ display: block; } gb-custom-select .gb-stylish.gb-select:hover button,[riot-tag="gb-custom-select"] .gb-stylish.gb-select:hover button,[data-is="gb-custom-select"] .gb-stylish.gb-select:hover button,gb-custom-select .gb-stylish.gb-select button:focus,[riot-tag="gb-custom-select"] .gb-stylish.gb-select button:focus,[data-is="gb-custom-select"] .gb-stylish.gb-select button:focus{ border-color: #aaa; } gb-custom-select button,[riot-tag="gb-custom-select"] button,[data-is="gb-custom-select"] button{ overflow-x: hidden; display: flex; align-items: center; font-size: 14px; border: none; cursor: pointer; padding: 8px 16px; width: 100%; background-color: #eee; border: 2px solid #ddd; border-radius: 4px; white-space: nowrap; } gb-custom-select .gb-stylish button:focus,[riot-tag="gb-custom-select"] .gb-stylish button:focus,[data-is="gb-custom-select"] .gb-stylish button:focus{ outline: none; }', '', function (opts) {
	    this._scopeTo('gb-select');
	});

/***/ },
/* 186 */
/***/ function(module, exports) {

	'use strict';
	
	riot.tag2('gb-select-button', '<yield> <span class="gb-button__label">{_scope.selectLabel()}</span> <img riot-src="{_scope.iconUrl}" alt=""> </yield>', 'gb-select-button img,[riot-tag="gb-select-button"] img,[data-is="gb-select-button"] img{ margin-left: 10px; margin-top: 2px; height: 24px; }', '', function (opts) {
	    this.root.addEventListener('focus', this._scope.prepFocus);
	    this.root.addEventListener('click', this._scope.unFocus);
	});

/***/ },
/* 187 */
/***/ function(module, exports) {

	'use strict';
	
	riot.tag2('gb-option-list', '<ul> <li each="{option in _scope.options}" class="gb-select__option {clear: option.clear}" if="{option.clear ? _scope.selectedOption : true}"> <yield></yield> </li> </ul>', 'gb-option-list ul,[riot-tag="gb-option-list"] ul,[data-is="gb-option-list"] ul{ margin: 0; padding: 0; list-style: none; } gb-option-list ul:hover,[riot-tag="gb-option-list"] ul:hover,[data-is="gb-option-list"] ul:hover{ display: block; } gb-option-list a,[riot-tag="gb-option-list"] a,[data-is="gb-option-list"] a{ cursor: pointer; display: block; text-decoration: none; color: black; padding: 10px 12px; } gb-option-list a:hover,[riot-tag="gb-option-list"] a:hover,[data-is="gb-option-list"] a:hover{ background-color: #eee; }', '', function (opts) {});

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _gbSelect = __webpack_require__(183);
	
	riot.tag2('gb-option', '<a onclick="{send}">{label}</a>', '', '', function (opts) {
	    var _this = this;
	
	    this.label = _gbSelect.Select.optionLabel(opts.option);
	    this.value = _gbSelect.Select.optionValue(opts.option);
	    this.send = function () {
	        return opts.send(_this);
	    };
	});

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var collections_1 = __webpack_require__(39);
	var common_1 = __webpack_require__(40);
	var Collections = (function () {
	    function Collections() {
	    }
	    Collections.prototype.init = function () {
	        var _this = this;
	        this._config = Object.assign({ options: [] }, common_1.getPath(this.config, 'tags.collections'), this.opts);
	        var collectionsService = this.services.collections;
	        this.collections = collectionsService.collections;
	        this.fetchCounts = collectionsService.fetchCounts;
	        this.labels = collectionsService.isLabeled
	            ? this._config.options.reduce(this.extractLabels, {})
	            : {};
	        this.dropdown = common_1.unless(this._config.dropdown, false);
	        this.flux.on(collections_1.COLLECTIONS_UPDATED_EVENT, function (counts) { return _this.update({ counts: counts }); });
	    };
	    Collections.prototype.switchCollection = function (event) {
	        var element = event.target;
	        while (element.tagName !== 'A')
	            element = element.parentElement;
	        this.onselect(element.dataset['collection']);
	    };
	    Collections.prototype.onselect = function (collection) {
	        this.flux.switchCollection(collection);
	    };
	    Collections.prototype.extractLabels = function (labels, collection) {
	        return Object.assign(labels, (_a = {}, _a[collection.value] = collection.label, _a));
	        var _a;
	    };
	    return Collections;
	}());
	exports.Collections = Collections;


/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _gbDetails = __webpack_require__(191);
	
	riot.tag2('gb-details', '<div class="gb-details"> <yield></yield> </div>', '', '', function (opts) {
	    this._mixin(_gbDetails.Details);
	});

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(40);
	var product_transformer_1 = __webpack_require__(192);
	var clone = __webpack_require__(118);
	var groupby_api_1 = __webpack_require__(102);
	var Details = (function () {
	    function Details() {
	    }
	    Details.prototype.init = function () {
	        this.idParam = this.opts.idParam || 'id';
	        this.query = common_1.getParam(this.idParam);
	        this.struct = this.config.structure || {};
	        this.transformer = new product_transformer_1.ProductTransformer(this.struct);
	        this.flux.on(groupby_api_1.Events.DETAILS, this.updateRecord);
	        if (this.query)
	            this.flux.details(this.query, this.transformer.idField);
	    };
	    Details.prototype.updateRecord = function (_a) {
	        var allMeta = _a.allMeta;
	        var productMeta = this.transformer.transform(clone(allMeta, false));
	        this.update({ productMeta: productMeta, allMeta: productMeta() });
	    };
	    return Details;
	}());
	exports.Details = Details;


/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(40);
	var filterObject = __webpack_require__(47);
	var DEFAULT_STRUCTURE = {
	    id: 'id'
	};
	var ProductTransformer = (function () {
	    function ProductTransformer(struct) {
	        this.struct = Object.assign({}, DEFAULT_STRUCTURE, struct);
	        this.setTransform();
	        this.hasVariants = 'variants' in struct;
	        this.variantStruct = this.struct._variantStructure || this.struct;
	        this.idField = this.extractIdField();
	    }
	    ProductTransformer.prototype.transform = function (allMeta) {
	        var transformedMeta = this.productTransform(allMeta);
	        var variants = this.unpackVariants(transformedMeta);
	        var productMeta = function (variant) {
	            if (variant === void 0) { variant = 0; }
	            if (variant >= variants.length) {
	                throw new Error("cannot access the variant at index " + variant);
	            }
	            else {
	                return variants[variant];
	            }
	        };
	        productMeta.variants = variants;
	        productMeta.transformedMeta = transformedMeta;
	        return productMeta;
	    };
	    ProductTransformer.prototype.unpackVariants = function (allMeta) {
	        var struct = filterObject(this.struct, '!_*');
	        var variantStruct = filterObject(this.variantStruct, '!_*');
	        var remappedMeta = common_1.remap(allMeta, struct);
	        var variantMapping = this.remapVariant(remappedMeta, variantStruct);
	        if (this.hasVariants && Array.isArray(common_1.getPath(allMeta, struct.variants))) {
	            var variantsArray = common_1.getPath(allMeta, struct.variants)
	                .filter(function (variant) { return variant; });
	            if (variantsArray.length > 0) {
	                return variantsArray.map(variantMapping);
	            }
	        }
	        return [filterObject(remappedMeta, '!variants')];
	    };
	    ProductTransformer.prototype.remapVariant = function (remappedMeta, variantStruct) {
	        return function (variant) {
	            var remappedVariant = common_1.remap(variant, variantStruct);
	            return filterObject(Object.assign({}, remappedMeta, remappedVariant), '!variants');
	        };
	    };
	    ProductTransformer.prototype.extractIdField = function () {
	        // ensure we actually want the nested id
	        if (this.hasVariants && this.struct._variantStructure && this.variantStruct.id) {
	            return this.struct.variants + "." + this.variantStruct.id;
	        }
	        else {
	            return this.struct.id;
	        }
	    };
	    ProductTransformer.prototype.setTransform = function () {
	        if (typeof this.struct._transform === 'function') {
	            this.productTransform = this.struct._transform;
	        }
	        else {
	            this.productTransform = this.defaultTransform;
	        }
	    };
	    ProductTransformer.prototype.defaultTransform = function (allMeta) {
	        return allMeta;
	    };
	    return ProductTransformer;
	}());
	exports.ProductTransformer = ProductTransformer;


/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(169);
	
	var _gbDidYouMean = __webpack_require__(194);
	
	riot.tag2('gb-did-you-mean', '<yield> <gb-list class="{_style}" items="{didYouMean}" scope="gb-did-you-mean" inline> <a onclick="{_scope.send}">{item}</a> </gb-list> </yield>', '', '', function (opts) {
	    this._mixin(_gbDidYouMean.DidYouMean);
	});

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var groupby_api_1 = __webpack_require__(102);
	var DidYouMean = (function () {
	    function DidYouMean() {
	    }
	    DidYouMean.prototype.init = function () {
	        var _this = this;
	        this.flux.on(groupby_api_1.Events.RESULTS, function (_a) {
	            var didYouMean = _a.didYouMean;
	            return _this.updateDidYouMean(didYouMean);
	        });
	    };
	    DidYouMean.prototype.send = function (event) {
	        this.flux.rewrite(event.target.text);
	    };
	    DidYouMean.prototype.updateDidYouMean = function (didYouMean) {
	        this.update({ didYouMean: didYouMean });
	    };
	    return DidYouMean;
	}());
	exports.DidYouMean = DidYouMean;


/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(181);
	
	var _gbFilter = __webpack_require__(196);
	
	riot.tag2('gb-filter', '<yield> <gb-select scope="gb-filter"> </gb-select> </yield>', '', '', function (opts) {
	    this._mixin(_gbFilter.Filter);
	});

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var filter_1 = __webpack_require__(148);
	var common_1 = __webpack_require__(40);
	var Filter = (function () {
	    function Filter() {
	    }
	    Filter.prototype.init = function () {
	        this._config = common_1.getPath(this.config, 'tags.filter') || this.opts;
	        this.label = this._config.label || 'Filter';
	        this.clear = this._config.clear || 'Unfiltered';
	        this.flux.on(filter_1.FILTER_UPDATED_EVENT, this.updateValues);
	    };
	    Filter.prototype.convertRefinements = function (navigations) {
	        var _this = this;
	        var found = navigations.find(function (_a) {
	            var name = _a.name;
	            return _this.services.filter.isTargetNav(name);
	        });
	        return found ? found.refinements.map(function (ref) { return ({ label: ref.value, value: ref }); }) : [];
	    };
	    Filter.prototype.updateValues = function (res) {
	        var converted = this.convertRefinements(res.availableNavigation);
	        if (this.tags['gb-select']) {
	            this.tags['gb-select'].updateOptions(converted);
	        }
	        else {
	            this.update({ options: converted });
	        }
	    };
	    Filter.prototype.onselect = function (value) {
	        if (this.selected)
	            this.flux.unrefine(this.selected, { skipSearch: true });
	        if (value === '*') {
	            this.flux.reset();
	        }
	        else {
	            this.flux.refine(this.selected = common_1.toRefinement(value, { name: this._config.field }));
	        }
	    };
	    return Filter;
	}());
	exports.Filter = Filter;


/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(198);
	
	__webpack_require__(199);
	
	__webpack_require__(201);
	
	var _gbNavigation = __webpack_require__(202);
	
	riot.tag2('gb-navigation', '<yield> <div class="gb-side-nav {_style}"> <gb-refinement-list each="{nav in processed}"></gb-refinement-list> </div> </yield>', 'gb-navigation .gb-stylish.gb-side-nav,[riot-tag="gb-navigation"] .gb-stylish.gb-side-nav,[data-is="gb-navigation"] .gb-stylish.gb-side-nav{ padding: 12px; }', '', function (opts) {
	    this._mixin(_gbNavigation.Navigation);
	});

/***/ },
/* 198 */
/***/ function(module, exports) {

	'use strict';
	
	riot.tag2('gb-refinement-list', '<div class="gb-refinement-list {_style}"> <h4 class="gb-navigation-title">{nav.displayName}</h4> <ul> <gb-selected-refinement if="{showSelected}" each="{ref in nav.selected}"></gb-selected-refinement> <gb-available-refinement each="{ref in nav.refinements}"></gb-available-refinement> </ul> </div>', 'gb-refinement-list .gb-stylish.gb-refinement-list .gb-navigation-title,[riot-tag="gb-refinement-list"] .gb-stylish.gb-refinement-list .gb-navigation-title,[data-is="gb-refinement-list"] .gb-stylish.gb-refinement-list .gb-navigation-title{ font-size: 18px; margin: 10px 0; } gb-refinement-list .gb-stylish.gb-refinement-list ul,[riot-tag="gb-refinement-list"] .gb-stylish.gb-refinement-list ul,[data-is="gb-refinement-list"] .gb-stylish.gb-refinement-list ul{ margin: 0; padding-left: 8px; }', '', function (opts) {});

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(179);
	
	var _gbRefinement = __webpack_require__(200);
	
	riot.tag2('gb-available-refinement', '<li class="gb-ref {_style}"> <a class="gb-ref__link" onclick="{send}"> <span class="gb-ref__title">{toView(ref)}</span> <span class="gb-filler"></span> <gb-badge if="{badge}">{ref.count}</gb-badge> </a> </li>', 'gb-available-refinement .gb-stylish,[riot-tag="gb-available-refinement"] .gb-stylish,[data-is="gb-available-refinement"] .gb-stylish{ list-style: none; } gb-available-refinement .gb-stylish .gb-filler,[riot-tag="gb-available-refinement"] .gb-stylish .gb-filler,[data-is="gb-available-refinement"] .gb-stylish .gb-filler{ flex-grow: 1; } gb-available-refinement .gb-stylish .gb-ref__link,[riot-tag="gb-available-refinement"] .gb-stylish .gb-ref__link,[data-is="gb-available-refinement"] .gb-stylish .gb-ref__link{ cursor: pointer; display: flex; padding: 4px 6px; border-radius: 4px; color: black; font-size: 14px; text-decoration: none; align-items: baseline; } gb-available-refinement .gb-stylish .gb-ref__link:hover,[riot-tag="gb-available-refinement"] .gb-stylish .gb-ref__link:hover,[data-is="gb-available-refinement"] .gb-stylish .gb-ref__link:hover{ background-color: #ddd; }', '', function (opts) {
	    this._mixin(_gbRefinement.AvailableRefinement);
	});

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(40);
	var Refinement = (function () {
	    function Refinement() {
	    }
	    Refinement.prototype.init = function () {
	        this._scopeTo('gb-navigation');
	        this.toView = common_1.displayRefinement;
	    };
	    return Refinement;
	}());
	exports.Refinement = Refinement;
	var AvailableRefinement = (function (_super) {
	    __extends(AvailableRefinement, _super);
	    function AvailableRefinement() {
	        _super.apply(this, arguments);
	    }
	    AvailableRefinement.prototype.send = function () {
	        return this._scope.send(this.ref, this.nav);
	    };
	    return AvailableRefinement;
	}(Refinement));
	exports.AvailableRefinement = AvailableRefinement;
	var SelectedRefinement = (function (_super) {
	    __extends(SelectedRefinement, _super);
	    function SelectedRefinement() {
	        _super.apply(this, arguments);
	    }
	    SelectedRefinement.prototype.remove = function () {
	        return this._scope.remove(this.ref, this.nav);
	    };
	    return SelectedRefinement;
	}(Refinement));
	exports.SelectedRefinement = SelectedRefinement;


/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _gbRefinement = __webpack_require__(200);
	
	riot.tag2('gb-selected-refinement', '<li class="gb-ref {_style}"> <a class="gb-ref__link" onclick="{remove}">&times;</a> <span class="gb-ref__value">{toView(ref)}</span> </li>', 'gb-selected-refinement .gb-stylish,[riot-tag="gb-selected-refinement"] .gb-stylish,[data-is="gb-selected-refinement"] .gb-stylish{ position: relative; list-style: none; padding: 4px 6px; font-size: 14px; } gb-selected-refinement .gb-stylish .gb-ref__link,[riot-tag="gb-selected-refinement"] .gb-stylish .gb-ref__link,[data-is="gb-selected-refinement"] .gb-stylish .gb-ref__link{ cursor: pointer; left: -8px; position: absolute; color: black; text-decoration: none; } gb-selected-refinement .gb-stylish .gb-ref__link:hover,[riot-tag="gb-selected-refinement"] .gb-stylish .gb-ref__link:hover,[data-is="gb-selected-refinement"] .gb-stylish .gb-ref__link:hover{ color: red; font-weight: bold; }', '', function (opts) {
	    this._mixin(_gbRefinement.SelectedRefinement);
	});

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(40);
	var clone = __webpack_require__(118);
	var groupby_api_1 = __webpack_require__(102);
	var Navigation = (function () {
	    function Navigation() {
	    }
	    Navigation.prototype.init = function () {
	        this.badge = common_1.unless(this.opts.badge, true);
	        this.showSelected = common_1.unless(this.opts.showSelected, true);
	        this.flux.on(groupby_api_1.Events.RESULTS, this.updateNavigations);
	    };
	    Navigation.prototype.updateNavigations = function (res) {
	        this.update({ processed: this.processNavigations(res) });
	    };
	    Navigation.prototype.processNavigations = function (_a) {
	        var selectedNavigation = _a.selectedNavigation, availableNavigation = _a.availableNavigation;
	        var processed = clone(availableNavigation);
	        selectedNavigation.forEach(function (selNav) {
	            var availNav = processed.find(function (nav) { return nav.name === selNav.name; });
	            if (availNav) {
	                availNav.selected = selNav.refinements;
	            }
	            else {
	                processed.unshift(Object.assign({}, selNav, { selected: selNav.refinements, refinements: [] }));
	            }
	        });
	        return processed;
	    };
	    Navigation.prototype.send = function (ref, nav) {
	        return this.flux.refine(common_1.toRefinement(ref, nav));
	    };
	    Navigation.prototype.remove = function (ref, nav) {
	        return this.flux.unrefine(common_1.toRefinement(ref, nav));
	    };
	    return Navigation;
	}());
	exports.Navigation = Navigation;


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(181);
	
	var _gbPageSize = __webpack_require__(204);
	
	riot.tag2('gb-page-size', '<yield> <gb-select scope="gb-page-size"> </gb-select> </yield>', '', '', function (opts) {
	    this._mixin(_gbPageSize.PageSize);
	});

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(40);
	var PageSize = (function () {
	    function PageSize() {
	    }
	    PageSize.prototype.init = function () {
	        this.options = common_1.unless(this.config.pageSizes, [10, 25, 50, 100]);
	        this._config = common_1.getPath(this.config, 'tags.pageSize') || this.opts;
	    };
	    PageSize.prototype.onselect = function (value) {
	        this.flux.resize(value, this.opts.resetOffset);
	    };
	    return PageSize;
	}());
	exports.PageSize = PageSize;


/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(206);
	
	var _gbPager = __webpack_require__(208);
	
	riot.tag2('gb-pager', '<div class="gb-pager {_style}"> <a class="gb-pager__link prev {disabled: _scope.backDisabled}" onclick="{_scope.pager.prev}"> <gb-icon if="{_scope.icons}" value="{prev_icon}"></gb-icon> <span if="{_scope.labels}">{prev_label}</span> </a> <yield></yield> <a class="gb-pager__link next {disabled: _scope.forwardDisabled}" onclick="{_scope.pager.next}"> <span if="{_scope.labels}">{next_label}</span> <gb-icon if="{_scope.icons}" value="{next_icon}"></gb-icon> </a> </div>', 'gb-pager .gb-stylish a,[riot-tag="gb-pager"] .gb-stylish a,[data-is="gb-pager"] .gb-stylish a{ cursor: pointer; } gb-pager .gb-stylish.gb-pager,[riot-tag="gb-pager"] .gb-stylish.gb-pager,[data-is="gb-pager"] .gb-stylish.gb-pager{ display: flex; } gb-pager .gb-stylish .gb-pager__link,[riot-tag="gb-pager"] .gb-stylish .gb-pager__link,[data-is="gb-pager"] .gb-stylish .gb-pager__link{ display: flex; text-decoration: none; color: #888; padding: 5px 14px; } gb-pager .gb-stylish .gb-pager__link:hover,[riot-tag="gb-pager"] .gb-stylish .gb-pager__link:hover,[data-is="gb-pager"] .gb-stylish .gb-pager__link:hover{ color: black; } gb-pager .gb-stylish .gb-pager__link.disabled,[riot-tag="gb-pager"] .gb-stylish .gb-pager__link.disabled,[data-is="gb-pager"] .gb-stylish .gb-pager__link.disabled{ color: #ddd; cursor: not-allowed; } gb-pager .gb-stylish gb-pages,[riot-tag="gb-pager"] .gb-stylish gb-pages,[data-is="gb-pager"] .gb-stylish gb-pages{ flex: 1; } gb-pager .gb-stylish gb-icon img,[riot-tag="gb-pager"] .gb-stylish gb-icon img,[data-is="gb-pager"] .gb-stylish gb-icon img{ width: 20px; }', '', function (opts) {
	    this._mixin(_gbPager.Pager);
	});

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _gbIcon = __webpack_require__(207);
	
	riot.tag2('gb-icon', '<i if="{classes}" class="{classes}"></i> <img if="{url}" riot-src="{url}"></img>', '', '', function (opts) {
	    this._mixin(_gbIcon.Icon);
	});

/***/ },
/* 207 */
/***/ function(module, exports) {

	"use strict";
	var Icon = (function () {
	    function Icon() {
	    }
	    Icon.prototype.init = function () {
	        if (this.isImage(this.opts.value)) {
	            this.url = this.opts.value;
	        }
	        else {
	            this.classes = this.opts.value;
	        }
	    };
	    Icon.prototype.isImage = function (value) {
	        var matches = value.match(/.*\..*/);
	        return (matches && matches.length > 0) || value.startsWith('data:image/');
	    };
	    return Icon;
	}());
	exports.Icon = Icon;


/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var lArrowUrl = __webpack_require__(209);
	var rArrowUrl = __webpack_require__(210);
	var Pager = (function () {
	    function Pager() {
	    }
	    Pager.prototype.init = function () {
	        this._scopeTo('gb-paging');
	        this.prev_label = this._scope.prev_label || 'Prev';
	        this.next_label = this._scope.next_label || 'Next';
	        this.prev_icon = this._scope.prev_icon || lArrowUrl;
	        this.next_icon = this._scope.next_icon || rArrowUrl;
	    };
	    return Pager;
	}());
	exports.Pager = Pager;


/***/ },
/* 209 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAACrklEQVR4Ae3dvXLTQBQF4IQeHihAD0leOE+Ql0kHBVSwKjzjIj9er65GZ/V5RpXlq7vfOeOk882NFwECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgLoEv7ThP7fo617Gc5hKBJfzndv1r1692KUFDOMrrPPylAKcSfDsKwJHP+Vr4SnCQRrwX/qkEv5uFb4IJC3FJ+Ocl+D6hwWGP1BO+EkxWk2vCP5XgpVl8nszjUMcZCf9Pk/pxKK3JDiv8yQLtOY7we7Qmu1f4kwXac5yR8P+2B/mb36O9s3tHw/+5s/NYp0NA+B1Ys90q/NkS7TiP8DuwZrtV+LMl2nEe4XdgzXar8GdLtOM8o+HfdzzLrTsTEP7OAtlyHeFvqb2zZwl/Z4FsuY7wt9Te2bOEv7NAtlxnNPyHLZf1rHUFhL+uZ9Q04UfFte6ywl/XM2qa8KPiWndZ4a/o+WnFWSmjblMWtefbAqPfAo9vj/ZOioASpCRVuKcSFOKmjFaClKQK91SCQtyU0UqQklThnkpQiJsyWglSkircUwkKcVNGK0FKUoV7KkEhbspoJUhJqnBPJSjETRmtBClJFe6pBIW4KaOVICWpwj2VoBA3ZbQSpCRVuKcSFOKmjFaClKQK91SCQtyU0UqQklThnkpQiJsyeqQEfjAiJeUP9rymBMtvCd59MNfbQQI9JRB+ULA9q15SAuH3iAbe+14JhB8Y6DUrv1YC4V8jGfyZ8xIIPzjIkdWXEiw/H++//RFFnyVAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgS6BP4DIgpCusyEaeEAAAAASUVORK5CYII="

/***/ },
/* 210 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAACXBIWXMAAAsTAAALEwEAmpwYAAABWWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS40LjAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyI+CiAgICAgICAgIDx0aWZmOk9yaWVudGF0aW9uPjE8L3RpZmY6T3JpZW50YXRpb24+CiAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgogICA8L3JkZjpSREY+CjwveDp4bXBtZXRhPgpMwidZAAACtklEQVR4Ae3dQW7UQBAF0Ch7OFCAPQQunBNwGXawgBUpLywhFEFc3Ym7ym8kK5uU3f3+z8QjZTI3Nx4ECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgdcTuItLPcTx9vUu6UqrCGzhf4/jdxxf41CCQLjK48/wtwIowVWSj30+Fb4SXKQA/wpfCZqX4DnhK0HTEhwJXwmaleBN7OdbHHuwR756ddCkDF9iH7+UoEmayW0oQRKu05gSdEozuRclSMJ1GlOCTmkm96IESbhOY0rQKc3kXpQgCddpTAk6pZncixIk4TqNKUGnNJN7UYIkXKcxJeiUZnIvSpCE6zSmBJ3STO5FCZJwncaUoFOayb0oQRKu05gSdEozuRclSMJ1GlOCTmkm96IESbhOY0rQKc3kXi5XgtskVNex7Y0mHhcV+Bz79oYT4R9+25m3nBUvjZ/84gGOLF/4I3rFZ4VfPMCR5d/HsBu+EcHCs8IvHN7o0oU/Klh4XviFwxtduvBHBQvPC79weKNL/xQncLc/qlh0XvhFg5uxbOHPUCx6DuEXDW7GsoU/Q7HoOYRfNLgZyxb+DMWi5/gY6/ZSr2h4o8vewv8Zx5F/Gr1/r7/kGdU/eV74Jwdw5uWFf6b+ydcW/skBnHl5Hxhxpv4i1/4Q6/gRx34z95yvbvgWCW/WMo6UQPiz1Bc7z/tYz/+eCYS/WGizl7OVYP/I2L9/FQh/tvai53uqBMJfNKyXWta7OPH+TCD8l1Je/LxbCR7i8MnhiwdleQQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMAxgUc/cUO5Y0FtKQAAAABJRU5ErkJggg=="

/***/ },
/* 211 */
/***/ function(module, exports) {

	'use strict';
	
	riot.tag2('gb-pages', '<ul class="gb-pages {_style}" if="{_scope.pages}"> <span class="gb-pages__ellipsis" if="{_scope.lowOverflow}">&hellip;</span> <li each="{pageNumber in _scope.pageNumbers}"> <a class="gb-pages__page {selected: _scope.currentPage === pageNumber}" onclick="{jumpTo}">{pageNumber}</a> </li> <span class="gb-pages__ellipsis" if="{_scope.highOverflow}">&hellip;</span> </ul>', 'gb-pages .gb-stylish a,[riot-tag="gb-pages"] .gb-stylish a,[data-is="gb-pages"] .gb-stylish a{ cursor: pointer; } gb-pages .gb-stylish.gb-pages,[riot-tag="gb-pages"] .gb-stylish.gb-pages,[data-is="gb-pages"] .gb-stylish.gb-pages{ margin: 0; padding: 0; list-style: none; display: flex; align-items: center; justify-content: center; height: 100%; } gb-pages .gb-stylish.gb-pages li,[riot-tag="gb-pages"] .gb-stylish.gb-pages li,[data-is="gb-pages"] .gb-stylish.gb-pages li{ display: inline; } gb-pages .gb-stylish .gb-pages__page,[riot-tag="gb-pages"] .gb-stylish .gb-pages__page,[data-is="gb-pages"] .gb-stylish .gb-pages__page,gb-pages .gb-stylish .gb-pages__ellipsis,[riot-tag="gb-pages"] .gb-stylish .gb-pages__ellipsis,[data-is="gb-pages"] .gb-stylish .gb-pages__ellipsis{ text-decoration: none; color: #888; } gb-pages .gb-stylish .gb-pages__page,[riot-tag="gb-pages"] .gb-stylish .gb-pages__page,[data-is="gb-pages"] .gb-stylish .gb-pages__page{ padding: 0 4px; } gb-pages .gb-stylish .gb-pages__page:hover,[riot-tag="gb-pages"] .gb-stylish .gb-pages__page:hover,[data-is="gb-pages"] .gb-stylish .gb-pages__page:hover,gb-pages .gb-stylish .gb-pages__page.selected,[riot-tag="gb-pages"] .gb-stylish .gb-pages__page.selected,[data-is="gb-pages"] .gb-stylish .gb-pages__page.selected{ color: black; }', '', function (opts) {
	    var _this = this;
	
	    this._scopeTo('gb-paging');
	    this.jumpTo = function (_ref) {
	        var target = _ref.target;
	        return _this._scope.pager.switchPage(Number(target.text));
	    };
	});

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(213);
	
	__webpack_require__(205);
	
	__webpack_require__(211);
	
	var _gbPaging = __webpack_require__(217);
	
	riot.tag2('gb-paging', '<yield> <gb-terminal-pager> <gb-pager> <gb-pages></gb-pages> </gb-pager> </gb-terminal-pager> </yield>', '', '', function (opts) {
	    this._mixin(_gbPaging.Paging);
	});

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(206);
	
	var _gbTerminalPager = __webpack_require__(214);
	
	riot.tag2('gb-terminal-pager', '<div class="gb-terminal-pager {_style}"> <a class="gb-terminal__link first {disabled: _scope.backDisabled}" if="{_scope.terminals}" onclick="{_scope.pager.first}"> <gb-icon if="{_scope.icons}" value="{first_icon}"></gb-icon> <span if="{_scope.labels}">{_scope.numeric ? 1 : first_label}</span> </a> <yield></yield> <a class="gb-terminal__link last {disabled: _scope.forwardDisabled}" if="{_scope.terminals}" onclick="{_scope.pager.last}"> <span if="{_scope.labels}">{_scope.numeric ? _scope.lastPage : last_label}</span> <gb-icon if="{_scope.icons}" value="{last_icon}"></gb-icon> </a> </div>', 'gb-terminal-pager .gb-stylish a,[riot-tag="gb-terminal-pager"] .gb-stylish a,[data-is="gb-terminal-pager"] .gb-stylish a{ cursor: pointer; } gb-terminal-pager .gb-stylish.gb-terminal-pager,[riot-tag="gb-terminal-pager"] .gb-stylish.gb-terminal-pager,[data-is="gb-terminal-pager"] .gb-stylish.gb-terminal-pager{ display: flex; width: 100%; } gb-terminal-pager .gb-stylish .gb-terminal__link,[riot-tag="gb-terminal-pager"] .gb-stylish .gb-terminal__link,[data-is="gb-terminal-pager"] .gb-stylish .gb-terminal__link{ display: flex; text-decoration: none; color: #888; padding: 5px 14px; } gb-terminal-pager .gb-stylish .gb-terminal__link:hover,[riot-tag="gb-terminal-pager"] .gb-stylish .gb-terminal__link:hover,[data-is="gb-terminal-pager"] .gb-stylish .gb-terminal__link:hover{ color: black; } gb-terminal-pager .gb-stylish .gb-terminal__link.disabled,[riot-tag="gb-terminal-pager"] .gb-stylish .gb-terminal__link.disabled,[data-is="gb-terminal-pager"] .gb-stylish .gb-terminal__link.disabled{ color: #ddd; cursor: not-allowed; } gb-terminal-pager .gb-stylish gb-pager,[riot-tag="gb-terminal-pager"] .gb-stylish gb-pager,[data-is="gb-terminal-pager"] .gb-stylish gb-pager{ flex: 1; } gb-terminal-pager .gb-stylish gb-icon img,[riot-tag="gb-terminal-pager"] .gb-stylish gb-icon img,[data-is="gb-terminal-pager"] .gb-stylish gb-icon img{ width: 20px; }', '', function (opts) {
	    this._mixin(_gbTerminalPager.TerminalPager);
	});

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var lDoubleArrowUrl = __webpack_require__(215);
	var rDoubleArrowUrl = __webpack_require__(216);
	var TerminalPager = (function () {
	    function TerminalPager() {
	    }
	    TerminalPager.prototype.init = function () {
	        this._scopeTo('gb-paging');
	        this.first_label = this._scope.first_label || 'First';
	        this.last_label = this._scope.last_label || 'Last';
	        this.first_icon = this._scope.first_icon || lDoubleArrowUrl;
	        this.last_icon = this._scope.last_icon || rDoubleArrowUrl;
	    };
	    return TerminalPager;
	}());
	exports.TerminalPager = TerminalPager;


/***/ },
/* 215 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAABYmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iWE1QIENvcmUgNS41LjAiPgogPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgIHRpZmY6T3JpZW50YXRpb249IjEiLz4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+Cjw/eHBhY2tldCBlbmQ9InIiPz60J7anAAABhWlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kbtLA0EQhz8TxeADCwNaWKQQBYmiUYJ2miA+CEGigq8mOfMQcslxd0HE0sI2hYUPbBSxsdZO/AcEQVArEWzFQsFG5JxNhIiYWXb329/OzO7Ogmshq+lWbT/oOduMTYR8C4tLvvonPLThpRt/XLOMsZmZCFXt444aNd/2qlzV/f61xtWkpUGNR3hUM0xbeFI4um4bineFvVomvip8Juw35YLCD0pPlPlFcbrELpXTa87FwsJeYV/6Fyd+sZYxdeEh4U49W9B+7qNe0pTMzc8qXXoHFjEmCOFjinHCBBlgRMYgvQTokxVV4gOl+Ch5idVkNNjAZI00GWz8ohYke1LmlOhJaVnxEFN/8Le2VmowUD6haRrqnh3nvQfqD+Br23E+jxzn6xjcUpernUp8fgeGX0UvVrTOQ2jZgvPLipY4gYsitD8acTNektzSXakUvJ1C8yK03kDDcrluP/sc38PcJkSuYW8fusS/ZeUbWh5nYM1tRxkAAAAJcEhZcwAACxMAAAsTAQCanBgAAAGBSURBVHic7d0xblNhEIXRS3qyoCT0QLJhVpDNpDMFVFBZspBj8vxmnm3NOdJrR5a+6/pPAAAAAAAAAAAAAAAAAAAAAK7TfZIfSR5v5C6F7pO8JvmTZJe6WF13KXQYaf/tkjxd6V0KHYtUEavrLoVORdp/P7M8VtddCn0k0mGsLxe+S6ElkZbE6rpLoXMi7b+3JJ83vkuhNZF+Jfm68V0KiT+Y+IOJP9iaSL/TE//UXQqtjfRt47sUEn8w8QcTfzDxBxN/MPEHWxvp+8Z3KST+YOIPJv5g4g8m/mBrIz1vfJdC4g8m/mDiDyb+YOJfgbtL/4AVPt3YXY5Y+2992fguDYwAI8AIiBEQIyBGQIyAGAExAmIExAiIERAjIEZAjIAYATECYgTECIgRECMgRkA8GEHOi7VL8nChuzRYEmtJpK67NPhIrHMidd2lwf8eeDw3UtddGrz3xOvaSF13afDvI89Vkbru0mD/zHt1pK67AAAAAAAAAAAAAAAAAAAAwGB/AYR4hXFo7p5xAAAAAElFTkSuQmCC"

/***/ },
/* 216 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAABeWlDQ1BJQ0MgUHJvZmlsZQAAKJF9kE0rRGEUx38GkZcoioXFLZOkMY1REztM8tIsNChvmzvXvKh5ud25QjbKwtbCBtmQ+ARsJF9AKYWFpOwtKBvpOs8MzaCcOs/5Pec5599zDrg8umkmy3yQSttWeGhAm5qe0SoeqaSJetpp0Y2s2T82FkLsO/60txtKVLzuVFp/3/+16vlo1oCSSuE+w7Rs4WHh1iXbVKz0Gi35lPCa4nietxRH8nycq5kIB4XPhDUjoc8L3wt7jISVApfSd0eKauJFnEouGl//UZPURNOT46pevIUsYYYYQGOEQYIE6KJXzgCd+PHKDTu6bKvmYMZcsRbiCVvrl01EtZG04fVofl9XANRef++rkMvIPD3PULpZyEUO4XQTmh8KOfce1K3DybmpW3ouVSruisXg5Qhqp6HhCqpms7Fuf36imlEof3Kc1w6o2IWPDcd533ecjwNpvoOLrfyOvrQ4uIWJVQhdwvYOtIl23dwnRy1nc9Cu3rAAAAAJcEhZcwAACxMAAAsTAQCanBgAAAFZaVRYdFhNTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJYTVAgQ29yZSA1LjQuMCI+CiAgIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgICAgIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiCiAgICAgICAgICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIj4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CkzCJ1kAAAM6SURBVHgB7d1LalRRGEZRsa8D8tH3NeGMwMnY04a29JRwQCSUqeRsEP4VuNyO7NyzviJWGkmePfNBgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEDgn8Gql7tb18lzyd6nqHn7M2bnLSF/X9XNdn9d16kVQddcj+jgl8OdIlxfAqRdB1T11bp0lcN9IJ14EVddoBwWujfSUF0HVPXh0qYeM9JgXQdW12EGBW0a65UVQdQ8eXerFIviyrj3sLfdr3x1UXYsFAp9W80fwIqi6AYFkNVbVtVggUI1VdQMCyWqsqmuxQKAaq+oGBJLVWFXXYoFANVbVDQgkq7GqrsUCgWqsqhsQSFZjVV2LBQLVWFU3IJCsxqq6FgsEqrGqbkAgWY1VdS0WCFRjVd2AQLIaq+paLBCoxqq6AYFkNVbVtVggUI1VdQMCyWqsqmuxQKAaq+oGBJLVWFXXYoFANVbVDQgkq7Gqbr7Y8/wz/F+f4PKDJsVH1S2edWzz4zp58QMnVXfsUMXBq5GqbmEwtlmNVHXHDlUcvBqp6hYGY5vVSFV37FDFwT+saPGGr+oWBmOb1UhVd+xQxcGrkapuYTC2WY1UdccOVRy8GqnqFgZjm9VIVXfsUMXB369o8W6/6hYGY5vVSFV37FDFwauRqm5hMLZZjVR1xw5VHLwaqeoWBmOb1UhVd+xQxcGrkapuYTC2+W6dvPhWr+qOHao4+GWk7+u65ZdG73977ZdHV93CYGyzGqnqjh2qOHg1UtUtDMY2q5Gq7tihioNXf9ih6hYG45tvl8C3de03cw+5X3vDt0Gr7u67HxS4ZayHjL8freruvvtBgTer9a+vBLeMvx+t6u6++0GBy1j7T8b+/V/BY8bfj1Z1d9/9oMB9Yz1l/P1oVXf33Q8KvF6t/ZXgxPj70aru7rsfFLiMdbeuU385fD9a1d19dwIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDAkwR+ASRah2/USAPfAAAAAElFTkSuQmCC"

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(40);
	var groupby_api_1 = __webpack_require__(102);
	var Paging = (function () {
	    function Paging() {
	    }
	    Paging.prototype.init = function () {
	        var _this = this;
	        // default initial state
	        this.backDisabled = true;
	        this.currentPage = 1;
	        this.limit = common_1.unless(this.opts.limit, 5);
	        this.pages = common_1.unless(this.opts.pages, false);
	        this.numeric = common_1.unless(this.opts.numeric, false);
	        this.terminals = common_1.unless(this.opts.terminals, true);
	        this.labels = common_1.unless(this.opts.labels, true);
	        this.icons = common_1.unless(this.opts.icons, true);
	        this.prev_label = this.opts.prev_label;
	        this.next_label = this.opts.next_label;
	        this.first_label = this.opts.first_label;
	        this.last_label = this.opts.last_label;
	        this.prev_icon = this.opts.prev_icon;
	        this.next_icon = this.opts.next_icon;
	        this.first_icon = this.opts.first_icon;
	        this.last_icon = this.opts.last_icon;
	        this.pager = {
	            first: function () { return !_this.backDisabled && _this.flux.page.reset(); },
	            prev: function () { return !_this.backDisabled && _this.flux.page.prev(); },
	            next: function () { return !_this.forwardDisabled && _this.flux.page.next(); },
	            last: function () { return !_this.forwardDisabled && _this.flux.page.last(); },
	            switchPage: function (page) { return _this.flux.page.switchPage(page); }
	        };
	        this.flux.on(groupby_api_1.Events.PAGE_CHANGED, this.updateCurrentPage);
	        this.flux.on(groupby_api_1.Events.RESULTS, this.pageInfo);
	    };
	    Paging.prototype.pageInfo = function () {
	        var pageNumbers = this.flux.page.pageNumbers(this.limit);
	        var lastPage = this.flux.page.finalPage;
	        var currentPage = this.flux.page.currentPage;
	        this.updatePageInfo(pageNumbers, currentPage, lastPage);
	    };
	    Paging.prototype.updatePageInfo = function (pageNumbers, currentPage, lastPage) {
	        this.update({
	            pageNumbers: pageNumbers,
	            currentPage: currentPage,
	            lastPage: lastPage,
	            lowOverflow: pageNumbers[0] !== 1,
	            highOverflow: pageNumbers[pageNumbers.length - 1] !== lastPage,
	            backDisabled: currentPage === 1,
	            forwardDisabled: currentPage === lastPage
	        });
	    };
	    Paging.prototype.updateCurrentPage = function (_a) {
	        var pageNumber = _a.pageNumber;
	        this.update({ currentPage: pageNumber });
	    };
	    return Paging;
	}());
	exports.Paging = Paging;


/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(219);
	
	__webpack_require__(220);
	
	__webpack_require__(222);
	
	__webpack_require__(224);
	
	var _gbQuery = __webpack_require__(242);
	
	riot.tag2('gb-query', '<yield> <div class="gb-query {_style}"> <gb-search-box></gb-search-box> <gb-submit></gb-submit> <gb-reset></gb-reset> <gb-sayt if="{saytEnabled}"></gb-sayt> </div> </yield>', 'gb-query .gb-stylish.gb-query,[riot-tag="gb-query"] .gb-stylish.gb-query,[data-is="gb-query"] .gb-stylish.gb-query{ position: relative; display: flex; align-items: baseline; } gb-query .gb-stylish.gb-query gb-sayt,[riot-tag="gb-query"] .gb-stylish.gb-query gb-sayt,[data-is="gb-query"] .gb-stylish.gb-query gb-sayt{ top: 31px; left: 0; z-index: 10; position: absolute; min-width: 175px; background-color: #fff; box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2); }', '', function (opts) {
	    this._mixin(_gbQuery.Query);
	});

/***/ },
/* 219 */
/***/ function(module, exports) {

	'use strict';
	
	riot.tag2('gb-search-box', '<input name="searchBox" class="{_style}" type="text" placeholder="Search..." autofocus>', 'gb-search-box input.gb-stylish,[riot-tag="gb-search-box"] input.gb-stylish,[data-is="gb-search-box"] input.gb-stylish{ padding: 6px 12px; font-size: 14px; }', '', function (opts) {});

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _gbSubmit = __webpack_require__(221);
	
	riot.tag2('gb-submit', '<yield> <a class="gb-submit {_style}">&#128269;</a> </yield>', 'gb-submit .gb-stylish.gb-submit,[riot-tag="gb-submit"] .gb-stylish.gb-submit,[data-is="gb-submit"] .gb-stylish.gb-submit{ padding: 4px; } gb-submit .gb-stylish.gb-submit:hover,[riot-tag="gb-submit"] .gb-stylish.gb-submit:hover,[data-is="gb-submit"] .gb-stylish.gb-submit:hover{ cursor: pointer; }', '', function (opts) {
	    this._mixin(_gbSubmit.Submit);
	});

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(40);
	var Submit = (function () {
	    function Submit() {
	    }
	    Submit.prototype.init = function () {
	        this.label = this.opts.label || 'Search';
	        this.staticSearch = common_1.unless(this.opts.staticSearch, false);
	        if (this.root.tagName === 'INPUT')
	            this.root.value = this.label;
	        this.on('mount', this.setSearchBox);
	        this.root.addEventListener('click', this.submitQuery);
	    };
	    Submit.prototype.setSearchBox = function () {
	        this.searchBox = common_1.findSearchBox();
	    };
	    Submit.prototype.submitQuery = function () {
	        var inputValue = this.searchBox.value;
	        if (this.staticSearch && this.services.url.active()) {
	            this.services.url.update(inputValue, []);
	        }
	        else {
	            this.flux.reset(inputValue);
	        }
	    };
	    return Submit;
	}());
	exports.Submit = Submit;


/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _gbReset = __webpack_require__(223);
	
	riot.tag2('gb-reset', '<yield> <a class="gb-reset {_style}">&times;</a> </yield>', 'gb-reset .gb-stylish.gb-reset,[riot-tag="gb-reset"] .gb-stylish.gb-reset,[data-is="gb-reset"] .gb-stylish.gb-reset{ color: #888; padding: 4px; } gb-reset .gb-stylish.gb-reset:hover,[riot-tag="gb-reset"] .gb-stylish.gb-reset:hover,[data-is="gb-reset"] .gb-stylish.gb-reset:hover{ color: black; cursor: pointer; }', '', function (opts) {
	    this._mixin(_gbReset.Reset);
	});

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(40);
	var Reset = (function () {
	    function Reset() {
	    }
	    Reset.prototype.init = function () {
	        this.on('mount', this.setSearchBox);
	        this.root.addEventListener('click', this.clearQuery);
	    };
	    Reset.prototype.setSearchBox = function () {
	        this.searchBox = common_1.findSearchBox();
	    };
	    Reset.prototype.clearQuery = function () {
	        this.flux.reset(this.searchBox.value = '');
	    };
	    return Reset;
	}());
	exports.Reset = Reset;


/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(225);
	
	__webpack_require__(233);
	
	var _gbSayt = __webpack_require__(239);
	
	var _tag = __webpack_require__(154);
	
	riot.tag2('gb-sayt', '<yield> <div class="{_style}" if="{(queries && queries.length) || (navigations && navigations.length)}"> <gb-sayt-autocomplete></gb-sayt-autocomplete> <gb-sayt-products if="{showProducts}"></gb-sayt-products> </div> </yield>', 'gb-sayt div.gb-stylish,[riot-tag="gb-sayt"] div.gb-stylish,[data-is="gb-sayt"] div.gb-stylish{ display: flex; } gb-sayt .gb-stylish ul,[riot-tag="gb-sayt"] .gb-stylish ul,[data-is="gb-sayt"] .gb-stylish ul{ list-style: none; margin: 0; padding: 0; } gb-sayt .gb-stylish gb-sayt-link:hover,[riot-tag="gb-sayt"] .gb-stylish gb-sayt-link:hover,[data-is="gb-sayt"] .gb-stylish gb-sayt-link:hover,gb-sayt .gb-stylish gb-sayt-link.active,[riot-tag="gb-sayt"] .gb-stylish gb-sayt-link.active,[data-is="gb-sayt"] .gb-stylish gb-sayt-link.active{ background-color: #f1f1f1; display: block; } gb-sayt .gb-stylish gb-list li,[riot-tag="gb-sayt"] .gb-stylish gb-list li,[data-is="gb-sayt"] .gb-stylish gb-list li{ margin: 0px; }', '', function (opts) {
	    this._mixin(_tag.SaytTag, _gbSayt.Sayt);
	});

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(226);
	
	__webpack_require__(230);
	
	__webpack_require__(231);
	
	__webpack_require__(232);
	
	riot.tag2('gb-sayt-autocomplete', '<yield> <gb-sayt-categories></gb-sayt-categories> <gb-sayt-divider></gb-sayt-divider> <gb-sayt-search-terms></gb-sayt-search-terms> <gb-sayt-divider></gb-sayt-divider> <gb-sayt-refinements each="{navigations}"></gb-sayt-refinements> </yield>', '.gb-stylish gb-sayt-autocomplete,.gb-stylish [riot-tag="gb-sayt-autocomplete"],.gb-stylish [data-is="gb-sayt-autocomplete"]{ min-width: 210px; }', '', function (opts) {});

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(169);
	
	__webpack_require__(227);
	
	__webpack_require__(228);
	
	riot.tag2('gb-sayt-categories', '<gb-list items="{categoryResults}"> <gb-sayt-link send="{_scope.searchCategory}" data-value="{item.value}" data-refinement="{item.category}" data-field="{_scope.categoryField}" data-norefine="{item.noRefine}"> <yield> <gb-raw content="{_scope.highlightCurrentQuery(item.value, \'<b>$&</b>\')}"></gb-raw> in <span class="gb-category-query">{item.category}</span> </yield> </gb-sayt-link> </gb-list>', '.gb-stylish gb-sayt-categories .gb-category-query,.gb-stylish [riot-tag="gb-sayt-categories"] .gb-category-query,.gb-stylish [data-is="gb-sayt-categories"] .gb-category-query{ font-weight: bold; color: darkorange; }', '', function (opts) {
	
	    this._scopeTo('gb-sayt');
	});

/***/ },
/* 227 */
/***/ function(module, exports) {

	'use strict';
	
	riot.tag2('gb-sayt-link', '<a onclick="{opts.send}"> <yield></yield> </a>', '.gb-stylish gb-sayt-link a,.gb-stylish [riot-tag="gb-sayt-link"] a,.gb-stylish [data-is="gb-sayt-link"] a{ padding: 5px 15px; text-decoration: none; display: block; }', '', function (opts) {});

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _gbRaw = __webpack_require__(229);
	
	riot.tag2('gb-raw', '<span></span>', '', '', function (opts) {
	    this._mixin(_gbRaw.Raw);
	});

/***/ },
/* 229 */
/***/ function(module, exports) {

	"use strict";
	var Raw = (function () {
	    function Raw() {
	    }
	    Raw.prototype.init = function () {
	        this.on('update', this.updateContent);
	        this.on('mount', this.updateContent);
	    };
	    Raw.prototype.updateContent = function () {
	        this.root.innerHTML = this.opts.content;
	    };
	    return Raw;
	}());
	exports.Raw = Raw;


/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(169);
	
	__webpack_require__(227);
	
	__webpack_require__(228);
	
	riot.tag2('gb-sayt-search-terms', '<gb-list items="{_scope.queries}"> <gb-sayt-link send="{_scope.search}" data-value="{item.value}"> <yield> <gb-raw content="{_scope.highlightCurrentQuery(item.value, \'<b>$&</b>\')}"></gb-raw> </yield> </gb-sayt-link> </gb-list>', '', '', function (opts) {
	
	    this._scopeTo('gb-sayt');
	});

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(169);
	
	__webpack_require__(227);
	
	__webpack_require__(228);
	
	riot.tag2('gb-sayt-refinements', '<h4>{displayName}</h4> <gb-list items="{values}"> <gb-sayt-link send="{_scope.searchRefinement}" data-value="{displayName}: {item}" data-refinement="{item}" data-field="{name}"> <yield> <gb-raw content="{_scope.highlightCurrentQuery(item, \'<b>$&</b>\')}"></gb-raw> </yield> </gb-sayt-link> </gb-list>', '.gb-stylish gb-sayt-refinements h4,.gb-stylish [riot-tag="gb-sayt-refinements"] h4,.gb-stylish [data-is="gb-sayt-refinements"] h4{ margin: 4px; }', '', function (opts) {
	
	    this._scopeTo('gb-sayt');
	});

/***/ },
/* 232 */
/***/ function(module, exports) {

	'use strict';
	
	riot.tag2('gb-sayt-divider', '<div if="{isVisible()}"></div>', '.gb-stylish gb-sayt-divider div,.gb-stylish [riot-tag="gb-sayt-divider"] div,.gb-stylish [data-is="gb-sayt-divider"] div{ display: block; margin: 3px 10%; border-top: 1px solid #777; }', '', function (opts) {
	  var _this = this;
	
	  this.isVisible = function () {
	    return _this.root.nextElementSibling && _this.root.nextElementSibling.querySelector('li') && _this.root.previousElementSibling && _this.root.previousElementSibling.querySelector('li');
	  };
	});

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(234);
	
	__webpack_require__(235);
	
	riot.tag2('gb-sayt-products', '<ul class="{_style}"> <li class="gb-sayt-product" each="{products}"> <yield> <gb-product all_meta="{allMeta}"> <gb-product-image thumbnail></gb-product-image> </gb-product> </yield> </li> </ul>', '.gb-stylish gb-sayt-products,.gb-stylish [riot-tag="gb-sayt-products"],.gb-stylish [data-is="gb-sayt-products"]{ min-width: 300px; } gb-sayt-products ul.gb-stylish,[riot-tag="gb-sayt-products"] ul.gb-stylish,[data-is="gb-sayt-products"] ul.gb-stylish{ display: flex; flex-wrap: wrap; align-items: center; width: calc(86px * 4); align-content: flex-start; } gb-sayt-products .gb-stylish gb-product-image img,[riot-tag="gb-sayt-products"] .gb-stylish gb-product-image img,[data-is="gb-sayt-products"] .gb-stylish gb-product-image img{ vertical-align: bottom; margin: 3px; } gb-sayt-products .gb-stylish gb-product-image img:hover,[riot-tag="gb-sayt-products"] .gb-stylish gb-product-image img:hover,[data-is="gb-sayt-products"] .gb-stylish gb-product-image img:hover{ box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2); }', '', function (opts) {
	    this._scopeTo('gb-sayt');
	});

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(235);
	
	__webpack_require__(236);
	
	__webpack_require__(237);
	
	var _gbProduct = __webpack_require__(238);
	
	riot.tag2('gb-product', '<yield> <gb-product-image></gb-product-image> <gb-product-info></gb-product-info> <gb-variant-switcher></gb-variant-switcher> </yield>', '', '', function (opts) {
	    this._mixin(_gbProduct.Product);
	});

/***/ },
/* 235 */
/***/ function(module, exports) {

	'use strict';
	
	riot.tag2('gb-product-image', '<a class="gb-product-image {_style}" href="{_scope.link()}"> <img class="{thumbnail: opts.thumbnail !== undefined}" riot-src="{imageLink()}" alt=""> </a>', 'gb-product-image .gb-product-image.gb-stylish img,[riot-tag="gb-product-image"] .gb-product-image.gb-stylish img,[data-is="gb-product-image"] .gb-product-image.gb-stylish img{ width: 380px; } gb-product-image .gb-product-image.gb-stylish img.thumbnail,[riot-tag="gb-product-image"] .gb-product-image.gb-stylish img.thumbnail,[data-is="gb-product-image"] .gb-product-image.gb-stylish img.thumbnail{ width: 80px; }', '', function (opts) {
	    this._scopeTo('gb-product');
	    var _scope = this._scope;
	    this.imageLink = function () {
	        return _scope.image(_scope.productMeta().image);
	    };
	});

/***/ },
/* 236 */
/***/ function(module, exports) {

	'use strict';
	
	riot.tag2('gb-product-info', '<a href="{_scope.link()}"> <p class="gb-product__title">{_scope.productMeta().title}</p> <p class="gb-product__price">{_scope.productMeta().price}</p> </a>', '', '', function (opts) {
	    this._scopeTo('gb-product');
	});

/***/ },
/* 237 */
/***/ function(module, exports) {

	'use strict';
	
	riot.tag2('gb-variant-switcher', '<a if="{_scope.variants.length > 1}" each="{variant, i in _scope.variants}" class="gb-product__variant-link" onclick="{_scope.switchVariant}" data-index="{i}"> {i} </a>', '', '', function (opts) {
	    this._scopeTo('gb-product');
	});

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var product_transformer_1 = __webpack_require__(192);
	var clone = __webpack_require__(118);
	var oget = __webpack_require__(43);
	var Product = (function () {
	    function Product() {
	    }
	    Product.prototype.init = function () {
	        this.variantIndex = 0;
	        this.detailsUrl = oget(this.services, 'url.urlConfig.detailsUrl', 'details.html');
	        this.struct = this._scope.struct || this.config.structure || {};
	        this.transformer = new product_transformer_1.ProductTransformer(this.struct);
	        this.transformRecord(this.opts.all_meta);
	    };
	    Product.prototype.transformRecord = function (allMeta) {
	        var _this = this;
	        var productMeta = this.transformer.transform(clone(allMeta, false));
	        this.update({
	            productMeta: function () { return productMeta(_this.variantIndex); },
	            variants: productMeta.variants || [],
	            allMeta: productMeta.transformedMeta
	        });
	    };
	    Product.prototype.link = function () {
	        return this.productMeta().url || this.detailsUrl + "?id=" + this.productMeta().id;
	    };
	    Product.prototype.image = function (imageObj) {
	        return Array.isArray(imageObj) ? imageObj[0] : imageObj;
	    };
	    Product.prototype.switchVariant = function (event) {
	        var variantIndex = event.target.dataset['index'];
	        this.update({ variantIndex: variantIndex });
	    };
	    return Product;
	}());
	exports.Product = Product;


/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(40);
	var autocomplete_1 = __webpack_require__(240);
	var groupby_api_1 = __webpack_require__(102);
	var escapeStringRegexp = __webpack_require__(241);
	var DEFAULT_CONFIG = {
	    products: 4,
	    queries: 5,
	    autoSearch: true,
	    staticSearch: false,
	    highlight: true,
	    navigationNames: {},
	    allowedNavigations: []
	};
	var Sayt = (function () {
	    function Sayt() {
	    }
	    Sayt.prototype.init = function () {
	        var _this = this;
	        this.saytConfig = Object.assign({}, DEFAULT_CONFIG, common_1.getPath(this.config, 'tags.sayt'));
	        this.categoryField = this.saytConfig.categoryField;
	        this.struct = Object.assign({}, this.config.structure, this.saytConfig.structure);
	        this.allCategoriesLabel = this.saytConfig.allCategoriesLabel || 'All Departments';
	        this.showProducts = this.saytConfig.products > 0;
	        this.sayt.configure(this.generateSaytConfig());
	        this.on('mount', function () { return _this.autocomplete = new autocomplete_1.Autocomplete(_this); });
	        this.flux.on('autocomplete:hide', this.reset);
	    };
	    Sayt.prototype.generateSaytConfig = function () {
	        return {
	            subdomain: this.config.customerId,
	            collection: this.saytConfig.collection || this.config.collection,
	            autocomplete: { numSearchTerms: this.saytConfig.queries },
	            productSearch: {
	                area: this.saytConfig.area || this.config.area,
	                numProducts: this.saytConfig.products
	            },
	            https: this.saytConfig.https
	        };
	    };
	    Sayt.prototype.reset = function () {
	        this.autocomplete.reset();
	        this.update({ queries: null, navigations: null, products: null });
	    };
	    Sayt.prototype.fetchSuggestions = function (originalQuery) {
	        var _this = this;
	        this.sayt.autocomplete(originalQuery)
	            .then(function (_a) {
	            var result = _a.result;
	            _this.update({ originalQuery: originalQuery });
	            _this.processResults(result);
	            if (_this.queries && _this.showProducts) {
	                var query = _this.matchesInput ? originalQuery : _this.queries[0].value;
	                _this.searchProducts(query);
	            }
	        })
	            .catch(function (err) { return console.error(err); });
	    };
	    Sayt.prototype.searchProducts = function (query) {
	        var _this = this;
	        if (this.showProducts) {
	            this.sayt.productSearch(query)
	                .then(function (res) { return _this.update({ products: res.result.products }); });
	        }
	    };
	    Sayt.prototype.rewriteQuery = function (query) {
	        this.flux.emit(groupby_api_1.Events.REWRITE_QUERY, query);
	    };
	    Sayt.prototype.notifier = function (query) {
	        if (this.saytConfig.autoSearch)
	            this.searchProducts(query);
	        this.rewriteQuery(query);
	    };
	    Sayt.prototype.processResults = function (result) {
	        var _this = this;
	        var categoryResults = [];
	        this.matchesInput = result.searchTerms
	            && result.searchTerms[0].value.toLowerCase() === this.originalQuery.toLowerCase();
	        if (this.matchesInput) {
	            var categoryQuery = result.searchTerms.splice(0, 1)[0];
	            categoryResults = this.extractCategoryResults(categoryQuery);
	        }
	        var navigations = result.navigations ? result.navigations
	            .map(function (nav) { return Object.assign(nav, { displayName: _this.saytConfig.navigationNames[nav.name] || nav.name }); })
	            .filter(function (_a) {
	            var name = _a.name;
	            return _this.saytConfig.allowedNavigations.includes(name);
	        }) : [];
	        this.update({
	            results: result,
	            navigations: navigations,
	            queries: result.searchTerms,
	            categoryResults: categoryResults
	        });
	    };
	    Sayt.prototype.extractCategoryResults = function (_a) {
	        var additionalInfo = _a.additionalInfo, value = _a.value;
	        var categoryResults = [];
	        if (this.categoryField && this.categoryField in additionalInfo) {
	            categoryResults = additionalInfo[this.categoryField]
	                .map(function (category) { return ({ category: category, value: value }); })
	                .slice(0, 3);
	            categoryResults.unshift({ category: this.allCategoriesLabel, value: value, noRefine: true });
	        }
	        return categoryResults;
	    };
	    Sayt.prototype.searchRefinement = function (event) {
	        this.flux.resetRecall();
	        this.refine(event.target, '');
	    };
	    Sayt.prototype.searchCategory = function (event) {
	        this.flux.resetRecall();
	        this.refine(event.target, this.originalQuery);
	    };
	    Sayt.prototype.highlightCurrentQuery = function (value, regexReplacement) {
	        return this.saytConfig.highlight
	            ? value.replace(new RegExp(escapeStringRegexp(this.originalQuery), 'i'), regexReplacement)
	            : value;
	    };
	    Sayt.prototype.enhanceCategoryQuery = function (query) {
	        return "<b>" + query.value + "</b> in <span class=\"gb-category-query\">" + query.category + "</span>";
	    };
	    Sayt.prototype.refine = function (node, query) {
	        while (node.tagName !== 'GB-SAYT-LINK')
	            node = node.parentElement;
	        var doRefinement = !node.dataset['norefine'];
	        var refinement = {
	            navigationName: node.dataset['field'],
	            value: node.dataset['refinement'],
	            type: 'Value'
	        };
	        if (this.saytConfig.staticSearch && this.services.url.active()) {
	            this.services.url.update(query, doRefinement ? [refinement] : []);
	        }
	        else if (doRefinement) {
	            this.flux.rewrite(query, { skipSearch: true });
	            this.flux.refine(refinement);
	        }
	        else {
	            this.flux.reset(query);
	        }
	    };
	    Sayt.prototype.search = function (event) {
	        var node = event.target;
	        while (node.tagName !== 'GB-SAYT-LINK')
	            node = node.parentElement;
	        var query = node.dataset['value'];
	        if (this.saytConfig.staticSearch && this.services.url.active()) {
	            this.services.url.update(query, []);
	        }
	        else {
	            this.rewriteQuery(query);
	            this.flux.reset(query);
	        }
	    };
	    Sayt.prototype.listenForInput = function (tag) {
	        var _this = this;
	        var input = tag.searchBox;
	        input.autocomplete = 'off';
	        var minimumCharacters = this.saytConfig.minimumCharacters || 1;
	        var delay = Math.max(this.saytConfig.delay || 100, 100);
	        var debouncedSearch = common_1.debounce(function () {
	            if (input.value.length >= minimumCharacters) {
	                _this.fetchSuggestions(input.value);
	            }
	            else {
	                _this.reset();
	            }
	        }, delay);
	        document.addEventListener('click', this.reset);
	        input.addEventListener('input', debouncedSearch);
	    };
	    return Sayt;
	}());
	exports.Sayt = Sayt;


/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(40);
	var KEY_UP = 38;
	var KEY_DOWN = 40;
	var KEY_ENTER = 13;
	var KEY_ESCAPE = 27;
	var ACTIVE = 'active';
	var Autocomplete = (function () {
	    function Autocomplete(tag) {
	        this.tag = tag;
	        this.selected = this.searchInput = common_1.findSearchBox();
	    }
	    Autocomplete.prototype.indexOfSelected = function () {
	        return this.links().indexOf(this.selected);
	    };
	    Autocomplete.prototype.selectLink = function (link) {
	        if (link)
	            this.selected = this.swapAttributes(link);
	    };
	    Autocomplete.prototype.linkAbove = function () {
	        return this.links()[this.indexOfSelected() - 1];
	    };
	    Autocomplete.prototype.linkBelow = function () {
	        return this.links()[this.indexOfSelected() + 1];
	    };
	    Autocomplete.prototype.links = function () {
	        return Array.from(this.tag.root.querySelectorAll('gb-sayt-autocomplete gb-sayt-link'));
	    };
	    Autocomplete.prototype.isSelectedInAutocomplete = function () {
	        return this.links().indexOf(this.selected) !== -1;
	    };
	    Autocomplete.prototype.swapAttributes = function (next) {
	        this.removeActiveClass();
	        next.classList.add(ACTIVE);
	        if (next.dataset['value'])
	            this.tag.notifier(next.dataset['value']);
	        return next;
	    };
	    Autocomplete.prototype.resetSelected = function () {
	        this.selected = this.searchInput;
	    };
	    Autocomplete.prototype.removeActiveClass = function () {
	        this.links().forEach(function (element) { return element.classList.remove('active'); });
	    };
	    Autocomplete.prototype.reset = function () {
	        this.removeActiveClass();
	        this.resetSelected();
	    };
	    Autocomplete.prototype.keyboardListener = function (event, submitDefault) {
	        switch (event.keyCode) {
	            case KEY_UP:
	                // prevent cursor from moving to front of text box
	                event.preventDefault();
	                if (this.isSelectedInAutocomplete()) {
	                    if (this.linkAbove()) {
	                        this.selectLink(this.linkAbove());
	                    }
	                    else {
	                        this.searchInput.value = this.preautocompleteValue;
	                        this.reset();
	                    }
	                }
	                else {
	                    this.tag.flux.emit('autocomplete:hide');
	                }
	                break;
	            case KEY_DOWN:
	                if (this.isSelectedInAutocomplete()) {
	                    this.selectLink(this.linkBelow());
	                }
	                else {
	                    this.preautocompleteValue = this.searchInput.value;
	                    this.selectLink(this.linkBelow());
	                }
	                break;
	            case KEY_ENTER:
	                if (this.isSelectedInAutocomplete()) {
	                    this.selected.querySelector('a').click();
	                    this.reset();
	                }
	                else {
	                    submitDefault();
	                }
	                break;
	            case KEY_ESCAPE:
	                this.tag.flux.emit('autocomplete:hide');
	                break;
	        }
	    };
	    return Autocomplete;
	}());
	exports.Autocomplete = Autocomplete;


/***/ },
/* 241 */
/***/ function(module, exports) {

	'use strict';
	
	var matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
	
	module.exports = function (str) {
		if (typeof str !== 'string') {
			throw new TypeError('Expected a string');
		}
	
		return str.replace(matchOperatorsRe, '\\$&');
	};


/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(40);
	__webpack_require__(224);
	var groupby_api_1 = __webpack_require__(102);
	var KEY_ENTER = 13;
	var Query = (function () {
	    function Query() {
	    }
	    Query.prototype.init = function () {
	        var _this = this;
	        this.parentOpts = this.opts.passthrough || this.opts;
	        this.saytEnabled = common_1.unless(this.parentOpts.sayt, true);
	        this.autoSearch = common_1.unless(this.parentOpts.autoSearch, true);
	        this.staticSearch = common_1.unless(this.parentOpts.staticSearch, false);
	        this.enterKeyHandlers = [];
	        this.on('mount', function () {
	            _this.searchBox = _this.findSearchBox();
	            _this.searchBox.addEventListener('keydown', _this.keydownListener);
	            if (_this.saytEnabled)
	                _this.tags['gb-sayt'].listenForInput(_this);
	        });
	        if (this.autoSearch) {
	            this.on('mount', this.listenForInput);
	        }
	        else if (this.staticSearch) {
	            this.on('mount', this.listenForStaticSearch);
	        }
	        else {
	            this.on('mount', this.listenForSubmit);
	        }
	        this.flux.on(groupby_api_1.Events.REWRITE_QUERY, this.rewriteQuery);
	    };
	    Query.prototype.rewriteQuery = function (query) {
	        this.searchBox.value = query;
	    };
	    Query.prototype.listenForInput = function () {
	        var _this = this;
	        this.searchBox.addEventListener('input', function () { return _this.flux.reset(_this.inputValue()); });
	    };
	    Query.prototype.listenForSubmit = function () {
	        var _this = this;
	        this.enterKeyHandlers.push(function () { return _this.flux.reset(_this.inputValue()); });
	    };
	    Query.prototype.listenForStaticSearch = function () {
	        this.enterKeyHandlers.push(this.setLocation);
	    };
	    Query.prototype.keydownListener = function (event) {
	        var sayt = common_1.findTag('gb-sayt');
	        if (sayt) {
	            var autocomplete = sayt['_tag'].autocomplete;
	            autocomplete.keyboardListener(event, this.onSubmit);
	        }
	        else if (event.keyCode === KEY_ENTER) {
	            this.onSubmit();
	        }
	    };
	    Query.prototype.onSubmit = function () {
	        this.enterKeyHandlers.forEach(function (f) { return f(); });
	        this.flux.emit('autocomplete:hide');
	    };
	    Query.prototype.findSearchBox = function () {
	        if (this.tags['gb-search-box']) {
	            return this.tags['gb-search-box'].searchBox;
	        }
	        else {
	            return this.root.querySelector('input');
	        }
	    };
	    Query.prototype.inputValue = function () {
	        return this.searchBox.value;
	    };
	    Query.prototype.setLocation = function () {
	        // TODO better way to do this is with browser history rewrites
	        if (this.services.url.active()) {
	            this.services.url.update(this.inputValue());
	        }
	        else {
	            this.flux.reset(this.inputValue());
	        }
	    };
	    return Query;
	}());
	exports.Query = Query;


/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _gbRecordCount = __webpack_require__(244);
	
	riot.tag2('gb-record-count', '<yield> <h2>{first} - {last} of {total} Products</h2> </yield>', '', '', function (opts) {
	    this._mixin(_gbRecordCount.RecordCount);
	});

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var groupby_api_1 = __webpack_require__(102);
	var RecordCount = (function () {
	    function RecordCount() {
	    }
	    RecordCount.prototype.init = function () {
	        var _this = this;
	        this.flux.on(groupby_api_1.Events.RESULTS, function (res) { return _this.updatePageInfo(res); });
	    };
	    RecordCount.prototype.updatePageInfo = function (_a) {
	        var pageInfo = _a.pageInfo, totalRecordCount = _a.totalRecordCount;
	        this.update({
	            first: pageInfo.recordStart,
	            last: pageInfo.recordEnd,
	            total: totalRecordCount
	        });
	    };
	    return RecordCount;
	}());
	exports.RecordCount = RecordCount;


/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(169);
	
	var _gbRelatedQueries = __webpack_require__(246);
	
	riot.tag2('gb-related-queries', '<yield> <gb-list class="{_style}" items="{relatedQueries}" scope="gb-related-queries" inline> <a onclick="{_scope.send}">{item}</a> </gb-list> </yield>', '', '', function (opts) {
	    this._mixin(_gbRelatedQueries.RelatedQueries);
	});

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var groupby_api_1 = __webpack_require__(102);
	var RelatedQueries = (function () {
	    function RelatedQueries() {
	    }
	    RelatedQueries.prototype.init = function () {
	        var _this = this;
	        this.flux.on(groupby_api_1.Events.RESULTS, function (_a) {
	            var relatedQueries = _a.relatedQueries;
	            return _this.updatedRelatedQueries(relatedQueries);
	        });
	    };
	    RelatedQueries.prototype.updatedRelatedQueries = function (relatedQueries) {
	        this.update({ relatedQueries: relatedQueries });
	    };
	    RelatedQueries.prototype.send = function (event) {
	        return this.flux.rewrite(event.target.text);
	    };
	    return RelatedQueries;
	}());
	exports.RelatedQueries = RelatedQueries;


/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(169);
	
	__webpack_require__(234);
	
	var _gbResults = __webpack_require__(248);
	
	riot.tag2('gb-results', '<yield> <gb-list items="{records}"> <gb-product all_meta="{item.allMeta}"></gb-product> </gb-list> </yield>', 'gb-results .gb-stylish gb-list,[riot-tag="gb-results"] .gb-stylish gb-list,[data-is="gb-results"] .gb-stylish gb-list{ padding: 0; list-style: none; display: flex; flex-wrap: wrap; justify-content: space-around; } gb-results .gb-stylish gb-product,[riot-tag="gb-results"] .gb-stylish gb-product,[data-is="gb-results"] .gb-stylish gb-product{ display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; }', '', function (opts) {
	    this._mixin(_gbResults.Results);
	});

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(40);
	var groupby_api_1 = __webpack_require__(102);
	var Results = (function () {
	    function Results() {
	    }
	    Results.prototype.init = function () {
	        this.struct = this.config.structure;
	        this.variantStruct = common_1.unless(this.struct._variantStructure, this.struct);
	        this.getPath = common_1.getPath;
	        this.flux.on(groupby_api_1.Events.RESULTS, this.updateRecords);
	    };
	    Results.prototype.updateRecords = function (_a) {
	        var records = _a.records;
	        this.update({ records: records, collection: this.flux.query.raw.collection });
	    };
	    Results.prototype.userStyle = function (key) {
	        return this.opts.css ? this.opts.css[key] : '';
	    };
	    return Results;
	}());
	exports.Results = Results;


/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _gbSnippet = __webpack_require__(250);
	
	riot.tag2('gb-snippet', '<div class="gb-snippet"> {responseText} </div>', '', '', function (opts) {
	    this._mixin(_gbSnippet.Snippet);
	});

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(40);
	var Snippet = (function () {
	    function Snippet() {
	    }
	    Snippet.prototype.init = function () {
	        this.isRaw = common_1.unless(this.opts.raw, false);
	        this.on('mount', this.loadFile);
	    };
	    Snippet.prototype.loadFile = function () {
	        var _this = this;
	        var req = new XMLHttpRequest();
	        req.onload = function () {
	            var responseText = req.responseText;
	            if (_this.isRaw) {
	                _this.root.innerHTML = responseText;
	            }
	            else {
	                _this.update({ responseText: responseText });
	            }
	        };
	        req.open('get', this.opts.url, true);
	        req.send();
	    };
	    return Snippet;
	}());
	exports.Snippet = Snippet;


/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(181);
	
	var _gbSort = __webpack_require__(252);
	
	riot.tag2('gb-sort', '<yield> <gb-select scope="gb-sort"> </gb-select> </yield>', '', '', function (opts) {
	    this._mixin(_gbSort.Sort);
	});

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var common_1 = __webpack_require__(40);
	var Sort = (function () {
	    function Sort() {
	    }
	    Sort.prototype.init = function () {
	        this._config = common_1.getPath(this.config, 'tags.sort') || this.opts;
	        this.options = common_1.unless(this._config.options, [
	            { label: 'Name Descending', value: { field: 'title', order: 'Descending' } },
	            { label: 'Name Ascending', value: { field: 'title', order: 'Ascending' } }
	        ]);
	    };
	    Sort.prototype.sortValues = function () {
	        return this.options.map(function (option) { return option.value; });
	    };
	    Sort.prototype.onselect = function (value) {
	        return this.flux.sort(value, this.sortValues());
	    };
	    return Sort;
	}());
	exports.Sort = Sort;


/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(254);
	
	__webpack_require__(255);
	
	__webpack_require__(256);
	
	var _gbTemplate = __webpack_require__(257);
	
	riot.tag2('gb-template', '<div if="{isActive}"> <yield> <div each="{zone in zones}" class="gb-zone-{zone.name}"> <gb-content-zone if="{zone.type === \'Content\'}"></gb-content-zone> <gb-rich-content-zone if="{zone.type === \'Rich_Content\'}"></gb-rich-content-zone> <gb-record-zone if="{zone.type === \'Record\'}"></gb-record-zone> </div> </yield> </div>', '', '', function (opts) {
	    this._mixin(_gbTemplate.Template);
	});

/***/ },
/* 254 */
/***/ function(module, exports) {

	'use strict';
	
	riot.tag2('gb-content-zone', '<span>{zone.content}</span>', '', '', function (opts) {});

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(228);
	
	riot.tag2('gb-rich-content-zone', '<gb-raw content="{zone.richContent}"></gb-raw>', '', '', function (opts) {});

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(169);
	
	riot.tag2('gb-record-zone', '<gb-list items="{zone.records}"> <gb-product all_meta="{item.allMeta}"></gb-product> </gb-list>', '', '', function (opts) {});

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var groupby_api_1 = __webpack_require__(102);
	var Template = (function () {
	    function Template() {
	    }
	    Template.prototype.init = function () {
	        this.target = this.opts.target;
	        this.flux.on(groupby_api_1.Events.RESULTS, this.updateActive);
	    };
	    Template.prototype.updateActive = function (_a) {
	        var template = _a.template;
	        this.update({
	            isActive: template.name === this.target,
	            zoneMap: template.zones,
	            zones: Object.keys(template.zones).map(function (key) { return template.zones[key]; })
	                .reduce(function (list, zone) {
	                if (zone.type === 'Record') {
	                    list.push(zone);
	                }
	                else {
	                    list.unshift(zone);
	                }
	                return list;
	            }, [])
	        });
	    };
	    return Template;
	}());
	exports.Template = Template;


/***/ }
/******/ ])));