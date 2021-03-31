<template>
  <LayoutPage :title="$t('事务申请表')">
    <template slot="header-right">
      <nuxt-link
        to="/application_table"
        class="el-button el-button--primary el-button--small"
        >返回表格编辑</nuxt-link
      >
    </template>
    <el-row :gutter="20">
      <el-col :span="24">
        <div class="application_box">
          <div style="max-width:1290px;margin: 0 auto;">
            <div class="header-logo-info">
              <img
                class="logo-info"
                src="~/assets/image/application_table/logo-info.png"
              />
              <i class="line"></i>
            </div>
            <div v-if="tables.title" class="title">
              <el-input
                v-model="tables.title"
                type="textarea"
                :rows="2"
                :autosize="true"
                resize="none"
                readonly
                placeholder="输入你的标题"
                class="textarea"
              >
              </el-input>
            </div>
            <table class="application-table">
              <tbody>
                <template v-for="(item, index) in tables.tableData">
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
                          readonly
                        >
                        </el-input>
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
                          readonly
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
                          readonly
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
                          readonly
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
                            readonly
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
                            readonly
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
                          readonly
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
                          </template>
                        </div>
                        <div class="signature-date">
                          <el-input
                            v-model="item.values[1]"
                            type="textarea"
                            :rows="2"
                            :autosize="true"
                            resize="none"
                            readonly
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
                          readonly
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
                        readonly
                      >
                      </el-input>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
            <br />
            <br />
          </div>
        </div>
      </el-col>
    </el-row>
  </LayoutPage>
</template>
<script>
export default {
  data() {
    return {}
  },
  computed: {
    tables() {
      return this.$store.state.application_table.tables
    }
  },
  methods: {
    isColspan(item, index) {
      const typeCitem = this.tables.tableData.find((m) => m.type === 'C') // type === C
      // typeCitemB 如果它存在，第一列就会再分一列出来，也就是第一列colspan会是2
      const typeCitemB = this.tables.tableData.find(
        (m) => m.isfirstRow !== undefined
      ) // type === C
      if (typeCitem && typeCitemB && typeCitemB.isfirstRow && index === 0) {
        return 2
      } else if (index + 1 >= item.row) {
        return 100
      } else {
        return 0
      }
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
  }
  .signature-date {
    width: 148px;
    text-align: left;
    align-self: flex-end;
  }
}
</style>
