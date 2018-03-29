import request from '@/utils/request'
import { encryptPassword } from '@/utils/index'

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

export function addUser(params) {
  return request({
    url: '/user/save',
    method: 'post',
    data: params
  })
}

export function updateUser(params) {
  return request({
    url: '/user/update',
    method: 'post',
    data: params
  })
}

export function resetUserPassword(params) {
  return request({
    url: '/user/update',
    method: 'post',
    data: { 'id': `${params.id}`, 'password': encryptPassword('123456') }
  })
}

export function lockUser(params, locked) {
  return request({
    url: '/user/update',
    method: 'post',
    data: { 'id': `${params.id}`, 'locked': `${locked}` }
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

export function getBusinessAllUsers(currentpage, pagesize) {
  return request({
    url: '/businesses/listuser',
    method: 'post',
    data: { 'page': `${currentpage}`,
      'limit': `${pagesize}` }
  })
}

export function getBusinessUserList(userinfo, currentpage, pagesize) {
  return request({
    url: '/businesses/listuser',
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

export function addBusinessUser(params) {
  return request({
    url: '/businesses/adduser',
    method: 'post',
    data: params
  })
}

export function getBusinessUserDetail(params) {
  return request({
    url: '/businesses/userdetail',
    method: 'post',
    data: { 'userid': `${params}` }
  })
}

export function updateBusinessUser(params) {
  return request({
    url: '/businesses/updateuser',
    method: 'post',
    data: params
  })
}

export function resetBusinessUserPassword(params) {
  return request({
    url: '/businesses/updateuser',
    method: 'post',
    data: { 'id': `${params.id}`, 'password': encryptPassword('123456') }
  })
}
