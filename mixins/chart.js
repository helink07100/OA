// loading 样式
import 'v-charts/lib/style.css'
export default {
  data() {
    return {
      histogramColors: ['#FF8800', '#6DD230', '#CED4DC'],

      lineColor: ['#FAD961'],

      barColor: ['#1BD77E'],

      // 折线图 extend
      lineExtend: {
        legend: {
          show: false
        },
        grid: {
          right: 20,
          left: 20,
          bottom: 20,
          top: 80
        },
        yAxis: {
          axisLabel: { color: '#6C6C6C' }
        },
        xAxis: {
          axisLabel: { color: '#292929' }
        }
      },

      // 折线图 setting
      lineSetting: {
        area: true
      },

      barSetting: {
        // axisVisible: false
      },

      barExtend: {
        legend: {
          show: false
        },
        yAxis: {
          axisLabel: {
            formatter: (label, value) => {
              let barIndex = 0
              JSON.parse(JSON.stringify(this.initData.formCountChart.rows))
                .reverse()
                .forEach((i, index) => {
                  if (i.label === label) {
                    barIndex = index
                  }
                })
              const name = `排名${barIndex + 1}`
              return name
            },
            color: '#6C6C6C'
          }
        },
        xAxis: {
          axisLabel: { color: '#292929' }
        },
        grid: {
          right: 20,
          left: 30,
          bottom: 20,
          top: 80
        },
        series(v) {
          // 设置柱子的样式
          v.forEach((i) => {
            i.barWidth = 10
            i.itemStyle = {
              barBorderRadius: [0, 10, 10, 0],
              color: '#1BD77E',
              borderWidth: 0
            }
          })
          return v
        }
      },

      // 柱状图
      histogramExtend: {
        barWidth: '10px',
        yAxis: {
          axisLabel: { color: '#6C6C6C' }
        },
        xAxis: {
          axisLabel: { color: '#292929' }
        },
        legend: {
          icon: 'circle',
          show: true,
          itemHeight: 12,
          left: 30,
          top: 30
        },
        grid: { top: 100, right: 30, left: 30, bottom: 30 },
        series(v) {
          // 设置柱子的样式
          v.forEach((i) => {
            i.barWidth = 10
            i.itemStyle = {
              barBorderRadius: [10, 10, 0, 0],
              borderWidth: 0
            }
          })
          return v
        }
      }
    }
  }
}
