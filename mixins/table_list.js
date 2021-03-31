/**
 * 列表页的minxs
 * 包含pages和list参数，以及切换页面的方法
 *
 * getList 添加两个钩子
 * beforeGetList 前置钩子，用来返回getList的请求对象以及参数参数
 * afterGetList 后置钩子，请求完成后调用，传入返回的对象，如果后置钩子返回false，这不执行后续逻辑（即表明自己处理然后的ajax返回逻辑）
 */

export default {
  data: () => ({
    loading: true,
    listLoading: false,
    pages: {
      total: 0,
      page_no: 1,
      page_size: 20
    },
    Result: {},
    list: [],
    ascDic: {
      ascending: 'asc',
      descending: 'desc'
    }
  }),
  methods: {
    async getApproveBaseData() {
      const res = await this.$api.myflow.getApproveBaseData({
        get_base_data: 1
      })
      if (res) {
        this.formTypes = res.data.form_types
        this.statusTypes = res.data.form_status
        this.handleTypes = res.data.is_handel
      }
    },
    async getList() {
      try {
        if (typeof this.beforeGetList === 'function') {
          const { handler, params = {} } = this.beforeGetList()
          const rs = await handler({ ...params, ...this.pages })
          if (typeof this.afterGetList === 'function') {
            const isReturn = this.afterGetList(rs)
            if (typeof rs === 'boolean' && !isReturn) {
              this.listLoading = false
              return isReturn
            }
          }
          this.listLoading = false
          if (rs) {
            const data = rs.data
            if (Object.keys(data).length > 0) {
              if (Array.isArray(data) && !data.list) {
                this.list = data || []
              } else {
                this.list = data.list || []
              }
              if (data.pages) {
                this.pages.total = data.pages.total
              }
            }
          }
          this.Result = rs
        }
      } catch (e) {
        this.$message.error(e.message)
      }

      this.loading = false
    },
    // 排序
    sortChange(column) {
      this.form.order_by = column.prop === 'ratio' ? 'read_ratio' : column.prop
      this.form.is_asc = this.ascDic[column.order]
        ? this.ascDic[column.order]
        : ''
      this.getList()
    },
    pageCodeChange(code) {
      this.listLoading = true
      this.pages.page_no = code
      this.getList()
    },
    pageSizeChange(size) {
      this.listLoading = true
      this.pages.page_size = size
      this.getList()
    },
    searchOn() {
      this.pages.page_no = 1
      this.listLoading = true
      this.getList()
    }
  }
}
