export const state = () => ({
  notificationDrawerVisible: false, // 通知中心弹出层
  layoutSideCollapse: false, // 左侧菜单是否收起
  noticationNumber: 0, // 消息通知的数量
  closeNotication: false // 关闭消息通知的轮询
})

export const mutations = {
  changeNotificationDrawerStatus(state, status) {
    state.notificationDrawerVisible = status
  },
  toggleLayoutSideCollapse(state) {
    state.layoutSideCollapse = !state.layoutSideCollapse
  },
  changeNoticationNumber(state, val) {
    state.noticationNumber = val
  },
  changeCloseNotication(state, boole) {
    state.closeNotication = boole
  }
}

export const actions = {
  // 退出登录后需要做数据清理
  logout(context) {
    // 清除菜单数据
    context.commit('menus/updateActive', 0)
    context.commit('menus/update', [])
    context.commit('user/updateUser', {})
    // 清除轮询
    context.dispatch('setNoticationNumber', 'off')
  },
  setNoticationNumber(context, isClear) {
    if (isClear === 'off') {
      context.commit('changeNoticationNumber', 0)
      context.commit('changeCloseNotication', true)
    } else {
      context.commit('changeCloseNotication', false)
    }
  }
}
