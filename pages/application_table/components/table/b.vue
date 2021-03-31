<template>
  <el-form ref="form" :model="form" label-width="100px">
    <el-form-item label="跨跃几列" prop="colspan">
      <el-input
        v-model="form.colspan"
        type="number"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary" @click="$emit('define', form)">确 定</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    isOpen: Boolean
  },
  data() {
    return {
      form: {
        type: 'B',
        row: 4,
        rowspan: 0,
        colspan: 4,
        values: [''],
        sort: '',
        tr: 1
      }
    }
  },
  watch: {
    isOpen(nv) {
      if (!nv) {
        setTimeout(() => {
          this.$refs.form.resetFields()
        }, 1000)
      }
    }
  }
}
</script>
