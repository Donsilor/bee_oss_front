import * as namespace from '../namespace';
import {
	PREFIX
} from '../../lib/util';
import axios from '../../lib/http';
import {STRATEGY_API} from "~/assets/lib/api";

const API_UPGRADE = '/api.php'

const actions = {
    strategyList({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(STRATEGY_API.strategyList, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    StrategyAdd({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(STRATEGY_API.StrategyAdd, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    StrategyEdit({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(STRATEGY_API.StrategyEdit, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    StrategyDel({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(STRATEGY_API.StrategyDel, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    StrategyUuidList({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(STRATEGY_API.StrategyUuidList, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    StrategyUuidAdd({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(STRATEGY_API.StrategyUuidAdd, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    StrategyUuidEdit({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(STRATEGY_API.StrategyUuidEdit, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    StrategyUuidDel({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(STRATEGY_API.StrategyUuidDel, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    StrategyConfiglists({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(STRATEGY_API.StrategyConfiglists, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    StrategyConfigAdd({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(STRATEGY_API.StrategyConfigAdd, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    StrategyConfigEdit({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(STRATEGY_API.StrategyConfigEdit, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
    StrategyConfigDel({commit, state}, params) {
        return new Promise((resolve, reject) => {
            axios.post(STRATEGY_API.StrategyConfigDel, params).then((response) => {
                resolve(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })
    },
}
export default {
    actions
}