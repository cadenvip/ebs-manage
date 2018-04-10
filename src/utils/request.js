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
import { decryptStr } from '@/utils/index'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000 // 请求超时时间
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

const xxx = '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'

// respone拦截器
service.interceptors.response.use(response => {
  console.log('xxx解密前', xxx)
  console.log('response.data解密后', decryptStr(xxx))
  // console.log('response.data解密前', response.data)
  // var result = decryptStr(response.data)
  // console.log('response.data解密后', result)

  if (response.headers && (response.headers['content-type'] === 'application/x-msdownload' || response.headers['content-type'] === 'application/msexcel;charset=UTF-8' || response.headers['content-type'] === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
    downloadUrl(response.request.responseURL)
    return response
  }
  if (response.data.status === 401) {
    // store.dispatch('FedLogOut').then(() => {
    //   window.location.reload()
    // })
    // Message({
    //   message: '您已超时，请重新登录!',
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    router.push({
      path: '/timeout'
    })
    return Promise.reject(response.data)
  } else if (response.data.status === 403) {
    router.push({
      path: '/403/index'
    })
    return Promise.reject(response.data)
  } else {
    return response.data
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
    }
    return Promise.reject(error.response.data)
  } else {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
})

export default service
