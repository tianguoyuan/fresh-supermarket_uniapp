import { http } from '@/utils/http'

export interface CommonRecommendListItem {
  id: string
  title: string
  cover: string
  isBargainPrice: boolean
  isOneDay: boolean
  oldPrice: string
  desc: string

  price: string
  checked: boolean
  num: number // 数量
}
export interface CommonBaseListParams {
  pageNum: number
  pageSize: number
  order: 'asc' | 'desc'
  title?: string
  priceOrder?: 'asc' | 'desc' | ''
  saleOrder?: 'asc' | 'desc' | ''
}

/** 公共-推荐-查找列表 */
export interface FindCommonRecommendListRes {
  total: number
  list: CommonRecommendListItem[]
}
export const findCommonRecommendList = (data: CommonBaseListParams) => {
  return http.get<FindCommonRecommendListRes>('/common/recommendList', data)
}

/** 商品详情 */
export interface FindCommonRecommendListFindOneRes extends CommonRecommendListItem {
  coverList: string[]
  tagList: string[]
}
export function findCommonRecommendListFindOne(id: string) {
  return http.get<FindCommonRecommendListFindOneRes>(`/common/${id}/recommendListFindOne`)
}
