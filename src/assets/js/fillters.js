import { dateFormat, isType } from '@/assets/js/utils.js'
/**
 *table item格式化工厂
 * label 为element table的名称
 *options 为要转换的选项
 * nameoption 为array示例 [
 { label: '大神', value: 1 },
 { label: '小神', value: 2 },
 { label: '财神', value: 3 }
 ]
 opttions 为对象格式示例{
      1: '大神',
      2: '小神',
      3: '财神'
    }
 *
 */
export const format = (value, label, options) => {
  if (!value) return ''
  let reg = /(时间|日期)/g
  if (reg.test(label)) {
    return dateFormat(value)
  }
  if (options) {
    if (isType('array', options)) {
      let result = ''
      options.forEach(item => {
        if (item.value + '' === value + '') {
          result = item.label || ''
        }
      })
      return result
    }
    if (isType('object', options)) {
      return options[value] || ''
    }
  }
  return value
}
