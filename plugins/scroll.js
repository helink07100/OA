import Vue from 'vue'
const scroll = Vue.directive('scroll', {
  // 当被绑定的元素插入到 DOM中时绑定
  bind(el, binding, vnode) {
    // 聚焦元素
    window.addEventListener('scroll', vnode.context.fnScroll, true)
  },
  unbind(el, binding, vnode) {
    window.removeEventListener('scroll', vnode.context.fnScroll, true)
  }
})
export default scroll
