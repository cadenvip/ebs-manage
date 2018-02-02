import request from '@/utils/request'

// 谨记：axios get请求传参数时用params   post请求用data
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

export function getGoodsTopType () {
  return request({
    url: '/category/top',
    method: 'get'
  })
}

export function checkGoodsType (params) {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    url: '/goods/stepTwo',
    method: 'post',
    data: params
  })
}
// 检查支付方式
export function checkPayWay (params) {
  console.log(params)
  return request({
    url: '/enterprise/payAccount/check',
    method: 'post',
    data: params
  })
}
// 发布商品
export function goodsRelease (params) {
  return request({
    url: '/goods/save',
    method: 'post',
    data: params
  })
}
// 获取物流模板
export function getLogisticsTemplate () {
  return request({
    url: '/logistic/delivery/template/list/simple',
    method: 'get'
  })
}
