import Mock from 'mockjs'

// 设置ajax跨域允许cookie
Mock.XHR.prototype.withCredentials = true

Mock.mock(/\?ct=schedule&ac=month_list111111/, {
  code: 0,
  msg: 'OK',
  data: {
    'list|0-20': [
      {
        'weekday|': ' @integer(1, 12)月 @integer(1, 30)日 星期 @integer(1, 7)',
        'schedule|1-5': [
          {
            'id|+1': 1,
            title: '@string',
            remark: '@string',
            display_time: '全天',
            status: '@integer(0, 1)'
          }
        ]
      }
    ],
    pages: {
      page_size: 20,
      page_no: 1,
      total: 50
    }
  }
})
