<template>
  <LayoutPage :loading="loading">
    <defaultApprover
      :flow-id="String(form.flow_id)"
      :nodes="nodes"
      :cc-list="defaultCcs"
      :form_id="form_id"
      @loadnewdata="getFlowEditData()"
      @submit="HandleSubmitData"
    />
    <conditionalApproval
      :list="conditionalApprovals"
      :form_id="form_id"
      :flow-id="String(form.flow_id)"
      @loadnewdata="getFlowEditData()"
    />
    <Set
      :form_id="form_id"
      :options="setForm"
      @submit="submitForm"
      @setStep="$emit('setStep', 1)"
    />
  </LayoutPage>
</template>
<script>
import defaultApprover from './audit/default_approver'
import conditionalApproval from './audit/conditional_approval'
import Set from './audit/set'
import form_steps from '@/mixins/form_steps'
export default {
  components: {
    defaultApprover,
    conditionalApproval,
    Set
  },
  mixins: [form_steps],
  props: {
    form_id: {
      default: 0,
      type: Number
    }
  },
  data() {
    return {
      loading: false,
      nodes: [],
      conditionalApprovals: [],
      defaultCcs: [],
      form: {
        enable: 1,
        flow_id: '',
        form_id: '',
        third_form_sn: '',
        default_cc: ''
      },
      setForm: {}
    }
  },
  watch: {
    form_id: {
      immediate: true,
      handler(nv, ov) {
        if (nv) {
          this.getFlowEditData(nv)
        }
      }
    }
  },
  mounted() {
    this.steps.forEach((item) => {
      item.active = true
    })
  },
  methods: {
    HandleSubmitData(default_cc) {
      this.form.default_cc = default_cc
    },
    async getFlowEditData(form_id) {
      this.loading = true
      this.form.form_id = this.form_id
      const res = await this.$api.form.getFlowEditData({
        form_id: this.form.form_id
      })
      if (res) {
        this.form.flow_id = res.data.flow.set.flow_id
        this.nodes = res.data.flow.nodes
        this.conditionalApprovals = res.data.flows
        this.setForm = {
          notify_cc: res.data.flow.set.notify_cc,
          allow_edit: res.data.flow.set.allow_edit,
          approver_filter: res.data.flow.set.approver_filter
        }
        const ccs = this.$utils.common.getIds(
          res.data.flow.default_cc,
          'Object'
        )
        // 用人员ID取抄送人相关数据
        const organizations = this.$store.state.form.organizations
        this.defaultCcs = this.$utils.common.ArrayGetOrgDataItem(
          ccs,
          organizations
        )
        this.form.default_cc = String(ccs.join(','))
      }
      this.loading = false
    },
    async submitForm(setFrom) {
      this.loading = true
      const submitForm = Object.assign(setFrom, this.form)
      const res = await this.$api.form.flowEdit(submitForm)
      if (res) {
        this.$message.success('提交成功')
        this.$router.push('/form')
      }
      this.loading = false
    }
  }
}
</script>
