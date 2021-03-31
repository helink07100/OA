<!-- 
 *@name dialog-select-organization 弹窗选择组织数据组件
 得找时候重写一下JS处理逻辑
-->
<template>
  <el-dialog
    class="oa-dialog"
    :visible="dialogVisible"
    :width="width"
    @close="dialog_cancel"
  >
    <div slot="title" class="oa-dialog-header">{{ dialogTitle }}</div>
    <div v-if="!organizationHide" class="oa-dialog-body">
      <div class="organization-box">
        <div v-if="false" class="title">{{ dialogTitle }}</div>
        <div class="search">
          <el-input
            v-model="search_key"
            :style="{ width: '200px' }"
            placeholder="搜索"
            prefix-icon="el-icon-search"
          ></el-input>
          <el-button v-if="false" class="search-button">搜索</el-button>
        </div>
        <div class="content">
          <div v-loading="leftLoading" class="left">
            <div :style="{ height: '20px' }">
              <el-checkbox v-if="!from" v-model="filterNullCorresStation"
                >过滤无对应人之岗位</el-checkbox
              >
            </div>
            <div class="checked-box-wrap">
              <el-tree
                ref="organizationTree"
                :props="props"
                :data="organizationList"
                :node-key="nodeKey"
                show-checkbox
                :check-strictly="strictly"
                :default-expand-all="true"
                :filter-node-method="filterNode"
                @check-change="check_change"
              >
              </el-tree>
            </div>
          </div>
          <div class="right">
            <div :style="{ height: '20px' }">
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
            </div>
            <ul class="checked-box-wrap">
              <template v-for="item in organizationCheckedList">
                <li v-if="item.from != 'all'" :key="item.key" class="item">
                  <span class="name">{{ item.name }}</span>
                  <span
                    class="del text-danger"
                    @click="del_checked_data(item.key)"
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
      <el-button @click="dialog_cancel">取 消</el-button>
      <el-button type="primary" @click="dialog_definite">{{
        definiteText ? definiteText : '确 定'
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'DialogSelectOrganization',
  props: {
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
    id: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: ''
    },
    nodeKey: {
      type: String,
      default: 'key'
    },
    from: {
      type: String,
      default: ''
    }, // 选择数据类型，目前类型有4种：organization （组织），department（部门），station （岗位），member（人员）
    limitRank: Boolean,
    isFilterHide: Boolean, // 是否过滤人员数据hide字段=0时不显示
    isFilterDepartment: Boolean // 是否过滤无下级数据的部门
  },
  data() {
    return {
      loading: false,
      filterNullCorresStation: false,
      allStation: false,
      allMember: false,
      isDel: false, // 用于判断断是否操作删除
      search_key: '',
      strictly: false,
      props: {
        label: 'name',
        children: 'child'
      },
      saveOrganizationList: '', // 必需保存字符串类型，用JSON.stringify转，否则会存在
      organizationList: [],
      organizationCheckedKeys: [],
      organizationCheckedList: [],
      leftLoading: false,
      stationCheckedList: [], // 全部岗位时用到
      memberCheckedList: [] // 全部人员时用到
    }
  },
  computed: {
    organizationId() {
      return this.$store.state.user.user.organization_id
    }
  },
  watch: {
    filterNullCorresStation(nv, ov) {
      // 过滤无对应人之岗位
      if (nv) {
        this.organizationList = this.recursion(this.organizationList, 'station')
      } else {
        this.set_data_show(this.from, JSON.parse(this.saveOrganizationList))
      }
    },
    search_key(val) {
      this.$refs.organizationTree.filter(val)
    }
  },
  mounted() {
    this.get_member_select(this.organizationId)
  },
  methods: {
    filterNode(value, data) {
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
    all_station_change(checked) {
      // 全部岗位
      this.allMember = false
      if (this.allStation) {
        this.set_all_option('station_member')
      } else {
        this.cancel_all_option()
      }
    },
    all_member_change() {
      // 全部人员
      this.allStation = false
      if (this.allMember) {
        this.set_all_option('member')
      } else {
        this.cancel_all_option()
      }
    },
    set_all_option(type) {
      // 全部岗位、全部人员 的操作
      const filterRes = this.filter_checked_data(this.organizationList, type)
      this.organizationCheckedList = filterRes.list
      this.organizationCheckedKeys = filterRes.keys
      this.set_checked_data(filterRes.list)
    },
    cancel_all_option() {
      // 取消选中
      this.organizationCheckedList = []
      this.organizationCheckedKeys = []
      this.set_checked_data([])
    },
    member_sort(data, opt) {
      // 字母排序
      data.sort((a, b) => {
        if (!a[opt.name] && a[opt.text]) {
          a[opt.name] = a[opt.text]
          return a[opt.text].localeCompare(b[opt.text])
        } else {
          return a[opt.name].localeCompare(b[opt.name])
        }
      })
      return data
    },
    filter_member_data(data, pushArray) {
      // 只选人员
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
    filter_station_data(data, pushArray) {
      // 只选岗位
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
    filter_department_data(data, pushArray) {
      // 只选部门
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
    initLoop(data, filterArr) {
      // 初始化一次数据，把ID都转为字符串，
      const that = this
      data.forEach(function(item) {
        item.id = String(item.id)
        item.key = String(item.id)
        item.disabled = false
        if (that.from && item.type !== that.from) {
          item.disabled = true
        }
        if (!item.child) item.child = []
        // 不做过滤
        if (!that.isFilterHide && !that.isFilterDepartment) {
          if (item.type === 'member') {
            // item.name = item.key + '-' + item.name_txt
            item.name = item.name_txt
          }
          filterArr.push(item)
          if (item.child && item.child.length > 0) {
            const clone = JSON.parse(JSON.stringify(item))
            clone.child = []
            clone.child = that.initLoop(item.child, [])
            // filterArr.push(clone)
          }
          return filterArr
        }
        if (that.isFilterHide) {
          // 过滤item.hide=1的数据不显示
          // filterArr.push(item);
          if (item.type === 'member' && !item.hide) {
            // item.hide=1的也要被过滤
            item.name = item.name_txt
            filterArr.push(item)
          } else if (item.child && item.child.length > 0) {
            const clone = JSON.parse(JSON.stringify(item))
            clone.child = []
            clone.child = that.initLoop(item.child, [])
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
          clone.child = that.initLoop(item.child, [])
          filterArr.push(clone)
        }
      })
      return filterArr
    },
    recursion(data, noneShowType) {
      // 设置没有岗位或人员的部门为禁用，人员进行字母排序
      for (let i = 0; i < data.length; i++) {
        if (
          !data[i].child.length &&
          ((data[i].type !== 'member' && this.filterNullCorresStation) ||
            (data[i].type === 'department' && this.isFilterDepartment))
        ) {
          data[i].disabled = true
        } else if (data[i].child.length) {
          this.recursion(data[i].child, noneShowType)
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
    filter_checked_data(data, type, contData, keys) {
      // 过滤数据
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
    async get_member_select(id, callback) {
      this.leftLoading = true
      const poshData = {
        organization_id: id
      }
      if (this.limitRank) {
        // 参数  limit_rank=1 只有在传阅里这个对话框才需要，其它的没要求
        poshData.limit_rank = 1
      }
      const rs = await this.$api.common.memberSelectWhole(poshData)
      if (rs.status === 0) {
        const data = this.initLoop(rs.data, [])
        this.saveOrganizationList = JSON.stringify(data)
        this.set_data_show(this.from, data)
        this.$store.commit('form/changeOrganizations', data)
        this.$emit('init-complete') // 第次请求数据完成后触发
      }
      setTimeout(() => {
        this.leftLoading = false
      }, 500)
    },
    dialog_cancel() {
      this.$emit('cancel')
    },
    dialog_definite() {
      this.$emit('definite', this.organizationCheckedList)
    },
    check_change(item, isChecked) {
      if (isChecked) {
        // 选中
        let isPush = false
        const keys = this.organizationCheckedKeys
        for (let i = 0; i < keys.length; i++) {
          // 对比一下是否已经选中，去重哲作
          if (keys[i] === item.id) {
            isPush = true
          }
        }
        if (!isPush && !this.from) {
          if (item.type === 'member' || item.type === 'station') {
            this.organizationCheckedList.push(item)
            this.organizationCheckedKeys.push(item.key)
          }
        } else if (!isPush && item.type === this.from) {
          this.organizationCheckedList.push(item)
          this.organizationCheckedKeys.push(item.key)
        }
        // this.from === 'department' &&
      } else {
        // 取消选中
        this.del_checked_data(item.key, true)
      }
    },

    del_checked_data(key, isSetChecked) {
      const checked_list = this.organizationCheckedList
      for (let i = 0; i < checked_list.length; i++) {
        if (checked_list[i].key === key) {
          checked_list.splice(i, 1)
          this.allMember = false
          this.allStation = false
          break
        }
      }
      const keys = this.organizationCheckedKeys
      for (let k = 0; k < keys.length; k++) {
        if (keys[k] === key) {
          keys.splice(k, 1)
          break
        }
      }
      this.organizationCheckedKeys = keys
      this.organizationCheckedList = checked_list
      if (!isSetChecked) {
        this.set_checked_data(checked_list)
      }
    },
    set_checked_data(data, type) {
      if (this.$refs.organizationTree) {
        if (type === 'keys') {
          this.$refs.organizationTree.setCheckedKeys(data)
        } else {
          this.$refs.organizationTree.setCheckedNodes(data)
        }
      }
      if (!data.length) {
        this.organizationCheckedList = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.organization-box {
  .title {
    padding-bottom: 20px;
    font-size: 16px;
    color: #424242;
  }
  .search {
    .search-button {
      width: 82px;
      margin-left: 5px;
      position: relative;
      top: -1px;
      color: #3f78f6;
    }
  }
  .content {
    display: flex;
    margin-top: 10px;
    .left {
      flex: 1;
      .checked-box-wrap {
        border: 1px solid #e1e2e7;
        padding: 10px;
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
