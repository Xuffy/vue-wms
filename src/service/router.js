import Vue from 'vue'
import Vuex from 'vuex';
import Router from 'vue-router'
import Config from 'service/config';
import Layout from 'components/layout/index.vue';
// import $i from '../language/index';
import {Notification, Message} from 'element-ui';
import {localStore, sessionStore} from 'service/store';
import Util from 'service/util';

Vue.use(Router);

export const routerMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/workbench/index',
    hidden: true, // 在侧边栏中不显示该菜单
  },
  {
    path: '/login',
    hidden: true,
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/workbench',
    component: Layout,
    meta: {name: ''},
    redirect: '/workbench/index',
    noDropdown: true,
    children: [
      {
        path: 'index',
        name: 'workbench',
        meta: {},
        component: () => import('../views/workbench/index.vue')
      }
    ]
  }
]

let router = new Router({
  mode: 'history',
  routes: routerMap
});

router.beforeResolve((to, from, next) => {
  let ts = localStore.get('token')
    , ri = localStore.get('router_intercept');

  // 登录验证
  // if ((to.path !== '/login' || from.path === '/login') && _.isEmpty(ts)) {
  //   return next({path: '/login'});
  // }

  // 数据验证拦截
  if (ri && (to.path !== ri.path || from.path === ri.path)) {
    return next(ri);
  }

  // 权限验证
  if (to.meta && to.meta.auth && !Util.$auth(to.meta.auth)) {

    return Notification.error({
      // title: $i.hintMessage.systemHints,
      // message: $i.hintMessage.noAuthority
    });
  }

  next();
});

export default router
