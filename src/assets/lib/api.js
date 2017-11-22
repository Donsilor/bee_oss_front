const API_ROOT = ''
const API_MASTER = '/api/index.php/'
export const OPS_API = {
    getTerminalList: API_ROOT + '../src/assets/json/terminalList.json',  // 终端列表
    getMemberList: API_ROOT + '../src/assets/json/members.json',  // 成员列表
    getDeviceList: API_ROOT + '../src/assets/json/devices.json',  // 设备列表
    getLogOutList: API_ROOT + '../src/assets/json/logOut.json',  // 登录日志
    searchUserMsg: API_MASTER + 'iotuser/index'  //
}
export const UPGRADE_API = {
    getVersions: API_ROOT + '../src/assets/json/versions.json'  // 版本列表
}