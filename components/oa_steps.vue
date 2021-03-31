<template>
  <div class="oa-steps-wrap">
    <ul class="steps-box">
      <template v-for="(item, index) in lists">
        <li :key="index" class="steps" :class="{ active: active >= item.id }">
          <label class="name">{{ item.name }}</label>
          <div class="icon">{{ index + 1 }}</div>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    active: {
      default: 1,
      type: Number
    },
    lists: {
      type: Array,
      default: () => [
        {
          id: 1,
          name: '第一步'
        },
        {
          id: 2,
          name: '第二步'
        },
        {
          id: 3,
          name: '第三步'
        }
      ]
    }
  }
}
</script>
<style lang="less" scoped>
@stepsColor: #c6cede;
@stepsColorActive: #fe9310;
.oa-steps-wrap {
  .steps-box {
    display: flex;
    align-items: center;
    .steps {
      width: 100%;
      text-align: center;
      margin-right: 10px;
      position: relative;
      .name {
        color: @stepsColor;
      }
      .icon {
        width: 18px;
        height: 18px;
        line-height: 18px;
        text-align: center;
        border-radius: 100%;
        background: @stepsColor;
        font-size: 14px;
        color: #ffffff;
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 30%);
        &::after {
          content: '';
          width: 0;
          height: 0;
          border: 4px solid transparent;
          border-bottom-color: @stepsColor;
          position: absolute;
          left: 50%;
          top: 1px;
          transform: translate(-50%, -100%);
        }
      }
      &::after {
        content: '';
        width: 100%;
        height: 5px;
        background: @stepsColor;
        border-radius: 5px;
        display: block;
        margin-top: 12px;
      }
      &:last-child {
        margin-right: 0;
      }
      &.active {
        .name {
          color: @stepsColorActive;
        }
        &::after,
        .icon {
          background: @stepsColorActive;
        }
        .icon {
          &::after {
            border-bottom-color: @stepsColorActive;
          }
        }
      }
    }
  }
}
</style>
