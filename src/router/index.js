import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/register', component: _import('register/register'), hidden: false },
  { path: '/regStepTwo', component: _import('register/regStepTwo'), hidden: false },
  { path: '/regStepThree', component: _import('register/regStepThree'), hidden: false },
  { path: '/regStepFour', component: _import('register/regStepFour'), hidden: false },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },

  {
    path: '/homepage',
    component: Layout,
    hidden: false,
    children: [
      {
        path: 'index',
        name: 'homepage',
        component: _import('dashboard/index'),
        meta: { title: '首页', icon: 'form' }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 异步挂载的路由
// 动态需要根据权限加载的路由表
/**
 * role 1: 系统管理员
 * role 2: 商家管理员
 */
export const asyncRouterMap = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/location',
    name: 'system',
    hidden: false,
    meta: { roles: ['1'], title: '系统管理', icon: 'table' },
    children: [
      {
        path: 'location',
        name: 'location',
        component: _import('location/index'),
        meta: { roles: ['1'], title: '区域管理', icon: 'table' }
      },
      {
        path: 'user/list',
        name: 'userlist',
        component: _import('user/list'),
        meta: { roles: ['1'], title: '人员管理', icon: 'table' }
      },
      {
        path: 'user/add',
        name: 'useradd',
        hidden: true,
        component: _import('user/add'),
        meta: { roles: ['1'], title: '新增人员', icon: 'table' }
      },
      {
        path: 'user/update',
        name: 'userupdate',
        hidden: true,
        component: _import('user/update'),
        meta: { roles: ['1'], title: '修改人员', icon: 'table' }
      },
      {
        path: 'user/detail',
        name: 'userdetail',
        hidden: true,
        component: _import('user/detail'),
        meta: { roles: ['1'], title: '人员详情', icon: 'table' }
      },
      {
        path: 'role/list',
        name: 'rolelist',
        component: _import('role/list'),
        meta: { roles: ['1'], title: '角色管理', icon: 'table' }
      },
      {
        path: 'role/add',
        name: 'roleadd',
        hidden: true,
        component: _import('role/add'),
        meta: { roles: ['1'], title: '新增角色', icon: 'table' }
      },
      {
        path: 'role/update',
        name: 'roleupdate',
        hidden: true,
        component: _import('role/update'),
        meta: { roles: ['1'], title: '修改角色', icon: 'table' }
      },
      {
        path: 'role/detail',
        name: 'roledetail',
        hidden: true,
        component: _import('role/detail'),
        meta: { roles: ['1'], title: '角色详情', icon: 'table' }
      },
      {
        path: 'permissions',
        name: 'permissions',
        component: _import('authentication/index'),
        meta: { roles: ['1'], title: '权限管理', icon: 'table' }
      },
      {
        path: 'access/list',
        name: 'accesslist',
        component: _import('access/list'),
        meta: { roles: ['1'], title: '接入方管理', icon: 'table' }
      },
      {
        path: 'access/add',
        name: 'accessadd',
        hidden: true,
        component: _import('access/add'),
        meta: { roles: ['1'], title: '新增接入方', icon: 'table' }
      },
      {
        path: 'access/update',
        name: 'accessupdate',
        hidden: true,
        component: _import('access/update'),
        meta: { roles: ['1'], title: '修改接入方', icon: 'table' }
      },
      {
        path: 'access/detail',
        name: 'accessdetail',
        hidden: true,
        component: _import('access/detail'),
        meta: { roles: ['1'], title: '接入方详情', icon: 'table' }
      },
      {
        path: 'sensitive/list',
        name: 'sensitivelist',
        component: _import('sensitive/list'),
        meta: { roles: ['1'], title: '敏感词管理', icon: 'table' }
      },
      {
        path: 'sensitive/add',
        name: 'sensitiveadd',
        hidden: true,
        component: _import('sensitive/add'),
        meta: { roles: ['1'], title: '新增敏感词', icon: 'table' }
      }
    ]
  },

  {
    path: '/log',
    name: 'log',
    component: Layout,
    redirect: '/log/ilog/list',
    hidden: false,
    meta: { roles: ['1'], title: '日志管理', icon: 'table' },
    children: [
      {
        path: 'olog/list',
        name: 'ologlist',
        component: _import('log/oLogList'),
        meta: { roles: ['1'], title: '操作日志', icon: 'table' }
      },
      {
        path: 'olog/detail',
        name: 'ologdetail',
        hidden: true,
        component: _import('log/oLogDetail'),
        meta: { roles: ['1'], title: '操作日志详情', icon: 'table' }
      },
      {
        path: 'ilog/list',
        name: 'iloglist',
        component: _import('log/iLogList'),
        meta: { roles: ['1'], title: '接口日志', icon: 'table' }
      },
      {
        path: 'ilog/detail',
        name: 'ilogdetail',
        hidden: true,
        component: _import('log/iLogDetail'),
        meta: { roles: ['1'], title: '接口日志详情', icon: 'table' }
      }
    ]
  },

  {
    path: '/businesses',
    component: Layout,
    name: 'businesses',
    hidden: false,
    meta: { roles: ['1'], title: '企业管理', icon: 'table' },
    children: [
      {
        path: 'list',
        name: 'businesseslist',
        component: _import('businesses/list'),
        meta: { roles: ['1'], title: '企业列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'businessesadd',
        hidden: true,
        component: _import('businesses/add'),
        meta: { roles: ['1'], title: '新增企业', icon: 'table' }
      },
      {
        path: 'update',
        name: 'businessesupdate',
        hidden: true,
        component: _import('businesses/update'),
        meta: { roles: ['1'], title: '修改企业', icon: 'table' }
      },
      {
        path: 'detail',
        name: 'businessesdetail',
        hidden: true,
        component: _import('businesses/detail'),
        meta: { roles: ['1'], title: '企业详情', icon: 'table' }
      },
      {
        path: 'auditlist',
        name: 'businessesauditlist',
        component: _import('businesses/auditlist'),
        meta: { roles: ['1'], title: '企业审核', icon: 'user' }
      },
      {
        path: 'audit',
        name: 'businessesaudit',
        hidden: true,
        component: _import('businesses/audit'),
        meta: { roles: ['1'], title: '企业审核', icon: 'user' }
      }
    ]
  },

  {
    path: '/goodsmanage',
    component: Layout,
    meta: { roles: ['2'], title: '商品管理', icon: 'form' },
    name: '商品管理',
    children: [
      // 商家
      {
        path: 'publishgoods',
        name: 'publish-goods',
        component: _import('goodsmanage/publish-goods/index'),
        meta: { roles: ['2'], title: '发布商品', icon: 'form' }
      },
      {
        path: 'publishstep1',
        name: 'publishstep1',
        hidden: true,
        component: _import('goodsmanage/publish-goods/step1'),
        meta: { roles: ['2'], title: '选择类别' }
      },
      {
        path: 'publishstep2',
        name: 'publishstep2',
        hidden: true,
        component: _import('goodsmanage/publish-goods/step2'),
        meta: { roles: ['2'], title: '填写详情' }
      },
      {
        path: 'publishstep3',
        name: 'publishstep3',
        hidden: true,
        component: _import('goodsmanage/publish-goods/step3'),
        meta: { roles: ['2'], title: '提交入库' }
      },
      {
        path: 'onsalegoods',
        name: 'onsalegoods',
        component: _import('goodsmanage/onsalegoods/index'),
        meta: { roles: ['2'], title: '销售中商品', icon: 'form' }
      },
      {
        path: 'noshelfgoods',
        name: 'noshelfgoods',
        component: _import('goodsmanage/noshelfgoods/index'),
        meta: { roles: ['2'], title: '未上架商品', icon: 'form' }
      },
      {
        path: 'goodsdetail',
        name: 'goodsdetail',
        component: _import('goodsmanage/goodsdetail/index'),
        meta: { roles: ['2'], title: '商品详情' },
        hidden: true
      },
      // 管理员
      {
        path: 'goodssearch',  // 商品搜索
        name: 'goodssearch',
        component: _import('goodsmanageAdmin/goodssearch/index'),
        meta: { roles: ['2'], title: '商品查询', icon: 'form' }
      },
      {
        path: 'updownaudit',  // 上下架
        name: 'updownaudit',
        component: _import('goodsmanageAdmin/updownaudit/index'),
        meta: { roles: ['2'], title: '商品上下架审核', icon: 'form' }
      },
      {
        path: 'preview',  // 预览
        name: 'preview',
        component: _import('goodsmanageAdmin/preview/index'),
        meta: { roles: ['2'], title: '商品预览', icon: 'form' },
        hidden: true
      }
    ]
  },

  {
    path: '/goodstypemanage',
    component: Layout,
    meta: { roles: ['2'], title: '商品分类管理', icon: 'form' },
    name: '商品分类管理',
    children: [
      // 管理员
      {
        path: 'index',
        name: '商品分类',
        component: _import('goodstypemanage/index'),
        meta: { roles: ['2'], title: '商品分类管理', icon: 'form' }
      }
    ]
  },

  {
    path: '/goodstype',
    component: Layout,
    hidden: true,
    meta: { roles: ['2'], title: '商品分类管理', icon: 'form' },
    name: '商品分类管理新增',
    children: [
      // 管理员
      {
        path: 'add',
        name: '新增商品分类',
        component: _import('goodstypemanage/add'),
        meta: { roles: ['2'], title: '新增商品分类', icon: 'form' }
      },
      {
        path: 'modify',
        name: '修改商品分类',
        component: _import('goodstypemanage/modify'),
        meta: { roles: ['2'], title: '修改商品分类', icon: 'form' }
      },
      {
        path: 'detail',
        name: '商品分类详情',
        component: _import('goodstypemanage/detail'),
        meta: { roles: ['2'], title: '商品分类详情', icon: 'form' }
      }
    ]
  },

  {
    path: '/permission',
    component: Layout,
    name: '权限测试',
    meta: { roles: ['1'], title: '权限测试', icon: 'table' }, // 页面需要的权限
    children: [
      {
        path: 'index',
        component: _import('tree/index'),
        name: '权限测试页',
        meta: { roles: ['1'], title: '权限测试', icon: 'table' }  // 页面需要的权限
      }]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { roles: ['2'], title: '示例', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: _import('table/index'),
        meta: { roles: ['2'], title: '表', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: _import('tree/index'),
        meta: { roles: ['2'], title: '树', icon: 'tree' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
