import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons/iconfont/material-icons.css';
import 'mithril-materialized/index.css';
import m from 'mithril';
import { dashboardSvc } from './services/dashboard-service';

m.route(document.body, dashboardSvc.defaultRoute, dashboardSvc.routingTable);
