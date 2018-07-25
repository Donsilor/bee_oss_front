import axios from '../lib/http';
import { CMDATA_API } from '~/assets/lib/api';

export default {
    CmDataList(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(CMDATA_API.CmDataList, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    CmDataAdd(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(CMDATA_API.CmDataAdd, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    CmDataEdit(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(CMDATA_API.CmDataEdit, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    CmDataDel(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(CMDATA_API.CmDataDel, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    ModuleList(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(CMDATA_API.ModuleList, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }
};
