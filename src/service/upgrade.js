import axios from '../lib/http'
import { UPGRADE_API } from '~/lib/api'

const API_UPGRADE = '/api.php'

export default {
  pubilcCorsAction(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(API_UPGRADE, params)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    })
  },
  getVersions(params) {
    return new Promise((resolve, reject) => {
      params.method = 'list_versions'
      axios
        .post(API_UPGRADE, params)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    })
  },
  getVersionsForSC(params) {
    return new Promise((resolve, reject) => {
      params.method = 'list_versions_community'
      axios
        .post(API_UPGRADE, params)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    })
  },
  selectVersion(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(UPGRADE_API.selectVersion, params)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    })
  },
  pushUpdateAction(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(UPGRADE_API.pushUpdateAction, params)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    })
  },
  getPushHistoryList(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(UPGRADE_API.getPushHistoryList, params)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    })
  },
  getChoseList(params) {
    return new Promise((resolve, reject) => {
      axios
        .post(API_UPGRADE, params)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
        })
    })
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
