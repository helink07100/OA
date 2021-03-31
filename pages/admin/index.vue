<template>
  <LayoutPage title="管理员">
    <div slot="header-right">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="$router.push('/admin/add')"
        >添加管理员</el-button
      >
    </div>

    <PageTableList
      :loading="loading"
      :total="pages.total"
      :current-page="pages.page_no"
      :page-size="pages.page_size"
      @current-change="pageCodeChange"
      @size-change="pageSizeChange"
    >
      <div slot="search">
        <el-form :inline="true" :model="form">
          <el-form-item label="">
            <el-select v-model="form.cur_group">
              <el-option
                v-for="(name, key) in base.cur_group"
                :key="key"
                :label="name"
                :value="key"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.keyword"
              placeholder="请输入名称"
              width="200px"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="searchOn">{{ $t('搜索') }}</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-table
        :data="list"
        header-row-class-name="table-list-header"
        row-class-name="tr-item"
        style="width: 100%"
        height="100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="username" label="用户名" width="180">
        </el-table-column>
        <el-table-column prop="realname" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="groups" label="用户组"> </el-table-column>
        <el-table-column prop="organization_name" label="机构名称" width="180">
        </el-table-column>
        <el-table-column prop="status" label="激活中">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1" class="text-success">
              正常
            </span>
            <span v-else class="text-danger ">
              禁用
            </span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" width="128" label="管理">
          <template slot-scope="scope">
            <a
              href="javascript:;"
              class="text-primary"
              @click="
                $router.push({
                  name: 'admin-edit',
                  query: { id: scope.row.uid }
                })
              "
            >
              编辑
            </a>
          </template>
        </el-table-column>
      </el-table>

      <div slot="footer-left">
        <el-form :inline="true">
          <el-form-item style="margin-bottom:0">
            <el-select v-model="multipleForm.option" style="width: 100px;">
              <el-option
                v-for="item in base.multipleOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom:0">
            <el-button
              type="primary"
              plain
              :disabled="
                !multipleSelection.length || !String(multipleForm.option)
              "
              @click="option"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </PageTableList>
  </LayoutPage>
</template>

<script>
import mixin from '@/mixins/table_list'
export default {
  mixins: [mixin],
  data: () => ({
    base: {
      cur_group: [], // 用户组
      multipleOptions: [
        // {
        //   label: '批量删除',
        //   value: 0
        // },
        {
          label: '禁用',
          value: 0
        },
        {
          label: '激活',
          value: 1
        }
      ]
    },
    form: {
      cur_group: '0',
      keyword: ''
    },
    multipleForm: {
      option: ''
    },
    multipleSelection: []
  }),
  watch: {
    Result(res) {
      this.base.cur_group = res.data.cur_user_info.group_options2
    }
  },
  created() {
    this.getList()
  },
  methods: {
    beforeGetList() {
      return {
        handler: this.$api.admin.adminList,
        params: this.form
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async option() {
      this.loading = true
      const ids = []
      const multiples = this.multipleSelection
      for (let i = 0; i < multiples.length; i++) {
        ids.push(multiples[i].uid)
      }
      const res = await this.$api.admin.adminActive({
        ids,
        is_active: this.multipleForm.option
      })
      if (res) {
        this.$message.success(this.$t('设置成功'))
        this.multipleSelection = []
        this.getList()
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped></style>
