import request from '@/utils/request'

export function getOnSaleGoods (params) {
  return request({
    url: '/goods/page',
    method: 'get',
    params: params
  })
}
