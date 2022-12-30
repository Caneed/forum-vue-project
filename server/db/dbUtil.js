const sqlite3 = require('sqlite3').verbose()

const genId = require('../utils/snowFlake')

const path = require('path')
const Genid = require('../utils/snowFlake')

let db = new sqlite3.Database(path.join(__dirname, 'blog.db'))
const genid = new genId({ WorkerId: 1 })

// 将db方法封装成promise风格
db.async={}
db.async.all=(sql,params)=>{
  return new Promise((resolve,reject)=>{
    db.all(sql,params,(err,rows)=>{
      resolve({err,rows})
    })
  })
}

db.async.run=(sql,params)=>{
  return new Promise((resolve,reject)=>{
    db.run(sql,params,(err,rows)=>{
      resolve({err,rows})
    })
  })
}
module.exports = { genid, db }
