<template>
  <el-form-item :style="{ 'text-align': 'right' }">
    <el-button @click="$emit('close', false)">取消</el-button>
    <el-button type="primary" @click="validForm">确定</el-button>
  </el-form-item>
</template>
<script>
export default {
  methods: {
    // 添加form的校验
    validForm() {
      this.$parent.$parent.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('define', 'form')
        } else {
          return false
        }
      })
    }
  }
}
</script>
