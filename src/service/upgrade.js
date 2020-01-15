import axios from '../lib/http'
import { UPGRADE_API } from '~/lib/api'

const API_UPGRADE = '/api.php'

export default {
  agreementSave(params) {
    return axios.post(UPGRADE_API.agreementSave, params).then(response => response.data)
  },
  agreementdel(params) {
    return axios.post(UPGRADE_API.agreementdel, params).then(response => response.data)
  },
  pubilcCorsAction(params) {
    return axios.post(API_UPGRADE, params).then(response => response.data)
  },
  getVersions(params) {
    params.method = 'list_versions'
    return axios.post(API_UPGRADE, params).then(response => response.data)
  },
  getVersionsForSC(params) {
    params.method = 'list_versions_community'
    return axios.post(API_UPGRADE, params).then(response => response.data)
  },
  selectVersion(params) {
    return axios
      .post(UPGRADE_API.selectVersion, params)
      .then(response => response.data)
  },
  pushUpdateAction(params) {
    return axios
      .post(UPGRADE_API.pushUpdateAction, params)
      .then(response => response.data)
  },
  getPushHistoryList(params) {
    return axios
      .post(UPGRADE_API.getPushHistoryList, params)
      .then(response => response.data)
  },
  getChoseList(params) {
    return axios.post(API_UPGRADE, params).then(response => response.data)
  },

  getAgreementList(params) {
    return axios.post(UPGRADE_API.agreementList, params).then(response => response.data)
  },

  // 融合版APP 升级
  getAppList(params) {
    return axios.post(API_UPGRADE, {
      method: 'list_applications',
      ...params
    })
  },
  getAppInfo(params) {
    return axios.post(API_UPGRADE, {
      method: 'info_applications',
      ...params
    })
  },
  delApp(params) {
    return axios.post(API_UPGRADE, {
      method: 'del_applications',
      ...params
    })
  },
  saveApp(params) {
    return axios.post(API_UPGRADE, {
      method: 'save_applications',
      ...params
    })
  },
  getAppVerList(params) {
    return axios.post(API_UPGRADE, {
      method: 'list_versions_commom',
      ...params
    })
  },
  getAppVerInfo(params) {
    return axios.post(API_UPGRADE, {
      method: 'info_versions_commom',
      ...params
    })
  },
  delAppVer(params) {
    return axios.post(API_UPGRADE, {
      method: 'del_version_commom',
      ...params
    })
  },
  saveAppVer(params) {
    return axios.post(API_UPGRADE, {
      method: 'save_app_version_commom',
      ...params
    })
  },
  setAppVerStatus(params) {
    return axios.post(API_UPGRADE, {
      method: 'set_status_commom',
      ...params
    })
  },
  setAppVerUuids(params) {
    return axios.post(API_UPGRADE, {
      method: 'set_uuids_commom',
      ...params
    })
  },
  getAppVerUuids(params) {
    return axios.post(API_UPGRADE, {
      method: 'get_uuids_commom',
      ...params
    })
  }
}
