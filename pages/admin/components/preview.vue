<template>
  <div class="preview-tree">
    <!-- <div v-for="(menu, index) in MenuData" :key="index" class="tree-item">
      <el-tree
        ref="tree"
        :data="[menu]"
        :props="defaultProps"
        :show-checkbox="edit"
        default-expand-all
        check-on-click-node
      /> 
    </div>-->
    <PreviewItem
      v-for="menu in menuData"
      :key="menu.name"
      :menu-check="menuCheck"
      class="preview-item"
      :item="menu"
      :edit="edit"
    />
  </div>
</template>

<script>
// TODO: ui暂定
// import { MenuData, MenuCheck } from './menus'
import PreviewItem from './preview_item'
export default {
  components: {
    PreviewItem
  },
  props: {
    edit: {
      type: Boolean,
      default: false
    },
    menuData: {
      type: Array,
      default: () => []
    },
    menuCheck: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    // menuData: MenuData,
    // menuCheck: MenuCheck.split(','),
    defaultProps: {
      label: 'name'
    }
  })
}
</script>

<style lang="less" scoped>
.preview-tree {
  // display: flex;
  // flex-wrap: wrap;
  .tree-item {
    margin-bottom: 15px;
    margin-right: 15px;
    border: 1px solid #ebebeb;
    width: 300px;
    height: 400px;
    overflow: auto;
  }

  .preview-item {
    margin-top: 15px;
    padding: 15px;
    border: 1px solid #ebebeb;
  }
}
</style>
