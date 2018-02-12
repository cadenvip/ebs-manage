import request from '@/utils/request'

export function EnterpriseRegister(params) {
  return request({
    url: '/register/BusinessesRegist',
    method: 'post',
    data: params
  })
}
