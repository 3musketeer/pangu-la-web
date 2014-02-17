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
         ,value = "2014-02-17"
         ,time = req.query.time||'';
         
      var tempConfig ={};	
      extend(true,tempConfig,config);
               
      var list = chart_list[chartList];  
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
   
  
}