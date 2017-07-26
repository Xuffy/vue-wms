'use strict';

import Mock from 'mockjs'
import mockConfig from './config.js'

export default function (url, resolve, reject) {
  var data = null;

  mockConfig.map(function (val) {
    if (new RegExp(val.reg).test(url)) {
      data = Mock.mock(val.data);
    }
  });

  data ? resolve(data) : reject('api - {0}\nError:无模拟数据'.format(url));
}
