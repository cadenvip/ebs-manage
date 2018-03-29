import request from '@/utils/request'

export function getAllRoles(currentpage, pagesize) {
  return request({
    url: '/role/list',
    method: 'post',
    data: {
      'page': `${currentpage}`,
      'limit': `${pagesize}`
    }
  })
}

export function getRoleList(roleinfo, currentpage, pagesize) {
  return request({
    url: '/role/list',
    method: 'post',
    data: {
      'rolename': `${roleinfo.rolename}`,
      'issystem': `${roleinfo.issystem}`,
      'roletype': `${roleinfo.roletype}`,
      'ishidden': `${roleinfo.ishidden}`,
      'page': `${currentpage}`,
      'limit': `${pagesize}`
    }
  })
}

export function addRole(params) {
  return request({
    url: '/role/save',
    method: 'post',
    data: {
      'rolename': `${params.rolename}`,
      'roletype': `${params.roletype}`,
      'description': `${params.description}`,
      'resourceids': params.resourceids,
      'issystem': '1',
      'ishidden': '0'
    }
  })
}

export function updateRole(params) {
  return request({
    url: '/role/update',
    method: 'post',
    data: {
      'id': `${params.id}`,
      'rolename': `${params.rolename}`,
      'description': `${params.description}`,
      'resourceids': params.resourceids
    }
  })
}

export function deleteRole(params) {
  return request({
    url: '/role/delete/' + `${params}`,
    method: 'post'
    // data: { 'id': `${params}` }
  })
}

export function getRoleDetail(params) {
  return request({
    url: '/role/detail',
    method: 'post',
    data: {
      'roleid': `${params}`
    }
  })
}
