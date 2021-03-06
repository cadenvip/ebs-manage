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
// 商品导出
export function goodsExport (params) {
  return request({
    url: '/goods/export',
    method: 'get',
    params: params
  })
}
// 订单详情
export function orderDetail (oid) {
  return request({
    url: '/order/getOrder/' + oid,
    method: 'get'
  })
}
// 快递公司
export function getCompanies (params) {
  return request({
    url: '/logistic/company',
    method: 'get',
    params: params
  })
}
// 订单发货
export function sendGoods (id, params) {
  return request({
    url: '/order/sendGoods/' + id,
    method: 'post',
    data: params
  })
}
// 用户拒收
export function orderRefuse (oid) {
  return request({
    url: '/order/rejectGoods/' + oid,
    method: 'post'
  })
}
