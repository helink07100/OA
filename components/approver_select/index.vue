<template>
  <el-popover
    v-model="visible"
    placement="right"
    popper-class="approver-popover-style"
    width="173"
    trigger="click"
  >
    <ul class="oa-panel-selects">
      <li v-for="(item, index) in list" :key="index" class="item out-item">
        <div v-if="!item.child" class="inner-popover">
          <div class="fx-between" @click="selectItem(item, 'normal')">
            <i class="radius-block"></i>
            <label class="name">{{ item.label }}</label>
            <i class="el-icon-arrow-right"></i>
          </div>
        </div>
        <el-popover
          v-else
          placement="right"
          popper-class="approver-popover-style"
          width="280"
          trigger="click"
          :offset="0"
          class="inner-popover"
        >
          <div
            slot="reference"
            class="fx-between"
            @click="selectItem(item, 'normal')"
          >
            <i class="radius-block"></i>
            <label class="name">{{ item.label }}</label>
            <i class="el-icon-arrow-right"></i>
          </div>
          <ul v-if="item.child" class="oa-panel-selects child">
            <li
              v-for="(citem, cindex) in item.child"
              :key="'child_' + cindex"
              slot="reference"
              class="item"
              @click="handleOpenInnerPopOver(item, citem)"
            >
              <label class="name">{{ citem.name || citem.label }}</label>
              <i class="el-icon-arrow-right"></i>
            </li>
          </ul>
        </el-popover>
      </li>
    </ul>
    <RadiusAddButton slot="reference" />
  </el-popover>
</template>

<script>
import RadiusAddButton from '~/components/radius_add_button'
export default {
  components: {
    RadiusAddButton
  },
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      visible: false,
      childs: []
    }
  },
  methods: {
    handleOpenInnerPopOver(item, citem) {
      debugger
      if (item.value === 'cc_person' && citem.value === 'organization') {
        this.selectItem({
          label: '抄送申请人机构',
          value: 'organization',
          isCC: true
        })
      } else if (
        item.value === 'organization' ||
        citem.value === 'organization'
      ) {
        this.selectItem({
          label: '跨机构审批',
          value: 'member',
          organization_id: citem.id
        })
      } else if (citem.value === 'department') {
        this.selectItem({
          label: '抄送申请人部门',
          value: 'department',
          isCC: true
        })
      } else if (citem.value === 'member') {
        this.selectItem({
          label: '抄送指定人',
          value: 'member',
          isCC: true
        })
      }
    },
    selectItem(item) {
      this.visible = true
      // 有子集
      if (item.child) {
        return
      }
      this.$emit('selectChange', item)
    }
  }
}
</script>

<style lang="less" scoped>
.inner-popover {
  width: 100%;
}
.oa-panel-selects {
  max-height: 400px;
  overflow: auto;
  padding: 0;

  &::-webkit-scrollbar {
    width: 5px;
  }

  & > .out-item {
    .radius-block {
      margin-left: 7px;
      margin-right: 7px;
      display: inline-block;
      width: 14px;
      height: 14px;
      border-radius: 4px;
    }

    &:nth-child(1) .radius-block {
      background: @color-danger;
    }

    &:nth-child(2) .radius-block {
      background: @color-warning;
    }

    &:nth-child(3) .radius-block {
      background: @color-success;
    }

    &:nth-child(4) .radius-block {
      background: @color-primary;
    }

    &:nth-child(5) .radius-block {
      background: @color-cross;
    }

    &:nth-child(6) .radius-block {
      background: #8790ac;
    }

    &:nth-child(7) .radius-block {
      background: #771039;
    }
  }

  .item {
    display: flex;
    align-items: center;
    height: 56px;
    line-height: 56px;
    border-bottom: 1px solid #f0f2f5;
    cursor: pointer;
    .name {
      flex: 1;
    }
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>
