export default {
  env: {
    local:{
      // api: 'http://192.168.51.138:30706/v3/factory'
      // api: 'http://192.168.50.197:30706/v3/factory'
      api: 'http://factory.test.tailorx.cn/api/v3/factory'
    },
    develop: {
      api: 'http://factory.dev.tailorx.cn/api/v3/factory'
    },
    test: {
      api: 'http://factory.test.tailorx.cn/api/v3/factory'
    },
    production: {
      api: 'http://factory.tailorx.cn/api/v3/factory'
    }
  }[process.env.NODE_ENV]
}
