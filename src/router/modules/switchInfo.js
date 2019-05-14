/**
 * 开关生产信息路由
 *
 * @summary short description for the file
 * @author songwh
 *
 * Created at     : 2019-05-08 16:59:55
 * Last modified  : 2019-05-13 10:50:31
 */
import {
  SwitchProductHistory,
  SwitchProductImport,
  SwitchProductSearch
} from '../../pages/index'

const switchInfo = [
  // 开关生产信息查询
  {
    path: 'switchproduct/history',
    component: SwitchProductHistory
  },
  {
    path: 'switchproduct/import',
    component: SwitchProductImport
  },
  {
    path: 'switchproduct/search',
    component: SwitchProductSearch
  }
]

export default switchInfo
