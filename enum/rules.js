/**
 * 公用表单验证
 */

// 密码验证
const password = (rule, value, callback) => {
  let lv = 0
  if (value.match(/[A-Z]/g)) {
    lv++
  }
  if (value.match(/[a-z]/g)) {
    lv++
  }
  if (value.match(/[0-9]/g)) {
    lv++
  }
  if (value.length >= 6 && value.length <= 18) {
    lv++
  }
  if (lv < 4) {
    callback(new Error('长度大于6位，包含大小写字母和数字'))
  } else {
    callback()
  }
}

export const rules = {
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 18, validator: password, trigger: 'blur' }
  ],
  checkPassword: (formModel) => {
    // 确认密码验证
    const checkPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== formModel.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return { required: true, validator: checkPassword, trigger: 'blur' }
  }
}
