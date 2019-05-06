export default {
  namespaced: true,
  state: {
    queryOptionStorage: '',
    needQueryOptionStorage: false
  },
  getters: {
    queryOptionStorage(state) {
      return state.queryOptionStorage
    },
    needQueryOptionStorage(state) {
      return state.needQueryOptionStorage
    }
  },
  mutations: {
    setQueryOptionStorage(state, payload) {
      state.queryOptionStorage = payload
    },
    setNeedQueryOptionStorage(state, payload) {
      state.needQueryOptionStorage = payload
    }
  },
  actions: {
    setQueryOptionStorage({ commit, state }, queryOption) {
      commit('setQueryOptionStorage', queryOption)
    },
    setNeedQueryOptionStorage({ commit, state }, param) {
      commit('setNeedQueryOptionStorage', param)
    }
  }
}
