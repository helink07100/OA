<!--
  upload_detail 上传文件，
-->
<template>
  <el-upload
    ref="upload"
    class="oa-upload flex"
    :class="{ 'hide-btn': hideBtn }"
    :action="uploadAction"
    :data="options"
    :file-list="fileList"
    :on-success="handle_success"
    :on-remove="handle_remove"
    :disabled="disabled"
    :before-upload="before_upload"
    :http-request="uploadHandle"
    :limit="limit"
  >
    <div class="el-upload-list el-upload-list--picture-card f1">
      <uiFile
        :file="$attrs.value"
        :showControl="hideBtn"
        @removeFile="handle_remove"
      />
    </div>
    <div slot="trigger">
      <i
        v-if="progress === 0 || progress === '100.00' || progress === 100"
        class="el-icon-plus"
      ></i>
      <el-progress
        v-else
        class="upload-progress"
        :width="100"
        type="circle"
        :percentage="progress"
      >
      </el-progress>
    </div>
    <slot></slot>
  </el-upload>
</template>

<script>
import uiFile from '~/components/file/index'
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    hideBtn: {
      default: false,
      type: Boolean
    },
    type: {
      type: String,
      default: ''
    },
    disabled: {
      default: false,
      type: Boolean
    },
    tip: {
      defalut: '',
      type: String
    },
    limit: {
      type: Number,
      default: 1
    }
  },
  components: {
    uiFile
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      progress: 0,
      fileList: [],
      isChunk: false
    }
  },
  computed: {
    options() {
      return {
        ajax: 1,
        token: this.$store.state.user.user.token
      }
    },
    uploadAction() {
      const url = this.$config.client.api
      const token = this.$store.state.user.user.token
      return `${url}?ct=upload&ac=upload&display=web&ajax=1&token=${token}`
    }
  },
  watch: {
    '$attrs.value': {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
          this.fileList = newVal.map((i) => {
            if (typeof i === 'string') {
              return {
                name: i,
                url:
                  this.$config.client.api + '/?ct=upload&ac=download&file=' + i
              }
            } else {
              return {
                name: i.name,
                url: i.filelink
              }
            }
          })
        } else {
          return []
        }
      }
    }
  },
  methods: {
    uploadHandle(params) {
      const url = this.$config.client.api
      const token = this.$store.state.user.user.token
      if (this.isChunk) {
        params.action = `${url}?ct=upload&ac=upload_chunked&display=web&ajax=1&token=${token}`
      } else {
        params.action = `${url}?ct=upload&ac=upload&display=web&ajax=1&token=${token}`
      }

      params.onProgress = this.getProgress
      this.$utils.upload.request(params).then()
    },
    getProgress(e) {
      console.log(e.percent)
      this.progress = e.percent
    },
    handle_file_data(list, isDel) {
      if (isDel) {
        this.$emit('input', list)
      } else {
        const newList = JSON.parse(JSON.stringify(this.$attrs.value)) || []
        list.forEach((i) => {
          if (i.response) {
            const data = i.response.data
            newList.push({
              filename: data.filename,
              filelink: data.filelink,
              name: data.realname,
              size: i.size
            })
          }
        })
        this.$emit('input', newList)
      }
    },
    clearFiles() {
      this.$refs.upload.clearFiles()
    },
    handle_success(response, file, fileList) {
      if (response.code !== -1) {
        this.handle_file_data(fileList, false)
      } else {
        this.fileList = fileList.splice(fileList.length - 1, 1)
        this.$message.error(response.msg)
      }
    },
    handle_remove(file) {
      const fileList = [].concat(this.$attrs.value)
      fileList.splice(file.index, 1)
      this.handle_file_data(fileList, true)
    },
    before_upload(file) {
      // 判断是否需要分片
      this.isChunk = file.size / 1024 / 1024 > 1

      const isLt2M = file.size / 1024 / 1024 < 20
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 20M!')
      }
      return isLt2M
    }
  }
}
</script>

<style lang="less" scoped>
.oa-upload {
  /deep/.el-upload {
    margin-right: 15px;
    width: 56px;
    height: 56px;
    line-height: 56px;
    font-size: 17px;
    color: #d8d8d8;
    border-radius: 4px;
    border: 1px solid #e8e8e9;
  }

  /deep/.el-progress {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 4px;

    .el-progress-circle {
      border-radius: 4px;
      width: 56px !important;
      height: 56px !important;
    }

    .el-progress__text {
      color: #fff;
    }
  }

  &.hide-btn {
    /deep/ .el-upload {
      margin-right: 0;
      width: 0;
      height: 56px;
      border: none;
    }
    .btn-trigger {
      display: none;
    }
  }

  /deep/.el-upload-list.el-upload-list--text {
    display: none;
  }
}
</style>
