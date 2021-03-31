// 扁平化数组
function flatten(arr, rs = []) {
  try {
    if (arr.children && arr.children.length) {
      flatten(arr.children, rs)
    } else if (arr.length) {
      arr.forEach((item) => {
        flatten(item, rs)
      })
    } else {
      rs.push(arr)
    }
  } catch (error) {
    window.$nuxt.$router.replace('/login').catch(() => {})
  }
}

export default {
  // 获取当前选中菜单的子菜单
  getActiveMenu: (state) => {
    return state.menus[state.active]
  },
  // 扁平化菜单数组
  getFlattenMenu: (state) => {
    const rs = []
    flatten(state.menus, rs)
    return rs
  }
}
