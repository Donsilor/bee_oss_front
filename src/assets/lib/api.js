const API_ROOT = ''
const API_MASTER = '/api/index.php/'
export const OPS_API = {
    getTerminalList: API_ROOT + '../src/assets/json/terminalList.json',  // 终端列表
    getMemberList: API_ROOT + '../src/assets/json/members.json',  // 成员列表
    getDeviceList: API_ROOT + '../src/assets/json/devices.json',  // 设备列表
    getLogOutList: API_ROOT + '../src/assets/json/logOut.json',  // 登录日志
    searchUserMsg: API_MASTER + 'iotuser/index',  //查询用户所有信息
    searchLogOut: API_MASTER + 'iotuser/history',  //获取用户登录登出日志
    rootLogs: API_MASTER + 'mongodebug/index',  //云平台日志
    errLogs: API_MASTER + 'mongodebug/approuter',  //错误日志
    operaList: API_MASTER + 'iotuser/operlist',  //子设备操作流水
    routerList: API_MASTER + 'iotrouter/lists',  //获取路由列表
    addRouter: API_MASTER + 'iotrouter/add',  //添加路由
    deleteRouter: API_MASTER + 'iotrouter/del',  //删除路由
    importRouter: API_MASTER + 'iotrouter/import'  //路由批量导入
}
export const UPGRADE_API = {
    getVersions: API_MASTER + 'version/list',  // 版本列表
    selectVersion: API_MASTER + 'version/search',  // 版本匹配搜索
    importSubmitAction: API_MASTER + 'version/input',  //版本录入
    pushUpdateAction: API_MASTER + 'version/release',  //版本推送
    getPushHistoryList: API_MASTER + 'version/released',  //版本推送历史
    getVersionDetailAction: API_MASTER + 'version/info'  //版本详情
}
export const THROUGH_API = {
    throughDatas: API_MASTER + 'analyzer/index',  // 经分数据统计
    deviceTotal: API_MASTER + 'analyzer/devicest',  // 按品类/产品ID统计子设备个数
    onlineLog: API_MASTER + 'analyzer/onlinelog',  // APP/路由器在线日志列表
    logRegData: API_MASTER + 'analyzer/analyzerlog',  // 按channel获取用户登录注册日志
    qpsData: API_MASTER + 'analyzer/qpslog',  // 获取QPS日志列表
    warnData: API_MASTER + 'monitor/statistics',  // 按告警名称、服务器Id统计数量
    warnDataSearch: API_MASTER + 'monitor/lists'  // 告警信息列表
}