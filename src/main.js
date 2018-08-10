import Vue from 'vue';
import router from './assets/lib/router';
import store from './assets/store/index.js';
import cache from './assets/store/cache.js';
import App from './App.vue';


//打开 mockjs拦截请求，返回mock数据
// 关闭 请求服务器数据
// import mock from './assets/mockData';

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