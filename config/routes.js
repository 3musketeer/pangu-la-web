
var auth = require('../app/controllers/auth')
  , main = require('../app/controllers/main')
  , laTop = require('../app/controllers/top')
  , laSum = require('../app/controllers/sum');

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


}
