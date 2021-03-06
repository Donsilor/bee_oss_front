import * as namespace from '../namespace'
import API from '../../service/user.js'

export default {
  state: {
    info:
      (localStorage.getItem('localData') &&
        JSON.parse(localStorage.getItem('localData')).user &&
        JSON.parse(localStorage.getItem('localData')).user.info) ||
      {},
    permission_list: []
  },
  getters: {
    [namespace.USER] (state) {
      return state.info || {}
    },
    [namespace.TOKEN] (state) {
      return state.info.token || ''
    }
  },
  mutations: {
    [namespace.SETUSER] (state, payload) {
      state.info = payload.info
    },
    [namespace.DELUSER] (state, payload) {
      state.info = {}
      localStorage.setItem('localData', '')
    },
    getPermissionList (state, payload) {
      state.permission_list = payload
    }
  },
  actions: {
    [namespace.SETUSER] ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        commit({
          type: namespace.SETUSER,
          info: payload.info
        })
        resolve()
      })
    },
    [namespace.DELUSER] ({ commit }, payload) {
      commit({
        type: namespace.DELUSER
      })
    },
    getUserPermissionList ({ commit, state }) {
      if (state.info.token) {
        API.getUserPermissionList().then(res => {
          commit('getPermissionList', res.data.result.permission_list)
        })
      }
    }
  }
}
