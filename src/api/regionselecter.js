import request from '@/utils/request'

export function getAllCountries(params) {
  return request({
    url: '/location/list',
    method: 'post',
    data: JSON.stringify({ 'locationLevel': '0', 'parentId': '' })
  })
}

export function getAllProvinces(params) {
  return request({
    url: '/location/list',
    method: 'post',
    data: JSON.stringify({ 'locationLevel': '1', 'parentId': `${params}` })
  })
}

export function getAllCities(params) {
  return request({
    url: '/location/list',
    method: 'post',
    data: { 'locationLevel': '2', 'parentId': `${params}` }
  })
}

export function getAllCounties(params) {
  return request({
    url: '/location/list',
    method: 'post',
    data: { 'locationLevel': '3', 'parentId': `${params}` }
  })
}

export function getAllTowns(params) {
  return request({
    url: '/location/list',
    method: 'post',
    data: { 'locationLevel': '4', 'parentId': `${params}` }
  })
}

export function getAllVillages(params) {
  return request({
    url: '/location/list',
    method: 'post',
    data: { 'locationLevel': '5', 'parentId': `${params}` }
  })
}

export function queryLocationName(params) {
  return request({
    url: '/location/list',
    method: 'post',
    data: { 'locationName': `${params}` }
  })
}

export function getParentInfo(parentId, locationLevel) {
  return request({
    url: '/location/list',
    method: 'post',
    data: { 'id': `${parentId}`,
      'locationLevel': `${locationLevel}` }
  })
}

export function getLocationInfoById(id) {
  return request({
    url: '/location/list',
    method: 'post',
    data: { 'id': `${id}` }
  })
}

export function getLocationInfoByCode(locationCode) {
  return request({
    url: '/location/list',
    method: 'post',
    data: { 'locationCode': `${locationCode}` }
  })
}
