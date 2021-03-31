<template>
  <LayoutPage :title="$t('流程列表')">
    <div slot="header-right">
      <nuxt-link to="/form/add">
        <el-button type="primary" icon="el-icon-plus">{{
          $t('新增流程')
        }}</el-button>
      </nuxt-link>
    </div>

    <PageTableList
      :loading="loading"
      :total="pages.total"
      :current-page="pages.page_no"
      :page-size="pages.page_size"
      @current-change="pageCodeChange"
      @size-change="pageSizeChange"
    >
      <el-form slot="search" :inline="true" :model="form">
        <el-form-item :label="$t('创建')">
          <el-date-picker
            v-model="form.start_day"
            type="date"
            :placeholder="$t('请选择开始时间')"
            :style="{ width: '160px' }"
          ></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('至')">
          <el-date-picker
            v-model="form.end_day"
            type="date"
            :placeholder="$t('请选择结束时间')"
            :style="{ width: '160px' }"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="form.form_type"
            value-key="id"
            :filterable="true"
            :placeholder="$t('请选择类型')"
            :style="{ width: '140px' }"
          >
            <el-option label="全部类型" value=""></el-option>
            <el-option
              v-for="item in form_types"
              :key="item.form_type_id"
              :label="item.cn_name"
              :value="item.form_type_id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="form.enable"
            value-key="id"
            :filterable="true"
            :placeholder="$t('请选择状态')"
            :style="{ width: '140px' }"
          >
            <el-option label="全部状态" value=""></el-option>
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
            :placeholder="$t('请输入流程名称')"
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
      >
        <el-table-column prop="create_time" :label="$t('创建日期')">
          <template slot-scope="scope">
            {{ scope.row.create_time.split(' ')[0] }}
          </template>
        </el-table-column>
        <el-table-column prop="prefix" :label="$t('表单前缀')">
        </el-table-column>
        <el-table-column prop="form_type_name" :label="$t('流程类型')">
        </el-table-column>
        <el-table-column prop="form_name" :label="$t('流程名称')">
        </el-table-column>
        <el-table-column prop="enable" :label="$t('状态')" width="200">
          <div slot-scope="scope" class="left-switch">
            <el-switch
              v-model="scope.row.enable"
              class="ui-switch"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="启用"
              inactive-text="停用"
              :active-value="1"
              :inactive-value="0"
              @change="formSetEnable(scope.row, scope.row.enable)"
            >
            </el-switch>
          </div>
        </el-table-column>
        <el-table-column :label="$t('操作')" width="200" fixed="right">
          <template slot-scope="scope">
            <nuxt-link
              class="text-primary"
              :to="'/form/add?form_id=' + scope.row.form_id"
            >
              <a class="text-primary">{{ $t('编辑') }}</a>
            </nuxt-link>
            <a class="text-danger ml-sm" @click="deleteForm(scope.row.form_id)">
              {{ $t('删除') }}
            </a>
            <a
              class="text-warning ml-sm"
              @click="showView(scope.row.form_id)"
              >{{ $t('预览') }}</a
            >
          </template>
        </el-table-column>
      </el-table>
    </PageTableList>
    <dialogSelectOrganization
      ref="selectOrganization"
      dialog-title="适用范围"
      :dialog-visible="isDialogSelectOrganizationShow"
      width="656px"
      @cancel="isDialogSelectOrganizationShow = false"
      @definite="dialog_select_org_definite"
    ></dialogSelectOrganization>
    <flowView
      :dialog-visible="dialogVisible"
      :form_id="form_id"
      title=""
      dialog-title="表单预览"
      @hideDialog="dialogVisible = false"
    />
  </LayoutPage>
</template>

<script>
import mixin from '@/mixins/table_list'
import dialogSelectOrganization from '~/components/dialog_select_organization'
import flowView from '~/components/form_view/index'
export default {
  components: {
    dialogSelectOrganization,
    flowView
  },
  mixins: [mixin],
  data: () => ({
    dialogVisible: false,
    status_types: [
      {
        value: 1,
        label: '启用'
      },
      {
        value: 0,
        label: '停用'
      }
    ],
    form_types: [],
    form: {
      start_day: '',
      end_day: '',
      keyword: '',
      form_type: '',
      enable: ''
    },
    isDialogSelectOrganizationShow: false,
    items: {},
    form_id: '',
    formSetUserForm: {
      form_id: '',
      top_organization: '',
      organizations: [],
      departments: [],
      stations: [],
      members: []
    }
  }),
  mounted() {
    this.getList()
    this.getFormLists()
  },
  methods: {
    async getFormLists() {
      const res = await this.$api.form.getFormList({ form_add: 1 })
      if (res) {
        this.form_types = res.data.form_types
      }
    },
    beforeGetList() {
      if (this.form.start_day)
        this.form.start_day = this.$moment(
          new Date(this.form.start_day)
        ).format('YYYY-MM-DD')
      if (this.form.end_day)
        this.form.end_day = this.$moment(new Date(this.form.end_day)).format(
          'YYYY-MM-DD'
        )
      return {
        handler: this.$api.form.getFormList,
        params: this.form
      }
    },
    async dialog_select_org_definite(checkedList) {
      // 修改适用范围
      this.formSetUserForm.form_id = this.items.form_id
      for (let i = 0; i < checkedList.length; i++) {
        const item = checkedList[i]
        if (item.type === 'department') {
          this.formSetUserForm.departments.push(item.id)
        } else if (item.type === 'station') {
          this.formSetUserForm.stations.push(item.id)
        } else if (item.type === 'member') {
          this.formSetUserForm.members.push(item.id)
        }
      }
      const res = await this.$api.form.formSetUser({
        form_id: this.formSetUserForm.form_id,
        top_organization: '',
        organizations: [],
        departments: this.formSetUserForm.departments,
        stations: this.formSetUserForm.stations,
        members: this.formSetUserForm.members
      })
      if (res) {
        this.isDialogSelectOrganizationShow = false
        this.$message.success(res.msg)
        setTimeout(() => {
          this.getList()
        }, 1500)
      }
    },
    async formSetEnable(item, enable) {
      const res = await this.$api.form.setEnable({
        form_id: item.form_id,
        enable
      })
      setTimeout(() => {
        this.getList()
      }, 1500)
      if (res) {
        this.$message.success('设置成功')
      }
    },
    deleteForm(form_id) {
      this.$confirm('你确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const res = await this.$api.form.deleteForm({
            form_id
          })
          if (res) {
            this.$message.success('删除成功')
            setTimeout(() => {
              this.getList()
            }, 1500)
          }
        })
        .catch(() => {})
    },
    showView(id) {
      this.form_id = id
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="less" scoped>
.ui-switch {
  /deep/.el-switch__label--left {
    position: relative;
    left: 46px;
    color: #fff;
    z-index: -1111;
  }
  /deep/.el-switch__label--right {
    position: relative;
    right: 46px;
    color: #fff;
    z-index: -1111;
  }
  /deep/.el-switch__label--right.is-active {
    z-index: 1111;
    color: #fff !important;
    right: 54px;

    span {
      font-size: 12px !important;
    }
  }
  /deep/.el-switch__label--left.is-active {
    z-index: 1111;
    color: #fff !important;
    left: 54px;
    span {
      font-size: 12px !important;
    }
  }

  /deep/&.el-switch .el-switch__core {
    width: 50px !important;
  }
}
</style>
