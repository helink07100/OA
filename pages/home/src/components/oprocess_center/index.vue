<template>
  <div class="process-center-content">
    <div class="title">
      <div class="title-text">{{ $t('我的') }}</div>
      <a class="none" :href="processCenterherf">更多</a>
    </div>
    <el-tabs
      v-model="processCenterActive"
      class="oa-ui-tabs-style"
      type="card"
      @tab-click="handle_tab_click"
    >
      <el-tab-pane key="Apply" :label="$t('申请')" name="apply">
        <List
          :list="applyList"
          :list-loading="loading"
          title-name="form_name"
          table-height="350px"
          @clickitem="linkOption"
        >
          >
        </List>
      </el-tab-pane>
      <el-tab-pane key="needDealt" :label="$t('待审')" name="needDealt">
        <List
          :list="needDealtList"
          :list-loading="loading"
          title-name="form_name"
          table-height="350px"
          @clickitem="linkOption"
        >
        </List>
      </el-tab-pane>
      <el-tab-pane key="cc" :label="$t('抄送')" name="cc">
        <List
          :list="ccList"
          :list-loading="loading"
          title-name="form_name"
          table-height="350px"
          @clickitem="linkOption"
        >
          >
        </List>
      </el-tab-pane>
      <el-tab-pane key="circulate" :label="$t('传阅')" name="circulate">
        <List
          :list="circulateList"
          :list-loading="loading"
          title-name="title"
          type="circulate"
          table-height="350px"
          @clickitem="circulate_click_item"
        >
        </List>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import List from '~/pages/home/src/components/oprocess_center/list'
export default {
  components: {
    List
  },
  data() {
    return {
      loading: false,
      applyList: [],
      needDealtList: [],
      ccList: [],
      circulateList: [],
      processCenterActive: 'apply',
      processCenterherf: '?ct=myflow&ac=record_list'
    }
  },
  mounted() {
    this.get_apply_list()
  },
  methods: {
    async get_apply_list() {
      // 申请
      this.loading = true
      const rs = await this.$api.home.recordList({
        page_size: 6
      })
      if (rs) {
        this.applyList = rs.data.list ? rs.data.list : []
      }
      this.loading = false
    },
    async get_needDealt_list() {
      // 待办
      this.loading = true
      const rs = await this.$api.home.myreviewApproveList({
        page_size: 6
      })
      if (rs) {
        this.needDealtList = rs.data.list ? rs.data.list : []
      }
      this.loading = false
    },
    async get_cc_list() {
      // 抄送
      this.loading = true
      const rs = await this.$api.home.myreviewCcList({
        page_size: 6
      })
      if (rs) {
        this.ccList = rs.data.list ? rs.data.list : []
      }
      this.loading = false
    },
    async get_circulate_list() {
      // 传阅
      this.loading = true
      const rs = await this.$api.circulate.circulateSearchList({
        limit: 6
      })
      if (rs) {
        this.circulateList = rs.data.list ? rs.data.list : []
      }
      this.loading = false
    },
    handle_tab_click(e) {
      const name = e.name
      this.applyList = []
      this.needDealtList = []
      this.ccList = []
      this.circulateList = []
      let ahref = ''
      switch (String(name)) {
        case 'apply':
          ahref = '?ct=myflow&ac=record_list'
          break
        case 'needDealt':
          ahref = '?ct=myreview&ac=approve_list&status=1'
          break
        case 'cc':
          ahref = '?ct=myreview&ac=cc_list'
          break
        case 'circulate':
          ahref = '?ct=circulate&ac=index'
          break
      }
      this.processCenterherf = ahref
      this['get_' + name + '_list'](name)
    },
    linkOption(item) {
      this.$router.push('/myflow/record_detailed?&record_id=' + item.record_id)
    },
    circulate_click_item(item) {
      this.$router.push('/circulate/detail?&id=' + item.id)
    }
  }
}
</script>

<style lang="less" scoped>
.quick-app-content,
.process-center-content {
  background: #fff;
  box-shadow: 0 0 6px 0 rgba(225, 226, 229, 0.5);
  border-radius: 2px;
  margin-top: 20px;
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
.process-center-content {
  margin-right: 20px;
  .oa-ui-tabs-style {
    padding: 0 12px;
    /deep/ .el-tabs__header {
      background: inherit;
      border: none;
      padding: 0 8px;
      .el-tabs__nav {
        background: #f5f6f7;
        border-radius: 15px;
        border: none;
        .el-tabs__item {
          line-height: 30px;
          height: 30px;
          border: none;
          border-radius: 15px;
          &.is-active {
            background: #3f78f6;
            color: #fff;
            border: none;
          }
        }
      }
    }
    /deep/ .el-table {
      .cell {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
  .el-tabs--border-card {
    border: none;
  }
  .pagination-code-wrap {
    padding: 10px 40px 10px 40px;
  }
  /deep/ .el-table {
    td,
    th {
      padding: 15px 0;
      cursor: pointer;
    }
    &::before {
      height: 0;
    }
  }
  /deep/ .el-table .cell .content {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  /deep/ .label-status {
    padding: 0px 10px;
    font-size: 12px;
  }
}
</style>
