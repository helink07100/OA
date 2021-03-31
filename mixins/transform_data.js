/*
 * 统一转成标准数据---用于数据初始化时
 * 主要是为了兼容旧数据
 */
export default {
  methods: {
    /**
     * 新增流程、编辑流程、新增我的申请
     * @param {form}  表单控件
     * @param {isput}  当前draggable是否允许
     * @returns 返回控件
     */
    transformFlow(form, isput) {
      let nf = JSON.parse(JSON.stringify(form))

      // 旧数据缺少某些字段
      nf = Object.assign(
        {
          isInit: 0,
          // 控件是否允许拖拽
          put: isput,
          // 父节点是否存在block控件的id
          blockSortid: '',
          outSide: true,
          controlList: []
        },
        nf
      )

      // 隐藏区域
      for (const key in nf.controlList) {
        // 兼容旧数据
        if (nf.controlList[key].isShow === true) {
          nf.controlList[key].isShow = 1
        } else if (nf.controlList[key].isShow === false) {
          nf.controlList[key].isShow = 0
        }

        if (nf.controlList[key].type === 'block') {
          nf.controlList[key] = Object.assign(
            {
              isInit: 0,
              put: true,
              blockSortid: nf.controlList[key].sortid,
              outSide: false
            },
            nf.controlList[key]
          )
        }
      }

      return nf
    },

    /**
     *
     * 新增我的申请
     * 数据初始化，数据转换
     * @param {res} 请求成功返回结果
     */
    transformInitApply(res) {
      this.history_records = res.data.history_records
      const form = res.data.form
      this.form.organization_name = res.data.member.organization_name
      this.form.form_name = res.data.form_name
      this.form.show_name = res.data.member_name
      this.form.station_name = res.data.member_station
      this.form.department_name = res.data.member_department
      this.form.org_level_name = res.data.organization.level_name
      this.form.org_level = res.data.organization.level
      this.form.form_id = form.form_id
      this.form.mylevel = form.form_id
    },

    //  提交的转换
    transformSubmit() {
      const newItem = {}
      this.formVaild.controlList.forEach((item) => {
        let arrs
        let filenames = []
        let names = []
        switch (item.type) {
          case 'date_range':
            newItem['control_' + item.sortid + '_start'] = item.value
            newItem['control_' + item.sortid + '_end'] = item.to_value
            break
          case 'money':
            newItem['control_' + item.sortid] = item.value
            newItem['control_' + item.sortid + '_type'] = item.select_value
            break
          case 'station':
            newItem['control_' + 'department_' + item.sortid] = item.value
            newItem['control_' + item.sortid] = item.station_value
            break
          case 'table':
            newItem['control_' + item.sortid] = JSON.stringify(item.value)
            break
          case 'block':
            newItem['control_' + item.sortid] = JSON.stringify({
              formList: item.formList,
              isShow: item.isShow
            })
            break
          case 'select':
            newItem['control_' + item.sortid] = item.value
            newItem['control_' + item.sortid + '_options'] = item.options
            break
          case 'multi_select':
            newItem['control_' + item.sortid] = item.value
            newItem['control_' + item.sortid + '_options'] = item.options
            break
          case 'addon':
          case 'images':
            arrs = item.value
            filenames = []
            names = []
            for (let i = 0; i < arrs.length; i++) {
              filenames.push(arrs[i].filename)
              names.push(arrs[i].name || arrs[i].realname)
            }
            newItem['control_' + item.sortid] = filenames
            newItem['control_' + item.sortid + '_realname'] = names
            break
          default:
            newItem['control_' + item.sortid] = item.value
            break
        }
      })

      return newItem
    }
  }
}
