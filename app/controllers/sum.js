var mongoose = require('mongoose')
  , debug = require('debug')('pangu:sum')
  , util = require("util")
  , query = require('./query')
  , config = require('./config_sum').config

var formatNum = function(num) {
	result = num/1000000 
	if (result >= 1) return result.toFixed(1)+'m+';
	result = num/1000
	if (result >= 1) return result.toFixed(1)+'k+';
	return num
}

var accumulate = function(data) {
	for(var key in data) {
		scope = data[key].scopes[0]
		list = data[key][scope]
		if (list.error) continue;

		count = 0;

		for(var i in list) {
			count += list[i]._count
		}

		data[key].count = formatNum(count)
	}
}

exports.list = function(req, res) {
	var list = [ {mode:'TuxState', type:'CalledSumByTime', subtype: 'AtHours'},
				 {mode:'TuxState', type:'FailedSumByTime', subtype: 'AtHours'}	]

	query.multiQuery(list, config, function(err, docs) {
		accumulate(docs)
		debug("doc:%s", util.inspect(docs))
		res.render('sum/list', {all: docs})
	})
	
}
