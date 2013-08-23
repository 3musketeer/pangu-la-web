var mongoose = require('mongoose')
  , config = require('./config.js').config


var clone = function(target, source) {
	for(var key in source) 
		target[key] = source[key]
}

exports.list = function(req, res) {
	res.render('top/list')
}

exports.detail = function(req, res, next) {
	var mode = req.query.mode
	  , type = req.query.type
	  , scope = req.query.scope
	  , value = req.query.value
	  , subtype = req.query.subtype || ''
	  //, filter = JSON.parse(req.query.filter || '{}')

	if (!mode || !type || !scope) return next(new Error('参数不全'));


	if (!value) {
		var dt = new Date()
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

	try{
		var TimeOutTop = mongoose.model(mode + type, collection);
	}catch(e){
		console.error(e.stack)
		return next(new Error('not found'))
	}

	type += subtype;

	console.log(config[mode+type].filter)

	TimeOutTop.list({
						filter: config[mode+type].filter,
						fields: config[mode+type].fields,
						sort: config[mode+type].sort, 
						limit: config[mode+type].limit,
						
					}, function(err, tops){
						res.render('top/detail', { 
							titles: config[mode+type].titles, 
							colNames: config[mode+type].colNames, 
							list: tops 
						});
			  })
	

}
