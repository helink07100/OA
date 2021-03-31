export default async ({ route, store, redirect, error }) => {
  const token = store.getters['user/token']
  if (token) {
    let menus = store.state.menus.menus
    if (menus.includes('undefined') || !menus.length) {
      await store.dispatch('menus/load')
      menus = store.state.menus.menus
    }
    // 不走后端权限的页面
    const whites = [
      '/application_table',
      '/application_table/table_view',
      '/reset_pwd'
    ]
    // 判断当前页面路由是否在menus数组里，如果不存在，表示无页面权限
    // 不存在的场景需要区分是否子路由页面，有些页面可能没有在menus上
    const { path } = route
    // eslint-disable-next-line no-unused-vars
    let hasWhite = false
    for (let i = 0; i < whites.length; i++) {
      if (whites[i] === path || whites[i] + '/' === path) {
        hasWhite = true
      }
    }
    const flattenMenus = store.getters['menus/getFlattenMenu']
    const menu = flattenMenus.find(
      (menu) => menu.path === path || menu.path + '/' === path
    )
    if (!menu && !hasWhite) {
      // store.commit('update', '')
      // setTimeout(() => {
      //   location.reload()
      // }, 3000)
      error({ statusCode: 403, message: '无权访问' })
    }
    // // 遍历菜单，查找是否匹配路径，如果不匹配表示没权限
  } else {
    return redirect('/login')
  }
}
