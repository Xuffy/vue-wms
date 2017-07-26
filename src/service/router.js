export default [
  {
    path: '*',
    meta: {
      name: '订单列表'
    },
    component: function (resolve) {
      require(['../views/order/index.vue'], resolve)
    }
  },
  {
    path: '/',
    meta: {
      name: '订单列表'
    },
    component: function (resolve) {
      require(['../views/order/index.vue'], resolve)
    }
  },
  {
    path: '/order',
    meta: {
      name: '订单列表'
    },
    component: function (resolve) {
      require(['../views/order/index.vue'], resolve)
    }
  },
  {
    path: '/order/info',
    meta: {
      name: '订单详情'
    },
    component: function (resolve) {
      require(['../views/order/info.vue'], resolve)
    }
  },
  {
    path: '/login',
    meta: {
      name: '登录'
    },
    component: function (resolve) {
      require(['../views/login.vue'], resolve)
    }
  }
]
