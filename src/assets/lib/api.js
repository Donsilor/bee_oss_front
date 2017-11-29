const API_ROOT = ''
const API_MASTER = '/api/index.php/'
export const OPS_API = {
    getTerminalList: API_ROOT + '../src/assets/json/terminalList.json',  // 终端列表
    getMemberList: API_ROOT + '../src/assets/json/members.json',  // 成员列表
    getDeviceList: API_ROOT + '../src/assets/json/devices.json',  // 设备列表
    getLogOutList: API_ROOT + '../src/assets/json/logOut.json',  // 登录日志
    searchUserMsg: API_MASTER + 'iotuser/index',  //查询用户所有信息
    searchLogOut: API_MASTER + 'iotuser/history'  //获取用户登录登出日志
}
export const UPGRADE_API = {
    getVersions: API_MASTER + 'version/list',  // 版本列表
    selectVersion: API_MASTER + 'version/search',  // 版本匹配搜索
    importSubmitAction: API_MASTER + 'version/input',  //版本录入
    pushUpdateAction: API_MASTER + 'version/release',  //版本推送
    getPushHistoryList: API_MASTER + 'version/released',  //版本推送历史
    getVersionDetailAction: API_MASTER + 'version/info'  //偶去版本详情
}