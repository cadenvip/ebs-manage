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

export function getInfo(token) {
  return request({
    url: '/user/detail',
    method: 'get',
    params: { token }
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
    data: { 'loginname': params }
  })
}

export function getUnitInfos(params) {
  return request({
    url: '/sreachunit',
    method: 'post',
    data: { 'loginname': params }
  })
}
