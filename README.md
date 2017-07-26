# 网站管理系统框架

> 一套基于`vue.js` `element-ui`的网站管理系统框架 

[源码地址](https://github.com/Xuffy/vue-wms)
[问题反馈](https://github.com/Xuffy/vue-wms/issues)

### 启动说明

``` bash
# 进入项目根目录
cd **

# 安装依赖文件
npm install

# 启动本地开发环境
npm run start

# 发布开发环境
npm run dev

# 发布测试环境
npm run test

# 发布生产环境
npm run pro

# 使用mock数据发布
npm run mock
```
#### 技术栈

> [vue](https://github.com/vuejs/vue)

> [vue-router](https://github.com/vuejs/vue-router)

> [vue-resource](https://github.com/vuejs/vue-resource)

> [webpack](http://webpack.github.io/docs/)

> [element-ui](http://element.eleme.io)

> [store.js](https://github.com/marcuswestin/store.js)

> [underscore.js](http://www.css88.com/doc/underscore/)

> [mock.js](http://mockjs.com/)

### 目录结构
<pre>
.
├── README.md                // 说明文件
├── dist                     // 项目发布输出目录
├── config                   // 项目环境配置目录
├── static                   // 静态资源目录
│   └── mock                 // mock文件目录
│       ├── config.js        // mock配置文件
│       └── init.js          // mock入口文件
├── build                    // 发布构建配置
│   ├── build.js             // 构建发布项目入口文件
│   ├── dev-server.js        // 开发的服务配置
│   ├── webpack-dev-conf.js  // 开发的Webpack 配置文件
│   ├── webpack-prod-conf.js // 生产的Webpack 配置文件
│   ├── webpack-base-conf.js // 基本的Webpack 配置文件
├── package.json             // 项目依赖配置文件
├── src                      // 项目源码目录
│   ├── assets               // css js 和图片资源
│   ├── components           // 各种组件
│   ├── views                // 各种页面
│   ├── service              // 各种服务
│   │   ├── ajax.js          // ajax请求封装
│   │   ├── config.js        // 项目配置
│   │   ├── filters.js       // 过滤器
│   │   ├── interceptor.js   // 拦截器
│   │   ├── router.js        // 路由配置
│   │   └── util.js          // 基础工具
│   ├── App.vue              // 根组件
│   └── main.js              // Webpack 预编译入口         
├── index.html               // 项目入口文件
.
</pre>


### TODO

-------
// ...
 

### 更新日志

-------

#### v0.1.0 ( 2017-07-26 )
 - 对Vue.http封装，实现数据过滤
 - 引入mock，在本地环境和mock环境时使用，在`main.js`中设置`mock: true`开启。

#### v0.0.7 ( 2017-07-20 )
 - 配置化`Menu`组件
 - 优化webpack配置，支持`local` `develop` `test` `production`环境打包
 
#### v0.0.6 ( 2017-07-14 )
 - 解决单页刷新问题，地址使用#访问。注：在某些授权路径中部能使用#（如：微信支付）

#### v0.0.5 ( 2017-07-14 )
 - 优化环境配置文件，添加环境变量`test`
 - 支持`npm run dev`本地开发环境，`npm run test`发布测试环境，`npm run pro`发布生产环境
 
#### v0.0.4 ( 2017-07-13 )
 - 实现面包屑导航功能
 - 实现基础请求拦截器
 
#### v0.0.3 ( 2017-07-12 )
 - 使用`element-ui`的`element-variables.css`文件构建主题样式
 - 构建管理系统基础页面框架
 
#### v0.0.2 ( 2017-07-11 )
 - 优化路由，配合webpack实现路由懒加载
 - 引入`element-ui`，并实现懒加载
 
#### v0.0.1 ( 2017-07-10 )
 - 框架搭建
