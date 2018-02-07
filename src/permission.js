import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

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
  '/enterprise/list',
  '/enterprise/add',
  '/enterprise/detail',
  '/enterprise/audit'
] // 不重定向白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => { // 拉取用户信息
          next()
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            Message.error('验证失败,请重新登录')
            next({ path: '/login' })
          })
        })
      } else {
        next()
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
