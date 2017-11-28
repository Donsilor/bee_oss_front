import axios from 'axios'
import NProgress from 'nprogress'
import '../../../node_modules/nprogress/nprogress.css'
import { Message } from 'element-ui'

const info = localStorage.getItem('localData') &&
    JSON.parse(localStorage.getItem('localData')).user &&
    JSON.parse(localStorage.getItem('localData')).user.info || {}

const CODE = {
  SUCCEE: 200,
  NO_LOGIN: -14
}

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  config.withCredentials = true
  config.data['token'] = info.token || ''
  NProgress.start()
  if (config.method === 'post' || config.method === 'put') {
    var params = {}
    var str = []
    for (var k in config.data) {
      if (typeof config.data[k] !== 'function') {
        // 参数是对象，并且不为空
        if (typeof config.data[k] === 'object') {
          params[k] = JSON.stringify(config.data[k])
        } else {
          params[k] = config.data[k]
        }
      }
    }
    Object.keys(params).map(function (key) {
      str.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
    })
    config.data = str.join('&')
  }
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  NProgress.done()
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  if (response.status === 200) {
    if (response.data.code !== CODE.SUCCEE) {
      // console.error(response.data)
      if (response.data.code === CODE.NO_LOGIN) {
        // 错误码回调
      } else {
        Message({
          message: response.data.msg,
          type: 'error'
        })
      }
    } else if (response.config.method === 'post' || response.config.method === 'put' || response.config.method === 'delete') {
      // Message({
      //   message: response.data.msg,
      //   type: 'success'
      // })
    }
  }
  NProgress.done()
  return response
}, function (error) {
  // Do something with response error
  // miniToastr.error('服务器出错', 'ERROR')
  // iziToast.error({ title: 'ERROR', message: '服务器出错', position: 'topRight' })
  NProgress.done()
  return Promise.reject(error)
})

export default axios
