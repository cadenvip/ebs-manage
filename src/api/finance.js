// http://localhost:8080/ebs/statement/thismonthsummary //本月账单摘要
// {
// 	"unitid":"29"
// }

// http://localhost:8080/ebs/statement/historysummary //历时月账单摘要
// {
// 	"unitid":"29"
// }

// http://localhost:8080/ebs/statement/thismonthbill  //本月账单
// {
// 	"unitid":"29"
// }

// http://localhost:8080/ebs/statement/thismonthdetail
// {
// 	"billid":"2988"  //通过接口thismonthbill 得到
// }

// http://localhost:8080/ebs/statement/accountingdispute  //添加核账争议，需要先登录，且登录人员所属企业必须和账单对应企业相同
// {
// 	"billid":"2988",
// 	"content":"该账单存在争议"
// }


// http://localhost:8080/ebs/statement/admindealbill //管理员结账，必须先登录，且必须是移动管理员或者是超管
// {
// 	"billid":"2988"
// }

// http://localhost:8080/ebs/statement/export?billid=2988 //导出Excel明细


import request from '@/utils/request'

export function getAllBills(currentpage, pagesize) {
  return request({
    url: '/statement/totalbillList',
    method: 'post',
    data: { 'page': `${currentpage}`,
      'limit': `${pagesize}` }
  })
}

export function getBillList(params, currentpage, pagesize) {
  return request({
    url: '/statement/totalbillList',
    method: 'post',
    data: {
      'merchantname': `${params.merchantname}`,
      'yearmonth': `${params.yearmonth}`,
      'status': `${params.status}`,
      'locationcode': `${params.locationcode}`,
      'greater500': `${params.greater500}`,
      'page': `${currentpage}`,
      'limit': `${pagesize}`
    }
  })
}

export function downloadBillList(params) {
  return request({
    url: '/statement/exportTotalBill ',
    method: 'post'
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

export function getThisMonthDetail(params) {
  return request({
    url: '/statement/thismonthdetail',
    method: 'post',
    data: params
  })
}

export function downloadThisMonthDetail(params) {
  return request({
    url: '/statement/export?billid=' + `${params}`,
    method: 'post'
  })
}
