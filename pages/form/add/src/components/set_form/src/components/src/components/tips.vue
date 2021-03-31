<template>
  <el-form ref="form" :model="form" label-width="140px" class="text-form">
    <el-form-item
      :rules="[
        { required: true, message: '说明文字不能为空', trigger: 'blur' }
      ]"
      label="说明文字："
      prop="name"
    >
      <el-input
        v-model="form.name"
        type="textarea"
        :rows="5"
        resize="none"
        placeholder="说明文字"
      ></el-input>
    </el-form-item>
    <el-form-item label="英文说明文字：" prop="en_name">
      <el-input
        v-model="form.en_name"
        type="textarea"
        :rows="5"
        resize="none"
        placeholder="英文说明文字"
      ></el-input>
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
        component: 'Tips'
      }
    }
  }
}
</script>
