import { http } from '@/utils/http'

/** 分类-列表- /kind/list */
export interface kindListRes {
  module: {
    moduleTitle: string
    list: {
      id: string
      /** 标题 */
      title: string
      /** 封面 */
      cover: string
      /** 是否特价 */
      isBargainPrice: boolean
      /** 是否一天内 */
      isOneDay: boolean
      /** 价格 */
      price: string
      /** 旧价格 */
      oldPrice: string
      /** 详情 */
      desc: string
    }[]
  }[]
}
export const getKindList = () => {
  return http.get<kindListRes>('/kind/list')
}
