import request from '@/utils/request'

// test branch ss
export function login(params) {
  return request({
    url: '/login',
    method: 'post',
    data: params
  })
}

export function getInfo(userid) {
  return request({
    url: '/user/detail',
    method: 'post',
    data: {
      'userid': userid
    }
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
    data: params
  })
}

export function getUnitInfos(params) {
  return request({
    url: '/sreachunit',
    method: 'post',
    data: {
      'loginname': `${params}`
    }
  })
}

export function getUnits() {
  return request({
    url: '/goods/unit/list',
    method: 'get'
  })
}
