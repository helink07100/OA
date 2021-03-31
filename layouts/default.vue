<template>
  <div class="app-layout">
    <LayoutHeader />
    <div v-scroll class="app-layout-body">
      <LayoutSide />
      <div class="layout-content">
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
import LayoutHeader from '@/components/layout_header/index'
import LayoutSide from '@/components/layout_side'
import scroll from '@/mixins/scroll'
export default {
  name: 'Default',
  middleware: 'auth',
  components: {
    LayoutHeader,
    LayoutSide
  },
  mixins: [scroll]
}
</script>

<style lang="less" scoped>
.app-layout {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .app-layout-body {
    display: flex;
    overflow: hidden;
    &,
    .layout-content {
      flex: 1;
    }
    .layout-content {
      overflow: auto;
    }
  }
}
</style>
