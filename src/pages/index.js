import Login from './login.vue'
import Main from './main.vue'
import Home from './home.vue'
import Facility from './facility.vue'
import Cloud from './cloud.vue'
import CMDB from './cmdb.vue'
import upgrade from './upgradeCenter.vue'
import VersionManager from './upgradeCenter/versionManager.vue'
import VersionManagerDetail from './upgradeCenter/versionManagerDetail.vue'
import PushManager from './upgradeCenter/pushManager.vue'
import OPS from './userData/ops.vue'
import MUSER from './userData/muser/index.vue'
import ThroughData from './throughData/index.vue'
import AllThroughData from './throughData/allData.vue'
import AppRouterData from './throughData/appRouterData.vue'
import DevicesData from './throughData/devicesData.vue'
import LogRegData from './throughData/logRegData.vue'
import QpsData from './throughData/qpsData.vue'
import WarnManage from './warnManager/warnManage.vue'
import WarnDataSearch from './warnManager/warnDataSearch.vue'
import RootLog from './allLogs/rootLogs.vue'
import ErrLog from './allLogs/errLogs.vue'
import RouterIndex from './routerManager/index.vue'
import RouterManager from './routerManager/routerManager.vue'
import ImportRouter from './routerManager/importRouter.vue'
import FamilyList from './familyList.vue'
import FamilyImgList from './familyImg/index.vue'
import User from './permission/user.vue'
import Role from './permission/role.vue'
import ResetPwd from './permission/resetPwd.vue'
import UpdatePwd from './permission/updatePwd.vue'
import Error from './error.vue'

import UserData from './analyzer/userData.vue'
import DeviceData from './analyzer/deviceData.vue'
// 新加的页面
import AccessStatistics from './analyzer/accessStatistics.vue'
import ControlAnalysis from './analyzer/controlAnalysis.vue'
import ActiveAnalysis from './analyzer/activeAnalysis.vue'
import RoutingAnalysis from './analyzer/routingAnalysis.vue'
import DailyData from './analyzer/dailyData.vue'

import FeedbackList from './feedback/list.vue'
import FeedbackDetail from './feedback/detail.vue'
import Strategy from './strategy/strategy.vue'
import StrategyUuid from './strategy/strategyUuid.vue'
import StrategyConfig from './strategy/strategyConfig.vue'
import CmData from './CmData.vue'

import VersionManagerForSC from './upgradeCenter/versionManagerForSC.vue'
import SwitchProductHistory from './switchproduct/history.vue'
import SwitchProductImport from './switchproduct/import.vue'
import SwitchProductSearch from './switchproduct/search.vue'
import AppUpgrade from './upgradeCenter/appUpgrade.vue'
import AppUpgradeDetail from './upgradeCenter/appUpgradeDetail.vue'

import MallButtonConfig from './mallMgmt/mallButtonConfig.vue'
import MallOrder from './mallMgmt/mallOrder.vue'

import SceneAdmin from './sceneAdmin/sceneAdmin.vue'
import SceneAdd from './sceneAdmin/son/sceneAdd.vue'

export {
  Login,
  Main,
  Home,
  OPS,
  MUSER,
  VersionManager,
  VersionManagerDetail,
  PushManager,
  Facility,
  Cloud,
  CMDB,
  upgrade,
  ThroughData,
  RootLog,
  AllThroughData,
  AppRouterData,
  DevicesData,
  LogRegData,
  QpsData,
  WarnManage,
  WarnDataSearch,
  FamilyList,
  ErrLog,
  RouterIndex,
  RouterManager,
  ImportRouter,
  FamilyImgList,
  User,
  Role,
  UpdatePwd,
  ResetPwd,
  Error,
  UserData,
  FeedbackList,
  FeedbackDetail,
  DeviceData,
  Strategy,
  StrategyUuid,
  StrategyConfig,
  CmData,
  VersionManagerForSC,
  SwitchProductHistory,
  SwitchProductImport,
  SwitchProductSearch,
  AppUpgrade,
  AppUpgradeDetail,
  AccessStatistics,
  ControlAnalysis,
  ActiveAnalysis,
  RoutingAnalysis,
  DailyData,
  MallButtonConfig,
  MallOrder,
  SceneAdmin,
  SceneAdd
}
