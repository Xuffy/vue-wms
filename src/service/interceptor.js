'use strict';

import store from 'store'
import {Message, Loading} from 'element-ui'

export default function (request, next) {

    let token, loading;

    loading = Loading.service({fullscreen: true});

    token = store.get('token');
    if (token) {
      request.headers.set('utouu-open-client-ticket', token);
    } else {
      router.push('/login');
    }


    next(function (response) {
      loading.close();
      if (response.status !== 200) {
        return Message({
          message: '网络异常，请稍后重试...',
          type: 'error'
        });
      }

      return response;
    });

}
