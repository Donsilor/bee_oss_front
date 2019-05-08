/**
 * 业务数据路由
 *
 * @summary short description for the file
 * @author songwh
 *
 * Created at     : 2019-05-08 16:59:55
 * Last modified  : 2019-05-08 17:24:33
 */
import {
  OPS,
  MUSER,
  upgrade,
  Facility,
  FamilyList
} from '../../pages/index.js'

const businessData = [
  {
    path: 'ops',
    name: 'ops',
    component: OPS
  },
  {
    path: 'muser',
    name: 'muser',
    component: MUSER
  },
  {
    path: 'ops/:id',
    name: 'ops',
    component: OPS
  },
  {
    path: 'upgrade',
    name: 'upgrade',
    component: upgrade
  },
  {
    path: 'facility',
    name: 'facility',
    component: Facility
  },
  {
    path: 'familyList',
    name: 'familyList',
    component: FamilyList
  },
]

export default businessData
