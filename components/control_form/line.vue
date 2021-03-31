<!-- text、textarea、number -->
<template>
  <el-form-item class="control-form-flex" label="" label-width="0">
    <div class="border-bottom">
      <div class="inline">
        <span> {{ labelComputed }}</span>
      </div>
    </div>
    <slot></slot>
  </el-form-item>
</template>

<script>
import controlForm from '@/mixins/control_form'
export default {
  mixins: [controlForm],
  model: {
    prop: 'value',
    event: 'input'
  }
}
</script>
<style lang="less" scoped>
@import '../../assets/less/page/form.less';
.form-item-line {
  margin-left: 200px;
}
.block-con .border-bottom {
  margin-left: 50px;
}

.border-bottom {
    flex: 1;
  /deep/ & + .option {
    position: relative;
    bottom: -36px;
  }
}

.inline {
  /deep/.el-input.is-disabled .el-input__inner {
    position: relative;
    padding: 0;
    width: 150px;
    color: #606060;
    border: none;
    background: #fff;
    text-align: center;
    z-index: 2;
  }
}
</style>
