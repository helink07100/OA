<template>
  <div class="label-status" :class="['label-' + status]">{{ name }}</div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '状态'
    },
    // danger,warning,success,info 4种状态类型
    status: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.el-table__body-wrapper {
  .label-status {
    font-size: 14px;
  }
}

.label-status {
  display: inline-block;
  background: rgba(255, 171, 43, 0.1);
  border-radius: 16px;
  border-radius: 16px;
  text-align: center;
  font-size: 12px;
  padding: 5px 20px;
  &.label-info {
    background: #cbd2e2;
    color: #eff0f4;
  }
  &.label-danger {
    background: rgba(253, 70, 59, 0.08);
    color: @color-danger;
  }
  &.label-warning {
    background: rgba(255, 171, 43, 0.08);
    color: @color-warning;
  }
  &.label-success {
    background: rgba(109, 210, 48, 0.08);
    color: @color-success;
  }
  &.label-blue {
    background: rgba(63, 120, 246, 0.1);
    color: @color-primary;
  }
}
</style>
