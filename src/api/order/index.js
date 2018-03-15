import request from '@/utils/request'

// 获取订单列表
export function getOrderList (params) {
  return request({
    url: '/order/page',
    method: 'get',
    params: params
  })
}
// 物流详情
export function getDeleveryDetail (params) {
  return request({
    url: '/order/delevery',
    method: 'get',
    params: params
  })
}
// 订单导出
export function orderExport (params) {
  return request({
    url: '/order/export',
    method: 'get',
    params: params
  })
}
