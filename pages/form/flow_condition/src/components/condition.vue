<template>
  <el-form ref="form" :model="controls" label-width="148px">
    <template v-for="(item, key) in controls">
      <!-- 发起人、发起人岗位等级、单选、多选、其它 -->
      <component
        :is="componentType(item.type)"
        :key="key"
        :item-key="key"
        :items="item"
        @del="delControlsItem"
        @change="changeHandle($event, item)"
      ></component>
    </template>
  </el-form>
</template>
<script>
import Initiator from './src/components/initiator'
import Orgrank from './src/components/orgrank'
import oaRadio from './src/components/radio'
import MultiSelect from './src/components/multi_select'
import Other from './src/components/other'
const gts = [
  {
    label: '小于',
    value: '<'
  },
  {
    label: '大于',
    value: '>'
  },
  {
    label: '等于',
    value: '=='
  },
  {
    label: '小于等于',
    value: '<='
  },
  {
    label: '大于等于',
    value: '>='
  },
  {
    label: '介于(两个数之间)',
    value: '>=|<'
  }
]
export default {
  components: {
    Initiator,
    Orgrank,
    oaRadio,
    MultiSelect,
    Other
  },
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    levels: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      gts,
      form: {
        form_id: (() => {
          return this.$route.query.form_id
        })()
      },
      controls: {}
    }
  },
  watch: {
    options(nvs, ov) {
      const controls = {}
      for (const key in nvs) {
        const item = nvs[key]
        if (
          item.type === 'number' ||
          item.type === 'money'
          //   || item.type === 'date_range'   kenji說把日期區間註解掉
        ) {
          item.gts = gts
          // item['@gt@' + item.type] = '<' // <
          // item['@val@' + item.type] = ''
          // item['@con@' + item.type] = '>' // <
          // item['@addcon@' + item.type] = '<' // <
          // item['@addval@' + item.type] = ''
        }
        if (item.type === 'orgrank') {
          item.gts = gts
          item.levels = this.levels
        }
        if (item.type === 'initiator' && !item.initiator) {
          item[item.type] = []
        }
        controls[key] = item
      }
      this.controls = controls
    }
  },
  methods: {
    componentType(type) {
      if (type === 'initiator') return 'Initiator'
      else if (type === 'orgrank') return 'Orgrank'
      else if (type === 'select') return 'oaRadio'
      else if (type === 'multi_select') return 'MultiSelect'
      else return 'Other'
    },
    delControlsItem(key) {
      delete this.controls[key]
      this.controls = JSON.parse(JSON.stringify(this.controls))
      this.$emit('change', { controls: this.controls, delControl: key })
    },
    changeHandle(data, item) {
      // 发起人
      if (item.type === 'initiator') {
        item[item.type] = data
      }
      this.controls = JSON.parse(JSON.stringify(this.controls))
    }
  }
}
</script>
