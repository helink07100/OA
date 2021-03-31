<template>
  <div>
    <el-table
      :data="list"
      :show-header="Boolean(false)"
      style="width: 100%"
      :height="tableHeight"
      @row-click="linkOption"
    >
      <el-table-column prop="cate_id" width="80">
        <template slot-scope="scope">
          <div class="icon-cell">
            <template v-if="scope.row.is_top == 1">
              <el-tag type="warning" size="mini" effect="dark">{{
                $t('置顶')
              }}</el-tag>
            </template>
            <template v-else>
              <el-tag
                v-if="scope.row.is_seen == 0"
                type="danger"
                size="mini"
                effect="dark"
                >{{ $t('未读') }}</el-tag
              >
              <el-tag
                v-else-if="scope.row.is_seen == 1"
                type="info"
                size="mini"
                effect="dark"
                >{{ $t('已读') }}</el-tag
              >
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="title">
        <template slot-scope="scope">
          <div class="content">
            {{ scope.row.title }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" width="180">
        <template slot-scope="scope">
          <div :style="{ 'text-align': 'right' }">
            {{ scope.row.create_time }}
          </div>
        </template>
      </el-table-column>
    </el-table>
    <paginations
      v-if="isPagination"
      :total="total"
      :current-page="page_no"
      :page-size="page_size"
    ></paginations>
  </div>
</template>

<script>
import paginations from '~/components/page/pagination'
export default {
  components: {
    paginations
  },
  props: {
    // 这个
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
    // square | 方形， ellipsoid | 椭圆形 样式
    iconStyleType: {
      type: String,
      default: ''
    },
    isPagination: Boolean, // 是否显示页码
    iconStatusName: {
      type: String,
      default: ''
    } // 左边小icon状态的字段名
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
    linkOption(row) {
      this.$router.push('/document/detail?&type=received&id=' + row.id)
    }
  }
}
</script>

<style lang="less" scoped></style>
