var mongoose = require('mongoose')
  , debug = require('debug')('pangu:top')
  , util = require("util")
  , query = require('../query')
  , config = require('../config_realTime').detailConfig
  , chart_list = require('../config_realTime').detailList
  , EventProxy = require('eventproxy').EventProxy
  , extend = require('extend');

exports.plugin = function(server) {

   server.get('/realtimeTopDetail.html', function(req, res) { 
        var chartList = req.query.chartList;
        var value = req.query.value;           
        var list = chart_list[chartList];  
        
        var headTile = config[list[0].mode+list[0].type+list[0].subtype].name;
        var displayLength = config[list[0].mode+list[0].type+list[0].subtype].displayLength;
        var scope = config[list[0].mode+list[0].type+list[0].subtype].scopes[0];        
        var queryUrl = "/realtimeTopDetailData?mode="+list[0].mode+"&type="+list[0].type+"&scope="+scope+"&subtype="+list[0].subtype+"&value="+value+"&iDisplayLength="+displayLength;
    		res.renderPjax('plugin/realtimeTopDetail/realtimeTopDetail',{    
    		    titles: config[list[0].mode+list[0].type+list[0].subtype].titles, 
            queryUrl:queryUrl,
            headTile:headTile,
            displayLength:displayLength
    		})     	              
   });
   
   
   server.get('/realtimeTopDetailData', function(req, res) {
    	var mode = req.query.mode
    	  , type = req.query.type
    	  , scope = req.query.scope
    	  , value = req.query.value
    	  , subtype = req.query.subtype || ''
    	  , iDisplayStart = req.query.iDisplayStart
    	  , iDisplayLength = req.query.iDisplayLength
        , sSearch = req.query.sSearch
    
      if(!iDisplayStart) iDisplayStart = 0;
      iDisplayLength = config[mode+type].displayLength;
      
      var now = new Date().getTime();
      
    	var table = query.getTable(mode, type, scope, value)
    
    	type += subtype;
    
    	if (!config[mode+type])
    		return next(new Error('not found'));
    	
    	var tempConfig ={};	
      extend(true,tempConfig,config[mode+type]);
     
      //if (sSearch && sSearch != ""){
            var filter ={}; 
            if(tempConfig.filter)
                    filter= tempConfig.filter;
             
            tempConfig.filterColNames.forEach(function(col){
                 if (col == "timestamp"){ 
                    filter[col] = {$gte: now-tempConfig.delayTime,$lte: now+1000}; 
                 }else{   
                    if (sSearch && sSearch != ""){ 
                        filter.$or = [];   
                        var obj = {};
                        obj[col] = new RegExp(sSearch);
                        filter.$or.push(obj);
                    } 
                 }
                 
            });     
            tempConfig.filter = filter;
       //}
        
        
         
        tempConfig.limit = iDisplayLength;
        tempConfig.skip = iDisplayStart;
        
        var render = function(count,docs){
            var output = {};
            var temp = [];
            output.sEcho = parseInt(req.query.sEcho);
            output.iTotalRecords = count;
            output.iTotalDisplayRecords = count;
            output.aaData = [];
                    
            docs.forEach(function(item,idx){
                tempConfig.colNames.forEach(function(col){    
                    if(col == '#') { 
                        temp.push(parseInt(iDisplayStart)+1+idx);
                    }else{          
                       temp.push(item[col]);
                    }          
                });
                output.aaData.push(temp);
                temp = [];
            }); 
            var response = JSON.stringify(output);        
            res.send(response);
    	}
        
      var proxy = new EventProxy();
    	proxy.assign('count', 'docs', render);
    	
      table.getCount(tempConfig,function(cnt){ 
          proxy.trigger('count', cnt);
      });
        
    	table.list(tempConfig, function(err, docs){	        
    	    proxy.trigger('docs', docs);			
    	})
    });
  
}