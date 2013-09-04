var mongoose = require('mongoose')
  , debug = require('debug')('pangu:top')
  , util = require("util")
  , config = require('./config_top').cfgDetail
  , cfgTop = require('./config_top').cfgTop
  , query = require('./query')


exports.list = function(req, res) {

	var list = [ {mode:'TuxState', type:'TimeOutTop'}, 
				 {mode:'TuxState', type:'CalledSum', subtype: 'ByLcu'},
   				 {mode:'TuxState', type:'FailedSum', subtype: 'ByLcu'},
				 {mode:'TuxState', type:'AllTime', subtype: 'ByLcu'},
				 {mode:'TuxState', type:'AllTime', subtype: 'BySvr'},
				 {mode:'TuxState', type:'CalledSum', subtype: 'BySvr'},
   				 {mode:'TuxState', type:'FailedSum', subtype: 'BySvr'}	]

	//仅查询top 10 
	query.multiQuery(list, cfgTop, 10, function(err, docs) {
		debug("doc:%s", util.inspect(docs))
		res.render('top/list', {all: docs})
	})
}

exports.detail = function(req, res, next) {
	var mode = req.query.mode
	  , type = req.query.type
	  , scope = req.query.scope
	  , value = req.query.value
	  , subtype = req.query.subtype || ''
	  //, filter = JSON.parse(req.query.filter || '{}')

	var table = query.getTable(mode, type, scope, value)

	type += subtype;

	if (!config[mode+type])
		return next(new Error('not found'));

	//默认查100条
	if (config[mode+type].limit === undefined)
		config[mode+type].limit = 100

	table.list(config[mode+type] , function(err, docs){
						res.render('top/detail', { 
							titles: config[mode+type].titles, 
							colNames: config[mode+type].colNames, 
							list: docs 
						});
			  })
	

}
