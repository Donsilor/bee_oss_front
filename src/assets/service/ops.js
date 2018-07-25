// import * as namespace from '../namespace';
// import {
// 	PREFIXPREFIX
// } from '../../lib/util';
import axios from '../lib/http';
import { OPS_API, THROUGH_API } from '~/assets/lib/api';

export default {
    searchUserMsg(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(OPS_API.searchUserMsg, params)
                .then(response => {
                    resolve(response.data.result);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    searchLogOut(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(OPS_API.searchLogOut, params)
                .then(response => {
                    resolve(response.data.result);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    operaList(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(OPS_API.operaList, params)
                .then(response => {
                    resolve(response.data.result);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    rootLogs(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(OPS_API.rootLogs, params)
                .then(response => {
                    resolve(response.data.result);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    errLogs(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(OPS_API.errLogs, params)
                .then(response => {
                    resolve(response.data.result);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    throughDatas(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(THROUGH_API.throughDatas, params)
                .then(response => {
                    resolve(response.data.result);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    deviceTotals(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(THROUGH_API.deviceTotal, params)
                .then(response => {
                    resolve(response.data.result);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    onlineLogs(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(THROUGH_API.onlineLog, params)
                .then(response => {
                    resolve(response.data.result);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    logRegDatas(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(THROUGH_API.logRegData, params)
                .then(response => {
                    resolve(response.data.result);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    qpsDatas(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(THROUGH_API.qpsData, params)
                .then(response => {
                    resolve(response.data.result);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    getwarnDatas(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(THROUGH_API.warnData, params)
                .then(response => {
                    resolve(response.data.result);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    getwarnDataList(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(THROUGH_API.warnDataSearch, params)
                .then(response => {
                    resolve(response.data.result);
                })
                .catch(error => {
                    console.log(error);
                });
        });
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
        return new Promise((resolve, reject) => {
            axios
                .post(OPS_API.routerList, params)
                .then(response => {
                    resolve(response.data.result);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    addRouter(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(OPS_API.addRouter, params)
                .then(response => {
                    resolve(response.data.result);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    editRouter(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(OPS_API.editRouter, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    deleteRouter(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(OPS_API.deleteRouter, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    importRouter(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(OPS_API.importRouter, params)
                .then(response => {
                    resolve(response.data.result);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }
};

