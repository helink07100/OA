<!-- text、textarea、number -->
<template>
  <el-form-item
    class="control-form-flex"
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
                '必填项',
              trigger: 'change'
            }
          ]
        : []
    "
  >
    <el-input
      :type="items.type ? items.type : 'text'"
      :value="items.value"
      :rows="5"
      resize="none"
      :placeholder="items.placeholder"
      :disabled="disabled"
      :maxlength="items.type === 'textarea' ? 2500 : 50"
      @input="$emit('input', $event)"
    ></el-input>
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
  },
  props: {
    index: {
      type: Number,
      default: -1
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
    }
  }
}
</script>
