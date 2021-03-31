<!-- 日期 date -->
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
                '必选项',
              trigger: 'change'
            }
          ]
        : []
    "
  >
    <el-date-picker
      v-model="items.value"
      :style="{ width: '100%' }"
      :type="typeComputed(items)"
      :value-format="items.date_format"
      :name="'control_' + items.sortid"
      :disabled="disabled"
      :placeholder="items.placeholder"
    >
    </el-date-picker>
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
    typeComputed(item) {
      if (item.date_format === 'yyyy-MM-dd' || item.date_format === 'Y-m-d') {
        item.date_format = 'yyyy-MM-dd'
        return 'date'
      }
      if (
        item.date_format === 'yyyy-MM-dd HH:mm' ||
        item.date_format === 'Y-m-d H:i'
      ) {
        item.date_format = 'yyyy-MM-dd HH:mm'
        return 'datetime'
      }
      return 'date'
    }
  }
}
</script>
