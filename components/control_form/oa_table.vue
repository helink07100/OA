<template>
  <div v-loading="loading" class="oa-table">
    <div class="table-utils-column">
      <el-popover
        v-if="!editDisabled"
        ref="popover"
        title="插入表格"
        placement="right-start"
        width="200"
        trigger="hover"
      >
        <div class="add-column">
          <br />
          <label>创建</label>
          <span><input v-model="line" type="number"/></span>
          <label>行</label><br /><br />
          <label>创建</label>
          <span><input v-model="column" type="number"/></span>
          <label>列</label><br /><br />
          <el-button
            type="primary"
            size="mini"
            @click="insertTable(line, column)"
          >
            插入
          </el-button>
        </div>
        <i slot="reference" class="iconfont icon-biaoge"></i>
      </el-popover>
      <i v-else class="iconfont icon-biaoge"></i>
    </div>
    <div class="table-wrap">
      <table ref="oaTable" class="oa-from-table">
        <tbody>
          <tr v-for="(item, index) in tables" :key="index">
            <template v-for="(td, tdIndex) in item.rows">
              <td :key="tdIndex">
                <template v-if="index == 0">
                  <el-popconfirm
                    v-if="!editDisabled"
                    title="删除列？"
                    confirm-button-text="删除"
                    @onConfirm="delRows(index, tdIndex)"
                  >
                    <i
                      slot="reference"
                      class="iconfont del-row-icon icon-more"
                    ></i>
                  </el-popconfirm>
                </template>
                <template v-else-if="tdIndex == 0">
                  <el-popconfirm
                    v-if="!editDisabled"
                    title="删除行？"
                    confirm-button-text="删除"
                    @onConfirm="delLine(index)"
                  >
                    <i
                      slot="reference"
                      class="iconfont del-line-icon icon-more"
                    ></i>
                  </el-popconfirm>
                </template>
                <!-- <textarea class="oa-textarea"></textarea> -->
                <el-input
                  v-model="td.value"
                  type="textarea"
                  class="oa-textarea"
                  autosize
                  resize="none"
                  :readonly="td.readonly"
                  :disabled="editDisabled"
                  maxlength="50"
                  @input="change_value"
                />
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    editDisabled: Boolean,
    options: {
      type: [Array, Object],
      default: () => []
      // {
      //   return [
      //     {
      //       rows: [
      //         { value: 'A', readonly: false },
      //         { value: 'B', readonly: false },
      //         { value: 'C', readonly: false }
      //       ]
      //     },
      //     {
      //       rows: [
      //         { value: 'A234', readonly: false },
      //         { value: 'B34', readonly: false },
      //         { value: 'C34ew', readonly: false }
      //       ]
      //     }
      //   ]
      // }
    }
  },
  data() {
    return {
      tables: (() => {
        return this.options
      })(),
      line: 0,
      column: 0,
      loading: false
    }
  },
  watch: {
    options(nvs) {
      this.tables = JSON.parse(JSON.stringify(nvs))
    }
  },
  methods: {
    createTable() {},
    insertTable(line, column) {
      if (line <= 0 || column <= 0) {
        this.$message.error('行或列不能小于1')
        return false
      }
      this.loading = true
      const newTable = []
      // 列
      for (let j = 0; j < line; j++) {
        const rows = []

        let num = column
        while (num--) {
          if (j !== 0) {
            rows.push({ value: '', readonly: false })
          } else {
            rows.push({ value: '', readonly: false })
          }
        }
        newTable.push({
          rows
        })
      }
      this.tables = this.tables.concat(newTable)
      this.$nextTick(() => {
        this.$refs.popover.doClose()
        this.loading = false
      })
    },
    delRows(rowIndex) {
      this.tables.forEach((item) => {
        item.rows.forEach((rows, i) => {
          if (i === rowIndex) {
            item.rows.splice(rowIndex, 1)
          }
        })
      })
    },
    delLine(index) {
      this.tables.splice(index, 1)
    },
    change_value() {
      this.$emit('change', this.tables)
    }
  }
}
</script>
<style lang="less" scoped>
.add-column {
  label {
    color: #999;
    text-align: left;
  }
  input {
    width: 100px;
    height: 15px;
    border: none;
    border-bottom: solid 1px #ebeef5;
    position: relative;
    top: -3px;
    padding: 0 0 0 10px;
  }
}

.oa-table {
  border: 1px solid #ebeef5;
  .table-utils-column {
    background: #ebeef5;
    padding: 0 10px;
    .iconfont {
      cursor: pointer;
    }
  }
  /deep/ .el-textarea__inner {
    border: none;
    text-align: center;
  }
  .table-wrap {
    padding: 30px;
    border-radius: 3px;
    .oa-from-table {
      width: 100%;
      border-spacing: 0;
      border-collapse: collapse;
      border-color: #ebeef5;
      td {
        border: 1px solid #ebeef5;
        border-color: #ebeef5;
        position: relative;
        line-height: initial;
        .del-row-icon,
        .del-line-icon {
          font-size: 18px;
          cursor: pointer;
          color: #c0c4cc;
          position: absolute;
          top: 3px;
          z-index: 2;
        }
        .del-row-icon {
          right: 0;
        }
        .del-line-icon {
          left: 0;
        }
      }
    }
  }
}
</style>
