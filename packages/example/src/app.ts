import 'material-icons/iconfont/filled.css';
import 'mithril-materialized/index.min.css';
import m from 'mithril';
import { dashboardSvc } from './services/dashboard-service';

document.documentElement.setAttribute('lang', 'en');

m.route(document.body, dashboardSvc.defaultRoute, dashboardSvc.routingTable);
