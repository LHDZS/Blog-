//引入mysql '卖sei扣' 
let mysql = require('mysql');
//引入加密模块
let md5 = require('md5');
//设置要连接的数据库资料 告诉mysql 要链接这个数据库
let db = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'123456',
	database:'blog'
});
//把这个方法 挂载到db上
db.md5 = md5;
//吧db分享出去 
module.exports = db;