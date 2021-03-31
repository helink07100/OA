export default {
  // 更新菜单
  update(state, menu) {
    state.menus = menu
    // eslint-disable-next-line no-undef
    $nuxt.$storage.set('menu', menu)
  },
  // 更新头部当前选中的菜单
  updateActive(state, index) {
    state.active = index
  }
}
