<template>
  <section class="ui-download-applied">
    <div class="section-item">
      <div class="line">申请人资讯 Applied by</div>
      <div class="flex">
        <div class="f1">
          <div class="tr-title">申请日期</div>
          <div class="tr-title">Date</div>
        </div>
        <div class="f1 fs-sixteen">
          {{ data.base.create_time_format }}
        </div>
        <div class="f1">
          <div class="tr-title">姓名</div>
          <div class="tr-title">Name</div>
        </div>
        <div class="f1 fs-sixteen">{{ data.base.create_user_info.name }}</div>
      </div>
    </div>
    <div class="section-item">
      <div class="flex">
        <div class="f1">
          <div class="tr-title">岗位名称</div>
          <div class="tr-title">Position</div>
        </div>
        <div class="f1 fs-sixteen">
          {{ data.base.create_user_info.job_name }}
        </div>
        <div class="f1">
          <div class="tr-title">部门</div>
          <div class="tr-title">Department</div>
        </div>
        <div class="f1 fs-sixteen">
          {{ data.base.create_user_info.department_name }}
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    data: {
      default: () => {},
      type: Object
    }
  }
}
</script>
<style></style>
