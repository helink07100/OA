<template>
  <LayoutPage :title="$t($route.query.title)" :loading="loading">
    <template v-if="Object.keys(detailedData).length">
      <titleColumn
        v-if="detailedData.record.base"
        :style="{ 'margin-bottom': '10px' }"
        :title="detailedData.record.base.form_name"
      >
        <div slot="right">
          <Status class="ib" :detailed="detailedData.record.base" />
          <el-button
            type="primary"
            class="ml-sm btn-pdf"
            round
            size="small "
            @click="downloadPDF"
            >{{ $t('下载') }}</el-button
          >
        </div>
      </titleColumn>

      <Card :title="$t('申请人资讯')">
        <AppliedBy
          :id="detailedData.record_id"
          :data="detailedData.record.base"
        />
      </Card>

      <Card v-if="detailedData.record" :title="$t('申请信息')">
        <Application
          :fields="detailedData.record.fields"
          :tables="tables"
          :table-is-html="tableIsHTML"
          :field-configs="detailedData.field_configs"
        />
      </Card>

      <Card :title="$t('审批流程')">
        <ApprovalBy :detailed-data="detailedData" @loaddetail="getDetail()" />
      </Card>
    </template>
    <tableDownload
      ref="tableRef"
      :pdf-data="pdfData"
      :table-is-html="tableIsHTML"
    ></tableDownload>
  </LayoutPage>
</template>

<script>
import Status from './src/components/detailed/status'
import AppliedBy from './src/components/detailed/applied_by'
import Application from './src/components/detailed/application'
import ApprovalBy from './src/components/detailed/approval_by'
import tableDownload from './src/components/download/table_download'
import titleColumn from '~/components/page/title_column'
import Card from '~/components/page/card'
export default {
  components: {
    titleColumn,
    Status,
    AppliedBy,
    Application,
    ApprovalBy,
    Card,
    tableDownload
  },
  asyncData({ query, store }) {
    return {
      record_id: query.record_id,
      from_record_id: query.from_record_id
    }
  },
  data() {
    return {
      loading: true,
      detailedData: {},
      record_id: '',
      from_record_id: '',
      tables: [],
      tableIsHTML: false,
      pdfData: {
        form_info: {}
      }
    }
  },
  computed: {
    admin_id() {
      return this.$store.state.user.user.uid
    }
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    isJSON(str) {
      if (typeof str === 'string' && str !== '') {
        try {
          JSON.parse(str)
          return true
        } catch (e) {
          return false
        }
      }
    },
    checkHtml(str) {
      const reg = /<[^>]+>/g
      return reg.test(str)
    },
    async getDetail() {
      this.loading = true
      const rs = await this.$api.myflow.recordDetailed({
        record_id: this.record_id
      })
      if (rs) {
        const detailData = {
          record: rs.record,
          filelink: rs.filelink,
          nodes: rs.nodes,
          cc_users: rs.cc_users,
          operator: rs.operator,
          member_id: rs.member_id,
          admin_id: this.admin_id,
          record_id: this.record_id,
          field_configs: rs.field_configs
        }

        for (let i = detailData.record.fields.length - 1; i > -1; i--) {
          if (detailData.record.fields[i].type === 'block') {
            const info =
              detailData.record.fields[i].value &&
              typeof detailData.record.fields[i].value === 'string' &&
              detailData.record.fields[i].value !== ''
                ? JSON.parse(detailData.record.fields[i].value)
                : detailData.record.fields[i].value

            // 兼容旧数据
            if (info.isShow === true) info.isShow = 1

            if (info.isShow) {
              info.formList.forEach((j, idx) => {
                detailData.record.fields.splice(i + idx, idx < 1 ? 1 : 0, j)
              })
            } else {
              detailData.record.fields.splice(i, 1)
            }
          }
        }

        this.detailedData = detailData
        if (rs.record) {
          const fields = rs.record.fields.find((item) => item.type === 'table')
          if (fields && fields.html) {
            // 为了向后做兼容，兼容HTML 与 数据
            if (this.checkHtml(fields.html)) {
              this.tableIsHTML = true
            } else if (this.isJSON(fields.html) && fields.html.length > 2) {
              this.tables = JSON.parse(fields.html)
              this.tableIsHTML = false
            }
          }
        }
      }
      this.loading = false
    },

    // 获取详情数据
    async getPDFData() {
      const result = await this.$api.myflow.myApplyDownload({
        record_id: this.record_id
      })
      if (result.code === this.$enum.__SUCCESS__) {
        result.data.form_info.record.fields.forEach((i, index) => {
          if (i.type === 'block') {
            const info =
              typeof i.value === 'string' && i.value !== ''
                ? JSON.parse(i.value)
                : i.value

            // 兼容旧数据
            if (info.isShow === true) info.isShow = 1
            if (info.isShow) {
              info.formList.forEach((j, idx) => {
                result.data.form_info.record.fields.splice(
                  index + idx,
                  idx < 1 ? 1 : 0,
                  j
                )
              })
            } else {
              result.data.form_info.record.fields.splice(index, 1)
            }
          }
        })

        for (
          let i = result.data.form_info.record.fields.length - 1;
          i > -1;
          i--
        ) {
          if (result.data.form_info.record.fields[i].type === 'block') {
            const info =
              typeof result.data.form_info.record.fields[i].value ===
                'string' && result.data.form_info.record.fields[i].value !== ''
                ? JSON.parse(result.data.form_info.record.fields[i].value)
                : result.data.form_info.record.fields[i].value

            // 兼容旧数据
            if (info.isShow === true) info.isShow = 1

            if (info.isShow) {
              info.formList.forEach((j, idx) => {
                result.data.form_info.record.fields.splice(
                  i + idx,
                  idx < 1 ? 1 : 0,
                  j
                )
              })
            } else {
              result.data.form_info.record.fields.splice(i, 1)
            }
          }
        }
        this.pdfData = result.data
      }
    },

    // 下载pdf
    downloadPDF() {
      this.$utils.download(this.detailedData.filelink)
    }
  }
}
</script>

<style lang="less" scoped>
.btn-pdf {
  min-width: 82px;
  height: 31px;
  padding: 8px 15px !important;
  border-radius: 16px !important;

  span {
    font-size: 14px;
  }
}

/deep/ .detail-control-item {
  padding-bottom: 30px;
  font-size: 14px;
  color: #292929;
  .label {
    padding-right: 20px;
    text-align: right;
    color: rgba(86, 86, 86, 0.85);
  }
}

/deep/ .el-radio-group .el-radio__inner:hover,
/deep/ .el-checkbox-group .el-checkbox__inner:hover {
  border-color: #e0e2e8;
}
</style>
