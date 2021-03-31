import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import ElementLocale from 'element-ui/lib/locale'

export default ({ app, store }, inject) => {
  Vue.use(VueI18n)

  const messages = {
    'zh-cn': { ...require('~/lang/zh-cn.json'), ...zhLocale },
    en: { ...require('~/lang/en.json'), ...enLocale }
  }
  const i18n = new VueI18n({
    locale: store.state.i18n.locale,
    fallbackLocale: 'zh-cn',
    messages
  })

  app.i18n = i18n
  // 配置element-ui的组件国际化
  ElementLocale.i18n((key, value) => app.i18n.t(key, value))

  const lang = (item) => {
    const langDict = {
      'zh-cn': 'name',
      en: 'en_name'
    }

    return item[langDict[store.state.i18n.locale]]
      ? item[langDict[store.state.i18n.locale]]
      : item.name
  }

  inject('lang', lang)
}
