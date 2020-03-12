import VueRouter from 'vue-router'
import Vue from 'vue'
import * as Pages from '../pages/index.js'

import updateManage from './modules/updateManage.js'
import businessData from './modules/businessData.js'
import log from './modules/log.js'
import configManage from './modules/configManage.js'
import switchInfo from './modules/switchInfo.js'
import dataStatistics from './modules/dataStatistics.js'
import permissionSettings from './modules/permissionSettings.js'
import warningManagement from './modules/warningManagement.js'
import subData from './modules/subData.js'
import semanticMange from './modules/semanticMange.js'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'index',
    component: Pages.Login
  },
  {
    path: '/main',
    component: Pages.Main,
    children: [
      ...updateManage,
      ...businessData,
      ...log,
      ...configManage,
      ...switchInfo,
      ...dataStatistics,
      ...permissionSettings,
      ...warningManagement,
      ...subData,
      ...semanticMange,
      {
        path: '/',
        alias: 'home',
        name: 'home',
        component: Pages.Home
      },
      {
        path: 'cloud',
        name: 'cloud',
        component: Pages.Cloud
      },
      {
        path: 'cmdb',
        name: 'cmdb',
        component: Pages.CMDB
      },
      {// 路由器管理
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
        path: 'bindRouter',
        name: 'bindRouter',
        component: Pages.BindRouter
      },
      {// 云端直连设备
        path: 'cloudConnectDevice',
        name: 'cloudIndex',
        component: Pages.CloudIndex,
        children: [
          {
            path: '',
            name: 'cloudConnectDevice',
            component: Pages.CloudConnectDevice
          },
          {
            path: 'import',
            name: 'hasParent/main/cloudConnectDevice',
            component: Pages.ImportCloud
          }
        ]
      },
      {// 用户反馈
        path: 'feedback/list',
        name: 'feedbackList',
        component: Pages.FeedbackList
      },
      {
        path: 'feedback/detail/:id',
        name: 'feedbackDetail',
        component: Pages.FeedbackDetail
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
