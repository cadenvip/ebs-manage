import request from '@/utils/request'

export function getTradeList (params) {
  return request({
    url: '/onlineTrade/list',
    method: 'post',
    data: params
  })
}
export function getTradeDetail (id) {
  return request({
    url: '/onlineTrade/get/' + id,
    method: 'post',
    data: {}
  })
}
export function getRequestList (params) {
  return request({
    url: '/onlineRequest/list',
    method: 'post',
    data: params
  })
}
export function getRequestDetail (id) {
  return request({
    url: '/onlineRequest/get/' + id,
    method: 'post',
    data: {}
  })
}
