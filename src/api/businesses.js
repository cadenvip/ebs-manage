import request from '@/utils/request'

export function getAllBusinesses(currentpage, pagesize) {
  return request({
    url: '/businesses/listbusinesses',
    method: 'post',
    data: {
      'businessesName': '',
      'state': '',
      'createsource': '',
      'locationCode': '',
      'page': `${currentpage}`,
      'limit': `${pagesize}`
    }
  })
}

export function getBusinessesList(businessesInfo, currentpage, pagesize) {
  return request({
    url: '/businesses/listbusinesses',
    method: 'post',
    data: { 'businessesName': `${businessesInfo.businessesName}`,
      'state': `${businessesInfo.state}`,
      'createsource': `${businessesInfo.createsource}`,
      'locationCode': `${businessesInfo.locationCode}`,
      'page': `${currentpage}`,
      'limit': `${pagesize}`
    }
  })
}

export function addBusinesses(params) {
  return request({
    url: '/businesses/save',
    method: 'post',
    data: { 'businessesname': `${params.businessesname}`,
      'businessestype': `${params.businessestype}`,
      'description': `${params.description}`,
      'resourceids': params.resourceids,
      'issystem': '1',
      'ishidden': '0'
    }
  })
}

export function updateBusinesses(params) {
  return request({
    url: '/businesses/updatebusinesses',
    method: 'post',
    data: { 'id': `${params.id}`,
      'businessesname': `${params.businessesname}`,
      'description': `${params.description}`,
      'resourceids': params.resourceids,
      'issystem': '1',
      'ishidden': '0'
    }
  })
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
