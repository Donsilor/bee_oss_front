import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import ECharts from 'echarts'
import preview from 'vue-photo-preview'

import '@/assets/js/rem.js'
import '@/assets/css/normalize.css'
import '@/assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import { dateFormat } from '@/assets/js/utils.js'
import { format } from '@/assets/js/fillters.js'
import axios from 'axios'
import 'vue-photo-preview/dist/skin.css'

Vue.prototype.$echarts = ECharts
Vue.prototype.$http = axios
Vue.filter(dateFormat.name, dateFormat)
Vue.filter(format.name, format)
Vue.prototype.$store1 = store

Vue.use(Vuex)
Vue.use(ElementUI)
Vue.use(ECharts)
Vue.use(preview)
Vue.config.productionTip = false

Vue.mixin({
  computed: {
    isAdmin () {
      return (
        this.$store.state.user.info && this.$store.state.user.info.isAdmin === true
      )
    }
  },
  methods: {
    hasPermission (name) {
      let permission_list = this.$store.state.user.permission_list
      return (
        permission_list && permission_list.length && permission_list.indexOf(name) >= 0
      )
    }
  }
})
// 获取用户权限
store.dispatch('getUserPermissionList')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
