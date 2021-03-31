<template>
  <LayoutPage :title="$t('app版本列表')">
    <div slot="header-right">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="$router.push('/app/version/edit')"
        >{{ $t('App版本管理') }}</el-button
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
      <el-table
        :data="list"
        header-row-class-name="table-list-header"
        row-class-name="tr-item"
        style="width: 100%"
        height="100%"
      >
        <el-table-column prop="id" :label="$t('id')" />
        <el-table-column prop="title" :label="$t('标题')" />
        <el-table-column prop="os" :label="$t('平台')" />
        <el-table-column prop="bound_id" :label="$t('包名')" />

        <el-table-column fixed="right" width="200" label="管理">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              plain
              icon="el-icon-edit"
              @click="edit(scope.row.id)"
              >编辑</el-button
            >
            <!-- <el-button
              type="danger"
              size="mini"
              plain
              icon="el-icon-delete"
              @click="del(scope.row.id)"
              >删除</el-button
            > -->
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
    form: {}
  }),
  created() {
    this.getList()
  },
  methods: {
    beforeGetList() {
      return {
        handler: this.$api.app.list,
        params: this.form
      }
    },
    edit(id) {
      this.$router.push({
        name: 'app-version-edit',
        query: {
          id
        }
      })
    },
    del(id) {
      if (this.loading) return false
      this.loading = true

      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const rs = this.$api.app.del(id)
          if (rs) {
            this.$message.success('删除成功')
            location.reload()
            this.getList()
          } else {
            this.loading = false
          }
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="less" scoped></style>
