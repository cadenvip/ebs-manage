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
  { path: '/404', component: _import('404'), hidden: true },
  { path: '/register', component: _import('register/register'), hidden: false },

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
        component: _import('homepage/index'),
        meta: { title: '首页', icon: 'form' }
      }
    ]
  },

  {
    path: '/account',
    component: Layout,
    redirect: '/account/location',
    name: 'account',
    hidden: false,
    meta: { title: '账户管理', icon: 'table' },
    children: [
      {
        path: 'location',
        name: 'location',
        component: _import('location/index'),
        meta: { title: '区域管理', icon: 'table' }
      },
      {
        path: 'subscriber',
        name: 'subscriber',
        component: _import('account/subscriber'),
        meta: { title: '订购用户查询', icon: 'user' }
      },
      {
        path: 'user/list',
        name: 'userlist',
        component: _import('user/list'),
        meta: { title: '人员管理', icon: 'table' }
      },
      {
        path: 'user/add',
        name: 'useradd',
        hidden: true,
        component: _import('user/add'),
        meta: { title: '新增人员', icon: 'table' }
      },
      {
        path: 'user/update',
        name: 'userupdate',
        hidden: true,
        component: _import('user/update'),
        meta: { title: '修改人员', icon: 'table' }
      },
      {
        path: 'user/detail',
        name: 'userdetail',
        hidden: true,
        component: _import('user/detail'),
        meta: { title: '人员详情', icon: 'table' }
      },
      {
        path: 'role/list',
        name: 'rolelist',
        component: _import('role/list'),
        meta: { title: '角色管理', icon: 'table' }
      },
      {
        path: 'role/add',
        name: 'roleadd',
        hidden: true,
        component: _import('role/add'),
        meta: { title: '新增角色', icon: 'table' }
      },
      {
        path: 'role/update',
        name: 'roleupdate',
        hidden: true,
        component: _import('role/update'),
        meta: { title: '修改角色', icon: 'table' }
      },
      {
        path: 'role/detail',
        name: 'roledetail',
        hidden: true,
        component: _import('role/detail'),
        meta: { title: '角色详情', icon: 'table' }
      },
      {
        path: 'permissions',
        name: 'permissions',
        component: _import('authentication/index'),
        meta: { title: '权限管理', icon: 'table' }
      },
      {
        path: 'logmanagement',
        name: 'logmanagement',
        component: _import('account/logmanagement'),
        meta: { title: '日志管理', icon: 'table' }
      },
      {
        path: 'paramsmanagement',
        name: 'paramsmanagement',
        component: _import('account/paramsmanagement'),
        meta: { title: '参数管理', icon: 'table' }
      },
      {
        path: 'sensitivewordsmanagement',
        name: 'sensitivewordsmanagement',
        component: _import('account/sensitivewordsmanagement'),
        meta: { title: '敏感词管理', icon: 'table' }
      }
    ]
  },

  {
    path: '/enterprisemanagement',
    component: Layout,
    name: 'enterprise',
    hidden: false,
    meta: { title: '企业管理', icon: 'table' },
    children: [
      {
        path: 'enterpriselist',
        name: 'enterpriselist',
        component: _import('enterprise/enterpriselist'),
        meta: { title: '企业列表', icon: 'table' }
      },
      {
        path: 'auditenterprise',
        name: 'auditenterprise',
        component: _import('enterprise/auditenterprise'),
        meta: { title: '企业审核', icon: 'user' }
      },
      {
        path: 'msgsend',
        name: 'msgsend',
        component: _import('enterprise/msgsend'),
        meta: { title: '信息下发查询', icon: 'user' }
      },
      {
        path: 'auditbusiness',
        name: 'auditbusiness',
        component: _import('enterprise/auditbusiness'),
        meta: { title: '业务审核', icon: 'table' }
      }
    ]
  },

  {
    path: '/systemtools',
    component: Layout,
    name: 'system',
    hidden: false,
    meta: { title: '系统工具', icon: 'table' },
    children: [
      {
        path: 'tools',
        name: 'tools',
        component: _import('system/tools'),
        meta: { title: '常用工具', icon: 'table' }
      },
      {
        path: 'modifyuserinfo',
        name: 'modifyuserinfo',
        component: _import('system/modifyuserinfo'),
        meta: { title: '个人信息修改', icon: 'user' }
      },
      {
        path: 'help',
        name: 'help',
        component: _import('system/help'),
        meta: { title: '帮助', icon: 'user' }
      },
      {
        path: 'statistics',
        name: 'statistics',
        component: _import('system/statistics'),
        meta: { title: '数据统计', icon: 'table' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '示例', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: _import('table/index'),
        meta: { title: '表', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: _import('tree/index'),
        meta: { title: '树', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: _import('form/index'),
        meta: { title: '表单', icon: 'form' }
      }
    ]
  },

  {
    path: '/goodsmanage',
    component: Layout,
    meta: { title: '商品管理', icon: 'form' },
    name: '商品管理',
    children: [
      {
        path: 'publishgoods',
        name: 'publish-goods',
        component: _import('goodsmanage/publish-goods/index'),
        meta: { title: '发布商品', icon: 'form' }
      },
      {
        path: 'publishstep1',
        name: 'publishstep1',
        hidden: true,
        component: _import('goodsmanage/publish-goods/step1'),
        meta: { title: '选择类别' }
      },
      {
        path: 'publishstep2',
        name: 'publishstep2',
        hidden: true,
        component: _import('goodsmanage/publish-goods/step2'),
        meta: { title: '填写详情' }
      },
      {
        path: 'onsalegoods',
        name: 'onsale-goods',
        component: _import('goodsmanage/onsalegoods/index'),
        meta: { title: '销售中商品', icon: 'form' }
      },
      {
        path: 'noshelfgoods',
        name: 'noshelfgoods',
        component: _import('goodsmanage/noshelfgoods/index'),
        meta: { title: '未上架商品', icon: 'form' }
      },
      {
        path: 'goodsdetail',
        name: 'goodsdetail',
        component: _import('goodsmanage/goodsdetail/index'),
        meta: { title: '商品详情' },
        hidden: true
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
