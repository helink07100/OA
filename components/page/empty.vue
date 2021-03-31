<template>
  <div class="null-data-msg" :style="styles">
    <i class="iconfont icon-wushuju"></i>
    <div class="text">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  name: 'PageEmpty',
  props: {
    msg: {
      type: String,
      default: '什么也没有！'
    },
    styles: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.null-data-msg {
  text-align: center;
  .icon-wushuju {
    font-size: 30px;
    color: #c3c6cb;
  }
  .text {
    color: #c3c6cb;
  }
}
</style>
