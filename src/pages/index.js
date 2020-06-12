const Login = () => import('./login.vue')
const Main = () => import('./main.vue')
const Home = () => import('./home.vue')
const Facility = () => import('./facility.vue')
const Cloud = () => import('./cloud.vue')
const CMDB = () => import('./cmdb.vue')
const upgrade = () => import('./upgradeCenter.vue')
const VersionManager = () => import('./upgradeCenter/versionManager.vue')
const VersionManagerDetail = () => import('./upgradeCenter/versionManagerDetail.vue')
const PushManager = () => import('./upgradeCenter/pushManager.vue')
const OPS = () => import('./userData/ops.vue')
const MUSER = () => import('./userData/muser/index.vue')
const ThroughData = () => import('./throughData/index.vue')
const AllThroughData = () => import('./throughData/allData.vue')
const AppRouterData = () => import('./throughData/appRouterData.vue')
const DevicesData = () => import('./throughData/devicesData.vue')
const LogRegData = () => import('./throughData/logRegData.vue')
const QpsData = () => import('./throughData/qpsData.vue')
const WarnManage = () => import('./warnManager/warnManage.vue')
const WarnDataSearch = () => import('./warnManager/warnDataSearch.vue')
const RootLog = () => import('./allLogs/rootLogs.vue')
const ErrLog = () => import('./allLogs/errLogs.vue')
const remoteDeviceLogs = () => import('./allLogs/remoteDeviceLogs.vue')
const remoteRouterLogs = () => import('./allLogs/remoteRouterLogs.vue')
const RouterIndex = () => import('./routerManager/index.vue')
const RouterManager = () => import('./routerManager/routerManager.vue')
const ImportRouter = () => import('./routerManager/importRouter.vue')
const FamilyList = () => import('./familyList.vue')
const FamilyImgList = () => import('./familyImg/index.vue')
const User = () => import('./permission/user.vue')
const Role = () => import('./permission/role.vue')
const ResetPwd = () => import('./permission/resetPwd.vue')
const UpdatePwd = () => import('./permission/updatePwd.vue')
const Error = () => import('./error.vue')

const UserData = () => import('./analyzer/userData.vue')
const DeviceData = () => import('./analyzer/deviceData.vue')
// 新加的页面
const AccessStatistics = () => import('./analyzer/accessStatistics.vue')
const ControlAnalysis = () => import('./analyzer/controlAnalysis.vue')
const ActiveAnalysis = () => import('./analyzer/activeAnalysis.vue')
const RoutingAnalysis = () => import('./analyzer/routingAnalysis.vue')
const DailyData = () => import('./analyzer/dailyData.vue')

const FeedbackList = () => import('./feedback/list.vue')
const FeedbackDetail = () => import('./feedback/detail.vue')
const Strategy = () => import('./strategy/strategy.vue')
const StrategyUuid = () => import('./strategy/strategyUuid.vue')
const StrategyConfig = () => import('./strategy/strategyConfig.vue')
const CmData = () => import('./CmData.vue')

const VersionManagerForSC = () => import('./upgradeCenter/versionManagerForSC.vue')
const SwitchProductHistory = () => import('./switchproduct/history.vue')
const SwitchProductImport = () => import('./switchproduct/import.vue')
const SwitchProductSearch = () => import('./switchproduct/search.vue')
const AppUpgrade = () => import('./upgradeCenter/appUpgrade.vue')
const AppUpgradeDetail = () => import('./upgradeCenter/appUpgradeDetail.vue')
const ProtocolManage = () => import('./upgradeCenter/protocolManage.vue')

const MallButtonConfig = () => import('./mallMgmt/mallButtonConfig.vue')
const MallOrder = () => import('./mallMgmt/mallOrder.vue')

const SceneAdmin = () => import('./sceneAdmin/sceneAdmin.vue')
const SightManage = () => import('./sightManage/sightManage.vue')
const StartMode = () => import('./startMode/startMode.vue')
const MallReservation = () => import('./mallMgmt/mallReservation.vue')

const SemanticMange = () => import('./semanticMange/index.vue')

const DeviceList = () => import('./deviceList.vue')

// 家居组件
const AppHomeConfig = () => import('./homeConfig/index.vue')
const HomeConfig = () => import('./homeConfig/home/home.vue')
const MusicConfig = () => import('./homeConfig/music/music.vue')

// 云端直连设备
const CloudIndex = () => import('./cloudConnectDevice/index.vue')
const CloudConnectDevice = () => import('./cloudConnectDevice/cloudConnectDevice.vue')
const ImportCloud = () => import('./cloudConnectDevice/importCloud.vue')

// 绑定路由器
const BindRouter = () => import('./bindRouter.vue')

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
  SightManage,
  StartMode,
  MallReservation,
  AppHomeConfig,
  HomeConfig,
  MusicConfig,
  SemanticMange,
  CloudIndex,
  CloudConnectDevice,
  ImportCloud,
  remoteDeviceLogs,
  remoteRouterLogs,
  BindRouter,
  ProtocolManage,
  DeviceList
}
