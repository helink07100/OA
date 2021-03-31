export default (app) => ({
  // 获取管理员列表
  adminList: ({ page_no = 1, page_size, cur_group, keyword } = {}) =>
    app.$axios.post(`?ct=admin&ac=index`, {
      page_no,
      page_size,
      cur_group,
      keyword
    }),
  // 获取子管理员列表
  getCAdminList: (data) => app.$axios.post(`?ct=admin&ac=list_subadmin`, data),
  // 添加子管理员
  addChildAdmin: (data) =>
    app.$axios.post(`?ct=admin&ac=add_perminister`, data),
  // 获取我的权限
  mypurview: () => app.$axios.get('/api.php?ct=admin&ac=mypurview&isload=1'),
  // 获取用户组列表
  groupList: ({ page = 1, keyword = '' } = {}) =>
    app.$axios.post('/api.php?ct=admin_group&ac=index&isload=1', {
      page,
      keyword
    }),
  // 获取用户组详情
  groupDetail: (id) =>
    app.$axios.get(`/api.php?ct=admin_group&ac=edit&id=${id}&isload=1`),
  // 添加用户组
  groupAdd: ({ name }) =>
    app.$axios.post(`/api.php?ct=admin_group&ac=add`, {
      name
    }),
  // 编辑用户组
  groupEdit: ({ id, name, purviews }) =>
    app.$axios.post(`/api.php?ct=admin_group&ac=edit`, {
      id,
      name,
      purviews
    }),
  // 修改密码
  adminEditpwd: ({ password, passwordok, realname, email }) =>
    app.$axios.post(`?ct=admin&ac=editpwd`, {
      password,
      passwordok,
      realname,
      email
    }),
  // 修改密码
  getAdminInfo: () => app.$axios.get(`?ct=admin&ac=editpwd&isload=1`),
  // 添加管理员
  add: ({
    username,
    password,
    groups,
    realname,
    appro_permission,
    organization_id,
    department_id,
    station_id
  }) =>
    app.$axios.post(`?ct=admin&ac=add&isajax=1`, {
      username,
      password,
      groups,
      realname,
      organization_id,
      appro_permission,
      department_id,
      station_id
    }),
  // 修改管理员
  edit: ({
    id,
    groups, // (多个组用逗号分隔)
    realname, //
    organization_id, //
    department_id, //
    station_id, //
    appro_permission,
    session_expire, //  会话超时时间（秒）
    disable //  是否禁用（0[否] 1[是]）
  }) =>
    app.$axios.post(`?ct=admin&ac=edit&isajax=1`, {
      id,
      groups,
      realname,
      organization_id,
      department_id,
      station_id,
      session_expire,
      appro_permission,
      disable
    }),
  // 加载add基础数据
  getAdminAddBaseData: () => app.$axios.get(`?ct=admin&ac=add&isload=1`),
  // 加载edit基础数据
  getAdminEditBaseData: ({ id }) =>
    app.$axios.get(`?ct=admin&ac=edit&isload=1&id=${id}`),
  // 重设用户密码
  resetPassword: ({
    uid,
    pwd,
    type = 0, // 0普通密码  1一次性密码（建议默认0）
    is_first_login = 0 // 是否重设为首次登陆 1是，0否(建议默认0)
  }) =>
    app.$axios.post(`?ct=admin&ac=create_pwd`, {
      uid,
      pwd,
      type,
      is_first_login
    }),
  // 普通员工列表
  getIndexBase: ({ keyword, cur_group, page_no, page_size }) =>
    app.$axios.post(`?ct=admin&ac=index_base`, {
      keyword,
      cur_group,
      page_no,
      page_size
    }),
  // 禁用与激活
  adminActive: ({
    ids, // []
    is_active // 0/1
  }) =>
    app.$axios.post(`?ct=admin&ac=active`, {
      ids,
      is_active
    }),
  // 操作日志列表
  oplog: ({ date_sta, date_end, uid, keyword, page_no, page_size }) =>
    app.$axios.post(`?ct=admin&ac=oplog`, {
      date_sta,
      date_end,
      uid,
      keyword,
      page_no,
      page_size
    }),
  // 操作日志列表,加载基础数据, 主要是会用到 user_options 用户列表的数据
  getOplog: () => app.$axios.get(`?ct=admin&ac=oplog&isload=1`),
  // 删除操作日志列表
  oplogDel: ({ ids }) =>
    app.$axios.post(`?ct=admin&ac=oplog_del`, {
      ids
    }),
  // 登录日志列表
  loginLog: ({ date_sta, date_end, uid, keyword, page_no, page_size }) =>
    app.$axios.post(`?ct=admin&ac=login_log`, {
      date_sta,
      date_end,
      uid,
      keyword,
      page_no,
      page_size
    }),
  // 删除登录日志列表
  loginLogDel: ({ ids }) =>
    app.$axios.post(`?ct=admin&ac=login_log_del`, {
      ids
    }),

  // 跨机构管理列表
  getInteragencyPermissionList: () =>
    app.$axios.post(`?ct=interagency&ac=interagency_permission_list`),
  // 跨机构管理 新增
  addInteragencyPermission: (data) =>
    app.$axios.post(`?ct=interagency&ac=interagency_permission_add`, data),
  // 跨机构管理 新增
  editInteragencyPermission: (data) =>
    app.$axios.post(`?ct=interagency&ac=interagency_permission_update`, data),
  // 设置邮箱通知
  setEmail: (data) => app.$axios.post(`?ct=admin&ac=set_email`, data),
  // 获取审核权限列表
  getPermission: (data) =>
    app.$axios.post(`?ct=admin&ac=get_appro_premission`, data)
})
