<template>
  <LayoutPage :title="$t('我的申请')">
    <template slot="header-right">
      <quick-application />
    </template>
    <PageTableList
      :loading="loading"
      :total="pages.total"
      :current-page="pages.page_no"
      :page-size="pages.page_size"
      @current-change="pageCodeChange"
      @size-change="pageSizeChange"
    >
      <el-form slot="search" :inline="true" :model="form">
        <el-form-item :label="$t('申请 ')">
          <el-date-picker
            v-model="form.start_day"
            type="date"
            placeholder="年/月/日"
            :style="{ width: '160px' }"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('至')">
          <el-date-picker
            v-model="form.end_day"
            type="date"
            placeholder="年/月/日"
            :style="{ width: '160px' }"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-select
            v-model="form.form_type_id"
            value-key="id"
            :filterable="true"
            :placeholder="$t('审批单类型')"
            :style="{ width: '140px' }"
          >
            <el-option :label="$t('审批单类型')" value="0"></el-option>
            <el-option
              v-for="(item, formTypesIndex) in formTypes"
              :key="formTypesIndex"
              :label="item.cn_name"
              :value="item.form_type_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.keyword"
            :placeholder="$t('标题')"
            :style="{ width: '280px' }"
          ></el-input>
        </el-form-item>
        <el-form-item label="">
          <el-select
            v-model="form.status"
            value-key="id"
            :filterable="true"
            :placeholder="$t('审批状态')"
            :style="{ width: '150px' }"
          >
            <el-option :label="$t('审批状态')" value=""></el-option>
            <el-option
              v-for="item in statusTypes"
              :key="item.name"
              :label="item.name"
              :value="item.status"
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
        header-row-class-name="table-list-header"
        row-class-name="tr-item"
      >
        <el-table-column prop="create_time" :label="$t('申请日期')">
          <template slot-scope="scope">
            {{ scope.row.create_time_format | YYYY_MM_DD }}
          </template>
        </el-table-column>
        <el-table-column prop="sn" :label="$t('编号')"> </el-table-column>
        <el-table-column prop="form_name" :label="$t('标题')">
          <template slot-scope="scope">
            <a
              target="_blank"
              class="text-primary"
              :href="
                '/myflow/record_detailed?title=查看申请&record_id=' +
                  scope.row.record_id
              "
              >{{ scope.row.form_name }}</a
            >
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="$t('审批状态')">
          <template slot-scope="scope">
            <label-status
              v-if="scope.row.status == -3 || scope.row.status == -2"
              status="danger"
              :name="scope.row.status_name"
            />
            <label-status
              v-else-if="scope.row.status == 1"
              status="warning"
              :name="scope.row.status_name"
            />
            <label-status
              v-else-if="scope.row.status == 10 || scope.row.status == 5"
              status="success"
              :name="scope.row.status_name"
            />
            <label-status v-else status="info" :name="scope.row.status_name" />
          </template>
        </el-table-column>
        <el-table-column :label="$t('操作')" width="100">
          <template slot-scope="scope">
            <a
              target="_blank"
              class="text-primary"
              :href="
                '/myflow/record_detailed?title=查看申请&record_id=' +
                  scope.row.record_id
              "
              >{{ $t('查看') }}</a
            >
          </template>
        </el-table-column>
      </el-table>
    </PageTableList>
  </LayoutPage>
</template>

<script>
import labelStatus from '~/components/label_status'
import quickApplication from '~/pages/myflow/src/components/quick_application'
import mixin from '@/mixins/table_list'

export default {
  components: {
    labelStatus,
    quickApplication
  },
  filters: {
    YYYY_MM_DD(time) {
      if (!time) return '-'
      const timeArr = time.split(' ')
      return timeArr[0]
    }
  },
  mixins: [mixin],
  data() {
    return {
      formTypes: [],
      statusTypes: [],
      start_end_date: '',
      form: {
        start_day: '',
        end_day: '',
        keyword: '',
        status: '',
        member: '',
        form_type_id: '0'
      }
    }
  },
  mounted() {
    this.getApproveBaseData()
    this.getList()
  },
  methods: {
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
        handler: this.$api.myflow.recordList,
        params: this.form
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
