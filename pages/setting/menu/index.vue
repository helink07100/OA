<template>
  <LayoutPage title="菜单管理">
    <div slot="header-right">
      <el-checkbox-group v-model="tab" size="mini">
        <el-checkbox-button true-label="tree">Tree</el-checkbox-button>
        <el-checkbox-button true-label="json">JSON</el-checkbox-button>
      </el-checkbox-group>
    </div>
    <div class="page-content">
      <p class="text-info mb-md">
        所有页面包括接口都需要在这里添加，跟权限管理挂钩，默认不显示在菜单，需要显示的话要勾选
      </p>

      <div v-if="tab === 'tree'" class="tab-content">
        <el-input v-model="filter" placeholder="输入关键字进行过滤"> </el-input>

        <div class="menu-tree">
          <el-tree
            ref="tree"
            class="filter-tree"
            :data="menus"
            :filter-node-method="filterNode"
          >
            >
            <div slot-scope="{ node, data }" class="custom-tree-node">
              <span class="label">
                <i :class="data.icon"></i>
                {{ node.label }}
              </span>
              <div class="option">
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="编辑"
                  placement="bottom"
                >
                  <i
                    class="el-icon-edit"
                    @click.stop="editForm(node, data, 'edit')"
                  ></i>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="添加"
                  placement="bottom"
                >
                  <i
                    class="el-icon-circle-plus-outline"
                    @click.stop="editForm(node, data, 'add')"
                  ></i>
                </el-tooltip>
                <el-tooltip
                  class="item"
                  effect="dark"
                  content="删除"
                  placement="bottom"
                >
                  <i
                    class="el-icon-remove-outline text-danger"
                    @click.stop="removeHandle(node, data)"
                  ></i>
                </el-tooltip>
              </div>
            </div>
          </el-tree>
        </div>
      </div>
      <div v-else class="tab-content">
        <Editor :data="menus" @success="jsonEditorSuccessHandler" />
      </div>
    </div>

    <ModifyDialog ref="modifyDialog" @submit="formSubmit" />
  </LayoutPage>
</template>

<script>
import ModifyDialog from './components/modify'
import Editor from './components/json_editor'
export default {
  components: {
    ModifyDialog,
    Editor
  },
  data: () => ({
    tab: 'tree',
    filter: '',
    editNodeData: {}, // 当前编辑的node数据
    menus: []
  }),
  watch: {
    filter(val) {
      this.$refs.tree.filter(val)
    }
  },
  mounted() {
    this.menus = JSON.parse(JSON.stringify(this.$store.state.menus.menus))
  },
  methods: {
    formSubmit(form) {
      const { editNodeData } = this
      if (form.type === 'edit') {
        editNodeData.label = form.label
        editNodeData.icon = form.icon
        if (form.isLink === 0) {
          if (!editNodeData.children) {
            this.$set(editNodeData, 'children', [])
          }
        } else {
          editNodeData.path = form.path
          editNodeData.ac = form.ac
          editNodeData.ct = form.ct
          editNodeData.display = form.display
        }
      } else {
        const node = {
          label: form.label,
          icon: form.icon
        }
        if (form.isLink === 0) {
          node.children = []
        } else {
          node.path = form.path
          node.ct = form.ct
          node.ac = form.ac
          node.display = form.display
        }
        this.append(editNodeData, node)
      }
      this.showEditForm = false

      // 更新store
      this.updateMenus()
    },
    removeHandle(node, data) {
      this.$confirm('此操作将同时删除子菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const parent = node.parent
          const children = parent.data.children || parent.data
          const index = children.findIndex((d) => d.label === data.label)
          children.splice(index, 1)

          // 更新store
          this.updateMenus()
        })
        .catch(() => {})
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.includes(value)
    },
    append(data, node) {
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(node)
    },
    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex((d) => d.id === data.id)
      children.splice(index, 1)

      // 更新store
      this.updateMenus()
    },
    editForm(node, data, type) {
      this.editNodeData = data
      const form = {
        type
      }
      if (type === 'edit') {
        form.label = data.label
        form.icon = data.icon
        form.isLink = data.children ? 0 : 1
        form.ct = data.ct
        form.ac = data.ac
        form.path = data.path
        form.display = data.display
      } else {
        form.label = ''
        form.icon = ''
        form.path = ''
        form.ct = ''
        form.ac = ''
        form.isLink = 0
        form.display = 0
      }

      this.$refs.modifyDialog.show(form)
    },
    jsonEditorSuccessHandler(json) {
      this.menus = json
      // 更新store
      this.updateMenus()
    },
    async updateMenus() {
      try {
        const menusString = JSON.stringify(this.menus)
        const rs = await this.$api.common.saveMenus(menusString)
        if (rs) {
          this.$message.success(this.$t('更新成功'))
          this.$store.commit('menus/update', JSON.parse(menusString))
        }
      } catch (e) {
        this.$message(e.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #ededed;
  margin-bottom: 20px;
}
.title {
  font-size: 24px;
}
.page-content {
  padding: 15px;
}
.page-content,
.tab-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.menu-tree {
  margin-top: 20px;

  /deep/ .el-tree-node__content {
    height: auto;
  }
}
.custom-tree-node {
  display: flex;
  width: 100%;
  line-height: 40px;
  .label {
    flex: 1;
  }

  .option {
    color: #2086f9;
    .item {
      font-size: 18px;
      padding: 0 10px;
      margin-left: 10px;
    }
  }
}
</style>
