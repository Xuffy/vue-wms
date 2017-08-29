<template>
  <div id="app">
    <v-header v-bind:class="{fullScreen:isFullScreen}"></v-header>
    <!--menu 组件必须放在第二个-->
    <v-menu v-bind:class="{fullScreen:isFullScreen}"></v-menu>
    <section class="dx-content" v-bind:class="{fullScreen:isFullScreen}">
      <div class="dx-breadcrumb">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item
            v-for="item in breadcrumbList" track-by="$index"
            :key="item.path"
            :to="{path:item.path}">{{item.name}}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <transition name="el-fade-in-linear">
        <router-view></router-view>
      </transition>
    </section>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VHeader from '@/components/Header'
  import VMenu from '@/components/Menu'
  import _ from 'underscore'
  import {breadcrumb, breadcrumbItem} from 'element-ui'
  import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
  import store from 'store'

  Vue.use(breadcrumb);
  Vue.use(breadcrumbItem);
  Vue.component(CollapseTransition.name, CollapseTransition);

  export default {
    name: 'app',
    data: function () {
      return {
        breadcrumbList: [],
        contentClass: [],
        isFullScreen: false,
        menuConfig: []
      }
    },
    created: function () {
      // 设置内容全屏 即：隐藏header和menu
      this.$on('full-screen', this.fullScreen);
    },
    updated: function () {
    },
    mounted: function () {
      this.updateBreadcrumb();
    },
    methods: {
      updateBreadcrumb: function (params) {
        this.breadcrumbList = params;
      },
      /**
       * 刷新页面时更新面包屑导航
       * 更新机制：检索menuConfig配置，找出对应关系
       * @param to       [object/string/empty]
       * @param from     [object/string/empty]
       */
      /*updateBreadcrumb: function (to, from) {
        let _this = this
          , urlHash = null
          , menuConfig = this.$children[1].menuConfig;

        // 注：因为第一次加载页面，不会出发router.beforeEach
        // 通过window.location.hash获取当前页面路由地址
        if ((!to || !from || _.isString(to)) && _.isEmpty(this.breadcrumbList)) {
          urlHash = window.location.hash.match(/#(\S*)/)[1];
          urlHash = urlHash.match(/(\S*)\?/) ? urlHash.match(/(\S*)\?/)[1] : urlHash;

          // 当前路径为根路径时，默认显示menuConfig配置中第一项
          if (urlHash === '/') {
            this.breadcrumbList = [menuConfig[0], menuConfig[0].child[0]];
          }
          // 当前路径能在enuConfig配置中匹配成功
          else if (!_.isString(to)) {
            _.map(menuConfig, function (val) {
              let cur = _.findWhere(val.child, {path: urlHash});
              if (cur) {
                _this.breadcrumbList = [val, cur];
              }
            });
          }
          // menuConfig配置无法匹配成功，该页面为更深层级的子页面，需子页面中调用函数
          else {
            let pm = _.findWhere(menuConfig, {type: to})
              , cm = _.findWhere(pm.child, {type: from});
            _this.breadcrumbList = [pm, cm, {name: this.$children[3].$route.meta.name}];
          }
        }
        //
        else if (!_.isString(to)) {
          let newBl = [];
          for (let i = 0; i < this.breadcrumbList.length; i++) {
            if (this.breadcrumbList[i].path === to.path || this.breadcrumbList[i].name === to.meta.name) {
              newBl.push({name: to.meta.name});
              break;
            }

            newBl.push(this.breadcrumbList[i]);

            if (i + 1 === this.breadcrumbList.length) {
              newBl.push({name: to.meta.name});
            }
          }
          this.breadcrumbList = newBl;
          console.log(to, from)
          console.log(newBl)
        }
      },*/
      fullScreen: function (type) {
        this.isFullScreen = type;
      },
    },
    components: {
      VHeader,
      VMenu
    }
  }
</script>

<style>
  @import './assets/css/theme/index.css';
  @import './assets/font/iconfont.css';
  @import './assets/css/reset.css';
  @import './assets/css/main.css';
  @import './assets/css/media.css';
</style>
