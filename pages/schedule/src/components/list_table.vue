<template>
  <div class="list-item">
    <table class="el-table">
      <template v-for="(schedule, index) in data">
        <thead :key="schedule.weekday + '-' + index" class="sticky">
          <tr>
            <th colspan="6" class="title">{{ schedule.weekday }}</th>
          </tr>
          <tr class="table-list-header">
            <th width="55px">
              <div class="cell"></div>
            </th>
            <th>
              <div class="cell">
                时间
              </div>
            </th>
            <th>
              <div class="cell">
                日程
              </div>
            </th>
            <th>
              <div class="cell">
                备注
              </div>
            </th>
            <th width="180">
              <div class="cell">
                状态
              </div>
            </th>
            <th width="280">
              <div class="cell">
                操作
              </div>
            </th>
          </tr>
        </thead>
        <tbody :key="schedule.weekday + '_' + index">
          <tr
            v-for="(item, subIndex) in schedule.schedule"
            :key="subIndex"
            class="tr-item"
          >
            <td>
              <div class="cell">
                <el-checkbox
                  :value="isSelected(item)"
                  @change="(e) => changeHandle(e, item, schedule)"
                ></el-checkbox>
              </div>
            </td>
            <td>
              <div class="cell">
                {{ item.display_time ? item.display_time : '-' }}
              </div>
            </td>
            <td>
              <div
                class="cell"
                :style="{ cursor: 'pointer' }"
                @click="$emit('option', 'view', item)"
              >
                {{ item.title }}
              </div>
            </td>
            <td>
              <div class="cell">
                {{ item.remark }}
              </div>
            </td>
            <td>
              <p v-if="item.status == 0" class="text-warning">待完成</p>
              <p v-else class="text-success">已完成</p>
            </td>
            <td>
              <template v-if="item.status == 0">
                <el-button
                  class="text-success"
                  type="text"
                  @click="$emit('option', 'sign', item)"
                  >标记为完成</el-button
                >
                <el-button
                  class="text-primary"
                  type="text"
                  @click="$emit('option', 'edit', item)"
                  >修改</el-button
                >
              </template>
              <el-button
                class="text-danger"
                type="text"
                @click="$emit('option', 'del', item)"
                >删除</el-button
              >
            </td>
          </tr>
        </tbody>
      </template>
      <template v-if="!Object.keys(data).length">
        <Empty msg="暂无日程" class="height-auto" />
      </template>
    </table>
  </div>
</template>

<script>
import Empty from '@/components/page/empty'
export default {
  components: {
    Empty
  },
  props: {
    value: {
      type: [Object, Array],
      default: () => {}
    },
    data: {
      type: [Object, Array],
      default: () => {}
    }
  },
  computed: {
    isSelected() {
      return (row) => {
        return this.value.includes(row)
      }
    }
  },
  methods: {
    /**
     * isChecked: 是否选中，
     * parent: 父节点
     * item: 当前选中的项目
     */
    changeHandle(isChecked, item, parent) {
      const idx = this.value.indexOf(item)
      const tmpArr = []
      this.value.forEach((tmp) => tmpArr.push(tmp))
      if (isChecked) {
        idx === -1 && tmpArr.push(item)
      } else {
        idx !== -1 && tmpArr.splice(idx, 1)
      }
      this.$emit('input', tmpArr)
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  padding: 10px 20px;
  font-weight: 700;
  color: #333;
  background-color: #fff;
  font-size: 14px;
}
.list-item {
  height: 100%;
}
.el-table {
  height: 100%;
  overflow: auto;
}
.sticky th {
  position: sticky;
  top: 0;
  z-index: 10;
}

.table-list-header {
  th {
    top: 41px;
    background-color: rgba(244, 246, 249, 1) !important;
  }
}
</style>
