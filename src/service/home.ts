import { http } from '@/utils/http'
/** 首页 - banner */
export interface HomeBannerRes {
  banner: {
    id: string
    cover: string
  }[]
}
export const getHomeBanner = () => {
  return http.get<HomeBannerRes>('/home/banner')
}

/** 首页-搜索-默认关键词 - /search/defaultMsg */
export interface SearchDefaultMsgRes {
  searchDefault: string
}
export const searchDefaultMsg = () => {
  return http.get<SearchDefaultMsgRes>('/search/defaultMsg')
}

/** 首页-食品分类 */
export interface HomeFoodKindBannerRes {
  foodKindBanner: {
    id: string
    cover: string
    name: string
  }[]
}
export const findHomeFoodKindBanner = () => {
  return http.get<HomeFoodKindBannerRes>('/home/foodKindBanner')
}
