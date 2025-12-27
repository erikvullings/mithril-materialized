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
}

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

  public switchTo(dashboardId: Dashboards, fragment = '') {
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
    title: 'HOME',
    icon: 'home',
    route: '/home',
    visible: true,
    component: HomePage,
  },
  {
    id: Dashboards.BUTTONS,
    title: 'BUTTONS',
    icon: 'crop_16_9',
    route: '/buttons',
    visible: true,
    component: ButtonPage,
  },
  {
    id: Dashboards.INPUTS,
    title: 'INPUTS',
    icon: 'create',
    route: '/inputs',
    visible: true,
    component: InputPage,
  },
  {
    id: Dashboards.PICKERS,
    title: 'PICKERS',
    icon: 'access_time',
    route: '/pickers',
    visible: true,
    component: PickerPage,
  },
  {
    id: Dashboards.SELECTIONS,
    title: 'SELECTIONS',
    icon: 'check',
    route: '/selections',
    visible: true,
    component: SelectionPage,
  },
  {
    id: Dashboards.MODALS,
    title: 'MODALS',
    icon: 'all_out',
    route: '/modals',
    visible: true,
    component: ModalPage,
  },
  {
    id: Dashboards.COLLECTIONS,
    title: 'COLLECTIONS',
    icon: 'collections',
    route: '/collections',
    visible: true,
    component: CollectionsPage,
  },
  {
    id: Dashboards.DATATABLE,
    title: 'DATA TABLE',
    icon: 'table_chart',
    route: '/datatable',
    visible: true,
    component: DataTablePage,
  },
  {
    id: Dashboards.THEME,
    title: 'THEME',
    icon: 'palette',
    route: '/theme',
    visible: true,
    component: ThemePage,
  },
  {
    id: Dashboards.NAVIGATION,
    title: 'NAVIGATION',
    icon: 'navigation',
    route: '/navigation',
    visible: true,
    component: NavigationPage,
  },
  {
    id: Dashboards.TIMELINE,
    title: 'TIMELINE',
    icon: 'timeline',
    route: '/timeline',
    visible: true,
    component: TimelinePage,
  },
  {
    id: Dashboards.MASONRY,
    title: 'MASONRY',
    icon: 'view_comfy',
    route: '/masonry',
    visible: true,
    component: MasonryPage,
  },
  {
    id: Dashboards.IMAGE_LIST,
    title: 'IMAGE LIST',
    icon: 'photo_library',
    route: '/image-list',
    visible: true,
    component: ImageListPage,
  },
  {
    id: Dashboards.RATING,
    title: 'RATING',
    icon: 'star',
    route: '/rating',
    visible: true,
    component: RatingPage,
  },
  {
    id: Dashboards.PROGRESS,
    title: 'PROGRESS',
    icon: 'hourglass_empty',
    route: '/progress',
    visible: true,
    component: ProgressPage,
  },
  {
    id: Dashboards.MISC,
    title: 'MISCELLANEOUS',
    icon: 'image',
    route: '/misc',
    visible: true,
    component: MiscPage,
  },
  {
    id: Dashboards.ABOUT,
    title: 'ABOUT',
    icon: 'info',
    route: '/about',
    visible: true,
    component: AboutPage,
  },
]);
