import axios from "../lib/http";
import { PERMISSION_API } from "~/lib/api";

const api = {
	//用户权限
	searchUserList(params) {
		return axios.post(PERMISSION_API.searchUserList, params);
	},
	userList(params) {
		return axios.post(PERMISSION_API.userList, params);
	},
	getUser(params) {
		return axios.post(PERMISSION_API.getUser, params);
	},
	addUser(params) {
		return axios.post(PERMISSION_API.addUser, params);
	},
	editUser(params) {
		return axios.post(PERMISSION_API.editUser, params);
	},
	deleteUser(user_ids) {
		return axios.post(PERMISSION_API.deleteUser, { user_ids });
	},
	updatePwd(params) {
		return axios.post(PERMISSION_API.updatePwd, params);
	},
	resetPwd(params) {
		return axios.post(PERMISSION_API.resetPwd, params);
	},
	//角色管理
	roleList(params) {
		return axios.post(PERMISSION_API.roleList, params);
	},
	getRole(role_id) {
		return axios.post(PERMISSION_API.getRole, { role_id });
	},
	addRole(params) {
		return axios.post(PERMISSION_API.addRole, params);
	},
	editRole(params) {
		return axios.post(PERMISSION_API.editRole, params);
	},
	deleteRole(role_id) {
		return axios.post(PERMISSION_API.deleteRole, { role_id });
	},
	//菜单管理
	menuList() {
		return axios.post(PERMISSION_API.menuList);
	}
};

export default api;
