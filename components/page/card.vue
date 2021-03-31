<template>
  <div class="page-card">
    <div v-if="title" class="header">
      <img class="logo" src="~assets/image/page-card-title.svg" alt="" />
      <p class="title">{{ title }}</p>
      <div class="other"><slot name="other"></slot></div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageCard',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
.page-card {
  background-color: #fff;
  & + & {
    margin-top: 10px;
  }

  &.no-title {
    padding-top: 50px;
  }
}
.header {
  padding: 40px;
  display: flex;
  align-items: center;

  .logo {
    width: 20px;
    margin-right: 14px;
  }

  .title {
    font-size: 20px;
    color: #424242;
  }
}
.content {
  padding: 10px 70px;
}
</style>
