/**
 * 升级中心路由
 *
 * @summary short description for the file
 * @author songwh
 *
 * Created at     : 2019-05-08 16:59:55 
 * Last modified  : 2019-05-08 17:38:22
 */
import {
  VersionManager, 
  VersionManagerDetail, 
  VersionManagerForSC, 
  AppUpgrade, 
  AppUpgradeDetail,
  PushManager
} from '../../pages/index.js'

const updateManage = [
  {
    path: 'versionManager',
    name: 'versionManager',
    component: VersionManager
  },
  {
    path: 'versionManager/:id',
    name: 'versionManagerDetail',
    component: VersionManagerDetail
  },
  {
    path: 'VersionManagerForSC',
    name: 'VersionManagerForSC',
    component: VersionManagerForSC
  },
  {
    path: 'appUpgrade',
    name: 'appUpgrade',
    component: AppUpgrade
  },
  {
    path: 'appUpgrade/:id',
    name: 'appUpgradeDetail',
    component: AppUpgradeDetail
  },
  {
    path: 'pushManager',
    name: 'pushManager',
    component: PushManager
  }
]

export default updateManage
