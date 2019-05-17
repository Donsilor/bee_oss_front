/**
 * 权限设置路由
 *
 * @summary short description for the file
 * @author songwh
 *
 * Created at     : 2019-05-08 16:59:55
 * Last modified  : 2019-05-17 10:41:38
 */
import {
  User,
  Role,
  UpdatePwd,
  ResetPwd
} from '../../pages/index'

var permissionSettings = [
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
