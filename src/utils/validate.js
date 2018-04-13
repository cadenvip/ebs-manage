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
  const reg = /^[0-9]+$/
  return reg.test(str)
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

/**
   * 正则：手机号（精确）
   * <p>移动：134(0-8)、135、136、137、138、139、147、150、151、152、157、158、159、178、182、183、184、187、188、198</p>
   * <p>联通：130、131、132、145、155、156、175、176、185、186、166</p>
   * <p>电信：133、153、173、177、180、181、189、199</p>
   * <p>全球星：1349</p>
   * <p>虚拟运营商：170</p>
   */

/* 校验移动手机号*/
export function validateCMMobilePhone(str) {
  const reg = /^(134|135|136|137|138|139|147|150|151|152|157|158|159|170|178|182|183|184|187|188|198)[0-9]{8}$/
  return reg.test(str)
}

/* 校验联通手机号*/
export function validateCUMobilePhone(str) {
  const reg = /^(130|131|132|145|155|156|175|176|185|186|166)[0-9]{8}$/
  return reg.test(str)
}

/* 校验电信手机号*/
export function validateCTMobilePhone(str) {
  const reg = /^(133|153|173|177|180|181|189|199)[0-9]{8}$/
  return reg.test(str)
}

/* 校验手机号*/
export function validateMobilePhone(str) {
  const reg = /^((13[0-9])|(14[5,7])|(15[0-3,5-9])|(17[0,3,5-8])|(18[0-9])|166|198|199|(147))[0-9]{8}$/
  return reg.test(str)
}

/* 校验座机*/
export function validateTelephone(str) {
  const reg = /^0\d{2,3}[- _]?\d{7,8}$/
  return reg.test(str)
}

/* 校验电话*/
export function validatePhone(str) {
  var isMobilePhone = validateMobilePhone(str)
  var isTelephone = validateMobilePhone(str)
  return (isMobilePhone || isTelephone)
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
