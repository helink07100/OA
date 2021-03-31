<template>
  <LayoutPage :title="pageTitle" :loading="loading">
    <div class="page-content">
      <el-form
        ref="form"
        class="form-box"
        label-width="120px"
        :model="form"
        :rules="rules"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="App系统" prop="os">
          <el-select
            v-model="form.os"
            placeholder="请选择选择系统版本"
            :style="{ width: '100%' }"
          >
            <el-option
              v-for="(item, index) in base.os"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="更新地址" prop="app_url">
          <el-input
            v-model="form.app_url"
            placeholder="请输入更新地址"
          ></el-input>

          <el-row>
            <el-button
              size="mini"
              type="primary"
              round
              plain
              @click="setAppUlr('ios')"
              >AppStore</el-button
            >
            <el-button
              size="mini"
              type="primary"
              round
              plain
              @click="setAppUlr('android')"
              >Google Play</el-button
            >
          </el-row>
        </el-form-item>
        <el-form-item label="最新版本" prop="version">
          <el-input
            v-model="form.version"
            placeholder="请输入最新版本"
          ></el-input>
        </el-form-item>

        <el-form-item label="更新规则" prop="rules">
          <div
            v-for="(rule, index) in form.rules"
            :key="index"
            class="rule-item"
          >
            <el-form-item label="app版本号">
              <div class="flex-item">
                <el-select v-model="rule.condition" :style="{ width: '80px' }">
                  <el-option
                    v-for="(item, index) in base.condition"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>

                <el-input
                  v-model="rule.version"
                  type="input"
                  :style="{ width: '100px', margin: '0 20px' }"
                  placeholder="版本号"
                ></el-input>

                <el-select
                  v-model="rule.update_mode"
                  :style="{ width: '120px', marginRight: '20px' }"
                >
                  <el-option
                    v-for="(item, index) in base.mode"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>

                <el-button v-if="index === 0" type="success" @click="addRule"
                  >添加</el-button
                >
                <el-button v-else type="danger" @click="delRule(index)"
                  >删除</el-button
                >
              </div>
            </el-form-item>
          </div>
        </el-form-item>

        <el-form-item label="中文更新描述" prop="tips.zh-cn">
          <el-input
            v-model="form.tips['zh-cn']"
            type="textarea"
            placeholder="请输入中文更新描述"
          ></el-input>
        </el-form-item>

        <el-form-item label="英文更新描述" prop="tips.en">
          <el-input
            v-model="form.tips.en"
            type="textarea"
            placeholder="请输入英文更新描述"
          ></el-input>
        </el-form-item>

        <el-form-item label="英文更新描述" prop="tips.km">
          <el-input
            v-model="form.tips.km"
            type="textarea"
            placeholder="请输入柬文更新描述"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </LayoutPage>
</template>

<script>
const DEFAULT_RULE = {
  version: '',
  condition: 'lt',
  update_mode: '1'
}

export default {
  data: () => ({
    loading: false,
    base: {
      os: [
        {
          label: 'ios',
          value: 'ios'
        },
        {
          label: 'android',
          value: 'android'
        }
      ],
      condition: [
        {
          label: '<',
          value: 'lt'
        },
        {
          label: '<=',
          value: 'le'
        },
        {
          label: '>',
          value: 'gt'
        },
        {
          label: '>=',
          value: 'ge'
        },
        {
          label: '=',
          value: 'eq'
        },
        {
          label: '!=',
          value: 'ne'
        }
      ],
      mode: [
        {
          label: '强制更新',
          value: '2'
        },
        {
          label: '提示更新',
          value: '1'
        }
      ]
    },
    form: {
      id: '',
      title: '',
      os: 'ios',
      bound_id: 'com.awesome.autoworkOA',
      version: '',
      app_url: '',
      rules: [
        {
          ...DEFAULT_RULE
        }
      ],
      tips: {
        'zh-cn': '发现新版本，请更新应用以获得更好的体验。',
        km:
          'រកឃើញកំណែថ្មីសូមធ្វើបច្ចុប្បន្នភាពកម្មវិធីដើម្បីទទួលបានបទពិសោធន៍ល្អប្រសើរ។',
        en:
          'A new version was found, please update the app for a better experience.'
      }
    },
    rules: {
      os: { required: true, message: '请选择系统版本' },
      title: { required: true, message: '请选择标题' },
      version: { required: true, message: '请选择版本' },
      'tips.zh-cn': {
        required: true,
        message: '请输入中文更新描述',
        trigger: 'blur'
      },
      'tips.en': {
        required: true,
        message: '请输入英文更新描述',
        trigger: 'blur'
      },
      'tips.km': {
        required: true,
        message: '请输入柬文更新描述',
        trigger: 'blur'
      },
      realname: {
        bound_id: true,
        message: '请输入包名',
        trigger: 'blur'
      },
      app_url: {
        required: true,
        message: '请输入更新地址',
        trigger: 'blur'
      },
      rules: {
        required: true
      }
    }
  }),
  computed: {
    pageTitle() {
      return (this.form.id === '' ? '添加' : '编辑') + 'app版本'
    }
  },
  created() {
    const { id } = this.$route.query
    if (typeof id !== 'undefined') {
      this.form.id = id
      this.getEditBaseData()
    }
  },
  methods: {
    setAppUlr(type) {
      switch (type) {
        case 'ios':
          this.form.app_url =
            'https://apps.apple.com/cn/app/iccc-互联网专属移动办公oa系统/id1493150724'
          break
        case 'android':
          this.form.app_url =
            'https://play.google.com/store/apps/details?id=com.awesome.autoworkOA'
          break
      }
    },
    addRule() {
      this.form.rules.push({ ...DEFAULT_RULE })
    },
    delRule(index) {
      this.form.rules.splice(index, 1)
    },
    async getEditBaseData() {
      this.loading = true
      const res = await this.$api.app.detail(this.form.id)
      if (res) {
        this.form.app_url = res.data.app_url
        this.form.bound_id = res.data.bound_id
        this.form.os = res.data.os
        this.form.title = res.data.title
        this.form.version = res.data.version

        const tips =
          res.data.tips && res.data.tips.length > 0
            ? res.data.tips[0]
            : { en: '', 'zh-cn': '', km: '' }

        this.form.tips.en = tips.en ?? ''
        this.form.tips['zh-cn'] = tips['zh-cn'] ?? ''
        this.form.tips.km = tips.km ?? ''

        if (res.data.rules && res.data.rules.length) {
          this.form.rules = res.data.rules
        } else {
          this.form.rules = [{ ...DEFAULT_RULE }]
        }
      }
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    async submitForm() {
      if (this.loading) return false
      this.loading = true

      const postForm = {
        title: this.form.title,
        app_url: this.form.app_url,
        bound_id: this.form.bound_id,
        os: this.form.os,
        rules: this.form.rules,
        version: this.form.version,
        tips: [
          {
            ...this.form.tips
          }
        ]
      }

      const isEdit = this.form.id !== ''

      if (isEdit) {
        postForm.id = this.form.id
      }

      const res = await this.$api.app.saveVersion(postForm)
      if (res) {
        this.$message.success(this.$t((isEdit ? '修改' : '添加') + '成功'))
        this.$router.replace('/app/version')
      }
      this.loading = false
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          for (let i = 0, len = this.form.rules.length; i < len; i++) {
            const rule = this.form.rules[i]
            rule.version = String(rule.version).trim()
            if (!rule.version) {
              this.$message.error('请完善更新规则')
              return false
            }
          }
          this.submitForm()
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.rule-item {
  & + & {
    margin-top: 22px;
  }
}
</style>
