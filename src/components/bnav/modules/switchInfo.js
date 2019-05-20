/**
 * 开关生产信息菜单
 *
 * @summary short description for the file
 * @author songwh
 *
 * Created at     : 2019-05-08 16:59:55
 * Last modified  : 2019-05-17 10:37:00
 */

var switchInfo = {
  title: '开关生产信息',
  icon: 'family',
  path: 'switchproduct',
  children: [
    {
      title: '导入',
      path: '/main/switchproduct/import',
      icon: 'facility'
    },
    {
      title: 'MAC/SN查询',
      path: '/main/switchproduct/search',
      icon: 'facility'
    },
    {
      title: '历史查询记录',
      path: '/main/switchproduct/history',
      icon: 'facility'
    }
  ]
}

export default switchInfo
