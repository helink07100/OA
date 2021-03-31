<template>
  <div>
    <calendar
      :last-text="$t('上一周')"
      :next-text="$t('下一周')"
      @change="date_change"
    >
      <ul
        slot="list"
        v-loading="scheduleLoading"
        class="list-wrap"
        :style="{ 'min-height': '159px' }"
      >
        <template v-for="(item, index) in scheduleList">
          <li v-if="index <= 3" :key="index" class="item">
            <div class="left">{{ item.display_time }}：</div>
            <div
              class="center"
              @click="
                ;(scheduleDetailData = item),
                  (scheduleDetailDialogVisible = true)
              "
            >
              {{ item.title }}
            </div>
            <div class="right" @click="change_schedule_status(item)">
              <i v-if="item.status == 0" class="iconfont icon-xuanzemoren1"></i>
              <i
                v-else-if="item.status == 1"
                class="iconfont icon-xuanzhong1"
              ></i>
            </div>
          </li>
        </template>
        <li v-if="scheduleList.length <= 0">
          <PageEmpty :styles="{ padding: '43px 30px' }" :msg="$t('暂无日程')" />
        </li>
      </ul>
      <template slot="footer">
        <a
          class="cell"
          href="javascript:;"
          @click="scheduleDialogVisible = true"
        >
          <i class="iconfont icon-tianjiaricheng"></i>
          <span class="text">{{ $t('添加日程') }}</span>
        </a>
        <nuxt-link class="cell" to="/schedule/lists">
          <i class="iconfont icon-quanburicheng"></i>
          <span class="text">{{ $t('全部日程') }}</span>
        </nuxt-link>
      </template>
    </calendar>
    <!-- 添加日程 -->
    <add-edit-schedule
      :dialog-visible="scheduleDialogVisible"
      @close="close_add_schedule_dialog"
    />
    <!-- 查看日程详情 -->
    <schedule-detail
      v-if="scheduleDetailDialogVisible"
      :dialog-visible="scheduleDetailDialogVisible"
      :detail-data="scheduleDetailData"
      @close="close_schedule_detail"
    />
  </div>
</template>
<script>
import calendar from '~/pages/home/src/components/schedule/calendar'
import addEditSchedule from '~/pages/schedule/src/components/add_edit_schedule'
import scheduleDetail from '~/pages/schedule/src/components/schedule_detail'
export default {
  components: {
    calendar,
    addEditSchedule,
    scheduleDetail
  },
  data() {
    return {
      scheduleLoading: false,
      scheduleDates: '',
      scheduleList: [],
      scheduleDialogVisible: false,
      scheduleDetailDialogVisible: false,
      scheduleDetailData: {}
    }
  },
  methods: {
    date_change(date) {
      // 日程日期改变的时触发
      this.scheduleDates = date
      const getDataDate = this.$moment(
        new Date(date.year + '-' + date.mm + '-' + date.dd)
      ).format('YYYY-MM-DD')
      this.get_schedule_list(getDataDate)
    },
    async get_schedule_list(date) {
      this.scheduleLoading = true
      const rs = await this.$api.home.searchScheduleByDay({
        date
      })
      if (rs) {
        this.scheduleList = rs.data.schedules
      }
      this.scheduleLoading = false
    },
    async change_schedule_status_submit(status, type, ids) {
      this.scheduleLoading = true
      const rs = await this.$api.schedule.scheduleStatus({
        status,
        type,
        ids
      })
      if (rs) {
        this.$message({
          message: rs.msg,
          type: 'success'
        })
        this.date_change(this.scheduleDates)
      }
      this.scheduleLoading = false
    },
    change_schedule_status(item) {
      const that = this
      if (item.status === 1) return false
      const ids = {}
      const id = item.id
      const str = item.start_timestamp
      ids[id] = str
      this.$confirm('确定要标记为已完成吗？此为重复日程?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          that.change_schedule_status_submit(1, 0, ids)
        })
        .catch(() => {})
    },
    close_add_schedule_dialog(falg) {
      this.scheduleDialogVisible = false
      if (falg) {
        this.date_change(this.scheduleDates)
      }
    },
    close_schedule_detail(falg) {
      this.scheduleDetailDialogVisible = false
      if (falg) {
        this.date_change(this.scheduleDates)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list-wrap {
  list-style: none;
  margin: 0;
  padding: 0;
  padding: 0 14px;
  .item {
    display: flex;
    align-items: flex-start;
    color: #333333;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    border-top: solid 1px #f5f5f5;
    padding: 0 15px;
    cursor: pointer;
    .left {
      white-space: nowrap;
    }
    .center {
      padding: 0 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      flex: 1;
    }
    .right {
      .icon-xuanzemoren1 {
        color: #c1c4cf;
      }
      .icon-xuanzhong1 {
        color: #3f78f6;
      }
    }
  }
}
</style>
