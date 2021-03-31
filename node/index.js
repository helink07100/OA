const http = require('http')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  )
  res.setHeader('Access-Control-Allow-Credentials', true) // 设置方法
  res.setHeader(
    'Access-Control-Allow-Methods',
    'PUT, POST, GET, DELETE, OPTIONS'
  ) // 设置方法
  const url = new URL(req.url, `http://${req.headers.host}`)
  if (req.method === 'OPTIONS') {
    res.end() // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
  } else {
    const result = {
      code: 0,
      msg: '修改成功'
    }

    let chunks = ''
    switch (url.pathname) {
      case '/menus':
        req.on('data', (chunk) => {
          chunks += chunk.toString()
        })
        req.on('end', () => {
          try {
            const menus = {
              code: 0,
              data: JSON.parse(chunks)
            }
            fs.writeFileSync(
              path.resolve(__dirname, '../static/menus.json'),
              JSON.stringify(menus, null, 2),
              'utf8'
            )
          } catch (e) {
            result.code = -1
            result.msg = e.message
          }
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(result))
        })
        break
      default:
        res.end()
    }
  }
})

server.listen(9999)
