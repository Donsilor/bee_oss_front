import * as namespace from '../namespace';
import {
	PREFIX
} from '../../lib/util';
import axios from '../../lib/http';
import {OPS_API} from "~/assets/lib/api";

const actions = {
    searchUserMsg({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(OPS_API.searchUserMsg, params).then((response) => {
                resolve(response.data.result)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    getTerminalList({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.get(OPS_API.getTerminalList, {params: params}).then((response) => {
                resolve(response.data.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    getMemberList({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.get(OPS_API.getMemberList, {params: params}).then((response) => {
                resolve(response.data.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    getDeviceList({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.get(OPS_API.getDeviceList, {params: params}).then((response) => {
                resolve(response.data.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    getLogOutList({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.get(OPS_API.getLogOutList, {params: params}).then((response) => {
                resolve(response.data.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    }
}
export default {
    actions
}