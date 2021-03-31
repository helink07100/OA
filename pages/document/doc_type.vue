<template>
  <LayoutPage :title="$t('公告属性')">
    <div slot="header-right">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click=";(addDocTypeShow = true), (formData = {})"
      >
        {{ $t('新增公告属性') }}
      </el-button>
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
        <!-- <el-table-column prop="create_time" :label="$t('创建日期')" width="120">
        </el-table-column> -->
        <el-table-column prop="cate_name" :label="$t('中文属性')">
        </el-table-column>
        <el-table-column prop="cate_en_name" :label="$t('英文属性')">
        </el-table-column>
        <el-table-column :label="$t('操作')" width="150">
          <template slot-scope="scope">
            <a
              class="text-primary"
              @click="
                ;(formData = scope.row),
                  (isEdit = true),
                  (addDocTypeShow = true)
              "
              >{{ $t('修改') }}</a
            >
            <a class="text-danger ml-sm" @click="del(scope.row.id)">{{
              $t('删除')
            }}</a>
          </template>
        </el-table-column>
      </el-table>
    </PageTableList>
    <oaDialog
      :dialog-visible="addDocTypeShow"
      :title="isEdit ? '修改公告属性' : '新增公告属性'"
      @close=";(addDocTypeShow = false), (isEdit = false)"
    >
      <component
        :is="'addDocType'"
        :is-edit="isEdit"
        :form-data="formData"
        @close=";(addDocTypeShow = false), getList()"
      />
      <!-- <addDocType
        :is-edit="isEdit"
        :form-data="formData"
        @close=";(addDocTypeShow = false), getList()"
      /> -->
    </oaDialog>
  </LayoutPage>
</template>

<script>
import addDocType from './components/add_doc_type'
import mixin from '@/mixins/table_list'
import oaDialog from '~/components/oa_dialog'
export default {
  components: {
    oaDialog,
    addDocType
  },
  mixins: [mixin],
  data: () => ({
    isEdit: false,
    formData: {},
    // oaDialogTitle: '新增公告属性',
    addDocTypeShow: false
  }),
  mounted() {
    this.getList()
  },
  methods: {
    beforeGetList() {
      return {
        handler: this.$api.document.docTypeList,
        params: {}
      }
    },
    async delFormSubmit(id) {
      const res = await this.$api.document.docTypeDelete({ id })
      if (res) {
        this.$message.success('删除成功')
        this.getList()
      }
    },
    del(id) {
      this.$confirm('你确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.delFormSubmit(id)
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped></style>
