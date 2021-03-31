<template>
  <Card title="设置">
    <el-form ref="form" :model="form" label-width="120px" class="default-form">
      <el-form-item label="审批人去重：">
        <el-col :span="7">
          <el-form-item prop="approver_filter">
            <el-select
              v-model="form.approver_filter"
              :style="{ width: '100%' }"
              placeholder="请选择"
            >
              <el-option
                v-for="item in approver_filters"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item
            label="通知抄送人："
            label-width="180px"
            prop="notify_cc"
          >
            <el-select
              v-model="form.notify_cc"
              :style="{ width: '100%' }"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item in notify_ccs"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <br />
      <el-form-item>
        <el-button
          class="mr-lg"
          type="primary"
          plain
          @click="$emit('setStep', 1)"
        >
          上一步
        </el-button>
        <el-button type="primary" @click="$emit('submit', form)"
          >完成设置</el-button
        >
      </el-form-item>
    </el-form>
  </Card>
</template>

<script>
import Card from '~/components/page/card'
const approver_filters = [
  {
    label: '不启用自动去重',
    value: 0
  },
  {
    label: '同一审批人出现多次时，仅保留第一个',
    value: 1
  },
  {
    label: '同一审批人仅连续出现时，才自动去重',
    value: 2
  }
]
const notify_ccs = [
  //   {
  //     label: '仅全部同意后通知',
  //     value: 1
  //   },
  {
    label: '发起时通知',
    value: 2
  }
]
const allow_edits = [
  {
    label: '允许编辑',
    value: 1
  },
  {
    label: '禁止编辑',
    value: 0
  }
]
export default {
  components: {
    Card
  },
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      approver_filters,
      notify_ccs,
      allow_edits,
      form: {
        approver_filter: '',
        notify_cc: '',
        allow_edit: ''
      }
    }
  },
  watch: {
    options(nvs) {
      nvs.notify_cc = 2
      this.form = nvs
    }
  },
  mounted() {
    this.$bus.$on('saveBeforeNewCondition', this.saveSubmit)
  },
  methods: {
    saveSubmit(link) {
      this.form.saveToLink = link
      this.$emit('submit', this.form)
    }
  }
}
</script>
