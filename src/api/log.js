import request from '@/utils/request'

export function getAllILogs(currentpage, pagesize) {
  return request({
    url: '/log/listlog',
    method: 'post',
    data: { 'month_day': '', 	// 月份日期，字符串
      'reqservice': '',	// 请求服务名
      'reqaction': '',	// 请求消息标志，取值为函数名
      'reqseq': '',	// 请求流水（由请求方生成）
      'reqcode': '',	// 请求方编码
      'reqmessage': '', // 请求消息报文
      'page': `${currentpage}`,
      'limit': `${pagesize}`
    }
  })
}

export function getReqactionList() {
  return request({
    url: '/log/getreqactionList',
    method: 'post'
  })
}

export function getILogList(params, currentpage, pagesize) {
  return request({
    url: '/log/listlog',
    method: 'post',
    data: { 'month_day': `${params.month_day}`, 	// 月份日期，字符串
      'reqservice': `${params.reqservice}`,	// 请求服务名
      'reqaction': `${params.reqaction}`,	// 请求消息标志，取值为函数名
      'reqseq': `${params.reqseq}`,	// 请求流水（由请求方生成）
      'reqcode': `${params.reqcode}`,	// 请求方编码
      'reqmessage': `${params.reqmessage}`, // 请求消息报文
      'page': `${currentpage}`,
      'limit': `${pagesize}`
    }
  })
}

export function getILogDetail(params) {
  return request({
    url: '/log/detail',
    method: 'post',
    data: { 'id': `${params}` }
  })
}

export function getAllOLogs(params) {
  return request({
    url: '/log/operation/page',
    method: 'get',
    params: params
  })
}

export function getModuleList(params) {
  return request({
    url: '/log/operation/module',
    method: 'get',
    params: params
  })
}

export function getOperTypeList(params) {
  return request({
    url: '/log/operation/operType',
    method: 'get',
    params: params
  })
}

export function getOLogList(params) {
  return request({
    url: '/log/operation/page',
    method: 'get',
    params: params
  })
}

export function getOLogDetail(params) {
  return request({
    url: '/log/operation/get/' + params,
    method: 'get'
  })
}
