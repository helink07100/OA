<template>
  <PageCard :title="$t('表单内容')" class="form-content pb-lg">
    <el-form label-width="170px" required="false" :disabled="true">
      <draggable
        :form-control="formControl"
        :put="true"
        block-sortid=""
        block-index=""
        :show-block="true"
      ></draggable>
    </el-form>
    <div v-if="formControl.controlList" class="fx-center">
      <el-button
        class="mr-lg"
        type="primary"
        plain
        @click="$emit('setStep', 0)"
      >
        上一步
      </el-button>
      <el-button type="primary" @click="$emit('submit')">下一步</el-button>
    </div>
  </PageCard>
</template>
<script>
import { mapState } from 'vuex'
import draggable from '@/components/control_form/draggable'
export default {
  components: {
    draggable
  },
  data() {
    return {}
  },
  provide() {
    return {
      lang: ''
    }
  },
  computed: {
    ...mapState({
      formControl: (state) => state.form.formControl
    })
  }
}
</script>
