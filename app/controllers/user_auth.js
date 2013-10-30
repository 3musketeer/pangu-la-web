var models = require('../models/user');
var User = models.User;
var crypto = require('crypto');
var check = require('validator').check,sanitize = require('validator').sanitize;
var env = process.env.NODE_ENV || 'development'
var config = require('../../config/config')[env];
var debug = require('debug')('pangu:query');
    

exports.registeUser = function(req, res, next){
    var user_name = sanitize(req.body.user_name).trim();
    user_name = sanitize(user_name).xss();
    var password = sanitize(req.body.password).trim();
    password = sanitize(password).xss();
    var email = sanitize(req.body.email).trim();
    email = sanitize(email).xss();
    var phone = sanitize(req.body.phone).trim();
    phone = sanitize(phone).xss();
    
    //验证用户名
    try{
    	check(user_name, '用户名只能使用字母和数字').isAlphanumeric();
    }catch(e){			
			req.flash('error', '用户名只能使用字母和数字！')
			res.redirect('/register');
			return;	
    }
    
    //验证电子邮箱
    try{
    	check(email, '不正确的电子邮箱').isEmail();
    }catch(e){			
			req.flash('error', '不正确的电子邮箱！')
			res.redirect('/register');
			return;	
    }

    User.findOne({'user_name': user_name}, function(err, userRow){
				if(err) return next(err);		
				if(userRow){					
					req.flash('error', '用户名已被使用,请重新输入！')
					res.redirect('/register');
					return;
				}
				
				password = md5(password);
				user = new User();
				user.user_name = user_name;
				user.password = password;
				user.phone = phone;
				user.email = email;
				user.create_time = Date.now();
				user.update_time = Date.now();		
				
				user.save(function(err){
					if(err) return next(err);	
						gen_session(user, res, req);
						return res.redirect('/index.html');
				});
		});
}


function md5(str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  str = md5sum.digest('hex');
  return str;
}

//设置缓存函数
function gen_session(user, res, req){
    var auth_token = encrypt(user.user_name + '\t' + user.password + '\t' + user.email+ '\t' +user.phone, config.session_secret);
    res.cookie(config.auth_cookie_name, auth_token, {path: '/',maxAge: 1000 * 60 * 60}); //cookie 有效期１个小时
    req.session.user = user;
    req.session.hasAuth = true;
    req.session.cookie.maxAge = 1000 * 60 * 60;
}


function encrypt(str, secret){
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
}

exports.authUser = function(req, res, next){
	 var userName = req.body.regular;
	 var pass =  md5(req.body.pass);
	 
	 User.findOne({'user_name': userName}, function(err, userRow){
			if(err) return next(err);		
			if(userRow){
				if(userRow.password != pass){
						req.flash('error', '用户密码不正确！')
						res.redirect('/login.html');
						return;
				}
				gen_session(userRow, res, req);					
				next();
			}else{
					req.flash('error', '用户不存在！')
					res.redirect('/login.html');	
			}
		});	
}