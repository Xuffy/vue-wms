<template>
  <div id="app" class="dx-app">
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapActions, mapState} from 'vuex';

  export default {
    name: 'app',
    components: {},
    computed: {
      ...mapState({
        quickLink: state => state.quickLink,
        layout: state => state.layout,
        menuLink: state => state.menuLink,
        viewPicture: state => state.viewPicture
      }),
    },
    watch: {
      $route(val) {
        this.menuLink.list = [];

        this.layout.paddingRight = 0;
      }
    },
    created() {
      this.menuLink.list = [];
      this.layout.hideMenu = this.$userAction.get('hideMenu');
    },
    mounted() {
      this.viewPicture.vm = this.$refs.viewPicture;
    },
    methods: {
    }
  }
</script>


<style lang="less">

  #app {
  }
</style>
