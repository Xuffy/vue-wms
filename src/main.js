import Vue from 'vue'
import App from './App'
import router from 'service/router'
import ajax from 'service/ajax'
import config from 'service/config';
import filters from 'service/filters'
import directive from 'service/directive'
import apis from '@/apis/index';
import util from 'service/util';
import '../theme/index.css';
import 'assets/style/main.less';
import ElementUI from 'element-ui';
import store from './store';
import locale from 'element-ui/lib/locale';
import {localStore} from 'service/store';
import 'element-ui/lib/theme-chalk/base.css';

////////////////////////////////////////////////////////




Vue.use(ElementUI, {size: 'mini'});

Vue.config.productionTip = false;
Vue.prototype.$ajax = new ajax();
Vue.prototype.$apis = apis;


// 去掉console
if (config.ENV_FLAG === 'production') {
  console.log = () => {
  }
  // 屏蔽开发环境warn
  console.warn = () => {
  }
}

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Object.keys(directive).forEach(key => {
  Vue.directive(key, directive[key]);
});

Object.keys(util).forEach(key => {
  Vue.prototype[key] = util[key];
});

config.AUTH = config.ENV_FLAG === 'local' ? config.AUTH : true;

// underscorejs配置template
_.templateSettings = {
  interpolate: /\{(.+?)\}/g
};

new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {App}
});
