export default {
  async load(context) {
    try {
      const { data } = await this.$api.common.getMenus()
      context.commit('update', data)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e)
      this.$msg.error(this.$t('获取菜单出错'))
    }
  }
}
