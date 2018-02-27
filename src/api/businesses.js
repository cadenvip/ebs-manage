import request from '@/utils/request'

export function getAllBusinesses(currentpage, pagesize) {
  return request({
    url: '/businesses/listbusinesses',
    method: 'post',
    data: {
      'businessesName': '',
      'state': '',
      'createsource': '',
      'locationCode': '0', // 默认中国
      'page': currentpage,
      'limit': pagesize
    }
  })
}

export function getBusinessesList(businessesInfo, currentpage, pagesize) {
  debugger
  return request({
    url: '/businesses/listbusinesses',
    method: 'post',
    data: { 'businessesName': `${businessesInfo.businessesName}`,
      'state': `${businessesInfo.state}`,
      'createsource': `${businessesInfo.createsource !== undefined ? businessesInfo.createsource : ''}`,
      'locationCode': `${businessesInfo.locationCode !== '' ? businessesInfo.locationCode : 0}`,
      'page': `${currentpage}`,
      'limit': `${pagesize}`
    }
  })
}

export function addBusinesses(params) {
  return request({
    url: '/businesses/save',
    method: 'post',
    data: {}
  })
}

export function updateBusinesses(params, roletype) {
  if (roletype === 2) {
    return request({
      url: '/businesses/updatebusinesses', // 商家自己修改
      method: 'post',
      data: {}
    })
  } else {
    return request({
      url: '/register/BusinessesUpdate', // 管理员修改
      method: 'post',
      data: {}
    })
  }
}

export function deleteBusinesses(params) {
  return request({
    url: '/businesses/deletebus/' + `${params}`,
    method: 'post'
    // data: { 'id': `${params}` }
  })
}

export function getBusinessesDetail(params) {
  return request({
    url: '/businesses/businessesdetail',
    method: 'post',
    data: { 'unitid': `${params}` }
  })
}

export function auditBusinesses(params) {
  return request({
    url: '/businesses/businessesaudit',
    method: 'post',
    data: { 'businessesid': `${params.businessesid}`,
      'state': `${params.state}`,
      'reason': `${params.reason}`
    }
  })
}
