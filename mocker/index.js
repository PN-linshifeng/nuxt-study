const todo = require('./todo')
const login = require('./login')
const user = require('./user')
const order = require('./order')

process.on('uncaughtException', function (err) {
  // 打印出错误
  console.log(err)
  // 打印出错误的调用栈方便调试
  // console.log(err.stack);
})

module.exports = {
  // _proxy: {
  //   proxy: {
  //     '/api/(.*)': 'http://192.168.2.52:8090/',
  //     '/(.*)': 'http://192.168.2.38:3000/',
  //   },
  //   pathRewrite: {
  //     '^/api/': '/',
  //   },
  // },

  ...todo,
  ...login,
  ...user,
  ...order,
}
