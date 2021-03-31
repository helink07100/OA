<template>
  <div class="approver-nodes" :class="[type, { cross: cross }]">
    <div class="left">
      <i v-if="isClose" class="close" @click="$emit('close')"></i>
      <div class="title" :class="[pointer ? 'cp' : '']" @click="$emit('edit')">
        {{ desc }}
      </div>
      <div class="content">
        <span class="text">{{ title }}</span>
      </div>
    </div>
    <div v-if="isLine" class="line"></div>
  </div>
</template>
<script>
export default {
  props: {
    pointer: Boolean,
    isLine: Boolean,
    cross: { type: [Boolean, Number] },
    title: {
      type: String,
      default: '标题'
    },
    type: {
      type: String,
      default: ''
    },
    isClose: {
      type: Boolean,
      default: true
    },
    desc: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
.approver-nodes {
  align-items: center;
  display: inline-flex;
  .left {
    min-width: 140px;
    text-align: center;
    background: #ffffff;
    border: 1px solid #ffffff;
    box-shadow: 0 2px 4px 0 #ececec;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    .close {
      width: 18px;
      height: 18px;
      position: absolute;
      top: -1px;
      right: -1px;
      background: url('~assets/image/approver-nodes-close.png') no-repeat center;
      cursor: pointer;
    }
    .title {
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      color: #ffffff;
    }
    .content {
      padding: 10px 0;
      line-height: 40px;
      font-size: 12px;
      color: #292929;
    }
  }
  .line {
    margin: 0 30px;
    display: flex;
    align-items: center;
    &::before {
      content: '';
      width: 63px;
      height: 2px;
      background: #c3c6cb;
      display: block;
    }
    &::after {
      content: '';
      width: 6px;
      height: 6px;
      background: #c3c6cb;
      display: block;
      border-radius: 100%;
    }
  }

  &.station .title {
    background: @color-danger;
  }
  &.department .title {
    background: @color-warning;
  }
  &.organization .title {
    background: @color-success;
  }
  &.member .title {
    background: @color-primary;
  }
  &.cc_person .title {
    background: #8790ac;
  }
  &.applicant .title {
    background: #771039;
  }
  &.member.cross .title {
    background: @color-cross;
  }
}
</style>
