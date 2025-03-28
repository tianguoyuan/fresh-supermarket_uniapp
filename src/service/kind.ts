import { http } from '@/utils/http'
import type { CommonRecommendListItem } from './common'

/** 分类-列表- /kind/list */
export interface kindListRes {
  module: {
    moduleTitle: string
    list: CommonRecommendListItem[]
  }[]
}
export const getKindList = () => {
  return http.get<kindListRes>('/kind/list')
}
