<template>
  <el-dialog
    class="detail-dialog"
    :title="title"
    :visible="dialogVisible"
    :modal="modal"
    width="50%"
    @close="$emit('close', false)"
  >
    <ul v-if="detailData" class="detail-info">
      <li>
        <label>消息标题</label>
        <span>{{ detailData.title }}</span>
      </li>
      <li v-if="detailData.type_name">
        <label>分类</label>
        <span>{{ detailData.type_name }}</span>
      </li>
      <li>
        <label>发送时间</label>
        <span>{{ detailData.create_time }}</span>
      </li>
      <li>
        <label>消息内容</label>
        <span>{{ detailData.text }}</span>
      </li>
    </ul>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('close', false)">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'Detail',
  props: {
    dialogVisible: Boolean,
    modal: Boolean,
    title: {
      type: String,
      default: '消息详情'
    },
    detailData: {
      type: Object,
      default: () => {}
    }
  },
  watch: {
    dialogVisible(nv) {
      if (nv) {
        this.setRead(this.detailData)
      }
    }
  },
  methods: {
    async setRead(item) {
      const res = await this.$api.message.setMessageRead({
        id: item.id
      })
      if (res) {
        this.$emit('readsuccess', res.data)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.detail-dialog {
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
.detail-info {
  li {
    padding-bottom: 15px;
    display: flex;
    align-items: center;
    label {
      width: 100px;
      font-size: 14px;
      padding-right: 20px;
      text-align: right;
    }
  }
}
</style>
