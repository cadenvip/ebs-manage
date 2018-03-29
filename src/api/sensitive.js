import request from '@/utils/request'

export function getAllSensitives(currentpage, pagesize) {
  return request({
    url: '/sensitive/search',
    method: 'post',
    data: {
      'keyword': '',
      'page': `${currentpage}`,
      'limit': `${pagesize}`
    }
  })
}

export function getSensitiveList(sensitive, currentpage, pagesize) {
  return request({
    url: '/sensitive/search',
    method: 'post',
    data: {
      'keyword': `${sensitive}`,
      'page': `${currentpage}`,
      'limit': `${pagesize}`
    }
  })
}

export function addSensitive(sensitive) {
  return request({
    url: '/sensitive/add',
    method: 'post',
    data: {
      'word': `${sensitive}`
    }
  })
}

export function deleteSensitive(id) {
  return request({
    url: '/sensitive/delete/' + `${id}`,
    method: 'post'
    // data: { 'id': `${params}` }
  })
}
