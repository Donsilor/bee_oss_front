/**
 * 配置管理菜单
 *
 * @summary short description for the file
 * @author songwh
 *
 * Created at     : 2019-05-08 16:59:55
 * Last modified  : 2019-05-17 10:40:13
 */
var configManage = {
  title: '配置管理',
  path: 'pzgl',
  icon: 'cloud',
  children: [
    {
      title: '家庭背景图',
      path: '/main/familyImgList',
      icon: 'facility'
    },
    {
      title: '策略组',
      path: '/main/Strategy',
      icon: 'facility'
    },
    {
      title: '策略组用户',
      path: '/main/StrategyUuid',
      icon: 'facility'
    },
    {
      title: '策略组配置',
      path: '/main/StrategyConfig',
      icon: 'facility'
    },
    {
      title: '文案配置',
      path: '/main/CmData',
      icon: 'facility'
    },
    {
      title: '商城配置',
      path: '/main/mallButtonConfig',
      icon: 'facility'
    },
    {
      title: '场景管理',
      path: '/main/sceneAdmin',
      icon: 'facility'
    },
    // {
    //   title: '情景管理',
    //   path: '/main/sightManage',
    //   icon: 'facility'
    // },
    {
      title: '启动模式管理',
      path: '/main/startMode',
      icon: 'facility'
    }
  ]
}

export default configManage
