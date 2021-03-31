<template>
  <el-dialog
    :title="(form.type == 'add' ? '添加' : '编辑') + '菜单'"
    :visible.sync="showEditForm"
  >
    <el-form ref="dialogForm" :model="form" label-width="80px">
      <el-form-item label="图标">
        <el-input
          v-model="form.icon"
          placeholder="显示的icon (例如：iconfont icon-wode）"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="标题"
        prop="label"
        :rules="{ required: true, message: '标题不能为空' }"
      >
        <el-input
          v-model="form.label"
          placeholder="显示的label"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item label="菜单类型">
        <el-radio-group v-model="form.isLink">
          <el-radio-button :label="0">父菜单</el-radio-button>
          <el-radio-button :label="1">子菜单</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <template v-if="form.isLink == 1">
        <el-form-item label="显示菜单">
          <el-switch
            v-model="form.display"
            :active-value="1"
            :inactive-value="0"
          ></el-switch>
          <p class="text-info">勾选后表示此菜单会显示在页面导航列表</p>
        </el-form-item>
        <el-form-item
          label="ct"
          prop="ct"
          :rules="{ required: true, message: 'ct不能为空' }"
        >
          <el-input
            v-model="form.ct"
            placeholder="后台对应的ct"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="ac"
          prop="ac"
          :rules="{ required: true, message: 'ac不能为空' }"
        >
          <el-input
            v-model="form.ac"
            placeholder="后台对应的ac"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="路径"
          prop="path"
          :rules="{ required: true, message: '路径不能为空' }"
        >
          <el-input
            v-model="form.path"
            placeholder="页面url"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </template>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="showEditForm = false">取 消</el-button>
      <el-button type="primary" @click="formSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data: () => ({
    showEditForm: false,
    form: {
      type: 'add',
      isLink: 0,
      label: '',
      icon: '',
      path: '',
      ct: '',
      ac: '',
      display: 0
    }
  }),
  methods: {
    show(form) {
      this.form = form
      this.showEditForm = true
      this.$nextTick(() => {
        this.$refs.dialogForm.clearValidate()
      })
    },
    formSubmit() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          this.$emit('submit', this.form)
          this.showEditForm = false
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
