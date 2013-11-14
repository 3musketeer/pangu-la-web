var userAuth = require('./user_auth');
var gridfs = require('./gridfs');

exports.requiresLogin = function (req, res, next) {
    if (!req.session || req.session.hasAuth !== true) {
      //req.session.returnTo = req.originalUrl
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
	//if (req.session.returnTo) {
		//res.redirect(req.session.returnTo)
		//delete req.session.returnTo
		//return
     // }
	
	res.redirect('/')
}

exports.registerUser = function (req, res) {
     res.render('user/register',{
				errors: req.flash('error') 
			})
}


exports.auditUser = function (req, res) {
	userAuth.auditUser(req, res);
}

exports.audit = function (req, res) {
	userAuth.audit(req, res);
}


exports.getHeadPicture = function(req, res) {
    if (req.session){
        gridfs.getFile(req.session.user.user_name,function(data){
            res.send(data);
        });
    }
}


exports.logout = function(req, res) {
	delete req.session.user;
	req.session.hasAuth = false;
	res.redirect('/login.html');
}
