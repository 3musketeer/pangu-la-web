var mongoose = require('mongoose')
  , debug = require('debug')('pangu:top')
  , util = require("util")
  , query = require('../../query')
  , config = require('../../plugin_config/hostCompare/config_realTime').graphConfig
  , chart_list = require('../../plugin_config/hostCompare/config_realTime').graphList
  , transcode_list = require('../../config_coreTranscodeList').coreTranscodeList
  , extend = require('extend')
  , logger = require('../../log').logger;


exports.plugin = function(server) {

   
   //实时对比
   server.get('/realtimeHostCompareGraph.html', function(req, res) { 
        var chartList = req.query.chartList;
        var listIndex = chart_list[chartList];  
        var listCnt = chart_list[chartList].length;   
    		res.renderPjax('plugin/hostCompare/realtimeCompareGraph',{chartList:chartList,listIndex:listIndex,listCnt:listCnt})     	              
   });
  
   
   server.get('/getRealTimeCompareData', function(req, res) { 

      var chartList = req.query.chartList
         ,value = req.query.value||'2014-02-18'
         ,index = req.query.index||0
         ,time = req.query.time||'';
       
       
      logger.debug("index=%d",index);      
      var tempConfig ={};	
      extend(true,tempConfig,config);
        
      var now = new Date().getTime();       
      
      var list = [];             
      var tempList = chart_list[chartList][index];  
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
                     filter[col] = {$gte: now-tempConfig[item.mode+item.type+item.subtype].delayTime,$lte: now+1000}; 
                 }else{   
                     var obj = {};
                     filter[col] = new RegExp(req.query[col]||'');
                 }                 
             });
             tempConfig[item.mode+item.type+item.subtype].filter = filter; 
      });
           
    	query.multiQuery(list, tempConfig, function(err, docs) {
    		res.send(docs);
    	})                   
   });
   
}