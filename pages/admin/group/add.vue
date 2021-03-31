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

      <PageCard class="sticky">
        <el-button type="primary" @click="save()">
          提交
        </el-button>
      </PageCard>
    </el-form>
  </LayoutPage>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    form: {
      name: ''
    }
  }),
  methods: {
    save() {
      if (this.loading) return false
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.loading = true
          const res = await this.$api.admin.groupAdd({
            name: this.form.name
          })

          if (res) {
            this.$message.success(this.$t('添加成功'))
            this.loading = false
            this.$router.replace('/admin/group').catch(() => {})
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
