
import menuIconMap from '@/assets/data/menuIconMap.json'
import titleMap from '@/assets/data/titleMap.json'
let menusArr = []
function AutoImportRouter (requireContext) {
  if (!requireContext) throw new Error('requireAll需要requireContext参数')
  let memusObj = {}
  let paths = requireContext.keys()
  let groupName = ''
  let routers = paths.map(filename => {
    // 获取绝对path
    let routerPath = filename.replace(/^\.(\/\w+\/\w*).vue/, '$1')
    let pathurl = filename.replace(/\.\//, '@/views/')
    let group = filename.replace(/^\.\/(\w+)\/\w*.vue/, '$1')
    let vueFileName = filename.replace(/^\.\/\w+\/(\w*.vue)/, '$1')
    if (groupName !== group) {
      groupName = group
      if (!memusObj[groupName]) memusObj[groupName] = []
      memusObj[groupName].push({
        title: titleMap[vueFileName] || vueFileName.replace('.vue', ''),
        path: routerPath
      })
    } else {
      memusObj[groupName].push({
        title: titleMap[vueFileName] || vueFileName.replace('.vue', ''),
        path: routerPath
      })
    }
    return { path: routerPath,
      name: routerPath,
      pathurl,
      component: requireContext(filename).default || requireContext(filename)
    }
  })
  generateMenus(memusObj)
  return routers
}

function generateMenus (memusObj) {
  let unRankMenu = []
  for (let key in memusObj) {
    let menus = memusObj[key]
    if (menus.length > 1) {
      let menu = {
        title: (menuIconMap[key] && menuIconMap[key].title) || '未定义',
        icon: (menuIconMap[key] && menuIconMap[key].icon) || 'facility',
        path: '',
        children: menus
      }
      if (menuIconMap[key] && menuIconMap[key].rank !== undefined) {
        menusArr[menuIconMap[key].rank] = menu
      } else {
        unRankMenu.push(menu)
      }
    } else {
      let menu = memusObj[key][0]
      menu.icon = (menuIconMap[key] && menuIconMap[key].icon) || 'facility'
      if (menuIconMap[key] && menuIconMap[key].rank !== undefined) {
        menusArr[menuIconMap[key].rank] = menu
      } else {
        unRankMenu.push(menu)
      }
    }
  }
  menusArr = [...menusArr, ...unRankMenu]
}
export default AutoImportRouter

export {
  menusArr,
  generateMenus
}
