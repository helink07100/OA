<!-- 多选框 multi_select -->
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
    <el-checkbox-group
      v-model="items.value"
      :disabled="disabled"
      @change="
        $bus.$emit('selectChange', {
          options: items.options.map((i) => {
            return i.value
          }),
          value: items.value,
          sortid: items.sortid
        })
      "
    >
      <el-checkbox
        v-for="(d, idx) in items.options"
        :key="idx"
        :label="d.value ? d.value : d.label ? d.label : d"
        >{{ d.label ? d.label : d }}</el-checkbox
      >
    </el-checkbox-group>
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
