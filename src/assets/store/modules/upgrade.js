import * as namespace from '../namespace';
import {
	PREFIX
} from '../../lib/util';
import axios from '../../lib/http';
import {UPGRADE_API} from "~/assets/lib/api";

const API_UPGRADE = '/api.php'

const actions = {
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
    },
    getChoseList({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(API_UPGRADE, params).then((response) => {
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