import {
  login,
  logout,
  getInfo
} from '@/api/login'
import {
  getToken,
  setToken,
  removeToken,
  getUserId,
  setUserId,
  removeUserId,
  getSessionid,
  setSessionid,
  removeSessionid,
  setRoleType,
  removeRoleType
} from '@/utils/auth'
import {
  Message
} from 'element-ui'

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
    Login({
      commit
    }, loginInfo) {
      return new Promise((resolve, reject) => {
        login(loginInfo).then(response => {
          if (response.status === 200) {
            // 此处将用户加密后的密码作为token
            const data = response.data
            setToken(data.password)
            setSessionid(data.sessionid)
            setUserId(data.id)
            commit('SET_TOKEN', data.password)
            commit('SET_SESSIONID', data.sessionid)
            commit('SET_USERID', data.id)
            commit('SET_NAME', data.loginname)
            commit('SET_AVATAR', data.avatar)
            var roles = []
            data.role.forEach(function (v) {
              roles.push(v.roletype)
            })
            setRoleType(roles[0])
            // commit('SET_ROLES', roles)
            window.sessionStorage.setItem('userInfo', JSON.stringify(data))
            resolve(response)
          } else {
            Message.error(response.msg)
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        var userInfo = window.sessionStorage.getItem('userInfo')
        if (userInfo !== undefined && userInfo !== '') {
          userInfo = JSON.parse(userInfo)
          var roles = []
          userInfo.role.forEach(function (v) {
            roles.push(v.roletype)
          })
          commit('SET_ROLES', roles)
          resolve(userInfo)
        } else {
          getInfo(state.userid).then(response => {
            if (response.status === 200) {
              const data = response.data
              commit('SET_USERID', data.id)
              commit('SET_NAME', data.loginname)
              commit('SET_AVATAR', data.avatar)
              var roles = []
              data.role.forEach(function (v) {
                roles.push(v.roletype)
              })
              setRoleType(roles[0])
              commit('SET_ROLES', roles)
              window.sessionStorage.setItem('userInfo', JSON.stringify(data))
              resolve(response)
            } else {
              this.$message.error(response.msg)
            }
          }).catch(error => {
            reject(error)
          })
        }
      })
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(response => {
          commit('SET_TOKEN', '')
          commit('SET_SESSIONID', '')
          commit('SET_ROLES', [])
          commit('SET_USERID', '')
          commit('SET_NAME', '')
          commit('SET_AVATAR', '')
          removeToken()
          removeSessionid()
          removeUserId()
          removeRoleType()
          window.sessionStorage.removeItem('userInfo')
          if (response.status === 200) {
            resolve(response)
          } else {
            this.$message.error(response.msg)
            resolve(response)
          }
        }).catch(error => {
          commit('SET_TOKEN', '')
          commit('SET_SESSIONID', '')
          commit('SET_ROLES', [])
          commit('SET_USERID', '')
          commit('SET_NAME', '')
          commit('SET_AVATAR', '')
          removeToken()
          removeSessionid()
          removeUserId()
          removeRoleType()
          window.sessionStorage.removeItem('userInfo')
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_SESSIONID', '')
        commit('SET_ROLES', [])
        commit('SET_USERID', '')
        commit('SET_NAME', '')
        commit('SET_AVATAR', '')
        removeToken()
        removeSessionid()
        removeUserId()
        removeRoleType()
        window.sessionStorage.removeItem('userInfo')
        resolve()
      })
    }
  }
}

export default user
