import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const Userid = 'User-Id'
// const RoleType = 'Role-Type'
const JSessionId = 'JSESSIONID'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(Userid)
}

export function setUserId(userid) {
  return Cookies.set(Userid, userid)
}

export function removeUserId() {
  return Cookies.remove(Userid)
}

// export function getRoleType() {
//   if (Cookies.get(RoleType) !== undefined) {
//     return Cookies.get(RoleType).split(',')
//   } else {
//     return []
//   }
// }

// export function setRoleType(roletype) {
//   return Cookies.set(RoleType, roletype)
// }

// export function removeRoleType() {
//   return Cookies.remove(RoleType)
// }
export function getSessionid() {
  return Cookies.get(JSessionId)
}

export function setSessionid(sessionid) {
  return Cookies.set(JSessionId, sessionid)
}

export function removeSessionid() {
  return Cookies.remove(JSessionId)
}
