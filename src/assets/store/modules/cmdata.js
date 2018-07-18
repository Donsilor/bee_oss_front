import * as namespace from '../namespace';
import {
	PREFIX
} from '../../lib/util';
import axios from '../../lib/http';
import {CMDATA_API} from "~/assets/lib/api";

const API_UPGRADE = '/api.php'

const actions = {
    CmDataList({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(CMDATA_API.CmDataList, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    CmDataAdd({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(CMDATA_API.CmDataAdd, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    CmDataEdit({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(CMDATA_API.CmDataEdit, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    CmDataDel({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(CMDATA_API.CmDataDel, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    ModuleList({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(CMDATA_API.ModuleList, params).then((response) => {
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