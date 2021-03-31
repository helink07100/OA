<template>
  <el-form-item
    class="control-form-flex upload-form"
    :label="labelComputed"
    :prop="propComputed()[0]"
    :rules="
      items.verify
        ? [
            {
              required: true,
              message:
                items.name +
                (items.en_name ? ' / ' + items.en_name : '') +
                '必传项',
              trigger: 'change'
            }
          ]
        : []
    "
  >
    <uploadImage
      v-model="items.value"
      :limit-count="10"
      @input="change"
    ></uploadImage>
    <slot></slot>
  </el-form-item>
</template>
<script>
import uploadImage from '../upload_image'
import controlForm from '@/mixins/control_form'

export default {
  components: {
    uploadImage
  },
  mixins: [controlForm],
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    index: {
      type: Number,
      default: -1
    },
    buttonText: {
      type: String,
      default: ''
    },
    tip: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 0
    },
    blockSortid: {
      type: [Number, String],
      default: -1
    },
    blockIndex: {
      type: [Number, String],
      default: -1
    }
  },
  methods: {
    propComputed() {
      if (this.blockIndex) {
        return [
          'controlList.' +
            this.blockIndex +
            '.formList.' +
            this.index +
            '.value'
        ]
      } else {
        return ['controlList.' + this.index + '.value']
      }
    },
    change(value, realname) {
      // this.items.value = value
      this.$emit('change', value, realname)
    }
  }
}
</script>
<style lang="less" scoped></style>
