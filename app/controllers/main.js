exports.index = function(req, res) {
	res.render('main/index',{
		errors: req.flash('error'), 
		current_user:req.session.user
	})
}


