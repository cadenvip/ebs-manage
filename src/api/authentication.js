import request from '@/utils/request'

export function getAllPermissions(params) {
  return request({
    url: '/resource/list',
    method: 'post',
    data: { }
  })
}
