/**
 * 配置管理路由
 *
 * @summary short description for the file
 * @author songwh
 *
 * Created at     : 2019-05-08 16:59:55
 * Last modified  : 2019-07-09 08:57:37
 */
import {
  FamilyImgList,
  Strategy,
  StrategyUuid,
  StrategyConfig,
  CmData,
  MallButtonConfig,
  MallOrder,
  SceneAdmin,
  StartMode,
  AppHomeConfig,
  HomeConfig,
  MusicConfig
} from '../../pages/index.js'

var configManage = [
  {// 家庭背景图
    path: 'familyImgList',
    name: 'familyImgList',
    component: FamilyImgList
  },
  {// 策略组
    path: 'Strategy',
    name: 'Strategy',
    component: Strategy
  },
  {// 策略组用户
    path: 'StrategyUuid',
    name: 'StrategyUuid',
    component: StrategyUuid
  },
  {// 策略组配置
    path: 'StrategyConfig',
    name: 'StrategyConfig',
    component: StrategyConfig
  },
  {// 文案配置
    path: 'CmData',
    name: 'CmData',
    component: CmData
  },
  // {//家居组件
  //   path: 'appHomeConfig',
  //   name: 'appHomeConfig',
  //   component: AppHomeConfig
  // },
  { // 家居组件
    path: 'appHomeConfig',
    name: 'appHomeConfig',
    component: AppHomeConfig,
    children: [
      {
        path: 'home',
        name: 'home',
        component: HomeConfig
      },
      {
        path: 'music',
        name: 'music',
        component: MusicConfig
      }
    ]
  },

  // 家居销售按钮
  {//
    path: 'mallButtonConfig',
    component: MallButtonConfig
  },
  {
    path: 'mallOrder',
    component: MallOrder
  },
  // 场景管理
  {
    path: 'sceneAdmin',
    component: SceneAdmin
  },
  // // 情景管理
  // {
  //   path: 'sightManage',
  //   component: SightManage
  // },
  { // startMode
    path: 'startMode',
    component: StartMode
  }
]

export default configManage
