<template>
  <div
    v-loading="loading"
    class="layout-page"
    :class="{ 'is-flex': flex, 'is-lock': loading }"
  >
    <slot name="header">
      <div class="header">
        <div class="left">
          <p v-if="title" class="title">{{ title }}</p>
          <slot name="header-left"></slot>
        </div>
        <div class="right">
          <slot name="header-right"></slot>
        </div>
      </div>
    </slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LayoutPage',
  props: {
    loading: Boolean,
    title: {
      type: String,
      default: ''
    },
    flex: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="less" scoped>
.layout-page {
  height: 100%;
  padding: 22px;
  background-color: @layout-page-bg;
  overflow: auto;
  &.is-lock {
    overflow: hidden;
  }
  &.is-flex {
    display: flex;
    flex-direction: column;
  }

  .header {
    padding: 8px 0 30px 0;
    display: flex;
    align-items: center;
    .left {
      flex: 1;
      text-align: left;
    }
  }
  .title {
    font-size: 20px;
    color: #333333;
  }
}
</style>
