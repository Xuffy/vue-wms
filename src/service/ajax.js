'use strict';

import env_config from './config'
import Vue from 'vue'
import _ from 'underscore'
import store from 'store'
import {Message} from 'element-ui'

const ajax = function (config) {
  // let _this = this;
  this.config = config || {};
  this.type = 'GET';

  /**
   * 数据过滤
   * @param res
   */
  this.filter = function (res) {
    if (res.data.code === '501') {
      router.push('/login');
      Message({
        message: res.data.msg,
        type: 'warning'
      });
      throw new Error(res.data.msg);
    }

    if (res.data.code !== '200') {
      Message({
        message: res.data.msg,
        type: 'warning'
      });
      throw new Error(res.data.msg + '\n' + res.url);
    }

    return res.data.data;
  };


  /**
   * 发送请求
   * @param url
   * @param params
   * @param config
   * @returns {Promise.<TResult>}
   */
  this.send = function (url, params, config) {
    config = config || {};

    if (this.config.mock && (process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'mock')
      && MockData) {
      return new Promise(function (resolve, reject) {
        MockData.default(url, resolve, reject)
      });
    } else {
      // 拼接api根路径
      if (config.api) {
        url = env_config.env[config.api] + url;
      } else {
        url = env_config.env.api + url;
      }

      // ignoreToken是否忽略token验证
      if (!config.ignoreToken && _.isEmpty(store.get('token'))) {
        router.push('/login');
      }


      switch (this.type) {
        case 'GET':
          return Vue.http.get(url, {params: params}).then(this.filter);
        case 'POST':
          return Vue.http.post(url, params).then(this.filter);
      }

    }
  };
};

/**
 *
 * @param url
 * @param params
 * @param config
 */
ajax.prototype.get = function (url, params, config) {
  this.type = 'GET';

  return this.send(url, params, config);
};

/**
 *
 * @param url
 * @param params
 * @param config
 */
ajax.prototype.post = function (url, params, config) {

  this.type = 'POST';
  return this.send(url, params, config);
};


export default ajax;
