<template>
  <el-form ref="form" :model="form" label-width="180px" class="text-form">
    <el-form-item
      :rules="[
        { required: true, message: '开始时间名称不能为空', trigger: 'blur' }
      ]"
      label="开始时间名称："
      prop="name"
    >
      <el-input v-model="form.name" placeholder="开始时间名称"></el-input>
    </el-form-item>
    <el-form-item label="开始时间英文名称：" prop="en_name">
      <el-input
        v-model="form.en_name"
        placeholder="开始时间英文名称"
      ></el-input>
    </el-form-item>
    <el-form-item
      :rules="[
        { required: true, message: '结束时间名称不能为空', trigger: 'blur' }
      ]"
      label="结束时间名称："
      prop="name_end"
    >
      <el-input v-model="form.name_end" placeholder="结束时间名称"></el-input>
    </el-form-item>
    <el-form-item label="结束时间英文名称：" prop="en_name_end">
      <el-input
        v-model="form.en_name_end"
        placeholder="结束时间英文名称"
      ></el-input>
    </el-form-item>
    <el-form-item label="日期类型：" prop="date_format">
      <el-radio v-model="form.date_format" label="yyyy-MM-dd"
        >年-月-日</el-radio
      >
      <el-radio v-model="form.date_format" label="yyyy-MM-dd HH:mm">
        年-月-日 时 分</el-radio
      >
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
        name_end: '',
        en_name_end: '',
        verify: false,
        value: '',
        to_value: '',
        date_format: 'yyyy-MM-dd',
        component: 'DateRange'
      }
    }
  }
}
</script>
