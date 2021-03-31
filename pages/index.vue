<template>
  <LayoutPage v-if="is_admin" class="index-main" :title="$t('快速总览')">
    <div class="business-list fx-center">
      <div class="business-item f1 fx-center">
        <div class="icon-border">
          <i class="icon iconfont icon-yuangongshuliang"></i>
        </div>
        <div class="item-info fx-dastart">
          <span class="num">{{ initData.member_count }}</span>
          <span class="name">已登入过OA员工数量</span>
        </div>
      </div>
      <div class="business-item f1 fx-center">
        <div class="icon-border">
          <i class="icon iconfont icon-shenpizhongbiaodan"></i>
        </div>
        <div class="item-info fx-dastart">
          <span class="num">{{ initData.record_count.no_review_count }}</span>
          <span class="name">本日审批中</span>
        </div>
      </div>
      <div class="business-item f1 fx-center">
        <div class="icon-border">
          <i class="icon iconfont icon-wanchengshenpi"></i>
        </div>
        <div class="item-info fx-dastart">
          <span class="num">{{ initData.record_count.pass_review_count }}</span>
          <span class="name">本日已通过</span>
        </div>
      </div>
      <div class="business-item f1 fx-center">
        <div class="icon-border">
          <i class="icon iconfont icon-weidufawen"></i>
        </div>
        <div class="item-info fx-dastart">
          <span class="num">{{
            initData.doceument_unread ? initData.doceument_unread : 0
          }}</span>
          <span class="name">未读机构收文</span>
        </div>
      </div>
    </div>
    <div class="chart-list fx-center">
      <div class="chart-item f1">
        <div class="flex fx-between">
          <div class="chart-title">审批状态</div>
          <el-date-picker
            v-model="datePickerValue1"
            type="daterange"
            size="small"
            start-placeholder="年/月/日"
            end-placeholder="年/月/日"
            @change="(value) => handleDateChange(value, 'record')"
            value-format="timestamp"
            clearable
            :picker-options="pickerOptionsOfDatePicker1"
          >
          </el-date-picker>
        </div>
        <div class="chart-con">
          <ve-histogram
            :data="initData.weekcountChart"
            :colors="histogramColors"
            :extend="histogramExtend"
          >
            <div
              v-if="!loading && !initData.weekcountChart.rows.length"
              class="data-empty"
            >
              暂无数据
            </div>
          </ve-histogram>
        </div>
      </div>
      <div class="chart-item f1">
        <div class="flex fx-between">
          <div class="chart-title">登录记录</div>
          <el-date-picker
            v-model="datePickerValue2"
            type="daterange"
            size="small"
            start-placeholder="年/月/日"
            end-placeholder="年/月/日"
            @change="(value) => handleDateChange(value, 'login')"
            value-format="timestamp"
            clearable
            :picker-options="pickerOptionsOfDatePicker2"
          >
          </el-date-picker>
        </div>
        <div class="chart-con">
          <ve-line
            :data="initData.loginChart"
            :colors="lineColor"
            :extend="lineExtend"
            :settings="lineSetting"
          >
            <div
              v-if="!loading && !initData.loginChart.rows.length"
              class="data-empty"
            >
              暂无数据
            </div>
          </ve-line>
        </div>
      </div>
      <div class="chart-item f1">
        <div class="flex fx-between">
          <div class="chart-title">使用流程排序</div>
          <el-date-picker
            v-model="datePickerValue3"
            type="daterange"
            size="small"
            start-placeholder="年/月/日"
            end-placeholder="年/月/日"
            @change="(value) => handleDateChange(value, 'form')"
            value-format="timestamp"
            clearable
            :picker-options="pickerOptionsOfDatePicker3"
          >
          </el-date-picker>
        </div>
        <div class="chart-con">
          <ve-bar
            :data="initData.formCountChart"
            :colors="barColor"
            :extend="barExtend"
            :settings="barSetting"
          >
            <div
              v-if="!loading && !initData.formCountChart.rows.length"
              class="data-empty"
            >
              暂无数据
            </div>
          </ve-bar>
        </div>
      </div>
    </div>
  </LayoutPage>

  <LayoutPage v-else :title="$t('快速总览')">
    <el-row :style="{ 'padding-bottom': '96px' }">
      <!-- 新闻,通告,紧急通告 -->
      <el-col :span="14">
        <div class="news-content">
          <el-tabs
            v-if="cateLists.length > 0"
            v-model="cateListsName"
            class="oa-tabs"
            @tab-click="user_docs_handle_click"
          >
            <el-tab-pane
              v-for="item in cateLists"
              :key="item.id"
              :name="String(item.id)"
              :label="item.cate_name"
            >
              <news-table-list
                v-loading="newsLoading"
                :list="cateSubLists"
                table-height="322px"
              />
            </el-tab-pane>
          </el-tabs>
          <PageEmpty
            v-else
            :styles="{ 'padding-top': '159px', 'padding-bottom': '158px' }"
          />
        </div>
      </el-col>

      <!-- 日程 -->
      <el-col :span="10">
        <schedule />
      </el-col>
      <!-- 我的 -->
      <el-col :span="14">
        <oprocessCenter />
      </el-col>
      <!-- 快速申请 -->
      <el-col :span="10">
        <quickAppList
          :list="quickAppList"
          :title="$t('快速申请')"
          @onclose="handleQuickAppFormModalClose"
        />
      </el-col>
    </el-row>
  </LayoutPage>
</template>

<script>
import newsTableList from '~/pages/home/src/components/news_table_list'
import schedule from '~/pages/home/src/components/schedule/index'
import oprocessCenter from '~/pages/home/src/components/oprocess_center/index'
import quickAppList from '~/pages/home/src/components/quick_app_list'
import chart from '@/mixins/chart'
export default {
  components: {
    newsTableList,
    schedule,
    oprocessCenter,
    quickAppList
  },
  mixins: [chart],
  data() {
    const that = this
    return {
      loading: false,
      initData: {
        member_count: '',
        doceument_unread: '',
        record_count: {
          no_review_count: '',
          pass_review_count: ''
        },
        weekcountChart: { columns: [], rows: [] },
        loginChart: { columns: [], rows: [] },
        formCountChart: { columns: [], rows: [] }
      },
      minTime1: null,
      maxTime1: null,
      minTime2: null,
      maxTime2: null,
      minTime3: null,
      maxTime3: null,
      datePickerValue1: '',
      pickerOptionsOfDatePicker1: {
        onPick(time) {
          // 如果选择了只选择了一个时间
          if (!time.maxDate) {
            const timeRange = 15 * 24 * 60 * 60 * 1000 // 15天
            that.minTime1 = time.minDate.getTime() - timeRange // 最小时间
            that.maxTime1 = time.minDate.getTime() + timeRange // 最大时间
            // 如果选了两个时间，那就清空本次范围判断数据，以备重选
          } else {
            that.minTime1 = that.maxTime1 = null
          }
        },
        disabledDate(time) {
          // onPick后触发
          // 该方法会轮询当3个月内的每一个日期，返回false表示该日期禁选
          if (that.minTime1 && that.maxTime1) {
            return (
              time.getTime() < that.minTime1 || time.getTime() > that.maxTime1
            )
          }
        }
      },
      datePickerValue2: '',
      pickerOptionsOfDatePicker2: {
        onPick(time) {
          // 如果选择了只选择了一个时间
          if (!time.maxDate) {
            const timeRange = 15 * 24 * 60 * 60 * 1000 // 15天
            that.minTime2 = time.minDate.getTime() - timeRange // 最小时间
            that.maxTime2 = time.minDate.getTime() + timeRange // 最大时间
            // 如果选了两个时间，那就清空本次范围判断数据，以备重选
          } else {
            that.minTime2 = that.maxTime2 = null
          }
        },
        disabledDate(time) {
          // onPick后触发
          // 该方法会轮询当3个月内的每一个日期，返回false表示该日期禁选
          if (that.minTime2 && that.maxTime2) {
            return (
              time.getTime() < that.minTime2 || time.getTime() > that.maxTime2
            )
          }
        }
      },
      datePickerValue3: '',
      pickerOptionsOfDatePicker3: {
        onPick(time) {
          // 如果选择了只选择了一个时间
          if (!time.maxDate) {
            const timeRange = 15 * 24 * 60 * 60 * 1000 // 15天
            that.minTime3 = time.minDate.getTime() - timeRange // 最小时间
            that.maxTime3 = time.minDate.getTime() + timeRange // 最大时间
            // 如果选了两个时间，那就清空本次范围判断数据，以备重选
          } else {
            that.minTime3 = that.maxTime3 = null
          }
        },
        disabledDate(time) {
          // onPick后触发
          // 该方法会轮询当3个月内的每一个日期，返回false表示该日期禁选
          if (that.minTime3 && that.maxTime3) {
            return (
              time.getTime() < that.minTime3 || time.getTime() > that.maxTime3
            )
          }
        }
      },
      quickAppList: [],
      cateListsName: '',
      cateLists: [],
      cateSubLists: [],
      newsLoading: false
    }
  },
  computed: {
    is_admin() {
      return this.$store.state.user.user.is_admin
    }
  },
  mounted() {
    if (this.is_admin) {
      this.getIndexData()
    } else {
      this.getMyFormsData()
      this.queryQuickFormDataSource()
    }
  },
  methods: {
    async getIndexData(params) {
      this.loading = true
      const res = await this.$api.home.getDashboard(params || {})
      // 数据转换
      if (res) {
        // 使用流程排序
        if (res.data.record_form_count) {
          this.initData.formCountChart.columns = ['label', '本月次数']
          this.initData.formCountChart.rows = []
          res.data.record_form_count.forEach((item, index) => {
            if (index >= 10) return
            this.initData.formCountChart.rows[index] = {
              label: Object.keys(item)[0],
              本月次数: Object.values(item)[0]
            }
          })
          this.initData.formCountChart.rows.reverse()
        }

        // 登录日志
        if (res.data.login_day_count) {
          this.initData.loginChart.columns = ['date', '登录次数']
          const loginArr = Object.entries(res.data.login_day_count)
          if (loginArr && loginArr.length) {
            this.initData.loginChart.rows = []
            loginArr.map((item, index) => {
              this.initData.loginChart.rows[index] = {
                date: item[1].date.split(/(\d{4}-)/)[2],
                登录次数: item[1].count
              }
            })
          }
        }

        this.initData = Object.assign(this.initData, res.data)
        this.loading = false

        // 审批状态
        if (res.data.week_count) {
          this.initData.weekcountChart.columns = [
            'label',
            '审核中',
            '审核通过',
            '已驳回'
          ]
          const weekArr = Object.entries(res.data.week_count)
          if (weekArr && weekArr.length) {
            this.initData.weekcountChart.rows = []
            weekArr.map((item, index) => {
              if (item[1] && item[1].length) {
                let passCount = 0
                let waitCount = 0
                let failCount = 0
                item[1].forEach((j) => {
                  if (j.status === 1) {
                    waitCount += j.count
                  } else if (j.status === -2) {
                    failCount += j.count
                  } else {
                    passCount += j.count
                  }
                })
                this.initData.weekcountChart.rows[index] = {
                  label: item[0].split(/(\d{4}-)/)[2],
                  已驳回: failCount,
                  审核通过: passCount,
                  审核中: waitCount
                }
              }
            })
          }
        }
      }
    },
    async getMyFormsData() {
      // 获取表单申请数据
      const res = await this.$api.home.myforms({})
      if (res) {
        this.cateLists = res.data.cate_lists || []
        // this.quickAppList = res.data.myforms || []
        if (res.data.cate_lists[0]) {
          this.cateListsName = String(res.data.cate_lists[0].id)
          this.getUserDocs(this.cateListsName)
        }
        // data.myrecords
      }
    },
    user_docs_handle_click(e) {
      const name = e.name
      this.getUserDocs(name)
    },
    async getUserDocs(id) {
      this.newsLoading = true
      try {
        const rs = await this.$api.home.getDocsByCate({
          cate_id: id,
          nums: 6
        })
        if (rs) {
          this.cateSubLists = rs.data ? rs.data : []
        }
        this.newsLoading = false
      } catch (e) {
        this.$log(e)
      }
    },
    handleDateChange(value, type) {
      if (this.is_admin) {
        const params = {
          date_start: Array.isArray(value)
            ? this.$moment(value[0]).format('YYYY-MM-DD')
            : '',
          date_end: Array.isArray(value)
            ? this.$moment(value[1]).format('YYYY-MM-DD')
            : '',
          type: Array.isArray(value) ? type : ''
        }

        if (type === 'record') {
          this.minTime1 = ''
          this.maxTime1 = ''
        } else if (type === 'login') {
          this.minTime2 = ''
          this.maxTime2 = ''
        } else if (type === 'form') {
          this.minTime3 = ''
          this.maxTime3 = ''
        }

        Array.isArray(value) ? this.getIndexData(params) : this.getIndexData()
      } else {
        this.getMyFormsData()
      }
    },
    async queryQuickFormDataSource() {
      const response = await this.$api.home.queryQuickFormIndexPage()
      if (response.code === 0) {
        this.quickAppList = response.data.list
      }
    },
    handleQuickAppFormModalClose() {
      this.queryQuickFormDataSource()
    }
  }
}
</script>

<style lang="less" scoped>
.index-main {
  .data-empty {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.7);
    color: #888;
    font-size: 14px;
  }
  .business-list {
    margin-bottom: 20px;
    .business-item {
      position: relative;
      height: 160px;
      background: #fff;

      .num {
        font-size: 30px;
        color: #333;
      }

      .name {
        font-size: 14px;
        color: #7d7d7d;
      }

      .icon-border {
        margin-right: 25px;
        border-radius: 50%;
      }

      i {
        display: block;
        width: 58px;
        height: 58px;
        line-height: 58px;
        text-align: center;
        border-radius: 50%;
        color: #fff;
        font-size: 20px;
        box-sizing: border-box;
      }

      &:nth-child(1) {
        .icon-border {
          border: 6px solid rgba(76, 124, 244, 0.12);
        }
        i {
          background: #4c7cf4;
        }
      }

      &:nth-child(2) {
        .icon-border {
          border: 6px solid rgba(254, 132, 32, 0.12);
        }
        i {
          background: #fe8420;
        }
      }

      &:nth-child(3) {
        .icon-border {
          border: 6px solid rgba(103, 201, 43, 0.12);
        }
        i {
          background: #67c92b;
        }
      }

      &:nth-child(4) {
        .icon-border {
          border: 6px solid rgba(255, 68, 57, 0.12);
        }
        i {
          background: #ff4439;
        }

        &::after {
          display: none;
        }
      }

      &::after {
        position: absolute;
        display: block;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        width: 1px;
        height: 42px;
        content: '';
        background: #ebebeb;
      }
    }
  }

  .chart-list {
    .chart-item {
      padding: 15px;
      box-sizing: border-box;
      background: #fff;
      margin-right: 20px;
      box-shadow: 0 0 6px 0 rgba(225, 226, 229, 0.5);

      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 220px;
      }

      &:last-child {
        margin-right: 0;
      }

      .chart-title {
        font-size: 18px;
        color: #333333;
      }
    }
  }
}

.news-content {
  background: #fff;
  box-shadow: 0 0 6px 0 rgba(225, 226, 229, 0.5);
  border-radius: 2px;
  margin-right: 20px;
  padding-right: 15px;
  /deep/ .oa-tabs {
    .el-tag--mini {
      height: inherit;
      line-height: 12px;
      font-size: 12px;
      padding: 2px 5px !important;
      border-radius: 2px;
    }
    .el-tag--dark.el-tag--warning {
      background: #ff4439;
      border-color: #ff4439;
    }
    .el-tag--dark.el-tag--danger {
      background: #ff8800;
      border-color: #ff8800;
    }
    .el-tag--dark.el-tag--info {
      background: #cbd2e2;
      border-color: #cbd2e2;
    }
    .el-tabs__nav-scroll {
      .el-tabs__item {
        height: 59px;
        line-height: 59px;
      }
    }
    .el-tabs__nav-wrap::after {
      height: 1px;
      background-color: #f5f5f5;
    }
    .el-tabs__header {
      margin: 0;
      .el-tabs__nav-wrap {
        padding: 0 25px;
      }
    }
    .el-table td,
    .el-table th {
      padding: 11px 0;
      border-color: #f5f5f5;
      cursor: pointer;
    }
    .el-table {
      &::before {
        height: 0;
      }
      .icon-cell {
        padding-left: 15px !important;
      }
      .el-table td,
      .el-table th.is-leaf {
        border-color: #f5f5f5;
      }
      .cell {
        .content {
          padding-right: 100px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        * {
          padding: 0;
          margin: 0;
        }
      }
    }
  }
  .pagination-code-wrap {
    padding: 10px 40px 10px 40px;
  }
}
</style>
