// 用户相关的请求模块
import request from '@/utils/request'
// import store from '@/store'

// 登录注册
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
// 发送短信验证码
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `v1_0/sms/codes/${mobile}`
  })
}

// 获取用户自己的信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
