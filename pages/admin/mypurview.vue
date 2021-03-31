<template>
  <LayoutPage :title="$t('个人资料')" :loading="loading">
    <PageCard class="no-title">
      <el-row :style="{ 'padding-bottom': '96px' }">
        <el-col class="card-detail-item" :span="12">
          <p class="txt-label">{{ $t('用户名') }}：</p>
          <p class="txt-info">{{ info.name }}</p>
        </el-col>
        <el-col class="card-detail-item" :span="12">
          <p class="txt-label">{{ $t('别名') }}：</p>
          <p class="txt-info">{{ info.nickname }}</p>
        </el-col>
        <el-col class="card-detail-item" :span="12">
          <p class="txt-label">{{ $t('公司') }}：</p>
          <p class="txt-info">{{ info.organization_name }}</p>
        </el-col>
        <el-col class="card-detail-item" :span="12">
          <p class="txt-label">{{ $t('部门') }}：</p>
          <p class="txt-info">{{ info.groupname }}</p>
        </el-col>
        <el-col class="card-detail-item" :span="12">
          <p class="txt-label">{{ $t('岗位名称') }}：</p>
          <p class="txt-info">{{ info.station_name }}</p>
        </el-col>
        <el-col class="card-detail-item" :span="12">
          <p class="txt-label">{{ $t('工号') }}：</p>
          <p class="txt-info">{{ info.username }}</p>
        </el-col>
        <el-col class="card-detail-item" :span="24">
          <p class="txt-label" style="line-height:40px">
            {{ $t('系统电子邮件通知') }}：
          </p>
          <p class="txt-info">
            <el-select
              v-model="info.set_email"
              placeholder="选择系统电子邮件通知"
              :style="{ width: '100%' }"
              :clearable="false"
              @change="changeEmail"
            >
              <el-option label="开启" :value="1"></el-option>
              <el-option label="关闭" :value="-1"></el-option>
            </el-select>
          </p>
        </el-col>
        <el-col class="card-detail-item" :span="12">
          <p class="txt-label">{{ $t('上次登录时间') }}：</p>
          <p class="txt-info">
            {{ info.logintime }}
          </p>
        </el-col>
        <el-col class="card-detail-item" :span="12">
          <p class="txt-label">{{ $t('上次登录IP') }}：</p>
          <p class="txt-info">{{ info.loginip }}</p>
        </el-col>
      </el-row>
    </PageCard>
  </LayoutPage>
</template>

<script>
import { mapState } from 'vuex'
export default {
  async asyncData({ app }) {
    try {
      const rs = await app.$api.admin.mypurview()
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
          info: rs.data.info,
          menData: rs.data.purviews,
          purviews,
          loading: false
        }
      }
    } catch (e) {
      app.$message.error(e.message)
    }
  },
  data: () => ({
    loading: true,
    info: {
      name: '',
      groupname: ''
    },
    purviews: [],
    menData: []
  }),
  computed: {
    ...mapState({
      user: (state) => state.user.user
    })
  },
  methods: {
    async changeEmail() {
      const res = await this.$api.admin.setEmail({
        set_email: this.info.set_email,
        uid: this.user.uid
      })
      if (res) {
        this.$message.success(this.$t('设置成功'))
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
