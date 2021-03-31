<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="122px">
    <el-form-item label="类型名称：" prop="cn_name">
      <el-input
        v-model="form.cn_name"
        maxlength="15"
        placeholder="类型名称，最多15个字"
      ></el-input>
    </el-form-item>
    <el-form-item label="英文简称：" prop="en_name">
      <el-input
        v-model="form.en_name"
        maxlength="2"
        placeholder="最多2个英文字母，用于审批单编号使用"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="$emit('close', false)">取 消</el-button>
      <el-button type="primary" @click="submitForm('form')">
        {{ isEdit ? '修 改' : '添 加' }}
      </el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    isEdit: Boolean,
    formData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        cn_name: '',
        en_name: '',
        form_type_id: ''
      },
      rules: {
        cn_name: [
          {
            required: true,
            message: '请输入类型名称，最多15个字',
            trigger: 'blur'
          }
        ],
        en_name: [
          {
            required: true,
            message: '请输入英文简称，最多2个英文字母，用于审批单编号使用',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  watch: {
    isEdit() {
      if (this.isEdit && Object.keys(this.formData).length) {
        this.init()
      } else {
        this.resetFields()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    resetFields() {
      this.$refs.form.resetFields()
    },
    init() {
      this.form.cn_name = this.formData.cn_name
      this.form.en_name = this.formData.en_name
      this.form.form_type_id = this.formData.form_type_id
    },
    async addSubmitData() {
      const res = await this.$api.form.addFormType(this.form)
      if (res) {
        this.$message.success(res.msg)
        this.$emit('close', false)
        this.$refs.form.resetFields()
      }
    },
    async editSubmitData() {
      const res = await this.$api.form.editFormType(this.form)
      if (res) {
        this.$message.success(res.msg)
        this.$emit('close', false)
        this.$refs.form.resetFields()
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isEdit) {
            this.editSubmitData()
          } else {
            this.addSubmitData()
          }
        } else {
          this.$log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
