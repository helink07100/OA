<template>
  <LayoutPage :title="$t('用户组列表')">
    <div slot="header-right">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="$router.push('/admin/group/add')"
        >{{ $t('添加用户组') }}</el-button
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
          <el-form-item>
            <el-input
              v-model="form.keyword"
              placeholder="请输入名称"
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
      >
        <el-table-column prop="name" :label="$t('用户组名')" />

        <el-table-column fixed="right" width="128" label="管理">
          <template slot-scope="scope">
            <el-button v-if="false" size="mini" disabled plain
              >不可操作</el-button
            >
            <template v-else>
              <a
                href="javascript:;"
                class="text-primary"
                @click="editGroup(scope.row.id)"
              >
                编辑
              </a>
              <!-- <el-button
                type="danger"
                size="mini"
                plain
                icon="el-icon-delete"
                @click="delGroup(scope.row.id)"
                >删除</el-button
              > -->
            </template>
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
  data: () => ({
    form: {
      keyword: ''
    }
  }),
  created() {
    this.getList()
  },
  methods: {
    beforeGetList() {
      return {
        handler: this.$api.admin.groupList,
        params: this.form
      }
    },
    editGroup(id) {
      this.$router.push({ name: 'admin-group-edit', query: { id } })
    }
  }
}
</script>

<style lang="less" scoped></style>
