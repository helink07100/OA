import axios from 'axios'
import qs from 'qs'

export default function({ app, store, route, redirect, req }, inject) {
  /**
   * 设置config
   * @param {*} config
   */
  const initConfig = (config) => {
    const { user } = store.state.user
    const token = user.token
    const defaultParams = {
      ispc: 1,
      ajax: 1,
      init: 1, // 为了不太多改动权限的菜单，原来pc混合有模板标签的，都通过  init=1  来区别是取数据还是显示模板，这样会比较简单，又不用考虑那些权限
      timezone: getTimezone(),
      lang: store.state.i18n.locale,
      token
    }
    config.params = {
      ...defaultParams,
      ...config.params
    }

    // setCookies();
  }
  // -10006 第一次登陆，需要先修改初始密码
  /**
   * 登录失效处理
   */
  let isAuthAlertShow = false
  const authHandle = (result) => {
    const token = store.getters['user/token']
    if (result.code === app.$enum.__AUTH_FAIL__ && token) {
      store.dispatch('setNoticationNumber', 'off') // 清除轮询
      if (!isAuthAlertShow && route.name !== 'login') {
        isAuthAlertShow = true
        app
          .$alert('授权失效，请重新登录', '提示', { showClose: false })
          .then((e) => {
            store.dispatch('logout')
            redirect('/login')
            isAuthAlertShow = false
          })
      }
      return {}
    } else if (result.code !== 0 && result.code !== 1) {
      result.msg && app.$message.error(result.msg)
    }
    return true
  }

  // 取得时区
  const getTimezone = () => {
    // Get UTC offset
    let offset = new Date().getTimezoneOffset()
    const o = Math.abs(offset)
    offset =
      (offset < 0 ? '+' : '-') +
      ('00' + Math.floor(o / 60)).slice(-2) +
      ':' +
      ('00' + (o % 60)).slice(-2)
    return offset
  }

  const $http = axios.create({
    baseURL: process.server ? app.$config.server.api : app.$config.client.api,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    withCredentials: true
    // transformRequest: [
    //   function(data, headers) {
    //     return qs.stringify(
    //       Object.assign(
    //         {
    //           token
    //         },
    //         data
    //       )
    //     )
    //   }
    // ]
  })

  $http.interceptors.request.use(
    function(config) {
      // 临时代码上传文件用
      if (
        config.data &&
        config.data.attach_url &&
        config.data.attach_url.lastModified
      ) {
        config.headers['Content-Type'] = 'multipart/form-data; charset=UTF-8'
      }
      initConfig(config)

      if (
        config.headers['Content-Type'] === 'multipart/form-data; charset=UTF-8'
      ) {
        const form = new FormData()
        for (const key in config.data) {
          form.append(key, config.data[key])
        }
        config.data = form
      } else if (config.headers['Content-Type'] === 'application/json') {
        config.data = JSON.stringify(config.data)
      } else {
        config.data = qs.stringify(config.data)
      }

      return config
    },
    function(error) {
      return Promise.reject(error)
    }
  )

  $http.interceptors.response.use(
    function(response) {
      // 对结果做拦截
      if (
        authHandle(response.data) &&
        (response.data.code === app.$enum.__SUCCESS__ ||
          response.data.code === 1)
      ) {
        return response.data

        // 初次登陆
      } else if (response.data.code === -10006 && response.data.data.token) {
        return response.data
      } else {
        app.$message.error(response.data.msg)

        return false
      }
    },
    function(err) {
      return Promise.reject(err)
    }
  )

  inject('axios', $http)
}
