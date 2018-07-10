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
    }
}
export default {
    actions
}