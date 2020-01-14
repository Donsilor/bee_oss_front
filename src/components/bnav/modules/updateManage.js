/**
 * 升级中心菜单
 *
 * @summary short description for the file
 * @author songwh
 *
 * Created at     : 2019-05-08 16:59:55
 * Last modified  : 2019-05-17 10:32:15
 */
var updateManage = {
  title: '升级中心',
  path: 'sjzx',
  icon: 'config',
  children: [
    {
      title: '版本管理',
      path: '/main/versionManager',
      icon: ''
    },
    {
      title: '社区版本管理',
      path: '/main/versionManagerForSC',
      icon: ''
    },
    {
      title: '推送管理',
      path: '/main/pushManager',
      icon: ''
    },
    {
      title: 'APP升级',
      path: '/main/appUpgrade',
      icon: ''
    },
    {
      title: '协议管理',
      path: '/main/protocolManage',
      icon: ''
    }
  ]
}

export default updateManage
