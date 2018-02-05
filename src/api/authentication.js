import request from '@/utils/request'

export function getAllResources(params) {
  return request({
    url: '/resource/list',
    method: 'post',
    data: { 'issystem': `${params}` }
  })
}

export function givePermission(params) {
  console.log(params)
  return request({
    url: '/resource/setStatus',
    method: 'post',
    data: { 'updateList': params }
  })
}

