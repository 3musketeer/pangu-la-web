exports.plugin = function(server) {

    server.get('/lcuTimeoutAnalysis.html', function(req, res) {

       res.renderPjax('plugin/lcuTimeoutAnalysis',{
		    errors: req.flash('error')
	   })
    });
}