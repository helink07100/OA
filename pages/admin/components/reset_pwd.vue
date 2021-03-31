<template>
  <oaDialog
    :dialog-visible="show"
    title="重置密码"
    width="500px"
    @close="$emit('close')"
  >
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item prop="pwd" label="新密码">
        <el-input
          v-model="form.pwd"
          show-password
          placeholder="必须大于6位，包含大小写字母和数字"
        ></el-input>
      </el-form-item>
      <el-form-item prop="is_first_login">
        <el-checkbox
          v-model="form.is_first_login"
          label="要求在下次登陆时更改密码"
        ></el-checkbox>
      </el-form-item>
      <div style="text-align: right;">
        <el-button plain @click="$emit('close')">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </div>
    </el-form>
  </oaDialog>
</template>

<script>
import oaDialog from '~/components/oa_dialog'
export default {
  components: {
    oaDialog
  },
  props: {
    show: Boolean
  },
  data() {
    return {
      form: {
        uid: (() => {
          return this.$route.query.id
        })(),
        pwd: '',
        type: 0,
        is_first_login: false
      },
      rules: {}
    }
  },
  created() {
    this.rules = this.getRules()
  },
  methods: {
    getRules() {
      return {
        pwd: this.$enum.rules.password
      }
    },
    async submitForm() {
      this.form.type = this.form.type ? 1 : 0
      this.form.is_first_login = this.form.is_first_login ? 1 : 0
      const res = await this.$api.admin.resetPassword(this.form)
      if (res) {
        this.$message.success(this.$t('修改成功'))
        this.$refs.form.resetFields()
      }
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('close')
          this.submitForm()
        } else {
          return false
        }
      })
    }
  }
}
</script>
