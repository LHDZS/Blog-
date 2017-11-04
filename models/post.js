
let db = require('./db');
//保存
exports.insert = (data,cb) => {

	let query = 'insert into posts set ?';

	db.query(query,data,(err) => {
		if(err) {
			return cb(err);
		}

		cb(null);
	});
}
//编辑 修改
exports.modify =  (data, id, cb) => {

	let query1 = 'update posts set ? where id = ?';


	db.query(query1, [data, id], cb);
	
}

//查询数据 连表查询 和分页
				//多个参数 不确定参数
exports.findAll = (...args) => {
	//声明变量
	let query, offset, pageSize, cb;
	//判断如果形参只有一个 且这个参数是个对象的话
	if(args.length == 1 && typeof args[0] == 'function') {
		//执行sql语句
		query = 'select posts.id, uid, title, brief, content, time, name, pass, email, avatar, gender, phone, company, homepage, alt from posts left join users on posts.uid=users.id';
		//把参数作为内容返回
		cb = args[0];
	} else {
		//如果 参数不等于1 进入下面逻辑
		//第一形参 每页条数
		pageSize = args[0];	
		//当前第几页
		page = args[1];	
		//回调函数
		cb = args[2];
		//计算每页 第一个条的id -1是为了转换成数字
		offset = (page - 1) * pageSize;
		//sql语句
		query = 'select posts.id, uid, title, brief, content, time, name, pass, email, avatar, gender, phone, company, homepage, alt from posts left join users on posts.`uid`=users.`id` limit ?, ?';
	}

	//执行sql语句
	db.query(query,[offset, pageSize], (err,rows) => {

		if(err) {
			return cb(err);
		}
		cb(null,rows);
	});
}
//删除博客
exports.delete = (id,cb) => {
	let query = 'delete from posts where id = ?';

	db.query(query,id,(err) => {
		if(err) {
			return cb(err);
		}

		cb(null);
	})
}
//添加博客
exports.find = (id,cb) => {
	let query = 'select posts.id, uid, title, brief, content, time, name, pass, email, avatar, gender, phone, company, homepage, alt from posts left join users on posts.uid=users.id where posts.id = ?';
	db.query(query,id,(err,rows) => {
		if(err) {
			return cb(err);
		}

		cb(null,rows);
	})
}

//博客总条数
exports.count = function (cb) {
	let query = 'select count(*) as total from posts';

	db.query(query, (err, rows) => {
		if(err) {
			return cb(err);
		}

		cb(null, rows[0]);
	})
}