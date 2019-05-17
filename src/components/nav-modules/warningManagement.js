/**
 * 警告管理菜单
 *
 * @summary short description for the file
 * @author songwh
 *
 * Created at     : 2019-05-08 16:59:55
 * Last modified  : 2019-05-17 10:35:51
 */
var warningManagement = {
  title: '告警管理',
  path: 'gjgl',
  icon: 'warn',
  children: [
    {
      path: '/main/warnManage',
      title: '业务告警统计',
      isSelected: false
    },
    {
      path: '/main/warnDataSearch',
      title: '业务告警查询',
      isSelected: false
    },
    {
      path: 'http://zabbix.evergrande.me:9999/zabbix/zabbix.php?action=problem.view',
      title: '系统告警',
      elseUrl: true,
      isSelected: false
    }
  ]
}

export default warningManagement
