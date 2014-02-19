var mongoose = require('mongoose')
  , debug = require('debug')('pangu:top')
  , util = require("util")
  , query = require('../query')
  , config = require('../config_realTime').config
  , chart_list = require('../config_realTime').list
  , extend = require('extend');

exports.plugin = function(server) {

   server.get('/realtimeGraph.html', function(req, res) { 
        var chartList = req.query.chartList
    		res.renderPjax('plugin/realtimeGraph/realtimeGraph',{chartList:chartList})     	              
   });
   
   
   server.get('/getRealTimeData', function(req, res) { 

      var chartList = req.query.chartList
         ,value = "2014-02-18"
         ,time = req.query.time||'';
         
      var now = new Date().getTime();
         
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
                     filter[col] = new RegExp(req.query[col]||'');
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
    		res.renderPjax('plugin/realtimeCompareGraph/realtimeCompareGraph',{chartList:chartList})     	              
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
             console.log("filter:%s", JSON.stringify(tempConfig[item.mode+item.type+item.subtype].filter))
      });
           
    	query.multiQuery(list, tempConfig, function(err, docs) {
    		res.send(docs);
    	})                   
   });
   
  
}