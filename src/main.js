import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import fastClick from 'fastclick'
import App from './App.vue'
import routerConfig from './service/router'
import interceptor from './service/interceptor'
import ajax from './service/ajax'
import imgPreview from './directives/imgPreview.js'
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
  mock: process.env.NODE_ENV === 'mock' || false, // 当环境为‘local’和‘mock’时 该设置有效
});

Vue.http.options.emulateJSON = true;
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


let routerApp = router.app.$children[0];
router.beforeEach(function (to, from, next) {

  to.path === '/login' ?
    routerApp.$emit('full-screen', true) :
    routerApp.$emit('full-screen', false);

  next();
});

window.router = router;
/***********************************************/


/******************登录验证*********************/

!store.get('token') && (window.location.hash.indexOf('#/pad') < 0) && router.push('/login');

/******************pad显示*********************/

window.location.hash.indexOf('#/pad') > -1 && routerApp.$emit('full-screen', true);

/**********************************************/


if( navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
){
  fastClick.attach(document.body);
}
/**********************************************/

// Directive
Vue.directive('imgPreview', imgPreview);
