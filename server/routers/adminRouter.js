const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
const { db, genid } = require('../db/dbUtil')

// 登录接口
router.post('/login', async (req, res) => {
  console.log(req.body);
  // 将前端的账号和密码解构出来
  let { username, password } = req.body
  // 接收数据库查询的结果
  let { err, rows } = await db.async.all('select * from admin where username=? AND password = ?', [username, password])
  // 如果查询到
  if (err == null && rows.length > 0) {
    // 创建变量接收数据
    let admin_info = rows[0]
    // 生成token
    let login_token = uuidv4()
    // 更新token语句
    let update_token_sql = `UPDATE admin set token = ? where id=?`

    // 将token插入到当前查询到的用户信息中
    await db.async.run(update_token_sql, [login_token, rows[0].id])
    // 变量同时也加上token
    admin_info.token = login_token
    // 将密码置空防止信息泄露
    admin_info.password=''
    res.send({
      code: 200,
      msg: '登录成功',
      data: admin_info
    })
  } else {
    // 如果未查询到
    res.send({
      code: 500,
      msg: '登录失败'
    })
  }
})

module.exports = router