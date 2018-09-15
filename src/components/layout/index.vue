<template>
  <div class="app-wrapper">
    <v-header></v-header>
    <v-menu></v-menu>
    <div class="main-container" :class="{fullBox:layout.hideMenu}">

      <section class="app-main" :style="{paddingRight:layout.paddingRight || '15px'}">
        <div class="content">
          <transition name="el-fade-in-linear">
            <router-view :key="key"></router-view>
          </transition>
        </div>
      </section>
    </div>


  </div>
</template>

<script>
  import VHeader from './header'
  import VMenu from './menu'
  import {mapActions, mapState} from 'vuex';

  export default {
    name: 'layout',
    components: {
      VHeader,
      VMenu,
    },
    data() {
      return {
      }
    },
    watch: {},
    mounted() {
    },
    computed: {
      ...mapState({
        layout: state => state.layout
      }),
      key() {
        return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
      },
    },
    methods: {}
  }
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>

  .main-container {
    width: 100%;
    padding-left: 180px;
    padding-top: 60px;
    transition: all .4s;
    box-sizing: border-box;
  }

  .app-main {
    padding-top: 40px;
    padding-left: 15px;
    padding-right: 15px;
    padding-bottom: 10px;
    position: relative;
    transition: all .5s;
  }

  .app-main .content {
    background-color: #FFFFFF;
    height: 100%;
    padding: 10px;
    border-radius: 5px;
    min-height: 80vh;
  }

  .main-container.fullBox {
    padding-left: 50px !important;
  }


  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-header-bar {
    height: 40px;
    line-height: 40px;
  }

  .layout-logo-left {
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }

  .menu-icon {
    transition: all .3s;
  }

  .rotate-icon {
    transform: rotate(-90deg);
  }

  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }

  .menu-item i {
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }

  .collapsed-menu span {
    width: 0;
    transition: width .2s ease;
  }

  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }

</style>
