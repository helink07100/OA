export const state = () => ({
  formControl: {
    isInit: 0,
    // 控件是否允许拖拽
    put: true,
    // 父节点是否存在block控件的id
    blockSortid: '',
    outSide: true,
    controlList: []
  },
  curId: 1000,
  organizations: [],
  blockStatus: false
})

export const mutations = {
  changeOrganizations(state, arrs) {
    state.organizations = JSON.parse(JSON.stringify(arrs))
  },
  changeControlList(state, items) {
    state.formControl.controlList = JSON.parse(JSON.stringify(items))
  },
  // 删除某一项
  deleteControlItem(state, data) {
    // 删除隐藏区域的项
    if (data.blockIndex) {
      state.formControl.controlList = state.formControl.controlList.map(
        (i, index) => {
          if (index === data.blockIndex) {
            i.formList = i.formList.filter((j) => {
              return j.sortid !== data.item.sortid
            })
          }

          return i
        }
      )

      // 非隐藏区域项
    } else {
      state.formControl.controlList = state.formControl.controlList.filter(
        (i) => {
          return i.sortid !== data.item.sortid
        }
      )
    }

    this.commit('form/changeInit')
  },
  changeCurId(state, val) {
    if (!val) {
      state.curId++
    } else {
      state.curId = Number(val)
    }
  },
  changeBlockStatus(state, data) {
    state.blockStatus = data
  },
  // 修改控件是否允许拖拽
  changePut(state, data) {
    state.formControl.controlList.map((i) => {
      if (i.type === 'block') {
        i.put = data
      }
    })
    this.commit('form/changeInit')
  },
  // 控件是否初始化
  changeInit(state, data) {
    state.formControl.isInit = data === 0 ? data : state.formControl.isInit + 1
  }
}

export const actions = {
  SET_ORGS(context, data) {
    context.commit('changeOrganizations', data)
  },
  setCurId(context, val) {
    context.commit('changeCurId', val)
  },
  async GET_ORGS({ commit }) {
    // eslint-disable-next-line no-useless-catch
    try {
      const res = await this.$api.common.memberSelectWhole({
        organization_id: ''
      })
      if (res) {
        commit('changeOrganizations', res.data)
      }
    } catch (e) {
      throw e
    }
  }
}
