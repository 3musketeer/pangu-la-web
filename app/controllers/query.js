var mongoose = require('mongoose')
  , debug = require('debug')('pangu:query')
  , logger = require('./log').logger;

var getTable = function(mode, type, scope, value) {

	if (!mode || !type || !scope) throw new Error('参数不全');

  var dt;
	if (!value) {
		dt = new Date('2013-06-18') //debug
	}else{
	    dt = new Date(value)
	}
	
	
	var YY = ("00"+dt.getFullYear()%100).substr(-2)
	  , MM = ("00"+(dt.getMonth() + 1)).substr(-2)
	  , DD = ("00"+dt.getDate()).substr(-2)
	  , HH = ("00"+dt.getHours()).substr(-2);
	if (scope=="hours") value= YY+MM+DD+HH; 
	if(scope=="day") value = YY+MM+DD;
	if(scope=="month") value = YY+MM;
	if (scope=="year") value = YY;

	var collection = ""
	if (scope != 'noHave')
	    collection = mode + type + scope.toUpperCase() + value;
	else{
	    collection = mode + type  + value.replace(/-/g,'');
	}
	debug('collection:%s.', collection)
    var table;
	try{
		table = mongoose.model('QueryResult', collection);
	}catch(e){
		console.error(e.stack)
		throw new Error('not found')
	}
	logger.debug("collection=%s",collection);
	return table;
	
}

exports.getTable = getTable

//limit 查询记录数,可选参数,不传则使用config.limit||0
exports.multiQuery = function(list, config, limit, callback) {

	var count=0;

	if ('function' == typeof limit) {
		callback = limit
		limit = false;
	}

	//统计个数
	for(var i=0,j=list.length; i<j; ++i) {
		var mode = list[i].mode
		  , type = list[i].type
		  , value = list[i].value || false
		  , subtype = list[i].subtype || '';
		
		cfg = config[mode+type+subtype]; 

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
		
		cfg = config[mode+type+subtype]; 
		if (limit) {
			cfg.limit = limit;
		}

		if (!cfg) throw new Error('not found');

		for(var idx in cfg.scopes) {
			var scope = cfg.scopes[idx]	

			if (!list[i].scope || list[i].scope == scope) {
			    logger.debug("subtype=%s",subtype);
				getTable(mode, type, scope, value)
				.list(cfg, (function(mode, type, subtype, scope, cfg, result) { 
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

exports.getTab = function(model, tab, date, ind) {

    var mode = tab.mode,
        type = tab.type,
        subtype = tab.subtype;

    if (!mode || !type || !subtype || !date || !model) throw new Error('参数不全');

    var time = date.split('-');

    var day = time[0]
        + (time[1].length < 2 ? '0' + time[1] : time[1])
        + (time[2].length < 2 ? '0' + time[2] : time[2]);

    var tabName = mode + type + subtype + (ind > 0 ? day.substr(ind) : day);

    var table = null;
    try{
        table = mongoose.model(model, tabName);
    }catch(e){
        console.error(e.stack)
        throw new Error('not found')
    }

    return table;
}

