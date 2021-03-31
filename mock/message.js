import Mock from 'mockjs'

// 设置ajax跨域允许cookie
Mock.XHR.prototype.withCredentials = true

Mock.mock(/\?ct=message&ac=get_list/, {
  code: 0,
  msg: 'OK',
  data: {
    'list|0-20': [
      {
        'id|+1': '1',
        title: '@string',
        type_name: '@string',
        create_time: '2020-03-13 15:28:40	',
        status: '@integer'
      }
    ],
    pages: {
      page_size: 20,
      page_no: 1,
      total: 50
    }
  }
})
