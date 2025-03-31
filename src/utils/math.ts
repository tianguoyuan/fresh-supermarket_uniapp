import * as math from 'mathjs'
/** 加 */
export function add(x: number, y: number) {
  return Number(math.format(math.add(math.bignumber(x), math.bignumber(y))))
}
/** 减 */
export function subtract(x: number, y: number) {
  return Number(math.format(math.subtract(math.bignumber(x), math.bignumber(y))))
}
/** 乘 */
export function multiply(x: number, y: number) {
  return Number(math.format(math.multiply(math.bignumber(x), math.bignumber(y))))
}
/** 除 */
export function divide(x: number, y: number) {
  return Number(math.format(math.divide(math.bignumber(x), math.bignumber(y))))
}

/** 补0 - str=1 - 01 */
export function padStart(str: string, length = 2, placeholder = '0') {
  return str.padStart(length, placeholder)
}

/** 补0 - str=1 - 10 */
export function padEnd(str: string, length = 2, placeholder = '0') {
  return str.padEnd(length, placeholder)
}

// 随机数
export function generateRandomIntegerString(length: number): string {
  let result = ''
  for (let i = 0; i < length; i++) {
    // 生成 0 到 9 的随机整数
    const randomDigit = Math.floor(Math.random() * 10)
    result += randomDigit.toString() // 将随机数字转换为字符串并添加到结果中
  }
  return result
}
