const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'nuxt-scope-market',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['element-ui/lib/theme-chalk/index.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/plugins/element-ui'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  serverMiddleware: [],
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: ['@nuxtjs/axios'],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // analyze: {
    //   analyzerMode: 'static',
    // },
    transpile: [/^element-ui/],
    filenames: {
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[name].[contenthash].js'),
    },
    extractCSS: true,
    optimization: {
      // minimize: true,
      // minimizer: [
      //   // terser-webpack-plugin
      //   // optimize-css-assets-webpack-plugin
      // ],
      splitChunks: {
        chunks: 'all',
        // automaticNameDelimiter: '.',
        // name: undefined,
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial', // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('components'), // can customize your rules
            minChunks: 2, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      },
    },
  },
  axios: {
    proxy: true, // Can be also an object with default options
  },

  proxy: {
    '/api/': 'http://192.168.2.38:3721/',
  },
  // vue: {
  //   chainWebpack(config) {
  //     // it can improve the speed of the first screen, it is recommended to turn on preload
  //     // it can improve the speed of the first screen, it is recommended to turn on preload
  //     config.plugin('preload').tap(() => [
  //       {
  //         rel: 'preload',
  //         // to ignore runtime.js
  //         // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
  //         fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
  //         include: 'initial',
  //       },
  //     ])

  //     // when there are many pages, it will cause too many meaningless requests
  //     config.plugins.delete('prefetch')

  //     // set preserveWhitespace
  //     config.module
  //       .rule('vue')
  //       .use('vue-loader')
  //       .loader('vue-loader')
  //       .tap((options) => {
  //         options.compilerOptions.preserveWhitespace = true
  //         return options
  //       })
  //       .end()

  //     config.when(process.env.NODE_ENV !== 'development', (config) => {
  //       config
  //         .plugin('ScriptExtHtmlWebpackPlugin')
  //         .after('html')
  //         .use('script-ext-html-webpack-plugin', [
  //           {
  //             // `runtime` must same as runtimeChunk name. default is `runtime`
  //             inline: /runtime\..*\.js$/,
  //           },
  //         ])
  //         .end()

  //       // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
  //       config.optimization.runtimeChunk('single')
  //     })
  //   },
  // },
}
