import axios from 'axios'
import { Message } from 'element-ui'
import store from '../store'
import { getToken, getSessionid } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 300000 // 请求超时时间
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
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
  console.log(response)
  const res = response.data
  // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  if (response.status === 401) {
    this.$confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      store.dispatch('FedLogOut').then(() => {
        location.reload()// 为了重新实例化vue-router对象 避免bug
      })
    })
  }
  return res
},
error => {
  console.log('55行出错了')
  console.log('err' + error)// for debug
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error)
}
)

export default service
