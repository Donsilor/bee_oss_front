// import * as namespace from '../namespace';
// import {
// 	PREFIXPREFIX
// } from '../../lib/util';
import axios from '../lib/http'
import { OPS_API, THROUGH_API } from '~/lib/api'

export default {
	searchUserList(phone_num, begin = 0, size = 10) {
		return axios.post(OPS_API.userList, {
			phone_num,
			begin,
			size
		})
	},
	searchUserMsg(params) {
		return axios
			.post(OPS_API.searchUserMsg, params)
			.then(response => response.data.result)
	},
	searchLogOut(params) {
		return axios
			.post(OPS_API.searchLogOut, params)
			.then(response => response.data.result)
	},
	operaList(params) {
		return axios
			.post(OPS_API.operaList, params)
			.then(response => response.data.result)
	},
	rootLogs(params) {
		return axios
			.post(OPS_API.rootLogs, params)
			.then(response => response.data.result)
	},
	errLogs(params) {
		return axios
			.post(OPS_API.errLogs, params)
			.then(response => response.data.result)
	},
	throughDatas(params) {
		return axios
			.post(THROUGH_API.throughDatas, params)
			.then(response => response.data.result)
	},
	deviceTotals(params) {
		return axios
			.post(THROUGH_API.deviceTotal, params)
			.then(response => response.data.result)
	},
	onlineLogs(params) {
		return axios
			.post(THROUGH_API.onlineLog, params)
			.then(response => response.data.result)
	},
	logRegDatas(params) {
		return axios
			.post(THROUGH_API.logRegData, params)
			.then(response => response.data.result)
	},
	qpsDatas(params) {
		return axios
			.post(THROUGH_API.qpsData, params)
			.then(response => response.data.result)
	},
	getwarnDatas(params) {
		return axios
			.post(THROUGH_API.warnData, params)
			.then(response => response.data.result)
	},
	getwarnDataList(params) {
		return axios
			.post(THROUGH_API.warnDataSearch, params)
			.then(response => response.data.result)
	},
	// getTerminalList({commit, state}, params) {
	//     return new Promise((resolve, reject) => {
	//         axios.get(OPS_API.getTerminalList, {params: params}).then((response) => {
	//             resolve(response.data.data)
	//         }).catch((error) => {
	//             console.log(error)
	//         })
	//     })
	// },
	// 路由管理
	routerList(params) {
		return axios
			.post(OPS_API.routerList, params)
			.then(response => response.data.result)
	},
	addRouter(params) {
		return axios
			.post(OPS_API.addRouter, params)
			.then(response => response.data.result)
	},
	editRouter(params) {
		return axios
			.post(OPS_API.editRouter, params)
			.then(response => response.data)
	},
	deleteRouter(params) {
		return axios
			.post(OPS_API.deleteRouter, params)
			.then(response => response.data)
	},
	importRouter(params) {
		return axios
			.post(OPS_API.importRouter, params)
			.then(response => response.data.result)
	},
	getFamilyList(params) {
		return axios
			.post(OPS_API.familyList, params)
			.then(response => response.data)
	}
}
