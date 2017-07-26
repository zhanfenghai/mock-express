/*
 * @Author: hzzhanfenghai 
 * @Date: 2017-07-25 17:58:33 
 * @Last Modified by: hzzhanfenghai
 * @Last Modified time: 2017-07-26 10:28:34
 */
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const forceRequire = require('require-reload')
const config = require('./config.js')


const cwd = process.cwd()

const mockRoutes = function (router) {
  let data = forceRequire('./data')

  // 每隔1秒重新解析data，刷新data，新增的路由不会生效
  setInterval(function () {
    data = forceRequire('./data')
  }, 1000)

  for (let i in data) {
    (function (v) {
      router.get(v, function (req, res) {
        res.json(
          data[v]
        )
      })
      router.post(v, function (req, res) {
        res.json(
          data[v]
        )
      })
    })(i)
  }
}


const app = express()
const router = express.Router()

app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))
app.use('/', router)

mockRoutes(router)

// 404
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error
app.use((err, req, res) => {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

app.listen(config.port, err => {
  if (err) {
    console.error(err)
  } else {
    console.info('==> Listening on port %s. Open up http://localhost:%s/ in your browser.', config.port, config.port)
  }
})