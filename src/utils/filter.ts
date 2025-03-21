/** 手机号掩码 */
export function phoneMask(v: string) {
  const pre = v.slice(0, 3)
  const last = v.slice(-4)
  return `${pre}****${last}`
}
