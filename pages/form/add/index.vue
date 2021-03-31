<template>
  <LayoutPage
    :title="form_id ? $t('编辑流程') : $t('新增流程')"
    :loading="loading"
  >
    <oaSteps
      :lists="steps"
      :active="step + 1"
      :style="{ padding: '0 80px 50px 80px' }"
    />
    <div class="content">
      <keep-alive>
        <formBase
          v-if="step === 0"
          :edit-data="editData"
          @setStep="setStep"
          @saveBase="saveBase"
        />
        <SetForm
          v-else-if="step === 1"
          class="no-pd-form"
          :base-form="form"
          @setStep="setStep"
          @setFormId="form_id = $event"
        />
        <audit v-else-if="step === 2" :form_id="form_id" @setStep="setStep" />
      </keep-alive>
    </div>
  </LayoutPage>
</template>

<script>
import formBase from './src/components/form_base'
import audit from './src/components/audit'
import SetForm from './src/components/set_form/index'
import oaSteps from '~/components/oa_steps'
import form_steps from '@/mixins/form_steps'
import transform_data from '@/mixins/transform_data'
export default {
  name: 'Add',
  components: {
    oaSteps,
    formBase,
    audit,
    SetForm
  },
  mixins: [form_steps, transform_data],
  asyncData({ query }) {
    return {
      step: query.step ? parseInt(query.step) : 0,
      form_id: query.form_id
    }
  },
  data() {
    return {
      loading: true,
      form: {},
      editData: {}
    }
  },
  mounted() {
    if (this.form_id) {
      this.getEditFormBaseData()
    } else {
      this.loading = false
    }
  },
  destroyed() {
    // 清除表单控件数据
    this.$log('清除表单控件数据')
    this.$store.commit('form/changeInit', 0)
    this.$store.commit('form/changeControlList', [])
    this.$store.commit('form/changeCurId', 1000)
  },
  methods: {
    async getEditFormBaseData() {
      this.loading = true
      const res = await this.$api.form.getEditFormBaseData({
        form_id: this.form_id
      })
      if (res) {
        this.initForm(this.transformFlow(res.data, true))
        this.form = {
          form_id: res.data.form_id,
          icon: res.data.icon,
          field_configs: res.data.field_configs,
          form_name: res.data.form_name,
          form_en_name: res.data.form_en_name,
          form_type_id: res.data.form_type_id,
          prefix: res.data.prefix,
          form_sn_format: res.data.form_sn_format,
          applied_range: res.data.applied_range
            ? res.data.applied_range
            : res.data.members,
          description: res.data.description,
          verify_tips: res.data.verify_tips,
          default_tips: res.data.default_tips
        }
      }
      this.loading = false
    },
    initForm(data) {
      this.editData = data
      const fieldConfigs = JSON.parse(data.field_configs)
      const arr = Object.values(fieldConfigs)
      arr.sort((a, b) => {
        if (a.sort > b.sort) {
          return 1
        } else if (a.sort < b.sort) {
          return -1
        } else {
          return 0
        }
      })
      this.editData.fieldConfigs = arr
      this.$store.commit('form/changeControlList', arr)
      this.$store.commit('form/changeInit')

      // 初始化curId;
      const sortArray = []
      arr.forEach((i, index) => {
        sortArray.push(Number(i.sortid))

        // 隐藏区域也要
        if (i.type === 'block') {
          i.formList.forEach((j) => {
            sortArray.push(Number(j.sortid))
          })
        }
      })

      // 获取最大值
      const max = Math.max(...sortArray)
      this.$store.commit('form/changeCurId', max)
    },
    setStep(step) {
      this.step = step
    },

    // 基础信息
    saveBase(form) {
      this.form = Object.assign(this.form, form)
    },

    showView(id) {
      this.form_id = id
      this.dialogVisible = true
    }
  }
}
</script>

<style lang="less" scoped>
.no-pd-form /deep/.content {
  padding: 0;
}
</style>
