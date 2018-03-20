import { asyncRouterMap, constantRouterMap } from '@/router'


// function deepClone(obj) {
//   var _toString = Object.prototype.toString
//   // null, undefined, non-object, function
//   if (!obj || typeof obj !== 'object') {
//     return obj
//   }
//   // DOM Node
//   if (obj.nodeType && 'cloneNode' in obj) {
//     return obj.cloneNode(true)
//   }
//   // Date
//   if (_toString.call(obj) === '[object Date]') {
//     return new Date(obj.getTime())
//   }
//   // RegExp
//   if (_toString.call(obj) === '[object RegExp]') {
//     var flags = []
//     if (obj.global) { flags.push('g') }
//     if (obj.multiline) { flags.push('m') }
//     if (obj.ignoreCase) { flags.push('i') }
//     return new RegExp(obj.source, flags.join(''))
//   }
//   var result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {}
//   for (var key in obj) {
//     result[key] = deepClone(obj[key])
//   }
//   return result
// }

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)// js some函数 返回true or false
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter (asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        var accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        commit('SET_ROUTERS', accessedRouters)
        // commit('SET_ROUTERS', deepClone(accessedRouters))
        resolve()
      })
    }
  }
}

export default permission
