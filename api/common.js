export default (app) => ({
  /**
   * 获取网站菜单json
   * // ${location.origin}/menus.json
   * // ?ct=index&ac=load_front_menu
   */
  getMenus: () => app.$axios.get(`?ct=index&ac=load_front_menu`),
  /**
   * 加载所有菜单
   */
  getAllMenus: () => app.$axios.get('?ct=index&ac=load_front_all_menu'),
  /**
   * 保存menu
   * { menu: "json字符串" }
   */
  saveMenus: (menu) =>
    app.$axios.post(`?ct=index&ac=save_front_menu`, { menu }),
  /**
   * 登录接口
   * https://www.showdoc.cc/awesomeoa?page_id=3338202746361214
   */
  login: ({ username, password }) =>
    app.$axios.post('/api.php?ac=login', { username, password }),
  logout: () => app.$axios.get('/api.php?ac=logout'),
  /**
   * 登录接口
   * https://www.showdoc.cc/awesomeoa?page_id=3338202746361214
   */
  resetPwd: ({ password, confpass, token }) =>
    app.$axios.post('?ct=index&ac=reset_pwd', {
      password,
      confpass,
      token
    }),
  /**
   * 忘记密码发送邮箱
   * https://www.showdoc.com.cn/awesomeoa?page_id=6218131628427749
   */
  forgetPwd: ({ username, email, token }) =>
    app.$axios.post('?ct=forget_pwd&ac=send_email', {
      username,
      email,
      token
    }),
  /**
   * 重置密码（忘记密码）
   * https://www.showdoc.com.cn/awesomeoa?page_id=6218139940684425
   */
  forgetAndResetPwd: ({ password, confpass, verify_token, token }) => {
    app.$axios.post('?ct=forget_pwd&ac=reset_pwd', {
      password,
      confpass,
      verify_token,
      token
    })
  },
  /**
   * 组织数据
   */
  memberSelectWhole: ({ organization_id, limit_rank }) =>
    app.$axios.post('?ct=tisi&ac=member_select_whole', {
      organization_id,
      limit_rank
    }),
  upload: ({ file }) =>
    app.$axios.post(`?ct=upload&ac=upload`, {
      file
    }),
  /**
   * 设置语言接口
   */
  setLang: (language) =>
    app.$axios.get(`?ct=index&ac=language_change&ajax=1&lang=${language}`),
  /**
   * 获取机构列表
   */
  getAllOrganization: (data) =>
    app.$axios.post('?ct=interagency&ac=k_list_all_organization', data)
})
