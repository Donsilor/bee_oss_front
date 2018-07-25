import axios from '../lib/http';
import { STRATEGY_API } from '~/assets/lib/api';

// const API_UPGRADE = '/api.php';

export default {
    strategyList(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(STRATEGY_API.strategyList, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    StrategyAdd(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(STRATEGY_API.StrategyAdd, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    StrategyEdit(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(STRATEGY_API.StrategyEdit, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    StrategyDel(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(STRATEGY_API.StrategyDel, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    StrategyUuidList(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(STRATEGY_API.StrategyUuidList, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    StrategyUuidAdd(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(STRATEGY_API.StrategyUuidAdd, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    StrategyUuidEdit(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(STRATEGY_API.StrategyUuidEdit, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    StrategyUuidDel(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(STRATEGY_API.StrategyUuidDel, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    StrategyConfiglists(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(STRATEGY_API.StrategyConfiglists, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    StrategyConfigAdd(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(STRATEGY_API.StrategyConfigAdd, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    StrategyConfigEdit(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(STRATEGY_API.StrategyConfigEdit, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    },
    StrategyConfigDel(params) {
        return new Promise((resolve, reject) => {
            axios
                .post(STRATEGY_API.StrategyConfigDel, params)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }
};

