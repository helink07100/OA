<!-- text、textarea、number -->
<template>
  <el-form-item class="drag-block" label="">
    <div class="block-header">
      <div class="block-name">{{ labelComputed }}</div>
    </div>
    <div class="block-con">
      <draggable
        :formControl="items"
        :departmentData="departmentData"
        :blockIndex="index"
        :disabled="disabled"
      ></draggable>
    </div>
    <slot></slot>
  </el-form-item>
</template>
<script>
import controlForm from '@/mixins/control_form'
export default {
  mixins: [controlForm],
  props: {
    index: {
      default: 0,
      type: Number
    },
    disabled: {
      default: false,
      type: Boolean
    },
    departmentData: {
      default: () => [],
      type: Array
    }
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {}
  },
  mounted() {
    if (this.items.type === 'block') this.items.blockSortid = this.items.sortid
  },

  // 防止组件重复渲染冲突问题
  beforeCreate() {
    this.$options.components.draggable = () => import('./draggable')
  }
}
</script>
<style lang="less" scoped></style>
