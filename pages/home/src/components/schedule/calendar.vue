<template>
  <div class="calendar-content">
    <div class="header-column">
      <div class="left" @click="lastWeek">
        <i class="iconfont icon-triangle-left"></i>
        <span class="last-week">{{ lastText }}</span>
      </div>
      <div class="date-title">
        <el-date-picker
          v-model="year"
          class="calendar-date-picker"
          :clearable="Boolean(false)"
          :editable="Boolean(false)"
          prefix-icon="none"
          type="month"
          size="mini"
          align="center"
          format="yyyy 年 MM 月"
          name="year"
          placeholder="选择月"
          @change="selectDate"
        >
        </el-date-picker>
        <i class="iconfont icon-daohangdianji"></i>
      </div>
      <div class="right">
        <span class="next-week" @click="nextWeek">{{ nextText }}</span>
        <i class="iconfont icon-triangle-right"></i>
      </div>
    </div>
    <div class="week-date-column">
      <ul class="week-item">
        <li v-for="item in weeks" :key="item.weekZh">{{ item.weekZh }}</li>
      </ul>
      <ul class="date-item">
        <template v-for="item in weeks">
          <li
            :key="item.weekNumber"
            :class="{ active: selectDateItem.dd == item.dd }"
            @click="selectDafteNumber(item)"
          >
            {{ showWeekNumber(item) }}
          </li>
        </template>
      </ul>
    </div>
    <div class="list-column">
      <slot name="list"></slot>
    </div>
    <div class="footer-column">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lastText: {
      type: String,
      default: '上一周'
    },
    nextText: {
      type: String,
      default: '下一周'
    }
  },
  data() {
    return {
      year: new Date(),
      weeks: [],
      selectDateItem: {}
    }
  },
  watch: {
    selectDateItem(nv, ov) {
      this.$emit('change', nv)
    }
  },
  mounted() {
    this.init_week()
  },
  methods: {
    showWeekNumber(item) {
      return item.dd < 10 ? '0' + item.dd : item.dd
    },
    /**
     * @description 选择月份的操作
     * @param {*} date Sun Dec 29 2019 14:36:11 GMT+0700 (印度支那时间)
     */
    selectDate(date) {
      // 选择月份
      this.init_week('month')
    },
    selectDafteNumber(item) {
      // 选择日期的操作
      this.selectDateItem = item
    },
    create_weeks(unix, dayNumber) {
      // 计算一周的日期与星期几
      const date = new Date(unix)
      const YYYY = date.getFullYear()
      const MM = date.getMonth() + 1
      const DD = date.getDate()
      const weekStrs = ['一', '二', '三', '四', '五', '六', '日']
      const weeks = []
      let index = 0
      for (let i = 0; i < 7; i++) {
        const item = {}
        const dateObject = new Date(YYYY, MM - 1, DD + i)
        const newYYYY = dateObject.getFullYear()
        const newMM = dateObject.getMonth() + 1
        const newDD = dateObject.getDate()
        const newWeekOfday = this.$moment(
          newYYYY + '-' + newMM + '-' + newDD,
          'YYYY-MM-DD'
        ).format('E') // 获取星期几
        const weekZh = weekStrs[newWeekOfday - 1]
        item.year = newYYYY
        item.mm = newMM
        item.dd = newDD
        item.weekZh = weekZh
        item.weekNumber = newWeekOfday
        if (newDD === dayNumber) index = i
        weeks.push(item)
      }
      // 跟随日期变化月份
      const weeks_item = weeks[weeks.length - 1]
      this.year = new Date(weeks_item.year, weeks_item.mm - 1, weeks_item.dd)
      // 返回一周的数据
      return {
        weeks,
        index
      }
    },
    init_week(type) {
      const date = new Date(this.year)
      const YYYY = date.getFullYear()
      const MM = date.getMonth()
      const DD = date.getDate()
      const weeksData = this.create_weeks(
        new Date(YYYY, MM, DD - 1),
        this.$moment().date()
      )
      this.weeks = weeksData.weeks
      this.selectDateItem = this.weeks[type === 'month' ? 1 : weeksData.index]
    },
    lastWeek() {
      // 上一周
      const weekItem = this.weeks[0]
      const date = new Date(weekItem.year, weekItem.mm - 1, weekItem.dd - 7)
      const weeksData = this.create_weeks(new Date(date))
      this.weeks = weeksData.weeks
      this.selectDateItem = this.weeks[weeksData.index]
    },
    nextWeek() {
      // 下一周
      const weekItem = this.weeks[this.weeks.length - 1]
      const date = new Date(weekItem.year, weekItem.mm - 1, weekItem.dd + 1)
      const weeksData = this.create_weeks(new Date(date))
      this.weeks = weeksData.weeks
      this.selectDateItem = this.weeks[weeksData.index]
    }
  }
}
</script>

<style lang="less" scoped>
.calendar-content {
  background: #fff;
  box-shadow: 0 0 6px 0 rgba(225, 226, 229, 0.5);
  border-radius: 2px;
  .header-column {
    display: flex;
    align-items: center;
    justify-items: center;
    padding: 18px 20px;
    user-select: none;
    /deep/ .calendar-date-picker {
      width: inherit;
      .el-input__inner {
        width: 130px;
        padding: 0;
        text-align: center;
        border: none;
        font-size: 20px;
        color: #333333;
        cursor: pointer;
      }
    }
    .left,
    .right {
      font-size: 16px;
      color: #666666;
      .icon-triangle-right,
      .icon-triangle-left {
        font-size: 12px;
        color: #c2cbdc;
      }
    }
    .last-week,
    .next-week {
      cursor: pointer;
    }
    .date-title {
      flex: 1;
      align-items: center;
      text-align: center;
      .title {
        font-size: 20px;
        color: #333333;
      }
      .icon-daohangdianji {
        font-size: 12px;
        color: #9b9b9b;
        position: relative;
        top: -3px;
        padding-left: 8px;
      }
    }
  }
  .week-date-column {
    .week-item,
    .date-item {
      padding: 0;
      margin: 0;
      list-style: none;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      padding: 0 50px;
      li {
        flex: 1;
        text-align: center;
        font-size: 14px;
        color: #999999;
        cursor: pointer;
      }
    }
    .week-item {
      background: #edf0f7;
      padding-top: 6px;
      padding-bottom: 6px;
    }
    .date-item {
      padding-top: 15px;
      padding-bottom: 15px;
      li {
        margin: 0 5px;
        padding: 0 15px;
        font-size: 14px;
        color: #333333;
        padding: 3px 0;
        border-radius: 15px;
        background: #f4f6fa;
        &.active {
          background: #3f78f6;
          color: #fff;
        }
      }
    }
  }
  .footer-column {
    border-top: solid 1px #f5f5f5;
    margin: 0 14px;
    padding: 22px 15px;
    .cell {
      font-size: 14px;
      color: #3f78f6;
      padding-right: 35px;
      .iconfont {
        font-size: 14px;
      }
    }
  }
}
</style>
