import request from '@/utils/request'

export function getAllUsers() {
  return request({
    url: '/user/list',
    method: 'post',
    data: {}
  })
}

export function getUserList(params) {
  return request({
    url: '/user/list',
    method: 'post',
    data: { 'loginname': params.loginname,
      'name': params.name,
      'phoneno': params.phoneno,
      'locationid': params.locationid
    }
  })
}

export function addUser(params) {
  return request({
    url: '/user/update',
    method: 'post',
    data: { 'loginname': params.id,
      'password': params.password,
      'name': params.name,
      'email': params.email,
      'phoneno': params.phoneno,
      'address': params.address
    }
  })
}

export function updateUser(params) {
  return request({
    url: '/user/update',
    method: 'post',
    data: { 'id': params.id,
      'password': params.password,
      'name': params.name,
      'email': params.email,
      'address': params.address
    }
  })
}

export function resetUserPassword(params) {
  return request({
    url: '/user/update',
    method: 'post',
    data: { 'id': params.id, 'password': '' }
  })
}

export function getUserDetail(params) {
  return request({
    url: '/user/detail',
    method: 'post',
    data: { 'userid': params }
  })
}
