import request from '@/utils/request'

export function getAllResources(params) {
  return request({
    url: '/resource/list',
    method: 'post',
    data: { 'issystem': `${params}` }
  })
}
