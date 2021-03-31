/**
 * log,用于日志输出，用一环境变量来控制是否输出，目前只针对开发环境输出
 */

export default function({ app }, inject) {
  const $log = (value) => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.log(value)
    }
  }
  inject('log', $log)
}
