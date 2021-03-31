export default (app) => ({
  /**
   * 条件版本更新
   */
  saveVersion: ({ id, title, os, bound_id, app_url, version, tips, rules }) =>
    app.$axios.post('?ct=version&ac=save', {
      id,
      title,
      os,
      bound_id,
      app_url,
      version,
      tips,
      rules
    }),
  /**
   * 获取规则列表
   * https://yapi.aoidc.net/project/393/interface/api/6806
   */
  list: ({ page_no = 1, page_size = 20 }) =>
    app.$axios.post('?ct=version&ac=list_data', {
      page_no,
      page_size
    }),
  /**
   * 获取更新规则详情
   * https://yapi.aoidc.net/project/393/interface/api/6809
   */
  detail: (id) =>
    app.$axios.post('?ct=version&ac=detail', {
      id
    }),
  del: (id) =>
    app.$axios.post('?ct=version&ac=del', {
      id
    })
})
