export default (app) => ({
  /**
   * 获取当月的日程
   */
  getMonthList: ({ month, page_no = 1, page_size }) =>
    app.$axios.post('?ct=schedule&ac=lists', { month, page_no, page_size }),
  /**
   * 获取单条日程
   */
  getSchedule: ({ id }) =>
    app.$axios.post('?ct=schedule&ac=get_schedule_by_id', { id }),
  /**
   * 标记,册除,日程
   */
  scheduleStatus: ({ status, type, ids }) =>
    app.$axios.post('?ct=schedule&ac=status', { status, type, ids }),
  /**
   * 修改日程
   */
  scheduleSave: (submitData) =>
    app.$axios.post('?ct=schedule&ac=save', submitData)
})
