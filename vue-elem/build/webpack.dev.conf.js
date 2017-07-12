var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')  // 合并webpack配置文件
var utils = require('./utils') // 工具方法
var baseWebpackConfig = require('./webpack.base.conf')  // webpack配置文件，这个配置文件是在开发和生产配置公用的文件
var HtmlWebpackPlugin = require('html-webpack-plugin') // 操作html文件的插件
var FriendlyErrors = require('friendly-errors-webpack-plugin') // 错误提示的插件

// add hot-reload related code to entry chunks   启动hot-reload（热更新）
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

// 把baseconfig和当前的config合并
module.exports = merge(baseWebpackConfig, {
  module: {
    // 对.vue以外的css文件进行编译
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map', // 方便代码调试 ？？？？
  plugins: [
    new webpack.DefinePlugin({ // 替换字符串 把webopakc中process.env替换成config.dev.env
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurrenceOrderPlugin(),  // 根据打包后模块使用频率给经常使用的模块分配最小的id
    new webpack.HotModuleReplacementPlugin(), // 热更新的插件
    new webpack.NoErrorsPlugin(),  // 编译代码的过程中如果遇到报错的代码会跳过报错的地方继续编译
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({ // 打包过程中输出的css，js的路径会自动添加到html中
      filename: 'index.html',  // 指定编译后html的文件名
      template: 'index.html', // 指定处理的模板
      inject: true
    }),
    new FriendlyErrors()
  ]
})
