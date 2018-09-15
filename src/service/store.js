import engine from 'storejs/src/store-engine.js';
import config from  'service/config';

// store 配置
let storePrefix
  , store_plugins = [
  require('storejs/plugins/defaults'),
  require('storejs/plugins/expire')
]
  , localStore = engine.createStore([
  require('storejs/storages/localStorage'),
  require('storejs/storages/cookieStorage'),
], store_plugins)
  , sessionStore = engine.createStore([
  require('storejs/storages/sessionStorage')
], store_plugins);

storePrefix = () => {
  return {
    set: (super_fn, key, value) => {
      return super_fn(config.STORE_PREFIX + key);
    },
    get: (super_fn, key, value) => {
      return super_fn(config.STORE_PREFIX + key);
    },
    remove: (super_fn, key, value) => {
      return super_fn(config.STORE_PREFIX + key);
    }
  }
};

localStore.addPlugin(storePrefix);
sessionStore.addPlugin(storePrefix);

export {
  localStore,
  sessionStore
};

