// const delay = require('mocker-api/utils/delay'); // 延迟请求
const delay = require('mocker-api/lib/delay')
const Mock = require('mockjs')

let data = {}

function init(req, res) {
  const { page = 1, name } = req.query
  if (name) {
    const filterData = data.data.filter((k) => {
      return k.name.includes(name)
    })
    data = Mock.mock({
      data: filterData,
      page,
      total: filterData.length,
    })
  } else {
    data = Mock.mock({
      'data|10': [
        {
          'id|+1': 1,
          name: '@cname',
          'age|0-20': 1,
          time: '@date("yyyy-MM-dd")',
          department: '@cword(4)',
          position: '@cword(4)',
          'admin|0-1': 0,
        },
      ],
      page,
      'total|20-1000': 1,
    })
  }

  return res.json(data)
}

/**
 * 添加职工
 */
function addUser(req, res) {
  const {
    name = '',
    age = '',
    time = '',
    department = '',
    position = '',
    admin = '0',
  } = req.body
  const newUser = { name, age, time, department, position, admin }
  data.data && data.data.unshift(newUser)
  data.data && data.data.pop()
  return res.json(newUser)
}

/**
 * 删除职工
 */
function deleteUser(req, res) {
  let { data: oldData } = data
  const { id = 0 } = req.body
  oldData = oldData.filter((k) => k.id !== id)
  data.data = oldData
  return res.status(204).json()
}

/**
 * 更新职工
 */
function updateUser(req, res) {
  // const { name = '', age = '', time = '', department = '', position = '', admin = '0' } = req.body;
  const { id } = req.body
  for (let i = 0; i < data.data.length; i += 1) {
    if (data.data[i].id === id) {
      data.data[i] = { ...data.data[i], ...req.body }
      break
    }
  }
  return res.json(data)
}

module.exports = delay(
  {
    'GET /api/getUserList': init,
    'POST /api/addUser': addUser,
    'DELETE /api/deleteUser': deleteUser,
    'PUT /api/updateUser': updateUser,
  },
  1000
)
