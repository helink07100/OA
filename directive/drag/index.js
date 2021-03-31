import Vue from 'vue'
/**
 * 拖拽控件
 *
 * v-drag
 * v-drag="'selector'"
 */
Vue.directive('drag', {
  bind(el, binding) {
    const dom = binding.value ? el.querySelector(binding.value) : el
    if (dom) {
      dom.onmousedown = function(ev) {
        const disX = ev.clientX - el.offsetLeft
        const disY = ev.clientY - el.offsetTop

        document.onmousemove = function(ev) {
          if (dom.getAttribute('drag-disabled')) return false
          const l = ev.clientX - disX
          const t = ev.clientY - disY
          el.style.left = l + 'px'
          el.style.top = t + 'px'
          el.dataset.left = l + 'px'
          el.dataset.top = t + 'px'
        }

        document.onmouseup = function() {
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    }
  }
})
