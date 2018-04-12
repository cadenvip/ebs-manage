import axios from 'axios'
// import {
//   Message,
//   MessageBox
// } from 'element-ui'
import {
  Message
} from 'element-ui'
import store from '../store'
import {
  getToken,
  getSessionid
} from '@/utils/auth'

// import router from './router'
import router from '@/router'
// import { decryptStr } from '@/utils/index'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 60000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    // config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  // 登录成功后，将JSESSIONID上传以鉴权
  if (store.getters.sessionid !== undefined && store.getters.sessionid !== '') {
    // config['url'] = config.url + `?JSESSIONID=${store.getters.sessionid}`
    if (config.url !== '/login') {
      config['url'] = config.url + '?JSESSIONID=' + getSessionid()
    }
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// 下载
const downloadUrl = url => {
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}

// respone拦截器
service.interceptors.response.use(response => {
  if (response.headers && (response.headers['content-type'] === 'application/x-msdownload' || response.headers['content-type'] === 'application/msexcel;charset=UTF-8' || response.headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
    downloadUrl(response.request.responseURL)
    return response
  }
  var responseData = response.data
  // console.log('response.data解密前', responseData)
  // responseData.data = decryptStr(responseData.data)
  // console.log('response.data解密后', responseData.data)
  if (responseData.status === 401) {
    router.push({
      path: '/timeout'
    })
    return Promise.reject(responseData)
  } else if (responseData.status === 403) {
    router.push({
      path: '/403/index'
    })
    return Promise.reject(responseData)
  } else {
    return responseData
  }
},
error => {
  // 错误处理
  console.log('error', error)
  if (error.response !== undefined) {
    if (error.response.status === 401) {
      router.push({
        path: '/timeout'
      })
    } else if (error.response.status === 403) {
      router.push({
        path: '/403/index'
      })
    } else if (error.response.status === 404) {
      router.push({
        path: '/404'
      })
    }
    return Promise.reject(error.response.data)
  } else {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    router.push({
      path: '/404'
    })
    return Promise.reject(error)
  }
})

export default service
