<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="122px">
    <el-form-item label="公告属性" prop="cate_name">
      <el-input v-model="form.cate_name" placeholder="公告属性"></el-input>
    </el-form-item>
    <el-form-item label="公告属性英文" prop="cate_en_name">
      <el-input
        v-model="form.cate_en_name"
        placeholder="公告属性英文"
      ></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="form.remark"
        type="textarea"
        placeholder="备注"
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
        cate_name: '',
        cate_en_name: '',
        remark: '',
        id: ''
      },
      rules: {
        cate_name: [
          { required: true, message: '请输入公告属性', trigger: 'change' }
        ],
        cate_en_name: [
          { required: true, message: '请输入公告属性英文', trigger: 'change' }
        ]
      }
    }
  },
  watch: {
    isEdit() {
      if (this.isEdit && Object.keys(this.formData).length) {
        this.init()
      } else {
        this.$refs.form.resetFields()
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (Object.keys(this.formData).length) {
        this.form.cate_name = this.formData.cate_name
        this.form.cate_en_name = this.formData.cate_en_name
        this.form.remark = this.formData.remark
        this.form.id = this.formData.id
      }
    },
    async submitData() {
      if (!this.isEdit) this.form.id = ''
      const res = await this.$api.document.docTypeSave(this.form)
      if (res) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.$emit('close', false)
        this.$refs.form.resetFields()
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submitData()
        } else {
          this.$log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
