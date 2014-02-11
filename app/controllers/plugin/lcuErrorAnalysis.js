var mongoose = require('mongoose')
  , debug = require('debug')('pangu:top')
  , util = require("util")
  , EventProxy = require('eventproxy').EventProxy;

exports.plugin = function(server) {

   server.get('/lcuErrorAnalysis.html', function(req, res) {
        
	       
	       var render = function(flowInfo){
            res.renderPjax('plugin/lcuErrorAnalysis',{
                  flowInfo:flowInfo, 
                  errors: req.flash('error')
            });
	       }	    
	        
	       var proxy = new EventProxy();
	       proxy.assign('flowInfo', render);  
	       
         var table = mongoose.model('FlowInfo','flow');        
         table.findOne({'flowId': '/lcuErrorAnalysis.html'}, function(err, resultRow){
            if(err) return next(err);		
            if(resultRow){
                 proxy.trigger('flowInfo', JSON.stringify(resultRow.flowInfo));
            }
		     });
                
   });
}