<template>
  <el-form ref="form" :model="form" label-width="180px" class="text-form">
    <el-form-item
      :rules="[
        { required: true, message: '控件名称不能为空', trigger: 'blur' }
      ]"
      label="控件名称： "
      prop="name"
    >
      <el-input
        v-model="form.name"
        placeholder="控件名称，如：岗位选择"
      ></el-input>
    </el-form-item>
    <el-form-item label="控件英文名称：" prop="en_name">
      <el-input
        v-model="form.en_name"
        placeholder="控件英文名称，如：station"
      ></el-input>
    </el-form-item>
    <el-form-item label="提示文字1：" prop="placeholder">
      <el-input v-model="form.placeholder" placeholder="请选择部门"></el-input>
    </el-form-item>
    <el-form-item label="提示文字2：" prop="placeholder2">
      <el-input v-model="form.placeholder2" placeholder="请选择岗位"></el-input>
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
        placeholder2: '',
        verify: false,
        value: '',
        station_value: '',
        options: [],
        date_format: 'yyyy-MM-dd',
        component: 'Station'
      }
    }
  }
}
</script>
