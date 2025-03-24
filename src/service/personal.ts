import { http } from '@/utils/http'

/** 我的-积分列表 */
export interface PersonalIntegralParams {
  userId: string
}
export interface PersonalIntegralRes {
  integralList: {
    value: number
    label: string
  }[]
}
export const personalIntegral = (data: PersonalIntegralParams) => {
  return http.get<PersonalIntegralRes>('/personal/integral', data)
}
