<!-- 附件 -->
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
                '必传项',
              trigger: 'change'
            }
          ]
        : []
    "
  >
    <Upload
      ref="oa-upload"
      v-model="fileList"
      class="oa-form-upload-file"
      :name="'controlList.' + this.index + '.value'"
      :multiple="false"
      :limit="limit"
      :disabled="disabled"
      :file-list="fileList"
      :label="buttonText"
      type="label"
      @input="uploadChange"
    >
    </Upload>
    <slot name="option"></slot>
  </el-form-item>
</template>
<script>
import Upload from '../upload'
import controlForm from '@/mixins/control_form'
export default {
  name: 'UiFile',
  components: { Upload },
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
      default: 1
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
  data() {
    return {
      fileList: []
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
    uploadChange(value) {
      const newValue = [].concat(value)
      this.items.value = newValue
      this.$emit('input', newValue)
    }
  }
}
</script>
