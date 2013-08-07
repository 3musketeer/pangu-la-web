
var auth = require('../app/controllers/auth')
  , main = require('../app/controllers/main');

module.exports = function (app) {

	//显示登录页面
	app.get('/login', auth.login)

	//对用户名密码进行鉴权
	app.post('/auth', auth.auth, auth.session);

	//首页
	app.get('/', auth.requiresLogin, main.index); 
	app.get('index', auth.requiresLogin, main.index); 
}
