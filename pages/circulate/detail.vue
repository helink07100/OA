<template>
  <LayoutPage :title="$t('查看传阅')" :loading="loading">
    <titleColumn :style="{ 'margin-bottom': '20px' }" :title="circ_basic.title">
      <label-status
        slot="right"
        :status="circ_basic.status == 0 ? 'warning' : 'info'"
        :name="circ_basic.status == 0 ? $t('传阅中') : $t('已结束')"
      />
    </titleColumn>
    <div class="form-content">
      <el-form ref="form" :rules="formRules" :model="form">
        <div class="detail-form-item">
          <div class="form-label">
            <name-nodes
              :initials="circ_basic.display_creator_name | filter_substr"
              :name="circ_basic.display_creator_name"
              :desc="circ_basic.display_creator_depart"
            />
          </div>
          <div class="nodes-info-content">
            <div class="content-time">
              <i class="iconfont icon-caozuoshijian2"></i>
              <span>{{ circ_basic.display_create_time_format }}</span>
            </div>
            <div class="content" v-html="circ_basic.display_content"></div>
            <template v-for="(item, index) in comm_with_attach">
              <template v-if="index == 0">
                <div
                  v-for="(comments_item, commentsItemIndex) in item.comments"
                  :key="commentsItemIndex"
                  class="time-file-text-cell"
                >
                  <div class="time">{{ comments_item.create_time }}</div>
                  <div class="text" v-html="comments_item.comment"></div>
                  <!-- <div class="file-name">2019-12-12.pdf 附件</div> -->
                </div>
              </template>
            </template>
            <div
              v-if="
                comm_with_attach[0] &&
                  comm_with_attach[0].node_user.is_current_user &&
                  circ_basic.status != 1
              "
              class="comment-item"
            >
              <div class="textarea-cell-wrap">
                <el-form-item prop="comment">
                  <el-input
                    v-model="form.comment"
                    class="comment-textarea"
                    maxlength="200"
                    type="textarea"
                    :placeholder="$t('请输入意见')"
                  >
                  </el-input>
                </el-form-item>
              </div>
              <div class="button-cell">
                <div class="mb-lg">
                  <Upload
                    ref="oa-upload-a"
                    v-model="form.attach_url"
                    :label="$t('上传附件')"
                  >
                  </Upload>
                </div>
                <el-button
                  type="primary"
                  @click="on_submit(comm_with_attach[0])"
                  >{{ $t('提交') }}</el-button
                >
              </div>
            </div>
            <div class="annex-wrap">
              <template v-for="(item, commIndex) in comm_with_attach">
                <template v-if="item.upload_files.length > 0">
                  <div
                    v-for="(file_item, idx) in item.upload_files"
                    :key="commIndex + '-' + idx"
                    class="annex-item"
                  >
                    <div v-if="file_item.file_info" class="fx-jstart">
                      <uiFile
                        :file="[file_item.file_info]"
                        :show-control="true"
                        class="no-border"
                      />
                      <span class="file-desc">{{ file_item.remark }}</span>
                    </div>
                  </div>
                </template>
              </template>
            </div>
          </div>
          <el-button
            v-if="
              comm_with_attach[0] &&
                comm_with_attach[0].node_user.is_current_user &&
                circ_basic.status != 1
            "
            class="invitation-button is-active"
            :style="{ width: '86px' }"
            @click="invite(comm_with_attach[0])"
            >{{ $t('邀请') }}</el-button
          >
        </div>
        <div v-loading="inviteLoading">
          <template v-for="(item, index) in comm_with_attach">
            <div
              v-if="index != 0"
              :key="item.node_user.uid"
              class="detail-form-item comment-nodes-item"
            >
              <div class="form-label">
                <name-nodes
                  :initials="item.node_user.username | filter_substr"
                  :name="item.node_user.username"
                  :desc="item.node_user.department"
                />
              </div>
              <div class="nodes-info-content">
                <div
                  v-for="(comments_item, cidx) in item.comments"
                  :key="cidx"
                  class="time-file-text-cell"
                >
                  <div class="time">{{ comments_item.create_time }}</div>
                  <div class="text" v-html="comments_item.comment"></div>
                </div>
                <!-- status=0传阅中 status=1传阅中 -->
                <div
                  v-if="
                    item.node_user.is_current_user && circ_basic.status != 1
                  "
                  class="comment-item"
                >
                  <div class="textarea-cell-wrap">
                    <el-form-item prop="comment">
                      <el-input
                        v-model="form.comment"
                        class="comment-textarea"
                        type="textarea"
                        :placeholder="$t('请输入意见')"
                      >
                      </el-input>
                    </el-form-item>
                  </div>
                  <div class="button-cell">
                    <div class="mb-lg">
                      <Upload
                        ref="oa-upload-comment"
                        v-model="form.attach_url"
                        :label="$t('上传附件')"
                        type="button"
                      >
                      </Upload>
                    </div>
                    <el-button type="primary" @click="on_submit(item, index)"
                      >{{ $t('提交') }}
                    </el-button>
                    <el-button
                      v-if="item.comments.length <= 0"
                      type="info"
                      class="sure-info"
                      plain
                      @click="confirm_read(item)"
                      >{{ $t('确认已阅') }}</el-button
                    >
                  </div>
                </div>
              </div>
              <el-button
                v-if="item.node_user.is_current_user && circ_basic.status != 1"
                class="invitation-button is-active"
                :style="{ width: '86px' }"
                @click="invite(item)"
                >{{ $t('邀请') }}</el-button
              >
            </div>
          </template>
        </div>
      </el-form>
      <dialog-select-organization
        v-if="dialogVisible"
        ref="selectOrganization"
        :dialog-title="$t('选择传阅对象')"
        width="656px"
        :dialog-visible="dialogVisible"
        :definite-text="$t('确定邀请')"
        :limit-rank="true"
        :is-filter-hide="true"
        :is-filter-department="true"
        @cancel="dialogVisible = false"
        @definite="dialog_select_org_definite"
      ></dialog-select-organization>
    </div>
  </LayoutPage>
</template>

<script>
import titleColumn from '~/components/page/title_column'
import labelStatus from '~/components/label_status'
import Upload from '~/components/upload'
import nameNodes from '~/components/name_nodes'
import dialogSelectOrganization from '~/components/dialog_select_organization'
import uiFile from '~/components/file/index'
export default {
  components: {
    titleColumn,
    labelStatus,
    Upload,
    uiFile,
    nameNodes,
    dialogSelectOrganization
  },
  filters: {
    filter_substr(val) {
      if (val && val.length >= 1) return val.substr(0, 1)
      else return val
    }
  },
  asyncData({ query }) {
    return {
      circulate_id: query.id
    }
  },
  data() {
    return {
      loading: true,
      inviteLoading: false,
      dialogVisible: false,
      checked_users: [],
      uids: [],
      inviteNodeId: '',
      form: {
        comment: '',
        circulate_id: '',
        attach_url: '',
        node_id: ''
      },
      formRules: {
        comment: [
          {
            required: true,
            message: '请输入你的意见,最多200个字符',
            trigger: 'change'
          }
        ]
      },
      circ_basic: {},
      comm_with_attach: {}
    }
  },
  computed: {
    host() {
      return this.$config.client.api
    }
  },
  mounted() {
    this.get_detail()
  },
  methods: {
    async get_detail() {
      this.loading = true
      const rs = await this.$api.circulate.ajaxGetDetail({
        circulate_id: this.circulate_id
      })
      if (rs) {
        if (Object.keys(rs.data).length > 0) {
          this.circ_basic = rs.data.circ_basic
          rs.data.comm_with_attach = rs.data.comm_with_attach.map(
            (i, index) => {
              i.upload_files = i.upload_files.map((j, idx) => {
                if (!j.file_info) return j
                j.file_info.filelink = j.file_info.filelink
                  ? j.file_info.filelink
                  : j.file_info.url
                return j
              })
              return i
            }
          )

          this.comm_with_attach = rs.data.comm_with_attach
        }
      }
      this.loading = false
    },
    async submit_form(item, refsIndex) {
      // 提交评论表单数据
      const rs = await this.$api.circulate.ajaxAddComment({
        circulate_id: this.circulate_id,
        node_id: item.node_user.node_id,
        attach_url: this.form.attach_url,
        comment: this.form.comment
      })
      if (rs) {
        this.$message({
          message: rs.msg,
          type: 'success'
        })
        for (const k in this.form) {
          // 因为下面resetFields方法并没有把this.form的子对象设置为空,
          this.form[k] = ''
        }
        this.$refs.form.resetFields()
        if (this.$refs['oa-upload-a']) {
          this.$refs['oa-upload-a'].clearFiles()
        }

        if (
          this.$refs['oa-upload-comment'] &&
          this.$refs['oa-upload-comment'][0]
        ) {
          this.$refs['oa-upload-comment'][0].clearFiles()
        }
        setTimeout(() => {
          this.get_detail()
        }, 2000)
      }
    },
    on_submit(item, index) {
      // 评论提交表单验证
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submit_form(item, index)
        }
      })
    },
    async confirm_read(item) {
      // 确认已阅
      const rs = await this.$api.circulate.ajaxConfirm({
        circulate_id: this.circulate_id,
        node_id: item.node_user.node_id
      })
      if (rs) {
        this.$message({
          message: rs.msg,
          type: 'success'
        })
        setTimeout(() => {
          this.get_detail()
        }, 2000)
      }
    },
    async send_invite(uids) {
      this.inviteLoading = true
      const rs = await this.$api.circulate.ajaxInvite({
        uids,
        circulate_id: this.circulate_id,
        node_id: this.inviteNodeId
      })
      if (rs) {
        this.$message({
          message: rs.msg,
          type: 'success'
        })
        setTimeout(() => {
          this.get_detail()
        }, 2000)
      }
      const falied = rs.data.falied
      const success = rs.data.success
      let falied_msg = ''
      let success_msg = ''
      if (falied.length > 0) {
        if (falied.length > 0) {
          for (let i = 0; i < falied.length; i++) {
            if (falied_msg) {
              falied_msg = falied_msg + '、' + falied[i].name
            } else {
              falied_msg = falied[i].name
            }
          }
          falied_msg =
            '<span style="color:#FF8800;">' +
            falied_msg +
            '、邀请失败,不可重复邀请' +
            '</span>'
        }
        if (success.length > 0) {
          for (let i = 0; i < success.length; i++) {
            if (success_msg) {
              success_msg = success_msg + '、' + success[i].name
            } else {
              success_msg = success[i].name
            }
          }
          success_msg =
            '<span style="color:#44B600;padding-right:15px;">' +
            success_msg +
            '、' +
            rs.msg +
            '</span>'
          setTimeout(() => {
            this.get_detail()
          }, 2000)
        }
        this.$message({
          type: 'info',
          dangerouslyUseHTMLString: true,
          message: success_msg + falied_msg,
          duration: 5000
        })
      }
      this.inviteLoading = false
      this.uids = []
    },
    invite(item) {
      this.uids = []
      this.inviteNodeId = item.node_user.node_id
      this.dialogVisible = true
    },
    dialog_select_org_definite(list) {
      this.dialogVisible = false
      let falg = false
      let isMember = false
      for (let i = 0; i < list.length; i++) {
        if (list[i].id.includes('_')) {
          this.uids.push(list[i].id)
          isMember = true
        } else {
          falg = true
        }
      }
      if (falg && !isMember) {
        this.$message.warning('非人员不可邀请！')
        return false
      }
      const uids_str = this.uids.join(',')
      this.send_invite(uids_str)
    }
  }
}
</script>

<style lang="less" scoped>
.sure-info {
  border: none;
  background-color: #f4f4f6;
  color: #7b85a1;

  &:hover,
  &:active,
  &:focus {
    border: none;
    background-color: #e0e0e0;
    color: #7b85a1;
  }
}
.form-content {
  .detail-form-item {
    padding: 32px 30px 30px 30px;
    background: #fff;
    margin-bottom: 10px;
    border-radius: 2px;
    display: flex;
    .form-label {
      margin-right: 22px;
    }
    .nodes-info-content {
      padding-bottom: 0;
      padding-top: 0;
      position: relative;
      flex: 1;
      .annex-wrap .annex-item .file-desc {
        font-size: 14px;
        color: #666666;
      }
      /deep/ .el-textarea__inner {
        max-width: 812px;
      }
      .text {
        a.text-primary {
          padding: 0 10px;
        }
      }
    }
    .invitation-button {
      align-self: baseline;
    }
    .upload-button-icon-text .button-cell span {
      text-overflow: ellipsis;
      width: 300px;
      overflow: hidden;
      overflow-wrap: break-word;
      line-height: 1.4;
    }
  }
  .nodes-info-content .content {
    padding-right: 180px;
  }
}
.upload-button-icon-text {
  border: none;
  padding-left: 0;
  padding-right: 0;
  color: #4d86fb;
  &.el-button:focus,
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
    padding: 15px 0 0;
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
        top: 5px;
        padding: 9px 0 9px 40px;
      }
    }
  }
}
.comment-nodes-item {
  .nodes-info-content:first-child {
    padding-top: 20px;
  }
  .nodes-info-content {
    padding-bottom: 15px;
  }
  .comment-row {
    line-height: 20px;
  }
}
</style>
