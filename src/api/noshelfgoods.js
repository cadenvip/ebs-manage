import request from '@/utils/request'

// 未上架商品页码 获取未上架商品
// searchType: 1-在售商品 2-待上架商品 3-缺货商品 4-上下架待审核商品
export function getNoShelfGoods (params) {
  return request({
    url: '/goods/page',
    method: 'get',
    params: params
  })
}

// 上架商品
export function upGoods (params) {
  return request({
    url: '/goods/up',
    method: 'post',
    data: params
  })
}
