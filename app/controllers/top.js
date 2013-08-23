var mongoose = require('mongoose')
  , config = require('./config.js').config
  , cfgTop = require('./config.js').cfgTop


var clone = function(target, source) {
	for(var key in source) 
		target[key] = source[key]
}

var getTable = function(mode, type, scope, value) {

	if (!mode || !type || !scope) throw new Error('参数不全');

	if (!value) {
		var dt = new Date('2013-06-18') //debug
		var YY = ("00"+dt.getFullYear()%100).substr(-2)
		  , MM = ("00"+(dt.getMonth() + 1)).substr(-2)
		  , DD = ("00"+dt.getDate()).substr(-2)
		  , HH = ("00"+dt.getHours()).substr(-2);
		if (scope=="hours") value= YY+MM+DD+HH; 
		if(scope=="day") value = YY+MM+DD;
		if(scope=="month") value = YY+MM;
		if (scope=="year") value = YY;
	}

	var collection = mode + type + scope.toUpperCase() + value;
	console.log('collection:'+collection)

	try{
		var table = mongoose.model(mode + type, collection);
	}catch(e){
		console.error(e.stack)
		throw new Error('not found')
	}
	
	return table;
	
}

var topInfo = function(list, callback) {
	var count=0;

	//统计个数
	for(var i=0,j=list.length; i<j; ++i) {
		var mode = list[i].mode
		  , type = list[i].type
		  , value = list[i].value || false
		  , subtype = list[i].subtype || '';
		
		cfg = cfgTop[mode+type+subtype]; 

		if (!cfg) throw new Error('not found');

		for(var idx in cfg.scopes) {
			scope = cfg.scopes[idx]	
			if (!list[i].scope || list[i].scope == scope) {
				++count;
			}
		}
	}

	var result = {};

	for(var i=0,j=list.length; i<j; ++i) {
		var mode = list[i].mode
		  , type = list[i].type
		  , value = list[i].value || false
		  , subtype = list[i].subtype || '';
		
		cfg = cfgTop[mode+type+subtype]; 

		if (!cfg) throw new Error('not found');

		for(var idx in cfg.scopes) {
			var scope = cfg.scopes[idx]	

			if (!list[i].scope || list[i].scope == scope) {

				getTable(mode, type, scope, value)
				.top(cfg, (function(mode, type, subtype, scope, cfg, result) { 
						return function(err, docs) {
							--count;

							if (docs) {
								result[mode+type+subtype] = result[mode+type+subtype] || cfg;
								result[mode+type+subtype][scope] = docs
							}
							if (err) {
								result[mode+type+subtype] = result[mode+type+subtype] || cfg;
								result[mode+type+subtype][scope] = {error: err};
							}

							if (!count) {
								callback(null, result);
							}
						}
				})(mode, type, subtype, scope ,cfg, result))
			}
		}
	}
}

exports.topInfo = topInfo

exports.list = function(req, res) {

	var list = [ {mode:'TuxState', type:'TimeOutTop'}, 
				 {mode:'TuxState', type:'CalledSum', subtype: 'ByLcu'} ]

	topInfo(list, function(err, docs) {
		console.log(docs)
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

	var table = getTable(mode, type, scope, value)

	type += subtype;

	if (!config[mode+type])
		return next(new Error('not found'));

	table.list({
						filter: config[mode+type].filter,
						fields: config[mode+type].fields,
						sort: config[mode+type].sort, 
						limit: config[mode+type].limit,
						
					}, function(err, docs){
						res.render('top/detail', { 
							titles: config[mode+type].titles, 
							colNames: config[mode+type].colNames, 
							list: docs 
						});
			  })
	

}
