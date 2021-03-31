<template>
  <LayoutPage :title="$t('我的事务')">
    <el-row class="my-work">
      <el-col
        v-for="(item, index) in MyWorks"
        :key="index"
        class="item"
        :span="6"
      >
        <div class="avatar-box">
          <nuxt-link :to="item.to">
            <el-avatar :size="80">
              <img :src="item.src" />
            </el-avatar>
          </nuxt-link>
        </div>
        <p>{{ item.label }}</p>
      </el-col>
    </el-row>
    <el-row
      v-for="(item, index) in quickActions"
      :key="index"
      class="quick-actions mt-md"
    >
      <el-card class="box-card">
        <div slot="header">
          <span>{{ item.name }}</span>
        </div>
        <el-row>
          <el-col
            v-for="(subItem, subIndex) in item.data"
            :key="index + '-' + subIndex"
            class="row"
            :span="4"
          >
            <nuxt-link :to="'/myflow/apply&form_id=' + subItem.form_id">
              <el-avatar :size="60">
                <img :src="filtersImageSrc(subItem.icon)" />
              </el-avatar>
              <p>{{ subItem.form_name }}</p>
            </nuxt-link>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-row
      v-if="quickActions.length <= 0"
      class="mt-md"
      :style="{ display: 'flex', 'flex-direction': 'column', flex: 1 }"
    >
      <el-card class="box-card" :style="{ flex: 1 }">
        <div slot="header">
          <span> - </span>
        </div>
        <el-row style="height: 200px">
          <Empty msg="暂无数据" :style="{ 'padding-top': '200px' }" />
        </el-row>
      </el-card>
    </el-row>
  </LayoutPage>
</template>
<script>
import Empty from '@/components/page/empty'
const MyWorks = [
  {
    label: '我发起的',
    src: require('~/assets/image/approval_icon/icon-wofaqideshenpi.png'),
    to: '/myflow/record_list'
  },
  {
    label: '我审批的',
    src: require('~/assets/image/approval_icon/icon-woshenpide.png'),
    to: '/myflow/approve_list'
  },
  {
    label: '抄送我的',
    src: require('~/assets/image/approval_icon/icon-chaosongwode.png'),
    to: '/myflow/cc_list'
  },
  {
    label: '管理审批',
    src: require('~/assets/image/approval_icon/icon-guanlishenpi.png'),
    to: '/form'
  }
]
export default {
  components: {
    Empty
  },
  data() {
    return {
      MyWorks,
      quickActions: []
    }
  },
  mounted() {
    this.getMyflow()
  },
  methods: {
    async getMyflow() {
      const res = await this.$api.myflow.myflow({})
      if (res) {
        this.quickActions = res.data
      }
    },
    filtersImageSrc(src) {
      const arrs = String(src).split('/img/')
      return require('~/assets/image/' + arrs[1])
    }
  }
}
</script>
<style lang="less" scoped>
.my-work {
  background: #fff;
  padding: 35px 0;
  box-shadow: 0 0 6px 0 rgba(225, 226, 229, 0.5);
  border-radius: 2px;
  .item {
    text-align: center;
    font-size: 14px;
    color: #95a1b2;
    cursor: pointer;
    .avatar-box {
      border-right: solid 1px #d8d8d8;
      &:first-not(1) {
        border-right: none;
      }
    }
  }
}
.box-card {
  box-shadow: 0 0 6px 0 rgba(225, 226, 229, 0.4);
  /deep/ .el-card__body {
    padding-bottom: 0;
  }
}
.quick-actions {
  .box-card {
    .row {
      text-align: center;
      padding-bottom: 20px;
    }
  }
}
</style>
