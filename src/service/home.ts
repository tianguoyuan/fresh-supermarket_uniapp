import { http } from '@/utils/http'
import { CommonBaseListParams, CommonRecommendListItem } from './common'
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

/** 首页-超划算列表 */
export interface FindHomeGreatDealListRes {
  id: string
  title: string
  desc: string
  list: CommonRecommendListItem[]
}
export const findHomeGreatDealList = (data) => {
  return http.get<FindHomeGreatDealListRes>('/home/greatDealList', data)
}

/** 首页-商品标签 */
export interface FindHomeTagListRes {
  tagList: {
    id: string
    title: string
    desc: string
  }[]
}
export function findHomeTagList() {
  return http.get<FindHomeTagListRes>('/home/tagList')
}

/** 首页-列表 */
interface FindHomeListParams extends CommonBaseListParams {
  tagId: string
}
export interface FindHomeListRes {
  total: number
  list: CommonRecommendListItem[]
}
export function findHomeList(data: FindHomeListParams) {
  return http.get<FindHomeListRes>('/home/list', data)
}

/** 首页-搜索-默认词 */
interface SearchDefaultMsgRes {
  searchDefault: string
}
export const findSearchDefaultMsg = () => {
  return http.get<SearchDefaultMsgRes>('/search/defaultMsg')
}

/** 首页-搜索-热门 */
export interface SearchHotTagItem {
  id: string
  name: string
}
interface SearchHotTagRes {
  total: number
  list: SearchHotTagItem[]
}
export const findSearchHotTag = () => {
  return http.get<SearchHotTagRes>('/search/hotTag')
}
