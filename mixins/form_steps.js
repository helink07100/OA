/**
 * 用于流程的创建表单的步骤条
 * 〜/components/control_form/flow_edit.vue、add.vue
 */
export default {
  data() {
    return {
      steps: [
        {
          id: 1,
          name: '基础信息',
          active: true
        },
        {
          id: 2,
          name: '表单设置',
          active: false
        },
        {
          id: 3,
          name: '审批设定',
          active: false
        }
      ],
      stepsIds: [1]
    }
  }
}
