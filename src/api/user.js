import request from '@/utils/request'

export function getAllUsers(currentpage, pagesize) {
  return request({
    url: '/user/list',
    method: 'post',
    data: { 'page': `${currentpage}`,
      'limit': `${pagesize}` }
  })
}

export function getUserList(userinfo, currentpage, pagesize) {
  return request({
    url: '/user/list',
    method: 'post',
    data: { 'loginname': `${userinfo.loginname}`,
      'name': `${userinfo.name}`,
      'phoneno': `${userinfo.phoneno}`,
      'locationid': `${userinfo.locationid}`,
      'page': `${currentpage}`,
      'limit': `${pagesize}`
    }
  })
}
/*
{
    "address":"",
    "email":"",
    "locationid":"2606820000",
    "loginname":"15800000001",
    "phoneno":"15800000001",
    "name":"bbbb",
    "password":"123456",
    "roleids":"1",
}
*/
export function addUser(params) {
  console.log(params)
  return request({
    url: '/user/save',
    method: 'post',
    data: { 'loginname': `${params.loginname}`,
      'password': `${params.password}`,
      'name': `${params.name}`,
      'phoneno': `${params.loginname}`,
      'locationid': `${params.locationid}`,
      'email': `${params.email}`,
      'address': `${params.address}`,
      'roleids': `${params.roleids}`
    }
  })
}

export function updateUser(params) {
  return request({
    url: '/user/update',
    method: 'post',
    data: { 'id': `${params.id}`,
      'password': `${params.password}`,
      'name': `${params.name}`,
      'email': `${params.email}`,
      'address': `${params.address}`
    }
  })
}

export function resetUserPassword(params) {
  return request({
    url: '/user/update',
    method: 'post',
    data: { 'id': `${params.id}`, 'password': '123456' }
  })
}

export function getUserDetail(params) {
  return request({
    url: '/user/detail',
    method: 'post',
    data: { 'userid': `${params}` }
  })
}

// 修改密码
export function modifyPassword(params) {
  return request({
    url: '/user/modifyPassword',
    method: 'post',
    data: params
  })
}
