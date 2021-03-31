<template>
  <LayoutPage :title="$t('新增传阅')" :loading="submit_form_loading">
    <div class="form-content">
      <el-form ref="form" :model="form" :rules="formRules" label-width="200px">
        <el-form-item prop="title" :label="$t('传阅主题')">
          <el-input
            v-model="form.title"
            :placeholder="$t('请输入传阅主题,不能超过120个字')"
            :style="{ width: '100%' }"
          ></el-input>
        </el-form-item>
        <el-form-item prop="content" :label="$t('传阅内容')">
          <Editor
            v-model="form.content"
            class="editor-style"
            :style="{ height: '350px' }"
            :config="editorOption"
          />
        </el-form-item>
        <el-form-item prop="to_users" :label="$t('传阅对象')">
          <div class="select-tag-wrap">
            <el-button
              class="select-tag-button is-active"
              :style="{ 'font-size': '14px' }"
              plain
              @click="openDialogSelectOrganization"
              >{{ $t('选择传阅对象') }}</el-button
            >
            <div class="tag-box">
              <el-tag
                v-for="(item, index) in checked_users"
                :key="item.key"
                class="oa-tag"
                closable
                :disable-transitions="false"
                @close="handleTagClose(index)"
              >
                {{ item.name }}
              </el-tag>
            </div>
          </div>
        </el-form-item>
        <el-form-item prop="attach_url" :label="$t('传阅附件')">
          <Upload
            v-model="form.attach_url"
            :label="$t('选择附件')"
            type="label"
            :limit="4"
          ></Upload>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="submit_form_loading"
            type="primary"
            @click="validate_submit_form('form')"
            >{{ $t('发布传阅') }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <dialog-select-organization
      ref="selectOrganization"
      :dialog-title="$t('选择传阅对象')"
      :dialog-visible="dialogVisible"
      :limit-rank="true"
      :is-filter-hide="true"
      :is-filter-department="true"
      width="656px"
      from="member"
      @cancel="dialogVisible = false"
      @definite="dialogSelectOrgDefinite"
      @init-complete="initComplete"
    ></dialog-select-organization>
  </LayoutPage>
</template>

<script>
import Editor from '@kali/editor'
import dialogSelectOrganization from '~/components/dialog_select_organization'
import Upload from '~/components/upload'
export default {
  components: {
    dialogSelectOrganization,
    Upload,
    Editor
  },
  data() {
    return {
      form: {
        title: '',
        content: '',
        to_users: [],
        attach_url: ''
      },
      submit_form_loading: false,
      formRules: {
        title: [
          {
            required: true,
            message: '请输入传阅主题,不能超过120个字',
            trigger: 'change'
          },
          {
            min: 1,
            max: 120,
            message: '长度不能超过120个字符',
            trigger: 'change'
          }
        ],
        content: [
          { required: true, message: '请输入传阅内容', trigger: 'change' }
        ],
        to_users: [
          {
            type: 'array',
            required: true,
            message: '请选择传阅对象',
            trigger: 'change'
          }
        ]
      },
      fileList: [],
      dialogVisible: false,
      pageLoading: true,
      checked_users: []
    }
  },
  computed: {
    editorOption() {
      const api = this.$config.client.api
      const token = this.$store.state.user.user.token
      const url = `?ct=upload&ac=upload&ajax=1&token=${token}&display=web`
      return {
        upload_img_url: api + url,
        upload_video_url: api + url
      }
    }
  },
  watch: {
    'form.content'(nv, ov) {
      this.$refs.form.validateField('content')
    },
    'form.to_users'(nv, ov) {
      this.$refs.form.validateField('to_users')
    }
  },
  mounted() {},
  methods: {
    async submit_form() {
      this.submit_form_loading = true
      const form = this.form
      const submitData = {
        title: form.title,
        content: form.content,
        to_users: form.to_users,
        attach_url: form.attach_url
      }
      if (submitData.to_users && submitData.to_users.length >= 1)
        submitData.to_users = submitData.to_users.join(',')
      try {
        const rs = await this.$api.circulate.ajaxAddCirculate(submitData)
        this.submit_form_loading = false
        if (rs) {
          this.$message({
            message: rs.msg,
            type: 'success'
          })
          // this.$refs.form.resetFields()
          setTimeout(() => {
            this.$router.push('/circulate')
          }, 1500)
        }
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    validate_submit_form(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit_form()
        } else {
          return false
        }
      })
    },
    initComplete() {
      this.pageLoading = false
    },
    openDialogSelectOrganization() {
      this.dialogVisible = true
    },
    dialogSelectOrgDefinite(list) {
      this.dialogVisible = false
      this.checked_users = list
      this.form.to_users = []
      for (let i = 0; i < list.length; i++) {
        this.form.to_users.push(list[i].id)
      }
    },
    handleTagClose(index) {
      this.checked_users.splice(index, 1)
      this.$refs.selectOrganization.set_checked_data(this.checked_users)
      if (this.checked_users.length <= 0) {
        this.form.to_users = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.form-content {
  background: #fff;
  padding: 40px 30px;
  .form-label {
    padding-top: 10px;
  }
}
.select-tag-wrap {
  .select-tag-button {
    display: inline-block;
  }
  .tag-box {
    display: inline-block;
    .oa-tag {
      margin: 0 5px;
    }
  }
}
/deep/ .quill-editor .ql-snow .ql-picker {
  line-height: 24px;
}
</style>
