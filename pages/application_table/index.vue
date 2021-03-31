<template>
  <LayoutPage :title="$t('事务申请表')">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="application_box">
          <div class="header-logo-info">
            <img
              class="logo-info"
              src="~/assets/image/application_table/logo-info.png"
            />
            <i class="line"></i>
          </div>
          <div class="title">
            <el-input
              v-model="title"
              type="textarea"
              :rows="2"
              :autosize="true"
              resize="none"
              placeholder="输入你的标题"
              class="textarea"
            >
            </el-input>
          </div>
          <table class="application-table">
            <tbody>
              <template v-for="(item, index) in tableData">
                <!-- 模板 A 普通表格 -->
                <tr v-if="item.type == 'A'" :key="index">
                  <template v-for="(k, i) in item.row">
                    <td :key="i" :colspan="isColspan(item, i)">
                      <el-input
                        v-model="item.values[i]"
                        type="textarea"
                        :rows="2"
                        :autosize="true"
                        resize="none"
                      >
                      </el-input>
                      <i
                        v-if="i == item.row - 1"
                        class="iconfont icon-tuozhuai"
                      ></i>
                    </td>
                  </template>
                </tr>

                <!-- 模板 B 标题栏 -->
                <tr v-else-if="item.type == 'B'" :key="index">
                  <td class="title-column" :colspan="100">
                    <div
                      :style="{
                        'font-size': item.fontSize,
                        'font-weight': item.fontWeight,
                        'text-align': item.textAlign
                      }"
                    >
                      <el-input
                        v-model="item.values[0]"
                        type="textarea"
                        :rows="2"
                        :autosize="true"
                        resize="none"
                      >
                      </el-input>
                    </div>
                  </td>
                </tr>

                <!-- 模板 C -->
                <template v-else-if="item.type == 'C'">
                  <tr :key="index">
                    <td
                      v-for="(k, i) in item.row"
                      :key="i"
                      :rowspan="i == 0 ? item.rowspan : false"
                      :width="i === 0 ? '15%' : null"
                    >
                      <el-input
                        v-model="item.values[i]"
                        type="textarea"
                        :rows="2"
                        :autosize="true"
                        resize="none"
                      >
                      </el-input>
                    </td>
                  </tr>
                </template>

                <!-- 模板 D 文本 -->
                <tr
                  v-else-if="item.type == 'D'"
                  :key="index"
                  class="template-audit-column"
                >
                  <td :colspan="isColspan(item, 0)">
                    <div>
                      <el-input
                        v-model="item.values[0]"
                        type="textarea"
                        :rows="2"
                        :autosize="true"
                        resize="none"
                      />
                    </div>
                  </td>
                  <td colspan="4">
                    <div class="content">
                      <div class="text">
                        <el-input
                          v-model="item.values[1]"
                          type="textarea"
                          :rows="2"
                          :autosize="true"
                          resize="none"
                        >
                        </el-input>
                      </div>
                      <div class="signature-date">
                        <el-input
                          v-model="item.values[2]"
                          type="textarea"
                          :rows="2"
                          :autosize="true"
                          resize="none"
                          placeholder="签章 日期"
                        >
                        </el-input>
                      </div>
                    </div>
                  </td>
                </tr>

                <!-- 模板 E checkbox 选项 -->
                <tr
                  v-else-if="item.type == 'E'"
                  :key="index"
                  class="template-audit-column"
                >
                  <td :colspan="isColspan(item, 0)">
                    <div>
                      <el-input
                        v-model="item.values[0]"
                        type="textarea"
                        :rows="2"
                        :autosize="true"
                        resize="none"
                      >
                      </el-input>
                    </div>
                  </td>
                  <td colspan="100">
                    <div class="content">
                      <div class="checkbox">
                        <template v-if="item.options.length">
                          <el-checkbox
                            v-for="(c, ci) in item.options"
                            :key="ci"
                            :label="c"
                          ></el-checkbox>
                          <label
                            class="text-primary cp"
                            @click="editCheckbox(index)"
                          >
                            <i class="iconfont icon-xiugai"></i>
                            修改
                          </label>
                        </template>
                      </div>
                      <div class="signature-date">
                        <el-input
                          v-model="item.values[1]"
                          type="textarea"
                          :rows="2"
                          :autosize="true"
                          resize="none"
                          placeholder="签章 日期"
                        >
                        </el-input>
                      </div>
                    </div>
                  </td>
                </tr>

                <!-- 模板 F checkbox 选项 -->
                <tr
                  v-else-if="item.type == 'F'"
                  :key="index"
                  class="template-audit-column"
                >
                  <td :colspan="isColspan(item, 0)">
                    <div>
                      <el-input
                        v-model="item.values[0]"
                        type="textarea"
                        :rows="2"
                        :autosize="true"
                        resize="none"
                      >
                      </el-input>
                    </div>
                  </td>
                  <td colspan="100">
                    <div class="t-a-l">
                      <div class="checkbox">
                        <template v-if="item.options.length">
                          <el-checkbox
                            v-for="(c, ci) in item.options"
                            :key="ci"
                            :label="c"
                          ></el-checkbox>
                          <label
                            class="text-primary cp"
                            @click="editCheckbox(index)"
                          >
                            <i class="iconfont icon-xiugai"></i>
                            修改
                          </label>
                        </template>
                      </div>
                    </div>
                  </td>
                </tr>

                <!-- 模板 G -->
                <tr v-else-if="item.type == 'G'" :key="index">
                  <td
                    v-for="(k, i) in item.row"
                    :key="i"
                    :rowspan="i == 0 ? item.rowspan : false"
                    :colspan="i == 0 && item.rowspan >= 2 ? 2 : null"
                  >
                    <el-input
                      v-model="item.values[i]"
                      type="textarea"
                      :rows="2"
                      :autosize="true"
                      resize="none"
                    >
                    </el-input>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <br />
          <br />
          <div>
            <el-button @click="empty">清 空</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button type="primary" @click="tableView">预 览</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <addTable @add="add" />
      </el-col>
    </el-row>
    <oaDialog
      :dialog-visible="isAddControlForm"
      title="新增"
      width="500px"
      @close="isAddControlForm = false"
    >
      <component
        :is="componentName"
        :is-open="isAddControlForm"
        :index="editIndex"
        :type="type"
        :options="editItem.options"
        @close="isAddControlForm = false"
        @define="defineHandle"
      />
    </oaDialog>
  </LayoutPage>
</template>
<script>
import addTable from './components/add_table'
import A from './components/table/a'
import B from './components/table/b'
import C from './components/table/c'
import D from './components/table/d'
import E from './components/table/e'
import oaDialog from '~/components/oa_dialog'
export default {
  components: {
    addTable,
    oaDialog,
    A,
    B,
    C,
    D,
    E
  },
  data() {
    return {
      dragOptions: {
        animation: 500,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
        draggable: '.icon-tuozhuai'
      },
      componentName: 'A',
      isAddControlForm: false,
      maxRow: 0,
      editItem: {},
      editIndex: '',
      type: '',
      // tableData: [] // {} 内字段请看 /pages/application_table/components/table 里的组件
      title: '',
      tableData: [
        {
          type: 'A',
          row: 4,
          rowspan: 0,
          colspan: 0,
          values: ['', '', '', ''],
          sort: '',
          tr: 1
        },
        {
          type: 'B',
          row: 4,
          rowspan: 0,
          colspan: 4,
          values: [''],
          sort: '',
          tr: 1
        },
        {
          type: 'C',
          row: 5,
          rowspan: 2,
          colspan: 0,
          values: ['', '', '', '', ''],
          sort: '',
          tr: 1
        },
        {
          type: 'C',
          row: 4,
          rowspan: -1,
          colspan: 0,
          isfirstRow: true,
          values: ['', '', '', '', ''],
          sort: '',
          tr: 1
        },
        {
          type: 'E',
          row: 2,
          rowspan: 0,
          colspan: 4,
          values: ['', ''],
          options: ['1234', 'trfeds', '23456'],
          sort: '',
          tr: 1
        },
        {
          type: 'D',
          row: 2,
          rowspan: 0,
          colspan: 4,
          values: ['', ''],
          sort: '',
          tr: 1
        },
        {
          type: 'F',
          row: 2,
          rowspan: 0,
          colspan: 4,
          values: ['', ''],
          options: ['234', '435', '67'],
          sort: '',
          tr: 1
        },
        {
          type: 'F',
          row: 2,
          rowspan: 0,
          colspan: 4,
          values: ['', ''],
          options: [''],
          sort: '',
          tr: 1
        },
        {
          type: 'G',
          row: 4,
          rowspan: 2,
          colspan: 0,
          values: ['', '', '', ''],
          sort: '',
          tr: 1
        },
        {
          type: 'G',
          row: 3,
          rowspan: -1,
          colspan: 0,
          values: ['', '', '', ''],
          sort: '',
          tr: 1
        }
      ]
    }
  },
  methods: {
    isColspan(item, index) {
      const typeCitem = this.tableData.find((m) => m.type === 'C') // type === C
      // typeCitemB 如果它存在，第一列就会再分一列出来，也就是第一列colspan会是2
      const typeCitemB = this.tableData.find((m) => m.isfirstRow !== undefined) // type === C
      if (typeCitem && typeCitemB && typeCitemB.isfirstRow && index === 0) {
        return 2
      } else if (index + 1 >= item.row) {
        return 100
      } else {
        return 0
      }
    },
    empty() {
      this.tableData = []
    },
    add(type) {
      this.editItem = {}
      this.editIndex = ''
      this.type = type
      if (type === 'F') {
        this.componentName = 'E'
      } else if (type === 'G') {
        this.componentName = 'C'
      } else {
        this.componentName = type
      }
      this.isAddControlForm = true
    },
    editCheckbox(i) {
      const item = this.tableData[i]
      this.type = item.type
      this.editIndex = i
      this.editItem = JSON.parse(JSON.stringify(item))
      if (item.type === 'F') {
        this.componentName = 'E'
      } else {
        this.componentName = item.type
      }
      this.isAddControlForm = true
    },
    getRowMaxNumber(arr) {
      // 获取数组中最长的列数
      const rows = []
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        rows.push(item.row)
      }
      return this.$utils.common.get_array_number_max(rows)
    },
    defineHandle(item, isEdit, editIndex) {
      // this.type = String(new Date())
      item.row = Number(item.row)
      item.colspan = Number(item.colspan)
      item.fontSize = ''
      item.fontWeight = ''
      item.textAlign = ''
      this.isAddControlForm = false
      if (isEdit && editIndex) {
        this.tableData[editIndex] = item
      } else {
        for (let i = 0; i < item.tr; i++) {
          this.tableData.push(JSON.parse(JSON.stringify(item)))
        }
        if (item.type === 'C' || item.type === 'G') {
          for (let i = 1; i < item.rowspan; i++) {
            const newItem = JSON.parse(JSON.stringify(item))
            newItem.rowspan = -1
            newItem.row = Number(newItem.row) - 1
            this.tableData.push(JSON.parse(JSON.stringify(newItem)))
          }
        }
      }
    },
    tableView() {
      this.$store.commit('application_table/changeTables', {
        tableData: this.tableData,
        title: this.title
      })
      this.$router.push('/application_table/table_view')
    },
    submitForm() {
      // 提交HTML给后端
    }
  }
}
</script>
<style lang="less" scoped>
.application_box {
  font-size: 13px;
  .t-a-l {
    text-align: left;
  }
  padding: 30px;
  width: 100%;
  background: #fff;
  .title {
    font-size: 16px;
    text-align: center;
    padding: 15px 0;
    .textarea {
      /deep/ .el-textarea__inner {
        text-align: center;
        border: none;
      }
    }
  }
  td:hover {
    .icon-tuozhuai {
      display: block;
    }
  }
  .icon-tuozhuai {
    position: absolute;
    right: 0px;
    top: 0px;
    font-size: 14px;
    color: #ddd;
    cursor: all-scroll;
    display: none;
  }
  .header-logo-info {
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    .logo-info {
      width: 269px;
      height: auto;
      margin-right: 20px;
    }
    .line {
      width: 100%;
      height: 2px;
      background: #b8853c;
      position: relative;
      top: 15px;
    }
  }
  .application-table {
    width: 100%;
    /deep/ .el-textarea {
      textarea {
        border: none;
      }
    }
    td {
      border: solid 1px #807f7f;
      text-align: center;
      padding: 10px;
      position: relative;
      /deep/ .el-textarea__inner {
        text-align: center;
      }
    }
    .title-column {
      background: #d0cfce;
      /deep/ .el-textarea {
        textarea {
          background: #d0cfce;
        }
      }
    }
  }
}
.template-audit-column {
  .content {
    display: flex;
    align-items: center;
    min-height: 100px;
    .text {
      flex: 1;
      padding-right: 15px;
      text-align: left;
    }
    .checkbox {
      flex: 1;
      padding-right: 15px;
      text-align: left;
      align-self: baseline;
    }
    /deep/ .el-textarea__inner {
      text-align: left !important;
    }
  }
  .signature-date {
    width: 148px;
    text-align: left;
    align-self: flex-end;
  }
}
</style>
