// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'
import routerConfig from './service/router'
import interceptor from './service/interceptor'
import ajax from './service/ajax'
import * as filters from './service/filters'
import store from 'store'
import './service/util'


Vue.use(VueRouter);
Vue.use(VueResource);

/******************过滤器***********************/
Vue.filter('date', filters.dateFilter);
/***********************************************/

// 设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;

// ajax请求配置
Vue.prototype.ajax = new ajax({
  mock: true, // 当环境为‘local’和‘mock’时 该设置有效
});

Vue.http.interceptors.push(interceptor);

/******************路由配置*********************/
const router = new VueRouter({
  // mode: 'history',
  linkActiveClass: 'active',
  hashbang: true,
  routes: routerConfig
});

new Vue({
  router: router,
  render: function (h) {
    return h(App);
  }
}).$mount('#app');


router.beforeEach(function (to, from, next) {
  let routerApp = router.app.$children[0];

  to.path === '/login' ?
    routerApp.$emit('full-screen', true) :
    routerApp.$emit('full-screen', false);

  next();
});

window.router = router;
/***********************************************/


/******************登录验证*********************/

!store.get('token') && router.push('/login');

/**********************************************/
