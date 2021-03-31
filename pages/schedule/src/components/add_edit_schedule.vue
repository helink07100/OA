<template>
  <el-dialog
    class="oa-dialog"
    :visible="dialogVisible"
    width="620px"
    @close="$emit('close', false)"
  >
    <div slot="title" class="oa-dialog-header">
      {{ editData && Object.keys(editData).length ? '修改日程' : '添加日程' }}
    </div>
    <div class="oa-dialog-body">
      <el-form
        ref="scheduleForm"
        :model="scheduleForm"
        :rules="scheduleRules"
        label-width="100px"
        class="schedule-form"
      >
        <el-form-item label="日程名称：" prop="title" class="small-mb">
          <el-input
            v-model="scheduleForm.title"
            type="textarea"
            class="add-schedule-textarea"
            maxlength="50"
            placeholder="必填，可以输入符号、文字、字母等文本，最多不超过50个字。"
          ></el-input>
        </el-form-item>
        <el-form-item prop="all_today" class="small-mb">
          <el-checkbox-group v-model="scheduleForm.all_today">
            <el-checkbox label="全天日程" name="all_today"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-row :span="24">
          <el-col :span="12">
            <el-form-item label="开始时间：" prop="begin_time">
              <el-date-picker
                v-model="scheduleForm.begin_time"
                :type="scheduleForm.all_today ? 'date' : 'datetime'"
                :format="
                  scheduleForm.all_today ? 'yyyy-MM-dd' : 'yyyy-MM-dd HH:mm'
                "
                placeholder="开始时间"
                style="width: 100%;"
                :picker-options="startPickerOptions"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col v-if="!scheduleForm.all_today" :span="12">
            <el-form-item label="结束时间：" prop="end_time">
              <el-date-picker
                v-model="scheduleForm.end_time"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                placeholder="结束时间"
                style="width: 100%;"
                :picker-options="endPickerOptions"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="12">
            <el-form-item label="重复周期：" prop="is_repeat">
              <el-select
                v-model="scheduleForm.is_repeat"
                placeholder="请选择重复周期"
              >
                <el-option
                  v-for="item in repeats"
                  :key="item.label + '-' + item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24">
          <el-col :span="12">
            <el-form-item label="提醒时间：" prop="remind_time">
              <el-select
                v-model="scheduleForm.remind_time"
                placeholder="请选择提醒时间"
              >
                <el-option
                  v-for="item in remind_times"
                  :key="item.label + '-' + item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <div class="msg text-danger fs12" :style="{ padding: '10px 15px' }">
              <i class="iconfont icon-tishi fs12"></i>
              <span>提醒功能仅适用于APP端</span>
            </div>
          </el-col>
        </el-row>
        <el-form-item label="备注：" prop="remark">
          <el-input
            v-model="scheduleForm.remark"
            class="remark-textarea"
            type="textarea"
            maxlength="300"
            placeholder="可以输入符号、文字、字母等文本，最多不超过300个字。"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            :loading="submit_form_loading"
            @click="rules_schedule_form('scheduleForm')"
          >
            {{
              editData && Object.keys(editData).length ? '修 改' : '添 加'
            }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
    editData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      submit_form_loading: false,
      scheduleForm: {
        title: '',
        all_today: false,
        begin_time: '',
        end_time: '',
        is_repeat: '',
        remind_time: '',
        remark: ''
        // timezone: this.$utils.get_timezone()
      },
      repeats: [
        {
          label: '不重复',
          value: '0'
        },
        {
          label: '每天',
          value: '1'
        },
        {
          label: '每周',
          value: '2'
        },
        {
          label: '每月',
          value: '3'
        }
      ],
      remind_times: [
        {
          label: '不提示',
          value: '0'
        },
        {
          label: '日程开始前5分钟',
          value: '1'
        },
        {
          label: '日程开始前10分钟',
          value: '2'
        },
        {
          label: '日程开始前15分钟',
          value: '3'
        },
        {
          label: '日程开始前30分钟',
          value: '4'
        },
        {
          label: '日程开始前1小时',
          value: '5'
        }
      ],
      scheduleRules: {
        title: [
          { required: true, message: '请输入日程名称', trigger: 'change' }
        ],
        begin_time: [
          { required: true, message: '请选择开始时间', trigger: 'change' }
        ],
        end_time: [
          { required: true, message: '请选择结束时间', trigger: 'change' },
          { validator: this.validatorEndTime, trigger: 'change' }
        ],
        is_repeat: [
          { required: true, message: '请选择重复周期', trigger: 'change' }
        ],
        remind_time: [
          { required: true, message: '请选择提醒时间', trigger: 'change' }
        ]
      },
      startPickerOptions: {
        disabledDate: (time) => {
          return new Date(time).getTime() < new Date().getTime() - 86400000
        }
      },
      endPickerOptions: {
        disabledDate: (time) => {
          if (this.scheduleForm.begin_time) {
            return (
              new Date(time).getTime() <
              new Date(this.scheduleForm.begin_time).getTime() - 86200000
            )
          }
        }
      }
    }
  },
  watch: {
    'scheduleForm.all_today'(nv) {
      if (!nv) {
        this.$refs.scheduleForm.validateField('end_time')
      }
    },
    editData(nv, on) {
      // 编辑填上默认值
      if (nv && Object.keys(nv).length) {
        this.$log(this.editData.is_all_day)
        this.scheduleForm.flag_start_time = this.editData.begin_time
        this.scheduleForm.title = this.editData.title
        this.scheduleForm.all_today = Boolean(this.editData.is_all_day)
        this.scheduleForm.begin_time = this.YMD(
          Number(this.editData.begin_time)
        )
        if (!this.scheduleForm.all_today) {
          this.scheduleForm.end_time = this.YMD(Number(this.editData.end_time))
        }
        this.scheduleForm.is_repeat = String(this.editData.is_repeat)
        this.scheduleForm.remind_time = String(this.editData.remind_time)
        this.scheduleForm.remark = this.editData.remark
        this.scheduleForm.schedule_id = this.editData.id
        this.scheduleForm.type = 0
      }
    },
    dialogVisible(nv, ov) {
      if (!nv) {
        this.$refs.scheduleForm.resetFields()
      }
    }
  },
  methods: {
    validatorEndTime(rule, value, callback) {
      if (value && this.scheduleForm.begin_time) {
        const boole =
          new Date(value).getTime() >
          new Date(this.scheduleForm.begin_time).getTime()
        if (boole) {
          callback()
        } else {
          callback(new Error('结束时间不能大于开始时间'))
        }
      }
    },
    YMD(timestamp) {
      return this.$moment(new Date(timestamp * 1000)).format('YYYY-MM-DD HH:mm')
    },
    async submit_form() {
      this.submit_form_loading = true
      const rs = await this.$api.schedule.scheduleSave(this.scheduleForm)
      if (rs) {
        this.$message({
          message: rs.msg,
          type: 'success'
        })
        this.$refs.scheduleForm.resetFields()
        this.$emit('close', 'success')
      }
      this.submit_form_loading = false
    },
    rules_schedule_form(formName) {
      const that = this
      this.$refs[formName].validate(function(valid) {
        if (valid) {
          that.submit_form()
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.oa-dialog {
  .small-mb {
    margin-bottom: 13px;
  }
  /deep/ .el-dialog {
    overflow: hidden;
  }
  /deep/ .el-dialog__header {
    background: #f6f7fb;
    padding: 11px 15px 11px 30px;
  }
  /deep/ .el-dialog__headerbtn {
    top: 12px;
  }
  /deep/ .el-dialog__footer {
    text-align: center;
    padding-bottom: 34px;
  }
  .oa-dialog-header {
    font-size: 16px;
    color: #3a3a3a;
  }

  .text-danger {
    color: #ff4439 !important;
  }
}
</style>
