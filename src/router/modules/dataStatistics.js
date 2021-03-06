/**
 * 数据统计路由
 *
 * @summary short description for the file
 * @author songwh
 *
 * Created at     : 2019-05-08 16:59:55
 * Last modified  : 2019-05-17 10:41:28
 */
import {
  UserData,
  DeviceData,
  AccessStatistics,
  ControlAnalysis,
  ActiveAnalysis,
  RoutingAnalysis,
  DailyData,
  RouterIndex
} from '../../pages/index'

var dataStatistics = [
  {
    path: 'analyzer',
    name: 'analyzer',
    component: RouterIndex,
    children: [
      {
        path: 'userData',
        name: 'userData',
        component: UserData
      },
      {
        path: 'deviceData',
        name: 'deviceData',
        component: DeviceData
      },
      {
        path: 'accessStatistics',
        name: 'accessStatistics',
        component: AccessStatistics
      },
      {
        path: 'controlAnalysis',
        name: 'controlAnalysis',
        component: ControlAnalysis
      },
      {
        path: 'activeAnalysis',
        name: 'activeAnalysis',
        component: ActiveAnalysis
      },
      {
        path: 'routingAnalysis',
        name: 'routingAnalysis',
        component: RoutingAnalysis
      },
      {
        path: 'dailyData',
        name: 'dailyData',
        component: DailyData
      }
    ]
  }
]

export default dataStatistics
