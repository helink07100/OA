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
    :multiple="false"
    :limit="1"
  >
    <div class="el-upload-list el-upload-list--picture-card f1">
      <uiFile
        v-if="$attrs.value"
        :file="$attrs.value ? [$attrs.value] : []"
        :showControl="hideBtn"
        @removeFile="handle_remove"
      />
      <div v-else-if="hideBtn" class="text-normal">—</div>
    </div>
    <div class="btn-trigger" slot="trigger">
      <i v-if="percentage === 0" class="el-icon-plus"></i>
      <el-progress
        v-else
        class="upload-progress"
        :width="100"
        type="circle"
        :percentage="percentage"
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
    type: {
      type: String,
      default: ''
    },
    hideBtn: {
      default: false,
      type: Boolean
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
  model: {
    prop: 'value',
    event: 'input'
  },
  components: {
    uiFile
  },
  data() {
    return {
      percentage: 0,
      fileList: [],
      values: '',
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
        if (
          newVal &&
          newVal !== oldVal &&
          !newVal.lastModified &&
          Array.isArray(newVal)
        ) {
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
      this.$emit('input', params.file)
    },
    handle_file_data(list) {
      // 附件数据
      const new_list = []
      this.values = []
      for (let i = 0; i < list.length; i++) {
        const res = list[i].response
        const data = res.data
        new_list.push({
          filename: data.filename,
          filelink: data.filelink,
          name: data.realname
        })
        this.values.push(data.filename)
      }
      this.$emit('input', new_list)
    },
    clearFiles() {
      this.$refs.upload.clearFiles()
    },
    handle_success(response, file, fileList) {
      if (response.code !== -1) {
        this.handle_file_data(fileList)
      } else {
        this.fileList = fileList.splice(fileList.length - 1, 1)
        this.$message.error(response.msg)
      }
    },
    handle_remove() {
      this.$refs.upload.clearFiles()
      this.$emit('input', '')
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
