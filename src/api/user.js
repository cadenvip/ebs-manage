import request from '@/utils/request'

export function getAllUsers(currentpage, pagesize) {
  return request({
    url: '/user/list',
    method: 'post',
    data: { 'page': currentpage,
      'limit': pagesize }
  })
}

export function getUserList(userinfo, currentpage, pagesize) {
  return request({
    url: '/user/list',
    method: 'post',
    data: { 'loginname': userinfo.loginname,
      'name': userinfo.name,
      'phoneno': userinfo.phoneno,
      'locationid': userinfo.locationid,
      'page': currentpage,
      'limit': pagesize
    }
  })
}

export function addUser(params) {
  return request({
    url: '/user/save',
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
