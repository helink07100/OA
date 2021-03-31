<template>
  <ul class="header-nav">
    <li
      v-for="(menu, index) in menus"
      :key="index"
      class="nav-item hover-item"
      :class="{ active: index === active }"
      @click="changeActive(index)"
    >
      <i :class="menu.icon"></i>
      <span>{{ $t(menu.label) }}</span>
    </li>
  </ul>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      active: (state) => state.menus.active,
      menus: (state) => state.menus.menus
    })
  },
  methods: {
    changeActive(index) {
      this.$store.commit('menus/updateActive', index)
    }
  }
}
</script>

<style lang="less" scoped>
@import './main';
.header-nav {
  padding-left: 40px;
  display: flex;
  align-items: stretch;
  flex: 1;
}

.nav-item {
  display: flex;
  align-items: center;
  margin: 0 20px;
  padding: 0 15px;
  color: #fff;
  font-size: 14px;
  white-space: nowrap;

  i {
    font-size: 24px;
    margin-right: 6px;
  }
}
</style>
