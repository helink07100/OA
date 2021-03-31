export default (app) => ({
  /**
   * 搜索岗位
   * https://yapi.aoidc.net/project/570/interface/api/10825
   */
  queryOrganizationList: () => {
    return app.$axios.post('?ct=hr&ac=organization_list')
  },

  /**
   * 搜索岗位
   * https://yapi.aoidc.net/project/570/interface/api/11448
   */
  queryDepartmentList: ({ organization_id }) => {
    return app.$axios.post('?ct=hr&ac=department_list', {
      organization_id
    })
  },

  /**
   * 机构人员列表
   *
   * https://yapi.aoidc.net/project/570/interface/api/10832
   *
   * @param start_time
   * @param end_time
   * @param short_name
   * @param department_name
   * @param job_name
   * @param job_level
   * @param status
   * @param organization_id
   * @return {Promise<AxiosResponse<any>>}
   */
  queryMemberList: ({
    start_time,
    end_time,
    short_name,
    department_name,
    job_name,
    job_level,
    status,
    organization_id
  }) => {
    return app.$axios.post('?ct=hr&ac=hr_member_list', {
      start_time,
      end_time,
      short_name,
      department_name,
      job_name,
      job_level,
      status,
      organization_id
    })
  },

  /**
   *
   * 人员信息详情接口
   * https://yapi.aoidc.net/project/570/interface/api/10839
   *
   * @param member_id
   * @return {Promise<AxiosResponse<any>>}
   */
  queryMemberDetail: ({ member_id }) => {
    return app.$axios.post('?ct=hr&ac=hr_member_detail', {
      member_id
    })
  },

  /**
   * 人员列表--搜索岗位名称接口
   *
   * https://yapi.aoidc.net/project/570/interface/api/11658
   *
   * @return {Promise<AxiosResponse<any>>}
   */
  queryJobList: ({ organization_id }) => {
    return app.$axios.post('?ct=hr&ac=station_list', {
      organization_id
    })
  },

  /**
   * 人资列表--岗位等级下拉搜索接口
   * https://yapi.aoidc.net/project/570/interface/api/11665
   * @param organization_id
   * @return {Promise<AxiosResponse<any>>}
   */
  queryJobLevelList: ({ organization_id }) => {
    return app.$axios.post('?ct=hr&ac=level_list', {
      organization_id
    })
  }
})
