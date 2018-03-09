import request from '@/utils/request'

// 保存地址
export function saveAddr (params) {
  return request({
    url: '/address/save',
    method: 'post',
    data: params
  })
}
export function getAddr () {
  return request({
    url: '/address/allList',
    method: 'get'
  })
}

export function getAddrDetail (params) {
  return request({
    url: '/address/get/' + params,
    method: 'get'
  })
}

export function deleteAddr (params) {
  return request({
    url: '/address/delete/' + params,
    method: 'post'
  })
}

// 保存运费模板
export function saveTemplate (params) {
  return request({
    url: '/logistic/delivery/template/save',
    method: 'post',
    data: params
  })
}
// 获取物流模板列表
export function getTemplateList () {
  return request({
    url: '/logistic/delivery/template/list',
    method: 'get'
  })
}
// 删除物流模板
export function deleteTemplate (id) {
  return request({
    url: '/logistic/delivery/template/delete/' + id,
    method: 'post'
  })
}
// 获取物流详情
export function getTemplateDetail (id) {
  return request({
    url: '/logistic/delivery/template/get/' + id,
    method: 'get'
  })
}
// 新增自提
export function saveGetMyself (params) {
  return request({
    url: '/pickup/save',
    method: 'post',
    data: params
  })
}
// 获取自提列表
export function getGetMyselfList () {
  return request({
    url: '/pickup/allList',
    method: 'get'
  })
}
// 自提搜索
export function getGetMyselfByName (params) {
  return request({
    url: '/pickup/allList',
    method: 'get',
    params: params
  })
}
// 删除自提
export function deleteGetMyself (id) {
  return request({
    url: '/pickup/delete/' + id,
    method: 'post'
  })
}
// 自提详情
export function getGetMyselfListDetail (id) {
  return request({
    url: '/pickup/get/' + id,
    method: 'get'
  })
}
