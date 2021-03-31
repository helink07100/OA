<template>
  <div class="ui-download">
    <download ref="download" type="PDF" v-bind="$attrs" :proxy="upload_url">
      <div v-if="pdfData && pdfData.form_info.record" class="download-con">
        <div class="cf">
          <img
            :class="'page-header position-' + pdfData.img_info.page_header"
            crossorigin="anonymous"
            :src="upload_url + pdfData.img_info.page_header_image"
            alt=""
          />
        </div>
        <div class="page-number">
          编号：{{ pdfData.form_info.record.base.sn }}
        </div>
        <div class="download-title">
          {{ pdfData.form_info.record.base.form_name }}
        </div>
        <div class="con">
          <applied :data="pdfData.form_info.record"></applied>
          <application :data="pdfData.form_info.record.fields"></application>
          <approved :data="pdfData.form_info.nodes[0].members"></approved>
        </div>
        <img
          :class="'page-float position-' + pdfData.img_info.page_float"
          crossorigin="anonymous"
          :src="upload_url + pdfData.img_info.page_float_image"
          alt=""
        />
        <div class="cf">
          <img
            :class="'page-footer position-' + pdfData.img_info.page_footer"
            crossorigin="anonymous"
            :src="upload_url + pdfData.img_info.page_footer_image"
            alt=""
          />
        </div>
      </div>
    </download>
  </div>
</template>

<script>
import application from './application'
import applied from './applied'
import approved from './approved'
import download from '@/components/download'
export default {
  components: {
    download,
    application,
    applied,
    approved
  },
  props: {
    pdfData: {
      default: () => {},
      type: Object
    }
  },
  computed: {
    upload_url() {
      return this.$store.state.user.user.upload_url
    }
  },
  methods: {
    downloadPDF() {
      this.$refs.download.toCanvas()
    }
  }
}
</script>

<style lang="less" scoped>
.ui-download {
  position: absolute;
  color: #333;
  text-align: center;
  z-index: -1;
  opacity: 0;

  /deep/ .download-wrapper {
    padding: 80px 50px 100px;
    width: 1000px;
  }

  .page-number {
    padding: 10px 0;
    text-align: right;
    font-size: 18px;
    color: #333;
  }

  .download-title {
    margin-bottom: 10px;
    font-size: 24px;
  }

  /deep/.download-con {
    font-size: 14px;
    position: relative;

    .con {
      position: relative;
      z-index: 11;
      border: 1px solid #000;

      & > section {
        &:last-child > .section-item > .flex {
          border: none;
        }

        .section-item {
          & > .flex {
            border-bottom: 1px solid #000;

            & > div {
              border-left: 1px solid #000;

              &.f1 {
                padding: 10px;
              }

              &.f3 {
                padding: 10px 30px;
                text-align: left;
              }

              &:first-child {
                border-left: 0;
              }
            }
          }
        }
      }

      .tr-title + .tr-title {
        margin-top: 5px;
      }
    }

    .line {
      box-sizing: content-box;
      border-bottom: 1px solid #000;
      height: 30px;
      line-height: 30px;
      background: #a6a6a6;
      font-size: 16px;
      color: #fff;
    }
  }

  /deep/.date {
    text-align: left;
    line-height: 30px;
  }

  /deep/.msg {
    line-height: 30px;
    text-align: left;
  }

  .page-header,
  .page-footer {
    &.position-1 {
      float: left;
    }
    &.position-2 {
      left: 0;
      right: 0;
      margin: auto;
    }
    &.position-3 {
      float: right;
    }
  }

  .download-con .page-header {
    position: relative;
    margin-top: 10px;
  }

  .page-float {
    position: absolute;
    opacity: 0.3;
    top: 0;
    bottom: 0;
    height: auto;
    max-width: 80%;
    margin: auto;
    object-fit: contain;

    &.position-1 {
      left: 0;
    }
    &.position-2 {
      left: 0;
      right: 0;
    }
    &.position-3 {
      right: 0;
    }
  }

  .download-con .page-footer {
    position: relative;
    margin-top: 10px;
  }
}
</style>
