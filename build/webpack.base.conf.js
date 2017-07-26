var path = require('path')
var utils = require('./utils')
var config = require('../config')
var webpack = require('webpack')
var vueLoaderConfig = require('./vue-loader.conf')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var plugins = []
  , providePlugin = {
  $: resolve('src/assets/js/zepto.js'),
  Zepto: resolve('src/assets/js/zepto.js'),
  'window.Zepto': resolve('src/assets/js/zepto.js')
};

// 只在本地环境和mock环境加载mock文件
if ((process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'mock')) {
  providePlugin.MockData = resolve('static/mock/init.js');
}

// 打包后资源监听
plugins.push(new webpack.ProvidePlugin(providePlugin));
process.env.NODE_ENV !== 'local' && plugins.push(new BundleAnalyzerPlugin());

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
      'router': resolve('src/router'),
      'components': resolve('src/components'),
      'zepto': resolve('src/assets/js/zepto.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
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
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      {
        test: resolve('src/assets/js/zepto.js'),
        loader: 'exports-loader?window.$!script-loader'
      },
    ]
  },
  plugins: plugins
};
