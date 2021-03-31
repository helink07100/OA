/**
 * 审批流程管理->用于审批条件设定->当审批同时满足以下条件时
 */
export default {
  props: {
    items: {
      type: Object,
      default: () => {}
    },
    itemKey: {
      type: String,
      default: ''
    }
  },
  methods: {
    delControlsItem(key) {
      this.$emit('del', key)
    }
  }
}
