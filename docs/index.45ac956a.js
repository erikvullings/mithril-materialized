// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"3EvbW":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 61551;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "59eecd19e5db89f307eb962645ac956a";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"5e1eZ":[function(require,module,exports) {
require('materialize-css/dist/css/materialize.min.css');
require('material-icons/iconfont/material-icons.css');
require('mithril-materialized/dist/index.css');
var _mithril = require('mithril');
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _mithrilDefault = _parcelHelpers.interopDefault(_mithril);
var _servicesDashboardService = require('./services/dashboard-service');
_mithrilDefault.default.route(document.body, _servicesDashboardService.dashboardSvc.defaultRoute, _servicesDashboardService.dashboardSvc.routingTable);

},{"materialize-css/dist/css/materialize.min.css":"7JSYb","material-icons/iconfont/material-icons.css":"5VIxO","mithril":"3cEwr","./services/dashboard-service":"2fyQP","@parcel/transformer-js/lib/esmodule-helpers.js":"7ae6E","mithril-materialized/dist/index.css":"2P8CJ"}],"7JSYb":[function() {},{}],"5VIxO":[function() {},{}],"3cEwr":[function(require,module,exports) {
"use strict"

var hyperscript = require("./hyperscript")
var request = require("./request")
var mountRedraw = require("./mount-redraw")

var m = function m() { return hyperscript.apply(this, arguments) }
m.m = hyperscript
m.trust = hyperscript.trust
m.fragment = hyperscript.fragment
m.mount = mountRedraw.mount
m.route = require("./route")
m.render = require("./render")
m.redraw = mountRedraw.redraw
m.request = request.request
m.jsonp = request.jsonp
m.parseQueryString = require("./querystring/parse")
m.buildQueryString = require("./querystring/build")
m.parsePathname = require("./pathname/parse")
m.buildPathname = require("./pathname/build")
m.vnode = require("./render/vnode")
m.PromisePolyfill = require("./promise/polyfill")

module.exports = m

},{"./hyperscript":"2Mplw","./request":"7oykA","./mount-redraw":"4jQ9B","./route":"2I5in","./render":"3oCfs","./querystring/parse":"3xNcs","./querystring/build":"3qM0x","./pathname/parse":"4fniD","./pathname/build":"5x17O","./render/vnode":"57tq1","./promise/polyfill":"EzNno"}],"2Mplw":[function(require,module,exports) {
"use strict"

var hyperscript = require("./render/hyperscript")

hyperscript.trust = require("./render/trust")
hyperscript.fragment = require("./render/fragment")

module.exports = hyperscript

},{"./render/hyperscript":"1m9cW","./render/trust":"3wk6x","./render/fragment":"3sTd8"}],"1m9cW":[function(require,module,exports) {
"use strict"

var Vnode = require("../render/vnode")
var hyperscriptVnode = require("./hyperscriptVnode")

var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g
var selectorCache = {}
var hasOwn = {}.hasOwnProperty

function isEmpty(object) {
	for (var key in object) if (hasOwn.call(object, key)) return false
	return true
}

function compileSelector(selector) {
	var match, tag = "div", classes = [], attrs = {}
	while (match = selectorParser.exec(selector)) {
		var type = match[1], value = match[2]
		if (type === "" && value !== "") tag = value
		else if (type === "#") attrs.id = value
		else if (type === ".") classes.push(value)
		else if (match[3][0] === "[") {
			var attrValue = match[6]
			if (attrValue) attrValue = attrValue.replace(/\\(["'])/g, "$1").replace(/\\\\/g, "\\")
			if (match[4] === "class") classes.push(attrValue)
			else attrs[match[4]] = attrValue === "" ? attrValue : attrValue || true
		}
	}
	if (classes.length > 0) attrs.className = classes.join(" ")
	return selectorCache[selector] = {tag: tag, attrs: attrs}
}

function execSelector(state, vnode) {
	var attrs = vnode.attrs
	var children = Vnode.normalizeChildren(vnode.children)
	var hasClass = hasOwn.call(attrs, "class")
	var className = hasClass ? attrs.class : attrs.className

	vnode.tag = state.tag
	vnode.attrs = null
	vnode.children = undefined

	if (!isEmpty(state.attrs) && !isEmpty(attrs)) {
		var newAttrs = {}

		for (var key in attrs) {
			if (hasOwn.call(attrs, key)) newAttrs[key] = attrs[key]
		}

		attrs = newAttrs
	}

	for (var key in state.attrs) {
		if (hasOwn.call(state.attrs, key) && key !== "className" && !hasOwn.call(attrs, key)){
			attrs[key] = state.attrs[key]
		}
	}
	if (className != null || state.attrs.className != null) attrs.className =
		className != null
			? state.attrs.className != null
				? String(state.attrs.className) + " " + String(className)
				: className
			: state.attrs.className != null
				? state.attrs.className
				: null

	if (hasClass) attrs.class = null

	for (var key in attrs) {
		if (hasOwn.call(attrs, key) && key !== "key") {
			vnode.attrs = attrs
			break
		}
	}

	if (Array.isArray(children) && children.length === 1 && children[0] != null && children[0].tag === "#") {
		vnode.text = children[0].children
	} else {
		vnode.children = children
	}

	return vnode
}

function hyperscript(selector) {
	if (selector == null || typeof selector !== "string" && typeof selector !== "function" && typeof selector.view !== "function") {
		throw Error("The selector must be either a string or a component.");
	}

	var vnode = hyperscriptVnode.apply(1, arguments)

	if (typeof selector === "string") {
		vnode.children = Vnode.normalizeChildren(vnode.children)
		if (selector !== "[") return execSelector(selectorCache[selector] || compileSelector(selector), vnode)
	}

	vnode.tag = selector
	return vnode
}

module.exports = hyperscript

},{"../render/vnode":"57tq1","./hyperscriptVnode":"62yZq"}],"57tq1":[function(require,module,exports) {
"use strict"

function Vnode(tag, key, attrs, children, text, dom) {
	return {tag: tag, key: key, attrs: attrs, children: children, text: text, dom: dom, domSize: undefined, state: undefined, events: undefined, instance: undefined}
}
Vnode.normalize = function(node) {
	if (Array.isArray(node)) return Vnode("[", undefined, undefined, Vnode.normalizeChildren(node), undefined, undefined)
	if (node == null || typeof node === "boolean") return null
	if (typeof node === "object") return node
	return Vnode("#", undefined, undefined, String(node), undefined, undefined)
}
Vnode.normalizeChildren = function(input) {
	var children = []
	if (input.length) {
		var isKeyed = input[0] != null && input[0].key != null
		// Note: this is a *very* perf-sensitive check.
		// Fun fact: merging the loop like this is somehow faster than splitting
		// it, noticeably so.
		for (var i = 1; i < input.length; i++) {
			if ((input[i] != null && input[i].key != null) !== isKeyed) {
				throw new TypeError("Vnodes must either always have keys or never have keys!")
			}
		}
		for (var i = 0; i < input.length; i++) {
			children[i] = Vnode.normalize(input[i])
		}
	}
	return children
}

module.exports = Vnode

},{}],"62yZq":[function(require,module,exports) {
"use strict"

var Vnode = require("../render/vnode")

// Call via `hyperscriptVnode.apply(startOffset, arguments)`
//
// The reason I do it this way, forwarding the arguments and passing the start
// offset in `this`, is so I don't have to create a temporary array in a
// performance-critical path.
//
// In native ES6, I'd instead add a final `...args` parameter to the
// `hyperscript` and `fragment` factories and define this as
// `hyperscriptVnode(...args)`, since modern engines do optimize that away. But
// ES5 (what Mithril requires thanks to IE support) doesn't give me that luxury,
// and engines aren't nearly intelligent enough to do either of these:
//
// 1. Elide the allocation for `[].slice.call(arguments, 1)` when it's passed to
//    another function only to be indexed.
// 2. Elide an `arguments` allocation when it's passed to any function other
//    than `Function.prototype.apply` or `Reflect.apply`.
//
// In ES6, it'd probably look closer to this (I'd need to profile it, though):
// module.exports = function(attrs, ...children) {
//     if (attrs == null || typeof attrs === "object" && attrs.tag == null && !Array.isArray(attrs)) {
//         if (children.length === 1 && Array.isArray(children[0])) children = children[0]
//     } else {
//         children = children.length === 0 && Array.isArray(attrs) ? attrs : [attrs, ...children]
//         attrs = undefined
//     }
//
//     if (attrs == null) attrs = {}
//     return Vnode("", attrs.key, attrs, children)
// }
module.exports = function() {
	var attrs = arguments[this], start = this + 1, children

	if (attrs == null) {
		attrs = {}
	} else if (typeof attrs !== "object" || attrs.tag != null || Array.isArray(attrs)) {
		attrs = {}
		start = this
	}

	if (arguments.length === start + 1) {
		children = arguments[start]
		if (!Array.isArray(children)) children = [children]
	} else {
		children = []
		while (start < arguments.length) children.push(arguments[start++])
	}

	return Vnode("", attrs.key, attrs, children)
}

},{"../render/vnode":"57tq1"}],"3wk6x":[function(require,module,exports) {
"use strict"

var Vnode = require("../render/vnode")

module.exports = function(html) {
	if (html == null) html = ""
	return Vnode("<", undefined, undefined, html, undefined, undefined)
}

},{"../render/vnode":"57tq1"}],"3sTd8":[function(require,module,exports) {
"use strict"

var Vnode = require("../render/vnode")
var hyperscriptVnode = require("./hyperscriptVnode")

module.exports = function() {
	var vnode = hyperscriptVnode.apply(0, arguments)

	vnode.tag = "["
	vnode.children = Vnode.normalizeChildren(vnode.children)
	return vnode
}

},{"../render/vnode":"57tq1","./hyperscriptVnode":"62yZq"}],"7oykA":[function(require,module,exports) {
"use strict"

var PromisePolyfill = require("./promise/promise")
var mountRedraw = require("./mount-redraw")

module.exports = require("./request/request")(window, PromisePolyfill, mountRedraw.redraw)

},{"./promise/promise":"1H5tR","./mount-redraw":"4jQ9B","./request/request":"TG1au"}],"1H5tR":[function(require,module,exports) {
"use strict";
var global = arguments[3];
var PromisePolyfill = require("./polyfill");
if (typeof window !== "undefined") {
  if (typeof window.Promise === "undefined") {
    window.Promise = PromisePolyfill;
  } else if (!window.Promise.prototype.finally) {
    window.Promise.prototype.finally = PromisePolyfill.prototype.finally;
  }
  module.exports = window.Promise;
} else if (typeof global !== "undefined") {
  if (typeof global.Promise === "undefined") {
    global.Promise = PromisePolyfill;
  } else if (!global.Promise.prototype.finally) {
    global.Promise.prototype.finally = PromisePolyfill.prototype.finally;
  }
  module.exports = global.Promise;
} else {
  module.exports = PromisePolyfill;
}

},{"./polyfill":"EzNno"}],"EzNno":[function(require,module,exports) {
"use strict"
/** @constructor */
var PromisePolyfill = function(executor) {
	if (!(this instanceof PromisePolyfill)) throw new Error("Promise must be called with `new`")
	if (typeof executor !== "function") throw new TypeError("executor must be a function")

	var self = this, resolvers = [], rejectors = [], resolveCurrent = handler(resolvers, true), rejectCurrent = handler(rejectors, false)
	var instance = self._instance = {resolvers: resolvers, rejectors: rejectors}
	var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout
	function handler(list, shouldAbsorb) {
		return function execute(value) {
			var then
			try {
				if (shouldAbsorb && value != null && (typeof value === "object" || typeof value === "function") && typeof (then = value.then) === "function") {
					if (value === self) throw new TypeError("Promise can't be resolved w/ itself")
					executeOnce(then.bind(value))
				}
				else {
					callAsync(function() {
						if (!shouldAbsorb && list.length === 0) console.error("Possible unhandled promise rejection:", value)
						for (var i = 0; i < list.length; i++) list[i](value)
						resolvers.length = 0, rejectors.length = 0
						instance.state = shouldAbsorb
						instance.retry = function() {execute(value)}
					})
				}
			}
			catch (e) {
				rejectCurrent(e)
			}
		}
	}
	function executeOnce(then) {
		var runs = 0
		function run(fn) {
			return function(value) {
				if (runs++ > 0) return
				fn(value)
			}
		}
		var onerror = run(rejectCurrent)
		try {then(run(resolveCurrent), onerror)} catch (e) {onerror(e)}
	}

	executeOnce(executor)
}
PromisePolyfill.prototype.then = function(onFulfilled, onRejection) {
	var self = this, instance = self._instance
	function handle(callback, list, next, state) {
		list.push(function(value) {
			if (typeof callback !== "function") next(value)
			else try {resolveNext(callback(value))} catch (e) {if (rejectNext) rejectNext(e)}
		})
		if (typeof instance.retry === "function" && state === instance.state) instance.retry()
	}
	var resolveNext, rejectNext
	var promise = new PromisePolyfill(function(resolve, reject) {resolveNext = resolve, rejectNext = reject})
	handle(onFulfilled, instance.resolvers, resolveNext, true), handle(onRejection, instance.rejectors, rejectNext, false)
	return promise
}
PromisePolyfill.prototype.catch = function(onRejection) {
	return this.then(null, onRejection)
}
PromisePolyfill.prototype.finally = function(callback) {
	return this.then(
		function(value) {
			return PromisePolyfill.resolve(callback()).then(function() {
				return value
			})
		},
		function(reason) {
			return PromisePolyfill.resolve(callback()).then(function() {
				return PromisePolyfill.reject(reason);
			})
		}
	)
}
PromisePolyfill.resolve = function(value) {
	if (value instanceof PromisePolyfill) return value
	return new PromisePolyfill(function(resolve) {resolve(value)})
}
PromisePolyfill.reject = function(value) {
	return new PromisePolyfill(function(resolve, reject) {reject(value)})
}
PromisePolyfill.all = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		var total = list.length, count = 0, values = []
		if (list.length === 0) resolve([])
		else for (var i = 0; i < list.length; i++) {
			(function(i) {
				function consume(value) {
					count++
					values[i] = value
					if (count === total) resolve(values)
				}
				if (list[i] != null && (typeof list[i] === "object" || typeof list[i] === "function") && typeof list[i].then === "function") {
					list[i].then(consume, reject)
				}
				else consume(list[i])
			})(i)
		}
	})
}
PromisePolyfill.race = function(list) {
	return new PromisePolyfill(function(resolve, reject) {
		for (var i = 0; i < list.length; i++) {
			list[i].then(resolve, reject)
		}
	})
}

module.exports = PromisePolyfill

},{}],"4jQ9B":[function(require,module,exports) {
"use strict"

var render = require("./render")

module.exports = require("./api/mount-redraw")(render, requestAnimationFrame, console)

},{"./render":"3oCfs","./api/mount-redraw":"4i4ji"}],"3oCfs":[function(require,module,exports) {
"use strict"

module.exports = require("./render/render")(window)

},{"./render/render":"5OeUd"}],"5OeUd":[function(require,module,exports) {
"use strict"

var Vnode = require("../render/vnode")

module.exports = function($window) {
	var $doc = $window && $window.document
	var currentRedraw

	var nameSpace = {
		svg: "http://www.w3.org/2000/svg",
		math: "http://www.w3.org/1998/Math/MathML"
	}

	function getNameSpace(vnode) {
		return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag]
	}

	//sanity check to discourage people from doing `vnode.state = ...`
	function checkState(vnode, original) {
		if (vnode.state !== original) throw new Error("`vnode.state` must not be modified")
	}

	//Note: the hook is passed as the `this` argument to allow proxying the
	//arguments without requiring a full array allocation to do so. It also
	//takes advantage of the fact the current `vnode` is the first argument in
	//all lifecycle methods.
	function callHook(vnode) {
		var original = vnode.state
		try {
			return this.apply(original, arguments)
		} finally {
			checkState(vnode, original)
		}
	}

	// IE11 (at least) throws an UnspecifiedError when accessing document.activeElement when
	// inside an iframe. Catch and swallow this error, and heavy-handidly return null.
	function activeElement() {
		try {
			return $doc.activeElement
		} catch (e) {
			return null
		}
	}
	//create
	function createNodes(parent, vnodes, start, end, hooks, nextSibling, ns) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) {
				createNode(parent, vnode, hooks, ns, nextSibling)
			}
		}
	}
	function createNode(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		if (typeof tag === "string") {
			vnode.state = {}
			if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
			switch (tag) {
				case "#": createText(parent, vnode, nextSibling); break
				case "<": createHTML(parent, vnode, ns, nextSibling); break
				case "[": createFragment(parent, vnode, hooks, ns, nextSibling); break
				default: createElement(parent, vnode, hooks, ns, nextSibling)
			}
		}
		else createComponent(parent, vnode, hooks, ns, nextSibling)
	}
	function createText(parent, vnode, nextSibling) {
		vnode.dom = $doc.createTextNode(vnode.children)
		insertNode(parent, vnode.dom, nextSibling)
	}
	var possibleParents = {caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup"}
	function createHTML(parent, vnode, ns, nextSibling) {
		var match = vnode.children.match(/^\s*?<(\w+)/im) || []
		// not using the proper parent makes the child element(s) vanish.
		//     var div = document.createElement("div")
		//     div.innerHTML = "<td>i</td><td>j</td>"
		//     console.log(div.innerHTML)
		// --> "ij", no <td> in sight.
		var temp = $doc.createElement(possibleParents[match[1]] || "div")
		if (ns === "http://www.w3.org/2000/svg") {
			temp.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\">" + vnode.children + "</svg>"
			temp = temp.firstChild
		} else {
			temp.innerHTML = vnode.children
		}
		vnode.dom = temp.firstChild
		vnode.domSize = temp.childNodes.length
		// Capture nodes to remove, so we don't confuse them.
		vnode.instance = []
		var fragment = $doc.createDocumentFragment()
		var child
		while (child = temp.firstChild) {
			vnode.instance.push(child)
			fragment.appendChild(child)
		}
		insertNode(parent, fragment, nextSibling)
	}
	function createFragment(parent, vnode, hooks, ns, nextSibling) {
		var fragment = $doc.createDocumentFragment()
		if (vnode.children != null) {
			var children = vnode.children
			createNodes(fragment, children, 0, children.length, hooks, null, ns)
		}
		vnode.dom = fragment.firstChild
		vnode.domSize = fragment.childNodes.length
		insertNode(parent, fragment, nextSibling)
	}
	function createElement(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		var attrs = vnode.attrs
		var is = attrs && attrs.is

		ns = getNameSpace(vnode) || ns

		var element = ns ?
			is ? $doc.createElementNS(ns, tag, {is: is}) : $doc.createElementNS(ns, tag) :
			is ? $doc.createElement(tag, {is: is}) : $doc.createElement(tag)
		vnode.dom = element

		if (attrs != null) {
			setAttrs(vnode, attrs, ns)
		}

		insertNode(parent, element, nextSibling)

		if (!maybeSetContentEditable(vnode)) {
			if (vnode.text != null) {
				if (vnode.text !== "") element.textContent = vnode.text
				else vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
			}
			if (vnode.children != null) {
				var children = vnode.children
				createNodes(element, children, 0, children.length, hooks, null, ns)
				if (vnode.tag === "select" && attrs != null) setLateSelectAttrs(vnode, attrs)
			}
		}
	}
	function initComponent(vnode, hooks) {
		var sentinel
		if (typeof vnode.tag.view === "function") {
			vnode.state = Object.create(vnode.tag)
			sentinel = vnode.state.view
			if (sentinel.$$reentrantLock$$ != null) return
			sentinel.$$reentrantLock$$ = true
		} else {
			vnode.state = void 0
			sentinel = vnode.tag
			if (sentinel.$$reentrantLock$$ != null) return
			sentinel.$$reentrantLock$$ = true
			vnode.state = (vnode.tag.prototype != null && typeof vnode.tag.prototype.view === "function") ? new vnode.tag(vnode) : vnode.tag(vnode)
		}
		initLifecycle(vnode.state, vnode, hooks)
		if (vnode.attrs != null) initLifecycle(vnode.attrs, vnode, hooks)
		vnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode))
		if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
		sentinel.$$reentrantLock$$ = null
	}
	function createComponent(parent, vnode, hooks, ns, nextSibling) {
		initComponent(vnode, hooks)
		if (vnode.instance != null) {
			createNode(parent, vnode.instance, hooks, ns, nextSibling)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.dom != null ? vnode.instance.domSize : 0
		}
		else {
			vnode.domSize = 0
		}
	}

	//update
	/**
	 * @param {Element|Fragment} parent - the parent element
	 * @param {Vnode[] | null} old - the list of vnodes of the last `render()` call for
	 *                               this part of the tree
	 * @param {Vnode[] | null} vnodes - as above, but for the current `render()` call.
	 * @param {Function[]} hooks - an accumulator of post-render hooks (oncreate/onupdate)
	 * @param {Element | null} nextSibling - the next DOM node if we're dealing with a
	 *                                       fragment that is not the last item in its
	 *                                       parent
	 * @param {'svg' | 'math' | String | null} ns) - the current XML namespace, if any
	 * @returns void
	 */
	// This function diffs and patches lists of vnodes, both keyed and unkeyed.
	//
	// We will:
	//
	// 1. describe its general structure
	// 2. focus on the diff algorithm optimizations
	// 3. discuss DOM node operations.

	// ## Overview:
	//
	// The updateNodes() function:
	// - deals with trivial cases
	// - determines whether the lists are keyed or unkeyed based on the first non-null node
	//   of each list.
	// - diffs them and patches the DOM if needed (that's the brunt of the code)
	// - manages the leftovers: after diffing, are there:
	//   - old nodes left to remove?
	// 	 - new nodes to insert?
	// 	 deal with them!
	//
	// The lists are only iterated over once, with an exception for the nodes in `old` that
	// are visited in the fourth part of the diff and in the `removeNodes` loop.

	// ## Diffing
	//
	// Reading https://github.com/localvoid/ivi/blob/ddc09d06abaef45248e6133f7040d00d3c6be853/packages/ivi/src/vdom/implementation.ts#L617-L837
	// may be good for context on longest increasing subsequence-based logic for moving nodes.
	//
	// In order to diff keyed lists, one has to
	//
	// 1) match nodes in both lists, per key, and update them accordingly
	// 2) create the nodes present in the new list, but absent in the old one
	// 3) remove the nodes present in the old list, but absent in the new one
	// 4) figure out what nodes in 1) to move in order to minimize the DOM operations.
	//
	// To achieve 1) one can create a dictionary of keys => index (for the old list), then iterate
	// over the new list and for each new vnode, find the corresponding vnode in the old list using
	// the map.
	// 2) is achieved in the same step: if a new node has no corresponding entry in the map, it is new
	// and must be created.
	// For the removals, we actually remove the nodes that have been updated from the old list.
	// The nodes that remain in that list after 1) and 2) have been performed can be safely removed.
	// The fourth step is a bit more complex and relies on the longest increasing subsequence (LIS)
	// algorithm.
	//
	// the longest increasing subsequence is the list of nodes that can remain in place. Imagine going
	// from `1,2,3,4,5` to `4,5,1,2,3` where the numbers are not necessarily the keys, but the indices
	// corresponding to the keyed nodes in the old list (keyed nodes `e,d,c,b,a` => `b,a,e,d,c` would
	//  match the above lists, for example).
	//
	// In there are two increasing subsequences: `4,5` and `1,2,3`, the latter being the longest. We
	// can update those nodes without moving them, and only call `insertNode` on `4` and `5`.
	//
	// @localvoid adapted the algo to also support node deletions and insertions (the `lis` is actually
	// the longest increasing subsequence *of old nodes still present in the new list*).
	//
	// It is a general algorithm that is fireproof in all circumstances, but it requires the allocation
	// and the construction of a `key => oldIndex` map, and three arrays (one with `newIndex => oldIndex`,
	// the `LIS` and a temporary one to create the LIS).
	//
	// So we cheat where we can: if the tails of the lists are identical, they are guaranteed to be part of
	// the LIS and can be updated without moving them.
	//
	// If two nodes are swapped, they are guaranteed not to be part of the LIS, and must be moved (with
	// the exception of the last node if the list is fully reversed).
	//
	// ## Finding the next sibling.
	//
	// `updateNode()` and `createNode()` expect a nextSibling parameter to perform DOM operations.
	// When the list is being traversed top-down, at any index, the DOM nodes up to the previous
	// vnode reflect the content of the new list, whereas the rest of the DOM nodes reflect the old
	// list. The next sibling must be looked for in the old list using `getNextSibling(... oldStart + 1 ...)`.
	//
	// In the other scenarios (swaps, upwards traversal, map-based diff),
	// the new vnodes list is traversed upwards. The DOM nodes at the bottom of the list reflect the
	// bottom part of the new vnodes list, and we can use the `v.dom`  value of the previous node
	// as the next sibling (cached in the `nextSibling` variable).


	// ## DOM node moves
	//
	// In most scenarios `updateNode()` and `createNode()` perform the DOM operations. However,
	// this is not the case if the node moved (second and fourth part of the diff algo). We move
	// the old DOM nodes before updateNode runs because it enables us to use the cached `nextSibling`
	// variable rather than fetching it using `getNextSibling()`.
	//
	// The fourth part of the diff currently inserts nodes unconditionally, leading to issues
	// like #1791 and #1999. We need to be smarter about those situations where adjascent old
	// nodes remain together in the new list in a way that isn't covered by parts one and
	// three of the diff algo.

	function updateNodes(parent, old, vnodes, hooks, nextSibling, ns) {
		if (old === vnodes || old == null && vnodes == null) return
		else if (old == null || old.length === 0) createNodes(parent, vnodes, 0, vnodes.length, hooks, nextSibling, ns)
		else if (vnodes == null || vnodes.length === 0) removeNodes(parent, old, 0, old.length)
		else {
			var isOldKeyed = old[0] != null && old[0].key != null
			var isKeyed = vnodes[0] != null && vnodes[0].key != null
			var start = 0, oldStart = 0
			if (!isOldKeyed) while (oldStart < old.length && old[oldStart] == null) oldStart++
			if (!isKeyed) while (start < vnodes.length && vnodes[start] == null) start++
			if (isKeyed === null && isOldKeyed == null) return // both lists are full of nulls
			if (isOldKeyed !== isKeyed) {
				removeNodes(parent, old, oldStart, old.length)
				createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns)
			} else if (!isKeyed) {
				// Don't index past the end of either list (causes deopts).
				var commonLength = old.length < vnodes.length ? old.length : vnodes.length
				// Rewind if necessary to the first non-null index on either side.
				// We could alternatively either explicitly create or remove nodes when `start !== oldStart`
				// but that would be optimizing for sparse lists which are more rare than dense ones.
				start = start < oldStart ? start : oldStart
				for (; start < commonLength; start++) {
					o = old[start]
					v = vnodes[start]
					if (o === v || o == null && v == null) continue
					else if (o == null) createNode(parent, v, hooks, ns, getNextSibling(old, start + 1, nextSibling))
					else if (v == null) removeNode(parent, o)
					else updateNode(parent, o, v, hooks, getNextSibling(old, start + 1, nextSibling), ns)
				}
				if (old.length > commonLength) removeNodes(parent, old, start, old.length)
				if (vnodes.length > commonLength) createNodes(parent, vnodes, start, vnodes.length, hooks, nextSibling, ns)
			} else {
				// keyed diff
				var oldEnd = old.length - 1, end = vnodes.length - 1, map, o, v, oe, ve, topSibling

				// bottom-up
				while (oldEnd >= oldStart && end >= start) {
					oe = old[oldEnd]
					ve = vnodes[end]
					if (oe.key !== ve.key) break
					if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns)
					if (ve.dom != null) nextSibling = ve.dom
					oldEnd--, end--
				}
				// top-down
				while (oldEnd >= oldStart && end >= start) {
					o = old[oldStart]
					v = vnodes[start]
					if (o.key !== v.key) break
					oldStart++, start++
					if (o !== v) updateNode(parent, o, v, hooks, getNextSibling(old, oldStart, nextSibling), ns)
				}
				// swaps and list reversals
				while (oldEnd >= oldStart && end >= start) {
					if (start === end) break
					if (o.key !== ve.key || oe.key !== v.key) break
					topSibling = getNextSibling(old, oldStart, nextSibling)
					moveNodes(parent, oe, topSibling)
					if (oe !== v) updateNode(parent, oe, v, hooks, topSibling, ns)
					if (++start <= --end) moveNodes(parent, o, nextSibling)
					if (o !== ve) updateNode(parent, o, ve, hooks, nextSibling, ns)
					if (ve.dom != null) nextSibling = ve.dom
					oldStart++; oldEnd--
					oe = old[oldEnd]
					ve = vnodes[end]
					o = old[oldStart]
					v = vnodes[start]
				}
				// bottom up once again
				while (oldEnd >= oldStart && end >= start) {
					if (oe.key !== ve.key) break
					if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns)
					if (ve.dom != null) nextSibling = ve.dom
					oldEnd--, end--
					oe = old[oldEnd]
					ve = vnodes[end]
				}
				if (start > end) removeNodes(parent, old, oldStart, oldEnd + 1)
				else if (oldStart > oldEnd) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)
				else {
					// inspired by ivi https://github.com/ivijs/ivi/ by Boris Kaul
					var originalNextSibling = nextSibling, vnodesLength = end - start + 1, oldIndices = new Array(vnodesLength), li=0, i=0, pos = 2147483647, matched = 0, map, lisIndices
					for (i = 0; i < vnodesLength; i++) oldIndices[i] = -1
					for (i = end; i >= start; i--) {
						if (map == null) map = getKeyMap(old, oldStart, oldEnd + 1)
						ve = vnodes[i]
						var oldIndex = map[ve.key]
						if (oldIndex != null) {
							pos = (oldIndex < pos) ? oldIndex : -1 // becomes -1 if nodes were re-ordered
							oldIndices[i-start] = oldIndex
							oe = old[oldIndex]
							old[oldIndex] = null
							if (oe !== ve) updateNode(parent, oe, ve, hooks, nextSibling, ns)
							if (ve.dom != null) nextSibling = ve.dom
							matched++
						}
					}
					nextSibling = originalNextSibling
					if (matched !== oldEnd - oldStart + 1) removeNodes(parent, old, oldStart, oldEnd + 1)
					if (matched === 0) createNodes(parent, vnodes, start, end + 1, hooks, nextSibling, ns)
					else {
						if (pos === -1) {
							// the indices of the indices of the items that are part of the
							// longest increasing subsequence in the oldIndices list
							lisIndices = makeLisIndices(oldIndices)
							li = lisIndices.length - 1
							for (i = end; i >= start; i--) {
								v = vnodes[i]
								if (oldIndices[i-start] === -1) createNode(parent, v, hooks, ns, nextSibling)
								else {
									if (lisIndices[li] === i - start) li--
									else moveNodes(parent, v, nextSibling)
								}
								if (v.dom != null) nextSibling = vnodes[i].dom
							}
						} else {
							for (i = end; i >= start; i--) {
								v = vnodes[i]
								if (oldIndices[i-start] === -1) createNode(parent, v, hooks, ns, nextSibling)
								if (v.dom != null) nextSibling = vnodes[i].dom
							}
						}
					}
				}
			}
		}
	}
	function updateNode(parent, old, vnode, hooks, nextSibling, ns) {
		var oldTag = old.tag, tag = vnode.tag
		if (oldTag === tag) {
			vnode.state = old.state
			vnode.events = old.events
			if (shouldNotUpdate(vnode, old)) return
			if (typeof oldTag === "string") {
				if (vnode.attrs != null) {
					updateLifecycle(vnode.attrs, vnode, hooks)
				}
				switch (oldTag) {
					case "#": updateText(old, vnode); break
					case "<": updateHTML(parent, old, vnode, ns, nextSibling); break
					case "[": updateFragment(parent, old, vnode, hooks, nextSibling, ns); break
					default: updateElement(old, vnode, hooks, ns)
				}
			}
			else updateComponent(parent, old, vnode, hooks, nextSibling, ns)
		}
		else {
			removeNode(parent, old)
			createNode(parent, vnode, hooks, ns, nextSibling)
		}
	}
	function updateText(old, vnode) {
		if (old.children.toString() !== vnode.children.toString()) {
			old.dom.nodeValue = vnode.children
		}
		vnode.dom = old.dom
	}
	function updateHTML(parent, old, vnode, ns, nextSibling) {
		if (old.children !== vnode.children) {
			removeHTML(parent, old)
			createHTML(parent, vnode, ns, nextSibling)
		}
		else {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
			vnode.instance = old.instance
		}
	}
	function updateFragment(parent, old, vnode, hooks, nextSibling, ns) {
		updateNodes(parent, old.children, vnode.children, hooks, nextSibling, ns)
		var domSize = 0, children = vnode.children
		vnode.dom = null
		if (children != null) {
			for (var i = 0; i < children.length; i++) {
				var child = children[i]
				if (child != null && child.dom != null) {
					if (vnode.dom == null) vnode.dom = child.dom
					domSize += child.domSize || 1
				}
			}
			if (domSize !== 1) vnode.domSize = domSize
		}
	}
	function updateElement(old, vnode, hooks, ns) {
		var element = vnode.dom = old.dom
		ns = getNameSpace(vnode) || ns

		if (vnode.tag === "textarea") {
			if (vnode.attrs == null) vnode.attrs = {}
			if (vnode.text != null) {
				vnode.attrs.value = vnode.text //FIXME handle multiple children
				vnode.text = undefined
			}
		}
		updateAttrs(vnode, old.attrs, vnode.attrs, ns)
		if (!maybeSetContentEditable(vnode)) {
			if (old.text != null && vnode.text != null && vnode.text !== "") {
				if (old.text.toString() !== vnode.text.toString()) old.dom.firstChild.nodeValue = vnode.text
			}
			else {
				if (old.text != null) old.children = [Vnode("#", undefined, undefined, old.text, undefined, old.dom.firstChild)]
				if (vnode.text != null) vnode.children = [Vnode("#", undefined, undefined, vnode.text, undefined, undefined)]
				updateNodes(element, old.children, vnode.children, hooks, null, ns)
			}
		}
	}
	function updateComponent(parent, old, vnode, hooks, nextSibling, ns) {
		vnode.instance = Vnode.normalize(callHook.call(vnode.state.view, vnode))
		if (vnode.instance === vnode) throw Error("A view cannot return the vnode it received as argument")
		updateLifecycle(vnode.state, vnode, hooks)
		if (vnode.attrs != null) updateLifecycle(vnode.attrs, vnode, hooks)
		if (vnode.instance != null) {
			if (old.instance == null) createNode(parent, vnode.instance, hooks, ns, nextSibling)
			else updateNode(parent, old.instance, vnode.instance, hooks, nextSibling, ns)
			vnode.dom = vnode.instance.dom
			vnode.domSize = vnode.instance.domSize
		}
		else if (old.instance != null) {
			removeNode(parent, old.instance)
			vnode.dom = undefined
			vnode.domSize = 0
		}
		else {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
		}
	}
	function getKeyMap(vnodes, start, end) {
		var map = Object.create(null)
		for (; start < end; start++) {
			var vnode = vnodes[start]
			if (vnode != null) {
				var key = vnode.key
				if (key != null) map[key] = start
			}
		}
		return map
	}
	// Lifted from ivi https://github.com/ivijs/ivi/
	// takes a list of unique numbers (-1 is special and can
	// occur multiple times) and returns an array with the indices
	// of the items that are part of the longest increasing
	// subsequece
	var lisTemp = []
	function makeLisIndices(a) {
		var result = [0]
		var u = 0, v = 0, i = 0
		var il = lisTemp.length = a.length
		for (var i = 0; i < il; i++) lisTemp[i] = a[i]
		for (var i = 0; i < il; ++i) {
			if (a[i] === -1) continue
			var j = result[result.length - 1]
			if (a[j] < a[i]) {
				lisTemp[i] = j
				result.push(i)
				continue
			}
			u = 0
			v = result.length - 1
			while (u < v) {
				// Fast integer average without overflow.
				// eslint-disable-next-line no-bitwise
				var c = (u >>> 1) + (v >>> 1) + (u & v & 1)
				if (a[result[c]] < a[i]) {
					u = c + 1
				}
				else {
					v = c
				}
			}
			if (a[i] < a[result[u]]) {
				if (u > 0) lisTemp[i] = result[u - 1]
				result[u] = i
			}
		}
		u = result.length
		v = result[u - 1]
		while (u-- > 0) {
			result[u] = v
			v = lisTemp[v]
		}
		lisTemp.length = 0
		return result
	}

	function getNextSibling(vnodes, i, nextSibling) {
		for (; i < vnodes.length; i++) {
			if (vnodes[i] != null && vnodes[i].dom != null) return vnodes[i].dom
		}
		return nextSibling
	}

	// This covers a really specific edge case:
	// - Parent node is keyed and contains child
	// - Child is removed, returns unresolved promise in `onbeforeremove`
	// - Parent node is moved in keyed diff
	// - Remaining children still need moved appropriately
	//
	// Ideally, I'd track removed nodes as well, but that introduces a lot more
	// complexity and I'm not exactly interested in doing that.
	function moveNodes(parent, vnode, nextSibling) {
		var frag = $doc.createDocumentFragment()
		moveChildToFrag(parent, frag, vnode)
		insertNode(parent, frag, nextSibling)
	}
	function moveChildToFrag(parent, frag, vnode) {
		// Dodge the recursion overhead in a few of the most common cases.
		while (vnode.dom != null && vnode.dom.parentNode === parent) {
			if (typeof vnode.tag !== "string") {
				vnode = vnode.instance
				if (vnode != null) continue
			} else if (vnode.tag === "<") {
				for (var i = 0; i < vnode.instance.length; i++) {
					frag.appendChild(vnode.instance[i])
				}
			} else if (vnode.tag !== "[") {
				// Don't recurse for text nodes *or* elements, just fragments
				frag.appendChild(vnode.dom)
			} else if (vnode.children.length === 1) {
				vnode = vnode.children[0]
				if (vnode != null) continue
			} else {
				for (var i = 0; i < vnode.children.length; i++) {
					var child = vnode.children[i]
					if (child != null) moveChildToFrag(parent, frag, child)
				}
			}
			break
		}
	}

	function insertNode(parent, dom, nextSibling) {
		if (nextSibling != null) parent.insertBefore(dom, nextSibling)
		else parent.appendChild(dom)
	}

	function maybeSetContentEditable(vnode) {
		if (vnode.attrs == null || (
			vnode.attrs.contenteditable == null && // attribute
			vnode.attrs.contentEditable == null // property
		)) return false
		var children = vnode.children
		if (children != null && children.length === 1 && children[0].tag === "<") {
			var content = children[0].children
			if (vnode.dom.innerHTML !== content) vnode.dom.innerHTML = content
		}
		else if (vnode.text != null || children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted")
		return true
	}

	//remove
	function removeNodes(parent, vnodes, start, end) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) removeNode(parent, vnode)
		}
	}
	function removeNode(parent, vnode) {
		var mask = 0
		var original = vnode.state
		var stateResult, attrsResult
		if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeremove === "function") {
			var result = callHook.call(vnode.state.onbeforeremove, vnode)
			if (result != null && typeof result.then === "function") {
				mask = 1
				stateResult = result
			}
		}
		if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") {
			var result = callHook.call(vnode.attrs.onbeforeremove, vnode)
			if (result != null && typeof result.then === "function") {
				// eslint-disable-next-line no-bitwise
				mask |= 2
				attrsResult = result
			}
		}
		checkState(vnode, original)

		// If we can, try to fast-path it and avoid all the overhead of awaiting
		if (!mask) {
			onremove(vnode)
			removeChild(parent, vnode)
		} else {
			if (stateResult != null) {
				var next = function () {
					// eslint-disable-next-line no-bitwise
					if (mask & 1) { mask &= 2; if (!mask) reallyRemove() }
				}
				stateResult.then(next, next)
			}
			if (attrsResult != null) {
				var next = function () {
					// eslint-disable-next-line no-bitwise
					if (mask & 2) { mask &= 1; if (!mask) reallyRemove() }
				}
				attrsResult.then(next, next)
			}
		}

		function reallyRemove() {
			checkState(vnode, original)
			onremove(vnode)
			removeChild(parent, vnode)
		}
	}
	function removeHTML(parent, vnode) {
		for (var i = 0; i < vnode.instance.length; i++) {
			parent.removeChild(vnode.instance[i])
		}
	}
	function removeChild(parent, vnode) {
		// Dodge the recursion overhead in a few of the most common cases.
		while (vnode.dom != null && vnode.dom.parentNode === parent) {
			if (typeof vnode.tag !== "string") {
				vnode = vnode.instance
				if (vnode != null) continue
			} else if (vnode.tag === "<") {
				removeHTML(parent, vnode)
			} else {
				if (vnode.tag !== "[") {
					parent.removeChild(vnode.dom)
					if (!Array.isArray(vnode.children)) break
				}
				if (vnode.children.length === 1) {
					vnode = vnode.children[0]
					if (vnode != null) continue
				} else {
					for (var i = 0; i < vnode.children.length; i++) {
						var child = vnode.children[i]
						if (child != null) removeChild(parent, child)
					}
				}
			}
			break
		}
	}
	function onremove(vnode) {
		if (typeof vnode.tag !== "string" && typeof vnode.state.onremove === "function") callHook.call(vnode.state.onremove, vnode)
		if (vnode.attrs && typeof vnode.attrs.onremove === "function") callHook.call(vnode.attrs.onremove, vnode)
		if (typeof vnode.tag !== "string") {
			if (vnode.instance != null) onremove(vnode.instance)
		} else {
			var children = vnode.children
			if (Array.isArray(children)) {
				for (var i = 0; i < children.length; i++) {
					var child = children[i]
					if (child != null) onremove(child)
				}
			}
		}
	}

	//attrs
	function setAttrs(vnode, attrs, ns) {
		for (var key in attrs) {
			setAttr(vnode, key, null, attrs[key], ns)
		}
	}
	function setAttr(vnode, key, old, value, ns) {
		if (key === "key" || key === "is" || value == null || isLifecycleMethod(key) || (old === value && !isFormAttribute(vnode, key)) && typeof value !== "object") return
		if (key[0] === "o" && key[1] === "n") return updateEvent(vnode, key, value)
		if (key.slice(0, 6) === "xlink:") vnode.dom.setAttributeNS("http://www.w3.org/1999/xlink", key.slice(6), value)
		else if (key === "style") updateStyle(vnode.dom, old, value)
		else if (hasPropertyKey(vnode, key, ns)) {
			if (key === "value") {
				// Only do the coercion if we're actually going to check the value.
				/* eslint-disable no-implicit-coercion */
				//setting input[value] to same value by typing on focused element moves cursor to end in Chrome
				if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === "" + value && vnode.dom === activeElement()) return
				//setting select[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "select" && old !== null && vnode.dom.value === "" + value) return
				//setting option[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "option" && old !== null && vnode.dom.value === "" + value) return
				/* eslint-enable no-implicit-coercion */
			}
			// If you assign an input type that is not supported by IE 11 with an assignment expression, an error will occur.
			if (vnode.tag === "input" && key === "type") vnode.dom.setAttribute(key, value)
			else vnode.dom[key] = value
		} else {
			if (typeof value === "boolean") {
				if (value) vnode.dom.setAttribute(key, "")
				else vnode.dom.removeAttribute(key)
			}
			else vnode.dom.setAttribute(key === "className" ? "class" : key, value)
		}
	}
	function removeAttr(vnode, key, old, ns) {
		if (key === "key" || key === "is" || old == null || isLifecycleMethod(key)) return
		if (key[0] === "o" && key[1] === "n" && !isLifecycleMethod(key)) updateEvent(vnode, key, undefined)
		else if (key === "style") updateStyle(vnode.dom, old, null)
		else if (
			hasPropertyKey(vnode, key, ns)
			&& key !== "className"
			&& !(key === "value" && (
				vnode.tag === "option"
				|| vnode.tag === "select" && vnode.dom.selectedIndex === -1 && vnode.dom === activeElement()
			))
			&& !(vnode.tag === "input" && key === "type")
		) {
			vnode.dom[key] = null
		} else {
			var nsLastIndex = key.indexOf(":")
			if (nsLastIndex !== -1) key = key.slice(nsLastIndex + 1)
			if (old !== false) vnode.dom.removeAttribute(key === "className" ? "class" : key)
		}
	}
	function setLateSelectAttrs(vnode, attrs) {
		if ("value" in attrs) {
			if(attrs.value === null) {
				if (vnode.dom.selectedIndex !== -1) vnode.dom.value = null
			} else {
				var normalized = "" + attrs.value // eslint-disable-line no-implicit-coercion
				if (vnode.dom.value !== normalized || vnode.dom.selectedIndex === -1) {
					vnode.dom.value = normalized
				}
			}
		}
		if ("selectedIndex" in attrs) setAttr(vnode, "selectedIndex", null, attrs.selectedIndex, undefined)
	}
	function updateAttrs(vnode, old, attrs, ns) {
		if (attrs != null) {
			for (var key in attrs) {
				setAttr(vnode, key, old && old[key], attrs[key], ns)
			}
		}
		var val
		if (old != null) {
			for (var key in old) {
				if (((val = old[key]) != null) && (attrs == null || attrs[key] == null)) {
					removeAttr(vnode, key, val, ns)
				}
			}
		}
	}
	function isFormAttribute(vnode, attr) {
		return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && vnode.dom === activeElement() || vnode.tag === "option" && vnode.dom.parentNode === $doc.activeElement
	}
	function isLifecycleMethod(attr) {
		return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate"
	}
	function hasPropertyKey(vnode, key, ns) {
		// Filter out namespaced keys
		return ns === undefined && (
			// If it's a custom element, just keep it.
			vnode.tag.indexOf("-") > -1 || vnode.attrs != null && vnode.attrs.is ||
			// If it's a normal element, let's try to avoid a few browser bugs.
			key !== "href" && key !== "list" && key !== "form" && key !== "width" && key !== "height"// && key !== "type"
			// Defer the property check until *after* we check everything.
		) && key in vnode.dom
	}

	//style
	var uppercaseRegex = /[A-Z]/g
	function toLowerCase(capital) { return "-" + capital.toLowerCase() }
	function normalizeKey(key) {
		return key[0] === "-" && key[1] === "-" ? key :
			key === "cssFloat" ? "float" :
				key.replace(uppercaseRegex, toLowerCase)
	}
	function updateStyle(element, old, style) {
		if (old === style) {
			// Styles are equivalent, do nothing.
		} else if (style == null) {
			// New style is missing, just clear it.
			element.style.cssText = ""
		} else if (typeof style !== "object") {
			// New style is a string, let engine deal with patching.
			element.style.cssText = style
		} else if (old == null || typeof old !== "object") {
			// `old` is missing or a string, `style` is an object.
			element.style.cssText = ""
			// Add new style properties
			for (var key in style) {
				var value = style[key]
				if (value != null) element.style.setProperty(normalizeKey(key), String(value))
			}
		} else {
			// Both old & new are (different) objects.
			// Update style properties that have changed
			for (var key in style) {
				var value = style[key]
				if (value != null && (value = String(value)) !== String(old[key])) {
					element.style.setProperty(normalizeKey(key), value)
				}
			}
			// Remove style properties that no longer exist
			for (var key in old) {
				if (old[key] != null && style[key] == null) {
					element.style.removeProperty(normalizeKey(key))
				}
			}
		}
	}

	// Here's an explanation of how this works:
	// 1. The event names are always (by design) prefixed by `on`.
	// 2. The EventListener interface accepts either a function or an object
	//    with a `handleEvent` method.
	// 3. The object does not inherit from `Object.prototype`, to avoid
	//    any potential interference with that (e.g. setters).
	// 4. The event name is remapped to the handler before calling it.
	// 5. In function-based event handlers, `ev.target === this`. We replicate
	//    that below.
	// 6. In function-based event handlers, `return false` prevents the default
	//    action and stops event propagation. We replicate that below.
	function EventDict() {
		// Save this, so the current redraw is correctly tracked.
		this._ = currentRedraw
	}
	EventDict.prototype = Object.create(null)
	EventDict.prototype.handleEvent = function (ev) {
		var handler = this["on" + ev.type]
		var result
		if (typeof handler === "function") result = handler.call(ev.currentTarget, ev)
		else if (typeof handler.handleEvent === "function") handler.handleEvent(ev)
		if (this._ && ev.redraw !== false) (0, this._)()
		if (result === false) {
			ev.preventDefault()
			ev.stopPropagation()
		}
	}

	//event
	function updateEvent(vnode, key, value) {
		if (vnode.events != null) {
			if (vnode.events[key] === value) return
			if (value != null && (typeof value === "function" || typeof value === "object")) {
				if (vnode.events[key] == null) vnode.dom.addEventListener(key.slice(2), vnode.events, false)
				vnode.events[key] = value
			} else {
				if (vnode.events[key] != null) vnode.dom.removeEventListener(key.slice(2), vnode.events, false)
				vnode.events[key] = undefined
			}
		} else if (value != null && (typeof value === "function" || typeof value === "object")) {
			vnode.events = new EventDict()
			vnode.dom.addEventListener(key.slice(2), vnode.events, false)
			vnode.events[key] = value
		}
	}

	//lifecycle
	function initLifecycle(source, vnode, hooks) {
		if (typeof source.oninit === "function") callHook.call(source.oninit, vnode)
		if (typeof source.oncreate === "function") hooks.push(callHook.bind(source.oncreate, vnode))
	}
	function updateLifecycle(source, vnode, hooks) {
		if (typeof source.onupdate === "function") hooks.push(callHook.bind(source.onupdate, vnode))
	}
	function shouldNotUpdate(vnode, old) {
		do {
			if (vnode.attrs != null && typeof vnode.attrs.onbeforeupdate === "function") {
				var force = callHook.call(vnode.attrs.onbeforeupdate, vnode, old)
				if (force !== undefined && !force) break
			}
			if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeupdate === "function") {
				var force = callHook.call(vnode.state.onbeforeupdate, vnode, old)
				if (force !== undefined && !force) break
			}
			return false
		} while (false); // eslint-disable-line no-constant-condition
		vnode.dom = old.dom
		vnode.domSize = old.domSize
		vnode.instance = old.instance
		// One would think having the actual latest attributes would be ideal,
		// but it doesn't let us properly diff based on our current internal
		// representation. We have to save not only the old DOM info, but also
		// the attributes used to create it, as we diff *that*, not against the
		// DOM directly (with a few exceptions in `setAttr`). And, of course, we
		// need to save the children and text as they are conceptually not
		// unlike special "attributes" internally.
		vnode.attrs = old.attrs
		vnode.children = old.children
		vnode.text = old.text
		return true
	}

	return function(dom, vnodes, redraw) {
		if (!dom) throw new TypeError("Ensure the DOM element being passed to m.route/m.mount/m.render is not undefined.")
		var hooks = []
		var active = activeElement()
		var namespace = dom.namespaceURI

		// First time rendering into a node clears it out
		if (dom.vnodes == null) dom.textContent = ""

		vnodes = Vnode.normalizeChildren(Array.isArray(vnodes) ? vnodes : [vnodes])
		var prevRedraw = currentRedraw
		try {
			currentRedraw = typeof redraw === "function" ? redraw : undefined
			updateNodes(dom, dom.vnodes, vnodes, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? undefined : namespace)
		} finally {
			currentRedraw = prevRedraw
		}
		dom.vnodes = vnodes
		// `document.activeElement` can return null: https://html.spec.whatwg.org/multipage/interaction.html#dom-document-activeelement
		if (active != null && activeElement() !== active && typeof active.focus === "function") active.focus()
		for (var i = 0; i < hooks.length; i++) hooks[i]()
	}
}

},{"../render/vnode":"57tq1"}],"4i4ji":[function(require,module,exports) {
"use strict"

var Vnode = require("../render/vnode")

module.exports = function(render, schedule, console) {
	var subscriptions = []
	var rendering = false
	var pending = false

	function sync() {
		if (rendering) throw new Error("Nested m.redraw.sync() call")
		rendering = true
		for (var i = 0; i < subscriptions.length; i += 2) {
			try { render(subscriptions[i], Vnode(subscriptions[i + 1]), redraw) }
			catch (e) { console.error(e) }
		}
		rendering = false
	}

	function redraw() {
		if (!pending) {
			pending = true
			schedule(function() {
				pending = false
				sync()
			})
		}
	}

	redraw.sync = sync

	function mount(root, component) {
		if (component != null && component.view == null && typeof component !== "function") {
			throw new TypeError("m.mount(element, component) expects a component, not a vnode")
		}

		var index = subscriptions.indexOf(root)
		if (index >= 0) {
			subscriptions.splice(index, 2)
			render(root, [], redraw)
		}

		if (component != null) {
			subscriptions.push(root, component)
			render(root, Vnode(component), redraw)
		}
	}

	return {mount: mount, redraw: redraw}
}

},{"../render/vnode":"57tq1"}],"TG1au":[function(require,module,exports) {
"use strict"

var buildPathname = require("../pathname/build")

module.exports = function($window, Promise, oncompletion) {
	var callbackCount = 0

	function PromiseProxy(executor) {
		return new Promise(executor)
	}

	// In case the global Promise is some userland library's where they rely on
	// `foo instanceof this.constructor`, `this.constructor.resolve(value)`, or
	// similar. Let's *not* break them.
	PromiseProxy.prototype = Promise.prototype
	PromiseProxy.__proto__ = Promise // eslint-disable-line no-proto

	function makeRequest(factory) {
		return function(url, args) {
			if (typeof url !== "string") { args = url; url = url.url }
			else if (args == null) args = {}
			var promise = new Promise(function(resolve, reject) {
				factory(buildPathname(url, args.params), args, function (data) {
					if (typeof args.type === "function") {
						if (Array.isArray(data)) {
							for (var i = 0; i < data.length; i++) {
								data[i] = new args.type(data[i])
							}
						}
						else data = new args.type(data)
					}
					resolve(data)
				}, reject)
			})
			if (args.background === true) return promise
			var count = 0
			function complete() {
				if (--count === 0 && typeof oncompletion === "function") oncompletion()
			}

			return wrap(promise)

			function wrap(promise) {
				var then = promise.then
				// Set the constructor, so engines know to not await or resolve
				// this as a native promise. At the time of writing, this is
				// only necessary for V8, but their behavior is the correct
				// behavior per spec. See this spec issue for more details:
				// https://github.com/tc39/ecma262/issues/1577. Also, see the
				// corresponding comment in `request/tests/test-request.js` for
				// a bit more background on the issue at hand.
				promise.constructor = PromiseProxy
				promise.then = function() {
					count++
					var next = then.apply(promise, arguments)
					next.then(complete, function(e) {
						complete()
						if (count === 0) throw e
					})
					return wrap(next)
				}
				return promise
			}
		}
	}

	function hasHeader(args, name) {
		for (var key in args.headers) {
			if ({}.hasOwnProperty.call(args.headers, key) && name.test(key)) return true
		}
		return false
	}

	return {
		request: makeRequest(function(url, args, resolve, reject) {
			var method = args.method != null ? args.method.toUpperCase() : "GET"
			var body = args.body
			var assumeJSON = (args.serialize == null || args.serialize === JSON.serialize) && !(body instanceof $window.FormData)
			var responseType = args.responseType || (typeof args.extract === "function" ? "" : "json")

			var xhr = new $window.XMLHttpRequest(), aborted = false
			var original = xhr, replacedAbort
			var abort = xhr.abort

			xhr.abort = function() {
				aborted = true
				abort.call(this)
			}

			xhr.open(method, url, args.async !== false, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined)

			if (assumeJSON && body != null && !hasHeader(args, /^content-type$/i)) {
				xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
			}
			if (typeof args.deserialize !== "function" && !hasHeader(args, /^accept$/i)) {
				xhr.setRequestHeader("Accept", "application/json, text/*")
			}
			if (args.withCredentials) xhr.withCredentials = args.withCredentials
			if (args.timeout) xhr.timeout = args.timeout
			xhr.responseType = responseType

			for (var key in args.headers) {
				if ({}.hasOwnProperty.call(args.headers, key)) {
					xhr.setRequestHeader(key, args.headers[key])
				}
			}

			xhr.onreadystatechange = function(ev) {
				// Don't throw errors on xhr.abort().
				if (aborted) return

				if (ev.target.readyState === 4) {
					try {
						var success = (ev.target.status >= 200 && ev.target.status < 300) || ev.target.status === 304 || (/^file:\/\//i).test(url)
						// When the response type isn't "" or "text",
						// `xhr.responseText` is the wrong thing to use.
						// Browsers do the right thing and throw here, and we
						// should honor that and do the right thing by
						// preferring `xhr.response` where possible/practical.
						var response = ev.target.response, message

						if (responseType === "json") {
							// For IE and Edge, which don't implement
							// `responseType: "json"`.
							if (!ev.target.responseType && typeof args.extract !== "function") response = JSON.parse(ev.target.responseText)
						} else if (!responseType || responseType === "text") {
							// Only use this default if it's text. If a parsed
							// document is needed on old IE and friends (all
							// unsupported), the user should use a custom
							// `config` instead. They're already using this at
							// their own risk.
							if (response == null) response = ev.target.responseText
						}

						if (typeof args.extract === "function") {
							response = args.extract(ev.target, args)
							success = true
						} else if (typeof args.deserialize === "function") {
							response = args.deserialize(response)
						}
						if (success) resolve(response)
						else {
							try { message = ev.target.responseText }
							catch (e) { message = response }
							var error = new Error(message)
							error.code = ev.target.status
							error.response = response
							reject(error)
						}
					}
					catch (e) {
						reject(e)
					}
				}
			}

			if (typeof args.config === "function") {
				xhr = args.config(xhr, args, url) || xhr

				// Propagate the `abort` to any replacement XHR as well.
				if (xhr !== original) {
					replacedAbort = xhr.abort
					xhr.abort = function() {
						aborted = true
						replacedAbort.call(this)
					}
				}
			}

			if (body == null) xhr.send()
			else if (typeof args.serialize === "function") xhr.send(args.serialize(body))
			else if (body instanceof $window.FormData) xhr.send(body)
			else xhr.send(JSON.stringify(body))
		}),
		jsonp: makeRequest(function(url, args, resolve, reject) {
			var callbackName = args.callbackName || "_mithril_" + Math.round(Math.random() * 1e16) + "_" + callbackCount++
			var script = $window.document.createElement("script")
			$window[callbackName] = function(data) {
				delete $window[callbackName]
				script.parentNode.removeChild(script)
				resolve(data)
			}
			script.onerror = function() {
				delete $window[callbackName]
				script.parentNode.removeChild(script)
				reject(new Error("JSONP request failed"))
			}
			script.src = url + (url.indexOf("?") < 0 ? "?" : "&") +
				encodeURIComponent(args.callbackKey || "callback") + "=" +
				encodeURIComponent(callbackName)
			$window.document.documentElement.appendChild(script)
		}),
	}
}

},{"../pathname/build":"5x17O"}],"5x17O":[function(require,module,exports) {
"use strict"

var buildQueryString = require("../querystring/build")
var assign = require("./assign")

// Returns `path` from `template` + `params`
module.exports = function(template, params) {
	if ((/:([^\/\.-]+)(\.{3})?:/).test(template)) {
		throw new SyntaxError("Template parameter names *must* be separated")
	}
	if (params == null) return template
	var queryIndex = template.indexOf("?")
	var hashIndex = template.indexOf("#")
	var queryEnd = hashIndex < 0 ? template.length : hashIndex
	var pathEnd = queryIndex < 0 ? queryEnd : queryIndex
	var path = template.slice(0, pathEnd)
	var query = {}

	assign(query, params)

	var resolved = path.replace(/:([^\/\.-]+)(\.{3})?/g, function(m, key, variadic) {
		delete query[key]
		// If no such parameter exists, don't interpolate it.
		if (params[key] == null) return m
		// Escape normal parameters, but not variadic ones.
		return variadic ? params[key] : encodeURIComponent(String(params[key]))
	})

	// In case the template substitution adds new query/hash parameters.
	var newQueryIndex = resolved.indexOf("?")
	var newHashIndex = resolved.indexOf("#")
	var newQueryEnd = newHashIndex < 0 ? resolved.length : newHashIndex
	var newPathEnd = newQueryIndex < 0 ? newQueryEnd : newQueryIndex
	var result = resolved.slice(0, newPathEnd)

	if (queryIndex >= 0) result += template.slice(queryIndex, queryEnd)
	if (newQueryIndex >= 0) result += (queryIndex < 0 ? "?" : "&") + resolved.slice(newQueryIndex, newQueryEnd)
	var querystring = buildQueryString(query)
	if (querystring) result += (queryIndex < 0 && newQueryIndex < 0 ? "?" : "&") + querystring
	if (hashIndex >= 0) result += template.slice(hashIndex)
	if (newHashIndex >= 0) result += (hashIndex < 0 ? "" : "&") + resolved.slice(newHashIndex)
	return result
}

},{"../querystring/build":"3qM0x","./assign":"41XBX"}],"3qM0x":[function(require,module,exports) {
"use strict"

module.exports = function(object) {
	if (Object.prototype.toString.call(object) !== "[object Object]") return ""

	var args = []
	for (var key in object) {
		destructure(key, object[key])
	}

	return args.join("&")

	function destructure(key, value) {
		if (Array.isArray(value)) {
			for (var i = 0; i < value.length; i++) {
				destructure(key + "[" + i + "]", value[i])
			}
		}
		else if (Object.prototype.toString.call(value) === "[object Object]") {
			for (var i in value) {
				destructure(key + "[" + i + "]", value[i])
			}
		}
		else args.push(encodeURIComponent(key) + (value != null && value !== "" ? "=" + encodeURIComponent(value) : ""))
	}
}

},{}],"41XBX":[function(require,module,exports) {
"use strict"

module.exports = Object.assign || function(target, source) {
	if(source) Object.keys(source).forEach(function(key) { target[key] = source[key] })
}

},{}],"2I5in":[function(require,module,exports) {
"use strict"

var mountRedraw = require("./mount-redraw")

module.exports = require("./api/router")(window, mountRedraw)

},{"./mount-redraw":"4jQ9B","./api/router":"3o5Mr"}],"3o5Mr":[function(require,module,exports) {
"use strict"

var Vnode = require("../render/vnode")
var m = require("../render/hyperscript")
var Promise = require("../promise/promise")

var buildPathname = require("../pathname/build")
var parsePathname = require("../pathname/parse")
var compileTemplate = require("../pathname/compileTemplate")
var assign = require("../pathname/assign")

var sentinel = {}

module.exports = function($window, mountRedraw) {
	var fireAsync

	function setPath(path, data, options) {
		path = buildPathname(path, data)
		if (fireAsync != null) {
			fireAsync()
			var state = options ? options.state : null
			var title = options ? options.title : null
			if (options && options.replace) $window.history.replaceState(state, title, route.prefix + path)
			else $window.history.pushState(state, title, route.prefix + path)
		}
		else {
			$window.location.href = route.prefix + path
		}
	}

	var currentResolver = sentinel, component, attrs, currentPath, lastUpdate

	var SKIP = route.SKIP = {}

	function route(root, defaultRoute, routes) {
		if (root == null) throw new Error("Ensure the DOM element that was passed to `m.route` is not undefined")
		// 0 = start
		// 1 = init
		// 2 = ready
		var state = 0

		var compiled = Object.keys(routes).map(function(route) {
			if (route[0] !== "/") throw new SyntaxError("Routes must start with a `/`")
			if ((/:([^\/\.-]+)(\.{3})?:/).test(route)) {
				throw new SyntaxError("Route parameter names must be separated with either `/`, `.`, or `-`")
			}
			return {
				route: route,
				component: routes[route],
				check: compileTemplate(route),
			}
		})
		var callAsync = typeof setImmediate === "function" ? setImmediate : setTimeout
		var p = Promise.resolve()
		var scheduled = false
		var onremove

		fireAsync = null

		if (defaultRoute != null) {
			var defaultData = parsePathname(defaultRoute)

			if (!compiled.some(function (i) { return i.check(defaultData) })) {
				throw new ReferenceError("Default route doesn't match any known routes")
			}
		}

		function resolveRoute() {
			scheduled = false
			// Consider the pathname holistically. The prefix might even be invalid,
			// but that's not our problem.
			var prefix = $window.location.hash
			if (route.prefix[0] !== "#") {
				prefix = $window.location.search + prefix
				if (route.prefix[0] !== "?") {
					prefix = $window.location.pathname + prefix
					if (prefix[0] !== "/") prefix = "/" + prefix
				}
			}
			// This seemingly useless `.concat()` speeds up the tests quite a bit,
			// since the representation is consistently a relatively poorly
			// optimized cons string.
			var path = prefix.concat()
				.replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponent)
				.slice(route.prefix.length)
			var data = parsePathname(path)

			assign(data.params, $window.history.state)

			function fail() {
				if (path === defaultRoute) throw new Error("Could not resolve default route " + defaultRoute)
				setPath(defaultRoute, null, {replace: true})
			}

			loop(0)
			function loop(i) {
				// 0 = init
				// 1 = scheduled
				// 2 = done
				for (; i < compiled.length; i++) {
					if (compiled[i].check(data)) {
						var payload = compiled[i].component
						var matchedRoute = compiled[i].route
						var localComp = payload
						var update = lastUpdate = function(comp) {
							if (update !== lastUpdate) return
							if (comp === SKIP) return loop(i + 1)
							component = comp != null && (typeof comp.view === "function" || typeof comp === "function")? comp : "div"
							attrs = data.params, currentPath = path, lastUpdate = null
							currentResolver = payload.render ? payload : null
							if (state === 2) mountRedraw.redraw()
							else {
								state = 2
								mountRedraw.redraw.sync()
							}
						}
						// There's no understating how much I *wish* I could
						// use `async`/`await` here...
						if (payload.view || typeof payload === "function") {
							payload = {}
							update(localComp)
						}
						else if (payload.onmatch) {
							p.then(function () {
								return payload.onmatch(data.params, path, matchedRoute)
							}).then(update, fail)
						}
						else update("div")
						return
					}
				}
				fail()
			}
		}

		// Set it unconditionally so `m.route.set` and `m.route.Link` both work,
		// even if neither `pushState` nor `hashchange` are supported. It's
		// cleared if `hashchange` is used, since that makes it automatically
		// async.
		fireAsync = function() {
			if (!scheduled) {
				scheduled = true
				callAsync(resolveRoute)
			}
		}

		if (typeof $window.history.pushState === "function") {
			onremove = function() {
				$window.removeEventListener("popstate", fireAsync, false)
			}
			$window.addEventListener("popstate", fireAsync, false)
		} else if (route.prefix[0] === "#") {
			fireAsync = null
			onremove = function() {
				$window.removeEventListener("hashchange", resolveRoute, false)
			}
			$window.addEventListener("hashchange", resolveRoute, false)
		}

		return mountRedraw.mount(root, {
			onbeforeupdate: function() {
				state = state ? 2 : 1
				return !(!state || sentinel === currentResolver)
			},
			oncreate: resolveRoute,
			onremove: onremove,
			view: function() {
				if (!state || sentinel === currentResolver) return
				// Wrap in a fragment to preserve existing key semantics
				var vnode = [Vnode(component, attrs.key, attrs)]
				if (currentResolver) vnode = currentResolver.render(vnode[0])
				return vnode
			},
		})
	}
	route.set = function(path, data, options) {
		if (lastUpdate != null) {
			options = options || {}
			options.replace = true
		}
		lastUpdate = null
		setPath(path, data, options)
	}
	route.get = function() {return currentPath}
	route.prefix = "#!"
	route.Link = {
		view: function(vnode) {
			var options = vnode.attrs.options
			// Remove these so they don't get overwritten
			var attrs = {}, onclick, href
			assign(attrs, vnode.attrs)
			// The first two are internal, but the rest are magic attributes
			// that need censored to not screw up rendering.
			attrs.selector = attrs.options = attrs.key = attrs.oninit =
			attrs.oncreate = attrs.onbeforeupdate = attrs.onupdate =
			attrs.onbeforeremove = attrs.onremove = null

			// Do this now so we can get the most current `href` and `disabled`.
			// Those attributes may also be specified in the selector, and we
			// should honor that.
			var child = m(vnode.attrs.selector || "a", attrs, vnode.children)

			// Let's provide a *right* way to disable a route link, rather than
			// letting people screw up accessibility on accident.
			//
			// The attribute is coerced so users don't get surprised over
			// `disabled: 0` resulting in a button that's somehow routable
			// despite being visibly disabled.
			if (child.attrs.disabled = Boolean(child.attrs.disabled)) {
				child.attrs.href = null
				child.attrs["aria-disabled"] = "true"
				// If you *really* do want to do this on a disabled link, use
				// an `oncreate` hook to add it.
				child.attrs.onclick = null
			} else {
				onclick = child.attrs.onclick
				href = child.attrs.href
				child.attrs.href = route.prefix + href
				child.attrs.onclick = function(e) {
					var result
					if (typeof onclick === "function") {
						result = onclick.call(e.currentTarget, e)
					} else if (onclick == null || typeof onclick !== "object") {
						// do nothing
					} else if (typeof onclick.handleEvent === "function") {
						onclick.handleEvent(e)
					}

					// Adapted from React Router's implementation:
					// https://github.com/ReactTraining/react-router/blob/520a0acd48ae1b066eb0b07d6d4d1790a1d02482/packages/react-router-dom/modules/Link.js
					//
					// Try to be flexible and intuitive in how we handle links.
					// Fun fact: links aren't as obvious to get right as you
					// would expect. There's a lot more valid ways to click a
					// link than this, and one might want to not simply click a
					// link, but right click or command-click it to copy the
					// link target, etc. Nope, this isn't just for blind people.
					if (
						// Skip if `onclick` prevented default
						result !== false && !e.defaultPrevented &&
						// Ignore everything but left clicks
						(e.button === 0 || e.which === 0 || e.which === 1) &&
						// Let the browser handle `target=_blank`, etc.
						(!e.currentTarget.target || e.currentTarget.target === "_self") &&
						// No modifier keys
						!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey
					) {
						e.preventDefault()
						e.redraw = false
						route.set(href, null, options)
					}
				}
			}
			return child
		},
	}
	route.param = function(key) {
		return attrs && key != null ? attrs[key] : attrs
	}

	return route
}

},{"../render/vnode":"57tq1","../render/hyperscript":"1m9cW","../promise/promise":"1H5tR","../pathname/build":"5x17O","../pathname/parse":"4fniD","../pathname/compileTemplate":"6Vdep","../pathname/assign":"41XBX"}],"4fniD":[function(require,module,exports) {
"use strict"

var parseQueryString = require("../querystring/parse")

// Returns `{path, params}` from `url`
module.exports = function(url) {
	var queryIndex = url.indexOf("?")
	var hashIndex = url.indexOf("#")
	var queryEnd = hashIndex < 0 ? url.length : hashIndex
	var pathEnd = queryIndex < 0 ? queryEnd : queryIndex
	var path = url.slice(0, pathEnd).replace(/\/{2,}/g, "/")

	if (!path) path = "/"
	else {
		if (path[0] !== "/") path = "/" + path
		if (path.length > 1 && path[path.length - 1] === "/") path = path.slice(0, -1)
	}
	return {
		path: path,
		params: queryIndex < 0
			? {}
			: parseQueryString(url.slice(queryIndex + 1, queryEnd)),
	}
}

},{"../querystring/parse":"3xNcs"}],"3xNcs":[function(require,module,exports) {
"use strict"

module.exports = function(string) {
	if (string === "" || string == null) return {}
	if (string.charAt(0) === "?") string = string.slice(1)

	var entries = string.split("&"), counters = {}, data = {}
	for (var i = 0; i < entries.length; i++) {
		var entry = entries[i].split("=")
		var key = decodeURIComponent(entry[0])
		var value = entry.length === 2 ? decodeURIComponent(entry[1]) : ""

		if (value === "true") value = true
		else if (value === "false") value = false

		var levels = key.split(/\]\[?|\[/)
		var cursor = data
		if (key.indexOf("[") > -1) levels.pop()
		for (var j = 0; j < levels.length; j++) {
			var level = levels[j], nextLevel = levels[j + 1]
			var isNumber = nextLevel == "" || !isNaN(parseInt(nextLevel, 10))
			if (level === "") {
				var key = levels.slice(0, j).join()
				if (counters[key] == null) {
					counters[key] = Array.isArray(cursor) ? cursor.length : 0
				}
				level = counters[key]++
			}
			// Disallow direct prototype pollution
			else if (level === "__proto__") break
			if (j === levels.length - 1) cursor[level] = value
			else {
				// Read own properties exclusively to disallow indirect
				// prototype pollution
				var desc = Object.getOwnPropertyDescriptor(cursor, level)
				if (desc != null) desc = desc.value
				if (desc == null) cursor[level] = desc = isNumber ? [] : {}
				cursor = desc
			}
		}
	}
	return data
}

},{}],"6Vdep":[function(require,module,exports) {
"use strict"

var parsePathname = require("./parse")

// Compiles a template into a function that takes a resolved path (without query
// strings) and returns an object containing the template parameters with their
// parsed values. This expects the input of the compiled template to be the
// output of `parsePathname`. Note that it does *not* remove query parameters
// specified in the template.
module.exports = function(template) {
	var templateData = parsePathname(template)
	var templateKeys = Object.keys(templateData.params)
	var keys = []
	var regexp = new RegExp("^" + templateData.path.replace(
		// I escape literal text so people can use things like `:file.:ext` or
		// `:lang-:locale` in routes. This is all merged into one pass so I
		// don't also accidentally escape `-` and make it harder to detect it to
		// ban it from template parameters.
		/:([^\/.-]+)(\.{3}|\.(?!\.)|-)?|[\\^$*+.()|\[\]{}]/g,
		function(m, key, extra) {
			if (key == null) return "\\" + m
			keys.push({k: key, r: extra === "..."})
			if (extra === "...") return "(.*)"
			if (extra === ".") return "([^/]+)\\."
			return "([^/]+)" + (extra || "")
		}
	) + "$")
	return function(data) {
		// First, check the params. Usually, there isn't any, and it's just
		// checking a static set.
		for (var i = 0; i < templateKeys.length; i++) {
			if (templateData.params[templateKeys[i]] !== data.params[templateKeys[i]]) return false
		}
		// If no interpolations exist, let's skip all the ceremony
		if (!keys.length) return regexp.test(data.path)
		var values = regexp.exec(data.path)
		if (values == null) return false
		for (var i = 0; i < keys.length; i++) {
			data.params[keys[i].k] = keys[i].r ? values[i + 1] : decodeURIComponent(values[i + 1])
		}
		return true
	}
}

},{"./parse":"4fniD"}],"2fyQP":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "Dashboards", function () {
  return Dashboards;
});
_parcelHelpers.export(exports, "dashboardSvc", function () {
  return dashboardSvc;
});
var _mithril = require('mithril');
var _mithrilDefault = _parcelHelpers.interopDefault(_mithril);
var _componentsLayout = require('../components/layout');
var _componentsHomeHomePage = require('../components/home/home-page');
var _componentsAboutAboutPage = require('../components/about/about-page');
var _componentsButtonsButtonPage = require('../components/buttons/button-page');
var _componentsInputsInputPage = require('../components/inputs/input-page');
var _componentsPickersPickerPage = require('../components/pickers/picker-page');
var _componentsSelectionsSelectionPage = require('../components/selections/selection-page');
var _componentsModalsModalPage = require('../components/modals/modal-page');
var _componentsMiscMiscPage = require('../components/misc/misc-page');
var _componentsCollectionsCollectionsPage = require('../components/collections/collections-page');
var _componentsMapEditorMapEditorPage = require('./../components/map-editor/map-editor-page');
var _componentsTimelineTimelinePage = require('../components/timeline/timeline-page');
var _componentsMiscKanbanPage = require('../components/misc/kanban-page');
let Dashboards;
(function (Dashboards) {
  Dashboards["HOME"] = "HOME";
  Dashboards["BUTTONS"] = "BUTTONS";
  Dashboards["INPUTS"] = "INPUTS";
  Dashboards["PICKERS"] = "PICKERS";
  Dashboards["SELECTIONS"] = "SELECTIONS";
  Dashboards["COLLECTIONS"] = "COLLECTIONS";
  Dashboards["MAP_EDITOR"] = "MAP_EDITOR";
  Dashboards["MODALS"] = "MODALS";
  Dashboards["TIMELINE"] = "TIMELINE";
  Dashboards["KANBAN"] = "KANBAN";
  Dashboards["MISC"] = "MISC";
  Dashboards["ABOUT"] = "ABOUT";
})(Dashboards || (Dashboards = {}));
class DashboardService {
  constructor(layout, dashboards) {
    this.layout = layout;
    this.setList(dashboards);
  }
  getList() {
    return this.dashboards;
  }
  setList(list) {
    this.dashboards = Object.freeze(list);
  }
  get defaultRoute() {
    const dashboard = this.dashboards.filter(d => d.default).shift();
    return dashboard ? dashboard.route : this.dashboards[0].route;
  }
  switchTo(dashboardId, fragment = '') {
    const dashboard = this.dashboards.filter(d => d.id === dashboardId).shift();
    if (dashboard) {
      _mithrilDefault.default.route.set(dashboard.route);
    }
  }
  get routingTable() {
    return this.dashboards.reduce((p, c) => {
      p[c.route] = {
        render: () => _mithrilDefault.default(this.layout, _mithrilDefault.default(c.component))
      };
      return p;
    }, {
    });
  }
}
const dashboardSvc = new DashboardService(_componentsLayout.Layout, [{
  id: Dashboards.HOME,
  default: true,
  title: 'HOME',
  icon: 'home',
  route: '/home',
  visible: true,
  component: _componentsHomeHomePage.HomePage
}, {
  id: Dashboards.BUTTONS,
  title: 'BUTTONS',
  icon: 'crop_16_9',
  route: '/buttons',
  visible: true,
  component: _componentsButtonsButtonPage.ButtonPage
}, {
  id: Dashboards.INPUTS,
  title: 'INPUTS',
  icon: 'create',
  route: '/inputs',
  visible: true,
  component: _componentsInputsInputPage.InputPage
}, {
  id: Dashboards.PICKERS,
  title: 'PICKERS',
  icon: 'access_time',
  route: '/pickers',
  visible: true,
  component: _componentsPickersPickerPage.PickerPage
}, {
  id: Dashboards.SELECTIONS,
  title: 'SELECTIONS',
  icon: 'check',
  route: '/selections',
  visible: true,
  component: _componentsSelectionsSelectionPage.SelectionPage
}, {
  id: Dashboards.MODALS,
  title: 'MODALS',
  icon: 'all_out',
  route: '/modals',
  visible: true,
  component: _componentsModalsModalPage.ModalPage
}, {
  id: Dashboards.COLLECTIONS,
  title: 'COLLECTIONS',
  icon: 'collections',
  route: '/collections',
  visible: true,
  component: _componentsCollectionsCollectionsPage.CollectionsPage
}, {
  id: Dashboards.MAP_EDITOR,
  title: 'MAP-EDITOR',
  icon: 'playlist_add',
  route: '/map_editor',
  visible: true,
  component: _componentsMapEditorMapEditorPage.MapEditorPage
}, {
  id: Dashboards.TIMELINE,
  title: 'TIMELINE',
  icon: 'timeline',
  route: '/timeline',
  visible: true,
  component: _componentsTimelineTimelinePage.TimelinePage
}, {
  id: Dashboards.KANBAN,
  title: 'KANBAN',
  icon: 'dns',
  route: '/kanban',
  visible: true,
  component: _componentsMiscKanbanPage.KanbanPage
}, {
  id: Dashboards.MISC,
  title: 'MISCELLANEOUS',
  icon: 'image',
  route: '/misc',
  visible: true,
  component: _componentsMiscMiscPage.MiscPage
}, {
  id: Dashboards.ABOUT,
  title: 'ABOUT',
  icon: 'info',
  route: '/about',
  visible: true,
  component: _componentsAboutAboutPage.AboutPage
}]);

},{"mithril":"3cEwr","../components/layout":"20wLx","../components/home/home-page":"tiVDD","../components/about/about-page":"5J6sI","../components/buttons/button-page":"7lkDx","../components/inputs/input-page":"1GAX3","../components/pickers/picker-page":"abfjp","../components/selections/selection-page":"4c4bv","../components/modals/modal-page":"44n8f","../components/misc/misc-page":"6uXyH","../components/collections/collections-page":"24ZZb","./../components/map-editor/map-editor-page":"1rsAV","../components/timeline/timeline-page":"5imqj","../components/misc/kanban-page":"27xGi","@parcel/transformer-js/lib/esmodule-helpers.js":"7ae6E"}],"20wLx":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "Layout", function () {
  return Layout;
});
var _mithril = require('mithril');
var _mithrilDefault = _parcelHelpers.interopDefault(_mithril);
var _servicesDashboardService = require('../services/dashboard-service');
const isActive = path => _mithrilDefault.default.route.get().indexOf(path) >= 0 ? '.active' : '';
const Layout = () => ({
  view: vnode => _mithrilDefault.default('.main', [_mithrilDefault.default('nav', _mithrilDefault.default('.nav-wrapper', [_mithrilDefault.default(// tslint:disable-next-line:max-line-length
  'a.github-corner[aria-label=View source on GitHub][href=https://github.com/erikvullings/mithril-materialized]', _mithrilDefault.default('svg[aria-hidden=true][height=80][viewBox=0 0 250 250][width=80]', {
    style: {
      fill: 'black',
      color: '#fff',
      position: 'absolute',
      top: '0',
      border: '0',
      left: '0',
      transform: 'scale(-1, 1)'
    }
  }, [_mithrilDefault.default('path[d=M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z]'), _mithrilDefault.default(// tslint:disable-next-line:max-line-length
  'path.octo-arm[d=M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2][fill=currentColor]', {
    style: {
      'transform-origin': '130px 106px'
    }
  }), _mithrilDefault.default(// tslint:disable-next-line:max-line-length
  'path.octo-body[d=M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z][fill=currentColor]')])), _mithrilDefault.default('style', // tslint:disable-next-line:max-line-length
  '.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}'), _mithrilDefault.default('ul.right', _servicesDashboardService.dashboardSvc.getList().filter(d => d.visible).map(d => _mithrilDefault.default(`li${isActive(d.route)}`, _mithrilDefault.default(_mithrilDefault.default.route.Link, {
    href: d.route
  }, _mithrilDefault.default('i.material-icons.right', d.icon ? _mithrilDefault.default('i.material-icons', d.icon) : d.title)))))])), _mithrilDefault.default('.container', _mithrilDefault.default('.row', vnode.children))])
});

},{"mithril":"3cEwr","../services/dashboard-service":"2fyQP","@parcel/transformer-js/lib/esmodule-helpers.js":"7ae6E"}],"7ae6E":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"tiVDD":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "HomePage", function () {
  return HomePage;
});
var _servicesDashboardService = require('../../services/dashboard-service');
var _mithril = require('mithril');
var _mithrilDefault = _parcelHelpers.interopDefault(_mithril);
var _mithrilMaterialized = require('mithril-materialized');
const HomePage = () => ({
  view: () => _mithrilDefault.default('.row', [_mithrilDefault.default('.col.s12.m7.l8', _mithrilDefault.default('.introduction', [_mithrilDefault.default('h2', 'About Mithril-Materialized'), _mithrilDefault.default('p', `I like Mithril, and I also like materialize-css. However, to create some materialized components
          is a bit cumbersome as it requires a lot of HTML elements and a specific nesting which can easily go
          wrong. For that reason, the mithril-materialized library provides you with several ready-made
          Mithril components, so you can easily use them in your own application.`), _mithrilDefault.default('p', ['You can check out the API documentation ', _mithrilDefault.default('a[href="https://erikvullings.github.io/mithril-materialized/typedoc/index.html"]', 'here'), '.']), _mithrilDefault.default('h3', 'Installation'), _mithrilDefault.default('p', 'First, you need to install the required packages:'), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
    language: 'console',
    code: `npm i materialize-css material-icons mithril mithril-materialized
# Also install the typings if you use TypeScript
npm i --save-dev @types/materialize-css @types/mithril`
  }), _mithrilDefault.default('p', 'Next, you can use them inside your application:'), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
    code: `import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import { TextArea } from 'mithril-materialized';
`
  })])), _mithrilDefault.default('.col.s12.m5.l4', [_mithrilDefault.default('h1', 'Contents'), _mithrilDefault.default('ul.collection', [_servicesDashboardService.dashboardSvc.getList().filter(d => d.visible && !d.default).map(d => _mithrilDefault.default('li.collection-item', _mithrilDefault.default('a', {
    href: `#!${d.route}`
  }, d.title)))])])])
});

},{"../../services/dashboard-service":"2fyQP","mithril":"3cEwr","mithril-materialized":"6KIT1","@parcel/transformer-js/lib/esmodule-helpers.js":"7ae6E"}],"6KIT1":[function(require,module,exports) {
var e=require("mithril"),t=require("materialize-css");function a(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var n=a(e),i=a(t),o=function(){return"idxxxxxxxx".replace(/[x]/g,function(){return(16*Math.random()|0).toString(16)})},r=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})},l=function(){var e=arguments;return function(t){return[].slice.call(e).reduceRight(function(e,t){return t(e)},t)}},d=function(e){return function(t){return Array.prototype.map.call(t,e)}},c=function(e){return function(t){return Array.prototype.join.call(t,e)}},u=function(e){return e.replace(/([A-Z])/g,function(e){return"-"+e.toLowerCase()})},s=function(e){return e?l(c(""),d(function(t){return"["+u(t)+'="'+function(e){return void 0===e&&(e=""),e.toString().replace(/"/g,"&quot;")}(e[t])+'"]'}),Object.keys)(e):""},f=["min","max","minLength","maxLength","rows","cols","placeholder","autocomplete","pattern","readOnly","step"],v=function(e){return f.indexOf(e)>=0},p=function(e){return e.disabled?"[disabled]":""},m=function(e){return e.required||e.isMandatory?"[required][aria-required=true]":""},h=function(e){return function(e){var t,a=(t=e,function(e){return void 0!==t[e]});return Object.keys(e).filter(v).filter(a).reduce(function(t,a){var n=e[a];return t.push("["+a.toLowerCase()+"="+n+"]"),t},[]).join("")}(e)+function(e){return e.maxLength?"[data-length="+e.maxLength+"]":""}(e)+p(e)+m(e)+("boolean"==typeof(t=e.autofocus)&&t||t&&t()?"[autofocus]":"");var t},b=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},g=function(e,t,a){return void 0===t&&(t=2),void 0===a&&(a="0"),(e+="").length>=t?e:new Array(t-e.length+1).join(a)+e},x=function(e,t,a){var n=e[t];e.splice(t,1),e.splice(a,0,n)};function y(){return(y=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}function k(e,t){if(null==e)return{};var a,n,i={},o=Object.keys(e);for(n=0;n<o.length;n++)t.indexOf(a=o[n])>=0||(i[a]=e[a]);return i}var w,I=["label","id","isMandatory","isActive"],N={view:function(e){return n.default("span.mandatory",e.attrs,"*")}},C=function(){return{view:function(e){var t=e.attrs,a=t.label,i=t.id,o=t.isMandatory,r=t.isActive,l=k(t,I);return a?n.default("label"+(r?".active":"")+(i?"[for="+i+"]":""),l,[n.default.trust(a),o?n.default(N):void 0]):void 0}}},T=function(){return{view:function(e){var t=e.attrs,a=t.helperText,i=t.dataError,o=t.dataSuccess,r=i||o?s({dataError:i,dataSuccess:o}):"";return a||r?n.default("span.helper-text"+r,a?n.default.trust(a):""):void 0}}},A=["iconName"],S=function(){return{view:function(e){var t=e.attrs,a=t.iconName,i=k(t,A);return n.default("i.material-icons",i,a)}}},V=["modalId","tooltip","tooltipPostion","iconName","iconClass","label","attr"],_=function(e,t){return void 0===t&&(t=""),function(){var a=""+e+t;return{view:function(e){var t=e.attrs,i=t.modalId,o=t.tooltip,r=t.tooltipPostion,l=t.iconName,d=t.iconClass,c=t.label,u=t.attr,f=k(t,V);return n.default(a+(i?".modal-trigger[href=#"+i+"]":"")+(o?".tooltipped[data-position="+(r||"top")+"][data-tooltip="+o+"]":"")+s(u),f,l?n.default(S,{iconName:l,className:d||"left"}):void 0,c||void 0)}}}},L=_("a.waves-effect.waves-light.btn"),D=_("a.waves-effect.waves-light.btn-large"),B=_("a.waves-effect.waves-light.btn-small"),E=_("a.waves-effect.waves-teal.btn-flat"),O=_("button.btn-floating.btn-large.waves-effect.waves-light"),F=_("button.btn.waves-effect.waves-light","[type=submit]"),R=function(){return{view:function(e){var t=e.attrs;return n.default("a.carousel-item",{href:t.href},n.default("img[src="+t.src+"]"))}}},j=function(){return{view:function(e){var t=e.attrs,a=t.header,i=t.body,o=t.iconName;return n.default(t.active?"li.active":"li",[a||o?n.default(".collapsible-header",[o?n.default("i.material-icons",o):void 0,a?"string"==typeof a?n.default("span",a):a:void 0]):void 0,i?n.default(".collapsible-body",i):void 0])}}},K=["header","items","mode"],q=["title","active","href"],P=["items","header"],U=["items","header","mode"];exports.CollectionMode=void 0,(w=exports.CollectionMode||(exports.CollectionMode={}))[w.BASIC=0]="BASIC",w[w.LINKS=1]="LINKS",w[w.AVATAR=2]="AVATAR";var z=function(e){return e&&/https?:\/\//.test(e)},H=function(){return{view:function(e){var t=e.attrs,a=t.href,i=t.iconName,o=void 0===i?"send":i,r=t.onclick,l=t.style,d={href:a,style:void 0===l?{cursor:"pointer"}:l,className:"secondary-content",onclick:r?function(){return r(t)}:void 0};return z(a)||!a?n.default("a[target=_]",d,n.default(S,{iconName:o})):n.default(n.default.route.Link,d,n.default(S,{iconName:o}))}}},Y=function(e){return void 0===e&&(e=""),/\./.test(e)},J=function(){return{view:function(e){var t=e.attrs,a=t.item,i=a.title,o=a.content,r=void 0===o?"":o,l=a.active,d=a.iconName,c=a.avatar,u=a.className,s=a.onclick;return t.mode===exports.CollectionMode.AVATAR?n.default("li.collection-item.avatar"+(l?".active":""),{onclick:s?function(){return s(a)}:void 0},[Y(c)?n.default("img.circle",{src:c}):n.default("i.material-icons.circle",{className:u},c),n.default("span.title",i),n.default("p",n.default.trust(r)),n.default(H,a)]):n.default("li.collection-item"+(l?".active":""),d?n.default("div",[i,n.default(H,a)]):i)}}},$=function(){return{view:function(e){var t=e.attrs,a=t.header,i=t.items,o=t.mode,r=void 0===o?exports.CollectionMode.BASIC:o,l=k(t,K),d=i.map(function(e){return n.default(J,{key:e.id,item:e,mode:r})});return a?n.default("ul.collection.with-header",l,[n.default("li.collection-header",n.default("h4",a)),d]):n.default("ul.collection",l,d)}}},W=function(){return{view:function(e){var t=e.attrs.item,a=t.title,i=t.active,o=t.href,r=y({},k(t,q),{className:"collection-item "+(i?"active":""),href:o});return z(o)||!o?n.default("a[target=_]",r,a):n.default(n.default.route.Link,r,a)}}},Z=function(){return{view:function(e){var t=e.attrs,a=t.items,i=t.header,o=k(t,P);return i?n.default(".collection.with-header",o,[n.default(".collection-header",n.default("h4",i)),a.map(function(e){return n.default(W,{key:e.id,item:e})})]):n.default(".collection",o,a.map(function(e){return n.default(W,{key:e.id,item:e})}))}}},G=function(){return{view:function(e){var t=e.attrs,a=t.items,i=t.header,o=t.mode,r=void 0===o?exports.CollectionMode.BASIC:o,l=k(t,U);return i||a&&a.length>0?r===exports.CollectionMode.LINKS?n.default(Z,y({header:i,items:a},l)):n.default($,y({header:i,items:a,mode:r},l)):void 0}}},Q=["key","label","onchange","disabled","items","iconName","helperText","style","className"],X=function(){var e={};return{oninit:function(t){var a=t.attrs,n=a.id,i=void 0===n?o():n,r=a.initialValue,l=a.checkedId;e.id=i,e.initialValue=r||l},view:function(t){var a=t.attrs,i=a.key,o=a.label,r=a.onchange,l=a.disabled,d=void 0!==l&&l,c=a.items,u=a.iconName,s=a.helperText,f=a.style,v=a.className,p=void 0===v?"col s12":v,m=k(a,Q),h=e.id,b=e.initialValue,g=b?c.filter(function(e){return e.id?e.id===b:e.label===b}).shift():void 0,x=g?g.label:o||"Select";return n.default(".input-field",{className:p,key:i,style:f},[u?n.default("i.material-icons.prefix",u):void 0,n.default(T,{helperText:s}),n.default("a.dropdown-trigger.btn.truncate[href=#][data-target="+h+"]"+(d?"[disabled]":""),{className:"col s12",style:f||(u?"margin: 0.2em 0 0 3em;":void 0),oncreate:function(e){M.Dropdown.init(e.dom,m)}},x),n.default("ul.dropdown-content[id="+h+"]",c.map(function(t){return n.default("li"+(t.divider?".divider[tabindex=-1]":""),t.divider?void 0:n.default("a",{onclick:r?function(){e.initialValue=t.id||t.label,r(e.initialValue)}:void 0},[t.iconName?n.default("i.material-icons",t.iconName):void 0,t.label]))}))])}}},ee=["className","iconName","iconClass","position","style","buttons"],te=["className","helperText","iconName","id","initialValue","isMandatory","label","onchange","style"],ae=["className","dataError","dataSuccess","helperText","iconName","id","initialValue","isMandatory","label","maxLength","newRow","onchange","onkeydown","onkeypress","onkeyup","style","validate"],ne=function(){var e={id:o()};return{view:function(t){var a=t.attrs,o=a.className,r=void 0===o?"col s12":o,l=a.helperText,d=a.iconName,c=a.id,u=void 0===c?e.id:c,s=a.initialValue,f=a.isMandatory,v=a.label,p=a.onchange,m=a.style,b=k(a,te),g=h(b);return console.log(g),n.default(".input-field",{className:r,style:m},[d?n.default("i.material-icons.prefix",d):"",n.default("textarea.materialize-textarea[tabindex=0][id="+u+"]"+g,{oncreate:function(e){var t=e.dom;i.default.textareaAutoResize(t),a.maxLength&&i.default.CharacterCounter.init(t)},onchange:p?function(e){var t=e.target;p(t&&"string"==typeof t.value?t.value:"")}:void 0,value:s}),n.default(C,{label:v,id:u,isMandatory:f,isActive:s||a.placeholder}),n.default(T,{helperText:l})])}}},ie=function(e,t){return void 0===t&&(t=""),function(){var a={id:o()},r=function(t){var a=t.value;return!a||"number"!==e&&"range"!==e?a:+a},l=function(e,t){e.setCustomValidity("boolean"==typeof t?t?"":"Custom validation failed":t)};return{view:function(o){var d=o.attrs,c=d.className,u=void 0===c?"col s12":c,s=d.dataError,f=d.dataSuccess,v=d.helperText,p=d.iconName,m=d.id,b=void 0===m?a.id:m,g=d.initialValue,x=d.isMandatory,y=d.label,w=d.maxLength,I=d.newRow,N=d.onchange,M=d.onkeydown,A=d.onkeypress,S=d.onkeyup,V=d.style,_=d.validate,L=k(d,ae),D=h(L);return n.default(".input-field"+(I?".clear":"")+t,{className:u,style:V},[p?n.default("i.material-icons.prefix",p):void 0,n.default("input.validate[type="+e+"][tabindex=0][id="+b+"]"+D,{oncreate:function(t){var a,n=t.dom;(a=d.autofocus)&&("boolean"==typeof a?a:a())&&n.focus(),w&&i.default.CharacterCounter.init(n),"range"===e&&i.default.Range.init(n)},onkeyup:S?function(e){S(e,r(e.target))}:void 0,onkeydown:M?function(e){M(e,r(e.target))}:void 0,onkeypress:A?function(e){A(e,r(e.target))}:void 0,onupdate:_?function(e){var t=e.dom;l(t,_(r(t),t))}:void 0,onchange:function(e){var t=e.target;if(t){var a=r(t);N&&N(a),_&&l(t,_(a,t))}},value:g}),n.default(C,{label:y,id:b,isMandatory:x,isActive:!(void 0===g&&!d.placeholder&&"number"!==e&&"color"!==e&&"range"!==e)}),n.default(T,{helperText:v,dataError:s,dataSuccess:f})])}}}},oe=ie("text"),re=ie("password"),le=ie("number"),de=ie("url"),ce=ie("color"),ue=ie("range",".range-field"),se=ie("email"),fe=["label","helperText","initialValue","newRow","className","iconName","isMandatory","onchange","disabled"],ve=["label","helperText","initialValue","newRow","className","iconName","isMandatory","onchange","disabled"],pe=function(){var e={id:o()};return{view:function(t){var a=t.attrs,i=a.label,o=a.helperText,r=a.initialValue,l=a.newRow,d=a.className,c=void 0===d?"col s12":d,u=a.iconName,s=a.isMandatory,f=a.onchange,v=a.disabled,p=k(a,fe),m=e.id,b=h(p),g=f?function(){return e.dp&&f(e.dp.date)}:void 0;return n.default(".input-field"+(l?".clear":""),{className:c,onremove:function(){return e.dp&&e.dp.destroy()}},[u?n.default("i.material-icons.prefix",u):"",n.default("input.datepicker[type=text][tabindex=0][id="+m+"]"+b+(v?"[disabled]":""),{oncreate:function(t){e.dp=M.Datepicker.init(t.dom,y({format:"yyyy/mm/dd",showClearBtn:!0,setDefaultDate:!0,defaultDate:r?new Date(r):new Date},p,{onClose:g}))}}),n.default(C,{label:i,id:m,isMandatory:s,isActive:!!r}),n.default(T,{helperText:o})])}}},me=function(){var e={id:o()};return{view:function(t){var a=t.attrs,i=a.label,o=a.helperText,r=a.initialValue,l=a.newRow,d=a.className,c=void 0===d?"col s12":d,u=a.iconName,s=a.isMandatory,f=a.onchange,v=a.disabled,p=k(a,ve),m=e.id,b=h(p),g=l?".clear":"",x=new Date,w=f?function(){return e.tp&&f(e.tp.time||r||x.getHours()+":"+x.getMinutes())}:void 0;return n.default(".input-field.timepicker"+g,{className:c,onremove:function(){return e.tp&&e.tp.destroy()}},[u?n.default("i.material-icons.prefix",u):"",n.default("input[type=text][tabindex=0][id="+m+"]"+b+(v?"[disabled]":""),{value:r,oncreate:function(t){e.tp=M.Timepicker.init(t.dom,y({twelveHour:!1,showClearBtn:!0,defaultTime:r},p,{onCloseEnd:w}))}}),n.default(C,{label:i,id:m,isMandatory:s,isActive:r}),n.default(T,{helperText:o})])}}},he=function(){return{view:function(e){var t=e.attrs,a=t.className,i=t.onchange,o=t.label;return n.default("div",{className:void 0===a?"col s12":a},n.default("label",[n.default("input[type=checkbox][tabindex=0]"+(t.checked?"[checked]":"")+(t.disabled?"[disabled]":""),{onclick:i?function(e){e.target&&void 0!==e.target.checked&&i(e.target.checked)}:void 0}),o?"string"==typeof o?n.default("span",o):o:void 0]))}}},be=function(){var e={},t=function(t){return e.checkedIds.indexOf(t)>=0};return{oninit:function(t){var a=t.attrs,n=a.checkedId,i=n||a.initialValue;e.checkedId=n,e.checkedIds=i?i instanceof Array?[].concat(i):[i]:[]},view:function(a){var i=a.attrs,o=i.label,r=i.id,l=i.options,d=i.checkedId,c=i.description,u=i.className,s=void 0===u?"col s12":u,f=i.disabled,v=i.checkboxClass,p=i.newRow,m=i.isMandatory,h=i.onchange;d&&e.checkedId!==d&&(e.checkedId=d,e.checkedIds=d instanceof Array?d:[d]);var b=h?function(t,a){var n=e.checkedIds.filter(function(e){return e!==t});a&&n.push(t),e.checkedIds=n,h(n)}:void 0;return n.default("div"+(p?".clear":""),{className:s},[n.default("div",{className:"input-field options"},n.default(C,{id:r,label:o,isMandatory:m})),n.default(T,{helperText:c})].concat(l.map(function(e){return n.default(he,{disabled:f||e.disabled,label:e.label,onchange:b?function(t){return b(e.id,t)}:void 0,className:v,checked:t(e.id)})})))}}},ge=function(){var e={},t=function(e){return e.map(function(e){return e.id}).join("")},a=function(e,t,a){return void 0===a&&(a=!1),a||(t instanceof Array&&(e||"number"==typeof e)?t.indexOf(e)>=0:t===e)};return{oninit:function(a){var n=a.attrs,i=n.checkedId,o=n.initialValue;e.ids=t(n.options);var r=i||o;e.checkedId=i,e.initialValue=r?r instanceof Array?[].concat(r.filter(function(e){return null!==e})):[r]:[]},view:function(i){var o=i.attrs,r=o.id,l=o.newRow,d=o.className,c=void 0===d?"col s12":d,u=o.checkedId,s=o.key,f=o.options,v=o.multiple,p=o.label,m=o.helperText,h=o.placeholder,g=o.isMandatory,x=o.iconName,y=o.disabled,k=o.classes,w=o.dropdownOptions,I=o.onchange;e.checkedId!==u&&(e.initialValue=u?u instanceof Array?u:[u]:void 0);var N=e.initialValue,A=I?v?function(){var t=e.instance&&e.instance.getSelectedValues(),a=t?t.length>0&&b(t[0])?t.map(function(e){return+e}):t.filter(function(e){return null!==e||void 0!==e}):void 0;e.initialValue=a||[],I(e.initialValue)}:function(t){if(t&&t.currentTarget){var a=t.currentTarget,n=b(a.value)?+a.value:a.value;e.initialValue=void 0!==typeof n?[n]:[]}e.initialValue&&I(e.initialValue)}:void 0,S=l?".clear":"",V=y?"[disabled]":"",_=v?"[multiple]":"",L=0===f.filter(function(e){return a(e.id,N)}).length;return n.default(".input-field.select-space"+S,{className:c,key:s},[x&&n.default("i.material-icons.prefix",x),n.default("select[id="+r+"]"+V+_,{oncreate:function(t){e.instance=M.FormSelect.init(t.dom,{classes:k,dropdownOptions:w})},onupdate:function(a){var n=a.dom,i=t(f),o=u&&e.checkedId!==u.toString();e.ids!==i&&(e.ids=i,o=!0),e.checkedId!==u&&(e.checkedId=u,o=!0),o&&(e.instance=M.FormSelect.init(n,{classes:k,dropdownOptions:w}))},onchange:A},h?n.default("option[disabled]"+(L?"[selected]":""),h):"",f.map(function(e,t){return n.default("option[value="+e.id+"]"+(e.disabled?"[disabled]":"")+(a(e.id,N,0===t&&L&&!h)?"[selected]":""),e.label.replace("&amp;","&"))})),n.default(C,{label:p,isMandatory:g}),n.default(T,{helperText:m})])}}},xe=function(){var e={groupId:o()};return{oninit:function(t){var a=t.attrs,n=a.checkedId,i=a.initialValue;e.oldCheckedId=n,e.checkedId=n||i},view:function(t){var a=t.attrs,i=a.id,o=a.checkedId,r=a.newRow,l=a.className,d=void 0===l?"col s12":l,c=a.label,u=void 0===c?"":c,s=a.disabled,f=a.description,v=a.options,p=a.isMandatory,m=a.checkboxClass,h=a.onchange;e.oldCheckedId!==o&&(e.oldCheckedId=e.checkedId=o);var b=e.groupId,g=e.checkedId,x=function(t){e.checkedId=t,h&&h(t)};return n.default("div"+(i?"[id="+i+"]":"")+(r?".clear":""),{className:d},[n.default("div",{className:"input-field options"},n.default(C,{id:i,label:u,isMandatory:p})),f?n.default("p.helper-text",n.default.trust(f)):""].concat(v.map(function(e){return n.default(ye,y({},e,{onchange:x,groupId:b,disabled:s,className:m,checked:e.id===g}))})))}}},ye=function(){return{view:function(e){var t=e.attrs,a=t.id,i=t.label,o=t.onchange,r=t.className;return n.default("div",{className:void 0===r?"col s12":r},n.default("label",[n.default("input[type=radio][tabindex=0][name="+t.groupId+"]"+(t.checked?"[checked=checked]":"")+(t.disabled?"[disabled]":""),{onclick:o?function(){return o(a)}:void 0}),n.default("span",n.default.trust(i))]))}}},ke=["component","required","options","autogenerate"],we=function(e,t,a){var i=e.component,l=e.required,d=e.options,c=e.autogenerate,u=k(e,ke);void 0===a&&(a={});var s=a.containerId,f=a.autofocus,v=a.disabled,p=void 0!==v&&v,m=a.onchange,h=a.multiline,b=a.key;c&&m&&m("id"===c?o():r(),!1);var g=l?function(e){return e instanceof Array?e&&e.length>0:void 0!==typeof e}:void 0;switch(i){case"text":return n.default(h?ne:oe,y({},u,{key:b,isMandatory:l,validate:g,autofocus:f,disabled:p,onchange:m,initialValue:t}));case"number":return n.default(le,y({},u,{key:b,isMandatory:l,validate:g,autofocus:f,disabled:p,onchange:m,initialValue:t}));case"url":return n.default(de,y({},u,{key:b,isMandatory:l,validate:g,autofocus:f,disabled:p,onchange:m,initialValue:t}));case"email":return n.default(se,y({},u,{key:b,isMandatory:l,validate:g,autofocus:f,disabled:p,onchange:m,initialValue:t}));case"checkbox":return n.default(he,y({},u,{validate:g,disabled:p,onchange:m,checked:t}));case"select":return n.default(ge,y({},u,{key:b,options:d||[{id:"none",label:"Unspecified"}],disabled:p,isMandatory:l,validate:g,onchange:function(e){return e&&m&&m(e)},checkedId:t}));case"options":return n.default(be,y({},u,{key:b,options:d||[{id:"none",label:"Unspecified"}],disabled:p,isMandatory:l,validate:g,onchange:function(e){return m&&m(e)},checkedId:t}));case"radios":return n.default(xe,y({},u,{key:b,options:d||[{id:"none",label:"Unspecified"}],disabled:p,isMandatory:l,validate:g,onchange:function(e){return e&&m&&m(e)},checkedId:t}));case"date":var x=t||new Date;return!t&&m&&m(x),n.default(pe,y({},u,{key:b,isMandatory:l,autofocus:f,disabled:p,onchange:m,initialValue:x,container:s?document.getElementById(s):document.body}));case"time":var w=t||"00:00";return!t&&m&&m(w),n.default(me,y({},u,{key:b,isMandatory:l,autofocus:f,disabled:p,onchange:m,initialValue:w,container:s||document.body.id}));default:return}},Ie=function(){var e={};return{view:function(t){var a=t.attrs,i=a.el,o=void 0===i?".row":i,r=a.model,l=a.item,d=a.containerId,c=a.disabled,u=void 0!==c&&c,s=a.editableIds,f=void 0===s?[]:s,v=a.onchange;return e.item=l,e.model=r,v&&v(!1),n.default(o,{style:"margin-bottom: -15px;",key:l.id},r.map(function(t,a){return we(t,l[t.id],{containerId:d,autofocus:0===a,disabled:u&&f.indexOf(t.id)<0,onchange:u&&f.indexOf(t.id)<0?void 0:function(a,n){void 0===n&&(n=!0),(n||void 0===e.item[t.id])&&(e.item[t.id]=a,v&&v(function(){var t=e.item;return e.model.filter(function(e){return e.required}).reduce(function(e,a){return e&&!(void 0===t[a.id]||t[a.id]instanceof Array&&0===t[a.id].length||"string"==typeof t[a.id]&&0===t[a.id].length)},!0)}()))}})}))}}},Ne=function(){return{oncreate:function(e){var t=e.attrs,a=t.onCreate,n=M.Modal.init(e.dom,t.options);a&&a(n)},view:function(e){var t=e.attrs,a=t.description,i=t.buttons,o=t.richContent;return n.default(".modal"+(t.fixedFooter?".modal-fixed-footer":"")+(t.bottomSheet?".bottom-sheet":"")+"[id="+t.id+"]",[n.default(".modal-content",[n.default("h4",t.title),o&&"string"==typeof a?n.default.trust(a||""):"string"==typeof a?n.default("p",a):a]),i?n.default(".modal-footer",i.map(function(e){return n.default(E,y({},e,{className:"modal-close"}))})):void 0])}}},Ce=function(){return{view:function(e){var t=e.attrs,a=t.title;return n.default("li",{className:t.active?"active":t.disabled?"disabled":"waves-effect"},"number"==typeof a?n.default(n.default.route.Link,{href:t.href},a):a)}}},Me=function(){return{view:function(e){var t=e.attrs,a=t.id,i=t.title,o=t.datetime,r=t.active,l=t.content,d=t.iconName,c=t.timeFormatter,u=t.onSelect;return n.default("li"+(r?".active":"")+(a?"[id="+a+"]":""),{onclick:u?function(){return u({id:a,title:i,datetime:o,active:r,content:l})}:void 0,style:u?"cursor: pointer;":void 0},[n.default(".mm_time",{datetime:o},[n.default("span",(0,t.dateFormatter)(o)),n.default("span",c(o))]),d?n.default(".mm_icon",n.default("i.material-icons",d)):void 0,n.default(".mm_label",[i?"string"==typeof i?n.default("h5",i):i:void 0,l?"string"==typeof l?n.default("p",l):l:void 0])])}}};exports.AnchorItem=W,exports.Autocomplete=function(){var e={id:o()};return{view:function(t){var a=t.attrs,i=a.id||e.id,o=h(a),r=a.label,l=a.helperText,d=a.initialValue,c=a.onchange,u=a.className,s=a.iconName,f=a.isMandatory;return n.default(".input-field"+(a.newRow?".clear":""),{className:void 0===u?"col s12":u,style:a.style},[s?n.default("i.material-icons.prefix",s):"",n.default("input.autocomplete[type=text][tabindex=0][id="+i+"]"+o,{oncreate:function(e){M.Autocomplete.init(e.dom,a)},onchange:c?function(e){e.target&&e.target.value&&c(e.target.value)}:void 0,value:d}),n.default(C,{label:r,id:i,isMandatory:f,isActive:d}),n.default(T,{helperText:l})])}}},exports.Button=L,exports.ButtonFactory=_,exports.Carousel=function(){return{view:function(e){var t=e.attrs,a=t.items;return a&&a.length>0?n.default(".carousel",{oncreate:function(e){M.Carousel.init(e.dom,t)}},a.map(function(e){return n.default(R,e)})):void 0}}},exports.CarouselItem=R,exports.Chips=function(){return{oncreate:function(e){var t=e.attrs,a=e.dom,n=t.onchange,i=t.onChipAdd,o=t.onChipDelete,r=M.Chips.getInstance(a.children[0]),l=i?i.bind(r):void 0;t.onChipAdd=function(e,t){n&&n(this.chipsData),l&&l(e,t)};var d=o?o.bind(r):void 0;t.onChipDelete=function(e,t){n&&n(this.chipsData),d&&d(e,t)},M.Chips.init(a.children[0],t)},onupdate:function(e){var t=e.attrs.data;if(t&&0!==t.length){var a=M.Chips.getInstance(e.dom.children[0]);t.forEach(function(e){return a.addChip(e)})}},view:function(e){var t=e.attrs,a=t.className,i=t.label,o=t.helperText;return n.default(".input-field",{className:void 0===a?"col s12":a},[n.default(".chips.chips-autocomplete"+(t.placeholder?".chips-placeholder":"")+(t.data?".chips-initial":"")),i?n.default(C,{label:i,className:"active"}):void 0,o?n.default(T,{helperText:o}):void 0])}}},exports.CodeBlock=function(){return{view:function(e){var t=e.attrs,a=t.newRow,i=t.code,o=t.language||"lang-TypeScript",r=o.replace("lang-",""),l=i instanceof Array?i.join("\n"):i;return n.default("pre.codeblock"+(a?".clear":""),t,[n.default("div",n.default("label",r)),n.default("code."+o,l)])}}},exports.Collapsible=function(){return{oncreate:function(e){M.Collapsible.init(e.dom,e.attrs)},view:function(e){var t=e.attrs.items;return t&&t.length>0?n.default("ul.collapsible",t.map(function(e){return n.default(j,e)})):void 0}}},exports.CollapsibleItem=j,exports.Collection=G,exports.ColorInput=ce,exports.DatePicker=pe,exports.Dropdown=X,exports.EmailInput=se,exports.FileInput=function(){var e,t=!1;return{view:function(a){var i=a.attrs,o=i.multiple,r=i.disabled,l=i.initialValue,d=i.placeholder,c=i.onchange,u=i.className,s=void 0===u?"col s12":u,f=i.accept,v=i.label,p=void 0===v?"File":v,m=f?f instanceof Array?f.join(", "):f:void 0,h=m?"[accept="+m+"]":"",b=o?"[multiple]":"",g=r?"[disabled]":"",x=d?"[placeholder="+d+"]":"";return n.default(".file-field.input-field",{className:i.class||s},[n.default(".btn",[n.default("span",p),n.default("input[type=file]"+b+g+h,{onchange:c?function(e){var a=e.target;a&&a.files&&c&&(t=!0,c(a.files))}:void 0})]),n.default(".file-path-wrapper",n.default("input.file-path.validate"+x+"[type=text]",{oncreate:function(t){e=t.dom,l&&(e.value=l)}})),(t||l)&&n.default("a.waves-effect.waves-teal.btn-flat",{style:"float: right;position: relative;top: -3rem; padding: 0",onclick:function(){t=!1,e.value="",c&&c({})}},n.default("i.material-icons","clear"))])}}},exports.FlatButton=E,exports.FloatingActionButton=function(){return{view:function(e){var t=e.attrs,a=t.className,i=t.iconName,o=t.iconClass,r=void 0===o?"large":o,l=t.position,d=t.style,c=void 0===d?"left"===l||"inline-left"===l?"position: absolute; display: inline-block; left: 24px;":"right"===l||"inline-right"===l?"position: absolute; display: inline-block; right: 24px;":void 0:d,u=t.buttons,s=k(t,ee),f=n.default(".fixed-action-btn",{style:c,oncreate:function(e){return M.FloatingActionButton.init(e.dom,s)}},[n.default("a.btn-floating.btn-large",{className:a},n.default("i.material-icons",{classNames:r},i)),u?n.default("ul",u.map(function(e){return n.default("li",n.default("a.btn-floating",{className:e.className,onclick:function(t){return e.onClick&&e.onClick(t)}},n.default("i.material-icons",{className:e.iconClass},e.iconName)))})):void 0]);return"inline-right"===l||"inline-left"===l?n.default("div",{style:"position: relative; height: 70px;"},f):f}}},exports.HelperText=T,exports.Icon=S,exports.InputCheckbox=he,exports.Kanban=function(){var e={id:o()},t=function(){return e.onchange&&e.onchange(e.items)},a=function(e,t){var a=e.getBoundingClientRect();return t.clientY-a.top<a.height/2?"above":"below"},i=function e(t){var a=t.getAttribute("data-kanban-index");return a?+a:t.parentElement?e(t.parentElement):-1},l=function e(t){return!!/kanban__item/.test(t.className)||!!t.parentElement&&e(t.parentElement)},d=function e(t){return/kanban__item/.test(t.className)?t:t.parentElement?e(t.parentElement):null},c=function(t,a,n){return e.moveBetweenList?"above"===t?a:a+1:n<a?"above"===t?a-1:a:"above"===t?a:a-1},u={draggable:!0,ondrop:function(n){n.preventDefault();var l=e.dragIndex,u=e.moveBetweenList,s=e.copying,f=n.target,v=d(f);if(v){v.classList.remove("kanban__above","kanban__below");var p=a(f,n),m=i(f),h=c(p,m,l);if(h<l&&e.dragIndex++,u&&n.dataTransfer){var b=JSON.parse(n.dataTransfer.getData("application/json"));s&&function(t){e.model.filter(function(e){return e.autogenerate}).forEach(function(e){t[e.id]="id"===e.autogenerate?o():r()})}(b),e.items.splice(h,0,b)}else x(e.items,l,h);t()}},ondragstart:function(t){var a=t.target;if(t.dataTransfer){var n=e.items;t.dataTransfer.effectAllowed="copyMove",e.dragIndex=i(a),t.dataTransfer.setData("application/json",JSON.stringify(n[e.dragIndex],null,2))}},ondragover:function(t){t.redraw=!1,t.preventDefault();var n=d(t.target);if(n&&t.dataTransfer){var o=t.getModifierState("Control");n.classList.remove("kanban__above","kanban__below");var r=a(n,t);!function(t,a){if(!l(t))return!1;var n=e.dragIndex;if(e.moveBetweenList)return!0;var o=i(t),r=c(a,o,n);return n!==o&&r!==n}(n,r)?t.dataTransfer.dropEffect="none":(n.classList.add("kanban__"+r),e.copying=o,t.dataTransfer.dropEffect=o?"copy":"move")}},ondragleave:function(e){e.redraw=!1;var t=d(e.target);t&&t.classList.remove("kanban__above","kanban__below")},ondragend:function(a){a.dataTransfer&&"move"===a.dataTransfer.dropEffect&&(e.items.splice(e.dragIndex,1),t())}};return{oninit:function(t){var a=t.attrs,n=a.items,i=a.canEdit,o=void 0===i||i,r=a.canSort,l=void 0===r||r,d=a.canDrag,c=void 0!==d&&d,u=a.sortDirection,s=void 0===u?"asc":u,f=a.model,v=void 0===f?[]:f,p=a.label,m=void 0===p?"item":p,h=a.i18n,b=void 0===h?{newItem:"New "+m,modalDeleteItem:"Delete "+m,modalCreateNewItem:"Create new "+m,modalEditNewItem:"Edit new "+m}:h,g=a.containerId,x=a.editableIds,k=void 0===x?[]:x,w=a.fixedFooter,I=void 0!==w&&w,N=a.moveBetweenList,C=void 0!==N&&N;e.items=(void 0===n?[]:n).map(function(e){return y({},e)}),e.model=v,e.i18n=b,e.canEdit=o,e.canSort=l,e.canDrag=c,e.sortDirection=s,e.containerId=g,e.fixedFooter=I,e.editId="edit_item_"+e.id,e.deleteId="delete_item_"+e.id,e.moveBetweenList=C,e.editableIds=k,e.sortableIds=[{label:"None"}].concat(v.filter(function(e){return e.label}).map(function(e){return{label:e.label,id:e.id}}))},view:function(a){var i=a.attrs,o=i.disabled,r=i.onchange,l=e.model,d=e.items,c=e.canSort,s=e.sortDirection,f=e.curSortId,v=e.i18n,p=e.containerId,m=e.fixedFooter,h=e.canDrag,b=e.canEdit,g=e.moveBetweenList,x=e.sortableIds,k=e.editableIds;if(l){e.onchange=r;var w="asc"===s?1:-1,I=c&&f?d.sort(function(e,t){return e[f]>t[f]?w:e[f]<t[f]?-w:0}):d;return n.default(".kanban",[n.default(".row.kanban__menu",{style:"margin-bottom: 0;"},[b&&!o?n.default(E,{label:v.newItem,modalId:e.editId,iconName:"add",onclick:function(){e.curItem=void 0,e.updatedItem={}}}):void 0,c&&!h&&x&&d.length>1?[n.default(E,{iconName:"sort",iconClass:"asc"===s?"left twist":"",className:"right",onclick:function(){e.sortDirection="asc"===e.sortDirection?"desc":"asc"}}),n.default(X,{items:x,checkedId:f,className:"right",style:"margin: 0 auto;",onchange:function(t){return e.curSortId=t}})]:void 0]),n.default(".row.kanban__items",n.default(".col.s12",I.length>0||!g?I.map(function(t,a){return n.default(".card-panel.kanban__item[data-kanban-index="+a+"]"+(o?".disabled":""),h&&!o?y({key:t.id},u):{key:t.id},[n.default(".card-content",n.default(Ie,{model:l,item:t,containerId:p,disabled:!0,editableIds:k,onchange:function(t){e.canSave=t,t&&r&&r(e.items)}})),b&&!o?n.default(".card-action.row",n.default(".col.s12",[n.default(E,{iconName:"edit",modalId:e.editId,onclick:function(){e.curItem=t,e.updatedItem=y({},t)}}),n.default(E,{iconName:"delete",modalId:e.deleteId,onclick:function(){return e.curItem=t}})])):void 0])}):n.default(".card-panel.kanban__item",y({},u)))),n.default(Ne,{id:e.editId,title:v.modalCreateNewItem,fixedFooter:m,description:e.updatedItem?n.default(Ie,{model:l,item:e.updatedItem||{},containerId:p,onchange:function(t){e.canSave=t}}):void 0,buttons:[{iconName:"cancel",label:"Cancel"},{iconName:"save",label:"Save",disabled:!e.canSave,onclick:function(){if(e.curItem){var a=e.curItem;l.forEach(function(t){a[t.id]=e.updatedItem[t.id]})}else e.updatedItem&&e.items.push(e.updatedItem);t()}}]}),n.default(Ne,{id:e.deleteId,title:v.modalDeleteItem,description:"Are you sure?",buttons:[{label:"No"},{label:"Yes",onclick:function(){e.items=e.items.filter(function(t){return t!==e.curItem}),t()}}]})])}}}},exports.Label=C,exports.LargeButton=D,exports.LayoutForm=Ie,exports.ListItem=J,exports.Mandatory=N,exports.MapEditor=function(){var e=function(e){return t.curKey=t.id=e},t={elementId:o(),id:"",curKey:"",kvc:function(e,t,a){var i=a.keyClass,o=void 0===i?".col.s4":i,r=a.valueClass,l=void 0===r?".col.s8":r,d=t instanceof Array?t.join(", "):"boolean"==typeof t?n.default(he,{label:" ",checked:t,disabled:!0,className:"checkbox-in-collection"}):t.toString();return{title:n.default(".row",{style:"margin-bottom: 0"},[n.default(o,n.default("b",e)),n.default(l,d)])}}},a=function(){t.id="",t.curKey=""};return{oninit:function(e){var a=e.attrs,n=a.keyValueConverter,i=a.id;n&&(t.kvc=n),i&&(t.elementId=i)},view:function(i){var o=i.attrs,r=o.className,l=void 0===r?"col s12":r,d=o.disabled,c=o.disallowArrays,u=o.header,s=o.iconName,f=o.iconNameKey,v=void 0===f?s?"label":void 0:f,p=o.isMandatory,m=o.label,h=o.labelKey,b=void 0===h?"Key":h,g=o.labelValue,x=void 0===g?"Value":g,y=o.properties,k=o.onchange,w=o.falsy,I=void 0===w?["false"]:w,N=o.truthy,M=void 0===N?["true"]:N,T=function(){return k?k(y):void 0},A=function(a,n){return Object.keys(a).map(function(e){return{key:e,value:a[e]}}).map(function(a){return function(a,n){var i=n.onclick;return n.id=n.id||a,n.active=a===t.curKey,n.onclick=i?function(){return e(a)&&i(n)}:function(){return e(a)},n}(a.key,t.kvc(a.key,a.value,{keyClass:n.keyClass,valueClass:n.valueClass}))})}(y,{keyClass:o.keyClass,valueClass:o.valueClass}),S=t.curKey,V=y[S],_="boolean"==typeof V||"number"==typeof V?V:V?V instanceof Array?"["+V.join(", ")+"]":V:"",L=t.elementId;return[n.default(".map-editor",n.default(".input-field",{className:l,style:"min-height: 1.5em;"},[s?n.default("i.material-icons.prefix",s):"",n.default(C,{label:m,isMandatory:p,isActive:A.length>0}),n.default(G,{id:L,items:A,mode:exports.CollectionMode.LINKS,header:u})])),d?void 0:[n.default(oe,{label:b,iconName:v,className:"col s5",initialValue:S,onchange:function(e){t.curKey=e,t.id&&(delete y[t.id],y[e]=V,t.id=e),T()}}),"string"==typeof _?n.default(ne,{label:x,initialValue:_,className:"col s7",onchange:function(e){var t=function(e,t,a){return t.indexOf(e)>=0||!(a.indexOf(e)>=0)&&void 0}(e,M,I),a=void 0===t&&/^\s*\d+\s*$/i.test(e)?+e:void 0;y[S]="boolean"==typeof t?t:"number"==typeof a?a:function(e,t){if(void 0===t&&(t=!1),t)return e;if(e){var a=/\s*\[(.*)\]\s*/gi.exec(e);if(a&&2===a.length)return a[1].split(",").map(function(e){return e.trim()}).map(function(e){return/^\d+$/g.test(e)?+e:e})}}(e,c)||e,T()}}):"number"==typeof _?n.default(le,{label:x,initialValue:_,className:"col s7",onchange:function(e){y[S]=e,T()}}):n.default(he,{label:x,checked:_,className:"input-field col s7",onchange:function(e){y[S]=e,T()}}),n.default(".col.s12.right-align",[n.default(E,{iconName:"add",onclick:a}),n.default(E,{iconName:"delete",disabled:!S,onclick:function(){delete y[S],a(),T()}})])]]}}},exports.MaterialBox=function(){return{oncreate:function(e){M.Materialbox.init(e.dom,e.attrs)},view:function(e){var t=e.attrs,a=t.width,i=t.height;return n.default("img.materialboxed[src="+t.src+"]"+(a?"[width="+a+"]":"")+(i?"[height="+i+"]":""),t)}}},exports.ModalPanel=Ne,exports.NumberInput=le,exports.Options=be,exports.Pagination=function(){var e={pagIndex:0};return{view:function(t){var a=t.attrs,i=a.items,o=a.curPage,r=void 0===o?1:o,l=a.size,d=void 0===l?Math.min(9,i.length):l,c=e.pagIndex,u=c*d,s=u+d,f=c>0,v=s<i.length,p=[{title:n.default("a",{onclick:function(){return f&&e.pagIndex--}},n.default("i.material-icons","chevron_left")),disabled:!f}].concat(i.filter(function(e,t){return u<=t&&t<s}),[{title:n.default("a",{onclick:function(){return v&&e.pagIndex++}},n.default("i.material-icons","chevron_right")),disabled:!v}]);return n.default("ul.pagination",p.map(function(e,t){return n.default(Ce,y({title:u+t},e,{active:u+t===r}))}))}}},exports.Parallax=function(){return{oncreate:function(e){M.Parallax.init(e.dom,e.attrs)},view:function(e){var t=e.attrs.src;return t?n.default(".parallax-container",n.default(".parallax",n.default("img[src="+t+"]"))):void 0}}},exports.PasswordInput=re,exports.RadioButton=ye,exports.RadioButtons=xe,exports.RangeInput=ue,exports.RoundIconButton=O,exports.SecondaryContent=H,exports.Select=ge,exports.SmallButton=B,exports.SubmitButton=F,exports.Switch=function(){var e={id:o()};return{view:function(t){var a=t.attrs,i=a.id||e.id,o=a.label,r=a.left,l=a.right,d=a.disabled,c=a.onchange,u=a.checked,s=a.className;return n.default("div"+(a.newRow?".clear":""),{className:void 0===s?"col s12":s},[o?n.default(C,{label:o||"",id:i,isMandatory:a.isMandatory}):void 0,n.default(".switch",n.default("label",[r||"Off",n.default("input[id="+i+"][type=checkbox]"+p({disabled:d})+(u?"[checked]":""),{onclick:c?function(e){e.target&&void 0!==e.target.checked&&c(e.target.checked)}:void 0}),n.default("span.lever"),l||"On"]))])}}},exports.Tabs=function(){var e={},t=function(e,t){return t||e.replace(/ /g,"").toLowerCase()};return{view:function(a){var i=a.attrs,o=i.tabWidth,r=i.selectedTabId,l=i.tabs,d=i.className,c=i.style,u=i.duration,s=i.onShow,f=i.swipeable,v=i.responsiveThreshold,p=l.filter(function(e){return e.active}).shift(),m=r||(p?t(p.title,p.id):"");return n.default(".row",[n.default(".col.s12",n.default("ul.tabs"+("fill"===o?".tabs-fixed-width":""),{className:d,style:c,oncreate:function(t){e.instance=M.Tabs.init(t.dom,{duration:u,onShow:s,responsiveThreshold:v,swipeable:f})},onupdate:function(){if(m){var e=document.getElementById("tab_"+m);e&&e.click()}},onremove:function(){return e.instance.destroy()}},l.map(function(e){var a=e.className,i=e.title,r=e.id,d=e.active,c=e.target,u=e.href;return n.default("li.tab"+(e.disabled?".disabled":"")+("fixed"===o?".col.s"+Math.floor(12/l.length):""),{className:a},n.default("a[id=tab_"+t(i,r)+"]"+(d?".active":""),{target:c,href:u||"#"+t(i,r)},i))}))),l.filter(function(e){return void 0===e.href}).map(function(e){var a=e.vnode,i=e.contentClass;return n.default(".col.s12[id="+t(e.title,e.id)+"]",{className:i},a)})])}}},exports.TextArea=ne,exports.TextInput=oe,exports.TimePicker=me,exports.Timeline=function(){var e=function(e){return e.getUTCDate()+"/"+(e.getUTCMonth()+1)+"/"+e.getUTCFullYear()},t=function(e){return g(e.getUTCHours())+":"+g(e.getUTCMinutes())};return{view:function(a){var i=a.attrs,o=i.onSelect,r=i.timeFormatter,l=void 0===r?t:r,d=i.dateFormatter,c=void 0===d?e:d;return n.default("ul.mm_timeline",i.items.map(function(e){return n.default(Me,y({onSelect:o,dateFormatter:c,timeFormatter:l},e))}))}}},exports.UrlInput=de,exports.camelToSnake=u,exports.compose=l,exports.disable=p,exports.fieldToComponent=we,exports.isNumeric=b,exports.join=c,exports.map=d,exports.move=x,exports.padLeft=g,exports.pipe=function(){var e=arguments;return function(t){return[].slice.call(e).reduce(function(e,t){return t(e)},t)}},exports.req=m,exports.swap=function(e,t,a){var n=e[t];e[t]=e[a],e[a]=n},exports.toAttributeString=s,exports.toAttrs=h,exports.uniqueId=o,exports.uuid4=r;

},{"mithril":"3cEwr","materialize-css":"3BAij"}],"3BAij":[function(require,module,exports) {
var define;
var global = arguments[3];
/*!
* Materialize v1.0.0 (http://materializecss.com)
* Copyright 2014-2017 Materialize
* MIT License (https://raw.githubusercontent.com/Dogfalo/materialize/master/LICENSE)
*/
var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);
  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);
    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if (("value" in desc)) {
    return desc.value;
  } else {
    var getter = desc.get;
    if (getter === undefined) {
      return undefined;
    }
    return getter.call(receiver);
  }
};
var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if (("value" in descriptor)) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
/*! cash-dom 1.3.5, https://github.com/kenwheeler/cash @license MIT*/
(function (factory) {
  window.cash = factory();
})(function () {
  var doc = document, win = window, ArrayProto = Array.prototype, slice = ArrayProto.slice, filter = ArrayProto.filter, push = ArrayProto.push;
  var noop = function () {}, isFunction = function (item) {
    // @see https://crbug.com/568448
    return typeof item === typeof noop && item.call;
  }, isString = function (item) {
    return typeof item === typeof "";
  };
  var idMatch = /^#[\w-]*$/, classMatch = /^\.[\w-]*$/, htmlMatch = /<.+>/, singlet = /^\w+$/;
  function find(selector, context) {
    context = context || doc;
    var elems = classMatch.test(selector) ? context.getElementsByClassName(selector.slice(1)) : singlet.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector);
    return elems;
  }
  var frag;
  function parseHTML(str) {
    if (!frag) {
      frag = doc.implementation.createHTMLDocument(null);
      var base = frag.createElement("base");
      base.href = doc.location.href;
      frag.head.appendChild(base);
    }
    frag.body.innerHTML = str;
    return frag.body.childNodes;
  }
  function onReady(fn) {
    if (doc.readyState !== "loading") {
      fn();
    } else {
      doc.addEventListener("DOMContentLoaded", fn);
    }
  }
  function Init(selector, context) {
    if (!selector) {
      return this;
    }
    // If already a cash collection, don't do any further processing
    if (selector.cash && selector !== win) {
      return selector;
    }
    var elems = selector, i = 0, length;
    if (isString(selector)) {
      elems = idMatch.test(selector) ? // If an ID use the faster getElementById check
      doc.getElementById(selector.slice(1)) : htmlMatch.test(selector) ? // If HTML, parse it into real elements
      parseHTML(selector) : // else use `find`
      find(selector, context);
    } else if (isFunction(selector)) {
      onReady(selector);
      return this;
    }
    if (!elems) {
      return this;
    }
    // If a single DOM element is passed in or received via ID, return the single element
    if (elems.nodeType || elems === win) {
      this[0] = elems;
      this.length = 1;
    } else {
      // Treat like an array and loop through each item.
      length = this.length = elems.length;
      for (; i < length; i++) {
        this[i] = elems[i];
      }
    }
    return this;
  }
  function cash(selector, context) {
    return new Init(selector, context);
  }
  var fn = cash.fn = cash.prototype = Init.prototype = {
    // jshint ignore:line
    cash: true,
    length: 0,
    push: push,
    splice: ArrayProto.splice,
    map: ArrayProto.map,
    init: Init
  };
  Object.defineProperty(fn, "constructor", {
    value: cash
  });
  cash.parseHTML = parseHTML;
  cash.noop = noop;
  cash.isFunction = isFunction;
  cash.isString = isString;
  cash.extend = fn.extend = function (target) {
    target = target || ({});
    var args = slice.call(arguments), length = args.length, i = 1;
    if (args.length === 1) {
      target = this;
      i = 0;
    }
    for (; i < length; i++) {
      if (!args[i]) {
        continue;
      }
      for (var key in args[i]) {
        if (args[i].hasOwnProperty(key)) {
          target[key] = args[i][key];
        }
      }
    }
    return target;
  };
  function each(collection, callback) {
    var l = collection.length, i = 0;
    for (; i < l; i++) {
      if (callback.call(collection[i], collection[i], i, collection) === false) {
        break;
      }
    }
  }
  function matches(el, selector) {
    var m = el && (el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector);
    return !!m && m.call(el, selector);
  }
  function getCompareFunction(selector) {
    return (
      /*Use browser's `matches` function if string*/
      isString(selector) ? matches : /*Match a cash element*/
      selector.cash ? function (el) {
        return selector.is(el);
      } : /*Direct comparison*/
      function (el, selector) {
        return el === selector;
      }
    );
  }
  function unique(collection) {
    return cash(slice.call(collection).filter(function (item, index, self) {
      return self.indexOf(item) === index;
    }));
  }
  cash.extend({
    merge: function (first, second) {
      var len = +second.length, i = first.length, j = 0;
      for (; j < len; (i++, j++)) {
        first[i] = second[j];
      }
      first.length = i;
      return first;
    },
    each: each,
    matches: matches,
    unique: unique,
    isArray: Array.isArray,
    isNumeric: function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
  });
  var uid = cash.uid = "_cash" + Date.now();
  function getDataCache(node) {
    return node[uid] = node[uid] || ({});
  }
  function setData(node, key, value) {
    return getDataCache(node)[key] = value;
  }
  function getData(node, key) {
    var c = getDataCache(node);
    if (c[key] === undefined) {
      c[key] = node.dataset ? node.dataset[key] : cash(node).attr("data-" + key);
    }
    return c[key];
  }
  function removeData(node, key) {
    var c = getDataCache(node);
    if (c) {
      delete c[key];
    } else if (node.dataset) {
      delete node.dataset[key];
    } else {
      cash(node).removeAttr("data-" + name);
    }
  }
  fn.extend({
    data: function (name, value) {
      if (isString(name)) {
        return value === undefined ? getData(this[0], name) : this.each(function (v) {
          return setData(v, name, value);
        });
      }
      for (var key in name) {
        this.data(key, name[key]);
      }
      return this;
    },
    removeData: function (key) {
      return this.each(function (v) {
        return removeData(v, key);
      });
    }
  });
  var notWhiteMatch = /\S+/g;
  function getClasses(c) {
    return isString(c) && c.match(notWhiteMatch);
  }
  function hasClass(v, c) {
    return v.classList ? v.classList.contains(c) : new RegExp("(^| )" + c + "( |$)", "gi").test(v.className);
  }
  function addClass(v, c, spacedName) {
    if (v.classList) {
      v.classList.add(c);
    } else if (spacedName.indexOf(" " + c + " ")) {
      v.className += " " + c;
    }
  }
  function removeClass(v, c) {
    if (v.classList) {
      v.classList.remove(c);
    } else {
      v.className = v.className.replace(c, "");
    }
  }
  fn.extend({
    addClass: function (c) {
      var classes = getClasses(c);
      return classes ? this.each(function (v) {
        var spacedName = " " + v.className + " ";
        each(classes, function (c) {
          addClass(v, c, spacedName);
        });
      }) : this;
    },
    attr: function (name, value) {
      if (!name) {
        return undefined;
      }
      if (isString(name)) {
        if (value === undefined) {
          return this[0] ? this[0].getAttribute ? this[0].getAttribute(name) : this[0][name] : undefined;
        }
        return this.each(function (v) {
          if (v.setAttribute) {
            v.setAttribute(name, value);
          } else {
            v[name] = value;
          }
        });
      }
      for (var key in name) {
        this.attr(key, name[key]);
      }
      return this;
    },
    hasClass: function (c) {
      var check = false, classes = getClasses(c);
      if (classes && classes.length) {
        this.each(function (v) {
          check = hasClass(v, classes[0]);
          return !check;
        });
      }
      return check;
    },
    prop: function (name, value) {
      if (isString(name)) {
        return value === undefined ? this[0][name] : this.each(function (v) {
          v[name] = value;
        });
      }
      for (var key in name) {
        this.prop(key, name[key]);
      }
      return this;
    },
    removeAttr: function (name) {
      return this.each(function (v) {
        if (v.removeAttribute) {
          v.removeAttribute(name);
        } else {
          delete v[name];
        }
      });
    },
    removeClass: function (c) {
      if (!arguments.length) {
        return this.attr("class", "");
      }
      var classes = getClasses(c);
      return classes ? this.each(function (v) {
        each(classes, function (c) {
          removeClass(v, c);
        });
      }) : this;
    },
    removeProp: function (name) {
      return this.each(function (v) {
        delete v[name];
      });
    },
    toggleClass: function (c, state) {
      if (state !== undefined) {
        return this[state ? "addClass" : "removeClass"](c);
      }
      var classes = getClasses(c);
      return classes ? this.each(function (v) {
        var spacedName = " " + v.className + " ";
        each(classes, function (c) {
          if (hasClass(v, c)) {
            removeClass(v, c);
          } else {
            addClass(v, c, spacedName);
          }
        });
      }) : this;
    }
  });
  fn.extend({
    add: function (selector, context) {
      return unique(cash.merge(this, cash(selector, context)));
    },
    each: function (callback) {
      each(this, callback);
      return this;
    },
    eq: function (index) {
      return cash(this.get(index));
    },
    filter: function (selector) {
      if (!selector) {
        return this;
      }
      var comparator = isFunction(selector) ? selector : getCompareFunction(selector);
      return cash(filter.call(this, function (e) {
        return comparator(e, selector);
      }));
    },
    first: function () {
      return this.eq(0);
    },
    get: function (index) {
      if (index === undefined) {
        return slice.call(this);
      }
      return index < 0 ? this[index + this.length] : this[index];
    },
    index: function (elem) {
      var child = elem ? cash(elem)[0] : this[0], collection = elem ? this : cash(child).parent().children();
      return slice.call(collection).indexOf(child);
    },
    last: function () {
      return this.eq(-1);
    }
  });
  var camelCase = (function () {
    var camelRegex = /(?:^\w|[A-Z]|\b\w)/g, whiteSpace = /[\s-_]+/g;
    return function (str) {
      return str.replace(camelRegex, function (letter, index) {
        return letter[index === 0 ? "toLowerCase" : "toUpperCase"]();
      }).replace(whiteSpace, "");
    };
  })();
  var getPrefixedProp = (function () {
    var cache = {}, doc = document, div = doc.createElement("div"), style = div.style;
    return function (prop) {
      prop = camelCase(prop);
      if (cache[prop]) {
        return cache[prop];
      }
      var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1), prefixes = ["webkit", "moz", "ms", "o"], props = (prop + " " + prefixes.join(ucProp + " ") + ucProp).split(" ");
      each(props, function (p) {
        if ((p in style)) {
          cache[p] = prop = cache[prop] = p;
          return false;
        }
      });
      return cache[prop];
    };
  })();
  cash.prefixedProp = getPrefixedProp;
  cash.camelCase = camelCase;
  fn.extend({
    css: function (prop, value) {
      if (isString(prop)) {
        prop = getPrefixedProp(prop);
        return arguments.length > 1 ? this.each(function (v) {
          return v.style[prop] = value;
        }) : win.getComputedStyle(this[0])[prop];
      }
      for (var key in prop) {
        this.css(key, prop[key]);
      }
      return this;
    }
  });
  function compute(el, prop) {
    return parseInt(win.getComputedStyle(el[0], null)[prop], 10) || 0;
  }
  each(["Width", "Height"], function (v) {
    var lower = v.toLowerCase();
    fn[lower] = function () {
      return this[0].getBoundingClientRect()[lower];
    };
    fn["inner" + v] = function () {
      return this[0]["client" + v];
    };
    fn["outer" + v] = function (margins) {
      return this[0]["offset" + v] + (margins ? compute(this, "margin" + (v === "Width" ? "Left" : "Top")) + compute(this, "margin" + (v === "Width" ? "Right" : "Bottom")) : 0);
    };
  });
  function registerEvent(node, eventName, callback) {
    var eventCache = getData(node, "_cashEvents") || setData(node, "_cashEvents", {});
    eventCache[eventName] = eventCache[eventName] || [];
    eventCache[eventName].push(callback);
    node.addEventListener(eventName, callback);
  }
  function removeEvent(node, eventName, callback) {
    var events = getData(node, "_cashEvents"), eventCache = events && events[eventName], index;
    if (!eventCache) {
      return;
    }
    if (callback) {
      node.removeEventListener(eventName, callback);
      index = eventCache.indexOf(callback);
      if (index >= 0) {
        eventCache.splice(index, 1);
      }
    } else {
      each(eventCache, function (event) {
        node.removeEventListener(eventName, event);
      });
      eventCache = [];
    }
  }
  fn.extend({
    off: function (eventName, callback) {
      return this.each(function (v) {
        return removeEvent(v, eventName, callback);
      });
    },
    on: function (eventName, delegate, callback, runOnce) {
      // jshint ignore:line
      var originalCallback;
      if (!isString(eventName)) {
        for (var key in eventName) {
          this.on(key, delegate, eventName[key]);
        }
        return this;
      }
      if (isFunction(delegate)) {
        callback = delegate;
        delegate = null;
      }
      if (eventName === "ready") {
        onReady(callback);
        return this;
      }
      if (delegate) {
        originalCallback = callback;
        callback = function (e) {
          var t = e.target;
          while (!matches(t, delegate)) {
            if (t === this || t === null) {
              return t = false;
            }
            t = t.parentNode;
          }
          if (t) {
            originalCallback.call(t, e);
          }
        };
      }
      return this.each(function (v) {
        var finalCallback = callback;
        if (runOnce) {
          finalCallback = function () {
            callback.apply(this, arguments);
            removeEvent(v, eventName, finalCallback);
          };
        }
        registerEvent(v, eventName, finalCallback);
      });
    },
    one: function (eventName, delegate, callback) {
      return this.on(eventName, delegate, callback, true);
    },
    ready: onReady,
    /**
    * Modified
    * Triggers browser event
    * @param String eventName
    * @param Object data - Add properties to event object
    */
    trigger: function (eventName, data) {
      if (document.createEvent) {
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent(eventName, true, false);
        evt = this.extend(evt, data);
        return this.each(function (v) {
          return v.dispatchEvent(evt);
        });
      }
    }
  });
  function encode(name, value) {
    return "&" + encodeURIComponent(name) + "=" + encodeURIComponent(value).replace(/%20/g, "+");
  }
  function getSelectMultiple_(el) {
    var values = [];
    each(el.options, function (o) {
      if (o.selected) {
        values.push(o.value);
      }
    });
    return values.length ? values : null;
  }
  function getSelectSingle_(el) {
    var selectedIndex = el.selectedIndex;
    return selectedIndex >= 0 ? el.options[selectedIndex].value : null;
  }
  function getValue(el) {
    var type = el.type;
    if (!type) {
      return null;
    }
    switch (type.toLowerCase()) {
      case "select-one":
        return getSelectSingle_(el);
      case "select-multiple":
        return getSelectMultiple_(el);
      case "radio":
        return el.checked ? el.value : null;
      case "checkbox":
        return el.checked ? el.value : null;
      default:
        return el.value ? el.value : null;
    }
  }
  fn.extend({
    serialize: function () {
      var query = "";
      each(this[0].elements || this, function (el) {
        if (el.disabled || el.tagName === "FIELDSET") {
          return;
        }
        var name = el.name;
        switch (el.type.toLowerCase()) {
          case "file":
          case "reset":
          case "submit":
          case "button":
            break;
          case "select-multiple":
            var values = getValue(el);
            if (values !== null) {
              each(values, function (value) {
                query += encode(name, value);
              });
            }
            break;
          default:
            var value = getValue(el);
            if (value !== null) {
              query += encode(name, value);
            }
        }
      });
      return query.substr(1);
    },
    val: function (value) {
      if (value === undefined) {
        return getValue(this[0]);
      }
      return this.each(function (v) {
        return v.value = value;
      });
    }
  });
  function insertElement(el, child, prepend) {
    if (prepend) {
      var first = el.childNodes[0];
      el.insertBefore(child, first);
    } else {
      el.appendChild(child);
    }
  }
  function insertContent(parent, child, prepend) {
    var str = isString(child);
    if (!str && child.length) {
      each(child, function (v) {
        return insertContent(parent, v, prepend);
      });
      return;
    }
    each(parent, str ? function (v) {
      return v.insertAdjacentHTML(prepend ? "afterbegin" : "beforeend", child);
    } : function (v, i) {
      return insertElement(v, i === 0 ? child : child.cloneNode(true), prepend);
    });
  }
  fn.extend({
    after: function (selector) {
      cash(selector).insertAfter(this);
      return this;
    },
    append: function (content) {
      insertContent(this, content);
      return this;
    },
    appendTo: function (parent) {
      insertContent(cash(parent), this);
      return this;
    },
    before: function (selector) {
      cash(selector).insertBefore(this);
      return this;
    },
    clone: function () {
      return cash(this.map(function (v) {
        return v.cloneNode(true);
      }));
    },
    empty: function () {
      this.html("");
      return this;
    },
    html: function (content) {
      if (content === undefined) {
        return this[0].innerHTML;
      }
      var source = content.nodeType ? content[0].outerHTML : content;
      return this.each(function (v) {
        return v.innerHTML = source;
      });
    },
    insertAfter: function (selector) {
      var _this = this;
      cash(selector).each(function (el, i) {
        var parent = el.parentNode, sibling = el.nextSibling;
        _this.each(function (v) {
          parent.insertBefore(i === 0 ? v : v.cloneNode(true), sibling);
        });
      });
      return this;
    },
    insertBefore: function (selector) {
      var _this2 = this;
      cash(selector).each(function (el, i) {
        var parent = el.parentNode;
        _this2.each(function (v) {
          parent.insertBefore(i === 0 ? v : v.cloneNode(true), el);
        });
      });
      return this;
    },
    prepend: function (content) {
      insertContent(this, content, true);
      return this;
    },
    prependTo: function (parent) {
      insertContent(cash(parent), this, true);
      return this;
    },
    remove: function () {
      return this.each(function (v) {
        if (!!v.parentNode) {
          return v.parentNode.removeChild(v);
        }
      });
    },
    text: function (content) {
      if (content === undefined) {
        return this[0].textContent;
      }
      return this.each(function (v) {
        return v.textContent = content;
      });
    }
  });
  var docEl = doc.documentElement;
  fn.extend({
    position: function () {
      var el = this[0];
      return {
        left: el.offsetLeft,
        top: el.offsetTop
      };
    },
    offset: function () {
      var rect = this[0].getBoundingClientRect();
      return {
        top: rect.top + win.pageYOffset - docEl.clientTop,
        left: rect.left + win.pageXOffset - docEl.clientLeft
      };
    },
    offsetParent: function () {
      return cash(this[0].offsetParent);
    }
  });
  fn.extend({
    children: function (selector) {
      var elems = [];
      this.each(function (el) {
        push.apply(elems, el.children);
      });
      elems = unique(elems);
      return !selector ? elems : elems.filter(function (v) {
        return matches(v, selector);
      });
    },
    closest: function (selector) {
      if (!selector || this.length < 1) {
        return cash();
      }
      if (this.is(selector)) {
        return this.filter(selector);
      }
      return this.parent().closest(selector);
    },
    is: function (selector) {
      if (!selector) {
        return false;
      }
      var match = false, comparator = getCompareFunction(selector);
      this.each(function (el) {
        match = comparator(el, selector);
        return !match;
      });
      return match;
    },
    find: function (selector) {
      if (!selector || selector.nodeType) {
        return cash(selector && this.has(selector).length ? selector : null);
      }
      var elems = [];
      this.each(function (el) {
        push.apply(elems, find(selector, el));
      });
      return unique(elems);
    },
    has: function (selector) {
      var comparator = isString(selector) ? function (el) {
        return find(selector, el).length !== 0;
      } : function (el) {
        return el.contains(selector);
      };
      return this.filter(comparator);
    },
    next: function () {
      return cash(this[0].nextElementSibling);
    },
    not: function (selector) {
      if (!selector) {
        return this;
      }
      var comparator = getCompareFunction(selector);
      return this.filter(function (el) {
        return !comparator(el, selector);
      });
    },
    parent: function () {
      var result = [];
      this.each(function (item) {
        if (item && item.parentNode) {
          result.push(item.parentNode);
        }
      });
      return unique(result);
    },
    parents: function (selector) {
      var last, result = [];
      this.each(function (item) {
        last = item;
        while (last && last.parentNode && last !== doc.body.parentNode) {
          last = last.parentNode;
          if (!selector || selector && matches(last, selector)) {
            result.push(last);
          }
        }
      });
      return unique(result);
    },
    prev: function () {
      return cash(this[0].previousElementSibling);
    },
    siblings: function (selector) {
      var collection = this.parent().children(selector), el = this[0];
      return collection.filter(function (i) {
        return i !== el;
      });
    }
  });
  return cash;
});
;
var Component = (function () {
  /**
  * Generic constructor for all components
  * @constructor
  * @param {Element} el
  * @param {Object} options
  */
  function Component(classDef, el, options) {
    _classCallCheck(this, Component);
    // Display error if el is valid HTML Element
    if (!(el instanceof Element)) {
      console.error(Error(el + ' is not an HTML Element'));
    }
    // If exists, destroy and reinitialize in child
    var ins = classDef.getInstance(el);
    if (!!ins) {
      ins.destroy();
    }
    this.el = el;
    this.$el = cash(el);
  }
  /**
  * Initializes components
  * @param {class} classDef
  * @param {Element | NodeList | jQuery} els
  * @param {Object} options
  */
  _createClass(Component, null, [{
    key: "init",
    value: function init(classDef, els, options) {
      var instances = null;
      if (els instanceof Element) {
        instances = new classDef(els, options);
      } else if (!!els && (els.jquery || els.cash || els instanceof NodeList)) {
        var instancesArr = [];
        for (var i = 0; i < els.length; i++) {
          instancesArr.push(new classDef(els[i], options));
        }
        instances = instancesArr;
      }
      return instances;
    }
  }]);
  return Component;
})();
;
// Required for Meteor package, the use of window prevents export by Meteor
(function (window) {
  if (window.Package) {
    M = {};
  } else {
    window.M = {};
  }
  // Check for jQuery
  M.jQueryLoaded = !!window.jQuery;
})(window);
// AMD
if (typeof define === 'function' && define.amd) {
  define('M', [], function () {
    return M;
  });
} else if (typeof exports !== 'undefined' && !exports.nodeType) {
  if (typeof module !== 'undefined' && !module.nodeType && module.exports) {
    exports = module.exports = M;
  }
  exports.default = M;
}
M.version = '1.0.0';
M.keys = {
  TAB: 9,
  ENTER: 13,
  ESC: 27,
  ARROW_UP: 38,
  ARROW_DOWN: 40
};
/**
* TabPress Keydown handler
*/
M.tabPressed = false;
M.keyDown = false;
var docHandleKeydown = function (e) {
  M.keyDown = true;
  if (e.which === M.keys.TAB || e.which === M.keys.ARROW_DOWN || e.which === M.keys.ARROW_UP) {
    M.tabPressed = true;
  }
};
var docHandleKeyup = function (e) {
  M.keyDown = false;
  if (e.which === M.keys.TAB || e.which === M.keys.ARROW_DOWN || e.which === M.keys.ARROW_UP) {
    M.tabPressed = false;
  }
};
var docHandleFocus = function (e) {
  if (M.keyDown) {
    document.body.classList.add('keyboard-focused');
  }
};
var docHandleBlur = function (e) {
  document.body.classList.remove('keyboard-focused');
};
document.addEventListener('keydown', docHandleKeydown, true);
document.addEventListener('keyup', docHandleKeyup, true);
document.addEventListener('focus', docHandleFocus, true);
document.addEventListener('blur', docHandleBlur, true);
/**
* Initialize jQuery wrapper for plugin
* @param {Class} plugin  javascript class
* @param {string} pluginName  jQuery plugin name
* @param {string} classRef  Class reference name
*/
M.initializeJqueryWrapper = function (plugin, pluginName, classRef) {
  jQuery.fn[pluginName] = function (methodOrOptions) {
    // Call plugin method if valid method name is passed in
    if (plugin.prototype[methodOrOptions]) {
      var params = Array.prototype.slice.call(arguments, 1);
      // Getter methods
      if (methodOrOptions.slice(0, 3) === 'get') {
        var instance = this.first()[0][classRef];
        return instance[methodOrOptions].apply(instance, params);
      }
      // Void methods
      return this.each(function () {
        var instance = this[classRef];
        instance[methodOrOptions].apply(instance, params);
      });
    } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
      plugin.init(this, arguments[0]);
      return this;
    }
    // Return error if an unrecognized  method name is passed in
    jQuery.error("Method " + methodOrOptions + " does not exist on jQuery." + pluginName);
  };
};
/**
* Automatically initialize components
* @param {Element} context  DOM Element to search within for components
*/
M.AutoInit = function (context) {
  // Use document.body if no context is given
  var root = !!context ? context : document.body;
  var registry = {
    Autocomplete: root.querySelectorAll('.autocomplete:not(.no-autoinit)'),
    Carousel: root.querySelectorAll('.carousel:not(.no-autoinit)'),
    Chips: root.querySelectorAll('.chips:not(.no-autoinit)'),
    Collapsible: root.querySelectorAll('.collapsible:not(.no-autoinit)'),
    Datepicker: root.querySelectorAll('.datepicker:not(.no-autoinit)'),
    Dropdown: root.querySelectorAll('.dropdown-trigger:not(.no-autoinit)'),
    Materialbox: root.querySelectorAll('.materialboxed:not(.no-autoinit)'),
    Modal: root.querySelectorAll('.modal:not(.no-autoinit)'),
    Parallax: root.querySelectorAll('.parallax:not(.no-autoinit)'),
    Pushpin: root.querySelectorAll('.pushpin:not(.no-autoinit)'),
    ScrollSpy: root.querySelectorAll('.scrollspy:not(.no-autoinit)'),
    FormSelect: root.querySelectorAll('select:not(.no-autoinit)'),
    Sidenav: root.querySelectorAll('.sidenav:not(.no-autoinit)'),
    Tabs: root.querySelectorAll('.tabs:not(.no-autoinit)'),
    TapTarget: root.querySelectorAll('.tap-target:not(.no-autoinit)'),
    Timepicker: root.querySelectorAll('.timepicker:not(.no-autoinit)'),
    Tooltip: root.querySelectorAll('.tooltipped:not(.no-autoinit)'),
    FloatingActionButton: root.querySelectorAll('.fixed-action-btn:not(.no-autoinit)')
  };
  for (var pluginName in registry) {
    var plugin = M[pluginName];
    plugin.init(registry[pluginName]);
  }
};
/**
* Generate approximated selector string for a jQuery object
* @param {jQuery} obj  jQuery object to be parsed
* @returns {string}
*/
M.objectSelectorString = function (obj) {
  var tagStr = obj.prop('tagName') || '';
  var idStr = obj.attr('id') || '';
  var classStr = obj.attr('class') || '';
  return (tagStr + idStr + classStr).replace(/\s/g, '');
};
// Unique Random ID
M.guid = (function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  };
})();
/**
* Escapes hash from special characters
* @param {string} hash  String returned from this.hash
* @returns {string}
*/
M.escapeHash = function (hash) {
  return hash.replace(/(:|\.|\[|\]|,|=|\/)/g, '\\$1');
};
M.elementOrParentIsFixed = function (element) {
  var $element = $(element);
  var $checkElements = $element.add($element.parents());
  var isFixed = false;
  $checkElements.each(function () {
    if ($(this).css('position') === 'fixed') {
      isFixed = true;
      return false;
    }
  });
  return isFixed;
};
/**
* @typedef {Object} Edges
* @property {Boolean} top  If the top edge was exceeded
* @property {Boolean} right  If the right edge was exceeded
* @property {Boolean} bottom  If the bottom edge was exceeded
* @property {Boolean} left  If the left edge was exceeded
*/
/**
* @typedef {Object} Bounding
* @property {Number} left  left offset coordinate
* @property {Number} top  top offset coordinate
* @property {Number} width
* @property {Number} height
*/
/**
* Escapes hash from special characters
* @param {Element} container  Container element that acts as the boundary
* @param {Bounding} bounding  element bounding that is being checked
* @param {Number} offset  offset from edge that counts as exceeding
* @returns {Edges}
*/
M.checkWithinContainer = function (container, bounding, offset) {
  var edges = {
    top: false,
    right: false,
    bottom: false,
    left: false
  };
  var containerRect = container.getBoundingClientRect();
  // If body element is smaller than viewport, use viewport height instead.
  var containerBottom = container === document.body ? Math.max(containerRect.bottom, window.innerHeight) : containerRect.bottom;
  var scrollLeft = container.scrollLeft;
  var scrollTop = container.scrollTop;
  var scrolledX = bounding.left - scrollLeft;
  var scrolledY = bounding.top - scrollTop;
  // Check for container and viewport for each edge
  if (scrolledX < containerRect.left + offset || scrolledX < offset) {
    edges.left = true;
  }
  if (scrolledX + bounding.width > containerRect.right - offset || scrolledX + bounding.width > window.innerWidth - offset) {
    edges.right = true;
  }
  if (scrolledY < containerRect.top + offset || scrolledY < offset) {
    edges.top = true;
  }
  if (scrolledY + bounding.height > containerBottom - offset || scrolledY + bounding.height > window.innerHeight - offset) {
    edges.bottom = true;
  }
  return edges;
};
M.checkPossibleAlignments = function (el, container, bounding, offset) {
  var canAlign = {
    top: true,
    right: true,
    bottom: true,
    left: true,
    spaceOnTop: null,
    spaceOnRight: null,
    spaceOnBottom: null,
    spaceOnLeft: null
  };
  var containerAllowsOverflow = getComputedStyle(container).overflow === 'visible';
  var containerRect = container.getBoundingClientRect();
  var containerHeight = Math.min(containerRect.height, window.innerHeight);
  var containerWidth = Math.min(containerRect.width, window.innerWidth);
  var elOffsetRect = el.getBoundingClientRect();
  var scrollLeft = container.scrollLeft;
  var scrollTop = container.scrollTop;
  var scrolledX = bounding.left - scrollLeft;
  var scrolledYTopEdge = bounding.top - scrollTop;
  var scrolledYBottomEdge = bounding.top + elOffsetRect.height - scrollTop;
  // Check for container and viewport for left
  canAlign.spaceOnRight = !containerAllowsOverflow ? containerWidth - (scrolledX + bounding.width) : window.innerWidth - (elOffsetRect.left + bounding.width);
  if (canAlign.spaceOnRight < 0) {
    canAlign.left = false;
  }
  // Check for container and viewport for Right
  canAlign.spaceOnLeft = !containerAllowsOverflow ? scrolledX - bounding.width + elOffsetRect.width : elOffsetRect.right - bounding.width;
  if (canAlign.spaceOnLeft < 0) {
    canAlign.right = false;
  }
  // Check for container and viewport for Top
  canAlign.spaceOnBottom = !containerAllowsOverflow ? containerHeight - (scrolledYTopEdge + bounding.height + offset) : window.innerHeight - (elOffsetRect.top + bounding.height + offset);
  if (canAlign.spaceOnBottom < 0) {
    canAlign.top = false;
  }
  // Check for container and viewport for Bottom
  canAlign.spaceOnTop = !containerAllowsOverflow ? scrolledYBottomEdge - (bounding.height - offset) : elOffsetRect.bottom - (bounding.height + offset);
  if (canAlign.spaceOnTop < 0) {
    canAlign.bottom = false;
  }
  return canAlign;
};
M.getOverflowParent = function (element) {
  if (element == null) {
    return null;
  }
  if (element === document.body || getComputedStyle(element).overflow !== 'visible') {
    return element;
  }
  return M.getOverflowParent(element.parentElement);
};
/**
* Gets id of component from a trigger
* @param {Element} trigger  trigger
* @returns {string}
*/
M.getIdFromTrigger = function (trigger) {
  var id = trigger.getAttribute('data-target');
  if (!id) {
    id = trigger.getAttribute('href');
    if (id) {
      id = id.slice(1);
    } else {
      id = '';
    }
  }
  return id;
};
/**
* Multi browser support for document scroll top
* @returns {Number}
*/
M.getDocumentScrollTop = function () {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
};
/**
* Multi browser support for document scroll left
* @returns {Number}
*/
M.getDocumentScrollLeft = function () {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
};
/**
* @typedef {Object} Edges
* @property {Boolean} top  If the top edge was exceeded
* @property {Boolean} right  If the right edge was exceeded
* @property {Boolean} bottom  If the bottom edge was exceeded
* @property {Boolean} left  If the left edge was exceeded
*/
/**
* @typedef {Object} Bounding
* @property {Number} left  left offset coordinate
* @property {Number} top  top offset coordinate
* @property {Number} width
* @property {Number} height
*/
/**
* Get time in ms
* @license https://raw.github.com/jashkenas/underscore/master/LICENSE
* @type {function}
* @return {number}
*/
var getTime = Date.now || (function () {
  return new Date().getTime();
});
/**
* Returns a function, that, when invoked, will only be triggered at most once
* during a given window of time. Normally, the throttled function will run
* as much as it can, without ever going more than once per `wait` duration;
* but if you'd like to disable the execution on the leading edge, pass
* `{leading: false}`. To disable execution on the trailing edge, ditto.
* @license https://raw.github.com/jashkenas/underscore/master/LICENSE
* @param {function} func
* @param {number} wait
* @param {Object=} options
* @returns {Function}
*/
M.throttle = function (func, wait, options) {
  var context = void 0, args = void 0, result = void 0;
  var timeout = null;
  var previous = 0;
  options || (options = {});
  var later = function () {
    previous = options.leading === false ? 0 : getTime();
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };
  return function () {
    var now = getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};
;
/*
v2.2.0
2017 Julian Garnier
Released under the MIT license
*/
var $jscomp = {
  scope: {}
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (e, r, p) {
  if (p.get || p.set) throw new TypeError("ES3 does not support getters and setters.");
  e != Array.prototype && e != Object.prototype && (e[r] = p.value);
};
$jscomp.getGlobal = function (e) {
  return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
  $jscomp.initSymbol = function () {};
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function (e) {
  return $jscomp.SYMBOL_PREFIX + (e || "") + $jscomp.symbolCounter_++;
};
$jscomp.initSymbolIterator = function () {
  $jscomp.initSymbol();
  var e = $jscomp.global.Symbol.iterator;
  e || (e = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[e] && $jscomp.defineProperty(Array.prototype, e, {
    configurable: !0,
    writable: !0,
    value: function () {
      return $jscomp.arrayIterator(this);
    }
  });
  $jscomp.initSymbolIterator = function () {};
};
$jscomp.arrayIterator = function (e) {
  var r = 0;
  return $jscomp.iteratorPrototype(function () {
    return r < e.length ? {
      done: !1,
      value: e[r++]
    } : {
      done: !0
    };
  });
};
$jscomp.iteratorPrototype = function (e) {
  $jscomp.initSymbolIterator();
  e = {
    next: e
  };
  e[$jscomp.global.Symbol.iterator] = function () {
    return this;
  };
  return e;
};
$jscomp.array = $jscomp.array || ({});
$jscomp.iteratorFromArray = function (e, r) {
  $jscomp.initSymbolIterator();
  e instanceof String && (e += "");
  var p = 0, m = {
    next: function () {
      if (p < e.length) {
        var u = p++;
        return {
          value: r(u, e[u]),
          done: !1
        };
      }
      m.next = function () {
        return {
          done: !0,
          value: void 0
        };
      };
      return m.next();
    }
  };
  m[Symbol.iterator] = function () {
    return m;
  };
  return m;
};
$jscomp.polyfill = function (e, r, p, m) {
  if (r) {
    p = $jscomp.global;
    e = e.split(".");
    for (m = 0; m < e.length - 1; m++) {
      var u = e[m];
      (u in p) || (p[u] = {});
      p = p[u];
    }
    e = e[e.length - 1];
    m = p[e];
    r = r(m);
    r != m && null != r && $jscomp.defineProperty(p, e, {
      configurable: !0,
      writable: !0,
      value: r
    });
  }
};
$jscomp.polyfill("Array.prototype.keys", function (e) {
  return e ? e : function () {
    return $jscomp.iteratorFromArray(this, function (e) {
      return e;
    });
  };
}, "es6-impl", "es3");
var $jscomp$this = this;
(function (r) {
  M.anime = r();
})(function () {
  function e(a) {
    if (!h.col(a)) try {
      return document.querySelectorAll(a);
    } catch (c) {}
  }
  function r(a, c) {
    for (var d = a.length, b = 2 <= arguments.length ? arguments[1] : void 0, f = [], n = 0; n < d; n++) {
      if ((n in a)) {
        var k = a[n];
        c.call(b, k, n, a) && f.push(k);
      }
    }
    return f;
  }
  function p(a) {
    return a.reduce(function (a, d) {
      return a.concat(h.arr(d) ? p(d) : d);
    }, []);
  }
  function m(a) {
    if (h.arr(a)) return a;
    h.str(a) && (a = e(a) || a);
    return a instanceof NodeList || a instanceof HTMLCollection ? [].slice.call(a) : [a];
  }
  function u(a, c) {
    return a.some(function (a) {
      return a === c;
    });
  }
  function C(a) {
    var c = {}, d;
    for (d in a) {
      c[d] = a[d];
    }
    return c;
  }
  function D(a, c) {
    var d = C(a), b;
    for (b in a) {
      d[b] = c.hasOwnProperty(b) ? c[b] : a[b];
    }
    return d;
  }
  function z(a, c) {
    var d = C(a), b;
    for (b in c) {
      d[b] = h.und(a[b]) ? c[b] : a[b];
    }
    return d;
  }
  function T(a) {
    a = a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (a, c, d, k) {
      return c + c + d + d + k + k;
    });
    var c = (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i).exec(a);
    a = parseInt(c[1], 16);
    var d = parseInt(c[2], 16), c = parseInt(c[3], 16);
    return "rgba(" + a + "," + d + "," + c + ",1)";
  }
  function U(a) {
    function c(a, c, b) {
      0 > b && (b += 1);
      1 < b && --b;
      return b < 1 / 6 ? a + 6 * (c - a) * b : .5 > b ? c : b < 2 / 3 ? a + (c - a) * (2 / 3 - b) * 6 : a;
    }
    var d = (/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g).exec(a) || (/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g).exec(a);
    a = parseInt(d[1]) / 360;
    var b = parseInt(d[2]) / 100, f = parseInt(d[3]) / 100, d = d[4] || 1;
    if (0 == b) f = b = a = f; else {
      var n = .5 > f ? f * (1 + b) : f + b - f * b, k = 2 * f - n, f = c(k, n, a + 1 / 3), b = c(k, n, a);
      a = c(k, n, a - 1 / 3);
    }
    return "rgba(" + 255 * f + "," + 255 * b + "," + 255 * a + "," + d + ")";
  }
  function y(a) {
    if (a = (/([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/).exec(a)) return a[2];
  }
  function V(a) {
    if (-1 < a.indexOf("translate") || "perspective" === a) return "px";
    if (-1 < a.indexOf("rotate") || -1 < a.indexOf("skew")) return "deg";
  }
  function I(a, c) {
    return h.fnc(a) ? a(c.target, c.id, c.total) : a;
  }
  function E(a, c) {
    if ((c in a.style)) return getComputedStyle(a).getPropertyValue(c.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()) || "0";
  }
  function J(a, c) {
    if (h.dom(a) && u(W, c)) return "transform";
    if (h.dom(a) && (a.getAttribute(c) || h.svg(a) && a[c])) return "attribute";
    if (h.dom(a) && "transform" !== c && E(a, c)) return "css";
    if (null != a[c]) return "object";
  }
  function X(a, c) {
    var d = V(c), d = -1 < c.indexOf("scale") ? 1 : 0 + d;
    a = a.style.transform;
    if (!a) return d;
    for (var b = [], f = [], n = [], k = /(\w+)\((.+?)\)/g; b = k.exec(a); ) {
      (f.push(b[1]), n.push(b[2]));
    }
    a = r(n, function (a, b) {
      return f[b] === c;
    });
    return a.length ? a[0] : d;
  }
  function K(a, c) {
    switch (J(a, c)) {
      case "transform":
        return X(a, c);
      case "css":
        return E(a, c);
      case "attribute":
        return a.getAttribute(c);
    }
    return a[c] || 0;
  }
  function L(a, c) {
    var d = (/^(\*=|\+=|-=)/).exec(a);
    if (!d) return a;
    var b = y(a) || 0;
    c = parseFloat(c);
    a = parseFloat(a.replace(d[0], ""));
    switch (d[0][0]) {
      case "+":
        return c + a + b;
      case "-":
        return c - a + b;
      case "*":
        return c * a + b;
    }
  }
  function F(a, c) {
    return Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2));
  }
  function M(a) {
    a = a.points;
    for (var c = 0, d, b = 0; b < a.numberOfItems; b++) {
      var f = a.getItem(b);
      0 < b && (c += F(d, f));
      d = f;
    }
    return c;
  }
  function N(a) {
    if (a.getTotalLength) return a.getTotalLength();
    switch (a.tagName.toLowerCase()) {
      case "circle":
        return 2 * Math.PI * a.getAttribute("r");
      case "rect":
        return 2 * a.getAttribute("width") + 2 * a.getAttribute("height");
      case "line":
        return F({
          x: a.getAttribute("x1"),
          y: a.getAttribute("y1")
        }, {
          x: a.getAttribute("x2"),
          y: a.getAttribute("y2")
        });
      case "polyline":
        return M(a);
      case "polygon":
        var c = a.points;
        return M(a) + F(c.getItem(c.numberOfItems - 1), c.getItem(0));
    }
  }
  function Y(a, c) {
    function d(b) {
      b = void 0 === b ? 0 : b;
      return a.el.getPointAtLength(1 <= c + b ? c + b : 0);
    }
    var b = d(), f = d(-1), n = d(1);
    switch (a.property) {
      case "x":
        return b.x;
      case "y":
        return b.y;
      case "angle":
        return 180 * Math.atan2(n.y - f.y, n.x - f.x) / Math.PI;
    }
  }
  function O(a, c) {
    var d = /-?\d*\.?\d+/g, b;
    b = h.pth(a) ? a.totalLength : a;
    if (h.col(b)) {
      if (h.rgb(b)) {
        var f = (/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g).exec(b);
        b = f ? "rgba(" + f[1] + ",1)" : b;
      } else b = h.hex(b) ? T(b) : h.hsl(b) ? U(b) : void 0;
    } else (f = (f = y(b)) ? b.substr(0, b.length - f.length) : b, b = c && !(/\s/g).test(b) ? f + c : f);
    b += "";
    return {
      original: b,
      numbers: b.match(d) ? b.match(d).map(Number) : [0],
      strings: h.str(a) || c ? b.split(d) : []
    };
  }
  function P(a) {
    a = a ? p(h.arr(a) ? a.map(m) : m(a)) : [];
    return r(a, function (a, d, b) {
      return b.indexOf(a) === d;
    });
  }
  function Z(a) {
    var c = P(a);
    return c.map(function (a, b) {
      return {
        target: a,
        id: b,
        total: c.length
      };
    });
  }
  function aa(a, c) {
    var d = C(c);
    if (h.arr(a)) {
      var b = a.length;
      2 !== b || h.obj(a[0]) ? h.fnc(c.duration) || (d.duration = c.duration / b) : a = {
        value: a
      };
    }
    return m(a).map(function (a, b) {
      b = b ? 0 : c.delay;
      a = h.obj(a) && !h.pth(a) ? a : {
        value: a
      };
      h.und(a.delay) && (a.delay = b);
      return a;
    }).map(function (a) {
      return z(a, d);
    });
  }
  function ba(a, c) {
    var d = {}, b;
    for (b in a) {
      var f = I(a[b], c);
      h.arr(f) && (f = f.map(function (a) {
        return I(a, c);
      }), 1 === f.length && (f = f[0]));
      d[b] = f;
    }
    d.duration = parseFloat(d.duration);
    d.delay = parseFloat(d.delay);
    return d;
  }
  function ca(a) {
    return h.arr(a) ? A.apply(this, a) : Q[a];
  }
  function da(a, c) {
    var d;
    return a.tweens.map(function (b) {
      b = ba(b, c);
      var f = b.value, e = K(c.target, a.name), k = d ? d.to.original : e, k = h.arr(f) ? f[0] : k, w = L(h.arr(f) ? f[1] : f, k), e = y(w) || y(k) || y(e);
      b.from = O(k, e);
      b.to = O(w, e);
      b.start = d ? d.end : a.offset;
      b.end = b.start + b.delay + b.duration;
      b.easing = ca(b.easing);
      b.elasticity = (1E3 - Math.min(Math.max(b.elasticity, 1), 999)) / 1E3;
      b.isPath = h.pth(f);
      b.isColor = h.col(b.from.original);
      b.isColor && (b.round = 1);
      return d = b;
    });
  }
  function ea(a, c) {
    return r(p(a.map(function (a) {
      return c.map(function (b) {
        var c = J(a.target, b.name);
        if (c) {
          var d = da(b, a);
          b = {
            type: c,
            property: b.name,
            animatable: a,
            tweens: d,
            duration: d[d.length - 1].end,
            delay: d[0].delay
          };
        } else b = void 0;
        return b;
      });
    })), function (a) {
      return !h.und(a);
    });
  }
  function R(a, c, d, b) {
    var f = "delay" === a;
    return c.length ? (f ? Math.min : Math.max).apply(Math, c.map(function (b) {
      return b[a];
    })) : f ? b.delay : d.offset + b.delay + b.duration;
  }
  function fa(a) {
    var c = D(ga, a), d = D(S, a), b = Z(a.targets), f = [], e = z(c, d), k;
    for (k in a) {
      e.hasOwnProperty(k) || "targets" === k || f.push({
        name: k,
        offset: e.offset,
        tweens: aa(a[k], d)
      });
    }
    a = ea(b, f);
    return z(c, {
      children: [],
      animatables: b,
      animations: a,
      duration: R("duration", a, c, d),
      delay: R("delay", a, c, d)
    });
  }
  function q(a) {
    function c() {
      return window.Promise && new Promise(function (a) {
        return p = a;
      });
    }
    function d(a) {
      return g.reversed ? g.duration - a : a;
    }
    function b(a) {
      for (var b = 0, c = {}, d = g.animations, f = d.length; b < f; ) {
        var e = d[b], k = e.animatable, h = e.tweens, n = h.length - 1, l = h[n];
        n && (l = r(h, function (b) {
          return a < b.end;
        })[0] || l);
        for (var h = Math.min(Math.max(a - l.start - l.delay, 0), l.duration) / l.duration, w = isNaN(h) ? 1 : l.easing(h, l.elasticity), h = l.to.strings, p = l.round, n = [], m = void 0, m = l.to.numbers.length, t = 0; t < m; t++) {
          var x = void 0, x = l.to.numbers[t], q = l.from.numbers[t], x = l.isPath ? Y(l.value, w * x) : q + w * (x - q);
          p && (l.isColor && 2 < t || (x = Math.round(x * p) / p));
          n.push(x);
        }
        if (l = h.length) for ((m = h[0], w = 0); w < l; w++) {
          (p = h[w + 1], t = n[w], isNaN(t) || (m = p ? m + (t + p) : m + (t + " ")));
        } else m = n[0];
        ha[e.type](k.target, e.property, m, c, k.id);
        e.currentValue = m;
        b++;
      }
      if (b = Object.keys(c).length) for (d = 0; d < b; d++) {
        (H || (H = E(document.body, "transform") ? "transform" : "-webkit-transform"), g.animatables[d].target.style[H] = c[d].join(" "));
      }
      g.currentTime = a;
      g.progress = a / g.duration * 100;
    }
    function f(a) {
      if (g[a]) g[a](g);
    }
    function e() {
      g.remaining && !0 !== g.remaining && g.remaining--;
    }
    function k(a) {
      var k = g.duration, n = g.offset, w = n + g.delay, r = g.currentTime, x = g.reversed, q = d(a);
      if (g.children.length) {
        var u = g.children, v = u.length;
        if (q >= g.currentTime) for (var G = 0; G < v; G++) {
          u[G].seek(q);
        } else for (; v--; ) {
          u[v].seek(q);
        }
      }
      if (q >= w || !k) (g.began || (g.began = !0, f("begin")), f("run"));
      if (q > n && q < k) b(q); else if ((q <= n && 0 !== r && (b(0), x && e()), q >= k && r !== k || !k)) (b(k), x || e());
      f("update");
      a >= k && (g.remaining ? (t = h, "alternate" === g.direction && (g.reversed = !g.reversed)) : (g.pause(), g.completed || (g.completed = !0, f("complete"), ("Promise" in window) && (p(), m = c()))), l = 0);
    }
    a = void 0 === a ? {} : a;
    var h, t, l = 0, p = null, m = c(), g = fa(a);
    g.reset = function () {
      var a = g.direction, c = g.loop;
      g.currentTime = 0;
      g.progress = 0;
      g.paused = !0;
      g.began = !1;
      g.completed = !1;
      g.reversed = "reverse" === a;
      g.remaining = "alternate" === a && 1 === c ? 2 : c;
      b(0);
      for (a = g.children.length; a--; ) {
        g.children[a].reset();
      }
    };
    g.tick = function (a) {
      h = a;
      t || (t = h);
      k((l + h - t) * q.speed);
    };
    g.seek = function (a) {
      k(d(a));
    };
    g.pause = function () {
      var a = v.indexOf(g);
      -1 < a && v.splice(a, 1);
      g.paused = !0;
    };
    g.play = function () {
      g.paused && (g.paused = !1, t = 0, l = d(g.currentTime), v.push(g), B || ia());
    };
    g.reverse = function () {
      g.reversed = !g.reversed;
      t = 0;
      l = d(g.currentTime);
    };
    g.restart = function () {
      g.pause();
      g.reset();
      g.play();
    };
    g.finished = m;
    g.reset();
    g.autoplay && g.play();
    return g;
  }
  var ga = {
    update: void 0,
    begin: void 0,
    run: void 0,
    complete: void 0,
    loop: 1,
    direction: "normal",
    autoplay: !0,
    offset: 0
  }, S = {
    duration: 1E3,
    delay: 0,
    easing: "easeOutElastic",
    elasticity: 500,
    round: 0
  }, W = ("translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective").split(" "), H, h = {
    arr: function (a) {
      return Array.isArray(a);
    },
    obj: function (a) {
      return -1 < Object.prototype.toString.call(a).indexOf("Object");
    },
    pth: function (a) {
      return h.obj(a) && a.hasOwnProperty("totalLength");
    },
    svg: function (a) {
      return a instanceof SVGElement;
    },
    dom: function (a) {
      return a.nodeType || h.svg(a);
    },
    str: function (a) {
      return "string" === typeof a;
    },
    fnc: function (a) {
      return "function" === typeof a;
    },
    und: function (a) {
      return "undefined" === typeof a;
    },
    hex: function (a) {
      return (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i).test(a);
    },
    rgb: function (a) {
      return (/^rgb/).test(a);
    },
    hsl: function (a) {
      return (/^hsl/).test(a);
    },
    col: function (a) {
      return h.hex(a) || h.rgb(a) || h.hsl(a);
    }
  }, A = (function () {
    function a(a, d, b) {
      return (((1 - 3 * b + 3 * d) * a + (3 * b - 6 * d)) * a + 3 * d) * a;
    }
    return function (c, d, b, f) {
      if (0 <= c && 1 >= c && 0 <= b && 1 >= b) {
        var e = new Float32Array(11);
        if (c !== d || b !== f) for (var k = 0; 11 > k; ++k) {
          e[k] = a(.1 * k, c, b);
        }
        return function (k) {
          if (c === d && b === f) return k;
          if (0 === k) return 0;
          if (1 === k) return 1;
          for (var h = 0, l = 1; 10 !== l && e[l] <= k; ++l) {
            h += .1;
          }
          --l;
          var l = h + (k - e[l]) / (e[l + 1] - e[l]) * .1, n = 3 * (1 - 3 * b + 3 * c) * l * l + 2 * (3 * b - 6 * c) * l + 3 * c;
          if (.001 <= n) {
            for (h = 0; 4 > h; ++h) {
              n = 3 * (1 - 3 * b + 3 * c) * l * l + 2 * (3 * b - 6 * c) * l + 3 * c;
              if (0 === n) break;
              var m = a(l, c, b) - k, l = l - m / n;
            }
            k = l;
          } else if (0 === n) k = l; else {
            var l = h, h = h + .1, g = 0;
            do {
              (m = l + (h - l) / 2, n = a(m, c, b) - k, 0 < n ? h = m : l = m);
            } while (1e-7 < Math.abs(n) && 10 > ++g);
            k = m;
          }
          return a(k, d, f);
        };
      }
    };
  })(), Q = (function () {
    function a(a, b) {
      return 0 === a || 1 === a ? a : -Math.pow(2, 10 * (a - 1)) * Math.sin(2 * (a - 1 - b / (2 * Math.PI) * Math.asin(1)) * Math.PI / b);
    }
    var c = ("Quad Cubic Quart Quint Sine Expo Circ Back Elastic").split(" "), d = {
      In: [[.55, .085, .68, .53], [.55, .055, .675, .19], [.895, .03, .685, .22], [.755, .05, .855, .06], [.47, 0, .745, .715], [.95, .05, .795, .035], [.6, .04, .98, .335], [.6, -.28, .735, .045], a],
      Out: [[.25, .46, .45, .94], [.215, .61, .355, 1], [.165, .84, .44, 1], [.23, 1, .32, 1], [.39, .575, .565, 1], [.19, 1, .22, 1], [.075, .82, .165, 1], [.175, .885, .32, 1.275], function (b, c) {
        return 1 - a(1 - b, c);
      }],
      InOut: [[.455, .03, .515, .955], [.645, .045, .355, 1], [.77, 0, .175, 1], [.86, 0, .07, 1], [.445, .05, .55, .95], [1, 0, 0, 1], [.785, .135, .15, .86], [.68, -.55, .265, 1.55], function (b, c) {
        return .5 > b ? a(2 * b, c) / 2 : 1 - a(-2 * b + 2, c) / 2;
      }]
    }, b = {
      linear: A(.25, .25, .75, .75)
    }, f = {}, e;
    for (e in d) {
      (f.type = e, d[f.type].forEach((function (a) {
        return function (d, f) {
          b["ease" + a.type + c[f]] = h.fnc(d) ? d : A.apply($jscomp$this, d);
        };
      })(f)), f = {
        type: f.type
      });
    }
    return b;
  })(), ha = {
    css: function (a, c, d) {
      return a.style[c] = d;
    },
    attribute: function (a, c, d) {
      return a.setAttribute(c, d);
    },
    object: function (a, c, d) {
      return a[c] = d;
    },
    transform: function (a, c, d, b, f) {
      b[f] || (b[f] = []);
      b[f].push(c + "(" + d + ")");
    }
  }, v = [], B = 0, ia = (function () {
    function a() {
      B = requestAnimationFrame(c);
    }
    function c(c) {
      var b = v.length;
      if (b) {
        for (var d = 0; d < b; ) {
          (v[d] && v[d].tick(c), d++);
        }
        a();
      } else (cancelAnimationFrame(B), B = 0);
    }
    return a;
  })();
  q.version = "2.2.0";
  q.speed = 1;
  q.running = v;
  q.remove = function (a) {
    a = P(a);
    for (var c = v.length; c--; ) {
      for (var d = v[c], b = d.animations, f = b.length; f--; ) {
        u(a, b[f].animatable.target) && (b.splice(f, 1), b.length || d.pause());
      }
    }
  };
  q.getValue = K;
  q.path = function (a, c) {
    var d = h.str(a) ? e(a)[0] : a, b = c || 100;
    return function (a) {
      return {
        el: d,
        property: a,
        totalLength: N(d) * (b / 100)
      };
    };
  };
  q.setDashoffset = function (a) {
    var c = N(a);
    a.setAttribute("stroke-dasharray", c);
    return c;
  };
  q.bezier = A;
  q.easings = Q;
  q.timeline = function (a) {
    var c = q(a);
    c.pause();
    c.duration = 0;
    c.add = function (d) {
      c.children.forEach(function (a) {
        a.began = !0;
        a.completed = !0;
      });
      m(d).forEach(function (b) {
        var d = z(b, D(S, a || ({})));
        d.targets = d.targets || a.targets;
        b = c.duration;
        var e = d.offset;
        d.autoplay = !1;
        d.direction = c.direction;
        d.offset = h.und(e) ? b : L(e, b);
        c.began = !0;
        c.completed = !0;
        c.seek(d.offset);
        d = q(d);
        d.began = !0;
        d.completed = !0;
        d.duration > b && (c.duration = d.duration);
        c.children.push(d);
      });
      c.seek(0);
      c.reset();
      c.autoplay && c.restart();
      return c;
    };
    return c;
  };
  q.random = function (a, c) {
    return Math.floor(Math.random() * (c - a + 1)) + a;
  };
  return q;
});
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    accordion: true,
    onOpenStart: undefined,
    onOpenEnd: undefined,
    onCloseStart: undefined,
    onCloseEnd: undefined,
    inDuration: 300,
    outDuration: 300
  };
  /**
  * @class
  *
  */
  var Collapsible = (function (_Component) {
    _inherits(Collapsible, _Component);
    /**
    * Construct Collapsible instance
    * @constructor
    * @param {Element} el
    * @param {Object} options
    */
    function Collapsible(el, options) {
      _classCallCheck(this, Collapsible);
      var _this3 = _possibleConstructorReturn(this, (Collapsible.__proto__ || Object.getPrototypeOf(Collapsible)).call(this, Collapsible, el, options));
      _this3.el.M_Collapsible = _this3;
      /**
      * Options for the collapsible
      * @member Collapsible#options
      * @prop {Boolean} [accordion=false] - Type of the collapsible
      * @prop {Function} onOpenStart - Callback function called before collapsible is opened
      * @prop {Function} onOpenEnd - Callback function called after collapsible is opened
      * @prop {Function} onCloseStart - Callback function called before collapsible is closed
      * @prop {Function} onCloseEnd - Callback function called after collapsible is closed
      * @prop {Number} inDuration - Transition in duration in milliseconds.
      * @prop {Number} outDuration - Transition duration in milliseconds.
      */
      _this3.options = $.extend({}, Collapsible.defaults, options);
      // Setup tab indices
      _this3.$headers = _this3.$el.children('li').children('.collapsible-header');
      _this3.$headers.attr('tabindex', 0);
      _this3._setupEventHandlers();
      // Open first active
      var $activeBodies = _this3.$el.children('li.active').children('.collapsible-body');
      if (_this3.options.accordion) {
        // Handle Accordion
        $activeBodies.first().css('display', 'block');
      } else {
        // Handle Expandables
        $activeBodies.css('display', 'block');
      }
      return _this3;
    }
    _createClass(Collapsible, [{
      key: "destroy",
      /**
      * Teardown component
      */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_Collapsible = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this4 = this;
        this._handleCollapsibleClickBound = this._handleCollapsibleClick.bind(this);
        this._handleCollapsibleKeydownBound = this._handleCollapsibleKeydown.bind(this);
        this.el.addEventListener('click', this._handleCollapsibleClickBound);
        this.$headers.each(function (header) {
          header.addEventListener('keydown', _this4._handleCollapsibleKeydownBound);
        });
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this5 = this;
        this.el.removeEventListener('click', this._handleCollapsibleClickBound);
        this.$headers.each(function (header) {
          header.removeEventListener('keydown', _this5._handleCollapsibleKeydownBound);
        });
      }
    }, {
      key: "_handleCollapsibleClick",
      value: function _handleCollapsibleClick(e) {
        var $header = $(e.target).closest('.collapsible-header');
        if (e.target && $header.length) {
          var $collapsible = $header.closest('.collapsible');
          if ($collapsible[0] === this.el) {
            var $collapsibleLi = $header.closest('li');
            var $collapsibleLis = $collapsible.children('li');
            var isActive = $collapsibleLi[0].classList.contains('active');
            var index = $collapsibleLis.index($collapsibleLi);
            if (isActive) {
              this.close(index);
            } else {
              this.open(index);
            }
          }
        }
      }
    }, {
      key: "_handleCollapsibleKeydown",
      value: function _handleCollapsibleKeydown(e) {
        if (e.keyCode === 13) {
          this._handleCollapsibleClickBound(e);
        }
      }
    }, {
      key: "_animateIn",
      value: function _animateIn(index) {
        var _this6 = this;
        var $collapsibleLi = this.$el.children('li').eq(index);
        if ($collapsibleLi.length) {
          var $body = $collapsibleLi.children('.collapsible-body');
          anim.remove($body[0]);
          $body.css({
            display: 'block',
            overflow: 'hidden',
            height: 0,
            paddingTop: '',
            paddingBottom: ''
          });
          var pTop = $body.css('padding-top');
          var pBottom = $body.css('padding-bottom');
          var finalHeight = $body[0].scrollHeight;
          $body.css({
            paddingTop: 0,
            paddingBottom: 0
          });
          anim({
            targets: $body[0],
            height: finalHeight,
            paddingTop: pTop,
            paddingBottom: pBottom,
            duration: this.options.inDuration,
            easing: 'easeInOutCubic',
            complete: function (anim) {
              $body.css({
                overflow: '',
                paddingTop: '',
                paddingBottom: '',
                height: ''
              });
              // onOpenEnd callback
              if (typeof _this6.options.onOpenEnd === 'function') {
                _this6.options.onOpenEnd.call(_this6, $collapsibleLi[0]);
              }
            }
          });
        }
      }
    }, {
      key: "_animateOut",
      value: function _animateOut(index) {
        var _this7 = this;
        var $collapsibleLi = this.$el.children('li').eq(index);
        if ($collapsibleLi.length) {
          var $body = $collapsibleLi.children('.collapsible-body');
          anim.remove($body[0]);
          $body.css('overflow', 'hidden');
          anim({
            targets: $body[0],
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            duration: this.options.outDuration,
            easing: 'easeInOutCubic',
            complete: function () {
              $body.css({
                height: '',
                overflow: '',
                padding: '',
                display: ''
              });
              // onCloseEnd callback
              if (typeof _this7.options.onCloseEnd === 'function') {
                _this7.options.onCloseEnd.call(_this7, $collapsibleLi[0]);
              }
            }
          });
        }
      }
    }, {
      key: "open",
      value: function open(index) {
        var _this8 = this;
        var $collapsibleLi = this.$el.children('li').eq(index);
        if ($collapsibleLi.length && !$collapsibleLi[0].classList.contains('active')) {
          // onOpenStart callback
          if (typeof this.options.onOpenStart === 'function') {
            this.options.onOpenStart.call(this, $collapsibleLi[0]);
          }
          // Handle accordion behavior
          if (this.options.accordion) {
            var $collapsibleLis = this.$el.children('li');
            var $activeLis = this.$el.children('li.active');
            $activeLis.each(function (el) {
              var index = $collapsibleLis.index($(el));
              _this8.close(index);
            });
          }
          // Animate in
          $collapsibleLi[0].classList.add('active');
          this._animateIn(index);
        }
      }
    }, {
      key: "close",
      value: function close(index) {
        var $collapsibleLi = this.$el.children('li').eq(index);
        if ($collapsibleLi.length && $collapsibleLi[0].classList.contains('active')) {
          // onCloseStart callback
          if (typeof this.options.onCloseStart === 'function') {
            this.options.onCloseStart.call(this, $collapsibleLi[0]);
          }
          // Animate out
          $collapsibleLi[0].classList.remove('active');
          this._animateOut(index);
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Collapsible.__proto__ || Object.getPrototypeOf(Collapsible), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Collapsible;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Collapsible;
  })(Component);
  M.Collapsible = Collapsible;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Collapsible, 'collapsible', 'M_Collapsible');
  }
})(cash, M.anime);
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    alignment: 'left',
    autoFocus: true,
    constrainWidth: true,
    container: null,
    coverTrigger: true,
    closeOnClick: true,
    hover: false,
    inDuration: 150,
    outDuration: 250,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    onItemClick: null
  };
  /**
  * @class
  */
  var Dropdown = (function (_Component2) {
    _inherits(Dropdown, _Component2);
    function Dropdown(el, options) {
      _classCallCheck(this, Dropdown);
      var _this9 = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, Dropdown, el, options));
      _this9.el.M_Dropdown = _this9;
      Dropdown._dropdowns.push(_this9);
      _this9.id = M.getIdFromTrigger(el);
      _this9.dropdownEl = document.getElementById(_this9.id);
      _this9.$dropdownEl = $(_this9.dropdownEl);
      /**
      * Options for the dropdown
      * @member Dropdown#options
      * @prop {String} [alignment='left'] - Edge which the dropdown is aligned to
      * @prop {Boolean} [autoFocus=true] - Automatically focus dropdown el for keyboard
      * @prop {Boolean} [constrainWidth=true] - Constrain width to width of the button
      * @prop {Element} container - Container element to attach dropdown to (optional)
      * @prop {Boolean} [coverTrigger=true] - Place dropdown over trigger
      * @prop {Boolean} [closeOnClick=true] - Close on click of dropdown item
      * @prop {Boolean} [hover=false] - Open dropdown on hover
      * @prop {Number} [inDuration=150] - Duration of open animation in ms
      * @prop {Number} [outDuration=250] - Duration of close animation in ms
      * @prop {Function} onOpenStart - Function called when dropdown starts opening
      * @prop {Function} onOpenEnd - Function called when dropdown finishes opening
      * @prop {Function} onCloseStart - Function called when dropdown starts closing
      * @prop {Function} onCloseEnd - Function called when dropdown finishes closing
      */
      _this9.options = $.extend({}, Dropdown.defaults, options);
      /**
      * Describes open/close state of dropdown
      * @type {Boolean}
      */
      _this9.isOpen = false;
      /**
      * Describes if dropdown content is scrollable
      * @type {Boolean}
      */
      _this9.isScrollable = false;
      /**
      * Describes if touch moving on dropdown content
      * @type {Boolean}
      */
      _this9.isTouchMoving = false;
      _this9.focusedIndex = -1;
      _this9.filterQuery = [];
      // Move dropdown-content after dropdown-trigger
      if (!!_this9.options.container) {
        $(_this9.options.container).append(_this9.dropdownEl);
      } else {
        _this9.$el.after(_this9.dropdownEl);
      }
      _this9._makeDropdownFocusable();
      _this9._resetFilterQueryBound = _this9._resetFilterQuery.bind(_this9);
      _this9._handleDocumentClickBound = _this9._handleDocumentClick.bind(_this9);
      _this9._handleDocumentTouchmoveBound = _this9._handleDocumentTouchmove.bind(_this9);
      _this9._handleDropdownClickBound = _this9._handleDropdownClick.bind(_this9);
      _this9._handleDropdownKeydownBound = _this9._handleDropdownKeydown.bind(_this9);
      _this9._handleTriggerKeydownBound = _this9._handleTriggerKeydown.bind(_this9);
      _this9._setupEventHandlers();
      return _this9;
    }
    _createClass(Dropdown, [{
      key: "destroy",
      /**
      * Teardown component
      */
      value: function destroy() {
        this._resetDropdownStyles();
        this._removeEventHandlers();
        Dropdown._dropdowns.splice(Dropdown._dropdowns.indexOf(this), 1);
        this.el.M_Dropdown = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        // Trigger keydown handler
        this.el.addEventListener('keydown', this._handleTriggerKeydownBound);
        // Item click handler
        this.dropdownEl.addEventListener('click', this._handleDropdownClickBound);
        // Hover event handlers
        if (this.options.hover) {
          this._handleMouseEnterBound = this._handleMouseEnter.bind(this);
          this.el.addEventListener('mouseenter', this._handleMouseEnterBound);
          this._handleMouseLeaveBound = this._handleMouseLeave.bind(this);
          this.el.addEventListener('mouseleave', this._handleMouseLeaveBound);
          this.dropdownEl.addEventListener('mouseleave', this._handleMouseLeaveBound);
        } else {
          this._handleClickBound = this._handleClick.bind(this);
          this.el.addEventListener('click', this._handleClickBound);
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('keydown', this._handleTriggerKeydownBound);
        this.dropdownEl.removeEventListener('click', this._handleDropdownClickBound);
        if (this.options.hover) {
          this.el.removeEventListener('mouseenter', this._handleMouseEnterBound);
          this.el.removeEventListener('mouseleave', this._handleMouseLeaveBound);
          this.dropdownEl.removeEventListener('mouseleave', this._handleMouseLeaveBound);
        } else {
          this.el.removeEventListener('click', this._handleClickBound);
        }
      }
    }, {
      key: "_setupTemporaryEventHandlers",
      value: function _setupTemporaryEventHandlers() {
        // Use capture phase event handler to prevent click
        document.body.addEventListener('click', this._handleDocumentClickBound, true);
        document.body.addEventListener('touchend', this._handleDocumentClickBound);
        document.body.addEventListener('touchmove', this._handleDocumentTouchmoveBound);
        this.dropdownEl.addEventListener('keydown', this._handleDropdownKeydownBound);
      }
    }, {
      key: "_removeTemporaryEventHandlers",
      value: function _removeTemporaryEventHandlers() {
        // Use capture phase event handler to prevent click
        document.body.removeEventListener('click', this._handleDocumentClickBound, true);
        document.body.removeEventListener('touchend', this._handleDocumentClickBound);
        document.body.removeEventListener('touchmove', this._handleDocumentTouchmoveBound);
        this.dropdownEl.removeEventListener('keydown', this._handleDropdownKeydownBound);
      }
    }, {
      key: "_handleClick",
      value: function _handleClick(e) {
        e.preventDefault();
        this.open();
      }
    }, {
      key: "_handleMouseEnter",
      value: function _handleMouseEnter() {
        this.open();
      }
    }, {
      key: "_handleMouseLeave",
      value: function _handleMouseLeave(e) {
        var toEl = e.toElement || e.relatedTarget;
        var leaveToDropdownContent = !!$(toEl).closest('.dropdown-content').length;
        var leaveToActiveDropdownTrigger = false;
        var $closestTrigger = $(toEl).closest('.dropdown-trigger');
        if ($closestTrigger.length && !!$closestTrigger[0].M_Dropdown && $closestTrigger[0].M_Dropdown.isOpen) {
          leaveToActiveDropdownTrigger = true;
        }
        // Close hover dropdown if mouse did not leave to either active dropdown-trigger or dropdown-content
        if (!leaveToActiveDropdownTrigger && !leaveToDropdownContent) {
          this.close();
        }
      }
    }, {
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(e) {
        var _this10 = this;
        var $target = $(e.target);
        if (this.options.closeOnClick && $target.closest('.dropdown-content').length && !this.isTouchMoving) {
          // isTouchMoving to check if scrolling on mobile.
          setTimeout(function () {
            _this10.close();
          }, 0);
        } else if ($target.closest('.dropdown-trigger').length || !$target.closest('.dropdown-content').length) {
          setTimeout(function () {
            _this10.close();
          }, 0);
        }
        this.isTouchMoving = false;
      }
    }, {
      key: "_handleTriggerKeydown",
      value: function _handleTriggerKeydown(e) {
        // ARROW DOWN OR ENTER WHEN SELECT IS CLOSED - open Dropdown
        if ((e.which === M.keys.ARROW_DOWN || e.which === M.keys.ENTER) && !this.isOpen) {
          e.preventDefault();
          this.open();
        }
      }
    }, {
      key: "_handleDocumentTouchmove",
      value: function _handleDocumentTouchmove(e) {
        var $target = $(e.target);
        if ($target.closest('.dropdown-content').length) {
          this.isTouchMoving = true;
        }
      }
    }, {
      key: "_handleDropdownClick",
      value: function _handleDropdownClick(e) {
        // onItemClick callback
        if (typeof this.options.onItemClick === 'function') {
          var itemEl = $(e.target).closest('li')[0];
          this.options.onItemClick.call(this, itemEl);
        }
      }
    }, {
      key: "_handleDropdownKeydown",
      value: function _handleDropdownKeydown(e) {
        if (e.which === M.keys.TAB) {
          e.preventDefault();
          this.close();
        } else if ((e.which === M.keys.ARROW_DOWN || e.which === M.keys.ARROW_UP) && this.isOpen) {
          e.preventDefault();
          var direction = e.which === M.keys.ARROW_DOWN ? 1 : -1;
          var newFocusedIndex = this.focusedIndex;
          var foundNewIndex = false;
          do {
            newFocusedIndex = newFocusedIndex + direction;
            if (!!this.dropdownEl.children[newFocusedIndex] && this.dropdownEl.children[newFocusedIndex].tabIndex !== -1) {
              foundNewIndex = true;
              break;
            }
          } while (newFocusedIndex < this.dropdownEl.children.length && newFocusedIndex >= 0);
          if (foundNewIndex) {
            this.focusedIndex = newFocusedIndex;
            this._focusFocusedItem();
          }
        } else if (e.which === M.keys.ENTER && this.isOpen) {
          // Search for <a> and <button>
          var focusedElement = this.dropdownEl.children[this.focusedIndex];
          var $activatableElement = $(focusedElement).find('a, button').first();
          // Click a or button tag if exists, otherwise click li tag
          if (!!$activatableElement.length) {
            $activatableElement[0].click();
          } else if (!!focusedElement) {
            focusedElement.click();
          }
        } else if (e.which === M.keys.ESC && this.isOpen) {
          e.preventDefault();
          this.close();
        }
        // CASE WHEN USER TYPE LETTERS
        var letter = String.fromCharCode(e.which).toLowerCase(), nonLetters = [9, 13, 27, 38, 40];
        if (letter && nonLetters.indexOf(e.which) === -1) {
          this.filterQuery.push(letter);
          var string = this.filterQuery.join(''), newOptionEl = $(this.dropdownEl).find('li').filter(function (el) {
            return $(el).text().toLowerCase().indexOf(string) === 0;
          })[0];
          if (newOptionEl) {
            this.focusedIndex = $(newOptionEl).index();
            this._focusFocusedItem();
          }
        }
        this.filterTimeout = setTimeout(this._resetFilterQueryBound, 1000);
      }
    }, {
      key: "_resetFilterQuery",
      value: function _resetFilterQuery() {
        this.filterQuery = [];
      }
    }, {
      key: "_resetDropdownStyles",
      value: function _resetDropdownStyles() {
        this.$dropdownEl.css({
          display: '',
          width: '',
          height: '',
          left: '',
          top: '',
          'transform-origin': '',
          transform: '',
          opacity: ''
        });
      }
    }, {
      key: "_makeDropdownFocusable",
      value: function _makeDropdownFocusable() {
        // Needed for arrow key navigation
        this.dropdownEl.tabIndex = 0;
        // Only set tabindex if it hasn't been set by user
        $(this.dropdownEl).children().each(function (el) {
          if (!el.getAttribute('tabindex')) {
            el.setAttribute('tabindex', 0);
          }
        });
      }
    }, {
      key: "_focusFocusedItem",
      value: function _focusFocusedItem() {
        if (this.focusedIndex >= 0 && this.focusedIndex < this.dropdownEl.children.length && this.options.autoFocus) {
          this.dropdownEl.children[this.focusedIndex].focus();
        }
      }
    }, {
      key: "_getDropdownPosition",
      value: function _getDropdownPosition() {
        var offsetParentBRect = this.el.offsetParent.getBoundingClientRect();
        var triggerBRect = this.el.getBoundingClientRect();
        var dropdownBRect = this.dropdownEl.getBoundingClientRect();
        var idealHeight = dropdownBRect.height;
        var idealWidth = dropdownBRect.width;
        var idealXPos = triggerBRect.left - dropdownBRect.left;
        var idealYPos = triggerBRect.top - dropdownBRect.top;
        var dropdownBounds = {
          left: idealXPos,
          top: idealYPos,
          height: idealHeight,
          width: idealWidth
        };
        // Countainer here will be closest ancestor with overflow: hidden
        var closestOverflowParent = !!this.dropdownEl.offsetParent ? this.dropdownEl.offsetParent : this.dropdownEl.parentNode;
        var alignments = M.checkPossibleAlignments(this.el, closestOverflowParent, dropdownBounds, this.options.coverTrigger ? 0 : triggerBRect.height);
        var verticalAlignment = 'top';
        var horizontalAlignment = this.options.alignment;
        idealYPos += this.options.coverTrigger ? 0 : triggerBRect.height;
        // Reset isScrollable
        this.isScrollable = false;
        if (!alignments.top) {
          if (alignments.bottom) {
            verticalAlignment = 'bottom';
          } else {
            this.isScrollable = true;
            // Determine which side has most space and cutoff at correct height
            if (alignments.spaceOnTop > alignments.spaceOnBottom) {
              verticalAlignment = 'bottom';
              idealHeight += alignments.spaceOnTop;
              idealYPos -= alignments.spaceOnTop;
            } else {
              idealHeight += alignments.spaceOnBottom;
            }
          }
        }
        // If preferred horizontal alignment is possible
        if (!alignments[horizontalAlignment]) {
          var oppositeAlignment = horizontalAlignment === 'left' ? 'right' : 'left';
          if (alignments[oppositeAlignment]) {
            horizontalAlignment = oppositeAlignment;
          } else {
            // Determine which side has most space and cutoff at correct height
            if (alignments.spaceOnLeft > alignments.spaceOnRight) {
              horizontalAlignment = 'right';
              idealWidth += alignments.spaceOnLeft;
              idealXPos -= alignments.spaceOnLeft;
            } else {
              horizontalAlignment = 'left';
              idealWidth += alignments.spaceOnRight;
            }
          }
        }
        if (verticalAlignment === 'bottom') {
          idealYPos = idealYPos - dropdownBRect.height + (this.options.coverTrigger ? triggerBRect.height : 0);
        }
        if (horizontalAlignment === 'right') {
          idealXPos = idealXPos - dropdownBRect.width + triggerBRect.width;
        }
        return {
          x: idealXPos,
          y: idealYPos,
          verticalAlignment: verticalAlignment,
          horizontalAlignment: horizontalAlignment,
          height: idealHeight,
          width: idealWidth
        };
      }
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        var _this11 = this;
        anim.remove(this.dropdownEl);
        anim({
          targets: this.dropdownEl,
          opacity: {
            value: [0, 1],
            easing: 'easeOutQuad'
          },
          scaleX: [0.3, 1],
          scaleY: [0.3, 1],
          duration: this.options.inDuration,
          easing: 'easeOutQuint',
          complete: function (anim) {
            if (_this11.options.autoFocus) {
              _this11.dropdownEl.focus();
            }
            // onOpenEnd callback
            if (typeof _this11.options.onOpenEnd === 'function') {
              _this11.options.onOpenEnd.call(_this11, _this11.el);
            }
          }
        });
      }
    }, {
      key: "_animateOut",
      value: function _animateOut() {
        var _this12 = this;
        anim.remove(this.dropdownEl);
        anim({
          targets: this.dropdownEl,
          opacity: {
            value: 0,
            easing: 'easeOutQuint'
          },
          scaleX: 0.3,
          scaleY: 0.3,
          duration: this.options.outDuration,
          easing: 'easeOutQuint',
          complete: function (anim) {
            _this12._resetDropdownStyles();
            // onCloseEnd callback
            if (typeof _this12.options.onCloseEnd === 'function') {
              _this12.options.onCloseEnd.call(_this12, _this12.el);
            }
          }
        });
      }
    }, {
      key: "_placeDropdown",
      value: function _placeDropdown() {
        // Set width before calculating positionInfo
        var idealWidth = this.options.constrainWidth ? this.el.getBoundingClientRect().width : this.dropdownEl.getBoundingClientRect().width;
        this.dropdownEl.style.width = idealWidth + 'px';
        var positionInfo = this._getDropdownPosition();
        this.dropdownEl.style.left = positionInfo.x + 'px';
        this.dropdownEl.style.top = positionInfo.y + 'px';
        this.dropdownEl.style.height = positionInfo.height + 'px';
        this.dropdownEl.style.width = positionInfo.width + 'px';
        this.dropdownEl.style.transformOrigin = (positionInfo.horizontalAlignment === 'left' ? '0' : '100%') + " " + (positionInfo.verticalAlignment === 'top' ? '0' : '100%');
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }
        this.isOpen = true;
        // onOpenStart callback
        if (typeof this.options.onOpenStart === 'function') {
          this.options.onOpenStart.call(this, this.el);
        }
        // Reset styles
        this._resetDropdownStyles();
        this.dropdownEl.style.display = 'block';
        this._placeDropdown();
        this._animateIn();
        this._setupTemporaryEventHandlers();
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        this.isOpen = false;
        this.focusedIndex = -1;
        // onCloseStart callback
        if (typeof this.options.onCloseStart === 'function') {
          this.options.onCloseStart.call(this, this.el);
        }
        this._animateOut();
        this._removeTemporaryEventHandlers();
        if (this.options.autoFocus) {
          this.el.focus();
        }
      }
    }, {
      key: "recalculateDimensions",
      value: function recalculateDimensions() {
        if (this.isOpen) {
          this.$dropdownEl.css({
            width: '',
            height: '',
            left: '',
            top: '',
            'transform-origin': ''
          });
          this._placeDropdown();
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Dropdown.__proto__ || Object.getPrototypeOf(Dropdown), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Dropdown;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Dropdown;
  })(Component);
  /**
  * @static
  * @memberof Dropdown
  */
  Dropdown._dropdowns = [];
  M.Dropdown = Dropdown;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Dropdown, 'dropdown', 'M_Dropdown');
  }
})(cash, M.anime);
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    opacity: 0.5,
    inDuration: 250,
    outDuration: 250,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    preventScrolling: true,
    dismissible: true,
    startingTop: '4%',
    endingTop: '10%'
  };
  /**
  * @class
  *
  */
  var Modal = (function (_Component3) {
    _inherits(Modal, _Component3);
    /**
    * Construct Modal instance and set up overlay
    * @constructor
    * @param {Element} el
    * @param {Object} options
    */
    function Modal(el, options) {
      _classCallCheck(this, Modal);
      var _this13 = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, Modal, el, options));
      _this13.el.M_Modal = _this13;
      /**
      * Options for the modal
      * @member Modal#options
      * @prop {Number} [opacity=0.5] - Opacity of the modal overlay
      * @prop {Number} [inDuration=250] - Length in ms of enter transition
      * @prop {Number} [outDuration=250] - Length in ms of exit transition
      * @prop {Function} onOpenStart - Callback function called before modal is opened
      * @prop {Function} onOpenEnd - Callback function called after modal is opened
      * @prop {Function} onCloseStart - Callback function called before modal is closed
      * @prop {Function} onCloseEnd - Callback function called after modal is closed
      * @prop {Boolean} [dismissible=true] - Allow modal to be dismissed by keyboard or overlay click
      * @prop {String} [startingTop='4%'] - startingTop
      * @prop {String} [endingTop='10%'] - endingTop
      */
      _this13.options = $.extend({}, Modal.defaults, options);
      /**
      * Describes open/close state of modal
      * @type {Boolean}
      */
      _this13.isOpen = false;
      _this13.id = _this13.$el.attr('id');
      _this13._openingTrigger = undefined;
      _this13.$overlay = $('<div class="modal-overlay"></div>');
      _this13.el.tabIndex = 0;
      _this13._nthModalOpened = 0;
      Modal._count++;
      _this13._setupEventHandlers();
      return _this13;
    }
    _createClass(Modal, [{
      key: "destroy",
      /**
      * Teardown component
      */
      value: function destroy() {
        Modal._count--;
        this._removeEventHandlers();
        this.el.removeAttribute('style');
        this.$overlay.remove();
        this.el.M_Modal = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleOverlayClickBound = this._handleOverlayClick.bind(this);
        this._handleModalCloseClickBound = this._handleModalCloseClick.bind(this);
        if (Modal._count === 1) {
          document.body.addEventListener('click', this._handleTriggerClick);
        }
        this.$overlay[0].addEventListener('click', this._handleOverlayClickBound);
        this.el.addEventListener('click', this._handleModalCloseClickBound);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (Modal._count === 0) {
          document.body.removeEventListener('click', this._handleTriggerClick);
        }
        this.$overlay[0].removeEventListener('click', this._handleOverlayClickBound);
        this.el.removeEventListener('click', this._handleModalCloseClickBound);
      }
    }, {
      key: "_handleTriggerClick",
      value: function _handleTriggerClick(e) {
        var $trigger = $(e.target).closest('.modal-trigger');
        if ($trigger.length) {
          var modalId = M.getIdFromTrigger($trigger[0]);
          var modalInstance = document.getElementById(modalId).M_Modal;
          if (modalInstance) {
            modalInstance.open($trigger);
          }
          e.preventDefault();
        }
      }
    }, {
      key: "_handleOverlayClick",
      value: function _handleOverlayClick() {
        if (this.options.dismissible) {
          this.close();
        }
      }
    }, {
      key: "_handleModalCloseClick",
      value: function _handleModalCloseClick(e) {
        var $closeTrigger = $(e.target).closest('.modal-close');
        if ($closeTrigger.length) {
          this.close();
        }
      }
    }, {
      key: "_handleKeydown",
      value: function _handleKeydown(e) {
        // ESC key
        if (e.keyCode === 27 && this.options.dismissible) {
          this.close();
        }
      }
    }, {
      key: "_handleFocus",
      value: function _handleFocus(e) {
        // Only trap focus if this modal is the last model opened (prevents loops in nested modals).
        if (!this.el.contains(e.target) && this._nthModalOpened === Modal._modalsOpen) {
          this.el.focus();
        }
      }
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        var _this14 = this;
        // Set initial styles
        $.extend(this.el.style, {
          display: 'block',
          opacity: 0
        });
        $.extend(this.$overlay[0].style, {
          display: 'block',
          opacity: 0
        });
        // Animate overlay
        anim({
          targets: this.$overlay[0],
          opacity: this.options.opacity,
          duration: this.options.inDuration,
          easing: 'easeOutQuad'
        });
        // Define modal animation options
        var enterAnimOptions = {
          targets: this.el,
          duration: this.options.inDuration,
          easing: 'easeOutCubic',
          // Handle modal onOpenEnd callback
          complete: function () {
            if (typeof _this14.options.onOpenEnd === 'function') {
              _this14.options.onOpenEnd.call(_this14, _this14.el, _this14._openingTrigger);
            }
          }
        };
        // Bottom sheet animation
        if (this.el.classList.contains('bottom-sheet')) {
          $.extend(enterAnimOptions, {
            bottom: 0,
            opacity: 1
          });
          anim(enterAnimOptions);
        } else {
          $.extend(enterAnimOptions, {
            top: [this.options.startingTop, this.options.endingTop],
            opacity: 1,
            scaleX: [0.8, 1],
            scaleY: [0.8, 1]
          });
          anim(enterAnimOptions);
        }
      }
    }, {
      key: "_animateOut",
      value: function _animateOut() {
        var _this15 = this;
        // Animate overlay
        anim({
          targets: this.$overlay[0],
          opacity: 0,
          duration: this.options.outDuration,
          easing: 'easeOutQuart'
        });
        // Define modal animation options
        var exitAnimOptions = {
          targets: this.el,
          duration: this.options.outDuration,
          easing: 'easeOutCubic',
          // Handle modal ready callback
          complete: function () {
            _this15.el.style.display = 'none';
            _this15.$overlay.remove();
            // Call onCloseEnd callback
            if (typeof _this15.options.onCloseEnd === 'function') {
              _this15.options.onCloseEnd.call(_this15, _this15.el);
            }
          }
        };
        // Bottom sheet animation
        if (this.el.classList.contains('bottom-sheet')) {
          $.extend(exitAnimOptions, {
            bottom: '-100%',
            opacity: 0
          });
          anim(exitAnimOptions);
        } else {
          $.extend(exitAnimOptions, {
            top: [this.options.endingTop, this.options.startingTop],
            opacity: 0,
            scaleX: 0.8,
            scaleY: 0.8
          });
          anim(exitAnimOptions);
        }
      }
    }, {
      key: "open",
      value: function open($trigger) {
        if (this.isOpen) {
          return;
        }
        this.isOpen = true;
        Modal._modalsOpen++;
        this._nthModalOpened = Modal._modalsOpen;
        // Set Z-Index based on number of currently open modals
        this.$overlay[0].style.zIndex = 1000 + Modal._modalsOpen * 2;
        this.el.style.zIndex = 1000 + Modal._modalsOpen * 2 + 1;
        // Set opening trigger, undefined indicates modal was opened by javascript
        this._openingTrigger = !!$trigger ? $trigger[0] : undefined;
        // onOpenStart callback
        if (typeof this.options.onOpenStart === 'function') {
          this.options.onOpenStart.call(this, this.el, this._openingTrigger);
        }
        if (this.options.preventScrolling) {
          document.body.style.overflow = 'hidden';
        }
        this.el.classList.add('open');
        this.el.insertAdjacentElement('afterend', this.$overlay[0]);
        if (this.options.dismissible) {
          this._handleKeydownBound = this._handleKeydown.bind(this);
          this._handleFocusBound = this._handleFocus.bind(this);
          document.addEventListener('keydown', this._handleKeydownBound);
          document.addEventListener('focus', this._handleFocusBound, true);
        }
        anim.remove(this.el);
        anim.remove(this.$overlay[0]);
        this._animateIn();
        // Focus modal
        this.el.focus();
        return this;
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        this.isOpen = false;
        Modal._modalsOpen--;
        this._nthModalOpened = 0;
        // Call onCloseStart callback
        if (typeof this.options.onCloseStart === 'function') {
          this.options.onCloseStart.call(this, this.el);
        }
        this.el.classList.remove('open');
        // Enable body scrolling only if there are no more modals open.
        if (Modal._modalsOpen === 0) {
          document.body.style.overflow = '';
        }
        if (this.options.dismissible) {
          document.removeEventListener('keydown', this._handleKeydownBound);
          document.removeEventListener('focus', this._handleFocusBound, true);
        }
        anim.remove(this.el);
        anim.remove(this.$overlay[0]);
        this._animateOut();
        return this;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Modal.__proto__ || Object.getPrototypeOf(Modal), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Modal;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Modal;
  })(Component);
  /**
  * @static
  * @memberof Modal
  */
  Modal._modalsOpen = 0;
  /**
  * @static
  * @memberof Modal
  */
  Modal._count = 0;
  M.Modal = Modal;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Modal, 'modal', 'M_Modal');
  }
})(cash, M.anime);
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    inDuration: 275,
    outDuration: 200,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null
  };
  /**
  * @class
  *
  */
  var Materialbox = (function (_Component4) {
    _inherits(Materialbox, _Component4);
    /**
    * Construct Materialbox instance
    * @constructor
    * @param {Element} el
    * @param {Object} options
    */
    function Materialbox(el, options) {
      _classCallCheck(this, Materialbox);
      var _this16 = _possibleConstructorReturn(this, (Materialbox.__proto__ || Object.getPrototypeOf(Materialbox)).call(this, Materialbox, el, options));
      _this16.el.M_Materialbox = _this16;
      /**
      * Options for the modal
      * @member Materialbox#options
      * @prop {Number} [inDuration=275] - Length in ms of enter transition
      * @prop {Number} [outDuration=200] - Length in ms of exit transition
      * @prop {Function} onOpenStart - Callback function called before materialbox is opened
      * @prop {Function} onOpenEnd - Callback function called after materialbox is opened
      * @prop {Function} onCloseStart - Callback function called before materialbox is closed
      * @prop {Function} onCloseEnd - Callback function called after materialbox is closed
      */
      _this16.options = $.extend({}, Materialbox.defaults, options);
      _this16.overlayActive = false;
      _this16.doneAnimating = true;
      _this16.placeholder = $('<div></div>').addClass('material-placeholder');
      _this16.originalWidth = 0;
      _this16.originalHeight = 0;
      _this16.originInlineStyles = _this16.$el.attr('style');
      _this16.caption = _this16.el.getAttribute('data-caption') || '';
      // Wrap
      _this16.$el.before(_this16.placeholder);
      _this16.placeholder.append(_this16.$el);
      _this16._setupEventHandlers();
      return _this16;
    }
    _createClass(Materialbox, [{
      key: "destroy",
      /**
      * Teardown component
      */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_Materialbox = undefined;
        // Unwrap image
        $(this.placeholder).after(this.el).remove();
        this.$el.removeAttr('style');
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleMaterialboxClickBound = this._handleMaterialboxClick.bind(this);
        this.el.addEventListener('click', this._handleMaterialboxClickBound);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('click', this._handleMaterialboxClickBound);
      }
    }, {
      key: "_handleMaterialboxClick",
      value: function _handleMaterialboxClick(e) {
        // If already modal, return to original
        if (this.doneAnimating === false || this.overlayActive && this.doneAnimating) {
          this.close();
        } else {
          this.open();
        }
      }
    }, {
      key: "_handleWindowScroll",
      value: function _handleWindowScroll() {
        if (this.overlayActive) {
          this.close();
        }
      }
    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        if (this.overlayActive) {
          this.close();
        }
      }
    }, {
      key: "_handleWindowEscape",
      value: function _handleWindowEscape(e) {
        // ESC key
        if (e.keyCode === 27 && this.doneAnimating && this.overlayActive) {
          this.close();
        }
      }
    }, {
      key: "_makeAncestorsOverflowVisible",
      value: function _makeAncestorsOverflowVisible() {
        this.ancestorsChanged = $();
        var ancestor = this.placeholder[0].parentNode;
        while (ancestor !== null && !$(ancestor).is(document)) {
          var curr = $(ancestor);
          if (curr.css('overflow') !== 'visible') {
            curr.css('overflow', 'visible');
            if (this.ancestorsChanged === undefined) {
              this.ancestorsChanged = curr;
            } else {
              this.ancestorsChanged = this.ancestorsChanged.add(curr);
            }
          }
          ancestor = ancestor.parentNode;
        }
      }
    }, {
      key: "_animateImageIn",
      value: function _animateImageIn() {
        var _this17 = this;
        var animOptions = {
          targets: this.el,
          height: [this.originalHeight, this.newHeight],
          width: [this.originalWidth, this.newWidth],
          left: M.getDocumentScrollLeft() + this.windowWidth / 2 - this.placeholder.offset().left - this.newWidth / 2,
          top: M.getDocumentScrollTop() + this.windowHeight / 2 - this.placeholder.offset().top - this.newHeight / 2,
          duration: this.options.inDuration,
          easing: 'easeOutQuad',
          complete: function () {
            _this17.doneAnimating = true;
            // onOpenEnd callback
            if (typeof _this17.options.onOpenEnd === 'function') {
              _this17.options.onOpenEnd.call(_this17, _this17.el);
            }
          }
        };
        // Override max-width or max-height if needed
        this.maxWidth = this.$el.css('max-width');
        this.maxHeight = this.$el.css('max-height');
        if (this.maxWidth !== 'none') {
          animOptions.maxWidth = this.newWidth;
        }
        if (this.maxHeight !== 'none') {
          animOptions.maxHeight = this.newHeight;
        }
        anim(animOptions);
      }
    }, {
      key: "_animateImageOut",
      value: function _animateImageOut() {
        var _this18 = this;
        var animOptions = {
          targets: this.el,
          width: this.originalWidth,
          height: this.originalHeight,
          left: 0,
          top: 0,
          duration: this.options.outDuration,
          easing: 'easeOutQuad',
          complete: function () {
            _this18.placeholder.css({
              height: '',
              width: '',
              position: '',
              top: '',
              left: ''
            });
            // Revert to width or height attribute
            if (_this18.attrWidth) {
              _this18.$el.attr('width', _this18.attrWidth);
            }
            if (_this18.attrHeight) {
              _this18.$el.attr('height', _this18.attrHeight);
            }
            _this18.$el.removeAttr('style');
            _this18.originInlineStyles && _this18.$el.attr('style', _this18.originInlineStyles);
            // Remove class
            _this18.$el.removeClass('active');
            _this18.doneAnimating = true;
            // Remove overflow overrides on ancestors
            if (_this18.ancestorsChanged.length) {
              _this18.ancestorsChanged.css('overflow', '');
            }
            // onCloseEnd callback
            if (typeof _this18.options.onCloseEnd === 'function') {
              _this18.options.onCloseEnd.call(_this18, _this18.el);
            }
          }
        };
        anim(animOptions);
      }
    }, {
      key: "_updateVars",
      value: function _updateVars() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.caption = this.el.getAttribute('data-caption') || '';
      }
    }, {
      key: "open",
      value: function open() {
        var _this19 = this;
        this._updateVars();
        this.originalWidth = this.el.getBoundingClientRect().width;
        this.originalHeight = this.el.getBoundingClientRect().height;
        // Set states
        this.doneAnimating = false;
        this.$el.addClass('active');
        this.overlayActive = true;
        // onOpenStart callback
        if (typeof this.options.onOpenStart === 'function') {
          this.options.onOpenStart.call(this, this.el);
        }
        // Set positioning for placeholder
        this.placeholder.css({
          width: this.placeholder[0].getBoundingClientRect().width + 'px',
          height: this.placeholder[0].getBoundingClientRect().height + 'px',
          position: 'relative',
          top: 0,
          left: 0
        });
        this._makeAncestorsOverflowVisible();
        // Set css on origin
        this.$el.css({
          position: 'absolute',
          'z-index': 1000,
          'will-change': 'left, top, width, height'
        });
        // Change from width or height attribute to css
        this.attrWidth = this.$el.attr('width');
        this.attrHeight = this.$el.attr('height');
        if (this.attrWidth) {
          this.$el.css('width', this.attrWidth + 'px');
          this.$el.removeAttr('width');
        }
        if (this.attrHeight) {
          this.$el.css('width', this.attrHeight + 'px');
          this.$el.removeAttr('height');
        }
        // Add overlay
        this.$overlay = $('<div id="materialbox-overlay"></div>').css({
          opacity: 0
        }).one('click', function () {
          if (_this19.doneAnimating) {
            _this19.close();
          }
        });
        // Put before in origin image to preserve z-index layering.
        this.$el.before(this.$overlay);
        // Set dimensions if needed
        var overlayOffset = this.$overlay[0].getBoundingClientRect();
        this.$overlay.css({
          width: this.windowWidth + 'px',
          height: this.windowHeight + 'px',
          left: -1 * overlayOffset.left + 'px',
          top: -1 * overlayOffset.top + 'px'
        });
        anim.remove(this.el);
        anim.remove(this.$overlay[0]);
        // Animate Overlay
        anim({
          targets: this.$overlay[0],
          opacity: 1,
          duration: this.options.inDuration,
          easing: 'easeOutQuad'
        });
        // Add and animate caption if it exists
        if (this.caption !== '') {
          if (this.$photocaption) {
            anim.remove(this.$photoCaption[0]);
          }
          this.$photoCaption = $('<div class="materialbox-caption"></div>');
          this.$photoCaption.text(this.caption);
          $('body').append(this.$photoCaption);
          this.$photoCaption.css({
            display: 'inline'
          });
          anim({
            targets: this.$photoCaption[0],
            opacity: 1,
            duration: this.options.inDuration,
            easing: 'easeOutQuad'
          });
        }
        // Resize Image
        var ratio = 0;
        var widthPercent = this.originalWidth / this.windowWidth;
        var heightPercent = this.originalHeight / this.windowHeight;
        this.newWidth = 0;
        this.newHeight = 0;
        if (widthPercent > heightPercent) {
          ratio = this.originalHeight / this.originalWidth;
          this.newWidth = this.windowWidth * 0.9;
          this.newHeight = this.windowWidth * 0.9 * ratio;
        } else {
          ratio = this.originalWidth / this.originalHeight;
          this.newWidth = this.windowHeight * 0.9 * ratio;
          this.newHeight = this.windowHeight * 0.9;
        }
        this._animateImageIn();
        // Handle Exit triggers
        this._handleWindowScrollBound = this._handleWindowScroll.bind(this);
        this._handleWindowResizeBound = this._handleWindowResize.bind(this);
        this._handleWindowEscapeBound = this._handleWindowEscape.bind(this);
        window.addEventListener('scroll', this._handleWindowScrollBound);
        window.addEventListener('resize', this._handleWindowResizeBound);
        window.addEventListener('keyup', this._handleWindowEscapeBound);
      }
    }, {
      key: "close",
      value: function close() {
        var _this20 = this;
        this._updateVars();
        this.doneAnimating = false;
        // onCloseStart callback
        if (typeof this.options.onCloseStart === 'function') {
          this.options.onCloseStart.call(this, this.el);
        }
        anim.remove(this.el);
        anim.remove(this.$overlay[0]);
        if (this.caption !== '') {
          anim.remove(this.$photoCaption[0]);
        }
        // disable exit handlers
        window.removeEventListener('scroll', this._handleWindowScrollBound);
        window.removeEventListener('resize', this._handleWindowResizeBound);
        window.removeEventListener('keyup', this._handleWindowEscapeBound);
        anim({
          targets: this.$overlay[0],
          opacity: 0,
          duration: this.options.outDuration,
          easing: 'easeOutQuad',
          complete: function () {
            _this20.overlayActive = false;
            _this20.$overlay.remove();
          }
        });
        this._animateImageOut();
        // Remove Caption + reset css settings on image
        if (this.caption !== '') {
          anim({
            targets: this.$photoCaption[0],
            opacity: 0,
            duration: this.options.outDuration,
            easing: 'easeOutQuad',
            complete: function () {
              _this20.$photoCaption.remove();
            }
          });
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Materialbox.__proto__ || Object.getPrototypeOf(Materialbox), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Materialbox;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Materialbox;
  })(Component);
  M.Materialbox = Materialbox;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Materialbox, 'materialbox', 'M_Materialbox');
  }
})(cash, M.anime);
;
(function ($) {
  "use strict";
  var _defaults = {
    responsiveThreshold: 0
  };
  var Parallax = (function (_Component5) {
    _inherits(Parallax, _Component5);
    function Parallax(el, options) {
      _classCallCheck(this, Parallax);
      var _this21 = _possibleConstructorReturn(this, (Parallax.__proto__ || Object.getPrototypeOf(Parallax)).call(this, Parallax, el, options));
      _this21.el.M_Parallax = _this21;
      /**
      * Options for the Parallax
      * @member Parallax#options
      * @prop {Number} responsiveThreshold
      */
      _this21.options = $.extend({}, Parallax.defaults, options);
      _this21._enabled = window.innerWidth > _this21.options.responsiveThreshold;
      _this21.$img = _this21.$el.find('img').first();
      _this21.$img.each(function () {
        var el = this;
        if (el.complete) $(el).trigger('load');
      });
      _this21._updateParallax();
      _this21._setupEventHandlers();
      _this21._setupStyles();
      Parallax._parallaxes.push(_this21);
      return _this21;
    }
    _createClass(Parallax, [{
      key: "destroy",
      /**
      * Teardown component
      */
      value: function destroy() {
        Parallax._parallaxes.splice(Parallax._parallaxes.indexOf(this), 1);
        this.$img[0].style.transform = '';
        this._removeEventHandlers();
        this.$el[0].M_Parallax = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleImageLoadBound = this._handleImageLoad.bind(this);
        this.$img[0].addEventListener('load', this._handleImageLoadBound);
        if (Parallax._parallaxes.length === 0) {
          Parallax._handleScrollThrottled = M.throttle(Parallax._handleScroll, 5);
          window.addEventListener('scroll', Parallax._handleScrollThrottled);
          Parallax._handleWindowResizeThrottled = M.throttle(Parallax._handleWindowResize, 5);
          window.addEventListener('resize', Parallax._handleWindowResizeThrottled);
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.$img[0].removeEventListener('load', this._handleImageLoadBound);
        if (Parallax._parallaxes.length === 0) {
          window.removeEventListener('scroll', Parallax._handleScrollThrottled);
          window.removeEventListener('resize', Parallax._handleWindowResizeThrottled);
        }
      }
    }, {
      key: "_setupStyles",
      value: function _setupStyles() {
        this.$img[0].style.opacity = 1;
      }
    }, {
      key: "_handleImageLoad",
      value: function _handleImageLoad() {
        this._updateParallax();
      }
    }, {
      key: "_updateParallax",
      value: function _updateParallax() {
        var containerHeight = this.$el.height() > 0 ? this.el.parentNode.offsetHeight : 500;
        var imgHeight = this.$img[0].offsetHeight;
        var parallaxDist = imgHeight - containerHeight;
        var bottom = this.$el.offset().top + containerHeight;
        var top = this.$el.offset().top;
        var scrollTop = M.getDocumentScrollTop();
        var windowHeight = window.innerHeight;
        var windowBottom = scrollTop + windowHeight;
        var percentScrolled = (windowBottom - top) / (containerHeight + windowHeight);
        var parallax = parallaxDist * percentScrolled;
        if (!this._enabled) {
          this.$img[0].style.transform = '';
        } else if (bottom > scrollTop && top < scrollTop + windowHeight) {
          this.$img[0].style.transform = "translate3D(-50%, " + parallax + "px, 0)";
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Parallax.__proto__ || Object.getPrototypeOf(Parallax), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Parallax;
      }
    }, {
      key: "_handleScroll",
      value: function _handleScroll() {
        for (var i = 0; i < Parallax._parallaxes.length; i++) {
          var parallaxInstance = Parallax._parallaxes[i];
          parallaxInstance._updateParallax.call(parallaxInstance);
        }
      }
    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        for (var i = 0; i < Parallax._parallaxes.length; i++) {
          var parallaxInstance = Parallax._parallaxes[i];
          parallaxInstance._enabled = window.innerWidth > parallaxInstance.options.responsiveThreshold;
        }
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Parallax;
  })(Component);
  /**
  * @static
  * @memberof Parallax
  */
  Parallax._parallaxes = [];
  M.Parallax = Parallax;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Parallax, 'parallax', 'M_Parallax');
  }
})(cash);
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    duration: 300,
    onShow: null,
    swipeable: false,
    responsiveThreshold: Infinity
  };
  /**
  * @class
  *
  */
  var Tabs = (function (_Component6) {
    _inherits(Tabs, _Component6);
    /**
    * Construct Tabs instance
    * @constructor
    * @param {Element} el
    * @param {Object} options
    */
    function Tabs(el, options) {
      _classCallCheck(this, Tabs);
      var _this22 = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, Tabs, el, options));
      _this22.el.M_Tabs = _this22;
      /**
      * Options for the Tabs
      * @member Tabs#options
      * @prop {Number} duration
      * @prop {Function} onShow
      * @prop {Boolean} swipeable
      * @prop {Number} responsiveThreshold
      */
      _this22.options = $.extend({}, Tabs.defaults, options);
      // Setup
      _this22.$tabLinks = _this22.$el.children('li.tab').children('a');
      _this22.index = 0;
      _this22._setupActiveTabLink();
      // Setup tabs content
      if (_this22.options.swipeable) {
        _this22._setupSwipeableTabs();
      } else {
        _this22._setupNormalTabs();
      }
      // Setup tabs indicator after content to ensure accurate widths
      _this22._setTabsAndTabWidth();
      _this22._createIndicator();
      _this22._setupEventHandlers();
      return _this22;
    }
    _createClass(Tabs, [{
      key: "destroy",
      /**
      * Teardown component
      */
      value: function destroy() {
        this._removeEventHandlers();
        this._indicator.parentNode.removeChild(this._indicator);
        if (this.options.swipeable) {
          this._teardownSwipeableTabs();
        } else {
          this._teardownNormalTabs();
        }
        this.$el[0].M_Tabs = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleWindowResizeBound = this._handleWindowResize.bind(this);
        window.addEventListener('resize', this._handleWindowResizeBound);
        this._handleTabClickBound = this._handleTabClick.bind(this);
        this.el.addEventListener('click', this._handleTabClickBound);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        window.removeEventListener('resize', this._handleWindowResizeBound);
        this.el.removeEventListener('click', this._handleTabClickBound);
      }
    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        this._setTabsAndTabWidth();
        if (this.tabWidth !== 0 && this.tabsWidth !== 0) {
          this._indicator.style.left = this._calcLeftPos(this.$activeTabLink) + 'px';
          this._indicator.style.right = this._calcRightPos(this.$activeTabLink) + 'px';
        }
      }
    }, {
      key: "_handleTabClick",
      value: function _handleTabClick(e) {
        var _this23 = this;
        var tab = $(e.target).closest('li.tab');
        var tabLink = $(e.target).closest('a');
        // Handle click on tab link only
        if (!tabLink.length || !tabLink.parent().hasClass('tab')) {
          return;
        }
        if (tab.hasClass('disabled')) {
          e.preventDefault();
          return;
        }
        // Act as regular link if target attribute is specified.
        if (!!tabLink.attr('target')) {
          return;
        }
        // Make the old tab inactive.
        this.$activeTabLink.removeClass('active');
        var $oldContent = this.$content;
        // Update the variables with the new link and content
        this.$activeTabLink = tabLink;
        this.$content = $(M.escapeHash(tabLink[0].hash));
        this.$tabLinks = this.$el.children('li.tab').children('a');
        // Make the tab active.
        this.$activeTabLink.addClass('active');
        var prevIndex = this.index;
        this.index = Math.max(this.$tabLinks.index(tabLink), 0);
        // Swap content
        if (this.options.swipeable) {
          if (this._tabsCarousel) {
            this._tabsCarousel.set(this.index, function () {
              if (typeof _this23.options.onShow === 'function') {
                _this23.options.onShow.call(_this23, _this23.$content[0]);
              }
            });
          }
        } else {
          if (this.$content.length) {
            this.$content[0].style.display = 'block';
            this.$content.addClass('active');
            if (typeof this.options.onShow === 'function') {
              this.options.onShow.call(this, this.$content[0]);
            }
            if ($oldContent.length && !$oldContent.is(this.$content)) {
              $oldContent[0].style.display = 'none';
              $oldContent.removeClass('active');
            }
          }
        }
        // Update widths after content is swapped (scrollbar bugfix)
        this._setTabsAndTabWidth();
        // Update indicator
        this._animateIndicator(prevIndex);
        // Prevent the anchor's default click action
        e.preventDefault();
      }
    }, {
      key: "_createIndicator",
      value: function _createIndicator() {
        var _this24 = this;
        var indicator = document.createElement('li');
        indicator.classList.add('indicator');
        this.el.appendChild(indicator);
        this._indicator = indicator;
        setTimeout(function () {
          _this24._indicator.style.left = _this24._calcLeftPos(_this24.$activeTabLink) + 'px';
          _this24._indicator.style.right = _this24._calcRightPos(_this24.$activeTabLink) + 'px';
        }, 0);
      }
    }, {
      key: "_setupActiveTabLink",
      value: function _setupActiveTabLink() {
        // If the location.hash matches one of the links, use that as the active tab.
        this.$activeTabLink = $(this.$tabLinks.filter('[href="' + location.hash + '"]'));
        // If no match is found, use the first link or any with class 'active' as the initial active tab.
        if (this.$activeTabLink.length === 0) {
          this.$activeTabLink = this.$el.children('li.tab').children('a.active').first();
        }
        if (this.$activeTabLink.length === 0) {
          this.$activeTabLink = this.$el.children('li.tab').children('a').first();
        }
        this.$tabLinks.removeClass('active');
        this.$activeTabLink[0].classList.add('active');
        this.index = Math.max(this.$tabLinks.index(this.$activeTabLink), 0);
        if (this.$activeTabLink.length) {
          this.$content = $(M.escapeHash(this.$activeTabLink[0].hash));
          this.$content.addClass('active');
        }
      }
    }, {
      key: "_setupSwipeableTabs",
      value: function _setupSwipeableTabs() {
        var _this25 = this;
        // Change swipeable according to responsive threshold
        if (window.innerWidth > this.options.responsiveThreshold) {
          this.options.swipeable = false;
        }
        var $tabsContent = $();
        this.$tabLinks.each(function (link) {
          var $currContent = $(M.escapeHash(link.hash));
          $currContent.addClass('carousel-item');
          $tabsContent = $tabsContent.add($currContent);
        });
        var $tabsWrapper = $('<div class="tabs-content carousel carousel-slider"></div>');
        $tabsContent.first().before($tabsWrapper);
        $tabsWrapper.append($tabsContent);
        $tabsContent[0].style.display = '';
        // Keep active tab index to set initial carousel slide
        var activeTabIndex = this.$activeTabLink.closest('.tab').index();
        this._tabsCarousel = M.Carousel.init($tabsWrapper[0], {
          fullWidth: true,
          noWrap: true,
          onCycleTo: function (item) {
            var prevIndex = _this25.index;
            _this25.index = $(item).index();
            _this25.$activeTabLink.removeClass('active');
            _this25.$activeTabLink = _this25.$tabLinks.eq(_this25.index);
            _this25.$activeTabLink.addClass('active');
            _this25._animateIndicator(prevIndex);
            if (typeof _this25.options.onShow === 'function') {
              _this25.options.onShow.call(_this25, _this25.$content[0]);
            }
          }
        });
        // Set initial carousel slide to active tab
        this._tabsCarousel.set(activeTabIndex);
      }
    }, {
      key: "_teardownSwipeableTabs",
      value: function _teardownSwipeableTabs() {
        var $tabsWrapper = this._tabsCarousel.$el;
        this._tabsCarousel.destroy();
        // Unwrap
        $tabsWrapper.after($tabsWrapper.children());
        $tabsWrapper.remove();
      }
    }, {
      key: "_setupNormalTabs",
      value: function _setupNormalTabs() {
        // Hide Tabs Content
        this.$tabLinks.not(this.$activeTabLink).each(function (link) {
          if (!!link.hash) {
            var $currContent = $(M.escapeHash(link.hash));
            if ($currContent.length) {
              $currContent[0].style.display = 'none';
            }
          }
        });
      }
    }, {
      key: "_teardownNormalTabs",
      value: function _teardownNormalTabs() {
        // show Tabs Content
        this.$tabLinks.each(function (link) {
          if (!!link.hash) {
            var $currContent = $(M.escapeHash(link.hash));
            if ($currContent.length) {
              $currContent[0].style.display = '';
            }
          }
        });
      }
    }, {
      key: "_setTabsAndTabWidth",
      value: function _setTabsAndTabWidth() {
        this.tabsWidth = this.$el.width();
        this.tabWidth = Math.max(this.tabsWidth, this.el.scrollWidth) / this.$tabLinks.length;
      }
    }, {
      key: "_calcRightPos",
      value: function _calcRightPos(el) {
        return Math.ceil(this.tabsWidth - el.position().left - el[0].getBoundingClientRect().width);
      }
    }, {
      key: "_calcLeftPos",
      value: function _calcLeftPos(el) {
        return Math.floor(el.position().left);
      }
    }, {
      key: "updateTabIndicator",
      value: function updateTabIndicator() {
        this._setTabsAndTabWidth();
        this._animateIndicator(this.index);
      }
    }, {
      key: "_animateIndicator",
      value: function _animateIndicator(prevIndex) {
        var leftDelay = 0, rightDelay = 0;
        if (this.index - prevIndex >= 0) {
          leftDelay = 90;
        } else {
          rightDelay = 90;
        }
        // Animate
        var animOptions = {
          targets: this._indicator,
          left: {
            value: this._calcLeftPos(this.$activeTabLink),
            delay: leftDelay
          },
          right: {
            value: this._calcRightPos(this.$activeTabLink),
            delay: rightDelay
          },
          duration: this.options.duration,
          easing: 'easeOutQuad'
        };
        anim.remove(this._indicator);
        anim(animOptions);
      }
    }, {
      key: "select",
      value: function select(tabId) {
        var tab = this.$tabLinks.filter('[href="#' + tabId + '"]');
        if (tab.length) {
          tab.trigger('click');
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Tabs.__proto__ || Object.getPrototypeOf(Tabs), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Tabs;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Tabs;
  })(Component);
  M.Tabs = Tabs;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Tabs, 'tabs', 'M_Tabs');
  }
})(cash, M.anime);
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    exitDelay: 200,
    enterDelay: 0,
    html: null,
    margin: 5,
    inDuration: 250,
    outDuration: 200,
    position: 'bottom',
    transitionMovement: 10
  };
  /**
  * @class
  *
  */
  var Tooltip = (function (_Component7) {
    _inherits(Tooltip, _Component7);
    /**
    * Construct Tooltip instance
    * @constructor
    * @param {Element} el
    * @param {Object} options
    */
    function Tooltip(el, options) {
      _classCallCheck(this, Tooltip);
      var _this26 = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, Tooltip, el, options));
      _this26.el.M_Tooltip = _this26;
      _this26.options = $.extend({}, Tooltip.defaults, options);
      _this26.isOpen = false;
      _this26.isHovered = false;
      _this26.isFocused = false;
      _this26._appendTooltipEl();
      _this26._setupEventHandlers();
      return _this26;
    }
    _createClass(Tooltip, [{
      key: "destroy",
      /**
      * Teardown component
      */
      value: function destroy() {
        $(this.tooltipEl).remove();
        this._removeEventHandlers();
        this.el.M_Tooltip = undefined;
      }
    }, {
      key: "_appendTooltipEl",
      value: function _appendTooltipEl() {
        var tooltipEl = document.createElement('div');
        tooltipEl.classList.add('material-tooltip');
        this.tooltipEl = tooltipEl;
        var tooltipContentEl = document.createElement('div');
        tooltipContentEl.classList.add('tooltip-content');
        tooltipContentEl.innerHTML = this.options.html;
        tooltipEl.appendChild(tooltipContentEl);
        document.body.appendChild(tooltipEl);
      }
    }, {
      key: "_updateTooltipContent",
      value: function _updateTooltipContent() {
        this.tooltipEl.querySelector('.tooltip-content').innerHTML = this.options.html;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleMouseEnterBound = this._handleMouseEnter.bind(this);
        this._handleMouseLeaveBound = this._handleMouseLeave.bind(this);
        this._handleFocusBound = this._handleFocus.bind(this);
        this._handleBlurBound = this._handleBlur.bind(this);
        this.el.addEventListener('mouseenter', this._handleMouseEnterBound);
        this.el.addEventListener('mouseleave', this._handleMouseLeaveBound);
        this.el.addEventListener('focus', this._handleFocusBound, true);
        this.el.addEventListener('blur', this._handleBlurBound, true);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('mouseenter', this._handleMouseEnterBound);
        this.el.removeEventListener('mouseleave', this._handleMouseLeaveBound);
        this.el.removeEventListener('focus', this._handleFocusBound, true);
        this.el.removeEventListener('blur', this._handleBlurBound, true);
      }
    }, {
      key: "open",
      value: function open(isManual) {
        if (this.isOpen) {
          return;
        }
        isManual = isManual === undefined ? true : undefined;
        // Default value true
        this.isOpen = true;
        // Update tooltip content with HTML attribute options
        this.options = $.extend({}, this.options, this._getAttributeOptions());
        this._updateTooltipContent();
        this._setEnterDelayTimeout(isManual);
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        this.isHovered = false;
        this.isFocused = false;
        this.isOpen = false;
        this._setExitDelayTimeout();
      }
    }, {
      key: "_setExitDelayTimeout",
      value: function _setExitDelayTimeout() {
        var _this27 = this;
        clearTimeout(this._exitDelayTimeout);
        this._exitDelayTimeout = setTimeout(function () {
          if (_this27.isHovered || _this27.isFocused) {
            return;
          }
          _this27._animateOut();
        }, this.options.exitDelay);
      }
    }, {
      key: "_setEnterDelayTimeout",
      value: function _setEnterDelayTimeout(isManual) {
        var _this28 = this;
        clearTimeout(this._enterDelayTimeout);
        this._enterDelayTimeout = setTimeout(function () {
          if (!_this28.isHovered && !_this28.isFocused && !isManual) {
            return;
          }
          _this28._animateIn();
        }, this.options.enterDelay);
      }
    }, {
      key: "_positionTooltip",
      value: function _positionTooltip() {
        var origin = this.el, tooltip = this.tooltipEl, originHeight = origin.offsetHeight, originWidth = origin.offsetWidth, tooltipHeight = tooltip.offsetHeight, tooltipWidth = tooltip.offsetWidth, newCoordinates = void 0, margin = this.options.margin, targetTop = void 0, targetLeft = void 0;
        (this.xMovement = 0, this.yMovement = 0);
        targetTop = origin.getBoundingClientRect().top + M.getDocumentScrollTop();
        targetLeft = origin.getBoundingClientRect().left + M.getDocumentScrollLeft();
        if (this.options.position === 'top') {
          targetTop += -tooltipHeight - margin;
          targetLeft += originWidth / 2 - tooltipWidth / 2;
          this.yMovement = -this.options.transitionMovement;
        } else if (this.options.position === 'right') {
          targetTop += originHeight / 2 - tooltipHeight / 2;
          targetLeft += originWidth + margin;
          this.xMovement = this.options.transitionMovement;
        } else if (this.options.position === 'left') {
          targetTop += originHeight / 2 - tooltipHeight / 2;
          targetLeft += -tooltipWidth - margin;
          this.xMovement = -this.options.transitionMovement;
        } else {
          targetTop += originHeight + margin;
          targetLeft += originWidth / 2 - tooltipWidth / 2;
          this.yMovement = this.options.transitionMovement;
        }
        newCoordinates = this._repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
        $(tooltip).css({
          top: newCoordinates.y + 'px',
          left: newCoordinates.x + 'px'
        });
      }
    }, {
      key: "_repositionWithinScreen",
      value: function _repositionWithinScreen(x, y, width, height) {
        var scrollLeft = M.getDocumentScrollLeft();
        var scrollTop = M.getDocumentScrollTop();
        var newX = x - scrollLeft;
        var newY = y - scrollTop;
        var bounding = {
          left: newX,
          top: newY,
          width: width,
          height: height
        };
        var offset = this.options.margin + this.options.transitionMovement;
        var edges = M.checkWithinContainer(document.body, bounding, offset);
        if (edges.left) {
          newX = offset;
        } else if (edges.right) {
          newX -= newX + width - window.innerWidth;
        }
        if (edges.top) {
          newY = offset;
        } else if (edges.bottom) {
          newY -= newY + height - window.innerHeight;
        }
        return {
          x: newX + scrollLeft,
          y: newY + scrollTop
        };
      }
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        this._positionTooltip();
        this.tooltipEl.style.visibility = 'visible';
        anim.remove(this.tooltipEl);
        anim({
          targets: this.tooltipEl,
          opacity: 1,
          translateX: this.xMovement,
          translateY: this.yMovement,
          duration: this.options.inDuration,
          easing: 'easeOutCubic'
        });
      }
    }, {
      key: "_animateOut",
      value: function _animateOut() {
        anim.remove(this.tooltipEl);
        anim({
          targets: this.tooltipEl,
          opacity: 0,
          translateX: 0,
          translateY: 0,
          duration: this.options.outDuration,
          easing: 'easeOutCubic'
        });
      }
    }, {
      key: "_handleMouseEnter",
      value: function _handleMouseEnter() {
        this.isHovered = true;
        this.isFocused = false;
        // Allows close of tooltip when opened by focus.
        this.open(false);
      }
    }, {
      key: "_handleMouseLeave",
      value: function _handleMouseLeave() {
        this.isHovered = false;
        this.isFocused = false;
        // Allows close of tooltip when opened by focus.
        this.close();
      }
    }, {
      key: "_handleFocus",
      value: function _handleFocus() {
        if (M.tabPressed) {
          this.isFocused = true;
          this.open(false);
        }
      }
    }, {
      key: "_handleBlur",
      value: function _handleBlur() {
        this.isFocused = false;
        this.close();
      }
    }, {
      key: "_getAttributeOptions",
      value: function _getAttributeOptions() {
        var attributeOptions = {};
        var tooltipTextOption = this.el.getAttribute('data-tooltip');
        var positionOption = this.el.getAttribute('data-position');
        if (tooltipTextOption) {
          attributeOptions.html = tooltipTextOption;
        }
        if (positionOption) {
          attributeOptions.position = positionOption;
        }
        return attributeOptions;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Tooltip.__proto__ || Object.getPrototypeOf(Tooltip), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Tooltip;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Tooltip;
  })(Component);
  M.Tooltip = Tooltip;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Tooltip, 'tooltip', 'M_Tooltip');
  }
})(cash, M.anime);
;
/*!
* Waves v0.6.4
* http://fian.my.id/Waves
*
* Copyright 2014 Alfiana E. Sibuea and other contributors
* Released under the MIT license
* https://github.com/fians/Waves/blob/master/LICENSE
*/
;
(function (window) {
  "use strict";
  var Waves = Waves || ({});
  var $$ = document.querySelectorAll.bind(document);
  // Find exact position of element
  function isWindow(obj) {
    return obj !== null && obj === obj.window;
  }
  function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }
  function offset(elem) {
    var docElem, win, box = {
      top: 0,
      left: 0
    }, doc = elem && elem.ownerDocument;
    docElem = doc.documentElement;
    if (typeof elem.getBoundingClientRect !== typeof undefined) {
      box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  }
  function convertStyle(obj) {
    var style = '';
    for (var a in obj) {
      if (obj.hasOwnProperty(a)) {
        style += a + ':' + obj[a] + ';';
      }
    }
    return style;
  }
  var Effect = {
    // Effect delay
    duration: 750,
    show: function (e, element) {
      // Disable right click
      if (e.button === 2) {
        return false;
      }
      var el = element || this;
      // Create ripple
      var ripple = document.createElement('div');
      ripple.className = 'waves-ripple';
      el.appendChild(ripple);
      // Get click coordinate and element witdh
      var pos = offset(el);
      var relativeY = e.pageY - pos.top;
      var relativeX = e.pageX - pos.left;
      var scale = 'scale(' + el.clientWidth / 100 * 10 + ')';
      // Support for touch devices
      if (('touches' in e)) {
        relativeY = e.touches[0].pageY - pos.top;
        relativeX = e.touches[0].pageX - pos.left;
      }
      // Attach data to element
      ripple.setAttribute('data-hold', Date.now());
      ripple.setAttribute('data-scale', scale);
      ripple.setAttribute('data-x', relativeX);
      ripple.setAttribute('data-y', relativeY);
      // Set ripple position
      var rippleStyle = {
        'top': relativeY + 'px',
        'left': relativeX + 'px'
      };
      ripple.className = ripple.className + ' waves-notransition';
      ripple.setAttribute('style', convertStyle(rippleStyle));
      ripple.className = ripple.className.replace('waves-notransition', '');
      // Scale the ripple
      rippleStyle['-webkit-transform'] = scale;
      rippleStyle['-moz-transform'] = scale;
      rippleStyle['-ms-transform'] = scale;
      rippleStyle['-o-transform'] = scale;
      rippleStyle.transform = scale;
      rippleStyle.opacity = '1';
      rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['-moz-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['-o-transition-duration'] = Effect.duration + 'ms';
      rippleStyle['transition-duration'] = Effect.duration + 'ms';
      rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['-moz-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['-o-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      rippleStyle['transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
      ripple.setAttribute('style', convertStyle(rippleStyle));
    },
    hide: function (e) {
      TouchHandler.touchup(e);
      var el = this;
      var width = el.clientWidth * 1.4;
      // Get first ripple
      var ripple = null;
      var ripples = el.getElementsByClassName('waves-ripple');
      if (ripples.length > 0) {
        ripple = ripples[ripples.length - 1];
      } else {
        return false;
      }
      var relativeX = ripple.getAttribute('data-x');
      var relativeY = ripple.getAttribute('data-y');
      var scale = ripple.getAttribute('data-scale');
      // Get delay beetween mousedown and mouse leave
      var diff = Date.now() - Number(ripple.getAttribute('data-hold'));
      var delay = 350 - diff;
      if (delay < 0) {
        delay = 0;
      }
      // Fade out ripple after delay
      setTimeout(function () {
        var style = {
          'top': relativeY + 'px',
          'left': relativeX + 'px',
          'opacity': '0',
          // Duration
          '-webkit-transition-duration': Effect.duration + 'ms',
          '-moz-transition-duration': Effect.duration + 'ms',
          '-o-transition-duration': Effect.duration + 'ms',
          'transition-duration': Effect.duration + 'ms',
          '-webkit-transform': scale,
          '-moz-transform': scale,
          '-ms-transform': scale,
          '-o-transform': scale,
          'transform': scale
        };
        ripple.setAttribute('style', convertStyle(style));
        setTimeout(function () {
          try {
            el.removeChild(ripple);
          } catch (e) {
            return false;
          }
        }, Effect.duration);
      }, delay);
    },
    // Little hack to make <input> can perform waves effect
    wrapInput: function (elements) {
      for (var a = 0; a < elements.length; a++) {
        var el = elements[a];
        if (el.tagName.toLowerCase() === 'input') {
          var parent = el.parentNode;
          // If input already have parent just pass through
          if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('waves-effect') !== -1) {
            continue;
          }
          // Put element class and style to the specified parent
          var wrapper = document.createElement('i');
          wrapper.className = el.className + ' waves-input-wrapper';
          var elementStyle = el.getAttribute('style');
          if (!elementStyle) {
            elementStyle = '';
          }
          wrapper.setAttribute('style', elementStyle);
          el.className = 'waves-button-input';
          el.removeAttribute('style');
          // Put element as child
          parent.replaceChild(wrapper, el);
          wrapper.appendChild(el);
        }
      }
    }
  };
  /**
  * Disable mousedown event for 500ms during and after touch
  */
  var TouchHandler = {
    /*uses an integer rather than bool so there's no issues with
    * needing to clear timeouts if another touch event occurred
    * within the 500ms. Cannot mouseup between touchstart and
    * touchend, nor in the 500ms after touchend.*/
    touches: 0,
    allowEvent: function (e) {
      var allow = true;
      if (e.type === 'touchstart') {
        TouchHandler.touches += 1;
      } else if (e.type === 'touchend' || e.type === 'touchcancel') {
        setTimeout(function () {
          if (TouchHandler.touches > 0) {
            TouchHandler.touches -= 1;
          }
        }, 500);
      } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
        allow = false;
      }
      return allow;
    },
    touchup: function (e) {
      TouchHandler.allowEvent(e);
    }
  };
  /**
  * Delegated click handler for .waves-effect element.
  * returns null when .waves-effect element not in "click tree"
  */
  function getWavesEffectElement(e) {
    if (TouchHandler.allowEvent(e) === false) {
      return null;
    }
    var element = null;
    var target = e.target || e.srcElement;
    while (target.parentNode !== null) {
      if (!(target instanceof SVGElement) && target.className.indexOf('waves-effect') !== -1) {
        element = target;
        break;
      }
      target = target.parentNode;
    }
    return element;
  }
  /**
  * Bubble the click and show effect if .waves-effect elem was found
  */
  function showEffect(e) {
    var element = getWavesEffectElement(e);
    if (element !== null) {
      Effect.show(e, element);
      if (('ontouchstart' in window)) {
        element.addEventListener('touchend', Effect.hide, false);
        element.addEventListener('touchcancel', Effect.hide, false);
      }
      element.addEventListener('mouseup', Effect.hide, false);
      element.addEventListener('mouseleave', Effect.hide, false);
      element.addEventListener('dragend', Effect.hide, false);
    }
  }
  Waves.displayEffect = function (options) {
    options = options || ({});
    if (('duration' in options)) {
      Effect.duration = options.duration;
    }
    // Wrap input inside <i> tag
    Effect.wrapInput($$('.waves-effect'));
    if (('ontouchstart' in window)) {
      document.body.addEventListener('touchstart', showEffect, false);
    }
    document.body.addEventListener('mousedown', showEffect, false);
  };
  /**
  * Attach Waves to an input element (or any element which doesn't
  * bubble mouseup/mousedown events).
  *   Intended to be used with dynamically loaded forms/inputs, or
  * where the user doesn't want a delegated click handler.
  */
  Waves.attach = function (element) {
    // FUTURE: automatically add waves classes and allow users
    // to specify them with an options param? Eg. light/classic/button
    if (element.tagName.toLowerCase() === 'input') {
      Effect.wrapInput([element]);
      element = element.parentNode;
    }
    if (('ontouchstart' in window)) {
      element.addEventListener('touchstart', showEffect, false);
    }
    element.addEventListener('mousedown', showEffect, false);
  };
  window.Waves = Waves;
  document.addEventListener('DOMContentLoaded', function () {
    Waves.displayEffect();
  }, false);
})(window);
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    html: '',
    displayLength: 4000,
    inDuration: 300,
    outDuration: 375,
    classes: '',
    completeCallback: null,
    activationPercent: 0.8
  };
  var Toast = (function () {
    function Toast(options) {
      _classCallCheck(this, Toast);
      /**
      * Options for the toast
      * @member Toast#options
      */
      this.options = $.extend({}, Toast.defaults, options);
      this.message = this.options.html;
      /**
      * Describes current pan state toast
      * @type {Boolean}
      */
      this.panning = false;
      /**
      * Time remaining until toast is removed
      */
      this.timeRemaining = this.options.displayLength;
      if (Toast._toasts.length === 0) {
        Toast._createContainer();
      }
      // Create new toast
      Toast._toasts.push(this);
      var toastElement = this._createToast();
      toastElement.M_Toast = this;
      this.el = toastElement;
      this.$el = $(toastElement);
      this._animateIn();
      this._setTimer();
    }
    _createClass(Toast, [{
      key: "_createToast",
      /**
      * Create toast and append it to toast container
      */
      value: function _createToast() {
        var toast = document.createElement('div');
        toast.classList.add('toast');
        // Add custom classes onto toast
        if (!!this.options.classes.length) {
          $(toast).addClass(this.options.classes);
        }
        // Set content
        if (typeof HTMLElement === 'object' ? this.message instanceof HTMLElement : this.message && typeof this.message === 'object' && this.message !== null && this.message.nodeType === 1 && typeof this.message.nodeName === 'string') {
          toast.appendChild(this.message);
        } else if (!!this.message.jquery) {
          $(toast).append(this.message[0]);
        } else {
          toast.innerHTML = this.message;
        }
        // Append toasft
        Toast._container.appendChild(toast);
        return toast;
      }
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        // Animate toast in
        anim({
          targets: this.el,
          top: 0,
          opacity: 1,
          duration: this.options.inDuration,
          easing: 'easeOutCubic'
        });
      }
    }, {
      key: "_setTimer",
      value: function _setTimer() {
        var _this29 = this;
        if (this.timeRemaining !== Infinity) {
          this.counterInterval = setInterval(function () {
            // If toast is not being dragged, decrease its time remaining
            if (!_this29.panning) {
              _this29.timeRemaining -= 20;
            }
            // Animate toast out
            if (_this29.timeRemaining <= 0) {
              _this29.dismiss();
            }
          }, 20);
        }
      }
    }, {
      key: "dismiss",
      value: function dismiss() {
        var _this30 = this;
        window.clearInterval(this.counterInterval);
        var activationDistance = this.el.offsetWidth * this.options.activationPercent;
        if (this.wasSwiped) {
          this.el.style.transition = 'transform .05s, opacity .05s';
          this.el.style.transform = "translateX(" + activationDistance + "px)";
          this.el.style.opacity = 0;
        }
        anim({
          targets: this.el,
          opacity: 0,
          marginTop: -40,
          duration: this.options.outDuration,
          easing: 'easeOutExpo',
          complete: function () {
            // Call the optional callback
            if (typeof _this30.options.completeCallback === 'function') {
              _this30.options.completeCallback();
            }
            // Remove toast from DOM
            _this30.$el.remove();
            Toast._toasts.splice(Toast._toasts.indexOf(_this30), 1);
            if (Toast._toasts.length === 0) {
              Toast._removeContainer();
            }
          }
        });
      }
    }], [{
      key: "getInstance",
      /**
      * Get Instance
      */
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Toast;
      }
    }, {
      key: "_createContainer",
      value: function _createContainer() {
        var container = document.createElement('div');
        container.setAttribute('id', 'toast-container');
        // Add event handler
        container.addEventListener('touchstart', Toast._onDragStart);
        container.addEventListener('touchmove', Toast._onDragMove);
        container.addEventListener('touchend', Toast._onDragEnd);
        container.addEventListener('mousedown', Toast._onDragStart);
        document.addEventListener('mousemove', Toast._onDragMove);
        document.addEventListener('mouseup', Toast._onDragEnd);
        document.body.appendChild(container);
        Toast._container = container;
      }
    }, {
      key: "_removeContainer",
      value: function _removeContainer() {
        // Add event handler
        document.removeEventListener('mousemove', Toast._onDragMove);
        document.removeEventListener('mouseup', Toast._onDragEnd);
        $(Toast._container).remove();
        Toast._container = null;
      }
    }, {
      key: "_onDragStart",
      value: function _onDragStart(e) {
        if (e.target && $(e.target).closest('.toast').length) {
          var $toast = $(e.target).closest('.toast');
          var toast = $toast[0].M_Toast;
          toast.panning = true;
          Toast._draggedToast = toast;
          toast.el.classList.add('panning');
          toast.el.style.transition = '';
          toast.startingXPos = Toast._xPos(e);
          toast.time = Date.now();
          toast.xPos = Toast._xPos(e);
        }
      }
    }, {
      key: "_onDragMove",
      value: function _onDragMove(e) {
        if (!!Toast._draggedToast) {
          e.preventDefault();
          var toast = Toast._draggedToast;
          toast.deltaX = Math.abs(toast.xPos - Toast._xPos(e));
          toast.xPos = Toast._xPos(e);
          toast.velocityX = toast.deltaX / (Date.now() - toast.time);
          toast.time = Date.now();
          var totalDeltaX = toast.xPos - toast.startingXPos;
          var activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
          toast.el.style.transform = "translateX(" + totalDeltaX + "px)";
          toast.el.style.opacity = 1 - Math.abs(totalDeltaX / activationDistance);
        }
      }
    }, {
      key: "_onDragEnd",
      value: function _onDragEnd() {
        if (!!Toast._draggedToast) {
          var toast = Toast._draggedToast;
          toast.panning = false;
          toast.el.classList.remove('panning');
          var totalDeltaX = toast.xPos - toast.startingXPos;
          var activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
          var shouldBeDismissed = Math.abs(totalDeltaX) > activationDistance || toast.velocityX > 1;
          // Remove toast
          if (shouldBeDismissed) {
            toast.wasSwiped = true;
            toast.dismiss();
          } else {
            toast.el.style.transition = 'transform .2s, opacity .2s';
            toast.el.style.transform = '';
            toast.el.style.opacity = '';
          }
          Toast._draggedToast = null;
        }
      }
    }, {
      key: "_xPos",
      value: function _xPos(e) {
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return e.targetTouches[0].clientX;
        }
        // mouse event
        return e.clientX;
      }
    }, {
      key: "dismissAll",
      value: function dismissAll() {
        for (var toastIndex in Toast._toasts) {
          Toast._toasts[toastIndex].dismiss();
        }
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Toast;
  })();
  /**
  * @static
  * @memberof Toast
  * @type {Array.<Toast>}
  */
  Toast._toasts = [];
  /**
  * @static
  * @memberof Toast
  */
  Toast._container = null;
  /**
  * @static
  * @memberof Toast
  * @type {Toast}
  */
  Toast._draggedToast = null;
  M.Toast = Toast;
  M.toast = function (options) {
    return new Toast(options);
  };
})(cash, M.anime);
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    edge: 'left',
    draggable: true,
    inDuration: 250,
    outDuration: 200,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    preventScrolling: true
  };
  /**
  * @class
  */
  var Sidenav = (function (_Component8) {
    _inherits(Sidenav, _Component8);
    /**
    * Construct Sidenav instance and set up overlay
    * @constructor
    * @param {Element} el
    * @param {Object} options
    */
    function Sidenav(el, options) {
      _classCallCheck(this, Sidenav);
      var _this31 = _possibleConstructorReturn(this, (Sidenav.__proto__ || Object.getPrototypeOf(Sidenav)).call(this, Sidenav, el, options));
      _this31.el.M_Sidenav = _this31;
      _this31.id = _this31.$el.attr('id');
      /**
      * Options for the Sidenav
      * @member Sidenav#options
      * @prop {String} [edge='left'] - Side of screen on which Sidenav appears
      * @prop {Boolean} [draggable=true] - Allow swipe gestures to open/close Sidenav
      * @prop {Number} [inDuration=250] - Length in ms of enter transition
      * @prop {Number} [outDuration=200] - Length in ms of exit transition
      * @prop {Function} onOpenStart - Function called when sidenav starts entering
      * @prop {Function} onOpenEnd - Function called when sidenav finishes entering
      * @prop {Function} onCloseStart - Function called when sidenav starts exiting
      * @prop {Function} onCloseEnd - Function called when sidenav finishes exiting
      */
      _this31.options = $.extend({}, Sidenav.defaults, options);
      /**
      * Describes open/close state of Sidenav
      * @type {Boolean}
      */
      _this31.isOpen = false;
      /**
      * Describes if Sidenav is fixed
      * @type {Boolean}
      */
      _this31.isFixed = _this31.el.classList.contains('sidenav-fixed');
      /**
      * Describes if Sidenav is being draggeed
      * @type {Boolean}
      */
      _this31.isDragged = false;
      // Window size variables for window resize checks
      _this31.lastWindowWidth = window.innerWidth;
      _this31.lastWindowHeight = window.innerHeight;
      _this31._createOverlay();
      _this31._createDragTarget();
      _this31._setupEventHandlers();
      _this31._setupClasses();
      _this31._setupFixed();
      Sidenav._sidenavs.push(_this31);
      return _this31;
    }
    _createClass(Sidenav, [{
      key: "destroy",
      /**
      * Teardown component
      */
      value: function destroy() {
        this._removeEventHandlers();
        this._enableBodyScrolling();
        this._overlay.parentNode.removeChild(this._overlay);
        this.dragTarget.parentNode.removeChild(this.dragTarget);
        this.el.M_Sidenav = undefined;
        this.el.style.transform = '';
        var index = Sidenav._sidenavs.indexOf(this);
        if (index >= 0) {
          Sidenav._sidenavs.splice(index, 1);
        }
      }
    }, {
      key: "_createOverlay",
      value: function _createOverlay() {
        var overlay = document.createElement('div');
        this._closeBound = this.close.bind(this);
        overlay.classList.add('sidenav-overlay');
        overlay.addEventListener('click', this._closeBound);
        document.body.appendChild(overlay);
        this._overlay = overlay;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        if (Sidenav._sidenavs.length === 0) {
          document.body.addEventListener('click', this._handleTriggerClick);
        }
        this._handleDragTargetDragBound = this._handleDragTargetDrag.bind(this);
        this._handleDragTargetReleaseBound = this._handleDragTargetRelease.bind(this);
        this._handleCloseDragBound = this._handleCloseDrag.bind(this);
        this._handleCloseReleaseBound = this._handleCloseRelease.bind(this);
        this._handleCloseTriggerClickBound = this._handleCloseTriggerClick.bind(this);
        this.dragTarget.addEventListener('touchmove', this._handleDragTargetDragBound);
        this.dragTarget.addEventListener('touchend', this._handleDragTargetReleaseBound);
        this._overlay.addEventListener('touchmove', this._handleCloseDragBound);
        this._overlay.addEventListener('touchend', this._handleCloseReleaseBound);
        this.el.addEventListener('touchmove', this._handleCloseDragBound);
        this.el.addEventListener('touchend', this._handleCloseReleaseBound);
        this.el.addEventListener('click', this._handleCloseTriggerClickBound);
        // Add resize for side nav fixed
        if (this.isFixed) {
          this._handleWindowResizeBound = this._handleWindowResize.bind(this);
          window.addEventListener('resize', this._handleWindowResizeBound);
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (Sidenav._sidenavs.length === 1) {
          document.body.removeEventListener('click', this._handleTriggerClick);
        }
        this.dragTarget.removeEventListener('touchmove', this._handleDragTargetDragBound);
        this.dragTarget.removeEventListener('touchend', this._handleDragTargetReleaseBound);
        this._overlay.removeEventListener('touchmove', this._handleCloseDragBound);
        this._overlay.removeEventListener('touchend', this._handleCloseReleaseBound);
        this.el.removeEventListener('touchmove', this._handleCloseDragBound);
        this.el.removeEventListener('touchend', this._handleCloseReleaseBound);
        this.el.removeEventListener('click', this._handleCloseTriggerClickBound);
        // Remove resize for side nav fixed
        if (this.isFixed) {
          window.removeEventListener('resize', this._handleWindowResizeBound);
        }
      }
    }, {
      key: "_handleTriggerClick",
      value: function _handleTriggerClick(e) {
        var $trigger = $(e.target).closest('.sidenav-trigger');
        if (e.target && $trigger.length) {
          var sidenavId = M.getIdFromTrigger($trigger[0]);
          var sidenavInstance = document.getElementById(sidenavId).M_Sidenav;
          if (sidenavInstance) {
            sidenavInstance.open($trigger);
          }
          e.preventDefault();
        }
      }
    }, {
      key: "_startDrag",
      value: function _startDrag(e) {
        var clientX = e.targetTouches[0].clientX;
        this.isDragged = true;
        this._startingXpos = clientX;
        this._xPos = this._startingXpos;
        this._time = Date.now();
        this._width = this.el.getBoundingClientRect().width;
        this._overlay.style.display = 'block';
        this._initialScrollTop = this.isOpen ? this.el.scrollTop : M.getDocumentScrollTop();
        this._verticallyScrolling = false;
        anim.remove(this.el);
        anim.remove(this._overlay);
      }
    }, {
      key: "_dragMoveUpdate",
      value: function _dragMoveUpdate(e) {
        var clientX = e.targetTouches[0].clientX;
        var currentScrollTop = this.isOpen ? this.el.scrollTop : M.getDocumentScrollTop();
        this.deltaX = Math.abs(this._xPos - clientX);
        this._xPos = clientX;
        this.velocityX = this.deltaX / (Date.now() - this._time);
        this._time = Date.now();
        if (this._initialScrollTop !== currentScrollTop) {
          this._verticallyScrolling = true;
        }
      }
    }, {
      key: "_handleDragTargetDrag",
      value: function _handleDragTargetDrag(e) {
        // Check if draggable
        if (!this.options.draggable || this._isCurrentlyFixed() || this._verticallyScrolling) {
          return;
        }
        // If not being dragged, set initial drag start variables
        if (!this.isDragged) {
          this._startDrag(e);
        }
        // Run touchmove updates
        this._dragMoveUpdate(e);
        // Calculate raw deltaX
        var totalDeltaX = this._xPos - this._startingXpos;
        // dragDirection is the attempted user drag direction
        var dragDirection = totalDeltaX > 0 ? 'right' : 'left';
        // Don't allow totalDeltaX to exceed Sidenav width or be dragged in the opposite direction
        totalDeltaX = Math.min(this._width, Math.abs(totalDeltaX));
        if (this.options.edge === dragDirection) {
          totalDeltaX = 0;
        }
        /**
        * transformX is the drag displacement
        * transformPrefix is the initial transform placement
        * Invert values if Sidenav is right edge
        */
        var transformX = totalDeltaX;
        var transformPrefix = 'translateX(-100%)';
        if (this.options.edge === 'right') {
          transformPrefix = 'translateX(100%)';
          transformX = -transformX;
        }
        // Calculate open/close percentage of sidenav, with open = 1 and close = 0
        this.percentOpen = Math.min(1, totalDeltaX / this._width);
        // Set transform and opacity styles
        this.el.style.transform = transformPrefix + " translateX(" + transformX + "px)";
        this._overlay.style.opacity = this.percentOpen;
      }
    }, {
      key: "_handleDragTargetRelease",
      value: function _handleDragTargetRelease() {
        if (this.isDragged) {
          if (this.percentOpen > 0.2) {
            this.open();
          } else {
            this._animateOut();
          }
          this.isDragged = false;
          this._verticallyScrolling = false;
        }
      }
    }, {
      key: "_handleCloseDrag",
      value: function _handleCloseDrag(e) {
        if (this.isOpen) {
          // Check if draggable
          if (!this.options.draggable || this._isCurrentlyFixed() || this._verticallyScrolling) {
            return;
          }
          // If not being dragged, set initial drag start variables
          if (!this.isDragged) {
            this._startDrag(e);
          }
          // Run touchmove updates
          this._dragMoveUpdate(e);
          // Calculate raw deltaX
          var totalDeltaX = this._xPos - this._startingXpos;
          // dragDirection is the attempted user drag direction
          var dragDirection = totalDeltaX > 0 ? 'right' : 'left';
          // Don't allow totalDeltaX to exceed Sidenav width or be dragged in the opposite direction
          totalDeltaX = Math.min(this._width, Math.abs(totalDeltaX));
          if (this.options.edge !== dragDirection) {
            totalDeltaX = 0;
          }
          var transformX = -totalDeltaX;
          if (this.options.edge === 'right') {
            transformX = -transformX;
          }
          // Calculate open/close percentage of sidenav, with open = 1 and close = 0
          this.percentOpen = Math.min(1, 1 - totalDeltaX / this._width);
          // Set transform and opacity styles
          this.el.style.transform = "translateX(" + transformX + "px)";
          this._overlay.style.opacity = this.percentOpen;
        }
      }
    }, {
      key: "_handleCloseRelease",
      value: function _handleCloseRelease() {
        if (this.isOpen && this.isDragged) {
          if (this.percentOpen > 0.8) {
            this._animateIn();
          } else {
            this.close();
          }
          this.isDragged = false;
          this._verticallyScrolling = false;
        }
      }
    }, {
      key: "_handleCloseTriggerClick",
      value: function _handleCloseTriggerClick(e) {
        var $closeTrigger = $(e.target).closest('.sidenav-close');
        if ($closeTrigger.length && !this._isCurrentlyFixed()) {
          this.close();
        }
      }
    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        // Only handle horizontal resizes
        if (this.lastWindowWidth !== window.innerWidth) {
          if (window.innerWidth > 992) {
            this.open();
          } else {
            this.close();
          }
        }
        this.lastWindowWidth = window.innerWidth;
        this.lastWindowHeight = window.innerHeight;
      }
    }, {
      key: "_setupClasses",
      value: function _setupClasses() {
        if (this.options.edge === 'right') {
          this.el.classList.add('right-aligned');
          this.dragTarget.classList.add('right-aligned');
        }
      }
    }, {
      key: "_removeClasses",
      value: function _removeClasses() {
        this.el.classList.remove('right-aligned');
        this.dragTarget.classList.remove('right-aligned');
      }
    }, {
      key: "_setupFixed",
      value: function _setupFixed() {
        if (this._isCurrentlyFixed()) {
          this.open();
        }
      }
    }, {
      key: "_isCurrentlyFixed",
      value: function _isCurrentlyFixed() {
        return this.isFixed && window.innerWidth > 992;
      }
    }, {
      key: "_createDragTarget",
      value: function _createDragTarget() {
        var dragTarget = document.createElement('div');
        dragTarget.classList.add('drag-target');
        document.body.appendChild(dragTarget);
        this.dragTarget = dragTarget;
      }
    }, {
      key: "_preventBodyScrolling",
      value: function _preventBodyScrolling() {
        var body = document.body;
        body.style.overflow = 'hidden';
      }
    }, {
      key: "_enableBodyScrolling",
      value: function _enableBodyScrolling() {
        var body = document.body;
        body.style.overflow = '';
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen === true) {
          return;
        }
        this.isOpen = true;
        // Run onOpenStart callback
        if (typeof this.options.onOpenStart === 'function') {
          this.options.onOpenStart.call(this, this.el);
        }
        // Handle fixed Sidenav
        if (this._isCurrentlyFixed()) {
          anim.remove(this.el);
          anim({
            targets: this.el,
            translateX: 0,
            duration: 0,
            easing: 'easeOutQuad'
          });
          this._enableBodyScrolling();
          this._overlay.style.display = 'none';
        } else {
          if (this.options.preventScrolling) {
            this._preventBodyScrolling();
          }
          if (!this.isDragged || this.percentOpen != 1) {
            this._animateIn();
          }
        }
      }
    }, {
      key: "close",
      value: function close() {
        if (this.isOpen === false) {
          return;
        }
        this.isOpen = false;
        // Run onCloseStart callback
        if (typeof this.options.onCloseStart === 'function') {
          this.options.onCloseStart.call(this, this.el);
        }
        // Handle fixed Sidenav
        if (this._isCurrentlyFixed()) {
          var transformX = this.options.edge === 'left' ? '-105%' : '105%';
          this.el.style.transform = "translateX(" + transformX + ")";
        } else {
          this._enableBodyScrolling();
          if (!this.isDragged || this.percentOpen != 0) {
            this._animateOut();
          } else {
            this._overlay.style.display = 'none';
          }
        }
      }
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        this._animateSidenavIn();
        this._animateOverlayIn();
      }
    }, {
      key: "_animateSidenavIn",
      value: function _animateSidenavIn() {
        var _this32 = this;
        var slideOutPercent = this.options.edge === 'left' ? -1 : 1;
        if (this.isDragged) {
          slideOutPercent = this.options.edge === 'left' ? slideOutPercent + this.percentOpen : slideOutPercent - this.percentOpen;
        }
        anim.remove(this.el);
        anim({
          targets: this.el,
          translateX: [slideOutPercent * 100 + "%", 0],
          duration: this.options.inDuration,
          easing: 'easeOutQuad',
          complete: function () {
            // Run onOpenEnd callback
            if (typeof _this32.options.onOpenEnd === 'function') {
              _this32.options.onOpenEnd.call(_this32, _this32.el);
            }
          }
        });
      }
    }, {
      key: "_animateOverlayIn",
      value: function _animateOverlayIn() {
        var start = 0;
        if (this.isDragged) {
          start = this.percentOpen;
        } else {
          $(this._overlay).css({
            display: 'block'
          });
        }
        anim.remove(this._overlay);
        anim({
          targets: this._overlay,
          opacity: [start, 1],
          duration: this.options.inDuration,
          easing: 'easeOutQuad'
        });
      }
    }, {
      key: "_animateOut",
      value: function _animateOut() {
        this._animateSidenavOut();
        this._animateOverlayOut();
      }
    }, {
      key: "_animateSidenavOut",
      value: function _animateSidenavOut() {
        var _this33 = this;
        var endPercent = this.options.edge === 'left' ? -1 : 1;
        var slideOutPercent = 0;
        if (this.isDragged) {
          slideOutPercent = this.options.edge === 'left' ? endPercent + this.percentOpen : endPercent - this.percentOpen;
        }
        anim.remove(this.el);
        anim({
          targets: this.el,
          translateX: [slideOutPercent * 100 + "%", endPercent * 105 + "%"],
          duration: this.options.outDuration,
          easing: 'easeOutQuad',
          complete: function () {
            // Run onOpenEnd callback
            if (typeof _this33.options.onCloseEnd === 'function') {
              _this33.options.onCloseEnd.call(_this33, _this33.el);
            }
          }
        });
      }
    }, {
      key: "_animateOverlayOut",
      value: function _animateOverlayOut() {
        var _this34 = this;
        anim.remove(this._overlay);
        anim({
          targets: this._overlay,
          opacity: 0,
          duration: this.options.outDuration,
          easing: 'easeOutQuad',
          complete: function () {
            $(_this34._overlay).css('display', 'none');
          }
        });
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Sidenav.__proto__ || Object.getPrototypeOf(Sidenav), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Sidenav;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Sidenav;
  })(Component);
  /**
  * @static
  * @memberof Sidenav
  * @type {Array.<Sidenav>}
  */
  Sidenav._sidenavs = [];
  M.Sidenav = Sidenav;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Sidenav, 'sidenav', 'M_Sidenav');
  }
})(cash, M.anime);
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    throttle: 100,
    scrollOffset: 200,
    // offset - 200 allows elements near bottom of page to scroll
    activeClass: 'active',
    getActiveElement: function (id) {
      return 'a[href="#' + id + '"]';
    }
  };
  /**
  * @class
  *
  */
  var ScrollSpy = (function (_Component9) {
    _inherits(ScrollSpy, _Component9);
    /**
    * Construct ScrollSpy instance
    * @constructor
    * @param {Element} el
    * @param {Object} options
    */
    function ScrollSpy(el, options) {
      _classCallCheck(this, ScrollSpy);
      var _this35 = _possibleConstructorReturn(this, (ScrollSpy.__proto__ || Object.getPrototypeOf(ScrollSpy)).call(this, ScrollSpy, el, options));
      _this35.el.M_ScrollSpy = _this35;
      /**
      * Options for the modal
      * @member Modal#options
      * @prop {Number} [throttle=100] - Throttle of scroll handler
      * @prop {Number} [scrollOffset=200] - Offset for centering element when scrolled to
      * @prop {String} [activeClass='active'] - Class applied to active elements
      * @prop {Function} [getActiveElement] - Used to find active element
      */
      _this35.options = $.extend({}, ScrollSpy.defaults, options);
      // setup
      ScrollSpy._elements.push(_this35);
      ScrollSpy._count++;
      ScrollSpy._increment++;
      _this35.tickId = -1;
      _this35.id = ScrollSpy._increment;
      _this35._setupEventHandlers();
      _this35._handleWindowScroll();
      return _this35;
    }
    _createClass(ScrollSpy, [{
      key: "destroy",
      /**
      * Teardown component
      */
      value: function destroy() {
        ScrollSpy._elements.splice(ScrollSpy._elements.indexOf(this), 1);
        ScrollSpy._elementsInView.splice(ScrollSpy._elementsInView.indexOf(this), 1);
        ScrollSpy._visibleElements.splice(ScrollSpy._visibleElements.indexOf(this.$el), 1);
        ScrollSpy._count--;
        this._removeEventHandlers();
        $(this.options.getActiveElement(this.$el.attr('id'))).removeClass(this.options.activeClass);
        this.el.M_ScrollSpy = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var throttledResize = M.throttle(this._handleWindowScroll, 200);
        this._handleThrottledResizeBound = throttledResize.bind(this);
        this._handleWindowScrollBound = this._handleWindowScroll.bind(this);
        if (ScrollSpy._count === 1) {
          window.addEventListener('scroll', this._handleWindowScrollBound);
          window.addEventListener('resize', this._handleThrottledResizeBound);
          document.body.addEventListener('click', this._handleTriggerClick);
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (ScrollSpy._count === 0) {
          window.removeEventListener('scroll', this._handleWindowScrollBound);
          window.removeEventListener('resize', this._handleThrottledResizeBound);
          document.body.removeEventListener('click', this._handleTriggerClick);
        }
      }
    }, {
      key: "_handleTriggerClick",
      value: function _handleTriggerClick(e) {
        var $trigger = $(e.target);
        for (var i = ScrollSpy._elements.length - 1; i >= 0; i--) {
          var scrollspy = ScrollSpy._elements[i];
          if ($trigger.is('a[href="#' + scrollspy.$el.attr('id') + '"]')) {
            e.preventDefault();
            var offset = scrollspy.$el.offset().top + 1;
            anim({
              targets: [document.documentElement, document.body],
              scrollTop: offset - scrollspy.options.scrollOffset,
              duration: 400,
              easing: 'easeOutCubic'
            });
            break;
          }
        }
      }
    }, {
      key: "_handleWindowScroll",
      value: function _handleWindowScroll() {
        // unique tick id
        ScrollSpy._ticks++;
        // viewport rectangle
        var top = M.getDocumentScrollTop(), left = M.getDocumentScrollLeft(), right = left + window.innerWidth, bottom = top + window.innerHeight;
        // determine which elements are in view
        var intersections = ScrollSpy._findElements(top, right, bottom, left);
        for (var i = 0; i < intersections.length; i++) {
          var scrollspy = intersections[i];
          var lastTick = scrollspy.tickId;
          if (lastTick < 0) {
            // entered into view
            scrollspy._enter();
          }
          // update tick id
          scrollspy.tickId = ScrollSpy._ticks;
        }
        for (var _i = 0; _i < ScrollSpy._elementsInView.length; _i++) {
          var _scrollspy = ScrollSpy._elementsInView[_i];
          var _lastTick = _scrollspy.tickId;
          if (_lastTick >= 0 && _lastTick !== ScrollSpy._ticks) {
            // exited from view
            _scrollspy._exit();
            _scrollspy.tickId = -1;
          }
        }
        // remember elements in view for next tick
        ScrollSpy._elementsInView = intersections;
      }
    }, {
      key: "_enter",
      value: function _enter() {
        ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function (value) {
          return value.height() != 0;
        });
        if (ScrollSpy._visibleElements[0]) {
          $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).removeClass(this.options.activeClass);
          if (ScrollSpy._visibleElements[0][0].M_ScrollSpy && this.id < ScrollSpy._visibleElements[0][0].M_ScrollSpy.id) {
            ScrollSpy._visibleElements.unshift(this.$el);
          } else {
            ScrollSpy._visibleElements.push(this.$el);
          }
        } else {
          ScrollSpy._visibleElements.push(this.$el);
        }
        $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).addClass(this.options.activeClass);
      }
    }, {
      key: "_exit",
      value: function _exit() {
        var _this36 = this;
        ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function (value) {
          return value.height() != 0;
        });
        if (ScrollSpy._visibleElements[0]) {
          $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).removeClass(this.options.activeClass);
          ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function (el) {
            return el.attr('id') != _this36.$el.attr('id');
          });
          if (ScrollSpy._visibleElements[0]) {
            // Check if empty
            $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr('id'))).addClass(this.options.activeClass);
          }
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(ScrollSpy.__proto__ || Object.getPrototypeOf(ScrollSpy), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_ScrollSpy;
      }
    }, {
      key: "_findElements",
      value: function _findElements(top, right, bottom, left) {
        var hits = [];
        for (var i = 0; i < ScrollSpy._elements.length; i++) {
          var scrollspy = ScrollSpy._elements[i];
          var currTop = top + scrollspy.options.scrollOffset || 200;
          if (scrollspy.$el.height() > 0) {
            var elTop = scrollspy.$el.offset().top, elLeft = scrollspy.$el.offset().left, elRight = elLeft + scrollspy.$el.width(), elBottom = elTop + scrollspy.$el.height();
            var isIntersect = !(elLeft > right || elRight < left || elTop > bottom || elBottom < currTop);
            if (isIntersect) {
              hits.push(scrollspy);
            }
          }
        }
        return hits;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return ScrollSpy;
  })(Component);
  /**
  * @static
  * @memberof ScrollSpy
  * @type {Array.<ScrollSpy>}
  */
  ScrollSpy._elements = [];
  /**
  * @static
  * @memberof ScrollSpy
  * @type {Array.<ScrollSpy>}
  */
  ScrollSpy._elementsInView = [];
  /**
  * @static
  * @memberof ScrollSpy
  * @type {Array.<cash>}
  */
  ScrollSpy._visibleElements = [];
  /**
  * @static
  * @memberof ScrollSpy
  */
  ScrollSpy._count = 0;
  /**
  * @static
  * @memberof ScrollSpy
  */
  ScrollSpy._increment = 0;
  /**
  * @static
  * @memberof ScrollSpy
  */
  ScrollSpy._ticks = 0;
  M.ScrollSpy = ScrollSpy;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(ScrollSpy, 'scrollSpy', 'M_ScrollSpy');
  }
})(cash, M.anime);
;
(function ($) {
  "use strict";
  var _defaults = {
    data: {},
    // Autocomplete data set
    limit: Infinity,
    // Limit of results the autocomplete shows
    onAutocomplete: null,
    // Callback for when autocompleted
    minLength: 1,
    // Min characters before autocomplete starts
    sortFunction: function (a, b, inputString) {
      // Sort function for sorting autocomplete results
      return a.indexOf(inputString) - b.indexOf(inputString);
    }
  };
  /**
  * @class
  *
  */
  var Autocomplete = (function (_Component10) {
    _inherits(Autocomplete, _Component10);
    /**
    * Construct Autocomplete instance
    * @constructor
    * @param {Element} el
    * @param {Object} options
    */
    function Autocomplete(el, options) {
      _classCallCheck(this, Autocomplete);
      var _this37 = _possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).call(this, Autocomplete, el, options));
      _this37.el.M_Autocomplete = _this37;
      /**
      * Options for the autocomplete
      * @member Autocomplete#options
      * @prop {Number} duration
      * @prop {Number} dist
      * @prop {number} shift
      * @prop {number} padding
      * @prop {Boolean} fullWidth
      * @prop {Boolean} indicators
      * @prop {Boolean} noWrap
      * @prop {Function} onCycleTo
      */
      _this37.options = $.extend({}, Autocomplete.defaults, options);
      // Setup
      _this37.isOpen = false;
      _this37.count = 0;
      _this37.activeIndex = -1;
      _this37.oldVal;
      _this37.$inputField = _this37.$el.closest('.input-field');
      _this37.$active = $();
      _this37._mousedown = false;
      _this37._setupDropdown();
      _this37._setupEventHandlers();
      return _this37;
    }
    _createClass(Autocomplete, [{
      key: "destroy",
      /**
      * Teardown component
      */
      value: function destroy() {
        this._removeEventHandlers();
        this._removeDropdown();
        this.el.M_Autocomplete = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleInputBlurBound = this._handleInputBlur.bind(this);
        this._handleInputKeyupAndFocusBound = this._handleInputKeyupAndFocus.bind(this);
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        this._handleContainerMousedownAndTouchstartBound = this._handleContainerMousedownAndTouchstart.bind(this);
        this._handleContainerMouseupAndTouchendBound = this._handleContainerMouseupAndTouchend.bind(this);
        this.el.addEventListener('blur', this._handleInputBlurBound);
        this.el.addEventListener('keyup', this._handleInputKeyupAndFocusBound);
        this.el.addEventListener('focus', this._handleInputKeyupAndFocusBound);
        this.el.addEventListener('keydown', this._handleInputKeydownBound);
        this.el.addEventListener('click', this._handleInputClickBound);
        this.container.addEventListener('mousedown', this._handleContainerMousedownAndTouchstartBound);
        this.container.addEventListener('mouseup', this._handleContainerMouseupAndTouchendBound);
        if (typeof window.ontouchstart !== 'undefined') {
          this.container.addEventListener('touchstart', this._handleContainerMousedownAndTouchstartBound);
          this.container.addEventListener('touchend', this._handleContainerMouseupAndTouchendBound);
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('blur', this._handleInputBlurBound);
        this.el.removeEventListener('keyup', this._handleInputKeyupAndFocusBound);
        this.el.removeEventListener('focus', this._handleInputKeyupAndFocusBound);
        this.el.removeEventListener('keydown', this._handleInputKeydownBound);
        this.el.removeEventListener('click', this._handleInputClickBound);
        this.container.removeEventListener('mousedown', this._handleContainerMousedownAndTouchstartBound);
        this.container.removeEventListener('mouseup', this._handleContainerMouseupAndTouchendBound);
        if (typeof window.ontouchstart !== 'undefined') {
          this.container.removeEventListener('touchstart', this._handleContainerMousedownAndTouchstartBound);
          this.container.removeEventListener('touchend', this._handleContainerMouseupAndTouchendBound);
        }
      }
    }, {
      key: "_setupDropdown",
      value: function _setupDropdown() {
        var _this38 = this;
        this.container = document.createElement('ul');
        this.container.id = "autocomplete-options-" + M.guid();
        $(this.container).addClass('autocomplete-content dropdown-content');
        this.$inputField.append(this.container);
        this.el.setAttribute('data-target', this.container.id);
        this.dropdown = M.Dropdown.init(this.el, {
          autoFocus: false,
          closeOnClick: false,
          coverTrigger: false,
          onItemClick: function (itemEl) {
            _this38.selectOption($(itemEl));
          }
        });
        // Sketchy removal of dropdown click handler
        this.el.removeEventListener('click', this.dropdown._handleClickBound);
      }
    }, {
      key: "_removeDropdown",
      value: function _removeDropdown() {
        this.container.parentNode.removeChild(this.container);
      }
    }, {
      key: "_handleInputBlur",
      value: function _handleInputBlur() {
        if (!this._mousedown) {
          this.close();
          this._resetAutocomplete();
        }
      }
    }, {
      key: "_handleInputKeyupAndFocus",
      value: function _handleInputKeyupAndFocus(e) {
        if (e.type === 'keyup') {
          Autocomplete._keydown = false;
        }
        this.count = 0;
        var val = this.el.value.toLowerCase();
        // Don't capture enter or arrow key usage.
        if (e.keyCode === 13 || e.keyCode === 38 || e.keyCode === 40) {
          return;
        }
        // Check if the input isn't empty
        // Check if focus triggered by tab
        if (this.oldVal !== val && (M.tabPressed || e.type !== 'focus')) {
          this.open();
        }
        // Update oldVal
        this.oldVal = val;
      }
    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        Autocomplete._keydown = true;
        // Arrow keys and enter key usage
        var keyCode = e.keyCode, liElement = void 0, numItems = $(this.container).children('li').length;
        // select element on Enter
        if (keyCode === M.keys.ENTER && this.activeIndex >= 0) {
          liElement = $(this.container).children('li').eq(this.activeIndex);
          if (liElement.length) {
            this.selectOption(liElement);
            e.preventDefault();
          }
          return;
        }
        // Capture up and down key
        if (keyCode === M.keys.ARROW_UP || keyCode === M.keys.ARROW_DOWN) {
          e.preventDefault();
          if (keyCode === M.keys.ARROW_UP && this.activeIndex > 0) {
            this.activeIndex--;
          }
          if (keyCode === M.keys.ARROW_DOWN && this.activeIndex < numItems - 1) {
            this.activeIndex++;
          }
          this.$active.removeClass('active');
          if (this.activeIndex >= 0) {
            this.$active = $(this.container).children('li').eq(this.activeIndex);
            this.$active.addClass('active');
          }
        }
      }
    }, {
      key: "_handleInputClick",
      value: function _handleInputClick(e) {
        this.open();
      }
    }, {
      key: "_handleContainerMousedownAndTouchstart",
      value: function _handleContainerMousedownAndTouchstart(e) {
        this._mousedown = true;
      }
    }, {
      key: "_handleContainerMouseupAndTouchend",
      value: function _handleContainerMouseupAndTouchend(e) {
        this._mousedown = false;
      }
    }, {
      key: "_highlight",
      value: function _highlight(string, $el) {
        var img = $el.find('img');
        var matchStart = $el.text().toLowerCase().indexOf('' + string.toLowerCase() + ''), matchEnd = matchStart + string.length - 1, beforeMatch = $el.text().slice(0, matchStart), matchText = $el.text().slice(matchStart, matchEnd + 1), afterMatch = $el.text().slice(matchEnd + 1);
        $el.html("<span>" + beforeMatch + "<span class='highlight'>" + matchText + "</span>" + afterMatch + "</span>");
        if (img.length) {
          $el.prepend(img);
        }
      }
    }, {
      key: "_resetCurrentElement",
      value: function _resetCurrentElement() {
        this.activeIndex = -1;
        this.$active.removeClass('active');
      }
    }, {
      key: "_resetAutocomplete",
      value: function _resetAutocomplete() {
        $(this.container).empty();
        this._resetCurrentElement();
        this.oldVal = null;
        this.isOpen = false;
        this._mousedown = false;
      }
    }, {
      key: "selectOption",
      value: function selectOption(el) {
        var text = el.text().trim();
        this.el.value = text;
        this.$el.trigger('change');
        this._resetAutocomplete();
        this.close();
        // Handle onAutocomplete callback.
        if (typeof this.options.onAutocomplete === 'function') {
          this.options.onAutocomplete.call(this, text);
        }
      }
    }, {
      key: "_renderDropdown",
      value: function _renderDropdown(data, val) {
        var _this39 = this;
        this._resetAutocomplete();
        var matchingData = [];
        // Gather all matching data
        for (var key in data) {
          if (data.hasOwnProperty(key) && key.toLowerCase().indexOf(val) !== -1) {
            // Break if past limit
            if (this.count >= this.options.limit) {
              break;
            }
            var entry = {
              data: data[key],
              key: key
            };
            matchingData.push(entry);
            this.count++;
          }
        }
        // Sort
        if (this.options.sortFunction) {
          var sortFunctionBound = function (a, b) {
            return _this39.options.sortFunction(a.key.toLowerCase(), b.key.toLowerCase(), val.toLowerCase());
          };
          matchingData.sort(sortFunctionBound);
        }
        // Render
        for (var i = 0; i < matchingData.length; i++) {
          var _entry = matchingData[i];
          var $autocompleteOption = $('<li></li>');
          if (!!_entry.data) {
            $autocompleteOption.append("<img src=\"" + _entry.data + "\" class=\"right circle\"><span>" + _entry.key + "</span>");
          } else {
            $autocompleteOption.append('<span>' + _entry.key + '</span>');
          }
          $(this.container).append($autocompleteOption);
          this._highlight(val, $autocompleteOption);
        }
      }
    }, {
      key: "open",
      value: function open() {
        var val = this.el.value.toLowerCase();
        this._resetAutocomplete();
        if (val.length >= this.options.minLength) {
          this.isOpen = true;
          this._renderDropdown(this.options.data, val);
        }
        // Open dropdown
        if (!this.dropdown.isOpen) {
          this.dropdown.open();
        } else {
          // Recalculate dropdown when its already open
          this.dropdown.recalculateDimensions();
        }
      }
    }, {
      key: "close",
      value: function close() {
        this.dropdown.close();
      }
    }, {
      key: "updateData",
      value: function updateData(data) {
        var val = this.el.value.toLowerCase();
        this.options.data = data;
        if (this.isOpen) {
          this._renderDropdown(data, val);
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Autocomplete;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Autocomplete;
  })(Component);
  /**
  * @static
  * @memberof Autocomplete
  */
  Autocomplete._keydown = false;
  M.Autocomplete = Autocomplete;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Autocomplete, 'autocomplete', 'M_Autocomplete');
  }
})(cash);
;
(function ($) {
  // Function to update labels of text fields
  M.updateTextFields = function () {
    var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea';
    $(input_selector).each(function (element, index) {
      var $this = $(this);
      if (element.value.length > 0 || $(element).is(':focus') || element.autofocus || $this.attr('placeholder') !== null) {
        $this.siblings('label').addClass('active');
      } else if (element.validity) {
        $this.siblings('label').toggleClass('active', element.validity.badInput === true);
      } else {
        $this.siblings('label').removeClass('active');
      }
    });
  };
  M.validate_field = function (object) {
    var hasLength = object.attr('data-length') !== null;
    var lenAttr = parseInt(object.attr('data-length'));
    var len = object[0].value.length;
    if (len === 0 && object[0].validity.badInput === false && !object.is(':required')) {
      if (object.hasClass('validate')) {
        object.removeClass('valid');
        object.removeClass('invalid');
      }
    } else {
      if (object.hasClass('validate')) {
        // Check for character counter attributes
        if (object.is(':valid') && hasLength && len <= lenAttr || object.is(':valid') && !hasLength) {
          object.removeClass('invalid');
          object.addClass('valid');
        } else {
          object.removeClass('valid');
          object.addClass('invalid');
        }
      }
    }
  };
  M.textareaAutoResize = function ($textarea) {
    // Wrap if native element
    if ($textarea instanceof Element) {
      $textarea = $($textarea);
    }
    if (!$textarea.length) {
      console.error('No textarea element found');
      return;
    }
    // Textarea Auto Resize
    var hiddenDiv = $('.hiddendiv').first();
    if (!hiddenDiv.length) {
      hiddenDiv = $('<div class="hiddendiv common"></div>');
      $('body').append(hiddenDiv);
    }
    // Set font properties of hiddenDiv
    var fontFamily = $textarea.css('font-family');
    var fontSize = $textarea.css('font-size');
    var lineHeight = $textarea.css('line-height');
    // Firefox can't handle padding shorthand.
    var paddingTop = $textarea.css('padding-top');
    var paddingRight = $textarea.css('padding-right');
    var paddingBottom = $textarea.css('padding-bottom');
    var paddingLeft = $textarea.css('padding-left');
    if (fontSize) {
      hiddenDiv.css('font-size', fontSize);
    }
    if (fontFamily) {
      hiddenDiv.css('font-family', fontFamily);
    }
    if (lineHeight) {
      hiddenDiv.css('line-height', lineHeight);
    }
    if (paddingTop) {
      hiddenDiv.css('padding-top', paddingTop);
    }
    if (paddingRight) {
      hiddenDiv.css('padding-right', paddingRight);
    }
    if (paddingBottom) {
      hiddenDiv.css('padding-bottom', paddingBottom);
    }
    if (paddingLeft) {
      hiddenDiv.css('padding-left', paddingLeft);
    }
    // Set original-height, if none
    if (!$textarea.data('original-height')) {
      $textarea.data('original-height', $textarea.height());
    }
    if ($textarea.attr('wrap') === 'off') {
      hiddenDiv.css('overflow-wrap', 'normal').css('white-space', 'pre');
    }
    hiddenDiv.text($textarea[0].value + '\n');
    var content = hiddenDiv.html().replace(/\n/g, '<br>');
    hiddenDiv.html(content);
    // When textarea is hidden, width goes crazy.
    // Approximate with half of window size
    if ($textarea[0].offsetWidth > 0 && $textarea[0].offsetHeight > 0) {
      hiddenDiv.css('width', $textarea.width() + 'px');
    } else {
      hiddenDiv.css('width', window.innerWidth / 2 + 'px');
    }
    /**
    * Resize if the new height is greater than the
    * original height of the textarea
    */
    if ($textarea.data('original-height') <= hiddenDiv.innerHeight()) {
      $textarea.css('height', hiddenDiv.innerHeight() + 'px');
    } else if ($textarea[0].value.length < $textarea.data('previous-length')) {
      /**
      * In case the new height is less than original height, it
      * means the textarea has less text than before
      * So we set the height to the original one
      */
      $textarea.css('height', $textarea.data('original-height') + 'px');
    }
    $textarea.data('previous-length', $textarea[0].value.length);
  };
  $(document).ready(function () {
    // Text based inputs
    var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea';
    // Add active if form auto complete
    $(document).on('change', input_selector, function () {
      if (this.value.length !== 0 || $(this).attr('placeholder') !== null) {
        $(this).siblings('label').addClass('active');
      }
      M.validate_field($(this));
    });
    // Add active if input element has been pre-populated on document ready
    $(document).ready(function () {
      M.updateTextFields();
    });
    // HTML DOM FORM RESET handling
    $(document).on('reset', function (e) {
      var formReset = $(e.target);
      if (formReset.is('form')) {
        formReset.find(input_selector).removeClass('valid').removeClass('invalid');
        formReset.find(input_selector).each(function (e) {
          if (this.value.length) {
            $(this).siblings('label').removeClass('active');
          }
        });
        // Reset select (after native reset)
        setTimeout(function () {
          formReset.find('select').each(function () {
            // check if initialized
            if (this.M_FormSelect) {
              $(this).trigger('change');
            }
          });
        }, 0);
      }
    });
    /**
    * Add active when element has focus
    * @param {Event} e
    */
    document.addEventListener('focus', function (e) {
      if ($(e.target).is(input_selector)) {
        $(e.target).siblings('label, .prefix').addClass('active');
      }
    }, true);
    /**
    * Remove active when element is blurred
    * @param {Event} e
    */
    document.addEventListener('blur', function (e) {
      var $inputElement = $(e.target);
      if ($inputElement.is(input_selector)) {
        var selector = '.prefix';
        if ($inputElement[0].value.length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === null) {
          selector += ', label';
        }
        $inputElement.siblings(selector).removeClass('active');
        M.validate_field($inputElement);
      }
    }, true);
    // Radio and Checkbox focus class
    var radio_checkbox = 'input[type=radio], input[type=checkbox]';
    $(document).on('keyup', radio_checkbox, function (e) {
      // TAB, check if tabbing to radio or checkbox.
      if (e.which === M.keys.TAB) {
        $(this).addClass('tabbed');
        var $this = $(this);
        $this.one('blur', function (e) {
          $(this).removeClass('tabbed');
        });
        return;
      }
    });
    var text_area_selector = '.materialize-textarea';
    $(text_area_selector).each(function () {
      var $textarea = $(this);
      /**
      * Resize textarea on document load after storing
      * the original height and the original length
      */
      $textarea.data('original-height', $textarea.height());
      $textarea.data('previous-length', this.value.length);
      M.textareaAutoResize($textarea);
    });
    $(document).on('keyup', text_area_selector, function () {
      M.textareaAutoResize($(this));
    });
    $(document).on('keydown', text_area_selector, function () {
      M.textareaAutoResize($(this));
    });
    // File Input Path
    $(document).on('change', '.file-field input[type="file"]', function () {
      var file_field = $(this).closest('.file-field');
      var path_input = file_field.find('input.file-path');
      var files = $(this)[0].files;
      var file_names = [];
      for (var i = 0; i < files.length; i++) {
        file_names.push(files[i].name);
      }
      path_input[0].value = file_names.join(', ');
      path_input.trigger('change');
    });
  });
})(cash);
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    indicators: true,
    height: 400,
    duration: 500,
    interval: 6000
  };
  /**
  * @class
  *
  */
  var Slider = (function (_Component11) {
    _inherits(Slider, _Component11);
    /**
    * Construct Slider instance and set up overlay
    * @constructor
    * @param {Element} el
    * @param {Object} options
    */
    function Slider(el, options) {
      _classCallCheck(this, Slider);
      var _this40 = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, Slider, el, options));
      _this40.el.M_Slider = _this40;
      /**
      * Options for the modal
      * @member Slider#options
      * @prop {Boolean} [indicators=true] - Show indicators
      * @prop {Number} [height=400] - height of slider
      * @prop {Number} [duration=500] - Length in ms of slide transition
      * @prop {Number} [interval=6000] - Length in ms of slide interval
      */
      _this40.options = $.extend({}, Slider.defaults, options);
      // setup
      _this40.$slider = _this40.$el.find('.slides');
      _this40.$slides = _this40.$slider.children('li');
      _this40.activeIndex = _this40.$slides.filter(function (item) {
        return $(item).hasClass('active');
      }).first().index();
      if (_this40.activeIndex != -1) {
        _this40.$active = _this40.$slides.eq(_this40.activeIndex);
      }
      _this40._setSliderHeight();
      // Set initial positions of captions
      _this40.$slides.find('.caption').each(function (el) {
        _this40._animateCaptionIn(el, 0);
      });
      // Move img src into background-image
      _this40.$slides.find('img').each(function (el) {
        var placeholderBase64 = 'data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
        if ($(el).attr('src') !== placeholderBase64) {
          $(el).css('background-image', 'url("' + $(el).attr('src') + '")');
          $(el).attr('src', placeholderBase64);
        }
      });
      _this40._setupIndicators();
      // Show active slide
      if (_this40.$active) {
        _this40.$active.css('display', 'block');
      } else {
        _this40.$slides.first().addClass('active');
        anim({
          targets: _this40.$slides.first()[0],
          opacity: 1,
          duration: _this40.options.duration,
          easing: 'easeOutQuad'
        });
        _this40.activeIndex = 0;
        _this40.$active = _this40.$slides.eq(_this40.activeIndex);
        // Update indicators
        if (_this40.options.indicators) {
          _this40.$indicators.eq(_this40.activeIndex).addClass('active');
        }
      }
      // Adjust height to current slide
      _this40.$active.find('img').each(function (el) {
        anim({
          targets: _this40.$active.find('.caption')[0],
          opacity: 1,
          translateX: 0,
          translateY: 0,
          duration: _this40.options.duration,
          easing: 'easeOutQuad'
        });
      });
      _this40._setupEventHandlers();
      // auto scroll
      _this40.start();
      return _this40;
    }
    _createClass(Slider, [{
      key: "destroy",
      /**
      * Teardown component
      */
      value: function destroy() {
        this.pause();
        this._removeIndicators();
        this._removeEventHandlers();
        this.el.M_Slider = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this41 = this;
        this._handleIntervalBound = this._handleInterval.bind(this);
        this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this);
        if (this.options.indicators) {
          this.$indicators.each(function (el) {
            el.addEventListener('click', _this41._handleIndicatorClickBound);
          });
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this42 = this;
        if (this.options.indicators) {
          this.$indicators.each(function (el) {
            el.removeEventListener('click', _this42._handleIndicatorClickBound);
          });
        }
      }
    }, {
      key: "_handleIndicatorClick",
      value: function _handleIndicatorClick(e) {
        var currIndex = $(e.target).index();
        this.set(currIndex);
      }
    }, {
      key: "_handleInterval",
      value: function _handleInterval() {
        var newActiveIndex = this.$slider.find('.active').index();
        if (this.$slides.length === newActiveIndex + 1) newActiveIndex = 0; else // loop to start
        newActiveIndex += 1;
        this.set(newActiveIndex);
      }
    }, {
      key: "_animateCaptionIn",
      value: function _animateCaptionIn(caption, duration) {
        var animOptions = {
          targets: caption,
          opacity: 0,
          duration: duration,
          easing: 'easeOutQuad'
        };
        if ($(caption).hasClass('center-align')) {
          animOptions.translateY = -100;
        } else if ($(caption).hasClass('right-align')) {
          animOptions.translateX = 100;
        } else if ($(caption).hasClass('left-align')) {
          animOptions.translateX = -100;
        }
        anim(animOptions);
      }
    }, {
      key: "_setSliderHeight",
      value: function _setSliderHeight() {
        // If fullscreen, do nothing
        if (!this.$el.hasClass('fullscreen')) {
          if (this.options.indicators) {
            // Add height if indicators are present
            this.$el.css('height', this.options.height + 40 + 'px');
          } else {
            this.$el.css('height', this.options.height + 'px');
          }
          this.$slider.css('height', this.options.height + 'px');
        }
      }
    }, {
      key: "_setupIndicators",
      value: function _setupIndicators() {
        var _this43 = this;
        if (this.options.indicators) {
          this.$indicators = $('<ul class="indicators"></ul>');
          this.$slides.each(function (el, index) {
            var $indicator = $('<li class="indicator-item"></li>');
            _this43.$indicators.append($indicator[0]);
          });
          this.$el.append(this.$indicators[0]);
          this.$indicators = this.$indicators.children('li.indicator-item');
        }
      }
    }, {
      key: "_removeIndicators",
      value: function _removeIndicators() {
        this.$el.find('ul.indicators').remove();
      }
    }, {
      key: "set",
      value: function set(index) {
        var _this44 = this;
        // Wrap around indices.
        if (index >= this.$slides.length) index = 0; else if (index < 0) index = this.$slides.length - 1;
        // Only do if index changes
        if (this.activeIndex != index) {
          this.$active = this.$slides.eq(this.activeIndex);
          var $caption = this.$active.find('.caption');
          this.$active.removeClass('active');
          anim({
            targets: this.$active[0],
            opacity: 0,
            duration: this.options.duration,
            easing: 'easeOutQuad',
            complete: function () {
              _this44.$slides.not('.active').each(function (el) {
                anim({
                  targets: el,
                  opacity: 0,
                  translateX: 0,
                  translateY: 0,
                  duration: 0,
                  easing: 'easeOutQuad'
                });
              });
            }
          });
          this._animateCaptionIn($caption[0], this.options.duration);
          // Update indicators
          if (this.options.indicators) {
            this.$indicators.eq(this.activeIndex).removeClass('active');
            this.$indicators.eq(index).addClass('active');
          }
          anim({
            targets: this.$slides.eq(index)[0],
            opacity: 1,
            duration: this.options.duration,
            easing: 'easeOutQuad'
          });
          anim({
            targets: this.$slides.eq(index).find('.caption')[0],
            opacity: 1,
            translateX: 0,
            translateY: 0,
            duration: this.options.duration,
            delay: this.options.duration,
            easing: 'easeOutQuad'
          });
          this.$slides.eq(index).addClass('active');
          this.activeIndex = index;
          // Reset interval
          this.start();
        }
      }
    }, {
      key: "pause",
      value: function pause() {
        clearInterval(this.interval);
      }
    }, {
      key: "start",
      value: function start() {
        clearInterval(this.interval);
        this.interval = setInterval(this._handleIntervalBound, this.options.duration + this.options.interval);
      }
    }, {
      key: "next",
      value: function next() {
        var newIndex = this.activeIndex + 1;
        // Wrap around indices.
        if (newIndex >= this.$slides.length) newIndex = 0; else if (newIndex < 0) newIndex = this.$slides.length - 1;
        this.set(newIndex);
      }
    }, {
      key: "prev",
      value: function prev() {
        var newIndex = this.activeIndex - 1;
        // Wrap around indices.
        if (newIndex >= this.$slides.length) newIndex = 0; else if (newIndex < 0) newIndex = this.$slides.length - 1;
        this.set(newIndex);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Slider.__proto__ || Object.getPrototypeOf(Slider), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Slider;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Slider;
  })(Component);
  M.Slider = Slider;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Slider, 'slider', 'M_Slider');
  }
})(cash, M.anime);
;
(function ($, anim) {
  $(document).on('click', '.card', function (e) {
    if ($(this).children('.card-reveal').length) {
      var $card = $(e.target).closest('.card');
      if ($card.data('initialOverflow') === undefined) {
        $card.data('initialOverflow', $card.css('overflow') === undefined ? '' : $card.css('overflow'));
      }
      var $cardReveal = $(this).find('.card-reveal');
      if ($(e.target).is($('.card-reveal .card-title')) || $(e.target).is($('.card-reveal .card-title i'))) {
        // Make Reveal animate down and display none
        anim({
          targets: $cardReveal[0],
          translateY: 0,
          duration: 225,
          easing: 'easeInOutQuad',
          complete: function (anim) {
            var el = anim.animatables[0].target;
            $(el).css({
              display: 'none'
            });
            $card.css('overflow', $card.data('initialOverflow'));
          }
        });
      } else if ($(e.target).is($('.card .activator')) || $(e.target).is($('.card .activator i'))) {
        $card.css('overflow', 'hidden');
        $cardReveal.css({
          display: 'block'
        });
        anim({
          targets: $cardReveal[0],
          translateY: '-100%',
          duration: 300,
          easing: 'easeInOutQuad'
        });
      }
    }
  });
})(cash, M.anime);
;
(function ($) {
  "use strict";
  var _defaults = {
    data: [],
    placeholder: '',
    secondaryPlaceholder: '',
    autocompleteOptions: {},
    limit: Infinity,
    onChipAdd: null,
    onChipSelect: null,
    onChipDelete: null
  };
  /**
  * @typedef {Object} chip
  * @property {String} tag  chip tag string
  * @property {String} [image]  chip avatar image string
  */
  /**
  * @class
  *
  */
  var Chips = (function (_Component12) {
    _inherits(Chips, _Component12);
    /**
    * Construct Chips instance and set up overlay
    * @constructor
    * @param {Element} el
    * @param {Object} options
    */
    function Chips(el, options) {
      _classCallCheck(this, Chips);
      var _this45 = _possibleConstructorReturn(this, (Chips.__proto__ || Object.getPrototypeOf(Chips)).call(this, Chips, el, options));
      _this45.el.M_Chips = _this45;
      /**
      * Options for the modal
      * @member Chips#options
      * @prop {Array} data
      * @prop {String} placeholder
      * @prop {String} secondaryPlaceholder
      * @prop {Object} autocompleteOptions
      */
      _this45.options = $.extend({}, Chips.defaults, options);
      _this45.$el.addClass('chips input-field');
      _this45.chipsData = [];
      _this45.$chips = $();
      _this45._setupInput();
      _this45.hasAutocomplete = Object.keys(_this45.options.autocompleteOptions).length > 0;
      // Set input id
      if (!_this45.$input.attr('id')) {
        _this45.$input.attr('id', M.guid());
      }
      // Render initial chips
      if (_this45.options.data.length) {
        _this45.chipsData = _this45.options.data;
        _this45._renderChips(_this45.chipsData);
      }
      // Setup autocomplete if needed
      if (_this45.hasAutocomplete) {
        _this45._setupAutocomplete();
      }
      _this45._setPlaceholder();
      _this45._setupLabel();
      _this45._setupEventHandlers();
      return _this45;
    }
    _createClass(Chips, [{
      key: "getData",
      /**
      * Get Chips Data
      */
      value: function getData() {
        return this.chipsData;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this._removeEventHandlers();
        this.$chips.remove();
        this.el.M_Chips = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleChipClickBound = this._handleChipClick.bind(this);
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputFocusBound = this._handleInputFocus.bind(this);
        this._handleInputBlurBound = this._handleInputBlur.bind(this);
        this.el.addEventListener('click', this._handleChipClickBound);
        document.addEventListener('keydown', Chips._handleChipsKeydown);
        document.addEventListener('keyup', Chips._handleChipsKeyup);
        this.el.addEventListener('blur', Chips._handleChipsBlur, true);
        this.$input[0].addEventListener('focus', this._handleInputFocusBound);
        this.$input[0].addEventListener('blur', this._handleInputBlurBound);
        this.$input[0].addEventListener('keydown', this._handleInputKeydownBound);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('click', this._handleChipClickBound);
        document.removeEventListener('keydown', Chips._handleChipsKeydown);
        document.removeEventListener('keyup', Chips._handleChipsKeyup);
        this.el.removeEventListener('blur', Chips._handleChipsBlur, true);
        this.$input[0].removeEventListener('focus', this._handleInputFocusBound);
        this.$input[0].removeEventListener('blur', this._handleInputBlurBound);
        this.$input[0].removeEventListener('keydown', this._handleInputKeydownBound);
      }
    }, {
      key: "_handleChipClick",
      value: function _handleChipClick(e) {
        var $chip = $(e.target).closest('.chip');
        var clickedClose = $(e.target).is('.close');
        if ($chip.length) {
          var index = $chip.index();
          if (clickedClose) {
            // delete chip
            this.deleteChip(index);
            this.$input[0].focus();
          } else {
            // select chip
            this.selectChip(index);
          }
        } else {
          this.$input[0].focus();
        }
      }
    }, {
      key: "_handleInputFocus",
      /**
      * Handle Input Focus
      */
      value: function _handleInputFocus() {
        this.$el.addClass('focus');
      }
    }, {
      key: "_handleInputBlur",
      value: function _handleInputBlur() {
        this.$el.removeClass('focus');
      }
    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        Chips._keydown = true;
        // enter
        if (e.keyCode === 13) {
          // Override enter if autocompleting.
          if (this.hasAutocomplete && this.autocomplete && this.autocomplete.isOpen) {
            return;
          }
          e.preventDefault();
          this.addChip({
            tag: this.$input[0].value
          });
          this.$input[0].value = '';
        } else if ((e.keyCode === 8 || e.keyCode === 37) && this.$input[0].value === '' && this.chipsData.length) {
          e.preventDefault();
          this.selectChip(this.chipsData.length - 1);
        }
      }
    }, {
      key: "_renderChip",
      value: function _renderChip(chip) {
        if (!chip.tag) {
          return;
        }
        var renderedChip = document.createElement('div');
        var closeIcon = document.createElement('i');
        renderedChip.classList.add('chip');
        renderedChip.textContent = chip.tag;
        renderedChip.setAttribute('tabindex', 0);
        $(closeIcon).addClass('material-icons close');
        closeIcon.textContent = 'close';
        // attach image if needed
        if (chip.image) {
          var img = document.createElement('img');
          img.setAttribute('src', chip.image);
          renderedChip.insertBefore(img, renderedChip.firstChild);
        }
        renderedChip.appendChild(closeIcon);
        return renderedChip;
      }
    }, {
      key: "_renderChips",
      value: function _renderChips() {
        this.$chips.remove();
        for (var i = 0; i < this.chipsData.length; i++) {
          var chipEl = this._renderChip(this.chipsData[i]);
          this.$el.append(chipEl);
          this.$chips.add(chipEl);
        }
        // move input to end
        this.$el.append(this.$input[0]);
      }
    }, {
      key: "_setupAutocomplete",
      value: function _setupAutocomplete() {
        var _this46 = this;
        this.options.autocompleteOptions.onAutocomplete = function (val) {
          _this46.addChip({
            tag: val
          });
          _this46.$input[0].value = '';
          _this46.$input[0].focus();
        };
        this.autocomplete = M.Autocomplete.init(this.$input[0], this.options.autocompleteOptions);
      }
    }, {
      key: "_setupInput",
      value: function _setupInput() {
        this.$input = this.$el.find('input');
        if (!this.$input.length) {
          this.$input = $('<input></input>');
          this.$el.append(this.$input);
        }
        this.$input.addClass('input');
      }
    }, {
      key: "_setupLabel",
      value: function _setupLabel() {
        this.$label = this.$el.find('label');
        if (this.$label.length) {
          this.$label.setAttribute('for', this.$input.attr('id'));
        }
      }
    }, {
      key: "_setPlaceholder",
      value: function _setPlaceholder() {
        if (this.chipsData !== undefined && !this.chipsData.length && this.options.placeholder) {
          $(this.$input).prop('placeholder', this.options.placeholder);
        } else if ((this.chipsData === undefined || !!this.chipsData.length) && this.options.secondaryPlaceholder) {
          $(this.$input).prop('placeholder', this.options.secondaryPlaceholder);
        }
      }
    }, {
      key: "_isValid",
      value: function _isValid(chip) {
        if (chip.hasOwnProperty('tag') && chip.tag !== '') {
          var exists = false;
          for (var i = 0; i < this.chipsData.length; i++) {
            if (this.chipsData[i].tag === chip.tag) {
              exists = true;
              break;
            }
          }
          return !exists;
        }
        return false;
      }
    }, {
      key: "addChip",
      value: function addChip(chip) {
        if (!this._isValid(chip) || this.chipsData.length >= this.options.limit) {
          return;
        }
        var renderedChip = this._renderChip(chip);
        this.$chips.add(renderedChip);
        this.chipsData.push(chip);
        $(this.$input).before(renderedChip);
        this._setPlaceholder();
        // fire chipAdd callback
        if (typeof this.options.onChipAdd === 'function') {
          this.options.onChipAdd.call(this, this.$el, renderedChip);
        }
      }
    }, {
      key: "deleteChip",
      value: function deleteChip(chipIndex) {
        var $chip = this.$chips.eq(chipIndex);
        this.$chips.eq(chipIndex).remove();
        this.$chips = this.$chips.filter(function (el) {
          return $(el).index() >= 0;
        });
        this.chipsData.splice(chipIndex, 1);
        this._setPlaceholder();
        // fire chipDelete callback
        if (typeof this.options.onChipDelete === 'function') {
          this.options.onChipDelete.call(this, this.$el, $chip[0]);
        }
      }
    }, {
      key: "selectChip",
      value: function selectChip(chipIndex) {
        var $chip = this.$chips.eq(chipIndex);
        this._selectedChip = $chip;
        $chip[0].focus();
        // fire chipSelect callback
        if (typeof this.options.onChipSelect === 'function') {
          this.options.onChipSelect.call(this, this.$el, $chip[0]);
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Chips.__proto__ || Object.getPrototypeOf(Chips), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Chips;
      }
    }, {
      key: "_handleChipsKeydown",
      value: function _handleChipsKeydown(e) {
        Chips._keydown = true;
        var $chips = $(e.target).closest('.chips');
        var chipsKeydown = e.target && $chips.length;
        // Don't handle keydown inputs on input and textarea
        if ($(e.target).is('input, textarea') || !chipsKeydown) {
          return;
        }
        var currChips = $chips[0].M_Chips;
        // backspace and delete
        if (e.keyCode === 8 || e.keyCode === 46) {
          e.preventDefault();
          var selectIndex = currChips.chipsData.length;
          if (currChips._selectedChip) {
            var index = currChips._selectedChip.index();
            currChips.deleteChip(index);
            currChips._selectedChip = null;
            // Make sure selectIndex doesn't go negative
            selectIndex = Math.max(index - 1, 0);
          }
          if (currChips.chipsData.length) {
            currChips.selectChip(selectIndex);
          }
        } else if (e.keyCode === 37) {
          if (currChips._selectedChip) {
            var _selectIndex = currChips._selectedChip.index() - 1;
            if (_selectIndex < 0) {
              return;
            }
            currChips.selectChip(_selectIndex);
          }
        } else if (e.keyCode === 39) {
          if (currChips._selectedChip) {
            var _selectIndex2 = currChips._selectedChip.index() + 1;
            if (_selectIndex2 >= currChips.chipsData.length) {
              currChips.$input[0].focus();
            } else {
              currChips.selectChip(_selectIndex2);
            }
          }
        }
      }
    }, {
      key: "_handleChipsKeyup",
      value: function _handleChipsKeyup(e) {
        Chips._keydown = false;
      }
    }, {
      key: "_handleChipsBlur",
      value: function _handleChipsBlur(e) {
        if (!Chips._keydown) {
          var $chips = $(e.target).closest('.chips');
          var currChips = $chips[0].M_Chips;
          currChips._selectedChip = null;
        }
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Chips;
  })(Component);
  /**
  * @static
  * @memberof Chips
  */
  Chips._keydown = false;
  M.Chips = Chips;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Chips, 'chips', 'M_Chips');
  }
  $(document).ready(function () {
    // Handle removal of static chips.
    $(document.body).on('click', '.chip .close', function () {
      var $chips = $(this).closest('.chips');
      if ($chips.length && $chips[0].M_Chips) {
        return;
      }
      $(this).closest('.chip').remove();
    });
  });
})(cash);
;
(function ($) {
  "use strict";
  var _defaults = {
    top: 0,
    bottom: Infinity,
    offset: 0,
    onPositionChange: null
  };
  /**
  * @class
  *
  */
  var Pushpin = (function (_Component13) {
    _inherits(Pushpin, _Component13);
    /**
    * Construct Pushpin instance
    * @constructor
    * @param {Element} el
    * @param {Object} options
    */
    function Pushpin(el, options) {
      _classCallCheck(this, Pushpin);
      var _this47 = _possibleConstructorReturn(this, (Pushpin.__proto__ || Object.getPrototypeOf(Pushpin)).call(this, Pushpin, el, options));
      _this47.el.M_Pushpin = _this47;
      /**
      * Options for the modal
      * @member Pushpin#options
      */
      _this47.options = $.extend({}, Pushpin.defaults, options);
      _this47.originalOffset = _this47.el.offsetTop;
      Pushpin._pushpins.push(_this47);
      _this47._setupEventHandlers();
      _this47._updatePosition();
      return _this47;
    }
    _createClass(Pushpin, [{
      key: "destroy",
      /**
      * Teardown component
      */
      value: function destroy() {
        this.el.style.top = null;
        this._removePinClasses();
        this._removeEventHandlers();
        // Remove pushpin Inst
        var index = Pushpin._pushpins.indexOf(this);
        Pushpin._pushpins.splice(index, 1);
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        document.addEventListener('scroll', Pushpin._updateElements);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        document.removeEventListener('scroll', Pushpin._updateElements);
      }
    }, {
      key: "_updatePosition",
      value: function _updatePosition() {
        var scrolled = M.getDocumentScrollTop() + this.options.offset;
        if (this.options.top <= scrolled && this.options.bottom >= scrolled && !this.el.classList.contains('pinned')) {
          this._removePinClasses();
          this.el.style.top = this.options.offset + "px";
          this.el.classList.add('pinned');
          // onPositionChange callback
          if (typeof this.options.onPositionChange === 'function') {
            this.options.onPositionChange.call(this, 'pinned');
          }
        }
        // Add pin-top (when scrolled position is above top)
        if (scrolled < this.options.top && !this.el.classList.contains('pin-top')) {
          this._removePinClasses();
          this.el.style.top = 0;
          this.el.classList.add('pin-top');
          // onPositionChange callback
          if (typeof this.options.onPositionChange === 'function') {
            this.options.onPositionChange.call(this, 'pin-top');
          }
        }
        // Add pin-bottom (when scrolled position is below bottom)
        if (scrolled > this.options.bottom && !this.el.classList.contains('pin-bottom')) {
          this._removePinClasses();
          this.el.classList.add('pin-bottom');
          this.el.style.top = this.options.bottom - this.originalOffset + "px";
          // onPositionChange callback
          if (typeof this.options.onPositionChange === 'function') {
            this.options.onPositionChange.call(this, 'pin-bottom');
          }
        }
      }
    }, {
      key: "_removePinClasses",
      value: function _removePinClasses() {
        // IE 11 bug (can't remove multiple classes in one line)
        this.el.classList.remove('pin-top');
        this.el.classList.remove('pinned');
        this.el.classList.remove('pin-bottom');
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Pushpin.__proto__ || Object.getPrototypeOf(Pushpin), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Pushpin;
      }
    }, {
      key: "_updateElements",
      value: function _updateElements() {
        for (var elIndex in Pushpin._pushpins) {
          var pInstance = Pushpin._pushpins[elIndex];
          pInstance._updatePosition();
        }
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Pushpin;
  })(Component);
  /**
  * @static
  * @memberof Pushpin
  */
  Pushpin._pushpins = [];
  M.Pushpin = Pushpin;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Pushpin, 'pushpin', 'M_Pushpin');
  }
})(cash);
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    direction: 'top',
    hoverEnabled: true,
    toolbarEnabled: false
  };
  $.fn.reverse = [].reverse;
  /**
  * @class
  *
  */
  var FloatingActionButton = (function (_Component14) {
    _inherits(FloatingActionButton, _Component14);
    /**
    * Construct FloatingActionButton instance
    * @constructor
    * @param {Element} el
    * @param {Object} options
    */
    function FloatingActionButton(el, options) {
      _classCallCheck(this, FloatingActionButton);
      var _this48 = _possibleConstructorReturn(this, (FloatingActionButton.__proto__ || Object.getPrototypeOf(FloatingActionButton)).call(this, FloatingActionButton, el, options));
      _this48.el.M_FloatingActionButton = _this48;
      /**
      * Options for the fab
      * @member FloatingActionButton#options
      * @prop {Boolean} [direction] - Direction fab menu opens
      * @prop {Boolean} [hoverEnabled=true] - Enable hover vs click
      * @prop {Boolean} [toolbarEnabled=false] - Enable toolbar transition
      */
      _this48.options = $.extend({}, FloatingActionButton.defaults, options);
      _this48.isOpen = false;
      _this48.$anchor = _this48.$el.children('a').first();
      _this48.$menu = _this48.$el.children('ul').first();
      _this48.$floatingBtns = _this48.$el.find('ul .btn-floating');
      _this48.$floatingBtnsReverse = _this48.$el.find('ul .btn-floating').reverse();
      _this48.offsetY = 0;
      _this48.offsetX = 0;
      _this48.$el.addClass("direction-" + _this48.options.direction);
      if (_this48.options.direction === 'top') {
        _this48.offsetY = 40;
      } else if (_this48.options.direction === 'right') {
        _this48.offsetX = -40;
      } else if (_this48.options.direction === 'bottom') {
        _this48.offsetY = -40;
      } else {
        _this48.offsetX = 40;
      }
      _this48._setupEventHandlers();
      return _this48;
    }
    _createClass(FloatingActionButton, [{
      key: "destroy",
      /**
      * Teardown component
      */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_FloatingActionButton = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleFABClickBound = this._handleFABClick.bind(this);
        this._handleOpenBound = this.open.bind(this);
        this._handleCloseBound = this.close.bind(this);
        if (this.options.hoverEnabled && !this.options.toolbarEnabled) {
          this.el.addEventListener('mouseenter', this._handleOpenBound);
          this.el.addEventListener('mouseleave', this._handleCloseBound);
        } else {
          this.el.addEventListener('click', this._handleFABClickBound);
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (this.options.hoverEnabled && !this.options.toolbarEnabled) {
          this.el.removeEventListener('mouseenter', this._handleOpenBound);
          this.el.removeEventListener('mouseleave', this._handleCloseBound);
        } else {
          this.el.removeEventListener('click', this._handleFABClickBound);
        }
      }
    }, {
      key: "_handleFABClick",
      value: function _handleFABClick() {
        if (this.isOpen) {
          this.close();
        } else {
          this.open();
        }
      }
    }, {
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(e) {
        if (!$(e.target).closest(this.$menu).length) {
          this.close();
        }
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }
        if (this.options.toolbarEnabled) {
          this._animateInToolbar();
        } else {
          this._animateInFAB();
        }
        this.isOpen = true;
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        if (this.options.toolbarEnabled) {
          window.removeEventListener('scroll', this._handleCloseBound, true);
          document.body.removeEventListener('click', this._handleDocumentClickBound, true);
          this._animateOutToolbar();
        } else {
          this._animateOutFAB();
        }
        this.isOpen = false;
      }
    }, {
      key: "_animateInFAB",
      value: function _animateInFAB() {
        var _this49 = this;
        this.$el.addClass('active');
        var time = 0;
        this.$floatingBtnsReverse.each(function (el) {
          anim({
            targets: el,
            opacity: 1,
            scale: [0.4, 1],
            translateY: [_this49.offsetY, 0],
            translateX: [_this49.offsetX, 0],
            duration: 275,
            delay: time,
            easing: 'easeInOutQuad'
          });
          time += 40;
        });
      }
    }, {
      key: "_animateOutFAB",
      value: function _animateOutFAB() {
        var _this50 = this;
        this.$floatingBtnsReverse.each(function (el) {
          anim.remove(el);
          anim({
            targets: el,
            opacity: 0,
            scale: 0.4,
            translateY: _this50.offsetY,
            translateX: _this50.offsetX,
            duration: 175,
            easing: 'easeOutQuad',
            complete: function () {
              _this50.$el.removeClass('active');
            }
          });
        });
      }
    }, {
      key: "_animateInToolbar",
      value: function _animateInToolbar() {
        var _this51 = this;
        var scaleFactor = void 0;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var btnRect = this.el.getBoundingClientRect();
        var backdrop = $('<div class="fab-backdrop"></div>');
        var fabColor = this.$anchor.css('background-color');
        this.$anchor.append(backdrop);
        this.offsetX = btnRect.left - windowWidth / 2 + btnRect.width / 2;
        this.offsetY = windowHeight - btnRect.bottom;
        scaleFactor = windowWidth / backdrop[0].clientWidth;
        this.btnBottom = btnRect.bottom;
        this.btnLeft = btnRect.left;
        this.btnWidth = btnRect.width;
        // Set initial state
        this.$el.addClass('active');
        this.$el.css({
          'text-align': 'center',
          width: '100%',
          bottom: 0,
          left: 0,
          transform: 'translateX(' + this.offsetX + 'px)',
          transition: 'none'
        });
        this.$anchor.css({
          transform: 'translateY(' + -this.offsetY + 'px)',
          transition: 'none'
        });
        backdrop.css({
          'background-color': fabColor
        });
        setTimeout(function () {
          _this51.$el.css({
            transform: '',
            transition: 'transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s'
          });
          _this51.$anchor.css({
            overflow: 'visible',
            transform: '',
            transition: 'transform .2s'
          });
          setTimeout(function () {
            _this51.$el.css({
              overflow: 'hidden',
              'background-color': fabColor
            });
            backdrop.css({
              transform: 'scale(' + scaleFactor + ')',
              transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
            });
            _this51.$menu.children('li').children('a').css({
              opacity: 1
            });
            // Scroll to close.
            _this51._handleDocumentClickBound = _this51._handleDocumentClick.bind(_this51);
            window.addEventListener('scroll', _this51._handleCloseBound, true);
            document.body.addEventListener('click', _this51._handleDocumentClickBound, true);
          }, 100);
        }, 0);
      }
    }, {
      key: "_animateOutToolbar",
      value: function _animateOutToolbar() {
        var _this52 = this;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var backdrop = this.$el.find('.fab-backdrop');
        var fabColor = this.$anchor.css('background-color');
        this.offsetX = this.btnLeft - windowWidth / 2 + this.btnWidth / 2;
        this.offsetY = windowHeight - this.btnBottom;
        // Hide backdrop
        this.$el.removeClass('active');
        this.$el.css({
          'background-color': 'transparent',
          transition: 'none'
        });
        this.$anchor.css({
          transition: 'none'
        });
        backdrop.css({
          transform: 'scale(0)',
          'background-color': fabColor
        });
        this.$menu.children('li').children('a').css({
          opacity: ''
        });
        setTimeout(function () {
          backdrop.remove();
          // Set initial state.
          _this52.$el.css({
            'text-align': '',
            width: '',
            bottom: '',
            left: '',
            overflow: '',
            'background-color': '',
            transform: 'translate3d(' + -_this52.offsetX + 'px,0,0)'
          });
          _this52.$anchor.css({
            overflow: '',
            transform: 'translate3d(0,' + _this52.offsetY + 'px,0)'
          });
          setTimeout(function () {
            _this52.$el.css({
              transform: 'translate3d(0,0,0)',
              transition: 'transform .2s'
            });
            _this52.$anchor.css({
              transform: 'translate3d(0,0,0)',
              transition: 'transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)'
            });
          }, 20);
        }, 200);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(FloatingActionButton.__proto__ || Object.getPrototypeOf(FloatingActionButton), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_FloatingActionButton;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return FloatingActionButton;
  })(Component);
  M.FloatingActionButton = FloatingActionButton;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(FloatingActionButton, 'floatingActionButton', 'M_FloatingActionButton');
  }
})(cash, M.anime);
;
(function ($) {
  "use strict";
  var _defaults = {
    // Close when date is selected
    autoClose: false,
    // the default output format for the input field value
    format: 'mmm dd, yyyy',
    // Used to create date object from current input string
    parse: null,
    // The initial date to view when first opened
    defaultDate: null,
    // Make the `defaultDate` the initial selected value
    setDefaultDate: false,
    disableWeekends: false,
    disableDayFn: null,
    // First day of week (0: Sunday, 1: Monday etc)
    firstDay: 0,
    // The earliest date that can be selected
    minDate: null,
    // Thelatest date that can be selected
    maxDate: null,
    // Number of years either side, or array of upper/lower range
    yearRange: 10,
    // used internally (don't config outside)
    minYear: 0,
    maxYear: 9999,
    minMonth: undefined,
    maxMonth: undefined,
    startRange: null,
    endRange: null,
    isRTL: false,
    // Render the month after year in the calendar title
    showMonthAfterYear: false,
    // Render days of the calendar grid that fall in the next or previous month
    showDaysInNextAndPreviousMonths: false,
    // Specify a DOM element to render the calendar in
    container: null,
    // Show clear button
    showClearBtn: false,
    // internationalization
    i18n: {
      cancel: 'Cancel',
      clear: 'Clear',
      done: 'Ok',
      previousMonth: '‹',
      nextMonth: '›',
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      weekdaysAbbrev: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    },
    // events array
    events: [],
    // callback function
    onSelect: null,
    onOpen: null,
    onClose: null,
    onDraw: null
  };
  /**
  * @class
  *
  */
  var Datepicker = (function (_Component15) {
    _inherits(Datepicker, _Component15);
    /**
    * Construct Datepicker instance and set up overlay
    * @constructor
    * @param {Element} el
    * @param {Object} options
    */
    function Datepicker(el, options) {
      _classCallCheck(this, Datepicker);
      var _this53 = _possibleConstructorReturn(this, (Datepicker.__proto__ || Object.getPrototypeOf(Datepicker)).call(this, Datepicker, el, options));
      _this53.el.M_Datepicker = _this53;
      _this53.options = $.extend({}, Datepicker.defaults, options);
      // make sure i18n defaults are not lost when only few i18n option properties are passed
      if (!!options && options.hasOwnProperty('i18n') && typeof options.i18n === 'object') {
        _this53.options.i18n = $.extend({}, Datepicker.defaults.i18n, options.i18n);
      }
      // Remove time component from minDate and maxDate options
      if (_this53.options.minDate) _this53.options.minDate.setHours(0, 0, 0, 0);
      if (_this53.options.maxDate) _this53.options.maxDate.setHours(0, 0, 0, 0);
      _this53.id = M.guid();
      _this53._setupVariables();
      _this53._insertHTMLIntoDOM();
      _this53._setupModal();
      _this53._setupEventHandlers();
      if (!_this53.options.defaultDate) {
        _this53.options.defaultDate = new Date(Date.parse(_this53.el.value));
      }
      var defDate = _this53.options.defaultDate;
      if (Datepicker._isDate(defDate)) {
        if (_this53.options.setDefaultDate) {
          _this53.setDate(defDate, true);
          _this53.setInputValue();
        } else {
          _this53.gotoDate(defDate);
        }
      } else {
        _this53.gotoDate(new Date());
      }
      /**
      * Describes open/close state of datepicker
      * @type {Boolean}
      */
      _this53.isOpen = false;
      return _this53;
    }
    _createClass(Datepicker, [{
      key: "destroy",
      /**
      * Teardown component
      */
      value: function destroy() {
        this._removeEventHandlers();
        this.modal.destroy();
        $(this.modalEl).remove();
        this.destroySelects();
        this.el.M_Datepicker = undefined;
      }
    }, {
      key: "destroySelects",
      value: function destroySelects() {
        var oldYearSelect = this.calendarEl.querySelector('.orig-select-year');
        if (oldYearSelect) {
          M.FormSelect.getInstance(oldYearSelect).destroy();
        }
        var oldMonthSelect = this.calendarEl.querySelector('.orig-select-month');
        if (oldMonthSelect) {
          M.FormSelect.getInstance(oldMonthSelect).destroy();
        }
      }
    }, {
      key: "_insertHTMLIntoDOM",
      value: function _insertHTMLIntoDOM() {
        if (this.options.showClearBtn) {
          $(this.clearBtn).css({
            visibility: ''
          });
          this.clearBtn.innerHTML = this.options.i18n.clear;
        }
        this.doneBtn.innerHTML = this.options.i18n.done;
        this.cancelBtn.innerHTML = this.options.i18n.cancel;
        if (this.options.container) {
          this.$modalEl.appendTo(this.options.container);
        } else {
          this.$modalEl.insertBefore(this.el);
        }
      }
    }, {
      key: "_setupModal",
      value: function _setupModal() {
        var _this54 = this;
        this.modalEl.id = 'modal-' + this.id;
        this.modal = M.Modal.init(this.modalEl, {
          onCloseEnd: function () {
            _this54.isOpen = false;
          }
        });
      }
    }, {
      key: "toString",
      value: function toString(format) {
        var _this55 = this;
        format = format || this.options.format;
        if (!Datepicker._isDate(this.date)) {
          return '';
        }
        var formatArray = format.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g);
        var formattedDate = formatArray.map(function (label) {
          if (_this55.formats[label]) {
            return _this55.formats[label]();
          }
          return label;
        }).join('');
        return formattedDate;
      }
    }, {
      key: "setDate",
      value: function setDate(date, preventOnSelect) {
        if (!date) {
          this.date = null;
          this._renderDateDisplay();
          return this.draw();
        }
        if (typeof date === 'string') {
          date = new Date(Date.parse(date));
        }
        if (!Datepicker._isDate(date)) {
          return;
        }
        var min = this.options.minDate, max = this.options.maxDate;
        if (Datepicker._isDate(min) && date < min) {
          date = min;
        } else if (Datepicker._isDate(max) && date > max) {
          date = max;
        }
        this.date = new Date(date.getTime());
        this._renderDateDisplay();
        Datepicker._setToStartOfDay(this.date);
        this.gotoDate(this.date);
        if (!preventOnSelect && typeof this.options.onSelect === 'function') {
          this.options.onSelect.call(this, this.date);
        }
      }
    }, {
      key: "setInputValue",
      value: function setInputValue() {
        this.el.value = this.toString();
        this.$el.trigger('change', {
          firedBy: this
        });
      }
    }, {
      key: "_renderDateDisplay",
      value: function _renderDateDisplay() {
        var displayDate = Datepicker._isDate(this.date) ? this.date : new Date();
        var i18n = this.options.i18n;
        var day = i18n.weekdaysShort[displayDate.getDay()];
        var month = i18n.monthsShort[displayDate.getMonth()];
        var date = displayDate.getDate();
        this.yearTextEl.innerHTML = displayDate.getFullYear();
        this.dateTextEl.innerHTML = day + ", " + month + " " + date;
      }
    }, {
      key: "gotoDate",
      value: function gotoDate(date) {
        var newCalendar = true;
        if (!Datepicker._isDate(date)) {
          return;
        }
        if (this.calendars) {
          var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1), lastVisibleDate = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1), visibleDate = date.getTime();
          // get the end of the month
          lastVisibleDate.setMonth(lastVisibleDate.getMonth() + 1);
          lastVisibleDate.setDate(lastVisibleDate.getDate() - 1);
          newCalendar = visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate;
        }
        if (newCalendar) {
          this.calendars = [{
            month: date.getMonth(),
            year: date.getFullYear()
          }];
        }
        this.adjustCalendars();
      }
    }, {
      key: "adjustCalendars",
      value: function adjustCalendars() {
        this.calendars[0] = this.adjustCalendar(this.calendars[0]);
        this.draw();
      }
    }, {
      key: "adjustCalendar",
      value: function adjustCalendar(calendar) {
        if (calendar.month < 0) {
          calendar.year -= Math.ceil(Math.abs(calendar.month) / 12);
          calendar.month += 12;
        }
        if (calendar.month > 11) {
          calendar.year += Math.floor(Math.abs(calendar.month) / 12);
          calendar.month -= 12;
        }
        return calendar;
      }
    }, {
      key: "nextMonth",
      value: function nextMonth() {
        this.calendars[0].month++;
        this.adjustCalendars();
      }
    }, {
      key: "prevMonth",
      value: function prevMonth() {
        this.calendars[0].month--;
        this.adjustCalendars();
      }
    }, {
      key: "render",
      value: function render(year, month, randId) {
        var opts = this.options, now = new Date(), days = Datepicker._getDaysInMonth(year, month), before = new Date(year, month, 1).getDay(), data = [], row = [];
        Datepicker._setToStartOfDay(now);
        if (opts.firstDay > 0) {
          before -= opts.firstDay;
          if (before < 0) {
            before += 7;
          }
        }
        var previousMonth = month === 0 ? 11 : month - 1, nextMonth = month === 11 ? 0 : month + 1, yearOfPreviousMonth = month === 0 ? year - 1 : year, yearOfNextMonth = month === 11 ? year + 1 : year, daysInPreviousMonth = Datepicker._getDaysInMonth(yearOfPreviousMonth, previousMonth);
        var cells = days + before, after = cells;
        while (after > 7) {
          after -= 7;
        }
        cells += 7 - after;
        var isWeekSelected = false;
        for (var i = 0, r = 0; i < cells; i++) {
          var day = new Date(year, month, 1 + (i - before)), isSelected = Datepicker._isDate(this.date) ? Datepicker._compareDates(day, this.date) : false, isToday = Datepicker._compareDates(day, now), hasEvent = opts.events.indexOf(day.toDateString()) !== -1 ? true : false, isEmpty = i < before || i >= days + before, dayNumber = 1 + (i - before), monthNumber = month, yearNumber = year, isStartRange = opts.startRange && Datepicker._compareDates(opts.startRange, day), isEndRange = opts.endRange && Datepicker._compareDates(opts.endRange, day), isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange, isDisabled = opts.minDate && day < opts.minDate || opts.maxDate && day > opts.maxDate || opts.disableWeekends && Datepicker._isWeekend(day) || opts.disableDayFn && opts.disableDayFn(day);
          if (isEmpty) {
            if (i < before) {
              dayNumber = daysInPreviousMonth + dayNumber;
              monthNumber = previousMonth;
              yearNumber = yearOfPreviousMonth;
            } else {
              dayNumber = dayNumber - days;
              monthNumber = nextMonth;
              yearNumber = yearOfNextMonth;
            }
          }
          var dayConfig = {
            day: dayNumber,
            month: monthNumber,
            year: yearNumber,
            hasEvent: hasEvent,
            isSelected: isSelected,
            isToday: isToday,
            isDisabled: isDisabled,
            isEmpty: isEmpty,
            isStartRange: isStartRange,
            isEndRange: isEndRange,
            isInRange: isInRange,
            showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths
          };
          row.push(this.renderDay(dayConfig));
          if (++r === 7) {
            data.push(this.renderRow(row, opts.isRTL, isWeekSelected));
            row = [];
            r = 0;
            isWeekSelected = false;
          }
        }
        return this.renderTable(opts, data, randId);
      }
    }, {
      key: "renderDay",
      value: function renderDay(opts) {
        var arr = [];
        var ariaSelected = 'false';
        if (opts.isEmpty) {
          if (opts.showDaysInNextAndPreviousMonths) {
            arr.push('is-outside-current-month');
            arr.push('is-selection-disabled');
          } else {
            return '<td class="is-empty"></td>';
          }
        }
        if (opts.isDisabled) {
          arr.push('is-disabled');
        }
        if (opts.isToday) {
          arr.push('is-today');
        }
        if (opts.isSelected) {
          arr.push('is-selected');
          ariaSelected = 'true';
        }
        if (opts.hasEvent) {
          arr.push('has-event');
        }
        if (opts.isInRange) {
          arr.push('is-inrange');
        }
        if (opts.isStartRange) {
          arr.push('is-startrange');
        }
        if (opts.isEndRange) {
          arr.push('is-endrange');
        }
        return "<td data-day=\"" + opts.day + "\" class=\"" + arr.join(' ') + "\" aria-selected=\"" + ariaSelected + "\">" + ("<button class=\"datepicker-day-button\" type=\"button\" data-year=\"" + opts.year + "\" data-month=\"" + opts.month + "\" data-day=\"" + opts.day + "\">" + opts.day + "</button>") + '</td>';
      }
    }, {
      key: "renderRow",
      value: function renderRow(days, isRTL, isRowSelected) {
        return '<tr class="datepicker-row' + (isRowSelected ? ' is-selected' : '') + '">' + (isRTL ? days.reverse() : days).join('') + '</tr>';
      }
    }, {
      key: "renderTable",
      value: function renderTable(opts, data, randId) {
        return '<div class="datepicker-table-wrapper"><table cellpadding="0" cellspacing="0" class="datepicker-table" role="grid" aria-labelledby="' + randId + '">' + this.renderHead(opts) + this.renderBody(data) + '</table></div>';
      }
    }, {
      key: "renderHead",
      value: function renderHead(opts) {
        var i = void 0, arr = [];
        for (i = 0; i < 7; i++) {
          arr.push("<th scope=\"col\"><abbr title=\"" + this.renderDayName(opts, i) + "\">" + this.renderDayName(opts, i, true) + "</abbr></th>");
        }
        return '<thead><tr>' + (opts.isRTL ? arr.reverse() : arr).join('') + '</tr></thead>';
      }
    }, {
      key: "renderBody",
      value: function renderBody(rows) {
        return '<tbody>' + rows.join('') + '</tbody>';
      }
    }, {
      key: "renderTitle",
      value: function renderTitle(instance, c, year, month, refYear, randId) {
        var i = void 0, j = void 0, arr = void 0, opts = this.options, isMinYear = year === opts.minYear, isMaxYear = year === opts.maxYear, html = '<div id="' + randId + '" class="datepicker-controls" role="heading" aria-live="assertive">', monthHtml = void 0, yearHtml = void 0, prev = true, next = true;
        for ((arr = [], i = 0); i < 12; i++) {
          arr.push('<option value="' + (year === refYear ? i - c : 12 + i - c) + '"' + (i === month ? ' selected="selected"' : '') + (isMinYear && i < opts.minMonth || isMaxYear && i > opts.maxMonth ? 'disabled="disabled"' : '') + '>' + opts.i18n.months[i] + '</option>');
        }
        monthHtml = '<select class="datepicker-select orig-select-month" tabindex="-1">' + arr.join('') + '</select>';
        if ($.isArray(opts.yearRange)) {
          i = opts.yearRange[0];
          j = opts.yearRange[1] + 1;
        } else {
          i = year - opts.yearRange;
          j = 1 + year + opts.yearRange;
        }
        for (arr = []; i < j && i <= opts.maxYear; i++) {
          if (i >= opts.minYear) {
            arr.push("<option value=\"" + i + "\" " + (i === year ? 'selected="selected"' : '') + ">" + i + "</option>");
          }
        }
        yearHtml = "<select class=\"datepicker-select orig-select-year\" tabindex=\"-1\">" + arr.join('') + "</select>";
        var leftArrow = '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/><path d="M0-.5h24v24H0z" fill="none"/></svg>';
        html += "<button class=\"month-prev" + (prev ? '' : ' is-disabled') + "\" type=\"button\">" + leftArrow + "</button>";
        html += '<div class="selects-container">';
        if (opts.showMonthAfterYear) {
          html += yearHtml + monthHtml;
        } else {
          html += monthHtml + yearHtml;
        }
        html += '</div>';
        if (isMinYear && (month === 0 || opts.minMonth >= month)) {
          prev = false;
        }
        if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
          next = false;
        }
        var rightArrow = '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/><path d="M0-.25h24v24H0z" fill="none"/></svg>';
        html += "<button class=\"month-next" + (next ? '' : ' is-disabled') + "\" type=\"button\">" + rightArrow + "</button>";
        return html += '</div>';
      }
    }, {
      key: "draw",
      value: function draw(force) {
        if (!this.isOpen && !force) {
          return;
        }
        var opts = this.options, minYear = opts.minYear, maxYear = opts.maxYear, minMonth = opts.minMonth, maxMonth = opts.maxMonth, html = '', randId = void 0;
        if (this._y <= minYear) {
          this._y = minYear;
          if (!isNaN(minMonth) && this._m < minMonth) {
            this._m = minMonth;
          }
        }
        if (this._y >= maxYear) {
          this._y = maxYear;
          if (!isNaN(maxMonth) && this._m > maxMonth) {
            this._m = maxMonth;
          }
        }
        randId = 'datepicker-title-' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 2);
        for (var c = 0; c < 1; c++) {
          this._renderDateDisplay();
          html += this.renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year, randId) + this.render(this.calendars[c].year, this.calendars[c].month, randId);
        }
        this.destroySelects();
        this.calendarEl.innerHTML = html;
        // Init Materialize Select
        var yearSelect = this.calendarEl.querySelector('.orig-select-year');
        var monthSelect = this.calendarEl.querySelector('.orig-select-month');
        M.FormSelect.init(yearSelect, {
          classes: 'select-year',
          dropdownOptions: {
            container: document.body,
            constrainWidth: false
          }
        });
        M.FormSelect.init(monthSelect, {
          classes: 'select-month',
          dropdownOptions: {
            container: document.body,
            constrainWidth: false
          }
        });
        // Add change handlers for select
        yearSelect.addEventListener('change', this._handleYearChange.bind(this));
        monthSelect.addEventListener('change', this._handleMonthChange.bind(this));
        if (typeof this.options.onDraw === 'function') {
          this.options.onDraw(this);
        }
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        this._handleInputChangeBound = this._handleInputChange.bind(this);
        this._handleCalendarClickBound = this._handleCalendarClick.bind(this);
        this._finishSelectionBound = this._finishSelection.bind(this);
        this._handleMonthChange = this._handleMonthChange.bind(this);
        this._closeBound = this.close.bind(this);
        this.el.addEventListener('click', this._handleInputClickBound);
        this.el.addEventListener('keydown', this._handleInputKeydownBound);
        this.el.addEventListener('change', this._handleInputChangeBound);
        this.calendarEl.addEventListener('click', this._handleCalendarClickBound);
        this.doneBtn.addEventListener('click', this._finishSelectionBound);
        this.cancelBtn.addEventListener('click', this._closeBound);
        if (this.options.showClearBtn) {
          this._handleClearClickBound = this._handleClearClick.bind(this);
          this.clearBtn.addEventListener('click', this._handleClearClickBound);
        }
      }
    }, {
      key: "_setupVariables",
      value: function _setupVariables() {
        var _this56 = this;
        this.$modalEl = $(Datepicker._template);
        this.modalEl = this.$modalEl[0];
        this.calendarEl = this.modalEl.querySelector('.datepicker-calendar');
        this.yearTextEl = this.modalEl.querySelector('.year-text');
        this.dateTextEl = this.modalEl.querySelector('.date-text');
        if (this.options.showClearBtn) {
          this.clearBtn = this.modalEl.querySelector('.datepicker-clear');
        }
        this.doneBtn = this.modalEl.querySelector('.datepicker-done');
        this.cancelBtn = this.modalEl.querySelector('.datepicker-cancel');
        this.formats = {
          d: function () {
            return _this56.date.getDate();
          },
          dd: function () {
            var d = _this56.date.getDate();
            return (d < 10 ? '0' : '') + d;
          },
          ddd: function () {
            return _this56.options.i18n.weekdaysShort[_this56.date.getDay()];
          },
          dddd: function () {
            return _this56.options.i18n.weekdays[_this56.date.getDay()];
          },
          m: function () {
            return _this56.date.getMonth() + 1;
          },
          mm: function () {
            var m = _this56.date.getMonth() + 1;
            return (m < 10 ? '0' : '') + m;
          },
          mmm: function () {
            return _this56.options.i18n.monthsShort[_this56.date.getMonth()];
          },
          mmmm: function () {
            return _this56.options.i18n.months[_this56.date.getMonth()];
          },
          yy: function () {
            return ('' + _this56.date.getFullYear()).slice(2);
          },
          yyyy: function () {
            return _this56.date.getFullYear();
          }
        };
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('click', this._handleInputClickBound);
        this.el.removeEventListener('keydown', this._handleInputKeydownBound);
        this.el.removeEventListener('change', this._handleInputChangeBound);
        this.calendarEl.removeEventListener('click', this._handleCalendarClickBound);
      }
    }, {
      key: "_handleInputClick",
      value: function _handleInputClick() {
        this.open();
      }
    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        if (e.which === M.keys.ENTER) {
          e.preventDefault();
          this.open();
        }
      }
    }, {
      key: "_handleCalendarClick",
      value: function _handleCalendarClick(e) {
        if (!this.isOpen) {
          return;
        }
        var $target = $(e.target);
        if (!$target.hasClass('is-disabled')) {
          if ($target.hasClass('datepicker-day-button') && !$target.hasClass('is-empty') && !$target.parent().hasClass('is-disabled')) {
            this.setDate(new Date(e.target.getAttribute('data-year'), e.target.getAttribute('data-month'), e.target.getAttribute('data-day')));
            if (this.options.autoClose) {
              this._finishSelection();
            }
          } else if ($target.closest('.month-prev').length) {
            this.prevMonth();
          } else if ($target.closest('.month-next').length) {
            this.nextMonth();
          }
        }
      }
    }, {
      key: "_handleClearClick",
      value: function _handleClearClick() {
        this.date = null;
        this.setInputValue();
        this.close();
      }
    }, {
      key: "_handleMonthChange",
      value: function _handleMonthChange(e) {
        this.gotoMonth(e.target.value);
      }
    }, {
      key: "_handleYearChange",
      value: function _handleYearChange(e) {
        this.gotoYear(e.target.value);
      }
    }, {
      key: "gotoMonth",
      value: function gotoMonth(month) {
        if (!isNaN(month)) {
          this.calendars[0].month = parseInt(month, 10);
          this.adjustCalendars();
        }
      }
    }, {
      key: "gotoYear",
      value: function gotoYear(year) {
        if (!isNaN(year)) {
          this.calendars[0].year = parseInt(year, 10);
          this.adjustCalendars();
        }
      }
    }, {
      key: "_handleInputChange",
      value: function _handleInputChange(e) {
        var date = void 0;
        // Prevent change event from being fired when triggered by the plugin
        if (e.firedBy === this) {
          return;
        }
        if (this.options.parse) {
          date = this.options.parse(this.el.value, this.options.format);
        } else {
          date = new Date(Date.parse(this.el.value));
        }
        if (Datepicker._isDate(date)) {
          this.setDate(date);
        }
      }
    }, {
      key: "renderDayName",
      value: function renderDayName(opts, day, abbr) {
        day += opts.firstDay;
        while (day >= 7) {
          day -= 7;
        }
        return abbr ? opts.i18n.weekdaysAbbrev[day] : opts.i18n.weekdays[day];
      }
    }, {
      key: "_finishSelection",
      value: function _finishSelection() {
        this.setInputValue();
        this.close();
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }
        this.isOpen = true;
        if (typeof this.options.onOpen === 'function') {
          this.options.onOpen.call(this);
        }
        this.draw();
        this.modal.open();
        return this;
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        this.isOpen = false;
        if (typeof this.options.onClose === 'function') {
          this.options.onClose.call(this);
        }
        this.modal.close();
        return this;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Datepicker.__proto__ || Object.getPrototypeOf(Datepicker), "init", this).call(this, this, els, options);
      }
    }, {
      key: "_isDate",
      value: function _isDate(obj) {
        return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
      }
    }, {
      key: "_isWeekend",
      value: function _isWeekend(date) {
        var day = date.getDay();
        return day === 0 || day === 6;
      }
    }, {
      key: "_setToStartOfDay",
      value: function _setToStartOfDay(date) {
        if (Datepicker._isDate(date)) date.setHours(0, 0, 0, 0);
      }
    }, {
      key: "_getDaysInMonth",
      value: function _getDaysInMonth(year, month) {
        return [31, Datepicker._isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
      }
    }, {
      key: "_isLeapYear",
      value: function _isLeapYear(year) {
        // solution by Matti Virkkunen: http://stackoverflow.com/a/4881951
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      }
    }, {
      key: "_compareDates",
      value: function _compareDates(a, b) {
        // weak date comparison (use setToStartOfDay(date) to ensure correct result)
        return a.getTime() === b.getTime();
      }
    }, {
      key: "_setToStartOfDay",
      value: function _setToStartOfDay(date) {
        if (Datepicker._isDate(date)) date.setHours(0, 0, 0, 0);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Datepicker;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Datepicker;
  })(Component);
  Datepicker._template = ['<div class= "modal datepicker-modal">', '<div class="modal-content datepicker-container">', '<div class="datepicker-date-display">', '<span class="year-text"></span>', '<span class="date-text"></span>', '</div>', '<div class="datepicker-calendar-container">', '<div class="datepicker-calendar"></div>', '<div class="datepicker-footer">', '<button class="btn-flat datepicker-clear waves-effect" style="visibility: hidden;" type="button"></button>', '<div class="confirmation-btns">', '<button class="btn-flat datepicker-cancel waves-effect" type="button"></button>', '<button class="btn-flat datepicker-done waves-effect" type="button"></button>', '</div>', '</div>', '</div>', '</div>', '</div>'].join('');
  M.Datepicker = Datepicker;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Datepicker, 'datepicker', 'M_Datepicker');
  }
})(cash);
;
(function ($) {
  "use strict";
  var _defaults = {
    dialRadius: 135,
    outerRadius: 105,
    innerRadius: 70,
    tickRadius: 20,
    duration: 350,
    container: null,
    defaultTime: 'now',
    // default time, 'now' or '13:14' e.g.
    fromNow: 0,
    // Millisecond offset from the defaultTime
    showClearBtn: false,
    // internationalization
    i18n: {
      cancel: 'Cancel',
      clear: 'Clear',
      done: 'Ok'
    },
    autoClose: false,
    // auto close when minute is selected
    twelveHour: true,
    // change to 12 hour AM/PM clock from 24 hour
    vibrate: true,
    // vibrate the device when dragging clock hand
    // Callbacks
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    onSelect: null
  };
  /**
  * @class
  *
  */
  var Timepicker = (function (_Component16) {
    _inherits(Timepicker, _Component16);
    function Timepicker(el, options) {
      _classCallCheck(this, Timepicker);
      var _this57 = _possibleConstructorReturn(this, (Timepicker.__proto__ || Object.getPrototypeOf(Timepicker)).call(this, Timepicker, el, options));
      _this57.el.M_Timepicker = _this57;
      _this57.options = $.extend({}, Timepicker.defaults, options);
      _this57.id = M.guid();
      _this57._insertHTMLIntoDOM();
      _this57._setupModal();
      _this57._setupVariables();
      _this57._setupEventHandlers();
      _this57._clockSetup();
      _this57._pickerSetup();
      return _this57;
    }
    _createClass(Timepicker, [{
      key: "destroy",
      /**
      * Teardown component
      */
      value: function destroy() {
        this._removeEventHandlers();
        this.modal.destroy();
        $(this.modalEl).remove();
        this.el.M_Timepicker = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        this._handleClockClickStartBound = this._handleClockClickStart.bind(this);
        this._handleDocumentClickMoveBound = this._handleDocumentClickMove.bind(this);
        this._handleDocumentClickEndBound = this._handleDocumentClickEnd.bind(this);
        this.el.addEventListener('click', this._handleInputClickBound);
        this.el.addEventListener('keydown', this._handleInputKeydownBound);
        this.plate.addEventListener('mousedown', this._handleClockClickStartBound);
        this.plate.addEventListener('touchstart', this._handleClockClickStartBound);
        $(this.spanHours).on('click', this.showView.bind(this, 'hours'));
        $(this.spanMinutes).on('click', this.showView.bind(this, 'minutes'));
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('click', this._handleInputClickBound);
        this.el.removeEventListener('keydown', this._handleInputKeydownBound);
      }
    }, {
      key: "_handleInputClick",
      value: function _handleInputClick() {
        this.open();
      }
    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        if (e.which === M.keys.ENTER) {
          e.preventDefault();
          this.open();
        }
      }
    }, {
      key: "_handleClockClickStart",
      value: function _handleClockClickStart(e) {
        e.preventDefault();
        var clockPlateBR = this.plate.getBoundingClientRect();
        var offset = {
          x: clockPlateBR.left,
          y: clockPlateBR.top
        };
        this.x0 = offset.x + this.options.dialRadius;
        this.y0 = offset.y + this.options.dialRadius;
        this.moved = false;
        var clickPos = Timepicker._Pos(e);
        this.dx = clickPos.x - this.x0;
        this.dy = clickPos.y - this.y0;
        // Set clock hands
        this.setHand(this.dx, this.dy, false);
        // Mousemove on document
        document.addEventListener('mousemove', this._handleDocumentClickMoveBound);
        document.addEventListener('touchmove', this._handleDocumentClickMoveBound);
        // Mouseup on document
        document.addEventListener('mouseup', this._handleDocumentClickEndBound);
        document.addEventListener('touchend', this._handleDocumentClickEndBound);
      }
    }, {
      key: "_handleDocumentClickMove",
      value: function _handleDocumentClickMove(e) {
        e.preventDefault();
        var clickPos = Timepicker._Pos(e);
        var x = clickPos.x - this.x0;
        var y = clickPos.y - this.y0;
        this.moved = true;
        this.setHand(x, y, false, true);
      }
    }, {
      key: "_handleDocumentClickEnd",
      value: function _handleDocumentClickEnd(e) {
        var _this58 = this;
        e.preventDefault();
        document.removeEventListener('mouseup', this._handleDocumentClickEndBound);
        document.removeEventListener('touchend', this._handleDocumentClickEndBound);
        var clickPos = Timepicker._Pos(e);
        var x = clickPos.x - this.x0;
        var y = clickPos.y - this.y0;
        if (this.moved && x === this.dx && y === this.dy) {
          this.setHand(x, y);
        }
        if (this.currentView === 'hours') {
          this.showView('minutes', this.options.duration / 2);
        } else if (this.options.autoClose) {
          $(this.minutesView).addClass('timepicker-dial-out');
          setTimeout(function () {
            _this58.done();
          }, this.options.duration / 2);
        }
        if (typeof this.options.onSelect === 'function') {
          this.options.onSelect.call(this, this.hours, this.minutes);
        }
        // Unbind mousemove event
        document.removeEventListener('mousemove', this._handleDocumentClickMoveBound);
        document.removeEventListener('touchmove', this._handleDocumentClickMoveBound);
      }
    }, {
      key: "_insertHTMLIntoDOM",
      value: function _insertHTMLIntoDOM() {
        this.$modalEl = $(Timepicker._template);
        this.modalEl = this.$modalEl[0];
        this.modalEl.id = 'modal-' + this.id;
        // Append popover to input by default
        var containerEl = document.querySelector(this.options.container);
        if (this.options.container && !!containerEl) {
          this.$modalEl.appendTo(containerEl);
        } else {
          this.$modalEl.insertBefore(this.el);
        }
      }
    }, {
      key: "_setupModal",
      value: function _setupModal() {
        var _this59 = this;
        this.modal = M.Modal.init(this.modalEl, {
          onOpenStart: this.options.onOpenStart,
          onOpenEnd: this.options.onOpenEnd,
          onCloseStart: this.options.onCloseStart,
          onCloseEnd: function () {
            if (typeof _this59.options.onCloseEnd === 'function') {
              _this59.options.onCloseEnd.call(_this59);
            }
            _this59.isOpen = false;
          }
        });
      }
    }, {
      key: "_setupVariables",
      value: function _setupVariables() {
        this.currentView = 'hours';
        this.vibrate = navigator.vibrate ? 'vibrate' : navigator.webkitVibrate ? 'webkitVibrate' : null;
        this._canvas = this.modalEl.querySelector('.timepicker-canvas');
        this.plate = this.modalEl.querySelector('.timepicker-plate');
        this.hoursView = this.modalEl.querySelector('.timepicker-hours');
        this.minutesView = this.modalEl.querySelector('.timepicker-minutes');
        this.spanHours = this.modalEl.querySelector('.timepicker-span-hours');
        this.spanMinutes = this.modalEl.querySelector('.timepicker-span-minutes');
        this.spanAmPm = this.modalEl.querySelector('.timepicker-span-am-pm');
        this.footer = this.modalEl.querySelector('.timepicker-footer');
        this.amOrPm = 'PM';
      }
    }, {
      key: "_pickerSetup",
      value: function _pickerSetup() {
        var $clearBtn = $("<button class=\"btn-flat timepicker-clear waves-effect\" style=\"visibility: hidden;\" type=\"button\" tabindex=\"" + (this.options.twelveHour ? '3' : '1') + "\">" + this.options.i18n.clear + "</button>").appendTo(this.footer).on('click', this.clear.bind(this));
        if (this.options.showClearBtn) {
          $clearBtn.css({
            visibility: ''
          });
        }
        var confirmationBtnsContainer = $('<div class="confirmation-btns"></div>');
        $('<button class="btn-flat timepicker-close waves-effect" type="button" tabindex="' + (this.options.twelveHour ? '3' : '1') + '">' + this.options.i18n.cancel + '</button>').appendTo(confirmationBtnsContainer).on('click', this.close.bind(this));
        $('<button class="btn-flat timepicker-close waves-effect" type="button" tabindex="' + (this.options.twelveHour ? '3' : '1') + '">' + this.options.i18n.done + '</button>').appendTo(confirmationBtnsContainer).on('click', this.done.bind(this));
        confirmationBtnsContainer.appendTo(this.footer);
      }
    }, {
      key: "_clockSetup",
      value: function _clockSetup() {
        if (this.options.twelveHour) {
          this.$amBtn = $('<div class="am-btn">AM</div>');
          this.$pmBtn = $('<div class="pm-btn">PM</div>');
          this.$amBtn.on('click', this._handleAmPmClick.bind(this)).appendTo(this.spanAmPm);
          this.$pmBtn.on('click', this._handleAmPmClick.bind(this)).appendTo(this.spanAmPm);
        }
        this._buildHoursView();
        this._buildMinutesView();
        this._buildSVGClock();
      }
    }, {
      key: "_buildSVGClock",
      value: function _buildSVGClock() {
        // Draw clock hands and others
        var dialRadius = this.options.dialRadius;
        var tickRadius = this.options.tickRadius;
        var diameter = dialRadius * 2;
        var svg = Timepicker._createSVGEl('svg');
        svg.setAttribute('class', 'timepicker-svg');
        svg.setAttribute('width', diameter);
        svg.setAttribute('height', diameter);
        var g = Timepicker._createSVGEl('g');
        g.setAttribute('transform', 'translate(' + dialRadius + ',' + dialRadius + ')');
        var bearing = Timepicker._createSVGEl('circle');
        bearing.setAttribute('class', 'timepicker-canvas-bearing');
        bearing.setAttribute('cx', 0);
        bearing.setAttribute('cy', 0);
        bearing.setAttribute('r', 4);
        var hand = Timepicker._createSVGEl('line');
        hand.setAttribute('x1', 0);
        hand.setAttribute('y1', 0);
        var bg = Timepicker._createSVGEl('circle');
        bg.setAttribute('class', 'timepicker-canvas-bg');
        bg.setAttribute('r', tickRadius);
        g.appendChild(hand);
        g.appendChild(bg);
        g.appendChild(bearing);
        svg.appendChild(g);
        this._canvas.appendChild(svg);
        this.hand = hand;
        this.bg = bg;
        this.bearing = bearing;
        this.g = g;
      }
    }, {
      key: "_buildHoursView",
      value: function _buildHoursView() {
        var $tick = $('<div class="timepicker-tick"></div>');
        // Hours view
        if (this.options.twelveHour) {
          for (var i = 1; i < 13; i += 1) {
            var tick = $tick.clone();
            var radian = i / 6 * Math.PI;
            var radius = this.options.outerRadius;
            tick.css({
              left: this.options.dialRadius + Math.sin(radian) * radius - this.options.tickRadius + 'px',
              top: this.options.dialRadius - Math.cos(radian) * radius - this.options.tickRadius + 'px'
            });
            tick.html(i === 0 ? '00' : i);
            this.hoursView.appendChild(tick[0]);
          }
        } else {
          for (var _i2 = 0; _i2 < 24; _i2 += 1) {
            var _tick = $tick.clone();
            var _radian = _i2 / 6 * Math.PI;
            var inner = _i2 > 0 && _i2 < 13;
            var _radius = inner ? this.options.innerRadius : this.options.outerRadius;
            _tick.css({
              left: this.options.dialRadius + Math.sin(_radian) * _radius - this.options.tickRadius + 'px',
              top: this.options.dialRadius - Math.cos(_radian) * _radius - this.options.tickRadius + 'px'
            });
            _tick.html(_i2 === 0 ? '00' : _i2);
            this.hoursView.appendChild(_tick[0]);
          }
        }
      }
    }, {
      key: "_buildMinutesView",
      value: function _buildMinutesView() {
        var $tick = $('<div class="timepicker-tick"></div>');
        // Minutes view
        for (var i = 0; i < 60; i += 5) {
          var tick = $tick.clone();
          var radian = i / 30 * Math.PI;
          tick.css({
            left: this.options.dialRadius + Math.sin(radian) * this.options.outerRadius - this.options.tickRadius + 'px',
            top: this.options.dialRadius - Math.cos(radian) * this.options.outerRadius - this.options.tickRadius + 'px'
          });
          tick.html(Timepicker._addLeadingZero(i));
          this.minutesView.appendChild(tick[0]);
        }
      }
    }, {
      key: "_handleAmPmClick",
      value: function _handleAmPmClick(e) {
        var $btnClicked = $(e.target);
        this.amOrPm = $btnClicked.hasClass('am-btn') ? 'AM' : 'PM';
        this._updateAmPmView();
      }
    }, {
      key: "_updateAmPmView",
      value: function _updateAmPmView() {
        if (this.options.twelveHour) {
          this.$amBtn.toggleClass('text-primary', this.amOrPm === 'AM');
          this.$pmBtn.toggleClass('text-primary', this.amOrPm === 'PM');
        }
      }
    }, {
      key: "_updateTimeFromInput",
      value: function _updateTimeFromInput() {
        // Get the time
        var value = ((this.el.value || this.options.defaultTime || '') + '').split(':');
        if (this.options.twelveHour && !(typeof value[1] === 'undefined')) {
          if (value[1].toUpperCase().indexOf('AM') > 0) {
            this.amOrPm = 'AM';
          } else {
            this.amOrPm = 'PM';
          }
          value[1] = value[1].replace('AM', '').replace('PM', '');
        }
        if (value[0] === 'now') {
          var now = new Date(+new Date() + this.options.fromNow);
          value = [now.getHours(), now.getMinutes()];
          if (this.options.twelveHour) {
            this.amOrPm = value[0] >= 12 && value[0] < 24 ? 'PM' : 'AM';
          }
        }
        this.hours = +value[0] || 0;
        this.minutes = +value[1] || 0;
        this.spanHours.innerHTML = this.hours;
        this.spanMinutes.innerHTML = Timepicker._addLeadingZero(this.minutes);
        this._updateAmPmView();
      }
    }, {
      key: "showView",
      value: function showView(view, delay) {
        if (view === 'minutes' && $(this.hoursView).css('visibility') === 'visible') {}
        var isHours = view === 'hours', nextView = isHours ? this.hoursView : this.minutesView, hideView = isHours ? this.minutesView : this.hoursView;
        this.currentView = view;
        $(this.spanHours).toggleClass('text-primary', isHours);
        $(this.spanMinutes).toggleClass('text-primary', !isHours);
        // Transition view
        hideView.classList.add('timepicker-dial-out');
        $(nextView).css('visibility', 'visible').removeClass('timepicker-dial-out');
        // Reset clock hand
        this.resetClock(delay);
        // After transitions ended
        clearTimeout(this.toggleViewTimer);
        this.toggleViewTimer = setTimeout(function () {
          $(hideView).css('visibility', 'hidden');
        }, this.options.duration);
      }
    }, {
      key: "resetClock",
      value: function resetClock(delay) {
        var view = this.currentView, value = this[view], isHours = view === 'hours', unit = Math.PI / (isHours ? 6 : 30), radian = value * unit, radius = isHours && value > 0 && value < 13 ? this.options.innerRadius : this.options.outerRadius, x = Math.sin(radian) * radius, y = -Math.cos(radian) * radius, self = this;
        if (delay) {
          $(this.canvas).addClass('timepicker-canvas-out');
          setTimeout(function () {
            $(self.canvas).removeClass('timepicker-canvas-out');
            self.setHand(x, y);
          }, delay);
        } else {
          this.setHand(x, y);
        }
      }
    }, {
      key: "setHand",
      value: function setHand(x, y, roundBy5) {
        var _this60 = this;
        var radian = Math.atan2(x, -y), isHours = this.currentView === 'hours', unit = Math.PI / (isHours || roundBy5 ? 6 : 30), z = Math.sqrt(x * x + y * y), inner = isHours && z < (this.options.outerRadius + this.options.innerRadius) / 2, radius = inner ? this.options.innerRadius : this.options.outerRadius;
        if (this.options.twelveHour) {
          radius = this.options.outerRadius;
        }
        // Radian should in range [0, 2PI]
        if (radian < 0) {
          radian = Math.PI * 2 + radian;
        }
        // Get the round value
        var value = Math.round(radian / unit);
        // Get the round radian
        radian = value * unit;
        // Correct the hours or minutes
        if (this.options.twelveHour) {
          if (isHours) {
            if (value === 0) value = 12;
          } else {
            if (roundBy5) value *= 5;
            if (value === 60) value = 0;
          }
        } else {
          if (isHours) {
            if (value === 12) {
              value = 0;
            }
            value = inner ? value === 0 ? 12 : value : value === 0 ? 0 : value + 12;
          } else {
            if (roundBy5) {
              value *= 5;
            }
            if (value === 60) {
              value = 0;
            }
          }
        }
        // Once hours or minutes changed, vibrate the device
        if (this[this.currentView] !== value) {
          if (this.vibrate && this.options.vibrate) {
            // Do not vibrate too frequently
            if (!this.vibrateTimer) {
              navigator[this.vibrate](10);
              this.vibrateTimer = setTimeout(function () {
                _this60.vibrateTimer = null;
              }, 100);
            }
          }
        }
        this[this.currentView] = value;
        if (isHours) {
          this['spanHours'].innerHTML = value;
        } else {
          this['spanMinutes'].innerHTML = Timepicker._addLeadingZero(value);
        }
        // Set clock hand and others' position
        var cx1 = Math.sin(radian) * (radius - this.options.tickRadius), cy1 = -Math.cos(radian) * (radius - this.options.tickRadius), cx2 = Math.sin(radian) * radius, cy2 = -Math.cos(radian) * radius;
        this.hand.setAttribute('x2', cx1);
        this.hand.setAttribute('y2', cy1);
        this.bg.setAttribute('cx', cx2);
        this.bg.setAttribute('cy', cy2);
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }
        this.isOpen = true;
        this._updateTimeFromInput();
        this.showView('hours');
        this.modal.open();
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        this.isOpen = false;
        this.modal.close();
      }
    }, {
      key: "done",
      value: function done(e, clearValue) {
        // Set input value
        var last = this.el.value;
        var value = clearValue ? '' : Timepicker._addLeadingZero(this.hours) + ':' + Timepicker._addLeadingZero(this.minutes);
        this.time = value;
        if (!clearValue && this.options.twelveHour) {
          value = value + " " + this.amOrPm;
        }
        this.el.value = value;
        // Trigger change event
        if (value !== last) {
          this.$el.trigger('change');
        }
        this.close();
        this.el.focus();
      }
    }, {
      key: "clear",
      value: function clear() {
        this.done(null, true);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Timepicker.__proto__ || Object.getPrototypeOf(Timepicker), "init", this).call(this, this, els, options);
      }
    }, {
      key: "_addLeadingZero",
      value: function _addLeadingZero(num) {
        return (num < 10 ? '0' : '') + num;
      }
    }, {
      key: "_createSVGEl",
      value: function _createSVGEl(name) {
        var svgNS = 'http://www.w3.org/2000/svg';
        return document.createElementNS(svgNS, name);
      }
    }, {
      key: "_Pos",
      value: function _Pos(e) {
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return {
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY
          };
        }
        // mouse event
        return {
          x: e.clientX,
          y: e.clientY
        };
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Timepicker;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Timepicker;
  })(Component);
  Timepicker._template = ['<div class= "modal timepicker-modal">', '<div class="modal-content timepicker-container">', '<div class="timepicker-digital-display">', '<div class="timepicker-text-container">', '<div class="timepicker-display-column">', '<span class="timepicker-span-hours text-primary"></span>', ':', '<span class="timepicker-span-minutes"></span>', '</div>', '<div class="timepicker-display-column timepicker-display-am-pm">', '<div class="timepicker-span-am-pm"></div>', '</div>', '</div>', '</div>', '<div class="timepicker-analog-display">', '<div class="timepicker-plate">', '<div class="timepicker-canvas"></div>', '<div class="timepicker-dial timepicker-hours"></div>', '<div class="timepicker-dial timepicker-minutes timepicker-dial-out"></div>', '</div>', '<div class="timepicker-footer"></div>', '</div>', '</div>', '</div>'].join('');
  M.Timepicker = Timepicker;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Timepicker, 'timepicker', 'M_Timepicker');
  }
})(cash);
;
(function ($) {
  "use strict";
  var _defaults = {};
  /**
  * @class
  *
  */
  var CharacterCounter = (function (_Component17) {
    _inherits(CharacterCounter, _Component17);
    /**
    * Construct CharacterCounter instance
    * @constructor
    * @param {Element} el
    * @param {Object} options
    */
    function CharacterCounter(el, options) {
      _classCallCheck(this, CharacterCounter);
      var _this61 = _possibleConstructorReturn(this, (CharacterCounter.__proto__ || Object.getPrototypeOf(CharacterCounter)).call(this, CharacterCounter, el, options));
      _this61.el.M_CharacterCounter = _this61;
      /**
      * Options for the character counter
      */
      _this61.options = $.extend({}, CharacterCounter.defaults, options);
      _this61.isInvalid = false;
      _this61.isValidLength = false;
      _this61._setupCounter();
      _this61._setupEventHandlers();
      return _this61;
    }
    _createClass(CharacterCounter, [{
      key: "destroy",
      /**
      * Teardown component
      */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.CharacterCounter = undefined;
        this._removeCounter();
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleUpdateCounterBound = this.updateCounter.bind(this);
        this.el.addEventListener('focus', this._handleUpdateCounterBound, true);
        this.el.addEventListener('input', this._handleUpdateCounterBound, true);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('focus', this._handleUpdateCounterBound, true);
        this.el.removeEventListener('input', this._handleUpdateCounterBound, true);
      }
    }, {
      key: "_setupCounter",
      value: function _setupCounter() {
        this.counterEl = document.createElement('span');
        $(this.counterEl).addClass('character-counter').css({
          float: 'right',
          'font-size': '12px',
          height: 1
        });
        this.$el.parent().append(this.counterEl);
      }
    }, {
      key: "_removeCounter",
      value: function _removeCounter() {
        $(this.counterEl).remove();
      }
    }, {
      key: "updateCounter",
      value: function updateCounter() {
        var maxLength = +this.$el.attr('data-length'), actualLength = this.el.value.length;
        this.isValidLength = actualLength <= maxLength;
        var counterString = actualLength;
        if (maxLength) {
          counterString += '/' + maxLength;
          this._validateInput();
        }
        $(this.counterEl).html(counterString);
      }
    }, {
      key: "_validateInput",
      value: function _validateInput() {
        if (this.isValidLength && this.isInvalid) {
          this.isInvalid = false;
          this.$el.removeClass('invalid');
        } else if (!this.isValidLength && !this.isInvalid) {
          this.isInvalid = true;
          this.$el.removeClass('valid');
          this.$el.addClass('invalid');
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(CharacterCounter.__proto__ || Object.getPrototypeOf(CharacterCounter), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_CharacterCounter;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return CharacterCounter;
  })(Component);
  M.CharacterCounter = CharacterCounter;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(CharacterCounter, 'characterCounter', 'M_CharacterCounter');
  }
})(cash);
;
(function ($) {
  "use strict";
  var _defaults = {
    duration: 200,
    // ms
    dist: -100,
    // zoom scale TODO: make this more intuitive as an option
    shift: 0,
    // spacing for center image
    padding: 0,
    // Padding between non center items
    numVisible: 5,
    // Number of visible items in carousel
    fullWidth: false,
    // Change to full width styles
    indicators: false,
    // Toggle indicators
    noWrap: false,
    // Don't wrap around and cycle through items.
    onCycleTo: null
  };
  /**
  * @class
  *
  */
  var Carousel = (function (_Component18) {
    _inherits(Carousel, _Component18);
    /**
    * Construct Carousel instance
    * @constructor
    * @param {Element} el
    * @param {Object} options
    */
    function Carousel(el, options) {
      _classCallCheck(this, Carousel);
      var _this62 = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, Carousel, el, options));
      _this62.el.M_Carousel = _this62;
      /**
      * Options for the carousel
      * @member Carousel#options
      * @prop {Number} duration
      * @prop {Number} dist
      * @prop {Number} shift
      * @prop {Number} padding
      * @prop {Number} numVisible
      * @prop {Boolean} fullWidth
      * @prop {Boolean} indicators
      * @prop {Boolean} noWrap
      * @prop {Function} onCycleTo
      */
      _this62.options = $.extend({}, Carousel.defaults, options);
      // Setup
      _this62.hasMultipleSlides = _this62.$el.find('.carousel-item').length > 1;
      _this62.showIndicators = _this62.options.indicators && _this62.hasMultipleSlides;
      _this62.noWrap = _this62.options.noWrap || !_this62.hasMultipleSlides;
      _this62.pressed = false;
      _this62.dragged = false;
      _this62.offset = _this62.target = 0;
      _this62.images = [];
      _this62.itemWidth = _this62.$el.find('.carousel-item').first().innerWidth();
      _this62.itemHeight = _this62.$el.find('.carousel-item').first().innerHeight();
      _this62.dim = _this62.itemWidth * 2 + _this62.options.padding || 1;
      // Make sure dim is non zero for divisions.
      _this62._autoScrollBound = _this62._autoScroll.bind(_this62);
      _this62._trackBound = _this62._track.bind(_this62);
      // Full Width carousel setup
      if (_this62.options.fullWidth) {
        _this62.options.dist = 0;
        _this62._setCarouselHeight();
        // Offset fixed items when indicators.
        if (_this62.showIndicators) {
          _this62.$el.find('.carousel-fixed-item').addClass('with-indicators');
        }
      }
      // Iterate through slides
      _this62.$indicators = $('<ul class="indicators"></ul>');
      _this62.$el.find('.carousel-item').each(function (el, i) {
        _this62.images.push(el);
        if (_this62.showIndicators) {
          var $indicator = $('<li class="indicator-item"></li>');
          // Add active to first by default.
          if (i === 0) {
            $indicator[0].classList.add('active');
          }
          _this62.$indicators.append($indicator);
        }
      });
      if (_this62.showIndicators) {
        _this62.$el.append(_this62.$indicators);
      }
      _this62.count = _this62.images.length;
      // Cap numVisible at count
      _this62.options.numVisible = Math.min(_this62.count, _this62.options.numVisible);
      // Setup cross browser string
      _this62.xform = 'transform';
      ['webkit', 'Moz', 'O', 'ms'].every(function (prefix) {
        var e = prefix + 'Transform';
        if (typeof document.body.style[e] !== 'undefined') {
          _this62.xform = e;
          return false;
        }
        return true;
      });
      _this62._setupEventHandlers();
      _this62._scroll(_this62.offset);
      return _this62;
    }
    _createClass(Carousel, [{
      key: "destroy",
      /**
      * Teardown component
      */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_Carousel = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this63 = this;
        this._handleCarouselTapBound = this._handleCarouselTap.bind(this);
        this._handleCarouselDragBound = this._handleCarouselDrag.bind(this);
        this._handleCarouselReleaseBound = this._handleCarouselRelease.bind(this);
        this._handleCarouselClickBound = this._handleCarouselClick.bind(this);
        if (typeof window.ontouchstart !== 'undefined') {
          this.el.addEventListener('touchstart', this._handleCarouselTapBound);
          this.el.addEventListener('touchmove', this._handleCarouselDragBound);
          this.el.addEventListener('touchend', this._handleCarouselReleaseBound);
        }
        this.el.addEventListener('mousedown', this._handleCarouselTapBound);
        this.el.addEventListener('mousemove', this._handleCarouselDragBound);
        this.el.addEventListener('mouseup', this._handleCarouselReleaseBound);
        this.el.addEventListener('mouseleave', this._handleCarouselReleaseBound);
        this.el.addEventListener('click', this._handleCarouselClickBound);
        if (this.showIndicators && this.$indicators) {
          this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this);
          this.$indicators.find('.indicator-item').each(function (el, i) {
            el.addEventListener('click', _this63._handleIndicatorClickBound);
          });
        }
        // Resize
        var throttledResize = M.throttle(this._handleResize, 200);
        this._handleThrottledResizeBound = throttledResize.bind(this);
        window.addEventListener('resize', this._handleThrottledResizeBound);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this64 = this;
        if (typeof window.ontouchstart !== 'undefined') {
          this.el.removeEventListener('touchstart', this._handleCarouselTapBound);
          this.el.removeEventListener('touchmove', this._handleCarouselDragBound);
          this.el.removeEventListener('touchend', this._handleCarouselReleaseBound);
        }
        this.el.removeEventListener('mousedown', this._handleCarouselTapBound);
        this.el.removeEventListener('mousemove', this._handleCarouselDragBound);
        this.el.removeEventListener('mouseup', this._handleCarouselReleaseBound);
        this.el.removeEventListener('mouseleave', this._handleCarouselReleaseBound);
        this.el.removeEventListener('click', this._handleCarouselClickBound);
        if (this.showIndicators && this.$indicators) {
          this.$indicators.find('.indicator-item').each(function (el, i) {
            el.removeEventListener('click', _this64._handleIndicatorClickBound);
          });
        }
        window.removeEventListener('resize', this._handleThrottledResizeBound);
      }
    }, {
      key: "_handleCarouselTap",
      value: function _handleCarouselTap(e) {
        // Fixes firefox draggable image bug
        if (e.type === 'mousedown' && $(e.target).is('img')) {
          e.preventDefault();
        }
        this.pressed = true;
        this.dragged = false;
        this.verticalDragged = false;
        this.reference = this._xpos(e);
        this.referenceY = this._ypos(e);
        this.velocity = this.amplitude = 0;
        this.frame = this.offset;
        this.timestamp = Date.now();
        clearInterval(this.ticker);
        this.ticker = setInterval(this._trackBound, 100);
      }
    }, {
      key: "_handleCarouselDrag",
      value: function _handleCarouselDrag(e) {
        var x = void 0, y = void 0, delta = void 0, deltaY = void 0;
        if (this.pressed) {
          x = this._xpos(e);
          y = this._ypos(e);
          delta = this.reference - x;
          deltaY = Math.abs(this.referenceY - y);
          if (deltaY < 30 && !this.verticalDragged) {
            // If vertical scrolling don't allow dragging.
            if (delta > 2 || delta < -2) {
              this.dragged = true;
              this.reference = x;
              this._scroll(this.offset + delta);
            }
          } else if (this.dragged) {
            // If dragging don't allow vertical scroll.
            e.preventDefault();
            e.stopPropagation();
            return false;
          } else {
            // Vertical scrolling.
            this.verticalDragged = true;
          }
        }
        if (this.dragged) {
          // If dragging don't allow vertical scroll.
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }
    }, {
      key: "_handleCarouselRelease",
      value: function _handleCarouselRelease(e) {
        if (this.pressed) {
          this.pressed = false;
        } else {
          return;
        }
        clearInterval(this.ticker);
        this.target = this.offset;
        if (this.velocity > 10 || this.velocity < -10) {
          this.amplitude = 0.9 * this.velocity;
          this.target = this.offset + this.amplitude;
        }
        this.target = Math.round(this.target / this.dim) * this.dim;
        // No wrap of items.
        if (this.noWrap) {
          if (this.target >= this.dim * (this.count - 1)) {
            this.target = this.dim * (this.count - 1);
          } else if (this.target < 0) {
            this.target = 0;
          }
        }
        this.amplitude = this.target - this.offset;
        this.timestamp = Date.now();
        requestAnimationFrame(this._autoScrollBound);
        if (this.dragged) {
          e.preventDefault();
          e.stopPropagation();
        }
        return false;
      }
    }, {
      key: "_handleCarouselClick",
      value: function _handleCarouselClick(e) {
        // Disable clicks if carousel was dragged.
        if (this.dragged) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        } else if (!this.options.fullWidth) {
          var clickedIndex = $(e.target).closest('.carousel-item').index();
          var diff = this._wrap(this.center) - clickedIndex;
          // Disable clicks if carousel was shifted by click
          if (diff !== 0) {
            e.preventDefault();
            e.stopPropagation();
          }
          this._cycleTo(clickedIndex);
        }
      }
    }, {
      key: "_handleIndicatorClick",
      value: function _handleIndicatorClick(e) {
        e.stopPropagation();
        var indicator = $(e.target).closest('.indicator-item');
        if (indicator.length) {
          this._cycleTo(indicator.index());
        }
      }
    }, {
      key: "_handleResize",
      value: function _handleResize(e) {
        if (this.options.fullWidth) {
          this.itemWidth = this.$el.find('.carousel-item').first().innerWidth();
          this.imageHeight = this.$el.find('.carousel-item.active').height();
          this.dim = this.itemWidth * 2 + this.options.padding;
          this.offset = this.center * 2 * this.itemWidth;
          this.target = this.offset;
          this._setCarouselHeight(true);
        } else {
          this._scroll();
        }
      }
    }, {
      key: "_setCarouselHeight",
      value: function _setCarouselHeight(imageOnly) {
        var _this65 = this;
        var firstSlide = this.$el.find('.carousel-item.active').length ? this.$el.find('.carousel-item.active').first() : this.$el.find('.carousel-item').first();
        var firstImage = firstSlide.find('img').first();
        if (firstImage.length) {
          if (firstImage[0].complete) {
            // If image won't trigger the load event
            var imageHeight = firstImage.height();
            if (imageHeight > 0) {
              this.$el.css('height', imageHeight + 'px');
            } else {
              // If image still has no height, use the natural dimensions to calculate
              var naturalWidth = firstImage[0].naturalWidth;
              var naturalHeight = firstImage[0].naturalHeight;
              var adjustedHeight = this.$el.width() / naturalWidth * naturalHeight;
              this.$el.css('height', adjustedHeight + 'px');
            }
          } else {
            // Get height when image is loaded normally
            firstImage.one('load', function (el, i) {
              _this65.$el.css('height', el.offsetHeight + 'px');
            });
          }
        } else if (!imageOnly) {
          var slideHeight = firstSlide.height();
          this.$el.css('height', slideHeight + 'px');
        }
      }
    }, {
      key: "_xpos",
      value: function _xpos(e) {
        // touch event
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return e.targetTouches[0].clientX;
        }
        // mouse event
        return e.clientX;
      }
    }, {
      key: "_ypos",
      value: function _ypos(e) {
        // touch event
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return e.targetTouches[0].clientY;
        }
        // mouse event
        return e.clientY;
      }
    }, {
      key: "_wrap",
      value: function _wrap(x) {
        return x >= this.count ? x % this.count : x < 0 ? this._wrap(this.count + x % this.count) : x;
      }
    }, {
      key: "_track",
      value: function _track() {
        var now = void 0, elapsed = void 0, delta = void 0, v = void 0;
        now = Date.now();
        elapsed = now - this.timestamp;
        this.timestamp = now;
        delta = this.offset - this.frame;
        this.frame = this.offset;
        v = 1000 * delta / (1 + elapsed);
        this.velocity = 0.8 * v + 0.2 * this.velocity;
      }
    }, {
      key: "_autoScroll",
      value: function _autoScroll() {
        var elapsed = void 0, delta = void 0;
        if (this.amplitude) {
          elapsed = Date.now() - this.timestamp;
          delta = this.amplitude * Math.exp(-elapsed / this.options.duration);
          if (delta > 2 || delta < -2) {
            this._scroll(this.target - delta);
            requestAnimationFrame(this._autoScrollBound);
          } else {
            this._scroll(this.target);
          }
        }
      }
    }, {
      key: "_scroll",
      value: function _scroll(x) {
        var _this66 = this;
        // Track scrolling state
        if (!this.$el.hasClass('scrolling')) {
          this.el.classList.add('scrolling');
        }
        if (this.scrollingTimeout != null) {
          window.clearTimeout(this.scrollingTimeout);
        }
        this.scrollingTimeout = window.setTimeout(function () {
          _this66.$el.removeClass('scrolling');
        }, this.options.duration);
        // Start actual scroll
        var i = void 0, half = void 0, delta = void 0, dir = void 0, tween = void 0, el = void 0, alignment = void 0, zTranslation = void 0, tweenedOpacity = void 0, centerTweenedOpacity = void 0;
        var lastCenter = this.center;
        var numVisibleOffset = 1 / this.options.numVisible;
        this.offset = typeof x === 'number' ? x : this.offset;
        this.center = Math.floor((this.offset + this.dim / 2) / this.dim);
        delta = this.offset - this.center * this.dim;
        dir = delta < 0 ? 1 : -1;
        tween = -dir * delta * 2 / this.dim;
        half = this.count >> 1;
        if (this.options.fullWidth) {
          alignment = 'translateX(0)';
          centerTweenedOpacity = 1;
        } else {
          alignment = 'translateX(' + (this.el.clientWidth - this.itemWidth) / 2 + 'px) ';
          alignment += 'translateY(' + (this.el.clientHeight - this.itemHeight) / 2 + 'px)';
          centerTweenedOpacity = 1 - numVisibleOffset * tween;
        }
        // Set indicator active
        if (this.showIndicators) {
          var diff = this.center % this.count;
          var activeIndicator = this.$indicators.find('.indicator-item.active');
          if (activeIndicator.index() !== diff) {
            activeIndicator.removeClass('active');
            this.$indicators.find('.indicator-item').eq(diff)[0].classList.add('active');
          }
        }
        // center
        // Don't show wrapped items.
        if (!this.noWrap || this.center >= 0 && this.center < this.count) {
          el = this.images[this._wrap(this.center)];
          // Add active class to center item.
          if (!$(el).hasClass('active')) {
            this.$el.find('.carousel-item').removeClass('active');
            el.classList.add('active');
          }
          var transformString = alignment + " translateX(" + -delta / 2 + "px) translateX(" + dir * this.options.shift * tween * i + "px) translateZ(" + this.options.dist * tween + "px)";
          this._updateItemStyle(el, centerTweenedOpacity, 0, transformString);
        }
        for (i = 1; i <= half; ++i) {
          // right side
          if (this.options.fullWidth) {
            zTranslation = this.options.dist;
            tweenedOpacity = i === half && delta < 0 ? 1 - tween : 1;
          } else {
            zTranslation = this.options.dist * (i * 2 + tween * dir);
            tweenedOpacity = 1 - numVisibleOffset * (i * 2 + tween * dir);
          }
          // Don't show wrapped items.
          if (!this.noWrap || this.center + i < this.count) {
            el = this.images[this._wrap(this.center + i)];
            var _transformString = alignment + " translateX(" + (this.options.shift + (this.dim * i - delta) / 2) + "px) translateZ(" + zTranslation + "px)";
            this._updateItemStyle(el, tweenedOpacity, -i, _transformString);
          }
          // left side
          if (this.options.fullWidth) {
            zTranslation = this.options.dist;
            tweenedOpacity = i === half && delta > 0 ? 1 - tween : 1;
          } else {
            zTranslation = this.options.dist * (i * 2 - tween * dir);
            tweenedOpacity = 1 - numVisibleOffset * (i * 2 - tween * dir);
          }
          // Don't show wrapped items.
          if (!this.noWrap || this.center - i >= 0) {
            el = this.images[this._wrap(this.center - i)];
            var _transformString2 = alignment + " translateX(" + (-this.options.shift + (-this.dim * i - delta) / 2) + "px) translateZ(" + zTranslation + "px)";
            this._updateItemStyle(el, tweenedOpacity, -i, _transformString2);
          }
        }
        // center
        // Don't show wrapped items.
        if (!this.noWrap || this.center >= 0 && this.center < this.count) {
          el = this.images[this._wrap(this.center)];
          var _transformString3 = alignment + " translateX(" + -delta / 2 + "px) translateX(" + dir * this.options.shift * tween + "px) translateZ(" + this.options.dist * tween + "px)";
          this._updateItemStyle(el, centerTweenedOpacity, 0, _transformString3);
        }
        // onCycleTo callback
        var $currItem = this.$el.find('.carousel-item').eq(this._wrap(this.center));
        if (lastCenter !== this.center && typeof this.options.onCycleTo === 'function') {
          this.options.onCycleTo.call(this, $currItem[0], this.dragged);
        }
        // One time callback
        if (typeof this.oneTimeCallback === 'function') {
          this.oneTimeCallback.call(this, $currItem[0], this.dragged);
          this.oneTimeCallback = null;
        }
      }
    }, {
      key: "_updateItemStyle",
      value: function _updateItemStyle(el, opacity, zIndex, transform) {
        el.style[this.xform] = transform;
        el.style.zIndex = zIndex;
        el.style.opacity = opacity;
        el.style.visibility = 'visible';
      }
    }, {
      key: "_cycleTo",
      value: function _cycleTo(n, callback) {
        var diff = this.center % this.count - n;
        // Account for wraparound.
        if (!this.noWrap) {
          if (diff < 0) {
            if (Math.abs(diff + this.count) < Math.abs(diff)) {
              diff += this.count;
            }
          } else if (diff > 0) {
            if (Math.abs(diff - this.count) < diff) {
              diff -= this.count;
            }
          }
        }
        this.target = this.dim * Math.round(this.offset / this.dim);
        // Next
        if (diff < 0) {
          this.target += this.dim * Math.abs(diff);
        } else if (diff > 0) {
          this.target -= this.dim * diff;
        }
        // Set one time callback
        if (typeof callback === 'function') {
          this.oneTimeCallback = callback;
        }
        // Scroll
        if (this.offset !== this.target) {
          this.amplitude = this.target - this.offset;
          this.timestamp = Date.now();
          requestAnimationFrame(this._autoScrollBound);
        }
      }
    }, {
      key: "next",
      value: function next(n) {
        if (n === undefined || isNaN(n)) {
          n = 1;
        }
        var index = this.center + n;
        if (index >= this.count || index < 0) {
          if (this.noWrap) {
            return;
          }
          index = this._wrap(index);
        }
        this._cycleTo(index);
      }
    }, {
      key: "prev",
      value: function prev(n) {
        if (n === undefined || isNaN(n)) {
          n = 1;
        }
        var index = this.center - n;
        if (index >= this.count || index < 0) {
          if (this.noWrap) {
            return;
          }
          index = this._wrap(index);
        }
        this._cycleTo(index);
      }
    }, {
      key: "set",
      value: function set(n, callback) {
        if (n === undefined || isNaN(n)) {
          n = 0;
        }
        if (n > this.count || n < 0) {
          if (this.noWrap) {
            return;
          }
          n = this._wrap(n);
        }
        this._cycleTo(n, callback);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Carousel.__proto__ || Object.getPrototypeOf(Carousel), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Carousel;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Carousel;
  })(Component);
  M.Carousel = Carousel;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Carousel, 'carousel', 'M_Carousel');
  }
})(cash);
;
(function ($) {
  "use strict";
  var _defaults = {
    onOpen: undefined,
    onClose: undefined
  };
  /**
  * @class
  *
  */
  var TapTarget = (function (_Component19) {
    _inherits(TapTarget, _Component19);
    /**
    * Construct TapTarget instance
    * @constructor
    * @param {Element} el
    * @param {Object} options
    */
    function TapTarget(el, options) {
      _classCallCheck(this, TapTarget);
      var _this67 = _possibleConstructorReturn(this, (TapTarget.__proto__ || Object.getPrototypeOf(TapTarget)).call(this, TapTarget, el, options));
      _this67.el.M_TapTarget = _this67;
      /**
      * Options for the select
      * @member TapTarget#options
      * @prop {Function} onOpen - Callback function called when feature discovery is opened
      * @prop {Function} onClose - Callback function called when feature discovery is closed
      */
      _this67.options = $.extend({}, TapTarget.defaults, options);
      _this67.isOpen = false;
      // setup
      _this67.$origin = $('#' + _this67.$el.attr('data-target'));
      _this67._setup();
      _this67._calculatePositioning();
      _this67._setupEventHandlers();
      return _this67;
    }
    _createClass(TapTarget, [{
      key: "destroy",
      /**
      * Teardown component
      */
      value: function destroy() {
        this._removeEventHandlers();
        this.el.TapTarget = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleDocumentClickBound = this._handleDocumentClick.bind(this);
        this._handleTargetClickBound = this._handleTargetClick.bind(this);
        this._handleOriginClickBound = this._handleOriginClick.bind(this);
        this.el.addEventListener('click', this._handleTargetClickBound);
        this.originEl.addEventListener('click', this._handleOriginClickBound);
        // Resize
        var throttledResize = M.throttle(this._handleResize, 200);
        this._handleThrottledResizeBound = throttledResize.bind(this);
        window.addEventListener('resize', this._handleThrottledResizeBound);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('click', this._handleTargetClickBound);
        this.originEl.removeEventListener('click', this._handleOriginClickBound);
        window.removeEventListener('resize', this._handleThrottledResizeBound);
      }
    }, {
      key: "_handleTargetClick",
      value: function _handleTargetClick(e) {
        this.open();
      }
    }, {
      key: "_handleOriginClick",
      value: function _handleOriginClick(e) {
        this.close();
      }
    }, {
      key: "_handleResize",
      value: function _handleResize(e) {
        this._calculatePositioning();
      }
    }, {
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(e) {
        if (!$(e.target).closest('.tap-target-wrapper').length) {
          this.close();
          e.preventDefault();
          e.stopPropagation();
        }
      }
    }, {
      key: "_setup",
      value: function _setup() {
        // Creating tap target
        this.wrapper = this.$el.parent()[0];
        this.waveEl = $(this.wrapper).find('.tap-target-wave')[0];
        this.originEl = $(this.wrapper).find('.tap-target-origin')[0];
        this.contentEl = this.$el.find('.tap-target-content')[0];
        // Creating wrapper
        if (!$(this.wrapper).hasClass('.tap-target-wrapper')) {
          this.wrapper = document.createElement('div');
          this.wrapper.classList.add('tap-target-wrapper');
          this.$el.before($(this.wrapper));
          this.wrapper.append(this.el);
        }
        // Creating content
        if (!this.contentEl) {
          this.contentEl = document.createElement('div');
          this.contentEl.classList.add('tap-target-content');
          this.$el.append(this.contentEl);
        }
        // Creating foreground wave
        if (!this.waveEl) {
          this.waveEl = document.createElement('div');
          this.waveEl.classList.add('tap-target-wave');
          // Creating origin
          if (!this.originEl) {
            this.originEl = this.$origin.clone(true, true);
            this.originEl.addClass('tap-target-origin');
            this.originEl.removeAttr('id');
            this.originEl.removeAttr('style');
            this.originEl = this.originEl[0];
            this.waveEl.append(this.originEl);
          }
          this.wrapper.append(this.waveEl);
        }
      }
    }, {
      key: "_calculatePositioning",
      value: function _calculatePositioning() {
        // Element or parent is fixed position?
        var isFixed = this.$origin.css('position') === 'fixed';
        if (!isFixed) {
          var parents = this.$origin.parents();
          for (var i = 0; i < parents.length; i++) {
            isFixed = $(parents[i]).css('position') == 'fixed';
            if (isFixed) {
              break;
            }
          }
        }
        // Calculating origin
        var originWidth = this.$origin.outerWidth();
        var originHeight = this.$origin.outerHeight();
        var originTop = isFixed ? this.$origin.offset().top - M.getDocumentScrollTop() : this.$origin.offset().top;
        var originLeft = isFixed ? this.$origin.offset().left - M.getDocumentScrollLeft() : this.$origin.offset().left;
        // Calculating screen
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var centerX = windowWidth / 2;
        var centerY = windowHeight / 2;
        var isLeft = originLeft <= centerX;
        var isRight = originLeft > centerX;
        var isTop = originTop <= centerY;
        var isBottom = originTop > centerY;
        var isCenterX = originLeft >= windowWidth * 0.25 && originLeft <= windowWidth * 0.75;
        // Calculating tap target
        var tapTargetWidth = this.$el.outerWidth();
        var tapTargetHeight = this.$el.outerHeight();
        var tapTargetTop = originTop + originHeight / 2 - tapTargetHeight / 2;
        var tapTargetLeft = originLeft + originWidth / 2 - tapTargetWidth / 2;
        var tapTargetPosition = isFixed ? 'fixed' : 'absolute';
        // Calculating content
        var tapTargetTextWidth = isCenterX ? tapTargetWidth : tapTargetWidth / 2 + originWidth;
        var tapTargetTextHeight = tapTargetHeight / 2;
        var tapTargetTextTop = isTop ? tapTargetHeight / 2 : 0;
        var tapTargetTextBottom = 0;
        var tapTargetTextLeft = isLeft && !isCenterX ? tapTargetWidth / 2 - originWidth : 0;
        var tapTargetTextRight = 0;
        var tapTargetTextPadding = originWidth;
        var tapTargetTextAlign = isBottom ? 'bottom' : 'top';
        // Calculating wave
        var tapTargetWaveWidth = originWidth > originHeight ? originWidth * 2 : originWidth * 2;
        var tapTargetWaveHeight = tapTargetWaveWidth;
        var tapTargetWaveTop = tapTargetHeight / 2 - tapTargetWaveHeight / 2;
        var tapTargetWaveLeft = tapTargetWidth / 2 - tapTargetWaveWidth / 2;
        // Setting tap target
        var tapTargetWrapperCssObj = {};
        tapTargetWrapperCssObj.top = isTop ? tapTargetTop + 'px' : '';
        tapTargetWrapperCssObj.right = isRight ? windowWidth - tapTargetLeft - tapTargetWidth + 'px' : '';
        tapTargetWrapperCssObj.bottom = isBottom ? windowHeight - tapTargetTop - tapTargetHeight + 'px' : '';
        tapTargetWrapperCssObj.left = isLeft ? tapTargetLeft + 'px' : '';
        tapTargetWrapperCssObj.position = tapTargetPosition;
        $(this.wrapper).css(tapTargetWrapperCssObj);
        // Setting content
        $(this.contentEl).css({
          width: tapTargetTextWidth + 'px',
          height: tapTargetTextHeight + 'px',
          top: tapTargetTextTop + 'px',
          right: tapTargetTextRight + 'px',
          bottom: tapTargetTextBottom + 'px',
          left: tapTargetTextLeft + 'px',
          padding: tapTargetTextPadding + 'px',
          verticalAlign: tapTargetTextAlign
        });
        // Setting wave
        $(this.waveEl).css({
          top: tapTargetWaveTop + 'px',
          left: tapTargetWaveLeft + 'px',
          width: tapTargetWaveWidth + 'px',
          height: tapTargetWaveHeight + 'px'
        });
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }
        // onOpen callback
        if (typeof this.options.onOpen === 'function') {
          this.options.onOpen.call(this, this.$origin[0]);
        }
        this.isOpen = true;
        this.wrapper.classList.add('open');
        document.body.addEventListener('click', this._handleDocumentClickBound, true);
        document.body.addEventListener('touchend', this._handleDocumentClickBound);
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        // onClose callback
        if (typeof this.options.onClose === 'function') {
          this.options.onClose.call(this, this.$origin[0]);
        }
        this.isOpen = false;
        this.wrapper.classList.remove('open');
        document.body.removeEventListener('click', this._handleDocumentClickBound, true);
        document.body.removeEventListener('touchend', this._handleDocumentClickBound);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(TapTarget.__proto__ || Object.getPrototypeOf(TapTarget), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_TapTarget;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return TapTarget;
  })(Component);
  M.TapTarget = TapTarget;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(TapTarget, 'tapTarget', 'M_TapTarget');
  }
})(cash);
;
(function ($) {
  "use strict";
  var _defaults = {
    classes: '',
    dropdownOptions: {}
  };
  /**
  * @class
  *
  */
  var FormSelect = (function (_Component20) {
    _inherits(FormSelect, _Component20);
    /**
    * Construct FormSelect instance
    * @constructor
    * @param {Element} el
    * @param {Object} options
    */
    function FormSelect(el, options) {
      _classCallCheck(this, FormSelect);
      // Don't init if browser default version
      var _this68 = _possibleConstructorReturn(this, (FormSelect.__proto__ || Object.getPrototypeOf(FormSelect)).call(this, FormSelect, el, options));
      if (_this68.$el.hasClass('browser-default')) {
        return _possibleConstructorReturn(_this68);
      }
      _this68.el.M_FormSelect = _this68;
      /**
      * Options for the select
      * @member FormSelect#options
      */
      _this68.options = $.extend({}, FormSelect.defaults, options);
      _this68.isMultiple = _this68.$el.prop('multiple');
      // Setup
      _this68.el.tabIndex = -1;
      _this68._keysSelected = {};
      _this68._valueDict = {};
      // Maps key to original and generated option element.
      _this68._setupDropdown();
      _this68._setupEventHandlers();
      return _this68;
    }
    _createClass(FormSelect, [{
      key: "destroy",
      /**
      * Teardown component
      */
      value: function destroy() {
        this._removeEventHandlers();
        this._removeDropdown();
        this.el.M_FormSelect = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this69 = this;
        this._handleSelectChangeBound = this._handleSelectChange.bind(this);
        this._handleOptionClickBound = this._handleOptionClick.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        $(this.dropdownOptions).find('li:not(.optgroup)').each(function (el) {
          el.addEventListener('click', _this69._handleOptionClickBound);
        });
        this.el.addEventListener('change', this._handleSelectChangeBound);
        this.input.addEventListener('click', this._handleInputClickBound);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this70 = this;
        $(this.dropdownOptions).find('li:not(.optgroup)').each(function (el) {
          el.removeEventListener('click', _this70._handleOptionClickBound);
        });
        this.el.removeEventListener('change', this._handleSelectChangeBound);
        this.input.removeEventListener('click', this._handleInputClickBound);
      }
    }, {
      key: "_handleSelectChange",
      value: function _handleSelectChange(e) {
        this._setValueToInput();
      }
    }, {
      key: "_handleOptionClick",
      value: function _handleOptionClick(e) {
        e.preventDefault();
        var option = $(e.target).closest('li')[0];
        var key = option.id;
        if (!$(option).hasClass('disabled') && !$(option).hasClass('optgroup') && key.length) {
          var selected = true;
          if (this.isMultiple) {
            // Deselect placeholder option if still selected.
            var placeholderOption = $(this.dropdownOptions).find('li.disabled.selected');
            if (placeholderOption.length) {
              placeholderOption.removeClass('selected');
              placeholderOption.find('input[type="checkbox"]').prop('checked', false);
              this._toggleEntryFromArray(placeholderOption[0].id);
            }
            selected = this._toggleEntryFromArray(key);
          } else {
            $(this.dropdownOptions).find('li').removeClass('selected');
            $(option).toggleClass('selected', selected);
          }
          // Set selected on original select option
          // Only trigger if selected state changed
          var prevSelected = $(this._valueDict[key].el).prop('selected');
          if (prevSelected !== selected) {
            $(this._valueDict[key].el).prop('selected', selected);
            this.$el.trigger('change');
          }
        }
        e.stopPropagation();
      }
    }, {
      key: "_handleInputClick",
      value: function _handleInputClick() {
        if (this.dropdown && this.dropdown.isOpen) {
          this._setValueToInput();
          this._setSelectedStates();
        }
      }
    }, {
      key: "_setupDropdown",
      value: function _setupDropdown() {
        var _this71 = this;
        this.wrapper = document.createElement('div');
        $(this.wrapper).addClass('select-wrapper ' + this.options.classes);
        this.$el.before($(this.wrapper));
        this.wrapper.appendChild(this.el);
        if (this.el.disabled) {
          this.wrapper.classList.add('disabled');
        }
        // Create dropdown
        this.$selectOptions = this.$el.children('option, optgroup');
        this.dropdownOptions = document.createElement('ul');
        this.dropdownOptions.id = "select-options-" + M.guid();
        $(this.dropdownOptions).addClass('dropdown-content select-dropdown ' + (this.isMultiple ? 'multiple-select-dropdown' : ''));
        // Create dropdown structure.
        if (this.$selectOptions.length) {
          this.$selectOptions.each(function (el) {
            if ($(el).is('option')) {
              // Direct descendant option.
              var optionEl = void 0;
              if (_this71.isMultiple) {
                optionEl = _this71._appendOptionWithIcon(_this71.$el, el, 'multiple');
              } else {
                optionEl = _this71._appendOptionWithIcon(_this71.$el, el);
              }
              _this71._addOptionToValueDict(el, optionEl);
            } else if ($(el).is('optgroup')) {
              // Optgroup.
              var selectOptions = $(el).children('option');
              $(_this71.dropdownOptions).append($('<li class="optgroup"><span>' + el.getAttribute('label') + '</span></li>')[0]);
              selectOptions.each(function (el) {
                var optionEl = _this71._appendOptionWithIcon(_this71.$el, el, 'optgroup-option');
                _this71._addOptionToValueDict(el, optionEl);
              });
            }
          });
        }
        this.$el.after(this.dropdownOptions);
        // Add input dropdown
        this.input = document.createElement('input');
        $(this.input).addClass('select-dropdown dropdown-trigger');
        this.input.setAttribute('type', 'text');
        this.input.setAttribute('readonly', 'true');
        this.input.setAttribute('data-target', this.dropdownOptions.id);
        if (this.el.disabled) {
          $(this.input).prop('disabled', 'true');
        }
        this.$el.before(this.input);
        this._setValueToInput();
        // Add caret
        var dropdownIcon = $('<svg class="caret" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>');
        this.$el.before(dropdownIcon[0]);
        // Initialize dropdown
        if (!this.el.disabled) {
          var dropdownOptions = $.extend({}, this.options.dropdownOptions);
          // Add callback for centering selected option when dropdown content is scrollable
          dropdownOptions.onOpenEnd = function (el) {
            var selectedOption = $(_this71.dropdownOptions).find('.selected').first();
            if (selectedOption.length) {
              // Focus selected option in dropdown
              M.keyDown = true;
              _this71.dropdown.focusedIndex = selectedOption.index();
              _this71.dropdown._focusFocusedItem();
              M.keyDown = false;
              // Handle scrolling to selected option
              if (_this71.dropdown.isScrollable) {
                var scrollOffset = selectedOption[0].getBoundingClientRect().top - _this71.dropdownOptions.getBoundingClientRect().top;
                // scroll to selected option
                scrollOffset -= _this71.dropdownOptions.clientHeight / 2;
                // center in dropdown
                _this71.dropdownOptions.scrollTop = scrollOffset;
              }
            }
          };
          if (this.isMultiple) {
            dropdownOptions.closeOnClick = false;
          }
          this.dropdown = M.Dropdown.init(this.input, dropdownOptions);
        }
        // Add initial selections
        this._setSelectedStates();
      }
    }, {
      key: "_addOptionToValueDict",
      value: function _addOptionToValueDict(el, optionEl) {
        var index = Object.keys(this._valueDict).length;
        var key = this.dropdownOptions.id + index;
        var obj = {};
        optionEl.id = key;
        obj.el = el;
        obj.optionEl = optionEl;
        this._valueDict[key] = obj;
      }
    }, {
      key: "_removeDropdown",
      value: function _removeDropdown() {
        $(this.wrapper).find('.caret').remove();
        $(this.input).remove();
        $(this.dropdownOptions).remove();
        $(this.wrapper).before(this.$el);
        $(this.wrapper).remove();
      }
    }, {
      key: "_appendOptionWithIcon",
      value: function _appendOptionWithIcon(select, option, type) {
        // Add disabled attr if disabled
        var disabledClass = option.disabled ? 'disabled ' : '';
        var optgroupClass = type === 'optgroup-option' ? 'optgroup-option ' : '';
        var multipleCheckbox = this.isMultiple ? "<label><input type=\"checkbox\"" + disabledClass + "\"/><span>" + option.innerHTML + "</span></label>" : option.innerHTML;
        var liEl = $('<li></li>');
        var spanEl = $('<span></span>');
        spanEl.html(multipleCheckbox);
        liEl.addClass(disabledClass + " " + optgroupClass);
        liEl.append(spanEl);
        // add icons
        var iconUrl = option.getAttribute('data-icon');
        if (!!iconUrl) {
          var imgEl = $("<img alt=\"\" src=\"" + iconUrl + "\">");
          liEl.prepend(imgEl);
        }
        // Check for multiple type.
        $(this.dropdownOptions).append(liEl[0]);
        return liEl[0];
      }
    }, {
      key: "_toggleEntryFromArray",
      value: function _toggleEntryFromArray(key) {
        var notAdded = !this._keysSelected.hasOwnProperty(key);
        var $optionLi = $(this._valueDict[key].optionEl);
        if (notAdded) {
          this._keysSelected[key] = true;
        } else {
          delete this._keysSelected[key];
        }
        $optionLi.toggleClass('selected', notAdded);
        // Set checkbox checked value
        $optionLi.find('input[type="checkbox"]').prop('checked', notAdded);
        // use notAdded instead of true (to detect if the option is selected or not)
        $optionLi.prop('selected', notAdded);
        return notAdded;
      }
    }, {
      key: "_setValueToInput",
      value: function _setValueToInput() {
        var values = [];
        var options = this.$el.find('option');
        options.each(function (el) {
          if ($(el).prop('selected')) {
            var text = $(el).text();
            values.push(text);
          }
        });
        if (!values.length) {
          var firstDisabled = this.$el.find('option:disabled').eq(0);
          if (firstDisabled.length && firstDisabled[0].value === '') {
            values.push(firstDisabled.text());
          }
        }
        this.input.value = values.join(', ');
      }
    }, {
      key: "_setSelectedStates",
      value: function _setSelectedStates() {
        this._keysSelected = {};
        for (var key in this._valueDict) {
          var option = this._valueDict[key];
          var optionIsSelected = $(option.el).prop('selected');
          $(option.optionEl).find('input[type="checkbox"]').prop('checked', optionIsSelected);
          if (optionIsSelected) {
            this._activateOption($(this.dropdownOptions), $(option.optionEl));
            this._keysSelected[key] = true;
          } else {
            $(option.optionEl).removeClass('selected');
          }
        }
      }
    }, {
      key: "_activateOption",
      value: function _activateOption(collection, newOption) {
        if (newOption) {
          if (!this.isMultiple) {
            collection.find('li.selected').removeClass('selected');
          }
          var option = $(newOption);
          option.addClass('selected');
        }
      }
    }, {
      key: "getSelectedValues",
      value: function getSelectedValues() {
        var selectedValues = [];
        for (var key in this._keysSelected) {
          selectedValues.push(this._valueDict[key].el.value);
        }
        return selectedValues;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(FormSelect.__proto__ || Object.getPrototypeOf(FormSelect), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_FormSelect;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return FormSelect;
  })(Component);
  M.FormSelect = FormSelect;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(FormSelect, 'formSelect', 'M_FormSelect');
  }
})(cash);
;
(function ($, anim) {
  "use strict";
  var _defaults = {};
  /**
  * @class
  *
  */
  var Range = (function (_Component21) {
    _inherits(Range, _Component21);
    /**
    * Construct Range instance
    * @constructor
    * @param {Element} el
    * @param {Object} options
    */
    function Range(el, options) {
      _classCallCheck(this, Range);
      var _this72 = _possibleConstructorReturn(this, (Range.__proto__ || Object.getPrototypeOf(Range)).call(this, Range, el, options));
      _this72.el.M_Range = _this72;
      /**
      * Options for the range
      * @member Range#options
      */
      _this72.options = $.extend({}, Range.defaults, options);
      _this72._mousedown = false;
      // Setup
      _this72._setupThumb();
      _this72._setupEventHandlers();
      return _this72;
    }
    _createClass(Range, [{
      key: "destroy",
      /**
      * Teardown component
      */
      value: function destroy() {
        this._removeEventHandlers();
        this._removeThumb();
        this.el.M_Range = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleRangeChangeBound = this._handleRangeChange.bind(this);
        this._handleRangeMousedownTouchstartBound = this._handleRangeMousedownTouchstart.bind(this);
        this._handleRangeInputMousemoveTouchmoveBound = this._handleRangeInputMousemoveTouchmove.bind(this);
        this._handleRangeMouseupTouchendBound = this._handleRangeMouseupTouchend.bind(this);
        this._handleRangeBlurMouseoutTouchleaveBound = this._handleRangeBlurMouseoutTouchleave.bind(this);
        this.el.addEventListener('change', this._handleRangeChangeBound);
        this.el.addEventListener('mousedown', this._handleRangeMousedownTouchstartBound);
        this.el.addEventListener('touchstart', this._handleRangeMousedownTouchstartBound);
        this.el.addEventListener('input', this._handleRangeInputMousemoveTouchmoveBound);
        this.el.addEventListener('mousemove', this._handleRangeInputMousemoveTouchmoveBound);
        this.el.addEventListener('touchmove', this._handleRangeInputMousemoveTouchmoveBound);
        this.el.addEventListener('mouseup', this._handleRangeMouseupTouchendBound);
        this.el.addEventListener('touchend', this._handleRangeMouseupTouchendBound);
        this.el.addEventListener('blur', this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.addEventListener('mouseout', this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.addEventListener('touchleave', this._handleRangeBlurMouseoutTouchleaveBound);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener('change', this._handleRangeChangeBound);
        this.el.removeEventListener('mousedown', this._handleRangeMousedownTouchstartBound);
        this.el.removeEventListener('touchstart', this._handleRangeMousedownTouchstartBound);
        this.el.removeEventListener('input', this._handleRangeInputMousemoveTouchmoveBound);
        this.el.removeEventListener('mousemove', this._handleRangeInputMousemoveTouchmoveBound);
        this.el.removeEventListener('touchmove', this._handleRangeInputMousemoveTouchmoveBound);
        this.el.removeEventListener('mouseup', this._handleRangeMouseupTouchendBound);
        this.el.removeEventListener('touchend', this._handleRangeMouseupTouchendBound);
        this.el.removeEventListener('blur', this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.removeEventListener('mouseout', this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.removeEventListener('touchleave', this._handleRangeBlurMouseoutTouchleaveBound);
      }
    }, {
      key: "_handleRangeChange",
      value: function _handleRangeChange() {
        $(this.value).html(this.$el.val());
        if (!$(this.thumb).hasClass('active')) {
          this._showRangeBubble();
        }
        var offsetLeft = this._calcRangeOffset();
        $(this.thumb).addClass('active').css('left', offsetLeft + 'px');
      }
    }, {
      key: "_handleRangeMousedownTouchstart",
      value: function _handleRangeMousedownTouchstart(e) {
        // Set indicator value
        $(this.value).html(this.$el.val());
        this._mousedown = true;
        this.$el.addClass('active');
        if (!$(this.thumb).hasClass('active')) {
          this._showRangeBubble();
        }
        if (e.type !== 'input') {
          var offsetLeft = this._calcRangeOffset();
          $(this.thumb).addClass('active').css('left', offsetLeft + 'px');
        }
      }
    }, {
      key: "_handleRangeInputMousemoveTouchmove",
      value: function _handleRangeInputMousemoveTouchmove() {
        if (this._mousedown) {
          if (!$(this.thumb).hasClass('active')) {
            this._showRangeBubble();
          }
          var offsetLeft = this._calcRangeOffset();
          $(this.thumb).addClass('active').css('left', offsetLeft + 'px');
          $(this.value).html(this.$el.val());
        }
      }
    }, {
      key: "_handleRangeMouseupTouchend",
      value: function _handleRangeMouseupTouchend() {
        this._mousedown = false;
        this.$el.removeClass('active');
      }
    }, {
      key: "_handleRangeBlurMouseoutTouchleave",
      value: function _handleRangeBlurMouseoutTouchleave() {
        if (!this._mousedown) {
          var paddingLeft = parseInt(this.$el.css('padding-left'));
          var marginLeft = 7 + paddingLeft + 'px';
          if ($(this.thumb).hasClass('active')) {
            anim.remove(this.thumb);
            anim({
              targets: this.thumb,
              height: 0,
              width: 0,
              top: 10,
              easing: 'easeOutQuad',
              marginLeft: marginLeft,
              duration: 100
            });
          }
          $(this.thumb).removeClass('active');
        }
      }
    }, {
      key: "_setupThumb",
      value: function _setupThumb() {
        this.thumb = document.createElement('span');
        this.value = document.createElement('span');
        $(this.thumb).addClass('thumb');
        $(this.value).addClass('value');
        $(this.thumb).append(this.value);
        this.$el.after(this.thumb);
      }
    }, {
      key: "_removeThumb",
      value: function _removeThumb() {
        $(this.thumb).remove();
      }
    }, {
      key: "_showRangeBubble",
      value: function _showRangeBubble() {
        var paddingLeft = parseInt($(this.thumb).parent().css('padding-left'));
        var marginLeft = -7 + paddingLeft + 'px';
        // TODO: fix magic number?
        anim.remove(this.thumb);
        anim({
          targets: this.thumb,
          height: 30,
          width: 30,
          top: -30,
          marginLeft: marginLeft,
          duration: 300,
          easing: 'easeOutQuint'
        });
      }
    }, {
      key: "_calcRangeOffset",
      value: function _calcRangeOffset() {
        var width = this.$el.width() - 15;
        var max = parseFloat(this.$el.attr('max')) || 100;
        // Range default max
        var min = parseFloat(this.$el.attr('min')) || 0;
        // Range default min
        var percent = (parseFloat(this.$el.val()) - min) / (max - min);
        return percent * width;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Range.__proto__ || Object.getPrototypeOf(Range), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Range;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Range;
  })(Component);
  M.Range = Range;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Range, 'range', 'M_Range');
  }
  Range.init($('input[type=range]'));
})(cash, M.anime);

},{}],"5J6sI":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "AboutPage", function () {
  return AboutPage;
});
var _mithril = require('mithril');
var _mithrilDefault = _parcelHelpers.interopDefault(_mithril);
const AboutPage = () => ({
  view: () => _mithrilDefault.default('.row', [_mithrilDefault.default('h1', 'About'), _mithrilDefault.default('h1', 'Attribution'), _mithrilDefault.default('ul.collection', [_mithrilDefault.default('li.collection-item', 'Logo: ideation by Vytautas Alech from the Noun Project.')])])
});

},{"mithril":"3cEwr","@parcel/transformer-js/lib/esmodule-helpers.js":"7ae6E"}],"7lkDx":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "ButtonPage", function () {
  return ButtonPage;
});
var _mithrilMaterialized = require('mithril-materialized');
var _mithril = require('mithril');
var _mithrilDefault = _parcelHelpers.interopDefault(_mithril);
const ButtonPage = () => {
  const onclick = () => alert('Button clicked');
  return {
    view: () => _mithrilDefault.default('.col.s12', [_mithrilDefault.default('h2.header', 'Buttons'), _mithrilDefault.default('h3.header[id=fab]', 'Floating Action Button (FAB)'), _mithrilDefault.default(_mithrilMaterialized.FloatingActionButton, {
      className: 'red',
      iconName: 'mode_edit',
      direction: 'left',
      position: 'inline-right',
      buttons: [{
        iconName: 'insert_chart',
        className: 'red',
        onClick: () => console.log('Insert chart')
      }, {
        iconName: 'format_quote',
        className: 'yellow darken-1',
        onClick: () => console.log('Format quote')
      }, {
        iconName: 'publish',
        className: 'green',
        onClick: () => console.log('Publish')
      }, {
        iconName: 'attach_file',
        className: 'blue',
        onClick: () => console.log('Attach file')
      }]
    }), _mithrilDefault.default(_mithrilMaterialized.FloatingActionButton, {
      className: 'red',
      iconName: 'mode_edit',
      direction: 'left',
      buttons: [{
        iconName: 'insert_chart',
        className: 'red',
        onClick: () => console.log('Insert chart')
      }, {
        iconName: 'format_quote',
        className: 'yellow darken-1',
        onClick: () => console.log('Format quote')
      }, {
        iconName: 'publish',
        className: 'green',
        onClick: () => console.log('Publish')
      }, {
        iconName: 'attach_file',
        className: 'blue',
        onClick: () => console.log('Attach file')
      }]
    }), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: [`m(FloatingActionButton, {
  className: 'red',
  iconName: 'mode_edit',
  direction: 'left',
  position: 'inline-right', // Comment this out to get a FAB in the bottom-left of the page.
  buttons: [
    { iconName: 'insert_chart', className: 'red', onClick: () => console.log('Insert chart') },
    { iconName: 'format_quote', className: 'yellow darken-1', onClick: () => console.log('Format quote') },
    { iconName: 'publish', className: 'green', onClick: () => console.log('Publish') },
    { iconName: 'attach_file', className: 'blue', onClick: () => console.log('Attach file') },
  ],
}),`]
    }), _mithrilDefault.default('h3.header[id=raised]', 'Raised'), _mithrilDefault.default('div', [_mithrilDefault.default(_mithrilMaterialized.Button, {
      label: 'First Button',
      onclick
    }), _mithrilDefault.default(_mithrilMaterialized.Button, {
      label: 'Second Button',
      iconName: 'cloud',
      onclick
    }), _mithrilDefault.default(_mithrilMaterialized.Button, {
      label: 'Third Button',
      iconName: 'cloud',
      iconClass: 'right',
      onclick
    })]), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: [`const onclick = () => alert('Button clicked');
m('div', [
  m(Button, { label: 'Button', onclick }),
  m(Button, { label: 'Button', iconName: 'cloud', onclick }),
  m(Button, { label: 'Button', iconName: 'cloud', iconClass: 'right', onclick }),
]),`]
    }), _mithrilDefault.default('h3.header[id=flatbutton]', 'FlatButton'), _mithrilDefault.default('div', _mithrilDefault.default(_mithrilMaterialized.FlatButton, {
      label: 'My Flat button',
      onclick
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: 'm(FlatButton, { label: "My Flat button", onclick })'
    }), _mithrilDefault.default('h3.header[id=roundiconbutton]', 'RoundIconButton'), _mithrilDefault.default('div', _mithrilDefault.default(_mithrilMaterialized.RoundIconButton, {
      iconName: 'create',
      onclick
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: 'm(RoundIconButton, { iconName: "create", onclick })'
    }), _mithrilDefault.default('h3.header[id=submitbutton]', 'SubmitButton'), _mithrilDefault.default('div', _mithrilDefault.default(_mithrilMaterialized.SubmitButton, {
      label: 'Submit',
      iconName: 'send',
      iconClass: 'right',
      onclick
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `m(SubmitButton, {
  label: 'Submit',
  iconName: 'send',
  iconClass: 'right',
  onclick,
})`
    })])
  };
};

},{"mithril-materialized":"6KIT1","mithril":"3cEwr","@parcel/transformer-js/lib/esmodule-helpers.js":"7ae6E"}],"1GAX3":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "InputPage", function () {
  return InputPage;
});
var _mithrilMaterialized = require('mithril-materialized');
var _mithril = require('mithril');
var _mithrilDefault = _parcelHelpers.interopDefault(_mithril);
const InputPage = () => {
  const onchange = v => alert(`Input changed. New value: ${v}`);
  let value = 'click_clear_to_remove.me';
  return {
    view: () => _mithrilDefault.default('.col.s12', [_mithrilDefault.default('h2.header', 'Inputs'), _mithrilDefault.default('h3.header', 'TextInput'), _mithrilDefault.default('h4.header', 'Normal text input'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.TextInput, {
      label: 'What is your name?',
      helperText: 'Please, be honest!',
      onchange,
      autocomplete: 'off',
      onkeyup: (ev, value) => console.log(value),
      autofocus: true,
      maxLength: 50
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `        m(TextInput, {
          label: 'What is your name?',
          helperText: 'Please, be honest!',
          onchange,
          onkeyup: (ev, value) => console.log(value),
          autofocus: true // This may also be a function that resolves to a boolean
          maxLength: 50,
        } as IInputOptions)`
    }), _mithrilDefault.default('h4.header', 'TextInput with icon'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.TextInput, {
      label: 'What is your name?',
      iconName: 'account_circle',
      onchange,
      maxLength: 50
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `        m(TextInput, {
          label: 'What is your name?',
          iconName: 'account_circle',
          onchange,
          maxLength: 50,
        } as IInputOptions)`
    }), _mithrilDefault.default('h4.header', 'TextInput with custom validation'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.TextInput, {
      label: 'What is the most popular search engine?',
      dataSuccess: 'Great minds think alike',
      dataError: 'Seriously?',
      validate: v => v && v.toLowerCase() === 'google'
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(TextInput, {
            label: 'What is the most popular search engine?',
            dataSuccess: 'Great minds think alike',
            dataError: 'Seriously?',
            validate: v => v && v.toLowerCase() === 'google',
          } as IInputOptions)`
    }), _mithrilDefault.default('h3.header', 'Autocomplete'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.Autocomplete, {
      label: 'What is your favorite company?',
      data: {
        Apple: null,
        Google: null,
        Facebook: null,
        PHILIPS: 'http://hdlighting-suriname.com/wp-content/uploads/2013/12/philips.png',
        TNO: 'https://github.com/TNOCS/spec-tool/raw/master/src/assets/tno.png'
      },
      onchange
    })), _mithrilDefault.default('span', _mithrilDefault.default('a[target=_blank][href=https://materializecss.com/autocomplete.html]', 'Documentation')), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `        m(Autocomplete, {
            label: 'What is your favorite company?',
            data: {
              Apple: null,
              Google: null,
              Facebook: null,
              PHILIPS: 'http://hdlighting-suriname.com/wp-content/uploads/2013/12/philips.png',
              TNO: 'https://github.com/TNOCS/spec-tool/raw/master/src/assets/tno.png',
            },
            onchange,
        } as IInputOptions)`
    }), _mithrilDefault.default('h3.header', 'TextArea'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.TextArea, {
      label: 'Please, could you describe yourself',
      helperText: `Don't be shy`,
      maxLength: 100,
      onchange
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `        m(TextArea, {
            label: 'Please, describe yourself',
            helperText: 'Don\'t be shy',
            maxLength: 100,
            onchange })`
    }), _mithrilDefault.default('h3.header', 'NumberInput'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.NumberInput, {
      min: 1,
      max: 120,
      step: 1,
      label: 'What is your age?',
      dataSuccess: 'You look much younger ;-)',
      dataError: 'Error: Age must be between 1 and 120.',
      onchange
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(NumberInput, {
            min: 1,
            max: 120,
            step: 1, // Default value is step increments of 1
            label: 'What is your age?',
            dataSuccess: 'You look much younger ;-)',
            dataError: 'Error: Age must be between 1 and 120.',
            onchange,
          })`
    }), _mithrilDefault.default('h4.header', 'NumberInput with custom validation'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.NumberInput, {
      label: 'What is the result of 35 + 7?',
      dataSuccess: 'Great, you have found the answer to the meaning of life, the universe and everything!',
      dataError: 'Back to grammar school',
      validate: v => v === 42
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(NumberInput, {
            label: 'What is the result of 35 + 7?',
            dataSuccess: 'Great, you have found the answer to the meaning of life, the universe and everything!',
            dataError: 'Back to grammar school',
            validate: (v: number) => v === 42,
          })`
    }), _mithrilDefault.default('h3.header', 'EmailInput'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.EmailInput, {
      label: 'What is your email?',
      dataError: 'Please use username@org.com',
      dataSuccess: 'OK',
      onchange
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(EmailInput, {
            label: 'What is your email?',
            dataError: 'Wrong, use username@org.com',
            dataSuccess: 'OK',
            onchange,
          })`
    }), _mithrilDefault.default('h3.header', 'UrlInput'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.UrlInput, {
      label: 'What is your favorite website?',
      placeholder: 'http(s)://',
      dataError: 'Wrong, use http(s)://org.com',
      dataSuccess: 'OK',
      onchange
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(UrlInput, {
            label: 'What is your favorite website?',
            placeholder: 'http(s)://',
            dataError: 'Wrong, use http(s)://org.com',
            dataSuccess: 'OK',
            onchange,
          })`
    }), _mithrilDefault.default('h3.header', 'PasswordInput'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.PasswordInput, {
      label: 'What is your password?',
      iconName: 'lock',
      onchange
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(PasswordInput, {
            label: 'What is your password?',
            iconName: 'lock',
            onchange,
          })`
    }), _mithrilDefault.default('h3.header', 'FileInput'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.FileInput, {
      placeholder: 'Upload one or more files',
      multiple: true,
      initialValue: value,
      accept: ['image/*', '.pdf'],
      onchange: files => {
        value = '';
        console.table(files);
      }
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `        m(FileInput, {
            placeholder: 'Upload one or more files',
            multiple: true,
            initialValue: value,
            accept: ['image/*', '.pdf'],
            onchange: (files: FileList) => console.table(files),
          })`
    }), _mithrilDefault.default('h3.header', 'RangeInput'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.RangeInput, {
      min: 0,
      max: 100,
      label: 'What is your favorite number between 0 and 100?',
      onchange
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(RangeInput, {
            min: 0,
            max: 100,
            label: 'What is your favorite number between 0 and 100?',
            onchange,
          })`
    }), _mithrilDefault.default('h3.header', 'Chips'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.Chips, {
      onchange: chips => onchange(JSON.stringify(chips)),
      label: 'An optional label',
      helperText: 'Optional help instructions',
      placeholder: 'Add a tag',
      secondaryPlaceholder: '+Tag',
      data: [{
        tag: 'Hello'
      }, {
        tag: 'World'
      }]
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(Chips, {
            onchange: (chips: M.ChipData[]) => onchange(JSON.stringify(chips)),
            label: 'An optional label',
            helperText: 'Optional help instructions',
            placeholder: 'Add a tag',
            secondaryPlaceholder: '+Tag',
            data: [{
              tag: 'Hello',
            }, {
              tag: 'World',
            }],
          })`
    }), _mithrilDefault.default('h3.header', 'Chips with auto-complete'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.Chips, {
      label: 'Cloud providers',
      autocompleteOptions: {
        data: {
          Apple: null,
          Microsoft: null,
          Google: null
        },
        limit: Infinity,
        minLength: 1
      }
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(Chips, {
            label: 'Cloud providers',
            autocompleteOptions: {
              data: {
                Apple: null,
                Microsoft: null,
                Google: null,
              },
              limit: Infinity,
              minLength: 1,
            },
          })`
    }), _mithrilDefault.default('h3.header', 'ColorInput'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.ColorInput, {
      label: 'What is your favorite color?',
      onchange
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(ColorInput, {
            label: 'What is your favorite color?',
            onchange,
          })`
    })])
  };
};

},{"mithril-materialized":"6KIT1","mithril":"3cEwr","@parcel/transformer-js/lib/esmodule-helpers.js":"7ae6E"}],"abfjp":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "PickerPage", function () {
  return PickerPage;
});
var _mithrilMaterialized = require('mithril-materialized');
var _mithril = require('mithril');
var _mithrilDefault = _parcelHelpers.interopDefault(_mithril);
const PickerPage = () => {
  const state = {
    disabled: false
  };
  const onchange = v => alert(`Input changed. New value: ${v}`);
  return {
    view: () => _mithrilDefault.default('.col.s12', [_mithrilDefault.default('h2.header', 'Pickers'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.Switch, {
      label: 'Disable pickers',
      left: 'enable',
      right: 'disable',
      onchange: v => state.disabled = v
    })), _mithrilDefault.default('h3.header', 'DatePicker'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.DatePicker, {
      disabled: state.disabled,
      format: 'mmmm d, yyyy',
      label: 'What is your birthday?',
      yearRange: [1900, new Date().getFullYear() - 17],
      initialValue: new Date(),
      onchange
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(DatePicker, {
            format: 'mmmm d, yyyy',
            label: 'What is your birthday?',
            yearRange: [1900, new Date().getFullYear() - 17],
            initialValue: new Date().toDateString(),
            onchange,
          })`
    }), _mithrilDefault.default('h3.header', 'TimePicker'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.TimePicker, {
      disabled: state.disabled,
      label: 'When do you normally get up?',
      twelveHour: false,
      initialValue: '09:00',
      onchange
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(TimePicker, {
            label: 'What is your birthday?',
            twelveHour: false,
            initialValue: '09:00',
            onchange,
          })`
    })])
  };
};

},{"mithril-materialized":"6KIT1","mithril":"3cEwr","@parcel/transformer-js/lib/esmodule-helpers.js":"7ae6E"}],"4c4bv":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "SelectionPage", function () {
  return SelectionPage;
});
var _mithril = require('mithril');
var _mithrilDefault = _parcelHelpers.interopDefault(_mithril);
var _mithrilMaterialized = require('mithril-materialized');
const SelectionPage = () => {
  const state = {
    radioIds: undefined,
    checkedId: undefined,
    initialValue: [0, 2]
  };
  const onchange = v => alert(`Input changed. New value: ${v}`);
  return {
    view: () => _mithrilDefault.default('.col.s12', [_mithrilDefault.default('h2.header', 'Selections'), _mithrilDefault.default('h3.header', 'Select'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.Select, {
      iconName: 'person',
      label: 'What is your favorite hobby?',
      // placeholder: 'Pick one', // Alternative to first option
      isMandatory: true,
      checkedId: state.checkedId,
      initialValue: state.checkedId,
      options: [{
        label: 'Pick one',
        disabled: true
      }, {
        id: 'movies',
        label: 'Watching movies'
      }, {
        id: 'out',
        label: 'Going out'
      }],
      onchange: ids => state.checkedId = ids
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      newRow: true,
      code: `          m(Select, {
            // disabled: true, // Add disabled if you want to disable the select control
            iconName: 'person',
            label: 'What is your favorite hobby?',
            // placeholder: 'Pick one', // Alternative to first option
            isMandatory: true,
            options: [
              { label: 'Pick one', disabled: true }, // IDs are optional: ID = label when missing
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
            ],
            onchange,
          })`
    }), _mithrilDefault.default('h3.header', 'Select multiple'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.Select, {
      multiple: true,
      placeholder: 'Make a choice...',
      label: 'What are your favorite hobbies?',
      initialValue: state.initialValue,
      onchange: v => {
        // state.initialValue = v as number[];
        console.log(v);
      },
      options: [{
        id: 0,
        label: 'Watching movies'
      }, {
        id: 1,
        label: 'Going out'
      }, {
        id: 2,
        label: 'Reading'
      }, {
        id: 3,
        label: 'Sex',
        disabled: true
      }, {
        id: 4,
        label: 'Horse riding'
      }]
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      newRow: true,
      code: `          m(
            '.row',
            m(Select, {
              multiple: true,
              placeholder: 'Make a choice...',
              label: 'What are your favorite hobbies?',
              initialValue: state.initialValue, // [0, 2]
              onchange: v => {
                state.initialValue = v as number[];
                console.log(v);
              },
              options: [
                { id: 0, label: 'Watching movies' },
                { id: 1, label: 'Going out' },
                { id: 2, label: 'Reading' },
                { id: 3, label: 'Sex', disabled: true },
                { id: 4, label: 'Horse riding' },
              ],
            } as ISelectOptions<number>)
          )`
    }), _mithrilDefault.default('h3.header', 'Options'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.Options, {
      label: 'What are your favorite hobbies?',
      checkboxClass: 'col s4',
      isMandatory: true,
      initialValue: 'out',
      options: [{
        id: 'movies',
        label: 'Watching movies'
      }, {
        id: 'out',
        label: 'Going out'
      }, {
        id: 'sex',
        label: 'Sex',
        disabled: true
      }],
      onchange: ids => onchange(`Options ${ids.join()} are checked.`)
    })), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.Options, {
      label: 'What are your favorite hobbies?',
      isMandatory: true,
      initialValue: 'out',
      options: [{
        id: 'movies',
        label: 'Watching movies'
      }, {
        id: 'out',
        label: 'Going out'
      }, {
        id: 'sex',
        label: 'Sex',
        disabled: true
      }],
      onchange: ids => onchange(`Options ${ids.join()} are checked.`)
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      newRow: true,
      code: `          m(Options, {
            inline: true, // next one is false
            label: 'What are your favorite hobbies?',
            isMandatory: true,
            initialValue: 'out',
            options: [
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
              { id: 'sex', label: 'Sex', disabled: true },
            ],
            onchange: ids => onchange(\`Options \${ids.join()} are checked.\`),
          })`
    }), _mithrilDefault.default('h3.header', 'RadioButtons'), _mithrilDefault.default('p', 'Linked radio buttons: when you change one of them, the other changes too.'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.RadioButtons, {
      checkboxClass: 'col s4',
      label: 'What is your favorite hobby?',
      options: [{
        id: 'movies',
        label: 'Watching movies'
      }, {
        id: 'out',
        label: 'Going out'
      }, {
        id: 'sex',
        label: 'Sex',
        disabled: true
      }],
      initialValue: 'out',
      checkedId: state.radioIds,
      onchange: ids => state.radioIds = ids
    })), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.RadioButtons, {
      label: 'What is your favorite hobby?',
      options: [{
        id: 'movies',
        label: 'Watching movies'
      }, {
        id: 'out',
        label: 'Going out'
      }, {
        id: 'sex',
        label: 'Sex',
        disabled: true
      }],
      initialValue: 'out',
      checkedId: state.radioIds,
      onchange: ids => state.radioIds = ids
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      newRow: true,
      code: `          m(RadioButtons, {
            checkboxClass: 'col s4', // to align items horizontally
            label: 'What is your favorite hobby?',
            options: [
              { id: 'movies', label: 'Watching movies' },
              { id: 'out', label: 'Going out' },
              { id: 'sex', label: 'Sex', disabled: true },
            ],
            checkedId: state.radioIds,
            onchange: ids => state.radioIds = ids,
          })`
    }), _mithrilDefault.default('h3.header', 'Switch'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.Switch, {
      label: 'What is your gender?',
      left: 'Man',
      right: 'Woman',
      onchange
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      newRow: true,
      code: `          m(Switch, {
            label: 'What is your gender?',
            left: 'Man',
            right: 'Woman',
            onchange,
          })`
    }), _mithrilDefault.default('h3.header', 'Dropdown'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.Dropdown, {
      id: 'hobby',
      iconName: 'my_location',
      label: 'Pick a hobby',
      helperText: 'Help me',
      className: 'col s6',
      // disabled: true,
      initialValue: 'movies',
      items: [{
        label: 'Movies',
        id: 'movies',
        iconName: 'local_movies'
      }, {
        label: 'Reading',
        id: 'reading',
        iconName: 'import_contacts'
      }, {
        label: 'Eating',
        id: 'eating',
        iconName: 'restaurant'
      }, {
        label: '',
        divider: true
      }, {
        label: 'Sex',
        id: 'sex',
        iconName: 'group'
      }],
      onchange: v => console.log(v)
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      newRow: true,
      code: `          m(Dropdown, {
            id: 'hobby',
            iconName: 'my_location',
            label: 'Pick a hobby',
            helperText: 'Help me',
            className: 'col s6',
            // disabled: true,
            initialValue: 'movies',
            items: [
              { label: 'Movies', id: 'movies', iconName: 'local_movies' },
              { label: 'Reading', id: 'reading', iconName: 'import_contacts' },
              { label: 'Eating', id: 'eating', iconName: 'restaurant' },
              { label: '', divider: true },
              { label: 'Sex', id: 'sex', iconName: 'group' },
            ],
            onchange,
          })`
    })])
  };
};

},{"mithril":"3cEwr","mithril-materialized":"6KIT1","@parcel/transformer-js/lib/esmodule-helpers.js":"7ae6E"}],"44n8f":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "ModalPage", function () {
  return ModalPage;
});
var _mithril = require('mithril');
var _mithrilDefault = _parcelHelpers.interopDefault(_mithril);
var _mithrilMaterialized = require('mithril-materialized');
var _urlAssetsVincent_van_Gogh__Landscape_at_twilight__Google_Art_ProjectJpg = require('url:../../assets/Vincent_van_Gogh_-_Landscape_at_twilight_-_Google_Art_Project.jpg');
var _urlAssetsVincent_van_Gogh__Landscape_at_twilight__Google_Art_ProjectJpgDefault = _parcelHelpers.interopDefault(_urlAssetsVincent_van_Gogh__Landscape_at_twilight__Google_Art_ProjectJpg);
const ModalPage = () => {
  const onchange = v => alert(v);
  return {
    view: () => _mithrilDefault.default('.col.s12', [_mithrilDefault.default('h2.header', 'Modals'), _mithrilDefault.default('p', ['The library supports all three modals types that are defined on the ', _mithrilDefault.default('a[href=https://materializecss.com/modals.html#!][target=_blank]', 'materialize-css website'), '.']), _mithrilDefault.default('h3.header', 'Normal Modal'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.Button, {
      label: 'Open modal',
      modalId: 'modal1'
    }), _mithrilDefault.default(_mithrilMaterialized.ModalPanel, {
      id: 'modal1',
      title: 'Do you like this library?',
      description: 'This is some content.',
      options: {
        opacity: 0.7
      },
      buttons: [{
        label: 'Disagree',
        onclick: () => onchange('You make me sad...')
      }, {
        label: 'Agree',
        onclick: () => onchange('Thank you for the compliment!')
      }]
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(Button, { label: 'Open modal', modalId: 'modal1' }),
          m(ModalPanel, {
            id: 'modal1',
            title: 'Do you like this library?',
            description: 'This is some content.',
            options: { opacity: 0.7 },
            buttons: [
              {
                label: 'Disagree',
                onclick: () => onchange('You make me sad...'),
              },
              {
                label: 'Agree',
                onclick: () => onchange('Thank you for the compliment!'),
              },
            ],
          })`
    }), _mithrilDefault.default('h3.header', 'Normal Modal with Select and Dropdown'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.Button, {
      label: 'Open modal',
      modalId: 'modal1b'
    }), _mithrilDefault.default(_mithrilMaterialized.ModalPanel, {
      id: 'modal1b',
      title: 'Tell me about yourself',
      description: _mithrilDefault.default('.row', // So the content has enough vertical space
      [_mithrilDefault.default(_mithrilMaterialized.Select, {
        dropdownOptions: {
          container: document.body
        },
        // So the select is not hidden
        iconName: 'person',
        label: 'What is your favorite hobby?',
        placeholder: 'Pick one',
        isMandatory: true,
        options: [{
          label: 'Pick one',
          disabled: true
        }, {
          id: 'movies',
          label: 'Watching movies'
        }, {
          id: 'out',
          label: 'Going out'
        }, {
          id: 'sex',
          label: 'Having sex'
        }, {
          id: 'fitness',
          label: 'Fitness'
        }, {
          id: 'sleep',
          label: 'Sleeping'
        }],
        onchange: v => console.log(v)
      }), _mithrilDefault.default(_mithrilMaterialized.Dropdown, {
        container: document.body,
        // So the dropdown is not hidden
        id: 'hobby',
        iconName: 'my_location',
        label: 'Pick a hobby',
        helperText: 'Help me',
        className: 'col s6',
        items: [{
          label: 'Movies',
          id: 'movies',
          iconName: 'local_movies'
        }, {
          label: 'Reading',
          id: 'reading',
          iconName: 'import_contacts'
        }, {
          label: 'Eating',
          id: 'eating',
          iconName: 'restaurant'
        }, {
          label: '',
          divider: true
        }, {
          label: 'Sex',
          id: 'sex',
          iconName: 'group'
        }],
        onchange: v => console.log(v)
      })]),
      options: {
        opacity: 0.7
      },
      buttons: [{
        label: 'Disagree'
      }, {
        label: 'Agree'
      }]
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(Button, { label: 'Open modal', modalId: 'modal1b' }),
          m(ModalPanel, {
            id: 'modal1b',
            title: 'Tell me about yourself',
            description: m(
              '.row', // So the content has enough vertical space
              [
                m(Select, {
                  dropdownOptions: { container: document.body }, // So the select is not hidden
                  iconName: 'person',
                  label: 'What is your favorite hobby?',
                  placeholder: 'Pick one',
                  isMandatory: true,
                  options: [
                    { label: 'Pick one', disabled: true },
                    { id: 'movies', label: 'Watching movies' },
                    { id: 'out', label: 'Going out' },
                    { id: 'sex', label: 'Having sex' },
                    { id: 'fitness', label: 'Fitness' },
                    { id: 'sleep', label: 'Sleeping' },
                  ],
                  onchange: v => console.log(v),
                } as ISelectOptions),
                m(Dropdown, {
                  container: document.body, // So the dropdown is not hidden
                  id: 'hobby',
                  iconName: 'my_location',
                  label: 'Pick a hobby',
                  helperText: 'Help me',
                  className: 'col s6',
                  items: [
                    { label: 'Movies', id: 'movies', iconName: 'local_movies' },
                    { label: 'Reading', id: 'reading', iconName: 'import_contacts' },
                    { label: 'Eating', id: 'eating', iconName: 'restaurant' },
                    { label: '', divider: true },
                    { label: 'Sex', id: 'sex', iconName: 'group' },
                  ],
                  onchange: v => console.log(v),
                } as IDropdownOptions),
              ]
            ),
            options: { opacity: 0.7 },
            buttons: [
              {
                label: 'Disagree',
              },
              {
                label: 'Agree',
              },
            ],
          })`
    }), _mithrilDefault.default('h3.header', 'Fixed Footer Modal'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.Button, {
      label: 'Fixed footer modal',
      modalId: 'modal2'
    }), _mithrilDefault.default(_mithrilMaterialized.ModalPanel, {
      id: 'modal2',
      title: 'Do you like this library?',
      fixedFooter: true,
      richContent: true,
      description: `This is some content.<br><br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
This is some content.<br>
            `,
      buttons: [{
        label: 'Disagree',
        onclick: () => onchange('You make me sad...')
      }, {
        label: 'Agree',
        onclick: () => onchange('Thank you for the compliment!')
      }]
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(Button, { label: 'Bottom modal', modalId: 'modal3' }),
          m(ModalPanel, {
            id: 'modal3',
            title: 'Do you like this library?',
            description: 'This is some content. ... and much more',
            fixedFooter: true,
            richContent: true, // If richContent is true, it means that the description may contain HTML.
            buttons: [
              {
                label: 'Disagree',
                onclick: () => onchange('You make me sad...'),
              },
              {
                label: 'Agree',
                onclick: () => onchange('Thank you for the compliment!'),
              },
            ],
          })`
    }), _mithrilDefault.default('h3.header', 'Bottom Modal'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.Button, {
      label: 'Open bottom modal',
      modalId: 'modal3'
    }), _mithrilDefault.default(_mithrilMaterialized.ModalPanel, {
      id: 'modal3',
      title: 'Do you like this library?',
      description: 'This is some content.',
      bottomSheet: true,
      buttons: [{
        label: 'Disagree',
        onclick: () => onchange('You make me sad...')
      }, {
        label: 'Agree',
        onclick: () => onchange('Thank you for the compliment!')
      }]
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(Button, { label: 'Open modal', modalId: 'modal1' }),
          m(ModalPanel, {
            id: 'modal1',
            title: 'Do you like this library?',
            description: 'This is some content.',
            bottomSheet: true,
            buttons: [
              {
                label: 'Disagree',
                onclick: () => onchange('You make me sad...'),
              },
              {
                label: 'Agree',
                onclick: () => onchange('Thank you for the compliment!'),
              },
            ],
          })`
    }), _mithrilDefault.default('h3.header', 'Vnode as content'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.Button, {
      label: 'Open bottom content modal',
      modalId: 'modal4'
    }), _mithrilDefault.default(_mithrilMaterialized.ModalPanel, {
      id: 'modal4',
      title: 'Content modal',
      description: _mithrilDefault.default(_mithrilMaterialized.MaterialBox, {
        src: _urlAssetsVincent_van_Gogh__Landscape_at_twilight__Google_Art_ProjectJpgDefault.default,
        width: 400
      }),
      bottomSheet: true
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(Button, { label: 'Open bottom content modal', modalId: 'modal4' }),
          m(ModalPanel, {
            id: 'modal4',
            title: 'Content modal',
            description: m(MaterialBox, { src: gogh, width: 400 }),
            bottomSheet: true,
          })`
    })])
  };
};

},{"mithril":"3cEwr","mithril-materialized":"6KIT1","@parcel/transformer-js/lib/esmodule-helpers.js":"7ae6E","url:../../assets/Vincent_van_Gogh_-_Landscape_at_twilight_-_Google_Art_Project.jpg":"7IIiv"}],"7IIiv":[function(require,module,exports) {
module.exports = require('./bundle-url').getBundleURL() + "Vincent_van_Gogh_-_Landscape_at_twilight_-_Google_Art_Project.2ea6722b.jpg"
},{"./bundle-url":"3lGz9"}],"3lGz9":[function(require,module,exports) {
"use strict";

/* globals document:readonly */
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
} // TODO: Replace uses with `new URL(url).origin` when ie11 is no longer supported.


function getOrigin(url) {
  let matches = ('' + url).match(/(https?|file|ftp):\/\/[^/]+/);

  if (!matches) {
    throw new Error('Origin not found');
  }

  return matches[0];
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
exports.getOrigin = getOrigin;
},{}],"6uXyH":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "MiscPage", function () {
  return MiscPage;
});
var _mithrilMaterialized = require('mithril-materialized');
var _mithril = require('mithril');
var _mithrilDefault = _parcelHelpers.interopDefault(_mithril);
var _urlAssetsVincent_van_Gogh__Landscape_at_twilight__Google_Art_ProjectJpg = require('url:../../assets/Vincent_van_Gogh_-_Landscape_at_twilight_-_Google_Art_Project.jpg');
var _urlAssetsVincent_van_Gogh__Landscape_at_twilight__Google_Art_ProjectJpgDefault = _parcelHelpers.interopDefault(_urlAssetsVincent_van_Gogh__Landscape_at_twilight__Google_Art_ProjectJpg);
const MiscPage = () => {
  const state = {
    activeTabId: '',
    disabled: true,
    activeTab: 3,
    tabWidthId: 2,
    tabWidths: ['auto', 'fixed', 'fill']
  };
  const curPage = () => _mithrilDefault.default.route.param('page') ? +_mithrilDefault.default.route.param('page') : 1;
  return {
    view: () => _mithrilDefault.default('.col.s12', [_mithrilDefault.default('h2.header', 'Miscellaneous'), _mithrilDefault.default('p', ['Some miscellaneous components, like the ', _mithrilDefault.default('a[href=https://materializecss.com/tabs.html][target=_blank]', 'Tabs'), ', ', _mithrilDefault.default('a[href=https://materializecss.com/media.html][target=_blank]', 'Material box'), ', ', _mithrilDefault.default('a[href=https://materializecss.com/collection.html][target=_blank]', 'Collection'), ', ', _mithrilDefault.default('a[href=https://materializecss.com/collapsible.html][target=_blank]', 'Collapsible'), ', ', _mithrilDefault.default('a[href=https://materializecss.com/carousel.html][target=_blank]', 'Carousel'), ', ', _mithrilDefault.default('a[href=https://materializecss.com/parallax.html][target=_blank]', 'Pagination'), ' and the ', _mithrilDefault.default('a[href=https://materializecss.com/pagination.html][target=_blank]', 'Parallax'), '.']), _mithrilDefault.default('h3.header', 'Tabs'), _mithrilDefault.default(_mithrilMaterialized.Tabs, {
      selectedTabId: state.activeTabId,
      tabWidth: state.tabWidths[state.tabWidthId % 3],
      onShow: console.log,
      tabs: [{
        title: 'Test 1',
        active: state.activeTab === 1,
        vnode: _mithrilDefault.default('', 'Show content of tab 1')
      }, {
        title: 'Test 2',
        disabled: state.disabled,
        active: state.activeTab === 2,
        vnode: _mithrilDefault.default('', 'Show content of tab 2')
      }, {
        title: 'Test 3',
        active: state.activeTab === 3,
        vnode: _mithrilDefault.default('', 'Show content of tab 3')
      }, {
        title: 'Test 4',
        active: state.activeTab === 4,
        vnode: _mithrilDefault.default('', 'Show content of tab 4')
      }, {
        title: 'Visit Google',
        target: '_blank',
        href: 'http://www.google.com'
      }]
    }), _mithrilDefault.default(_mithrilMaterialized.Button, {
      label: 'Switch to tab 1',
      onclick: () => {
        state.activeTab = 1;
        state.activeTabId = '';
      }
    }), _mithrilDefault.default(_mithrilMaterialized.Button, {
      label: 'Switch to tab 4',
      onclick: () => {
        state.activeTab = 0;
        state.activeTabId = 'test4';
      }
    }), _mithrilDefault.default(_mithrilMaterialized.Button, {
      label: `${state.disabled ? 'Enable' : 'Disable'} tab 2`,
      onclick: () => {
        state.disabled = !state.disabled;
      }
    }), _mithrilDefault.default(_mithrilMaterialized.Button, {
      label: `Switch tab width from ${state.tabWidths[state.tabWidthId % 3]} to ${state.tabWidths[(state.tabWidthId + 1) % 3]}`,
      onclick: () => state.tabWidthId++
    }), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(Tabs, {
            onShow: console.log,
            tabs: [
              {
                title: 'Test 1',
                vnode: m('', 'Show content of tab 1'),
              },
              {
                title: 'Test 2',
                disabled: true,
                vnode: m('', 'Show content of tab 2'),
              },
              {
                title: 'Test 3',
                active: true,
                vnode: m('', 'Show content of tab 3'),
              },
              {
                title: 'Test 4',
                vnode: m('', 'Show content of tab 4'),
              },
              {
                title: 'Visit Google',
                target: '_blank',
                href: 'http://www.google.com',
              },
            ],
          })`
    }), _mithrilDefault.default('h3.header', 'Parallax'), _mithrilDefault.default(_mithrilMaterialized.Parallax, {
      src: _urlAssetsVincent_van_Gogh__Landscape_at_twilight__Google_Art_ProjectJpgDefault.default
    }), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(Parallax, { src: gogh }) // should be embedded in layout so the width is not limited`
    }), _mithrilDefault.default('h3.header', 'Material box (click on image)'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.MaterialBox, {
      src: _urlAssetsVincent_van_Gogh__Landscape_at_twilight__Google_Art_ProjectJpgDefault.default,
      width: 600
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(MaterialBox, { src: gogh, width: 600 })`
    }), _mithrilDefault.default('h3.header', 'Carousel'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.Carousel, {
      items: [{
        href: '#!/one!',
        src: 'https://lorempixel.com/250/250/nature/1'
      }, {
        href: '#!/two!',
        src: 'https://lorempixel.com/250/250/nature/2'
      }, {
        href: '#!/three!',
        src: 'https://lorempixel.com/250/250/nature/3'
      }, {
        href: '#!/four!',
        src: 'https://lorempixel.com/250/250/nature/4'
      }, {
        href: '#!/five!',
        src: 'https://lorempixel.com/250/250/nature/5'
      }]
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(Carousel, { items: [
            { href: '#!/one!', src: 'https://lorempixel.com/250/250/nature/1' },
            { href: '#!/two!', src: 'https://lorempixel.com/250/250/nature/2' },
            { href: '#!/three!', src: 'https://lorempixel.com/250/250/nature/3' },
            { href: '#!/four!', src: 'https://lorempixel.com/250/250/nature/4' },
            { href: '#!/five!', src: 'https://lorempixel.com/250/250/nature/5' },
          ] })`
    }), _mithrilDefault.default('h3.header', 'Pagination'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.Pagination, {
      size: 5,
      curPage: curPage(),
      items: [{
        href: '/misc?page=1'
      }, {
        href: '/misc?page=2'
      }, {
        href: '/misc?page=3'
      }, {
        href: '/misc?page=4'
      }, {
        href: '/misc?page=5'
      }, {
        href: '/misc?page=6'
      }, {
        href: '/misc?page=7'
      }, {
        href: '/misc?page=8'
      }, {
        href: '/misc?page=9'
      }, {
        href: '/misc?page=10'
      }, {
        href: '/misc?page=11'
      }, {
        href: '/misc?page=12'
      }]
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `m(Pagination, {
  size: 5,
  items: [
    { href: '/misc?page=1' },
    { href: '/misc?page=2' },
    { href: '/misc?page=3' },
    { href: '/misc?page=4' },
    { href: '/misc?page=5' },
    { href: '/misc?page=6' },
    { href: '/misc?page=7' },
    { href: '/misc?page=8' },
    { href: '/misc?page=9' },
    { href: '/misc?page=10' },
    { href: '/misc?page=11' },
    { href: '/misc?page=12' },
  ],
})`
    })])
  };
};

},{"mithril-materialized":"6KIT1","mithril":"3cEwr","@parcel/transformer-js/lib/esmodule-helpers.js":"7ae6E","url:../../assets/Vincent_van_Gogh_-_Landscape_at_twilight_-_Google_Art_Project.jpg":"7IIiv"}],"24ZZb":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "CollectionsPage", function () {
  return CollectionsPage;
});
var _mithrilMaterialized = require('mithril-materialized');
var _mithril = require('mithril');
var _mithrilDefault = _parcelHelpers.interopDefault(_mithril);
const onclick = item => alert(`You clicked ${item.title}.`);
const CollectionsPage = () => {
  return {
    view: () => _mithrilDefault.default('.col.s12.m8.xl7', [_mithrilDefault.default('h2.header', 'Collections and collapsible'), _mithrilDefault.default('p', ['For more information, see ', _mithrilDefault.default('a[href=https://materializecss.com/collections.html][target=_blank]', 'Collections'), ' and ', _mithrilDefault.default('a[href=https://materializecss.com/collapsible.html][target=_blank]', 'Collapsible'), '.']), _mithrilDefault.default('h3.header', 'Secondary Content Collection'), _mithrilDefault.default(_mithrilMaterialized.Collection, {
      items: [{
        id: '1',
        title: 'John',
        iconName: 'send',
        onclick
      }, {
        id: '2',
        title: 'Mary',
        iconName: 'send',
        onclick
      }, {
        id: '3',
        title: 'Pete',
        iconName: 'send',
        onclick
      }]
    }), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(Collection, {
            items: [
              // id is used as key, e.g. when sorting or editing the collection.
              { id: '1', title: 'John', iconName: 'send', onclick },
              { id: '2', title: 'Mary', iconName: 'send', onclick },
              { id: '3', title: 'Pete', iconName: 'send', onclick },
            ],
          })`
    }), _mithrilDefault.default('h3.header', 'Links collection'), _mithrilDefault.default(_mithrilMaterialized.Collection, {
      header: 'First names',
      mode: _mithrilMaterialized.CollectionMode.LINKS,
      items: [{
        title: 'John',
        onclick: console.log
      }, {
        title: 'Mary',
        onclick: console.log,
        href: '/timeline'
      }, {
        title: 'Pete',
        onclick: console.log,
        href: 'https://www.google.com'
      }]
    }), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(Collection, {
            header: 'First names',
            mode: CollectionMode.LINKS,
            items: [
              { title: 'John', onclick: console.log },
              { title: 'Mary', onclick: console.log, href: '/timeline' },
              { title: 'Pete', onclick: console.log, href: 'https://www.google.com' },
            ],
          })`
    }), _mithrilDefault.default('h3.header', 'Avatar collection'), _mithrilDefault.default(_mithrilMaterialized.Collection, {
      header: 'First names',
      mode: _mithrilMaterialized.CollectionMode.AVATAR,
      items: [{
        title: 'John',
        content: 'First line<br>Second line',
        avatar: 'folder',
        className: 'green',
        iconName: 'grade',
        onclick
      }, {
        title: 'Mary',
        content: 'First line<br>Second line',
        avatar: 'https://pbs.twimg.com/profile_images/665673789112516608/v9itf6uk_400x400.jpg',
        iconName: 'grade',
        onclick
      }, {
        title: 'Pete',
        content: 'First line<br>Second line',
        avatar: 'play_arrow',
        className: 'red',
        iconName: 'file_download',
        href: 'http://www.google.com'
      }]
    }), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(Collection, {
            header: 'First names',
            mode: CollectionMode.AVATAR,
            items: [
              {
                title: 'John',
                content: 'First line<br>Second line',
                avatar: 'folder',
                className: 'green',
                iconName: 'grade',
                onclick,
              },
              {
                title: 'Mary',
                content: 'First line<br>Second line',
                avatar: 'https://pbs.twimg.com/profile_images/665673789112516608/v9itf6uk_400x400.jpg',
                iconName: 'grade',
                onclick,
              },
              {
                title: 'Pete',
                content: 'First line<br>Second line',
                avatar: 'play_arrow',
                className: 'red',
                iconName: 'file_download',
                href: 'http://www.google.com',
              },
            ],
          })`
    }), _mithrilDefault.default('h3.header', 'Collapsible (accordion)'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.Collapsible, {
      items: [{
        id: 1,
        header: 'First',
        body: 'Lorem ipsum dolor sit amet.',
        iconName: 'filter_drama'
      }, {
        id: 2,
        header: 'Second',
        body: 'Lorem ipsum dolor sit amet.',
        iconName: 'place',
        active: true
      }, {
        id: 3,
        header: 'Third',
        body: _mithrilDefault.default('span', 'Third in a span.'),
        iconName: 'whatshot'
      }]
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(Collapsible, { items: [
            { header: 'First', body: 'Lorem ipsum dolor sit amet.', iconName: 'filter_drama' },
            { header: 'Second', body: 'Lorem ipsum dolor sit amet.', iconName: 'place', active: true },
            { header: 'Third', body: m('span', 'Third in a span.'), iconName: 'whatshot' },
          ] })`
    }), _mithrilDefault.default('h3.header', 'Collapsible (no accordion)'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.Collapsible, {
      accordion: false,
      items: [{
        id: 1,
        header: 'First',
        body: 'Lorem ipsum dolor sit amet.',
        iconName: 'filter_drama',
        active: true
      }, {
        id: 2,
        header: 'Second',
        body: 'Lorem ipsum dolor sit amet.',
        iconName: 'place',
        active: true
      }, {
        id: 3,
        header: 'Third',
        body: _mithrilDefault.default('span', 'Third in a span.'),
        iconName: 'whatshot'
      }]
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(Collapsible, {
          accordion: false,
          items: [
            { header: 'First', body: 'Lorem ipsum dolor sit amet.', iconName: 'filter_drama', active: true },
            { header: 'Second', body: 'Lorem ipsum dolor sit amet.', iconName: 'place', active: true },
            { header: 'Third', body: m('span', 'Third in a span.'), iconName: 'whatshot' },
          ] })`
    })])
  };
};

},{"mithril-materialized":"6KIT1","mithril":"3cEwr","@parcel/transformer-js/lib/esmodule-helpers.js":"7ae6E"}],"1rsAV":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "MapEditorPage", function () {
  return MapEditorPage;
});
var _mithrilMaterialized = require('mithril-materialized');
var _mithril = require('mithril');
var _mithrilDefault = _parcelHelpers.interopDefault(_mithril);
const MapEditorPage = () => {
  const state = {
    properties: {
      stringArray: ['a', 'b', 'c'],
      numberArray: [1, 2, 3],
      aNumber: 42,
      aString: 'Hello world',
      truthy: true,
      falsy: false
    }
  };
  return {
    view: () => _mithrilDefault.default('.col.s12', [_mithrilDefault.default('h2.header', 'Key-value pairs editor'), _mithrilDefault.default('p', ['As materializecss.com did not offer a useful editor for a map of key-value pairs, ', 'I have created one myself. It allows you to edit (or just view, when it is disabled), ', 'booleans, numbers, strings and arrays of numbers and strings.']), // m(EditableTable, {
    // headers: ['title', 'description', 'priority'],
    // cells,
    // addRows: true,
    // }),
    _mithrilDefault.default('h3.header', 'MapEditor'), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.MapEditor, {
      label: 'Properties',
      isMandatory: true,
      properties: state.properties,
      onchange: props => console.table(props),
      labelKey: 'Unique key',
      // Override the default label for keys i.e. 'key'
      labelValue: 'My value',
      // Overrule the default label for values i.e. 'key'
      disable: false,
      // If true, the map cannot be edited
      disallowArrays: false,
      // If true, do not convert [1, 2, 3] to a number[]
      keyValueConverter: undefined,
      // Allows you to overrule the view of each key-value pair
      iconName: 'dns',
      keyClass: '.col.s4',
      // Optionally override the default key element
      valueClass: '.col.s8',
      // Optionally override the default value element
      truthy: ['true', 'yes', 'ja', 'oui', 'si', 'da'],
      falsy: ['false', 'no', 'nee', 'nein', 'non', 'nu', 'njet']
    })), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(MapEditor, {
            label: 'Properties',
            isMandatory: true,
            properties: state.properties,
            onchange: (props: any) => console.table(props),
            labelKey: 'Unique key', // Override the default label for keys i.e. 'key'
            labelValue: 'My value', // Overrule the default label for values i.e. 'key'
            disable: false, // If true, the map cannot be edited
            disallowArrays: false, // If true, do not convert [1, 2, 3] to a number[]
            keyValueConverter: undefined, // Allows you to overrule the view of each key-value pair
            iconName: 'dns',
            keyClass: '.col.s4', // Optionally override the default key element
            valueClass: '.col.s8', // Optionally override the default value element
            truthy: ['true', 'yes', 'ja', 'oui', 'si', 'da'], // Any truthy value generates a boolean
            falsy: ['false', 'no', 'nee', 'nein', 'non', 'nu', 'njet'],
          })`
    })])
  };
};

},{"mithril-materialized":"6KIT1","mithril":"3cEwr","@parcel/transformer-js/lib/esmodule-helpers.js":"7ae6E"}],"5imqj":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "TimelinePage", function () {
  return TimelinePage;
});
var _mithrilMaterialized = require('mithril-materialized');
var _mithril = require('mithril');
var _mithrilDefault = _parcelHelpers.interopDefault(_mithril);
const TimelinePage = () => {
  const timeFormatter = d => `${_mithrilMaterialized.padLeft(d.getHours())}:${_mithrilMaterialized.padLeft(d.getMinutes())}:${_mithrilMaterialized.padLeft(d.getSeconds())}`;
  return {
    view: () => _mithrilDefault.default('.col.s12', [_mithrilDefault.default('h2.header', 'Timeline'), _mithrilDefault.default('p', ['A simple timeline component based on ', _mithrilDefault.default('a[href=https://tympanus.net/codrops/2013/05/02/vertical-timeline/][target=_blank]', `Codrops\' Vertical Timeline`), '.']), _mithrilDefault.default('h3.header', 'Timeline'), _mithrilDefault.default(_mithrilMaterialized.Timeline, {
      onSelect: item => console.table(item),
      timeFormatter,
      items: [{
        id: '1',
        title: 'Test a string',
        iconName: 'play_arrow',
        datetime: new Date(2019, 2, 3, 9, 0, 0),
        content: 'Hello world'
      }, {
        id: '2',
        title: 'Test a long text',
        iconName: 'play_arrow',
        datetime: new Date(2019, 2, 3, 9, 30, 0),
        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus maximus erat,
              vitae placerat nisl blandit tincidunt. Vestibulum libero turpis, bibendum sit amet rutrum a,
              malesuada at diam. Praesent id dignissim ligula. Donec nec finibus lectus. Curabitur in
              sollicitudin sem. Nulla neque est, elementum et lectus ut, luctus elementum metus.`
      }, {
        id: '3',
        title: 'Test an active item',
        iconName: 'play_arrow',
        datetime: new Date(2019, 2, 3, 9, 45, 0),
        content: 'Hello world',
        active: true
      }, {
        id: '4',
        title: 'Test Vnode content',
        iconName: 'play_arrow',
        datetime: new Date(2019, 2, 3, 10, 5, 0),
        content: _mithrilDefault.default(_mithrilMaterialized.Collection, {
          style: 'color: black;',
          items: [{
            title: 'John',
            iconName: 'send'
          }, {
            title: 'Mary',
            iconName: 'send'
          }, {
            title: 'Pete',
            iconName: 'send'
          }]
        })
      }, {
        id: '5',
        title: 'Test other icon',
        iconName: 'visibility',
        datetime: new Date(2019, 2, 3, 10, 11, 0),
        content: 'Hello world'
      }, {
        id: '6',
        iconName: 'visibility_off',
        datetime: new Date(2019, 2, 3, 10, 15, 0),
        content: 'No title, only content'
      }, {
        id: '7',
        title: _mithrilDefault.default('i', ['Test a Vnode', _mithrilDefault.default(_mithrilMaterialized.Icon, {
          className: 'small',
          style: 'float: right;',
          iconName: 'directions_run'
        })]),
        iconName: 'visibility',
        datetime: new Date(2019, 2, 3, 10, 21, 0)
      }]
    }), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          m(Timeline, {
            onSelect: (item: ITimelineItem) => console.table(item),
            timeFormatter, // Adds seconds to time format
            items: [
              {
                title: 'Test a string',
                iconName: 'play_arrow',
                datetime: new Date(2019, 2, 3, 9, 0, 0),
                content: 'Hello world',
              },
              {
                title: 'Test a long text',
                iconName: 'play_arrow',
                datetime: new Date(2019, 2, 3, 9, 30, 0),
                content: 'Lorem ipsum ...',
              },
              {
                title: 'Test an active item',
                iconName: 'play_arrow',
                datetime: new Date(2019, 2, 3, 9, 45, 0),
                content: 'Hello world',
                active: true,
              },
              {
                title: 'Test Vnode content',
                iconName: 'play_arrow',
                datetime: new Date(2019, 2, 3, 10, 5, 0),
                content: m(Collection, {
                  style: 'color: black;', // otherwise the titles are in white
                  items: [
                    { title: 'John', iconName: 'send' },
                    { title: 'Mary', iconName: 'send' },
                    { title: 'Pete', iconName: 'send' },
                  ],
                }),
              },
              {
                title: 'Test other icon',
                iconName: 'visibility',
                datetime: new Date(2019, 2, 3, 10, 11, 0),
                content: 'Hello world',
              },
              {
                id: '6',
                iconName: 'visibility_off',
                datetime: new Date(2019, 2, 3, 10, 15, 0),
                content: 'No title, only content',
              },
              {
                id: '7',
                title: m('i', [
                  'Test a Vnode',
                  m(Icon, { className: 'small', style: 'float: right;', iconName: 'directions_run' }),
                ]),
                iconName: 'visibility',
                datetime: new Date(2019, 2, 3, 10, 21, 0),
              },
            ],
          })`
    })])
  };
};

},{"mithril-materialized":"6KIT1","mithril":"3cEwr","@parcel/transformer-js/lib/esmodule-helpers.js":"7ae6E"}],"27xGi":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "KanbanPage", function () {
  return KanbanPage;
});
var _mithrilMaterialized = require('mithril-materialized');
var _mithril = require('mithril');
var _mithrilDefault = _parcelHelpers.interopDefault(_mithril);
const KanbanPage = () => {
  const state = {
    disabled: false,
    todos: [{
      id: 'id1',
      todo: 'Buy milk',
      due: new Date(2025, 11, 31)
    }, {
      id: 'id2',
      todo: 'Clean the bathroom',
      due: new Date(2025, 10, 30),
      prio: 1
    }]
  };
  const onchange = items => console.table(items);
  const taskModel = [{
    id: 'id',
    autogenerate: 'guid'
  }, {
    id: 'task',
    label: 'Task',
    component: 'text',
    className: 'col s8',
    required: true
  }, {
    id: 'due',
    label: 'Due date',
    className: 'col s4',
    component: 'date'
  }, {
    id: 'desc',
    label: 'Description',
    className: 'col s8',
    component: 'text',
    multiline: true
  }, {
    id: 'done',
    label: 'Done',
    className: 'col s4',
    component: 'checkbox'
  }, {
    id: 'category',
    label: 'Category',
    className: 'col s6',
    component: 'select',
    placeholder: 'Pick one',
    required: true,
    options: [{
      id: 'shopping',
      label: 'Shopping'
    }, {
      id: 'house',
      label: 'House keeping'
    }]
  }, {
    id: 'option',
    label: 'Options',
    className: 'col s6',
    required: true,
    component: 'options',
    options: [{
      id: 'hire',
      label: 'Hire help'
    }, {
      id: 'kids',
      label: 'Ask kids'
    }, {
      id: 'partner',
      label: 'Partner'
    }]
  }];
  return {
    view: () => _mithrilDefault.default('.col.s12', [_mithrilDefault.default('h2.header', 'Kanban'), _mithrilDefault.default('p', `An editable list of items. Each item can be specified by a model. The items can be sorted,
          unless canDrag is true, in which case you can drag the items in its proper location.`), _mithrilDefault.default('p', `Each list item is based on a model description, from which the final input 'form' is generated. The only hard
          requirement is that the item contains a (string) 'id' property, which you can automatically generate for new
          items (using a full or abbreviated GUID).`), _mithrilDefault.default('.row', _mithrilDefault.default(_mithrilMaterialized.Switch, {
      label: 'Disable kanban',
      left: 'enable',
      right: 'disable',
      onchange: v => state.disabled = v
    })), _mithrilDefault.default('h3.header', 'Kanban'), _mithrilDefault.default('.row', [_mithrilDefault.default('.col.s6', _mithrilDefault.default(_mithrilMaterialized.Kanban, {
      disabled: state.disabled,
      label: 'task',
      onchange,
      fixedFooter: false,
      canEdit: true,
      canDrag: true,
      moveBetweenList: true,
      model: taskModel,
      items: [{
        id: 'item1',
        task: 'Buy milk',
        due: new Date(2025, 11, 31),
        desc: 'Do not forget this!',
        category: 'shopping'
      }, {
        id: 'item2',
        task: 'Clean the bathroom',
        due: new Date(2025, 10, 30),
        desc: `Why don't we have a maid?`,
        option: 'kids'
      }]
    })), _mithrilDefault.default('.col.s6', _mithrilDefault.default(_mithrilMaterialized.Kanban, {
      disabled: state.disabled,
      label: 'task',
      onchange,
      fixedFooter: false,
      canEdit: true,
      canDrag: true,
      moveBetweenList: true,
      model: taskModel,
      items: [{
        id: 'item3',
        task: 'Feed the dog',
        due: new Date(2025, 11, 17)
      }]
    }))]), _mithrilDefault.default('h3', 'Editable todo'), _mithrilDefault.default('.row', _mithrilDefault.default('.col s12', _mithrilDefault.default(_mithrilMaterialized.Kanban, {
      disabled: state.disabled,
      label: 'todo',
      onchange: todos => state.todos = todos,
      fixedFooter: false,
      canEdit: true,
      items: state.todos,
      model: [{
        id: 'id',
        autogenerate: 'id'
      }, {
        id: 'todo',
        label: 'Todo',
        component: 'text',
        className: 'col s8',
        required: true
      }, {
        id: 'done',
        label: 'Done',
        className: 'col s4',
        component: 'checkbox'
      }, {
        id: 'prio',
        label: 'Priority',
        className: 'col s12',
        component: 'radios',
        inline: true,
        options: [{
          id: 1,
          label: 'Low'
        }, {
          id: 2,
          label: 'Medium'
        }, {
          id: 3,
          label: 'High'
        }]
      }]
    }))), _mithrilDefault.default('h3', 'Non-editable todo, except for done'), _mithrilDefault.default(_mithrilMaterialized.Kanban, {
      disabled: state.disabled,
      label: 'todo',
      fixedFooter: false,
      canEdit: false,
      editableIds: ['done'],
      items: state.todos,
      onchange: console.table,
      model: [{
        id: 'id',
        autogenerate: 'id'
      }, {
        id: 'todo',
        label: 'Todo',
        component: 'text',
        className: 'col s8',
        required: true
      }, {
        id: 'done',
        label: 'Done',
        className: 'col s4',
        component: 'checkbox'
      }, {
        id: 'prio',
        label: 'Priority',
        className: 'col s12',
        component: 'radios',
        inline: true,
        options: [{
          id: 1,
          label: 'Low'
        }, {
          id: 2,
          label: 'Medium'
        }, {
          id: 3,
          label: 'High'
        }]
      }]
    }), _mithrilDefault.default(_mithrilMaterialized.CodeBlock, {
      code: `          interface ITodoTask {
            id: string;
            todo?: string;
            task?: string;
            desc?: string;
            due?: Date;
            done?: boolean;
            category?: string;
            option?: string;
            prio?: string;
          }

          m(Kanban, {
            label: 'todo',
            onchange: (items: ITodoTask[]) => console.table(items),
            fixedFooter: false,
            canEdit: true,
            // canEdit: false,
            // editableIds: ['done'],
            items: [
              {
                id: 'item1',
                todo: 'Buy milk',
                due: new Date(2025, 11, 31),
              },
              {
                id: 'item2',
                todo: 'Clean the bathroom',
                due: new Date(2025, 10, 30),
                prio: 1,
              },
            ],
            model: [
              {
                id: 'id',
                autogenerate: 'id',
              },
              {
                id: 'todo',
                label: 'Todo',
                component: 'text',
                className: 'col s8',
                required: true,
              },
              {
                id: 'due',
                label: 'Due date',
                className: 'col s4',
                component: 'date',
              },
              {
                id: 'prio',
                label: 'Priority',
                className: 'col s8',
                component: 'radios',
                inline: true,
                options: [{ id: 1, label: 'Low' }, { id: 2, label: 'Medium' }, { id: 3, label: 'High' }],
              },
              {
                id: 'done',
                label: 'Done',
                className: 'col s4',
                component: 'checkbox',
              },
            ],
          } as IKanban<ITodoTask>)`
    })])
  };
};

},{"mithril-materialized":"6KIT1","mithril":"3cEwr","@parcel/transformer-js/lib/esmodule-helpers.js":"7ae6E"}],"2P8CJ":[function() {},{}]},["3EvbW","5e1eZ"], "5e1eZ", "parcelRequiree533")

//# sourceMappingURL=index.45ac956a.js.map
