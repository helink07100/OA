/* eslint-disable nuxt/no-cjs-in-config */
const path = require('path')
const { exec } = require('child_process')

const MomentLocalesPlugin = require('moment-locales-webpack-plugin')
const pkg = require('./package')

// 如果本地存在local.config.js的话，会与当前文件合并
let localConfig = {}

// 测试环境用到的plugin
if (process.env.NODE_ENV === 'development') {
  localConfig = require('./local.config.js')
}

/**
 * spa模式下的导出目录
 */
const output = path.resolve(__dirname, 'dist', 'webfe_admin')

module.exports = {
  mode: 'spa', // spa or universal, 前后端同构localStorage要注意放在mounted生命周期
  router: {
    mode: 'history' // hash or history, 路由模式，设置history需要运维支持配置nginx
  },
  server: {
    host: '0.0.0.0' // default: localhost
  },
  env: {
    env: process.env.env
  },
  /*
   ** Headers of the page
   */
  head: {
    title: 'OA系统',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: pkg.description
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: '/iconfont/iconfont.css?v=' + pkg.version
        // process.env.NODE_ENV === 'development'
        //   ? '//at.alicdn.com/t/font_1469014_g94czta9hch.css'
        //   : '/iconfont/iconfont.css?v=' + pkg.version
      }
    ],
    script: []
  },
  /**
   * 生成文件目录，仅spa模式有效
   */
  generate: {
    dir: output
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#F55555'
  },

  /*
   ** Global CSS
   */
  css: ['~/assets/less/common.less'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '@/plugins/ui',
    '@/plugins/i18n',
    '@/plugins/enum',
    '@/plugins/config',
    '@/plugins/axios',
    '@/plugins/api',
    '@/plugins/utils',
    '@/plugins/directive',
    '@/plugins/message',
    '@/plugins/moment',
    '@/plugins/globalComponents',
    '@/plugins/caches',
    '@/plugins/errorHandler',
    '@/plugins/log',
    '@/plugins/getCorsImage',
    '@/plugins/bus',
    '@/plugins/scroll'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/cors': {
      target: 'http://systemstatic1.awesomeglobal.com',
      pathRewrite: {
        '^/cors': '/'
      }
    }
  },
  styleResources: {
    less: ['~/assets/less/var.less']
  },
  /*
   ** Build configuration
   */
  build: {
    analyze: true,
    vendor: ['element-ui'],
    plugins: [
      new MomentLocalesPlugin({
        localesToKeep: ['zh-cn']
      })
    ],
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          }
        ]
      ]
    },
    /*
     ** You can extend webpack config here
     * loaders 是支持template 里面直接 :src="<文件路径>"
     * extend 是打包时候文件模块的命名处理
     */
    loaders: {
      vue: {
        transformAssetUrls: {
          audio: 'src'
        }
      }
    },
    extend(config, ctx) {
      // if (process.env.NODE_ENV === 'development') {
      //   exec('node node/index.js', (error, stdout, stderr) => {
      //     if (error) {
      //       console.error(`exec error: ${error}`)
      //       return
      //     }
      //     console.log(`stdout: ${stdout}`)
      //     console.error(`stderr: ${stderr}`)
      //   })
      // }
    },
    publicPath: '/static/'
  }
}
