import Mock from 'mockjs'

// 设置ajax跨域允许cookie
Mock.XHR.prototype.withCredentials = true

Mock.mock(/api.php\?ac=admin&ct=index/, {
  code: 0,
  msg: 'OK',
  data: {
    'list|0-20': [
      {
        username: '@cname',
        realname: '@cname',
        station_id: '@integer',
        group: '@integer',
        country: 'HK',
        last: '2020-03-13 15:28:40	',
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

Mock.mock(/api.php\?ac=admin&ct=group/, {
  code: 0,
  msg: 'OK',
  data: {
    'list|0-20': [
      {
        name: '@cname',
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
