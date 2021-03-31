<template>
  <section class="ui-download-approved">
    <div class="line">流程审批 Approved by</div>
    <div class="section-item">
      <div v-for="(item, index) in data" :key="index" class="flex fs-sixteen">
        <div class="f1">
          <div class="tr-title">{{ item.member_name }}</div>
          <div class="tr-title">{{ item.department_name }}</div>
        </div>
        <div class="f3">
          <div class="fx-bstart">
            <div class="msg">
              <div>审批结果：{{ item.status_title }}</div>
              <div>{{ item.status_msg }}</div>
            </div>
            <div v-if="item.status != 1" class="date">
              <div>日期：2020-09-01</div>
              <div>
                <span class="ver-top">签章：</span>
                <img
                  v-if="
                    (item.status === 4 ||
                      item.status === 5 ||
                      item.status === -2 ||
                      item.status === -3 ||
                      item.status === 10) &&
                      item.department_seal_img[
                        Object.keys(item.department_seal_img)[0]
                      ].is_top === 1
                  "
                  :src="
                    item.department_seal_img[
                      Object.keys(item.department_seal_img)[0]
                    ].department_seal_img
                  "
                  class="signature"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    data: {
      default: () => [],
      type: Array
    }
  }
}
</script>
<style lang="less" scope>
.signature {
  width: 100px;
}
</style>
