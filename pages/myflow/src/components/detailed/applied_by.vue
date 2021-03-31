<template>
  <div>
    <el-row v-if="data" class="content">
      <el-col class="detail-control-item" :span="12">
        <el-col :span="10" class="label"> {{ $t('申请日期') }}： </el-col>
        <el-col :span="14" class="static">
          <div>
            {{
              this.$moment(new Date(data.create_time_format * 1000)).format(
                'YYYY-MM-DD HH:mm:ss'
              )
            }}
          </div>
        </el-col>
      </el-col>
      <el-col class="detail-control-item" :span="12">
        <el-col :span="10" class="label"> {{ $t('编号') }}： </el-col>
        <el-col :span="14" class="static">
          <div>{{ data.sn ? data.sn : '-' }}</div>
        </el-col>
      </el-col>
      <el-col class="detail-control-item" :span="12">
        <el-col :span="10" class="label"> {{ $t('姓名') }}： </el-col>
        <el-col :span="14" class="static">
          <div>{{ data.create_user_name }}</div>
        </el-col>
      </el-col>
      <el-col class="detail-control-item" :span="12">
        <el-col :span="10" class="label"> {{ $t('部门') }}： </el-col>
        <el-col :span="14" class="static">
          <div>
            {{ data.department_name ? data.department_name : '-' }}
          </div>
        </el-col>
      </el-col>
      <el-col class="detail-control-item" :span="12">
        <el-col :span="10" class="label"> {{ $t('岗位名称') }}： </el-col>
        <el-col :span="14" class="static">
          <div>
            {{
              data.create_user_info.job_name
                ? data.create_user_info.job_name
                : '-'
            }}
          </div>
        </el-col>
      </el-col>
      <el-col class="detail-control-item" :span="12">
        <el-col :span="10" class="label"> {{ $t('公司名称') }}： </el-col>
        <el-col :span="14" class="static">
          <div>
            {{
              data.create_user_info.organization_name
                ? data.create_user_info.organization_name
                : '-'
            }}
          </div>
        </el-col>
      </el-col>
      <el-col class="detail-control-item" :span="12">
        <el-col :span="10" class="label"> {{ $t('紧急程度') }}： </el-col>
        <el-col :span="14" class="static">
          <div
            :class="[
              data.level_code === 1 || data.level_code === 2
                ? 'text-danger'
                : 'text-primay'
            ]"
          >
            {{ data.level ? data.level : '-' }}
          </div>
        </el-col>
      </el-col>
      <el-col class="detail-control-item" :span="12">
        <el-col :span="10" class="label"> {{ $t('关连表单') }}： </el-col>
        <el-col :span="14" class="static">
          <template v-if="data.related_records.length >= 1">
            <div v-for="item in data.related_records" :key="item.record_id">
              <a
                class="text-primary"
                target="_blank"
                :href="
                  '?ct=myflow&ac=record_detailed&record_id=' +
                    item.record_id +
                    '&noprivate=1&from_record_id=' +
                    id
                "
                >{{ item.sn }} {{ item.form_name }}</a
              >
            </div>
          </template>
          <template v-else>
            <div>-</div>
          </template>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    // id === record_id
    id: {
      type: [String],
      default: ''
    }
  }
}
</script>
<style lang="less" scoped>
.detail-control-item .text-danger {
  color: #ff4439 !important;
}
</style>
