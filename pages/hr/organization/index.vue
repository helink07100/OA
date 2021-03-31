<template>
  <div style="position: relative">
    <div class="collapse" @click="handleCollapse"></div>
    <LayoutPage :title="$t('机构管理')">
      <el-row :gutter="10">
        <el-col :span="6" style="height: 100%" v-if="!collapse">
          <div class="left">
            <div class="tree-search">
              <el-input
                clearable
                v-model="treeFilterText"
                placeholder="部门/岗位"
                style="width: 217px"
              ></el-input>
              <el-button
                style="width: 82px"
                @click="() => this.$refs.treeRef.filter(treeFilterText)"
                >{{ $t('搜索') }}</el-button
              >
            </div>
            <div class="tree">
              <el-tree
                :data="organizationList"
                lazy
                :load="loadNode"
                @node-click="handleTreeNodeClick"
                :filter-node-method="filterNode"
                ref="treeRef"
              ></el-tree>
            </div>
          </div>
        </el-col>
        <el-col :span="!collapse ? 18 : 24">
          <PageTableList
            :loading="loading"
            :total="pagination.total"
            :current-page="pagination.page_no"
            :page-size="pagination.page_size"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          >
            <el-form slot="search" :inline="true" :model="form">
              <el-form-item :label="$t('到岗')">
                <el-date-picker
                  v-model="form.start_time"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="年/月/日"
                  :style="{ width: '160px' }"
                  clearable
                ></el-date-picker>
              </el-form-item>
              <el-form-item :label="$t('至')">
                <el-date-picker
                  v-model="form.end_time"
                  type="date"
                  value-format="yyyy-MM-dd"
                  placeholder="年/月/日"
                  :style="{ width: '160px' }"
                  clearable
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="">
                <el-input
                  v-model="form.short_name"
                  :placeholder="$t('姓名/别名')"
                  :style="{ width: '270px' }"
                  clearable
                />
              </el-form-item>
              <el-form-item label="">
                <el-select
                  placeholder="部门"
                  v-model="form.department_name"
                  clearable
                >
                  <el-option
                    v-for="item in departmentList"
                    :label="item.name"
                    :key="item.id"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="">
                <el-select placeholder="岗位" v-model="form.job_name" clearable>
                  <el-option
                    v-for="item in jobList"
                    :label="item.name"
                    :key="item.id"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select
                  v-model="form.job_level"
                  :placeholder="$t('岗位等级')"
                  :style="{ width: '140px' }"
                  clearable
                >
                  <el-option
                    v-for="item in jobLevelList"
                    :value="item"
                    :key="item"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select
                  :placeholder="$t('状态')"
                  :style="{ width: '140px' }"
                  v-model="form.status"
                  clearable
                >
                  <el-option label="在职中" value="1" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="fetchMemberList">{{ $t('搜索') }}</el-button>
              </el-form-item>
            </el-form>
            <el-table
              :data="tableData"
              style="width: 100%"
              header-row-class-name="table-list-header"
              row-class-name="tr-item"
            >
              <el-table-column :label="$t('工号')">
                <template slot-scope="scope">
                  <a class="text-primary" @click="onOpenDrawer(scope.row)">{{
                    scope.row.sn
                  }}</a>
                </template>
              </el-table-column>
              <el-table-column prop="nickname" :label="$t('别名')">
                <template slot-scope="scope">
                  <a class="text-primary" @click="onOpenDrawer(scope.row)">{{
                    scope.row.nickname
                  }}</a>
                </template>
              </el-table-column>
              <el-table-column prop="department_name" :label="$t('部门')">
              </el-table-column>
              <el-table-column prop="job_name" :label="$t('岗位')">
              </el-table-column>
              <el-table-column prop="status" :label="$t('状态')">
                <template slot-scope="scope">
                  <label-status
                    :status="scope.row.i_status === 1 ? 'success' : 'danger'"
                    :name="scope.row.i_status_txt"
                  />
                </template>
              </el-table-column>
            </el-table>
          </PageTableList>
        </el-col>
      </el-row>

      <Hr_organization_drawer
        :visible="openDrawer"
        :data-source="drawerData"
        :handle-close="handleClose"
      />
    </LayoutPage>
  </div>
</template>

<script>
import mixin from '@/mixins/table_list'
import labelStatus from '~/components/label_status'
import Hr_organization_drawer from '@/pages/hr/organization/components/drawer'

export default {
  name: 'Hr_organization',
  mixins: [mixin],
  components: {
    Hr_organization_drawer,
    labelStatus
  },
  data() {
    return {
      treeProps: {
        label: 'name',
        children: 'children',
        isLeaf: 'isLeaf'
      },
      treeFilterText: '',
      collapse: true,
      loading: false,
      form: {
        start_time: '',
        end_time: '',
        short_name: '',
        department_name: '',
        job_name: '',
        job_level: '',
        status: '',
        organization_id: ''
      },
      pagination: {
        page_size: 10,
        offset: 0,
        total: 0,
        total_page: 0,
        page_no: 0
      },
      drawerData: {},
      openDrawer: false,
      tableData: [],
      organizationList: [],
      departmentList: [],
      jobList: [],
      jobLevelList: []
    }
  },
  mounted() {
    this.fetchOrganizationList()
  },
  methods: {
    handleCollapse() {
      this.collapse = !this.collapse
    },
    async onOpenDrawer(rowData) {
      const response = await this.$api.humanResource.queryMemberDetail({
        member_id: rowData.id
      })
      if (response.code === 0) {
        this.openDrawer = true
        this.drawerData = response.data
      }
    },
    handleClose() {
      this.drawerData = {}
      this.openDrawer = false
    },
    handleTreeNodeClick(data) {
      const { id } = data
      this.form.organization_id = id
      this.fetchMemberList()
    },
    async fetchMemberList() {
      const response = await this.$api.humanResource.queryMemberList({
        ...this.form
      })
      if (response.code === 0) {
        this.tableData = response.data.data.list
        this.pagination = response.data.pages
      }
    },
    async fetchOrganizationList() {
      const response = await this.$api.humanResource.queryOrganizationList()
      if (response.code === 0) {
        this.form.organization_id = response.data.id
        return [response.data].map((v) => ({
          ...v,
          label: `${v.name} (${v.level_name}) - ${v.member_coun || 0}人`
        }))
      }
      return []
    },
    async fetchDepartmentList({ organization_id }) {
      const response = await this.$api.humanResource.queryDepartmentList({
        organization_id
      })
      if (response.code === 0) {
        this.departmentList = response.data
        return response.data.map((v) => ({
          ...v,
          label: v.name
        }))
      }
      return []
    },
    async loadNode(node, resolve) {
      if (node.level === 0) {
        const data = await this.fetchOrganizationList()
        return resolve(data)
      } else {
        const data = await this.fetchDepartmentList({
          organization_id: node.data.id
        })
        resolve(data)
      }
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.includes(value)
    },
    handleCurrentChange(currentPage) {
      this.fetchMemberList()
    },
    handleSizeChange(size) {
      this.pagination.page_size = size
    },
    async handleFetchJobLevelList() {
      const response = await this.$api.humanResource.queryJobLevelList({
        organization_id: this.form.organization_id
      })
      if (response.code === 0) {
        this.jobLevelList = response.data
      }
    },
    async handleSearchJobList() {
      const response = await this.$api.humanResource.queryJobList({
        organization_id: this.form.organization_id
      })
      if (response.code === 0) {
        this.jobList = response.data
      }
    }
  },
  watch: {
    treeFilterText(val) {
      this.$refs.treeRef.filter(val)
    },
    'form.organization_id'(val) {
      this.fetchMemberList()
      this.fetchDepartmentList({ organization_id: val })
      this.handleSearchJobList()
      this.handleFetchJobLevelList()
    }
  }
}
</script>

<style lang="less" scoped>
.left {
  background: #fff;
  height: 100%;
}

.tree-search {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid #f5f5f5;

  /deep/ .el-input__inner {
    height: 30px;
  }

  /deep/ .el-button {
    width: 82px;
  }
}

.tree {
  /deep/ .el-tree-node__content {
    border-bottom: 1px solid #f5f5f5;
    height: 44px;
    padding: 0 20px !important;
  }
}

.collapse {
  position: absolute;
  height: 70px;
  background-image: url(~assets/image/collapse-icon.png);
  background-repeat: no-repeat;
  left: -14px;
  top: 108px;
  width: 40px;
  background-size: contain;
  z-index: 1;
  cursor: pointer;
}

.pagination {
  text-align: right;
  margin-top: 26px;
}
</style>
