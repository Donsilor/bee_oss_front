import axios from "../lib/http";
import { UPGRADE_API } from "~/lib/api";

const API_UPGRADE = "/api.php";

export default {
	pubilcCorsAction(params) {
		return new Promise((resolve, reject) => {
			axios
				.post(API_UPGRADE, params)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					console.log(error);
				});
		});
	},
	getVersions(params) {
		return new Promise((resolve, reject) => {
			params.method = "list_versions";
			axios
				.post(API_UPGRADE, params)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					console.log(error);
				});
		});
	},
	getVersionsForSC(params) {
		return new Promise((resolve, reject) => {
			params.method = "list_versions_community";
			axios
				.post(API_UPGRADE, params)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					console.log(error);
				});
		});
	},
	selectVersion(params) {
		return new Promise((resolve, reject) => {
			axios
				.post(UPGRADE_API.selectVersion, params)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					console.log(error);
				});
		});
	},
	pushUpdateAction(params) {
		return new Promise((resolve, reject) => {
			axios
				.post(UPGRADE_API.pushUpdateAction, params)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					console.log(error);
				});
		});
	},
	getPushHistoryList(params) {
		return new Promise((resolve, reject) => {
			axios
				.post(UPGRADE_API.getPushHistoryList, params)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					console.log(error);
				});
		});
	},
	getChoseList(params) {
		return new Promise((resolve, reject) => {
			axios
				.post(API_UPGRADE, params)
				.then(response => {
					resolve(response.data);
				})
				.catch(error => {
					console.log(error);
				});
		});
	}
};
