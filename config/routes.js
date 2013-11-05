
var auth = require('../app/controllers/auth')
  , main = require('../app/controllers/main')
  , laTop = require('../app/controllers/top')
  , laSum = require('../app/controllers/sum')
  , user_auth = require('../app/controllers/user_auth');

module.exports = function (app) {

	//显示登录页面
	app.get('/login.html', auth.login)

	//对用户名密码进行鉴权
	app.post('/auth.html', auth.auth, auth.session);

	//首页
	app.get('/', auth.requiresLogin, main.index); 
	app.get('/index.html', auth.requiresLogin, main.index); 

	//排名清单
	app.get('/top/list.html', auth.requiresLogin, laTop.list); 

	//排名明细
	app.get('/top/detail.html', auth.requiresLogin, laTop.detail); 

	//总数统计列表
	app.get('/sum/list.html', auth.requiresLogin, laSum.list); 
	
	//注册用户
	app.get('/register',auth.registerUser); 
	app.post('/registerAction',user_auth.registeUser); 
	
	
	//注册用户审核
	app.get('/auditUser',auth.auditUser);
	app.post('/auditAction/:checkValue',auth.audit);
	
	 //用户资料修改
	app.get('/editUser',user_auth.editUser);
	app.post('/editUserAction',user_auth.editUser);
	
	//退出
	app.get('/logout',auth.logout); 

}
