<template>
  <LayoutPage :title="$t('circulate.我的传阅')">
    <nuxt-link slot="header-right" to="/circulate/add">
      <el-button
        class="page-header-button"
        type="primary"
        icon="el-icon-plus"
        >{{ $t('新增传阅') }}</el-button
      >
    </nuxt-link>
    <PageTableList
      :loading="loading"
      :total="pages.total"
      :current-page="pages.page_no"
      :page-size="pages.page_size"
      @current-change="pageCodeChange"
      @size-change="pageSizeChange"
    >
      <el-form slot="search" :inline="true" :model="form">
        <el-form-item :label="$t('创建')">
          <el-date-picker
            v-model="form.begin_time"
            type="date"
            placeholder="年/月/日"
            :style="{ width: '160px' }"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('至')">
          <el-date-picker
            v-model="form.end_time"
            type="date"
            placeholder="年/月/日"
            :style="{ width: '160px' }"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.keyword"
            :placeholder="$t('请输入主题')"
            :style="{ width: '280px' }"
          ></el-input>
        </el-form-item>
        <el-form-item :label="$t('发起人')">
          <el-select
            v-model="form.create_user"
            :filterable="true"
            :placeholder="$t('发起人')"
            :style="{ width: '140px' }"
            :clearable="true"
          >
            <template v-for="item in createUserList">
              <el-option
                v-if="item.display"
                :key="item.value"
                :label="item.display"
                :value="item.id"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('传阅状态')">
          <el-select
            v-model="form.status"
            :filterable="true"
            :placeholder="$t('传阅状态')"
            :style="{ width: '140px' }"
          >
            <el-option :label="$t('全部')" value=""></el-option>
            <el-option
              v-for="item in $t('statusData')"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchOn">{{ $t('搜索') }}</el-button>
        </el-form-item>
      </el-form>
      <el-table
        :data="list"
        style="width: 100%"
        height="100%"
        header-row-class-name="table-list-header"
        row-class-name="tr-item"
      >
        <el-table-column prop="create_time" :label="$t('创建日期')">
        </el-table-column>
        <el-table-column prop="title" :label="$t('传阅主题')">
          <template slot-scope="scope">
            <nuxt-link
              class="text-primary"
              :to="'/circulate/detail?id=' + scope.row.id"
              >{{ scope.row.title }}</nuxt-link
            >
          </template>
        </el-table-column>
        <el-table-column prop="create_user" :label="$t('发起人')">
        </el-table-column>
        <el-table-column prop="status" :label="$t('传阅状态')">
          <template slot-scope="scope">
            <label-status
              v-if="scope.row.status == 0"
              :name="$t('传阅中')"
              status="warning"
            />
            <label-status
              v-else-if="scope.row.status == 1"
              :name="$t('已完结')"
              status="info"
            />
          </template>
        </el-table-column>
        <el-table-column :label="$t('操作')" width="100">
          <template slot-scope="scope">
            <nuxt-link
              class="text-primary"
              :to="'/circulate/detail?id=' + scope.row.id"
              >{{ $t('查看') }}</nuxt-link
            >
          </template>
        </el-table-column>
      </el-table>
    </PageTableList>
  </LayoutPage>
</template>

<script>
import mixin from '@/mixins/table_list'
import labelStatus from '~/components/label_status'
export default {
  components: {
    labelStatus
  },
  mixins: [mixin],
  data: () => ({
    start_end_date: '',
    createUserList: [],
    create_user_loading: false,
    form: {
      begin_time: '',
      end_time: '',
      keyword: '',
      type: '',
      status: '',
      create_user: ''
    }
  }),
  watch: {
    start_end_date(nv, ov) {
      const dates = this.start_end_date
      if (dates) {
        for (let i = 0; i < dates.length; i++) {
          const item = dates[i]
          const y = item.getFullYear()
          let m = item.getMonth() + 1
          let d = item.getDate()
          if (m < 10) m = '0' + m
          if (d < 10) d = '0' + d
          if (i === 0) {
            this.form.begin_time = y + '-' + m + '-' + d
          } else {
            this.form.end_time = y + '-' + m + '-' + d
          }
        }
      } else {
        this.form.begin_time = ''
        this.form.end_time = ''
      }
    }
  },
  mounted() {
    this.getList()
    this.getCreator()
  },
  methods: {
    async getCreator() {
      try {
        const rs = await this.$api.circulate.ajaxGetCreator()
        if (rs) {
          this.createUserList = rs.data
        }
      } catch (e) {
        this.$message.error(e.message)
      }
    },
    beforeGetList() {
      if (this.form.start_day)
        this.form.start_day = this.$moment(
          new Date(this.form.start_day)
        ).format('YYYY-MM-DD')
      if (this.form.end_day)
        this.form.end_day = this.$moment(new Date(this.form.end_day)).format(
          'YYYY-MM-DD'
        )

      return {
        handler: this.$api.circulate.circulateSearchList,
        params: this.form
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
