<template>
  <oaDialog
    ref="accontrolDialog"
    :dialog-visible="dialogVisible"
    :title="title"
    width="40%"
    @close="$emit('close', false)"
  >
    <component
      :is="items | componentName"
      :items="items"
      :has-edit="isEdit"
      :dialog-visible="dialogVisible"
      @close="$emit('close', false)"
      @upTitle="title = $event"
      @define="$emit('define', $event)"
    />
  </oaDialog>
</template>

<script>
import form_text from './src/components/text'
import form_number from './src/components/number'
import form_textarea from './src/components/textarea'
import form_block from './src/components/block'
import form_images from './src/components/image'
import form_department from './src/components/department'
import form_multi_select from './src/components/multi_select'
import form_addon from './src/components/addon'
import form_select from './src/components/select'
import form_money from './src/components/money'
import form_date from './src/components/date'
import form_date_range from './src/components/date_range'
import form_tips from './src/components/tips'
import form_station from './src/components/station'
import form_table from './src/components/table'
import form_line from './src/components/line'
import oaDialog from '~/components/oa_dialog'
export default {
  components: {
    oaDialog,
    form_text,
    form_number,
    form_textarea,
    form_block,
    form_department,
    form_multi_select,
    form_select,
    form_money,
    form_date,
    form_date_range,
    form_table,
    form_tips,
    form_station,
    form_line,
    form_addon,
    form_images
  },
  filters: {
    componentName(item) {
      return `form_${item.type}`
    }
  },
  props: {
    dialogVisible: Boolean,
    isEdit: Boolean,
    items: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({ title: '' })
}
</script>
