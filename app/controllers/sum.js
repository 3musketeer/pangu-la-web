var mongoose = require('mongoose')
  , debug = require('debug')('pangu:sum')
  , util = require("util")
  , query = require('./query')
  , config = require('./config_sum').config
  , cfgList = require('./config_sum').list
  , logger = require('./log').logger
  , extend = require('extend');

var formatNum = function(num) {
    if (num > 1000000000) return (num/1000000000).toFixed(2)+'b';
	if (num > 1000000) return (num/1000000).toFixed(2)+'M';
	if (num > 1000) return (num/1000).toFixed(2)+'k';
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
    var value = req.query.value||'';
    var chartList = req.query.chartList;
    var chart_list = cfgList[chartList]; 
    
    if(value == ''){
        var now = new Date().getTime();
        var dateCa = new Date(now);
        var date = dateCa.getDate() < 10 ? "0" + dateCa.getDate() : dateCa.getDate();
        var month = (dateCa.getMonth()+1) < 10 ? "0" + (dateCa.getMonth()+1) : (dateCa.getMonth()+1);
        var year = dateCa.getFullYear();     
        value = year+"-"+month+"-"+date; 
    }
    
    var tempConfig ={};	
    extend(true,tempConfig,config);

    var tempList = [];
    extend(true,tempList,chart_list); 
    
    tempList.forEach(function(item){
         if(!item.value)
            item.value = value;
            
         var filter ={}; 
         if(tempConfig[item.mode+item.type+item.subtype].filter)
            filter = tempConfig[item.mode+item.type+item.subtype].filter;
         tempConfig[item.mode+item.type+item.subtype].filterColNames.forEach(function(col){   
             var obj = {};
             if(req.query[col]||'' != '')
                filter[col] = req.query[col];  
         });
         
         tempConfig[item.mode+item.type+item.subtype].filter = filter;  
         tempConfig[item.mode+item.type+item.subtype].caculateDate = value;  
         headTitle = tempConfig[item.mode+item.type+item.subtype].name;
         logger.debug("tempConfig.filter=%s",JSON.stringify(tempConfig[item.mode+item.type+item.subtype].filter));
         logger.debug("item.value=%s",item.value);
    });  

	query.multiQuery(tempList, tempConfig, function(err, docs) {
		accumulate(docs)
		debug("doc:%s", util.inspect(docs))
		res.renderPjax('sum/'+chartList+'/list', {all: docs,caculateDate:value})
	})
	
}
