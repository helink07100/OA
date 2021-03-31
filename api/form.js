export default (app) => ({
  /**
   * 获取审批流程列表
   */
  getFormList: ({
    form_add,
    start_day,
    end_day,
    keyword,
    enable,
    form_type,
    page_no = 1,
    page_size = 20
  }) =>
    app.$axios.post('?ct=form&index', {
      form_add,
      start_day,
      end_day,
      keyword,
      enable,
      form_type,
      page_no,
      page_size
    }),
  /**
   * 获取审批单类型列表
   */
  getFormType: ({ page_no = 1, page_size = 20 }) =>
    app.$axios.post('?ct=form&ac=form_type', {
      page_no,
      page_size
    }),
  /**
   * 修改适用范围
   */
  formSetUser: ({
    form_id,
    top_organization,
    organizations,
    departments,
    stations,
    members
  }) =>
    app.$axios.post('?ct=form&ac=set_user', {
      form_id,
      top_organization,
      organizations,
      departments,
      stations,
      members
    }),
  /**
   * 审批单类型列表
   */
  getFormTypeList: ({ show }) =>
    app.$axios.post('?ct=form_type&ac=index', {
      show
    }),
  /**
   * 添加审批单类型
   */
  addFormType: ({ form_type_id, cn_name, en_name, job = 'add' }) =>
    app.$axios.post('?ct=form_type&ac=add', {
      form_type_id,
      cn_name,
      en_name,
      job
    }),
  /**
   * 修改审批单类型
   */
  editFormType: ({ form_type_id, cn_name, en_name, job = 'edit' }) =>
    app.$axios.post('?ct=form_type&ac=edit', {
      form_type_id,
      cn_name,
      en_name,
      job
    }),
  /**
   * 隐藏审批单类型，假删除
   */
  setHideShowFormType: ({ form_type_id, job = 'hide' }) =>
    app.$axios.post('?ct=form_type&ac=hide', {
      form_type_id,
      job
    }),
  /**
   * 审批流程管理启用、停用
   */
  setEnable: ({ form_id, enable }) =>
    app.$axios.post('?ct=form&ac=enable', {
      form_id,
      enable
    }),
  /**
   * 流程管理-创建表单
   */
  addForm: (data) => app.$axios.post('?ct=form&ac=add', data),
  /**
   * 流程管理-创建表单
   */
  editForm: ({
    form_id,
    icon,
    field_configs,
    form_name,
    form_en_name,
    form_type_id,
    prefix,
    form_sn_format,
    applied_range,
    description,
    verify_tips,
    default_tips
  }) =>
    app.$axios.post('?ct=form&ac=edit', {
      form_id,
      icon,
      field_configs,
      form_name,
      form_en_name,
      form_type_id,
      prefix,
      form_sn_format,
      applied_range,
      description,
      verify_tips,
      default_tips
    }),
  /**
   * 获取表单数据
   */
  getEditFormBaseData: (data) =>
    app.$axios.get('?ct=form&ac=edit&isload=1&form_id=' + data.form_id),
  /**
   * 获取审批流程
   */
  getFlowEditData: (data) =>
    app.$axios.get('?ct=flow&ac=edit&isload=1&form_id=' + data.form_id),
  /**
   * 编辑审批流程
   */
  flowEdit: ({
    enable = 1,
    flow_id,
    form_id,
    third_form_sn,
    default_cc,
    approver_filter,
    notify_cc,
    allow_edit
  }) =>
    app.$axios.post('?ct=flow&ac=edit', {
      enable,
      flow_id,
      form_id,
      third_form_sn,
      default_cc,
      approver_filter,
      notify_cc,
      allow_edit
    }),
  /**
   * 获取审批流程
   */
  flowNodeDelete: ({ id }) =>
    app.$axios.post('?ct=flow&ac=node_delete', {
      id
    }),
  /**
   * 编辑审批流程
   */
  SetFlowNodeAdd: (data) => app.$axios.post('?ct=flow&ac=node_add', data),
  /**
   * 编辑审批流程
   */
  flowNodeEdit: ({
    id,
    form_id,
    approvers = [],
    department_set,
    organization_set,
    user_type,
    cc_user_type,
    cc_mode,
    approve_pass,
    approve_type
  }) =>
    app.$axios.post('?ct=flow&ac=node_edit', {
      id,
      form_id,
      approvers,
      department_set,
      organization_set,
      user_type,
      cc_user_type,
      cc_mode,
      approve_pass,
      approve_type
    }),
  /**
   * 分条件审批list
   */
  getFlow: ({ form_id }) =>
    app.$axios.post('?ct=flow&ac=get_flow', {
      form_id
    }),
  /**
   * 获取 用户 数据 返回 ：{52_27: "Kris", 52_27: "Kris"...}
   */
  getUsername: ({ uids }) =>
    app.$axios.post('?ct=flow&ac=get_username', {
      uids
    }),
  /**
   * 审批条件数据配置
   */
  getFlowFormConfigs: ({ form_id }) =>
    app.$axios.post('?ct=flow&ac=get_form_configs', {
      form_id
    }),
  /**
   * 审批条件详情
   */
  getFlowDetail: ({ form_id, flow_id }) =>
    app.$axios.post('?ct=flow&ac=get_flow_detail', {
      form_id,
      flow_id
    }),
  /**
   * 审批条件详情
   */
  getPowerLevels: () => app.$axios.post('?ct=flow&ac=get_power_levels', {}),
  /**
   * 审批条件数据提交
   */
  flowMoreCondition: ({
    form_id,
    flow_id,
    third_form_sn,
    json_config, // String
    default_cc
  }) =>
    app.$axios.post('?ct=flow&ac=more_condition', {
      form_id,
      flow_id,
      third_form_sn,
      json_config,
      default_cc
    }),
  /**
   * 删除 分条件审批 的节点
   */
  deleteFlow: ({ flow_id }) =>
    app.$axios.post('?ct=flow&ac=delete_flow', {
      flow_id
    }),
  /**
   * 排序
   */
  flowSort: ({ flows }) =>
    app.$axios.post('?ct=flow&ac=modify_rank', {
      flows
    }),
  /**
   * 获取全部岗位
   */
  getAllStation: ({ id }) =>
    app.$axios.post(
      '?ct=form&ac=load_organization_sub&from=all_station&station',
      {
        id
      }
    ),
  /**
   * 表单下载设置
   */
  settingDownload: (data) =>
    app.$axios.post(`/api.php?ct=form&ac=form_img_set`, data),

  /**
   * 表单下载设置---预览
   */
  reViewSettingDownload: () =>
    app.$axios.get(`/api.php?ct=form&ac=img_set_review&isload=1`),
  /**
   * 表单下载设置---pdf预览
   */
  getPdfPreview: () => app.$axios.get(`?ct=form&ac=pdf_style_preview`),

  /**
   * 删除表单
   */
  deleteForm: (recordId) =>
    app.$axios.post('/api.php?ct=form&ac=del_form', recordId),
  /**
   * 流程预览
   */
  getFormView: (data) => app.$axios.post('?ct=form&ac=view', data),
  /**
   * 跨机构审核设置所有机构列表
   */
  getAllOrganizations: (data) =>
    app.$axios.post('/api.php?ct=tisi&ac=all_organizations', data)
})
