<template>
  <el-dialog
    class="oa-dialog"
    :visible="readVisible"
    width="500"
    @close="$emit('hideRead')"
  >
    <div class="doc-read">
      <div class="read-title fx-between">
        <div class="txt">{{ title }}</div>
        <el-form slot="search" :inline="true" :model="form">
          <el-form-item>
            <el-select
              v-model="form.selectMember"
              value-key="id"
              :filterable="true"
              :placeholder="$t('请选择')"
            >
              <el-option key="all" label="全部" value=""></el-option>
              <el-option
                v-for="item in allList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="showDownload">
            <el-button @click="download">{{ $t('下载') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="read-con">
        <div v-if="initList.organization.all.length" class="read-item">
          <div class="item-title">
            主送机构，合计{{ initList.organization.all.length }}机构，已读{{
              initList.organization.have_read.length
            }}机构，未读{{ initList.organization.not_read.length }}机构
          </div>
          <div class="item-con cf">
            <span v-if="initList.organization.have_read">
              <name-nodes
                v-for="(item, index) in initList.organization.have_read"
                :key="'main_has_+' + index"
                :name="item.name"
                :desc="item.toName"
                class="node-success"
              >
                <div class="time">
                  {{ item.time ? item.time : item.create_time }} 已读
                </div>
              </name-nodes>
            </span>

            <span v-if="initList.organization.not_read">
              <name-nodes
                v-for="(item, index) in initList.organization.not_read"
                :key="'main_not_+' + index"
                :name="item.name"
                :desc="item.toName"
                class="node-danger"
              >
                <div class="time">未读</div>
              </name-nodes>
            </span>
          </div>
        </div>
        <div v-if="initList.main_push_ids.all.length" class="read-item">
          <div class="item-title">
            主送人，合计{{ initList.main_push_ids.all.length }}人，已读{{
              initList.main_push_ids.have_read.length
            }}人，未读{{ initList.main_push_ids.not_read.length }}人
          </div>
          <div class="item-con cf">
            <span v-if="initList.main_push_ids.have_read">
              <name-nodes
                v-for="(item, index) in initList.main_push_ids.have_read"
                :key="'main_has_+' + index"
                :name="item.name"
                :desc="item.toName"
                class="node-success"
              >
                <div class="time">
                  {{ item.time ? item.time : item.create_time }} 已读
                </div>
              </name-nodes>
            </span>

            <span v-if="initList.main_push_ids.not_read">
              <name-nodes
                v-for="(item, index) in initList.main_push_ids.not_read"
                :key="'main_not_+' + index"
                :name="item.name"
                :desc="item.toName"
                class="node-danger"
              >
                <div class="time">未读</div>
              </name-nodes>
            </span>
          </div>
        </div>
        <div v-if="initList.copy_push_ids.all.length" class="read-item">
          <div class="item-title">
            抄送人，合计{{ initList.copy_push_ids.all.length }}人，已读{{
              initList.copy_push_ids.have_read.length
            }}人，未读{{ initList.copy_push_ids.not_read.length }}人
          </div>
          <div class="item-con cf">
            <span v-if="initList.copy_push_ids.have_read">
              <name-nodes
                v-for="(item, index) in initList.copy_push_ids.have_read"
                :key="'copy_has_+' + index"
                :name="item.name"
                :desc="item.station"
                class="node-success"
              >
                <div class="time">
                  {{ item.time ? item.time : item.create_time }} 已读
                </div>
              </name-nodes>
            </span>
            <span v-if="initList.copy_push_ids.not_read">
              <name-nodes
                v-for="(item, index) in initList.copy_push_ids.not_read"
                :key="'copy_not_+' + index"
                :name="item.name"
                :desc="item.toName"
                class="node-danger"
              >
                <div class="time">未读</div>
              </name-nodes>
            </span>
          </div>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import nameNodes from '~/components/name_nodes'
export default {
  components: {
    nameNodes
  },
  props: {
    id: {
      type: [Number, String],
      default: 0
    },
    readVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    showDownload: {
      type: Boolean,
      default: false
    },
    list: {
      type: Object,
      default: () => ({
        main_push_ids: {
          all: [],
          not_read: [],
          have_read: []
        },
        copy_push_ids: {
          all: [],
          not_read: [],
          have_read: []
        },
        organization: {
          all: [],
          not_read: [],
          have_read: []
        }
      })
    }
  },
  data() {
    return {
      form: {
        selectMember: ''
      }
    }
  },

  computed: {
    initList() {
      const nList = JSON.parse(JSON.stringify(this.list))
      if (this.form.selectMember) {
        for (const key in nList) {
          for (const nkey in nList[key]) {
            if (nkey !== 'all') {
              nList[key][nkey] = nList[key][nkey].filter((i) => {
                return i.name === this.form.selectMember
              })
            }
          }
        }
      }
      return nList
    },
    allList() {
      let arr = [].concat(
        this.list.main_push_ids.all,
        this.list.copy_push_ids.all,
        this.list.organization.all
      )
      arr = arr.reduce(
        (all, next) =>
          all.some((atom) => atom.name === next.name) ? all : [...all, next],
        []
      )

      return arr
    }
  },
  mounted() {},
  methods: {
    async download() {
      const res = await this.$api.document.getDocReadDownload({
        doc_id: this.id
      })

      if (res) {
        this.$utils.download(
          res.data.url,
          `读取记录_${new Date().getFullYear()}-${new Date().getMonth()}`
        )
      }
    }
  }
}
</script>

<style lang="less" scoped>
.doc-read {
  .item-title {
    margin-bottom: 30px;
    line-height: 40px;
    text-indent: 10px;
    background: #f6f7fb;
    color: #3a3a3a;
  }

  .txt {
    margin-bottom: 22px;
    font-size: 16px;
    color: #333;
  }

  .name-nodes {
    margin: 0 30px 30px 0;
    min-width: 220px;
    height: 74px;
    padding: 5px;
    float: left;
    border: 1px dashed #cbd2e2;

    &.node-danger {
      background: rgba(255, 68, 57, 0.04);
      border: 1px dashed #ffd3cc;

      .avatar {
        background: #ff4439 !important;
      }

      .info .time {
        color: #ff4439;
      }
    }

    /deep/ .info {
      .time {
        font-size: 12px;
        color: #9d9d9d;
      }
      .desc {
        margin: 0;
      }
    }
  }
}
</style>
