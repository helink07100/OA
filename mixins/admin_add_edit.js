/**
 * 添加、修改、管理员
 */
export default {
  data: () => ({
    loading: true,
    organizations: [],
    departments: [],
    stations: [],
    groups: [],
    form: {
      id: '',
      username: '',
      password: '',
      realname: '',
      organization_id: '',
      department_id: '',
      station_id: '',
      groups: [],
      appro_permission: []
    },
    rules: {}
  }),
  computed: {
    organizationId() {
      return this.$store.state.user.user.organization_id
    }
  },
  created() {
    this.rules = this.getRules()
  },
  methods: {
    getRules() {
      return {
        password: this.$enum.rules.password,
        username: { required: true, message: '请输入用户名', trigger: 'blur' },
        realname: {
          required: true,
          message: '请输入展示姓名',
          trigger: 'blur'
        },
        organization_id: {
          required: true,
          message: '请输入归属机构',
          trigger: 'blur'
        },
        department_id: {
          required: true,
          message: '请输入虚拟部门',
          trigger: 'blur'
        },
        station_id: {
          required: true,
          message: '请输入虚拟岗位',
          trigger: 'blur'
        }
      }
    },
    async getDepartments() {
      const res = await this.$api.myflow.myreviewGetDepartments({
        organization_id: this.form.organization_id
      })
      if (res) {
        this.departments = res.data
      }
    },
    async getStation() {
      const res = await this.$api.myflow.myreviewGetStations({
        department_id: this.form.department_id
      })
      if (res) {
        this.stations = res.data
      }
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitForm()
        } else {
          return false
        }
      })
    }
  }
}
