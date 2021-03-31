<template>
  <div class="page-table-list">
    <div v-if="$slots.search" class="page-search-bar">
      <transition name="fade" mode="out-in">
        <div v-if="loading" class="skeleton">
          <div class="row"></div>
          <div class="row"></div>
          <div class="btn"></div>
        </div>
        <slot v-else name="search"></slot>
      </transition>
    </div>
    <div v-loading="loading" class="table-list">
      <slot></slot>
    </div>
    <div
      v-if="!loading && ($slots['footer-left'] || total || $slots.footer)"
      class="table-footer"
    >
      <slot name="footer">
        <slot name="footer-left"></slot>
        <Pagination
          v-if="total"
          class="right"
          :total="total"
          :current-page="currentPage"
          :page-size="pageSize"
          @size-change="(size) => $emit('size-change', size)"
          @current-change="(pagecode) => $emit('current-change', pagecode)"
        />
      </slot>
    </div>
  </div>
</template>

<script>
import Pagination from './pagination'
export default {
  name: 'PageTableList',
  components: {
    Pagination
  },
  props: {
    loading: Boolean,
    pageSize: {
      type: Number,
      default: 0
    },
    currentPage: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.page-table-list {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  .table-list {
    flex: 1;
    overflow: auto;
    background-color: #fff;
  }
}
.page-search-bar {
  padding: 18px 30px 0 30px;
  border-radius: 2px;
  background: #fff;
  margin-bottom: 20px;
  .search-bar-form-inline {
    /deep/ .el-input__inner {
      border-radius: 1px;
    }
    /deep/ .el-button--default {
      position: relative;
      top: -1px;
      padding: 9px 27px;
      border-radius: 2px;
    }
  }
}

.table-list {
  /deep/ .table-list-header {
    th {
      background: rgba(244, 246, 249, 0.5);
      font-weight: 400;
      /deep/ .cell {
        font-size: 14px;
        color: #666;
        position: relative;
        padding-left: 20px;
        &::before {
          content: '';
          width: 1px;
          height: 16px;
          background: #e9e9e9;
          position: absolute;
          top: 3px;
          right: 0;
        }
      }
    }
    th:last-child {
      /deep/ .cell {
        &::before {
          width: 0px;
        }
      }
    }
    th {
      border-bottom: none;
    }
  }
  /deep/ .tr-item {
    font-size: 14px;
    color: #333;
    td {
      padding: 19px 0;
      .cell {
        /*padding-left: 20px;*/
      }
    }
  }
  .el-table__fixed-right::before,
  .el-table__fixed::before {
    height: 0;
  }
}

.table-footer {
  padding: 20px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f3f4f4;
  .right {
    flex: 1;
  }
}

.skeleton {
  display: flex;
  align-items: center;
  width: 100%;
  @height: 32px;
  @bg: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  .row,
  .btn {
    border-radius: 3px;
    margin-right: 10px;
    margin-bottom: 18px;
    height: @height;
    background: @bg;
    background-size: 400% 100%;
    animation: skeleton-loading 1.4s ease infinite;
  }
  .row {
    width: 200px;
  }
  .btn {
    width: 56px;
  }
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
