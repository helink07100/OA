<template>
  <div>
    <el-form-item
      ref="initiator"
      :label="items.name + '：'"
      :prop="itemKey + '.initiator'"
      :rules="[
        {
          required: items.initiator.length ? false : true,
          message: '请选择发起人',
          trigger: 'change'
        }
      ]"
    >
      <el-col :span="3">
        <RadiusAddButton @on="showInitiatorDialog = true" />
      </el-col>
      <el-col :span="18">
        <el-tag
          v-for="(item, index) in items.initiator"
          :key="item.key"
          class="mr-sm"
          closable
          @close="delInitiatorItem(items, index)"
          >{{ item.name }}</el-tag
        >
      </el-col>
      <el-col :span="3">
        <a
          href="javascript:;"
          class="text-danger cp mt-sm"
          @click="delControlsItem(itemKey)"
          >删除</a
        >
      </el-col>
    </el-form-item>
    <component
      :is="'dialogSelectOrganization'"
      ref="initiatorSelectOrganization"
      dialog-title="选择抄送人"
      :dialog-visible="showInitiatorDialog"
      from="member"
      width="50%"
      @cancel="showInitiatorDialog = false"
      @definite="
        ;(items.initiator = $event),
          (showInitiatorDialog = false),
          defineSelect()
      "
      @init-complete="initiatorInitComplete"
    ></component>
    <!-- @definite=";(items.initiator = $event), (showInitiatorDialog = false)" -->
  </div>
</template>

<script>
import RadiusAddButton from '~/components/radius_add_button'
import Condition from '@/mixins/condition'
import dialogSelectOrganization from '~/components/dialog_select_organization'
export default {
  components: {
    RadiusAddButton,
    dialogSelectOrganization
  },
  mixins: [Condition],
  data() {
    return {
      showInitiatorDialog: false
    }
  },
  methods: {
    getIds(arrs) {
      const ids = []
      for (let i = 0; i < arrs.length; i++) {
        ids.push(arrs[i].id)
      }
      return ids
    },
    defineSelect() {
      this.$refs.initiator.clearValidate(this.itemKey + '.initiator')
    },
    initiatorInitComplete() {
      setTimeout(() => {
        this.$refs.initiatorSelectOrganization.set_checked_data(
          this.items.initiator
        )
      }, 500)
    },
    delInitiatorItem(item, index) {
      item.initiator.splice(index, 1)
      // 内部数据改变后，抛出一个事件，让组件重新渲染数据
      this.$emit('change', item.initiator, this.items)
      this.initiatorInitComplete()
    }
  }
}
</script>
