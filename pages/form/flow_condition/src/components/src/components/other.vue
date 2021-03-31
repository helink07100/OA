<!--
  数字输入框、金额、开始时间
-->
<template>
  <el-form-item :label="items.name + '：'" required>
    <el-form-item
      class="inline-block"
      :prop="itemKey + '.gt'"
      :rules="[
        {
          required: true,
          message: '请选择',
          trigger: 'change'
        }
      ]"
    >
      <el-select
        v-model="items['gt']"
        :style="{ width: '158px' }"
        placeholder="请选择"
      >
        <el-option
          v-for="g in items.gts"
          :key="g.value"
          :label="g.label"
          :value="g.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      v-if="items['gt'] == '>=|<'"
      class="inline-block"
      :prop="itemKey + '.val'"
      :rules="[
        {
          required: true,
          message: '请填写',
          trigger: 'change'
        }
      ]"
    >
      <el-input
        v-model="items['val']"
        :style="{ width: '128px' }"
        class="ml-sm"
        placeholder="请输入"
        type="number"
      ></el-input>
    </el-form-item>
    <el-form-item
      v-if="items['gt'] == '>=|<'"
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
      <el-select
        v-model="items['con']"
        :style="{ width: '128px' }"
        placeholder="请选择"
        class="ml-sm"
      >
        <template v-for="g in items.gts">
          <el-option
            v-if="g.value == '>' || g.value == '>='"
            :key="g.label"
            :label="g.label"
            :value="g.value"
          ></el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item
      v-if="items['gt'] == '>=|<'"
      class="inline-block"
      :prop="itemKey + '.addcon'"
      :label="items.name"
      :rules="[
        {
          required: true,
          message: '请选择',
          trigger: 'change'
        }
      ]"
    >
      <el-select
        v-model="items['addcon']"
        :style="{ width: '128px' }"
        placeholder="请选择"
      >
        <template v-for="g in items.gts">
          <el-option
            v-if="g.value == '<' || g.value == '<='"
            :key="g.label"
            :label="g.label"
            :value="g.value"
          ></el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item
      :label-width="items['gt'] == '>=|<' ? '0' : '60px'"
      :label="items['gt'] != '>=|<' ? items['gt'] : ''"
      class="inline-block"
      :prop="itemKey + '.addval'"
      :rules="[
        {
          required: true,
          message: '请填写',
          trigger: 'change'
        }
      ]"
    >
      <el-input
        v-model="items['addval']"
        :style="{ width: '128px' }"
        placeholder="请输入"
        type="number"
      ></el-input>
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
