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
  data() {
    return {
      form: {
        type: (() => {
          return this.items.type
        })(),
        name: '',
        en_name: '',
        placeholder: '',
        verify: false,
        component: ''
      }
    }
  }
}
</script>
