import request from '@/utils/request'

export function getAllCountries(params) {
  return request({
    url: '/location/list',
    method: 'post',
    data: { 'locationLevel': '0', 'parentId': '' }
  })
}

export function getAllProvinces(params) {
  return request({
    url: '/location/list',
    method: 'post',
    data: { 'locationLevel': '1', 'parentId': `${params}` }
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

// TODO
export function getLocationList(params) {
  return request({
    url: '/location/list',
    method: 'post',
    data: {}
  })
}
