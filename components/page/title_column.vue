<!--
 *@name page-title-column 页面标题组件,通常是详情页用到
-->
<template>
  <div class="page-title-column">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      {{ title }}
      <slot v-if="!title" name="right"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.page-title-column {
  background: #fff;
  display: flex;
  align-items: center;
  justify-items: center;
  box-shadow: 0 0 6px 0 rgba(225, 226, 229, 0.5);
  border-radius: 2px;
  padding: 27px 0;
  margin-bottom: 10px !important;
  .center {
    flex: 1;
    text-align: center;
    font-size: 24px;
    color: #3a3a3a;
  }
  .right {
    padding-right: 40px;
  }
}
</style>
