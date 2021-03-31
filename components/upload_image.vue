<template>
  <div class="dp-upload-single-image">
    <el-upload
      :action="uploadAction"
      ref="uploadImage"
      :file-list="fileList"
      list-type="picture-card"
      name="file"
      :limit="limitCount"
      :disabled="disabled"
      :data="verify"
      :multiple="true"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :on-preview="handlePictureCardPreview"
    >
      <i class="el-icon-plus"></i>

      <div slot="file" slot-scope="{ file }">
        <div class="dp-upload-item">
          <el-progress
            v-if="file.status === 'uploading'"
            class="upload-progress"
            type="circle"
            :percentage="parseInt(file.percentage)"
          />
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
          <span class="el-upload-list__item-actions">
            <span
              class="el-upload-list__item-preview"
              @click="handlePictureCardPreview(file)"
            >
              <i class="el-icon-zoom-in"></i>
            </span>
          </span>
        </div>
        <span class="dp-upload-item-delete" @click="handleRemove(file)">
          <i class="el-icon-delete"></i>
        </span>
      </div>
    </el-upload>
    <div class="el-upload__tip">{{ tip }}</div>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DpUpload',
  props: {
    name: {
      type: String,
      default: 'img'
    },
    tip: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    btn: {
      type: Array,
      default() {
        return ['show', 'delete', 'reload']
      }
    },
    limitCount: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      fileList: [],
      verify: {},
      url: '',
      dialogVisible: false,
      dialogImageUrl: '',
      errorImg: false
    }
  },
  computed: {
    uploadAction() {
      const url = this.$config.client.api
      const token = this.$store.state.user.user.token
      return `${url}?ct=upload&ac=upload&display=web&ajax=1&token=${token}`
    },
    uploadUrl() {
      return this.$store.state.user.user.upload_url
    }
  },
  methods: {
    beforeUpload(file) {
      if (!/.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(file.type)) {
        this.$message.error('只允许上传图片')
        return false
      }
      const isLt20M = file.size / 1024 / 1024 < 20
      if (!isLt20M) {
        this.$message.error('上传文件大小不能超过 20M!')
        return false
      }
      return isLt20M
    },
    onSuccess(response, file, fileList) {
      this.updateValue(fileList)
    },
    handlePreview() {
      this.dialogVisible = true
    },
    // handleRemove(file) {
    //   this.$emit('input', [])
    // },
    imgLoad(e) {
      this.errorImg = false
    },
    imgError() {
      this.errorImg = true
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleRemove(file) {
      this.$refs.uploadImage.handleRemove(file)
      this.updateValue(this.$refs.uploadImage.uploadFiles)
    },
    updateValue(fileList) {
      const imgs = []
      fileList.forEach((img) => {
        if (img.percentage >= 100 && img.status === 'success') {
          imgs.push({
            filelink: img.response.data.filelink,
            filename: img.response.data.filename,
            realname: img.response.data.realname
          })
        }
      })

      this.$emit('input', imgs)
    }
  }
}
</script>

<style lang="less" scope>
@item-size: 56px;
.dp-upload-single-image {
  display: inline-block;
  vertical-align: top;

  /deep/ .el-upload--picture-card {
    position: relative;
    width: @item-size;
    height: @item-size;
  }

  /deep/ .el-upload-list__item {
    width: @item-size;
    height: @item-size;
    overflow: inherit;
    margin-right: 15px;
    margin-bottom: 15px;
  }

  .dp-upload-item {
    position: relative;
    width: @item-size;
    height: @item-size;
    border-radius: 6px;
    overflow: hidden;
  }

  .dp-upload-item-delete {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -10px;
    right: -10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #f56c6c;

    i {
      color: #fff;
      font-size: 12px;
    }
  }

  .el-upload--text {
    background-color: #fbfdff;
  }

  .upload-progress {
    position: absolute;
    width: 80%;
    height: 80%;
    background-color: rgba(0, 0, 0, 0.6);

    /deep/ .el-progress-circle {
      width: 100% !important;
      height: 100% !important;
    }
    /deep/ .el-progress__text {
      color: #fff;
    }
    .el-progress-circle {
      margin: 0 auto;
    }
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }

  &:hover .el-icon-plus {
    color: #409eff;
  }

  .el-icon-plus {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -14px;
  }
}
</style>
