<template>
  <oaDialog
    :dialog-visible="dialogVisible"
    title="选择条件"
    width="30%"
    @close="$emit('close')"
  >
    <el-checkbox-group v-model="travel">
      <template v-for="(item, key) in controls">
        <el-checkbox
          v-if="typeBoolen(item.type)"
          :key="key"
          :label="key"
          class="mb-sm"
        >
          {{ item.name }}
        </el-checkbox>
      </template>
    </el-checkbox-group>
    <br />
    <br />
    <div :style="{ 'text-align': 'right' }">
      <el-button @click="$emit('close')">取 消</el-button>
      <el-button type="primary" @click="submitControls">确 定</el-button>
    </div>
  </oaDialog>
</template>
<script>
import oaDialog from '~/components/oa_dialog'
export default {
  components: {
    oaDialog
  },
  props: {
    dialogVisible: Boolean,
    controls: {
      type: Object,
      default: () => {}
    },
    checkeds: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      travel: (() => {
        return this.checkeds
      })()
    }
  },
  watch: {
    checkeds: {
      immediate: true,
      handler(nv, ov) {
        this.travel = JSON.parse(JSON.stringify(nv))
      }
    }
  },
  methods: {
    typeBoolen(type) {
      if (
        type === 'number' ||
        type === 'money' ||
        // type === 'date_range' ||  kenji說把日期區間註解掉
        type === 'select' ||
        type === 'multi_select' ||
        type === 'initiator' ||
        type === 'orgrank'
      ) {
        return true
      }
      return false
    },
    getCheckedsKey(controls) {
      const arrs = []
      for (const n in controls) {
        arrs.push(n)
      }
      return arrs
    },
    checkedsFilters(forArrs, controls) {
      const checkeds = {}
      for (const k in forArrs) {
        for (const n in controls) {
          if (forArrs[k] === n) {
            checkeds[n] = controls[n]
          }
        }
      }
      return checkeds
    },
    submitControls() {
      const checkeds = this.checkedsFilters(this.travel, this.controls)
      this.$emit('define', checkeds)
    }
  }
}
</script>
