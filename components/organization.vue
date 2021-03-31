<template>
  <div class="ui-organization">
    <dialogOrganization
      ref="selectOrganization"
      :dialog-title="btnText"
      width="656px"
      :dialog-visible="visible"
      :organization-api="organizationApi"
      :top-organization-i-d="topOrganizationID"
      :from="from"
      :node-key="nodeKey"
      :master="master"
      :is-all-station="isAllStation"
      :organization-hide="organizationHide"
      @cancel="visible = false"
      @init-complete="initComplete"
      @definite="definite"
    >
      <div slot="other">
        <slot name="other"></slot>
      </div>
    </dialogOrganization>
    <div v-if="!hideBtn" class="select-tag-wrap fx-allstart">
      <div class="tag-box">
        <el-button
          v-if="!disabled"
          class="select-tag-button is-active"
          :style="{ 'font-size': '14px' }"
          @click="showDialog"
          >{{ btnText }}</el-button
        >
        <el-tag
          v-for="(item, index) in pushIds"
          :key="item.key"
          class="oa-tag"
          :closable="!disabled"
          :disable-transitions="false"
          @close="tagClose(index)"
        >
          {{ tagName(item) }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script>
import dialogOrganization from './dialog_select_organization'
export default {
  components: {
    dialogOrganization
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    btnText: { type: String, default: '选择机构' },
    nodeKey: { type: String, default: '' },
    isAllStation: { type: Boolean, default: false },
    organizationHide: { type: Boolean, default: false },
    hideBtn: { type: Boolean, default: false },
    topOrganizationID: { type: [Number, String], default: 0 },
    // 指定 接口地址
    organizationApi: {
      type: Object,
      default: () => {}
    },
    // 选择数据类型，目前类型有4种：organization （组织），department（部门），station （岗位），member（人员）
    from: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    master: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      visible: false,
      pushIds: [],
      organizationList: [],
      refOrganization: ''
    }
  },
  watch: {
    '$attrs.value': {
      immediate: true,
      handler(nv, ov) {
        if (!nv) return
        this.pushIds = Array.isArray(nv)
          ? nv
          : nv.split(',').filter((i) => {
              return !!i
            })
      }
    }
  },
  mounted() {
    this.refOrganization = this.$refs.selectOrganization
  },
  methods: {
    // 显示弹窗
    showDialog() {
      this.visible = true

      if (this.refOrganization) {
        setTimeout(() => {
          this.refOrganization.set_checked_data(this.pushIds, 'keys')
        }, 10)
      }
    },

    // 获取 节点数据，用于展示
    initComplete(data) {
      this.organizationList = data
      this.$emit('initComplete', data)
    },

    // 修改节点
    definite(list) {
      this.visible = false
      list = list.map((i) => {
        return i.id
      })
      this.$emit('input', list.join(','))
      this.$emit('definite', list)
    },

    selectOrganization() {
      this.refOrganization.set_checked_data(this.pushIds)
    },

    // 删除节点
    tagClose(index) {
      this.pushIds.splice(index, 1)
      this.refOrganization.set_checked_data(this.pushIds)
      this.$emit('input', this.pushIds.join(','))
    },

    // 计算名字
    tagName(tagId) {
      const id = !isNaN(tagId) ? parseInt(tagId) : tagId
      let name = ''
      this.organizationList.forEach((i) => {
        if (i.id === id) {
          name = i.name ? i.name : i.realname
        } else if (!name && i.child) {
          // 二次遍历
          i.child.forEach((j) => {
            if (j.id === id) {
              name = j.name ? j.name : j.realname
            }

            // 三次遍历
            if (!name && j.child) {
              j.child.forEach((k) => {
                if (k.id === id) {
                  name = k.name ? k.name : k.realname
                }
              })
            }
          })
        }
      })

      return name
    }
  }
}
</script>

<style lang="less" scoped>
.ui-organization {
  .select-tag-button {
    margin: 12px 15px 12px 0;
  }

  .select-tag-wrap {
    padding: 0 10px;
    border: 1px solid #e3e8f4;
    border-radius: 2px;
    border-radius: 2px;
    min-height: 42px;

    .el-button {
      height: 30px;
      padding: 0 9px;
      line-height: 30px;
    }

    .tag-box {
      flex: 1;
      max-height: 150px;
      overflow-y: auto;
      line-height: 30px;
    }

    .oa-tag {
      height: 30px;
      margin: 14px 20px 0 0;
      background: rgba(63, 120, 246, 0.1);
      border-radius: 2px;
      border-radius: 2px;
      border: none;
    }
  }
}
</style>
