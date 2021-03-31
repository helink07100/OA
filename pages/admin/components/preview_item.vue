<template>
  <div class="box-item">
    <div class="item">
      <p v-if="!edit" class="el-checkbox__label">
        {{ item.name }}
      </p>
      <el-checkbox
        v-else-if="edit"
        v-model="item.checked"
        @change="checkedHandler"
        >{{ item.name }}</el-checkbox
      >
    </div>
    <ul v-if="isParent" class="item-children">
      <li
        v-for="child in item.children"
        :key="child.name"
        :class="{ divider: hasChild(child) }"
      >
        <PreviewItem
          :item="child"
          :edit="edit"
          :menu-check="menuCheck"
          @change="changeHandler"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PreviewItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    edit: {
      type: Boolean,
      default: false
    },
    menuCheck: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    isParent() {
      return this.item.children && this.item.children.length
    },
    itemValue() {
      return `${this.item.ct}-${this.item.ac}`
    }
  },
  watch: {
    'item.checked'() {
      if (this.item.ct) {
        const index = this.menuCheck.findIndex(
          (item) => item === this.itemValue
        )
        if (this.item.checked) {
          if (index === -1) {
            this.menuCheck.push(this.itemValue)
          }
        } else {
          index !== -1 && this.menuCheck.splice(index, 1)
        }
      }
    }
  },
  created() {
    if (!this.isParent) {
      const checked = this.menuCheck.includes(this.itemValue)
      this.$set(this.item, 'checked', checked)
      this.$emit('change', checked)
    }
  },
  methods: {
    hasChild(item) {
      return item.children && item.children.length
    },
    checkedHandler(val) {
      this.$set(this.item, 'checked', val)
      this.$emit('change', val)
      if (this.isParent) {
        this.loopChangeChildren(this.item.children, val)
      }
    },
    changeHandler(isCheck) {
      if (!isCheck) {
        this.$set(this.item, 'checked', false)
      } else {
        const isAll = this.item.children.find((item) => !item.checked)
        this.$set(this.item, 'checked', !isAll)
      }
      this.$emit('change', this.item.checked)
    },
    loopChangeChildren(children, val) {
      children.forEach((child) => {
        this.$set(child, 'checked', val)
        if (child.children && child.children.length) {
          this.loopChangeChildren(child.children, val)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.box-item,
.item-children {
  display: flex;
  flex-wrap: wrap;
}
.box-item {
  margin-right: 20px;
}
.item-children {
  flex: 1;
  margin-top: -10px;
  li {
    margin-top: 10px;
  }
}
.item {
  width: 150px;
  /deep/ .el-checkbox {
    .el-checkbox__input {
      vertical-align: top;
      line-height: 22px;
    }
    .el-checkbox__label {
      white-space: normal;
    }
  }
}
.divider + .divider {
  border-top: 1px solid #ebebeb;
  padding-top: 10px;
  width: 100%;
}
</style>
