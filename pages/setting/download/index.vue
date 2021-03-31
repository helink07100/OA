<template>
  <LayoutPage title="表单下载设定">
    <div slot="header-right">
      <el-button
        :disabled="loading"
        type="primary"
        size="medium"
        @click="review"
        >预览</el-button
      >
    </div>
    <el-form
      ref="formData"
      :model="formData"
      label-width="120px"
      class="form-base download-con"
    >
      <PageCard :title="$t('表单设定')">
        <el-form-item
          label="上传背景图："
          prop="page_bg"
          class="element-form-item"
        >
          <el-col :span="8">
            <uploadImage
              v-model="formData.page_bg"
              :limit-count="1"
            ></uploadImage>
          </el-col>
        </el-form-item>
      </PageCard>
      <PageCard :title="$t('表单元素')">
        <el-row :gutter="20">
          <el-col :span="13">
            <el-form-item
              label="表单标题："
              prop="tableTitle"
              class="element-form-item"
            >
              <uiElement
                v-model="formData.tableTitle"
                element-type="font"
                :show-text-align-options="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="编号：" prop="NO" class="element-form-item">
              <uiElement v-model="formData.NO" element-type="font" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="表格：" prop="table" class="element-form-item">
              <uiElement v-model="formData.table" element-type="table" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="13">
            <el-form-item
              label="分割线底色："
              prop="lineBg"
              class="element-form-item"
            >
              <uiElement v-model="formData.lineBg" element-type="line" />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="分割线文字："
              prop="lineFont"
              class="element-form-item"
            >
              <uiElement v-model="formData.lineFont" element-type="font" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="13">
            <el-form-item
              label="问题："
              prop="question"
              class="element-form-item"
            >
              <uiElement
                v-model="formData.question"
                element-type="font"
                :show-text-align-options="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="答案："
              prop="answer"
              class="element-form-item"
            >
              <uiElement v-model="formData.answer" element-type="font" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="13">
            <el-form-item
              label="审批人："
              prop="approver"
              class="element-form-item"
            >
              <uiElement
                v-model="formData.approver"
                element-type="font"
                :show-text-align-options="true"
              />
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="审批结果："
              prop="result"
              class="element-form-item"
            >
              <uiElement v-model="formData.result" element-type="font" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item>
          <el-button
            :disabled="loading"
            type="primary"
            size="medium"
            @click="onSubmit"
            >提交</el-button
          >
        </el-form-item>
      </PageCard>
    </el-form>
  </LayoutPage>
</template>
<script>
import uiElement from './components/element'
import uploadImage from '@/components/upload_image'

export default {
  components: {
    uploadImage,
    uiElement
  },
  data() {
    return {
      loading: false,
      formData: {
        page_bg: '',
        tableTitle: {
          fontSize: 'font-size: 28px;',
          fontStyle: 'font-weight: bold;',
          fontColor: 'color: #333333;',
          textAlign: 'text-align: left'
        },
        NO: {
          fontSize: 'font-size: 12px;',
          fontStyle: 'font-weight: normal;',
          fontColor: 'color: #666666;'
        },
        table: {
          borderStyle: 'border-style: solid;',
          borderWidth: 'border-width: 1px;',
          borderColor: 'border-color: #333333;'
        },
        lineBg: {
          backgroundColor: 'background-color: #a6a6a6;'
        },
        lineFont: {
          fontSize: 'font-size: 12px;',
          fontStyle: 'font-weight: normal;',
          fontColor: 'color: #ffffff;'
        },
        question: {
          fontSize: 'font-size: 12px;',
          fontStyle: 'font-weight: normal;',
          fontColor: 'color: #666666;',
          textAlign: 'text-align: left'
        },
        answer: {
          fontSize: 'font-size: 12px;',
          fontStyle: 'font-weight: normal;',
          fontColor: 'color: #666666;'
        },
        approver: {
          fontSize: 'font-size: 14px;',
          fontStyle: 'font-weight: normal;',
          fontColor: 'color: #888888;',
          textAlign: 'text-align: left'
        },
        result: {
          fontSize: 'font-size: 12px;',
          fontStyle: 'font-weight: normal;',
          fontColor: 'color: #666666;'
        }
      },
      positionDict: [
        { name: '居左', value: 1 },
        { name: '居中', value: 2 },
        { name: '居右', value: 3 }
      ],
      valDict: {
        fontColor: 'color: ',
        borderColor: 'border-color: ',
        backgroundColor: 'background-color: '
      },
      editData: {}
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    async onSubmit() {
      this.loading = true
      const form = JSON.parse(JSON.stringify(this.formData))
      for (const key in form) {
        for (const nkey in form[key]) {
          if (nkey.match('Color')) {
            const valName = this.valDict[nkey]
            form[key][nkey] = valName + form[key][nkey] + ';'
          }
        }
      }

      const result = await this.$api.form.settingDownload(form)
      if (result.code === 0) {
        this.$message.success('设置成功')
      }
      this.loading = false
    },
    async getDetail() {
      const res = await this.$api.form.reViewSettingDownload()
      if (res) {
        // TODO: res.data 缺少 [文字位置] 字段
        this.formData = Object.assign(this.formData, res.data)
      }
    },
    async review() {
      const res = await this.$api.form.getPdfPreview()
      if (res) {
        this.$utils.download(res.data.url)
      }
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.dp-upload-single-image .avatar-uploader {
  width: 100px;
  height: 100px;
}

.download-con /deep/.content {
  padding: 10px 40px;

  .element-form-item {
    margin-top: 22px;
  }

  .el-row {
    border-bottom: 1px solid #f4f6f9;
  }
}
/deep/.el-color-dropdown__btns {
  .el-button {
    width: auto;
  }
}
</style>
