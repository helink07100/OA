<template>
  <LayoutPage title="跨机构收文">
    <PageTableList
      :loading="loading"
      :total="pages.total"
      :current-page="pages.page_no"
      :page-size="pages.page_size"
      @current-change="pageCodeChange"
      @size-change="pageSizeChange"
    >
      <el-form slot="search" :inline="true" :model="form">
        <el-form-item :label="$t('收文')">
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
            :placeholder="$t('请输入公告主题')"
            :style="{ width: '280px' }"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="form.organization_id"
            value-key="id"
            :filterable="true"
            :placeholder="$t('发文机构')"
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
          <el-select
            v-model="form.is_read"
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
      >
        <el-table-column prop="create_time" :label="$t('收文日期')" width="120">
        </el-table-column>
        <el-table-column :label="$t('发文机构')">
          <template slot-scope="scope">
            {{
              toOrganizationList.length &&
              toOrganizationList.find((i) => {
                return i.id === JSON.parse(scope.row.organization_id)
              })
                ? toOrganizationList.find((i) => {
                    return i.id === JSON.parse(scope.row.organization_id)
                  }).name
                : ''
            }}
          </template>
        </el-table-column>
        <el-table-column prop="sn" :label="$t('公告编号')"> </el-table-column>
        <el-table-column prop="title" :label="$t('公告主题')">
          <template slot-scope="scope">
            <nuxt-link
              class="text-primary"
              :to="
                '/document/add?control=view&flag=received&type=get_interagency&id=' +
                  scope.row.id +
                  '&organization_id=' +
                  scope.row.to_organization
              "
            >
              {{ scope.row.title }}
            </nuxt-link>
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="$t('状态')">
          <template slot-scope="scope">
            <span v-if="scope.row.is_read == '未读'" class="text-danger">{{
              scope.row.is_read
            }}</span>
            <span v-else class="text-success">{{ scope.row.is_read }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('操作')" width="100">
          <template slot-scope="scope">
            <nuxt-link
              class="text-primary"
              :to="
                '/document/add?control=transfer&flag=received&type=get_interagency&id=' +
                  scope.row.id +
                  '&organization_id=' +
                  scope.row.to_organization
              "
            >
              {{ $t('转发') }}
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
    organizationList: [],
    toOrganizationList: [],
    start_end_date: '',
    organizationValue: '',
    form: {
      organization_id: '',
      begin_time: '',
      end_time: '',
      keyword: '',
      cate_id: '',
      is_read: '',
      type: 'received'
    }
  }),
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
      const res = await this.$api.common.getAllOrganization({ master: 1 })

      // 遍历列表用
      this.toOrganizationList = res.data.list
    },
    changeOrganization(value) {
      this.form.depart_type = value.split('_')[0]
      this.form.department_id = value.split('_')[1]
    }
  }
}
</script>

<style lang="less" scoped></style>
