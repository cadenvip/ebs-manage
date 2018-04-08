import JSEncrypt from 'jsencrypt'

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  console.log(date.getFullYear(), date.getHours())
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function str2Timestamp(strDatetime) {
  var d = new Date(strDatetime)
  return Math.round(d.getTime())
}

export function getUnitsOptions() {
  const Units = JSON.parse(window.localStorage.getItem('units'))
  var unitsOptions = []
  if (Units) {
    for (var i in Units) {
      var obj = {
        label: Units[i].udesc,
        value: Units[i].usid
      }
      unitsOptions.push(obj)
    }
  }
  return unitsOptions
}

const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDAkMbtAysvfRui7QxlDx8z39WpIGOOMHxDf6qJyNDGZtsSRyu69IOBNn3rOz7eywJNMBTB4XswyWNnilUYmAGSH1gRz2UXk+MeXV4f7Osk7Ig5uRer1BBM91yfstQuwJFUFD6tUHVqmAc4Tt51dp/3E6BTvHc/lCH1W8blMitf2QIDAQAB'
export function encryptPassword(password) {
  var encryptedPassword = ''
  if (password !== undefined && password !== null && password !== '') {
    var encrypt = new JSEncrypt()
    encrypt.setPublicKey(publicKey)
    encryptedPassword = encrypt.encrypt(password)
  } else {
    console.log('password is null.')
  }
  return encryptedPassword
}

// 手机号码脱敏
export function phoneCutSensitive(phone) {
  var result = ''
  if (phone !== undefined && phone !== null && phone !== '') {
    // TODO
    result = phone.substr(0, 3)
    result = result + '****'
    result = result + phone.substr(phone.length - 4, 4)
  } else {
    console.log('phone is null.')
  }
  return result
}

// 身份证脱敏（15/18位）
export function idcardCutSensitive(idCardNo) {
  var result = ''
  if (idCardNo !== undefined && idCardNo !== null && idCardNo !== '') {
    if (idCardNo.length === 15) {
      result = '***********' + idCardNo.substr(11, 4)
    } else if (idCardNo.length === 18) {
      result = '**************' + idCardNo.substr(14, 4)
    } else {
      result = idCardNo
    }
  } else {
    console.log('idCardNo is null.')
  }
  return result
}

// 姓名脱敏
export function nameCutSensitive(name) {
  var result = ''
  if (name !== undefined && name !== null && name !== '') {
    switch (name.length) {
      case 1:
        result = name.substr(0, 1)
        break
      case 2:
        result = name.substr(0, 1) + '*'
        break
      case 3:
        result = name.substr(0, 1) + '*' + name.substr(2, 1)
        break
      case 4:
        result = name.substr(0, 2) + '**'
        break
      default:
        result = name.substr(0, 2) + '****'
        break
    }
  } else {
    console.log('name is null.')
  }
  return result
}

// 银行卡脱敏(13--19位)
export function bankCardNoCutSensitive(bankCardNo) {
  var result = ''
  if (bankCardNo !== undefined && bankCardNo !== null && bankCardNo !== '') {
    switch (bankCardNo.length) {
      case 13:
        result = '*********' + bankCardNo.substr(9, 4)
        break
      case 14:
        result = '**********' + bankCardNo.substr(10, 4)
        break
      case 15:
        result = '***********' + bankCardNo.substr(11, 4)
        break
      case 16:
        result = '************' + bankCardNo.substr(12, 4)
        break
      case 17:
        result = '*************' + bankCardNo.substr(13, 4)
        break
      case 18:
        result = '**************' + bankCardNo.substr(14, 4)
        break
      case 19:
        result = '***************' + bankCardNo.substr(15, 4)
        break
      default:
        result = bankCardNo
        break
    }
  } else {
    console.log('bankCardNo is null.')
  }
  return result
}
