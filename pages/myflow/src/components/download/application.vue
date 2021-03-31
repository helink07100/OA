<template>
  <section class="ui-download-application">
    <div v-for="(item, index) in data" :key="index" class="section-item">
      <div v-if="index === 0" class="line">申请信息 Application</div>
      <!-- 分割线 -->
      <div v-if="item.type === 'line'" class="line">{{ item.name }}</div>
      <!-- 其他 -->
      <div v-else class="flex">
        <div class="f1">
          <div class="tr-title">{{ item.name }}</div>
          <div class="tr-title">{{ item.en_name }}</div>
        </div>
        <!-- 数据表格 -->
        <div v-if="item.type === 'table'" class="f3 fs-sixteen">
          <div class="oa-table-wrap">
            <table v-if="!tableIsHtml">
              <tbody>
                <tr
                  v-for="(tr_item, idx) in typeof item.html === 'string'
                    ? JSON.parse(item.html)
                    : item.html"
                  :key="idx"
                >
                  <td v-for="(td_item, tdIdx) in tr_item.rows" :key="tdIdx">
                    {{ td_item.value }}
                  </td>
                </tr>
              </tbody>
            </table>
            <div v-else v-html="item.html"></div>
          </div>
        </div>

        <!-- 图片 -->
        <div v-else-if="item.type === 'images'" class="f3 fs-sixteen">
          <img
            v-for="(img, index) in item.value"
            :key="index"
            class="images"
            :src="upload_url + img.value"
            alt=""
          />
        </div>

        <div v-else-if="item.type === 'addon'" class="f3 fs-sixteen">
          <label v-for="fileUrl in item.value" :key="fileUrl">
            <i class="iconfont icon-fujian1 fs-eighteen text-primary"></i>
            <a class="text-primary" download target="_blank" href="javascript:;"
              >附件</a
            >
            <ul v-if="item.value && item.value.length">
              <li v-for="i in item.value" :key="i">
                {{ i.replace(/file\/.*\/(.*)/, '$1') }}
              </li>
            </ul>
          </label>
        </div>
        <div v-else-if="item.type !== 'tips'" class="f3 fs-sixteen">
          {{ item.value }}
        </div>
        <!-- 表格 -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    tableIsHtml: {
      type: Boolean,
      default: false
    },
    data: {
      default: () => [],
      type: Array
    }
  },
  computed: {
    upload_url() {
      return this.$config.client.api
    }
  },
  methods: {
    downloadUrl(url) {
      return this.$config.client.api + '/?ct=upload&ac=download&file=' + url
    }
  }
}
</script>
<style lang="less" scoped>
.images {
  width: 80px;
  height: 80px;
  border-radius: 5px;
}
.border-bottom {
  margin-bottom: 10px;
  text-align: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #e3e8f4;
}
.text-primary {
  color: #333 !important;
}
.oa-table-wrap {
  margin: 20px 30px;

  /deep/ table {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    border-spacing: 0;
    th,
    td {
      border: 1px solid #ddd;
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
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
