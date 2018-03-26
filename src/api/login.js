import request from '@/utils/request'

// test branch ss
export function login(params) {
  console.log(params)
  return request({
    url: '/login',
    method: 'post',
    data: {
      'loginname': params.loginname,
      'password': params.password,
      'unitid': params.unitid,
      'vercode': '123456'
    }
  })
}

export function getInfo(userid) {
  return request({
    url: '/user/detail',
    method: 'post',
    data: { 'userid': userid }
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

export function getVercode(params) {
  return request({
    url: '/vercode',
    method: 'post',
    data: { 'loginname': `${params}` }
  })
}

export function getUnitInfos(params) {
  return request({
    url: '/sreachunit',
    method: 'post',
    data: { 'loginname': `${params}` }
  })
}

export function getUnits() {
  return request({
    url: '/goods/unit/list',
    method: 'get'
  })
}
