<!--
流程中心列表组件
-->
<template>
  <div>
    <el-table
      v-loading="listLoading"
      :data="list"
      :show-header="Boolean(false)"
      :height="tableHeight"
      style="width: 100%"
      @row-click="tr_on"
    >
      <el-table-column prop="cate_id" width="110">
        <template slot-scope="scope">
          <div v-if="type == 'circulate'" class="icon-cell">
            <label-status
              v-if="scope.row.status == 1"
              status="info"
              :name="$t('已结束')"
            />
            <label-status
              v-else-if="scope.row.status == 0"
              status="warning"
              :name="$t('传阅中')"
            />
          </div>
          <div v-else class="icon-cell">
            <label-status
              v-if="scope.row.status == 10"
              status="success"
              :name="$t('已通过')"
            />
            <label-status
              v-else-if="scope.row.status == -2"
              status="danger"
              :name="$t('已驳回')"
            />
            <label-status
              v-else-if="scope.row.status == -10"
              status="danger"
              :name="$t('已撒消')"
            />
            <label-status v-else status="warning" :name="$t('审批中')" />
          </div>
        </template>
      </el-table-column>
      <el-table-column :prop="titleName"></el-table-column>
      <el-table-column prop="create_time" width="180">
        <template slot-scope="scope">
          <div v-if="type == 'circulate'" :style="{ 'text-align': 'right' }">
            {{ scope.row.create_time | YYYY_MM_DD }}
          </div>
          <div v-else :style="{ 'text-align': 'right' }">
            {{ scope.row.create_time_format | YYYY_MM_DD }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <paginations
      v-if="isPagination"
      :total="total"
      :current-page="page_no"
      :page-size="page_size"
      @page_code_change="page_code_change"
      @size_change="page_size_change"
    ></paginations>
  </div>
</template>

<script>
import labelStatus from '~/components/label_status'
export default {
  components: {
    labelStatus
  },
  filters: {
    YYYY_MM_DD(time) {
      if (!time) return '-'
      const timeArr = time.split(' ')
      return timeArr[0]
    }
  },
  props: {
    listLoading: Boolean,
    tableHeight: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    iconStyleType: {
      type: String,
      default: ''
    }, // square | 方形， ellipsoid | 椭圆形 样式
    isPagination: Boolean, // 是否显示页码
    iconStatusName: {
      type: String,
      default: ''
    }, // 左边小icon状态的字段名
    type: {
      type: String,
      default: ''
    }, // 类型，用于可能不同列表的字段显示判断
    titleName: {
      type: String,
      default: ''
    } // 内容字段
  },
  data() {
    return {
      total: 20,
      page_no: 1,
      page_size: 10
    }
  },
  mounted() {},
  methods: {
    tr_on(row) {
      // location.href = "?ct=document&ac=detail&flag=2&id=" + row.id;
      this.$emit('clickitem', row)
    },
    page_code_change() {},
    page_size_change() {}
  }
}
</script>

<style lang="less" scoped></style>
