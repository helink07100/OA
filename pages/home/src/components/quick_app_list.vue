<!--
@name 快速申请 
-->
<template>
  <div class="quick-app-content">
    <div class="title">
      <div class="title-text">{{ title }}</div>
      <div class="add" @click="() => (this.visible = true)">
        <i class="iconfont icon-tianjiaricheng" style="font-size: 14px"></i>
        添加
      </div>
    </div>
    <div class="quick-app-list-wrap">
      <ul class="quick-app-list">
        <li v-for="item in list" :key="item.id" class="item">
          <nuxt-link
            class="item-inline-flex"
            :to="'/myflow/apply?form_id=' + item.form_id"
          >
            <img class="icon" :src="item | filter_icon_src" />
            <div class="desc">{{ item.form_name }}</div>
            <i class="iconfont icon-daohangdianji"></i>
          </nuxt-link>
        </li>
      </ul>
      <PageEmpty
        v-if="list.length <= 0"
        :styles="{ 'padding-top': '144px', 'padding-bottom': '144px' }"
        :msg="$t('暂无快捷入口')"
      />
    </div>

    <oaDialog
      width="850px"
      :dialogVisible="visible"
      title="快速申请"
      @close="() => (this.visible = false)"
      class="oa-dialog"
    >
      <div>
        <div v-for="item in approvalTypeList" :key="item" class="form-section">
          <h1 class="title">{{ quickForm[item].name }}</h1>
          <el-row :gutter="20">
            <el-col
              v-for="form in quickForm[item].data"
              :key="form.form_id"
              :span="8"
              class="form-item-wrap"
            >
              <div
                :class="{ 'form-item': true, selected: form.selected }"
                @click="handleSelectFormItem(item, form)"
              >
                <img class="icon" :src="form.icon" />
                <span class="content">{{ form.form_name }}</span>
                <i class="iconfont icon-daohangdianji"></i>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="footer">
          <el-button type="primary" :loading="submitting" @click="handleSubmit"
            >确定</el-button
          >
          <el-button>取消</el-button>
        </div>
      </div>
    </oaDialog>
  </div>
</template>

<script>
import oaDialog from '~/components/oa_dialog'
export default {
  components: {
    oaDialog
  },
  filters: {
    filter_icon_src(item) {
      let icon = item.icon

      if (/^(https?):\/\/[^\s$.?#].[^\s]*$/.test(icon)) return icon

      const icon_arr = icon.split('-')
      if (icon_arr.length <= 1) icon = 'icon-wofaqideshenpi'
      return require('~/assets/image/approval_icon/' + icon + '.png')
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    list: {
      type: [Array, Object],
      default: () => {
        return []
      }
    }
  },
  data: () => ({
    visible: false,
    submitting: false,
    quickForm: {},
    approvalTypeList: [],
    selectedList: [],
    unCheckList: [] // 记录删除操作
  }),
  methods: {
    async handleDeleteForm() {
      const form_list = this.list.filter(
        (v) => this.unCheckList.findIndex((r) => r.form_id === v.form_id) > -1
      )
      if (form_list.length > 0) {
        const id = form_list.map((v) => v.id)
        await this.$api.home.deleteQuickForm({ id })
        this.unCheckList = []
      }
    },
    async handleSubmit() {
      this.submitting = true
      this.handleDeleteForm()
      const response = await this.$api.home.addQuickAppForm({
        form_data: this.selectedList
      })
      this.submitting = false
      if (response.code === 0) {
        this.$message.success('操作成功')
        this.visible = false
        this.selectedList = []
        this.$emit('onclose')
      }
    },
    async queryQuickForm() {
      this.selectedList = this.list
      const response = await this.$api.home.queryQuickAppForm()
      if (response.code === 0) {
        const approvalTypeList = Object.keys(response.data)
        for (let i = 0; i < approvalTypeList.length; i++) {
          const key = approvalTypeList[i]
          const arr = [...response.data[key].data]
          arr.map((v) => {
            const idx = this.selectedList.findIndex(
              (r) => r.form_id === v.form_id
            )
            idx <= -1 ? (v.selected = false) : (v.selected = true)
          })
          response.data[key].data = arr
        }
        this.quickForm = response.data
        this.approvalTypeList = approvalTypeList
      }
    },
    handleSelectFormItem(item, form) {
      const index = this.quickForm[item].data.findIndex(
        (v) => v.form_id === form.form_id
      )
      if (index > -1) {
        const isSelected = this.quickForm[item].data[index].selected
        this.quickForm[item].data[index].selected = !isSelected
      }

      const _selectedList = [...this.selectedList]
      const selectedIndex = _selectedList.findIndex(
        (v) => v.form_id === form.form_id
      )
      if (selectedIndex > -1) {
        _selectedList.splice(selectedIndex, 1)
        this.selectedList = _selectedList
        this.unCheckList.push(form)
      } else {
        _selectedList.push(form)
        this.selectedList = _selectedList
        const i = this.unCheckList.findIndex((v) => v.form_id === form.form_id)
        this.unCheckList.splice(i, 1)
      }
    }
  },
  watch: {
    visible(val) {
      if (val) {
        this.queryQuickForm()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.oa-dialog /deep/ .oa-dialog-body {
  padding: 30px;
}

.footer {
  display: flex;
  justify-content: center;
}

.form-section {
  margin-bottom: 30px;

  .title {
    margin-bottom: 20px;
    font-size: 16px;
  }

  .form-item-wrap {
    margin-bottom: 20px;
    &:nth-last-child(-n + 3) {
      margin-bottom: 0;
    }
  }

  .form-item {
    display: flex;
    align-items: center;
    width: 250px;
    height: 64px;
    border: 1px dashed #cbd2e2;
    padding: 20px 12px;

    &.selected {
      background: rgba(255, 68, 57, 0.04);
      border-color: #ffd3cc;
    }

    .content {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &:hover {
      cursor: pointer;
    }

    .icon-daohangdianji {
      color: #cbd2e2;
      transform: rotate(-90deg);
      font-size: 14px;
      width: 14px;
      height: 14px;
      margin-left: auto;
    }

    img {
      width: 40px;
      height: 40px;
      margin-right: 8px;
    }
  }
}

.add {
  font-size: 14px;
  color: #3f78f6;
  cursor: pointer;
}

.quick-app-content,
.process-center-content {
  background: #fff;
  box-shadow: 0 0 6px 0 rgba(225, 226, 229, 0.5);
  border-radius: 2px;
  margin-top: 20px;
  .title {
    font-size: 18px;
    color: #333333;
    padding: 20px 20px 20px 20px;
    display: flex;
    align-items: center;
    .title-text {
      flex: 1;
    }
    a {
      font-size: 14px;
      color: #9ba6bc;
    }
  }
}
.quick-app-list-wrap {
  min-height: 393px;
  .quick-app-list {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
    flex-wrap: wrap;
    display: flex;
    flex-direction: row;
    align-items: center;
    .item {
      width: 50%;
      margin-bottom: 24px;
      .item-inline-flex {
        border: 1px dashed #cbd2e2;
        display: flex;
        margin-left: 20px;
        margin-right: 20px;
        padding: 10px 20px 10px 20px;
        position: relative;
        align-items: center;
        .icon {
          width: 40px;
          height: 40px;
        }
        .desc {
          padding-left: 15px;
          font-size: 14px;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          line-height: 20px;
          flex: 1;
          padding-right: 15px;
        }
        .icon-daohangdianji {
          color: #cbd2e2;
          transform: rotate(-90deg);
          font-size: 14px;
          width: 14px;
          height: 14px;
        }
      }
    }
  }
  .null-data-msg {
    padding: 120px 30px;
  }
}

.oa-quick-app-list-popover {
  padding: 0;
}
</style>
