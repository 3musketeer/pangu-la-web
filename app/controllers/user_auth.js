var models = require('../models/user');
var User = models.User;
var crypto = require('crypto');
var check = require('validator').check,sanitize = require('validator').sanitize;
var env = process.env.NODE_ENV || 'development'
var config = require('../../config/config')[env];
var EventProxy = require('eventproxy').EventProxy;
var util = require('../libs/utils');
    

exports.registeUser = function(req, res, next){
    var user_name = sanitize(req.body.user_name).trim();
    user_name = sanitize(user_name).xss();
    var password = sanitize(req.body.password).trim();
    password = sanitize(password).xss();
    var email = sanitize(req.body.email).trim();
    email = sanitize(email).xss();
    var phone = sanitize(req.body.phone).trim();
    phone = sanitize(phone).xss();
    
    var nick_name = sanitize(req.body.nick_name).trim();
    nick_name = sanitize(nick_name).xss();
    
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
				user.nick_name = nick_name;
				user.password = password;
				user.phone = phone;
				user.email = email;
				user.create_time = Date.now();
				user.update_time = Date.now();	
				if(config.admins[user_name]){
				    user.audit_tag = 1;
				    user.is_admin = true;
			    }	
				
				user.save(function(err){
					if(err) return next(err);	
						gen_session(user, req, res);
						if(user.is_admin)
						    return res.redirect('/index.html');
						else{
						    req.flash('error', '注册用户管理员审核通过后可以登录！');
						    return res.redirect('/login.html');
						}
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
function gen_session(user, req, res){
    var auth_token = encrypt(user.user_name + '\t' + user.password + '\t' + user.email+ '\t' +user.phone, config.session_secret);
    res.cookie(config.auth_cookie_name, auth_token, {path: '/',maxAge: 1000 * 60 * 60}); //cookie 有效期１个小时
   
    if(config.admins[user.user_name]){
	  	user.is_admin = true;
	}else{
		user.is_admin = false;
	}
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
				else if(userRow.audit_tag == 0 && !config.admins[userRow.user_name]){
				    req.flash('error', '注册用户未经过管理员审核无法登录！');
					res.redirect('/login.html');
					return;
			    }	
			    
				gen_session(userRow, req, res);					
				next();
			}else{
					req.flash('error', '用户不存在！')
					res.redirect('/login.html');	
			}
		});	
}


exports.auditUser = function(req, res){
    
	if (!req.session || req.session.hasAuth != true) {
        req.flash('error', '管理员需先登录后才能审核！')
		return	res.redirect('/login.html');
    }else{
    	  if(!req.session.user.is_admin){
    	  	req.flash('error', '只有管理员有审核权限！')
			return res.redirect('/');
	    }
	}
	
	var render = function(users){	
    	 res.render('user/AuditUser',{
	        users: users, 
			errors: req.flash('error')
	     });
	}
	var proxy = new EventProxy();
	proxy.assign('users', render);
	
	
	User.find({'audit_tag':0}, {},function(err, userRow){
		if(err) return next(err);		
		if(userRow){
		    for(var i = 0; i<userRow.length; i++){
		        userRow[i].create_time = util.format_date(userRow[i].create_time);
		    }
			proxy.trigger('users', userRow);
		}
	});	
}




exports.audit = function(req, res){
    
    var checkValue = req.params.checkValue.split(",");     
    for (var i=0;i<checkValue.length ;i++ )    
    {
    	if('' != checkValue[i]) {
    		 User.update({user_name:checkValue[i]},{$set:{audit_tag:1}},function(err){
    		    if(err) return next(err);	
    		    res.redirect('/auditUser');
    		 });
    	}
    }    
}


exports.editUser = function(req, res, next){
    
    var method = req.method.toLowerCase();
    if(method == 'get'){
        res.render('user/edituser',{
            current_user:req.session.user,
		    errors: req.flash('error'),
		    Prompts: req.flash('Prompt')
	    })
       
    }
    else if(method == 'post'){
        
        var user_name = sanitize(req.body.user_name).trim();
        user_name = sanitize(user_name).xss();
        
        var email = sanitize(req.body.email).trim();
        email = sanitize(email).xss();
        
        var phone = sanitize(req.body.phone).trim();
        phone = sanitize(phone).xss();
        
        var nick_name = sanitize(req.body.nick_name).trim();
        nick_name = sanitize(nick_name).xss();


        var user = req.session.user;
        if(email==user.email && phone==user.phone && nick_name==user.nick_name){
            req.flash('error', '您没有修改任何资料！');
			return res.redirect('/editUser');
		}    
       
        User.update({user_name:user_name},{$set:{email:email,nick_name:nick_name,phone:phone}},function(err){
		    if(err) return next(err);	
		    User.findOne({'user_name': user_name}, function(err, userRow){
				if(err) return next(err);		
				if(userRow){					
					gen_session(userRow, req, res);
					req.flash('Prompt', '用户资料修改成功！');
					return res.redirect('/editUser');
				}
		    });	    
        });
    }
}