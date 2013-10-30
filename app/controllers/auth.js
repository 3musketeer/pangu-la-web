var userAuth = require('./user_auth');


exports.requiresLogin = function (req, res, next) {
    if (!req.session || req.session.hasAuth !== true) {
      req.session.returnTo = req.originalUrl
      return res.redirect('/login.html')
    }
    next()
}

exports.login = function(req, res) {
	res.render('auth/login',{
		errors: req.flash('error') 
	})
}

exports.auth = function(req, res, next) {
	userAuth.authUser(req, res, next);
}

exports.session = function(req, res) {
	if (req.session.returnTo) {
		res.redirect(req.session.returnTo)
		delete req.session.returnTo
		return
	}
	res.redirect('/')
}

exports.registerUser = function (req, res) {
     res.render('user/register',{
				errors: req.flash('error') 
			})
}


exports.logout = function(req, res) {
	delete req.session.user;
	req.session.hasAuth = false;
	res.redirect('/login.html');
}