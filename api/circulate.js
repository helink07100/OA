export default (app) => ({
  /**
   * 首页-流程中心-传阅,传阅列表
   */
  circulateSearchList: ({
    begin_time,
    end_time,
    keyword,
    type,
    status,
    create_user,
    total,
    page_no,
    page_size
  }) =>
    app.$axios.post('?ct=circulate&ac=ajax_search_lists', {
      begin_time,
      end_time,
      keyword,
      type,
      status,
      create_user,
      total,
      page_no,
      page_size
    }),
  /**
   * 我的传阅列表搜索表单，获取发起人列表
   */
  ajaxGetCreator: ({ keyword = '' } = {}) =>
    app.$axios.post('?ct=circulate&ac=ajax_get_creator', { keyword }),
  /**
   * 新增传阅
   */
  ajaxAddCirculate: ({ title, content, to_users, attach_url } = {}) =>
    app.$axios.post('?ct=circulate&ac=ajax_add_circulate', {
      title,
      content,
      to_users,
      attach_url
    }),
  /**
   * 获取详情
   */
  ajaxGetDetail: ({ circulate_id } = {}) =>
    app.$axios.post('?ct=circulate&ac=ajax_get_detail', {
      circulate_id
    }),
  /**
   * 提交评论表单数据
   */
  ajaxAddComment: ({ circulate_id, node_id, attach_url, comment } = {}) =>
    app.$axios.post('?ct=circulate&ac=ajax_add_comment', {
      circulate_id,
      node_id,
      attach_url,
      comment
    }),
  /**
   * 确认已阅
   */
  ajaxConfirm: ({ circulate_id, node_id } = {}) =>
    app.$axios.post('?ct=circulate&ac=ajax_confirm', {
      circulate_id,
      node_id
    }),
  /**
   * 邀请
   */
  ajaxInvite: ({ uids, circulate_id, node_id } = {}) =>
    app.$axios.post('?ct=circulate&ac=ajax_invite', {
      uids,
      circulate_id,
      node_id
    })
})
