/**
 * @desc 格式化日期
 *        date为日期格式: Date 或date字符串
 *        fmt为要转化的格式,如:'yyyy-MM-dd HH:mm:ss'
 */
export const dateFormat = (date, fmt = 'yyyy-MM-dd HH:mm:ss') => {
  if (!date) return ''
  if (typeof date === 'string') {
    date = date.replace(/-/g, '/')
  }
  date = new Date(date)
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, // 小时
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  var week = {
    '0': '/u65e5',
    '1': '/u4e00',
    '2': '/u4e8c',
    '3': '/u4e09',
    '4': '/u56db',
    '5': '/u4e94',
    '6': '/u516d'
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[date.getDay() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

// 深拷贝
export const deepcopy = function (source) {
  if (!source) {
    return source
  }
  let sourceCopy = source instanceof Array ? [] : {}
  for (let item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item]
  }
  return sourceCopy
}

/**
 * @func
 * @name isType
 * @desc 判断 val 是否 className 的类型
 * @param {string | Function} className - 可以是类或类名字符串
 * @param {*} val - 待验证的值
 * @returns {boolean}
 */
export const isType = (className, val) => {
  let typeStr = Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
  className = className.toLowerCase()
  return typeStr === className
}

export const avoidFastclick = (func, delay = 1500) => {
  let canClick = true
  return function () {
    if (canClick) {
      canClick = false
      func()
      setTimeout(function () {
        canClick = true
      }, delay)
    }
  }
}
