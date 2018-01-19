import request from '@/utils/request'

export function checkSeller () {
  return request({
    url: '/goods/stepOne',
    method: 'post'
  })
}

export function getGoodsType () {
  return request({
    url: '/category/list',
    method: 'get'
  })
}
