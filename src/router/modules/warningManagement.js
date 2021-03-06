/**
 * 警告管理路由
 *
 * @summary short description for the file
 * @author songwh
 *
 * Created at     : 2019-05-08 16:59:55
 * Last modified  : 2019-05-17 10:41:53
 */
import {
  WarnManage,
  WarnDataSearch
} from '../../pages/index'

var warningManagement = [
  {
    path: 'warnManage',
    name: 'warnManage',
    component: WarnManage
  },
  {
    path: 'warnDataSearch',
    name: 'warnDataSearch',
    component: WarnDataSearch
  }
]

export default warningManagement
