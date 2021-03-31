let locale = 'zh-cn'

if (process.browser) {
  locale = localStorage.getItem('LANG') || 'zh-cn'
}

export default {
  namespaced: true,
  state: () => ({
    locales: ['zh-cn', 'en'],
    locale
  }),
  mutations: {
    updateLang(state, locale) {
      if (state.locales.includes(locale)) {
        state.locale = locale
        localStorage.setItem('LANG', locale)
        this.app.i18n.locale = locale
      }
    },
    addLang(state, lang) {
      !state.locales.includes(lang) && state.locales.push(lang)
    }
  }
}
