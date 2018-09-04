import VueRouter from "vue-router";
import * as Pages from "../pages/index.js";

const routes = [
	{
		path: "/",
		name: "index",
		component: Pages.Login
	},
	{
		path: "/main",
		name: "main",
		component: Pages.Main,
		children: [
			{
				path: "",
				alias: "home",
				name: "home",
				component: Pages.Home
			},
			{
				path: "versionManager",
				name: "versionManager",
				component: Pages.VersionManager
			},
			{
				path: "VersionManagerForSC",
				name: "VersionManagerForSC",
				component: Pages.VersionManagerForSC
			},
			{
				path: "pushManager",
				name: "pushManager",
				component: Pages.PushManager
			},
			{
				path: "ops",
				name: "ops",
				component: Pages.OPS
			},
			{
				path: "muser",
				name: "muser",
				component: Pages.MUSER
			},
			{
				path: "ops/:id",
				name: "ops",
				component: Pages.OPS
			},
			{
				path: "rootLog",
				name: "rootLog",
				component: Pages.RootLog
			},
			{
				path: "errLog",
				name: "errLog",
				component: Pages.ErrLog
			},
			{
				path: "upgrade",
				name: "upgrade",
				component: Pages.upgrade
			},
			{
				path: "facility",
				name: "facility",
				component: Pages.Facility
			},
			{
				path: "cloud",
				name: "cloud",
				component: Pages.Cloud
			},
			{
				path: "throughData",
				name: "throughData",
				component: Pages.ThroughData,
				children: [
					{
						path: "",
						name: "throughAll",
						component: Pages.AllThroughData
					},
					{
						path: "appRouterData",
						name: "hasParent/main/throughData",
						component: Pages.AppRouterData
					},
					{
						path: "devicesData",
						name: "hasParent/main/throughData",
						component: Pages.DevicesData
					},
					{
						path: "logRegData",
						name: "hasParent/main/throughData",
						component: Pages.LogRegData
					},
					{
						path: "qpsData",
						name: "hasParent/main/throughData",
						component: Pages.QpsData
					}
				]
			},
			{
				path: "cmdb",
				name: "cmdb",
				component: Pages.CMDB
			},
			{
				path: "warnManage",
				name: "warnManage",
				component: Pages.WarnManage
			},
			{
				path: "warnDataSearch",
				name: "warnDataSearch",
				component: Pages.WarnDataSearch
			},
			{
				path: "familyList",
				name: "familyList",
				component: Pages.FamilyList
			},
			{
				path: "routerManager",
				name: "routerIndex",
				component: Pages.RouterIndex,
				children: [
					{
						path: "",
						name: "routerManager",
						component: Pages.RouterManager
					},
					{
						path: "import",
						name: "hasParent/main/routerManager",
						component: Pages.ImportRouter
					}
				]
			},
			{
				path: "familyImgList",
				name: "familyImgList",
				component: Pages.FamilyImgList
			},
			{
				path: "Strategy",
				name: "Strategy",
				component: Pages.Strategy
			},
			{
				path: "StrategyUuid",
				name: "StrategyUuid",
				component: Pages.StrategyUuid
			},
			{
				path: "StrategyConfig",
				name: "StrategyConfig",
				component: Pages.StrategyConfig
			},
			{
				path: "CmData",
				name: "CmData",
				component: Pages.CmData
			},
			{
				path: "user",
				name: "user",
				component: Pages.User
			},
			{
				path: "role",
				name: "role",
				component: Pages.Role
			},
			{
				path: "updatePassword",
				name: "updatePassword",
				component: Pages.UpdatePwd
			},
			{
				path: "resetPassword",
				name: "resetPassword",
				component: Pages.ResetPwd
			},
			{
				path: "analyzer",
				name: "analyzer",
				component: Pages.RouterIndex,
				children: [
					{
						path: "userData",
						name: "userData",
						component: Pages.UserData
					},
					{
						path: "deviceData",
						name: "deviceData",
						component: Pages.DeviceData
					}
				]
			},
			{
				path: "feedback/list",
				name: "feedbackList",
				component: Pages.FeedbackList
			},
			{
				path: "feedback/detail/:id",
				name: "feedbackDetail",
				component: Pages.FeedbackDetail
			}
		]
	},
	{
		path: "*",
		name: "error",
		component: Pages.Error
	}
];

const router = new VueRouter({
	routes
});

export default router;
