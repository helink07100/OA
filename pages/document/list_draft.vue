<template>
  <LayoutPage title="草稿">
    <nuxt-link
      v-if="form.type == 'published'"
      slot="header-right"
      to="/document/add?type=draft&control=add"
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
        <el-form-item :label="$t('创建')">
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
            v-model="form.organization_id"
            value-key="id"
            :filterable="true"
            :placeholder="$t('发文单位')"
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
        <el-table-column prop="create_time" :label="$t('创建日期')" width="120">
        </el-table-column>
        <el-table-column prop="sn" :label="$t('公告编号')" width="240">
        </el-table-column>
        <el-table-column prop="title" :label="$t('公告主题')">
          <template slot-scope="scope">
            <nuxt-link
              class="text-primary"
              :to="
                '/document/add?type=draft&control=view&id=' +
                  scope.row.id +
                  '&organization_id=' +
                  scope.row.organization_id
              "
            >
              {{ scope.row.title }}
            </nuxt-link>
          </template>
        </el-table-column>
        <el-table-column :label="$t('发文单位')">
          <template slot-scope="scope">
            {{
              toOrganizationList.length
                ? toOrganizationList.find((i) => {
                    return i.id === JSON.parse(scope.row.organization_id)
                  }).name
                : ''
            }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('操作')" width="200">
          <template slot-scope="scope">
            <nuxt-link
              class="text-primary"
              :to="
                '/document/add?type=draft&&control=edit&id=' +
                  scope.row.id +
                  '&organization_id=' +
                  scope.row.organization_id
              "
            >
              {{ $t('编辑') }}
            </nuxt-link>
            <a class="text-danger ml-md" @click="del(scope.row.id)">
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
    toOrganizationList: [],
    start_end_date: '',
    organizationValue: '',
    form: {
      organization_id: '',
      begin_time: '',
      end_time: '',
      keyword: '',
      type: ''
    }
  }),
  mounted() {
    if (this.$route.name.includes('document-received')) {
      this.title = this.$t('收文列表')
      this.form.type = 'received'
    } else {
      this.title = this.$t('草稿')
      this.form.type = 'published'
    }
    this.getCateLists()
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
        handler: this.$api.document.draftLists,
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
    async getToListOrganization() {
      const res = await this.$api.common.getAllOrganization({ master: 1 })

      // 遍历列表用
      this.toOrganizationList = res.data.list
    },
    // 删除
    del(id) {
      this.$confirm('你确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$api.document.draftDel(id)
        if (res) {
          this.$message.success('删除成功')
          setTimeout(() => {
            this.getList()
          }, 1500)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
