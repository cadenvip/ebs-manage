import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
// import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

// permissiom judge function
function hasPermission(roles, permissionRoles) {
  if (!permissionRoles) {
    return true
  }
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/',
  '/login'
  // '/goodsmanage/publishgoods',
  // '/goodsmanage/publishstep1',
  // '/goodsmanage/publishstep2',
  // '/goodsmanage/publishstep3',
  // '/goodsmanage/onsalegoods',
  // '/goodsmanage/noshelfgoods',
  // '/goodsmanage/goodsdetail',
  // 管理员
  // '/goodsmanage/updownaudit',
  // '/goodsmanage/goodssearch',
  // '/goodsmanage/preview',
  // '/account/location',
  // '/account/user/list',
  // '/account/user/add',
  // '/account/user/update',
  // '/account/user/detail',
  // '/account/role/list',
  // '/account/role/add',
  // '/account/role/update',
  // '/account/role/detail',
  // '/account/permissions',
  // '/businesses/list',
  // '/businesses/add',
  // '/businesses/detail',
  // '/businesses/audit'
] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      store.dispatch('LogOut').then(() => {
        // next()
        location.reload()
      }).catch(error => {
        NProgress.done()
        Message.error('登出失败！')
        console.log(error)
        next({ path: from })
      })
    } else {
      if (store.getters.roles.length === 0) {
        var roles = []
        store.dispatch('GetInfo').then(response => { // 拉取用户信息
          response.role.forEach(function(v) {
            roles.push(v.roletype)
          })
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            debugger
            router.addRoutes(store.getters.addRouters)
            next({ ...to, replace: true })
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('验证失败,请重新登录')
            next({ path: '/login' })
          })
        })
      } else {
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          next()
        } else {
          next({ path: '401', replace: true, query: { noGoBack: true }})
        }
      }
    }
  } else if (to.path === '/register') {
    next()
  } else if (to.path === '/regStepTwo') {
    next()
  } else if (to.path === '/regStepThree') {
    next()
  } else if (to.path === '/regStepFour') {
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
