<!-- 开始时间-结束时间 date_range -->
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
                  '必填',
                trigger: 'change'
              }
            ]
          : []
      "
    >
      <el-date-picker
        v-model="items.value"
        :style="{ width: '100%' }"
        :name="'control_' + items.sortid + '_start'"
        :disabled="disabled"
        :type="typeComputed(items)"
        :value-format="items.date_format"
        placeholder="选择开始日期"
        format="yyyy-MM-dd HH:mm"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item
      :label="
        items.name_end + (items.en_name_end ? ' / ' + items.en_name_end : '')
      "
      :prop="propComputed()[1]"
      label-width="100px"
      :rules="[
        {
          validator: (rule, to_value, callback) => {
            if (!to_value && items.verify) {
              callback(
                items.name_end +
                  (items.en_name_end ? ' / ' + items.en_name_end : '') +
                  '必填'
              )
            } else if (
              to_value &&
              items.value &&
              new Date(items.value) >= new Date(to_value)
            ) {
              callback('结束时间必须大于开始时间')
            }
            callback()
          }
        }
      ]"
    >
      <el-date-picker
        v-model="items.to_value"
        :style="{ width: '100%' }"
        :name="'control_' + items.sortid + '_end'"
        :disabled="disabled"
        :type="typeComputed(items)"
        :value-format="items.date_format"
        placeholder="选择结束日期"
        format="yyyy-MM-dd HH:mm"
      >
      </el-date-picker>
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
            '.value',

          'controlList.' +
            this.blockIndex +
            '.formList.' +
            this.index +
            '.to_value'
        ]
      } else {
        return [
          'controlList.' + this.index + '.value',
          'controlList.' + this.index + '.to_value'
        ]
      }
    },
    typeComputed(item) {
      if (item.date_format === 'yyyy-MM-dd' || item.date_format === 'Y-m-d') {
        item.date_format = 'yyyy-MM-dd'
        return 'date'
      }
      if (
        item.date_format === 'yyyy-MM-dd HH:mm' ||
        item.date_format === 'Y-m-d hh:mm' ||
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
<style lang="less"></style>
