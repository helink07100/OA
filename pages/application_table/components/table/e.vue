<template>
  <el-form ref="form" :model="form" label-width="50px">
    <!-- <el-form-item label="模板数据量" prop="tr">
      <el-input v-model="form.tr" type="number" autocomplete="off"></el-input>
    </el-form-item> -->
    <el-form-item label="选项" prop="options">
      <el-col :span="24">
        <span class="add-options ml-md text-primary cp" @click="options_add"
          >+添加选项</span
        >
      </el-col>
      <el-col :span="24">
        <el-row v-for="(m, i) in form.options" :key="i" class="item pb-sm">
          <el-col :span="18">
            <el-input v-model="form.options[i]" placeholder="请输入"></el-input>
          </el-col>
          <el-col :span="6">
            <span class="ml-md text-danger cp" @click="options_del(i)"
              >删除</span
            >
          </el-col>
        </el-row>
      </el-col>
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
    isOpen: Boolean,
    options: {
      type: Array,
      default: () => []
    },
    index: {
      type: [Number, String],
      default: 0
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isEdit: false,
      form: {
        type: this.type,
        row: 2,
        rowspan: 0,
        colspan: 4,
        values: [],
        options: (() => {
          if (this.options.length <= 0) {
            return ['']
          } else {
            return this.options
          }
        })(),
        sort: '',
        tr: 1
      }
    }
  },
  watch: {
    options(nvs) {
      this.form.options = nvs
    },
    index(nv) {
      if (nv >= 0) {
        this.isEdit = true
      } else {
        this.isEdit = false
      }
    },
    isOpen(nv) {
      this.form.type = this.type
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
      this.$emit(
        'define',
        JSON.parse(JSON.stringify(this.form)),
        this.isEdit,
        this.index
      )
    },
    options_add() {
      this.form.options.push('')
    },
    options_del(i) {
      this.form.options.splice(i, 1)
    }
  }
}
</script>
<style lang="less" scoped>
.add-options {
  float: right;
}
</style>
