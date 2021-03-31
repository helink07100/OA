<template>
  <LayoutPage :title="$t('跨机构管理')">
    <div slot="header-right">
      <a @click="addDialog">
        <el-button type="primary" class="btn-org" icon="el-icon-plus">{{
          $t('新增跨机构设定')
        }}</el-button>
      </a>
    </div>

    <PageTableList
      :loading="loading"
      :total="pages.total"
      :current-page="pages.page_no"
      :page-size="pages.page_size"
      @current-change="pageCodeChange"
      @size-change="pageSizeChange"
    >
      <el-table
        :data="list"
        style="width: 100%"
        height="100%"
        header-row-class-name="table-list-header"
        row-class-name="tr-item"
      >
        <el-table-column prop="prefix" :label="$t('机构名称')" width="300">
          <template slot-scope="scope">
            <div>{{ organizationName(scope.row.organization_id) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="enable" :label="$t('跨机构')">
          <template slot-scope="scope">
            <div>{{ organizationName(scope.row.to_organization) }}</div>
          </template>
        </el-table-column>
        <el-table-column :label="$t('操作')" width="200" fixed="right">
          <template slot-scope="scope">
            <a class="text-primary" @click="showView(scope.row)">{{
              $t('查看')
            }}</a>
          </template>
        </el-table-column>
      </el-table>
    </PageTableList>
    <el-dialog
      class="add-dialog"
      :title="isView ? '查看跨机构' : '新增跨机构'"
      :visible="dialogVisible"
      width="50%"
      @close="dialogVisible = false"
    >
      <el-form ref="form" label-width="100px" :model="form">
        <el-form-item label="机构" prop="organizationList">
          <el-select v-model="form.organization_id" placeholder="请选择机构">
            <el-option
              v-for="(item, index) in organizationList"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="跨机构" prop="to_organization">
          <el-select
            v-model="form.to_organization"
            multiple
            placeholder="请选择跨机构"
          >
            <el-option
              v-for="(item, index) in organizationList.filter((i) => {
                return i.id !== form.organization_id
              })"
              :key="index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button :disabled="submitLoading" type="primary" @click="onSubmit">
            确定</el-button
          >
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </LayoutPage>
</template>

<script>
import mixin from '@/mixins/table_list'
export default {
  mixins: [mixin],
  data: () => ({
    form: { organization_id: '', to_organization: '' },
    dialogVisible: false,
    organizationList: [],
    isView: false,
    submitLoading: false
  }),
  mounted() {
    this.getSelect()
    this.getList()
  },
  methods: {
    async getSelect() {
      const res = await this.$api.common.getAllOrganization({ master: 1 })
      if (res) {
        this.organizationList = res.data.list
      }
    },
    beforeGetList() {
      return {
        handler: this.$api.admin.getInteragencyPermissionList,
        params: {}
      }
    },
    organizationName(id) {
      let arr = (id + '').split(',')
      arr = arr.map((j) => {
        const nameArr = this.organizationList.filter((i) => {
          return i.id === parseInt(j)
        })[0]
        return nameArr ? nameArr.name : ''
      })
      return arr.join(' 、')
    },
    async onSubmit() {
      this.submitLoading = true
      const form = { ...this.form }
      form.to_organization = form.to_organization.join(',')
      let res

      // 编辑
      if (this.isView) {
        res = await this.$api.admin.editInteragencyPermission(form)
        // 新增
      } else {
        res = await this.$api.admin.addInteragencyPermission(form)
      }
      this.submitLoading = false
      this.dialogVisible = false

      if (res) {
        this.$message.success('新增成功')
        setTimeout(() => {
          this.getList()
        }, 1500)
      }
    },
    addDialog() {
      this.form = {
        to_organization: '',
        organization_id: ''
      }
      this.isView = false
      this.dialogVisible = true
    },
    showView(data) {
      data.to_organization = data.to_organization
        .filter((i) => {
          return i
        })
        .map((i) => {
          return parseInt(i)
        })
      this.form = { ...data }
      this.isView = true
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="less" scoped>
.add-dialog {
  /deep/.el-select {
    display: block;
  }
}
.btn-org {
  padding: 0 14px;
}
</style>
