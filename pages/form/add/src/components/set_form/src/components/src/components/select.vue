<template>
  <el-form ref="form" :model="form" label-width="140px" class="text-form">
    <el-form-item
      :rules="[
        { required: true, message: '控件名称不能为空', trigger: 'blur' }
      ]"
      label="控件名称： "
      prop="name"
    >
      <el-input v-model="form.name" placeholder="控件名称"></el-input>
    </el-form-item>
    <el-form-item label="控件名称英文：" prop="en_name">
      <el-input v-model="form.en_name" placeholder="控件名称英文"></el-input>
    </el-form-item>
    <el-form-item
      v-if="form.type != 'multi_select' && form.type != 'table'"
      label="提示文字："
      prop="placeholder"
    >
      <el-input v-model="form.placeholder" placeholder="请输入"></el-input>
    </el-form-item>
    <!-- 表格类型才会显示这一行 -->
    <el-form-item v-if="form.type == 'table'" label="默认行数：" prop="row">
      <el-col :span="6">
        <el-input v-model="form.row" placeholder="请输入"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item
      :label="form.type == 'table' ? '列标题：' : '选项：'"
      prop="options"
      :rules="[
        {
          type: 'array',
          required: true,
          validator: blockVaild,
          message: '请填写完整'
        }
      ]"
    >
      <div>
        <el-col :span="18">{{ optionsMsg }}</el-col>
        <el-col :span="6">
          <span class="text-primary cp" @click="options_add">+添加选项</span>
        </el-col>
      </div>
      <el-col :span="20">
        <el-row
          :gutter="20"
          v-for="(m, i) in form.options"
          :key="i"
          class="item pb-sm"
        >
          <el-col :span="10">
            <el-input
              v-model="form.options[i].label"
              placeholder="请输入"
              :validate-event="!!form.options[i].value"
            ></el-input>
          </el-col>
          <el-col v-if="!form.blockSortid" :span="10">
            <el-select
              v-model="form.options[i].value"
              placeholder="请选择隐藏区块"
              :style="{ width: '100%' }"
              clearable
            >
              <el-option
                v-for="(item, index) in blockList"
                :key="index"
                :label="item.label ? item.label : item"
                :value="item.value ? item.value : item"
              ></el-option>
            </el-select>
          </el-col>
          <el-col v-if="i > 0" :span="4">
            <span class="ml-md text-danger cp" @click="options_del(i)"
              >删除</span
            >
          </el-col>
        </el-row>
      </el-col>
    </el-form-item>
    <el-form-item label="验证：" prop="verify">
      <el-checkbox
        v-model="form.verify"
        label="必填 (勾选后申请人必须填写该控件才能提交表单)"
      ></el-checkbox>
    </el-form-item>
    <dialogFormButton @define="submitFrom" @close="$emit('close', false)" />
  </el-form>
</template>

<script>
import dialogFormButton from './dialog_form_button'
import accontrol from '@/mixins/accontrol'
export default {
  components: {
    dialogFormButton
  },
  mixins: [accontrol],
  computed: {
    blockList() {
      const list = this.$store.state.form.formControl.controlList.filter(
        (i) => {
          return i.type === 'block' && i.sortid !== this.items.blockSortid
        }
      )

      return list.map((i) => {
        return { value: i.sortid, label: i.name }
      })
    }
  },
  data() {
    return {
      optionsMsg: '最多50项，每项最多200字',
      optionsTitle: '选项',
      form: {
        type: (() => {
          return this.items.type
        })(),
        row: 3,
        name: '',
        en_name: '',
        placeholder: '',
        verify: false,
        options: (() => {
          return [{ label: '', value: '' }]
        })(),
        component: (() => {
          return this.items.component
        })()
      }
    }
  },
  methods: {
    options_del(i) {
      this.form.options.splice(i, 1)
    },
    options_add() {
      if (this.form.options.length >= 50) {
        this.$message.warning(this.optionsMsg)
        return
      }
      this.form.options.push({ label: '', value: '' })
    },
    blockVaild(rule, value, callback) {
      let vaild = true
      value.forEach((i) => {
        if (!i.label) vaild = false
      })

      if (!vaild) {
        return callback(new Error('请填写完整'))
      }
      return callback()
    }
  }
}
</script>
