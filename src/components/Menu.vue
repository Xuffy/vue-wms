<template>
  <div class="dx-menu-box" v-bind:class="{show:showMenu}" @click="hideMenu">
    <nav class="dx-menu" @click="cancelBubble($event)">
      <el-menu default-active="1"
               class="el-menu-vertical-demo"
               :default-openeds="menuOpen">
        <el-submenu v-for="(item,index) in menuConfig" :key="index" :index="index + ''">
          <template slot="title"><i v-bind:class="[item.icon]"></i>{{item.name}}</template>
          <el-menu-item v-for="(cItem,cIndex) in item.child" :key="cIndex"
                        :index="index + '-' + cIndex"
                        @click="clickMenu({path:cItem.path,params:cItem.params || {}})">订单列表
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </nav>
  </div>
</template>

<script>
  import Vue from 'vue'
  import VueRouter from 'vue-router'
  import {menu, submenu, menuItem, menuItemGroup} from 'element-ui'

  Vue.use(menu);
  Vue.use(submenu);
  Vue.use(menuItem);
  Vue.use(menuItemGroup);

  export default {
    name: 'menu',
    data: function () {
      return {
        showMenu: false,
        menuOpen: ['0'],
        menuConfig: [
          {
            name: '订单管理',
            icon: 'iconfont icon-dingdan3',
            child: [
              {
                name: '订单列表',
                path: '/order',
              }
            ]
          }
        ]
      }
    },
    created: function () {
      this.$parent.$on('hide-menu', this.hideMenu);
      this.$parent.$on('update-menu', this.updateMenu);
    },
    methods: {
      clickMenu: function (params) {
        this.$router.push(params);
        this.showMenu = false;
      },
      hideMenu: function () {
        this.showMenu = !this.showMenu;
      },
      cancelBubble: function (event) {
        event.cancelBubble = true;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .dx-menu-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    z-index: 999;
    box-sizing: border-box;
    transition: all 0.7s;
  }

  .dx-menu {
    position: fixed;
    width: 210px;
    top: 70px;
    left: 0;
    height: 100%;
    background-color: #3F3F3F;
    overflow: auto;
    z-index: 2;
    transition: all .5s;
  }

  .dx-menu-box.fullScreen {
    display: none;
  }

  .dx-menu .el-submenu__title,
  .dx-menu .el-menu-item .title {
    color: #ffffff;
  }

  .dx-menu .el-submenu__title:before {
    content: '';
  }

  .dx-menu .el-menu-item.is-active {
    background-color: #62615e;
    color: #ffffff;
  }

  .dx-menu .el-submenu__title .iconfont {
    margin-right: 10px;
  }

  .dx-menu .el-submenu .el-menu {
    background-color: #262626;
  }

  .dx-menu .el-submenu__title:hover {
    background-color: #333333;
  }

  .dx-menu .el-submenu .el-menu-item:hover {
    background-color: #62615e;
  }

</style>
