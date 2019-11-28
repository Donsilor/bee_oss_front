const API_ROOT = ''
const API_MASTER = '/api/index.php/'
export const BASE_URL = API_MASTER
export const OPS_API = {
  getTerminalList: API_ROOT + '../src/json/terminalList.json', // 终端列表
  getMemberList: API_ROOT + '../src/json/members.json', // 成员列表
  getDeviceList: API_ROOT + '../src/json/devices.json', // 设备列表
  getLogOutList: API_ROOT + '../src/json/logOut.json', // 登录日志
  searchUserMsg: API_MASTER + 'iotuser/index', //查询用户所有信息
  searchLogOut: API_MASTER + 'iotuser/history', //获取用户登录登出日志
  rootLogs: API_MASTER + 'mongodebug/index', //云平台日志
  errLogs: API_MASTER + 'mongodebug/approuter', //错误日志
  deviceLogs: API_MASTER + 'monitor/execsh', //路由器日志和设备日志
  operaList: API_MASTER + 'iotuser/operlist', //子设备操作流水
  routerList: API_MASTER + 'iotrouter/lists', //获取路由列表
  addRouter: API_MASTER + 'iotrouter/add', //添加路由
  editRouter: API_MASTER + 'iotrouter/edit', //编辑路由
  deleteRouter: API_MASTER + 'iotrouter/del', //删除路由
  importRouter: API_MASTER + 'iotrouter/import', //路由批量导入
  familyList: API_MASTER + 'iotuser/familylist', //家庭列表
  userList: API_MASTER + 'iotuser/userList', //家庭列表

  directdeviceList: API_MASTER + 'iotdirectdevice/lists', //获取直连设备列表
  addDirectdevice: API_MASTER + 'iotdirectdevice/add', //添加直连设备
  editDirectdevice: API_MASTER + 'iotdirectdevice/edit', //编辑直连设备
  deleteDirectdevice: API_MASTER + 'iotdirectdevice/del', //删除直连设备
  importDirectdevice: API_MASTER + 'iotdirectdevice/import', //直连设备批量导入
}
export const UPGRADE_API = {
  // getVersions: API_MASTER + 'version/list',  // 版本列表
  // selectVersion: API_MASTER + 'version/search',  // 版本匹配搜索
  // importSubmitAction: API_MASTER + 'version/input',  //版本录入
  // pushUpdateAction: API_MASTER + 'version/release',  //版本推送
  // getPushHistoryList: API_MASTER + 'version/released',  //版本推送历史
  // getVersionDetailAction: API_MASTER + 'version/info'  //版本详情
}
export const THROUGH_API = {
  throughDatas: API_MASTER + 'analyzer/index', // 经分数据统计
  deviceTotal: API_MASTER + 'analyzer/devicest', // 按品类/产品ID统计子设备个数
  onlineLog: API_MASTER + 'analyzer/onlinelog', // APP/路由器在线日志列表
  logRegData: API_MASTER + 'analyzer/analyzerlog', // 按channel获取用户登录注册日志
  qpsData: API_MASTER + 'analyzer/qpslog', // 获取QPS日志列表
  warnData: API_MASTER + 'monitor/statistics', // 按告警名称、服务器Id统计数量
  warnDataSearch: API_MASTER + 'monitor/lists' // 告警信息列表
}
export const FAMILY_API = {
  imgList: API_MASTER + 'bgimage/lists',
  addImgs: API_MASTER + 'bgimage/add',
  deleteImgs: API_MASTER + 'bgimage/del',
  editImgs: API_MASTER + 'bgimage/edit',
  sortImgs: API_MASTER + 'bgimage/sort'
}

export const PERMISSION_API = {
  //用户
  searchUserList: API_MASTER + 'user/searchUserList',
  userList: API_MASTER + 'user/getUserList',
  getUser: API_MASTER + 'user/userdetail',
  addUser: API_MASTER + 'user/addUser',
  editUser: API_MASTER + 'user/editUser',
  deleteUser: API_MASTER + 'user/delUser',
  updatePwd: API_MASTER + 'user/modify',
  resetPwd: API_MASTER + 'user/resetPassword',
  //角色
  roleList: API_MASTER + 'role/getRole',
  getRole: API_MASTER + 'role/getRoleDetail',
  addRole: API_MASTER + 'role/addRolePermission',
  editRole: API_MASTER + 'role/editRolePermission',
  deleteRole: API_MASTER + 'role/delRolePermission',
  //菜单
  menuList: API_MASTER + 'menu/getMenulist'
}

export const STRATEGY_API = {
  //策略组
  strategyList: API_MASTER + 'Strategy/lists',
  StrategyAdd: API_MASTER + 'Strategy/add',
  StrategyEdit: API_MASTER + 'Strategy/edit',
  StrategyDel: API_MASTER + 'Strategy/del',
  //策略组用户
  StrategyUuidList: API_MASTER + 'StrategyUuid/lists',
  StrategyUuidAdd: API_MASTER + 'StrategyUuid/add',
  StrategyUuidEdit: API_MASTER + 'StrategyUuid/edit',
  StrategyUuidDel: API_MASTER + 'StrategyUuid/del',
  //策略组配置说明
  StrategyConfiglists: API_MASTER + 'StrategyConfig/lists',
  StrategyConfigAdd: API_MASTER + 'StrategyConfig/add',
  StrategyConfigEdit: API_MASTER + 'StrategyConfig/edit',
  StrategyConfigDel: API_MASTER + 'StrategyConfig/del'
}

export const CMDATA_API = {
  //文案配置
  CmDataList: API_MASTER + 'cmdata/lists',
  CmDataAdd: API_MASTER + 'cmdata/add',
  CmDataEdit: API_MASTER + 'cmdata/edit',
  CmDataDel: API_MASTER + 'cmdata/del',
  ModuleList: API_MASTER + 'sysconfig/get',
  output: API_MASTER + 'cmdata/export',
  input: API_MASTER + 'cmdata/import'
}
// feedback
export const feedbackList = API_MASTER + 'feedback/list'
export const feedbackUpdateStatus = API_MASTER + 'feedback/updateStatus'
export const feedbackDetails = API_MASTER + 'feedback/details'
export const feedbackReply = API_MASTER + 'feedback/reply'

// userData
export const analyzerRetain = API_MASTER + 'analyzer/retain'

// deviceData
export const operFamilyCategory = API_MASTER + 'analyzer/oper_family_category'
export const operFamilyStat = API_MASTER + 'analyzer/oper_family_stat'
export const operStat = API_MASTER + 'analyzer/oper_stat'

// 入网统计
export const AccessStatisticsURL = API_MASTER + 'analyzer/device'

// 控制分析
export const ControlAnalysisURL = API_MASTER + 'analyzer/control'

// 活跃分析
export const ActiveAnalysisURL = API_MASTER + 'analyzer/active'

// 路由分析
export const RouterAnalysisURL = API_MASTER + 'analyzer/router_interact'

// 数据日报
export const dailyDataURL = API_MASTER + 'analyzer/data_daily'
export const ExportURL = API_MASTER + 'analyzer/export'

//oss uploadfile
export const getUnuploadShardList = API_MASTER + 'file/getUnuploadShardList' //分片任务初始化接口
export const uploadShard = API_MASTER + 'file/uploadShard' //单独的分片上传接口
export const uploadIsSuccess = API_MASTER + 'file/uploadIsSuccess' //查询文件上传结果接口

//开光生产信息
export const switchProductImport = API_MASTER + 'mac/import'
export const switchProductSearch = API_MASTER + 'mac/search'
export const switchProductHistory = API_MASTER + 'mac/historylist'
export const switchProductHistoryExport = API_MASTER + 'mac/historyexport'
