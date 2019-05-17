/**
 * 开关生产信息路由
 *
 * @summary short description for the file
 * @author songwh
 *
 * Created at     : 2019-05-08 16:59:55
 * Last modified  : 2019-05-17 10:41:42
 */
import {
  SwitchProductHistory,
  SwitchProductImport,
  SwitchProductSearch
} from '../../pages/index'

var switchInfo = [
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
