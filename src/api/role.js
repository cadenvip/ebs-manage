import request from '@/utils/request'

export function getAllRoles(currentpage, pagesize) {
  return request({
    url: '/role/list',
    method: 'post',
    data: { 'page': currentpage,
      'limit': pagesize }
  })
}

export function getRoleList(roleinfo, currentpage, pagesize) {
  return request({
    url: '/role/list',
    method: 'post',
    data: { 'rolename': roleinfo.rolename,
      'issystem': roleinfo.issystem,
      'roletype': roleinfo.roletype,
      'ishidden': roleinfo.ishidden,
      'page': currentpage,
      'limit': pagesize
    }
  })
}

export function addRole(params) {
  return request({
    url: '/role/save',
    method: 'post',
    data: { 'roleame': params.rolename,
      'roletype': params.roletype,
      'description': params.description,
      'resourceids': params.permissions
    }
  })
}

export function updateRole(params) {
  return request({
    url: '/role/update',
    method: 'post',
    data: { 'id': params,
      'roleame': params.rolename,
      'description': params.description,
      'resourceids': params.permissions
    }
  })
}

export function deleteRole(params) {
  return request({
    url: '/role/delete',
    method: 'post',
    data: { 'id': params }
  })
}

export function getRoleDetail(params) {
  alert(params)
  return request({
    url: '/role/detail',
    method: 'post',
    data: { 'roleid': params }
  })
}
