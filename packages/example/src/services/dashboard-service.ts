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

export const enum Dashboards {
  HOME = 'HOME',
  BUTTONS = 'BUTTONS',
  INPUTS = 'INPUTS',
  PICKERS = 'PICKERS',
  SELECTIONS = 'SELECTIONS',
  MODALS = 'MODALS',
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
    const dashboard = this.dashboards.filter(d => d.default).shift();
    return dashboard ? dashboard.route : this.dashboards[0].route;
  }

  public switchTo(dashboardId: Dashboards, fragment = '') {
    const dashboard = this.dashboards.filter(d => d.id === dashboardId).shift();
    if (dashboard) {
      m.route.set(dashboard.route);
    }
  }

  public get routingTable() {
    return this.dashboards.reduce(
      (p, c) => {
        p[c.route] = { render: () => m(this.layout, m(c.component)) };
        return p;
      },
      {} as RouteDefs
    );
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
    id: Dashboards.ABOUT,
    title: 'ABOUT',
    icon: 'info',
    route: '/about',
    visible: true,
    component: AboutPage,
  },
]);
