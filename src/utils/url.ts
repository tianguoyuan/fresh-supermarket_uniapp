/**
 * @desc 解密url
 * @param url string
 * @returns string
 */
export const urlDecode = (url: string, i = 0) => {
  console.log('urlDecode-i', i)
  if (!url) return ''
  if (i >= 10) return url
  if (url.includes('/')) return url
  i++
  return urlDecode(decodeURIComponent(url), i)
}

/**
 * @desc 加密url
 * @param url string
 * @returns string
 */
export const urlEncode = (url: string) => {
  if (!url) return
  if (url.includes(encodeURIComponent('/'))) {
    return url
  } else {
    return encodeURIComponent(url)
  }
}
