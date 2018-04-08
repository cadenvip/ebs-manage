import request from '@/utils/request'

// 获取本年度所有账单（不分页）
export function getThisYearAllBill() {
  return request({
    url: '/statement/getAllBill',
    method: 'post'
  })
}

// 获取非本年度所有账单（不分页）
// 不传参（管理员）
// 传参（商家unitid）
export function getHistoryBillsList(params) {
  return request({
    url: '/statement/morehistorybill',
    method: 'post',
    data: params
  })
}

export function getAllBills(currentpage, pagesize) {
  return request({
    url: '/statement/totalbillList',
    method: 'post',
    data: {
      'merchantname': '',
      'yearmonth': '',
      'status': '',
      'locationcode': '',
      'greater500': '1',
      'page': `${currentpage !== undefined ? currentpage : 1}`,
      'limit': `${pagesize !== undefined ? pagesize : 10}`
    }
  })
}

export function getBillList(params, currentpage, pagesize) {
  return request({
    url: '/statement/totalbillList',
    method: 'post',
    data: {
      'merchantname': `${params.merchantname}`,
      'yearmonth': `${params.yearmonth !== null ? params.yearmonth : ''}`,
      'status': `${params.status}`,
      'locationcode': `${params.locationcode}`,
      'greater500': `${params.greater500 !== true ? '1' : '0'}`,
      'page': `${currentpage}`,
      'limit': `${pagesize}`
    }
  })
}

export function getBillDetail(params) {
  return request({
    url: '/statement/billdetail',
    method: 'post',
    data: params
  })
}

export function downloadBillList(params) {
  if (params !== undefined) {
    // 下载月份表
    return request({
      url: '/statement/exportTotalBill',
      method: 'get',
      params: params
    })
  } else {
    // 下载总表
    return request({
      url: '/statement/exportTotalBill',
      method: 'get'
    })
  }
}

export function downloadBill(bill, thisyear) {
  var params = {
    'billid': `${bill.id}`,
    'thisyear': `${thisyear}`
  }
  return request({
    url: '/statement/export',
    method: 'get',
    params: params
  })
}

export function getThisMonthSummary(params) {
  return request({
    url: '/statement/thismonthsummary',
    method: 'post',
    data: params
  })
}

export function getHistorySummary(params) {
  return request({
    url: '/statement/historysummary',
    method: 'post',
    data: params
  })
}

export function getThisMonthBill(params) {
  return request({
    url: '/statement/thismonthbill',
    method: 'post',
    data: params
  })
}

export function getHistoryBill(params) {
  return request({
    url: '/statement/historymonthbill',
    method: 'post',
    data: params
  })
}

export function submitDispute(params) {
  return request({
    url: '/statement/accountingdispute',
    method: 'post',
    data: params
  })
}

// 管理员结账
export function adminDealBill(params) {
  return request({
    url: '/statement/admindealbill',
    method: 'post',
    data: params
  })
}

// 管理员清账
export function adminClearBill(params) {
  return request({
    url: '/statement/adminclaerbill',
    method: 'post',
    data: params
  })
}

// 管理员调账
export function adjustBill(params) {
  return request({
    url: '/statement/adminchangebill',
    method: 'post',
    data: params
  })
}

// 商家结账
export function businessDealBill(params) {
  return request({
    url: '/statement/busdealbill',
    method: 'post',
    data: params
  })
}

// http://183.230.101.142:58080/ebs/order/page?merchantId=29
export function queryOrderList(params) {
  return request({
    url: '/order/page',
    method: 'get',
    params: params
  })
}

// http://localhost:8080/ebs/statement/getdetaillist //通过订单列表获取详情
// {
//   "ordercodeList": ["1000049981","1000049909","1000050009","1000049968"]
// }
export function getDetailList(params) {
  return request({
    url: '/statement/getdetaillist',
    method: 'post',
    data: params
  })
}

// 获取更多账单月份列表
export function getHisBillYearmonthList() {
  return request({
    url: '/statement/getHisBillYearmonthList',
    method: 'post'
  })
}

// 管理员获取更多历时月账单列表
export function adminGetMoreHisBillByYearmonth(params) {
  return request({
    url: '/statement/adminGetMoreHisBillByYearmonth',
    method: 'post',
    data: params
  })
}
