/* eslint-disable no-useless-escape */
/**
 * 缓存类，支持localStorage, sessionStorage, Cookie
 *
 * * new Caches().set('key', 'asdf');
 * * new Caches('sessionStorage').set('key', 'asdf');
 * * new Caches('Cookie').set('key', 'asdf');
 * * new Caches('Cookie').set('key', 'asdf', {end: new Date(2020, 5, 12)});
 */
export default class Caches {
  // 创建缓存类的类型
  adapter = 'localStorage'
  // 支持的缓存类型
  adapters = ['localStorage', 'sessionStorage', 'Cookie']
  constructor(adapter = 'localStorage') {
    if (!this.adapters.includes(adapter)) {
      throw new Error(`Caches模块不支持${adapter}类型`)
    }

    this.adapter = adapter
  }

  isCookie() {
    return this.adapter === 'Cookie'
  }

  getAdapter() {
    switch (this.adapter) {
      case 'localStorage':
        return localStorage
      case 'sessionStorage':
        return sessionStorage
      case 'Cookie':
        return document.cookie
    }
  }

  /**
   * 设置缓存
   * @param {*} key
   * @param {*} value
   * @param {*} options Cookie专属
   *
   * origin 为true表示不写入类型判断
   */
  set(key, value, { origin = false, end, path, domain, secure } = {}) {
    const adapter = this.getAdapter()

    const typeKey = typeof value
    const tmpValue = typeof value === 'string' ? value : JSON.stringify(value)
    const saveValue = origin ? tmpValue : `|-${typeKey}-|${tmpValue}`
    if (!this.isCookie()) {
      adapter.setItem(key, saveValue)
    } else {
      if (!key || /^(?:expires|max\-age|path|domain|secure)$/i.test(key)) {
        return false
      }
      let expires = ''
      if (end) {
        switch (end.constructor) {
          case Number:
            expires =
              end === Infinity
                ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
                : '; max-age=' + end
            break
          case String:
            expires = '; expires=' + end
            break
          case Date:
            expires = '; expires=' + end.toUTCString()
            break
        }
      }
      document.cookie =
        encodeURIComponent(key) +
        '=' +
        encodeURIComponent(saveValue) +
        expires +
        (domain ? '; domain=' + domain : '') +
        (path ? '; path=' + path : '') +
        (secure ? '; secure' : '')
    }
    return true
  }

  get(key, defaultValue = null) {
    if (!this.has(key)) {
      return defaultValue
    }

    const adapter = this.getAdapter()
    let value
    if (!this.isCookie()) {
      value = adapter.getItem(key)
    } else {
      value = decodeURIComponent(
        document.cookie.replace(
          new RegExp(
            '(?:(?:^|.*;)\\s*' +
              encodeURIComponent(key).replace(/[-.+*]/g, '\\$&') +
              '\\s*\\=\\s*([^;]*).*$)|^.*$'
          ),
          '$1'
        )
      )
    }

    // 判断缓存的格式是否带有缓存类型
    const matchValue = value.match(/^(\|-)([^-\|]+)(-\|)/)
    if (!matchValue) {
      return value
    } else {
      try {
        const typeKey = matchValue[2]
        const originValue = value.replace(matchValue[0], '')
        switch (typeKey) {
          case 'object':
          case 'number':
            return JSON.parse(originValue)
          case 'string':
            return originValue
          // 非正常类型，返回最初数据
          default:
            return value
        }
      } catch (e) {
        return value
      }
    }
  }

  /**
   * 删除key
   * @param {*} key
   * @param {*} options Cookie专属
   */
  delete(key, { path = '', domain = '' } = {}) {
    const adapter = this.getAdapter()
    if (!this.isCookie()) {
      adapter.removeItem(key)
    } else {
      if (!key || !this.has(key)) {
        return false
      }
      document.cookie =
        encodeURIComponent(key) +
        '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
        (domain ? '; domain=' + domain : '') +
        (path ? '; path=' + path : '')
    }
    return true
  }

  has(key) {
    const adapter = this.getAdapter()
    if (!this.isCookie()) {
      return toString.call(adapter.getItem(key)) !== '[object Null]'
    } else {
      return new RegExp(
        '(?:^|;\\s*)' +
          encodeURIComponent(key).replace(/[-.+*]/g, '\\$&') +
          '\\s*\\='
      ).test(adapter)
    }
  }

  // 清空缓存
  clear() {
    const adapter = this.getAdapter()
    if (!this.isCookie()) {
      adapter.clear()
    } else {
      this.keys().forEach((key) => {
        this.delete(key)
      })
    }
  }

  /**
   * 返回已缓存的键值
   */
  keys() {
    const adapter = this.getAdapter()
    let keys = []
    if (!this.isCookie()) {
      keys = Object.keys(adapter)
    } else {
      keys = adapter
        .replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '')
        .split(/\s*(?:\=[^;]*)?;\s*/)
      for (let idx = 0; idx < keys.length; idx++) {
        keys[idx] = decodeURIComponent(keys[idx])
      }
    }
    return keys
  }
}
