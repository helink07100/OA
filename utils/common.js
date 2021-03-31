export default {
  /**
   *
   * 递归方法, 用ID获取部门、岗位、人员数据，也可以用于其它数据操作，关键字段：id、child
   * @param {*} id
   * @param {*} pushArray
   * @param {*} list
   * @returns [{},{}...]
   */
  getListDataItem(id, pushArray, list) {
    if (!pushArray) pushArray = {}
    for (let j = 0; j < list.length; j++) {
      const item = list[j]
      if (item.id === id) {
        pushArray.push(item)
        break
      }
      if (item.child && item.child.length > 0) {
        this.getListDataItem(id, pushArray, item.child)
      }
    }
    return pushArray[0]
  },
  /**
   * 获取id
   *
   * @param {*} arrs
   * @param {*} type
   * @returns ['213', '123'...]
   * @操作的数据类型 type === '<Object>Array'  { m: ['123','1312'], s: ['131']...}
   * @操作的数据类型 type === 'Object'  {'485_75': "XX005", '447_11081': "小花"}
   * @操作的数据类型 !type  [{id: xxx...}...]
   */
  getIds(arrs, type) {
    const ids = []
    if (!type) {
      for (let i = 0; i < arrs.length; i++) {
        ids.push(arrs[i].id)
      }
    } else if (type === 'Object') {
      for (const k in arrs) {
        ids.push(k)
      }
    } else if (type === '<Object>Array') {
      for (const k in arrs) {
        const arr = arrs[k]
        for (let j = 0; j < arr.length; j++) {
          ids.push(arr[j])
        }
      }
    }
    return ids
  },
  ArrayGetOrgDataItem(arrs, list) {
    const items = []
    for (let i = 0; i < arrs.length; i++) {
      const id = arrs[i]
      const item = this.getListDataItem(id, [], list)
      if (item) {
        items.push(item)
      }
    }
    return items
  },
  objectTarray(obj) {
    // 对象转数组
    const items = []
    for (const key in obj) {
      const item = {}
      item.value = key
      item.name = obj[key]
      items.push(item)
    }
    return items
  },
  // 获取数组中的最大值，arr = [1,3,8]
  get_array_number_max(arr) {
    if (!arr || arr.length <= 0) return []
    return arr.reduce((a, b) => {
      return a > b ? a : b
    })
  },

  html_decode(str = '') {
    let s = ''
    if (!str.length) return ''
    s = str.replace(/&amp;/g, '&')
    s = s.replace(/&lt;/g, '<')
    s = s.replace(/&gt;/g, '>')
    s = s.replace(/&nbsp;/g, ' ')
    s = s.replace(/&#39;/g, "'")
    s = s.replace(/&quot;/g, '"')
    s = s.replace(/<br\/>/g, '\n')
    return s
  }
}
