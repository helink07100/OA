<template>
  <el-form ref="form" :model="form" label-width="50px">
    <el-form-item label="列" prop="row">
      <el-input v-model="form.row" type="number" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="行" prop="tr">
      <el-input
        v-model="form.tr"
        type="number"
        minlength="1"
        autocomplete="off"
      ></el-input>
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
    isOpen: Boolean
  },
  data() {
    return {
      form: {
        type: 'A',
        row: 4,
        rowspan: 0,
        colspan: 0,
        values: ['', '', '', ''],
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
