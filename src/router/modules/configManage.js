/**
 * 业务数据路由
 *
 * @summary short description for the file
 * @author songwh
 *
 * Created at     : 2019-05-08 16:59:55 
 * Last modified  : 2019-05-08 17:34:37
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
  SightManage,
  StartMode
} from '../../pages/index.js'

const configManage = [
  {
    path: 'familyImgList',
    name: 'familyImgList',
    component: FamilyImgList
  },
  {
    path: 'Strategy',
    name: 'Strategy',
    component: Strategy
  },
  {
    path: 'StrategyUuid',
    name: 'StrategyUuid',
    component: StrategyUuid
  },
  {
    path: 'StrategyConfig',
    name: 'StrategyConfig',
    component: StrategyConfig
  },
  {
    path: 'CmData',
    name: 'CmData',
    component: CmData
  },
  //家居销售按钮
  {
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
  // 情景管理
  {
    path: 'sightManage',
    component: SightManage
  },
  { // startMode
    path: 'startMode',
    component: StartMode
  }
]

export default configManage
