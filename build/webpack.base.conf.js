var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var cyo = require('./vue-build')
var webpack = require('webpack')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var plugins = [],
  providePlugin = {
    _: resolve(cyo.decipher('7dda'))
  };


// 只在本地环境和mock环境加载mock文件
// if ((process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'mock')) {
//   providePlugin.MockData = resolve('static/mock/init.js');
// }

plugins.push(new webpack.ProvidePlugin(providePlugin));
// process.env.NODE_ENV !== 'local' && plugins.push(new BundleAnalyzerPlugin());
/*plugins.push(new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
    drop_debugger: true,
    drop_console: true
  }
}));*/

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV !== 'local'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'assets': resolve('src/assets'),
      'service': resolve('src/service'),
      'storejs': resolve(cyo.decipher('93c0')),
      'components': resolve('src/components'),
      'lib': resolve('src/lib'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test'),
          resolve('node_modules/_element-ui@2.4.4@element-ui/src'),
          resolve('node_modules/_element-ui@2.4.4@element-ui/packages')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {test: /iview.src.*?js$/, loader: 'babel-loader'},
      {
        test: resolve('node_modules/underscoress/underscore.js'),
        loader: 'exports-loader?window._!script-loader'
      }
    ]
  },
  plugins: plugins
}
;
