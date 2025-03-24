import { http } from '@/utils/http'

/** 购物车-地址列表 */
export interface ShoppingAddressParams {
  userId: string
}
export interface ShoppingAddressResItem {
  id: string
  username: string
  phone: string
  checked: boolean

  province: string
  city: string
  county: string
  suffix: string
}
export interface ShoppingAddressRes {
  addressList: ShoppingAddressResItem[]
}
export function shoppingAddress(data: ShoppingAddressParams) {
  return http.get<ShoppingAddressRes>('/shopping/address', data)
}

// /** 购物车-地址默认 */
// export function shoppingFindDefaultAddress(data: API.ShoppingAddress): Promise<API.ShoppingFindDefaultAddressRes> {
//   return http.request({ url: '/shopping/findDefaultAddress', method: 'GET', data })
// }

// /** 购物车-优惠券 */
// export function shoppingGetCoupon(): Promise<API.ShoppingGetCouponRes> {
//   return http.request({ url: '/shopping/getCoupon', method: 'GET' })
// }
