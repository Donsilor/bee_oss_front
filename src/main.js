import Vue from 'vue';
import ElementUI from 'element-ui';
import router from './assets/lib/router';
import VueRouter from 'vue-router';
import 'element-ui/lib/theme-default/index.css';
import App from './App.vue';

Vue.use(ElementUI);
Vue.use(VueRouter);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
