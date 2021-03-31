<template>
  <div>
    <el-row class="content">
      <template v-for="(item, index) in fields">
        <el-col :key="index" class="detail-control-item" :span="24">
          <template v-if="item.type == 'tips'">
            <el-col :span="14" :offset="6" class="static">
              <i class="iconfont icon-Group"></i>
              <label>{{ $lang(item) }}</label>
            </el-col>
          </template>
          <template v-else-if="item.type === 'line'">
            <el-col :span="20" :offset="4" class="static border-bottom">
              <label class="inline">
                <span>{{ $lang(item) }}</span></label
              >
            </el-col>
          </template>
          <template v-else>
            <el-col :span="5" class="label">
              <div v-if="item.type === 'date_range' && item.name_end">
                &nbsp;
              </div>
              <div v-else>{{ $lang(item) }}：</div>
            </el-col>
            <el-col v-if="item.type === 'images'" :span="19" class="static">
              <div
                v-if="Array.isArray(item.value)"
                class="detail-control-images"
              >
                <el-image
                  v-for="imgUrl in item.value"
                  :key="imgUrl"
                  class="images"
                  :src="imgUrl.filelink"
                  :preview-src-list="[imgUrl.filelink]"
                />
              </div>
              <el-image
                v-else
                :key="item.value"
                class="images"
                :src="item.value ? splicingFileSrc(item.value) : ''"
                :preview-src-list="srcs([item.value])"
                ><div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i></div
              ></el-image>
            </el-col>
            <el-col
              v-else-if="item.type === 'multi_select'"
              :span="19"
              class="static"
            >
              <div v-if="isShowSelect(item)">
                <el-checkbox-group
                  :value="
                    typeof item.value === 'string'
                      ? item.value.split('/')
                      : item.value
                  "
                >
                  <el-checkbox
                    v-for="(sitem, sindex) in item.options"
                    :key="sindex"
                    :label="
                      sitem.value
                        ? sitem.value + ''
                        : sitem.label
                        ? sitem.label
                        : sitem
                    "
                    >{{ sitem.label ? sitem.label : sitem }}</el-checkbox
                  >
                </el-checkbox-group>
              </div>
            </el-col>
            <el-col
              v-else-if="item.type === 'select'"
              :span="19"
              class="static"
            >
              <div v-if="isShowSelect(item)">
                <el-radio-group :value="item.value" :style="{ width: '100%' }">
                  <el-radio
                    v-for="(sitem, sindex) in item.options"
                    :key="sindex"
                    :label="
                      sitem.value
                        ? sitem.value + ''
                        : sitem.label
                        ? sitem.label
                        : sitem
                    "
                    >{{ sitem.label ? sitem.label : sitem }}</el-radio
                  >
                </el-radio-group>
              </div>
            </el-col>
            <el-col v-else-if="item.type === 'addon'" :span="19" class="static">
              <Upload
                v-if="!item.value"
                ref="oa-upload-a"
                :label="$t('上传附件')"
                type="label"
                :disabled="true"
                :style="{ display: 'inline-block' }"
                :value="item.value"
              >
              </Upload>
              <uiFile :file="item.value" :no-border="true"></uiFile>
            </el-col>
            <el-col
              v-else-if="item.type === 'date_range'"
              :span="19"
              class="static"
            >
              <el-row>
                <el-col v-if="item.name_end" :span="12">{{
                  item.name +
                    ' ' +
                    item.value +
                    ' ' +
                    item.name_end +
                    ' ' +
                    item.to_value
                }}</el-col>
                <el-col v-else :span="12">{{ item.value }}</el-col>
              </el-row>
            </el-col>
            <el-col v-else-if="item.type === 'table'" :span="19" class="static">
              <div class="oa-table-wrap">
                <table v-if="item.value && item.value.length">
                  <tbody>
                    <tr v-for="(tr_item, idx) in item.value" :key="idx">
                      <td v-for="(td_item, tdIdx) in tr_item.rows" :key="tdIdx">
                        {{ td_item.value }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <table v-else-if="item.html">
                  <tbody>
                    <tr
                      v-for="(tr_item, idx) in JSON.parse(item.html)"
                      :key="idx"
                    >
                      <td v-for="(td_item, tdIdx) in tr_item.rows" :key="tdIdx">
                        {{ td_item.value }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </el-col>
            <el-col
              v-else-if="item.type === 'station'"
              :span="19"
              class="static"
            >
              <div>
                {{ item.station_name ? item.station_name : item.value }}
              </div>
            </el-col>
            <el-col
              v-else-if="item.type === 'deperment'"
              :span="19"
              class="static"
            >
              <div>{{ item.deperment ? item.deperment : item.value }}</div>
            </el-col>
            <el-col v-else-if="item.type === 'money'" :span="19" class="static">
              <div>
                {{
                  item.value +
                    ' ' +
                    (item.select_value ? item.select_value : '')
                }}
              </div>
            </el-col>
            <el-col v-else-if="item.type !== 'block'" :span="19" class="static">
              <div style="white-space: pre-wrap">{{ item.value }}</div>
            </el-col>
          </template>
        </el-col>
      </template>
    </el-row>
  </div>
</template>

<script>
import Upload from '~/components/upload'
import uiFile from '~/components/file/index'

export default {
  name: 'AppList',
  components: { Upload, uiFile },
  props: {
    fieldConfigs: {
      type: Object
    },
    fields: {
      type: Object,
      default: () => {}
    },
    tables: {
      type: Array,
      default: () => {}
    },
    tableIsHtml: {
      type: Boolean,
      default: false
    },
    // id === record_id
    id: {
      type: [String],
      default: ''
    }
  },
  computed: {
    upload_url() {
      return this.$store.state.user.user.upload_url
    }
  },
  methods: {
    splicingFileSrc(url) {
      return this.upload_url + url
    },
    srcs(urls) {
      const newUrls = []
      for (let i = 0; i < urls.length; i++) {
        newUrls.push(this.upload_url + urls[i])
      }
      return newUrls
    },

    // 吐槽下： 为了兼容以前的数据，写出来神仙代码
    selectList(item) {
      // 隐藏区域跳过
      if (item.options) return item.options

      const type = item.type
      let idx = 0
      let end = false

      // 找到再原始表单中的位置（类型相同的情况）
      this.fields.forEach((i, index) => {
        if (end) return

        if (item.value === i.value) {
          end = true
          return
        }

        if (i.type === type) {
          idx += 1
        }
      })
      return this.fieldConfigs[type][idx]
    },
    isShowSelect(item) {
      // 隐藏区域的多选
      if (!item.options && typeof item === 'string' && !item.match('/')) {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../../../assets/less/page/form.less';
.ui-file.no-border {
  display: block;
}

.images {
  width: 80px;
  height: 80px;
  border-radius: 5px;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: #909399;
}

.text-default:hover {
  color: @color-primary;
}

/deep/.upload-button-icon-text {
  padding-top: 0;
}

.oa-table-wrap {
  /deep/ table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    border-spacing: 0;
    th,
    td {
      border: 1px solid #f3f4f4;
      min-height: 40px;
      font-size: 14px;
    }
    th {
      background: rgba(244, 246, 249, 0.5);
      padding: 10px 10px;
    }
    td {
      padding: 15px 10px;
      min-height: 30px;
      word-break: break-all;
      word-wrap: break-word;
      border-right: 1px solid #f3f4f4;
      border-bottom: 1px solid #f3f4f4;
    }
  }
}

.detail-control-images {
  .images {
    display: inline-flex;
    margin-right: 15px;
    margin-bottom: 15px;
  }
}
</style>
