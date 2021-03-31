export default (app) => ({
  /**
   * 表单类型数据-mock
   */
  formTypes: () => app.$axios.post('/api.php?ac=form_types'),
  /**
   * 表单状态数据
   */
  myflow: () => app.$axios.post('?ct=myflow'),
  /**
   * 列表数据
   */
  recordList: ({
    start_day,
    end_day,
    keyword,
    status,
    member,
    form_type_id,
    total,
    page_no,
    page_size
  }) =>
    app.$axios.post('?ct=myflow&ac=record_list', {
      start_day,
      end_day,
      keyword,
      status,
      member,
      form_type_id,
      total,
      page_no,
      page_size
    }),
  /**
   * 审批详情
   */
  recordDetailed: ({ record_id }) =>
    app.$axios.post('?ct=myflow&ac=record_detailed', { record_id }),
  /**
   * 审批
   */
  saveApprove: ({
    record_id,
    review_id,
    node_id,
    approve_type,
    job,
    review_users,
    need_verify,
    addon,
    to_member, // 123,123,123
    to_cc_member, // 123,123,123
    suggestion
  }) =>
    app.$axios.post('?ct=myreview&ac=save_approve', {
      record_id,
      review_id,
      node_id,
      approve_type,
      job,
      review_users,
      need_verify,
      addon,
      to_member,
      to_cc_member,
      suggestion
    }),

  /*
   * 获取全部审批
   */
  getAllApprove: (data) =>
    app.$axios.post('/api.php?ct=form&ac=all_form', data),

  /*
   * 获取申请人列表
   */
  getApproveUsers: ({ from, keyword }) =>
    app.$axios.post('?ct=myreview&ac=get_approve_users', { from, keyword }),
  /*
   * 获取申请人列表
   */
  getApproveBaseData: () =>
    app.$axios.post('?ct=myreview&ac=approve_list&isload=1'),
  /**
   * 获取我的审批列表
   */
  getApproveList: ({
    start_day,
    end_day,
    keyword,
    status,
    member,
    is_handel,
    form_type,
    page_no = 1,
    page_size = 20
  }) =>
    app.$axios.post('?ct=myreview&ac=approve_list', {
      start_day,
      end_day,
      keyword,
      status,
      is_handel,
      member,
      form_type,
      page_no,
      page_size
    }),
  /**
   * 获取抄送列表
   */
  getCCList: ({
    start_day,
    end_day,
    keyword,
    status,
    member,
    form_type,
    page_no = 1,
    page_size = 20
  }) =>
    app.$axios.post('?ct=myreview&ac=cc_list', {
      start_day,
      end_day,
      keyword,
      status,
      member,
      form_type,
      page_no,
      page_size
    }),
  /**
   * 邀请审批
   */
  saveSuggestion: ({ review_id, id, suggestion }) =>
    app.$axios.post('?ct=myreview&ac=save_suggestion', {
      review_id,
      id,
      suggestion
    }),
  /**
   * 添加申请,获取基础数据
   */
  myreviewApply: ({ form_id }) =>
    app.$axios.post('index.php?ct=myflow&ac=apply&init=1', {
      form_id
    }),
  /**
   * 获取部门数据
   */
  myreviewGetDepartments: ({ organization_id }) =>
    app.$axios.post('?ct=myflow&ac=get_departments', { organization_id }),
  /**
   * 获取岗位数据
   */
  myreviewGetStations: ({ department_id }) =>
    app.$axios.post('?ct=myflow&ac=get_stations', {
      department_id
    }),
  /**
   * 添加申请
   */
  myreviewApplyH5Save: (formData) =>
    app.$axios.post('/api.php?ct=myflow&ac=apply_h5_save', formData),

  /**
   * 申请下载
   */
  myApplyDownload: (recordId) =>
    app.$axios.post('/api.php?ct=myflow&ac=form_down', recordId),
  /**
   * 获取页眉，页脚，水印
   */
  getPDFImage: (recordId) =>
    app.$axios.post('/api.php?ct=form&ac=select_img_info', recordId)
})
