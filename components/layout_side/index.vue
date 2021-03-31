<template>
  <div class="layout-side" :class="{ 'mini-slide': isCollapse }">
    <el-menu
      v-if="menus && menus.children"
      :default-active="defaultActive"
      :default-openeds="defaultOpends"
      text-color="#6E768E"
      :collapse="isCollapse"
      :router="true"
      :collapse-transition="false"
    >
      <template v-for="(menu, key) in menus.children">
        <SubItem :key="key" :menu="menu" :index="menu.path || menu.label" />
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import SubItem from './sub_item'
export default {
  components: {
    SubItem
  },
  computed: {
    ...mapState({
      allMenus: (state) => state.menus.menus,
      isCollapse: (state) => state.layoutSideCollapse
    }),
    ...mapGetters({
      menus: 'menus/getActiveMenu',
      flattenMenu: 'menus/getFlattenMenu'
    }),
    defaultOpends() {
      const openeds = []
      this.menus.children.forEach((child) => {
        openeds.push(child.label)
      })
      return openeds
    }
  },
  created() {
    this.matchDefaultActivePath()
  },
  methods: {
    // 选中当前激活的菜单
    matchDefaultActivePath() {
      // 当前页面url path
      const { path } = this.$route
      // 找到当前路由的爸爸，爸爸的爸爸，爸爸的爸爸的爸爸。。。
      const parents = (() => {
        const pathArr = path.split('/')
        const rs = [path]
        while (pathArr.length) {
          pathArr.pop()
          const pPath = pathArr.join('/')
          pPath && rs.push(pPath)
        }
        return rs
      })()

      // 当前激活的菜单
      let activePath = ''
      parents.some((item) => {
        const menu = this.flattenMenu.find((menu) => menu.path === item)
        if (menu && menu.display) {
          activePath = menu.path
          return true
        }
        return false
      })

      // 需要遍历找到当前menus对象的哪个节点与path相同，设置选中
      const getChild = (menu) => {
        if (menu.children) {
          return menu.children.some((child) => {
            return getChild(child)
          })
        } else if (menu.path === activePath) {
          return menu
        } else {
          return false
        }
      }

      // 遍历菜单，获取当前选中的索引
      this.allMenus.some((menu, index) => {
        const rs = getChild(menu)
        if (rs) {
          this.$store.commit('menus/updateActive', index)
        }
        return rs
      })

      this.defaultActive = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.layout-side {
  align-self: stretch;
  background-color: #fff;
  width: @layout-side-width;
  transition: width 0.2s;
  box-shadow: 0 0 6px 0 #e1e2e5;
  overflow: auto;

  &.mini-slide {
    width: @layout-side-collapse-width;
  }
}

.el-menu {
  border-right: none;
  /deep/ .el-submenu {
    &.is-active {
      > .el-submenu__title {
        background-color: #f2f8ff;
        &,
        i {
          color: #3f78f6 !important;
        }
      }
    }
  }
}
</style>
