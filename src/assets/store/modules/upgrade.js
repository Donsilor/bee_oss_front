import * as namespace from '../namespace';
import {
	PREFIX
} from '../../lib/util';
import axios from '../../lib/http';
import {UPGRADE_API} from "~/assets/lib/api";

const actions = {
    importSubmitAction({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(UPGRADE_API.importSubmitAction, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
        // this.$http.post(PREFIX + 'version/list', this.filterParams).then(res => {
        //     const json = res.data;
        //     if (json.code === 200) {
        //         this.list = json.result.list;
        //         this.totalItem = json.result.total;
        //         this.currentPage = json.result.current_page;
        //     } else {
        //         this.$message.error(json.msg);
        //     }
        // })
    },
    getVersions({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(UPGRADE_API.getVersions, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
        // this.$http.post(PREFIX + 'version/list', this.filterParams).then(res => {
        //     const json = res.data;
        //     if (json.code === 200) {
        //         this.list = json.result.list;
        //         this.totalItem = json.result.total;
        //         this.currentPage = json.result.current_page;
        //     } else {
        //         this.$message.error(json.msg);
        //     }
        // })
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
    getVersionDetailAction({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(UPGRADE_API.getVersionDetailAction, params).then((response) => {
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