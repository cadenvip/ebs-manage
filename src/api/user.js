import request from '@/utils/request'

export function getUserList(params) {
  return request({
    url: '/user/list',
    method: 'post',
    params
  })
}

export function updateUser(params) {
  return request({
    url: '/user/form',
    method: 'post',
    params
  })
}
