var mongoose = require('mongoose')
  , debug = require('debug')('pangu:top')
  , util = require("util")
  , query = require('../../query')
  , config = require('../../plugin_config/hostCompare/config_history_cb_1_0').config
  , chart_list = require('../../plugin_config/hostCompare/config_history_cb_1_0').list
  , transcode_list = require('../../config_coreTranscodeList_cb_1_0').coreTranscodeList
  , extend = require('extend');

exports.plugin = function(server) {

   server.get('/historyComPareGraph.html', function(req, res) { 
        var chartList = req.query.chartList;
        var isWhere = req.query.isWhere||'false';
        var listIndex = chart_list[chartList];  
        var listCnt = chart_list[chartList].length;      
    		res.renderPjax('plugin/hostCompare/historyGraph',{chartList:chartList,listIndex:listIndex,listCnt:listCnt,coreTranscodeList:transcode_list,isWhere:isWhere})    	              
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