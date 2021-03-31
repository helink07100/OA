<template>
  <draggable
    :list="formList"
    v-bind="dragOptions"
    class="drag-con"
    @choose="onChoose"
    @change="onChange"
  >
    <transition-group>
      <div v-for="(item, index) in formList" :key="index">
        <itemText
          v-if="
            item.type === 'textarea' ||
              item.type === 'number' ||
              item.type === 'text'
          "
          v-model="item.value"
          :items="item"
          :is-option="true"
          :index="index"
          :block-sortid="formControl.blockSortid"
          :block-index="blockIndex"
        >
          <Option
            v-if="!disabled"
            :unit="item.number_unit"
            :control-options="controlOptions"
            :form-item-data="item"
            :index="index"
            :blockIndex="blockIndex"
          />
        </itemText>

        <!-- 单选框 Radio type=select -->
        <itemSelect
          v-if="item.type === 'select'"
          v-model="item.value"
          :items="Object.assign(item, { blockSortid: formControl.blockSortid })"
          :index="index"
          :block-sortid="formControl.blockSortid"
          :block-index="blockIndex"
        >
          <Option
            v-if="!disabled"
            :control-options="controlOptions"
            :form-item-data="item"
            :index="index"
            :blockIndex="blockIndex"
          />
        </itemSelect>

        <!-- 多选框 multi_select -->
        <itemMultiSelect
          v-if="item.type === 'multi_select'"
          v-model="item.value"
          :items="Object.assign(item, { blockSortid: formControl.blockSortid })"
          :index="index"
          :block-sortid="formControl.blockSortid"
          :block-index="blockIndex"
        >
          <Option
            v-if="!disabled"
            :control-options="controlOptions"
            :form-item-data="item"
            :index="index"
            :blockIndex="blockIndex"
          />
        </itemMultiSelect>

        <!-- 日期 date -->
        <itemDate
          v-if="item.type === 'date'"
          :index="index"
          :items="item"
          :block-sortid="formControl.blockSortid"
          :block-index="blockIndex"
        >
          <Option
            v-if="!disabled"
            :control-options="controlOptions"
            :form-item-data="item"
            :index="index"
            :blockIndex="blockIndex"
          />
        </itemDate>

        <!-- 开始时间-结束时间 date_range -->
        <itemDateRange
          v-if="item.type === 'date_range'"
          :index="index"
          :items="item"
          :block-sortid="formControl.blockSortid"
          :block-index="blockIndex"
        >
          <Option
            v-if="!disabled"
            :control-options="controlOptions"
            :form-item-data="item"
            :index="index"
            :blockIndex="blockIndex"
          />
        </itemDateRange>

        <!-- 上传图像 -->
        <itemImages
          v-if="item.type === 'images'"
          :items="item"
          :index="index"
          :block-sortid="formControl.blockSortid"
          :block-index="blockIndex"
        >
          <Option
            v-if="!disabled"
            :control-options="controlOptions"
            :form-item-data="item"
            :index="index"
            :blockIndex="blockIndex"
          />
        </itemImages>

        <!-- 说明文字 tip -->
        <itemTips v-if="item.type === 'tips'" :items="item">
          <Option
            v-if="!disabled"
            :control-options="controlOptions"
            :form-item-data="item"
            :index="index"
            :blockIndex="blockIndex"
          />
        </itemTips>

        <!-- 附件 -->
        <itemFile
          v-if="item.type === 'addon'"
          ref="oaformuploadfile"
          :items="item"
          :index="index"
          :limit="10"
          :block-sortid="formControl.blockSortid"
          :block-index="blockIndex"
        >
          <Option
            v-if="!disabled"
            slot="option"
            :control-options="controlOptions"
            :form-item-data="item"
            :index="index"
            :blockIndex="blockIndex"
          />
        </itemFile>

        <!-- 金额 money -->
        <itemMoney
          v-if="item.type === 'money'"
          :items="item"
          :index="index"
          :block-sortid="formControl.blockSortid"
          :block-index="blockIndex"
        >
          <Option
            v-if="!disabled"
            :control-options="controlOptions"
            :form-item-data="item"
            :index="index"
            :blockIndex="blockIndex"
          />
        </itemMoney>

        <!-- 数据表格 table -->
        <itemTable
          v-if="item.type === 'table'"
          :items="item"
          :index="index"
          :table-disabled="!outSideForm.put"
          :block-sortid="formControl.blockSortid"
          :block-index="blockIndex"
        >
          <Option
            v-if="!disabled"
            :control-options="controlOptions"
            :form-item-data="item"
            :index="index"
            :blockIndex="blockIndex"
          />
        </itemTable>

        <!-- 部门选择 department -->
        <itemDepartment
          v-if="item.type === 'department'"
          :items="item"
          :options="[]"
          :index="index"
          :department-data="departmentData"
          :block-sortid="formControl.blockSortid"
          :block-index="blockIndex"
        >
          <Option
            v-if="!disabled"
            :control-options="controlOptions"
            :form-item-data="item"
            :index="index"
            :blockIndex="blockIndex"
          />
        </itemDepartment>

        <!-- 部门-岗位 station-->
        <itemStation
          v-if="item.type === 'station'"
          :items="item"
          :index="index"
          :department-data="departmentData"
          :block-sortid="formControl.blockSortid"
          :block-index="blockIndex"
        >
          <Option
            v-if="!disabled"
            :control-options="controlOptions"
            :form-item-data="item"
            :index="index"
            :blockIndex="blockIndex"
          />
        </itemStation>

        <!-- 分割线 line-->
        <itemLine v-if="item.type === 'line'" :items="item" :options="[]">
          <Option
            v-if="!disabled"
            :control-options="controlOptions"
            :form-item-data="item"
            :index="index"
            :blockIndex="blockIndex"
          />
        </itemLine>

        <!-- 隐藏区块 line-->
        <itemBlock
          v-if="item.type === 'block' && (item.isShow || showBlock)"
          :index="index"
          :items="item"
          :disabled="disabled"
          :sort="!disabled"
          :departmentData="departmentData"
          :options="[]"
        >
          <Option
            v-if="!disabled"
            :control-options="controlOptions"
            :form-item-data="item"
            :index="index"
          />
        </itemBlock>
      </div>
    </transition-group>
  </draggable>
</template>
<script>
import { mapState } from 'vuex'
import draggable from 'vuedraggable'
import Option from '~/components/control_form/option'
import itemText from '~/components/control_form/text'
import itemSelect from '~/components/control_form/select'
import itemMultiSelect from '~/components/control_form/multi_select'
import itemDate from '~/components/control_form/date'
import itemDateRange from '~/components/control_form/date_range'
import itemImages from '~/components/control_form/images'
import itemFile from '~/components/control_form/file'
import itemTips from '~/components/control_form/tips'
import itemMoney from '~/components/control_form/money'
import itemTable from '~/components/control_form/table'
import itemDepartment from '~/components/control_form/department'
import itemStation from '~/components/control_form/station'
import itemLine from '~/components/control_form/line'
import itemBlock from '@/components/control_form/block'
export default {
  name: 'UiDraggable',
  components: {
    draggable,
    Option,
    itemText,
    itemSelect,
    itemMultiSelect,
    itemDate,
    itemDateRange,
    itemImages,
    itemFile,
    itemTips,
    itemMoney,
    itemTable,
    itemDepartment,
    itemStation,
    itemLine,
    itemBlock
  },
  props: {
    showBlock: {
      default: false,
      type: Boolean
    },
    formControl: {
      type: Object,
      default: () => ({
        put: true,
        blockSortid: '',
        outSide: true,
        controlList: []
      })
    },
    disabled: { type: Boolean, default: false },
    blockIndex: {
      default: 0,
      type: [String, Number]
    },
    departmentData: {
      default: () => [],
      type: Array
    }
  },
  data() {
    return {
      // 操作 按钮
      controlOptions: ['edit', 'del', 'draggable'],

      // 拖拽设置
      dragOptions: {
        animation: 500,
        group: { put: this.formControl.put },
        disabled: false,
        ghostClass: 'ghost'
      },
      formList: []
    }
  },
  computed: {
    ...mapState({
      outSideForm: (state) => state.form.formControl
    })
  },
  watch: {
    // 用于监听父节点从上至下更新 表单项
    'outSideForm.isInit': {
      immediate: true,
      handler() {
        // 兼容旧数据
        let array = []
        if (this.formControl.formList) {
          array = this.formControl.formList
        } else if (this.formControl.controlList) {
          array = this.formControl.controlList
        }
        if (this.formControl.outSide) {
          this.dragOptions.group.put = true
        } else {
          this.dragOptions.group.put = this.formControl.put
        }
        this.dragOptions.disabled = this.disabled
        this.formList = array
      }
    },

    // 已经绑定了隐藏区域的id，则不显示改隐藏区域的选项
    formList(nv) {
      if (!nv) return
      nv.map((i) => {
        if (i && i.type === 'block') {
          i.formList.map((j) => {
            if (j.type === 'select' || j.type === 'multi_select') {
              j.options.map((k) => {
                k.value = ''
                return k
              })
            }
            return j
          })
        }
        return i
      })
    }
  },
  methods: {
    // 监听如果是移动则重新赋值，其他的操作就忽略
    onChange(event) {
      let formControl = JSON.parse(JSON.stringify(this.outSideForm))

      if (this.formControl.outSide === false) {
        formControl.controlList = formControl.controlList.map((i) => {
          if (i.sortid === this.formControl.sortid) {
            i.formList = this.formList
          }
          return i
        })
      } else {
        // 把隐藏区域排除掉，因为隐藏区域内的控件最新数据在 strore里面
        this.formList = this.formList.map((i) => {
          if (i.type === 'block') {
            i = formControl.controlList.filter((j) => {
              return i.sortid === j.sortid
            })[0]
          }
          return i
        })

        formControl = Object.assign({}, formControl, {
          controlList: this.formList
        })
      }

      this.$store.commit('form/changeControlList', formControl.controlList)
      this.$store.commit('form/changePut', true)
    },
    // 防止隐藏区域嵌套问题
    onChoose(event) {
      let put = true
      if (event.originalEvent.target.className.match('block-name')) {
        put = false
      }
      console.log(event.originalEvent.target.className, put)
      this.$store.commit('form/changePut', put)
    }
  }
}
</script>
<style lang="less">
.el-form > .drag-con > span {
  display: block;
  padding: 20px 0;
}

.drag-con {
  padding: 0 5%;
  height: 100%;

  /deep/.el-form-item__content {
    display: flex;

    & > div:nth-child(1):not(.block-header),
    & > div:nth-child(3):not(.option) {
      flex: 1;
    }

    .el-form-item + .el-form-item {
      flex: 1.6;
    }
  }

  // 隐藏区块模块特殊处理
  /deep/.drag-block {
    position: relative;
    border: 1px solid #e3e8f4;

    & > .el-form-item__content {
      margin-left: 0 !important;
      display: block;

      .block-header {
        padding-left: 20px;
        background: #ebeef5;
        height: 40px;
      }

      .el-form-item__content {
        margin-bottom: 22px;
      }

      & > .option {
        position: absolute;
        right: 0;
        top: 0;
      }
    }

    .block-con {
      position: relative;
      min-height: 50px;

      & > .drag-con {
        padding: 0;
        min-height: 40px;

        & > span {
          display: block;
          position: relative;
          padding-top: 22px;
          min-height: 100%;
          width: 100%;
        }
      }
    }
  }

  /deep/.option {
    width: 230px;

    span {
      padding-left: 15px;
      cursor: pointer;
    }
  }
}
</style>
