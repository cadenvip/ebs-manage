import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const Userid = 'User-Id'

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
