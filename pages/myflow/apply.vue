<template>
  <LayoutPage :title="$t('添加申请')" :loading="loading">
    <titleColumn :style="{ 'margin-bottom': '20px' }" :title="form.form_name" />

    <div class="form-content">
      <el-form
        id="flow_main_form"
        ref="apply-form"
        :model="formVaild"
        label-width="220px"
      >
        <Card :title="$t('申请人资讯')">
          <el-row class="content">
            <el-col class="detail-control-item" :span="12">
              <el-form-item :label="$t('姓名') + '：'" prop="show_name">
                {{ form.show_name }}
              </el-form-item>
            </el-col>
            <el-col class="detail-control-item" :span="12">
              <el-form-item :label="$t('部门') + '：'" prop="department_name">
                {{ form.department_name }}
              </el-form-item>
            </el-col>
            <el-col class="detail-control-item" :span="12">
              <el-form-item :label="$t('岗位名称') + '：'" prop="station_name">
                {{ form.station_name }}
              </el-form-item>
            </el-col>
            <el-col class="detail-control-item" :span="12">
              <el-form-item
                :label="$t('公司名称') + '：'"
                prop="organization_name"
              >
                {{ form.organization_name }}
              </el-form-item>
            </el-col>
            <el-col class="detail-control-item" :span="12">
              <el-form-item :label="$t('紧急程度') + '：'" prop="level">
                <el-select
                  v-model="form.level"
                  :style="{ width: '100%' }"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in Levels"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col class="detail-control-item" :span="12">
              <el-form-item :label="$t('关连表单') + '：'" prop="follow_ids">
                <el-select
                  v-model="form.follow_ids"
                  :style="{ width: '100%' }"
                  multiple
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in history_records"
                    :key="item.value"
                    :label="item.sn + ' ' + item.form_name"
                    :value="item.record_id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </Card>
        <Card :title="$t('申请信息')">
          <el-row v-if="Object.keys(formControl)" class="content">
            <draggable
              :disabled="true"
              :formControl="formControl"
              :departmentData="departmentData"
            />
            <el-col class="detail-control-item p-b-none" :span="24">
              <el-form-item class="fx-center ">
                <el-button
                  type="primary"
                  @click="submitForm('apply-form')"
                  :disabled="loading"
                  :loading="loading"
                >
                  {{ $t('提交') }}
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </Card>
      </el-form>
    </div>
  </LayoutPage>
</template>

<script>
import titleColumn from '~/components/page/title_column'
import Card from '~/components/page/card'
import draggable from '@/components/control_form/draggable'
import transform_data from '@/mixins/transform_data'
export default {
  components: {
    titleColumn,
    Card,
    draggable
  },
  mixins: [transform_data],
  provide() {
    return {
      lang: this.$store.state.i18n.locale
    }
  },
  asyncData({ query }) {
    return {
      form_id: query.form_id
    }
  },
  data() {
    return {
      loading: true,
      formControl: {},
      // 兼容隐藏区域校验，单独抽取一个form
      formVaild: {
        controlList: []
      },
      // 紧急程度
      Levels: [
        { label: '正常', value: 0 },
        { label: '紧急', value: 1 },
        { label: '非常紧急', value: 2 }
      ],
      history_records: [],
      form: {
        form_name: '',
        show_name: '',
        mylevel: '',
        // create_time: '',
        department_name: '',
        org_level_name: '',
        org_level: '',
        station_name: '',
        form_id: '',
        level: 0,
        follow_ids: ''
      },
      departmentData: [],
      departmentDefaultId: '',
      stations: [],
      tableDisabled: false,
      selectOldValue: {}
    }
  },
  mounted() {
    this.get_department_data()
    this.getApplyData()
    this.$bus.$on('selectChange', this.selectChange)
  },
  methods: {
    // 获取部门数据
    async get_department_data() {
      const rs = await this.$api.myflow.myreviewGetDepartments({})
      if (rs) {
        this.departmentData = rs.data
      }
    },

    // 获取初始化表单数据
    async getApplyData() {
      this.loading = true
      const res = await this.$api.myflow.myreviewApply({
        form_id: this.form_id
      })
      if (res) {
        // 转换成自己需要的数据结构
        const configs = JSON.parse(res.data.form.field_configs)
        //  初始化值
        for (const key in configs) {
          const initValue = configs[key].type === 'multi_select' ? [] : ''
          configs[key].value = configs[key].value
            ? configs[key].value
            : initValue

          if (configs[key].type === 'block') {
            for (const nkey in configs[key].formList) {
              const initValue =
                configs[key].formList[nkey].type === 'multi_select' ? [] : ''
              configs[key].formList[nkey].value = configs[key].formList[nkey]
                .value
                ? configs[key].formList[nkey].value
                : initValue
            }
          }
        }
        this.formControl = this.transformFlow(
          {
            controlList: Object.values(configs)
          },
          false
        )

        this.formVaild = Object.assign({}, this.formControl)

        this.$store.commit('form/changeInit')

        this.transformInitApply(res)
      }
      this.loading = false
    },

    selectChange(params) {
      const { value, sortid } = params
      let blockIndex = 0
      let oldIndex = 0
      this.formVaild.controlList.forEach((i, index) => {
        if (i.sortid === value) blockIndex = index

        if (i.sortid === this.selectOldValue[sortid]) oldIndex = index
      })
      // 多选框
      if (Array.isArray(value)) {
        // 初始化时，为空
        if (!this.selectOldValue[sortid]) {
          // 所选择的都加一
          value.forEach((i) => {
            let index = -1
            this.formVaild.controlList.forEach((k, idx) => {
              if (k.sortid === i) index = idx
            })

            // 之前 isShow是true或者false，兼容旧数据
            if (this.formVaild.controlList[index].isShow === true) {
              this.formVaild.controlList[index].isShow = 1
            } else if (this.formVaild.controlList[index].isShow === false) {
              this.formVaild.controlList[index].isShow = 0
            }

            this.formVaild.controlList[index].isShow += 1
          })

          // 后续操作根据数组长度判断，是增加还是减少
        } else if (this.selectOldValue[sortid]) {
          const isAdd = value.length > this.selectOldValue[sortid].length
          const arr = isAdd ? value : this.selectOldValue[sortid]
          arr.forEach((i) => {
            let index = -1
            this.formVaild.controlList.forEach((k, idx) => {
              if (k.sortid === i) index = idx
            })

            // 之前 isShow是true或者false，兼容旧数据
            if (this.formVaild.controlList[index].isShow === true) {
              this.formVaild.controlList[index].isShow = 1
            } else if (this.formVaild.controlList[index].isShow === false) {
              this.formVaild.controlList[index].isShow = 0
            }

            if (isAdd && !this.selectOldValue[sortid].includes(i)) {
              this.formVaild.controlList[index].isShow += 1
            } else if (!isAdd && !value.includes(i)) {
              this.formVaild.controlList[index].isShow -= 1
            }
          })
        }

        // 单选框
      } else {
        if (this.formVaild.controlList[blockIndex]) {
          console.log('before', this.formVaild.controlList[blockIndex].isShow)

          if (
            this.formVaild.controlList[blockIndex].isShow === undefined ||
            this.formVaild.controlList[blockIndex].isShow === ''
          ) {
            this.formVaild.controlList[blockIndex].isShow = 0
          }

          this.formVaild.controlList[blockIndex].isShow += 1
          console.log('after', this.formVaild.controlList[blockIndex].isShow)
        }

        if (this.selectOldValue[sortid]) {
          this.formVaild.controlList[oldIndex].isShow -= 1
        }
      }

      this.selectOldValue[sortid] = value
    },

    // 表单提交
    submitForm(formName) {
      const that = this
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const submit_data = Object.assign(
            { ispc: 1 },
            that.form,
            this.transformSubmit()
          )

          this.loading = true
          const rs = await this.$api.myflow.myreviewApplyH5Save(submit_data)
          if (rs) {
            this.$message({
              message: rs.msg,
              type: 'success'
            })
            setTimeout(() => {
              this.$router.replace('/myflow/record_list').catch(() => {})
              this.loading = false
            }, 1500)
          } else {
            this.loading = false
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../assets/less/page/form';
.content {
  padding-left: 0;
  padding-right: 0;
}

#flow_main_form {
  /deep/.el-form-item.drag-block {
    border: none;

    .block-header {
      display: none;
    }
  }

  /deep/.option {
    display: none;
  }

  /deep/.block-con .el-form-item__content {
    padding-right: 100px;

    .control-msg-text {
      margin-left: 220px;
    }
  }

  /deep/ .border-bottom {
    width: 100%;

    input {
      width: 200px;
      border: none;
    }
  }
}
</style>
