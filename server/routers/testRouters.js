// 测试路由
const express = require('express')

const router = express.Router()

const { db, genid } = require('../db/dbUtil')

// 测试数据库和雪花id是否正常运行
router.get('/test', async (req, res) => {
  // db.all('select * from admin', [], (err, rows) => {
  //   console.log(rows);
  // })
  let result = await db.async.all('select * from admin', [])
  res.send({
    id: genid.NextId(),
    result
  })
})

module.exports = router