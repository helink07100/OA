<!--
*@name name-nodes 用于审核流程中的用户节点数据展示头像与名称
-->
<template>
  <div class="name-nodes fx-dstart">
    <div class="avatar" :style="{ background: bgcolor }">
      {{ name | filter_avatar_initials }}
    </div>
    <div class="info">
      <div class="name">{{ name }}</div>
      <div class="desc">{{ desc }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NameNodes',
  filters: {
    filter_avatar_initials(val) {
      if (val && val.length >= 1) return val.substr(0, 1)
      else return val
    }
  },
  props: {
    initials: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    bgcolor: {
      type: String,
      default: '#44b600'
    }
  }
}
</script>

<style lang="less" scoped>
.name-nodes {
  display: flex;
  align-items: center;
  font-size: 16px;

  &.node-warning {
    .avatar {
      background: @color-warning !important;
    }
  }

  &.node-info {
    .avatar {
      background: @color-info !important;
    }
  }

  &.node-danger {
    .avatar {
      background: @color-danger !important;
    }
  }

  &.node-success {
    .avatar {
      background: @color-success !important;
    }
  }

  .avatar {
    min-width: 40px;
    height: 40px;
    line-height: 40px;
    background: #44b600;
    text-align: center;
    color: #fff;
    border-radius: 100%;
  }
  .info {
    padding-left: 14px;
    text-align: left;
    .name {
      color: #333333;
      line-height: 20px;
    }
    .desc {
      color: #787878;
      line-height: 24px;
      font-size: 12px;
    }
  }
}
</style>
