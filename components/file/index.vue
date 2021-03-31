<template>
  <div :class="['ui-file fx-jstart', { 'no-border': noBorder }]">
    <div v-for="(item, index) in file" :key="index" class="file-item fx-jstart">
      <i
        class="iconfont icon mr-sm"
        :class="iconClass(item.realname ? item.realname : item.name)"
      ></i>
      <div class="file-detail">
        <div class="name">{{ item.realname ? item.realname : item.name }}</div>
        <div v-if="showControl" class="control">
          <a
            href="javascript:;"
            class="text-primary mr-sm"
            @click="download(item)"
            >{{ $t('附件下载') }}</a
          >
          |
          <a :href="item.filelink" target="_blank" class="text-primary ml-sm">
            {{ $t('预览') }}
          </a>
        </div>
        <div v-else class="desc">
          <i
            class="iconfont icon-caozuo-guanbi close"
            @click="$emit('removeFile', { file: item, index })"
          ></i>
          <!-- {{ item.size ? (item.size / 1024 / 1024).toFixed(2) + 'M' : '' }} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isBlock: { type: Boolean, default: false },
    noBorder: { type: Boolean, default: false },
    showControl: { type: Boolean, default: true },
    file: {
      type: [Array, String],
      default: () => []
    }
  },
  data() {
    return {
      icons: {
        image: 'icon-TUPIAN',
        ppt: 'icon-PPT',
        xls: 'icon-EXCEL',
        doc: 'icon-DOC',
        docx: 'icon-docx',
        pdf: 'icon-pdf',
        wps: 'icon-wps',
        other: 'icon-MOREN'
      }
    }
  },
  methods: {
    download(item) {
      this.$utils.download(item.filelink, item.name, true)
    },
    iconClass(name) {
      if (name) {
        const nameArr = name.split('.')
        let fileType = nameArr[nameArr.length - 1]

        if (/(gif|jpg|jpeg|png|gif|jpg|png)$/.test(fileType)) {
          fileType = 'image'
        }

        if (this.icons[fileType]) {
          return this.icons[fileType]
        } else {
          return this.icons.other
        }
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.ui-file {
  &.no-border {
    flex: none;

    .file-item {
      width: auto;
      padding-left: 0;
      border: none;
      .name {
        width: auto;
      }
    }
  }

  .file-item {
    position: relative;
    margin-right: 15px;
    margin-bottom: 10px;
    padding-left: 8px;
    width: 190px;
    height: 56px;
    border: 1px solid #e6e6e7;
    border-radius: 2px;
  }

  .name {
    width: 120px;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
    font-size: 12px;
    color: #3a3a3a;
    margin-bottom: 5px;
  }

  .control {
    color: #bdbfc1;
  }

  .file-detail {
    line-height: 1;
    .name {
      color: #3a3a3a;
      margin-bottom: 10px;
      line-height: 14px;
    }
  }

  .desc {
    font-size: 12px;
    color: #bdbfc1;
  }

  .close {
    position: absolute;
    margin: auto;
    right: 10px;
    top: 0;
    bottom: 0;
    height: 12px;
    line-height: 12px;
    font-size: 6px !important;
    zoom: 0.8;
  }

  .iconfont {
    font-size: 40px;

    &.icon-TUPIAN {
      color: @color-warning;
    }

    &.icon-PPT {
      color: #f34e19;
    }

    &.icon-pdf {
      color: #f34e19;
    }

    &.icon-MOREN {
      color: #dfe1e6;
    }

    &.icon-EXCEL {
      color: #4ec47f;
    }

    &.icon-wps {
      color: #33d39d;
    }

    &.icon-docx {
      color: #3a80fc;
    }

    &.icon-DOC {
      color: #57a7ff;
    }
  }
}
</style>
