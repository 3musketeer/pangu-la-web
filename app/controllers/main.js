var mongoose = require('mongoose')
  , debug = require('debug')('pangu:sum')
  , util = require("util")
  , query = require('./query')
  , config = require('./config_sum').config
  , cfgTop = require('./config_top').cfgTop
  , cfgDetail = require('./config_top').cfgDetail
  , barCfg = require('./config_column').config
  , meterCfg = require('./config_meter').config
  , extend = require('extend')
  , redis = require("redis")
  , env = process.env.NODE_ENV || 'development'
  , redisCfg = require('../../config/config')[env].redis
  , logger = require('./log').logger
  , config_index = require('./config_index').config
  , list_index = require('./config_index').list
  , EventProxy = require('eventproxy').EventProxy;

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

exports.getStatData = function(req, res) {
    var client = redis.createClient(redisCfg.port,redisCfg.host);
    client.publish("foo", "Hello Mr Lee");
    try
    {
       
        var value = req.query.value||'';
        var now = new Date().getTime();  
        
        if(value == ''){
            var dateCa = new Date(now);
            var date = dateCa.getDate() < 10 ? "0" + dateCa.getDate() : dateCa.getDate();
            var month = (dateCa.getMonth()+1) < 10 ? "0" + (dateCa.getMonth()+1) : (dateCa.getMonth()+1);
            var year = dateCa.getFullYear();     
            value = year+"-"+month+"-"+date;
        }
        logger.debug("value---------=%s",value); 
        var statObject = {};
        var tempConfig ={};	
        extend(true,tempConfig,config_index);
        
        var list = [];              
        extend(true,list,list_index);  

        var configKey = "";
        list.forEach(function(item){
            if(!item.value)
            item.value = value;
            
            var filter ={}; 
            configKey = item.mode+item.type+item.subtype;
            if(tempConfig[item.mode+item.type+item.subtype].filter)
            filter = tempConfig[item.mode+item.type+item.subtype].filter;
            tempConfig[item.mode+item.type+item.subtype].filterColNames.forEach(function(col){
             if (col == "timestamp"){ 
                 var obj = {};
                 filter[col] = {$gte: now-60000,$lte: now+1000}; 
             }else{   
                 var obj = {};
                 filter[col] = new RegExp(req.query[col]||'');
             }                 
            });
            tempConfig[item.mode+item.type+item.subtype].filter = filter; 
        });
    
        client.hgetall("statObject", function (err, obj) {
            logger.debug("obj=%s",JSON.stringify(obj));
            if(obj){
                 extend(true,statObject,obj);
                 var response = JSON.stringify(statObject);
               //  client.quit();        
                 logger.debug("statObject-0=%s",JSON.stringify(statObject));
                 res.send(response);    		         
            }else{  
            	  query.multiQuery(list,tempConfig , function(err, docs) {
                    extend(true,statObject,docs[configKey]['day'][0]);
                    logger.debug("statObject=%s",JSON.stringify(statObject));
                    client.expire('statObject', 300);
                    client.hmset("statObject",
                        "DayCalledSum",statObject.DayCalledSum,
                        "DayFailedSum",statObject.DayFailedSum,
                        "DaySuccessRate",statObject.DaySuccessRate,
                        "MonCalledSum",statObject.MonCalledSum,
                        "MonFailedSum",statObject.MonFailedSum,
                        "MonSuccessRate",statObject.MonSuccessRate,client.quit());
                    var response = JSON.stringify(statObject);        
                    res.send(response);    		         
	              });   
            } 
        });
    }catch(error)
    {
        logger.error(" error client.quit()");   
        client.quit();
    }finally{
        logger.debug("finally client.quit()");   
    }

}


exports.index = function(req, res) {
    

    var value = req.query.value||'';
    var now = new Date().getTime();  
    
    if(value == ''){
        var dateCa = new Date(now);
        var date = dateCa.getDate() < 10 ? "0" + dateCa.getDate() : dateCa.getDate();
        var month = (dateCa.getMonth()+1) < 10 ? "0" + (dateCa.getMonth()+1) : (dateCa.getMonth()+1);
        var year = dateCa.getFullYear();     
        value = year+"-"+month+"-"+date;
    }
    logger.debug("value---------=%s",value);
      
        
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
				        
				        
    var queryUrl = "/topDetail.html?mode=TuxState"+"&type=TimeOutTop"+"&scope=day"+"&value="+value;

	  query.multiQuery(list, config, function(err, docs) {   
	      query.multiQuery(list1, cfgTop, 10, function(err, docs1) {
	          extend(true,docs1,docs);
	          query.multiQuery(list2, barCfg, function(err, docs2) {
    	          extend(true,docs2,docs1);
    	          query.multiQuery(list3, meterCfg, function(err, docs3) {
    	             // console.log(JSON.stringify(docs3));
        	          extend(true,docs3,docs2);
        	          accumulate(docs3)
            		    res.renderPjax('main/index', {all: docs3,caculateDate:value, queryUrl:queryUrl,titles: cfgDetail['TuxStateTimeOutTop'].titles })
	              })         
	          })
	      })
    		
	  })
    	  
}