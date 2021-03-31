<template>
  <LayoutPage :title="$t('schedule.我的日程')">
    <template slot="header-right">
      <el-button
        type="primary"
        @click=";(editScheduleData = {}), (scheduleDialogVisible = true)"
        >新建日程</el-button
      >
    </template>

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
          <el-date-picker
            v-model="month"
            type="month"
            placeholder="选择月份"
            format="yyyy-MM"
            @change="changeMonth"
          ></el-date-picker>
        </el-form-item>
      </el-form>

      <ListTable
        v-model="multipleSelection"
        v-loading="listLoading"
        :data="list"
        @option="itemOptions"
      />

      <div slot="footer-left">
        <el-form :inline="true">
          <el-form-item style="margin-bottom:0">
            <el-checkbox
              :indeterminate="isIndeterminate"
              :value="isSelectAll"
              @change="changeAllSelect"
              >全选</el-checkbox
            >
          </el-form-item>
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
              :disabled="!multipleSelection.length || !multipleForm.option"
              @click="allDel"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </PageTableList>
    <!-- 添加日程 -->
    <add-edit-schedule
      :dialog-visible="scheduleDialogVisible"
      :edit-data="editScheduleData"
      @close="close_add_schedule_dialog"
    />
    <ScheduleDetail
      key-name="hidden"
      :dialog-visible="scheduleDetailShow"
      :detail-data="viewScheduleDetail"
      @close=";(scheduleDetailShow = false), changeMonth()"
    />
  </LayoutPage>
</template>

<script>
import ListTable from './src/components/list_table'
import addEditSchedule from './src/components/add_edit_schedule'
import ScheduleDetail from './src/components/schedule_detail'
import mixin from '@/mixins/table_list'
export default {
  components: {
    ListTable,
    addEditSchedule,
    ScheduleDetail
  },
  mixins: [mixin],
  asyncData({ app, query }) {
    return {
      month: query.month || app.$moment().format('YYYY-MM')
    }
  },
  data: () => ({
    confirmShow: false,
    delItemData: {},
    base: {
      multipleOptions: [
        {
          label: '删除',
          value: 1
        }
      ]
    },
    multipleForm: {
      options: ''
    },
    multipleSelection: [],
    form: {
      month: ''
    },
    month: '',
    scheduleDialogVisible: false,
    editScheduleData: {},
    scheduleDetailShow: false,
    viewScheduleDetail: {}
  }),
  computed: {
    scheduleLength() {
      let len = 0
      if (this.list && this.list.length) {
        this.list.forEach((item) => (len += item.schedule.length))
      }
      return len
    },
    isSelectAll() {
      return (
        this.list.length > 0 &&
        this.scheduleLength === this.multipleSelection.length
      )
    },
    isIndeterminate() {
      return (
        this.multipleSelection.length > 0 &&
        this.scheduleLength !== this.multipleSelection.length
      )
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    beforeGetList() {
      this.form.month = this.$moment(new Date(this.month)).format('MM')
      return {
        handler: this.$api.schedule.getMonthList,
        params: this.form
      }
    },
    changeMonth() {
      this.pages.pange_no = 1
      this.getList()
    },
    changeAllSelect(isChecked) {
      if (!isChecked) {
        this.multipleSelection = []
      } else {
        const arr = []
        for (const k in this.list) {
          const item = this.list[k]
          item.schedule.forEach((item) => {
            arr.push(item)
          })
        }
        this.multipleSelection = arr
      }
    },
    close_add_schedule_dialog(falg) {
      this.scheduleDialogVisible = false
      if (falg) {
        this.changeMonth()
      }
    },
    async scheduleOption(status, type, ids) {
      const res = await this.$api.schedule.scheduleStatus({
        status,
        type,
        ids
      })
      if (res) {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        setTimeout(() => {
          this.multipleSelection = []
          this.changeMonth()
        }, 1500)
      }
    },
    itemOptions(type, item) {
      switch (type) {
        case 'del':
          this.delItem(item)
          break
        case 'edit':
          this.editOption(item)
          break
        case 'sign':
          this.signOption(item)
          break
        case 'view':
          this.viewScheduleDetail = item
          this.scheduleDetailShow = true
          break
      }
    },
    async editOption(item) {
      const { code, msg, data } = await this.$api.schedule.getSchedule({
        id: item.id
      })
      if (code !== this.$enum.__SUCCESS__) {
        this.$message({
          message: msg,
          type: 'warning'
        })
      } else {
        this.editScheduleData = data[0]
        this.scheduleDialogVisible = true
      }
    },
    signOption(item) {
      const that = this
      const ids = {}
      ids[item.id] = item.hidden
      const repeat = item.repeat
      this.$confirm(
        !repeat
          ? '确定要标记为已完成吗？'
          : '确定要标记为已完成吗？此为重复日程',
        '提示',
        {
          confirmButtonText: !repeat ? '确定' : '标记所有将来日程',
          cancelButtonText: !repeat ? '取消' : '仅标记此日程',
          type: 'warning',
          distinguishCancelAndClose: true
        }
      )
        .then(() => {
          // 标记所有将来日程
          that.scheduleOption(1, repeat, ids)
        })
        .catch((action) => {
          // 仅标记此日程
          if (action === 'cancel' && repeat) {
            that.scheduleOption(1, 0, ids)
          }
        })
    },
    allDel() {
      const list = this.multipleSelection
      const ids = {}
      for (let i = 0; i < list.length; i++) {
        const item = list[i]
        ids[item.id] = item.hidden
      }
      this.delItem({}, true, ids)
    },
    delItem(item, isAllDel, ids) {
      const that = this
      if (!ids) ids = {}
      const repeat = item.repeat
      this.$confirm(
        !repeat ? '确定要删除该日程吗？' : '确定要删除吗？此为重复日程',
        '提示',
        {
          confirmButtonText: !repeat ? '确定' : '删除所有将来日程',
          cancelButtonText: !repeat ? '取消' : '仅删除此日程',
          type: 'warning',
          distinguishCancelAndClose: true
        }
      )
        .then(() => {
          // 删除所有将来日程
          if (!isAllDel) {
            ids[item.id] = item.hidden
          }
          that.scheduleOption(-1, 1, ids)
        })
        .catch((action) => {
          // 仅删除此日程
          if (action === 'cancel' && repeat) {
            if (!isAllDel) {
              ids[item.id] = item.hidden
            }
            that.scheduleOption(-1, 0, ids)
          }
        })
    }
  }
}
</script>

<style lang="less" scoped></style>
