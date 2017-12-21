import * as namespace from '../namespace';
import {
	PREFIX
} from '../../lib/util';
import axios from '../../lib/http';
import {OPS_API, THROUGH_API} from "~/assets/lib/api";

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
    searchLogOut({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(OPS_API.searchLogOut, params).then((response) => {
                resolve(response.data.result)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    operaList({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(OPS_API.operaList, params).then((response) => {
                resolve(response.data.result)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    rootLogs({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(OPS_API.rootLogs, params).then((response) => {
                resolve(response.data.result)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    errLogs({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(OPS_API.errLogs, params).then((response) => {
                resolve(response.data.result)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    throughDatas({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(THROUGH_API.throughDatas, params).then((response) => {
                resolve(response.data.result)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    deviceTotals({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(THROUGH_API.deviceTotal, params).then((response) => {
                resolve(response.data.result)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    onlineLogs({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(THROUGH_API.onlineLog, params).then((response) => {
                resolve(response.data.result)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    logRegDatas({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(THROUGH_API.logRegData, params).then((response) => {
                resolve(response.data.result)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    qpsDatas({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(THROUGH_API.qpsData, params).then((response) => {
                resolve(response.data.result)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    getwarnDatas({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(THROUGH_API.warnData, params).then((response) => {
                resolve(response.data.result)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    getwarnDataList({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(THROUGH_API.warnDataSearch, params).then((response) => {
                resolve(response.data.result)
            }).catch((error) => {
                console.log(error)
            })
        })
    }
    // getTerminalList({commit, state}, params) {
    //     return new Promise((resolve, reject) => {
    //         axios.get(OPS_API.getTerminalList, {params: params}).then((response) => {
    //             resolve(response.data.data)
    //         }).catch((error) => {
    //             console.log(error)
    //         })
    //     })
    // },

}
export default {
    actions
}