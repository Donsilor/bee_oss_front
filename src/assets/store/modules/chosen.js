import * as namespace from '../namespace';
import {
	PREFIX
} from '../../lib/util';
import axios from 'axios';

export default {
	state: {
		product: {},
		app: [],
		router: [],
		subset: [],

	},

	getters: {
		[namespace.APP](state) {
			return state.app;
		},

		[namespace.ROUTER](state) {
			return state.router;
		},

		[namespace.SUBSET](state) {
			return state.subset;
		},

		[namespace.BRAND](state) {
			return state.product.brand;
		},

		[namespace.TYPE](state) {
			return state.product.type;
		},

		[namespace.PRODUCT](state) {
			return state.product.product;
		}

	},

	mutations: {
		[namespace.INITAPP](state, payload) {
			if (!state.app.length) {
				axios.post(PREFIX + 'version/typelist', {
					token: payload.token,
					type: 1
				}).then(res => {
					const json = res.data;
					if (json.code === 200) {
						const list = json.data;
						if (list.length) {
							state.app = list.map(x => {
								return {
									label: `${x.title}-${x.version}`,
									value: x.version
								}
							})
						} else {
							state.app = [];
						}
					} else {

					}
				})
			}
		},

		[namespace.INITROUTER](state, payload) {
			if (!state.app.length) {
				axios.post(PREFIX + 'version/typelist', {
					token: payload.token,
					type: 2
				}).then(res => {
					const json = res.data;
					if (json.code === 200) {
						const list = json.result;
						if (list.length) {
							state.router = list.map(x => {
								return {
									label: x.title,
									value: x.version
								}
							})
						} else {
							state.router = [];
						}
					} else {

					}
				})
			}
		},

		[namespace.INITSUBSET](state, payload) {
			if (!state.app.length) {
				axios.post(PREFIX + 'version/typelist', {
					token: payload.token,
					type: 3
				}).then(res => {
					const json = res.data;
					if (json.code === 200) {
						const list = json.result;
						if (list.length) {
							state.subset = list.map(x => {
								return {
									label: x.title,
									value: `${x.version}-${x.product_id}`
								}
							})
						} else {
							state.subset = [];
						}
					} else {

					}
				});
			}
		},

		[namespace.INITPRODUCT](state, payload) {
			if (!state.app.length) {
				axios.post(PREFIX + 'version/product', {
					token: payload.token,
				}).then(res => {
					const json = res.data;
					if (json.code === 200) {
						state.product = json.result;
					} else {
						state.product = {};
					}

				})
			}
		}
	},

	actions: {
		[namespace.INITAPP]({
			commit
		}, payload) {
			commit({
				type: namespace.INITAPP,
				token: payload.token
			})
		},

		[namespace.INITROUTER]({
			commit
		}, payload) {
			commit({
				type: namespace.INITROUTER,
				token: payload.token
			})
		},

		[namespace.INITSUBSET]({
			commit
		}, payload) {
			commit({
				type: namespace.INITSUBSET,
				token: payload.token
			})
		},

		[namespace.INITPRODUCT]({
			commit
		}, payload) {
			commit({
				type: namespace.INITPRODUCT,
				token: payload.token
			})
		}
	}
}