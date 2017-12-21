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
    },{
        path: 'rootLog',
        name: 'rootLog',
        component: Pages.RootLog
    },{
        path: 'errLog',
        name: 'errLog',
        component: Pages.ErrLog
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
        component: Pages.ThroughData,
        children: [
            {
                path: '',
                name: 'throughAll',
                component: Pages.AllThroughData,
            },
			{
                path: 'appRouterData',
                name: 'appRouterData',
                component: Pages.AppRouterData,
			},
            {
                path: 'devicesData',
                name: 'devicesData',
                component: Pages.DevicesData,
            },
            {
                path: 'logRegData',
                name: 'logRegData',
                component: Pages.LogRegData,
            },
            {
                path: 'qpsData',
                name: 'qpsData',
                component: Pages.QpsData,
            }
		]
    }, {
        path: 'cmdb',
        name: 'cmdb',
        component: Pages.CMDB
    }, {
		path: 'warnManage',
		name: 'warnManage',
		component: Pages.WarnManage
	},{
        path: 'warnDataSearch',
        name: 'warnDataSearch',
        component: Pages.WarnDataSearch
    },{
        path: 'familyList',
        name: 'familyList',
        component: Pages.FamilyList
    }]
}];

const router = new VueRouter({
	routes
});

export default router;