<template>
  <div>
    <label-status
      v-if="detailed.status == -3 || detailed.status == -2"
      status="danger"
      :name="detailed.status_name"
    />
    <label-status
      v-else-if="detailed.status == 1"
      status="warning"
      :name="$t('审批中')"
    />
    <label-status
      v-else-if="detailed.status == 10 || detailed.status == 5"
      status="success"
      :name="detailed.status_name"
    />
    <label-status
      v-else-if="detailed.status == 'download'"
      status="blue"
      :name="detailed.status_name"
    />
    <label-status v-else status="info" :name="detailed.status_name" />
  </div>
</template>

<script>
import labelStatus from '~/components/label_status'
export default {
  components: {
    labelStatus
  },
  props: {
    detailed: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
