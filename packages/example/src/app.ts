import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import 'material-icons/iconfont/filled.css';
import 'mithril-materialized/index.css';
import m from 'mithril';
import { dashboardSvc } from './services/dashboard-service';
// import '@materializecss/materialize/dist/css/materialize.min.css';
// import '/home/erik/dev/mithril-materialized/node_modules/.pnpm/@materializecss+materialize@2.0.1-alpha/node_modules/@materializecss/materialize/dist/css/materialize.min.css';

m.route(document.body, dashboardSvc.defaultRoute, dashboardSvc.routingTable);
