/**
 * 权限设置菜单
 *
 * @summary short description for the file
 * @author songwh
 *
 * Created at     : 2019-05-08 16:59:55
 * Last modified  : 2019-05-17 10:31:53
 */

var permissionSettings = {
  title: '权限设置',
  path: 'permission',
  icon: 'family',
  children: [
    {
      title: '用户管理',
      path: '/main/user',
      icon: 'facility'
    },
    {
      title: '角色管理',
      path: '/main/role',
      icon: 'facility'
    },
    {
      title: '密码修改',
      path: '/main/updatePassword',
      icon: 'facility'
    },
    {
      title: '密码重置',
      path: '/main/resetPassword',
      icon: 'facility',
      needAdmin: true
    }
  ]
}

export default permissionSettings
