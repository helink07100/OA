<template>
  <LayoutPage :title="$t('流程类型')">
    <div slot="header-right">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="addEdiFormTypeShow = true"
        >{{ $t('新增流程类型') }}</el-button
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
      <!-- 产品说：不需要有狀態、審批單姓名搜尋 所以先注释了 -->
      <!-- <el-form slot="search"  :inline="true" :model="form">
        <el-form-item :label="$t('状态')">
          <el-select
            v-model="form.status"
            :placeholder="$t('请选择状态')"
            :style="{ width: '140px' }"
          >
            <el-option
              v-for="item in status_types"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-input
            v-model="form.keyword"
            :placeholder="$t('请输入审批单姓名')"
            :style="{ width: '280px' }"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchOn">{{ $t('搜索') }}</el-button>
        </el-form-item>
      </el-form> -->

      <el-table
        :data="list"
        style="width: 100%"
        height="100%"
        header-row-class-name="table-list-header"
        row-class-name="tr-item"
      >
        <!-- <el-table-column prop="form_type_id" :label="$t('序号')" width="120">
        </el-table-column> -->
        <el-table-column prop="cn_name" :label="$t('类型名称')">
        </el-table-column>
        <el-table-column prop="en_name" :label="$t('英文简称')">
        </el-table-column>
        <!-- <el-table-column prop="delete_time" :label="$t('状态')" width="100">
          <template slot-scope="scope">
            <span v-if="!scope.row.delete_time" class="text-success">正常</span>
            <span v-else class="text-info">已删除</span>
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('操作')" width="150" fixed="right">
          <template slot-scope="scope">
            <a
              class="text-primary"
              @click="
                ;(formData = scope.row),
                  (isEdit = true),
                  (addEdiFormTypeShow = true)
              "
              >{{ $t('编辑') }}</a
            >
            <a
              v-if="!scope.row.delete_time"
              class="text-danger ml-sm"
              @click="hideShowHandler(scope.row, '你确定要删除吗？')"
            >
              {{ $t('删除') }}</a
            >
            <a
              v-else
              class="text-success ml-sm"
              @click="hideShowHandler(scope.row, '你确定要恢复吗？')"
            >
              {{ $t('恢复') }}</a
            >
          </template>
        </el-table-column>
      </el-table>
    </PageTableList>
    <oaDialog
      width="40%"
      :dialog-visible="addEdiFormTypeShow"
      :title="isEdit ? '修改流程类型' : '新增流程类型'"
      @close=";(addEdiFormTypeShow = false), (isEdit = false)"
    >
      <component
        :is="'addEditFormType'"
        ref="addEditFormType"
        :is-edit="isEdit"
        :form-data="formData"
        @close=";(addEdiFormTypeShow = false), getList()"
      />
    </oaDialog>
  </LayoutPage>
</template>

<script>
import addEditFormType from './components/add_edit_form_type'
import mixin from '@/mixins/table_list'
import oaDialog from '~/components/oa_dialog'
export default {
  components: {
    oaDialog,
    addEditFormType
  },
  mixins: [mixin],
  data: () => ({
    status_types: [
      {
        value: '',
        label: '正常'
      },
      {
        value: 'hide',
        label: '垃圾桶'
      }
    ],
    form: {
      keyword: '',
      form_type: '',
      status: ''
    },
    addEdiFormTypeShow: false,
    isEdit: false,
    formData: {}
  }),
  watch: {
    addEdiFormTypeShow(newBool) {
      if (!newBool) {
        this.$refs.addEditFormType.resetFields()
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    beforeGetList() {
      this.form.show = this.form.status
      return {
        handler: this.$api.form.getFormTypeList,
        params: this.form
      }
    },
    async setHideShowFormType(item) {
      const res = await this.$api.form.setHideShowFormType({
        form_type_id: item.form_type_id,
        job: item.delete_time ? 'show' : 'hide'
      })
      if (res) {
        this.$message.success(res.msg)
        this.getList()
      }
    },
    hideShowHandler(item, title) {
      this.$confirm(title, {
        distinguishCancelAndClose: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.setHideShowFormType(item, title)
      })
    }
  }
}
</script>

<style lang="less" scoped></style>
