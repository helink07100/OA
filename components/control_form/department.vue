<!-- 部门选择 department -->
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
    <el-select
      v-model="items.value"
      :style="{ width: '100%' }"
      :name="'control_' + items.sortid"
      :placeholder="items.placeholder"
      :disabled="disabled"
    >
      <el-option
        v-for="(d, index) in departmentData.length ? departmentData : options"
        :key="d.id + '-' + index"
        :label="d.name_txt"
        :value="d.name_txt"
      ></el-option>
    </el-select>
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
    options: {
      type: Array,
      default: () => []
    },
    departmentData: {
      type: Array,
      default: () => []
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
