/**
 * 每次只允许显示一个message
 */
import { Message } from 'element-ui'

export default function({ app }, inject) {
  const Handle = (options, type = '') => {
    return new Promise((resolve, reject) => {
      Message.closeAll()
      let params = {}
      if (toString.call(options) === '[object String]') {
        params.message = options
      } else {
        params = { ...options }
      }
      function onClose() {
        options && typeof options.onClose === 'function' && options.onClose()
        resolve()
      }
      if (!type || !Message[type]) {
        Message({ ...params, onClose })
      } else {
        Message[type]({ ...params, onClose })
      }
    })
  }
  const $msg = Handle

  $msg.prototype = $msg

  $msg.prototype.success = (options) => {
    return Handle(options, 'success')
  }

  $msg.prototype.error = (options) => {
    return Handle(options, 'error')
  }

  $msg.prototype.warning = (options) => {
    return Handle(options, 'warning')
  }
  inject('message', $msg)
}
