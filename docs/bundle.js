/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 193:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Vnode = __webpack_require__(1757)

module.exports = function(html) {
	if (html == null) html = ""
	return Vnode("<", undefined, undefined, html, undefined, undefined)
}


/***/ }),

/***/ 267:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HomePage = void 0;
const tslib_1 = __webpack_require__(5959);
const dashboard_service_1 = __webpack_require__(9618);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const mithril_materialized_1 = __webpack_require__(7578);
const HomePage = () => ({
    view: () => (0, mithril_1.default)('.home-page', [
        (0, mithril_1.default)('.col.s12.m7.l8', (0, mithril_1.default)('.introduction', [
            (0, mithril_1.default)('h2', 'About Mithril-Materialized'),
            (0, mithril_1.default)('p', `I like Mithril, and I also like materialize-css. However, to create some materialized components
          is a bit cumbersome as it requires a lot of HTML elements and a specific nesting which can easily go
          wrong. For that reason, the mithril-materialized library provides you with several ready-made
          Mithril components, so you can easily use them in your own application.`),
            (0, mithril_1.default)('p', [
                'You can check out the API documentation ',
                (0, mithril_1.default)('a[href="https://erikvullings.github.io/mithril-materialized/typedoc/index.html"]', 'here'),
                '.',
            ]),
            (0, mithril_1.default)('h3', 'Installation'),
            (0, mithril_1.default)('p', 'First, you need to install the required packages:'),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                language: 'console',
                code: `npm i materialize-css material-icons mithril mithril-materialized
# Also install the typings if you use TypeScript
npm i --save-dev @types/materialize-css @types/mithril`,
            }),
            (0, mithril_1.default)('p', 'Next, you can use them inside your application:'),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import { TextArea } from 'mithril-materialized';
`,
            }),
        ])),
        (0, mithril_1.default)('.col.s12.m5.l4', [
            (0, mithril_1.default)('h1', 'Contents'),
            (0, mithril_1.default)('ul.collection', [
                dashboard_service_1.dashboardSvc
                    .getList()
                    .filter((d) => d.visible && !d.default)
                    .map((d) => (0, mithril_1.default)('li.collection-item', (0, mithril_1.default)('a', { href: `#!${d.route}` }, d.title))),
            ]),
        ]),
    ]),
});
exports.HomePage = HomePage;


/***/ }),

/***/ 360:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var parseQueryString = __webpack_require__(3515)

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
	}
	return {
		path: path,
		params: queryIndex < 0
			? {}
			: parseQueryString(url.slice(queryIndex + 1, queryEnd)),
	}
}


/***/ }),

/***/ 796:
/***/ ((module) => {

"use strict";


var delayedRemoval = new WeakMap

function *domFor(vnode) {
	// To avoid unintended mangling of the internal bundler,
	// parameter destructuring is not used here.
	var dom = vnode.dom
	var domSize = vnode.domSize
	var generation = delayedRemoval.get(dom)
	if (dom != null) do {
		var nextSibling = dom.nextSibling

		if (delayedRemoval.get(dom) === generation) {
			yield dom
			domSize--
		}

		dom = nextSibling
	}
	while (domSize)
}

module.exports = {
	delayedRemoval: delayedRemoval,
	domFor: domFor,
}


/***/ }),

/***/ 1067:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TimelinePage = void 0;
const tslib_1 = __webpack_require__(5959);
const mithril_materialized_1 = __webpack_require__(7578);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const TimelinePage = () => {
    const timeFormatter = (d) => `${(0, mithril_materialized_1.padLeft)(d.getHours())}:${(0, mithril_materialized_1.padLeft)(d.getMinutes())}:${(0, mithril_materialized_1.padLeft)(d.getSeconds())}`;
    return {
        view: () => (0, mithril_1.default)('.col.s12', [
            (0, mithril_1.default)('h2.header', 'Timeline'),
            (0, mithril_1.default)('p', [
                'A simple timeline component based on ',
                (0, mithril_1.default)('a[href=https://tympanus.net/codrops/2013/05/02/vertical-timeline/][target=_blank]', `Codrops\' Vertical Timeline`),
                '.',
            ]),
            (0, mithril_1.default)('h3.header', 'Timeline'),
            (0, mithril_1.default)(mithril_materialized_1.Timeline, {
                onSelect: (item) => console.table(item),
                timeFormatter,
                items: [
                    {
                        id: '1',
                        title: 'Test a string',
                        iconName: 'play_arrow',
                        datetime: new Date(2019, 2, 3, 9, 0, 0),
                        content: 'Hello world',
                    },
                    {
                        id: '2',
                        title: 'Test a long text',
                        iconName: 'play_arrow',
                        datetime: new Date(2019, 2, 3, 9, 30, 0),
                        content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec luctus maximus erat,
              vitae placerat nisl blandit tincidunt. Vestibulum libero turpis, bibendum sit amet rutrum a,
              malesuada at diam. Praesent id dignissim ligula. Donec nec finibus lectus. Curabitur in
              sollicitudin sem. Nulla neque est, elementum et lectus ut, luctus elementum metus.`,
                    },
                    {
                        id: '3',
                        title: 'Test an active item',
                        iconName: 'play_arrow',
                        datetime: new Date(2019, 2, 3, 9, 45, 0),
                        content: 'Hello world',
                        active: true,
                    },
                    {
                        id: '4',
                        title: 'Test Vnode content',
                        iconName: 'play_arrow',
                        datetime: new Date(2019, 2, 3, 10, 5, 0),
                        content: (0, mithril_1.default)(mithril_materialized_1.Collection, {
                            style: 'color: black;',
                            items: [
                                { title: 'John', iconName: 'send' },
                                { title: 'Mary', iconName: 'send' },
                                { title: 'Pete', iconName: 'send' },
                            ],
                        }),
                    },
                    {
                        id: '5',
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
                        title: (0, mithril_1.default)('i', [
                            'Test a Vnode',
                            (0, mithril_1.default)(mithril_materialized_1.Icon, { className: 'small', style: 'float: right;', iconName: 'directions_run' }),
                        ]),
                        iconName: 'visibility',
                        datetime: new Date(2019, 2, 3, 10, 21, 0),
                    },
                ],
            }),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
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
          })`,
            }),
        ]),
    };
};
exports.TimelinePage = TimelinePage;


/***/ }),

/***/ 1437:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MiscPage = void 0;
const tslib_1 = __webpack_require__(5959);
const mithril_materialized_1 = __webpack_require__(7578);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const Vincent_van_Gogh___Landscape_at_twilight___Google_Art_Project_jpg_1 = tslib_1.__importDefault(__webpack_require__(6499));
const MiscPage = () => {
    const state = {
        activeTabId: '',
        disabled: true,
        activeTab: 3,
        tabWidthId: 2,
        tabWidths: ['auto', 'fixed', 'fill'],
    };
    const curPage = () => (mithril_1.default.route.param('page') ? +mithril_1.default.route.param('page') : 1);
    return {
        view: () => (0, mithril_1.default)('.col.s12', [
            (0, mithril_1.default)('h2.header', 'Miscellaneous'),
            (0, mithril_1.default)('p', [
                'Some miscellaneous components, like the ',
                (0, mithril_1.default)('a[href=https://materializecss.com/tabs.html][target=_blank]', 'Tabs'),
                ', ',
                (0, mithril_1.default)('a[href=https://materializecss.com/media.html][target=_blank]', 'Material box'),
                ', ',
                (0, mithril_1.default)('a[href=https://materializecss.com/collection.html][target=_blank]', 'Collection'),
                ', ',
                (0, mithril_1.default)('a[href=https://materializecss.com/collapsible.html][target=_blank]', 'Collapsible'),
                ', ',
                (0, mithril_1.default)('a[href=https://materializecss.com/carousel.html][target=_blank]', 'Carousel'),
                ', ',
                (0, mithril_1.default)('a[href=https://materializecss.com/parallax.html][target=_blank]', 'Pagination'),
                ' and the ',
                (0, mithril_1.default)('a[href=https://materializecss.com/pagination.html][target=_blank]', 'Parallax'),
                '.',
            ]),
            (0, mithril_1.default)('h3.header', 'Tabs'),
            (0, mithril_1.default)(mithril_materialized_1.Tabs, {
                selectedTabId: state.activeTabId,
                tabWidth: state.tabWidths[state.tabWidthId % 3],
                onShow: console.log,
                tabs: [
                    {
                        title: 'Test 1',
                        active: state.activeTab === 1,
                        vnode: (0, mithril_1.default)('', 'Show content of tab 1'),
                    },
                    {
                        title: 'Test 2',
                        disabled: state.disabled,
                        active: state.activeTab === 2,
                        vnode: (0, mithril_1.default)('', 'Show content of tab 2'),
                    },
                    {
                        title: 'Test 3',
                        active: state.activeTab === 3,
                        vnode: (0, mithril_1.default)('', 'Show content of tab 3'),
                    },
                    {
                        title: 'Test 4',
                        active: state.activeTab === 4,
                        vnode: (0, mithril_1.default)('', 'Show content of tab 4'),
                    },
                    {
                        title: 'Visit Google',
                        target: '_blank',
                        href: 'http://www.google.com',
                        // vnode: m('', 'Nothing to show'),
                    },
                ],
            }),
            (0, mithril_1.default)(mithril_materialized_1.Button, {
                label: 'Switch to tab 1',
                onclick: () => {
                    state.activeTab = 1;
                    state.activeTabId = '';
                },
            }),
            (0, mithril_1.default)(mithril_materialized_1.Button, {
                label: 'Switch to tab 4',
                onclick: () => {
                    state.activeTab = 0;
                    state.activeTabId = 'test4';
                },
            }),
            (0, mithril_1.default)(mithril_materialized_1.Button, {
                label: `${state.disabled ? 'Enable' : 'Disable'} tab 2`,
                onclick: () => {
                    state.disabled = !state.disabled;
                },
            }),
            (0, mithril_1.default)(mithril_materialized_1.Button, {
                label: `Switch tab width from ${state.tabWidths[state.tabWidthId % 3]} to ${state.tabWidths[(state.tabWidthId + 1) % 3]}`,
                onclick: () => state.tabWidthId++,
            }),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
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
                  })`,
            }),
            (0, mithril_1.default)('h3.header', 'Parallax'),
            (0, mithril_1.default)(mithril_materialized_1.Parallax, { src: Vincent_van_Gogh___Landscape_at_twilight___Google_Art_Project_jpg_1.default }),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `          m(Parallax, { src: gogh }) // should be embedded in layout so the width is not limited`,
            }),
            (0, mithril_1.default)('h3.header', 'Material box (click on image)'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.MaterialBox, { src: Vincent_van_Gogh___Landscape_at_twilight___Google_Art_Project_jpg_1.default, width: 600 })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `          m(MaterialBox, { src: gogh, width: 600 })`,
            }),
            (0, mithril_1.default)('h3.header', 'Carousel'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Carousel, {
                items: [
                    { href: '#!/one!', src: 'https://picsum.photos/id/301/200/300' },
                    { href: '#!/two!', src: 'https://picsum.photos/id/302/200/300' },
                    { href: '#!/three!', src: 'https://picsum.photos/id/306/200/300' },
                    { href: '#!/four!', src: 'https://picsum.photos/id/304/200/300' },
                    { href: '#!/five!', src: 'https://picsum.photos/id/305/200/300' },
                ],
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `          m(Carousel, { items: [
                    { href: '#!/one!', src: 'https://picsum.photos/id/301/200/300' },
                    { href: '#!/two!', src: 'https://picsum.photos/id/302/200/300' },
                    { href: '#!/three!', src: 'https://picsum.photos/id/306/200/300' },
                    { href: '#!/four!', src: 'https://picsum.photos/id/304/200/300' },
                    { href: '#!/five!', src: 'https://picsum.photos/id/305/200/300' },
                  ] })`,
            }),
            (0, mithril_1.default)('h3.header', 'Pagination'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Pagination, {
                size: 5,
                curPage: curPage(),
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
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
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
        })`,
            }),
        ]),
    };
};
exports.MiscPage = MiscPage;


/***/ }),

/***/ 1571:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hyperscript = __webpack_require__(3846)

hyperscript.trust = __webpack_require__(193)
hyperscript.fragment = __webpack_require__(3731)

module.exports = hyperscript


/***/ }),

/***/ 1757:
/***/ ((module) => {

"use strict";


function Vnode(tag, key, attrs, children, text, dom) {
	return {tag: tag, key: key, attrs: attrs, children: children, text: text, dom: dom, is: undefined, domSize: undefined, state: undefined, events: undefined, instance: undefined}
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
				throw new TypeError(
					isKeyed && (input[i] != null || typeof input[i] === "boolean")
						? "In fragments, vnodes must either all have keys or none have keys. You may wish to consider using an explicit keyed empty fragment, m.fragment({key: ...}), instead of a hole."
						: "In fragments, vnodes must either all have keys or none have keys."
				)
			}
		}
		for (var i = 0; i < input.length; i++) {
			children[i] = Vnode.normalize(input[i])
		}
	}
	return children
}

module.exports = Vnode


/***/ }),

/***/ 2381:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


// Note: this is mildly perf-sensitive.
//
// It does *not* use `delete` - dynamic `delete`s usually cause objects to bail
// out into dictionary mode and just generally cause a bunch of optimization
// issues within engines.
//
// Ideally, I would've preferred to do this, if it weren't for the optimization
// issues:
//
// ```js
// const hasOwn = require("./hasOwn")
// const magic = [
//     "key", "oninit", "oncreate", "onbeforeupdate", "onupdate",
//     "onbeforeremove", "onremove",
// ]
// module.exports = (attrs, extras) => {
//     const result = Object.assign(Object.create(null), attrs)
//     for (const key of magic) delete result[key]
//     if (extras != null) for (const key of extras) delete result[key]
//     return result
// }
// ```

var hasOwn = __webpack_require__(5531)
// Words in RegExp literals are sometimes mangled incorrectly by the internal bundler, so use RegExp().
var magic = new RegExp("^(?:key|oninit|oncreate|onbeforeupdate|onupdate|onbeforeremove|onremove)$")

module.exports = function(attrs, extras) {
	var result = {}

	if (extras != null) {
		for (var key in attrs) {
			if (hasOwn.call(attrs, key) && !magic.test(key) && extras.indexOf(key) < 0) {
				result[key] = attrs[key]
			}
		}
	} else {
		for (var key in attrs) {
			if (hasOwn.call(attrs, key) && !magic.test(key)) {
				result[key] = attrs[key]
			}
		}
	}

	return result
}


/***/ }),

/***/ 2476:
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ 2548:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModalPage = void 0;
const tslib_1 = __webpack_require__(5959);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const mithril_materialized_1 = __webpack_require__(7578);
const Vincent_van_Gogh___Landscape_at_twilight___Google_Art_Project_jpg_1 = tslib_1.__importDefault(__webpack_require__(6499));
const ModalPage = () => {
    const onchange = (v) => alert(v);
    // State to control modal visibility
    const state = {
        modal1Open: false,
        modal1bOpen: false,
        modal2Open: false,
        modal3Open: false,
        modal4Open: false
    };
    return {
        view: () => (0, mithril_1.default)('.col.s12', [
            (0, mithril_1.default)('h2.header', 'Modals'),
            (0, mithril_1.default)('p', [
                'The library supports all three modals types that are defined on the ',
                (0, mithril_1.default)('a[href=https://materializecss.com/modals.html#!][target=_blank]', 'materialize-css website'),
                '.',
            ]),
            (0, mithril_1.default)('h3.header', 'Normal Modal'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Button, {
                label: 'Open modal',
                onclick: () => {
                    state.modal1Open = true;
                    mithril_1.default.redraw();
                }
            }), (0, mithril_1.default)(mithril_materialized_1.ModalPanel, {
                id: 'modal1',
                title: 'Do you like this library?',
                description: 'This is some content.',
                isOpen: state.modal1Open,
                onToggle: (open) => {
                    state.modal1Open = open;
                    mithril_1.default.redraw();
                },
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
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
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
                  })`,
            }),
            (0, mithril_1.default)('h3.header', 'Normal Modal with Select and Dropdown'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Button, {
                label: 'Open modal',
                onclick: () => {
                    state.modal1bOpen = true;
                    mithril_1.default.redraw();
                }
            }), (0, mithril_1.default)(mithril_materialized_1.ModalPanel, {
                id: 'modal1b',
                title: 'Tell me about yourself',
                isOpen: state.modal1bOpen,
                onToggle: (open) => {
                    state.modal1bOpen = open;
                    mithril_1.default.redraw();
                },
                description: (0, mithril_1.default)('.row', // So the content has enough vertical space
                [
                    (0, mithril_1.default)(mithril_materialized_1.Select, {
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
                        onchange: (v) => console.log(v),
                    }),
                    (0, mithril_1.default)(mithril_materialized_1.Dropdown, {
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
                        onchange: (v) => console.log(v),
                    }),
                ]),
                buttons: [
                    {
                        label: 'Disagree',
                    },
                    {
                        label: 'Agree',
                    },
                ],
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
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
                  })`,
            }),
            (0, mithril_1.default)('h3.header', 'Fixed Footer Modal'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Button, {
                label: 'Fixed footer modal',
                onclick: () => {
                    state.modal2Open = true;
                    mithril_1.default.redraw();
                }
            }), (0, mithril_1.default)(mithril_materialized_1.ModalPanel, {
                id: 'modal2',
                title: 'Do you like this library?',
                isOpen: state.modal2Open,
                onToggle: (open) => {
                    state.modal2Open = open;
                    mithril_1.default.redraw();
                },
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
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
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
                  })`,
            }),
            (0, mithril_1.default)('h3.header', 'Bottom Modal'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Button, {
                label: 'Open bottom modal',
                onclick: () => {
                    state.modal3Open = true;
                    mithril_1.default.redraw();
                }
            }), (0, mithril_1.default)(mithril_materialized_1.ModalPanel, {
                id: 'modal3',
                title: 'Do you like this library?',
                description: 'This is some content.',
                isOpen: state.modal3Open,
                onToggle: (open) => {
                    state.modal3Open = open;
                    mithril_1.default.redraw();
                },
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
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
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
                  })`,
            }),
            (0, mithril_1.default)('h3.header', 'Vnode as content'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Button, {
                label: 'Open bottom content modal',
                onclick: () => {
                    state.modal4Open = true;
                    mithril_1.default.redraw();
                }
            }), (0, mithril_1.default)(mithril_materialized_1.ModalPanel, {
                id: 'modal4',
                title: 'Content modal',
                description: (0, mithril_1.default)(mithril_materialized_1.MaterialBox, { src: Vincent_van_Gogh___Landscape_at_twilight___Google_Art_Project_jpg_1.default, width: 400 }),
                isOpen: state.modal4Open,
                onToggle: (open) => {
                    state.modal4Open = open;
                    mithril_1.default.redraw();
                },
                bottomSheet: true,
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `          m(Button, { label: 'Open bottom content modal', modalId: 'modal4' }),
                  m(ModalPanel, {
                    id: 'modal4',
                    title: 'Content modal',
                    description: m(MaterialBox, { src: gogh, width: 400 }),
                    bottomSheet: true,
                  })`,
            }),
        ]),
    };
};
exports.ModalPage = ModalPage;


/***/ }),

/***/ 2622:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PickerPage = void 0;
const tslib_1 = __webpack_require__(5959);
const mithril_materialized_1 = __webpack_require__(7578);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const PickerPage = () => {
    const state = { disabled: false };
    const onchange = (v) => alert(`Input changed. New value: ${v}`);
    return {
        view: () => (0, mithril_1.default)('.col.s12', [
            (0, mithril_1.default)('h2.header', 'Pickers'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Switch, {
                label: 'Disable pickers',
                left: 'enable',
                right: 'disable',
                onchange: (v) => (state.disabled = v),
            })),
            (0, mithril_1.default)('h3.header', 'DatePicker'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.DatePicker, {
                disabled: state.disabled,
                format: 'mmmm d, yyyy',
                label: 'What is your birthday?',
                yearRange: [1970, new Date().getFullYear() + 20],
                initialValue: new Date(),
                onchange,
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `          m(DatePicker, {
            format: 'mmmm d, yyyy',
            label: 'What is your birthday?',
            yearRange: [1970, new Date().getFullYear() + 20],
            initialValue: new Date().toDateString(),
            onchange,
          })`,
            }),
            (0, mithril_1.default)('h3.header', 'TimePicker'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.TimePicker, {
                disabled: state.disabled,
                label: 'When do you normally get up?',
                twelveHour: false,
                initialValue: '09:00',
                onchange,
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `          m(TimePicker, {
            label: 'What is your birthday?',
            twelveHour: false,
            initialValue: '09:00',
            onchange,
          })`,
            }),
        ]),
    };
};
exports.PickerPage = PickerPage;


/***/ }),

/***/ 2830:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InputPage = void 0;
const tslib_1 = __webpack_require__(5959);
const mithril_materialized_1 = __webpack_require__(7578);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const InputPage = () => {
    const onchange = (v) => console.log(`Input changed. New value: ${v}`);
    let value = 'click_clear_to_remove.me';
    const searchSelectOptions = [
        { id: 'option1', label: 'Option 1' },
        { id: 'option2', label: 'Option 2' },
        { id: 'option3', label: 'Option 3' },
    ];
    return {
        view: () => (0, mithril_1.default)('.col.s12', [
            (0, mithril_1.default)('h2.header', 'Inputs'),
            (0, mithril_1.default)('h3.header', 'TextInput'),
            (0, mithril_1.default)('h4.header', 'Normal text input'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.TextInput, {
                label: 'What is your name?',
                required: true,
                helperText: 'Please, be honest!',
                onchange,
                autocomplete: 'off',
                onkeyup: (ev, value) => console.log(value),
                autofocus: true,
                maxLength: 50,
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `        m(TextInput, {
          label: 'What is your name?',
          required: true,
          helperText: 'Please, be honest!',
          onchange,
          onkeyup: (ev, value) => console.log(value),
          autofocus: true // This may also be a function that resolves to a boolean
          maxLength: 50,
        } as IInputOptions)`,
            }),
            (0, mithril_1.default)('h4.header', 'TextInput with icon'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.TextInput, {
                label: 'What is your name?',
                iconName: 'account_circle',
                onchange,
                maxLength: 50,
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `        m(TextInput, {
          label: 'What is your name?',
          iconName: 'account_circle',
          onchange,
          maxLength: 50,
        } as IInputOptions)`,
            }),
            (0, mithril_1.default)('h4.header', 'TextInput with custom validation'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.TextInput, {
                label: 'What is the most popular search engine?',
                dataSuccess: 'Great minds think alike',
                dataError: 'Seriously?',
                validate: (v) => v && v.toLowerCase() === 'google',
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `          m(TextInput, {
            label: 'What is the most popular search engine?',
            dataSuccess: 'Great minds think alike',
            dataError: 'Seriously?',
            validate: v => v && v.toLowerCase() === 'google',
          } as IInputOptions)`,
            }),
            (0, mithril_1.default)('h3.header', 'Autocomplete'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Autocomplete, {
                label: 'What is your favorite company?',
                data: {
                    Apple: null,
                    Google: null,
                    Facebook: null,
                    PHILIPS: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Philips_logo.svg/800px-Philips_logo.svg.png',
                    TNO: 'https://tno.github.io/crime_scripts/f418cfa539199976.svg',
                },
                onchange,
            })),
            (0, mithril_1.default)('span', (0, mithril_1.default)('a[target=_blank][href=https://materializecss.com/autocomplete.html]', 'Documentation')),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `        m(Autocomplete, {
            label: 'What is your favorite company?',
            data: {
              Apple: null,
              Google: null,
              Facebook: null,
              PHILIPS: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Philips_logo.svg/800px-Philips_logo.svg.png',
              TNO: 'https://tno.github.io/crime_scripts/f418cfa539199976.svg',
            },
            onchange,
        } as IInputOptions)`,
            }),
            (0, mithril_1.default)('h3.header', 'Search and select, optionally add'),
            (0, mithril_1.default)(mithril_materialized_1.SearchSelect, {
                options: searchSelectOptions,
                onchange: (selectedOptions) => console.log('Selected:', selectedOptions),
                label: 'Select search options',
                searchPlaceholder: 'Find an option...', // Custom search placeholder
            }),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `        const searchSelectOptions = [
          { id: 'option1', label: 'Option 1' },
          { id: 'option2', label: 'Option 2' },
          { id: 'option3', label: 'Option 3' },
        ];
        ...
        m(SearchSelect, {
          options: searchSelectOptions,
          onchange: (selectedOptions) => console.log('Selected:', selectedOptions),
          label: 'Select search options',
          searchPlaceholder: 'Find an option...',
        })`,
            }),
            (0, mithril_1.default)(mithril_materialized_1.SearchSelect, {
                options: searchSelectOptions,
                initialValue: ['option1'],
                onchange: (selectedOptions) => console.log('Selected:', selectedOptions),
                oncreateNewOption: (searchTerm) => {
                    console.log('Creating new option:', searchTerm);
                    const newOption = { id: (0, mithril_materialized_1.uniqueId)(), label: searchTerm };
                    // Add the new option to your options array
                    searchSelectOptions.push(newOption);
                    return newOption;
                },
                label: 'Select option or add new option',
                placeholder: 'No options selected',
            }),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `        m(SearchSelect, {
          options: searchSelectOptions,
          initialValue: ['option1'],
          onchange: (selectedOptions) => console.log('Selected:', selectedOptions),
          oncreateNewOption: (searchTerm) => {
            console.log('Creating new option:', searchTerm);
            const newOption = { id: uniqueId(), label: searchTerm };
            // Add the new option to your options array
            searchSelectOptions.push(newOption);
            return newOption;
          },
          label: 'Select option or add new option',
          placeholder: 'No options selected',
        })`,
            }),
            (0, mithril_1.default)('h3.header', 'TextArea'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.TextArea, {
                label: 'Please, describe yourself',
                helperText: `Don't be shy`,
                maxLength: 100,
                onchange,
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `        m(TextArea, {
            label: 'Please, describe yourself',
            helperText: 'Don\'t be shy',
            maxLength: 100,
            onchange })`,
            }),
            (0, mithril_1.default)('h3.header', 'NumberInput'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.NumberInput, {
                min: 1,
                max: 120,
                step: 1,
                label: 'What is your age?',
                dataSuccess: 'You look much younger ;-)',
                dataError: 'Error: Age must be between 1 and 120.',
                onchange,
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `          m(NumberInput, {
            min: 1,
            max: 120,
            step: 1, // Default value is step increments of 1
            label: 'What is your age?',
            dataSuccess: 'You look much younger ;-)',
            dataError: 'Error: Age must be between 1 and 120.',
            onchange,
          })`,
            }),
            (0, mithril_1.default)('h4.header', 'NumberInput with custom validation'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.NumberInput, {
                label: 'What is the result of 35 + 7?',
                dataSuccess: 'Great, you have found the answer to the meaning of life, the universe and everything!',
                dataError: 'Back to grammar school',
                validate: (v) => v === 42,
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `          m(NumberInput, {
            label: 'What is the result of 35 + 7?',
            dataSuccess: 'Great, you have found the answer to the meaning of life, the universe and everything!',
            dataError: 'Back to grammar school',
            validate: (v: number) => v === 42,
          })`,
            }),
            (0, mithril_1.default)('h3.header', 'EmailInput'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.EmailInput, {
                label: 'What is your email?',
                dataError: 'Please use username@org.com',
                dataSuccess: 'OK',
                onchange,
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `          m(EmailInput, {
            label: 'What is your email?',
            dataError: 'Wrong, use username@org.com',
            dataSuccess: 'OK',
            onchange,
          })`,
            }),
            (0, mithril_1.default)('h3.header', 'UrlInput'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.UrlInput, {
                label: 'What is your favorite website?',
                placeholder: 'http(s)://',
                dataError: 'Wrong, use http(s)://org.com',
                dataSuccess: 'OK',
                onchange,
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `          m(UrlInput, {
            label: 'What is your favorite website?',
            placeholder: 'http(s)://',
            dataError: 'Wrong, use http(s)://org.com',
            dataSuccess: 'OK',
            onchange,
          })`,
            }),
            (0, mithril_1.default)('h3.header', 'PasswordInput'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.PasswordInput, {
                label: 'What is your password?',
                iconName: 'lock',
                onchange,
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `          m(PasswordInput, {
            label: 'What is your password?',
            iconName: 'lock',
            onchange,
          })`,
            }),
            (0, mithril_1.default)('h3.header', 'FileInput'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.FileInput, {
                placeholder: 'Upload one or more files',
                multiple: true,
                initialValue: value,
                accept: ['image/*', '.pdf'],
                onchange: (files) => {
                    value = '';
                    console.table(files);
                },
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `        m(FileInput, {
            placeholder: 'Upload one or more files',
            multiple: true,
            initialValue: value,
            accept: ['image/*', '.pdf'],
            onchange: (files: FileList) => console.table(files),
          })`,
            }),
            (0, mithril_1.default)('h3.header', 'RangeInput'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.RangeInput, {
                min: 0,
                max: 100,
                label: 'What is your favorite number between 0 and 100?',
                onchange,
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `          m(RangeInput, {
            min: 0,
            max: 100,
            label: 'What is your favorite number between 0 and 100?',
            onchange,
          })`,
            }),
            (0, mithril_1.default)('h3.header', 'Chips'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Chips, {
                onchange: (chips) => onchange(JSON.stringify(chips)),
                label: 'An optional label',
                helperText: 'Optional help instructions',
                placeholder: 'Add a tag',
                secondaryPlaceholder: '+Tag',
                required: true,
                data: [
                    {
                        tag: 'Hello',
                    },
                    {
                        tag: 'World',
                    },
                ],
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `          m(Chips, {
            onchange: (chips: any[]) => onchange(JSON.stringify(chips)),
            label: 'An optional label',
            helperText: 'Optional help instructions',
            placeholder: 'Add a tag',
            secondaryPlaceholder: '+Tag',
            data: [{
              tag: 'Hello',
            }, {
              tag: 'World',
            }],
          })`,
            }),
            (0, mithril_1.default)('h3.header', 'Chips with auto-complete'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Chips, {
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
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
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
          })`,
            }),
            (0, mithril_1.default)('h3.header', 'ColorInput'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.ColorInput, {
                label: 'What is your favorite color?',
                onchange,
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `          m(ColorInput, {
            label: 'What is your favorite color?',
            onchange,
          })`,
            }),
        ]),
    };
};
exports.InputPage = InputPage;


/***/ }),

/***/ 2851:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 3515:
/***/ ((module) => {

"use strict";


function decodeURIComponentSave(str) {
	try {
		return decodeURIComponent(str)
	} catch(err) {
		return str
	}
}

module.exports = function(string) {
	if (string === "" || string == null) return {}
	if (string.charAt(0) === "?") string = string.slice(1)

	var entries = string.split("&"), counters = {}, data = {}
	for (var i = 0; i < entries.length; i++) {
		var entry = entries[i].split("=")
		var key = decodeURIComponentSave(entry[0])
		var value = entry.length === 2 ? decodeURIComponentSave(entry[1]) : ""

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


/***/ }),

/***/ 3560:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ 3731:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Vnode = __webpack_require__(1757)
var hyperscriptVnode = __webpack_require__(5898)

module.exports = function() {
	var vnode = hyperscriptVnode.apply(0, arguments)

	vnode.tag = "["
	vnode.children = Vnode.normalizeChildren(vnode.children)
	return vnode
}


/***/ }),

/***/ 3803:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CollectionsPage = void 0;
const tslib_1 = __webpack_require__(5959);
const mithril_materialized_1 = __webpack_require__(7578);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const onclick = (item) => alert(`You clicked ${item.title}.`);
const CollectionsPage = () => {
    return {
        view: () => (0, mithril_1.default)('.col.s12.m8.xl7', [
            (0, mithril_1.default)('h2.header', 'Collections and collapsible'),
            (0, mithril_1.default)('p', [
                'For more information, see ',
                (0, mithril_1.default)('a[href=https://materializecss.com/collections.html][target=_blank]', 'Collections'),
                ' and ',
                (0, mithril_1.default)('a[href=https://materializecss.com/collapsible.html][target=_blank]', 'Collapsible'),
                '.',
            ]),
            (0, mithril_1.default)('h3.header', 'Secondary Content Collection'),
            (0, mithril_1.default)(mithril_materialized_1.Collection, {
                items: [
                    { id: '1', title: 'John', iconName: 'send', onclick },
                    { id: '2', title: 'Mary', iconName: 'send', onclick },
                    { id: '3', title: 'Pete', iconName: 'send', onclick },
                ],
            }),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `          m(Collection, {
            items: [
              // id is used as key, e.g. when sorting or editing the collection.
              { id: '1', title: 'John', iconName: 'send', onclick },
              { id: '2', title: 'Mary', iconName: 'send', onclick },
              { id: '3', title: 'Pete', iconName: 'send', onclick },
            ],
          })`,
            }),
            (0, mithril_1.default)('h3.header', 'Links collection'),
            (0, mithril_1.default)(mithril_materialized_1.Collection, {
                header: 'First names',
                mode: mithril_materialized_1.CollectionMode.LINKS,
                items: [
                    { title: 'John', onclick: console.log },
                    { title: 'Mary', onclick: console.log, href: '/timeline' },
                    { title: 'Pete', onclick: console.log, href: 'https://www.google.com' },
                ],
            }),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `          m(Collection, {
            header: 'First names',
            mode: CollectionMode.LINKS,
            items: [
              { title: 'John', onclick: console.log },
              { title: 'Mary', onclick: console.log, href: '/timeline' },
              { title: 'Pete', onclick: console.log, href: 'https://www.google.com' },
            ],
          })`,
            }),
            (0, mithril_1.default)('h3.header', 'Avatar collection'),
            (0, mithril_1.default)(mithril_materialized_1.Collection, {
                header: 'First names',
                mode: mithril_materialized_1.CollectionMode.AVATAR,
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
            }),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
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
          })`,
            }),
            (0, mithril_1.default)('h3.header', 'Collapsible (accordion)'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Collapsible, {
                id: 'testme',
                className: 'first-second-third',
                items: [
                    { id: 1, header: 'First', body: 'Lorem ipsum dolor sit amet.', iconName: 'filter_drama' },
                    { id: 2, header: 'Second', body: 'Lorem ipsum dolor sit amet.', iconName: 'place', active: true },
                    { id: 3, header: 'Third', body: (0, mithril_1.default)('span', 'Third in a span.'), iconName: 'whatshot' },
                ],
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `          m(Collapsible, { items: [
            { header: 'First', body: 'Lorem ipsum dolor sit amet.', iconName: 'filter_drama' },
            { header: 'Second', body: 'Lorem ipsum dolor sit amet.', iconName: 'place', active: true },
            { header: 'Third', body: m('span', 'Third in a span.'), iconName: 'whatshot' },
          ] })`,
            }),
            (0, mithril_1.default)('h3.header', 'Collapsible (no accordion)'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Collapsible, {
                accordion: false,
                items: [
                    { id: 1, header: 'First', body: 'Lorem ipsum dolor sit amet.', iconName: 'filter_drama', active: true },
                    { id: 2, header: 'Second', body: 'Lorem ipsum dolor sit amet.', iconName: 'place', active: true },
                    { id: 3, header: 'Third', body: (0, mithril_1.default)('span', 'Third in a span.'), iconName: 'whatshot' },
                ],
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `          m(Collapsible, {
          accordion: false,
          items: [
            { header: 'First', body: 'Lorem ipsum dolor sit amet.', iconName: 'filter_drama', active: true },
            { header: 'Second', body: 'Lorem ipsum dolor sit amet.', iconName: 'place', active: true },
            { header: 'Third', body: m('span', 'Third in a span.'), iconName: 'whatshot' },
          ] })`,
            }),
        ]),
    };
};
exports.CollectionsPage = CollectionsPage;


/***/ }),

/***/ 3846:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Vnode = __webpack_require__(1757)
var hyperscriptVnode = __webpack_require__(5898)
var hasOwn = __webpack_require__(5531)

var selectorParser = /(?:(^|#|\.)([^#\.\[\]]+))|(\[(.+?)(?:\s*=\s*("|'|)((?:\\["'\]]|.)*?)\5)?\])/g
var selectorCache = Object.create(null)

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
	if (isEmpty(attrs)) attrs = null
	return selectorCache[selector] = {tag: tag, attrs: attrs}
}

function execSelector(state, vnode) {
	var attrs = vnode.attrs
	var hasClass = hasOwn.call(attrs, "class")
	var className = hasClass ? attrs.class : attrs.className

	vnode.tag = state.tag

	if (state.attrs != null) {
		attrs = Object.assign({}, state.attrs, attrs)

		if (className != null || state.attrs.className != null) attrs.className =
			className != null
				? state.attrs.className != null
					? String(state.attrs.className) + " " + String(className)
					: className
				: state.attrs.className != null
					? state.attrs.className
					: null
	} else {
		if (className != null) attrs.className = className
	}

	if (hasClass) attrs.class = null

	// workaround for #2622 (reorder keys in attrs to set "type" first)
	// The DOM does things to inputs based on the "type", so it needs set first.
	// See: https://github.com/MithrilJS/mithril.js/issues/2622
	if (state.tag === "input" && hasOwn.call(attrs, "type")) {
		attrs = Object.assign({type: attrs.type}, attrs)
	}

	// This reduces the complexity of the evaluation of "is" within the render function.
	vnode.is = attrs.is

	vnode.attrs = attrs

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


/***/ }),

/***/ 4111:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var mountRedraw = __webpack_require__(4159)

module.exports = __webpack_require__(7589)(typeof window !== "undefined" ? window : null, mountRedraw.redraw)


/***/ }),

/***/ 4159:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var render = __webpack_require__(5376)

module.exports = __webpack_require__(8010)(render, typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : null, typeof console !== "undefined" ? console : null)


/***/ }),

/***/ 4404:
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 4432:
/***/ ((module) => {

"use strict";


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


/***/ }),

/***/ 4669:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8771);
/* harmony import */ var _style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3560);
/* harmony import */ var _style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4404);
/* harmony import */ var _style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2851);
/* harmony import */ var _style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9751);
/* harmony import */ var _style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4836);
/* harmony import */ var _style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_cjs_js_filled_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6787);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_cjs_js_filled_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_cjs_js_filled_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_cjs_js_filled_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_cjs_js_filled_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 4836:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ 5376:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = __webpack_require__(7379)(typeof window !== "undefined" ? window : null)


/***/ }),

/***/ 5531:
/***/ ((module) => {

"use strict";
// This exists so I'm only saving it once.


module.exports = {}.hasOwnProperty


/***/ }),

/***/ 5584:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Layout = void 0;
const tslib_1 = __webpack_require__(5959);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const dashboard_service_1 = __webpack_require__(9618);
const isActive = (path) => (mithril_1.default.route.get().indexOf(path) >= 0 ? '.active' : '');
const Layout = () => ({
    view: (vnode) => (0, mithril_1.default)('.main', [
        (0, mithril_1.default)('nav', (0, mithril_1.default)('.nav-wrapper', [
            (0, mithril_1.default)(
            // tslint:disable-next-line:max-line-length
            'a.github-corner[aria-label=View source on GitHub][href=https://github.com/erikvullings/mithril-materialized]', (0, mithril_1.default)('svg[aria-hidden=true][height=80][viewBox=0 0 250 250][width=80]', {
                style: {
                    fill: 'black',
                    color: '#fff',
                    position: 'absolute',
                    top: '0',
                    border: '0',
                    left: '0',
                    transform: 'scale(-1, 1)',
                },
            }, [
                (0, mithril_1.default)('path[d=M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z]'),
                (0, mithril_1.default)(
                // tslint:disable-next-line:max-line-length
                'path.octo-arm[d=M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2][fill=currentColor]', { style: { 'transform-origin': '130px 106px' } }),
                (0, mithril_1.default)(
                // tslint:disable-next-line:max-line-length
                'path.octo-body[d=M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z][fill=currentColor]'),
            ])),
            (0, mithril_1.default)('style', 
            // tslint:disable-next-line:max-line-length
            '.github-corner:hover .octo-arm{animation:octocat-wave 560ms ease-in-out}@keyframes octocat-wave{0%,100%{transform:rotate(0)}20%,60%{transform:rotate(-25deg)}40%,80%{transform:rotate(10deg)}}@media (max-width:500px){.github-corner:hover .octo-arm{animation:none}.github-corner .octo-arm{animation:octocat-wave 560ms ease-in-out}}'),
            (0, mithril_1.default)('ul.right', dashboard_service_1.dashboardSvc
                .getList()
                .filter(d => d.visible)
                .map(d => (0, mithril_1.default)(`li${isActive(d.route)}`, (0, mithril_1.default)(mithril_1.default.route.Link, { href: d.route }, (0, mithril_1.default)('i.material-icons.right', d.icon ? (0, mithril_1.default)('i.material-icons', d.icon) : d.title))))),
        ])),
        (0, mithril_1.default)('.container', (0, mithril_1.default)('.row', vnode.children)),
    ]),
});
exports.Layout = Layout;


/***/ }),

/***/ 5603:
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ 5898:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Vnode = __webpack_require__(1757)

// Call via `hyperscriptVnode.apply(startOffset, arguments)`
//
// The reason I do it this way, forwarding the arguments and passing the start
// offset in `this`, is so I don't have to create a temporary array in a
// performance-critical path.
//
// In native ES6, I'd instead add a final `...args` parameter to the
// `hyperscript` and `fragment` factories and define this as
// `hyperscriptVnode(...args)`, since modern engines do optimize that away. But
// ES5 (what Mithril.js requires thanks to IE support) doesn't give me that luxury,
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


/***/ }),

/***/ 5959:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __addDisposableResource: () => (/* binding */ __addDisposableResource),
/* harmony export */   __assign: () => (/* binding */ __assign),
/* harmony export */   __asyncDelegator: () => (/* binding */ __asyncDelegator),
/* harmony export */   __asyncGenerator: () => (/* binding */ __asyncGenerator),
/* harmony export */   __asyncValues: () => (/* binding */ __asyncValues),
/* harmony export */   __await: () => (/* binding */ __await),
/* harmony export */   __awaiter: () => (/* binding */ __awaiter),
/* harmony export */   __classPrivateFieldGet: () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   __classPrivateFieldIn: () => (/* binding */ __classPrivateFieldIn),
/* harmony export */   __classPrivateFieldSet: () => (/* binding */ __classPrivateFieldSet),
/* harmony export */   __createBinding: () => (/* binding */ __createBinding),
/* harmony export */   __decorate: () => (/* binding */ __decorate),
/* harmony export */   __disposeResources: () => (/* binding */ __disposeResources),
/* harmony export */   __esDecorate: () => (/* binding */ __esDecorate),
/* harmony export */   __exportStar: () => (/* binding */ __exportStar),
/* harmony export */   __extends: () => (/* binding */ __extends),
/* harmony export */   __generator: () => (/* binding */ __generator),
/* harmony export */   __importDefault: () => (/* binding */ __importDefault),
/* harmony export */   __importStar: () => (/* binding */ __importStar),
/* harmony export */   __makeTemplateObject: () => (/* binding */ __makeTemplateObject),
/* harmony export */   __metadata: () => (/* binding */ __metadata),
/* harmony export */   __param: () => (/* binding */ __param),
/* harmony export */   __propKey: () => (/* binding */ __propKey),
/* harmony export */   __read: () => (/* binding */ __read),
/* harmony export */   __rest: () => (/* binding */ __rest),
/* harmony export */   __rewriteRelativeImportExtension: () => (/* binding */ __rewriteRelativeImportExtension),
/* harmony export */   __runInitializers: () => (/* binding */ __runInitializers),
/* harmony export */   __setFunctionName: () => (/* binding */ __setFunctionName),
/* harmony export */   __spread: () => (/* binding */ __spread),
/* harmony export */   __spreadArray: () => (/* binding */ __spreadArray),
/* harmony export */   __spreadArrays: () => (/* binding */ __spreadArrays),
/* harmony export */   __values: () => (/* binding */ __values),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */

var extendStatics = function(d, b) {
  extendStatics = Object.setPrototypeOf ||
      ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
      function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
  return extendStatics(d, b);
};

function __extends(d, b) {
  if (typeof b !== "function" && b !== null)
      throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
  extendStatics(d, b);
  function __() { this.constructor = d; }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
  __assign = Object.assign || function __assign(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
      return t;
  }
  return __assign.apply(this, arguments);
}

function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
          if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
              t[p[i]] = s[p[i]];
      }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
  else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
  function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
  var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
  var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
  var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
  var _, done = false;
  for (var i = decorators.length - 1; i >= 0; i--) {
      var context = {};
      for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
      for (var p in contextIn.access) context.access[p] = contextIn.access[p];
      context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
      var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
      if (kind === "accessor") {
          if (result === void 0) continue;
          if (result === null || typeof result !== "object") throw new TypeError("Object expected");
          if (_ = accept(result.get)) descriptor.get = _;
          if (_ = accept(result.set)) descriptor.set = _;
          if (_ = accept(result.init)) initializers.unshift(_);
      }
      else if (_ = accept(result)) {
          if (kind === "field") initializers.unshift(_);
          else descriptor[key] = _;
      }
  }
  if (target) Object.defineProperty(target, contextIn.name, descriptor);
  done = true;
};

function __runInitializers(thisArg, initializers, value) {
  var useValue = arguments.length > 2;
  for (var i = 0; i < initializers.length; i++) {
      value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
  }
  return useValue ? value : void 0;
};

function __propKey(x) {
  return typeof x === "symbol" ? x : "".concat(x);
};

function __setFunctionName(f, name, prefix) {
  if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
  return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
  return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
      function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
      function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
  return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
  function verb(n) { return function (v) { return step([n, v]); }; }
  function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (g && (g = 0, op[0] && (_ = 0)), _) try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
          if (y = 0, t) op = [op[0] & 2, t.value];
          switch (op[0]) {
              case 0: case 1: t = op; break;
              case 4: _.label++; return { value: op[1], done: false };
              case 5: _.label++; y = op[1]; op = [0]; continue;
              case 7: op = _.ops.pop(); _.trys.pop(); continue;
              default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                  if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                  if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                  if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                  if (t[2]) _.ops.pop();
                  _.trys.pop(); continue;
          }
          op = body.call(thisArg, _);
      } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
      if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
  }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  var desc = Object.getOwnPropertyDescriptor(m, k);
  if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
  }
  Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

function __exportStar(m, o) {
  for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
      next: function () {
          if (o && i >= o.length) o = void 0;
          return { value: o && o[i++], done: !o };
      }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
      while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  }
  catch (error) { e = { error: error }; }
  finally {
      try {
          if (r && !r.done && (m = i["return"])) m.call(i);
      }
      finally { if (e) throw e.error; }
  }
  return ar;
}

/** @deprecated */
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++)
      ar = ar.concat(__read(arguments[i]));
  return ar;
}

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
  return r;
}

function __spreadArray(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
          if (!ar) ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
      }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
  function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
  function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
  function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
  function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
  function fulfill(value) { resume("next", value); }
  function reject(value) { resume("throw", value); }
  function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
  function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
  function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
  function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
  return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
  Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
  o["default"] = v;
};

var ownKeys = function(o) {
  ownKeys = Object.getOwnPropertyNames || function (o) {
    var ar = [];
    for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
    return ar;
  };
  return ownKeys(o);
};

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
  __setModuleDefault(result, mod);
  return result;
}

function __importDefault(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
  if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
  return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
  if (value !== null && value !== void 0) {
    if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
    var dispose, inner;
    if (async) {
      if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
      dispose = value[Symbol.asyncDispose];
    }
    if (dispose === void 0) {
      if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
      dispose = value[Symbol.dispose];
      if (async) inner = dispose;
    }
    if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
    if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
    env.stack.push({ value: value, dispose: dispose, async: async });
  }
  else if (async) {
    env.stack.push({ async: true });
  }
  return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
  function fail(e) {
    env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
    env.hasError = true;
  }
  var r, s = 0;
  function next() {
    while (r = env.stack.pop()) {
      try {
        if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
        if (r.dispose) {
          var result = r.dispose.call(r.value);
          if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
        }
        else s |= 1;
      }
      catch (e) {
        fail(e);
      }
    }
    if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
    if (env.hasError) throw env.error;
  }
  return next();
}

function __rewriteRelativeImportExtension(path, preserveJsx) {
  if (typeof path === "string" && /^\.\.?\//.test(path)) {
      return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function (m, tsx, d, ext, cm) {
          return tsx ? preserveJsx ? ".jsx" : ".js" : d && (!ext || !cm) ? m : (d + ext + "." + cm.toLowerCase() + "js");
      });
  }
  return path;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  __extends,
  __assign,
  __rest,
  __decorate,
  __param,
  __esDecorate,
  __runInitializers,
  __propKey,
  __setFunctionName,
  __metadata,
  __awaiter,
  __generator,
  __createBinding,
  __exportStar,
  __values,
  __read,
  __spread,
  __spreadArrays,
  __spreadArray,
  __await,
  __asyncGenerator,
  __asyncDelegator,
  __asyncValues,
  __makeTemplateObject,
  __importStar,
  __importDefault,
  __classPrivateFieldGet,
  __classPrivateFieldSet,
  __classPrivateFieldIn,
  __addDisposableResource,
  __disposeResources,
  __rewriteRelativeImportExtension,
});


/***/ }),

/***/ 6283:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AboutPage = void 0;
const tslib_1 = __webpack_require__(5959);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const AboutPage = () => ({
    view: () => (0, mithril_1.default)('.row', [
        (0, mithril_1.default)('h1', 'About'),
        (0, mithril_1.default)('h1', 'Attribution'),
        (0, mithril_1.default)('ul.collection', [(0, mithril_1.default)('li.collection-item', 'Logo: ideation by Vytautas Alech from the Noun Project.')]),
    ]),
});
exports.AboutPage = AboutPage;


/***/ }),

/***/ 6427:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "4d73cb90e394b34b7670.woff";

/***/ }),

/***/ 6499:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "0f170ea0ecc81d3b9ccc.jpg";

/***/ }),

/***/ 6539:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var buildQueryString = __webpack_require__(4432)

// Returns `path` from `template` + `params`
module.exports = function(template, params) {
	if ((/:([^\/\.-]+)(\.{3})?:/).test(template)) {
		throw new SyntaxError("Template parameter names must be separated by either a '/', '-', or '.'.")
	}
	if (params == null) return template
	var queryIndex = template.indexOf("?")
	var hashIndex = template.indexOf("#")
	var queryEnd = hashIndex < 0 ? template.length : hashIndex
	var pathEnd = queryIndex < 0 ? queryEnd : queryIndex
	var path = template.slice(0, pathEnd)
	var query = {}

	Object.assign(query, params)

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


/***/ }),

/***/ 6657:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 6787:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5603);
/* harmony import */ var _css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6657);
/* harmony import */ var _css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2476);
/* harmony import */ var _css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(9555), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(6427), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face {
  font-family: "Material Icons";
  font-style: normal;
  font-weight: 400;
  font-display: block;
  src: url(${___CSS_LOADER_URL_REPLACEMENT_0___}) format("woff2"), url(${___CSS_LOADER_URL_REPLACEMENT_1___}) format("woff");
}
.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-feature-settings: "liga";
}
`, "",{"version":3,"sources":["webpack://./../../node_modules/.pnpm/material-icons@1.13.14/node_modules/material-icons/iconfont/filled.css"],"names":[],"mappings":"AAAA;EACE,6BAA6B;EAC7B,kBAAkB;EAClB,gBAAgB;EAChB,mBAAmB;EACnB,oHAA+F;AACjG;AACA;EACE,6BAA6B;EAC7B,mBAAmB;EACnB,kBAAkB;EAClB,eAAe;EACf,cAAc;EACd,sBAAsB;EACtB,oBAAoB;EACpB,qBAAqB;EACrB,mBAAmB;EACnB,iBAAiB;EACjB,cAAc;EACd,mCAAmC;EACnC,kCAAkC;EAClC,kCAAkC;EAClC,6BAA6B;AAC/B","sourcesContent":["@font-face {\n  font-family: \"Material Icons\";\n  font-style: normal;\n  font-weight: 400;\n  font-display: block;\n  src: url(\"./material-icons.woff2\") format(\"woff2\"), url(\"./material-icons.woff\") format(\"woff\");\n}\n.material-icons {\n  font-family: \"Material Icons\";\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  text-rendering: optimizeLegibility;\n  font-feature-settings: \"liga\";\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 7142:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SelectionPage = void 0;
const tslib_1 = __webpack_require__(5959);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const mithril_materialized_1 = __webpack_require__(7578);
const SelectionPage = () => {
    const state = {
        ids: undefined,
        radioIds: undefined,
        checkedId: undefined,
        initialValue: [0, 2],
    };
    const onchange = (v) => alert(`Input changed. New value: ${v}`);
    return {
        view: () => (0, mithril_1.default)('.col.s12', [
            (0, mithril_1.default)('h2.header', 'Selections'),
            (0, mithril_1.default)('h3.header', 'Select'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Select, {
                iconName: 'person',
                label: 'What is your favorite hobby?',
                // disabled: true,
                placeholder: 'Pick one', // Alternative to first option, is also the default
                isMandatory: true,
                // checkedId: state.checkedId,
                // initialValue: state.checkedId,
                options: [
                    // { label: 'Pick one', disabled: true },
                    // { id: 0, label: 'Option 0' },
                    {
                        id: 'movies',
                        img: 'https://loremflickr.com/320/240?random=1',
                        label: 'Watching movies',
                        title: 'Sitting for the TV, doing nothing',
                    },
                    {
                        id: 'out',
                        img: 'https://loremflickr.com/320/240?random=2',
                        label: 'Going out',
                        title: 'Scanning the environment, talking to strangers',
                    },
                ],
                onchange: (ids) => (state.checkedId = ids),
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                newRow: true,
                code: `          m(Select, {
            // disabled: true, // Add disabled if you want to disable the select control
            iconName: 'person',
            label: 'What is your favorite hobby?',
            // placeholder: 'Pick one', // Alternative to first option
            isMandatory: true,
            options: [ // img property is optional
              { label: 'Pick one', disabled: true }, // IDs are optional: ID = label when missing
              { id: 'movies', img: "https://loremflickr.com/320/240?random=1", label: 'Watching movies' },
              { id: 'out', img: "https://loremflickr.com/320/240?random=2", label: 'Going out' },
            ],
            onchange,
          })`,
            }),
            (0, mithril_1.default)('h3.header', 'Select multiple'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Select, {
                multiple: true,
                // iconName: 'person',
                placeholder: 'Make a choice...',
                label: 'What are your favorite hobbies?',
                classes: 'my-select-wrapper-classes',
                initialValue: state.initialValue,
                onchange: (v) => {
                    // state.initialValue = v as number[];
                    console.log(v);
                },
                options: [
                    { id: 0, label: 'Watching movies' },
                    { id: 1, label: 'Going out' },
                    { id: 2, label: 'Reading' },
                    { id: 3, label: 'Sex', disabled: true },
                    { id: 4, label: 'Horse riding' },
                ],
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                newRow: true,
                code: `          m(
            '.row',
            m(Select, {
              multiple: true,
              placeholder: 'Make a choice...',
              label: 'What are your favorite hobbies?',
              classes: 'my-select-wrapper-classes',
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
          )`,
            }),
            (0, mithril_1.default)('h3.header', 'Select option group'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Select, {
                placeholder: 'Make a choice...',
                label: 'What are your favorite hobbies?',
                // initialValue: state.initialValue,
                onchange: (v) => {
                    // state.initialValue = v as number[];
                    console.log(v);
                },
                options: [
                    { id: 1, group: 'Indoors', label: 'Watching movies' },
                    { id: 2, group: 'Indoors', label: 'Reading' },
                    { id: 3, group: 'Indoors', label: 'Sex', disabled: true },
                    { id: 4, group: 'Outdoors', label: 'Going out' },
                    { id: 5, group: 'Outdoors', label: 'Horse riding' },
                ],
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                newRow: true,
                code: `          m(
            '.row',
            m(Select, {
              multiple: true,
              placeholder: 'Make a choice...',
              label: 'What are your favorite hobbies?',
              // initialValue: state.initialValue, // [0, 2]
              onchange: v => {
                state.initialValue = v as number[];
                console.log(v);
              },
              options: [
                { id: 1, group: 'Indoors', label: 'Watching movies' },
                { id: 2, group: 'Indoors', label: 'Reading' },
                { id: 3, group: 'Indoors', label: 'Sex', disabled: true },
                { id: 4, group: 'Outdoors', label: 'Going out' },
                { id: 5, group: 'Outdoors', label: 'Horse riding' },
              ],
            } as ISelectOptions<number>)
          )`,
            }),
            (0, mithril_1.default)('h3.header', 'Select multiple with search'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.SearchSelect, {
                label: 'What are your favorite hobbies?',
                placeholder: 'Make a choice...',
                className: 'col s12',
                initialValue: state.initialValue,
                onchange: (v) => {
                    console.log(v);
                },
                options: [
                    { id: 0, label: 'Watching movies' },
                    { id: 1, label: 'Going out' },
                    { id: 2, label: 'Reading' },
                    { id: 3, label: 'Sex', disabled: true },
                    { id: 4, label: 'Horse riding' },
                ],
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                newRow: true,
                code: `          m(
            '.row',
            m(SearchSelect, {
              label: 'What are your favorite hobbies?',
              placeholder: 'Make a choice...',
              className: 'col s12',
              initialValue: state.initialValue,
              onchange: (v) => {
                console.log(v);
              },
              options: [
                { id: 0, label: 'Watching movies' },
                { id: 1, label: 'Going out' },
                { id: 2, label: 'Reading' },
                { id: 3, label: 'Sex', disabled: true },
                { id: 4, label: 'Horse riding' },
              ],
          })`,
            }),
            (0, mithril_1.default)('h3.header', 'Options'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Options, {
                label: 'What are your favorite hobbies?',
                checkboxClass: 'col s4',
                isMandatory: true,
                initialValue: 'out',
                options: [
                    { id: 'movies', label: 'Watching movies' },
                    { id: 'out', label: 'Going out' },
                    { id: 'sex', label: 'Sex', disabled: true },
                ],
                onchange: (ids) => onchange(`Options ${ids.join()} are checked.`),
            })),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Options, {
                label: 'What are your favorite hobbies?',
                isMandatory: true,
                initialValue: 'out',
                options: [
                    { id: 'movies', label: 'Watching movies' },
                    { id: 'out', label: 'Going out' },
                    { id: 'sex', label: 'Sex', disabled: true },
                ],
                onchange: (ids) => onchange(`Options ${ids.join()} are checked.`),
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
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
          })`,
            }),
            (0, mithril_1.default)('h3.header', 'RadioButtons'),
            (0, mithril_1.default)('p', 'Linked radio buttons: when you change one of them, the other changes too.'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.RadioButtons, {
                checkboxClass: 'col s4',
                label: 'What is your favorite hobby?',
                options: [
                    { id: 'movies', label: 'Watching movies' },
                    { id: 'out', label: 'Going out' },
                    { id: 'sex', label: 'Sex', disabled: true },
                ],
                initialValue: 'out',
                checkedId: state.radioIds,
                onchange: (ids) => (state.radioIds = ids),
            })),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.RadioButtons, {
                label: 'What is your favorite hobby?',
                options: [
                    { id: 'movies', label: 'Watching movies' },
                    { id: 'out', label: 'Going out' },
                    { id: 'sex', label: 'Sex', disabled: true },
                ],
                initialValue: 'out',
                checkedId: state.radioIds,
                onchange: (ids) => (state.radioIds = ids),
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
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
          })`,
            }),
            (0, mithril_1.default)('h3.header', 'Switch'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Switch, {
                label: 'What is your gender?',
                left: 'Man',
                right: 'Woman',
                className: 'col s6 m4',
                onchange,
            }), (0, mithril_1.default)(mithril_materialized_1.TextInput, {
                label: 'What is your name',
                className: 'col s6 m8',
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                newRow: true,
                code: `          m(Switch, {
            label: 'What is your gender?',
            left: 'Man',
            right: 'Woman',
            onchange,
          })`,
            }),
            (0, mithril_1.default)('h3.header', 'Dropdown'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Dropdown, {
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
                onchange: (v) => console.log(v),
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
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
          })`,
            }),
        ]),
    };
};
exports.SelectionPage = SelectionPage;


/***/ }),

/***/ 7379:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Vnode = __webpack_require__(1757)
var df = __webpack_require__(796)
var delayedRemoval = df.delayedRemoval
var domFor = df.domFor

module.exports = function() {
	var nameSpace = {
		svg: "http://www.w3.org/2000/svg",
		math: "http://www.w3.org/1998/Math/MathML"
	}

	var currentRedraw
	var currentRender

	function getDocument(dom) {
		return dom.ownerDocument;
	}

	function getNameSpace(vnode) {
		return vnode.attrs && vnode.attrs.xmlns || nameSpace[vnode.tag]
	}

	//sanity check to discourage people from doing `vnode.state = ...`
	function checkState(vnode, original) {
		if (vnode.state !== original) throw new Error("'vnode.state' must not be modified.")
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
	function activeElement(dom) {
		try {
			return getDocument(dom).activeElement
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
		vnode.dom = getDocument(parent).createTextNode(vnode.children)
		insertDOM(parent, vnode.dom, nextSibling)
	}
	var possibleParents = {caption: "table", thead: "table", tbody: "table", tfoot: "table", tr: "tbody", th: "tr", td: "tr", colgroup: "table", col: "colgroup"}
	function createHTML(parent, vnode, ns, nextSibling) {
		var match = vnode.children.match(/^\s*?<(\w+)/im) || []
		// not using the proper parent makes the child element(s) vanish.
		//     var div = document.createElement("div")
		//     div.innerHTML = "<td>i</td><td>j</td>"
		//     console.log(div.innerHTML)
		// --> "ij", no <td> in sight.
		var temp = getDocument(parent).createElement(possibleParents[match[1]] || "div")
		if (ns === "http://www.w3.org/2000/svg") {
			temp.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\">" + vnode.children + "</svg>"
			temp = temp.firstChild
		} else {
			temp.innerHTML = vnode.children
		}
		vnode.dom = temp.firstChild
		vnode.domSize = temp.childNodes.length
		// Capture nodes to remove, so we don't confuse them.
		var fragment = getDocument(parent).createDocumentFragment()
		var child
		while (child = temp.firstChild) {
			fragment.appendChild(child)
		}
		insertDOM(parent, fragment, nextSibling)
	}
	function createFragment(parent, vnode, hooks, ns, nextSibling) {
		var fragment = getDocument(parent).createDocumentFragment()
		if (vnode.children != null) {
			var children = vnode.children
			createNodes(fragment, children, 0, children.length, hooks, null, ns)
		}
		vnode.dom = fragment.firstChild
		vnode.domSize = fragment.childNodes.length
		insertDOM(parent, fragment, nextSibling)
	}
	function createElement(parent, vnode, hooks, ns, nextSibling) {
		var tag = vnode.tag
		var attrs = vnode.attrs
		var is = vnode.is

		ns = getNameSpace(vnode) || ns

		var element = ns ?
			is ? getDocument(parent).createElementNS(ns, tag, {is: is}) : getDocument(parent).createElementNS(ns, tag) :
			is ? getDocument(parent).createElement(tag, {is: is}) : getDocument(parent).createElement(tag)
		vnode.dom = element

		if (attrs != null) {
			setAttrs(vnode, attrs, ns)
		}

		insertDOM(parent, element, nextSibling)

		if (!maybeSetContentEditable(vnode)) {
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
					moveDOM(parent, oe, topSibling)
					if (oe !== v) updateNode(parent, oe, v, hooks, topSibling, ns)
					if (++start <= --end) moveDOM(parent, o, nextSibling)
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
									else moveDOM(parent, v, nextSibling)
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
		if (oldTag === tag && old.is === vnode.is) {
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
			removeDOM(parent, old)
			createHTML(parent, vnode, ns, nextSibling)
		}
		else {
			vnode.dom = old.dom
			vnode.domSize = old.domSize
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

		updateAttrs(vnode, old.attrs, vnode.attrs, ns)
		if (!maybeSetContentEditable(vnode)) {
			updateNodes(element, old.children, vnode.children, hooks, null, ns)
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
	// subsequence
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

	// This handles fragments with zombie children (removed from vdom, but persisted in DOM through onbeforeremove)
	function moveDOM(parent, vnode, nextSibling) {
		if (vnode.dom != null) {
			var target
			if (vnode.domSize == null) {
				// don't allocate for the common case
				target = vnode.dom
			} else {
				target = getDocument(parent).createDocumentFragment()
				for (var dom of domFor(vnode)) target.appendChild(dom)
			}
			insertDOM(parent, target, nextSibling)
		}
	}

	function insertDOM(parent, dom, nextSibling) {
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
		else if (children != null && children.length !== 0) throw new Error("Child node of a contenteditable must be trusted.")
		return true
	}

	//remove
	function removeNodes(parent, vnodes, start, end) {
		for (var i = start; i < end; i++) {
			var vnode = vnodes[i]
			if (vnode != null) removeNode(parent, vnode)
		}
	}
	function tryBlockRemove(parent, vnode, source, counter) {
		var original = vnode.state
		var result = callHook.call(source.onbeforeremove, vnode)
		if (result == null) return

		var generation = currentRender
		for (var dom of domFor(vnode)) delayedRemoval.set(dom, generation)
		counter.v++

		Promise.resolve(result).finally(function () {
			checkState(vnode, original)
			tryResumeRemove(parent, vnode, counter)
		})
	}
	function tryResumeRemove(parent, vnode, counter) {
		if (--counter.v === 0) {
			onremove(vnode)
			removeDOM(parent, vnode)
		}
	}
	function removeNode(parent, vnode) {
		var counter = {v: 1}
		if (typeof vnode.tag !== "string" && typeof vnode.state.onbeforeremove === "function") tryBlockRemove(parent, vnode, vnode.state, counter)
		if (vnode.attrs && typeof vnode.attrs.onbeforeremove === "function") tryBlockRemove(parent, vnode, vnode.attrs, counter)
		tryResumeRemove(parent, vnode, counter)
	}
	function removeDOM(parent, vnode) {
		if (vnode.dom == null) return
		if (vnode.domSize == null) {
			parent.removeChild(vnode.dom)
		} else {
			for (var dom of domFor(vnode)) parent.removeChild(dom)
		}
	}

	function onremove(vnode) {
		if (typeof vnode.tag !== "string" && typeof vnode.state.onremove === "function") callHook.call(vnode.state.onremove, vnode)
		if (vnode.attrs && typeof vnode.attrs.onremove === "function") callHook.call(vnode.attrs.onremove, vnode)
		if (typeof vnode.tag !== "string") {
			if (vnode.instance != null) onremove(vnode.instance)
		} else {
			if (vnode.events != null) vnode.events._ = null
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
		if (key === "key" || value == null || isLifecycleMethod(key) || (old === value && !isFormAttribute(vnode, key)) && typeof value !== "object") return
		if (key[0] === "o" && key[1] === "n") return updateEvent(vnode, key, value)
		if (key.slice(0, 6) === "xlink:") vnode.dom.setAttributeNS("http://www.w3.org/1999/xlink", key.slice(6), value)
		else if (key === "style") updateStyle(vnode.dom, old, value)
		else if (hasPropertyKey(vnode, key, ns)) {
			if (key === "value") {
				// Only do the coercion if we're actually going to check the value.
				/* eslint-disable no-implicit-coercion */
				//setting input[value] to same value by typing on focused element moves cursor to end in Chrome
				//setting input[type=file][value] to same value causes an error to be generated if it's non-empty
				//minlength/maxlength validation isn't performed on script-set values(#2256)
				if ((vnode.tag === "input" || vnode.tag === "textarea") && vnode.dom.value === "" + value) return
				//setting select[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "select" && old !== null && vnode.dom.value === "" + value) return
				//setting option[value] to same value while having select open blinks select dropdown in Chrome
				if (vnode.tag === "option" && old !== null && vnode.dom.value === "" + value) return
				//setting input[type=file][value] to different value is an error if it's non-empty
				// Not ideal, but it at least works around the most common source of uncaught exceptions for now.
				if (vnode.tag === "input" && vnode.attrs.type === "file" && "" + value !== "") { console.error("`value` is read-only on file inputs!"); return }
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
		if (key === "key" || old == null || isLifecycleMethod(key)) return
		if (key[0] === "o" && key[1] === "n") updateEvent(vnode, key, undefined)
		else if (key === "style") updateStyle(vnode.dom, old, null)
		else if (
			hasPropertyKey(vnode, key, ns)
			&& key !== "className"
			&& key !== "title" // creates "null" as title
			&& !(key === "value" && (
				vnode.tag === "option"
				|| vnode.tag === "select" && vnode.dom.selectedIndex === -1 && vnode.dom === activeElement(vnode.dom)
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
		// Some attributes may NOT be case-sensitive (e.g. data-***),
		// so removal should be done first to prevent accidental removal for newly setting values.
		var val
		if (old != null) {
			if (old === attrs) {
				console.warn("Don't reuse attrs object, use new object for every redraw, this will throw in next major")
			}
			for (var key in old) {
				if (((val = old[key]) != null) && (attrs == null || attrs[key] == null)) {
					removeAttr(vnode, key, val, ns)
				}
			}
		}
		if (attrs != null) {
			for (var key in attrs) {
				setAttr(vnode, key, old && old[key], attrs[key], ns)
			}
		}
	}
	function isFormAttribute(vnode, attr) {
		return attr === "value" || attr === "checked" || attr === "selectedIndex" || attr === "selected" && (vnode.dom === activeElement(vnode.dom) || vnode.tag === "option" && vnode.dom.parentNode === activeElement(vnode.dom))
	}
	function isLifecycleMethod(attr) {
		return attr === "oninit" || attr === "oncreate" || attr === "onupdate" || attr === "onremove" || attr === "onbeforeremove" || attr === "onbeforeupdate"
	}
	function hasPropertyKey(vnode, key, ns) {
		// Filter out namespaced keys
		return ns === undefined && (
			// If it's a custom element, just keep it.
			vnode.tag.indexOf("-") > -1 || vnode.is ||
			// If it's a normal element, let's try to avoid a few browser bugs.
			key !== "href" && key !== "list" && key !== "form" && key !== "width" && key !== "height"// && key !== "type"
			// Defer the property check until *after* we check everything.
		) && key in vnode.dom
	}

	//style
	function updateStyle(element, old, style) {
		if (old === style) {
			// Styles are equivalent, do nothing.
		} else if (style == null) {
			// New style is missing, just clear it.
			element.style = ""
		} else if (typeof style !== "object") {
			// New style is a string, let engine deal with patching.
			element.style = style
		} else if (old == null || typeof old !== "object") {
			// `old` is missing or a string, `style` is an object.
			element.style = ""
			// Add new style properties
			for (var key in style) {
				var value = style[key]
				if (value != null) {
					if (key.includes("-")) element.style.setProperty(key, String(value))
					else element.style[key] = String(value)
				}
			}
		} else {
			// Both old & new are (different) objects.
			// Remove style properties that no longer exist
			// Style properties may have two cases(dash-case and camelCase),
			// so removal should be done first to prevent accidental removal for newly setting values.
			for (var key in old) {
				if (old[key] != null && style[key] == null) {
					if (key.includes("-")) element.style.removeProperty(key)
					else element.style[key] = ""
				}
			}
			// Update style properties that have changed
			for (var key in style) {
				var value = style[key]
				if (value != null && (value = String(value)) !== String(old[key])) {
					if (key.includes("-")) element.style.setProperty(key, value)
					else element.style[key] = value
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
		var self = this
		if (self._ != null) {
			if (ev.redraw !== false) (0, self._)()
			if (result != null && typeof result.then === "function") {
				Promise.resolve(result).then(function () {
					if (self._ != null && ev.redraw !== false) (0, self._)()
				})
			}
		}
		if (result === false) {
			ev.preventDefault()
			ev.stopPropagation()
		}
	}

	//event
	function updateEvent(vnode, key, value) {
		if (vnode.events != null) {
			vnode.events._ = currentRedraw
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

	var currentDOM

	return function(dom, vnodes, redraw) {
		if (!dom) throw new TypeError("DOM element being rendered to does not exist.")
		if (currentDOM != null && dom.contains(currentDOM)) {
			throw new TypeError("Node is currently being rendered to and thus is locked.")
		}
		var prevRedraw = currentRedraw
		var prevDOM = currentDOM
		var hooks = []
		var active = activeElement(dom)
		var namespace = dom.namespaceURI

		currentDOM = dom
		currentRedraw = typeof redraw === "function" ? redraw : undefined
		currentRender = {}
		try {
			// First time rendering into a node clears it out
			if (dom.vnodes == null) dom.textContent = ""
			vnodes = Vnode.normalizeChildren(Array.isArray(vnodes) ? vnodes : [vnodes])
			updateNodes(dom, dom.vnodes, vnodes, hooks, null, namespace === "http://www.w3.org/1999/xhtml" ? undefined : namespace)
			dom.vnodes = vnodes
			// `document.activeElement` can return null: https://html.spec.whatwg.org/multipage/interaction.html#dom-document-activeelement
			if (active != null && activeElement(dom) !== active && typeof active.focus === "function") active.focus()
			for (var i = 0; i < hooks.length; i++) hooks[i]()
		} finally {
			currentRedraw = prevRedraw
			currentDOM = prevDOM
		}
	}
}


/***/ }),

/***/ 7406:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var hyperscript = __webpack_require__(1571)
var request = __webpack_require__(4111)
var mountRedraw = __webpack_require__(4159)
var domFor = __webpack_require__(796)

var m = function m() { return hyperscript.apply(this, arguments) }
m.m = hyperscript
m.trust = hyperscript.trust
m.fragment = hyperscript.fragment
m.Fragment = "["
m.mount = mountRedraw.mount
m.route = __webpack_require__(9563)
m.render = __webpack_require__(5376)
m.redraw = mountRedraw.redraw
m.request = request.request
m.parseQueryString = __webpack_require__(3515)
m.buildQueryString = __webpack_require__(4432)
m.parsePathname = __webpack_require__(360)
m.buildPathname = __webpack_require__(6539)
m.vnode = __webpack_require__(1757)
m.censor = __webpack_require__(2381)
m.domFor = domFor.domFor

module.exports = m


/***/ }),

/***/ 7437:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MapEditorPage = void 0;
const tslib_1 = __webpack_require__(5959);
const mithril_materialized_1 = __webpack_require__(7578);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const MapEditorPage = () => {
    const state = {
        properties: {
            stringArray: ['a', 'b', 'c'],
            numberArray: [1, 2, 3],
            aNumber: 42,
            aString: 'Hello world',
            truthy: true,
            falsy: false,
        },
    };
    return {
        view: () => (0, mithril_1.default)('.col.s12', [
            (0, mithril_1.default)('h2.header', 'Key-value pairs editor'),
            (0, mithril_1.default)('p', [
                'As materializecss.com did not offer a useful editor for a map of key-value pairs, ',
                'I have created one myself. It allows you to edit (or just view, when it is disabled), ',
                'booleans, numbers, strings and arrays of numbers and strings.',
            ]),
            // m(EditableTable, {
            //   headers: ['title', 'description', 'priority'],
            //   cells,
            //   addRows: true,
            // }),
            (0, mithril_1.default)('h3.header', 'MapEditor'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.MapEditor, {
                label: 'Properties',
                isMandatory: true,
                properties: state.properties,
                onchange: (props) => console.table(props),
                labelKey: 'Unique key', // Override the default label for keys i.e. 'key'
                labelValue: 'My value', // Overrule the default label for values i.e. 'key'
                disable: false, // If true, the map cannot be edited
                disallowArrays: false, // If true, do not convert [1, 2, 3] to a number[]
                keyValueConverter: undefined, // Allows you to overrule the view of each key-value pair
                iconName: 'dns',
                keyClass: '.col.s4', // Optionally override the default key element
                valueClass: '.col.s8', // Optionally override the default value element
                truthy: ['true', 'yes', 'ja', 'oui', 'si', 'da'],
                falsy: ['false', 'no', 'nee', 'nein', 'non', 'nu', 'njet'],
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
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
          })`,
            }),
        ]),
    };
};
exports.MapEditorPage = MapEditorPage;


/***/ }),

/***/ 7548:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8771);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3560);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4404);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2851);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9751);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4836);
/* harmony import */ var _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8002);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 7578:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

function e(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}var t=/*#__PURE__*/e(__webpack_require__(7406));function n(){return n=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},n.apply(this,arguments)}function a(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)t.indexOf(n=o[a])>=0||(i[n]=e[n]);return i}var i,o=function(){return"idxxxxxxxx".replace(/[x]/g,function(){return(16*Math.random()|0).toString(16)})},l=function(e,t,n){return void 0===t&&(t=2),void 0===n&&(n="0"),String(e).padStart(t,n)},r=["label","id","isMandatory","isActive","className"],c={view:function(e){return t.default("span.mandatory",e.attrs,"*")}},s=function(){return{view:function(e){var i=e.attrs,o=i.label,l=i.id,s=i.isMandatory,d=i.isActive,u=i.className,f=a(i,r);return o?t.default("label",n({},f,{className:[u,d?"active":""].filter(Boolean).join(" ").trim(),for:l}),[t.default.trust(o),s?t.default(c):void 0]):void 0}}},d=function(){return{view:function(e){var n=e.attrs,a=n.helperText,i=n.dataError,o=n.dataSuccess;return a||i||o?t.default("span.helper-text.left",{className:n.className,"data-error":i,"data-success":o},a?t.default.trust(a):""):void 0}}},u=["label","helperText","onchange","newRow","className","style","iconName","isMandatory","data","limit","minLength"],f=["iconName"],p=function(){return{view:function(e){var n=e.attrs,i=n.iconName,o=a(n,f);return t.default("i.material-icons",o,i)}}},m=["modalId","tooltip","tooltipPostion","iconName","iconClass","label","className","attr"],v=function(e,i,o){return void 0===o&&(o=""),function(){return{view:function(l){var r=l.attrs,c=r.modalId,s=r.tooltip,d=r.tooltipPostion,u=r.iconName,f=r.iconClass,v=r.label,h=r.className,g=r.attr,x=a(r,m),b=[c?"modal-trigger":"",s?"tooltipped":"",i,h].filter(Boolean).join(" ").trim();return t.default(e,n({},x,g,{className:b,href:c?"#"+c:void 0,"data-position":s?d||"top":void 0,"data-tooltip":s||void 0,type:o}),u?t.default(p,{iconName:u,className:f||"left"}):void 0,v||void 0)}}}},h=v("a","waves-effect waves-light btn","button"),g=v("a","waves-effect waves-light btn-large","button"),x=v("a","waves-effect waves-light btn-small","button"),b=v("a","waves-effect waves-teal btn-flat","button"),y=v("button","btn-floating btn-large waves-effect waves-light","button"),w=v("button","btn waves-effect waves-light","submit"),k=["href","src","alt"],I=function(){return{view:function(e){var i=e.attrs,o=i.href,l=i.src,r=i.alt,c=a(i,k);return t.default("a.carousel-item",n({},c,{href:o}),t.default("img",{src:l,alt:r}))}}},N=["newRow","code","language","className"],O=function(){return{view:function(e){var n=e.attrs,a=n.header,i=n.body,o=n.iconName,l=n.isActive;return t.default("li",{className:l?"active":""},[a||o?t.default(".collapsible-header",{onclick:n.onToggle,style:{cursor:"pointer"}},[o?t.default("i.material-icons",o):void 0,a?"string"==typeof a?t.default("span",a):a:void 0]):void 0,t.default(".collapsible-body",{style:{display:l?"block":"none",padding:l?"1rem":"0"}},i?"string"==typeof i?t.default("div",{innerHTML:i}):i:void 0)])}}},C=["header","items","mode"],A=["title","active","href"],T=["items","header"],D=["items","header","mode"];exports.CollectionMode=void 0,(i=exports.CollectionMode||(exports.CollectionMode={}))[i.BASIC=0]="BASIC",i[i.LINKS=1]="LINKS",i[i.AVATAR=2]="AVATAR";var L=function(e){return e&&/https?:\/\//.test(e)},S=function(){return{view:function(e){var n=e.attrs,a=n.href,i=n.iconName,o=void 0===i?"send":i,l=n.onclick,r=n.style,c={href:a,style:void 0===r?{cursor:"pointer"}:r,className:"secondary-content",onclick:l?function(){return l(n)}:void 0};return L(a)||!a?t.default("a[target=_]",c,t.default(p,{iconName:o})):t.default(t.default.route.Link,c,t.default(p,{iconName:o}))}}},E=function(e){return void 0===e&&(e=""),/\./.test(e)},V=function(){return{view:function(e){var n=e.attrs,a=n.item,i=a.title,o=a.content,l=void 0===o?"":o,r=a.active,c=a.iconName,s=a.avatar,d=a.className,u=a.onclick;return n.mode===exports.CollectionMode.AVATAR?t.default("li.collection-item.avatar",{className:r?"active":"",onclick:u?function(){return u(a)}:void 0},[E(s)?t.default("img.circle",{src:s}):t.default("i.material-icons.circle",{className:d},s),t.default("span.title",i),t.default("p",t.default.trust(l)),t.default(S,a)]):t.default("li.collection-item",{className:r?"active":""},c?t.default("div",[i,t.default(S,a)]):i)}}},B=function(){return{view:function(e){var n=e.attrs,i=n.header,o=n.items,l=n.mode,r=void 0===l?exports.CollectionMode.BASIC:l,c=a(n,C),s=o.map(function(e){return t.default(V,{key:e.id,item:e,mode:r})});return i?t.default("ul.collection.with-header",c,[t.default("li.collection-header",t.default("h4",i)),s]):t.default("ul.collection",c,s)}}},R=function(){return{view:function(e){var i=e.attrs.item,o=i.title,l=i.active,r=i.href,c=n({},a(i,A),{className:"collection-item "+(l?"active":""),href:r});return L(r)||!r?t.default("a[target=_]",c,o):t.default(t.default.route.Link,c,o)}}},j=function(){return{view:function(e){var n=e.attrs,i=n.items,o=n.header,l=a(n,T);return o?t.default(".collection.with-header",l,[t.default(".collection-header",t.default("h4",o)),i.map(function(e){return t.default(R,{key:e.id,item:e})})]):t.default(".collection",l,i.map(function(e){return t.default(R,{key:e.id,item:e})}))}}},F=function(){return{view:function(e){var i=e.attrs,o=i.items,l=i.header,r=i.mode,c=void 0===r?exports.CollectionMode.BASIC:r,s=a(i,D);return l||o&&o.length>0?c===exports.CollectionMode.LINKS?t.default(j,n({header:l,items:o},s)):t.default(B,n({header:l,items:o,mode:c},s)):void 0}}},P=["className","helperText","iconName","id","initialValue","isMandatory","label","onchange","onkeydown","onkeypress","onkeyup","onblur","style"],H=["className","dataError","dataSuccess","helperText","iconName","id","initialValue","isMandatory","label","maxLength","newRow","onchange","onkeydown","onkeypress","onkeyup","onblur","style","validate"],K=function(){var e={id:o()};return{view:function(i){var o=i.attrs,l=o.className,r=void 0===l?"col s12":l,c=o.helperText,u=o.iconName,f=o.id,p=void 0===f?e.id:f,m=o.initialValue,v=o.isMandatory,h=o.label,g=o.onchange,x=o.onkeydown,b=o.onkeypress,y=o.onkeyup,w=o.onblur,k=o.style,I=a(o,P);return t.default(".input-field",{className:r,style:k},[u?t.default("i.material-icons.prefix",u):"",t.default("textarea.materialize-textarea",n({},I,{id:p,tabindex:0,oncreate:function(e){var t=e.dom,n=function(){t.style.height="auto",t.style.height=t.scrollHeight+"px"};if(t.addEventListener("input",n),n(),o.maxLength){var a=function(){var e,n,a=t.value.length,i=o.maxLength||0,l=null==(e=t.parentElement)?void 0:e.querySelector(".character-counter");l||((l=document.createElement("span")).className="character-counter",null==(n=t.parentElement)||n.appendChild(l)),l.textContent=a+"/"+i,l.style.color=a>i?"var(--md-error)":"var(--md-grey-600)"};t.addEventListener("input",a),a()}},onchange:g?function(e){var t=e.target;g(t&&"string"==typeof t.value?t.value:"")}:void 0,value:m,onkeyup:y?function(e){y(e,e.target.value)}:void 0,onkeydown:x?function(e){x(e,e.target.value)}:void 0,onkeypress:b?function(e){b(e,e.target.value)}:void 0,onblur:w})),t.default(s,{label:h,id:p,isMandatory:v,isActive:m||o.placeholder}),t.default(d,{helperText:c})])}}},_=function(e,i){return void 0===i&&(i=""),function(){var l={id:o()},r=function(t){var n=t.value;return!n||"number"!==e&&"range"!==e?n:+n},c=function(e,t){e.setCustomValidity("boolean"==typeof t?t?"":"Custom validation failed":t)};return{view:function(o){var u=o.attrs,f=u.className,p=void 0===f?"col s12":f,m=u.dataError,v=u.dataSuccess,h=u.helperText,g=u.iconName,x=u.id,b=void 0===x?l.id:x,y=u.initialValue,w=u.isMandatory,k=u.label,I=u.maxLength,N=u.newRow,O=u.onchange,C=u.onkeydown,A=u.onkeypress,M=u.onkeyup,T=u.onblur,D=u.style,L=u.validate,S=a(u,H),E=[N?"clear":"",i,p].filter(Boolean).join(" ").trim();return t.default(".input-field",{className:E,style:D},[g?t.default("i.material-icons.prefix",g):void 0,t.default("input.validate",n({},S,{type:e,tabindex:0,id:b,oncreate:function(t){var n,a=t.dom;(n=u.autofocus)&&("boolean"==typeof n?n:n())&&a.focus();var i=a;if(I){var o=function(){var e,t,n=i.value.length,a=null==(e=i.parentElement)?void 0:e.querySelector(".character-counter");a||((a=document.createElement("span")).className="character-counter",null==(t=i.parentElement)||t.appendChild(a)),a.textContent=n+"/"+I,a.style.color=n>I?"var(--md-error)":"var(--md-grey-600)"};i.addEventListener("input",o),o()}if("range"===e){var l=function(){var e=i.min||"0",t=i.max||"100",n=(parseFloat(i.value)-parseFloat(e))/(parseFloat(t)-parseFloat(e))*100;i.style.setProperty("--range-progress",n+"%")};i.addEventListener("input",l),l()}},onkeyup:M?function(e){M(e,r(e.target))}:void 0,onkeydown:C?function(e){C(e,r(e.target))}:void 0,onkeypress:A?function(e){A(e,r(e.target))}:void 0,onblur:T,onupdate:L?function(e){var t=e.dom;c(t,L(r(t),t))}:void 0,onchange:function(e){var t=e.target;if(t){var n=r(t);O&&O(n),L&&c(t,L(n,t))}},value:y})),t.default(s,{label:k,id:b,isMandatory:w,isActive:!(void 0===y&&!u.placeholder&&"number"!==e&&"color"!==e&&"range"!==e)}),t.default(d,{helperText:h,dataError:m,dataSuccess:v})])}}}},U=_("text"),z=_("password"),q=_("number"),Y=_("url"),W=_("color"),J=_("range",".range-field"),$=_("email"),X=function(){return{view:function(e){var n=e.attrs,a=n.className,i=n.onchange,o=n.label,l=n.description;return t.default("div",{className:void 0===a?"col s12":a,style:n.style},t.default("label",[t.default("input[type=checkbox][tabindex=0]",{checked:n.checked,disabled:n.disabled,onclick:i?function(e){e.target&&void 0!==e.target.checked&&i(e.target.checked)}:void 0}),o?"string"==typeof o?t.default("span",o):o:void 0]),l&&t.default(d,{className:"input-checkbox-desc",helperText:l}))}}},G=function(){return{view:function(e){var n=e.attrs,a=n.title;return t.default("li",{className:n.active?"active":n.disabled?"disabled":"waves-effect"},"number"==typeof a?t.default(t.default.route.Link,{href:n.href},a):a)}}},Q=["label","helperText","initialValue","newRow","className","iconName","isMandatory","onchange","disabled"],Z=["label","helperText","initialValue","newRow","className","iconName","isMandatory","onchange","disabled"],ee=function(){return{view:function(e){var n=e.attrs,a=n.id,i=n.label,o=n.onchange,l=n.className;return t.default("div",{className:void 0===l?"col s12":l},t.default("label",[t.default("input[type=radio][tabindex=0]",{name:n.groupId,disabled:n.disabled,checked:n.checked,onclick:o?function(){return o(a)}:void 0}),t.default("span",t.default.trust(i))]))}}},te=["label","left","right","disabled","newRow","onchange","checked","isMandatory","className"],ne=function(){return{view:function(e){var n=e.attrs,a=n.id,i=n.title,o=n.datetime,l=n.active,r=n.content,c=n.iconName,s=n.timeFormatter,d=n.onSelect;return t.default("li",{id:a,className:l?"active":void 0,onclick:d?function(){return d({id:a,title:i,datetime:o,active:l,content:r})}:void 0,style:d?"cursor: pointer;":void 0},[t.default(".mm_time",{datetime:o},[t.default("span",(0,n.dateFormatter)(o)),t.default("span",s(o))]),c?t.default(".mm_icon",t.default("i.material-icons",c)):void 0,t.default(".mm_label",[i?"string"==typeof i?t.default("h5",i):i:void 0,r?"string"==typeof r?t.default("p",r):r:void 0])])}}};exports.AnchorItem=R,exports.Autocomplete=function(){var e={id:o(),inputValue:"",isOpen:!1,suggestions:[],selectedIndex:-1},i=function(t,n){e.inputValue=t.key,e.isOpen=!1,e.selectedIndex=-1,n.onchange&&n.onchange(t.key),n.onAutocomplete&&n.onAutocomplete(t.key)},l=function(t){t.target.closest(".autocomplete-wrapper")||(e.isOpen=!1,e.selectedIndex=-1)};return{oninit:function(t){e.inputValue=t.attrs.initialValue||"",document.addEventListener("click",l)},onremove:function(){document.removeEventListener("click",l)},view:function(o){var l=o.attrs,r=l.id||e.id,c=l.label,f=l.helperText,p=l.onchange,m=l.newRow,v=l.className,h=void 0===v?"col s12":v,g=l.style,x=l.iconName,b=l.isMandatory,y=l.data,w=void 0===y?{}:y,k=l.limit,I=void 0===k?Infinity:k,N=l.minLength,O=void 0===N?1:N,C=a(l,u),A=m?h+" clear":h;return e.suggestions=function(e,t,n,a){return!e||e.length<a?[]:Object.entries(t||{}).filter(function(t){return t[0].toLowerCase().includes(e.toLowerCase())}).map(function(e){return{key:e[0],value:e[1]}}).slice(0,n)}(e.inputValue,w,I,O),e.isOpen=e.suggestions.length>0&&e.inputValue.length>=O,t.default(".autocomplete-wrapper",{className:A,style:g},[t.default(".input-field",[x?t.default("i.material-icons.prefix",x):"",t.default("input",n({},C,{className:"autocomplete",type:"text",tabindex:0,id:r,value:e.inputValue,oninput:function(t){var n=t.target;e.inputValue=n.value,e.selectedIndex=-1,p&&p(n.value)},onkeydown:function(t){return function(t,n){if(e.isOpen)switch(t.key){case"ArrowDown":t.preventDefault(),e.selectedIndex=Math.min(e.selectedIndex+1,e.suggestions.length-1);break;case"ArrowUp":t.preventDefault(),e.selectedIndex=Math.max(e.selectedIndex-1,-1);break;case"Enter":t.preventDefault(),e.selectedIndex>=0&&e.suggestions[e.selectedIndex]&&i(e.suggestions[e.selectedIndex],n);break;case"Escape":t.preventDefault(),e.isOpen=!1,e.selectedIndex=-1}}(t,l)},onfocus:function(){e.inputValue.length>=O&&(e.isOpen=e.suggestions.length>0)}})),t.default(s,{label:c,id:r,isMandatory:b,isActive:e.inputValue.length>0||l.placeholder}),t.default(d,{helperText:f}),e.isOpen&&t.default(".autocomplete-content",{style:{position:"absolute",top:"100%",left:"0",right:"0",background:"white",boxShadow:"var(--md-shadow-2)",borderRadius:"var(--md-radius-small)",maxHeight:"200px",overflowY:"auto",zIndex:"1000",marginTop:"4px"}},e.suggestions.map(function(n,a){return t.default("li",{key:n.key,className:a===e.selectedIndex?"selected":"",style:{listStyle:"none",padding:"var(--md-spacing-sm) var(--md-spacing-md)",cursor:"pointer",borderBottom:"1px solid var(--md-grey-200)",backgroundColor:a===e.selectedIndex?"var(--md-grey-100)":"transparent",transition:"background-color var(--md-transition-fast)"},onclick:function(){return i(n,l)},onmouseover:function(){e.selectedIndex=a}},[t.default("span",n.key),n.value&&t.default("small",{style:{color:"var(--md-grey-600)",marginLeft:"var(--md-spacing-sm)"}},n.value)])}))])])}}},exports.Button=h,exports.ButtonFactory=v,exports.Carousel=function(){return{view:function(e){var n=e.attrs,a=n.items;return a&&a.length>0?t.default(".carousel",{oncreate:function(e){M.Carousel.init(e.dom,n)}},a.map(function(e){return t.default(I,e)})):void 0}}},exports.CarouselItem=I,exports.Chips=function(){var e={chipsData:[],selectedChip:null,focused:!1,inputValue:"",inputId:o(),autocompleteItems:[],selectedAutocompleteIndex:-1,showAutocomplete:!1},n=null,a=function(){var t;if(null!=(t=n)&&null!=(t=t.attrs.autocompleteOptions)&&t.data){var a=n.attrs.autocompleteOptions,i=a.data,o=a.minLength,l=void 0===o?1:o,r=e.inputValue.toLowerCase();if(r.length<l)return e.autocompleteItems=[],void(e.showAutocomplete=!1);var c=function(e){return Array.isArray(e)?e.map(function(e){return"string"==typeof e?{tag:e}:e}):Object.entries(e).map(function(e){var t=e[0];return{tag:t,value:e[1]||t}})}(i),s=c.filter(function(e){return e.tag.toLowerCase().includes(r)});e.autocompleteItems=s.slice(0,n.attrs.autocompleteOptions.limit||Infinity),e.showAutocomplete=e.autocompleteItems.length>0,e.selectedAutocompleteIndex=-1}else e.autocompleteItems=[]},i=function(t){l({tag:t.tag,image:t.image,alt:t.alt}),e.inputValue="",e.showAutocomplete=!1,e.selectedAutocompleteIndex=-1},l=function(t){if(n){var a=n.attrs,i=a.limit,o=void 0===i?Infinity:i,l=a.onChipAdd,r=a.onchange;!function(e,t){return!(!e.tag||""===e.tag.trim()||t.some(function(t){return t.tag===e.tag}))}(t,e.chipsData)||e.chipsData.length>=o||(e.chipsData=[].concat(e.chipsData,[t]),e.inputValue="",l&&l(t),r&&r(e.chipsData))}},r=function(t){if(n){var a=n.attrs,i=a.onChipDelete,o=a.onchange,l=e.chipsData[t];e.chipsData=e.chipsData.filter(function(e,n){return n!==t}),e.selectedChip=null,i&&i(l),o&&o(e.chipsData)}},c=function(t){if(n){var a=n.attrs.onChipSelect;e.selectedChip=t,a&&e.chipsData[t]&&a(e.chipsData[t])}},u=function(t){var a=t.target;if(e.showAutocomplete){if("ArrowDown"===t.key){var o;t.preventDefault(),e.selectedAutocompleteIndex=Math.min(e.selectedAutocompleteIndex+1,e.autocompleteItems.length-1);var s=null==(o=n)?void 0:o.dom.querySelector(".autocomplete-item.selected");return void(s&&s.scrollIntoView({block:"nearest"}))}if("ArrowUp"===t.key){var d;t.preventDefault(),e.selectedAutocompleteIndex=Math.max(e.selectedAutocompleteIndex-1,-1);var u=null==(d=n)?void 0:d.dom.querySelector(".autocomplete-item.selected");return void(u&&u.scrollIntoView({block:"nearest"}))}if("Enter"===t.key&&e.selectedAutocompleteIndex>=0)return t.preventDefault(),void i(e.autocompleteItems[e.selectedAutocompleteIndex])}"Enter"===t.key&&a.value.trim()?(t.preventDefault(),l({tag:a.value.trim()})):"Backspace"===t.key&&!a.value&&e.chipsData.length>0?(t.preventDefault(),r(e.chipsData.length-1)):"ArrowLeft"===t.key&&!a.value&&e.chipsData.length&&(t.preventDefault(),c(e.chipsData.length-1))};return{oninit:function(t){e.chipsData=t.attrs.data||[]},oncreate:function(e){n=e},onremove:function(){n=null},view:function(o){var l=o.attrs,f=l.isMandatory,p=void 0===f?l.required:f,m=l.className,v=l.label,h=l.helperText,g=l.placeholder,x=l.secondaryPlaceholder;return t.default(".input-field",{id:l.id,className:void 0===m?"col s12":m},[t.default(".chips.chips-initial",{class:"chips-container "+(e.focused?"focused":"")+" "+(g?"chips-placeholder":"")},[e.chipsData.map(function(a,i){return t.default(".chip",{key:a.tag+"-"+i,tabindex:0,class:e.selectedChip===i?"selected":"",onkeydown:function(t){return function(t,a){if("Backspace"===t.key||"Delete"===t.key){t.preventDefault(),r(a);var i=Math.max(a-1,0);e.chipsData.length&&c(i)}else if("ArrowLeft"===t.key&&a>0)c(a-1);else if("ArrowRight"===t.key)if(a<e.chipsData.length-1)c(a+1);else{var o,l=null==(o=n)?void 0:o.dom.querySelector(".chips-input");l&&l.focus()}}(t,i)}},[a.image&&t.default("img",{src:a.image,alt:a.alt||a.tag}),a.tag,t.default("i.material-icons.close",{onclick:function(e){e.stopPropagation(),r(i)}},"close")])}),t.default("input.chips-input.input",{id:e.inputId,title:"label",value:e.inputValue,placeholder:!e.chipsData.length&&g?g:e.chipsData.length&&x?x:"",oninput:function(t){e.inputValue=t.target.value,a()},onfocus:function(){e.focused=!0,e.selectedChip=null,a()},onblur:function(){e.focused=!1,setTimeout(function(){e.showAutocomplete=!1,e.selectedChip=null},150)},onkeydown:u}),e.showAutocomplete&&t.default("ul.autocomplete-content.dropdown-content",{style:{display:"block",opacity:1,transform:"scaleX(1) scaleY(1)",position:"absolute",width:"100%",left:0,top:"100%",maxHeight:"200px",overflow:"auto",zIndex:1e3,backgroundColor:"#fff",boxShadow:"0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2)"}},e.autocompleteItems.map(function(n,a){return t.default("li.autocomplete-item",{key:n.tag,class:e.selectedAutocompleteIndex===a?"selected":"",style:{padding:"12px 16px",cursor:"pointer",backgroundColor:e.selectedAutocompleteIndex===a?"#eee":"transparent"},onmousedown:function(e){e.preventDefault(),i(n)},onmouseover:function(){e.selectedAutocompleteIndex=a}},[n.image&&t.default("img.autocomplete-item-image",{src:n.image,alt:n.alt||n.tag,style:{width:"24px",height:"24px",marginRight:"8px",verticalAlign:"middle"}}),t.default("span.autocomplete-item-text",n.tag)])}))]),v&&t.default(s,{label:v,id:e.inputId,isMandatory:p,isActive:!!(e.focused||e.chipsData.length||g)}),h&&t.default(d,{helperText:h})])}}},exports.CodeBlock=function(){return{view:function(e){var i=e.attrs,o=i.newRow,l=i.code,r=i.language,c=i.className,s=a(i,N),d=r||"lang-TypeScript",u=d.replace("lang-",""),f=l instanceof Array?l.join("\n"):l,p=[o?"clear":"",d,c].filter(Boolean).join(" ").trim();return t.default("pre.codeblock"+(o?".clear":""),i,[t.default("div",t.default("label",u)),t.default("code",n({},s,{className:p}),f)])}}},exports.Collapsible=function(){var e={activeItems:new Set};return{oninit:function(t){t.attrs.items.forEach(function(t,n){t.active&&e.activeItems.add(n)})},view:function(a){var i=a.attrs,o=i.items,l=i.accordion,r=void 0===l||l;return o&&o.length>0?t.default("ul.collapsible",{class:i.class||i.className,style:i.style,id:i.id},o.map(function(a,i){return t.default(O,n({},a,{isActive:e.activeItems.has(i),onToggle:function(){return function(t){r?e.activeItems.has(t)?e.activeItems.clear():(e.activeItems.clear(),e.activeItems.add(t)):e.activeItems.has(t)?e.activeItems.delete(t):e.activeItems.add(t)}(i)}}))})):void 0}}},exports.CollapsibleItem=O,exports.Collection=F,exports.ColorInput=W,exports.DatePicker=function(){var e={id:o()};return{view:function(i){var o=i.attrs,l=o.label,r=o.helperText,c=o.initialValue,u=o.newRow,f=o.className,p=void 0===f?"col s12":f,m=o.iconName,v=o.isMandatory,h=o.onchange,g=o.disabled,x=a(o,Q),b=e.id,y=h?function(){return e.dp&&h(e.dp.date)}:void 0,w=[u?"clear":"",p].filter(Boolean).join(" ").trim();return t.default(".input-field",{className:w,onremove:function(){return e.dp&&e.dp.destroy()}},[m?t.default("i.material-icons.prefix",m):"",t.default("input",n({},x,{type:"text",tabindex:0,className:"datepicker",id:b,disabled:g,oncreate:function(t){e.dp=M.Datepicker.init(t.dom,n({format:"yyyy/mm/dd",showClearBtn:!0,setDefaultDate:!0,defaultDate:c?new Date(c):new Date},x,{onClose:y}))}})),t.default(s,{label:l,id:b,isMandatory:v,isActive:!!c}),t.default(d,{helperText:r})])}}},exports.Dropdown=function(){var e={isOpen:!1,initialValue:void 0,id:"",focusedIndex:-1},n=function(t){t.target.closest(".dropdown-wrapper")||(e.isOpen=!1,e.focusedIndex=-1)};return{oninit:function(t){var a=t.attrs,i=a.id,l=void 0===i?o():i,r=a.initialValue,c=a.checkedId;e.id=l,e.initialValue=r||c,document.addEventListener("click",n)},onremove:function(){document.removeEventListener("click",n)},view:function(n){var a=n.attrs,i=a.key,o=a.label,l=a.onchange,r=a.disabled,c=void 0!==r&&r,s=a.items,u=a.iconName,f=a.helperText,p=a.style,m=a.className,v=void 0===m?"col s12":m,h=e.id,g=e.initialValue,x=g?s.filter(function(e){return e.id?e.id===g:e.label===g}).shift():void 0,b=x?x.label:o||"Select",y=s.filter(function(e){return!e.divider&&!e.disabled});return t.default(".dropdown-wrapper.input-field",{className:v,key:i,style:p},[u?t.default("i.material-icons.prefix",u):void 0,t.default(d,{helperText:f}),t.default("button.dropdown-trigger.btn.truncate",{id:h+"-trigger",disabled:c,className:"col s12",style:p||(u?"margin: 0.2em 0 0 3em;":void 0),onclick:function(){c||(e.isOpen=!e.isOpen,e.focusedIndex=e.isOpen?0:-1)},onkeydown:function(t){c||function(t,n,a){var i=n.filter(function(e){return!e.divider&&!e.disabled});switch(t.key){case"ArrowDown":t.preventDefault(),e.isOpen?e.focusedIndex=Math.min(e.focusedIndex+1,i.length-1):(e.isOpen=!0,e.focusedIndex=0);break;case"ArrowUp":t.preventDefault(),e.isOpen&&(e.focusedIndex=Math.max(e.focusedIndex-1,0));break;case"Enter":case" ":if(t.preventDefault(),e.isOpen&&e.focusedIndex>=0&&e.focusedIndex<i.length){var o=i[e.focusedIndex],l=o.id||o.label;e.initialValue=l,e.isOpen=!1,e.focusedIndex=-1,a&&a(l)}else e.isOpen||(e.isOpen=!0,e.focusedIndex=0);break;case"Escape":t.preventDefault(),e.isOpen=!1,e.focusedIndex=-1}}(t,s,l)},"aria-haspopup":"listbox","aria-expanded":e.isOpen?"true":"false","aria-controls":h,tabindex:c?-1:0},[b,t.default("i.material-icons.right","arrow_drop_down")]),e.isOpen&&t.default("ul.dropdown-content.active",{id:h,role:"listbox","aria-labelledby":h+"-trigger",style:{display:"block",opacity:1,position:"absolute",zIndex:1e3,width:"100%",top:"100%",left:0,backgroundColor:"white",boxShadow:"0 2px 5px rgba(0,0,0,0.16), 0 2px 10px rgba(0,0,0,0.12)",borderRadius:"2px",maxHeight:"200px",overflowY:"auto"}},s.map(function(n,a){if(n.divider)return t.default("li.divider",{key:"divider-"+a,style:{height:"1px",backgroundColor:"#e0e0e0",margin:"5px 0"}});var i=y.indexOf(n)===e.focusedIndex;return t.default("li",{key:n.id||"item-"+a,tabindex:-1,className:[n.disabled?"disabled":"",i?"focused":""].filter(Boolean).join(" "),style:{backgroundColor:i?"#f5f5f5":"transparent",cursor:n.disabled?"not-allowed":"pointer"},role:"option","aria-selected":(null==x?void 0:x.id)===n.id||(null==x?void 0:x.label)===n.label},t.default("a",{onclick:!n.disabled&&l?function(t){t.preventDefault();var a=n.id||n.label;e.initialValue=a,e.isOpen=!1,e.focusedIndex=-1,l(a)}:void 0,style:{display:"flex",alignItems:"center",padding:"14px 16px",color:n.disabled?"#9e9e9e":"#212121",textDecoration:"none"}},[n.iconName?t.default("i.material-icons",{style:{marginRight:"32px"}},n.iconName):void 0,n.label]))}))])}}},exports.EmailInput=$,exports.FileInput=function(){var e,n=!1;return{view:function(a){var i=a.attrs,o=i.multiple,l=i.disabled,r=i.initialValue,c=i.placeholder,s=i.onchange,d=i.className,u=void 0===d?"col s12":d,f=i.accept,p=i.label,m=void 0===p?"File":p,v=f?f instanceof Array?f.join(", "):f:void 0;return t.default(".file-field.input-field",{className:i.class||u},[t.default(".btn",[t.default("span",m),t.default("input[type=file]",{title:m,accept:v,multiple:o,disabled:l,onchange:s?function(e){var t=e.target;t&&t.files&&s&&(n=!0,s(t.files))}:void 0})]),t.default(".file-path-wrapper",t.default("input.file-path.validate[type=text]",{placeholder:c,oncreate:function(t){e=t.dom,r&&(e.value=r)}})),(n||r)&&t.default("a.waves-effect.waves-teal.btn-flat",{style:{float:"right",position:"relative",top:"-3rem",padding:0},onclick:function(){n=!1,e.value="",s&&s({})}},t.default("i.material-icons","clear"))])}}},exports.FlatButton=b,exports.FloatingActionButton=function(){var e={isOpen:!1},n=function(t){t.target.closest(".fixed-action-btn")||(e.isOpen=!1)};return{oncreate:function(){document.addEventListener("click",n)},onremove:function(){document.removeEventListener("click",n)},view:function(n){var a=n.attrs,i=a.className,o=a.iconName,l=a.iconClass,r=void 0===l?"large":l,c=a.position,s=a.style,d=void 0===s?"left"===c||"inline-left"===c?"position: absolute; display: inline-block; left: 24px;":"right"===c||"inline-right"===c?"position: absolute; display: inline-block; right: 24px;":void 0:s,u=a.buttons,f=a.direction,p=void 0===f?"top":f,m=a.hoverEnabled,v=void 0===m||m,h=["fixed-action-btn",p?"direction-"+p:"",e.isOpen?"active":"",v?"hover-enabled":""].filter(Boolean).join(" "),g=t.default("."+h,{style:d,onclick:function(t){t.stopPropagation(),u&&u.length>0&&(e.isOpen=!e.isOpen)},onmouseover:v?function(){u&&u.length>0&&(e.isOpen=!0)}:void 0,onmouseleave:v?function(){e.isOpen=!1}:void 0},[t.default("a.btn-floating.btn-large.waves-effect.waves-light",{className:i||"red",style:{transform:e.isOpen?"rotate(45deg)":"rotate(0deg)",transition:"transform 0.3s ease"}},t.default("i.material-icons",{className:r},o)),u&&u.length>0?t.default("ul",{style:{visibility:e.isOpen?"visible":"hidden",opacity:e.isOpen?"1":"0",transform:e.isOpen?"scale(1)":"scale(0.4)",transition:"opacity 0.3s ease, transform 0.3s ease, visibility 0.3s ease"}},u.map(function(n,a){return t.default("li",{style:{opacity:e.isOpen?"1":"0",transform:e.isOpen?"scale(1)":"scale(0.4)",transition:"all 0.3s ease "+40*a+"ms"}},t.default("a.btn-floating.waves-effect.waves-light",{className:n.className||"red",onclick:function(e){e.stopPropagation(),n.onClick&&n.onClick(e)}},t.default("i.material-icons",{className:n.iconClass},n.iconName)))})):void 0]);return"inline-right"===c||"inline-left"===c?t.default("div",{style:"position: relative; height: 70px;"},g):g}}},exports.HelperText=d,exports.Icon=p,exports.InputCheckbox=X,exports.Label=s,exports.LargeButton=g,exports.ListItem=V,exports.Mandatory=c,exports.MapEditor=function(){var e=function(e){return n.curKey=n.id=e},n={elementId:o(),id:"",curKey:"",kvc:function(e,n,a){var i=a.keyClass,o=void 0===i?".col.s4":i,l=a.valueClass,r=void 0===l?".col.s8":l,c=n instanceof Array?n.join(", "):"boolean"==typeof n?t.default(X,{label:" ",checked:n,disabled:!0,className:"checkbox-in-collection"}):n.toString();return{title:t.default(".row",{style:"margin-bottom: 0"},[t.default(o,t.default("b",e)),t.default(r,c)])}}},a=function(){n.id="",n.curKey=""};return{oninit:function(e){var t=e.attrs,a=t.keyValueConverter,i=t.id;a&&(n.kvc=a),i&&(n.elementId=i)},view:function(i){var o=i.attrs,l=o.className,r=void 0===l?"col s12":l,c=o.disabled,d=o.disallowArrays,u=o.header,f=o.iconName,p=o.iconNameKey,m=void 0===p?f?"label":void 0:p,v=o.isMandatory,h=o.label,g=o.labelKey,x=void 0===g?"Key":g,y=o.labelValue,w=void 0===y?"Value":y,k=o.properties,I=o.onchange,N=o.falsy,O=void 0===N?["false"]:N,C=o.truthy,A=void 0===C?["true"]:C,M=function(){return I?I(k):void 0},T=function(t,a){return Object.keys(t).map(function(e){return{key:e,value:t[e]}}).map(function(t){return function(t,a){var i=a.onclick;return a.id=a.id||t,a.active=t===n.curKey,a.onclick=i?function(){return e(t)&&i(a)}:function(){return e(t)},a}(t.key,n.kvc(t.key,t.value,{keyClass:a.keyClass,valueClass:a.valueClass}))})}(k,{keyClass:o.keyClass,valueClass:o.valueClass}),D=n.curKey,L=k[D],S="boolean"==typeof L||"number"==typeof L?L:L?L instanceof Array?"["+L.join(", ")+"]":L:"",E=n.elementId;return[t.default(".map-editor",t.default(".input-field",{className:r,style:"min-height: 1.5em;"},[f?t.default("i.material-icons.prefix",f):"",t.default(s,{label:h,isMandatory:v,isActive:T.length>0}),t.default(F,{id:E,items:T,mode:exports.CollectionMode.LINKS,header:u})])),c?void 0:[t.default(U,{label:x,iconName:m,className:"col s5",initialValue:D,onchange:function(e){n.curKey=e,n.id&&(delete k[n.id],k[e]=L,n.id=e),M()}}),"string"==typeof S?t.default(K,{label:w,initialValue:S,className:"col s7",onchange:function(e){var t=function(e,t,n){return t.indexOf(e)>=0||!(n.indexOf(e)>=0)&&void 0}(e,A,O),n=void 0===t&&/^\s*\d+\s*$/i.test(e)?+e:void 0;k[D]="boolean"==typeof t?t:"number"==typeof n?n:function(e,t){if(void 0===t&&(t=!1),t)return e;if(e){var n=/\s*\[(.*)\]\s*/gi.exec(e);if(n&&2===n.length)return n[1].split(",").map(function(e){return e.trim()}).map(function(e){return/^\d+$/g.test(e)?+e:e})}}(e,d)||e,M()}}):"number"==typeof S?t.default(q,{label:w,initialValue:S,className:"col s7",onchange:function(e){k[D]=e,M()}}):t.default(X,{label:w,checked:S,className:"input-field col s7",onchange:function(e){k[D]=e,M()}}),t.default(".col.s12.right-align",[t.default(b,{iconName:"add",onclick:a}),t.default(b,{iconName:"delete",disabled:!D,onclick:function(){delete k[D],a(),M()}})])]]}}},exports.MaterialBox=function(){return{oncreate:function(e){M.Materialbox.init(e.dom,e.attrs)},view:function(e){return t.default("img.materialboxed",e.attrs)}}},exports.ModalPanel=function(){var e={isOpen:!1,id:""},a=null,i=function(t){e.isOpen=!1,t.onToggle&&t.onToggle(!1),t.onClose&&t.onClose(),a&&(document.removeEventListener("keydown",a),a=null),document.body.style.overflow=""},o=function(t){e.isOpen=!0,t.onToggle&&t.onToggle(!0),a=function(n){"Escape"===n.key&&!1!==t.closeOnEsc&&e.isOpen&&i(t)},document.addEventListener("keydown",a),document.body.style.overflow="hidden"};return{oninit:function(t){var n=t.attrs;e.id=n.id,n.isOpen&&o(n)},onupdate:function(t){var n=t.attrs;void 0!==n.isOpen&&n.isOpen!==e.isOpen&&(n.isOpen?o(n):i(n))},onremove:function(){a&&(document.removeEventListener("keydown",a),a=null),document.body.style.overflow=""},view:function(a){var o=a.attrs,l=o.id,r=o.title,c=o.description,s=o.buttons,d=o.richContent,u=o.showCloseButton,f=void 0===u||u,p=o.closeOnBackdropClick,m=void 0===p||p,v=["modal",o.className||"",o.fixedFooter?"modal-fixed-footer":"",o.bottomSheet?"bottom-sheet":"",e.isOpen?"active":""].filter(Boolean).join(" ").trim(),h=["modal-overlay",e.isOpen?"active":""].filter(Boolean).join(" ").trim();return t.default("div",{className:"modal-container"},[t.default("div",{className:h,onclick:m?function(){return i(o)}:void 0,style:{display:e.isOpen?"block":"none"}}),t.default("div",{id:l,className:v,"aria-hidden":e.isOpen?"false":"true",role:"dialog","aria-labelledby":l+"-title","aria-describedby":c?l+"-desc":void 0,style:{display:e.isOpen?"block":"none"},onclick:function(e){return e.stopPropagation()}},[f&&t.default("button",{className:"modal-close btn-flat",style:{position:"absolute",top:"8px",right:"8px",padding:"8px",minWidth:"auto",lineHeight:1},onclick:function(){return i(o)},"aria-label":"Close modal"},"×"),t.default(".modal-content",[t.default("h4",{id:l+"-title"},r),c&&t.default("div",n({id:l+"-desc"},d&&"string"==typeof c?{innerHTML:c}:{}),d&&"string"==typeof c?void 0:c)]),s&&s.length>0&&t.default(".modal-footer",s.map(function(e){return t.default(b,n({},e,{className:"modal-close "+(e.className||""),onclick:function(t){e.onclick&&e.onclick(t),i(o)}}))}))])])}}},exports.NumberInput=q,exports.Options=function(){var e={},n=function(t){return e.checkedIds.indexOf(t)>=0};return{oninit:function(t){var n=t.attrs,a=n.checkedId,i=a||n.initialValue;e.checkedId=a,e.checkedIds=i?i instanceof Array?[].concat(i):[i]:[]},view:function(a){var i=a.attrs,o=i.label,l=i.id,r=i.options,c=i.checkedId,u=i.description,f=i.className,p=void 0===f?"col s12":f,m=i.style,v=i.disabled,h=i.checkboxClass,g=i.newRow,x=i.isMandatory,b=i.onchange;c&&e.checkedId!==c&&(e.checkedId=c,e.checkedIds=c instanceof Array?c:[c]);var y=b?function(t,n){var a=e.checkedIds.filter(function(e){return e!==t});n&&a.push(t),e.checkedIds=a,b(a)}:void 0,w=[g?"clear":"",p].filter(Boolean).join(" ").trim();return t.default("div",{className:w,style:m},[t.default("div",{className:"input-field options"},t.default(s,{id:l,label:o,isMandatory:x})),t.default(d,{helperText:u})].concat(r.map(function(e){return t.default(X,{disabled:v||e.disabled,label:e.label,onchange:y?function(t){return y(e.id,t)}:void 0,className:e.className||h,checked:n(e.id),description:e.description})})))}}},exports.Pagination=function(){var e={pagIndex:0};return{view:function(a){var i=a.attrs,o=i.items,l=i.curPage,r=void 0===l?1:l,c=i.size,s=void 0===c?Math.min(9,o.length):c,d=e.pagIndex,u=d*s,f=u+s,p=d>0,m=f<o.length,v=[{title:t.default("a",{onclick:function(){return p&&e.pagIndex--}},t.default("i.material-icons","chevron_left")),disabled:!p}].concat(o.filter(function(e,t){return u<=t&&t<f}),[{title:t.default("a",{onclick:function(){return m&&e.pagIndex++}},t.default("i.material-icons","chevron_right")),disabled:!m}]);return t.default("ul.pagination",v.map(function(e,a){return t.default(G,n({title:u+a},e,{active:u+a===r}))}))}}},exports.Parallax=function(){return{oncreate:function(e){M.Parallax.init(e.dom,e.attrs)},view:function(e){var n=e.attrs.src;return n?t.default(".parallax-container",t.default(".parallax",t.default("img",{src:n}))):void 0}}},exports.PasswordInput=z,exports.RadioButton=ee,exports.RadioButtons=function(){var e={groupId:o()};return{oninit:function(t){var n=t.attrs,a=n.checkedId,i=n.initialValue;e.oldCheckedId=a,e.checkedId=a||i},view:function(a){var i=a.attrs,o=i.id,l=i.checkedId,r=i.newRow,c=i.className,d=void 0===c?"col s12":c,u=i.label,f=void 0===u?"":u,p=i.disabled,m=i.description,v=i.options,h=i.isMandatory,g=i.checkboxClass,x=i.onchange;e.oldCheckedId!==l&&(e.oldCheckedId=e.checkedId=l);var b=e.groupId,y=e.checkedId,w=function(t){e.checkedId=t,x&&x(t)};return r&&(d+=" clear"),t.default("div",{id:o,className:d},[t.default("div",{className:"input-field options"},t.default(s,{id:o,label:f,isMandatory:h})),m?t.default("p.helper-text",t.default.trust(m)):""].concat(v.map(function(e){return t.default(ee,n({},e,{onchange:w,groupId:b,disabled:p,className:g,checked:e.id===y}))})))}}},exports.RangeInput=J,exports.RoundIconButton=y,exports.SearchSelect=function(){var e={isOpen:!1,selectedOptions:[],searchTerm:"",options:[],inputRef:null,dropdownRef:null,focusedIndex:-1,onchange:null},n=function(t){var n=t.target;e.dropdownRef&&e.dropdownRef.contains(n)||(e.isOpen=!(!e.inputRef||!e.inputRef.contains(n)||e.isOpen))},a=function(t){if(e.isOpen){var n=e.options.filter(function(t){return(t.label||t.id.toString()).toLowerCase().includes((e.searchTerm||"").toLowerCase())&&!e.selectedOptions.some(function(e){return e.id===t.id})});switch(t.key){case"ArrowDown":t.preventDefault(),e.focusedIndex=Math.min(e.focusedIndex+1,n.length-1);break;case"ArrowUp":t.preventDefault(),e.focusedIndex=Math.max(e.focusedIndex-1,-1);break;case"Enter":t.preventDefault(),e.focusedIndex>=0&&e.focusedIndex<n.length&&i(n[e.focusedIndex]);break;case"Escape":t.preventDefault(),e.isOpen=!1,e.focusedIndex=-1}}},i=function(t){t.disabled||(e.selectedOptions=e.selectedOptions.some(function(e){return e.id===t.id})?e.selectedOptions.filter(function(e){return e.id!==t.id}):[].concat(e.selectedOptions,[t]),e.searchTerm="",e.focusedIndex=-1,e.onchange&&e.onchange(e.selectedOptions.map(function(e){return e.id})))};return{oninit:function(t){var n=t.attrs,a=n.options,i=void 0===a?[]:a,o=n.initialValue,l=void 0===o?[]:o,r=n.onchange;e.options=i,e.selectedOptions=i.filter(function(e){return l.includes(e.id)}),e.onchange=r},oncreate:function(){document.addEventListener("click",n),document.addEventListener("keydown",a)},onremove:function(){document.removeEventListener("click",n),document.removeEventListener("keydown",a)},view:function(n){var a=n.attrs,o=a.oncreateNewOption,l=a.className,r=a.placeholder,c=a.searchPlaceholder,s=void 0===c?"Search options...":c,d=a.noOptionsFound,u=void 0===d?"No options found":d,f=a.label,p=a.maxHeight,m=void 0===p?"25rem":p,v=e.options.filter(function(t){return(t.label||t.id.toString()).toLowerCase().includes((e.searchTerm||"").toLowerCase())&&!e.selectedOptions.some(function(e){return e.id===t.id})}),h=o&&e.searchTerm&&!v.some(function(t){return(t.label||t.id.toString()).toLowerCase()===e.searchTerm.toLowerCase()});return t.default(".multi-select-dropdown.input-field",{className:l},[t.default("label",{class:r||e.selectedOptions.length>0?"active":""},f),t.default(".dropdown-trigger",{oncreate:function(t){e.inputRef=t.dom},onclick:function(){e.isOpen=!e.isOpen},style:{borderBottom:"2px solid #d1d5db",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer"}},[t.default(".selected-options",{style:{display:"flex",flexWrap:"wrap",minHeight:"50px",paddingTop:"12px"}},0===e.selectedOptions.length?[t.default("span",r)]:e.selectedOptions.map(function(n){return t.default(".chip",[n.label||n.id.toString(),t.default("button",{onclick:function(t){t.stopPropagation(),function(t){e.selectedOptions=e.selectedOptions.filter(function(e){return e.id!==t.id}),e.onchange&&e.onchange(e.selectedOptions.map(function(e){return e.id}))}(n)},style:{marginLeft:"0.25rem",background:"none",border:"none",cursor:"pointer"}},"×")])})),t.default("svg.caret",{class:"caret",height:"24",viewBox:"0 0 24 24",width:"24",xmlns:"http://www.w3.org/2000/svg"},[t.default("path",{d:"M7 10l5 5 5-5z"}),t.default("path",{d:"M0 0h24v24H0z",fill:"none"})])]),e.isOpen&&t.default(".dropdown-menu",{oncreate:function(t){e.dropdownRef=t.dom},onremove:function(){e.dropdownRef=null},style:{position:"absolute",width:"98%",marginTop:"0.4rem",zIndex:1e3}},[t.default("ul.dropdown-content.select-dropdown",{style:{maxHeight:m,opacity:1,display:"block",width:"100%"}},[t.default("li",{class:"search-wrapper",style:{padding:"0 16px",position:"relative"}},[t.default("input",{type:"text",placeholder:s,value:e.searchTerm||"",oninput:function(t){e.searchTerm=t.target.value,e.focusedIndex=-1},style:{width:"100%",outline:"none",fontSize:"0.875rem"}})])].concat(0!==v.length||h?[]:[t.default("li",{style:{padding:"0.5rem",textAlign:"center",color:"#9ca3af"}},u)],h?[t.default("li",{onclick:function(){try{return Promise.resolve(o(e.searchTerm)).then(function(e){i(e)})}catch(e){return Promise.reject(e)}},style:{display:"flex",alignItems:"center",cursor:"pointer",background:e.focusedIndex===v.length?"#f3f4f6":""}},[t.default("span",'+ "'+e.searchTerm+'"')])]:[],v.map(function(n,a){return t.default("li",{onclick:function(){return i(n)},class:n.disabled?"disabled":void 0,style:{display:"flex",alignItems:"center",cursor:n.disabled?"not-allowed":"pointer",background:e.focusedIndex===a?"#f3f4f6":""}},t.default("span",[t.default("input",{type:"checkbox",checked:e.selectedOptions.some(function(e){return e.id===n.id}),style:{marginRight:"0.5rem"}}),n.label||n.id.toString()]))})))])])}}},exports.SecondaryContent=S,exports.Select=function(){var e={isOpen:!1,selectedIds:[],focusedIndex:-1},n=function(e,t){return t.some(function(t){return t===e})},a=function(t,a,i){if(a){var o=n(t,e.selectedIds)?e.selectedIds.filter(function(e){return e!==t}):[].concat(e.selectedIds,[t]);e.selectedIds=o,i.onchange(o)}else e.selectedIds=[t],e.isOpen=!1,i.onchange([t])},i=function(t){t.target.closest(".select-wrapper")||(e.isOpen=!1)};return{oninit:function(t){var n=t.attrs,a=n.checkedId||n.initialValue;null!=a&&(e.selectedIds=a instanceof Array?[].concat(a):[a]),document.addEventListener("click",i)},onremove:function(){document.removeEventListener("click",i)},onupdate:function(t){var n=t.attrs.checkedId;if(void 0!==n){var a=n instanceof Array?n:[n];JSON.stringify(a)!==JSON.stringify(e.selectedIds)&&(e.selectedIds=a)}},view:function(i){var o=i.attrs,l=o.className,r=void 0===l?"col s12":l,c=o.key,u=o.options,f=o.multiple,p=o.label,m=o.helperText,v=o.placeholder,h=void 0===v?"":v,g=o.isMandatory,x=o.iconName,b=o.disabled,y=o.style,w=o.newRow?r+" clear":r,k=e.selectedIds.length>0,I=["select-wrapper","input-field",k?"has-value":"",e.isOpen?"focused":"",b?"disabled":""].filter(Boolean).join(" "),N=u.filter(function(t){return n(t.id,e.selectedIds)}),O=N.length>0?N.map(function(e){return e.label}).join(", "):h,C=u.reduce(function(e,t){var n=t.group||"";return e[n]||(e[n]=[]),e[n].push(t),e},{}),A=function(i,l){var r=n(i.id,e.selectedIds);return t.default(function(){return{view:function(e){var n,a=e.attrs,i=a.option,o=a.isSelected,l=a.multiple,r=a.onToggle;return t.default(".select-dropdown-option",{key:i.id||"placeholder-label",className:[o?"selected":"",i.disabled?"disabled":"",a.isFocused?"focused":""].filter(Boolean).join(" "),onclick:i.disabled?void 0:function(){return r(i.id)}},[l?t.default("input.select-dropdown-option-checkbox",{key:"checkbox",type:"checkbox",checked:o,disabled:i.disabled,tabindex:-1}):null,i.img?t.default("img.select-dropdown-option-img",{key:"image",src:i.img,alt:i.label}):null,t.default(".select-dropdown-option-text",{key:"text"},null==(n=i.label)?void 0:n.replace("&amp;","&"))].filter(Boolean))}}},{option:i,index:l,isSelected:r,isFocused:l===e.focusedIndex,multiple:f,onToggle:function(e){return a(e,f||!1,o)}})};return t.default(".select-wrapper-container",{className:w,key:c,style:y},[t.default("."+I,{onclick:b?void 0:function(){e.isOpen=!e.isOpen},onkeydown:b?void 0:function(t){return function(t,n){var i=n.options;switch(t.key){case"ArrowDown":t.preventDefault(),e.isOpen?e.focusedIndex=Math.min(e.focusedIndex+1,i.length-1):(e.isOpen=!0,e.focusedIndex=0);break;case"ArrowUp":t.preventDefault(),e.isOpen&&(e.focusedIndex=Math.max(e.focusedIndex-1,0));break;case"Enter":case" ":if(t.preventDefault(),e.isOpen&&e.focusedIndex>=0&&e.focusedIndex<i.length){var o=i[e.focusedIndex];o&&!o.disabled&&a(o.id,n.multiple||!1,n)}else e.isOpen||(e.isOpen=!0,e.focusedIndex=0);break;case"Escape":t.preventDefault(),e.isOpen=!1,e.focusedIndex=-1}}(t,o)},tabindex:b?-1:0,"aria-expanded":e.isOpen?"true":"false","aria-haspopup":"listbox",role:"combobox"},[x&&t.default("i.material-icons.prefix",{className:k||e.isOpen?"active":""},x),f&&k?t.default(".select-tags",N.map(function(e){return t.default(".select-tag",{key:e.id},[e.label,!b&&t.default(".select-tag-close",{onclick:function(t){t.stopPropagation(),a(e.id,!0,o)}},"×")])})):t.default(".select-display",{className:k?"has-value":""},O),p&&t.default(s,{label:p,isMandatory:g,className:k||e.isOpen?"active":""}),t.default(".select-dropdown",{className:e.isOpen?"active":"",role:"listbox","aria-multiselectable":f},function(){if(1===Object.keys(C).length&&C[""])return u.map(function(e,t){return A(e,t)});var e=0,n=[];return Object.entries(C).forEach(function(a){var i=a[0],o=a[1];i&&n.push(t.default(".select-dropdown-optgroup",{key:"group-header-"+i},i)),o.forEach(function(t){n.push(A(t,e++))})}),n}())]),m&&t.default(d,{helperText:m})])}}},exports.SmallButton=x,exports.SubmitButton=w,exports.Switch=function(){var e={id:o()};return{view:function(n){var i=n.attrs,o=i.id||e.id,l=i.label,r=i.left,c=i.right,d=i.disabled,u=i.newRow,f=i.onchange,p=i.checked,m=i.isMandatory,v=i.className,h=void 0===v?"col s12":v,g=a(i,te),x=["input-field",u?"clear":"",h].filter(Boolean).join(" ").trim();return t.default("div",{className:x},[l?t.default(s,{label:l||"",id:o,isMandatory:m,className:"active"}):void 0,t.default(".switch",g,t.default("label",[r||"Off",t.default("input[type=checkbox]",{id:o,disabled:d,checked:p,onclick:f?function(e){e.target&&void 0!==e.target.checked&&f(e.target.checked)}:void 0}),t.default("span.lever"),c||"On"]))])}}},exports.Tabs=function(){var e={},n=function(e,t){return t||e.replace(/ /g,"").toLowerCase()};return{view:function(a){var i=a.attrs,o=i.tabWidth,l=i.selectedTabId,r=i.tabs,c=i.className,s=i.style,d=i.duration,u=i.onShow,f=i.swipeable,p=i.responsiveThreshold,m=r.filter(function(e){return e.active}).shift(),v=l||(m?n(m.title,m.id):""),h=["fill"===o?"tabs-fixed-width":"",c].filter(Boolean).join(" ").trim();return t.default(".row",[t.default(".col.s12",t.default("ul.tabs",{className:h,style:s,oncreate:function(t){e.instance=M.Tabs.init(t.dom,{duration:d,onShow:u,responsiveThreshold:p,swipeable:f})},onupdate:function(){if(v){var e=document.getElementById("tab_"+v);e&&e.click()}},onremove:function(){return e.instance.destroy()}},r.map(function(e){var a=e.className,i=e.title,l=e.id,c=e.active,s=e.disabled,d=e.target,u=e.href,f=["fixed"===o?"col s"+Math.floor(12/r.length):"",a].filter(Boolean).join(" ").trim(),p=n(i,l);return t.default("li.tab",{className:f,disabled:s},t.default("a",{id:"tab_"+p,className:c?"active":"",target:d,href:u||"#"+p},i))}))),r.filter(function(e){return void 0===e.href}).map(function(e){var a=e.vnode,i=e.contentClass;return t.default(".col.s12",{id:n(e.title,e.id),className:i},a)})])}}},exports.TextArea=K,exports.TextInput=U,exports.TimePicker=function(){var e={id:o()};return{view:function(i){var o=i.attrs,l=o.label,r=o.helperText,c=o.initialValue,u=o.newRow,f=o.className,p=void 0===f?"col s12":f,m=o.iconName,v=o.isMandatory,h=o.onchange,g=o.disabled,x=a(o,Z),b=e.id,y=new Date,w=h?function(){return e.tp&&h(e.tp.time||c||y.getHours()+":"+y.getMinutes())}:void 0,k=["input-field","timepicker",u?"clear":"",p].filter(Boolean).join(" ").trim();return t.default("div",{className:k,onremove:function(){return e.tp&&e.tp.destroy()}},[m?t.default("i.material-icons.prefix",m):"",t.default("input",n({},x,{type:"text",tabindex:0,id:b,disabled:g,value:c,oncreate:function(t){e.tp=M.Timepicker.init(t.dom,n({twelveHour:!1,showClearBtn:!0,defaultTime:c},x,{onCloseEnd:w}))}})),t.default(s,{label:l,id:b,isMandatory:v,isActive:c}),t.default(d,{helperText:r})])}}},exports.Timeline=function(){var e=function(e){return e.getUTCDate()+"/"+(e.getUTCMonth()+1)+"/"+e.getUTCFullYear()},a=function(e){return l(e.getUTCHours())+":"+l(e.getUTCMinutes())};return{view:function(i){var o=i.attrs,l=o.onSelect,r=o.timeFormatter,c=void 0===r?a:r,s=o.dateFormatter,d=void 0===s?e:s;return t.default("ul.mm_timeline",o.items.map(function(e){return t.default(ne,n({onSelect:l,dateFormatter:d,timeFormatter:c},e))}))}}},exports.UrlInput=Y,exports.isNumeric=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},exports.padLeft=l,exports.uniqueId=o,exports.uuid4=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})};
//# sourceMappingURL=index.js.map


/***/ }),

/***/ 7589:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var buildPathname = __webpack_require__(6539)
var hasOwn = __webpack_require__(5531)

module.exports = function($window, oncompletion) {
	function PromiseProxy(executor) {
		return new Promise(executor)
	}

	function makeRequest(url, args) {
		return new Promise(function(resolve, reject) {
			url = buildPathname(url, args.params)
			var method = args.method != null ? args.method.toUpperCase() : "GET"
			var body = args.body
			var assumeJSON = (args.serialize == null || args.serialize === JSON.serialize) && !(body instanceof $window.FormData || body instanceof $window.URLSearchParams)
			var responseType = args.responseType || (typeof args.extract === "function" ? "" : "json")

			var xhr = new $window.XMLHttpRequest(), aborted = false, isTimeout = false
			var original = xhr, replacedAbort
			var abort = xhr.abort

			xhr.abort = function() {
				aborted = true
				abort.call(this)
			}

			xhr.open(method, url, args.async !== false, typeof args.user === "string" ? args.user : undefined, typeof args.password === "string" ? args.password : undefined)

			if (assumeJSON && body != null && !hasHeader(args, "content-type")) {
				xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8")
			}
			if (typeof args.deserialize !== "function" && !hasHeader(args, "accept")) {
				xhr.setRequestHeader("Accept", "application/json, text/*")
			}
			if (args.withCredentials) xhr.withCredentials = args.withCredentials
			if (args.timeout) xhr.timeout = args.timeout
			xhr.responseType = responseType

			for (var key in args.headers) {
				if (hasOwn.call(args.headers, key)) {
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
							if (!ev.target.responseType && typeof args.extract !== "function") {
								// Handle no-content which will not parse.
								try { response = JSON.parse(ev.target.responseText) }
								catch (e) { response = null }
							}
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

						if (success) {
							if (typeof args.type === "function") {
								if (Array.isArray(response)) {
									for (var i = 0; i < response.length; i++) {
										response[i] = new args.type(response[i])
									}
								}
								else response = new args.type(response)
							}
							resolve(response)
						}
						else {
							var completeErrorResponse = function() {
								try { message = ev.target.responseText }
								catch (e) { message = response }
								var error = new Error(message)
								error.code = ev.target.status
								error.response = response
								reject(error)
							}

							if (xhr.status === 0) {
								// Use setTimeout to push this code block onto the event queue
								// This allows `xhr.ontimeout` to run in the case that there is a timeout
								// Without this setTimeout, `xhr.ontimeout` doesn't have a chance to reject
								// as `xhr.onreadystatechange` will run before it
								setTimeout(function() {
									if (isTimeout) return
									completeErrorResponse()
								})
							} else completeErrorResponse()
						}
					}
					catch (e) {
						reject(e)
					}
				}
			}

			xhr.ontimeout = function (ev) {
				isTimeout = true
				var error = new Error("Request timed out")
				error.code = ev.target.status
				reject(error)
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
			else if (body instanceof $window.FormData || body instanceof $window.URLSearchParams) xhr.send(body)
			else xhr.send(JSON.stringify(body))
		})
	}

	// In case the global Promise is some userland library's where they rely on
	// `foo instanceof this.constructor`, `this.constructor.resolve(value)`, or
	// similar. Let's *not* break them.
	PromiseProxy.prototype = Promise.prototype
	PromiseProxy.__proto__ = Promise // eslint-disable-line no-proto

	function hasHeader(args, name) {
		for (var key in args.headers) {
			if (hasOwn.call(args.headers, key) && key.toLowerCase() === name) return true
		}
		return false
	}

	return {
		request: function(url, args) {
			if (typeof url !== "string") { args = url; url = url.url }
			else if (args == null) args = {}
			var promise = makeRequest(url, args)
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
}


/***/ }),

/***/ 8002:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5603);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6657);
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root{--md-primary:#2196f3;--md-primary-dark:#1976d2;--md-primary-light:#64b5f6;--md-secondary:#ff4081;--md-secondary-dark:#c51162;--md-secondary-light:#ff80ab;--md-grey-50:#fafafa;--md-grey-100:#f5f5f5;--md-grey-200:#eee;--md-grey-300:#e0e0e0;--md-grey-400:#bdbdbd;--md-grey-500:#9e9e9e;--md-grey-600:#757575;--md-grey-700:#616161;--md-grey-800:#424242;--md-grey-900:#212121;--md-success:#4caf50;--md-warning:#ff9800;--md-error:#f44336;--md-info:#2196f3;--md-shadow-1:0 2px 4px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);--md-shadow-2:0 4px 8px rgba(0,0,0,.12),0 2px 4px rgba(0,0,0,.08);--md-shadow-3:0 8px 16px rgba(0,0,0,.12),0 4px 8px rgba(0,0,0,.08);--md-shadow-4:0 16px 32px rgba(0,0,0,.12),0 8px 16px rgba(0,0,0,.08);--md-font-family:"Roboto",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;--md-font-weight-light:300;--md-font-weight-regular:400;--md-font-weight-medium:500;--md-font-weight-bold:700;--md-transition-fast:150ms cubic-bezier(0.4,0,0.2,1);--md-transition-standard:300ms cubic-bezier(0.4,0,0.2,1);--md-transition-slow:500ms cubic-bezier(0.4,0,0.2,1);--md-radius-small:4px;--md-radius-medium:8px;--md-radius-large:16px;--md-spacing-xs:4px;--md-spacing-sm:8px;--md-spacing-md:16px;--md-spacing-lg:24px;--md-spacing-xl:32px}*,:after,:before{box-sizing:border-box}body{background-color:#fff;color:var(--md-grey-800);font-family:var(--md-font-family);font-weight:var(--md-font-weight-regular);line-height:1.5;margin:0;padding:0}.container{margin:0 auto;max-width:1200px;padding:0 var(--md-spacing-md);width:100%}.row{display:flex;flex-wrap:wrap;margin:0 calc(var(--md-spacing-sm)*-1)}.col{flex:1}.col,.col.s1{padding:0 var(--md-spacing-sm)}.col.s1{flex:0 0 8.333333%;max-width:8.333333%}.col.s2{flex:0 0 16.666667%;max-width:16.666667%}.col.s2,.col.s3{padding:0 var(--md-spacing-sm)}.col.s3{flex:0 0 25%;max-width:25%}.col.s4{flex:0 0 33.333333%;max-width:33.333333%}.col.s4,.col.s5{padding:0 var(--md-spacing-sm)}.col.s5{flex:0 0 41.666667%;max-width:41.666667%}.col.s6{flex:0 0 50%;max-width:50%}.col.s6,.col.s7{padding:0 var(--md-spacing-sm)}.col.s7{flex:0 0 58.333333%;max-width:58.333333%}.col.s8{flex:0 0 66.666667%;max-width:66.666667%}.col.s8,.col.s9{padding:0 var(--md-spacing-sm)}.col.s9{flex:0 0 75%;max-width:75%}.col.s10{flex:0 0 83.333333%;max-width:83.333333%}.col.s10,.col.s11{padding:0 var(--md-spacing-sm)}.col.s11{flex:0 0 91.666667%;max-width:91.666667%}.col.s12{flex:0 0 100%;max-width:100%;padding:0 var(--md-spacing-sm)}@media (min-width:768px){.col.m1{flex:0 0 8.333333%;max-width:8.333333%}.col.m1,.col.m2{padding:0 var(--md-spacing-sm)}.col.m2{flex:0 0 16.666667%;max-width:16.666667%}.col.m3{flex:0 0 25%;max-width:25%}.col.m3,.col.m4{padding:0 var(--md-spacing-sm)}.col.m4{flex:0 0 33.333333%;max-width:33.333333%}.col.m5{flex:0 0 41.666667%;max-width:41.666667%}.col.m5,.col.m6{padding:0 var(--md-spacing-sm)}.col.m6{flex:0 0 50%;max-width:50%}.col.m7{flex:0 0 58.333333%;max-width:58.333333%}.col.m7,.col.m8{padding:0 var(--md-spacing-sm)}.col.m8{flex:0 0 66.666667%;max-width:66.666667%}.col.m9{flex:0 0 75%;max-width:75%}.col.m10,.col.m9{padding:0 var(--md-spacing-sm)}.col.m10{flex:0 0 83.333333%;max-width:83.333333%}.col.m11{flex:0 0 91.666667%;max-width:91.666667%}.col.m11,.col.m12{padding:0 var(--md-spacing-sm)}.col.m12{flex:0 0 100%;max-width:100%}}@media (min-width:1024px){.col.l1{flex:0 0 8.333333%;max-width:8.333333%}.col.l1,.col.l2{padding:0 var(--md-spacing-sm)}.col.l2{flex:0 0 16.666667%;max-width:16.666667%}.col.l3{flex:0 0 25%;max-width:25%}.col.l3,.col.l4{padding:0 var(--md-spacing-sm)}.col.l4{flex:0 0 33.333333%;max-width:33.333333%}.col.l5{flex:0 0 41.666667%;max-width:41.666667%}.col.l5,.col.l6{padding:0 var(--md-spacing-sm)}.col.l6{flex:0 0 50%;max-width:50%}.col.l7{flex:0 0 58.333333%;max-width:58.333333%}.col.l7,.col.l8{padding:0 var(--md-spacing-sm)}.col.l8{flex:0 0 66.666667%;max-width:66.666667%}.col.l9{flex:0 0 75%;max-width:75%}.col.l10,.col.l9{padding:0 var(--md-spacing-sm)}.col.l10{flex:0 0 83.333333%;max-width:83.333333%}.col.l11{flex:0 0 91.666667%;max-width:91.666667%}.col.l11,.col.l12{padding:0 var(--md-spacing-sm)}.col.l12{flex:0 0 100%;max-width:100%}}.clear,.clear-10,.clear-15{clear:both}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.center-align{text-align:center}.left-align{text-align:left}.right-align{text-align:right}.hide{display:none!important}.show{display:block!important}.material-icons{word-wrap:normal;-webkit-font-feature-settings:"liga";-webkit-font-smoothing:antialiased;direction:ltr;display:inline-block;font-family:Material Icons;font-size:24px;font-style:normal;font-weight:400;letter-spacing:normal;line-height:1;text-transform:none;white-space:nowrap}.material-icons.tiny{font-size:1rem}.material-icons.small{font-size:2rem}.material-icons.medium{font-size:4rem}.material-icons.large{font-size:6rem}.material-icons.left{margin-right:var(--md-spacing-sm);vertical-align:middle}.material-icons.right{margin-left:var(--md-spacing-sm);vertical-align:middle}.material-icons.prefix{color:var(--md-grey-600);left:var(--md-spacing-sm);position:absolute;top:50%;transform:translateY(-50%)}@keyframes waves-ripple{0%{opacity:1;transform:scale(0)}to{opacity:0;transform:scale(2)}}.waves-effect{-webkit-tap-highlight-color:transparent;overflow:hidden;position:relative;-webkit-user-select:none;-moz-user-select:none;user-select:none}.waves-effect:before{background:hsla(0,0%,100%,.6);border-radius:50%;content:"";height:0;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);transition:width var(--md-transition-fast),height var(--md-transition-fast);width:0}.waves-effect:active:before{animation:waves-ripple .6s ease-out;height:300px;width:300px}.waves-light:before{background:hsla(0,0%,100%,.45)}.waves-teal:before{background:rgba(0,150,136,.65)}.btn,.btn-flat,.btn-floating,.btn-large,.btn-small{align-items:center;border:none;border-radius:var(--md-radius-small);cursor:pointer;display:inline-flex;font-family:var(--md-font-family);font-size:14px;font-weight:var(--md-font-weight-medium);justify-content:center;letter-spacing:.5px;margin:var(--md-spacing-xs);outline:none;overflow:hidden;padding:var(--md-spacing-sm) var(--md-spacing-md);position:relative;text-decoration:none;text-transform:uppercase;transition:all var(--md-transition-standard);-webkit-user-select:none;-moz-user-select:none;user-select:none}.btn{background-color:var(--md-primary);box-shadow:var(--md-shadow-1);color:#fff}.btn:hover{background-color:var(--md-primary-dark);box-shadow:var(--md-shadow-2);transform:translateY(-1px)}.btn:active{box-shadow:var(--md-shadow-3);transform:translateY(0)}.btn:disabled{background-color:var(--md-grey-300);box-shadow:none;color:var(--md-grey-500);cursor:not-allowed;transform:none}.btn-flat{background-color:transparent;box-shadow:none;color:var(--md-primary)}.btn-flat:hover{background-color:rgba(33,150,243,.04);color:var(--md-primary-dark)}.btn-flat:active{background-color:rgba(33,150,243,.12)}.btn-flat:disabled{background-color:transparent;color:var(--md-grey-400);cursor:not-allowed}.btn-large{font-size:16px;min-height:56px;padding:var(--md-spacing-md) var(--md-spacing-lg)}.btn-small{font-size:12px;min-height:32px;padding:var(--md-spacing-xs) var(--md-spacing-sm)}.btn-floating{background-color:var(--md-secondary);border-radius:50%;box-shadow:var(--md-shadow-2);color:#fff;height:56px;padding:0;width:56px}.btn-floating:hover{background-color:var(--md-secondary-dark);box-shadow:var(--md-shadow-3);transform:translateY(-2px)}.btn-floating:active{transform:translateY(0)}.btn-floating.btn-large{height:72px;width:72px}.btn-floating.btn-small{height:40px;width:40px}.btn.red{background-color:var(--md-error)}.btn.red:hover{background-color:#d32f2f}.btn.green{background-color:var(--md-success)}.btn.green:hover{background-color:#388e3c}.btn.orange{background-color:var(--md-warning)}.btn.orange:hover{background-color:#f57c00}.btn.purple{background-color:#9c27b0}.btn.purple:hover{background-color:#7b1fa2}.btn.teal{background-color:#009688}.btn.teal:hover{background-color:#00796b}.modal-trigger{cursor:pointer}.tooltipped{position:relative}.tooltipped:after{background-color:var(--md-grey-700);border-radius:var(--md-radius-small);bottom:120%;color:#fff;content:attr(data-tooltip);font-size:12px;font-weight:var(--md-font-weight-regular);padding:var(--md-spacing-xs) var(--md-spacing-sm);pointer-events:none;white-space:nowrap;z-index:1000}.tooltipped:after,.tooltipped:before{left:50%;opacity:0;position:absolute;transform:translateX(-50%);transition:opacity var(--md-transition-standard),visibility var(--md-transition-standard);visibility:hidden}.tooltipped:before{border:4px solid transparent;border-top:4px solid var(--md-grey-700);bottom:110%;content:""}.tooltipped:hover:after,.tooltipped:hover:before{opacity:1;visibility:visible}.tooltipped[data-position=bottom]:after{bottom:auto;top:120%}.tooltipped[data-position=bottom]:before{border-bottom-color:var(--md-grey-700);border-top-color:transparent;bottom:auto;top:110%}.tooltipped[data-position=left]:after{bottom:auto;left:auto;right:120%;top:50%;transform:translateY(-50%)}.tooltipped[data-position=left]:before{border-left-color:var(--md-grey-700);border-top-color:transparent;bottom:auto;left:auto;right:110%;top:50%;transform:translateY(-50%)}.tooltipped[data-position=right]:after{bottom:auto;left:120%;right:auto;top:50%;transform:translateY(-50%)}.tooltipped[data-position=right]:before{border-right-color:var(--md-grey-700);border-top-color:transparent;bottom:auto;left:110%;right:auto;top:50%;transform:translateY(-50%)}.input-field textarea{min-height:3rem;padding-top:1rem}.input-field label{top:.8rem}.input-field label.active{transform:translateY(-140%)}.input-field input:focus~label,.input-field input:valid~label,.input-field input[value]:not([value=""])~label,.input-field textarea:focus~label,.input-field textarea:valid~label,.input-field textarea[value]:not([value=""])~label{transform:translateY(-140%)}.helper-text{margin-top:var(--md-spacing-xs)}.input-field .prefix{top:.5rem}.autocomplete-content{border-radius:0 0 var(--md-radius-small) var(--md-radius-small);top:100%}.select-wrapper{position:relative}.select-wrapper.input-field{margin-bottom:var(--md-spacing-lg);position:relative;width:100%}.select-wrapper select{appearance:none;-webkit-appearance:none;-moz-appearance:none;background:transparent;border:none;border-bottom:1px solid var(--md-grey-400);border-radius:0;box-shadow:none;box-sizing:content-box;color:var(--md-grey-800);cursor:pointer;font-family:var(--md-font-family);font-size:16px;height:3rem;line-height:3rem;margin:0 0 8px;outline:none;padding:0;transition:border-bottom var(--md-transition-standard),box-shadow var(--md-transition-standard);width:100%}.select-wrapper select:focus:not([readonly]){border-bottom:2px solid var(--md-primary);box-shadow:0 1px 0 0 var(--md-primary)}.select-wrapper select:disabled{border-bottom:1px dotted var(--md-grey-400);color:var(--md-grey-500);cursor:not-allowed}.select-wrapper:after{color:var(--md-grey-600);content:"▼";font-size:12px;pointer-events:none;position:absolute;right:0;top:.75rem;transition:transform var(--md-transition-standard)}.select-wrapper select:focus~.select-wrapper:after,.select-wrapper.focused:after{transform:rotate(180deg)}.select-dropdown{background:#fff;border-radius:var(--md-radius-small);box-shadow:var(--md-shadow-2);left:0;max-height:300px;opacity:0;overflow-y:auto;position:absolute;right:0;top:100%;transform:translateY(-10px);transition:all var(--md-transition-standard);visibility:hidden;z-index:1000}.select-dropdown.active{opacity:1;transform:translateY(0);visibility:visible}.select-dropdown-option{align-items:center;border-bottom:1px solid var(--md-grey-200);cursor:pointer;display:flex;min-height:48px;padding:var(--md-spacing-sm) var(--md-spacing-md);transition:background-color var(--md-transition-fast)}.select-dropdown-option.selected,.select-dropdown-option:hover{background-color:var(--md-grey-100)}.select-dropdown-option.disabled{color:var(--md-grey-500);cursor:not-allowed;opacity:.6}.select-dropdown-option.disabled:hover{background-color:transparent}.select-dropdown-option:last-child{border-bottom:none}.select-dropdown-option-img{border-radius:50%;height:32px;margin-right:var(--md-spacing-sm);-o-object-fit:cover;object-fit:cover;width:32px}.select-dropdown-option-icon{color:var(--md-grey-600);font-size:18px;margin-right:var(--md-spacing-sm)}.select-dropdown-option-text{flex:1}.select-dropdown-optgroup{background-color:var(--md-grey-50);border-bottom:1px solid var(--md-grey-200);color:var(--md-grey-600);font-size:12px;font-weight:var(--md-font-weight-medium);letter-spacing:.5px;padding:var(--md-spacing-xs) var(--md-spacing-md);text-transform:uppercase}.select-dropdown-option-checkbox{margin-right:var(--md-spacing-sm);transform:scale(.8)}.select-tags{align-items:center;display:flex;flex-wrap:wrap;gap:var(--md-spacing-xs);min-height:2rem;padding:var(--md-spacing-xs) 0}.select-tag{align-items:center;background-color:var(--md-grey-200);border-radius:var(--md-radius-small);color:var(--md-grey-800);display:inline-flex;font-size:12px;padding:var(--md-spacing-xs) var(--md-spacing-sm)}.select-tag-close{color:var(--md-grey-600);cursor:pointer;margin-left:var(--md-spacing-xs);transition:color var(--md-transition-fast)}.select-tag-close:hover{color:var(--md-error)}.select-wrapper .prefix{color:var(--md-grey-600);font-size:2rem;left:0;position:absolute;top:.5rem;transition:color var(--md-transition-standard);width:3rem}.select-wrapper .prefix.active{color:var(--md-primary)}.select-wrapper .prefix~.select-tags,.select-wrapper .prefix~label,.select-wrapper .prefix~select{margin-left:3rem;width:calc(100% - 3rem)}.select-wrapper .prefix~.select-dropdown{left:3rem;right:0;width:calc(100% - 3rem)}.select-wrapper label{color:var(--md-grey-600);cursor:text;font-size:16px;left:0;pointer-events:none;position:absolute;text-align:initial;top:.8rem;transform:translateY(0);transform-origin:0 100%;transition:all var(--md-transition-standard)}.select-wrapper label.active,.select-wrapper select:focus~label,.select-wrapper.has-value label{color:var(--md-primary);font-size:12px;transform:translateY(-140%)}label+.switch{margin-top:1rem}@media screen and (max-width:47.2em){.mm_timeline:before{display:none}.mm_timeline>li .mm_time{padding:0 0 20px;position:relative;width:100%}.mm_timeline>li .mm_time span{text-align:left}.mm_timeline>li .mm_label{font-size:95%;font-weight:400;margin:0 0 30px;padding:1em}.mm_timeline>li .mm_label:after{border-bottom-color:#3594cb;border-right-color:transparent;left:20px;right:auto;top:-20px}.mm_timeline>li:nth-child(odd) .mm_label:after{border-bottom-color:#6cbfee;border-right-color:transparent}.mm_timeline>li .mm_icon{float:right;left:auto;margin:-55px 5px 0 0;position:relative}}.chips{margin-bottom:var(--md-spacing-lg);position:relative;width:100%}.chips-container{align-items:center;border-bottom:1px solid var(--md-grey-400);display:flex;flex-wrap:wrap;gap:var(--md-spacing-xs);min-height:48px;padding:var(--md-spacing-xs) 0;transition:border-bottom var(--md-transition-standard)}.chips-container.focused{border-bottom:2px solid var(--md-primary)}.chip{align-items:center;background-color:var(--md-grey-200);border-radius:16px;color:var(--md-grey-800);cursor:default;display:inline-flex;font-size:13px;height:32px;margin:2px;padding:0 12px;position:relative;transition:all var(--md-transition-fast)}.chip.selected{background-color:var(--md-primary);color:#fff}.chip img{border-radius:50%;height:24px;margin-left:-4px;margin-right:var(--md-spacing-xs);width:24px}.chip .close{color:var(--md-grey-600);cursor:pointer;font-size:18px;line-height:1;margin-left:var(--md-spacing-xs);transition:color var(--md-transition-fast)}.chip .close:hover{color:var(--md-error)}.chip.selected .close{color:hsla(0,0%,100%,.8)}.chip.selected .close:hover{color:#fff}.chips-input{background:transparent;border:none;color:var(--md-grey-800);flex:1;font-family:var(--md-font-family);font-size:16px;height:32px;margin:2px;min-width:120px;outline:none;padding:0}.chips-input::-moz-placeholder{color:var(--md-grey-500)}.chips-input::placeholder{color:var(--md-grey-500)}.input-field .chips~label{color:var(--md-grey-600);cursor:text;font-size:16px;left:0;pointer-events:none;position:absolute;text-align:initial;top:.8rem;transform:translateY(0);transform-origin:0 100%;transition:all var(--md-transition-standard)}.input-field .chips~label.active{color:var(--md-primary);font-size:12px;transform:translateY(-140%)}.input-field .chips .chips-input{border-bottom:none!important;box-shadow:none!important}.chips .autocomplete-content{background:#fff;border-radius:var(--md-radius-small);box-shadow:var(--md-shadow-2);left:0;margin-top:4px;max-height:200px;overflow-y:auto;position:absolute;right:0;top:100%;z-index:1000}.chips .autocomplete-content li{border-bottom:1px solid var(--md-grey-200);cursor:pointer;list-style:none;padding:var(--md-spacing-sm) var(--md-spacing-md);transition:background-color var(--md-transition-fast)}.chips .autocomplete-content li.selected,.chips .autocomplete-content li:hover{background-color:var(--md-grey-100)}.chips .autocomplete-content li:last-child{border-bottom:none}.chips .autocomplete-item-image{border-radius:50%;height:24px;margin-right:var(--md-spacing-sm);vertical-align:middle;width:24px}.chips-container:not(.chips-placeholder){padding-top:var(--md-spacing-sm)}.input-field .chips:not(:empty)~label,.input-field:has(.chips-container:not(:empty)) label{color:var(--md-primary);font-size:12px;transform:translateY(-140%)}.input-field .chips.chips-initial:not(.chips-placeholder)~label{color:var(--md-primary);font-size:12px;transform:translateY(-140%)}.collapsible{border:none;border-radius:var(--md-radius-small);box-shadow:var(--md-shadow-1);list-style-type:none;margin:var(--md-spacing-sm) 0 var(--md-spacing-lg) 0;overflow:hidden;padding:0;width:100%}.collapsible li{border-bottom:1px solid var(--md-grey-200);margin:0;padding:0;position:relative}.collapsible li:last-child{border-bottom:none}.collapsible-header{align-items:center;background-color:#fff;border-bottom:1px solid var(--md-grey-200);cursor:pointer;display:flex;justify-content:flex-start;min-height:48px;padding:var(--md-spacing-md) var(--md-spacing-lg);position:relative;transition:background-color var(--md-transition-standard);-webkit-user-select:none;-moz-user-select:none;user-select:none}.collapsible li.active .collapsible-header,.collapsible-header:hover{background-color:var(--md-grey-50)}.collapsible-header i.material-icons{color:var(--md-grey-600);font-size:24px;margin-right:var(--md-spacing-md)}.collapsible li.active .collapsible-header i.material-icons{color:var(--md-primary)}.collapsible-body{background-color:#fff;border-bottom:1px solid var(--md-grey-200);max-height:0;overflow:hidden;padding:0;position:relative;transition:all var(--md-transition-standard)}.collapsible li.active .collapsible-body{border-bottom:none;max-height:1000px;padding:var(--md-spacing-lg)}.collapsible-body p{color:var(--md-grey-700);line-height:1.6;margin:0 0 var(--md-spacing-md) 0}.collapsible-body p:last-child{margin-bottom:0}.collapsible-header:focus{outline:2px solid var(--md-primary);outline-offset:2px}.collapsible-header:focus:not(:focus-visible){outline:none}.fixed-action-btn{bottom:23px;position:fixed;right:23px;z-index:1000}.fixed-action-btn.direction-left{left:23px;right:auto}.fixed-action-btn.direction-top{bottom:auto;top:23px}.fixed-action-btn>a.btn-floating{display:block;position:relative;z-index:1001}.fixed-action-btn ul{left:0;list-style:none;margin:0;padding:0;pointer-events:none;position:absolute;right:0;text-align:center;z-index:1000}.fixed-action-btn ul li{margin-bottom:15px;pointer-events:auto;transition:all .3s ease}.fixed-action-btn ul li a.btn-floating{display:block;opacity:0;transform:scale(.4);transition:all .3s ease}.fixed-action-btn.active ul li a.btn-floating{opacity:1;transform:scale(1)}.fixed-action-btn.direction-top ul{bottom:64px;top:auto}.fixed-action-btn.direction-bottom ul{bottom:auto;top:64px}.fixed-action-btn.direction-left ul{left:auto;right:64px;text-align:right}.fixed-action-btn.direction-left ul li{margin-bottom:0;margin-right:15px;text-align:right}.fixed-action-btn.direction-right ul{left:64px;right:auto;text-align:left}.fixed-action-btn.direction-right ul li{margin-bottom:0;margin-left:15px;text-align:left}.fixed-action-btn.hover-enabled:hover ul li a.btn-floating{opacity:1;transform:scale(1)}.fixed-action-btn.hover-enabled:hover>a.btn-floating{transform:rotate(45deg)}.fixed-action-btn[style*="position: absolute"]{position:absolute!important}.input-field{margin-bottom:var(--md-spacing-lg);position:relative;width:100%}.input-field input:not([type]),.input-field input[type=date],.input-field input[type=datetime-local],.input-field input[type=datetime],.input-field input[type=email],.input-field input[type=number],.input-field input[type=password],.input-field input[type=search],.input-field input[type=tel],.input-field input[type=text],.input-field input[type=time],.input-field input[type=url],.input-field textarea{background-color:transparent;border:none;border-bottom:1px solid var(--md-grey-400);border-radius:0;box-shadow:none;box-sizing:content-box;font-family:var(--md-font-family);font-size:16px;height:3rem;margin:0 0 8px;outline:none;padding:0;transition:border-bottom var(--md-transition-standard),box-shadow var(--md-transition-standard);width:100%}.input-field textarea{height:auto;min-height:2rem;padding-top:.5rem;resize:vertical}.input-field input:focus:not([readonly]),.input-field textarea:focus:not([readonly]){border-bottom:2px solid var(--md-primary);box-shadow:0 1px 0 0 var(--md-primary)}.input-field input.valid,.input-field textarea.valid{border-bottom:2px solid var(--md-success);box-shadow:0 1px 0 0 var(--md-success)}.input-field input.invalid,.input-field textarea.invalid{border-bottom:2px solid var(--md-error);box-shadow:0 1px 0 0 var(--md-error)}.input-field input:disabled,.input-field textarea:disabled{border-bottom:1px dotted var(--md-grey-400);color:var(--md-grey-500);cursor:not-allowed}.input-field label{color:var(--md-grey-600);cursor:text;font-size:16px;left:0;pointer-events:none;position:absolute;text-align:initial;top:1rem;transform:translateY(0);transform-origin:0 100%;transition:all var(--md-transition-standard)}.input-field label.active{color:var(--md-primary);font-size:12px;transform:translateY(-150%)}.input-field input:focus~label,.input-field input:valid~label,.input-field input[value]:not([value=""])~label,.input-field textarea:focus~label,.input-field textarea:valid~label,.input-field textarea[value]:not([value=""])~label{color:var(--md-primary);font-size:12px;transform:translateY(-150%)}.input-field input::-moz-placeholder,.input-field textarea::-moz-placeholder{color:var(--md-grey-500);opacity:0;-moz-transition:opacity var(--md-transition-standard);transition:opacity var(--md-transition-standard)}.input-field input::placeholder,.input-field textarea::placeholder{color:var(--md-grey-500);opacity:0;transition:opacity var(--md-transition-standard)}.input-field input:focus::-moz-placeholder,.input-field textarea:focus::-moz-placeholder{opacity:1}.input-field input:focus::placeholder,.input-field textarea:focus::placeholder{opacity:1}.helper-text{color:var(--md-grey-600);display:block;font-size:12px;margin-top:4px;min-height:18px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.helper-text[data-error]{color:var(--md-error)}.helper-text[data-success]{color:var(--md-success)}.input-field .prefix{color:var(--md-grey-600);font-size:2rem;left:0;line-height:1;position:absolute;top:1rem;transition:color var(--md-transition-standard);width:3rem}.input-field .prefix.active{color:var(--md-primary)}.input-field .prefix~input,.input-field .prefix~label,.input-field .prefix~textarea{margin-left:3rem;width:calc(100% - 3rem)}input[type=color]:not(.browser-default){background-color:transparent;border:none;border-bottom:1px solid var(--md-grey-400);border-radius:0;box-shadow:none;box-sizing:content-box;font-size:16px;height:3rem;margin:0 0 8px;outline:none;padding:0;transition:border-bottom var(--md-transition-standard),box-shadow var(--md-transition-standard);width:100%}.input-field input[type=color]~label.active{transform:translateY(-180%)}input[type=color]:focus:not(.browser-default){border-bottom:2px solid var(--md-primary);box-shadow:0 1px 0 0 var(--md-primary)}.range-field{position:relative}.range-field input[type=range]{-webkit-appearance:none;background:transparent;border:none;margin:15px 0;outline:0;padding:0;width:100%}.range-field input[type=range]::-webkit-slider-track{background:var(--md-grey-300);border:none;border-radius:2px;height:3px}.range-field input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;background:var(--md-primary);border:none;border-radius:50%;cursor:pointer;height:14px;margin-top:-5px;position:relative;-webkit-transition:background var(--md-transition-standard);transition:background var(--md-transition-standard);width:14px}.range-field input[type=range]{background:linear-gradient(to right,var(--md-primary) 0,var(--md-primary) var(--range-progress,0),var(--md-grey-300) var(--range-progress,0),var(--md-grey-300) 100%)}.range-field input[type=range]:focus::-webkit-slider-thumb{background:var(--md-primary-dark);box-shadow:0 0 0 10px rgba(33,150,243,.26)}.range-field input[type=range]::-moz-range-track{background:var(--md-grey-300);border:none;border-radius:2px;height:3px}.range-field input[type=range]::-moz-range-thumb{background:var(--md-primary);border:none;border-radius:50%;cursor:pointer;height:14px;-moz-transition:background var(--md-transition-standard);transition:background var(--md-transition-standard);width:14px}.file-field{align-items:center;display:flex;overflow:hidden;position:relative}.file-field .btn{margin-right:var(--md-spacing-md);white-space:nowrap}.file-field input[type=file]{cursor:pointer;height:100%;left:0;opacity:0;position:absolute;top:0;width:100%}.file-field .file-path-wrapper{flex:1}.file-field .file-path{display:block;width:100%}.input-field.options>label{top:-2.5rem}span.mandatory{color:var(--md-error);font-weight:var(--md-font-weight-bold)}.character-counter{color:var(--md-grey-600);font-size:12px;margin-top:var(--md-spacing-xs);min-height:18px;text-align:right}.input-field input.validate:focus.valid~label,.input-field textarea.validate:focus.valid~label{color:var(--md-success)}.input-field input.validate:focus.invalid~label,.input-field textarea.validate:focus.invalid~label{color:var(--md-error)}.autocomplete-content{background:#fff;border-radius:var(--md-radius-small);box-shadow:var(--md-shadow-2);left:0;margin-top:0;max-height:200px;overflow-y:auto;position:absolute;right:0;top:calc(100% + 8px);z-index:1000}.autocomplete-content li{border-bottom:1px solid var(--md-grey-200);cursor:pointer;list-style:none;padding:var(--md-spacing-sm) var(--md-spacing-md);transition:background-color var(--md-transition-fast)}.autocomplete-content li.active,.autocomplete-content li:hover{background-color:var(--md-grey-100)}.autocomplete-content li:last-child{border-bottom:none}.twist{transform:scaleY(-1)}.codeblock{margin:1.5rem 0 2.5rem}.codeblock>div{margin-bottom:1rem}.codeblock>label{display:inline-block}.map-editor .input-field .prefix~.collection{margin-left:3rem;width:92%;width:calc(100% - 3rem)}.map-editor .active .checkbox-in-collection label>input[type=checkbox]:checked+span:before{-webkit-backface-visibility:hidden;border-color:transparent #fff #fff transparent;border-style:solid;border-width:2px;height:22px;left:-3px;top:-4px;transform:rotate(40deg);transform-origin:100% 100%;width:12px}.modal-overlay{background-color:rgba(0,0,0,.5);bottom:0;left:0;opacity:0;position:fixed;right:0;top:0;transition:opacity var(--md-transition-standard),visibility var(--md-transition-standard);visibility:hidden;z-index:1000}.modal-overlay.active{opacity:1;visibility:visible}.modal{background:#fff;border-radius:var(--md-radius-small);box-shadow:var(--md-shadow-4);display:flex;flex-direction:column;left:50%;max-height:90vh;max-width:90vw;opacity:0;overflow:hidden;position:fixed;top:50%;transform:translate(-50%,-50%) scale(.8);transition:all var(--md-transition-standard);visibility:hidden;width:600px;z-index:1001}.modal.active{opacity:1;transform:translate(-50%,-50%) scale(1);visibility:visible}.modal-content{flex:1;overflow-y:auto;padding:var(--md-spacing-lg)}.modal-content h1,.modal-content h2,.modal-content h3,.modal-content h4,.modal-content h5,.modal-content h6{color:var(--md-grey-800);margin-bottom:var(--md-spacing-md);margin-top:0}.modal-content p{color:var(--md-grey-700);line-height:1.6;margin-bottom:var(--md-spacing-md)}.modal-content p:last-child{margin-bottom:0}.modal-footer{align-items:center;background-color:var(--md-grey-50);border-top:1px solid var(--md-grey-200);display:flex;flex-shrink:0;gap:var(--md-spacing-sm);justify-content:flex-end;padding:var(--md-spacing-sm) var(--md-spacing-lg)}.modal.modal-fixed-footer{height:70vh}.modal.modal-fixed-footer .modal-content{height:calc(100% - 60px);overflow-y:auto}.modal.modal-fixed-footer .modal-footer{bottom:0;left:0;position:absolute;right:0}.modal.bottom-sheet{border-radius:var(--md-radius-medium) var(--md-radius-medium) 0 0;bottom:0;left:0;max-height:80vh;max-width:none;right:0;top:auto;transform:translateY(100%);width:100%}.modal.bottom-sheet.active{transform:translateY(0)}.modal-close{cursor:pointer}.modal:target{transform:translate(-50%,-50%) scale(1)}.modal:target,.modal:target~.modal-overlay{opacity:1;visibility:visible}.modal-checkbox{display:none}.modal-checkbox:checked~.modal-overlay{opacity:1;visibility:visible}.modal-checkbox:checked~.modal{opacity:1;transform:translate(-50%,-50%) scale(1);visibility:visible}.modal-checkbox:checked~.modal.bottom-sheet{transform:translateY(0)}.modal.modal-small{width:400px}.modal.modal-large{width:800px}.modal.modal-fullscreen{border-radius:0;height:100vh;left:0;max-height:none;max-width:none;top:0;transform:none;width:100vw}.modal.modal-fullscreen.active{transform:none}@media (max-width:768px){.modal{max-height:80vh;width:95vw}.modal-content{padding:var(--md-spacing-md)}.modal-footer{flex-direction:column;gap:var(--md-spacing-xs);padding:var(--md-spacing-sm) var(--md-spacing-md)}.modal-footer .btn{margin:0;width:100%}}.modal-enter{opacity:0;transform:translate(-50%,-50%) scale(.8);visibility:visible}.modal-enter-active{transition:all var(--md-transition-standard)}.modal-enter-active,.modal-exit{opacity:1;transform:translate(-50%,-50%) scale(1)}.modal-exit-active{opacity:0;transform:translate(-50%,-50%) scale(.8);transition:all var(--md-transition-standard)}.modal-backdrop-enter{opacity:0}.modal-backdrop-enter-active{opacity:1;transition:opacity var(--md-transition-standard)}.modal-backdrop-exit{opacity:1}.modal-backdrop-exit-active{opacity:0;transition:opacity var(--md-transition-standard)}.modal[aria-hidden=false]{opacity:1;transform:translate(-50%,-50%) scale(1);visibility:visible}.modal[aria-hidden=true]{opacity:0;transform:translate(-50%,-50%) scale(.8);visibility:hidden}@media (prefers-contrast:high){.modal{border:2px solid var(--md-grey-800)}.modal-footer{border-top:2px solid var(--md-grey-800)}}@media (prefers-reduced-motion:reduce){.modal,.modal-overlay{transition:none}}.clear,.clear-10,.clear-15{clear:both}.clear-10{margin-bottom:10px}.clear-15{margin-bottom:15px}span.mandatory{color:red;margin-left:5px}label+.switch{margin:1.05rem 0}.mm_timeline{list-style:none;margin:30px 0 0;padding:0;position:relative}.mm_timeline:before{background:#afdcf8;bottom:0;content:"";left:20%;margin-left:-10px;position:absolute;top:0;width:10px}.mm_timeline>li .mm_time{display:block;padding-right:100px;position:absolute;width:25%}.mm_timeline>li .mm_time span{display:block;text-align:right}.mm_timeline>li .mm_time span:first-child{color:#bdd0db;font-size:.9em}.mm_timeline>li .mm_time span:last-child{color:#3594cb;font-size:1.4em}.mm_timeline>li:nth-child(odd) .mm_time span:last-child{color:#6cbfee}.mm_timeline>li.active:nth-child(2n) .mm_time span:last-child,.mm_timeline>li.active:nth-child(odd) .mm_time span:last-child{color:#060558}.mm_timeline>li .mm_label{background:#3594cb;border-radius:5px;color:#fff;font-size:1.2em;font-weight:300;line-height:1.4;margin:0 0 15px 28%;padding:.6em 1em;position:relative}.mm_timeline>li.active .mm_label{border:4px solid #060558}.mm_timeline>li:nth-child(odd) .mm_label{background:#6cbfee}.mm_timeline>li .mm_label h5{border-bottom:1px solid hsla(0,0%,100%,.4);margin-top:0;padding:0 0 10px}.mm_timeline>li .mm_label:after{border:10px solid transparent;border-right-color:#3594cb;content:" ";height:0;pointer-events:none;position:absolute;right:100%;top:10px;width:0}.mm_timeline>li:nth-child(2n).active .mm_label:after,.mm_timeline>li:nth-child(odd).active .mm_label:after{border-right-color:#060558}.mm_timeline>li:nth-child(odd) .mm_label:after{border-right-color:#6cbfee}.mm_timeline>li .mm_icon{-webkit-font-smoothing:antialiased;background:#46a4da;border-radius:50%;box-shadow:0 0 0 8px #afdcf8;color:#fff;font-size:1.4em;font-style:normal;font-variant:normal;font-weight:400;height:40px;left:20%;line-height:40px;margin:0 0 0 -25px;position:absolute;text-align:center;text-transform:none;width:40px}.mm_timeline>li.active .mm_icon{background:#060558}.mm_icon>.material-icons{line-height:3rem}@media screen and (max-width:65.375em){.mm_timeline>li .mm_time span:last-child{font-size:1.5em}}@media screen and (max-width:47.2em){.mm_timeline:before{display:none}.mm_timeline>li .mm_time{padding:0 0 20px;position:relative;width:100%}.mm_timeline>li .mm_time span{text-align:left}.mm_timeline>li .mm_label{font-size:95%;font-weight:400;margin:0 0 30px;padding:1em}.mm_timeline>li .mm_label:after{border-bottom-color:#3594cb;border-right-color:transparent;left:20px;right:auto;top:-20px}.mm_timeline>li:nth-child(odd) .mm_label:after{border-bottom-color:#6cbfee;border-right-color:transparent}.mm_timeline>li .mm_icon{float:right;left:auto;margin:-55px 5px 0 0;position:relative}}
/*# sourceMappingURL=index.css.map */`, "",{"version":3,"sources":["webpack://./../lib/dist/index.css","webpack://./../lib/dist/input.css","webpack://./../lib/dist/codeblock.css","webpack://./../lib/dist/map-editor.css","webpack://./../lib/dist/modal.css","webpack://./../lib/dist/switch.css","webpack://./../lib/dist/timeline.css"],"names":[],"mappings":"AAGA,MAEE,oBAAqB,CACrB,yBAA0B,CAC1B,0BAA2B,CAC3B,sBAAuB,CACvB,2BAA4B,CAC5B,4BAA6B,CAG7B,oBAAqB,CACrB,qBAAsB,CACtB,kBAAsB,CACtB,qBAAsB,CACtB,qBAAsB,CACtB,qBAAsB,CACtB,qBAAsB,CACtB,qBAAsB,CACtB,qBAAsB,CACtB,qBAAsB,CAGtB,oBAAqB,CACrB,oBAAqB,CACrB,kBAAmB,CACnB,iBAAkB,CAGlB,iEAAqE,CACrE,iEAAqE,CACrE,kEAAsE,CACtE,oEAAwE,CAGxE,gFAAqF,CACrF,0BAA2B,CAC3B,4BAA6B,CAC7B,2BAA4B,CAC5B,yBAA0B,CAG1B,oDAAwD,CACxD,wDAA4D,CAC5D,oDAAwD,CAGxD,qBAAsB,CACtB,sBAAuB,CACvB,sBAAuB,CAGvB,mBAAoB,CACpB,mBAAoB,CACpB,oBAAqB,CACrB,oBAAqB,CACrB,oBACF,CAGA,iBACE,qBACF,CAEA,KAKE,qBAAsB,CADtB,wBAAyB,CAHzB,iCAAkC,CAClC,yCAA0C,CAC1C,eAAgB,CAGhB,QAAS,CACT,SACF,CAGA,WAGE,aAAc,CADd,gBAAiB,CAEjB,8BAA+B,CAH/B,UAIF,CAEA,KACE,YAAa,CACb,cAAe,CACf,sCACF,CAEA,KACE,MAEF,CAGA,aAJE,8BAIoF,CAAtF,QAAU,kBAAmB,CAAE,mBAAuD,CACtF,QAAU,mBAAoB,CAAE,oBAAwD,CACxF,gBADuD,8BACmB,CAA1E,QAAU,YAAa,CAAE,aAAiD,CAC1E,QAAU,mBAAoB,CAAE,oBAAwD,CACxF,gBADuD,8BACiC,CAAxF,QAAU,mBAAoB,CAAE,oBAAwD,CACxF,QAAU,YAAa,CAAE,aAAiD,CAC1E,gBADyC,8BAC+C,CAAxF,QAAU,mBAAoB,CAAE,oBAAwD,CACxF,QAAU,mBAAoB,CAAE,oBAAwD,CACxF,gBADuD,8BACmB,CAA1E,QAAU,YAAa,CAAE,aAAiD,CAC1E,SAAW,mBAAoB,CAAE,oBAAwD,CACzF,kBADwD,8BACiC,CAAzF,SAAW,mBAAoB,CAAE,oBAAwD,CACzF,SAAW,aAAc,CAAE,cAAe,CAAE,8BAAiC,CAE7E,yBACE,QAAU,kBAAmB,CAAE,mBAAuD,CACtF,gBADqD,8BACmC,CAAxF,QAAU,mBAAoB,CAAE,oBAAwD,CACxF,QAAU,YAAa,CAAE,aAAiD,CAC1E,gBADyC,8BAC+C,CAAxF,QAAU,mBAAoB,CAAE,oBAAwD,CACxF,QAAU,mBAAoB,CAAE,oBAAwD,CACxF,gBADuD,8BACmB,CAA1E,QAAU,YAAa,CAAE,aAAiD,CAC1E,QAAU,mBAAoB,CAAE,oBAAwD,CACxF,gBADuD,8BACiC,CAAxF,QAAU,mBAAoB,CAAE,oBAAwD,CACxF,QAAU,YAAa,CAAE,aAAiD,CAC1E,iBADyC,8BACgD,CAAzF,SAAW,mBAAoB,CAAE,oBAAwD,CACzF,SAAW,mBAAoB,CAAE,oBAAwD,CACzF,kBADwD,8BACqB,CAA7E,SAAW,aAAc,CAAE,cAAkD,CAC/E,CAEA,0BACE,QAAU,kBAAmB,CAAE,mBAAuD,CACtF,gBADqD,8BACmC,CAAxF,QAAU,mBAAoB,CAAE,oBAAwD,CACxF,QAAU,YAAa,CAAE,aAAiD,CAC1E,gBADyC,8BAC+C,CAAxF,QAAU,mBAAoB,CAAE,oBAAwD,CACxF,QAAU,mBAAoB,CAAE,oBAAwD,CACxF,gBADuD,8BACmB,CAA1E,QAAU,YAAa,CAAE,aAAiD,CAC1E,QAAU,mBAAoB,CAAE,oBAAwD,CACxF,gBADuD,8BACiC,CAAxF,QAAU,mBAAoB,CAAE,oBAAwD,CACxF,QAAU,YAAa,CAAE,aAAiD,CAC1E,iBADyC,8BACgD,CAAzF,SAAW,mBAAoB,CAAE,oBAAwD,CACzF,SAAW,mBAAoB,CAAE,oBAAwD,CACzF,kBADwD,8BACqB,CAA7E,SAAW,aAAc,CAAE,cAAkD,CAC/E,CAKA,2BAAY,UAAkC,CAE9C,UACE,eAAgB,CAChB,sBAAuB,CACvB,kBACF,CAEA,cAAgB,iBAAoB,CACpC,YAAc,eAAkB,CAChC,aAAe,gBAAmB,CAElC,MAAQ,sBAA0B,CAClC,MAAQ,uBAA2B,CAGnC,gBAUE,gBAAiB,CAEjB,oCAAqC,CACrC,kCAAmC,CAFnC,aAAc,CAHd,oBAAqB,CAPrB,0BAA6B,CAG7B,cAAe,CADf,iBAAkB,CADlB,eAAmB,CAInB,qBAAsB,CADtB,aAAc,CAEd,mBAAoB,CAEpB,kBAKF,CAEA,qBAAuB,cAAiB,CACxC,sBAAwB,cAAiB,CACzC,uBAAyB,cAAiB,CAC1C,sBAAwB,cAAiB,CAEzC,qBACE,iCAAkC,CAClC,qBACF,CAEA,sBACE,gCAAiC,CACjC,qBACF,CAEA,uBAKE,wBAAyB,CAHzB,yBAA0B,CAD1B,iBAAkB,CAElB,OAAQ,CACR,0BAEF,CAGA,wBACE,GAEE,SAAU,CADV,kBAEF,CACA,GAEE,SAAU,CADV,kBAEF,CACF,CAEA,cAIE,uCAAwC,CAFxC,eAAgB,CADhB,iBAAkB,CAElB,wBAAiB,CAAjB,qBAAiB,CAAjB,gBAEF,CAEA,qBAQE,6BAAoC,CADpC,iBAAkB,CANlB,UAAW,CAKX,QAAS,CAFT,QAAS,CAFT,iBAAkB,CAClB,OAAQ,CAMR,8BAAgC,CAChC,2EAA6E,CAL7E,OAMF,CAEA,4BAGE,mCAAqC,CADrC,YAAa,CADb,WAGF,CAEA,oBACE,8BACF,CAEA,mBACE,8BACF,CAGA,mDAME,kBAAmB,CAInB,WAAY,CACZ,oCAAqC,CAOrC,cAAe,CAbf,mBAAoB,CAOpB,iCAAkC,CAClC,cAAe,CACf,wCAAyC,CAPzC,sBAAuB,CAUvB,mBAAqB,CARrB,2BAA4B,CAY5B,YAAa,CAEb,eAAgB,CAfhB,iDAAkD,CAclD,iBAAkB,CAPlB,oBAAqB,CACrB,wBAAyB,CAGzB,4CAA6C,CAC7C,wBAAiB,CAAjB,qBAAiB,CAAjB,gBAIF,CAGA,KACE,kCAAmC,CAEnC,6BAA8B,CAD9B,UAEF,CAEA,WACE,uCAAwC,CACxC,6BAA8B,CAC9B,0BACF,CAEA,YACE,6BAA8B,CAC9B,uBACF,CAEA,cACE,mCAAoC,CAGpC,eAAgB,CAFhB,wBAAyB,CACzB,kBAAmB,CAEnB,cACF,CAGA,UACE,4BAA6B,CAE7B,eAAgB,CADhB,uBAEF,CAEA,gBACE,qCAA0C,CAC1C,4BACF,CAEA,iBACE,qCACF,CAEA,mBACE,4BAA6B,CAC7B,wBAAyB,CACzB,kBACF,CAGA,WAEE,cAAe,CACf,eAAgB,CAFhB,iDAGF,CAGA,WAEE,cAAe,CACf,eAAgB,CAFhB,iDAGF,CAGA,cAKE,oCAAqC,CAFrC,iBAAkB,CAIlB,6BAA8B,CAD9B,UAAY,CAJZ,WAAY,CAEZ,SAAU,CAHV,UAOF,CAEA,oBACE,yCAA0C,CAC1C,6BAA8B,CAC9B,0BACF,CAEA,qBACE,uBACF,CAEA,wBAEE,WAAY,CADZ,UAEF,CAEA,wBAEE,WAAY,CADZ,UAEF,CAGA,SAAW,gCAAmC,CAC9C,eAAiB,wBAA2B,CAE5C,WAAa,kCAAqC,CAClD,iBAAmB,wBAA2B,CAE9C,YAAc,kCAAqC,CACnD,kBAAoB,wBAA2B,CAE/C,YAAc,wBAA2B,CACzC,kBAAoB,wBAA2B,CAE/C,UAAY,wBAA2B,CACvC,gBAAkB,wBAA2B,CAG7C,eACE,cACF,CAGA,YACE,iBACF,CAEA,kBAME,mCAAoC,CAGpC,oCAAqC,CANrC,WAAY,CAIZ,UAAY,CANZ,0BAA2B,CAS3B,cAAe,CACf,yCAA0C,CAH1C,iDAAkD,CASlD,mBAAoB,CALpB,kBAAmB,CACnB,YAKF,CAEA,qCAhBE,QAAS,CAUT,SAAU,CAZV,iBAAkB,CAGlB,0BAA2B,CAW3B,yFAA2F,CAD3F,iBAgBF,CAXA,mBAOE,4BAAoC,CAApC,uCAAoC,CAJpC,WAAY,CAFZ,UAUF,CAEA,iDAEE,SAAU,CACV,kBACF,CAGA,wCAEE,WAAY,CADZ,QAEF,CAEA,yCAIE,sCAAuC,CADvC,4BAA6B,CAD7B,WAAY,CADZ,QAIF,CAEA,sCAEE,WAAY,CACZ,SAAU,CACV,UAAW,CAHX,OAAQ,CAIR,0BACF,CAEA,uCAOE,oCAAqC,CADrC,4BAA6B,CAJ7B,WAAY,CACZ,SAAU,CACV,UAAW,CAHX,OAAQ,CAIR,0BAGF,CAEA,uCAEE,WAAY,CAEZ,SAAU,CADV,UAAW,CAFX,OAAQ,CAIR,0BACF,CAEA,wCAOE,qCAAsC,CADtC,4BAA6B,CAJ7B,WAAY,CAEZ,SAAU,CADV,UAAW,CAFX,OAAQ,CAIR,0BAGF,CAyCA,sBAEE,eAAgB,CAChB,gBAEF,CAgCA,mBAEE,SAUF,CAEA,0BAGE,2BACF,CAEA,qOAQE,2BACF,CAgBA,aAGE,+BAEF,CAWA,qBAKE,SAGF,CA2JA,sBAOE,+DAAgE,CALhE,QASF,CAsBA,gBACE,iBACF,CAEA,4BACE,kCAAmC,CACnC,iBAAkB,CAClB,UACF,CAGA,uBACE,eAAgB,CAChB,uBAAwB,CACxB,oBAAqB,CACrB,sBAAuB,CACvB,WAAY,CACZ,0CAA2C,CAC3C,eAAgB,CAChB,eAAgB,CAChB,sBAAuB,CACvB,wBAAyB,CACzB,cAAe,CACf,iCAAkC,CAClC,cAAe,CACf,WAAY,CACZ,gBAAiB,CACjB,cAAiB,CACjB,YAAa,CACb,SAAU,CACV,+FAAiG,CACjG,UACF,CAEA,6CACE,yCAA0C,CAC1C,sCACF,CAEA,gCACE,2CAA4C,CAC5C,wBAAyB,CACzB,kBACF,CAGA,sBAME,wBAAyB,CALzB,WAAY,CAIZ,cAAe,CAEf,mBAAoB,CALpB,iBAAkB,CAElB,OAAQ,CADR,UAAY,CAKZ,kDACF,CAEA,iFAEE,wBACF,CAGA,iBAKE,eAAgB,CAEhB,oCAAqC,CADrC,6BAA8B,CAH9B,MAAO,CAKP,gBAAiB,CAGjB,SAAU,CAFV,eAAgB,CARhB,iBAAkB,CAGlB,OAAQ,CAFR,QAAS,CAWT,2BAA4B,CAC5B,4CAA6C,CAF7C,iBAAkB,CAFlB,YAKF,CAEA,wBACE,SAAU,CAEV,uBAAwB,CADxB,kBAEF,CAEA,wBAEE,kBAAmB,CAInB,0CAA2C,CAF3C,cAAe,CAHf,YAAa,CAMb,eAAgB,CAJhB,iDAAkD,CAElD,qDAGF,CAEA,+DAEE,mCACF,CAEA,iCACE,wBAAyB,CACzB,kBAAmB,CACnB,UACF,CAEA,uCACE,4BACF,CAEA,mCACE,kBACF,CAEA,4BAGE,iBAAkB,CADlB,WAAY,CAEZ,iCAAkC,CAClC,mBAAiB,CAAjB,gBAAiB,CAJjB,UAKF,CAEA,6BAGE,wBAAyB,CADzB,cAAe,CADf,iCAGF,CAEA,6BACE,MACF,CAEA,0BAKE,kCAAmC,CACnC,0CAA2C,CAF3C,wBAAyB,CAFzB,cAAe,CACf,wCAAyC,CAKzC,mBAAqB,CAPrB,iDAAkD,CAMlD,wBAEF,CAGA,iCACE,iCAAkC,CAClC,mBACF,CAGA,aAGE,kBAAmB,CAFnB,YAAa,CACb,cAAe,CAEf,wBAAyB,CACzB,eAAgB,CAChB,8BACF,CAEA,YAEE,kBAAmB,CACnB,mCAAoC,CACpC,oCAAqC,CAGrC,wBAAyB,CANzB,mBAAoB,CAKpB,cAAe,CADf,iDAGF,CAEA,kBAGE,wBAAyB,CADzB,cAAe,CADf,gCAAiC,CAGjC,0CACF,CAEA,wBACE,qBACF,CAGA,wBACE,wBAAyB,CACzB,cAAe,CAEf,MAAO,CADP,iBAAkB,CAElB,SAAW,CAEX,8CAA+C,CAD/C,UAEF,CAEA,+BACE,uBACF,CAEA,kGAGE,gBAAiB,CACjB,uBACF,CAEA,yCACE,SAAU,CACV,OAAQ,CACR,uBACF,CAGA,sBACE,wBAAyB,CACzB,WAAY,CACZ,cAAe,CAEf,MAAO,CAKP,mBAAoB,CANpB,iBAAkB,CAOlB,kBAAmB,CALnB,SAAW,CACX,uBAAwB,CACxB,uBAAyB,CACzB,4CAGF,CASA,gGACE,uBAAwB,CACxB,cAAe,CACf,2BACF,CAQA,cACE,eACF,CAgSA,qCACE,oBACE,YACF,CACA,yBACE,gBAAiB,CACjB,iBAAkB,CAClB,UACF,CACA,8BACE,eACF,CACA,0BACE,aAAc,CACd,eAAgB,CAChB,eAAgB,CAChB,WACF,CACA,gCACE,2BAA4B,CAC5B,8BAA+B,CAC/B,SAAU,CACV,UAAW,CACX,SACF,CACA,+CACE,2BAA4B,CAC5B,8BACF,CACA,yBACE,WAAY,CACZ,SAAU,CACV,oBAAqB,CACrB,iBACF,CACF,CAMA,OAEE,kCAAmC,CADnC,iBAAkB,CAElB,UACF,CAEA,iBAGE,kBAAmB,CAEnB,0CAA2C,CAJ3C,YAAa,CACb,cAAe,CAKf,wBAAyB,CAHzB,eAAgB,CAIhB,8BAA+B,CAF/B,sDAGF,CAEA,yBACE,yCACF,CAGA,MAEE,kBAAmB,CACnB,mCAAoC,CACpC,kBAAmB,CAInB,wBAAyB,CAGzB,cAAe,CAVf,mBAAoB,CAMpB,cAAe,CADf,WAAY,CAGZ,UAAW,CAJX,cAAe,CAOf,iBAAkB,CAFlB,wCAGF,CAEA,eACE,kCAAmC,CACnC,UACF,CAEA,UAGE,iBAAkB,CADlB,WAAY,CAGZ,gBAAiB,CADjB,iCAAkC,CAHlC,UAKF,CAEA,aAIE,wBAAyB,CADzB,cAAe,CAFf,cAAe,CAKf,aAAc,CAJd,gCAAiC,CAGjC,0CAEF,CAEA,mBACE,qBACF,CAEA,sBACE,wBACF,CAEA,4BACE,UACF,CAGA,aAGE,sBAAuB,CAFvB,WAAY,CAIZ,wBAAyB,CACzB,MAAO,CAKP,iCAAkC,CAPlC,cAAe,CAIf,WAAY,CACZ,UAAW,CAFX,eAAgB,CALhB,YAAa,CAQb,SAEF,CAEA,+BACE,wBACF,CAFA,0BACE,wBACF,CAGA,0BAKE,wBAAyB,CACzB,WAAY,CAFZ,cAAe,CADf,MAAO,CAQP,mBAAoB,CAVpB,iBAAkB,CAQlB,kBAAmB,CAPnB,SAAW,CAQX,uBAAwB,CAFxB,uBAAyB,CADzB,4CAKF,CAEA,iCAEE,uBAAwB,CADxB,cAAe,CAEf,2BACF,CAGA,iCACE,4BAA8B,CAC9B,yBACF,CAGA,6BAKE,eAAiB,CAEjB,oCAAqC,CADrC,6BAA8B,CAH9B,MAAO,CAQP,cAAe,CAHf,gBAAiB,CACjB,eAAgB,CARhB,iBAAkB,CAGlB,OAAQ,CAFR,QAAS,CAQT,YAEF,CAEA,gCAIE,0CAA2C,CAD3C,cAAe,CAFf,eAAgB,CAChB,iDAAkD,CAGlD,qDACF,CAEA,+EAEE,mCACF,CAEA,2CACE,kBACF,CAEA,gCAGE,iBAAkB,CADlB,WAAY,CAEZ,iCAAkC,CAClC,qBAAsB,CAJtB,UAKF,CAGA,yCACE,gCACF,CAGA,2FAGE,uBAAwB,CADxB,cAAe,CAEf,2BACF,CAGA,gEAEE,uBAAwB,CADxB,cAAe,CAEf,2BACF,CAKA,aACE,WAAY,CAEZ,oCAAqC,CADrC,6BAA8B,CAK9B,oBAAqB,CAHrB,oDAAqD,CAIrD,eAAgB,CAHhB,SAAU,CACV,UAGF,CAEA,gBAEE,0CAA2C,CAC3C,QAAS,CACT,SAAU,CAHV,iBAIF,CAEA,2BACE,kBACF,CAEA,oBAGE,kBAAmB,CAInB,qBAAsB,CACtB,0CAA2C,CAC3C,cAAe,CAPf,YAAa,CAEb,0BAA2B,CAC3B,eAAgB,CAChB,iDAAkD,CALlD,iBAAkB,CASlB,yDAA0D,CAC1D,wBAAiB,CAAjB,qBAAiB,CAAjB,gBACF,CAMA,qEACE,kCACF,CAIA,qCAEE,wBAAyB,CACzB,cAAe,CAFf,iCAGF,CAEA,4DACE,uBACF,CAEA,kBAEE,qBAAsB,CAKtB,0CAA2C,CAH3C,YAAa,CACb,eAAgB,CAFhB,SAAU,CAFV,iBAAkB,CAKlB,4CAEF,CAEA,yCAGE,kBAAmB,CAFnB,iBAAkB,CAClB,4BAEF,CAEA,oBAGE,wBAAyB,CADzB,eAAgB,CADhB,iCAGF,CAEA,+BACE,eACF,CAGA,0BACE,mCAAoC,CACpC,kBACF,CAEA,8CACE,YACF,CAKA,kBAGE,WAAY,CAFZ,cAAe,CACf,UAAW,CAEX,YACF,CAEA,iCAEE,SAAU,CADV,UAEF,CAEA,gCACE,WAAY,CACZ,QACF,CAWA,iCACE,aAAc,CACd,iBAAkB,CAClB,YACF,CAGA,qBAKE,MAAO,CAHP,eAAgB,CAChB,QAAS,CACT,SAAU,CAKV,mBAAoB,CARpB,iBAAkB,CAKlB,OAAQ,CACR,iBAAkB,CAClB,YAEF,CAEA,wBACE,kBAAmB,CAEnB,mBAAoB,CADpB,uBAEF,CAEA,uCACE,aAAc,CACd,SAAU,CACV,mBAAqB,CACrB,uBACF,CAEA,8CACE,SAAU,CACV,kBACF,CAGA,mCACE,WAAY,CACZ,QACF,CAEA,sCAEE,WAAY,CADZ,QAEF,CAEA,oCAEE,SAAU,CADV,UAAW,CAEX,gBACF,CAEA,uCAGE,eAAgB,CADhB,iBAAkB,CADlB,gBAGF,CAEA,qCACE,SAAU,CACV,UAAW,CACX,eACF,CAEA,wCAGE,eAAgB,CADhB,gBAAiB,CADjB,eAGF,CAGA,2DACE,SAAU,CACV,kBACF,CAEA,qDACE,uBACF,CAGA,+CACE,2BACF,CCxuDA,aAEE,kCAAmC,CADnC,iBAAkB,CAElB,UACF,CAEA,oZAaE,4BAA6B,CAC7B,WAAY,CACZ,0CAA2C,CAC3C,eAAgB,CAQhB,eAAgB,CAChB,sBAAuB,CAJvB,iCAAkC,CADlC,cAAe,CAFf,WAAY,CASZ,cAAiB,CAVjB,YAAa,CAMb,SAAe,CAGf,+FAAiG,CAPjG,UASF,CAEA,sBACE,WAAY,CACZ,eAAgB,CAChB,iBAAmB,CACnB,eACF,CAGA,qFAEE,yCAA0C,CAC1C,sCACF,CAGA,qDAEE,yCAA0C,CAC1C,sCACF,CAGA,yDAEE,uCAAwC,CACxC,oCACF,CAGA,2DAGE,2CAA4C,CAD5C,wBAAyB,CAEzB,kBACF,CAGA,mBAKE,wBAAyB,CACzB,WAAY,CAFZ,cAAe,CADf,MAAO,CAQP,mBAAoB,CAVpB,iBAAkB,CAQlB,kBAAmB,CAPnB,QAAS,CAQT,uBAAwB,CAFxB,uBAAyB,CADzB,4CAKF,CAEA,0BAEE,uBAAwB,CADxB,cAAe,CAEf,2BACF,CAEA,qOAOE,uBAAwB,CADxB,cAAe,CAEf,2BACF,CAGA,6EAEE,wBAAyB,CACzB,SAAU,CACV,qDAAiD,CAAjD,gDACF,CALA,mEAEE,wBAAyB,CACzB,SAAU,CACV,gDACF,CAEA,yFAEE,SACF,CAHA,+EAEE,SACF,CAGA,aAEE,wBAAyB,CAGzB,aAAc,CAJd,cAAe,CAEf,cAAe,CACf,eAAgB,CAGhB,eAAgB,CAChB,sBAAuB,CAFvB,kBAGF,CAEA,yBACE,qBACF,CAEA,2BACE,uBACF,CAGA,qBAOE,wBAAyB,CAJzB,cAAe,CAGf,MAAO,CAEP,aAAc,CAPd,iBAAkB,CAIlB,QAAS,CADT,8CAA+C,CAF/C,UAOF,CAEA,4BACE,uBACF,CAEA,oFAGE,gBAAiB,CACjB,uBACF,CAGA,wCAEE,4BAA6B,CAC7B,WAAY,CACZ,0CAA2C,CAC3C,eAAgB,CAMhB,eAAgB,CAChB,sBAAuB,CAHvB,cAAe,CAFf,WAAY,CANZ,cAAmB,CAKnB,YAAa,CAIb,SAAU,CAGV,+FAAiG,CALjG,UAMF,CAEA,4CACE,2BACF,CAEA,8CACE,yCAA0C,CAC1C,sCACF,CAGA,aACE,iBACF,CAEA,+BAOE,uBAAwB,CADxB,sBAAuB,CALvB,WAAY,CAGZ,aAAc,CAFd,SAAU,CAGV,SAAU,CAFV,UAKF,CAEA,qDAEE,6BAA8B,CAC9B,WAAY,CACZ,iBAAkB,CAHlB,UAIF,CAEA,qDACE,uBAAwB,CAKxB,4BAA6B,CAJ7B,WAAY,CAGZ,iBAAkB,CAGlB,cAAe,CALf,WAAY,CAIZ,eAAgB,CAGhB,iBAAkB,CADlB,2DAAoD,CAApD,mDAAoD,CALpD,UAOF,CAEA,+BACE,qKACF,CAEA,2DACE,iCAAkC,CAClC,0CACF,CAEA,iDAEE,6BAA8B,CAC9B,WAAY,CACZ,iBAAkB,CAHlB,UAIF,CAEA,iDAKE,4BAA6B,CAJ7B,WAAY,CAGZ,iBAAkB,CAElB,cAAe,CAJf,WAAY,CAKZ,wDAAoD,CAApD,mDAAoD,CAJpD,UAKF,CAGA,YAIE,kBAAmB,CADnB,YAAa,CADb,eAAgB,CADhB,iBAIF,CAEA,iBACE,iCAAkC,CAClC,kBACF,CAEA,6BAOE,cAAe,CAFf,WAAY,CAHZ,MAAO,CAIP,SAAU,CALV,iBAAkB,CAElB,KAAM,CACN,UAIF,CAEA,+BACE,MACF,CAEA,uBACE,aAAc,CACd,UACF,CAGA,2BACE,WACF,CAEA,eAEE,qBAAsB,CACtB,sCACF,CAGA,mBAGE,wBAAyB,CADzB,cAAe,CAGf,+BAAgC,CAJhC,eAAgB,CAGhB,gBAEF,CAGA,+FAEE,uBACF,CAEA,mGAEE,qBACF,CAGA,sBAKE,eAAiB,CAEjB,oCAAqC,CADrC,6BAA8B,CAH9B,MAAO,CAQP,YAAa,CAHb,gBAAiB,CACjB,eAAgB,CARhB,iBAAkB,CAGlB,OAAQ,CAFR,oBAAqB,CAQrB,YAEF,CAEA,yBAIE,0CAA2C,CAD3C,cAAe,CAFf,eAAgB,CAChB,iDAAkD,CAGlD,qDACF,CAEA,+DAEE,mCACF,CAEA,oCACE,kBACF,CAGA,OACE,oBACF,CC3VA,WACE,sBACF,CACA,eACE,kBACF,CACA,iBACE,oBACF,CCRA,6CACE,gBAAiB,CACjB,SAAU,CACV,uBACF,CAEA,2FAcE,kCAAmC,CANnC,8CAA8B,CAA9B,kBAA8B,CAA9B,gBAA8B,CAJ9B,WAAY,CAFZ,SAAU,CADV,QAAS,CAYT,uBAAwB,CAMxB,0BAA2B,CAhB3B,UAiBF,CCvBA,eAME,+BAAoC,CADpC,QAAS,CAFT,MAAO,CAKP,SAAU,CAPV,cAAe,CAGf,OAAQ,CAFR,KAAM,CAQN,yFAA2F,CAD3F,iBAAkB,CAFlB,YAIF,CAEA,sBACE,SAAU,CACV,kBACF,CAGA,OAKE,eAAiB,CACjB,oCAAqC,CACrC,6BAA8B,CAS9B,YAAa,CACb,qBAAsB,CAdtB,QAAS,CAMT,eAAgB,CADhB,cAAe,CAIf,SAAU,CAGV,eAAgB,CAdhB,cAAe,CACf,OAAQ,CAER,wCAA2C,CAU3C,4CAA6C,CAD7C,iBAAkB,CAHlB,WAAY,CACZ,YAOF,CAEA,cACE,SAAU,CAEV,uCAAyC,CADzC,kBAEF,CAGA,eAEE,MAAO,CACP,eAAgB,CAFhB,4BAGF,CAEA,4GAQE,wBAAyB,CADzB,kCAAmC,CADnC,YAGF,CAEA,iBAGE,wBAAyB,CADzB,eAAgB,CADhB,kCAGF,CAEA,4BACE,eACF,CAGA,cAME,kBAAmB,CAJnB,kCAAmC,CACnC,uCAAwC,CACxC,YAAa,CAIb,aAAc,CADd,wBAAyB,CAFzB,wBAAyB,CAJzB,iDAQF,CAGA,0BACE,WACF,CAEA,yCACE,wBAAyB,CACzB,eACF,CAEA,wCAEE,QAAS,CACT,MAAO,CAFP,iBAAkB,CAGlB,OACF,CAGA,oBAQE,iEAAkE,CANlE,QAAS,CACT,MAAO,CAIP,eAAgB,CADhB,cAAe,CAFf,OAAQ,CAHR,QAAS,CAQT,0BAA2B,CAJ3B,UAKF,CAEA,2BACE,uBACF,CAGA,aACE,cACF,CAGA,cAGE,uCACF,CAEA,2CALE,SAAU,CACV,kBAOF,CAGA,gBACE,YACF,CAEA,uCACE,SAAU,CACV,kBACF,CAEA,+BACE,SAAU,CAEV,uCAAyC,CADzC,kBAEF,CAEA,4CACE,uBACF,CAGA,mBACE,WACF,CAEA,mBACE,WACF,CAEA,wBAKE,eAAgB,CAHhB,YAAa,CAKb,MAAO,CAHP,eAAgB,CADhB,cAAe,CAGf,KAAM,CAEN,cAAe,CAPf,WAQF,CAEA,+BACE,cACF,CAGA,yBACE,OAEE,eAAgB,CADhB,UAEF,CAEA,eACE,4BACF,CAEA,cAEE,qBAAsB,CACtB,wBAAyB,CAFzB,iDAGF,CAEA,mBAEE,QAAS,CADT,UAEF,CACF,CAGA,aACE,SAAU,CAEV,wCAA2C,CAD3C,kBAEF,CAEA,oBAGE,4CACF,CAEA,gCALE,SAAU,CACV,uCAOF,CAEA,mBACE,SAAU,CACV,wCAA2C,CAC3C,4CACF,CAGA,sBACE,SACF,CAEA,6BACE,SAAU,CACV,gDACF,CAEA,qBACE,SACF,CAEA,4BACE,SAAU,CACV,gDACF,CAGA,0BACE,SAAU,CAEV,uCAAyC,CADzC,kBAEF,CAEA,yBACE,SAAU,CAEV,wCAA2C,CAD3C,iBAEF,CAGA,+BACE,OACE,mCACF,CAEA,cACE,uCACF,CACF,CAGA,uCACE,sBAEE,eACF,CACF,CCvRA,2BAGE,UAEF,CACA,UACE,kBACF,CACA,UACE,kBACF,CACA,eAEE,SAAU,CADV,eAEF,CACA,cACE,gBACF,CClBA,aAGE,eAAgB,CAFhB,eAAkB,CAClB,SAAU,CAEV,iBACF,CAGA,oBAME,kBAAmB,CAFnB,QAAS,CAHT,UAAW,CAMX,QAAS,CACT,iBAAkB,CANlB,iBAAkB,CAClB,KAAM,CAEN,UAIF,CAGA,yBACE,aAAc,CAEd,mBAAoB,CACpB,iBAAkB,CAFlB,SAGF,CAEA,8BACE,aAAc,CACd,gBACF,CAEA,0CAEE,aAAc,CADd,cAEF,CAEA,yCAEE,aAAc,CADd,eAEF,CAEA,wDACE,aACF,CAGA,6HAEE,aACF,CAGA,0BAEE,kBAAmB,CAOnB,iBAAkB,CANlB,UAAW,CAEX,eAAgB,CAChB,eAAgB,CAChB,eAAgB,CANhB,mBAAoB,CAGpB,gBAAkB,CAIlB,iBAEF,CAGA,iCACE,wBACF,CAEA,yCACE,kBACF,CAEA,6BAGE,0CAAiD,CAFjD,YAAe,CACf,gBAEF,CAGA,gCASE,6BAAkB,CAAlB,0BAAkB,CANlB,WAAY,CACZ,QAAS,CAGT,mBAAoB,CADpB,iBAAkB,CALlB,UAAW,CASX,QAAS,CALT,OAMF,CAGA,2GAEE,0BACF,CAEA,+CACE,0BACF,CAGA,yBASE,kCAAmC,CAGnC,kBAAmB,CACnB,iBAAkB,CAClB,4BAA6B,CAH7B,UAAW,CAJX,eAAgB,CAJhB,iBAAkB,CAElB,mBAAoB,CADpB,eAAmB,CAFnB,WAAY,CAcZ,QAAS,CART,gBAAiB,CAUjB,kBAAmB,CARnB,iBAAkB,CAKlB,iBAAkB,CATlB,mBAAoB,CALpB,UAkBF,CAGA,gCACC,kBACD,CAEA,yBACE,gBACF,CAGA,uCACE,yCACE,eACF,CACF,CAEA,qCACE,oBACE,YACF,CAEA,yBAGE,gBAAmB,CADnB,iBAAkB,CADlB,UAGF,CAEA,8BACE,eACF,CAEA,0BAIE,aAAc,CADd,eAAgB,CAFhB,eAAkB,CAClB,WAGF,CAEA,gCAIE,2BAA4B,CAD5B,8BAA+B,CAD/B,SAAU,CADV,UAAW,CAIX,SACF,CAEA,+CAEE,2BAA4B,CAD5B,8BAEF,CAEA,yBAEE,WAAY,CACZ,SAAU,CACV,oBAAuB,CAHvB,iBAIF,CACF;ANtLA,oCAAoC","sourcesContent":["/* Mithril Materialized - CSS-only Material Design Components */\n\n/* ===== FOUNDATION STYLES ===== */\n:root {\n  /* Material Design Color Palette */\n  --md-primary: #2196f3;\n  --md-primary-dark: #1976d2;\n  --md-primary-light: #64b5f6;\n  --md-secondary: #ff4081;\n  --md-secondary-dark: #c51162;\n  --md-secondary-light: #ff80ab;\n  \n  /* Greys */\n  --md-grey-50: #fafafa;\n  --md-grey-100: #f5f5f5;\n  --md-grey-200: #eeeeee;\n  --md-grey-300: #e0e0e0;\n  --md-grey-400: #bdbdbd;\n  --md-grey-500: #9e9e9e;\n  --md-grey-600: #757575;\n  --md-grey-700: #616161;\n  --md-grey-800: #424242;\n  --md-grey-900: #212121;\n  \n  /* Semantic Colors */\n  --md-success: #4caf50;\n  --md-warning: #ff9800;\n  --md-error: #f44336;\n  --md-info: #2196f3;\n  \n  /* Elevations */\n  --md-shadow-1: 0 2px 4px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\n  --md-shadow-2: 0 4px 8px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08);\n  --md-shadow-3: 0 8px 16px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08);\n  --md-shadow-4: 0 16px 32px rgba(0,0,0,0.12), 0 8px 16px rgba(0,0,0,0.08);\n  \n  /* Typography */\n  --md-font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;\n  --md-font-weight-light: 300;\n  --md-font-weight-regular: 400;\n  --md-font-weight-medium: 500;\n  --md-font-weight-bold: 700;\n  \n  /* Transitions */\n  --md-transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);\n  --md-transition-standard: 300ms cubic-bezier(0.4, 0, 0.2, 1);\n  --md-transition-slow: 500ms cubic-bezier(0.4, 0, 0.2, 1);\n  \n  /* Border Radius */\n  --md-radius-small: 4px;\n  --md-radius-medium: 8px;\n  --md-radius-large: 16px;\n  \n  /* Spacing */\n  --md-spacing-xs: 4px;\n  --md-spacing-sm: 8px;\n  --md-spacing-md: 16px;\n  --md-spacing-lg: 24px;\n  --md-spacing-xl: 32px;\n}\n\n/* Reset and Base Styles */\n*, *::before, *::after {\n  box-sizing: border-box;\n}\n\nbody {\n  font-family: var(--md-font-family);\n  font-weight: var(--md-font-weight-regular);\n  line-height: 1.5;\n  color: var(--md-grey-800);\n  background-color: #fff;\n  margin: 0;\n  padding: 0;\n}\n\n/* Grid System */\n.container {\n  width: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 var(--md-spacing-md);\n}\n\n.row {\n  display: flex;\n  flex-wrap: wrap;\n  margin: 0 calc(-1 * var(--md-spacing-sm));\n}\n\n.col {\n  flex: 1;\n  padding: 0 var(--md-spacing-sm);\n}\n\n/* Column sizes */\n.col.s1 { flex: 0 0 8.333333%; max-width: 8.333333%; padding: 0 var(--md-spacing-sm); }\n.col.s2 { flex: 0 0 16.666667%; max-width: 16.666667%; padding: 0 var(--md-spacing-sm); }\n.col.s3 { flex: 0 0 25%; max-width: 25%; padding: 0 var(--md-spacing-sm); }\n.col.s4 { flex: 0 0 33.333333%; max-width: 33.333333%; padding: 0 var(--md-spacing-sm); }\n.col.s5 { flex: 0 0 41.666667%; max-width: 41.666667%; padding: 0 var(--md-spacing-sm); }\n.col.s6 { flex: 0 0 50%; max-width: 50%; padding: 0 var(--md-spacing-sm); }\n.col.s7 { flex: 0 0 58.333333%; max-width: 58.333333%; padding: 0 var(--md-spacing-sm); }\n.col.s8 { flex: 0 0 66.666667%; max-width: 66.666667%; padding: 0 var(--md-spacing-sm); }\n.col.s9 { flex: 0 0 75%; max-width: 75%; padding: 0 var(--md-spacing-sm); }\n.col.s10 { flex: 0 0 83.333333%; max-width: 83.333333%; padding: 0 var(--md-spacing-sm); }\n.col.s11 { flex: 0 0 91.666667%; max-width: 91.666667%; padding: 0 var(--md-spacing-sm); }\n.col.s12 { flex: 0 0 100%; max-width: 100%; padding: 0 var(--md-spacing-sm); }\n\n@media (min-width: 768px) {\n  .col.m1 { flex: 0 0 8.333333%; max-width: 8.333333%; padding: 0 var(--md-spacing-sm); }\n  .col.m2 { flex: 0 0 16.666667%; max-width: 16.666667%; padding: 0 var(--md-spacing-sm); }\n  .col.m3 { flex: 0 0 25%; max-width: 25%; padding: 0 var(--md-spacing-sm); }\n  .col.m4 { flex: 0 0 33.333333%; max-width: 33.333333%; padding: 0 var(--md-spacing-sm); }\n  .col.m5 { flex: 0 0 41.666667%; max-width: 41.666667%; padding: 0 var(--md-spacing-sm); }\n  .col.m6 { flex: 0 0 50%; max-width: 50%; padding: 0 var(--md-spacing-sm); }\n  .col.m7 { flex: 0 0 58.333333%; max-width: 58.333333%; padding: 0 var(--md-spacing-sm); }\n  .col.m8 { flex: 0 0 66.666667%; max-width: 66.666667%; padding: 0 var(--md-spacing-sm); }\n  .col.m9 { flex: 0 0 75%; max-width: 75%; padding: 0 var(--md-spacing-sm); }\n  .col.m10 { flex: 0 0 83.333333%; max-width: 83.333333%; padding: 0 var(--md-spacing-sm); }\n  .col.m11 { flex: 0 0 91.666667%; max-width: 91.666667%; padding: 0 var(--md-spacing-sm); }\n  .col.m12 { flex: 0 0 100%; max-width: 100%; padding: 0 var(--md-spacing-sm); }\n}\n\n@media (min-width: 1024px) {\n  .col.l1 { flex: 0 0 8.333333%; max-width: 8.333333%; padding: 0 var(--md-spacing-sm); }\n  .col.l2 { flex: 0 0 16.666667%; max-width: 16.666667%; padding: 0 var(--md-spacing-sm); }\n  .col.l3 { flex: 0 0 25%; max-width: 25%; padding: 0 var(--md-spacing-sm); }\n  .col.l4 { flex: 0 0 33.333333%; max-width: 33.333333%; padding: 0 var(--md-spacing-sm); }\n  .col.l5 { flex: 0 0 41.666667%; max-width: 41.666667%; padding: 0 var(--md-spacing-sm); }\n  .col.l6 { flex: 0 0 50%; max-width: 50%; padding: 0 var(--md-spacing-sm); }\n  .col.l7 { flex: 0 0 58.333333%; max-width: 58.333333%; padding: 0 var(--md-spacing-sm); }\n  .col.l8 { flex: 0 0 66.666667%; max-width: 66.666667%; padding: 0 var(--md-spacing-sm); }\n  .col.l9 { flex: 0 0 75%; max-width: 75%; padding: 0 var(--md-spacing-sm); }\n  .col.l10 { flex: 0 0 83.333333%; max-width: 83.333333%; padding: 0 var(--md-spacing-sm); }\n  .col.l11 { flex: 0 0 91.666667%; max-width: 91.666667%; padding: 0 var(--md-spacing-sm); }\n  .col.l12 { flex: 0 0 100%; max-width: 100%; padding: 0 var(--md-spacing-sm); }\n}\n\n/* Utility Classes */\n.clear { clear: both; }\n.clear-10 { clear: both; margin-bottom: 10px; }\n.clear-15 { clear: both; margin-bottom: 15px; }\n\n.truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.center-align { text-align: center; }\n.left-align { text-align: left; }\n.right-align { text-align: right; }\n\n.hide { display: none !important; }\n.show { display: block !important; }\n\n/* Material Icons Support */\n.material-icons {\n  font-family: 'Material Icons';\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;\n  line-height: 1;\n  letter-spacing: normal;\n  text-transform: none;\n  display: inline-block;\n  white-space: nowrap;\n  word-wrap: normal;\n  direction: ltr;\n  -webkit-font-feature-settings: 'liga';\n  -webkit-font-smoothing: antialiased;\n}\n\n.material-icons.tiny { font-size: 1rem; }\n.material-icons.small { font-size: 2rem; }\n.material-icons.medium { font-size: 4rem; }\n.material-icons.large { font-size: 6rem; }\n\n.material-icons.left {\n  margin-right: var(--md-spacing-sm);\n  vertical-align: middle;\n}\n\n.material-icons.right {\n  margin-left: var(--md-spacing-sm);\n  vertical-align: middle;\n}\n\n.material-icons.prefix {\n  position: absolute;\n  left: var(--md-spacing-sm);\n  top: 50%;\n  transform: translateY(-50%);\n  color: var(--md-grey-600);\n}\n\n/* Waves Effect Animation */\n@keyframes waves-ripple {\n  0% {\n    transform: scale(0);\n    opacity: 1;\n  }\n  100% {\n    transform: scale(2);\n    opacity: 0;\n  }\n}\n\n.waves-effect {\n  position: relative;\n  overflow: hidden;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n}\n\n.waves-effect:before {\n  content: '';\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  width: 0;\n  height: 0;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.6);\n  transform: translate(-50%, -50%);\n  transition: width var(--md-transition-fast), height var(--md-transition-fast);\n}\n\n.waves-effect:active:before {\n  width: 300px;\n  height: 300px;\n  animation: waves-ripple 0.6s ease-out;\n}\n\n.waves-light:before {\n  background: rgba(255, 255, 255, 0.45);\n}\n\n.waves-teal:before {\n  background: rgba(0, 150, 136, 0.65);\n}\n\n/* ===== BUTTON STYLES ===== */\n.btn,\n.btn-flat,\n.btn-floating,\n.btn-large,\n.btn-small {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--md-spacing-sm) var(--md-spacing-md);\n  margin: var(--md-spacing-xs);\n  border: none;\n  border-radius: var(--md-radius-small);\n  font-family: var(--md-font-family);\n  font-size: 14px;\n  font-weight: var(--md-font-weight-medium);\n  text-decoration: none;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n  cursor: pointer;\n  transition: all var(--md-transition-standard);\n  user-select: none;\n  outline: none;\n  position: relative;\n  overflow: hidden;\n}\n\n/* Raised Button */\n.btn {\n  background-color: var(--md-primary);\n  color: white;\n  box-shadow: var(--md-shadow-1);\n}\n\n.btn:hover {\n  background-color: var(--md-primary-dark);\n  box-shadow: var(--md-shadow-2);\n  transform: translateY(-1px);\n}\n\n.btn:active {\n  box-shadow: var(--md-shadow-3);\n  transform: translateY(0);\n}\n\n.btn:disabled {\n  background-color: var(--md-grey-300);\n  color: var(--md-grey-500);\n  cursor: not-allowed;\n  box-shadow: none;\n  transform: none;\n}\n\n/* Flat Button */\n.btn-flat {\n  background-color: transparent;\n  color: var(--md-primary);\n  box-shadow: none;\n}\n\n.btn-flat:hover {\n  background-color: rgba(33, 150, 243, 0.04);\n  color: var(--md-primary-dark);\n}\n\n.btn-flat:active {\n  background-color: rgba(33, 150, 243, 0.12);\n}\n\n.btn-flat:disabled {\n  background-color: transparent;\n  color: var(--md-grey-400);\n  cursor: not-allowed;\n}\n\n/* Large Button */\n.btn-large {\n  padding: var(--md-spacing-md) var(--md-spacing-lg);\n  font-size: 16px;\n  min-height: 56px;\n}\n\n/* Small Button */\n.btn-small {\n  padding: var(--md-spacing-xs) var(--md-spacing-sm);\n  font-size: 12px;\n  min-height: 32px;\n}\n\n/* Floating Action Button */\n.btn-floating {\n  width: 56px;\n  height: 56px;\n  border-radius: 50%;\n  padding: 0;\n  background-color: var(--md-secondary);\n  color: white;\n  box-shadow: var(--md-shadow-2);\n}\n\n.btn-floating:hover {\n  background-color: var(--md-secondary-dark);\n  box-shadow: var(--md-shadow-3);\n  transform: translateY(-2px);\n}\n\n.btn-floating:active {\n  transform: translateY(0);\n}\n\n.btn-floating.btn-large {\n  width: 72px;\n  height: 72px;\n}\n\n.btn-floating.btn-small {\n  width: 40px;\n  height: 40px;\n}\n\n/* Color Variants */\n.btn.red { background-color: var(--md-error); }\n.btn.red:hover { background-color: #d32f2f; }\n\n.btn.green { background-color: var(--md-success); }\n.btn.green:hover { background-color: #388e3c; }\n\n.btn.orange { background-color: var(--md-warning); }\n.btn.orange:hover { background-color: #f57c00; }\n\n.btn.purple { background-color: #9c27b0; }\n.btn.purple:hover { background-color: #7b1fa2; }\n\n.btn.teal { background-color: #009688; }\n.btn.teal:hover { background-color: #00796b; }\n\n/* Modal Trigger */\n.modal-trigger {\n  cursor: pointer;\n}\n\n/* Tooltip Support */\n.tooltipped {\n  position: relative;\n}\n\n.tooltipped::after {\n  content: attr(data-tooltip);\n  position: absolute;\n  bottom: 120%;\n  left: 50%;\n  transform: translateX(-50%);\n  background-color: var(--md-grey-700);\n  color: white;\n  padding: var(--md-spacing-xs) var(--md-spacing-sm);\n  border-radius: var(--md-radius-small);\n  font-size: 12px;\n  font-weight: var(--md-font-weight-regular);\n  white-space: nowrap;\n  z-index: 1000;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity var(--md-transition-standard), visibility var(--md-transition-standard);\n  pointer-events: none;\n}\n\n.tooltipped::before {\n  content: '';\n  position: absolute;\n  bottom: 110%;\n  left: 50%;\n  transform: translateX(-50%);\n  border: 4px solid transparent;\n  border-top-color: var(--md-grey-700);\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity var(--md-transition-standard), visibility var(--md-transition-standard);\n}\n\n.tooltipped:hover::after,\n.tooltipped:hover::before {\n  opacity: 1;\n  visibility: visible;\n}\n\n/* Position variants for tooltips */\n.tooltipped[data-position=\"bottom\"]::after {\n  top: 120%;\n  bottom: auto;\n}\n\n.tooltipped[data-position=\"bottom\"]::before {\n  top: 110%;\n  bottom: auto;\n  border-top-color: transparent;\n  border-bottom-color: var(--md-grey-700);\n}\n\n.tooltipped[data-position=\"left\"]::after {\n  top: 50%;\n  bottom: auto;\n  left: auto;\n  right: 120%;\n  transform: translateY(-50%);\n}\n\n.tooltipped[data-position=\"left\"]::before {\n  top: 50%;\n  bottom: auto;\n  left: auto;\n  right: 110%;\n  transform: translateY(-50%);\n  border-top-color: transparent;\n  border-left-color: var(--md-grey-700);\n}\n\n.tooltipped[data-position=\"right\"]::after {\n  top: 50%;\n  bottom: auto;\n  right: auto;\n  left: 120%;\n  transform: translateY(-50%);\n}\n\n.tooltipped[data-position=\"right\"]::before {\n  top: 50%;\n  bottom: auto;\n  right: auto;\n  left: 110%;\n  transform: translateY(-50%);\n  border-top-color: transparent;\n  border-right-color: var(--md-grey-700);\n}\n\n/* ===== INPUT STYLES ===== */\n/* Material Design Input Styles - Enhanced CSS-only Implementation */\n\n.input-field {\n  position: relative;\n  margin-bottom: var(--md-spacing-lg);\n  width: 100%;\n}\n\n.input-field input:not([type]),\n.input-field input[type=\"text\"],\n.input-field input[type=\"password\"],\n.input-field input[type=\"email\"],\n.input-field input[type=\"url\"],\n.input-field input[type=\"time\"],\n.input-field input[type=\"date\"],\n.input-field input[type=\"datetime\"],\n.input-field input[type=\"datetime-local\"],\n.input-field input[type=\"tel\"],\n.input-field input[type=\"number\"],\n.input-field input[type=\"search\"],\n.input-field textarea {\n  background-color: transparent;\n  border: none;\n  border-bottom: 1px solid var(--md-grey-400);\n  border-radius: 0;\n  outline: none;\n  height: 3rem;\n  width: 100%;\n  font-size: 16px;\n  font-family: var(--md-font-family);\n  padding: 0;\n  padding-left: 0;\n  box-shadow: none;\n  box-sizing: content-box;\n  transition: border-bottom var(--md-transition-standard), box-shadow var(--md-transition-standard);\n  margin: 0 0 8px 0;\n}\n\n.input-field textarea {\n  height: auto;\n  min-height: 3rem;\n  padding-top: 1rem;\n  resize: vertical;\n}\n\n/* Focused state */\n.input-field input:focus:not([readonly]),\n.input-field textarea:focus:not([readonly]) {\n  border-bottom: 2px solid var(--md-primary);\n  box-shadow: 0 1px 0 0 var(--md-primary);\n}\n\n/* Valid state */\n.input-field input.valid,\n.input-field textarea.valid {\n  border-bottom: 2px solid var(--md-success);\n  box-shadow: 0 1px 0 0 var(--md-success);\n}\n\n/* Invalid state */\n.input-field input.invalid,\n.input-field textarea.invalid {\n  border-bottom: 2px solid var(--md-error);\n  box-shadow: 0 1px 0 0 var(--md-error);\n}\n\n/* Disabled state */\n.input-field input:disabled,\n.input-field textarea:disabled {\n  color: var(--md-grey-500);\n  border-bottom: 1px dotted var(--md-grey-400);\n  cursor: not-allowed;\n}\n\n/* Labels */\n.input-field label {\n  position: absolute;\n  top: 0.8rem;\n  left: 0;\n  font-size: 16px;\n  color: var(--md-grey-600);\n  cursor: text;\n  transition: all var(--md-transition-standard);\n  transform-origin: 0% 100%;\n  text-align: initial;\n  transform: translateY(0);\n  pointer-events: none;\n}\n\n.input-field label.active {\n  font-size: 12px;\n  color: var(--md-primary);\n  transform: translateY(-140%);\n}\n\n.input-field input:focus ~ label,\n.input-field input:valid ~ label,\n.input-field input[value]:not([value=\"\"]) ~ label,\n.input-field textarea:focus ~ label,\n.input-field textarea:valid ~ label,\n.input-field textarea[value]:not([value=\"\"]) ~ label {\n  font-size: 12px;\n  color: var(--md-primary);\n  transform: translateY(-140%);\n}\n\n/* Placeholder */\n.input-field input::placeholder,\n.input-field textarea::placeholder {\n  color: var(--md-grey-500);\n  opacity: 0;\n  transition: opacity var(--md-transition-standard);\n}\n\n.input-field input:focus::placeholder,\n.input-field textarea:focus::placeholder {\n  opacity: 1;\n}\n\n/* Helper text */\n.helper-text {\n  font-size: 12px;\n  color: var(--md-grey-600);\n  margin-top: var(--md-spacing-xs);\n  min-height: 18px;\n}\n\n.helper-text[data-error] {\n  color: var(--md-error);\n}\n\n.helper-text[data-success] {\n  color: var(--md-success);\n}\n\n/* Prefix icons */\n.input-field .prefix {\n  position: absolute;\n  width: 3rem;\n  font-size: 2rem;\n  transition: color var(--md-transition-standard);\n  top: 0.5rem;\n  left: 0;\n  color: var(--md-grey-600);\n}\n\n.input-field .prefix.active {\n  color: var(--md-primary);\n}\n\n.input-field .prefix ~ input,\n.input-field .prefix ~ textarea,\n.input-field .prefix ~ label {\n  margin-left: 3rem;\n  width: calc(100% - 3rem);\n}\n\n/* Color input specific styles */\ninput[type='color']:not(.browser-default) {\n  margin: 0px 0 8px 0;\n  background-color: transparent;\n  border: none;\n  border-bottom: 1px solid var(--md-grey-400);\n  border-radius: 0;\n  outline: none;\n  height: 3rem;\n  width: 100%;\n  font-size: 16px;\n  padding: 0;\n  box-shadow: none;\n  box-sizing: content-box;\n  transition: border-bottom var(--md-transition-standard), box-shadow var(--md-transition-standard);\n}\n\ninput[type='color']:focus:not(.browser-default) {\n  border-bottom: 2px solid var(--md-primary);\n  box-shadow: 0 1px 0 0 var(--md-primary);\n}\n\n/* Range input */\n.range-field {\n  position: relative;\n}\n\n.range-field input[type=\"range\"] {\n  border: none;\n  outline: 0;\n  width: 100%;\n  margin: 15px 0;\n  padding: 0;\n  background: transparent;\n  -webkit-appearance: none;\n}\n\n.range-field input[type=\"range\"]::-webkit-slider-track {\n  height: 3px;\n  background: var(--md-grey-300);\n  border: none;\n  border-radius: 2px;\n}\n\n.range-field input[type=\"range\"]::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  border: none;\n  height: 14px;\n  width: 14px;\n  border-radius: 50%;\n  background: var(--md-primary);\n  margin-top: -5px;\n  cursor: pointer;\n  transition: background var(--md-transition-standard);\n}\n\n.range-field input[type=\"range\"]:focus::-webkit-slider-thumb {\n  background: var(--md-primary-dark);\n  box-shadow: 0 0 0 10px rgba(33, 150, 243, 0.26);\n}\n\n.range-field input[type=\"range\"]::-moz-range-track {\n  height: 3px;\n  background: var(--md-grey-300);\n  border: none;\n  border-radius: 2px;\n}\n\n.range-field input[type=\"range\"]::-moz-range-thumb {\n  border: none;\n  height: 14px;\n  width: 14px;\n  border-radius: 50%;\n  background: var(--md-primary);\n  cursor: pointer;\n  transition: background var(--md-transition-standard);\n}\n\n/* File input */\n.file-field {\n  position: relative;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n}\n\n.file-field .btn {\n  margin-right: var(--md-spacing-md);\n  white-space: nowrap;\n}\n\n.file-field input[type=\"file\"] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  cursor: pointer;\n}\n\n.file-field .file-path-wrapper {\n  flex: 1;\n}\n\n.file-field .file-path {\n  display: block;\n  width: 100%;\n}\n\n/* Options and mandatory indicators */\n.input-field.options > label {\n  top: -2.5rem;\n}\n\nspan.mandatory {\n  margin-left: 5px;\n  color: var(--md-error);\n  font-weight: var(--md-font-weight-bold);\n}\n\n/* Character counter */\n.character-counter {\n  min-height: 18px;\n  font-size: 12px;\n  color: var(--md-grey-600);\n  text-align: right;\n  margin-top: var(--md-spacing-xs);\n}\n\n/* Validation states */\n.input-field input.validate:focus.valid ~ label,\n.input-field textarea.validate:focus.valid ~ label {\n  color: var(--md-success);\n}\n\n.input-field input.validate:focus.invalid ~ label,\n.input-field textarea.validate:focus.invalid ~ label {\n  color: var(--md-error);\n}\n\n/* Autocomplete styles */\n.autocomplete-content {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  background: white;\n  box-shadow: var(--md-shadow-2);\n  border-radius: 0 0 var(--md-radius-small) var(--md-radius-small);\n  max-height: 200px;\n  overflow-y: auto;\n  z-index: 1000;\n}\n\n.autocomplete-content li {\n  list-style: none;\n  padding: var(--md-spacing-sm) var(--md-spacing-md);\n  cursor: pointer;\n  border-bottom: 1px solid var(--md-grey-200);\n  transition: background-color var(--md-transition-fast);\n}\n\n.autocomplete-content li:hover,\n.autocomplete-content li.active {\n  background-color: var(--md-grey-100);\n}\n\n.autocomplete-content li:last-child {\n  border-bottom: none;\n}\n\n/* ===== SELECT DROPDOWN STYLES ===== */\n\n/* Select wrapper styling */\n.select-wrapper {\n  position: relative;\n}\n\n.select-wrapper.input-field {\n  margin-bottom: var(--md-spacing-lg);\n  position: relative;\n  width: 100%;\n}\n\n/* Hide native select appearance */\n.select-wrapper select {\n  appearance: none;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  background: transparent;\n  border: none;\n  border-bottom: 1px solid var(--md-grey-400);\n  border-radius: 0;\n  box-shadow: none;\n  box-sizing: content-box;\n  color: var(--md-grey-800);\n  cursor: pointer;\n  font-family: var(--md-font-family);\n  font-size: 16px;\n  height: 3rem;\n  line-height: 3rem;\n  margin: 0 0 8px 0;\n  outline: none;\n  padding: 0;\n  transition: border-bottom var(--md-transition-standard), box-shadow var(--md-transition-standard);\n  width: 100%;\n}\n\n.select-wrapper select:focus:not([readonly]) {\n  border-bottom: 2px solid var(--md-primary);\n  box-shadow: 0 1px 0 0 var(--md-primary);\n}\n\n.select-wrapper select:disabled {\n  border-bottom: 1px dotted var(--md-grey-400);\n  color: var(--md-grey-500);\n  cursor: not-allowed;\n}\n\n/* Select dropdown arrow */\n.select-wrapper::after {\n  content: '▼';\n  position: absolute;\n  top: 0.75rem;\n  right: 0;\n  font-size: 12px;\n  color: var(--md-grey-600);\n  pointer-events: none;\n  transition: transform var(--md-transition-standard);\n}\n\n.select-wrapper select:focus ~ .select-wrapper::after,\n.select-wrapper.focused::after {\n  transform: rotate(180deg);\n}\n\n/* Custom dropdown implementation */\n.select-dropdown {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  background: #fff;\n  box-shadow: var(--md-shadow-2);\n  border-radius: var(--md-radius-small);\n  max-height: 300px;\n  overflow-y: auto;\n  z-index: 1000;\n  opacity: 0;\n  visibility: hidden;\n  transform: translateY(-10px);\n  transition: all var(--md-transition-standard);\n}\n\n.select-dropdown.active {\n  opacity: 1;\n  visibility: visible;\n  transform: translateY(0);\n}\n\n.select-dropdown-option {\n  display: flex;\n  align-items: center;\n  padding: var(--md-spacing-sm) var(--md-spacing-md);\n  cursor: pointer;\n  transition: background-color var(--md-transition-fast);\n  border-bottom: 1px solid var(--md-grey-200);\n  min-height: 48px;\n}\n\n.select-dropdown-option:hover,\n.select-dropdown-option.selected {\n  background-color: var(--md-grey-100);\n}\n\n.select-dropdown-option.disabled {\n  color: var(--md-grey-500);\n  cursor: not-allowed;\n  opacity: 0.6;\n}\n\n.select-dropdown-option.disabled:hover {\n  background-color: transparent;\n}\n\n.select-dropdown-option:last-child {\n  border-bottom: none;\n}\n\n.select-dropdown-option-img {\n  width: 32px;\n  height: 32px;\n  border-radius: 50%;\n  margin-right: var(--md-spacing-sm);\n  object-fit: cover;\n}\n\n.select-dropdown-option-icon {\n  margin-right: var(--md-spacing-sm);\n  font-size: 18px;\n  color: var(--md-grey-600);\n}\n\n.select-dropdown-option-text {\n  flex: 1;\n}\n\n.select-dropdown-optgroup {\n  padding: var(--md-spacing-xs) var(--md-spacing-md);\n  font-size: 12px;\n  font-weight: var(--md-font-weight-medium);\n  color: var(--md-grey-600);\n  background-color: var(--md-grey-50);\n  border-bottom: 1px solid var(--md-grey-200);\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n\n/* Multiple select support */\n.select-dropdown-option-checkbox {\n  margin-right: var(--md-spacing-sm);\n  transform: scale(0.8);\n}\n\n/* Multiple select tags */\n.select-tags {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: var(--md-spacing-xs);\n  min-height: 2rem;\n  padding: var(--md-spacing-xs) 0;\n}\n\n.select-tag {\n  display: inline-flex;\n  align-items: center;\n  background-color: var(--md-grey-200);\n  border-radius: var(--md-radius-small);\n  padding: var(--md-spacing-xs) var(--md-spacing-sm);\n  font-size: 12px;\n  color: var(--md-grey-800);\n}\n\n.select-tag-close {\n  margin-left: var(--md-spacing-xs);\n  cursor: pointer;\n  color: var(--md-grey-600);\n  transition: color var(--md-transition-fast);\n}\n\n.select-tag-close:hover {\n  color: var(--md-error);\n}\n\n/* Select with icon prefix */\n.select-wrapper .prefix {\n  color: var(--md-grey-600);\n  font-size: 2rem;\n  position: absolute;\n  left: 0;\n  top: 0.5rem;\n  width: 3rem;\n  transition: color var(--md-transition-standard);\n}\n\n.select-wrapper .prefix.active {\n  color: var(--md-primary);\n}\n\n.select-wrapper .prefix ~ select,\n.select-wrapper .prefix ~ .select-tags,\n.select-wrapper .prefix ~ label {\n  margin-left: 3rem;\n  width: calc(100% - 3rem);\n}\n\n.select-wrapper .prefix ~ .select-dropdown {\n  left: 3rem;\n  right: 0;\n  width: calc(100% - 3rem);\n}\n\n/* Label animations for select */\n.select-wrapper label {\n  color: var(--md-grey-600);\n  cursor: text;\n  font-size: 16px;\n  position: absolute;\n  left: 0;\n  top: 0.8rem;\n  transform: translateY(0);\n  transform-origin: 0% 100%;\n  transition: all var(--md-transition-standard);\n  pointer-events: none;\n  text-align: initial;\n}\n\n.select-wrapper label.active,\n.select-wrapper.has-value label {\n  color: var(--md-primary);\n  font-size: 12px;\n  transform: translateY(-140%);\n}\n\n.select-wrapper select:focus ~ label {\n  color: var(--md-primary);\n  font-size: 12px;\n  transform: translateY(-140%);\n}\n\n/* Clear utility */\n.twist {\n  transform: scaleY(-1);\n}\n\n/* ===== SWITCH STYLES ===== */\nlabel+.switch {\n  margin-top: 1rem;\n}\n\n/* ===== MODAL STYLES ===== */\n/* Modal backdrop overlay */\n.modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 1000;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity var(--md-transition-standard), visibility var(--md-transition-standard);\n}\n\n.modal-overlay.active {\n  opacity: 1;\n  visibility: visible;\n}\n\n/* Modal container */\n.modal {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%) scale(0.8);\n  background: white;\n  border-radius: var(--md-radius-small);\n  box-shadow: var(--md-shadow-4);\n  max-width: 90vw;\n  max-height: 90vh;\n  width: 600px;\n  z-index: 1001;\n  opacity: 0;\n  visibility: hidden;\n  transition: all var(--md-transition-standard);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n\n.modal.active {\n  opacity: 1;\n  visibility: visible;\n  transform: translate(-50%, -50%) scale(1);\n}\n\n/* Modal content */\n.modal-content {\n  padding: var(--md-spacing-lg);\n  flex: 1;\n  overflow-y: auto;\n}\n\n.modal-content h1,\n.modal-content h2,\n.modal-content h3,\n.modal-content h4,\n.modal-content h5,\n.modal-content h6 {\n  margin-top: 0;\n  margin-bottom: var(--md-spacing-md);\n  color: var(--md-grey-800);\n}\n\n.modal-content p {\n  margin-bottom: var(--md-spacing-md);\n  line-height: 1.6;\n  color: var(--md-grey-700);\n}\n\n.modal-content p:last-child {\n  margin-bottom: 0;\n}\n\n/* Modal footer */\n.modal-footer {\n  padding: var(--md-spacing-sm) var(--md-spacing-lg);\n  background-color: var(--md-grey-50);\n  border-top: 1px solid var(--md-grey-200);\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: var(--md-spacing-sm);\n  flex-shrink: 0;\n}\n\n/* Fixed footer variant */\n.modal.modal-fixed-footer {\n  height: 70vh;\n}\n\n.modal.modal-fixed-footer .modal-content {\n  height: calc(100% - 60px);\n  overflow-y: auto;\n}\n\n.modal.modal-fixed-footer .modal-footer {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n\n/* Bottom sheet variant */\n.modal.bottom-sheet {\n  top: auto;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  width: 100%;\n  max-width: none;\n  max-height: 80vh;\n  border-radius: var(--md-radius-medium) var(--md-radius-medium) 0 0;\n  transform: translateY(100%);\n}\n\n.modal.bottom-sheet.active {\n  transform: translateY(0);\n}\n\n/* Close button */\n.modal-close {\n  cursor: pointer;\n}\n\n/* ===== EXISTING STYLES (preserving original styles) ===== */\n.codeblock {\n  margin: 1.5rem 0 2.5rem 0;\n}\n.codeblock > div {\n  margin-bottom: 1rem;\n}\n.codeblock > label {\n  display: inline-block;\n}\n\n.map-editor .input-field .prefix ~ .collection {\n  margin-left: 3rem;\n  width: 92%;\n  width: calc(100% - 3rem);\n}\n\n.map-editor .active .checkbox-in-collection label > input[type='checkbox']:checked + span:before {\n  -webkit-backface-visibility: hidden;\n  border-color: transparent #fff #fff transparent;\n  border-style: solid;\n  border-width: 2px;\n  height: 22px;\n  left: -3px;\n  top: -4px;\n  transform: rotate(40deg);\n  transform-origin: 100% 100%;\n  width: 12px;\n}\n\n.mm_timeline {\n  list-style: none;\n  margin: 30px 0 0;\n  padding: 0;\n  position: relative;\n}\n\n.mm_timeline:before {\n  background: #afdcf8;\n  bottom: 0;\n  content: \"\";\n  left: 20%;\n  margin-left: -10px;\n  position: absolute;\n  top: 0;\n  width: 10px;\n}\n\n.mm_timeline > li .mm_time {\n  display: block;\n  padding-right: 100px;\n  position: absolute;\n  width: 25%;\n}\n\n.mm_timeline > li .mm_time span {\n  display: block;\n  text-align: right;\n}\n\n.mm_timeline > li .mm_time span:first-child {\n  color: #bdd0db;\n  font-size: 0.9em;\n}\n\n.mm_timeline > li .mm_time span:last-child {\n  color: #3594cb;\n  font-size: 1.4em;\n}\n\n.mm_timeline > li:nth-child(odd) .mm_time span:last-child {\n  color: #6cbfee;\n}\n\n.mm_timeline > li.active:nth-child(2n) .mm_time span:last-child,\n.mm_timeline > li.active:nth-child(odd) .mm_time span:last-child {\n  color: #060558;\n}\n\n.mm_timeline > li .mm_label {\n  background: #3594cb;\n  border-radius: 5px;\n  color: #fff;\n  font-size: 1.2em;\n  font-weight: 300;\n  line-height: 1.4;\n  margin: 0 0 15px 28%;\n  padding: 0.6em 1em;\n  position: relative;\n}\n\n.mm_timeline > li.active .mm_label {\n  border: 4px solid #060558;\n}\n\n.mm_timeline > li:nth-child(odd) .mm_label {\n  background: #6cbfee;\n}\n\n.mm_timeline > li .mm_label h5 {\n  border-bottom: 1px solid hsla(0, 0%, 100%, 0.4);\n  margin-top: 0;\n  padding: 0 0 10px;\n}\n\n.mm_timeline > li .mm_label:after {\n  border: 10px solid transparent;\n  border-right-color: #3594cb;\n  content: \" \";\n  height: 0;\n  pointer-events: none;\n  position: absolute;\n  right: 100%;\n  top: 10px;\n  width: 0;\n}\n\n.mm_timeline > li:nth-child(2n).active .mm_label:after,\n.mm_timeline > li:nth-child(odd).active .mm_label:after {\n  border-right-color: #060558;\n}\n\n.mm_timeline > li:nth-child(odd) .mm_label:after {\n  border-right-color: #6cbfee;\n}\n\n.mm_timeline > li .mm_icon {\n  -webkit-font-smoothing: antialiased;\n  background: #46a4da;\n  border-radius: 50%;\n  box-shadow: 0 0 0 8px #afdcf8;\n  color: #fff;\n  font-size: 1.4em;\n  font-style: normal;\n  font-variant: normal;\n  font-weight: 400;\n  height: 40px;\n  left: 20%;\n  line-height: 40px;\n  margin: 0 0 0 -25px;\n  position: absolute;\n  text-align: center;\n  text-transform: none;\n  width: 40px;\n}\n\n.mm_timeline > li.active .mm_icon {\n  background: #060558;\n}\n\n.mm_icon > .material-icons {\n  line-height: 3rem;\n}\n\n@media screen and (max-width: 65.375em) {\n  .mm_timeline > li .mm_time span:last-child {\n    font-size: 1.5em;\n  }\n}\n\n@media screen and (max-width: 47.2em) {\n  .mm_timeline:before {\n    display: none;\n  }\n  .mm_timeline > li .mm_time {\n    padding: 0 0 20px;\n    position: relative;\n    width: 100%;\n  }\n  .mm_timeline > li .mm_time span {\n    text-align: left;\n  }\n  .mm_timeline > li .mm_label {\n    font-size: 95%;\n    font-weight: 400;\n    margin: 0 0 30px;\n    padding: 1em;\n  }\n  .mm_timeline > li .mm_label:after {\n    border-bottom-color: #3594cb;\n    border-right-color: transparent;\n    left: 20px;\n    right: auto;\n    top: -20px;\n  }\n  .mm_timeline > li:nth-child(odd) .mm_label:after {\n    border-bottom-color: #6cbfee;\n    border-right-color: transparent;\n  }\n  .mm_timeline > li .mm_icon {\n    float: right;\n    left: auto;\n    margin: -55px 5px 0 0;\n    position: relative;\n  }\n}\n\n/* ===== CHIPS STYLES ===== */\n/* Chips Styles - Material Design Implementation */\n\n/* Main chips container */\n.chips {\n  position: relative;\n  margin-bottom: var(--md-spacing-lg);\n  width: 100%;\n}\n\n.chips-container {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  min-height: 48px;\n  border-bottom: 1px solid var(--md-grey-400);\n  transition: border-bottom var(--md-transition-standard);\n  gap: var(--md-spacing-xs);\n  padding: var(--md-spacing-xs) 0;\n}\n\n.chips-container.focused {\n  border-bottom: 2px solid var(--md-primary);\n}\n\n/* Individual chip styling */\n.chip {\n  display: inline-flex;\n  align-items: center;\n  background-color: var(--md-grey-200);\n  border-radius: 16px;\n  padding: 0 12px;\n  height: 32px;\n  font-size: 13px;\n  color: var(--md-grey-800);\n  margin: 2px;\n  transition: all var(--md-transition-fast);\n  cursor: default;\n  position: relative;\n}\n\n.chip.selected {\n  background-color: var(--md-primary);\n  color: white;\n}\n\n.chip img {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  margin-right: var(--md-spacing-xs);\n  margin-left: -4px;\n}\n\n.chip .close {\n  font-size: 18px;\n  margin-left: var(--md-spacing-xs);\n  cursor: pointer;\n  color: var(--md-grey-600);\n  transition: color var(--md-transition-fast);\n  line-height: 1;\n}\n\n.chip .close:hover {\n  color: var(--md-error);\n}\n\n.chip.selected .close {\n  color: rgba(255, 255, 255, 0.8);\n}\n\n.chip.selected .close:hover {\n  color: white;\n}\n\n/* Chips input field */\n.chips-input {\n  border: none;\n  outline: none;\n  background: transparent;\n  font-size: 16px;\n  color: var(--md-grey-800);\n  flex: 1;\n  min-width: 120px;\n  height: 32px;\n  margin: 2px;\n  padding: 0;\n  font-family: var(--md-font-family);\n}\n\n.chips-input::placeholder {\n  color: var(--md-grey-500);\n}\n\n/* Label positioning for chips */\n.input-field .chips ~ label {\n  position: absolute;\n  top: 0.8rem;\n  left: 0;\n  font-size: 16px;\n  color: var(--md-grey-600);\n  cursor: text;\n  transition: all var(--md-transition-standard);\n  transform-origin: 0% 100%;\n  text-align: initial;\n  transform: translateY(0);\n  pointer-events: none;\n}\n\n.input-field .chips ~ label.active {\n  font-size: 12px;\n  color: var(--md-primary);\n  transform: translateY(-140%);\n}\n\n/* Remove double horizontal line by ensuring no border-bottom on input */\n.input-field .chips .chips-input {\n  border-bottom: none !important;\n  box-shadow: none !important;\n}\n\n/* Autocomplete dropdown for chips */\n.chips .autocomplete-content {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  right: 0;\n  background: white;\n  box-shadow: var(--md-shadow-2);\n  border-radius: var(--md-radius-small);\n  max-height: 200px;\n  overflow-y: auto;\n  z-index: 1000;\n  margin-top: 4px;\n}\n\n.chips .autocomplete-content li {\n  list-style: none;\n  padding: var(--md-spacing-sm) var(--md-spacing-md);\n  cursor: pointer;\n  border-bottom: 1px solid var(--md-grey-200);\n  transition: background-color var(--md-transition-fast);\n}\n\n.chips .autocomplete-content li:hover,\n.chips .autocomplete-content li.selected {\n  background-color: var(--md-grey-100);\n}\n\n.chips .autocomplete-content li:last-child {\n  border-bottom: none;\n}\n\n.chips .autocomplete-item-image {\n  width: 24px;\n  height: 24px;\n  border-radius: 50%;\n  margin-right: var(--md-spacing-sm);\n  vertical-align: middle;\n}\n\n/* Ensure proper spacing when there are multiple chips */\n.chips-container:not(.chips-placeholder) {\n  padding-top: var(--md-spacing-sm);\n}\n\n/* Fix label positioning when there are chips */\n.input-field:has(.chips-container:not(:empty)) label,\n.input-field .chips:not(:empty) ~ label {\n  font-size: 12px;\n  color: var(--md-primary);\n  transform: translateY(-140%);\n}\n\n/* Fallback for browsers that don't support :has() */\n.input-field .chips.chips-initial:not(.chips-placeholder) ~ label {\n  font-size: 12px;\n  color: var(--md-primary);\n  transform: translateY(-140%);\n}\n\n/* ===== COLLAPSIBLE STYLES ===== */\n/* Collapsible/Accordion Styles - Material Design Implementation */\n\n.collapsible {\n  border: none;\n  box-shadow: var(--md-shadow-1);\n  border-radius: var(--md-radius-small);\n  margin: var(--md-spacing-sm) 0 var(--md-spacing-lg) 0;\n  padding: 0;\n  width: 100%; /* Ensure full width by default */\n  list-style-type: none;\n  overflow: hidden;\n}\n\n.collapsible li {\n  position: relative;\n  border-bottom: 1px solid var(--md-grey-200);\n  margin: 0;\n  padding: 0;\n}\n\n.collapsible li:last-child {\n  border-bottom: none;\n}\n\n.collapsible-header {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  min-height: 48px;\n  padding: var(--md-spacing-md) var(--md-spacing-lg);\n  background-color: #fff;\n  border-bottom: 1px solid var(--md-grey-200);\n  cursor: pointer;\n  transition: background-color var(--md-transition-standard);\n  user-select: none;\n}\n\n.collapsible li.active .collapsible-header {\n  background-color: var(--md-grey-50);\n}\n\n.collapsible-header:hover {\n  background-color: var(--md-grey-50);\n}\n\n/* Removed dropdown arrow styling */\n\n.collapsible-header i.material-icons {\n  margin-right: var(--md-spacing-md);\n  color: var(--md-grey-600);\n  font-size: 24px;\n}\n\n.collapsible li.active .collapsible-header i.material-icons {\n  color: var(--md-primary);\n}\n\n.collapsible-body {\n  position: relative;\n  background-color: #fff;\n  padding: 0;\n  max-height: 0;\n  overflow: hidden;\n  transition: all var(--md-transition-standard);\n  border-bottom: 1px solid var(--md-grey-200);\n}\n\n.collapsible li.active .collapsible-body {\n  max-height: 1000px; /* Large enough for most content */\n  padding: var(--md-spacing-lg);\n  border-bottom: none;\n}\n\n.collapsible-body p {\n  margin: 0 0 var(--md-spacing-md) 0;\n  line-height: 1.6;\n  color: var(--md-grey-700);\n}\n\n.collapsible-body p:last-child {\n  margin-bottom: 0;\n}\n\n/* Focus styles for accessibility */\n.collapsible-header:focus {\n  outline: 2px solid var(--md-primary);\n  outline-offset: 2px;\n}\n\n.collapsible-header:focus:not(:focus-visible) {\n  outline: none;\n}\n\n/* ===== FLOATING ACTION BUTTON STYLES ===== */\n/* Floating Action Button - Pure CSS Implementation */\n\n.fixed-action-btn {\n  position: fixed;\n  right: 23px;\n  bottom: 23px;\n  z-index: 1000;\n}\n\n.fixed-action-btn.direction-left {\n  right: auto;\n  left: 23px;\n}\n\n.fixed-action-btn.direction-top {\n  bottom: auto;\n  top: 23px;\n}\n\n.fixed-action-btn.direction-bottom {\n  /* Default positioning */\n}\n\n.fixed-action-btn.direction-right {\n  /* Default positioning */\n}\n\n/* Main FAB button */\n.fixed-action-btn > a.btn-floating {\n  display: block;\n  position: relative;\n  z-index: 1001;\n}\n\n/* FAB button list */\n.fixed-action-btn ul {\n  position: absolute;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  left: 0;\n  right: 0;\n  text-align: center;\n  z-index: 1000;\n  pointer-events: none;\n}\n\n.fixed-action-btn ul li {\n  margin-bottom: 15px;\n  transition: all 0.3s ease;\n  pointer-events: auto;\n}\n\n.fixed-action-btn ul li a.btn-floating {\n  display: block;\n  opacity: 0;\n  transform: scale(0.4);\n  transition: all 0.3s ease;\n}\n\n.fixed-action-btn.active ul li a.btn-floating {\n  opacity: 1;\n  transform: scale(1);\n}\n\n/* Direction-specific positioning */\n.fixed-action-btn.direction-top ul {\n  bottom: 64px;\n  top: auto;\n}\n\n.fixed-action-btn.direction-bottom ul {\n  top: 64px;\n  bottom: auto;\n}\n\n.fixed-action-btn.direction-left ul {\n  right: 64px;\n  left: auto;\n  text-align: right;\n}\n\n.fixed-action-btn.direction-left ul li {\n  text-align: right;\n  margin-right: 15px;\n  margin-bottom: 0;\n}\n\n.fixed-action-btn.direction-right ul {\n  left: 64px;\n  right: auto;\n  text-align: left;\n}\n\n.fixed-action-btn.direction-right ul li {\n  text-align: left;\n  margin-left: 15px;\n  margin-bottom: 0;\n}\n\n/* Hover effects for FAB */\n.fixed-action-btn.hover-enabled:hover ul li a.btn-floating {\n  opacity: 1;\n  transform: scale(1);\n}\n\n.fixed-action-btn.hover-enabled:hover > a.btn-floating {\n  transform: rotate(45deg);\n}\n\n/* Inline positioning */\n.fixed-action-btn[style*=\"position: absolute\"] {\n  position: absolute !important;\n}","/* Material Design Input Styles - Enhanced CSS-only Implementation */\n\n.input-field {\n  position: relative;\n  margin-bottom: var(--md-spacing-lg);\n  width: 100%;\n}\n\n.input-field input:not([type]),\n.input-field input[type=\"text\"],\n.input-field input[type=\"password\"],\n.input-field input[type=\"email\"],\n.input-field input[type=\"url\"],\n.input-field input[type=\"time\"],\n.input-field input[type=\"date\"],\n.input-field input[type=\"datetime\"],\n.input-field input[type=\"datetime-local\"],\n.input-field input[type=\"tel\"],\n.input-field input[type=\"number\"],\n.input-field input[type=\"search\"],\n.input-field textarea {\n  background-color: transparent;\n  border: none;\n  border-bottom: 1px solid var(--md-grey-400);\n  border-radius: 0;\n  outline: none;\n  height: 3rem;\n  width: 100%;\n  font-size: 16px;\n  font-family: var(--md-font-family);\n  padding: 0;\n  padding-left: 0;\n  box-shadow: none;\n  box-sizing: content-box;\n  transition: border-bottom var(--md-transition-standard), box-shadow var(--md-transition-standard);\n  margin: 0 0 8px 0;\n}\n\n.input-field textarea {\n  height: auto;\n  min-height: 2rem;\n  padding-top: 0.5rem;\n  resize: vertical;\n}\n\n/* Focused state */\n.input-field input:focus:not([readonly]),\n.input-field textarea:focus:not([readonly]) {\n  border-bottom: 2px solid var(--md-primary);\n  box-shadow: 0 1px 0 0 var(--md-primary);\n}\n\n/* Valid state */\n.input-field input.valid,\n.input-field textarea.valid {\n  border-bottom: 2px solid var(--md-success);\n  box-shadow: 0 1px 0 0 var(--md-success);\n}\n\n/* Invalid state */\n.input-field input.invalid,\n.input-field textarea.invalid {\n  border-bottom: 2px solid var(--md-error);\n  box-shadow: 0 1px 0 0 var(--md-error);\n}\n\n/* Disabled state */\n.input-field input:disabled,\n.input-field textarea:disabled {\n  color: var(--md-grey-500);\n  border-bottom: 1px dotted var(--md-grey-400);\n  cursor: not-allowed;\n}\n\n/* Labels */\n.input-field label {\n  position: absolute;\n  top: 1rem;\n  left: 0;\n  font-size: 16px;\n  color: var(--md-grey-600);\n  cursor: text;\n  transition: all var(--md-transition-standard);\n  transform-origin: 0% 100%;\n  text-align: initial;\n  transform: translateY(0);\n  pointer-events: none;\n}\n\n.input-field label.active {\n  font-size: 12px;\n  color: var(--md-primary);\n  transform: translateY(-150%);\n}\n\n.input-field input:focus ~ label,\n.input-field input:valid ~ label,\n.input-field input[value]:not([value=\"\"]) ~ label,\n.input-field textarea:focus ~ label,\n.input-field textarea:valid ~ label,\n.input-field textarea[value]:not([value=\"\"]) ~ label {\n  font-size: 12px;\n  color: var(--md-primary);\n  transform: translateY(-150%);\n}\n\n/* Placeholder */\n.input-field input::placeholder,\n.input-field textarea::placeholder {\n  color: var(--md-grey-500);\n  opacity: 0;\n  transition: opacity var(--md-transition-standard);\n}\n\n.input-field input:focus::placeholder,\n.input-field textarea:focus::placeholder {\n  opacity: 1;\n}\n\n/* Helper text */\n.helper-text {\n  font-size: 12px;\n  color: var(--md-grey-600);\n  margin-top: 4px;\n  min-height: 18px;\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.helper-text[data-error] {\n  color: var(--md-error);\n}\n\n.helper-text[data-success] {\n  color: var(--md-success);\n}\n\n/* Prefix icons */\n.input-field .prefix {\n  position: absolute;\n  width: 3rem;\n  font-size: 2rem;\n  transition: color var(--md-transition-standard);\n  top: 1rem;\n  left: 0;\n  color: var(--md-grey-600);\n  line-height: 1;\n}\n\n.input-field .prefix.active {\n  color: var(--md-primary);\n}\n\n.input-field .prefix ~ input,\n.input-field .prefix ~ textarea,\n.input-field .prefix ~ label {\n  margin-left: 3rem;\n  width: calc(100% - 3rem);\n}\n\n/* Color input specific styles */\ninput[type='color']:not(.browser-default) {\n  margin: 0px 0 8px 0;\n  background-color: transparent;\n  border: none;\n  border-bottom: 1px solid var(--md-grey-400);\n  border-radius: 0;\n  outline: none;\n  height: 3rem;\n  width: 100%;\n  font-size: 16px;\n  padding: 0;\n  box-shadow: none;\n  box-sizing: content-box;\n  transition: border-bottom var(--md-transition-standard), box-shadow var(--md-transition-standard);\n}\n\n.input-field input[type='color'] ~ label.active {\n  transform: translateY(-180%);\n}\n\ninput[type='color']:focus:not(.browser-default) {\n  border-bottom: 2px solid var(--md-primary);\n  box-shadow: 0 1px 0 0 var(--md-primary);\n}\n\n/* Range input */\n.range-field {\n  position: relative;\n}\n\n.range-field input[type=\"range\"] {\n  border: none;\n  outline: 0;\n  width: 100%;\n  margin: 15px 0;\n  padding: 0;\n  background: transparent;\n  -webkit-appearance: none;\n}\n\n.range-field input[type=\"range\"]::-webkit-slider-track {\n  height: 3px;\n  background: var(--md-grey-300);\n  border: none;\n  border-radius: 2px;\n}\n\n.range-field input[type=\"range\"]::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  border: none;\n  height: 14px;\n  width: 14px;\n  border-radius: 50%;\n  background: var(--md-primary);\n  margin-top: -5px;\n  cursor: pointer;\n  transition: background var(--md-transition-standard);\n  position: relative;\n}\n\n.range-field input[type=\"range\"] {\n  background: linear-gradient(to right, var(--md-primary) 0%, var(--md-primary) var(--range-progress, 0%), var(--md-grey-300) var(--range-progress, 0%), var(--md-grey-300) 100%);\n}\n\n.range-field input[type=\"range\"]:focus::-webkit-slider-thumb {\n  background: var(--md-primary-dark);\n  box-shadow: 0 0 0 10px rgba(33, 150, 243, 0.26);\n}\n\n.range-field input[type=\"range\"]::-moz-range-track {\n  height: 3px;\n  background: var(--md-grey-300);\n  border: none;\n  border-radius: 2px;\n}\n\n.range-field input[type=\"range\"]::-moz-range-thumb {\n  border: none;\n  height: 14px;\n  width: 14px;\n  border-radius: 50%;\n  background: var(--md-primary);\n  cursor: pointer;\n  transition: background var(--md-transition-standard);\n}\n\n/* File input */\n.file-field {\n  position: relative;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n}\n\n.file-field .btn {\n  margin-right: var(--md-spacing-md);\n  white-space: nowrap;\n}\n\n.file-field input[type=\"file\"] {\n  position: absolute;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  cursor: pointer;\n}\n\n.file-field .file-path-wrapper {\n  flex: 1;\n}\n\n.file-field .file-path {\n  display: block;\n  width: 100%;\n}\n\n/* Options and mandatory indicators */\n.input-field.options > label {\n  top: -2.5rem;\n}\n\nspan.mandatory {\n  margin-left: 5px;\n  color: var(--md-error);\n  font-weight: var(--md-font-weight-bold);\n}\n\n/* Character counter */\n.character-counter {\n  min-height: 18px;\n  font-size: 12px;\n  color: var(--md-grey-600);\n  text-align: right;\n  margin-top: var(--md-spacing-xs);\n}\n\n/* Validation states */\n.input-field input.validate:focus.valid ~ label,\n.input-field textarea.validate:focus.valid ~ label {\n  color: var(--md-success);\n}\n\n.input-field input.validate:focus.invalid ~ label,\n.input-field textarea.validate:focus.invalid ~ label {\n  color: var(--md-error);\n}\n\n/* Autocomplete styles */\n.autocomplete-content {\n  position: absolute;\n  top: calc(100% + 8px);\n  left: 0;\n  right: 0;\n  background: white;\n  box-shadow: var(--md-shadow-2);\n  border-radius: var(--md-radius-small);\n  max-height: 200px;\n  overflow-y: auto;\n  z-index: 1000;\n  margin-top: 0;\n}\n\n.autocomplete-content li {\n  list-style: none;\n  padding: var(--md-spacing-sm) var(--md-spacing-md);\n  cursor: pointer;\n  border-bottom: 1px solid var(--md-grey-200);\n  transition: background-color var(--md-transition-fast);\n}\n\n.autocomplete-content li:hover,\n.autocomplete-content li.active {\n  background-color: var(--md-grey-100);\n}\n\n.autocomplete-content li:last-child {\n  border-bottom: none;\n}\n\n/* Clear utility */\n.twist {\n  transform: scaleY(-1);\n}\n\n.clear,\n.clear-10,\n.clear-15 {\n  clear: both;\n}\n\n.clear-10 {\n  margin-bottom: 10px;\n}\n\n.clear-15 {\n  margin-bottom: 15px;\n}",".codeblock {\n  margin: 1.5rem 0 2.5rem 0;\n}\n.codeblock > div {\n  margin-bottom: 1rem;\n}\n.codeblock > label {\n  display: inline-block;\n}\n",".map-editor .input-field .prefix ~ .collection {\n  margin-left: 3rem;\n  width: 92%;\n  width: calc(100% - 3rem);\n}\n/* For truthy values, the checkbox is not visible when the item is selected, so make it white */\n.map-editor .active .checkbox-in-collection label > input[type='checkbox']:checked + span:before {\n  top: -4px;\n  left: -3px;\n  width: 12px;\n  height: 22px;\n  border-top: 2px solid transparent;\n  border-left: 2px solid transparent;\n  border-right: 2px solid white; /* You need to change the colour here */\n  border-bottom: 2px solid white; /* And here */\n  -webkit-transform: rotate(40deg);\n  -moz-transform: rotate(40deg);\n  -ms-transform: rotate(40deg);\n  -o-transform: rotate(40deg);\n  transform: rotate(40deg);\n  -webkit-backface-visibility: hidden;\n  -webkit-transform-origin: 100% 100%;\n  -moz-transform-origin: 100% 100%;\n  -ms-transform-origin: 100% 100%;\n  -o-transform-origin: 100% 100%;\n  transform-origin: 100% 100%;\n}\n","/* Material Design Modal Styles - CSS Only Implementation */\n\n/* Modal backdrop overlay */\n.modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 1000;\n  opacity: 0;\n  visibility: hidden;\n  transition: opacity var(--md-transition-standard), visibility var(--md-transition-standard);\n}\n\n.modal-overlay.active {\n  opacity: 1;\n  visibility: visible;\n}\n\n/* Modal container */\n.modal {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%) scale(0.8);\n  background: white;\n  border-radius: var(--md-radius-small);\n  box-shadow: var(--md-shadow-4);\n  max-width: 90vw;\n  max-height: 90vh;\n  width: 600px;\n  z-index: 1001;\n  opacity: 0;\n  visibility: hidden;\n  transition: all var(--md-transition-standard);\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n\n.modal.active {\n  opacity: 1;\n  visibility: visible;\n  transform: translate(-50%, -50%) scale(1);\n}\n\n/* Modal content */\n.modal-content {\n  padding: var(--md-spacing-lg);\n  flex: 1;\n  overflow-y: auto;\n}\n\n.modal-content h1,\n.modal-content h2,\n.modal-content h3,\n.modal-content h4,\n.modal-content h5,\n.modal-content h6 {\n  margin-top: 0;\n  margin-bottom: var(--md-spacing-md);\n  color: var(--md-grey-800);\n}\n\n.modal-content p {\n  margin-bottom: var(--md-spacing-md);\n  line-height: 1.6;\n  color: var(--md-grey-700);\n}\n\n.modal-content p:last-child {\n  margin-bottom: 0;\n}\n\n/* Modal footer */\n.modal-footer {\n  padding: var(--md-spacing-sm) var(--md-spacing-lg);\n  background-color: var(--md-grey-50);\n  border-top: 1px solid var(--md-grey-200);\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  gap: var(--md-spacing-sm);\n  flex-shrink: 0;\n}\n\n/* Fixed footer variant */\n.modal.modal-fixed-footer {\n  height: 70vh;\n}\n\n.modal.modal-fixed-footer .modal-content {\n  height: calc(100% - 60px);\n  overflow-y: auto;\n}\n\n.modal.modal-fixed-footer .modal-footer {\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  right: 0;\n}\n\n/* Bottom sheet variant */\n.modal.bottom-sheet {\n  top: auto;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  width: 100%;\n  max-width: none;\n  max-height: 80vh;\n  border-radius: var(--md-radius-medium) var(--md-radius-medium) 0 0;\n  transform: translateY(100%);\n}\n\n.modal.bottom-sheet.active {\n  transform: translateY(0);\n}\n\n/* Close button */\n.modal-close {\n  cursor: pointer;\n}\n\n/* CSS-only modal trigger using target pseudo-class */\n.modal:target {\n  opacity: 1;\n  visibility: visible;\n  transform: translate(-50%, -50%) scale(1);\n}\n\n.modal:target ~ .modal-overlay {\n  opacity: 1;\n  visibility: visible;\n}\n\n/* Alternative: Checkbox-based modal (more reliable) */\n.modal-checkbox {\n  display: none;\n}\n\n.modal-checkbox:checked ~ .modal-overlay {\n  opacity: 1;\n  visibility: visible;\n}\n\n.modal-checkbox:checked ~ .modal {\n  opacity: 1;\n  visibility: visible;\n  transform: translate(-50%, -50%) scale(1);\n}\n\n.modal-checkbox:checked ~ .modal.bottom-sheet {\n  transform: translateY(0);\n}\n\n/* Modal sizes */\n.modal.modal-small {\n  width: 400px;\n}\n\n.modal.modal-large {\n  width: 800px;\n}\n\n.modal.modal-fullscreen {\n  width: 100vw;\n  height: 100vh;\n  max-width: none;\n  max-height: none;\n  border-radius: 0;\n  top: 0;\n  left: 0;\n  transform: none;\n}\n\n.modal.modal-fullscreen.active {\n  transform: none;\n}\n\n/* Responsive behavior */\n@media (max-width: 768px) {\n  .modal {\n    width: 95vw;\n    max-height: 80vh;\n  }\n  \n  .modal-content {\n    padding: var(--md-spacing-md);\n  }\n  \n  .modal-footer {\n    padding: var(--md-spacing-sm) var(--md-spacing-md);\n    flex-direction: column;\n    gap: var(--md-spacing-xs);\n  }\n  \n  .modal-footer .btn {\n    width: 100%;\n    margin: 0;\n  }\n}\n\n/* Animation classes for JavaScript control */\n.modal-enter {\n  opacity: 0;\n  visibility: visible;\n  transform: translate(-50%, -50%) scale(0.8);\n}\n\n.modal-enter-active {\n  opacity: 1;\n  transform: translate(-50%, -50%) scale(1);\n  transition: all var(--md-transition-standard);\n}\n\n.modal-exit {\n  opacity: 1;\n  transform: translate(-50%, -50%) scale(1);\n}\n\n.modal-exit-active {\n  opacity: 0;\n  transform: translate(-50%, -50%) scale(0.8);\n  transition: all var(--md-transition-standard);\n}\n\n/* Backdrop animation */\n.modal-backdrop-enter {\n  opacity: 0;\n}\n\n.modal-backdrop-enter-active {\n  opacity: 1;\n  transition: opacity var(--md-transition-standard);\n}\n\n.modal-backdrop-exit {\n  opacity: 1;\n}\n\n.modal-backdrop-exit-active {\n  opacity: 0;\n  transition: opacity var(--md-transition-standard);\n}\n\n/* Focus trap for accessibility */\n.modal[aria-hidden=\"false\"] {\n  opacity: 1;\n  visibility: visible;\n  transform: translate(-50%, -50%) scale(1);\n}\n\n.modal[aria-hidden=\"true\"] {\n  opacity: 0;\n  visibility: hidden;\n  transform: translate(-50%, -50%) scale(0.8);\n}\n\n/* High contrast mode support */\n@media (prefers-contrast: high) {\n  .modal {\n    border: 2px solid var(--md-grey-800);\n  }\n  \n  .modal-footer {\n    border-top: 2px solid var(--md-grey-800);\n  }\n}\n\n/* Reduced motion support */\n@media (prefers-reduced-motion: reduce) {\n  .modal,\n  .modal-overlay {\n    transition: none;\n  }\n}",".clear,\n.clear-10,\n.clear-15 {\n  clear: both;\n  /* overflow: hidden; Précaution pour IE 7 */\n}\n.clear-10 {\n  margin-bottom: 10px;\n}\n.clear-15 {\n  margin-bottom: 15px;\n}\nspan.mandatory {\n  margin-left: 5px;\n  color: red;\n}\nlabel + .switch {\n  margin: 1.05rem 0;\n}\n",".mm_timeline {\n  margin: 30px 0 0 0;\n  padding: 0;\n  list-style: none;\n  position: relative;\n}\n\n/* The line */\n.mm_timeline:before {\n  content: '';\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 10px;\n  background: #afdcf8;\n  left: 20%;\n  margin-left: -10px;\n}\n\n/* The date/time */\n.mm_timeline > li .mm_time {\n  display: block;\n  width: 25%;\n  padding-right: 100px;\n  position: absolute;\n}\n\n.mm_timeline > li .mm_time span {\n  display: block;\n  text-align: right;\n}\n\n.mm_timeline > li .mm_time span:first-child {\n  font-size: 0.9em;\n  color: #bdd0db;\n}\n\n.mm_timeline > li .mm_time span:last-child {\n  font-size: 1.4em;\n  color: #3594cb;\n}\n\n.mm_timeline > li:nth-child(odd) .mm_time span:last-child {\n  color: #6cbfee;\n}\n\n/* Active time */\n.mm_timeline > li.active:nth-child(even) .mm_time span:last-child,\n.mm_timeline > li.active:nth-child(odd) .mm_time span:last-child {\n  color: rgb(6, 5, 88);\n}\n\n/* Right content */\n.mm_timeline > li .mm_label {\n  margin: 0 0 15px 28%;\n  background: #3594cb;\n  color: #fff;\n  padding: 0.6em 1em;\n  font-size: 1.2em;\n  font-weight: 300;\n  line-height: 1.4;\n  position: relative;\n  border-radius: 5px;\n}\n\n/* Active label */\n.mm_timeline > li.active .mm_label {\n  border: 4px solid rgb(6, 5, 88);\n}\n\n.mm_timeline > li:nth-child(odd) .mm_label {\n  background: #6cbfee;\n}\n\n.mm_timeline > li .mm_label h5 {\n  margin-top: 0px;\n  padding: 0 0 10px 0;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.4);\n}\n\n/* The triangle */\n.mm_timeline > li .mm_label:after {\n  right: 100%;\n  border: solid transparent;\n  content: ' ';\n  height: 0;\n  width: 0;\n  position: absolute;\n  pointer-events: none;\n  border-right-color: #3594cb;\n  border-width: 10px;\n  top: 10px;\n}\n\n/* Active triangle */\n.mm_timeline > li:nth-child(even).active .mm_label:after,\n.mm_timeline > li:nth-child(odd).active .mm_label:after {\n  border-right-color: rgb(6, 5, 88);\n}\n\n.mm_timeline > li:nth-child(odd) .mm_label:after {\n  border-right-color: #6cbfee;\n}\n\n/* The icons */\n.mm_timeline > li .mm_icon {\n  width: 40px;\n  height: 40px;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  font-size: 1.4em;\n  line-height: 40px;\n  -webkit-font-smoothing: antialiased;\n  position: absolute;\n  color: #fff;\n  background: #46a4da;\n  border-radius: 50%;\n  box-shadow: 0 0 0 8px #afdcf8;\n  text-align: center;\n  left: 20%;\n  /* top: 0; */\n  margin: 0 0 0 -25px;\n}\n\n/* Active icon */\n.mm_timeline > li.active .mm_icon {\n\tbackground: rgb(6, 5, 88);\n}\n\n.mm_icon > .material-icons {\n  line-height: 3rem;\n}\n\n/* Example Media Queries */\n@media screen and (max-width: 65.375em) {\n  .mm_timeline > li .mm_time span:last-child {\n    font-size: 1.5em;\n  }\n}\n\n@media screen and (max-width: 47.2em) {\n  .mm_timeline:before {\n    display: none;\n  }\n\n  .mm_timeline > li .mm_time {\n    width: 100%;\n    position: relative;\n    padding: 0 0 20px 0;\n  }\n\n  .mm_timeline > li .mm_time span {\n    text-align: left;\n  }\n\n  .mm_timeline > li .mm_label {\n    margin: 0 0 30px 0;\n    padding: 1em;\n    font-weight: 400;\n    font-size: 95%;\n  }\n\n  .mm_timeline > li .mm_label:after {\n    right: auto;\n    left: 20px;\n    border-right-color: transparent;\n    border-bottom-color: #3594cb;\n    top: -20px;\n  }\n\n  .mm_timeline > li:nth-child(odd) .mm_label:after {\n    border-right-color: transparent;\n    border-bottom-color: #6cbfee;\n  }\n\n  .mm_timeline > li .mm_icon {\n    position: relative;\n    float: right;\n    left: auto;\n    margin: -55px 5px 0 0px;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 8010:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Vnode = __webpack_require__(1757)

module.exports = function(render, schedule, console) {
	var subscriptions = []
	var pending = false
	var offset = -1

	function sync() {
		for (offset = 0; offset < subscriptions.length; offset += 2) {
			try { render(subscriptions[offset], Vnode(subscriptions[offset + 1]), redraw) }
			catch (e) { console.error(e) }
		}
		offset = -1
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
			throw new TypeError("m.mount expects a component, not a vnode.")
		}

		var index = subscriptions.indexOf(root)
		if (index >= 0) {
			subscriptions.splice(index, 2)
			if (index <= offset) offset -= 2
			render(root, [])
		}

		if (component != null) {
			subscriptions.push(root, component)
			render(root, Vnode(component), redraw)
		}
	}

	return {mount: mount, redraw: redraw}
}


/***/ }),

/***/ 8771:
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 9190:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ButtonPage = void 0;
const tslib_1 = __webpack_require__(5959);
const mithril_materialized_1 = __webpack_require__(7578);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const ButtonPage = () => {
    const onclick = () => alert('Button clicked');
    return {
        view: () => (0, mithril_1.default)('.col.s12', [
            (0, mithril_1.default)('h2.header', 'Buttons'),
            (0, mithril_1.default)('h3.header[id=fab]', 'Floating Action Button (FAB)'),
            (0, mithril_1.default)(mithril_materialized_1.FloatingActionButton, {
                className: 'red',
                iconName: 'mode_edit',
                direction: 'left',
                position: 'inline-right',
                buttons: [
                    { iconName: 'insert_chart', className: 'red', onClick: () => console.log('Insert chart') },
                    { iconName: 'format_quote', className: 'yellow darken-1', onClick: () => console.log('Format quote') },
                    { iconName: 'publish', className: 'green', onClick: () => console.log('Publish') },
                    { iconName: 'attach_file', className: 'blue', onClick: () => console.log('Attach file') },
                ],
            }),
            (0, mithril_1.default)(mithril_materialized_1.FloatingActionButton, {
                className: 'red',
                iconName: 'mode_edit',
                direction: 'left',
                buttons: [
                    { iconName: 'insert_chart', className: 'red', onClick: () => console.log('Insert chart') },
                    { iconName: 'format_quote', className: 'yellow darken-1', onClick: () => console.log('Format quote') },
                    { iconName: 'publish', className: 'green', onClick: () => console.log('Publish') },
                    { iconName: 'attach_file', className: 'blue', onClick: () => console.log('Attach file') },
                ],
            }),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: [
                    `m(FloatingActionButton, {
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
}),`,
                ],
            }),
            (0, mithril_1.default)('h3.header[id=raised]', 'Raised'),
            (0, mithril_1.default)('div', [
                (0, mithril_1.default)(mithril_materialized_1.Button, { label: 'First Button', onclick }),
                (0, mithril_1.default)(mithril_materialized_1.Button, { label: 'Second Button', iconName: 'cloud', onclick }),
                (0, mithril_1.default)(mithril_materialized_1.Button, { label: 'Third Button', iconName: 'cloud', iconClass: 'right', onclick }),
                (0, mithril_1.default)(mithril_materialized_1.Button, {
                    label: 'Fourth Button',
                    iconName: 'cloud',
                    attr: { disabled: true },
                    onclick,
                }),
            ]),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: [
                    `const onclick = () => alert('Button clicked');
m('div', [
  m(Button, { label: 'First Button', onclick }),
  m(Button, { label: 'Second Button', iconName: 'cloud', onclick }),
  m(Button, { label: 'Third Button', iconName: 'cloud', iconClass: 'right', onclick }),
  m(Button, {
    label: 'Fourth Button',
    iconName: 'cloud',
    attr: { disabled: true },
    onclick,
  }),
])`,
                ],
            }),
            (0, mithril_1.default)('h3.header[id=flatbutton]', 'FlatButton'),
            (0, mithril_1.default)('div', (0, mithril_1.default)(mithril_materialized_1.FlatButton, { label: 'My Flat button', onclick })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, { code: 'm(FlatButton, { label: "My Flat button", onclick })' }),
            (0, mithril_1.default)('h3.header[id=roundiconbutton]', 'RoundIconButton'),
            (0, mithril_1.default)('div', (0, mithril_1.default)(mithril_materialized_1.RoundIconButton, { iconName: 'create', onclick })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, { code: 'm(RoundIconButton, { iconName: "create", onclick })' }),
            (0, mithril_1.default)('h3.header[id=submitbutton]', 'SubmitButton'),
            (0, mithril_1.default)('div', (0, mithril_1.default)(mithril_materialized_1.SubmitButton, {
                label: 'Submit',
                iconName: 'send',
                iconClass: 'right',
                onclick,
            })),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `m(SubmitButton, {
  label: 'Submit',
  iconName: 'send',
  iconClass: 'right',
  onclick,
})`,
            }),
        ]),
    };
};
exports.ButtonPage = ButtonPage;


/***/ }),

/***/ 9372:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Vnode = __webpack_require__(1757)
var m = __webpack_require__(3846)

var buildPathname = __webpack_require__(6539)
var parsePathname = __webpack_require__(360)
var compileTemplate = __webpack_require__(9660)
var censor = __webpack_require__(2381)

function decodeURIComponentSave(component) {
	try {
		return decodeURIComponent(component)
	} catch(e) {
		return component
	}
}

module.exports = function($window, mountRedraw) {
	var callAsync = $window == null
		// In case Mithril.js' loaded globally without the DOM, let's not break
		? null
		: typeof $window.setImmediate === "function" ? $window.setImmediate : $window.setTimeout
	var p = Promise.resolve()

	var scheduled = false

	var ready = false
	var hasBeenResolved = false

	var dom, compiled, fallbackRoute

	var currentResolver, component, attrs, currentPath, lastUpdate

	var RouterRoot = {
		onremove: function() {
			ready = hasBeenResolved = false
			$window.removeEventListener("popstate", fireAsync, false)
		},
		view: function() {
			// The route has already been resolved.
			// Therefore, the following early return is not needed.
			// if (!hasBeenResolved) return

			var vnode = Vnode(component, attrs.key, attrs)
			if (currentResolver) return currentResolver.render(vnode)
			// Wrap in a fragment to preserve existing key semantics
			return [vnode]
		},
	}

	var SKIP = route.SKIP = {}

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
			.replace(/(?:%[a-f89][a-f0-9])+/gim, decodeURIComponentSave)
			.slice(route.prefix.length)
		var data = parsePathname(path)

		Object.assign(data.params, $window.history.state)

		function reject(e) {
			console.error(e)
			route.set(fallbackRoute, null, {replace: true})
		}

		loop(0)
		function loop(i) {
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
						if (hasBeenResolved) mountRedraw.redraw()
						else {
							hasBeenResolved = true
							mountRedraw.mount(dom, RouterRoot)
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
						}).then(update, path === fallbackRoute ? null : reject)
					}
					else update(/* "div" */)
					return
				}
			}

			if (path === fallbackRoute) {
				throw new Error("Could not resolve default route " + fallbackRoute + ".")
			}
			route.set(fallbackRoute, null, {replace: true})
		}
	}

	function fireAsync() {
		if (!scheduled) {
			scheduled = true
			// TODO: just do `mountRedraw.redraw()` here and elide the timer
			// dependency. Note that this will muck with tests a *lot*, so it's
			// not as easy of a change as it sounds.
			callAsync(resolveRoute)
		}
	}

	function route(root, defaultRoute, routes) {
		if (!root) throw new TypeError("DOM element being rendered to does not exist.")

		compiled = Object.keys(routes).map(function(route) {
			if (route[0] !== "/") throw new SyntaxError("Routes must start with a '/'.")
			if ((/:([^\/\.-]+)(\.{3})?:/).test(route)) {
				throw new SyntaxError("Route parameter names must be separated with either '/', '.', or '-'.")
			}
			return {
				route: route,
				component: routes[route],
				check: compileTemplate(route),
			}
		})
		fallbackRoute = defaultRoute
		if (defaultRoute != null) {
			var defaultData = parsePathname(defaultRoute)

			if (!compiled.some(function (i) { return i.check(defaultData) })) {
				throw new ReferenceError("Default route doesn't match any known routes.")
			}
		}
		dom = root

		$window.addEventListener("popstate", fireAsync, false)

		ready = true

		// The RouterRoot component is mounted when the route is first resolved.
		resolveRoute()
	}
	route.set = function(path, data, options) {
		if (lastUpdate != null) {
			options = options || {}
			options.replace = true
		}
		lastUpdate = null

		path = buildPathname(path, data)
		if (ready) {
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
	route.get = function() {return currentPath}
	route.prefix = "#!"
	route.Link = {
		view: function(vnode) {
			// Omit the used parameters from the rendered element - they are
			// internal. Also, censor the various lifecycle methods.
			//
			// We don't strip the other parameters because for convenience we
			// let them be specified in the selector as well.
			var child = m(
				vnode.attrs.selector || "a",
				censor(vnode.attrs, ["options", "params", "selector", "onclick"]),
				vnode.children
			)
			var options, onclick, href

			// Let's provide a *right* way to disable a route link, rather than
			// letting people screw up accessibility on accident.
			//
			// The attribute is coerced so users don't get surprised over
			// `disabled: 0` resulting in a button that's somehow routable
			// despite being visibly disabled.
			if (child.attrs.disabled = Boolean(child.attrs.disabled)) {
				child.attrs.href = null
				child.attrs["aria-disabled"] = "true"
				// If you *really* do want add `onclick` on a disabled link, use
				// an `oncreate` hook to add it.
			} else {
				options = vnode.attrs.options
				onclick = vnode.attrs.onclick
				// Easier to build it now to keep it isomorphic.
				href = buildPathname(child.attrs.href, vnode.attrs.params)
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


/***/ }),

/***/ 9555:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
module.exports = __webpack_require__.p + "0c35d18bf06992036b69.woff2";

/***/ }),

/***/ 9563:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var mountRedraw = __webpack_require__(4159)

module.exports = __webpack_require__(9372)(typeof window !== "undefined" ? window : null, mountRedraw)


/***/ }),

/***/ 9618:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.dashboardSvc = exports.Dashboards = void 0;
const tslib_1 = __webpack_require__(5959);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const layout_1 = __webpack_require__(5584);
const home_page_1 = __webpack_require__(267);
const about_page_1 = __webpack_require__(6283);
const button_page_1 = __webpack_require__(9190);
const input_page_1 = __webpack_require__(2830);
const picker_page_1 = __webpack_require__(2622);
const selection_page_1 = __webpack_require__(7142);
const modal_page_1 = __webpack_require__(2548);
const misc_page_1 = __webpack_require__(1437);
const collections_page_1 = __webpack_require__(3803);
const map_editor_page_1 = __webpack_require__(7437);
const timeline_page_1 = __webpack_require__(1067);
var Dashboards;
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
})(Dashboards || (exports.Dashboards = Dashboards = {}));
class DashboardService {
    layout;
    dashboards;
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
        const dashboard = this.dashboards.filter((d) => d.default).shift();
        return dashboard ? dashboard.route : this.dashboards[0].route;
    }
    switchTo(dashboardId, fragment = '') {
        const dashboard = this.dashboards.filter((d) => d.id === dashboardId).shift();
        if (dashboard) {
            mithril_1.default.route.set(dashboard.route);
        }
    }
    get routingTable() {
        return this.dashboards.reduce((p, c) => {
            p[c.route] = { render: () => (0, mithril_1.default)(this.layout, (0, mithril_1.default)(c.component)) };
            return p;
        }, {});
    }
}
exports.dashboardSvc = new DashboardService(layout_1.Layout, [
    {
        id: Dashboards.HOME,
        default: true,
        title: 'HOME',
        icon: 'home',
        route: '/home',
        visible: true,
        component: home_page_1.HomePage,
    },
    {
        id: Dashboards.BUTTONS,
        title: 'BUTTONS',
        icon: 'crop_16_9',
        route: '/buttons',
        visible: true,
        component: button_page_1.ButtonPage,
    },
    {
        id: Dashboards.INPUTS,
        title: 'INPUTS',
        icon: 'create',
        route: '/inputs',
        visible: true,
        component: input_page_1.InputPage,
    },
    {
        id: Dashboards.PICKERS,
        title: 'PICKERS',
        icon: 'access_time',
        route: '/pickers',
        visible: true,
        component: picker_page_1.PickerPage,
    },
    {
        id: Dashboards.SELECTIONS,
        title: 'SELECTIONS',
        icon: 'check',
        route: '/selections',
        visible: true,
        component: selection_page_1.SelectionPage,
    },
    {
        id: Dashboards.MODALS,
        title: 'MODALS',
        icon: 'all_out',
        route: '/modals',
        visible: true,
        component: modal_page_1.ModalPage,
    },
    {
        id: Dashboards.COLLECTIONS,
        title: 'COLLECTIONS',
        icon: 'collections',
        route: '/collections',
        visible: true,
        component: collections_page_1.CollectionsPage,
    },
    {
        id: Dashboards.MAP_EDITOR,
        title: 'MAP-EDITOR',
        icon: 'playlist_add',
        route: '/map_editor',
        visible: true,
        component: map_editor_page_1.MapEditorPage,
    },
    {
        id: Dashboards.TIMELINE,
        title: 'TIMELINE',
        icon: 'timeline',
        route: '/timeline',
        visible: true,
        component: timeline_page_1.TimelinePage,
    },
    {
        id: Dashboards.MISC,
        title: 'MISCELLANEOUS',
        icon: 'image',
        route: '/misc',
        visible: true,
        component: misc_page_1.MiscPage,
    },
    {
        id: Dashboards.ABOUT,
        title: 'ABOUT',
        icon: 'info',
        route: '/about',
        visible: true,
        component: about_page_1.AboutPage,
    },
]);


/***/ }),

/***/ 9660:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var parsePathname = __webpack_require__(360)

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
	) + "\\/?$")
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


/***/ }),

/***/ 9751:
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "https://erikvullings.github.io/mithril-materialized/";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			792: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const tslib_1 = __webpack_require__(5959);
__webpack_require__(4669);
__webpack_require__(7548);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const dashboard_service_1 = __webpack_require__(9618);
document.documentElement.setAttribute('lang', 'en');
mithril_1.default.route(document.body, dashboard_service_1.dashboardSvc.defaultRoute, dashboard_service_1.dashboardSvc.routingTable);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map