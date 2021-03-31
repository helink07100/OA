<template>
  <el-dialog
    class="oa-dialog"
    :visible="dialogVisible"
    width="620px"
    @close="$emit('close', false)"
  >
    <div slot="title" class="oa-dialog-header">日程详情</div>
    <div v-loading="scheduleDetailLoading" class="oa-dialog-body">
      <el-row :style="elRowStyle">
        <el-col :span="4" :style="elColLabelStyle">
          <label class="control-label">日程</label>
        </el-col>
        <el-col :span="20">
          <span class="form-control-static" :style="formControlStatic">{{
            detailData.title
          }}</span>
        </el-col>
      </el-row>
      <el-row :style="elRowStyle">
        <el-col :span="4" :style="elColLabelStyle">
          <label class="control-label">开始时间</label>
        </el-col>
        <el-col :span="20">
          <span class="form-control-static" :style="formControlStatic">{{
            detailData.detail_display_time
          }}</span>
        </el-col>
      </el-row>
      <el-row :style="elRowStyle">
        <el-col :span="4" :style="elColLabelStyle">
          <label class="control-label">重复周期</label>
        </el-col>
        <el-col :span="20">
          <span class="form-control-static" :style="formControlStatic">{{
            detailData.is_repeat
          }}</span>
        </el-col>
      </el-row>
      <el-row :style="elRowStyle">
        <el-col :span="4" :style="elColLabelStyle">
          <label class="control-label">提醒时间</label>
        </el-col>
        <el-col :span="20">
          <span class="form-control-static" :style="{ padding: '7px 15px' }">{{
            detailData.detail_remind_time
          }}</span>
          <span class="text-danger fs12"
            ><i class="iconfont icon-tishi fs12"></i>
            提醒功能仅适用于APP端</span
          >
        </el-col>
      </el-row>
      <el-row :style="elRowStyle">
        <el-col :span="4" :style="elColLabelStyle">
          <label class="control-label">备注</label>
        </el-col>
        <el-col :span="20">
          <span class="form-control-static" :style="formControlStatic">{{
            detailData.remark
          }}</span>
        </el-col>
      </el-row>
      <el-row :style="elRowStyle">
        <el-col :span="24" :style="{ 'text-align': 'center' }">
          <div class="oa-dialog-footer">
            <template v-if="detailData.repeat">
              <el-button
                v-if="detailData.status != 1"
                @click="change_schedule_status(0)"
                >标示仅处理当前重复日程</el-button
              >
              <el-button type="primary" @click="change_schedule_status(1)">
                标示处理包括当前日程往后的所有未来重复日程
              </el-button>
            </template>
            <template v-else>
              <el-button @click="$emit('close', true)">取消</el-button>
              <el-button
                v-if="detailData.status != 1"
                type="primary"
                @click="change_schedule_status(1)"
              >
                标记为完成
              </el-button>
            </template>
          </div>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    dialogVisible: Boolean,
    detailData: {
      type: Object,
      default: () => {}
    },
    keyName: {
      type: String,
      default: 'start_timestamp'
    }
  },
  data() {
    return {
      elRowStyle: {
        padding: '15px 0'
      },
      elColLabelStyle: {
        'text-align': 'right',
        color: '#999'
      },
      formControlStatic: {
        'padding-left': '15px',
        'padding-right': '15px'
      },
      scheduleDetailLoading: false
    }
  },
  methods: {
    async submit_form(status, type, ids) {
      this.scheduleDetailLoading = true
      const rs = await this.$api.schedule.scheduleStatus({
        status,
        type,
        ids
      })
      if (rs) {
        this.$message({
          message: rs.msg,
          type: 'success'
        })
        this.$emit('close', true)
      }
      this.scheduleDetailLoading = false
    },
    change_schedule_status(type) {
      // type = 0 标示仅处理当前重复日程，1 标示处理包括当前日程往后的所有未来重复日程
      const that = this
      const ids = {}
      const id = this.detailData.id
      const str = this.detailData[this.keyName]
      const repeat = this.detailData.repeat
      ids[id] = str
      this.$confirm(
        !repeat
          ? '确定要标记为已完成吗？'
          : '确定要标记为已完成吗？此为重复日程?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          that.submit_form(1, type, ids)
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.oa-dialog {
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
}
</style>
