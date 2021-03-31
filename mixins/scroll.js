/**
 * @description [throttle 节流函数]
 * @author damai
 * @param {Function} fn 延时调用函数
 * @param {Number} delay 延迟多长时间
 * @param {Number} atleast 至少多长时间触发一次
 * @return {Function} 延迟执行的方法
 */
export default {
  methods: {
    fnScroll(event) {
      this.throttle(event, this.fnHandleScroll, 100)
    },
    fnHandleScroll() {
      this.$bus.$emit('scroll')
    },
    throttle(event, call, delay, atleast) {
      let timer = null
      let previous = null
      const nowDate = +new Date()
      if (!previous) previous = nowDate
      if (atleast && nowDate - previous > atleast) {
        call()
        previous = nowDate
        clearTimeout(timer)
      } else {
        clearTimeout(timer)
        timer = setTimeout(function() {
          call()
          previous = null
        }, delay)
      }
    }
  }
}
