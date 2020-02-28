// made by 林学开 2019-8-20 14:51:54

import axios from '@/assets/js/AxiosPlugin.js'

const
  _toString = Object.prototype.toString
const _slice = Array.prototype.slice

/**
 * @func
 * @name isType
 * @desc 判断 val 是否 className 的类型
 * @param {string | Function} className - 可以是类或类名字符串
 * @param {*} val - 待验证的值
 * @returns {boolean}
 */
function isType (className, val) {
  return _toString.call(val).slice(8, -1) === (typeof className === 'function' ? className.name : className)
}

/**
 * curry
 * @desc 一个函数被curry化之后返回一个新的函数f，
 *        当f调用的时候，如果参数未满足调用条件，
 *        则返回一个新的预载参数的curry化的函数，
 *        否则返回值。
 * @param {Function} fn - 需要被curry的函数
 * @returns {Function | *}
 */
function curry (fn) {
  if (typeof fn !== 'function') throw Error('first argument require a type of function')

  var fnLen = fn.length
  var preArgs = _slice.call(arguments, 1)

  return function curried () {
    var args = _slice.call(arguments)
    var allArgs = preArgs.concat(args)

    if (args.length === 0 || allArgs.length >= fnLen) return fn.apply(this, allArgs)

    return curry.apply(null, [fn].concat(allArgs))
  }
}

/**
 * compose
 * @desc 组合调用函数，生成可让数据从右往左流动加工，返回最终结果的函数
 * @returns {Function}
 */
function compose () {
  let fns = Array.from(arguments)

  if (!fns.length || fns.some(fn => !isType(Function, fn))) throw Error('compose 参数只能接受不少于1个函数')
  if (fns.length === 1) return fns[0]

  return function (data) {
    let fnIdx = fns.length

    while (fnIdx--) {
      data = fns[fnIdx](data)
    }

    return data
  }
}

/**
 * axios 柯里化函数
 * @type {Function|*}
 */
const curriedApi = curry((method, url, payload) => axios[method](url, payload))

/**
 * Mock辅助函数
 */
function resolveUrl (url) {
  return new RegExp(url + '(\\?.*)?$')
}

/**
 * Mock辅助函数
 */
function pickPayload (options) {
  return JSON.parse(options.body)
}

/**
 * Mock辅助函数
 */
function res (data) {
  return {
    code: '00000',
    data,
    message: ''
  }
}

/**
 * 生成 url 加工偏函数的函数
 * @param serveComp
 * @param prefix
 * @returns {function(*): string}
 */
function urlFactory (serveComp = '', prefix = '') {
  return function packageUrl (url) {
    return serveComp + prefix + url
  }
}

function updateProps (target, ...sources) {
  if (!sources.length) throw Error('源对象至少要有一个，但没有。')
  sources.forEach(sObj => {
    Object.keys(sObj).forEach(key => {
      if (target.hasOwnProperty(key)) target[key] = sObj[key]
    })
  })
  return target
}

export {
  compose,
  curriedApi,
  resolveUrl,
  pickPayload,
  res,
  urlFactory,
  updateProps
}
