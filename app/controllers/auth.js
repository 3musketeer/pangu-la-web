
exports.requiresLogin = function (req, res, next) {
    if (!req.session || req.session.hasAuth !== true) {
      req.session.returnTo = req.originalUrl
      return res.redirect('/login')
    }
    next()
}

exports.login = function(req, res) {
	res.render('auth/login',{
		errors: req.flash('error') 
	})
}

exports.auth = function(req, res, next) {
	if ("tangzhi" == req.body.regular) {
		req.session.userId = req.body.regular;
		req.session.hasAuth = true;
		next()
	}else{
		req.flash('error', '用户不存在！')
		res.redirect('/login');	
	}
}

exports.session = function(req, res) {
	if (req.session.returnTo) {
		res.redirect(req.session.returnTo)
		delete req.session.returnTo
		return
	}
	res.redirect('/')
}
