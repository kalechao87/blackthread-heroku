this.main = this.main || {};
(function () {
'use strict';

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {}

function interopDefault(ex) {
	return ex && typeof ex === 'object' && 'default' in ex ? ex['default'] : ex;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _global = createCommonjsModule(function (module) {
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
});

var _global$1 = interopDefault(_global);


var require$$3 = Object.freeze({
  default: _global$1
});

var _has = createCommonjsModule(function (module) {
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};
});

var _has$1 = interopDefault(_has);


var require$$4 = Object.freeze({
  default: _has$1
});

var _fails = createCommonjsModule(function (module) {
module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};
});

var _fails$1 = interopDefault(_fails);


var require$$1$1 = Object.freeze({
  default: _fails$1
});

var _descriptors = createCommonjsModule(function (module) {
// Thank's IE8 for his funny defineProperty
module.exports = !interopDefault(require$$1$1)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});
});

var _descriptors$1 = interopDefault(_descriptors);


var require$$1 = Object.freeze({
  default: _descriptors$1
});

var _core = createCommonjsModule(function (module) {
var core = module.exports = { version: '2.5.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
});

var _core$1 = interopDefault(_core);
var version = _core.version;

var require$$0 = Object.freeze({
	default: _core$1,
	version: version
});

var _isObject = createCommonjsModule(function (module) {
module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
});

var _isObject$1 = interopDefault(_isObject);


var require$$3$1 = Object.freeze({
  default: _isObject$1
});

var _anObject = createCommonjsModule(function (module) {
var isObject = interopDefault(require$$3$1);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};
});

var _anObject$1 = interopDefault(_anObject);


var require$$5 = Object.freeze({
  default: _anObject$1
});

var _domCreate = createCommonjsModule(function (module) {
var isObject = interopDefault(require$$3$1);
var document = interopDefault(require$$3).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};
});

var _domCreate$1 = interopDefault(_domCreate);


var require$$2$2 = Object.freeze({
  default: _domCreate$1
});

var _ie8DomDefine = createCommonjsModule(function (module) {
module.exports = !interopDefault(require$$1) && !interopDefault(require$$1$1)(function () {
  return Object.defineProperty(interopDefault(require$$2$2)('div'), 'a', { get: function () { return 7; } }).a != 7;
});
});

var _ie8DomDefine$1 = interopDefault(_ie8DomDefine);


var require$$1$3 = Object.freeze({
  default: _ie8DomDefine$1
});

var _toPrimitive = createCommonjsModule(function (module) {
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = interopDefault(require$$3$1);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};
});

var _toPrimitive$1 = interopDefault(_toPrimitive);


var require$$4$1 = Object.freeze({
  default: _toPrimitive$1
});

var _objectDp = createCommonjsModule(function (module, exports) {
var anObject = interopDefault(require$$5);
var IE8_DOM_DEFINE = interopDefault(require$$1$3);
var toPrimitive = interopDefault(require$$4$1);
var dP = Object.defineProperty;

exports.f = interopDefault(require$$1) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};
});

var _objectDp$1 = interopDefault(_objectDp);
var f = _objectDp.f;

var require$$2$1 = Object.freeze({
  default: _objectDp$1,
  f: f
});

var _propertyDesc = createCommonjsModule(function (module) {
module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};
});

var _propertyDesc$1 = interopDefault(_propertyDesc);


var require$$2$3 = Object.freeze({
  default: _propertyDesc$1
});

var _hide = createCommonjsModule(function (module) {
var dP = interopDefault(require$$2$1);
var createDesc = interopDefault(require$$2$3);
module.exports = interopDefault(require$$1) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};
});

var _hide$1 = interopDefault(_hide);


var require$$2 = Object.freeze({
  default: _hide$1
});

var _uid = createCommonjsModule(function (module) {
var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
});

var _uid$1 = interopDefault(_uid);


var require$$12 = Object.freeze({
  default: _uid$1
});

var _redefine = createCommonjsModule(function (module) {
var global = interopDefault(require$$3);
var hide = interopDefault(require$$2);
var has = interopDefault(require$$4);
var SRC = interopDefault(require$$12)('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

interopDefault(require$$0).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});
});

var _redefine$1 = interopDefault(_redefine);


var require$$4$2 = Object.freeze({
  default: _redefine$1
});

var _aFunction = createCommonjsModule(function (module) {
module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};
});

var _aFunction$1 = interopDefault(_aFunction);


var require$$6 = Object.freeze({
  default: _aFunction$1
});

var _ctx = createCommonjsModule(function (module) {
// optional / simple context binding
var aFunction = interopDefault(require$$6);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};
});

var _ctx$1 = interopDefault(_ctx);


var require$$1$4 = Object.freeze({
  default: _ctx$1
});

var _export = createCommonjsModule(function (module) {
var global = interopDefault(require$$3);
var core = interopDefault(require$$0);
var hide = interopDefault(require$$2);
var redefine = interopDefault(require$$4$2);
var ctx = interopDefault(require$$1$4);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;
});

var _export$1 = interopDefault(_export);


var require$$1$2 = Object.freeze({
  default: _export$1
});

var _meta = createCommonjsModule(function (module) {
var META = interopDefault(require$$12)('meta');
var isObject = interopDefault(require$$3$1);
var has = interopDefault(require$$4);
var setDesc = interopDefault(require$$2$1).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !interopDefault(require$$1$1)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};
});

var _meta$1 = interopDefault(_meta);
var KEY = _meta.KEY;
var NEED = _meta.NEED;
var fastKey = _meta.fastKey;
var getWeak = _meta.getWeak;
var onFreeze = _meta.onFreeze;

var require$$7 = Object.freeze({
  default: _meta$1,
  KEY: KEY,
  NEED: NEED,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
});

var _shared = createCommonjsModule(function (module) {
var global = interopDefault(require$$3);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};
});

var _shared$1 = interopDefault(_shared);


var require$$1$5 = Object.freeze({
  default: _shared$1
});

var _wks = createCommonjsModule(function (module) {
var store = interopDefault(require$$1$5)('wks');
var uid = interopDefault(require$$12);
var Symbol = interopDefault(require$$3).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
});

var _wks$1 = interopDefault(_wks);


var require$$0$2 = Object.freeze({
  default: _wks$1
});

var _setToStringTag = createCommonjsModule(function (module) {
var def = interopDefault(require$$2$1).f;
var has = interopDefault(require$$4);
var TAG = interopDefault(require$$0$2)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};
});

var _setToStringTag$1 = interopDefault(_setToStringTag);


var require$$0$1 = Object.freeze({
  default: _setToStringTag$1
});

var _wksExt = createCommonjsModule(function (module, exports) {
exports.f = interopDefault(require$$0$2);
});

var _wksExt$1 = interopDefault(_wksExt);
var f$1 = _wksExt.f;

var require$$1$6 = Object.freeze({
	default: _wksExt$1,
	f: f$1
});

var _library = createCommonjsModule(function (module) {
module.exports = false;
});

var _library$1 = interopDefault(_library);


var require$$2$4 = Object.freeze({
	default: _library$1
});

var _wksDefine = createCommonjsModule(function (module) {
var global = interopDefault(require$$3);
var core = interopDefault(require$$0);
var LIBRARY = interopDefault(require$$2$4);
var wksExt = interopDefault(require$$1$6);
var defineProperty = interopDefault(require$$2$1).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};
});

var _wksDefine$1 = interopDefault(_wksDefine);


var require$$0$3 = Object.freeze({
  default: _wksDefine$1
});

var _cof = createCommonjsModule(function (module) {
var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};
});

var _cof$1 = interopDefault(_cof);


var require$$0$4 = Object.freeze({
  default: _cof$1
});

var _iobject = createCommonjsModule(function (module) {
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = interopDefault(require$$0$4);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};
});

var _iobject$1 = interopDefault(_iobject);


var require$$1$9 = Object.freeze({
  default: _iobject$1
});

var _defined = createCommonjsModule(function (module) {
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};
});

var _defined$1 = interopDefault(_defined);


var require$$4$3 = Object.freeze({
  default: _defined$1
});

var _toIobject = createCommonjsModule(function (module) {
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = interopDefault(require$$1$9);
var defined = interopDefault(require$$4$3);
module.exports = function (it) {
  return IObject(defined(it));
};
});

var _toIobject$1 = interopDefault(_toIobject);


var require$$1$8 = Object.freeze({
  default: _toIobject$1
});

var _toInteger = createCommonjsModule(function (module) {
// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
});

var _toInteger$1 = interopDefault(_toInteger);


var require$$2$5 = Object.freeze({
  default: _toInteger$1
});

var _toLength = createCommonjsModule(function (module) {
// 7.1.15 ToLength
var toInteger = interopDefault(require$$2$5);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
});

var _toLength$1 = interopDefault(_toLength);


var require$$3$2 = Object.freeze({
  default: _toLength$1
});

var _toAbsoluteIndex = createCommonjsModule(function (module) {
var toInteger = interopDefault(require$$2$5);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
});

var _toAbsoluteIndex$1 = interopDefault(_toAbsoluteIndex);


var require$$23 = Object.freeze({
  default: _toAbsoluteIndex$1
});

var _arrayIncludes = createCommonjsModule(function (module) {
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = interopDefault(require$$1$8);
var toLength = interopDefault(require$$3$2);
var toAbsoluteIndex = interopDefault(require$$23);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
});

var _arrayIncludes$1 = interopDefault(_arrayIncludes);


var require$$1$10 = Object.freeze({
  default: _arrayIncludes$1
});

var _sharedKey = createCommonjsModule(function (module) {
var shared = interopDefault(require$$1$5)('keys');
var uid = interopDefault(require$$12);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};
});

var _sharedKey$1 = interopDefault(_sharedKey);


var require$$0$5 = Object.freeze({
  default: _sharedKey$1
});

var _objectKeysInternal = createCommonjsModule(function (module) {
var has = interopDefault(require$$4);
var toIObject = interopDefault(require$$1$8);
var arrayIndexOf = interopDefault(require$$1$10)(false);
var IE_PROTO = interopDefault(require$$0$5)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
});

var _objectKeysInternal$1 = interopDefault(_objectKeysInternal);


var require$$1$7 = Object.freeze({
  default: _objectKeysInternal$1
});

var _enumBugKeys = createCommonjsModule(function (module) {
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
});

var _enumBugKeys$1 = interopDefault(_enumBugKeys);


var require$$0$6 = Object.freeze({
  default: _enumBugKeys$1
});

var _objectKeys = createCommonjsModule(function (module) {
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = interopDefault(require$$1$7);
var enumBugKeys = interopDefault(require$$0$6);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};
});

var _objectKeys$1 = interopDefault(_objectKeys);


var require$$5$1 = Object.freeze({
  default: _objectKeys$1
});

var _objectGops = createCommonjsModule(function (module, exports) {
exports.f = Object.getOwnPropertySymbols;
});

var _objectGops$1 = interopDefault(_objectGops);
var f$2 = _objectGops.f;

var require$$2$6 = Object.freeze({
	default: _objectGops$1,
	f: f$2
});

var _objectPie = createCommonjsModule(function (module, exports) {
exports.f = {}.propertyIsEnumerable;
});

var _objectPie$1 = interopDefault(_objectPie);
var f$3 = _objectPie.f;

var require$$0$7 = Object.freeze({
	default: _objectPie$1,
	f: f$3
});

var _enumKeys = createCommonjsModule(function (module) {
// all enumerable object keys, includes symbols
var getKeys = interopDefault(require$$5$1);
var gOPS = interopDefault(require$$2$6);
var pIE = interopDefault(require$$0$7);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};
});

var _enumKeys$1 = interopDefault(_enumKeys);


var require$$15 = Object.freeze({
  default: _enumKeys$1
});

var _isArray = createCommonjsModule(function (module) {
// 7.2.2 IsArray(argument)
var cof = interopDefault(require$$0$4);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};
});

var _isArray$1 = interopDefault(_isArray);


var require$$4$4 = Object.freeze({
  default: _isArray$1
});

var _objectDps = createCommonjsModule(function (module) {
var dP = interopDefault(require$$2$1);
var anObject = interopDefault(require$$5);
var getKeys = interopDefault(require$$5$1);

module.exports = interopDefault(require$$1) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
});

var _objectDps$1 = interopDefault(_objectDps);


var require$$0$8 = Object.freeze({
  default: _objectDps$1
});

var _html = createCommonjsModule(function (module) {
var document = interopDefault(require$$3).document;
module.exports = document && document.documentElement;
});

var _html$1 = interopDefault(_html);


var require$$3$3 = Object.freeze({
	default: _html$1
});

var _objectCreate = createCommonjsModule(function (module) {
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = interopDefault(require$$5);
var dPs = interopDefault(require$$0$8);
var enumBugKeys = interopDefault(require$$0$6);
var IE_PROTO = interopDefault(require$$0$5)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = interopDefault(require$$2$2)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  interopDefault(require$$3$3).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};
});

var _objectCreate$1 = interopDefault(_objectCreate);


var require$$6$1 = Object.freeze({
  default: _objectCreate$1
});

var _objectGopn = createCommonjsModule(function (module, exports) {
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = interopDefault(require$$1$7);
var hiddenKeys = interopDefault(require$$0$6).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};
});

var _objectGopn$1 = interopDefault(_objectGopn);
var f$5 = _objectGopn.f;

var require$$3$4 = Object.freeze({
  default: _objectGopn$1,
  f: f$5
});

var _objectGopnExt = createCommonjsModule(function (module) {
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = interopDefault(require$$1$8);
var gOPN = interopDefault(require$$3$4).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};
});

var _objectGopnExt$1 = interopDefault(_objectGopnExt);
var f$4 = _objectGopnExt.f;

var require$$0$9 = Object.freeze({
  default: _objectGopnExt$1,
  f: f$4
});

var _objectGopd = createCommonjsModule(function (module, exports) {
var pIE = interopDefault(require$$0$7);
var createDesc = interopDefault(require$$2$3);
var toIObject = interopDefault(require$$1$8);
var toPrimitive = interopDefault(require$$4$1);
var has = interopDefault(require$$4);
var IE8_DOM_DEFINE = interopDefault(require$$1$3);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = interopDefault(require$$1) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};
});

var _objectGopd$1 = interopDefault(_objectGopd);
var f$6 = _objectGopd.f;

var require$$2$7 = Object.freeze({
  default: _objectGopd$1,
  f: f$6
});

var es6_symbol = createCommonjsModule(function (module) {
'use strict';
// ECMAScript 6 symbols shim
var global = interopDefault(require$$3);
var has = interopDefault(require$$4);
var DESCRIPTORS = interopDefault(require$$1);
var $export = interopDefault(require$$1$2);
var redefine = interopDefault(require$$4$2);
var META = interopDefault(require$$7).KEY;
var $fails = interopDefault(require$$1$1);
var shared = interopDefault(require$$1$5);
var setToStringTag = interopDefault(require$$0$1);
var uid = interopDefault(require$$12);
var wks = interopDefault(require$$0$2);
var wksExt = interopDefault(require$$1$6);
var wksDefine = interopDefault(require$$0$3);
var enumKeys = interopDefault(require$$15);
var isArray = interopDefault(require$$4$4);
var anObject = interopDefault(require$$5);
var toIObject = interopDefault(require$$1$8);
var toPrimitive = interopDefault(require$$4$1);
var createDesc = interopDefault(require$$2$3);
var _create = interopDefault(require$$6$1);
var gOPNExt = interopDefault(require$$0$9);
var $GOPD = interopDefault(require$$2$7);
var $DP = interopDefault(require$$2$1);
var $keys = interopDefault(require$$5$1);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  interopDefault(require$$3$4).f = gOPNExt.f = $getOwnPropertyNames;
  interopDefault(require$$0$7).f = $propertyIsEnumerable;
  interopDefault(require$$2$6).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !interopDefault(require$$2$4)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    replacer = args[1];
    if (typeof replacer == 'function') $replacer = replacer;
    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
      if ($replacer) value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || interopDefault(require$$2)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
});

interopDefault(es6_symbol);

var es6_object_create = createCommonjsModule(function (module) {
var $export = interopDefault(require$$1$2);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: interopDefault(require$$6$1) });
});

interopDefault(es6_object_create);

var es6_object_defineProperty = createCommonjsModule(function (module) {
var $export = interopDefault(require$$1$2);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !interopDefault(require$$1), 'Object', { defineProperty: interopDefault(require$$2$1).f });
});

interopDefault(es6_object_defineProperty);

var es6_object_defineProperties = createCommonjsModule(function (module) {
var $export = interopDefault(require$$1$2);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !interopDefault(require$$1), 'Object', { defineProperties: interopDefault(require$$0$8) });
});

interopDefault(es6_object_defineProperties);

var _objectSap = createCommonjsModule(function (module) {
// most Object methods by ES6 should accept primitives
var $export = interopDefault(require$$1$2);
var core = interopDefault(require$$0);
var fails = interopDefault(require$$1$1);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};
});

var _objectSap$1 = interopDefault(_objectSap);


var require$$0$10 = Object.freeze({
  default: _objectSap$1
});

var es6_object_getOwnPropertyDescriptor = createCommonjsModule(function (module) {
// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = interopDefault(require$$1$8);
var $getOwnPropertyDescriptor = interopDefault(require$$2$7).f;

interopDefault(require$$0$10)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});
});

interopDefault(es6_object_getOwnPropertyDescriptor);

var _toObject = createCommonjsModule(function (module) {
// 7.1.13 ToObject(argument)
var defined = interopDefault(require$$4$3);
module.exports = function (it) {
  return Object(defined(it));
};
});

var _toObject$1 = interopDefault(_toObject);


var require$$5$2 = Object.freeze({
  default: _toObject$1
});

var _objectGpo = createCommonjsModule(function (module) {
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = interopDefault(require$$4);
var toObject = interopDefault(require$$5$2);
var IE_PROTO = interopDefault(require$$0$5)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
});

var _objectGpo$1 = interopDefault(_objectGpo);


var require$$0$11 = Object.freeze({
  default: _objectGpo$1
});

var es6_object_getPrototypeOf = createCommonjsModule(function (module) {
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = interopDefault(require$$5$2);
var $getPrototypeOf = interopDefault(require$$0$11);

interopDefault(require$$0$10)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});
});

interopDefault(es6_object_getPrototypeOf);

var es6_object_keys = createCommonjsModule(function (module) {
// 19.1.2.14 Object.keys(O)
var toObject = interopDefault(require$$5$2);
var $keys = interopDefault(require$$5$1);

interopDefault(require$$0$10)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});
});

interopDefault(es6_object_keys);

var es6_object_getOwnPropertyNames = createCommonjsModule(function (module) {
// 19.1.2.7 Object.getOwnPropertyNames(O)
interopDefault(require$$0$10)('getOwnPropertyNames', function () {
  return interopDefault(require$$0$9).f;
});
});

interopDefault(es6_object_getOwnPropertyNames);

var es6_object_freeze = createCommonjsModule(function (module) {
// 19.1.2.5 Object.freeze(O)
var isObject = interopDefault(require$$3$1);
var meta = interopDefault(require$$7).onFreeze;

interopDefault(require$$0$10)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});
});

interopDefault(es6_object_freeze);

var es6_object_seal = createCommonjsModule(function (module) {
// 19.1.2.17 Object.seal(O)
var isObject = interopDefault(require$$3$1);
var meta = interopDefault(require$$7).onFreeze;

interopDefault(require$$0$10)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});
});

interopDefault(es6_object_seal);

var es6_object_preventExtensions = createCommonjsModule(function (module) {
// 19.1.2.15 Object.preventExtensions(O)
var isObject = interopDefault(require$$3$1);
var meta = interopDefault(require$$7).onFreeze;

interopDefault(require$$0$10)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});
});

interopDefault(es6_object_preventExtensions);

var es6_object_isFrozen = createCommonjsModule(function (module) {
// 19.1.2.12 Object.isFrozen(O)
var isObject = interopDefault(require$$3$1);

interopDefault(require$$0$10)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});
});

interopDefault(es6_object_isFrozen);

var es6_object_isSealed = createCommonjsModule(function (module) {
// 19.1.2.13 Object.isSealed(O)
var isObject = interopDefault(require$$3$1);

interopDefault(require$$0$10)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});
});

interopDefault(es6_object_isSealed);

var es6_object_isExtensible = createCommonjsModule(function (module) {
// 19.1.2.11 Object.isExtensible(O)
var isObject = interopDefault(require$$3$1);

interopDefault(require$$0$10)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});
});

interopDefault(es6_object_isExtensible);

var _objectAssign = createCommonjsModule(function (module) {
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = interopDefault(require$$5$1);
var gOPS = interopDefault(require$$2$6);
var pIE = interopDefault(require$$0$7);
var toObject = interopDefault(require$$5$2);
var IObject = interopDefault(require$$1$9);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || interopDefault(require$$1$1)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;
});

var _objectAssign$1 = interopDefault(_objectAssign);


var require$$5$3 = Object.freeze({
  default: _objectAssign$1
});

var es6_object_assign = createCommonjsModule(function (module) {
// 19.1.3.1 Object.assign(target, source)
var $export = interopDefault(require$$1$2);

$export($export.S + $export.F, 'Object', { assign: interopDefault(require$$5$3) });
});

interopDefault(es6_object_assign);

var _sameValue = createCommonjsModule(function (module) {
// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};
});

var _sameValue$1 = interopDefault(_sameValue);


var require$$0$12 = Object.freeze({
  default: _sameValue$1
});

var es6_object_is = createCommonjsModule(function (module) {
// 19.1.3.10 Object.is(value1, value2)
var $export = interopDefault(require$$1$2);
$export($export.S, 'Object', { is: interopDefault(require$$0$12) });
});

interopDefault(es6_object_is);

var _setProto = createCommonjsModule(function (module) {
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = interopDefault(require$$3$1);
var anObject = interopDefault(require$$5);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = interopDefault(require$$1$4)(Function.call, interopDefault(require$$2$7).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
});

var _setProto$1 = interopDefault(_setProto);
var set = _setProto.set;
var check = _setProto.check;

var require$$0$13 = Object.freeze({
  default: _setProto$1,
  set: set,
  check: check
});

var es6_object_setPrototypeOf = createCommonjsModule(function (module) {
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = interopDefault(require$$1$2);
$export($export.S, 'Object', { setPrototypeOf: interopDefault(require$$0$13).set });
});

interopDefault(es6_object_setPrototypeOf);

var _classof = createCommonjsModule(function (module) {
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = interopDefault(require$$0$4);
var TAG = interopDefault(require$$0$2)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
});

var _classof$1 = interopDefault(_classof);


var require$$1$11 = Object.freeze({
  default: _classof$1
});

var es6_object_toString = createCommonjsModule(function (module) {
'use strict';
// 19.1.3.6 Object.prototype.toString()
var classof = interopDefault(require$$1$11);
var test = {};
test[interopDefault(require$$0$2)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  interopDefault(require$$4$2)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}
});

interopDefault(es6_object_toString);

var _invoke = createCommonjsModule(function (module) {
// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};
});

var _invoke$1 = interopDefault(_invoke);


var require$$4$5 = Object.freeze({
  default: _invoke$1
});

var _bind = createCommonjsModule(function (module) {
'use strict';
var aFunction = interopDefault(require$$6);
var isObject = interopDefault(require$$3$1);
var invoke = interopDefault(require$$4$5);
var arraySlice = [].slice;
var factories = {};

var construct = function (F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) n[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  } return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function (/* args... */) {
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};
});

var _bind$1 = interopDefault(_bind);


var require$$1$12 = Object.freeze({
  default: _bind$1
});

var es6_function_bind = createCommonjsModule(function (module) {
// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = interopDefault(require$$1$2);

$export($export.P, 'Function', { bind: interopDefault(require$$1$12) });
});

interopDefault(es6_function_bind);

var es6_function_name = createCommonjsModule(function (module) {
var dP = interopDefault(require$$2$1).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || interopDefault(require$$1) && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});
});

interopDefault(es6_function_name);

var es6_function_hasInstance = createCommonjsModule(function (module) {
'use strict';
var isObject = interopDefault(require$$3$1);
var getPrototypeOf = interopDefault(require$$0$11);
var HAS_INSTANCE = interopDefault(require$$0$2)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) interopDefault(require$$2$1).f(FunctionProto, HAS_INSTANCE, { value: function (O) {
  if (typeof this != 'function' || !isObject(O)) return false;
  if (!isObject(this.prototype)) return O instanceof this;
  // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
  while (O = getPrototypeOf(O)) if (this.prototype === O) return true;
  return false;
} });
});

interopDefault(es6_function_hasInstance);

var _stringWs = createCommonjsModule(function (module) {
module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
});

var _stringWs$1 = interopDefault(_stringWs);


var require$$0$16 = Object.freeze({
  default: _stringWs$1
});

var _stringTrim = createCommonjsModule(function (module) {
var $export = interopDefault(require$$1$2);
var defined = interopDefault(require$$4$3);
var fails = interopDefault(require$$1$1);
var spaces = interopDefault(require$$0$16);
var space = '[' + spaces + ']';
var non = '\u200b\u0085';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function (KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;
});

var _stringTrim$1 = interopDefault(_stringTrim);


var require$$0$15 = Object.freeze({
  default: _stringTrim$1
});

var _parseInt = createCommonjsModule(function (module) {
var $parseInt = interopDefault(require$$3).parseInt;
var $trim = interopDefault(require$$0$15).trim;
var ws = interopDefault(require$$0$16);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, (radix >>> 0) || (hex.test(string) ? 16 : 10));
} : $parseInt;
});

var _parseInt$1 = interopDefault(_parseInt);


var require$$0$14 = Object.freeze({
  default: _parseInt$1
});

var es6_parseInt = createCommonjsModule(function (module) {
var $export = interopDefault(require$$1$2);
var $parseInt = interopDefault(require$$0$14);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });
});

interopDefault(es6_parseInt);

var _parseFloat = createCommonjsModule(function (module) {
var $parseFloat = interopDefault(require$$3).parseFloat;
var $trim = interopDefault(require$$0$15).trim;

module.exports = 1 / $parseFloat(interopDefault(require$$0$16) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;
});

var _parseFloat$1 = interopDefault(_parseFloat);


var require$$0$17 = Object.freeze({
  default: _parseFloat$1
});

var es6_parseFloat = createCommonjsModule(function (module) {
var $export = interopDefault(require$$1$2);
var $parseFloat = interopDefault(require$$0$17);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });
});

interopDefault(es6_parseFloat);

var _inheritIfRequired = createCommonjsModule(function (module) {
var isObject = interopDefault(require$$3$1);
var setPrototypeOf = interopDefault(require$$0$13).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  } return that;
};
});

var _inheritIfRequired$1 = interopDefault(_inheritIfRequired);


var require$$0$18 = Object.freeze({
  default: _inheritIfRequired$1
});

var es6_number_constructor = createCommonjsModule(function (module) {
'use strict';
var global = interopDefault(require$$3);
var has = interopDefault(require$$4);
var cof = interopDefault(require$$0$4);
var inheritIfRequired = interopDefault(require$$0$18);
var toPrimitive = interopDefault(require$$4$1);
var fails = interopDefault(require$$1$1);
var gOPN = interopDefault(require$$3$4).f;
var gOPD = interopDefault(require$$2$7).f;
var dP = interopDefault(require$$2$1).f;
var $trim = interopDefault(require$$0$15).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(interopDefault(require$$6$1)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
        default: return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
      // check on 1..constructor(foo) case
      && (BROKEN_COF ? fails(function () { proto.valueOf.call(that); }) : cof(that) != NUMBER)
        ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = interopDefault(require$$1) ? gOPN(Base) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES6 (in case, if modules with ES6 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  interopDefault(require$$4$2)(global, NUMBER, $Number);
}
});

interopDefault(es6_number_constructor);

var _aNumberValue = createCommonjsModule(function (module) {
var cof = interopDefault(require$$0$4);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};
});

var _aNumberValue$1 = interopDefault(_aNumberValue);


var require$$0$19 = Object.freeze({
  default: _aNumberValue$1
});

var _stringRepeat = createCommonjsModule(function (module) {
'use strict';
var toInteger = interopDefault(require$$2$5);
var defined = interopDefault(require$$4$3);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (;n > 0; (n >>>= 1) && (str += str)) if (n & 1) res += str;
  return res;
};
});

var _stringRepeat$1 = interopDefault(_stringRepeat);


var require$$1$13 = Object.freeze({
  default: _stringRepeat$1
});

var es6_number_toFixed = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var toInteger = interopDefault(require$$2$5);
var aNumberValue = interopDefault(require$$0$19);
var repeat = interopDefault(require$$1$13);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function (n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function (n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = (c % n) * 1e7;
  }
};
var numToString = function () {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  } return s;
};
var pow = function (x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function (x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  } return n;
};

$export($export.P + $export.F * (!!$toFixed && (
  0.00008.toFixed(3) !== '0.000' ||
  0.9.toFixed(0) !== '1' ||
  1.255.toFixed(2) !== '1.25' ||
  1000000000000000128.0.toFixed(0) !== '1000000000000000128'
) || !interopDefault(require$$1$1)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    } return m;
  }
});
});

interopDefault(es6_number_toFixed);

var es6_number_toPrecision = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var $fails = interopDefault(require$$1$1);
var aNumberValue = interopDefault(require$$0$19);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});
});

interopDefault(es6_number_toPrecision);

var es6_number_epsilon = createCommonjsModule(function (module) {
// 20.1.2.1 Number.EPSILON
var $export = interopDefault(require$$1$2);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });
});

interopDefault(es6_number_epsilon);

var es6_number_isFinite = createCommonjsModule(function (module) {
// 20.1.2.2 Number.isFinite(number)
var $export = interopDefault(require$$1$2);
var _isFinite = interopDefault(require$$3).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});
});

interopDefault(es6_number_isFinite);

var _isInteger = createCommonjsModule(function (module) {
// 20.1.2.3 Number.isInteger(number)
var isObject = interopDefault(require$$3$1);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};
});

var _isInteger$1 = interopDefault(_isInteger);


var require$$0$20 = Object.freeze({
  default: _isInteger$1
});

var es6_number_isInteger = createCommonjsModule(function (module) {
// 20.1.2.3 Number.isInteger(number)
var $export = interopDefault(require$$1$2);

$export($export.S, 'Number', { isInteger: interopDefault(require$$0$20) });
});

interopDefault(es6_number_isInteger);

var es6_number_isNan = createCommonjsModule(function (module) {
// 20.1.2.4 Number.isNaN(number)
var $export = interopDefault(require$$1$2);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});
});

interopDefault(es6_number_isNan);

var es6_number_isSafeInteger = createCommonjsModule(function (module) {
// 20.1.2.5 Number.isSafeInteger(number)
var $export = interopDefault(require$$1$2);
var isInteger = interopDefault(require$$0$20);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});
});

interopDefault(es6_number_isSafeInteger);

var es6_number_maxSafeInteger = createCommonjsModule(function (module) {
// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = interopDefault(require$$1$2);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });
});

interopDefault(es6_number_maxSafeInteger);

var es6_number_minSafeInteger = createCommonjsModule(function (module) {
// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = interopDefault(require$$1$2);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });
});

interopDefault(es6_number_minSafeInteger);

var es6_number_parseFloat = createCommonjsModule(function (module) {
var $export = interopDefault(require$$1$2);
var $parseFloat = interopDefault(require$$0$17);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });
});

interopDefault(es6_number_parseFloat);

var es6_number_parseInt = createCommonjsModule(function (module) {
var $export = interopDefault(require$$1$2);
var $parseInt = interopDefault(require$$0$14);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });
});

interopDefault(es6_number_parseInt);

var _mathLog1p = createCommonjsModule(function (module) {
// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};
});

var _mathLog1p$1 = interopDefault(_mathLog1p);


var require$$0$21 = Object.freeze({
  default: _mathLog1p$1
});

var es6_math_acosh = createCommonjsModule(function (module) {
// 20.2.2.3 Math.acosh(x)
var $export = interopDefault(require$$1$2);
var log1p = interopDefault(require$$0$21);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
  // V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
  && Math.floor($acosh(Number.MAX_VALUE)) == 710
  // Tor Browser bug: Math.acosh(Infinity) -> NaN
  && $acosh(Infinity) == Infinity
), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156
      ? Math.log(x) + Math.LN2
      : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});
});

interopDefault(es6_math_acosh);

var es6_math_asinh = createCommonjsModule(function (module) {
// 20.2.2.5 Math.asinh(x)
var $export = interopDefault(require$$1$2);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });
});

interopDefault(es6_math_asinh);

var es6_math_atanh = createCommonjsModule(function (module) {
// 20.2.2.7 Math.atanh(x)
var $export = interopDefault(require$$1$2);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});
});

interopDefault(es6_math_atanh);

var _mathSign = createCommonjsModule(function (module) {
// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};
});

var _mathSign$1 = interopDefault(_mathSign);


var require$$0$22 = Object.freeze({
  default: _mathSign$1
});

var es6_math_cbrt = createCommonjsModule(function (module) {
// 20.2.2.9 Math.cbrt(x)
var $export = interopDefault(require$$1$2);
var sign = interopDefault(require$$0$22);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});
});

interopDefault(es6_math_cbrt);

var es6_math_clz32 = createCommonjsModule(function (module) {
// 20.2.2.11 Math.clz32(x)
var $export = interopDefault(require$$1$2);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});
});

interopDefault(es6_math_clz32);

var es6_math_cosh = createCommonjsModule(function (module) {
// 20.2.2.12 Math.cosh(x)
var $export = interopDefault(require$$1$2);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});
});

interopDefault(es6_math_cosh);

var _mathExpm1 = createCommonjsModule(function (module) {
// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = (!$expm1
  // Old FF bug
  || $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
  // Tor Browser bug
  || $expm1(-2e-17) != -2e-17
) ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;
});

var _mathExpm1$1 = interopDefault(_mathExpm1);


var require$$0$23 = Object.freeze({
  default: _mathExpm1$1
});

var es6_math_expm1 = createCommonjsModule(function (module) {
// 20.2.2.14 Math.expm1(x)
var $export = interopDefault(require$$1$2);
var $expm1 = interopDefault(require$$0$23);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });
});

interopDefault(es6_math_expm1);

var _mathFround = createCommonjsModule(function (module) {
// 20.2.2.16 Math.fround(x)
var sign = interopDefault(require$$0$22);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function (n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};
});

var _mathFround$1 = interopDefault(_mathFround);


var require$$0$24 = Object.freeze({
  default: _mathFround$1
});

var es6_math_fround = createCommonjsModule(function (module) {
// 20.2.2.16 Math.fround(x)
var $export = interopDefault(require$$1$2);

$export($export.S, 'Math', { fround: interopDefault(require$$0$24) });
});

interopDefault(es6_math_fround);

var es6_math_hypot = createCommonjsModule(function (module) {
// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = interopDefault(require$$1$2);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) { // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});
});

interopDefault(es6_math_hypot);

var es6_math_imul = createCommonjsModule(function (module) {
// 20.2.2.18 Math.imul(x, y)
var $export = interopDefault(require$$1$2);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * interopDefault(require$$1$1)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});
});

interopDefault(es6_math_imul);

var es6_math_log10 = createCommonjsModule(function (module) {
// 20.2.2.21 Math.log10(x)
var $export = interopDefault(require$$1$2);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});
});

interopDefault(es6_math_log10);

var es6_math_log1p = createCommonjsModule(function (module) {
// 20.2.2.20 Math.log1p(x)
var $export = interopDefault(require$$1$2);

$export($export.S, 'Math', { log1p: interopDefault(require$$0$21) });
});

interopDefault(es6_math_log1p);

var es6_math_log2 = createCommonjsModule(function (module) {
// 20.2.2.22 Math.log2(x)
var $export = interopDefault(require$$1$2);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});
});

interopDefault(es6_math_log2);

var es6_math_sign = createCommonjsModule(function (module) {
// 20.2.2.28 Math.sign(x)
var $export = interopDefault(require$$1$2);

$export($export.S, 'Math', { sign: interopDefault(require$$0$22) });
});

interopDefault(es6_math_sign);

var es6_math_sinh = createCommonjsModule(function (module) {
// 20.2.2.30 Math.sinh(x)
var $export = interopDefault(require$$1$2);
var expm1 = interopDefault(require$$0$23);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * interopDefault(require$$1$1)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1
      ? (expm1(x) - expm1(-x)) / 2
      : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});
});

interopDefault(es6_math_sinh);

var es6_math_tanh = createCommonjsModule(function (module) {
// 20.2.2.33 Math.tanh(x)
var $export = interopDefault(require$$1$2);
var expm1 = interopDefault(require$$0$23);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});
});

interopDefault(es6_math_tanh);

var es6_math_trunc = createCommonjsModule(function (module) {
// 20.2.2.34 Math.trunc(x)
var $export = interopDefault(require$$1$2);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});
});

interopDefault(es6_math_trunc);

var es6_string_fromCodePoint = createCommonjsModule(function (module) {
var $export = interopDefault(require$$1$2);
var toAbsoluteIndex = interopDefault(require$$23);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) { // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000
        ? fromCharCode(code)
        : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
      );
    } return res.join('');
  }
});
});

interopDefault(es6_string_fromCodePoint);

var es6_string_raw = createCommonjsModule(function (module) {
var $export = interopDefault(require$$1$2);
var toIObject = interopDefault(require$$1$8);
var toLength = interopDefault(require$$3$2);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    } return res.join('');
  }
});
});

interopDefault(es6_string_raw);

var es6_string_trim = createCommonjsModule(function (module) {
'use strict';
// 21.1.3.25 String.prototype.trim()
interopDefault(require$$0$15)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});
});

interopDefault(es6_string_trim);

var _stringAt = createCommonjsModule(function (module) {
var toInteger = interopDefault(require$$2$5);
var defined = interopDefault(require$$4$3);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
});

var _stringAt$1 = interopDefault(_stringAt);


var require$$0$25 = Object.freeze({
  default: _stringAt$1
});

var _iterators = createCommonjsModule(function (module) {
module.exports = {};
});

var _iterators$1 = interopDefault(_iterators);


var require$$1$14 = Object.freeze({
	default: _iterators$1
});

var _iterCreate = createCommonjsModule(function (module) {
'use strict';
var create = interopDefault(require$$6$1);
var descriptor = interopDefault(require$$2$3);
var setToStringTag = interopDefault(require$$0$1);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
interopDefault(require$$2)(IteratorPrototype, interopDefault(require$$0$2)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};
});

var _iterCreate$1 = interopDefault(_iterCreate);


var require$$0$26 = Object.freeze({
  default: _iterCreate$1
});

var _iterDefine = createCommonjsModule(function (module) {
'use strict';
var LIBRARY = interopDefault(require$$2$4);
var $export = interopDefault(require$$1$2);
var redefine = interopDefault(require$$4$2);
var hide = interopDefault(require$$2);
var has = interopDefault(require$$4);
var Iterators = interopDefault(require$$1$14);
var $iterCreate = interopDefault(require$$0$26);
var setToStringTag = interopDefault(require$$0$1);
var getPrototypeOf = interopDefault(require$$0$11);
var ITERATOR = interopDefault(require$$0$2)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
});

var _iterDefine$1 = interopDefault(_iterDefine);


var require$$5$4 = Object.freeze({
  default: _iterDefine$1
});

var es6_string_iterator = createCommonjsModule(function (module) {
'use strict';
var $at = interopDefault(require$$0$25)(true);

// 21.1.3.27 String.prototype[@@iterator]()
interopDefault(require$$5$4)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});
});

interopDefault(es6_string_iterator);

var es6_string_codePointAt = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var $at = interopDefault(require$$0$25)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});
});

interopDefault(es6_string_codePointAt);

var _isRegexp = createCommonjsModule(function (module) {
// 7.2.8 IsRegExp(argument)
var isObject = interopDefault(require$$3$1);
var cof = interopDefault(require$$0$4);
var MATCH = interopDefault(require$$0$2)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};
});

var _isRegexp$1 = interopDefault(_isRegexp);


var require$$2$8 = Object.freeze({
  default: _isRegexp$1
});

var _stringContext = createCommonjsModule(function (module) {
// helper for String#{startsWith, endsWith, includes}
var isRegExp = interopDefault(require$$2$8);
var defined = interopDefault(require$$4$3);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};
});

var _stringContext$1 = interopDefault(_stringContext);


var require$$1$15 = Object.freeze({
  default: _stringContext$1
});

var _failsIsRegexp = createCommonjsModule(function (module) {
var MATCH = interopDefault(require$$0$2)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};
});

var _failsIsRegexp$1 = interopDefault(_failsIsRegexp);


var require$$0$27 = Object.freeze({
  default: _failsIsRegexp$1
});

var es6_string_endsWith = createCommonjsModule(function (module) {
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
'use strict';
var $export = interopDefault(require$$1$2);
var toLength = interopDefault(require$$3$2);
var context = interopDefault(require$$1$15);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * interopDefault(require$$0$27)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith
      ? $endsWith.call(that, search, end)
      : that.slice(end - search.length, end) === search;
  }
});
});

interopDefault(es6_string_endsWith);

var es6_string_includes = createCommonjsModule(function (module) {
// 21.1.3.7 String.prototype.includes(searchString, position = 0)
'use strict';
var $export = interopDefault(require$$1$2);
var context = interopDefault(require$$1$15);
var INCLUDES = 'includes';

$export($export.P + $export.F * interopDefault(require$$0$27)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});
});

interopDefault(es6_string_includes);

var es6_string_repeat = createCommonjsModule(function (module) {
var $export = interopDefault(require$$1$2);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: interopDefault(require$$1$13)
});
});

interopDefault(es6_string_repeat);

var es6_string_startsWith = createCommonjsModule(function (module) {
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])
'use strict';
var $export = interopDefault(require$$1$2);
var toLength = interopDefault(require$$3$2);
var context = interopDefault(require$$1$15);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * interopDefault(require$$0$27)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});
});

interopDefault(es6_string_startsWith);

var _stringHtml = createCommonjsModule(function (module) {
var $export = interopDefault(require$$1$2);
var fails = interopDefault(require$$1$1);
var defined = interopDefault(require$$4$3);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function (string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};
});

var _stringHtml$1 = interopDefault(_stringHtml);


var require$$0$28 = Object.freeze({
  default: _stringHtml$1
});

var es6_string_anchor = createCommonjsModule(function (module) {
'use strict';
// B.2.3.2 String.prototype.anchor(name)
interopDefault(require$$0$28)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});
});

interopDefault(es6_string_anchor);

var es6_string_big = createCommonjsModule(function (module) {
'use strict';
// B.2.3.3 String.prototype.big()
interopDefault(require$$0$28)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});
});

interopDefault(es6_string_big);

var es6_string_blink = createCommonjsModule(function (module) {
'use strict';
// B.2.3.4 String.prototype.blink()
interopDefault(require$$0$28)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});
});

interopDefault(es6_string_blink);

var es6_string_bold = createCommonjsModule(function (module) {
'use strict';
// B.2.3.5 String.prototype.bold()
interopDefault(require$$0$28)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});
});

interopDefault(es6_string_bold);

var es6_string_fixed = createCommonjsModule(function (module) {
'use strict';
// B.2.3.6 String.prototype.fixed()
interopDefault(require$$0$28)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});
});

interopDefault(es6_string_fixed);

var es6_string_fontcolor = createCommonjsModule(function (module) {
'use strict';
// B.2.3.7 String.prototype.fontcolor(color)
interopDefault(require$$0$28)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});
});

interopDefault(es6_string_fontcolor);

var es6_string_fontsize = createCommonjsModule(function (module) {
'use strict';
// B.2.3.8 String.prototype.fontsize(size)
interopDefault(require$$0$28)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});
});

interopDefault(es6_string_fontsize);

var es6_string_italics = createCommonjsModule(function (module) {
'use strict';
// B.2.3.9 String.prototype.italics()
interopDefault(require$$0$28)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});
});

interopDefault(es6_string_italics);

var es6_string_link = createCommonjsModule(function (module) {
'use strict';
// B.2.3.10 String.prototype.link(url)
interopDefault(require$$0$28)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});
});

interopDefault(es6_string_link);

var es6_string_small = createCommonjsModule(function (module) {
'use strict';
// B.2.3.11 String.prototype.small()
interopDefault(require$$0$28)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});
});

interopDefault(es6_string_small);

var es6_string_strike = createCommonjsModule(function (module) {
'use strict';
// B.2.3.12 String.prototype.strike()
interopDefault(require$$0$28)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});
});

interopDefault(es6_string_strike);

var es6_string_sub = createCommonjsModule(function (module) {
'use strict';
// B.2.3.13 String.prototype.sub()
interopDefault(require$$0$28)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});
});

interopDefault(es6_string_sub);

var es6_string_sup = createCommonjsModule(function (module) {
'use strict';
// B.2.3.14 String.prototype.sup()
interopDefault(require$$0$28)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});
});

interopDefault(es6_string_sup);

var es6_date_now = createCommonjsModule(function (module) {
// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = interopDefault(require$$1$2);

$export($export.S, 'Date', { now: function () { return new Date().getTime(); } });
});

interopDefault(es6_date_now);

var es6_date_toJson = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var toObject = interopDefault(require$$5$2);
var toPrimitive = interopDefault(require$$4$1);

$export($export.P + $export.F * interopDefault(require$$1$1)(function () {
  return new Date(NaN).toJSON() !== null
    || Date.prototype.toJSON.call({ toISOString: function () { return 1; } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});
});

interopDefault(es6_date_toJson);

var _dateToIsoString = createCommonjsModule(function (module) {
'use strict';
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var fails = interopDefault(require$$1$1);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function (num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = (fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
})) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) +
    '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) +
    'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) +
    ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;
});

var _dateToIsoString$1 = interopDefault(_dateToIsoString);


var require$$0$29 = Object.freeze({
  default: _dateToIsoString$1
});

var es6_date_toIsoString = createCommonjsModule(function (module) {
// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = interopDefault(require$$1$2);
var toISOString = interopDefault(require$$0$29);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});
});

interopDefault(es6_date_toIsoString);

var es6_date_toString = createCommonjsModule(function (module) {
var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  interopDefault(require$$4$2)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}
});

interopDefault(es6_date_toString);

var _dateToPrimitive = createCommonjsModule(function (module) {
'use strict';
var anObject = interopDefault(require$$5);
var toPrimitive = interopDefault(require$$4$1);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};
});

var _dateToPrimitive$1 = interopDefault(_dateToPrimitive);


var require$$0$30 = Object.freeze({
  default: _dateToPrimitive$1
});

var es6_date_toPrimitive = createCommonjsModule(function (module) {
var TO_PRIMITIVE = interopDefault(require$$0$2)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) interopDefault(require$$2)(proto, TO_PRIMITIVE, interopDefault(require$$0$30));
});

interopDefault(es6_date_toPrimitive);

var es6_array_isArray = createCommonjsModule(function (module) {
// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = interopDefault(require$$1$2);

$export($export.S, 'Array', { isArray: interopDefault(require$$4$4) });
});

interopDefault(es6_array_isArray);

var _iterCall = createCommonjsModule(function (module) {
// call something on iterator step with safe closing on error
var anObject = interopDefault(require$$5);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};
});

var _iterCall$1 = interopDefault(_iterCall);


var require$$4$6 = Object.freeze({
  default: _iterCall$1
});

var _isArrayIter = createCommonjsModule(function (module) {
// check on default Array iterator
var Iterators = interopDefault(require$$1$14);
var ITERATOR = interopDefault(require$$0$2)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
});

var _isArrayIter$1 = interopDefault(_isArrayIter);


var require$$17 = Object.freeze({
  default: _isArrayIter$1
});

var _createProperty = createCommonjsModule(function (module) {
'use strict';
var $defineProperty = interopDefault(require$$2$1);
var createDesc = interopDefault(require$$2$3);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};
});

var _createProperty$1 = interopDefault(_createProperty);


var require$$0$31 = Object.freeze({
  default: _createProperty$1
});

var core_getIteratorMethod = createCommonjsModule(function (module) {
var classof = interopDefault(require$$1$11);
var ITERATOR = interopDefault(require$$0$2)('iterator');
var Iterators = interopDefault(require$$1$14);
module.exports = interopDefault(require$$0).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
});

var core_getIteratorMethod$1 = interopDefault(core_getIteratorMethod);


var require$$13 = Object.freeze({
  default: core_getIteratorMethod$1
});

var _iterDetect = createCommonjsModule(function (module) {
var ITERATOR = interopDefault(require$$0$2)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};
});

var _iterDetect$1 = interopDefault(_iterDetect);


var require$$5$5 = Object.freeze({
  default: _iterDetect$1
});

var es6_array_from = createCommonjsModule(function (module) {
'use strict';
var ctx = interopDefault(require$$1$4);
var $export = interopDefault(require$$1$2);
var toObject = interopDefault(require$$5$2);
var call = interopDefault(require$$4$6);
var isArrayIter = interopDefault(require$$17);
var toLength = interopDefault(require$$3$2);
var createProperty = interopDefault(require$$0$31);
var getIterFn = interopDefault(require$$13);

$export($export.S + $export.F * !interopDefault(require$$5$5)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});
});

interopDefault(es6_array_from);

var es6_array_of = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var createProperty = interopDefault(require$$0$31);

// WebKit Array.of isn't generic
$export($export.S + $export.F * interopDefault(require$$1$1)(function () {
  function F() { /* empty */ }
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of(/* ...args */) {
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) createProperty(result, index, arguments[index++]);
    result.length = aLen;
    return result;
  }
});
});

interopDefault(es6_array_of);

var _strictMethod = createCommonjsModule(function (module) {
'use strict';
var fails = interopDefault(require$$1$1);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};
});

var _strictMethod$1 = interopDefault(_strictMethod);


var require$$0$32 = Object.freeze({
  default: _strictMethod$1
});

var es6_array_join = createCommonjsModule(function (module) {
'use strict';
// 22.1.3.13 Array.prototype.join(separator)
var $export = interopDefault(require$$1$2);
var toIObject = interopDefault(require$$1$8);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (interopDefault(require$$1$9) != Object || !interopDefault(require$$0$32)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});
});

interopDefault(es6_array_join);

var es6_array_slice = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var html = interopDefault(require$$3$3);
var cof = interopDefault(require$$0$4);
var toAbsoluteIndex = interopDefault(require$$23);
var toLength = interopDefault(require$$3$2);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * interopDefault(require$$1$1)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = Array(size);
    var i = 0;
    for (; i < size; i++) cloned[i] = klass == 'String'
      ? this.charAt(start + i)
      : this[start + i];
    return cloned;
  }
});
});

interopDefault(es6_array_slice);

var es6_array_sort = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var aFunction = interopDefault(require$$6);
var toObject = interopDefault(require$$5$2);
var fails = interopDefault(require$$1$1);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !interopDefault(require$$0$32)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});
});

interopDefault(es6_array_sort);

var _arraySpeciesConstructor = createCommonjsModule(function (module) {
var isObject = interopDefault(require$$3$1);
var isArray = interopDefault(require$$4$4);
var SPECIES = interopDefault(require$$0$2)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};
});

var _arraySpeciesConstructor$1 = interopDefault(_arraySpeciesConstructor);


var require$$0$33 = Object.freeze({
  default: _arraySpeciesConstructor$1
});

var _arraySpeciesCreate = createCommonjsModule(function (module) {
// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = interopDefault(require$$0$33);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};
});

var _arraySpeciesCreate$1 = interopDefault(_arraySpeciesCreate);


var require$$1$16 = Object.freeze({
  default: _arraySpeciesCreate$1
});

var _arrayMethods = createCommonjsModule(function (module) {
// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = interopDefault(require$$1$4);
var IObject = interopDefault(require$$1$9);
var toObject = interopDefault(require$$5$2);
var toLength = interopDefault(require$$3$2);
var asc = interopDefault(require$$1$16);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};
});

var _arrayMethods$1 = interopDefault(_arrayMethods);


var require$$10 = Object.freeze({
  default: _arrayMethods$1
});

var es6_array_forEach = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var $forEach = interopDefault(require$$10)(0);
var STRICT = interopDefault(require$$0$32)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});
});

interopDefault(es6_array_forEach);

var es6_array_map = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var $map = interopDefault(require$$10)(1);

$export($export.P + $export.F * !interopDefault(require$$0$32)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});
});

interopDefault(es6_array_map);

var es6_array_filter = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var $filter = interopDefault(require$$10)(2);

$export($export.P + $export.F * !interopDefault(require$$0$32)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});
});

interopDefault(es6_array_filter);

var es6_array_some = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var $some = interopDefault(require$$10)(3);

$export($export.P + $export.F * !interopDefault(require$$0$32)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});
});

interopDefault(es6_array_some);

var es6_array_every = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var $every = interopDefault(require$$10)(4);

$export($export.P + $export.F * !interopDefault(require$$0$32)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});
});

interopDefault(es6_array_every);

var _arrayReduce = createCommonjsModule(function (module) {
var aFunction = interopDefault(require$$6);
var toObject = interopDefault(require$$5$2);
var IObject = interopDefault(require$$1$9);
var toLength = interopDefault(require$$3$2);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (;isRight ? index >= 0 : length > index; index += i) if (index in self) {
    memo = callbackfn(memo, self[index], index, O);
  }
  return memo;
};
});

var _arrayReduce$1 = interopDefault(_arrayReduce);


var require$$1$17 = Object.freeze({
  default: _arrayReduce$1
});

var es6_array_reduce = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var $reduce = interopDefault(require$$1$17);

$export($export.P + $export.F * !interopDefault(require$$0$32)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});
});

interopDefault(es6_array_reduce);

var es6_array_reduceRight = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var $reduce = interopDefault(require$$1$17);

$export($export.P + $export.F * !interopDefault(require$$0$32)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});
});

interopDefault(es6_array_reduceRight);

var es6_array_indexOf = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var $indexOf = interopDefault(require$$1$10)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !interopDefault(require$$0$32)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
      // convert -0 to +0
      ? $native.apply(this, arguments) || 0
      : $indexOf(this, searchElement, arguments[1]);
  }
});
});

interopDefault(es6_array_indexOf);

var es6_array_lastIndexOf = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var toIObject = interopDefault(require$$1$8);
var toInteger = interopDefault(require$$2$5);
var toLength = interopDefault(require$$3$2);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !interopDefault(require$$0$32)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (;index >= 0; index--) if (index in O) if (O[index] === searchElement) return index || 0;
    return -1;
  }
});
});

interopDefault(es6_array_lastIndexOf);

var _arrayCopyWithin = createCommonjsModule(function (module) {
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
'use strict';
var toObject = interopDefault(require$$5$2);
var toAbsoluteIndex = interopDefault(require$$23);
var toLength = interopDefault(require$$3$2);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};
});

var _arrayCopyWithin$1 = interopDefault(_arrayCopyWithin);


var require$$2$9 = Object.freeze({
  default: _arrayCopyWithin$1
});

var _addToUnscopables = createCommonjsModule(function (module) {
// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = interopDefault(require$$0$2)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) interopDefault(require$$2)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};
});

var _addToUnscopables$1 = interopDefault(_addToUnscopables);


var require$$0$34 = Object.freeze({
  default: _addToUnscopables$1
});

var es6_array_copyWithin = createCommonjsModule(function (module) {
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = interopDefault(require$$1$2);

$export($export.P, 'Array', { copyWithin: interopDefault(require$$2$9) });

interopDefault(require$$0$34)('copyWithin');
});

interopDefault(es6_array_copyWithin);

var _arrayFill = createCommonjsModule(function (module) {
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
'use strict';
var toObject = interopDefault(require$$5$2);
var toAbsoluteIndex = interopDefault(require$$23);
var toLength = interopDefault(require$$3$2);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};
});

var _arrayFill$1 = interopDefault(_arrayFill);


var require$$3$5 = Object.freeze({
  default: _arrayFill$1
});

var es6_array_fill = createCommonjsModule(function (module) {
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = interopDefault(require$$1$2);

$export($export.P, 'Array', { fill: interopDefault(require$$3$5) });

interopDefault(require$$0$34)('fill');
});

interopDefault(es6_array_fill);

var es6_array_find = createCommonjsModule(function (module) {
'use strict';
// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = interopDefault(require$$1$2);
var $find = interopDefault(require$$10)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
interopDefault(require$$0$34)(KEY);
});

interopDefault(es6_array_find);

var es6_array_findIndex = createCommonjsModule(function (module) {
'use strict';
// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = interopDefault(require$$1$2);
var $find = interopDefault(require$$10)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
interopDefault(require$$0$34)(KEY);
});

interopDefault(es6_array_findIndex);

var _setSpecies = createCommonjsModule(function (module) {
'use strict';
var global = interopDefault(require$$3);
var dP = interopDefault(require$$2$1);
var DESCRIPTORS = interopDefault(require$$1);
var SPECIES = interopDefault(require$$0$2)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};
});

var _setSpecies$1 = interopDefault(_setSpecies);


var require$$0$35 = Object.freeze({
  default: _setSpecies$1
});

var es6_array_species = createCommonjsModule(function (module) {
interopDefault(require$$0$35)('Array');
});

interopDefault(es6_array_species);

var _iterStep = createCommonjsModule(function (module) {
module.exports = function (done, value) {
  return { value: value, done: !!done };
};
});

var _iterStep$1 = interopDefault(_iterStep);


var require$$4$7 = Object.freeze({
  default: _iterStep$1
});

var es6_array_iterator = createCommonjsModule(function (module) {
'use strict';
var addToUnscopables = interopDefault(require$$0$34);
var step = interopDefault(require$$4$7);
var Iterators = interopDefault(require$$1$14);
var toIObject = interopDefault(require$$1$8);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = interopDefault(require$$5$4)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
});

var es6_array_iterator$1 = interopDefault(es6_array_iterator);


var require$$6$2 = Object.freeze({
  default: es6_array_iterator$1
});

var _flags = createCommonjsModule(function (module) {
'use strict';
// 21.2.5.3 get RegExp.prototype.flags
var anObject = interopDefault(require$$5);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};
});

var _flags$1 = interopDefault(_flags);


var require$$1$18 = Object.freeze({
  default: _flags$1
});

var es6_regexp_constructor = createCommonjsModule(function (module) {
var global = interopDefault(require$$3);
var inheritIfRequired = interopDefault(require$$0$18);
var dP = interopDefault(require$$2$1).f;
var gOPN = interopDefault(require$$3$4).f;
var isRegExp = interopDefault(require$$2$8);
var $flags = interopDefault(require$$1$18);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (interopDefault(require$$1) && (!CORRECT_NEW || interopDefault(require$$1$1)(function () {
  re2[interopDefault(require$$0$2)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
      : inheritIfRequired(CORRECT_NEW
        ? new Base(piRE && !fiU ? p.source : p, f)
        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f)
      , tiRE ? this : proto, $RegExp);
  };
  var proxy = function (key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function () { return Base[key]; },
      set: function (it) { Base[key] = it; }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) proxy(keys[i++]);
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  interopDefault(require$$4$2)(global, 'RegExp', $RegExp);
}

interopDefault(require$$0$35)('RegExp');
});

interopDefault(es6_regexp_constructor);

var es6_regexp_flags = createCommonjsModule(function (module) {
// 21.2.5.3 get RegExp.prototype.flags()
if (interopDefault(require$$1) && /./g.flags != 'g') interopDefault(require$$2$1).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: interopDefault(require$$1$18)
});
});

interopDefault(es6_regexp_flags);

var es6_regexp_toString = createCommonjsModule(function (module) {
'use strict';

var anObject = interopDefault(require$$5);
var $flags = interopDefault(require$$1$18);
var DESCRIPTORS = interopDefault(require$$1);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  interopDefault(require$$4$2)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (interopDefault(require$$1$1)(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}
});

interopDefault(es6_regexp_toString);

var _fixReWks = createCommonjsModule(function (module) {
'use strict';
var hide = interopDefault(require$$2);
var redefine = interopDefault(require$$4$2);
var fails = interopDefault(require$$1$1);
var defined = interopDefault(require$$4$3);
var wks = interopDefault(require$$0$2);

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};
});

var _fixReWks$1 = interopDefault(_fixReWks);


var require$$1$19 = Object.freeze({
  default: _fixReWks$1
});

var es6_regexp_match = createCommonjsModule(function (module) {
// @@match logic
interopDefault(require$$1$19)('match', 1, function (defined, MATCH, $match) {
  // 21.1.3.11 String.prototype.match(regexp)
  return [function match(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  }, $match];
});
});

interopDefault(es6_regexp_match);

var es6_regexp_replace = createCommonjsModule(function (module) {
// @@replace logic
interopDefault(require$$1$19)('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});
});

interopDefault(es6_regexp_replace);

var es6_regexp_search = createCommonjsModule(function (module) {
// @@search logic
interopDefault(require$$1$19)('search', 1, function (defined, SEARCH, $search) {
  // 21.1.3.15 String.prototype.search(regexp)
  return [function search(regexp) {
    'use strict';
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  }, $search];
});
});

interopDefault(es6_regexp_search);

var es6_regexp_split = createCommonjsModule(function (module) {
// @@split logic
interopDefault(require$$1$19)('split', 2, function (defined, SPLIT, $split) {
  'use strict';
  var isRegExp = interopDefault(require$$2$8);
  var _split = $split;
  var $push = [].push;
  var $SPLIT = 'split';
  var LENGTH = 'length';
  var LAST_INDEX = 'lastIndex';
  if (
    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
    ''[$SPLIT](/.?/)[LENGTH]
  ) {
    var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
    // based on es5-shim implementation, need to rework it
    $split = function (separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return _split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var separator2, match, lastIndex, lastLength, i;
      // Doesn't need flags gy, but they don't hurt
      if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
      while (match = separatorCopy.exec(string)) {
        // `separatorCopy.lastIndex` is not reliable cross-browser
        lastIndex = match.index + match[0][LENGTH];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
          // eslint-disable-next-line no-loop-func
          if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
            for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
          });
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
  // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    $split = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
    };
  }
  // 21.1.3.17 String.prototype.split(separator, limit)
  return [function split(separator, limit) {
    var O = defined(this);
    var fn = separator == undefined ? undefined : separator[SPLIT];
    return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
  }, $split];
});
});

interopDefault(es6_regexp_split);

var _anInstance = createCommonjsModule(function (module) {
module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};
});

var _anInstance$1 = interopDefault(_anInstance);


var require$$4$8 = Object.freeze({
  default: _anInstance$1
});

var _forOf = createCommonjsModule(function (module) {
var ctx = interopDefault(require$$1$4);
var call = interopDefault(require$$4$6);
var isArrayIter = interopDefault(require$$17);
var anObject = interopDefault(require$$5);
var toLength = interopDefault(require$$3$2);
var getIterFn = interopDefault(require$$13);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;
});

var _forOf$1 = interopDefault(_forOf);


var require$$1$20 = Object.freeze({
  default: _forOf$1
});

var _speciesConstructor = createCommonjsModule(function (module) {
// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = interopDefault(require$$5);
var aFunction = interopDefault(require$$6);
var SPECIES = interopDefault(require$$0$2)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};
});

var _speciesConstructor$1 = interopDefault(_speciesConstructor);


var require$$1$21 = Object.freeze({
  default: _speciesConstructor$1
});

var _task = createCommonjsModule(function (module) {
var ctx = interopDefault(require$$1$4);
var invoke = interopDefault(require$$4$5);
var html = interopDefault(require$$3$3);
var cel = interopDefault(require$$2$2);
var global = interopDefault(require$$3);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (interopDefault(require$$0$4)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};
});

var _task$1 = interopDefault(_task);
var set$1 = _task.set;
var clear = _task.clear;

var require$$0$36 = Object.freeze({
  default: _task$1,
  set: set$1,
  clear: clear
});

var _microtask = createCommonjsModule(function (module) {
var global = interopDefault(require$$3);
var macrotask = interopDefault(require$$0$36).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = interopDefault(require$$0$4)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver
  } else if (Observer) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    var promise = Promise.resolve();
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};
});

var _microtask$1 = interopDefault(_microtask);


var require$$8 = Object.freeze({
  default: _microtask$1
});

var _newPromiseCapability = createCommonjsModule(function (module) {
'use strict';
// 25.4.1.5 NewPromiseCapability(C)
var aFunction = interopDefault(require$$6);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};
});

var _newPromiseCapability$1 = interopDefault(_newPromiseCapability);
var f$7 = _newPromiseCapability.f;

var require$$1$22 = Object.freeze({
  default: _newPromiseCapability$1,
  f: f$7
});

var _perform = createCommonjsModule(function (module) {
module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};
});

var _perform$1 = interopDefault(_perform);


var require$$0$37 = Object.freeze({
  default: _perform$1
});

var _promiseResolve = createCommonjsModule(function (module) {
var anObject = interopDefault(require$$5);
var isObject = interopDefault(require$$3$1);
var newPromiseCapability = interopDefault(require$$1$22);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};
});

var _promiseResolve$1 = interopDefault(_promiseResolve);


var require$$0$38 = Object.freeze({
  default: _promiseResolve$1
});

var _redefineAll = createCommonjsModule(function (module) {
var redefine = interopDefault(require$$4$2);
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};
});

var _redefineAll$1 = interopDefault(_redefineAll);


var require$$3$6 = Object.freeze({
  default: _redefineAll$1
});

var es6_promise = createCommonjsModule(function (module) {
'use strict';
var LIBRARY = interopDefault(require$$2$4);
var global = interopDefault(require$$3);
var ctx = interopDefault(require$$1$4);
var classof = interopDefault(require$$1$11);
var $export = interopDefault(require$$1$2);
var isObject = interopDefault(require$$3$1);
var aFunction = interopDefault(require$$6);
var anInstance = interopDefault(require$$4$8);
var forOf = interopDefault(require$$1$20);
var speciesConstructor = interopDefault(require$$1$21);
var task = interopDefault(require$$0$36).set;
var microtask = interopDefault(require$$8)();
var newPromiseCapabilityModule = interopDefault(require$$1$22);
var perform = interopDefault(require$$0$37);
var promiseResolve = interopDefault(require$$0$38);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[interopDefault(require$$0$2)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value);
            if (domain) domain.exit();
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  if (promise._h == 1) return false;
  var chain = promise._a || promise._c;
  var i = 0;
  var reaction;
  while (chain.length > i) {
    reaction = chain[i++];
    if (reaction.fail || !isUnhandled(reaction.promise)) return false;
  } return true;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = interopDefault(require$$3$6)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
interopDefault(require$$0$1)($Promise, PROMISE);
interopDefault(require$$0$35)(PROMISE);
Wrapper = interopDefault(require$$0)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && interopDefault(require$$5$5)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});
});

interopDefault(es6_promise);

var _validateCollection = createCommonjsModule(function (module) {
var isObject = interopDefault(require$$3$1);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};
});

var _validateCollection$1 = interopDefault(_validateCollection);


var require$$1$23 = Object.freeze({
  default: _validateCollection$1
});

var _collectionStrong = createCommonjsModule(function (module) {
'use strict';
var dP = interopDefault(require$$2$1).f;
var create = interopDefault(require$$6$1);
var redefineAll = interopDefault(require$$3$6);
var ctx = interopDefault(require$$1$4);
var anInstance = interopDefault(require$$4$8);
var forOf = interopDefault(require$$1$20);
var $iterDefine = interopDefault(require$$5$4);
var step = interopDefault(require$$4$7);
var setSpecies = interopDefault(require$$0$35);
var DESCRIPTORS = interopDefault(require$$1);
var fastKey = interopDefault(require$$7).fastKey;
var validate = interopDefault(require$$1$23);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};
});

var _collectionStrong$1 = interopDefault(_collectionStrong);
var getConstructor = _collectionStrong.getConstructor;
var def = _collectionStrong.def;
var getEntry = _collectionStrong.getEntry;
var setStrong = _collectionStrong.setStrong;

var require$$2$10 = Object.freeze({
  default: _collectionStrong$1,
  getConstructor: getConstructor,
  def: def,
  getEntry: getEntry,
  setStrong: setStrong
});

var _collection = createCommonjsModule(function (module) {
'use strict';
var global = interopDefault(require$$3);
var $export = interopDefault(require$$1$2);
var redefine = interopDefault(require$$4$2);
var redefineAll = interopDefault(require$$3$6);
var meta = interopDefault(require$$7);
var forOf = interopDefault(require$$1$20);
var anInstance = interopDefault(require$$4$8);
var isObject = interopDefault(require$$3$1);
var fails = interopDefault(require$$1$1);
var $iterDetect = interopDefault(require$$5$5);
var setToStringTag = interopDefault(require$$0$1);
var inheritIfRequired = interopDefault(require$$0$18);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function (KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY,
      KEY == 'delete' ? function (a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'has' ? function has(a) {
        return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'get' ? function get(a) {
        return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
      } : KEY == 'add' ? function add(a) { fn.call(this, a === 0 ? 0 : a); return this; }
        : function set(a, b) { fn.call(this, a === 0 ? 0 : a, b); return this; }
    );
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) { new C(iter); }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) $instance[ADDER](index, index);
      return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};
});

var _collection$1 = interopDefault(_collection);


var require$$0$39 = Object.freeze({
  default: _collection$1
});

var es6_map = createCommonjsModule(function (module) {
'use strict';
var strong = interopDefault(require$$2$10);
var validate = interopDefault(require$$1$23);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = interopDefault(require$$0$39)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);
});

var es6_map$1 = interopDefault(es6_map);


var require$$3$7 = Object.freeze({
  default: es6_map$1
});

var es6_set = createCommonjsModule(function (module) {
'use strict';
var strong = interopDefault(require$$2$10);
var validate = interopDefault(require$$1$23);
var SET = 'Set';

// 23.2 Set Objects
module.exports = interopDefault(require$$0$39)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);
});

var es6_set$1 = interopDefault(es6_set);


var require$$4$9 = Object.freeze({
  default: es6_set$1
});

var _collectionWeak = createCommonjsModule(function (module) {
'use strict';
var redefineAll = interopDefault(require$$3$6);
var getWeak = interopDefault(require$$7).getWeak;
var anObject = interopDefault(require$$5);
var isObject = interopDefault(require$$3$1);
var anInstance = interopDefault(require$$4$8);
var forOf = interopDefault(require$$1$20);
var createArrayMethod = interopDefault(require$$10);
var $has = interopDefault(require$$4);
var validate = interopDefault(require$$1$23);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function (that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
  this.a = [];
};
var findUncaughtFrozen = function (store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function (key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function (key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function (key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;
    else this.a.push([key, value]);
  },
  'delete': function (key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;      // collection type
      that._i = id++;      // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function (key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);
    else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};
});

var _collectionWeak$1 = interopDefault(_collectionWeak);
var getConstructor$1 = _collectionWeak.getConstructor;
var def$1 = _collectionWeak.def;
var ufstore = _collectionWeak.ufstore;

var require$$2$11 = Object.freeze({
  default: _collectionWeak$1,
  getConstructor: getConstructor$1,
  def: def$1,
  ufstore: ufstore
});

var es6_weakMap = createCommonjsModule(function (module) {
'use strict';
var each = interopDefault(require$$10)(0);
var redefine = interopDefault(require$$4$2);
var meta = interopDefault(require$$7);
var assign = interopDefault(require$$5$3);
var weak = interopDefault(require$$2$11);
var isObject = interopDefault(require$$3$1);
var fails = interopDefault(require$$1$1);
var validate = interopDefault(require$$1$23);
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var tmp = {};
var InternalMap;

var wrapper = function (get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = interopDefault(require$$0$39)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (fails(function () { return new $WeakMap().set((Object.freeze || Object)(tmp), 7).get(tmp) != 7; })) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
      // store all the rest on native weakmap
      } return method.call(this, a, b);
    });
  });
}
});

var es6_weakMap$1 = interopDefault(es6_weakMap);


var require$$0$40 = Object.freeze({
  default: es6_weakMap$1
});

var es6_weakSet = createCommonjsModule(function (module) {
'use strict';
var weak = interopDefault(require$$2$11);
var validate = interopDefault(require$$1$23);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
interopDefault(require$$0$39)(WEAK_SET, function (get) {
  return function WeakSet() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);
});

interopDefault(es6_weakSet);

var _typed = createCommonjsModule(function (module) {
var global = interopDefault(require$$3);
var hide = interopDefault(require$$2);
var uid = interopDefault(require$$12);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};
});

var _typed$1 = interopDefault(_typed);
var ABV = _typed.ABV;
var CONSTR = _typed.CONSTR;
var TYPED = _typed.TYPED;
var VIEW = _typed.VIEW;

var require$$33 = Object.freeze({
  default: _typed$1,
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
});

var _toIndex = createCommonjsModule(function (module) {
// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = interopDefault(require$$2$5);
var toLength = interopDefault(require$$3$2);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};
});

var _toIndex$1 = interopDefault(_toIndex);


var require$$24 = Object.freeze({
  default: _toIndex$1
});

var _typedBuffer = createCommonjsModule(function (module, exports) {
'use strict';
var global = interopDefault(require$$3);
var DESCRIPTORS = interopDefault(require$$1);
var LIBRARY = interopDefault(require$$2$4);
var $typed = interopDefault(require$$33);
var hide = interopDefault(require$$2);
var redefineAll = interopDefault(require$$3$6);
var fails = interopDefault(require$$1$1);
var anInstance = interopDefault(require$$4$8);
var toInteger = interopDefault(require$$2$5);
var toLength = interopDefault(require$$3$2);
var toIndex = interopDefault(require$$24);
var gOPN = interopDefault(require$$3$4).f;
var dP = interopDefault(require$$2$1).f;
var arrayFill = interopDefault(require$$3$5);
var setToStringTag = interopDefault(require$$0$1);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;
});

var _typedBuffer$1 = interopDefault(_typedBuffer);


var require$$32 = Object.freeze({
  default: _typedBuffer$1
});

var es6_typed_arrayBuffer = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var $typed = interopDefault(require$$33);
var buffer = interopDefault(require$$32);
var anObject = interopDefault(require$$5);
var toAbsoluteIndex = interopDefault(require$$23);
var toLength = interopDefault(require$$3$2);
var isObject = interopDefault(require$$3$1);
var ArrayBuffer = interopDefault(require$$3).ArrayBuffer;
var speciesConstructor = interopDefault(require$$1$21);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * interopDefault(require$$1$1)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var final = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(final - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < final) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    } return result;
  }
});

interopDefault(require$$0$35)(ARRAY_BUFFER);
});

interopDefault(es6_typed_arrayBuffer);

var es6_typed_dataView = createCommonjsModule(function (module) {
var $export = interopDefault(require$$1$2);
$export($export.G + $export.W + $export.F * !interopDefault(require$$33).ABV, {
  DataView: interopDefault(require$$32).DataView
});
});

interopDefault(es6_typed_dataView);

var _typedArray = createCommonjsModule(function (module) {
'use strict';
if (interopDefault(require$$1)) {
  var LIBRARY = interopDefault(require$$2$4);
  var global = interopDefault(require$$3);
  var fails = interopDefault(require$$1$1);
  var $export = interopDefault(require$$1$2);
  var $typed = interopDefault(require$$33);
  var $buffer = interopDefault(require$$32);
  var ctx = interopDefault(require$$1$4);
  var anInstance = interopDefault(require$$4$8);
  var propertyDesc = interopDefault(require$$2$3);
  var hide = interopDefault(require$$2);
  var redefineAll = interopDefault(require$$3$6);
  var toInteger = interopDefault(require$$2$5);
  var toLength = interopDefault(require$$3$2);
  var toIndex = interopDefault(require$$24);
  var toAbsoluteIndex = interopDefault(require$$23);
  var toPrimitive = interopDefault(require$$4$1);
  var has = interopDefault(require$$4);
  var classof = interopDefault(require$$1$11);
  var isObject = interopDefault(require$$3$1);
  var toObject = interopDefault(require$$5$2);
  var isArrayIter = interopDefault(require$$17);
  var create = interopDefault(require$$6$1);
  var getPrototypeOf = interopDefault(require$$0$11);
  var gOPN = interopDefault(require$$3$4).f;
  var getIterFn = interopDefault(require$$13);
  var uid = interopDefault(require$$12);
  var wks = interopDefault(require$$0$2);
  var createArrayMethod = interopDefault(require$$10);
  var createArrayIncludes = interopDefault(require$$1$10);
  var speciesConstructor = interopDefault(require$$1$21);
  var ArrayIterators = interopDefault(require$$6$2);
  var Iterators = interopDefault(require$$1$14);
  var $iterDetect = interopDefault(require$$5$5);
  var setSpecies = interopDefault(require$$0$35);
  var arrayFill = interopDefault(require$$3$5);
  var arrayCopyWithin = interopDefault(require$$2$9);
  var $DP = interopDefault(require$$2$1);
  var $GOPD = interopDefault(require$$2$7);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };
});

var _typedArray$1 = interopDefault(_typedArray);


var require$$0$41 = Object.freeze({
  default: _typedArray$1
});

var es6_typed_int8Array = createCommonjsModule(function (module) {
interopDefault(require$$0$41)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});
});

interopDefault(es6_typed_int8Array);

var es6_typed_uint8Array = createCommonjsModule(function (module) {
interopDefault(require$$0$41)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});
});

interopDefault(es6_typed_uint8Array);

var es6_typed_uint8ClampedArray = createCommonjsModule(function (module) {
interopDefault(require$$0$41)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);
});

interopDefault(es6_typed_uint8ClampedArray);

var es6_typed_int16Array = createCommonjsModule(function (module) {
interopDefault(require$$0$41)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});
});

interopDefault(es6_typed_int16Array);

var es6_typed_uint16Array = createCommonjsModule(function (module) {
interopDefault(require$$0$41)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});
});

interopDefault(es6_typed_uint16Array);

var es6_typed_int32Array = createCommonjsModule(function (module) {
interopDefault(require$$0$41)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});
});

interopDefault(es6_typed_int32Array);

var es6_typed_uint32Array = createCommonjsModule(function (module) {
interopDefault(require$$0$41)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});
});

interopDefault(es6_typed_uint32Array);

var es6_typed_float32Array = createCommonjsModule(function (module) {
interopDefault(require$$0$41)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});
});

interopDefault(es6_typed_float32Array);

var es6_typed_float64Array = createCommonjsModule(function (module) {
interopDefault(require$$0$41)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});
});

interopDefault(es6_typed_float64Array);

var es6_reflect_apply = createCommonjsModule(function (module) {
// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = interopDefault(require$$1$2);
var aFunction = interopDefault(require$$6);
var anObject = interopDefault(require$$5);
var rApply = (interopDefault(require$$3).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !interopDefault(require$$1$1)(function () {
  rApply(function () { /* empty */ });
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});
});

interopDefault(es6_reflect_apply);

var es6_reflect_construct = createCommonjsModule(function (module) {
// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = interopDefault(require$$1$2);
var create = interopDefault(require$$6$1);
var aFunction = interopDefault(require$$6);
var anObject = interopDefault(require$$5);
var isObject = interopDefault(require$$3$1);
var fails = interopDefault(require$$1$1);
var bind = interopDefault(require$$1$12);
var rConstruct = (interopDefault(require$$3).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(rConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () { /* empty */ });
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});
});

interopDefault(es6_reflect_construct);

var es6_reflect_defineProperty = createCommonjsModule(function (module) {
// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = interopDefault(require$$2$1);
var $export = interopDefault(require$$1$2);
var anObject = interopDefault(require$$5);
var toPrimitive = interopDefault(require$$4$1);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * interopDefault(require$$1$1)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});
});

interopDefault(es6_reflect_defineProperty);

var es6_reflect_deleteProperty = createCommonjsModule(function (module) {
// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = interopDefault(require$$1$2);
var gOPD = interopDefault(require$$2$7).f;
var anObject = interopDefault(require$$5);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});
});

interopDefault(es6_reflect_deleteProperty);

var es6_reflect_enumerate = createCommonjsModule(function (module) {
'use strict';
// 26.1.5 Reflect.enumerate(target)
var $export = interopDefault(require$$1$2);
var anObject = interopDefault(require$$5);
var Enumerate = function (iterated) {
  this._t = anObject(iterated); // target
  this._i = 0;                  // next index
  var keys = this._k = [];      // keys
  var key;
  for (key in iterated) keys.push(key);
};
interopDefault(require$$0$26)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});
});

interopDefault(es6_reflect_enumerate);

var es6_reflect_get = createCommonjsModule(function (module) {
// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = interopDefault(require$$2$7);
var getPrototypeOf = interopDefault(require$$0$11);
var has = interopDefault(require$$4);
var $export = interopDefault(require$$1$2);
var isObject = interopDefault(require$$3$1);
var anObject = interopDefault(require$$5);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value')
    ? desc.value
    : desc.get !== undefined
      ? desc.get.call(receiver)
      : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });
});

interopDefault(es6_reflect_get);

var es6_reflect_getOwnPropertyDescriptor = createCommonjsModule(function (module) {
// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = interopDefault(require$$2$7);
var $export = interopDefault(require$$1$2);
var anObject = interopDefault(require$$5);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});
});

interopDefault(es6_reflect_getOwnPropertyDescriptor);

var es6_reflect_getPrototypeOf = createCommonjsModule(function (module) {
// 26.1.8 Reflect.getPrototypeOf(target)
var $export = interopDefault(require$$1$2);
var getProto = interopDefault(require$$0$11);
var anObject = interopDefault(require$$5);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});
});

interopDefault(es6_reflect_getPrototypeOf);

var es6_reflect_has = createCommonjsModule(function (module) {
// 26.1.9 Reflect.has(target, propertyKey)
var $export = interopDefault(require$$1$2);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});
});

interopDefault(es6_reflect_has);

var es6_reflect_isExtensible = createCommonjsModule(function (module) {
// 26.1.10 Reflect.isExtensible(target)
var $export = interopDefault(require$$1$2);
var anObject = interopDefault(require$$5);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});
});

interopDefault(es6_reflect_isExtensible);

var _ownKeys = createCommonjsModule(function (module) {
// all object keys, includes non-enumerable and symbols
var gOPN = interopDefault(require$$3$4);
var gOPS = interopDefault(require$$2$6);
var anObject = interopDefault(require$$5);
var Reflect = interopDefault(require$$3).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};
});

var _ownKeys$1 = interopDefault(_ownKeys);


var require$$3$8 = Object.freeze({
  default: _ownKeys$1
});

var es6_reflect_ownKeys = createCommonjsModule(function (module) {
// 26.1.11 Reflect.ownKeys(target)
var $export = interopDefault(require$$1$2);

$export($export.S, 'Reflect', { ownKeys: interopDefault(require$$3$8) });
});

interopDefault(es6_reflect_ownKeys);

var es6_reflect_preventExtensions = createCommonjsModule(function (module) {
// 26.1.12 Reflect.preventExtensions(target)
var $export = interopDefault(require$$1$2);
var anObject = interopDefault(require$$5);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});
});

interopDefault(es6_reflect_preventExtensions);

var es6_reflect_set = createCommonjsModule(function (module) {
// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = interopDefault(require$$2$1);
var gOPD = interopDefault(require$$2$7);
var getPrototypeOf = interopDefault(require$$0$11);
var has = interopDefault(require$$4);
var $export = interopDefault(require$$1$2);
var createDesc = interopDefault(require$$2$3);
var anObject = interopDefault(require$$5);
var isObject = interopDefault(require$$3$1);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    existingDescriptor = gOPD.f(receiver, propertyKey) || createDesc(0);
    existingDescriptor.value = V;
    dP.f(receiver, propertyKey, existingDescriptor);
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });
});

interopDefault(es6_reflect_set);

var es6_reflect_setPrototypeOf = createCommonjsModule(function (module) {
// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = interopDefault(require$$1$2);
var setProto = interopDefault(require$$0$13);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});
});

interopDefault(es6_reflect_setPrototypeOf);

var es7_array_includes = createCommonjsModule(function (module) {
'use strict';
// https://github.com/tc39/Array.prototype.includes
var $export = interopDefault(require$$1$2);
var $includes = interopDefault(require$$1$10)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

interopDefault(require$$0$34)('includes');
});

interopDefault(es7_array_includes);

var _flattenIntoArray = createCommonjsModule(function (module) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray
var isArray = interopDefault(require$$4$4);
var isObject = interopDefault(require$$3$1);
var toLength = interopDefault(require$$3$2);
var ctx = interopDefault(require$$1$4);
var IS_CONCAT_SPREADABLE = interopDefault(require$$0$2)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;
});

var _flattenIntoArray$1 = interopDefault(_flattenIntoArray);


var require$$5$6 = Object.freeze({
  default: _flattenIntoArray$1
});

var es7_array_flatMap = createCommonjsModule(function (module) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap
var $export = interopDefault(require$$1$2);
var flattenIntoArray = interopDefault(require$$5$6);
var toObject = interopDefault(require$$5$2);
var toLength = interopDefault(require$$3$2);
var aFunction = interopDefault(require$$6);
var arraySpeciesCreate = interopDefault(require$$1$16);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

interopDefault(require$$0$34)('flatMap');
});

interopDefault(es7_array_flatMap);

var es7_array_flatten = createCommonjsModule(function (module) {
'use strict';
// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten
var $export = interopDefault(require$$1$2);
var flattenIntoArray = interopDefault(require$$5$6);
var toObject = interopDefault(require$$5$2);
var toLength = interopDefault(require$$3$2);
var toInteger = interopDefault(require$$2$5);
var arraySpeciesCreate = interopDefault(require$$1$16);

$export($export.P, 'Array', {
  flatten: function flatten(/* depthArg = 1 */) {
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

interopDefault(require$$0$34)('flatten');
});

interopDefault(es7_array_flatten);

var es7_string_at = createCommonjsModule(function (module) {
'use strict';
// https://github.com/mathiasbynens/String.prototype.at
var $export = interopDefault(require$$1$2);
var $at = interopDefault(require$$0$25)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});
});

interopDefault(es7_string_at);

var _stringPad = createCommonjsModule(function (module) {
// https://github.com/tc39/proposal-string-pad-start-end
var toLength = interopDefault(require$$3$2);
var repeat = interopDefault(require$$1$13);
var defined = interopDefault(require$$4$3);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};
});

var _stringPad$1 = interopDefault(_stringPad);


var require$$0$42 = Object.freeze({
  default: _stringPad$1
});

var es7_string_padStart = createCommonjsModule(function (module) {
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = interopDefault(require$$1$2);
var $pad = interopDefault(require$$0$42);

$export($export.P, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});
});

interopDefault(es7_string_padStart);

var es7_string_padEnd = createCommonjsModule(function (module) {
'use strict';
// https://github.com/tc39/proposal-string-pad-start-end
var $export = interopDefault(require$$1$2);
var $pad = interopDefault(require$$0$42);

$export($export.P, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});
});

interopDefault(es7_string_padEnd);

var es7_string_trimLeft = createCommonjsModule(function (module) {
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
interopDefault(require$$0$15)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');
});

interopDefault(es7_string_trimLeft);

var es7_string_trimRight = createCommonjsModule(function (module) {
'use strict';
// https://github.com/sebmarkbage/ecmascript-string-left-right-trim
interopDefault(require$$0$15)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');
});

interopDefault(es7_string_trimRight);

var es7_string_matchAll = createCommonjsModule(function (module) {
'use strict';
// https://tc39.github.io/String.prototype.matchAll/
var $export = interopDefault(require$$1$2);
var defined = interopDefault(require$$4$3);
var toLength = interopDefault(require$$3$2);
var isRegExp = interopDefault(require$$2$8);
var getFlags = interopDefault(require$$1$18);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function (regexp, string) {
  this._r = regexp;
  this._s = string;
};

interopDefault(require$$0$26)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});
});

interopDefault(es7_string_matchAll);

var es7_symbol_asyncIterator = createCommonjsModule(function (module) {
interopDefault(require$$0$3)('asyncIterator');
});

interopDefault(es7_symbol_asyncIterator);

var es7_symbol_observable = createCommonjsModule(function (module) {
interopDefault(require$$0$3)('observable');
});

interopDefault(es7_symbol_observable);

var es7_object_getOwnPropertyDescriptors = createCommonjsModule(function (module) {
// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = interopDefault(require$$1$2);
var ownKeys = interopDefault(require$$3$8);
var toIObject = interopDefault(require$$1$8);
var gOPD = interopDefault(require$$2$7);
var createProperty = interopDefault(require$$0$31);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});
});

interopDefault(es7_object_getOwnPropertyDescriptors);

var _objectToArray = createCommonjsModule(function (module) {
var getKeys = interopDefault(require$$5$1);
var toIObject = interopDefault(require$$1$8);
var isEnum = interopDefault(require$$0$7).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};
});

var _objectToArray$1 = interopDefault(_objectToArray);


var require$$0$43 = Object.freeze({
  default: _objectToArray$1
});

var es7_object_values = createCommonjsModule(function (module) {
// https://github.com/tc39/proposal-object-values-entries
var $export = interopDefault(require$$1$2);
var $values = interopDefault(require$$0$43)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});
});

interopDefault(es7_object_values);

var es7_object_entries = createCommonjsModule(function (module) {
// https://github.com/tc39/proposal-object-values-entries
var $export = interopDefault(require$$1$2);
var $entries = interopDefault(require$$0$43)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});
});

interopDefault(es7_object_entries);

var _objectForcedPam = createCommonjsModule(function (module) {
'use strict';
// Forced replacement prototype accessors methods
module.exports = interopDefault(require$$2$4) || !interopDefault(require$$1$1)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () { /* empty */ });
  delete interopDefault(require$$3)[K];
});
});

var _objectForcedPam$1 = interopDefault(_objectForcedPam);


var require$$0$44 = Object.freeze({
  default: _objectForcedPam$1
});

var es7_object_defineGetter = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var toObject = interopDefault(require$$5$2);
var aFunction = interopDefault(require$$6);
var $defineProperty = interopDefault(require$$2$1);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
interopDefault(require$$1) && $export($export.P + interopDefault(require$$0$44), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});
});

interopDefault(es7_object_defineGetter);

var es7_object_defineSetter = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var toObject = interopDefault(require$$5$2);
var aFunction = interopDefault(require$$6);
var $defineProperty = interopDefault(require$$2$1);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
interopDefault(require$$1) && $export($export.P + interopDefault(require$$0$44), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});
});

interopDefault(es7_object_defineSetter);

var es7_object_lookupGetter = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var toObject = interopDefault(require$$5$2);
var toPrimitive = interopDefault(require$$4$1);
var getPrototypeOf = interopDefault(require$$0$11);
var getOwnPropertyDescriptor = interopDefault(require$$2$7).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
interopDefault(require$$1) && $export($export.P + interopDefault(require$$0$44), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});
});

interopDefault(es7_object_lookupGetter);

var es7_object_lookupSetter = createCommonjsModule(function (module) {
'use strict';
var $export = interopDefault(require$$1$2);
var toObject = interopDefault(require$$5$2);
var toPrimitive = interopDefault(require$$4$1);
var getPrototypeOf = interopDefault(require$$0$11);
var getOwnPropertyDescriptor = interopDefault(require$$2$7).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
interopDefault(require$$1) && $export($export.P + interopDefault(require$$0$44), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});
});

interopDefault(es7_object_lookupSetter);

var _arrayFromIterable = createCommonjsModule(function (module) {
var forOf = interopDefault(require$$1$20);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};
});

var _arrayFromIterable$1 = interopDefault(_arrayFromIterable);


var require$$3$9 = Object.freeze({
  default: _arrayFromIterable$1
});

var _collectionToJson = createCommonjsModule(function (module) {
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = interopDefault(require$$1$11);
var from = interopDefault(require$$3$9);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};
});

var _collectionToJson$1 = interopDefault(_collectionToJson);


var require$$0$45 = Object.freeze({
  default: _collectionToJson$1
});

var es7_map_toJson = createCommonjsModule(function (module) {
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = interopDefault(require$$1$2);

$export($export.P + $export.R, 'Map', { toJSON: interopDefault(require$$0$45)('Map') });
});

interopDefault(es7_map_toJson);

var es7_set_toJson = createCommonjsModule(function (module) {
// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = interopDefault(require$$1$2);

$export($export.P + $export.R, 'Set', { toJSON: interopDefault(require$$0$45)('Set') });
});

interopDefault(es7_set_toJson);

var _setCollectionOf = createCommonjsModule(function (module) {
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = interopDefault(require$$1$2);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};
});

var _setCollectionOf$1 = interopDefault(_setCollectionOf);


var require$$0$46 = Object.freeze({
  default: _setCollectionOf$1
});

var es7_map_of = createCommonjsModule(function (module) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
interopDefault(require$$0$46)('Map');
});

interopDefault(es7_map_of);

var es7_set_of = createCommonjsModule(function (module) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
interopDefault(require$$0$46)('Set');
});

interopDefault(es7_set_of);

var es7_weakMap_of = createCommonjsModule(function (module) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
interopDefault(require$$0$46)('WeakMap');
});

interopDefault(es7_weakMap_of);

var es7_weakSet_of = createCommonjsModule(function (module) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
interopDefault(require$$0$46)('WeakSet');
});

interopDefault(es7_weakSet_of);

var _setCollectionFrom = createCommonjsModule(function (module) {
'use strict';
// https://tc39.github.io/proposal-setmap-offrom/
var $export = interopDefault(require$$1$2);
var aFunction = interopDefault(require$$6);
var ctx = interopDefault(require$$1$4);
var forOf = interopDefault(require$$1$20);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};
});

var _setCollectionFrom$1 = interopDefault(_setCollectionFrom);


var require$$0$47 = Object.freeze({
  default: _setCollectionFrom$1
});

var es7_map_from = createCommonjsModule(function (module) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
interopDefault(require$$0$47)('Map');
});

interopDefault(es7_map_from);

var es7_set_from = createCommonjsModule(function (module) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
interopDefault(require$$0$47)('Set');
});

interopDefault(es7_set_from);

var es7_weakMap_from = createCommonjsModule(function (module) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
interopDefault(require$$0$47)('WeakMap');
});

interopDefault(es7_weakMap_from);

var es7_weakSet_from = createCommonjsModule(function (module) {
// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
interopDefault(require$$0$47)('WeakSet');
});

interopDefault(es7_weakSet_from);

var es7_global = createCommonjsModule(function (module) {
// https://github.com/tc39/proposal-global
var $export = interopDefault(require$$1$2);

$export($export.G, { global: interopDefault(require$$3) });
});

interopDefault(es7_global);

var es7_system_global = createCommonjsModule(function (module) {
// https://github.com/tc39/proposal-global
var $export = interopDefault(require$$1$2);

$export($export.S, 'System', { global: interopDefault(require$$3) });
});

interopDefault(es7_system_global);

var es7_error_isError = createCommonjsModule(function (module) {
// https://github.com/ljharb/proposal-is-error
var $export = interopDefault(require$$1$2);
var cof = interopDefault(require$$0$4);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});
});

interopDefault(es7_error_isError);

var es7_math_clamp = createCommonjsModule(function (module) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = interopDefault(require$$1$2);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});
});

interopDefault(es7_math_clamp);

var es7_math_degPerRad = createCommonjsModule(function (module) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = interopDefault(require$$1$2);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });
});

interopDefault(es7_math_degPerRad);

var es7_math_degrees = createCommonjsModule(function (module) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = interopDefault(require$$1$2);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});
});

interopDefault(es7_math_degrees);

var _mathScale = createCommonjsModule(function (module) {
// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (
    arguments.length === 0
      // eslint-disable-next-line no-self-compare
      || x != x
      // eslint-disable-next-line no-self-compare
      || inLow != inLow
      // eslint-disable-next-line no-self-compare
      || inHigh != inHigh
      // eslint-disable-next-line no-self-compare
      || outLow != outLow
      // eslint-disable-next-line no-self-compare
      || outHigh != outHigh
  ) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};
});

var _mathScale$1 = interopDefault(_mathScale);


var require$$0$48 = Object.freeze({
  default: _mathScale$1
});

var es7_math_fscale = createCommonjsModule(function (module) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = interopDefault(require$$1$2);
var scale = interopDefault(require$$0$48);
var fround = interopDefault(require$$0$24);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});
});

interopDefault(es7_math_fscale);

var es7_math_iaddh = createCommonjsModule(function (module) {
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = interopDefault(require$$1$2);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});
});

interopDefault(es7_math_iaddh);

var es7_math_isubh = createCommonjsModule(function (module) {
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = interopDefault(require$$1$2);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});
});

interopDefault(es7_math_isubh);

var es7_math_imulh = createCommonjsModule(function (module) {
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = interopDefault(require$$1$2);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});
});

interopDefault(es7_math_imulh);

var es7_math_radPerDeg = createCommonjsModule(function (module) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = interopDefault(require$$1$2);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });
});

interopDefault(es7_math_radPerDeg);

var es7_math_radians = createCommonjsModule(function (module) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = interopDefault(require$$1$2);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});
});

interopDefault(es7_math_radians);

var es7_math_scale = createCommonjsModule(function (module) {
// https://rwaldron.github.io/proposal-math-extensions/
var $export = interopDefault(require$$1$2);

$export($export.S, 'Math', { scale: interopDefault(require$$0$48) });
});

interopDefault(es7_math_scale);

var es7_math_umulh = createCommonjsModule(function (module) {
// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = interopDefault(require$$1$2);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});
});

interopDefault(es7_math_umulh);

var es7_math_signbit = createCommonjsModule(function (module) {
// http://jfbastien.github.io/papers/Math.signbit.html
var $export = interopDefault(require$$1$2);

$export($export.S, 'Math', { signbit: function signbit(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
} });
});

interopDefault(es7_math_signbit);

var es7_promise_finally = createCommonjsModule(function (module) {
// https://github.com/tc39/proposal-promise-finally
'use strict';
var $export = interopDefault(require$$1$2);
var core = interopDefault(require$$0);
var global = interopDefault(require$$3);
var speciesConstructor = interopDefault(require$$1$21);
var promiseResolve = interopDefault(require$$0$38);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });
});

interopDefault(es7_promise_finally);

var es7_promise_try = createCommonjsModule(function (module) {
'use strict';
// https://github.com/tc39/proposal-promise-try
var $export = interopDefault(require$$1$2);
var newPromiseCapability = interopDefault(require$$1$22);
var perform = interopDefault(require$$0$37);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });
});

interopDefault(es7_promise_try);

var _metadata = createCommonjsModule(function (module) {
var Map = interopDefault(require$$3$7);
var $export = interopDefault(require$$1$2);
var shared = interopDefault(require$$1$5)('metadata');
var store = shared.store || (shared.store = new (interopDefault(require$$0$40))());

var getOrCreateMetadataMap = function (target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  } return keyMetadata;
};
var ordinaryHasOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function (MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function (MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function (target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) { keys.push(key); });
  return keys;
};
var toMetaKey = function (it) {
  return it === undefined || typeof it == 'symbol' ? it : String(it);
};
var exp = function (O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};
});

var _metadata$1 = interopDefault(_metadata);
var store = _metadata.store;
var map = _metadata.map;
var has = _metadata.has;
var get = _metadata.get;
var set$2 = _metadata.set;
var keys = _metadata.keys;
var key = _metadata.key;
var exp = _metadata.exp;

var require$$2$12 = Object.freeze({
  default: _metadata$1,
  store: store,
  map: map,
  has: has,
  get: get,
  set: set$2,
  keys: keys,
  key: key,
  exp: exp
});

var es7_reflect_defineMetadata = createCommonjsModule(function (module) {
var metadata = interopDefault(require$$2$12);
var anObject = interopDefault(require$$5);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
  ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
} });
});

interopDefault(es7_reflect_defineMetadata);

var es7_reflect_deleteMetadata = createCommonjsModule(function (module) {
var metadata = interopDefault(require$$2$12);
var anObject = interopDefault(require$$5);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
  var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
  var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
  if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
  if (metadataMap.size) return true;
  var targetMetadata = store.get(target);
  targetMetadata['delete'](targetKey);
  return !!targetMetadata.size || store['delete'](target);
} });
});

interopDefault(es7_reflect_deleteMetadata);

var es7_reflect_getMetadata = createCommonjsModule(function (module) {
var metadata = interopDefault(require$$2$12);
var anObject = interopDefault(require$$5);
var getPrototypeOf = interopDefault(require$$0$11);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });
});

interopDefault(es7_reflect_getMetadata);

var es7_reflect_getMetadataKeys = createCommonjsModule(function (module) {
var Set = interopDefault(require$$4$9);
var from = interopDefault(require$$3$9);
var metadata = interopDefault(require$$2$12);
var anObject = interopDefault(require$$5);
var getPrototypeOf = interopDefault(require$$0$11);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function (O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
  return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });
});

interopDefault(es7_reflect_getMetadataKeys);

var es7_reflect_getOwnMetadata = createCommonjsModule(function (module) {
var metadata = interopDefault(require$$2$12);
var anObject = interopDefault(require$$5);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryGetOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });
});

interopDefault(es7_reflect_getOwnMetadata);

var es7_reflect_getOwnMetadataKeys = createCommonjsModule(function (module) {
var metadata = interopDefault(require$$2$12);
var anObject = interopDefault(require$$5);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
  return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
} });
});

interopDefault(es7_reflect_getOwnMetadataKeys);

var es7_reflect_hasMetadata = createCommonjsModule(function (module) {
var metadata = interopDefault(require$$2$12);
var anObject = interopDefault(require$$5);
var getPrototypeOf = interopDefault(require$$0$11);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function (MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });
});

interopDefault(es7_reflect_hasMetadata);

var es7_reflect_hasOwnMetadata = createCommonjsModule(function (module) {
var metadata = interopDefault(require$$2$12);
var anObject = interopDefault(require$$5);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
  return ordinaryHasOwnMetadata(metadataKey, anObject(target)
    , arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
} });
});

interopDefault(es7_reflect_hasOwnMetadata);

var es7_reflect_metadata = createCommonjsModule(function (module) {
var $metadata = interopDefault(require$$2$12);
var anObject = interopDefault(require$$5);
var aFunction = interopDefault(require$$6);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
  return function decorator(target, targetKey) {
    ordinaryDefineOwnMetadata(
      metadataKey, metadataValue,
      (targetKey !== undefined ? anObject : aFunction)(target),
      toMetaKey(targetKey)
    );
  };
} });
});

interopDefault(es7_reflect_metadata);

var es7_asap = createCommonjsModule(function (module) {
// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = interopDefault(require$$1$2);
var microtask = interopDefault(require$$8)();
var process = interopDefault(require$$3).process;
var isNode = interopDefault(require$$0$4)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});
});

interopDefault(es7_asap);

var es7_observable = createCommonjsModule(function (module) {
'use strict';
// https://github.com/zenparsing/es-observable
var $export = interopDefault(require$$1$2);
var global = interopDefault(require$$3);
var core = interopDefault(require$$0);
var microtask = interopDefault(require$$8)();
var OBSERVABLE = interopDefault(require$$0$2)('observable');
var aFunction = interopDefault(require$$6);
var anObject = interopDefault(require$$5);
var anInstance = interopDefault(require$$4$8);
var redefineAll = interopDefault(require$$3$6);
var hide = interopDefault(require$$2);
var forOf = interopDefault(require$$1$20);
var RETURN = forOf.RETURN;

var getMethod = function (fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function (subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function (subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function (subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function (observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function () { subscription.unsubscribe(); };
      else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  } if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() { closeSubscription(this); }
});

var SubscriptionObserver = function (subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    } cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      } cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function (value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = Array(l); i < l;) items[i] = arguments[i++];
    return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          } observer.complete();
        }
      });
      return function () { done = true; };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () { return this; });

$export($export.G, { Observable: $Observable });

interopDefault(require$$0$35)('Observable');
});

interopDefault(es7_observable);

var web_timers = createCommonjsModule(function (module) {
// ie9- setTimeout & setInterval additional parameters fix
var global = interopDefault(require$$3);
var $export = interopDefault(require$$1$2);
var navigator = global.navigator;
var slice = [].slice;
var MSIE = !!navigator && /MSIE .\./.test(navigator.userAgent); // <- dirty ie9- check
var wrap = function (set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});
});

interopDefault(web_timers);

var web_immediate = createCommonjsModule(function (module) {
var $export = interopDefault(require$$1$2);
var $task = interopDefault(require$$0$36);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});
});

interopDefault(web_immediate);

var web_dom_iterable = createCommonjsModule(function (module) {
var $iterators = interopDefault(require$$6$2);
var getKeys = interopDefault(require$$5$1);
var redefine = interopDefault(require$$4$2);
var global = interopDefault(require$$3);
var hide = interopDefault(require$$2);
var Iterators = interopDefault(require$$1$14);
var wks = interopDefault(require$$0$2);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}
});

interopDefault(web_dom_iterable);

var shim = createCommonjsModule(function (module) {
module.exports = interopDefault(require$$0);
});

interopDefault(shim);

var runtime = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof commonjsGlobal === "object" ? commonjsGlobal :
  typeof window === "object" ? window :
  typeof self === "object" ? self : commonjsGlobal
);
});

interopDefault(runtime);

var _replacer = createCommonjsModule(function (module) {
module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};
});

var _replacer$1 = interopDefault(_replacer);


var require$$0$49 = Object.freeze({
  default: _replacer$1
});

var core_regexp_escape = createCommonjsModule(function (module) {
// https://github.com/benjamingr/RexExp.escape
var $export = interopDefault(require$$1$2);
var $re = interopDefault(require$$0$49)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) { return $re(it); } });
});

interopDefault(core_regexp_escape);

var _escape = createCommonjsModule(function (module) {
module.exports = interopDefault(require$$0).RegExp.escape;
});

interopDefault(_escape);

var index = createCommonjsModule(function (module) {
"use strict";







if (commonjsGlobal._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
commonjsGlobal._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
});

interopDefault(index);

var hammer = createCommonjsModule(function (module) {
/*! Hammer.JS - v2.0.7 - 2016-04-22
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2016 Jorik Tangelder;
 * Licensed under the MIT license */
(function(window, document, exportName, undefined) {
  'use strict';

var VENDOR_PREFIXES = ['', 'webkit', 'Moz', 'MS', 'ms', 'o'];
var TEST_ELEMENT = document.createElement('div');

var TYPE_FUNCTION = 'function';

var round = Math.round;
var abs = Math.abs;
var now = Date.now;

/**
 * set a timeout with a given scope
 * @param {Function} fn
 * @param {Number} timeout
 * @param {Object} context
 * @returns {number}
 */
function setTimeoutContext(fn, timeout, context) {
    return setTimeout(bindFn(fn, context), timeout);
}

/**
 * if the argument is an array, we want to execute the fn on each entry
 * if it aint an array we don't want to do a thing.
 * this is used by all the methods that accept a single and array argument.
 * @param {*|Array} arg
 * @param {String} fn
 * @param {Object} [context]
 * @returns {Boolean}
 */
function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
        each(arg, context[fn], context);
        return true;
    }
    return false;
}

/**
 * walk objects and arrays
 * @param {Object} obj
 * @param {Function} iterator
 * @param {Object} context
 */
function each(obj, iterator, context) {
    var i;

    if (!obj) {
        return;
    }

    if (obj.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length !== undefined) {
        i = 0;
        while (i < obj.length) {
            iterator.call(context, obj[i], i, obj);
            i++;
        }
    } else {
        for (i in obj) {
            obj.hasOwnProperty(i) && iterator.call(context, obj[i], i, obj);
        }
    }
}

/**
 * wrap a method with a deprecation warning and stack trace
 * @param {Function} method
 * @param {String} name
 * @param {String} message
 * @returns {Function} A new function wrapping the supplied method.
 */
function deprecate(method, name, message) {
    var deprecationMessage = 'DEPRECATED METHOD: ' + name + '\n' + message + ' AT \n';
    return function() {
        var e = new Error('get-stack-trace');
        var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, '')
            .replace(/^\s+at\s+/gm, '')
            .replace(/^Object.<anonymous>\s*\(/gm, '{anonymous}()@') : 'Unknown Stack Trace';

        var log = window.console && (window.console.warn || window.console.log);
        if (log) {
            log.call(window.console, deprecationMessage, stack);
        }
        return method.apply(this, arguments);
    };
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} target
 * @param {...Object} objects_to_assign
 * @returns {Object} target
 */
var assign;
if (typeof Object.assign !== 'function') {
    assign = function assign(target) {
        if (target === undefined || target === null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source !== undefined && source !== null) {
                for (var nextKey in source) {
                    if (source.hasOwnProperty(nextKey)) {
                        output[nextKey] = source[nextKey];
                    }
                }
            }
        }
        return output;
    };
} else {
    assign = Object.assign;
}

/**
 * extend object.
 * means that properties in dest will be overwritten by the ones in src.
 * @param {Object} dest
 * @param {Object} src
 * @param {Boolean} [merge=false]
 * @returns {Object} dest
 */
var extend = deprecate(function extend(dest, src, merge) {
    var keys = Object.keys(src);
    var i = 0;
    while (i < keys.length) {
        if (!merge || (merge && dest[keys[i]] === undefined)) {
            dest[keys[i]] = src[keys[i]];
        }
        i++;
    }
    return dest;
}, 'extend', 'Use `assign`.');

/**
 * merge the values from src in the dest.
 * means that properties that exist in dest will not be overwritten by src
 * @param {Object} dest
 * @param {Object} src
 * @returns {Object} dest
 */
var merge = deprecate(function merge(dest, src) {
    return extend(dest, src, true);
}, 'merge', 'Use `assign`.');

/**
 * simple class inheritance
 * @param {Function} child
 * @param {Function} base
 * @param {Object} [properties]
 */
function inherit(child, base, properties) {
    var baseP = base.prototype,
        childP;

    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;

    if (properties) {
        assign(childP, properties);
    }
}

/**
 * simple function bind
 * @param {Function} fn
 * @param {Object} context
 * @returns {Function}
 */
function bindFn(fn, context) {
    return function boundFn() {
        return fn.apply(context, arguments);
    };
}

/**
 * let a boolean value also be a function that must return a boolean
 * this first item in args will be used as the context
 * @param {Boolean|Function} val
 * @param {Array} [args]
 * @returns {Boolean}
 */
function boolOrFn(val, args) {
    if (typeof val == TYPE_FUNCTION) {
        return val.apply(args ? args[0] || undefined : undefined, args);
    }
    return val;
}

/**
 * use the val2 when val1 is undefined
 * @param {*} val1
 * @param {*} val2
 * @returns {*}
 */
function ifUndefined(val1, val2) {
    return (val1 === undefined) ? val2 : val1;
}

/**
 * addEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.addEventListener(type, handler, false);
    });
}

/**
 * removeEventListener with multiple events at once
 * @param {EventTarget} target
 * @param {String} types
 * @param {Function} handler
 */
function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
        target.removeEventListener(type, handler, false);
    });
}

/**
 * find if a node is in the given parent
 * @method hasParent
 * @param {HTMLElement} node
 * @param {HTMLElement} parent
 * @return {Boolean} found
 */
function hasParent(node, parent) {
    while (node) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}

/**
 * small indexOf wrapper
 * @param {String} str
 * @param {String} find
 * @returns {Boolean} found
 */
function inStr(str, find) {
    return str.indexOf(find) > -1;
}

/**
 * split string on whitespace
 * @param {String} str
 * @returns {Array} words
 */
function splitStr(str) {
    return str.trim().split(/\s+/g);
}

/**
 * find if a array contains the object using indexOf or a simple polyFill
 * @param {Array} src
 * @param {String} find
 * @param {String} [findByKey]
 * @return {Boolean|Number} false when not found, or the index
 */
function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
        return src.indexOf(find);
    } else {
        var i = 0;
        while (i < src.length) {
            if ((findByKey && src[i][findByKey] == find) || (!findByKey && src[i] === find)) {
                return i;
            }
            i++;
        }
        return -1;
    }
}

/**
 * convert array-like objects to real arrays
 * @param {Object} obj
 * @returns {Array}
 */
function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
}

/**
 * unique array with objects based on a key (like 'id') or just by the array's value
 * @param {Array} src [{id:1},{id:2},{id:1}]
 * @param {String} [key]
 * @param {Boolean} [sort=False]
 * @returns {Array} [{id:1},{id:2}]
 */
function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i = 0;

    while (i < src.length) {
        var val = key ? src[i][key] : src[i];
        if (inArray(values, val) < 0) {
            results.push(src[i]);
        }
        values[i] = val;
        i++;
    }

    if (sort) {
        if (!key) {
            results = results.sort();
        } else {
            results = results.sort(function sortUniqueArray(a, b) {
                return a[key] > b[key];
            });
        }
    }

    return results;
}

/**
 * get the prefixed property
 * @param {Object} obj
 * @param {String} property
 * @returns {String|Undefined} prefixed
 */
function prefixed(obj, property) {
    var prefix, prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);

    var i = 0;
    while (i < VENDOR_PREFIXES.length) {
        prefix = VENDOR_PREFIXES[i];
        prop = (prefix) ? prefix + camelProp : property;

        if (prop in obj) {
            return prop;
        }
        i++;
    }
    return undefined;
}

/**
 * get a unique id
 * @returns {number} uniqueId
 */
var _uniqueId = 1;
function uniqueId() {
    return _uniqueId++;
}

/**
 * get the window object of an element
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 */
function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return (doc.defaultView || doc.parentWindow || window);
}

var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;

var SUPPORT_TOUCH = ('ontouchstart' in window);
var SUPPORT_POINTER_EVENTS = prefixed(window, 'PointerEvent') !== undefined;
var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);

var INPUT_TYPE_TOUCH = 'touch';
var INPUT_TYPE_PEN = 'pen';
var INPUT_TYPE_MOUSE = 'mouse';
var INPUT_TYPE_KINECT = 'kinect';

var COMPUTE_INTERVAL = 25;

var INPUT_START = 1;
var INPUT_MOVE = 2;
var INPUT_END = 4;
var INPUT_CANCEL = 8;

var DIRECTION_NONE = 1;
var DIRECTION_LEFT = 2;
var DIRECTION_RIGHT = 4;
var DIRECTION_UP = 8;
var DIRECTION_DOWN = 16;

var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;

var PROPS_XY = ['x', 'y'];
var PROPS_CLIENT_XY = ['clientX', 'clientY'];

/**
 * create new input type manager
 * @param {Manager} manager
 * @param {Function} callback
 * @returns {Input}
 * @constructor
 */
function Input(manager, callback) {
    var self = this;
    this.manager = manager;
    this.callback = callback;
    this.element = manager.element;
    this.target = manager.options.inputTarget;

    // smaller wrapper around the handler, for the scope and the enabled state of the manager,
    // so when disabled the input events are completely bypassed.
    this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
            self.handler(ev);
        }
    };

    this.init();

}

Input.prototype = {
    /**
     * should handle the inputEvent data and trigger the callback
     * @virtual
     */
    handler: function() { },

    /**
     * bind the events
     */
    init: function() {
        this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    },

    /**
     * unbind the events
     */
    destroy: function() {
        this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
        this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
        this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    }
};

/**
 * create new input type manager
 * called by the Manager constructor
 * @param {Hammer} manager
 * @returns {Input}
 */
function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;

    if (inputClass) {
        Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
        Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
        Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
        Type = MouseInput;
    } else {
        Type = TouchMouseInput;
    }
    return new (Type)(manager, inputHandler);
}

/**
 * handle input events
 * @param {Manager} manager
 * @param {String} eventType
 * @param {Object} input
 */
function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = (eventType & INPUT_START && (pointersLen - changedPointersLen === 0));
    var isFinal = (eventType & (INPUT_END | INPUT_CANCEL) && (pointersLen - changedPointersLen === 0));

    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;

    if (isFirst) {
        manager.session = {};
    }

    // source event is the normalized value of the domEvents
    // like 'touchstart, mouseup, pointerdown'
    input.eventType = eventType;

    // compute scale, rotation etc
    computeInputData(manager, input);

    // emit secret event
    manager.emit('hammer.input', input);

    manager.recognize(input);
    manager.session.prevInput = input;
}

/**
 * extend the data with some usable properties like scale, rotate, velocity etc
 * @param {Object} manager
 * @param {Object} input
 */
function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;

    // store the first input to calculate the distance and direction
    if (!session.firstInput) {
        session.firstInput = simpleCloneInputData(input);
    }

    // to compute scale and rotation we need to store the multiple touches
    if (pointersLength > 1 && !session.firstMultiple) {
        session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
        session.firstMultiple = false;
    }

    var firstInput = session.firstInput;
    var firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;

    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;

    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);

    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);

    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = (abs(overallVelocity.x) > abs(overallVelocity.y)) ? overallVelocity.x : overallVelocity.y;

    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;

    input.maxPointers = !session.prevInput ? input.pointers.length : ((input.pointers.length >
        session.prevInput.maxPointers) ? input.pointers.length : session.prevInput.maxPointers);

    computeIntervalInputData(session, input);

    // find the correct target
    var target = manager.element;
    if (hasParent(input.srcEvent.target, target)) {
        target = input.srcEvent.target;
    }
    input.target = target;
}

function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};

    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
        prevDelta = session.prevDelta = {
            x: prevInput.deltaX || 0,
            y: prevInput.deltaY || 0
        };

        offset = session.offsetDelta = {
            x: center.x,
            y: center.y
        };
    }

    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
}

/**
 * velocity is calculated every x ms
 * @param {Object} session
 * @param {Object} input
 */
function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input,
        deltaTime = input.timeStamp - last.timeStamp,
        velocity, velocityX, velocityY, direction;

    if (input.eventType != INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === undefined)) {
        var deltaX = input.deltaX - last.deltaX;
        var deltaY = input.deltaY - last.deltaY;

        var v = getVelocity(deltaTime, deltaX, deltaY);
        velocityX = v.x;
        velocityY = v.y;
        velocity = (abs(v.x) > abs(v.y)) ? v.x : v.y;
        direction = getDirection(deltaX, deltaY);

        session.lastInterval = input;
    } else {
        // use latest velocity info if it doesn't overtake a minimum period
        velocity = last.velocity;
        velocityX = last.velocityX;
        velocityY = last.velocityY;
        direction = last.direction;
    }

    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
}

/**
 * create a simple clone from the input used for storage of firstInput and firstMultiple
 * @param {Object} input
 * @returns {Object} clonedInputData
 */
function simpleCloneInputData(input) {
    // make a simple copy of the pointers because we will get a reference if we don't
    // we only need clientXY for the calculations
    var pointers = [];
    var i = 0;
    while (i < input.pointers.length) {
        pointers[i] = {
            clientX: round(input.pointers[i].clientX),
            clientY: round(input.pointers[i].clientY)
        };
        i++;
    }

    return {
        timeStamp: now(),
        pointers: pointers,
        center: getCenter(pointers),
        deltaX: input.deltaX,
        deltaY: input.deltaY
    };
}

/**
 * get the center of all the pointers
 * @param {Array} pointers
 * @return {Object} center contains `x` and `y` properties
 */
function getCenter(pointers) {
    var pointersLength = pointers.length;

    // no need to loop when only one touch
    if (pointersLength === 1) {
        return {
            x: round(pointers[0].clientX),
            y: round(pointers[0].clientY)
        };
    }

    var x = 0, y = 0, i = 0;
    while (i < pointersLength) {
        x += pointers[i].clientX;
        y += pointers[i].clientY;
        i++;
    }

    return {
        x: round(x / pointersLength),
        y: round(y / pointersLength)
    };
}

/**
 * calculate the velocity between two points. unit is in px per ms.
 * @param {Number} deltaTime
 * @param {Number} x
 * @param {Number} y
 * @return {Object} velocity `x` and `y`
 */
function getVelocity(deltaTime, x, y) {
    return {
        x: x / deltaTime || 0,
        y: y / deltaTime || 0
    };
}

/**
 * get the direction between two points
 * @param {Number} x
 * @param {Number} y
 * @return {Number} direction
 */
function getDirection(x, y) {
    if (x === y) {
        return DIRECTION_NONE;
    }

    if (abs(x) >= abs(y)) {
        return x < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y < 0 ? DIRECTION_UP : DIRECTION_DOWN;
}

/**
 * calculate the absolute distance between two points
 * @param {Object} p1 {x, y}
 * @param {Object} p2 {x, y}
 * @param {Array} [props] containing x and y keys
 * @return {Number} distance
 */
function getDistance(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];

    return Math.sqrt((x * x) + (y * y));
}

/**
 * calculate the angle between two coordinates
 * @param {Object} p1
 * @param {Object} p2
 * @param {Array} [props] containing x and y keys
 * @return {Number} angle
 */
function getAngle(p1, p2, props) {
    if (!props) {
        props = PROPS_XY;
    }
    var x = p2[props[0]] - p1[props[0]],
        y = p2[props[1]] - p1[props[1]];
    return Math.atan2(y, x) * 180 / Math.PI;
}

/**
 * calculate the rotation degrees between two pointersets
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} rotation
 */
function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
}

/**
 * calculate the scale factor between two pointersets
 * no scale is 1, and goes down to 0 when pinched together, and bigger when pinched out
 * @param {Array} start array of pointers
 * @param {Array} end array of pointers
 * @return {Number} scale
 */
function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
}

var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
};

var MOUSE_ELEMENT_EVENTS = 'mousedown';
var MOUSE_WINDOW_EVENTS = 'mousemove mouseup';

/**
 * Mouse events input
 * @constructor
 * @extends Input
 */
function MouseInput() {
    this.evEl = MOUSE_ELEMENT_EVENTS;
    this.evWin = MOUSE_WINDOW_EVENTS;

    this.pressed = false; // mousedown state

    Input.apply(this, arguments);
}

inherit(MouseInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function MEhandler(ev) {
        var eventType = MOUSE_INPUT_MAP[ev.type];

        // on start we want to have the left mouse button down
        if (eventType & INPUT_START && ev.button === 0) {
            this.pressed = true;
        }

        if (eventType & INPUT_MOVE && ev.which !== 1) {
            eventType = INPUT_END;
        }

        // mouse must be down
        if (!this.pressed) {
            return;
        }

        if (eventType & INPUT_END) {
            this.pressed = false;
        }

        this.callback(this.manager, eventType, {
            pointers: [ev],
            changedPointers: [ev],
            pointerType: INPUT_TYPE_MOUSE,
            srcEvent: ev
        });
    }
});

var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
};

// in IE10 the pointer types is defined as an enum
var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT // see https://twitter.com/jacobrossi/status/480596438489890816
};

var POINTER_ELEMENT_EVENTS = 'pointerdown';
var POINTER_WINDOW_EVENTS = 'pointermove pointerup pointercancel';

// IE10 has prefixed support, and case-sensitive
if (window.MSPointerEvent && !window.PointerEvent) {
    POINTER_ELEMENT_EVENTS = 'MSPointerDown';
    POINTER_WINDOW_EVENTS = 'MSPointerMove MSPointerUp MSPointerCancel';
}

/**
 * Pointer events input
 * @constructor
 * @extends Input
 */
function PointerEventInput() {
    this.evEl = POINTER_ELEMENT_EVENTS;
    this.evWin = POINTER_WINDOW_EVENTS;

    Input.apply(this, arguments);

    this.store = (this.manager.session.pointerEvents = []);
}

inherit(PointerEventInput, Input, {
    /**
     * handle mouse events
     * @param {Object} ev
     */
    handler: function PEhandler(ev) {
        var store = this.store;
        var removePointer = false;

        var eventTypeNormalized = ev.type.toLowerCase().replace('ms', '');
        var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
        var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;

        var isTouch = (pointerType == INPUT_TYPE_TOUCH);

        // get index of the event in the store
        var storeIndex = inArray(store, ev.pointerId, 'pointerId');

        // start and mouse must be down
        if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
            if (storeIndex < 0) {
                store.push(ev);
                storeIndex = store.length - 1;
            }
        } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
            removePointer = true;
        }

        // it not found, so the pointer hasn't been down (so it's probably a hover)
        if (storeIndex < 0) {
            return;
        }

        // update the event in the store
        store[storeIndex] = ev;

        this.callback(this.manager, eventType, {
            pointers: store,
            changedPointers: [ev],
            pointerType: pointerType,
            srcEvent: ev
        });

        if (removePointer) {
            // remove from the store
            store.splice(storeIndex, 1);
        }
    }
});

var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var SINGLE_TOUCH_TARGET_EVENTS = 'touchstart';
var SINGLE_TOUCH_WINDOW_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Touch events input
 * @constructor
 * @extends Input
 */
function SingleTouchInput() {
    this.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
    this.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
    this.started = false;

    Input.apply(this, arguments);
}

inherit(SingleTouchInput, Input, {
    handler: function TEhandler(ev) {
        var type = SINGLE_TOUCH_INPUT_MAP[ev.type];

        // should we handle the touch events?
        if (type === INPUT_START) {
            this.started = true;
        }

        if (!this.started) {
            return;
        }

        var touches = normalizeSingleTouches.call(this, ev, type);

        // when done, reset the started state
        if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
            this.started = false;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);

    if (type & (INPUT_END | INPUT_CANCEL)) {
        all = uniqueArray(all.concat(changed), 'identifier', true);
    }

    return [all, changed];
}

var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
};

var TOUCH_TARGET_EVENTS = 'touchstart touchmove touchend touchcancel';

/**
 * Multi-user touch events input
 * @constructor
 * @extends Input
 */
function TouchInput() {
    this.evTarget = TOUCH_TARGET_EVENTS;
    this.targetIds = {};

    Input.apply(this, arguments);
}

inherit(TouchInput, Input, {
    handler: function MTEhandler(ev) {
        var type = TOUCH_INPUT_MAP[ev.type];
        var touches = getTouches.call(this, ev, type);
        if (!touches) {
            return;
        }

        this.callback(this.manager, type, {
            pointers: touches[0],
            changedPointers: touches[1],
            pointerType: INPUT_TYPE_TOUCH,
            srcEvent: ev
        });
    }
});

/**
 * @this {TouchInput}
 * @param {Object} ev
 * @param {Number} type flag
 * @returns {undefined|Array} [all, changed]
 */
function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;

    // when there is only one touch, the process can be simplified
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
        targetIds[allTouches[0].identifier] = true;
        return [allTouches, allTouches];
    }

    var i,
        targetTouches,
        changedTouches = toArray(ev.changedTouches),
        changedTargetTouches = [],
        target = this.target;

    // get target touches from touches
    targetTouches = allTouches.filter(function(touch) {
        return hasParent(touch.target, target);
    });

    // collect touches
    if (type === INPUT_START) {
        i = 0;
        while (i < targetTouches.length) {
            targetIds[targetTouches[i].identifier] = true;
            i++;
        }
    }

    // filter changed touches to only contain touches that exist in the collected target ids
    i = 0;
    while (i < changedTouches.length) {
        if (targetIds[changedTouches[i].identifier]) {
            changedTargetTouches.push(changedTouches[i]);
        }

        // cleanup removed touches
        if (type & (INPUT_END | INPUT_CANCEL)) {
            delete targetIds[changedTouches[i].identifier];
        }
        i++;
    }

    if (!changedTargetTouches.length) {
        return;
    }

    return [
        // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
        uniqueArray(targetTouches.concat(changedTargetTouches), 'identifier', true),
        changedTargetTouches
    ];
}

/**
 * Combined touch and mouse input
 *
 * Touch has a higher priority then mouse, and while touching no mouse events are allowed.
 * This because touch devices also emit mouse events while doing a touch.
 *
 * @constructor
 * @extends Input
 */

var DEDUP_TIMEOUT = 2500;
var DEDUP_DISTANCE = 25;

function TouchMouseInput() {
    Input.apply(this, arguments);

    var handler = bindFn(this.handler, this);
    this.touch = new TouchInput(this.manager, handler);
    this.mouse = new MouseInput(this.manager, handler);

    this.primaryTouch = null;
    this.lastTouches = [];
}

inherit(TouchMouseInput, Input, {
    /**
     * handle mouse and touch events
     * @param {Hammer} manager
     * @param {String} inputEvent
     * @param {Object} inputData
     */
    handler: function TMEhandler(manager, inputEvent, inputData) {
        var isTouch = (inputData.pointerType == INPUT_TYPE_TOUCH),
            isMouse = (inputData.pointerType == INPUT_TYPE_MOUSE);

        if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
        }

        // when we're in a touch event, record touches to  de-dupe synthetic mouse event
        if (isTouch) {
            recordTouches.call(this, inputEvent, inputData);
        } else if (isMouse && isSyntheticEvent.call(this, inputData)) {
            return;
        }

        this.callback(manager, inputEvent, inputData);
    },

    /**
     * remove the event listeners
     */
    destroy: function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
    }
});

function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
        this.primaryTouch = eventData.changedPointers[0].identifier;
        setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        setLastTouch.call(this, eventData);
    }
}

function setLastTouch(eventData) {
    var touch = eventData.changedPointers[0];

    if (touch.identifier === this.primaryTouch) {
        var lastTouch = {x: touch.clientX, y: touch.clientY};
        this.lastTouches.push(lastTouch);
        var lts = this.lastTouches;
        var removeLastTouch = function() {
            var i = lts.indexOf(lastTouch);
            if (i > -1) {
                lts.splice(i, 1);
            }
        };
        setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
}

function isSyntheticEvent(eventData) {
    var x = eventData.srcEvent.clientX, y = eventData.srcEvent.clientY;
    for (var i = 0; i < this.lastTouches.length; i++) {
        var t = this.lastTouches[i];
        var dx = Math.abs(x - t.x), dy = Math.abs(y - t.y);
        if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
            return true;
        }
    }
    return false;
}

var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, 'touchAction');
var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== undefined;

// magical touchAction value
var TOUCH_ACTION_COMPUTE = 'compute';
var TOUCH_ACTION_AUTO = 'auto';
var TOUCH_ACTION_MANIPULATION = 'manipulation'; // not implemented
var TOUCH_ACTION_NONE = 'none';
var TOUCH_ACTION_PAN_X = 'pan-x';
var TOUCH_ACTION_PAN_Y = 'pan-y';
var TOUCH_ACTION_MAP = getTouchActionProps();

/**
 * Touch Action
 * sets the touchAction property or uses the js alternative
 * @param {Manager} manager
 * @param {String} value
 * @constructor
 */
function TouchAction(manager, value) {
    this.manager = manager;
    this.set(value);
}

TouchAction.prototype = {
    /**
     * set the touchAction value on the element or enable the polyfill
     * @param {String} value
     */
    set: function(value) {
        // find out the touch-action by the event handlers
        if (value == TOUCH_ACTION_COMPUTE) {
            value = this.compute();
        }

        if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
            this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
        }
        this.actions = value.toLowerCase().trim();
    },

    /**
     * just re-set the touchAction value
     */
    update: function() {
        this.set(this.manager.options.touchAction);
    },

    /**
     * compute the value for the touchAction property based on the recognizer's settings
     * @returns {String} value
     */
    compute: function() {
        var actions = [];
        each(this.manager.recognizers, function(recognizer) {
            if (boolOrFn(recognizer.options.enable, [recognizer])) {
                actions = actions.concat(recognizer.getTouchAction());
            }
        });
        return cleanTouchActions(actions.join(' '));
    },

    /**
     * this method is called on each input cycle and provides the preventing of the browser behavior
     * @param {Object} input
     */
    preventDefaults: function(input) {
        var srcEvent = input.srcEvent;
        var direction = input.offsetDirection;

        // if the touch action did prevented once this session
        if (this.manager.session.prevented) {
            srcEvent.preventDefault();
            return;
        }

        var actions = this.actions;
        var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
        var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
        var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];

        if (hasNone) {
            //do not prevent defaults if this is a tap gesture

            var isTapPointer = input.pointers.length === 1;
            var isTapMovement = input.distance < 2;
            var isTapTouchTime = input.deltaTime < 250;

            if (isTapPointer && isTapMovement && isTapTouchTime) {
                return;
            }
        }

        if (hasPanX && hasPanY) {
            // `pan-x pan-y` means browser handles all scrolling/panning, do not prevent
            return;
        }

        if (hasNone ||
            (hasPanY && direction & DIRECTION_HORIZONTAL) ||
            (hasPanX && direction & DIRECTION_VERTICAL)) {
            return this.preventSrc(srcEvent);
        }
    },

    /**
     * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
     * @param {Object} srcEvent
     */
    preventSrc: function(srcEvent) {
        this.manager.session.prevented = true;
        srcEvent.preventDefault();
    }
};

/**
 * when the touchActions are collected they are not a valid value, so we need to clean things up. *
 * @param {String} actions
 * @returns {*}
 */
function cleanTouchActions(actions) {
    // none
    if (inStr(actions, TOUCH_ACTION_NONE)) {
        return TOUCH_ACTION_NONE;
    }

    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);

    // if both pan-x and pan-y are set (different recognizers
    // for different directions, e.g. horizontal pan but vertical swipe?)
    // we need none (as otherwise with pan-x pan-y combined none of these
    // recognizers will work, since the browser would handle all panning
    if (hasPanX && hasPanY) {
        return TOUCH_ACTION_NONE;
    }

    // pan-x OR pan-y
    if (hasPanX || hasPanY) {
        return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }

    // manipulation
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
        return TOUCH_ACTION_MANIPULATION;
    }

    return TOUCH_ACTION_AUTO;
}

function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
        return false;
    }
    var touchMap = {};
    var cssSupports = window.CSS && window.CSS.supports;
    ['auto', 'manipulation', 'pan-y', 'pan-x', 'pan-x pan-y', 'none'].forEach(function(val) {

        // If css.supports is not supported but there is native touch-action assume it supports
        // all values. This is the case for IE 10 and 11.
        touchMap[val] = cssSupports ? window.CSS.supports('touch-action', val) : true;
    });
    return touchMap;
}

/**
 * Recognizer flow explained; *
 * All recognizers have the initial state of POSSIBLE when a input session starts.
 * The definition of a input session is from the first input until the last input, with all it's movement in it. *
 * Example session for mouse-input: mousedown -> mousemove -> mouseup
 *
 * On each recognizing cycle (see Manager.recognize) the .recognize() method is executed
 * which determines with state it should be.
 *
 * If the recognizer has the state FAILED, CANCELLED or RECOGNIZED (equals ENDED), it is reset to
 * POSSIBLE to give it another change on the next cycle.
 *
 *               Possible
 *                  |
 *            +-----+---------------+
 *            |                     |
 *      +-----+-----+               |
 *      |           |               |
 *   Failed      Cancelled          |
 *                          +-------+------+
 *                          |              |
 *                      Recognized       Began
 *                                         |
 *                                      Changed
 *                                         |
 *                                  Ended/Recognized
 */
var STATE_POSSIBLE = 1;
var STATE_BEGAN = 2;
var STATE_CHANGED = 4;
var STATE_ENDED = 8;
var STATE_RECOGNIZED = STATE_ENDED;
var STATE_CANCELLED = 16;
var STATE_FAILED = 32;

/**
 * Recognizer
 * Every recognizer needs to extend from this class.
 * @constructor
 * @param {Object} options
 */
function Recognizer(options) {
    this.options = assign({}, this.defaults, options || {});

    this.id = uniqueId();

    this.manager = null;

    // default is enable true
    this.options.enable = ifUndefined(this.options.enable, true);

    this.state = STATE_POSSIBLE;

    this.simultaneous = {};
    this.requireFail = [];
}

Recognizer.prototype = {
    /**
     * @virtual
     * @type {Object}
     */
    defaults: {},

    /**
     * set options
     * @param {Object} options
     * @return {Recognizer}
     */
    set: function(options) {
        assign(this.options, options);

        // also update the touchAction, in case something changed about the directions/enabled state
        this.manager && this.manager.touchAction.update();
        return this;
    },

    /**
     * recognize simultaneous with an other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    recognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'recognizeWith', this)) {
            return this;
        }

        var simultaneous = this.simultaneous;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (!simultaneous[otherRecognizer.id]) {
            simultaneous[otherRecognizer.id] = otherRecognizer;
            otherRecognizer.recognizeWith(this);
        }
        return this;
    },

    /**
     * drop the simultaneous link. it doesnt remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRecognizeWith: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRecognizeWith', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        delete this.simultaneous[otherRecognizer.id];
        return this;
    },

    /**
     * recognizer can only run when an other is failing
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    requireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'requireFailure', this)) {
            return this;
        }

        var requireFail = this.requireFail;
        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        if (inArray(requireFail, otherRecognizer) === -1) {
            requireFail.push(otherRecognizer);
            otherRecognizer.requireFailure(this);
        }
        return this;
    },

    /**
     * drop the requireFailure link. it does not remove the link on the other recognizer.
     * @param {Recognizer} otherRecognizer
     * @returns {Recognizer} this
     */
    dropRequireFailure: function(otherRecognizer) {
        if (invokeArrayArg(otherRecognizer, 'dropRequireFailure', this)) {
            return this;
        }

        otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
        var index = inArray(this.requireFail, otherRecognizer);
        if (index > -1) {
            this.requireFail.splice(index, 1);
        }
        return this;
    },

    /**
     * has require failures boolean
     * @returns {boolean}
     */
    hasRequireFailures: function() {
        return this.requireFail.length > 0;
    },

    /**
     * if the recognizer can recognize simultaneous with an other recognizer
     * @param {Recognizer} otherRecognizer
     * @returns {Boolean}
     */
    canRecognizeWith: function(otherRecognizer) {
        return !!this.simultaneous[otherRecognizer.id];
    },

    /**
     * You should use `tryEmit` instead of `emit` directly to check
     * that all the needed recognizers has failed before emitting.
     * @param {Object} input
     */
    emit: function(input) {
        var self = this;
        var state = this.state;

        function emit(event) {
            self.manager.emit(event, input);
        }

        // 'panstart' and 'panmove'
        if (state < STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }

        emit(self.options.event); // simple 'eventName' events

        if (input.additionalEvent) { // additional event(panleft, panright, pinchin, pinchout...)
            emit(input.additionalEvent);
        }

        // panend and pancancel
        if (state >= STATE_ENDED) {
            emit(self.options.event + stateStr(state));
        }
    },

    /**
     * Check that all the require failure recognizers has failed,
     * if true, it emits a gesture event,
     * otherwise, setup the state to FAILED.
     * @param {Object} input
     */
    tryEmit: function(input) {
        if (this.canEmit()) {
            return this.emit(input);
        }
        // it's failing anyway
        this.state = STATE_FAILED;
    },

    /**
     * can we emit?
     * @returns {boolean}
     */
    canEmit: function() {
        var i = 0;
        while (i < this.requireFail.length) {
            if (!(this.requireFail[i].state & (STATE_FAILED | STATE_POSSIBLE))) {
                return false;
            }
            i++;
        }
        return true;
    },

    /**
     * update the recognizer
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        // make a new copy of the inputData
        // so we can change the inputData without messing up the other recognizers
        var inputDataClone = assign({}, inputData);

        // is is enabled and allow recognizing?
        if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
            this.reset();
            this.state = STATE_FAILED;
            return;
        }

        // reset when we've reached the end
        if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
            this.state = STATE_POSSIBLE;
        }

        this.state = this.process(inputDataClone);

        // the recognizer has recognized a gesture
        // so trigger an event
        if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
            this.tryEmit(inputDataClone);
        }
    },

    /**
     * return the state of the recognizer
     * the actual recognizing happens in this method
     * @virtual
     * @param {Object} inputData
     * @returns {Const} STATE
     */
    process: function(inputData) { }, // jshint ignore:line

    /**
     * return the preferred touch-action
     * @virtual
     * @returns {Array}
     */
    getTouchAction: function() { },

    /**
     * called when the gesture isn't allowed to recognize
     * like when another is being recognized or it is disabled
     * @virtual
     */
    reset: function() { }
};

/**
 * get a usable string, used as event postfix
 * @param {Const} state
 * @returns {String} state
 */
function stateStr(state) {
    if (state & STATE_CANCELLED) {
        return 'cancel';
    } else if (state & STATE_ENDED) {
        return 'end';
    } else if (state & STATE_CHANGED) {
        return 'move';
    } else if (state & STATE_BEGAN) {
        return 'start';
    }
    return '';
}

/**
 * direction cons to string
 * @param {Const} direction
 * @returns {String}
 */
function directionStr(direction) {
    if (direction == DIRECTION_DOWN) {
        return 'down';
    } else if (direction == DIRECTION_UP) {
        return 'up';
    } else if (direction == DIRECTION_LEFT) {
        return 'left';
    } else if (direction == DIRECTION_RIGHT) {
        return 'right';
    }
    return '';
}

/**
 * get a recognizer by name if it is bound to a manager
 * @param {Recognizer|String} otherRecognizer
 * @param {Recognizer} recognizer
 * @returns {Recognizer}
 */
function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
        return manager.get(otherRecognizer);
    }
    return otherRecognizer;
}

/**
 * This recognizer is just used as a base for the simple attribute recognizers.
 * @constructor
 * @extends Recognizer
 */
function AttrRecognizer() {
    Recognizer.apply(this, arguments);
}

inherit(AttrRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof AttrRecognizer
     */
    defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
    },

    /**
     * Used to check if it the recognizer receives valid input, like input.distance > 10.
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {Boolean} recognized
     */
    attrTest: function(input) {
        var optionPointers = this.options.pointers;
        return optionPointers === 0 || input.pointers.length === optionPointers;
    },

    /**
     * Process the input and return the state for the recognizer
     * @memberof AttrRecognizer
     * @param {Object} input
     * @returns {*} State
     */
    process: function(input) {
        var state = this.state;
        var eventType = input.eventType;

        var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
        var isValid = this.attrTest(input);

        // on cancel input and we've recognized before, return STATE_CANCELLED
        if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
            return state | STATE_CANCELLED;
        } else if (isRecognized || isValid) {
            if (eventType & INPUT_END) {
                return state | STATE_ENDED;
            } else if (!(state & STATE_BEGAN)) {
                return STATE_BEGAN;
            }
            return state | STATE_CHANGED;
        }
        return STATE_FAILED;
    }
});

/**
 * Pan
 * Recognized when the pointer is down and moved in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function PanRecognizer() {
    AttrRecognizer.apply(this, arguments);

    this.pX = null;
    this.pY = null;
}

inherit(PanRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PanRecognizer
     */
    defaults: {
        event: 'pan',
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
    },

    getTouchAction: function() {
        var direction = this.options.direction;
        var actions = [];
        if (direction & DIRECTION_HORIZONTAL) {
            actions.push(TOUCH_ACTION_PAN_Y);
        }
        if (direction & DIRECTION_VERTICAL) {
            actions.push(TOUCH_ACTION_PAN_X);
        }
        return actions;
    },

    directionTest: function(input) {
        var options = this.options;
        var hasMoved = true;
        var distance = input.distance;
        var direction = input.direction;
        var x = input.deltaX;
        var y = input.deltaY;

        // lock to axis?
        if (!(direction & options.direction)) {
            if (options.direction & DIRECTION_HORIZONTAL) {
                direction = (x === 0) ? DIRECTION_NONE : (x < 0) ? DIRECTION_LEFT : DIRECTION_RIGHT;
                hasMoved = x != this.pX;
                distance = Math.abs(input.deltaX);
            } else {
                direction = (y === 0) ? DIRECTION_NONE : (y < 0) ? DIRECTION_UP : DIRECTION_DOWN;
                hasMoved = y != this.pY;
                distance = Math.abs(input.deltaY);
            }
        }
        input.direction = direction;
        return hasMoved && distance > options.threshold && direction & options.direction;
    },

    attrTest: function(input) {
        return AttrRecognizer.prototype.attrTest.call(this, input) &&
            (this.state & STATE_BEGAN || (!(this.state & STATE_BEGAN) && this.directionTest(input)));
    },

    emit: function(input) {

        this.pX = input.deltaX;
        this.pY = input.deltaY;

        var direction = directionStr(input.direction);

        if (direction) {
            input.additionalEvent = this.options.event + direction;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Pinch
 * Recognized when two or more pointers are moving toward (zoom-in) or away from each other (zoom-out).
 * @constructor
 * @extends AttrRecognizer
 */
function PinchRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(PinchRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'pinch',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    },

    emit: function(input) {
        if (input.scale !== 1) {
            var inOut = input.scale < 1 ? 'in' : 'out';
            input.additionalEvent = this.options.event + inOut;
        }
        this._super.emit.call(this, input);
    }
});

/**
 * Press
 * Recognized when the pointer is down for x ms without any movement.
 * @constructor
 * @extends Recognizer
 */
function PressRecognizer() {
    Recognizer.apply(this, arguments);

    this._timer = null;
    this._input = null;
}

inherit(PressRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PressRecognizer
     */
    defaults: {
        event: 'press',
        pointers: 1,
        time: 251, // minimal time of the pointer to be pressed
        threshold: 9 // a minimal movement is ok, but keep it low
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_AUTO];
    },

    process: function(input) {
        var options = this.options;
        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTime = input.deltaTime > options.time;

        this._input = input;

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (!validMovement || !validPointers || (input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime)) {
            this.reset();
        } else if (input.eventType & INPUT_START) {
            this.reset();
            this._timer = setTimeoutContext(function() {
                this.state = STATE_RECOGNIZED;
                this.tryEmit();
            }, options.time, this);
        } else if (input.eventType & INPUT_END) {
            return STATE_RECOGNIZED;
        }
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function(input) {
        if (this.state !== STATE_RECOGNIZED) {
            return;
        }

        if (input && (input.eventType & INPUT_END)) {
            this.manager.emit(this.options.event + 'up', input);
        } else {
            this._input.timeStamp = now();
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Rotate
 * Recognized when two or more pointer are moving in a circular motion.
 * @constructor
 * @extends AttrRecognizer
 */
function RotateRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(RotateRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof RotateRecognizer
     */
    defaults: {
        event: 'rotate',
        threshold: 0,
        pointers: 2
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_NONE];
    },

    attrTest: function(input) {
        return this._super.attrTest.call(this, input) &&
            (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    }
});

/**
 * Swipe
 * Recognized when the pointer is moving fast (velocity), with enough distance in the allowed direction.
 * @constructor
 * @extends AttrRecognizer
 */
function SwipeRecognizer() {
    AttrRecognizer.apply(this, arguments);
}

inherit(SwipeRecognizer, AttrRecognizer, {
    /**
     * @namespace
     * @memberof SwipeRecognizer
     */
    defaults: {
        event: 'swipe',
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
    },

    getTouchAction: function() {
        return PanRecognizer.prototype.getTouchAction.call(this);
    },

    attrTest: function(input) {
        var direction = this.options.direction;
        var velocity;

        if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
            velocity = input.overallVelocity;
        } else if (direction & DIRECTION_HORIZONTAL) {
            velocity = input.overallVelocityX;
        } else if (direction & DIRECTION_VERTICAL) {
            velocity = input.overallVelocityY;
        }

        return this._super.attrTest.call(this, input) &&
            direction & input.offsetDirection &&
            input.distance > this.options.threshold &&
            input.maxPointers == this.options.pointers &&
            abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    },

    emit: function(input) {
        var direction = directionStr(input.offsetDirection);
        if (direction) {
            this.manager.emit(this.options.event + direction, input);
        }

        this.manager.emit(this.options.event, input);
    }
});

/**
 * A tap is ecognized when the pointer is doing a small tap/click. Multiple taps are recognized if they occur
 * between the given interval and position. The delay option can be used to recognize multi-taps without firing
 * a single tap.
 *
 * The eventData from the emitted event contains the property `tapCount`, which contains the amount of
 * multi-taps being recognized.
 * @constructor
 * @extends Recognizer
 */
function TapRecognizer() {
    Recognizer.apply(this, arguments);

    // previous time and center,
    // used for tap counting
    this.pTime = false;
    this.pCenter = false;

    this._timer = null;
    this._input = null;
    this.count = 0;
}

inherit(TapRecognizer, Recognizer, {
    /**
     * @namespace
     * @memberof PinchRecognizer
     */
    defaults: {
        event: 'tap',
        pointers: 1,
        taps: 1,
        interval: 300, // max time between the multi-tap taps
        time: 250, // max time of the pointer to be down (like finger on the screen)
        threshold: 9, // a minimal movement is ok, but keep it low
        posThreshold: 10 // a multi-tap can be a bit off the initial position
    },

    getTouchAction: function() {
        return [TOUCH_ACTION_MANIPULATION];
    },

    process: function(input) {
        var options = this.options;

        var validPointers = input.pointers.length === options.pointers;
        var validMovement = input.distance < options.threshold;
        var validTouchTime = input.deltaTime < options.time;

        this.reset();

        if ((input.eventType & INPUT_START) && (this.count === 0)) {
            return this.failTimeout();
        }

        // we only allow little movement
        // and we've reached an end event, so a tap is possible
        if (validMovement && validTouchTime && validPointers) {
            if (input.eventType != INPUT_END) {
                return this.failTimeout();
            }

            var validInterval = this.pTime ? (input.timeStamp - this.pTime < options.interval) : true;
            var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options.posThreshold;

            this.pTime = input.timeStamp;
            this.pCenter = input.center;

            if (!validMultiTap || !validInterval) {
                this.count = 1;
            } else {
                this.count += 1;
            }

            this._input = input;

            // if tap count matches we have recognized it,
            // else it has began recognizing...
            var tapCount = this.count % options.taps;
            if (tapCount === 0) {
                // no failing requirements, immediately trigger the tap event
                // or wait as long as the multitap interval to trigger
                if (!this.hasRequireFailures()) {
                    return STATE_RECOGNIZED;
                } else {
                    this._timer = setTimeoutContext(function() {
                        this.state = STATE_RECOGNIZED;
                        this.tryEmit();
                    }, options.interval, this);
                    return STATE_BEGAN;
                }
            }
        }
        return STATE_FAILED;
    },

    failTimeout: function() {
        this._timer = setTimeoutContext(function() {
            this.state = STATE_FAILED;
        }, this.options.interval, this);
        return STATE_FAILED;
    },

    reset: function() {
        clearTimeout(this._timer);
    },

    emit: function() {
        if (this.state == STATE_RECOGNIZED) {
            this._input.tapCount = this.count;
            this.manager.emit(this.options.event, this._input);
        }
    }
});

/**
 * Simple way to create a manager with a default set of recognizers.
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Hammer(element, options) {
    options = options || {};
    options.recognizers = ifUndefined(options.recognizers, Hammer.defaults.preset);
    return new Manager(element, options);
}

/**
 * @const {string}
 */
Hammer.VERSION = '2.0.7';

/**
 * default settings
 * @namespace
 */
Hammer.defaults = {
    /**
     * set if DOM events are being triggered.
     * But this is slower and unused by simple implementations, so disabled by default.
     * @type {Boolean}
     * @default false
     */
    domEvents: false,

    /**
     * The value for the touchAction property/fallback.
     * When set to `compute` it will magically set the correct value based on the added recognizers.
     * @type {String}
     * @default compute
     */
    touchAction: TOUCH_ACTION_COMPUTE,

    /**
     * @type {Boolean}
     * @default true
     */
    enable: true,

    /**
     * EXPERIMENTAL FEATURE -- can be removed/changed
     * Change the parent input target element.
     * If Null, then it is being set the to main element.
     * @type {Null|EventTarget}
     * @default null
     */
    inputTarget: null,

    /**
     * force an input class
     * @type {Null|Function}
     * @default null
     */
    inputClass: null,

    /**
     * Default recognizer setup when calling `Hammer()`
     * When creating a new Manager these will be skipped.
     * @type {Array}
     */
    preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [RotateRecognizer, {enable: false}],
        [PinchRecognizer, {enable: false}, ['rotate']],
        [SwipeRecognizer, {direction: DIRECTION_HORIZONTAL}],
        [PanRecognizer, {direction: DIRECTION_HORIZONTAL}, ['swipe']],
        [TapRecognizer],
        [TapRecognizer, {event: 'doubletap', taps: 2}, ['tap']],
        [PressRecognizer]
    ],

    /**
     * Some CSS properties can be used to improve the working of Hammer.
     * Add them to this method and they will be set when creating a new Manager.
     * @namespace
     */
    cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: 'none',

        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: 'none',

        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: 'none',

        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: 'none',

        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: 'none',

        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: 'rgba(0,0,0,0)'
    }
};

var STOP = 1;
var FORCED_STOP = 2;

/**
 * Manager
 * @param {HTMLElement} element
 * @param {Object} [options]
 * @constructor
 */
function Manager(element, options) {
    this.options = assign({}, Hammer.defaults, options || {});

    this.options.inputTarget = this.options.inputTarget || element;

    this.handlers = {};
    this.session = {};
    this.recognizers = [];
    this.oldCssProps = {};

    this.element = element;
    this.input = createInputInstance(this);
    this.touchAction = new TouchAction(this, this.options.touchAction);

    toggleCssProps(this, true);

    each(this.options.recognizers, function(item) {
        var recognizer = this.add(new (item[0])(item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
    }, this);
}

Manager.prototype = {
    /**
     * set options
     * @param {Object} options
     * @returns {Manager}
     */
    set: function(options) {
        assign(this.options, options);

        // Options that need a little more setup
        if (options.touchAction) {
            this.touchAction.update();
        }
        if (options.inputTarget) {
            // Clean up existing event listeners and reinitialize
            this.input.destroy();
            this.input.target = options.inputTarget;
            this.input.init();
        }
        return this;
    },

    /**
     * stop recognizing for this session.
     * This session will be discarded, when a new [input]start event is fired.
     * When forced, the recognizer cycle is stopped immediately.
     * @param {Boolean} [force]
     */
    stop: function(force) {
        this.session.stopped = force ? FORCED_STOP : STOP;
    },

    /**
     * run the recognizers!
     * called by the inputHandler function on every movement of the pointers (touches)
     * it walks through all the recognizers and tries to detect the gesture that is being made
     * @param {Object} inputData
     */
    recognize: function(inputData) {
        var session = this.session;
        if (session.stopped) {
            return;
        }

        // run the touch-action polyfill
        this.touchAction.preventDefaults(inputData);

        var recognizer;
        var recognizers = this.recognizers;

        // this holds the recognizer that is being recognized.
        // so the recognizer's state needs to be BEGAN, CHANGED, ENDED or RECOGNIZED
        // if no recognizer is detecting a thing, it is set to `null`
        var curRecognizer = session.curRecognizer;

        // reset when the last recognizer is recognized
        // or when we're in a new session
        if (!curRecognizer || (curRecognizer && curRecognizer.state & STATE_RECOGNIZED)) {
            curRecognizer = session.curRecognizer = null;
        }

        var i = 0;
        while (i < recognizers.length) {
            recognizer = recognizers[i];

            // find out if we are allowed try to recognize the input for this one.
            // 1.   allow if the session is NOT forced stopped (see the .stop() method)
            // 2.   allow if we still haven't recognized a gesture in this session, or the this recognizer is the one
            //      that is being recognized.
            // 3.   allow if the recognizer is allowed to run simultaneous with the current recognized recognizer.
            //      this can be setup with the `recognizeWith()` method on the recognizer.
            if (session.stopped !== FORCED_STOP && ( // 1
                    !curRecognizer || recognizer == curRecognizer || // 2
                    recognizer.canRecognizeWith(curRecognizer))) { // 3
                recognizer.recognize(inputData);
            } else {
                recognizer.reset();
            }

            // if the recognizer has been recognizing the input as a valid gesture, we want to store this one as the
            // current active recognizer. but only if we don't already have an active recognizer
            if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
                curRecognizer = session.curRecognizer = recognizer;
            }
            i++;
        }
    },

    /**
     * get a recognizer by its event name.
     * @param {Recognizer|String} recognizer
     * @returns {Recognizer|Null}
     */
    get: function(recognizer) {
        if (recognizer instanceof Recognizer) {
            return recognizer;
        }

        var recognizers = this.recognizers;
        for (var i = 0; i < recognizers.length; i++) {
            if (recognizers[i].options.event == recognizer) {
                return recognizers[i];
            }
        }
        return null;
    },

    /**
     * add a recognizer to the manager
     * existing recognizers with the same event name will be removed
     * @param {Recognizer} recognizer
     * @returns {Recognizer|Manager}
     */
    add: function(recognizer) {
        if (invokeArrayArg(recognizer, 'add', this)) {
            return this;
        }

        // remove existing
        var existing = this.get(recognizer.options.event);
        if (existing) {
            this.remove(existing);
        }

        this.recognizers.push(recognizer);
        recognizer.manager = this;

        this.touchAction.update();
        return recognizer;
    },

    /**
     * remove a recognizer by name or instance
     * @param {Recognizer|String} recognizer
     * @returns {Manager}
     */
    remove: function(recognizer) {
        if (invokeArrayArg(recognizer, 'remove', this)) {
            return this;
        }

        recognizer = this.get(recognizer);

        // let's make sure this recognizer exists
        if (recognizer) {
            var recognizers = this.recognizers;
            var index = inArray(recognizers, recognizer);

            if (index !== -1) {
                recognizers.splice(index, 1);
                this.touchAction.update();
            }
        }

        return this;
    },

    /**
     * bind event
     * @param {String} events
     * @param {Function} handler
     * @returns {EventEmitter} this
     */
    on: function(events, handler) {
        if (events === undefined) {
            return;
        }
        if (handler === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
        });
        return this;
    },

    /**
     * unbind event, leave emit blank to remove all handlers
     * @param {String} events
     * @param {Function} [handler]
     * @returns {EventEmitter} this
     */
    off: function(events, handler) {
        if (events === undefined) {
            return;
        }

        var handlers = this.handlers;
        each(splitStr(events), function(event) {
            if (!handler) {
                delete handlers[event];
            } else {
                handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
            }
        });
        return this;
    },

    /**
     * emit event to the listeners
     * @param {String} event
     * @param {Object} data
     */
    emit: function(event, data) {
        // we also want to trigger dom events
        if (this.options.domEvents) {
            triggerDomEvent(event, data);
        }

        // no handlers, so skip it all
        var handlers = this.handlers[event] && this.handlers[event].slice();
        if (!handlers || !handlers.length) {
            return;
        }

        data.type = event;
        data.preventDefault = function() {
            data.srcEvent.preventDefault();
        };

        var i = 0;
        while (i < handlers.length) {
            handlers[i](data);
            i++;
        }
    },

    /**
     * destroy the manager and unbinds all events
     * it doesn't unbind dom events, that is the user own responsibility
     */
    destroy: function() {
        this.element && toggleCssProps(this, false);

        this.handlers = {};
        this.session = {};
        this.input.destroy();
        this.element = null;
    }
};

/**
 * add/remove the css properties as defined in manager.options.cssProps
 * @param {Manager} manager
 * @param {Boolean} add
 */
function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
        return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
        prop = prefixed(element.style, name);
        if (add) {
            manager.oldCssProps[prop] = element.style[prop];
            element.style[prop] = value;
        } else {
            element.style[prop] = manager.oldCssProps[prop] || '';
        }
    });
    if (!add) {
        manager.oldCssProps = {};
    }
}

/**
 * trigger dom event
 * @param {String} event
 * @param {Object} data
 */
function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent('Event');
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
}

assign(Hammer, {
    INPUT_START: INPUT_START,
    INPUT_MOVE: INPUT_MOVE,
    INPUT_END: INPUT_END,
    INPUT_CANCEL: INPUT_CANCEL,

    STATE_POSSIBLE: STATE_POSSIBLE,
    STATE_BEGAN: STATE_BEGAN,
    STATE_CHANGED: STATE_CHANGED,
    STATE_ENDED: STATE_ENDED,
    STATE_RECOGNIZED: STATE_RECOGNIZED,
    STATE_CANCELLED: STATE_CANCELLED,
    STATE_FAILED: STATE_FAILED,

    DIRECTION_NONE: DIRECTION_NONE,
    DIRECTION_LEFT: DIRECTION_LEFT,
    DIRECTION_RIGHT: DIRECTION_RIGHT,
    DIRECTION_UP: DIRECTION_UP,
    DIRECTION_DOWN: DIRECTION_DOWN,
    DIRECTION_HORIZONTAL: DIRECTION_HORIZONTAL,
    DIRECTION_VERTICAL: DIRECTION_VERTICAL,
    DIRECTION_ALL: DIRECTION_ALL,

    Manager: Manager,
    Input: Input,
    TouchAction: TouchAction,

    TouchInput: TouchInput,
    MouseInput: MouseInput,
    PointerEventInput: PointerEventInput,
    TouchMouseInput: TouchMouseInput,
    SingleTouchInput: SingleTouchInput,

    Recognizer: Recognizer,
    AttrRecognizer: AttrRecognizer,
    Tap: TapRecognizer,
    Pan: PanRecognizer,
    Swipe: SwipeRecognizer,
    Pinch: PinchRecognizer,
    Rotate: RotateRecognizer,
    Press: PressRecognizer,

    on: addEventListeners,
    off: removeEventListeners,
    each: each,
    merge: merge,
    extend: extend,
    assign: assign,
    inherit: inherit,
    bindFn: bindFn,
    prefixed: prefixed
});

// this prevents errors when Hammer is loaded in the presence of an AMD
//  style loader but by script tag, not by the loader.
var freeGlobal = (typeof window !== 'undefined' ? window : (typeof self !== 'undefined' ? self : {})); // jshint ignore:line
freeGlobal.Hammer = Hammer;

if (typeof define === 'function' && define.amd) {
    define(function() {
        return Hammer;
    });
} else if (typeof module != 'undefined' && module.exports) {
    module.exports = Hammer;
} else {
    window[exportName] = Hammer;
}

})(window, document, 'Hammer');
});

var hammer$1 = interopDefault(hammer);

window.Hammer = hammer$1;

var bind = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  function bind(element, event, callback, useCapture) {
    element.addEventListener(event, callback, useCapture);
  }

  exports.default = bind;
});

var bind$1 = interopDefault(bind);

var require$$0$50 = Object.freeze({
  default: bind$1
});

var html = createCommonjsModule(function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appendChild = exports.show = exports.hide = exports.getOverlayBox = exports.createSpinnerWrapper = exports.createSpinner = exports.createOverlayBox = exports.createFrame = exports.createNextButton = exports.createPreviousButton = undefined;

  var _bind = interopDefault(require$$0$50);

  var _bind2 = _interopRequireDefault(_bind);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }

  var box = 'lightbox';

  function createPreviousButton(doc) {
    var prev = doc.createElement('button');
    prev.id = box + '-prev';
    prev.className = box + '-move-button ' + box + '-prev-button';
    prev.innerHTML = "&lt";
    prev.type = "button";
    return prev;
  }

  function createNextButton(doc) {
    var next = doc.createElement('button');
    next.id = box + '-next';
    next.className = box + '-move-button ' + box + '-next-button';
    next.innerHTML = "&gt";
    next.type = "button";
    return next;
  }

  function createSpinner(doc) {
    var spinner = doc.createElement('div');
    spinner.id = box + '-spinner';
    spinner.className = box + '-spinner';

    return spinner;
  }

  function createSpinnerWrapper(doc) {
    var wrapper = doc.createElement('div');
    wrapper.id = box + '-spinner-wrapper';
    wrapper.className = box + '-spinner-wrapper';

    return wrapper;
  }

  function createFrame(doc) {
    var frame = doc.createElement('div');
    frame.id = box + '-frame';
    frame.className = box + '-frame';

    var image = doc.createElement('img');
    image.className = box + '-frame-image';
    image.id = box + '-frame-image';

    var link = doc.createElement('a');
    link.appendChild(image);

    (0, _bind2.default)(link, 'click', function (e) {
      e.preventDefault();
    });

    frame.appendChild(link);
    return { container: frame, image: image, link: link };
  }

  function createCloseBtn() {
    var btn = document.createElement('div');
    btn.innerHTML = '<i class="fa fa-2x fa-border fa-times" aria-hidden="true"></i>';
    btn.className = box + '-close-btn';
    btn.id = box + '-close-btn';

    return btn;
  }

  function createOverlayBox(doc) {
    var overlay = doc.createElement('div');
    overlay.className = box + '-overlay';
    overlay.id = box + '-overlay';
    overlay.appendChild(createCloseBtn());
    return overlay;
  }

  function getOverlayBox(doc) {
    var overlay = doc.getElementById(box + '-overlay');
    return overlay;
  }

  function hide(el) {
    el.className = el.className.replace(' ' + box + '-hide', '') + (' ' + box + '-hide');
  }

  function show(el) {
    el.className = el.className.replace(' ' + box + '-hide', '');
  }

  function appendChild(doc, el) {
    doc.getElementsByTagName('body')[0].appendChild(el);
  }

  exports.createPreviousButton = createPreviousButton;
  exports.createNextButton = createNextButton;
  exports.createFrame = createFrame;
  exports.createOverlayBox = createOverlayBox;
  exports.createSpinner = createSpinner;
  exports.createSpinnerWrapper = createSpinnerWrapper;
  exports.getOverlayBox = getOverlayBox;
  exports.hide = hide;
  exports.show = show;
  exports.appendChild = appendChild;
});

var html$1 = interopDefault(html);
var appendChild = html.appendChild;
var show = html.show;
var hide = html.hide;
var getOverlayBox = html.getOverlayBox;
var createSpinnerWrapper = html.createSpinnerWrapper;
var createSpinner = html.createSpinner;
var createOverlayBox = html.createOverlayBox;
var createFrame = html.createFrame;
var createNextButton = html.createNextButton;
var createPreviousButton = html.createPreviousButton;

var require$$1$24 = Object.freeze({
  default: html$1,
  appendChild: appendChild,
  show: show,
  hide: hide,
  getOverlayBox: getOverlayBox,
  createSpinnerWrapper: createSpinnerWrapper,
  createSpinner: createSpinner,
  createOverlayBox: createOverlayBox,
  createFrame: createFrame,
  createNextButton: createNextButton,
  createPreviousButton: createPreviousButton
});

var avalonbox = createCommonjsModule(function (module) {
  var _html = interopDefault(require$$1$24);

  var html = _interopRequireWildcard(_html);

  var _bind = interopDefault(require$$0$50);

  var _bind2 = _interopRequireDefault(_bind);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _interopRequireWildcard(obj) {
    if (obj && obj.__esModule) {
      return obj;
    }
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          newObj[key] = obj[key];
        }
      }
    }
    newObj.default = obj;
    return newObj;
  }

  var Avalonbox = function () {
    var doc = document;
    var buttons = {};
    var overlay = html.createOverlayBox(doc);
    var frame = html.createFrame(doc);
    var spinner = html.createSpinner(doc);
    var spinnerWrapper = html.createSpinnerWrapper(doc);
    var downloadImage = new Image();
    var closeBtn = overlay.firstChild;

    var active = void 0;
    var currentLink = void 0;

    initialize();

    function initialize() {
      active = false;
      html.hide(overlay);
      html.appendChild(doc, overlay);
      buttons.prev = html.createPreviousButton(doc);
      buttons.next = html.createNextButton(doc);
      spinnerWrapper.appendChild(spinner);
      overlay.appendChild(frame.container);
      overlay.appendChild(spinnerWrapper);
      overlay.appendChild(buttons.prev);
      overlay.appendChild(buttons.next);

      (0, _bind2.default)(closeBtn, 'click', hideOverlay);
      (0, _bind2.default)(overlay, 'click', hideOverlay);
      (0, _bind2.default)(buttons.prev, 'click', previous);
      (0, _bind2.default)(buttons.next, 'click', next);
      (0, _bind2.default)(doc, 'keydown', keyPressHandler);
      swipeHandler();
    }

    function hideOverlay(e) {
      var f = frame.container;
      if (f === e.target || !f.contains(e.target)) {
        cleanFrame();
      }
    }

    function cleanFrame() {
      html.hide(overlay);
      frame.image.src = '';
      active = false;
    }

    function showOverlay(e) {
      e.preventDefault();

      active = true;
      html.show(overlay);
      currentLink = e.target.parentNode;

      loadImage();

      if (single(currentLink.parentNode.id)) {
        html.hide(buttons.prev);
        html.hide(buttons.next);
      } else {
        if (currentLink.previousElementSibling && currentLink.previousElementSibling.tagName === 'A') {
          html.show(buttons.prev);
        } else {
          html.hide(buttons.prev);
        }

        if (currentLink.nextElementSibling && currentLink.nextElementSibling.tagName === 'A') {
          html.show(buttons.next);
        } else {
          html.hide(buttons.next);
        }
      }
    }

    function next(e) {
      html.show(buttons.prev);
      if (currentLink.nextElementSibling && currentLink.nextElementSibling.tagName === 'A') {
        currentLink = currentLink.nextElementSibling;
        loadImage();
        if (currentLink.previousElementSibling && currentLink.nextElementSibling.tagName !== 'A') {
          html.hide(buttons.next);
        }
      }

      if (e) e.stopPropagation();
    }

    function previous(e) {
      html.show(buttons.next);
      if (currentLink.previousElementSibling && currentLink.previousElementSibling.tagName === 'A') {
        currentLink = currentLink.previousElementSibling;
        loadImage();
        if (currentLink.previousElementSibling && currentLink.previousElementSibling.tagName !== 'A') {
          html.hide(buttons.prev);
        }
      }

      if (e) e.stopPropagation();
    }

    function loadImage() {
      frame.image.src = '';
      html.hide(frame.image);
      html.show(spinner);
      downloadImage.onload = function () {
        html.show(frame.image);
        frame.image.src = this.src;
        html.hide(spinner);
      };

      downloadImage.src = currentLink.getAttribute('href');
      frame.link.href = currentLink.getAttribute('href');
    }

    // TODO: Swap [].slice for Array.from (ES6)
    // Need to test in IE9
    function single(query) {
      var links = doc.getElementById(query).getElementsByTagName('a');
      return [].slice.call(links).length == 1;
    }

    function run(query) {
      eventHandlers(query);
    }

    function eventHandlers(query) {
      var links = document.getElementById(query).getElementsByTagName('a');
      links = [].slice.call(links);
      links.forEach(function (link) {
        (0, _bind2.default)(link, 'click', showOverlay);
      });
    }

    function keyPressHandler(e) {
      e = e || window.event;

      if (!active) {
        return;
      }

      if (e.keyCode == '37') {
        previous(e);
      } else if (e.keyCode == '39') {
        next(e);
      } else if (e.key == 'Escape') {
        hideOverlay(e);
      }
    }

    function swipeHandler() {
      new Hammer(document.querySelector('body')).on('swipeleft', function () {
        next();
      }).on('swiperight', function () {
        previous();
      });
    }

    return { run: run };
  }();

  module.exports = Avalonbox;
});

var avalonbox$1 = interopDefault(avalonbox);

// Simple uuid function
var uuid = function b(a) {
  return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
};

function initLightBox () {
  var galleries = document.querySelectorAll('.gallery');

  for (var i = 0; i < galleries.length; i++) {
    var gallery = galleries[i];

    if (!gallery.id) gallery.id = uuid();
    avalonbox$1.run(gallery.id);
  }

  var lightboxes = document.querySelectorAll('.lightbox');

  for (var _i = 0; _i < lightboxes.length; _i++) {
    var image = lightboxes[_i];

    if (!image.id) image.id = uuid();
    avalonbox$1.run(image.id);
  }
}

var Greedy = function Greedy(options) {
  this.element = document.querySelector(options.element);
  this.counter = options.counter || false;
  this.visibleLinks = this.element.querySelector('.visible-links');
  this.toggleButton = this.element.querySelector('.toggle-links');
  this.breakpoints = [];
  this.init();
};

// window.Greedy = Greedy;

Greedy.prototype.init = function () {
  this.setupMenu();

  this.updateMenu();
  this.addBindings();
};

/*
  Creates/returns a method bounded with 'this'. Used for creating
  named event listeners that can easily be removed
*/
Greedy.prototype.bindMethod = function (name) {
  return this['_' + name + '_'] || Object.defineProperty(this, '_' + name + '_', { value: this[name].bind(this) })['_' + name + '_'];
};

/*
  Creates the necessary markup and adds the necessary classes
*/
Greedy.prototype.setupMenu = function () {
  this.hiddenLinks = document.createElement('ul');
  this.hiddenLinks.classList.add('hidden-links');
  this.hiddenLinks.classList.add('links-invisible');
  this.element.appendChild(this.hiddenLinks);
  this.visibleLinks.classList.add('visible-links');

  if (this.counter) {
    this.toggleButton.classList.add('counter');
  } else {
    this.toggleButton.classList.add('no-counter');
  }
};

/*
  For each navigation item, calculate how much space is needed
  to accomodate it
*/
Greedy.prototype.calculateBreakpoints = function () {
  var childrenWidth = 0;

  for (var i = 0; i < this.visibleLinks.children.length; i++) {
    childrenWidth += this.visibleLinks.children[i].offsetWidth;
    this.breakpoints[i] = childrenWidth;
  }
};

Greedy.prototype.addBindings = function () {
  window.addEventListener('resize', this.bindMethod('updateMenu'));
  this.toggleButton.addEventListener('click', this.bindMethod('toggleHiddenLinks'));
};

Greedy.prototype.updateMenu = function () {
  this.calculateBreakpoints();
  var availableSpace = this.element.offsetWidth - this.toggleButton.offsetWidth;
  var itemsVisible = this.visibleLinks.children.length;
  var requiredSpace = this.breakpoints[itemsVisible - 1];

  /*
    Check if there is not enough space for the visible links or
    if there is space available for the hidden link
  */
  if (availableSpace < this.breakpoints[itemsVisible - 1]) {
    this.toggleButton.classList.remove('hidden');
    this.hiddenLinks.classList.remove('hidden');

    while (availableSpace < this.breakpoints[itemsVisible - 1]) {
      this.hiddenLinks.insertBefore(this.visibleLinks.children[itemsVisible - 1], this.hiddenLinks.firstChild);
      itemsVisible--;
    }
  } else if (availableSpace > this.breakpoints[itemsVisible]) {
    while (availableSpace > this.breakpoints[itemsVisible]) {
      this.visibleLinks.appendChild(this.hiddenLinks.removeChild(this.hiddenLinks.firstChild));
      itemsVisible++;
    }
  }

  if (this.counter) {
    this.toggleButton.setAttribute('data-count', this.hiddenLinks.children.length);
    if (!this.hiddenLinks.children.length) {
      this.toggleButton.classList.add('hidden');
      this.hiddenLinks.classList.add('hidden');
    }
  }
};

Greedy.prototype.toggleHiddenLinks = function () {
  this.hiddenLinks.classList.toggle('links-invisible');
  this.toggleButton.classList.toggle('links-displayed');
};

var addActiveToCurrentNavLink = function () {
  var menuItems = Array.prototype.slice.call(document.querySelectorAll('.masthead__menu-item'));
  menuItems.shift();

  var loc = location.href.split('/')[3];

  menuItems.forEach(function (item) {
    var href = item.firstChild.href.split('/')[3];

    if (href === loc) item.classList.add('active');
  });
};

// Initialise menu
function initNav () {
  addActiveToCurrentNavLink();

  var menu = new Greedy({
    element: '.masthead__menu',
    counter: true
  });
}

// Robert Penner's easeInOutQuad

// find the rest of his easing functions here: http://robertpenner.com/easing/
// find them exported for ES6 consumption here: https://github.com/jaxgeller/ez.js

var easeInOutQuad = function (t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

var jumper = function () {
  // private variable cache
  // no variables are created during a jump, preventing memory leaks

  var element = void 0; // element to scroll to                   (node)

  var start = void 0; // where scroll starts                    (px)
  var stop = void 0; // where scroll stops                     (px)

  var offset = void 0; // adjustment from the stop position      (px)
  var easing = void 0; // easing function                        (function)
  var a11y = void 0; // accessibility support flag             (boolean)

  var distance = void 0; // distance of scroll                     (px)
  var duration = void 0; // scroll duration                        (ms)

  var timeStart = void 0; // time scroll started                    (ms)
  var timeElapsed = void 0; // time spent scrolling thus far          (ms)

  var next = void 0; // next scroll position                   (px)

  var callback = void 0; // to call when done scrolling            (function)

  // scroll position helper

  function location() {
    return window.scrollY || window.pageYOffset;
  }

  // element offset helper

  function top(element) {
    return element.getBoundingClientRect().top + start;
  }

  // rAF loop helper

  function loop(timeCurrent) {
    // store time scroll started, if not started already
    if (!timeStart) {
      timeStart = timeCurrent;
    }

    // determine time spent scrolling so far
    timeElapsed = timeCurrent - timeStart;

    // calculate next scroll position
    next = easing(timeElapsed, start, distance, duration);

    // scroll to it
    window.scrollTo(0, next);

    // check progress
    timeElapsed < duration ? window.requestAnimationFrame(loop) // continue scroll loop
    : done(); // scrolling is done
  }

  // scroll finished helper

  function done() {
    // account for rAF time rounding inaccuracies
    window.scrollTo(0, start + distance);

    // if scrolling to an element, and accessibility is enabled
    if (element && a11y) {
      // add tabindex indicating programmatic focus
      element.setAttribute('tabindex', '-1');

      // focus the element
      element.focus();
    }

    // if it exists, fire the callback
    if (typeof callback === 'function') {
      callback();
    }

    // reset time for next jump
    timeStart = false;
  }

  // API

  function jump(target) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // resolve options, or use defaults
    duration = options.duration || 1000;
    offset = options.offset || 0;
    callback = options.callback; // "undefined" is a suitable default, and won't be called
    easing = options.easing || easeInOutQuad;
    a11y = options.a11y || false;

    // cache starting position
    start = location();

    // resolve target
    switch (typeof target) {
      // scroll from current position
      case 'number':
        element = undefined; // no element to scroll to
        a11y = false; // make sure accessibility is off
        stop = start + target;
        break;

      // scroll to element (node)
      // bounding rect is relative to the viewport
      case 'object':
        element = target;
        stop = top(element);
        break;

      // scroll to element (selector)
      // bounding rect is relative to the viewport
      case 'string':
        element = document.querySelector(target);
        stop = top(element);
        break;
    }

    // resolve scroll distance, accounting for offset
    distance = stop - start + offset;

    // resolve duration
    switch (typeof options.duration) {
      // number in ms
      case 'number':
        duration = options.duration;
        break;

      // function passed the distance of the scroll
      case 'function':
        duration = options.duration(distance);
        break;
    }

    // start the loop
    window.requestAnimationFrame(loop);
  }

  // expose only the jump method
  return jump;
};

// export singleton

var singleton = jumper();

var links = document.querySelectorAll('a');

// Filename of current page
var fileName = location.href.split('/').pop().split('#')[0];

function initSmoothScroll () {

  for (var i = 0; i < links.length; i++) {
    var a = links[i];
    //check if it's a link to another location on the page
    if (~a.href.indexOf(fileName + '#')) {
      var _ret = function () {
        var link = '#' + a.href.split('#').pop();

        // if it's an empty link ('#'), just return
        if (link === '#') return {
            v: void 0
          };

        a.onclick = function () {
          return singleton(link);
        };
      }();

      if (typeof _ret === "object") return _ret.v;
    }
  }
}

var fluidVids = createCommonjsModule(function (module) {
  var fluidvids = {
    selector: ['iframe', 'object'],
    players: ['www.youtube.com', 'player.vimeo.com']
  };

  var css = ['.fluidvids {', 'width: 100%; max-width: 100%;', '}', '.fluidvids-item {', 'position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;', '}'].join('');

  var head = document.head || document.getElementsByTagName('head')[0];

  function matches(src) {
    return new RegExp('^(https?:)?\/\/(?:' + fluidvids.players.join('|') + ').*$', 'i').test(src);
  }

  function getRatio(height, width) {
    return parseInt(height, 10) / parseInt(width, 10) * 100 + '%';
  }

  function fluid(elem) {
    if (!matches(elem.src) && !matches(elem.data) || !!elem.getAttribute('data-fluidvids')) {
      return;
    }
    var wrap = document.createElement('div');
    elem.parentNode.insertBefore(wrap, elem);
    elem.className += (elem.className ? ' ' : '') + 'fluidvids-item';
    elem.setAttribute('data-fluidvids', 'loaded');
    wrap.className += 'fluidvids';
    wrap.style.paddingTop = getRatio(elem.height, elem.width);
    wrap.appendChild(elem);
  }

  function addStyles() {
    var div = document.createElement('div');
    div.innerHTML = '<p>x</p><style>' + css + '</style>';
    head.appendChild(div.childNodes[1]);
  }

  fluidvids.render = function () {
    var nodes = document.querySelectorAll(fluidvids.selector.join());
    var i = nodes.length;
    while (i--) {
      fluid(nodes[i]);
    }
  };

  fluidvids.init = function (obj) {
    for (var key in obj) {
      fluidvids[key] = obj[key];
    }
    fluidvids.render();
    addStyles();
  };

  module.exports = fluidvids;
});

var fluidvids = interopDefault(fluidVids);

function initVideos () {
  fluidvids.init({
    selector: ['iframe', 'object'], // runs querySelectorAll()
    players: ['www.youtube.com', 'player.vimeo.com'] // players to support
  });
}

initNav();

// BUG: nav left not hidden on first image
initLightBox();

initSmoothScroll();
initVideos();

}());