let express = require('express');
//处理用户数据
let user = require('../models/user');

let post = require('../models/post');


let home = express.Router();

home.get('/',(req,res) => {
	
	let pageSize = 2;

	let page = req.query.page || 1;

	post.count((err, row) => {
		if (err) return;

		let total = row.total;

		let pages = Math.ceil(total / pageSize);

		post.findAll(pageSize, page, (err, rows) => {
			if(!err) {
				res.render('home/index',{
					posts:rows,
					pages:pages,
					page:page
				});
			}
		})
	})

	
});

home.get('/join',(req,res) => {

	post.findAll((err, rows) => {
		if(!err){
			res.render('home/join',{posts:rows});
		}
	})
	
	
});

home.get('/center',(req,res) => {
	
	res.render('home/center',{});
});

home.get('/article',(req,res) => {

	// console.log(req.query.id);

	post.find(req.query.id, (err,rows) => {
		if(!err) {
			res.render('home/article',{post:rows[0]});
		}
	})
	
	// post.findAll((err, rows) => {
	// 	if(!err){
	// 		res.render('home/article',{post:rows[0],posts:rows});
	// 	}
	// })
	
});

home.get('/about',(req,res) => {
	
	res.render('home/about',{});
});

home.get('/login',(req,res) => {
	
	res.render('home/login',{});
});

home.get('/register',(req,res) => {
	
	res.render('home/register',{});
});

//注册用户
home.post('/register',(req,res)=>{
	
	user.insert(req.body,(err) => {
		if(!err) {
			res.json({
				code:10000,
				msg:'添加成功!'
			});
		}
	});

});

//登录
home.post('/login',(req,res) => {

	// console.log(req.body);

	user.auth(req.body.email,req.body.pass, (err,row)=>{
		if(!err) {
			console.log(err);
			req.session.loginfo = row;

			res.json({
				code:10000,
				msg:'登陆成功'
			});
		}
	});
});


module.exports = home;