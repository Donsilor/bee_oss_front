import axios from '../lib/http'
import { STRATEGY_API } from '~/lib/api'

// const API_UPGRADE = '/api.php';

export default {
  strategyList (params) {
    return axios
      .post(STRATEGY_API.strategyList, params)
      .then(response => response.data)
  },
  StrategyAdd (params) {
    return axios
      .post(STRATEGY_API.StrategyAdd, params)
      .then(response => response.data)
  },
  StrategyEdit (params) {
    return axios
      .post(STRATEGY_API.StrategyEdit, params)
      .then(response => response.data)
  },
  StrategyDel (params) {
    return axios
      .post(STRATEGY_API.StrategyDel, params)
      .then(response => response.data)
  },
  StrategyUuidList (params) {
    return axios
      .post(STRATEGY_API.StrategyUuidList, params)
      .then(response => response.data)
  },
  StrategyUuidAdd (params) {
    return axios
      .post(STRATEGY_API.StrategyUuidAdd, params)
      .then(response => response.data)
  },
  StrategyUuidEdit (params) {
    return axios
      .post(STRATEGY_API.StrategyUuidEdit, params)
      .then(response => response.data)
  },
  StrategyUuidDel (params) {
    return axios
      .post(STRATEGY_API.StrategyUuidDel, params)
      .then(response => response.data)
  },
  StrategyConfiglists (params) {
    return axios
      .post(STRATEGY_API.StrategyConfiglists, params)
      .then(response => response.data)
  },
  StrategyConfigAdd (params) {
    return axios
      .post(STRATEGY_API.StrategyConfigAdd, params)
      .then(response => response.data)
  },
  StrategyConfigEdit (params) {
    return axios
      .post(STRATEGY_API.StrategyConfigEdit, params)
      .then(response => response.data)
  },
  StrategyConfigDel (params) {
    return axios
      .post(STRATEGY_API.StrategyConfigDel, params)
      .then(response => response.data)
  }
}
