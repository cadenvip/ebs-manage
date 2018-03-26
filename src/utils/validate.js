/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/* 合法uri*/
export function validateURL(textval) {
  // const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  const urlregex = /(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/
  return urlregex.test(textval)
}

/* 小写数字*/
export function validateDigit(str) {
  debugger
  const reg = /^[0-9]+$/
  var result = reg.test(str)
  return result
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母*/
export function validateAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/* 字符 */
export function validateSymbol(str) {
  const reg = /^[~!@#$%^&*]+$/
  return reg.test(str)
}

/* 校验手机号*/
export function validateMobilePhone(str) {
  const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
  return reg.test(str)
}

/* 校验座机*/
export function validateTelephone(str) {
  const reg = /^(0\\d{2}- \\d{8}(-\\d{1,4})?)|(0\\d{3}- \\d{7,8}(-\\d{1,4})?)$/
  return reg.test(str)
}

/* 校验电话*/
export function validatePhone(str) {
  const reg = /(^[1][3,4,5,6,7,8,9][0-9]{9}$)|(^(0\\d{2}-\\d{8}(-\\d{1,4})?)|(0\\d{3}-\\d{7,8}(-\\d{1,4})?)$)/
  return reg.test(str)
}

/* 校验身份证*/
export function validateID(str) {
  const reg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
  return reg.test(str)
}

/* 校验邮箱*/
export function validateEmail(str) {
  // const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
  return reg.test(str)
}

/* 校验密码复杂度*/
// 密码(由数字/大写字母/小写字母/标点符号组成，四种都必有，8位以上)
export function validatePass(str) {
  const reg = /(?=^.{8,}$)(?=.*\d)(?=.*\W+)(?=.*[A-Z])(?=.*[a-z])(?!.*\n).*$/
  return reg.test(str)
}

export function validatePostcode(str) {
  const reg = /^[1-9][0-9]{5}$/
  return reg.test(str)
}

export function containDigit(str) {
  const reg = /(?=.*?[0-9])/
  return reg.test(str)
}

/* 小写字母*/
export function containLowerCase(str) {
  const reg = /(?=.*?[a-z])/
  return reg.test(str)
}

/* 大写字母*/
export function containUpperCase(str) {
  const reg = /(?=.*?[A-Z])/
  return reg.test(str)
}

/* 字符 */
export function containSymbol(str) {
  const reg = /(?=.*?[#?!@$%^&*-])/
  return reg.test(str)
}
