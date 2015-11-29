(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var endsWith = function(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  var _cmp = 'components/';
  var unalias = function(alias, loaderPath) {
    var start = 0;
    if (loaderPath) {
      if (loaderPath.indexOf(_cmp) === 0) {
        start = _cmp.length;
      }
      if (loaderPath.indexOf('/', start) > 0) {
        loaderPath = loaderPath.substring(start, loaderPath.indexOf('/', start));
      }
    }
    var result = aliases[alias + '/index.js'] || aliases[loaderPath + '/deps/' + alias + '/index.js'];
    if (result) {
      return _cmp + result.substring(0, result.length - '.js'.length);
    }
    return alias;
  };

  var _reg = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (_reg.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';
    path = unalias(name, loaderPath);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has.call(cache, dirIndex)) return cache[dirIndex].exports;
    if (has.call(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  require.list = function() {
    var result = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  require.brunch = true;
  require._cache = cache;
  globals.require = require;
})();
/*!

 handlebars v4.0.5

Copyright (C) 2011-2015 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Handlebars"] = factory();
	else
		root["Handlebars"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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

	'use strict';

	var _interopRequireWildcard = __webpack_require__(1)['default'];

	var _interopRequireDefault = __webpack_require__(2)['default'];

	exports.__esModule = true;

	var _handlebarsBase = __webpack_require__(3);

	var base = _interopRequireWildcard(_handlebarsBase);

	// Each of these augment the Handlebars object. No need to setup here.
	// (This is done to easily share code between commonjs and browse envs)

	var _handlebarsSafeString = __webpack_require__(17);

	var _handlebarsSafeString2 = _interopRequireDefault(_handlebarsSafeString);

	var _handlebarsException = __webpack_require__(5);

	var _handlebarsException2 = _interopRequireDefault(_handlebarsException);

	var _handlebarsUtils = __webpack_require__(4);

	var Utils = _interopRequireWildcard(_handlebarsUtils);

	var _handlebarsRuntime = __webpack_require__(18);

	var runtime = _interopRequireWildcard(_handlebarsRuntime);

	var _handlebarsNoConflict = __webpack_require__(19);

	var _handlebarsNoConflict2 = _interopRequireDefault(_handlebarsNoConflict);

	// For compatibility and usage outside of module systems, make the Handlebars object a namespace
	function create() {
	  var hb = new base.HandlebarsEnvironment();

	  Utils.extend(hb, base);
	  hb.SafeString = _handlebarsSafeString2['default'];
	  hb.Exception = _handlebarsException2['default'];
	  hb.Utils = Utils;
	  hb.escapeExpression = Utils.escapeExpression;

	  hb.VM = runtime;
	  hb.template = function (spec) {
	    return runtime.template(spec, hb);
	  };

	  return hb;
	}

	var inst = create();
	inst.create = create;

	_handlebarsNoConflict2['default'](inst);

	inst['default'] = inst;

	exports['default'] = inst;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  if (obj && obj.__esModule) {
	    return obj;
	  } else {
	    var newObj = {};

	    if (obj != null) {
	      for (var key in obj) {
	        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
	      }
	    }

	    newObj["default"] = obj;
	    return newObj;
	  }
	};

	exports.__esModule = true;

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	exports["default"] = function (obj) {
	  return obj && obj.__esModule ? obj : {
	    "default": obj
	  };
	};

	exports.__esModule = true;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)['default'];

	exports.__esModule = true;
	exports.HandlebarsEnvironment = HandlebarsEnvironment;

	var _utils = __webpack_require__(4);

	var _exception = __webpack_require__(5);

	var _exception2 = _interopRequireDefault(_exception);

	var _helpers = __webpack_require__(6);

	var _decorators = __webpack_require__(14);

	var _logger = __webpack_require__(16);

	var _logger2 = _interopRequireDefault(_logger);

	var VERSION = '4.0.5';
	exports.VERSION = VERSION;
	var COMPILER_REVISION = 7;

	exports.COMPILER_REVISION = COMPILER_REVISION;
	var REVISION_CHANGES = {
	  1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
	  2: '== 1.0.0-rc.3',
	  3: '== 1.0.0-rc.4',
	  4: '== 1.x.x',
	  5: '== 2.0.0-alpha.x',
	  6: '>= 2.0.0-beta.1',
	  7: '>= 4.0.0'
	};

	exports.REVISION_CHANGES = REVISION_CHANGES;
	var objectType = '[object Object]';

	function HandlebarsEnvironment(helpers, partials, decorators) {
	  this.helpers = helpers || {};
	  this.partials = partials || {};
	  this.decorators = decorators || {};

	  _helpers.registerDefaultHelpers(this);
	  _decorators.registerDefaultDecorators(this);
	}

	HandlebarsEnvironment.prototype = {
	  constructor: HandlebarsEnvironment,

	  logger: _logger2['default'],
	  log: _logger2['default'].log,

	  registerHelper: function registerHelper(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple helpers');
	      }
	      _utils.extend(this.helpers, name);
	    } else {
	      this.helpers[name] = fn;
	    }
	  },
	  unregisterHelper: function unregisterHelper(name) {
	    delete this.helpers[name];
	  },

	  registerPartial: function registerPartial(name, partial) {
	    if (_utils.toString.call(name) === objectType) {
	      _utils.extend(this.partials, name);
	    } else {
	      if (typeof partial === 'undefined') {
	        throw new _exception2['default']('Attempting to register a partial called "' + name + '" as undefined');
	      }
	      this.partials[name] = partial;
	    }
	  },
	  unregisterPartial: function unregisterPartial(name) {
	    delete this.partials[name];
	  },

	  registerDecorator: function registerDecorator(name, fn) {
	    if (_utils.toString.call(name) === objectType) {
	      if (fn) {
	        throw new _exception2['default']('Arg not supported with multiple decorators');
	      }
	      _utils.extend(this.decorators, name);
	    } else {
	      this.decorators[name] = fn;
	    }
	  },
	  unregisterDecorator: function unregisterDecorator(name) {
	    delete this.decorators[name];
	  }
	};

	var log = _logger2['default'].log;

	exports.log = log;
	exports.createFrame = _utils.createFrame;
	exports.logger = _logger2['default'];

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.extend = extend;
	exports.indexOf = indexOf;
	exports.escapeExpression = escapeExpression;
	exports.isEmpty = isEmpty;
	exports.createFrame = createFrame;
	exports.blockParams = blockParams;
	exports.appendContextPath = appendContextPath;
	var escape = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#x27;',
	  '`': '&#x60;',
	  '=': '&#x3D;'
	};

	var badChars = /[&<>"'`=]/g,
	    possible = /[&<>"'`=]/;

	function escapeChar(chr) {
	  return escape[chr];
	}

	function extend(obj /* , ...source */) {
	  for (var i = 1; i < arguments.length; i++) {
	    for (var key in arguments[i]) {
	      if (Object.prototype.hasOwnProperty.call(arguments[i], key)) {
	        obj[key] = arguments[i][key];
	      }
	    }
	  }

	  return obj;
	}

	var toString = Object.prototype.toString;

	exports.toString = toString;
	// Sourced from lodash
	// https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
	/* eslint-disable func-style */
	var isFunction = function isFunction(value) {
	  return typeof value === 'function';
	};
	// fallback for older versions of Chrome and Safari
	/* istanbul ignore next */
	if (isFunction(/x/)) {
	  exports.isFunction = isFunction = function (value) {
	    return typeof value === 'function' && toString.call(value) === '[object Function]';
	  };
	}
	exports.isFunction = isFunction;

	/* eslint-enable func-style */

	/* istanbul ignore next */
	var isArray = Array.isArray || function (value) {
	  return value && typeof value === 'object' ? toString.call(value) === '[object Array]' : false;
	};

	exports.isArray = isArray;
	// Older IE versions do not directly support indexOf so we must implement our own, sadly.

	function indexOf(array, value) {
	  for (var i = 0, len = array.length; i < len; i++) {
	    if (array[i] === value) {
	      return i;
	    }
	  }
	  return -1;
	}

	function escapeExpression(string) {
	  if (typeof string !== 'string') {
	    // don't escape SafeStrings, since they're already safe
	    if (string && string.toHTML) {
	      return string.toHTML();
	    } else if (string == null) {
	      return '';
	    } else if (!string) {
	      return string + '';
	    }

	    // Force a string conversion as this will be done by the append regardless and
	    // the regex test will do this transparently behind the scenes, causing issues if
	    // an object's to string has escaped characters in it.
	    string = '' + string;
	  }

	  if (!possible.test(string)) {
	    return string;
	  }
	  return string.replace(badChars, escapeChar);
	}

	function isEmpty(value) {
	  if (!value && value !== 0) {
	    return true;
	  } else if (isArray(value) && value.length === 0) {
	    return true;
	  } else {
	    return false;
	  }
	}

	function createFrame(object) {
	  var frame = extend({}, object);
	  frame._parent = object;
	  return frame;
	}

	function blockParams(params, ids) {
	  params.path = ids;
	  return params;
	}

	function appendContextPath(contextPath, id) {
	  return (contextPath ? contextPath + '.' : '') + id;
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

	function Exception(message, node) {
	  var loc = node && node.loc,
	      line = undefined,
	      column = undefined;
	  if (loc) {
	    line = loc.start.line;
	    column = loc.start.column;

	    message += ' - ' + line + ':' + column;
	  }

	  var tmp = Error.prototype.constructor.call(this, message);

	  // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
	  for (var idx = 0; idx < errorProps.length; idx++) {
	    this[errorProps[idx]] = tmp[errorProps[idx]];
	  }

	  /* istanbul ignore else */
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, Exception);
	  }

	  if (loc) {
	    this.lineNumber = line;
	    this.column = column;
	  }
	}

	Exception.prototype = new Error();

	exports['default'] = Exception;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)['default'];

	exports.__esModule = true;
	exports.registerDefaultHelpers = registerDefaultHelpers;

	var _helpersBlockHelperMissing = __webpack_require__(7);

	var _helpersBlockHelperMissing2 = _interopRequireDefault(_helpersBlockHelperMissing);

	var _helpersEach = __webpack_require__(8);

	var _helpersEach2 = _interopRequireDefault(_helpersEach);

	var _helpersHelperMissing = __webpack_require__(9);

	var _helpersHelperMissing2 = _interopRequireDefault(_helpersHelperMissing);

	var _helpersIf = __webpack_require__(10);

	var _helpersIf2 = _interopRequireDefault(_helpersIf);

	var _helpersLog = __webpack_require__(11);

	var _helpersLog2 = _interopRequireDefault(_helpersLog);

	var _helpersLookup = __webpack_require__(12);

	var _helpersLookup2 = _interopRequireDefault(_helpersLookup);

	var _helpersWith = __webpack_require__(13);

	var _helpersWith2 = _interopRequireDefault(_helpersWith);

	function registerDefaultHelpers(instance) {
	  _helpersBlockHelperMissing2['default'](instance);
	  _helpersEach2['default'](instance);
	  _helpersHelperMissing2['default'](instance);
	  _helpersIf2['default'](instance);
	  _helpersLog2['default'](instance);
	  _helpersLookup2['default'](instance);
	  _helpersWith2['default'](instance);
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(4);

	exports['default'] = function (instance) {
	  instance.registerHelper('blockHelperMissing', function (context, options) {
	    var inverse = options.inverse,
	        fn = options.fn;

	    if (context === true) {
	      return fn(this);
	    } else if (context === false || context == null) {
	      return inverse(this);
	    } else if (_utils.isArray(context)) {
	      if (context.length > 0) {
	        if (options.ids) {
	          options.ids = [options.name];
	        }

	        return instance.helpers.each(context, options);
	      } else {
	        return inverse(this);
	      }
	    } else {
	      if (options.data && options.ids) {
	        var data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.name);
	        options = { data: data };
	      }

	      return fn(context, options);
	    }
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)['default'];

	exports.__esModule = true;

	var _utils = __webpack_require__(4);

	var _exception = __webpack_require__(5);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('each', function (context, options) {
	    if (!options) {
	      throw new _exception2['default']('Must pass iterator to #each');
	    }

	    var fn = options.fn,
	        inverse = options.inverse,
	        i = 0,
	        ret = '',
	        data = undefined,
	        contextPath = undefined;

	    if (options.data && options.ids) {
	      contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]) + '.';
	    }

	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    if (options.data) {
	      data = _utils.createFrame(options.data);
	    }

	    function execIteration(field, index, last) {
	      if (data) {
	        data.key = field;
	        data.index = index;
	        data.first = index === 0;
	        data.last = !!last;

	        if (contextPath) {
	          data.contextPath = contextPath + field;
	        }
	      }

	      ret = ret + fn(context[field], {
	        data: data,
	        blockParams: _utils.blockParams([context[field], field], [contextPath + field, null])
	      });
	    }

	    if (context && typeof context === 'object') {
	      if (_utils.isArray(context)) {
	        for (var j = context.length; i < j; i++) {
	          if (i in context) {
	            execIteration(i, i, i === context.length - 1);
	          }
	        }
	      } else {
	        var priorKey = undefined;

	        for (var key in context) {
	          if (context.hasOwnProperty(key)) {
	            // We're running the iterations one step out of sync so we can detect
	            // the last iteration without have to scan the object twice and create
	            // an itermediate keys array.
	            if (priorKey !== undefined) {
	              execIteration(priorKey, i - 1);
	            }
	            priorKey = key;
	            i++;
	          }
	        }
	        if (priorKey !== undefined) {
	          execIteration(priorKey, i - 1, true);
	        }
	      }
	    }

	    if (i === 0) {
	      ret = inverse(this);
	    }

	    return ret;
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)['default'];

	exports.__esModule = true;

	var _exception = __webpack_require__(5);

	var _exception2 = _interopRequireDefault(_exception);

	exports['default'] = function (instance) {
	  instance.registerHelper('helperMissing', function () /* [args, ]options */{
	    if (arguments.length === 1) {
	      // A missing field in a {{foo}} construct.
	      return undefined;
	    } else {
	      // Someone is actually trying to call something, blow up.
	      throw new _exception2['default']('Missing helper: "' + arguments[arguments.length - 1].name + '"');
	    }
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(4);

	exports['default'] = function (instance) {
	  instance.registerHelper('if', function (conditional, options) {
	    if (_utils.isFunction(conditional)) {
	      conditional = conditional.call(this);
	    }

	    // Default behavior is to render the positive path if the value is truthy and not empty.
	    // The `includeZero` option may be set to treat the condtional as purely not empty based on the
	    // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
	    if (!options.hash.includeZero && !conditional || _utils.isEmpty(conditional)) {
	      return options.inverse(this);
	    } else {
	      return options.fn(this);
	    }
	  });

	  instance.registerHelper('unless', function (conditional, options) {
	    return instance.helpers['if'].call(this, conditional, { fn: options.inverse, inverse: options.fn, hash: options.hash });
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	exports['default'] = function (instance) {
	  instance.registerHelper('log', function () /* message, options */{
	    var args = [undefined],
	        options = arguments[arguments.length - 1];
	    for (var i = 0; i < arguments.length - 1; i++) {
	      args.push(arguments[i]);
	    }

	    var level = 1;
	    if (options.hash.level != null) {
	      level = options.hash.level;
	    } else if (options.data && options.data.level != null) {
	      level = options.data.level;
	    }
	    args[0] = level;

	    instance.log.apply(instance, args);
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;

	exports['default'] = function (instance) {
	  instance.registerHelper('lookup', function (obj, field) {
	    return obj && obj[field];
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(4);

	exports['default'] = function (instance) {
	  instance.registerHelper('with', function (context, options) {
	    if (_utils.isFunction(context)) {
	      context = context.call(this);
	    }

	    var fn = options.fn;

	    if (!_utils.isEmpty(context)) {
	      var data = options.data;
	      if (options.data && options.ids) {
	        data = _utils.createFrame(options.data);
	        data.contextPath = _utils.appendContextPath(options.data.contextPath, options.ids[0]);
	      }

	      return fn(context, {
	        data: data,
	        blockParams: _utils.blockParams([context], [data && data.contextPath])
	      });
	    } else {
	      return options.inverse(this);
	    }
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireDefault = __webpack_require__(2)['default'];

	exports.__esModule = true;
	exports.registerDefaultDecorators = registerDefaultDecorators;

	var _decoratorsInline = __webpack_require__(15);

	var _decoratorsInline2 = _interopRequireDefault(_decoratorsInline);

	function registerDefaultDecorators(instance) {
	  _decoratorsInline2['default'](instance);
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(4);

	exports['default'] = function (instance) {
	  instance.registerDecorator('inline', function (fn, props, container, options) {
	    var ret = fn;
	    if (!props.partials) {
	      props.partials = {};
	      ret = function (context, options) {
	        // Create a new partials stack frame prior to exec.
	        var original = container.partials;
	        container.partials = _utils.extend({}, original, props.partials);
	        var ret = fn(context, options);
	        container.partials = original;
	        return ret;
	      };
	    }

	    props.partials[options.args[0]] = options.fn;

	    return ret;
	  });
	};

	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _utils = __webpack_require__(4);

	var logger = {
	  methodMap: ['debug', 'info', 'warn', 'error'],
	  level: 'info',

	  // Maps a given level value to the `methodMap` indexes above.
	  lookupLevel: function lookupLevel(level) {
	    if (typeof level === 'string') {
	      var levelMap = _utils.indexOf(logger.methodMap, level.toLowerCase());
	      if (levelMap >= 0) {
	        level = levelMap;
	      } else {
	        level = parseInt(level, 10);
	      }
	    }

	    return level;
	  },

	  // Can be overridden in the host environment
	  log: function log(level) {
	    level = logger.lookupLevel(level);

	    if (typeof console !== 'undefined' && logger.lookupLevel(logger.level) <= level) {
	      var method = logger.methodMap[level];
	      if (!console[method]) {
	        // eslint-disable-line no-console
	        method = 'log';
	      }

	      for (var _len = arguments.length, message = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        message[_key - 1] = arguments[_key];
	      }

	      console[method].apply(console, message); // eslint-disable-line no-console
	    }
	  }
	};

	exports['default'] = logger;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports) {

	// Build out our basic SafeString type
	'use strict';

	exports.__esModule = true;
	function SafeString(string) {
	  this.string = string;
	}

	SafeString.prototype.toString = SafeString.prototype.toHTML = function () {
	  return '' + this.string;
	};

	exports['default'] = SafeString;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _interopRequireWildcard = __webpack_require__(1)['default'];

	var _interopRequireDefault = __webpack_require__(2)['default'];

	exports.__esModule = true;
	exports.checkRevision = checkRevision;
	exports.template = template;
	exports.wrapProgram = wrapProgram;
	exports.resolvePartial = resolvePartial;
	exports.invokePartial = invokePartial;
	exports.noop = noop;

	var _utils = __webpack_require__(4);

	var Utils = _interopRequireWildcard(_utils);

	var _exception = __webpack_require__(5);

	var _exception2 = _interopRequireDefault(_exception);

	var _base = __webpack_require__(3);

	function checkRevision(compilerInfo) {
	  var compilerRevision = compilerInfo && compilerInfo[0] || 1,
	      currentRevision = _base.COMPILER_REVISION;

	  if (compilerRevision !== currentRevision) {
	    if (compilerRevision < currentRevision) {
	      var runtimeVersions = _base.REVISION_CHANGES[currentRevision],
	          compilerVersions = _base.REVISION_CHANGES[compilerRevision];
	      throw new _exception2['default']('Template was precompiled with an older version of Handlebars than the current runtime. ' + 'Please update your precompiler to a newer version (' + runtimeVersions + ') or downgrade your runtime to an older version (' + compilerVersions + ').');
	    } else {
	      // Use the embedded version info since the runtime doesn't know about this revision yet
	      throw new _exception2['default']('Template was precompiled with a newer version of Handlebars than the current runtime. ' + 'Please update your runtime to a newer version (' + compilerInfo[1] + ').');
	    }
	  }
	}

	function template(templateSpec, env) {
	  /* istanbul ignore next */
	  if (!env) {
	    throw new _exception2['default']('No environment passed to template');
	  }
	  if (!templateSpec || !templateSpec.main) {
	    throw new _exception2['default']('Unknown template object: ' + typeof templateSpec);
	  }

	  templateSpec.main.decorator = templateSpec.main_d;

	  // Note: Using env.VM references rather than local var references throughout this section to allow
	  // for external users to override these as psuedo-supported APIs.
	  env.VM.checkRevision(templateSpec.compiler);

	  function invokePartialWrapper(partial, context, options) {
	    if (options.hash) {
	      context = Utils.extend({}, context, options.hash);
	      if (options.ids) {
	        options.ids[0] = true;
	      }
	    }

	    partial = env.VM.resolvePartial.call(this, partial, context, options);
	    var result = env.VM.invokePartial.call(this, partial, context, options);

	    if (result == null && env.compile) {
	      options.partials[options.name] = env.compile(partial, templateSpec.compilerOptions, env);
	      result = options.partials[options.name](context, options);
	    }
	    if (result != null) {
	      if (options.indent) {
	        var lines = result.split('\n');
	        for (var i = 0, l = lines.length; i < l; i++) {
	          if (!lines[i] && i + 1 === l) {
	            break;
	          }

	          lines[i] = options.indent + lines[i];
	        }
	        result = lines.join('\n');
	      }
	      return result;
	    } else {
	      throw new _exception2['default']('The partial ' + options.name + ' could not be compiled when running in runtime-only mode');
	    }
	  }

	  // Just add water
	  var container = {
	    strict: function strict(obj, name) {
	      if (!(name in obj)) {
	        throw new _exception2['default']('"' + name + '" not defined in ' + obj);
	      }
	      return obj[name];
	    },
	    lookup: function lookup(depths, name) {
	      var len = depths.length;
	      for (var i = 0; i < len; i++) {
	        if (depths[i] && depths[i][name] != null) {
	          return depths[i][name];
	        }
	      }
	    },
	    lambda: function lambda(current, context) {
	      return typeof current === 'function' ? current.call(context) : current;
	    },

	    escapeExpression: Utils.escapeExpression,
	    invokePartial: invokePartialWrapper,

	    fn: function fn(i) {
	      var ret = templateSpec[i];
	      ret.decorator = templateSpec[i + '_d'];
	      return ret;
	    },

	    programs: [],
	    program: function program(i, data, declaredBlockParams, blockParams, depths) {
	      var programWrapper = this.programs[i],
	          fn = this.fn(i);
	      if (data || depths || blockParams || declaredBlockParams) {
	        programWrapper = wrapProgram(this, i, fn, data, declaredBlockParams, blockParams, depths);
	      } else if (!programWrapper) {
	        programWrapper = this.programs[i] = wrapProgram(this, i, fn);
	      }
	      return programWrapper;
	    },

	    data: function data(value, depth) {
	      while (value && depth--) {
	        value = value._parent;
	      }
	      return value;
	    },
	    merge: function merge(param, common) {
	      var obj = param || common;

	      if (param && common && param !== common) {
	        obj = Utils.extend({}, common, param);
	      }

	      return obj;
	    },

	    noop: env.VM.noop,
	    compilerInfo: templateSpec.compiler
	  };

	  function ret(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var data = options.data;

	    ret._setup(options);
	    if (!options.partial && templateSpec.useData) {
	      data = initData(context, data);
	    }
	    var depths = undefined,
	        blockParams = templateSpec.useBlockParams ? [] : undefined;
	    if (templateSpec.useDepths) {
	      if (options.depths) {
	        depths = context !== options.depths[0] ? [context].concat(options.depths) : options.depths;
	      } else {
	        depths = [context];
	      }
	    }

	    function main(context /*, options*/) {
	      return '' + templateSpec.main(container, context, container.helpers, container.partials, data, blockParams, depths);
	    }
	    main = executeDecorators(templateSpec.main, main, container, options.depths || [], data, blockParams);
	    return main(context, options);
	  }
	  ret.isTop = true;

	  ret._setup = function (options) {
	    if (!options.partial) {
	      container.helpers = container.merge(options.helpers, env.helpers);

	      if (templateSpec.usePartial) {
	        container.partials = container.merge(options.partials, env.partials);
	      }
	      if (templateSpec.usePartial || templateSpec.useDecorators) {
	        container.decorators = container.merge(options.decorators, env.decorators);
	      }
	    } else {
	      container.helpers = options.helpers;
	      container.partials = options.partials;
	      container.decorators = options.decorators;
	    }
	  };

	  ret._child = function (i, data, blockParams, depths) {
	    if (templateSpec.useBlockParams && !blockParams) {
	      throw new _exception2['default']('must pass block params');
	    }
	    if (templateSpec.useDepths && !depths) {
	      throw new _exception2['default']('must pass parent depths');
	    }

	    return wrapProgram(container, i, templateSpec[i], data, 0, blockParams, depths);
	  };
	  return ret;
	}

	function wrapProgram(container, i, fn, data, declaredBlockParams, blockParams, depths) {
	  function prog(context) {
	    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	    var currentDepths = depths;
	    if (depths && context !== depths[0]) {
	      currentDepths = [context].concat(depths);
	    }

	    return fn(container, context, container.helpers, container.partials, options.data || data, blockParams && [options.blockParams].concat(blockParams), currentDepths);
	  }

	  prog = executeDecorators(fn, prog, container, depths, data, blockParams);

	  prog.program = i;
	  prog.depth = depths ? depths.length : 0;
	  prog.blockParams = declaredBlockParams || 0;
	  return prog;
	}

	function resolvePartial(partial, context, options) {
	  if (!partial) {
	    if (options.name === '@partial-block') {
	      partial = options.data['partial-block'];
	    } else {
	      partial = options.partials[options.name];
	    }
	  } else if (!partial.call && !options.name) {
	    // This is a dynamic partial that returned a string
	    options.name = partial;
	    partial = options.partials[partial];
	  }
	  return partial;
	}

	function invokePartial(partial, context, options) {
	  options.partial = true;
	  if (options.ids) {
	    options.data.contextPath = options.ids[0] || options.data.contextPath;
	  }

	  var partialBlock = undefined;
	  if (options.fn && options.fn !== noop) {
	    options.data = _base.createFrame(options.data);
	    partialBlock = options.data['partial-block'] = options.fn;

	    if (partialBlock.partials) {
	      options.partials = Utils.extend({}, options.partials, partialBlock.partials);
	    }
	  }

	  if (partial === undefined && partialBlock) {
	    partial = partialBlock;
	  }

	  if (partial === undefined) {
	    throw new _exception2['default']('The partial ' + options.name + ' could not be found');
	  } else if (partial instanceof Function) {
	    return partial(context, options);
	  }
	}

	function noop() {
	  return '';
	}

	function initData(context, data) {
	  if (!data || !('root' in data)) {
	    data = data ? _base.createFrame(data) : {};
	    data.root = context;
	  }
	  return data;
	}

	function executeDecorators(fn, prog, container, depths, data, blockParams) {
	  if (fn.decorator) {
	    var props = {};
	    prog = fn.decorator(prog, props, container, depths && depths[0], data, blockParams, depths);
	    Utils.extend(prog, props);
	  }
	  return prog;
	}

/***/ },
/* 19 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/* global window */
	'use strict';

	exports.__esModule = true;

	exports['default'] = function (Handlebars) {
	  /* istanbul ignore next */
	  var root = typeof global !== 'undefined' ? global : window,
	      $Handlebars = root.Handlebars;
	  /* istanbul ignore next */
	  Handlebars.noConflict = function () {
	    if (root.Handlebars === Handlebars) {
	      root.Handlebars = $Handlebars;
	    }
	    return Handlebars;
	  };
	};

	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ])
});
;
/**
 * Created by papostol on 27/01/2015.
 */

Handlebars.initNS = function (ns, obj) {
  var global = (function () {
    return this;
  })(), levels = ns.split('.'), first = levels.shift();
  obj = obj || global;
  obj[first] = obj[first] || {};
  if (levels.length) {
    Handlebars.initNS(levels.join('.'), obj[first]);
  }
  return obj[first];
};
!function(e,t,i){var s=function(i,s){if(t.isArray(i))i=i.slice(0),t.isObject(s)||(s={});else{if(!t.isObject(i))throw new Error("A typeahead must be created with either initial models or have its collection specified in an options object");s=i}this.preInitialize.call(this,i,s),e.View.call(this,s),this.postInitialize.call(this)};s.VERSION="0.2.0",s.extend=e.View.extend,s.ItemView=e.View.extend({tagName:"li",events:{click:"selectItem",mouseover:"activateItem"},initialize:function(e){this.parent=e.parent},render:function(){return this.$el.html(t.template(this.template)(this.model.toJSON())),this},selectItem:function(){this.parent.selectModel(this.model)},activateItem:function(){this.parent.activateModel(this.model)}}),t.extend(s.prototype,e.View.prototype,{preInitialize:function(i,n){n.key=n.key||"name",n.limit=n.limit||8,t.isUndefined(n.collection)&&t.isArray(i)&&(n.collection=new e.Collection(i,n)),this.view=n.view,t.isUndefined(this.view)&&(this.view=s.ItemView.extend({template:n.itemTemplate||"<a><%- "+n.key+" %></a>"})),this.events=t.extend({},this.nativeEvents,t.result(this,"events")),this.options=n},postInitialize:function(){this.results=[],this.focused=!1,this.shown=!1,this.mousedover=!1},template:'<input type="text" class="form-control" placeholder="Search" /><ul class="dropdown-menu"></ul>',nativeEvents:{keyup:"keyup",keypress:"keypress",keydown:"keydown","blur input":"blur","focus input":"focus",mouseenter:"mouseenter",mouseleave:"mouseleave"},render:function(){return this.$el.html(this.template),this.$menu=this.$("ul"),this.$input=this.$("input"),this},rerender:function(e){this.$menu.empty(),t.each(e,this.renderModel,this),e.length?this.show():this.hide()},renderModel:function(e){this.$menu.append(new this.view({model:e,parent:this}).render().el)},search:function(e){var t=new RegExp(e,"i"),i=this.options.key;return this.collection.filter(function(e){return t.test(e.get(i))})},clearInput:function(){this.$input.val("")},searchInput:function(){this.results=this.search(this.$input.val()).slice(0,this.options.limit),this.rerender(this.results)},select:function(){var e=this.$menu.find(".active").index();this.selectModel(this.results[e])},selectModel:function(e){this.$input.val(e.get(this.options.key)),this.hide(),this.trigger("selected",e,this.collection),this.results=[]},activateModel:function(){this.$menu.find(".active").removeClass("active")},keyup:function(e){switch(e.keyCode){case 40:case 38:case 16:case 17:case 18:break;case 13:if(!this.shown)return;this.select();break;case 27:if(!this.shown)return;this.hide();break;default:this.searchInput()}e.stopPropagation(),e.preventDefault()},focus:function(){this.focused=!0,this.shown||this.show()},blur:function(){this.focused=!1,!this.mousedover&&this.shown&&this.hide()},mouseenter:function(){this.mousedover=!0},mouseleave:function(){this.mousedover=!1,!this.focused&&this.shown&&this.hide()},keydown:function(e){this.suppressKeyPressRepeat=~i.inArray(e.keyCode,[40,38,9,13,27]),this.move(e)},keypress:function(e){this.suppressKeyPressRepeat||this.move(e)},move:function(e){if(this.shown){switch(e.keyCode){case 9:case 13:case 27:e.preventDefault();break;case 38:e.preventDefault(),this.prevItem();break;case 40:e.preventDefault(),this.nextItem()}e.stopPropagation()}},prevItem:function(){var e=this.$menu.find(".active").removeClass("active"),t=e.prev();t.length||(t=this.$menu.find("li").last()),t.addClass("active")},nextItem:function(){var e=this.$menu.find(".active").removeClass("active"),t=e.next();t.length||(t=this.$menu.find("li").first()),t.addClass("active")},show:function(){if(this.results.length){var e=i.extend({},this.$input.position(),{height:this.$input[0].offsetHeight});return this.$menu.css({top:e.top+e.height,left:e.left}).show(),this.shown=!0,this}},hide:function(){return this.$menu.hide(),this.shown=!1,this}}),e.Typeahead=s}(Backbone,_,$);
//# sourceMappingURL=backbone.typeahead.min.js.map
;!function(a){"use strict";function b(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function c(a,b){return a<<b|a>>>32-b}function d(a,d,e,f,g,h){return b(c(b(b(d,a),b(f,h)),g),e)}function e(a,b,c,e,f,g,h){return d(b&c|~b&e,a,b,f,g,h)}function f(a,b,c,e,f,g,h){return d(b&e|c&~e,a,b,f,g,h)}function g(a,b,c,e,f,g,h){return d(b^c^e,a,b,f,g,h)}function h(a,b,c,e,f,g,h){return d(c^(b|~e),a,b,f,g,h)}function i(a,c){a[c>>5]|=128<<c%32,a[(c+64>>>9<<4)+14]=c;var d,i,j,k,l,m=1732584193,n=-271733879,o=-1732584194,p=271733878;for(d=0;d<a.length;d+=16)i=m,j=n,k=o,l=p,m=e(m,n,o,p,a[d],7,-680876936),p=e(p,m,n,o,a[d+1],12,-389564586),o=e(o,p,m,n,a[d+2],17,606105819),n=e(n,o,p,m,a[d+3],22,-1044525330),m=e(m,n,o,p,a[d+4],7,-176418897),p=e(p,m,n,o,a[d+5],12,1200080426),o=e(o,p,m,n,a[d+6],17,-1473231341),n=e(n,o,p,m,a[d+7],22,-45705983),m=e(m,n,o,p,a[d+8],7,1770035416),p=e(p,m,n,o,a[d+9],12,-1958414417),o=e(o,p,m,n,a[d+10],17,-42063),n=e(n,o,p,m,a[d+11],22,-1990404162),m=e(m,n,o,p,a[d+12],7,1804603682),p=e(p,m,n,o,a[d+13],12,-40341101),o=e(o,p,m,n,a[d+14],17,-1502002290),n=e(n,o,p,m,a[d+15],22,1236535329),m=f(m,n,o,p,a[d+1],5,-165796510),p=f(p,m,n,o,a[d+6],9,-1069501632),o=f(o,p,m,n,a[d+11],14,643717713),n=f(n,o,p,m,a[d],20,-373897302),m=f(m,n,o,p,a[d+5],5,-701558691),p=f(p,m,n,o,a[d+10],9,38016083),o=f(o,p,m,n,a[d+15],14,-660478335),n=f(n,o,p,m,a[d+4],20,-405537848),m=f(m,n,o,p,a[d+9],5,568446438),p=f(p,m,n,o,a[d+14],9,-1019803690),o=f(o,p,m,n,a[d+3],14,-187363961),n=f(n,o,p,m,a[d+8],20,1163531501),m=f(m,n,o,p,a[d+13],5,-1444681467),p=f(p,m,n,o,a[d+2],9,-51403784),o=f(o,p,m,n,a[d+7],14,1735328473),n=f(n,o,p,m,a[d+12],20,-1926607734),m=g(m,n,o,p,a[d+5],4,-378558),p=g(p,m,n,o,a[d+8],11,-2022574463),o=g(o,p,m,n,a[d+11],16,1839030562),n=g(n,o,p,m,a[d+14],23,-35309556),m=g(m,n,o,p,a[d+1],4,-1530992060),p=g(p,m,n,o,a[d+4],11,1272893353),o=g(o,p,m,n,a[d+7],16,-155497632),n=g(n,o,p,m,a[d+10],23,-1094730640),m=g(m,n,o,p,a[d+13],4,681279174),p=g(p,m,n,o,a[d],11,-358537222),o=g(o,p,m,n,a[d+3],16,-722521979),n=g(n,o,p,m,a[d+6],23,76029189),m=g(m,n,o,p,a[d+9],4,-640364487),p=g(p,m,n,o,a[d+12],11,-421815835),o=g(o,p,m,n,a[d+15],16,530742520),n=g(n,o,p,m,a[d+2],23,-995338651),m=h(m,n,o,p,a[d],6,-198630844),p=h(p,m,n,o,a[d+7],10,1126891415),o=h(o,p,m,n,a[d+14],15,-1416354905),n=h(n,o,p,m,a[d+5],21,-57434055),m=h(m,n,o,p,a[d+12],6,1700485571),p=h(p,m,n,o,a[d+3],10,-1894986606),o=h(o,p,m,n,a[d+10],15,-1051523),n=h(n,o,p,m,a[d+1],21,-2054922799),m=h(m,n,o,p,a[d+8],6,1873313359),p=h(p,m,n,o,a[d+15],10,-30611744),o=h(o,p,m,n,a[d+6],15,-1560198380),n=h(n,o,p,m,a[d+13],21,1309151649),m=h(m,n,o,p,a[d+4],6,-145523070),p=h(p,m,n,o,a[d+11],10,-1120210379),o=h(o,p,m,n,a[d+2],15,718787259),n=h(n,o,p,m,a[d+9],21,-343485551),m=b(m,i),n=b(n,j),o=b(o,k),p=b(p,l);return[m,n,o,p]}function j(a){var b,c="";for(b=0;b<32*a.length;b+=8)c+=String.fromCharCode(a[b>>5]>>>b%32&255);return c}function k(a){var b,c=[];for(c[(a.length>>2)-1]=void 0,b=0;b<c.length;b+=1)c[b]=0;for(b=0;b<8*a.length;b+=8)c[b>>5]|=(255&a.charCodeAt(b/8))<<b%32;return c}function l(a){return j(i(k(a),8*a.length))}function m(a,b){var c,d,e=k(a),f=[],g=[];for(f[15]=g[15]=void 0,e.length>16&&(e=i(e,8*a.length)),c=0;16>c;c+=1)f[c]=909522486^e[c],g[c]=1549556828^e[c];return d=i(f.concat(k(b)),512+8*b.length),j(i(g.concat(d),640))}function n(a){var b,c,d="0123456789abcdef",e="";for(c=0;c<a.length;c+=1)b=a.charCodeAt(c),e+=d.charAt(b>>>4&15)+d.charAt(15&b);return e}function o(a){return unescape(encodeURIComponent(a))}function p(a){return l(o(a))}function q(a){return n(p(a))}function r(a,b){return m(o(a),o(b))}function s(a,b){return n(r(a,b))}function t(a,b,c){return b?c?r(b,a):s(b,a):c?p(a):q(a)}"function"==typeof define&&define.amd?define(function(){return t}):a.md5=t}(this);

/*!
 * typeahead.js 0.10.5
 * https://github.com/twitter/typeahead.js
 * Copyright 2013-2014 Twitter, Inc. and other contributors; Licensed MIT
 */

(function($) {
	var _ = function() {
		"use strict";
		return {
			isMsie: function() {
				return /(msie|trident)/i.test(navigator.userAgent) ? navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2] : false;
			},
			isBlankString: function(str) {
				return !str || /^\s*$/.test(str);
			},
			escapeRegExChars: function(str) {
				return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
			},
			isString: function(obj) {
				return typeof obj === "string";
			},
			isNumber: function(obj) {
				return typeof obj === "number";
			},
			isArray: $.isArray,
			isFunction: $.isFunction,
			isObject: $.isPlainObject,
			isUndefined: function(obj) {
				return typeof obj === "undefined";
			},
			toStr: function toStr(s) {
				return _.isUndefined(s) || s === null ? "" : s + "";
			},
			bind: $.proxy,
			each: function(collection, cb) {
				$.each(collection, reverseArgs);
				function reverseArgs(index, value) {
					return cb(value, index);
				}
			},
			map: $.map,
			filter: $.grep,
			every: function(obj, test) {
				var result = true;
				if (!obj) {
					return result;
				}
				$.each(obj, function(key, val) {
					if (!(result = test.call(null, val, key, obj))) {
						return false;
					}
				});
				return !!result;
			},
			some: function(obj, test) {
				var result = false;
				if (!obj) {
					return result;
				}
				$.each(obj, function(key, val) {
					if (result = test.call(null, val, key, obj)) {
						return false;
					}
				});
				return !!result;
			},
			mixin: $.extend,
			getUniqueId: function() {
				var counter = 0;
				return function() {
					return counter++;
				};
			}(),
			templatify: function templatify(obj) {
				return $.isFunction(obj) ? obj : template;
				function template() {
					return String(obj);
				}
			},
			defer: function(fn) {
				setTimeout(fn, 0);
			},
			debounce: function(func, wait, immediate) {
				var timeout, result;
				return function() {
					var context = this, args = arguments, later, callNow;
					later = function() {
						timeout = null;
						if (!immediate) {
							result = func.apply(context, args);
						}
					};
					callNow = immediate && !timeout;
					clearTimeout(timeout);
					timeout = setTimeout(later, wait);
					if (callNow) {
						result = func.apply(context, args);
					}
					return result;
				};
			},
			throttle: function(func, wait) {
				var context, args, timeout, result, previous, later;
				previous = 0;
				later = function() {
					previous = new Date();
					timeout = null;
					result = func.apply(context, args);
				};
				return function() {
					var now = new Date(), remaining = wait - (now - previous);
					context = this;
					args = arguments;
					if (remaining <= 0) {
						clearTimeout(timeout);
						timeout = null;
						previous = now;
						result = func.apply(context, args);
					} else if (!timeout) {
						timeout = setTimeout(later, remaining);
					}
					return result;
				};
			},
			noop: function() {}
		};
	}();
	var VERSION = "0.10.5";
	var tokenizers = function() {
		"use strict";
		return {
			nonword: nonword,
			whitespace: whitespace,
			obj: {
				nonword: getObjTokenizer(nonword),
				whitespace: getObjTokenizer(whitespace)
			}
		};
		function whitespace(str) {
			str = _.toStr(str);
			return str ? str.split(/\s+/) : [];
		}
		function nonword(str) {
			str = _.toStr(str);
			return str ? str.split(/\W+/) : [];
		}
		function getObjTokenizer(tokenizer) {
			return function setKey() {
				var args = [].slice.call(arguments, 0);
				return function tokenize(o) {
					var tokens = [];
					_.each(args, function(k) {
						tokens = tokens.concat(tokenizer(_.toStr(o[k])));
					});
					return tokens;
				};
			};
		}
	}();
	var LruCache = function() {
		"use strict";
		function LruCache(maxSize) {
			this.maxSize = _.isNumber(maxSize) ? maxSize : 100;
			this.reset();
			if (this.maxSize <= 0) {
				this.set = this.get = $.noop;
			}
		}
		_.mixin(LruCache.prototype, {
			set: function set(key, val) {
				var tailItem = this.list.tail, node;
				if (this.size >= this.maxSize) {
					this.list.remove(tailItem);
					delete this.hash[tailItem.key];
				}
				if (node = this.hash[key]) {
					node.val = val;
					this.list.moveToFront(node);
				} else {
					node = new Node(key, val);
					this.list.add(node);
					this.hash[key] = node;
					this.size++;
				}
			},
			get: function get(key) {
				var node = this.hash[key];
				if (node) {
					this.list.moveToFront(node);
					return node.val;
				}
			},
			reset: function reset() {
				this.size = 0;
				this.hash = {};
				this.list = new List();
			}
		});
		function List() {
			this.head = this.tail = null;
		}
		_.mixin(List.prototype, {
			add: function add(node) {
				if (this.head) {
					node.next = this.head;
					this.head.prev = node;
				}
				this.head = node;
				this.tail = this.tail || node;
			},
			remove: function remove(node) {
				node.prev ? node.prev.next = node.next : this.head = node.next;
				node.next ? node.next.prev = node.prev : this.tail = node.prev;
			},
			moveToFront: function(node) {
				this.remove(node);
				this.add(node);
			}
		});
		function Node(key, val) {
			this.key = key;
			this.val = val;
			this.prev = this.next = null;
		}
		return LruCache;
	}();
	var PersistentStorage = function() {
		"use strict";
		var ls, methods;
		try {
			ls = window.localStorage;
			ls.setItem("~~~", "!");
			ls.removeItem("~~~");
		} catch (err) {
			ls = null;
		}
		function PersistentStorage(namespace) {
			this.prefix = [ "__", namespace, "__" ].join("");
			this.ttlKey = "__ttl__";
			this.keyMatcher = new RegExp("^" + _.escapeRegExChars(this.prefix));
		}
		if (ls && window.JSON) {
			methods = {
				_prefix: function(key) {
					return this.prefix + key;
				},
				_ttlKey: function(key) {
					return this._prefix(key) + this.ttlKey;
				},
				get: function(key) {
					if (this.isExpired(key)) {
						this.remove(key);
					}
					return decode(ls.getItem(this._prefix(key)));
				},
				set: function(key, val, ttl) {
					if (_.isNumber(ttl)) {
						ls.setItem(this._ttlKey(key), encode(now() + ttl));
					} else {
						ls.removeItem(this._ttlKey(key));
					}
					return ls.setItem(this._prefix(key), encode(val));
				},
				remove: function(key) {
					ls.removeItem(this._ttlKey(key));
					ls.removeItem(this._prefix(key));
					return this;
				},
				clear: function() {
					var i, key, keys = [], len = ls.length;
					for (i = 0; i < len; i++) {
						if ((key = ls.key(i)).match(this.keyMatcher)) {
							keys.push(key.replace(this.keyMatcher, ""));
						}
					}
					for (i = keys.length; i--; ) {
						this.remove(keys[i]);
					}
					return this;
				},
				isExpired: function(key) {
					var ttl = decode(ls.getItem(this._ttlKey(key)));
					return _.isNumber(ttl) && now() > ttl ? true : false;
				}
			};
		} else {
			methods = {
				get: _.noop,
				set: _.noop,
				remove: _.noop,
				clear: _.noop,
				isExpired: _.noop
			};
		}
		_.mixin(PersistentStorage.prototype, methods);
		return PersistentStorage;
		function now() {
			return new Date().getTime();
		}
		function encode(val) {
			return JSON.stringify(_.isUndefined(val) ? null : val);
		}
		function decode(val) {
			return JSON.parse(val);
		}
	}();
	var Transport = function() {
		"use strict";
		var pendingRequestsCount = 0, pendingRequests = {}, maxPendingRequests = 6, sharedCache = new LruCache(10);
		function Transport(o) {
			o = o || {};
			this.cancelled = false;
			this.lastUrl = null;
			this._send = o.transport ? callbackToDeferred(o.transport) : $.ajax;
			this._get = o.rateLimiter ? o.rateLimiter(this._get) : this._get;
			this._cache = o.cache === false ? new LruCache(0) : sharedCache;
		}
		Transport.setMaxPendingRequests = function setMaxPendingRequests(num) {
			maxPendingRequests = num;
		};
		Transport.resetCache = function resetCache() {
			sharedCache.reset();
		};
		_.mixin(Transport.prototype, {
			_get: function(url, o, cb) {
				var that = this, jqXhr;
				if (this.cancelled || url !== this.lastUrl) {
					return;
				}
				if (jqXhr = pendingRequests[url]) {
					jqXhr.done(done).fail(fail);
				} else if (pendingRequestsCount < maxPendingRequests) {
					pendingRequestsCount++;
					pendingRequests[url] = this._send(url, o).done(done).fail(fail).always(always);
				} else {
					this.onDeckRequestArgs = [].slice.call(arguments, 0);
				}
				function done(resp) {
					cb && cb(null, resp);
					that._cache.set(url, resp);
				}
				function fail() {
					cb && cb(true);
				}
				function always() {
					pendingRequestsCount--;
					delete pendingRequests[url];
					if (that.onDeckRequestArgs) {
						that._get.apply(that, that.onDeckRequestArgs);
						that.onDeckRequestArgs = null;
					}
				}
			},
			get: function(url, o, cb) {
				var resp;
				if (_.isFunction(o)) {
					cb = o;
					o = {};
				}
				this.cancelled = false;
				this.lastUrl = url;
				if (resp = this._cache.get(url)) {
					_.defer(function() {
						cb && cb(null, resp);
					});
				} else {
					this._get(url, o, cb);
				}
				return !!resp;
			},
			cancel: function() {
				this.cancelled = true;
			}
		});
		return Transport;
		function callbackToDeferred(fn) {
			return function customSendWrapper(url, o) {
				var deferred = $.Deferred();
				fn(url, o, onSuccess, onError);
				return deferred;
				function onSuccess(resp) {
					_.defer(function() {
						deferred.resolve(resp);
					});
				}
				function onError(err) {
					_.defer(function() {
						deferred.reject(err);
					});
				}
			};
		}
	}();
	var SearchIndex = function() {
		"use strict";
		function SearchIndex(o) {
			o = o || {};
			if (!o.datumTokenizer || !o.queryTokenizer) {
				$.error("datumTokenizer and queryTokenizer are both required");
			}
			this.datumTokenizer = o.datumTokenizer;
			this.queryTokenizer = o.queryTokenizer;
			this.reset();
		}
		_.mixin(SearchIndex.prototype, {
			bootstrap: function bootstrap(o) {
				this.datums = o.datums;
				this.trie = o.trie;
			},
			add: function(data) {
				var that = this;
				data = _.isArray(data) ? data : [ data ];
				_.each(data, function(datum) {
					var id, tokens;
					id = that.datums.push(datum) - 1;
					tokens = normalizeTokens(that.datumTokenizer(datum));
					_.each(tokens, function(token) {
						var node, chars, ch;
						node = that.trie;
						chars = token.split("");
						while (ch = chars.shift()) {
							node = node.children[ch] || (node.children[ch] = newNode());
							node.ids.push(id);
						}
					});
				});
			},
			get: function get(query) {
				var that = this, tokens, matches;
				tokens = normalizeTokens(this.queryTokenizer(query));
				_.each(tokens, function(token) {
					var node, chars, ch, ids;
					if (matches && matches.length === 0) {
						return false;
					}
					node = that.trie;
					chars = token.split("");
					while (node && (ch = chars.shift())) {
						node = node.children[ch];
					}
					if (node && chars.length === 0) {
						ids = node.ids.slice(0);
						matches = matches ? getIntersection(matches, ids) : ids;
					} else {
						matches = [];
						return false;
					}
				});
				return matches ? _.map(unique(matches), function(id) {
					return that.datums[id];
				}) : [];
			},
			reset: function reset() {
				this.datums = [];
				this.trie = newNode();
			},
			serialize: function serialize() {
				return {
					datums: this.datums,
					trie: this.trie
				};
			}
		});
		return SearchIndex;
		function normalizeTokens(tokens) {
			tokens = _.filter(tokens, function(token) {
				return !!token;
			});
			tokens = _.map(tokens, function(token) {
				return token.toLowerCase();
			});
			return tokens;
		}
		function newNode() {
			return {
				ids: [],
				children: {}
			};
		}
		function unique(array) {
			var seen = {}, uniques = [];
			for (var i = 0, len = array.length; i < len; i++) {
				if (!seen[array[i]]) {
					seen[array[i]] = true;
					uniques.push(array[i]);
				}
			}
			return uniques;
		}
		function getIntersection(arrayA, arrayB) {
			var ai = 0, bi = 0, intersection = [];
			arrayA = arrayA.sort(compare);
			arrayB = arrayB.sort(compare);
			var lenArrayA = arrayA.length, lenArrayB = arrayB.length;
			while (ai < lenArrayA && bi < lenArrayB) {
				if (arrayA[ai] < arrayB[bi]) {
					ai++;
				} else if (arrayA[ai] > arrayB[bi]) {
					bi++;
				} else {
					intersection.push(arrayA[ai]);
					ai++;
					bi++;
				}
			}
			return intersection;
			function compare(a, b) {
				return a - b;
			}
		}
	}();
	var oParser = function() {
		"use strict";
		return {
			local: getLocal,
			prefetch: getPrefetch,
			remote: getRemote
		};
		function getLocal(o) {
			return o.local || null;
		}
		function getPrefetch(o) {
			var prefetch, defaults;
			defaults = {
				url: null,
				thumbprint: "",
				ttl: 24 * 60 * 60 * 1e3,
				filter: null,
				ajax: {}
			};
			if (prefetch = o.prefetch || null) {
				prefetch = _.isString(prefetch) ? {
					url: prefetch
				} : prefetch;
				prefetch = _.mixin(defaults, prefetch);
				prefetch.thumbprint = VERSION + prefetch.thumbprint;
				prefetch.ajax.type = prefetch.ajax.type || "GET";
				prefetch.ajax.dataType = prefetch.ajax.dataType || "json";
				!prefetch.url && $.error("prefetch requires url to be set");
			}
			return prefetch;
		}
		function getRemote(o) {
			var remote, defaults;
			defaults = {
				url: null,
				cache: true,
				wildcard: "%QUERY",
				replace: null,
				rateLimitBy: "debounce",
				rateLimitWait: 300,
				send: null,
				filter: null,
				ajax: {}
			};
			if (remote = o.remote || null) {
				remote = _.isString(remote) ? {
					url: remote
				} : remote;
				remote = _.mixin(defaults, remote);
				remote.rateLimiter = /^throttle$/i.test(remote.rateLimitBy) ? byThrottle(remote.rateLimitWait) : byDebounce(remote.rateLimitWait);
				remote.ajax.type = remote.ajax.type || "GET";
				remote.ajax.dataType = remote.ajax.dataType || "json";
				delete remote.rateLimitBy;
				delete remote.rateLimitWait;
				!remote.url && $.error("remote requires url to be set");
			}
			return remote;
			function byDebounce(wait) {
				return function(fn) {
					return _.debounce(fn, wait);
				};
			}
			function byThrottle(wait) {
				return function(fn) {
					return _.throttle(fn, wait);
				};
			}
		}
	}();
	(function(root) {
		"use strict";
		var old, keys;
		old = root.Bloodhound;
		keys = {
			data: "data",
			protocol: "protocol",
			thumbprint: "thumbprint"
		};
		root.Bloodhound = Bloodhound;
		function Bloodhound(o) {
			if (!o || !o.local && !o.prefetch && !o.remote) {
				$.error("one of local, prefetch, or remote is required");
			}
			this.limit = o.limit || 5;
			this.sorter = getSorter(o.sorter);
			this.dupDetector = o.dupDetector || ignoreDuplicates;
			this.local = oParser.local(o);
			this.prefetch = oParser.prefetch(o);
			this.remote = oParser.remote(o);
			this.cacheKey = this.prefetch ? this.prefetch.cacheKey || this.prefetch.url : null;
			this.index = new SearchIndex({
				datumTokenizer: o.datumTokenizer,
				queryTokenizer: o.queryTokenizer
			});
			this.storage = this.cacheKey ? new PersistentStorage(this.cacheKey) : null;
		}
		Bloodhound.noConflict = function noConflict() {
			root.Bloodhound = old;
			return Bloodhound;
		};
		Bloodhound.tokenizers = tokenizers;
		_.mixin(Bloodhound.prototype, {
			_loadPrefetch: function loadPrefetch(o) {
				var that = this, serialized, deferred;
				if (serialized = this._readFromStorage(o.thumbprint)) {
					this.index.bootstrap(serialized);
					deferred = $.Deferred().resolve();
				} else {
					deferred = $.ajax(o.url, o.ajax).done(handlePrefetchResponse);
				}
				return deferred;
				function handlePrefetchResponse(resp) {
					that.clear();
					that.add(o.filter ? o.filter(resp) : resp);
					that._saveToStorage(that.index.serialize(), o.thumbprint, o.ttl);
				}
			},
			_getFromRemote: function getFromRemote(query, cb) {
				var that = this, url, uriEncodedQuery;
				if (!this.transport) {
					return;
				}
				query = query || "";
				uriEncodedQuery = encodeURIComponent(query);
				url = this.remote.replace ? this.remote.replace(this.remote.url, query) : this.remote.url.replace(this.remote.wildcard, uriEncodedQuery);
				return this.transport.get(url, this.remote.ajax, handleRemoteResponse);
				function handleRemoteResponse(err, resp) {
					err ? cb([]) : cb(that.remote.filter ? that.remote.filter(resp) : resp);
				}
			},
			_cancelLastRemoteRequest: function cancelLastRemoteRequest() {
				this.transport && this.transport.cancel();
			},
			_saveToStorage: function saveToStorage(data, thumbprint, ttl) {
				if (this.storage) {
					this.storage.set(keys.data, data, ttl);
					this.storage.set(keys.protocol, location.protocol, ttl);
					this.storage.set(keys.thumbprint, thumbprint, ttl);
				}
			},
			_readFromStorage: function readFromStorage(thumbprint) {
				var stored = {}, isExpired;
				if (this.storage) {
					stored.data = this.storage.get(keys.data);
					stored.protocol = this.storage.get(keys.protocol);
					stored.thumbprint = this.storage.get(keys.thumbprint);
				}
				isExpired = stored.thumbprint !== thumbprint || stored.protocol !== location.protocol;
				return stored.data && !isExpired ? stored.data : null;
			},
			_initialize: function initialize() {
				var that = this, local = this.local, deferred;
				deferred = this.prefetch ? this._loadPrefetch(this.prefetch) : $.Deferred().resolve();
				local && deferred.done(addLocalToIndex);
				this.transport = this.remote ? new Transport(this.remote) : null;
				return this.initPromise = deferred.promise();
				function addLocalToIndex() {
					that.add(_.isFunction(local) ? local() : local);
				}
			},
			initialize: function initialize(force) {
				return !this.initPromise || force ? this._initialize() : this.initPromise;
			},
			add: function add(data) {
				this.index.add(data);
			},
			get: function get(query, cb) {
				var that = this, matches = [], cacheHit = false;
				matches = this.index.get(query);
				matches = this.sorter(matches).slice(0, this.limit);
				matches.length < this.limit ? cacheHit = this._getFromRemote(query, returnRemoteMatches) : this._cancelLastRemoteRequest();
				if (!cacheHit) {
					(matches.length > 0 || !this.transport) && cb && cb(matches);
				}
				function returnRemoteMatches(remoteMatches) {
					var matchesWithBackfill = matches.slice(0);
					_.each(remoteMatches, function(remoteMatch) {
						var isDuplicate;
						isDuplicate = _.some(matchesWithBackfill, function(match) {
							return that.dupDetector(remoteMatch, match);
						});
						!isDuplicate && matchesWithBackfill.push(remoteMatch);
						return matchesWithBackfill.length < that.limit;
					});
					cb && cb(that.sorter(matchesWithBackfill));
				}
			},
			clear: function clear() {
				this.index.reset();
			},
			clearPrefetchCache: function clearPrefetchCache() {
				this.storage && this.storage.clear();
			},
			clearRemoteCache: function clearRemoteCache() {
				this.transport && Transport.resetCache();
			},
			ttAdapter: function ttAdapter() {
				return _.bind(this.get, this);
			}
		});
		return Bloodhound;
		function getSorter(sortFn) {
			return _.isFunction(sortFn) ? sort : noSort;
			function sort(array) {
				return array.sort(sortFn);
			}
			function noSort(array) {
				return array;
			}
		}
		function ignoreDuplicates() {
			return false;
		}
	})(this);
	var html = function() {
		return {
			wrapper: '<span class="twitter-typeahead"></span>',
			dropdown: '<span class="tt-dropdown-menu"></span>',
			dataset: '<div class="tt-dataset-%CLASS%"></div>',
			suggestions: '<span class="tt-suggestions"></span>',
			suggestion: '<div class="tt-suggestion"></div>'
		};
	}();
	var css = function() {
		"use strict";
		var css = {
			wrapper: {
				position: "relative",
				display: "inline-block"
			},
			hint: {
				position: "absolute",
				top: "0",
				left: "0",
				borderColor: "transparent",
				boxShadow: "none",
				opacity: "1"
			},
			input: {
				position: "relative",
				verticalAlign: "top",
				backgroundColor: "transparent"
			},
			inputWithNoHint: {
				position: "relative",
				verticalAlign: "top"
			},
			dropdown: {
				position: "absolute",
				top: "100%",
				left: "0",
				zIndex: "100",
				display: "none"
			},
			suggestions: {
				display: "block"
			},
			suggestion: {
				whiteSpace: "nowrap",
				cursor: "pointer"
			},
			suggestionChild: {
				whiteSpace: "normal"
			},
			ltr: {
				left: "0",
				right: "auto"
			},
			rtl: {
				left: "auto",
				right: " 0"
			}
		};
		if (_.isMsie()) {
			_.mixin(css.input, {
				backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
			});
		}
		if (_.isMsie() && _.isMsie() <= 7) {
			_.mixin(css.input, {
				marginTop: "-1px"
			});
		}
		return css;
	}();
	var EventBus = function() {
		"use strict";
		var namespace = "typeahead:";
		function EventBus(o) {
			if (!o || !o.el) {
				$.error("EventBus initialized without el");
			}
			this.$el = $(o.el);
		}
		_.mixin(EventBus.prototype, {
			trigger: function(type) {
				var args = [].slice.call(arguments, 1);
				this.$el.trigger(namespace + type, args);
			}
		});
		return EventBus;
	}();
	var EventEmitter = function() {
		"use strict";
		var splitter = /\s+/, nextTick = getNextTick();
		return {
			onSync: onSync,
			onAsync: onAsync,
			off: off,
			trigger: trigger
		};
		function on(method, types, cb, context) {
			var type;
			if (!cb) {
				return this;
			}
			types = types.split(splitter);
			cb = context ? bindContext(cb, context) : cb;
			this._callbacks = this._callbacks || {};
			while (type = types.shift()) {
				this._callbacks[type] = this._callbacks[type] || {
					sync: [],
					async: []
				};
				this._callbacks[type][method].push(cb);
			}
			return this;
		}
		function onAsync(types, cb, context) {
			return on.call(this, "async", types, cb, context);
		}
		function onSync(types, cb, context) {
			return on.call(this, "sync", types, cb, context);
		}
		function off(types) {
			var type;
			if (!this._callbacks) {
				return this;
			}
			types = types.split(splitter);
			while (type = types.shift()) {
				delete this._callbacks[type];
			}
			return this;
		}
		function trigger(types) {
			var type, callbacks, args, syncFlush, asyncFlush;
			if (!this._callbacks) {
				return this;
			}
			types = types.split(splitter);
			args = [].slice.call(arguments, 1);
			while ((type = types.shift()) && (callbacks = this._callbacks[type])) {
				syncFlush = getFlush(callbacks.sync, this, [ type ].concat(args));
				asyncFlush = getFlush(callbacks.async, this, [ type ].concat(args));
				syncFlush() && nextTick(asyncFlush);
			}
			return this;
		}
		function getFlush(callbacks, context, args) {
			return flush;
			function flush() {
				var cancelled;
				for (var i = 0, len = callbacks.length; !cancelled && i < len; i += 1) {
					cancelled = callbacks[i].apply(context, args) === false;
				}
				return !cancelled;
			}
		}
		function getNextTick() {
			var nextTickFn;
			if (window.setImmediate) {
				nextTickFn = function nextTickSetImmediate(fn) {
					setImmediate(function() {
						fn();
					});
				};
			} else {
				nextTickFn = function nextTickSetTimeout(fn) {
					setTimeout(function() {
						fn();
					}, 0);
				};
			}
			return nextTickFn;
		}
		function bindContext(fn, context) {
			return fn.bind ? fn.bind(context) : function() {
				fn.apply(context, [].slice.call(arguments, 0));
			};
		}
	}();
	var highlight = function(doc) {
		"use strict";
		var defaults = {
			node: null,
			pattern: null,
			tagName: "strong",
			className: null,
			wordsOnly: false,
			caseSensitive: false
		};
		return function hightlight(o) {
			var regex;
			o = _.mixin({}, defaults, o);
			if (!o.node || !o.pattern) {
				return;
			}
			o.pattern = _.isArray(o.pattern) ? o.pattern : [ o.pattern ];
			regex = getRegex(o.pattern, o.caseSensitive, o.wordsOnly);
			traverse(o.node, hightlightTextNode);
			function hightlightTextNode(textNode) {
				var match, patternNode, wrapperNode;
				if (match = regex.exec(textNode.data)) {
					wrapperNode = doc.createElement(o.tagName);
					o.className && (wrapperNode.className = o.className);
					patternNode = textNode.splitText(match.index);
					patternNode.splitText(match[0].length);
					wrapperNode.appendChild(patternNode.cloneNode(true));
					textNode.parentNode.replaceChild(wrapperNode, patternNode);
				}
				return !!match;
			}
			function traverse(el, hightlightTextNode) {
				var childNode, TEXT_NODE_TYPE = 3;
				for (var i = 0; i < el.childNodes.length; i++) {
					childNode = el.childNodes[i];
					if (childNode.nodeType === TEXT_NODE_TYPE) {
						i += hightlightTextNode(childNode) ? 1 : 0;
					} else {
						traverse(childNode, hightlightTextNode);
					}
				}
			}
		};
		function getRegex(patterns, caseSensitive, wordsOnly) {
			var escapedPatterns = [], regexStr;
			for (var i = 0, len = patterns.length; i < len; i++) {
				escapedPatterns.push(_.escapeRegExChars(patterns[i]));
			}
			regexStr = wordsOnly ? "\\b(" + escapedPatterns.join("|") + ")\\b" : "(" + escapedPatterns.join("|") + ")";
			return caseSensitive ? new RegExp(regexStr) : new RegExp(regexStr, "i");
		}
	}(window.document);
	var Input = function() {
		"use strict";
		var specialKeyCodeMap;
		specialKeyCodeMap = {
			9: "tab",
			27: "esc",
			37: "left",
			39: "right",
			13: "enter",
			38: "up",
			40: "down"
		};
		function Input(o) {
			var that = this, onBlur, onFocus, onKeydown, onInput;
			o = o || {};
			if (!o.input) {
				$.error("input is missing");
			}
			onBlur = _.bind(this._onBlur, this);
			onFocus = _.bind(this._onFocus, this);
			onKeydown = _.bind(this._onKeydown, this);
			onInput = _.bind(this._onInput, this);
			this.$hint = $(o.hint);
			this.$input = $(o.input).on("blur.tt", onBlur).on("focus.tt", onFocus).on("keydown.tt", onKeydown);
			if (this.$hint.length === 0) {
				this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = _.noop;
			}
			if (!_.isMsie()) {
				this.$input.on("input.tt", onInput);
			} else {
				this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function($e) {
					if (specialKeyCodeMap[$e.which || $e.keyCode]) {
						return;
					}
					_.defer(_.bind(that._onInput, that, $e));
				});
			}
			this.query = this.$input.val();
			this.$overflowHelper = buildOverflowHelper(this.$input);
		}
		Input.normalizeQuery = function(str) {
			return (str || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " ");
		};
		_.mixin(Input.prototype, EventEmitter, {
			_onBlur: function onBlur() {
				this.resetInputValue();
				this.trigger("blurred");
			},
			_onFocus: function onFocus() {
				this.trigger("focused");
			},
			_onKeydown: function onKeydown($e) {
				var keyName = specialKeyCodeMap[$e.which || $e.keyCode];
				this._managePreventDefault(keyName, $e);
				if (keyName && this._shouldTrigger(keyName, $e)) {
					this.trigger(keyName + "Keyed", $e);
				}
			},
			_onInput: function onInput() {
				this._checkInputValue();
			},
			_managePreventDefault: function managePreventDefault(keyName, $e) {
				var preventDefault, hintValue, inputValue;
				switch (keyName) {
				case "tab":
					hintValue = this.getHint();
					inputValue = this.getInputValue();
					preventDefault = hintValue && hintValue !== inputValue && !withModifier($e);
					break;

				case "up":
				case "down":
					preventDefault = !withModifier($e);
					break;

				default:
					preventDefault = false;
				}
				preventDefault && $e.preventDefault();
			},
			_shouldTrigger: function shouldTrigger(keyName, $e) {
				var trigger;
				switch (keyName) {
				case "tab":
					trigger = !withModifier($e);
					break;

				default:
					trigger = true;
				}
				return trigger;
			},
			_checkInputValue: function checkInputValue() {
				var inputValue, areEquivalent, hasDifferentWhitespace;
				inputValue = this.getInputValue();
				areEquivalent = areQueriesEquivalent(inputValue, this.query);
				hasDifferentWhitespace = areEquivalent ? this.query.length !== inputValue.length : false;
				this.query = inputValue;
				if (!areEquivalent) {
					this.trigger("queryChanged", this.query);
				} else if (hasDifferentWhitespace) {
					this.trigger("whitespaceChanged", this.query);
				}
			},
			focus: function focus() {
				this.$input.focus();
			},
			blur: function blur() {
				this.$input.blur();
			},
			getQuery: function getQuery() {
				return this.query;
			},
			setQuery: function setQuery(query) {
				this.query = query;
			},
			getInputValue: function getInputValue() {
				return this.$input.val();
			},
			setInputValue: function setInputValue(value, silent) {
				this.$input.val(value);
				silent ? this.clearHint() : this._checkInputValue();
			},
			resetInputValue: function resetInputValue() {
				this.setInputValue(this.query, true);
			},
			getHint: function getHint() {
				return this.$hint.val();
			},
			setHint: function setHint(value) {
				this.$hint.val(value);
			},
			clearHint: function clearHint() {
				this.setHint("");
			},
			clearHintIfInvalid: function clearHintIfInvalid() {
				var val, hint, valIsPrefixOfHint, isValid;
				val = this.getInputValue();
				hint = this.getHint();
				valIsPrefixOfHint = val !== hint && hint.indexOf(val) === 0;
				isValid = val !== "" && valIsPrefixOfHint && !this.hasOverflow();
				!isValid && this.clearHint();
			},
			getLanguageDirection: function getLanguageDirection() {
				return (this.$input.css("direction") || "ltr").toLowerCase();
			},
			hasOverflow: function hasOverflow() {
				var constraint = this.$input.width() - 2;
				this.$overflowHelper.text(this.getInputValue());
				return this.$overflowHelper.width() >= constraint;
			},
			isCursorAtEnd: function() {
				var valueLength, selectionStart, range;
				valueLength = this.$input.val().length;
				selectionStart = this.$input[0].selectionStart;
				if (_.isNumber(selectionStart)) {
					return selectionStart === valueLength;
				} else if (document.selection) {
					range = document.selection.createRange();
					range.moveStart("character", -valueLength);
					return valueLength === range.text.length;
				}
				return true;
			},
			destroy: function destroy() {
				this.$hint.off(".tt");
				this.$input.off(".tt");
				this.$hint = this.$input = this.$overflowHelper = null;
			}
		});
		return Input;
		function buildOverflowHelper($input) {
			return $('<pre aria-hidden="true"></pre>').css({
				position: "absolute",
				visibility: "hidden",
				whiteSpace: "pre",
				fontFamily: $input.css("font-family"),
				fontSize: $input.css("font-size"),
				fontStyle: $input.css("font-style"),
				fontVariant: $input.css("font-variant"),
				fontWeight: $input.css("font-weight"),
				wordSpacing: $input.css("word-spacing"),
				letterSpacing: $input.css("letter-spacing"),
				textIndent: $input.css("text-indent"),
				textRendering: $input.css("text-rendering"),
				textTransform: $input.css("text-transform")
			}).insertAfter($input);
		}
		function areQueriesEquivalent(a, b) {
			return Input.normalizeQuery(a) === Input.normalizeQuery(b);
		}
		function withModifier($e) {
			return $e.altKey || $e.ctrlKey || $e.metaKey || $e.shiftKey;
		}
	}();
	var Dataset = function() {
		"use strict";
		var datasetKey = "ttDataset", valueKey = "ttValue", datumKey = "ttDatum";
		function Dataset(o) {
			o = o || {};
			o.templates = o.templates || {};
			if (!o.source) {
				$.error("missing source");
			}
			if (o.name && !isValidName(o.name)) {
				$.error("invalid dataset name: " + o.name);
			}
			this.query = null;
			this.highlight = !!o.highlight;
			this.name = o.name || _.getUniqueId();
			this.source = o.source;
			this.displayFn = getDisplayFn(o.display || o.displayKey);
			this.templates = getTemplates(o.templates, this.displayFn);
			this.$el = $(html.dataset.replace("%CLASS%", this.name));
		}
		Dataset.extractDatasetName = function extractDatasetName(el) {
			return $(el).data(datasetKey);
		};
		Dataset.extractValue = function extractDatum(el) {
			return $(el).data(valueKey);
		};
		Dataset.extractDatum = function extractDatum(el) {
			return $(el).data(datumKey);
		};
		_.mixin(Dataset.prototype, EventEmitter, {
			_render: function render(query, suggestions) {
				if (!this.$el) {
					return;
				}
				var that = this, hasSuggestions;
				this.$el.empty();
				hasSuggestions = suggestions && suggestions.length;
				if (!hasSuggestions && this.templates.empty) {
					this.$el.html(getEmptyHtml()).prepend(that.templates.header ? getHeaderHtml() : null).append(that.templates.footer ? getFooterHtml() : null);
				} else if (hasSuggestions) {
					this.$el.html(getSuggestionsHtml()).prepend(that.templates.header ? getHeaderHtml() : null).append(that.templates.footer ? getFooterHtml() : null);
				}
				this.trigger("rendered");
				function getEmptyHtml() {
					return that.templates.empty({
						query: query,
						isEmpty: true
					});
				}
				function getSuggestionsHtml() {
					var $suggestions, nodes;
					$suggestions = $(html.suggestions).css(css.suggestions);
					nodes = _.map(suggestions, getSuggestionNode);
					$suggestions.append.apply($suggestions, nodes);
					that.highlight && highlight({
						className: "tt-highlight",
						node: $suggestions[0],
						pattern: query
					});
					return $suggestions;
					function getSuggestionNode(suggestion) {
						var $el;
						$el = $(html.suggestion).append(that.templates.suggestion(suggestion)).data(datasetKey, that.name).data(valueKey, that.displayFn(suggestion)).data(datumKey, suggestion);
						$el.children().each(function() {
							$(this).css(css.suggestionChild);
						});
						return $el;
					}
				}
				function getHeaderHtml() {
					return that.templates.header({
						query: query,
						isEmpty: !hasSuggestions
					});
				}
				function getFooterHtml() {
					return that.templates.footer({
						query: query,
						isEmpty: !hasSuggestions
					});
				}
			},
			getRoot: function getRoot() {
				return this.$el;
			},
			update: function update(query) {
				var that = this;
				this.query = query;
				this.canceled = false;
				this.source(query, render);
				function render(suggestions) {
					if (!that.canceled && query === that.query) {
						that._render(query, suggestions);
					}
				}
			},
			cancel: function cancel() {
				this.canceled = true;
			},
			clear: function clear() {
				this.cancel();
				this.$el.empty();
				this.trigger("rendered");
			},
			isEmpty: function isEmpty() {
				return this.$el.is(":empty");
			},
			destroy: function destroy() {
				this.$el = null;
			}
		});
		return Dataset;
		function getDisplayFn(display) {
			display = display || "value";
			return _.isFunction(display) ? display : displayFn;
			function displayFn(obj) {
				return obj[display];
			}
		}
		function getTemplates(templates, displayFn) {
			return {
				empty: templates.empty && _.templatify(templates.empty),
				header: templates.header && _.templatify(templates.header),
				footer: templates.footer && _.templatify(templates.footer),
				suggestion: templates.suggestion || suggestionTemplate
			};
			function suggestionTemplate(context) {
				return "<p>" + displayFn(context) + "</p>";
			}
		}
		function isValidName(str) {
			return /^[_a-zA-Z0-9-]+$/.test(str);
		}
	}();
	var Dropdown = function() {
		"use strict";
		function Dropdown(o) {
			var that = this, onSuggestionClick, onSuggestionMouseEnter, onSuggestionMouseLeave;
			o = o || {};
			if (!o.menu) {
				$.error("menu is required");
			}
			this.isOpen = false;
			this.isEmpty = true;
			this.datasets = _.map(o.datasets, initializeDataset);
			onSuggestionClick = _.bind(this._onSuggestionClick, this);
			onSuggestionMouseEnter = _.bind(this._onSuggestionMouseEnter, this);
			onSuggestionMouseLeave = _.bind(this._onSuggestionMouseLeave, this);
			this.$menu = $(o.menu).on("click.tt", ".tt-suggestion", onSuggestionClick).on("mouseenter.tt", ".tt-suggestion", onSuggestionMouseEnter).on("mouseleave.tt", ".tt-suggestion", onSuggestionMouseLeave);
			_.each(this.datasets, function(dataset) {
				that.$menu.append(dataset.getRoot());
				dataset.onSync("rendered", that._onRendered, that);
			});
		}
		_.mixin(Dropdown.prototype, EventEmitter, {
			_onSuggestionClick: function onSuggestionClick($e) {
				this.trigger("suggestionClicked", $($e.currentTarget));
			},
			_onSuggestionMouseEnter: function onSuggestionMouseEnter($e) {
				this._removeCursor();
				this._setCursor($($e.currentTarget), true);
			},
			_onSuggestionMouseLeave: function onSuggestionMouseLeave() {
				this._removeCursor();
			},
			_onRendered: function onRendered() {
				this.isEmpty = _.every(this.datasets, isDatasetEmpty);
				this.isEmpty ? this._hide() : this.isOpen && this._show();
				this.trigger("datasetRendered");
				function isDatasetEmpty(dataset) {
					return dataset.isEmpty();
				}
			},
			_hide: function() {
				this.$menu.hide();
			},
			_show: function() {
				this.$menu.css("display", "block");
			},
			_getSuggestions: function getSuggestions() {
				return this.$menu.find(".tt-suggestion");
			},
			_getCursor: function getCursor() {
				return this.$menu.find(".tt-cursor").first();
			},
			_setCursor: function setCursor($el, silent) {
				$el.first().addClass("tt-cursor");
				!silent && this.trigger("cursorMoved");
			},
			_removeCursor: function removeCursor() {
				this._getCursor().removeClass("tt-cursor");
			},
			_moveCursor: function moveCursor(increment) {
				var $suggestions, $oldCursor, newCursorIndex, $newCursor;
				if (!this.isOpen) {
					return;
				}
				$oldCursor = this._getCursor();
				$suggestions = this._getSuggestions();
				this._removeCursor();
				newCursorIndex = $suggestions.index($oldCursor) + increment;
				newCursorIndex = (newCursorIndex + 1) % ($suggestions.length + 1) - 1;
				if (newCursorIndex === -1) {
					this.trigger("cursorRemoved");
					return;
				} else if (newCursorIndex < -1) {
					newCursorIndex = $suggestions.length - 1;
				}
				this._setCursor($newCursor = $suggestions.eq(newCursorIndex));
				this._ensureVisible($newCursor);
			},
			_ensureVisible: function ensureVisible($el) {
				var elTop, elBottom, menuScrollTop, menuHeight;
				elTop = $el.position().top;
				elBottom = elTop + $el.outerHeight(true);
				menuScrollTop = this.$menu.scrollTop();
				menuHeight = this.$menu.height() + parseInt(this.$menu.css("paddingTop"), 10) + parseInt(this.$menu.css("paddingBottom"), 10);
				if (elTop < 0) {
					this.$menu.scrollTop(menuScrollTop + elTop);
				} else if (menuHeight < elBottom) {
					this.$menu.scrollTop(menuScrollTop + (elBottom - menuHeight));
				}
			},
			close: function close() {
				if (this.isOpen) {
					this.isOpen = false;
					this._removeCursor();
					this._hide();
					this.trigger("closed");
				}
			},
			open: function open() {
				if (!this.isOpen) {
					this.isOpen = true;
					!this.isEmpty && this._show();
					this.trigger("opened");
				}
			},
			setLanguageDirection: function setLanguageDirection(dir) {
				this.$menu.css(dir === "ltr" ? css.ltr : css.rtl);
			},
			moveCursorUp: function moveCursorUp() {
				this._moveCursor(-1);
			},
			moveCursorDown: function moveCursorDown() {
				this._moveCursor(+1);
			},
			getDatumForSuggestion: function getDatumForSuggestion($el) {
				var datum = null;
				if ($el.length) {
					datum = {
						raw: Dataset.extractDatum($el),
						value: Dataset.extractValue($el),
						datasetName: Dataset.extractDatasetName($el)
					};
				}
				return datum;
			},
			getDatumForCursor: function getDatumForCursor() {
				return this.getDatumForSuggestion(this._getCursor().first());
			},
			getDatumForTopSuggestion: function getDatumForTopSuggestion() {
				return this.getDatumForSuggestion(this._getSuggestions().first());
			},
			update: function update(query) {
				_.each(this.datasets, updateDataset);
				function updateDataset(dataset) {
					dataset.update(query);
				}
			},
			empty: function empty() {
				_.each(this.datasets, clearDataset);
				this.isEmpty = true;
				function clearDataset(dataset) {
					dataset.clear();
				}
			},
			isVisible: function isVisible() {
				return this.isOpen && !this.isEmpty;
			},
			destroy: function destroy() {
				this.$menu.off(".tt");
				this.$menu = null;
				_.each(this.datasets, destroyDataset);
				function destroyDataset(dataset) {
					dataset.destroy();
				}
			}
		});
		return Dropdown;
		function initializeDataset(oDataset) {
			return new Dataset(oDataset);
		}
	}();
	var Typeahead = function() {
		"use strict";
		var attrsKey = "ttAttrs";
		function Typeahead(o) {
			var $menu, $input, $hint;
			o = o || {};
			if (!o.input) {
				$.error("missing input");
			}
			this.isActivated = false;
			this.autoselect = !!o.autoselect;
			this.minLength = _.isNumber(o.minLength) ? o.minLength : 1;
			this.$node = buildDom(o.input, o.withHint);
			$menu = this.$node.find(".tt-dropdown-menu");
			$input = this.$node.find(".tt-input");
			$hint = this.$node.find(".tt-hint");
			$input.on("blur.tt", function($e) {
				var active, isActive, hasActive;
				active = document.activeElement;
				isActive = $menu.is(active);
				hasActive = $menu.has(active).length > 0;
				if (_.isMsie() && (isActive || hasActive)) {
					$e.preventDefault();
					$e.stopImmediatePropagation();
					_.defer(function() {
						$input.focus();
					});
				}
			});
			$menu.on("mousedown.tt", function($e) {
				$e.preventDefault();
			});
			this.eventBus = o.eventBus || new EventBus({
				el: $input
			});
			this.dropdown = new Dropdown({
				menu: $menu,
				datasets: o.datasets
			}).onSync("suggestionClicked", this._onSuggestionClicked, this).onSync("cursorMoved", this._onCursorMoved, this).onSync("cursorRemoved", this._onCursorRemoved, this).onSync("opened", this._onOpened, this).onSync("closed", this._onClosed, this).onAsync("datasetRendered", this._onDatasetRendered, this);
			this.input = new Input({
				input: $input,
				hint: $hint
			}).onSync("focused", this._onFocused, this).onSync("blurred", this._onBlurred, this).onSync("enterKeyed", this._onEnterKeyed, this).onSync("tabKeyed", this._onTabKeyed, this).onSync("escKeyed", this._onEscKeyed, this).onSync("upKeyed", this._onUpKeyed, this).onSync("downKeyed", this._onDownKeyed, this).onSync("leftKeyed", this._onLeftKeyed, this).onSync("rightKeyed", this._onRightKeyed, this).onSync("queryChanged", this._onQueryChanged, this).onSync("whitespaceChanged", this._onWhitespaceChanged, this);
			this._setLanguageDirection();
		}
		_.mixin(Typeahead.prototype, {
			_onSuggestionClicked: function onSuggestionClicked(type, $el) {
				var datum;
				if (datum = this.dropdown.getDatumForSuggestion($el)) {
					this._select(datum);
				}
			},
			_onCursorMoved: function onCursorMoved() {
				var datum = this.dropdown.getDatumForCursor();
				this.input.setInputValue(datum.value, true);
				this.eventBus.trigger("cursorchanged", datum.raw, datum.datasetName);
			},
			_onCursorRemoved: function onCursorRemoved() {
				this.input.resetInputValue();
				this._updateHint();
			},
			_onDatasetRendered: function onDatasetRendered() {
				this._updateHint();
			},
			_onOpened: function onOpened() {
				this._updateHint();
				this.eventBus.trigger("opened");
			},
			_onClosed: function onClosed() {
				this.input.clearHint();
				this.eventBus.trigger("closed");
			},
			_onFocused: function onFocused() {
				this.isActivated = true;
				this.dropdown.open();
			},
			_onBlurred: function onBlurred() {
				this.isActivated = false;
				this.dropdown.empty();
				this.dropdown.close();
			},
			_onEnterKeyed: function onEnterKeyed(type, $e) {
				var cursorDatum, topSuggestionDatum;
				cursorDatum = this.dropdown.getDatumForCursor();
				topSuggestionDatum = this.dropdown.getDatumForTopSuggestion();
				if (cursorDatum) {
					this._select(cursorDatum);
					$e.preventDefault();
				} else if (this.autoselect && topSuggestionDatum) {
					this._select(topSuggestionDatum);
					$e.preventDefault();
				}
			},
			_onTabKeyed: function onTabKeyed(type, $e) {
				var datum;
				if (datum = this.dropdown.getDatumForCursor()) {
					this._select(datum);
					$e.preventDefault();
				} else {
					this._autocomplete(true);
				}
			},
			_onEscKeyed: function onEscKeyed() {
				this.dropdown.close();
				this.input.resetInputValue();
			},
			_onUpKeyed: function onUpKeyed() {
				var query = this.input.getQuery();
				this.dropdown.isEmpty && query.length >= this.minLength ? this.dropdown.update(query) : this.dropdown.moveCursorUp();
				this.dropdown.open();
			},
			_onDownKeyed: function onDownKeyed() {
				var query = this.input.getQuery();
				this.dropdown.isEmpty && query.length >= this.minLength ? this.dropdown.update(query) : this.dropdown.moveCursorDown();
				this.dropdown.open();
			},
			_onLeftKeyed: function onLeftKeyed() {
				this.dir === "rtl" && this._autocomplete();
			},
			_onRightKeyed: function onRightKeyed() {
				this.dir === "ltr" && this._autocomplete();
			},
			_onQueryChanged: function onQueryChanged(e, query) {
				this.input.clearHintIfInvalid();
				query.length >= this.minLength ? this.dropdown.update(query) : this.dropdown.empty();
				this.dropdown.open();
				this._setLanguageDirection();
			},
			_onWhitespaceChanged: function onWhitespaceChanged() {
				this._updateHint();
				this.dropdown.open();
			},
			_setLanguageDirection: function setLanguageDirection() {
				var dir;
				if (this.dir !== (dir = this.input.getLanguageDirection())) {
					this.dir = dir;
					this.$node.css("direction", dir);
					this.dropdown.setLanguageDirection(dir);
				}
			},
			_updateHint: function updateHint() {
				var datum, val, query, escapedQuery, frontMatchRegEx, match;
				datum = this.dropdown.getDatumForTopSuggestion();
				if (datum && this.dropdown.isVisible() && !this.input.hasOverflow()) {
					val = this.input.getInputValue();
					query = Input.normalizeQuery(val);
					escapedQuery = _.escapeRegExChars(query);
					frontMatchRegEx = new RegExp("^(?:" + escapedQuery + ")(.+$)", "i");
					match = frontMatchRegEx.exec(datum.value);
					match ? this.input.setHint(val + match[1]) : this.input.clearHint();
				} else {
					this.input.clearHint();
				}
			},
			_autocomplete: function autocomplete(laxCursor) {
				var hint, query, isCursorAtEnd, datum;
				hint = this.input.getHint();
				query = this.input.getQuery();
				isCursorAtEnd = laxCursor || this.input.isCursorAtEnd();
				if (hint && query !== hint && isCursorAtEnd) {
					datum = this.dropdown.getDatumForTopSuggestion();
					datum && this.input.setInputValue(datum.value);
					this.eventBus.trigger("autocompleted", datum.raw, datum.datasetName);
				}
			},
			_select: function select(datum) {
				this.input.setQuery(datum.value);
				this.input.setInputValue(datum.value, true);
				this._setLanguageDirection();
				this.eventBus.trigger("selected", datum.raw, datum.datasetName);
				this.dropdown.close();
				_.defer(_.bind(this.dropdown.empty, this.dropdown));
			},
			open: function open() {
				this.dropdown.open();
			},
			close: function close() {
				this.dropdown.close();
			},
			setVal: function setVal(val) {
				val = _.toStr(val);
				if (this.isActivated) {
					this.input.setInputValue(val);
				} else {
					this.input.setQuery(val);
					this.input.setInputValue(val, true);
				}
				this._setLanguageDirection();
			},
			getVal: function getVal() {
				return this.input.getQuery();
			},
			destroy: function destroy() {
				this.input.destroy();
				this.dropdown.destroy();
				destroyDomStructure(this.$node);
				this.$node = null;
			}
		});
		return Typeahead;
		function buildDom(input, withHint) {
			var $input, $wrapper, $dropdown, $hint;
			$input = $(input);
			$wrapper = $(html.wrapper).css(css.wrapper);
			$dropdown = $(html.dropdown).css(css.dropdown);
			$hint = $input.clone().css(css.hint).css(getBackgroundStyles($input));
			$hint.val("").removeData().addClass("tt-hint").removeAttr("id name placeholder required").prop("readonly", true).attr({
				autocomplete: "off",
				spellcheck: "false",
				tabindex: -1
			});
			$input.data(attrsKey, {
				dir: $input.attr("dir"),
				autocomplete: $input.attr("autocomplete"),
				spellcheck: $input.attr("spellcheck"),
				style: $input.attr("style")
			});
			$input.addClass("tt-input").attr({
				autocomplete: "off",
				spellcheck: false
			}).css(withHint ? css.input : css.inputWithNoHint);
			try {
				!$input.attr("dir") && $input.attr("dir", "auto");
			} catch (e) {}
			return $input.wrap($wrapper).parent().prepend(withHint ? $hint : null).append($dropdown);
		}
		function getBackgroundStyles($el) {
			return {
				backgroundAttachment: $el.css("background-attachment"),
				backgroundClip: $el.css("background-clip"),
				backgroundColor: $el.css("background-color"),
				backgroundImage: $el.css("background-image"),
				backgroundOrigin: $el.css("background-origin"),
				backgroundPosition: $el.css("background-position"),
				backgroundRepeat: $el.css("background-repeat"),
				backgroundSize: $el.css("background-size")
			};
		}
		function destroyDomStructure($node) {
			var $input = $node.find(".tt-input");
			_.each($input.data(attrsKey), function(val, key) {
				_.isUndefined(val) ? $input.removeAttr(key) : $input.attr(key, val);
			});
			$input.detach().removeData(attrsKey).removeClass("tt-input").insertAfter($node);
			$node.remove();
		}
	}();
	(function() {
		"use strict";
		var old, typeaheadKey, methods;
		old = $.fn.typeahead;
		typeaheadKey = "ttTypeahead";
		methods = {
			initialize: function initialize(o, datasets) {
				datasets = _.isArray(datasets) ? datasets : [].slice.call(arguments, 1);
				o = o || {};
				return this.each(attach);
				function attach() {
					var $input = $(this), eventBus, typeahead;
					_.each(datasets, function(d) {
						d.highlight = !!o.highlight;
					});
					typeahead = new Typeahead({
						input: $input,
						eventBus: eventBus = new EventBus({
							el: $input
						}),
						withHint: _.isUndefined(o.hint) ? true : !!o.hint,
						minLength: o.minLength,
						autoselect: o.autoselect,
						datasets: datasets
					});
					$input.data(typeaheadKey, typeahead);
				}
			},
			open: function open() {
				return this.each(openTypeahead);
				function openTypeahead() {
					var $input = $(this), typeahead;
					if (typeahead = $input.data(typeaheadKey)) {
						typeahead.open();
					}
				}
			},
			close: function close() {
				return this.each(closeTypeahead);
				function closeTypeahead() {
					var $input = $(this), typeahead;
					if (typeahead = $input.data(typeaheadKey)) {
						typeahead.close();
					}
				}
			},
			val: function val(newVal) {
				return !arguments.length ? getVal(this.first()) : this.each(setVal);
				function setVal() {
					var $input = $(this), typeahead;
					if (typeahead = $input.data(typeaheadKey)) {
						typeahead.setVal(newVal);
					}
				}
				function getVal($input) {
					var typeahead, query;
					if (typeahead = $input.data(typeaheadKey)) {
						query = typeahead.getVal();
					}
					return query;
				}
			},
			destroy: function destroy() {
				return this.each(unattach);
				function unattach() {
					var $input = $(this), typeahead;
					if (typeahead = $input.data(typeaheadKey)) {
						typeahead.destroy();
						$input.removeData(typeaheadKey);
					}
				}
			}
		};
		$.fn.typeahead = function(method) {
			var tts;
			if (methods[method] && method !== "initialize") {
				tts = this.filter(function() {
					return !!$(this).data(typeaheadKey);
				});
				return methods[method].apply(tts, [].slice.call(arguments, 1));
			} else {
				return methods.initialize.apply(this, arguments);
			}
		};
		$.fn.typeahead.noConflict = function noConflict() {
			$.fn.typeahead = old;
			return this;
		};
	})();
})(window.jQuery);

//# sourceMappingURL=vendor.js.map