import Mock from 'mockjs'

// 设置ajax跨域允许cookie
Mock.XHR.prototype.withCredentials = true

Mock.mock(/api.php\?ac=form_types/, {
  code: 0,
  msg: 'OK',
  data: [
    { form_type_id: 999, cn_name: '\u516C\u6587\u5ba1\u6279' },
    { form_type_id: 27, cn_name: '\u51FA\u5DEE\u7533\u8bf7' },
    { form_type_id: 25, cn_name: '\u8003\u52e4' },
    { form_type_id: 13, cn_name: '\u884C\u653F\u7C7B' },
    { form_type_id: 12, cn_name: '\u6848\u8bc1\u7c7b' },
    { form_type_id: 11, cn_name: '\u5361\u8bc1\u7c7b' },
    { form_type_id: 2, cn_name: '\u8D22\u52A1\u7C7B' },
    { form_type_id: 1, cn_name: '\u4EBA\u4E8B\u7C7B' }
  ]
})

Mock.mock(/api.php\?ac=status_types/, {
  code: 0,
  msg: 'OK',
  data: [
    { status: 10, name: '\u5DF2\u901A\u8FC7' },
    { status: 1, name: ' \u5BA1\u6279\u4e2d' },
    { status: -2, name: '\u5DF2\u9A73\u56DE' },
    { status: -10, name: '\u5DF2\u6492\u6d88' }
  ]
})

Mock.mock(/api.php\?ac=myreview_apply/, {
  code: 0,
  msg: 'OK',
  data: {
    configs: {
      control_1000: {
        type: 'text',
        sortid: 1014,
        name: '单行输入框',
        en_name: '',
        placeholder: '请输入',
        verify: 1,
        sortIndex: 0
      },
      control_1001: {
        type: 'textarea',
        sortid: 1001,
        name: '多行输入框',
        en_name: 'duo',
        placeholder: '请输入',
        verify: 0,
        sortIndex: 1
      },
      control_1002: {
        type: 'number',
        sortid: 1002,
        name: '数字输入框',
        en_name: 'shuzi',
        placeholder: '请输入',
        verify: 0,
        unit: '',
        sortIndex: 2
      },
      control_1003: {
        type: 'select',
        sortid: 1003,
        name: '单选框',
        en_name: 'danxuan',
        placeholder: '请选择...',
        verify: 0,
        options: ['1', '2', '3'],
        sortIndex: 3
      },
      control_1004: {
        type: 'multi_select',
        sortid: 1004,
        name: '多选框',
        en_name: 'duoxuan',
        verify: 0,
        options: [],
        sortIndex: 4
      },
      control_1005: {
        type: 'date',
        sortid: 1005,
        name: '日期',
        en_name: 'riqi',
        date_format: 'yyyy-MM-dd',
        verify: 0,
        sortIndex: 5
      },
      control_1006: {
        type: 'date_range',
        sortid: 1006,
        name: '开始时间',
        en_name: 'kaishi',
        name_end: '结束时间',
        date_format: 'yyyy-MM-dd',
        verify: 0,
        sortIndex: 6
      },
      control_1007: {
        type: 'images',
        sortid: 1007,
        name: '图片',
        en_name: 'tupian',
        verify: 0,
        sortIndex: 7
      },
      control_1008: {
        type: 'addon',
        sortid: 1008,
        name: '附件',
        en_name: 'fujian',
        verify: 0,
        sortIndex: 8
      },
      control_1009: {
        type: 'tips',
        sortid: 1009,
        name: '阿斯顿就看哈手机看大家说的',
        sortIndex: 9
      },
      control_1010: {
        type: 'money',
        sortid: 1010,
        name: '金额',
        en_name: 'jine',
        placeholder: '请输入...',
        verify: 0,
        options: ['美元', '人民币', '瑞尔'],
        sortIndex: 10
      },
      control_1011: {
        type: 'table',
        sortid: 1011,
        name: '数据表格',
        en_name: 'shujubiaoge',
        row: '10',
        options: ['1', '2', '3'],
        placeholder: '',
        verify: 0,
        sortIndex: 11
      },
      control_1012: {
        type: 'department',
        sortid: 1014,
        name: '部门选择',
        en_name: 'bumenxuyanze',
        placeholder: '请选择部门',
        verify: 0,
        options: [],
        sortIndex: 12
      },
      control_1013: {
        type: 'station',
        sortid: 1013,
        name: '岗位选择',
        en_name: 'gangweixuanze',
        placeholder: '请选择部门',
        placeholder2: '请选择岗位',
        verify: 0,
        options: [],
        sortIndex: 13
      }
    },
    history_records: [
      { record_id: 107, sn: '222003-0018', form_name: '英文表单' }
    ],
    form_name: '清晨表单1-Ung Seav Ling-200318',
    mylevel: '2A',
    form_id: '99',
    show_name: 'Ung',
    create_time: '2020-03-18',
    department_name: '技术部',
    org_level_name: '2A',
    org_level: '2.01',
    station_name: 'PHP（2A'
  }
})
