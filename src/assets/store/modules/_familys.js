import * as namespace from '../namespace';
import {
	PREFIX
} from '../../lib/util';
import axios from '../../lib/http';
import {FAMILY_API} from "~/assets/lib/api";

const API_UPGRADE = '/api.php'

const actions = {
    imgList({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(FAMILY_API.imgList, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    addImgs({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(FAMILY_API.addImgs, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    deleteImgs({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(FAMILY_API.deleteImgs, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    editImgs({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(FAMILY_API.editImgs, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    sortImgs({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(FAMILY_API.sortImgs, params).then((response) => {
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