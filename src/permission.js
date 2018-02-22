import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

// permissiom judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('商家管理员') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/',
  '/login',
  '/goodsmanage/publishgoods',
  '/goodsmanage/publishstep1',
  '/goodsmanage/publishstep2',
  '/goodsmanage/publishstep3',
  '/goodsmanage/onsalegoods',
  '/goodsmanage/noshelfgoods',
  '/goodsmanage/goodsdetail',
  // 管理员
  '/goodsmanage/updownaudit',
  '/goodsmanage/goodssearch',
  '/goodsmanage/preview',
  '/account/location',
  '/account/user/list',
  '/account/user/add',
  '/account/user/update',
  '/account/user/detail',
  '/account/role/list',
  '/account/role/add',
  '/account/role/update',
  '/account/role/detail',
  '/account/permissions',
  '/businesses/list',
  '/businesses/add',
  '/businesses/detail',
  '/businesses/audit'
] // 不重定向白名单

router.beforeEach((to, from, next) => {
  console.log(getToken())
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      console.log(1, store.getters.roles)
      if (store.getters.roles.length === 0) {
        console.log(2)
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          const roles = res.data.roles
          console.log(roles)
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            console.log(3)
            router.addRoutes(store.getters.addRoutes)
            next({ ...to, replace: true })
          })
        }).catch(() => {
          console.log(4)
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
