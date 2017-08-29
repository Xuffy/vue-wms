<template>
  <div class="login dx-content-box" v-show="hideBox">
    <div class="login-top"></div>
    <section id="login-app" class="login-box">
      <div style="text-align: center;">
        <i class="logo"></i>
        <span class="title">TailorX Factory</span>
      </div>
      <div class="login-form">
        <div class="form-item" @click="focusInput($event,'usernameFocus')"
             v-bind:class="[usernameFocus]">
          <span class="placeholder">您的手机号或用户名</span>
          <label class="form-label">
            <i class="iconfont icon-shouji"></i>
          </label>
          <div class="input-inline">
            <span class="line"></span>
            <el-tooltip class="item"
                        :value="!!usernameTip"
                        :manual="true"
                        effect="dark"
                        popper-class="dx-theme-back"
                        :content="usernameTip"
                        placement="top-start">
              <input type="text" placeholder="" autocomplete="off" class="input username"
                     v-model="username"
                     v-on:focus="focusInput($event,'usernameFocus')"
                     v-on:blur="usernameFocus = username ? 'exist' : ''">
            </el-tooltip>
          </div>
        </div>
        <div class="form-item" style="margin-top: 40px;" @click="focusInput($event,'passwordFocus')"
             v-bind:class="[passwordFocus]">
          <span class="placeholder">密码</span>
          <label class="form-label">
            <i class="iconfont icon-suo"></i>
          </label>
          <div class="input-inline">
            <span class="line"></span>
            <el-tooltip class="item"
                        :value="!!passwordTip"
                        :manual="true"
                        effect="dark"
                        popper-class="dx-theme-back"
                        :content="passwordTip"
                        placement="top-start">
              <input type="password" autocomplete="off" class="input password"
                     v-model="password"
                     v-on:focus="focusInput($event,'passwordFocus')"
                     v-on:blur="passwordFocus = password ? 'exist' : ''">
            </el-tooltip>
          </div>
        </div>
        <div class="form-item" style="margin-top: 50px;">
          <div class="input-block" style="margin-left: 10%">
            <el-button type="primary" @click="submitLogin"
                       style="background-color: #f36;width: 100%;border-color: #f36">登录
            </el-button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Vue from 'vue'
  import $ from 'zepto'
  import store from 'store'
  import md5 from 'js-md5'
  import {button, tooltip} from 'element-ui'

  Vue.use(button);
  Vue.use(tooltip);

  export default {
    name: 'login',
    data: function () {
      return {
        hideBox: true,
        usernameFocus: '',
        passwordFocus: '',
        username: '',
        password: '',
        usernameTip: '',
        passwordTip: ''
      }
    },
    created: function () {
      store.clearAll();
      this.$parent.$emit('full-screen', true);
      this.onKeyDown();
    },
    methods: {
      focusInput: function (_this, key) {
        let e = $(_this.currentTarget);
        this[key] = 'active';
        e.find('input').focus();
        this.usernameTip = '';
        this.passwordTip = '';
      },
      onKeyDown: function () {
        let _this = this;
        document.onkeydown = function (event) {
          let e = event || window.event;
          if (e && e.keyCode === 13) {
            _this.submitLogin();
          }
        };
      },
      submitLogin: function () {
        let _this = this;
        this.usernameTip = '';
        this.passwordTip = '';
        if (!this.username) {
          this.usernameTip = '请输入用户名';
        } else if (!this.password) {
          this.passwordTip = '请输入密码';
        }
        if (this.username && this.password) {
          this.ajax.post('/user/login', {username: this.username, password: md5(this.password + this.username)})
            .then(function (data) {
              _this.$parent.$emit('update-header', {username: data.user.name});
              store.set('user', data.user);
              store.set('token', data.ticket,new Date().getTime() + 5000);
              _this.hideBox = false;
              let timeout = setTimeout(function () {
                clearTimeout(timeout);
                _this.$router.push('/');
              }, 0);
            });
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-top {
    position: absolute;
    width: 100%;
    height: 398px;
    background-image: url("../assets/img/login-back.jpg");
    background-position: center;
    background-size: cover;
    z-index: -1;
  }

  .login-box {
    max-width: 500px;
    width: 500px;
    height: 380px;
    background-color: #fff;
    position: fixed;
    top: 45%;
    left: 50%;
    margin-top: -190px;
    margin-left: -250px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .3);
  }

  .login-box .logo {
    display: inline-block;
    background-image: url("../assets/img/logo.png");
    width: 70px;
    height: 70px;
    vertical-align: middle;
    margin: 30px 20px 20px 0;
    background-size: 100% 100%;
  }

  .login-box .title {
    display: inline-block;
    vertical-align: middle;
    font-size: 30px;
  }

  .login-form {
    padding-left: 45px;
    padding-right: 45px;
    margin-top: 10px;
    width: 100%;
    box-sizing: border-box;
  }

  .login-form .form-item {
    position: relative;
    width: 100%;
    height: 40px;
  }

  .login-form .placeholder {
    position: absolute;
    z-index: 2;
    color: #b3b3b3;
    left: 10%;
    bottom: 7px;
    font-size: 16px;
    transition: transform ease 0.3s, color ease 0.3s;
  }

  .login-form .form-label {
    width: auto;
    position: absolute;
    left: 0;
    top: 0;
    line-height: 50px;
  }

  .login-form .form-label i {
    font-size: 18px;
  }

  .login-form .input-inline {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-left: 10%;
    position: relative;
  }

  .login-form .form-item .input-inline .line {
    width: 100%;
    position: absolute;
    bottom: 0;
    z-index: 2;
    left: 0;
    padding-left: 10%;
    box-sizing: border-box;
  }

  .login-form .form-item .input-inline .line:before {
    content: '';
    display: block;
    height: 3px;
    width: 0;
    background-color: #f36;
    transition: width .6s;
  }

  .login-form .input {
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 0;
    padding-left: 0;
    border-bottom: 1px solid #e6e6e6;
  }

  .login-form .form-item.active .input-inline .line:before {
    width: 100%;
  }

  .login-form .form-item.exist .placeholder {
    transform: translateY(-120%) translateX(-10%) scale(.82);
  }

  .login-form .form-item.active .placeholder {
    transform: translateY(-120%) translateX(-10%) scale(.82);
    color: #ff3366;
  }

  .login-form .form-item.active .form-label i {
    color: #ff3366;
  }

</style>
