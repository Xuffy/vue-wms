# UCN 采购商系统

> 一套基于`vue.js` `element ui`的网站管理系统1

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
```
#### 技术栈

> [vue](https://github.com/vuejs/vue)

> [vue-router](https://github.com/vuejs/vue-router)

> [axios](https://github.com/axios/axios)

> [webpack](http://webpack.github.io/docs/)

> [element-ui](http://element.eleme.io/#/zh-CN)

> [store.js](https://github.com/marcuswestin/store.js)

> [underscore.js](http://www.css88.com/doc/underscore/)

### 目录结构
<pre>
.
├── README.md                // 说明文件
├── dist                     // 项目发布输出目录
├── config                   // 项目环境配置目录
├── static                   // 静态资源目录
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
