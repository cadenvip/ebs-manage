import request from '@/utils/request'

export function getApply (params) {
  return request({
    url: '/goods/apply/page',
    method: 'get',
    params: params
  })
}
// 在售商品历史审核
export function getHistoryApply (params) {
  return request({
    url: '/goods/apply/history/page',
    method: 'get',
    params: params
  })
}
// 获取商家列表
export function getBusiness (params) {
  return request({
    url: '/businesses/listbusinesses',
    method: 'post',
    data: params
  })
}
// 修改审批
export function audit (params) {
  return request({
    url: '/goods/apply/audit',
    method: 'post',
    data: params
  })
}
// 商品详情
export function getGoodsDetail (id) {
  return request({
    url: '/goods/get/' + id,
    method: 'get'
  })
}

// export function getTemplate (id) {
//   return request({
//     url: 'logistic/delivery/template/get/' + id,
//     method: 'get'
//   })
// }
