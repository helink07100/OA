<!-- 
  *@name paginations 页码组件
-->
<template>
  <el-pagination
    class="pagination-code-wrap"
    :current-page="currentPage"
    :page-size="pageSize"
    layout="sizes, prev, pager, next, total, slot"
    :total="total"
    :page-count="pageCount"
    @size-change="handle_size_change"
    @current-change="handle_current_change"
  >
    <el-input
      v-model="pagego"
      class="page"
      placeholder="1"
      size="mini"
      type="number"
      @change="handle_current_change(Number(pagego))"
      @keyup.enter.native="handle_current_change(Number(pagego))"
    ></el-input>
    <button
      type="button"
      class="btn-go"
      @click="handle_current_change(Number(pagego))"
    >
      <span>GO</span>
    </button>
  </el-pagination>
</template>

<script>
export default {
  name: 'Paginations',
  props: {
    total: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    },
    pageCount: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      pagego: 1
    }
  },
  methods: {
    handle_size_change(size) {
      // 设置多少条一页改变时
      this.$emit('size-change', size)
    },
    handle_current_change(pageCode) {
      // 页码改变时
      if (Number(this.pagego) > Number(this.pageCount)) {
        this.pagego = this.pageCount
      }
      // quickJumper 正整数处理
      const newPageCode = pageCode <= 0 ? 1 : pageCode
      this.pagego = newPageCode
      this.$emit('current-change', newPageCode)
    }
  }
}
</script>

<style lang="less" scoped>
.pagination-code-wrap {
  text-align: right;
  // padding: 15px 40px 15px 40px;
  background: #fff;
  /deep/ .btn-prev {
    border: 1px solid #e1e2e7;
    border-radius: 4px;
    margin-right: 8px;
    margin-left: 4px;
  }
  /deep/ .btn-next {
    border: 1px solid #e1e2e7;
    border-radius: 4px;
  }
  /deep/ .el-pagination__total {
    border: 1px solid #e1e2e7;
    padding: 0 8px;
    margin: 0;
    border-radius: 4px;
    margin-left: 8px;
    margin-right: 8px;
  }
  /deep/ .el-pagination__sizes {
    margin-right: 0px;
  }
  /deep/ .el-select .el-input .el-input__inner {
    border-radius: 4px;
  }
  /deep/ .el-pager {
    .number {
      min-width: 28px;
      margin-right: 8px;
      background: #ffffff;
      border: 1px solid #e1e2e7;
      font-size: 14px;
      color: #666666;
      border-radius: 4px;
      font-weight: 400;
      cursor: pointer;
    }
    .number.active {
      background: #3282fa;
      border: 1px solid #3282fa;
      color: #fff;
    }
    .el-icon {
      border: 1px solid #e1e2e7;
      border-radius: 4px;
      margin-right: 8px;
    }
  }
  .btn-last,
  .btn-go {
    border: 1px solid #e1e2e7;
    margin: 0;
    border-radius: 4px;
  }
  .btn-go {
    color: #3282fa;
    margin-left: -6px;
    cursor: pointer;
  }
  .page {
    width: 50px;
    margin-right: 8px;
    /deep/ .el-input__inner {
      border-radius: 4px;
      padding: 0;
    }
  }
}
</style>
