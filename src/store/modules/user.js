import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getUserId, setUserId, removeUserId, getSessionid, setSessionid, removeSessionid } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    sessionid: getSessionid(),
    userid: getUserId(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SESSIONID: (state, sessionid) => {
      state.sessionid = sessionid
    },
    SET_USERID: (state, userid) => {
      state.token = userid
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          // 此处将用户加密后的密码作为token
          const data = response.data
          console.log(data)
          setToken(data.password)
          setSessionid(data.sessionid)
          setUserId(data.id)
          commit('SET_TOKEN', data.password)
          commit('SET_SESSIONID', data.sessionid)
          commit('SET_USERID', data.id)
          commit('SET_NAME', data.loginname)
          commit('SET_AVATAR', data.avatar)
          var roles = []
          data.role.forEach(function(v) {
            roles.push(v.roletype)
          })
          // setRoleType(roles.join(','))
          // commit('SET_ROLES', roles)
          window.sessionStorage.setItem('userInfo', JSON.stringify(data))
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        var userInfo = window.sessionStorage.getItem('userInfo')
        if (userInfo !== undefined && userInfo !== '') {
          userInfo = JSON.parse(userInfo)
          var roles = []
          userInfo.role.forEach(function(v) {
            roles.push(v.roletype)
          })
          commit('SET_ROLES', roles)
          resolve(userInfo)
        } else {
          getInfo(state.userid).then(response => {
            const data = response.data
            commit('SET_USERID', data.id)
            commit('SET_NAME', data.loginname)
            commit('SET_AVATAR', data.avatar)
            var roles = []
            data.role.forEach(function(v) {
              roles.push(v.roletype)
            })
            // setRoleType(roles.join(','))
            commit('SET_ROLES', roles)
            window.sessionStorage.setItem('userInfo', JSON.stringify(data))
            resolve(response)
          }).catch(error => {
            reject(error)
          })
        }
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          console.log('登出成功！')
          commit('SET_TOKEN', '')
          commit('SET_SESSIONID', '')
          commit('SET_ROLES', [])
          commit('SET_USERID', '')
          removeToken()
          removeSessionid()
          removeUserId()
          window.sessionStorage.removeItem('userInfo')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_SESSIONID', '')
        commit('SET_ROLES', [])
        commit('SET_USERID', '')
        removeToken()
        removeUserId()
        window.sessionStorage.removeItem('userInfo')
        resolve()
      })
    }
  }
}

export default user
