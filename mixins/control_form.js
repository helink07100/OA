/**
 * 用于流程的创建表单控件组件
 * 〜/components/control_form/*
 */
export default {
  props: {
    isVerify: Boolean,
    disabled: Boolean,
    items: {
      type: Object,
      default: () => {}
    }
  },
  inject: ['lang'],
  computed: {
    labelComputed() {
      if (this.lang) {
        if (this.lang === 'en') {
          return this.items.en_name
            ? this.items.en_name + '：'
            : this.items.name + '：'
        } else {
          return this.items.name + '：'
        }
      } else {
        return (
          this.items.name +
          (this.items.en_name ? ' / ' + this.items.en_name : '') +
          '：'
        )
      }
    }
  }
}
