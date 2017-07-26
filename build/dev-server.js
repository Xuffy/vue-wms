require('./check-versions')()

process.env.NODE_ENV = 'local';

var config = require('../config')
  , opn = require('opn')
  , path = require('path')
  , express = require('express')
  , webpack = require('webpack')
  , proxyMiddleware = require('http-proxy-middleware')
  , webpackConfig = require('./webpack.dev.conf')
  , os = require('os')
  , iptable = {},
  ifaces = os.networkInterfaces();

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {
  }
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({action: 'reload'})
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {target: options}
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

var uri = 'http://localhost:' + port;

var _resolve;
var readyPromise = new Promise(resolve => {
  _resolve = resolve
});

console.log('> Starting local server...');

// 获取本机IP地址
for (var dev in ifaces) {
  ifaces[dev].forEach(function (details, alias) {
    if (details.family == 'IPv4') {
      iptable[dev + (alias ? ':' + alias : '')] = details.address;
    }
  });
}
devMiddleware.waitUntilValid(() => {
  var localIp = '';
  for (var k in iptable) {
    if (iptable[k].indexOf('192.168') > -1) {
      localIp = iptable[k];
    }
  }
  localIp = 'http://' + localIp + ':' + port;

  console.log('> Listening at ' + localIp + '\n');
  // when env is testing, don't need open it

  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(localIp)
  }
  _resolve()
});

var server = app.listen(port);

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
};
