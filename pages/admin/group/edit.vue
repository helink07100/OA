<template>
  <LayoutPage class="pb-none" title="" :loading="loading">
    <el-form ref="form" :model="form" label-width="120px">
      <PageCard :title="$t('用户组信息')">
        <el-form-item
          :label="$t('用户组名')"
          :rules="{ required: true, message: $t('用户组名不能为空') }"
          prop="name"
        >
          <el-input
            v-model="form.name"
            :placeholder="$t('请输入用户组姓名')"
          ></el-input>
        </el-form-item>
      </PageCard>

      <PageCard :title="$t('权限管理')">
        <Preview
          :edit="true"
          :menu-data="menData"
          :menu-check="form.purviews"
        />
      </PageCard>

      <PageCard class="sticky">
        <div class="fx-center">
          <el-button type="primary" @click="save()">
            提交
          </el-button>
        </div>
      </PageCard>
    </el-form>
  </LayoutPage>
</template>

<script>
import Preview from '../components/preview'
export default {
  components: {
    Preview
  },
  async asyncData({ app, query }) {
    const { id } = query
    try {
      if (typeof id === 'undefined') {
        throw new TypeError(app.i18n.t('参数错误'))
      }

      const rs = await app.$api.admin.groupDetail(id)
      if (rs) {
        let purviews = rs.data.sel_purviews.split(',')
        // 清除空选项
        if (purviews.length === 1) {
          if (purviews[0] === '') {
            purviews.pop()
          } else if (purviews[0] === '*') {
            // 所有权限 *
            const loopChangeChildren = (children, val = []) => {
              children.forEach((child) => {
                if (child.children && child.children.length) {
                  loopChangeChildren(child.children, val)
                } else {
                  val.push(`${child.ct}-${child.ac}`)
                }
              })
            }
            const purviewsArr = []
            loopChangeChildren(rs.data.purviews, purviewsArr)
            purviews = purviewsArr
          }
        }

        return {
          id,
          menData: rs.data.purviews,
          form: {
            name: rs.data.sel_name,
            purviews
          },
          loading: false
        }
      }
    } catch (e) {
      app.$message.error(e.message)
      app.router.back()
    }
  },
  data: () => ({
    loading: true,
    form: {
      name: '',
      purviews: []
    },
    id: '',
    name: '',
    menData: []
  }),
  methods: {
    save() {
      if (this.loading) return false
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          const res = await this.$api.admin.groupEdit({
            id: this.id,
            name: this.form.name,
            purviews: this.form.purviews.join(',')
          })

          if (res) {
            this.$message.success(this.$t('修改成功'))
            this.loading = false
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.sticky {
  position: sticky;
  z-index: 10;
  bottom: 0;
  background-color: #fff;
  border-top: 1px solid #ebebeb;
}
</style>
