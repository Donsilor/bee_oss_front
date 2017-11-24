import * as namespace from '../namespace';
import {
	PREFIX
} from '../../lib/util';
import axios from '../../lib/http';
import {UPGRADE_API} from "~/assets/lib/api";

const actions = {
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
    }
}
export default {
    actions
}