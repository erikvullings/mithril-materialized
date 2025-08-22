/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 193:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var Vnode = __webpack_require__(1757)

module.exports = function(html) {
	if (html == null) html = ""
	return Vnode("<", undefined, undefined, html, undefined, undefined)
}


/***/ }),

/***/ 267:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HomePage = void 0;
const tslib_1 = __webpack_require__(5959);
const dashboard_service_1 = __webpack_require__(9618);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const mithril_materialized_1 = __webpack_require__(7578);
const HomePage = () => ({
    view: () => (0, mithril_1.default)('.home-page', [
        (0, mithril_1.default)('.col.s12.m7.l8', (0, mithril_1.default)('.introduction', [
            (0, mithril_1.default)('h2', 'Mithril-Materialized v2.0.0 Beta'),
            (0, mithril_1.default)('.card.blue.lighten-4', [
                (0, mithril_1.default)('.card-content', [
                    (0, mithril_1.default)('span.card-title', '🚀 Major Release - Breaking Changes'),
                    (0, mithril_1.default)('p', [
                        'This is a ',
                        (0, mithril_1.default)('strong', 'major breaking release'),
                        ' that removes all external JavaScript dependencies, making the library completely self-contained and significantly reducing bundle sizes.',
                    ]),
                ]),
            ]),
            (0, mithril_1.default)('p', `I like Mithril, and I also like Material Design. However, depending on large external libraries
          like materialize-css can be problematic with bundle sizes and conflicting dependencies. For that reason,
          mithril-materialized v2.0 provides you with self-contained Mithril components that implement Material Design
          principles without external JavaScript dependencies.`),
            (0, mithril_1.default)('h3', '✨ What\'s New in v2.0.0'),
            (0, mithril_1.default)('ul.collection', [
                (0, mithril_1.default)('li.collection-item', [(0, mithril_1.default)('i.material-icons.tiny', '🔥'), ' Zero external JavaScript dependencies']),
                (0, mithril_1.default)('li.collection-item', [(0, mithril_1.default)('i.material-icons.tiny', '📦'), ' Significantly smaller bundle size']),
                (0, mithril_1.default)('li.collection-item', [(0, mithril_1.default)('i.material-icons.tiny', '🎨'), ' Custom SVG icons (no font dependencies)']),
                (0, mithril_1.default)('li.collection-item', [(0, mithril_1.default)('i.material-icons.tiny', '⚡'), ' Better performance without jQuery']),
                (0, mithril_1.default)('li.collection-item', [(0, mithril_1.default)('i.material-icons.tiny', '🛠️'), ' Enhanced DatePicker and TimePicker components']),
            ]),
            (0, mithril_1.default)('h3', '💥 Breaking Changes from v1.x'),
            (0, mithril_1.default)('ul.collection', [
                (0, mithril_1.default)('li.collection-item', [
                    (0, mithril_1.default)('span.red-text', 'Removed dependencies: '),
                    'No longer requires materialize-css or material-icons packages',
                ]),
                (0, mithril_1.default)('li.collection-item', [
                    (0, mithril_1.default)('span.red-text', 'Simplified installation: '),
                    'Only need to install mithril and mithril-materialized',
                ]),
                (0, mithril_1.default)('li.collection-item', [
                    (0, mithril_1.default)('span.red-text', 'Custom icons: '),
                    'Uses built-in SVG icons instead of Material Icons font',
                ]),
            ]),
            (0, mithril_1.default)('p', [
                'Check out the complete API documentation ',
                (0, mithril_1.default)('a[href="https://erikvullings.github.io/mithril-materialized/typedoc/index.html"]', 'here'),
                '.',
            ]),
            (0, mithril_1.default)('h3', '📦 Installation'),
            (0, mithril_1.default)('p', 'Install the package (much simpler now!):'),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                language: 'console',
                code: `npm install mithril mithril-materialized
# TypeScript types are included`,
            }),
            (0, mithril_1.default)('p', 'Use the components in your application:'),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `import m from 'mithril';
import { TextInput, Button, DatePicker } from 'mithril-materialized';
// Optional: import CSS for Material Design styling
import 'mithril-materialized/index.css';

const MyApp = () => ({
  view: () => m('.container', [
    m(TextInput, {
      label: 'Your name',
      onchange: (value) => console.log(value)
    }),
    m(Button, {
      label: 'Submit',
      onclick: () => alert('Hello!')
    }),
    m(DatePicker, {
      label: 'Select date',
      onchange: (date) => console.log(date)
    })
  ])
});`,
            }),
            (0, mithril_1.default)('h3', '🎨 Styling Options'),
            (0, mithril_1.default)('p', 'The library includes independent CSS styling (no conflicts with other CSS frameworks):'),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `// Import ready-to-use CSS
import 'mithril-materialized/index.css';

// OR use SASS for customization
@import 'mithril-materialized/sass/materialize.scss';`,
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

/***/ 705:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NavigationPage = void 0;
const tslib_1 = __webpack_require__(5959);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const mithril_materialized_1 = __webpack_require__(7578);
const NavigationPage = () => {
    const state = {
        sidenavOpen: false,
        currentWizardStep: 0,
        wizardData: {
            name: '',
            email: '',
            message: ''
        }
    };
    const breadcrumbItems = [
        { text: 'Home', href: '/home', icon: 'home' },
        { text: 'Navigation', href: '/navigation' },
        { text: 'Components', active: true }
    ];
    const wizardSteps = [
        {
            title: 'Personal Information',
            subtitle: 'Enter your basic details',
            icon: 'person',
            vnode: () => (0, mithril_1.default)('div', [
                (0, mithril_1.default)('h4', 'Step 1: Personal Information'),
                (0, mithril_1.default)('p', 'Please provide your name and email address.'),
                (0, mithril_1.default)(mithril_materialized_1.TextInput, {
                    label: 'Full Name',
                    value: state.wizardData.name,
                    onchange: (value) => { state.wizardData.name = value; }
                }),
                (0, mithril_1.default)(mithril_materialized_1.TextInput, {
                    label: 'Email Address',
                    type: 'email',
                    value: state.wizardData.email,
                    onchange: (value) => { state.wizardData.email = value; }
                })
            ]),
            validate: () => {
                return state.wizardData.name.length > 0 &&
                    state.wizardData.email.includes('@');
            }
        },
        {
            title: 'Message',
            subtitle: 'Tell us about yourself',
            icon: 'message',
            optional: true,
            vnode: () => (0, mithril_1.default)('div', [
                (0, mithril_1.default)('h4', 'Step 2: Message (Optional)'),
                (0, mithril_1.default)('p', 'You can optionally provide additional information.'),
                (0, mithril_1.default)(mithril_materialized_1.TextArea, {
                    label: 'Your Message',
                    value: state.wizardData.message,
                    onchange: (value) => { state.wizardData.message = value; }
                })
            ])
        },
        {
            title: 'Review',
            subtitle: 'Confirm your information',
            icon: 'preview',
            vnode: () => (0, mithril_1.default)('div', [
                (0, mithril_1.default)('h4', 'Step 3: Review'),
                (0, mithril_1.default)('p', 'Please review your information before submitting.'),
                (0, mithril_1.default)('.collection', [
                    (0, mithril_1.default)('.collection-item', [
                        (0, mithril_1.default)('strong', 'Name: '),
                        state.wizardData.name || 'Not provided'
                    ]),
                    (0, mithril_1.default)('.collection-item', [
                        (0, mithril_1.default)('strong', 'Email: '),
                        state.wizardData.email || 'Not provided'
                    ]),
                    state.wizardData.message && (0, mithril_1.default)('.collection-item', [
                        (0, mithril_1.default)('strong', 'Message: '),
                        state.wizardData.message
                    ])
                ])
            ])
        }
    ];
    return {
        view: () => (0, mithril_1.default)('.col.s12', [
            (0, mithril_1.default)('h2.header', 'Navigation Components'),
            (0, mithril_1.default)('p', [
                'New navigation components including Sidenav, Breadcrumb, and Wizard/Stepper. ',
                'These components help users navigate through your application and complete multi-step processes.'
            ]),
            // Breadcrumb Example
            (0, mithril_1.default)('h3.header', 'Breadcrumb Navigation'),
            (0, mithril_1.default)('p', 'Shows the user\'s current location within the site hierarchy:'),
            (0, mithril_1.default)('.row', [
                (0, mithril_1.default)('.col.s12', [
                    (0, mithril_1.default)(mithril_materialized_1.Breadcrumb, {
                        items: breadcrumbItems,
                        showHome: true,
                        showIcons: true
                    })
                ])
            ]),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `import { Breadcrumb, createBreadcrumb } from 'mithril-materialized';

// Automatic breadcrumb generation from path
const items = createBreadcrumb('/navigation/components/example');

m(Breadcrumb, {
  items: items,
  showHome: true,      // Show home icon for first item
  showIcons: true,     // Show icons for items that have them
  maxItems: 5,         // Collapse long paths with ellipsis
  separator: 'chevron_right' // Custom separator icon
})`
            }),
            // Sidenav Example
            (0, mithril_1.default)('h3.header', 'Sidenav'),
            (0, mithril_1.default)('p', 'Responsive navigation drawer that slides in from the side:'),
            (0, mithril_1.default)('.row', [
                (0, mithril_1.default)('.col.s12', [
                    (0, mithril_1.default)(mithril_materialized_1.Button, {
                        label: 'Toggle Sidenav',
                        onclick: () => { state.sidenavOpen = !state.sidenavOpen; }
                    }),
                    (0, mithril_1.default)(mithril_materialized_1.Sidenav, {
                        isOpen: state.sidenavOpen,
                        onToggle: (isOpen) => { state.sidenavOpen = isOpen; },
                        position: 'left',
                        mode: 'overlay',
                        width: 300,
                        showBackdrop: true,
                        closeOnBackdropClick: true,
                        closeOnEscape: true
                    }, [
                        (0, mithril_1.default)(mithril_materialized_1.SidenavItem, { text: 'Dashboard', icon: 'dashboard', active: true }),
                        (0, mithril_1.default)(mithril_materialized_1.SidenavItem, { text: 'Profile', icon: 'person' }),
                        (0, mithril_1.default)(mithril_materialized_1.SidenavItem, { text: 'Settings', icon: 'settings' }),
                        (0, mithril_1.default)(mithril_materialized_1.SidenavItem, { divider: true }),
                        (0, mithril_1.default)(mithril_materialized_1.SidenavItem, { subheader: true, text: 'Actions' }),
                        (0, mithril_1.default)(mithril_materialized_1.SidenavItem, { text: 'Help', icon: 'help' }),
                        (0, mithril_1.default)(mithril_materialized_1.SidenavItem, { text: 'Logout', icon: 'exit_to_app' })
                    ])
                ])
            ]),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `import { Sidenav, SidenavItem } from 'mithril-materialized';

m(Sidenav, {
  isOpen: state.sidenavOpen,
  onToggle: (isOpen) => { state.sidenavOpen = isOpen; },
  position: 'left',     // 'left' | 'right'
  mode: 'overlay',      // 'overlay' | 'push'
  width: 300,
  showBackdrop: true,
  closeOnBackdropClick: true,
  closeOnEscape: true
}, [
  m(SidenavItem, { text: 'Dashboard', icon: 'dashboard', active: true }),
  m(SidenavItem, { text: 'Profile', icon: 'person' }),
  m(SidenavItem, { divider: true }),
  m(SidenavItem, { subheader: true, text: 'Actions' }),
  m(SidenavItem, { text: 'Help', icon: 'help' })
])`
            }),
            // Wizard Example
            (0, mithril_1.default)('h3.header', 'Wizard/Stepper'),
            (0, mithril_1.default)('p', 'Multi-step interface for guiding users through complex processes:'),
            (0, mithril_1.default)('.row', [
                (0, mithril_1.default)('.col.s12', [
                    (0, mithril_1.default)(mithril_materialized_1.Wizard, {
                        steps: wizardSteps,
                        currentStep: state.currentWizardStep,
                        onStepChange: (stepIndex) => { state.currentWizardStep = stepIndex; },
                        onComplete: () => {
                            alert('Wizard completed!');
                            console.log('Final data:', state.wizardData);
                        },
                        showStepNumbers: true,
                        linear: true,
                        showNavigation: true,
                        orientation: 'horizontal',
                        allowHeaderNavigation: false,
                        labels: {
                            next: 'Continue',
                            previous: 'Back',
                            complete: 'Submit',
                            skip: 'Skip this step'
                        }
                    })
                ])
            ]),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `import { Wizard } from 'mithril-materialized';

const steps = [
  {
    title: 'Personal Information',
    subtitle: 'Enter your basic details',
    icon: 'person',
    vnode: () => m('div', [/* your form content */]),
    validate: () => {
      return state.name.length > 0 && state.email.includes('@');
    }
  },
  {
    title: 'Message',
    subtitle: 'Tell us about yourself', 
    icon: 'message',
    optional: true,
    vnode: () => m('div', [/* optional step content */])
  },
  {
    title: 'Review',
    subtitle: 'Confirm your information',
    icon: 'preview', 
    vnode: () => m('div', [/* review step content */])
  }
];

m(Wizard, {
  steps: steps,
  currentStep: state.currentStep,
  onStepChange: (stepIndex) => { state.currentStep = stepIndex; },
  onComplete: () => { console.log('Completed!'); },
  showStepNumbers: true,
  linear: true,                    // Must complete steps in order
  orientation: 'horizontal',       // 'horizontal' | 'vertical'
  allowHeaderNavigation: false,    // Click step headers to navigate
  labels: {
    next: 'Continue',
    previous: 'Back', 
    complete: 'Submit',
    skip: 'Skip this step'
  }
})`
            }),
            (0, mithril_1.default)('h3.header', 'Features'),
            (0, mithril_1.default)('ul.collection', [
                (0, mithril_1.default)('li.collection-item', [
                    (0, mithril_1.default)('strong', 'Sidenav'),
                    (0, mithril_1.default)('ul', [
                        (0, mithril_1.default)('li', 'Responsive behavior with overlay and push modes'),
                        (0, mithril_1.default)('li', 'Left or right positioning'),
                        (0, mithril_1.default)('li', 'Backdrop overlay with customizable behavior'),
                        (0, mithril_1.default)('li', 'Keyboard navigation (ESC to close)'),
                        (0, mithril_1.default)('li', 'Flexible content with dividers and subheaders'),
                    ]),
                ]),
                (0, mithril_1.default)('li.collection-item', [
                    (0, mithril_1.default)('strong', 'Breadcrumb'),
                    (0, mithril_1.default)('ul', [
                        (0, mithril_1.default)('li', 'Automatic path generation from URLs'),
                        (0, mithril_1.default)('li', 'Customizable separators and icons'),
                        (0, mithril_1.default)('li', 'Responsive design with text truncation'),
                        (0, mithril_1.default)('li', 'Support for long paths with ellipsis'),
                        (0, mithril_1.default)('li', 'Home icon and custom route mapping'),
                    ]),
                ]),
                (0, mithril_1.default)('li.collection-item', [
                    (0, mithril_1.default)('strong', 'Wizard/Stepper'),
                    (0, mithril_1.default)('ul', [
                        (0, mithril_1.default)('li', 'Linear and non-linear navigation modes'),
                        (0, mithril_1.default)('li', 'Step validation with async support'),
                        (0, mithril_1.default)('li', 'Optional steps that can be skipped'),
                        (0, mithril_1.default)('li', 'Horizontal and vertical orientations'),
                        (0, mithril_1.default)('li', 'Customizable navigation buttons and labels'),
                        (0, mithril_1.default)('li', 'Progress indication with completed/error states'),
                    ]),
                ]),
            ]),
        ]),
    };
};
exports.NavigationPage = NavigationPage;


/***/ }),

/***/ 796:
/***/ ((module) => {



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

/***/ 1092:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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
___CSS_LOADER_EXPORT___.push([module.id, `:root{--mm-primary-color: #26a69a;--mm-primary-color-light: #80cbc4;--mm-primary-color-dark: #00695c;--mm-secondary-color: #ff6f00;--mm-secondary-color-light: #ffa726;--mm-secondary-color-dark: #ef6c00;--mm-background-color: #ffffff;--mm-surface-color: #ffffff;--mm-card-background: #ffffff;--mm-text-primary: rgba(0, 0, 0, 0.87);--mm-text-secondary: rgba(0, 0, 0, 0.6);--mm-text-disabled: rgba(0, 0, 0, 0.38);--mm-text-hint: rgba(0, 0, 0, 0.38);--mm-border-color: rgba(0, 0, 0, 0.12);--mm-divider-color: rgba(0, 0, 0, 0.12);--mm-input-background: #ffffff;--mm-input-border: rgba(0, 0, 0, 0.42);--mm-input-border-focus: var(--mm-primary-color);--mm-input-text: var(--mm-text-primary);--mm-button-background: var(--mm-primary-color);--mm-button-text: #ffffff;--mm-button-flat-text: var(--mm-primary-color);--mm-nav-background: var(--mm-primary-color);--mm-nav-text: #ffffff;--mm-nav-active-text: #ffffff;--mm-modal-background: #ffffff;--mm-overlay-background: rgba(0, 0, 0, 0.5);--mm-shadow-color: rgba(0, 0, 0, 0.16);--mm-chip-bg: #e4e4e4;--mm-chip-text: var(--mm-text-secondary);--mm-dropdown-hover: #eee;--mm-dropdown-focus: #ddd;--mm-dropdown-selected: #e3f2fd;--mm-shadow-umbra: rgba(0, 0, 0, 0.2);--mm-shadow-penumbra: rgba(0, 0, 0, 0.14);--mm-shadow-ambient: rgba(0, 0, 0, 0.12);--mm-switch-checked-track: rgba(38, 166, 154, 0.3);--mm-switch-checked-thumb: #26a69a;--mm-switch-unchecked-track: rgba(0, 0, 0, 0.6);--mm-switch-unchecked-thumb: #f5f5f5;--mm-switch-disabled-track: rgba(0, 0, 0, 0.12);--mm-switch-disabled-thumb: #bdbdbd}body{background-color:var(--mm-background-color);color:var(--mm-text-primary);transition:background-color .3s ease,color .3s ease}.container,.main{color:var(--mm-text-primary)}[data-theme=dark]{--mm-primary-color: #80cbc4;--mm-primary-color-light: #b2dfdb;--mm-primary-color-dark: #4db6ac;--mm-secondary-color: #ffa726;--mm-secondary-color-light: #ffcc02;--mm-secondary-color-dark: #ff8f00;--mm-background-color: #121212;--mm-surface-color: #1e1e1e;--mm-card-background: #2d2d2d;--mm-text-primary: rgba(255, 255, 255, 0.87);--mm-text-secondary: rgba(255, 255, 255, 0.6);--mm-text-disabled: rgba(255, 255, 255, 0.38);--mm-text-hint: rgba(255, 255, 255, 0.38);--mm-border-color: rgba(255, 255, 255, 0.12);--mm-divider-color: rgba(255, 255, 255, 0.12);--mm-input-background: #2d2d2d;--mm-input-border: rgba(255, 255, 255, 0.42);--mm-input-border-focus: var(--mm-primary-color);--mm-input-text: var(--mm-text-primary);--mm-button-background: var(--mm-primary-color);--mm-button-text: #000000;--mm-button-flat-text: var(--mm-primary-color);--mm-nav-background: #1e1e1e;--mm-nav-text: #ffffff;--mm-nav-active-text: #000000;--mm-modal-background: #2d2d2d;--mm-overlay-background: rgba(0, 0, 0, 0.8);--mm-shadow-color: rgba(0, 0, 0, 0.5);--mm-shadow-umbra: rgba(0, 0, 0, 0.5);--mm-shadow-penumbra: rgba(0, 0, 0, 0.36);--mm-shadow-ambient: rgba(0, 0, 0, 0.3);--mm-chip-bg: #424242;--mm-chip-text: var(--mm-text-secondary);--mm-dropdown-hover: #444;--mm-dropdown-focus: #555;--mm-dropdown-selected: #1e3a8a;--mm-switch-checked-track: rgba(128, 203, 196, 0.3);--mm-switch-checked-thumb: #80cbc4;--mm-switch-unchecked-track: rgba(255, 255, 255, 0.6);--mm-switch-unchecked-thumb: #616161;--mm-switch-disabled-track: rgba(255, 255, 255, 0.12);--mm-switch-disabled-thumb: #424242}@media(prefers-color-scheme: dark){:root:not([data-theme]){--mm-primary-color: #80cbc4;--mm-primary-color-light: #b2dfdb;--mm-primary-color-dark: #4db6ac;--mm-secondary-color: #ffa726;--mm-secondary-color-light: #ffcc02;--mm-secondary-color-dark: #ff8f00;--mm-background-color: #121212;--mm-surface-color: #1e1e1e;--mm-card-background: #2d2d2d;--mm-text-primary: rgba(255, 255, 255, 0.87);--mm-text-secondary: rgba(255, 255, 255, 0.6);--mm-text-disabled: rgba(255, 255, 255, 0.38);--mm-text-hint: rgba(255, 255, 255, 0.38);--mm-border-color: rgba(255, 255, 255, 0.12);--mm-divider-color: rgba(255, 255, 255, 0.12);--mm-input-background: #2d2d2d;--mm-input-border: rgba(255, 255, 255, 0.42);--mm-input-border-focus: var(--mm-primary-color);--mm-input-text: var(--mm-text-primary);--mm-button-background: var(--mm-primary-color);--mm-button-text: #000000;--mm-button-flat-text: var(--mm-primary-color);--mm-nav-background: #1e1e1e;--mm-nav-text: #ffffff;--mm-nav-active-text: #000000;--mm-modal-background: #2d2d2d;--mm-overlay-background: rgba(0, 0, 0, 0.8);--mm-shadow-color: rgba(0, 0, 0, 0.5);--mm-shadow-umbra: rgba(0, 0, 0, 0.5);--mm-shadow-penumbra: rgba(0, 0, 0, 0.36);--mm-shadow-ambient: rgba(0, 0, 0, 0.3);--mm-switch-checked-track: rgba(128, 203, 196, 0.3);--mm-switch-checked-thumb: #80cbc4;--mm-switch-unchecked-track: rgba(255, 255, 255, 0.6);--mm-switch-unchecked-thumb: #616161;--mm-switch-disabled-track: rgba(255, 255, 255, 0.12);--mm-switch-disabled-thumb: #424242}}.materialize-red{background-color:#e51c23 !important}.materialize-red-text{color:#e51c23 !important}.materialize-red.lighten-5{background-color:#fdeaeb !important}.materialize-red-text.text-lighten-5{color:#fdeaeb !important}.materialize-red.lighten-4{background-color:#f8c1c3 !important}.materialize-red-text.text-lighten-4{color:#f8c1c3 !important}.materialize-red.lighten-3{background-color:#f3989b !important}.materialize-red-text.text-lighten-3{color:#f3989b !important}.materialize-red.lighten-2{background-color:#ee6e73 !important}.materialize-red-text.text-lighten-2{color:#ee6e73 !important}.materialize-red.lighten-1{background-color:#ea454b !important}.materialize-red-text.text-lighten-1{color:#ea454b !important}.materialize-red.darken-1{background-color:#d0181e !important}.materialize-red-text.text-darken-1{color:#d0181e !important}.materialize-red.darken-2{background-color:#b9151b !important}.materialize-red-text.text-darken-2{color:#b9151b !important}.materialize-red.darken-3{background-color:#a21318 !important}.materialize-red-text.text-darken-3{color:#a21318 !important}.materialize-red.darken-4{background-color:#8b1014 !important}.materialize-red-text.text-darken-4{color:#8b1014 !important}.red{background-color:#f44336 !important}.red-text{color:#f44336 !important}.red.lighten-5{background-color:#ffebee !important}.red-text.text-lighten-5{color:#ffebee !important}.red.lighten-4{background-color:#ffcdd2 !important}.red-text.text-lighten-4{color:#ffcdd2 !important}.red.lighten-3{background-color:#ef9a9a !important}.red-text.text-lighten-3{color:#ef9a9a !important}.red.lighten-2{background-color:#e57373 !important}.red-text.text-lighten-2{color:#e57373 !important}.red.lighten-1{background-color:#ef5350 !important}.red-text.text-lighten-1{color:#ef5350 !important}.red.darken-1{background-color:#e53935 !important}.red-text.text-darken-1{color:#e53935 !important}.red.darken-2{background-color:#d32f2f !important}.red-text.text-darken-2{color:#d32f2f !important}.red.darken-3{background-color:#c62828 !important}.red-text.text-darken-3{color:#c62828 !important}.red.darken-4{background-color:#b71c1c !important}.red-text.text-darken-4{color:#b71c1c !important}.red.accent-1{background-color:#ff8a80 !important}.red-text.text-accent-1{color:#ff8a80 !important}.red.accent-2{background-color:#ff5252 !important}.red-text.text-accent-2{color:#ff5252 !important}.red.accent-3{background-color:#ff1744 !important}.red-text.text-accent-3{color:#ff1744 !important}.red.accent-4{background-color:#d50000 !important}.red-text.text-accent-4{color:#d50000 !important}.pink{background-color:#e91e63 !important}.pink-text{color:#e91e63 !important}.pink.lighten-5{background-color:#fce4ec !important}.pink-text.text-lighten-5{color:#fce4ec !important}.pink.lighten-4{background-color:#f8bbd0 !important}.pink-text.text-lighten-4{color:#f8bbd0 !important}.pink.lighten-3{background-color:#f48fb1 !important}.pink-text.text-lighten-3{color:#f48fb1 !important}.pink.lighten-2{background-color:#f06292 !important}.pink-text.text-lighten-2{color:#f06292 !important}.pink.lighten-1{background-color:#ec407a !important}.pink-text.text-lighten-1{color:#ec407a !important}.pink.darken-1{background-color:#d81b60 !important}.pink-text.text-darken-1{color:#d81b60 !important}.pink.darken-2{background-color:#c2185b !important}.pink-text.text-darken-2{color:#c2185b !important}.pink.darken-3{background-color:#ad1457 !important}.pink-text.text-darken-3{color:#ad1457 !important}.pink.darken-4{background-color:#880e4f !important}.pink-text.text-darken-4{color:#880e4f !important}.pink.accent-1{background-color:#ff80ab !important}.pink-text.text-accent-1{color:#ff80ab !important}.pink.accent-2{background-color:#ff4081 !important}.pink-text.text-accent-2{color:#ff4081 !important}.pink.accent-3{background-color:#f50057 !important}.pink-text.text-accent-3{color:#f50057 !important}.pink.accent-4{background-color:#c51162 !important}.pink-text.text-accent-4{color:#c51162 !important}.purple{background-color:#9c27b0 !important}.purple-text{color:#9c27b0 !important}.purple.lighten-5{background-color:#f3e5f5 !important}.purple-text.text-lighten-5{color:#f3e5f5 !important}.purple.lighten-4{background-color:#e1bee7 !important}.purple-text.text-lighten-4{color:#e1bee7 !important}.purple.lighten-3{background-color:#ce93d8 !important}.purple-text.text-lighten-3{color:#ce93d8 !important}.purple.lighten-2{background-color:#ba68c8 !important}.purple-text.text-lighten-2{color:#ba68c8 !important}.purple.lighten-1{background-color:#ab47bc !important}.purple-text.text-lighten-1{color:#ab47bc !important}.purple.darken-1{background-color:#8e24aa !important}.purple-text.text-darken-1{color:#8e24aa !important}.purple.darken-2{background-color:#7b1fa2 !important}.purple-text.text-darken-2{color:#7b1fa2 !important}.purple.darken-3{background-color:#6a1b9a !important}.purple-text.text-darken-3{color:#6a1b9a !important}.purple.darken-4{background-color:#4a148c !important}.purple-text.text-darken-4{color:#4a148c !important}.purple.accent-1{background-color:#ea80fc !important}.purple-text.text-accent-1{color:#ea80fc !important}.purple.accent-2{background-color:#e040fb !important}.purple-text.text-accent-2{color:#e040fb !important}.purple.accent-3{background-color:#d500f9 !important}.purple-text.text-accent-3{color:#d500f9 !important}.purple.accent-4{background-color:#a0f !important}.purple-text.text-accent-4{color:#a0f !important}.deep-purple{background-color:#673ab7 !important}.deep-purple-text{color:#673ab7 !important}.deep-purple.lighten-5{background-color:#ede7f6 !important}.deep-purple-text.text-lighten-5{color:#ede7f6 !important}.deep-purple.lighten-4{background-color:#d1c4e9 !important}.deep-purple-text.text-lighten-4{color:#d1c4e9 !important}.deep-purple.lighten-3{background-color:#b39ddb !important}.deep-purple-text.text-lighten-3{color:#b39ddb !important}.deep-purple.lighten-2{background-color:#9575cd !important}.deep-purple-text.text-lighten-2{color:#9575cd !important}.deep-purple.lighten-1{background-color:#7e57c2 !important}.deep-purple-text.text-lighten-1{color:#7e57c2 !important}.deep-purple.darken-1{background-color:#5e35b1 !important}.deep-purple-text.text-darken-1{color:#5e35b1 !important}.deep-purple.darken-2{background-color:#512da8 !important}.deep-purple-text.text-darken-2{color:#512da8 !important}.deep-purple.darken-3{background-color:#4527a0 !important}.deep-purple-text.text-darken-3{color:#4527a0 !important}.deep-purple.darken-4{background-color:#311b92 !important}.deep-purple-text.text-darken-4{color:#311b92 !important}.deep-purple.accent-1{background-color:#b388ff !important}.deep-purple-text.text-accent-1{color:#b388ff !important}.deep-purple.accent-2{background-color:#7c4dff !important}.deep-purple-text.text-accent-2{color:#7c4dff !important}.deep-purple.accent-3{background-color:#651fff !important}.deep-purple-text.text-accent-3{color:#651fff !important}.deep-purple.accent-4{background-color:#6200ea !important}.deep-purple-text.text-accent-4{color:#6200ea !important}.indigo{background-color:#3f51b5 !important}.indigo-text{color:#3f51b5 !important}.indigo.lighten-5{background-color:#e8eaf6 !important}.indigo-text.text-lighten-5{color:#e8eaf6 !important}.indigo.lighten-4{background-color:#c5cae9 !important}.indigo-text.text-lighten-4{color:#c5cae9 !important}.indigo.lighten-3{background-color:#9fa8da !important}.indigo-text.text-lighten-3{color:#9fa8da !important}.indigo.lighten-2{background-color:#7986cb !important}.indigo-text.text-lighten-2{color:#7986cb !important}.indigo.lighten-1{background-color:#5c6bc0 !important}.indigo-text.text-lighten-1{color:#5c6bc0 !important}.indigo.darken-1{background-color:#3949ab !important}.indigo-text.text-darken-1{color:#3949ab !important}.indigo.darken-2{background-color:#303f9f !important}.indigo-text.text-darken-2{color:#303f9f !important}.indigo.darken-3{background-color:#283593 !important}.indigo-text.text-darken-3{color:#283593 !important}.indigo.darken-4{background-color:#1a237e !important}.indigo-text.text-darken-4{color:#1a237e !important}.indigo.accent-1{background-color:#8c9eff !important}.indigo-text.text-accent-1{color:#8c9eff !important}.indigo.accent-2{background-color:#536dfe !important}.indigo-text.text-accent-2{color:#536dfe !important}.indigo.accent-3{background-color:#3d5afe !important}.indigo-text.text-accent-3{color:#3d5afe !important}.indigo.accent-4{background-color:#304ffe !important}.indigo-text.text-accent-4{color:#304ffe !important}.blue{background-color:#2196f3 !important}.blue-text{color:#2196f3 !important}.blue.lighten-5{background-color:#e3f2fd !important}.blue-text.text-lighten-5{color:#e3f2fd !important}.blue.lighten-4{background-color:#bbdefb !important}.blue-text.text-lighten-4{color:#bbdefb !important}.blue.lighten-3{background-color:#90caf9 !important}.blue-text.text-lighten-3{color:#90caf9 !important}.blue.lighten-2{background-color:#64b5f6 !important}.blue-text.text-lighten-2{color:#64b5f6 !important}.blue.lighten-1{background-color:#42a5f5 !important}.blue-text.text-lighten-1{color:#42a5f5 !important}.blue.darken-1{background-color:#1e88e5 !important}.blue-text.text-darken-1{color:#1e88e5 !important}.blue.darken-2{background-color:#1976d2 !important}.blue-text.text-darken-2{color:#1976d2 !important}.blue.darken-3{background-color:#1565c0 !important}.blue-text.text-darken-3{color:#1565c0 !important}.blue.darken-4{background-color:#0d47a1 !important}.blue-text.text-darken-4{color:#0d47a1 !important}.blue.accent-1{background-color:#82b1ff !important}.blue-text.text-accent-1{color:#82b1ff !important}.blue.accent-2{background-color:#448aff !important}.blue-text.text-accent-2{color:#448aff !important}.blue.accent-3{background-color:#2979ff !important}.blue-text.text-accent-3{color:#2979ff !important}.blue.accent-4{background-color:#2962ff !important}.blue-text.text-accent-4{color:#2962ff !important}.light-blue{background-color:#03a9f4 !important}.light-blue-text{color:#03a9f4 !important}.light-blue.lighten-5{background-color:#e1f5fe !important}.light-blue-text.text-lighten-5{color:#e1f5fe !important}.light-blue.lighten-4{background-color:#b3e5fc !important}.light-blue-text.text-lighten-4{color:#b3e5fc !important}.light-blue.lighten-3{background-color:#81d4fa !important}.light-blue-text.text-lighten-3{color:#81d4fa !important}.light-blue.lighten-2{background-color:#4fc3f7 !important}.light-blue-text.text-lighten-2{color:#4fc3f7 !important}.light-blue.lighten-1{background-color:#29b6f6 !important}.light-blue-text.text-lighten-1{color:#29b6f6 !important}.light-blue.darken-1{background-color:#039be5 !important}.light-blue-text.text-darken-1{color:#039be5 !important}.light-blue.darken-2{background-color:#0288d1 !important}.light-blue-text.text-darken-2{color:#0288d1 !important}.light-blue.darken-3{background-color:#0277bd !important}.light-blue-text.text-darken-3{color:#0277bd !important}.light-blue.darken-4{background-color:#01579b !important}.light-blue-text.text-darken-4{color:#01579b !important}.light-blue.accent-1{background-color:#80d8ff !important}.light-blue-text.text-accent-1{color:#80d8ff !important}.light-blue.accent-2{background-color:#40c4ff !important}.light-blue-text.text-accent-2{color:#40c4ff !important}.light-blue.accent-3{background-color:#00b0ff !important}.light-blue-text.text-accent-3{color:#00b0ff !important}.light-blue.accent-4{background-color:#0091ea !important}.light-blue-text.text-accent-4{color:#0091ea !important}.cyan{background-color:#00bcd4 !important}.cyan-text{color:#00bcd4 !important}.cyan.lighten-5{background-color:#e0f7fa !important}.cyan-text.text-lighten-5{color:#e0f7fa !important}.cyan.lighten-4{background-color:#b2ebf2 !important}.cyan-text.text-lighten-4{color:#b2ebf2 !important}.cyan.lighten-3{background-color:#80deea !important}.cyan-text.text-lighten-3{color:#80deea !important}.cyan.lighten-2{background-color:#4dd0e1 !important}.cyan-text.text-lighten-2{color:#4dd0e1 !important}.cyan.lighten-1{background-color:#26c6da !important}.cyan-text.text-lighten-1{color:#26c6da !important}.cyan.darken-1{background-color:#00acc1 !important}.cyan-text.text-darken-1{color:#00acc1 !important}.cyan.darken-2{background-color:#0097a7 !important}.cyan-text.text-darken-2{color:#0097a7 !important}.cyan.darken-3{background-color:#00838f !important}.cyan-text.text-darken-3{color:#00838f !important}.cyan.darken-4{background-color:#006064 !important}.cyan-text.text-darken-4{color:#006064 !important}.cyan.accent-1{background-color:#84ffff !important}.cyan-text.text-accent-1{color:#84ffff !important}.cyan.accent-2{background-color:#18ffff !important}.cyan-text.text-accent-2{color:#18ffff !important}.cyan.accent-3{background-color:#00e5ff !important}.cyan-text.text-accent-3{color:#00e5ff !important}.cyan.accent-4{background-color:#00b8d4 !important}.cyan-text.text-accent-4{color:#00b8d4 !important}.teal{background-color:#009688 !important}.teal-text{color:#009688 !important}.teal.lighten-5{background-color:#e0f2f1 !important}.teal-text.text-lighten-5{color:#e0f2f1 !important}.teal.lighten-4{background-color:#b2dfdb !important}.teal-text.text-lighten-4{color:#b2dfdb !important}.teal.lighten-3{background-color:#80cbc4 !important}.teal-text.text-lighten-3{color:#80cbc4 !important}.teal.lighten-2{background-color:#4db6ac !important}.teal-text.text-lighten-2{color:#4db6ac !important}.teal.lighten-1{background-color:#26a69a !important}.teal-text.text-lighten-1{color:#26a69a !important}.teal.darken-1{background-color:#00897b !important}.teal-text.text-darken-1{color:#00897b !important}.teal.darken-2{background-color:#00796b !important}.teal-text.text-darken-2{color:#00796b !important}.teal.darken-3{background-color:#00695c !important}.teal-text.text-darken-3{color:#00695c !important}.teal.darken-4{background-color:#004d40 !important}.teal-text.text-darken-4{color:#004d40 !important}.teal.accent-1{background-color:#a7ffeb !important}.teal-text.text-accent-1{color:#a7ffeb !important}.teal.accent-2{background-color:#64ffda !important}.teal-text.text-accent-2{color:#64ffda !important}.teal.accent-3{background-color:#1de9b6 !important}.teal-text.text-accent-3{color:#1de9b6 !important}.teal.accent-4{background-color:#00bfa5 !important}.teal-text.text-accent-4{color:#00bfa5 !important}.green{background-color:#4caf50 !important}.green-text{color:#4caf50 !important}.green.lighten-5{background-color:#e8f5e9 !important}.green-text.text-lighten-5{color:#e8f5e9 !important}.green.lighten-4{background-color:#c8e6c9 !important}.green-text.text-lighten-4{color:#c8e6c9 !important}.green.lighten-3{background-color:#a5d6a7 !important}.green-text.text-lighten-3{color:#a5d6a7 !important}.green.lighten-2{background-color:#81c784 !important}.green-text.text-lighten-2{color:#81c784 !important}.green.lighten-1{background-color:#66bb6a !important}.green-text.text-lighten-1{color:#66bb6a !important}.green.darken-1{background-color:#43a047 !important}.green-text.text-darken-1{color:#43a047 !important}.green.darken-2{background-color:#388e3c !important}.green-text.text-darken-2{color:#388e3c !important}.green.darken-3{background-color:#2e7d32 !important}.green-text.text-darken-3{color:#2e7d32 !important}.green.darken-4{background-color:#1b5e20 !important}.green-text.text-darken-4{color:#1b5e20 !important}.green.accent-1{background-color:#b9f6ca !important}.green-text.text-accent-1{color:#b9f6ca !important}.green.accent-2{background-color:#69f0ae !important}.green-text.text-accent-2{color:#69f0ae !important}.green.accent-3{background-color:#00e676 !important}.green-text.text-accent-3{color:#00e676 !important}.green.accent-4{background-color:#00c853 !important}.green-text.text-accent-4{color:#00c853 !important}.light-green{background-color:#8bc34a !important}.light-green-text{color:#8bc34a !important}.light-green.lighten-5{background-color:#f1f8e9 !important}.light-green-text.text-lighten-5{color:#f1f8e9 !important}.light-green.lighten-4{background-color:#dcedc8 !important}.light-green-text.text-lighten-4{color:#dcedc8 !important}.light-green.lighten-3{background-color:#c5e1a5 !important}.light-green-text.text-lighten-3{color:#c5e1a5 !important}.light-green.lighten-2{background-color:#aed581 !important}.light-green-text.text-lighten-2{color:#aed581 !important}.light-green.lighten-1{background-color:#9ccc65 !important}.light-green-text.text-lighten-1{color:#9ccc65 !important}.light-green.darken-1{background-color:#7cb342 !important}.light-green-text.text-darken-1{color:#7cb342 !important}.light-green.darken-2{background-color:#689f38 !important}.light-green-text.text-darken-2{color:#689f38 !important}.light-green.darken-3{background-color:#558b2f !important}.light-green-text.text-darken-3{color:#558b2f !important}.light-green.darken-4{background-color:#33691e !important}.light-green-text.text-darken-4{color:#33691e !important}.light-green.accent-1{background-color:#ccff90 !important}.light-green-text.text-accent-1{color:#ccff90 !important}.light-green.accent-2{background-color:#b2ff59 !important}.light-green-text.text-accent-2{color:#b2ff59 !important}.light-green.accent-3{background-color:#76ff03 !important}.light-green-text.text-accent-3{color:#76ff03 !important}.light-green.accent-4{background-color:#64dd17 !important}.light-green-text.text-accent-4{color:#64dd17 !important}.lime{background-color:#cddc39 !important}.lime-text{color:#cddc39 !important}.lime.lighten-5{background-color:#f9fbe7 !important}.lime-text.text-lighten-5{color:#f9fbe7 !important}.lime.lighten-4{background-color:#f0f4c3 !important}.lime-text.text-lighten-4{color:#f0f4c3 !important}.lime.lighten-3{background-color:#e6ee9c !important}.lime-text.text-lighten-3{color:#e6ee9c !important}.lime.lighten-2{background-color:#dce775 !important}.lime-text.text-lighten-2{color:#dce775 !important}.lime.lighten-1{background-color:#d4e157 !important}.lime-text.text-lighten-1{color:#d4e157 !important}.lime.darken-1{background-color:#c0ca33 !important}.lime-text.text-darken-1{color:#c0ca33 !important}.lime.darken-2{background-color:#afb42b !important}.lime-text.text-darken-2{color:#afb42b !important}.lime.darken-3{background-color:#9e9d24 !important}.lime-text.text-darken-3{color:#9e9d24 !important}.lime.darken-4{background-color:#827717 !important}.lime-text.text-darken-4{color:#827717 !important}.lime.accent-1{background-color:#f4ff81 !important}.lime-text.text-accent-1{color:#f4ff81 !important}.lime.accent-2{background-color:#eeff41 !important}.lime-text.text-accent-2{color:#eeff41 !important}.lime.accent-3{background-color:#c6ff00 !important}.lime-text.text-accent-3{color:#c6ff00 !important}.lime.accent-4{background-color:#aeea00 !important}.lime-text.text-accent-4{color:#aeea00 !important}.yellow{background-color:#ffeb3b !important}.yellow-text{color:#ffeb3b !important}.yellow.lighten-5{background-color:#fffde7 !important}.yellow-text.text-lighten-5{color:#fffde7 !important}.yellow.lighten-4{background-color:#fff9c4 !important}.yellow-text.text-lighten-4{color:#fff9c4 !important}.yellow.lighten-3{background-color:#fff59d !important}.yellow-text.text-lighten-3{color:#fff59d !important}.yellow.lighten-2{background-color:#fff176 !important}.yellow-text.text-lighten-2{color:#fff176 !important}.yellow.lighten-1{background-color:#ffee58 !important}.yellow-text.text-lighten-1{color:#ffee58 !important}.yellow.darken-1{background-color:#fdd835 !important}.yellow-text.text-darken-1{color:#fdd835 !important}.yellow.darken-2{background-color:#fbc02d !important}.yellow-text.text-darken-2{color:#fbc02d !important}.yellow.darken-3{background-color:#f9a825 !important}.yellow-text.text-darken-3{color:#f9a825 !important}.yellow.darken-4{background-color:#f57f17 !important}.yellow-text.text-darken-4{color:#f57f17 !important}.yellow.accent-1{background-color:#ffff8d !important}.yellow-text.text-accent-1{color:#ffff8d !important}.yellow.accent-2{background-color:#ff0 !important}.yellow-text.text-accent-2{color:#ff0 !important}.yellow.accent-3{background-color:#ffea00 !important}.yellow-text.text-accent-3{color:#ffea00 !important}.yellow.accent-4{background-color:#ffd600 !important}.yellow-text.text-accent-4{color:#ffd600 !important}.amber{background-color:#ffc107 !important}.amber-text{color:#ffc107 !important}.amber.lighten-5{background-color:#fff8e1 !important}.amber-text.text-lighten-5{color:#fff8e1 !important}.amber.lighten-4{background-color:#ffecb3 !important}.amber-text.text-lighten-4{color:#ffecb3 !important}.amber.lighten-3{background-color:#ffe082 !important}.amber-text.text-lighten-3{color:#ffe082 !important}.amber.lighten-2{background-color:#ffd54f !important}.amber-text.text-lighten-2{color:#ffd54f !important}.amber.lighten-1{background-color:#ffca28 !important}.amber-text.text-lighten-1{color:#ffca28 !important}.amber.darken-1{background-color:#ffb300 !important}.amber-text.text-darken-1{color:#ffb300 !important}.amber.darken-2{background-color:#ffa000 !important}.amber-text.text-darken-2{color:#ffa000 !important}.amber.darken-3{background-color:#ff8f00 !important}.amber-text.text-darken-3{color:#ff8f00 !important}.amber.darken-4{background-color:#ff6f00 !important}.amber-text.text-darken-4{color:#ff6f00 !important}.amber.accent-1{background-color:#ffe57f !important}.amber-text.text-accent-1{color:#ffe57f !important}.amber.accent-2{background-color:#ffd740 !important}.amber-text.text-accent-2{color:#ffd740 !important}.amber.accent-3{background-color:#ffc400 !important}.amber-text.text-accent-3{color:#ffc400 !important}.amber.accent-4{background-color:#ffab00 !important}.amber-text.text-accent-4{color:#ffab00 !important}.orange{background-color:#ff9800 !important}.orange-text{color:#ff9800 !important}.orange.lighten-5{background-color:#fff3e0 !important}.orange-text.text-lighten-5{color:#fff3e0 !important}.orange.lighten-4{background-color:#ffe0b2 !important}.orange-text.text-lighten-4{color:#ffe0b2 !important}.orange.lighten-3{background-color:#ffcc80 !important}.orange-text.text-lighten-3{color:#ffcc80 !important}.orange.lighten-2{background-color:#ffb74d !important}.orange-text.text-lighten-2{color:#ffb74d !important}.orange.lighten-1{background-color:#ffa726 !important}.orange-text.text-lighten-1{color:#ffa726 !important}.orange.darken-1{background-color:#fb8c00 !important}.orange-text.text-darken-1{color:#fb8c00 !important}.orange.darken-2{background-color:#f57c00 !important}.orange-text.text-darken-2{color:#f57c00 !important}.orange.darken-3{background-color:#ef6c00 !important}.orange-text.text-darken-3{color:#ef6c00 !important}.orange.darken-4{background-color:#e65100 !important}.orange-text.text-darken-4{color:#e65100 !important}.orange.accent-1{background-color:#ffd180 !important}.orange-text.text-accent-1{color:#ffd180 !important}.orange.accent-2{background-color:#ffab40 !important}.orange-text.text-accent-2{color:#ffab40 !important}.orange.accent-3{background-color:#ff9100 !important}.orange-text.text-accent-3{color:#ff9100 !important}.orange.accent-4{background-color:#ff6d00 !important}.orange-text.text-accent-4{color:#ff6d00 !important}.deep-orange{background-color:#ff5722 !important}.deep-orange-text{color:#ff5722 !important}.deep-orange.lighten-5{background-color:#fbe9e7 !important}.deep-orange-text.text-lighten-5{color:#fbe9e7 !important}.deep-orange.lighten-4{background-color:#ffccbc !important}.deep-orange-text.text-lighten-4{color:#ffccbc !important}.deep-orange.lighten-3{background-color:#ffab91 !important}.deep-orange-text.text-lighten-3{color:#ffab91 !important}.deep-orange.lighten-2{background-color:#ff8a65 !important}.deep-orange-text.text-lighten-2{color:#ff8a65 !important}.deep-orange.lighten-1{background-color:#ff7043 !important}.deep-orange-text.text-lighten-1{color:#ff7043 !important}.deep-orange.darken-1{background-color:#f4511e !important}.deep-orange-text.text-darken-1{color:#f4511e !important}.deep-orange.darken-2{background-color:#e64a19 !important}.deep-orange-text.text-darken-2{color:#e64a19 !important}.deep-orange.darken-3{background-color:#d84315 !important}.deep-orange-text.text-darken-3{color:#d84315 !important}.deep-orange.darken-4{background-color:#bf360c !important}.deep-orange-text.text-darken-4{color:#bf360c !important}.deep-orange.accent-1{background-color:#ff9e80 !important}.deep-orange-text.text-accent-1{color:#ff9e80 !important}.deep-orange.accent-2{background-color:#ff6e40 !important}.deep-orange-text.text-accent-2{color:#ff6e40 !important}.deep-orange.accent-3{background-color:#ff3d00 !important}.deep-orange-text.text-accent-3{color:#ff3d00 !important}.deep-orange.accent-4{background-color:#dd2c00 !important}.deep-orange-text.text-accent-4{color:#dd2c00 !important}.brown{background-color:#795548 !important}.brown-text{color:#795548 !important}.brown.lighten-5{background-color:#efebe9 !important}.brown-text.text-lighten-5{color:#efebe9 !important}.brown.lighten-4{background-color:#d7ccc8 !important}.brown-text.text-lighten-4{color:#d7ccc8 !important}.brown.lighten-3{background-color:#bcaaa4 !important}.brown-text.text-lighten-3{color:#bcaaa4 !important}.brown.lighten-2{background-color:#a1887f !important}.brown-text.text-lighten-2{color:#a1887f !important}.brown.lighten-1{background-color:#8d6e63 !important}.brown-text.text-lighten-1{color:#8d6e63 !important}.brown.darken-1{background-color:#6d4c41 !important}.brown-text.text-darken-1{color:#6d4c41 !important}.brown.darken-2{background-color:#5d4037 !important}.brown-text.text-darken-2{color:#5d4037 !important}.brown.darken-3{background-color:#4e342e !important}.brown-text.text-darken-3{color:#4e342e !important}.brown.darken-4{background-color:#3e2723 !important}.brown-text.text-darken-4{color:#3e2723 !important}.blue-grey{background-color:#607d8b !important}.blue-grey-text{color:#607d8b !important}.blue-grey.lighten-5{background-color:#eceff1 !important}.blue-grey-text.text-lighten-5{color:#eceff1 !important}.blue-grey.lighten-4{background-color:#cfd8dc !important}.blue-grey-text.text-lighten-4{color:#cfd8dc !important}.blue-grey.lighten-3{background-color:#b0bec5 !important}.blue-grey-text.text-lighten-3{color:#b0bec5 !important}.blue-grey.lighten-2{background-color:#90a4ae !important}.blue-grey-text.text-lighten-2{color:#90a4ae !important}.blue-grey.lighten-1{background-color:#78909c !important}.blue-grey-text.text-lighten-1{color:#78909c !important}.blue-grey.darken-1{background-color:#546e7a !important}.blue-grey-text.text-darken-1{color:#546e7a !important}.blue-grey.darken-2{background-color:#455a64 !important}.blue-grey-text.text-darken-2{color:#455a64 !important}.blue-grey.darken-3{background-color:#37474f !important}.blue-grey-text.text-darken-3{color:#37474f !important}.blue-grey.darken-4{background-color:#263238 !important}.blue-grey-text.text-darken-4{color:#263238 !important}.grey{background-color:#9e9e9e !important}.grey-text{color:#9e9e9e !important}.grey.lighten-5{background-color:#fafafa !important}.grey-text.text-lighten-5{color:#fafafa !important}.grey.lighten-4{background-color:#f5f5f5 !important}.grey-text.text-lighten-4{color:#f5f5f5 !important}.grey.lighten-3{background-color:#eee !important}.grey-text.text-lighten-3{color:#eee !important}.grey.lighten-2{background-color:#e0e0e0 !important}.grey-text.text-lighten-2{color:#e0e0e0 !important}.grey.lighten-1{background-color:#bdbdbd !important}.grey-text.text-lighten-1{color:#bdbdbd !important}.grey.darken-1{background-color:#757575 !important}.grey-text.text-darken-1{color:#757575 !important}.grey.darken-2{background-color:#616161 !important}.grey-text.text-darken-2{color:#616161 !important}.grey.darken-3{background-color:#424242 !important}.grey-text.text-darken-3{color:#424242 !important}.grey.darken-4{background-color:#212121 !important}.grey-text.text-darken-4{color:#212121 !important}.black{background-color:#000 !important}.black-text{color:#000 !important}.white{background-color:#fff !important}.white-text{color:#fff !important}.transparent{background-color:rgba(0,0,0,0) !important}.transparent-text{color:rgba(0,0,0,0) !important}/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,footer,header,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:rgba(0,0,0,0);-webkit-text-decoration-skip:objects}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,html [type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}template{display:none}[hidden]{display:none}html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}button,input,optgroup,select,textarea{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif}ul:not(.browser-default){padding-left:0;list-style-type:none}ul:not(.browser-default)>li{list-style-type:none}a{color:#039be5;text-decoration:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.valign-wrapper{display:flex;align-items:center}.clearfix{clear:both}.z-depth-0{box-shadow:none !important}.z-depth-1,.sidenav,.collapsible,.dropdown-content,.btn,.btn-floating,.btn-large,.btn-small,.toast,.card-panel,.card,nav{box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12),0 1px 5px 0 rgba(0,0,0,.2)}.z-depth-1-half,.btn:hover,.btn-floating:hover,.btn-large:hover,.btn-small:hover{box-shadow:0 3px 3px 0 rgba(0,0,0,.14),0 1px 7px 0 rgba(0,0,0,.12),0 3px 1px -1px rgba(0,0,0,.2)}.z-depth-2{box-shadow:0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.3)}.z-depth-3{box-shadow:0 8px 17px 2px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12),0 5px 5px -3px rgba(0,0,0,.2)}.z-depth-4{box-shadow:0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -7px rgba(0,0,0,.2)}.z-depth-5,.modal{box-shadow:0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12),0 11px 15px -7px rgba(0,0,0,.2)}.hoverable{transition:box-shadow .25s}.hoverable:hover{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)}.divider{height:1px;overflow:hidden;background-color:#e0e0e0}blockquote{margin:20px 0;padding-left:1.5rem;border-left:5px solid #ee6e73}i{line-height:inherit}i.left{float:left;margin-right:15px}i.right{float:right;margin-left:15px}i.tiny{font-size:1rem}i.small{font-size:2rem}i.medium{font-size:4rem}i.large{font-size:6rem}img.responsive-img,video.responsive-video{max-width:100%;height:auto}.pagination li{display:inline-block;border-radius:2px;text-align:center;vertical-align:top;height:30px}.pagination li a{color:#444;display:inline-block;font-size:1.2rem;padding:0 10px;line-height:30px}.pagination li.active a{color:#fff}.pagination li.active{background-color:#ee6e73}.pagination li.disabled a{cursor:default;color:#999}.pagination li i{font-size:2rem}.pagination li.pages ul li{display:inline-block;float:none}@media only screen and (max-width : 992px){.pagination{width:100%}.pagination li.prev,.pagination li.next{width:10%}.pagination li.pages{width:80%;overflow:hidden;white-space:nowrap}}.breadcrumb{display:inline-block;font-size:18px;color:hsla(0,0%,100%,.7)}.breadcrumb i,.breadcrumb [class^=mdi-],.breadcrumb [class*=mdi-],.breadcrumb i.material-icons{display:inline-block;float:left;font-size:24px}.breadcrumb:before{content:"";color:hsla(0,0%,100%,.7);vertical-align:top;display:inline-block;font-family:"Material Icons";font-weight:normal;font-style:normal;font-size:25px;margin:0 10px 0 8px;-webkit-font-smoothing:antialiased;float:left}.breadcrumb:first-child:before{display:none}.breadcrumb:last-child{color:#fff}.parallax-container{position:relative;overflow:hidden;height:500px}.parallax-container .parallax{position:absolute;top:0;left:0;right:0;bottom:0;z-index:-1}.parallax-container .parallax img{opacity:0;position:absolute;left:50%;bottom:0;min-width:100%;min-height:100%;transform:translate3d(0, 0, 0);transform:translateX(-50%)}.pin-top,.pin-bottom{position:relative}.pinned{position:fixed !important}ul.staggered-list li{opacity:0}.fade-in{opacity:0;transform-origin:0 50%}@media only screen and (max-width : 600px){.hide-on-small-only,.hide-on-small-and-down{display:none !important}}@media only screen and (max-width : 992px){.hide-on-med-and-down{display:none !important}}@media only screen and (min-width : 601px){.hide-on-med-and-up{display:none !important}}@media only screen and (min-width: 600px)and (max-width: 992px){.hide-on-med-only{display:none !important}}@media only screen and (min-width : 993px){.hide-on-large-only{display:none !important}}@media only screen and (min-width : 1201px){.hide-on-extra-large-only{display:none !important}}@media only screen and (min-width : 1201px){.show-on-extra-large{display:block !important}}@media only screen and (min-width : 993px){.show-on-large{display:block !important}}@media only screen and (min-width: 600px)and (max-width: 992px){.show-on-medium{display:block !important}}@media only screen and (max-width : 600px){.show-on-small{display:block !important}}@media only screen and (min-width : 601px){.show-on-medium-and-up{display:block !important}}@media only screen and (max-width : 992px){.show-on-medium-and-down{display:block !important}}@media only screen and (max-width : 600px){.center-on-small-only{text-align:center}}.page-footer{padding-top:20px;color:#fff;background-color:#ee6e73}.page-footer .footer-copyright{overflow:hidden;min-height:50px;display:flex;align-items:center;justify-content:space-between;padding:10px 0px;color:hsla(0,0%,100%,.8);background-color:rgba(51,51,51,.08)}table,th,td{border:none}table{width:100%;display:table;border-collapse:collapse;border-spacing:0}table.striped tr{border-bottom:none}table.striped>tbody>tr:nth-child(odd){background-color:rgba(242,242,242,.5)}table.striped>tbody>tr>td{border-radius:0}table.highlight>tbody>tr{transition:background-color .25s ease}table.highlight>tbody>tr:hover{background-color:rgba(242,242,242,.5)}table.centered thead tr th,table.centered tbody tr td{text-align:center}tr{border-bottom:1px solid rgba(0,0,0,.12)}td,th{padding:15px 5px;display:table-cell;text-align:left;vertical-align:middle;border-radius:2px}@media only screen and (max-width : 992px){table.responsive-table{width:100%;border-collapse:collapse;border-spacing:0;display:block;position:relative}table.responsive-table td:empty:before{content:" "}table.responsive-table th,table.responsive-table td{margin:0;vertical-align:top}table.responsive-table th{text-align:left}table.responsive-table thead{display:block;float:left}table.responsive-table thead tr{display:block;padding:0 10px 0 0}table.responsive-table thead tr th::before{content:" "}table.responsive-table tbody{display:block;width:auto;position:relative;overflow-x:auto;white-space:nowrap}table.responsive-table tbody tr{display:inline-block;vertical-align:top}table.responsive-table th{display:block;text-align:right}table.responsive-table td{display:block;min-height:1.25em;text-align:left}table.responsive-table tr{border-bottom:none;padding:0 10px}table.responsive-table thead{border:0;border-right:1px solid rgba(0,0,0,.12)}}.collection{margin:.5rem 0 1rem 0;border:1px solid var(--mm-border-color, #e0e0e0);border-radius:2px;overflow:hidden;position:relative}.collection .collection-item{background-color:var(--mm-surface-color, #fff);color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));line-height:1.5rem;padding:10px 20px;margin:0;border-bottom:1px solid var(--mm-border-color, #e0e0e0)}.collection .collection-item.avatar{min-height:84px;padding-left:72px;position:relative}.collection .collection-item.avatar:not(.circle-clipper)>.circle,.collection .collection-item.avatar :not(.circle-clipper)>.circle{position:absolute;width:42px;height:42px;overflow:hidden;left:15px;display:inline-block;vertical-align:middle}.collection .collection-item.avatar i.circle{font-size:18px;line-height:42px;color:#fff;background-color:#999;text-align:center}.collection .collection-item.avatar .title{font-size:16px}.collection .collection-item.avatar p{margin:0}.collection .collection-item.avatar .secondary-content{position:absolute;top:16px;right:16px}.collection .collection-item:last-child{border-bottom:none}.collection .collection-item.active{background-color:#26a69a;color:rgb(234.25,250.25,248.75)}.collection .collection-item.active .secondary-content{color:#fff}.collection a.collection-item{display:block;transition:.25s;color:#26a69a}.collection a.collection-item:not(.active):hover{background-color:#ddd}.collection.with-header .collection-header{background-color:var(--mm-surface-color, #fff);color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));border-bottom:1px solid var(--mm-border-color, #e0e0e0);padding:10px 20px}.collection.with-header .collection-item{padding-left:30px}.collection.with-header .collection-item.avatar{padding-left:72px}.secondary-content{float:right;color:#26a69a}.collapsible .collection{margin:0;border:none}.video-container{position:relative;padding-bottom:56.25%;height:0;overflow:hidden}.video-container iframe,.video-container object,.video-container embed{position:absolute;top:0;left:0;width:100%;height:100%}.progress{position:relative;height:4px;display:block;width:100%;background-color:#acece6;border-radius:2px;margin:.5rem 0 1rem 0;overflow:hidden}.progress .determinate{position:absolute;top:0;left:0;bottom:0;background-color:#26a69a;transition:width .3s linear}.progress .indeterminate{background-color:#26a69a}.progress .indeterminate:before{content:"";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;animation:indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite}.progress .indeterminate:after{content:"";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;animation:indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;animation-delay:1.15s}@keyframes indeterminate{0%{left:-35%;right:100%}60%{left:100%;right:-90%}100%{left:100%;right:-90%}}@keyframes indeterminate-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}100%{left:107%;right:-8%}}.hide{display:none !important}.left-align{text-align:left}.right-align{text-align:right}.center,.center-align{text-align:center}.left{float:left !important}.right{float:right !important}.no-select,input[type=range],input[type=range]+.thumb{user-select:none}.circle{border-radius:50%}.center-block{display:block;margin-left:auto;margin-right:auto}.truncate{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.no-padding{padding:0 !important}span.badge{min-width:3rem;padding:0 6px;margin-left:14px;text-align:center;font-size:1rem;line-height:22px;height:22px;color:#757575;float:right;box-sizing:border-box}span.badge.new{font-weight:300;font-size:.8rem;color:#fff;background-color:#26a69a;border-radius:2px}span.badge.new:after{content:" new"}span.badge[data-badge-caption]::after{content:" " attr(data-badge-caption)}nav ul a span.badge{display:inline-block;float:none;margin-left:4px;line-height:22px;height:22px;-webkit-font-smoothing:auto}.collection-item span.badge{margin-top:calc(0.75rem - 11px)}.collapsible span.badge{margin-left:auto}.sidenav span.badge{margin-top:calc(24px - 11px)}table span.badge{display:inline-block;float:none;margin-left:auto}.material-icons{text-rendering:optimizeLegibility;font-feature-settings:"liga"}.container{margin:0 auto;max-width:1280px;width:90%}@media only screen and (min-width : 601px){.container{width:85%}}@media only screen and (min-width : 993px){.container{width:70%}}.col .row{margin-left:-0.75rem;margin-right:-0.75rem}.section{padding-top:1rem;padding-bottom:1rem}.section.no-pad{padding:0}.section.no-pad-bot{padding-bottom:0}.section.no-pad-top{padding-top:0}.row{margin-left:auto;margin-right:auto;margin-bottom:20px}.row:after{content:"";display:table;clear:both}.row .col{float:left;box-sizing:border-box;padding:0 .75rem;min-height:1px}.row .col[class*=push-],.row .col[class*=pull-]{position:relative}.row .col.s1{width:8.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.s2{width:16.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.s3{width:25%;margin-left:auto;left:auto;right:auto}.row .col.s4{width:33.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.s5{width:41.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.s6{width:50%;margin-left:auto;left:auto;right:auto}.row .col.s7{width:58.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.s8{width:66.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.s9{width:75%;margin-left:auto;left:auto;right:auto}.row .col.s10{width:83.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.s11{width:91.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.s12{width:100%;margin-left:auto;left:auto;right:auto}.row .col.offset-s1{margin-left:8.3333333333%}.row .col.pull-s1{right:8.3333333333%}.row .col.push-s1{left:8.3333333333%}.row .col.offset-s2{margin-left:16.6666666667%}.row .col.pull-s2{right:16.6666666667%}.row .col.push-s2{left:16.6666666667%}.row .col.offset-s3{margin-left:25%}.row .col.pull-s3{right:25%}.row .col.push-s3{left:25%}.row .col.offset-s4{margin-left:33.3333333333%}.row .col.pull-s4{right:33.3333333333%}.row .col.push-s4{left:33.3333333333%}.row .col.offset-s5{margin-left:41.6666666667%}.row .col.pull-s5{right:41.6666666667%}.row .col.push-s5{left:41.6666666667%}.row .col.offset-s6{margin-left:50%}.row .col.pull-s6{right:50%}.row .col.push-s6{left:50%}.row .col.offset-s7{margin-left:58.3333333333%}.row .col.pull-s7{right:58.3333333333%}.row .col.push-s7{left:58.3333333333%}.row .col.offset-s8{margin-left:66.6666666667%}.row .col.pull-s8{right:66.6666666667%}.row .col.push-s8{left:66.6666666667%}.row .col.offset-s9{margin-left:75%}.row .col.pull-s9{right:75%}.row .col.push-s9{left:75%}.row .col.offset-s10{margin-left:83.3333333333%}.row .col.pull-s10{right:83.3333333333%}.row .col.push-s10{left:83.3333333333%}.row .col.offset-s11{margin-left:91.6666666667%}.row .col.pull-s11{right:91.6666666667%}.row .col.push-s11{left:91.6666666667%}.row .col.offset-s12{margin-left:100%}.row .col.pull-s12{right:100%}.row .col.push-s12{left:100%}@media only screen and (min-width : 601px){.row .col.m1{width:8.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.m2{width:16.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.m3{width:25%;margin-left:auto;left:auto;right:auto}.row .col.m4{width:33.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.m5{width:41.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.m6{width:50%;margin-left:auto;left:auto;right:auto}.row .col.m7{width:58.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.m8{width:66.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.m9{width:75%;margin-left:auto;left:auto;right:auto}.row .col.m10{width:83.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.m11{width:91.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.m12{width:100%;margin-left:auto;left:auto;right:auto}.row .col.offset-m1{margin-left:8.3333333333%}.row .col.pull-m1{right:8.3333333333%}.row .col.push-m1{left:8.3333333333%}.row .col.offset-m2{margin-left:16.6666666667%}.row .col.pull-m2{right:16.6666666667%}.row .col.push-m2{left:16.6666666667%}.row .col.offset-m3{margin-left:25%}.row .col.pull-m3{right:25%}.row .col.push-m3{left:25%}.row .col.offset-m4{margin-left:33.3333333333%}.row .col.pull-m4{right:33.3333333333%}.row .col.push-m4{left:33.3333333333%}.row .col.offset-m5{margin-left:41.6666666667%}.row .col.pull-m5{right:41.6666666667%}.row .col.push-m5{left:41.6666666667%}.row .col.offset-m6{margin-left:50%}.row .col.pull-m6{right:50%}.row .col.push-m6{left:50%}.row .col.offset-m7{margin-left:58.3333333333%}.row .col.pull-m7{right:58.3333333333%}.row .col.push-m7{left:58.3333333333%}.row .col.offset-m8{margin-left:66.6666666667%}.row .col.pull-m8{right:66.6666666667%}.row .col.push-m8{left:66.6666666667%}.row .col.offset-m9{margin-left:75%}.row .col.pull-m9{right:75%}.row .col.push-m9{left:75%}.row .col.offset-m10{margin-left:83.3333333333%}.row .col.pull-m10{right:83.3333333333%}.row .col.push-m10{left:83.3333333333%}.row .col.offset-m11{margin-left:91.6666666667%}.row .col.pull-m11{right:91.6666666667%}.row .col.push-m11{left:91.6666666667%}.row .col.offset-m12{margin-left:100%}.row .col.pull-m12{right:100%}.row .col.push-m12{left:100%}}@media only screen and (min-width : 993px){.row .col.l1{width:8.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.l2{width:16.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.l3{width:25%;margin-left:auto;left:auto;right:auto}.row .col.l4{width:33.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.l5{width:41.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.l6{width:50%;margin-left:auto;left:auto;right:auto}.row .col.l7{width:58.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.l8{width:66.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.l9{width:75%;margin-left:auto;left:auto;right:auto}.row .col.l10{width:83.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.l11{width:91.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.l12{width:100%;margin-left:auto;left:auto;right:auto}.row .col.offset-l1{margin-left:8.3333333333%}.row .col.pull-l1{right:8.3333333333%}.row .col.push-l1{left:8.3333333333%}.row .col.offset-l2{margin-left:16.6666666667%}.row .col.pull-l2{right:16.6666666667%}.row .col.push-l2{left:16.6666666667%}.row .col.offset-l3{margin-left:25%}.row .col.pull-l3{right:25%}.row .col.push-l3{left:25%}.row .col.offset-l4{margin-left:33.3333333333%}.row .col.pull-l4{right:33.3333333333%}.row .col.push-l4{left:33.3333333333%}.row .col.offset-l5{margin-left:41.6666666667%}.row .col.pull-l5{right:41.6666666667%}.row .col.push-l5{left:41.6666666667%}.row .col.offset-l6{margin-left:50%}.row .col.pull-l6{right:50%}.row .col.push-l6{left:50%}.row .col.offset-l7{margin-left:58.3333333333%}.row .col.pull-l7{right:58.3333333333%}.row .col.push-l7{left:58.3333333333%}.row .col.offset-l8{margin-left:66.6666666667%}.row .col.pull-l8{right:66.6666666667%}.row .col.push-l8{left:66.6666666667%}.row .col.offset-l9{margin-left:75%}.row .col.pull-l9{right:75%}.row .col.push-l9{left:75%}.row .col.offset-l10{margin-left:83.3333333333%}.row .col.pull-l10{right:83.3333333333%}.row .col.push-l10{left:83.3333333333%}.row .col.offset-l11{margin-left:91.6666666667%}.row .col.pull-l11{right:91.6666666667%}.row .col.push-l11{left:91.6666666667%}.row .col.offset-l12{margin-left:100%}.row .col.pull-l12{right:100%}.row .col.push-l12{left:100%}}@media only screen and (min-width : 1201px){.row .col.xl1{width:8.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.xl2{width:16.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.xl3{width:25%;margin-left:auto;left:auto;right:auto}.row .col.xl4{width:33.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.xl5{width:41.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.xl6{width:50%;margin-left:auto;left:auto;right:auto}.row .col.xl7{width:58.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.xl8{width:66.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.xl9{width:75%;margin-left:auto;left:auto;right:auto}.row .col.xl10{width:83.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.xl11{width:91.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.xl12{width:100%;margin-left:auto;left:auto;right:auto}.row .col.offset-xl1{margin-left:8.3333333333%}.row .col.pull-xl1{right:8.3333333333%}.row .col.push-xl1{left:8.3333333333%}.row .col.offset-xl2{margin-left:16.6666666667%}.row .col.pull-xl2{right:16.6666666667%}.row .col.push-xl2{left:16.6666666667%}.row .col.offset-xl3{margin-left:25%}.row .col.pull-xl3{right:25%}.row .col.push-xl3{left:25%}.row .col.offset-xl4{margin-left:33.3333333333%}.row .col.pull-xl4{right:33.3333333333%}.row .col.push-xl4{left:33.3333333333%}.row .col.offset-xl5{margin-left:41.6666666667%}.row .col.pull-xl5{right:41.6666666667%}.row .col.push-xl5{left:41.6666666667%}.row .col.offset-xl6{margin-left:50%}.row .col.pull-xl6{right:50%}.row .col.push-xl6{left:50%}.row .col.offset-xl7{margin-left:58.3333333333%}.row .col.pull-xl7{right:58.3333333333%}.row .col.push-xl7{left:58.3333333333%}.row .col.offset-xl8{margin-left:66.6666666667%}.row .col.pull-xl8{right:66.6666666667%}.row .col.push-xl8{left:66.6666666667%}.row .col.offset-xl9{margin-left:75%}.row .col.pull-xl9{right:75%}.row .col.push-xl9{left:75%}.row .col.offset-xl10{margin-left:83.3333333333%}.row .col.pull-xl10{right:83.3333333333%}.row .col.push-xl10{left:83.3333333333%}.row .col.offset-xl11{margin-left:91.6666666667%}.row .col.pull-xl11{right:91.6666666667%}.row .col.push-xl11{left:91.6666666667%}.row .col.offset-xl12{margin-left:100%}.row .col.pull-xl12{right:100%}.row .col.push-xl12{left:100%}}nav{color:var(--mm-nav-text, #fff);background-color:var(--mm-nav-background, #ee6e73);width:100%;height:56px;line-height:56px}nav.nav-extended{height:auto}nav.nav-extended .nav-wrapper{min-height:56px;height:auto}nav.nav-extended .nav-content{position:relative;line-height:normal}nav a{color:var(--mm-nav-text, #fff)}nav i,nav [class^=mdi-],nav [class*=mdi-],nav i.material-icons{display:block;font-size:24px;height:56px;line-height:56px}nav .nav-wrapper{position:relative;height:100%}@media only screen and (min-width : 993px){nav a.sidenav-trigger{display:none}}nav .sidenav-trigger{float:left;position:relative;z-index:1;height:56px;margin:0 18px}nav .sidenav-trigger i{height:56px;line-height:56px}nav .brand-logo{position:absolute;color:#fff;display:inline-block;font-size:2.1rem;padding:0}nav .brand-logo.center{left:50%;transform:translateX(-50%)}@media only screen and (max-width : 992px){nav .brand-logo{left:50%;transform:translateX(-50%)}nav .brand-logo.left,nav .brand-logo.right{padding:0;transform:none}nav .brand-logo.left{left:.5rem}nav .brand-logo.right{right:.5rem;left:auto}}nav .brand-logo.right{right:.5rem;padding:0}nav .brand-logo i,nav .brand-logo [class^=mdi-],nav .brand-logo [class*=mdi-],nav .brand-logo i.material-icons{float:left;margin-right:15px}nav .nav-title{display:inline-block;font-size:32px;padding:28px 0}nav ul{margin:0}nav ul li{transition:background-color .3s;float:left;padding:0}nav ul li.active{background-color:var(--mm-primary-color-light, rgba(0, 0, 0, 0.1))}nav ul li.active a{color:var(--mm-nav-active-text, #fff)}nav ul li.active i,nav ul li.active .material-icons{color:var(--mm-nav-active-text, #fff)}nav ul a{transition:background-color .3s;font-size:1rem;color:#fff;display:block;padding:0 15px;cursor:pointer}nav ul a.btn,nav ul a.btn-large,nav ul a.btn-flat,nav ul a.btn-floating{margin-top:-2px;margin-left:15px;margin-right:15px}nav ul a.btn>.material-icons,nav ul a.btn-large>.material-icons,nav ul a.btn-flat>.material-icons,nav ul a.btn-floating>.material-icons{height:inherit;line-height:inherit}nav ul a:hover{background-color:rgba(0,0,0,.1)}nav ul.left{float:left}nav form{height:100%}nav .input-field{margin:0;height:100%}nav .input-field input{height:100%;font-size:1.2rem;border:none;padding-left:2rem}nav .input-field input:focus,nav .input-field input[type=text]:valid,nav .input-field input[type=password]:valid,nav .input-field input[type=email]:valid,nav .input-field input[type=url]:valid,nav .input-field input[type=date]:valid{border:none;box-shadow:none}nav .input-field label{top:0;left:0}nav .input-field label i{color:hsla(0,0%,100%,.7);transition:color .3s}nav .input-field label.active i{color:var(--mm-nav-text, #fff)}.navbar-fixed{position:relative;height:56px;z-index:997}.navbar-fixed nav{position:fixed}@media only screen and (min-width : 601px){nav.nav-extended .nav-wrapper{min-height:64px}nav,nav .nav-wrapper i,nav a.sidenav-trigger,nav a.sidenav-trigger i{height:64px;line-height:64px}.navbar-fixed{height:64px}}a{text-decoration:none}html{line-height:1.5;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;font-weight:normal;color:rgba(0,0,0,.87)}@media only screen and (min-width: 0){html{font-size:14px}}@media only screen and (min-width: 992px){html{font-size:14.5px}}@media only screen and (min-width: 1200px){html{font-size:15px}}h1,h2,h3,h4,h5,h6{font-weight:400;line-height:1.3}h1 a,h2 a,h3 a,h4 a,h5 a,h6 a{font-weight:inherit}h1{font-size:4.2rem;line-height:110%;margin:2.8rem 0 1.68rem 0}h2{font-size:3.56rem;line-height:110%;margin:2.3733333333rem 0 1.424rem 0}h3{font-size:2.92rem;line-height:110%;margin:1.9466666667rem 0 1.168rem 0}h4{font-size:2.28rem;line-height:110%;margin:1.52rem 0 .912rem 0}h5{font-size:1.64rem;line-height:110%;margin:1.0933333333rem 0 .656rem 0}h6{font-size:1.15rem;line-height:110%;margin:.7666666667rem 0 .46rem 0}em{font-style:italic}strong{font-weight:500}small{font-size:75%}.light{font-weight:300}.thin{font-weight:200}@media only screen and (min-width: 360px){.flow-text{font-size:1.2rem}}@media only screen and (min-width: 390px){.flow-text{font-size:1.224rem}}@media only screen and (min-width: 420px){.flow-text{font-size:1.248rem}}@media only screen and (min-width: 450px){.flow-text{font-size:1.272rem}}@media only screen and (min-width: 480px){.flow-text{font-size:1.296rem}}@media only screen and (min-width: 510px){.flow-text{font-size:1.32rem}}@media only screen and (min-width: 540px){.flow-text{font-size:1.344rem}}@media only screen and (min-width: 570px){.flow-text{font-size:1.368rem}}@media only screen and (min-width: 600px){.flow-text{font-size:1.392rem}}@media only screen and (min-width: 630px){.flow-text{font-size:1.416rem}}@media only screen and (min-width: 660px){.flow-text{font-size:1.44rem}}@media only screen and (min-width: 690px){.flow-text{font-size:1.464rem}}@media only screen and (min-width: 720px){.flow-text{font-size:1.488rem}}@media only screen and (min-width: 750px){.flow-text{font-size:1.512rem}}@media only screen and (min-width: 780px){.flow-text{font-size:1.536rem}}@media only screen and (min-width: 810px){.flow-text{font-size:1.56rem}}@media only screen and (min-width: 840px){.flow-text{font-size:1.584rem}}@media only screen and (min-width: 870px){.flow-text{font-size:1.608rem}}@media only screen and (min-width: 900px){.flow-text{font-size:1.632rem}}@media only screen and (min-width: 930px){.flow-text{font-size:1.656rem}}@media only screen and (min-width: 960px){.flow-text{font-size:1.68rem}}@media only screen and (max-width: 360px){.flow-text{font-size:1.2rem}}.scale-transition{transition:transform .3s cubic-bezier(0.53, 0.01, 0.36, 1.63) !important}.scale-transition.scale-out{transform:scale(0);transition:transform .2s !important}.scale-transition.scale-in{transform:scale(1)}.card-panel{transition:box-shadow .25s;padding:24px;margin:.5rem 0 1rem 0;border-radius:2px;background-color:#fff}.card{position:relative;margin:.5rem 0 1rem 0;background-color:#fff;transition:box-shadow .25s;border-radius:2px}.card .card-title{font-size:24px;font-weight:300}.card .card-title.activator{cursor:pointer}.card.small,.card.medium,.card.large{position:relative}.card.small .card-image,.card.medium .card-image,.card.large .card-image{max-height:60%;overflow:hidden}.card.small .card-image+.card-content,.card.medium .card-image+.card-content,.card.large .card-image+.card-content{max-height:40%}.card.small .card-content,.card.medium .card-content,.card.large .card-content{max-height:100%;overflow:hidden}.card.small .card-action,.card.medium .card-action,.card.large .card-action{position:absolute;bottom:0;left:0;right:0}.card.small{height:300px}.card.medium{height:400px}.card.large{height:500px}.card.horizontal{display:flex}.card.horizontal.small .card-image,.card.horizontal.medium .card-image,.card.horizontal.large .card-image{height:100%;max-height:none;overflow:visible}.card.horizontal.small .card-image img,.card.horizontal.medium .card-image img,.card.horizontal.large .card-image img{height:100%}.card.horizontal .card-image{max-width:50%}.card.horizontal .card-image img{border-radius:2px 0 0 2px;max-width:100%;width:auto}.card.horizontal .card-stacked{display:flex;flex-direction:column;flex:1;position:relative}.card.horizontal .card-stacked .card-content{flex-grow:1}.card.sticky-action .card-action{z-index:2}.card.sticky-action .card-reveal{z-index:1;padding-bottom:64px}.card .card-image{position:relative}.card .card-image img{display:block;border-radius:2px 2px 0 0;position:relative;left:0;right:0;top:0;bottom:0;width:100%}.card .card-image .card-title{color:#fff;position:absolute;bottom:0;left:0;max-width:100%;padding:24px}.card .card-content{padding:24px;border-radius:0 0 2px 2px}.card .card-content p{margin:0}.card .card-content .card-title{display:block;line-height:32px;margin-bottom:8px}.card .card-content .card-title i{line-height:32px}.card .card-action{background-color:inherit;border-top:1px solid rgba(160,160,160,.2);position:relative;padding:16px 24px}.card .card-action:last-child{border-radius:0 0 2px 2px}.card .card-action a:not(.btn):not(.btn-large):not(.btn-floating){color:#ffab40;margin-right:24px;transition:color .3s ease;text-transform:uppercase}.card .card-action a:not(.btn):not(.btn-large):not(.btn-floating):hover{color:rgb(255,215.8586387435,166)}.card .card-reveal{padding:24px;position:absolute;background-color:#fff;width:100%;overflow-y:auto;left:0;top:100%;height:100%;z-index:3;display:none}.card .card-reveal .card-title{cursor:pointer;display:block}#toast-container{display:block;position:fixed;z-index:10000}@media only screen and (max-width : 600px){#toast-container{min-width:100%;bottom:0%}}@media only screen and (min-width : 601px)and (max-width : 992px){#toast-container{left:5%;bottom:7%;max-width:90%}}@media only screen and (min-width : 993px){#toast-container{top:10%;right:7%;max-width:86%}}.toast{border-radius:2px;top:35px;width:auto;margin-top:10px;position:relative;max-width:100%;height:auto;min-height:48px;line-height:1.5em;background-color:#323232;padding:10px 25px;font-size:1.1rem;font-weight:300;color:#fff;display:flex;align-items:center;justify-content:space-between;cursor:default}.toast .toast-action{color:#eeff41;font-weight:500;margin-right:-25px;margin-left:3rem}.toast.rounded{border-radius:24px}@media only screen and (max-width : 600px){.toast{width:100%;border-radius:0}}.tabs{position:relative;overflow-x:auto;overflow-y:hidden;height:48px;width:100%;background-color:var(--mm-background-color, #fff);color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));margin:0 auto;white-space:nowrap}.tabs.tabs-transparent{background-color:rgba(0,0,0,0)}.tabs.tabs-transparent .tab a,.tabs.tabs-transparent .tab.disabled a,.tabs.tabs-transparent .tab.disabled a:hover{color:hsla(0,0%,100%,.7)}.tabs.tabs-transparent .tab a:hover,.tabs.tabs-transparent .tab a.active{color:#fff}.tabs.tabs-transparent .indicator{background-color:#fff}.tabs.tabs-fixed-width{display:flex}.tabs.tabs-fixed-width .tab{flex-grow:1}.tabs .tab{display:inline-block;text-align:center;line-height:48px;height:48px;padding:0;margin:0;text-transform:uppercase}.tabs .tab a{color:var(--mm-text-secondary, rgba(238, 110, 115, 0.7));display:block;width:100%;height:100%;padding:0 24px;font-size:14px;text-overflow:ellipsis;overflow:hidden;transition:color .28s ease,background-color .28s ease}.tabs .tab a:focus,.tabs .tab a:focus.active{background-color:hsla(357.65625,79.012345679%,83.2352941176%,.2);outline:none}.tabs .tab a:hover,.tabs .tab a.active{background-color:rgba(0,0,0,0);color:var(--mm-primary-color, #ee6e73)}.tabs .tab.disabled a,.tabs .tab.disabled a:hover{color:var(--mm-text-disabled, rgba(238, 110, 115, 0.4));cursor:default}.tabs .indicator{position:absolute;bottom:0;height:2px;background-color:hsl(357.65625,79.012345679%,83.2352941176%);will-change:left,right}@media only screen and (max-width : 992px){.tabs{display:flex}.tabs .tab{flex-grow:1}.tabs .tab a{padding:0 12px}}.material-tooltip{padding:10px 8px;font-size:1rem;z-index:2000;background-color:rgba(0,0,0,0);border-radius:2px;color:#fff;min-height:36px;line-height:120%;opacity:0;position:absolute;text-align:center;max-width:calc(100% - 4px);overflow:hidden;left:0;top:0;pointer-events:none;visibility:hidden;background-color:#323232}.backdrop{position:absolute;opacity:0;height:7px;width:14px;border-radius:0 0 50% 50%;background-color:#323232;z-index:-1;transform-origin:50% 0%;visibility:hidden}.btn,.btn-small,.btn-large,.btn-flat{border:none;border-radius:2px;display:inline-block;height:36px;line-height:36px;padding:0 16px;text-transform:uppercase;vertical-align:middle;-webkit-tap-highlight-color:rgba(0,0,0,0)}.btn.disabled,.btn-floating.disabled,.btn-large.disabled,.btn-small.disabled,.btn-flat.disabled,.btn:disabled,.btn-floating:disabled,.btn-large:disabled,.btn-small:disabled,.btn-flat:disabled,.btn[disabled],.btn-floating[disabled],.btn-large[disabled],.btn-small[disabled],.btn-flat[disabled]{pointer-events:none;background-color:#dfdfdf !important;box-shadow:none;color:#9f9f9f !important;cursor:default}.btn.disabled:hover,.btn-floating.disabled:hover,.btn-large.disabled:hover,.btn-small.disabled:hover,.btn-flat.disabled:hover,.btn:disabled:hover,.btn-floating:disabled:hover,.btn-large:disabled:hover,.btn-small:disabled:hover,.btn-flat:disabled:hover,.btn[disabled]:hover,.btn-floating[disabled]:hover,.btn-large[disabled]:hover,.btn-small[disabled]:hover,.btn-flat[disabled]:hover{background-color:#dfdfdf !important;color:#9f9f9f !important}.btn,.btn-small,.btn-large,.btn-floating,.btn-flat{font-size:14px;outline:0}.btn i,.btn-floating i,.btn-large i,.btn-small i,.btn-flat i{font-size:1.3rem;line-height:inherit}.btn:focus,.btn-small:focus,.btn-large:focus,.btn-floating:focus{background-color:rgb(28.5,124.5,115.5)}.btn,.btn-small,.btn-large{text-decoration:none;color:#fff;background-color:#26a69a;text-align:center;letter-spacing:.5px;transition:background-color .2s ease-out;cursor:pointer}.btn:hover,.btn-small:hover,.btn-large:hover{background-color:rgb(42.75,186.75,173.25)}.btn-floating{display:inline-block;color:#fff;position:relative;overflow:hidden;z-index:1;width:40px;height:40px;line-height:40px;padding:0;background-color:#26a69a;border-radius:50%;transition:background-color .3s;cursor:pointer;vertical-align:middle}.btn-floating:hover{background-color:#26a69a}.btn-floating:before{border-radius:0}.btn-floating.btn-large{width:56px;height:56px;padding:0}.btn-floating.btn-large.halfway-fab{bottom:-28px}.btn-floating.btn-large i{line-height:56px}.btn-floating.btn-small{width:32.4px;height:32.4px}.btn-floating.btn-small.halfway-fab{bottom:-16.2px}.btn-floating.btn-small i{line-height:32.4px}.btn-floating.halfway-fab{position:absolute;right:24px;bottom:-20px}.btn-floating.halfway-fab.left{right:auto;left:24px}.btn-floating i{width:inherit;display:inline-block;text-align:center;color:#fff;font-size:1.6rem;line-height:40px}button.btn-floating{border:none}.fixed-action-btn{position:fixed;right:23px;bottom:23px;padding-top:15px;margin-bottom:0;z-index:997}.fixed-action-btn.active ul{visibility:visible}.fixed-action-btn.direction-left,.fixed-action-btn.direction-right{padding:0 0 0 15px}.fixed-action-btn.direction-left ul,.fixed-action-btn.direction-right ul{text-align:right;right:64px;top:50%;transform:translateY(-50%);height:100%;left:auto;width:500px}.fixed-action-btn.direction-left ul li,.fixed-action-btn.direction-right ul li{display:inline-block;margin:7.5px 15px 0 0}.fixed-action-btn.direction-right{padding:0 15px 0 0}.fixed-action-btn.direction-right ul{text-align:left;direction:rtl;left:64px;right:auto}.fixed-action-btn.direction-right ul li{margin:7.5px 0 0 15px}.fixed-action-btn.direction-bottom{padding:0 0 15px 0}.fixed-action-btn.direction-bottom ul{top:64px;bottom:auto;display:flex;flex-direction:column-reverse}.fixed-action-btn.direction-bottom ul li{margin:15px 0 0 0}.fixed-action-btn.toolbar{padding:0;height:56px}.fixed-action-btn.toolbar.active>a i{opacity:0}.fixed-action-btn.toolbar ul{display:flex;top:0;bottom:0;z-index:1}.fixed-action-btn.toolbar ul li{flex:1;display:inline-block;margin:0;height:100%;transition:none}.fixed-action-btn.toolbar ul li a{display:block;overflow:hidden;position:relative;width:100%;height:100%;background-color:rgba(0,0,0,0);box-shadow:none;color:#fff;line-height:56px;z-index:1}.fixed-action-btn.toolbar ul li a i{line-height:inherit}.fixed-action-btn ul{left:0;right:0;text-align:center;position:absolute;bottom:64px;margin:0;visibility:hidden}.fixed-action-btn ul li{margin-bottom:15px}.fixed-action-btn ul a.btn-floating{opacity:0}.fixed-action-btn .fab-backdrop{position:absolute;top:0;left:0;z-index:-1;width:40px;height:40px;background-color:#26a69a;border-radius:50%;transform:scale(0)}.btn-flat{box-shadow:none;background-color:rgba(0,0,0,0);color:var(--mm-button-flat-text, #343434);cursor:pointer;transition:background-color .2s}.btn-flat:focus,.btn-flat:hover{box-shadow:none}.btn-flat:focus{background-color:var(--mm-border-color, rgba(0, 0, 0, 0.1))}.btn-flat.disabled,.btn-flat.btn-flat[disabled]{background-color:rgba(0,0,0,0) !important;color:var(--mm-text-disabled, rgb(178.5, 178.5, 178.5)) !important;cursor:default}.btn-large{height:54px;line-height:54px;font-size:15px;padding:0 28px}.btn-large i{font-size:1.6rem}.btn-small{height:32.4px;line-height:32.4px;font-size:13px}.btn-small i{font-size:1.2rem}.btn-block{display:block}.dropdown-content{background-color:var(--mm-surface-color, #fff);margin:0;display:none;min-width:100px;overflow-y:auto;opacity:0;position:absolute;left:0;top:0;z-index:9999;transform-origin:0 0}.dropdown-content:focus{outline:0}.dropdown-content li{clear:both;color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));cursor:pointer;min-height:50px;line-height:1.5rem;width:100%;text-align:left}.dropdown-content li:hover,.dropdown-content li.active{background-color:var(--mm-dropdown-hover, #eee)}.dropdown-content li:focus{outline:none}.dropdown-content li.divider{min-height:0;height:1px}.dropdown-content li>a,.dropdown-content li>span{font-size:16px;color:var(--mm-text-primary, #26a69a);display:block;line-height:22px;padding:14px 16px}.dropdown-content li>span>label{top:1px;left:0;height:18px}.dropdown-content li>a>i{height:inherit;line-height:inherit;float:left;margin:0 24px 0 0;width:24px}body.keyboard-focused .dropdown-content li:focus{background-color:var(--mm-dropdown-focus, rgb(217.6, 217.6, 217.6))}.input-field.col .dropdown-content [type=checkbox]+label{top:1px;left:0;height:18px;transform:none}.dropdown-trigger{cursor:pointer}/*!
 * Waves v0.6.0
 * http://fian.my.id/Waves
 *
 * Copyright 2014 Alfiana E. Sibuea and other contributors
 * Released under the MIT license
 * https://github.com/fians/Waves/blob/master/LICENSE
 */.waves-effect{position:relative;cursor:pointer;display:inline-block;overflow:hidden;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:middle;z-index:1;transition:.3s ease-out}.waves-effect .waves-ripple{position:absolute;border-radius:50%;width:20px;height:20px;margin-top:-10px;margin-left:-10px;opacity:0;background:rgba(0,0,0,.2);transition:all .7s ease-out;transition-property:transform,opacity;transform:scale(0);pointer-events:none}.waves-effect.waves-light .waves-ripple{background-color:hsla(0,0%,100%,.45)}.waves-effect.waves-red .waves-ripple{background-color:rgba(244,67,54,.7)}.waves-effect.waves-yellow .waves-ripple{background-color:rgba(255,235,59,.7)}.waves-effect.waves-orange .waves-ripple{background-color:rgba(255,152,0,.7)}.waves-effect.waves-purple .waves-ripple{background-color:rgba(156,39,176,.7)}.waves-effect.waves-green .waves-ripple{background-color:rgba(76,175,80,.7)}.waves-effect.waves-teal .waves-ripple{background-color:rgba(0,150,136,.7)}.waves-effect input[type=button],.waves-effect input[type=reset],.waves-effect input[type=submit]{border:0;font-style:normal;font-size:inherit;text-transform:inherit;background:none}.waves-effect img{position:relative;z-index:-1}.waves-notransition{transition:none !important}.waves-circle{transform:translateZ(0);-webkit-mask-image:-webkit-radial-gradient(circle, white 100%, black 100%)}.waves-input-wrapper{border-radius:.2em;vertical-align:bottom}.waves-input-wrapper .waves-button-input{position:relative;top:0;left:0;z-index:1}.waves-circle{text-align:center;width:2.5em;height:2.5em;line-height:2.5em;border-radius:50%;-webkit-mask-image:none}.waves-block{display:block}.waves-effect .waves-ripple{z-index:-1}.modal{display:none;position:fixed;left:0;right:0;background-color:var(--mm-modal-background, #fafafa);color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));padding:0;max-height:70%;width:55%;margin:auto;overflow-y:auto;border-radius:2px;will-change:top,opacity}.modal:focus{outline:none}@media only screen and (max-width : 992px){.modal{width:80%}}.modal h1,.modal h2,.modal h3,.modal h4{margin-top:0}.modal .modal-content{padding:24px;background-color:var(--mm-modal-background, #fafafa);color:var(--mm-text-primary, rgba(0, 0, 0, 0.87))}.modal .modal-close{cursor:pointer}.modal .modal-footer{border-radius:0 0 2px 2px;background-color:var(--mm-modal-background, #fafafa);padding:4px 6px;height:56px;width:100%;text-align:right}.modal .modal-footer .btn,.modal .modal-footer .btn-flat{margin:6px 0}.modal-overlay{position:fixed;z-index:999;top:-25%;left:0;bottom:0;right:0;height:125%;width:100%;background:#000;display:none;will-change:opacity}.modal.modal-fixed-footer{padding:0;height:70%}.modal.modal-fixed-footer .modal-content{position:absolute;height:calc(100% - 56px);max-height:100%;width:100%;overflow-y:auto}.modal.modal-fixed-footer .modal-footer{border-top:1px solid rgba(0,0,0,.1);position:absolute;bottom:0}.modal.bottom-sheet{top:auto;bottom:-100%;margin:0;width:100%;max-height:45%;border-radius:0;will-change:bottom,opacity}.collapsible{border-top:1px solid var(--mm-border-color, #ddd);border-right:1px solid var(--mm-border-color, #ddd);border-left:1px solid var(--mm-border-color, #ddd);margin:.5rem 0 1rem 0}.collapsible-header{display:flex;cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);line-height:1.5;padding:1rem;border-bottom:1px solid var(--mm-border-color, #ddd)}.collapsible-header:focus{outline:0}.collapsible-header i{width:2rem;font-size:1.6rem;display:inline-block;text-align:center;margin-right:1rem}.keyboard-focused .collapsible-header:focus{background-color:var(--mm-border-color, rgba(0, 0, 0, 0.05))}.collapsible-body{display:none;border-bottom:1px solid var(--mm-border-color, #ddd);box-sizing:border-box;padding:2rem}.sidenav .collapsible,.sidenav.sidenav-fixed .collapsible{border:none;box-shadow:none}.sidenav .collapsible li,.sidenav.sidenav-fixed .collapsible li{padding:0}.sidenav .collapsible-header,.sidenav.sidenav-fixed .collapsible-header{background-color:rgba(0,0,0,0);border:none;line-height:inherit;height:inherit;padding:0 16px}.sidenav .collapsible-header:hover,.sidenav.sidenav-fixed .collapsible-header:hover{background-color:rgba(0,0,0,.05)}.sidenav .collapsible-header i,.sidenav.sidenav-fixed .collapsible-header i{line-height:inherit}.sidenav .collapsible-body,.sidenav.sidenav-fixed .collapsible-body{border:0;background-color:var(--mm-surface-color, #fff);color:var(--mm-text-primary, rgba(0, 0, 0, 0.87))}.sidenav .collapsible-body li a,.sidenav.sidenav-fixed .collapsible-body li a{padding:0 23.5px 0 31px}.collapsible.popout{border:none;box-shadow:none}.collapsible.popout>li{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);margin:0 24px;transition:margin .35s cubic-bezier(0.25, 0.46, 0.45, 0.94)}.collapsible.popout>li.active{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);margin:16px 0}.chip{display:inline-block;height:32px;font-size:13px;font-weight:500;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));line-height:32px;padding:0 12px;border-radius:16px;background-color:var(--mm-chip-bg, #e4e4e4);margin-bottom:5px;margin-right:5px}.chip:focus{outline:none;background-color:var(--mm-primary-color, #26a69a);color:var(--mm-button-text, #fff)}.chip>img{float:left;margin:0 8px 0 -12px;height:32px;width:32px;border-radius:50%}.chip .close{cursor:pointer;float:right;font-size:16px;line-height:32px;padding-left:8px}.chips{border:none;border-bottom:1px solid var(--mm-input-border, #9e9e9e);box-shadow:none;margin:0 0 8px 0;min-height:45px;outline:none;transition:all .3s}.chips.focus{border-bottom:1px solid var(--mm-primary-color, #26a69a);box-shadow:0 1px 0 0 var(--mm-primary-color, #26a69a)}.chips:hover{cursor:text}.chips .input{background:none;border:0;color:var(--mm-text-primary, rgba(0, 0, 0, 0.6));display:inline-block;font-size:16px;height:3rem;line-height:32px;outline:0;margin:0;padding:0 !important;width:120px !important}.chips .input:focus{border:0 !important;box-shadow:none !important}.chips .autocomplete-content{margin-top:0;margin-bottom:0}.prefix~.chips{margin-left:3rem;width:92%;width:calc(100% - 3rem)}.chips:empty~label{font-size:.8rem;transform:translateY(-140%)}.materialboxed{display:block;cursor:zoom-in;position:relative;transition:opacity .4s;-webkit-backface-visibility:hidden}.materialboxed:hover:not(.active){opacity:.8}.materialboxed.active{cursor:zoom-out}#materialbox-overlay{position:fixed;top:0;right:0;bottom:0;left:0;background-color:#292929;z-index:1000;will-change:opacity}.materialbox-caption{position:fixed;display:none;color:#fff;line-height:50px;bottom:0;left:0;width:100%;text-align:center;padding:0% 15%;height:50px;z-index:1000;-webkit-font-smoothing:antialiased}::placeholder{color:var(--mm-text-hint, #d1d1d1)}input:not([type]):not(.browser-default),input[type=text]:not(.browser-default),input[type=password]:not(.browser-default),input[type=email]:not(.browser-default),input[type=url]:not(.browser-default),input[type=time]:not(.browser-default),input[type=date]:not(.browser-default),input[type=datetime]:not(.browser-default),input[type=datetime-local]:not(.browser-default),input[type=tel]:not(.browser-default),input[type=number]:not(.browser-default),input[type=search]:not(.browser-default),textarea.materialize-textarea{background-color:rgba(0,0,0,0);border:none;border-bottom:1px solid var(--mm-input-border, 1px solid #9e9e9e);border-radius:0;outline:none;height:3rem;width:100%;font-size:16px;margin:0 0 8px 0;padding:0;box-shadow:none;box-sizing:content-box;transition:box-shadow .3s,border .3s;color:var(--mm-input-text, inherit)}input:not([type]):not(.browser-default):disabled,input:not([type]):not(.browser-default)[readonly=readonly],input[type=text]:not(.browser-default):disabled,input[type=text]:not(.browser-default)[readonly=readonly],input[type=password]:not(.browser-default):disabled,input[type=password]:not(.browser-default)[readonly=readonly],input[type=email]:not(.browser-default):disabled,input[type=email]:not(.browser-default)[readonly=readonly],input[type=url]:not(.browser-default):disabled,input[type=url]:not(.browser-default)[readonly=readonly],input[type=time]:not(.browser-default):disabled,input[type=time]:not(.browser-default)[readonly=readonly],input[type=date]:not(.browser-default):disabled,input[type=date]:not(.browser-default)[readonly=readonly],input[type=datetime]:not(.browser-default):disabled,input[type=datetime]:not(.browser-default)[readonly=readonly],input[type=datetime-local]:not(.browser-default):disabled,input[type=datetime-local]:not(.browser-default)[readonly=readonly],input[type=tel]:not(.browser-default):disabled,input[type=tel]:not(.browser-default)[readonly=readonly],input[type=number]:not(.browser-default):disabled,input[type=number]:not(.browser-default)[readonly=readonly],input[type=search]:not(.browser-default):disabled,input[type=search]:not(.browser-default)[readonly=readonly],textarea.materialize-textarea:disabled,textarea.materialize-textarea[readonly=readonly]{color:var(--mm-text-disabled, rgba(0, 0, 0, 0.42));border-bottom:1px dotted var(--mm-input-border, 1px dotted rgba(0, 0, 0, 0.42))}input:not([type]):not(.browser-default):disabled+label,input:not([type]):not(.browser-default)[readonly=readonly]+label,input[type=text]:not(.browser-default):disabled+label,input[type=text]:not(.browser-default)[readonly=readonly]+label,input[type=password]:not(.browser-default):disabled+label,input[type=password]:not(.browser-default)[readonly=readonly]+label,input[type=email]:not(.browser-default):disabled+label,input[type=email]:not(.browser-default)[readonly=readonly]+label,input[type=url]:not(.browser-default):disabled+label,input[type=url]:not(.browser-default)[readonly=readonly]+label,input[type=time]:not(.browser-default):disabled+label,input[type=time]:not(.browser-default)[readonly=readonly]+label,input[type=date]:not(.browser-default):disabled+label,input[type=date]:not(.browser-default)[readonly=readonly]+label,input[type=datetime]:not(.browser-default):disabled+label,input[type=datetime]:not(.browser-default)[readonly=readonly]+label,input[type=datetime-local]:not(.browser-default):disabled+label,input[type=datetime-local]:not(.browser-default)[readonly=readonly]+label,input[type=tel]:not(.browser-default):disabled+label,input[type=tel]:not(.browser-default)[readonly=readonly]+label,input[type=number]:not(.browser-default):disabled+label,input[type=number]:not(.browser-default)[readonly=readonly]+label,input[type=search]:not(.browser-default):disabled+label,input[type=search]:not(.browser-default)[readonly=readonly]+label,textarea.materialize-textarea:disabled+label,textarea.materialize-textarea[readonly=readonly]+label{color:var(--mm-text-disabled, rgba(0, 0, 0, 0.42))}input:not([type]):not(.browser-default):focus:not([readonly]),input[type=text]:not(.browser-default):focus:not([readonly]),input[type=password]:not(.browser-default):focus:not([readonly]),input[type=email]:not(.browser-default):focus:not([readonly]),input[type=url]:not(.browser-default):focus:not([readonly]),input[type=time]:not(.browser-default):focus:not([readonly]),input[type=date]:not(.browser-default):focus:not([readonly]),input[type=datetime]:not(.browser-default):focus:not([readonly]),input[type=datetime-local]:not(.browser-default):focus:not([readonly]),input[type=tel]:not(.browser-default):focus:not([readonly]),input[type=number]:not(.browser-default):focus:not([readonly]),input[type=search]:not(.browser-default):focus:not([readonly]),textarea.materialize-textarea:focus:not([readonly]){border-bottom:1px solid var(--mm-input-border-focus, #26a69a);box-shadow:0 1px 0 0 var(--mm-input-border-focus, #26a69a)}input:not([type]):not(.browser-default):focus:not([readonly])+label,input[type=text]:not(.browser-default):focus:not([readonly])+label,input[type=password]:not(.browser-default):focus:not([readonly])+label,input[type=email]:not(.browser-default):focus:not([readonly])+label,input[type=url]:not(.browser-default):focus:not([readonly])+label,input[type=time]:not(.browser-default):focus:not([readonly])+label,input[type=date]:not(.browser-default):focus:not([readonly])+label,input[type=datetime]:not(.browser-default):focus:not([readonly])+label,input[type=datetime-local]:not(.browser-default):focus:not([readonly])+label,input[type=tel]:not(.browser-default):focus:not([readonly])+label,input[type=number]:not(.browser-default):focus:not([readonly])+label,input[type=search]:not(.browser-default):focus:not([readonly])+label,textarea.materialize-textarea:focus:not([readonly])+label{color:var(--mm-input-border-focus, #26a69a)}input:not([type]):not(.browser-default):focus.valid~label,input[type=text]:not(.browser-default):focus.valid~label,input[type=password]:not(.browser-default):focus.valid~label,input[type=email]:not(.browser-default):focus.valid~label,input[type=url]:not(.browser-default):focus.valid~label,input[type=time]:not(.browser-default):focus.valid~label,input[type=date]:not(.browser-default):focus.valid~label,input[type=datetime]:not(.browser-default):focus.valid~label,input[type=datetime-local]:not(.browser-default):focus.valid~label,input[type=tel]:not(.browser-default):focus.valid~label,input[type=number]:not(.browser-default):focus.valid~label,input[type=search]:not(.browser-default):focus.valid~label,textarea.materialize-textarea:focus.valid~label{color:#4caf50}input:not([type]):not(.browser-default):focus.invalid~label,input[type=text]:not(.browser-default):focus.invalid~label,input[type=password]:not(.browser-default):focus.invalid~label,input[type=email]:not(.browser-default):focus.invalid~label,input[type=url]:not(.browser-default):focus.invalid~label,input[type=time]:not(.browser-default):focus.invalid~label,input[type=date]:not(.browser-default):focus.invalid~label,input[type=datetime]:not(.browser-default):focus.invalid~label,input[type=datetime-local]:not(.browser-default):focus.invalid~label,input[type=tel]:not(.browser-default):focus.invalid~label,input[type=number]:not(.browser-default):focus.invalid~label,input[type=search]:not(.browser-default):focus.invalid~label,textarea.materialize-textarea:focus.invalid~label{color:#f44336}input:not([type]):not(.browser-default).validate+label,input[type=text]:not(.browser-default).validate+label,input[type=password]:not(.browser-default).validate+label,input[type=email]:not(.browser-default).validate+label,input[type=url]:not(.browser-default).validate+label,input[type=time]:not(.browser-default).validate+label,input[type=date]:not(.browser-default).validate+label,input[type=datetime]:not(.browser-default).validate+label,input[type=datetime-local]:not(.browser-default).validate+label,input[type=tel]:not(.browser-default).validate+label,input[type=number]:not(.browser-default).validate+label,input[type=search]:not(.browser-default).validate+label,textarea.materialize-textarea.validate+label{width:100%}input:not([type]):not(.browser-default):-webkit-autofill,input:not([type]):not(.browser-default):-webkit-autofill:hover,input:not([type]):not(.browser-default):-webkit-autofill:focus,input:not([type]):not(.browser-default):-webkit-autofill:active,input[type=text]:not(.browser-default):-webkit-autofill,input[type=text]:not(.browser-default):-webkit-autofill:hover,input[type=text]:not(.browser-default):-webkit-autofill:focus,input[type=text]:not(.browser-default):-webkit-autofill:active,input[type=password]:not(.browser-default):-webkit-autofill,input[type=password]:not(.browser-default):-webkit-autofill:hover,input[type=password]:not(.browser-default):-webkit-autofill:focus,input[type=password]:not(.browser-default):-webkit-autofill:active,input[type=email]:not(.browser-default):-webkit-autofill,input[type=email]:not(.browser-default):-webkit-autofill:hover,input[type=email]:not(.browser-default):-webkit-autofill:focus,input[type=email]:not(.browser-default):-webkit-autofill:active,input[type=url]:not(.browser-default):-webkit-autofill,input[type=url]:not(.browser-default):-webkit-autofill:hover,input[type=url]:not(.browser-default):-webkit-autofill:focus,input[type=url]:not(.browser-default):-webkit-autofill:active,input[type=time]:not(.browser-default):-webkit-autofill,input[type=time]:not(.browser-default):-webkit-autofill:hover,input[type=time]:not(.browser-default):-webkit-autofill:focus,input[type=time]:not(.browser-default):-webkit-autofill:active,input[type=date]:not(.browser-default):-webkit-autofill,input[type=date]:not(.browser-default):-webkit-autofill:hover,input[type=date]:not(.browser-default):-webkit-autofill:focus,input[type=date]:not(.browser-default):-webkit-autofill:active,input[type=datetime]:not(.browser-default):-webkit-autofill,input[type=datetime]:not(.browser-default):-webkit-autofill:hover,input[type=datetime]:not(.browser-default):-webkit-autofill:focus,input[type=datetime]:not(.browser-default):-webkit-autofill:active,input[type=datetime-local]:not(.browser-default):-webkit-autofill,input[type=datetime-local]:not(.browser-default):-webkit-autofill:hover,input[type=datetime-local]:not(.browser-default):-webkit-autofill:focus,input[type=datetime-local]:not(.browser-default):-webkit-autofill:active,input[type=tel]:not(.browser-default):-webkit-autofill,input[type=tel]:not(.browser-default):-webkit-autofill:hover,input[type=tel]:not(.browser-default):-webkit-autofill:focus,input[type=tel]:not(.browser-default):-webkit-autofill:active,input[type=number]:not(.browser-default):-webkit-autofill,input[type=number]:not(.browser-default):-webkit-autofill:hover,input[type=number]:not(.browser-default):-webkit-autofill:focus,input[type=number]:not(.browser-default):-webkit-autofill:active,input[type=search]:not(.browser-default):-webkit-autofill,input[type=search]:not(.browser-default):-webkit-autofill:hover,input[type=search]:not(.browser-default):-webkit-autofill:focus,input[type=search]:not(.browser-default):-webkit-autofill:active,textarea.materialize-textarea:-webkit-autofill,textarea.materialize-textarea:-webkit-autofill:hover,textarea.materialize-textarea:-webkit-autofill:focus,textarea.materialize-textarea:-webkit-autofill:active{-webkit-box-shadow:0 0 0 30px var(--mm-input-background, transparent) inset !important;-webkit-text-fill-color:var(--mm-input-text, inherit) !important;background-color:rgba(0,0,0,0) !important;color:var(--mm-input-text, inherit) !important;transition:background-color 5000s ease-in-out 0s}input:not([type]):not(.browser-default):-ms-input-placeholder,input[type=text]:not(.browser-default):-ms-input-placeholder,input[type=password]:not(.browser-default):-ms-input-placeholder,input[type=email]:not(.browser-default):-ms-input-placeholder,input[type=url]:not(.browser-default):-ms-input-placeholder,input[type=time]:not(.browser-default):-ms-input-placeholder,input[type=date]:not(.browser-default):-ms-input-placeholder,input[type=datetime]:not(.browser-default):-ms-input-placeholder,input[type=datetime-local]:not(.browser-default):-ms-input-placeholder,input[type=tel]:not(.browser-default):-ms-input-placeholder,input[type=number]:not(.browser-default):-ms-input-placeholder,input[type=search]:not(.browser-default):-ms-input-placeholder,textarea.materialize-textarea:-ms-input-placeholder{color:var(--mm-text-hint, #d1d1d1) !important}input:not([type]):not(.browser-default)::-ms-input-placeholder,input[type=text]:not(.browser-default)::-ms-input-placeholder,input[type=password]:not(.browser-default)::-ms-input-placeholder,input[type=email]:not(.browser-default)::-ms-input-placeholder,input[type=url]:not(.browser-default)::-ms-input-placeholder,input[type=time]:not(.browser-default)::-ms-input-placeholder,input[type=date]:not(.browser-default)::-ms-input-placeholder,input[type=datetime]:not(.browser-default)::-ms-input-placeholder,input[type=datetime-local]:not(.browser-default)::-ms-input-placeholder,input[type=tel]:not(.browser-default)::-ms-input-placeholder,input[type=number]:not(.browser-default)::-ms-input-placeholder,input[type=search]:not(.browser-default)::-ms-input-placeholder,textarea.materialize-textarea::-ms-input-placeholder{color:var(--mm-text-hint, #d1d1d1) !important}.select-wrapper.valid>input.select-dropdown,input:not([type]):not(.browser-default).valid,input:not([type]):not(.browser-default):focus.valid,input[type=text]:not(.browser-default).valid,input[type=text]:not(.browser-default):focus.valid,input[type=password]:not(.browser-default).valid,input[type=password]:not(.browser-default):focus.valid,input[type=email]:not(.browser-default).valid,input[type=email]:not(.browser-default):focus.valid,input[type=url]:not(.browser-default).valid,input[type=url]:not(.browser-default):focus.valid,input[type=time]:not(.browser-default).valid,input[type=time]:not(.browser-default):focus.valid,input[type=date]:not(.browser-default).valid,input[type=date]:not(.browser-default):focus.valid,input[type=datetime]:not(.browser-default).valid,input[type=datetime]:not(.browser-default):focus.valid,input[type=datetime-local]:not(.browser-default).valid,input[type=datetime-local]:not(.browser-default):focus.valid,input[type=tel]:not(.browser-default).valid,input[type=tel]:not(.browser-default):focus.valid,input[type=number]:not(.browser-default).valid,input[type=number]:not(.browser-default):focus.valid,input[type=search]:not(.browser-default).valid,input[type=search]:not(.browser-default):focus.valid,textarea.materialize-textarea.valid,textarea.materialize-textarea:focus.valid{border-bottom:1px solid #4caf50;box-shadow:0 1px 0 0 #4caf50}.select-wrapper.invalid>input.select-dropdown,.select-wrapper.invalid>input.select-dropdown:focus,input:not([type]):not(.browser-default).invalid,input:not([type]):not(.browser-default):focus.invalid,input[type=text]:not(.browser-default).invalid,input[type=text]:not(.browser-default):focus.invalid,input[type=password]:not(.browser-default).invalid,input[type=password]:not(.browser-default):focus.invalid,input[type=email]:not(.browser-default).invalid,input[type=email]:not(.browser-default):focus.invalid,input[type=url]:not(.browser-default).invalid,input[type=url]:not(.browser-default):focus.invalid,input[type=time]:not(.browser-default).invalid,input[type=time]:not(.browser-default):focus.invalid,input[type=date]:not(.browser-default).invalid,input[type=date]:not(.browser-default):focus.invalid,input[type=datetime]:not(.browser-default).invalid,input[type=datetime]:not(.browser-default):focus.invalid,input[type=datetime-local]:not(.browser-default).invalid,input[type=datetime-local]:not(.browser-default):focus.invalid,input[type=tel]:not(.browser-default).invalid,input[type=tel]:not(.browser-default):focus.invalid,input[type=number]:not(.browser-default).invalid,input[type=number]:not(.browser-default):focus.invalid,input[type=search]:not(.browser-default).invalid,input[type=search]:not(.browser-default):focus.invalid,textarea.materialize-textarea.invalid,textarea.materialize-textarea:focus.invalid{border-bottom:1px solid #f44336;box-shadow:0 1px 0 0 #f44336}.select-wrapper.valid .helper-text[data-success],.select-wrapper.invalid~.helper-text[data-error],input:not([type]):not(.browser-default).valid~.helper-text[data-success],input:not([type]):not(.browser-default):focus.valid~.helper-text[data-success],input:not([type]):not(.browser-default).invalid~.helper-text[data-error],input:not([type]):not(.browser-default):focus.invalid~.helper-text[data-error],input[type=text]:not(.browser-default).valid~.helper-text[data-success],input[type=text]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=text]:not(.browser-default).invalid~.helper-text[data-error],input[type=text]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=password]:not(.browser-default).valid~.helper-text[data-success],input[type=password]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=password]:not(.browser-default).invalid~.helper-text[data-error],input[type=password]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=email]:not(.browser-default).valid~.helper-text[data-success],input[type=email]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=email]:not(.browser-default).invalid~.helper-text[data-error],input[type=email]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=url]:not(.browser-default).valid~.helper-text[data-success],input[type=url]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=url]:not(.browser-default).invalid~.helper-text[data-error],input[type=url]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=time]:not(.browser-default).valid~.helper-text[data-success],input[type=time]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=time]:not(.browser-default).invalid~.helper-text[data-error],input[type=time]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=date]:not(.browser-default).valid~.helper-text[data-success],input[type=date]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=date]:not(.browser-default).invalid~.helper-text[data-error],input[type=date]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=datetime]:not(.browser-default).valid~.helper-text[data-success],input[type=datetime]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=datetime]:not(.browser-default).invalid~.helper-text[data-error],input[type=datetime]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=datetime-local]:not(.browser-default).valid~.helper-text[data-success],input[type=datetime-local]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=datetime-local]:not(.browser-default).invalid~.helper-text[data-error],input[type=datetime-local]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=tel]:not(.browser-default).valid~.helper-text[data-success],input[type=tel]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=tel]:not(.browser-default).invalid~.helper-text[data-error],input[type=tel]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=number]:not(.browser-default).valid~.helper-text[data-success],input[type=number]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=number]:not(.browser-default).invalid~.helper-text[data-error],input[type=number]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=search]:not(.browser-default).valid~.helper-text[data-success],input[type=search]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=search]:not(.browser-default).invalid~.helper-text[data-error],input[type=search]:not(.browser-default):focus.invalid~.helper-text[data-error],textarea.materialize-textarea.valid~.helper-text[data-success],textarea.materialize-textarea:focus.valid~.helper-text[data-success],textarea.materialize-textarea.invalid~.helper-text[data-error],textarea.materialize-textarea:focus.invalid~.helper-text[data-error]{color:rgba(0,0,0,0);user-select:none;pointer-events:none}.select-wrapper.valid~.helper-text:after,input:not([type]):not(.browser-default).valid~.helper-text:after,input:not([type]):not(.browser-default):focus.valid~.helper-text:after,input[type=text]:not(.browser-default).valid~.helper-text:after,input[type=text]:not(.browser-default):focus.valid~.helper-text:after,input[type=password]:not(.browser-default).valid~.helper-text:after,input[type=password]:not(.browser-default):focus.valid~.helper-text:after,input[type=email]:not(.browser-default).valid~.helper-text:after,input[type=email]:not(.browser-default):focus.valid~.helper-text:after,input[type=url]:not(.browser-default).valid~.helper-text:after,input[type=url]:not(.browser-default):focus.valid~.helper-text:after,input[type=time]:not(.browser-default).valid~.helper-text:after,input[type=time]:not(.browser-default):focus.valid~.helper-text:after,input[type=date]:not(.browser-default).valid~.helper-text:after,input[type=date]:not(.browser-default):focus.valid~.helper-text:after,input[type=datetime]:not(.browser-default).valid~.helper-text:after,input[type=datetime]:not(.browser-default):focus.valid~.helper-text:after,input[type=datetime-local]:not(.browser-default).valid~.helper-text:after,input[type=datetime-local]:not(.browser-default):focus.valid~.helper-text:after,input[type=tel]:not(.browser-default).valid~.helper-text:after,input[type=tel]:not(.browser-default):focus.valid~.helper-text:after,input[type=number]:not(.browser-default).valid~.helper-text:after,input[type=number]:not(.browser-default):focus.valid~.helper-text:after,input[type=search]:not(.browser-default).valid~.helper-text:after,input[type=search]:not(.browser-default):focus.valid~.helper-text:after,textarea.materialize-textarea.valid~.helper-text:after,textarea.materialize-textarea:focus.valid~.helper-text:after{content:attr(data-success);color:#4caf50}.select-wrapper.invalid~.helper-text:after,input:not([type]):not(.browser-default).invalid~.helper-text:after,input:not([type]):not(.browser-default):focus.invalid~.helper-text:after,input[type=text]:not(.browser-default).invalid~.helper-text:after,input[type=text]:not(.browser-default):focus.invalid~.helper-text:after,input[type=password]:not(.browser-default).invalid~.helper-text:after,input[type=password]:not(.browser-default):focus.invalid~.helper-text:after,input[type=email]:not(.browser-default).invalid~.helper-text:after,input[type=email]:not(.browser-default):focus.invalid~.helper-text:after,input[type=url]:not(.browser-default).invalid~.helper-text:after,input[type=url]:not(.browser-default):focus.invalid~.helper-text:after,input[type=time]:not(.browser-default).invalid~.helper-text:after,input[type=time]:not(.browser-default):focus.invalid~.helper-text:after,input[type=date]:not(.browser-default).invalid~.helper-text:after,input[type=date]:not(.browser-default):focus.invalid~.helper-text:after,input[type=datetime]:not(.browser-default).invalid~.helper-text:after,input[type=datetime]:not(.browser-default):focus.invalid~.helper-text:after,input[type=datetime-local]:not(.browser-default).invalid~.helper-text:after,input[type=datetime-local]:not(.browser-default):focus.invalid~.helper-text:after,input[type=tel]:not(.browser-default).invalid~.helper-text:after,input[type=tel]:not(.browser-default):focus.invalid~.helper-text:after,input[type=number]:not(.browser-default).invalid~.helper-text:after,input[type=number]:not(.browser-default):focus.invalid~.helper-text:after,input[type=search]:not(.browser-default).invalid~.helper-text:after,input[type=search]:not(.browser-default):focus.invalid~.helper-text:after,textarea.materialize-textarea.invalid~.helper-text:after,textarea.materialize-textarea:focus.invalid~.helper-text:after{content:attr(data-error);color:#f44336}.select-wrapper+label:after,input:not([type]):not(.browser-default)+label:after,input[type=text]:not(.browser-default)+label:after,input[type=password]:not(.browser-default)+label:after,input[type=email]:not(.browser-default)+label:after,input[type=url]:not(.browser-default)+label:after,input[type=time]:not(.browser-default)+label:after,input[type=date]:not(.browser-default)+label:after,input[type=datetime]:not(.browser-default)+label:after,input[type=datetime-local]:not(.browser-default)+label:after,input[type=tel]:not(.browser-default)+label:after,input[type=number]:not(.browser-default)+label:after,input[type=search]:not(.browser-default)+label:after,textarea.materialize-textarea+label:after{display:block;content:"";position:absolute;top:100%;left:0;opacity:0;transition:.2s opacity ease-out,.2s color ease-out}.input-field{position:relative;margin-top:1rem;margin-bottom:1rem}.input-field.inline{display:inline-block;vertical-align:middle;margin-left:5px}.input-field.inline input,.input-field.inline .select-dropdown{margin-bottom:1rem}.input-field.col label{left:.75rem}.input-field.col .prefix~label,.input-field.col .prefix~.validate~label{width:calc(100% - 3rem - 1.5rem)}.input-field>label{color:#9e9e9e;position:absolute;top:0;left:0;font-size:1rem;cursor:text;transition:transform .2s ease-out,color .2s ease-out;transform-origin:0% 100%;text-align:initial;transform:translateY(12px)}.input-field>label:not(.label-icon).active{transform:translateY(-14px) scale(0.8);transform-origin:0 0}.input-field>input[type]:-webkit-autofill:not(.browser-default):not([type=search])+label,.input-field>input[type=date]:not(.browser-default)+label,.input-field>input[type=time]:not(.browser-default)+label{transform:translateY(-14px) scale(0.8);transform-origin:0 0}.input-field .helper-text{position:relative;min-height:18px;display:block;font-size:12px;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.54))}.input-field .helper-text::after{opacity:1;position:absolute;top:0;left:0}.input-field .prefix{position:absolute;width:3rem;font-size:2rem;transition:color .2s;top:.5rem}.input-field .prefix.active{color:#26a69a}.input-field .prefix~input,.input-field .prefix~textarea,.input-field .prefix~label,.input-field .prefix~.validate~label,.input-field .prefix~.helper-text,.input-field .prefix~.autocomplete-content{margin-left:3rem;width:92%;width:calc(100% - 3rem)}.input-field .prefix~label{margin-left:3rem}@media only screen and (max-width : 992px){.input-field .prefix~input{width:86%;width:calc(100% - 3rem)}}@media only screen and (max-width : 600px){.input-field .prefix~input{width:80%;width:calc(100% - 3rem)}}.input-field input[type=color]:not(.browser-default){margin-top:8px}.input-field input[type=search]{display:block;line-height:inherit;transition:.3s background-color}.nav-wrapper .input-field input[type=search]{height:inherit;padding-left:4rem;width:calc(100% - 4rem);border:0;box-shadow:none}.input-field input[type=search]:focus:not(.browser-default){background-color:var(--mm-input-background, #fff);border:0;box-shadow:none;color:var(--mm-input-text, #444)}.input-field input[type=search]:focus:not(.browser-default)+label i,.input-field input[type=search]:focus:not(.browser-default)~.mdi-navigation-close,.input-field input[type=search]:focus:not(.browser-default)~.material-icons{color:var(--mm-input-text, #444)}.input-field input[type=search]+.label-icon{transform:none;left:1rem}.input-field input[type=search]~.mdi-navigation-close,.input-field input[type=search]~.material-icons{position:absolute;top:0;right:1rem;color:rgba(0,0,0,0);cursor:pointer;font-size:2rem;transition:.3s color}textarea{width:100%;height:3rem;background-color:rgba(0,0,0,0)}textarea.materialize-textarea{line-height:normal;overflow-y:hidden;padding:.8rem 0 .8rem 0;resize:none;min-height:3rem;box-sizing:border-box}.hiddendiv{visibility:hidden;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;padding-top:1.2rem;position:absolute;top:0;z-index:-1}.autocomplete-content li .highlight{color:#444}.autocomplete-content li img{height:40px;width:40px;margin:5px 15px}.character-counter{min-height:18px}[type=radio]:not(:checked),[type=radio]:checked{position:absolute;opacity:0;pointer-events:none}[type=radio]:not(:checked)+span,[type=radio]:checked+span{position:relative;padding-left:35px;cursor:pointer;display:inline-block;height:25px;line-height:25px;font-size:1rem;transition:.28s ease;user-select:none}[type=radio]+span:before,[type=radio]+span:after{content:"";position:absolute;left:0;top:0;margin:4px;width:16px;height:16px;z-index:0;transition:.28s ease}[type=radio]:not(:checked)+span:before,[type=radio]:not(:checked)+span:after,[type=radio]:checked+span:before,[type=radio]:checked+span:after,[type=radio].with-gap:checked+span:before,[type=radio].with-gap:checked+span:after{border-radius:50%}[type=radio]:not(:checked)+span:before,[type=radio]:not(:checked)+span:after{border:2px solid var(--mm-text-secondary, #5a5a5a)}[type=radio]:not(:checked)+span:after{transform:scale(0)}[type=radio]:checked+span:before{border:2px solid rgba(0,0,0,0)}[type=radio]:checked+span:after,[type=radio].with-gap:checked+span:before,[type=radio].with-gap:checked+span:after{border:2px solid var(--mm-primary-color, #26a69a)}[type=radio]:checked+span:after,[type=radio].with-gap:checked+span:after{background-color:var(--mm-primary-color, #26a69a)}[type=radio]:checked+span:after{transform:scale(1.02)}[type=radio].with-gap:checked+span:after{transform:scale(0.5)}[type=radio].tabbed:focus+span:before{box-shadow:0 0 0 10px rgba(0,0,0,.1)}[type=radio].with-gap:disabled:checked+span:before{border:2px solid var(--mm-text-disabled, rgba(0, 0, 0, 0.42))}[type=radio].with-gap:disabled:checked+span:after{border:none;background-color:var(--mm-text-disabled, rgba(0, 0, 0, 0.42))}[type=radio]:disabled:not(:checked)+span:before,[type=radio]:disabled:checked+span:before{background-color:rgba(0,0,0,0);border-color:var(--mm-text-disabled, rgba(0, 0, 0, 0.42))}[type=radio]:disabled+span{color:var(--mm-text-disabled, rgba(0, 0, 0, 0.42))}[type=radio]:disabled:not(:checked)+span:before{border-color:var(--mm-text-disabled, rgba(0, 0, 0, 0.42))}[type=radio]:disabled:checked+span:after{background-color:var(--mm-text-disabled, rgba(0, 0, 0, 0.42));border-color:var(--mm-text-disabled, #949494)}[type=checkbox]:not(:checked),[type=checkbox]:checked{position:absolute;opacity:0;pointer-events:none}[type=checkbox]+span:not(.lever){position:relative;padding-left:35px;cursor:pointer;display:inline-block;height:25px;line-height:25px;font-size:1rem;user-select:none}[type=checkbox]+span:not(.lever):before,[type=checkbox]:not(.filled-in)+span:not(.lever):after{content:"";position:absolute;top:0;left:0;width:18px;height:18px;z-index:0;border:2px solid #5a5a5a;border-radius:1px;margin-top:3px;transition:.2s}[type=checkbox]:not(.filled-in)+span:not(.lever):after{border:0;transform:scale(0)}[type=checkbox]:not(:checked):disabled+span:not(.lever):before{border:none;background-color:rgba(0,0,0,.42)}[type=checkbox].tabbed:focus+span:not(.lever):after{transform:scale(1);border:0;border-radius:50%;box-shadow:0 0 0 10px rgba(0,0,0,.1);background-color:rgba(0,0,0,.1)}[type=checkbox]:checked+span:not(.lever):before{top:-4px;left:-5px;width:12px;height:22px;border-top:2px solid rgba(0,0,0,0);border-left:2px solid rgba(0,0,0,0);border-right:2px solid #26a69a;border-bottom:2px solid #26a69a;transform:rotate(40deg);backface-visibility:hidden;transform-origin:100% 100%}[type=checkbox]:checked:disabled+span:before{border-right:2px solid rgba(0,0,0,.42);border-bottom:2px solid rgba(0,0,0,.42)}[type=checkbox]:indeterminate+span:not(.lever):before{top:-11px;left:-12px;width:10px;height:22px;border-top:none;border-left:none;border-right:2px solid #26a69a;border-bottom:none;transform:rotate(90deg);backface-visibility:hidden;transform-origin:100% 100%}[type=checkbox]:indeterminate:disabled+span:not(.lever):before{border-right:2px solid rgba(0,0,0,.42);background-color:rgba(0,0,0,0)}[type=checkbox].filled-in+span:not(.lever):after{border-radius:2px}[type=checkbox].filled-in+span:not(.lever):before,[type=checkbox].filled-in+span:not(.lever):after{content:"";left:0;position:absolute;transition:border .25s,background-color .25s,width .2s .1s,height .2s .1s,top .2s .1s,left .2s .1s;z-index:1}[type=checkbox].filled-in:not(:checked)+span:not(.lever):before{width:0;height:0;border:3px solid rgba(0,0,0,0);left:6px;top:10px;transform:rotateZ(37deg);transform-origin:100% 100%}[type=checkbox].filled-in:not(:checked)+span:not(.lever):after{height:20px;width:20px;background-color:rgba(0,0,0,0);border:2px solid #5a5a5a;top:0px;z-index:0}[type=checkbox].filled-in:checked+span:not(.lever):before{top:0;left:1px;width:8px;height:13px;border-top:2px solid rgba(0,0,0,0);border-left:2px solid rgba(0,0,0,0);border-right:2px solid #fff;border-bottom:2px solid #fff;transform:rotateZ(37deg);transform-origin:100% 100%}[type=checkbox].filled-in:checked+span:not(.lever):after{top:0;width:20px;height:20px;border:2px solid #26a69a;background-color:#26a69a;z-index:0}[type=checkbox].filled-in.tabbed:focus+span:not(.lever):after{border-radius:2px;border-color:#5a5a5a;background-color:rgba(0,0,0,.1)}[type=checkbox].filled-in.tabbed:checked:focus+span:not(.lever):after{border-radius:2px;background-color:#26a69a;border-color:#26a69a}[type=checkbox].filled-in:disabled:not(:checked)+span:not(.lever):before{background-color:rgba(0,0,0,0);border:2px solid rgba(0,0,0,0)}[type=checkbox].filled-in:disabled:not(:checked)+span:not(.lever):after{border-color:rgba(0,0,0,0);background-color:#949494}[type=checkbox].filled-in:disabled:checked+span:not(.lever):before{background-color:rgba(0,0,0,0)}[type=checkbox].filled-in:disabled:checked+span:not(.lever):after{background-color:#949494;border-color:#949494}.switch,.switch *{-webkit-tap-highlight-color:rgba(0,0,0,0);user-select:none}.switch label{cursor:pointer}.switch label input[type=checkbox]{opacity:0;width:0;height:0}.switch label input[type=checkbox]:checked+.lever{background-color:var(--mm-switch-checked-track, rgb(132.0625, 199.4375, 193.12109375))}.switch label input[type=checkbox]:checked+.lever:before,.switch label input[type=checkbox]:checked+.lever:after{left:18px}.switch label input[type=checkbox]:checked+.lever:after{background-color:var(--mm-switch-checked-thumb, #26a69a)}.switch label .lever{content:"";display:inline-block;position:relative;width:36px;height:14px;background-color:var(--mm-switch-unchecked-track, rgba(0, 0, 0, 0.38));border-radius:15px;margin-right:10px;transition:background .3s ease;vertical-align:middle;margin:0 16px}.switch label .lever:before,.switch label .lever:after{content:"";position:absolute;display:inline-block;width:20px;height:20px;border-radius:50%;left:0;top:-3px;transition:left .3s ease,background .3s ease,box-shadow .1s ease,transform .1s ease}.switch label .lever:before{background-color:rgba(38,166,154,.15)}.switch label .lever:after{background-color:var(--mm-switch-unchecked-thumb, #F1F1F1);box-shadow:0px 3px 1px -2px rgba(0,0,0,.2),0px 2px 2px 0px rgba(0,0,0,.14),0px 1px 5px 0px rgba(0,0,0,.12)}input[type=checkbox]:checked:not(:disabled)~.lever:active::before,input[type=checkbox]:checked:not(:disabled).tabbed:focus~.lever::before{transform:scale(2.4);background-color:rgba(38,166,154,.15)}input[type=checkbox]:not(:disabled)~.lever:active:before,input[type=checkbox]:not(:disabled).tabbed:focus~.lever::before{transform:scale(2.4);background-color:rgba(0,0,0,.08)}.switch input[type=checkbox][disabled]+.lever{cursor:default;background-color:var(--mm-switch-disabled-track, rgba(0, 0, 0, 0.12))}.switch label input[type=checkbox][disabled]+.lever:after,.switch label input[type=checkbox][disabled]:checked+.lever:after{background-color:var(--mm-switch-disabled-thumb, #949494)}select.browser-default{opacity:1}select{opacity:0;background-color:hsla(0,0%,100%,.9);width:100%;padding:5px;border:1px solid #f2f2f2;border-radius:2px;height:3rem}.select-label{position:absolute}.select-wrapper{position:relative}.select-wrapper.valid+label,.select-wrapper.invalid+label{width:100%;pointer-events:none}.select-wrapper input.select-dropdown{position:relative;cursor:pointer;background-color:rgba(0,0,0,0);border:none;border-bottom:1px solid #9e9e9e;outline:none;height:3rem;line-height:3rem;width:100%;font-size:16px;margin:0 0 8px 0;padding:0;display:block;user-select:none;z-index:1}.select-wrapper input.select-dropdown:focus{border-bottom:1px solid #26a69a}.select-wrapper .caret{position:absolute;right:0;top:0;bottom:0;margin:auto 0;z-index:0;fill:var(--mm-text-primary, rgba(0, 0, 0, 0.87))}.select-wrapper+label{position:absolute;top:-26px;font-size:.8rem}.select-wrapper .hide-select{width:0;height:0;overflow:hidden;position:absolute;top:0;z-index:-1}select:disabled{color:rgba(0,0,0,.42)}.select-wrapper.disabled+label{color:rgba(0,0,0,.42)}.select-wrapper.disabled .caret{fill:rgba(0,0,0,.42)}.select-wrapper input.select-dropdown:disabled{color:rgba(0,0,0,.42);cursor:default;user-select:none}.select-wrapper i{color:rgba(0,0,0,.3)}.select-dropdown li.disabled,.select-dropdown li.disabled>span,.select-dropdown li.optgroup{color:var(--mm-text-disabled, rgba(0, 0, 0, 0.3));background-color:rgba(0,0,0,0)}body.keyboard-focused .select-dropdown.dropdown-content li:focus{background-color:var(--mm-dropdown-focus, rgba(0, 0, 0, 0.08))}.select-dropdown.dropdown-content li:hover{background-color:var(--mm-dropdown-hover, rgba(0, 0, 0, 0.08))}.select-dropdown.dropdown-content li.selected{background-color:var(--mm-dropdown-selected, rgba(0, 0, 0, 0.03))}.prefix~.select-wrapper{margin-left:3rem;width:92%;width:calc(100% - 3rem)}.prefix~label{margin-left:3rem}.select-dropdown li img{height:40px;width:40px;margin:5px 15px;float:right}.select-dropdown li.optgroup{border-top:1px solid var(--mm-border-color, #eee)}.select-dropdown li.optgroup.selected>span{color:var(--mm-text-secondary, rgba(0, 0, 0, 0.7))}.select-dropdown li.optgroup>span{color:var(--mm-text-hint, rgba(0, 0, 0, 0.4))}.select-dropdown li.optgroup~li.optgroup-option{padding-left:1rem}.file-field{position:relative}.file-field .file-path-wrapper{overflow:hidden;padding-left:10px}.file-field input.file-path{width:100%}.file-field .btn{float:left;height:3rem;line-height:3rem}.file-field span{cursor:pointer}.file-field input[type=file]{position:absolute;top:0;right:0;left:0;bottom:0;width:100%;margin:0;padding:0;font-size:20px;cursor:pointer;opacity:0;filter:alpha(opacity=0)}.file-field input[type=file]::-webkit-file-upload-button{display:none}.file-field .close{height:20px}.range-field{position:relative}input[type=range],input[type=range]+.thumb{cursor:pointer}input[type=range]{position:relative;background-color:rgba(0,0,0,0);border:none;outline:none;width:100%;margin:15px 0;padding:0}input[type=range]:focus{outline:none}input[type=range]+.thumb{position:absolute;top:10px;left:0;border:none;height:0;width:0;border-radius:50%;background-color:#26a69a;margin-left:7px;transform-origin:50% 50%;transform:rotate(-45deg)}input[type=range]+.thumb .value{display:block;width:30px;text-align:center;color:#26a69a;font-size:0;transform:rotate(45deg)}input[type=range]+.thumb.active{border-radius:50% 50% 50% 0}input[type=range]+.thumb.active .value{color:#fff;margin-left:-1px;margin-top:8px;font-size:10px}input[type=range]{-webkit-appearance:none}input[type=range]::-webkit-slider-runnable-track{height:3px;background:#c2c0c2;border:none}input[type=range]::-webkit-slider-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#26a69a;transition:box-shadow .3s;-webkit-appearance:none;background-color:#26a69a;transform-origin:50% 50%;margin:-5px 0 0 0}.keyboard-focused input[type=range]:focus:not(.active)::-webkit-slider-thumb{box-shadow:0 0 0 10px rgba(38,166,154,.26)}input[type=range]{border:1px solid #fff}input[type=range]::-moz-range-track{height:3px;background:#c2c0c2;border:none}input[type=range]::-moz-focus-inner{border:0}input[type=range]::-moz-range-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#26a69a;transition:box-shadow .3s;margin-top:-5px}input[type=range]:-moz-focusring{outline:1px solid #fff;outline-offset:-1px}.keyboard-focused input[type=range]:focus:not(.active)::-moz-range-thumb{box-shadow:0 0 0 10px rgba(38,166,154,.26)}input[type=range]::-ms-track{height:3px;background:rgba(0,0,0,0);border-color:rgba(0,0,0,0);border-width:6px 0;color:rgba(0,0,0,0)}input[type=range]::-ms-fill-lower{background:#777}input[type=range]::-ms-fill-upper{background:#ddd}input[type=range]::-ms-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#26a69a;transition:box-shadow .3s}.keyboard-focused input[type=range]:focus:not(.active)::-ms-thumb{box-shadow:0 0 0 10px rgba(38,166,154,.26)}.grid-container{display:grid;grid-template-columns:repeat(auto-fit, minmax(150px, 1fr));gap:15px;padding-top:10px;padding-bottom:20px}.grid-container p{margin:0}.form-group-label{font-size:.8rem;color:#9e9e9e;margin-bottom:15px;display:block;cursor:text;text-align:initial}select:focus{outline:1px solid rgb(201.05,242.65,238.75)}button:focus{outline:none;background-color:rgb(41.8,182.6,169.4)}label{font-size:.8rem;color:#9e9e9e}.table-of-contents.fixed{position:fixed}.table-of-contents li{padding:2px 0}.table-of-contents a{display:inline-block;font-weight:300;color:#757575;padding-left:16px;height:1.5rem;line-height:1.5rem;letter-spacing:.4;display:inline-block}.table-of-contents a:hover{color:#a8a8a8;padding-left:15px;border-left:1px solid #ee6e73}.table-of-contents a.active{font-weight:500;padding-left:14px;border-left:2px solid #ee6e73}.sidenav-container{position:relative;z-index:997}.sidenav-backdrop{position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;background:var(--mm-overlay-background, rgba(0, 0, 0, 0.5));opacity:0;visibility:hidden;transition:opacity .3s ease,visibility .3s ease;z-index:998;cursor:pointer}.sidenav-backdrop.show{opacity:1;visibility:visible}.sidenav-link{display:flex;align-items:center;padding:.75rem 1rem;color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));text-decoration:none;transition:background-color .2s ease,color .2s ease;cursor:pointer;min-height:48px}.sidenav-link:hover:not(.disabled){background:var(--mm-border-color, rgba(0, 0, 0, 0.12));color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));text-decoration:none}.sidenav-link.active{background:var(--mm-primary-color-light, rgba(38, 166, 154, 0.1));color:var(--mm-primary-color, #26a69a)}.sidenav-link.active .sidenav-icon{color:var(--mm-primary-color, #26a69a)}.sidenav-link.disabled{color:var(--mm-text-disabled, rgba(0, 0, 0, 0.38));cursor:not-allowed}.sidenav-link.disabled .sidenav-icon{color:var(--mm-text-disabled, rgba(0, 0, 0, 0.38))}.sidenav-icon{margin-right:1rem;font-size:1.5rem;width:24px;height:24px;display:flex;align-items:center;justify-content:center;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));flex-shrink:0}.sidenav-text{font-size:.875rem;font-weight:500;line-height:1.5;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.sidenav-divider{height:1px;background:var(--mm-divider-color, rgba(0, 0, 0, 0.12));margin:.5rem 0}.sidenav-subheader{padding:1rem 1rem .5rem 1rem;font-size:.75rem;font-weight:600;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));text-transform:uppercase;letter-spacing:.5px;line-height:1.5}.sidenav-content{padding:0;height:100%;display:flex;flex-direction:column}.sidenav{position:fixed;width:300px;left:0;top:0;margin:0;transform:translateX(-100%);height:100%;height:calc(100% + 60px);height:-moz-calc(100%);padding-bottom:60px;background-color:var(--mm-surface-color, #fff);z-index:999;overflow-y:auto;will-change:transform;backface-visibility:hidden;transform:translateX(-105%);transition:transform .3s ease,left .3s ease,right .3s ease}.sidenav.sidenav-left{left:0}.sidenav.sidenav-right{right:0;left:auto;transform:translateX(100%)}.sidenav.sidenav-overlay{position:fixed}.sidenav.sidenav-push{position:relative;box-shadow:var(--mm-border-color, rgba(0, 0, 0, 0.12)) 1px 0 0 0}.sidenav.closed.sidenav-left{transform:translateX(-100%)}.sidenav.closed.sidenav-right{transform:translateX(100%)}.sidenav.open{transform:translateX(0)}.sidenav.right-aligned{right:0;transform:translateX(105%);left:auto;transform:translateX(100%)}.sidenav .collapsible{margin:0}.sidenav li{float:none;line-height:48px}.sidenav li.active{background-color:rgba(0,0,0,.05)}.sidenav li>a:not(.btn):not(.btn-large):not(.btn-flat):not(.btn-floating){color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));display:block;font-size:14px;font-weight:500;height:48px;line-height:48px;padding:0 32px}.sidenav li>a:not(.btn):not(.btn-large):not(.btn-flat):not(.btn-floating):hover{background-color:var(--mm-border-color, rgba(0, 0, 0, 0.05))}.sidenav li>a:not(.btn):not(.btn-large):not(.btn-flat):not(.btn-floating)>i,.sidenav li>a:not(.btn):not(.btn-large):not(.btn-flat):not(.btn-floating)>[class^=mdi-],.sidenav li>a:not(.btn):not(.btn-large):not(.btn-flat):not(.btn-floating) li>a>[class*=mdi-],.sidenav li>a:not(.btn):not(.btn-large):not(.btn-flat):not(.btn-floating)>i.material-icons{float:left;height:48px;line-height:48px;margin:0 32px 0 0;width:24px;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.54))}.sidenav li>.btn,.sidenav li>.btn-large,.sidenav li>.btn-flat,.sidenav li>.btn-floating{margin:10px 32px}.sidenav .divider{margin:8px 0 0 0}.sidenav .subheader{cursor:initial;pointer-events:none;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.54));font-size:14px;font-weight:500;line-height:48px;padding:0 32px;height:48px;display:flex;align-items:center}.sidenav .subheader:hover{background-color:rgba(0,0,0,0)}.sidenav .user-view{position:relative;padding:32px 32px 0;margin-bottom:8px}.sidenav .user-view>a{height:auto;padding:0}.sidenav .user-view>a:hover{background-color:rgba(0,0,0,0)}.sidenav .user-view .background{overflow:hidden;position:absolute;top:0;right:0;bottom:0;left:0;z-index:-1}.sidenav .user-view .circle,.sidenav .user-view .name,.sidenav .user-view .email{display:block}.sidenav .user-view .circle{height:64px;width:64px}.sidenav .user-view .name,.sidenav .user-view .email{font-size:14px;line-height:24px}.sidenav .user-view .name{margin-top:16px;font-weight:500}.sidenav .user-view .email{padding-bottom:16px;font-weight:400}.drag-target{height:100%;width:10px;position:fixed;top:0;left:0;z-index:998}.drag-target.right-aligned{right:0}.sidenav.sidenav-fixed{left:0;transform:translateX(0);position:fixed}.sidenav.sidenav-fixed.right-aligned{right:0;left:auto}@media only screen and (max-width : 992px){.sidenav.sidenav-fixed{transform:translateX(-105%)}.sidenav.sidenav-fixed.right-aligned{transform:translateX(105%)}.sidenav>a{padding:0 16px}.sidenav .user-view{padding:16px 16px 0}}.sidenav .collapsible-body>ul:not(.collapsible)>li.active,.sidenav.sidenav-fixed .collapsible-body>ul:not(.collapsible)>li.active{background-color:#ee6e73}.sidenav .collapsible-body>ul:not(.collapsible)>li.active a,.sidenav.sidenav-fixed .collapsible-body>ul:not(.collapsible)>li.active a{color:#fff}.sidenav .collapsible-body{padding:0}.sidenav-overlay{position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;opacity:0;background-color:var(--mm-overlay-background, rgba(0, 0, 0, 0.5));z-index:997;display:none;transition:opacity .3s ease}.sidenav-overlay{pointer-events:auto}.preloader-wrapper{display:inline-block;position:relative;width:50px;height:50px}.preloader-wrapper.small{width:36px;height:36px}.preloader-wrapper.big{width:64px;height:64px}.preloader-wrapper.active{-webkit-animation:container-rotate 1568ms linear infinite;animation:container-rotate 1568ms linear infinite}@-webkit-keyframes container-rotate{to{-webkit-transform:rotate(360deg)}}@keyframes container-rotate{to{transform:rotate(360deg)}}.spinner-layer{position:absolute;width:100%;height:100%;opacity:0;border-color:#26a69a}.spinner-blue,.spinner-blue-only{border-color:#4285f4}.spinner-red,.spinner-red-only{border-color:#db4437}.spinner-yellow,.spinner-yellow-only{border-color:#f4b400}.spinner-green,.spinner-green-only{border-color:#0f9d58}.active .spinner-layer.spinner-blue{-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,blue-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,blue-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.active .spinner-layer.spinner-red{-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,red-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,red-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.active .spinner-layer.spinner-yellow{-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,yellow-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,yellow-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.active .spinner-layer.spinner-green{-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,green-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,green-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.active .spinner-layer,.active .spinner-layer.spinner-blue-only,.active .spinner-layer.spinner-red-only,.active .spinner-layer.spinner-yellow-only,.active .spinner-layer.spinner-green-only{opacity:1;-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}@-webkit-keyframes fill-unfill-rotate{12.5%{-webkit-transform:rotate(135deg)}25%{-webkit-transform:rotate(270deg)}37.5%{-webkit-transform:rotate(405deg)}50%{-webkit-transform:rotate(540deg)}62.5%{-webkit-transform:rotate(675deg)}75%{-webkit-transform:rotate(810deg)}87.5%{-webkit-transform:rotate(945deg)}to{-webkit-transform:rotate(1080deg)}}@keyframes fill-unfill-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}to{transform:rotate(1080deg)}}@-webkit-keyframes blue-fade-in-out{from{opacity:1}25%{opacity:1}26%{opacity:0}89%{opacity:0}90%{opacity:1}100%{opacity:1}}@keyframes blue-fade-in-out{from{opacity:1}25%{opacity:1}26%{opacity:0}89%{opacity:0}90%{opacity:1}100%{opacity:1}}@-webkit-keyframes red-fade-in-out{from{opacity:0}15%{opacity:0}25%{opacity:1}50%{opacity:1}51%{opacity:0}}@keyframes red-fade-in-out{from{opacity:0}15%{opacity:0}25%{opacity:1}50%{opacity:1}51%{opacity:0}}@-webkit-keyframes yellow-fade-in-out{from{opacity:0}40%{opacity:0}50%{opacity:1}75%{opacity:1}76%{opacity:0}}@keyframes yellow-fade-in-out{from{opacity:0}40%{opacity:0}50%{opacity:1}75%{opacity:1}76%{opacity:0}}@-webkit-keyframes green-fade-in-out{from{opacity:0}65%{opacity:0}75%{opacity:1}90%{opacity:1}100%{opacity:0}}@keyframes green-fade-in-out{from{opacity:0}65%{opacity:0}75%{opacity:1}90%{opacity:1}100%{opacity:0}}.gap-patch{position:absolute;top:0;left:45%;width:10%;height:100%;overflow:hidden;border-color:inherit}.gap-patch .circle{width:1000%;left:-450%}.circle-clipper{display:inline-block;position:relative;width:50%;height:100%;overflow:hidden;border-color:inherit}.circle-clipper .circle{width:200%;height:100%;border-width:3px;border-style:solid;border-color:inherit;border-bottom-color:rgba(0,0,0,0) !important;border-radius:50%;-webkit-animation:none;animation:none;position:absolute;top:0;right:0;bottom:0}.circle-clipper.left .circle{left:0;border-right-color:rgba(0,0,0,0) !important;-webkit-transform:rotate(129deg);transform:rotate(129deg)}.circle-clipper.right .circle{left:-100%;border-left-color:rgba(0,0,0,0) !important;-webkit-transform:rotate(-129deg);transform:rotate(-129deg)}.active .circle-clipper.left .circle{-webkit-animation:left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.active .circle-clipper.right .circle{-webkit-animation:right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}@-webkit-keyframes left-spin{from{-webkit-transform:rotate(130deg)}50%{-webkit-transform:rotate(-5deg)}to{-webkit-transform:rotate(130deg)}}@keyframes left-spin{from{transform:rotate(130deg)}50%{transform:rotate(-5deg)}to{transform:rotate(130deg)}}@-webkit-keyframes right-spin{from{-webkit-transform:rotate(-130deg)}50%{-webkit-transform:rotate(5deg)}to{-webkit-transform:rotate(-130deg)}}@keyframes right-spin{from{transform:rotate(-130deg)}50%{transform:rotate(5deg)}to{transform:rotate(-130deg)}}#spinnerContainer.cooldown{-webkit-animation:container-rotate 1568ms linear infinite,fade-out 400ms cubic-bezier(0.4, 0, 0.2, 1);animation:container-rotate 1568ms linear infinite,fade-out 400ms cubic-bezier(0.4, 0, 0.2, 1)}@-webkit-keyframes fade-out{from{opacity:1}to{opacity:0}}@keyframes fade-out{from{opacity:1}to{opacity:0}}.slider{position:relative;height:400px;width:100%}.slider.fullscreen{height:100%;width:100%;position:absolute;top:0;left:0;right:0;bottom:0}.slider.fullscreen ul.slides{height:100%}.slider.fullscreen ul.indicators{z-index:2;bottom:30px}.slider .slides{background-color:#9e9e9e;margin:0;height:400px}.slider .slides li{opacity:0;position:absolute;top:0;left:0;z-index:1;width:100%;height:inherit;overflow:hidden}.slider .slides li img{height:100%;width:100%;background-size:cover;background-position:center}.slider .slides li .caption{color:#fff;position:absolute;top:15%;left:15%;width:70%;opacity:0}.slider .slides li .caption p{color:#e0e0e0}.slider .slides li.active{z-index:2}.slider .indicators{position:absolute;text-align:center;left:0;right:0;bottom:0;margin:0}.slider .indicators .indicator-item{display:inline-block;position:relative;cursor:pointer;height:16px;width:16px;margin:0 12px;background-color:#e0e0e0;transition:background-color .3s;border-radius:50%}.slider .indicators .indicator-item.active{background-color:#4caf50}.carousel{overflow:hidden;position:relative;width:100%;height:400px;perspective:500px;transform-style:preserve-3d;transform-origin:0% 50%}.carousel.carousel-slider{top:0;left:0}.carousel.carousel-slider .carousel-fixed-item{position:absolute;left:0;right:0;bottom:20px;z-index:1}.carousel.carousel-slider .carousel-fixed-item.with-indicators{bottom:68px}.carousel.carousel-slider .carousel-item{width:100%;height:100%;min-height:400px;position:absolute;top:0;left:0}.carousel.carousel-slider .carousel-item h2{font-size:24px;font-weight:500;line-height:32px}.carousel.carousel-slider .carousel-item p{font-size:15px}.carousel .carousel-item{visibility:hidden;width:200px;height:200px;position:absolute;top:0;left:0}.carousel .carousel-item>img{width:100%}.carousel .indicators{position:absolute;text-align:center;left:0;right:0;bottom:0;margin:0}.carousel .indicators .indicator-item{display:inline-block;position:relative;cursor:pointer;height:8px;width:8px;margin:24px 4px;background-color:hsla(0,0%,100%,.5);transition:background-color .3s;border-radius:50%}.carousel .indicators .indicator-item.active{background-color:#fff}.carousel.scrolling .carousel-item .materialboxed,.carousel .carousel-item:not(.active) .materialboxed{pointer-events:none}.tap-target-wrapper{width:800px;height:800px;position:fixed;z-index:1000;visibility:hidden;transition:visibility 0s .3s}.tap-target-wrapper.open{visibility:visible;transition:visibility 0s}.tap-target-wrapper.open .tap-target{transform:scale(1);opacity:.95;transition:transform .3s cubic-bezier(0.42, 0, 0.58, 1),opacity .3s cubic-bezier(0.42, 0, 0.58, 1)}.tap-target-wrapper.open .tap-target-wave::before{transform:scale(1)}.tap-target-wrapper.open .tap-target-wave::after{visibility:visible;animation:pulse-animation 1s cubic-bezier(0.24, 0, 0.38, 1) infinite;transition:opacity .3s,transform .3s,visibility 0s 1s}.tap-target{position:absolute;font-size:1rem;border-radius:50%;background-color:#ee6e73;box-shadow:0 20px 20px 0 rgba(0,0,0,.14),0 10px 50px 0 rgba(0,0,0,.12),0 30px 10px -20px rgba(0,0,0,.2);width:100%;height:100%;opacity:0;transform:scale(0);transition:transform .3s cubic-bezier(0.42, 0, 0.58, 1),opacity .3s cubic-bezier(0.42, 0, 0.58, 1)}.tap-target-content{position:relative;display:table-cell}.tap-target-wave{position:absolute;border-radius:50%;z-index:10001}.tap-target-wave::before,.tap-target-wave::after{content:"";display:block;position:absolute;width:100%;height:100%;border-radius:50%;background-color:#fff}.tap-target-wave::before{transform:scale(0);transition:transform .3s}.tap-target-wave::after{visibility:hidden;transition:opacity .3s,transform .3s,visibility 0s;z-index:-1}.tap-target-origin{top:50%;left:50%;transform:translate(-50%, -50%);z-index:10002;position:absolute !important}.tap-target-origin:not(.btn),.tap-target-origin:not(.btn):hover{background:none}@media only screen and (max-width: 600px){.tap-target,.tap-target-wrapper{width:600px;height:600px}}.pulse{overflow:visible;position:relative}.pulse::before{content:"";display:block;position:absolute;width:100%;height:100%;top:0;left:0;background-color:inherit;border-radius:inherit;transition:opacity .3s,transform .3s;animation:pulse-animation 1s cubic-bezier(0.24, 0, 0.38, 1) infinite;z-index:-1}@keyframes pulse-animation{0%{opacity:1;transform:scale(1)}50%{opacity:0;transform:scale(1.5)}100%{opacity:0;transform:scale(1.5)}}.datepicker-modal{max-width:325px;min-width:300px;max-height:none;overflow:visible}.datepicker-container.modal-content{display:flex;flex-direction:column;padding:0;overflow:visible;background-color:var(--mm-surface-color, #ffffff);color:var(--mm-text-primary, rgba(0, 0, 0, 0.87))}.datepicker-controls{display:flex;justify-content:space-between;width:280px;margin:0 auto;overflow:visible}.datepicker-controls .selects-container{display:flex;overflow:visible}.datepicker-controls .select-wrapper{position:relative;overflow:visible}.datepicker-controls .select-wrapper input{border-bottom:none;text-align:center;margin:0;cursor:pointer}.datepicker-controls .select-wrapper input:focus{border-bottom:none}.datepicker-controls .select-wrapper .caret{position:absolute;right:0;top:50%;transform:translateY(-50%);cursor:pointer;width:16px;height:16px;fill:var(--mm-text-secondary, rgba(0, 0, 0, 0.54))}.datepicker-controls .select-wrapper .dropdown-content{position:absolute;top:100%;left:0;right:0;background-color:var(--mm-surface-color, white);box-shadow:0 4px 20px var(--mm-shadow-color, rgba(0, 0, 0, 0.3));z-index:20000;border:1px solid var(--mm-border-color, #ddd);border-radius:2px;display:block;opacity:1}.datepicker-controls .select-wrapper .dropdown-content .dropdown-item{padding:8px 16px;cursor:pointer;white-space:nowrap;transition:background-color .2s}.datepicker-controls .select-wrapper .dropdown-content .dropdown-item:hover{background-color:var(--mm-border-color, #f5f5f5)}.datepicker-controls .select-wrapper .dropdown-content .dropdown-item.selected{background-color:var(--mm-border-color, #f5f5f5)}.datepicker-controls .select-year input{width:50px}.datepicker-controls .select-year .dropdown-content{max-height:60vh;overflow-y:auto}.datepicker-controls .select-month input{width:80px}.datepicker-controls .select-month .dropdown-content{width:auto;min-width:120px;left:auto;right:0}.month-prev,.month-next{margin-top:4px;cursor:pointer;background-color:rgba(0,0,0,0);border:none}.datepicker-date-display{flex:1 auto;background-color:#26a69a;color:#fff;padding:20px 22px;font-weight:500}.datepicker-date-display .year-text{display:block;font-size:1.5rem;line-height:25px;color:hsla(0,0%,100%,.7)}.datepicker-date-display .date-text{display:block;font-size:2.8rem;line-height:47px;font-weight:500}.datepicker-calendar-container{flex:2.5 auto}.datepicker-table{width:280px;font-size:1rem;margin:0 auto}.datepicker-table.with-week-numbers{width:310px}.datepicker-table thead{border-bottom:none}.datepicker-table th{padding:10px 5px;text-align:center}.datepicker-table th.datepicker-week-header{color:var(--mm-text-hint, rgba(0, 0, 0, 0.38));font-size:.8rem;font-weight:600;width:30px;padding:10px 2px}.datepicker-table tr{border:none}.datepicker-table abbr{text-decoration:none;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.54))}.datepicker-table td{border-radius:50%;padding:0}.datepicker-table td.is-today{color:var(--mm-primary-color, #26a69a)}.datepicker-table td.is-selected{background-color:var(--mm-primary-color, #26a69a);color:var(--mm-button-text, #fff)}.datepicker-table td.is-outside-current-month,.datepicker-table td.is-disabled{color:var(--mm-text-disabled, rgba(0, 0, 0, 0.3));pointer-events:none}.datepicker-table td.datepicker-week-number{color:var(--mm-text-hint, rgba(0, 0, 0, 0.38));font-size:.8rem;font-weight:600;text-align:center;vertical-align:middle;border-radius:0;width:30px;padding:5px 2px;background-color:var(--mm-border-color, rgba(0, 0, 0, 0.02));border-right:1px solid var(--mm-border-color, rgba(0, 0, 0, 0.05))}.datepicker-day-button{background-color:rgba(0,0,0,0);border:none;line-height:38px;display:block;width:100%;border-radius:50%;padding:0 5px;cursor:pointer;color:inherit}.datepicker-footer{width:280px;margin:0 auto;padding-bottom:5px;display:flex;justify-content:space-between}.datepicker-cancel,.datepicker-clear,.datepicker-today,.datepicker-done{color:#26a69a;padding:0 1rem}.datepicker-clear{color:#f44336}@media only screen and (min-width: 601px){.datepicker-modal{max-width:625px}.datepicker-container.modal-content{flex-direction:row}.datepicker-date-display{flex:0 1 270px}.datepicker-controls,.datepicker-table,.datepicker-footer{width:320px}.datepicker-table.with-week-numbers{width:350px}.datepicker-day-button{line-height:44px}}.input-field.timepicker input[disabled]{cursor:not-allowed}.timepicker-actions{display:flex;gap:8px;margin-top:4px;font-size:12px}.timepicker-actions .btn-flat{padding:2px 8px;min-width:auto;height:24px;line-height:20px;font-size:11px;text-transform:none}.timepicker-actions .btn-flat i.material-icons{font-size:14px;margin-right:4px}.inline-time-controls{display:flex;align-items:center;gap:8px;margin-top:8px;padding:12px;background-color:var(--mm-border-color, #f5f5f5);border-radius:4px;font-size:14px}.inline-time-controls .time-controls-12h{display:flex;align-items:center;gap:4px}.inline-time-controls .time-controls-12h input[type=number]{width:50px;text-align:center;padding:4px;border:1px solid var(--mm-border-color, #ccc);border-radius:4px}.inline-time-controls .time-controls-12h select{padding:4px;border:1px solid var(--mm-border-color, #ccc);border-radius:4px;margin-left:4px}.inline-time-controls input[type=time]{font-size:16px;padding:4px 8px;border:1px solid var(--mm-border-color, #ccc);border-radius:4px;min-width:120px}.inline-time-controls .btn-flat{padding:4px 8px;font-size:11px;background-color:var(--mm-border-color, #e0e0e0);border-radius:4px;min-width:auto}.timepicker-modal{max-width:325px;max-height:none}.timepicker-container.modal-content{display:flex;flex-direction:column;padding:0}.text-primary{color:#fff}.timepicker-digital-display{flex:1 auto;background-color:#26a69a;padding:10px;font-weight:300}.timepicker-text-container{font-size:4rem;font-weight:bold;text-align:center;color:hsla(0,0%,100%,.6);font-weight:400;position:relative;user-select:none}.timepicker-span-hours,.timepicker-span-minutes,.timepicker-span-am-pm div{cursor:pointer}.timepicker-span-hours{margin-right:3px}.timepicker-span-minutes{margin-left:3px}.timepicker-display-am-pm{font-size:1.3rem;position:absolute;right:1rem;bottom:1rem;font-weight:400}.timepicker-analog-display{flex:2.5 auto}.timepicker-plate{background-color:#eee;border-radius:50%;width:270px;height:270px;overflow:visible;position:relative;margin:auto;margin-top:25px;margin-bottom:5px;user-select:none}.timepicker-canvas,.timepicker-dial{position:absolute;left:0;right:0;top:0;bottom:0}.timepicker-minutes{visibility:hidden}.timepicker-tick{border-radius:50%;color:rgba(0,0,0,.87);line-height:40px;text-align:center;width:40px;height:40px;position:absolute;cursor:pointer;font-size:15px}.timepicker-tick.active,.timepicker-tick:hover{background-color:rgba(38,166,154,.25)}.timepicker-dial{transition:transform 350ms,opacity 350ms}.timepicker-dial-out{opacity:0}.timepicker-dial-out.timepicker-hours{transform:scale(1.1, 1.1)}.timepicker-dial-out.timepicker-minutes{transform:scale(0.8, 0.8)}.timepicker-canvas{transition:opacity 175ms}.timepicker-canvas line{stroke:#26a69a;stroke-width:4;stroke-linecap:round}.timepicker-canvas-out{opacity:.25}.timepicker-canvas-bearing{stroke:none;fill:#26a69a}.timepicker-canvas-bg{stroke:none;fill:#26a69a}.timepicker-footer{margin:0 auto;padding:5px 1rem;display:flex;justify-content:space-between}.timepicker-clear{color:#f44336}.timepicker-close{color:#26a69a}.timepicker-clear,.timepicker-close{padding:0 20px}@media only screen and (min-width : 601px){.timepicker-modal{max-width:600px}.timepicker-container.modal-content{flex-direction:row}.timepicker-text-container{top:32%}.timepicker-display-am-pm{position:relative;right:auto;bottom:auto;text-align:center;margin-top:1.2rem}}.theme-switcher{display:flex;align-items:center;gap:.5rem}.theme-switcher .theme-switcher-label{font-size:.875rem;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));font-weight:500}.theme-switcher .theme-switcher-buttons{display:flex;background:var(--mm-surface-color, #ffffff);border:1px solid var(--mm-border-color, rgba(0, 0, 0, 0.12));border-radius:.5rem;overflow:hidden}.theme-switcher .theme-switcher-buttons .btn-flat{display:flex;align-items:center;gap:.25rem;padding:.5rem .75rem;margin:0;border:none;background:rgba(0,0,0,0);color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));font-size:.875rem;border-radius:0;min-width:auto;height:auto;line-height:1;text-transform:none;transition:all .2s ease;cursor:pointer}.theme-switcher .theme-switcher-buttons .btn-flat:hover{background:var(--mm-border-color, rgba(0, 0, 0, 0.12));color:var(--mm-text-primary, rgba(0, 0, 0, 0.87))}.theme-switcher .theme-switcher-buttons .btn-flat.active{background:var(--mm-primary-color, #26a69a);color:var(--mm-button-text, #ffffff)}.theme-switcher .theme-switcher-buttons .btn-flat.active:hover{background:var(--mm-primary-color-dark, #00695c)}.theme-switcher .theme-switcher-buttons .btn-flat .material-icons{font-size:1rem}.theme-switcher .theme-switcher-buttons .btn-flat span{font-size:.75rem;font-weight:500}.theme-toggle{width:2.5rem;height:2.5rem;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--mm-surface-color, #ffffff);border:1px solid var(--mm-border-color, rgba(0, 0, 0, 0.12));color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));cursor:pointer;transition:all .2s ease}.theme-toggle:hover{background:var(--mm-primary-color, #26a69a);color:var(--mm-button-text, #ffffff);border-color:var(--mm-primary-color, #26a69a)}.theme-toggle .material-icons{font-size:1.25rem}nav .theme-toggle{background:rgba(0,0,0,0);border:none;border-radius:0;width:64px;height:64px}nav .theme-toggle:hover{background:hsla(0,0%,100%,.1);border:none}nav .theme-toggle:focus{background:hsla(0,0%,100%,.1)}@media(max-width: 600px){.theme-switcher .theme-switcher-buttons .btn-flat{padding:.5rem}.theme-switcher .theme-switcher-buttons .btn-flat span{display:none}}.file-upload-container{margin-bottom:1rem}.file-upload-area{border:2px dashed var(--mm-border-color, rgba(0, 0, 0, 0.12));border-radius:.5rem;padding:2rem;text-align:center;cursor:pointer;transition:all .2s ease;background:var(--mm-input-background, #ffffff)}.file-upload-area:hover:not(.disabled){border-color:var(--mm-primary-color, #26a69a);background:var(--mm-surface-color, #f5f5f5)}.file-upload-area.drag-over{border-color:var(--mm-primary-color, #26a69a);background:var(--mm-primary-color-light, rgba(38, 166, 154, 0.1));transform:scale(1.02)}.file-upload-area.disabled{opacity:.6;cursor:not-allowed;background:var(--mm-border-color, rgba(0, 0, 0, 0.05))}.file-upload-area.error{border-color:#f44336}.file-upload-area.has-files{padding:1rem}.file-upload-content .file-upload-icon{font-size:3rem;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));margin-bottom:.5rem}.file-upload-content .file-upload-label{font-size:1.1rem;font-weight:500;color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));margin:.5rem 0}.file-upload-content .file-upload-helper{font-size:.875rem;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));margin:.25rem 0}.file-upload-content .file-upload-types{font-size:.75rem;color:var(--mm-text-hint, rgba(0, 0, 0, 0.38));margin:.25rem 0 0 0;font-style:italic}.file-upload-error{color:#f44336;font-size:.875rem;margin-top:.5rem;text-align:left}.file-upload-list{margin-top:1rem}.file-upload-list h6{margin:0 0 .5rem 0;font-size:.875rem;font-weight:600;color:var(--mm-text-primary, rgba(0, 0, 0, 0.87))}.file-upload-item{display:flex;align-items:center;gap:1rem;padding:.75rem;margin-bottom:.5rem;background:var(--mm-surface-color, #ffffff);border:1px solid var(--mm-border-color, rgba(0, 0, 0, 0.12));border-radius:.5rem;transition:all .2s ease}.file-upload-item:hover{background:var(--mm-card-background, #f5f5f5)}.file-upload-item .file-preview{flex-shrink:0;width:3rem;height:3rem;border-radius:.25rem;overflow:hidden;background:var(--mm-border-color, rgba(0, 0, 0, 0.05))}.file-upload-item .file-preview img{width:100%;height:100%;object-fit:cover}.file-upload-item .file-info{flex:1;min-width:0}.file-upload-item .file-info .file-name{font-weight:500;color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));margin-bottom:.25rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.file-upload-item .file-info .file-details{display:flex;gap:1rem;font-size:.75rem;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6))}.file-upload-item .file-info .file-progress{margin-top:.5rem}.file-upload-item .file-info .file-progress .progress{height:.25rem;background-color:var(--mm-border-color, rgba(0, 0, 0, 0.12));border-radius:.125rem;overflow:hidden}.file-upload-item .file-info .file-progress .progress .determinate{background-color:var(--mm-primary-color, #26a69a);height:100%;transition:width .3s ease}.file-upload-item .file-info .file-error{color:#f44336;font-size:.75rem;margin-top:.25rem}.file-upload-item .file-remove{flex-shrink:0;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0);border:none;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));cursor:pointer;transition:all .2s ease}.file-upload-item .file-remove:hover{background:rgba(244,67,54,.1);color:#f44336}.file-upload-item .file-remove .material-icons{font-size:1.25rem}@media(max-width: 600px){.file-upload-area{padding:1.5rem 1rem}.file-upload-area .file-upload-content .file-upload-icon{font-size:2.5rem}.file-upload-area .file-upload-content .file-upload-label{font-size:1rem}.file-upload-item{gap:.75rem;padding:.5rem}.file-upload-item .file-preview{width:2.5rem;height:2.5rem}.file-upload-item .file-info .file-details{flex-direction:column;gap:.25rem}}[data-theme=dark] .file-upload-area.drag-over{background:var(--mm-primary-color-dark, rgba(38, 166, 154, 0.2))}.breadcrumb{padding:1rem 0;margin-bottom:1rem;background:rgba(0,0,0,0);display:flex;align-items:center;min-height:2rem}.breadcrumb .breadcrumb-list{display:flex;align-items:center;flex-wrap:wrap;list-style:none;padding:0;margin:0;gap:.5rem;width:100%}.breadcrumb-item{display:flex;align-items:center;font-size:.875rem;line-height:1.5}.breadcrumb-item.active .breadcrumb-text{color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));font-weight:500}.breadcrumb-item.disabled .breadcrumb-text{color:var(--mm-text-disabled, rgba(0, 0, 0, 0.38));cursor:not-allowed}.breadcrumb-item.breadcrumb-ellipsis .breadcrumb-text{color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));font-weight:400;user-select:none}.breadcrumb-link{display:flex;align-items:center;color:var(--mm-primary-color, #26a69a);text-decoration:none;transition:color .2s ease;padding:.25rem .5rem;border-radius:4px}.breadcrumb-link:hover{color:var(--mm-primary-color-dark, #00695c);text-decoration:underline;background:var(--mm-primary-color-light, rgba(38, 166, 154, 0.1))}.breadcrumb-link:focus{outline:2px solid var(--mm-primary-color, #26a69a);outline-offset:2px;border-radius:2px}.breadcrumb-text{color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));font-weight:400;line-height:inherit;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:200px}.breadcrumb-icon{font-size:1.125rem;width:18px;height:18px;margin-right:.5rem;flex-shrink:0;color:inherit;display:flex;align-items:center;justify-content:center}.breadcrumb-separator{display:flex;align-items:center;justify-content:center;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));user-select:none;height:18px}.breadcrumb-separator .material-icons{font-size:1.125rem;width:18px;height:18px;line-height:18px}.breadcrumb.compact{padding:.25rem 0;margin-bottom:.5rem}.breadcrumb.compact .breadcrumb-item{font-size:.75rem}.breadcrumb.compact .breadcrumb-icon{font-size:.875rem;width:14px;height:14px}.breadcrumb.compact .breadcrumb-separator .material-icons{font-size:.875rem;width:14px;height:14px}.breadcrumb.large{padding:.75rem 0;margin-bottom:1.5rem}.breadcrumb.large .breadcrumb-item{font-size:1rem}.breadcrumb.large .breadcrumb-icon{font-size:1.125rem;width:18px;height:18px}.breadcrumb.large .breadcrumb-separator .material-icons{font-size:1.125rem;width:18px;height:18px}@media(max-width: 600px){.breadcrumb .breadcrumb-list{gap:.125rem}.breadcrumb .breadcrumb-item{font-size:.75rem}.breadcrumb .breadcrumb-text{max-width:120px}.breadcrumb .breadcrumb-icon{font-size:.875rem;width:14px;height:14px;margin-right:.125rem}.breadcrumb .breadcrumb-separator .material-icons{font-size:.875rem;width:14px;height:14px}}[data-theme=dark] .breadcrumb-link{color:var(--mm-primary-color, #80cbc4)}[data-theme=dark] .breadcrumb-link:hover{color:var(--mm-primary-color-light, #b2dfdb)}.breadcrumb.slash-separator .breadcrumb-separator{font-family:monospace;font-size:.875rem}.breadcrumb.slash-separator .breadcrumb-separator .material-icons{display:none}.breadcrumb.slash-separator .breadcrumb-separator::before{content:"/";color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6))}.breadcrumb.dot-separator .breadcrumb-separator .material-icons{display:none}.breadcrumb.dot-separator .breadcrumb-separator::before{content:"•";color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));font-size:1rem}.breadcrumb:not([aria-label]){aria-label:"Breadcrumb navigation"}.breadcrumb-link[aria-current=page]{color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));text-decoration:none;font-weight:500}.breadcrumb-link[aria-current=page]:hover{text-decoration:none}.wizard{display:flex;flex-direction:column;width:100%}.wizard.horizontal .wizard-steps{display:flex;align-items:flex-start;justify-content:space-between;position:relative}.wizard.horizontal .wizard-step{display:flex;flex-direction:column;align-items:center;text-align:center;flex:1;position:relative}.wizard.horizontal .wizard-step:not(:last-child){margin-right:2rem}.wizard.horizontal .wizard-step-content{margin-top:.75rem;max-width:200px}.wizard.horizontal .wizard-step-connector{position:absolute;top:20px;left:calc(50% + 20px);width:calc(100% - 40px);height:2px;background:var(--mm-border-color, rgba(0, 0, 0, 0.12));z-index:1}.wizard.vertical .wizard-steps{display:flex;flex-direction:column}.wizard.vertical .wizard-step{display:flex;align-items:flex-start;text-align:left;position:relative;padding-bottom:2rem}.wizard.vertical .wizard-step:last-child{padding-bottom:0}.wizard.vertical .wizard-step-content{margin-left:1rem;flex:1}.wizard.vertical .wizard-step-connector{position:absolute;top:40px;left:19px;bottom:-2rem;width:2px;background:var(--mm-border-color, rgba(0, 0, 0, 0.12));z-index:1}.wizard-header{margin-bottom:2rem}.wizard-step{cursor:pointer;transition:opacity .2s ease}.wizard-step.disabled{opacity:.6;cursor:not-allowed}.wizard-step:hover:not(.disabled) .wizard-step-indicator{box-shadow:0 0 0 8px var(--mm-primary-color-light, rgba(38, 166, 154, 0.1))}.wizard-step-indicator{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--mm-border-color, rgba(0, 0, 0, 0.12));color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));font-weight:500;font-size:.875rem;transition:all .2s ease;position:relative;z-index:2}.wizard-step-indicator .material-icons{font-size:1.25rem}.wizard-step-indicator .wizard-step-number{font-weight:600}.wizard-step.active .wizard-step-indicator{background:var(--mm-primary-color, #26a69a);color:var(--mm-button-text, #ffffff)}.wizard-step.active .wizard-step-title{color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));font-weight:600}.wizard-step.completed .wizard-step-indicator{background:var(--mm-primary-color, #26a69a);color:var(--mm-button-text, #ffffff)}.wizard-step.completed .wizard-step-connector{background:var(--mm-primary-color, #26a69a)}.wizard-step.error .wizard-step-indicator{background:#f44336;color:#fff}.wizard-step.error .wizard-step-title{color:#f44336}.wizard-step-title{font-size:.875rem;font-weight:500;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));margin-bottom:.25rem;line-height:1.3}.wizard-step-subtitle{font-size:.75rem;color:var(--mm-text-hint, rgba(0, 0, 0, 0.38));line-height:1.3;margin-bottom:.25rem}.wizard-step-optional{font-size:.625rem;color:var(--mm-text-hint, rgba(0, 0, 0, 0.38));font-style:italic;text-transform:uppercase;letter-spacing:.5px}.wizard-body{flex:1;margin-bottom:2rem}.wizard-body .input-field{margin-bottom:1.5rem}.wizard-body .input-field input,.wizard-body .input-field textarea{width:100%;box-sizing:border-box}.wizard-body .input-field label{color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));transition:all .3s ease}.wizard-body .input-field label.active{color:var(--mm-primary-color, #26a69a);transform:translateY(-14px) scale(0.8)}.wizard-body .row{margin-bottom:0}.wizard-body .row .col{padding:0 .75rem}.wizard-body .row .col:first-child{padding-left:0}.wizard-body .row .col:last-child{padding-right:0}.wizard-step-panel{animation:wizard-slide-in .3s ease}@keyframes wizard-slide-in{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}.wizard-footer{border-top:1px solid var(--mm-border-color, rgba(0, 0, 0, 0.12));padding-top:1.5rem}.wizard-navigation{display:flex;justify-content:space-between;align-items:center;gap:1rem}.wizard-navigation .wizard-btn-previous,.wizard-navigation .wizard-btn-skip{margin-right:auto}.wizard-navigation .wizard-btn-next,.wizard-navigation .wizard-btn-complete{margin-left:auto}.wizard-navigation .wizard-btn-next .material-icons,.wizard-navigation .wizard-btn-complete .material-icons{margin-right:.5rem;animation:wizard-loading 1s infinite linear}@keyframes wizard-loading{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.wizard.compact .wizard-step-indicator{width:32px;height:32px;font-size:.75rem}.wizard.compact .wizard-step-indicator .material-icons{font-size:1rem}.wizard.compact .wizard-step-title{font-size:.75rem}.wizard.compact .wizard-step-subtitle{font-size:.625rem}.wizard.compact .wizard-header{margin-bottom:1.5rem}.wizard.compact.horizontal .wizard-step-connector{top:16px}.wizard.compact.vertical .wizard-step-connector{top:32px;left:15px}.wizard.large .wizard-step-indicator{width:48px;height:48px;font-size:1rem}.wizard.large .wizard-step-indicator .material-icons{font-size:1.5rem}.wizard.large .wizard-step-title{font-size:1rem}.wizard.large .wizard-step-subtitle{font-size:.875rem}.wizard.large .wizard-header{margin-bottom:2.5rem}.wizard.large.horizontal .wizard-step-connector{top:24px}.wizard.large.vertical .wizard-step-connector{top:48px;left:23px}@media(max-width: 768px){.wizard.horizontal .wizard-steps{flex-direction:column;align-items:stretch}.wizard.horizontal .wizard-step{flex-direction:row;align-items:center;text-align:left;margin-right:0;margin-bottom:1rem}.wizard.horizontal .wizard-step:last-child{margin-bottom:0}.wizard.horizontal .wizard-step-content{margin-top:0;margin-left:1rem;max-width:none}.wizard.horizontal .wizard-step-connector{display:none}}[data-theme=dark] .wizard-step.error .wizard-step-title{color:#f48fb1}[data-theme=dark] .wizard-step.error .wizard-step-indicator{background:#f48fb1;color:#000}[data-theme=dark] .wizard-footer{border-color:var(--mm-border-color, rgba(255, 255, 255, 0.12))}.wizard-step:focus{outline:2px solid var(--mm-primary-color, #26a69a);outline-offset:2px;border-radius:4px}.wizard-step[aria-disabled=true]{pointer-events:none}.wizard-step-indicator[aria-current=step]{box-shadow:0 0 0 4px var(--mm-primary-color-light, rgba(38, 166, 154, 0.2))}.datatable-container .datatable-title{color:var(--mm-text-primary);font-weight:400;margin-bottom:1rem}.datatable-container .datatable-search{margin-bottom:1rem;max-width:400px}.datatable-container .datatable-wrapper{position:relative}.datatable-container .table-wrapper{overflow-x:auto;width:100%;-webkit-overflow-scrolling:touch}.datatable-container .datatable-loading{padding:2rem;text-align:center;color:var(--mm-text-secondary)}.datatable-container .datatable-loading .preloader-wrapper{margin-bottom:1rem}.datatable-container .datatable-empty{padding:3rem 2rem;text-align:center;color:var(--mm-text-secondary);font-style:italic}.datatable thead th.sortable{cursor:pointer;user-select:none;position:relative;transition:background-color .2s ease;padding-right:32px}.datatable thead th.sortable:hover{background-color:var(--mm-dropdown-hover)}.datatable thead th.sortable .sort-indicators{position:absolute;right:8px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;line-height:1}.datatable thead th.sortable .sort-indicators .sort-icon{font-size:16px;color:var(--mm-text-disabled);transition:color .2s ease}.datatable thead th.sortable .sort-indicators .sort-icon.active{color:var(--mm-primary-color)}.datatable thead th.sortable .sort-indicators .sort-asc{margin-bottom:-4px}.datatable thead th.sortable .sort-indicators .sort-desc{margin-top:-4px}.datatable .align-left{text-align:left}.datatable .align-center{text-align:center}.datatable .align-right{text-align:right}.datatable tbody tr{transition:background-color .2s ease;cursor:pointer}.datatable tbody tr:hover{background-color:var(--mm-dropdown-hover)}.datatable.striped tbody tr:nth-child(odd){background-color:var(--mm-dropdown-focus)}.datatable .selection-checkbox{width:40px;text-align:center;padding:0 8px !important}.datatable .selection-checkbox label{margin:0;height:100%;display:flex;align-items:center;justify-content:center}.datatable .selection-checkbox input[type=checkbox]{opacity:1;position:relative;left:auto;top:auto;transform:none;margin-right:0}.datatable tbody tr.selected{background-color:var(--mm-dropdown-selected) !important}.datatable tbody tr.selected:hover{background-color:var(--mm-dropdown-selected) !important;opacity:.9}.datatable.fixed-header thead th{position:sticky;top:0;background:var(--mm-card-background);z-index:10;box-shadow:0 2px 4px rgba(0,0,0,.1)}.datatable-pagination{margin-top:1rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}.datatable-pagination .pagination-info{color:var(--mm-text-secondary);font-size:.9rem;flex:1;min-width:200px}.datatable-pagination .pagination-controls{display:flex;align-items:center;gap:.5rem}.datatable-pagination .pagination-controls button.btn-flat{min-width:40px;height:40px;padding:0;display:flex;align-items:center;justify-content:center;border-radius:50%;transition:background-color .2s ease}.datatable-pagination .pagination-controls button.btn-flat:hover:not(:disabled){background-color:var(--mm-dropdown-hover)}.datatable-pagination .pagination-controls button.btn-flat:disabled{color:var(--mm-text-disabled);cursor:not-allowed}.datatable-pagination .pagination-controls button.btn-flat i{font-size:20px}.datatable-pagination .pagination-controls .page-info{margin:0 .5rem;color:var(--mm-text-secondary);font-weight:500;white-space:nowrap}@media only screen and (max-width : 992px){.datatable-container .datatable-search{max-width:100%}.datatable-container .datatable-pagination{flex-direction:column;align-items:stretch;text-align:center}.datatable-container .datatable-pagination .pagination-info{order:2;margin-top:.5rem;text-align:center}.datatable-container .datatable-pagination .pagination-controls{order:1;justify-content:center}.datatable.responsive-table.mobile-hide-secondary th:nth-child(n+4),.datatable.responsive-table.mobile-hide-secondary td:nth-child(n+4){display:none}}@media only screen and (max-width : 992px)and (max-width : 600px){.datatable.responsive-table.mobile-stack thead{display:none}.datatable.responsive-table.mobile-stack tbody tr{display:block;border:1px solid var(--mm-border-color);margin-bottom:1rem;padding:1rem;border-radius:4px;background:var(--mm-card-background)}.datatable.responsive-table.mobile-stack tbody td{display:block;text-align:left !important;padding:.5rem 0;border:none}.datatable.responsive-table.mobile-stack tbody td::before{content:attr(data-label) ": ";font-weight:bold;color:var(--mm-text-secondary);display:inline-block;min-width:100px}}@media(prefers-color-scheme: dark){:root:not([data-theme]) .datatable-container .datatable thead th.sortable:hover,[data-theme=dark] .datatable-container .datatable thead th.sortable:hover{background-color:var(--mm-dropdown-hover)}:root:not([data-theme]) .datatable-container .datatable tbody tr:hover,[data-theme=dark] .datatable-container .datatable tbody tr:hover{background-color:var(--mm-dropdown-hover)}:root:not([data-theme]) .datatable-container .datatable.striped tbody tr:nth-child(odd),[data-theme=dark] .datatable-container .datatable.striped tbody tr:nth-child(odd){background-color:hsla(0,0%,100%,.05)}:root:not([data-theme]) .datatable-container .datatable.fixed-header thead th,[data-theme=dark] .datatable-container .datatable.fixed-header thead th{border-bottom:1px solid var(--mm-border-color)}}.virtual-table-container{position:relative;overflow-y:auto;overflow-x:hidden;border:1px solid var(--mm-border-color)}.virtual-table-container>table{position:sticky;top:0;z-index:10;background:var(--mm-card-background);box-shadow:0 2px 4px rgba(0,0,0,.1)}.virtual-table-container>table thead th{border-bottom:1px solid var(--mm-border-color)}.virtual-table-container .virtual-table-body{overflow:hidden}.virtual-table-container .virtual-table-body table tbody tr{height:48px;line-height:1.2}.virtual-table-container .virtual-table-body table tbody tr td{padding:8px 12px;vertical-align:middle}.virtual-table-container::-webkit-scrollbar{width:8px}.virtual-table-container::-webkit-scrollbar-track{background:var(--mm-dropdown-hover);border-radius:4px}.virtual-table-container::-webkit-scrollbar-thumb{background:var(--mm-text-disabled);border-radius:4px}.virtual-table-container::-webkit-scrollbar-thumb:hover{background:var(--mm-text-secondary)}.datatable{contain:layout style paint}.datatable.virtual-table{transform:translateZ(0);backface-visibility:hidden}.datatable tbody tr{transform:translateZ(0);will-change:transform}.datatable.fixed-layout{table-layout:fixed}.datatable.fixed-layout th,.datatable.fixed-layout td{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
`, "",{"version":3,"sources":["webpack://./../lib/dist/index.min.css"],"names":[],"mappings":"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","sourcesContent":[":root{--mm-primary-color: #26a69a;--mm-primary-color-light: #80cbc4;--mm-primary-color-dark: #00695c;--mm-secondary-color: #ff6f00;--mm-secondary-color-light: #ffa726;--mm-secondary-color-dark: #ef6c00;--mm-background-color: #ffffff;--mm-surface-color: #ffffff;--mm-card-background: #ffffff;--mm-text-primary: rgba(0, 0, 0, 0.87);--mm-text-secondary: rgba(0, 0, 0, 0.6);--mm-text-disabled: rgba(0, 0, 0, 0.38);--mm-text-hint: rgba(0, 0, 0, 0.38);--mm-border-color: rgba(0, 0, 0, 0.12);--mm-divider-color: rgba(0, 0, 0, 0.12);--mm-input-background: #ffffff;--mm-input-border: rgba(0, 0, 0, 0.42);--mm-input-border-focus: var(--mm-primary-color);--mm-input-text: var(--mm-text-primary);--mm-button-background: var(--mm-primary-color);--mm-button-text: #ffffff;--mm-button-flat-text: var(--mm-primary-color);--mm-nav-background: var(--mm-primary-color);--mm-nav-text: #ffffff;--mm-nav-active-text: #ffffff;--mm-modal-background: #ffffff;--mm-overlay-background: rgba(0, 0, 0, 0.5);--mm-shadow-color: rgba(0, 0, 0, 0.16);--mm-chip-bg: #e4e4e4;--mm-chip-text: var(--mm-text-secondary);--mm-dropdown-hover: #eee;--mm-dropdown-focus: #ddd;--mm-dropdown-selected: #e3f2fd;--mm-shadow-umbra: rgba(0, 0, 0, 0.2);--mm-shadow-penumbra: rgba(0, 0, 0, 0.14);--mm-shadow-ambient: rgba(0, 0, 0, 0.12);--mm-switch-checked-track: rgba(38, 166, 154, 0.3);--mm-switch-checked-thumb: #26a69a;--mm-switch-unchecked-track: rgba(0, 0, 0, 0.6);--mm-switch-unchecked-thumb: #f5f5f5;--mm-switch-disabled-track: rgba(0, 0, 0, 0.12);--mm-switch-disabled-thumb: #bdbdbd}body{background-color:var(--mm-background-color);color:var(--mm-text-primary);transition:background-color .3s ease,color .3s ease}.container,.main{color:var(--mm-text-primary)}[data-theme=dark]{--mm-primary-color: #80cbc4;--mm-primary-color-light: #b2dfdb;--mm-primary-color-dark: #4db6ac;--mm-secondary-color: #ffa726;--mm-secondary-color-light: #ffcc02;--mm-secondary-color-dark: #ff8f00;--mm-background-color: #121212;--mm-surface-color: #1e1e1e;--mm-card-background: #2d2d2d;--mm-text-primary: rgba(255, 255, 255, 0.87);--mm-text-secondary: rgba(255, 255, 255, 0.6);--mm-text-disabled: rgba(255, 255, 255, 0.38);--mm-text-hint: rgba(255, 255, 255, 0.38);--mm-border-color: rgba(255, 255, 255, 0.12);--mm-divider-color: rgba(255, 255, 255, 0.12);--mm-input-background: #2d2d2d;--mm-input-border: rgba(255, 255, 255, 0.42);--mm-input-border-focus: var(--mm-primary-color);--mm-input-text: var(--mm-text-primary);--mm-button-background: var(--mm-primary-color);--mm-button-text: #000000;--mm-button-flat-text: var(--mm-primary-color);--mm-nav-background: #1e1e1e;--mm-nav-text: #ffffff;--mm-nav-active-text: #000000;--mm-modal-background: #2d2d2d;--mm-overlay-background: rgba(0, 0, 0, 0.8);--mm-shadow-color: rgba(0, 0, 0, 0.5);--mm-shadow-umbra: rgba(0, 0, 0, 0.5);--mm-shadow-penumbra: rgba(0, 0, 0, 0.36);--mm-shadow-ambient: rgba(0, 0, 0, 0.3);--mm-chip-bg: #424242;--mm-chip-text: var(--mm-text-secondary);--mm-dropdown-hover: #444;--mm-dropdown-focus: #555;--mm-dropdown-selected: #1e3a8a;--mm-switch-checked-track: rgba(128, 203, 196, 0.3);--mm-switch-checked-thumb: #80cbc4;--mm-switch-unchecked-track: rgba(255, 255, 255, 0.6);--mm-switch-unchecked-thumb: #616161;--mm-switch-disabled-track: rgba(255, 255, 255, 0.12);--mm-switch-disabled-thumb: #424242}@media(prefers-color-scheme: dark){:root:not([data-theme]){--mm-primary-color: #80cbc4;--mm-primary-color-light: #b2dfdb;--mm-primary-color-dark: #4db6ac;--mm-secondary-color: #ffa726;--mm-secondary-color-light: #ffcc02;--mm-secondary-color-dark: #ff8f00;--mm-background-color: #121212;--mm-surface-color: #1e1e1e;--mm-card-background: #2d2d2d;--mm-text-primary: rgba(255, 255, 255, 0.87);--mm-text-secondary: rgba(255, 255, 255, 0.6);--mm-text-disabled: rgba(255, 255, 255, 0.38);--mm-text-hint: rgba(255, 255, 255, 0.38);--mm-border-color: rgba(255, 255, 255, 0.12);--mm-divider-color: rgba(255, 255, 255, 0.12);--mm-input-background: #2d2d2d;--mm-input-border: rgba(255, 255, 255, 0.42);--mm-input-border-focus: var(--mm-primary-color);--mm-input-text: var(--mm-text-primary);--mm-button-background: var(--mm-primary-color);--mm-button-text: #000000;--mm-button-flat-text: var(--mm-primary-color);--mm-nav-background: #1e1e1e;--mm-nav-text: #ffffff;--mm-nav-active-text: #000000;--mm-modal-background: #2d2d2d;--mm-overlay-background: rgba(0, 0, 0, 0.8);--mm-shadow-color: rgba(0, 0, 0, 0.5);--mm-shadow-umbra: rgba(0, 0, 0, 0.5);--mm-shadow-penumbra: rgba(0, 0, 0, 0.36);--mm-shadow-ambient: rgba(0, 0, 0, 0.3);--mm-switch-checked-track: rgba(128, 203, 196, 0.3);--mm-switch-checked-thumb: #80cbc4;--mm-switch-unchecked-track: rgba(255, 255, 255, 0.6);--mm-switch-unchecked-thumb: #616161;--mm-switch-disabled-track: rgba(255, 255, 255, 0.12);--mm-switch-disabled-thumb: #424242}}.materialize-red{background-color:#e51c23 !important}.materialize-red-text{color:#e51c23 !important}.materialize-red.lighten-5{background-color:#fdeaeb !important}.materialize-red-text.text-lighten-5{color:#fdeaeb !important}.materialize-red.lighten-4{background-color:#f8c1c3 !important}.materialize-red-text.text-lighten-4{color:#f8c1c3 !important}.materialize-red.lighten-3{background-color:#f3989b !important}.materialize-red-text.text-lighten-3{color:#f3989b !important}.materialize-red.lighten-2{background-color:#ee6e73 !important}.materialize-red-text.text-lighten-2{color:#ee6e73 !important}.materialize-red.lighten-1{background-color:#ea454b !important}.materialize-red-text.text-lighten-1{color:#ea454b !important}.materialize-red.darken-1{background-color:#d0181e !important}.materialize-red-text.text-darken-1{color:#d0181e !important}.materialize-red.darken-2{background-color:#b9151b !important}.materialize-red-text.text-darken-2{color:#b9151b !important}.materialize-red.darken-3{background-color:#a21318 !important}.materialize-red-text.text-darken-3{color:#a21318 !important}.materialize-red.darken-4{background-color:#8b1014 !important}.materialize-red-text.text-darken-4{color:#8b1014 !important}.red{background-color:#f44336 !important}.red-text{color:#f44336 !important}.red.lighten-5{background-color:#ffebee !important}.red-text.text-lighten-5{color:#ffebee !important}.red.lighten-4{background-color:#ffcdd2 !important}.red-text.text-lighten-4{color:#ffcdd2 !important}.red.lighten-3{background-color:#ef9a9a !important}.red-text.text-lighten-3{color:#ef9a9a !important}.red.lighten-2{background-color:#e57373 !important}.red-text.text-lighten-2{color:#e57373 !important}.red.lighten-1{background-color:#ef5350 !important}.red-text.text-lighten-1{color:#ef5350 !important}.red.darken-1{background-color:#e53935 !important}.red-text.text-darken-1{color:#e53935 !important}.red.darken-2{background-color:#d32f2f !important}.red-text.text-darken-2{color:#d32f2f !important}.red.darken-3{background-color:#c62828 !important}.red-text.text-darken-3{color:#c62828 !important}.red.darken-4{background-color:#b71c1c !important}.red-text.text-darken-4{color:#b71c1c !important}.red.accent-1{background-color:#ff8a80 !important}.red-text.text-accent-1{color:#ff8a80 !important}.red.accent-2{background-color:#ff5252 !important}.red-text.text-accent-2{color:#ff5252 !important}.red.accent-3{background-color:#ff1744 !important}.red-text.text-accent-3{color:#ff1744 !important}.red.accent-4{background-color:#d50000 !important}.red-text.text-accent-4{color:#d50000 !important}.pink{background-color:#e91e63 !important}.pink-text{color:#e91e63 !important}.pink.lighten-5{background-color:#fce4ec !important}.pink-text.text-lighten-5{color:#fce4ec !important}.pink.lighten-4{background-color:#f8bbd0 !important}.pink-text.text-lighten-4{color:#f8bbd0 !important}.pink.lighten-3{background-color:#f48fb1 !important}.pink-text.text-lighten-3{color:#f48fb1 !important}.pink.lighten-2{background-color:#f06292 !important}.pink-text.text-lighten-2{color:#f06292 !important}.pink.lighten-1{background-color:#ec407a !important}.pink-text.text-lighten-1{color:#ec407a !important}.pink.darken-1{background-color:#d81b60 !important}.pink-text.text-darken-1{color:#d81b60 !important}.pink.darken-2{background-color:#c2185b !important}.pink-text.text-darken-2{color:#c2185b !important}.pink.darken-3{background-color:#ad1457 !important}.pink-text.text-darken-3{color:#ad1457 !important}.pink.darken-4{background-color:#880e4f !important}.pink-text.text-darken-4{color:#880e4f !important}.pink.accent-1{background-color:#ff80ab !important}.pink-text.text-accent-1{color:#ff80ab !important}.pink.accent-2{background-color:#ff4081 !important}.pink-text.text-accent-2{color:#ff4081 !important}.pink.accent-3{background-color:#f50057 !important}.pink-text.text-accent-3{color:#f50057 !important}.pink.accent-4{background-color:#c51162 !important}.pink-text.text-accent-4{color:#c51162 !important}.purple{background-color:#9c27b0 !important}.purple-text{color:#9c27b0 !important}.purple.lighten-5{background-color:#f3e5f5 !important}.purple-text.text-lighten-5{color:#f3e5f5 !important}.purple.lighten-4{background-color:#e1bee7 !important}.purple-text.text-lighten-4{color:#e1bee7 !important}.purple.lighten-3{background-color:#ce93d8 !important}.purple-text.text-lighten-3{color:#ce93d8 !important}.purple.lighten-2{background-color:#ba68c8 !important}.purple-text.text-lighten-2{color:#ba68c8 !important}.purple.lighten-1{background-color:#ab47bc !important}.purple-text.text-lighten-1{color:#ab47bc !important}.purple.darken-1{background-color:#8e24aa !important}.purple-text.text-darken-1{color:#8e24aa !important}.purple.darken-2{background-color:#7b1fa2 !important}.purple-text.text-darken-2{color:#7b1fa2 !important}.purple.darken-3{background-color:#6a1b9a !important}.purple-text.text-darken-3{color:#6a1b9a !important}.purple.darken-4{background-color:#4a148c !important}.purple-text.text-darken-4{color:#4a148c !important}.purple.accent-1{background-color:#ea80fc !important}.purple-text.text-accent-1{color:#ea80fc !important}.purple.accent-2{background-color:#e040fb !important}.purple-text.text-accent-2{color:#e040fb !important}.purple.accent-3{background-color:#d500f9 !important}.purple-text.text-accent-3{color:#d500f9 !important}.purple.accent-4{background-color:#a0f !important}.purple-text.text-accent-4{color:#a0f !important}.deep-purple{background-color:#673ab7 !important}.deep-purple-text{color:#673ab7 !important}.deep-purple.lighten-5{background-color:#ede7f6 !important}.deep-purple-text.text-lighten-5{color:#ede7f6 !important}.deep-purple.lighten-4{background-color:#d1c4e9 !important}.deep-purple-text.text-lighten-4{color:#d1c4e9 !important}.deep-purple.lighten-3{background-color:#b39ddb !important}.deep-purple-text.text-lighten-3{color:#b39ddb !important}.deep-purple.lighten-2{background-color:#9575cd !important}.deep-purple-text.text-lighten-2{color:#9575cd !important}.deep-purple.lighten-1{background-color:#7e57c2 !important}.deep-purple-text.text-lighten-1{color:#7e57c2 !important}.deep-purple.darken-1{background-color:#5e35b1 !important}.deep-purple-text.text-darken-1{color:#5e35b1 !important}.deep-purple.darken-2{background-color:#512da8 !important}.deep-purple-text.text-darken-2{color:#512da8 !important}.deep-purple.darken-3{background-color:#4527a0 !important}.deep-purple-text.text-darken-3{color:#4527a0 !important}.deep-purple.darken-4{background-color:#311b92 !important}.deep-purple-text.text-darken-4{color:#311b92 !important}.deep-purple.accent-1{background-color:#b388ff !important}.deep-purple-text.text-accent-1{color:#b388ff !important}.deep-purple.accent-2{background-color:#7c4dff !important}.deep-purple-text.text-accent-2{color:#7c4dff !important}.deep-purple.accent-3{background-color:#651fff !important}.deep-purple-text.text-accent-3{color:#651fff !important}.deep-purple.accent-4{background-color:#6200ea !important}.deep-purple-text.text-accent-4{color:#6200ea !important}.indigo{background-color:#3f51b5 !important}.indigo-text{color:#3f51b5 !important}.indigo.lighten-5{background-color:#e8eaf6 !important}.indigo-text.text-lighten-5{color:#e8eaf6 !important}.indigo.lighten-4{background-color:#c5cae9 !important}.indigo-text.text-lighten-4{color:#c5cae9 !important}.indigo.lighten-3{background-color:#9fa8da !important}.indigo-text.text-lighten-3{color:#9fa8da !important}.indigo.lighten-2{background-color:#7986cb !important}.indigo-text.text-lighten-2{color:#7986cb !important}.indigo.lighten-1{background-color:#5c6bc0 !important}.indigo-text.text-lighten-1{color:#5c6bc0 !important}.indigo.darken-1{background-color:#3949ab !important}.indigo-text.text-darken-1{color:#3949ab !important}.indigo.darken-2{background-color:#303f9f !important}.indigo-text.text-darken-2{color:#303f9f !important}.indigo.darken-3{background-color:#283593 !important}.indigo-text.text-darken-3{color:#283593 !important}.indigo.darken-4{background-color:#1a237e !important}.indigo-text.text-darken-4{color:#1a237e !important}.indigo.accent-1{background-color:#8c9eff !important}.indigo-text.text-accent-1{color:#8c9eff !important}.indigo.accent-2{background-color:#536dfe !important}.indigo-text.text-accent-2{color:#536dfe !important}.indigo.accent-3{background-color:#3d5afe !important}.indigo-text.text-accent-3{color:#3d5afe !important}.indigo.accent-4{background-color:#304ffe !important}.indigo-text.text-accent-4{color:#304ffe !important}.blue{background-color:#2196f3 !important}.blue-text{color:#2196f3 !important}.blue.lighten-5{background-color:#e3f2fd !important}.blue-text.text-lighten-5{color:#e3f2fd !important}.blue.lighten-4{background-color:#bbdefb !important}.blue-text.text-lighten-4{color:#bbdefb !important}.blue.lighten-3{background-color:#90caf9 !important}.blue-text.text-lighten-3{color:#90caf9 !important}.blue.lighten-2{background-color:#64b5f6 !important}.blue-text.text-lighten-2{color:#64b5f6 !important}.blue.lighten-1{background-color:#42a5f5 !important}.blue-text.text-lighten-1{color:#42a5f5 !important}.blue.darken-1{background-color:#1e88e5 !important}.blue-text.text-darken-1{color:#1e88e5 !important}.blue.darken-2{background-color:#1976d2 !important}.blue-text.text-darken-2{color:#1976d2 !important}.blue.darken-3{background-color:#1565c0 !important}.blue-text.text-darken-3{color:#1565c0 !important}.blue.darken-4{background-color:#0d47a1 !important}.blue-text.text-darken-4{color:#0d47a1 !important}.blue.accent-1{background-color:#82b1ff !important}.blue-text.text-accent-1{color:#82b1ff !important}.blue.accent-2{background-color:#448aff !important}.blue-text.text-accent-2{color:#448aff !important}.blue.accent-3{background-color:#2979ff !important}.blue-text.text-accent-3{color:#2979ff !important}.blue.accent-4{background-color:#2962ff !important}.blue-text.text-accent-4{color:#2962ff !important}.light-blue{background-color:#03a9f4 !important}.light-blue-text{color:#03a9f4 !important}.light-blue.lighten-5{background-color:#e1f5fe !important}.light-blue-text.text-lighten-5{color:#e1f5fe !important}.light-blue.lighten-4{background-color:#b3e5fc !important}.light-blue-text.text-lighten-4{color:#b3e5fc !important}.light-blue.lighten-3{background-color:#81d4fa !important}.light-blue-text.text-lighten-3{color:#81d4fa !important}.light-blue.lighten-2{background-color:#4fc3f7 !important}.light-blue-text.text-lighten-2{color:#4fc3f7 !important}.light-blue.lighten-1{background-color:#29b6f6 !important}.light-blue-text.text-lighten-1{color:#29b6f6 !important}.light-blue.darken-1{background-color:#039be5 !important}.light-blue-text.text-darken-1{color:#039be5 !important}.light-blue.darken-2{background-color:#0288d1 !important}.light-blue-text.text-darken-2{color:#0288d1 !important}.light-blue.darken-3{background-color:#0277bd !important}.light-blue-text.text-darken-3{color:#0277bd !important}.light-blue.darken-4{background-color:#01579b !important}.light-blue-text.text-darken-4{color:#01579b !important}.light-blue.accent-1{background-color:#80d8ff !important}.light-blue-text.text-accent-1{color:#80d8ff !important}.light-blue.accent-2{background-color:#40c4ff !important}.light-blue-text.text-accent-2{color:#40c4ff !important}.light-blue.accent-3{background-color:#00b0ff !important}.light-blue-text.text-accent-3{color:#00b0ff !important}.light-blue.accent-4{background-color:#0091ea !important}.light-blue-text.text-accent-4{color:#0091ea !important}.cyan{background-color:#00bcd4 !important}.cyan-text{color:#00bcd4 !important}.cyan.lighten-5{background-color:#e0f7fa !important}.cyan-text.text-lighten-5{color:#e0f7fa !important}.cyan.lighten-4{background-color:#b2ebf2 !important}.cyan-text.text-lighten-4{color:#b2ebf2 !important}.cyan.lighten-3{background-color:#80deea !important}.cyan-text.text-lighten-3{color:#80deea !important}.cyan.lighten-2{background-color:#4dd0e1 !important}.cyan-text.text-lighten-2{color:#4dd0e1 !important}.cyan.lighten-1{background-color:#26c6da !important}.cyan-text.text-lighten-1{color:#26c6da !important}.cyan.darken-1{background-color:#00acc1 !important}.cyan-text.text-darken-1{color:#00acc1 !important}.cyan.darken-2{background-color:#0097a7 !important}.cyan-text.text-darken-2{color:#0097a7 !important}.cyan.darken-3{background-color:#00838f !important}.cyan-text.text-darken-3{color:#00838f !important}.cyan.darken-4{background-color:#006064 !important}.cyan-text.text-darken-4{color:#006064 !important}.cyan.accent-1{background-color:#84ffff !important}.cyan-text.text-accent-1{color:#84ffff !important}.cyan.accent-2{background-color:#18ffff !important}.cyan-text.text-accent-2{color:#18ffff !important}.cyan.accent-3{background-color:#00e5ff !important}.cyan-text.text-accent-3{color:#00e5ff !important}.cyan.accent-4{background-color:#00b8d4 !important}.cyan-text.text-accent-4{color:#00b8d4 !important}.teal{background-color:#009688 !important}.teal-text{color:#009688 !important}.teal.lighten-5{background-color:#e0f2f1 !important}.teal-text.text-lighten-5{color:#e0f2f1 !important}.teal.lighten-4{background-color:#b2dfdb !important}.teal-text.text-lighten-4{color:#b2dfdb !important}.teal.lighten-3{background-color:#80cbc4 !important}.teal-text.text-lighten-3{color:#80cbc4 !important}.teal.lighten-2{background-color:#4db6ac !important}.teal-text.text-lighten-2{color:#4db6ac !important}.teal.lighten-1{background-color:#26a69a !important}.teal-text.text-lighten-1{color:#26a69a !important}.teal.darken-1{background-color:#00897b !important}.teal-text.text-darken-1{color:#00897b !important}.teal.darken-2{background-color:#00796b !important}.teal-text.text-darken-2{color:#00796b !important}.teal.darken-3{background-color:#00695c !important}.teal-text.text-darken-3{color:#00695c !important}.teal.darken-4{background-color:#004d40 !important}.teal-text.text-darken-4{color:#004d40 !important}.teal.accent-1{background-color:#a7ffeb !important}.teal-text.text-accent-1{color:#a7ffeb !important}.teal.accent-2{background-color:#64ffda !important}.teal-text.text-accent-2{color:#64ffda !important}.teal.accent-3{background-color:#1de9b6 !important}.teal-text.text-accent-3{color:#1de9b6 !important}.teal.accent-4{background-color:#00bfa5 !important}.teal-text.text-accent-4{color:#00bfa5 !important}.green{background-color:#4caf50 !important}.green-text{color:#4caf50 !important}.green.lighten-5{background-color:#e8f5e9 !important}.green-text.text-lighten-5{color:#e8f5e9 !important}.green.lighten-4{background-color:#c8e6c9 !important}.green-text.text-lighten-4{color:#c8e6c9 !important}.green.lighten-3{background-color:#a5d6a7 !important}.green-text.text-lighten-3{color:#a5d6a7 !important}.green.lighten-2{background-color:#81c784 !important}.green-text.text-lighten-2{color:#81c784 !important}.green.lighten-1{background-color:#66bb6a !important}.green-text.text-lighten-1{color:#66bb6a !important}.green.darken-1{background-color:#43a047 !important}.green-text.text-darken-1{color:#43a047 !important}.green.darken-2{background-color:#388e3c !important}.green-text.text-darken-2{color:#388e3c !important}.green.darken-3{background-color:#2e7d32 !important}.green-text.text-darken-3{color:#2e7d32 !important}.green.darken-4{background-color:#1b5e20 !important}.green-text.text-darken-4{color:#1b5e20 !important}.green.accent-1{background-color:#b9f6ca !important}.green-text.text-accent-1{color:#b9f6ca !important}.green.accent-2{background-color:#69f0ae !important}.green-text.text-accent-2{color:#69f0ae !important}.green.accent-3{background-color:#00e676 !important}.green-text.text-accent-3{color:#00e676 !important}.green.accent-4{background-color:#00c853 !important}.green-text.text-accent-4{color:#00c853 !important}.light-green{background-color:#8bc34a !important}.light-green-text{color:#8bc34a !important}.light-green.lighten-5{background-color:#f1f8e9 !important}.light-green-text.text-lighten-5{color:#f1f8e9 !important}.light-green.lighten-4{background-color:#dcedc8 !important}.light-green-text.text-lighten-4{color:#dcedc8 !important}.light-green.lighten-3{background-color:#c5e1a5 !important}.light-green-text.text-lighten-3{color:#c5e1a5 !important}.light-green.lighten-2{background-color:#aed581 !important}.light-green-text.text-lighten-2{color:#aed581 !important}.light-green.lighten-1{background-color:#9ccc65 !important}.light-green-text.text-lighten-1{color:#9ccc65 !important}.light-green.darken-1{background-color:#7cb342 !important}.light-green-text.text-darken-1{color:#7cb342 !important}.light-green.darken-2{background-color:#689f38 !important}.light-green-text.text-darken-2{color:#689f38 !important}.light-green.darken-3{background-color:#558b2f !important}.light-green-text.text-darken-3{color:#558b2f !important}.light-green.darken-4{background-color:#33691e !important}.light-green-text.text-darken-4{color:#33691e !important}.light-green.accent-1{background-color:#ccff90 !important}.light-green-text.text-accent-1{color:#ccff90 !important}.light-green.accent-2{background-color:#b2ff59 !important}.light-green-text.text-accent-2{color:#b2ff59 !important}.light-green.accent-3{background-color:#76ff03 !important}.light-green-text.text-accent-3{color:#76ff03 !important}.light-green.accent-4{background-color:#64dd17 !important}.light-green-text.text-accent-4{color:#64dd17 !important}.lime{background-color:#cddc39 !important}.lime-text{color:#cddc39 !important}.lime.lighten-5{background-color:#f9fbe7 !important}.lime-text.text-lighten-5{color:#f9fbe7 !important}.lime.lighten-4{background-color:#f0f4c3 !important}.lime-text.text-lighten-4{color:#f0f4c3 !important}.lime.lighten-3{background-color:#e6ee9c !important}.lime-text.text-lighten-3{color:#e6ee9c !important}.lime.lighten-2{background-color:#dce775 !important}.lime-text.text-lighten-2{color:#dce775 !important}.lime.lighten-1{background-color:#d4e157 !important}.lime-text.text-lighten-1{color:#d4e157 !important}.lime.darken-1{background-color:#c0ca33 !important}.lime-text.text-darken-1{color:#c0ca33 !important}.lime.darken-2{background-color:#afb42b !important}.lime-text.text-darken-2{color:#afb42b !important}.lime.darken-3{background-color:#9e9d24 !important}.lime-text.text-darken-3{color:#9e9d24 !important}.lime.darken-4{background-color:#827717 !important}.lime-text.text-darken-4{color:#827717 !important}.lime.accent-1{background-color:#f4ff81 !important}.lime-text.text-accent-1{color:#f4ff81 !important}.lime.accent-2{background-color:#eeff41 !important}.lime-text.text-accent-2{color:#eeff41 !important}.lime.accent-3{background-color:#c6ff00 !important}.lime-text.text-accent-3{color:#c6ff00 !important}.lime.accent-4{background-color:#aeea00 !important}.lime-text.text-accent-4{color:#aeea00 !important}.yellow{background-color:#ffeb3b !important}.yellow-text{color:#ffeb3b !important}.yellow.lighten-5{background-color:#fffde7 !important}.yellow-text.text-lighten-5{color:#fffde7 !important}.yellow.lighten-4{background-color:#fff9c4 !important}.yellow-text.text-lighten-4{color:#fff9c4 !important}.yellow.lighten-3{background-color:#fff59d !important}.yellow-text.text-lighten-3{color:#fff59d !important}.yellow.lighten-2{background-color:#fff176 !important}.yellow-text.text-lighten-2{color:#fff176 !important}.yellow.lighten-1{background-color:#ffee58 !important}.yellow-text.text-lighten-1{color:#ffee58 !important}.yellow.darken-1{background-color:#fdd835 !important}.yellow-text.text-darken-1{color:#fdd835 !important}.yellow.darken-2{background-color:#fbc02d !important}.yellow-text.text-darken-2{color:#fbc02d !important}.yellow.darken-3{background-color:#f9a825 !important}.yellow-text.text-darken-3{color:#f9a825 !important}.yellow.darken-4{background-color:#f57f17 !important}.yellow-text.text-darken-4{color:#f57f17 !important}.yellow.accent-1{background-color:#ffff8d !important}.yellow-text.text-accent-1{color:#ffff8d !important}.yellow.accent-2{background-color:#ff0 !important}.yellow-text.text-accent-2{color:#ff0 !important}.yellow.accent-3{background-color:#ffea00 !important}.yellow-text.text-accent-3{color:#ffea00 !important}.yellow.accent-4{background-color:#ffd600 !important}.yellow-text.text-accent-4{color:#ffd600 !important}.amber{background-color:#ffc107 !important}.amber-text{color:#ffc107 !important}.amber.lighten-5{background-color:#fff8e1 !important}.amber-text.text-lighten-5{color:#fff8e1 !important}.amber.lighten-4{background-color:#ffecb3 !important}.amber-text.text-lighten-4{color:#ffecb3 !important}.amber.lighten-3{background-color:#ffe082 !important}.amber-text.text-lighten-3{color:#ffe082 !important}.amber.lighten-2{background-color:#ffd54f !important}.amber-text.text-lighten-2{color:#ffd54f !important}.amber.lighten-1{background-color:#ffca28 !important}.amber-text.text-lighten-1{color:#ffca28 !important}.amber.darken-1{background-color:#ffb300 !important}.amber-text.text-darken-1{color:#ffb300 !important}.amber.darken-2{background-color:#ffa000 !important}.amber-text.text-darken-2{color:#ffa000 !important}.amber.darken-3{background-color:#ff8f00 !important}.amber-text.text-darken-3{color:#ff8f00 !important}.amber.darken-4{background-color:#ff6f00 !important}.amber-text.text-darken-4{color:#ff6f00 !important}.amber.accent-1{background-color:#ffe57f !important}.amber-text.text-accent-1{color:#ffe57f !important}.amber.accent-2{background-color:#ffd740 !important}.amber-text.text-accent-2{color:#ffd740 !important}.amber.accent-3{background-color:#ffc400 !important}.amber-text.text-accent-3{color:#ffc400 !important}.amber.accent-4{background-color:#ffab00 !important}.amber-text.text-accent-4{color:#ffab00 !important}.orange{background-color:#ff9800 !important}.orange-text{color:#ff9800 !important}.orange.lighten-5{background-color:#fff3e0 !important}.orange-text.text-lighten-5{color:#fff3e0 !important}.orange.lighten-4{background-color:#ffe0b2 !important}.orange-text.text-lighten-4{color:#ffe0b2 !important}.orange.lighten-3{background-color:#ffcc80 !important}.orange-text.text-lighten-3{color:#ffcc80 !important}.orange.lighten-2{background-color:#ffb74d !important}.orange-text.text-lighten-2{color:#ffb74d !important}.orange.lighten-1{background-color:#ffa726 !important}.orange-text.text-lighten-1{color:#ffa726 !important}.orange.darken-1{background-color:#fb8c00 !important}.orange-text.text-darken-1{color:#fb8c00 !important}.orange.darken-2{background-color:#f57c00 !important}.orange-text.text-darken-2{color:#f57c00 !important}.orange.darken-3{background-color:#ef6c00 !important}.orange-text.text-darken-3{color:#ef6c00 !important}.orange.darken-4{background-color:#e65100 !important}.orange-text.text-darken-4{color:#e65100 !important}.orange.accent-1{background-color:#ffd180 !important}.orange-text.text-accent-1{color:#ffd180 !important}.orange.accent-2{background-color:#ffab40 !important}.orange-text.text-accent-2{color:#ffab40 !important}.orange.accent-3{background-color:#ff9100 !important}.orange-text.text-accent-3{color:#ff9100 !important}.orange.accent-4{background-color:#ff6d00 !important}.orange-text.text-accent-4{color:#ff6d00 !important}.deep-orange{background-color:#ff5722 !important}.deep-orange-text{color:#ff5722 !important}.deep-orange.lighten-5{background-color:#fbe9e7 !important}.deep-orange-text.text-lighten-5{color:#fbe9e7 !important}.deep-orange.lighten-4{background-color:#ffccbc !important}.deep-orange-text.text-lighten-4{color:#ffccbc !important}.deep-orange.lighten-3{background-color:#ffab91 !important}.deep-orange-text.text-lighten-3{color:#ffab91 !important}.deep-orange.lighten-2{background-color:#ff8a65 !important}.deep-orange-text.text-lighten-2{color:#ff8a65 !important}.deep-orange.lighten-1{background-color:#ff7043 !important}.deep-orange-text.text-lighten-1{color:#ff7043 !important}.deep-orange.darken-1{background-color:#f4511e !important}.deep-orange-text.text-darken-1{color:#f4511e !important}.deep-orange.darken-2{background-color:#e64a19 !important}.deep-orange-text.text-darken-2{color:#e64a19 !important}.deep-orange.darken-3{background-color:#d84315 !important}.deep-orange-text.text-darken-3{color:#d84315 !important}.deep-orange.darken-4{background-color:#bf360c !important}.deep-orange-text.text-darken-4{color:#bf360c !important}.deep-orange.accent-1{background-color:#ff9e80 !important}.deep-orange-text.text-accent-1{color:#ff9e80 !important}.deep-orange.accent-2{background-color:#ff6e40 !important}.deep-orange-text.text-accent-2{color:#ff6e40 !important}.deep-orange.accent-3{background-color:#ff3d00 !important}.deep-orange-text.text-accent-3{color:#ff3d00 !important}.deep-orange.accent-4{background-color:#dd2c00 !important}.deep-orange-text.text-accent-4{color:#dd2c00 !important}.brown{background-color:#795548 !important}.brown-text{color:#795548 !important}.brown.lighten-5{background-color:#efebe9 !important}.brown-text.text-lighten-5{color:#efebe9 !important}.brown.lighten-4{background-color:#d7ccc8 !important}.brown-text.text-lighten-4{color:#d7ccc8 !important}.brown.lighten-3{background-color:#bcaaa4 !important}.brown-text.text-lighten-3{color:#bcaaa4 !important}.brown.lighten-2{background-color:#a1887f !important}.brown-text.text-lighten-2{color:#a1887f !important}.brown.lighten-1{background-color:#8d6e63 !important}.brown-text.text-lighten-1{color:#8d6e63 !important}.brown.darken-1{background-color:#6d4c41 !important}.brown-text.text-darken-1{color:#6d4c41 !important}.brown.darken-2{background-color:#5d4037 !important}.brown-text.text-darken-2{color:#5d4037 !important}.brown.darken-3{background-color:#4e342e !important}.brown-text.text-darken-3{color:#4e342e !important}.brown.darken-4{background-color:#3e2723 !important}.brown-text.text-darken-4{color:#3e2723 !important}.blue-grey{background-color:#607d8b !important}.blue-grey-text{color:#607d8b !important}.blue-grey.lighten-5{background-color:#eceff1 !important}.blue-grey-text.text-lighten-5{color:#eceff1 !important}.blue-grey.lighten-4{background-color:#cfd8dc !important}.blue-grey-text.text-lighten-4{color:#cfd8dc !important}.blue-grey.lighten-3{background-color:#b0bec5 !important}.blue-grey-text.text-lighten-3{color:#b0bec5 !important}.blue-grey.lighten-2{background-color:#90a4ae !important}.blue-grey-text.text-lighten-2{color:#90a4ae !important}.blue-grey.lighten-1{background-color:#78909c !important}.blue-grey-text.text-lighten-1{color:#78909c !important}.blue-grey.darken-1{background-color:#546e7a !important}.blue-grey-text.text-darken-1{color:#546e7a !important}.blue-grey.darken-2{background-color:#455a64 !important}.blue-grey-text.text-darken-2{color:#455a64 !important}.blue-grey.darken-3{background-color:#37474f !important}.blue-grey-text.text-darken-3{color:#37474f !important}.blue-grey.darken-4{background-color:#263238 !important}.blue-grey-text.text-darken-4{color:#263238 !important}.grey{background-color:#9e9e9e !important}.grey-text{color:#9e9e9e !important}.grey.lighten-5{background-color:#fafafa !important}.grey-text.text-lighten-5{color:#fafafa !important}.grey.lighten-4{background-color:#f5f5f5 !important}.grey-text.text-lighten-4{color:#f5f5f5 !important}.grey.lighten-3{background-color:#eee !important}.grey-text.text-lighten-3{color:#eee !important}.grey.lighten-2{background-color:#e0e0e0 !important}.grey-text.text-lighten-2{color:#e0e0e0 !important}.grey.lighten-1{background-color:#bdbdbd !important}.grey-text.text-lighten-1{color:#bdbdbd !important}.grey.darken-1{background-color:#757575 !important}.grey-text.text-darken-1{color:#757575 !important}.grey.darken-2{background-color:#616161 !important}.grey-text.text-darken-2{color:#616161 !important}.grey.darken-3{background-color:#424242 !important}.grey-text.text-darken-3{color:#424242 !important}.grey.darken-4{background-color:#212121 !important}.grey-text.text-darken-4{color:#212121 !important}.black{background-color:#000 !important}.black-text{color:#000 !important}.white{background-color:#fff !important}.white-text{color:#fff !important}.transparent{background-color:rgba(0,0,0,0) !important}.transparent-text{color:rgba(0,0,0,0) !important}/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,footer,header,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:rgba(0,0,0,0);-webkit-text-decoration-skip:objects}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-0.25em}sup{top:-0.5em}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}button,html [type=button],[type=reset],[type=submit]{-webkit-appearance:button}button::-moz-focus-inner,[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner{border-style:none;padding:0}button:-moz-focusring,[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}template{display:none}[hidden]{display:none}html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}button,input,optgroup,select,textarea{font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif}ul:not(.browser-default){padding-left:0;list-style-type:none}ul:not(.browser-default)>li{list-style-type:none}a{color:#039be5;text-decoration:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.valign-wrapper{display:flex;align-items:center}.clearfix{clear:both}.z-depth-0{box-shadow:none !important}.z-depth-1,.sidenav,.collapsible,.dropdown-content,.btn,.btn-floating,.btn-large,.btn-small,.toast,.card-panel,.card,nav{box-shadow:0 2px 2px 0 rgba(0,0,0,.14),0 3px 1px -2px rgba(0,0,0,.12),0 1px 5px 0 rgba(0,0,0,.2)}.z-depth-1-half,.btn:hover,.btn-floating:hover,.btn-large:hover,.btn-small:hover{box-shadow:0 3px 3px 0 rgba(0,0,0,.14),0 1px 7px 0 rgba(0,0,0,.12),0 3px 1px -1px rgba(0,0,0,.2)}.z-depth-2{box-shadow:0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12),0 2px 4px -1px rgba(0,0,0,.3)}.z-depth-3{box-shadow:0 8px 17px 2px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12),0 5px 5px -3px rgba(0,0,0,.2)}.z-depth-4{box-shadow:0 16px 24px 2px rgba(0,0,0,.14),0 6px 30px 5px rgba(0,0,0,.12),0 8px 10px -7px rgba(0,0,0,.2)}.z-depth-5,.modal{box-shadow:0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12),0 11px 15px -7px rgba(0,0,0,.2)}.hoverable{transition:box-shadow .25s}.hoverable:hover{box-shadow:0 8px 17px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)}.divider{height:1px;overflow:hidden;background-color:#e0e0e0}blockquote{margin:20px 0;padding-left:1.5rem;border-left:5px solid #ee6e73}i{line-height:inherit}i.left{float:left;margin-right:15px}i.right{float:right;margin-left:15px}i.tiny{font-size:1rem}i.small{font-size:2rem}i.medium{font-size:4rem}i.large{font-size:6rem}img.responsive-img,video.responsive-video{max-width:100%;height:auto}.pagination li{display:inline-block;border-radius:2px;text-align:center;vertical-align:top;height:30px}.pagination li a{color:#444;display:inline-block;font-size:1.2rem;padding:0 10px;line-height:30px}.pagination li.active a{color:#fff}.pagination li.active{background-color:#ee6e73}.pagination li.disabled a{cursor:default;color:#999}.pagination li i{font-size:2rem}.pagination li.pages ul li{display:inline-block;float:none}@media only screen and (max-width : 992px){.pagination{width:100%}.pagination li.prev,.pagination li.next{width:10%}.pagination li.pages{width:80%;overflow:hidden;white-space:nowrap}}.breadcrumb{display:inline-block;font-size:18px;color:hsla(0,0%,100%,.7)}.breadcrumb i,.breadcrumb [class^=mdi-],.breadcrumb [class*=mdi-],.breadcrumb i.material-icons{display:inline-block;float:left;font-size:24px}.breadcrumb:before{content:\"\";color:hsla(0,0%,100%,.7);vertical-align:top;display:inline-block;font-family:\"Material Icons\";font-weight:normal;font-style:normal;font-size:25px;margin:0 10px 0 8px;-webkit-font-smoothing:antialiased;float:left}.breadcrumb:first-child:before{display:none}.breadcrumb:last-child{color:#fff}.parallax-container{position:relative;overflow:hidden;height:500px}.parallax-container .parallax{position:absolute;top:0;left:0;right:0;bottom:0;z-index:-1}.parallax-container .parallax img{opacity:0;position:absolute;left:50%;bottom:0;min-width:100%;min-height:100%;transform:translate3d(0, 0, 0);transform:translateX(-50%)}.pin-top,.pin-bottom{position:relative}.pinned{position:fixed !important}ul.staggered-list li{opacity:0}.fade-in{opacity:0;transform-origin:0 50%}@media only screen and (max-width : 600px){.hide-on-small-only,.hide-on-small-and-down{display:none !important}}@media only screen and (max-width : 992px){.hide-on-med-and-down{display:none !important}}@media only screen and (min-width : 601px){.hide-on-med-and-up{display:none !important}}@media only screen and (min-width: 600px)and (max-width: 992px){.hide-on-med-only{display:none !important}}@media only screen and (min-width : 993px){.hide-on-large-only{display:none !important}}@media only screen and (min-width : 1201px){.hide-on-extra-large-only{display:none !important}}@media only screen and (min-width : 1201px){.show-on-extra-large{display:block !important}}@media only screen and (min-width : 993px){.show-on-large{display:block !important}}@media only screen and (min-width: 600px)and (max-width: 992px){.show-on-medium{display:block !important}}@media only screen and (max-width : 600px){.show-on-small{display:block !important}}@media only screen and (min-width : 601px){.show-on-medium-and-up{display:block !important}}@media only screen and (max-width : 992px){.show-on-medium-and-down{display:block !important}}@media only screen and (max-width : 600px){.center-on-small-only{text-align:center}}.page-footer{padding-top:20px;color:#fff;background-color:#ee6e73}.page-footer .footer-copyright{overflow:hidden;min-height:50px;display:flex;align-items:center;justify-content:space-between;padding:10px 0px;color:hsla(0,0%,100%,.8);background-color:rgba(51,51,51,.08)}table,th,td{border:none}table{width:100%;display:table;border-collapse:collapse;border-spacing:0}table.striped tr{border-bottom:none}table.striped>tbody>tr:nth-child(odd){background-color:rgba(242,242,242,.5)}table.striped>tbody>tr>td{border-radius:0}table.highlight>tbody>tr{transition:background-color .25s ease}table.highlight>tbody>tr:hover{background-color:rgba(242,242,242,.5)}table.centered thead tr th,table.centered tbody tr td{text-align:center}tr{border-bottom:1px solid rgba(0,0,0,.12)}td,th{padding:15px 5px;display:table-cell;text-align:left;vertical-align:middle;border-radius:2px}@media only screen and (max-width : 992px){table.responsive-table{width:100%;border-collapse:collapse;border-spacing:0;display:block;position:relative}table.responsive-table td:empty:before{content:\" \"}table.responsive-table th,table.responsive-table td{margin:0;vertical-align:top}table.responsive-table th{text-align:left}table.responsive-table thead{display:block;float:left}table.responsive-table thead tr{display:block;padding:0 10px 0 0}table.responsive-table thead tr th::before{content:\" \"}table.responsive-table tbody{display:block;width:auto;position:relative;overflow-x:auto;white-space:nowrap}table.responsive-table tbody tr{display:inline-block;vertical-align:top}table.responsive-table th{display:block;text-align:right}table.responsive-table td{display:block;min-height:1.25em;text-align:left}table.responsive-table tr{border-bottom:none;padding:0 10px}table.responsive-table thead{border:0;border-right:1px solid rgba(0,0,0,.12)}}.collection{margin:.5rem 0 1rem 0;border:1px solid var(--mm-border-color, #e0e0e0);border-radius:2px;overflow:hidden;position:relative}.collection .collection-item{background-color:var(--mm-surface-color, #fff);color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));line-height:1.5rem;padding:10px 20px;margin:0;border-bottom:1px solid var(--mm-border-color, #e0e0e0)}.collection .collection-item.avatar{min-height:84px;padding-left:72px;position:relative}.collection .collection-item.avatar:not(.circle-clipper)>.circle,.collection .collection-item.avatar :not(.circle-clipper)>.circle{position:absolute;width:42px;height:42px;overflow:hidden;left:15px;display:inline-block;vertical-align:middle}.collection .collection-item.avatar i.circle{font-size:18px;line-height:42px;color:#fff;background-color:#999;text-align:center}.collection .collection-item.avatar .title{font-size:16px}.collection .collection-item.avatar p{margin:0}.collection .collection-item.avatar .secondary-content{position:absolute;top:16px;right:16px}.collection .collection-item:last-child{border-bottom:none}.collection .collection-item.active{background-color:#26a69a;color:rgb(234.25,250.25,248.75)}.collection .collection-item.active .secondary-content{color:#fff}.collection a.collection-item{display:block;transition:.25s;color:#26a69a}.collection a.collection-item:not(.active):hover{background-color:#ddd}.collection.with-header .collection-header{background-color:var(--mm-surface-color, #fff);color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));border-bottom:1px solid var(--mm-border-color, #e0e0e0);padding:10px 20px}.collection.with-header .collection-item{padding-left:30px}.collection.with-header .collection-item.avatar{padding-left:72px}.secondary-content{float:right;color:#26a69a}.collapsible .collection{margin:0;border:none}.video-container{position:relative;padding-bottom:56.25%;height:0;overflow:hidden}.video-container iframe,.video-container object,.video-container embed{position:absolute;top:0;left:0;width:100%;height:100%}.progress{position:relative;height:4px;display:block;width:100%;background-color:#acece6;border-radius:2px;margin:.5rem 0 1rem 0;overflow:hidden}.progress .determinate{position:absolute;top:0;left:0;bottom:0;background-color:#26a69a;transition:width .3s linear}.progress .indeterminate{background-color:#26a69a}.progress .indeterminate:before{content:\"\";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;animation:indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite}.progress .indeterminate:after{content:\"\";position:absolute;background-color:inherit;top:0;left:0;bottom:0;will-change:left,right;animation:indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;animation-delay:1.15s}@keyframes indeterminate{0%{left:-35%;right:100%}60%{left:100%;right:-90%}100%{left:100%;right:-90%}}@keyframes indeterminate-short{0%{left:-200%;right:100%}60%{left:107%;right:-8%}100%{left:107%;right:-8%}}.hide{display:none !important}.left-align{text-align:left}.right-align{text-align:right}.center,.center-align{text-align:center}.left{float:left !important}.right{float:right !important}.no-select,input[type=range],input[type=range]+.thumb{user-select:none}.circle{border-radius:50%}.center-block{display:block;margin-left:auto;margin-right:auto}.truncate{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.no-padding{padding:0 !important}span.badge{min-width:3rem;padding:0 6px;margin-left:14px;text-align:center;font-size:1rem;line-height:22px;height:22px;color:#757575;float:right;box-sizing:border-box}span.badge.new{font-weight:300;font-size:.8rem;color:#fff;background-color:#26a69a;border-radius:2px}span.badge.new:after{content:\" new\"}span.badge[data-badge-caption]::after{content:\" \" attr(data-badge-caption)}nav ul a span.badge{display:inline-block;float:none;margin-left:4px;line-height:22px;height:22px;-webkit-font-smoothing:auto}.collection-item span.badge{margin-top:calc(0.75rem - 11px)}.collapsible span.badge{margin-left:auto}.sidenav span.badge{margin-top:calc(24px - 11px)}table span.badge{display:inline-block;float:none;margin-left:auto}.material-icons{text-rendering:optimizeLegibility;font-feature-settings:\"liga\"}.container{margin:0 auto;max-width:1280px;width:90%}@media only screen and (min-width : 601px){.container{width:85%}}@media only screen and (min-width : 993px){.container{width:70%}}.col .row{margin-left:-0.75rem;margin-right:-0.75rem}.section{padding-top:1rem;padding-bottom:1rem}.section.no-pad{padding:0}.section.no-pad-bot{padding-bottom:0}.section.no-pad-top{padding-top:0}.row{margin-left:auto;margin-right:auto;margin-bottom:20px}.row:after{content:\"\";display:table;clear:both}.row .col{float:left;box-sizing:border-box;padding:0 .75rem;min-height:1px}.row .col[class*=push-],.row .col[class*=pull-]{position:relative}.row .col.s1{width:8.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.s2{width:16.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.s3{width:25%;margin-left:auto;left:auto;right:auto}.row .col.s4{width:33.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.s5{width:41.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.s6{width:50%;margin-left:auto;left:auto;right:auto}.row .col.s7{width:58.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.s8{width:66.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.s9{width:75%;margin-left:auto;left:auto;right:auto}.row .col.s10{width:83.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.s11{width:91.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.s12{width:100%;margin-left:auto;left:auto;right:auto}.row .col.offset-s1{margin-left:8.3333333333%}.row .col.pull-s1{right:8.3333333333%}.row .col.push-s1{left:8.3333333333%}.row .col.offset-s2{margin-left:16.6666666667%}.row .col.pull-s2{right:16.6666666667%}.row .col.push-s2{left:16.6666666667%}.row .col.offset-s3{margin-left:25%}.row .col.pull-s3{right:25%}.row .col.push-s3{left:25%}.row .col.offset-s4{margin-left:33.3333333333%}.row .col.pull-s4{right:33.3333333333%}.row .col.push-s4{left:33.3333333333%}.row .col.offset-s5{margin-left:41.6666666667%}.row .col.pull-s5{right:41.6666666667%}.row .col.push-s5{left:41.6666666667%}.row .col.offset-s6{margin-left:50%}.row .col.pull-s6{right:50%}.row .col.push-s6{left:50%}.row .col.offset-s7{margin-left:58.3333333333%}.row .col.pull-s7{right:58.3333333333%}.row .col.push-s7{left:58.3333333333%}.row .col.offset-s8{margin-left:66.6666666667%}.row .col.pull-s8{right:66.6666666667%}.row .col.push-s8{left:66.6666666667%}.row .col.offset-s9{margin-left:75%}.row .col.pull-s9{right:75%}.row .col.push-s9{left:75%}.row .col.offset-s10{margin-left:83.3333333333%}.row .col.pull-s10{right:83.3333333333%}.row .col.push-s10{left:83.3333333333%}.row .col.offset-s11{margin-left:91.6666666667%}.row .col.pull-s11{right:91.6666666667%}.row .col.push-s11{left:91.6666666667%}.row .col.offset-s12{margin-left:100%}.row .col.pull-s12{right:100%}.row .col.push-s12{left:100%}@media only screen and (min-width : 601px){.row .col.m1{width:8.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.m2{width:16.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.m3{width:25%;margin-left:auto;left:auto;right:auto}.row .col.m4{width:33.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.m5{width:41.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.m6{width:50%;margin-left:auto;left:auto;right:auto}.row .col.m7{width:58.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.m8{width:66.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.m9{width:75%;margin-left:auto;left:auto;right:auto}.row .col.m10{width:83.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.m11{width:91.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.m12{width:100%;margin-left:auto;left:auto;right:auto}.row .col.offset-m1{margin-left:8.3333333333%}.row .col.pull-m1{right:8.3333333333%}.row .col.push-m1{left:8.3333333333%}.row .col.offset-m2{margin-left:16.6666666667%}.row .col.pull-m2{right:16.6666666667%}.row .col.push-m2{left:16.6666666667%}.row .col.offset-m3{margin-left:25%}.row .col.pull-m3{right:25%}.row .col.push-m3{left:25%}.row .col.offset-m4{margin-left:33.3333333333%}.row .col.pull-m4{right:33.3333333333%}.row .col.push-m4{left:33.3333333333%}.row .col.offset-m5{margin-left:41.6666666667%}.row .col.pull-m5{right:41.6666666667%}.row .col.push-m5{left:41.6666666667%}.row .col.offset-m6{margin-left:50%}.row .col.pull-m6{right:50%}.row .col.push-m6{left:50%}.row .col.offset-m7{margin-left:58.3333333333%}.row .col.pull-m7{right:58.3333333333%}.row .col.push-m7{left:58.3333333333%}.row .col.offset-m8{margin-left:66.6666666667%}.row .col.pull-m8{right:66.6666666667%}.row .col.push-m8{left:66.6666666667%}.row .col.offset-m9{margin-left:75%}.row .col.pull-m9{right:75%}.row .col.push-m9{left:75%}.row .col.offset-m10{margin-left:83.3333333333%}.row .col.pull-m10{right:83.3333333333%}.row .col.push-m10{left:83.3333333333%}.row .col.offset-m11{margin-left:91.6666666667%}.row .col.pull-m11{right:91.6666666667%}.row .col.push-m11{left:91.6666666667%}.row .col.offset-m12{margin-left:100%}.row .col.pull-m12{right:100%}.row .col.push-m12{left:100%}}@media only screen and (min-width : 993px){.row .col.l1{width:8.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.l2{width:16.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.l3{width:25%;margin-left:auto;left:auto;right:auto}.row .col.l4{width:33.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.l5{width:41.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.l6{width:50%;margin-left:auto;left:auto;right:auto}.row .col.l7{width:58.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.l8{width:66.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.l9{width:75%;margin-left:auto;left:auto;right:auto}.row .col.l10{width:83.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.l11{width:91.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.l12{width:100%;margin-left:auto;left:auto;right:auto}.row .col.offset-l1{margin-left:8.3333333333%}.row .col.pull-l1{right:8.3333333333%}.row .col.push-l1{left:8.3333333333%}.row .col.offset-l2{margin-left:16.6666666667%}.row .col.pull-l2{right:16.6666666667%}.row .col.push-l2{left:16.6666666667%}.row .col.offset-l3{margin-left:25%}.row .col.pull-l3{right:25%}.row .col.push-l3{left:25%}.row .col.offset-l4{margin-left:33.3333333333%}.row .col.pull-l4{right:33.3333333333%}.row .col.push-l4{left:33.3333333333%}.row .col.offset-l5{margin-left:41.6666666667%}.row .col.pull-l5{right:41.6666666667%}.row .col.push-l5{left:41.6666666667%}.row .col.offset-l6{margin-left:50%}.row .col.pull-l6{right:50%}.row .col.push-l6{left:50%}.row .col.offset-l7{margin-left:58.3333333333%}.row .col.pull-l7{right:58.3333333333%}.row .col.push-l7{left:58.3333333333%}.row .col.offset-l8{margin-left:66.6666666667%}.row .col.pull-l8{right:66.6666666667%}.row .col.push-l8{left:66.6666666667%}.row .col.offset-l9{margin-left:75%}.row .col.pull-l9{right:75%}.row .col.push-l9{left:75%}.row .col.offset-l10{margin-left:83.3333333333%}.row .col.pull-l10{right:83.3333333333%}.row .col.push-l10{left:83.3333333333%}.row .col.offset-l11{margin-left:91.6666666667%}.row .col.pull-l11{right:91.6666666667%}.row .col.push-l11{left:91.6666666667%}.row .col.offset-l12{margin-left:100%}.row .col.pull-l12{right:100%}.row .col.push-l12{left:100%}}@media only screen and (min-width : 1201px){.row .col.xl1{width:8.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.xl2{width:16.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.xl3{width:25%;margin-left:auto;left:auto;right:auto}.row .col.xl4{width:33.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.xl5{width:41.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.xl6{width:50%;margin-left:auto;left:auto;right:auto}.row .col.xl7{width:58.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.xl8{width:66.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.xl9{width:75%;margin-left:auto;left:auto;right:auto}.row .col.xl10{width:83.3333333333%;margin-left:auto;left:auto;right:auto}.row .col.xl11{width:91.6666666667%;margin-left:auto;left:auto;right:auto}.row .col.xl12{width:100%;margin-left:auto;left:auto;right:auto}.row .col.offset-xl1{margin-left:8.3333333333%}.row .col.pull-xl1{right:8.3333333333%}.row .col.push-xl1{left:8.3333333333%}.row .col.offset-xl2{margin-left:16.6666666667%}.row .col.pull-xl2{right:16.6666666667%}.row .col.push-xl2{left:16.6666666667%}.row .col.offset-xl3{margin-left:25%}.row .col.pull-xl3{right:25%}.row .col.push-xl3{left:25%}.row .col.offset-xl4{margin-left:33.3333333333%}.row .col.pull-xl4{right:33.3333333333%}.row .col.push-xl4{left:33.3333333333%}.row .col.offset-xl5{margin-left:41.6666666667%}.row .col.pull-xl5{right:41.6666666667%}.row .col.push-xl5{left:41.6666666667%}.row .col.offset-xl6{margin-left:50%}.row .col.pull-xl6{right:50%}.row .col.push-xl6{left:50%}.row .col.offset-xl7{margin-left:58.3333333333%}.row .col.pull-xl7{right:58.3333333333%}.row .col.push-xl7{left:58.3333333333%}.row .col.offset-xl8{margin-left:66.6666666667%}.row .col.pull-xl8{right:66.6666666667%}.row .col.push-xl8{left:66.6666666667%}.row .col.offset-xl9{margin-left:75%}.row .col.pull-xl9{right:75%}.row .col.push-xl9{left:75%}.row .col.offset-xl10{margin-left:83.3333333333%}.row .col.pull-xl10{right:83.3333333333%}.row .col.push-xl10{left:83.3333333333%}.row .col.offset-xl11{margin-left:91.6666666667%}.row .col.pull-xl11{right:91.6666666667%}.row .col.push-xl11{left:91.6666666667%}.row .col.offset-xl12{margin-left:100%}.row .col.pull-xl12{right:100%}.row .col.push-xl12{left:100%}}nav{color:var(--mm-nav-text, #fff);background-color:var(--mm-nav-background, #ee6e73);width:100%;height:56px;line-height:56px}nav.nav-extended{height:auto}nav.nav-extended .nav-wrapper{min-height:56px;height:auto}nav.nav-extended .nav-content{position:relative;line-height:normal}nav a{color:var(--mm-nav-text, #fff)}nav i,nav [class^=mdi-],nav [class*=mdi-],nav i.material-icons{display:block;font-size:24px;height:56px;line-height:56px}nav .nav-wrapper{position:relative;height:100%}@media only screen and (min-width : 993px){nav a.sidenav-trigger{display:none}}nav .sidenav-trigger{float:left;position:relative;z-index:1;height:56px;margin:0 18px}nav .sidenav-trigger i{height:56px;line-height:56px}nav .brand-logo{position:absolute;color:#fff;display:inline-block;font-size:2.1rem;padding:0}nav .brand-logo.center{left:50%;transform:translateX(-50%)}@media only screen and (max-width : 992px){nav .brand-logo{left:50%;transform:translateX(-50%)}nav .brand-logo.left,nav .brand-logo.right{padding:0;transform:none}nav .brand-logo.left{left:.5rem}nav .brand-logo.right{right:.5rem;left:auto}}nav .brand-logo.right{right:.5rem;padding:0}nav .brand-logo i,nav .brand-logo [class^=mdi-],nav .brand-logo [class*=mdi-],nav .brand-logo i.material-icons{float:left;margin-right:15px}nav .nav-title{display:inline-block;font-size:32px;padding:28px 0}nav ul{margin:0}nav ul li{transition:background-color .3s;float:left;padding:0}nav ul li.active{background-color:var(--mm-primary-color-light, rgba(0, 0, 0, 0.1))}nav ul li.active a{color:var(--mm-nav-active-text, #fff)}nav ul li.active i,nav ul li.active .material-icons{color:var(--mm-nav-active-text, #fff)}nav ul a{transition:background-color .3s;font-size:1rem;color:#fff;display:block;padding:0 15px;cursor:pointer}nav ul a.btn,nav ul a.btn-large,nav ul a.btn-flat,nav ul a.btn-floating{margin-top:-2px;margin-left:15px;margin-right:15px}nav ul a.btn>.material-icons,nav ul a.btn-large>.material-icons,nav ul a.btn-flat>.material-icons,nav ul a.btn-floating>.material-icons{height:inherit;line-height:inherit}nav ul a:hover{background-color:rgba(0,0,0,.1)}nav ul.left{float:left}nav form{height:100%}nav .input-field{margin:0;height:100%}nav .input-field input{height:100%;font-size:1.2rem;border:none;padding-left:2rem}nav .input-field input:focus,nav .input-field input[type=text]:valid,nav .input-field input[type=password]:valid,nav .input-field input[type=email]:valid,nav .input-field input[type=url]:valid,nav .input-field input[type=date]:valid{border:none;box-shadow:none}nav .input-field label{top:0;left:0}nav .input-field label i{color:hsla(0,0%,100%,.7);transition:color .3s}nav .input-field label.active i{color:var(--mm-nav-text, #fff)}.navbar-fixed{position:relative;height:56px;z-index:997}.navbar-fixed nav{position:fixed}@media only screen and (min-width : 601px){nav.nav-extended .nav-wrapper{min-height:64px}nav,nav .nav-wrapper i,nav a.sidenav-trigger,nav a.sidenav-trigger i{height:64px;line-height:64px}.navbar-fixed{height:64px}}a{text-decoration:none}html{line-height:1.5;font-family:-apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,Oxygen-Sans,Ubuntu,Cantarell,\"Helvetica Neue\",sans-serif;font-weight:normal;color:rgba(0,0,0,.87)}@media only screen and (min-width: 0){html{font-size:14px}}@media only screen and (min-width: 992px){html{font-size:14.5px}}@media only screen and (min-width: 1200px){html{font-size:15px}}h1,h2,h3,h4,h5,h6{font-weight:400;line-height:1.3}h1 a,h2 a,h3 a,h4 a,h5 a,h6 a{font-weight:inherit}h1{font-size:4.2rem;line-height:110%;margin:2.8rem 0 1.68rem 0}h2{font-size:3.56rem;line-height:110%;margin:2.3733333333rem 0 1.424rem 0}h3{font-size:2.92rem;line-height:110%;margin:1.9466666667rem 0 1.168rem 0}h4{font-size:2.28rem;line-height:110%;margin:1.52rem 0 .912rem 0}h5{font-size:1.64rem;line-height:110%;margin:1.0933333333rem 0 .656rem 0}h6{font-size:1.15rem;line-height:110%;margin:.7666666667rem 0 .46rem 0}em{font-style:italic}strong{font-weight:500}small{font-size:75%}.light{font-weight:300}.thin{font-weight:200}@media only screen and (min-width: 360px){.flow-text{font-size:1.2rem}}@media only screen and (min-width: 390px){.flow-text{font-size:1.224rem}}@media only screen and (min-width: 420px){.flow-text{font-size:1.248rem}}@media only screen and (min-width: 450px){.flow-text{font-size:1.272rem}}@media only screen and (min-width: 480px){.flow-text{font-size:1.296rem}}@media only screen and (min-width: 510px){.flow-text{font-size:1.32rem}}@media only screen and (min-width: 540px){.flow-text{font-size:1.344rem}}@media only screen and (min-width: 570px){.flow-text{font-size:1.368rem}}@media only screen and (min-width: 600px){.flow-text{font-size:1.392rem}}@media only screen and (min-width: 630px){.flow-text{font-size:1.416rem}}@media only screen and (min-width: 660px){.flow-text{font-size:1.44rem}}@media only screen and (min-width: 690px){.flow-text{font-size:1.464rem}}@media only screen and (min-width: 720px){.flow-text{font-size:1.488rem}}@media only screen and (min-width: 750px){.flow-text{font-size:1.512rem}}@media only screen and (min-width: 780px){.flow-text{font-size:1.536rem}}@media only screen and (min-width: 810px){.flow-text{font-size:1.56rem}}@media only screen and (min-width: 840px){.flow-text{font-size:1.584rem}}@media only screen and (min-width: 870px){.flow-text{font-size:1.608rem}}@media only screen and (min-width: 900px){.flow-text{font-size:1.632rem}}@media only screen and (min-width: 930px){.flow-text{font-size:1.656rem}}@media only screen and (min-width: 960px){.flow-text{font-size:1.68rem}}@media only screen and (max-width: 360px){.flow-text{font-size:1.2rem}}.scale-transition{transition:transform .3s cubic-bezier(0.53, 0.01, 0.36, 1.63) !important}.scale-transition.scale-out{transform:scale(0);transition:transform .2s !important}.scale-transition.scale-in{transform:scale(1)}.card-panel{transition:box-shadow .25s;padding:24px;margin:.5rem 0 1rem 0;border-radius:2px;background-color:#fff}.card{position:relative;margin:.5rem 0 1rem 0;background-color:#fff;transition:box-shadow .25s;border-radius:2px}.card .card-title{font-size:24px;font-weight:300}.card .card-title.activator{cursor:pointer}.card.small,.card.medium,.card.large{position:relative}.card.small .card-image,.card.medium .card-image,.card.large .card-image{max-height:60%;overflow:hidden}.card.small .card-image+.card-content,.card.medium .card-image+.card-content,.card.large .card-image+.card-content{max-height:40%}.card.small .card-content,.card.medium .card-content,.card.large .card-content{max-height:100%;overflow:hidden}.card.small .card-action,.card.medium .card-action,.card.large .card-action{position:absolute;bottom:0;left:0;right:0}.card.small{height:300px}.card.medium{height:400px}.card.large{height:500px}.card.horizontal{display:flex}.card.horizontal.small .card-image,.card.horizontal.medium .card-image,.card.horizontal.large .card-image{height:100%;max-height:none;overflow:visible}.card.horizontal.small .card-image img,.card.horizontal.medium .card-image img,.card.horizontal.large .card-image img{height:100%}.card.horizontal .card-image{max-width:50%}.card.horizontal .card-image img{border-radius:2px 0 0 2px;max-width:100%;width:auto}.card.horizontal .card-stacked{display:flex;flex-direction:column;flex:1;position:relative}.card.horizontal .card-stacked .card-content{flex-grow:1}.card.sticky-action .card-action{z-index:2}.card.sticky-action .card-reveal{z-index:1;padding-bottom:64px}.card .card-image{position:relative}.card .card-image img{display:block;border-radius:2px 2px 0 0;position:relative;left:0;right:0;top:0;bottom:0;width:100%}.card .card-image .card-title{color:#fff;position:absolute;bottom:0;left:0;max-width:100%;padding:24px}.card .card-content{padding:24px;border-radius:0 0 2px 2px}.card .card-content p{margin:0}.card .card-content .card-title{display:block;line-height:32px;margin-bottom:8px}.card .card-content .card-title i{line-height:32px}.card .card-action{background-color:inherit;border-top:1px solid rgba(160,160,160,.2);position:relative;padding:16px 24px}.card .card-action:last-child{border-radius:0 0 2px 2px}.card .card-action a:not(.btn):not(.btn-large):not(.btn-floating){color:#ffab40;margin-right:24px;transition:color .3s ease;text-transform:uppercase}.card .card-action a:not(.btn):not(.btn-large):not(.btn-floating):hover{color:rgb(255,215.8586387435,166)}.card .card-reveal{padding:24px;position:absolute;background-color:#fff;width:100%;overflow-y:auto;left:0;top:100%;height:100%;z-index:3;display:none}.card .card-reveal .card-title{cursor:pointer;display:block}#toast-container{display:block;position:fixed;z-index:10000}@media only screen and (max-width : 600px){#toast-container{min-width:100%;bottom:0%}}@media only screen and (min-width : 601px)and (max-width : 992px){#toast-container{left:5%;bottom:7%;max-width:90%}}@media only screen and (min-width : 993px){#toast-container{top:10%;right:7%;max-width:86%}}.toast{border-radius:2px;top:35px;width:auto;margin-top:10px;position:relative;max-width:100%;height:auto;min-height:48px;line-height:1.5em;background-color:#323232;padding:10px 25px;font-size:1.1rem;font-weight:300;color:#fff;display:flex;align-items:center;justify-content:space-between;cursor:default}.toast .toast-action{color:#eeff41;font-weight:500;margin-right:-25px;margin-left:3rem}.toast.rounded{border-radius:24px}@media only screen and (max-width : 600px){.toast{width:100%;border-radius:0}}.tabs{position:relative;overflow-x:auto;overflow-y:hidden;height:48px;width:100%;background-color:var(--mm-background-color, #fff);color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));margin:0 auto;white-space:nowrap}.tabs.tabs-transparent{background-color:rgba(0,0,0,0)}.tabs.tabs-transparent .tab a,.tabs.tabs-transparent .tab.disabled a,.tabs.tabs-transparent .tab.disabled a:hover{color:hsla(0,0%,100%,.7)}.tabs.tabs-transparent .tab a:hover,.tabs.tabs-transparent .tab a.active{color:#fff}.tabs.tabs-transparent .indicator{background-color:#fff}.tabs.tabs-fixed-width{display:flex}.tabs.tabs-fixed-width .tab{flex-grow:1}.tabs .tab{display:inline-block;text-align:center;line-height:48px;height:48px;padding:0;margin:0;text-transform:uppercase}.tabs .tab a{color:var(--mm-text-secondary, rgba(238, 110, 115, 0.7));display:block;width:100%;height:100%;padding:0 24px;font-size:14px;text-overflow:ellipsis;overflow:hidden;transition:color .28s ease,background-color .28s ease}.tabs .tab a:focus,.tabs .tab a:focus.active{background-color:hsla(357.65625,79.012345679%,83.2352941176%,.2);outline:none}.tabs .tab a:hover,.tabs .tab a.active{background-color:rgba(0,0,0,0);color:var(--mm-primary-color, #ee6e73)}.tabs .tab.disabled a,.tabs .tab.disabled a:hover{color:var(--mm-text-disabled, rgba(238, 110, 115, 0.4));cursor:default}.tabs .indicator{position:absolute;bottom:0;height:2px;background-color:hsl(357.65625,79.012345679%,83.2352941176%);will-change:left,right}@media only screen and (max-width : 992px){.tabs{display:flex}.tabs .tab{flex-grow:1}.tabs .tab a{padding:0 12px}}.material-tooltip{padding:10px 8px;font-size:1rem;z-index:2000;background-color:rgba(0,0,0,0);border-radius:2px;color:#fff;min-height:36px;line-height:120%;opacity:0;position:absolute;text-align:center;max-width:calc(100% - 4px);overflow:hidden;left:0;top:0;pointer-events:none;visibility:hidden;background-color:#323232}.backdrop{position:absolute;opacity:0;height:7px;width:14px;border-radius:0 0 50% 50%;background-color:#323232;z-index:-1;transform-origin:50% 0%;visibility:hidden}.btn,.btn-small,.btn-large,.btn-flat{border:none;border-radius:2px;display:inline-block;height:36px;line-height:36px;padding:0 16px;text-transform:uppercase;vertical-align:middle;-webkit-tap-highlight-color:rgba(0,0,0,0)}.btn.disabled,.btn-floating.disabled,.btn-large.disabled,.btn-small.disabled,.btn-flat.disabled,.btn:disabled,.btn-floating:disabled,.btn-large:disabled,.btn-small:disabled,.btn-flat:disabled,.btn[disabled],.btn-floating[disabled],.btn-large[disabled],.btn-small[disabled],.btn-flat[disabled]{pointer-events:none;background-color:#dfdfdf !important;box-shadow:none;color:#9f9f9f !important;cursor:default}.btn.disabled:hover,.btn-floating.disabled:hover,.btn-large.disabled:hover,.btn-small.disabled:hover,.btn-flat.disabled:hover,.btn:disabled:hover,.btn-floating:disabled:hover,.btn-large:disabled:hover,.btn-small:disabled:hover,.btn-flat:disabled:hover,.btn[disabled]:hover,.btn-floating[disabled]:hover,.btn-large[disabled]:hover,.btn-small[disabled]:hover,.btn-flat[disabled]:hover{background-color:#dfdfdf !important;color:#9f9f9f !important}.btn,.btn-small,.btn-large,.btn-floating,.btn-flat{font-size:14px;outline:0}.btn i,.btn-floating i,.btn-large i,.btn-small i,.btn-flat i{font-size:1.3rem;line-height:inherit}.btn:focus,.btn-small:focus,.btn-large:focus,.btn-floating:focus{background-color:rgb(28.5,124.5,115.5)}.btn,.btn-small,.btn-large{text-decoration:none;color:#fff;background-color:#26a69a;text-align:center;letter-spacing:.5px;transition:background-color .2s ease-out;cursor:pointer}.btn:hover,.btn-small:hover,.btn-large:hover{background-color:rgb(42.75,186.75,173.25)}.btn-floating{display:inline-block;color:#fff;position:relative;overflow:hidden;z-index:1;width:40px;height:40px;line-height:40px;padding:0;background-color:#26a69a;border-radius:50%;transition:background-color .3s;cursor:pointer;vertical-align:middle}.btn-floating:hover{background-color:#26a69a}.btn-floating:before{border-radius:0}.btn-floating.btn-large{width:56px;height:56px;padding:0}.btn-floating.btn-large.halfway-fab{bottom:-28px}.btn-floating.btn-large i{line-height:56px}.btn-floating.btn-small{width:32.4px;height:32.4px}.btn-floating.btn-small.halfway-fab{bottom:-16.2px}.btn-floating.btn-small i{line-height:32.4px}.btn-floating.halfway-fab{position:absolute;right:24px;bottom:-20px}.btn-floating.halfway-fab.left{right:auto;left:24px}.btn-floating i{width:inherit;display:inline-block;text-align:center;color:#fff;font-size:1.6rem;line-height:40px}button.btn-floating{border:none}.fixed-action-btn{position:fixed;right:23px;bottom:23px;padding-top:15px;margin-bottom:0;z-index:997}.fixed-action-btn.active ul{visibility:visible}.fixed-action-btn.direction-left,.fixed-action-btn.direction-right{padding:0 0 0 15px}.fixed-action-btn.direction-left ul,.fixed-action-btn.direction-right ul{text-align:right;right:64px;top:50%;transform:translateY(-50%);height:100%;left:auto;width:500px}.fixed-action-btn.direction-left ul li,.fixed-action-btn.direction-right ul li{display:inline-block;margin:7.5px 15px 0 0}.fixed-action-btn.direction-right{padding:0 15px 0 0}.fixed-action-btn.direction-right ul{text-align:left;direction:rtl;left:64px;right:auto}.fixed-action-btn.direction-right ul li{margin:7.5px 0 0 15px}.fixed-action-btn.direction-bottom{padding:0 0 15px 0}.fixed-action-btn.direction-bottom ul{top:64px;bottom:auto;display:flex;flex-direction:column-reverse}.fixed-action-btn.direction-bottom ul li{margin:15px 0 0 0}.fixed-action-btn.toolbar{padding:0;height:56px}.fixed-action-btn.toolbar.active>a i{opacity:0}.fixed-action-btn.toolbar ul{display:flex;top:0;bottom:0;z-index:1}.fixed-action-btn.toolbar ul li{flex:1;display:inline-block;margin:0;height:100%;transition:none}.fixed-action-btn.toolbar ul li a{display:block;overflow:hidden;position:relative;width:100%;height:100%;background-color:rgba(0,0,0,0);box-shadow:none;color:#fff;line-height:56px;z-index:1}.fixed-action-btn.toolbar ul li a i{line-height:inherit}.fixed-action-btn ul{left:0;right:0;text-align:center;position:absolute;bottom:64px;margin:0;visibility:hidden}.fixed-action-btn ul li{margin-bottom:15px}.fixed-action-btn ul a.btn-floating{opacity:0}.fixed-action-btn .fab-backdrop{position:absolute;top:0;left:0;z-index:-1;width:40px;height:40px;background-color:#26a69a;border-radius:50%;transform:scale(0)}.btn-flat{box-shadow:none;background-color:rgba(0,0,0,0);color:var(--mm-button-flat-text, #343434);cursor:pointer;transition:background-color .2s}.btn-flat:focus,.btn-flat:hover{box-shadow:none}.btn-flat:focus{background-color:var(--mm-border-color, rgba(0, 0, 0, 0.1))}.btn-flat.disabled,.btn-flat.btn-flat[disabled]{background-color:rgba(0,0,0,0) !important;color:var(--mm-text-disabled, rgb(178.5, 178.5, 178.5)) !important;cursor:default}.btn-large{height:54px;line-height:54px;font-size:15px;padding:0 28px}.btn-large i{font-size:1.6rem}.btn-small{height:32.4px;line-height:32.4px;font-size:13px}.btn-small i{font-size:1.2rem}.btn-block{display:block}.dropdown-content{background-color:var(--mm-surface-color, #fff);margin:0;display:none;min-width:100px;overflow-y:auto;opacity:0;position:absolute;left:0;top:0;z-index:9999;transform-origin:0 0}.dropdown-content:focus{outline:0}.dropdown-content li{clear:both;color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));cursor:pointer;min-height:50px;line-height:1.5rem;width:100%;text-align:left}.dropdown-content li:hover,.dropdown-content li.active{background-color:var(--mm-dropdown-hover, #eee)}.dropdown-content li:focus{outline:none}.dropdown-content li.divider{min-height:0;height:1px}.dropdown-content li>a,.dropdown-content li>span{font-size:16px;color:var(--mm-text-primary, #26a69a);display:block;line-height:22px;padding:14px 16px}.dropdown-content li>span>label{top:1px;left:0;height:18px}.dropdown-content li>a>i{height:inherit;line-height:inherit;float:left;margin:0 24px 0 0;width:24px}body.keyboard-focused .dropdown-content li:focus{background-color:var(--mm-dropdown-focus, rgb(217.6, 217.6, 217.6))}.input-field.col .dropdown-content [type=checkbox]+label{top:1px;left:0;height:18px;transform:none}.dropdown-trigger{cursor:pointer}/*!\n * Waves v0.6.0\n * http://fian.my.id/Waves\n *\n * Copyright 2014 Alfiana E. Sibuea and other contributors\n * Released under the MIT license\n * https://github.com/fians/Waves/blob/master/LICENSE\n */.waves-effect{position:relative;cursor:pointer;display:inline-block;overflow:hidden;user-select:none;-webkit-tap-highlight-color:rgba(0,0,0,0);vertical-align:middle;z-index:1;transition:.3s ease-out}.waves-effect .waves-ripple{position:absolute;border-radius:50%;width:20px;height:20px;margin-top:-10px;margin-left:-10px;opacity:0;background:rgba(0,0,0,.2);transition:all .7s ease-out;transition-property:transform,opacity;transform:scale(0);pointer-events:none}.waves-effect.waves-light .waves-ripple{background-color:hsla(0,0%,100%,.45)}.waves-effect.waves-red .waves-ripple{background-color:rgba(244,67,54,.7)}.waves-effect.waves-yellow .waves-ripple{background-color:rgba(255,235,59,.7)}.waves-effect.waves-orange .waves-ripple{background-color:rgba(255,152,0,.7)}.waves-effect.waves-purple .waves-ripple{background-color:rgba(156,39,176,.7)}.waves-effect.waves-green .waves-ripple{background-color:rgba(76,175,80,.7)}.waves-effect.waves-teal .waves-ripple{background-color:rgba(0,150,136,.7)}.waves-effect input[type=button],.waves-effect input[type=reset],.waves-effect input[type=submit]{border:0;font-style:normal;font-size:inherit;text-transform:inherit;background:none}.waves-effect img{position:relative;z-index:-1}.waves-notransition{transition:none !important}.waves-circle{transform:translateZ(0);-webkit-mask-image:-webkit-radial-gradient(circle, white 100%, black 100%)}.waves-input-wrapper{border-radius:.2em;vertical-align:bottom}.waves-input-wrapper .waves-button-input{position:relative;top:0;left:0;z-index:1}.waves-circle{text-align:center;width:2.5em;height:2.5em;line-height:2.5em;border-radius:50%;-webkit-mask-image:none}.waves-block{display:block}.waves-effect .waves-ripple{z-index:-1}.modal{display:none;position:fixed;left:0;right:0;background-color:var(--mm-modal-background, #fafafa);color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));padding:0;max-height:70%;width:55%;margin:auto;overflow-y:auto;border-radius:2px;will-change:top,opacity}.modal:focus{outline:none}@media only screen and (max-width : 992px){.modal{width:80%}}.modal h1,.modal h2,.modal h3,.modal h4{margin-top:0}.modal .modal-content{padding:24px;background-color:var(--mm-modal-background, #fafafa);color:var(--mm-text-primary, rgba(0, 0, 0, 0.87))}.modal .modal-close{cursor:pointer}.modal .modal-footer{border-radius:0 0 2px 2px;background-color:var(--mm-modal-background, #fafafa);padding:4px 6px;height:56px;width:100%;text-align:right}.modal .modal-footer .btn,.modal .modal-footer .btn-flat{margin:6px 0}.modal-overlay{position:fixed;z-index:999;top:-25%;left:0;bottom:0;right:0;height:125%;width:100%;background:#000;display:none;will-change:opacity}.modal.modal-fixed-footer{padding:0;height:70%}.modal.modal-fixed-footer .modal-content{position:absolute;height:calc(100% - 56px);max-height:100%;width:100%;overflow-y:auto}.modal.modal-fixed-footer .modal-footer{border-top:1px solid rgba(0,0,0,.1);position:absolute;bottom:0}.modal.bottom-sheet{top:auto;bottom:-100%;margin:0;width:100%;max-height:45%;border-radius:0;will-change:bottom,opacity}.collapsible{border-top:1px solid var(--mm-border-color, #ddd);border-right:1px solid var(--mm-border-color, #ddd);border-left:1px solid var(--mm-border-color, #ddd);margin:.5rem 0 1rem 0}.collapsible-header{display:flex;cursor:pointer;-webkit-tap-highlight-color:rgba(0,0,0,0);line-height:1.5;padding:1rem;border-bottom:1px solid var(--mm-border-color, #ddd)}.collapsible-header:focus{outline:0}.collapsible-header i{width:2rem;font-size:1.6rem;display:inline-block;text-align:center;margin-right:1rem}.keyboard-focused .collapsible-header:focus{background-color:var(--mm-border-color, rgba(0, 0, 0, 0.05))}.collapsible-body{display:none;border-bottom:1px solid var(--mm-border-color, #ddd);box-sizing:border-box;padding:2rem}.sidenav .collapsible,.sidenav.sidenav-fixed .collapsible{border:none;box-shadow:none}.sidenav .collapsible li,.sidenav.sidenav-fixed .collapsible li{padding:0}.sidenav .collapsible-header,.sidenav.sidenav-fixed .collapsible-header{background-color:rgba(0,0,0,0);border:none;line-height:inherit;height:inherit;padding:0 16px}.sidenav .collapsible-header:hover,.sidenav.sidenav-fixed .collapsible-header:hover{background-color:rgba(0,0,0,.05)}.sidenav .collapsible-header i,.sidenav.sidenav-fixed .collapsible-header i{line-height:inherit}.sidenav .collapsible-body,.sidenav.sidenav-fixed .collapsible-body{border:0;background-color:var(--mm-surface-color, #fff);color:var(--mm-text-primary, rgba(0, 0, 0, 0.87))}.sidenav .collapsible-body li a,.sidenav.sidenav-fixed .collapsible-body li a{padding:0 23.5px 0 31px}.collapsible.popout{border:none;box-shadow:none}.collapsible.popout>li{box-shadow:0 2px 5px 0 rgba(0,0,0,.16),0 2px 10px 0 rgba(0,0,0,.12);margin:0 24px;transition:margin .35s cubic-bezier(0.25, 0.46, 0.45, 0.94)}.collapsible.popout>li.active{box-shadow:0 5px 11px 0 rgba(0,0,0,.18),0 4px 15px 0 rgba(0,0,0,.15);margin:16px 0}.chip{display:inline-block;height:32px;font-size:13px;font-weight:500;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));line-height:32px;padding:0 12px;border-radius:16px;background-color:var(--mm-chip-bg, #e4e4e4);margin-bottom:5px;margin-right:5px}.chip:focus{outline:none;background-color:var(--mm-primary-color, #26a69a);color:var(--mm-button-text, #fff)}.chip>img{float:left;margin:0 8px 0 -12px;height:32px;width:32px;border-radius:50%}.chip .close{cursor:pointer;float:right;font-size:16px;line-height:32px;padding-left:8px}.chips{border:none;border-bottom:1px solid var(--mm-input-border, #9e9e9e);box-shadow:none;margin:0 0 8px 0;min-height:45px;outline:none;transition:all .3s}.chips.focus{border-bottom:1px solid var(--mm-primary-color, #26a69a);box-shadow:0 1px 0 0 var(--mm-primary-color, #26a69a)}.chips:hover{cursor:text}.chips .input{background:none;border:0;color:var(--mm-text-primary, rgba(0, 0, 0, 0.6));display:inline-block;font-size:16px;height:3rem;line-height:32px;outline:0;margin:0;padding:0 !important;width:120px !important}.chips .input:focus{border:0 !important;box-shadow:none !important}.chips .autocomplete-content{margin-top:0;margin-bottom:0}.prefix~.chips{margin-left:3rem;width:92%;width:calc(100% - 3rem)}.chips:empty~label{font-size:.8rem;transform:translateY(-140%)}.materialboxed{display:block;cursor:zoom-in;position:relative;transition:opacity .4s;-webkit-backface-visibility:hidden}.materialboxed:hover:not(.active){opacity:.8}.materialboxed.active{cursor:zoom-out}#materialbox-overlay{position:fixed;top:0;right:0;bottom:0;left:0;background-color:#292929;z-index:1000;will-change:opacity}.materialbox-caption{position:fixed;display:none;color:#fff;line-height:50px;bottom:0;left:0;width:100%;text-align:center;padding:0% 15%;height:50px;z-index:1000;-webkit-font-smoothing:antialiased}::placeholder{color:var(--mm-text-hint, #d1d1d1)}input:not([type]):not(.browser-default),input[type=text]:not(.browser-default),input[type=password]:not(.browser-default),input[type=email]:not(.browser-default),input[type=url]:not(.browser-default),input[type=time]:not(.browser-default),input[type=date]:not(.browser-default),input[type=datetime]:not(.browser-default),input[type=datetime-local]:not(.browser-default),input[type=tel]:not(.browser-default),input[type=number]:not(.browser-default),input[type=search]:not(.browser-default),textarea.materialize-textarea{background-color:rgba(0,0,0,0);border:none;border-bottom:1px solid var(--mm-input-border, 1px solid #9e9e9e);border-radius:0;outline:none;height:3rem;width:100%;font-size:16px;margin:0 0 8px 0;padding:0;box-shadow:none;box-sizing:content-box;transition:box-shadow .3s,border .3s;color:var(--mm-input-text, inherit)}input:not([type]):not(.browser-default):disabled,input:not([type]):not(.browser-default)[readonly=readonly],input[type=text]:not(.browser-default):disabled,input[type=text]:not(.browser-default)[readonly=readonly],input[type=password]:not(.browser-default):disabled,input[type=password]:not(.browser-default)[readonly=readonly],input[type=email]:not(.browser-default):disabled,input[type=email]:not(.browser-default)[readonly=readonly],input[type=url]:not(.browser-default):disabled,input[type=url]:not(.browser-default)[readonly=readonly],input[type=time]:not(.browser-default):disabled,input[type=time]:not(.browser-default)[readonly=readonly],input[type=date]:not(.browser-default):disabled,input[type=date]:not(.browser-default)[readonly=readonly],input[type=datetime]:not(.browser-default):disabled,input[type=datetime]:not(.browser-default)[readonly=readonly],input[type=datetime-local]:not(.browser-default):disabled,input[type=datetime-local]:not(.browser-default)[readonly=readonly],input[type=tel]:not(.browser-default):disabled,input[type=tel]:not(.browser-default)[readonly=readonly],input[type=number]:not(.browser-default):disabled,input[type=number]:not(.browser-default)[readonly=readonly],input[type=search]:not(.browser-default):disabled,input[type=search]:not(.browser-default)[readonly=readonly],textarea.materialize-textarea:disabled,textarea.materialize-textarea[readonly=readonly]{color:var(--mm-text-disabled, rgba(0, 0, 0, 0.42));border-bottom:1px dotted var(--mm-input-border, 1px dotted rgba(0, 0, 0, 0.42))}input:not([type]):not(.browser-default):disabled+label,input:not([type]):not(.browser-default)[readonly=readonly]+label,input[type=text]:not(.browser-default):disabled+label,input[type=text]:not(.browser-default)[readonly=readonly]+label,input[type=password]:not(.browser-default):disabled+label,input[type=password]:not(.browser-default)[readonly=readonly]+label,input[type=email]:not(.browser-default):disabled+label,input[type=email]:not(.browser-default)[readonly=readonly]+label,input[type=url]:not(.browser-default):disabled+label,input[type=url]:not(.browser-default)[readonly=readonly]+label,input[type=time]:not(.browser-default):disabled+label,input[type=time]:not(.browser-default)[readonly=readonly]+label,input[type=date]:not(.browser-default):disabled+label,input[type=date]:not(.browser-default)[readonly=readonly]+label,input[type=datetime]:not(.browser-default):disabled+label,input[type=datetime]:not(.browser-default)[readonly=readonly]+label,input[type=datetime-local]:not(.browser-default):disabled+label,input[type=datetime-local]:not(.browser-default)[readonly=readonly]+label,input[type=tel]:not(.browser-default):disabled+label,input[type=tel]:not(.browser-default)[readonly=readonly]+label,input[type=number]:not(.browser-default):disabled+label,input[type=number]:not(.browser-default)[readonly=readonly]+label,input[type=search]:not(.browser-default):disabled+label,input[type=search]:not(.browser-default)[readonly=readonly]+label,textarea.materialize-textarea:disabled+label,textarea.materialize-textarea[readonly=readonly]+label{color:var(--mm-text-disabled, rgba(0, 0, 0, 0.42))}input:not([type]):not(.browser-default):focus:not([readonly]),input[type=text]:not(.browser-default):focus:not([readonly]),input[type=password]:not(.browser-default):focus:not([readonly]),input[type=email]:not(.browser-default):focus:not([readonly]),input[type=url]:not(.browser-default):focus:not([readonly]),input[type=time]:not(.browser-default):focus:not([readonly]),input[type=date]:not(.browser-default):focus:not([readonly]),input[type=datetime]:not(.browser-default):focus:not([readonly]),input[type=datetime-local]:not(.browser-default):focus:not([readonly]),input[type=tel]:not(.browser-default):focus:not([readonly]),input[type=number]:not(.browser-default):focus:not([readonly]),input[type=search]:not(.browser-default):focus:not([readonly]),textarea.materialize-textarea:focus:not([readonly]){border-bottom:1px solid var(--mm-input-border-focus, #26a69a);box-shadow:0 1px 0 0 var(--mm-input-border-focus, #26a69a)}input:not([type]):not(.browser-default):focus:not([readonly])+label,input[type=text]:not(.browser-default):focus:not([readonly])+label,input[type=password]:not(.browser-default):focus:not([readonly])+label,input[type=email]:not(.browser-default):focus:not([readonly])+label,input[type=url]:not(.browser-default):focus:not([readonly])+label,input[type=time]:not(.browser-default):focus:not([readonly])+label,input[type=date]:not(.browser-default):focus:not([readonly])+label,input[type=datetime]:not(.browser-default):focus:not([readonly])+label,input[type=datetime-local]:not(.browser-default):focus:not([readonly])+label,input[type=tel]:not(.browser-default):focus:not([readonly])+label,input[type=number]:not(.browser-default):focus:not([readonly])+label,input[type=search]:not(.browser-default):focus:not([readonly])+label,textarea.materialize-textarea:focus:not([readonly])+label{color:var(--mm-input-border-focus, #26a69a)}input:not([type]):not(.browser-default):focus.valid~label,input[type=text]:not(.browser-default):focus.valid~label,input[type=password]:not(.browser-default):focus.valid~label,input[type=email]:not(.browser-default):focus.valid~label,input[type=url]:not(.browser-default):focus.valid~label,input[type=time]:not(.browser-default):focus.valid~label,input[type=date]:not(.browser-default):focus.valid~label,input[type=datetime]:not(.browser-default):focus.valid~label,input[type=datetime-local]:not(.browser-default):focus.valid~label,input[type=tel]:not(.browser-default):focus.valid~label,input[type=number]:not(.browser-default):focus.valid~label,input[type=search]:not(.browser-default):focus.valid~label,textarea.materialize-textarea:focus.valid~label{color:#4caf50}input:not([type]):not(.browser-default):focus.invalid~label,input[type=text]:not(.browser-default):focus.invalid~label,input[type=password]:not(.browser-default):focus.invalid~label,input[type=email]:not(.browser-default):focus.invalid~label,input[type=url]:not(.browser-default):focus.invalid~label,input[type=time]:not(.browser-default):focus.invalid~label,input[type=date]:not(.browser-default):focus.invalid~label,input[type=datetime]:not(.browser-default):focus.invalid~label,input[type=datetime-local]:not(.browser-default):focus.invalid~label,input[type=tel]:not(.browser-default):focus.invalid~label,input[type=number]:not(.browser-default):focus.invalid~label,input[type=search]:not(.browser-default):focus.invalid~label,textarea.materialize-textarea:focus.invalid~label{color:#f44336}input:not([type]):not(.browser-default).validate+label,input[type=text]:not(.browser-default).validate+label,input[type=password]:not(.browser-default).validate+label,input[type=email]:not(.browser-default).validate+label,input[type=url]:not(.browser-default).validate+label,input[type=time]:not(.browser-default).validate+label,input[type=date]:not(.browser-default).validate+label,input[type=datetime]:not(.browser-default).validate+label,input[type=datetime-local]:not(.browser-default).validate+label,input[type=tel]:not(.browser-default).validate+label,input[type=number]:not(.browser-default).validate+label,input[type=search]:not(.browser-default).validate+label,textarea.materialize-textarea.validate+label{width:100%}input:not([type]):not(.browser-default):-webkit-autofill,input:not([type]):not(.browser-default):-webkit-autofill:hover,input:not([type]):not(.browser-default):-webkit-autofill:focus,input:not([type]):not(.browser-default):-webkit-autofill:active,input[type=text]:not(.browser-default):-webkit-autofill,input[type=text]:not(.browser-default):-webkit-autofill:hover,input[type=text]:not(.browser-default):-webkit-autofill:focus,input[type=text]:not(.browser-default):-webkit-autofill:active,input[type=password]:not(.browser-default):-webkit-autofill,input[type=password]:not(.browser-default):-webkit-autofill:hover,input[type=password]:not(.browser-default):-webkit-autofill:focus,input[type=password]:not(.browser-default):-webkit-autofill:active,input[type=email]:not(.browser-default):-webkit-autofill,input[type=email]:not(.browser-default):-webkit-autofill:hover,input[type=email]:not(.browser-default):-webkit-autofill:focus,input[type=email]:not(.browser-default):-webkit-autofill:active,input[type=url]:not(.browser-default):-webkit-autofill,input[type=url]:not(.browser-default):-webkit-autofill:hover,input[type=url]:not(.browser-default):-webkit-autofill:focus,input[type=url]:not(.browser-default):-webkit-autofill:active,input[type=time]:not(.browser-default):-webkit-autofill,input[type=time]:not(.browser-default):-webkit-autofill:hover,input[type=time]:not(.browser-default):-webkit-autofill:focus,input[type=time]:not(.browser-default):-webkit-autofill:active,input[type=date]:not(.browser-default):-webkit-autofill,input[type=date]:not(.browser-default):-webkit-autofill:hover,input[type=date]:not(.browser-default):-webkit-autofill:focus,input[type=date]:not(.browser-default):-webkit-autofill:active,input[type=datetime]:not(.browser-default):-webkit-autofill,input[type=datetime]:not(.browser-default):-webkit-autofill:hover,input[type=datetime]:not(.browser-default):-webkit-autofill:focus,input[type=datetime]:not(.browser-default):-webkit-autofill:active,input[type=datetime-local]:not(.browser-default):-webkit-autofill,input[type=datetime-local]:not(.browser-default):-webkit-autofill:hover,input[type=datetime-local]:not(.browser-default):-webkit-autofill:focus,input[type=datetime-local]:not(.browser-default):-webkit-autofill:active,input[type=tel]:not(.browser-default):-webkit-autofill,input[type=tel]:not(.browser-default):-webkit-autofill:hover,input[type=tel]:not(.browser-default):-webkit-autofill:focus,input[type=tel]:not(.browser-default):-webkit-autofill:active,input[type=number]:not(.browser-default):-webkit-autofill,input[type=number]:not(.browser-default):-webkit-autofill:hover,input[type=number]:not(.browser-default):-webkit-autofill:focus,input[type=number]:not(.browser-default):-webkit-autofill:active,input[type=search]:not(.browser-default):-webkit-autofill,input[type=search]:not(.browser-default):-webkit-autofill:hover,input[type=search]:not(.browser-default):-webkit-autofill:focus,input[type=search]:not(.browser-default):-webkit-autofill:active,textarea.materialize-textarea:-webkit-autofill,textarea.materialize-textarea:-webkit-autofill:hover,textarea.materialize-textarea:-webkit-autofill:focus,textarea.materialize-textarea:-webkit-autofill:active{-webkit-box-shadow:0 0 0 30px var(--mm-input-background, transparent) inset !important;-webkit-text-fill-color:var(--mm-input-text, inherit) !important;background-color:rgba(0,0,0,0) !important;color:var(--mm-input-text, inherit) !important;transition:background-color 5000s ease-in-out 0s}input:not([type]):not(.browser-default):-ms-input-placeholder,input[type=text]:not(.browser-default):-ms-input-placeholder,input[type=password]:not(.browser-default):-ms-input-placeholder,input[type=email]:not(.browser-default):-ms-input-placeholder,input[type=url]:not(.browser-default):-ms-input-placeholder,input[type=time]:not(.browser-default):-ms-input-placeholder,input[type=date]:not(.browser-default):-ms-input-placeholder,input[type=datetime]:not(.browser-default):-ms-input-placeholder,input[type=datetime-local]:not(.browser-default):-ms-input-placeholder,input[type=tel]:not(.browser-default):-ms-input-placeholder,input[type=number]:not(.browser-default):-ms-input-placeholder,input[type=search]:not(.browser-default):-ms-input-placeholder,textarea.materialize-textarea:-ms-input-placeholder{color:var(--mm-text-hint, #d1d1d1) !important}input:not([type]):not(.browser-default)::-ms-input-placeholder,input[type=text]:not(.browser-default)::-ms-input-placeholder,input[type=password]:not(.browser-default)::-ms-input-placeholder,input[type=email]:not(.browser-default)::-ms-input-placeholder,input[type=url]:not(.browser-default)::-ms-input-placeholder,input[type=time]:not(.browser-default)::-ms-input-placeholder,input[type=date]:not(.browser-default)::-ms-input-placeholder,input[type=datetime]:not(.browser-default)::-ms-input-placeholder,input[type=datetime-local]:not(.browser-default)::-ms-input-placeholder,input[type=tel]:not(.browser-default)::-ms-input-placeholder,input[type=number]:not(.browser-default)::-ms-input-placeholder,input[type=search]:not(.browser-default)::-ms-input-placeholder,textarea.materialize-textarea::-ms-input-placeholder{color:var(--mm-text-hint, #d1d1d1) !important}.select-wrapper.valid>input.select-dropdown,input:not([type]):not(.browser-default).valid,input:not([type]):not(.browser-default):focus.valid,input[type=text]:not(.browser-default).valid,input[type=text]:not(.browser-default):focus.valid,input[type=password]:not(.browser-default).valid,input[type=password]:not(.browser-default):focus.valid,input[type=email]:not(.browser-default).valid,input[type=email]:not(.browser-default):focus.valid,input[type=url]:not(.browser-default).valid,input[type=url]:not(.browser-default):focus.valid,input[type=time]:not(.browser-default).valid,input[type=time]:not(.browser-default):focus.valid,input[type=date]:not(.browser-default).valid,input[type=date]:not(.browser-default):focus.valid,input[type=datetime]:not(.browser-default).valid,input[type=datetime]:not(.browser-default):focus.valid,input[type=datetime-local]:not(.browser-default).valid,input[type=datetime-local]:not(.browser-default):focus.valid,input[type=tel]:not(.browser-default).valid,input[type=tel]:not(.browser-default):focus.valid,input[type=number]:not(.browser-default).valid,input[type=number]:not(.browser-default):focus.valid,input[type=search]:not(.browser-default).valid,input[type=search]:not(.browser-default):focus.valid,textarea.materialize-textarea.valid,textarea.materialize-textarea:focus.valid{border-bottom:1px solid #4caf50;box-shadow:0 1px 0 0 #4caf50}.select-wrapper.invalid>input.select-dropdown,.select-wrapper.invalid>input.select-dropdown:focus,input:not([type]):not(.browser-default).invalid,input:not([type]):not(.browser-default):focus.invalid,input[type=text]:not(.browser-default).invalid,input[type=text]:not(.browser-default):focus.invalid,input[type=password]:not(.browser-default).invalid,input[type=password]:not(.browser-default):focus.invalid,input[type=email]:not(.browser-default).invalid,input[type=email]:not(.browser-default):focus.invalid,input[type=url]:not(.browser-default).invalid,input[type=url]:not(.browser-default):focus.invalid,input[type=time]:not(.browser-default).invalid,input[type=time]:not(.browser-default):focus.invalid,input[type=date]:not(.browser-default).invalid,input[type=date]:not(.browser-default):focus.invalid,input[type=datetime]:not(.browser-default).invalid,input[type=datetime]:not(.browser-default):focus.invalid,input[type=datetime-local]:not(.browser-default).invalid,input[type=datetime-local]:not(.browser-default):focus.invalid,input[type=tel]:not(.browser-default).invalid,input[type=tel]:not(.browser-default):focus.invalid,input[type=number]:not(.browser-default).invalid,input[type=number]:not(.browser-default):focus.invalid,input[type=search]:not(.browser-default).invalid,input[type=search]:not(.browser-default):focus.invalid,textarea.materialize-textarea.invalid,textarea.materialize-textarea:focus.invalid{border-bottom:1px solid #f44336;box-shadow:0 1px 0 0 #f44336}.select-wrapper.valid .helper-text[data-success],.select-wrapper.invalid~.helper-text[data-error],input:not([type]):not(.browser-default).valid~.helper-text[data-success],input:not([type]):not(.browser-default):focus.valid~.helper-text[data-success],input:not([type]):not(.browser-default).invalid~.helper-text[data-error],input:not([type]):not(.browser-default):focus.invalid~.helper-text[data-error],input[type=text]:not(.browser-default).valid~.helper-text[data-success],input[type=text]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=text]:not(.browser-default).invalid~.helper-text[data-error],input[type=text]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=password]:not(.browser-default).valid~.helper-text[data-success],input[type=password]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=password]:not(.browser-default).invalid~.helper-text[data-error],input[type=password]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=email]:not(.browser-default).valid~.helper-text[data-success],input[type=email]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=email]:not(.browser-default).invalid~.helper-text[data-error],input[type=email]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=url]:not(.browser-default).valid~.helper-text[data-success],input[type=url]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=url]:not(.browser-default).invalid~.helper-text[data-error],input[type=url]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=time]:not(.browser-default).valid~.helper-text[data-success],input[type=time]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=time]:not(.browser-default).invalid~.helper-text[data-error],input[type=time]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=date]:not(.browser-default).valid~.helper-text[data-success],input[type=date]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=date]:not(.browser-default).invalid~.helper-text[data-error],input[type=date]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=datetime]:not(.browser-default).valid~.helper-text[data-success],input[type=datetime]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=datetime]:not(.browser-default).invalid~.helper-text[data-error],input[type=datetime]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=datetime-local]:not(.browser-default).valid~.helper-text[data-success],input[type=datetime-local]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=datetime-local]:not(.browser-default).invalid~.helper-text[data-error],input[type=datetime-local]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=tel]:not(.browser-default).valid~.helper-text[data-success],input[type=tel]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=tel]:not(.browser-default).invalid~.helper-text[data-error],input[type=tel]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=number]:not(.browser-default).valid~.helper-text[data-success],input[type=number]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=number]:not(.browser-default).invalid~.helper-text[data-error],input[type=number]:not(.browser-default):focus.invalid~.helper-text[data-error],input[type=search]:not(.browser-default).valid~.helper-text[data-success],input[type=search]:not(.browser-default):focus.valid~.helper-text[data-success],input[type=search]:not(.browser-default).invalid~.helper-text[data-error],input[type=search]:not(.browser-default):focus.invalid~.helper-text[data-error],textarea.materialize-textarea.valid~.helper-text[data-success],textarea.materialize-textarea:focus.valid~.helper-text[data-success],textarea.materialize-textarea.invalid~.helper-text[data-error],textarea.materialize-textarea:focus.invalid~.helper-text[data-error]{color:rgba(0,0,0,0);user-select:none;pointer-events:none}.select-wrapper.valid~.helper-text:after,input:not([type]):not(.browser-default).valid~.helper-text:after,input:not([type]):not(.browser-default):focus.valid~.helper-text:after,input[type=text]:not(.browser-default).valid~.helper-text:after,input[type=text]:not(.browser-default):focus.valid~.helper-text:after,input[type=password]:not(.browser-default).valid~.helper-text:after,input[type=password]:not(.browser-default):focus.valid~.helper-text:after,input[type=email]:not(.browser-default).valid~.helper-text:after,input[type=email]:not(.browser-default):focus.valid~.helper-text:after,input[type=url]:not(.browser-default).valid~.helper-text:after,input[type=url]:not(.browser-default):focus.valid~.helper-text:after,input[type=time]:not(.browser-default).valid~.helper-text:after,input[type=time]:not(.browser-default):focus.valid~.helper-text:after,input[type=date]:not(.browser-default).valid~.helper-text:after,input[type=date]:not(.browser-default):focus.valid~.helper-text:after,input[type=datetime]:not(.browser-default).valid~.helper-text:after,input[type=datetime]:not(.browser-default):focus.valid~.helper-text:after,input[type=datetime-local]:not(.browser-default).valid~.helper-text:after,input[type=datetime-local]:not(.browser-default):focus.valid~.helper-text:after,input[type=tel]:not(.browser-default).valid~.helper-text:after,input[type=tel]:not(.browser-default):focus.valid~.helper-text:after,input[type=number]:not(.browser-default).valid~.helper-text:after,input[type=number]:not(.browser-default):focus.valid~.helper-text:after,input[type=search]:not(.browser-default).valid~.helper-text:after,input[type=search]:not(.browser-default):focus.valid~.helper-text:after,textarea.materialize-textarea.valid~.helper-text:after,textarea.materialize-textarea:focus.valid~.helper-text:after{content:attr(data-success);color:#4caf50}.select-wrapper.invalid~.helper-text:after,input:not([type]):not(.browser-default).invalid~.helper-text:after,input:not([type]):not(.browser-default):focus.invalid~.helper-text:after,input[type=text]:not(.browser-default).invalid~.helper-text:after,input[type=text]:not(.browser-default):focus.invalid~.helper-text:after,input[type=password]:not(.browser-default).invalid~.helper-text:after,input[type=password]:not(.browser-default):focus.invalid~.helper-text:after,input[type=email]:not(.browser-default).invalid~.helper-text:after,input[type=email]:not(.browser-default):focus.invalid~.helper-text:after,input[type=url]:not(.browser-default).invalid~.helper-text:after,input[type=url]:not(.browser-default):focus.invalid~.helper-text:after,input[type=time]:not(.browser-default).invalid~.helper-text:after,input[type=time]:not(.browser-default):focus.invalid~.helper-text:after,input[type=date]:not(.browser-default).invalid~.helper-text:after,input[type=date]:not(.browser-default):focus.invalid~.helper-text:after,input[type=datetime]:not(.browser-default).invalid~.helper-text:after,input[type=datetime]:not(.browser-default):focus.invalid~.helper-text:after,input[type=datetime-local]:not(.browser-default).invalid~.helper-text:after,input[type=datetime-local]:not(.browser-default):focus.invalid~.helper-text:after,input[type=tel]:not(.browser-default).invalid~.helper-text:after,input[type=tel]:not(.browser-default):focus.invalid~.helper-text:after,input[type=number]:not(.browser-default).invalid~.helper-text:after,input[type=number]:not(.browser-default):focus.invalid~.helper-text:after,input[type=search]:not(.browser-default).invalid~.helper-text:after,input[type=search]:not(.browser-default):focus.invalid~.helper-text:after,textarea.materialize-textarea.invalid~.helper-text:after,textarea.materialize-textarea:focus.invalid~.helper-text:after{content:attr(data-error);color:#f44336}.select-wrapper+label:after,input:not([type]):not(.browser-default)+label:after,input[type=text]:not(.browser-default)+label:after,input[type=password]:not(.browser-default)+label:after,input[type=email]:not(.browser-default)+label:after,input[type=url]:not(.browser-default)+label:after,input[type=time]:not(.browser-default)+label:after,input[type=date]:not(.browser-default)+label:after,input[type=datetime]:not(.browser-default)+label:after,input[type=datetime-local]:not(.browser-default)+label:after,input[type=tel]:not(.browser-default)+label:after,input[type=number]:not(.browser-default)+label:after,input[type=search]:not(.browser-default)+label:after,textarea.materialize-textarea+label:after{display:block;content:\"\";position:absolute;top:100%;left:0;opacity:0;transition:.2s opacity ease-out,.2s color ease-out}.input-field{position:relative;margin-top:1rem;margin-bottom:1rem}.input-field.inline{display:inline-block;vertical-align:middle;margin-left:5px}.input-field.inline input,.input-field.inline .select-dropdown{margin-bottom:1rem}.input-field.col label{left:.75rem}.input-field.col .prefix~label,.input-field.col .prefix~.validate~label{width:calc(100% - 3rem - 1.5rem)}.input-field>label{color:#9e9e9e;position:absolute;top:0;left:0;font-size:1rem;cursor:text;transition:transform .2s ease-out,color .2s ease-out;transform-origin:0% 100%;text-align:initial;transform:translateY(12px)}.input-field>label:not(.label-icon).active{transform:translateY(-14px) scale(0.8);transform-origin:0 0}.input-field>input[type]:-webkit-autofill:not(.browser-default):not([type=search])+label,.input-field>input[type=date]:not(.browser-default)+label,.input-field>input[type=time]:not(.browser-default)+label{transform:translateY(-14px) scale(0.8);transform-origin:0 0}.input-field .helper-text{position:relative;min-height:18px;display:block;font-size:12px;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.54))}.input-field .helper-text::after{opacity:1;position:absolute;top:0;left:0}.input-field .prefix{position:absolute;width:3rem;font-size:2rem;transition:color .2s;top:.5rem}.input-field .prefix.active{color:#26a69a}.input-field .prefix~input,.input-field .prefix~textarea,.input-field .prefix~label,.input-field .prefix~.validate~label,.input-field .prefix~.helper-text,.input-field .prefix~.autocomplete-content{margin-left:3rem;width:92%;width:calc(100% - 3rem)}.input-field .prefix~label{margin-left:3rem}@media only screen and (max-width : 992px){.input-field .prefix~input{width:86%;width:calc(100% - 3rem)}}@media only screen and (max-width : 600px){.input-field .prefix~input{width:80%;width:calc(100% - 3rem)}}.input-field input[type=color]:not(.browser-default){margin-top:8px}.input-field input[type=search]{display:block;line-height:inherit;transition:.3s background-color}.nav-wrapper .input-field input[type=search]{height:inherit;padding-left:4rem;width:calc(100% - 4rem);border:0;box-shadow:none}.input-field input[type=search]:focus:not(.browser-default){background-color:var(--mm-input-background, #fff);border:0;box-shadow:none;color:var(--mm-input-text, #444)}.input-field input[type=search]:focus:not(.browser-default)+label i,.input-field input[type=search]:focus:not(.browser-default)~.mdi-navigation-close,.input-field input[type=search]:focus:not(.browser-default)~.material-icons{color:var(--mm-input-text, #444)}.input-field input[type=search]+.label-icon{transform:none;left:1rem}.input-field input[type=search]~.mdi-navigation-close,.input-field input[type=search]~.material-icons{position:absolute;top:0;right:1rem;color:rgba(0,0,0,0);cursor:pointer;font-size:2rem;transition:.3s color}textarea{width:100%;height:3rem;background-color:rgba(0,0,0,0)}textarea.materialize-textarea{line-height:normal;overflow-y:hidden;padding:.8rem 0 .8rem 0;resize:none;min-height:3rem;box-sizing:border-box}.hiddendiv{visibility:hidden;white-space:pre-wrap;word-wrap:break-word;overflow-wrap:break-word;padding-top:1.2rem;position:absolute;top:0;z-index:-1}.autocomplete-content li .highlight{color:#444}.autocomplete-content li img{height:40px;width:40px;margin:5px 15px}.character-counter{min-height:18px}[type=radio]:not(:checked),[type=radio]:checked{position:absolute;opacity:0;pointer-events:none}[type=radio]:not(:checked)+span,[type=radio]:checked+span{position:relative;padding-left:35px;cursor:pointer;display:inline-block;height:25px;line-height:25px;font-size:1rem;transition:.28s ease;user-select:none}[type=radio]+span:before,[type=radio]+span:after{content:\"\";position:absolute;left:0;top:0;margin:4px;width:16px;height:16px;z-index:0;transition:.28s ease}[type=radio]:not(:checked)+span:before,[type=radio]:not(:checked)+span:after,[type=radio]:checked+span:before,[type=radio]:checked+span:after,[type=radio].with-gap:checked+span:before,[type=radio].with-gap:checked+span:after{border-radius:50%}[type=radio]:not(:checked)+span:before,[type=radio]:not(:checked)+span:after{border:2px solid var(--mm-text-secondary, #5a5a5a)}[type=radio]:not(:checked)+span:after{transform:scale(0)}[type=radio]:checked+span:before{border:2px solid rgba(0,0,0,0)}[type=radio]:checked+span:after,[type=radio].with-gap:checked+span:before,[type=radio].with-gap:checked+span:after{border:2px solid var(--mm-primary-color, #26a69a)}[type=radio]:checked+span:after,[type=radio].with-gap:checked+span:after{background-color:var(--mm-primary-color, #26a69a)}[type=radio]:checked+span:after{transform:scale(1.02)}[type=radio].with-gap:checked+span:after{transform:scale(0.5)}[type=radio].tabbed:focus+span:before{box-shadow:0 0 0 10px rgba(0,0,0,.1)}[type=radio].with-gap:disabled:checked+span:before{border:2px solid var(--mm-text-disabled, rgba(0, 0, 0, 0.42))}[type=radio].with-gap:disabled:checked+span:after{border:none;background-color:var(--mm-text-disabled, rgba(0, 0, 0, 0.42))}[type=radio]:disabled:not(:checked)+span:before,[type=radio]:disabled:checked+span:before{background-color:rgba(0,0,0,0);border-color:var(--mm-text-disabled, rgba(0, 0, 0, 0.42))}[type=radio]:disabled+span{color:var(--mm-text-disabled, rgba(0, 0, 0, 0.42))}[type=radio]:disabled:not(:checked)+span:before{border-color:var(--mm-text-disabled, rgba(0, 0, 0, 0.42))}[type=radio]:disabled:checked+span:after{background-color:var(--mm-text-disabled, rgba(0, 0, 0, 0.42));border-color:var(--mm-text-disabled, #949494)}[type=checkbox]:not(:checked),[type=checkbox]:checked{position:absolute;opacity:0;pointer-events:none}[type=checkbox]+span:not(.lever){position:relative;padding-left:35px;cursor:pointer;display:inline-block;height:25px;line-height:25px;font-size:1rem;user-select:none}[type=checkbox]+span:not(.lever):before,[type=checkbox]:not(.filled-in)+span:not(.lever):after{content:\"\";position:absolute;top:0;left:0;width:18px;height:18px;z-index:0;border:2px solid #5a5a5a;border-radius:1px;margin-top:3px;transition:.2s}[type=checkbox]:not(.filled-in)+span:not(.lever):after{border:0;transform:scale(0)}[type=checkbox]:not(:checked):disabled+span:not(.lever):before{border:none;background-color:rgba(0,0,0,.42)}[type=checkbox].tabbed:focus+span:not(.lever):after{transform:scale(1);border:0;border-radius:50%;box-shadow:0 0 0 10px rgba(0,0,0,.1);background-color:rgba(0,0,0,.1)}[type=checkbox]:checked+span:not(.lever):before{top:-4px;left:-5px;width:12px;height:22px;border-top:2px solid rgba(0,0,0,0);border-left:2px solid rgba(0,0,0,0);border-right:2px solid #26a69a;border-bottom:2px solid #26a69a;transform:rotate(40deg);backface-visibility:hidden;transform-origin:100% 100%}[type=checkbox]:checked:disabled+span:before{border-right:2px solid rgba(0,0,0,.42);border-bottom:2px solid rgba(0,0,0,.42)}[type=checkbox]:indeterminate+span:not(.lever):before{top:-11px;left:-12px;width:10px;height:22px;border-top:none;border-left:none;border-right:2px solid #26a69a;border-bottom:none;transform:rotate(90deg);backface-visibility:hidden;transform-origin:100% 100%}[type=checkbox]:indeterminate:disabled+span:not(.lever):before{border-right:2px solid rgba(0,0,0,.42);background-color:rgba(0,0,0,0)}[type=checkbox].filled-in+span:not(.lever):after{border-radius:2px}[type=checkbox].filled-in+span:not(.lever):before,[type=checkbox].filled-in+span:not(.lever):after{content:\"\";left:0;position:absolute;transition:border .25s,background-color .25s,width .2s .1s,height .2s .1s,top .2s .1s,left .2s .1s;z-index:1}[type=checkbox].filled-in:not(:checked)+span:not(.lever):before{width:0;height:0;border:3px solid rgba(0,0,0,0);left:6px;top:10px;transform:rotateZ(37deg);transform-origin:100% 100%}[type=checkbox].filled-in:not(:checked)+span:not(.lever):after{height:20px;width:20px;background-color:rgba(0,0,0,0);border:2px solid #5a5a5a;top:0px;z-index:0}[type=checkbox].filled-in:checked+span:not(.lever):before{top:0;left:1px;width:8px;height:13px;border-top:2px solid rgba(0,0,0,0);border-left:2px solid rgba(0,0,0,0);border-right:2px solid #fff;border-bottom:2px solid #fff;transform:rotateZ(37deg);transform-origin:100% 100%}[type=checkbox].filled-in:checked+span:not(.lever):after{top:0;width:20px;height:20px;border:2px solid #26a69a;background-color:#26a69a;z-index:0}[type=checkbox].filled-in.tabbed:focus+span:not(.lever):after{border-radius:2px;border-color:#5a5a5a;background-color:rgba(0,0,0,.1)}[type=checkbox].filled-in.tabbed:checked:focus+span:not(.lever):after{border-radius:2px;background-color:#26a69a;border-color:#26a69a}[type=checkbox].filled-in:disabled:not(:checked)+span:not(.lever):before{background-color:rgba(0,0,0,0);border:2px solid rgba(0,0,0,0)}[type=checkbox].filled-in:disabled:not(:checked)+span:not(.lever):after{border-color:rgba(0,0,0,0);background-color:#949494}[type=checkbox].filled-in:disabled:checked+span:not(.lever):before{background-color:rgba(0,0,0,0)}[type=checkbox].filled-in:disabled:checked+span:not(.lever):after{background-color:#949494;border-color:#949494}.switch,.switch *{-webkit-tap-highlight-color:rgba(0,0,0,0);user-select:none}.switch label{cursor:pointer}.switch label input[type=checkbox]{opacity:0;width:0;height:0}.switch label input[type=checkbox]:checked+.lever{background-color:var(--mm-switch-checked-track, rgb(132.0625, 199.4375, 193.12109375))}.switch label input[type=checkbox]:checked+.lever:before,.switch label input[type=checkbox]:checked+.lever:after{left:18px}.switch label input[type=checkbox]:checked+.lever:after{background-color:var(--mm-switch-checked-thumb, #26a69a)}.switch label .lever{content:\"\";display:inline-block;position:relative;width:36px;height:14px;background-color:var(--mm-switch-unchecked-track, rgba(0, 0, 0, 0.38));border-radius:15px;margin-right:10px;transition:background .3s ease;vertical-align:middle;margin:0 16px}.switch label .lever:before,.switch label .lever:after{content:\"\";position:absolute;display:inline-block;width:20px;height:20px;border-radius:50%;left:0;top:-3px;transition:left .3s ease,background .3s ease,box-shadow .1s ease,transform .1s ease}.switch label .lever:before{background-color:rgba(38,166,154,.15)}.switch label .lever:after{background-color:var(--mm-switch-unchecked-thumb, #F1F1F1);box-shadow:0px 3px 1px -2px rgba(0,0,0,.2),0px 2px 2px 0px rgba(0,0,0,.14),0px 1px 5px 0px rgba(0,0,0,.12)}input[type=checkbox]:checked:not(:disabled)~.lever:active::before,input[type=checkbox]:checked:not(:disabled).tabbed:focus~.lever::before{transform:scale(2.4);background-color:rgba(38,166,154,.15)}input[type=checkbox]:not(:disabled)~.lever:active:before,input[type=checkbox]:not(:disabled).tabbed:focus~.lever::before{transform:scale(2.4);background-color:rgba(0,0,0,.08)}.switch input[type=checkbox][disabled]+.lever{cursor:default;background-color:var(--mm-switch-disabled-track, rgba(0, 0, 0, 0.12))}.switch label input[type=checkbox][disabled]+.lever:after,.switch label input[type=checkbox][disabled]:checked+.lever:after{background-color:var(--mm-switch-disabled-thumb, #949494)}select.browser-default{opacity:1}select{opacity:0;background-color:hsla(0,0%,100%,.9);width:100%;padding:5px;border:1px solid #f2f2f2;border-radius:2px;height:3rem}.select-label{position:absolute}.select-wrapper{position:relative}.select-wrapper.valid+label,.select-wrapper.invalid+label{width:100%;pointer-events:none}.select-wrapper input.select-dropdown{position:relative;cursor:pointer;background-color:rgba(0,0,0,0);border:none;border-bottom:1px solid #9e9e9e;outline:none;height:3rem;line-height:3rem;width:100%;font-size:16px;margin:0 0 8px 0;padding:0;display:block;user-select:none;z-index:1}.select-wrapper input.select-dropdown:focus{border-bottom:1px solid #26a69a}.select-wrapper .caret{position:absolute;right:0;top:0;bottom:0;margin:auto 0;z-index:0;fill:var(--mm-text-primary, rgba(0, 0, 0, 0.87))}.select-wrapper+label{position:absolute;top:-26px;font-size:.8rem}.select-wrapper .hide-select{width:0;height:0;overflow:hidden;position:absolute;top:0;z-index:-1}select:disabled{color:rgba(0,0,0,.42)}.select-wrapper.disabled+label{color:rgba(0,0,0,.42)}.select-wrapper.disabled .caret{fill:rgba(0,0,0,.42)}.select-wrapper input.select-dropdown:disabled{color:rgba(0,0,0,.42);cursor:default;user-select:none}.select-wrapper i{color:rgba(0,0,0,.3)}.select-dropdown li.disabled,.select-dropdown li.disabled>span,.select-dropdown li.optgroup{color:var(--mm-text-disabled, rgba(0, 0, 0, 0.3));background-color:rgba(0,0,0,0)}body.keyboard-focused .select-dropdown.dropdown-content li:focus{background-color:var(--mm-dropdown-focus, rgba(0, 0, 0, 0.08))}.select-dropdown.dropdown-content li:hover{background-color:var(--mm-dropdown-hover, rgba(0, 0, 0, 0.08))}.select-dropdown.dropdown-content li.selected{background-color:var(--mm-dropdown-selected, rgba(0, 0, 0, 0.03))}.prefix~.select-wrapper{margin-left:3rem;width:92%;width:calc(100% - 3rem)}.prefix~label{margin-left:3rem}.select-dropdown li img{height:40px;width:40px;margin:5px 15px;float:right}.select-dropdown li.optgroup{border-top:1px solid var(--mm-border-color, #eee)}.select-dropdown li.optgroup.selected>span{color:var(--mm-text-secondary, rgba(0, 0, 0, 0.7))}.select-dropdown li.optgroup>span{color:var(--mm-text-hint, rgba(0, 0, 0, 0.4))}.select-dropdown li.optgroup~li.optgroup-option{padding-left:1rem}.file-field{position:relative}.file-field .file-path-wrapper{overflow:hidden;padding-left:10px}.file-field input.file-path{width:100%}.file-field .btn{float:left;height:3rem;line-height:3rem}.file-field span{cursor:pointer}.file-field input[type=file]{position:absolute;top:0;right:0;left:0;bottom:0;width:100%;margin:0;padding:0;font-size:20px;cursor:pointer;opacity:0;filter:alpha(opacity=0)}.file-field input[type=file]::-webkit-file-upload-button{display:none}.file-field .close{height:20px}.range-field{position:relative}input[type=range],input[type=range]+.thumb{cursor:pointer}input[type=range]{position:relative;background-color:rgba(0,0,0,0);border:none;outline:none;width:100%;margin:15px 0;padding:0}input[type=range]:focus{outline:none}input[type=range]+.thumb{position:absolute;top:10px;left:0;border:none;height:0;width:0;border-radius:50%;background-color:#26a69a;margin-left:7px;transform-origin:50% 50%;transform:rotate(-45deg)}input[type=range]+.thumb .value{display:block;width:30px;text-align:center;color:#26a69a;font-size:0;transform:rotate(45deg)}input[type=range]+.thumb.active{border-radius:50% 50% 50% 0}input[type=range]+.thumb.active .value{color:#fff;margin-left:-1px;margin-top:8px;font-size:10px}input[type=range]{-webkit-appearance:none}input[type=range]::-webkit-slider-runnable-track{height:3px;background:#c2c0c2;border:none}input[type=range]::-webkit-slider-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#26a69a;transition:box-shadow .3s;-webkit-appearance:none;background-color:#26a69a;transform-origin:50% 50%;margin:-5px 0 0 0}.keyboard-focused input[type=range]:focus:not(.active)::-webkit-slider-thumb{box-shadow:0 0 0 10px rgba(38,166,154,.26)}input[type=range]{border:1px solid #fff}input[type=range]::-moz-range-track{height:3px;background:#c2c0c2;border:none}input[type=range]::-moz-focus-inner{border:0}input[type=range]::-moz-range-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#26a69a;transition:box-shadow .3s;margin-top:-5px}input[type=range]:-moz-focusring{outline:1px solid #fff;outline-offset:-1px}.keyboard-focused input[type=range]:focus:not(.active)::-moz-range-thumb{box-shadow:0 0 0 10px rgba(38,166,154,.26)}input[type=range]::-ms-track{height:3px;background:rgba(0,0,0,0);border-color:rgba(0,0,0,0);border-width:6px 0;color:rgba(0,0,0,0)}input[type=range]::-ms-fill-lower{background:#777}input[type=range]::-ms-fill-upper{background:#ddd}input[type=range]::-ms-thumb{border:none;height:14px;width:14px;border-radius:50%;background:#26a69a;transition:box-shadow .3s}.keyboard-focused input[type=range]:focus:not(.active)::-ms-thumb{box-shadow:0 0 0 10px rgba(38,166,154,.26)}.grid-container{display:grid;grid-template-columns:repeat(auto-fit, minmax(150px, 1fr));gap:15px;padding-top:10px;padding-bottom:20px}.grid-container p{margin:0}.form-group-label{font-size:.8rem;color:#9e9e9e;margin-bottom:15px;display:block;cursor:text;text-align:initial}select:focus{outline:1px solid rgb(201.05,242.65,238.75)}button:focus{outline:none;background-color:rgb(41.8,182.6,169.4)}label{font-size:.8rem;color:#9e9e9e}.table-of-contents.fixed{position:fixed}.table-of-contents li{padding:2px 0}.table-of-contents a{display:inline-block;font-weight:300;color:#757575;padding-left:16px;height:1.5rem;line-height:1.5rem;letter-spacing:.4;display:inline-block}.table-of-contents a:hover{color:#a8a8a8;padding-left:15px;border-left:1px solid #ee6e73}.table-of-contents a.active{font-weight:500;padding-left:14px;border-left:2px solid #ee6e73}.sidenav-container{position:relative;z-index:997}.sidenav-backdrop{position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;background:var(--mm-overlay-background, rgba(0, 0, 0, 0.5));opacity:0;visibility:hidden;transition:opacity .3s ease,visibility .3s ease;z-index:998;cursor:pointer}.sidenav-backdrop.show{opacity:1;visibility:visible}.sidenav-link{display:flex;align-items:center;padding:.75rem 1rem;color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));text-decoration:none;transition:background-color .2s ease,color .2s ease;cursor:pointer;min-height:48px}.sidenav-link:hover:not(.disabled){background:var(--mm-border-color, rgba(0, 0, 0, 0.12));color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));text-decoration:none}.sidenav-link.active{background:var(--mm-primary-color-light, rgba(38, 166, 154, 0.1));color:var(--mm-primary-color, #26a69a)}.sidenav-link.active .sidenav-icon{color:var(--mm-primary-color, #26a69a)}.sidenav-link.disabled{color:var(--mm-text-disabled, rgba(0, 0, 0, 0.38));cursor:not-allowed}.sidenav-link.disabled .sidenav-icon{color:var(--mm-text-disabled, rgba(0, 0, 0, 0.38))}.sidenav-icon{margin-right:1rem;font-size:1.5rem;width:24px;height:24px;display:flex;align-items:center;justify-content:center;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));flex-shrink:0}.sidenav-text{font-size:.875rem;font-weight:500;line-height:1.5;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.sidenav-divider{height:1px;background:var(--mm-divider-color, rgba(0, 0, 0, 0.12));margin:.5rem 0}.sidenav-subheader{padding:1rem 1rem .5rem 1rem;font-size:.75rem;font-weight:600;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));text-transform:uppercase;letter-spacing:.5px;line-height:1.5}.sidenav-content{padding:0;height:100%;display:flex;flex-direction:column}.sidenav{position:fixed;width:300px;left:0;top:0;margin:0;transform:translateX(-100%);height:100%;height:calc(100% + 60px);height:-moz-calc(100%);padding-bottom:60px;background-color:var(--mm-surface-color, #fff);z-index:999;overflow-y:auto;will-change:transform;backface-visibility:hidden;transform:translateX(-105%);transition:transform .3s ease,left .3s ease,right .3s ease}.sidenav.sidenav-left{left:0}.sidenav.sidenav-right{right:0;left:auto;transform:translateX(100%)}.sidenav.sidenav-overlay{position:fixed}.sidenav.sidenav-push{position:relative;box-shadow:var(--mm-border-color, rgba(0, 0, 0, 0.12)) 1px 0 0 0}.sidenav.closed.sidenav-left{transform:translateX(-100%)}.sidenav.closed.sidenav-right{transform:translateX(100%)}.sidenav.open{transform:translateX(0)}.sidenav.right-aligned{right:0;transform:translateX(105%);left:auto;transform:translateX(100%)}.sidenav .collapsible{margin:0}.sidenav li{float:none;line-height:48px}.sidenav li.active{background-color:rgba(0,0,0,.05)}.sidenav li>a:not(.btn):not(.btn-large):not(.btn-flat):not(.btn-floating){color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));display:block;font-size:14px;font-weight:500;height:48px;line-height:48px;padding:0 32px}.sidenav li>a:not(.btn):not(.btn-large):not(.btn-flat):not(.btn-floating):hover{background-color:var(--mm-border-color, rgba(0, 0, 0, 0.05))}.sidenav li>a:not(.btn):not(.btn-large):not(.btn-flat):not(.btn-floating)>i,.sidenav li>a:not(.btn):not(.btn-large):not(.btn-flat):not(.btn-floating)>[class^=mdi-],.sidenav li>a:not(.btn):not(.btn-large):not(.btn-flat):not(.btn-floating) li>a>[class*=mdi-],.sidenav li>a:not(.btn):not(.btn-large):not(.btn-flat):not(.btn-floating)>i.material-icons{float:left;height:48px;line-height:48px;margin:0 32px 0 0;width:24px;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.54))}.sidenav li>.btn,.sidenav li>.btn-large,.sidenav li>.btn-flat,.sidenav li>.btn-floating{margin:10px 32px}.sidenav .divider{margin:8px 0 0 0}.sidenav .subheader{cursor:initial;pointer-events:none;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.54));font-size:14px;font-weight:500;line-height:48px;padding:0 32px;height:48px;display:flex;align-items:center}.sidenav .subheader:hover{background-color:rgba(0,0,0,0)}.sidenav .user-view{position:relative;padding:32px 32px 0;margin-bottom:8px}.sidenav .user-view>a{height:auto;padding:0}.sidenav .user-view>a:hover{background-color:rgba(0,0,0,0)}.sidenav .user-view .background{overflow:hidden;position:absolute;top:0;right:0;bottom:0;left:0;z-index:-1}.sidenav .user-view .circle,.sidenav .user-view .name,.sidenav .user-view .email{display:block}.sidenav .user-view .circle{height:64px;width:64px}.sidenav .user-view .name,.sidenav .user-view .email{font-size:14px;line-height:24px}.sidenav .user-view .name{margin-top:16px;font-weight:500}.sidenav .user-view .email{padding-bottom:16px;font-weight:400}.drag-target{height:100%;width:10px;position:fixed;top:0;left:0;z-index:998}.drag-target.right-aligned{right:0}.sidenav.sidenav-fixed{left:0;transform:translateX(0);position:fixed}.sidenav.sidenav-fixed.right-aligned{right:0;left:auto}@media only screen and (max-width : 992px){.sidenav.sidenav-fixed{transform:translateX(-105%)}.sidenav.sidenav-fixed.right-aligned{transform:translateX(105%)}.sidenav>a{padding:0 16px}.sidenav .user-view{padding:16px 16px 0}}.sidenav .collapsible-body>ul:not(.collapsible)>li.active,.sidenav.sidenav-fixed .collapsible-body>ul:not(.collapsible)>li.active{background-color:#ee6e73}.sidenav .collapsible-body>ul:not(.collapsible)>li.active a,.sidenav.sidenav-fixed .collapsible-body>ul:not(.collapsible)>li.active a{color:#fff}.sidenav .collapsible-body{padding:0}.sidenav-overlay{position:fixed;top:0;left:0;right:0;bottom:0;width:100%;height:100%;opacity:0;background-color:var(--mm-overlay-background, rgba(0, 0, 0, 0.5));z-index:997;display:none;transition:opacity .3s ease}.sidenav-overlay{pointer-events:auto}.preloader-wrapper{display:inline-block;position:relative;width:50px;height:50px}.preloader-wrapper.small{width:36px;height:36px}.preloader-wrapper.big{width:64px;height:64px}.preloader-wrapper.active{-webkit-animation:container-rotate 1568ms linear infinite;animation:container-rotate 1568ms linear infinite}@-webkit-keyframes container-rotate{to{-webkit-transform:rotate(360deg)}}@keyframes container-rotate{to{transform:rotate(360deg)}}.spinner-layer{position:absolute;width:100%;height:100%;opacity:0;border-color:#26a69a}.spinner-blue,.spinner-blue-only{border-color:#4285f4}.spinner-red,.spinner-red-only{border-color:#db4437}.spinner-yellow,.spinner-yellow-only{border-color:#f4b400}.spinner-green,.spinner-green-only{border-color:#0f9d58}.active .spinner-layer.spinner-blue{-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,blue-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,blue-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.active .spinner-layer.spinner-red{-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,red-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,red-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.active .spinner-layer.spinner-yellow{-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,yellow-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,yellow-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.active .spinner-layer.spinner-green{-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,green-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both,green-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.active .spinner-layer,.active .spinner-layer.spinner-blue-only,.active .spinner-layer.spinner-red-only,.active .spinner-layer.spinner-yellow-only,.active .spinner-layer.spinner-green-only{opacity:1;-webkit-animation:fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}@-webkit-keyframes fill-unfill-rotate{12.5%{-webkit-transform:rotate(135deg)}25%{-webkit-transform:rotate(270deg)}37.5%{-webkit-transform:rotate(405deg)}50%{-webkit-transform:rotate(540deg)}62.5%{-webkit-transform:rotate(675deg)}75%{-webkit-transform:rotate(810deg)}87.5%{-webkit-transform:rotate(945deg)}to{-webkit-transform:rotate(1080deg)}}@keyframes fill-unfill-rotate{12.5%{transform:rotate(135deg)}25%{transform:rotate(270deg)}37.5%{transform:rotate(405deg)}50%{transform:rotate(540deg)}62.5%{transform:rotate(675deg)}75%{transform:rotate(810deg)}87.5%{transform:rotate(945deg)}to{transform:rotate(1080deg)}}@-webkit-keyframes blue-fade-in-out{from{opacity:1}25%{opacity:1}26%{opacity:0}89%{opacity:0}90%{opacity:1}100%{opacity:1}}@keyframes blue-fade-in-out{from{opacity:1}25%{opacity:1}26%{opacity:0}89%{opacity:0}90%{opacity:1}100%{opacity:1}}@-webkit-keyframes red-fade-in-out{from{opacity:0}15%{opacity:0}25%{opacity:1}50%{opacity:1}51%{opacity:0}}@keyframes red-fade-in-out{from{opacity:0}15%{opacity:0}25%{opacity:1}50%{opacity:1}51%{opacity:0}}@-webkit-keyframes yellow-fade-in-out{from{opacity:0}40%{opacity:0}50%{opacity:1}75%{opacity:1}76%{opacity:0}}@keyframes yellow-fade-in-out{from{opacity:0}40%{opacity:0}50%{opacity:1}75%{opacity:1}76%{opacity:0}}@-webkit-keyframes green-fade-in-out{from{opacity:0}65%{opacity:0}75%{opacity:1}90%{opacity:1}100%{opacity:0}}@keyframes green-fade-in-out{from{opacity:0}65%{opacity:0}75%{opacity:1}90%{opacity:1}100%{opacity:0}}.gap-patch{position:absolute;top:0;left:45%;width:10%;height:100%;overflow:hidden;border-color:inherit}.gap-patch .circle{width:1000%;left:-450%}.circle-clipper{display:inline-block;position:relative;width:50%;height:100%;overflow:hidden;border-color:inherit}.circle-clipper .circle{width:200%;height:100%;border-width:3px;border-style:solid;border-color:inherit;border-bottom-color:rgba(0,0,0,0) !important;border-radius:50%;-webkit-animation:none;animation:none;position:absolute;top:0;right:0;bottom:0}.circle-clipper.left .circle{left:0;border-right-color:rgba(0,0,0,0) !important;-webkit-transform:rotate(129deg);transform:rotate(129deg)}.circle-clipper.right .circle{left:-100%;border-left-color:rgba(0,0,0,0) !important;-webkit-transform:rotate(-129deg);transform:rotate(-129deg)}.active .circle-clipper.left .circle{-webkit-animation:left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}.active .circle-clipper.right .circle{-webkit-animation:right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;animation:right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both}@-webkit-keyframes left-spin{from{-webkit-transform:rotate(130deg)}50%{-webkit-transform:rotate(-5deg)}to{-webkit-transform:rotate(130deg)}}@keyframes left-spin{from{transform:rotate(130deg)}50%{transform:rotate(-5deg)}to{transform:rotate(130deg)}}@-webkit-keyframes right-spin{from{-webkit-transform:rotate(-130deg)}50%{-webkit-transform:rotate(5deg)}to{-webkit-transform:rotate(-130deg)}}@keyframes right-spin{from{transform:rotate(-130deg)}50%{transform:rotate(5deg)}to{transform:rotate(-130deg)}}#spinnerContainer.cooldown{-webkit-animation:container-rotate 1568ms linear infinite,fade-out 400ms cubic-bezier(0.4, 0, 0.2, 1);animation:container-rotate 1568ms linear infinite,fade-out 400ms cubic-bezier(0.4, 0, 0.2, 1)}@-webkit-keyframes fade-out{from{opacity:1}to{opacity:0}}@keyframes fade-out{from{opacity:1}to{opacity:0}}.slider{position:relative;height:400px;width:100%}.slider.fullscreen{height:100%;width:100%;position:absolute;top:0;left:0;right:0;bottom:0}.slider.fullscreen ul.slides{height:100%}.slider.fullscreen ul.indicators{z-index:2;bottom:30px}.slider .slides{background-color:#9e9e9e;margin:0;height:400px}.slider .slides li{opacity:0;position:absolute;top:0;left:0;z-index:1;width:100%;height:inherit;overflow:hidden}.slider .slides li img{height:100%;width:100%;background-size:cover;background-position:center}.slider .slides li .caption{color:#fff;position:absolute;top:15%;left:15%;width:70%;opacity:0}.slider .slides li .caption p{color:#e0e0e0}.slider .slides li.active{z-index:2}.slider .indicators{position:absolute;text-align:center;left:0;right:0;bottom:0;margin:0}.slider .indicators .indicator-item{display:inline-block;position:relative;cursor:pointer;height:16px;width:16px;margin:0 12px;background-color:#e0e0e0;transition:background-color .3s;border-radius:50%}.slider .indicators .indicator-item.active{background-color:#4caf50}.carousel{overflow:hidden;position:relative;width:100%;height:400px;perspective:500px;transform-style:preserve-3d;transform-origin:0% 50%}.carousel.carousel-slider{top:0;left:0}.carousel.carousel-slider .carousel-fixed-item{position:absolute;left:0;right:0;bottom:20px;z-index:1}.carousel.carousel-slider .carousel-fixed-item.with-indicators{bottom:68px}.carousel.carousel-slider .carousel-item{width:100%;height:100%;min-height:400px;position:absolute;top:0;left:0}.carousel.carousel-slider .carousel-item h2{font-size:24px;font-weight:500;line-height:32px}.carousel.carousel-slider .carousel-item p{font-size:15px}.carousel .carousel-item{visibility:hidden;width:200px;height:200px;position:absolute;top:0;left:0}.carousel .carousel-item>img{width:100%}.carousel .indicators{position:absolute;text-align:center;left:0;right:0;bottom:0;margin:0}.carousel .indicators .indicator-item{display:inline-block;position:relative;cursor:pointer;height:8px;width:8px;margin:24px 4px;background-color:hsla(0,0%,100%,.5);transition:background-color .3s;border-radius:50%}.carousel .indicators .indicator-item.active{background-color:#fff}.carousel.scrolling .carousel-item .materialboxed,.carousel .carousel-item:not(.active) .materialboxed{pointer-events:none}.tap-target-wrapper{width:800px;height:800px;position:fixed;z-index:1000;visibility:hidden;transition:visibility 0s .3s}.tap-target-wrapper.open{visibility:visible;transition:visibility 0s}.tap-target-wrapper.open .tap-target{transform:scale(1);opacity:.95;transition:transform .3s cubic-bezier(0.42, 0, 0.58, 1),opacity .3s cubic-bezier(0.42, 0, 0.58, 1)}.tap-target-wrapper.open .tap-target-wave::before{transform:scale(1)}.tap-target-wrapper.open .tap-target-wave::after{visibility:visible;animation:pulse-animation 1s cubic-bezier(0.24, 0, 0.38, 1) infinite;transition:opacity .3s,transform .3s,visibility 0s 1s}.tap-target{position:absolute;font-size:1rem;border-radius:50%;background-color:#ee6e73;box-shadow:0 20px 20px 0 rgba(0,0,0,.14),0 10px 50px 0 rgba(0,0,0,.12),0 30px 10px -20px rgba(0,0,0,.2);width:100%;height:100%;opacity:0;transform:scale(0);transition:transform .3s cubic-bezier(0.42, 0, 0.58, 1),opacity .3s cubic-bezier(0.42, 0, 0.58, 1)}.tap-target-content{position:relative;display:table-cell}.tap-target-wave{position:absolute;border-radius:50%;z-index:10001}.tap-target-wave::before,.tap-target-wave::after{content:\"\";display:block;position:absolute;width:100%;height:100%;border-radius:50%;background-color:#fff}.tap-target-wave::before{transform:scale(0);transition:transform .3s}.tap-target-wave::after{visibility:hidden;transition:opacity .3s,transform .3s,visibility 0s;z-index:-1}.tap-target-origin{top:50%;left:50%;transform:translate(-50%, -50%);z-index:10002;position:absolute !important}.tap-target-origin:not(.btn),.tap-target-origin:not(.btn):hover{background:none}@media only screen and (max-width: 600px){.tap-target,.tap-target-wrapper{width:600px;height:600px}}.pulse{overflow:visible;position:relative}.pulse::before{content:\"\";display:block;position:absolute;width:100%;height:100%;top:0;left:0;background-color:inherit;border-radius:inherit;transition:opacity .3s,transform .3s;animation:pulse-animation 1s cubic-bezier(0.24, 0, 0.38, 1) infinite;z-index:-1}@keyframes pulse-animation{0%{opacity:1;transform:scale(1)}50%{opacity:0;transform:scale(1.5)}100%{opacity:0;transform:scale(1.5)}}.datepicker-modal{max-width:325px;min-width:300px;max-height:none;overflow:visible}.datepicker-container.modal-content{display:flex;flex-direction:column;padding:0;overflow:visible;background-color:var(--mm-surface-color, #ffffff);color:var(--mm-text-primary, rgba(0, 0, 0, 0.87))}.datepicker-controls{display:flex;justify-content:space-between;width:280px;margin:0 auto;overflow:visible}.datepicker-controls .selects-container{display:flex;overflow:visible}.datepicker-controls .select-wrapper{position:relative;overflow:visible}.datepicker-controls .select-wrapper input{border-bottom:none;text-align:center;margin:0;cursor:pointer}.datepicker-controls .select-wrapper input:focus{border-bottom:none}.datepicker-controls .select-wrapper .caret{position:absolute;right:0;top:50%;transform:translateY(-50%);cursor:pointer;width:16px;height:16px;fill:var(--mm-text-secondary, rgba(0, 0, 0, 0.54))}.datepicker-controls .select-wrapper .dropdown-content{position:absolute;top:100%;left:0;right:0;background-color:var(--mm-surface-color, white);box-shadow:0 4px 20px var(--mm-shadow-color, rgba(0, 0, 0, 0.3));z-index:20000;border:1px solid var(--mm-border-color, #ddd);border-radius:2px;display:block;opacity:1}.datepicker-controls .select-wrapper .dropdown-content .dropdown-item{padding:8px 16px;cursor:pointer;white-space:nowrap;transition:background-color .2s}.datepicker-controls .select-wrapper .dropdown-content .dropdown-item:hover{background-color:var(--mm-border-color, #f5f5f5)}.datepicker-controls .select-wrapper .dropdown-content .dropdown-item.selected{background-color:var(--mm-border-color, #f5f5f5)}.datepicker-controls .select-year input{width:50px}.datepicker-controls .select-year .dropdown-content{max-height:60vh;overflow-y:auto}.datepicker-controls .select-month input{width:80px}.datepicker-controls .select-month .dropdown-content{width:auto;min-width:120px;left:auto;right:0}.month-prev,.month-next{margin-top:4px;cursor:pointer;background-color:rgba(0,0,0,0);border:none}.datepicker-date-display{flex:1 auto;background-color:#26a69a;color:#fff;padding:20px 22px;font-weight:500}.datepicker-date-display .year-text{display:block;font-size:1.5rem;line-height:25px;color:hsla(0,0%,100%,.7)}.datepicker-date-display .date-text{display:block;font-size:2.8rem;line-height:47px;font-weight:500}.datepicker-calendar-container{flex:2.5 auto}.datepicker-table{width:280px;font-size:1rem;margin:0 auto}.datepicker-table.with-week-numbers{width:310px}.datepicker-table thead{border-bottom:none}.datepicker-table th{padding:10px 5px;text-align:center}.datepicker-table th.datepicker-week-header{color:var(--mm-text-hint, rgba(0, 0, 0, 0.38));font-size:.8rem;font-weight:600;width:30px;padding:10px 2px}.datepicker-table tr{border:none}.datepicker-table abbr{text-decoration:none;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.54))}.datepicker-table td{border-radius:50%;padding:0}.datepicker-table td.is-today{color:var(--mm-primary-color, #26a69a)}.datepicker-table td.is-selected{background-color:var(--mm-primary-color, #26a69a);color:var(--mm-button-text, #fff)}.datepicker-table td.is-outside-current-month,.datepicker-table td.is-disabled{color:var(--mm-text-disabled, rgba(0, 0, 0, 0.3));pointer-events:none}.datepicker-table td.datepicker-week-number{color:var(--mm-text-hint, rgba(0, 0, 0, 0.38));font-size:.8rem;font-weight:600;text-align:center;vertical-align:middle;border-radius:0;width:30px;padding:5px 2px;background-color:var(--mm-border-color, rgba(0, 0, 0, 0.02));border-right:1px solid var(--mm-border-color, rgba(0, 0, 0, 0.05))}.datepicker-day-button{background-color:rgba(0,0,0,0);border:none;line-height:38px;display:block;width:100%;border-radius:50%;padding:0 5px;cursor:pointer;color:inherit}.datepicker-footer{width:280px;margin:0 auto;padding-bottom:5px;display:flex;justify-content:space-between}.datepicker-cancel,.datepicker-clear,.datepicker-today,.datepicker-done{color:#26a69a;padding:0 1rem}.datepicker-clear{color:#f44336}@media only screen and (min-width: 601px){.datepicker-modal{max-width:625px}.datepicker-container.modal-content{flex-direction:row}.datepicker-date-display{flex:0 1 270px}.datepicker-controls,.datepicker-table,.datepicker-footer{width:320px}.datepicker-table.with-week-numbers{width:350px}.datepicker-day-button{line-height:44px}}.input-field.timepicker input[disabled]{cursor:not-allowed}.timepicker-actions{display:flex;gap:8px;margin-top:4px;font-size:12px}.timepicker-actions .btn-flat{padding:2px 8px;min-width:auto;height:24px;line-height:20px;font-size:11px;text-transform:none}.timepicker-actions .btn-flat i.material-icons{font-size:14px;margin-right:4px}.inline-time-controls{display:flex;align-items:center;gap:8px;margin-top:8px;padding:12px;background-color:var(--mm-border-color, #f5f5f5);border-radius:4px;font-size:14px}.inline-time-controls .time-controls-12h{display:flex;align-items:center;gap:4px}.inline-time-controls .time-controls-12h input[type=number]{width:50px;text-align:center;padding:4px;border:1px solid var(--mm-border-color, #ccc);border-radius:4px}.inline-time-controls .time-controls-12h select{padding:4px;border:1px solid var(--mm-border-color, #ccc);border-radius:4px;margin-left:4px}.inline-time-controls input[type=time]{font-size:16px;padding:4px 8px;border:1px solid var(--mm-border-color, #ccc);border-radius:4px;min-width:120px}.inline-time-controls .btn-flat{padding:4px 8px;font-size:11px;background-color:var(--mm-border-color, #e0e0e0);border-radius:4px;min-width:auto}.timepicker-modal{max-width:325px;max-height:none}.timepicker-container.modal-content{display:flex;flex-direction:column;padding:0}.text-primary{color:#fff}.timepicker-digital-display{flex:1 auto;background-color:#26a69a;padding:10px;font-weight:300}.timepicker-text-container{font-size:4rem;font-weight:bold;text-align:center;color:hsla(0,0%,100%,.6);font-weight:400;position:relative;user-select:none}.timepicker-span-hours,.timepicker-span-minutes,.timepicker-span-am-pm div{cursor:pointer}.timepicker-span-hours{margin-right:3px}.timepicker-span-minutes{margin-left:3px}.timepicker-display-am-pm{font-size:1.3rem;position:absolute;right:1rem;bottom:1rem;font-weight:400}.timepicker-analog-display{flex:2.5 auto}.timepicker-plate{background-color:#eee;border-radius:50%;width:270px;height:270px;overflow:visible;position:relative;margin:auto;margin-top:25px;margin-bottom:5px;user-select:none}.timepicker-canvas,.timepicker-dial{position:absolute;left:0;right:0;top:0;bottom:0}.timepicker-minutes{visibility:hidden}.timepicker-tick{border-radius:50%;color:rgba(0,0,0,.87);line-height:40px;text-align:center;width:40px;height:40px;position:absolute;cursor:pointer;font-size:15px}.timepicker-tick.active,.timepicker-tick:hover{background-color:rgba(38,166,154,.25)}.timepicker-dial{transition:transform 350ms,opacity 350ms}.timepicker-dial-out{opacity:0}.timepicker-dial-out.timepicker-hours{transform:scale(1.1, 1.1)}.timepicker-dial-out.timepicker-minutes{transform:scale(0.8, 0.8)}.timepicker-canvas{transition:opacity 175ms}.timepicker-canvas line{stroke:#26a69a;stroke-width:4;stroke-linecap:round}.timepicker-canvas-out{opacity:.25}.timepicker-canvas-bearing{stroke:none;fill:#26a69a}.timepicker-canvas-bg{stroke:none;fill:#26a69a}.timepicker-footer{margin:0 auto;padding:5px 1rem;display:flex;justify-content:space-between}.timepicker-clear{color:#f44336}.timepicker-close{color:#26a69a}.timepicker-clear,.timepicker-close{padding:0 20px}@media only screen and (min-width : 601px){.timepicker-modal{max-width:600px}.timepicker-container.modal-content{flex-direction:row}.timepicker-text-container{top:32%}.timepicker-display-am-pm{position:relative;right:auto;bottom:auto;text-align:center;margin-top:1.2rem}}.theme-switcher{display:flex;align-items:center;gap:.5rem}.theme-switcher .theme-switcher-label{font-size:.875rem;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));font-weight:500}.theme-switcher .theme-switcher-buttons{display:flex;background:var(--mm-surface-color, #ffffff);border:1px solid var(--mm-border-color, rgba(0, 0, 0, 0.12));border-radius:.5rem;overflow:hidden}.theme-switcher .theme-switcher-buttons .btn-flat{display:flex;align-items:center;gap:.25rem;padding:.5rem .75rem;margin:0;border:none;background:rgba(0,0,0,0);color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));font-size:.875rem;border-radius:0;min-width:auto;height:auto;line-height:1;text-transform:none;transition:all .2s ease;cursor:pointer}.theme-switcher .theme-switcher-buttons .btn-flat:hover{background:var(--mm-border-color, rgba(0, 0, 0, 0.12));color:var(--mm-text-primary, rgba(0, 0, 0, 0.87))}.theme-switcher .theme-switcher-buttons .btn-flat.active{background:var(--mm-primary-color, #26a69a);color:var(--mm-button-text, #ffffff)}.theme-switcher .theme-switcher-buttons .btn-flat.active:hover{background:var(--mm-primary-color-dark, #00695c)}.theme-switcher .theme-switcher-buttons .btn-flat .material-icons{font-size:1rem}.theme-switcher .theme-switcher-buttons .btn-flat span{font-size:.75rem;font-weight:500}.theme-toggle{width:2.5rem;height:2.5rem;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--mm-surface-color, #ffffff);border:1px solid var(--mm-border-color, rgba(0, 0, 0, 0.12));color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));cursor:pointer;transition:all .2s ease}.theme-toggle:hover{background:var(--mm-primary-color, #26a69a);color:var(--mm-button-text, #ffffff);border-color:var(--mm-primary-color, #26a69a)}.theme-toggle .material-icons{font-size:1.25rem}nav .theme-toggle{background:rgba(0,0,0,0);border:none;border-radius:0;width:64px;height:64px}nav .theme-toggle:hover{background:hsla(0,0%,100%,.1);border:none}nav .theme-toggle:focus{background:hsla(0,0%,100%,.1)}@media(max-width: 600px){.theme-switcher .theme-switcher-buttons .btn-flat{padding:.5rem}.theme-switcher .theme-switcher-buttons .btn-flat span{display:none}}.file-upload-container{margin-bottom:1rem}.file-upload-area{border:2px dashed var(--mm-border-color, rgba(0, 0, 0, 0.12));border-radius:.5rem;padding:2rem;text-align:center;cursor:pointer;transition:all .2s ease;background:var(--mm-input-background, #ffffff)}.file-upload-area:hover:not(.disabled){border-color:var(--mm-primary-color, #26a69a);background:var(--mm-surface-color, #f5f5f5)}.file-upload-area.drag-over{border-color:var(--mm-primary-color, #26a69a);background:var(--mm-primary-color-light, rgba(38, 166, 154, 0.1));transform:scale(1.02)}.file-upload-area.disabled{opacity:.6;cursor:not-allowed;background:var(--mm-border-color, rgba(0, 0, 0, 0.05))}.file-upload-area.error{border-color:#f44336}.file-upload-area.has-files{padding:1rem}.file-upload-content .file-upload-icon{font-size:3rem;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));margin-bottom:.5rem}.file-upload-content .file-upload-label{font-size:1.1rem;font-weight:500;color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));margin:.5rem 0}.file-upload-content .file-upload-helper{font-size:.875rem;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));margin:.25rem 0}.file-upload-content .file-upload-types{font-size:.75rem;color:var(--mm-text-hint, rgba(0, 0, 0, 0.38));margin:.25rem 0 0 0;font-style:italic}.file-upload-error{color:#f44336;font-size:.875rem;margin-top:.5rem;text-align:left}.file-upload-list{margin-top:1rem}.file-upload-list h6{margin:0 0 .5rem 0;font-size:.875rem;font-weight:600;color:var(--mm-text-primary, rgba(0, 0, 0, 0.87))}.file-upload-item{display:flex;align-items:center;gap:1rem;padding:.75rem;margin-bottom:.5rem;background:var(--mm-surface-color, #ffffff);border:1px solid var(--mm-border-color, rgba(0, 0, 0, 0.12));border-radius:.5rem;transition:all .2s ease}.file-upload-item:hover{background:var(--mm-card-background, #f5f5f5)}.file-upload-item .file-preview{flex-shrink:0;width:3rem;height:3rem;border-radius:.25rem;overflow:hidden;background:var(--mm-border-color, rgba(0, 0, 0, 0.05))}.file-upload-item .file-preview img{width:100%;height:100%;object-fit:cover}.file-upload-item .file-info{flex:1;min-width:0}.file-upload-item .file-info .file-name{font-weight:500;color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));margin-bottom:.25rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.file-upload-item .file-info .file-details{display:flex;gap:1rem;font-size:.75rem;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6))}.file-upload-item .file-info .file-progress{margin-top:.5rem}.file-upload-item .file-info .file-progress .progress{height:.25rem;background-color:var(--mm-border-color, rgba(0, 0, 0, 0.12));border-radius:.125rem;overflow:hidden}.file-upload-item .file-info .file-progress .progress .determinate{background-color:var(--mm-primary-color, #26a69a);height:100%;transition:width .3s ease}.file-upload-item .file-info .file-error{color:#f44336;font-size:.75rem;margin-top:.25rem}.file-upload-item .file-remove{flex-shrink:0;width:2rem;height:2rem;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0);border:none;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));cursor:pointer;transition:all .2s ease}.file-upload-item .file-remove:hover{background:rgba(244,67,54,.1);color:#f44336}.file-upload-item .file-remove .material-icons{font-size:1.25rem}@media(max-width: 600px){.file-upload-area{padding:1.5rem 1rem}.file-upload-area .file-upload-content .file-upload-icon{font-size:2.5rem}.file-upload-area .file-upload-content .file-upload-label{font-size:1rem}.file-upload-item{gap:.75rem;padding:.5rem}.file-upload-item .file-preview{width:2.5rem;height:2.5rem}.file-upload-item .file-info .file-details{flex-direction:column;gap:.25rem}}[data-theme=dark] .file-upload-area.drag-over{background:var(--mm-primary-color-dark, rgba(38, 166, 154, 0.2))}.breadcrumb{padding:1rem 0;margin-bottom:1rem;background:rgba(0,0,0,0);display:flex;align-items:center;min-height:2rem}.breadcrumb .breadcrumb-list{display:flex;align-items:center;flex-wrap:wrap;list-style:none;padding:0;margin:0;gap:.5rem;width:100%}.breadcrumb-item{display:flex;align-items:center;font-size:.875rem;line-height:1.5}.breadcrumb-item.active .breadcrumb-text{color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));font-weight:500}.breadcrumb-item.disabled .breadcrumb-text{color:var(--mm-text-disabled, rgba(0, 0, 0, 0.38));cursor:not-allowed}.breadcrumb-item.breadcrumb-ellipsis .breadcrumb-text{color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));font-weight:400;user-select:none}.breadcrumb-link{display:flex;align-items:center;color:var(--mm-primary-color, #26a69a);text-decoration:none;transition:color .2s ease;padding:.25rem .5rem;border-radius:4px}.breadcrumb-link:hover{color:var(--mm-primary-color-dark, #00695c);text-decoration:underline;background:var(--mm-primary-color-light, rgba(38, 166, 154, 0.1))}.breadcrumb-link:focus{outline:2px solid var(--mm-primary-color, #26a69a);outline-offset:2px;border-radius:2px}.breadcrumb-text{color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));font-weight:400;line-height:inherit;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:200px}.breadcrumb-icon{font-size:1.125rem;width:18px;height:18px;margin-right:.5rem;flex-shrink:0;color:inherit;display:flex;align-items:center;justify-content:center}.breadcrumb-separator{display:flex;align-items:center;justify-content:center;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));user-select:none;height:18px}.breadcrumb-separator .material-icons{font-size:1.125rem;width:18px;height:18px;line-height:18px}.breadcrumb.compact{padding:.25rem 0;margin-bottom:.5rem}.breadcrumb.compact .breadcrumb-item{font-size:.75rem}.breadcrumb.compact .breadcrumb-icon{font-size:.875rem;width:14px;height:14px}.breadcrumb.compact .breadcrumb-separator .material-icons{font-size:.875rem;width:14px;height:14px}.breadcrumb.large{padding:.75rem 0;margin-bottom:1.5rem}.breadcrumb.large .breadcrumb-item{font-size:1rem}.breadcrumb.large .breadcrumb-icon{font-size:1.125rem;width:18px;height:18px}.breadcrumb.large .breadcrumb-separator .material-icons{font-size:1.125rem;width:18px;height:18px}@media(max-width: 600px){.breadcrumb .breadcrumb-list{gap:.125rem}.breadcrumb .breadcrumb-item{font-size:.75rem}.breadcrumb .breadcrumb-text{max-width:120px}.breadcrumb .breadcrumb-icon{font-size:.875rem;width:14px;height:14px;margin-right:.125rem}.breadcrumb .breadcrumb-separator .material-icons{font-size:.875rem;width:14px;height:14px}}[data-theme=dark] .breadcrumb-link{color:var(--mm-primary-color, #80cbc4)}[data-theme=dark] .breadcrumb-link:hover{color:var(--mm-primary-color-light, #b2dfdb)}.breadcrumb.slash-separator .breadcrumb-separator{font-family:monospace;font-size:.875rem}.breadcrumb.slash-separator .breadcrumb-separator .material-icons{display:none}.breadcrumb.slash-separator .breadcrumb-separator::before{content:\"/\";color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6))}.breadcrumb.dot-separator .breadcrumb-separator .material-icons{display:none}.breadcrumb.dot-separator .breadcrumb-separator::before{content:\"•\";color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));font-size:1rem}.breadcrumb:not([aria-label]){aria-label:\"Breadcrumb navigation\"}.breadcrumb-link[aria-current=page]{color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));text-decoration:none;font-weight:500}.breadcrumb-link[aria-current=page]:hover{text-decoration:none}.wizard{display:flex;flex-direction:column;width:100%}.wizard.horizontal .wizard-steps{display:flex;align-items:flex-start;justify-content:space-between;position:relative}.wizard.horizontal .wizard-step{display:flex;flex-direction:column;align-items:center;text-align:center;flex:1;position:relative}.wizard.horizontal .wizard-step:not(:last-child){margin-right:2rem}.wizard.horizontal .wizard-step-content{margin-top:.75rem;max-width:200px}.wizard.horizontal .wizard-step-connector{position:absolute;top:20px;left:calc(50% + 20px);width:calc(100% - 40px);height:2px;background:var(--mm-border-color, rgba(0, 0, 0, 0.12));z-index:1}.wizard.vertical .wizard-steps{display:flex;flex-direction:column}.wizard.vertical .wizard-step{display:flex;align-items:flex-start;text-align:left;position:relative;padding-bottom:2rem}.wizard.vertical .wizard-step:last-child{padding-bottom:0}.wizard.vertical .wizard-step-content{margin-left:1rem;flex:1}.wizard.vertical .wizard-step-connector{position:absolute;top:40px;left:19px;bottom:-2rem;width:2px;background:var(--mm-border-color, rgba(0, 0, 0, 0.12));z-index:1}.wizard-header{margin-bottom:2rem}.wizard-step{cursor:pointer;transition:opacity .2s ease}.wizard-step.disabled{opacity:.6;cursor:not-allowed}.wizard-step:hover:not(.disabled) .wizard-step-indicator{box-shadow:0 0 0 8px var(--mm-primary-color-light, rgba(38, 166, 154, 0.1))}.wizard-step-indicator{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:var(--mm-border-color, rgba(0, 0, 0, 0.12));color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));font-weight:500;font-size:.875rem;transition:all .2s ease;position:relative;z-index:2}.wizard-step-indicator .material-icons{font-size:1.25rem}.wizard-step-indicator .wizard-step-number{font-weight:600}.wizard-step.active .wizard-step-indicator{background:var(--mm-primary-color, #26a69a);color:var(--mm-button-text, #ffffff)}.wizard-step.active .wizard-step-title{color:var(--mm-text-primary, rgba(0, 0, 0, 0.87));font-weight:600}.wizard-step.completed .wizard-step-indicator{background:var(--mm-primary-color, #26a69a);color:var(--mm-button-text, #ffffff)}.wizard-step.completed .wizard-step-connector{background:var(--mm-primary-color, #26a69a)}.wizard-step.error .wizard-step-indicator{background:#f44336;color:#fff}.wizard-step.error .wizard-step-title{color:#f44336}.wizard-step-title{font-size:.875rem;font-weight:500;color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));margin-bottom:.25rem;line-height:1.3}.wizard-step-subtitle{font-size:.75rem;color:var(--mm-text-hint, rgba(0, 0, 0, 0.38));line-height:1.3;margin-bottom:.25rem}.wizard-step-optional{font-size:.625rem;color:var(--mm-text-hint, rgba(0, 0, 0, 0.38));font-style:italic;text-transform:uppercase;letter-spacing:.5px}.wizard-body{flex:1;margin-bottom:2rem}.wizard-body .input-field{margin-bottom:1.5rem}.wizard-body .input-field input,.wizard-body .input-field textarea{width:100%;box-sizing:border-box}.wizard-body .input-field label{color:var(--mm-text-secondary, rgba(0, 0, 0, 0.6));transition:all .3s ease}.wizard-body .input-field label.active{color:var(--mm-primary-color, #26a69a);transform:translateY(-14px) scale(0.8)}.wizard-body .row{margin-bottom:0}.wizard-body .row .col{padding:0 .75rem}.wizard-body .row .col:first-child{padding-left:0}.wizard-body .row .col:last-child{padding-right:0}.wizard-step-panel{animation:wizard-slide-in .3s ease}@keyframes wizard-slide-in{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}.wizard-footer{border-top:1px solid var(--mm-border-color, rgba(0, 0, 0, 0.12));padding-top:1.5rem}.wizard-navigation{display:flex;justify-content:space-between;align-items:center;gap:1rem}.wizard-navigation .wizard-btn-previous,.wizard-navigation .wizard-btn-skip{margin-right:auto}.wizard-navigation .wizard-btn-next,.wizard-navigation .wizard-btn-complete{margin-left:auto}.wizard-navigation .wizard-btn-next .material-icons,.wizard-navigation .wizard-btn-complete .material-icons{margin-right:.5rem;animation:wizard-loading 1s infinite linear}@keyframes wizard-loading{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}.wizard.compact .wizard-step-indicator{width:32px;height:32px;font-size:.75rem}.wizard.compact .wizard-step-indicator .material-icons{font-size:1rem}.wizard.compact .wizard-step-title{font-size:.75rem}.wizard.compact .wizard-step-subtitle{font-size:.625rem}.wizard.compact .wizard-header{margin-bottom:1.5rem}.wizard.compact.horizontal .wizard-step-connector{top:16px}.wizard.compact.vertical .wizard-step-connector{top:32px;left:15px}.wizard.large .wizard-step-indicator{width:48px;height:48px;font-size:1rem}.wizard.large .wizard-step-indicator .material-icons{font-size:1.5rem}.wizard.large .wizard-step-title{font-size:1rem}.wizard.large .wizard-step-subtitle{font-size:.875rem}.wizard.large .wizard-header{margin-bottom:2.5rem}.wizard.large.horizontal .wizard-step-connector{top:24px}.wizard.large.vertical .wizard-step-connector{top:48px;left:23px}@media(max-width: 768px){.wizard.horizontal .wizard-steps{flex-direction:column;align-items:stretch}.wizard.horizontal .wizard-step{flex-direction:row;align-items:center;text-align:left;margin-right:0;margin-bottom:1rem}.wizard.horizontal .wizard-step:last-child{margin-bottom:0}.wizard.horizontal .wizard-step-content{margin-top:0;margin-left:1rem;max-width:none}.wizard.horizontal .wizard-step-connector{display:none}}[data-theme=dark] .wizard-step.error .wizard-step-title{color:#f48fb1}[data-theme=dark] .wizard-step.error .wizard-step-indicator{background:#f48fb1;color:#000}[data-theme=dark] .wizard-footer{border-color:var(--mm-border-color, rgba(255, 255, 255, 0.12))}.wizard-step:focus{outline:2px solid var(--mm-primary-color, #26a69a);outline-offset:2px;border-radius:4px}.wizard-step[aria-disabled=true]{pointer-events:none}.wizard-step-indicator[aria-current=step]{box-shadow:0 0 0 4px var(--mm-primary-color-light, rgba(38, 166, 154, 0.2))}.datatable-container .datatable-title{color:var(--mm-text-primary);font-weight:400;margin-bottom:1rem}.datatable-container .datatable-search{margin-bottom:1rem;max-width:400px}.datatable-container .datatable-wrapper{position:relative}.datatable-container .table-wrapper{overflow-x:auto;width:100%;-webkit-overflow-scrolling:touch}.datatable-container .datatable-loading{padding:2rem;text-align:center;color:var(--mm-text-secondary)}.datatable-container .datatable-loading .preloader-wrapper{margin-bottom:1rem}.datatable-container .datatable-empty{padding:3rem 2rem;text-align:center;color:var(--mm-text-secondary);font-style:italic}.datatable thead th.sortable{cursor:pointer;user-select:none;position:relative;transition:background-color .2s ease;padding-right:32px}.datatable thead th.sortable:hover{background-color:var(--mm-dropdown-hover)}.datatable thead th.sortable .sort-indicators{position:absolute;right:8px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;line-height:1}.datatable thead th.sortable .sort-indicators .sort-icon{font-size:16px;color:var(--mm-text-disabled);transition:color .2s ease}.datatable thead th.sortable .sort-indicators .sort-icon.active{color:var(--mm-primary-color)}.datatable thead th.sortable .sort-indicators .sort-asc{margin-bottom:-4px}.datatable thead th.sortable .sort-indicators .sort-desc{margin-top:-4px}.datatable .align-left{text-align:left}.datatable .align-center{text-align:center}.datatable .align-right{text-align:right}.datatable tbody tr{transition:background-color .2s ease;cursor:pointer}.datatable tbody tr:hover{background-color:var(--mm-dropdown-hover)}.datatable.striped tbody tr:nth-child(odd){background-color:var(--mm-dropdown-focus)}.datatable .selection-checkbox{width:40px;text-align:center;padding:0 8px !important}.datatable .selection-checkbox label{margin:0;height:100%;display:flex;align-items:center;justify-content:center}.datatable .selection-checkbox input[type=checkbox]{opacity:1;position:relative;left:auto;top:auto;transform:none;margin-right:0}.datatable tbody tr.selected{background-color:var(--mm-dropdown-selected) !important}.datatable tbody tr.selected:hover{background-color:var(--mm-dropdown-selected) !important;opacity:.9}.datatable.fixed-header thead th{position:sticky;top:0;background:var(--mm-card-background);z-index:10;box-shadow:0 2px 4px rgba(0,0,0,.1)}.datatable-pagination{margin-top:1rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem}.datatable-pagination .pagination-info{color:var(--mm-text-secondary);font-size:.9rem;flex:1;min-width:200px}.datatable-pagination .pagination-controls{display:flex;align-items:center;gap:.5rem}.datatable-pagination .pagination-controls button.btn-flat{min-width:40px;height:40px;padding:0;display:flex;align-items:center;justify-content:center;border-radius:50%;transition:background-color .2s ease}.datatable-pagination .pagination-controls button.btn-flat:hover:not(:disabled){background-color:var(--mm-dropdown-hover)}.datatable-pagination .pagination-controls button.btn-flat:disabled{color:var(--mm-text-disabled);cursor:not-allowed}.datatable-pagination .pagination-controls button.btn-flat i{font-size:20px}.datatable-pagination .pagination-controls .page-info{margin:0 .5rem;color:var(--mm-text-secondary);font-weight:500;white-space:nowrap}@media only screen and (max-width : 992px){.datatable-container .datatable-search{max-width:100%}.datatable-container .datatable-pagination{flex-direction:column;align-items:stretch;text-align:center}.datatable-container .datatable-pagination .pagination-info{order:2;margin-top:.5rem;text-align:center}.datatable-container .datatable-pagination .pagination-controls{order:1;justify-content:center}.datatable.responsive-table.mobile-hide-secondary th:nth-child(n+4),.datatable.responsive-table.mobile-hide-secondary td:nth-child(n+4){display:none}}@media only screen and (max-width : 992px)and (max-width : 600px){.datatable.responsive-table.mobile-stack thead{display:none}.datatable.responsive-table.mobile-stack tbody tr{display:block;border:1px solid var(--mm-border-color);margin-bottom:1rem;padding:1rem;border-radius:4px;background:var(--mm-card-background)}.datatable.responsive-table.mobile-stack tbody td{display:block;text-align:left !important;padding:.5rem 0;border:none}.datatable.responsive-table.mobile-stack tbody td::before{content:attr(data-label) \": \";font-weight:bold;color:var(--mm-text-secondary);display:inline-block;min-width:100px}}@media(prefers-color-scheme: dark){:root:not([data-theme]) .datatable-container .datatable thead th.sortable:hover,[data-theme=dark] .datatable-container .datatable thead th.sortable:hover{background-color:var(--mm-dropdown-hover)}:root:not([data-theme]) .datatable-container .datatable tbody tr:hover,[data-theme=dark] .datatable-container .datatable tbody tr:hover{background-color:var(--mm-dropdown-hover)}:root:not([data-theme]) .datatable-container .datatable.striped tbody tr:nth-child(odd),[data-theme=dark] .datatable-container .datatable.striped tbody tr:nth-child(odd){background-color:hsla(0,0%,100%,.05)}:root:not([data-theme]) .datatable-container .datatable.fixed-header thead th,[data-theme=dark] .datatable-container .datatable.fixed-header thead th{border-bottom:1px solid var(--mm-border-color)}}.virtual-table-container{position:relative;overflow-y:auto;overflow-x:hidden;border:1px solid var(--mm-border-color)}.virtual-table-container>table{position:sticky;top:0;z-index:10;background:var(--mm-card-background);box-shadow:0 2px 4px rgba(0,0,0,.1)}.virtual-table-container>table thead th{border-bottom:1px solid var(--mm-border-color)}.virtual-table-container .virtual-table-body{overflow:hidden}.virtual-table-container .virtual-table-body table tbody tr{height:48px;line-height:1.2}.virtual-table-container .virtual-table-body table tbody tr td{padding:8px 12px;vertical-align:middle}.virtual-table-container::-webkit-scrollbar{width:8px}.virtual-table-container::-webkit-scrollbar-track{background:var(--mm-dropdown-hover);border-radius:4px}.virtual-table-container::-webkit-scrollbar-thumb{background:var(--mm-text-disabled);border-radius:4px}.virtual-table-container::-webkit-scrollbar-thumb:hover{background:var(--mm-text-secondary)}.datatable{contain:layout style paint}.datatable.virtual-table{transform:translateZ(0);backface-visibility:hidden}.datatable tbody tr{transform:translateZ(0);will-change:transform}.datatable.fixed-layout{table-layout:fixed}.datatable.fixed-layout th,.datatable.fixed-layout td{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 1103:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataTablePage = void 0;
const tslib_1 = __webpack_require__(5959);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const mithril_materialized_1 = __webpack_require__(7578);
// Generate sample data
const generateUsers = (count) => {
    const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
    const names = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Brown', 'Charlie Wilson', 'Diana Prince', 'Eve Adams', 'Frank Miller'];
    return Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: names[i % names.length] + (i > names.length ? ` ${Math.floor(i / names.length) + 1}` : ''),
        email: `user${i + 1}@example.com`,
        age: Math.floor(Math.random() * 40) + 25,
        department: departments[Math.floor(Math.random() * departments.length)],
        salary: Math.floor(Math.random() * 100000) + 50000,
        active: Math.random() > 0.2,
        joinDate: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000 * 5)
    }));
};
const generateProducts = (count) => {
    const categories = ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys'];
    const productNames = ['Widget', 'Gadget', 'Device', 'Tool', 'Accessory', 'Component'];
    return Array.from({ length: count }, (_, i) => ({
        id: `PRD-${String(i + 1).padStart(4, '0')}`,
        name: `${productNames[i % productNames.length]} ${i + 1}`,
        category: categories[Math.floor(Math.random() * categories.length)],
        price: Math.round((Math.random() * 500 + 10) * 100) / 100,
        inStock: Math.random() > 0.3,
        rating: Math.round((Math.random() * 4 + 1) * 10) / 10,
        description: `Description for ${productNames[i % productNames.length]} ${i + 1}. This is a sample product description.`
    }));
};
const DataTablePage = () => ({
    oninit(vnode) {
        // Initialize data
        vnode.state.users = generateUsers(25);
        vnode.state.products = generateProducts(30);
        vnode.state.largeDataset = generateUsers(5000); // Large dataset for virtual scrolling demo
        // Initialize user table state
        vnode.state.userSort = { column: 'name', direction: 'asc' };
        vnode.state.userFilter = { searchTerm: '', columnFilters: {} };
        vnode.state.userPagination = { page: 0, pageSize: 10, total: 0 };
        vnode.state.userSelection = {
            mode: 'multiple',
            selectedKeys: [],
            getRowKey: (user) => String(user.id),
            onSelectionChange: (keys, users) => {
                vnode.state.userSelection.selectedKeys = keys;
                console.log('Selected users:', users);
                mithril_1.default.redraw();
            }
        };
        // Initialize product table state
        vnode.state.productSort = { column: 'price', direction: 'desc' };
        vnode.state.productFilter = { searchTerm: '', columnFilters: {} };
        vnode.state.productPagination = { page: 0, pageSize: 8, total: 0 };
        vnode.state.showVirtualScrolling = false;
        // Initialize large dataset pagination
        vnode.state.largeDatasetPagination = { page: 0, pageSize: 100, total: vnode.state.largeDataset.length };
    },
    view(vnode) {
        const { users, products, largeDataset, userSort, userFilter, userPagination, userSelection, productSort, productFilter, productPagination, showVirtualScrolling, largeDatasetPagination } = vnode.state;
        // User table columns
        const userColumns = [
            {
                key: 'id',
                title: 'ID',
                field: 'id',
                sortable: true,
                align: 'center',
                width: '80px'
            },
            {
                key: 'name',
                title: 'Name',
                field: 'name',
                sortable: true,
                filterable: true
            },
            {
                key: 'email',
                title: 'Email',
                field: 'email',
                sortable: true,
                filterable: true
            },
            {
                key: 'age',
                title: 'Age',
                field: 'age',
                sortable: true,
                align: 'center',
                width: '80px'
            },
            {
                key: 'department',
                title: 'Department',
                field: 'department',
                sortable: true,
                filterable: true
            },
            {
                key: 'salary',
                title: 'Salary',
                field: 'salary',
                sortable: true,
                align: 'right',
                render: (value) => `$${value.toLocaleString()}`
            },
            {
                key: 'status',
                title: 'Status',
                render: (value, user) => (0, mithril_1.default)('span', {
                    class: user.active ? 'green-text' : 'red-text',
                    style: 'font-weight: bold;'
                }, user.active ? 'Active' : 'Inactive')
            },
            {
                key: 'joinDate',
                title: 'Join Date',
                field: 'joinDate',
                sortable: true,
                render: (value) => value.toLocaleDateString()
            }
        ];
        // Product table columns
        const productColumns = [
            {
                key: 'id',
                title: 'Product ID',
                field: 'id',
                sortable: true,
                width: '120px'
            },
            {
                key: 'name',
                title: 'Product Name',
                field: 'name',
                sortable: true,
                filterable: true
            },
            {
                key: 'category',
                title: 'Category',
                field: 'category',
                sortable: true,
                filterable: true
            },
            {
                key: 'price',
                title: 'Price',
                field: 'price',
                sortable: true,
                align: 'right',
                render: (value) => `$${value.toFixed(2)}`
            },
            {
                key: 'stock',
                title: 'Stock',
                render: (value, product) => (0, mithril_1.default)('span', {
                    class: product.inStock ? 'green-text' : 'red-text'
                }, product.inStock ? 'In Stock' : 'Out of Stock')
            },
            {
                key: 'rating',
                title: 'Rating',
                field: 'rating',
                sortable: true,
                align: 'center',
                render: (value) => (0, mithril_1.default)('span', [
                    '★'.repeat(Math.floor(value)),
                    '☆'.repeat(5 - Math.floor(value)),
                    ` ${value}`
                ])
            }
        ];
        return (0, mithril_1.default)('.container', [
            // Page header
            (0, mithril_1.default)('.row', [
                (0, mithril_1.default)('.col.s12', [
                    (0, mithril_1.default)('h3', 'DataTable Component'),
                    (0, mithril_1.default)('p.grey-text', 'Advanced data table with sorting, filtering, pagination, selection, and virtual scrolling support.')
                ])
            ]),
            // Basic DataTable Example
            (0, mithril_1.default)('.row', [
                (0, mithril_1.default)('.col.s12', [
                    (0, mithril_1.default)('h5', 'Basic DataTable with Users'),
                    (0, mithril_1.default)('p', 'Features: sorting, filtering, pagination, row selection, and responsive design.'),
                    (0, mithril_1.default)('.card', [
                        (0, mithril_1.default)('.card-content', [
                            (0, mithril_1.default)('div', { style: 'margin-bottom: 1rem;' }, [
                                (0, mithril_1.default)('strong', `Selected: ${userSelection.selectedKeys.length} user(s)`)
                            ]),
                            (0, mithril_1.default)((0, mithril_materialized_1.DataTable)(), {
                                data: users,
                                columns: userColumns,
                                title: 'User Management Table',
                                striped: true,
                                hoverable: true,
                                responsive: true,
                                // Sorting
                                sort: userSort,
                                onSortChange: (sort) => {
                                    vnode.state.userSort = sort;
                                },
                                // Filtering
                                enableGlobalSearch: true,
                                searchPlaceholder: 'Search users...',
                                filter: userFilter,
                                onFilterChange: (filter) => {
                                    vnode.state.userFilter = filter;
                                },
                                // Pagination
                                pagination: userPagination,
                                onPaginationChange: (pagination) => {
                                    vnode.state.userPagination = pagination;
                                },
                                // Selection
                                selection: userSelection,
                                // Row events
                                onRowClick: (user) => {
                                    console.log('Clicked user:', user);
                                },
                                onRowDoubleClick: (user) => {
                                    console.log('Double-clicked user:', user);
                                },
                                // Custom row styling
                                getRowClassName: (user) => user.active ? '' : 'grey lighten-4'
                            })
                        ])
                    ])
                ])
            ]),
            // Product Table Example
            (0, mithril_1.default)('.row', [
                (0, mithril_1.default)('.col.s12', [
                    (0, mithril_1.default)('h5', 'Product Catalog Table'),
                    (0, mithril_1.default)('p', 'Different data types with custom rendering and styling.'),
                    (0, mithril_1.default)('.card', [
                        (0, mithril_1.default)('.card-content', [
                            (0, mithril_1.default)((0, mithril_materialized_1.DataTable)(), {
                                data: products,
                                columns: productColumns,
                                striped: true,
                                hoverable: true,
                                centered: true,
                                sort: productSort,
                                onSortChange: (sort) => {
                                    vnode.state.productSort = sort;
                                },
                                enableGlobalSearch: true,
                                filter: productFilter,
                                onFilterChange: (filter) => {
                                    vnode.state.productFilter = filter;
                                },
                                pagination: productPagination,
                                onPaginationChange: (pagination) => {
                                    vnode.state.productPagination = pagination;
                                }
                            })
                        ])
                    ])
                ])
            ]),
            // Virtual Scrolling Demo
            (0, mithril_1.default)('.row', [
                (0, mithril_1.default)('.col.s12', [
                    (0, mithril_1.default)('h5', 'Virtual Scrolling Performance Demo'),
                    (0, mithril_1.default)('p', 'Handling large datasets (5,000+ rows) efficiently with virtual scrolling.'),
                    (0, mithril_1.default)('.card', [
                        (0, mithril_1.default)('.card-content', [
                            (0, mithril_1.default)('div', { style: 'margin-bottom: 1rem;' }, [
                                (0, mithril_1.default)('label', [
                                    (0, mithril_1.default)('input[type="checkbox"]', {
                                        checked: showVirtualScrolling,
                                        onchange: (e) => {
                                            const target = e.target;
                                            vnode.state.showVirtualScrolling = target.checked;
                                        }
                                    }),
                                    (0, mithril_1.default)('span', 'Enable Virtual Scrolling (recommended for 5,000 rows)')
                                ])
                            ]),
                            (0, mithril_1.default)((0, mithril_materialized_1.DataTable)(), {
                                data: largeDataset,
                                columns: userColumns.slice(0, 5), // Fewer columns for performance
                                title: `Large Dataset (${largeDataset.length.toLocaleString()} rows)`,
                                striped: true,
                                hoverable: true,
                                // Virtual scrolling configuration
                                virtualScrolling: showVirtualScrolling,
                                height: '400px',
                                rowHeight: 48,
                                virtualBuffer: 10,
                                // Disable pagination for virtual scrolling demo, use larger page size when not using virtual scrolling
                                pagination: showVirtualScrolling ? undefined : largeDatasetPagination,
                                onPaginationChange: (pagination) => {
                                    vnode.state.largeDatasetPagination = pagination;
                                    console.log('Large dataset pagination changed:', pagination);
                                    mithril_1.default.redraw();
                                },
                                enableGlobalSearch: true,
                                emptyMessage: 'No data found'
                            })
                        ])
                    ])
                ])
            ]),
            // Code Examples
            (0, mithril_1.default)('.row', [
                (0, mithril_1.default)('.col.s12', [
                    (0, mithril_1.default)('h5', 'Usage Examples'),
                    (0, mithril_1.default)('.card', [
                        (0, mithril_1.default)('.card-content', [
                            (0, mithril_1.default)('h6', 'Basic Usage'),
                            (0, mithril_1.default)('pre', (0, mithril_1.default)('code', `
import { DataTable, DataTableColumn } from 'mithril-materialized';

const columns: DataTableColumn<User>[] = [
  { key: 'id', title: 'ID', field: 'id', sortable: true },
  { key: 'name', title: 'Name', field: 'name', sortable: true, filterable: true },
  { key: 'email', title: 'Email', field: 'email', sortable: true, filterable: true }
];

m(DataTable<User>(), {
  data: users,
  columns,
  striped: true,
  hoverable: true,
  enableGlobalSearch: true,
  pagination: { page: 0, pageSize: 10, total: users.length }
});
              `.trim())),
                            (0, mithril_1.default)('h6', 'With Virtual Scrolling'),
                            (0, mithril_1.default)('pre', (0, mithril_1.default)('code', `
m(DataTable<User>(), {
  data: largeDataset,
  columns,
  virtualScrolling: true,
  height: '400px',
  rowHeight: 48,
  virtualBuffer: 10
});
              `.trim())),
                            (0, mithril_1.default)('h6', 'With Row Selection'),
                            (0, mithril_1.default)('pre', (0, mithril_1.default)('code', `
const selection: DataTableSelection<User> = {
  mode: 'multiple',
  selectedKeys: [],
  getRowKey: (user) => String(user.id),
  onSelectionChange: (keys, users) => {
    console.log('Selected:', users);
  }
};

m(DataTable<User>(), {
  data: users,
  columns,
  selection
});
              `.trim()))
                        ])
                    ])
                ])
            ])
        ]);
    }
});
exports.DataTablePage = DataTablePage;


/***/ }),

/***/ 1437:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MiscPage = void 0;
const tslib_1 = __webpack_require__(5959);
const mithril_materialized_1 = __webpack_require__(7578);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const Vincent_van_Gogh___Landscape_at_twilight___Google_Art_Project_jpg_1 = tslib_1.__importDefault(__webpack_require__(6499));
const MiscPage = () => {
    const state = {
        selectedTabId: '',
        disabled: true,
        activeTab: 3,
        tabWidthId: 2,
        tabWidths: ['auto', 'fixed', 'fill'],
        showToast: false,
    };
    const curPage = () => (mithril_1.default.route.param('page') ? +mithril_1.default.route.param('page') : 1);
    return {
        view: () => (0, mithril_1.default)('.col.s12', [
            (0, mithril_1.default)('h2.header', 'Miscellaneous'),
            (0, mithril_1.default)('p', [
                'Some miscellaneous components, like ',
                (0, mithril_1.default)('a[href=https://materializecss.com/toasts.html][target=_blank]', 'Toast'),
                ', ',
                (0, mithril_1.default)('a[href=https://materializecss.com/tooltips.html][target=_blank]', 'Tooltip'),
                ', ',
                (0, mithril_1.default)('a[href=https://materializecss.com/pushpin.html][target=_blank]', 'Pushpin'),
                ', ',
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
            (0, mithril_1.default)('h3.header', 'Toast'),
            (0, mithril_1.default)('p', 'Toast provides brief feedback about an operation through a message at the bottom of the screen.'),
            (0, mithril_1.default)('.row', [
                (0, mithril_1.default)(mithril_materialized_1.Button, {
                    label: 'Show Basic Toast',
                    onclick: () => {
                        (0, mithril_materialized_1.toast)({ html: 'Hello World! This is a basic toast message.' });
                    },
                }),
                (0, mithril_1.default)(mithril_materialized_1.Button, {
                    label: 'Show Styled Toast',
                    onclick: () => {
                        (0, mithril_materialized_1.toast)({
                            html: '<span>Custom toast with HTML content!</span>',
                            classes: 'rounded orange darken-1',
                            displayLength: 6000,
                        });
                    },
                }),
                (0, mithril_1.default)(mithril_materialized_1.Button, {
                    label: 'Show Long Toast',
                    onclick: () => {
                        (0, mithril_materialized_1.toast)({
                            html: 'This toast will stay visible for 10 seconds and can be swiped to dismiss!',
                            displayLength: 10000,
                            completeCallback: () => console.log('Toast dismissed'),
                        });
                    },
                }),
            ]),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `// Basic toast
toast({ html: 'Hello World! This is a basic toast message.' });

// Styled toast with custom classes and duration
toast({
  html: '<span>Custom toast with HTML content!</span>',
  classes: 'rounded orange darken-1',
  displayLength: 6000,
});

// Toast with callback
toast({
  html: 'This toast can be swiped to dismiss!',
  displayLength: 10000,
  completeCallback: () => console.log('Toast dismissed'),
});`,
            }),
            (0, mithril_1.default)('h3.header', 'Tooltip'),
            (0, mithril_1.default)('p', 'Tooltips are small, interactive, textual hints for mainly graphical elements.'),
            (0, mithril_1.default)('.row', [
                (0, mithril_1.default)('p', [
                    (0, mithril_1.default)('a[href=#!].btn.tooltipped[data-position=top][data-tooltip=I am a tooltip]', {
                        oncreate: () => {
                            // Initialize tooltips after the element is created
                            setTimeout(() => (0, mithril_materialized_1.initTooltips)(), 100);
                        },
                    }, 'Hover me! (top)'),
                    ' ',
                    (0, mithril_1.default)('a[href=#!].btn.tooltipped[data-position=right][data-tooltip=I am a tooltip]', 'Hover me! (right)'),
                    ' ',
                    (0, mithril_1.default)('a[href=#!].btn.tooltipped[data-position=bottom][data-tooltip=I am a tooltip]', 'Hover me! (bottom)'),
                    ' ',
                    (0, mithril_1.default)('a[href=#!].btn.tooltipped[data-position=left][data-tooltip=I am a tooltip]', 'Hover me! (left)'),
                ]),
            ]),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `// HTML with data attributes
m('a[href=#!].btn.tooltipped[data-position=top][data-tooltip=I am a tooltip]', 'Hover me!')

// Initialize tooltips
oncreate: () => {
  initTooltips(); // Initialize all tooltips on elements with .tooltipped class
}

// Or initialize specific elements
initTooltips('.my-tooltips', { 
  position: 'top',
  enterDelay: 500 
});`,
            }),
            (0, mithril_1.default)('h3.header', 'Pushpin'),
            (0, mithril_1.default)('p', 'Pushpin is a fixed positioning plugin. Pin elements to the top of the page when they scroll past them.'),
            (0, mithril_1.default)('p.grey-text.text-darken-2', '⚠️ Note: The pushpin element below will pin to the navbar when you scroll past it. This is normal behavior for the demo.'),
            (0, mithril_1.default)('.row', [
                (0, mithril_1.default)('.col.s12', [
                    (0, mithril_1.default)('div', {
                        style: 'height: 100px; background: #f9f9f9; padding: 15px; margin: 15px 0; border-left: 4px solid #ddd;',
                    }, [
                        (0, mithril_1.default)('p', { style: 'margin: 0; font-size: 0.9em; color: #666;' }, 'Content before the pinned element. The small blue element below will demonstrate pushpin behavior.'),
                    ]),
                    (0, mithril_1.default)('.chip.pushpin-element', {
                        style: 'background-color: #e3f2fd; border: 1px solid #2196f3; display: inline-block; padding: 8px 12px; margin: 10px 0; font-size: 0.85em;',
                        oncreate: (vnode) => {
                            // Initialize pushpin on this element
                            setTimeout(() => {
                                (0, mithril_materialized_1.initPushpins)('.pushpin-element', {
                                    top: 64, // Account for navbar height
                                    bottom: Infinity,
                                    onPositionChange: (position) => {
                                        console.log('Pushpin position:', position);
                                        // Update the element text to show current state
                                        const el = document.querySelector('.pushpin-element');
                                        if (el) {
                                            el.textContent = `Pushpin: ${position}`;
                                        }
                                    },
                                });
                            }, 100);
                        },
                    }, 'Pushpin: pin-top'),
                    (0, mithril_1.default)('div', {
                        style: 'height: 400px; background: #f9f9f9; padding: 15px; margin: 15px 0; border-left: 4px solid #ddd;',
                    }, [
                        (0, mithril_1.default)('p', { style: 'margin: 0 0 10px 0; font-size: 0.9em; color: #666;' }, 'Content after the pinned element...'),
                        (0, mithril_1.default)('p', { style: 'margin: 0 0 10px 0; font-size: 0.9em; color: #666;' }, 'The small blue chip above should now be pinned to the top navigation.'),
                        (0, mithril_1.default)('p', { style: 'margin: 0 0 10px 0; font-size: 0.9em; color: #666;' }, 'Continue scrolling to see more components below.'),
                        (0, mithril_1.default)('p', { style: 'margin: 0; font-size: 0.85em; color: #999;' }, 'This demonstrates how pushpin works without being visually disruptive.'),
                    ]),
                ]),
            ]),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `// HTML
m('.pushpin-element', 'This element will be pinned when you scroll!')

// Initialize pushpin
oncreate: (vnode) => {
  initPushpins('.pushpin-element', {
    top: 100,        // Distance from top when element becomes fixed
    bottom: 400,     // Distance from bottom where element stops being fixed
    onPositionChange: (position) => {
      console.log('Pushpin position:', position); // 'pin-top', 'pinned', or 'pin-bottom'
    },
  });
}`,
            }),
            (0, mithril_1.default)('h3.header', 'Tabs'),
            (0, mithril_1.default)(mithril_materialized_1.Tabs, {
                selectedTabId: state.selectedTabId,
                tabWidth: state.tabWidths[state.tabWidthId % 3],
                onShow: console.log,
                onTabChange: (tabId) => {
                    console.log('Tab changed to:', tabId);
                    state.selectedTabId = tabId;
                },
                tabs: [
                    {
                        title: 'Test 1',
                        id: 'test1',
                        vnode: (0, mithril_1.default)('div', [
                            (0, mithril_1.default)('h4', 'Content for Test 1'),
                            (0, mithril_1.default)('p', 'This is the content for the first tab. Click on other tabs to see them in action!'),
                        ]),
                    },
                    {
                        title: 'Test 2',
                        id: 'test2',
                        disabled: state.disabled,
                        vnode: (0, mithril_1.default)('div', [
                            (0, mithril_1.default)('h4', 'Content for Test 2'),
                            (0, mithril_1.default)('p', 'This is the content for the second tab. You can disable/enable this tab with the button below.'),
                        ]),
                    },
                    {
                        title: 'Test 3',
                        id: 'test3',
                        vnode: (0, mithril_1.default)('div', [
                            (0, mithril_1.default)('h4', 'Content for Test 3'),
                            (0, mithril_1.default)('p', 'This is the content for the third tab. Notice how the active indicator moves when you click tabs.'),
                        ]),
                    },
                    {
                        title: 'Test 4',
                        id: 'test4',
                        vnode: (0, mithril_1.default)('div', [
                            (0, mithril_1.default)('h4', 'Content for Test 4'),
                            (0, mithril_1.default)('p', 'This is the content for the fourth tab. The tabs now properly handle clicking and content switching.'),
                        ]),
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
                    state.selectedTabId = 'test1';
                },
            }),
            (0, mithril_1.default)(mithril_materialized_1.Button, {
                label: 'Switch to tab 4',
                onclick: () => {
                    state.selectedTabId = 'test4';
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
                onclick: () => {
                    state.tabWidthId++;
                },
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



var hyperscript = __webpack_require__(3846)

hyperscript.trust = __webpack_require__(193)
hyperscript.fragment = __webpack_require__(3731)

module.exports = hyperscript


/***/ }),

/***/ 1757:
/***/ ((module) => {



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
        modal4Open: false,
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
                },
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
                },
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
                        dropdownAttributes: { container: document.body }, // So the select is not hidden
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
                          dropdownAttributes: { container: document.body }, // So the select is not hidden
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
                        } as SelectAttrs),
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
                        } as DropdownAttrs),
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
                },
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
                },
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
                },
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


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PickerPage = void 0;
const tslib_1 = __webpack_require__(5959);
const mithril_materialized_1 = __webpack_require__(7578);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const PickerPage = () => {
    const state = { disabled: false };
    const onchange = (v) => console.log(`onchange fired. New value: ${v}`);
    const oninput = (v) => console.log(`oninput fired. New value: ${v}`);
    return {
        view: () => (0, mithril_1.default)('.col.s12', [
            (0, mithril_1.default)('h2.header', 'Pickers'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.Switch, {
                label: 'Disable pickers',
                left: 'enable',
                right: 'disable',
                onchange: (v) => (state.disabled = v),
            })),
            (0, mithril_1.default)('h3.header', 'DatePicker - Enhanced with custom text input and display formats'),
            // Basic date picker
            (0, mithril_1.default)('h4', 'Basic Date Picker (ISO format - YYYY-MM-DD)'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.DatePicker, {
                disabled: state.disabled,
                dateLabel: 'What is your birthday?',
                helperText: 'Enter date in YYYY-MM-DD format or click to select',
                iconName: 'cake',
                displayFormat: 'yyyy-mm-dd',
                initialValue: '1990-01-15',
                oninput,
                onchange,
                showWeekNumbers: true,
                weekNumbering: 'iso',
            })),
            // New Materialize CSS style DatePicker with format attribute
            (0, mithril_1.default)('h4', 'New DatePicker with format attribute'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.DatePicker, {
                disabled: state.disabled,
                label: 'What is your birthday?',
                helperText: 'Uses the new format attribute',
                iconName: 'cake',
                format: 'mmmm d, yyyy',
                yearrange: '1970,2045',
                initialValue: '1990-01-15', // Add initial value so date displays
                showClearBtn: true,
                autoClose: true,
                i18n: {
                    done: 'Ok',
                    clear: 'Clear',
                    cancel: 'Cancel',
                },
                onchange: (value) => {
                    console.log('New DatePicker selected:', value);
                    onchange(value);
                },
            })),
            // European format (dd/mm/yyyy)
            (0, mithril_1.default)('h4', 'European Format (DD/MM/YYYY)'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.DatePicker, {
                disabled: state.disabled,
                dateLabel: 'Project Start Date',
                helperText: 'Type in DD/MM/YYYY format (e.g., 25/12/2024)',
                displayFormat: 'dd/mm/yyyy',
                iconName: 'event',
                initialValue: '2024-03-15',
                oninput,
                onchange,
            })),
            // US format (mm/dd/yyyy)
            (0, mithril_1.default)('h4', 'US Format (MM/DD/YYYY)'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.DatePicker, {
                disabled: state.disabled,
                dateLabel: 'Appointment Date',
                helperText: 'Type in MM/DD/YYYY format (e.g., 12/25/2024)',
                displayFormat: 'mm/dd/yyyy',
                iconName: 'schedule',
                initialValue: '2024-07-04',
                oninput,
                onchange,
            })),
            // Multilingual example (German-like)
            (0, mithril_1.default)('h4', 'Multilingual Example (German-style)'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.DatePicker, {
                disabled: state.disabled,
                dateLabel: 'Geburtsdatum',
                helperText: 'Format: TT.MM.JJJJ (z.B., 25.12.2024)',
                displayFormat: 'dd.mm.yyyy',
                iconName: 'person',
                initialValue: '1985-11-09',
                showClearBtn: true,
                i18n: {
                    cancel: 'Abbrechen',
                    clear: 'Löschen',
                    done: 'Fertig',
                    previousMonth: '‹',
                    nextMonth: '›',
                    months: [
                        'Januar',
                        'Februar',
                        'März',
                        'April',
                        'Mai',
                        'Juni',
                        'Juli',
                        'August',
                        'September',
                        'Oktober',
                        'November',
                        'Dezember',
                    ],
                    monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
                    weekdays: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
                    weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
                    weekdaysAbbrev: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
                },
                oninput,
                onchange,
            })),
            // Minimal example (only clear button)
            (0, mithril_1.default)('h4', 'Minimal (Clear only)'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.DatePicker, {
                disabled: state.disabled,
                dateLabel: 'Optional Date',
                showTodayBtn: false,
                showClearBtn: true,
                clearLabel: 'Remove',
                initialValue: '2024-01-01',
                onchange,
            })),
            // Disabled and Readonly examples
            (0, mithril_1.default)('h4', 'Disabled and Readonly Examples'),
            (0, mithril_1.default)('.row', [
                (0, mithril_1.default)(mithril_materialized_1.DatePicker, {
                    class: 'col s6',
                    disabled: true,
                    dateLabel: 'Disabled Date',
                    helperText: 'Cannot interact',
                    initialValue: '2024-01-15',
                    iconName: 'block',
                    onchange,
                }),
                (0, mithril_1.default)(mithril_materialized_1.DatePicker, {
                    class: 'col s6',
                    readonly: true,
                    dateLabel: 'Readonly Date',
                    helperText: 'View only',
                    initialValue: '2024-12-25',
                    iconName: 'visibility',
                    onchange,
                }),
            ]),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `// Basic usage with custom text input and display formats
m(DatePicker, {
  dateLabel: 'What is your birthday?',
  helperText: 'Enter date in YYYY-MM-DD format',
  iconName: 'cake',
  displayFormat: 'yyyy-mm-dd', // Supports various formats
  initialValue: '1990-01-15',
  oninput: (v) => console.log('Input:', v), // Fires on typing
  onchange: (v) => console.log('Change:', v), // Fires on blur
})

// European format with custom text input
m(DatePicker, {
  dateLabel: 'Geburtsdatum',
  displayFormat: 'dd.mm.yyyy', // User types DD.MM.YYYY
  todayLabel: 'Heute',
  clearLabel: 'Löschen',
  helperText: 'Format: TT.MM.JJJJ',
  onchange,
})

// US format with validation
m(DatePicker, {
  dateLabel: 'Appointment Date',
  displayFormat: 'mm/dd/yyyy', // User types MM/DD/YYYY
  helperText: 'Type in MM/DD/YYYY format',
  onchange, // Always returns ISO format internally
})

// Supported display formats:
// - 'yyyy-mm-dd' (ISO format)
// - 'dd/mm/yyyy' (European)
// - 'mm/dd/yyyy' (US)
// - 'dd.mm.yyyy' (German-style)
// - 'dd-mm-yyyy' (Alternative format)`,
            }),
            (0, mithril_1.default)('h3.header', 'TimePicker - Enhanced with i18n support'),
            // Basic time picker (24h format)
            (0, mithril_1.default)('h4', 'Basic Time Picker (24h format)'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.TimePicker, {
                disabled: state.disabled,
                label: 'When do you normally get up?',
                helperText: 'Select your wake-up time',
                iconName: 'alarm',
                initialValue: '09:00',
                onchange,
            })),
            // 12-hour format
            (0, mithril_1.default)('h4', '12-Hour Format'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.TimePicker, {
                disabled: state.disabled,
                label: 'Appointment Time',
                helperText: 'HH:MM AM/PM format',
                twelveHour: true,
                iconName: 'schedule',
                initialValue: '13:30',
                onchange,
            })),
            // Inline time picker (no modal)
            (0, mithril_1.default)('h4', 'Inline Time Picker (No Modal)'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.TimePicker, {
                disabled: state.disabled,
                label: 'Meeting Time',
                helperText: 'Use arrow buttons to adjust',
                useModal: false,
                allowFormatToggle: true,
                twelveHour: false,
                iconName: 'access_time',
                oninput: oninput,
                onchange,
            })),
            // Modal time picker with format toggle
            (0, mithril_1.default)('h4', 'Modal Time Picker with Format Toggle'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.TimePicker, {
                disabled: state.disabled,
                label: 'Appointment Time',
                helperText: 'Click to open modal',
                useModal: true,
                allowFormatToggle: true,
                twelveHour: false,
                iconName: 'event',
                oninput: oninput,
                onchange,
            })),
            // Multilingual example (German-like)
            (0, mithril_1.default)('h4', 'Multilingual Example (German-style)'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.TimePicker, {
                disabled: state.disabled,
                label: 'Startzeit',
                helperText: 'Wählen Sie eine Zeit',
                nowLabel: 'Jetzt',
                clearLabel: 'Löschen',
                closeLabel: 'Schließen',
                amLabel: 'VM',
                pmLabel: 'NM',
                iconName: 'schedule',
                showNowBtn: true,
                showClearBtn: true,
                onchange,
            })),
            // Minimal example (clear only)
            (0, mithril_1.default)('h4', 'Minimal (Clear only)'),
            (0, mithril_1.default)('.row', (0, mithril_1.default)(mithril_materialized_1.TimePicker, {
                disabled: state.disabled,
                label: 'Optional Time',
                showNowBtn: false,
                showClearBtn: true,
                clearLabel: 'Remove',
                onchange,
            })),
            // Disabled and Readonly examples for TimePicker
            (0, mithril_1.default)('h4', 'Disabled and Readonly Time Examples'),
            (0, mithril_1.default)('.row', [
                (0, mithril_1.default)(mithril_materialized_1.TimePicker, {
                    class: 'col s6',
                    disabled: true,
                    label: 'Disabled Time',
                    helperText: 'Cannot interact',
                    initialValue: '15:30',
                    iconName: 'block',
                    onchange,
                }),
                (0, mithril_1.default)(mithril_materialized_1.TimePicker, {
                    class: 'col s6',
                    readonly: true,
                    label: 'Readonly Time',
                    helperText: 'View only',
                    initialValue: '09:15',
                    iconName: 'visibility',
                    useModal: false,
                    onchange,
                }),
            ]),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `// Inline time picker (no modal) - direct time input
m(TimePicker, {
  label: 'Meeting Time',
  useModal: false, // Shows HTML5 time input
  allowFormatToggle: true,
  oninput: (v) => console.log('Input:', v), // Fires on every change
  onchange: (v) => console.log('Change:', v), // Fires on blur
})

// Modal time picker with format toggle
m(TimePicker, {
  label: 'Appointment Time',
  useModal: true, // Default - shows modal
  allowFormatToggle: true,
  oninput: oninput,
  onchange,
})

// Disabled/readonly examples
m(TimePicker, {
  disabled: true, // or readonly: true
  label: 'Disabled Time',
  initialValue: '14:30',
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


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InputPage = void 0;
const tslib_1 = __webpack_require__(5959);
const mithril_materialized_1 = __webpack_require__(7578);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const InputPage = () => {
    const oninput = (v) => console.log(`Input changed. New value: ${v}`);
    const onchange = (v) => console.log(`Final value: ${v}`);
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
                oninput,
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
        } as InputAttrs)`,
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
        } as InputAttrs)`,
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
          } as InputAttrs)`,
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
        } as InputAttrs)`,
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
                    { title: 'Mary', onclick: console.log, href: '/home' },
                    { title: 'Pete', onclick: console.log, href: 'https://www.google.com' },
                ],
            }),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `          m(Collection, {
            header: 'First names',
            mode: CollectionMode.LINKS,
            items: [
              { title: 'John', onclick: console.log },
              { title: 'Mary', onclick: console.log, href: '/home' },
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



var mountRedraw = __webpack_require__(4159)

module.exports = __webpack_require__(7589)(typeof window !== "undefined" ? window : null, mountRedraw.redraw)


/***/ }),

/***/ 4159:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var render = __webpack_require__(5376)

module.exports = __webpack_require__(8010)(render, typeof requestAnimationFrame !== "undefined" ? requestAnimationFrame : null, typeof console !== "undefined" ? console : null)


/***/ }),

/***/ 4404:
/***/ ((module) => {



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



module.exports = __webpack_require__(7379)(typeof window !== "undefined" ? window : null)


/***/ }),

/***/ 5531:
/***/ ((module) => {

// This exists so I'm only saving it once.


module.exports = {}.hasOwnProperty


/***/ }),

/***/ 5584:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Layout = void 0;
const tslib_1 = __webpack_require__(5959);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const dashboard_service_1 = __webpack_require__(9618);
const mithril_materialized_1 = __webpack_require__(7578);
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
            (0, mithril_1.default)('ul.right', [
                ...dashboard_service_1.dashboardSvc
                    .getList()
                    .filter((d) => d.visible)
                    .map((d) => (0, mithril_1.default)(`li${isActive(d.route)}`, (0, mithril_1.default)(mithril_1.default.route.Link, { href: d.route }, d.icon ? (0, mithril_1.default)('i.material-icons', d.icon) : d.title))),
                (0, mithril_1.default)('li', (0, mithril_1.default)(mithril_materialized_1.ThemeToggle, { className: 'white-text' })),
            ]),
        ])),
        (0, mithril_1.default)('.container', (0, mithril_1.default)('.row', vnode.children)),
    ]),
});
exports.Layout = Layout;


/***/ }),

/***/ 5603:
/***/ ((module) => {



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

/***/ 6323:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ThemePage = void 0;
const tslib_1 = __webpack_require__(5959);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const mithril_materialized_1 = __webpack_require__(7578);
const ThemePage = () => {
    const state = {
        uploadedFiles: [],
        currentTheme: 'auto',
    };
    return {
        view: () => (0, mithril_1.default)('.col.s12', [
            (0, mithril_1.default)('h2.header', 'Theme & File Upload'),
            (0, mithril_1.default)('p', [
                'New components for theme switching and file uploads with drag-and-drop support. ',
                'The theme switcher allows users to choose between light, dark, and auto (system preference) themes.',
            ]),
            (0, mithril_1.default)('h3.header', 'Theme Switcher'),
            (0, mithril_1.default)('p', 'Full theme switcher with light/dark/auto options:'),
            (0, mithril_1.default)('.row', [
                (0, mithril_1.default)('.col.s12.m6', [
                    (0, mithril_1.default)(mithril_materialized_1.ThemeSwitcher, {
                        theme: state.currentTheme,
                        showLabels: true,
                        onThemeChange: (theme) => {
                            state.currentTheme = theme;
                            console.log('Theme changed to:', theme);
                        },
                    }),
                ]),
            ]),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `import { ThemeSwitcher } from 'mithril-materialized';

m(ThemeSwitcher, {
  theme: 'auto', // 'light' | 'dark' | 'auto'
  showLabels: true,
  onThemeChange: (theme) => {
    console.log('Theme changed to:', theme);
  },
})`,
            }),
            (0, mithril_1.default)('h3.header', 'Theme Toggle'),
            (0, mithril_1.default)('p', 'Simple toggle button that switches between light and dark themes:'),
            (0, mithril_1.default)('.row', [
                (0, mithril_1.default)('.col.s12.m6', [
                    (0, mithril_1.default)('p', 'Theme toggle button: '),
                    (0, mithril_1.default)(mithril_materialized_1.ThemeToggle, {
                        className: 'left',
                    }),
                    (0, mithril_1.default)('.clearfix', { style: 'clear: both; height: 20px;' }),
                ]),
            ]),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `import { ThemeToggle } from 'mithril-materialized';

m(ThemeToggle, {
  className: 'left', // Optional CSS classes
})`,
            }),
            (0, mithril_1.default)('h3.header', 'File Upload'),
            (0, mithril_1.default)('p', 'Drag-and-drop file upload with image preview, file validation, and progress tracking:'),
            (0, mithril_1.default)('.row', [
                (0, mithril_1.default)('.col.s12', [
                    (0, mithril_1.default)(mithril_materialized_1.FileUpload, {
                        accept: 'image/*,.pdf,.doc,.docx',
                        multiple: true,
                        maxSize: 5 * 1024 * 1024, // 5MB
                        maxFiles: 3,
                        showPreview: true,
                        label: 'Drag files here or click to browse',
                        helperText: 'Upload up to 3 files (images, PDFs, or documents)',
                        onFilesSelected: (files) => {
                            state.uploadedFiles = files;
                            console.log('Files selected:', files);
                        },
                        onFileRemoved: (file) => {
                            console.log('File removed:', file.name);
                        },
                    }),
                ]),
            ]),
            state.uploadedFiles.length > 0 && (0, mithril_1.default)('.row', [
                (0, mithril_1.default)('.col.s12', [
                    (0, mithril_1.default)('h5', 'Uploaded Files:'),
                    (0, mithril_1.default)('ul.collection', state.uploadedFiles.map(file => (0, mithril_1.default)('li.collection-item', [
                        (0, mithril_1.default)('span.title', file.name),
                        (0, mithril_1.default)('p', [
                            'Size: ', (file.size / 1024).toFixed(1), ' KB',
                            file.type && (0, mithril_1.default)('br'),
                            file.type && ['Type: ', file.type],
                        ]),
                    ]))),
                ]),
            ]),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `import { FileUpload } from 'mithril-materialized';

m(FileUpload, {
  accept: 'image/*,.pdf,.doc,.docx', // Accepted file types
  multiple: true,                    // Allow multiple files
  maxSize: 5 * 1024 * 1024,         // 5MB max size
  maxFiles: 3,                      // Max 3 files
  showPreview: true,                // Show image previews
  label: 'Drag files here or click to browse',
  helperText: 'Upload up to 3 files (images, PDFs, or documents)',
  
  // Callbacks
  onFilesSelected: (files) => {
    console.log('Files selected:', files);
  },
  onFileRemoved: (file) => {
    console.log('File removed:', file.name);
  },
  onProgress: (progress, file) => {
    console.log(\`Upload progress: \${progress}% for \${file.name}\`);
  },
})`,
            }),
            (0, mithril_1.default)('h3.header', 'Features'),
            (0, mithril_1.default)('ul.collection', [
                (0, mithril_1.default)('li.collection-item', [
                    (0, mithril_1.default)('strong', 'Theme System'),
                    (0, mithril_1.default)('ul', [
                        (0, mithril_1.default)('li', 'CSS custom properties for runtime theme switching'),
                        (0, mithril_1.default)('li', 'Light, dark, and auto (system preference) themes'),
                        (0, mithril_1.default)('li', 'localStorage persistence of theme choice'),
                        (0, mithril_1.default)('li', 'Programmatic theme control via ThemeManager class'),
                    ]),
                ]),
                (0, mithril_1.default)('li.collection-item', [
                    (0, mithril_1.default)('strong', 'File Upload'),
                    (0, mithril_1.default)('ul', [
                        (0, mithril_1.default)('li', 'Drag-and-drop file handling with visual feedback'),
                        (0, mithril_1.default)('li', 'File type and size validation'),
                        (0, mithril_1.default)('li', 'Image preview generation'),
                        (0, mithril_1.default)('li', 'Progress tracking and error handling'),
                        (0, mithril_1.default)('li', 'Multiple file support with configurable limits'),
                        (0, mithril_1.default)('li', 'Responsive design'),
                    ]),
                ]),
            ]),
            (0, mithril_1.default)('h3.header', 'CSS Custom Properties'),
            (0, mithril_1.default)('p', 'The theme system uses CSS custom properties that can be customized:'),
            (0, mithril_1.default)(mithril_materialized_1.CodeBlock, {
                code: `:root {
  --mm-primary-color: #26a69a;
  --mm-background-color: #ffffff;
  --mm-text-primary: rgba(0, 0, 0, 0.87);
  --mm-border-color: rgba(0, 0, 0, 0.12);
  /* ... and many more */
}

[data-theme="dark"] {
  --mm-primary-color: #80cbc4;
  --mm-background-color: #121212;
  --mm-text-primary: rgba(255, 255, 255, 0.87);
  --mm-border-color: rgba(255, 255, 255, 0.12);
  /* ... dark theme overrides */
}`,
            }),
        ]),
    };
};
exports.ThemePage = ThemePage;


/***/ }),

/***/ 6427:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "4d73cb90e394b34b7670.woff";

/***/ }),

/***/ 6499:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "0f170ea0ecc81d3b9ccc.jpg";

/***/ }),

/***/ 6539:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



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
                        // img: 'https://loremflickr.com/320/240?random=1',
                        label: 'Watching movies',
                        title: 'Sitting for the TV, doing nothing',
                    },
                    {
                        id: 'out',
                        // img: 'https://loremflickr.com/320/240?random=2',
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
            } as SelectAttrs<number>)
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
            } as SelectAttrs<number>)
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

/***/ 7578:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var m = __webpack_require__(7406);

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

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

// Utility functions for the library
/**
 * Create a unique ID
 * @see https://stackoverflow.com/a/2117523/319711
 *
 * @returns id followed by 8 hexadecimal characters.
 */
const uniqueId = () => {
    // tslint:disable-next-line:no-bitwise
    return 'idxxxxxxxx'.replace(/[x]/g, () => ((Math.random() * 16) | 0).toString(16));
};
/**
 * Create a GUID
 * @see https://stackoverflow.com/a/2117523/319711
 *
 * @returns RFC4122 version 4 compliant GUID
 */
const uuid4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        // tslint:disable-next-line:no-bitwise
        const r = (Math.random() * 16) | 0;
        // tslint:disable-next-line:no-bitwise
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
};
/** Check if a string or number is numeric. @see https://stackoverflow.com/a/9716488/319711 */
const isNumeric = (n) => !isNaN(parseFloat(n)) && isFinite(n);
/**
 * Pad left, default width 2 with a '0'
 *
 * @see http://stackoverflow.com/a/10073788/319711
 * @param {(string | number)} n
 * @param {number} [width=2]
 * @param {string} [z='0']
 * @returns
 */
const padLeft = (n, width = 2, z = '0') => String(n).padStart(width, z);
// Keep only essential dropdown positioning styles
const getDropdownStyles = (inputRef, overlap = false, options, isDropDown = false) => {
    if (!inputRef) {
        return {
            display: 'block',
            opacity: 1,
            position: 'absolute',
            top: overlap ? 0 : '100%',
            left: '0',
            zIndex: 1000,
            width: '100%',
        };
    }
    const rect = inputRef.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    // Calculate dropdown height based on options
    let estimatedHeight = 200; // Default fallback
    const itemHeight = 52; // Standard height for dropdown items
    if (options) {
        const groupHeaderHeight = 52; // Height for group headers
        // Count groups and total options
        const groups = new Set();
        let totalOptions = 0;
        options
            .filter((o) => !o.divider)
            .forEach((option) => {
            totalOptions++;
            if (option.group) {
                groups.add(option.group);
            }
        });
        // Calculate total height: options + group headers + padding
        estimatedHeight = totalOptions * itemHeight + groups.size * groupHeaderHeight;
    }
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;
    // If there's not enough space below and more space above, position dropdown above
    const shouldPositionAbove = spaceBelow < estimatedHeight && spaceAbove > spaceBelow;
    // Calculate available space and whether scrolling is needed
    const availableSpace = shouldPositionAbove ? spaceAbove : spaceBelow;
    // When positioning above, we need to consider the actual space from viewport top to input
    let effectiveAvailableSpace = availableSpace;
    if (shouldPositionAbove) {
        effectiveAvailableSpace = rect.top - 10; // Space from viewport top to input, minus margin
    }
    const needsScrolling = estimatedHeight > effectiveAvailableSpace;
    // Calculate the actual height the dropdown will take
    const actualHeight = needsScrolling ? effectiveAvailableSpace : estimatedHeight;
    // Calculate positioning when dropdown should appear above
    let topOffset;
    if (shouldPositionAbove) {
        // Calculate how much space we actually have from top of viewport to top of input
        const availableSpaceFromViewportTop = rect.top;
        // If dropdown fits comfortably above input, use normal positioning
        if (actualHeight <= availableSpaceFromViewportTop) {
            topOffset = 12 - actualHeight + (isDropDown ? itemHeight : 0); // Bottom of dropdown aligns with top of input
        }
        else {
            // If dropdown is too tall, position it at the very top of viewport
            // This makes the dropdown use all available space from viewport top to input top
            topOffset = -availableSpaceFromViewportTop + 5; // 5px margin from viewport top
        }
    }
    else {
        topOffset = overlap ? 0 : '100%';
    }
    const styles = {
        display: 'block',
        opacity: 1,
        position: 'absolute',
        top: typeof topOffset === 'number' ? `${topOffset}px` : topOffset,
        left: '0',
        zIndex: 1000,
        width: `${rect.width}px`,
    };
    // Only add scrolling constraints when necessary
    if (needsScrolling) {
        styles.maxHeight = `${actualHeight}px`;
        styles.overflowY = 'auto';
    }
    return styles;
};
/**
 * Generate a range of numbers from a to and including b, i.e. [a, b]
 * @example: console.log(range(5, 10)); // [5, 6, 7, 8, 9, 10]
 */
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);

// import './styles/input.css';
const Mandatory = { view: ({ attrs }) => m('span.mandatory', attrs, '*') };
/** Simple label element, used for most components. */
const Label = () => {
    return {
        view: (_a) => {
            var _b = _a.attrs, { label, id, isMandatory, isActive, className, initialValue } = _b, params = __rest(_b, ["label", "id", "isMandatory", "isActive", "className", "initialValue"]);
            return label
                ? m('label', Object.assign(Object.assign({}, params), { className: [className, isActive ? 'active' : ''].filter(Boolean).join(' ').trim() || undefined, for: id, oncreate: ({ dom }) => {
                        if (!initialValue)
                            return;
                        const labelEl = dom;
                        labelEl.classList.add('active');
                    } }), [m.trust(label), isMandatory ? m(Mandatory) : undefined])
                : undefined;
        },
    };
};
/** Create a helper text, often used for displaying a small help text. May be replaced by the validation message. */
const HelperText = () => {
    return {
        view: ({ attrs: { helperText, dataError, dataSuccess, className } }) => {
            return helperText || dataError || dataSuccess
                ? m('span.helper-text.left', { className, 'data-error': dataError, 'data-success': dataSuccess }, dataError ? m.trust(dataError) : dataSuccess ? m.trust(dataSuccess) : helperText ? m.trust(helperText) : '')
                : undefined;
        },
    };
};

/** Component to auto complete your text input - Pure Mithril implementation */
const Autocomplete = () => {
    const state = {
        id: uniqueId(),
        isActive: false,
        inputValue: '',
        isOpen: false,
        suggestions: [],
        selectedIndex: -1,
        inputElement: null,
    };
    const filterSuggestions = (input, data, limit, minLength) => {
        if (!input || input.length < minLength) {
            return [];
        }
        const filtered = Object.entries(data || {})
            .filter(([key]) => key.toLowerCase().includes(input.toLowerCase()))
            .map(([key, value]) => ({ key, value }))
            .slice(0, limit);
        return filtered;
    };
    const selectSuggestion = (suggestion, attrs) => {
        state.inputValue = suggestion.key;
        state.isOpen = false;
        state.selectedIndex = -1;
        if (attrs.onchange) {
            attrs.onchange(suggestion.key);
        }
        if (attrs.onAutocomplete) {
            attrs.onAutocomplete(suggestion.key);
        }
        // Force redraw to update label state
        m.redraw();
    };
    const handleKeydown = (e, attrs) => {
        if (!state.isOpen)
            return;
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                state.selectedIndex = Math.min(state.selectedIndex + 1, state.suggestions.length - 1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                state.selectedIndex = Math.max(state.selectedIndex - 1, -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (state.selectedIndex >= 0 && state.suggestions[state.selectedIndex]) {
                    state.isOpen = false;
                    selectSuggestion(state.suggestions[state.selectedIndex], attrs);
                }
                break;
            case 'Escape':
                e.preventDefault();
                state.isOpen = false;
                state.selectedIndex = -1;
                break;
        }
    };
    const closeDropdown = (e) => {
        const target = e.target;
        const autocompleteWrapper = target.closest('.autocomplete-wrapper');
        const dropdownContent = target.closest('.autocomplete-content');
        // Close if clicking outside both the input wrapper and dropdown content
        if (!autocompleteWrapper && !dropdownContent) {
            state.isOpen = false;
            state.selectedIndex = -1;
        }
    };
    const getDropdownStyles = () => {
        if (!state.inputElement) {
            return {
                display: 'block',
                width: '100%',
                height: `${state.suggestions.length * 50}px`,
                transformOrigin: '0px 0px',
                opacity: state.isOpen ? 1 : 0,
                transform: 'scaleX(1) scaleY(1)',
            };
        }
        const rect = state.inputElement.getBoundingClientRect();
        const inputWidth = rect.width;
        return {
            display: 'block',
            width: `${inputWidth}px`,
            height: `${state.suggestions.length * 50}px`,
            transformOrigin: '0px 0px',
            opacity: state.isOpen ? 1 : 0,
            transform: 'scaleX(1) scaleY(1)',
            position: 'absolute',
            top: '100%',
            left: '0',
            zIndex: 1000,
        };
    };
    return {
        oninit: ({ attrs }) => {
            state.inputValue = attrs.initialValue || '';
            document.addEventListener('click', closeDropdown);
        },
        onremove: () => {
            document.removeEventListener('click', closeDropdown);
        },
        view: ({ attrs }) => {
            const id = attrs.id || state.id;
            const { label, helperText, onchange, newRow, className = 'col s12', style, iconName, isMandatory, data = {}, limit = Infinity, minLength = 1 } = attrs, params = __rest(attrs, ["label", "helperText", "onchange", "newRow", "className", "style", "iconName", "isMandatory", "data", "limit", "minLength"]);
            const cn = newRow ? className + ' clear' : className;
            // Update suggestions when input changes
            state.suggestions = filterSuggestions(state.inputValue, data, limit, minLength);
            // Check if there's a perfect match (exact key match, case-insensitive)
            const hasExactMatch = state.inputValue.length >= minLength &&
                Object.keys(data).some((key) => key.toLowerCase() === state.inputValue.toLowerCase());
            // Only open dropdown if there are suggestions and no perfect match
            state.isOpen = state.suggestions.length > 0 && state.inputValue.length >= minLength && !hasExactMatch;
            const replacer = new RegExp(`(${state.inputValue})`, 'i');
            return m('.input-field.autocomplete-wrapper', {
                className: cn,
                style,
            }, [
                iconName ? m('i.material-icons.prefix', iconName) : '',
                m('input', Object.assign(Object.assign({}, params), { className: 'autocomplete', type: 'text', tabindex: 0, id, value: state.inputValue, oncreate: (vnode) => {
                        state.inputElement = vnode.dom;
                    }, oninput: (e) => {
                        const target = e.target;
                        state.inputValue = target.value;
                        state.selectedIndex = -1;
                        if (onchange) {
                            onchange(target.value);
                        }
                    }, onkeydown: (e) => {
                        handleKeydown(e, attrs);
                        // Call original onkeydown if provided
                        if (attrs.onkeydown) {
                            attrs.onkeydown(e, state.inputValue);
                        }
                    }, onfocus: () => {
                        state.isActive = true;
                        if (state.inputValue.length >= minLength) {
                            // Check for perfect match on focus too
                            const hasExactMatch = Object.keys(data).some((key) => key.toLowerCase() === state.inputValue.toLowerCase());
                            state.isOpen = state.suggestions.length > 0 && !hasExactMatch;
                        }
                    }, onblur: (e) => {
                        state.isActive = false;
                        // Delay closing to allow clicks on suggestions
                        setTimeout(() => {
                            if (!e.relatedTarget || !e.relatedTarget.closest('.autocomplete-content')) {
                                state.isOpen = false;
                                state.selectedIndex = -1;
                                m.redraw();
                            }
                        }, 150);
                    } })),
                // Autocomplete dropdown
                state.isOpen &&
                    m('ul.autocomplete-content.dropdown-content', {
                        style: getDropdownStyles(),
                    }, state.suggestions.map((suggestion, index) => m('li', {
                        key: suggestion.key,
                        class: state.selectedIndex === index ? 'active' : '',
                        onclick: (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            selectSuggestion(suggestion, attrs);
                        },
                        onmouseover: () => {
                            state.selectedIndex = index;
                            m.redraw();
                        },
                    }, [
                        // Check if value contains image URL or icon
                        suggestion.value && suggestion.value.includes('http')
                            ? m('img', {
                                src: suggestion.value,
                                class: 'right circle',
                                onerror: (e) => {
                                    // Hide image if it fails to load
                                    e.target.style.display = 'none';
                                },
                            })
                            : suggestion.value && suggestion.value.startsWith('icon:')
                                ? m('i.material-icons', {
                                    style: {
                                        fontSize: '24px',
                                        color: 'var(--md-grey-600)',
                                    },
                                }, suggestion.value.replace('icon:', ''))
                                : null,
                        m('span', suggestion.key
                            ? m.trust(suggestion.key.replace(replacer, (i) => `<span class="highlight">${i}</span>`))
                            : ''),
                    ]))),
                m(Label, {
                    label,
                    id,
                    isMandatory,
                    isActive: state.isActive || state.inputValue.length > 0 || !!attrs.placeholder || !!attrs.initialValue,
                }),
                m(HelperText, { helperText }),
            ]);
        },
    };
};

/**
 * A simple material icon, defined by its icon name.
 *
 * @example m(Icon, { className: 'small' }, 'create') renders a small 'create' icon
 * @example m(Icon, { className: 'prefix' }, iconName) renders the icon as a prefix
 */
const Icon = () => ({
    view: (_a) => {
        var _b = _a.attrs, { iconName } = _b, passThrough = __rest(_b, ["iconName"]);
        return m('i.material-icons', passThrough, iconName);
    },
});

/**
 * A factory to create new buttons.
 *
 * @example FlatButton = ButtonFactory('a.waves-effect.waves-teal.btn-flat');
 */
const ButtonFactory = (element, defaultClassNames, type = '') => {
    return () => {
        return {
            view: ({ attrs }) => {
                const { modalId, tooltip, tooltipPosition, tooltipPostion, // Keep for backwards compatibility 
                iconName, iconClass, label, className, attr, variant } = attrs, params = __rest(attrs, ["modalId", "tooltip", "tooltipPosition", "tooltipPostion", "iconName", "iconClass", "label", "className", "attr", "variant"]);
                // Handle both new variant prop and legacy modalId/type
                const buttonType = (variant === null || variant === void 0 ? void 0 : variant.type) || (modalId ? 'modal' : type || 'button');
                const modalTarget = (variant === null || variant === void 0 ? void 0 : variant.type) === 'modal' ? variant.modalId : modalId;
                const cn = [
                    modalTarget ? 'modal-trigger' : '',
                    tooltip ? 'tooltipped' : '',
                    defaultClassNames,
                    className
                ]
                    .filter(Boolean)
                    .join(' ')
                    .trim();
                // Use tooltipPosition if available, fallback to legacy tooltipPostion
                const position = tooltipPosition || tooltipPostion || 'top';
                return m(element, Object.assign(Object.assign(Object.assign({}, params), attr), { className: cn, href: modalTarget ? `#${modalTarget}` : undefined, 'data-position': tooltip ? position : undefined, 'data-tooltip': tooltip || undefined, type: buttonType === 'modal' ? 'button' : buttonType }), 
                // `${dca}${modalId ? `.modal-trigger[href=#${modalId}]` : ''}${
                //   tooltip ? `.tooltipped[data-position=${tooltipPostion || 'top'}][data-tooltip=${tooltip}]` : ''
                // }${toAttributeString(attr)}`, {}
                iconName ? m(Icon, { iconName, className: iconClass || 'left' }) : undefined, label ? label : undefined);
            },
        };
    };
};
const Button = ButtonFactory('a', 'waves-effect waves-light btn', 'button');
const LargeButton = ButtonFactory('a', 'waves-effect waves-light btn-large', 'button');
const SmallButton = ButtonFactory('a', 'waves-effect waves-light btn-small', 'button');
const FlatButton = ButtonFactory('a', 'waves-effect waves-teal btn-flat', 'button');
const RoundIconButton = ButtonFactory('button', 'btn-floating btn-large waves-effect waves-light', 'button');
const SubmitButton = ButtonFactory('button', 'btn waves-effect waves-light', 'submit');

/**
 * Materialize CSS Carousel component with dynamic positioning
 * Port of the original MaterializeCSS carousel logic
 */
const Carousel = () => {
    // Default options based on original Materialize CSS
    const defaults = {
        duration: 200, // ms
        dist: -100, // zoom scale
        shift: 0, // spacing for center image
        padding: 0, // Padding between non center items
        numVisible: 5, // Number of visible items in carousel
        fullWidth: false, // Change to full width styles
        indicators: false, // Toggle indicators
        noWrap: false, // Don't wrap around and cycle through items
    };
    const state = {
        // Carousel state
        hasMultipleSlides: false,
        showIndicators: false,
        noWrap: false,
        pressed: false,
        dragged: false,
        verticalDragged: false,
        offset: 0,
        target: 0,
        center: 0,
        // Touch/drag state
        reference: 0,
        referenceY: 0,
        velocity: 0,
        amplitude: 0,
        frame: 0,
        timestamp: 0,
        // Item measurements
        itemWidth: 0,
        itemHeight: 0,
        dim: 1, // Make sure dim is non zero for divisions
        // Animation
        ticker: null,
        scrollingTimeout: null};
    // Utility functions
    const xpos = (e) => {
        // Touch event
        if ('targetTouches' in e && e.targetTouches && e.targetTouches.length >= 1) {
            return e.targetTouches[0].clientX;
        }
        // Mouse event
        return e.clientX;
    };
    const ypos = (e) => {
        // Touch event
        if ('targetTouches' in e && e.targetTouches && e.targetTouches.length >= 1) {
            return e.targetTouches[0].clientY;
        }
        // Mouse event
        return e.clientY;
    };
    const wrap = (x, count) => {
        return x >= count ? x % count : x < 0 ? wrap(count + (x % count), count) : x;
    };
    const track = () => {
        const now = Date.now();
        const elapsed = now - state.timestamp;
        state.timestamp = now;
        const delta = state.offset - state.frame;
        state.frame = state.offset;
        const v = (1000 * delta) / (1 + elapsed);
        state.velocity = 0.8 * v + 0.2 * state.velocity;
    };
    const autoScroll = () => {
        if (state.amplitude) {
            const elapsed = Date.now() - state.timestamp;
            const delta = state.amplitude * Math.exp(-elapsed / defaults.duration);
            if (delta > 2 || delta < -2) {
                scroll(state.target - delta);
                requestAnimationFrame(autoScroll);
            }
            else {
                scroll(state.target);
            }
        }
    };
    const updateItemStyle = (el, opacity, zIndex, transform) => {
        el.style.transform = transform;
        el.style.zIndex = zIndex.toString();
        el.style.opacity = opacity.toString();
        el.style.visibility = 'visible';
    };
    const scroll = (x, attrs) => {
        const carouselEl = document.querySelector('.carousel');
        if (!carouselEl)
            return;
        // Track scrolling state
        if (!carouselEl.classList.contains('scrolling')) {
            carouselEl.classList.add('scrolling');
        }
        if (state.scrollingTimeout != null) {
            window.clearTimeout(state.scrollingTimeout);
        }
        state.scrollingTimeout = window.setTimeout(() => {
            carouselEl.classList.remove('scrolling');
        }, defaults.duration);
        // Start actual scroll
        const items = Array.from(carouselEl.querySelectorAll('.carousel-item'));
        const count = items.length;
        if (count === 0)
            return;
        const lastCenter = state.center;
        const numVisibleOffset = 1 / defaults.numVisible;
        state.offset = typeof x === 'number' ? x : state.offset;
        state.center = Math.floor((state.offset + state.dim / 2) / state.dim);
        const delta = state.offset - state.center * state.dim;
        const dir = delta < 0 ? 1 : -1;
        const tween = (-dir * delta * 2) / state.dim;
        const half = count >> 1;
        let alignment;
        let centerTweenedOpacity;
        if (defaults.fullWidth) {
            alignment = 'translateX(0)';
            centerTweenedOpacity = 1;
        }
        else {
            alignment = `translateX(${(carouselEl.clientWidth - state.itemWidth) / 2}px) `;
            alignment += `translateY(${(carouselEl.clientHeight - state.itemHeight) / 2}px)`;
            centerTweenedOpacity = 1 - numVisibleOffset * tween;
        }
        // Set indicator active
        if (state.showIndicators) {
            const diff = state.center % count;
            const indicators = carouselEl.querySelectorAll('.indicator-item');
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === diff);
            });
        }
        // Center item
        if (!state.noWrap || (state.center >= 0 && state.center < count)) {
            const el = items[wrap(state.center, count)];
            // Add active class to center item
            items.forEach((item) => item.classList.remove('active'));
            el.classList.add('active');
            const transformString = `${alignment} translateX(${-delta / 2}px) translateX(${dir * defaults.shift * tween}px) translateZ(${defaults.dist * tween}px)`;
            updateItemStyle(el, centerTweenedOpacity, 0, transformString);
        }
        // Side items
        for (let i = 1; i <= half; ++i) {
            let zTranslation;
            let tweenedOpacity;
            // Right side
            if (defaults.fullWidth) {
                zTranslation = defaults.dist;
                tweenedOpacity = i === half && delta < 0 ? 1 - tween : 1;
            }
            else {
                zTranslation = defaults.dist * (i * 2 + tween * dir);
                tweenedOpacity = 1 - numVisibleOffset * (i * 2 + tween * dir);
            }
            if (!state.noWrap || state.center + i < count) {
                const el = items[wrap(state.center + i, count)];
                const transformString = `${alignment} translateX(${defaults.shift + (state.dim * i - delta) / 2}px) translateZ(${zTranslation}px)`;
                updateItemStyle(el, tweenedOpacity, -i, transformString);
            }
            // Left side
            if (defaults.fullWidth) {
                zTranslation = defaults.dist;
                tweenedOpacity = i === half && delta > 0 ? 1 - tween : 1;
            }
            else {
                zTranslation = defaults.dist * (i * 2 - tween * dir);
                tweenedOpacity = 1 - numVisibleOffset * (i * 2 - tween * dir);
            }
            if (!state.noWrap || state.center - i >= 0) {
                const el = items[wrap(state.center - i, count)];
                const transformString = `${alignment} translateX(${-defaults.shift + (-state.dim * i - delta) / 2}px) translateZ(${zTranslation}px)`;
                updateItemStyle(el, tweenedOpacity, -i, transformString);
            }
        }
        // onCycleTo callback
        if (lastCenter !== state.center && attrs && attrs.onCycleTo) {
            const currItem = items[wrap(state.center, count)];
            if (currItem) {
                const itemIndex = Array.from(items).indexOf(currItem);
                attrs.onCycleTo(attrs.items[itemIndex], itemIndex, state.dragged);
            }
        }
    };
    const cycleTo = (n, callback, _attrs) => {
        const items = document.querySelectorAll('.carousel-item');
        const count = items.length;
        if (count === 0)
            return;
        let diff = (state.center % count) - n;
        // Account for wraparound
        if (!state.noWrap) {
            if (diff < 0) {
                if (Math.abs(diff + count) < Math.abs(diff)) {
                    diff += count;
                }
            }
            else if (diff > 0) {
                if (Math.abs(diff - count) < diff) {
                    diff -= count;
                }
            }
        }
        state.target = state.dim * Math.round(state.offset / state.dim);
        if (diff < 0) {
            state.target += state.dim * Math.abs(diff);
        }
        else if (diff > 0) {
            state.target -= state.dim * diff;
        }
        // Scroll
        if (state.offset !== state.target) {
            state.amplitude = state.target - state.offset;
            state.timestamp = Date.now();
            requestAnimationFrame(autoScroll);
        }
    };
    // Event handlers
    const handleCarouselTap = (e) => {
        // Fixes firefox draggable image bug
        if (e.type === 'mousedown' && e.target.tagName === 'IMG') {
            e.preventDefault();
        }
        state.pressed = true;
        state.dragged = false;
        state.verticalDragged = false;
        state.reference = xpos(e);
        state.referenceY = ypos(e);
        state.velocity = state.amplitude = 0;
        state.frame = state.offset;
        state.timestamp = Date.now();
        if (state.ticker)
            clearInterval(state.ticker);
        state.ticker = setInterval(track, 100);
    };
    const handleCarouselDrag = (e, attrs) => {
        if (state.pressed) {
            const x = xpos(e);
            const y = ypos(e);
            const delta = state.reference - x;
            const deltaY = Math.abs(state.referenceY - y);
            if (deltaY < 30 && !state.verticalDragged) {
                if (delta > 2 || delta < -2) {
                    state.dragged = true;
                    state.reference = x;
                    scroll(state.offset + delta, attrs);
                }
            }
            else if (state.dragged) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
            else {
                state.verticalDragged = true;
            }
        }
        if (state.dragged) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        return true;
    };
    const handleCarouselRelease = (e, _attrs) => {
        if (state.pressed) {
            state.pressed = false;
        }
        else {
            return;
        }
        if (state.ticker)
            clearInterval(state.ticker);
        state.target = state.offset;
        if (state.velocity > 10 || state.velocity < -10) {
            state.amplitude = 0.9 * state.velocity;
            state.target = state.offset + state.amplitude;
        }
        state.target = Math.round(state.target / state.dim) * state.dim;
        // No wrap of items
        if (state.noWrap) {
            const items = document.querySelectorAll('.carousel-item');
            if (state.target >= state.dim * (items.length - 1)) {
                state.target = state.dim * (items.length - 1);
            }
            else if (state.target < 0) {
                state.target = 0;
            }
        }
        state.amplitude = state.target - state.offset;
        state.timestamp = Date.now();
        requestAnimationFrame(autoScroll);
        if (state.dragged) {
            e.preventDefault();
            e.stopPropagation();
        }
        return false;
    };
    const handleCarouselClick = (e, attrs) => {
        if (state.dragged) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
        else if (!defaults.fullWidth) {
            const target = e.target.closest('.carousel-item');
            if (target) {
                const items = Array.from(document.querySelectorAll('.carousel-item'));
                const clickedIndex = items.indexOf(target);
                const diff = wrap(state.center, items.length) - clickedIndex;
                if (diff !== 0) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                cycleTo(clickedIndex);
            }
        }
        return true;
    };
    const handleIndicatorClick = (e, attrs) => {
        e.stopPropagation();
        const indicator = e.target.closest('.indicator-item');
        if (indicator) {
            const indicators = Array.from(document.querySelectorAll('.indicator-item'));
            const index = indicators.indexOf(indicator);
            cycleTo(index);
        }
    };
    return {
        view: ({ attrs }) => {
            const { items, indicators = false } = attrs;
            if (!items || items.length === 0)
                return undefined;
            // Merge options
            Object.assign(defaults, attrs);
            const supportTouch = typeof window.ontouchstart !== 'undefined';
            return m('.carousel', {
                oncreate: ({ attrs, dom }) => {
                    const carouselEl = dom;
                    const items = carouselEl.querySelectorAll('.carousel-item');
                    state.hasMultipleSlides = items.length > 1;
                    state.showIndicators = defaults.indicators && state.hasMultipleSlides;
                    state.noWrap = defaults.noWrap || !state.hasMultipleSlides;
                    if (items.length > 0) {
                        const firstItem = items[0];
                        state.itemWidth = firstItem.offsetWidth;
                        state.itemHeight = firstItem.offsetHeight;
                        state.dim = state.itemWidth * 2 + defaults.padding || 1;
                    }
                    // Cap numVisible at count
                    defaults.numVisible = Math.min(items.length, defaults.numVisible);
                    // Initial scroll
                    scroll(state.offset, attrs);
                },
                onmousedown: (e) => handleCarouselTap(e),
                onmousemove: (e) => handleCarouselDrag(e, attrs),
                onmouseup: (e) => handleCarouselRelease(e),
                onmouseleave: (e) => handleCarouselRelease(e),
                onclick: (e) => handleCarouselClick(e),
                ontouchstart: supportTouch ? (e) => handleCarouselTap(e) : undefined,
                ontouchmove: supportTouch ? (e) => handleCarouselDrag(e, attrs) : undefined,
                ontouchend: supportTouch ? (e) => handleCarouselRelease(e) : undefined,
            }, [
                // Carousel items
                ...items.map((item) => m('a.carousel-item', {
                    // key: index,
                    href: item.href,
                    style: 'visibility: hidden;', // Initially hidden, will be shown by scroll
                }, m('img', { src: item.src, alt: item.alt }))),
                // Indicators
                indicators &&
                    items.length > 1 &&
                    m('ul.indicators', items.map((_, index) => m('li.indicator-item', {
                        key: `indicator-${index}`,
                        className: index === 0 ? 'active' : '',
                        onclick: (e) => handleIndicatorClick(e),
                    }))),
            ]);
        },
    };
};

const iconPaths = {
    caret: [
        'M7 10l5 5 5-5z', // arrow
        'M0 0h24v24H0z', // background
    ],
    close: [
        'M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.89 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4z',
        'M0 0h24v24H0z',
    ],
};
const MaterialIcon = () => {
    return {
        view: ({ attrs }) => {
            var _a;
            const { name, direction = 'down', style } = attrs, props = __rest(attrs, ["name", "direction", "style"]);
            const rotationMap = {
                down: 0,
                up: 180,
                left: -90,
                right: 90,
            };
            const rotation = (_a = rotationMap[direction]) !== null && _a !== void 0 ? _a : 0;
            const transform = rotation ? `rotate(${rotation}deg)` : undefined;
            return m('svg', Object.assign(Object.assign({}, props), { style: Object.assign({ transform }, style), height: '1lh', width: '24', viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' }), iconPaths[name].map((d) => m('path', {
                d,
                fill: d.includes('M0 0h24v24H0z') ? 'none' : 'currentColor',
            })));
        },
    };
};

const Chips = () => {
    const state = {
        chipsData: [],
        selectedChip: null,
        focused: false,
        inputValue: '',
        inputId: uniqueId(),
        autocompleteItems: [],
        selectedAutocompleteIndex: -1,
        showAutocomplete: false,
    };
    let currentVnode = null;
    const processAutocompleteData = (data) => {
        if (Array.isArray(data)) {
            return data.map((item) => {
                if (typeof item === 'string') {
                    return { tag: item };
                }
                return item;
            });
        }
        return Object.entries(data).map(([text, value]) => ({
            tag: text,
            value: value || text,
        }));
    };
    const updateAutocomplete = () => {
        var _a;
        if (!((_a = currentVnode === null || currentVnode === void 0 ? void 0 : currentVnode.attrs.autocompleteOptions) === null || _a === void 0 ? void 0 : _a.data)) {
            state.autocompleteItems = [];
            return;
        }
        const { data, minLength = 1 } = currentVnode.attrs.autocompleteOptions;
        const input = state.inputValue.toLowerCase();
        if (input.length < minLength) {
            state.autocompleteItems = [];
            state.showAutocomplete = false;
            return;
        }
        const allOptions = processAutocompleteData(data);
        const filtered = allOptions.filter((option) => option.tag.toLowerCase().includes(input));
        const limit = currentVnode.attrs.autocompleteOptions.limit || Infinity;
        state.autocompleteItems = filtered.slice(0, limit);
        state.showAutocomplete = state.autocompleteItems.length > 0;
        state.selectedAutocompleteIndex = -1;
    };
    const selectAutocompleteItem = (item) => {
        addChip({
            tag: item.tag,
            image: item.image,
            alt: item.alt, // Preserve alt text when converting to chip
        });
        state.inputValue = '';
        state.showAutocomplete = false;
        state.selectedAutocompleteIndex = -1;
    };
    const isValid = (chip, currentChips) => {
        if (!chip.tag || chip.tag.trim() === '')
            return false;
        return !currentChips.some((c) => c.tag === chip.tag);
    };
    const addChip = (chip) => {
        if (!currentVnode)
            return;
        const { limit = Infinity, onChipAdd, onchange } = currentVnode.attrs;
        if (!isValid(chip, state.chipsData) || state.chipsData.length >= limit) {
            return;
        }
        state.chipsData = [...state.chipsData, chip];
        state.inputValue = '';
        if (onChipAdd)
            onChipAdd(chip);
        if (onchange)
            onchange(state.chipsData);
    };
    const deleteChip = (index) => {
        if (!currentVnode)
            return;
        const { onChipDelete, onchange } = currentVnode.attrs;
        const chip = state.chipsData[index];
        state.chipsData = state.chipsData.filter((_, i) => i !== index);
        state.selectedChip = null;
        if (onChipDelete)
            onChipDelete(chip);
        if (onchange)
            onchange(state.chipsData);
    };
    const selectChip = (index) => {
        if (!currentVnode)
            return;
        const { onChipSelect } = currentVnode.attrs;
        state.selectedChip = index;
        if (onChipSelect && state.chipsData[index]) {
            onChipSelect(state.chipsData[index]);
        }
    };
    const handleKeydown = (e) => {
        const target = e.target;
        if (state.showAutocomplete) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                state.selectedAutocompleteIndex = Math.min(state.selectedAutocompleteIndex + 1, state.autocompleteItems.length - 1);
                const selectedItem = currentVnode === null || currentVnode === void 0 ? void 0 : currentVnode.dom.querySelector('.autocomplete-item.selected');
                if (selectedItem) {
                    selectedItem.scrollIntoView({ block: 'nearest' });
                }
                return;
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                state.selectedAutocompleteIndex = Math.max(state.selectedAutocompleteIndex - 1, -1);
                const selectedItem = currentVnode === null || currentVnode === void 0 ? void 0 : currentVnode.dom.querySelector('.autocomplete-item.selected');
                if (selectedItem) {
                    selectedItem.scrollIntoView({ block: 'nearest' });
                }
                return;
            }
            if (e.key === 'Enter' && state.selectedAutocompleteIndex >= 0) {
                e.preventDefault();
                selectAutocompleteItem(state.autocompleteItems[state.selectedAutocompleteIndex]);
                return;
            }
        }
        if (e.key === 'Enter' && target.value.trim()) {
            e.preventDefault();
            addChip({ tag: target.value.trim() });
        }
        else if (e.key === 'Backspace' && !target.value && state.chipsData.length > 0) {
            e.preventDefault();
            // Delete the last chip immediately when backspace is pressed in an empty input
            deleteChip(state.chipsData.length - 1);
        }
        else if (e.key === 'ArrowLeft' && !target.value && state.chipsData.length) {
            e.preventDefault();
            selectChip(state.chipsData.length - 1);
        }
    };
    const handleChipKeydown = (e, index) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            e.preventDefault();
            deleteChip(index);
            const newIndex = Math.max(index - 1, 0);
            if (state.chipsData.length)
                selectChip(newIndex);
        }
        else if (e.key === 'ArrowLeft' && index > 0) {
            selectChip(index - 1);
        }
        else if (e.key === 'ArrowRight') {
            if (index < state.chipsData.length - 1) {
                selectChip(index + 1);
            }
            else {
                const input = currentVnode === null || currentVnode === void 0 ? void 0 : currentVnode.dom.querySelector('.chips-input');
                if (input)
                    input.focus();
            }
        }
    };
    return {
        oninit: ({ attrs }) => {
            state.chipsData = attrs.data || [];
        },
        oncreate: (vnode) => {
            currentVnode = vnode;
        },
        onremove: () => {
            currentVnode = null;
        },
        view: ({ attrs }) => {
            const { id, required, isMandatory = required, className = 'col s12', label, helperText, placeholder, secondaryPlaceholder, } = attrs;
            const getPlaceholder = () => {
                if (!state.chipsData.length && placeholder) {
                    return placeholder;
                }
                if (state.chipsData.length && secondaryPlaceholder) {
                    return secondaryPlaceholder;
                }
                return '';
            };
            return m('.input-field', { id, className }, [
                m('.chips.chips-initial', {
                    class: `chips-container${state.focused ? ' focused' : ''}${placeholder ? ' chips-placeholder' : ''}`,
                }, [
                    // Chips
                    state.chipsData.map((chip, index) => m('.chip', {
                        key: `${chip.tag}-${index}`,
                        tabindex: 0,
                        class: state.selectedChip === index ? 'selected' : undefined,
                        onkeydown: (e) => handleChipKeydown(e, index),
                    }, [
                        chip.image &&
                            m('img', {
                                src: chip.image,
                                alt: chip.alt || chip.tag,
                            }),
                        chip.tag,
                        m(MaterialIcon, {
                            name: 'close',
                            className: 'close',
                            onclick: (e) => {
                                e.stopPropagation();
                                deleteChip(index);
                            },
                        }),
                    ])),
                    // Input
                    m('input[type=text].chips-input.input.browser-default', {
                        id: state.inputId,
                        title: 'label',
                        value: state.inputValue,
                        placeholder: getPlaceholder(),
                        oninput: (e) => {
                            state.inputValue = e.target.value;
                            updateAutocomplete();
                        },
                        onfocus: () => {
                            state.focused = true;
                            state.selectedChip = null;
                            updateAutocomplete();
                        },
                        onblur: () => {
                            state.focused = false;
                            setTimeout(() => {
                                state.showAutocomplete = false;
                                state.selectedChip = null;
                            }, 150);
                        },
                        onkeydown: handleKeydown,
                    }),
                    state.showAutocomplete &&
                        m('ul.autocomplete-content.dropdown-content', {
                            style: {
                                display: 'block',
                                opacity: 1,
                                transform: 'scaleX(1) scaleY(1)',
                                position: 'absolute',
                                width: '100%',
                                left: 0,
                                top: '100%',
                                maxHeight: '200px',
                                overflow: 'auto',
                                zIndex: 1000,
                                backgroundColor: 'var(--mm-surface-color, #fff)',
                                boxShadow: '0 2px 2px 0 var(--mm-shadow-penumbra, rgba(0,0,0,0.14)), 0 3px 1px -2px var(--mm-shadow-umbra, rgba(0,0,0,0.12)), 0 1px 5px 0 var(--mm-shadow-ambient, rgba(0,0,0,0.2))',
                            },
                        }, state.autocompleteItems.map((item, index) => m('li.autocomplete-item', {
                            key: item.tag,
                            class: state.selectedAutocompleteIndex === index ? 'selected' : '',
                            style: {
                                padding: '12px 16px',
                                cursor: 'pointer',
                                backgroundColor: state.selectedAutocompleteIndex === index ? 'var(--mm-border-color, #eee)' : 'transparent',
                                color: 'var(--mm-text-primary, inherit)',
                            },
                            onmousedown: (e) => {
                                e.preventDefault();
                                selectAutocompleteItem(item);
                            },
                            onmouseover: () => {
                                state.selectedAutocompleteIndex = index;
                            },
                        }, [
                            item.image &&
                                m('img.autocomplete-item-image', {
                                    src: item.image,
                                    alt: item.alt || item.tag,
                                    style: {
                                        width: '24px',
                                        height: '24px',
                                        marginRight: '8px',
                                        verticalAlign: 'middle',
                                    },
                                }),
                            m('span.autocomplete-item-text', item.tag),
                        ]))),
                ]),
                label &&
                    m(Label, {
                        label,
                        id: state.inputId,
                        isMandatory,
                        isActive: state.focused || state.chipsData.length || placeholder ? true : false,
                    }),
                helperText && m(HelperText, { helperText }),
            ]);
        },
    };
};

/** A simple code block without syntax high-lighting */
const CodeBlock = () => ({
    view: ({ attrs }) => {
        const { newRow, code, language, className } = attrs, params = __rest(attrs, ["newRow", "code", "language", "className"]);
        const lang = language || 'lang-TypeScript';
        const label = lang.replace('lang-', '');
        const cb = code instanceof Array ? code.join('\n') : code;
        const cn = [newRow ? 'clear' : '', lang, className].filter(Boolean).join(' ').trim();
        return m(`pre.codeblock${newRow ? '.clear' : ''}`, attrs, [
            m('div', m('label', label)),
            m('code', Object.assign(Object.assign({}, params), { className: cn }), cb),
        ]);
    },
});

const CollapsibleItem = () => {
    return {
        view: ({ attrs: { header, body, iconName, isActive, onToggle } }) => {
            return m('li', { className: isActive ? 'active' : '' }, [
                header || iconName
                    ? m('.collapsible-header', {
                        onclick: onToggle,
                    }, [
                        iconName ? m('i.material-icons', iconName) : undefined,
                        header ? (typeof header === 'string' ? m('span', header) : header) : undefined,
                    ])
                    : undefined,
                m('.collapsible-body', {
                    style: {
                        display: isActive ? 'block' : 'none',
                        transition: 'display 0.3s ease',
                    },
                }, [
                    m('.collapsible-body-content', {
                        style: { padding: '2rem' },
                    }, body ? (typeof body === 'string' ? m('div', { innerHTML: body }) : body) : undefined),
                ]),
            ]);
        },
    };
};
/**
 * Creates a collabsible or accordion component with pure CSS/Mithril implementation.
 * No MaterializeCSS JavaScript dependencies.
 */
const Collapsible = () => {
    const state = {
        activeItems: new Set(),
    };
    return {
        oninit: ({ attrs }) => {
            // Initialize active items from the items array
            attrs.items.forEach((item, index) => {
                if (item.active) {
                    state.activeItems.add(index);
                }
            });
        },
        view: ({ attrs }) => {
            const { items, accordion = true, class: c, className, style, id } = attrs;
            const toggleItem = (index) => {
                if (accordion) {
                    // Accordion mode: only one item can be active
                    if (state.activeItems.has(index)) {
                        state.activeItems.clear();
                    }
                    else {
                        state.activeItems.clear();
                        state.activeItems.add(index);
                    }
                }
                else {
                    // Expandable mode: multiple items can be active
                    if (state.activeItems.has(index)) {
                        state.activeItems.delete(index);
                    }
                    else {
                        state.activeItems.add(index);
                    }
                }
            };
            return items && items.length > 0
                ? m('ul.collapsible', {
                    class: c || className,
                    style: Object.assign({ border: '1px solid #ddd', borderRadius: '2px', margin: '0.5rem 0 1rem 0' }, style),
                    id,
                }, items.map((item, index) => m(CollapsibleItem, Object.assign(Object.assign({}, item), { key: index, isActive: state.activeItems.has(index), onToggle: () => toggleItem(index) }))))
                : undefined;
        },
    };
};

exports.CollectionMode = void 0;
(function (CollectionMode) {
    CollectionMode[CollectionMode["BASIC"] = 0] = "BASIC";
    CollectionMode[CollectionMode["LINKS"] = 1] = "LINKS";
    CollectionMode[CollectionMode["AVATAR"] = 2] = "AVATAR";
})(exports.CollectionMode || (exports.CollectionMode = {}));
const isNonLocalRoute = (url) => url && /https?:\/\//.test(url);
const SecondaryContent = () => {
    return {
        view: ({ attrs }) => {
            const { href, iconName = 'send', onclick, style = { cursor: 'pointer' } } = attrs;
            const props = {
                href,
                style,
                className: 'secondary-content',
                onclick: onclick ? () => onclick(attrs) : undefined,
            };
            return isNonLocalRoute(href) || !href
                ? m('a[target=_]', props, m(Icon, { iconName }))
                : m(m.route.Link, props, m(Icon, { iconName }));
        },
    };
};
const avatarIsImage = (avatar = '') => /\./.test(avatar);
const ListItem = () => {
    return {
        view: ({ attrs: { item, mode } }) => {
            const { title, content = '', active, iconName, avatar, className, onclick } = item;
            return mode === exports.CollectionMode.AVATAR
                ? m('li.collection-item.avatar', {
                    className: active ? 'active' : '',
                    onclick: onclick ? () => onclick(item) : undefined,
                }, [
                    avatarIsImage(avatar)
                        ? m('img.circle', { src: avatar })
                        : m('i.material-icons.circle', { className }, avatar),
                    m('span.title', title),
                    m('p', m.trust(content)),
                    m(SecondaryContent, item),
                ])
                : m('li.collection-item', {
                    className: active ? 'active' : '',
                }, iconName ? m('div', [title, m(SecondaryContent, item)]) : title);
        },
    };
};
const BasicCollection = () => {
    return {
        view: (_a) => {
            var _b = _a.attrs, { header, items, mode = exports.CollectionMode.BASIC } = _b, params = __rest(_b, ["header", "items", "mode"]);
            const collectionItems = items.map((item) => m(ListItem, { key: item.id, item, mode }));
            return header
                ? m('ul.collection.with-header', params, [m('li.collection-header', m('h4', header)), collectionItems])
                : m('ul.collection', params, collectionItems);
        },
    };
};
const AnchorItem = () => {
    return {
        view: ({ attrs: { item } }) => {
            const { title, active, href } = item, params = __rest(item, ["title", "active", "href"]);
            const props = Object.assign(Object.assign({}, params), { className: `collection-item ${active ? 'active' : ''}`, href });
            return isNonLocalRoute(href) || !href
                ? m('a[target=_]', props, title)
                : m(m.route.Link, props, title);
        },
    };
};
const LinksCollection = () => {
    return {
        view: (_a) => {
            var _b = _a.attrs, { items, header } = _b, params = __rest(_b, ["items", "header"]);
            return header
                ? m('.collection.with-header', params, [
                    m('.collection-header', m('h4', header)),
                    items.map((item) => m(AnchorItem, { key: item.id, item })),
                ])
                : m('.collection', params, items.map((item) => m(AnchorItem, { key: item.id, item })));
        },
    };
};
/**
 * Creates a Collection of items, optionally containing links, headers, secondary content or avatars.
 * @see https://materializecss.com/collections.html
 */
const Collection = () => {
    return {
        view: (_a) => {
            var _b = _a.attrs, { items, header, mode = exports.CollectionMode.BASIC } = _b, params = __rest(_b, ["items", "header", "mode"]);
            return header || (items && items.length > 0)
                ? mode === exports.CollectionMode.LINKS
                    ? m(LinksCollection, Object.assign({ header, items }, params))
                    : m(BasicCollection, Object.assign({ header, items, mode }, params))
                : undefined;
        },
    };
};

const defaultI18n = {
    cancel: 'Cancel',
    clear: 'Clear',
    done: 'Ok',
    previousMonth: '\u2039',
    nextMonth: '\u203a',
    months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    weekdaysAbbrev: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
};
// Utility functions based on Materialize CSS implementation
const isDate = (obj) => {
    return /Date/.test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
};
const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
};
const setToStartOfDay = (date) => {
    if (isDate(date))
        date.setHours(0, 0, 0, 0);
};
const getDaysInMonth = (year, month) => {
    return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};
const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};
const compareDates = (a, b) => {
    return a.getTime() === b.getTime();
};
// Week number calculation utilities
const getWeekNumber = (date, weekNumbering, firstDay) => {
    if (weekNumbering === 'iso') {
        return getISOWeekNumber(date);
    }
    else {
        return getLocalWeekNumber(date, firstDay);
    }
};
const getISOWeekNumber = (date) => {
    // ISO 8601 week numbering
    const tempDate = new Date(date.getTime());
    const dayNum = (date.getDay() + 6) % 7; // Make Monday = 0
    tempDate.setDate(tempDate.getDate() - dayNum + 3); // Thursday in target week
    const firstThursday = new Date(tempDate.getFullYear(), 0, 4); // First Thursday of year
    const firstThursdayDayNum = (firstThursday.getDay() + 6) % 7; // Make Monday = 0
    firstThursday.setDate(firstThursday.getDate() - firstThursdayDayNum + 3);
    return Math.ceil((tempDate.getTime() - firstThursday.getTime()) / (7 * 24 * 60 * 60 * 1000)) + 1;
};
const getLocalWeekNumber = (date, firstDay) => {
    // Local week numbering based on firstDay setting
    const tempDate = new Date(date.getFullYear(), 0, 1);
    const firstDayOfYear = tempDate.getDay();
    // Calculate days from first day of year to the start of first week
    let daysToFirstWeek = (firstDay - firstDayOfYear + 7) % 7;
    if (daysToFirstWeek === 0 && firstDayOfYear !== firstDay) {
        daysToFirstWeek = 7;
    }
    const firstWeekStart = new Date(tempDate.getTime());
    firstWeekStart.setDate(1 + daysToFirstWeek);
    if (date < firstWeekStart) {
        // Date is in the last week of previous year
        return getLocalWeekNumber(new Date(date.getFullYear() - 1, 11, 31), firstDay);
    }
    const daysDiff = Math.floor((date.getTime() - firstWeekStart.getTime()) / (24 * 60 * 60 * 1000));
    return Math.floor(daysDiff / 7) + 1;
};
/**
 * Enhanced DatePicker component based on Materialize CSS datepicker
 */
const DatePicker = () => {
    let state;
    const mergeOptions = (attrs) => {
        // Handle HTML attributes
        let yearRange = 10;
        if (attrs.yearrange) {
            const parts = attrs.yearrange.split(',');
            if (parts.length === 2) {
                yearRange = [parseInt(parts[0], 10), parseInt(parts[1], 10)];
            }
        }
        else if (attrs.yearRange) {
            yearRange = attrs.yearRange;
        }
        // Handle format - priority: format attribute > displayFormat > default
        let finalFormat = 'mmm dd, yyyy';
        if (attrs.format) {
            finalFormat = attrs.format;
        }
        else if (attrs.displayFormat) {
            finalFormat = attrs.displayFormat;
        }
        const merged = Object.assign({ autoClose: false, format: finalFormat, parse: null, defaultDate: null, setDefaultDate: false, disableWeekends: false, disableDayFn: null, firstDay: 0, minDate: null, maxDate: null, yearRange, showClearBtn: false, showWeekNumbers: false, weekNumbering: 'iso', i18n: defaultI18n, onSelect: null, onOpen: null, onClose: null }, attrs);
        // Merge i18n properly
        merged.i18n = Object.assign(Object.assign({}, defaultI18n), attrs.i18n);
        return merged;
    };
    const toString = (date, format) => {
        if (!date || !isDate(date)) {
            return '';
        }
        // Split format into tokens - match longer patterns first
        const formatTokens = /(dddd|ddd|dd|d|mmmm|mmm|mm|m|yyyy|yy)/g;
        let result = format;
        // Replace all format tokens with actual values
        result = result.replace(formatTokens, (match) => {
            if (state.formats[match]) {
                return String(state.formats[match]());
            }
            return match;
        });
        return result;
    };
    const setDate = (date, preventOnSelect = false, options) => {
        if (!date) {
            state.date = null;
            return;
        }
        if (typeof date === 'string') {
            date = new Date(Date.parse(date));
        }
        if (!isDate(date)) {
            return;
        }
        const min = options.minDate;
        const max = options.maxDate;
        if (isDate(min) && date < min) {
            date = min;
        }
        else if (isDate(max) && date > max) {
            date = max;
        }
        state.date = new Date(date.getTime());
        setToStartOfDay(state.date);
        gotoDate(state.date);
        if (!preventOnSelect && options.onSelect) {
            options.onSelect(state.date);
        }
    };
    const gotoDate = (date) => {
        if (!isDate(date)) {
            return;
        }
        state.calendars = [
            {
                month: date.getMonth(),
                year: date.getFullYear(),
            },
        ];
    };
    const nextMonth = () => {
        state.calendars[0].month++;
        adjustCalendars();
    };
    const prevMonth = () => {
        state.calendars[0].month--;
        adjustCalendars();
    };
    const adjustCalendars = () => {
        state.calendars[0] = adjustCalendar(state.calendars[0]);
    };
    const adjustCalendar = (calendar) => {
        if (calendar.month < 0) {
            calendar.year -= Math.ceil(Math.abs(calendar.month) / 12);
            calendar.month += 12;
        }
        if (calendar.month > 11) {
            calendar.year += Math.floor(Math.abs(calendar.month) / 12);
            calendar.month -= 12;
        }
        return calendar;
    };
    const Day = () => {
        return {
            view: ({ attrs }) => {
                const { opts, options } = attrs;
                const arr = [];
                let ariaSelected = 'false';
                if (opts.isEmpty) {
                    if (opts.showDaysInNextAndPreviousMonths) {
                        arr.push('is-outside-current-month');
                        arr.push('is-selection-disabled');
                    }
                    else {
                        return m('td.is-empty');
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
                return m('td', {
                    'data-day': opts.day,
                    class: arr.join(' '),
                    'aria-selected': ariaSelected,
                }, [
                    m('button.datepicker-day-button', {
                        type: 'button',
                        'data-year': opts.year,
                        'data-month': opts.month,
                        'data-day': opts.day,
                        onclick: (e) => {
                            const target = e.target;
                            if (!opts.isDisabled) {
                                const year = parseInt(target.getAttribute('data-year') || '0', 10);
                                const month = parseInt(target.getAttribute('data-month') || '0', 10);
                                const day = parseInt(target.getAttribute('data-day') || '0', 10);
                                const selectedDate = new Date(year, month, day);
                                setDate(selectedDate, false, options);
                                if (options.autoClose) {
                                    state.isOpen = false;
                                }
                            }
                        },
                    }, opts.day),
                ]);
            }
        };
    };
    const Calendar = () => {
        return {
            view: ({ attrs }) => {
                const { year, month, options, randId } = attrs;
                const now = new Date();
                const days = getDaysInMonth(year, month);
                let before = new Date(year, month, 1).getDay();
                const data = [];
                let row = [];
                setToStartOfDay(now);
                if (options.firstDay > 0) {
                    before -= options.firstDay;
                    if (before < 0) {
                        before += 7;
                    }
                }
                const previousMonth = month === 0 ? 11 : month - 1;
                const nextMonth = month === 11 ? 0 : month + 1;
                const yearOfPreviousMonth = month === 0 ? year - 1 : year;
                const yearOfNextMonth = month === 11 ? year + 1 : year;
                const daysInPreviousMonth = getDaysInMonth(yearOfPreviousMonth, previousMonth);
                let cells = days + before;
                let after = cells;
                while (after > 7) {
                    after -= 7;
                }
                cells += 7 - after;
                for (let i = 0, r = 0; i < cells; i++) {
                    const day = new Date(year, month, 1 + (i - before));
                    const isSelected = isDate(state.date) ? compareDates(day, state.date) : false;
                    const isToday = compareDates(day, now);
                    const isEmpty = i < before || i >= days + before;
                    let dayNumber = 1 + (i - before);
                    let monthNumber = month;
                    let yearNumber = year;
                    if (isEmpty) {
                        if (i < before) {
                            dayNumber = daysInPreviousMonth + dayNumber;
                            monthNumber = previousMonth;
                            yearNumber = yearOfPreviousMonth;
                        }
                        else {
                            dayNumber = dayNumber - days;
                            monthNumber = nextMonth;
                            yearNumber = yearOfNextMonth;
                        }
                    }
                    const isDisabled = (options.minDate && day < options.minDate) ||
                        (options.maxDate && day > options.maxDate) ||
                        (options.disableWeekends && isWeekend(day)) ||
                        (options.disableDayFn && options.disableDayFn(day));
                    const dayConfig = {
                        day: dayNumber,
                        month: monthNumber,
                        year: yearNumber,
                        hasEvent: false,
                        isSelected: isSelected,
                        isToday: isToday,
                        isDisabled: isDisabled,
                        isEmpty: isEmpty,
                        showDaysInNextAndPreviousMonths: false,
                    };
                    // Add week number cell at the beginning of each row
                    if (r === 0 && options.showWeekNumbers) {
                        const weekDate = new Date(yearNumber, monthNumber, dayNumber);
                        const weekNum = getWeekNumber(weekDate, options.weekNumbering, options.firstDay);
                        row.push(m('td.datepicker-week-number', {
                            title: `Week ${weekNum}`
                        }, weekNum));
                    }
                    row.push(m(Day, { opts: dayConfig, options }));
                    if (++r === 7) {
                        data.push(m('tr.datepicker-row', row));
                        row = [];
                        r = 0;
                    }
                }
                const weekdayHeaders = [];
                // Add week number header if enabled
                if (options.showWeekNumbers) {
                    weekdayHeaders.push(m('th.datepicker-week-header', { scope: 'col', title: 'Week' }, 'Wk'));
                }
                for (let i = 0; i < 7; i++) {
                    let day = i + options.firstDay;
                    while (day >= 7) {
                        day -= 7;
                    }
                    weekdayHeaders.push(m('th', { scope: 'col' }, [
                        m('abbr', { title: options.i18n.weekdays[day] }, options.i18n.weekdaysAbbrev[day]),
                    ]));
                }
                return m('.datepicker-table-wrapper', [
                    m('table.datepicker-table', {
                        cellpadding: '0',
                        cellspacing: '0',
                        role: 'grid',
                        'aria-labelledby': randId || 'datepicker-controls',
                        class: options.showWeekNumbers ? 'with-week-numbers' : '',
                    }, [m('thead', [m('tr', weekdayHeaders)]), m('tbody', data)]),
                ]);
            }
        };
    };
    const DateDisplay = () => {
        return {
            view: ({ attrs }) => {
                const { options } = attrs;
                const displayDate = isDate(state.date) ? state.date : new Date();
                const day = options.i18n.weekdaysShort[displayDate.getDay()];
                const month = options.i18n.monthsShort[displayDate.getMonth()];
                const date = displayDate.getDate();
                return m('.datepicker-date-display', [
                    m('span.year-text', displayDate.getFullYear()),
                    m('span.date-text', `${day}, ${month} ${date}`),
                ]);
            }
        };
    };
    const DateControls = () => {
        return {
            view: ({ attrs }) => {
                const { options, randId } = attrs;
                const calendar = state.calendars[0];
                const year = calendar.year;
                const month = calendar.month;
                // Year range calculation
                let yearStart, yearEnd;
                if (Array.isArray(options.yearRange)) {
                    yearStart = options.yearRange[0];
                    yearEnd = options.yearRange[1];
                }
                else {
                    yearStart = year - options.yearRange;
                    yearEnd = year + options.yearRange;
                }
                return m('.datepicker-controls', {
                    id: randId,
                    role: 'heading',
                    'aria-live': 'assertive',
                }, [
                    m('button.month-prev', {
                        type: 'button',
                        onclick: (e) => {
                            e.preventDefault();
                            prevMonth();
                        },
                    }, m('svg', { fill: '#000000', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' }, [
                        m('path', { d: 'M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z' }),
                        m('path', { d: 'M0-.5h24v24H0z', fill: 'none' }),
                    ])),
                    m('.selects-container', [
                        // Month select wrapper
                        m('.select-wrapper.select-month', [
                            m('input.select-dropdown.dropdown-trigger', {
                                type: 'text',
                                readonly: true,
                                value: options.i18n.months[month],
                                onclick: (e) => {
                                    e.preventDefault();
                                    state.monthDropdownOpen = !state.monthDropdownOpen;
                                    state.yearDropdownOpen = false; // Close year dropdown
                                },
                            }),
                            // Custom dropdown menu
                            state.monthDropdownOpen &&
                                m('.dropdown-content', options.i18n.months.map((monthName, index) => m('.dropdown-item', {
                                    key: index,
                                    class: index === month ? 'selected' : '',
                                    onclick: (e) => {
                                        e.stopPropagation();
                                        gotoMonth(index);
                                        state.monthDropdownOpen = false;
                                    },
                                }, monthName))),
                        ]),
                        // Year select wrapper
                        m('.select-wrapper.select-year', [
                            m('input.select-dropdown.dropdown-trigger', {
                                type: 'text',
                                readonly: true,
                                value: year.toString(),
                                onclick: (e) => {
                                    e.preventDefault();
                                    state.yearDropdownOpen = !state.yearDropdownOpen;
                                    state.monthDropdownOpen = false; // Close month dropdown
                                },
                            }),
                            // Custom dropdown menu
                            state.yearDropdownOpen &&
                                m('.dropdown-content', range(yearStart, yearEnd).map((i) => m('.dropdown-item', {
                                    key: i,
                                    class: i === year ? 'selected' : '',
                                    onclick: (e) => {
                                        e.stopPropagation();
                                        gotoYear(i);
                                        state.yearDropdownOpen = false;
                                    },
                                }, i))),
                        ]),
                    ]),
                    m('button.month-next', {
                        type: 'button',
                        onclick: (e) => {
                            e.preventDefault();
                            nextMonth();
                        },
                    }, m('svg', { fill: '#000000', height: '24', viewBox: '0 0 24 24', width: '24', xmlns: 'http://www.w3.org/2000/svg' }, [
                        m('path', { d: 'M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z' }),
                        m('path', { d: 'M0-.25h24v24H0z', fill: 'none' }),
                    ])),
                ]);
            }
        };
    };
    const gotoMonth = (month) => {
        if (!isNaN(month)) {
            state.calendars[0].month = month;
            adjustCalendars();
            // Update selected date if one exists
            if (state.date && isDate(state.date)) {
                const currentDay = state.date.getDate();
                const newYear = state.calendars[0].year;
                const daysInNewMonth = getDaysInMonth(newYear, month);
                // Adjust day if it doesn't exist in the new month (e.g., Jan 31 -> Feb 28)
                const adjustedDay = Math.min(currentDay, daysInNewMonth);
                const newDate = new Date(newYear, month, adjustedDay);
                state.date = newDate;
                setToStartOfDay(state.date);
            }
        }
    };
    const gotoYear = (year) => {
        if (!isNaN(year)) {
            state.calendars[0].year = year;
            adjustCalendars();
            // Update selected date if one exists
            if (state.date && isDate(state.date)) {
                const currentMonth = state.date.getMonth();
                const currentDay = state.date.getDate();
                const daysInNewMonth = getDaysInMonth(year, currentMonth);
                // Adjust day if it doesn't exist in the new year/month (e.g., leap year changes)
                const adjustedDay = Math.min(currentDay, daysInNewMonth);
                const newDate = new Date(year, currentMonth, adjustedDay);
                state.date = newDate;
                setToStartOfDay(state.date);
            }
        }
    };
    const handleDocumentClick = (e) => {
        const target = e.target;
        if (!target.closest('.select-wrapper') && !target.closest('.dropdown-content')) {
            state.monthDropdownOpen = false;
            state.yearDropdownOpen = false;
        }
    };
    return {
        oninit: (vnode) => {
            const attrs = vnode.attrs;
            const options = mergeOptions(attrs);
            state = {
                id: uniqueId(),
                isOpen: false,
                date: null,
                calendars: [{ month: 0, year: 0 }],
                monthDropdownOpen: false,
                yearDropdownOpen: false,
                formats: {
                    d: () => { var _a; return ((_a = state.date) === null || _a === void 0 ? void 0 : _a.getDate()) || 0; },
                    dd: () => {
                        var _a;
                        const d = ((_a = state.date) === null || _a === void 0 ? void 0 : _a.getDate()) || 0;
                        return (d < 10 ? '0' : '') + d;
                    },
                    ddd: () => { var _a; return options.i18n.weekdaysShort[((_a = state.date) === null || _a === void 0 ? void 0 : _a.getDay()) || 0]; },
                    dddd: () => { var _a; return options.i18n.weekdays[((_a = state.date) === null || _a === void 0 ? void 0 : _a.getDay()) || 0]; },
                    m: () => { var _a; return (((_a = state.date) === null || _a === void 0 ? void 0 : _a.getMonth()) || 0) + 1; },
                    mm: () => {
                        var _a;
                        const m = (((_a = state.date) === null || _a === void 0 ? void 0 : _a.getMonth()) || 0) + 1;
                        return (m < 10 ? '0' : '') + m;
                    },
                    mmm: () => { var _a; return options.i18n.monthsShort[((_a = state.date) === null || _a === void 0 ? void 0 : _a.getMonth()) || 0]; },
                    mmmm: () => { var _a; return options.i18n.months[((_a = state.date) === null || _a === void 0 ? void 0 : _a.getMonth()) || 0]; },
                    yy: () => { var _a; return ('' + (((_a = state.date) === null || _a === void 0 ? void 0 : _a.getFullYear()) || 0)).slice(2); },
                    yyyy: () => { var _a; return ((_a = state.date) === null || _a === void 0 ? void 0 : _a.getFullYear()) || 0; },
                },
            };
            // Initialize date
            let defaultDate = attrs.defaultDate;
            if (!defaultDate && attrs.initialValue) {
                defaultDate = new Date(attrs.initialValue);
            }
            if (isDate(defaultDate)) {
                // Always set the date if we have initialValue or defaultDate
                setDate(defaultDate, true, options);
            }
            else {
                gotoDate(new Date());
            }
            // Add document click listener to close dropdowns
            document.addEventListener('click', handleDocumentClick);
        },
        onremove: () => {
            // Clean up event listener
            document.removeEventListener('click', handleDocumentClick);
        },
        view: (vnode) => {
            const attrs = vnode.attrs;
            const options = mergeOptions(attrs);
            const { id = state.id, label, dateLabel, placeholder, disabled, readonly, required, iconName, helperText, onchange, oninput, className: cn1, class: cn2, } = attrs;
            const className = cn1 || cn2 || 'col s12';
            // Calculate display value for the input
            let displayValue = '';
            if (state.date) {
                displayValue = toString(state.date, options.format);
            }
            // Custom date format handling
            if (attrs.displayFormat) {
                // const formatRegex = /(yyyy|mm|dd)/gi;
                let customDisplayValue = attrs.displayFormat;
                if (state.date) {
                    customDisplayValue = customDisplayValue
                        .replace(/yyyy/gi, state.date.getFullYear().toString())
                        .replace(/mm/gi, (state.date.getMonth() + 1).toString().padStart(2, '0'))
                        .replace(/dd/gi, state.date.getDate().toString().padStart(2, '0'));
                    displayValue = customDisplayValue;
                }
            }
            return m('.input-field', {
                className,
            }, [
                // Icon prefix
                iconName && m('i.material-icons.prefix', iconName),
                // Date input field
                m('input.datepicker', {
                    id,
                    type: 'text',
                    value: displayValue,
                    placeholder,
                    disabled,
                    readonly,
                    required,
                    onclick: () => {
                        if (!disabled && !readonly) {
                            state.isOpen = true;
                            if (options.onOpen)
                                options.onOpen();
                        }
                    },
                    oninput: (e) => {
                        if (oninput) {
                            const target = e.target;
                            oninput(target.value);
                        }
                    },
                    onchange: (e) => {
                        if (onchange) {
                            const target = e.target;
                            // Try to parse the input value
                            const date = new Date(target.value);
                            if (isDate(date)) {
                                setDate(date, false, options);
                                onchange(toString(date, 'yyyy-mm-dd')); // Always return ISO format
                            }
                            else {
                                onchange(target.value);
                            }
                        }
                    },
                }),
                // Label
                (label || dateLabel) &&
                    m('label', {
                        for: id,
                        class: displayValue || placeholder ? 'active' : '',
                    }, label || dateLabel),
                // Helper text
                helperText && m('span.helper-text', helperText),
                // Modal datepicker
                state.isOpen && [
                    m('.modal.datepicker-modal.open', {
                        id: `modal-${state.id}`,
                        tabindex: 0,
                        style: {
                            zIndex: 1003,
                            display: 'block',
                            opacity: 1,
                            top: '10%',
                            transform: 'scaleX(1) scaleY(1)',
                        },
                    }, [
                        m('.modal-content.datepicker-container', {
                            onclick: (e) => {
                                // Close dropdowns when clicking anywhere in the modal content
                                const target = e.target;
                                if (!target.closest('.select-wrapper') && !target.closest('.dropdown-content')) {
                                    state.monthDropdownOpen = false;
                                    state.yearDropdownOpen = false;
                                }
                            },
                        }, [
                            m(DateDisplay, { options }),
                            m('.datepicker-calendar-container', [
                                m('.datepicker-calendar', [
                                    m(DateControls, { options, randId: `datepicker-title-${Math.random().toString(36).slice(2)}` }),
                                    m(Calendar, { year: state.calendars[0].year, month: state.calendars[0].month, options }),
                                ]),
                                m('.datepicker-footer', [
                                    options.showClearBtn &&
                                        m('button.btn-flat.datepicker-clear.waves-effect', {
                                            type: 'button',
                                            style: '',
                                            onclick: () => {
                                                setDate(null, false, options);
                                                state.isOpen = false;
                                            },
                                        }, options.i18n.clear),
                                    m('button.btn-flat.datepicker-cancel.waves-effect', {
                                        type: 'button',
                                        onclick: () => {
                                            state.isOpen = false;
                                            if (options.onClose)
                                                options.onClose();
                                        },
                                    }, options.i18n.cancel),
                                    m('button.btn-flat.datepicker-done.waves-effect', {
                                        type: 'button',
                                        onclick: () => {
                                            state.isOpen = false;
                                            if (state.date && onchange) {
                                                onchange(toString(state.date, 'yyyy-mm-dd')); // Always return ISO format
                                            }
                                            if (options.onClose)
                                                options.onClose();
                                        },
                                    }, options.i18n.done),
                                ]),
                            ]),
                        ]),
                    ]),
                    // Modal overlay
                    m('.modal-overlay', {
                        style: {
                            zIndex: 1002,
                            display: 'block',
                            opacity: 0.5,
                        },
                        onclick: () => {
                            state.isOpen = false;
                            if (options.onClose)
                                options.onClose();
                        },
                    }),
                ],
            ]);
        },
    };
};

/** Character counter component that tracks text length against maxLength */
const CharacterCounter = () => {
    return {
        view: ({ attrs }) => {
            const { currentLength, maxLength, show } = attrs;
            if (!show)
                return null;
            const isOverLimit = currentLength > maxLength;
            return m('span.character-counter', {
                style: {
                    color: isOverLimit ? '#F44336' : '#9e9e9e',
                    fontSize: '12px',
                    display: 'block',
                    textAlign: 'right',
                    marginTop: '8px',
                },
            }, `${currentLength}/${maxLength}`);
        },
    };
};
/** Create a TextArea */
const TextArea = () => {
    const state = {
        id: uniqueId(),
        currentLength: 0,
        hasInteracted: false,
        height: undefined,
        active: false,
        textarea: undefined,
    };
    const updateHeight = (textarea) => {
        textarea.style.height = 'auto';
        const newHeight = textarea.scrollHeight + 'px';
        state.height = textarea.value.length === 0 ? undefined : newHeight;
    };
    return {
        onremove: () => {
        },
        view: ({ attrs }) => {
            var _a;
            const { className = 'col s12', helperText, iconName, id = state.id, initialValue, placeholder, isMandatory, label, maxLength, oninput, onchange, onkeydown, onkeypress, onkeyup, onblur, style } = attrs, params = __rest(attrs, ["className", "helperText", "iconName", "id", "initialValue", "placeholder", "isMandatory", "label", "maxLength", "oninput", "onchange", "onkeydown", "onkeypress", "onkeyup", "onblur", "style"]);
            // const attributes = toAttrs(params);
            return m('.input-field', { className, style }, [
                iconName ? m('i.material-icons.prefix', iconName) : '',
                m('textarea.materialize-textarea', Object.assign(Object.assign({}, params), { id, tabindex: 0, style: {
                        height: state.height,
                    }, oncreate: ({ dom }) => {
                        const textarea = (state.textarea = dom);
                        // Set initial value and height if provided
                        if (initialValue) {
                            textarea.value = String(initialValue);
                            updateHeight(textarea);
                            // } else {
                            // updateHeight(textarea);
                        }
                        // Update character count state for counter component
                        if (maxLength) {
                            state.currentLength = textarea.value.length; // Initial count
                            m.redraw();
                        }
                    }, onupdate: ({ dom }) => {
                        const textarea = dom;
                        if (state.height)
                            textarea.style.height = state.height;
                    }, onfocus: () => {
                        state.active = true;
                    }, oninput: (e) => {
                        state.active = true;
                        state.hasInteracted = false;
                        const target = e.target;
                        // Update height for auto-resize
                        updateHeight(target);
                        // Update character count
                        if (maxLength) {
                            state.currentLength = target.value.length;
                            state.hasInteracted = target.value.length > 0;
                        }
                        // Call onchange handler
                        if (oninput) {
                            oninput(target.value);
                        }
                    }, onblur: (e) => {
                        state.active = false;
                        // const target = e.target as HTMLTextAreaElement;
                        state.hasInteracted = true;
                        // Call original onblur if provided
                        if (onblur) {
                            onblur(e);
                        }
                        if (onchange && state.textarea) {
                            onchange(state.textarea.value);
                        }
                    }, onkeyup: onkeyup
                        ? (ev) => {
                            onkeyup(ev, ev.target.value);
                        }
                        : undefined, onkeydown: onkeydown
                        ? (ev) => {
                            onkeydown(ev, ev.target.value);
                        }
                        : undefined, onkeypress: onkeypress
                        ? (ev) => {
                            onkeypress(ev, ev.target.value);
                        }
                        : undefined })),
                m(Label, {
                    label,
                    id,
                    isMandatory,
                    isActive: ((_a = state.textarea) === null || _a === void 0 ? void 0 : _a.value) || placeholder || state.active,
                    initialValue: initialValue !== undefined,
                }),
                m(HelperText, {
                    helperText,
                    dataError: state.hasInteracted && attrs.dataError ? attrs.dataError : undefined,
                    dataSuccess: state.hasInteracted && attrs.dataSuccess ? attrs.dataSuccess : undefined,
                }),
                maxLength
                    ? m(CharacterCounter, {
                        currentLength: state.currentLength,
                        maxLength,
                        show: state.currentLength > 0,
                    })
                    : undefined,
            ]);
        },
    };
};
/** Default component for all kinds of input fields. */
const InputField = (type, defaultClass = '') => () => {
    const state = {
        id: uniqueId(),
        currentLength: 0,
        hasInteracted: false,
        isValid: true,
        active: false,
        inputElement: null,
    };
    // let labelManager: { updateLabelState: () => void; cleanup: () => void } | null = null;
    // let lengthUpdateHandler: (() => void) | null = null;
    // let inputElement: HTMLInputElement | null = null;
    const getValue = (target) => {
        const val = target.value;
        return (val ? (type === 'number' || type === 'range' ? +val : val) : val);
    };
    const setValidity = (target, validationResult) => {
        if (typeof validationResult === 'boolean') {
            target.setCustomValidity(validationResult ? '' : 'Custom validation failed');
        }
        else {
            target.setCustomValidity(validationResult);
        }
    };
    const focus = ({ autofocus }) => autofocus ? (typeof autofocus === 'boolean' ? autofocus : autofocus()) : false;
    const lengthUpdateHandler = () => {
        var _a;
        const length = (_a = state.inputElement) === null || _a === void 0 ? void 0 : _a.value.length;
        if (length) {
            state.currentLength = length;
            state.hasInteracted = length > 0;
        }
    };
    return {
        view: ({ attrs }) => {
            var _a;
            const { className = 'col s12', dataError, dataSuccess, helperText, iconName, id = state.id, initialValue, placeholder, isMandatory, label, maxLength, newRow, oninput, onchange, onkeydown, onkeypress, onkeyup, style, validate } = attrs, params = __rest(attrs, ["className", "dataError", "dataSuccess", "helperText", "iconName", "id", "initialValue", "placeholder", "isMandatory", "label", "maxLength", "newRow", "oninput", "onchange", "onkeydown", "onkeypress", "onkeyup", "style", "validate"]);
            // const attributes = toAttrs(params);
            const cn = [newRow ? 'clear' : '', defaultClass, className].filter(Boolean).join(' ').trim();
            const isActive = state.active || ((_a = state.inputElement) === null || _a === void 0 ? void 0 : _a.value) || placeholder || type === 'color' || type === 'range'
                ? true
                : false;
            return m('.input-field', { className: cn, style }, [
                iconName ? m('i.material-icons.prefix', iconName) : undefined,
                m('input.validate', Object.assign(Object.assign({}, params), { type, tabindex: 0, id, 
                    // attributes,
                    oncreate: ({ dom }) => {
                        const input = (state.inputElement = dom);
                        if (focus(attrs)) {
                            input.focus();
                        }
                        // Set initial value if provided
                        if (initialValue) {
                            input.value = String(initialValue);
                        }
                        // Update character count state for counter component
                        if (maxLength) {
                            state.currentLength = input.value.length; // Initial count
                        }
                        // Range input functionality
                        if (type === 'range') {
                            const updateThumb = () => {
                                const value = input.value;
                                const min = input.min || '0';
                                const max = input.max || '100';
                                const percentage = ((parseFloat(value) - parseFloat(min)) / (parseFloat(max) - parseFloat(min))) * 100;
                                input.style.setProperty('--range-progress', `${percentage}%`);
                            };
                            input.addEventListener('input', updateThumb);
                            updateThumb(); // Initial position
                        }
                    }, onkeyup: onkeyup
                        ? (ev) => {
                            onkeyup(ev, getValue(ev.target));
                        }
                        : undefined, onkeydown: onkeydown
                        ? (ev) => {
                            onkeydown(ev, getValue(ev.target));
                        }
                        : undefined, onkeypress: onkeypress
                        ? (ev) => {
                            onkeypress(ev, getValue(ev.target));
                        }
                        : undefined, onupdate: validate
                        ? ({ dom }) => {
                            const target = dom;
                            setValidity(target, validate(getValue(target), target));
                        }
                        : undefined, oninput: (e) => {
                        state.active = true;
                        const target = e.target;
                        // Handle original oninput logic
                        const value = getValue(target);
                        if (oninput) {
                            oninput(value);
                        }
                        if (maxLength) {
                            lengthUpdateHandler();
                        }
                        // Don't validate on input, only clear error states if user is typing
                        if (validate && target.classList.contains('invalid') && target.value.length > 0) {
                            const validationResult = validate(value, target);
                            if (typeof validationResult === 'boolean' && validationResult) {
                                target.classList.remove('invalid');
                                target.classList.add('valid');
                                state.isValid = true;
                            }
                            else if (typeof validationResult === 'string' && validationResult === '') {
                                target.classList.remove('invalid');
                                target.classList.add('valid');
                                state.isValid = true;
                            }
                        }
                    }, onfocus: () => {
                        state.active = true;
                    }, onblur: (e) => {
                        state.active = false;
                        const target = e.target;
                        state.hasInteracted = true;
                        if (target && validate) {
                            const value = getValue(target);
                            // Only validate if user has entered some text
                            if (value && String(value).length > 0) {
                                const validationResult = validate(value, target);
                                state.isValid = typeof validationResult === 'boolean' ? validationResult : false;
                                setValidity(target, validationResult);
                                // Update visual validation state
                                if (typeof validationResult === 'boolean') {
                                    if (validationResult) {
                                        target.classList.remove('invalid');
                                        target.classList.add('valid');
                                    }
                                    else {
                                        target.classList.remove('valid');
                                        target.classList.add('invalid');
                                    }
                                }
                                else if (typeof validationResult === 'string') {
                                    target.classList.remove('valid');
                                    target.classList.add('invalid');
                                    state.isValid = false;
                                }
                            }
                            else {
                                // Clear validation state if no text
                                target.classList.remove('valid', 'invalid');
                                state.isValid = true;
                            }
                        }
                        // Also call the original onblur handler if provided
                        if (attrs.onblur) {
                            attrs.onblur(e);
                        }
                        if (onchange && state.inputElement) {
                            onchange(getValue(state.inputElement));
                        }
                    } })),
                m(Label, {
                    label,
                    id,
                    isMandatory,
                    isActive,
                    initialValue: initialValue !== undefined,
                }),
                m(HelperText, {
                    helperText,
                    dataError: state.hasInteracted && !state.isValid ? dataError : undefined,
                    dataSuccess: state.hasInteracted && state.isValid ? dataSuccess : undefined,
                }),
                maxLength
                    ? m(CharacterCounter, {
                        currentLength: state.currentLength,
                        maxLength,
                        show: state.currentLength > 0,
                    })
                    : undefined,
            ]);
        },
    };
};
/** Component for entering some text */
const TextInput = InputField('text');
/** Component for entering a password */
const PasswordInput = InputField('password');
/** Component for entering a number */
const NumberInput = InputField('number');
/** Component for entering a URL */
const UrlInput = InputField('url');
/** Component for entering a color */
const ColorInput = InputField('color');
/** Component for entering a range */
const RangeInput = InputField('range', '.range-field');
/** Component for entering an email */
const EmailInput = InputField('email');
/** Component for uploading a file */
const FileInput = () => {
    let canClear = false;
    let i;
    return {
        view: ({ attrs }) => {
            const { multiple, disabled, initialValue, placeholder, onchange, className = 'col s12', accept: acceptedFiles, label = 'File', } = attrs;
            const accept = acceptedFiles
                ? acceptedFiles instanceof Array
                    ? acceptedFiles.join(', ')
                    : acceptedFiles
                : undefined;
            return m('.file-field.input-field', {
                className: attrs.class || className,
            }, [
                m('.btn', [
                    m('span', label),
                    m('input[type=file]', {
                        title: label,
                        accept,
                        multiple,
                        disabled,
                        onchange: onchange
                            ? (e) => {
                                const i = e.target;
                                if (i && i.files && onchange) {
                                    canClear = true;
                                    onchange(i.files);
                                }
                            }
                            : undefined,
                    }),
                ]),
                m('.file-path-wrapper', m('input.file-path.validate[type=text]', {
                    placeholder,
                    oncreate: ({ dom }) => {
                        i = dom;
                        if (initialValue)
                            i.value = initialValue;
                    },
                })),
                (canClear || (i === null || i === void 0 ? void 0 : i.value)) &&
                    m('a.waves-effect.waves-teal.btn-flat', {
                        style: {
                            float: 'right',
                            position: 'relative',
                            top: '-3rem',
                            padding: 0,
                        },
                        onclick: () => {
                            canClear = false;
                            i.value = '';
                            onchange && onchange({});
                        },
                    }, m(MaterialIcon, {
                        name: 'close',
                        className: 'close',
                    })),
            ]);
        },
    };
};

/** Component to show a check box */
const InputCheckbox = () => {
    return {
        view: ({ attrs: { className = 'col s12', onchange, label, checked, disabled, description, style, inputId } }) => {
            const checkboxId = inputId || uniqueId();
            return m(`p`, { className, style }, m('label', { for: checkboxId }, [
                m('input[type=checkbox][tabindex=0]', {
                    id: checkboxId,
                    checked,
                    disabled,
                    onclick: onchange
                        ? (e) => {
                            if (e.target && typeof e.target.checked !== 'undefined') {
                                onchange(e.target.checked);
                            }
                        }
                        : undefined,
                }),
                label ? (typeof label === 'string' ? m('span', label) : label) : undefined,
            ]), description && m(HelperText, { className: 'input-checkbox-desc', helperText: description }));
        },
    };
};
/** A list of checkboxes */
const Options = () => {
    const state = {};
    const isChecked = (id) => state.checkedIds.indexOf(id) >= 0;
    const selectAll = (options, callback) => {
        const allIds = options.map((option) => option.id);
        state.checkedIds = [...allIds];
        if (callback)
            callback(allIds);
    };
    const selectNone = (callback) => {
        state.checkedIds = [];
        if (callback)
            callback([]);
    };
    return {
        oninit: ({ attrs: { initialValue, checkedId, id } }) => {
            const iv = checkedId || initialValue;
            state.checkedId = checkedId;
            state.checkedIds = iv ? (iv instanceof Array ? [...iv] : [iv]) : [];
            state.componentId = id || uniqueId();
        },
        view: ({ attrs: { label, options, description, className = 'col s12', style, disabled, checkboxClass, newRow, isMandatory, layout = 'vertical', showSelectAll = false, onchange: callback, }, }) => {
            const onchange = callback
                ? (propId, checked) => {
                    const checkedIds = state.checkedIds.filter((i) => i !== propId);
                    if (checked) {
                        checkedIds.push(propId);
                    }
                    state.checkedIds = checkedIds;
                    callback(checkedIds);
                }
                : undefined;
            const cn = [newRow ? 'clear' : '', className].filter(Boolean).join(' ').trim();
            const optionsContent = layout === 'horizontal'
                ? m('div.grid-container', options.map((option) => m(InputCheckbox, {
                    disabled: disabled || option.disabled,
                    label: option.label,
                    onchange: onchange ? (v) => onchange(option.id, v) : undefined,
                    className: option.className || checkboxClass,
                    checked: isChecked(option.id),
                    description: option.description,
                    inputId: `${state.componentId}-${option.id}`,
                })))
                : options.map((option) => m(InputCheckbox, {
                    disabled: disabled || option.disabled,
                    label: option.label,
                    onchange: onchange ? (v) => onchange(option.id, v) : undefined,
                    className: option.className || checkboxClass,
                    checked: isChecked(option.id),
                    description: option.description,
                    inputId: `${state.componentId}-${option.id}`,
                }));
            return m('div', { id: state.componentId, className: cn, style }, [
                label && m('h5.form-group-label', label + (isMandatory ? ' *' : '')),
                showSelectAll &&
                    m('div.select-all-controls', { style: 'margin-bottom: 10px;' }, [
                        m('a', {
                            href: '#',
                            onclick: (e) => {
                                e.preventDefault();
                                selectAll(options, callback);
                            },
                            style: 'margin-right: 15px;',
                        }, 'Select All'),
                        m('a', {
                            href: '#',
                            onclick: (e) => {
                                e.preventDefault();
                                selectNone(callback);
                            },
                        }, 'Select None'),
                    ]),
                description && m(HelperText, { helperText: description }),
                m('form', { action: '#' }, optionsContent),
            ]);
        },
    };
};

const GlobalSearch = () => {
    return () => {
        return {
            view: ({ attrs }) => {
                const { enableGlobalSearch, searchPlaceholder, searchTerm, onSearch } = attrs;
                if (!enableGlobalSearch)
                    return null;
                return m('.datatable-search', m(TextInput, {
                    label: 'Search',
                    placeholder: searchPlaceholder || 'Search table...',
                    initialValue: searchTerm || '',
                    oninput: onSearch
                }));
            }
        };
    };
};
const TableHeader = () => {
    return () => {
        return {
            view: ({ attrs }) => {
                const { columns, selection, sort, allSelected, helpers } = attrs;
                return m('thead', m('tr', [
                    // Selection column header
                    ...(selection && selection.mode !== 'none' ? [
                        m('th.selection-checkbox', [
                            selection.mode === 'multiple' && m(InputCheckbox, {
                                checked: allSelected,
                                onchange: helpers.handleSelectAll,
                                className: ''
                            })
                        ])
                    ] : []),
                    // Regular columns
                    ...columns.map((column) => {
                        const isSorted = (sort === null || sort === void 0 ? void 0 : sort.column) === column.key;
                        const sortDirection = isSorted ? sort.direction : null;
                        return m('th', {
                            class: [
                                column.headerClassName,
                                column.sortable ? 'sortable' : '',
                                isSorted ? `sorted-${sortDirection}` : ''
                            ].filter(Boolean).join(' '),
                            style: column.width ? { width: column.width } : undefined,
                            onclick: column.sortable ? () => helpers.handleSort(column.key) : undefined
                        }, [
                            column.title,
                            column.sortable && m('.sort-indicators', [
                                m('span.sort-icon.sort-asc', {
                                    className: isSorted && sortDirection === 'asc' ? 'active' : ''
                                }, '▲'),
                                m('span.sort-icon.sort-desc', {
                                    className: isSorted && sortDirection === 'desc' ? 'active' : ''
                                }, '▼')
                            ])
                        ]);
                    })
                ]));
            }
        };
    };
};
const TableRow = () => {
    return () => {
        return {
            view: ({ attrs }) => {
                const { row, index, columns, selection, onRowClick, onRowDoubleClick, getRowClassName, helpers, data } = attrs;
                // Calculate the original data index for the row key
                const originalIndex = data.findIndex((originalRow) => originalRow === row);
                const rowKey = (selection === null || selection === void 0 ? void 0 : selection.getRowKey(row, originalIndex)) || String(originalIndex);
                const isSelected = (selection === null || selection === void 0 ? void 0 : selection.selectedKeys.includes(rowKey)) || false;
                return m('tr', {
                    class: [
                        getRowClassName ? getRowClassName(row, index) : '',
                        isSelected ? 'selected' : ''
                    ].filter(Boolean).join(' '),
                    onclick: onRowClick ? (e) => onRowClick(row, index, e) : undefined,
                    ondblclick: onRowDoubleClick ? (e) => onRowDoubleClick(row, index, e) : undefined
                }, [
                    // Selection column
                    ...(selection && selection.mode !== 'none' ? [
                        m('td.selection-checkbox', [
                            m(InputCheckbox, {
                                checked: isSelected,
                                onchange: (checked) => helpers.handleSelectionChange(rowKey, checked),
                                className: ''
                            })
                        ])
                    ] : []),
                    // Regular columns
                    ...columns.map((column) => {
                        const value = helpers.getCellValue(row, column);
                        const cellContent = column.render ? column.render(value, row, index) : String(value || '');
                        return m('td', {
                            class: [
                                column.className,
                                column.align ? `align-${column.align}` : ''
                            ].filter(Boolean).join(' ')
                        }, cellContent);
                    })
                ]);
            }
        };
    };
};
const Pagination$1 = () => {
    return {
        view: ({ attrs }) => {
            const { pagination, onPaginationChange } = attrs;
            if (!pagination)
                return null;
            const { page, pageSize, total } = pagination;
            const totalPages = Math.ceil(total / pageSize);
            const startItem = page * pageSize + 1;
            const endItem = Math.min((page + 1) * pageSize, total);
            return m('.datatable-pagination', [
                m('.pagination-info', `Showing ${startItem} to ${endItem} of ${total} entries`),
                m('.pagination-controls', [
                    m('button.btn-flat', {
                        disabled: page === 0,
                        onclick: () => onPaginationChange(Object.assign(Object.assign({}, pagination), { page: 0 }))
                    }, '⏮'),
                    m('button.btn-flat', {
                        disabled: page === 0,
                        onclick: () => onPaginationChange(Object.assign(Object.assign({}, pagination), { page: page - 1 }))
                    }, '◀'),
                    m('span.page-info', `Page ${page + 1} of ${totalPages}`),
                    m('button.btn-flat', {
                        disabled: page >= totalPages - 1,
                        onclick: () => onPaginationChange(Object.assign(Object.assign({}, pagination), { page: page + 1 }))
                    }, '▶'),
                    m('button.btn-flat', {
                        disabled: page >= totalPages - 1,
                        onclick: () => onPaginationChange(Object.assign(Object.assign({}, pagination), { page: totalPages - 1 }))
                    }, '⏭')
                ])
            ]);
        }
    };
};
const DataTable = () => {
    // Helper functions
    const quickDataHash = (data) => {
        if (data.length === 0)
            return '0';
        if (data.length === 1)
            return '1';
        // Sample first, middle, and last items for quick hash
        const first = JSON.stringify(data[0]);
        const middle = data.length > 2 ? JSON.stringify(data[Math.floor(data.length / 2)]) : '';
        const last = JSON.stringify(data[data.length - 1]);
        return `${data.length}-${first.length}-${middle.length}-${last.length}`;
    };
    const getDataHash = (vnode) => {
        const { data, sort, filter, pagination } = vnode.attrs;
        const { internalSort, internalFilter, internalPagination } = vnode.state;
        const hashInputs = {
            dataLength: data.length,
            dataHash: quickDataHash(data),
            sort: sort || internalSort,
            filter: filter || internalFilter,
            pagination: pagination || internalPagination,
        };
        return JSON.stringify(hashInputs);
    };
    const initVirtualScrolling = (vnode) => {
        var _a;
        const { rowHeight = 48, virtualBuffer = 5 } = vnode.attrs;
        const containerHeight = parseInt(((_a = vnode.attrs.height) === null || _a === void 0 ? void 0 : _a.replace('px', '')) || '400');
        vnode.state.virtualScrolling = {
            startIndex: 0,
            endIndex: Math.ceil(containerHeight / rowHeight) + virtualBuffer,
            itemHeight: rowHeight,
            containerHeight,
            scrollTop: 0
        };
    };
    const updateVirtualScrolling = (scrollTop, vnode) => {
        const vs = vnode.state.virtualScrolling;
        if (!vs)
            return;
        const { itemHeight, containerHeight } = vs;
        const { virtualBuffer = 5 } = vnode.attrs;
        const visibleItemCount = Math.ceil(containerHeight / itemHeight);
        const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - virtualBuffer);
        const endIndex = Math.min(vnode.state.processedData.length, startIndex + visibleItemCount + virtualBuffer * 2);
        vs.startIndex = startIndex;
        vs.endIndex = endIndex;
        vs.scrollTop = scrollTop;
    };
    const getCellValue = (row, column) => {
        if (column.field) {
            return row[column.field];
        }
        return row;
    };
    const applyFiltering = (data, filter, columns) => {
        var _a;
        if (!filter.searchTerm && !filter.columnFilters)
            return data;
        const filterableColumns = columns.filter(col => col.filterable);
        if (filterableColumns.length === 0 && !filter.searchTerm)
            return data;
        const searchTerm = (_a = filter.searchTerm) === null || _a === void 0 ? void 0 : _a.toLowerCase();
        const hasColumnFilters = filter.columnFilters &&
            Object.keys(filter.columnFilters).some(key => {
                const value = filter.columnFilters[key];
                return value !== null && value !== undefined && value !== '';
            });
        return data.filter(row => {
            // Global search
            if (searchTerm) {
                const matchesGlobal = filterableColumns.some(column => {
                    const value = getCellValue(row, column);
                    if (value == null)
                        return false;
                    return String(value).toLowerCase().includes(searchTerm);
                });
                if (!matchesGlobal)
                    return false;
            }
            // Column-specific filters
            if (hasColumnFilters) {
                const matchesColumnFilters = Object.entries(filter.columnFilters).every(([columnKey, filterValue]) => {
                    if (filterValue === null || filterValue === undefined || filterValue === '')
                        return true;
                    const column = columns.find(col => col.key === columnKey);
                    if (!column)
                        return true;
                    const value = getCellValue(row, column);
                    if (value == null)
                        return false;
                    return String(value).toLowerCase().includes(String(filterValue).toLowerCase());
                });
                if (!matchesColumnFilters)
                    return false;
            }
            return true;
        });
    };
    const applySorting = (data, sort, columns) => {
        const column = columns.find(col => col.key === sort.column);
        if (!column || !column.sortable)
            return data;
        const multiplier = sort.direction === 'asc' ? 1 : -1;
        return [...data].sort((a, b) => {
            const aValue = getCellValue(a, column);
            const bValue = getCellValue(b, column);
            // Handle null/undefined values
            if (aValue == null && bValue == null)
                return 0;
            if (aValue == null)
                return -1 * multiplier;
            if (bValue == null)
                return 1 * multiplier;
            // Type-specific comparisons
            const aType = typeof aValue;
            const bType = typeof bValue;
            if (aType === bType) {
                if (aType === 'number') {
                    return (aValue - bValue) * multiplier;
                }
                if (aType === 'boolean') {
                    return (aValue === bValue ? 0 : aValue ? 1 : -1) * multiplier;
                }
                if (aValue instanceof Date && bValue instanceof Date) {
                    return (aValue.getTime() - bValue.getTime()) * multiplier;
                }
            }
            // Fallback to string comparison
            return String(aValue).localeCompare(String(bValue)) * multiplier;
        });
    };
    const processData = (vnode) => {
        const { data } = vnode.attrs;
        const { internalSort, internalFilter, internalPagination } = vnode.state;
        let processedData = [...data];
        // Apply filtering
        if (internalFilter) {
            processedData = applyFiltering(processedData, internalFilter, vnode.attrs.columns);
        }
        // Apply sorting
        if (internalSort) {
            processedData = applySorting(processedData, internalSort, vnode.attrs.columns);
        }
        // Update total count for pagination
        if (internalPagination) {
            vnode.state.internalPagination = Object.assign(Object.assign({}, internalPagination), { total: processedData.length });
        }
        // Apply pagination (only when virtual scrolling is not enabled)
        if (internalPagination && !vnode.attrs.virtualScrolling) {
            const { page, pageSize } = internalPagination;
            const start = page * pageSize;
            const end = start + pageSize;
            processedData = processedData.slice(start, end);
        }
        vnode.state.processedData = processedData;
    };
    return {
        oninit(vnode) {
            const { sort, filter, pagination } = vnode.attrs;
            vnode.state.tableId = uniqueId();
            vnode.state.internalSort = sort || undefined;
            vnode.state.internalFilter = filter || { searchTerm: '', columnFilters: {} };
            vnode.state.internalPagination = pagination || undefined;
            // Initialize virtual scrolling if enabled
            if (vnode.attrs.virtualScrolling) {
                initVirtualScrolling(vnode);
            }
            processData(vnode);
        },
        onbeforeupdate(vnode) {
            // Only reprocess data if inputs have changed
            const currentHash = getDataHash(vnode);
            if (currentHash !== vnode.state.lastProcessedHash) {
                processData(vnode);
                vnode.state.lastProcessedHash = currentHash;
            }
        },
        view(vnode) {
            const { loading, emptyMessage, striped, hoverable, responsive, centered, className, id, title, height, enableGlobalSearch, searchPlaceholder, selection, columns, onRowClick, onRowDoubleClick, getRowClassName, data, virtualScrolling, onPaginationChange } = vnode.attrs;
            const { processedData, tableId, internalFilter, internalSort, internalPagination } = vnode.state;
            if (loading) {
                return m('.datatable-loading', [
                    m('.preloader-wrapper.small.active', m('.spinner-layer.spinner-blue-only', m('.circle-clipper.left', m('.circle')))),
                    m('p', 'Loading...')
                ]);
            }
            // Create helpers object for FactoryComponents
            const helpers = {
                getCellValue,
                handleSort: (columnKey) => {
                    var _a, _b;
                    const column = columns.find(col => col.key === columnKey);
                    if (!column || !column.sortable)
                        return;
                    const currentSort = internalSort;
                    let newSort;
                    if ((currentSort === null || currentSort === void 0 ? void 0 : currentSort.column) === columnKey) {
                        // Toggle direction
                        if (currentSort.direction === 'asc') {
                            newSort = { column: columnKey, direction: 'desc' };
                        }
                        else {
                            newSort = { column: columnKey, direction: 'asc' };
                        }
                    }
                    else {
                        // New column sort
                        newSort = { column: columnKey, direction: 'asc' };
                    }
                    vnode.state.internalSort = newSort;
                    (_b = (_a = vnode.attrs).onSortChange) === null || _b === void 0 ? void 0 : _b.call(_a, newSort);
                },
                handleGlobalSearch: (searchTerm) => {
                    var _a, _b;
                    const newFilter = Object.assign(Object.assign({}, internalFilter), { searchTerm });
                    vnode.state.internalFilter = newFilter;
                    // Reset pagination to first page when filtering
                    if (internalPagination) {
                        vnode.state.internalPagination = Object.assign(Object.assign({}, internalPagination), { page: 0 });
                    }
                    (_b = (_a = vnode.attrs).onFilterChange) === null || _b === void 0 ? void 0 : _b.call(_a, newFilter);
                },
                handleSelectionChange: (rowKey, selected) => {
                    var _a;
                    if (!selection)
                        return;
                    let newSelectedKeys;
                    if (selection.mode === 'single') {
                        newSelectedKeys = selected ? [rowKey] : [];
                    }
                    else if (selection.mode === 'multiple') {
                        if (selected) {
                            newSelectedKeys = [...selection.selectedKeys, rowKey];
                        }
                        else {
                            newSelectedKeys = selection.selectedKeys.filter(key => key !== rowKey);
                        }
                    }
                    else {
                        return; // No selection mode
                    }
                    // Get selected rows
                    const selectedRows = data.filter((row, index) => {
                        const key = selection.getRowKey(row, index);
                        return newSelectedKeys.includes(key);
                    });
                    (_a = selection.onSelectionChange) === null || _a === void 0 ? void 0 : _a.call(selection, newSelectedKeys, selectedRows);
                },
                handleSelectAll: (selected) => {
                    var _a;
                    if (!selection || selection.mode !== 'multiple')
                        return;
                    let newSelectedKeys;
                    if (selected) {
                        // Select all visible rows
                        newSelectedKeys = processedData.map((row) => {
                            const originalIndex = data.findIndex(originalRow => originalRow === row);
                            return selection.getRowKey(row, originalIndex);
                        });
                    }
                    else {
                        newSelectedKeys = [];
                    }
                    const selectedRows = data.filter((row, index) => {
                        const key = selection.getRowKey(row, index);
                        return newSelectedKeys.includes(key);
                    });
                    (_a = selection.onSelectionChange) === null || _a === void 0 ? void 0 : _a.call(selection, newSelectedKeys, selectedRows);
                }
            };
            // Calculate selection state for "select all" checkbox
            let allSelected = false;
            let someSelected = false;
            if (selection && selection.mode === 'multiple') {
                const visibleRowKeys = processedData.map((row) => {
                    const originalIndex = data.findIndex(originalRow => originalRow === row);
                    return selection.getRowKey(row, originalIndex);
                });
                const selectedVisibleKeys = visibleRowKeys.filter(key => selection.selectedKeys.includes(key));
                allSelected = visibleRowKeys.length > 0 && selectedVisibleKeys.length === visibleRowKeys.length;
                someSelected = selectedVisibleKeys.length > 0 && selectedVisibleKeys.length < visibleRowKeys.length;
            }
            const tableClasses = [
                'datatable',
                striped ? 'striped' : '',
                hoverable ? 'highlight' : '',
                responsive ? 'responsive-table' : '',
                centered ? 'centered' : '',
                className || ''
            ].filter(Boolean).join(' ');
            // Render table content
            const renderTableContent = () => {
                if (virtualScrolling && processedData.length > 100) {
                    const vs = vnode.state.virtualScrolling;
                    if (!vs)
                        return null;
                    const { startIndex, endIndex, itemHeight } = vs;
                    const visibleData = processedData.slice(startIndex, endIndex);
                    const totalHeight = processedData.length * itemHeight;
                    const offsetY = startIndex * itemHeight;
                    return m('.virtual-table-container', {
                        style: { height: height || '400px' },
                        onscroll: (e) => {
                            const target = e.target;
                            updateVirtualScrolling(target.scrollTop, vnode);
                            m.redraw();
                        }
                    }, [
                        // Table header (fixed)
                        m(`table.${tableClasses}`, {
                            style: { marginBottom: '0' }
                        }, [
                            m(TableHeader(), {
                                columns,
                                selection,
                                sort: internalSort,
                                allSelected,
                                someSelected,
                                helpers
                            })
                        ]),
                        // Virtual scrolled body
                        m('.virtual-table-body', {
                            style: {
                                height: `${totalHeight}px`,
                                position: 'relative'
                            }
                        }, [
                            m(`table.${tableClasses}`, {
                                style: {
                                    position: 'absolute',
                                    top: `${offsetY}px`,
                                    width: '100%',
                                    marginTop: '0'
                                }
                            }, [
                                m('tbody', visibleData.map((row, index) => m(TableRow(), {
                                    key: `${startIndex + index}`,
                                    row,
                                    index: startIndex + index,
                                    columns,
                                    selection,
                                    onRowClick,
                                    onRowDoubleClick,
                                    getRowClassName,
                                    helpers,
                                    data
                                })))
                            ])
                        ])
                    ]);
                }
                return m('.table-wrapper', [
                    m(`table.${tableClasses}`, [
                        m(TableHeader(), {
                            columns,
                            selection,
                            sort: internalSort,
                            allSelected,
                            someSelected,
                            helpers
                        }),
                        m('tbody', processedData.map((row, index) => m(TableRow(), {
                            key: (selection === null || selection === void 0 ? void 0 : selection.getRowKey(row, data.findIndex(originalRow => originalRow === row))) || index,
                            row,
                            index,
                            columns,
                            selection,
                            onRowClick,
                            onRowDoubleClick,
                            getRowClassName,
                            helpers,
                            data
                        })))
                    ])
                ]);
            };
            return m('.datatable-container', {
                id: id || tableId
            }, [
                title && m('h5.datatable-title', title),
                m(GlobalSearch(), {
                    enableGlobalSearch,
                    searchPlaceholder,
                    searchTerm: internalFilter === null || internalFilter === void 0 ? void 0 : internalFilter.searchTerm,
                    onSearch: helpers.handleGlobalSearch
                }),
                m('.datatable-wrapper', {
                    style: height ? `height: ${height}` : undefined
                }, processedData.length === 0 ?
                    m('.datatable-empty', emptyMessage || 'No data available') :
                    renderTableContent()),
                m(Pagination$1, {
                    pagination: virtualScrolling ? undefined : internalPagination,
                    onPaginationChange: (pagination) => {
                        vnode.state.internalPagination = pagination;
                        onPaginationChange === null || onPaginationChange === void 0 ? void 0 : onPaginationChange(pagination);
                    }
                })
            ]);
        }
    };
};

/** Pure TypeScript Dropdown component - no Materialize dependencies */
const Dropdown = () => {
    const state = {
        isOpen: false,
        initialValue: undefined,
        id: '',
        focusedIndex: -1,
        inputRef: null,
        dropdownRef: null,
    };
    const handleKeyDown = (e, items, onchange) => {
        const availableItems = items.filter((item) => !item.divider && !item.disabled);
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (!state.isOpen) {
                    state.isOpen = true;
                    state.focusedIndex = 0;
                }
                else {
                    state.focusedIndex = Math.min(state.focusedIndex + 1, availableItems.length - 1);
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (state.isOpen) {
                    state.focusedIndex = Math.max(state.focusedIndex - 1, 0);
                }
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (state.isOpen && state.focusedIndex >= 0 && state.focusedIndex < availableItems.length) {
                    const selectedItem = availableItems[state.focusedIndex];
                    const value = (selectedItem.id || selectedItem.label);
                    state.initialValue = value;
                    state.isOpen = false;
                    state.focusedIndex = -1;
                    if (onchange)
                        onchange(value);
                }
                else if (!state.isOpen) {
                    state.isOpen = true;
                    state.focusedIndex = 0;
                }
                break;
            case 'Escape':
                e.preventDefault();
                state.isOpen = false;
                state.focusedIndex = -1;
                break;
        }
    };
    return {
        oninit: ({ attrs: { id = uniqueId(), initialValue, checkedId } }) => {
            state.id = id;
            state.initialValue = initialValue || checkedId;
            // Mithril will handle click events through the component structure
        },
        view: ({ attrs: { key, label, onchange, disabled = false, items, iconName, helperText, style, className = 'col s12' }, }) => {
            const { initialValue } = state;
            const selectedItem = initialValue
                ? items.filter((i) => (i.id ? i.id === initialValue : i.label === initialValue)).shift()
                : undefined;
            const title = selectedItem ? selectedItem.label : label || 'Select';
            const availableItems = items.filter((item) => !item.divider && !item.disabled);
            return m('.dropdown-wrapper.input-field', { className, key, style }, [
                iconName ? m('i.material-icons.prefix', iconName) : undefined,
                m(HelperText, { helperText }),
                m('.select-wrapper', {
                    onclick: disabled
                        ? undefined
                        : () => {
                            state.isOpen = !state.isOpen;
                            state.focusedIndex = state.isOpen ? 0 : -1;
                        },
                    onkeydown: disabled ? undefined : (e) => handleKeyDown(e, items, onchange),
                    tabindex: disabled ? -1 : 0,
                    'aria-expanded': state.isOpen ? 'true' : 'false',
                    'aria-haspopup': 'listbox',
                    role: 'combobox',
                }, [
                    m('input[type=text][readonly=true].select-dropdown.dropdown-trigger', {
                        id: state.id,
                        value: title,
                        oncreate: ({ dom }) => {
                            state.inputRef = dom;
                        },
                        onclick: (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (!disabled) {
                                state.isOpen = !state.isOpen;
                                state.focusedIndex = state.isOpen ? 0 : -1;
                            }
                        },
                    }),
                    // Dropdown Menu using Select component's positioning logic
                    state.isOpen &&
                        m('ul.dropdown-content.select-dropdown', {
                            tabindex: 0,
                            role: 'listbox',
                            'aria-labelledby': state.id,
                            oncreate: ({ dom }) => {
                                state.dropdownRef = dom;
                            },
                            onremove: () => {
                                state.dropdownRef = null;
                            },
                            style: getDropdownStyles(state.inputRef, true, items.map((item) => (Object.assign(Object.assign({}, item), { 
                                // Convert dropdown items to format expected by getDropdownStyles
                                group: undefined }))), true),
                        }, items.map((item, index) => {
                            if (item.divider) {
                                return m('li.divider', {
                                    key: `divider-${index}`,
                                });
                            }
                            const itemIndex = availableItems.indexOf(item);
                            const isFocused = itemIndex === state.focusedIndex;
                            return m('li', Object.assign({ key: item.id || `item-${index}`, class: [
                                    item.disabled ? 'disabled' : '',
                                    isFocused ? 'focused' : '',
                                    (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.id) === item.id || (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.label) === item.label ? 'selected' : '',
                                ]
                                    .filter(Boolean)
                                    .join(' ') }, (item.disabled
                                ? {}
                                : {
                                    onclick: (e) => {
                                        e.stopPropagation();
                                        const value = (item.id || item.label);
                                        state.initialValue = value;
                                        state.isOpen = false;
                                        state.focusedIndex = -1;
                                        if (onchange)
                                            onchange(value);
                                    },
                                })), m('span', {
                                style: {
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '14px 16px',
                                },
                            }, [
                                item.iconName
                                    ? m('i.material-icons', {
                                        style: { marginRight: '32px' },
                                    }, item.iconName)
                                    : undefined,
                                item.label,
                            ]));
                        })),
                    m(MaterialIcon, {
                        name: 'caret',
                        direction: 'down',
                        class: 'caret',
                    }),
                ]),
            ]);
        },
    };
};

/**
 * Floating Action Button
 */
const FloatingActionButton = () => {
    const state = {
        isOpen: false,
    };
    const handleClickOutside = (e) => {
        const target = e.target;
        if (!target.closest('.fixed-action-btn')) {
            state.isOpen = false;
        }
    };
    return {
        oncreate: () => {
            document.addEventListener('click', handleClickOutside);
        },
        onremove: () => {
            document.removeEventListener('click', handleClickOutside);
        },
        view: ({ attrs: { className, iconName, iconClass, position, style = position === 'left' || position === 'inline-left'
            ? 'position: absolute; display: inline-block; left: 24px;'
            : position === 'right' || position === 'inline-right'
                ? 'position: absolute; display: inline-block; right: 24px;'
                : undefined, buttons, direction = 'top', hoverEnabled = true, }, }) => {
            const fabClasses = [
                'fixed-action-btn',
                direction ? `direction-${direction}` : '',
                state.isOpen ? 'active' : '',
                // hoverEnabled ? 'hover-enabled' : '',
            ]
                .filter(Boolean)
                .join(' ');
            return m('div', {
                style: position === 'inline-right' || position === 'inline-left' ? 'position: relative; height: 70px;' : undefined,
            }, m(`.${fabClasses}`, {
                style,
                onclick: (e) => {
                    e.stopPropagation();
                    if (buttons && buttons.length > 0) {
                        state.isOpen = !state.isOpen;
                    }
                },
                onmouseover: hoverEnabled
                    ? () => {
                        if (buttons && buttons.length > 0) {
                            state.isOpen = true;
                        }
                    }
                    : undefined,
                onmouseleave: hoverEnabled
                    ? () => {
                        state.isOpen = false;
                    }
                    : undefined,
            }, [
                m('a.btn-floating.btn-large', {
                    className,
                }, m('i.material-icons', { className: iconClass }, iconName)),
                buttons &&
                    buttons.length > 0 &&
                    m('ul', buttons.map((button, index) => m('li', m(`a.btn-floating.${button.className || 'red'}`, {
                        style: {
                            opacity: state.isOpen ? '1' : '0',
                            transform: state.isOpen ? 'scale(1)' : 'scale(0.4)',
                            transition: `all 0.3s ease ${index * 40}ms`,
                        },
                        onclick: (e) => {
                            e.stopPropagation();
                            if (button.onClick)
                                button.onClick(e);
                        },
                    }, m('i.material-icons', { className: button.iconClass }, button.iconName))))),
            ]));
        },
    };
};

/**
 * Pure TypeScript MaterialBox - creates an image lightbox that fills the screen when clicked
 * No MaterializeCSS dependencies
 */
const MaterialBox = () => {
    const state = {
        isOpen: false,
        originalImage: null,
        overlay: null,
        overlayImage: null,
    };
    const openBox = (img, attrs) => {
        if (state.isOpen)
            return;
        state.isOpen = true;
        state.originalImage = img;
        if (attrs.onOpenStart)
            attrs.onOpenStart();
        // Create overlay
        const overlay = document.createElement('div');
        overlay.className = 'materialbox-overlay';
        overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.85);
      z-index: 1000;
      opacity: 0;
      transition: opacity ${attrs.inDuration || 275}ms ease;
      cursor: zoom-out;
    `;
        // Create enlarged image
        const enlargedImg = document.createElement('img');
        enlargedImg.src = img.src;
        enlargedImg.alt = img.alt || '';
        enlargedImg.className = 'materialbox-image';
        // Get original image dimensions and position
        const imgRect = img.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        // Calculate final size maintaining aspect ratio
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        const maxWidth = windowWidth * 0.9;
        const maxHeight = windowHeight * 0.9;
        let finalWidth = maxWidth;
        let finalHeight = maxWidth / aspectRatio;
        if (finalHeight > maxHeight) {
            finalHeight = maxHeight;
            finalWidth = maxHeight * aspectRatio;
        }
        // Set initial position and size (same as original image)
        enlargedImg.style.cssText = `
      position: fixed;
      top: ${imgRect.top}px;
      left: ${imgRect.left}px;
      width: ${imgRect.width}px;
      height: ${imgRect.height}px;
      transition: all ${attrs.inDuration || 275}ms ease;
      cursor: zoom-out;
      max-width: none;
      z-index: 1001;
    `;
        // Add caption if provided
        let caption = null;
        if (attrs.caption) {
            caption = document.createElement('div');
            caption.className = 'materialbox-caption';
            caption.textContent = attrs.caption;
            caption.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-size: 16px;
        text-align: center;
        opacity: 0;
        transition: opacity ${attrs.inDuration || 275}ms ease ${attrs.inDuration || 275}ms;
        z-index: 1002;
        pointer-events: none;
      `;
        }
        // Add to DOM
        document.body.appendChild(overlay);
        document.body.appendChild(enlargedImg);
        if (caption)
            document.body.appendChild(caption);
        // Store references
        state.overlay = overlay;
        state.overlayImage = enlargedImg;
        // Prevent body scrolling
        document.body.style.overflow = 'hidden';
        // Trigger animations
        requestAnimationFrame(() => {
            overlay.style.opacity = '1';
            enlargedImg.style.top = `${(windowHeight - finalHeight) / 2}px`;
            enlargedImg.style.left = `${(windowWidth - finalWidth) / 2}px`;
            enlargedImg.style.width = `${finalWidth}px`;
            enlargedImg.style.height = `${finalHeight}px`;
            if (caption) {
                caption.style.opacity = '1';
            }
        });
        // Add close handlers
        const closeHandler = () => closeBox(attrs);
        overlay.addEventListener('click', closeHandler);
        enlargedImg.addEventListener('click', closeHandler);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape')
                closeHandler();
        });
        // Call onOpenEnd after animation
        setTimeout(() => {
            if (attrs.onOpenEnd)
                attrs.onOpenEnd();
        }, attrs.inDuration || 275);
    };
    const closeBox = (attrs) => {
        if (!state.isOpen || !state.originalImage || !state.overlay || !state.overlayImage)
            return;
        if (attrs.onCloseStart)
            attrs.onCloseStart();
        const originalRect = state.originalImage.getBoundingClientRect();
        // Animate back to original position
        state.overlay.style.opacity = '0';
        state.overlayImage.style.top = `${originalRect.top}px`;
        state.overlayImage.style.left = `${originalRect.left}px`;
        state.overlayImage.style.width = `${originalRect.width}px`;
        state.overlayImage.style.height = `${originalRect.height}px`;
        // Hide caption
        const caption = document.querySelector('.materialbox-caption');
        if (caption) {
            caption.style.opacity = '0';
        }
        // Clean up after animation
        setTimeout(() => {
            if (state.overlay) {
                document.body.removeChild(state.overlay);
                state.overlay = null;
            }
            if (state.overlayImage) {
                document.body.removeChild(state.overlayImage);
                state.overlayImage = null;
            }
            if (caption) {
                document.body.removeChild(caption);
            }
            // Restore body scroll
            document.body.style.overflow = '';
            state.isOpen = false;
            state.originalImage = null;
            if (attrs.onCloseEnd)
                attrs.onCloseEnd();
        }, attrs.outDuration || 200);
    };
    return {
        onremove: () => {
            // Clean up if component is removed while open
            if (state.isOpen) {
                if (state.overlay)
                    document.body.removeChild(state.overlay);
                if (state.overlayImage)
                    document.body.removeChild(state.overlayImage);
                const caption = document.querySelector('.materialbox-caption');
                if (caption)
                    document.body.removeChild(caption);
                document.body.style.overflow = '';
            }
        },
        view: ({ attrs }) => {
            const { src, alt, width, height, caption, className, style } = attrs, otherAttrs = __rest(attrs, ["src", "alt", "width", "height", "caption", "className", "style"]);
            return m('img.materialboxed', Object.assign(Object.assign({}, otherAttrs), { src, alt: alt || '', width,
                height, className: ['materialboxed', className].filter(Boolean).join(' '), style: Object.assign({ cursor: 'zoom-in', transition: 'opacity 200ms ease' }, style), onclick: (e) => {
                    e.preventDefault();
                    openBox(e.target, attrs);
                } }));
        },
    };
};

/**
 * CSS-only Modal Panel component - no JavaScript dependencies
 * Uses modern CSS techniques for modal functionality
 */
const ModalPanel = () => {
    const state = {
        isOpen: false,
        id: '',
    };
    let keydownHandler = null;
    const closeModal = (attrs) => {
        state.isOpen = false;
        if (attrs.onToggle)
            attrs.onToggle(false);
        if (attrs.onClose)
            attrs.onClose();
        // Remove keyboard listener
        if (keydownHandler) {
            document.removeEventListener('keydown', keydownHandler);
            keydownHandler = null;
        }
        // Restore body scroll
        document.body.style.overflow = '';
    };
    const openModal = (attrs) => {
        state.isOpen = true;
        if (attrs.onToggle)
            attrs.onToggle(true);
        // Add keyboard listener
        keydownHandler = (e) => {
            if (e.key === 'Escape' && attrs.closeOnEsc !== false && state.isOpen) {
                closeModal(attrs);
            }
        };
        document.addEventListener('keydown', keydownHandler);
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    };
    return {
        oninit: ({ attrs }) => {
            state.id = attrs.id;
            if (attrs.isOpen) {
                openModal(attrs);
            }
        },
        onremove: () => {
            // Cleanup on component removal
            if (keydownHandler) {
                document.removeEventListener('keydown', keydownHandler);
                keydownHandler = null;
            }
            document.body.style.overflow = '';
        },
        view: ({ attrs }) => {
            // Sync external isOpen prop with internal state - do this in view for immediate response
            if (attrs.isOpen !== undefined && attrs.isOpen !== state.isOpen) {
                if (attrs.isOpen) {
                    openModal(attrs);
                }
                else {
                    closeModal(attrs);
                }
            }
            const { id, title, description, fixedFooter, bottomSheet, buttons, richContent, className, showCloseButton = true, closeOnBackdropClick = true, } = attrs;
            const modalClasses = [
                'modal',
                className || '',
                fixedFooter ? 'modal-fixed-footer' : '',
                bottomSheet ? 'bottom-sheet' : '',
                state.isOpen ? 'active' : '',
            ]
                .filter(Boolean)
                .join(' ')
                .trim();
            const overlayClasses = ['modal-overlay', state.isOpen ? 'active' : ''].filter(Boolean).join(' ').trim();
            return m('div', { className: 'modal-container' }, [
                // Modal overlay
                m('div', {
                    className: overlayClasses,
                    onclick: closeOnBackdropClick ? () => closeModal(attrs) : undefined,
                    style: {
                        display: state.isOpen ? 'block' : 'none',
                        position: 'fixed',
                        top: '0',
                        left: '0',
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: '1002',
                    },
                }),
                // Modal content
                m('div', {
                    id,
                    className: modalClasses,
                    'aria-hidden': state.isOpen ? 'false' : 'true',
                    role: 'dialog',
                    'aria-labelledby': `${id}-title`,
                    'aria-describedby': description ? `${id}-desc` : undefined,
                    style: {
                        display: state.isOpen ? 'block' : 'none',
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#fff',
                        borderRadius: '4px',
                        maxWidth: '75%',
                        maxHeight: '85%',
                        overflow: 'auto',
                        zIndex: '1003',
                        padding: '0',
                        boxShadow: '0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.20)',
                    },
                    onclick: (e) => e.stopPropagation(), // Prevent backdrop click when clicking inside modal
                }, [
                    // Close button
                    showCloseButton &&
                        m('button', {
                            className: 'modal-close btn-flat',
                            style: {
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                padding: '8px',
                                minWidth: 'auto',
                                lineHeight: 1,
                            },
                            onclick: () => closeModal(attrs),
                            'aria-label': 'Close modal',
                        }, '×'),
                    // Modal content
                    m('.modal-content', {
                        style: { padding: '24px', paddingTop: showCloseButton ? '48px' : '24px' },
                    }, [
                        m('h4', { id: `${id}-title`, style: { margin: '0 0 20px 0' } }, title),
                        description &&
                            m('div', Object.assign({ id: `${id}-desc` }, (richContent && typeof description === 'string' ? { innerHTML: description } : {})), richContent && typeof description === 'string' ? undefined : description),
                    ]),
                    // Modal footer with buttons
                    buttons &&
                        buttons.length > 0 &&
                        m('.modal-footer', {
                            style: {
                                padding: '4px 6px',
                                borderTop: '1px solid rgba(160,160,160,0.2)',
                                textAlign: 'right',
                            },
                        }, buttons.map((buttonProps) => m(FlatButton, Object.assign(Object.assign({}, buttonProps), { className: `modal-close ${buttonProps.className || ''}`, onclick: (e) => {
                                if (buttonProps.onclick)
                                    buttonProps.onclick(e);
                                closeModal(attrs);
                            } })))),
                ]),
            ]);
        },
    };
};

const PaginationItem = () => ({
    view: ({ attrs: { title, href, active, disabled } }) => m('li', { className: active ? 'active' : disabled ? 'disabled' : 'waves-effect' }, typeof title === 'number' ? m(m.route.Link, { href }, title) : title),
});
const Pagination = () => {
    const state = {
        pagIndex: 0,
    };
    return {
        view: ({ attrs: { items, curPage = 1, size = Math.min(9, items.length) } }) => {
            const { pagIndex } = state;
            const startPage = pagIndex * size;
            const endPage = startPage + size;
            const canGoBack = pagIndex > 0;
            const canGoForward = endPage < items.length;
            const displayedItems = [
                {
                    title: m('a', {
                        onclick: () => canGoBack && state.pagIndex--,
                    }, m('i.material-icons', 'chevron_left')),
                    disabled: !canGoBack,
                },
                ...items.filter((_, i) => startPage <= i && i < endPage),
                {
                    title: m('a', {
                        onclick: () => canGoForward && state.pagIndex++,
                    }, m('i.material-icons', 'chevron_right')),
                    disabled: !canGoForward,
                },
            ];
            return m('ul.pagination', displayedItems.map((item, i) => m(PaginationItem, Object.assign(Object.assign({ title: startPage + i }, item), { active: startPage + i === curPage }))));
        },
    };
};

/**
 * MaterializeCSS Parallax component with dynamic positioning
 * Port of the original MaterializeCSS parallax logic
 */
const Parallax = () => {
    let containerEl = null;
    let imgEl = null;
    let scrollThrottle = null;
    let lastScrollTop = -1;
    // MaterializeCSS parallax logic - exact port from original source
    const updateParallax = () => {
        var _a;
        if (!containerEl || !imgEl)
            return;
        const containerHeight = containerEl.offsetHeight > 0 ? containerEl.offsetHeight : ((_a = containerEl.parentElement) === null || _a === void 0 ? void 0 : _a.offsetHeight) || 1;
        const imgHeight = imgEl.offsetHeight;
        const parallaxDist = imgHeight - containerHeight;
        const bottom = containerEl.offsetTop + containerHeight;
        const top = containerEl.offsetTop;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        const windowHeight = window.innerHeight;
        const windowBottom = scrollTop + windowHeight;
        const percentScrolled = (windowBottom - top) / (containerHeight + windowHeight);
        // MaterializeCSS formula: start at negative parallaxDist/2, move toward positive parallaxDist/2
        const parallax = Math.round(parallaxDist * percentScrolled - parallaxDist / 2);
        // Only update if we're in the viewport and scroll position changed
        if (bottom > scrollTop && top < windowBottom && scrollTop !== lastScrollTop) {
            // Match MaterializeCSS transform format: translate3d(-50%, Ypx, 0px) with opacity
            imgEl.style.transform = `translate3d(-50%, ${parallax}px, 0px)`;
            imgEl.style.opacity = '1';
            lastScrollTop = scrollTop;
        }
    };
    const handleScroll = () => {
        if (scrollThrottle)
            return;
        scrollThrottle = requestAnimationFrame(() => {
            updateParallax();
            scrollThrottle = null;
        });
    };
    const handleResize = () => {
        updateParallax();
    };
    const setupParallax = (containerElement, responsiveThreshold) => {
        containerEl = containerElement;
        imgEl = containerElement.querySelector('.parallax img');
        if (!imgEl)
            return;
        // Check if we should enable parallax based on screen size
        const shouldEnableParallax = window.innerWidth >= responsiveThreshold;
        if (shouldEnableParallax) {
            // Set initial MaterializeCSS styles on the image
            imgEl.style.transform = 'translate3d(-50%, 0px, 0px)';
            imgEl.style.opacity = '1';
            // Wait for image to load before calculating parallax
            if (imgEl.complete) {
                updateParallax();
            }
            else {
                imgEl.onload = () => updateParallax();
            }
            // Add event listeners
            window.addEventListener('scroll', handleScroll, { passive: true });
            window.addEventListener('resize', handleResize, { passive: true });
            // Store cleanup function
            containerEl._parallaxCleanup = () => {
                window.removeEventListener('scroll', handleScroll);
                window.removeEventListener('resize', handleResize);
                if (scrollThrottle) {
                    cancelAnimationFrame(scrollThrottle);
                    scrollThrottle = null;
                }
            };
        }
    };
    const cleanup = () => {
        if (containerEl && containerEl._parallaxCleanup) {
            containerEl._parallaxCleanup();
        }
        containerEl = null;
        imgEl = null;
        if (scrollThrottle) {
            cancelAnimationFrame(scrollThrottle);
            scrollThrottle = null;
        }
        lastScrollTop = -1;
    };
    return {
        oncreate: ({ dom, attrs }) => {
            const { responsiveThreshold = 768 } = attrs;
            setupParallax(dom, responsiveThreshold);
        },
        onremove: () => {
            cleanup();
        },
        view: ({ attrs }) => {
            const { src, alt = '' } = attrs;
            if (!src)
                return undefined;
            return m('.parallax-container', [
                m('.parallax', [
                    m('img', {
                        src,
                        alt,
                        onerror: (e) => {
                            console.warn('Parallax image failed to load:', src);
                            const img = e.target;
                            img.style.backgroundColor = '#ddd';
                            img.alt = 'Image failed to load';
                        },
                    }),
                ]),
            ]);
        },
    };
};

const defaultOptions = {
    dialRadius: 135,
    outerRadius: 105,
    innerRadius: 70,
    tickRadius: 20,
    duration: 350,
    container: null,
    defaultTime: 'now',
    fromNow: 0,
    showClearBtn: false,
    i18n: {
        cancel: 'Cancel',
        clear: 'Clear',
        done: 'Ok',
    },
    autoClose: false,
    twelveHour: true,
    vibrate: true,
    onOpen: () => { },
    onOpenStart: () => { },
    onOpenEnd: () => { },
    onCloseStart: () => { },
    onCloseEnd: () => { },
    onSelect: () => { },
};
/**
 * TimePicker component based on original Materialize CSS timepicker
 */
const TimePicker = () => {
    let state;
    let options;
    const addLeadingZero = (num) => {
        return (num < 10 ? '0' : '') + num;
    };
    const createSVGEl = (name) => {
        const svgNS = 'http://www.w3.org/2000/svg';
        return document.createElementNS(svgNS, name);
    };
    const getPos = (e) => {
        const touchEvent = e;
        const mouseEvent = e;
        if (touchEvent.targetTouches && touchEvent.targetTouches.length >= 1) {
            return { x: touchEvent.targetTouches[0].clientX, y: touchEvent.targetTouches[0].clientY };
        }
        return { x: mouseEvent.clientX, y: mouseEvent.clientY };
    };
    const vibrate = () => {
        if (state.vibrateTimer) {
            clearTimeout(state.vibrateTimer);
        }
        if (options.vibrate && navigator.vibrate) {
            navigator.vibrate(10);
            state.vibrateTimer = window.setTimeout(() => {
                state.vibrateTimer = undefined;
            }, 100);
        }
    };
    const handleClockClickStart = (e) => {
        e.preventDefault();
        if (!state.plate)
            return;
        const clockPlateBR = state.plate.getBoundingClientRect();
        const offset = { x: clockPlateBR.left, y: clockPlateBR.top };
        state.x0 = offset.x + options.dialRadius;
        state.y0 = offset.y + options.dialRadius;
        state.moved = false;
        const clickPos = getPos(e);
        state.dx = clickPos.x - state.x0;
        state.dy = clickPos.y - state.y0;
        setHand(state.dx, state.dy, false);
        document.addEventListener('mousemove', handleDocumentClickMove);
        document.addEventListener('touchmove', handleDocumentClickMove);
        document.addEventListener('mouseup', handleDocumentClickEnd);
        document.addEventListener('touchend', handleDocumentClickEnd);
    };
    const handleDocumentClickMove = (e) => {
        e.preventDefault();
        const clickPos = getPos(e);
        const x = clickPos.x - state.x0;
        const y = clickPos.y - state.y0;
        state.moved = true;
        setHand(x, y, false);
    };
    const handleDocumentClickEnd = (e) => {
        e.preventDefault();
        document.removeEventListener('mouseup', handleDocumentClickEnd);
        document.removeEventListener('touchend', handleDocumentClickEnd);
        document.removeEventListener('mousemove', handleDocumentClickMove);
        document.removeEventListener('touchmove', handleDocumentClickMove);
        const clickPos = getPos(e);
        const x = clickPos.x - state.x0;
        const y = clickPos.y - state.y0;
        if (state.moved && x === state.dx && y === state.dy) {
            setHand(x, y);
        }
        if (state.currentView === 'hours') {
            showView('minutes', options.duration / 2);
        }
        else if (options.autoClose) {
            if (state.minutesView) {
                state.minutesView.classList.add('timepicker-dial-out');
            }
            setTimeout(() => {
                done();
            }, options.duration / 2);
        }
        if (options.onSelect) {
            options.onSelect(state.hours, state.minutes);
        }
    };
    const updateTimeFromInput = (inputValue) => {
        let value = ((inputValue || options.defaultTime || '') + '').split(':');
        if (options.twelveHour && value.length > 1) {
            if (value[1].toUpperCase().indexOf('AM') > -1) {
                state.amOrPm = 'AM';
            }
            else if (value[1].toUpperCase().indexOf('PM') > -1) {
                state.amOrPm = 'PM';
            }
            value[1] = value[1].replace('AM', '').replace('PM', '').trim();
        }
        if (value[0] === 'now') {
            const now = new Date(+new Date() + options.fromNow);
            value = [now.getHours().toString(), now.getMinutes().toString()];
            if (options.twelveHour) {
                state.amOrPm = parseInt(value[0]) >= 12 ? 'PM' : 'AM';
            }
        }
        let hours = +value[0] || 0;
        let minutes = +value[1] || 0;
        // Handle 24-hour to 12-hour conversion if needed
        if (options.twelveHour && hours >= 12) {
            state.amOrPm = 'PM';
            if (hours > 12) {
                hours = hours - 12;
            }
        }
        else if (options.twelveHour && hours < 12) {
            state.amOrPm = 'AM';
            if (hours === 0) {
                hours = 12;
            }
        }
        state.hours = hours;
        state.minutes = minutes;
        if (state.spanHours) {
            state.spanHours.innerHTML = state.hours.toString();
        }
        if (state.spanMinutes) {
            state.spanMinutes.innerHTML = addLeadingZero(state.minutes);
        }
        updateAmPmView();
    };
    const updateAmPmView = () => {
        if (options.twelveHour && state.amBtn && state.pmBtn) {
            state.amBtn.classList.toggle('text-primary', state.amOrPm === 'AM');
            state.pmBtn.classList.toggle('text-primary', state.amOrPm === 'PM');
        }
    };
    const showView = (view, delay) => {
        const isHours = view === 'hours';
        const nextView = isHours ? state.hoursView : state.minutesView;
        const hideView = isHours ? state.minutesView : state.hoursView;
        state.currentView = view;
        if (state.spanHours) {
            state.spanHours.classList.toggle('text-primary', isHours);
        }
        if (state.spanMinutes) {
            state.spanMinutes.classList.toggle('text-primary', !isHours);
        }
        if (hideView) {
            hideView.classList.add('timepicker-dial-out');
        }
        if (nextView) {
            nextView.style.visibility = 'visible';
            nextView.classList.remove('timepicker-dial-out');
        }
        resetClock(delay);
        if (state.toggleViewTimer) {
            clearTimeout(state.toggleViewTimer);
        }
        state.toggleViewTimer = window.setTimeout(() => {
            if (hideView) {
                hideView.style.visibility = 'hidden';
            }
        }, options.duration);
    };
    const resetClock = (delay) => {
        const view = state.currentView;
        const value = state[view];
        const isHours = view === 'hours';
        const unit = Math.PI / (isHours ? 6 : 30);
        const radian = value * unit;
        const radius = isHours && value > 0 && value < 13 ? options.innerRadius : options.outerRadius;
        const x = Math.sin(radian) * radius;
        const y = -Math.cos(radian) * radius;
        if (delay && state.canvas) {
            state.canvas.classList.add('timepicker-canvas-out');
            setTimeout(() => {
                if (state.canvas) {
                    state.canvas.classList.remove('timepicker-canvas-out');
                }
                setHand(x, y);
            }, delay);
        }
        else {
            setHand(x, y);
        }
    };
    const setHand = (x, y, roundBy5, _dragging) => {
        let radian = Math.atan2(x, -y);
        const isHours = state.currentView === 'hours';
        const unit = Math.PI / (isHours || roundBy5 ? 6 : 30);
        const z = Math.sqrt(x * x + y * y);
        const inner = isHours && z < (options.outerRadius + options.innerRadius) / 2;
        let radius = inner ? options.innerRadius : options.outerRadius;
        if (options.twelveHour) {
            radius = options.outerRadius;
        }
        if (radian < 0) {
            radian = Math.PI * 2 + radian;
        }
        let value = Math.round(radian / unit);
        radian = value * unit;
        if (options.twelveHour) {
            if (isHours) {
                if (value === 0)
                    value = 12;
            }
            else {
                if (roundBy5)
                    value *= 5;
                if (value === 60)
                    value = 0;
            }
        }
        else {
            if (isHours) {
                if (value === 12)
                    value = 0;
                value = inner ? (value === 0 ? 12 : value) : value === 0 ? 0 : value + 12;
            }
            else {
                if (roundBy5)
                    value *= 5;
                if (value === 60)
                    value = 0;
            }
        }
        if (state[state.currentView] !== value) {
            vibrate();
        }
        state[state.currentView] = value;
        if (isHours && state.spanHours) {
            state.spanHours.innerHTML = value.toString();
        }
        else if (!isHours && state.spanMinutes) {
            state.spanMinutes.innerHTML = addLeadingZero(value);
        }
        // Set clock hand position
        if (state.hand && state.bg) {
            const cx1 = Math.sin(radian) * (radius - options.tickRadius);
            const cy1 = -Math.cos(radian) * (radius - options.tickRadius);
            const cx2 = Math.sin(radian) * radius;
            const cy2 = -Math.cos(radian) * radius;
            state.hand.setAttribute('x2', cx1.toString());
            state.hand.setAttribute('y2', cy1.toString());
            state.bg.setAttribute('cx', cx2.toString());
            state.bg.setAttribute('cy', cy2.toString());
        }
    };
    const buildSVGClock = () => {
        if (!state.canvas)
            return;
        const dialRadius = options.dialRadius;
        const tickRadius = options.tickRadius;
        const diameter = dialRadius * 2;
        const svg = createSVGEl('svg');
        svg.setAttribute('class', 'timepicker-svg');
        svg.setAttribute('width', diameter.toString());
        svg.setAttribute('height', diameter.toString());
        const g = createSVGEl('g');
        g.setAttribute('transform', `translate(${dialRadius},${dialRadius})`);
        const bearing = createSVGEl('circle');
        bearing.setAttribute('class', 'timepicker-canvas-bearing');
        bearing.setAttribute('cx', '0');
        bearing.setAttribute('cy', '0');
        bearing.setAttribute('r', '4');
        const hand = createSVGEl('line');
        hand.setAttribute('x1', '0');
        hand.setAttribute('y1', '0');
        const bg = createSVGEl('circle');
        bg.setAttribute('class', 'timepicker-canvas-bg');
        bg.setAttribute('r', tickRadius.toString());
        g.appendChild(hand);
        g.appendChild(bg);
        g.appendChild(bearing);
        svg.appendChild(g);
        state.canvas.appendChild(svg);
        state.hand = hand;
        state.bg = bg;
        state.bearing = bearing;
        state.g = g;
    };
    const buildHoursView = () => {
        if (!state.hoursView)
            return;
        if (options.twelveHour) {
            for (let i = 1; i < 13; i++) {
                const tick = document.createElement('div');
                tick.className = 'timepicker-tick';
                const radian = (i / 6) * Math.PI;
                const radius = options.outerRadius;
                tick.style.left = options.dialRadius + Math.sin(radian) * radius - options.tickRadius + 'px';
                tick.style.top = options.dialRadius - Math.cos(radian) * radius - options.tickRadius + 'px';
                tick.innerHTML = i === 0 ? '00' : i.toString();
                state.hoursView.appendChild(tick);
            }
        }
        else {
            for (let i = 0; i < 24; i++) {
                const tick = document.createElement('div');
                tick.className = 'timepicker-tick';
                const radian = (i / 6) * Math.PI;
                const inner = i > 0 && i < 13;
                const radius = inner ? options.innerRadius : options.outerRadius;
                tick.style.left = options.dialRadius + Math.sin(radian) * radius - options.tickRadius + 'px';
                tick.style.top = options.dialRadius - Math.cos(radian) * radius - options.tickRadius + 'px';
                tick.innerHTML = i === 0 ? '00' : i.toString();
                state.hoursView.appendChild(tick);
            }
        }
    };
    const buildMinutesView = () => {
        if (!state.minutesView)
            return;
        for (let i = 0; i < 60; i += 5) {
            const tick = document.createElement('div');
            tick.className = 'timepicker-tick';
            const radian = (i / 30) * Math.PI;
            tick.style.left = options.dialRadius + Math.sin(radian) * options.outerRadius - options.tickRadius + 'px';
            tick.style.top = options.dialRadius - Math.cos(radian) * options.outerRadius - options.tickRadius + 'px';
            tick.innerHTML = addLeadingZero(i);
            state.minutesView.appendChild(tick);
        }
    };
    const handleAmPmClick = (ampm) => {
        state.amOrPm = ampm;
        updateAmPmView();
    };
    const open = (inputValue) => {
        if (state.isOpen)
            return;
        state.isOpen = true;
        updateTimeFromInput(inputValue);
        showView('hours');
        if (options.onOpen)
            options.onOpen();
        if (options.onOpenStart)
            options.onOpenStart();
        if (options.onOpenEnd)
            options.onOpenEnd();
    };
    const close = () => {
        if (!state.isOpen)
            return;
        state.isOpen = false;
        if (options.onCloseStart)
            options.onCloseStart();
        if (options.onCloseEnd)
            options.onCloseEnd();
    };
    const done = (clearValue) => {
        // const last = ''; // We'll get this from the actual input
        let value = clearValue ? '' : addLeadingZero(state.hours) + ':' + addLeadingZero(state.minutes);
        if (!clearValue && options.twelveHour) {
            value = `${value} ${state.amOrPm}`;
        }
        close();
        return value;
    };
    const clear = () => {
        return done(true);
    };
    const TimepickerModal = () => {
        return {
            view: ({ attrs }) => {
                const { showClearBtn, clearLabel, closeLabel, doneLabel } = attrs;
                return [
                    m('.modal-content.timepicker-container', [
                        m('.timepicker-digital-display', [
                            m('.timepicker-text-container', [
                                m('.timepicker-display-column', [
                                    m('span.timepicker-span-hours', {
                                        class: state.currentView === 'hours' ? 'text-primary' : '',
                                        onclick: () => showView('hours'),
                                        oncreate: (vnode) => {
                                            state.spanHours = vnode.dom;
                                        },
                                    }, state.hours.toString()),
                                    ':',
                                    m('span.timepicker-span-minutes', {
                                        class: state.currentView === 'minutes' ? 'text-primary' : '',
                                        onclick: () => showView('minutes'),
                                        oncreate: (vnode) => {
                                            state.spanMinutes = vnode.dom;
                                        },
                                    }, addLeadingZero(state.minutes)),
                                ]),
                                options.twelveHour &&
                                    m('.timepicker-display-column.timepicker-display-am-pm', [
                                        m('.timepicker-span-am-pm', {
                                            oncreate: (vnode) => {
                                                state.spanAmPm = vnode.dom;
                                            },
                                        }, [
                                            m('.am-btn', {
                                                class: state.amOrPm === 'AM' ? 'text-primary' : '',
                                                onclick: () => handleAmPmClick('AM'),
                                                oncreate: (vnode) => {
                                                    state.amBtn = vnode.dom;
                                                },
                                            }, 'AM'),
                                            m('.pm-btn', {
                                                class: state.amOrPm === 'PM' ? 'text-primary' : '',
                                                onclick: () => handleAmPmClick('PM'),
                                                oncreate: (vnode) => {
                                                    state.pmBtn = vnode.dom;
                                                },
                                            }, 'PM'),
                                        ]),
                                    ]),
                            ]),
                        ]),
                        m('.timepicker-analog-display', [
                            m('.timepicker-plate', {
                                oncreate: (vnode) => {
                                    state.plate = vnode.dom;
                                    state.plate.addEventListener('mousedown', handleClockClickStart);
                                    state.plate.addEventListener('touchstart', handleClockClickStart);
                                },
                                onremove: () => {
                                    if (state.plate) {
                                        state.plate.removeEventListener('mousedown', handleClockClickStart);
                                        state.plate.removeEventListener('touchstart', handleClockClickStart);
                                    }
                                },
                            }, [
                                m('.timepicker-canvas', {
                                    oncreate: (vnode) => {
                                        state.canvas = vnode.dom;
                                        buildSVGClock();
                                        // Position the hand after SVG is built
                                        setTimeout(() => resetClock(), 10);
                                    },
                                }),
                                m('.timepicker-dial.timepicker-hours', {
                                    oncreate: (vnode) => {
                                        state.hoursView = vnode.dom;
                                        buildHoursView();
                                    },
                                }),
                                m('.timepicker-dial.timepicker-minutes.timepicker-dial-out', {
                                    oncreate: (vnode) => {
                                        state.minutesView = vnode.dom;
                                        buildMinutesView();
                                    },
                                }),
                            ]),
                            m('.timepicker-footer', {
                                oncreate: (vnode) => {
                                    state.footer = vnode.dom;
                                },
                            }, [
                                m('button.btn-flat.timepicker-clear.waves-effect', {
                                    type: 'button',
                                    tabindex: options.twelveHour ? '3' : '1',
                                    style: showClearBtn ? '' : 'visibility: hidden;',
                                    onclick: () => clear(),
                                }, clearLabel),
                                m('.confirmation-btns', [
                                    m('button.btn-flat.timepicker-close.waves-effect', {
                                        type: 'button',
                                        tabindex: options.twelveHour ? '3' : '1',
                                        onclick: () => close(),
                                    }, closeLabel),
                                    m('button.btn-flat.timepicker-close.waves-effect', {
                                        type: 'button',
                                        tabindex: options.twelveHour ? '3' : '1',
                                        onclick: () => done(),
                                    }, doneLabel),
                                ]),
                            ]),
                        ]),
                    ]),
                ];
            },
        };
    };
    return {
        oninit: (vnode) => {
            const attrs = vnode.attrs;
            options = Object.assign(Object.assign({}, defaultOptions), attrs);
            state = {
                id: uniqueId(),
                isOpen: false,
                hours: 12,
                minutes: 0,
                amOrPm: 'AM',
                currentView: 'hours',
                moved: false,
                x0: 0,
                y0: 0,
                dx: 0,
                dy: 0,
            };
            // Handle initial value after options are set
            if (attrs.initialValue) {
                updateTimeFromInput(attrs.initialValue);
            }
        },
        onremove: () => {
            // Cleanup
            if (state.toggleViewTimer) {
                clearTimeout(state.toggleViewTimer);
            }
            if (state.vibrateTimer) {
                clearTimeout(state.vibrateTimer);
            }
            document.removeEventListener('mousemove', handleDocumentClickMove);
            document.removeEventListener('touchmove', handleDocumentClickMove);
            document.removeEventListener('mouseup', handleDocumentClickEnd);
            document.removeEventListener('touchend', handleDocumentClickEnd);
        },
        view: ({ attrs }) => {
            const { id = state.id, label, placeholder, disabled, readonly, required, iconName, helperText, onchange, oninput, useModal = true, showClearBtn = false, clearLabel = 'Clear', closeLabel = 'Cancel', twelveHour, className: cn1, class: cn2, } = attrs;
            const className = cn1 || cn2 || 'col s12';
            // Format time value for display
            const formatTime = (hours, minutes, use12Hour) => {
                if (use12Hour) {
                    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
                    const ampm = hours >= 12 ? 'PM' : 'AM';
                    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
                }
                else {
                    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                }
            };
            const setTime = (timeValue) => {
                if (onchange) {
                    onchange(timeValue);
                }
            };
            // Calculate display hours based on format
            let hoursForDisplay = state.hours;
            if (twelveHour) {
                // For 12-hour display format, use the original 24-hour value so formatTime can properly determine AM/PM
                if (options.twelveHour) {
                    // Convert from internal 12-hour back to 24-hour for proper AM/PM calculation
                    if (state.amOrPm === 'PM' && state.hours !== 12) {
                        hoursForDisplay = state.hours + 12;
                    }
                    else if (state.amOrPm === 'AM' && state.hours === 12) {
                        hoursForDisplay = 0;
                    }
                }
            }
            else {
                // For 24-hour display format
                if (options.twelveHour) {
                    // Convert from internal 12-hour to 24-hour for display
                    if (state.amOrPm === 'PM' && state.hours !== 12) {
                        hoursForDisplay = state.hours + 12;
                    }
                    else if (state.amOrPm === 'AM' && state.hours === 12) {
                        hoursForDisplay = 0;
                    }
                }
            }
            const displayValue = state.hours !== undefined && state.minutes !== undefined
                ? formatTime(hoursForDisplay, state.minutes, twelveHour || false)
                : '';
            return m('.input-field', { className }, [
                // Icon prefix
                iconName && m('i.material-icons.prefix', iconName),
                // Time input field - use HTML5 time input for inline mode
                m('input.timepicker', {
                    id,
                    type: useModal ? 'text' : 'time',
                    value: useModal
                        ? displayValue
                        : state.hours !== undefined && state.minutes !== undefined
                            ? `${state.hours.toString().padStart(2, '0')}:${state.minutes.toString().padStart(2, '0')}`
                            : '',
                    placeholder: useModal ? placeholder : undefined,
                    disabled,
                    readonly,
                    required,
                    onclick: () => {
                        if (!disabled && !readonly && useModal) {
                            open(displayValue);
                        }
                    },
                    onchange: (e) => {
                        if (!useModal) {
                            // For inline mode, handle HTML5 time input changes directly
                            const target = e.target;
                            const timeValue = target.value; // Already in HH:MM format
                            const [hours, minutes] = timeValue.split(':').map(Number);
                            state.hours = hours;
                            state.minutes = minutes;
                            setTime(timeValue);
                        }
                    },
                    oninput: (e) => {
                        if (!useModal && oninput) {
                            const target = e.target;
                            oninput(target.value);
                        }
                    },
                }),
                // Label
                label &&
                    m('label', {
                        for: id,
                        class: displayValue || placeholder ? 'active' : '',
                    }, label),
                // Helper text
                helperText && m('span.helper-text', helperText),
                // Modal timepicker
                useModal &&
                    state.isOpen && [
                    // Modal overlay
                    m('.modal-overlay', {
                        style: {
                            zIndex: 1002,
                            display: 'block',
                            opacity: 0.5,
                        },
                        onclick: () => close(),
                    }),
                    // Modal content
                    m('.modal.timepicker-modal.open', {
                        style: {
                            zIndex: 1003,
                            display: 'block',
                            opacity: 1,
                            top: '10%',
                            transform: 'scaleX(1) scaleY(1)',
                        },
                    }, m(TimepickerModal, { showClearBtn, clearLabel, closeLabel, doneLabel: 'OK' })),
                ],
            ]);
        },
    };
};

class Pushpin {
    constructor(el, options = {}) {
        this.el = el;
        this.options = Object.assign(Object.assign({}, Pushpin.defaults), options);
        this.state = {
            originalOffset: this.el.getBoundingClientRect().top + window.pageYOffset,
        };
        this.el.M_Pushpin = this;
        this._setupEventHandlers();
        this._updateElementPosition();
    }
    static getInstance(el) {
        return el.M_Pushpin;
    }
    destroy() {
        this.el.style.position = '';
        this.el.style.top = '';
        this.el.style.left = '';
        this._removeEventHandlers();
        this.el.M_Pushpin = undefined;
    }
    _setupEventHandlers() {
        this._updateElementPositionBound = this._updateElementPosition.bind(this);
        window.addEventListener('scroll', this._updateElementPositionBound);
        window.addEventListener('resize', this._updateElementPositionBound);
    }
    _removeEventHandlers() {
        window.removeEventListener('scroll', this._updateElementPositionBound);
        window.removeEventListener('resize', this._updateElementPositionBound);
    }
    _updateElementPosition() {
        const scrolled = window.pageYOffset;
        const elementTop = this.state.originalOffset - this.options.offset;
        // const elementBottom = elementTop + this.el.offsetHeight;
        // Check if element should be pinned
        if (scrolled > elementTop) {
            // Check if element is past bottom
            if (this.options.bottom !== Infinity && scrolled > this.options.bottom) {
                this._removePinClasses();
                this.el.classList.add('pin-bottom');
                this.el.style.position = 'absolute';
                this.el.style.top = this.options.bottom - this.el.offsetHeight + 'px';
                this.el.style.left = '';
                if (this.options.onPositionChange) {
                    this.options.onPositionChange('pin-bottom');
                }
            }
            else {
                // Pin element
                this._removePinClasses();
                this.el.classList.add('pinned');
                this.el.style.position = 'fixed';
                this.el.style.top = this.options.top + 'px';
                this.el.style.left = this.el.getBoundingClientRect().left + 'px';
                if (this.options.onPositionChange) {
                    this.options.onPositionChange('pinned');
                }
            }
        }
        else {
            // Unpin element
            this._removePinClasses();
            this.el.classList.add('pin-top');
            this.el.style.position = '';
            this.el.style.top = '';
            this.el.style.left = '';
            if (this.options.onPositionChange) {
                this.options.onPositionChange('pin-top');
            }
        }
    }
    _removePinClasses() {
        this.el.classList.remove('pin-top');
        this.el.classList.remove('pinned');
        this.el.classList.remove('pin-bottom');
    }
    _updatePosition() {
        // Recalculate original offset in case element moved
        this.state.originalOffset = this.el.getBoundingClientRect().top + window.pageYOffset;
        this._updateElementPosition();
    }
}
Pushpin.defaults = {
    top: 0,
    bottom: Infinity,
    offset: 0,
    onPositionChange: undefined,
};
const PushpinComponent = () => {
    let pushpinInstance = null;
    return {
        oncreate: ({ attrs }) => {
            if (attrs.targetSelector) {
                const targetEl = document.querySelector(attrs.targetSelector);
                if (targetEl) {
                    pushpinInstance = new Pushpin(targetEl, attrs);
                }
            }
        },
        onupdate: ({ attrs }) => {
            if (pushpinInstance) {
                // Update options and recalculate position
                pushpinInstance.options = Object.assign(Object.assign({}, pushpinInstance.options), attrs);
                pushpinInstance._updatePosition();
            }
        },
        onremove: () => {
            if (pushpinInstance) {
                pushpinInstance.destroy();
                pushpinInstance = null;
            }
        },
        view: () => null, // This component doesn't render anything itself
    };
};
// Helper function to initialize pushpins on elements
const initPushpins = (selector = '.pushpin', options = {}) => {
    const elements = document.querySelectorAll(selector);
    const pushpins = [];
    elements.forEach((el) => {
        if (!el.M_Pushpin) {
            pushpins.push(new Pushpin(el, options));
        }
    });
    return pushpins;
};

const RadioButton = () => ({
    view: ({ attrs: { id, groupId, label, onchange, className = 'col s12', checked, disabled, inputId } }) => {
        const radioId = inputId || `${groupId}-${id}`;
        return m('p', { className }, m('label', { for: radioId }, [
            m('input[type=radio][tabindex=0]', {
                id: radioId,
                name: groupId,
                disabled,
                checked,
                onclick: onchange ? () => onchange(id) : undefined,
            }),
            m('span', m.trust(label)),
        ]));
    },
});
/** Component to show a list of radio buttons, from which you can choose one. */
// export const RadioButtons: FactoryComponent<IRadioButtons<T>> = () => {
const RadioButtons = () => {
    const state = { groupId: uniqueId() };
    return {
        oninit: ({ attrs: { checkedId, initialValue, id } }) => {
            state.oldCheckedId = checkedId;
            state.checkedId = checkedId || initialValue;
            state.componentId = id || uniqueId();
        },
        view: ({ attrs: { checkedId: cid, newRow, className = 'col s12', label = '', disabled, description, options, isMandatory, checkboxClass, layout = 'vertical', onchange: callback, }, }) => {
            if (state.oldCheckedId !== cid) {
                state.oldCheckedId = state.checkedId = cid;
            }
            const { groupId, checkedId, componentId } = state;
            const onchange = (propId) => {
                state.checkedId = propId;
                if (callback) {
                    callback(propId);
                }
            };
            const cn = [newRow ? 'clear' : '', className].filter(Boolean).join(' ').trim();
            const optionsContent = layout === 'horizontal'
                ? m('div.grid-container', options.map((r) => m(RadioButton, Object.assign(Object.assign({}, r), { onchange,
                    groupId, disabled: disabled || r.disabled, className: checkboxClass, checked: r.id === checkedId, inputId: `${componentId}-${r.id}` }))))
                : options.map((r) => m(RadioButton, Object.assign(Object.assign({}, r), { onchange,
                    groupId, disabled: disabled || r.disabled, className: checkboxClass, checked: r.id === checkedId, inputId: `${componentId}-${r.id}` })));
            return m('div', { id: componentId, className: cn }, [
                label && m('h5.form-group-label', label + (isMandatory ? ' *' : '')),
                description && m('p.helper-text', m.trust(description)),
                m('form', { action: '#' }, optionsContent),
            ]);
        },
    };
};

/** Select component */
const Select = () => {
    const state = {
        id: '',
        isOpen: false,
        selectedIds: [],
        focusedIndex: -1,
        inputRef: null,
        dropdownRef: null,
    };
    const isSelected = (id, selectedIds) => {
        return selectedIds.some((selectedId) => selectedId === id);
    };
    const toggleOption = (id, multiple, attrs) => {
        if (multiple) {
            const newIds = state.selectedIds.includes(id)
                ? // isSelected(id, state.selectedIds)
                    state.selectedIds.filter((selectedId) => selectedId !== id)
                : [...state.selectedIds, id];
            state.selectedIds = newIds;
            attrs.onchange(newIds);
            console.log(newIds);
            // Keep dropdown open for multiple select
        }
        else {
            state.selectedIds = [id];
            // Close dropdown for single select
            state.isOpen = false;
            attrs.onchange([id]);
        }
    };
    const handleKeyDown = (e, attrs) => {
        const { options } = attrs;
        const selectableOptions = options.filter((opt) => !opt.disabled);
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                if (!state.isOpen) {
                    state.isOpen = true;
                    state.focusedIndex = 0;
                }
                else {
                    const currentSelectableIndex = selectableOptions.findIndex((opt) => opt === options[state.focusedIndex]);
                    const nextSelectableIndex = Math.min(currentSelectableIndex + 1, selectableOptions.length - 1);
                    const nextOption = selectableOptions[nextSelectableIndex];
                    state.focusedIndex = options.findIndex((opt) => opt === nextOption);
                }
                break;
            case 'ArrowUp':
                e.preventDefault();
                if (state.isOpen) {
                    const currentSelectableIndex = selectableOptions.findIndex((opt) => opt === options[state.focusedIndex]);
                    const prevSelectableIndex = Math.max(currentSelectableIndex - 1, 0);
                    const prevOption = selectableOptions[prevSelectableIndex];
                    state.focusedIndex = options.findIndex((opt) => opt === prevOption);
                }
                break;
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (state.isOpen && state.focusedIndex >= 0 && state.focusedIndex < options.length) {
                    const option = options[state.focusedIndex];
                    if (option && !option.disabled) {
                        toggleOption(option.id, attrs.multiple || false, attrs);
                    }
                }
                else if (!state.isOpen) {
                    state.isOpen = true;
                    state.focusedIndex = 0;
                }
                break;
            case 'Escape':
                e.preventDefault();
                state.isOpen = false;
                state.focusedIndex = -1;
                break;
        }
    };
    const closeDropdown = (e) => {
        const target = e.target;
        if (!target.closest('.select-wrapper-container')) {
            state.isOpen = false;
            m.redraw();
        }
    };
    const renderGroupedOptions = (options, multiple, attrs) => {
        const groupedOptions = {};
        const ungroupedOptions = [];
        // Group options by their group property
        options.forEach((option) => {
            if (option.group) {
                if (!groupedOptions[option.group]) {
                    groupedOptions[option.group] = [];
                }
                groupedOptions[option.group].push(option);
            }
            else {
                ungroupedOptions.push(option);
            }
        });
        const renderElements = [];
        // Render ungrouped options first
        ungroupedOptions.forEach((option) => {
            renderElements.push(m('li', Object.assign({ class: option.disabled ? 'disabled' : state.focusedIndex === options.indexOf(option) ? 'focused' : '' }, (option.disabled
                ? {}
                : {
                    onclick: (e) => {
                        e.stopPropagation();
                        toggleOption(option.id, multiple, attrs);
                    },
                })), m('span', multiple
                ? m('label', { for: option.id }, m('input', {
                    id: option.id,
                    type: 'checkbox',
                    checked: state.selectedIds.includes(option.id),
                    disabled: option.disabled ? true : undefined,
                    onclick: (e) => {
                        e.stopPropagation();
                    },
                }), m('span', option.label))
                : option.label)));
        });
        // Render grouped options
        Object.keys(groupedOptions).forEach((groupName) => {
            // Add group header
            renderElements.push(m('li.optgroup', { tabindex: 0 }, m('span', groupName)));
            // Add group options
            groupedOptions[groupName].forEach((option) => {
                renderElements.push(m('li', Object.assign({ class: `optgroup-option${option.disabled ? ' disabled' : ''}${isSelected(option.id, state.selectedIds) ? ' selected' : ''}${state.focusedIndex === options.indexOf(option) ? ' focused' : ''}` }, (option.disabled
                    ? {}
                    : {
                        onclick: (e) => {
                            e.stopPropagation();
                            toggleOption(option.id, multiple, attrs);
                        },
                    })), m('span', multiple
                    ? m('label', { for: option.id }, m('input', {
                        id: option.id,
                        type: 'checkbox',
                        checked: state.selectedIds.includes(option.id),
                        disabled: option.disabled ? true : undefined,
                        onclick: (e) => {
                            e.stopPropagation();
                        },
                    }), m('span', option.label))
                    : option.label)));
            });
        });
        return renderElements;
    };
    return {
        oninit: ({ attrs }) => {
            const { checkedId, initialValue, id } = attrs;
            state.id = id || uniqueId();
            const iv = checkedId || initialValue;
            if (iv !== null && typeof iv !== 'undefined') {
                if (iv instanceof Array) {
                    state.selectedIds = [...iv];
                }
                else {
                    state.selectedIds = [iv];
                }
            }
            // Add global click listener to close dropdown
            document.addEventListener('click', closeDropdown);
        },
        onremove: () => {
            // Cleanup global listener
            document.removeEventListener('click', closeDropdown);
        },
        view: ({ attrs }) => {
            // Sync external checkedId prop with internal state - do this in view for immediate response
            const { checkedId } = attrs;
            if (checkedId !== undefined) {
                const newIds = checkedId instanceof Array ? checkedId : [checkedId];
                if (JSON.stringify(newIds) !== JSON.stringify(state.selectedIds)) {
                    state.selectedIds = newIds;
                }
            }
            const { newRow, className = 'col s12', key, options, multiple = false, label, helperText, placeholder = '', isMandatory, iconName, disabled, style, } = attrs;
            const finalClassName = newRow ? `${className} clear` : className;
            const selectedOptions = options.filter((opt) => isSelected(opt.id, state.selectedIds));
            return m('.input-field.select-space', {
                className: finalClassName,
                key,
                style,
            }, [
                // Icon prefix
                iconName && m('i.material-icons.prefix', iconName),
                m('.select-wrapper', {
                    onclick: disabled
                        ? undefined
                        : () => {
                            state.isOpen = !state.isOpen;
                        },
                    onkeydown: disabled ? undefined : (e) => handleKeyDown(e, attrs),
                    tabindex: disabled ? -1 : 0,
                    'aria-expanded': state.isOpen ? 'true' : 'false',
                    'aria-haspopup': 'listbox',
                    role: 'combobox',
                }, [
                    m('input[type=text][readonly=true].select-dropdown.dropdown-trigger', {
                        id: state.id,
                        value: selectedOptions.length > 0 ? selectedOptions.map((o) => o.label || o.id).join(', ') : placeholder,
                        oncreate: ({ dom }) => {
                            state.inputRef = dom;
                        },
                        onclick: (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            state.isOpen = !state.isOpen;
                        },
                    }),
                    // Dropdown Menu
                    state.isOpen &&
                        m('ul.dropdown-content.select-dropdown', {
                            tabindex: 0,
                            oncreate: ({ dom }) => {
                                state.dropdownRef = dom;
                            },
                            onremove: () => {
                                state.dropdownRef = null;
                            },
                            style: getDropdownStyles(state.inputRef, true, options),
                        }, [
                            placeholder && m('li.disabled', { tabindex: 0 }, m('span', placeholder)),
                            ...renderGroupedOptions(options, multiple, attrs),
                        ]),
                    m(MaterialIcon, {
                        name: 'caret',
                        direction: 'down',
                        class: 'caret',
                    }),
                ]),
                // Label
                label &&
                    m(Label, {
                        id: state.id,
                        label,
                        isMandatory,
                    }),
                // Helper text
                helperText && m(HelperText, { helperText }),
            ]);
        },
    };
};

/** Component to display a switch with two values. */
const Switch = () => {
    const state = { id: uniqueId(), checked: false };
    return {
        oninit: ({ attrs: { checked } }) => {
            state.checked = checked || false;
        },
        view: ({ attrs }) => {
            const id = attrs.id || state.id;
            const { label, left, right, disabled, newRow, onchange, isMandatory, className = 'col s12' } = attrs, params = __rest(attrs, ["label", "left", "right", "disabled", "newRow", "onchange", "isMandatory", "className"]);
            const cn = ['input-field', newRow ? 'clear' : '', className].filter(Boolean).join(' ').trim();
            return m('div', {
                className: cn,
                onclick: (e) => {
                    state.checked = !state.checked;
                    onchange && onchange(state.checked);
                    e.preventDefault();
                },
            }, [
                label && m(Label, { label: label || '', id, isMandatory, className: 'active' }),
                m('.switch', params, m('label', {
                    style: { cursor: 'pointer' },
                }, [
                    m('span', left || 'Off'),
                    m('input[type=checkbox]', {
                        id,
                        disabled,
                        checked: state.checked,
                    }),
                    m('span.lever'),
                    m('span', right || 'On'),
                ])),
            ]);
        },
    };
};

/** CSS-only Tabs component - no MaterializeCSS dependencies */
const Tabs = () => {
    const toAnchored = () => {
        return (tab) => {
            const tabId = createId(tab.title, tab.id);
            return Object.assign(Object.assign({}, tab), { tabId, anchorId: `anchor-${tabId}` });
        };
    };
    const state = {
        activeTabId: '',
        isDragging: false,
        startX: 0,
        translateX: 0,
        indicatorStyle: {
            left: '0px',
            width: '0px',
        },
        lastIndicatorUpdate: '',
    };
    const createId = (title, id) => (id ? id : title.replace(/ /g, '').toLowerCase());
    const updateIndicator = () => {
        const tabElement = document.getElementById(state.activeTabId);
        if (tabElement) {
            const tabsContainer = tabElement.closest('.tabs');
            if (tabsContainer) {
                const containerRect = tabsContainer.getBoundingClientRect();
                const tabRect = tabElement.getBoundingClientRect();
                const newLeft = `${tabRect.left - containerRect.left}px`;
                const newWidth = `${tabRect.width}px`;
                // Only update if values actually changed - NO m.redraw()!
                if (state.indicatorStyle.left !== newLeft || state.indicatorStyle.width !== newWidth) {
                    state.indicatorStyle = {
                        left: newLeft,
                        width: newWidth,
                    };
                }
            }
        }
    };
    const handleTabClick = (tabId, tabElement, attrs) => {
        console.log({ state, tabId });
        if (state.activeTabId === tabId)
            return;
        state.activeTabId = tabId;
        // Call onShow callback if provided
        if (attrs.onShow) {
            attrs.onShow(tabElement);
        }
        // Call onTabChange callback if provided
        if (attrs.onTabChange) {
            attrs.onTabChange(tabId);
        }
    };
    // Touch/swipe support for mobile
    const handleTouchStart = (e) => {
        if (!e.touches || e.touches.length === 0)
            return;
        state.isDragging = true;
        state.startX = e.touches[0].clientX;
    };
    const handleTouchEnd = (e, attrs) => {
        if (!state.isDragging || !e.changedTouches || e.changedTouches.length === 0)
            return;
        const endX = e.changedTouches[0].clientX;
        const deltaX = endX - state.startX;
        const threshold = 50; // Minimum swipe distance
        if (Math.abs(deltaX) > threshold) {
            const currentIndex = attrs.tabs.findIndex((tab) => createId(tab.title, tab.id) === state.activeTabId);
            if (deltaX > 0 && currentIndex > 0) {
                // Swipe right - go to previous tab
                const prevTab = attrs.tabs[currentIndex - 1];
                if (!prevTab.disabled && !prevTab.href) {
                    const newTabId = createId(prevTab.title, prevTab.id);
                    state.activeTabId = newTabId;
                    if (attrs.onTabChange) {
                        attrs.onTabChange(newTabId);
                    }
                }
            }
            else if (deltaX < 0 && currentIndex < attrs.tabs.length - 1) {
                // Swipe left - go to next tab
                const nextTab = attrs.tabs[currentIndex + 1];
                if (!nextTab.disabled && !nextTab.href) {
                    const newTabId = createId(nextTab.title, nextTab.id);
                    state.activeTabId = newTabId;
                    if (attrs.onTabChange) {
                        attrs.onTabChange(newTabId);
                    }
                }
            }
        }
        state.isDragging = false;
        state.translateX = 0;
        // m.redraw();
    };
    /** Initialize active tab - selectedTabId takes precedence, next active property or first available tab */
    const setActiveTabId = (anchoredTabs, selectedTabId) => {
        const selectedTab = selectedTabId ? anchoredTabs.find((a) => a.tabId === selectedTabId) : undefined;
        if (selectedTab) {
            state.activeTabId = selectedTab.tabId;
            return selectedTab;
        }
        const curTab = state.activeTabId && anchoredTabs.find((a) => a.tabId === state.activeTabId);
        if (curTab)
            return curTab;
        // Default to first non-disabled tab
        const firstAvailableTab = anchoredTabs.find((a) => !a.disabled && !a.href);
        if (firstAvailableTab) {
            state.activeTabId = firstAvailableTab.tabId;
            return firstAvailableTab;
        }
        return undefined;
    };
    return {
        oninit: ({ attrs }) => {
            const anchoredTabs = attrs.tabs.map(toAnchored());
            setActiveTabId(anchoredTabs, attrs.selectedTabId);
        },
        oncreate: () => {
            updateIndicator();
            m.redraw();
        },
        view: ({ attrs }) => {
            const { tabWidth, tabs, className, style, swipeable = false } = attrs;
            const cn = [tabWidth === 'fill' ? 'tabs-fixed-width' : '', className].filter(Boolean).join(' ').trim();
            const anchoredTabs = tabs.map(toAnchored());
            const activeTab = setActiveTabId(anchoredTabs, attrs.selectedTabId);
            updateIndicator();
            return m('.row', [
                // Tab headers
                m('.col.s12', m('ul.tabs', {
                    className: cn,
                    style,
                }, [
                    ...anchoredTabs.map((tab) => {
                        const { className: tabClassName, title, anchorId, tabId, disabled, target, href } = tab;
                        const cn = ['tab', tabWidth === 'fixed' ? `col s${Math.floor(12 / tabs.length)}` : '', tabClassName]
                            .filter(Boolean)
                            .join(' ')
                            .trim();
                        return m('li', {
                            key: tabId,
                            id: tabId,
                            className: cn,
                            disabled,
                        }, m('a', {
                            id: anchorId,
                            className: tab.tabId === state.activeTabId ? 'active' : undefined,
                            target,
                            href: href || `#${anchorId}`,
                            onclick: disabled || href
                                ? undefined
                                : (e) => {
                                    e.preventDefault();
                                    handleTabClick(tabId, e.target, attrs);
                                },
                            style: disabled ? { opacity: '0.6', cursor: 'not-allowed' } : undefined,
                        }, title));
                    }),
                    // Add the indicator element
                    m('li.indicator', {
                        key: 'indicator',
                        style: {
                            display: state.activeTabId ? 'block' : 'none',
                            left: state.indicatorStyle.left,
                            width: state.indicatorStyle.width,
                            transition: 'left 0.35s ease, width 0.35s ease',
                        },
                    }),
                ]), activeTab &&
                    m('.col.s12', {
                        ontouchstart: swipeable ? handleTouchStart : undefined,
                        ontouchend: swipeable ? (e) => handleTouchEnd(e, attrs) : undefined,
                        style: swipeable ? { touchAction: 'pan-y' } : undefined,
                    }, m('.tab-content', {
                        className: activeTab.contentClass,
                    }, activeTab.vnode))),
            ]);
        },
    };
};

/**
 * Mithril Factory Component for Multi-Select Dropdown with search
 */
const SearchSelect = () => {
    //  (): <T extends string | number>(): Component<SearchSelectAttrs<T>, SearchSelectState<T>> => {
    // State initialization
    const state = {
        isOpen: false,
        selectedOptions: [], //options.filter((o) => iv.includes(o.id)),
        searchTerm: '',
        options: [],
        inputRef: null,
        dropdownRef: null,
        focusedIndex: -1,
        onchange: null,
    };
    const componentId = uniqueId();
    const searchInputId = `${componentId}-search`;
    // Handle click outside
    const handleClickOutside = (e) => {
        const target = e.target;
        if (state.dropdownRef && state.dropdownRef.contains(target)) {
            // Click inside dropdown, do nothing
            return;
        }
        if (state.inputRef && state.inputRef.contains(target)) {
            // Click on trigger handled by onclick event
            return;
        }
        else {
            // Click outside, close dropdown
            state.isOpen = false;
            m.redraw();
        }
    };
    // Handle keyboard navigation
    const handleKeyDown = (e, filteredOptions, showAddNew) => {
        if (!state.isOpen)
            return;
        const totalOptions = filteredOptions.length + (showAddNew ? 1 : 0);
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                state.focusedIndex = Math.min(state.focusedIndex + 1, totalOptions - 1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                state.focusedIndex = Math.max(state.focusedIndex - 1, -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (state.focusedIndex >= 0) {
                    if (showAddNew && state.focusedIndex === filteredOptions.length) {
                        // Handle add new option
                        return 'addNew';
                    }
                    else if (state.focusedIndex < filteredOptions.length) {
                        toggleOption(filteredOptions[state.focusedIndex]);
                    }
                }
                break;
            case 'Escape':
                e.preventDefault();
                state.isOpen = false;
                state.focusedIndex = -1;
                break;
        }
        return null;
    };
    // Toggle option selection
    const toggleOption = (option) => {
        if (option.disabled)
            return;
        state.selectedOptions = state.selectedOptions.some((item) => item.id === option.id)
            ? state.selectedOptions.filter((item) => item.id !== option.id)
            : [...state.selectedOptions, option];
        state.searchTerm = '';
        state.focusedIndex = -1;
        state.onchange && state.onchange(state.selectedOptions.map((o) => o.id));
    };
    // Remove a selected option
    const removeOption = (option) => {
        state.selectedOptions = state.selectedOptions.filter((item) => item.id !== option.id);
        state.onchange && state.onchange(state.selectedOptions.map((o) => o.id));
    };
    return {
        oninit: ({ attrs: { options = [], initialValue = [], onchange } }) => {
            state.options = options;
            state.selectedOptions = options.filter((o) => initialValue.includes(o.id));
            state.onchange = onchange;
        },
        oncreate() {
            document.addEventListener('click', handleClickOutside);
        },
        onremove() {
            document.removeEventListener('click', handleClickOutside);
        },
        view({ attrs: { 
        // onchange,
        oncreateNewOption, className, placeholder, searchPlaceholder = 'Search options...', noOptionsFound = 'No options found', label,
        // maxHeight = '25rem',
         }, }) {
            // Safely filter options
            const filteredOptions = state.options.filter((option) => (option.label || option.id.toString()).toLowerCase().includes((state.searchTerm || '').toLowerCase()) &&
                !state.selectedOptions.some((selected) => selected.id === option.id));
            // Check if we should show the "add new option" element
            const showAddNew = oncreateNewOption &&
                state.searchTerm &&
                !filteredOptions.some((o) => (o.label || o.id.toString()).toLowerCase() === state.searchTerm.toLowerCase());
            // Render the dropdown
            return m('.input-field.multi-select-dropdown', { className }, [
                m('.chips.chips-initial.chips-container', {
                    oncreate: ({ dom }) => {
                        state.inputRef = dom;
                    },
                    onclick: (e) => {
                        // console.log('SearchSelect clicked', state.isOpen, e); // Debug log
                        e.preventDefault();
                        e.stopPropagation();
                        state.isOpen = !state.isOpen;
                        // console.log('SearchSelect state changed to', state.isOpen); // Debug log
                    },
                    style: {
                        display: 'flex',
                        alignItems: 'end',
                        flexWrap: 'wrap',
                        cursor: 'pointer',
                        position: 'relative',
                    },
                }, [
                    // TODO FIXME Add to existing input
                    // Hidden input for label association and accessibility
                    m('input', {
                        type: 'text',
                        id: componentId,
                        value: state.selectedOptions.map((o) => o.label || o.id.toString()).join(', '),
                        readonly: true,
                        style: { position: 'absolute', left: '-9999px', opacity: 0 },
                    }),
                    // Selected Options (chips)
                    ...state.selectedOptions.map((option) => m('.chip', [
                        option.label || option.id.toString(),
                        m(MaterialIcon, {
                            name: 'close',
                            className: 'close',
                            onclick: (e) => {
                                e.stopPropagation();
                                removeOption(option);
                            },
                        }),
                    ])),
                    // Placeholder when no options selected
                    state.selectedOptions.length === 0 &&
                        placeholder &&
                        m('span.placeholder', {
                            style: {
                                color: 'var(--mm-text-hint, #9e9e9e)',
                                flexGrow: 1,
                                padding: '8px 0',
                            },
                        }, placeholder),
                    // Spacer to push caret to the right
                    m('span.spacer', { style: { flexGrow: 1 } }),
                    m(MaterialIcon, {
                        name: 'caret',
                        direction: state.isOpen ? 'up' : 'down',
                        class: 'caret',
                        style: { marginLeft: 'auto', cursor: 'pointer' },
                    }),
                ]),
                // Label
                label &&
                    m('label', {
                        for: componentId,
                        class: placeholder || state.selectedOptions.length > 0 ? 'active' : '',
                    }, label),
                // Dropdown Menu
                state.isOpen &&
                    m('ul.dropdown-content.select-dropdown', {
                        oncreate: ({ dom }) => {
                            state.dropdownRef = dom;
                        },
                        onremove: () => {
                            state.dropdownRef = null;
                        },
                        style: getDropdownStyles(state.inputRef),
                    }, [
                        m('li', // Search Input
                        {
                            class: 'search-wrapper',
                            style: { padding: '0 16px', position: 'relative' },
                        }, [
                            m('input', {
                                type: 'text',
                                id: searchInputId,
                                placeholder: searchPlaceholder,
                                value: state.searchTerm || '',
                                oncreate: ({ dom }) => {
                                    // Auto-focus the search input when dropdown opens
                                    dom.focus();
                                },
                                oninput: (e) => {
                                    state.searchTerm = e.target.value;
                                    state.focusedIndex = -1; // Reset focus when typing
                                },
                                onkeydown: async (e) => {
                                    const result = handleKeyDown(e, filteredOptions, !!showAddNew);
                                    if (result === 'addNew' && oncreateNewOption) {
                                        const option = await oncreateNewOption(state.searchTerm);
                                        toggleOption(option);
                                    }
                                },
                                style: {
                                    width: '100%',
                                    outline: 'none',
                                    fontSize: '0.875rem',
                                    border: 'none',
                                    padding: '8px 0',
                                    borderBottom: '1px solid var(--mm-input-border, #9e9e9e)',
                                    backgroundColor: 'transparent',
                                    color: 'var(--mm-text-primary, inherit)',
                                },
                            }),
                        ]),
                        // No options found message or list of options
                        ...(filteredOptions.length === 0 && !showAddNew
                            ? [
                                m('li', 
                                // {
                                //   style: getNoOptionsStyles(),
                                // },
                                noOptionsFound),
                            ]
                            : []),
                        // Add new option item
                        ...(showAddNew
                            ? [
                                m('li', {
                                    onclick: async () => {
                                        const option = await oncreateNewOption(state.searchTerm);
                                        toggleOption(option);
                                    },
                                    class: state.focusedIndex === filteredOptions.length ? 'active' : '',
                                    onmouseover: () => {
                                        state.focusedIndex = filteredOptions.length;
                                    },
                                }, [m('span', `+ "${state.searchTerm}"`)]),
                            ]
                            : []),
                        // List of filtered options
                        ...filteredOptions.map((option, index) => m('li', {
                            onclick: (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleOption(option);
                            },
                            class: `${option.disabled ? 'disabled' : ''} ${state.focusedIndex === index ? 'active' : ''}`.trim(),
                            onmouseover: () => {
                                if (!option.disabled) {
                                    state.focusedIndex = index;
                                }
                            },
                        }, m('span', [
                            m('input', {
                                type: 'checkbox',
                                checked: state.selectedOptions.some((selected) => selected.id === option.id),
                            }),
                            option.label || option.id.toString(),
                        ]))),
                    ]),
            ]);
        },
    };
};

class Toast {
    constructor(options = {}) {
        this.options = Object.assign(Object.assign({}, Toast.defaults), options);
        this.state = {
            panning: false,
            timeRemaining: this.options.displayLength,
            startingXPos: 0,
            xPos: 0,
            velocityX: 0,
            time: 0,
            deltaX: 0,
            wasSwiped: false,
        };
        if (Toast._toasts.length === 0) {
            Toast._createContainer();
        }
        // Create new toast
        Toast._toasts.push(this);
        this.el = this._createToast();
        this._animateIn();
        this._setTimer();
    }
    static getInstance(el) {
        return el.M_Toast;
    }
    static _createContainer() {
        const container = document.createElement('div');
        container.setAttribute('id', 'toast-container');
        // Add event handlers
        container.addEventListener('touchstart', Toast._onDragStart);
        container.addEventListener('touchmove', Toast._onDragMove);
        container.addEventListener('touchend', Toast._onDragEnd);
        container.addEventListener('mousedown', Toast._onDragStart);
        document.addEventListener('mousemove', Toast._onDragMove);
        document.addEventListener('mouseup', Toast._onDragEnd);
        document.body.appendChild(container);
        Toast._container = container;
    }
    static _removeContainer() {
        document.removeEventListener('mousemove', Toast._onDragMove);
        document.removeEventListener('mouseup', Toast._onDragEnd);
        if (Toast._container) {
            Toast._container.remove();
            Toast._container = null;
        }
    }
    static _xPos(e) {
        const touchEvent = e;
        const mouseEvent = e;
        if (touchEvent.targetTouches && touchEvent.targetTouches.length >= 1) {
            return touchEvent.targetTouches[0].clientX;
        }
        return mouseEvent.clientX;
    }
    static dismissAll() {
        Toast._toasts.forEach((toast) => toast.dismiss());
    }
    _createToast() {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        // Add custom classes
        if (this.options.classes) {
            toast.classList.add(...this.options.classes.split(' '));
        }
        // Set content
        const message = this.options.html;
        if (typeof message === 'object' && message && 'nodeType' in message) {
            toast.appendChild(message);
        }
        else {
            toast.innerHTML = message;
        }
        // Store reference
        toast.M_Toast = this;
        // Append to container
        Toast._container.appendChild(toast);
        return toast;
    }
    _animateIn() {
        // Simple CSS animation since we don't have anime.js
        this.el.style.cssText = `
      transform: translateY(35px);
      opacity: 0;
      transition: transform ${this.options.inDuration}ms cubic-bezier(0.215, 0.61, 0.355, 1),
                  opacity ${this.options.inDuration}ms cubic-bezier(0.215, 0.61, 0.355, 1);
    `;
        // Trigger animation
        setTimeout(() => {
            this.el.style.transform = 'translateY(0)';
            this.el.style.opacity = '1';
        }, 10);
    }
    _setTimer() {
        if (this.state.timeRemaining !== Infinity) {
            this.state.counterInterval = window.setInterval(() => {
                if (!this.state.panning) {
                    this.state.timeRemaining -= 20;
                }
                if (this.state.timeRemaining <= 0) {
                    this.dismiss();
                }
            }, 20);
        }
    }
    dismiss() {
        if (this.state.counterInterval) {
            window.clearInterval(this.state.counterInterval);
        }
        const activationDistance = this.el.offsetWidth * this.options.activationPercent;
        if (this.state.wasSwiped) {
            this.el.style.transition = 'transform .05s, opacity .05s';
            this.el.style.transform = `translateX(${activationDistance}px)`;
            this.el.style.opacity = '0';
        }
        // Animate out
        this.el.style.cssText += `
      transition: opacity ${this.options.outDuration}ms cubic-bezier(0.165, 0.84, 0.44, 1),
                  margin-top ${this.options.outDuration}ms cubic-bezier(0.165, 0.84, 0.44, 1);
      opacity: 0;
      margin-top: -40px;
    `;
        setTimeout(() => {
            // Call completion callback
            if (this.options.completeCallback) {
                this.options.completeCallback();
            }
            // Remove toast from DOM
            this.el.remove();
            // Remove from toasts array
            const index = Toast._toasts.indexOf(this);
            if (index > -1) {
                Toast._toasts.splice(index, 1);
            }
            // Remove container if no more toasts
            if (Toast._toasts.length === 0) {
                Toast._removeContainer();
            }
        }, this.options.outDuration);
    }
}
Toast._toasts = [];
Toast._container = null;
Toast._draggedToast = null;
Toast.defaults = {
    html: '',
    displayLength: 4000,
    inDuration: 300,
    outDuration: 375,
    classes: '',
    completeCallback: undefined,
    activationPercent: 0.8,
};
Toast._onDragStart = (e) => {
    const target = e.target;
    const toastEl = target.closest('.toast');
    if (toastEl) {
        const toast = toastEl.M_Toast;
        if (toast) {
            toast.state.panning = true;
            Toast._draggedToast = toast;
            toast.el.classList.add('panning');
            toast.el.style.transition = '';
            toast.state.startingXPos = Toast._xPos(e);
            toast.state.time = Date.now();
            toast.state.xPos = Toast._xPos(e);
        }
    }
};
Toast._onDragMove = (e) => {
    if (Toast._draggedToast) {
        e.preventDefault();
        const toast = Toast._draggedToast;
        toast.state.deltaX = Math.abs(toast.state.xPos - Toast._xPos(e));
        toast.state.xPos = Toast._xPos(e);
        toast.state.velocityX = toast.state.deltaX / (Date.now() - toast.state.time);
        toast.state.time = Date.now();
        const totalDeltaX = toast.state.xPos - toast.state.startingXPos;
        const activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
        toast.el.style.transform = `translateX(${totalDeltaX}px)`;
        toast.el.style.opacity = String(1 - Math.abs(totalDeltaX / activationDistance));
    }
};
Toast._onDragEnd = () => {
    if (Toast._draggedToast) {
        const toast = Toast._draggedToast;
        toast.state.panning = false;
        toast.el.classList.remove('panning');
        const totalDeltaX = toast.state.xPos - toast.state.startingXPos;
        const activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
        const shouldBeDismissed = Math.abs(totalDeltaX) > activationDistance || toast.state.velocityX > 1;
        if (shouldBeDismissed) {
            toast.state.wasSwiped = true;
            toast.dismiss();
        }
        else {
            toast.el.style.transition = 'transform .2s, opacity .2s';
            toast.el.style.transform = '';
            toast.el.style.opacity = '';
        }
        Toast._draggedToast = null;
    }
};
// Factory function for creating toasts
const toast = (options) => {
    return new Toast(options);
};
const ToastComponent = () => {
    let toastInstance = null;
    return {
        view: ({ attrs }) => {
            if (attrs.show && !toastInstance) {
                toastInstance = new Toast(attrs);
            }
            else if (!attrs.show && toastInstance) {
                toastInstance.dismiss();
                toastInstance = null;
            }
            return null; // This component doesn't render anything itself
        },
        onremove: () => {
            if (toastInstance) {
                toastInstance.dismiss();
                toastInstance = null;
            }
        },
    };
};

class Tooltip {
    constructor(el, options = {}) {
        this.el = el;
        this.options = Object.assign(Object.assign({}, Tooltip.defaults), options);
        this.state = {
            isOpen: false,
            isHovered: false,
            isFocused: false,
            xMovement: 0,
            yMovement: 0,
        };
        this.el.M_Tooltip = this;
        this._appendTooltipEl();
        this._setupEventHandlers();
    }
    static getInstance(el) {
        return el.M_Tooltip;
    }
    destroy() {
        this.tooltipEl.remove();
        this._removeEventHandlers();
        this.el.M_Tooltip = undefined;
    }
    _appendTooltipEl() {
        const tooltipEl = document.createElement('div');
        tooltipEl.classList.add('material-tooltip');
        this.tooltipEl = tooltipEl;
        const tooltipContentEl = document.createElement('div');
        tooltipContentEl.classList.add('tooltip-content');
        tooltipContentEl.innerHTML = this.options.html || '';
        tooltipEl.appendChild(tooltipContentEl);
        document.body.appendChild(tooltipEl);
    }
    _updateTooltipContent() {
        const contentEl = this.tooltipEl.querySelector('.tooltip-content');
        if (contentEl) {
            contentEl.innerHTML = this.options.html || '';
        }
    }
    _setupEventHandlers() {
        this._handleMouseEnterBound = this._handleMouseEnter.bind(this);
        this._handleMouseLeaveBound = this._handleMouseLeave.bind(this);
        this._handleFocusBound = this._handleFocus.bind(this);
        this._handleBlurBound = this._handleBlur.bind(this);
        this.el.addEventListener('mouseenter', this._handleMouseEnterBound);
        this.el.addEventListener('mouseleave', this._handleMouseLeaveBound);
        this.el.addEventListener('focus', this._handleFocusBound, true);
        this.el.addEventListener('blur', this._handleBlurBound, true);
    }
    _removeEventHandlers() {
        this.el.removeEventListener('mouseenter', this._handleMouseEnterBound);
        this.el.removeEventListener('mouseleave', this._handleMouseLeaveBound);
        this.el.removeEventListener('focus', this._handleFocusBound, true);
        this.el.removeEventListener('blur', this._handleBlurBound, true);
    }
    open(isManual = true) {
        if (this.state.isOpen) {
            return;
        }
        this.state.isOpen = true;
        // Update tooltip content with data attributes
        this.options = Object.assign(Object.assign({}, this.options), this._getAttributeOptions());
        this._updateTooltipContent();
        this._setEnterDelayTimeout(isManual);
    }
    close() {
        if (!this.state.isOpen) {
            return;
        }
        this.state.isHovered = false;
        this.state.isFocused = false;
        this.state.isOpen = false;
        this._setExitDelayTimeout();
    }
    _setExitDelayTimeout() {
        if (this.state.exitDelayTimeout) {
            clearTimeout(this.state.exitDelayTimeout);
        }
        this.state.exitDelayTimeout = window.setTimeout(() => {
            if (this.state.isHovered || this.state.isFocused) {
                return;
            }
            this._animateOut();
        }, this.options.exitDelay);
    }
    _setEnterDelayTimeout(isManual) {
        if (this.state.enterDelayTimeout) {
            clearTimeout(this.state.enterDelayTimeout);
        }
        this.state.enterDelayTimeout = window.setTimeout(() => {
            if (!this.state.isHovered && !this.state.isFocused && !isManual) {
                return;
            }
            this._animateIn();
        }, this.options.enterDelay);
    }
    _positionTooltip() {
        const origin = this.el;
        const tooltip = this.tooltipEl;
        const originHeight = origin.offsetHeight;
        const originWidth = origin.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;
        const tooltipWidth = tooltip.offsetWidth;
        const margin = this.options.margin;
        this.state.xMovement = 0;
        this.state.yMovement = 0;
        const originRect = origin.getBoundingClientRect();
        let targetTop = originRect.top + window.pageYOffset;
        let targetLeft = originRect.left + window.pageXOffset;
        switch (this.options.position) {
            case 'top':
                targetTop += -tooltipHeight - margin;
                targetLeft += originWidth / 2 - tooltipWidth / 2;
                this.state.yMovement = -this.options.transitionMovement;
                break;
            case 'right':
                targetTop += originHeight / 2 - tooltipHeight / 2;
                targetLeft += originWidth + margin;
                this.state.xMovement = this.options.transitionMovement;
                break;
            case 'left':
                targetTop += originHeight / 2 - tooltipHeight / 2;
                targetLeft += -tooltipWidth - margin;
                this.state.xMovement = -this.options.transitionMovement;
                break;
            case 'bottom':
            default:
                targetTop += originHeight + margin;
                targetLeft += originWidth / 2 - tooltipWidth / 2;
                this.state.yMovement = this.options.transitionMovement;
                break;
        }
        const repositioned = this._repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
        this.tooltipEl.style.top = repositioned.y + 'px';
        this.tooltipEl.style.left = repositioned.x + 'px';
    }
    _repositionWithinScreen(x, y, width, height) {
        const scrollLeft = window.pageXOffset;
        const scrollTop = window.pageYOffset;
        let newX = x - scrollLeft;
        let newY = y - scrollTop;
        const offset = this.options.margin + this.options.transitionMovement;
        // Check boundaries
        if (newX < offset) {
            newX = offset;
        }
        else if (newX + width > window.innerWidth - offset) {
            newX = window.innerWidth - width - offset;
        }
        if (newY < offset) {
            newY = offset;
        }
        else if (newY + height > window.innerHeight - offset) {
            newY = window.innerHeight - height - offset;
        }
        return {
            x: newX + scrollLeft,
            y: newY + scrollTop,
        };
    }
    _animateIn() {
        this._positionTooltip();
        this.tooltipEl.style.visibility = 'visible';
        // CSS animation
        this.tooltipEl.style.cssText += `
      opacity: 0;
      transform: translate(0, 0);
      transition: opacity ${this.options.inDuration}ms cubic-bezier(0.215, 0.61, 0.355, 1),
                  transform ${this.options.inDuration}ms cubic-bezier(0.215, 0.61, 0.355, 1);
    `;
        setTimeout(() => {
            this.tooltipEl.style.opacity = '1';
            this.tooltipEl.style.transform = `translate(${this.state.xMovement}px, ${this.state.yMovement}px)`;
        }, 10);
    }
    _animateOut() {
        this.tooltipEl.style.cssText += `
      transition: opacity ${this.options.outDuration}ms cubic-bezier(0.215, 0.61, 0.355, 1),
                  transform ${this.options.outDuration}ms cubic-bezier(0.215, 0.61, 0.355, 1);
      opacity: 0;
      transform: translate(0, 0);
    `;
        setTimeout(() => {
            this.tooltipEl.style.visibility = 'hidden';
        }, this.options.outDuration);
    }
    _handleMouseEnter() {
        this.state.isHovered = true;
        this.state.isFocused = false;
        this.open(false);
    }
    _handleMouseLeave() {
        this.state.isHovered = false;
        this.state.isFocused = false;
        this.close();
    }
    _handleFocus() {
        this.state.isFocused = true;
        this.open(false);
    }
    _handleBlur() {
        this.state.isFocused = false;
        this.close();
    }
    _getAttributeOptions() {
        const attributeOptions = {};
        const tooltipText = this.el.getAttribute('data-tooltip');
        const position = this.el.getAttribute('data-position');
        if (tooltipText) {
            attributeOptions.html = tooltipText;
        }
        if (position && ['top', 'bottom', 'left', 'right'].includes(position)) {
            attributeOptions.position = position;
        }
        return attributeOptions;
    }
}
Tooltip.defaults = {
    exitDelay: 200,
    enterDelay: 0,
    html: null,
    margin: 5,
    inDuration: 250,
    outDuration: 200,
    position: 'bottom',
    transitionMovement: 10,
};
const TooltipComponent = () => {
    let tooltipInstance = null;
    return {
        oncreate: ({ attrs }) => {
            if (attrs.targetSelector) {
                const targetEl = document.querySelector(attrs.targetSelector);
                if (targetEl) {
                    tooltipInstance = new Tooltip(targetEl, attrs);
                }
            }
        },
        onremove: () => {
            if (tooltipInstance) {
                tooltipInstance.destroy();
                tooltipInstance = null;
            }
        },
        view: () => null, // This component doesn't render anything itself
    };
};
// Helper function to initialize tooltips on elements
const initTooltips = (selector = '[data-tooltip]', options = {}) => {
    const elements = document.querySelectorAll(selector);
    const tooltips = [];
    elements.forEach((el) => {
        if (!el.M_Tooltip) {
            tooltips.push(new Tooltip(el, options));
        }
    });
    return tooltips;
};

/**
 * Theme switching utilities and component
 */
class ThemeManager {
    /**
     * Set the theme for the entire application
     */
    static setTheme(theme) {
        this.currentTheme = theme;
        const root = document.documentElement;
        if (theme === 'auto') {
            // Remove explicit theme, let CSS media query handle it
            root.removeAttribute('data-theme');
        }
        else {
            // Set explicit theme
            root.setAttribute('data-theme', theme);
        }
        // Store preference in localStorage
        try {
            localStorage.setItem('mm-theme', theme);
        }
        catch (e) {
            // localStorage might not be available
        }
    }
    /**
     * Get the current theme
     */
    static getTheme() {
        return this.currentTheme;
    }
    /**
     * Get the effective theme (resolves 'auto' to actual theme)
     */
    static getEffectiveTheme() {
        if (this.currentTheme !== 'auto') {
            return this.currentTheme;
        }
        // Check CSS media query for auto mode
        if (typeof window !== 'undefined' && window.matchMedia) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return 'light';
    }
    /**
     * Initialize theme from localStorage or system preference
     */
    static initialize() {
        let savedTheme = 'auto';
        try {
            const stored = localStorage.getItem('mm-theme');
            if (stored && ['light', 'dark', 'auto'].includes(stored)) {
                savedTheme = stored;
            }
        }
        catch (e) {
            // localStorage might not be available
        }
        this.setTheme(savedTheme);
    }
    /**
     * Toggle between light and dark themes
     */
    static toggle() {
        const current = this.getEffectiveTheme();
        this.setTheme(current === 'light' ? 'dark' : 'light');
    }
}
ThemeManager.currentTheme = 'auto';
/**
 * Theme Switcher Component
 * Provides UI controls for changing themes
 */
const ThemeSwitcher = () => {
    return {
        oninit: () => {
            // Initialize theme manager if not already done
            if (typeof window !== 'undefined') {
                ThemeManager.initialize();
            }
        },
        view: ({ attrs }) => {
            const { theme = ThemeManager.getTheme(), onThemeChange, showLabels = true, className = '' } = attrs;
            const handleThemeChange = (newTheme) => {
                ThemeManager.setTheme(newTheme);
                if (onThemeChange) {
                    onThemeChange(newTheme);
                }
            };
            return m('.theme-switcher', { class: className }, [
                showLabels && m('span.theme-switcher-label', 'Theme:'),
                m('.theme-switcher-buttons', [
                    m('button.btn-flat', {
                        class: theme === 'light' ? 'active' : '',
                        onclick: () => handleThemeChange('light'),
                        title: 'Light theme'
                    }, [
                        m('i.material-icons', 'light_mode'),
                        showLabels && m('span', 'Light')
                    ]),
                    m('button.btn-flat', {
                        class: theme === 'auto' ? 'active' : '',
                        onclick: () => handleThemeChange('auto'),
                        title: 'Auto theme (system preference)'
                    }, [
                        m('i.material-icons', 'brightness_auto'),
                        showLabels && m('span', 'Auto')
                    ]),
                    m('button.btn-flat', {
                        class: theme === 'dark' ? 'active' : '',
                        onclick: () => handleThemeChange('dark'),
                        title: 'Dark theme'
                    }, [
                        m('i.material-icons', 'dark_mode'),
                        showLabels && m('span', 'Dark')
                    ])
                ])
            ]);
        }
    };
};
/**
 * Simple theme toggle button (just switches between light/dark)
 */
const ThemeToggle = () => {
    return {
        oninit: () => {
            // Initialize theme manager if not already done
            if (typeof window !== 'undefined') {
                ThemeManager.initialize();
            }
        },
        view: ({ attrs }) => {
            const currentTheme = ThemeManager.getEffectiveTheme();
            return m('button.btn-flat.theme-toggle', {
                class: attrs.className || '',
                onclick: () => {
                    ThemeManager.toggle();
                    m.redraw();
                },
                title: `Switch to ${currentTheme === 'light' ? 'dark' : 'light'} theme`,
                style: 'margin: 0; height: 64px; line-height: 64px; border-radius: 0; min-width: 64px; padding: 0;'
            }, [
                m('i.material-icons', {
                    style: 'color: inherit; font-size: 24px;'
                }, currentTheme === 'light' ? 'dark_mode' : 'light_mode')
            ]);
        }
    };
};

/**
 * File Upload Component with Drag and Drop
 * Supports multiple files, file type validation, size limits, and image preview
 */
const FileUpload = () => {
    let state;
    const validateFile = (file, attrs) => {
        // Check file size
        if (attrs.maxSize && file.size > attrs.maxSize) {
            const maxSizeMB = (attrs.maxSize / (1024 * 1024)).toFixed(1);
            return `File size exceeds ${maxSizeMB}MB limit`;
        }
        // Check file type
        if (attrs.accept) {
            const acceptedTypes = attrs.accept.split(',').map(type => type.trim());
            const isAccepted = acceptedTypes.some(acceptedType => {
                if (acceptedType.startsWith('.')) {
                    // Extension check
                    return file.name.toLowerCase().endsWith(acceptedType.toLowerCase());
                }
                else {
                    // MIME type check
                    return file.type.match(acceptedType.replace('*', '.*'));
                }
            });
            if (!isAccepted) {
                return `File type not accepted. Accepted: ${attrs.accept}`;
            }
        }
        return null;
    };
    const createFilePreview = (file) => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                var _a;
                file.preview = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                m.redraw();
            };
            reader.readAsDataURL(file);
        }
    };
    const handleFiles = (fileList, attrs) => {
        const newFiles = Array.from(fileList);
        const validFiles = [];
        // Validate each file
        for (const file of newFiles) {
            const error = validateFile(file, attrs);
            if (error) {
                file.uploadError = error;
            }
            else {
                validFiles.push(file);
                if (attrs.showPreview) {
                    createFilePreview(file);
                }
            }
        }
        // Check max files limit
        if (attrs.maxFiles) {
            const totalFiles = state.files.length + validFiles.length;
            if (totalFiles > attrs.maxFiles) {
                const allowedCount = attrs.maxFiles - state.files.length;
                validFiles.splice(allowedCount);
            }
        }
        // Add valid files to state
        if (attrs.multiple) {
            state.files = [...state.files, ...validFiles];
        }
        else {
            state.files = validFiles.slice(0, 1);
        }
        // Notify parent component
        if (attrs.onFilesSelected) {
            attrs.onFilesSelected(state.files.filter(f => !f.uploadError));
        }
    };
    const removeFile = (fileToRemove, attrs) => {
        state.files = state.files.filter(file => file !== fileToRemove);
        if (attrs.onFileRemoved) {
            attrs.onFileRemoved(fileToRemove);
        }
    };
    const formatFileSize = (bytes) => {
        if (bytes === 0)
            return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };
    return {
        oninit: () => {
            state = {
                id: uniqueId(),
                files: [],
                isDragOver: false,
                isUploading: false
            };
        },
        view: ({ attrs }) => {
            const { accept, multiple = false, disabled = false, label = 'Choose files or drag them here', helperText, showPreview = true, className = '', error } = attrs;
            return m('.file-upload-container', { class: className }, [
                // Upload area
                m('.file-upload-area', {
                    class: [
                        state.isDragOver ? 'drag-over' : '',
                        disabled ? 'disabled' : '',
                        error ? 'error' : '',
                        state.files.length > 0 ? 'has-files' : ''
                    ].filter(Boolean).join(' '),
                    ondragover: (e) => {
                        if (disabled)
                            return;
                        e.preventDefault();
                        e.stopPropagation();
                        state.isDragOver = true;
                    },
                    ondragleave: (e) => {
                        if (disabled)
                            return;
                        e.preventDefault();
                        e.stopPropagation();
                        state.isDragOver = false;
                    },
                    ondrop: (e) => {
                        var _a;
                        if (disabled)
                            return;
                        e.preventDefault();
                        e.stopPropagation();
                        state.isDragOver = false;
                        if ((_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.files) {
                            handleFiles(e.dataTransfer.files, attrs);
                        }
                    },
                    onclick: () => {
                        if (disabled)
                            return;
                        const input = document.getElementById(state.id);
                        input === null || input === void 0 ? void 0 : input.click();
                    }
                }, [
                    m('input[type="file"]', {
                        id: state.id,
                        accept,
                        multiple,
                        disabled,
                        style: { display: 'none' },
                        onchange: (e) => {
                            const target = e.target;
                            if (target.files) {
                                handleFiles(target.files, attrs);
                            }
                        }
                    }),
                    m('.file-upload-content', [
                        m('i.material-icons.file-upload-icon', 'cloud_upload'),
                        m('p.file-upload-label', label),
                        helperText && m('p.file-upload-helper', helperText),
                        accept && m('p.file-upload-types', `Accepted: ${accept}`)
                    ])
                ]),
                // Error message
                error && m('.file-upload-error', error),
                // File list
                state.files.length > 0 && m('.file-upload-list', [
                    m('h6', 'Selected Files:'),
                    state.files.map(file => m('.file-upload-item', { key: file.name + file.size }, [
                        // Preview thumbnail
                        showPreview && file.preview && m('.file-preview', [
                            m('img', { src: file.preview, alt: file.name })
                        ]),
                        // File info
                        m('.file-info', [
                            m('.file-name', file.name),
                            m('.file-details', [
                                m('span.file-size', formatFileSize(file.size)),
                                file.type && m('span.file-type', file.type)
                            ]),
                            // Progress bar (if uploading)
                            file.uploadProgress !== undefined && m('.file-progress', [
                                m('.progress', [
                                    m('.determinate', {
                                        style: { width: `${file.uploadProgress}%` }
                                    })
                                ])
                            ]),
                            // Error message
                            file.uploadError && m('.file-error', file.uploadError)
                        ]),
                        // Remove button
                        m('button.btn-flat.file-remove', {
                            onclick: (e) => {
                                e.stopPropagation();
                                removeFile(file, attrs);
                            },
                            title: 'Remove file'
                        }, [
                            m('i.material-icons', 'close')
                        ])
                    ]))
                ])
            ]);
        }
    };
};

/**
 * Sidenav Component
 * A responsive navigation drawer that slides in from the side
 */
const Sidenav = () => {
    let state;
    const handleBackdropClick = (attrs) => {
        if (attrs.closeOnBackdropClick !== false && attrs.onToggle) {
            attrs.onToggle(false);
        }
    };
    const handleEscapeKey = (e, attrs) => {
        if (e.key === 'Escape' && attrs.closeOnEscape !== false && attrs.onToggle) {
            attrs.onToggle(false);
        }
    };
    const setBodyOverflow = (isOpen, mode) => {
        if (typeof document !== 'undefined') {
            document.body.style.overflow = isOpen && mode === 'overlay' ? 'hidden' : '';
        }
    };
    return {
        oninit: ({ attrs }) => {
            state = {
                id: attrs.id || uniqueId(),
                isOpen: attrs.isOpen || false,
                isAnimating: false
            };
            // Set up keyboard listener
            if (typeof document !== 'undefined' && attrs.closeOnEscape !== false) {
                document.addEventListener('keydown', (e) => handleEscapeKey(e, attrs));
            }
        },
        onbeforeupdate: ({ attrs }) => {
            const wasOpen = state.isOpen;
            const isOpen = attrs.isOpen || false;
            if (wasOpen !== isOpen) {
                state.isOpen = isOpen;
                state.isAnimating = true;
                setBodyOverflow(isOpen, attrs.mode || 'overlay');
                // Clear animation state after animation completes
                setTimeout(() => {
                    state.isAnimating = false;
                    m.redraw();
                }, attrs.animationDuration || 300);
            }
        },
        onremove: ({ attrs }) => {
            // Clean up
            setBodyOverflow(false, attrs.mode || 'overlay');
            if (typeof document !== 'undefined' && attrs.closeOnEscape !== false) {
                document.removeEventListener('keydown', (e) => handleEscapeKey(e, attrs));
            }
        },
        view: ({ attrs, children }) => {
            const { position = 'left', mode = 'overlay', width = 300, className = '', showBackdrop = true, animationDuration = 300, fixed = false } = attrs;
            const isOpen = state.isOpen;
            return [
                // Backdrop (using existing materialize class)
                showBackdrop && mode === 'overlay' && m('.sidenav-overlay', {
                    style: {
                        display: isOpen ? 'block' : 'none',
                        opacity: isOpen ? '1' : '0'
                    },
                    onclick: () => handleBackdropClick(attrs)
                }),
                // Sidenav (using existing materialize structure)
                m('ul.sidenav', {
                    id: state.id,
                    class: [
                        position === 'right' ? 'right-aligned' : '',
                        fixed ? 'sidenav-fixed' : '',
                        className
                    ].filter(Boolean).join(' '),
                    style: {
                        width: `${width}px`,
                        transform: isOpen ? 'translateX(0)' :
                            position === 'left' ? 'translateX(-105%)' : 'translateX(105%)',
                        'transition-duration': `${animationDuration}ms`
                    }
                }, children)
            ];
        }
    };
};
/**
 * Sidenav Item Component
 * Individual items for the sidenav menu
 */
const SidenavItem = () => {
    return {
        view: ({ attrs, children }) => {
            const { text, icon, active = false, disabled = false, onclick, href, className = '', divider = false, subheader = false } = attrs;
            if (divider) {
                return m('li.divider');
            }
            if (subheader) {
                return m('li.subheader', text || children);
            }
            const itemClasses = [
                active ? 'active' : '',
                disabled ? 'disabled' : '',
                className
            ].filter(Boolean).join(' ');
            const content = [
                icon && m('i.material-icons', icon),
                text || children
            ];
            if (href && !disabled) {
                return m('li', { class: itemClasses }, [
                    m('a', {
                        href,
                        onclick: disabled ? undefined : onclick
                    }, content)
                ]);
            }
            return m('li', { class: itemClasses }, [
                m('a', {
                    onclick: disabled ? undefined : onclick,
                    href: '#!'
                }, content)
            ]);
        }
    };
};
/**
 * Sidenav utilities for programmatic control
 */
class SidenavManager {
    /**
     * Open a sidenav by ID
     */
    static open(id) {
        const element = document.getElementById(id);
        if (element) {
            element.classList.add('open');
            element.classList.remove('closed');
        }
    }
    /**
     * Close a sidenav by ID
     */
    static close(id) {
        const element = document.getElementById(id);
        if (element) {
            element.classList.remove('open');
            element.classList.add('closed');
        }
    }
    /**
     * Toggle a sidenav by ID
     */
    static toggle(id) {
        const element = document.getElementById(id);
        if (element) {
            const isOpen = element.classList.contains('open');
            if (isOpen) {
                this.close(id);
            }
            else {
                this.open(id);
            }
        }
    }
}

/**
 * Breadcrumb Component
 * Displays a navigation path showing the user's location within a site hierarchy
 */
const Breadcrumb = () => {
    return {
        view: ({ attrs }) => {
            const { items = [], separator = 'chevron_right', className = '', showIcons = false, maxItems, showHome = false } = attrs;
            if (items.length === 0) {
                return null;
            }
            let displayItems = [...items];
            // Handle max items with ellipsis
            if (maxItems && items.length > maxItems) {
                const firstItem = items[0];
                const lastItems = items.slice(-(maxItems - 2));
                displayItems = [
                    firstItem,
                    { text: '...', disabled: true, className: 'breadcrumb-ellipsis' },
                    ...lastItems
                ];
            }
            return m('nav.breadcrumb', { class: className }, [
                m('ol.breadcrumb-list', displayItems.map((item, index) => {
                    const isLast = index === displayItems.length - 1;
                    const isFirst = index === 0;
                    return [
                        // Breadcrumb item
                        m('li.breadcrumb-item', {
                            class: [
                                item.active || isLast ? 'active' : '',
                                item.disabled ? 'disabled' : '',
                                item.className || ''
                            ].filter(Boolean).join(' ')
                        }, [
                            item.href && !item.disabled && !isLast ?
                                // Link item
                                m('a.breadcrumb-link', {
                                    href: item.href,
                                    onclick: item.onclick
                                }, [
                                    (showIcons && item.icon) && m('i.material-icons.breadcrumb-icon', item.icon),
                                    (showHome && isFirst && !item.icon) && m('i.material-icons.breadcrumb-icon', 'home'),
                                    m('span.breadcrumb-text', item.text)
                                ]) :
                                // Text item (active or disabled)
                                m('span.breadcrumb-text', {
                                    onclick: item.disabled ? undefined : item.onclick
                                }, [
                                    (showIcons && item.icon) && m('i.material-icons.breadcrumb-icon', item.icon),
                                    (showHome && isFirst && !item.icon) && m('i.material-icons.breadcrumb-icon', 'home'),
                                    item.text
                                ])
                        ]),
                        // Separator (except for last item)
                        !isLast && m('li.breadcrumb-separator', [
                            m('i.material-icons', separator)
                        ])
                    ];
                }).reduce((acc, val) => acc.concat(val), []))
            ]);
        }
    };
};
/**
 * Simple Breadcrumb utility for common use cases
 */
const createBreadcrumb = (path, basePath = '/') => {
    const segments = path.split('/').filter(Boolean);
    const items = [];
    // Add home item
    items.push({
        text: 'Home',
        href: basePath,
        icon: 'home'
    });
    // Add path segments
    let currentPath = basePath;
    segments.forEach((segment, index) => {
        currentPath += (currentPath.endsWith('/') ? '' : '/') + segment;
        const isLast = index === segments.length - 1;
        items.push({
            text: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
            href: isLast ? undefined : currentPath,
            active: isLast
        });
    });
    return items;
};
/**
 * Breadcrumb utilities
 */
class BreadcrumbManager {
    /**
     * Create breadcrumb items from a route path
     */
    static fromRoute(route, routeConfig = {}) {
        const segments = route.split('/').filter(Boolean);
        const items = [];
        // Add home
        items.push({
            text: 'Home',
            href: '/',
            icon: 'home'
        });
        let currentPath = '';
        segments.forEach((segment, index) => {
            currentPath += '/' + segment;
            const isLast = index === segments.length - 1;
            // Use custom text from config or format segment
            const text = routeConfig[currentPath] ||
                segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
            items.push({
                text,
                href: isLast ? undefined : currentPath,
                active: isLast
            });
        });
        return items;
    }
    /**
     * Create breadcrumb items from a hierarchical object
     */
    static fromHierarchy(hierarchy, textKey = 'name', pathKey = 'path') {
        return hierarchy.map((item, index) => ({
            text: item[textKey],
            href: index === hierarchy.length - 1 ? undefined : item[pathKey],
            active: index === hierarchy.length - 1
        }));
    }
}

/**
 * Wizard/Stepper Component
 * A multi-step interface for guiding users through a process
 */
const Wizard = () => {
    let state;
    const validateStep = async (stepIndex, steps) => {
        const step = steps[stepIndex];
        if (!step || !step.validate)
            return true;
        state.isValidating = true;
        try {
            const isValid = await step.validate();
            if (isValid) {
                state.completedSteps.add(stepIndex);
                state.errorSteps.delete(stepIndex);
            }
            else {
                state.errorSteps.add(stepIndex);
                state.completedSteps.delete(stepIndex);
            }
            return isValid;
        }
        catch (error) {
            state.errorSteps.add(stepIndex);
            state.completedSteps.delete(stepIndex);
            return false;
        }
        finally {
            state.isValidating = false;
            m.redraw();
        }
    };
    const goToStep = async (stepIndex, attrs) => {
        const { linear = true, onStepChange, steps } = attrs;
        if (stepIndex < 0 || stepIndex >= steps.length)
            return false;
        // Check if step is disabled
        if (steps[stepIndex].disabled)
            return false;
        // In linear mode, validate all previous steps
        if (linear && stepIndex > state.currentStep) {
            for (let i = state.currentStep; i < stepIndex; i++) {
                const isValid = await validateStep(i, steps);
                if (!isValid && !steps[i].optional) {
                    return false;
                }
            }
        }
        // Validate current step before moving forward
        if (stepIndex > state.currentStep) {
            const isValid = await validateStep(state.currentStep, steps);
            if (!isValid && !steps[state.currentStep].optional) {
                return false;
            }
        }
        const oldStep = state.currentStep;
        state.currentStep = stepIndex;
        // Always call onStepChange when step changes
        if (onStepChange && oldStep !== stepIndex) {
            onStepChange(stepIndex, steps[stepIndex].id || `step-${stepIndex}`);
        }
        // Force redraw to update UI
        m.redraw();
        return true;
    };
    const nextStep = async (attrs) => {
        const { steps } = attrs;
        // Check if we're on the last step
        if (state.currentStep === steps.length - 1) {
            // This is the complete action
            if (attrs.onComplete) {
                attrs.onComplete();
            }
            return;
        }
        // Try to move to next step
        await goToStep(state.currentStep + 1, attrs);
    };
    const previousStep = (attrs) => {
        goToStep(state.currentStep - 1, attrs);
    };
    const skipStep = (attrs) => {
        const { steps } = attrs;
        const currentStepData = steps[state.currentStep];
        if (currentStepData && currentStepData.optional) {
            goToStep(state.currentStep + 1, attrs);
        }
    };
    return {
        oninit: ({ attrs }) => {
            state = {
                id: uniqueId(),
                currentStep: attrs.currentStep || 0,
                isValidating: false,
                completedSteps: new Set(),
                errorSteps: new Set()
            };
        },
        onbeforeupdate: ({ attrs }) => {
            // Sync external currentStep changes
            if (typeof attrs.currentStep === 'number' && attrs.currentStep !== state.currentStep) {
                state.currentStep = Math.max(0, attrs.currentStep);
            }
        },
        view: ({ attrs }) => {
            const { steps, showStepNumbers = true, className = '', showNavigation = true, labels = {}, orientation = 'horizontal', allowHeaderNavigation = false } = attrs;
            // Ensure currentStep is within bounds
            if (state.currentStep >= steps.length) {
                state.currentStep = Math.max(0, steps.length - 1);
            }
            const currentStepData = steps[state.currentStep];
            const isFirstStep = state.currentStep === 0;
            const isLastStep = state.currentStep === steps.length - 1;
            const activeContent = (currentStepData === null || currentStepData === void 0 ? void 0 : currentStepData.vnode) ? currentStepData.vnode() : null;
            return m('.wizard', { class: `${orientation} ${className}` }, [
                // Step indicator
                m('.wizard-header', [
                    m('.wizard-steps', steps.map((step, index) => {
                        const isActive = index === state.currentStep;
                        const isCompleted = state.completedSteps.has(index);
                        const hasError = state.errorSteps.has(index);
                        return m('.wizard-step', {
                            class: [
                                isActive ? 'active' : '',
                                isCompleted ? 'completed' : '',
                                hasError ? 'error' : '',
                                step.disabled ? 'disabled' : '',
                                step.optional ? 'optional' : ''
                            ].filter(Boolean).join(' '),
                            onclick: allowHeaderNavigation && !step.disabled ?
                                () => goToStep(index, attrs) : undefined
                        }, [
                            // Step number/icon
                            m('.wizard-step-indicator', [
                                isCompleted ?
                                    m('i.material-icons', 'check') :
                                    hasError ?
                                        m('i.material-icons', 'error') :
                                        step.icon ?
                                            m('i.material-icons', step.icon) :
                                            showStepNumbers ?
                                                m('span.wizard-step-number', index + 1) :
                                                null
                            ]),
                            // Step content
                            m('.wizard-step-content', [
                                m('.wizard-step-title', step.title),
                                step.subtitle && m('.wizard-step-subtitle', step.subtitle),
                                step.optional && m('.wizard-step-optional', labels.optional || 'Optional')
                            ]),
                            // Connector line (except for last step in horizontal mode)
                            orientation === 'horizontal' && index < steps.length - 1 &&
                                m('.wizard-step-connector')
                        ]);
                    }))
                ]),
                // Step content
                m('.wizard-body', [
                    activeContent && m('.wizard-step-panel', {
                        key: (currentStepData === null || currentStepData === void 0 ? void 0 : currentStepData.id) || `step-${state.currentStep}`
                    }, activeContent)
                ]),
                // Navigation
                showNavigation && m('.wizard-footer', [
                    m('.wizard-navigation', [
                        // Previous button
                        !isFirstStep && m('button.btn-flat.wizard-btn-previous', {
                            onclick: () => previousStep(attrs),
                            disabled: state.isValidating
                        }, labels.previous || 'Previous'),
                        // Skip button (for optional steps)
                        currentStepData && currentStepData.optional && !isLastStep &&
                            m('button.btn-flat.wizard-btn-skip', {
                                onclick: () => skipStep(attrs),
                                disabled: state.isValidating
                            }, labels.skip || 'Skip'),
                        // Next/Complete button
                        m('button.btn.wizard-btn-next', {
                            onclick: () => nextStep(attrs),
                            disabled: state.isValidating,
                            class: isLastStep ? 'wizard-btn-complete' : ''
                        }, [
                            state.isValidating && m('i.material-icons.left', 'hourglass_empty'),
                            isLastStep ? (labels.complete || 'Complete') : (labels.next || 'Next')
                        ])
                    ])
                ])
            ]);
        }
    };
};
/**
 * Simple linear stepper for forms
 */
const Stepper = () => {
    return {
        view: ({ attrs }) => {
            return m(Wizard, Object.assign(Object.assign({}, attrs), { linear: true, showNavigation: false, allowHeaderNavigation: false, orientation: 'horizontal' }));
        }
    };
};

/**
 * @fileoverview Core TypeScript utility types for mithril-materialized library
 * These types improve type safety and developer experience across all components
 */
/**
 * Type guard to check if validation result indicates success
 * @param result - The validation result to check
 * @returns True if validation passed
 */
const isValidationSuccess = (result) => result === true || result === '';
/**
 * Type guard to check if validation result indicates an error
 * @param result - The validation result to check
 * @returns True if validation failed
 */
const isValidationError = (result) => !isValidationSuccess(result);
// ============================================================================
// EXPORTS
// ============================================================================
// All types are already exported via individual export declarations above

exports.AnchorItem = AnchorItem;
exports.Autocomplete = Autocomplete;
exports.Breadcrumb = Breadcrumb;
exports.BreadcrumbManager = BreadcrumbManager;
exports.Button = Button;
exports.ButtonFactory = ButtonFactory;
exports.Carousel = Carousel;
exports.CharacterCounter = CharacterCounter;
exports.Chips = Chips;
exports.CodeBlock = CodeBlock;
exports.Collapsible = Collapsible;
exports.CollapsibleItem = CollapsibleItem;
exports.Collection = Collection;
exports.ColorInput = ColorInput;
exports.DataTable = DataTable;
exports.DatePicker = DatePicker;
exports.Dropdown = Dropdown;
exports.EmailInput = EmailInput;
exports.FileInput = FileInput;
exports.FileUpload = FileUpload;
exports.FlatButton = FlatButton;
exports.FloatingActionButton = FloatingActionButton;
exports.HelperText = HelperText;
exports.Icon = Icon;
exports.InputCheckbox = InputCheckbox;
exports.Label = Label;
exports.LargeButton = LargeButton;
exports.ListItem = ListItem;
exports.Mandatory = Mandatory;
exports.MaterialBox = MaterialBox;
exports.ModalPanel = ModalPanel;
exports.NumberInput = NumberInput;
exports.Options = Options;
exports.Pagination = Pagination;
exports.Parallax = Parallax;
exports.PasswordInput = PasswordInput;
exports.Pushpin = Pushpin;
exports.PushpinComponent = PushpinComponent;
exports.RadioButton = RadioButton;
exports.RadioButtons = RadioButtons;
exports.RangeInput = RangeInput;
exports.RoundIconButton = RoundIconButton;
exports.SearchSelect = SearchSelect;
exports.SecondaryContent = SecondaryContent;
exports.Select = Select;
exports.Sidenav = Sidenav;
exports.SidenavItem = SidenavItem;
exports.SidenavManager = SidenavManager;
exports.SmallButton = SmallButton;
exports.Stepper = Stepper;
exports.SubmitButton = SubmitButton;
exports.Switch = Switch;
exports.Tabs = Tabs;
exports.TextArea = TextArea;
exports.TextInput = TextInput;
exports.ThemeManager = ThemeManager;
exports.ThemeSwitcher = ThemeSwitcher;
exports.ThemeToggle = ThemeToggle;
exports.TimePicker = TimePicker;
exports.Toast = Toast;
exports.ToastComponent = ToastComponent;
exports.Tooltip = Tooltip;
exports.TooltipComponent = TooltipComponent;
exports.UrlInput = UrlInput;
exports.Wizard = Wizard;
exports.createBreadcrumb = createBreadcrumb;
exports.getDropdownStyles = getDropdownStyles;
exports.initPushpins = initPushpins;
exports.initTooltips = initTooltips;
exports.isNumeric = isNumeric;
exports.isValidationError = isValidationError;
exports.isValidationSuccess = isValidationSuccess;
exports.padLeft = padLeft;
exports.range = range;
exports.toast = toast;
exports.uniqueId = uniqueId;
exports.uuid4 = uuid4;


/***/ }),

/***/ 7589:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



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

/***/ 8010:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



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

/***/ 9302:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_cjs_js_index_min_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1092);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_pnpm_style_loader_4_0_0_webpack_5_101_0_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_cjs_js_index_min_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A, options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_pnpm_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_cjs_js_index_min_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A && _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_cjs_js_index_min_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals ? _node_modules_pnpm_css_loader_7_1_2_webpack_5_101_0_node_modules_css_loader_dist_cjs_js_index_min_css__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A.locals : undefined);


/***/ }),

/***/ 9372:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



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

module.exports = __webpack_require__.p + "0c35d18bf06992036b69.woff2";

/***/ }),

/***/ 9563:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var mountRedraw = __webpack_require__(4159)

module.exports = __webpack_require__(9372)(typeof window !== "undefined" ? window : null, mountRedraw)


/***/ }),

/***/ 9618:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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
const theme_page_1 = __webpack_require__(6323);
const navigation_page_1 = __webpack_require__(705);
const datatable_page_1 = __webpack_require__(1103);
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
    Dashboards["THEME"] = "THEME";
    Dashboards["NAVIGATION"] = "NAVIGATION";
    Dashboards["DATATABLE"] = "DATATABLE";
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
        id: Dashboards.DATATABLE,
        title: 'DATA TABLE',
        icon: 'table_chart',
        route: '/datatable',
        visible: true,
        component: datatable_page_1.DataTablePage,
    },
    {
        id: Dashboards.THEME,
        title: 'THEME',
        icon: 'palette',
        route: '/theme',
        visible: true,
        component: theme_page_1.ThemePage,
    },
    {
        id: Dashboards.NAVIGATION,
        title: 'NAVIGATION',
        icon: 'navigation',
        route: '/navigation',
        visible: true,
        component: navigation_page_1.NavigationPage,
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
// This entry needs to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
var __webpack_unused_export__;

__webpack_unused_export__ = ({ value: true });
const tslib_1 = __webpack_require__(5959);
__webpack_require__(4669);
__webpack_require__(9302);
const mithril_1 = tslib_1.__importDefault(__webpack_require__(7406));
const dashboard_service_1 = __webpack_require__(9618);
document.documentElement.setAttribute('lang', 'en');
mithril_1.default.route(document.body, dashboard_service_1.dashboardSvc.defaultRoute, dashboard_service_1.dashboardSvc.routingTable);

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map