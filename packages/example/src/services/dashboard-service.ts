import m, { ComponentTypes, RouteDefs } from 'mithril';
import { IDashboard } from '../models/dashboard';
import { Layout } from '../components/layout';
import { HomePage } from '../components/home/home-page';
import { AboutPage } from '../components/about/about-page';
import { ButtonPage } from '../components/buttons/button-page';
import { InputPage } from '../components/inputs/input-page';
import { PickerPage } from '../components/pickers/picker-page';
import { SelectionPage } from '../components/selections/selection-page';
import { ModalPage } from '../components/modals/modal-page';
import { MiscPage } from '../components/misc/misc-page';
import { CollectionsPage } from '../components/collections/collections-page';
import { ThemePage } from '../components/theme/theme-page';
import { NavigationPage } from '../components/navigation/navigation-page';
import { DataTablePage } from '../components/datatable/datatable-page';
import { TimelinePage } from '../components/timeline-page';
import { MasonryPage } from '../components/masonry-page';
import { ImageListPage } from '../components/image-list-page';
import { RatingPage } from '../components/rating-page';
import { ProgressPage } from '../components/progress-page';
import { CssPage } from '../components/css/css-page';

export enum Dashboards {
  HOME = 'HOME',
  BUTTONS = 'BUTTONS',
  INPUTS = 'INPUTS',
  PICKERS = 'PICKERS',
  SELECTIONS = 'SELECTIONS',
  COLLECTIONS = 'COLLECTIONS',
  MAP_EDITOR = 'MAP_EDITOR',
  MODALS = 'MODALS',
  THEME = 'THEME',
  NAVIGATION = 'NAVIGATION',
  DATATABLE = 'DATATABLE',
  TIMELINE = 'TIMELINE',
  MASONRY = 'MASONRY',
  IMAGE_LIST = 'IMAGE_LIST',
  RATING = 'RATING',
  PROGRESS = 'PROGRESS',
  MISC = 'MISC',
  ABOUT = 'ABOUT',
  CSS = 'CSS',
  CSS_GRID = 'CSS_GRID',
  CSS_HELPERS = 'CSS_HELPERS',
  CSS_MEDIA = 'CSS_MEDIA',
  CSS_PULSE = 'CSS_PULSE',
  CSS_SASS = 'CSS_SASS',
  CSS_SHADOW = 'CSS_SHADOW',
  CSS_TABLE = 'CSS_TABLE',
  CSS_TRANSITIONS = 'CSS_TRANSITIONS',
  CSS_TYPOGRAPHY = 'CSS_TYPOGRAPHY',
  CSS_THEMING = 'CSS_THEMING',
}

export interface SearchEntry {
  title: string;
  page: string;
  route: string;
  hash?: string;
}

export const searchIndex: SearchEntry[] = [
  // General
  { title: 'Home', page: 'General', route: '/home' },
  { title: 'About', page: 'General', route: '/about' },
  // Inputs
  { title: 'Inputs', page: 'Forms', route: '/inputs' },
  { title: 'TextInput', page: 'Inputs', route: '/inputs', hash: 'textinput' },
  { title: 'Autocomplete', page: 'Inputs', route: '/inputs', hash: 'autocomplete' },
  { title: 'SearchSelect', page: 'Inputs', route: '/inputs', hash: 'searchselect' },
  { title: 'TextArea', page: 'Inputs', route: '/inputs', hash: 'textarea' },
  { title: 'NumberInput', page: 'Inputs', route: '/inputs', hash: 'numberinput' },
  { title: 'EmailInput', page: 'Inputs', route: '/inputs', hash: 'emailinput' },
  { title: 'UrlInput', page: 'Inputs', route: '/inputs', hash: 'urlinput' },
  { title: 'PasswordInput', page: 'Inputs', route: '/inputs', hash: 'passwordinput' },
  { title: 'FileInput', page: 'Inputs', route: '/inputs', hash: 'fileinput' },
  { title: 'RangeInput', page: 'Inputs', route: '/inputs', hash: 'rangeinput' },
  { title: 'Chips', page: 'Inputs', route: '/inputs', hash: 'chips' },
  { title: 'ColorInput', page: 'Inputs', route: '/inputs', hash: 'colorinput' },
  // Pickers
  { title: 'Pickers', page: 'Forms', route: '/pickers' },
  { title: 'DatePicker', page: 'Pickers', route: '/pickers', hash: 'datepicker' },
  { title: 'Date Range Picker', page: 'Pickers', route: '/pickers', hash: 'daterangepicker' },
  { title: 'TimePicker', page: 'Pickers', route: '/pickers', hash: 'timepicker' },
  { title: 'AnalogClock', page: 'Pickers', route: '/pickers', hash: 'analogclock' },
  // Selections
  { title: 'Selections', page: 'Forms', route: '/selections' },
  { title: 'Select', page: 'Selections', route: '/selections', hash: 'select' },
  { title: 'RadioButtons', page: 'Selections', route: '/selections', hash: 'radiobuttons' },
  { title: 'LikertScale', page: 'Selections', route: '/selections', hash: 'likert' },
  { title: 'Switch', page: 'Selections', route: '/selections', hash: 'switch' },
  { title: 'Dropdown', page: 'Selections', route: '/selections', hash: 'dropdown' },
  // Buttons
  { title: 'Buttons', page: 'Forms', route: '/buttons' },
  { title: 'Button (FAB)', page: 'Buttons', route: '/buttons', hash: 'fab' },
  { title: 'Button (Raised)', page: 'Buttons', route: '/buttons', hash: 'raised' },
  { title: 'FlatButton', page: 'Buttons', route: '/buttons', hash: 'flatbutton' },
  { title: 'IconButton', page: 'Buttons', route: '/buttons', hash: 'iconbutton' },
  { title: 'RoundIconButton', page: 'Buttons', route: '/buttons', hash: 'roundiconbutton' },
  { title: 'ToggleGroup', page: 'Buttons', route: '/buttons', hash: 'togglegroup' },
  { title: 'SubmitButton', page: 'Buttons', route: '/buttons', hash: 'submitbutton' },
  { title: 'ConfirmButton', page: 'Buttons', route: '/buttons', hash: 'confirmbutton' },
  // Collections
  { title: 'Collections', page: 'Components', route: '/collections' },
  { title: 'Collapsible', page: 'Collections', route: '/collections', hash: 'collapsible' },
  // Modals
  { title: 'Modals', page: 'Components', route: '/modals' },
  { title: 'Modal', page: 'Modals', route: '/modals', hash: 'modal' },
  // Navigation
  { title: 'Navigation', page: 'Components', route: '/navigation' },
  { title: 'Breadcrumb', page: 'Navigation', route: '/navigation', hash: 'breadcrumb' },
  { title: 'Sidenav', page: 'Navigation', route: '/navigation', hash: 'sidenav' },
  { title: 'Wizard / Stepper', page: 'Navigation', route: '/navigation', hash: 'wizard' },
  // DataTable
  { title: 'DataTable', page: 'Components', route: '/datatable', hash: 'datatable' },
  { title: 'TreeView', page: 'DataTable', route: '/datatable', hash: 'treeview' },
  // Misc
  { title: 'Miscellaneous', page: 'Components', route: '/misc' },
  { title: 'Toast', page: 'Misc', route: '/misc', hash: 'toast' },
  { title: 'Badge', page: 'Misc', route: '/misc', hash: 'badge' },
  { title: 'Tooltip', page: 'Misc', route: '/misc', hash: 'tooltip' },
  { title: 'Tabs', page: 'Misc', route: '/misc', hash: 'tabs' },
  { title: 'Carousel', page: 'Misc', route: '/misc', hash: 'carousel' },
  { title: 'Pagination', page: 'Misc', route: '/misc', hash: 'pagination' },
  { title: 'Parallax', page: 'Misc', route: '/misc', hash: 'parallax' },
  // Display
  { title: 'Timeline', page: 'Display', route: '/timeline' },
  { title: 'Masonry', page: 'Display', route: '/masonry' },
  { title: 'Image List', page: 'Display', route: '/image-list' },
  { title: 'Rating', page: 'Display', route: '/rating' },
  { title: 'Progress', page: 'Display', route: '/progress' },
  // Styling
  { title: 'Theme', page: 'Styling', route: '/theme' },
  { title: 'ThemeSwitcher', page: 'Theme', route: '/theme', hash: 'themeswitcher' },
  { title: 'ThemeToggle', page: 'Theme', route: '/theme', hash: 'themetoggle' },
  { title: 'FileUpload', page: 'Theme', route: '/theme', hash: 'fileupload' },
  { title: 'CSS', page: 'Styling', route: '/css/color' },
];

class DashboardService {
  private dashboards!: ReadonlyArray<IDashboard>;

  constructor(private layout: ComponentTypes, dashboards: IDashboard[]) {
    this.setList(dashboards);
  }

  public getList() {
    return this.dashboards;
  }

  public setList(list: IDashboard[]) {
    this.dashboards = Object.freeze(list);
  }

  public get defaultRoute() {
    const dashboard = this.dashboards.filter((d) => d.default).shift();
    return dashboard ? dashboard.route : this.dashboards[0].route;
  }

  public switchTo(dashboardId: Dashboards, _fragment = '') {
    const dashboard = this.dashboards.filter((d) => d.id === dashboardId).shift();
    if (dashboard) {
      m.route.set(dashboard.route);
    }
  }

  public get routingTable() {
    return this.dashboards.reduce((p, c) => {
      p[c.route] = { render: () => m(this.layout, m(c.component)) };
      return p;
    }, {} as RouteDefs);
  }
}

export const dashboardSvc: DashboardService = new DashboardService(Layout, [
  {
    id: Dashboards.HOME,
    default: true,
    title: 'Home',
    icon: 'home',
    route: '/home',
    visible: true,
    group: 'general',
    component: HomePage,
  },
  {
    id: Dashboards.ABOUT,
    title: 'About',
    icon: 'info',
    route: '/about',
    visible: true,
    group: 'general',
    component: AboutPage,
  },
  {
    id: Dashboards.BUTTONS,
    title: 'Buttons',
    icon: 'crop_16_9',
    route: '/buttons',
    visible: true,
    group: 'forms',
    component: ButtonPage,
  },
  {
    id: Dashboards.INPUTS,
    title: 'Inputs',
    icon: 'create',
    route: '/inputs',
    visible: true,
    group: 'forms',
    component: InputPage,
  },
  {
    id: Dashboards.PICKERS,
    title: 'Pickers',
    icon: 'access_time',
    route: '/pickers',
    visible: true,
    group: 'forms',
    component: PickerPage,
  },
  {
    id: Dashboards.SELECTIONS,
    title: 'Selections',
    icon: 'check',
    route: '/selections',
    visible: true,
    group: 'forms',
    component: SelectionPage,
  },
  {
    id: Dashboards.COLLECTIONS,
    title: 'Collections',
    icon: 'collections',
    route: '/collections',
    visible: true,
    group: 'components',
    component: CollectionsPage,
  },
  {
    id: Dashboards.MODALS,
    title: 'Modals',
    icon: 'all_out',
    route: '/modals',
    visible: true,
    group: 'components',
    component: ModalPage,
  },
  {
    id: Dashboards.NAVIGATION,
    title: 'Navigation',
    icon: 'navigation',
    route: '/navigation',
    visible: true,
    group: 'components',
    component: NavigationPage,
  },
  {
    id: Dashboards.DATATABLE,
    title: 'Data Table',
    icon: 'table_chart',
    route: '/datatable',
    visible: true,
    group: 'components',
    component: DataTablePage,
  },
  {
    id: Dashboards.MISC,
    title: 'Miscellaneous',
    icon: 'image',
    route: '/misc',
    visible: true,
    group: 'components',
    component: MiscPage,
  },
  {
    id: Dashboards.TIMELINE,
    title: 'Timeline',
    icon: 'timeline',
    route: '/timeline',
    visible: true,
    group: 'display',
    component: TimelinePage,
  },
  {
    id: Dashboards.MASONRY,
    title: 'Masonry',
    icon: 'view_comfy',
    route: '/masonry',
    visible: true,
    group: 'display',
    component: MasonryPage,
  },
  {
    id: Dashboards.IMAGE_LIST,
    title: 'Image List',
    icon: 'photo_library',
    route: '/image-list',
    visible: true,
    group: 'display',
    component: ImageListPage,
  },
  {
    id: Dashboards.RATING,
    title: 'Rating',
    icon: 'star',
    route: '/rating',
    visible: true,
    group: 'display',
    component: RatingPage,
  },
  {
    id: Dashboards.PROGRESS,
    title: 'Progress',
    icon: 'hourglass_empty',
    route: '/progress',
    visible: true,
    group: 'display',
    component: ProgressPage,
  },
  {
    id: Dashboards.THEME,
    title: 'Theme',
    icon: 'palette',
    route: '/theme',
    visible: true,
    group: 'styling',
    component: ThemePage,
  },
  {
    id: Dashboards.CSS,
    title: 'CSS',
    icon: 'style',
    route: '/css/color',
    visible: true,
    group: 'styling',
    component: CssPage,
  },
  { id: Dashboards.CSS_GRID,        title: 'Grid',        route: '/css/grid',        visible: false, component: CssPage },
  { id: Dashboards.CSS_HELPERS,     title: 'Helpers',     route: '/css/helpers',     visible: false, component: CssPage },
  { id: Dashboards.CSS_MEDIA,       title: 'Media',       route: '/css/media',       visible: false, component: CssPage },
  { id: Dashboards.CSS_PULSE,       title: 'Pulse',       route: '/css/pulse',       visible: false, component: CssPage },
  { id: Dashboards.CSS_SASS,        title: 'Sass',        route: '/css/sass',        visible: false, component: CssPage },
  { id: Dashboards.CSS_SHADOW,      title: 'Shadow',      route: '/css/shadow',      visible: false, component: CssPage },
  { id: Dashboards.CSS_TABLE,       title: 'Table',       route: '/css/table',       visible: false, component: CssPage },
  { id: Dashboards.CSS_TRANSITIONS, title: 'Transitions', route: '/css/transitions', visible: false, component: CssPage },
  { id: Dashboards.CSS_TYPOGRAPHY,  title: 'Typography',  route: '/css/typography',  visible: false, component: CssPage },
  { id: Dashboards.CSS_THEMING,     title: 'Theming',     route: '/css/theming',     visible: false, component: CssPage },
]);
