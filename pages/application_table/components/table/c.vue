<template>
  <el-form ref="form" :model="form" label-width="118px">
    <el-form-item label="第一列跨跃行数" prop="rowspan">
      <el-input
        v-model="form.rowspan"
        type="number"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item v-if="type === 'C'" prop="isfirstRow">
      <el-checkbox v-model="form.isfirstRow"
        >是否在第一列再分一列出来并与当前行数相同</el-checkbox
      >
    </el-form-item>
    <el-form-item label="列" prop="row">
      <el-input v-model="form.row" type="number" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary" @click="define">确 定</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        type: this.type,
        row: 4,
        rowspan: 2,
        colspan: 0,
        isfirstRow: true, // 只有 type === 'C' (当前模板) 的模板类型才有的字段
        values: ['', '', '', ''],
        sort: '',
        tr: 1
      }
    }
  },
  watch: {
    type(nv) {
      this.form.type = nv
      if (nv === 'C') {
        this.form.isfirstRow = true
        this.form.row = 5
      } else {
        this.form.row = 4
      }
    }
  },
  mounted() {
    this.form.type = this.type
  },
  methods: {
    define() {
      this.form.values = []
      const row = Number(this.form.row)
      for (let i = 0; i < row; i++) {
        this.form.values.push('')
      }
      console.log(this.form, 'this.form')
      if (this.type !== 'C') {
        delete this.form.isfirstRow
      }
      this.$emit('define', JSON.parse(JSON.stringify(this.form)))
    }
  }
}
</script>
