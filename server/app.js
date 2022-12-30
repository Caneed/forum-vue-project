const express = require('express')
const multer = require('multer')
// 引入body-parser解决body为undefined的问题
const app = express()
const port = 3000
// 跨域请求中间件
app.use(function (req, res, next) {
  // 允许跨域请求的域名,'*'代表任何域名
  res.header('Access-Control-Allow-Origin', '*')
  // 允许跨域请求的header类型
  res.header('Access-Control-Allow-Headers', '*')
  // 允许跨域请求的方法
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,GET,POST,OPTIONS')
  if (req.method === 'OPTIONS') res.sendState(200)
  else next()
})
// json中间件
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// 用户路由的注册
app.use('/admin', require('./routers/adminRouter'))
// 上传
const update = multer({
  dest: './public/upload/temp'
})
app.use(update.any())

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on http://localhost:${port}`))