var mongoose = require('mongoose')
  , debug = require('debug')('pangu:sum')
  , util = require("util")
  , query = require('./query')
  , config = require('./config_sum').config
  , cfgTop = require('./config_top').cfgTop
  , barCfg = require('./config_column').config
  , meterCfg = require('./config_meter').config
  , extend = require('extend');

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


exports.index = function(req, res) {
    

    var value = req.query.value;
    value = '2013-06-18';
	  var list = [ {mode:'TuxState', type:'CalledSumByTime', subtype: 'AtHours',value:value},
				         {mode:'TuxState', type:'FailedSumByTime', subtype: 'AtHours',value:value},
				         {mode:'TuxState', type:'FailedSumByTime', subtype: 'AtDay',value:value}]
				 
	 var list1 = [{mode:'TuxState', type:'TimeOutTop',value:value},
				        {mode:'TuxState', type:'CalledSum', subtype: 'ByLcu',value:value},
				        {mode:'TuxState', type:'FailedSum', subtype: 'ByLcu',value:value}]
				        
	
	 var list2 = [{mode:'TuxState', type:'CalledSumByTime', subtype: 'At28',value:value},
				        {mode:'TuxState', type:'CalledSumByTime', subtype: 'At28a',value:value},
				        {mode:'TuxState', type:'CalledSumByTime', subtype: 'At29',value:value},]
				        
	
	 var list3 = [{mode:'TuxState', type:'CalledSumByTime', subtype: 'AtHours0',value:value},
				        {mode:'TuxState', type:'CalledSumByTime', subtype: 'AtHours1',value:value},
				        {mode:'TuxState', type:'CalledSumByTime', subtype: 'AtHours2',value:value},]
				        
				        

	  query.multiQuery(list, config, function(err, docs) {   
	      query.multiQuery(list1, cfgTop, 10, function(err, docs1) {
	          extend(true,docs1,docs);
	          query.multiQuery(list2, barCfg, function(err, docs2) {
    	          extend(true,docs2,docs1);
    	          query.multiQuery(list3, meterCfg, function(err, docs3) {
    	              console.log(JSON.stringify(docs3));
        	          extend(true,docs3,docs2);
        	          accumulate(docs3)
            		    res.renderPjax('main/index', {all: docs3,caculateDate:value})
	              })         
	          })
	      })
    		
	  })
    
}