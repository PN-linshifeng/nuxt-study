// const delay = require('mocker-api/utils/delay'); // 延迟请求
const delay = require('mocker-api/lib/delay')
const Mock = require('mockjs')

let dataList = {}
function queryList(req, res, next) {
  try {
    const { id, page = 1 } = req.query
    if (id) {
      const filterData = dataList.data.filter((k) => {
        return k.ids.toString().includes(id)
      })
      dataList = Mock.mock({
        data: filterData,
        page: Number(page),
        total: filterData.length,
      })
    } else {
      dataList = Mock.mock({
        'data|10': [
          {
            id: '@natural',
            buyer: '@cname',
            seller: '@cname',
            time: '@date("yyyy-MM-dd")',
            logistics: {
              tel: '13@natural(100000000,999999999)',
              name: '@cname',
              add: '@county(true)',
              state: '@boolean',
              number: '@string("upper",2)@string("number",6)',
              'data|1-5': ['@county(true)'],
            },

            'order|1-5': [
              {
                id: '@natural',
                image: '@image("60x60","#ffdd00")',
                title: '@ctitle',
                amount: '@natural(1,10)',
                prise: '@float(50,2000,0,2)',
                url: '@url("http")',
                remacks: '@cparagraph(1)',
                return: '@boolean',
              },
            ],
          },
        ],
        page: Number(page),
        'total|20-1000': 1,
      })
    }

    return res.json(dataList)
  } catch (err) {
    res.status(500).json({ message: 'err' })
  }
}

function getInfo(req, res) {
  const { id } = req.params

  const data =
    (dataList.data && dataList.data.filter((item) => item.id == id)) || []

  return data.length > 0
    ? res.json({ ...data[0] })
    : res.status(404).json({ message: '查找不到订单' })
}

function logistics(req, res, next) {
  try {
    const { id, number } = req.body
    const index = dataList.data.findIndex((k) => k.id === id)
    if (index >= 0) {
      dataList.data[index].logistics.number = number
    } else {
      return res.status(400).json({ message: '发货失败' })
    }

    return res.json(dataList.data[index])
  } catch (err) {
    next(err)
  }
}

// 退货
function returnOrder(req, res) {
  const { id, order } = req.body
  const index = dataList.data.findIndex((k) => k.id === id)
  if (index >= 0) {
    const item = dataList.data[index].order
    for (let i = 0; i < item.length; i += 1) {
      if (order.includes(item[i].id)) {
        item[i].return = true
      }
    }
  } else {
    return res.status(400).json({ message: '退货失败' })
  }
  return res.json(dataList.data[index])
}

module.exports = delay(
  {
    'GET /api/order/queryList': queryList,
    'GET /api/order/getInfo/:id': getInfo,
    'PUT /api/order/logistics': logistics,
    'PUT /api/order/returnOrder': returnOrder,
  },
  500
)
