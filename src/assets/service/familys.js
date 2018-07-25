
import axios from '../lib/http';
import {FAMILY_API} from "~/assets/lib/api";


export default {
    imgList(params) {
        return new Promise((resolve, reject) => {
            axios.post(FAMILY_API.imgList, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    addImgs(params) {
        return new Promise((resolve, reject) => {
            axios.post(FAMILY_API.addImgs, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    deleteImgs(params) {
        return new Promise((resolve, reject) => {
            axios.post(FAMILY_API.deleteImgs, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    editImgs(params) {
        return new Promise((resolve, reject) => {
            axios.post(FAMILY_API.editImgs, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    sortImgs(params) {
        return new Promise((resolve, reject) => {
            axios.post(FAMILY_API.sortImgs, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    }
}
