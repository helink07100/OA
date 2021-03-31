<template>
  <Card :title="title" :loading="setApproverLoading">
    <div v-if="pageLoadName === 'flow_edit'" slot="other">
      <i class="ml-md iconfont icon-Group text-danger fs-fourteen"></i>
      <label class="text-danger"
        >若指定审批人空缺，由组织架构中的上级主管代审批</label
      >
    </div>
    <el-form ref="form" :model="form" label-width="120px" class="default-form">
      <el-form-item
        label="审批流程："
        prop="submiteNodes"
        :rules="
          pageLoadName !== 'flow_edit'
            ? [
                {
                  required: true,
                  message: '请选择',
                  trigger: 'change'
                }
              ]
            : []
        "
      >
        <div class="cf">
          <div v-for="(item, index) in nodes" :key="index" class="fl mb-sm">
            <ApproverNodes
              :key="index"
              :title="item.item_info ? item.item_info : '-'"
              :desc="item.pass_type"
              :type="item.user_type"
              :cross="computedCross(item)"
              :pointer="true"
              :is-line="nodes.length - 1 == index ? false : true"
              @close="approverNodesDel(item, index)"
              @edit="approverNodesEdit(item, index)"
            />
          </div>
          <ApproverSelect
            class="ml-lg fl add-approver"
            :list="userTypes"
            @selectChange="selectChange"
          />
        </div>
      </el-form-item>
      <br />
      <br />
      <el-form-item>
        <slot name="submitButton"></slot>
      </el-form-item>
    </el-form>
    <component
      :is="user_type ? 'SetApprover' : ''"
      :show="setApproverShow"
      :user-type="user_type"
      :title="setApproverTitle"
      :edit-items="defaultItems"
      :is-loading="setApproverLoading"
      :isCC="isCC"
      :cc_user_type="cc_user_type"
      :top-organization-i-d="topOrganizationID"
      @cancel="hideApprover"
      @ondefine="defineHandle"
    ></component>
  </Card>
</template>

<script>
import Card from '~/components/page/card'
import ApproverNodes from '~/components/approver_nodes'
import ApproverSelect from '~/components/approver_select/index'
import mixinsFlowNodes from '@/mixins/flow_nodes'
import SetApprover from '~/pages/form/components/set_approver'
import Organization from '~/components/organization'
export default {
  components: {
    Card,
    ApproverNodes,
    SetApprover,
    Organization,
    ApproverSelect
  },
  mixins: [mixinsFlowNodes],
  props: {
    form_id: {
      default: 0,
      type: Number
    },
    title: {
      type: String,
      default: '默认审批流程'
    },
    pageLoadName: {
      type: String,
      default: 'flow_edit'
    },
    flowId: {
      type: String,
      default: ''
    },
    nodes: {
      type: Array,
      default: () => []
    },
    ccList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      setApproverShow: false,
      setApproverLoading: false,
      isCC: false, // 是否是抄送
      cc_user_type: '', // 抄送类型
      ccSelectOrganizationShow: false,
      defaultCcs: [],
      nodesNumberId: 10000, // 公前端使用，
      // 指定哪个机构
      topOrganizationID: '',
      form: {
        submiteNodes: [],
        default_cc: ''
      },
      user_type: '',
      setApproverTitle: '',
      rules: {},
      defaultItems: {}, // 用于设置编辑节点的默认值
      nodeIndex: ''
    }
  },
  computed: {
    organizationId() {
      return this.$store.state.user.user.organization_id
    }
  },
  watch: {
    flowId(nv) {
      this.flow_id = nv
    },
    nodes(nvs) {
      this.form.submiteNodes = nvs
    },
    ccList(nvs) {
      this.defaultCcs = nvs
      const ccs = this.$utils.common.getIds(nvs)
      this.form.default_cc = ccs.join(',')
    }
  },
  mounted() {
    this.getCrossOrangization()
  },
  methods: {
    computedCross(item) {
      if (item.cross !== undefined) {
        return item.cross

        // 分条件审批时用到
      } else if (item.organization_id) {
        return this.organizationId === item.organization_id ? 0 : 1
      }
      return 0
    },
    async getCrossOrangization() {
      const res = await this.$api.form.getAllOrganizations()
      if (res) {
        // 选跨机构、需要把本机构的过滤掉
        this.userTypes[4].child = res.data.filter((i) => {
          return i.id !== this.organizationId
        })
      }
    },
    async nodesDel(item) {
      const res = await this.$api.form.flowNodeDelete({ id: item.id })
      if (res) {
        this.$message.success('节点删除成功')
        this.$emit('loadnewdata')
      }
    },
    approverNodesDel(item, index) {
      this.$confirm('你确定要删除该节点吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (this.pageLoadName !== 'flow_edit') {
            this.$emit('delnodes', index)
            return
          }
          this.nodesDel(item)
          setTimeout(() => {
            this.$refs.form.validateField('submiteNodes')
          }, 800)
        })
        .catch(() => {})
    },
    // 编辑
    approverNodesEdit(item, index) {
      const m = this.userTypes.find((m) => item.user_type === m.value)
      let mm = ''
      if (m.child && m.child.length) {
        mm = m.child.find((m) => item.cc_user_type === m.value)
      }
      this.user_type = item.user_type
      this.cc_user_type = item.cc_user_type
      this.isCC =
        typeof item.isCC === 'boolean' ? item.isCC : !!item.cc_user_type
      this.setApproverTitle =
        item.user_type === 'cc_person' && mm
          ? m.label + (mm.value !== 'member' ? '申请人' : '') + mm.label
          : ''
      this.defaultItems = item
      this.setApproverShow = true

      if (Number(index) !== 'NaN') {
        this.nodeIndex = index
      } else {
        this.nodeIndex = ''
      }
    },
    // 新增
    selectChange(item) {
      this.cc_user_type = item.cc_user_type
      this.isCC = item.isCC
      this.topOrganizationID = item.organization_id
      this.user_type = item.value
      this.setApproverTitle = item.label
      this.defaultItems = {}
      this.setApproverShow = true

      // 如果指定指定抄送人，cc_mode = 1
      if (item.isCC && item.value === 'member') {
        this.defaultItems.cc_mode = 1
      }
    },
    hideApprover() {
      this.setApproverShow = false
      this.user_type = ''
    },
    async defineHandle(formData) {
      formData = JSON.parse(JSON.stringify(formData))
      this.setApproverShow = false
      this.setApproverLoading = true
      const approvers = this.$utils.common.getIds(formData.checkeds)

      const submitData = Object.assign(formData, {
        approvers,
        organization_id: this.topOrganizationID
          ? this.topOrganizationID
          : this.organizationId,

        // 抄送选择类型会根据类型设置user_type, user_type控制弹窗选择人或部门等，所以这边改比较好
        user_type: this.isCC ? 'cc_person' : this.user_type,
        form_id: this.form_id,
        flow_id: this.flow_id
      })
      if (submitData.department_set.length <= 0) {
        submitData.department_set[0] = null
      }
      if (submitData.organization_set.length <= 0) {
        submitData.organization_set[0] = null
      }
      if (this.nodeIndex !== '') {
        this.form.submiteNodes[this.nodeIndex] = submitData
      } else {
        this.form.submiteNodes.push(submitData)
      }
      this.nodeIndex = ''

      // 默认审批--------- 新增条件-审批条件设定页才会执行到这里
      if (this.pageLoadName === 'flow_condition') {
        this.$emit('approverchange', this.form)
        setTimeout(() => {
          this.$refs.form.validateField('submiteNodes')
        }, 800)
        return
      }
      // ----------------------------------------------------------------------------------
      delete formData.checkeds

      if (Object.keys(this.defaultItems).length) {
        // 编辑
        delete submitData.flow_id
        submitData.id = this.defaultItems.id
        const res = await this.$api.form.flowNodeEdit(submitData)
        if (res) {
          this.$message.success('修改成功')
        }
      } else {
        const res = await this.$api.form.SetFlowNodeAdd(submitData)
        if (res) {
          this.$message.success('设置成功')
        }
      }
      this.form.submiteNodes = []
      this.$emit('loadnewdata')
      this.setApproverLoading = true
    },
    ccInitComplete() {
      setTimeout(() => {
        this.$refs.ccSelectOrganization.set_checked_data(this.defaultCcs)
      }, 500)
    },
    organizationChange($event) {
      this.$emit('submit', this.form.default_cc)
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.oa-dialog {
  // z-index: 3000 !important;
}
.add-approver {
  margin-top: 17px;
}
</style>
