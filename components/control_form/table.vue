<!-- 数据表格 table -->
<template>
  <el-form-item
    class="control-form-flex"
    :label="labelComputed"
    :prop="propComputed()[0]"
    :required="items.verify"
    :rules="
      items.verify
        ? [
            {
              validator: (rule, value, callback) => {
                let isVerify = false
                if (value) {
                  value.forEach((i, index) => {
                    if (index > 0) {
                      i.rows.forEach((j) => {
                        if (j.value) isVerify = true
                      })
                    }
                  })
                }

                if (!isVerify) {
                  callback(
                    items.name +
                      (items.en_name ? ' / ' + items.en_name : '') +
                      '必填项'
                  )
                } else {
                  callback()
                }
              }
            }
          ]
        : []
    "
  >
    <div class="detail-control-item p-b-none">
      <oaTable
        ref="oatable"
        :options="tableData"
        :edit-disabled="tableDisabled"
        @change="change"
      />
    </div>
    <slot></slot>
  </el-form-item>
</template>
<script>
import oaTable from './oa_table'
import controlForm from '@/mixins/control_form'
export default {
  components: {
    oaTable
  },
  mixins: [controlForm],
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    index: {
      type: Number,
      default: -1
    },
    tableDisabled: {
      default: true,
      type: Boolean
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
    return {
      tableData: (() => {
        return this.initTableData(this.items.options, this.items.row)
      })()
    }
  },
  watch: {
    items(nv) {
      this.tableData = JSON.parse(
        JSON.stringify(this.initTableData(nv.options, nv.row))
      )
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
    initTableData(arrs, tableRow) {
      const options = arrs
      // 默认 10列
      const row = tableRow || 10
      // 列
      const newTable = []
      for (let j = 0; j < row; j++) {
        const rows = []
        const num = options.length
        for (let k = 0; k < num; k++) {
          if (j !== 0) {
            rows.push({ value: '', readonly: false })
          } else if (j === 0) {
            rows.push({ value: options[k], readonly: false })
          } else {
            rows.push({ value: '', readonly: false })
          }
        }
        newTable.push({
          rows
        })
      }
      return newTable
    },
    change($event) {
      this.items.value = $event
      this.$emit('input', $event)
    }
  }
}
</script>
