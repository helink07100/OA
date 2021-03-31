<template>
  <Card title="分条件审批">
    <div slot="other">
      <label class="m-md"
        >审批单首先匹配优先级高的条件，拖拽可调整以下条件的优先级</label
      >
      <nuxt-link
        class="add-if text-primary"
        :to="'/form/flow_condition?form_id=' + form_id"
      >
        <i class="iconfont icon-tianjiaricheng"></i>
        <span>新增条件</span>
      </nuxt-link>
    </div>
    <div class="conditional-list-box">
      <draggable v-model="flowList" v-bind="dragOptions" @end="sort">
        <transition-group>
          <div
            v-for="(item, index) in flowList"
            :key="index"
            draggable
            class="conditional-item"
          >
            <div class="title-column">
              <span class="title"> {{ item.condition_info }} </span>
              <nuxt-link
                class="text-primary fs-fourteen cp"
                :to="
                  '/form/flow_condition?form_id=' +
                    item.form_id +
                    '&flow_id=' +
                    item.flow_id
                "
              >
                编辑
              </nuxt-link>
              <span
                class="text-danger ml-md fs-fourteen cp"
                @click="delConditionNodes(item.flow_id)"
                >删除</span
              >
            </div>
            <div class="content fs-fourteen">
              <el-row>
                <el-col :span="2">
                  审批流程：
                </el-col>
                <el-col :span="22">
                  <div class="cf">
                    <div
                      v-for="(node, i) in item.nodes"
                      :key="i"
                      class="fl mb-sm"
                    >
                      <ApproverNodes
                        :key="i"
                        :title="node.item_info ? node.item_info : '-'"
                        :desc="node.pass_type"
                        :type="node.user_type"
                        :cross="node.cross"
                        :pointer="true"
                        :is-close="false"
                        :is-line="item.nodes.length - 1 == i ? false : true"
                      />
                    </div>
                  </div>
                </el-col>
              </el-row>
              <br />
              <br />
              <el-row>
                <el-col :span="2">
                  抄送人：
                </el-col>
                <el-col :span="22">
                  <Organization
                    :disabled="true"
                    btn-text="选择抄送人"
                    :value="Object.keys(item.default_cc)"
                    from="member"
                  />
                </el-col>
              </el-row>
              <br />
            </div>
          </div>
        </transition-group>
      </draggable>
    </div>
    <br />
  </Card>
</template>
<script>
import draggable from 'vuedraggable'
import Card from '~/components/page/card'
import ApproverNodes from '~/components/approver_nodes'
import Organization from '~/components/organization'
export default {
  components: {
    draggable,
    Card,
    ApproverNodes,
    Organization
  },
  props: {
    form_id: {
      default: 0,
      type: Number
    },
    flowId: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dragOptions: {
        animation: 500,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      },
      flowList: [],
      form: {
        form_id: (() => {
          return this.$route.query.form_id
        })()
      }
    }
  },
  watch: {
    list(nvs) {
      this.flowList = nvs
    }
    // flowList(nvs) {
    //   this.sort(nvs)
    // }
  },
  methods: {
    async deleteFlow(flow_id) {
      const res = await this.$api.form.deleteFlow({
        flow_id
      })
      if (res) {
        this.$message.success('删除成功')
        this.$emit('loadnewdata')
      }
    },
    delConditionNodes(flow_id) {
      this.$confirm('你确定要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.deleteFlow(flow_id)
        })
        .catch(() => {})
    },
    async sort() {
      const list = this.flowList
      let flows = []
      for (let i = 0; i < list.length; i++) {
        flows.push(list[i].flow_id)
      }
      flows = flows.join(',')
      const res = await this.$api.form.flowSort({
        flows
      })
      if (res) {
        this.$message.success('排序成功')
        this.$emit('loadnewdata')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.add-if {
  font-size: 14px;
  cursor: pointer;
  .icon-tianjiaricheng {
    font-size: 12px;
  }
}
.conditional-item {
  background: #ffffff;
  border: 1px solid #f0f0f0;
  margin-bottom: 15px;
  .title-column {
    display: flex;
    cursor: all-scroll;
    align-items: center;
    background: rgba(244, 246, 249, 0.5);
    padding: 13px 20px;
    .title {
      font-size: 16px;
      color: #424242;
      flex: 1;
      padding-right: 30px;
    }
  }
  .content {
    padding: 20px;
  }

  /deep/.tag-box {
    padding-bottom: 14px;
  }
}
</style>
