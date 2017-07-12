var express = require('express');
var config = require('./config');

var port = process.env.port || config.build.port || '9000';
// 启动express
var app = express();
// 定义router
var router = express.Router();
// 定义路由
router.get('/',function(req,res,next){
    req.url = '/index.html';
    next();
});

app.use(router);
// 定义接口router
// 定义数据
let appData = require('./data.json');
let seller = appData.seller;
let goods = appData.goods;
let rating = appData.ratings;
let apiRouts = express.Router();

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
apiRouts.get('/rating', function (req, res) {
    res.json({
        errno: 0,
        data: rating
    })
})
app.use('/api', apiRouts);

// 定义static目录
app.use(express.static('./dist'));

// 通过express启动的server监听 9000端口
module.exports = app.listen(port, function(err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('success')
});


