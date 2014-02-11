exports.index = function(req, res) {
    
	res.renderPjax('includes/index',{
		errors: req.flash('error')
	})
}