var mongoose = require('mongoose')
  , debug = require('debug')('pangu:top')
  , util = require("util")
  , query = require('../../query')
  , config = require('../../plugin_config/lcucalledsum/config_realTime').graphConfig
  , chart_list = require('../../plugin_config/lcucalledsum/config_realTime').graphList
  , transcode_list = require('../../config_coreTranscodeList').coreTranscodeList
  , extend = require('extend')
  , logger = require('../../log').logger;

exports.plugin = function(server) {

   //ÊµÊ±Í¼±í
   server.get('/realtimeLcuCalledSum.html', function(req, res) { 
        var chartList = req.query.chartList;
        var list = chart_list[chartList]; 
        var collectTimeList = [];
        var headTitle ='';
        list.forEach(function(item){
            headTitle = config[item.mode+item.type+item.subtype].name;
            if(config[item.mode+item.type+item.subtype].collectTimeList)
                collectTimeList = config[item.mode+item.type+item.subtype].collectTimeList;
        });
    		res.renderPjax('plugin/lcucalledsum/realtimeCalledSum',{chartList:chartList,collectTimeList:collectTimeList,coreTranscodeList:transcode_list,headTitle:headTitle})     	              
   });
   
   
   server.get('/getRealtimeLcuCalledSumData', function(req, res) { 

      var chartList = req.query.chartList
         ,value =  req.query.value||''
         ,collectTime = req.query.collectTime||'';
      var now = new Date().getTime();
      logger.debug("collectTime=%s",collectTime);
      if(collectTime != '')
          now = now-(parseInt(collectTime)*1000*60);
         
      var tempConfig ={};	
      extend(true,tempConfig,config);
      
      var list = [];             
      var tempList = chart_list[chartList];  
      extend(true,list,tempList);  
       
      list.forEach(function(item){
             if(!item.value)
                item.value = value;
                
             var filter ={}; 
             if(tempConfig[item.mode+item.type+item.subtype].filter)
                filter = tempConfig[item.mode+item.type+item.subtype].filter;
             tempConfig[item.mode+item.type+item.subtype].filterColNames.forEach(function(col){ 
                 if (col == "timestamp"){  
                     var obj = {};
                     logger.debug("delayTime=%s",tempConfig[item.mode+item.type+item.subtype].delayTime);
                     filter[col] = {$gte: now-tempConfig[item.mode+item.type+item.subtype].delayTime,$lte: now+1000};   
                 }else{ 
                     var obj = {};
                     logger.debug("req.query[col]=%s",req.query[col]);
                     if(req.query[col]||'' != '')
                        filter[col] = req.query[col];
                 }    
             });
             tempConfig[item.mode+item.type+item.subtype].filter = filter;  
             logger.debug("tempConfig.filter=%s",JSON.stringify(tempConfig[item.mode+item.type+item.subtype].filter));
             
      });    
      
    	query.multiQuery(list, tempConfig, function(err, docs) {
    	  logger.debug("docs=%s",JSON.stringify(docs));
    		res.send(docs);
    	})                   
   });

}