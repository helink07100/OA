<!-- 部门-岗位 station-->
<template>
  <el-form-item
    :label="labelComputed"
    class="control-form-flex"
    :required="items.verify"
  >
    <el-form-item
      :prop="propComputed()[0]"
      :rules="
        items.verify
          ? [
              {
                required: true,
                message:
                  items.name +
                  (items.en_name ? ' / ' + items.en_name : '') +
                  '必选项',
                trigger: 'change'
              }
            ]
          : []
      "
    >
      <el-select
        v-model="items.value"
        :style="{ width: '100%' }"
        :name="'department_control_' + items.sortid"
        :placeholder="items.placeholder"
        @change="departmentChange"
      >
        <el-option
          v-for="(d, index) in departmentData"
          :key="d.id + '-' + index"
          :label="d.name_txt"
          :value="d.name_txt"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      label-width="10px"
      :prop="propComputed()[1]"
      :rules="
        items.verify
          ? [
              {
                required: true,
                message:
                  items.name +
                  (items.en_name ? ' / ' + items.en_name : '') +
                  '必选项',
                trigger: 'change'
              }
            ]
          : []
      "
    >
      <el-select
        v-model="items.station_value"
        :style="{ width: '100%' }"
        :name="'control_' + items.sortid"
        :placeholder="items.placeholder2"
        @change="stationChange"
      >
        <el-option
          v-for="(d, index) in stations"
          :key="d.id + '-' + index"
          :label="d.name"
          :value="d.name"
        ></el-option>
      </el-select>
    </el-form-item>
    <slot></slot>
  </el-form-item>
</template>

<script>
import controlForm from '@/mixins/control_form'
export default {
  mixins: [controlForm],
  props: {
    index: {
      type: Number,
      default: -1
    },
    departmentData: {
      type: Array,
      default: () => []
    },
    stationData: {
      type: Array,
      default: () => []
    },
    blockSortid: {
      type: [Number, String],
      default: -1
    },
    blockIndex: {
      type: [Number, String],
      default: -1
    }
  },
  data() {
    const arrs = this.stationData
    return {
      stations: arrs
    }
  },
  methods: {
    propComputed() {
      if (this.blockIndex) {
        return [
          'controlList.' +
            this.blockIndex +
            '.formList.' +
            this.index +
            '.value'
        ]
      } else {
        return ['controlList.' + this.index + '.value']
      }
    },
    async getStationsDate(id) {
      // 获取岗位
      const rs = await this.$api.myflow.myreviewGetStations({
        department_id: id
      })
      if (rs) {
        this.stations = rs.data
      }
    },
    stationChange(value) {
      const stationItem = this.stations.find((item) => item.id === value)

      this.$emit('change', {
        type: 'station',
        item: stationItem
      })
    },
    departmentChange(value) {
      const departmentItem = this.departmentData.find(
        (item) => item.name_txt === value
      )
      this.getStationsDate(departmentItem.id)
      this.items.department_name = departmentItem.name_txt
      this.$emit('change', {
        type: 'department',
        item: departmentItem
      })
    }
  }
}
</script>
