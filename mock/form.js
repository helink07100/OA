import Mock from 'mockjs'

// 设置ajax跨域允许cookie
Mock.XHR.prototype.withCredentials = true

Mock.mock(/\?ct=form&ac=index/, {
  code: 0,
  msg: 'OK',
  data: {
    'list|0-20': [
      {
        'form_id|+1': 1,
        create_time: '@cname',
        form_name: '@cname',
        form_type_name: '@cname',
        description: '@cname',
        admin_nickname: '@cname',
        functionals: '@cname',
        enable: '@integer(0,1)'
      }
    ],
    pages: {
      page_size: 20,
      page_no: 1,
      total: 50
    }
  }
})

Mock.mock(/\?ct=form&ac=form_type/, {
  code: 0,
  msg: 'OK',
  data: {
    'list|0-20': [
      {
        'form_type_id|+1': 1,
        cn_name: '@cname',
        en_name: '@name',
        delete_time: '@integer(0,1)'
      }
    ],
    pages: {
      page_size: 20,
      page_no: 1,
      total: 50
    }
  }
})
