import * as namespace from '../namespace';

export default {
    state: {
        info: localStorage.getItem('localData') && JSON.parse(localStorage.getItem('localData')).user && JSON.parse(localStorage.getItem('localData')).user.info || {}
    },
    getters: {
        [namespace.USER](state) {
            return state.info || {};
        },
        [namespace.TOKEN](state) {
            return state.info.token || '';
        }
    },
    mutations: {
        /*[namespace.INITUSER](state, payload) {
            state.info = payload.info;
        },*/
        [namespace.SETUSER](state, payload) {
            state.info = payload.info
        },
        [namespace.DELUSER](state, payload) {
            state.info = {}
        }
    },
    actions: {
        /*[namespace.INITUSER]({
            commit,
            state
        }) {

            if (!state.info.name) {
                Vue.$http.get('user/info').then(res => {
                    commit({
        type: namespace.INITUSER,
                        info: res.data
                    });
                }).catch(err => console.log(err));
            }
        },*/
        [namespace.SETUSER]({
            commit
        }, payload) {
            return new Promise((resolve, reject) => {
                commit({
                    type: namespace.SETUSER,
                    info: payload.info
                })
                resolve()
            })

        },
        [namespace.DELUSER]({
            commit
        }, payload) {
            commit({
                type: namespace.DELUSER
            })
        }
    }
};