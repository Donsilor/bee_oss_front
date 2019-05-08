import VueRouter from 'vue-router'
import * as Pages from '../pages/index.js'


import updateManage from './modules/updateManage.js'
import businessData from './modules/businessData.js'
import log from './modules/log.js'
import configManage from './modules/configManage.js'

const routes = [
  {
    path: '/',
    name: 'index',
    component: Pages.Login
  },
  {
    path: '/main',
    name: 'main',
    component: Pages.Main,
    children: [
      {
        path: '',
        alias: 'home',
        name: 'home',
        component: Pages.Home
      },
      ...updateManage,
      ...businessData,
      ...log,
      ...configManage,
      {
        path: 'cloud',
        name: 'cloud',
        component: Pages.Cloud
      },
      {
        path: 'throughData',
        name: 'throughData',
        component: Pages.ThroughData,
        children: [
          {
            path: '',
            name: 'throughAll',
            component: Pages.AllThroughData
          },
          {
            path: 'appRouterData',
            name: 'hasParent/main/throughData',
            component: Pages.AppRouterData
          },
          {
            path: 'devicesData',
            name: 'hasParent/main/throughData',
            component: Pages.DevicesData
          },
          {
            path: 'logRegData',
            name: 'hasParent/main/throughData',
            component: Pages.LogRegData
          },
          {
            path: 'qpsData',
            name: 'hasParent/main/throughData',
            component: Pages.QpsData
          }
        ]
      },
      {
        path: 'cmdb',
        name: 'cmdb',
        component: Pages.CMDB
      },
      {
        path: 'warnManage',
        name: 'warnManage',
        component: Pages.WarnManage
      },
      {
        path: 'warnDataSearch',
        name: 'warnDataSearch',
        component: Pages.WarnDataSearch
      },
      {
        path: 'familyList',
        name: 'familyList',
        component: Pages.FamilyList
      },
      {
        path: 'routerManager',
        name: 'routerIndex',
        component: Pages.RouterIndex,
        children: [
          {
            path: '',
            name: 'routerManager',
            component: Pages.RouterManager
          },
          {
            path: 'import',
            name: 'hasParent/main/routerManager',
            component: Pages.ImportRouter
          }
        ]
      },
      {
        path: 'user',
        name: 'user',
        component: Pages.User
      },
      {
        path: 'role',
        name: 'role',
        component: Pages.Role
      },
      {
        path: 'updatePassword',
        name: 'updatePassword',
        component: Pages.UpdatePwd
      },
      {
        path: 'resetPassword',
        name: 'resetPassword',
        component: Pages.ResetPwd
      },
      {
        path: 'analyzer',
        name: 'analyzer',
        component: Pages.RouterIndex,
        children: [
          {
            path: 'userData',
            name: 'userData',
            component: Pages.UserData
          },
          {
            path: 'deviceData',
            name: 'deviceData',
            component: Pages.DeviceData
          },
          {
            path: 'accessStatistics',
            name: 'accessStatistics',
            component: Pages.AccessStatistics
          },
          {
            path: 'controlAnalysis',
            name: 'controlAnalysis',
            component: Pages.ControlAnalysis
          },
          {
            path: 'activeAnalysis',
            name: 'activeAnalysis',
            component: Pages.ActiveAnalysis
          },
          {
            path: 'routingAnalysis',
            name: 'routingAnalysis',
            component: Pages.RoutingAnalysis
          },
          {
            path: 'dailyData',
            name: 'dailyData',
            component: Pages.DailyData
          }
        ]
      },
      {
        path: 'feedback/list',
        name: 'feedbackList',
        component: Pages.FeedbackList
      },
      {
        path: 'feedback/detail/:id',
        name: 'feedbackDetail',
        component: Pages.FeedbackDetail
      },
      // 开关生产信息查询
      {
        path: 'switchproduct/history',
        component: Pages.SwitchProductHistory
      },
      {
        path: 'switchproduct/import',
        component: Pages.SwitchProductImport
      },
      {
        path: 'switchproduct/search',
        component: Pages.SwitchProductSearch
      },
      // 商城预定
      {
        path: 'mallReservation',
        component: Pages.MallReservation
      }
    ]
  },
  {
    path: '*',
    name: 'error',
    component: Pages.Error
  }
]

const router = new VueRouter({
  routes
})

export default router
