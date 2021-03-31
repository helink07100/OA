<template>
  <div class="radius-add-button" @click="$emit('on')">
    <i class="iconfont icon-tianjiaricheng"></i>
  </div>
</template>

<style lang="less" scoped>
.radius-add-button {
  width: 64px;
  height: 64px;
  line-height: 64px;
  text-align: center;
  border-radius: 100%;
  cursor: pointer;
  border: 1px dashed rgba(65, 122, 246, 0.3);
  .icon-tianjiaricheng {
    font-size: 32px;
    color: @color-primary;
  }
}
</style>
