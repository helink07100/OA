<template>
  <div class="ui-avatar">
    <el-dialog
      class="oa-dialog"
      :visible="dialogVisible"
      width="500"
      title="选择图标"
      @close="dialogVisible = false"
    >
      <el-avatar
        v-for="iconName in icons"
        :key="iconName"
        class="approval_icon"
        :size="50"
      >
        <img
          :src="require('~/assets/image/approval_icon/' + iconName + '.png')"
          :class="[{ 'checked-icon': selectIcon === iconName }, 'select-icon']"
          @click="select(iconName)"
        />
      </el-avatar>
    </el-dialog>
    <div v-if="icons.includes($attrs.value)" class="icon-list">
      <img
        class="icon-item"
        :src="require('~/assets/image/approval_icon/' + $attrs.value + '.png')"
      />
    </div>
    <el-button type="primary" plain @click="showDialog">
      选择图标
    </el-button>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    icons: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectIcon: '',
      dialogVisible: false
    }
  },
  methods: {
    select(icon) {
      this.dialogVisible = false
      this.selectIcon = icon
      this.$emit('input', this.selectIcon)
    },
    showDialog() {
      this.dialogVisible = true
      this.selectIcon = this.$attrs.value
    }
  }
}
</script>

<style lang="less" scoped>
.ui-avatar {
  /deep/.el-avatar {
    margin-right: 20px;
  }

  .approval_icon {
    .select-icon {
      width: 50px;
      height: 50px;
      margin-right: 20px;
    }
  }

  .icon-list {
    margin-right: 30px;
    display: inline-block;

    .icon-item {
      width: 50px;
    }
  }

  .checked-icon {
    border: solid 3px #e4e7ed;
    border-radius: 100%;
  }
}
</style>
