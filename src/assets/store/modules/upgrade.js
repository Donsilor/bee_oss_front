import * as namespace from '../namespace';
import {
	PREFIX
} from '../../lib/util';
import axios from '../../lib/http';
import {UPGRADE_API} from "~/assets/lib/api";

const API_UPGRADE = '/api.php'

const actions = {
    importSubmitAction({commit, state}, params) {
        return new Promise((resolve, reject) => {
            let thisMethod = ''
            let currentParam = JSON.parse(JSON.stringify(params))
            switch (currentParam.inputtype) {
                case 1:
                case 4:
                    thisMethod = 'create_app_version'
                    break
                case 2:
                    thisMethod = 'create_router_version'
                    break
                case 3:
                    thisMethod = 'create_device_version'
                    break
                case 5:
                    thisMethod = 'create_h5_version'
                    break
                default:
                    break

            }
            currentParam['method'] = thisMethod
            delete currentParam.inputtype

            axios.post(API_UPGRADE, currentParam).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    pubilcCorsAction({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(API_UPGRADE, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    getVersions({commit, state}, params) {
        return new Promise((resolve, reject) => {
            params.method = 'list_versions'
            axios.post(API_UPGRADE, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    selectVersion({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(UPGRADE_API.selectVersion, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    pushUpdateAction({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(UPGRADE_API.pushUpdateAction, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    getPushHistoryList({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(UPGRADE_API.getPushHistoryList, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    }
}
export default {
    actions
}