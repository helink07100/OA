import Vue from 'vue'
import Element from 'element-ui'
import VCharts from 'v-charts'
import '~/element-variables.scss'

export default ({ app }, inject) => {
  Vue.use(Element)

  Element.Select.props.clearable.default = true
  Element.Select.props.filterable.default = true
  Vue.use(VCharts)

  inject('alert', Element.MessageBox.alert)
}
