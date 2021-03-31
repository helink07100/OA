<template>
  <div class="login-page">
    <div class="form">
      <div class="center">
        <img src="~/assets/image/logo.png" class="logo" />
        <h2 class="title">欢迎使用傲胜集团OA系统</h2>
        <p class="sub-tit">Awesome Global Investment Group OA SYSTEM</p>

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
            v-model="form.password"
            class="input"
            placeholder="输入密码 / Password"
            prefix-icon="iconfont icon-mima"
            show-password
            @keypress.native.stop.prevent.enter="submit"
          ></el-input>
        </div>

        <div class="form-control remember">
          <el-checkbox v-model="form.remember"
            >自动登录 / Keep me logged in</el-checkbox
          >
        </div>

        <div class="form-control form-submit">
          <el-button
            class="submit"
            type="primary"
            round
            :disabled="disabled"
            :loading="posting"
            @click="submit"
            >{{ posting ? $t('global.logining') : '登录/Login' }}</el-button
          >
        </div>

        <div class="form-control forget_pwd">
          <a href="/forget_pwd">忘记密码</a>
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
      password: '',
      remember: 0
    },
    posting: false
  }),
  computed: {
    disabled() {
      return (
        !String(this.form.username).trim() || !String(this.form.password).trim()
      )
    }
  },
  methods: {
    async submit() {
      if (this.posting || this.disabled) return false
      this.posting = true
      try {
        const rs = await this.$api.common.login({
          username: this.form.username,
          password: this.form.password
        })
        if (rs.code === this.$enum.__AUTH_RESETPWD__) {
          // 第一次登陆，需要先修改初始密码
          this.$store.commit('user/updateUser', rs.data)
          this.$router.replace('/reset_pwd').catch(() => {})
        } else if (rs) {
          this.$store.commit('user/updateUser', rs.data)
          this.$router.replace('/').catch(() => {})
        }
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
.forget_pwd {
  text-align: center;
  & a:hover {
    color: #409eff;
  }
}
.submit {
  width: 100%;
}
.remember {
  padding: 0 5px;
}
.copyright {
  padding-bottom: 40px;
  font-size: 12px;
  color: #37474f;
  letter-spacing: 1px;
}
</style>
