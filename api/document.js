export default (app) => ({
  /**
   * 获取公文机构列表
   */
  getDocumentOrganization: (language) =>
    app.$axios.get('?ct=document&ac=get_all_organization_list'),
  /**
   * 机构公告列表
   */
  ajaxGetDocs: (data) => app.$axios.post('?ct=document&ac=ajax_get_docs', data),
  /**
   * 公告通知标题
   */
  cateLists: () => app.$axios.post('?ct=document&ac=get_cate_lists', {}),
  /**
   * 公文与公告详情
   */
  detailDoc: (data) => app.$axios.post('?ct=document&ac=detail', data),
  // 机构内公文：已读、未读下载
  getDocReadDownload: (data) =>
    app.$axios.post(
      `?ct=document&ac=download_excel&doc_id=${data.doc_id}`,
      data
    ),

  // 公文与公告 编辑
  editDoc: (data) => app.$axios.post(`?ct=document&ac=edit`, data),
  // 公文与公告 转发
  transferDoc: (data) =>
    app.$axios.post(`?ct=interagency&ac=reply_document`, data),
  /**
   * 公告属性列表
   */
  docTypeList: ({ page_no = 1, page_size = 20 } = {}) =>
    app.$axios.post('?ct=doc_type&ac=index', { page_no, page_size }),
  /**
   * 跨机构收文、发文 详情
   */
  interagencyLists: (data) =>
    app.$axios.post('?ct=interagency&ac=list_interagency', data),
  // 跨机构发文
  interagencyAdd: (data) =>
    app.$axios.post('?ct=interagency&ac=send_interagency_doc', data),
  /**
   * 机构收文、发文 详情
   */
  interagencyDetail: (data) =>
    app.$axios.post(
      `?ct=interagency&ac=interagency_detail&type=${data.type}&id=${data.id}`,
      data
    ),
  /**
   * 删除 机构收文、发文
   */
  interagencyDel: (id) => app.$axios.post('?ct=document&ac=delete', { id }),
  /**
   * 新增，修改公告属性
   */
  docTypeSave: ({ cate_name, cate_en_name, remark, id }) =>
    app.$axios.post('?ct=doc_type&ac=save', {
      cate_name,
      cate_en_name,
      remark,
      id
    }),
  /**
   * 新增，修改公告属性
   */
  docTypeDelete: ({ id }) =>
    app.$axios.post('?ct=doc_type&ac=delete', {
      id
    }),
  /**
   * 获取新增公告的基础数据
   */
  getAddBaseData: () => app.$axios.get('?ct=document&ac=configs'),
  /**
   * 新增公告
   */
  addDoc: (data) => app.$axios.post('?ct=document&ac=add', data),
  /**
   * 验证公文编号
   */
  isSnRepeat: ({ sn }) =>
    app.$axios.post('?ct=document&ac=is_sn_repeat', { sn }),

  /**
   * 草稿列表
   */
  draftLists: (data) => app.$axios.post('?ct=document&ac=list_draft', data),
  /**
   * 新增草稿
   */
  draftAdd: (data) => app.$axios.post('?ct=document&ac=save_draft', data),
  /**
   * 修改草稿
   */
  draftEdit: (data) => app.$axios.post('?ct=document&ac=update_draft', data),
  /**
   * 删除草稿
   */
  draftDel: (draft_id) =>
    app.$axios.post('?ct=document&ac=delete_draft', {
      draft_id
    }),
  /**
   * 草稿详情
   */
  draftDetail: (data) => app.$axios.post('?ct=document&ac=draft_detail', data),
  // 本机构---公文已读未读列表
  getRead: (data) => app.$axios.post(`?ct=document&ac=read_list`, data),

  // 跨机构---公文已读未读列表
  getInteragencyRead: (data) =>
    app.$axios.post(`?ct=interagency&ac=read_list`, data)
})
