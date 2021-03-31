/**
 * 用于流程的新增流程
 */
const userTypes = [
  {
    label: '岗位审批',
    value: 'station'
  },
  {
    label: '部门审批',
    value: 'department'
  },
  {
    label: '机构审批',
    value: 'organization'
  },
  {
    label: '指定审批人',
    value: 'member'
  },
  {
    label: '跨机构审批',
    value: 'organization',
    child: []
  },
  {
    label: '抄送',
    value: 'cc_person',
    child: [
      {
        label: '部门',
        value: 'department'
      },
      {
        label: '机构',
        value: 'organization'
      },
      {
        label: '指定人',
        value: 'member'
      }
    ]
  },
  {
    label: '申请人',
    value: 'applicant'
  }
]
const departmentSets = [
  {
    label: '本部门最高岗位',
    value: 'leader'
  },
  {
    label: '直属上级部门最高岗位',
    value: 'superior'
  },
  {
    label: '或选择指定的部门审批',
    value: 'appoint'
  }
]
const organizationSets = [
  {
    label: '本机构最高岗位',
    value: 'leader'
  },
  {
    label: '直属上级机构最高岗位',
    value: 'superior'
  }
]
const approvePass = [
  {
    label: '普通（按审批人员流程顺序进行审批）',
    value: 'order'
  },
  {
    label: '会签（须所有审批人同意）',
    value: 'and'
  },
  {
    label: '或签（一名审批人同意或拒绝即可）',
    value: 'or'
  }
]
const approveTypes = [
  {
    label: '经办人（在审批流程结束后将审批意见修改到申请表单）',
    value: 'operator'
  },
  {
    label: '意见（所有审核人只需要提供审核意见，没有审批权限）',
    value: 'verify'
  },
  {
    label: '审核（审批内容和审批结果（通过或不通过），但流程依然继续）',
    value: 'process'
  },
  {
    label: '审批（审批内容和审批结果（通过或不通过），流程终止）',
    value: 'final'
  }
]

const applicantTypes = [
  {
    label: '经办人（通过 / 驳回，流程继续或终止）',
    value: 'operator'
  },
  {
    label: '审核（拟同意 / 不同意，流程继续）',
    value: 'process'
  },
  {
    label: '审批（通过 / 驳回，流程终止）',
    value: 'final'
  },
  {
    label: '意见（提交，流程继续）',
    value: 'verify'
  }
]

const ccTypes = [
  {
    label: '无论前格状态',
    value: 1
  },
  {
    label: '前格状态为拟同意/通过/提交',
    value: 2
  },
  {
    label: '前格状态为不同意/驳回',
    value: 3
  }
]

export default {
  data() {
    return {
      isGetLoading: false,
      form_id: (() => {
        return this.$route.query.form_id
      })(),
      flow_id: '',
      userTypes,
      departmentSets,
      organizationSets,
      approvePass,
      approveTypes,
      applicantTypes,
      ccTypes
    }
  }
}
