<template>
  <LayoutPage :title="$t('普通员工')">
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
              :placeholder="$t('请输入名称')"
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
        <el-table-column prop="username" :label="$t('用户名')">
        </el-table-column>
        <el-table-column prop="realname" :label="$t('姓名')"> </el-table-column>
        <el-table-column prop="station_name" :label="$t('岗位')">
        </el-table-column>
        <el-table-column prop="i_status" :label="$t('状态')">
          <template slot-scope="scope">
            <span v-if="scope.row.i_status == '在职中'" class="text-warning">
              在职中
            </span>
            <span v-else class="text-danger ">
              {{ scope.row.i_status }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="status" :label="$t('激活中')">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 1" class="text-success">
              正常
            </span>
            <span v-else class="text-danger ">
              禁用
            </span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" width="128" :label="$t('管理')">
          <template slot-scope="scope">
            <a
              href="javascript:;"
              class="text-primary"
              @click="
                $router.push({
                  name: 'admin-edit',
                  query: { id: scope.row.uid, type: 'normal' }
                })
              "
            >
              {{ $t('编辑') }}
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
      cur_group: [],
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
      this.base.cur_group = res.data
        ? res.data.cur_user_info.group_options2
        : {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    beforeGetList() {
      return {
        handler: this.$api.admin.getIndexBase,
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
