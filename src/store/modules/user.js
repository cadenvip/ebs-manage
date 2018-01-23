import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken, getUserId, setUserId, removeUserId } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    userid: getUserId(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
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
          setToken(data.password)
          setUserId(data.id)
          commit('SET_TOKEN', data.password)
          commit('SET_USERID', data.id)
          commit('SET_NAME', data.loginname)
          commit('SET_AVATAR', data.avatar)
          var arrRoleNames = []
          data.role.forEach(function(v) {
            arrRoleNames.push(v.rolename)
          })
          commit('SET_ROLES', arrRoleNames)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.userid).then(response => {
          const data = response.data
          commit('SET_USERID', data.id)
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.loginname)
          commit('SET_AVATAR', data.avatar)
          data.role.forEach(function(v) {
            this.roles.push(v.rolename)
          })
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          removeUserId()
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
        commit('SET_ROLES', [])
        removeToken()
        removeUserId()
        resolve()
      })
    }
  }
}

export default user
