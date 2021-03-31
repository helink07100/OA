<!-- 说明文字 tip -->
<template>
  <el-form-item :prop="'control_' + items.sortid" class="control-form-flex">
    <div class="detail-control-item p-b-none">
      <div v-if="items.name" class="control-msg-text">
        <i class="iconfont icon-Group"></i>
        <input
          :name="'control_' + items.sortid"
          :value="items.name"
          type="hidden"
        />
        <span>{{ items.name }}</span>
      </div>
      <div v-else-if="items.en_name" class="control-msg-text">
        <i class="iconfont icon-Group"></i>
        <input
          :name="'control_' + items.sortid"
          :value="items.en_name"
          type="hidden"
        />
        <span>{{ items.en_name }}</span>
      </div>
    </div>
    <slot></slot>
  </el-form-item>
</template>

<script>
import controlForm from '@/mixins/control_form'
export default {
  mixins: [controlForm]
}
</script>
