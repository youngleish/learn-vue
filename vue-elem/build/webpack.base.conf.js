var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../') // 定义了项目的根目录

var env = process.env.NODE_ENV
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = {
  entry: {
    app: './src/main.js' // js入口文件
  },
  output: {
    path: config.build.assetsRoot,  // 输出文件路径到 ../dist
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath, // 静态资源绝对路径：/根目录
    filename: '[name].js' // 输出的文件名, name对应的是entry中的key值 「app」, 所以输出的文件是app.js
  },
  resolve: { // 跟模块相关的配置
    extensions: ['', '.js', '.vue', '.json'], //自动补全文件路径
    fallback: [path.join(__dirname, '../node_modules')], // 如果模块找不到的话，会到node_modules中找
    alias: { // 模块的别名，缩短路径长度
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'common': path.resolve(__dirname, '../src/common'),
      'views': path.resolve(__dirname, '../src/views')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: { // loaders 对某种loaders对某个文件编译，preloader在loader之前处理
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: [
          path.join(projectRoot, 'src')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: [
          path.join(projectRoot, 'src')
        ],
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(projectRoot, 'src')  //只检查这个目录下的文件
        ],
        exclude: /node_modules/  // 排除这些文件
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,  // 当文件大小小于10kb
          name: utils.assetsPath('img/[name].[hash:7].[ext]') // 生成的路径 static/img/...
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')  // eslint发现错误的时候会提供一个友好的提示
  },
  vue: { // 只对.vue里面的css进行编译
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }), // css-loader
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  },
  postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
  ]
}
