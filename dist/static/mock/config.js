export default [
  {data: require('./login').default, reg: '^.*\/login.*$'},
  {data: require('./orderList').default, reg: '^.*\/order\/getOrderInfoList.*$'},
  {data: require('./orderDetail').default, reg: '^.*\/order\/getOrderInfoDetil.*$'},
  {data: require('./orderTaskDetail').default, reg: '^.*\/order\/getTaskOrderInfoDetil.*$'},
  {data: require('./categoryList').default, reg: '^.*\/order\/findCategoryList.*$'},
]
