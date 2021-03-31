<template>
  <el-form-item :label="items.name + '：'" required>
    <el-form-item
      class="inline-block"
      :prop="itemKey + '.con'"
      :rules="[
        {
          required: true,
          message: '请选择',
          trigger: 'change'
        }
      ]"
    >
      <el-select v-model="items['con']" placeholder="请选择">
        <el-option label="请选择" value=""></el-option>
        <template v-for="g in items.gts">
          <el-option
            v-if="g.value == '==' || g.value == '<=' || g.value == '>='"
            :key="g.value"
            :label="g.label"
            :value="g.value"
          ></el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item
      class="inline-block"
      :prop="itemKey + '.val'"
      :rules="[
        {
          required: true,
          message: '请选择',
          trigger: 'change'
        }
      ]"
    >
      <el-select v-model="items['val']" placeholder="请选择岗位等级">
        <el-option label="请选择岗位等级" value=""></el-option>
        <el-option
          v-for="l in items.levels"
          :key="l"
          :label="l"
          :value="l"
        ></el-option>
      </el-select>
    </el-form-item>
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
