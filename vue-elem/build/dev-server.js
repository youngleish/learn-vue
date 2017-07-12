require('./check-versions')()
var config = require('../config')  // 配置文件
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)

var path = require('path')  // nodejs的path模块，提供了操纵路径的方法
var express = require('express') // nodejs框架，启动webserver
var webpack = require('webpack')  // 核心编译工具，webpackt提供nodejs的api，在nodejs中引用webpack进行编译
var opn = require('opn') // opn - Opens stuff like websites, files, executables.
var proxyMiddleware = require('http-proxy-middleware') // http协议代理的中间件,代理转发api
var webpackConfig = require('./webpack.dev.conf')  // webpack配置

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port // 定义端口号可以从环境变量中获取，也可以从config中获取
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable   // 配置需要代理的接口

var app = express()
// -TODO 学习mock数据
// 定义数据
let appData = require('../data.json')
let seller = appData.seller
let goods = appData.goods
let ratings = appData.ratings
// 定义api路由
let apiRouts = express.Router()
apiRouts.get('/seller', function (req, res) {
    res.json({
        errno: 0,
        data: seller
    })
})
apiRouts.get('/goods', function (req, res) {
    res.json({
        errno: 0,
        data: goods
    })
})
apiRouts.get('/ratings', function (req, res) {
    res.json({
        errno: 0,
        data: ratings
    })
})
app.use('/api', apiRouts);


var compiler = webpack(webpackConfig)  // webpack编译

// webpack-dev-middleware 处理静态资源的中间件，是express专门为webpack开发的插件，可以编译好的当文件直接放在内存中,所以我们在项目的目录中看不到任何编译好的文件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,  // webpackConfig.output.publicPat 输出根目录 /
    quiet: true
})

// express和hot-reload 的中间件
var hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {
    }
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function(data, cb) {
        hotMiddleware.publish({action: 'reload'})
        cb()
    })
})

// proxy api requests  代理转发操作
Object.keys(proxyTable).forEach(function(context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
        options = {target: options}
    }
    app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
// 匹配资源，如果不匹配就可以重定向到指定地址
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output  使用中间件输出编译文件
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
// 配置静态资源访问路径，当检测到/static的时候 从当前./static取资源
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function() {
    console.log('> Listening at ' + uri + '\n')
})

// 通过express启动的server监听 8080端口
module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }

    // when env is testing, don't need open it
    if (process.env.NODE_ENV !== 'testing') {
        opn(uri)
    }
})
