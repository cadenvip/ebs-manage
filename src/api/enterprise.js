import request from '@/utils/request'

export function getAllEnterprises(currentpage, pagesize) {
  return request({
    url: '/enterprise/list',
    method: 'post',
    data: { 'page': `${currentpage}`,
      'limit': `${pagesize}` }
  })
}

export function getEnterpriseList(enterpriseinfo, currentpage, pagesize) {
  return request({
    url: '/enterprise/list',
    method: 'post',
    data: { 'enterprisename': `${enterpriseinfo.enterprisename}`,
      'issystem': `${enterpriseinfo.issystem}`,
      'enterprisetype': `${enterpriseinfo.enterprisetype}`,
      'ishidden': `${enterpriseinfo.ishidden}`,
      'page': `${currentpage}`,
      'limit': `${pagesize}`
    }
  })
}

export function addEnterprise(params) {
  return request({
    url: '/enterprise/save',
    method: 'post',
    data: { 'enterprisename': `${params.enterprisename}`,
      'enterprisetype': `${params.enterprisetype}`,
      'description': `${params.description}`,
      'resourceids': params.resourceids,
      'issystem': '1',
      'ishidden': '0'
    }
  })
}

export function updateEnterprise(params) {
  return request({
    url: '/enterprise/update',
    method: 'post',
    data: { 'id': `${params.id}`,
      'enterprisename': `${params.enterprisename}`,
      'description': `${params.description}`,
      'resourceids': params.resourceids,
      'issystem': '1',
      'ishidden': '0'
    }
  })
}

export function deleteEnterprise(params) {
  return request({
    url: '/enterprise/delete/' + `${params}`,
    method: 'post'
    // data: { 'id': `${params}` }
  })
}

export function getEnterpriseDetail(params) {
  return request({
    url: '/enterprise/detail',
    method: 'post',
    data: { 'enterpriseid': `${params}` }
  })
}
