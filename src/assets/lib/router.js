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
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
