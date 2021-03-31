export default (app) => ({
  /**
   * 我的消息列表
   */
  getFilterList: ({ message_type, status, keyword, page_no, page_size }) =>
    app.$axios.post('?ct=message&ac=index', {
      message_type,
      status,
      keyword,
      page_no,
      page_size
    }),
  /**
   * 通知列表
   */
  getMessageLists: () =>
    app.$axios.post('?ct=message&ac=get_message_lists', {}),
  /**
   * 标记已读
   */
  setMessageRead: ({ id }) =>
    app.$axios.post('?ct=message&ac=message_read', { id }),
  /**
   * 获取通知消息数量
   */
  getMessageNums: () => app.$axios.post('?ct=message&ac=get_message_nums', {}),
  /**
   * 我的消息分类
   */
  getTypes: () => app.$axios.post('?ct=message&ac=get_types', {}),
  /**
   * 已读
   */
  setRead: ({ ids }) => app.$axios.post('?ct=message&ac=set_read', { ids }),
  /**
   * 已读
   */
  del: ({ ids }) => app.$axios.post('?ct=message&ac=del', { ids })
})
