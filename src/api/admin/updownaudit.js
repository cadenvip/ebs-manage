import request from '@/utils/request'

export function getSearches (params) {
  return request({
    url: '/goods/page',
    method: 'get',
    params: params
  })
}

export function upDownAudit (params) {
  return request({
    url: '/goods/upOrDown/audit',
    method: 'post',
    data: params
  })
}
export function getTemplate (id) {
  return request({
    url: 'logistic/delivery/template/get/' + id,
    method: 'get'
  })
}
