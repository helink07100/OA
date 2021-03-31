<!--
用于我的申请，新增申请的面板
-->
<template>
  <el-popover
    placement="bottom"
    width="480"
    trigger="click"
    popper-class="oa-quick-app-list-popover"
  >
    <div
      class="quick-app-list-style"
      :style="{ height: '568px', overflow: 'scroll', 'padding-top': '20px' }"
    >
      <template v-for="key in Object.keys(quickAppList)">
        <div
          :key="key"
          class="quick-app-content"
          :style="{ 'padding-left': '20px' }"
        >
          <div
            class="title"
            :style="{ 'padding-left': '0', 'padding-top': '0' }"
          >
            <div
              class="title-text"
              :style="{ 'font-size': '16px', color: '#7A829A' }"
            >
              {{ quickAppList[key].name }}
            </div>
          </div>
          <div class="quick-app-list-wrap" :style="{ 'min-height': 'initial' }">
            <ul class="quick-app-list">
              <li
                v-for="item in quickAppList[key].data"
                :key="item.form_id"
                class="item"
              >
                <nuxt-link
                  class="item-inline-flex"
                  :style="{ 'margin-left': '0' }"
                  :to="'/myflow/apply?form_id=' + item.form_id"
                >
                  <div class="desc" :style="{ 'padding-left': '0' }">
                    {{ item.form_name }}
                  </div>
                  <img
                    class="icon"
                    :src="item.icon_name | iconUrl"
                    :style="{ 'margin-right': '10px' }"
                  />
                  <i
                    class="iconfont icon-daohangdianji"
                    :style="{ 'margin-right': '-10px' }"
                  ></i>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </template>
      <PageEmpty
        v-if="!Object.keys(quickAppList).length"
        :style="{ padding: '200px 0' }"
        msg="暂无快捷入口"
      />
    </div>
    <el-button slot="reference" type="primary" icon="el-icon-plus">{{
      $t('新增申请')
    }}</el-button>
  </el-popover>
</template>
<script>
export default {
  filters: {
    iconUrl(iconName) {
      iconName =
        iconName === 'icon-gongzuojihua1.png'
          ? 'icon-gongzuojihua.png'
          : iconName
      console.log('~/assets/image/approval_icon/' + iconName)
      return require('~/assets/image/approval_icon/' + iconName)
    }
  },
  data() {
    return {
      quickAppList: {}
    }
  },
  mounted() {
    this.get_myflow()
  },
  methods: {
    async get_myflow() {
      const rs = await this.$api.myflow.myflow({})
      if (rs) {
        this.quickAppList = rs.data
      }
      this.listLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
/*快速申请*/
.quick-app-list-style {
  .title {
    font-size: 18px;
    color: #333333;
    padding: 20px 20px 20px 20px;
    display: flex;
    .title-text {
      flex: 1;
    }
    a {
      font-size: 14px;
      color: #9ba6bc;
    }
  }
}
.quick-app-list-wrap {
  min-height: 393px;
  .quick-app-list {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    align-items: center;
    .item {
      width: 50%;
      margin-bottom: 24px;
      .item-inline-flex {
        border: 1px dashed #cbd2e2;
        display: flex;
        margin-left: 20px;
        margin-right: 20px;
        padding: 10px 20px 10px 20px;
        position: relative;
        align-items: center;
        .icon {
          width: 30px;
          height: 30px;
        }
        .desc {
          padding-left: 15px;
          font-size: 12px;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          line-height: 20px;
          flex: 1;
          padding-right: 15px;
        }
        .icon-daohangdianji {
          color: #cbd2e2;
          transform: rotate(-90deg);
          font-size: 12px;
          width: 12px;
          height: 12px;
        }
      }
    }
  }
  .null-data-msg {
    padding: 120px 30px;
  }
}
.oa-quick-app-list-popover {
  padding: 0;
}
</style>
