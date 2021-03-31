<template>
  <div class="layout-header">
    <nuxt-link to="/" class="logo" :class="{ 'mini-logo': isCollapse }">
      <p v-if="!isCollapse" class="app-name">{{ $t('global.app_name') }}</p>
      <img v-else src="~/assets/image/logo.png" />
    </nuxt-link>

    <div class="toggle-button hover-item" @click="toggleCollapse">
      <i
        :class="[
          'iconfont',
          isCollapse ? 'icon-daohangcaidan' : 'icon-shouhui'
        ]"
      ></i>
    </div>

    <HeaderNav />

    <div class="right">
      <!-- 全屏 -->
      <el-tooltip
        class="item hover-item"
        effect="dark"
        content="全屏"
        placement="bottom"
      >
        <i
          :class="[
            'iconfont',
            !isFullScreen ? 'icon-quanping2' : 'icon-tuichuquanping'
          ]"
          @click="toggleFullScreen"
        ></i>
      </el-tooltip>
      <!-- 多语言 -->
      <el-dropdown style="display:flex" @command="changeLangHandle">
        <div class="item hover-item">
          <i
            :class="[
              'iconfont',
              locale == 'en' ? 'icon-yingwen' : 'icon-zhongwen'
            ]"
          ></i>
        </div>

        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh-cn">
            <i class="iconfont icon-zhongwen"></i> 中文
          </el-dropdown-item>
          <el-dropdown-item command="en">
            <i class="iconfont icon-yingwen"></i> 英文
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!-- 消息-->
      <div class="item hover-item" @click="toggleNotificationDrawer(true)">
        <el-badge
          :value="noticationNumber"
          :type="noticationNumber < 1 ? 'primary' : 'danger'"
        >
          <i class="iconfont icon-tongzhi1"></i>
        </el-badge>
      </div>
      <!-- 退出登录 -->
      <el-tooltip
        class="item hover-item"
        effect="dark"
        content="退出"
        placement="bottom"
      >
        <i class="iconfont icon-tuichu1" @click="logoutConfirm"></i>
      </el-tooltip>
      <div class="user">
        <!-- <img
          src="https://pic1.zhimg.com/v2-fda399250493e674f2152c581490d6eb_1200x500.jpg"
        /> -->
        <nameNode :name="user.name" bgcolor="#ffffff" />
        <!-- <div class="info">
          <p class="name">{{ user.name }}</p>
          <p class="station">{{ user.organization_id }}</p>
        </div> -->
      </div>
    </div>

    <NotificationDrawer
      :visible="notificationDrawerVisible"
      @close="toggleNotificationDrawer(false)"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import NotificationDrawer from '../layout_notication'
import HeaderNav from './nav'
import nameNode from '~/components/name_nodes'
export default {
  components: {
    NotificationDrawer,
    HeaderNav,
    nameNode
  },
  data: () => ({
    isFullScreen: false
  }),
  computed: {
    ...mapState({
      isCollapse: 'layoutSideCollapse',
      user: (state) => state.user.user,
      locale: (state) => state.i18n.locale,
      notificationDrawerVisible: (state) => state.notificationDrawerVisible,
      noticationNumber: (state) => state.noticationNumber
    })
  },
  methods: {
    toggleCollapse() {
      this.$store.commit('toggleLayoutSideCollapse')
    },
    toggleNotificationDrawer(isOpen) {
      this.$store.commit('changeNotificationDrawerStatus', isOpen)
    },
    requestFullScreen() {
      const element = document.getElementById('__nuxt')
      const requestMethod =
        element.requestFullScreen ||
        element.webkitRequestFullScreen ||
        element.mozRequestFullScreen ||
        element.msRequestFullScreen
      if (requestMethod) {
        requestMethod.call(element)
      } else if (typeof window.ActiveXObject !== 'undefined') {
        // eslint-disable-next-line no-undef
        const wscript = new ActiveXObject('WScript.Shell')
        if (wscript !== null) {
          wscript.SendKeys('{F11}')
        }
      }
      this.isFullScreen = true
    },
    exitFull() {
      // 判断各种浏览器，找到正确的方法
      const exitMethod =
        document.exitFullscreen || // W3C
        document.mozCancelFullScreen || // Chrome等
        document.webkitExitFullscreen || // FireFox
        document.webkitExitFullscreen // IE11
      if (exitMethod) {
        exitMethod.call(document)
      } else if (typeof window.ActiveXObject !== 'undefined') {
        // for Internet Explorer
        // eslint-disable-next-line no-undef
        const wscript = new ActiveXObject('WScript.Shell')
        if (wscript !== null) {
          wscript.SendKeys('{F11}')
        }
      }

      this.isFullScreen = false
    },
    toggleFullScreen() {
      this.isFullScreen ? this.exitFull() : this.requestFullScreen()
    },
    logoutConfirm() {
      this.$store.dispatch('logout')
      this.$router.replace('/login')
    },
    async changeLang(lang) {
      const rs = await this.$api.common.setLang(lang)
      if (rs) {
        document.cookie = `language=${lang}`
        this.$store.commit('i18n/updateLang', lang)
        setTimeout(() => {
          location.reload()
        }, 1500)
      }
    },
    changeLangHandle(command) {
      this.changeLang(command)
    }
  }
}
</script>

<style lang="less" scoped>
@import './main';

/deep/.el-badge__content.el-badge__content--primary {
  display: none;
}

.layout-header {
  justify-content: space-between;
  height: 66px;
  background-color: @bg-main;

  display: flex;
  align-items: stretch;
}

.logo {
  width: @layout-side-width;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  .app-name {
    font-size: 18px;
    color: #fff;
    white-space: nowrap;
  }

  img {
    width: 32px;
    height: 32px;
  }

  transition: width 0.2s;
  &.mini-logo {
    width: @layout-side-collapse-width;
  }
}

.toggle-button {
  width: 44px;
  height: 40px;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  color: #fff;
}

.right {
  display: flex;
  padding: 0 15px;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
  }
  .iconfont {
    font-size: 21px;
    color: #fff;
  }
}
.user {
  margin-left: 20px;
  display: flex;
  align-items: center;
  color: #fff;

  img {
    margin-right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: fill;
  }
  .name {
    font-size: 14px;
  }
  .station {
    font-size: 12px;
    font-weight: 200;
    margin-top: 2px;
  }
}
/deep/ .name-nodes {
  .info {
    .name {
      color: #fff;
      font-size: 14px;
    }
    .desc {
      display: none;
    }
  }
  .avatar {
    color: @color-primary;
  }
}
</style>
