<template>
  <LayoutPage title="我的收文">
    <PageTableList
      :loading="loading"
      :total="pages.total"
      :current-page="pages.page_no"
      :page-size="pages.page_size"
      @current-change="pageCodeChange"
      @size-change="pageSizeChange"
    >
      <el-form slot="search" :inline="true" :model="form">
        <el-form-item :label="$t('发布')">
          <el-date-picker
            v-model="form.begin_time"
            type="date"
            format="yyyy-MM-dd"
            placeholder="年/月/日"
            :style="{ width: '160px' }"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('至')">
          <el-date-picker
            v-model="form.end_time"
            type="date"
            format="yyyy-MM-dd"
            placeholder="年/月/日"
            :style="{ width: '160px' }"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="form.cate_id"
            value-key="id"
            :filterable="true"
            :placeholder="$t('公告属性')"
            @change="changeOrganization"
          >
            <el-option :label="$t('全部')" value="0"></el-option>
            <el-option
              v-for="item in cate_lists"
              :key="item.id"
              :label="item.cate_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.keyword"
            :placeholder="$t('公告主题')"
            :style="{ width: '280px' }"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="is_admin" :label="$t('发文单位')">
          <el-select
            v-model="organizationValue"
            value-key="id"
            :filterable="true"
            :placeholder="$t('发文单位')"
          >
            <el-option :label="$t('全部')" value="0"></el-option>
            <el-option
              v-for="(item, index) in organizationList"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="form.read"
            value-key="id"
            :filterable="true"
            :placeholder="$t('状态')"
          >
            <el-option :label="$t('未读')" :value="0"></el-option>
            <el-option :label="$t('已读')" :value="1"></el-option>
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
        @sort-change="sortChange"
      >
        <el-table-column
          prop="create_time"
          :label="$t('收文日期')"
          width="120"
          sortable="custom"
        >
        </el-table-column>
        <el-table-column prop="cate_name" :label="$t('公告属性')">
        </el-table-column>
        <el-table-column prop="sn" :label="$t('公告编号')"> </el-table-column>
        <el-table-column prop="title" :label="$t('公告主题')">
          <template slot-scope="scope">
            <nuxt-link
              class="text-primary"
              :to="
                '/document/detail?type=received&control=view&flag=1&id=' +
                  scope.row.id +
                  '&organization_id=' +
                  scope.row.organization_id
              "
            >
              {{ scope.row.title }}
            </nuxt-link>
          </template>
        </el-table-column>
        <el-table-column prop="pub_sig_depart_name" :label="$t('发文单位')">
        </el-table-column>
        <el-table-column prop="status" :label="$t('状态')">
          <template slot-scope="scope">
            <span v-if="scope.row.read == 0" class="text-danger">{{
              scope.row.is_read
            }}</span>
            <span v-else class="text-success">{{ scope.row.is_read }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ratio" :label="$t('已读率')" sortable="custom">
          <template slot-scope="scope">
            <span
              :class="scope.row.ratio > 0.5 ? 'text-success' : 'text-danger'"
            >
              {{ (scope.row.read_rate * 100).toFixed(2) + '%' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('操作')" width="100">
          <template slot-scope="scope">
            <nuxt-link
              class="text-primary"
              :to="
                '/document/detail?type=received&control=view&flag=1&id=' +
                  scope.row.id +
                  '&organization_id=' +
                  scope.row.organization_id
              "
            >
              查看
            </nuxt-link>
          </template>
        </el-table-column>
      </el-table>
    </PageTableList>
  </LayoutPage>
</template>

<script>
import mixin from '@/mixins/table_list'
export default {
  mixins: [mixin],
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    title: '',
    cate_lists: {},
    start_end_date: '',
    organizationList: [],
    organizationValue: '',
    form: {
      depart_type: '',
      department_id: '',
      begin_time: '',
      end_time: '',
      keyword: '',
      cate_id: '',
      type: 'published',
      order_by: '',
      // ascending(升序), descending（降序）
      is_asc: ''
    }
  }),
  computed: {
    is_admin() {
      return this.$store.state.user.user.is_admin
    }
  },
  mounted() {
    this.getCateLists()
    this.getList()

    // 只有管理员才有这个接口
    if (this.is_admin) this.getAllOrganization()
  },
  methods: {
    beforeGetList() {
      if (this.form.begin_time) {
        this.form.begin_time = this.$moment(
          new Date(this.form.begin_time)
        ).format('YYYY-MM-DD')
      }
      if (this.form.end_time) {
        this.form.end_time = this.$moment(new Date(this.form.end_time)).format(
          'YYYY-MM-DD'
        )
      }

      // 普通用户和管理员不同
      if (this.is_admin) {
        this.form.type = 'published'
      } else {
        this.form.type = 'received'
      }

      return {
        handler: this.$api.document.ajaxGetDocs,
        params: this.form
      }
    },

    // 公告属性列表
    async getCateLists() {
      const res = await this.$api.document.cateLists()
      if (res) {
        this.cate_lists = res.data.list
      }
    },

    // 机构列表
    async getAllOrganization() {
      const res = await this.$api.document.getDocumentOrganization()
      if (res) {
        const departmentList = Object.entries(res.data.department).map((i) => {
          return { value: 'department_' + i[0], label: i[1] }
        })

        const organizationList = Object.entries(res.data.organization).map(
          (i) => {
            return { value: 'organization_' + i[0], label: i[1] }
          }
        )

        this.organizationList = organizationList.concat(departmentList)
      }
    },
    changeOrganization(value) {
      this.form.depart_type = value.split('_')[0]
      this.form.department_id = value.split('_')[1]
    },

    // 删除
    async del(id) {
      const res = await this.$api.document.delCate(id)
      if (res) {
        this.list = this.list.filter((i) => {
          return i.id !== id
        })
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
