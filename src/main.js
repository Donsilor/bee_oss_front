import Vue from 'vue';
import ElementUI from 'element-ui';
import router from './assets/lib/router';
import VueRouter from 'vue-router';
import axios from 'axios';
import store from './assets/store/index.js';
import cache from './assets/store/cache.js';
import 'element-ui/lib/theme-default/index.css';
import App from './App.vue';

Vue.prototype.$http = axios;

Vue.use(ElementUI);
Vue.use(VueRouter);

Vue.mixin({
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