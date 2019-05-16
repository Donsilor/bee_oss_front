import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import {
  Message
} from 'element-ui'
import getCorsUrl from './corsconfig'

const CODE = {
  SUCCEE: 200,
  SUCCEEELSE: 0,
  NO_LOGIN: 401
}

// Add a request interceptor
axios.interceptors.request.use(
  function(config) {
    if (config.url.indexOf('noToken') > -1) {
      //大文件分片上传接口不加token验证，通过noToken参数来判断是否需要token验证，存在这个参数说明不需要进行Token验证
      return config
    } else {
      let info =
				(localStorage.getItem('localData') &&
					JSON.parse(localStorage.getItem('localData')).user &&
					JSON.parse(localStorage.getItem('localData')).user.info) || {}
      config.withCredentials = true
      // config.headers['Content-Type'] = 'application/json'
      if (!/\/api.php/.test(config.url)) {
        if (!config.data) config.data = {}
        config.data['token'] = info.token || ''
      } else {
        config.url = getCorsUrl() + config.url
      }

      NProgress.start()
      if (config.method === 'post' || config.method === 'put') {
        var params = {}
        var str = []
        for (var k in config.data) {
          if (typeof config.data[k] !== 'function') {
            params[k] = config.data[k]
          }
        }
        // Object.keys(params).map(function (key) {
        //   str.push(encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
        // })
        // config.data = str.join('&')
        config.data = params
      }
      // Do something before request is sent
      return config
    }
  },
  function(error) {
    // Do something with request error
    NProgress.done()
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
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
          NProgress.done()
          return Promise.reject(response.data)
        }
      } else if (
        response.config.method === 'post' ||
				response.config.method === 'put' ||
				response.config.method === 'delete'
      ) {
        // Message({
        //   message: response.data.msg,
        //   type: 'success'
        // })
      }
    }
    NProgress.done()
    return response
  },
  function(error) {
    // Do something with response error
    // miniToastr.error('服务器出错', 'ERROR')
    // iziToast.error({ title: 'ERROR', message: '服务器出错', position: 'topRight' })
    NProgress.done()
    return Promise.reject(error)
  }
)

export default axios
