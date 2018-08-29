import axios from "../lib/http";
import { BASE_URL } from "~/lib/api";

const api = {
	getOnlineUser(params) {
		return axios.post(`${BASE_URL}analyzer/online_user`, params);
	},
	getRegisterUser(params) {
		return axios.post(`${BASE_URL}analyzer/register_user`, params);
	},
	getActiveUser(params) {
		return axios.post(`${BASE_URL}analyzer/active_user`, params);
	},
	getActivePercent(params) {
		return axios.post(`${BASE_URL}analyzer/active_percent`, params);
	},
	getLoginUser(params) {
		return axios.post(`${BASE_URL}analyzer/login_user`, params);
	}
};

Object.assign(api, {
	getUserAnalyzeData: function(params) {
		const registerParams = { ...params, province: "", city: "" };
		return axios.all([
			api.getOnlineUser(params),
			api.getRegisterUser(registerParams),
			api.getActiveUser(params),
			api.getLoginUser(params)
		]);
	}
});

export default api;
