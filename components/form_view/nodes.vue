<template>
  <div>
    <div v-for="(item, index) in memberList" :key="index" class="view-item">
      <name-nodes
        :initials="item.nickname | filterSubstr"
        :name="item.nickname"
        :desc="item.station_name"
        class="node-warning"
      >
        <labelStatus class="label-status label-info" :name="$t('等待中')">
        </labelStatus>
      </name-nodes>
    </div>
  </div>
</template>

<script>
import nameNodes from '~/components/name_nodes'
import labelStatus from '~/components/label_status'
export default {
  components: {
    nameNodes,
    labelStatus
  },
  props: { members: { type: Array, default: () => [] } },
  computed: {
    memberList() {
      const list = []
      if (this.members && this.members.length) {
        this.members.forEach((i) => {
          if (i.user_type === 'member' || i.user_type === 'station') {
            i.nickname.forEach((j) => {
              list.push({ station_name: i.station_name, nickname: j })
            })
          } else {
            list.push({
              nickname: i.station_name,
              station_name: ''
            })
          }
        })
      }
      return list
    }
  }
}
</script>

<style lang="less" scoped>
.view-item {
  position: relative;
  padding-bottom: 30px;

  .name-nodes {
    z-index: 2;
    position: relative;
  }

  &::before {
    content: '';
    width: 1px;
    height: 100%;
    position: absolute;
    left: 19px;
    top: 0px;
    border-right: dashed 1px #e1e2e7;
    z-index: 1;
  }

  &:last-child::before {
    border-right: none;
  }
}
</style>
