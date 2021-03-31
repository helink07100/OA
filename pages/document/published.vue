<template>
  <LayoutPage title="机构内公告">
    <nuxt-link
      v-if="form.type != 'received'"
      slot="header-right"
      to="/document/add?type=published&control=add"
    >
      <el-button
        class="page-header-button"
        type="primary"
        icon="el-icon-plus"
        >{{ $t('新增公告') }}</el-button
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
        <el-form-item v-is="is_admin">
          <el-select
            v-model="organizationValue"
            value-key="id"
            :filterable="true"
            :placeholder="$t('发文单位')"
            @change="changeOrganization"
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
          :label="$t('发布日期')"
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
                '/document/add?type=published&control=view&flag=1&id=' +
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
        <el-table-column prop="ratio" :label="$t('已读率')">
          <template slot-scope="scope">
            <span
              :class="scope.row.ratio > 0.5 ? 'text-success' : 'text-danger'"
            >
              {{ (scope.row.ratio * 100).toFixed(2) + '%' }}
            </span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('操作')" width="150">
          <template slot-scope="scope">
            <nuxt-link
              class="text-primary"
              :to="
                '/document/add?type=published&control=edit&flag=1&id=' +
                  scope.row.id +
                  '&organization_id=' +
                  scope.row.organization_id
              "
            >
              {{ $t('编辑') }}
            </nuxt-link>
            <a
              href="javascript:;"
              class="ml-sm text-danger"
              @click="del(scope.row.id)"
            >
              {{ $t('删除') }}
            </a>
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
    organizationList: [],
    start_end_date: '',
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
    del(id) {
      this.$confirm('你确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$api.document.interagencyDel(id)
        if (res) {
          this.list = this.list.filter((i) => {
            return i.id !== id
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
