<template>
    <el-form-item
        :label="items.name + '：'"
        :prop="itemKey + '.value'"
        :rules="[
            {
                required: true,
                message: '请选择',
                trigger: 'change'
            }
        ]"
    >
        <div class="inline-block">
            <el-checkbox-group v-model="items['value']">
                <el-checkbox
                    v-for="(o, index) in items.options"
                    :key="index"
                    :label="o.label ? o.label : o"
                    :value="o.label ? o.label : o"
                    >{{ o.label ? o.label : o }}</el-checkbox
                >
            </el-checkbox-group>
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
