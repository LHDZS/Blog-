
let db = require('./db');

exports.insert = function(data,cb) {
	let query = 'insert into users set ?';

	data.pass = db.md5(data.pass);

	db.query(query,data,(err) => {
		if(err) {
			return cb(err);
		}

		cb(null);
	});
}

exports.auth = function (email,passwrod,cb) {

	let query = 'select * from users where email = ? ';

	db.query(query,email, (err,rows) => {
		if(err) {
			return cb(err);
		}

		if(rows[0].pass == db.md5(passwrod)) {
			return cb(null,rows[0]);
		}

		cb({msg:'用户名或密码错误'});
	})
}
//查询数据库
exports.find = (id,cb) => {
    // sql 语句 根据id查询
    let query = 'select * from users where id = ?';
 
    // 执行 sql 语句 这里的id会替换上面的？ 
    db.query(query,id, (err, rows) => {
    	
        if(err) {
            // 失败回调
            return cb(err);
        }

        // 成功回调
        cb(null, rows);
    })
}

exports.update = function (id,data,cb) {
	let query = 'update users set ? where id = ?';

	db.query(query,[data,id],(err)=> {
		if(err) {
			return cb(err);
		}
		cb(null);
	})
}


// exports.ajsjs = function(title,brief,content) {
// 	let query = 'select * from posts where email = ? ';

// 	db.query(query,[])
// }