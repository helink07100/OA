<template>
  <div class="login-page">
    <div class="form">
      <div class="center">
        <h2 class="title">忘记密码</h2>
        <p class="sub-tit">Get Back My Password</p>

        <div class="form-control">
          <el-input
            v-model="form.username"
            class="input"
            placeholder="输入账号 / ID"
            prefix-icon="iconfont icon-zhanghao"
            @keypress.native.stop.prevent.enter="submit"
          ></el-input>
        </div>

        <div class="form-control">
          <el-input
            v-model="form.email"
            class="input"
            placeholder="输入电子邮件 / Email"
            prefix-icon="iconfont icon-mima"
            @keypress.native.stop.prevent.enter="submit"
          ></el-input>
        </div>

        <div class="form-control form-submit">
          <el-button
            class="submit"
            type="primary"
            round
            :disabled="disabled"
            :loading="posting"
            @click="submit"
            >{{ posting ? $t('global.submitting') : '确定/Submit' }}</el-button
          >
        </div>
      </div>
      <p class="copyright">傲创网络科技 ©</p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'page',
  data: () => ({
    form: {
      username: '',
      email: ''
    },
    posting: false
  }),
  computed: {
    disabled() {
      return (
        !String(this.form.username).trim() || !String(this.form.email).trim()
      )
    }
  },
  methods: {
    async submit() {
      if (this.posting || this.disabled) return false
      this.posting = true
      try {
        await this.$api.common.forgetPwd({
          username: this.form.username,
          email: this.form.email
        })
        this.$message({ message: '邮件已成功发出', type: 'success' })
        setTimeout(() => {
          window.location.href = '/login'
        }, 1000)
      } catch (e) {
        this.$message.error(e.message)
      }
      this.posting = false
    }
  }
}
</script>

<style lang="less" scoped>
.login-page {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background-attachment: scroll;
  background-image: url('~assets/image/login-bg.png');
  background-repeat: no-repeat;
  background-position: right center;
  background-size: auto 100%;
  background-color: #fff;

  /deep/.el-checkbox__inner {
    border-radius: 4px !important;
  }
}
.logo {
  margin-bottom: 31px;
  width: 80px;
  height: 80px;
}
.form {
  justify-content: space-between;
  margin-left: 100px;
  width: 440px;

  &,
  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .center {
    flex: 1;
    justify-content: center;
    width: 390px;
  }
}

.title {
  font-size: 34px;
  color: #5d5d5d;
}
.sub-tit {
  font-size: 17px;
  color: #7f7f7f;
  margin-bottom: 42px;
}
.form-control {
  margin-bottom: 20px;
  width: 100%;
  .input /deep/ input {
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #f0f0f0;

    &:focus {
      border-color: #409eff;
      /deep/ & + .el-input__prefix {
        transition: all 0s;
        color: #409eff;
      }
    }
  }
}
.form-submit {
  margin-top: 20px;

  .el-button.is-round {
    padding: 12px 23px;
    height: 40px;
  }
}
.submit {
  width: 100%;
}

.copyright {
  padding-bottom: 40px;
  font-size: 12px;
  color: #37474f;
  letter-spacing: 1px;
}
</style>
