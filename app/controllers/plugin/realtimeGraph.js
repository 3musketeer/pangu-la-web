var mongoose = require('mongoose')
  , debug = require('debug')('pangu:top')
  , util = require("util")
  , query = require('../query')
  , config = require('../config_realTime').graphConfig
  , chart_list = require('../config_realTime').graphList
  , transcode_list = require('../config_coreTranscodeList').coreTranscodeList
  , extend = require('extend');

exports.plugin = function(server) {

   server.get('/realtimeGraph.html', function(req, res) { 
        var chartList = req.query.chartList;
        var list = chart_list[chartList]; 
        var collectTimeList = [];
        list.forEach(function(item){
            if(config[item.mode+item.type+item.subtype].collectTimeList)
                collectTimeList = config[item.mode+item.type+item.subtype].collectTimeList;
        });
    		res.renderPjax('plugin/realtimeGraph/realtimeGraph',{chartList:chartList,collectTimeList:collectTimeList,coreTranscodeList:transcode_list})     	              
   });
   
   
   server.get('/getRealTimeData', function(req, res) { 

      var chartList = req.query.chartList
         ,value = "2014-02-18"
         ,collectTime = req.query.collectTime||'';
         
      var now = new Date().getTime();
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
                     filter[col] = {$gte: now-tempConfig[item.mode+item.type+item.subtype].delayTime,$lte: now+1000};   
                 }else{ 
                     var obj = {};
                     if(req.query[col]||'' != '')
                        filter[col] = new RegExp(req.query[col]);
                 }    
             });
             tempConfig[item.mode+item.type+item.subtype].filter = filter;  
             
      });    
      
    	query.multiQuery(list, tempConfig, function(err, docs) {
    		res.send(docs);
    	})                   
   });
   
   
   server.get('/getRealTimeData1', function(req, res) { 

      var chartList = req.query.chartList
         ,value = req.query.value
         ,time = req.query.time||'';
         
      var tempConfig ={};	
      extend(true,tempConfig,config);
               
      var list = [];             
      var tempList = chart_list[chartList];  
      extend(true,list,tempList);  
       
      list.forEach(function(item){
             if(!item.value)
                item.value = value;
                
             var filter ={}; 
             if(time != ''){
                 tempConfig[item.mode+item.type+item.subtype].filterColNames.forEach(function(col){ 
                      filter.$or = [];   
                      var obj = {};
                      obj[col] = new RegExp(time);
                      filter.$or.push(obj);   
                 });
             }      
             tempConfig[item.mode+item.type+item.subtype].filter = filter;
      });    
           
    	query.multiQuery(list, tempConfig, function(err, docs) {
    		res.send(docs);
    	})                   
   });
   
   
   server.get('/realtimeCompareGraph.html', function(req, res) { 
        var chartList = req.query.chartList
        var module = req.query.module||'false'
        if(module == 'true')
    		    res.renderPjax('plugin/realtimeCompareGraph/realtimeCompareGraph',{layout: false,chartList:chartList,module:module}) 
    		else
    		    res.renderPjax('plugin/realtimeCompareGraph/realtimeCompareGraph',{chartList:chartList,module:module})     	              
   });
  
   
   server.get('/getRealTimeCompareData', function(req, res) { 

      var chartList = req.query.chartList
         ,value = "2014-02-18"
         ,time = req.query.time||'';
         
      var tempConfig ={};	
      extend(true,tempConfig,config);
        
      var now = new Date().getTime();       
      
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