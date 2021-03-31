<template>
  <div class="set-form">
    <div class="left ">
      <controlContent
        ref="controlContent"
        @onedit="controlContentEdit"
        @setStep="setStep"
        @submit="handleAddForm"
      />
    </div>
    <div
      :class="[{ 'fixed-top': toTop }, 'right']"
      :style="'top:' + toTop + 'px'"
    >
      <el-card class="box-card" shadow="never" :body-style="{ padding: '0' }">
        <div slot="header">
          <div class="fx-between">
            <span class="title">控件库</span>

            <el-button
              type="primary"
              size="medium"
              @click="dialogVisible = true"
            >
              预览表单
            </el-button>
          </div>
        </div>
        <div class="content">
          <ul class="control-library-list">
            <li
              v-for="item in controls"
              :key="item.icon"
              class="item"
              @click="addControlLibrary(item)"
            >
              <label class="name">{{ item.name }}</label>
              <i class="icon iconfont" :class="[item.icon]"></i>
            </li>
          </ul>
        </div>
      </el-card>
    </div>
    <dialogForm
      :items="dialogForms"
      :is-edit="isEdit"
      :data-string="String(new Date())"
      :dialog-visible="isDialogFormShow"
      @close=";(isDialogFormShow = false), (isEdit = false)"
      @define="defineOption"
    />

    <flowView
      :dialog-visible="dialogVisible"
      :view-form-data="Object.assign(formControl, { put: false })"
      title="表单预览"
      dialog-title="表单预览"
      @hideDialog="dialogVisible = false"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import controlContent from './src/components/control_content'
import dialogForm from './src/components/dialog_form'
import flowView from '~/components/form_view/index'
import controls from '@/mixins/controls'

export default {
  components: {
    controlContent,
    dialogForm,
    flowView
  },
  mixins: [controls],
  props: {
    baseForm: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogForms: {},
      isDialogFormShow: false,
      options: [],
      isEdit: false,
      itemIndex: false,
      blockIndex: false,
      form: {},
      toTop: 0
    }
  },
  computed: {
    ...mapState({
      formControl: (state) => state.form.formControl,
      formList: (state) => state.form.formControl.controlList
    })
  },
  mounted() {
    this.$bus.$on('formItemEdit', this.controlContentEdit)
    this.$bus.$on('scroll', this.pageScroll)
  },
  methods: {
    pageScroll() {
      const toTop = document.querySelector('.layout-page').scrollTop - 174
      if (toTop >= 0 && window.innerHeight >= 900) {
        this.toTop = toTop
      } else {
        this.toTop = 0
      }
    },
    setStep(step) {
      this.$emit('setStep', step)
    },

    // sortid去重
    deduplication(arrs) {
      const sortArray = []
      arrs.forEach((i, index) => {
        sortArray.push(Number(i.sortid))

        // 隐藏区域也要
        if (i.type === 'block') {
          i.formList.forEach((j) => {
            sortArray.push(Number(j.sortid))
          })
        }
      })

      // 获取最大值
      let max = Math.max(...sortArray)

      // 开始去重
      arrs.forEach((i, index) => {
        const itemLength = sortArray.filter((item) => {
          return item === Number(i.sortid)
        }).length

        if (itemLength > 1) {
          max++
          arrs[index].sortid = max
        }

        if (i.type === 'block') {
          i.formList.forEach((j, idx) => {
            const itemLength = sortArray.filter((item) => {
              return item === Number(j.sortid)
            }).length

            if (itemLength > 1) {
              max++
              arrs[index].formList[idx].sortid = max
            }
          })
        }
      })
      return arrs
    },
    // 根据数据查找 表单项
    matchControlItem(controlList, item, blockIndex) {
      controlList.forEach((i, index) => {
        if (this.itemIndex !== false) return
        if (i.sortid === item.sortid) {
          this.itemIndex = index

          // 隐藏区域继续遍历
        } else if (i.formList) {
          this.matchControlItem(i.formList, item, index)
        }
      })
    },
    defineOption(item) {
      this.itemIndex = false
      this.matchControlItem(this.formList, JSON.parse(JSON.stringify(item)))
      // 同步数据
      let arrs = JSON.parse(JSON.stringify(this.formList))

      // 隐藏区块内的控件----编辑
      if (this.blockIndex) {
        this.$refs.controlContent.formControl.controlList[
          this.blockIndex
        ].formList[this.itemIndex] = item

        arrs = [].concat(this.$refs.controlContent.formControl.controlList)

        // 不是隐藏区域---编辑
      } else if (this.itemIndex >= 0 && this.isEdit) {
        arrs[this.itemIndex] = item

        // 不是隐藏区域---新增
      } else {
        item.sortid = this.curId
        arrs.push(item)
        this.$store.dispatch('form/setCurId')
      }

      // 去重
      arrs = this.deduplication(arrs)

      // 缓存到store
      this.$store.commit('form/changeControlList', arrs)
      this.$store.commit('form/changeInit')

      // 重置状态
      this.isEdit = false
      this.isDialogFormShow = false
      this.blockIndex = false
    },
    addControlLibrary(item) {
      this.itemIndex = -1
      this.dialogForms = item
      this.isEdit = false
      this.isDialogFormShow = true
    },
    controlContentEdit(data) {
      this.isEdit = true
      this.dialogForms = data.item
      this.blockIndex = data.blockIndex
      this.isDialogFormShow = true
    },

    filtersFieldConfigs(arrs) {
      const newObjs = {}
      for (let i = 0; i < arrs.length; i++) {
        const item = arrs[i]
        newObjs['control_' + item.sortid] = item
      }
      return newObjs
    },

    // 提交form表单
    async handleAddForm() {
      this.loading = false
      if (!Object.keys(this.formList).length) {
        this.$message.warning('没有设置表单控件')
        return
      }
      this.form = Object.assign(this.form, this.baseForm)
      this.form.field_configs = JSON.stringify(
        this.filtersFieldConfigs(this.formList)
      )
      const verify_tips = this.form.verify_tips
      this.form.verify_tips = verify_tips ? 1 : 0

      if (this.baseForm.form_id) {
        this.form.form_id = this.baseForm.form_id
        this.form.applied_range = JSON.stringify({
          m: this.form.applied_range.split(',')
        })
        const res = await this.$api.form.editForm(this.form)
        if (res) {
          this.$emit('setFormId', res.data)
          this.$emit('setStep', 2)
        }
      } else {
        const form = JSON.parse(JSON.stringify(this.form))
        form.applied_range = JSON.stringify({
          m: form.applied_range.split(',')
        })
        const res = await this.$api.form.addForm(form)
        if (res) {
          this.$emit('setFormId', res.data)
          this.$emit('setStep', 2)
        }
      }
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped>
.set-form {
  display: flex;
  position: relative;
  .left {
    margin-right: 30%;
    color: #000;
    flex: 1;
    padding-right: 20px;
  }
  .right {
    position: absolute;
    top: 0;
    right: 0;
    max-width: 30%;

    /deep/ .el-button--medium {
      padding: 0;
    }

    .title {
      font-size: 18px;
      color: #3a3a3a;
    }

    &.fixed-top {
      right: 0;
      position: absolute;
    }
  }
  .box-card {
    width: 100%;
  }
}
.control-library-list {
  display: flex;
  flex-direction: row;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  padding: 32px 0px;
  user-select: none;
  .item {
    flex: 100%;
    display: flex;
    align-items: center;
    height: 58px;
    border: 1px dashed #e0e3ed;
    padding: 20px;
    margin: 0 15px 30px;
    max-width: 35%;
    cursor: pointer;
    .name {
      font-size: 14px;
      color: #666666;
      flex: 1;
    }
    .icon {
      font-size: 18px;
      color: #666666;
    }
    &:hover {
      border: 1px dashed @color-primary;
      background: #f6f9ff;
      .icon {
        color: #3f78f6;
      }
    }
  }
}
.block-button {
  margin-top: 20px;
  width: 100%;
}
</style>
