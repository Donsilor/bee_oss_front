import VueRouter from 'vue-router'
import * as Pages from '../pages/index.js'


import updateManage from './modules/updateManage.js'
import businessData from './modules/businessData.js'
import log from './modules/log.js'
import configManage from './modules/configManage.js'
import switchInfo from './modules/switchInfo'
import dataStatistics from './modules/dataStatistics'
import permissionSettings from './modules/permissionSettings'
import warningManagement from './modules/warningManagement'
import subData from './modules/subData'

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
      ...switchInfo,
      ...dataStatistics,
      ...permissionSettings,
      ...warningManagement,
      ...subData,
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
      {//用户反馈
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
