import request from '@/utils/request'

// 管理员
// 获取本年度所有账单（不分页）
export function getThisYearAllBill() {
  return request({
    url: '/statement/getAllBill',
    method: 'post'
  })
}

// 获取非本年度所有账单（不分页）
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
    data: { 'page': `${currentpage !== undefined ? currentpage : 1}`,
      'limit': `${pagesize !== undefined ? pagesize : 10}` }
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
  return request({
    url: '/statement/exportTotalBill',
    method: 'get'
  })
}

export function downloadBill(bill, thisyear) {
  var params = { 'billid': `${bill.id}`,
    'thisyear': `${thisyear}`
  }
  return request({
    url: '/statement/export',
    method: 'get',
    params: params
  })
}

// 商家
// 本月概况
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
