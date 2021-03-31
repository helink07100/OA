<template>
  <LayoutPage :title="$t('message.消息列表')">
    <PageTableList
      :loading="loading"
      :total="pages.total"
      :current-page="pages.page_no"
      :page-size="pages.page_size"
      @current-change="pageCodeChange"
      @size-change="pageSizeChange"
    >
      <el-form slot="search" :inline="true" :model="form">
        <el-form-item>
          <el-select
            v-model="form.message_type"
            value-key="id"
            :filterable="true"
            placeholder="请选择分类"
            :style="{ width: '140px' }"
          >
            <el-option label="全部数据" value=""></el-option>
            <el-option
              v-for="item in messageList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="form.status"
            value-key="id"
            :filterable="true"
            placeholder="请选择状态"
            :style="{ width: '140px' }"
          >
            <el-option label="全部" value=""></el-option>
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.keyword"
            :placeholder="$t('请输入关键字')"
            :style="{ width: '280px' }"
          ></el-input>
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
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="title" :label="$t('消息标题')">
        </el-table-column>
        <el-table-column prop="type_name" :label="$t('分类')">
        </el-table-column>
        <el-table-column prop="create_time" :label="$t('发送时间')" width="240">
        </el-table-column>
        <el-table-column :label="$t('管理')" width="100">
          <template slot-scope="scope">
            <a
              class="text-primary"
              :data-href="'?ct=document&ac=detail&flag=1&id=' + scope.row.id"
              @click=";(details = scope.row), (isDetailShow = true)"
              >{{ $t('查看') }}</a
            >
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
              @click="multipleSubmit"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </PageTableList>
    <Detail
      :dialog-visible="isDetailShow"
      :detail-data="details"
      :modal="true"
      @close="isDetailShow = false"
    />
  </LayoutPage>
</template>

<script>
import Detail from './src/components/detail'
import mixin from '@/mixins/table_list'

const statusList = [
  { id: -1, label: '未读' },
  { id: 1, label: '已读' }
]
export default {
  components: {
    Detail
  },
  mixins: [mixin],
  data: () => ({
    base: {
      multipleOptions: [
        {
          label: '已读',
          value: 0
        },
        {
          label: '删除',
          value: 1
        }
      ]
    },
    messageList: {},
    statusList,
    start_end_date: '',
    form: {
      message_type: '',
      status: '',
      keyword: ''
    },
    pages: {
      total: 0,
      page_no: 1,
      page_size: 20
    },
    list: [],

    multipleSelection: [],
    multipleForm: {
      option: ''
    },
    isDetailShow: false,
    details: {}
  }),
  async mounted() {
    this.getTypes()
    await this.getList()
  },
  methods: {
    async getTypes() {
      const res = await this.$api.message.getTypes()
      if (res) {
        this.messageList = res.data
      }
    },
    beforeGetList() {
      return {
        handler: this.$api.message.getFilterList,
        params: this.form
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    getIds(list) {
      const ids = []
      list.forEach((item) => {
        ids.push(item.id)
      })
      return ids
    },
    async multipleSubmit() {
      const ids = this.getIds(this.multipleSelection)
      if (String(this.multipleForm.option) === '0') {
        const res = await this.$api.message.setRead({
          ids
        })
        if (res) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
        }
      } else if (String(this.multipleForm.option) === '1') {
        const res = await this.$api.message.del({
          ids
        })
        if (res) {
          this.$message({
            message: res.msg,
            type: 'success'
          })
        }
      }
      setTimeout(() => {
        this.getList()
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped></style>
