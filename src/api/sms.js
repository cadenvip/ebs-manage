import request from '@/utils/request'

export function getSms () {
  return request({
    url: '/businesses/smsReceiver/get',
    method: 'get'
  })
}

export function savaSms (params) {
  return request({
    url: '/businesses/smsReceiver/config',
    method: 'post',
    data: params
  })
}
