<template>
  <div class="ui-form-view">
    <el-dialog
      class="form-view-dialog"
      :visible="dialogVisible"
      width="1000"
      @close="$emit('hideDialog')"
      :title="dialogTitle"
    >
      <div class="dialog-title cf">
        {{ form_id ? viewInfo.form_name : title }}
        <div v-if="form_id" class="btns">
          <el-button type="primary" @click="downloadPDF">下载</el-button>
        </div>
      </div>
      <LayoutPage :loading="false">
        <download type="PDF" v-bind="$attrs" ref="download">
          <PageCard title="申请人资讯">
            <baseInfo
              :create-time="viewInfo.create_time"
              :no="viewInfo.table_name"
            />
          </PageCard>
          <PageCard title="申请信息">
            <el-form :disabled="true" label-width="200px">
              <draggable
                :disabled="true"
                :formControl="
                  form_id ? viewInfo.formData.field_configs : viewFormData
                "
              />
            </el-form>
          </PageCard>
          <PageCard v-if="form_id" title="审批流程">
            <nodes :members="viewInfo.approvers" />
          </PageCard>
        </download>
      </LayoutPage>
    </el-dialog>
  </div>
</template>

<script>
import baseInfo from './base_info'
import nodes from './nodes'
import draggable from '~/components/control_form/draggable'
import download from '~/components/download'
export default {
  components: {
    draggable,
    download,
    baseInfo,
    nodes
  },
  props: {
    viewFormData: {
      type: Object,
      default: () => {}
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      default: '',
      type: String
    },
    title: {
      default: '',
      type: String
    },
    link: {
      default: '',
      type: String
    },
    form_id: {
      default: 0,
      type: [Number, String]
    }
  },
  data() {
    return {
      viewInfo: {
        formData: {
          field_configs: [],
          put: false,
          blockSortid: '',
          isInit: 1,
          outSide: true
        },
        approvers: [],
        form_name: '',
        create_time: '',
        table_name: ''
      }
    }
  },
  watch: {
    form_id: {
      immediate: true,
      handler(nv, ov) {
        if (nv) {
          this.getViewData(nv)
        }
      }
    },
    viewFormData: {
      immediate: true,
      handler(nv, ov) {
        if (nv) {
          this.$store.commit('form/changeInit')
        }
      }
    }
  },
  methods: {
    async getViewData(form_id) {
      const res = await this.$api.form.getFormView({ form_id, isload: 1 })
      if (res) {
        res.data.field_configs = {
          blockSortid: '',
          isInit: 1,
          outSide: true,
          put: false,
          controlList: Object.values(res.data.field_configs)
        }

        this.viewInfo.formData = Object.assign(this.viewInfo.formData, {
          field_configs: res.data.field_configs
        })

        this.viewInfo = Object.assign(this.viewInfo, {
          table_name: res.data.table_name,
          approvers: res.data.approvers,
          create_time: res.data.create_time,
          form_name: res.data.form_name,
          pdf_url: res.data.pdf_url
        })

        this.$store.commit('form/changeInit')
      }
    },
    downloadPDF() {
      this.$utils.download(this.viewInfo.pdf_url)
    }
  }
}
</script>

<style lang="less" scope>
.ui-form-view {
  /deep/.el-dialog__header {
    background: #f6f7fb;
  }

  /deep/.layout-page {
    background: #fff;

    & > .header {
      display: none;
    }

    .page-card {
      border-bottom: 1px solid #e3e3e3;

      &:last-child {
        border-bottom: 0;
      }
    }
  }

  .dialog-title {
    position: relative;
    height: 126px;
    line-height: 126px;
    text-align: center;
    font-size: 24px;
    color: #333;
    border-bottom: 1px solid #e3e8f4;

    .btns {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
    }
  }
}
</style>
