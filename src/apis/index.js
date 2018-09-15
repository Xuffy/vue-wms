import config from '@/service/config';
import twj from './twj';
import lsx from './lsx';
import tl from './tl';
import lyx from './lyx';
import rcy from './rcy';
import xf from './xf';

const apis = _.extend(twj, lsx, tl, lyx, rcy, xf);
const version = ['/web/v1', '/v2', '/web/v3'];


let list = _.mapObject(apis, val => {
  let b = '', v = version[0], u;

  if (config.IS_MOCK && config.ENV_FLAG === 'local') {
    b = config.ENV.MOCK;
  } else if (config.ENV_FLAG !== 'local') {
    u = config.ENV[val[2] || val[1]]
    b = (u || config.ENV.BASE_URL) + v;
  } else if (_.indexOf(_.keys(config.ENV), val[1]) > -1) {
    b = config.ENV[val[1]] + v;
  } else {
    b = config.ENV.BASE_URL + v;
  }
  return b + val[0];
});

list.parse = (url, params) => {
  let tmp = url;
  Object.keys(params).forEach(key => {
    tmp = tmp.replace(new RegExp(`{${key}}`, 'gm'), params[key]);
  });
  return tmp;
};

export default list;
