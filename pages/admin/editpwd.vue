<template>
  <LayoutPage title="修改密码" :loading="loading">
    <div class="page-content">
      <el-form
        ref="form"
        class="form-box"
        label-width="120px"
        :model="form"
        :rules="rules"
      >
        <el-form-item label="新密码" prop="password">
          <el-input
            v-model="form.password"
            show-password
            placeholder="必须大于6位，包含大小写字母和数字"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="passwordok">
          <el-input v-model="form.passwordok" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </LayoutPage>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    userInfo: {},
    form: {
      password: '',
      passwordok: '',
      realname: '',
      email: ''
    },
    rules: {}
  }),
  created() {
    this.rules = this.getRules()
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      this.loading = true
      const res = await this.$api.admin.getAdminInfo({})
      if (res) {
        this.userInfo = res.data
        this.form.realname = res.data.realname
        this.form.email = res.data.email
      }
      this.loading = false
    },
    getRules() {
      return {
        password: this.$enum.rules.password,
        passwordok: this.$enum.rules.checkPassword(this.form),
        email: {
          type: 'email',
          message: '请输入正确的邮箱地址',
          trigger: 'blur'
        }
      }
    },
    async submitForm() {
      this.loading = true
      const res = await this.$api.admin.adminEditpwd(this.form)
      if (res) {
        this.$message.success('修改成功')
      }
      this.loading = false
      this.form.password = ''
      this.form.passwordok = ''
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
</script>

<style lang="less" scoped></style>
