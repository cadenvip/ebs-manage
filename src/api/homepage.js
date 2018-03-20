import request from '@/utils/request'

export function getHomeInfo() {
  return request({
    url: '/homeinfo/getcount',
    method: 'post'
  })
}
