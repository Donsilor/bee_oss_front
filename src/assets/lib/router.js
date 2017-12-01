import VueRouter from 'vue-router';
import * as Pages from "../pages/index.js";

const routes = [{
	path: '/',
	name: 'index',
	component: Pages.Login
}, {
	path: '/main',
	name: 'main',
	component: Pages.Main,
	children: [{
		path: '',
		alias: 'home',
		name: 'home',
		component: Pages.Home
	}, {
		path: 'config',
		name: 'config',
		component: Pages.Config
	}, {
		path: 'ops',
		name: 'ops',
		component: Pages.OPS
	},{
        path: 'ops/:id',
        name: 'ops',
        component: Pages.OPS
    }, {
        path: 'rootLog/:id',
        name: 'rootLog',
        component: Pages.RootLog
    },{
        path: 'upgrade',
        name: 'upgrade',
        component: Pages.upgrade
    }, {
		path: 'facility',
		name: 'facility',
		component: Pages.Facility
	}, {
		path: 'cloud',
		name: 'cloud',
		component: Pages.Cloud
	}, {
        path: 'throughData',
        name: 'throughData',
        component: Pages.ThroughData
    }, {
		path: 'cmdb',
		name: 'cmdb',
		component: Pages.CMDB
	}]
}];

const router = new VueRouter({
	routes
});

export default router;