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


new Vue({
	el: '#app',
	router,
	store,
	render: h => h(App)
});

window.addEventListener('beforeunload', () => {
	cache.save();
});