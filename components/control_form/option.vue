<template>
  <div v-if="controlOptions && controlOptions.length" class="option">
    <span v-if="unit" class="ml-ss">{{ unit }}</span>
    <span
      v-if="controlOptions.includes('edit')"
      :class="[
        'text-primary ml-ss cup',
        { 'block-name': formItemData.type === 'block' }
      ]"
      @click="edit"
      >编辑</span
    >
    <span
      v-if="controlOptions.includes('draggable')"
      :class="[
        'text-primary cup',
        { 'block-name': formItemData.type === 'block' }
      ]"
      @click="edit"
      >拖动</span
    >
    <span
      v-if="controlOptions.includes('del')"
      :class="[
        'text-danger cup',
        { 'block-name': formItemData.type === 'block' }
      ]"
      @click="del"
      >删除</span
    >
  </div>
</template>

<script>
export default {
  props: {
    index: {
      default: 0,
      type: Number
    },
    blockIndex: {
      default: 0,
      type: [Number, String]
    },
    formItemData: {
      type: Object,
      default: () => {}
    },
    controlOptions: {
      type: Array,
      default: () => []
    },
    unit: {
      type: String,
      default: ''
    }
  },
  methods: {
    // 弹窗编辑
    edit() {
      this.$bus.$emit('formItemEdit', {
        item: this.formItemData,
        blockIndex: this.blockIndex
      })
    },
    del() {
      this.$store.commit('form/deleteControlItem', {
        item: this.formItemData,
        blockIndex: this.blockIndex
      })
    }
  }
}
</script>

<style lang="less" scoped>
.icon-tuozhuai {
  cursor: all-scroll;
}
.cup {
  cursor: pointer;
}
</style>
