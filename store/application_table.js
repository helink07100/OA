export const state = () => ({
  tables: {}
})

export const mutations = {
  changeTables(state, arrs) {
    state.tables = arrs
  }
}
