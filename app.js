let express = require('express');
		 //伊克斯普瑞斯
let app = express();
//引入主路由 
let admin = require('./routes/admin');
let home = require('./routes/home');
//cookie'库ki' session‘赛神’
let session = require('express-session');
//这个插件用来解析Post参数 当发送一个post请求时 req上回生成一个body的属性
let bodyParser = require('body-parser');


// let locals = require('strftime');
//当使用了session中间件后 就在req上添加一个session属性
//通过这个属性可以实现设置和读取session{赛神}的目的 
//有点类似于php中的 $_SESSION
app.use(session({
	secret: 'fad',
	resave: false,
	saveUninitialized: false
}));
//设置一个中间件 处理时间 判断session有没有值 如果没有并且地址不为
//login的情况下 必须登录 否则不能打开其他页面
// app.use('/admin',(req,res,next) => {
// 	if(!req.session.loginfo && req.url != '/login') {
// 		return res.redirect('/login');
// 	}
// 	//处理完 传递给下一层
// 	next();
// })

// app.locals.title = 'My App';
// app.locals.strftime = require('strftime');
//解析Post数据的中间件
app.use(bodyParser.urlencoded({extended:false}));
//服务器端口
app.listen(2520);
//xtpl从这个目录下 查找文件
app.set('views','./views');
//引入xtpl 顺便指定查找的文件后缀为xtpl
app.set('view engine','xtpl');
//中间件 处理静态数据
app.use(express.static('./public'));
//中间件 引入主路由
app.use('/admin', admin);
app.use('/', home);


