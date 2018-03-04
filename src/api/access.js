import request from '@/utils/request'

export function getAllAccesss(currentpage, pagesize) {
  return request({
    url: '/access/listAccess',
    method: 'post',
    data: { 'page': `${currentpage}`,
      'limit': `${pagesize}` }
  })
}

export function getAccessList(accessinfo, currentpage, pagesize) {
  return request({
    url: '/access/listAccess',
    method: 'post',
    data: {
      'code': `${accessinfo.code}`,
      'si_name': `${accessinfo.si_name}`,
      'page': `${currentpage}`,
      'limit': `${pagesize}`
    }
  })
}

export function addAccess(params) {
  return request({
    url: '/access/save',
    method: 'post',
    data: { 'accessname': `${params.accessname}`,
      'accesstype': `${params.accesstype}`,
      'description': `${params.description}`,
      'resourceids': params.resourceids,
      'issystem': '1',
      'ishidden': '0'
    }
  })
}

export function updateAccess(params) {
  return request({
    url: '/access/update',
    method: 'post',
    data: { 'id': `${params.id}`,
      'accessname': `${params.accessname}`,
      'description': `${params.description}`,
      'resourceids': params.resourceids,
      'issystem': '1',
      'ishidden': '0'
    }
  })
}

export function deleteAccess(params) {
  return request({
    url: '/access/delete/' + `${params}`,
    method: 'post'
    // data: { 'id': `${params}` }
  })
}

export function getAccessDetail(params) {
  return request({
    url: '/access/detail',
    method: 'post',
    data: { 'accessid': `${params}` }
  })
}

export function getChanelList() {
  return request({
    url: '/access/channelList',
    method: 'post'
  })
}

export function getAllOperationList() {
  return request({
    url: '/access/operationList',
    method: 'post'
  })
}

export function getOperationList(params) {
  return request({
    url: '/access/operationList',
    method: 'post',
    data: { 'operationname': `${params.operationname}` }
  })
}

export function getAllInterfaceList(params) {
  return request({
    url: '/access/interfaceList',
    method: 'post'
  })
}

export function getInterfaceList(params) {
  return request({
    url: '/access/interfaceList',
    method: 'post',
    data: { 'operationname': `${params.inter_name}`,
      'inter_version': `${params.inter_version}`
    }
  })
}
