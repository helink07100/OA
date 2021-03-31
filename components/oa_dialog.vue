<template>
  <el-dialog
    class="oa-dialog"
    :title="title"
    :visible="dialogVisible"
    :width="width"
    :append-to-body="true"
    @close="$emit('close', false)"
  >
    <slot></slot>
  </el-dialog>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '50%'
    },
    title: {
      type: String,
      default: ''
    },
    dialogVisible: Boolean
  }
}
</script>

<style lang="less" scoped>
.oa-dialog {
  /deep/ .el-dialog {
    min-width: 700px;
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
