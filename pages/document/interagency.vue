<template>
  <LayoutPage title="跨机构发文">
    <nuxt-link
      v-if="form.type != 'received'"
      slot="header-right"
      to="/document/add?type=interagency&control=add"
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
          <el-input
            v-model="form.keyword"
            :placeholder="$t('请输入主题')"
            :style="{ width: '280px' }"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="form.to_organization"
            value-key="id"
            :filterable="true"
            :placeholder="$t('主送单位')"
            @change="changeOrganization"
          >
            <el-option :label="$t('全部')" value="0"></el-option>
            <el-option
              v-for="(item, index) in toOrganizationList"
              :key="index"
              :label="item.name"
              :value="item.id"
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
        <el-table-column prop="create_time" :label="$t('发布日期')">
        </el-table-column>
        <el-table-column prop="sn" :label="$t('公告编号')"> </el-table-column>
        <el-table-column prop="title" :label="$t('公告主题')">
          <template slot-scope="scope">
            <nuxt-link
              class="text-primary"
              :to="
                '/document/add?type=interagency&control=view&flag=published&id=' +
                  scope.row.id +
                  '&organization_id=' +
                  scope.row.to_organization
              "
            >
              {{ scope.row.title }}
            </nuxt-link>
          </template>
        </el-table-column>
        <el-table-column prop="count_string" :label="$t('主送单位')">
          <template slot-scope="scope">
            <div v-if="scope.row.others.length > 1 && scope.row.count_string">
              {{
                toOrganizationList.find((i) => {
                  return scope.row.others[0]
                }).name
              }}
              <span @click="showMore(scope.row)">...</span>合计{{
                scope.row.others.length
              }}个
            </div>
            <div
              v-else-if="scope.row.others.length > 1 && !scope.row.count_string"
            >
              {{ computedName(scope.row) }}
            </div>
            <div v-else>
              {{
                toOrganizationList.find((i) => {
                  return scope.row.others[0]
                }).name
              }}
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('操作')" width="150">
          <template slot-scope="scope">
            <nuxt-link
              class="text-primary"
              :to="
                '/document/add?type=interagency&control=view&flag=published&id=' +
                  scope.row.id +
                  '&organization_id=' +
                  scope.row.to_organization
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
    start_end_date: '',
    organizationList: [],
    toOrganizationList: [],
    organizationValue: '',
    form: {
      to_organization: '',
      begin_time: '',
      end_time: '',
      keyword: '',
      cate_id: '',
      type: 'published'
    }
  }),
  computed: {
    organization_id() {
      return this.$store.state.user.user.organization_id
    }
  },
  mounted() {
    this.getList()
    this.getAllOrganization()
    this.getToListOrganization()
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
        handler: this.$api.document.interagencyLists,
        params: this.form
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
    async getToListOrganization() {
      const res = await this.$api.common.getAllOrganization()

      // 遍历列表用
      this.toOrganizationList = res.data.list
    },
    changeOrganization(value) {
      this.form.depart_type = value.split('_')[0]
      this.form.department_id = value.split('_')[1]
    },

    // 删除
    async del(id) {
      const res = await this.$api.document.interagencyDel(id)
      if (res) {
        this.list = this.list.filter((i) => {
          return i.id !== id
        })
      }
    },
    computedName(item) {
      return item.others
        .map((j, index) => {
          return this.toOrganizationList.find((i) => {
            return i.id === JSON.parse(j)
          }).name
        })
        .join('、')
    },
    showMore(item) {
      item.count_string = ''
    }
  }
}
</script>

<style lang="less" scoped></style>
