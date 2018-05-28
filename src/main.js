import Vue from 'vue';
// import ElementUI from 'element-ui';
import router from './assets/lib/router';
// import VueRouter from 'vue-router';
// import axios from 'axios';
import store from './assets/store/index.js';
import cache from './assets/store/cache.js';
import App from './App.vue';

// Vue.prototype.$http = axios;

// Vue.use(ElementUI);
// Vue.use(VueRouter);

Vue.mixin({
	computed: {	
		isAdmin() {	
			return this.$store.state.user.info && this.$store.state.user.info.isAdmin === true
		}
	},
	methods: {	
		hasPermission(name) {	
			let permission_list = this.$store.state.user.permission_list
			return permission_list && permission_list.length && permission_list.indexOf(name) >= 0
		}
	}
})
//获取用户权限
store.dispatch('getUserPermissionList')
  
new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
});

window.addEventListener('beforeunload', () => {
	cache.save();
});