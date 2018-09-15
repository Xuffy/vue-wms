<template>
</template>

<script>
  export default {
    name: 'workbench',
    components: {
    },
    data() {
      return {
      }
    },
    created() {
    },
    mounted() {
    },
    computed: {
    },
    methods: {
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .workbench .el-col-12 {
    margin-bottom: 20px;
  }

  .quickLink .el-button {
    margin-top: 10px;
  }

  .welcome-box {
    position: fixed;
    top: 0;
    right: 0;
    width: 230px;
    height: 100%;
    padding: 100px 10px 10px 10px;
    background-color: #FFFFFF;
    box-sizing: border-box;
    z-index: 10;;
    transition: all .5s;
    transform: translate(120%, 0);
  }

  .welcome-box.show {
    transform: translate(0, 0);
  }

  .welcome-box li {
    margin-top: 10px;
  }

  .welcome-box .title {
    font-size: 16px;
    line-height: 20px;
    color: #666666;
  }

  .welcome-box /deep/ .el-checkbox__inner,
  .welcome-box /deep/ .el-checkbox__label {
    cursor: pointer !important;
    color: #999999 !important;
  }

  .welcome-box /deep/ .el-button {
    margin-left: 22px !important;
  }

</style>
<style>
  /*.workbench-notify {
    !*width: 250px;*!
  }*/
</style>
