<template>
  <div class="myflow-record-detailed">
    <el-form ref="form" :rules="formRules" :model="form">
      <template v-for="(item, index) in nodes">
        <!-- examined -->
        <div
          v-for="(members, members_index) in item.members"
          :key="members_index + '-' + members.id"
          class="detail-form-item comment-nodes-item oa-flex"
          :class="(index, members_index, nodes, members | statusClass)"
        >
          <div class="form-label">
            <name-nodes
              :initials="members.member_name | filterSubstr"
              :name="members.member_name"
              :desc="members.department_name"
              :class="{
                'node-danger': members.status == -3 || members.status == -2,
                'node-warning': members.status == 1,
                'node-info': members.status == 103 || members.status == 101,
                'node-success': members.status == 10 || members.status == 5
              }"
            >
              <labelStatus
                v-if="members.status == -3 || members.status == -2"
                class="label-status label-danger"
                :name="members.status_title"
              >
              </labelStatus>
              <labelStatus
                v-else-if="members.status == 1"
                class="label-status label-warning"
                :name="$t('审批中')"
              >
              </labelStatus>
              <labelStatus
                v-else-if="members.status == 10 || members.status == 5"
                class="label-status label-success"
                :name="members.status_title"
              >
              </labelStatus>
              <labelStatus
                v-else
                class="label-status label-info"
                :name="members.status_title"
              >
              </labelStatus>
            </name-nodes>
          </div>
          <div class="nodes-info-content">
            <div
              v-if="members.review_view_time_pc"
              class="time-file-text-cell "
            >
              <template v-if="members.review_view_time_pc">
                <span class="time-icon fs12">{{ $t('查看') }}: </span>
                <div class="time">{{ members.review_view_time_pc }}</div>
              </template>
              <template v-if="members.review_operating_time_pc">
                <span class="fs12 text-gray" :style="{ padding: '0 15px' }">
                  |
                </span>
                <span class="time-icon fs12">{{ $t('操作') }}: </span>
                <div class="time">{{ members.review_operating_time_pc }}</div>
              </template>
              <span
                v-if="members.total_time"
                class="fs12 text-gray"
                :style="{ 'padding-left': '10px' }"
              >
                {{ members.total_time + ' ' + $t('天') }}
              </span>
            </div>
            <div
              v-if="members.status_msg"
              class="time-file-text-cell wp80 fx-between"
            >
              <div v-if="members.status_msg">
                <span class="text-info"
                  >{{ members.status_msg.split('：')[0] }}：</span
                >
                <span class="fs-fourteen text-normal">{{
                  members.status_msg.split('：')[1]
                }}</span>
              </div>
              <img
                v-if="
                  (members.status === 4 ||
                    members.status === 5 ||
                    members.status === -2 ||
                    members.status === -3 ||
                    members.status === 10) &&
                    members.department_seal_img[
                      Object.keys(members.department_seal_img)[0]
                    ].is_top === 1
                "
                :src="
                  members.department_seal_img[
                    Object.keys(members.department_seal_img)[0]
                  ].department_seal_img
                "
                class="seal"
                alt=""
              />
            </div>
            <uiFile :file="members.addon" :no-border="true"></uiFile>
            <template v-if="members.status == 1 && members.active">
              <div class="comment-item">
                <div class="textarea-cell-wrap">
                  <el-form-item prop="suggestion">
                    <el-input
                      v-model="form.suggestion"
                      class="comment-textarea"
                      type="textarea"
                      :placeholder="$t('请输入意见')"
                    >
                    </el-input>
                  </el-form-item>
                </div>
                <div class="upload-file-item oa-flex">
                  <label>{{ $t('附件') }}：</label>
                  <Upload
                    ref="record-upload"
                    v-model="form.addon"
                    :label="$t('上传附件')"
                    type="button"
                  ></Upload>
                </div>
                <el-form-item>
                  <div v-loading="loading" class="button-cell">
                    <template v-if="operator.review_type == 'final'">
                      <el-button
                        class="oa-is-plain"
                        type="success"
                        :style="{ 'min-width': '86px' }"
                        plain
                        @click="
                          validateSubmitForm('form', item, members, 'next')
                        "
                        >{{ $t('提交') }}</el-button
                      >
                    </template>
                    <template v-else>
                      <el-button
                        class="oa-is-plain"
                        type="success"
                        :style="{ 'min-width': '86px' }"
                        plain
                        @click="
                          validateSubmitForm('form', item, members, 'next')
                        "
                        >{{
                          $t(
                            operator.review_type == 'process'
                              ? '拟同意'
                              : '通过'
                          )
                        }}</el-button
                      >
                      <el-button
                        class="oa-is-plain"
                        type="danger"
                        :style="{ 'min-width': '86px' }"
                        plain
                        @click="
                          validateSubmitForm('form', item, members, 'reject')
                        "
                        >{{
                          $t(
                            operator.review_type == 'process'
                              ? '不同意'
                              : '驳回'
                          )
                        }}</el-button
                      >
                      <el-button
                        class="oa-is-plain"
                        type="warning"
                        :style="{ 'min-width': '86px' }"
                        plain
                        @click="transmit('form', item, members, 'transmit')"
                        >{{ $t('邀请') }}</el-button
                      >
                      <el-button
                        class="invitation-button is-active"
                        :style="{ 'min-width': '86px' }"
                        @click="invite('form', item, members, 'to_cc')"
                        >{{ $t('转交') }}</el-button
                      >
                    </template>
                  </div>
                </el-form-item>
              </div>
            </template>
            <div class="detail-form-item-wrap">
              <template v-for="(suggestion, sidx) in members.cc_suggestions">
                <!-- examined -->
                <div
                  :key="sidx"
                  class="detail-form-item comment-nodes-item oa-flex"
                  :class="{ 'first-none-line': nodes.length <= 1 }"
                >
                  <div class="form-label">
                    <name-nodes
                      :initials="suggestion.info.show_name | filterSubstr"
                      :name="suggestion.info.show_name"
                      :desc="suggestion.info.department_name"
                      class="node-blue"
                    >
                      <div class="label-status label-blue">
                        {{ $t('邀请') }}
                      </div>
                    </name-nodes>
                  </div>
                  <div class="nodes-info-content">
                    <template
                      v-for="(invite_item, invidx) in suggestion.suggestions"
                    >
                      <div
                        v-if="invite_item.create_time"
                        :key="invidx"
                        class="time-file-text-cell"
                        :style="{ padding: '0' }"
                      >
                        <template>
                          <!-- <i class="time-icon iconfont icon-liulanshijian2 fs12"></i> -->
                          <span class="time-icon fs12">View</span>
                          <div class="time">
                            {{ invite_item.create_time }}
                          </div>
                        </template>
                      </div>
                      <div
                        :key="invidx"
                        class="text"
                        :style="{ padding: '5px 0 15px 0' }"
                      >
                        <div>
                          <span :style="{ color: '#9B9B9B' }"
                            >{{ $t('意见') }}：</span
                          >{{ invite_item.suggestion }}
                        </div>
                      </div>
                    </template>
                    <template
                      v-if="
                        suggestion.info.member_id == detailedData.admin_id &&
                          members.status == 1
                      "
                    >
                      <div class="comment-item">
                        <div class="textarea-cell-wrap">
                          <el-form-item prop="suggestion">
                            <el-input
                              v-model="form.suggestion"
                              class="comment-textarea"
                              type="textarea"
                              :placeholder="$t('请输入意见')"
                            >
                            </el-input>
                          </el-form-item>
                        </div>
                        <el-form-item>
                          <div
                            class="button-cell"
                            :style="{ 'margin-top': '15px' }"
                          >
                            <el-button
                              class="oa-is-plain"
                              type="success"
                              :style="{ width: '86px' }"
                              plain
                              @click="
                                validateSubmitForm(
                                  'form',
                                  members,
                                  suggestion,
                                  'invite'
                                )
                              "
                              >{{ $t('提交') }}</el-button
                            >
                          </div>
                        </el-form-item>
                      </div>
                    </template>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </el-form>
    <dialog-select-organization
      ref="transmitSelectOrganization"
      :dialog-title="$t('选择人员')"
      width="656px"
      :dialog-visible="transmitDialogVisible"
      :limit-rank="Boolean(true)"
      @cancel="transmitDialogVisible = false"
      @definite="transmit_dialog_select_org_definite"
    ></dialog-select-organization>
    <dialog-select-organization
      ref="inviteSelectOrganization"
      :dialog-title="$t('选择人员')"
      width="656px"
      :dialog-visible="inviteDialogVisible"
      :limit-rank="Boolean(true)"
      @cancel="inviteDialogVisible = false"
      @definite="invite_dialog_select_org_definite"
    ></dialog-select-organization>
  </div>
</template>

<script>
import nameNodes from '~/components/name_nodes'
import labelStatus from '~/components/label_status'
import Upload from '~/components/upload'
import uiFile from '~/components/file/index'
import dialogSelectOrganization from '~/components/dialog_select_organization'
export default {
  components: {
    nameNodes,
    Upload,
    dialogSelectOrganization,
    labelStatus,
    uiFile
  },
  filters: {
    filterSubstr(val) {
      if (val && val.length >= 1) return val.substr(0, 1)
      else return val
    }
  },
  props: {
    detailedData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loading: false,
      transmitDialogVisible: false,
      transmitCheckedUsers: [],
      inviteDialogVisible: false,
      inviteCheckedUsers: [],
      form: {
        suggestion: '',
        to_member: [],
        to_cc_member: [],
        addon: ''
      },
      formRules: {
        suggestion: [
          { required: true, message: '请输入意见', trigger: 'change' }
        ]
      },
      //
      record: (() => {
        return this.detailedData.record
      })(),
      nodes: (() => {
        return this.detailedData.nodes
      })(),
      cc_users: (() => {
        return this.detailedData.cc_users
      })(),
      operator: (() => {
        return this.detailedData.operator
      })(),
      record_id: (() => {
        return this.detailedData.record_id
      })(),
      //
      nodesItem: {},
      membersItem: {},
      job: ''
    }
  },
  computed: {
    host() {
      return this.$config.client.api
    }
  },
  watch: {
    'form.suggestion'(nv, ov) {
      this.$refs.form.validateField('suggestion')
    },
    detailedData(nvs) {
      this.record = nvs.record
      this.nodes = nvs.nodes
      this.cc_users = nvs.cc_users
      this.operator = nvs.operator
      this.record_id = nvs.record_id
    }
  },
  methods: {
    statusClass(index, subIndex, nodes, item) {
      // 1、103的都是待审核或还没轮到的，但是101 / 102 / 200要特殊处理
      // 101/102/200的情况是，如果它前面是已经审核的，那么就高亮，如果不是就不高亮
      let falg = false
      const prevItem = nodes[index].members[subIndex - 1]
      if (!prevItem) return
      if (item.status !== 1 && item.status !== 103) {
        falg = true
        if (item.status === 101 || item.status === 102 || item.status === 200) {
          if (prevItem.status === 5 || prevItem.status === 10) {
            falg = true
          } else {
            falg = false
          }
        }
      }
      return { examined: falg }
    },
    async submitForm(item, members, job) {
      this.loading = true
      const submitData = {
        record_id: this.record_id,
        review_id: this.operator.review_id,
        node_id: this.operator.node_id,
        approve_type: this.operator.review_type,
        job,
        review_users: this.record.base.review_users,
        need_verify: this.record.base.need_verify,
        addon: this.form.addon,
        to_member:
          this.form.to_member.length >= 1 ? this.form.to_member.join(',') : '',
        to_cc_member:
          this.form.to_cc_member.length >= 1
            ? this.form.to_cc_member.join(',')
            : '',
        suggestion: this.form.suggestion
      }
      const rs = await this.$api.myflow.saveApprove(submitData)
      this.$log(submitData)
      // const rs = { code: 0, msg: 'yshuang' }
      if (rs) {
        this.$message({
          message: rs.msg,
          type: 'success'
        })
        this.$refs.transmitSelectOrganization.set_checked_data([])
        this.$refs.inviteSelectOrganization.set_checked_data([])
        this.$refs.form.resetFields()
        if (this.$refs['record-upload'][0]) {
          this.$refs['record-upload'][0].clearFiles()
        }
        setTimeout(() => {
          this.$refs.form.clearValidate('suggestion')
        }, 50)
        this.$emit('loaddetail')
      }
      this.loading = false
    },
    validateSubmitForm(formName, item, members, job) {
      const that = this
      this.form.to_member = ''
      this.form.to_cc_member = ''
      this.$refs[formName].validate(function(valid) {
        if (valid) {
          if (job === 'invite') {
            that.inviteSubmitForm(item, members, job)
          } else {
            that.submitForm(item, members, job)
          }
        } else {
          return false
        }
      })
    },
    transmit(formName, item, members, job) {
      this.transmitDialogVisible = true
      this.nodesItem = item
      this.membersItem = members
      this.job = job
    },
    transmit_dialog_select_org_definite(list) {
      this.transmitDialogVisible = false
      this.transmitCheckedUsers = list
      this.form.to_member = []
      for (let i = 0; i < list.length; i++) {
        this.form.to_member.push(list[i].id)
      }
      this.form.to_cc_member = ''
      if (this.form.to_member.length >= 1) {
        this.submitForm(this.nodesItem, this.membersItem, this.job)
        this.$refs.form.clearValidate('suggestion')
      }
    },
    invite(formName, item, members, job) {
      this.inviteDialogVisible = true
      this.nodesItem = item
      this.membersItem = members
      this.job = job
    },
    invite_dialog_select_org_definite(list) {
      this.inviteDialogVisible = false
      this.inviteCheckedUsers = list
      this.form.to_cc_member = []
      for (let i = 0; i < list.length; i++) {
        this.form.to_cc_member.push(list[i].id)
      }
      this.form.to_member = ''
      if (this.form.to_cc_member.length >= 1) {
        this.submitForm(this.nodesItem, this.membersItem, this.job)
        this.$refs.form.clearValidate('suggestion')
      }
    },
    async inviteSubmitForm(members, suggestion, job) {
      const submitData = {
        review_id: suggestion.info.review_id,
        id: suggestion.info.id,
        suggestion: this.form.suggestion
      }
      const rs = await this.$api.myflow.saveSuggestion(submitData)
      if (rs) {
        this.$message({
          message: rs.msg,
          type: 'success'
        })
        this.$refs.form.resetFields()
        setTimeout(() => {
          this.$refs.form.clearValidate('suggestion')
        }, 50)
        this.$emit('loaddetail')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.myflow-record-detailed {
  .label-status {
    padding: 3px 10px;
    font-size: 12px;
  }
}
.oa-flex {
  display: flex;
  align-items: center;
}
.oa-flex-1 {
  flex: 1;
}
.seal {
  margin: -20px 0 0 20px;
  height: 70px;
}
.myflow-record-detailed {
  .upload-button-icon-text,
  .comment-item {
    padding: 0;
  }
  .textarea-cell-wrap {
    padding-bottom: 0 !important;
  }
  .detail-control-item .label {
    text-align: right;
  }
  .upload-file-item {
    padding: 20px 0;
    label {
      color: #838383;
      font-size: 12px;
    }
    .oa-upload {
      padding-left: 20px;
    }
  }
  /deep/ .el-form-item {
    margin: 0;
  }
  .time-icon {
    color: rgb(155, 155, 155);
    padding-right: 5px;
    position: relative;
    top: 1px;
  }
  .time-file-text-cell {
    .opinion-content {
      line-height: 18px;
    }
  }
  .detail-form-item {
    position: relative;
    .name-nodes {
      align-items: start;
    }

    .nodes-info-content {
      flex: 1;
      margin-left: 15px;
      padding-bottom: 30px;
      min-height: 60px;
      .annex-wrap {
        padding-top: 0;
      }
    }
    .form-label {
      width: 200px;
      align-self: baseline;
      padding-top: 0;
      z-index: 2;
      position: relative;
    }
    &::before {
      content: '';
      width: 1px;
      height: 100%;
      position: absolute;
      left: 19px;
      top: 0px;
      border-right: dashed 1px #e1e2e7;
      z-index: 1;
    }
    &.examined {
      &::before {
        border-color: #666;
      }
    }
    .detail-form-item-wrap {
      margin-top: 30px;
      .detail-form-item {
        &:first-child {
          &::after {
            content: '';
            width: 200px;
            height: 1px;
            border-bottom: dashed 1px #e1e2e7;
            position: absolute;
            left: -195px;
            top: 20px;
          }
        }
      }
    }
  }
  /deep/ .el-form .detail-form-item:last-child {
    &::before {
      border-right: none;
    }
  }
  /deep/ .el-form .detail-form-item:first-child.first-none-line {
    &::after {
      border-bottom: none !important;
    }
  }
}

.nodes-info-content {
  .content-time {
    font-size: 12px;
    color: #a5a5a5;
    height: 20px;
    line-height: 20px;
    padding-bottom: 5px;
    .icon-caozuoshijian2 {
      font-size: 12px;
    }
  }
  .content {
    font-size: 18px;
    color: #292929;
    line-height: 24px;
    padding-bottom: 15px;
  }
  .time-file-text-cell {
    display: flex;
    padding: 0 0 14px;
    font-size: 14px;
    &.wp80 {
      width: 80%;
    }

    .time {
      color: #a5a5a5;
      font-size: 12px;
    }
    .text {
      padding: 0 10px;
      color: #000000;
      font-size: 14px;
    }
    .file-name {
      color: #3f78f6;
    }
  }
  .comment-item {
    padding-top: 10px;
    overflow: hidden;
    .textarea-cell-wrap {
      padding-bottom: 20px;
      .comment-textarea {
        /deep/ .el-textarea__inner {
          height: 120px !important;
          resize: none;
          border: 1px solid #e1e2e7;
          border-radius: 0;
        }
      }
    }
  }
  .annex-wrap {
    padding-top: 30px;
    .image {
      width: 460px;
      height: 260px;
    }
    .annex-item {
      .download {
        font-size: 14px;
        padding-left: 15px;
      }
      .file-desc {
        position: relative;
        top: -5px;
        padding-left: 58px;
      }
    }
  }
}
.fs14-im {
  font-size: 14px !important;
}
.a-file,
.download {
  color: #4375f1;
  cursor: pointer;
  padding: 0 10px;
}
.upload-button-icon-text {
  border: none;
  padding-left: 0;
  padding-right: 0;
  color: #4d86fb;
  /deep/ &.el-button:focus,
  &.el-button:hover {
    color: #4d86fb;
    border-color: #4d86fb;
    background-color: initial;
  }
  .button-cell {
    display: flex;
    align-items: center;
    justify-items: center;
    .icon-fujian1 {
      font-size: 28px;
    }
    span {
      font-size: 14px;
      padding-left: 10px;
    }
  }
}
</style>
