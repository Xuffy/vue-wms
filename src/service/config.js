export default {
  // 环境配置
  ENV: {
    local: {
      MOCK: 'https://www.easy-mock.com/mock/5abe0744a2146a37688ec3c1/api',
      LOGIN_URL: 'http://dev.auth.ucnscm.cn',
      // LOGIN_URL: 'http://192.168.51.220:8070',
      // LOGIN_URL: 'http://192.168.51.138:8070',
      LJ: '//192.168.51.208:11001',
      // BASE_CS: '//192.168.51.170:11001',


      // BASE_URL: '//192.168.51.25:11001', // 采购端
      BASE_URL: '//192.168.51.208:11001', // 采购端
      USSO_URL: '//192.168.51.208:11006', // sso 服务
      UUSER_URL: '//192.168.51.208:11004', // 用户中心
      UMETA_URL: '//192.168.51.208:11005', // 元数据
      UMESSAGE_URL: '//192.168.51.208:11007', // 消息服务
      ULOG_URL: '//192.168.51.208:11008', // 日志服务
      UPURCHASE_URL: '//192.168.51.208:11001', // 采购端 dev
      USUPPLY_URL: '//192.168.51.208:11002', // 供应商端 dev
      USERVICE_URL: '//192.168.51.208:11003', // 服务商端
      UOSS_URL: '//192.168.51.208:', // 对象存储服务
      UBIZLOG_URL: '//192.168.51.208:13301', // 业务日志
      UWORKBENCH_URL: '//192.168.51.208:11010',
      UIE_URL: '//192.168.51.208:13003',

      OSS_BUCKET_PUBLIC: 'dev-public-dx-oss',
      OSS_BUCKET_PRIVATE: 'dev-private-dx-oss'

    },
    develop: {
      LOGIN_URL: 'http://dev.auth.ucnscm.cn',
      BASE_URL: '//192.168.51.208:11001', // 采购端
      USSO_URL: '//192.168.51.208:11006', // sso 服务
      UUSER_URL: '//192.168.51.208:11004', // 用户中心
      UMETA_URL: '//192.168.51.208:11005', // 元数据
      UMESSAGE_URL: '//192.168.51.208:11007', // 消息服务
      ULOG_URL: '//192.168.51.208:11008', // 日志服务
      UPURCHASE_URL: '//192.168.51.208:11001', // 采购端
      USUPPLY_URL: '//192.168.51.208:11002', // 供应商端
      USERVICE_URL: '//192.168.51.208:11003', // 服务商端
      UOSS_URL: '//192.168.51.208:', // 对象存储服务
      UBIZLOG_URL: '//192.168.51.208:13301', // 业务日志
      UWORKBENCH_URL: '//192.168.51.208:11010',
      UIE_URL: '//192.168.51.208:13003',

      OSS_BUCKET_PUBLIC: 'dev-public-dx-oss',
      OSS_BUCKET_PRIVATE: 'dev-private-dx-oss'
    },
    test: {
      LOGIN_URL: 'http://test.auth.ucnscm.cn', // 登录授权
      BASE_URL: '//test.upurchase-facade.ucnscm.cn', // 采购端
      USSO_URL: '//test.usso-facade.ucnscm.cn', // sso 服务
      UUSER_URL: '//test.uuser-facade.ucnscm.cn', // 用户中心
      UMETA_URL: '//test.umeta-facade.ucnscm.cn', // 元数据
      UMESSAGE_URL: '//test.umessage-facade.ucnscm.cn', // 消息服务
      UOSS_URL: '//test.uoss-facade.ucnscm.cn', // 对象存储服务
      ULOG_URL: '//test.ulog-facade.ucnscm.cn', // 日志服务
      UPURCHASE_URL: '//test.upurchase-facade.ucnscm.cn', // 采购端
      USUPPLY_URL: '//test.usupply-facade.ucnscm.cn', // 供应商端
      USERVICE_URL: '//test.uservice-facade.ucnscm.cn', // 服务商端
      UBIZLOG_URL: '//test.ubizlog-facade.ucnscm.cn', // 业务日志
      UWORKBENCH_URL: '//test.uworkbench-facade.ucnscm.cn',
      UIE_URL: '//test.uie.ucnscm.cn',

      OSS_BUCKET_PUBLIC: 'test-public-dx-oss',
      OSS_BUCKET_PRIVATE: 'test-private-dx-oss'
    },
    production: {
      BASE_API: 'https://store.tailorx.cn/api'
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
  STORE_PREFIX: 'ucn_'
}
