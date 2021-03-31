import Mock from 'mockjs'

// 设置ajax跨域允许cookie
Mock.XHR.prototype.withCredentials = true

Mock.mock(/api.php\?ac=myforms/, {
  code: 0,
  msg: 'OK',
  data: [
    {
      form_id: 91,
      form_type_id: 25,
      default_flow_id: 171,
      form_name: '王猛的PHP请假单',
      type_name: '考勤',
      icon: 'icon-chaosongwode'
    },
    {
      form_id: 93,
      form_type_id: 27,
      default_flow_id: 177,
      form_name: '副岗位审核',
      type_name: '出差申请',
      icon: 'icon-wofaqideshenpi'
    },
    {
      form_id: 99,
      form_type_id: 1,
      default_flow_id: 183,
      form_name: '清晨表单1',
      type_name: '人事类',
      icon: 'icon-dakakaoqin'
    }
  ]
})

// Mock.mock(/api.php\?ac=cate_lists/, {
//   code: 0,
//   msg: 'OK',
//   data: [
//     { id: 1, cate_name: '中文1' },
//     { id: 3, cate_name: '中文2' },
//     { id: 5, cate_name: '中文3' },
//     { id: 7, cate_name: '11' }
//   ]
// })
