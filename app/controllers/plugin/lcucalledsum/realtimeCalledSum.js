var mongoose = require('mongoose')
  , debug = require('debug')('pangu:top')
  , util = require("util")
  , query = require('../../query')
  , config = require('../../plugin_config/lcucalledsum/config_realTime').graphConfig
  , chart_list = require('../../plugin_config/lcucalledsum/config_realTime').graphList
  , transcode_list = require('../../config_coreTranscodeList').coreTranscodeList
  , server_list = require('../../config_coreServerList').coreServerList
  , extend = require('extend')
  , logger = require('../../log').logger;

exports.plugin = function(server) {

   //ÊµÊ±Í¼±í
   server.get('/realtimeLcuCalledSum.html', function(req, res) { 
        var chartList = req.query.chartList;
        var list = chart_list[chartList]; 
        var collectTimeList = [];
        var coreList = [];
        var headTitle ='';
        list.forEach(function(item){
            headTitle = config[item.mode+item.type+item.subtype].name;
            if(config[item.mode+item.type+item.subtype].collectTimeList)
                collectTimeList = config[item.mode+item.type+item.subtype].collectTimeList;
            if(config[item.mode+item.type+item.subtype].statType =='LCU') 
               coreList =  transcode_list;
            else if(config[item.mode+item.type+item.subtype].statType =='SVR')
               coreList =  server_list; 
        });
    		res.renderPjax('plugin/lcucalledsum/realtimeCalledSum',{chartList:chartList,collectTimeList:collectTimeList,coreTranscodeList:coreList,headTitle:headTitle})     	              
   });
   
   
   server.get('/getRealtimeLcuCalledSumData', function(req, res) { 

      var chartList = req.query.chartList
         ,value =  ''
         ,collectTime = req.query.collectTime||'';
      var now = new Date().getTime();
      logger.debug("collectTime=%s",collectTime);
      if(collectTime != '')
          now = now-(parseInt(collectTime)*1000*60);
         
      var tempConfig ={};	
      extend(true,tempConfig,config);
      
      var now = new Date().getTime();
      var dateCa = new Date(now);
      var date = dateCa.getDate() < 10 ? "0" + dateCa.getDate() : dateCa.getDate();
      var month = (dateCa.getMonth()+1) < 10 ? "0" + (dateCa.getMonth()+1) : (dateCa.getMonth()+1);
      var year = dateCa.getFullYear();     
      value = year+"-"+month+"-"+date; 
    
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
                     logger.debug("req.query[col]=%s",req.query['TRANSCODE']);
                     logger.debug("col=%s",col);
                     if(req.query['TRANSCODE']||'' != '')
                        filter[col] = req.query['TRANSCODE'];
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