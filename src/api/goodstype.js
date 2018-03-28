import request from '@/utils/request'

// 谨记：axios get请求传参数时用params   post请求用data
export function goodsTypeSave (params) {
  return request({
    url: '/category/save',
    method: 'post',
    data: params
  })
}

export function getCategoryDetail (id) {
  return request({
    url: '/category/get/' + id,
    method: 'get'
  })
}
// 商品分类删除
export function CategoryDelete (id) {
  return request({
    url: 'category/delete/' + id,
    method: 'post'
  })
}
