<template>
  <LayoutPage title="登录日志">
    <!-- <div slot="header-right">
      <el-button
        type="primary"
        icon="el-icon-plus"
        @click="$router.push('/admin/add')"
        >添加管理员</el-button
      >
    </div> -->

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
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="form.date_sta"
              type="date"
              placeholder="年/月/日"
              :style="{ width: '160px' }"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="至">
            <el-date-picker
              v-model="form.date_end"
              type="date"
              placeholder="年/月/日"
              :style="{ width: '160px' }"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="">
            <el-select v-model="form.uid">
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
        <el-table-column prop="id" label="ID" width="80"> </el-table-column>
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column prop="loginip" label="登录IP"> </el-table-column>
        <el-table-column prop="logintime" label="登录时间">
          <template slot-scope="scope">
            {{
              $moment(scope.row.logintime * 1000).format('YYYY-MM-DD HH:mm:ss')
            }}
          </template>
        </el-table-column>
        <el-table-column prop="loginsta" width="200" label="登录时状态">
          <template slot-scope="scope">
            <span v-if="scope.row.loginsta == 1" class="text-success"
              >成功</span
            >
            <span v-else class="text-danger">失败</span>
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
        {
          label: '批量删除',
          value: 0
        }
      ]
    },
    form: {
      uid: '0',
      keyword: ''
    },
    multipleForm: {
      option: ''
    },
    multipleSelection: []
  }),
  created() {
    this.getList()
  },
  mounted() {
    this.getOplog()
  },
  methods: {
    async getOplog() {
      const res = await this.$api.admin.getOplog()
      if (res) {
        this.base.cur_group = res.data.user_options
      }
    },
    beforeGetList() {
      return {
        handler: this.$api.admin.loginLog,
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
        ids.push(multiples[i].id)
      }
      const res = await this.$api.admin.loginLogDel({
        ids
      })
      if (res) {
        this.$message.success(this.$t('删除成功'))
        this.multipleSelection = []
        this.getList()
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped></style>
