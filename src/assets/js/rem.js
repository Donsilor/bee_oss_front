function rem () {
  // px2rem的rootValue=30
  // 移动端，设计稿750
  // PAD版，设计稿1920
  var tid
  var rem
  var radio = 30
  var docEl = document.documentElement

  var set = function () {
    var clientWidth = docEl.getBoundingClientRect().width
    rem = clientWidth * radio / 1920
    document.querySelector('html').style.fontSize = rem + 'px'
  }

  set()

  window.addEventListener('resize', function () {
    clearTimeout(tid)
    tid = setTimeout(set, 300)
  }, false)

  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearTimeout(tid)
      tid = setTimeout(set, 300)
    }
  }, false)
}
rem()
