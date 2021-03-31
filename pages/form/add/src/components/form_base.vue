<template>
  <div class="form-base-box">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="180px"
      class="form-base"
    >
      <br />
      <br />
      <el-form-item label="流程名称（中文）：" prop="form_name">
        <el-col :span="22">
          <el-input
            v-model="form.form_name"
            placeholder="流程名称,最多50个字"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="流程名称（英文）：" prop="form_en_name">
        <el-col :span="22">
          <el-input
            v-model="form.form_en_name"
            placeholder="流程英文名称,最多50个字"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="表单前缀：" prop="prefix">
        <el-col :span="22">
          <el-input
            v-model="form.prefix"
            placeholder="最多25字，不可与其它表单前缀重复"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="流程类型：" required>
        <el-col :span="11">
          <el-form-item prop="form_type_id">
            <el-select
              v-model="form.form_type_id"
              placeholder="流程类型"
              :style="{ width: '90%' }"
            >
              <el-option
                v-for="(item, index) in formTypes"
                :key="index"
                :label="item.cn_name"
                :value="item.form_type_id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item
            label="流水号："
            label-width="118px"
            prop="form_sn_format"
          >
            <el-select
              v-model="form.form_sn_format"
              placeholder="请选择流水号"
              :style="{ width: '100%' }"
            >
              <el-option
                v-for="(val, key) in snCodeRules"
                :key="key"
                :label="val"
                :value="key"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="图标：" prop="icon">
        <el-col :span="22">
          <Avatar v-model="form.icon" :icons="icons" />
        </el-col>
      </el-form-item>
      <el-form-item label="适用范围：" prop="applied_range">
        <el-col :span="22">
          <Organization
            v-model="form.applied_range"
            btn-text="选择本机构人员"
            :top-organization-i-d="form.organization"
            from="member"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="备注：" prop="description">
        <el-col :span="22">
          <el-input
            v-model="form.description"
            type="textarea"
            placeholder="流程说明，最多100字"
            resize="none"
            rows="5"
          ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">下一步</el-button>
      </el-form-item>
      <br />
    </el-form>
  </div>
</template>

<script>
import Avatar from './base/avatar'
import Organization from '~/components/organization'
const icons = [
  'icon-guanlishenpi',
  'icon-woshenpide',
  'icon-chaosongwode',
  'icon-wofaqideshenpi',
  'icon-shenpishenqing',
  'icon-gongzuobaogao',
  'icon-dakakaoqin',
  'icon-gongzuojihua'
]

const rulesConfig = {
  form_name: [
    {
      required: true,
      message: '请输入流程名称，最多50字',
      trigger: 'change'
    }
  ],
  form_en_name: [
    {
      required: true,
      message: '请输入流程英文名称，最多50字',
      trigger: 'change'
    }
  ],
  form_type_id: [
    {
      required: true,
      message: '请选择流程类型',
      trigger: 'change'
    }
  ],
  prefix: [
    {
      required: true,
      message: '请输入流程编号前缀,最多25字，不可与其它表单前缀重复',
      trigger: 'change'
    }
  ],
  applied_range: [
    {
      required: true,
      message: '请选择适用范围',
      trigger: 'input'
    }
  ]
}
export default {
  components: {
    Avatar,
    Organization
  },
  props: {
    editData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      icons,
      form: {
        form_name: '',
        form_en_name: '',
        form_type_id: '',
        prefix: '',
        applied_range: '',
        form_sn_format: '',
        description: '',
        verify_tips: '',
        icon: 'icon-wofaqideshenpi',
        default_tips: ''
      },
      rules: rulesConfig,
      formTypes: [],
      snCodeRules: [],
      isSelectOrganization: false,
      organizationCheckeds: []
    }
  },
  computed: {
    organizations() {
      return this.$store.state.form.organizations
    }
  },
  watch: {
    editData(nvs) {
      const form = this.form
      for (const k in form) {
        if (k === 'form_sn_format') {
          const snCodeRules = nvs.sn_code_rules
          for (const snk in snCodeRules) {
            form.form_sn_format = snk
          }
        } else {
          form[k] = nvs[k]
        }
      }
      if (nvs.members) {
        this.form.applied_range = nvs.members
        const arrs = nvs.members.split(',')
        const newArrs = []
        for (let i = 0; i < arrs.length; i++) {
          if (arrs[i]) {
            newArrs.push(arrs[i])
          }
        }
        if (this.organizations.length) {
          const appliedRangeArray = this.$utils.common.ArrayGetOrgDataItem(
            arrs,
            this.organizations
          )
          this.organizationCheckeds = appliedRangeArray
        }
      }
    }
  },
  mounted() {
    this.getFormLists()
  },
  methods: {
    async getFormLists() {
      const params = {}
      if (!this.$route.query.form_id) {
        params.form_add = 1
      }

      // 因为后端把类型数据返回在了列表的接口页，
      const res = await this.$api.form.getFormList(params)
      if (res) {
        this.formTypes = res.data.form_types
        this.snCodeRules = res.data.sn_code_rules
        const snCodeRules = res.data.sn_code_rules
        for (const k in snCodeRules) {
          this.form.form_sn_format = k
        }
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$emit('saveBase', this.form)
          this.$emit('setStep', 1)
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.form-base-box {
  background: #fff;
}
.form-base {
  max-width: 1420px;
}
.approval_icon {
  margin-right: 10px;
  cursor: pointer;
  border-radius: 100%;
}
</style>
