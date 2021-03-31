<template>
  <el-drawer
    class="notication-box"
    title="消息中心"
    :visible="visible"
    :with-header="false"
    size="360px"
    :style="{ overflow: 'scroll' }"
    @close="$emit('close')"
  >
    <div class="panel-title">通知</div>
    <ul class="list">
      <li v-for="item in list" :key="item.id" class="item">
        <!-- <img
          class="icon"
          src="~/assets/image/approval_icon/icon-chaosongwode.png"
        /> -->
        <i class="iconfont icon icon-tongzhi1"></i>
        <div class="info">
          <div class="text">
            <span class="title" @click="view(item)">{{ item.title }}</span>
            <span class="sign" @click="setRead(item)">标记已读</span>
          </div>
          <div class="desc" @click="view(item)">{{ item.text }}</div>
        </div>
      </li>
    </ul>
    <span class="view-all" @click="$router.push('/message'), $emit('close')"
      >查看全部</span
    >
    <Detail
      :dialog-visible="detailShow"
      :detail-data="detailData"
      :modal="false"
      title="消息通知"
      @close="detailShow = false"
      @readsuccess="getMessageLists()"
    />
  </el-drawer>
</template>

<script>
// import { mapState } from 'vuex'
import Detail from '~/pages/message/src/components/detail'
export default {
  components: {
    Detail
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      list: [],
      detailShow: false,
      detailData: {}
    }
  },
  computed: {
    // ...mapState({
    //   closeNotication: (state) => state.closeNotication
    // })
    closeNotication() {
      return this.$store.state.closeNotication
    }
  },
  mounted() {
    this.getMessageLists()
    this.$store.dispatch('setNoticationNumber', 'on')
    this.times()
  },
  destroyed() {
    this.$store.dispatch('setNoticationNumber', 'off')
  },
  methods: {
    times() {
      // 定时，30秒获取一次，查看是否有新的数据
      const times = setInterval(() => {
        if (!this.closeNotication) {
          this.getMessageNums()
        } else {
          clearInterval(times)
        }
      }, 30000)
    },
    async getMessageLists() {
      const rs = await this.$api.message.getMessageLists({})
      if (rs) {
        this.list = rs.data
        this.$store.commit('changeNoticationNumber', rs.data.length)
        this.$emit('change', rs.data.length)
      }
    },
    async getMessageNums() {
      const rs = await this.$api.message.getMessageNums({})
      if (rs) {
        this.$store.commit('changeNoticationNumber', rs.data)
      }
    },
    async setRead(item) {
      const res = await this.$api.message.setMessageRead({
        id: item.id
      })
      if (res) {
        this.$message({
          message: '标记成功',
          type: 'success'
        })
        this.getMessageLists()
      }
    },
    view(item) {
      this.detailData = item
      this.detailShow = true
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .el-drawer__body {
  overflow: scroll;
}
.notication-box {
  .view-all {
    width: 100%;
    position: absolute;
    bottom: 0;
    padding: 10px 0 25px 0;
    text-align: center;
    font-size: 14px;
    color: #3f78f6;
    background: #fff;
    box-shadow: -5px 0px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
  .panel-title {
    font-size: 16px;
    color: #292929;
    padding: 20px 20px 10px 20px;
  }
  .list {
    padding-bottom: 56px;
    .item {
      display: flex;
      align-items: center;
      padding: 16px 20px;
      .icon {
        width: 34px;
        height: 34px;
        text-align: center;
        line-height: 34px;
        border-radius: 100%;
        background: #ebeef5;
      }
      .info {
        padding-left: 10px;
        flex: 2;
        .text {
          display: flex;
          align-items: center;
        }
        .title {
          height: 20px;
          overflow: hidden;
          font-size: 14px;
          color: #292929;
          flex: 2;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          cursor: pointer;
        }
        .desc {
          font-size: 12px;
          color: #7d7d7d;
          cursor: pointer;
        }
        .sign {
          font-size: 12px;
          color: #3f78f6;
          cursor: pointer;
        }
      }
      &:hover {
        background: #f7f7f7;
      }
    }
  }
}
</style>
