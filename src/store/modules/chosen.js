import * as namespace from '../namespace'
import { PREFIX } from '../../lib/util'
import axios from 'axios'
const API_UPGRADE = '/api.php'

export default {
  state: {
    product: {},
    appIos: [],
    appAndroid: [],
    router: [],
    subset: []
  },

  getters: {
    [namespace.APPIOS] (state) {
      return state.appIos
    },

    [namespace.APPANDROID] (state) {
      return state.appAndroid
    },

    [namespace.ROUTER] (state) {
      return state.router
    },

    [namespace.SUBSET] (state) {
      return state.subset
    },

    [namespace.BRAND] (state) {
      return state.product.brand
    },

    [namespace.TYPE] (state) {
      return state.product.type
    },

    [namespace.PRODUCT] (state) {
      return state.product.product
    }
  },

  mutations: {
    [namespace.GETAPPIOS] (state, payload) {
      axios
        .post(API_UPGRADE, {
          token: payload.token,
          method: 'released_versions',
          type: 4
        })
        .then(res => {
          const json = res.data
          if (json.code === 0) {
            const list = json.result
            if (list.length) {
              state.appIos = list.map(x => {
                return {
                  label: `${x.title}-${x.version}`,
                  value: x.version
                }
              })
            } else {
              state.appIos = []
            }
          }
        })
    },

    [namespace.GETAPPANDROID] (state, payload) {
      axios
        .post(API_UPGRADE, {
          token: payload.token,
          method: 'released_versions',
          type: 1
        })
        .then(res => {
          const json = res.data
          if (json.code === 0) {
            const list = json.result
            if (list.length) {
              state.appAndroid = list.map(x => {
                return {
                  label: x.title,
                  value: x.version
                }
              })
            } else {
              state.appAndroid = []
            }
          }
        })
    },

    [namespace.GETROUTER] (state, payload) {
      axios
        .post(API_UPGRADE, {
          token: payload.token,
          router_pid: payload.router_pid,
          method: 'released_versions',
          type: 2
        })
        .then(res => {
          const json = res.data
          if (json.code === 0) {
            const list = json.result
            if (list.length) {
              state.router = list.map(x => {
                return {
                  label: x.title,
                  value: x.version,
                  product_id: x.product_id,
                  pid_value: `${x.router_pid}-${x.version}`
                }
              })
            } else {
              state.router = []
            }
          }
        })
    },

    [namespace.GETSUBSET] (state, payload) {
      axios
        .post(API_UPGRADE, {
          token: payload.token,
          method: 'released_versions',
          type: 3,
          product_id: payload.product_id
        })
        .then(res => {
          const json = res.data
          if (json.code === 0) {
            const list = json.result
            if (list && list.length) {
              state.subset = list.map(x => {
                return {
                  label: x.title,
                  value: `${x.version}-${x.product_id}`
                }
              })
            } else {
              state.subset = []
            }
          }
        })
    },

    [namespace.GETPRODUCT] (state, payload) {
      axios
        .post(PREFIX + 'version/product', {
          token: payload.token
        })
        .then(res => {
          const json = res.data
          if (json.code === 200) {
            state.product = json.result
          } else {
            state.product = {}
          }
        })
    }
  },

  actions: {
    [namespace.GETAPPIOS] ({ commit }, payload) {
      commit({
        type: namespace.GETAPPIOS,
        token: payload.token
      })
    },

    [namespace.INITAPPIOS] ({ commit, state }, payload) {
      if (!state.appIos.length) {
        commit({
          type: namespace.GETAPPIOS,
          token: payload
        })
      }
    },

    [namespace.GETAPPANDROID] ({ commit }, payload) {
      commit({
        type: namespace.GETAPPANDROID,
        token: payload.token
      })
    },

    [namespace.INITAPPANDROID] ({ commit, state }, payload) {
      if (!state.appAndroid.length) {
        commit({
          type: namespace.GETAPPANDROID,
          token: payload.token
        })
      }
    },

    [namespace.GETROUTER] ({ commit }, payload) {
      commit({
        type: namespace.GETROUTER,
        token: payload.token,
        router_pid: payload.router_pid
      })
    },

    [namespace.INITROUTER] ({ commit, state }, payload) {
      if (!state.router.length) {
        commit({
          type: namespace.GETROUTER,
          token: payload.token
        })
      }
    },

    [namespace.GETSUBSET] ({ commit }, payload) {
      commit({
        type: namespace.GETSUBSET,
        token: payload.token,
        product_id: payload.product_id
      })
    },

    [namespace.INITSUBSET] ({ commit, state }, payload) {
      if (!state.subset.length) {
        commit({
          type: namespace.GETSUBSET,
          token: payload.token,
          product_id: payload.product_id
        })
      }
    },

    [namespace.GETPRODUCT] ({ commit }, payload) {
      commit({
        type: namespace.GETPRODUCT,
        token: payload.token
      })
    },

    [namespace.INITPRODUCT] ({ commit, state }, payload) {
      if (!state.product.length) {
        commit({
          type: namespace.GETPRODUCT,
          token: payload.token
        })
      }
    }
  }
}
