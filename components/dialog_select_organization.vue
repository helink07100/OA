<template>
  <el-dialog
    class="oa-dialog"
    :visible="dialogVisible"
    :width="width"
    @close="$emit('cancel')"
  >
    <div slot="title" class="oa-dialog-header">{{ dialogTitle }}</div>
    <div v-if="!organizationHide" class="oa-dialog-body">
      <div class="organization-box">
        <div v-if="false" class="title">{{ dialogTitle }}</div>
        <div class="search">
          <el-row justify="space-between" align="middle" class="fx-between">
            <el-col v-if="!isCC" :span="12">
              <el-form :model="form">
                <el-form-item style="margin-bottom: 0">
                  <el-select v-model="form.approve_pass" style="width: 95%">
                    <div slot="prefix" class="prefix">模式:</div>
                    <el-option
                      v-for="item in approvePass"
                      :key="item.label"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="isCC ? 24 : 12">
              <div style="text-align: right">
                <el-input
                  v-model="search_key"
                  class="dialog-input"
                  :style="{ width: '200px' }"
                  placeholder="搜索"
                  prefix-icon="el-icon-search"
                ></el-input>
                <el-button
                  type="primary"
                  class="filter-btn"
                  plain
                  @click="filterTree"
                >
                  搜索
                </el-button>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="fx-between">
          <el-checkbox v-if="!from" v-model="filterNullCorresStation"
            >过滤无对应人之岗位</el-checkbox
          >
          <template v-if="!isAllStation">
            <el-checkbox
              v-if="!from || from == 'station'"
              v-model="allStation"
              @change="all_station_change"
              >全部岗位</el-checkbox
            >
            <el-checkbox
              v-if="!from || from == 'member'"
              v-model="allMember"
              @change="all_member_change"
              >全部人员</el-checkbox
            >
          </template>
        </div>
        <div class="content fx-between">
          <div v-loading="leftLoading" class="left">
            <div class="checked-box-wrap">
              <el-tree
                ref="organizationTree"
                :props="props"
                :data="organizationList"
                :node-key="nodeKey ? nodeKey : 'key'"
                show-checkbox
                :check-strictly="strictly"
                :default-expand-all="true"
                :filter-node-method="filter_node"
                @check-change="check_change"
              >
              </el-tree>
            </div>
          </div>
          <div class="right">
            <ul class="checked-box-wrap">
              <template v-for="item in organizationCheckedList">
                <li v-if="item.from != 'all'" :key="item.key" class="item">
                  <span class="name">{{ item.name }}</span>
                  <span class="del text-danger" @click="del_checked_data(item)"
                    >删除</span
                  >
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <slot name="other"></slot>
    <span slot="footer" class="oa-dialog-footer">
      <el-button @click="$emit('cancel')">取 消</el-button>
      <el-button type="primary" @click="handleSubmit">{{
        definiteText ? definiteText : '确 定'
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import mixinsFlowNodes from '@/mixins/flow_nodes'

export default {
  name: 'DialogSelectOrganization',
  mixins: [mixinsFlowNodes],
  props: {
    form: {
      type: Object,
      default: () => ({})
    },
    isCC: Boolean,
    organizationHide: Boolean,
    dialogTitle: {
      type: String,
      default: ''
    },
    dialogVisible: Boolean,
    definiteText: {
      type: String,
      default: ''
    },
    // 指定 机构ID
    topOrganizationID: {
      type: [Number, String],
      default: ''
    },
    // 指定 接口地址
    organizationApi: {
      type: Object,
      default: () => {}
    },
    width: {
      type: String,
      default: ''
    },
    nodeKey: {
      type: String,
      default: 'key'
    },
    // 选择数据类型，目前类型有4种：organization （组织），department（部门），station （岗位），member（人员）
    from: {
      type: String,
      default: ''
    },
    master: { type: Number, default: 0 },
    limitRank: Boolean,
    isFilterHide: Boolean, // 是否过滤人员数据hide字段=0时不显示
    isFilterDepartment: Boolean, // 是否过滤无下级数据的部门
    isAllStation: Boolean // 是否请求全部岗位数据，如果开启的话?ct=tisi&ac=member_select_whole接口就不会请求
  },
  data() {
    return {
      filterNullCorresStation: false,
      allStation: false,
      allMember: false,
      search_key: '',
      strictly: true,
      props: {
        label: 'name',
        children: 'child'
      },
      saveOrganizationList: '', // 必需保存字符串类型，用JSON.stringify转，否则会存在
      organizationList: [],
      organizationCheckedKeys: [],
      organizationCheckedList: [],
      leftLoading: false
    }
  },
  computed: {
    organizationId() {
      return this.$store.state.user.user.organization_id
    }
  },
  watch: {
    // 过滤无对应人之岗位
    filterNullCorresStation(nv, ov) {
      if (nv) {
        this.organizationList = this.recursion(this.organizationList, 'station')
      } else {
        this.set_data_show(this.from, JSON.parse(this.saveOrganizationList))
      }
    },
    from(nv) {
      this.get_tree_list()
    },
    topOrganizationID(nv) {
      this.get_tree_list()
    }
  },
  mounted() {
    this.get_tree_list()
  },
  methods: {
    // 获取树形节点列表
    async get_tree_list(callback) {
      this.leftLoading = true

      // 指定某个机构
      const poshData = {
        organization_id:
          this.topOrganizationID !== undefined
            ? this.topOrganizationID
            : this.organizationId,
        master: this.master
      }

      let rs = {}
      // 获取机构列表
      if (this.organizationApi && Object.keys(this.organizationApi).length) {
        rs = await this.$api[this.organizationApi.topName][
          this.organizationApi.name
        ](poshData)
        if (rs) {
          this.saveOrganizationList = JSON.stringify(rs.data)
          let list = rs.data.list ? rs.data.list : rs.data
          list = list.filter((i) => {
            return i.id !== this.organizationId
          })
          this.organizationList = list
        }

        // 获取岗位列表
      } else if (this.isAllStation && this.from === 'station') {
        rs = await this.$api.form.getAllStation({ id: this.organizationId })
        if (rs) {
          this.saveOrganizationList = JSON.stringify(rs.data)
          this.organizationList = rs.data
        }

        // 获取人员列表
      } else {
        // 参数  limit_rank=1 只有在传阅里这个对话框才需要，其它的没要求
        if (this.limitRank) {
          poshData.limit_rank = 1
        }

        rs = await this.$api.common.memberSelectWhole(poshData)
        if (rs) {
          const data = this.init_loop(rs.data, [])
          this.$store.dispatch(
            'form/SET_ORGS',
            JSON.parse(JSON.stringify(data))
          )
          this.saveOrganizationList = JSON.stringify(data)
          this.set_data_show(this.from, JSON.parse(JSON.stringify(data)))
        }
      }

      // 第次请求数据完成后触发   结构列表有list
      if (rs) this.$emit('init-complete', rs.data.list ? rs.data.list : rs.data)

      setTimeout(() => {
        this.leftLoading = false
      }, 10)
    },
    // 过滤节点
    filter_node(value, data) {
      if (!value) return true
      return data.name.includes(value)
    },
    set_data_show(from, data) {
      if (from === 'department') {
        this.strictly = true
        this.organizationList = this.recursion(data, [])
      } else {
        this.organizationList = this.recursion(data, [])
      }
    },
    // 全部岗位
    all_station_change(checked) {
      this.strictly = true
      this.allMember = false
      if (this.allStation) {
        this.set_all_option('station_member')
      } else {
        this.cancel_all_option()
      }
    },
    // 全部人员
    all_member_change() {
      if (!this.isCC && this.form.approve_pass === 'order') {
        this.$message.error('普通模式下只能选择单选')
        this.allMember = false
        return
      }
      this.strictly = true
      this.allStation = false
      if (this.allMember) {
        this.set_all_option('member')
      } else {
        this.cancel_all_option()
      }
    },
    // 全部岗位、全部人员 的操作
    set_all_option(type) {
      const filterRes = this.filter_checked_data(this.organizationList, type)
      this.organizationCheckedList = filterRes.list
      this.organizationCheckedKeys = filterRes.keys
      this.set_checked_data(filterRes.list)
    },
    // 取消选中
    cancel_all_option() {
      this.organizationCheckedList = []
      this.organizationCheckedKeys = []
      this.set_checked_data([])
    },
    // 字母排序
    member_sort(data, opt) {
      return data
    },
    // 过滤数据---- 只选人员
    filter_member_data(data, pushArray) {
      if (!pushArray) pushArray = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === 'member') {
          // 人员
          pushArray.push(data[i])
          pushArray = this.member_sort(pushArray, {
            name: 'name',
            text: 'name_txt'
          })
        } else if (data[i].child && data[i].child.length > 0) {
          this.filter_member_data(data[i].child, pushArray)
        }
      }
      return pushArray
    },
    // 过滤数据---- 只选岗位
    filter_station_data(data, pushArray) {
      if (!pushArray) pushArray = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === 'station') {
          pushArray.push(data[i])
        } else if (data[i].child && data[i].child.length > 0) {
          this.filter_station_data(data[i].child, pushArray)
        }
      }
      return pushArray
    },
    // 过滤数据---- 只选部门
    filter_department_data(data, pushArray) {
      if (!pushArray) pushArray = []
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === 'department') {
          pushArray = this.member_sort(pushArray, {
            name: 'name',
            text: 'name_txt'
          })
          pushArray.push(data[i])
        } else if (data[i].child && data[i].child.length > 0) {
          this.filter_department_data(data[i].child, pushArray)
        }
      }
      return pushArray
    },
    // 初始化一次数据，把ID都转为字符串，
    init_loop(data, filterArr) {
      data.forEach((item) => {
        item.id = String(item.id)
        item.key = String(item.id)
        item.disabled = false
        if (this.from && item.type !== this.from) {
          item.disabled = true
        }
        if (!item.child) item.child = []
        // 不做过滤
        if (!this.isFilterHide && !this.isFilterDepartment) {
          if (item.type === 'member') {
            item.name = item.name_txt
          }
          filterArr.push(item)
          if (item.child && item.child.length > 0) {
            const clone = JSON.parse(JSON.stringify(item))
            clone.child = []
            clone.child = this.init_loop(item.child, [])
          }
          return filterArr
        }
        if (this.isFilterHide) {
          // 过滤item.hide=1的数据不显示
          // filterArr.push(item);
          if (item.type === 'member' && !item.hide) {
            // item.hide=1的也要被过滤
            item.name = item.name_txt
            filterArr.push(item)
          } else if (item.child && item.child.length > 0) {
            const clone = JSON.parse(JSON.stringify(item))
            clone.child = []
            clone.child = this.init_loop(item.child, [])
            filterArr.push(clone)
          } else if (item.type !== 'department' && !item.hide) {
            filterArr.push(item)
          }
        } else if (item.type === 'member') {
          // item.hide=1的也要被过滤
          item.name = item.name_txt
          filterArr.push(item)
        } else if (item.child && item.child.length > 0) {
          const clone = JSON.parse(JSON.stringify(item))
          clone.child = []
          clone.child = this.init_loop(item.child, [])
          filterArr.push(clone)
        }
      })
      return filterArr
    },
    // 设置没有岗位或人员的部门为禁用，人员进行字母排序
    recursion(data, noneShowType) {
      for (let i = 0; i < data.length; i++) {
        if (
          !data[i].child.length &&
          ((data[i].type !== 'member' && this.filterNullCorresStation) ||
            (data[i].type === 'department' && this.isFilterDepartment))
        ) {
          data[i].disabled = true
        } else if (data[i].child.length) {
          data[i].child = this.recursion(data[i].child, noneShowType)
        }
        if (data[i].type === 'member') {
          data = JSON.parse(
            JSON.stringify(
              this.member_sort(data, { name: 'name', text: 'name_txt' })
            )
          )
        }
      }

      return data
    },
    // 过滤数据
    filter_checked_data(data, type, contData, keys) {
      if (!contData) contData = []
      if (!keys) keys = []
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        if (
          item.type === type ||
          (type === 'station_member' &&
            (item.type === 'station' || item.type === 'member') &&
            !item.disabled)
        ) {
          console.log(item.type, type)
          contData.push(item)
          keys.push(item.id)
        } else if (item.child && item.child.length > 0) {
          this.filter_checked_data(item.child, type, contData, keys)
        }
      }
      return {
        list: contData,
        keys
      }
    },
    // 直接设置选中节点
    set_checked_data(data, type) {
      if (this.$refs.organizationTree) {
        if (type === 'keys') {
          this.$refs.organizationTree.setCheckedKeys(data, true)
        } else {
          this.$refs.organizationTree.setCheckedNodes(data, true)
        }
      }
      if (!data.length) {
        this.organizationCheckedList = []
      }
    },
    del_checked_data(item) {
      this.organizationCheckedList = this.organizationCheckedList.filter(
        (i) => {
          return i.id !== item.id
        }
      )
      this.organizationCheckedKeys = this.organizationCheckedKeys.filter(
        (i) => {
          return i.id !== item.id
        }
      )

      this.set_checked_data(this.organizationCheckedList)
    },
    filterTree() {
      this.$refs.organizationTree.filter(this.search_key)
    },
    // 点击时触发
    check_change() {
      const checkedNodes = this.$refs.organizationTree.getCheckedNodes()
      const checkedKeys = this.$refs.organizationTree.getCheckedKeys()

      if (
        !this.isCC &&
        this.form.approve_pass === 'order' &&
        checkedKeys.length >= 2
      ) {
        this.$message.error('普通模式下只能选择单选')
        this.$refs.organizationTree.setCheckedNodes(
          this.organizationCheckedList
        )
        return
      }

      this.organizationCheckedList = checkedNodes
      this.organizationCheckedKeys = checkedKeys
    },
    handleSubmit() {
      if (
        !this.isCC &&
        this.form.approve_pass === 'order' &&
        this.organizationCheckedList.length >= 2
      ) {
        this.$message.error('普通模式下只能选择单选')
        return
      }

      // 会签和或签至少需要选择两个
      if (
        (this.form.approve_pass === 'or' || this.form.approve_pass === 'and') &&
        this.organizationCheckedList.length < 2
      ) {
        const typeLabel = this.form.approve_pass === 'or' ? '或签' : '会签'
        this.$message.error(`${typeLabel}模式下至少选择两名`)
        return
      }
      this.$emit('definite', this.organizationCheckedList)
    }
  }
}
</script>

<style lang="less" scoped>
.organization-box {
  .filter-btn {
    padding: 3px 0;
    width: 82px;
    min-width: 82px;
    height: 30px;
  }
  .dialog-input {
    /deep/.el-input__inner {
      height: 30px;
      line-height: 30px;
      border-color: #c4c6cc !important;
    }
  }
  .title {
    padding-bottom: 20px;
    font-size: 16px;
    color: #424242;
  }
  .search {
    margin-bottom: 22px;
    .search-button {
      width: 82px;
      margin-left: 5px;
      position: relative;
      top: -1px;
      color: #3f78f6;
    }
    .prefix {
      padding: 0 10px;
      font-size: 14px;
      color: #666666;
    }
    /deep/.el-input__inner {
      padding-left: 60px;
    }
  }
  .content {
    display: flex;
    .left {
      flex: 1;
      .checked-box-wrap {
        border: 1px solid #e1e2e7;
        padding: 10px 0;
        min-width: 282px;
        height: 320px;
        overflow: auto;
        margin-right: 16px;
        margin-top: 10px;
      }
    }
    .right {
      flex: 1;
      .checked-box-wrap {
        border: 1px solid #e1e2e7;
        height: 320px;
        overflow: auto;
        margin-left: 16px;
        padding: 10px 0;
        margin: 10px 0 0 0;
        .item {
          padding: 5px 10px;
          display: flex;
          align-items: center;
          .name {
            flex: 1;
          }
          .del {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
