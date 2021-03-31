<template>
  <!-- 单选框 radio -->
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
              trigger: ['change', 'blur']
            }
          ]
        : []
    "
  >
    <el-radio-group v-model="items.value">
      <el-radio
        v-for="radiokey in items.options"
        :key="radiokey"
        :label="radiokey"
        :name="'control_' + items.sortid"
        :disabled="disabled"
        >{{ radiokey }}</el-radio
      >
    </el-radio-group>
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
