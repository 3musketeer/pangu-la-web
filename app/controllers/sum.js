var mongoose = require('mongoose')
  , debug = require('debug')('pangu:sum')
  , util = require("util")
  , query = require('./query')
  , config = require('./config_sum').config

var formatNum = function(num) {
	if (num > 1000000) return (num/1000000).toFixed(1)+'M';
	if (num > 1000) return (num/1000).toFixed(1)+'k';
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

		data[key]._count = formatNum(count)
		data[key].count = count
	}
}

exports.list = function(req, res) {
    var value = req.query.value;
	  var list = [ {mode:'TuxState', type:'CalledSumByTime', subtype: 'AtHours',value:value},
				 {mode:'TuxState', type:'CalledSumByTime', subtype: 'AtDay',value:value},
				 {mode:'TuxState', type:'FailedSumByTime', subtype: 'AtHours',value:value},
				 {mode:'TuxState', type:'FailedSumByTime', subtype: 'AtDay',value:value}	]

	query.multiQuery(list, config, function(err, docs) {
		accumulate(docs)
		debug("doc:%s", util.inspect(docs))
		res.renderPjax('sum/list', {all: docs,caculateDate:value})
	})
	
}
