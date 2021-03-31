<template>
  <!-- 有子路由 -->
  <div class="el-submenu">
    <el-submenu
      v-if="typeof menu.children !== 'undefined'"
      :key="$t(menu.label)"
      v-bind="$attrs"
    >
      <template slot="title">
        <i :class="menu.icon"></i>
        <span slot="title">{{ $t(menu.label) }}</span>
      </template>
      <sub-item
        v-for="sub in menu.children"
        :key="$t(sub.label)"
        :index="sub.path || $t(sub.label)"
        :menu="sub"
      ></sub-item>
    </el-submenu>

    <!-- 没有子路由 -->
    <el-menu-item
      v-else-if="menu.display"
      :key="$t(menu.label)"
      v-bind="$attrs"
    >
      <template slot="title">
        <i v-if="menu.icon" :class="menu.icon"></i>
        <span slot="title">{{ $t(menu.label) }}</span>
      </template>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: 'SubItem',
  props: {
    menu: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="less" scoped>
// 不加这次div.el-submenu的话，edge下鼠标覆盖子菜单会报栈溢出
.el-menu--collapse > div > .el-submenu > .el-submenu__title span,
.el-menu--collapse
  > div
  > .el-submenu
  > .el-submenu__title
  .el-submenu__icon-arrow {
  display: none;
}
</style>
