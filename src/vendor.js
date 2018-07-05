import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme/index.css';
import 'element-ui/lib/theme-chalk/index.css'

import VCharts from 'v-charts'
import axios from 'axios';
import preview from 'vue-photo-preview'
import 'vue-photo-preview/dist/skin.css'

Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VCharts);
Vue.use(preview);

Vue.prototype.$http = axios;