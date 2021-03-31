<!-- 金额 money -->
<template>
  <el-form-item
    class="control-form-flex"
    :label="labelComputed"
    :required="items.verify"
  >
    <el-form-item
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
        v-model="items.value"
        :placeholder="items.placeholder"
        :disabled="disabled"
        maxlength="25"
      ></el-input>
    </el-form-item>
    <el-form-item
      label-width="10px"
      :prop="propComputed()[1]"
      :rules="
        items.verify
          ? [
              {
                required: true,
                message:
                  items.name +
                  (items.en_name ? ' / ' + items.en_name : '') +
                  '必选项',
                trigger: 'change'
              }
            ]
          : []
      "
    >
      <el-select
        v-model="items.select_value"
        :style="{ width: '100%' }"
        :name="'control_' + items.sortid + '.select_value'"
        :disabled="disabled"
        @change="change"
      >
        <el-option
          v-for="moneyKey in items.options"
          :key="moneyKey"
          :label="moneyKey.label ? moneyKey.label : moneyKey"
          :value="moneyKey.value ? moneyKey.value : moneyKey"
        ></el-option>
      </el-select>
    </el-form-item>
    <slot></slot>
  </el-form-item>
</template>
<script>
import controlForm from '@/mixins/control_form'
export default {
  mixins: [controlForm],
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
    },
    change(value) {
      this.$emit('change', value)
    }
  }
}
</script>
