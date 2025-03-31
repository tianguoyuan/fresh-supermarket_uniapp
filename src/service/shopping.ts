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

/** 购物车-地址默认 */
export interface ShoppingFindDefaultAddressRes {
  defaultAddress: ShoppingAddressResItem
}
export function shoppingFindDefaultAddress(data: ShoppingAddressParams) {
  return http.get<ShoppingFindDefaultAddressRes>('/shopping/findDefaultAddress', data)
}

/** 购物车-优惠券 */
export interface ShoppingGetCouponRes {
  couponList: number[]
}
export function shoppingGetCoupon() {
  return http.get<ShoppingGetCouponRes>('/shopping/getCoupon')
}
