let express = require('express');

let post = require('../models/post');

let user = require('../models/user');
//图片地址解析模块
let multer = require('multer');

let admin = express.Router();

var storage = multer.diskStorage({
	//定义图片上传目录
	destination: function (req, file, cb) {
		cb(null, 'public/admin/uploads/avatar');
	},
	filename: function (req, file, cb) {
		//拼凑文件路径和名称
		let extname = file.originalname.slice(file.originalname.lastIndexOf('.'));
        cb(null, file.fieldname + '-' + Date.now() + extname);

        console.log(extname);
	}

})

var upload = multer({storage: storage});

admin.get('/',(req,res) => {
	
	res.render('admin/index',{});
});

admin.get('/add',(req,res) => {
	
	res.render('admin/blog_add',{action: '/admin/add'});
});

//编辑博客 
admin.get('/edit',(req,res) => {

	post.find(req.query.id,(err,rows) => {
		console.log(req.query.id);

		if(!err) {
			res.render('admin/blog_add',{
				post:rows[0],
				action:'/admin/modify'
			});
		}
	});
})

admin.get('/list',(req,res) => {

	post.findAll((err,rows) => {
		if(err) {
			return res.send('数据库错误');
		}
		res.render('admin/blog_list',{posts:rows});
	});
});

admin.get('/repass',(req,res) => {
	
	res.render('admin/repass',{});
});
//添加个人信息
admin.get('/settings',(req,res) => {
	//获取session'赛神'内的id
	let uid = req.session.loginfo.id;
	//调用封装好的 sql查询方法 根据id查询数据
 	user.find(uid,(err,rows) => {
		
		if(!err) {
			//不报错的话 跳转到一个页面  并添加内容 内容为一个二维数组查询里面的第一条
			res.render('admin/settings',{user:rows[0]});
		}
	})
	
});

admin.get('/logout',(req,res) => {
	req.session.loginfo = null;

	res.redirect('/login');
})
//添加
admin.post('/add',(req,res) => {
	//当前登陆用户即为作者
	req.body.uid = req.session.loginfo.id;

	post.insert(req.body,(err) => {
		if(!err) {
			res.json({
				code:10000,
				msg:'添加成功'
			});
		}
	})

});

admin.post('/modify',(req,res) => {
	
	let id = req.body.id;

	delete req.body.id;

	post.modify(req.body, id, (err) => {
		//获取的ID有问题 可能是数据库有问题 也有可能是获取方式不对
		// console.log(id);
		// console.log(req.body);
		if(!err) {
			res.json({
				code:10000,
				msg:'修改成功'
			});
		}
	})
});
//删除
admin.get('/delete',(req,res)=>{

	
	post.delete(req.query.id,(err) => {
		if(!err) {
			res.json({
				code:10000,
				msg:'删除成功!'
			});
		}
	});
});

admin.post('/settings',(req,res) => {

	let uid = req.session.loginfo.id;

	user.update(uid,req.body,(err) => {
		if(!err){
			res.json({
				code:10000,
				msg:'更新成功!'
			});
		}
	});
})

admin.post('/upfile',upload.single('avatar'),(req,res) => {

	
	res.json({
		code:10000,
		msg:'上传成功',
		//
		path:req.file.path.substring(7)
	});


})


module.exports = admin;