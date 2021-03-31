/**
 * 用于流程的创建表单新增控件弹窗
 */
import controls from './controls'
export default {
  data() {
    return {
      formData: {}
    }
  },
  mixins: [controls],
  props: {
    items: {
      type: Object,
      default: () => {}
    },
    hasEdit: Boolean,
    dialogVisible: Boolean
  },
  asyncData({ query }) {
    return {
      form_id: query.form_id
    }
  },
  watch: {
    dialogVisible: {
      immediate: true,
      handler(nv, ov) {
        if (nv) {
          const name = this.controls.find((item) => {
            return this.items.type === item.type
          }).name
          this.$emit('upTitle', name)
          if (this.hasEdit) {
            this.form = JSON.parse(JSON.stringify(this.items))
          } else {
            this.formData = JSON.parse(JSON.stringify(this.form))
          }
        } else {
          Object.assign(this.form, this.formData)
          this.$refs.form.resetFields()

          if (
            this.form.type === 'select' ||
            this.form.type === 'multi_select'
          ) {
            this.form.blockSortid = ''
            this.form.options = [{ value: '', label: '' }]
          }
        }
      }
    }
  },
  mounted() {},
  methods: {
    submitFrom() {
      this.$emit('define', this.form)
    }
  }
}
