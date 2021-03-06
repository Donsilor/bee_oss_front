import Vuex from 'vuex'
import user from './modules/user'
import Vue from 'vue'
// import website from './modules/website';
import chosen from './modules/chosen'
// import ops from './modules/ops';
// import strategy from './modules/strategy';
// import upgrade from './modules/upgrade';
// import family from './modules/familys';
import feedback from './modules/feedback'

Vue.use(Vuex)
// import cmdata from './modules/cmdata';

export default new Vuex.Store({
  state: {}, // state
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    website: {},
    chosen,
    // ops,
    // upgrade,
    // family,
    // strategy,
    feedback
    // cmdata
  }
})
