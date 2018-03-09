import axios from 'axios'
import { MessageBox } from 'element-ui'
import store from '../store'
import { getToken, getSessionid } from '@/utils/auth'

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
  if (store.getters.sessionid) {
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

// respone拦截器
service.interceptors.response.use(response => {
  // TODO 拦截
  return response.data
},
error => {
  // 错误处理
  console.log('response.status: ', error.response.status)
  if (error.response.status === 401) {
    MessageBox('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      // 前端登出（清除登录数据）
      store.dispatch('FedLogOut').then(() => {
        window.location.reload()
      })
    })
  }
  return Promise.reject(error)
})

export default service
