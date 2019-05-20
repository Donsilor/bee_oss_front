/**
 * 数据统计菜单
 *
 * @summary short description for the file
 * @author songwh
 *
 * Created at     : 2019-05-08 16:59:55
 * Last modified  : 2019-05-17 10:31:59
 */
var dataStatistics = {
  title: '数据统计',
  path: 'analyzer',
  icon: 'family',
  children: [
    {
      title: '用户运营',
      path: '/main/analyzer/userData',
      icon: 'facility'
    },
    {
      title: '设备运营',
      path: '/main/analyzer/deviceData',
      icon: 'facility'
    },
    {
      title: '入网统计',
      path: '/main/analyzer/accessStatistics',
      icon: 'facility'
    },
    {
      title: '控制分析',
      path: '/main/analyzer/controlAnalysis',
      icon: 'facility'
    },
    {
      title: '活跃分析',
      path: '/main/analyzer/activeAnalysis',
      icon: 'facility'
    },
    {
      title: '路由分析',
      path: '/main/analyzer/routingAnalysis',
      icon: 'facility'
    },
    {
      title: '数据日报',
      path: '/main/analyzer/dailyData',
      icon: 'facility'
    }
  ]
}

export default dataStatistics
