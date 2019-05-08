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
  User,
  Role,
  UpdatePwd,
  ResetPwd
} from '../../pages/index'

const permissionSettings = [
  {
    path: 'user',
    name: 'user',
    component: User
  },
  {
    path: 'role',
    name: 'role',
    component: Role
  },
  {
    path: 'updatePassword',
    name: 'updatePassword',
    component: UpdatePwd
  },
  {
    path: 'resetPassword',
    name: 'resetPassword',
    component: ResetPwd
  }
]

export default permissionSettings
