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
  { path: '/timeout', component: _import('timeout'), hidden: true },
  { path: '/register', component: _import('register/register'), hidden: true },
  { path: '/regStepTwo', component: _import('register/regStepTwo'), hidden: true },
  { path: '/regStepThree', component: _import('register/regStepThree'), hidden: true },
  { path: '/regStepFour', component: _import('register/regStepFour'), hidden: true },

  {
    path: '/',
    component: Layout,
    name: 'Dashboard',
    redirect: '/dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index')
    }]
  },
  {
    path: '/403',
    component: Layout,
    name: '403',
    hidden: true,
    children: [{
      path: 'index',
      component: _import('403')
    }]
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
    path: '/home',
    component: Layout,
    name: 'homepage',
    children: [
      {
        path: 'ahome',
        name: '首页',
        component: _import('homepage/ahome'),
        meta: { roles: ['1'], title: '首页', icon: 'home' }
      },
      {
        path: 'bhome',
        name: '首页',
        component: _import('homepage/bhome'),
        meta: { roles: ['2', '3'], title: '首页', icon: 'home' }
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/location',
    name: 'system',
    hidden: false,
    meta: { roles: ['1'], title: '系统管理', icon: 'sysManage' },
    children: [
      {
        path: 'location',
        name: 'location',
        component: _import('location/index'),
        meta: { roles: ['1'], title: '区域管理', icon: 'region' }
      },
      {
        path: 'user/alist',
        name: 'useralist',
        component: _import('user/alist'),
        meta: { roles: ['1'], title: '人员管理', icon: 'userList' }
      },
      {
        path: 'user/aadd',
        name: 'useraadd',
        hidden: true,
        component: _import('user/aadd'),
        meta: { roles: ['1'], title: '新增人员', icon: 'user' }
      },
      {
        path: 'user/aupdate',
        name: 'useraupdate',
        hidden: true,
        component: _import('user/aupdate'),
        meta: { roles: ['1'], title: '修改人员', icon: 'user' }
      },
      {
        path: 'user/adetail',
        name: 'useradetail',
        hidden: true,
        component: _import('user/adetail'),
        meta: { roles: ['1'], title: '人员详情', icon: 'user' }
      },
      {
        path: 'user/plist',
        name: 'userplist',
        component: _import('user/plist'),
        meta: { roles: ['1'], title: '代运营管理', icon: 'proxy' }
      },
      {
        path: 'user/padd',
        name: 'userpadd',
        hidden: true,
        component: _import('user/padd'),
        meta: { roles: ['1'], title: '新增代运营人员', icon: 'proxy' }
      },
      {
        path: 'user/passociate',
        name: 'userpassociate',
        hidden: true,
        component: _import('user/passociate'),
        meta: { roles: ['1'], title: '关联商家', icon: 'proxy' }
      },
      {
        path: 'role/list',
        name: 'rolelist',
        component: _import('role/list'),
        meta: { roles: ['1'], title: '角色管理', icon: 'role' }
      },
      {
        path: 'role/add',
        name: 'roleadd',
        hidden: true,
        component: _import('role/add'),
        meta: { roles: ['1'], title: '新增角色', icon: 'role' }
      },
      {
        path: 'role/update',
        name: 'roleupdate',
        hidden: true,
        component: _import('role/update'),
        meta: { roles: ['1'], title: '修改角色', icon: 'role' }
      },
      {
        path: 'role/detail',
        name: 'roledetail',
        hidden: true,
        component: _import('role/detail'),
        meta: { roles: ['1'], title: '角色详情', icon: 'role' }
      },
      {
        path: 'permissions',
        name: 'permissions',
        component: _import('authentication/index'),
        meta: { roles: ['1'], title: '权限管理', icon: 'jurisdiction' }
      },
      {
        path: 'access/list',
        name: 'accesslist',
        component: _import('access/list'),
        meta: { roles: ['1'], title: '接入方管理', icon: 'access' }
      },
      {
        path: 'access/add',
        name: 'accessadd',
        hidden: true,
        component: _import('access/add'),
        meta: { roles: ['1'], title: '新增接入方', icon: 'access' }
      },
      {
        path: 'access/update',
        name: 'accessupdate',
        hidden: true,
        component: _import('access/update'),
        meta: { roles: ['1'], title: '修改接入方', icon: 'access' }
      },
      {
        path: 'access/detail',
        name: 'accessdetail',
        hidden: true,
        component: _import('access/detail'),
        meta: { roles: ['1'], title: '接入方详情', icon: 'access' }
      },
      {
        path: 'sensitive/list',
        name: 'sensitivelist',
        component: _import('sensitive/list'),
        meta: { roles: ['1'], title: '敏感词管理', icon: 'sensitive' }
      },
      {
        path: 'sensitive/add',
        name: 'sensitiveadd',
        hidden: true,
        component: _import('sensitive/add'),
        meta: { roles: ['1'], title: '新增敏感词', icon: 'sensitive' }
      }
    ]
  },

  {
    path: '/log',
    name: 'log',
    component: Layout,
    redirect: '/log/olog/list',
    hidden: false,
    meta: { roles: ['1'], title: '日志管理', icon: 'logManage' },
    children: [
      {
        path: 'olog/list',
        name: 'ologlist',
        component: _import('log/oLogList'),
        meta: { roles: ['1'], title: '操作日志', icon: 'olog' }
      },
      {
        path: 'olog/detail',
        name: 'ologdetail',
        hidden: true,
        component: _import('log/oLogDetail'),
        meta: { roles: ['1'], title: '操作日志详情', icon: 'olog' }
      },
      {
        path: 'ilog/list',
        name: 'iloglist',
        component: _import('log/iLogList'),
        meta: { roles: ['1'], title: '接口日志', icon: 'ilog' }
      },
      {
        path: 'ilog/detail',
        name: 'ilogdetail',
        hidden: true,
        component: _import('log/iLogDetail'),
        meta: { roles: ['1'], title: '接口日志详情', icon: 'ilog' }
      }
    ]
  },

  {
    path: '/businesses',
    component: Layout,
    redirect: '/businesses/list',
    name: 'businesses',
    hidden: false,
    meta: { roles: ['1'], title: '企业管理', icon: 'enterpriseManage' },
    children: [
      {
        path: 'list',
        name: 'businesseslist',
        component: _import('businesses/list'),
        meta: { roles: ['1'], title: '企业列表', icon: 'enterpriseList' }
      },
      {
        path: 'add',
        name: 'businessesadd',
        hidden: true,
        component: _import('businesses/add'),
        meta: { roles: ['1'], title: '新增企业', icon: 'enterpriseList' }
      },
      {
        path: 'update',
        name: 'businessesupdate',
        hidden: true,
        component: _import('businesses/update'),
        meta: { roles: ['1'], title: '修改企业', icon: 'enterpriseList' }
      },
      {
        path: 'detail',
        name: 'businessesdetail',
        hidden: true,
        component: _import('businesses/detail'),
        meta: { roles: ['1'], title: '企业详情', icon: 'enterpriseList' }
      },
      {
        path: 'auditlist',
        name: 'businessesauditlist',
        component: _import('businesses/auditlist'),
        meta: { roles: ['1'], title: '企业审核', icon: 'enterpriseAudit' }
      },
      {
        path: 'audit',
        name: 'businessesaudit',
        hidden: true,
        component: _import('businesses/audit'),
        meta: { roles: ['1'], title: '企业审核', icon: 'enterpriseAudit' }
      }
    ]
  },

  {
    path: '/finance',
    component: Layout,
    name: '财务管理',
    redirect: '/finance/list',
    meta: { roles: ['1'], title: '财务管理', icon: 'finance' },
    children: [
      {
        path: 'list',
        component: _import('finance/list'),
        name: '财务列表',
        meta: { roles: ['1'], title: '财务列表', icon: 'finance' }
      },
      {
        path: 'detail',
        hidden: true,
        component: _import('finance/detail'),
        name: '对账明细',
        meta: { roles: ['1'], title: '对账明细', icon: 'finance' }
      },
      {
        path: 'update',
        hidden: true,
        component: _import('finance/update'),
        name: '调账',
        meta: { roles: ['1'], title: '调账', icon: 'finance' }
      },
      {
        path: 'monthHistory',
        hidden: true,
        component: _import('finance/monthBillList'),
        name: '月历史账单',
        meta: { roles: ['1'], title: '月历史账单', icon: 'finance' }
      },
      {
        path: 'moreHistory',
        hidden: true,
        component: _import('finance/moreHistory'),
        name: '更多历史结算明细',
        meta: { roles: ['1'], title: '更多历史结算明细', icon: 'finance' }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    redirect: '/user/blist',
    name: '人员管理',
    meta: { roles: ['2', '3'], title: '人员管理', icon: 'userList' },
    children: [
      {
        path: 'blist',
        name: 'userblist',
        component: _import('user/blist'),
        meta: { roles: ['2', '3'], title: '人员管理', icon: 'userList' }
      },
      {
        path: 'badd',
        name: 'userbadd',
        hidden: true,
        component: _import('user/badd'),
        meta: { roles: ['2', '3'], title: '新增人员', icon: 'user' }
      },
      {
        path: 'bupdate',
        name: 'userbupdate',
        hidden: true,
        component: _import('user/bupdate'),
        meta: { roles: ['2', '3'], title: '修改人员', icon: 'user' }
      },
      {
        path: 'bdetail',
        name: 'userbdetail',
        hidden: true,
        component: _import('user/bdetail'),
        meta: { roles: ['2', '3'], title: '人员详情', icon: 'user' }
      }
    ]
  },

  {
    path: '/goodsmanage',
    component: Layout,
    meta: { roles: ['1', '2', '3'], title: '商品管理', icon: 'goodsManage' },
    name: '商品管理',
    children: [
      // 商家
      {
        path: 'publishgoods',
        name: 'publish-goods',
        component: _import('goodsmanage/publish-goods/index'),
        meta: { roles: ['2', '3'], title: '发布商品', icon: 'publish' }
      },
      {
        path: 'publishstep1',
        name: 'publishstep1',
        hidden: true,
        component: _import('goodsmanage/publish-goods/step1'),
        meta: { roles: ['1', '2', '3'], title: '选择类别' }
      },
      {
        path: 'publishstep2',
        name: 'publishstep2',
        hidden: true,
        component: _import('goodsmanage/publish-goods/step2'),
        meta: { roles: ['1', '2', '3'], title: '填写详情' }
      },
      {
        path: 'publishstep3',
        name: 'publishstep3',
        hidden: true,
        component: _import('goodsmanage/publish-goods/step3'),
        meta: { roles: ['1', '2', '3'], title: '提交入库' }
      },
      {
        path: 'publishstep4',
        name: 'publishstep4',
        hidden: true,
        component: _import('goodsmanage/publish-goods/step4'),
        meta: { roles: ['1', '2', '3'], title: 'test4' }
      },
      {
        path: 'onsalegoods',
        name: 'onsalegoods',
        component: _import('goodsmanage/onsalegoods/index'),
        meta: { roles: ['2', '3'], title: '销售中商品', icon: 'onsale' }
      },
      {
        path: 'noshelfgoods',
        name: 'noshelfgoods',
        component: _import('goodsmanage/noshelfgoods/index'),
        meta: { roles: ['2', '3'], title: '未上架商品', icon: 'offsale' }
      },
      {
        path: 'goodsdetail',
        name: 'goodsdetail',
        component: _import('goodsmanage/goodsdetail/index'),
        meta: { roles: ['2', '3'], title: '商品详情' },
        hidden: true
      },
      // 管理员
      {
        path: 'goodssearch',  // 商品搜索
        name: 'goodssearch',
        component: _import('goodsmanageAdmin/goodssearch/index'),
        meta: { roles: ['1'], title: '商品列表', icon: 'goodslist2' }
      },
      {
        path: 'updownaudit',  // 上下架
        name: 'updownaudit',
        component: _import('goodsmanageAdmin/updownaudit/index'),
        meta: { roles: ['1'], title: '商品上下架审核', icon: 'goodsAudit' }
      },
      {
        path: 'onsalemodifyaudit',  // 在售商品修改审核
        name: '在售商品修改审核列表',
        component: _import('goodsmanageAdmin/onsalemodifyaudit/index'),
        meta: { roles: ['1'], title: '在售商品修改审核', icon: 'goodsModifyAudit' }
      },
      {
        path: 'onsalemodifyaudit/auditpreview',  // 在售商品修改审核
        name: '在售商品修改审核',
        hidden: true,
        component: _import('goodsmanageAdmin/onsalemodifyaudit/audit'),
        meta: { roles: ['1'], title: '在售商品修改审核', icon: 'goodsHistoryAudit' }
      },
      {
        path: 'onsalehistoryaudit',  // 在售商品修改审核
        name: '在售商品历史审核列表',
        component: _import('goodsmanageAdmin/onsalehistoryaudit/index'),
        meta: { roles: ['1'], title: '在售商品历史审核', icon: 'goodsManage' }
      },
      {
        path: 'adgoodsmodify',  // 二次采编
        name: '二次采编',
        component: _import('goodsmanageAdmin/adgoodsmodify/index'),
        meta: { roles: ['1'], title: '商品二次采编', icon: 'goodsmodify' }
      },
      {
        path: 'preview',  // 预览
        name: 'preview',
        component: _import('goodsmanageAdmin/preview/index'),
        meta: { roles: ['1'], title: '商品预览', icon: 'goodsManage' },
        hidden: true
      }
    ]
  },

  {
    path: '/goodstypemanage',
    component: Layout,
    meta: { roles: ['1'], title: '', icon: 'goodsType' },
    name: '商品分类管理',
    children: [
      // 管理员
      {
        path: 'index',
        name: '商品分类',
        component: _import('goodstypemanage/index'),
        meta: { roles: ['1'], title: '商品分类管理', icon: 'goodsType' }
      }
    ]
  },

  {
    path: '/statement',
    component: Layout,
    name: '财务管理',
    redirect: '/statement/index',
    meta: { roles: ['2', '3'], title: '财务管理', icon: 'finance' },
    children: [
      {
        path: 'index',
        component: _import('finance/index'),
        name: '财务对账',
        meta: { roles: ['2', '3'], title: '财务对账', icon: 'finance' }
      },
      {
        path: 'thisMonthBillDetail',
        hidden: true,
        component: _import('finance/thisMonthBillDetail'),
        name: '对账交易明细',
        meta: { roles: ['2', '3'], title: '对账交易明细', icon: 'finance' }
      },
      {
        path: 'detail',
        hidden: true,
        component: _import('finance/detail'),
        name: '历史交易明细',
        meta: { roles: ['2', '3'], title: '历史交易明细', icon: 'finance' }
      }
    ]
  },

  {
    path: '/businesses',
    component: Layout,
    redirect: '/businesses/modify',
    meta: { roles: ['2', '3'], title: '信息管理', icon: 'enterpriseInfo' },
    name: '企业信息管理',
    children: [
      {
        path: 'modify',
        name: '企业信息修改',
        component: _import('businesses/modify'),
        meta: { roles: ['2', '3'], title: '信息修改', icon: 'enterpriseInfo' }
      }
    ]
  },

  {
    path: '/goodstype',
    redirect: '/goodstypemanage/index',
    component: Layout,
    hidden: true,
    meta: { roles: ['1'], title: '商品分类管理', icon: 'form' },
    name: '商品分类管理新增',
    children: [
      // 管理员
      {
        path: 'add',
        name: '新增商品分类',
        component: _import('goodstypemanage/add'),
        meta: { roles: ['1'], title: '新增商品分类', icon: 'form' }
      },
      {
        path: 'modify',
        name: '修改商品分类',
        component: _import('goodstypemanage/modify'),
        meta: { roles: ['1'], title: '修改商品分类', icon: 'form' }
      },
      {
        path: 'detail',
        name: '商品分类详情',
        component: _import('goodstypemanage/detail'),
        meta: { roles: ['1'], title: '商品分类详情', icon: 'form' }
      }
    ]
  },

  {
    path: '/order',
    component: Layout,
    name: '订单管理',
    meta: { roles: ['1', '2', '3'], title: '订单管理', icon: 'order' },
    children: [
      {
        path: 'index',
        name: '订单首页',
        component: _import('order/businessorder'),
        meta: { roles: ['2', '3'], title: '订单管理', icon: 'order' }
      },
      {
        path: 'commonquery',
        name: 'commonquery',
        component: _import('order/admin/commonorderquery'),
        meta: { roles: ['1'], title: '普通订单查询', icon: 'order' }
      },
      // {
      //   path: 'businessorder2',
      //   name: 'businessorder2',
      //   component: _import('order/businessorder2'),
      //   meta: { roles: ['2', '3'], title: '普通订单管理', icon: 'order' }
      // },
      {
        path: 'orderdetail',
        name: 'orderdetail',
        hidden: true,
        component: _import('order/orderdetail'),
        meta: { roles: ['1', '2', '3'], title: '订单详情', icon: 'order' }
      },
      {
        path: 'shipments',
        name: 'shipments',
        hidden: true,
        component: _import('order/shipments'),
        meta: { roles: ['1', '2', '3'], title: '订单发货', icon: 'order' }
      },
      {
        path: 'orderdetailB',
        name: 'orderdetailB',
        hidden: true,
        component: _import('order/orderdetailB'),
        meta: { roles: ['2', '3'], title: '订单详情', icon: 'order' }
      }
    ]
  },

  {
    path: '/trading',
    redirect: '/trading/index',
    component: Layout,
    name: '交易管理',
    meta: { roles: ['1'], title: '交易管理', icon: 'trading' },
    children: [
      {
        path: 'index',
        name: '交易查询',
        component: _import('trading/index'),
        meta: { roles: ['1'], title: '交易查询', icon: 'trading2' }
      },
      {
        path: 'requests',
        name: 'requests',
        component: _import('trading/requests'),
        meta: { roles: ['1'], title: '交易请求查询', icon: 'trading3' }
      },
      {
        path: 'detail',
        name: 'tradedetail',
        component: _import('trading/detail'),
        hidden: true,
        meta: { roles: ['1'], title: '交易详情', icon: 'trading3' }
      },
      {
        path: 'requestsdetail',
        name: 'requestsdetail',
        component: _import('trading/requestsdetail'),
        hidden: true,
        meta: { roles: ['1'], title: '交易请求详情', icon: 'trading3' }
      }
    ]
  },

  // 地址管理
  {
    path: '/addrmanage',
    redirect: '/addrmanage/index',
    component: Layout,
    name: '管理地址',
    meta: { roles: ['2', '3'], title: '管理地址', icon: 'addressManage' },
    children: [
      {
        path: 'index',
        name: '地址管理',
        component: _import('addrManage/index'),
        meta: { roles: ['2', '3'], title: '地址管理', icon: 'addressManage' }
      },
      {
        path: 'freight',
        name: '运费管理',
        component: _import('addrManage/freight'),
        meta: { roles: ['2', '3'], title: '运费管理', icon: 'freight' }
      },
      {
        path: 'freighttemp',
        hidden: true,
        name: '运费模板',
        component: _import('addrManage/freighttemplate'),
        meta: { roles: ['2', '3'], title: '运费模板', icon: 'freight' }
      },
      {
        path: 'getmyself',
        name: '自提管理',
        component: _import('addrManage/getmyself'),
        meta: { roles: ['2', '3'], title: '自提管理', icon: 'selflifting' }
      }
    ]
  },

  // 短信管理
  {
    path: '/smsmanage',
    redirect: '/smsmanage/index',
    component: Layout,
    name: '短信管理',
    meta: { roles: ['2', '3'], title: '短信管理', icon: 'sms' },
    children: [
      {
        path: 'index',
        name: '短信管理2',
        component: _import('smsmanage/index'),
        meta: { roles: ['2', '3'], title: '短信管理', icon: 'sms' }
      }
    ]
  },

  // {
  //   path: '/permission',
  //   component: Layout,
  //   name: '权限测试',
  //   meta: { roles: ['1'], title: '权限测试', icon: 'jurisdiction' }, // 页面需要的权限
  //   children: [
  //     {
  //       path: 'index',
  //       component: _import('tree/index'),
  //       name: '权限测试页',
  //       meta: { roles: ['1'], title: '权限测试', icon: 'jurisdiction' }  // 页面需要的权限
  //     }]
  // },
  { path: '*', redirect: '/404', hidden: true }
]
