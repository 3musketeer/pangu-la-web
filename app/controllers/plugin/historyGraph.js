var mongoose = require('mongoose')
  , debug = require('debug')('pangu:top')
  , util = require("util")
  , query = require('../query')
  , config = require('../config_history').config
  , chart_list = require('../config_history').list
  , transcode_list = require('../config_coreTranscodeList').coreTranscodeList
  , extend = require('extend');

exports.plugin = function(server) {

   server.get('/historyComPareGraph.html', function(req, res) { 
        var chartList = req.query.chartList;
        var formTag = req.query.formTag||'';
        var listCnt = chart_list[chartList].length; 
    		res.renderPjax('plugin/historyGraph/historyGraph',{chartList:chartList,listCnt:listCnt,coreTranscodeList:transcode_list,formTag:formTag})     	              
   });
   
   
   server.get('/getHistoryGraphData', function(req, res) { 

      var chartList = req.query.chartList
         ,value = req.query.value
         ,index = req.query.index||0
         ,transCode =req.query.TRANSCODE||'';
         
                  
      var tempConfig ={};	
      extend(true,tempConfig,config);

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
                 var obj = {};
                 filter[col] = new RegExp(req.query[col]||'');  
             });
             
             tempConfig[item.mode+item.type+item.subtype].filter = filter;  
      });    
      
    	query.multiQuery(list, tempConfig, function(err, docs) {
    		res.send(docs);
    	})                   
   });
     
}