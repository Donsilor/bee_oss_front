/**
 * 业务数据路由
 *
 * @summary short description for the file
 * @author songwh
 *
 * Created at     : 2019-05-08 16:59:55
 * Last modified  : 2019-05-08 17:34:37
 */
import {
  ThroughData,
  AllThroughData,
  AppRouterData,
  DevicesData,
  LogRegData,
  QpsData
} from '../../pages/index'

const subData = [
  {
    path: 'throughData',
    name: 'throughData',
    component: ThroughData,
    children: [
      {
        path: '',
        name: 'throughAll',
        component: AllThroughData
      },
      {
        path: 'appRouterData',
        name: 'hasParent/main/throughData',
        component: AppRouterData
      },
      {
        path: 'devicesData',
        name: 'hasParent/main/throughData',
        component: DevicesData
      },
      {
        path: 'logRegData',
        name: 'hasParent/main/throughData',
        component: LogRegData
      },
      {
        path: 'qpsData',
        name: 'hasParent/main/throughData',
        component: QpsData
      }
    ]
  }
]

export default subData
