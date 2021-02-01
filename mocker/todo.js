// import mockjs, { Random } from 'mockjs';
const Mock = require('mockjs') // 模拟数据
// const delay = require('mocker-api/utils/delay') // 延迟请求
// const delay = require('mocker-api/lib/delay')
const delay = require('mocker-api/lib/delay')

const { Random } = Mock
const todoList = []

/** 初始化办事项数据 */
function init(req, res, next) {
  for (let i = 0; i < 5; i += 1) {
    todoList.push(
      Mock.mock({
        title: Random.cparagraph(1),
        name: Random.cname(),
        done: Random.boolean(),
      })
    )
  }
  // res.write()
  // res.statusCode = 200
  // res.end(JSON.stringify({ data: todoList }))

  // next()
}

/** 添加办事项 */
function addData(req, res) {
  let data
  let status = 200
  try {
    const { title } = req.body
    data = Mock.mock({
      title,
      name: Random.cname(),
      done: false,
    })
    todoList.unshift(data)
  } catch (error) {
    status = 400
    data = error
  }

  return res.status(status).json(data)
}

/** 处理办事项 */
function done(req, res) {
  const { index } = req.body
  todoList[index].done = !todoList[index].done
  // return res.json(todoList[index])
}

init()
// export default init
module.exports = delay(
  {
    'GET /api/todo-querys': todoList,
    'POST /api/todo-add': addData,
    'PUT /api/todo-done': done,
  },
  500
)
