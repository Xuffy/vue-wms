import dateFormat from 'dateformat';
import {localStore, sessionStore} from 'service/store';
import router from 'service/router'
import $fetch from 'service/fetch'
import _config from "./config";
import store from '@/store';
import Qs from 'qs'
import Downloadjs from 'downloadjs';
import {Message, MessageBox} from 'element-ui';

// 需要直接下载的文件格式
const NEED_DOWNLOAD_FILE = ['jpg', 'gif', 'png', 'pdf', 'txt', 'bmp', 'jpeg', 'webp'];

const Util = {
  /**
   * 本地永久缓存
   */
  $localStore: localStore,

  /**
   * 本地会话缓存
   */
  $sessionStore: sessionStore,

  /**
   * 格式化日期
   */
  $dateFormat() {
    return arguments[0] ? dateFormat(...arguments) : '';
  },


  /**
   * 公共请求
   */
  $fetch,
  /**
   * 生成唯一标识
   * @returns {string}
   */
  $getUUID() {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      let r = (d + Math.random() + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  },

  /**
   * 字节转换
   * @returns {string}
   */
  $bytesConvert(val) {
    if (val === 0) {
      return '0 B'
    }

    let k = 1024
      , sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      , i = Math.floor(Math.log(val) / Math.log(k));

    return (val / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  },


  /**
   * 下载
   * @param url
   * @returns {boolean}
   */
  $download(url) {
    let str, flag;

    if (!url || !_.isString(url)) {
      return false;
    }

    str = url.split('?')[0];
    flag = false;
    if (str && _.find(NEED_DOWNLOAD_FILE, val => str.toLocaleLowerCase().indexOf(val.toLocaleLowerCase()) > -1)) {
      Downloadjs(url);
    } else {
      window.open(url);
    }
  },

  /**
   * 用户行为缓存
   * @type {{set(*, *): void, get(*): *}}
   */
  $userAction: {
    set(key, value) {
      let ua = sessionStore.get('user_action') || {};
      ua[key] = value;
      sessionStore.set('user_action', ua);
    },
    get(key) {
      let ua = sessionStore.get('user_action') || {};
      return ua[key];
    }
  },


  /**
   * 深拷贝
   * @param data
   * @returns {*}
   */
  $depthClone(data) {
    return data ? JSON.parse(_.clone(JSON.stringify(data))) : data;
  },
}

export default Util;
