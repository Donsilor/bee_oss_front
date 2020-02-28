import axios from 'axios'
import store from '@/store/index.js'
import {
  Message,
  Loading
} from 'element-ui'
var axiosInstance = axios.create({
  timeout: 10000,
  // baseURL: 'http://iot-dev-upgrade-center.egtest.cn:7777',
  header: {
    Authorization: store.state.user.token || ''
  }
})
let isDEV = process.env.NODE_ENV === 'development'
console.log('env', process.env.NODE_ENV)
console.log('env', process.argv)
var instenceLoading = {}
const CODE = {
  SUCCEE: 200,
  SUCCEEELSE: 0,
  NO_LOGIN: 401
}

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    instenceLoading = Loading.service({
      lock: true,
      text: '加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.2)'
    })
    if (!isDEV) {
      config.url = 'http://iot-dev-upgrade-center.egtest.cn:7777' + config.url
    }
    if (config.url.indexOf('noToken') > -1) {
      // 大文件分片上传接口不加token验证，通过noToken参数来判断是否需要token验证，存在这个参数说明不需要进行Token验证
      return config
    } else {
      console.log(' config.url====', config.url)
      return config
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    instenceLoading.close()
    // Do something with response data
    if (response.status === 200) {
      if (response.data.code !== CODE.SUCCEE && response.data.code !== CODE.SUCCEEELSE) {
        // console.error(response.data)
        if (response.data.code === CODE.NO_LOGIN) {
          // 未登录的情况
          Message({
            message: `token过期，请登录后重试`,
            type: 'error'
          })
          localStorage.setItem('localData', '')
          window.location.hash = '/'
        } else {
          Message({
            message: response.data.msg || response.data.message,
            type: 'error'
          })
          return Promise.reject(response.data)
        }
      }
    }
    return response
  },
  function (error) {
    instenceLoading.close()
    return Promise.reject(error)
  }
)

export default axiosInstance
