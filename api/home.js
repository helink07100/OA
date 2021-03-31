export default (app) => ({
  /**
   * 表单申请数据，返回了myforms 、 myrecords 、cate_lists 字段的数据
   */
  myforms: () => app.$axios.post('?ct=portal&ac=index', {}),
  /**
   * 公告通知数据
   */
  getDocsByCate: ({ cate_id, nums }) =>
    app.$axios.post('?ct=document&ac=get_docs_by_cate', { cate_id, nums }),
  /**
   * 获取日程信息
   */
  searchScheduleByDay: ({ date }) =>
    app.$axios.post('?ct=schedule&ac=search_schedule_by_day', { date }),
  /**
   * 流程中心-申请
   */
  recordList: ({ date }) =>
    app.$axios.post('?ct=myflow&ac=record_list', { date }),
  /**
   * 流程中心-待办
   */
  myreviewApproveList: ({ page_size }) =>
    app.$axios.post('?ct=myreview&ac=approve_list&status=1', { page_size }),
  /**
   * 流程中心-抄送
   */
  myreviewCcList: ({ page_size }) =>
    app.$axios.post('?ct=myreview&ac=cc_list', { page_size }),
  /**
   * 首页看板
   */
  getDashboard: (params) =>
    app.$axios.post('/api.php?ct=index&ac=dashboard_count', {
      ...params
    }),

  /**
   * 快速申请表单列表
   * https://yapi.aoidc.net/project/570/interface/api/11707
   * @return {Promise<AxiosResponse<any>>}
   */
  queryQuickAppForm: () => app.$axios.get('/api.php?ct=myflow'),

  /**
   * 快速申請添加
   * https://yapi.aoidc.net/project/570/interface/api/11700
   * @return {Promise<AxiosResponse<any>>}
   */
  addQuickAppForm: ({ form_data }) =>
    app.$axios.post('?ct=form_quick&ac=add', {
      form_data
    }),

  /**
   * 快速申请表单列表
   * https://yapi.aoidc.net/project/570/interface/api/11707
   * @return {Promise<AxiosResponse<any>>}
   */
  queryQuickFormIndexPage: () => app.$axios.post('/?ct=form_quick'),

  // 删除已添加的快速申请表单
  deleteQuickForm: (data) => app.$axios.post('/?ct=form_quick&ac=del', data)
})
