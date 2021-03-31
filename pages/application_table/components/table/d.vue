<template>
  <el-form ref="form" :model="form" label-width="118px">
    <el-form-item label="模板数据量" prop="tr">
      <el-input v-model="form.tr" type="number" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary" @click="define">确 定</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        type: 'D',
        row: 2,
        rowspan: 0,
        colspan: 4,
        values: ['', '', ''],
        sort: '',
        tr: 1
      }
    }
  },
  methods: {
    define() {
      this.form.values = []
      const row = Number(this.form.row)
      for (let i = 0; i < row; i++) {
        this.form.values.push('')
      }
      this.$emit('define', JSON.parse(JSON.stringify(this.form)))
    }
  }
}
</script>
