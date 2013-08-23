
var auth = require('../app/controllers/auth')
  , main = require('../app/controllers/main')
  , latop = require('../app/controllers/top');

module.exports = function (app) {

	//显示登录页面
	app.get('/login.html', auth.login)

	//对用户名密码进行鉴权
	app.post('/auth.html', auth.auth, auth.session);

	//首页
	app.get('/', auth.requiresLogin, main.index); 
	app.get('/index.html', auth.requiresLogin, main.index); 

	//排名清单
	app.get('/top/list.html', auth.requiresLogin, latop.list); 

	//排名明细
	app.get('/top/detail.html', auth.requiresLogin, latop.detail); 
}
