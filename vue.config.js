module.exports = {
  /** 区分打包环境与开发环境
   * process.env.NODE_ENV==='production'  (打包环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
   */

  // 项目部署的基础路径

  // 我们默认假设你的应用将会部署在域名的根部,

  // 例如 https://www.my-app.com/

  // 如果你的应用部署在一个子路径下，那么你需要在这里

  // 指定子路径。比如将你的应用部署在

  // https://www.foobar.com/my-app/

  // 那么将这个值改为 '/my-app/'

  // 构建好的文件输出到哪里
  publicPath: './',

  assetsDir: 'assets',

  // 使用带有浏览器内编译器的完整构建版本 // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  lintOnSave: true,

  // babel-loader默认会跳过`node_modules`依赖. // 通过这个选项可以显示转译一个依赖
  runtimeCompiler: true,

  // 是否为生产环境构建生成sourceMap?
  transpileDependencies: [
    /* string or regex */
  ],

  chainWebpack: () => {},

  // CSS 相关选项
  configureWebpack: () => {},

  // use thread-loader for babel & TS in production build // enabled by default if the machine has more than 1 cores
  css: {
    loaderOptions: {}
  },

  // configure webpack-dev-server behavior
  pwa: {},

  // 第三方插件配置
  devServer: {
    open: process.platform === "darwin",

    disableHostCheck: false,

    host: "0.0.0.0",

    port: 8088,

    https: false,

    hotOnly: false, // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy

    proxy: '',
    hot:true
    // string | Object

    // before: app => {}
  },

  pluginOptions: {
    // ...
  }
};
  