> 目录下的所有js文件都会读取挂载到this.$api，文件名为$api调用的键名

#### 格式如下

```javascript
// file: ./api/common.js
// app为Vue 根实例自动注入
export default app => ({
  login: () => app.$axios.get('/login')
})

// 使用方法
// *.vue

this.$api.common.login()
```
