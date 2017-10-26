import Vuex from 'vuex';
import user from './modules/user';
import website from './modules/website';
import chosen from './modules/chosen';
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules: {
        user,
        website,
        chosen
    }
});