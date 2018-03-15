import request from '@/utils/request'

export function getOnSaleGoods (params) {
  return request({
    url: '/goods/page',
    method: 'get',
    params: params
  })
}

export function saleOff (params) {  // 下架商品
  return request({
    url: '/goods/down',
    method: 'post',
    data: params
  })
}

export function modifyStock (params) {  // 修改库存
  return request({
    url: '/goods/stock',
    method: 'post',
    data: params
  })
}
// 放弃修改
export function giveUp (id) {
  return request({
    url: '/goods/giveup/' + id,
    method: 'post'
  })
}
