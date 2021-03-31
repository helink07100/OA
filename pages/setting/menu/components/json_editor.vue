<template>
  <div class="jsoneditor-wrap">
    <div class="save mb-sm">
      <el-button type="primary" plain :disabled="disabled" @click="saveHandler"
        >保存菜单</el-button
      >
    </div>
    <div ref="editor" class="jsoneditor"></div>
  </div>
</template>

<script>
import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.min.css'
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    editor: null,
    disabled: false
  }),
  watch: {
    data() {
      this.updateEditor()
    }
  },
  mounted() {
    const options = {
      mode: 'code',
      onValidationError: (errs) => {
        this.disabled = !!errs.length
      }
    }
    this.editor = new JSONEditor(this.$refs.editor, options)
    this.updateEditor()
  },
  methods: {
    updateEditor() {
      const initialJson = JSON.parse(JSON.stringify(this.data))
      this.editor.set(initialJson)
    },
    saveHandler() {
      this.$emit('success', this.editor.get())
    }
  }
}
</script>

<style lang="less" scoped>
.jsoneditor-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  .jsoneditor {
    flex: 1;
  }
}
</style>
