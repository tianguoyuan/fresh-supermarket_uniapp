import { http } from '@/utils/http'

interface UserGetPhoneCodeParams {
  phone: string
}
interface UserGetPhoneCodeRes {
  code: string
}
// 获取验证码
export const userGetPhoneCode = (data: UserGetPhoneCodeParams) => {
  return http.post<UserGetPhoneCodeRes>('/user/getPhoneCode', data)
}

// 登录
interface UserLoginParams {
  phone: string
  code: string
}
interface UserLoginRes {
  token: string
  userId: string
}
export const userLogin = (data: UserLoginParams) => {
  return http.post<UserLoginRes>('/user/login', data)
}

// 获取用户信息
interface UserInfoParams {
  token: string
}
interface UserInfoRes {
  userId: string
}
export const getUserInfo = (data: UserInfoParams) => {
  return http.post<UserInfoRes>('/user/info', data)
}

// 用户注册
interface UserRegisterParams {
  phone: string
  code: string
  username: string
}
interface UserRegisterRes {
  token: string
  userId: string
}
export const userRegister = (data: UserRegisterParams) => {
  return http.post<UserRegisterRes>('/user/register', data)
}
