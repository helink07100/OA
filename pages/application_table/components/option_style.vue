<template>
  <div class="option-style">
    <el-popover placement="right" width="400" trigger="click">
      <div>
        <el-form label-width="80px">
          <el-form-item label="字体大小">
            <el-input
              v-model="item.fontSize"
              placeholder="最小12"
              @input="$emit('change', item)"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox
              v-model="item.fontWeight"
              label="700"
              @change="$emit('change', item)"
              >字体加粗</el-checkbox
            >
          </el-form-item>
          <el-form-item label="文本居">
            <el-radio-group
              v-model="item.textAlign"
              @change="$emit('change', item)"
            >
              <el-radio label="left">左</el-radio>
              <el-radio label="center">中</el-radio>
              <el-radio label="right">右</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <i
        slot="reference"
        class="edit-style-icon iconfont icon-xiugai text-primary cp"
      ></i>
    </el-popover>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        fontSize: '',
        fontWeight: '',
        textAlign: ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.edit-style-icon {
  position: absolute;
  right: 10px;
  top: 10px;
}
</style>
