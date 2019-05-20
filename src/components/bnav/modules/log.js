/**
 * 日志查询菜单
 *
 * @summary short description for the file
 * @author songwh
 *
 * Created at     : 2019-05-08 16:59:55 
 * Last modified  : 2019-05-17 10:36:14
 */
var log = {
  title: '日志查询',
  path: 'yptrz',
  icon: 'cloud',
  children: [
    {
      path: '/main/rootLog',
      title: '云平台日志',
      isSelected: false
    },
    {
      path: '/main/errLog',
      title: '错误日志',
      isSelected: false
    }
  ]
}

export default log
