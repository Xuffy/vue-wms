export default {
  env: {
    local: {
      // api: 'http://192.168.51.138:30706/v3/factory',
      // api: 'http://192.168.11.215:30706/v3/factory'
      api: 'http://factory.test.tailorx.cn/api/v3/factory',
      // appApi: 'http://192.168.51.138:30705'
      appApi: 'http://app.test.tailorx.cn'
    },
    develop: {
      api: 'http://factory.dev.tailorx.cn/api/v3/factory',
      appApi: 'http://app.dev.tailorx.cn'
    },
    test: {
      api: 'http://factory.test.tailorx.cn/api/v3/factory',
      appApi: 'http://app.test.tailorx.cn'
    },
    production: {
      api: 'http://factory.tailorx.cn/api/v3/factory',
      appApi: 'https://app.tailorx.cn'
    }
  }[process.env.NODE_ENV]
}
