// var time1 = new Date('xxxx').Format("yyyy-MM-dd");
// var time2 = new Date('xxxx').Format("yyyy-MM-dd hh:mm:ss");
// eslint-disable-next-line no-extend-native
Date.prototype.Format = function (fmt) {
  // author: meizz
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1
          ? o[k]
          : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

export function formDate (timestamp) {
  let dates = []
  let targetDate = null
  if (!timestamp) {
    return '--'
  } else if (!/\d{4}-\d{2}-\d{2}/.test(timestamp)) {
    timestamp = timestamp < 1000000000000 ? timestamp * 1000 : timestamp
    targetDate = new Date(timestamp)
  } else if (
    /(\d{4})-(\d{2})-(\d{2})( (\d{2}):(\d{2})(:(\d{2}))?)?/.test(timestamp)
  ) {
    dates = timestamp.match(
      /(\d{4})-(\d{2})-(\d{2})( (\d{2}):(\d{2})(:(\d{2}))?)?/
    )
    targetDate = new Date(
      dates[1] * 1,
      dates[2] * 1 - 1,
      dates[3] * 1,
      dates[5] * 1 || 0,
      dates[6] * 1 || 0,
      dates[8] * 1 || 0
    )
  }
  let _convertedDate = ''
  let now = new Date()
  let targetYear = targetDate.getFullYear()
  let year = now.getFullYear()
  let targetMonth = targetDate.getMonth()
  let month = now.getMonth()
  let targetDay = targetDate.getDate()
  let day = now.getDate()
  if (targetYear < year) {
    _convertedDate = targetDate.Format('yyyy-MM-dd')
  } else if (targetYear === year && targetMonth === month && targetDay === day) {
    _convertedDate = targetDate.Format('hh:mm')
  } else {
    _convertedDate = targetDate.Format('MM-dd hh:mm')
  }

  return _convertedDate || ''
}

export const formatUrl = url => {
  const host = window.location.href
  if (host.indexOf('localhost') !== -1) {
    return '/api/' + url
  } else {
    return url
  }
}

export const PREFIX = (function () {
  // const host = window.location.href
  return '/api/index.php/'
})()

export function deepClone (obj) {
  if (isBaseDataType(obj)) {
    return obj
  }

  /**
   * 判断数据类型
   * 不考虑Symbol类型
   * @param {*} obj
   */
  function judgeType (_obj) {
    return _obj === null ? 'null' : _obj instanceof Array ? 'array' : typeof _obj !== 'object' ? typeof _obj : 'object'
  }

  /**
   * 基本数据类型判断
   * @param {*} obj
   */
  function isBaseDataType (_obj) {
    var types = ['boolean', 'number', 'string', 'function', 'null', 'undefined']
    var type = judgeType(_obj)
    return types.indexOf(type) !== -1
  }

  /**
   * 数组深拷贝
   * @param {*} _obj
   * @param {*} res
   */
  function _cloneArry (_obj) {
    var res = []
    for (var i = 0, len = _obj.length; i < len; i++) {
      var value = _obj[i]
      if (isBaseDataType(value)) {
        res.push(value)
      } else if (judgeType(value) === 'object') {
        res.push(_cloneObj(value))
      } else if (judgeType(value) === 'array') {
        res.push(_cloneArry(value))
      }
    }
    return res
  }

  /**
   * 对象深拷贝
   * @param {*} _obj
   * @param {*} res
   */
  function _cloneObj (_obj) {
    var res = {}
    for (var attr in _obj) {
      var value = _obj[attr]
      if (isBaseDataType(value)) {
        res[attr] = value
      } else if (judgeType(value) === 'object') {
        res[attr] = _cloneObj(value)
      } else if (judgeType(value) === 'array') {
        res[attr] = _cloneArry(value)
      }
    }
    return res
  }

  if (judgeType(obj) === 'array') {
    return _cloneArry(obj)
  } else {
    return _cloneObj(obj)
  }
}
