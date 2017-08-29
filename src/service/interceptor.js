'use strict';

import store from 'store'
import {Message, Loading} from 'element-ui'

export default function (request, next) {

  let token, loading;

  loading = Loading.service({fullscreen: true});

  token = store.get('token');

  token && request.headers.set('utouu-open-client-ticket', token);

  next(function (response) {
    loading.close();

    if (response.data && typeof response.data === 'string') {
      response.data = JSON.parse(response.data);
    }

    if (response.status !== 200) {
      return Message({
        message: '网络异常，请稍后重试...',
        type: 'error'
      });
    }

    return response;
  });

}
