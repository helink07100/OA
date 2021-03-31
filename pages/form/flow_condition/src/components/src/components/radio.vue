<template>
  <el-form-item
    :label="items.name + '：'"
    :prop="itemKey + '.val'"
    :rules="[
      {
        required: true,
        message: '请选择',
        trigger: 'change'
      }
    ]"
  >
    <div class="inline-block">
      <el-radio-group v-model="items['val']">
        <el-radio
          v-for="o in items.options"
          :key="o"
          :label="o.label ? o.label : o"
          >{{ o.label ? o.label : o }}</el-radio
        >
      </el-radio-group>
    </div>
    <div class="inline-block ml-md">
      <a
        href="javascript:;"
        class="text-danger cp mt-sm"
        @click="delControlsItem(itemKey)"
        >删除</a
      >
    </div>
  </el-form-item>
</template>
<script>
import Condition from '@/mixins/condition'
export default {
  mixins: [Condition]
}
</script>
<style lang="less" scoped>
.inline-block {
  display: inline-block;
}
</style>
