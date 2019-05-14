/**
 * 日志查询路由
 *
 * @summary short description for the file
 * @author songwh
 *
 * Created at     : 2019-05-08 16:59:55 
 * Last modified  : 2019-05-08 17:23:56
 */
import {
  RootLog, 
  ErrLog
} from '../../pages/index.js'

const log = [
  {
    path: 'rootLog',
    name: 'rootLog',
    component: RootLog
  },
  {
    path: 'errLog',
    name: 'errLog',
    component: ErrLog
  }
]

export default log
