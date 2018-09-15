export default {
  // 环境配置
  ENV: {
    local: {
      BASE_URL: '//192.168.51.208:11001'
    },
    develop: {
      BASE_URL: '//192.168.51.208:11001'
    },
    test: {
      BASE_URL: '//192.168.51.208:11001'
    },
    production: {
      BASE_URL: '//192.168.51.208:11001'
    }
  }[process.env.NODE_ENV],

  // 客户端：采购端 1、供应商端 2、服务端 3
  CLIENT_TYPE: 1,

  // 是否开启token验证
  AUTH: true,

  // 环境标识
  ENV_FLAG: process.env.NODE_ENV,

  // 是否mock
  IS_MOCK: false,

  // 请求超时
  TIMEOUT: 60000,

  // 默认语言设置
  LANGUAGE: 'zh-CN',
  // LANGUAGE: 'en',

  // 项目版本号
  VERSION: `2.0.${process.env.VERSION}`,

  // 本地store缓存 前缀
  STORE_PREFIX: 'dx_'
}
