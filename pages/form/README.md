# PAGES

# 测试数据

const conditionForm = {
control_1: {
name: '发起人',
type: 'initiator',
initiator: [
{
id: '481_85',
sn: 'DF10481',
realname: '清晨 003',
nickname: '清晨 003 别名',
name_txt: '清晨 003 别名 - PHP',
type: 'member',
station_id: 1,
level_id: 3,
level: '2.01',
station_list_id: 85,
hide: 0,
key: '481_85',
disabled: false,
child: [],
name: '清晨 003 别名 - PHP'
},
{
id: '485_75',
sn: 'DF10485',
realname: '清晨 005',
nickname: '',
name_txt: '清晨 005 - PHP',
type: 'member',
station_id: 1,
level_id: 3,
level: '2.01',
station_list_id: 75,
hide: 0,
key: '485_75',
disabled: false,
child: [],
name: '清晨 005 - PHP'
},
{
id: '447_11081',
sn: 'DF10447',
realname: '小花',
nickname: '小花',
name_txt: '小花 - 产品经理',
type: 'member',
station_id: 45,
level_id: 2,
level: '1.01',
station_list_id: 11081,
hide: 0,
key: '447_11081',
disabled: false,
child: [],
name: '小花 - 产品经理'
}
]
},
control_2: {
name: '发起人岗位等级',
type: 'orgrank',
gts: [
{ label: '小于', value: '<' },
{ label: '大于', value: '>' },
{ label: '等于', value: '==' },
{ label: '小于等于', value: '<=' },
{ label: '大于等于', value: '>=' },
{ label: '介于(两个数之间)', value: '>=|<' }
],
levels: {
'1': '1A',
'2': '1B',
'3': '2A',
'4': '2B',
'5': '3A',
'6': '3B',
'7': '4A',
'8': '4B',
'9': '5A',
'10': '5B',
'11': '6A',
'12': '6B'
},
con: '==',
val: '7'
},
control_1002: {
type: 'number',
sortid: 1002,
name: '数字输入框',
en_name: '',
placeholder: '请输入',
verify: 0,
unit: '',
gts: [
{ label: '小于', value: '<' },
{ label: '大于', value: '>' },
{ label: '等于', value: '==' },
{ label: '小于等于', value: '<=' },
{ label: '大于等于', value: '>=' },
{ label: '介于(两个数之间)', value: '>=|<' }
],
gt: '>=|<',
val: '3',
con: '>',
addcon: '<',
addval: '8'
},
control_1006: {
type: 'money',
sortid: 1006,
name: '金额',
en_name: '',
placeholder: '请输入...',
verify: 0,
options: ['美元', '人民币', '瑞尔'],
gts: [
{ label: '小于', value: '<' },
{ label: '大于', value: '>' },
{ label: '等于', value: '==' },
{ label: '小于等于', value: '<=' },
{ label: '大于等于', value: '>=' },
{ label: '介于(两个数之间)', value: '>=|<' }
],
gt: '>',
addval: '5'
},
control_1004: {
type: 'date_range',
sortid: 1004,
name: '开始时间',
en_name: '',
name_end: '结束时间',
date_format: 'yyyy-MM-dd',
verify: 0,
gts: [
{ label: '小于', value: '<' },
{ label: '大于', value: '>' },
{ label: '等于', value: '==' },
{ label: '小于等于', value: '<=' },
{ label: '大于等于', value: '>=' },
{ label: '介于(两个数之间)', value: '>=|<' }
],
gt: '<=',
addval: '9'
}
}
const approverForm = {
submiteNodes: [
{
department_set: ['superior'],
organization_set: [null],
approve_pass: 'order',
approve_type: 'operator',
pass_type: '普通(经办人)',
item_info: '部门审批',
checkeds: [],
approvers: [],
user_type: 'department',
form_id: '121',
flow_id: ''
},
{
department_set: ['leader'],
organization_set: [null],
approve_pass: 'order',
approve_type: 'process',
pass_type: '普通(审批意见)',
item_info: '部门审批',
checkeds: [],
approvers: [],
user_type: 'department',
form_id: '121',
flow_id: ''
}
],
default_cc: '403_251,431_53,427_57'
}
