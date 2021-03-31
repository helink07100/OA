<template>
  <dialogOrganization
    ref="selectOrganization"
    :dialog-title="title"
    :dialog-visible="show"
    :from="realUserType"
    :node-key="realUserType == 'station' ? 'id' : 'key'"
    :is-all-station="realUserType == 'station' ? true : false"
    :organization-hide="hasOrganization()"
    width="45%"
    @definite="dialog_select_org_definite"
    @init-complete="initComplete"
    :topOrganizationID="topOrganizationID"
    @cancel="$emit('cancel')"
    :form="form"
    :isCC="isCC"
  >
    <div slot="other" class="approver-content">
      <br />
      <br />
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item
          v-if="
            realUserType === 'department' || realUserType === 'organization'
          "
          label="审批人"
        >
          <el-radio-group
            v-if="realUserType === 'department'"
            v-model="form.department_set"
          >
            <el-radio
              v-for="item in departmentSets"
              :key="item.label"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
          <el-radio-group
            v-else-if="realUserType === 'organization'"
            v-model="form.organization_set"
          >
            <el-radio
              v-for="item in organizationSets"
              :key="item.label"
              :label="item.value"
            >
              {{ item.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审批类型" v-if="!isCC">
          <el-select v-model="form.approve_type" :style="{ width: '100%' }">
            <el-option
              v-for="item in applicantTypes"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="抄送模式" v-else>
          <el-select v-model="form.cc_mode" :style="{ width: '100%' }">
            <el-option
              v-for="item in ccTypes"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </dialogOrganization>
</template>

<script>
import dialogOrganization from '~/components/dialog_select_organization'
import mixinsFlowNodes from '@/mixins/flow_nodes'
export default {
  components: {
    dialogOrganization
  },
  mixins: [mixinsFlowNodes],
  props: {
    topOrganizationID: {
      type: [String, Number],
      default: ''
    },
    editItems: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: '标题'
    },
    isCC: Boolean,
    cc_user_type: String,
    show: Boolean,
    userType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        department_set: (() => {
          let set = ''
          if (typeof this.editItems.department_set === 'string') {
            set = this.editItems.department_set
          } else if (Array.isArray(this.editItems.department_set)) {
            set = this.editItems.department_set.split(',')
          }
          return set
        })(),
        organization_set: (() => {
          let set = ''
          if (typeof this.editItems.organization_set === 'string') {
            set = this.editItems.organization_set
          } else if (Array.isArray(this.editItems.organization_set)) {
            set = this.editItems.organization_set.split(',')
          }
          return set
        })(),
        approve_pass: (() => {
          if (this.editItems.approve_pass) return this.editItems.approve_pass
          return 'order'
        })(),
        approve_type: (() => {
          if (this.editItems.approve_type) return this.editItems.approve_type
          return 'operator'
        })(),
        cc_mode: this.editItems.cc_mode
      },
      selectOrganizationShow: false
    }
  },
  computed: {
    realUserType() {
      return this.cc_user_type || this.userType
    }
  },
  methods: {
    initComplete() {
      if (!Object.keys(this.editItems).length) return
      let approvers = this.editItems.approvers
      if (approvers instanceof String) {
        approvers = this.editItems.approvers.split(',')
      }
      if (approvers.length) {
        setTimeout(() => {
          this.$refs.selectOrganization.set_checked_data(approvers, 'keys')
        }, 800)
      }
    },
    hasOrganization() {
      if (
        this.realUserType === 'station' ||
        (this.realUserType === 'department' &&
          this.form.department_set === 'appoint') ||
        this.realUserType === 'member'
      ) {
        return false
      }
      return true
    },
    dialog_select_org_definite(checkeds) {
      if (!this.hasOrganization() && (!checkeds || checkeds.length === 0)) {
        this.$message.error('请至少勾选一项')
        return
      }
      const userTypeItem = this.userTypes.find(
        (item) => item.value === this.userType
      )
      const passTypeItem = this.approvePass.find(
        (item) => item.value === this.form.approve_pass
      )
      const itemInfo = this.approveTypes.find(
        (item) => item.value === this.form.approve_type
      )
      this.form.pass_type =
        passTypeItem.label.split('（')[0] +
        '/' +
        (itemInfo ? itemInfo.label.split('（')[0] : '')

      this.form.checkeds = checkeds

      if (
        (this.userType === 'member' || this.userType === 'station') &&
        !this.form.checkeds.length
      ) {
        this.$message.error('请选择节点')
        return
      }

      //  这个需要前端设置
      let info = ''
      const param = JSON.parse(JSON.stringify(this.form))

      if (userTypeItem.value === 'member') {
        info = checkeds[0].name
        const len = checkeds.length
        if (len > 1) {
          info += `等${len}人`
        }
      } else if (userTypeItem.value === 'station') {
        info = checkeds[0].name
        const len = checkeds.length
        if (len > 1) {
          info += `等${len}岗位`
        }
      } else if (userTypeItem.value === 'department') {
        const len = checkeds.length
        if (len > 0) {
          info = checkeds[0].name
          if (len > 1) {
            info += `等${len}部门`
          }
        } else {
          info = '部门审批'
        }
      } else if (userTypeItem.value === 'organization') {
        info = '机构审批'
      }

      // 数据类型转换
      if (typeof param.department_set === 'string') {
        param.department_set = param.department_set.split(',')
      } else if (typeof param.department_set === 'boolean') {
        param.department_set = []
      }
      // 数据类型转换
      if (typeof param.organization_set === 'string') {
        param.organization_set = param.organization_set.split(',')
      } else if (typeof param.organization_set === 'boolean') {
        param.organization_set = []
      }

      param.approve_type = this.isCC ? 'cc' : param.approve_type
      param.item_info = info
      param.cc_user_type = this.cc_user_type ? this.cc_user_type : this.userType
      this.$emit('ondefine', param)
      this.$refs.selectOrganization.set_checked_data([])
    }
  }
}
</script>
