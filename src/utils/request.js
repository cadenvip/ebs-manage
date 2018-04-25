import axios from 'axios'
// import {
//   Message,
//   MessageBox
// } from 'element-ui'
// import {
//   Message
// } from 'element-ui'
import store from '../store'
import {
  // getToken,
  getSessionid
} from '@/utils/auth'

// import router from './router'
import router from '@/router'
import {
  decryptStr
} from '@/utils/index'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 120000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  // if (store.getters.token) {
  //   // config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
  //   // config.headers['Content-Type'] = 'application/json;charset=UTF-8'
  //   config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  // 登录成功后，将JSESSIONID上传以鉴权
  if (store.getters.sessionid !== undefined && store.getters.sessionid !== '') {
    if (config.url !== '/login') {
      config['url'] = config.url + '?JSESSIONID=' + getSessionid()
    }
  }
  // 校验提交的内容中是否包含敏感词（敏感词操作本身不做校验）
  if (config.url.indexOf('/sensitive') < 0) {
    if (config.data !== undefined) {
      var strData = JSON.stringify(config.data)
      var sensitives = JSON.parse(window.localStorage.getItem('sensitives'))
      if (sensitives !== null && sensitives.length > 0) {
        for (let i = 0; i < sensitives.length; i++) {
          if (strData.indexOf(sensitives[i]) >= 0) {
            console.log(`提交的内容包含敏感词 [${sensitives[i]}]`)
            var CancelToken = axios.CancelToken
            var source = CancelToken.source()
            config.cancelToken = source.token
            source.cancel(`hasSensitive:${sensitives[i]}`)
            return config
          }
        }
      }
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
  responseData = decryptStr(responseData)
  console.log('response.data解密后', responseData)
  if (responseData.status === 10086) {
    router.push({
      path: '/timeout'
    })
    return Promise.reject(responseData)
  } else if (responseData.status === 408) {
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
    var responseData = error.response.data
    responseData = decryptStr(responseData)
    console.log('error.response.data解密后', responseData)
    if (responseData.status === 10086) {
      router.push({
        path: '/timeout'
      })
    } else if (responseData.status === 408) {
      router.push({
        path: '/timeout'
      })
    } else if (responseData.status === 403) {
      router.push({
        path: '/403/index'
      })
    } else if (responseData.status === 404) {
      router.push({
        path: '/404'
      })
    }
    return Promise.reject(responseData)
  } else {
    var errorInfo = {
      'status': 402,
      'msg': '未知错误！',
      'error': '未知错误！',
      'data': null
    }
    if (error.message.indexOf('hasSensitive') === 0) {
      var word = error.message.substr(13, error.message.length - 13)
      errorInfo.msg = `提交的内容包含敏感词 [${word}]，提交失败！`
      error = {}
      return Promise.reject(errorInfo)
    } else {
      router.push({
        path: '/404'
      })
      return Promise.reject(errorInfo)
    }
  }
})

export default service
